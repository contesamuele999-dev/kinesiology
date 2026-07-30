const fs = require("fs"), path = require("path");
const { JSDOM } = require("jsdom");
const ROOT = "/sessions/nice-gifted-carson/mnt/Kinesiology App";
const rd = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

let pass = 0, fail = 0;
function ok(cond, msg, extra) {
  if (cond) { pass++; console.log("  ✓ " + msg); }
  else { fail++; console.log("  ✗ " + msg + (extra !== undefined ? "  → " + JSON.stringify(extra) : "")); }
}

function boot(opts) {
  opts = opts || {};
  const html = rd("index.html").replace(/<script[\s\S]*?<\/script>/g, "");
  const dom = new JSDOM(html, { url: "http://localhost/" + (opts.hash || ""), pretendToBeVisual: true, runScripts: "outside-only" });
  const w = dom.window;
  global.window = w; global.document = w.document; global.navigator = w.navigator;
  // canvas 2d stub
  w.HTMLCanvasElement.prototype.getContext = function () {
    return { fillStyle: "", font: "", textAlign: "", textBaseline: "", lineWidth: 0, strokeStyle: "",
             strokeText() {}, fillText() {}, clearRect() {}, drawImage() {} };
  };
  Object.defineProperty(w.HTMLElement.prototype, "clientWidth", { get() { return 600; }, configurable: true });
  Object.defineProperty(w.HTMLElement.prototype, "clientHeight", { get() { return 480; }, configurable: true });
  w.requestAnimationFrame = () => 0; w.cancelAnimationFrame = () => {};
  w.matchMedia = w.matchMedia || (() => ({ matches: false, addListener() {}, removeListener() {} }));
  w.alert = () => {}; w.confirm = () => true;
  const store = opts.store || {};
  Object.defineProperty(w, "localStorage", {
    value: { getItem: (k) => (k in store ? store[k] : null),
             setItem: (k, v) => { store[k] = String(v); },
             removeItem: (k) => { delete store[k]; } },
    configurable: true
  });
  w.THREE = require("./three_stub.js");
  const files = ["assets/js/data.js", "assets/js/punti_data.js", "assets/js/corpo_data.js",
                 "assets/js/manichino.js", "assets/js/meridiani_data.js",
                 "assets/js/meridiani.js", "assets/js/tavole.js",
                 "assets/js/app.js", "assets/js/punti.js"];
  files.forEach((f) => { try { w.eval(rd(f)); } catch (e) { console.log("ERR in " + f + ": " + e.message + "\n" + (e.stack||"").split("\n").slice(0,4).join("\n")); throw e; } });
  return { w, store };
}

console.log("\n=== 1. Dati meridiani ===");
{
  const { w } = boot();
  const D = w.MERIDIANI;
  ok(D && D.meridiani.length === 14, "14 meridiani nei dati", D && D.meridiani.length);
  const punti = D.meridiani.reduce((a, m) => a + m.nodi.filter((n) => n.sigla).length
        + ((m.ramo || []).filter((n) => n.sigla).length), 0);
  ok(punti === 361, "361 punti classici", punti);
  ok(D.totalePunti === 361, "totale dichiarato nei dati", D.totalePunti);
  const dup = {}; let dupErr = 0;
  D.meridiani.forEach((m) => (m.nodi.concat(m.ramo || [])).forEach((n) => {
    if (!n.sigla) return; if (dup[n.sigla]) dupErr++; dup[n.sigla] = 1; }));
  ok(dupErr === 0, "nessuna sigla duplicata", dupErr);
  const attesi = { polmone:11, "intestino-crasso":20, stomaco:45, milza:21, cuore:9,
    "intestino-tenue":19, vescica:67, rene:27, "maestro-cuore":9,
    "triplice-riscaldatore":23, "vescica-biliare":44, fegato:14,
    "vaso-concezione":24, "vaso-governatore":28 };
  const sbagliati = D.meridiani.filter((m) => (m.nodi.concat(m.ramo||[])).filter((n)=>n.sigla).length !== attesi[m.id]);
  ok(sbagliati.length === 0, "conteggio punti corretto per ogni meridiano", sbagliati.map((m)=>m.id));
  const badZ = D.meridiani.filter((m) => m.nodi.concat(m.ramo||[]).some((n) => Math.abs(n.z) > 0.7 || Math.abs(n.x) > 1.0 || n.y < -1.4 || n.y > 3.0));
  ok(badZ.length === 0, "tutte le coordinate nel volume del manichino", badZ.map((m) => m.id));
  ok(D.meridiani.every((m) => m.colore && m.nome && m.sigla && m.descrizione), "metadati completi su tutti i meridiani");
  const mid = D.meridiani.filter((m) => !m.bilaterale).map((m) => m.id);
  ok(mid.length === 2 && mid.includes("vaso-concezione") && mid.includes("vaso-governatore"), "solo VC e VG mediani", mid);
  ok(D.meridiani.filter((m) => !m.bilaterale).every((m) => m.nodi.every((n) => n.x === 0)), "i mediani hanno x=0");
  ok(D.meridiani.filter((m) => m.ramo).map((m) => m.id).sort().join(",") === "stomaco,vescica", "rami secondari su Stomaco e Vescica",
     D.meridiani.filter((m) => m.ramo).map((m) => m.id));
}

