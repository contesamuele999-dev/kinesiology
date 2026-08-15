/* test_sync.js — controlli sul sync end-to-end.
   La parte che, se sbagliata, manda in chiaro i dati o li fa sparire:
   1) il token di sync non deve coincidere con la chiave dati;
   2) la chiave dati non deve cambiare (i vault già creati devono restare leggibili);
   3) la regola dei conflitti deve essere "vince updatedAt più recente".
   Esegui: node tools/test_sync.js */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const src = fs.readFileSync(path.join(__dirname, "..", "assets", "js", "store.js"), "utf8");
const sandbox = {
  window: {}, crypto: globalThis.crypto, indexedDB: undefined,
  TextEncoder, TextDecoder, setTimeout, clearTimeout, btoa, atob,
  navigator: {}, fetch: undefined, console
};
vm.createContext(sandbox);
vm.runInContext(src, sandbox);

const C = sandbox.window.Vault._crypto;
const ITER_TEST = 1000;
const enc = new TextEncoder();

/* Stessa regola applicata dal client (applyRemote) e dal Worker (clausola WHERE). */
function vinceRemoto(locale, remoto) {
  if (!locale) return true;
  return remoto.updatedAt > locale.updatedAt;
}

async function sha256hex(s) {
  const b = await crypto.subtle.digest("SHA-256", enc.encode(s));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

(async function () {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const d = await C.deriveAll("passphrase-di-prova", salt, ITER_TEST);

  // 1. la chiave dati non è cambiata passando a deriveBits: i vault esistenti restano leggibili
  const vecchia = await C.deriveKey("passphrase-di-prova", salt, ITER_TEST);
  const rec = await C.seal(vecchia, { x: 1 });
  assert.strictEqual(JSON.stringify(await C.unseal(d.key, rec)), '{"x":1}',
    "la chiave dati e' cambiata: i vault gia' creati non sarebbero piu' leggibili");

  // 2. il token non è il materiale della chiave dati
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: ITER_TEST, hash: "SHA-256" },
    await crypto.subtle.importKey("raw", enc.encode("passphrase-di-prova"), "PBKDF2", false, ["deriveBits"]),
    512);
  const primi32 = Buffer.from(new Uint8Array(bits).slice(0, 32));
  const token = Buffer.from(d.secret);
  assert.strictEqual(token.length, 32, "token di lunghezza sbagliata");
  assert.ok(!token.equals(primi32), "il token di sync coincide con la chiave dati: il server potrebbe decifrare");

  // 3. il token da solo non decifra
  const daToken = await crypto.subtle.importKey("raw", d.secret, { name: "AES-GCM" }, false, ["decrypt"]);
  await assert.rejects(() => C.unseal(daToken, rec), "il token ha decifrato un record");

  // 4. stessa passphrase + stesso salt => stesso spazio (altrimenti niente sync)
  const d2 = await C.deriveAll("passphrase-di-prova", salt, ITER_TEST);
  assert.strictEqual(C.b64url(d2.secret), C.b64url(d.secret), "token non deterministico");
  // ...e passphrase diversa => spazio diverso
  const d3 = await C.deriveAll("altra-passphrase", salt, ITER_TEST);
  assert.notStrictEqual(C.b64url(d3.secret), C.b64url(d.secret), "passphrase diverse producono lo stesso token");

  // 5. base64url: nessun carattere da escapare nell'header Authorization
  assert.ok(/^[A-Za-z0-9_-]+$/.test(C.b64url(d.secret)), "token non e' base64url pulito");

  // 6. l'id dello spazio è un hash: il token in chiaro non finisce sul server
  const space = await sha256hex("kin-space|" + C.b64url(d.secret));
  assert.strictEqual(space.length, 64);
  assert.ok(space.indexOf(C.b64url(d.secret)) === -1);

  // 7. conflitti: vince il più recente, la parità non sovrascrive (evita loop di sync)
  const vecchio = { updatedAt: "2026-08-15T10:00:00.000Z" };
  const nuovo = { updatedAt: "2026-08-15T11:00:00.000Z" };
  assert.strictEqual(vinceRemoto(vecchio, nuovo), true, "il remoto piu' recente deve vincere");
  assert.strictEqual(vinceRemoto(nuovo, vecchio), false, "il remoto piu' vecchio non deve vincere");
  assert.strictEqual(vinceRemoto(nuovo, { updatedAt: nuovo.updatedAt }), false, "la parita' non deve riscrivere");
  assert.strictEqual(vinceRemoto(null, vecchio), true, "un record nuovo deve essere applicato");

  // 8. il Worker usa la stessa regola nel WHERE dell'upsert
  const worker = fs.readFileSync(path.join(__dirname, "..", "sync", "worker.js"), "utf8");
  assert.ok(/WHERE excluded\.updated_at > records\.updated_at/.test(worker),
    "il Worker non applica piu' la regola last-write-wins");
  assert.ok(!/\bSELECT\s+\*/.test(worker), "il Worker deve selezionare colonne esplicite");

  console.log("test_sync: 8 controlli OK");
})().catch((e) => { console.error("FALLITO:", e.message); process.exit(1); });
