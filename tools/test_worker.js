/* test_worker.js — prova il Worker di sync per davvero, con SQLite al posto di D1.
   Usa node:sqlite (integrato in Node 22+), quindi niente dipendenze da installare.
   Esegue due "dispositivi" che si scambiano record e verifica che i dati
   arrivino, che i conflitti si risolvano e che le cancellazioni non resuscitino.
   Esegui: node tools/test_worker.js */
"use strict";
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const { DatabaseSync } = require("node:sqlite");

const SYNC = path.join(__dirname, "..", "sync");

/* --- Finto binding D1 sopra node:sqlite (solo i metodi usati dal Worker) --- */
function fakeD1(db) {
  return {
    prepare(sql) {
      const mk = (args) => ({
        bind: (...a) => mk(a),
        run() { db.prepare(sql).run(...args); return { meta: { changes: db.prepare("SELECT changes() c").get().c } }; },
        first() { return db.prepare(sql).get(...args) || null; },
        all() { return { results: db.prepare(sql).all(...args) }; },
        _args: args, _sql: sql
      });
      return mk([]);
    },
    batch(stmts) { stmts.forEach((s) => s.run()); return stmts.map(() => ({})); }
  };
}

async function main() {
  const db = new DatabaseSync(":memory:");
  db.exec(fs.readFileSync(path.join(SYNC, "schema.sql"), "utf8"));

  const mod = await import("file://" + path.join(SYNC, "worker.js").replace(/\\/g, "/"));
  const env = { DB: fakeD1(db) };
  const call = (pathname, token, body) => mod.default.fetch(new Request("https://x" + pathname, {
    method: "POST",
    headers: { authorization: "Bearer " + token, "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body)
  }), env);

  const TOKEN_A = "a".repeat(43);          // stessa passphrase = stesso token
  const TOKEN_B = "b".repeat(43);          // altro operatore, altro spazio

  // 1. token troppo corto => 401
  assert.strictEqual((await call("/sync", "corto", { cursor: 0, changes: [] })).status, 401, "token corto accettato");

  // 2. push del dispositivo 1
  let r = await (await call("/sync", TOKEN_A, { cursor: 0, changes: [
    { store: "patients", id: "p1", updatedAt: "2026-08-15T10:00:00.000Z", iv: "AAA", ct: "CIFRATO1" },
    { store: "sessions", id: "s1", updatedAt: "2026-08-15T10:00:00.000Z", iv: "BBB", ct: "CIFRATO2" }
  ] })).json();
  assert.strictEqual(r.changes.length, 2, "il push non e' tornato indietro nel pull");
  const cursor1 = r.cursor;

  // 3. il dispositivo 2 (stessa passphrase) riceve tutto partendo da zero
  r = await (await call("/sync", TOKEN_A, { cursor: 0, changes: [] })).json();
  assert.strictEqual(r.changes.length, 2, "il secondo dispositivo non ha ricevuto i record");
  assert.strictEqual(r.changes.find((c) => c.id === "p1").ct, "CIFRATO1");

  // 4. un altro token = spazio separato e vuoto
  r = await (await call("/sync", TOKEN_B, { cursor: 0, changes: [] })).json();
  assert.strictEqual(r.changes.length, 0, "i dati sono visibili con un altro token");

  // 5. cursore: chi è aggiornato non riscarica niente
  r = await (await call("/sync", TOKEN_A, { cursor: cursor1, changes: [] })).json();
  assert.strictEqual(r.changes.length, 0, "il cursore non filtra");

  // 6. conflitto: una scrittura più vecchia non sovrascrive
  await call("/sync", TOKEN_A, { cursor: cursor1, changes: [
    { store: "patients", id: "p1", updatedAt: "2026-08-15T09:00:00.000Z", iv: "OLD", ct: "VECCHIO" }
  ] });
  r = await (await call("/sync", TOKEN_A, { cursor: 0, changes: [] })).json();
  assert.strictEqual(r.changes.find((c) => c.id === "p1").ct, "CIFRATO1", "un record vecchio ha sovrascritto quello nuovo");

  // 7. conflitto: la più recente vince
  await call("/sync", TOKEN_A, { cursor: 0, changes: [
    { store: "patients", id: "p1", updatedAt: "2026-08-15T12:00:00.000Z", iv: "NEW", ct: "AGGIORNATO" }
  ] });
  r = await (await call("/sync", TOKEN_A, { cursor: 0, changes: [] })).json();
  assert.strictEqual(r.changes.find((c) => c.id === "p1").ct, "AGGIORNATO", "la scrittura piu' recente non ha vinto");

  // 8. cancellazione: arriva come lapide e non resuscita
  await call("/sync", TOKEN_A, { cursor: 0, changes: [
    { store: "sessions", id: "s1", updatedAt: "2026-08-15T13:00:00.000Z", deleted: 1 }
  ] });
  r = await (await call("/sync", TOKEN_A, { cursor: 0, changes: [] })).json();
  const tomb = r.changes.find((c) => c.id === "s1");
  assert.strictEqual(tomb.deleted, 1, "la cancellazione non e' arrivata come lapide");
  assert.strictEqual(tomb.ct, undefined, "la lapide porta ancora del ciphertext");

  // 9. record troppo grande => rifiutato con errore, non salvato a metà
  const big = await call("/sync", TOKEN_A, { cursor: 0, changes: [
    { store: "patients", id: "p2", updatedAt: "2026-08-15T14:00:00.000Z", iv: "X", ct: "y".repeat(900001) }
  ] });
  assert.strictEqual(big.status, 400, "un record oltre il limite deve dare 400, non 500");
  r = await (await call("/sync", TOKEN_A, { cursor: 0, changes: [] })).json();
  assert.ok(!r.changes.some((c) => c.id === "p2"), "un record oltre il limite e' stato salvato");

  // 10. wipe: svuota solo il proprio spazio
  await call("/sync", TOKEN_B, { cursor: 0, changes: [
    { store: "patients", id: "pb", updatedAt: "2026-08-15T10:00:00.000Z", iv: "A", ct: "ALTRO" }
  ] });
  const w = await (await call("/wipe", TOKEN_A)).json();
  assert.ok(w.deleted >= 2, "il wipe non ha cancellato nulla");
  r = await (await call("/sync", TOKEN_A, { cursor: 0, changes: [] })).json();
  assert.strictEqual(r.changes.length, 0, "dopo il wipe restano dati");
  r = await (await call("/sync", TOKEN_B, { cursor: 0, changes: [] })).json();
  assert.strictEqual(r.changes.length, 1, "il wipe ha cancellato anche lo spazio di un altro token");

  // 11. CORS presente (l'app gira su un dominio diverso dal Worker)
  const opt = await mod.default.fetch(new Request("https://x/sync", { method: "OPTIONS" }), env);
  assert.strictEqual(opt.headers.get("access-control-allow-origin"), "*", "manca il CORS");

  console.log("test_worker: 11 controlli OK");
}

main().catch((e) => { console.error("FALLITO:", e.message); process.exit(1); });
