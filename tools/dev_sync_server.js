/* dev_sync_server.js — esegue il Worker di sync in locale, per provare l'app
   senza pubblicare niente su Cloudflare. Usa node:sqlite (Node 22+), nessuna
   dipendenza. I dati finiscono in tools/dev_sync.sqlite.

   Avvio:  node tools/dev_sync_server.js
   Poi nell'app: Impostazioni -> Sync -> http://localhost:8787            */
"use strict";
const fs = require("fs");
const path = require("path");
const http = require("http");
const { DatabaseSync } = require("node:sqlite");

const SYNC = path.join(__dirname, "..", "sync");
const PORT = Number(process.argv[2]) || 8787;
const db = new DatabaseSync(path.join(__dirname, "dev_sync.sqlite"));
db.exec(fs.readFileSync(path.join(SYNC, "schema.sql"), "utf8"));

const env = { DB: {
  prepare(sql) {
    const mk = (args) => ({
      bind: (...a) => mk(a),
      run() { db.prepare(sql).run(...args); return { meta: { changes: db.prepare("SELECT changes() c").get().c } }; },
      first() { return db.prepare(sql).get(...args) || null; },
      all() { return { results: db.prepare(sql).all(...args) }; }
    });
    return mk([]);
  },
  batch(stmts) { stmts.forEach((s) => s.run()); return stmts.map(() => ({})); }
} };

import("file://" + path.join(SYNC, "worker.js").replace(/\\/g, "/")).then((mod) => {
  http.createServer((req, res) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", async () => {
      const body = chunks.length ? Buffer.concat(chunks) : undefined;
      const r = await mod.default.fetch(
        new Request("http://localhost" + req.url, { method: req.method, headers: req.headers, body }), env);
      const buf = Buffer.from(await r.arrayBuffer());
      res.writeHead(r.status, Object.fromEntries(r.headers));
      res.end(buf);
      console.log(req.method, req.url, "->", r.status);
    });
  }).listen(PORT, () => console.log("sync di sviluppo su http://localhost:" + PORT));
});