console.log("\n=== 2. Costruzione 3D ===");
{
  const { w } = boot();
  const MM = w.MeridianiMap;
  ok(!!MM, "MeridianiMap esposto");
  ok(!!MM.group, "gruppo 3D creato da punti.js");
  ok(MM.group.children.length === 14, "14 sottogruppi (uno per meridiano)", MM.group.children.length);
  const atteso = w.MERIDIANI.meridiani.reduce((a, m) => a +
      (m.nodi.filter((n) => n.sigla).length + (m.ramo||[]).filter((n)=>n.sigla).length) * (m.bilaterale ? 2 : 1), 0);
  ok(MM.pointMeshes.length === atteso, "marker punti = punti × lati (" + atteso + ")", MM.pointMeshes.length);
  const tubi = MM.group.children.reduce((a, g) => a + g.children.filter((c) => c.userData.tratto).length, 0);
  const attesiTubi = w.MERIDIANI.meridiani.reduce((a, m) => a + (m.bilaterale ? 2 : 1) * (m.ramo ? 2 : 1), 0);
  ok(tubi === attesiTubi, "tracciati = " + attesiTubi, tubi);
  ok(MM.pointMeshes.every((p) => p.userData.merPunto && p.userData.merPunto.sigla), "ogni marker ha sigla + riferimento");
  // specchiatura
  const p = w.MERIDIANI.meridiani.find((m) => m.id === "polmone");
  const dx = MM.pointMeshes.filter((m) => m.userData.merPunto.merId === "polmone" && m.userData.merPunto.side === -1);
  ok(dx.length === p.nodi.filter((n) => n.sigla).length && dx.every((m) => m.position.x < 0), "lato destro specchiato (x<0)");
}

console.log("\n=== 3. Corrispondenza punto → meridiano ===");
{
  const { w } = boot();
  const MM = w.MeridianiMap;
  const nomi = ["Polmone", "Intestino Crasso", "Stomaco", "Milza", "Cuore", "Intestino Tenue", "Vescica",
                "Rene", "Maestro del Cuore (Pericardio)", "Triplice Riscaldatore", "Vescica Biliare", "Fegato",
                "Vaso Concezione", "Vaso Governatore"];
  const nonRisolti = nomi.filter((n) => !MM.byName(n));
  ok(nonRisolti.length === 0, "tutti i nomi usati nell'app risolvono a un meridiano", nonRisolti);
  ok(MM.byName("VB").id === "vescica-biliare" && MM.byName("GB").id === "vescica-biliare", "sigle IT/EN risolvono");
  // ogni punto indicatore ha un meridiano più vicino, ed è coerente col campo dichiarato
  const punti = w.PUNTI_INDICATORI.punti;
  let coerenti = 0, tot = 0;
  const report = [];
  punti.forEach((p) => {
    const near = MM.nearest(p.pos);
    if (!near) return;
    if (!p.meridiano) return;
    tot++;
    const dich = MM.byName(p.meridiano);
    const same = dich && dich.id === near.mer.id;
    if (same) coerenti++;
    report.push(p.organo + " → dich:" + (dich ? dich.sigla : "?") + " vicino:" + near.mer.sigla + " " + near.dist.toFixed(2));
  });
  ok(tot > 0 && punti.every((p) => !!MM.nearest(p.pos)), "nearest() risponde per tutti i punti indicatori");
  console.log("    coerenza dichiarato/più-vicino: " + coerenti + "/" + tot);
  report.forEach((r) => console.log("      · " + r));
  // il punto MTC più vicino sul meridiano dichiarato deve esistere
  const senzaPunto = punti.filter((p) => p.meridiano && MM.byName(p.meridiano) && !MM.nearestPoint(p.pos, { merId: MM.byName(p.meridiano).id }));
  ok(senzaPunto.length === 0, "punto MTC più vicino trovato sul meridiano dichiarato", senzaPunto.length);
}

