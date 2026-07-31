/* Test della sezione «Costituzioni & Temperamenti».
   Uso:  node tools/test_costituzioni.js [percorso-progetto]
   (installare jsdom fuori dal mount, es. `cd /tmp/t && npm i jsdom`) */
const fs = require("fs"), path = require("path");
const { JSDOM } = require("jsdom");
const ROOT = process.argv[2] || process.env.KAPP_ROOT || path.join(__dirname, "..");
const rd = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
let pass = 0, fail = 0;
const ok = (c, m, e) => c ? (pass++, console.log("  ✓ " + m))
                          : (fail++, console.log("  ✗ " + m + (e !== undefined ? " → " + JSON.stringify(e) : "")));

const SCRIPTS = ["assets/js/data.js", "assets/js/punti_data.js", "assets/js/corpo_data.js",
  "assets/js/manichino.js", "assets/js/meridiani_data.js", "assets/js/meridiani.js",
  "assets/js/tavole.js", "assets/js/costituzioni_data.js", "assets/js/costituzioni.js",
  "assets/js/app.js", "assets/js/punti.js"];

function boot(hash) {
  const html = rd("index.html");
  const dom = new JSDOM(html, { runScripts: "outside-only", pretendToBeVisual: true,
                                url: "http://localhost/" + (hash || "") });
  const w = dom.window;
  w.HTMLCanvasElement.prototype.getContext = () => ({
    fillRect(){}, clearRect(){}, fillText(){}, measureText: () => ({ width: 10 }),
    beginPath(){}, arc(){}, fill(){}, stroke(){}, save(){}, restore(){}, translate(){},
    scale(){}, drawImage(){}, createLinearGradient: () => ({ addColorStop(){} }),
    getImageData: () => ({ data: [] }), putImageData(){}, closePath(){}, moveTo(){}, lineTo(){},
    strokeText(){}, setTransform(){}, rect(){}, quadraticCurveTo(){}, bezierCurveTo(){}
  });
  w.matchMedia = w.matchMedia || (() => ({ matches: false, addListener(){}, removeListener(){} }));
  w.scrollTo = () => {};
  w.requestAnimationFrame = () => 0;
  w.cancelAnimationFrame = () => {};
  w.global = w;
  global.window = w; global.document = w.document;
  w.eval("var module={};" + rd("tools/three_stub.js") + ";window.THREE=module.exports;");
  SCRIPTS.forEach((s) => { try { w.eval(rd(s)); } catch (e) { console.log("  ! errore in " + s + ": " + e.message); } });
  return w;
}
const go = (w, hash) => { w.location.hash = hash; w.dispatchEvent(new w.Event("hashchange")); };
const $ = (w, sel) => w.document.querySelector(sel);
const $$ = (w, sel) => Array.from(w.document.querySelectorAll(sel));

console.log("\n== 1. Navigazione e home ==");
const w = boot("");
ok(!!$(w, '.macronav__tab[data-sec="costituzioni"]'), "la tab «Costituzioni» esiste nella barra");
ok($(w, "#puntiView").hidden === false, "avvio senza hash → sezione Punti Indicatori");

go(w, "#costituzioni");
ok($(w, "#costView").hidden === false, "#costituzioni mostra la sezione");
ok($(w, "#puntiView").hidden === true && $(w, "#listView").hidden === true, "le altre sezioni sono nascoste");
ok($(w, '.macronav__tab[data-sec="costituzioni"]').classList.contains("active"), "la tab risulta attiva");
ok($(w, "#searchWrap").hidden === false, "la ricerca è visibile nella home");
ok($(w, "#backBtn").hidden === true, "nessun «Indietro» nella home");
ok($$(w, ".coblock").length === 6, "6 blocchi in home (coppia + 3 principali + tabella + approfondimenti)", $$(w, ".coblock").length);
const cards = $$(w, ".cocard");
ok(cards.length === 14, "14 schede in home (coppia + 3 biotipi + 6 costituzioni + 2 test + 2 extra)", cards.length);
ok($$(w, ".cotab tbody tr").length === 6, "tabella riassuntiva con 6 righe", $$(w, ".cotab tbody tr").length);
ok(/Ectomorfo[\s\S]*Mesomorfo[\s\S]*Endomorfo/.test($(w, "#costView").textContent), "i 3 biotipi compaiono in home");
ok(/TAI YANG[\s\S]*SHAO YANG[\s\S]*TAI YIN[\s\S]*YANG MING[\s\S]*JUE YIN[\s\S]*SHAO YIN/.test($(w, "#costView").textContent),
   "le 6 costituzioni compaiono in home");

