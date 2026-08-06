/* test_modi_ricerca.js — smoke test: sezioni "modi" nella coordinata e
   evidenziazione della ricerca fuori dall'elenco.  node tools/test_modi_ricerca.js */
const fs = require("fs"), path = require("path");
const { JSDOM } = require("jsdom");

const root = path.join(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

// index.html senza gli script (li iniettiamo noi: niente three.js / WebGL)
const html = read("index.html").replace(/<script[\s\S]*?<\/script>/g, "");
const dom = new JSDOM(html, { url: "http://localhost/", runScripts: "outside-only", pretendToBeVisual: true });
const w = dom.window;
w.scrollTo = () => {};
w.matchMedia = w.matchMedia || (() => ({ matches: false, addListener() {}, removeListener() {} }));
w.Element.prototype.scrollIntoView = () => {};
["assets/js/data.js", "assets/js/modi_data.js", "assets/js/app.js"].forEach((f) => w.eval(read(f)));

let ok = 0;
function check(name, cond) {
  if (!cond) { console.error("FAIL: " + name); process.exitCode = 1; } else ok++;
}
const $ = (s) => w.document.querySelector(s);
const txt = () => $("#sections").textContent;

// --- coordinata: Stomaco (muscolo) + Intestino Tenue (posizione) -------------
const ids = w.COORDINATE.map((c) => c.id);
w.location.hash = "#/" + ids[0] + "+" + ids[1];
w.dispatchEvent(new w.Event("hashchange"));

check("vista coordinata aperta", !$("#coordView").hidden);
["neurolinfatici", "neurovascolari", "fiore", "pensiero", "reflessologia",
 "acutouch", "genealogia", "modi"].forEach((id) =>
  check("sezione #sec-" + id, !!$("#sec-" + id)));

check("modo NL", txt().includes("LC di St35"));
check("modo NV", txt().includes("LC di TR10"));
check("modo essenze", txt().includes("Modo delle Essenze"));
check("modo genealogia", txt().includes("VG 24.5"));
check("tabella zona/tocco", txt().includes("Coppettazione"));
check("modi digitali completi", w.MODI.digitali.every((m) => txt().includes(m.nome)));
check("immagini modi", !!$('#sec-genealogia img[src*="matrice_genealogia"]'));

// le 2 voci IrF/IoF della posizione finiscono nelle frasi
const c1 = w.COORDINATE[0], c2 = w.COORDINATE[1];
const row = (c1.atteggiamenti || []).find((a) => a.meridiano === (c2.meridianoKey || c2.meridiano));
if (row && row.stress) {
  const voci = row.stress.split("/").map((s) => s.split(":").pop().trim());
  const p = $("#sec-pensiero").textContent;
  check("frase forme pensiero", p.includes("il mio pensiero che ho associato"));
  check("frase sensazioni", p.includes("la mia emozione"));
  voci.forEach((v) => check("voce «" + v + "» nelle frasi", p.includes(v)));
}

// --- ricerca: barra sempre visibile + evidenziazione ------------------------
check("barra visibile nella coordinata", !$("#searchWrap").hidden);
const inp = $("#search");
inp.value = "priorita";                       // senza accento: deve matchare "Priorità"
inp.dispatchEvent(new w.Event("input"));
const marks = w.document.querySelectorAll("#coordView mark.shl");
check("evidenziate le occorrenze", marks.length > 0);
check("match senza accento", Array.from(marks).some((m) => m.textContent === "Priorità"));
check("contatore risultati", !$("#searchInfo").hidden && /risultat/.test($("#searchInfo").textContent));

const before = $("#sec-modi").textContent;
inp.value = "";
inp.dispatchEvent(new w.Event("input"));
check("nessun mark residuo", w.document.querySelectorAll("mark.shl").length === 0);
check("testo intatto dopo la pulizia", $("#sec-modi").textContent === before);

console.log(ok + " test ok");