console.log("\n=== 3b. Corrispondenze Mu classiche ===");
{
  const { w } = boot();
  const MM = w.MeridianiMap;
  const casi = [
    ["Stomaco", "vaso-concezione", "VC12"],
    ["Cuore", "vaso-concezione", "VC14"],
    ["Intestino Tenue", "vaso-concezione", "VC4"],
    ["Intestino Crasso (dx)", "stomaco", "S25"],
    ["Rene (dx)", "vescica", "V23"]
  ];
  casi.forEach(([organo, merAtteso, siglaAttesa]) => {
    const p = w.PUNTI_INDICATORI.punti.find((x) => x.organo === organo);
    if (!p) { ok(false, "punto " + organo + " presente"); return; }
    const near = MM.nearest(p.pos);
    ok(near.mer.id === merAtteso, organo + " cade sul tracciato " + merAtteso,
       near.mer.id + " / " + near.punto.sigla + " @" + (near.puntoDist * 40).toFixed(1) + "cm");
  });
}

console.log("\n=== 4. Interfaccia: chip e visibilità ===");
{
  const { w } = boot();
  const MM = w.MeridianiMap, d = w.document;
  const chips = d.querySelectorAll("#merChips .merchip");
  ok(chips.length === 14, "14 chip generati", chips.length);
  const chip = d.querySelector('.merchip[data-mer="fegato"]');
  ok(!!chip, "chip del Fegato presente");
  chip.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  ok(MM.isVisible("fegato") === false && chip.classList.contains("is-off"), "clic sul chip nasconde il meridiano");
  chip.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  ok(MM.isVisible("fegato") === true, "secondo clic lo ri-mostra");
  d.getElementById("merNone").dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  ok(MM.list().every((m) => !MM.isVisible(m.id)), "«Nessuno» nasconde tutto");
  d.getElementById("merAll").dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  ok(MM.list().every((m) => MM.isVisible(m.id)), "«Tutti» rimostra tutto");
  const segB = (v) => d.querySelector('#merPointsSeg [data-pm="' + v + '"]');
  segB("nessuno").dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  ok(MM.pointMeshes.every((p) => !p.visible), "«Nessuno» nasconde i marker MTC");
  ok(segB("nessuno").classList.contains("is-on"), "il segmento attivo si evidenzia");
  segB("tutti").dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  ok(MM.pointMeshes.every((p) => p.visible), "«Tutti» mostra tutti i 361 punti");
  segB("chiave").dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  const vis = MM.pointMeshes.filter((p) => p.visible).length;
  ok(vis > 0 && vis < MM.pointMeshes.length, "«Principali» mostra solo i punti chiave", vis + "/" + MM.pointMeshes.length);
  ok(!segB("tutti").classList.contains("is-on"), "gli altri segmenti si spengono");
  const show = d.getElementById("merShow");
  show.checked = false; show.dispatchEvent(new w.Event("change", { bubbles: true }));
  ok(MM.group.visible === false, "toggle master nasconde il gruppo");
}

