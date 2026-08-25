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

/* ---------------------------------------------------------------------
   Le dimensioni aggiunte al grafo: elemento, coppia, orologio, posizioni,
   fiori. Sono tutte ricavate dai dati, quindi qui si controlla la
   coerenza della derivazione, non un elenco scritto a mano.
   ------------------------------------------------------------------ */

/* 10. elemento: ogni meridiano sta nel gruppo del proprio elemento e i
       chip "stesso elemento" non contengono se stesso */
MER.forEach((m) => {
  const el = L.elementoOf(m.id);
  if (m.elemento === "—") {
    t("VC/VG senza elemento: " + m.id, el === null, String(el));
    return;
  }
  t("elemento di " + m.id, el === m.elemento, String(el));
  t(m.id + " sta nel gruppo " + el, L.merOfElemento(el).indexOf(m.id) !== -1);
  t("i chip elemento di " + m.id + " non puntano a se stesso",
    L.chipsElemento(m.id).join("").indexOf('href="' + L.hrefMer(m.id) + '"') === -1);
  L.merOfElemento(el).forEach((x) => t("elemento condiviso da " + x, L.elementoOf(x) === el));
});
t("i 5 movimenti", L.elementi().length === 5, L.elementi().join(","));

/* 11. coppia: la relazione è reciproca e non punta a se stessa */
merIds.forEach((id) => {
  const c = L.coppiaOf(id);
  t("coppia di " + id + " esiste", merIds.indexOf(c) !== -1, String(c));
  t("coppia di " + id + " non è se stesso", c !== id);
  t("la coppia è reciproca: " + id, L.coppiaOf(c) === id, String(L.coppiaOf(c)));
  t("chip della coppia di " + id, L.chipCoppia(id).indexOf('href="' + L.hrefMer(c) + '"') !== -1);
});

/* 12. orologio: 12 meridiani nel giro, i due Vasi fuori; prima e dopo
       sono reciproci e l'opposto sta a sei ore di distanza */
const nelGiro = merIds.filter((id) => L.orologio(id));
t("12 meridiani nell'orologio", nelGiro.length === 12, String(nelGiro.length));
t("Vaso Concezione fuori dall'orologio", L.orologio("vaso-concezione") === null);
t("Vaso Governatore fuori dall'orologio", L.orologio("vaso-governatore") === null);
nelGiro.forEach((id) => {
  const o = L.orologio(id);
  t("succ/prec reciproci su " + id, L.orologio(o.succ).prec === id);
  t("opposto reciproco su " + id, L.orologio(o.opposto).opposto === id);
  t("l'opposto non è se stesso: " + id, o.opposto !== id);
  t("tre chip d'orologio per " + id, L.chipsOrologio(id).length === 3);
});

/* 13. posizioni: ogni riga porta a una coordinata che esiste davvero e
       l'indirizzo generato è la coppia muscolo + posizione */
COORD.forEach((c) => {
  const pos = L.posizioniDi(c);
  t("posizioni di " + c.id, pos.length >= 12, String(pos.length));
  pos.forEach((r) => {
    t("posizione " + r.n + " di " + c.id + " -> meridiano", merIds.indexOf(r.merId) !== -1);
    t("posizione " + r.n + " di " + c.id + " -> coordinata", coordIds.indexOf(r.coord.id) !== -1);
    t("la posizione non rimanda a se stessa", r.coord.id !== c.id);
    t("indirizzo della posizione " + r.n,
      L.hrefCoord(c.id, r.coord.id) === "#/" + c.id + "+" + r.coord.id);
  });
  const num = pos.map((r) => r.n);
  t("numeri di posizione unici su " + c.id, new Set(num).size === num.length);
});

/* 14. fiori: chi compare altrove ci compare davvero, e mai su se stesso */
COORD.forEach((c) => {
  (c.fiore || []).filter((f) => f.nome).forEach((f) => {
    L.fioreAltrove(f.nome, c.id).forEach((r) => {
      t("il fiore " + f.nome + " è altrove", r.coord.id !== c.id);
      t("il fiore " + f.nome + " è davvero su " + r.coord.id,
        (r.coord.fiore || []).some((x) => x.nome === f.nome));
    });
    const chips = L.chipsPosFiore(c, f.posizioni).join("");
    (f.posizioni || []).forEach((n) => {
      const r = L.posizioniDi(c).filter((x) => x.n === Number(n))[0];
      if (r) t("chip di posizione " + n + " per il fiore " + f.nome,
               chips.indexOf('href="' + L.hrefCoord(c.id, r.coord.id) + '"') !== -1);
    });
  });
});