console.log("\n== 2. Scheda biotipo ==");
go(w, "#cost/biotipo/ecto");
let t = $(w, "#costView").textContent;
ok($(w, ".cohead h2").textContent === "ECTOMORFO", "titolo della scheda", $(w, ".cohead h2").textContent);
ok($(w, "#backBtn").hidden === false, "«Indietro» visibile nel dettaglio");
ok($(w, "#searchWrap").hidden === true, "ricerca nascosta nel dettaglio");
ok($$(w, "#costView .section").length === 10, "10 sezioni nella scheda biotipo", $$(w, "#costView .section").length);
ok(/TAI YANG – SHAO YIN/.test(t), "sintesi: livelli MTC");
ok(/Piccoli, Secchi/.test(t) && /DOLORE/.test(t), "scheda fisica e sintomo chiave");
ok(/Deficit di Yin di Rene/.test(t), "sindromi MTC classiche");
ok(/SEPARAZIONE/.test(t) && /Paranoia/.test(t), "personalità e insofferenze");
ok(/Adattabile, positivo/.test(t) && /Codardo, servile/.test(t), "ergopsichica alto e basso");
ok(!/orgoglioso ambizioso/.test(t), "nessuna contaminazione dalla colonna Mesomorfo");
ok($$(w, "#costView .cocard").length === 2, "link alle 2 costituzioni del biotipo", $$(w, "#costView .cocard").length);
["ecto", "meso", "endo"].forEach((id) => {
  go(w, "#cost/biotipo/" + id);
  const kv = $$(w, "#costView .kv__row").length;
  ok(kv >= 40, "scheda " + id + ": almeno 40 righe chiave/valore", kv);
});

console.log("\n== 3. Scheda costituzione ==");
go(w, "#cost/costituzione/tai-yang");
t = $(w, "#costView").textContent;
ok($(w, ".cohead h2").textContent === "TAI YANG", "titolo");
ok(/001/.test(t) && /Cavallo/.test(t) && /Germanici/.test(t), "codice, animale, popolazione");
ok(/TI AMIAMO SOLO SE SEI PERFETTO/.test(t), "motto della difesa emotiva");
ok(/V62/.test(t), "punto di test");
ok($$(w, "#costView img.pageimg").length >= 4, "immagini (trigramma, curva, profiling, punto)",
   $$(w, "#costView img.pageimg").length);
const attesi = { "tai-yang": "V62", "shao-yang": "VB41", "tai-yin": "M4",
                 "yang-ming": "TR5", "jue-yin": "PC6", "shao-yin": "R6" };
Object.keys(attesi).forEach((id) => {
  go(w, "#cost/costituzione/" + id);
  const txt = $(w, "#costView").textContent;
  ok(txt.indexOf(attesi[id]) !== -1 && $$(w, "#costView .section").length === 5,
     "scheda " + id + " completa, punto " + attesi[id]);
});

console.log("\n== 4. Procedure di test ==");
go(w, "#cost/test/costituzioni");
ok($$(w, ".copunto").length === 6, "6 punti chiave", $$(w, ".copunto").length);
ok($$(w, ".copunto__t").map((e) => e.textContent).join(",") === "M4,V62,PC6,VB41,R6,TR5",
   "sigle nell'ordine del manuale", $$(w, ".copunto__t").map((e) => e.textContent));
