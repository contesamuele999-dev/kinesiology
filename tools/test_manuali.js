/* test_manuali.js — i dati dei manuali dei corsi si disegnano tutti.
   Controlla: id unici, meridiani esistenti, ogni scheda si apre senza
   errori, nessun markup iniettato. Uso: node tools/test_manuali.js */
"use strict";
const path = require("path");
const JS = path.join(__dirname, "..", "assets", "js");
let H = "";
global.window = {};
global.document = { getElementById: () => ({ addEventListener() {}, set innerHTML(v) { H = v; }, get innerHTML() { return H; } }) };
["meridiani_data", "data", "punti_data", "costituzioni_data", "links"].forEach((f) => require(path.join(JS, f + ".js")));
require("fs").readdirSync(path.join(JS, "manuali")).forEach((f) => require(path.join(JS, "manuali", f)));
require(path.join(JS, "manuali.js"));

const L = window.Links, M = window.Manuali;
let ok = 0, ko = 0;
function check(cond, msg) { if (cond) ok++; else { ko++; console.log("✗ " + msg); } }

const idMan = new Set();
window.MANUALI.forEach((m) => {
  check(!idMan.has(m.id), "manuale duplicato " + m.id); idMan.add(m.id);
  const ids = new Set();
  (m.capitoli || []).forEach((c) => (c.schede || []).forEach((s) => {
    check(/^[-a-z0-9]+$/.test(s.id), m.id + ": id non valido «" + s.id + "»");
    check(!ids.has(s.id), m.id + ": scheda duplicata " + s.id); ids.add(s.id);
    check(!!s.titolo, m.id + "/" + s.id + ": manca il titolo");
    (s.meridiani || []).forEach((id) => check(!!L.mer(id), m.id + "/" + s.id + ": meridiano sconosciuto " + id));
    let err = null;
    try { M.show("#man/" + m.id + "/" + s.id); } catch (e) { err = e; }
    check(!err, m.id + "/" + s.id + ": " + (err && err.message));
    check(H.indexOf("<h2>") !== -1 && H.indexOf("<script") === -1, m.id + "/" + s.id + ": rendering anomalo");
  }));
  M.show("#man/" + m.id);
  check(H.indexOf(m.titolo.replace(/&/g, "&amp;")) !== -1, m.id + ": indice del manuale");
});
check(M.perMeridiano("rene").length > 0, "collegamenti inversi dal meridiano Rene");

console.log((ko ? "✗" : "✓") + " test_manuali: " + ok + " passati, " + ko + " falliti");
process.exit(ko ? 1 : 0);