console.log("\n=== 4b. Interruttore Punti Indicatori ===");
{
  const { w } = boot();
  const d = w.document;
  const sw = d.getElementById("puntiShow");
  ok(!!sw && sw.checked, "interruttore presente e acceso di default");
  ok(d.querySelectorAll(".tgl").length === 3, "3 toggle nel pannello", d.querySelectorAll(".tgl").length);
  sw.checked = false; sw.dispatchEvent(new w.Event("change", { bubbles: true }));
  ok(w.PuntiMap.puntiVisible() === false, "spegnimento registrato");
  ok(d.getElementById("puntiList").classList.contains("is-off"), "elenco attenuato quando sono spenti");
  sw.checked = true; sw.dispatchEvent(new w.Event("change", { bubbles: true }));
  ok(w.PuntiMap.puntiVisible() === true, "riaccensione");
  ok(!d.getElementById("puntiList").classList.contains("is-off"), "elenco di nuovo pieno");
  // spegnendo e selezionando un punto dalla lista, i punti si riaccendono da soli
  w.PuntiMap.setPuntiVisible(false);
  const p0 = w.PUNTI_INDICATORI.punti[0];
  d.querySelector('#puntiList [data-id="' + p0.id + '"]').dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  ok(w.PuntiMap.puntiVisible() === true, "selezionare un punto dalla lista lo riaccende");
  ok(sw.checked === true, "l'interruttore si aggiorna da solo");
}

console.log("\n=== 4c. Tavole 2D ===");
{
  const { w } = boot();
  const d = w.document;
  ok(!!w.Tavole, "modulo Tavole disponibile");
  ok(d.getElementById("stage3d") && !d.getElementById("stage3d").hidden, "si parte dalla Mappa 3D");
  ok(d.getElementById("stage2d").hidden, "la vista 2D è nascosta all'avvio");
  const tab2 = d.querySelector('#stageTabs [data-stage="2d"]');
  tab2.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  ok(w.PuntiMap.stage() === "2d", "la sottoscheda passa a 2D");
  ok(!d.getElementById("stage2d").hidden && d.getElementById("stage3d").hidden, "gli stage si scambiano");
  ok(d.querySelectorAll("#plateTabs .platetab").length === 8, "8 tavole disponibili",
     d.querySelectorAll("#plateTabs .platetab").length);
  const svg = d.getElementById("tavolaSvg");
  ok(svg.querySelectorAll(".tav__body path").length > 10, "sagome disegnate",
     svg.querySelectorAll(".tav__body path").length);
  ok(svg.querySelectorAll(".tav__det path").length > 20, "linee anatomiche disegnate",
     svg.querySelectorAll(".tav__det path").length);
  const nInd = svg.querySelectorAll("circle.tp--ind").length;
  ok(nInd > 0 && nInd <= 18, "punti indicatori sulla tavola frontale", nInd);
  const nTot = svg.querySelectorAll("circle.tp").length;
  ok(nTot > nInd, "punti dei meridiani presenti", nTot);
  // cambio tavola
  d.querySelector('#plateTabs [data-plate="retro"]').dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  ok(d.querySelector('#plateTabs [data-plate="retro"]').classList.contains("is-on"), "cambio tavola");
  const retroInd = svg.querySelectorAll("circle.tp--ind").length;
  ok(retroInd > 0 && retroInd < nInd, "la tavola retro mostra solo i punti posteriori", retroInd);
  // spegnendo i punti indicatori spariscono anche dalla tavola
  w.PuntiMap.setPuntiVisible(false);
  ok(svg.querySelectorAll("circle.tp--ind").length === 0, "l'interruttore vale anche in 2D");
  w.PuntiMap.setPuntiVisible(true);
  // click su un punto del meridiano apre la scheda
  d.querySelector('#plateTabs [data-plate="fronte"]').dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  const merC = Array.from(svg.querySelectorAll("circle.tp")).filter((c) => !c.classList.contains("tp--ind"))[0];
  merC.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  ok(/Meridiano/.test(d.getElementById("puntiInfo").innerHTML), "clic su un punto 2D apre la scheda");
  ok(svg.querySelectorAll("circle.is-sel").length >= 1, "il punto selezionato è evidenziato");
  // ritorno al 3D
  d.querySelector('#stageTabs [data-stage="3d"]').dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  ok(w.PuntiMap.stage() === "3d" && !d.getElementById("stage3d").hidden, "ritorno alla Mappa 3D");
}