ok(/VC8/.test($(w, "#costView").textContent), "il passo 1 cita VC8 (Ombelico)");
go(w, "#cost/test/temperamenti");
t = $(w, "#costView").textContent;
ok(/Mano destra/.test(t) && /Mano sinistra/.test(t), "le due mani");
ok(/Nervoso/.test(t) && /Melanconico/.test(t) && /Sanguigno/.test(t), "i 6 polsi");
ok($$(w, "#costView img.pageimg").length === 1, "immagine dei polsi");

console.log("\n== 5. Confronto e teoria ==");
go(w, "#cost/confronto");
ok($$(w, ".cotab--conf").length === 2, "2 tabelle comparative", $$(w, ".cotab--conf").length);
ok($$(w, ".cotab--conf")[0].querySelectorAll("thead th").length === 4, "3 colonne biotipo + intestazione");
ok($$(w, ".cotab--conf")[0].querySelectorAll("tbody tr").length === 18, "17 righe + sintomatologia",
   $$(w, ".cotab--conf")[0].querySelectorAll("tbody tr").length);
t = $(w, "#costView").textContent;
ok(/Vertigine/.test(t) && /Rabbia/.test(t) && /Abulia/.test(t), "sintomi dei 3 biotipi a confronto");
go(w, "#cost/teoria");
ok($$(w, ".cocard").length === 8, "8 capitoli di teoria", $$(w, ".cocard").length);
go(w, "#cost/teoria/t1");
ok(/biotipi/.test($(w, "#costView").textContent), "capitolo 1 con testo");
go(w, "#cost/teoria/t2");
ok(/Ippocrate/.test($(w, "#costView").textContent) &&
   !/^Il modello costituzionale di Ippocrate: approccio umorale Fu proprio/.test($$(w, "#costView .section p")[0].textContent),
   "il titolo non è duplicato dentro il testo");

console.log("\n== 6. Ricerca ==");
go(w, "#costituzioni");
w.Cost.filter("cavallo");
ok(/TAI YANG/.test($(w, "#costView").textContent), "cerca «cavallo» → Tai Yang");
w.Cost.filter("polsi");
ok(/TEMPERAMENTI/.test($(w, "#costView").textContent) && $$(w, ".cocard").length === 2,
   "cerca «polsi» → procedura Temperamenti + percorso guidato", $$(w, ".cocard").length);
w.Cost.filter("emorroidi");
ok(/MESOMORFO/.test($(w, "#costView").textContent), "cerca «emorroidi» → Mesomorfo");
w.Cost.filter("zzzz");
ok(!!$(w, ".noresults"), "nessun risultato per una parola inesistente");
w.Cost.filter("");
ok($$(w, ".cocard").length === 14, "svuotando la ricerca torna la home", $$(w, ".cocard").length);

