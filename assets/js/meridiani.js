/* meridiani.js — modulo dati/geometria dei Meridiani MTC per la mappa 3D.
   NON tocca il DOM: espone solo geometria + calcoli. Il rendering e l'interfaccia
   stanno in punti.js. Sorgente dati: assets/js/meridiani_data.js (window.MERIDIANI).

   API pubblica (window.MeridianiMap):
     init(THREE)              crea il gruppo 3D (una volta)
     group                    THREE.Group da aggiungere alla scena
     pointMeshes              array di mesh cliccabili (punti dei meridiani)
     list()                   elenco meridiani (metadati)
     get(id)                  un meridiano
     byName(nome)             risolve "Vescica Biliare" / "VB" / "GB" -> meridiano
     setVisible(id,on) / setAllVisible(on) / isVisible(id)
     setPointsVisible(on)
     highlight(id)            evidenzia un meridiano (null = nessuno)
     nearest(pos)             { mer, lato, dist, distCm, punto, puntoDist, puntoDistCm }
     nearestPoint(pos)        punto MTC più vicino in assoluto
     puntiDi(id)              punti nominati di un meridiano
     moveNode(ref,x,y,z)      sposta un nodo (editor) e ricostruisce il tracciato
     exportOverrides()        { id: [ {x,y,z}, … ] } solo dei meridiani modificati
     applyOverrides(obj)      riapplica le modifiche salvate
     resetOverrides()
     retheme(dark)
     UNIT_CM                  fattore di conversione unità -> centimetri
*/
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
  var merGroups = {};               // id -> { root, tubes:[], points:[], sides:{} }
  var pointMeshes = [];             // mesh cliccabili dei punti
  var visible = {};                 // id -> bool
  var pointsOn = true;
  var highlighted = null;
  var FACTORY = JSON.parse(JSON.stringify(MERS.map(function (m) {
    return m.nodi.map(function (n) { return { x: n.x, y: n.y, z: n.z }; });
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
    // match parziale (es. "Milza/Pancreas" -> "milza")
    var keys = Object.keys(NAME_IDX);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].length > 2 && (k.indexOf(keys[i]) === 0 || keys[i].indexOf(k) === 0)) return get(NAME_IDX[keys[i]]);
    }
    return null;
  }
  function sidesOf(m) { return m.bilaterale ? [1, -1] : [1]; }
  function latoLabel(side) { return side > 0 ? "sinistra soggetto" : "destra soggetto"; }
  function puntiDi(id) {
    var m = get(id); if (!m) return [];
    return m.nodi.filter(function (n) { return !!n.sigla; });
  }

  /* --------------------------------------------------------------- geometria */
  function pathOf(m, side) {
    return m.nodi.map(function (n) { return { x: n.x * side, y: n.y, z: n.z }; });
  }

  function curveFor(m, side) {
    var pts = pathOf(m, side).map(function (p) { return new THREE.Vector3(p.x, p.y, p.z); });
    return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.25);
  }

  function makeTube(m, side, mat) {
    var curve = curveFor(m, side);
    var seg = Math.max(24, m.nodi.length * 10);
    var geo = new THREE.TubeGeometry(curve, seg, 0.018, 8, false);
    var mesh = new THREE.Mesh(geo, mat);
    mesh.userData.meridiano = m.id;
    mesh.userData.lato = side;
    mesh.userData.tratto = true;
    return mesh;
  }

  function makePoint(m, node, idx, side, mat) {
    var geo = new THREE.SphereGeometry(0.036, 16, 12);
    var mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(node.x * side, node.y, node.z);
    mesh.userData.merPunto = {
      merId: m.id, idx: idx, side: side,
      sigla: node.sigla, nome: node.nome || "",
      ruolo: node.ruolo || "", note: node.note || ""
    };
    return mesh;
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
      color: col.clone().offsetHSL(0, 0.05, 0.12), roughness: 0.3, metalness: 0.1,
      emissive: col.clone().multiplyScalar(0.35)
    });
    var rec = { root: root, tubeMat: tubeMat, ptMat: ptMat, tubes: [], points: [], baseColor: col };
    sidesOf(m).forEach(function (side) {
      var t = makeTube(m, side, tubeMat);
      root.add(t); rec.tubes.push(t);
      m.nodi.forEach(function (n, i) {
        if (!n.sigla) return;
        var p = makePoint(m, n, i, side, ptMat);
        root.add(p); rec.points.push(p); pointMeshes.push(p);
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
    setPointsVisible(pointsOn);
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
      var t = makeTube(m, side, rec.tubeMat);
      rec.root.add(t); rec.tubes.push(t);
    });
    // riallinea i marker dei punti
    rec.points.forEach(function (p) {
      var d = p.userData.merPunto, n = m.nodi[d.idx];
      if (n) p.position.set(n.x * d.side, n.y, n.z);
    });
  }

  /* ---------------------------------------------------------- visibilità */
  function setVisible(id, on) {
    visible[id] = !!on;
    if (merGroups[id]) merGroups[id].root.visible = !!on;
  }
  function isVisible(id) { return visible[id] !== false; }
  function setAllVisible(on) { MERS.forEach(function (m) { setVisible(m.id, on); }); }
  function setPointsVisible(on) {
    pointsOn = !!on;
    Object.keys(merGroups).forEach(function (id) {
      merGroups[id].points.forEach(function (p) { p.visible = pointsOn; });
    });
  }
  function pointsVisible() { return pointsOn; }

  function highlight(id) {
    highlighted = id || null;
    Object.keys(merGroups).forEach(function (k) {
      var rec = merGroups[k];
      var dim = highlighted && k !== highlighted;
      rec.tubeMat.opacity = dim ? 0.22 : 0.95;
      rec.tubeMat.transparent = true;
      rec.tubes.forEach(function (t) { t.scale.setScalar(highlighted === k ? 1.35 : 1); });
    });
  }
  function highlighted_() { return highlighted; }

  function retheme() {
    // i colori dei meridiani sono fissi (codifica MTC): nulla da ricalcolare,
    // ma manteniamo l'API per simmetria con il resto della mappa.
    return true;
  }

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

  // punto MTC più vicino (opzionalmente limitato a un meridiano / ai soli visibili)
  function nearestPoint(pos, opts) {
    opts = opts || {};
    var best = null;
    MERS.forEach(function (m) {
      if (opts.merId && m.id !== opts.merId) return;
      if (opts.soloVisibili && !isVisible(m.id)) return;
      sidesOf(m).forEach(function (side) {
        m.nodi.forEach(function (n, i) {
          if (!n.sigla) return;
          var d = dist3(pos, { x: n.x * side, y: n.y, z: n.z });
          if (!best || d < best.dist) {
            best = { mer: m, nodo: n, idx: i, lato: side, dist: d, distCm: d * UNIT_CM,
                     latoNome: m.bilaterale ? latoLabel(side) : "" };
          }
        });
      });
    });
    return best;
  }

  // meridiano più vicino a una posizione qualsiasi (distanza dal TRACCIATO)
  function nearest(pos, opts) {
    opts = opts || {};
    var best = null, all = [];
    MERS.forEach(function (m) {
      if (opts.soloVisibili && !isVisible(m.id)) return;
      var bm = null;
      sidesOf(m).forEach(function (side) {
        var path = pathOf(m, side);
        for (var i = 0; i < path.length - 1; i++) {
          var a = path[i], b = path[i + 1];
          var r = segDist(pos.x, pos.y, pos.z, a.x, a.y, a.z, b.x, b.y, b.z);
          if (!bm || r.d < bm.dist) bm = { mer: m, lato: side, dist: r.d, seg: i, t: r.t };
        }
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
      punto: pt ? pt.nodo : null, puntoDist: pt ? pt.dist : null,
      puntoDistCm: pt ? pt.distCm : null, puntoLato: pt ? pt.lato : null,
      vicini: all.slice(0, 3).map(function (r) {
        return { mer: r.mer, lato: r.lato, dist: r.dist, distCm: r.dist * UNIT_CM,
                 latoNome: r.mer.bilaterale ? latoLabel(r.lato) : "" };
      })
    };
  }

  /* ------------------------------------------------------------- editor */
  var dirty = {};   // id -> true se modificato

  // ref = userData.merPunto del marker trascinato
  function moveNode(ref, x, y, z) {
    var m = get(ref.merId); if (!m) return false;
    var n = m.nodi[ref.idx]; if (!n) return false;
    var s = ref.side || 1;
    n.x = Math.round((x / s) * 1000) / 1000;
    n.y = Math.round(y * 1000) / 1000;
    n.z = Math.round(z * 1000) / 1000;
    dirty[m.id] = true;
    rebuild(m.id);
    return true;
  }

  function exportOverrides() {
    var out = {};
    Object.keys(dirty).forEach(function (id) {
      var m = get(id); if (!m) return;
      out[id] = m.nodi.map(function (n) { return { x: n.x, y: n.y, z: n.z }; });
    });
    return out;
  }

  function applyOverrides(obj) {
    if (!obj) return false;
    var any = false;
    Object.keys(obj).forEach(function (id) {
      var m = get(id), arr = obj[id];
      if (!m || !Array.isArray(arr)) return;
      arr.forEach(function (p, i) {
        if (!p || !m.nodi[i]) return;
        m.nodi[i].x = +p.x; m.nodi[i].y = +p.y; m.nodi[i].z = +p.z;
      });
      dirty[id] = true; any = true;
      if (group) rebuild(id);
    });
    return any;
  }

  function resetOverrides() {
    MERS.forEach(function (m, mi) {
      var f = FACTORY[mi]; if (!f) return;
      m.nodi.forEach(function (n, i) {
        if (!f[i]) return;
        n.x = f[i].x; n.y = f[i].y; n.z = f[i].z;
      });
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
    puntiDi: puntiDi,
    sidesOf: sidesOf,
    latoLabel: latoLabel,
    setVisible: setVisible,
    isVisible: isVisible,
    setAllVisible: setAllVisible,
    setPointsVisible: setPointsVisible,
    pointsVisible: pointsVisible,
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
