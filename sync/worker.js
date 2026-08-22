/* worker.js — sync end-to-end per l'area pazienti (Cloudflare Workers + D1).
   Il server è volutamente stupido: riceve e restituisce ciphertext, non ha la
   chiave e non può leggere nulla. Nessun account: l'identità dello spazio è
   l'hash del token, che il client deriva dalla passphrase.

   POST /sync  { cursor, changes[] }  -> { cursor, changes[], more }
   POST /wipe                          -> { deleted }
   Autenticazione: header  Authorization: Bearer <token>
*/

const LIMIT = 500;               // righe per risposta
const MAX_PUSH = 1000;           // righe per richiesta
const MAX_CT = 900000;           // ~900 KB: sotto il limite di riga di D1
const MAX_ROWS = 20000;          // righe per spazio (un operatore)
const MAX_BYTES = 200 * 1024 * 1024;  // 200 MB per spazio: D1 free ha 5 GB in tutto

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return cors(new Response(null, { status: 204 }));

    const url = new URL(req.url);
    if (req.method === "GET") return cors(json({ ok: true, service: "kin-sync" }));
    if (req.method !== "POST") return cors(json({ error: "method" }, 405));

    try {
      // L'amministratore ha un token suo, che non è quello di uno spazio.
      if (url.pathname === "/admin/stats") return cors(json(await stats(env, req)));
    } catch (e) {
      return cors(json({ error: String(e.message) }, e.status || 500));
    }

    const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "").trim();
    if (token.length < 40) return cors(json({ error: "token" }, 401));
    const space = await sha256hex("kin-space|" + token);

    try {
      if (url.pathname === "/wipe") return cors(json(await wipe(env, space)));
      if (url.pathname === "/sync")
        return cors(json(await sync(env, space, await req.json(), req.headers.get("x-kin-invite") || "")));
      return cors(json({ error: "not-found" }, 404));
    } catch (e) {
      return cors(json({ error: String(e && e.message || e) }, (e && e.status) || 500));
    }
  }
};

/* Errore di richiesta (400): colpa del client, non del server. */
const bad = (m) => Object.assign(new Error(m), { status: 400 });

async function sync(env, space, body, invite) {
  const cursor = Number(body && body.cursor) || 0;
  const changes = Array.isArray(body && body.changes) ? body.changes : [];
  if (changes.length > MAX_PUSH) throw bad("troppe righe in una volta");

  if (changes.length) {
    const known = await env.DB.prepare("SELECT seq FROM spaces WHERE space = ?").bind(space).first();

    /* Primo accesso di un nuovo operatore: se sono configurati dei codici di
       invito, senza codice valido non si apre uno spazio. Chi ce l'ha già
       continua a sincronizzare anche se poi cambi i codici. */
    if (!known) {
      const codes = String(env.INVITE_CODES || "").split(",").map((s) => s.trim()).filter(Boolean);
      if (codes.length && codes.indexOf(invite.trim()) === -1)
        throw Object.assign(new Error("codice di invito mancante o errato"), { status: 403 });
    }

    /* Quota per spazio. Conteggio approssimato: gli upsert su record esistenti
       vengono contati come nuovi. È un freno all'abuso, non contabilità.
       ponytail: se serve precisione, tieni bytes/rows in spaces e aggiornali nel batch. */
    const use = await env.DB.prepare(
      "SELECT COUNT(*) AS n, COALESCE(SUM(LENGTH(ct)), 0) AS b FROM records WHERE space = ?")
      .bind(space).first();
    const inBytes = changes.reduce((s, c) => s + String(c.ct || "").length, 0);
    if (use.n + changes.length > MAX_ROWS || use.b + inBytes > MAX_BYTES)
      throw Object.assign(new Error("spazio pieno: fai pulizia o passa a un piano più grande"), { status: 507 });

    // Un solo seq per batch: il cursore avanza per blocchi interi, mai a metà.
    await env.DB.prepare("INSERT INTO spaces(space, seq) VALUES(?, 0) ON CONFLICT(space) DO NOTHING")
      .bind(space).run();

    /* Presa d'atto dei termini: si scrive la prima volta e non si tocca più,
       così resta la data reale anche se il client la rimanda. */
    const acc = body && body.accetto;
    if (acc && acc.ver && acc.at)
      await env.DB.prepare(
        "UPDATE spaces SET accepted_ver = ?, accepted_at = ? WHERE space = ? AND accepted_at IS NULL")
        .bind(String(acc.ver).slice(0, 20), String(acc.at).slice(0, 40), space).run();

    await env.DB.prepare("UPDATE spaces SET seq = seq + 1 WHERE space = ?").bind(space).run();
    const row = await env.DB.prepare("SELECT seq FROM spaces WHERE space = ?").bind(space).first();
    const seq = row.seq;

    const stmt = env.DB.prepare(
      `INSERT INTO records (space, store, id, updated_at, seq, iv, ct, deleted)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(space, store, id) DO UPDATE SET
         updated_at = excluded.updated_at, seq = excluded.seq,
         iv = excluded.iv, ct = excluded.ct, deleted = excluded.deleted
       WHERE excluded.updated_at > records.updated_at`);
    const batch = changes.map((c) => {
      if (!c.store || !c.id || !c.updatedAt) throw bad("riga incompleta");
      if ((c.ct || "").length > MAX_CT) throw bad("record troppo grande: " + c.store + "/" + c.id);
      return stmt.bind(space, String(c.store), String(c.id), String(c.updatedAt), seq,
                       c.deleted ? "" : String(c.iv || ""), c.deleted ? "" : String(c.ct || ""),
                       c.deleted ? 1 : 0);
    });
    await env.DB.batch(batch);
  }

  const res = await env.DB.prepare(
    `SELECT store, id, updated_at, iv, ct, deleted, seq FROM records
     WHERE space = ? AND seq > ? ORDER BY seq, store, id LIMIT ?`)
    .bind(space, cursor, LIMIT).all();

  const rows = res.results || [];
  const out = rows.map((r) => r.deleted
    ? { store: r.store, id: r.id, updatedAt: r.updated_at, deleted: 1 }
    : { store: r.store, id: r.id, updatedAt: r.updated_at, iv: r.iv, ct: r.ct });

  return {
    cursor: rows.length ? rows[rows.length - 1].seq : cursor,
    changes: out,
    more: rows.length === LIMIT
  };
}

