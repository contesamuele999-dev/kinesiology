/* meridiani.js — modulo dati/geometria dei Meridiani MTC per la mappa 3D.
   NON tocca il DOM: espone solo geometria + calcoli. Il rendering e l'interfaccia
   stanno in punti.js. Sorgente dati: assets/js/meridiani_data.js (window.MERIDIANI),
   che contiene TUTTI i 361 punti classici.

   Ogni meridiano ha:
     nodi[]  tracciato principale (i nodi con "sigla" sono punti veri)
     ramo[]  eventuale ramo secondario (linea esterna della Vescica, ramo facciale
             dello Stomaco): stessa struttura di nodi
   I meridiani bilaterali sono definiti sul lato sinistro (x>0) e specchiati qui.

   API pubblica (window.MeridianiMap) — vedi in fondo al file. */
(function () {
  "use strict";

  var SRC = window.MERIDIANI || { meridiani: [], alias: {} };
  var MERS = SRC.meridiani || [];
  var ALIAS = SRC.alias || {};

  // Il manichino va da y ≈ -1.31 (pianta del piede) a y ≈ 2.93 (vertice):
  // 4.24 unità ≈ 170 cm di statura → 1 unità ≈ 40 cm.
  var UNIT_CM = 40;

  var THREE = null;
  var group = null;                 // gruppo radice
  var merGroups = {};               // id -> { root, tubes, points, labels, … }
  var pointMeshes = [];             // tutte le mesh-punto cliccabili
  var visible = {};                 // id -> bool
  var pointsMode = "chiave";        // "chiave" | "tutti" | "nessuno"
  var highlighted = null;
  var labelsOn = true;              // etichette sul meridiano evidenziato

  function branches(m) { return m.ramo && m.ramo.length ? [m.nodi, m.ramo] : [m.nodi]; }
  function arrOf(m, ramo) { return ramo ? m.ramo : m.nodi; }

  var FACTORY = JSON.parse(JSON.stringify(MERS.map(function (m) {
    return branches(m).map(function (arr) {
      return arr.map(function (n) { return { x: n.x, y: n.y, z: n.z }; });
    });
  })));

  MERS.forEach(function (m) { visible[m.id] = true; });

  /* ------------------------------------------------------------------ dati */
  function list() { return MERS; }
  function get(id) { for (var i = 0; i < MERS.length; i++) if (MERS[i].id === id) return MERS[i]; return null; }

  var NAME_IDX = null;
  function norm(s) {
    return String(s == null ? "" : s).toLowerCase()
      .replace(/[()\.]/g, " ").replace(/\s+/g, " ").trim();
  }
  function buildNameIdx() {
    NAME_IDX = {};
    MERS.forEach(function (m) {
      NAME_IDX[norm(m.id)] = m.id;
      NAME_IDX[norm(m.nome)] = m.id;
      NAME_IDX[norm(m.sigla)] = m.id;
      NAME_IDX[norm(m.siglaInt)] = m.id;
    });
    Object.keys(ALIAS).forEach(function (id) {
      (ALIAS[id] || []).forEach(function (a) { NAME_IDX[norm(a)] = id; });
    });
  }
  function byName(nome) {
    if (!NAME_IDX) buildNameIdx();
    var k = norm(nome);
    if (!k) return null;
    if (NAME_IDX[k]) return get(NAME_IDX[k]);
    var keys = Object.keys(NAME_IDX);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].length > 2 && (k.indexOf(keys[i]) === 0 || keys[i].indexOf(k) === 0)) return get(NAME_IDX[keys[i]]);
    }
    return null;
  }
  // trova un punto dalla sua sigla ("VB34", "vb 34", "gb34")
  function findPunto(sigla) {
    var k = norm(sigla).replace(/\s+/g, "");
    for (var i = 0; i < MERS.length; i++) {
      var m = MERS[i], br = branches(m);
      for (var b = 0; b < br.length; b++) {
        for (var j = 0; j < br[b].length; j++) {
          var n = br[b][j];
          if (!n.sigla) continue;
          if (norm(n.sigla).replace(/\s+/g, "") === k) return { mer: m, nodo: n, idx: j, ramo: b === 1 };
        }
      }
    }
    return null;
  }
  function sidesOf(m) { return m.bilaterale ? [1, -1] : [1]; }
  function latoLabel(side) { return side > 0 ? "sinistra soggetto" : "destra soggetto"; }
  function puntiDi(id, soloChiave) {
    var m = get(id); if (!m) return [];
    var out = [];
    branches(m).forEach(function (arr, b) {
      arr.forEach(function (n, i) {
        if (!n.sigla) return;
        if (soloChiave && !n.chiave) return;
        out.push({ nodo: n, idx: i, ramo: b === 1 });
      });
    });
    return out;
  }

  /* --------------------------------------------------------------- geometria */
  function pathOf(arr, side) {
    return arr.map(function (n) { return { x: n.x * side, y: n.y, z: n.z }; });
  }
  function makeTube(arr, side, mat) {
    var pts = pathOf(arr, side).map(function (p) { return new THREE.Vector3(p.x, p.y, p.z); });
    var curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.2);
    var geo = new THREE.TubeGeometry(curve, Math.max(24, arr.length * 8), 0.016, 8, false);
    var mesh = new THREE.Mesh(geo, mat);
    mesh.userData.tratto = true;
    return mesh;
  }
  function makePoint(m, node, idx, side, ramo, matKey, matSec) {
    var chiave = !!node.chiave;
    var geo = new THREE.SphereGeometry(chiave ? 0.034 : 0.020, chiave ? 14 : 10, chiave ? 12 : 8);
    var mesh = new THREE.Mesh(geo, chiave ? matKey : matSec);
    mesh.position.set(node.x * side, node.y, node.z);
    mesh.userData.merPunto = {
      merId: m.id, idx: idx, side: side, ramo: !!ramo,
      sigla: node.sigla, nome: node.nome || "",
      ruolo: node.ruolo || "", note: node.note || "", chiave: chiave
    };
    return mesh;
  }

  /* etichette (sprite con la sigla) mostrate sul meridiano evidenziato */
  function labelSprite(text, colore) {
    if (!THREE.CanvasTexture || !THREE.Sprite || typeof document === "undefined") return null;
    var cv = document.createElement("canvas");
    cv.width = 128; cv.height = 48;
    var ctx = cv.getContext("2d");
    if (ctx) {
      ctx.font = "bold 30px system-ui, Arial, sans-serif";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.lineWidth = 7; ctx.strokeStyle = "rgba(0,0,0,0.65)";
      ctx.strokeText(text, 64, 25);
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, 64, 25);
    }
    var sp = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(cv), transparent: true, depthTest: false
    }));
    sp.scale.set(0.20, 0.075, 1);
    sp.userData.merLabel = true;
    return sp;
  }

  function buildMeridiano(m) {
    var root = new THREE.Group();
    root.name = "mer-" + m.id;
    var col = new THREE.Color(m.colore || "#888888");
    var tubeMat = new THREE.MeshStandardMaterial({
      color: col, roughness: 0.45, metalness: 0.05,
      emissive: col.clone().multiplyScalar(0.25), transparent: true, opacity: 0.95
    });
    var ptMat = new THREE.MeshStandardMaterial({
      color: col.clone().offsetHSL(0, 0.05, 0.15), roughness: 0.3, metalness: 0.1,
      emissive: col.clone().multiplyScalar(0.35)
    });
    var secMat = new THREE.MeshStandardMaterial({
      color: col, roughness: 0.5, metalness: 0.05,
      emissive: col.clone().multiplyScalar(0.2)
    });
    var rec = { root: root, tubeMat: tubeMat, ptMat: ptMat, secMat: secMat,
                tubes: [], points: [], labels: [], baseColor: col };
    sidesOf(m).forEach(function (side) {
      branches(m).forEach(function (arr, b) {
        var t = makeTube(arr, side, tubeMat);
        t.userData.meridiano = m.id; t.userData.lato = side; t.userData.ramo = b === 1;
        root.add(t); rec.tubes.push(t);
        arr.forEach(function (n, i) {
          if (!n.sigla) return;
          var p = makePoint(m, n, i, side, b === 1, ptMat, secMat);
          root.add(p); rec.points.push(p); pointMeshes.push(p);
        });
      });
    });
    merGroups[m.id] = rec;
    root.visible = visible[m.id] !== false;
    return root;
  }

  function init(three) {
    THREE = three || window.THREE;
    if (!THREE || group) return group;
    group = new THREE.Group();
    group.name = "meridiani";
    pointMeshes = [];
    MERS.forEach(function (m) { group.add(buildMeridiano(m)); });
    setPointsMode(pointsMode);
    return group;
  }

  // ricostruisce i tubi di un meridiano dopo che un nodo è stato spostato
  function rebuild(id) {
    var m = get(id), rec = merGroups[id];
    if (!m || !rec || !THREE) return;
    rec.tubes.forEach(function (t) {
      if (t.geometry && t.geometry.dispose) t.geometry.dispose();
      if (t.parent) t.parent.remove(t);
    });
    rec.tubes = [];
    sidesOf(m).forEach(function (side) {
      branches(m).forEach(function (arr, b) {
        var t = makeTube(arr, side, rec.tubeMat);
        t.userData.meridiano = m.id; t.userData.lato = side; t.userData.ramo = b === 1;
        rec.root.add(t); rec.tubes.push(t);
      });
    });
    rec.points.forEach(function (p) {
      var d = p.userData.merPunto, n = arrOf(m, d.ramo)[d.idx];
      if (n) p.position.set(n.x * d.side, n.y, n.z);
    });
    if (highlighted === id) { clearLabels(id); makeLabels(id); }
  }

  function markerFor(ref) {
    for (var i = 0; i < pointMeshes.length; i++) {
      var d = pointMeshes[i].userData.merPunto;
      if (d.merId === ref.merId && d.idx === ref.idx && d.side === (ref.side || 1) && !!d.ramo === !!ref.ramo)
        return pointMeshes[i];
    }
    return null;
  }

  /* ---------------------------------------------------------- visibilità */
  function pointVisible(p) {
    if (pointsMode === "nessuno") return false;
    if (pointsMode === "tutti") return true;
    return !!p.userData.merPunto.chiave;
  }
  function applyPointVisibility() {
    pointMeshes.forEach(function (p) { p.visible = pointVisible(p); });
  }
  function setVisible(id, on) {
    visible[id] = !!on;
    if (merGroups[id]) merGroups[id].root.visible = !!on;
  }
  function isVisible(id) { return visible[id] !== false; }
  function setAllVisible(on) { MERS.forEach(function (m) { setVisible(m.id, on); }); }
  function setPointsMode(mode) {
    pointsMode = (mode === "tutti" || mode === "nessuno") ? mode : "chiave";
    applyPointVisibility();
    return pointsMode;
  }
  function getPointsMode() { return pointsMode; }
  // compatibilità con la versione precedente
  function setPointsVisible(on) { return setPointsMode(on ? "chiave" : "nessuno"); }
  function pointsVisible() { return pointsMode !== "nessuno"; }

  function makeLabels(id) {
    var rec = merGroups[id]; if (!rec || !labelsOn) return;
    if (rec.labels.length) { rec.labels.forEach(function (l) { l.visible = true; }); return; }
    rec.points.forEach(function (p) {
      if (p.userData.merPunto.side !== 1) return;      // etichette su un solo lato
      if (pointsMode === "chiave" && !p.userData.merPunto.chiave) return;
      var sp = labelSprite(p.userData.merPunto.sigla, rec.baseColor);
      if (!sp) return;
      sp.position.set(0, 0.075, 0);
      p.add(sp); rec.labels.push(sp);
    });
  }
  function clearLabels(id) {
    var rec = merGroups[id]; if (!rec) return;
    rec.labels.forEach(function (l) { if (l.parent) l.parent.remove(l); });
    rec.labels = [];
  }
  function setLabels(on) {
    labelsOn = !!on;
    Object.keys(merGroups).forEach(function (k) { clearLabels(k); });
    if (labelsOn && highlighted) makeLabels(highlighted);
    return labelsOn;
  }
  function labelsEnabled() { return labelsOn; }

  function highlight(id) {
    if (highlighted && highlighted !== id) clearLabels(highlighted);
    highlighted = id || null;
    Object.keys(merGroups).forEach(function (k) {
      var rec = merGroups[k];
      var dim = highlighted && k !== highlighted;
      rec.tubeMat.opacity = dim ? 0.20 : 0.95;
      rec.tubeMat.transparent = true;
      rec.tubes.forEach(function (t) { t.scale.setScalar(highlighted === k ? 1.4 : 1); });
    });
    if (highlighted) makeLabels(highlighted);
  }
  function highlighted_() { return highlighted; }
  function retheme() { return true; }

  /* ------------------------------------------------- distanze / prossimità */
  function segDist(px, py, pz, ax, ay, az, bx, by, bz) {
    var vx = bx - ax, vy = by - ay, vz = bz - az;
    var wx = px - ax, wy = py - ay, wz = pz - az;
    var vv = vx * vx + vy * vy + vz * vz;
    var t = vv > 0 ? (wx * vx + wy * vy + wz * vz) / vv : 0;
    t = t < 0 ? 0 : (t > 1 ? 1 : t);
    var dx = wx - vx * t, dy = wy - vy * t, dz = wz - vz * t;
    return { d: Math.sqrt(dx * dx + dy * dy + dz * dz), t: t };
  }
  function dist3(a, b) {
    var dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  function nearestPoint(pos, opts) {
    opts = opts || {};
    var best = null;
    MERS.forEach(function (m) {
      if (opts.merId && m.id !== opts.merId) return;
      if (opts.soloVisibili && !isVisible(m.id)) return;
      sidesOf(m).forEach(function (side) {
        branches(m).forEach(function (arr, b) {
          arr.forEach(function (n, i) {
            if (!n.sigla) return;
            if (opts.soloChiave && !n.chiave) return;
            var d = dist3(pos, { x: n.x * side, y: n.y, z: n.z });
            if (!best || d < best.dist) {
              best = { mer: m, nodo: n, idx: i, ramo: b === 1, lato: side, dist: d,
                       distCm: d * UNIT_CM, latoNome: m.bilaterale ? latoLabel(side) : "" };
            }
          });
        });
      });
    });
    return best;
  }

  function nearest(pos, opts) {
    opts = opts || {};
    var best = null, all = [];
    MERS.forEach(function (m) {
      if (opts.soloVisibili && !isVisible(m.id)) return;
      var bm = null;
      sidesOf(m).forEach(function (side) {
        branches(m).forEach(function (arr) {
          var path = pathOf(arr, side);
          for (var i = 0; i < path.length - 1; i++) {
            var a = path[i], b = path[i + 1];
            var r = segDist(pos.x, pos.y, pos.z, a.x, a.y, a.z, b.x, b.y, b.z);
            if (!bm || r.d < bm.dist) bm = { mer: m, lato: side, dist: r.d };
          }
        });
      });
      if (!bm) return;
      all.push(bm);
      if (!best || bm.dist < best.dist) best = bm;
    });
    if (!best) return null;
    all.sort(function (a, b) { return a.dist - b.dist; });
    var pt = nearestPoint(pos, { merId: best.mer.id });
    return {
      mer: best.mer, lato: best.lato, latoNome: best.mer.bilaterale ? latoLabel(best.lato) : "",
      dist: best.dist, distCm: best.dist * UNIT_CM,
      punto: pt ? pt.nodo : null, puntoRef: pt ? { merId: best.mer.id, idx: pt.idx, side: pt.lato, ramo: pt.ramo } : null,
      puntoDist: pt ? pt.dist : null, puntoDistCm: pt ? pt.distCm : null, puntoLato: pt ? pt.lato : null,
      vicini: all.slice(0, 3).map(function (r) {
        return { mer: r.mer, lato: r.lato, dist: r.dist, distCm: r.dist * UNIT_CM,
                 latoNome: r.mer.bilaterale ? latoLabel(r.lato) : "" };
      })
    };
  }

  /* ------------------------------------------------------------- editor */
  var dirty = {};

  function moveNode(ref, x, y, z) {
    var m = get(ref.merId); if (!m) return false;
    var arr = arrOf(m, ref.ramo); if (!arr) return false;
    var n = arr[ref.idx]; if (!n) return false;
    var s = ref.side || 1;
    n.x = Math.round((x / s) * 1000) / 1000;
    n.y = Math.round(y * 1000) / 1000;
    n.z = Math.round(z * 1000) / 1000;
    dirty[m.id] = true;
    rebuild(m.id);
    return true;
  }

  function snapshot(m) {
    var o = { nodi: m.nodi.map(function (n) { return { x: n.x, y: n.y, z: n.z }; }) };
    if (m.ramo) o.ramo = m.ramo.map(function (n) { return { x: n.x, y: n.y, z: n.z }; });
    return o;
  }
  function exportOverrides() {
    var out = {};
    Object.keys(dirty).forEach(function (id) {
      var m = get(id); if (!m) return;
      out[id] = snapshot(m);
    });
    return out;
  }
  function applyArr(arr, src) {
    if (!Array.isArray(src)) return;
    src.forEach(function (p, i) {
      if (!p || !arr[i]) return;
      arr[i].x = +p.x; arr[i].y = +p.y; arr[i].z = +p.z;
    });
  }
  function applyOverrides(obj) {
    if (!obj) return false;
    var any = false;
    Object.keys(obj).forEach(function (id) {
      var m = get(id), v = obj[id];
      if (!m || !v) return;
      if (Array.isArray(v)) applyArr(m.nodi, v);          // formato precedente
      else { applyArr(m.nodi, v.nodi); if (m.ramo) applyArr(m.ramo, v.ramo); }
      dirty[id] = true; any = true;
      if (group) rebuild(id);
    });
    return any;
  }
  function resetOverrides() {
    MERS.forEach(function (m, mi) {
      var f = FACTORY[mi]; if (!f) return;
      branches(m).forEach(function (arr, b) { applyArr(arr, f[b]); });
      if (group) rebuild(m.id);
    });
    dirty = {};
  }

  window.MeridianiMap = {
    UNIT_CM: UNIT_CM,
    init: init,
    get group() { return group; },
    get pointMeshes() { return pointMeshes; },
    list: list,
    get: get,
    byName: byName,
    findPunto: findPunto,
    puntiDi: puntiDi,
    nodiDi: function (id, ramo) { var m = get(id); return m ? arrOf(m, ramo) : []; },
    haRamo: function (id) { var m = get(id); return !!(m && m.ramo && m.ramo.length); },
    sidesOf: sidesOf,
    latoLabel: latoLabel,
    markerFor: markerFor,
    setVisible: setVisible,
    isVisible: isVisible,
    setAllVisible: setAllVisible,
    setPointsMode: setPointsMode,
    pointsMode: getPointsMode,
    setPointsVisible: setPointsVisible,
    pointsVisible: pointsVisible,
    setLabels: setLabels,
    labelsEnabled: labelsEnabled,
    highlight: highlight,
    highlighted: highlighted_,
    retheme: retheme,
    nearest: nearest,
    nearestPoint: nearestPoint,
    moveNode: moveNode,
    rebuild: rebuild,
    exportOverrides: exportOverrides,
    applyOverrides: applyOverrides,
    resetOverrides: resetOverrides
  };
})();
