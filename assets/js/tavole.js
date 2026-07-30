/* tavole.js — Vista 2D: tavole anatomiche vettoriali con i punti sovrapposti.
   Le sagome vengono da window.CORPO.tavole, generate dalle STESSE quote del
   manichino 3D: un punto disegnato qui è esattamente il punto del modello.
   Si può caricare una propria immagine (foto o tavola di agopuntura) come
   sfondo e allinearla trascinandola: resta salvata sul dispositivo.

   API: window.Tavole.{ init, activate, deactivate, setPlate, refresh, mark } */
(function () {
  "use strict";

  var mount = document.getElementById("stage2d");
  if (!mount) return;

  var svg = null, tabsEl = null, inited = false, attivo = false;
  var plate = null, view = null;          // viewBox corrente {x,y,w,h}
  var imgMode = false, dragging = false, lastX = 0, lastY = 0, moved = false;
  var IMG = {};                            // per tavola: {src,x,y,w,h,op}
  var SVGNS = "http://www.w3.org/2000/svg";
  var STORE = "kapp-tavole-v1";

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* ------------------------------------------------------------- tavole */
  var PLATES = [
    { id: "fronte",  label: "Fronte",   tav: "fronte", proj: "xy", mir: 1,
      box: [-0.95, -3.00, 1.90, 4.45], vis: function (p) { return p.z >= -0.02; } },
    { id: "retro",   label: "Retro",    tav: "retro",  proj: "xy", mir: -1,
      box: [-0.95, -3.00, 1.90, 4.45], vis: function (p) { return p.z <= 0.02; } },
    { id: "lato-sx", label: "Lato sx",  tav: "lato",   proj: "zy", mir: 1,
      box: [-0.75, -3.00, 1.50, 4.45], vis: function (p) { return p.x >= -0.02; } },
    { id: "lato-dx", label: "Lato dx",  tav: "lato",   proj: "zy", mir: -1,
      box: [-0.75, -3.00, 1.50, 4.45], vis: function (p) { return p.x <= 0.02; } },
    { id: "testa",   label: "Testa",    tav: "fronte", proj: "xy", mir: 1,
      box: [-0.42, -2.98, 0.84, 0.92], vis: function (p) { return p.z >= -0.02 && p.y > 2.05; } },
    { id: "testa-r", label: "Testa retro", tav: "retro", proj: "xy", mir: -1,
      box: [-0.42, -2.98, 0.84, 0.92], vis: function (p) { return p.z <= 0.02 && p.y > 2.05; } },
    { id: "mano",    label: "Mano",     tav: "fronte", proj: "xy", mir: 1,
      box: [0.36, -0.82, 0.42, 0.62], vis: function (p) { return p.x > 0.30 && p.y < 0.90; } },
    { id: "piede-su", label: "Piede sopra", tav: "piede", proj: "xz", mir: 1,
      box: [0.06, -0.50, 0.32, 0.66],
      vis: function (p) { return p.y < -1.05 && p.x > 0; },
      soft: function (p) { return p.y <= -1.288; } },            // la pianta, attenuata
    { id: "piede-giu", label: "Piede sotto", tav: "piede-pianta", proj: "xz", mir: -1,
      box: [-0.38, -0.50, 0.32, 0.66],
      vis: function (p) { return p.y < -1.05 && p.x > 0; },
      soft: function (p) { return p.y > -1.252; } },             // il dorso, attenuato
  ];

  /* Sulla testa i punti dei meridiani sono staccati dallo scalpo (per essere
     visibili nel 3D): in 2D li riportiamo sul profilo del cranio, altrimenti
     cadono fuori dalla sagoma. */
  function snapTesta(p) {
    var T = window.CORPO && window.CORPO.testa;
    if (!T || p.y < 2.34) return p;
    var c = T.centro, r = T.raggi;
    var dx = p.x - c[0], dy = p.y - c[1], dz = p.z - c[2];
    var q = Math.sqrt(Math.pow(dx / r[0], 2) + Math.pow(dy / r[1], 2) + Math.pow(dz / r[2], 2));
    if (q <= 1.001) return p;
    return { x: c[0] + dx / q, y: c[1] + dy / q, z: c[2] + dz / q };
  }
  function proj(p0, pl) {
    var p = snapTesta(p0);
    if (pl.proj === "zy") return [p.z * pl.mir, -p.y];
    if (pl.proj === "xz") return [p.x * pl.mir, -p.z];
    return [p.x * pl.mir, -p.y];
  }
  function pathOf(poly, pl, chiuso) {
    var d = "", m = pl.mir, xz = pl.proj === "xz";
    for (var i = 0; i < poly.length; i++) {
      var a = poly[i][0] * m, b = xz ? -poly[i][1] : -poly[i][1];
      d += (i ? "L" : "M") + a.toFixed(3) + " " + b.toFixed(3);
    }
    return d + (chiuso ? "Z" : "");
  }

  /* --------------------------------------------------------------- punti */
  function raccogliPunti(pl) {
    var out = [];
    var MM = window.MeridianiMap;
    if (MM) {
      var mode = MM.pointsMode ? MM.pointsMode() : "chiave";
      if (mode !== "nessuno") {
        MM.list().forEach(function (m) {
          if (!MM.isVisible(m.id)) return;
          var rami = [m.nodi].concat(m.ramo && m.ramo.length ? [m.ramo] : []);
          var lati = m.bilaterale ? [1, -1] : [1];
          rami.forEach(function (arr, b) {
            arr.forEach(function (n, i) {
              if (!n.sigla) return;
              if (mode === "chiave" && !n.chiave) return;
              lati.forEach(function (s) {
                var p = { x: n.x * s, y: n.y, z: n.z };
                if (!pl.vis(p)) return;
                out.push({ kind: "mer", p: p, col: m.colore, r: n.chiave ? 0.026 : 0.016,
                           sigla: n.sigla, nome: n.nome, mer: m.id, idx: i, side: s, ramo: b === 1,
                           chiave: !!n.chiave, soft: !!(pl.soft && pl.soft(p)) });
              });
            });
          });
        });
      }
    }
    var PM = window.PuntiMap;
    var accesi = !PM || !PM.puntiVisible || PM.puntiVisible();
    if (accesi && window.PUNTI_INDICATORI) {
      (window.PUNTI_INDICATORI.punti || []).forEach(function (q, i) {
        if (!q.pos || !pl.vis(q.pos)) return;
        out.push({ kind: "ind", p: q.pos, col: "#ff5a4d", r: 0.040, sigla: String(i + 1),
                   nome: q.organo, id: q.id, num: i + 1, soft: !!(pl.soft && pl.soft(q.pos)) });
      });
    }
    return out;
  }

  /* ------------------------------------------------------------ disegno */
  function render() {
    if (!svg || !plate) return;
    var C = window.CORPO && window.CORPO.tavole && window.CORPO.tavole[plate.tav];
    var MM = window.MeridianiMap;
    var hi = MM && MM.highlighted ? MM.highlighted() : null;
    var etichette = MM && MM.labelsEnabled ? MM.labelsEnabled() : true;
    var zoomPlate = ["testa", "testa-r", "mano", "piede-su", "piede-giu"].indexOf(plate.id) >= 0;
    var im = IMG[plate.id];
    var s = "";
    if (im && im.src) {
      s += '<image href="' + esc(im.src) + '" x="' + im.x + '" y="' + im.y + '" width="' + im.w +
           '" height="' + im.h + '" opacity="' + (im.op == null ? 0.6 : im.op) +
           '" preserveAspectRatio="none"></image>';
    }
    if (C) {
      s += '<g class="tav__body">';
      C.contorni.forEach(function (c) { s += '<path d="' + pathOf(c, plate, true) + '"/>'; });
      s += '</g><g class="tav__det">';
      C.dettagli.forEach(function (d) { s += '<path d="' + pathOf(d, plate, false) + '"/>'; });
      s += '</g>';
    }
    var pts = raccogliPunti(plate);
    var sc = view ? view.w / 1.9 : 1;       // i punti restano della stessa dimensione a schermo
    var lab = "";
    s += '<g class="tav__pts">';
    pts.forEach(function (q, idx) {
      var xy = proj(q.p, plate);
      var attenua = q.soft || (hi && q.kind === "mer" && q.mer !== hi);
      s += '<circle class="tp' + (q.kind === "ind" ? " tp--ind" : (q.chiave ? "" : " tp--sec")) +
           '" cx="' + xy[0].toFixed(3) +
           '" cy="' + xy[1].toFixed(3) + '" r="' + (q.r * sc).toFixed(4) + '" fill="' + esc(q.col) +
           '" opacity="' + (attenua ? 0.25 : 1) + '" data-k="' + idx + '"><title>' +
           esc(q.sigla + (q.nome ? " · " + q.nome : "")) + '</title></circle>';
      if (q.kind === "ind") {
        lab += '<text class="tl tl--ind" x="' + xy[0].toFixed(3) + '" y="' + (xy[1] + 0.016 * sc).toFixed(3) +
               '">' + esc(q.num) + '</text>';
      } else if (etichette && !q.soft && ((hi && q.mer === hi) || (zoomPlate && q.chiave))) {
        lab += '<text class="tl" x="' + (xy[0] + (q.r + 0.012) * sc).toFixed(3) + '" y="' + (xy[1] + 0.012 * sc).toFixed(3) +
               '" fill="' + esc(q.col) + '">' + esc(q.sigla) + '</text>';
      }
    });
    s += '</g><g class="tav__lab">' + lab + '</g>';
    svg.innerHTML = s;
    svg.__pts = pts;
  }

  function applyView() {
    if (!svg || !view) return;
    svg.setAttribute("viewBox", view.x + " " + view.y + " " + view.w + " " + view.h);
    var scala = view.w / 1.9;                      // testo leggibile a ogni zoom
    svg.style.setProperty("--tsc", scala.toFixed(4));
  }
  function resetView() {
    if (!plate) return;
    view = { x: plate.box[0], y: plate.box[1], w: plate.box[2], h: plate.box[3] };
    applyView();
  }

  /* ------------------------------------------------------- interazione */
  function svgPoint(ev) {
    var r = svg.getBoundingClientRect();
    var cx = (ev.clientX != null ? ev.clientX : (ev.touches && ev.touches[0].clientX)) - r.left;
    var cy = (ev.clientY != null ? ev.clientY : (ev.touches && ev.touches[0].clientY)) - r.top;
    return { x: view.x + (cx / r.width) * view.w, y: view.y + (cy / r.height) * view.h,
             px: cx, py: cy, rw: r.width, rh: r.height };
  }

  function bind() {
    svg.addEventListener("wheel", function (e) {
      e.preventDefault();
      var p = svgPoint(e);
      var im = IMG[plate.id];
      if (imgMode && im) {                       // scala l'immagine di sfondo
        var f = e.deltaY < 0 ? 1.06 : 1 / 1.06;
        im.x = p.x - (p.x - im.x) * f; im.y = p.y - (p.y - im.y) * f;
        im.w *= f; im.h *= f; salva(); render(); return;
      }
      var k = e.deltaY < 0 ? 1 / 1.12 : 1.12;
      var nw = Math.max(0.10, Math.min(6, view.w * k)), nh = nw * (view.h / view.w);
      view.x = p.x - (p.x - view.x) * (nw / view.w);
      view.y = p.y - (p.y - view.y) * (nh / view.h);
      view.w = nw; view.h = nh; applyView(); render();
    }, { passive: false });

    var down = function (e) {
      var p = svgPoint(e); dragging = true; moved = false; lastX = p.x; lastY = p.y;
    };
    var move = function (e) {
      if (!dragging) return;
      var p = svgPoint(e);
      var dx = p.x - lastX, dy = p.y - lastY;
      if (Math.abs(dx) + Math.abs(dy) > 0.004) moved = true;
      var im = IMG[plate.id];
      if (imgMode && im) { im.x += dx; im.y += dy; render(); }
      else { view.x -= dx; view.y -= dy; applyView(); lastX = p.x + dx; lastY = p.y + dy; return; }
      lastX = p.x; lastY = p.y;
    };
    var up = function () { if (dragging && imgMode) salva(); dragging = false; };
    svg.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    svg.addEventListener("touchstart", down, { passive: true });
    svg.addEventListener("touchmove", move, { passive: true });
    svg.addEventListener("touchend", up);

    svg.addEventListener("click", function (e) {
      if (moved) return;
      var t = e.target.closest ? e.target.closest("circle.tp") : null;
      if (!t) return;
      var q = (svg.__pts || [])[+t.dataset.k];
      if (!q) return;
      if (q.kind === "ind") {
        var p = (window.PUNTI_INDICATORI.punti || []).filter(function (x) { return x.id === q.id; })[0];
        if (p && window.PuntiMap && window.PuntiMap.selectPunto) window.PuntiMap.selectPunto(p.id);
      } else if (window.PuntiMap && window.PuntiMap.selectMerPoint) {
        window.PuntiMap.selectMerPoint({ merId: q.mer, idx: q.idx, side: q.side, ramo: q.ramo });
      }
    });
  }

  /* ------------------------------------------- immagine di sfondo utente */
  function salva() {
    var out = {};
    Object.keys(IMG).forEach(function (k) {
      var i = IMG[k];
      out[k] = { src: i.src, x: i.x, y: i.y, w: i.w, h: i.h, op: i.op };
    });
    try { lsSet(STORE, JSON.stringify(out)); } catch (e) {}
  }
  function carica() {
    var raw = lsGet(STORE); if (!raw) return;
    try { IMG = JSON.parse(raw) || {}; } catch (e) { IMG = {}; }
  }
  function setImmagine(src) {
    var b = plate.box;
    IMG[plate.id] = { src: src, x: b[0], y: b[1], w: b[2], h: b[3], op: 0.6 };
    salva(); render();
  }
  function rimuoviImmagine() { delete IMG[plate.id]; salva(); render(); }

  /* ------------------------------------------------------------- schede */
  function buildTabs() {
    if (!tabsEl) return;
    tabsEl.innerHTML = "";
    PLATES.forEach(function (pl) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "platetab"; b.dataset.plate = pl.id;
      b.textContent = pl.label;
      b.addEventListener("click", function () { setPlate(pl.id); });
      tabsEl.appendChild(b);
    });
  }
  function syncTabs() {
    if (!tabsEl) return;
    Array.from(tabsEl.children).forEach(function (b) {
      b.classList.toggle("is-on", plate && b.dataset.plate === plate.id);
    });
  }
  function setPlate(id) {
    var pl = PLATES.filter(function (p) { return p.id === id; })[0];
    if (!pl) return;
    plate = pl; resetView(); render(); syncTabs();
    var t = document.getElementById("tavImgOp");
    var im = IMG[plate.id];
    if (t) t.value = Math.round(((im && im.op != null) ? im.op : 0.6) * 100);
  }

  function init() {
    if (inited) return true;
    svg = document.getElementById("tavolaSvg");
    tabsEl = document.getElementById("plateTabs");
    if (!svg) return false;
    svg.setAttribute("xmlns", SVGNS);
    carica();
    buildTabs();
    bind();
    setPlate("fronte");
    // strumenti
    var f = document.getElementById("tavImg");
    if (f) f.addEventListener("change", function () {
      var file = f.files && f.files[0]; if (!file) return;
      if (file.size > 4 * 1024 * 1024) { alert("Immagine troppo grande (max 4 MB)."); f.value = ""; return; }
      var rd = new FileReader();
      rd.onload = function () { setImmagine(String(rd.result)); };
      rd.readAsDataURL(file);
      f.value = "";
    });
    var mv = document.getElementById("tavImgMove");
    if (mv) mv.addEventListener("click", function () {
      imgMode = !imgMode;
      mv.setAttribute("aria-pressed", imgMode ? "true" : "false");
      mv.classList.toggle("is-on", imgMode);
      if (svg) svg.classList.toggle("is-imgmode", imgMode);
    });
    var op = document.getElementById("tavImgOp");
    if (op) op.addEventListener("input", function () {
      var im = IMG[plate.id]; if (!im) return;
      im.op = (+op.value) / 100; salva(); render();
    });
    var del = document.getElementById("tavImgDel");
    if (del) del.addEventListener("click", rimuoviImmagine);
    var rz = document.getElementById("tavReset");
    if (rz) rz.addEventListener("click", resetView);
    inited = true;
    return true;
  }

  function mark(sel) {
    if (!svg || !attivo) return;
    var pts = svg.__pts || [];
    Array.from(svg.querySelectorAll("circle.tp")).forEach(function (c) {
      var q = pts[+c.dataset.k];
      var on = !!q && !!sel && (
        (sel.kind === "mer" && q.kind === "mer" && q.mer === sel.merId && q.idx === sel.idx && q.ramo === !!sel.ramo) ||
        (sel.kind === "ind" && q.kind === "ind" && q.id === sel.id));
      c.classList.toggle("is-sel", on);
    });
  }

  window.Tavole = {
    init: init,
    activate: function () { attivo = true; if (init()) render(); },
    deactivate: function () { attivo = false; },
    isActive: function () { return attivo; },
    setPlate: setPlate,
    refresh: function () { if (attivo) render(); },
    mark: mark,
    plates: function () { return PLATES.map(function (p) { return p.id; }); }
  };
})();
