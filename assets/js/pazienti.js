/* pazienti.js — Pazienti, sessioni di trattamento e agenda.
   Tutto in locale e cifrato (vedi store.js). Nessun account, nessuna rete.
   Vanilla JS come il resto dell'app: stringhe HTML + eventi delegati. */
(function () {
  "use strict";

  var V = window.Vault;
  var view = document.getElementById("pazView");
  if (!view || !V) return;

  var DATA = window.COORDINATE || [];
  /* Testo libero dell'operatore reso cliccabile: se nelle note scrive
     "Milza" o "VC8", quella parola porta alla scheda. Il grafo sta in
     links.js. */
  var AL = function (t, o) { return window.Links ? window.Links.autolink(t, o) : esc(t); };
  var esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };
  var uid = function () {
    return crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);
  };

  /* ---------- Stato ---------- */
  var st = {
    loaded: false,
    patients: [], sessions: [], appts: [],
    route: { name: "home" },
    activeId: null,     // sessione aperta (bozza in corso)
    capture: [],        // viste consultate nella sessione in corso
    cur: null,          // vista corrente { route, label, kind, t0 }
    q: ""
  };
  var LS_ACTIVE = "kapp-sessione-attiva", LS_BACKUP = "kapp-ultimo-backup";
  var LS_SYNC = "kapp-sync-url", LS_SYNC_AUTO = "kapp-sync-auto", LS_SYNC_LAST = "kapp-sync-ultimo";
  var LS_SYNC_INVITE = "kapp-sync-invito", LS_LEGAL = "kapp-accettazione";
  /* La configurazione della copia pubblicata (config.js) fa da default:
     l'operatore non deve incollare niente, ma se cambia qualcosa vince lui. */
  var CFG = window.KIN_CONFIG || {};
  function syncUrl() { return lsGet(LS_SYNC) || CFG.syncUrl || ""; }
  function syncInvito() { return lsGet(LS_SYNC_INVITE) || CFG.syncInvito || ""; }
  /* Versione dei testi legali: cambiala quando modifichi privacy/termini in
     modo sostanziale, così l'accettazione viene richiesta di nuovo. */
  var LEGAL_VER = "2";
  function accettazione() {
    try { return JSON.parse(lsGet(LS_LEGAL) || "null"); } catch (e) { return null; }
  }
  function accettato() {
    var a = accettazione();
    return !!(a && a.ver === LEGAL_VER);
  }
  function syncAutoOn() {
    var v = lsGet(LS_SYNC_AUTO);
    if (v !== null) return v === "1";
    return !!(CFG.syncUrl && CFG.syncAuto);
  }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} }

  /* ---------- Date ---------- */
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function toLocalInput(iso) {                       // ISO -> value di datetime-local
    var d = iso ? new Date(iso) : new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) +
           "T" + pad(d.getHours()) + ":" + pad(d.getMinutes());
  }
  function fromLocalInput(v) { return v ? new Date(v).toISOString() : null; }
  function dayKey(iso) { var d = new Date(iso); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  var GG = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
  var MM = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
  function fmtDay(iso) { var d = new Date(iso); return GG[d.getDay()] + " " + d.getDate() + " " + MM[d.getMonth()] + " " + d.getFullYear(); }
  function fmtShort(iso) { var d = new Date(iso); return pad(d.getDate()) + "/" + pad(d.getMonth() + 1) + "/" + d.getFullYear(); }
  function fmtTime(iso) { var d = new Date(iso); return pad(d.getHours()) + ":" + pad(d.getMinutes()); }
  function mesiDa(iso) { return Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 3600 * 24 * 30.4)); }

  /* ---------- Etichetta della vista consultata (per la cattura automatica) ---------- */
  function posFor(c1, c2) {
    if (!c1 || !c2) return null;
    var k = c2.meridianoKey || c2.meridiano;
    return (c1.atteggiamenti || []).find(function (a) { return a.meridiano === k; }) || null;
  }
  function labelForHash(h) {
    var m = h.match(/^#\/([^+]+)\+(.+)$/);
    if (m) {
      var a = DATA.find(function (x) { return x.id === m[1]; });
      var b = DATA.find(function (x) { return x.id === m[2]; });
      if (a && b) {
        var row = posFor(a, b);
        return { kind: "coordinata", ref: a.id + "+" + b.id,
                 label: a.meridiano + " · " + a.muscolo + " — pos. " + (row ? row.posizione : "?") + " (" + b.meridiano + ")" };
      }
    }
    if (h.indexOf("#cost") === 0) {
      var tc = (window.Cost && window.Cost.titolo) ? window.Cost.titolo(h) : "";
      return { kind: "costituzioni", ref: h, label: "Costituzioni" + (tc ? " · " + tc : " & Temperamenti") };
    }
    var mm = /^#punti\/mer\/([^/]+)(?:\/([^/]+))?/.exec(h);
    if (mm) {
      var M = window.Links ? window.Links.mer(decodeURIComponent(mm[1])) : null;
      return { kind: "punti", ref: h,
               label: "Meridiano " + (M ? M.nome : mm[1]) + (mm[2] ? " · " + decodeURIComponent(mm[2]) : "") };
    }
    var mp = /^#punti\/p\/(.+)$/.exec(h);
    if (mp) {
      var pid = decodeURIComponent(mp[1]);
      var PT = ((window.PUNTI_INDICATORI || {}).punti || []).find(function (x) { return x.id === pid; });
      return { kind: "punti", ref: h, label: "Punto d'allarme · " + (PT ? PT.organo : pid) };
    }
    if (h === "" || h === "#" || h.indexOf("#punti") === 0) return { kind: "punti", ref: "#punti", label: "Punti indicatori" };
    if (h === "#coordinate") return null;
    return null;
  }

  /* ---------- Caricamento ---------- */
  function refresh() {
    if (!V.unlocked()) return Promise.resolve();
    return Promise.all([V.all("patients"), V.all("sessions"), V.all("appointments")])
      .then(function (r) {
        st.patients = r[0]; st.sessions = r[1]; st.appts = r[2]; st.loaded = true;
        var a = lsGet(LS_ACTIVE);
        st.activeId = (a && st.sessions.some(function (s) { return s.id === a && s.stato === "bozza"; })) ? a : null;
        if (!st.activeId) lsSet(LS_ACTIVE, null);
        var act = activeSession();
        st.capture = act ? (act.voci || []) : [];
      });
  }
  function patient(id) { return st.patients.find(function (p) { return p.id === id; }) || null; }
  function session(id) { return st.sessions.find(function (s) { return s.id === id; }) || null; }
  function activeSession() { return st.activeId ? session(st.activeId) : null; }
  function sessionsOf(pid) {
    return st.sessions.filter(function (s) { return s.patientId === pid; })
      .sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });
  }
  function apptsOf(pid) {
    return st.appts.filter(function (a) { return a.patientId === pid; })
      .sort(function (a, b) { return (a.start || "").localeCompare(b.start || ""); });
  }
  function lastSessionDate(pid) { var s = sessionsOf(pid)[0]; return s ? s.date : null; }
  function nextAppt(pid) {
    var now = new Date().toISOString();
    return apptsOf(pid).filter(function (a) { return a.start >= now && a.stato !== "disdetto"; })[0] || null;
  }

  /* ---------- Salvataggio (debounce: non perdere niente, non scrivere a ogni tasto) ---------- */
  var saveTimers = {};
  function save(store, obj, now) {
    var k = store + ":" + obj.id;
    clearTimeout(saveTimers[k]);
    if (now) return V.put(store, obj);
    return new Promise(function (res) {
      /* L'auto-lock si azzera a ogni tasto, quindi qui non può essere scattato;
         il try evita comunque un errore non gestito nel caso limite. */
      saveTimers[k] = setTimeout(function () {
        try { V.put(store, obj).then(res); } catch (e) { res(null); }
      }, 600);
    });
  }

  /* ================= LOCK SCREEN ================= */
  function renderLock() {
    V.isSetUp().then(function (setUp) {
      view.innerHTML = setUp ? lockHtml() : setupHtml();
      var f = view.querySelector("form");
      if (f) f.addEventListener("submit", setUp ? doUnlock : doSetup);
      var join = document.getElementById("pzJoin");
      if (join) join.addEventListener("change", function () {
        var file = this.files && this.files[0];
        if (!file) return;
        file.text().then(function (txt) { return V.importBackup(txt); })
          .then(function (n) { showErr(""); alert(n + " record importati. Ora sblocca con la passphrase di quel dispositivo."); render(); })
          .catch(function (e) { showErr("File non valido: " + e.message); });
      });
    });
  }
  function lockHtml() {
    return '<div class="pz-lock"><h2>Area pazienti protetta</h2>' +
      '<p class="pz-muted">I dati dei pazienti sono cifrati su questo dispositivo. Inserisci la passphrase per aprirli.</p>' +
      '<form><input type="password" id="pzPass" autocomplete="current-password" placeholder="Passphrase" />' +
      '<button class="ebtn ebtn--primary" type="submit">Sblocca</button></form>' +
      '<p class="pz-err" id="pzErr" hidden></p></div>';
  }
  function setupHtml() {
    return '<div class="pz-lock"><h2>Crea l\'area pazienti</h2>' +
      '<p class="pz-muted">Scegli una passphrase: cifra tutti i dati dei pazienti su questo dispositivo. ' +
      'La consultazione dei manuali resta libera e non la richiede.</p>' +
      '<p class="pz-warn"><strong>Non esiste alcun recupero.</strong> Passphrase persa = dati persi: ' +
      'non c\'è nessun server che possa reimpostarla. Annotala in un posto sicuro ed esporta i backup.</p>' +
      '<form><input type="password" id="pzPass" autocomplete="new-password" placeholder="Passphrase (min. 8 caratteri)" />' +
      '<input type="password" id="pzPass2" autocomplete="new-password" placeholder="Ripeti la passphrase" />' +
      '<button class="ebtn ebtn--primary" type="submit">Crea area protetta</button></form>' +
      '<p class="pz-err" id="pzErr" hidden></p>' +
      '<hr class="pz-sep" />' +
      "<p class=\"pz-muted\">Hai già l'area su un altro dispositivo? Non ricrearla: " +
      "<strong>importa il backup</strong> di quel dispositivo, poi sblocca con la sua passphrase. " +
      "Da lì in poi il sync fa il resto.</p>" +
      '<label class="ebtn" for="pzJoin">⬆ Importa backup da un altro dispositivo</label>' +
      '<input id="pzJoin" type="file" accept=".kin,application/json" hidden /></div>';
  }
  function showErr(msg) {
    var e = document.getElementById("pzErr");
    if (e) { e.textContent = msg; e.hidden = false; }
  }
  function busy(on, txt) {
    var b = view.querySelector('button[type="submit"]');
    if (b) { b.disabled = on; if (on) b.textContent = txt || "Attendi…"; }
  }
  function doUnlock(e) {
    e.preventDefault();
    busy(true, "Sblocco…");
    V.unlock(document.getElementById("pzPass").value).then(function () {
      return refresh();
    }).then(function () { render(); autoSync(); }).catch(function (err) {
      busy(false); document.querySelector('button[type="submit"]').textContent = "Sblocca";
      showErr(err && err.message === "passphrase-errata" ? "Passphrase errata." : "Errore: " + (err && err.message));
    });
  }
  function doSetup(e) {
    e.preventDefault();
    var p = document.getElementById("pzPass").value, p2 = document.getElementById("pzPass2").value;
    if (p.length < 8) return showErr("Servono almeno 8 caratteri.");
    if (p !== p2) return showErr("Le due passphrase non coincidono.");
    busy(true, "Creazione…");
    V.setup(p).then(refresh).then(function () { render(); autoSync(); })
      .catch(function (err) { busy(false); showErr("Errore: " + err.message); });
  }

  /* ================= HOME: elenco pazienti ================= */
  function renderHome() {
    var q = st.q.toLowerCase();
    var rows = st.patients.filter(function (p) {
      if (!q) return true;
      return (p.displayName || "").toLowerCase().indexOf(q) !== -1 ||
             (p.tags || []).join(" ").toLowerCase().indexOf(q) !== -1;
    }).sort(function (a, b) {
      return (lastSessionDate(b.id) || "").localeCompare(lastSessionDate(a.id) || "");
    });

    var oggi = dayKey(new Date().toISOString());
    var todayAppts = st.appts.filter(function (a) { return dayKey(a.start) === oggi && a.stato !== "disdetto"; })
      .sort(function (a, b) { return a.start.localeCompare(b.start); });
    var bozze = st.sessions.filter(function (s) { return s.stato === "bozza"; });
    var persi = st.patients.filter(function (p) {
      var d = lastSessionDate(p.id); return d && mesiDa(d) >= 6;
    });

    view.innerHTML =
      '<div class="pz-wrap">' +
      '<div class="pz-bar">' +
        '<h2>Pazienti</h2>' +
        '<div class="pz-bar__actions">' +
          '<button class="ebtn" data-act="agenda">📅 Agenda</button>' +
          '<button class="ebtn" data-act="impostazioni">⚙ Impostazioni</button>' +
          '<button class="ebtn ebtn--primary" data-act="nuovo-paziente">＋ Nuovo paziente</button>' +
        '</div></div>' +

      '<div class="pz-today">' +
        '<div class="pz-today__box"><h3>Oggi</h3>' +
          (todayAppts.length
            ? '<ul class="pz-mini">' + todayAppts.map(function (a) {
                var p = patient(a.patientId);
                return '<li><button class="pz-link" data-act="apri-appuntamento" data-id="' + esc(a.id) + '">' +
                  fmtTime(a.start) + ' · ' + esc(p ? p.displayName : "—") +
                  '</button> <span class="pz-tag pz-tag--' + esc(a.stato) + '">' + esc(a.stato) + '</span></li>';
              }).join("") + "</ul>"
            : '<p class="pz-muted">Nessun appuntamento oggi.</p>') +
        '</div>' +
        (bozze.length ? '<div class="pz-today__box"><h3>Sessioni non chiuse</h3><ul class="pz-mini">' +
          bozze.map(function (s) {
            var p = patient(s.patientId);
            return '<li><button class="pz-link" data-act="apri-sessione" data-id="' + esc(s.id) + '">' +
              fmtShort(s.date) + ' · ' + esc(p ? p.displayName : "—") + '</button></li>';
          }).join("") + "</ul></div>" : "") +
        (persi.length ? '<div class="pz-today__box"><h3>Non visti da 6+ mesi</h3><ul class="pz-mini">' +
          persi.slice(0, 8).map(function (p) {
            return '<li><button class="pz-link" data-act="apri-paziente" data-id="' + esc(p.id) + '">' +
              esc(p.displayName) + '</button> <span class="pz-muted">' + mesiDa(lastSessionDate(p.id)) + ' mesi</span></li>';
          }).join("") + "</ul></div>" : "") +
      '</div>' +

      '<input class="pz-search" id="pzQ" type="search" placeholder="Cerca paziente o tag…" value="' + esc(st.q) + '" />' +
      (rows.length
        ? '<div class="pz-list">' + rows.map(patientCard).join("") + "</div>"
        : '<p class="pz-muted pz-empty">Nessun paziente. Comincia con «Nuovo paziente».</p>') +
      "</div>";

    var qi = document.getElementById("pzQ");
    qi.addEventListener("input", function () {
      st.q = qi.value;
      var pos = qi.selectionStart;
      renderHome();
      var n = document.getElementById("pzQ"); n.focus(); n.setSelectionRange(pos, pos);
    });
  }
  function patientCard(p) {
    var last = lastSessionDate(p.id), next = nextAppt(p.id);
    var n = sessionsOf(p.id).length;
    return '<button class="pz-card" data-act="apri-paziente" data-id="' + esc(p.id) + '">' +
      '<span class="pz-avatar" style="--c:' + esc(p.color || "#0f766e") + '">' + esc(iniziali(p.displayName)) + "</span>" +
      '<span class="pz-card__body"><span class="pz-card__name">' + esc(p.displayName || "Senza nome") + "</span>" +
      '<span class="pz-card__meta">' + (n ? n + (n === 1 ? " sessione" : " sessioni") : "nessuna sessione") +
        (last ? " · ultima " + fmtShort(last) : "") + "</span>" +
      ((p.tags || []).length ? '<span class="pz-chips">' + p.tags.map(function (t) { return '<span class="pz-chip">' + esc(t) + "</span>"; }).join("") + "</span>" : "") +
      "</span>" +
      (next ? '<span class="pz-next">' + fmtShort(next.start) + "<br>" + fmtTime(next.start) + "</span>" : "") +
      "</button>";
  }
  function iniziali(n) {
    return String(n || "?").trim().split(/\s+/).slice(0, 2).map(function (w) { return w[0] || ""; }).join("").toUpperCase();
  }

  /* ================= SCHEDA PAZIENTE ================= */
  var CAMPI = [
    ["displayName", "Nome o riferimento", "text"],
    ["birthDate", "Data di nascita", "date"],
    ["phone", "Telefono", "tel"],
    ["email", "Email", "email"],
    ["tagsCsv", "Tag (separati da virgola)", "text"]
  ];
  var AREE = [
    ["anamnesi", "Anamnesi"],
    ["farmaci", "Farmaci"],
    ["allergie", "Allergie"],
    ["controindicazioni", "Controindicazioni"],
    ["costituzione", "Costituzione & temperamento"]
  ];
  function renderPatient(id) {
    var p = patient(id);
    if (!p) { location.hash = "#paz"; return; }
    var ses = sessionsOf(p.id), ap = apptsOf(p.id).filter(function (a) { return a.start >= new Date().toISOString(); });

    view.innerHTML =
      '<div class="pz-wrap">' +
      '<div class="pz-bar"><h2>' + esc(p.displayName || "Paziente") + "</h2>" +
        '<div class="pz-bar__actions">' +
          '<button class="ebtn ebtn--primary" data-act="inizia-sessione" data-id="' + esc(p.id) + '">▶ Inizia sessione</button>' +
          '<button class="ebtn" data-act="nuovo-appuntamento" data-id="' + esc(p.id) + '">📅 Appuntamento</button>' +
          '<button class="ebtn" data-act="stampa" data-id="' + esc(p.id) + '">🖨 Stampa scheda</button>' +
          '<button class="ebtn" data-act="esporta-paziente" data-id="' + esc(p.id) + '">⬇ Esporta</button>' +
          '<button class="ebtn ebtn--danger" data-act="elimina-paziente" data-id="' + esc(p.id) + '">🗑 Elimina</button>' +
        "</div></div>" +

      '<section class="pz-box"><h3>Dati</h3><div class="pz-grid">' +
        CAMPI.map(function (c) {
          var val = c[0] === "tagsCsv" ? (p.tags || []).join(", ") : (p[c[0]] || "");
          return '<label class="pz-f"><span>' + esc(c[1]) + "</span>" +
            '<input type="' + c[2] + '" data-p="' + c[0] + '" value="' + esc(val) + '" /></label>';
        }).join("") +
      "</div>" +
      '<label class="pz-f pz-f--check"><input type="checkbox" data-p="consenso" ' + (p.consenso && p.consenso.dato ? "checked" : "") + " />" +
        "<span>Consenso al trattamento dei dati acquisito" +
        (p.consenso && p.consenso.data ? " <em>(" + esc(fmtShort(p.consenso.data)) + ")</em>" : "") + "</span></label>" +
      '<label class="pz-f"><span>Note sul consenso (dove è archiviato il cartaceo)</span>' +
        '<input type="text" data-p="consensoNote" value="' + esc((p.consenso && p.consenso.note) || "") + '" /></label>' +
      "</section>" +

      '<section class="pz-box"><h3>Note permanenti</h3>' +
        AREE.map(function (a) {
          return '<label class="pz-f"><span>' + esc(a[1]) + "</span>" +
            '<textarea data-p="' + a[0] + '" rows="2">' + esc(p[a[0]] || "") + "</textarea></label>" +
            (a[0] === "costituzione" ? costLinks(p.costituzione) : noteLinks(p[a[0]]));
        }).join("") +
      "</section>" +

      (ap.length ? '<section class="pz-box"><h3>Prossimi appuntamenti</h3><ul class="pz-mini">' +
        ap.map(function (a) {
          return "<li>" + fmtShort(a.start) + " " + fmtTime(a.start) + " · " + esc(a.luogo || "") +
            ' <span class="pz-tag pz-tag--' + esc(a.stato) + '">' + esc(a.stato) + "</span>" +
            ' <button class="ebtn ebtn--mini" data-act="appuntamento-fatto" data-id="' + esc(a.id) + '">▶ Svolgi</button></li>';
        }).join("") + "</ul></section>" : "") +

      '<section class="pz-box"><h3>Sessioni <span class="pz-muted">(' + ses.length + ")</span></h3>" +
        (ses.length ? '<ul class="pz-timeline">' + ses.map(sessionRow).join("") + "</ul>"
                    : '<p class="pz-muted">Nessuna sessione registrata.</p>') +
      "</section>" +

      ricorrenzeBox(ses) +
      "</div>";

    view.querySelectorAll("[data-p]").forEach(function (inp) {
      inp.addEventListener(inp.type === "checkbox" ? "change" : "input", function () {
        var f = inp.dataset.p;
        if (f === "tagsCsv") p.tags = inp.value.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
        else if (f === "consenso") p.consenso = { dato: inp.checked, data: inp.checked ? new Date().toISOString() : null, note: (p.consenso || {}).note || "" };
        else if (f === "consensoNote") p.consenso = { dato: (p.consenso || {}).dato || false, data: (p.consenso || {}).data || null, note: inp.value };
        else p[f] = inp.value;
        save("patients", p);
      });
    });
  }
  /* Dal testo libero "Costituzione & temperamento" alla scheda relativa:
     si riconosce il nome scritto (TAI YANG, Shao Yin…); se non c'è nulla di
     riconoscibile si offre il percorso guidato. */
  /* Le note permanenti restano in una textarea, quindi il testo non si
     può linkare dentro: i riferimenti riconosciuti (meridiani, muscoli,
     punti, costituzioni) compaiono come chip sotto al campo. */
  function noteLinks(txt) {
    var L = window.Links;
    if (!L || !L.chipsCitate) return "";
    var chips = L.chipsCitate(txt, 6);
    return chips.length ? L.box("", [L.row("Citati qui", chips)]) : "";
  }
  function costLinks(txt) {
    var L = window.Links, D = window.COSTITUZIONI;
    if (!L || !D || !D.costituzioni) return "";
    var t = String(txt || "").toLowerCase();
    var chips = D.costituzioni.filter(function (c) {
      return t.indexOf(c.nome.toLowerCase()) !== -1 || t.indexOf(c.id.replace("-", " ")) !== -1;
    }).map(function (c) {
      return L.chip({ kind: "cost", href: L.hrefCost(c.id), label: c.nome, sub: c.temperamento });
    });
    if (!chips.length) {
      chips = [L.chip({ kind: "cost", href: "#cost/coppia", label: "Trova costituzione e temperamento",
                        sub: "percorso guidato in 2 passi" })];
    }
    return L.box("", [L.row("", chips)]);
  }

  /* ---------- Anteprima di una seduta nella timeline del paziente ----------
     Mostrava solo le coordinate aggiunte a mano, che quasi nessuno compila:
     il risultato era una riga con la data e un trattino. Qui si ripiega su
     ciò che l'app ha registrato da sola (le voci consultate) e si aggiunge
     una riga di indicatori, così la timeline dice davvero com'è andata. */
  function taglia(t, n) {
    t = String(t == null ? "" : t).replace(/\s+/g, " ").trim();
    return t.length > n ? t.slice(0, n - 1).replace(/\s+$/, "") + "…" : t;
  }
  var ESITO = { forte: ["ok", "forte"], debole: ["ko", "debole"], nt: ["nt", "non testato"] };
  function sessionPreview(s) {
    var co = s.coordinate || [], voci = s.voci || [];
    var titolo;
    if (co.length) {
      titolo = co.slice(0, 3).map(function (c) {
        var e = ESITO[c.esito] || ESITO.nt;
        return '<span class="pz-tl__co"><i class="pz-tl__dot pz-tl__dot--' + e[0] +
          '" title="' + e[1] + '"></i>' + esc(taglia(c.label, 46)) + "</span>";
      }).join("") + (co.length > 3 ? '<span class="pz-tl__piu">+' + (co.length - 3) + "</span>" : "");
    } else if (voci.length) {
      /* Se ha spuntato qualcosa contano solo quelle: il resto era sfogliare. */
      var usate = voci.filter(function (v) { return v.usato; });
      var lista = usate.length ? usate : voci;
      titolo = '<span class="pz-tl__cons">Consultato</span>' +
        lista.slice(0, 3).map(function (v) { return esc(taglia(v.label, 40)); }).join(" · ") +
        (lista.length > 3 ? '<span class="pz-tl__piu">+' + (lista.length - 3) + "</span>" : "");
    } else {
      titolo = '<span class="pz-muted">Nessuna coordinata registrata</span>';
    }
    var meta = [];
    if (co.length && voci.length) meta.push(voci.length + (voci.length === 1 ? " sezione" : " sezioni") + " consultate");
    if (s.durataMin) meta.push(s.durataMin + " min");
    if (s.pre != null && s.post != null) meta.push("scala " + s.pre + " → " + s.post);
    if (s.correzioni) meta.push("correzioni: " + taglia(s.correzioni, 32));
    if (s.essenze) meta.push("essenze: " + taglia(s.essenze, 32));
    if (s.compitiCasa) meta.push("compiti a casa");
    if (s.prossimoPasso) meta.push("prossimo passo");
    if ((s.allegati || []).length) meta.push(s.allegati.length + (s.allegati.length === 1 ? " foto" : " foto"));
    if (s.note) meta.push("note");
    return { titolo: titolo, meta: meta };
  }
  function sessionRow(s) {
    var a = sessionPreview(s);
    return '<li><button class="pz-link pz-timeline__b" data-act="apri-sessione" data-id="' + esc(s.id) + '">' +
      '<span class="pz-timeline__d">' + fmtShort(s.date) +
        (s.stato === "bozza" ? '<span class="pz-tag pz-tag--bozza">bozza</span>' : "") + "</span>" +
      '<span class="pz-tl__body">' +
        '<span class="pz-timeline__t">' + a.titolo + "</span>" +
        (a.meta.length ? '<span class="pz-tl__meta">' + a.meta.map(function (m) {
          return '<span class="pz-tl__b">' + esc(m) + "</span>";
        }).join("") + "</span>" : "") +
      "</span></button></li>";
  }
  function ricorrenzeBox(ses) {
    var cnt = {};
    ses.forEach(function (s) {
      (s.coordinate || []).forEach(function (c) {
        var e = cnt[c.label] || (cnt[c.label] = { n: 0, ref: "" });
        e.n++; if (!e.ref && c.ref) e.ref = c.ref;
      });
    });
    var rows = Object.keys(cnt).map(function (k) { return [k, cnt[k]]; })
      .filter(function (r) { return r[1].n > 1; })
      .sort(function (a, b) { return b[1].n - a[1].n; }).slice(0, 8);
    if (!rows.length) return "";
    return '<section class="pz-box"><h3>Coordinate ricorrenti</h3><ul class="pz-mini">' +
      rows.map(function (r) {
        return "<li>" + refLink("coordinata", r[1].ref, r[0], "") +
          ' <strong>×' + r[1].n + "</strong></li>";
      }).join("") +
      "</ul></section>";
  }

  /* ================= SESSIONE ================= */
  function renderSession(id) {
    var s = session(id);
    if (!s) { location.hash = "#paz"; return; }
    var p = patient(s.patientId);
    var prev = sessionsOf(s.patientId).filter(function (x) { return x.id !== s.id && x.date < s.date; })[0];
    var attiva = st.activeId === s.id;

    view.innerHTML =
      '<div class="pz-wrap">' +
      '<div class="pz-bar"><h2>Sessione · ' + esc(p ? p.displayName : "—") + "</h2>" +
        '<div class="pz-bar__actions">' +
          '<button class="ebtn" data-act="apri-paziente" data-id="' + esc(s.patientId) + '">Scheda paziente</button>' +
          (attiva ? '<button class="ebtn ebtn--primary" data-act="chiudi-sessione" data-id="' + esc(s.id) + '">✓ Chiudi e salva</button>'
                  : '<button class="ebtn" data-act="riapri-sessione" data-id="' + esc(s.id) + '">↺ Riprendi</button>') +
          '<button class="ebtn ebtn--danger" data-act="elimina-sessione" data-id="' + esc(s.id) + '">🗑</button>' +
        "</div></div>" +

      (prev ? '<section class="pz-box pz-prev"><h3>Seduta precedente · ' + fmtShort(prev.date) + "</h3>" +
        '<p><strong>Fatto:</strong> ' + ((prev.coordinate || []).length
          ? (prev.coordinate || []).map(function (c) { return refLink("coordinata", c.ref, c.label, ""); }).join(" · ")
          : "—") + "</p>" +
        (prev.compitiCasa ? "<p><strong>Compiti assegnati:</strong> " + AL(prev.compitiCasa, { max: 4 }) + "</p>" : "") +
        (prev.prossimoPasso ? '<p class="pz-hl"><strong>Da provare oggi:</strong> ' + AL(prev.prossimoPasso, { max: 4 }) + "</p>" : "") +
        "</section>" : "") +

      '<section class="pz-box"><h3>Quando</h3><div class="pz-grid">' +
        '<label class="pz-f"><span>Data e ora</span><input type="datetime-local" data-s="date" value="' + esc(toLocalInput(s.date)) + '" /></label>' +
        '<label class="pz-f"><span>Durata (minuti)</span><input type="number" min="0" step="5" data-s="durataMin" value="' + esc(s.durataMin || "") + '" /></label>' +
      "</div></section>" +

      catturaBox(s, attiva) +

      '<section class="pz-box"><h3>Coordinate testate</h3>' +
        '<div class="pz-coords">' + (s.coordinate || []).map(coordRow).join("") + "</div>" +
        '<div class="pz-addrow"><input list="pzCoordList" id="pzCoordIn" placeholder="Aggiungi coordinata (meridiano o muscolo)…" />' +
        '<button class="ebtn" data-act="add-coord">＋</button></div>' +
        '<datalist id="pzCoordList">' + DATA.map(function (c) {
          return '<option value="' + esc(c.meridiano + " · " + c.muscolo) + '"></option>';
        }).join("") + "</datalist>" +
      "</section>" +

      '<section class="pz-box"><h3>Cosa ho fatto</h3>' +
        area("correzioni", "Correzioni applicate (tecnica, mano, note)", s, 3) +
        area("essenze", "Essenze / fiori consigliati", s, 2) +
        area("note", "Note della seduta", s, 5) +
      "</section>" +

      '<section class="pz-box"><h3>Paziente</h3><div class="pz-grid">' +
        '<label class="pz-f"><span>Prima (0–10)</span><input type="number" min="0" max="10" data-s="pre" value="' + esc(s.pre == null ? "" : s.pre) + '" /></label>' +
        '<label class="pz-f"><span>Dopo (0–10)</span><input type="number" min="0" max="10" data-s="post" value="' + esc(s.post == null ? "" : s.post) + '" /></label>' +
      "</div>" +
        area("osservazioni", "Osservazioni (riferito / percepito)", s, 3) +
        area("compitiCasa", "Compiti a casa", s, 2) +
        area("prossimoPasso", "Prossimo passo (lo rileggerai la volta dopo)", s, 2) +
      "</section>" +

      '<section class="pz-box"><h3>Allegati</h3>' +
        '<div class="pz-thumbs">' + (s.allegati || []).map(function (a, i) {
          return '<figure><img src="' + esc(a.src) + '" alt="Allegato ' + (i + 1) + '" />' +
            '<button class="ebtn ebtn--mini ebtn--danger" data-act="del-allegato" data-i="' + i + '">×</button></figure>';
        }).join("") + "</div>" +
        '<label class="ebtn" for="pzFoto">⬆ Aggiungi foto</label>' +
        '<input id="pzFoto" type="file" accept="image/*" hidden />' +
      "</section>" +

      '<div class="pz-bar__actions pz-end">' +
        '<button class="ebtn" data-act="riepilogo" data-id="' + esc(s.id) + '">📄 Riepilogo per il paziente</button>' +
      "</div></div>";

    view.querySelectorAll("[data-s]").forEach(function (inp) {
      inp.addEventListener("input", function () {
        var f = inp.dataset.s;
        if (f === "date") s.date = fromLocalInput(inp.value) || s.date;
        else if (f === "pre" || f === "post" || f === "durataMin") s[f] = inp.value === "" ? null : Number(inp.value);
        else s[f] = inp.value;
        save("sessions", s);
      });
    });
    var foto = document.getElementById("pzFoto");
    if (foto) foto.addEventListener("change", function () {
      var f = foto.files && foto.files[0];
      if (!f) return;
      shrink(f, 1600).then(function (src) {
        if (!src) return;
        s.allegati = (s.allegati || []).concat([{ src: src }]);
        return save("sessions", s, true).then(function () { renderSession(s.id); });
      });
    });
  }
  function area(f, label, s, rows) {
    return '<label class="pz-f"><span>' + esc(label) + "</span>" +
      '<textarea data-s="' + f + '" rows="' + rows + '">' + esc(s[f] || "") + "</textarea></label>";
  }
  /* Le voci registrate durante la seduta puntano a ciò che è stato aperto:
     riaprirlo dalla scheda deve costare un tocco, non una ricerca. */
  function refHref(kind, ref) {
    if (!ref) return "";
    return kind === "coordinata" ? "#/" + ref : ref;
  }
  function refLink(kind, ref, label, cls) {
    var h = refHref(kind, ref);
    if (!h) return '<span class="' + esc(cls || "") + '">' + esc(label) + "</span>";
    return '<a class="' + esc(cls || "") + ' xref" href="' + esc(h) + '">' + esc(label) + "</a>";
  }
  function coordRow(c, i) {
    var esiti = [["forte", "Forte"], ["debole", "Debole"], ["nt", "Non testato"]];
    return '<div class="pz-coord">' + refLink("coordinata", c.ref, c.label, "pz-coord__l") +
      '<span class="pz-seg">' + esiti.map(function (e) {
        return '<button class="ebtn ebtn--mini' + (c.esito === e[0] ? " is-on" : "") +
          '" data-act="esito" data-i="' + i + '" data-v="' + e[0] + '">' + e[1] + "</button>";
      }).join("") + "</span>" +
      '<button class="ebtn ebtn--mini ebtn--danger" data-act="del-coord" data-i="' + i + '">×</button></div>';
  }
  /* Checklist pre-compilata da ciò che l'operatore ha davvero consultato. */
  function catturaBox(s, attiva) {
    var voci = s.voci || [];
    if (!voci.length) {
      return '<section class="pz-box"><h3>Consultato durante la seduta</h3>' +
        '<p class="pz-muted">' + (attiva
          ? "Naviga pure nei manuali: l'app segna da sola le coordinate e le sezioni che apri."
          : "Nessuna vista registrata.") + "</p></section>";
    }
    return '<section class="pz-box"><h3>Consultato durante la seduta</h3>' +
      '<p class="pz-muted">Spunta ciò che hai davvero usato; il resto era solo consultazione.</p>' +
      '<ul class="pz-check">' + voci.map(function (v, i) {
        /* Il collegamento sta FUORI dalla <label>: dentro, un clic sul link
           spunterebbe anche la casella. */
        var go = refHref(v.kind, v.ref);
        return '<li><label><input type="checkbox" data-act="voce" data-i="' + i + '"' + (v.usato ? " checked" : "") + " />" +
          "<span>" + esc(v.label) + ' <em class="pz-muted">' + Math.round((v.dwell || 0) / 1000) + "s</em></span></label>" +
          (go ? ' <a class="xref pz-voce__go" href="' + esc(go) + '">riapri ›</a>' : "") +
          (v.kind === "coordinata" ? ' <button class="ebtn ebtn--mini" data-act="voce-coord" data-i="' + i + '">＋ tra le coordinate</button>' : "") +
          "</li>";
      }).join("") + "</ul></section>";
  }
  function shrink(file, max) {
    return new Promise(function (res) {
      var img = new Image(), url = URL.createObjectURL(file);
      img.onload = function () {
        var s = Math.min(1, max / Math.max(img.width, img.height));
        var c = document.createElement("canvas");
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        res(c.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = function () { URL.revokeObjectURL(url); res(null); };
      img.src = url;
    });
  }

  /* ================= AGENDA ================= */
  function renderAgenda() {
    var from = st.agendaFrom || dayKey(new Date().toISOString());
    var rows = st.appts.filter(function (a) { return dayKey(a.start) >= from; })
      .sort(function (a, b) { return a.start.localeCompare(b.start); });
    var giorni = {};
    rows.forEach(function (a) { (giorni[dayKey(a.start)] = giorni[dayKey(a.start)] || []).push(a); });

    view.innerHTML =
      '<div class="pz-wrap">' +
      '<div class="pz-bar"><h2>Agenda</h2><div class="pz-bar__actions">' +
        '<label class="pz-f pz-f--inline"><span>Dal</span><input type="date" id="pzFrom" value="' + esc(from) + '" /></label>' +
        '<button class="ebtn" data-act="ics">⬇ Esporta .ics</button>' +
        '<button class="ebtn" data-act="paz-home">Pazienti</button>' +
      "</div></div>" +

      '<section class="pz-box"><h3>Nuovo appuntamento</h3><div class="pz-grid">' +
        '<label class="pz-f"><span>Paziente</span><select id="apPat">' +
          st.patients.map(function (p) {
            return '<option value="' + esc(p.id) + '"' + (st.agendaFor === p.id ? " selected" : "") + ">" + esc(p.displayName) + "</option>";
          }).join("") +
        "</select></label>" +
        '<label class="pz-f"><span>Quando</span><input type="datetime-local" id="apStart" value="' + esc(toLocalInput()) + '" /></label>' +
        '<label class="pz-f"><span>Durata (min)</span><input type="number" id="apDur" value="60" step="15" min="15" /></label>' +
        '<label class="pz-f"><span>Luogo / nota</span><input type="text" id="apNote" /></label>' +
      "</div>" +
      '<button class="ebtn ebtn--primary" data-act="crea-appuntamento">＋ Aggiungi</button>' +
      (st.patients.length ? "" : '<p class="pz-muted">Crea prima un paziente.</p>') +
      "</section>" +

      (Object.keys(giorni).length
        ? Object.keys(giorni).sort().map(function (g) {
            return '<section class="pz-box"><h3>' + esc(fmtDay(giorni[g][0].start)) + "</h3>" +
              '<ul class="pz-appts">' + giorni[g].map(apptRow).join("") + "</ul></section>";
          }).join("")
        : '<p class="pz-muted pz-empty">Nessun appuntamento da questa data.</p>') +
      "</div>";

    document.getElementById("pzFrom").addEventListener("change", function () {
      st.agendaFrom = this.value; renderAgenda();
    });
  }
  function apptRow(a) {
    var p = patient(a.patientId);
    return '<li class="pz-appt pz-appt--' + esc(a.stato) + '">' +
      '<span class="pz-appt__h">' + fmtTime(a.start) + "–" + fmtTime(a.end) + "</span>" +
      '<span class="pz-appt__n">' + esc(p ? p.displayName : "—") +
        (a.luogo ? ' <span class="pz-muted">· ' + esc(a.luogo) + "</span>" : "") + "</span>" +
      '<span class="pz-tag pz-tag--' + esc(a.stato) + '">' + esc(a.stato) + "</span>" +
      '<span class="pz-appt__a">' +
        '<button class="ebtn ebtn--mini ebtn--primary" data-act="appuntamento-fatto" data-id="' + esc(a.id) + '">▶ Svolgi</button>' +
        '<button class="ebtn ebtn--mini" data-act="appuntamento-stato" data-id="' + esc(a.id) + '" data-v="confermato">Conferma</button>' +
        '<button class="ebtn ebtn--mini" data-act="appuntamento-stato" data-id="' + esc(a.id) + '" data-v="disdetto">Disdetto</button>' +
        '<button class="ebtn ebtn--mini" data-act="appuntamento-stato" data-id="' + esc(a.id) + '" data-v="assente">Assente</button>' +
        '<button class="ebtn ebtn--mini ebtn--danger" data-act="elimina-appuntamento" data-id="' + esc(a.id) + '">🗑</button>' +
      "</span></li>";
  }

  /* ================= IMPOSTAZIONI / PRIVACY ================= */
  function renderSettings() {
    var ultimo = lsGet(LS_BACKUP);
    var vecchio = !ultimo || (Date.now() - Number(ultimo)) > 30 * 24 * 3600 * 1000;
    view.innerHTML =
      '<div class="pz-wrap">' +
      '<div class="pz-bar"><h2>Impostazioni &amp; privacy</h2>' +
        '<div class="pz-bar__actions"><button class="ebtn" data-act="paz-home">Pazienti</button></div></div>' +

      '<section class="pz-box"><h3>Backup</h3>' +
        '<p class="pz-muted">Il backup è cifrato con la tua passphrase: senza di essa è illeggibile. ' +
        "È anche l'unico modo per spostare i dati su un altro dispositivo.</p>" +
        (vecchio ? '<p class="pz-warn">Ultimo backup: ' + (ultimo ? fmtShort(new Date(Number(ultimo)).toISOString()) : "mai") + ". Esportane uno.</p>"
                 : '<p class="pz-muted">Ultimo backup: ' + fmtShort(new Date(Number(ultimo)).toISOString()) + ".</p>") +
        '<button class="ebtn ebtn--primary" data-act="backup-export">⬇ Esporta backup</button> ' +
        '<label class="ebtn" for="pzImp">⬆ Importa backup</label>' +
        '<input id="pzImp" type="file" accept=".kin,application/json" hidden />' +
      "</section>" +

      '<section class="pz-box"><h3>Sync fra dispositivi</h3>' +
        '<p class="pz-muted">Facoltativo e <strong>non preconfigurato</strong>: ' +
        "l'app non è collegata ad alcun " +
        'server. Se ne vuoi uno devi installartelo (istruzioni nella cartella <code>sync/</code>) e incollarne ' +
        "qui l'indirizzo. I dati viaggiano <strong>già cifrati</strong>: il server non può leggerli.</p>" +
        '<p class="pz-warn">Per aggiungere un dispositivo: <strong>esporta il backup da qui e importalo là</strong> ' +
        "(schermata iniziale dell'area pazienti), poi incolla lo stesso indirizzo. " +
        "Ricreare l'area con la stessa passphrase <strong>non basta</strong>: sarebbe uno spazio separato e vuoto.</p>" +
        '<label class="pz-f"><span>Indirizzo del server</span>' +
          '<input type="url" id="pzSyncUrl" placeholder="https://kin-sync.tuonome.workers.dev" value="' + esc(syncUrl()) + '" /></label>' +
        '<label class="pz-f"><span>Codice di invito (solo se il server lo richiede, la prima volta)</span>' +
          '<input type="text" id="pzSyncInvite" value="' + esc(syncInvito()) + '" /></label>' +
        '<label class="pz-f pz-f--check"><input type="checkbox" id="pzAccetto"' + (accettato() ? " checked" : "") + " />" +
          '<span>Ho letto <a href="privacy.html">privacy</a> e <a href="termini.html">termini</a> ' +
          "e prendo atto che, attivando un server mio, resto <strong>unico titolare</strong> " +
          "e che l'accordo ex art. 28 GDPR va stipulato con chi ospita quel server.</span></label>" +
        '<p class="pz-muted" id="pzSyncState">' + esc(syncStato()) + "</p>" +
        '<button class="ebtn ebtn--primary" data-act="sync-now">⇅ Sincronizza adesso</button> ' +
        '<label class="pz-f pz-f--check"><input type="checkbox" id="pzSyncAuto"' + (syncAutoOn() ? " checked" : "") + " />" +
          "<span>Sincronizza da solo (allo sblocco e ogni 5 minuti)</span></label>" +
      "</section>" +

      '<section class="pz-box"><h3>Sicurezza</h3>' +
        '<label class="pz-f"><span>Blocco automatico dopo (minuti)</span>' +
          '<input type="number" id="pzLockMin" min="1" max="60" value="' + esc(lsGet("kapp-lock-min") || 5) + '" /></label>' +
        '<button class="ebtn" data-act="lock-now">🔒 Blocca adesso</button>' +
        "<h4>Cambia passphrase</h4>" +
        '<div class="pz-grid">' +
          '<label class="pz-f"><span>Attuale</span><input type="password" id="pzOld" /></label>' +
          '<label class="pz-f"><span>Nuova (min. 8)</span><input type="password" id="pzNew" /></label>' +
        "</div>" +
        '<button class="ebtn" data-act="cambia-pass">Cambia</button>' +
        '<p class="pz-err" id="pzErr" hidden></p>' +
      "</section>" +

      '<section class="pz-box"><h3>Come sono protetti i dati</h3>' +
        "<ul class=\"pz-ul\">" +
        (syncUrl()
          ? "<li>I dati stanno su <strong>questo dispositivo</strong> (IndexedDB del browser) e, se attivi il sync, in copia <strong>cifrata</strong> sul server. Nessun account, nessuna statistica: il server riceve testo cifrato che non può leggere.</li>"
          : "<li>I dati stanno <strong>solo su questo dispositivo</strong> (IndexedDB del browser). Nessun server, nessun account, nessuna statistica.</li>") +
        "<li>Ogni record è cifrato con <strong>AES-GCM 256</strong>; la chiave deriva dalla passphrase con <strong>PBKDF2-SHA256, 600.000 iterazioni</strong>, e resta solo in memoria.</li>" +
        "<li><strong>Nessun recupero della passphrase</strong>: se la perdi, i dati non sono recuperabili da nessuno.</li>" +
        "<li><strong>Limite:</strong> la cifratura protegge i dati a riposo, cioè da chi mette le mani su questo dispositivo. " +
        "Non protegge da un dispositivo già compromesso (keylogger, estensioni malevole).</li>" +
        "<li>Titolare del trattamento sei tu, operatore. I dati sanitari sono categoria particolare (GDPR art. 9): " +
        "raccogli il consenso e conserva il modulo firmato.</li>" +
        "<li>Da ogni scheda paziente puoi <strong>esportare</strong> (diritto di accesso e portabilità) ed <strong>eliminare</strong> tutti i suoi dati.</li>" +
        "</ul>" +
        '<p><a href="privacy.html">Informativa privacy completa</a> · ' +
        '<a href="termini.html">Termini d\'uso e nomina a responsabile</a></p>' +
        (accettato() ? '<p class="pz-muted">Termini versione ' + esc(LEGAL_VER) + " accettati il " +
          esc(fmtShort(accettazione().at)) + ".</p>" : "") +
      "</section>" +

      '<section class="pz-box"><h3>Zona pericolosa</h3>' +
        '<p class="pz-muted">Cancella <strong>tutti</strong> i pazienti, le sessioni e gli appuntamenti di questo dispositivo. I backup già esportati non vengono toccati.</p>' +
        (syncUrl() ? '<p class="pz-warn">Il sync è attivo: se cancelli solo qui, i dati tornano al prossimo sync. Svuota <strong>prima</strong> il server.</p>' +
          '<button class="ebtn ebtn--danger" data-act="wipe-remote">Cancella anche sul server</button> ' : "") +
        '<button class="ebtn ebtn--danger" data-act="wipe">Cancella tutto</button>' +
      "</section></div>";

    document.getElementById("pzSyncUrl").addEventListener("change", function () {
      lsSet(LS_SYNC, this.value.trim() || null);
    });
    document.getElementById("pzSyncInvite").addEventListener("change", function () {
      lsSet(LS_SYNC_INVITE, this.value.trim() || null);
    });
    document.getElementById("pzAccetto").addEventListener("change", function () {
      lsSet(LS_LEGAL, this.checked ? JSON.stringify({ ver: LEGAL_VER, at: new Date().toISOString() }) : null);
      badge();
    });
    document.getElementById("pzSyncAuto").addEventListener("change", function () {
      lsSet(LS_SYNC_AUTO, this.checked ? "1" : "0");
      autoSync();
    });
    document.getElementById("pzLockMin").addEventListener("change", function () {
      var m = Math.max(1, Math.min(60, Number(this.value) || 5));
      lsSet("kapp-lock-min", m); V.setLockMinutes(m);
    });
    document.getElementById("pzImp").addEventListener("change", function () {
      var f = this.files && this.files[0];
      if (!f) return;
      f.text().then(function (txt) { return V.importBackup(txt); })
        .then(function (n) { return refresh().then(function () { alert(n + " record importati."); render(); }); })
        .catch(function (e) {
          alert(e.message === "backup-di-un-altro-vault"
            ? "Questo backup viene da un'altra area protetta (passphrase diversa): non è importabile qui."
            : "File non valido: " + e.message);
        });
    });
  }

  /* ================= AZIONI ================= */
  view.addEventListener("click", function (e) {
    var b = e.target.closest("[data-act]");
    if (!b) return;
    var act = b.dataset.act, id = b.dataset.id, i = Number(b.dataset.i);
    var s = st.route.name === "sessione" ? session(st.route.id) : null;

    switch (act) {
      case "paz-home": location.hash = "#paz"; break;
      case "agenda": location.hash = "#paz/agenda"; break;
      case "impostazioni": location.hash = "#paz/impostazioni"; break;
      case "apri-paziente": location.hash = "#paz/p/" + id; break;
      case "apri-sessione": location.hash = "#paz/s/" + id; break;

      case "nuovo-paziente": {
        var nome = prompt("Nome o riferimento del paziente:");
        if (!nome) return;
        var p = { id: uid(), displayName: nome.trim(), tags: [], color: colore(nome), createdAt: new Date().toISOString() };
        V.put("patients", p).then(function () { st.patients.push(p); location.hash = "#paz/p/" + p.id; });
        break;
      }
      case "elimina-paziente": {
        var pp = patient(id);
        if (!pp) return;
        if (!confirm("Eliminare «" + pp.displayName + "» e tutte le sue sessioni? L'operazione non è reversibile.")) return;
        var ses = sessionsOf(id), ap = apptsOf(id);
        Promise.all([V.del("patients", id)]
          .concat(ses.map(function (x) { return V.del("sessions", x.id); }))
          .concat(ap.map(function (x) { return V.del("appointments", x.id); })))
          .then(refresh).then(function () { location.hash = "#paz"; render(); });
        break;
      }
      case "esporta-paziente": esportaPaziente(id); break;
      case "stampa": stampaScheda(id); break;

      case "inizia-sessione": iniziaSessione(id); break;
      case "chiudi-sessione": chiudiSessione(id); break;
      case "riapri-sessione":
        st.activeId = id; lsSet(LS_ACTIVE, id);
        var sr = session(id); sr.stato = "bozza";
        save("sessions", sr, true).then(function () { render(); sessionBar(); });
        break;
      case "elimina-sessione":
        if (!confirm("Eliminare questa sessione?")) return;
        var sd = session(id);
        V.del("sessions", id).then(function () {
          if (st.activeId === id) { st.activeId = null; lsSet(LS_ACTIVE, null); }
          return refresh();
        }).then(function () { location.hash = "#paz/p/" + sd.patientId; sessionBar(); });
        break;

      case "esito":
        s.coordinate[i].esito = b.dataset.v;
        save("sessions", s, true).then(function () { renderSession(s.id); });
        break;
      case "del-coord":
        s.coordinate.splice(i, 1);
        save("sessions", s, true).then(function () { renderSession(s.id); });
        break;
      case "add-coord": {
        var inp = document.getElementById("pzCoordIn");
        var val = (inp.value || "").trim();
        if (!val) return;
        s.coordinate = (s.coordinate || []).concat([{ label: val, esito: "nt" }]);
        inp.value = "";
        save("sessions", s, true).then(function () { renderSession(s.id); });
        break;
      }
      case "voce":
        s.voci[i].usato = b.checked;
        save("sessions", s);
        break;
      case "voce-coord": {
        var v = s.voci[i];
        if (!(s.coordinate || []).some(function (c) { return c.label === v.label; })) {
          s.coordinate = (s.coordinate || []).concat([{ label: v.label, esito: "nt", ref: v.ref }]);
        }
        v.usato = true;
        save("sessions", s, true).then(function () { renderSession(s.id); });
        break;
      }
      case "del-allegato":
        s.allegati.splice(i, 1);
        save("sessions", s, true).then(function () { renderSession(s.id); });
        break;
      case "riepilogo": riepilogoPaziente(id); break;

      case "nuovo-appuntamento": st.agendaFor = id; location.hash = "#paz/agenda"; break;
      case "crea-appuntamento": creaAppuntamento(); break;
      case "appuntamento-stato": {
        var a = st.appts.find(function (x) { return x.id === id; });
        a.stato = b.dataset.v;
        save("appointments", a, true).then(render);
        break;
      }
      case "elimina-appuntamento":
        if (!confirm("Eliminare l'appuntamento?")) return;
        V.del("appointments", id).then(refresh).then(render);
        break;
      case "appuntamento-fatto": {
        var ap2 = st.appts.find(function (x) { return x.id === id; });
        ap2.stato = "effettuato";
        save("appointments", ap2, true).then(function () { iniziaSessione(ap2.patientId, ap2); });
        break;
      }
      case "apri-appuntamento": {
        var ao = st.appts.find(function (x) { return x.id === id; });
        location.hash = "#paz/p/" + ao.patientId;
        break;
      }
      case "ics": esportaIcs(); break;

      case "backup-export":
        V.exportBackup().then(function (bk) {
          scarica(JSON.stringify(bk), "kinesiology-backup-" + dayKey(new Date().toISOString()) + ".kin");
          lsSet(LS_BACKUP, String(Date.now()));
          renderSettings();
        });
        break;
      case "sync-now": syncNow(true); break;
      case "wipe-remote":
        if (!confirm("Svuotare lo spazio di sync sul server? Gli altri dispositivi non riceveranno più questi dati.")) return;
        V.wipeRemote(syncUrl())
          .then(function (r) { alert(r.deleted + " record rimossi dal server."); })
          .catch(function (e) { alert("Errore: " + e.message); });
        break;
      case "lock-now": V.lock(); break;
      case "cambia-pass": {
        var o = document.getElementById("pzOld").value, n = document.getElementById("pzNew").value;
        if (n.length < 8) return showErr("La nuova passphrase deve avere almeno 8 caratteri.");
        b.disabled = true; b.textContent = "Attendi…";
        V.changePass(o, n).then(function () { b.disabled = false; b.textContent = "Cambia"; alert("Passphrase cambiata. I vecchi backup restano legati alla vecchia passphrase."); })
          .catch(function (err) { b.disabled = false; b.textContent = "Cambia"; showErr(err.message === "passphrase-errata" ? "Passphrase attuale errata." : err.message); });
        break;
      }
      case "wipe":
        if (!confirm("Cancellare TUTTI i dati dei pazienti da questo dispositivo?")) return;
        if (!confirm("Conferma definitiva: l'operazione non è reversibile.")) return;
        V.wipe().then(function () { st.patients = []; st.sessions = []; st.appts = []; st.activeId = null; lsSet(LS_ACTIVE, null); render(); });
        break;
    }
  });

  function colore(nome) {
    var h = 0;
    for (var i = 0; i < nome.length; i++) h = (h * 31 + nome.charCodeAt(i)) % 360;
    return "hsl(" + h + ",55%,42%)";
  }

  /* ---------- Sessione: apertura e chiusura ---------- */
  function iniziaSessione(pid, appt) {
    var s = {
      id: uid(), patientId: pid, date: new Date().toISOString(),
      coordinate: [], voci: [], allegati: [], stato: "bozza",
      apptId: appt ? appt.id : null
    };
    return V.put("sessions", s).then(function () {
      st.sessions.push(s);
      st.activeId = s.id; lsSet(LS_ACTIVE, s.id);
      st.capture = s.voci;
      startCapture();
      location.hash = "#paz/s/" + s.id;
      sessionBar();
    });
  }
  function chiudiSessione(id) {
    var s = session(id);
    closeCurrent();
    s.stato = "chiusa";
    st.activeId = null; lsSet(LS_ACTIVE, null);
    return save("sessions", s, true).then(function () {
      sessionBar();
      location.hash = "#paz/p/" + s.patientId;
    });
  }

  /* ---------- Cattura automatica delle viste consultate ---------- */
  var MIN_USO = 20000;   // ponytail: soglia fissa 20s; se dà troppi falsi, renderla configurabile
  function startCapture() { closeCurrent(); noteView(location.hash); }
  function closeCurrent() {
    if (!st.cur) return;
    var s = activeSession();
    if (s) {
      var dwell = Date.now() - st.cur.t0;
      var found = (s.voci || []).find(function (v) { return v.ref === st.cur.ref; });
      if (found) { found.dwell = (found.dwell || 0) + dwell; if (found.dwell >= MIN_USO) found.usato = true; }
      else s.voci.push({ ref: st.cur.ref, label: st.cur.label, kind: st.cur.kind, dwell: dwell, usato: dwell >= MIN_USO, t: new Date().toISOString() });
      save("sessions", s);
    }
    st.cur = null;
  }
  function noteView(hash) {
    if (!activeSession()) return;
    var l = labelForHash(hash);
    if (!l) return;
    st.cur = { ref: l.ref, label: l.label, kind: l.kind, t0: Date.now() };
  }
  window.addEventListener("hashchange", function () {
    closeCurrent();
    noteView(location.hash);
    sessionBar();
  });
  window.addEventListener("pagehide", closeCurrent);

  /* ---------- Barra della sessione attiva (visibile in tutta l'app) ---------- */
  var bar = null;
  function sessionBar() {
    var s = activeSession();
    if (!s || !V.unlocked()) { if (bar) { bar.remove(); bar = null; } return; }
    var p = patient(s.patientId);
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "pz-sessionbar";
      document.body.appendChild(bar);
      bar.addEventListener("click", function (e) {
        var b = e.target.closest("button"); if (!b) return;
        if (b.dataset.b === "apri") location.hash = "#paz/s/" + st.activeId;
        else if (b.dataset.b === "add") segnaCorrente(b);
        else if (b.dataset.b === "chiudi") chiudiSessione(st.activeId);
      });
    }
    var l = labelForHash(location.hash);
    bar.innerHTML = '<span class="pz-sessionbar__dot"></span>' +
      '<span class="pz-sessionbar__t">Sessione · <strong>' + esc(p ? p.displayName : "—") + "</strong></span>" +
      (l ? '<button class="ebtn ebtn--mini" data-b="add">＋ ' + esc(l.kind === "coordinata" ? "Aggiungi coordinata" : "Segna sezione") + "</button>" : "") +
      '<button class="ebtn ebtn--mini" data-b="apri">Apri</button>' +
      '<button class="ebtn ebtn--mini ebtn--primary" data-b="chiudi">✓ Chiudi</button>';
  }
  function segnaCorrente(btn) {
    var s = activeSession(), l = labelForHash(location.hash);
    if (!s || !l) return;
    var v = (s.voci || []).find(function (x) { return x.ref === l.ref; });
    if (!v) { v = { ref: l.ref, label: l.label, kind: l.kind, dwell: 0, usato: true, t: new Date().toISOString() }; s.voci.push(v); }
    v.usato = true;
    if (l.kind === "coordinata" && !(s.coordinate || []).some(function (c) { return c.label === l.label; })) {
      s.coordinate = (s.coordinate || []).concat([{ label: l.label, esito: "nt", ref: l.ref }]);
    }
    btn.textContent = "✓ Aggiunto";
    save("sessions", s, true);
  }

  /* ---------- Sync ---------- */
  function syncStato() {
    if (!syncUrl()) return "Non configurato: i dati restano solo su questo dispositivo.";
    var t = lsGet(LS_SYNC_LAST);
    return t ? "Ultima sincronizzazione: " + fmtShort(t) + " alle " + fmtTime(t) + "." : "Mai sincronizzato.";
  }
  function setSyncState(txt) {
    var e = document.getElementById("pzSyncState");
    if (e) e.textContent = txt;
  }
  function syncNow(manuale) {
    var url = (document.getElementById("pzSyncUrl") ? document.getElementById("pzSyncUrl").value.trim() : "") || syncUrl();
    if (!url) { if (manuale) setSyncState("Inserisci prima l'indirizzo del server."); return Promise.resolve(); }
    /* Niente dati verso il server finché l'operatore non ha accettato:
       è l'accettazione a costituire il contratto ex art. 28. */
    if (!accettato()) {
      if (manuale) setSyncState("Per attivare il sync devi accettare privacy e termini qui sopra.");
      return Promise.resolve();
    }
    lsSet(LS_SYNC, url);
    var inv = document.getElementById("pzSyncInvite");
    if (inv) lsSet(LS_SYNC_INVITE, inv.value.trim() || null);
    if (manuale) setSyncState("Sincronizzazione in corso…");
    return V.sync(url, syncInvito(), accettazione()).then(function (r) {
      lsSet(LS_SYNC_LAST, r.quando);
      badge();
      return refresh().then(function () {
        if (st.route.name === "impostazioni") setSyncState("Fatto: " + r.inviati + " inviati, " + r.ricevuti + " ricevuti. " + syncStato());
        else render();
      });
    }).catch(function (e) {
      /* "Failed to fetch" non dice niente a chi usa l'app: server spento,
         indirizzo sbagliato o niente rete sono tutti questo caso. */
      var msg = /fetch/i.test(e.message)
        ? "Server irraggiungibile: controlla l'indirizzo e la connessione."
        : e.status === 403 ? "Serve un codice di invito valido per attivare il sync su questo server."
        : e.status === 507 ? "Spazio pieno sul server: esporta un backup e fai pulizia."
        : "Sync fallito: " + e.message;
      if (manuale) setSyncState(msg); else console.warn(msg);
    });
  }
  /* Timer unico: riparte a ogni cambio di impostazione, non si accumula. */
  var autoTimer = null;
  function autoSync() {
    clearInterval(autoTimer); autoTimer = null;
    if (!syncAutoOn() || !syncUrl()) return;
    autoTimer = setInterval(function () { if (puoSincronizzare()) syncNow(false); }, 5 * 60 * 1000);
    if (puoSincronizzare()) syncNow(false);
  }
  /* Non sincronizzare mentre si sta scrivendo: il refresh sostituisce gli
     oggetti in memoria e le modifiche in corso finirebbero su un record vecchio. */
  function puoSincronizzare() {
    if (!V.unlocked()) return false;
    var a = document.activeElement;
    return !(a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName));
  }

  /* ---------- Appuntamenti ---------- */
  function creaAppuntamento() {
    var pid = document.getElementById("apPat").value;
    var start = fromLocalInput(document.getElementById("apStart").value);
    var dur = Number(document.getElementById("apDur").value) || 60;
    if (!pid || !start) return;
    var a = {
      id: uid(), patientId: pid, start: start,
      end: new Date(new Date(start).getTime() + dur * 60000).toISOString(),
      luogo: document.getElementById("apNote").value, stato: "programmato"
    };
    V.put("appointments", a).then(function () { st.appts.push(a); renderAgenda(); });
  }
  function esportaIcs() {
    function z(iso) { return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"; }
    var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Kinesiology//IT"];
    st.appts.filter(function (a) { return a.stato !== "disdetto"; }).forEach(function (a) {
      var p = patient(a.patientId);
      lines.push("BEGIN:VEVENT", "UID:" + a.id, "DTSTAMP:" + z(new Date().toISOString()),
        "DTSTART:" + z(a.start), "DTEND:" + z(a.end),
        "SUMMARY:Seduta · " + (p ? p.displayName : "paziente"), "END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    scarica(lines.join("\r\n"), "agenda.ics");
  }

  /* ---------- Export, stampa, riepilogo ---------- */
  function scarica(testo, nome) {
    var url = URL.createObjectURL(new Blob([testo], { type: "text/plain" }));
    var a = document.createElement("a");
    a.href = url; a.download = nome; a.click();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }
  function esportaPaziente(id) {
    var p = patient(id);
    var out = { paziente: p, sessioni: sessionsOf(id), appuntamenti: apptsOf(id), esportatoIl: new Date().toISOString() };
    scarica(JSON.stringify(out, null, 2), "paziente-" + (p.displayName || id).replace(/\W+/g, "_") + ".json");
  }
  function stampaScheda(id) {
    var p = patient(id), ses = sessionsOf(id);
    var html = "<h1>" + esc(p.displayName) + "</h1>" +
      "<p>" + (p.birthDate ? "Nato/a il " + esc(p.birthDate) + " · " : "") + esc(p.phone || "") + " " + esc(p.email || "") + "</p>" +
      (p.anamnesi ? "<h2>Anamnesi</h2><p>" + esc(p.anamnesi) + "</p>" : "") +
      (p.farmaci ? "<h2>Farmaci</h2><p>" + esc(p.farmaci) + "</p>" : "") +
      (p.allergie ? "<h2>Allergie</h2><p>" + esc(p.allergie) + "</p>" : "") +
      (p.controindicazioni ? "<h2>Controindicazioni</h2><p>" + esc(p.controindicazioni) + "</p>" : "") +
      (p.costituzione ? "<h2>Costituzione</h2><p>" + esc(p.costituzione) + "</p>" : "") +
      "<h2>Sessioni</h2>" + ses.map(function (s) {
        return "<div class='pr-s'><h3>" + fmtShort(s.date) + "</h3>" +
          "<p><strong>Coordinate:</strong> " + esc((s.coordinate || []).map(function (c) { return c.label + " (" + c.esito + ")"; }).join(" · ") || "—") + "</p>" +
          (s.correzioni ? "<p><strong>Correzioni:</strong> " + esc(s.correzioni) + "</p>" : "") +
          (s.essenze ? "<p><strong>Essenze:</strong> " + esc(s.essenze) + "</p>" : "") +
          (s.note ? "<p>" + esc(s.note) + "</p>" : "") +
          (s.compitiCasa ? "<p><strong>Compiti:</strong> " + esc(s.compitiCasa) + "</p>" : "") +
          "</div>";
      }).join("");
    apriStampa(html);
  }
  function riepilogoPaziente(id) {
    var s = session(id), p = patient(s.patientId);
    apriStampa("<h1>Riepilogo della seduta</h1><p>" + esc(p.displayName) + " · " + fmtShort(s.date) + "</p>" +
      (s.essenze ? "<h2>Essenze</h2><p>" + esc(s.essenze) + "</p>" : "") +
      (s.compitiCasa ? "<h2>Da fare a casa</h2><p>" + esc(s.compitiCasa) + "</p>" : "") +
      "<p class='pr-f'>Prossimo controllo: ____________</p>");
  }
  /* Stampa nativa: nessuna libreria PDF, il browser fa già «Salva come PDF». */
  function apriStampa(html) {
    var box = document.getElementById("pzPrint") || document.createElement("div");
    box.id = "pzPrint"; box.innerHTML = html;
    if (!box.parentNode) document.body.appendChild(box);
    document.body.classList.add("pz-printing");
    window.print();
    setTimeout(function () { document.body.classList.remove("pz-printing"); }, 300);
  }

  /* ================= ROUTER INTERNO ================= */
  function parse(hash) {
    var m = hash.match(/^#paz\/(p|s)\/(.+)$/);
    if (m) return { name: m[1] === "p" ? "paziente" : "sessione", id: m[2] };
    if (hash.indexOf("#paz/agenda") === 0) return { name: "agenda" };
    if (hash.indexOf("#paz/impostazioni") === 0) return { name: "impostazioni" };
    return { name: "home" };
  }
  function render() {
    if (!V.unlocked()) { renderLock(); sessionBar(); return; }
    var r = st.route;
    if (r.name === "paziente") renderPatient(r.id);
    else if (r.name === "sessione") renderSession(r.id);
    else if (r.name === "agenda") renderAgenda();
    else if (r.name === "impostazioni") renderSettings();
    else renderHome();
    sessionBar();
  }

  V.onLock(function () {
    clearInterval(autoTimer); autoTimer = null;
    st.patients = []; st.sessions = []; st.appts = []; st.loaded = false;
    if (!view.hidden) renderLock();
    sessionBar();
  });
  var lm = Number(lsGet("kapp-lock-min"));
  if (lm) V.setLockMinutes(lm);

  function badge() { if (window.aggiornaBadgeDati) window.aggiornaBadgeDati(); }

  window.Pazienti = {
    /* Letta dal badge in testata (app.js): dice se e da quando i dati
       viaggiano anche verso il server di sync. */
    statoSync: function () {
      return { url: syncUrl(), auto: syncAutoOn(), accettato: accettato(), ultimo: lsGet(LS_SYNC_LAST) };
    },
    show: function (hash) {
      view.hidden = false;
      st.route = parse(hash);
      if (V.unlocked() && !st.loaded) refresh().then(render);
      else render();
    },
    hide: function () { view.hidden = true; sessionBar(); },
    back: function () {
      var r = st.route;
      if (r.name === "sessione") { var s = session(r.id); location.hash = s ? "#paz/p/" + s.patientId : "#paz"; }
      else if (r.name === "home") location.hash = "#coordinate";
      else location.hash = "#paz";
    }
  };

  /* All'avvio: se c'era una sessione aperta, la barra ricompare dopo lo sblocco. */
  V.isSetUp().then(function (ok) { if (ok && V.unlocked()) refresh().then(sessionBar); });
})();