console.log("\n=== 5. Schede informative ===");
{
  const { w } = boot();
  const d = w.document, info = d.getElementById("puntiInfo");
  // 5a. scheda punto indicatore: blocco meridiani
  const p = w.PUNTI_INDICATORI.punti.find((x) => x.meridiano === "Stomaco") || w.PUNTI_INDICATORI.punti[0];
  w.PuntiMap.selectMerPoint; // noop
  const li = d.querySelector('#puntiList [data-id="' + p.id + '"]');
  li.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  ok(/Meridiani MTC/.test(info.innerHTML), "la scheda del punto indicatore contiene il blocco Meridiani MTC");
  ok(info.querySelectorAll(".merrow").length >= 1, "almeno una riga meridiano", info.querySelectorAll(".merrow").length);
  ok(/meridiano dell/.test(info.innerHTML), "indica il meridiano dell'organo");
  ok(/tracciato/.test(info.innerHTML), "indica su quale tracciato cade il punto");
  // 5b. scheda meridiano
  w.PuntiMap.selectMeridiano("vescica-biliare");
  ok(/Vescica Biliare/.test(info.innerHTML) && info.querySelectorAll(".merpt[data-mpt]").length >= 8,
     "scheda meridiano con elenco punti", info.querySelectorAll(".merpt[data-mpt]").length);
  ok(w.MeridianiMap.highlighted() === "vescica-biliare", "meridiano evidenziato");
  // clic su un punto dell'elenco
  const btn = info.querySelector(".merpt[data-mpt]");
  btn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  ok(/VB1|Tongziliao/.test(info.innerHTML), "clic sull'elenco apre la scheda del punto MTC");
  ok(/Elemento/.test(info.innerHTML) && /Massima energia/.test(info.innerHTML), "scheda punto con elemento e orario");
  // 5c. isola / mostra tutti
  const iso = info.querySelector('[data-mact="iso"]');
  iso.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  ok(w.MeridianiMap.list().filter((m) => w.MeridianiMap.isVisible(m.id)).length === 1, "«Mostra solo questo» isola il meridiano");
  const all = info.querySelector('[data-mact="all"]');
  all.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  ok(w.MeridianiMap.list().every((m) => w.MeridianiMap.isVisible(m.id)), "«Mostra tutti» ripristina");
  // 5d. link alla coordinata
  w.PuntiMap.selectMeridiano("stomaco");
  const link = info.querySelector("a.ebtn--link");
  ok(link && /#\/stomaco-gran-pettorale-clavicolare/.test(link.getAttribute("href")), "link alla coordinata del muscolo",
     link && link.getAttribute("href"));
}

console.log("\n=== 6. Click libero sul corpo (probe) ===");
{
  const { w } = boot();
  const info = w.document.getElementById("puntiInfo");
  // punto sull'addome, a lato dell'ombelico → dovrebbe cadere vicino a Stomaco/Rene/VC
  w.PuntiMap.probeAt({ x: 0.2, y: 1.20, z: 0.21 });
  ok(/Punto sul corpo/.test(info.innerHTML), "pannello «Punto sul corpo»");
  ok(/Sei sul meridiano|Meridiano più vicino/.test(info.innerHTML), "indica il meridiano su cui ci si trova");
  ok(/Punto MTC più vicino/.test(info.innerHTML), "mostra il punto MTC più vicino");
  ok(info.querySelectorAll(".merpt--near").length === 3, "elenco dei 3 meridiani più vicini",
     info.querySelectorAll(".merpt--near").length);
  const near = w.MeridianiMap.nearest({ x: 0.2, y: 1.20, z: 0.21 });
  ok(near.mer.id === "stomaco", "vicino all'ombelico +2cun → Stomaco (S25)", near.mer.id + " " + near.dist.toFixed(3));
  ok(near.punto && near.punto.sigla === "S25", "punto più vicino = S25 Tianshu", near.punto && near.punto.sigla);
  // mediana bassa → Vaso Concezione
  const vc = w.MeridianiMap.nearest({ x: 0, y: 1.02, z: 0.26 });
  ok(vc.mer.id === "vaso-concezione", "mediana anteriore → Vaso Concezione", vc.mer.id);
  // schiena mediana → Vaso Governatore
  const vg = w.MeridianiMap.nearest({ x: 0, y: 1.37, z: -0.28 });
  ok(vg.mer.id === "vaso-governatore", "mediana posteriore → Vaso Governatore", vg.mer.id);
  // dietro il malleolo esterno → Vescica (V60)
  const v60 = w.MeridianiMap.nearest({ x: -0.30, y: -1.19, z: -0.06 });
  ok(v60.mer.id === "vescica" && v60.latoNome === "destra soggetto", "malleolo esterno destro → Vescica, lato destro",
     v60.mer.id + "/" + v60.latoNome);
  // click su un altro punto azzera il probe
  const p0 = w.PUNTI_INDICATORI.punti[0];
  w.document.querySelector('#puntiList [data-id="' + p0.id + '"]').dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  ok(!/Punto sul corpo/.test(info.innerHTML), "selezionare un punto indicatore chiude il probe");
}

