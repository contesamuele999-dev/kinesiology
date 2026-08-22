/* test_links.js — il grafo dei collegamenti fra le sezioni.
   Verifica che ogni entità (coordinata, punto d'allarme, costituzione)
   sappia risalire al proprio meridiano e che ogni indirizzo prodotto
   corrisponda a qualcosa che esiste davvero. Nessuna dipendenza: si
   caricano i data file come script, come fa il browser.
   Uso: node tools/test_links.js */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");

const ROOT = path.join(__dirname, "..");
const sandbox = { window: {}, console: console };
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);
["assets/js/meridiani_data.js", "assets/js/data.js", "assets/js/punti_data.js",
 "assets/js/costituzioni_data.js", "assets/js/links.js"].forEach((f) => {
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sandbox, { filename: f });
});

const W = sandbox.window;
const L = W.Links;
const MER = W.MERIDIANI.meridiani;
const COORD = W.COORDINATE;
const PUNTI = W.PUNTI_INDICATORI.punti;
const COST = W.COSTITUZIONI.costituzioni;

let ok = 0, ko = 0;
function t(nome, cond, extra) {
  if (cond) { ok++; return; }
  ko++; console.error("  FALLITO: " + nome + (extra ? " — " + extra : ""));
}
const merIds = MER.map((m) => m.id);
const coordIds = COORD.map((c) => c.id);
const puntoIds = PUNTI.map((p) => p.id);
const costIds = COST.map((c) => c.id);

/* 1. ogni coordinata risale a un meridiano esistente */
COORD.forEach((c) => {
  const id = L.merOfCoord(c);
  t("coordinata " + c.id + " -> meridiano", merIds.indexOf(id) !== -1, "ottenuto " + id);
});

/* 2. ogni punto d'allarme risale a un meridiano esistente
      (anche quelli col campo meridiano vuoto, via il nome dell'organo) */
PUNTI.forEach((p) => {
  const id = L.merOfPunto(p);
  t("punto " + p.id + " -> meridiano", merIds.indexOf(id) !== -1, "ottenuto " + id);
});

/* 3. ogni costituzione risale ai suoi due meridiani e il punto di test
      si traduce nella sigla usata dai dati ("M4" -> "MP4") */
COST.forEach((c) => {
  const ids = L.merOfCost(c);
  t("costituzione " + c.id + " -> 2 meridiani", ids.length === 2, JSON.stringify(ids));
  ids.forEach((id) => t("meridiano " + id + " esiste", merIds.indexOf(id) !== -1));
  const pt = L.siglaPunto(c.puntoTest.sigla);
  t("punto di test " + c.puntoTest.sigla + " risolto", !!pt);
  if (pt) {
    const m = L.mer(pt.merId);
    t("sigla canonica di " + c.puntoTest.sigla, pt.sigla === m.sigla + pt.n, pt.sigla);
  }
});

/* 4. il giro completo: meridiano -> entità -> di nuovo lo stesso meridiano */
merIds.forEach((id) => {
  L.coordsOf(id).forEach((c) => t("andata/ritorno coord " + c.id, L.merOfCoord(c) === id));
  L.puntiOf(id).forEach((p) => t("andata/ritorno punto " + p.id, L.merOfPunto(p) === id));
  L.costOf(id).forEach((c) => t("andata/ritorno cost " + c.id, L.merOfCost(c).indexOf(id) !== -1));
});

/* 5. copertura: nessuna coordinata e nessun punto resta orfano */
const coperteCoord = new Set(), copertiPunti = new Set();
merIds.forEach((id) => {
  L.coordsOf(id).forEach((c) => coperteCoord.add(c.id));
  L.puntiOf(id).forEach((p) => copertiPunti.add(p.id));
});
t("tutte le " + coordIds.length + " coordinate raggiungibili da un meridiano",
  coperteCoord.size === coordIds.length, coperteCoord.size + "/" + coordIds.length);
t("tutti i " + puntoIds.length + " punti raggiungibili da un meridiano",
  copertiPunti.size === puntoIds.length, copertiPunti.size + "/" + puntoIds.length);

/* 6. ogni meridiano ha almeno una coordinata (l'app ne ha 16 su 14 meridiani) */
merIds.forEach((id) => t("meridiano " + id + " ha una coordinata", L.coordsOf(id).length >= 1));

/* 7. gli indirizzi generati puntano a id esistenti */
function idDa(href, prefisso) {
  return decodeURIComponent(href.slice(prefisso.length).split("/")[0]);
}
merIds.forEach((id) => t("href meridiano " + id, idDa(L.hrefMer(id), "#punti/mer/") === id));
puntoIds.forEach((id) => t("href punto " + id, idDa(L.hrefPunto(id), "#punti/p/") === id));
coordIds.forEach((id) => t("href coordinata " + id, idDa(L.hrefCoord(id), "#/") === id));
costIds.forEach((id) => t("href costituzione " + id, idDa(L.hrefCost(id), "#cost/costituzione/") === id));

/* 8. i chip sono <a> con href, e chipsPunti sa escludere il punto corrente */
const chip = L.chipMer("polmone", "Polmone");
t("il chip è un link", /^<a class="xlink[^"]*" href="#punti\/mer\/polmone"/.test(chip), chip);
t("chipsPunti esclude il punto indicato",
  L.chipsPunti("polmone", "polmone-dx").length === L.chipsPunti("polmone").length - 1);
t("row vuota non produce nulla", L.row("Titolo", []) === "");
/* Con un id nullo (dati non caricati, nome sconosciuto) non deve uscire
   nulla: il caso in cui restituiva TUTTO era peggio di un vuoto. */
t("coordsOf(null) vuoto", L.coordsOf(null).length === 0);
t("puntiOf(null) vuoto", L.puntiOf(null).length === 0);
t("costOf(null) vuoto", L.costOf(null).length === 0);
t("coordsOf(sconosciuto) vuoto", L.coordsOf("non-esiste").length === 0);
t("chipMer(null) vuoto", L.chipMer(null) === "");
t("box senza righe non produce nulla", L.box("Titolo", ["", ""]) === "");

/* 9. le sigle del manuale Costituzioni sono tradotte, non inventate */
[["M4", "MP4"], ["PC6", "MC6"], ["V62", "V62"], ["TR5", "TR5"], ["VB41", "VB41"], ["R6", "R6"]]
  .forEach((p) => {
    const r = L.siglaPunto(p[0]);
    t("sigla " + p[0] + " -> " + p[1], r && r.sigla === p[1], r && r.sigla);
  });
t("sigla senza numero non risolve", L.siglaPunto("VB") === null);
t("sigla inventata non risolve", L.siglaPunto("ZZ9") === null);

console.log((ko ? "\u2717" : "\u2713") + " test_links: " + ok + " passati, " + ko + " falliti");
process.exit(ko ? 1 : 0);
