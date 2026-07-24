/* punti.js — Macrosezione "Punti Indicatori": mappa 3D del corpo con i
   Punti d'Allarme (punti Mu). Three.js vendorizzato (assets/vendor/three.min.js).
   Progettata per essere estesa: aggiungere gruppi di punti a PUNTI_INDICATORI.
   Nessuna dipendenza esterna a runtime. */
(function () {
  "use strict";

  const mount = document.getElementById("puntiView");
  if (!mount) return;

  const canvasWrap = document.getElementById("punti3d");
  const infoEl = document.getElementById("puntiInfo");
  const listEl = document.getElementById("puntiList");
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  let inited = false, THREE, renderer, scene, camera, raycaster, pointer;
  let bodyGroup, pointsGroup, markerMeshes = [], picked = null, hovered = null;
  let rafId = null, running = false;
  // orbit state
  let yaw = 0.5, pitch = 0.05, dist = 6.2, target;
  let dragging = false, lastX = 0, lastY = 0, dragMoved = false;
  // editor
  let editing = false, draggingPoint = null;
  let ORIGINAL = [];

  const DATA = (window.PUNTI_INDICATORI && window.PUNTI_INDICATORI.punti) || [];

  /* Landmark editabili: riferimenti anatomici che l'utente può spostare.
     Vengono dalle quote LAND ma, una volta mossi, si esportano a parte.
     Sorgente override opzionale: window.PUNTI_INDICATORI.landmarks */
  const LAND_SAVED = (window.PUNTI_INDICATORI && window.PUNTI_INDICATORI.landmarks) || null;
  function mkLand(id, nome, x, y, front) {
    const saved = LAND_SAVED && LAND_SAVED.find && LAND_SAVED.find((l)=>l.id===id);
    const pos = saved ? { x:saved.pos.x, y:saved.pos.y, z:saved.pos.z }
                      : { x:x, y:y, z:0 }; // z calcolato dopo initScene via surfaceZ
    return { id:id, organo:nome, kind:"landmark", vista: front?"fronte":"retro",
             meridiano:"", lato:"", regione:"", riferimento:"riferimento anatomico", note:"",
             pos: pos, _front: front, _lx: x, _ly: y };
  }
  const LANDMARKS = [
    mkLand("lm-ombelico","Ombelico", 0, 1.28, true),
    mkLand("lm-capezzolo-dx","Capezzolo (dx)", -0.24, 1.82, true),
    mkLand("lm-capezzolo-sx","Capezzolo (sx)", 0.24, 1.82, true),
    mkLand("lm-pube","Pube / pavimento pelvico", 0, 0.80, true),
    mkLand("lm-giugulo","Giugulo", 0, 2.12, true)
  ];
  // ITEMS = tutti i marker cliccabili/trascinabili
  let ITEMS = DATA.concat(LANDMARKS);

  /* ---------- Riferimenti anatomici condivisi ----------
     Quote y (corpo normalizzato) usate SIA per disegnare i landmark SIA per
     ancorare i punti d'allarme: così i punti non risultano mai sfasati. */
  const LAND = {
    pube: 0.80,        // pavimento pelvico / sinfisi pubica
    cresta: 0.96,      // creste iliache
    ombelico: 1.28,    // ombelico
    arcata: 1.55,      // margine costale (arcata) — apice epigastrio
    capezzoli: 1.82,   // linea mammillare (~4° spazio intercostale)
    capX: 0.24,        // semi-distanza orizzontale capezzoli
    giugulo: 2.12      // incisura giugulare (base del collo)
  };

  // profilo (r,y) del torso, condiviso tra mesh e calcolo superficie
  const TORSO_PROFILE = [
    [0.60,0.02],[0.64,0.20],[0.72,0.33],[0.82,0.40],[0.92,0.405],[1.02,0.36],
    [1.14,0.315],[1.20,0.315],[1.30,0.35],[1.44,0.385],[1.56,0.40],[1.68,0.435],
    [1.82,0.475],[1.96,0.505],[2.06,0.495],[2.14,0.44],[2.22,0.32],[2.28,0.17]
  ]; // [y, r]
  const TORSO_ZSCALE = 0.64;
  function torsoR(y) {
    const p = TORSO_PROFILE;
    if (y <= p[0][0]) return p[0][1];
    if (y >= p[p.length-1][0]) return p[p.length-1][1];
    for (let i=0;i<p.length-1;i++){
      const [y0,r0]=p[i],[y1,r1]=p[i+1];
      if (y>=y0 && y<=y1){ const t=(y-y0)/(y1-y0); return r0+(r1-r0)*t; }
    }
    return 0.4;
  }
  // z sulla superficie del torso a (x,y); front=true fronte, false retro
  function surfaceZ(x, y, front) {
    const rx = torsoR(y), rz = rx * TORSO_ZSCALE;
    const frac = rx > 0 ? Math.min(1, Math.abs(x)/rx) : 0;
    const z = rz * Math.sqrt(Math.max(0.35, 1 - frac*frac));
    return front ? z + 0.03 : -(z + 0.03);
  }

  function themeColors() {
    const dark = document.body.classList.contains("dark");
    return {
      bg: dark ? 0x0e141b : 0xeef2f5,
      body: dark ? 0x2b3a49 : 0xcdd8e0,
      bodyEmis: dark ? 0x0a1016 : 0x000000,
      point: 0xff5a4d,
      pointHi: 0xffd23f,
      landmark: dark ? 0x2a3a4a : 0xaab8c6,
      landmarkHi: dark ? 0x5b7286 : 0x8aa0b4,
      brief: dark ? 0x2b4d7a : 0x3f6ea8,
      lmMarker: dark ? 0x4fc3e0 : 0x1499c7,
      lmMarkerHi: dark ? 0x9fe8ff : 0x63c8ec,
      grid: dark ? 0x1c2836 : 0xdae2e8
    };
  }

  // profilo (r,y) del tronco, rivoluzionato in un solido organico
  function torsoLathe(THREE) {
    const pts = [];
    const P = (r, y) => pts.push(new THREE.Vector2(r, y));
    P(0.02, 0.60);
    P(0.20, 0.64);
    P(0.33, 0.72);   // bacino
    P(0.40, 0.82);   // creste iliache
    P(0.405, 0.92);  // anche
    P(0.36, 1.02);   // vita
    P(0.315, 1.14);  // punto vita (più stretto)
    P(0.315, 1.20);
    P(0.35, 1.30);   // addome basso
    P(0.385, 1.44);  // addome (livello ombelico)
    P(0.40, 1.56);   // arcata costale
    P(0.435, 1.68);  // margine costale
    P(0.475, 1.82);  // basso torace
    P(0.505, 1.96);  // torace (max ampiezza pettorale)
    P(0.495, 2.06);  // petto alto
    P(0.44, 2.14);   // clavicole
    P(0.32, 2.22);   // trapezio/base collo
    P(0.17, 2.28);   // base collo
    P(0.04, 2.31);
    const geo = new THREE.LatheGeometry(pts, 64);
    geo.scale(1, 1, 0.64);   // sezione ellittica (profondità < larghezza)
    return geo;
  }

  function makeBody() {
    const g = new THREE.Group();
    const col = themeColors();
    const mat = new THREE.MeshStandardMaterial({ color: col.body, roughness: 0.8, metalness: 0.04, emissive: col.bodyEmis, flatShading: false });
    const add = (geo, x, y, z, rx, ry, rz, sx, sy, sz) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      if (rx || ry || rz) m.rotation.set(rx || 0, ry || 0, rz || 0);
      if (sx != null || sy != null || sz != null) m.scale.set(sx == null ? 1 : sx, sy == null ? 1 : sy, sz == null ? 1 : sz);
      m.userData.bodyPart = true;
      g.add(m); return m;
    };

    // ----- Tronco (un unico solido organico) -----
    add(torsoLathe(THREE), 0, 0, 0);

    // ----- Collo + testa + viso -----
    add(new THREE.CylinderGeometry(0.115, 0.14, 0.20, 28), 0, 2.34, 0);
    add(new THREE.SphereGeometry(0.27, 48, 40), 0, 2.62, 0.01, 0,0,0, 1, 1.15, 1.02); // cranio
    add(new THREE.SphereGeometry(0.20, 24, 20), 0, 2.50, 0.12, 0,0,0, 0.9, 1.0, 0.7); // volto/mascella
    add(new THREE.SphereGeometry(0.05, 12, 10), 0, 2.53, 0.28); // naso
    add(new THREE.SphereGeometry(0.035, 12, 10), 0.09, 2.60, 0.24); // occhio dx
    add(new THREE.SphereGeometry(0.035, 12, 10), -0.09, 2.60, 0.24); // occhio sx
    add(new THREE.SphereGeometry(0.05, 12, 10), 0.27, 2.60, 0.02, 0,0,0, 0.6,1,1); // orecchio dx
    add(new THREE.SphereGeometry(0.05, 12, 10), -0.27, 2.60, 0.02, 0,0,0, 0.6,1,1); // orecchio sx

    // ----- Spalle (deltoidi) -----
    add(new THREE.SphereGeometry(0.19, 22, 18), 0.52, 2.02, 0, 0,0,0, 1,0.95,1);
    add(new THREE.SphereGeometry(0.19, 22, 18), -0.52, 2.02, 0, 0,0,0, 1,0.95,1);

    // ----- Braccia articolate (omero + gomito + avambraccio + mano) -----
    const arm = (s) => {
      add(new THREE.CylinderGeometry(0.115, 0.10, 0.62, 18), s*0.60, 1.66, 0, 0,0,s*0.06);   // braccio
      add(new THREE.SphereGeometry(0.10, 16, 14), s*0.66, 1.34, 0);                            // gomito
      add(new THREE.CylinderGeometry(0.095, 0.075, 0.58, 18), s*0.70, 1.04, 0.02, 0.12,0,s*0.05); // avambraccio
      add(new THREE.SphereGeometry(0.09, 16, 14), s*0.74, 0.74, 0.05, 0,0,0, 0.8,1.1,0.5);     // mano
    };
    arm(1); arm(-1);

    // ----- Landmark anatomici di riferimento (aiutano a localizzare i punti) -----
    const lmMat = new THREE.MeshStandardMaterial({ color: col.landmark, roughness: 0.9, metalness: 0, emissive: col.bodyEmis });
    const lmMatHi = new THREE.MeshStandardMaterial({ color: col.landmarkHi, roughness: 0.8, metalness: 0, emissive: col.bodyEmis });
    const lm = (geo, x, y, z, rx, ry, rz, sx, sy, sz, hi) => {
      const m = new THREE.Mesh(geo, hi ? lmMatHi : lmMat);
      m.position.set(x, y, z);
      if (rx || ry || rz) m.rotation.set(rx||0, ry||0, rz||0);
      if (sx != null || sy != null || sz != null) m.scale.set(sx==null?1:sx, sy==null?1:sy, sz==null?1:sz);
      m.userData.bodyPart = true; m.userData.landmark = true; m.userData.landmarkHi = !!hi; g.add(m); return m;
    };
    const zf = (x,y) => surfaceZ(x, y, true);

    // --- Capezzoli (linea mammillare) ---
    lm(new THREE.SphereGeometry(0.028, 16, 14),  LAND.capX, LAND.capezzoli, zf( LAND.capX, LAND.capezzoli)+0.005, 0,0,0, 1,1,1, true);
    lm(new THREE.SphereGeometry(0.028, 16, 14), -LAND.capX, LAND.capezzoli, zf(-LAND.capX, LAND.capezzoli)+0.005, 0,0,0, 1,1,1, true);

    // --- Ombelico (fossetta) ---
    lm(new THREE.SphereGeometry(0.032, 16, 14), 0, LAND.ombelico, zf(0, LAND.ombelico)-0.01, 0,0,0, 1,1,0.6, true);

    // --- Incisura giugulare (base collo) ---
    lm(new THREE.SphereGeometry(0.026, 14, 12), 0, LAND.giugulo, zf(0, LAND.giugulo)-0.01);

    // --- Linea mediana (sterno → pube): sottile solco di riferimento ---
    lm(new THREE.CylinderGeometry(0.006, 0.006, LAND.giugulo - LAND.pube, 10),
       0, (LAND.giugulo + LAND.pube)/2, zf(0, (LAND.giugulo+LAND.pube)/2)+0.01, 0.05,0,0);

    // --- Arcata costale (margine costale): due archi obliqui a V dal centro verso i fianchi ---
    (function ribArc(){
      const seg = 7;
      for (let side = -1; side <= 1; side += 2) {
        for (let i = 0; i < seg; i++) {
          const t = i / (seg - 1);                 // 0=centro(alto) .. 1=fianco(basso)
          const x = side * (0.02 + t * 0.36);
          const y = LAND.arcata + 0.10 - t * 0.30; // scende verso i lati
          lm(new THREE.SphereGeometry(0.016, 10, 8), x, y, zf(x, y)+0.004);
        }
      }
    })();

    // --- Gabbia toracica: 3 coppie di archi costali brevi sopra l\'arcata ---
    (function ribs(){
      const levels = [LAND.arcata + 0.14, LAND.arcata + 0.28, LAND.capezzoli + 0.02];
      levels.forEach((yBase, li) => {
        const seg = 6, spread = 0.30 + li*0.03;
        for (let side=-1; side<=1; side+=2){
          for (let i=0;i<seg;i++){
            const t=i/(seg-1);
            const x=side*(0.06 + t*spread);
            const y=yBase + Math.sin(t*Math.PI)*0.05 - t*0.02;
            lm(new THREE.SphereGeometry(0.012, 8, 6), x, y, zf(x,y)+0.003);
          }
        }
      });
    })();

    // --- Creste iliache (bacino) ---
    (function iliac(){
      const seg=5;
      for (let side=-1; side<=1; side+=2){
        for (let i=0;i<seg;i++){
          const t=i/(seg-1);
          const x=side*(0.10 + t*0.26);
          const y=LAND.cresta + t*0.05;
          lm(new THREE.SphereGeometry(0.013, 8, 6), x, y, zf(x,y)+0.003);
        }
      }
    })();

    // --- Pavimento pelvico / sinfisi pubica (arco basso) ---
    (function pube(){
      const seg=7;
      for (let i=0;i<seg;i++){
        const t=i/(seg-1);
        const x=(t-0.5)*0.30;
        const y=LAND.pube - Math.cos((t-0.5)*Math.PI)*0.03;
        lm(new THREE.SphereGeometry(0.014, 8, 6), x, y, zf(x,y)+0.003, 0,0,0, 1,1,1, true);
      }
    })();

    // ===== RETRO: colonna vertebrale + costole posteriori =====
    const zb = (x,y) => surfaceZ(x, y, false);   // superficie posteriore

    // --- Colonna vertebrale (serie di vertebre lungo la mediana posteriore) ---
    (function spine(){
      const yTop = LAND.giugulo + 0.06, yBot = LAND.pube + 0.02;
      const n = 17;
      for (let i=0;i<n;i++){
        const t=i/(n-1);
        const y=yTop - t*(yTop-yBot);
        const r = 0.026 - 0.006*Math.sin(t*Math.PI);      // leggermente affusolata
        lm(new THREE.SphereGeometry(r, 10, 8), 0, y, zb(0,y)-0.004, 0,0,0, 1,0.85,1);
      }
    })();

    // --- Costole posteriori: archi che partono dalla colonna verso i fianchi ---
    (function backRibs(){
      const levels = [LAND.arcata+0.02, LAND.arcata+0.16, LAND.arcata+0.30, LAND.capezzoli+0.06, LAND.capezzoli+0.20];
      levels.forEach((yBase) => {
        const seg=7, spread=0.34;
        for (let side=-1; side<=1; side+=2){
          for (let i=1;i<seg;i++){        // parte da i=1 per non sovrapporsi alla colonna
            const t=i/(seg-1);
            const x=side*(t*spread);
            const y=yBase - t*0.10;       // gli archi scendono verso i lati
            lm(new THREE.SphereGeometry(0.013, 8, 6), x, y, zb(x,y)-0.003);
          }
        }
      });
    })();

    // --- Scapole (accenno, per orientarsi sul retro alto) ---
    (function scapole(){
      for (let side=-1; side<=1; side+=2){
        const x=side*0.24, y=LAND.capezzoli+0.14;
        lm(new THREE.SphereGeometry(0.05, 12, 10), x, y, zb(x,y)-0.01, 0,0,0, 1,1.3,0.5);
      }
    })();

    // ===== MUTANDE / SLIP (copre la zona pelvica, fronte + retro) =====
    (function slip(){
      const col2 = themeColors();
      const briefMat = new THREE.MeshStandardMaterial({ color: col2.brief, roughness: 0.7, metalness: 0.02, emissive: col2.bodyEmis });
      const brief = (geo, x, y, z, rx, ry, rz, sx, sy, sz) => {
        const m = new THREE.Mesh(geo, briefMat);
        m.position.set(x, y, z);
        if (rx||ry||rz) m.rotation.set(rx||0, ry||0, rz||0);
        if (sx!=null||sy!=null||sz!=null) m.scale.set(sx==null?1:sx, sy==null?1:sy, sz==null?1:sz);
        m.userData.bodyPart = true; m.userData.brief = true; g.add(m); return m;
      };
      // fascia in vita (anello attorno al bacino, appena sopra il pube)
      brief(new THREE.CylinderGeometry(torsoR(LAND.pube+0.10)+0.015, torsoR(LAND.pube+0.02)+0.02, 0.30, 40, 1, true),
            0, LAND.pube+0.02, 0, 0,0,0, 1,1,TORSO_ZSCALE);
      // fondo/cavallo (chiude sotto tra le gambe)
      brief(new THREE.SphereGeometry(0.30, 28, 20), 0, LAND.pube-0.14, 0, 0,0,0, 1,0.6,TORSO_ZSCALE);
    })();

    // ----- Glutei/bacino inferiore -----
    add(new THREE.SphereGeometry(0.22, 22, 18), 0.16, 0.60, -0.06, 0,0,0, 1,0.8,1);
    add(new THREE.SphereGeometry(0.22, 22, 18), -0.16, 0.60, -0.06, 0,0,0, 1,0.8,1);

    // ----- Gambe articolate (coscia + ginocchio + polpaccio + piede) -----
    const leg = (s) => {
      add(new THREE.CylinderGeometry(0.175, 0.13, 0.90, 20), s*0.20, 0.18, 0);      // coscia
      add(new THREE.SphereGeometry(0.135, 18, 16), s*0.21, -0.30, 0.01);            // ginocchio
      add(new THREE.CylinderGeometry(0.125, 0.085, 0.86, 20), s*0.22, -0.74, 0);    // polpaccio
      add(new THREE.SphereGeometry(0.10, 16, 14), s*0.22, -1.18, 0);                // caviglia
      add(new THREE.BoxGeometry(0.16, 0.11, 0.34), s*0.22, -1.24, 0.10);            // piede
    };
    leg(1); leg(-1);

    return g;
  }

  function numberSprite(n) {
    const s = 128;
    const cv = document.createElement("canvas"); cv.width = cv.height = s;
    const ctx = cv.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 84px system-ui, Arial, sans-serif";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.lineWidth = 10; ctx.strokeStyle = "rgba(0,0,0,0.55)";
      ctx.strokeText(String(n), s/2, s/2 + 4);
      ctx.fillText(String(n), s/2, s/2 + 4);
    }
    const tex = new THREE.CanvasTexture(cv);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
    const sp = new THREE.Sprite(mat);
    sp.scale.set(0.17, 0.17, 0.17);
    sp.position.set(0, 0.14, 0);      // sopra il pallino
    sp.userData.numberSprite = true;
    return sp;
  }

  function markerColorFor(p) {
    const col = themeColors();
    return p.kind === "landmark" ? col.lmMarker : col.point;
  }
  function addMarker(p) {
    const col = themeColors();
    const isLm = p.kind === "landmark";
    const geo = new THREE.SphereGeometry(isLm ? 0.05 : 0.062, 24, 18);
    const m = new THREE.MeshStandardMaterial({ color: markerColorFor(p), emissive: isLm ? 0x102028 : 0x7a1810, emissiveIntensity: 0.5, roughness: 0.4 });
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(p.pos.x, p.pos.y, p.pos.z);
    mesh.userData.punto = p;
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(isLm ? 0.08 : 0.10, 18, 14),
      new THREE.MeshBasicMaterial({ color: isLm ? col.lmMarkerHi : col.pointHi, transparent: true, opacity: 0.16 })
    );
    mesh.add(halo);
    if (!isLm && THREE.CanvasTexture && THREE.Sprite) {
      const n = DATA.indexOf(p) + 1;
      if (n > 0) mesh.add(numberSprite(n));
    }
    pointsGroup.add(mesh);
    markerMeshes.push(mesh);
    return mesh;
  }
  function makeMarkers() {
    pointsGroup = new THREE.Group();
    markerMeshes = [];
    ITEMS.forEach((p) => addMarker(p));
    return pointsGroup;
  }

  function initScene() {
    THREE = window.THREE;
    if (!THREE) { canvasWrap.innerHTML = '<p class="placeholder" style="padding:20px">Motore 3D non disponibile.</p>'; return false; }
    const col = themeColors();
    const w = canvasWrap.clientWidth || 600, h = canvasWrap.clientHeight || 480;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(col.bg);
    target = new THREE.Vector3(0, 1.2, 0);

    camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    canvasWrap.innerHTML = "";
    canvasWrap.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x404050, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 0.8); key.position.set(3, 6, 5); scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.35); fill.position.set(-4, 2, -3); scene.add(fill);

    // fissa z dei landmark editabili sulla superficie (se non già salvato)
    LANDMARKS.forEach((p) => {
      if (!p.pos.z) p.pos.z = round3(surfaceZ(p.pos.x, p.pos.y, p._front) + (p._front ? 0.005 : -0.005));
    });
    // snapshot per il Reset
    ORIGINAL = ITEMS.map((p) => ({ id: p.id, x: p.pos.x, y: p.pos.y, z: p.pos.z }));

    bodyGroup = makeBody(); scene.add(bodyGroup);
    pointsGroup = makeMarkers(); scene.add(pointsGroup);

    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    bindControls();
    updateCamera();
    return true;
  }

  function updateCamera() {
    const cp = Math.max(-1.2, Math.min(1.2, pitch));
    pitch = cp;
    const x = target.x + dist * Math.cos(cp) * Math.sin(yaw);
    const y = target.y + dist * Math.sin(cp);
    const z = target.z + dist * Math.cos(cp) * Math.cos(yaw);
    camera.position.set(x, y, z);
    camera.lookAt(target);
  }

  function bindControls() {
    const dom = renderer.domElement;
    const down = (x, y) => {
      // In modalità editor: se premo su un marker, inizio a trascinare IL PUNTO
      if (editing) {
        const m = markerAt(x, y);
        if (m) { draggingPoint = m; dragMoved = false; selectPoint(m.userData.punto); return; }
      }
      dragging = true; dragMoved = false; lastX = x; lastY = y;
    };
    const move = (x, y) => {
      if (draggingPoint) { dragMoved = true; movePointTo(draggingPoint, x, y); return; }
      if (!dragging) return;
      const dx = x - lastX, dy = y - lastY;
      if (Math.abs(dx) + Math.abs(dy) > 3) dragMoved = true;
      yaw -= dx * 0.008; pitch += dy * 0.006;
      lastX = x; lastY = y; updateCamera();
    };
    const up = () => { dragging = false; draggingPoint = null; };
    dom.addEventListener("mousedown", (e) => down(e.clientX, e.clientY));
    window.addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
    window.addEventListener("mouseup", up);
    dom.addEventListener("touchstart", (e) => { const t = e.touches[0]; down(t.clientX, t.clientY); }, { passive: true });
    dom.addEventListener("touchmove", (e) => { const t = e.touches[0]; move(t.clientX, t.clientY); }, { passive: true });
    dom.addEventListener("touchend", up);
    dom.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (editing && picked) { nudgeDepth(e.deltaY < 0 ? 0.01 : -0.01); return; }  // regola profondità
      dist = Math.max(3.2, Math.min(11, dist + e.deltaY * 0.01)); updateCamera();
    }, { passive: false });
    // pinch zoom
    let pinch0 = null;
    dom.addEventListener("touchstart", (e) => { if (e.touches.length === 2) pinch0 = pdist(e); }, { passive: true });
    dom.addEventListener("touchmove", (e) => {
      if (e.touches.length === 2 && pinch0) { const d = pdist(e); dist = Math.max(3.2, Math.min(11, dist * pinch0 / d)); pinch0 = d; updateCamera(); }
    }, { passive: true });
    dom.addEventListener("touchend", () => { pinch0 = null; });
    // click / tap to pick
    dom.addEventListener("click", (e) => { if (!dragMoved) pick(e.clientX, e.clientY); });
    dom.addEventListener("mousemove", (e) => hover(e.clientX, e.clientY));
  }
  function pdist(e){ const a=e.touches[0], b=e.touches[1]; return Math.hypot(a.clientX-b.clientX, a.clientY-b.clientY); }

  function ndc(cx, cy) {
    const r = renderer.domElement.getBoundingClientRect();
    pointer.x = ((cx - r.left) / r.width) * 2 - 1;
    pointer.y = -((cy - r.top) / r.height) * 2 + 1;
  }

  function pick(cx, cy) {
    ndc(cx, cy);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(markerMeshes, false)[0];
    if (hit) selectPoint(hit.object.userData.punto);
  }

  /* ---------- Editor: helper ---------- */
  function markerAt(cx, cy) {
    ndc(cx, cy);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(markerMeshes, true)[0];
    if (!hit) return null;
    let o = hit.object;
    while (o && !o.userData.punto) o = o.parent;   // il colpo può essere l'alone/sprite figlio
    return o && o.userData.punto ? o : null;
  }

  // sposta il punto trascinato sulla superficie del corpo sotto il cursore
  function movePointTo(marker, cx, cy) {
    ndc(cx, cy);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(bodyGroup.children, true);
    // scarta i landmark/marker: prendo il primo pezzo di CORPO
    let hit = null;
    for (const h of hits) {
      let o = h.object;
      if (o.userData && o.userData.landmark) continue;
      hit = h; break;
    }
    const p = marker.userData.punto;
    if (hit) {
      const pt = hit.point;
      p.pos.x = round3(pt.x); p.pos.y = round3(pt.y); p.pos.z = round3(pt.z);
      p.vista = pt.z < 0 ? "retro" : "fronte";
      marker.position.set(p.pos.x, p.pos.y, p.pos.z);
      renderInfo(p);
    }
  }

  function round3(v) { return Math.round(v * 1000) / 1000; }

  // regola la profondità (|z|) del punto selezionato mantenendo x,y
  function nudgeDepth(delta) {
    if (!picked) return;
    const sign = picked.pos.z < 0 ? -1 : 1;
    let mag = Math.abs(picked.pos.z) + delta;
    mag = Math.max(0.02, Math.min(0.7, mag));
    picked.pos.z = round3(sign * mag);
    const m = markerMeshes.find((mm) => mm.userData.punto.id === picked.id);
    if (m) m.position.set(picked.pos.x, picked.pos.y, picked.pos.z);
    renderInfo(picked);
  }
  function hover(cx, cy) {
    if (dragging) return;
    ndc(cx, cy);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(markerMeshes, false)[0];
    const dom = renderer.domElement;
    dom.style.cursor = hit ? "pointer" : "grab";
  }

  function selectPoint(p) {
    picked = p;
    const col = themeColors();
    markerMeshes.forEach((m) => {
      const q = m.userData.punto;
      const on = q.id === p.id;
      const base = q.kind === "landmark" ? col.lmMarker : col.point;
      const hi = q.kind === "landmark" ? col.lmMarkerHi : col.pointHi;
      m.material.color.set(on ? hi : base);
      m.scale.setScalar(on ? 1.5 : 1);
    });
    renderInfo(p);
    // highlight list
    if (listEl) Array.from(listEl.children).forEach((li) => li.classList.toggle("active", li.dataset.id === p.id));
    // gently rotate to face the point
    const facingBack = p.pos.z < 0;
    const goalYaw = facingBack ? Math.PI : 0;
    animateYaw(goalYaw);
  }

  let yawAnim = null;
  function animateYaw(goal) {
    if (yawAnim) cancelAnimationFrame(yawAnim);
    // normalize current yaw near goal
    while (yaw - goal > Math.PI) yaw -= 2 * Math.PI;
    while (goal - yaw > Math.PI) yaw += 2 * Math.PI;
    const step = () => {
      yaw += (goal - yaw) * 0.15;
      updateCamera();
      if (Math.abs(goal - yaw) > 0.005) yawAnim = requestAnimationFrame(step);
    };
    step();
  }

  function renderInfo(p) {
    if (!infoEl) return;
    const rows = [];
    if (p.riferimento) rows.push(["Riferimento", p.riferimento]);
    if (p.regione) rows.push(["Regione", p.regione]);
    rows.push(["Vista", p.vista === "retro" ? "Posteriore (retro)" : "Anteriore (fronte)"]);
    if (p.lato) rows.push(["Lato", p.lato]);
    if (p.meridiano) rows.push(["Meridiano", p.meridiano]);
    const isLm = p.kind === "landmark";
    const idx = DATA.indexOf(p);
    const dotTxt = isLm ? "◇" : (idx + 1);
    let editHtml = "";
    if (editing) {
      const fields = isLm ? "" :
        '<label class="pinfo__field">Nome<input type="text" id="fOrgano" value="' + esc(p.organo) + '"></label>' +
        '<label class="pinfo__field">Meridiano<input type="text" id="fMer" value="' + esc(p.meridiano || "") + '"></label>' +
        '<label class="pinfo__field">Note<input type="text" id="fNote" value="' + esc(p.note || "") + '"></label>';
      editHtml =
        fields +
        '<dl class="pinfo__dl pinfo__coords">' +
        '<dt>x</dt><dd>' + p.pos.x.toFixed(3) + '</dd>' +
        '<dt>y</dt><dd>' + p.pos.y.toFixed(3) + '</dd>' +
        '<dt>z</dt><dd>' + p.pos.z.toFixed(3) + '</dd></dl>' +
        '<div class="pinfo__depth"><button type="button" id="depthMinus" aria-label="Meno profondità">−</button>' +
        '<span>profondità</span>' +
        '<button type="button" id="depthPlus" aria-label="Più profondità">+</button></div>' +
        (!isLm && p._added ? '<button type="button" id="delPoint" class="ebtn ebtn--danger">🗑 Elimina punto</button>' : '');
    }
    infoEl.innerHTML =
      '<div class="pinfo__head"><span class="pinfo__dot' + (isLm ? ' pinfo__dot--lm' : '') + '">' + dotTxt + '</span><h3>' + esc(p.organo) + '</h3></div>' +
      (p.note ? '<p class="pinfo__note">' + esc(p.note) + '</p>' : '') +
      '<dl class="pinfo__dl">' +
      rows.map(([k, v]) => '<dt>' + esc(k) + '</dt><dd>' + esc(v) + '</dd>').join("") +
      '</dl>' + editHtml;
    infoEl.hidden = false;
    if (editing) {
      const mn = document.getElementById("depthMinus"), pl = document.getElementById("depthPlus");
      if (mn) mn.addEventListener("click", () => nudgeDepth(-0.02));
      if (pl) pl.addEventListener("click", () => nudgeDepth(0.02));
      const fo = document.getElementById("fOrgano"), fm = document.getElementById("fMer"), fn = document.getElementById("fNote");
      if (fo) fo.addEventListener("input", (e) => { p.organo = e.target.value; buildList(); });
      if (fm) fm.addEventListener("input", (e) => { p.meridiano = e.target.value; });
      if (fn) fn.addEventListener("input", (e) => { p.note = e.target.value; });
      const dp = document.getElementById("delPoint");
      if (dp) dp.addEventListener("click", () => removePoint(p.id));
    }
  }

  function rowFor(p, num) {
    const li = document.createElement("button");
    li.className = "punti__li" + (p.kind === "landmark" ? " punti__li--lm" : "");
    li.type = "button";
    li.dataset.id = p.id;
    const dot = p.kind === "landmark"
      ? '<span class="punti__li-dot punti__li-dot--lm" aria-hidden="true">◇</span>'
      : '<span class="punti__li-dot" aria-hidden="true">' + num + '</span>';
    let del = "";
    if (editing && p.kind !== "landmark" && p._added)
      del = '<span class="punti__li-del" data-del="' + esc(p.id) + '" title="Elimina">🗑</span>';
    li.innerHTML = dot +
      '<span class="punti__li-name">' + esc(p.organo) + '</span>' +
      '<span class="punti__li-tag">' + (p.vista === "retro" ? "retro" : "fronte") + '</span>' + del;
    li.addEventListener("click", (e) => {
      if (e.target && e.target.dataset && e.target.dataset.del) { removePoint(e.target.dataset.del); return; }
      selectPoint(p);
    });
    return li;
  }
  function buildList() {
    if (!listEl) return;
    listEl.innerHTML = "";
    DATA.forEach((p, i) => listEl.appendChild(rowFor(p, i + 1)));
    // separatore + landmark
    const h = document.createElement("div");
    h.className = "punti__listsub";
    h.textContent = "Riferimenti anatomici";
    listEl.appendChild(h);
    LANDMARKS.forEach((p) => listEl.appendChild(rowFor(p)));
  }

  function loop() {
    if (!running) return;
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(loop);
  }

  function resize() {
    if (!renderer) return;
    const w = canvasWrap.clientWidth || 600, h = canvasWrap.clientHeight || 480;
    renderer.setSize(w, h);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  function resizeSoon() { resize(); setTimeout(resize, 250); setTimeout(resize, 600); }
  window.addEventListener("resize", resize);
  window.addEventListener("orientationchange", resizeSoon);
  if (window.visualViewport) window.visualViewport.addEventListener("resize", resize);

  function retheme() {
    if (!scene) return;
    const col = themeColors();
    scene.background = new THREE.Color(col.bg);
    bodyGroup.traverse((o) => {
      if (o.isMesh && o.userData.bodyPart) {
        o.material.color.set(
          o.userData.brief ? col.brief :
          o.userData.landmarkHi ? col.landmarkHi :
          o.userData.landmark ? col.landmark : col.body
        );
        o.material.emissive.set(col.bodyEmis);
      }
    });
    markerMeshes.forEach((m) => {
      if (picked && m.userData.punto.id === picked.id) return;
      m.material.color.set(m.userData.punto.kind === "landmark" ? col.lmMarker : col.point);
    });
  }

  /* ---------- Editor: attiva/disattiva, export, reset ---------- */
  function setEditing(on) {
    editing = !!on;
    document.body.classList.toggle("editing", editing);
    if (picked) renderInfo(picked);
  }

  function exportJSON() {
    // ricostruisce il file completo con le posizioni correnti
    const src = window.PUNTI_INDICATORI || {};
    const out = {
      titolo: src.titolo || "Punti d'Allarme",
      descrizione: src.descrizione || "",
      punti: DATA.map((p) => ({
        id: p.id, organo: p.organo, meridiano: p.meridiano, vista: p.vista,
        lato: p.lato, regione: p.regione, riferimento: p.riferimento, note: p.note,
        pos: { x: round3(p.pos.x), y: round3(p.pos.y), z: round3(p.pos.z) }
      })),
      landmarks: LANDMARKS.map((p) => ({
        id: p.id, organo: p.organo,
        pos: { x: round3(p.pos.x), y: round3(p.pos.y), z: round3(p.pos.z) }
      }))
    };
    const text = JSON.stringify(out, null, 2);
    try {
      const blob = new Blob([text], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "punti_indicatori.json";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      // fallback: apri il JSON in una nuova finestra
      const w = window.open("", "_blank");
      if (w) { w.document.write("<pre>" + esc(text) + "</pre>"); }
    }
    return text;
  }

  function resetPositions() {
    ORIGINAL.forEach((orig) => {
      const p = ITEMS.find((it) => it.id === orig.id);
      if (!p) return;
      p.pos.x = orig.x; p.pos.y = orig.y; p.pos.z = orig.z;
      p.vista = p.pos.z < 0 ? "retro" : "fronte";
      const m = markerMeshes.find((mm) => mm.userData.punto.id === p.id);
      if (m) m.position.set(p.pos.x, p.pos.y, p.pos.z);
    });
    if (picked) renderInfo(picked);
  }

  /* ---------- Editor: aggiungi / elimina punto ---------- */
  let addSeq = 0;
  function addPoint() {
    addSeq++;
    const id = "nuovo-" + Date.now() + "-" + addSeq;
    const y = 1.4, x = 0;
    const p = {
      id: id, organo: "Nuovo punto " + addSeq, meridiano: "", vista: "fronte",
      lato: "", regione: "", riferimento: "", note: "",
      pos: { x: x, y: y, z: round3(surfaceZ(x, y, true)) }, _added: true
    };
    DATA.push(p);
    ITEMS = DATA.concat(LANDMARKS);
    ORIGINAL.push({ id: id, x: p.pos.x, y: p.pos.y, z: p.pos.z });
    if (pointsGroup) addMarker(p);
    buildList();
    selectPoint(p);
    return p;
  }
  function removePoint(id) {
    const idx = DATA.findIndex((p) => p.id === id);
    if (idx < 0) return;
    const mi = markerMeshes.findIndex((m) => m.userData.punto.id === id);
    if (mi >= 0) {
      const m = markerMeshes[mi];
      if (pointsGroup && m.parent) m.parent.remove(m);
      markerMeshes.splice(mi, 1);
    }
    DATA.splice(idx, 1);
    ITEMS = DATA.concat(LANDMARKS);
    if (picked && picked.id === id) { picked = null; if (infoEl) infoEl.hidden = true; }
    buildList();
  }

  // rinomina il punto selezionato (dai campi editabili del pannello)
  function updateField(field, value) {
    if (!picked) return;
    picked[field] = value;
    if (field === "organo") buildList();
  }

  // API pubblica usata dal router in app.js
  window.PuntiMap = {
    activate() {
      if (!inited) {
        buildList();
        const ok = initScene();
        inited = ok;
        if (!ok) return;
        // seleziona il primo punto per dare contesto
        if (DATA[0]) selectPoint(DATA[0]);
      }
      running = true;
      resize();
      loop();
    },
    deactivate() { running = false; if (rafId) cancelAnimationFrame(rafId); },
    retheme: retheme,
    resize: resize,
    setEditing: setEditing,
    isEditing: () => editing,
    exportJSON: exportJSON,
    resetPositions: resetPositions,
    addPoint: addPoint,
    removePoint: removePoint
  };
})();
