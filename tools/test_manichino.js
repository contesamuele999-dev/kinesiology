/* Verifica che il modulo meridiani funzioni con il VERO Three.js r160 vendorizzato
   (senza renderer WebGL: solo costruzione di curve/geometrie e calcoli). */
const fs = require("fs"), path = require("path");
const { JSDOM } = require("jsdom");
const ROOT = "/sessions/nice-gifted-carson/mnt/Kinesiology App";
const rd = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
let pass = 0, fail = 0;
const ok = (c, m, e) => { c ? (pass++, console.log("  ✓ " + m)) : (fail++, console.log("  ✗ " + m + (e !== undefined ? " → " + JSON.stringify(e) : ""))); };

const dom = new JSDOM("<!doctype html><html><body></body></html>", { runScripts: "outside-only", pretendToBeVisual: true });
const w = dom.window;
global.window = w; global.document = w.document;
w.eval(rd("assets/vendor/three.min.js"));
ok(!!w.THREE && !!w.THREE.REVISION, "Three.js reale caricato (r" + (w.THREE && w.THREE.REVISION) + ")");
w.eval(rd("assets/js/corpo_data.js"));
w.eval(rd("assets/js/manichino.js"));
w.eval(rd("assets/js/meridiani_data.js"));
w.eval(rd("assets/js/meridiani.js"));
const MM = w.MeridianiMap;
const g = MM.init(w.THREE);
ok(!!g && g.children.length === 14, "gruppo costruito con Three reale", g && g.children.length);
let tubi = 0, punti = 0, vertici = 0;
g.children.forEach((mg) => mg.children.forEach((c) => {
  if (c.userData.tratto) { tubi++; vertici += c.geometry.attributes.position.count; }
  else if (c.userData.merPunto) punti++;
}));
ok(tubi === 30, "30 TubeGeometry reali (compresi i rami)", tubi);
ok(punti === 670, "670 marker punto (361 punti, bilaterali x2)", punti);
ok(vertici > 10000, "geometrie dei tubi popolate", vertici);
// bounding box: tutto dentro il volume del manichino
const box = new w.THREE.Box3().setFromObject(g);
ok(box.min.y > -1.45 && box.max.y < 3.05, "estensione verticale plausibile", [box.min.y.toFixed(2), box.max.y.toFixed(2)]);
ok(box.min.x > -0.95 && box.max.x < 0.95, "estensione laterale plausibile", [box.min.x.toFixed(2), box.max.x.toFixed(2)]);
ok(Math.abs(box.min.z) < 0.75 && Math.abs(box.max.z) < 0.75, "profondità plausibile", [box.min.z.toFixed(2), box.max.z.toFixed(2)]);
// rebuild dopo una modifica
MM.moveNode({ merId: "cuore", idx: 0, side: 1 }, 0.5, 1.9, 0.1);
const dopo = g.children.find((x) => x.name === "mer-cuore").children.filter((c) => c.userData.tratto).length;
ok(dopo === 2, "rebuild ricrea i 2 tratti del Cuore", dopo);
ok(MM.get("cuore").nodi[0].x === 0.5, "nodo aggiornato");
// ---- manichino anatomico costruito con Three reale ----
const body = w.Manichino.build(w.THREE, {
  col: { body: 0xcdd8e0, bodyEmis: 0x000000, landmark: 0xaab8c6, landmarkHi: 0x8aa0b4, brief: 0x3f6ea8 },
  LAND: { pube: 0.80, cresta: 0.96, ombelico: 1.28, arcata: 1.55, capezzoli: 1.82, capX: 0.24, giugulo: 2.12 },
  torsoR: (y) => 0.4,
  surfaceZ: (x, y, front) => (front ? 0.32 : -0.32)
});
let meshes = 0, verts = 0, senzaFlag = 0;
body.traverse((o) => {
  if (!o.isMesh) return;
  meshes++;
  if (!o.userData.bodyPart) senzaFlag++;
  const pa = o.geometry.attributes && o.geometry.attributes.position;
  if (pa) verts += pa.count;
});
ok(meshes > 100, "manichino: " + meshes + " mesh", meshes);
ok(senzaFlag === 0, "tutte le mesh hanno userData.bodyPart", senzaFlag);
ok(verts > 40000, "geometria del corpo densa (" + verts + " vertici)", verts);
const lms = []; body.traverse((o) => { if (o.userData.landmark) lms.push(o); });
ok(lms.length > 60, "riferimenti anatomici presenti", lms.length);
const briefs = []; body.traverse((o) => { if (o.userData.brief) briefs.push(o); });
ok(briefs.length === 2, "slip presente", briefs.length);
const bb = new w.THREE.Box3().setFromObject(body);
ok(bb.min.y > -1.45 && bb.max.y < 3.05, "altezza del manichino", [bb.min.y.toFixed(2), bb.max.y.toFixed(2)]);
ok(bb.max.x < 0.95 && bb.min.x > -0.95, "larghezza del manichino", [bb.min.x.toFixed(2), bb.max.x.toFixed(2)]);
let nan = 0;
body.traverse((o) => {
  if (!o.isMesh || !o.geometry.attributes || !o.geometry.attributes.position) return;
  const a = o.geometry.attributes.position.array;
  for (let i = 0; i < a.length; i++) if (!isFinite(a[i])) { nan++; break; }
});
ok(nan === 0, "nessun vertice NaN nelle superfici lofted", nan);

console.log("\n" + pass + " test superati, " + fail + " falliti");
process.exit(fail ? 1 : 0);
