/* store.js — Vault cifrato per pazienti, sessioni e appuntamenti.
   IndexedDB (persistenza) + WebCrypto (AES-GCM 256, chiave da PBKDF2-SHA256).
   Tutto nativo del browser: nessuna dipendenza, nessuna rete, nessun account.

   Su disco ogni record è { id, updatedAt, iv, ct }: in chiaro restano solo
   l'id e il timestamp, il contenuto è sempre ciphertext. La chiave vive solo
   in memoria come CryptoKey non estraibile e viene scartata all'auto-lock. */
(function () {
  "use strict";

  var DB_NAME = "kin-vault", DB_VER = 2;
  var DATA_STORES = ["patients", "sessions", "appointments"];
  var STORES = ["meta", "tombstones"].concat(DATA_STORES);
  var ITER = 600000;                 // PBKDF2: ~1s su tablet, alza se diventa veloce
  var CHECK = "kin-vault-ok";        // testo noto per validare la passphrase
  var enc = new TextEncoder(), dec = new TextDecoder();

  var key = null;        // CryptoKey non estraibile, solo in memoria
  var syncSecret = null; // token di sync: byte diversi da quelli della chiave dati
  var cfg = null;        // { salt, iter, check } — in chiaro, non è un segreto
  var dbp = null;
  var lockTimer = null, lockMs = 5 * 60 * 1000, lockCbs = [];

  /* ---------- IndexedDB ---------- */
  function openDB() {
    if (dbp) return dbp;
    dbp = new Promise(function (res, rej) {
      var r = indexedDB.open(DB_NAME, DB_VER);
      r.onupgradeneeded = function () {
        var db = r.result;
        STORES.forEach(function (s) {
          if (!db.objectStoreNames.contains(s)) db.createObjectStore(s, { keyPath: "id" });
        });
      };
      r.onsuccess = function () { res(r.result); };
      r.onerror = function () { rej(r.error); };
    });
    return dbp;
  }
  function idb(store, mode, fn) {
    return openDB().then(function (db) {
      return new Promise(function (res, rej) {
        var t = db.transaction(store, mode);
        var rq = fn(t.objectStore(store));
        t.oncomplete = function () { res(rq ? rq.result : undefined); };
        t.onerror = function () { rej(t.error); };
        t.onabort = function () { rej(t.error); };
      });
    });
  }

  /* ---------- Crypto ---------- */
  function rnd(n) { return crypto.getRandomValues(new Uint8Array(n)); }

  /* PBKDF2 a 512 bit: i primi 32 byte sono la chiave dati (identici a quelli
     che darebbe deriveKey a 256 bit, quindi i vault esistenti restano leggibili),
     i secondi 32 sono il token di sync. Chi ruba il token dal server non ottiene
     nulla per decifrare: è un altro blocco della derivazione. */
  function deriveAll(pass, salt, iter) {
    return crypto.subtle.importKey("raw", enc.encode(pass), "PBKDF2", false, ["deriveBits"])
      .then(function (base) {
        return crypto.subtle.deriveBits({ name: "PBKDF2", salt: salt, iterations: iter, hash: "SHA-256" }, base, 512);
      })
      .then(function (bits) {
        var b = new Uint8Array(bits);
        return crypto.subtle.importKey("raw", b.slice(0, 32), { name: "AES-GCM" }, false, ["encrypt", "decrypt"])
          .then(function (k) { return { key: k, secret: b.slice(32, 64) }; });
      });
  }
  function deriveKey(pass, salt, iter) {
    return deriveAll(pass, salt, iter).then(function (r) { return r.key; });
  }
  /* IV nuovo a ogni scrittura: riusarlo con la stessa chiave romperebbe AES-GCM. */
  function seal(k, obj) {
    var iv = rnd(12);
    return crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, k, enc.encode(JSON.stringify(obj)))
      .then(function (ct) { return { iv: iv, ct: ct }; });
  }
  function unseal(k, rec) {
    return crypto.subtle.decrypt({ name: "AES-GCM", iv: new Uint8Array(rec.iv) }, k, rec.ct)
      .then(function (pt) { return JSON.parse(dec.decode(pt)); });
  }

  function b64(buf) {
    var b = new Uint8Array(buf), s = "";
    for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    return btoa(s);
  }
  function unb64(s) {
    var bin = atob(s), b = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) b[i] = bin.charCodeAt(i);
    return b;
  }

  /* ---------- Auto-lock ---------- */
  function touch() {
    if (!key) return;
    clearTimeout(lockTimer);
    lockTimer = setTimeout(function () { lock(); }, lockMs);
  }
  function lock() {
    key = null; syncSecret = null;
    clearTimeout(lockTimer);
    lockCbs.forEach(function (f) { try { f(); } catch (e) {} });
  }
  if (typeof document !== "undefined") {
    ["pointerdown", "keydown", "touchstart"].forEach(function (ev) {
      document.addEventListener(ev, touch, { passive: true });
    });
    /* Scheda nascosta = nessun evento = il timer di inattività scatta comunque. */
  }

  /* ---------- Setup / sblocco ---------- */
  function loadCfg() {
    if (cfg) return Promise.resolve(cfg);
    return idb("meta", "readonly", function (s) { return s.get("crypto"); })
      .then(function (rec) { cfg = rec || null; return cfg; });
  }
  function isSetUp() { return loadCfg().then(function (c) { return !!c; }); }

  function setup(pass) {
    var salt = rnd(16);
    return deriveAll(pass, salt, ITER).then(function (d) {
      var k = d.key;
      return seal(k, CHECK).then(function (chk) {
        var rec = { id: "crypto", salt: salt, iter: ITER, checkIv: chk.iv, checkCt: chk.ct };
        return idb("meta", "readwrite", function (s) { return s.put(rec); }).then(function () {
          cfg = rec; key = k; syncSecret = d.secret; touch();
          if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {});
          return true;
        });
      });
    });
  }

  function unlock(pass) {
    return loadCfg().then(function (c) {
      if (!c) return Promise.reject(new Error("vault-non-inizializzato"));
      return deriveAll(pass, new Uint8Array(c.salt), c.iter).then(function (d) {
        return unseal(d.key, { iv: c.checkIv, ct: c.checkCt })
          .then(function (v) {
            if (v !== CHECK) throw new Error("passphrase-errata");
            key = d.key; syncSecret = d.secret; touch();
            return true;
          })
          .catch(function () { throw new Error("passphrase-errata"); });
      });
    });
  }

  function changePass(oldPass, newPass) {
    return unlock(oldPass).then(function () {
      var oldKey = key;
      return Promise.all(DATA_STORES.map(function (st) {
        return idb(st, "readonly", function (s) { return s.getAll(); }).then(function (recs) {
          return Promise.all((recs || []).map(function (r) {
            return unseal(oldKey, r).then(function (obj) { return { store: st, obj: obj }; });
          }));
        });
      })).then(function (groups) {
        var salt = rnd(16);
        return deriveAll(newPass, salt, ITER).then(function (d) {
          var nk = d.key;
          return seal(nk, CHECK).then(function (chk) {
            var rec = { id: "crypto", salt: salt, iter: ITER, checkIv: chk.iv, checkCt: chk.ct };
            key = nk; syncSecret = d.secret; cfg = rec;
            var writes = [idb("meta", "readwrite", function (s) { return s.put(rec); })];
            groups.forEach(function (g) {
              g.forEach(function (item) { writes.push(put(item.store, item.obj)); });
            });
            return Promise.all(writes).then(function () { return true; });
          });
        });
      });
    });
  }

  /* ---------- CRUD ---------- */
  function need() { if (!key) throw new Error("vault-bloccato"); }

  function put(store, obj) {
    need(); touch();
    if (!obj.id) obj.id = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2));
    obj.updatedAt = new Date().toISOString();
    return seal(key, obj).then(function (s) {
      return idb(store, "readwrite", function (os) {
        return os.put({ id: obj.id, updatedAt: obj.updatedAt, iv: s.iv, ct: s.ct });
      });
    }).then(function () { return obj; });
  }
  function get(store, id) {
    need(); touch();
    return idb(store, "readonly", function (s) { return s.get(id); })
      .then(function (rec) { return rec ? unseal(key, rec) : null; });
  }
  function all(store) {
    need(); touch();
    return idb(store, "readonly", function (s) { return s.getAll(); })
      .then(function (recs) { return Promise.all((recs || []).map(function (r) { return unseal(key, r); })); });
  }
  /* La cancellazione lascia una lapide: senza, l'altro dispositivo
     ri-sincronizzerebbe il record cancellato facendolo "resuscitare". */
  function del(store, id) {
    need(); touch();
    return idb(store, "readwrite", function (s) { return s.delete(id); })
      .then(function () {
        return idb("tombstones", "readwrite", function (s) {
          return s.put({ id: store + ":" + id, store: store, recId: id, updatedAt: new Date().toISOString() });
        });
      });
  }

  /* ---------- Backup ----------
     Il backup esporta i record già cifrati: nessuna nuova crypto, e il file
     resta illeggibile senza la passphrase. Reimportabile solo su un vault
     vuoto o sullo stesso vault (stesso salt = stessa passphrase). */
  function exportBackup() {
    return loadCfg().then(function (c) {
      if (!c) throw new Error("vault-non-inizializzato");
      return Promise.all(DATA_STORES.map(function (st) {
        return idb(st, "readonly", function (s) { return s.getAll(); });
      })).then(function (groups) {
        var out = {
          format: "kin-vault-backup", v: 1, exportedAt: new Date().toISOString(),
          salt: b64(c.salt), iter: c.iter, checkIv: b64(c.checkIv), checkCt: b64(c.checkCt),
          data: {}
        };
        DATA_STORES.forEach(function (st, i) {
          out.data[st] = (groups[i] || []).map(function (r) {
            return { id: r.id, updatedAt: r.updatedAt, iv: b64(r.iv), ct: b64(r.ct) };
          });
        });
        return out;
      });
    });
  }

  function importBackup(json) {
    var bk = typeof json === "string" ? JSON.parse(json) : json;
    if (!bk || bk.format !== "kin-vault-backup") throw new Error("file-non-valido");
    return loadCfg().then(function (c) {
      var adopt = !c;
      if (!adopt && b64(c.salt) !== bk.salt)
        throw new Error("backup-di-un-altro-vault");   // passphrase diversa: i record sarebbero illeggibili
      var pre = adopt
        ? idb("meta", "readwrite", function (s) {
            return s.put({ id: "crypto", salt: unb64(bk.salt), iter: bk.iter,
                           checkIv: unb64(bk.checkIv), checkCt: unb64(bk.checkCt).buffer });
          }).then(function () { cfg = null; return loadCfg(); })
        : Promise.resolve();
      return pre.then(function () {
        var n = 0;
        return Promise.all(DATA_STORES.map(function (st) {
          var rows = (bk.data && bk.data[st]) || [];
          return Promise.all(rows.map(function (r) {
            return idb(st, "readonly", function (s) { return s.get(r.id); }).then(function (cur) {
              /* Ultima scrittura vince: non sovrascrive un record locale più recente. */
              if (cur && cur.updatedAt >= r.updatedAt) return;
              n++;
              return idb(st, "readwrite", function (s) {
                return s.put({ id: r.id, updatedAt: r.updatedAt, iv: unb64(r.iv), ct: unb64(r.ct).buffer });
              });
            });
          }));
        })).then(function () { return n; });
      });
    });
  }

  /* ---------- Sync fra dispositivi (end-to-end) ----------
     Sul server viaggiano e restano solo id, updatedAt e ciphertext: la chiave
     non esce mai dal dispositivo. Il token di autenticazione è l'altra metà
     della derivazione PBKDF2, quindi non permette di decifrare niente.
     Risoluzione dei conflitti: vince la scrittura con updatedAt più recente. */
  function b64url(b) { return b64(b).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
  function syncToken() { need(); return b64url(syncSecret); }

  function syncMeta() {
    return idb("meta", "readonly", function (s) { return s.get("sync"); })
      .then(function (m) { return m || { id: "sync", cursor: 0, lastSync: null }; });
  }
  function localChanges(since) {
    var out = [];
    return Promise.all(DATA_STORES.map(function (store) {
      return idb(store, "readonly", function (s) { return s.getAll(); }).then(function (recs) {
        (recs || []).forEach(function (r) {
          if (!since || r.updatedAt > since)
            out.push({ store: store, id: r.id, updatedAt: r.updatedAt, iv: b64(r.iv), ct: b64(r.ct) });
        });
      });
    })).then(function () {
      return idb("tombstones", "readonly", function (s) { return s.getAll(); });
    }).then(function (tombs) {
      (tombs || []).forEach(function (t) {
        if (!since || t.updatedAt > since)
          out.push({ store: t.store, id: t.recId, updatedAt: t.updatedAt, deleted: 1 });
      });
      return out;
    });
  }
  function applyRemote(rows) {
    var n = 0;
    return rows.reduce(function (chain, r) {
      return chain.then(function () {
        if (DATA_STORES.indexOf(r.store) === -1) return;         // store sconosciuto: ignora
        return idb(r.store, "readonly", function (s) { return s.get(r.id); }).then(function (cur) {
          if (cur && cur.updatedAt >= r.updatedAt) return;        // il locale è più recente o uguale
          n++;
          if (r.deleted) {
            return idb(r.store, "readwrite", function (s) { return s.delete(r.id); }).then(function () {
              return idb("tombstones", "readwrite", function (s) {
                return s.put({ id: r.store + ":" + r.id, store: r.store, recId: r.id, updatedAt: r.updatedAt });
              });
            });
          }
          return idb(r.store, "readwrite", function (s) {
            return s.put({ id: r.id, updatedAt: r.updatedAt, iv: unb64(r.iv), ct: unb64(r.ct).buffer });
          });
        });
      });
    }, Promise.resolve()).then(function () { return n; });
  }

  function sync(url, invito, accettazione) {
    need();
    if (!url) return Promise.reject(new Error("sync-non-configurato"));
    var startedAt = new Date().toISOString();
    var token = syncToken(), applied = 0;
    return syncMeta().then(function (m) {
      return localChanges(m.lastSync).then(function (changes) {
        /* Un giro per volta: il server risponde al massimo 500 righe e dice se ce ne sono altre. */
        function round(cursor, push) {
          return fetch(url.replace(/\/+$/, "") + "/sync", {
            method: "POST",
            headers: {
              "content-type": "application/json", authorization: "Bearer " + token,
              "x-kin-invite": invito || ""
            },
            body: JSON.stringify({ cursor: cursor, changes: push, accetto: accettazione || null })
          }).then(function (res) {
            if (!res.ok) return res.json().catch(function () { return {}; }).then(function (b) {
              var e = new Error(b.error || ("server " + res.status));
              e.status = res.status;
              throw e;
            });
            return res.json();
          }).then(function (data) {
            return applyRemote(data.changes || []).then(function (n) {
              applied += n;
              if (data.more) return round(data.cursor, []);
              return data.cursor;
            });
          });
        }
        return round(m.cursor, changes).then(function (cursor) {
          return idb("meta", "readwrite", function (s) {
            return s.put({ id: "sync", cursor: cursor, lastSync: startedAt });
          }).then(function () {
            return { inviati: changes.length, ricevuti: applied, quando: startedAt };
          });
        });
      });
    });
  }

  /* Svuota lo spazio di sync sul server. Da fare PRIMA di wipe(): dopo, il
     token non è più derivabile e i dati resterebbero là finché non scadono. */
  function wipeRemote(url) {
    need();
    return fetch(url.replace(/\/+$/, "") + "/wipe", {
      method: "POST", headers: { authorization: "Bearer " + syncToken() }
    }).then(function (res) {
      if (!res.ok) throw new Error("server " + res.status);
      return res.json();
    });
  }

  /* Cancella tutto il vault (usato dalla pagina Privacy, con doppia conferma). */
  function wipe() {
    lock(); cfg = null;
    return Promise.all(STORES.map(function (st) {
      return idb(st, "readwrite", function (s) { return s.clear(); });
    })).then(function () { return true; });
  }

  window.Vault = {
    isSetUp: isSetUp, setup: setup, unlock: unlock, lock: lock, changePass: changePass,
    unlocked: function () { return !!key; },
    onLock: function (f) { lockCbs.push(f); },
    setLockMinutes: function (m) { lockMs = m * 60 * 1000; touch(); },
    put: put, get: get, all: all, del: del,
    exportBackup: exportBackup, importBackup: importBackup, wipe: wipe,
    sync: sync, syncMeta: syncMeta, wipeRemote: wipeRemote,
    /* esposto solo per i test in Node (tools/test_vault.js, tools/test_sync.js) */
    _crypto: { deriveKey: deriveKey, deriveAll: deriveAll, seal: seal, unseal: unseal,
               b64: b64, unb64: unb64, b64url: b64url, ITER: ITER }
  };
})();
