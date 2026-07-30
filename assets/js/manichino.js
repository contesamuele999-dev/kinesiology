/* manichino.js — costruzione del manichino 3D anatomico.
   Legge l'anatomia da assets/js/corpo_data.js (window.CORPO), generato dallo
   stesso script che posiziona i punti dei meridiani: modello e punti restano
   quindi sempre allineati.

   Superfici costruite per "loft" (tubi a raggio variabile lungo una curva)
   invece che con cilindri e sfere: arti continui, mani con cinque dita, piedi
   con le dita, rilievi muscolari e viso definito.

   API: window.Manichino.build(THREE, opts) -> THREE.Group
        opts = { col, LAND, torsoR, surfaceZ }
   Ogni mesh porta userData.bodyPart = true; i riferimenti anatomici hanno
   userData.landmark (o landmarkHi), lo slip userData.brief — come prima, così
   il retheme di punti.js continua a funzionare. */
(function () {
  "use strict";

  var C = window.CORPO || null;

  /* ---------------------------------------------------------- loft helper */
  function tubeGeom(THREE, pts, rads, tubSeg, radSeg) {
    var curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.3);
    var frames = curve.computeFrenetFrames(tubSeg, false);
    var pos = [], nor = [], uv = [], idx = [];
    var rAt = function (t) {
      var f = t * (rads.length - 1);
      var i = Math.min(rads.length - 2, Math.floor(f));
      var u = f - i;
      return rads[i] + (rads[i + 1] - rads[i]) * u;
    };
    var v = new THREE.Vector3(), n = new THREE.Vector3();
    for (var i = 0; i <= tubSeg; i++) {
      var t = i / tubSeg;
      var c = curve.getPoint(t);
      var N = frames.normals[Math.min(i, tubSeg - 1)];
      var B = frames.binormals[Math.min(i, tubSeg - 1)];
      var r = rAt(t);
      for (var j = 0; j <= radSeg; j++) {
        var th = (j / radSeg) * Math.PI * 2;
        var cx = Math.cos(th), sy = Math.sin(th);
        n.set(N.x * cx + B.x * sy, N.y * cx + B.y * sy, N.z * cx + B.z * sy).normalize();
        v.copy(c).addScaledVector(n, r);
        pos.push(v.x, v.y, v.z);
        nor.push(n.x, n.y, n.z);
        uv.push(j / radSeg, t);
      }
    }
    for (var a = 1; a <= tubSeg; a++) {
      for (var b = 1; b <= radSeg; b++) {
        var i1 = (radSeg + 1) * (a - 1) + (b - 1);
        var i2 = (radSeg + 1) * a + (b - 1);
        var i3 = (radSeg + 1) * a + b;
        var i4 = (radSeg + 1) * (a - 1) + b;
        idx.push(i1, i2, i4, i2, i3, i4);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setIndex(idx);
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    return g;
  }

  /* interpola l'asse di un arto (tabella [y,cx,cz,r]) */
  function axisPts(THREE, axis, s) {
    return axis.map(function (a) { return new THREE.Vector3(a[1] * s, a[0], a[2]); });
  }
  function axisRad(axis) { return axis.map(function (a) { return a[3]; }); }
  function axisAt(axis, y) {
    if (y >= axis[0][0]) return { x: axis[0][1], z: axis[0][2], r: axis[0][3] };
    var L = axis[axis.length - 1];
    if (y <= L[0]) return { x: L[1], z: L[2], r: L[3] };
    for (var i = 0; i < axis.length - 1; i++) {
      var a = axis[i], b = axis[i + 1];
      if (b[0] <= y && y <= a[0]) {
        var t = (a[0] - y) / (a[0] - b[0]);
        return { x: a[1] + (b[1] - a[1]) * t, z: a[2] + (b[2] - a[2]) * t, r: a[3] + (b[3] - a[3]) * t };
      }
    }
    return { x: L[1], z: L[2], r: L[3] };
  }
  function lerpTab(tab, z) {
    if (z <= tab[0][0]) return tab[0][1];
    if (z >= tab[tab.length - 1][0]) return tab[tab.length - 1][1];
    for (var i = 0; i < tab.length - 1; i++) {
      if (tab[i][0] <= z && z <= tab[i + 1][0]) {
        var t = (z - tab[i][0]) / (tab[i + 1][0] - tab[i][0]);
        return tab[i][1] + (tab[i + 1][1] - tab[i][1]) * t;
      }
    }
    return tab[tab.length - 1][1];
  }

  /* ------------------------------------------------------------- costruzione */
  function build(THREE, opts) {
    opts = opts || {};
    if (!C) C = window.CORPO;
    var col = opts.col || {};
    var LAND = opts.LAND || {};
    var surfaceZ = opts.surfaceZ || function () { return 0; };
    var torsoR = opts.torsoR || function () { return 0.4; };

    var g = new THREE.Group();
    var mat = new THREE.MeshStandardMaterial({
      color: col.body != null ? col.body : 0xcdd8e0, roughness: 0.72, metalness: 0.03,
      emissive: col.bodyEmis != null ? col.bodyEmis : 0x000000
    });
    var lmMat = new THREE.MeshStandardMaterial({ color: col.landmark != null ? col.landmark : 0xaab8c6, roughness: 0.9, metalness: 0, emissive: col.bodyEmis || 0x000000 });
    var lmMatHi = new THREE.MeshStandardMaterial({ color: col.landmarkHi != null ? col.landmarkHi : 0x8aa0b4, roughness: 0.8, metalness: 0, emissive: col.bodyEmis || 0x000000 });
    var briefMat = new THREE.MeshStandardMaterial({ color: col.brief != null ? col.brief : 0x3f6ea8, roughness: 0.7, metalness: 0.02, emissive: col.bodyEmis || 0x000000 });

    function add(geo, x, y, z, rx, ry, rz, sx, sy, sz) {
      var m = new THREE.Mesh(geo, mat);
      m.position.set(x || 0, y || 0, z || 0);
      if (rx || ry || rz) m.rotation.set(rx || 0, ry || 0, rz || 0);
      if (sx != null || sy != null || sz != null) m.scale.set(sx == null ? 1 : sx, sy == null ? 1 : sy, sz == null ? 1 : sz);
      m.userData.bodyPart = true;
      g.add(m); return m;
    }
    function lm(geo, x, y, z, rx, ry, rz, sx, sy, sz, hi) {
      var m = new THREE.Mesh(geo, hi ? lmMatHi : lmMat);
      m.position.set(x || 0, y || 0, z || 0);
      if (rx || ry || rz) m.rotation.set(rx || 0, ry || 0, rz || 0);
      if (sx != null || sy != null || sz != null) m.scale.set(sx == null ? 1 : sx, sy == null ? 1 : sy, sz == null ? 1 : sz);
      m.userData.bodyPart = true; m.userData.landmark = true; m.userData.landmarkHi = !!hi;
      g.add(m); return m;
    }
    function brief(geo, x, y, z, rx, ry, rz, sx, sy, sz) {
      var m = new THREE.Mesh(geo, briefMat);
      m.position.set(x || 0, y || 0, z || 0);
      if (rx || ry || rz) m.rotation.set(rx || 0, ry || 0, rz || 0);
      if (sx != null || sy != null || sz != null) m.scale.set(sx == null ? 1 : sx, sy == null ? 1 : sy, sz == null ? 1 : sz);
      m.userData.bodyPart = true; m.userData.brief = true;
      g.add(m); return m;
    }
    function tube(pts, rads, tubSeg, radSeg) {
      var m = new THREE.Mesh(tubeGeom(THREE, pts, rads, tubSeg || 40, radSeg || 16), mat);
      m.userData.bodyPart = true; g.add(m); return m;
    }
    var V = function (x, y, z) { return new THREE.Vector3(x, y, z); };

    /* ============================ TRONCO ============================ */
    // profilo IDENTICO a prima: i punti indicatori del cliente restano calibrati
    (function torso() {
      // profilo infittito (spline sui punti originali) → superficie liscia e
      // raycast preciso quando si trascina un punto in modalità modifica
      var base = C.torsoProfile;
      var raw = [];
      raw.push([base[0][0] - 0.02, 0.02]);
      base.forEach(function (p) { raw.push([p[0], p[1]]); });
      raw.push([base[base.length - 1][0] + 0.03, 0.04]);
      var pts = [];
      for (var i = 0; i < raw.length - 1; i++) {
        var n = i === 0 || i === raw.length - 2 ? 2 : 5;   // suddivisioni per tratto
        for (var k = 0; k < n; k++) {
          var t = k / n;
          var y = raw[i][0] + (raw[i + 1][0] - raw[i][0]) * t;
          var r = torsoR(y);
          if (i === 0) r = raw[0][1] + (raw[1][1] - raw[0][1]) * t;
          if (i === raw.length - 2) r = raw[i][1] + (raw[i + 1][1] - raw[i][1]) * t;
          pts.push(new THREE.Vector2(Math.max(0.02, r), y));
        }
      }
      pts.push(new THREE.Vector2(raw[raw.length - 1][1], raw[raw.length - 1][0]));
      var geo = new THREE.LatheGeometry(pts, 80);
      geo.scale(1, 1, C.torsoZScale);
      add(geo);
    })();

    var zf = function (x, y) { return surfaceZ(x, y, true); };
    var zb = function (x, y) { return surfaceZ(x, y, false); };

    /* rilievi muscolari del tronco.
       IMPORTANTE: la profondità si calcola dalla superficie (zf/zb) meno il
       semi-spessore del rilievo, così il muscolo SPORGE di ~1 cm invece di
       restare sepolto dentro il tronco. */
    function bombaFronte(r, x, y, sx, sy, sz, sporgenza) {
        var half = r * (sz == null ? 1 : sz);
        return zf(x, y) - half + (sporgenza == null ? 0.012 : sporgenza);
    }
    function bombaRetro(r, x, y, sz, sporgenza) {
        var half = r * (sz == null ? 1 : sz);
        return zb(x, y) + half - (sporgenza == null ? 0.012 : sporgenza);
    }
    (function rilievi() {
      // grandi pettorali
      [-1, 1].forEach(function (s) {
        add(new THREE.SphereGeometry(0.17, 26, 20), s * 0.22, 1.88,
            bombaFronte(0.17, s * 0.22, 1.88, 1.05, 0.75, 0.55, 0.016),
            0, 0, 0, 1.05, 0.75, 0.55);
      });
      // retto dell'addome: 4 coppie di fasci = 8 ellissoidi ("tartaruga")
      [1.500, 1.380, 1.262, 1.130].forEach(function (y, i) {
        var rr = 0.082 - i * 0.004;
        [-1, 1].forEach(function (s) {
          add(new THREE.SphereGeometry(rr, 20, 16), s * 0.082, y,
              bombaFronte(rr, s * 0.082, y, 1, 0.80, 0.46, 0.014),
              0, 0, 0, 1.0, 0.80, 0.46);
        });
      });
      // obliqui / fianchi
      [-1, 1].forEach(function (s) {
        add(new THREE.SphereGeometry(0.13, 20, 16), s * 0.28, 1.30,
            bombaFronte(0.13, s * 0.28, 1.30, 0.8, 1.1, 0.5, 0.010),
            0, 0, s * 0.3, 0.8, 1.1, 0.5);
      });
      // clavicole
      [-1, 1].forEach(function (s) {
        var p = [V(s * 0.02, 2.15, zf(0.02, 2.15) + 0.004), V(s * 0.20, 2.16, zf(s * 0.20, 2.16) + 0.004),
                 V(s * 0.38, 2.11, zf(s * 0.38, 2.11) + 0.002), V(s * 0.48, 2.04, 0.05)];
        tube(p, [0.020, 0.019, 0.019, 0.022], 24, 10);
      });
      // trapezio (dal collo alla spalla)
      [-1, 1].forEach(function (s) {
        var p = [V(s * 0.05, 2.34, -0.02), V(s * 0.22, 2.24, -0.05), V(s * 0.42, 2.10, -0.02)];
        tube(p, [0.052, 0.066, 0.056], 20, 12);
      });
      // gran dorsale
      [-1, 1].forEach(function (s) {
        add(new THREE.SphereGeometry(0.16, 20, 16), s * 0.30, 1.62,
            bombaRetro(0.16, s * 0.30, 1.62, 0.5, 0.010),
            0, 0, 0, 0.9, 1.5, 0.5);
      });
      // scapole
      [-1, 1].forEach(function (s) {
        add(new THREE.SphereGeometry(0.10, 18, 14), s * 0.25, 1.98,
            bombaRetro(0.10, s * 0.25, 1.98, 0.35, 0.012),
            0, 0, s * 0.25, 1.0, 1.5, 0.35);
      });
      // glutei
      [-1, 1].forEach(function (s) {
        add(new THREE.SphereGeometry(0.215, 26, 20), s * 0.155, 0.68, -0.12, 0, 0, 0, 1.0, 0.95, 0.85);
      });
    })();

    /* ============================ COLLO + TESTA ============================ */
    (function testa() {
      var hc = C.testa.centro, hr = C.testa.raggi;
      var F = (C.testa && C.testa.viso) || {};
      var ipd = F.ipd || 0.078, oy = F.orecchioY || 2.62, ox = F.orecchioX || 0.176,
          oz = F.orecchioZ || -0.03, yocchi = F.occhi || 2.658, ynaso = F.naso || 2.545,
          ybocca = F.bocca || 2.462, ymento = F.mento || 2.400, zig = F.zigomo || 0.150;
      // profondità della superficie del cranio alla quota (x,y): serve per appoggiarci
      // occhi, sopracciglia, naso e bocca invece di lasciarli sprofondati dentro la testa
      function fz(x, y) {
        var t = 1 - Math.pow(x / hr[0], 2) - Math.pow((y - hc[1]) / hr[1], 2);
        return hc[2] + hr[2] * Math.sqrt(Math.max(0.04, t));
      }
      // collo
      tube([V(0, 2.24, -0.01), V(0, 2.34, 0.0), V(0, 2.44, 0.01)], [0.150, 0.130, 0.120], 18, 22);
      [-1, 1].forEach(function (s) {
        tube([V(s * 0.045, 2.44, 0.085), V(s * 0.095, 2.34, 0.068), V(s * 0.150, 2.24, 0.02)],
             [0.016, 0.024, 0.030], 16, 10);
      });
      // cranio — semiassi presi da corpo_data.js (misure umane reali)
      add(new THREE.SphereGeometry(hr[0], 56, 44), hc[0], hc[1], hc[2], 0, 0, 0,
          1, hr[1] / hr[0], hr[2] / hr[0]);
      // volto, mandibola, mento
      add(new THREE.SphereGeometry(0.150, 34, 28), 0, 2.505, 0.030, 0, 0, 0, 1.00, 0.84, 1.18);
      add(new THREE.SphereGeometry(0.072, 22, 18), 0, ymento + 0.024, 0.128, 0, 0, 0, 1.10, 0.88, 0.95);

      [-1, 1].forEach(function (s) {
        add(new THREE.SphereGeometry(0.056, 18, 14), s * 0.126, 2.498, 0.052, 0, 0, 0, 0.9, 1.25, 0.9);   // ganascia
        add(new THREE.SphereGeometry(0.044, 16, 14), s * zig, 2.588, fz(zig, 2.588) - 0.030, 0, 0, 0, 1.0, 0.8, 0.8); // zigomo
        // arcata sopraccigliare, appoggiata sulla fronte
        tube([V(s * 0.014, yocchi + 0.050, fz(0.014, yocchi + 0.050) - 0.012),
              V(s * 0.068, yocchi + 0.052, fz(0.068, yocchi + 0.052) - 0.012),
              V(s * 0.120, yocchi + 0.036, fz(0.120, yocchi + 0.036) - 0.014)],
             [0.013, 0.015, 0.011], 14, 8);
        // occhio: bulbo a filo della superficie + iride scura (colore landmark)
        var ez = fz(s * ipd, yocchi) - 0.014;
        add(new THREE.SphereGeometry(0.031, 20, 16), s * ipd, yocchi, ez, 0, 0, 0, 1.18, 0.82, 0.62);
        lm(new THREE.SphereGeometry(0.0125, 14, 12), s * ipd, yocchi, ez + 0.014, 0, 0, 0, 1, 1, 0.55, true);
        // palpebra superiore
        tube([V(s * (ipd - 0.034), yocchi + 0.004, ez - 0.004),
              V(s * ipd, yocchi + 0.019, ez + 0.002),
              V(s * (ipd + 0.034), yocchi + 0.002, ez - 0.006)], [0.006, 0.008, 0.006], 12, 8);
        // orecchio: elica + conca + lobo
        var e = [];
        for (var i = 0; i <= 12; i++) {
          var a = Math.PI * (0.22 + 1.5 * (i / 12));
          e.push(V(s * ox, oy + Math.cos(a) * 0.052, oz + Math.sin(a) * 0.040));
        }
        tube(e, e.map(function () { return 0.013; }), 20, 8);
        add(new THREE.SphereGeometry(0.034, 16, 12), s * (ox - 0.008), oy, oz + 0.006, 0, 0, 0, 0.45, 1.15, 0.9);
        add(new THREE.SphereGeometry(0.023, 14, 12), s * (ox - 0.004), oy - 0.058, oz + 0.004, 0, 0, 0, 0.55, 1.0, 0.9);
        // narice
        add(new THREE.SphereGeometry(0.015, 12, 10), s * 0.024, ynaso - 0.024, fz(0.024, ynaso - 0.024) + 0.014);
      });

      // naso: dorso dalla glabella alla punta
      tube([V(0, yocchi + 0.034, fz(0, yocchi + 0.034) - 0.006),
            V(0, yocchi - 0.040, fz(0, yocchi - 0.040) + 0.006),
            V(0, ynaso + 0.010, fz(0, ynaso + 0.010) + 0.028)],
           [0.013, 0.019, 0.024], 18, 12);
      add(new THREE.SphereGeometry(0.026, 18, 14), 0, ynaso - 0.002, fz(0, ynaso) + 0.038, 0, 0, 0, 1.1, 0.95, 1.0);
      // labbra
      add(new THREE.SphereGeometry(0.044, 20, 12), 0, ybocca + 0.011, fz(0, ybocca) + 0.010, 0, 0, 0, 1.15, 0.30, 0.42);
      add(new THREE.SphereGeometry(0.042, 20, 12), 0, ybocca - 0.012, fz(0, ybocca) + 0.008, 0, 0, 0, 1.10, 0.28, 0.42);
    })();

    /* ============================ BRACCIA + MANI ============================ */
    function braccio(s) {
      var ax = C.braccio;
      tube(axisPts(THREE, ax, s), axisRad(ax), 64, 20);
      // deltoide, bicipite, tricipite — appoggiati sulla superficie del braccio
      function bA(y, r, sz, avanti, sporg) {
        var a = axisAt(ax, y), half = r * (sz == null ? 1 : sz);
        return avanti ? a.z + a.r - half + (sporg || 0.010) : a.z - a.r + half - (sporg || 0.010);
      }
      add(new THREE.SphereGeometry(0.112, 22, 18), s * 0.505, 1.96, 0.0, 0, 0, 0, 1.0, 1.15, 1.0);
      add(new THREE.SphereGeometry(0.070, 20, 16), s * 0.525, 1.73, bA(1.73, 0.070, 0.7, true), 0, 0, 0, 0.8, 1.5, 0.7);
      add(new THREE.SphereGeometry(0.066, 20, 16), s * 0.525, 1.72, bA(1.72, 0.066, 0.7, false), 0, 0, 0, 0.8, 1.4, 0.7);
      // massa dei flessori dell'avambraccio
      add(new THREE.SphereGeometry(0.062, 20, 16), s * 0.528, 1.20, bA(1.20, 0.062, 0.9, true), 0, 0, 0, 0.9, 1.7, 0.9);
      // olecrano
      add(new THREE.SphereGeometry(0.042, 14, 12), s * 0.525, 1.315, bA(1.315, 0.042, 1, false, 0.014));

      // ---- mano ----
      var H = C.mano;
      var palmo = tube([V(s * H.centro_x, H.polso_y, H.palmo_z),
                        V(s * H.centro_x, (H.polso_y + H.mcp_y) / 2, H.palmo_z + 0.004),
                        V(s * H.centro_x, H.mcp_y - 0.02, H.palmo_z)],
                       [0.058, 0.082, 0.086], 20, 18);
      palmo.scale.z = 0.42;
      palmo.position.z = H.palmo_z * (1 - 0.42);
      // eminenza tenar (base del pollice) e ipotenar
      add(new THREE.SphereGeometry(0.045, 16, 12), s * 0.618, 0.615, H.palmo_z + 0.022, 0, 0, 0, 0.75, 1.5, 0.6);
      add(new THREE.SphereGeometry(0.038, 16, 12), s * 0.478, 0.585, H.palmo_z + 0.018, 0, 0, 0, 0.7, 1.4, 0.55);
      // dita
      H.dita.forEach(function (d) {
        var xm = d[1], xt = d[2], yt = d[3], r = d[4];
        var y0 = H.mcp_y, dz = H.palmo_z;
        tube([V(s * xm, y0 + 0.02, dz), V(s * ((xm + xt) / 2), y0 - (y0 - yt) * 0.45, dz + 0.004),
              V(s * xt, yt + r * 0.6, dz + 0.002), V(s * xt, yt, dz)],
             [r, r * 0.95, r * 0.85, r * 0.55], 22, 10);
      });
      // pollice (opponibile, laterale)
      var P = H.pollice;
      tube([V(s * P.cmc[0], P.cmc[1], P.cmc[2]), V(s * P.mcp[0], P.mcp[1], P.mcp[2]),
            V(s * P.punta[0], P.punta[1] + 0.02, P.punta[2]), V(s * P.punta[0], P.punta[1], P.punta[2])],
           [P.raggio, P.raggio * 0.92, P.raggio * 0.8, P.raggio * 0.5], 22, 12);
    }
    braccio(1); braccio(-1);

    /* ============================ GAMBE + PIEDI ============================ */
    function gamba(s) {
      var ax = C.gamba;
      tube(axisPts(THREE, ax, s), axisRad(ax), 64, 22);
      // quadricipite, vasto mediale, ischio-crurali, rotula e gemelli
      function bL(y, r, sz, avanti, sporg) {
        var a = axisAt(ax, y), half = r * (sz == null ? 1 : sz);
        return avanti ? a.z + a.r - half + (sporg || 0.012) : a.z - a.r + half - (sporg || 0.012);
      }
      add(new THREE.SphereGeometry(0.110, 22, 18), s * 0.205, 0.18, bL(0.18, 0.110, 0.7, true), 0, 0, 0, 0.9, 2.4, 0.7);
      add(new THREE.SphereGeometry(0.070, 20, 16), s * 0.150, -0.05, bL(-0.05, 0.070, 0.7, true), 0, 0, 0, 0.8, 1.3, 0.7);
      add(new THREE.SphereGeometry(0.100, 20, 16), s * 0.205, 0.20, bL(0.20, 0.100, 0.7, false), 0, 0, 0, 0.95, 2.2, 0.7);
      add(new THREE.SphereGeometry(0.055, 18, 14), s * 0.212, -0.135, bL(-0.135, 0.055, 0.5, true, 0.016), 0, 0, 0, 1.0, 1.15, 0.5);
      [-1, 1].forEach(function (kk) {
        add(new THREE.SphereGeometry(0.066, 20, 16), s * (0.218 + kk * 0.042), -0.48,
            bL(-0.48, 0.066, 0.85, false), 0, 0, 0, 0.85, 2.0, 0.85);
      });
      // cresta tibiale
      tube([V(s * 0.205, -0.24, axisAt(ax, -0.24).r + axisAt(ax, -0.24).z - 0.006),
            V(s * 0.210, -0.60, axisAt(ax, -0.60).r + axisAt(ax, -0.60).z - 0.006),
            V(s * 0.212, -1.00, axisAt(ax, -1.00).r + axisAt(ax, -1.00).z - 0.006)],
           [0.016, 0.014, 0.012], 22, 8);
      // tendine d'Achille
      tube([V(s * 0.216, -0.90, -(axisAt(ax, -0.90).r) + axisAt(ax, -0.90).z + 0.012),
            V(s * 0.215, -1.05, -(axisAt(ax, -1.05).r) + axisAt(ax, -1.05).z + 0.010),
            V(s * 0.215, -1.18, -(axisAt(ax, -1.18).r) + axisAt(ax, -1.18).z + 0.008)],
           [0.028, 0.022, 0.020], 16, 10);
      // malleoli
      add(new THREE.SphereGeometry(0.036, 14, 12), s * 0.163, -1.155, 0.005, 0, 0, 0, 0.8, 1, 1);
      add(new THREE.SphereGeometry(0.034, 14, 12), s * 0.272, -1.165, -0.005, 0, 0, 0, 0.8, 1, 1);

      // ---- piede ----
      var Ft = C.piede;
      var zs = [Ft.tallone_z, -0.02, 0.14, 0.28, 0.36];
      var pts = zs.map(function (z) {
        var yt = lerpTab(Ft.dorso, z);
        return V(s * Ft.cx, (yt + Ft.suola) / 2 + 0.012, z);
      });
      var rr = zs.map(function (z) { return lerpTab(Ft.larghezza, z) * 1.05; });
      var piede = tube(pts, rr, 34, 18);
      piede.scale.y = 0.80;
      piede.position.y = (1 - 0.80) * ((lerpTab(Ft.dorso, 0.1) + Ft.suola) / 2);
      // tallone
      add(new THREE.SphereGeometry(0.062, 18, 14), s * Ft.cx, -1.245, Ft.tallone_z + 0.02, 0, 0, 0, 1.0, 0.95, 1.0);
      // arco plantare (accenno) + dita
      Ft.dita.forEach(function (d) {
        var x = d[1], zt = d[2], r = d[3];
        tube([V(s * x, -1.245, zt - 0.115), V(s * x, -1.258, zt - 0.055), V(s * x, -1.266, zt - 0.012)],
             [r, r * 0.92, r * 0.62], 14, 10);
      });
    }
    gamba(1); gamba(-1);

    /* ============================ SLIP ============================ */
    (function slip() {
      brief(new THREE.CylinderGeometry(torsoR(LAND.pube + 0.10) + 0.018, torsoR(LAND.pube + 0.02) + 0.024, 0.30, 44, 1, true),
            0, LAND.pube + 0.02, 0, 0, 0, 0, 1, 1, C.torsoZScale);
      brief(new THREE.SphereGeometry(0.305, 32, 22), 0, LAND.pube - 0.14, 0, 0, 0, 0, 1, 0.62, C.torsoZScale);
    })();

    /* =================== RIFERIMENTI ANATOMICI (landmark) =================== */
    // identici alla versione precedente: servono a localizzare i punti indicatori
    lm(new THREE.SphereGeometry(0.028, 16, 14), LAND.capX, LAND.capezzoli, zf(LAND.capX, LAND.capezzoli) + 0.005, 0, 0, 0, 1, 1, 1, true);
    lm(new THREE.SphereGeometry(0.028, 16, 14), -LAND.capX, LAND.capezzoli, zf(-LAND.capX, LAND.capezzoli) + 0.005, 0, 0, 0, 1, 1, 1, true);
    lm(new THREE.SphereGeometry(0.032, 16, 14), 0, LAND.ombelico, zf(0, LAND.ombelico) - 0.01, 0, 0, 0, 1, 1, 0.6, true);
    lm(new THREE.SphereGeometry(0.026, 14, 12), 0, LAND.giugulo, zf(0, LAND.giugulo) - 0.01);
    lm(new THREE.CylinderGeometry(0.006, 0.006, LAND.giugulo - LAND.pube, 10),
       0, (LAND.giugulo + LAND.pube) / 2, zf(0, (LAND.giugulo + LAND.pube) / 2) + 0.01, 0.05, 0, 0);
    (function arcata() {
      for (var side = -1; side <= 1; side += 2) {
        for (var i = 0; i < 7; i++) {
          var t = i / 6, x = side * (0.02 + t * 0.36), y = LAND.arcata + 0.10 - t * 0.30;
          lm(new THREE.SphereGeometry(0.016, 10, 8), x, y, zf(x, y) + 0.004);
        }
      }
    })();
    (function costole() {
      [LAND.arcata + 0.14, LAND.arcata + 0.28, LAND.capezzoli + 0.02].forEach(function (yBase, li) {
        for (var side = -1; side <= 1; side += 2) {
          for (var i = 0; i < 6; i++) {
            var t = i / 5, x = side * (0.06 + t * (0.30 + li * 0.03));
            var y = yBase + Math.sin(t * Math.PI) * 0.05 - t * 0.02;
            lm(new THREE.SphereGeometry(0.012, 8, 6), x, y, zf(x, y) + 0.003);
          }
        }
      });
    })();
    (function creste() {
      for (var side = -1; side <= 1; side += 2) {
        for (var i = 0; i < 5; i++) {
          var t = i / 4, x = side * (0.10 + t * 0.26), y = LAND.cresta + t * 0.05;
          lm(new THREE.SphereGeometry(0.013, 8, 6), x, y, zf(x, y) + 0.003);
        }
      }
    })();
    (function pube() {
      for (var i = 0; i < 7; i++) {
        var t = i / 6, x = (t - 0.5) * 0.30, y = LAND.pube - Math.cos((t - 0.5) * Math.PI) * 0.03;
        lm(new THREE.SphereGeometry(0.014, 8, 6), x, y, zf(x, y) + 0.003, 0, 0, 0, 1, 1, 1, true);
      }
    })();
    (function colonna() {
      var yTop = LAND.giugulo + 0.06, yBot = LAND.pube + 0.02, n = 17;
      for (var i = 0; i < n; i++) {
        var t = i / (n - 1), y = yTop - t * (yTop - yBot);
        lm(new THREE.SphereGeometry(0.026 - 0.006 * Math.sin(t * Math.PI), 10, 8), 0, y, zb(0, y) - 0.004, 0, 0, 0, 1, 0.85, 1);
      }
    })();
    (function costoleRetro() {
      [LAND.arcata + 0.02, LAND.arcata + 0.16, LAND.arcata + 0.30, LAND.capezzoli + 0.06, LAND.capezzoli + 0.20].forEach(function (yBase) {
        for (var side = -1; side <= 1; side += 2) {
          for (var i = 1; i < 7; i++) {
            var t = i / 6, x = side * (t * 0.34), y = yBase - t * 0.10;
            lm(new THREE.SphereGeometry(0.013, 8, 6), x, y, zb(x, y) - 0.003);
          }
        }
      });
    })();

    return g;
  }

  window.Manichino = { build: build, tubeGeom: tubeGeom, axisAt: axisAt, lerpTab: lerpTab };
})();