console.log("\n=== 7. Editor: modifica e persistenza dei tracciati ===");
{
  const store = {};
  { // sessione 1
    const { w } = boot({ store });
    const MM = w.MeridianiMap;
    const marker = MM.pointMeshes.find((m) => m.userData.merPunto.merId === "fegato" && m.userData.merPunto.sigla === "F14" && m.userData.merPunto.side === 1);
    ok(!!marker, "marker F14 trovato");
    const before = JSON.parse(JSON.stringify(MM.get("fegato").nodi[marker.userData.merPunto.idx]));
    MM.moveNode(marker.userData.merPunto, 0.31, 1.70, 0.30);
    const after = MM.get("fegato").nodi[marker.userData.merPunto.idx];
    ok(after.x === 0.31 && after.y === 1.7 && after.z === 0.3, "moveNode aggiorna il nodo", after);
    ok(before.x !== after.x, "posizione effettivamente cambiata");
    const ov = MM.exportOverrides();
    ok(Object.keys(ov).length === 1 && ov.fegato.nodi.length === MM.get("fegato").nodi.length,
       "exportOverrides contiene solo il fegato", Object.keys(ov));
    // persistenza: passa dall'export completo di PuntiMap
    const txt = w.PuntiMap.exportJSON();
    const obj = JSON.parse(txt);
    ok(obj.meridiani && obj.meridiani.fegato, "l'export JSON include le modifiche ai meridiani");
    // forza il salvataggio come farebbe un drag reale
    w.localStorage.setItem("kapp-punti-v2", txt);
  }
  { // sessione 2: ricaricamento
    const { w } = boot({ store });
    const n = w.MeridianiMap.get("fegato").nodi.find((x) => x.sigla === "F14");
    ok(n.x === 0.31 && n.y === 1.7 && n.z === 0.3, "al ricaricamento il tracciato modificato è ripristinato", n);
    // reset
    w.PuntiMap.resetPositions();
    const n2 = w.MeridianiMap.get("fegato").nodi.find((x) => x.sigla === "F14");
    ok(n2.x !== 0.31, "reset ripristina i tracciati di fabbrica", n2);
  }
}

console.log("\n=== 8. Non-regressione punti indicatori ===");
{
  const { w } = boot();
  const d = w.document;
  ok(w.PUNTI_INDICATORI.punti.length === 18, "18 punti d'allarme", w.PUNTI_INDICATORI.punti.length);
  ok(d.querySelectorAll("#puntiList .punti__li").length === 18 + 5, "lista = 18 punti + 5 riferimenti anatomici",
     d.querySelectorAll("#puntiList .punti__li").length);
  ok(!d.getElementById("puntiView").hidden, "sezione Punti visibile al caricamento diretto");
  ok(!d.getElementById("puntiInfo").hidden, "pannello info popolato");
  // editor punti classico
  w.PuntiMap.setEditing(true);
  const p = w.PuntiMap.addPoint();
  ok(w.PUNTI_INDICATORI.punti.length === 19, "addPoint funziona ancora");
  w.PuntiMap.removePoint(p.id);
  ok(w.PUNTI_INDICATORI.punti.length === 18, "removePoint funziona ancora");
  const obj = JSON.parse(w.PuntiMap.exportJSON());
  ok(obj.punti.length === 18 && obj.landmarks.length === 5, "export completo invariato",
     obj.punti.length + "/" + obj.landmarks.length);
  // import
  ok(w.PuntiMap.importJSON(JSON.stringify(obj)) === true, "importJSON continua a funzionare");
  ok(w.PuntiMap.importJSON("{ nope") === false, "importJSON rifiuta JSON invalido");
}

console.log("\n---------------------------------------------");
console.log(pass + " test superati, " + fail + " falliti");
process.exit(fail ? 1 : 0);