console.log("\n== 7. Immagini presenti su disco ==");
const D = w.COSTITUZIONI;
const src = [];
(function walk(n) {
  if (typeof n === "string") { if (/^assets\/costituzioni\//.test(n)) src.push(n); }
  else if (Array.isArray(n)) n.forEach(walk);
  else if (n && typeof n === "object") Object.values(n).forEach(walk);
})(D);
const mancanti = src.filter((s) => !fs.existsSync(path.join(ROOT, s)));
ok(mancanti.length === 0, src.length + " riferimenti a immagini, tutti esistenti", mancanti);

console.log("\n== 8. Caricamento diretto e non-regressione ==");
const w2 = boot("#cost/costituzione/shao-yin");
ok($(w2, "#costView").hidden === false && /SHAO YIN/.test($(w2, "#costView").textContent),
   "link diretto #cost/costituzione/shao-yin funziona al primo caricamento");
const w3 = boot("#costituzioni");
ok($$(w3, ".cocard").length === 14, "link diretto #costituzioni apre la home", $$(w3, ".cocard").length);
go(w3, "#coordinate");
ok($(w3, "#listView").hidden === false && $(w3, "#costView").hidden === true, "→ Coordinate: elenco visibile");
ok($$(w3, "#grid .card").length === 16, "16 meridiani nell'elenco Coordinate", $$(w3, "#grid .card").length);
go(w3, "#/rene-psoas+cuore-sottoscapolare");
ok($(w3, "#coordView").hidden === false, "coordinata a coppia ancora funzionante");
go(w3, "");
ok($(w3, "#puntiView").hidden === false && $(w3, "#costView").hidden === true, "→ Punti Indicatori ancora funzionante");
ok($$(w3, "#puntiList *").length > 0, "lista punti popolata");

console.log("\n== 9. Pulsante Indietro ==");
const w4 = boot("#cost/biotipo/meso");
$(w4, "#backBtn").dispatchEvent(new w4.Event("click"));
ok(w4.location.hash === "#costituzioni", "dal dettaglio torna alla home Costituzioni", w4.location.hash);
const w5 = boot("#cost/teoria/t3");
$(w5, "#backBtn").dispatchEvent(new w5.Event("click"));
ok(w5.location.hash === "#cost/teoria", "da un capitolo torna all'indice della teoria", w5.location.hash);

console.log("\n== 10. Coppia Costituzione + Temperamento ==");
const wc = boot("#costituzioni");
ok(!!$(wc, '.cocard[href="#cost/coppia"]'), "in home c'è la card del percorso guidato");

go(wc, "#cost/coppia");
ok($$(wc, ".costep").length === 3, "passo 1: indicatore a 3 passi", $$(wc, ".costep").length);
ok($(wc, ".costep.is-now .costep__t").textContent === "Costituzione", "passo 1 è quello attivo");
ok($$(wc, '.cocard[href^="#cost/coppia/"]').length === 6, "passo 1: 6 costituzioni fra cui scegliere",
   $$(wc, '.cocard[href^="#cost/coppia/"]').length);
ok($(wc, "#backBtn").hidden === false, "il pulsante Indietro compare fuori dalla home");

go(wc, "#cost/coppia/tai-yang");
ok($(wc, ".costep.is-now .costep__t").textContent === "Temperamento", "passo 2 è quello attivo");
ok($$(wc, '.cocard[href^="#cost/coppia/tai-yang/"]').length === 6, "passo 2: 6 temperamenti fra cui scegliere",
   $$(wc, '.cocard[href^="#cost/coppia/tai-yang/"]').length);
ok(/Mano destra[\s\S]*Mano sinistra/.test($(wc, "#costView").textContent), "i temperamenti sono divisi per polso");

go(wc, "#cost/coppia/tai-yang/bilioso");
const tc = $(wc, "#costView").textContent;
ok(/TAI YANG \+ Bilioso/.test(tc), "risultato: intestazione della coppia");
ok(/Profilo misto/.test(tc), "coppia divergente → profilo misto");
ok($$(wc, ".cotab--coppia thead th").length === 3, "sintesi a 3 colonne (voce + 2 profili)",
   $$(wc, ".cotab--coppia thead th").length);
ok($$(wc, ".cotab--coppia tbody tr").length === 10, "10 voci di confronto",
   $$(wc, ".cotab--coppia tbody tr").length);
ok(/SHAO YANG/.test(tc), "cita la costituzione nativa del temperamento scelto");
ok(/Convergenze e divergenze/.test(tc), "blocco convergenze/divergenze presente");
ok(/V62/.test(tc) && /mano sinistra/.test(tc), "riporta punto chiave e polso della coppia");
ok(!/insofferenza/i.test(tc) && !/Ergopsichica/i.test(tc), "niente contenuti estranei alla coppia");
ok($$(wc, ".cocard").length === 2, "solo i link alle 2 schede complete", $$(wc, ".cocard").length);

go(wc, "#cost/coppia/tai-yang/nervoso");
const tp = $(wc, "#costView").textContent;
ok(/Profilo coerente/.test(tp), "coppia coincidente → profilo coerente");
ok($$(wc, ".cotab--coppia thead th").length === 2, "profilo coerente: sintesi a 1 sola colonna",
   $$(wc, ".cotab--coppia thead th").length);
ok($$(wc, ".cocard").length === 1, "profilo coerente: una sola scheda completa", $$(wc, ".cocard").length);

const wb = boot("#cost/coppia/tai-yin/linfatico");
$(wb, "#backBtn").dispatchEvent(new wb.Event("click"));
ok(wb.location.hash === "#cost/coppia/tai-yin", "Indietro dal risultato torna al passo 2", wb.location.hash);
$(wb, "#backBtn").dispatchEvent(new wb.Event("click"));
ok(wb.location.hash === "#cost/coppia", "Indietro dal passo 2 torna al passo 1", wb.location.hash);
$(wb, "#backBtn").dispatchEvent(new wb.Event("click"));
ok(wb.location.hash === "#costituzioni", "Indietro dal passo 1 torna alla home", wb.location.hash);

console.log("\n== 11. Test discriminante Milza / Pancreas ==");
const wm = boot("");
wm.PuntiMap.selectPunto("milza");
const info = $(wm, "#puntiInfo");
ok(/Milza o Pancreas\?/.test(info.textContent), "il punto Milza propone il test discriminante");
ok($$(wm, "#puntiInfo .mpopt").length === 2, "due muscoli indicatori proposti", $$(wm, "#puntiInfo .mpopt").length);
ok(/Trapezio Medio[\s\S]*MILZA/.test(info.textContent), "Trapezio Medio → Milza");
ok(/Gran Dorsale[\s\S]*PANCREAS/.test(info.textContent), "Gran Dorsale → Pancreas");

$(wm, '#puntiInfo .mpopt[data-mp="pancreas"]').dispatchEvent(new wm.Event("click"));
const tx = $(wm, "#puntiInfo").textContent;
ok(/Organo: Pancreas/.test(tx), "scelto Gran Dorsale → mostra il Pancreas");
ok(/meato uditivo esterno/.test(tx), "NV del Pancreas (non quelli della Milza)");
ok(!/sutura lambdoidea/.test(tx), "nessun punto della Milza in vista");
ok(/neuro-linfatici/i.test(tx) && /neurovascolari/i.test(tx) && /Reflessologia/i.test(tx),
   "NL + NV + reflessologia dell'organo scelto");
ok($$(wm, "#puntiInfo .mpfig img").length === 3, "3 immagini: NL, NV, ruota energetica",
   $$(wm, "#puntiInfo .mpfig img").length);
ok(!!$(wm, '#puntiInfo a[href="#/milza-pancreas-gran-dorsale"]'), "link alla coordinata Gran Dorsale");

$(wm, "#puntiInfo [data-mpreset]").dispatchEvent(new wm.Event("click"));
ok($$(wm, "#puntiInfo .mpopt").length === 2, "«Rifai il test» riporta alla scelta");

$(wm, '#puntiInfo .mpopt[data-mp="milza"]').dispatchEvent(new wm.Event("click"));
const tx2 = $(wm, "#puntiInfo").textContent;
ok(/Organo: Milza/.test(tx2) && /sutura lambdoidea/.test(tx2), "scelto Trapezio Medio → mostra la Milza");
ok(!!$(wm, '#puntiInfo a[href="#/milza-trapezio-medio"]'), "link alla coordinata Trapezio Medio");

wm.PuntiMap.selectPunto("milza-dx");
ok(/Organo: Milza/.test($(wm, "#puntiInfo").textContent), "la scelta resta passando all'altro punto Milza");
wm.PuntiMap.selectPunto("fegato");
ok(!/Milza o Pancreas\?/.test($(wm, "#puntiInfo").textContent), "su un altro organo il test non compare");
wm.PuntiMap.selectPunto("milza");
ok($$(wm, "#puntiInfo .mpopt").length === 2, "tornando alla Milza il test riparte da zero",
   $$(wm, "#puntiInfo .mpopt").length);

console.log("\n" + (fail ? "✗ " : "✓ ") + pass + "/" + (pass + fail) + " test superati");
process.exit(fail ? 1 : 0);