async function wipe(env, space) {
  const r = await env.DB.prepare("DELETE FROM records WHERE space = ?").bind(space).run();
  await env.DB.prepare("DELETE FROM spaces WHERE space = ?").bind(space).run();
  return { deleted: (r.meta && r.meta.changes) || 0 };
}

/* Cruscotto dell'amministratore: quanti spazi, quanto occupano. Nessun dato
   dei pazienti — solo hash e conteggi, perché il ciphertext resta illeggibile. */
async function stats(env, req) {
  const admin = String(env.ADMIN_TOKEN || "");
  const given = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "").trim();
  if (!admin || given !== admin)
    throw Object.assign(new Error("non autorizzato"), { status: 403 });

  const res = await env.DB.prepare(
    `SELECT s.space AS space, COUNT(r.id) AS righe, COALESCE(SUM(LENGTH(r.ct)), 0) AS byte,
            COALESCE(SUM(r.deleted), 0) AS lapidi, MAX(r.updated_at) AS ultimo,
            s.accepted_ver AS ver, s.accepted_at AS accettato
     FROM spaces s LEFT JOIN records r ON r.space = s.space
     GROUP BY s.space ORDER BY byte DESC LIMIT 200`).all();
  const rows = res.results || [];
  return {
    spazi: rows.length,
    byteTotali: rows.reduce((s, r) => s + r.byte, 0),
    dettaglio: rows.map((r) => ({
      spazio: r.space.slice(0, 12), righe: r.righe, byte: r.byte, lapidi: r.lapidi,
      ultimo: r.ultimo, termini: r.ver ? r.ver + " del " + r.accettato : "non accettati"
    }))
  };
}

async function sha256hex(s) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200, headers: { "content-type": "application/json" }
  });
}
/* CORS aperto: l'autenticazione è il bearer token, non i cookie, quindi "*"
   non espone nulla e l'app può stare su qualsiasi dominio (GitHub Pages, file locale). */
function cors(res) {
  res.headers.set("access-control-allow-origin", "*");
  res.headers.set("access-control-allow-headers", "authorization, content-type, x-kin-invite");
  res.headers.set("access-control-allow-methods", "POST, GET, OPTIONS");
  res.headers.set("access-control-max-age", "86400");
  return res;
}