/* ---------------------------------------------------------------------
   Autolink. Prima di essere utile deve essere sicuro: niente markup
   iniettato dai dati, niente link annidati.
   ------------------------------------------------------------------ */
function conta(html, sotto) { return html.split(sotto).length - 1; }

t("autolink di testo vuoto", L.autolink("") === "" && L.autolink(null) === "");
const inj = L.autolink('<b>"x"</b> & co');
t("autolink escapa il markup", inj.indexOf("<b>") === -1 && inj.indexOf("&amp;") !== -1, inj);
const a1 = L.autolink("Il meridiano Vescica Biliare governa la scelta.");
t("il nome più lungo vince", a1.indexOf(">Vescica Biliare</a>") !== -1, a1);
t("un solo link per Vescica Biliare", conta(a1, "<a ") === 1, a1);
const a2 = L.autolink("Vescica, poi ancora Vescica e infine Vescica.");
t("una sola volta per destinazione", conta(a2, "<a ") === 1, a2);
const a3 = L.autolink("Con una mano su VC8 si testa M4, non m4.");
t("VC8 diventa un punto", a3.indexOf('href="#punti/mer/vaso-concezione/VC8"') !== -1, a3);
t("M4 si traduce in MP4", a3.indexOf('href="#punti/mer/milza/MP4"') !== -1, a3);
t("la sigla minuscola non è un punto", a3.indexOf(">m4</a>") === -1, a3);
const a4 = L.autolink("Il polmonare e la vescicola");
t("nessuna parola dentro un'altra parola", a4.indexOf("<a ") === -1, a4);
t("opzione salta",
  L.autolink("Il meridiano Polmone.", { salta: L.hrefMer("polmone") }).indexOf("<a ") === -1);
t("opzione max", conta(L.autolink("Polmone, Cuore, Fegato, Milza.", { max: 2 }), "<a ") === 2);
const a5 = L.autolink("Vescica Biliare, Fegato, VC8, TAI YANG");
t("i link non si annidano mai", /<a[^>]*>(?:(?!<\/a>)[\s\S])*<a\s/.test(a5) === false, a5);
const a6 = L.autolink("Un capitolo su Ippocrate",
                      { extra: [{ testo: "Ippocrate", href: "#cost/teoria/t2", title: "cap." }] });
t("i termini extra vengono linkati", a6.indexOf('href="#cost/teoria/t2"') !== -1, a6);

/* linkSigleMer: la notazione "V – IT" del manuale Costituzioni */
COST.forEach((c) => {
  const h = L.linkSigleMer(c.meridiani);
  t("le due sigle di " + c.id + " sono linkate", conta(h, "<a ") === 2, h);
  L.merOfCost(c).forEach((id) =>
    t("la sigla di " + c.id + " punta a " + id, h.indexOf('href="' + L.hrefMer(id) + '"') !== -1, h));
});
t("linkSigleMer conserva i separatori", L.linkSigleMer("V – IT").indexOf(" – ") !== -1);

/* entitaCitate: serve dove il testo resta modificabile (note dei pazienti) */
const cit = L.entitaCitate("Il paziente è un TAI YANG, testato Sovraspinato e VC8.");
t("entità citate riconosciute", cit.length === 3, JSON.stringify(cit.map((x) => x.href)));
t("entità citate senza duplicati", new Set(cit.map((x) => x.href)).size === cit.length);
t("entità citate da testo vuoto", L.entitaCitate("   ").length === 0);
t("i chip citati sono link",
  L.chipsCitate("Milza").join("").indexOf('href="#punti/mer/milza"') !== -1);

console.log((ko ? "\u2717" : "\u2713") + " test_links: " + ok + " passati, " + ko + " falliti");
process.exit(ko ? 1 : 0);
