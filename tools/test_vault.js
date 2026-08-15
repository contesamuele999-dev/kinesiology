/* test_vault.js — controlli sulla cifratura del vault (assets/js/store.js).
   Non serve IndexedDB: si testa lo strato crypto, che è la parte che, se
   sbagliata, perde o espone i dati. Esegui: node tools/test_vault.js */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const src = fs.readFileSync(path.join(__dirname, "..", "assets", "js", "store.js"), "utf8");
const sandbox = {
  window: {}, crypto: globalThis.crypto, indexedDB: undefined,
  TextEncoder, TextDecoder, setTimeout, clearTimeout, btoa, atob,
  navigator: {}, console
};
vm.createContext(sandbox);
vm.runInContext(src, sandbox);        // niente document: l'auto-lock non si aggancia

const C = sandbox.window.Vault._crypto;
const ITER_TEST = 1000;               // le iterazioni vere (600k) rallentano solo il test

(async function () {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const k = await C.deriveKey("passphrase-corretta", salt, ITER_TEST);

  // 1. andata e ritorno
  const obj = { nome: "Mario Rossi", note: "dati sanitari", n: 42 };
  const rec = await C.seal(k, obj);
  /* JSON.stringify e non deepStrictEqual: l'oggetto nasce nel realm della vm. */
  assert.strictEqual(JSON.stringify(await C.unseal(k, rec)), JSON.stringify(obj), "roundtrip fallito");

  // 2. il ciphertext non contiene il testo in chiaro
  const raw = Buffer.from(rec.ct).toString("latin1");
  assert.ok(raw.indexOf("Mario") === -1, "il nome compare in chiaro nel ciphertext");

  // 3. passphrase sbagliata => decrypt fallisce (non restituisce dati)
  const bad = await C.deriveKey("passphrase-errata", salt, ITER_TEST);
  await assert.rejects(() => C.unseal(bad, rec), "una passphrase errata ha decifrato");

  // 4. salt diverso, stessa passphrase => chiave diversa
  const other = await C.deriveKey("passphrase-corretta", crypto.getRandomValues(new Uint8Array(16)), ITER_TEST);
  await assert.rejects(() => C.unseal(other, rec), "salt diverso ha prodotto la stessa chiave");

  // 5. IV mai riusato (riusarlo con la stessa chiave romperebbe AES-GCM)
  const ivs = new Set();
  for (let i = 0; i < 50; i++) ivs.add(C.b64((await C.seal(k, obj)).iv));
  assert.strictEqual(ivs.size, 50, "IV ripetuto tra due scritture");

  // 6. record manomesso => decrypt fallisce (AES-GCM autentica)
  const tampered = { iv: rec.iv, ct: Buffer.from(rec.ct) };
  tampered.ct[3] ^= 0xff;
  await assert.rejects(() => C.unseal(k, tampered), "un record manomesso è stato accettato");

  // 7. base64 andata e ritorno (usato dal backup)
  const bytes = crypto.getRandomValues(new Uint8Array(200));
  assert.deepStrictEqual(Array.from(C.unb64(C.b64(bytes))), Array.from(bytes), "base64 non simmetrico");

  // 8. il codice di produzione usa davvero 600k iterazioni
  assert.strictEqual(C.ITER, 600000, "iterazioni PBKDF2 abbassate per errore");

  console.log("test_vault: 8 controlli OK");
})().catch((e) => { console.error("FALLITO:", e.message); process.exit(1); });
