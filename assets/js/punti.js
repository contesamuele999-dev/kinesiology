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
  const cssEsc = (s) => String(s == null ? "" : s).replace(/["\\\]]/g, "\\$&");

  let inited = false, THREE, renderer, scene, camera, raycaster, pointer;
  let bodyGroup, pointsGroup, markerMeshes = [], picked = null, hovered = null;
  let rafId = null, running = false;
  // orbit state
  let yaw = 0.5, pitch = 0.05, dist = 6.2, target;
  let dragging = false, lastX = 0, lastY = 0, dragMoved = false;
  // editor
  let editing = false, draggingPoint = null;
  let ORIGINAL = [];
  // meridiani MTC
  let merSel = null, merSelMesh = null, probeMesh = null, probePos = null, SAVED_MER = null;
  let puntiVisibili = true;   // interruttore dei Punti Indicatori

  /* ---------- Persistenza locale (modifiche permanenti sul dispositivo) ----------
     Le posizioni/nomi modificati nell'editor sono salvati in localStorage e
     ricaricati all'avvio, così restano permanenti senza esportare/importare. */
  const STORE_KEY = "kapp-punti-v2";
  function lsGet(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
  function lsSet(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
  function lsDel(k){ try { localStorage.removeItem(k); } catch(e){} }

  // default "di fabbrica" (dal file punti_data.js) — servono per il Reset
  const FACTORY = JSON.parse(JSON.stringify(window.PUNTI_INDICATORI || { punti: [], landmarks: [] }));

  // se esiste una versione salvata, la applico come sorgente corrente
  (function loadSaved(){
    const raw = lsGet(STORE_KEY);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw);
      if (saved && Array.isArray(saved.punti)) {
        window.PUNTI_INDICATORI = window.PUNTI_INDICATORI || {};
        window.PUNTI_INDICATORI.punti = saved.punti;
        window.PUNTI_INDICATORI.landmarks = saved.landmarks || window.PUNTI_INDICATORI.landmarks;
      }
      if (saved && saved.meridiani) SAVED_MER = saved.meridiani;
    } catch(e){ /* JSON corrotto: ignoro e uso i default */ }
  })();

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
    mkLand("lm-ombelico","Ombelico", 0, 1.20, true),
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
    ombelico: 1.20,    // ombelico (5 cun sopra il pube, 8 sotto l'apofisi xifoidea)
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

  /* Il manichino è costruito da assets/js/manichino.js a partire dall'anatomia
     condivisa in assets/js/corpo_data.js (stessa sorgente dei punti dei
     meridiani). Qui passiamo solo i colori del tema e i riferimenti del tronco,
     che restano quelli su cui sono calibrati i punti indicatori del cliente. */
  function makeBody() {
    if (window.Manichino && window.Manichino.build) {
      return window.Manichino.build(THREE, {
        col: themeColors(), LAND: LAND, torsoR: torsoR, surfaceZ: surfaceZ
      });
    }
    // fallback minimo se manichino.js non è disponibile
    const g = new THREE.Group();
    const col = themeColors();
    const mat = new THREE.MeshStandardMaterial({ color: col.body, roughness: 0.8, emissive: col.bodyEmis });
    const pts = TORSO_PROFILE.map((p) => new THREE.Vector2(p[1], p[0]));
    const geo = new THREE.LatheGeometry(pts, 48);
    geo.scale(1, 1, TORSO_ZSCALE);
    const m = new THREE.Mesh(geo, mat);
    m.userData.bodyPart = true;
    g.add(m);
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

    // ----- Meridiani MTC (tracciati + punti principali) -----
    if (window.MeridianiMap) {
      try {
        const mg = window.MeridianiMap.init(THREE);
        if (mg) scene.add(mg);
        if (SAVED_MER) window.MeridianiMap.applyOverrides(SAVED_MER);
        buildMerUI();
      } catch (e) { /* i meridiani sono opzionali: la mappa funziona comunque */ }
    }

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

  /* ---------- orientamento della camera (non tocca zoom e inquadratura) ---------- */
  const VISTE = {
    fronte:   { yaw: 0,            pitch: 0.05 },
    retro:    { yaw: Math.PI,      pitch: 0.05 },
    sinistra: { yaw: Math.PI / 2,  pitch: 0.05 },
    destra:   { yaw: -Math.PI / 2, pitch: 0.05 }
  };
  /* ---------- zone del corpo (spostano il centro e lo zoom) ---------- */
  const ZONE = {
    corpo:  { y: 1.20, d: 6.20 },
    testa:  { y: 2.66, d: 1.45 },
    collo:  { y: 2.20, d: 2.10 },
    tronco: { y: 1.72, d: 2.90 },
    addome: { y: 1.20, d: 2.60 },
    bacino: { y: 0.86, d: 2.60 },
    mani:   { y: 0.52, d: 2.20 },
    gambe:  { y: -0.35, d: 3.40 },
    piedi:  { y: -1.20, d: 1.35 }
  };
  let zonaAttiva = "corpo", vistaAttiva = "fronte";

  function syncBar() {
    const bar = document.getElementById("viewBar");
    if (!bar) return;
    Array.from(bar.querySelectorAll("[data-view]")).forEach((b) => b.classList.toggle("is-on", b.dataset.view === vistaAttiva));
    Array.from(bar.querySelectorAll("[data-zona]")).forEach((b) => b.classList.toggle("is-on", b.dataset.zona === zonaAttiva));
  }
  function setView(nome) {
    const v = VISTE[nome];
    if (!v) { if (ZONE[nome]) return setZona(nome); return; }
    if (!camera) return;
    vistaAttiva = nome;
    yaw = v.yaw; pitch = v.pitch;
    updateCamera(); syncBar();
  }
  function setZona(nome) {
    const z = ZONE[nome]; if (!z || !camera) return;
    zonaAttiva = nome;
    target.set(0, z.y, 0); dist = z.d;
    updateCamera(); syncBar();
  }
  // inquadra da vicino un punto senza cambiare l'angolo di vista
  function focusOn(pos, d) {
    if (!camera || !pos) return;
    target.set(pos.x, pos.y, pos.z);
    dist = d || 1.4;
    zonaAttiva = ""; syncBar();
    updateCamera();
  }
  /* ---------- spostamento dell'inquadratura (pan) ---------- */
  function panBy(dxPx, dyPx) {
    if (!camera) return;
    const h = (renderer && renderer.domElement.clientHeight) || 480;
    const k = (2 * dist * Math.tan((camera.fov * Math.PI / 180) / 2)) / h;   // unità per pixel
    // assi destra/alto della camera
    const rx = Math.cos(yaw), rz = -Math.sin(yaw);
    const ux = -Math.sin(yaw) * Math.sin(pitch), uy = Math.cos(pitch), uz = -Math.cos(yaw) * Math.sin(pitch);
    target.x += -dxPx * k * rx + dyPx * k * ux;
    target.y += dyPx * k * uy;
    target.z += -dxPx * k * rz + dyPx * k * uz;
    target.y = Math.max(-1.6, Math.min(3.4, target.y));
    zonaAttiva = ""; syncBar();
    updateCamera();
  }

  function bindControls() {
    const dom = renderer.domElement;
    let panning = false;
    const down = (x, y, pan) => {
      if (pan) { panning = true; dragging = false; dragMoved = false; lastX = x; lastY = y; return; }
      // In modalità editor: se premo su un marker, inizio a trascinare IL PUNTO
      if (editing) {
        const m = markerAt(x, y);
        if (m) { draggingPoint = m; dragMoved = false; selectPoint(m.userData.punto); return; }
        const mp = merMarkerAt(x, y);
        if (mp) { draggingPoint = mp; dragMoved = false; selectMerPoint(mp.userData.merPunto); return; }
      }
      dragging = true; dragMoved = false; lastX = x; lastY = y;
    };
    const move = (x, y) => {
      if (draggingPoint) { dragMoved = true; movePointTo(draggingPoint, x, y); return; }
      if (panning) {
        const dx = x - lastX, dy = y - lastY;
        if (Math.abs(dx) + Math.abs(dy) > 2) dragMoved = true;
        panBy(dx, dy); lastX = x; lastY = y; return;
      }
      if (!dragging) return;
      const dx = x - lastX, dy = y - lastY;
      if (Math.abs(dx) + Math.abs(dy) > 3) dragMoved = true;
      yaw -= dx * 0.008; pitch += dy * 0.006;
      lastX = x; lastY = y; updateCamera();
    };
    const up = () => { dragging = false; panning = false; draggingPoint = null; };
    dom.addEventListener("contextmenu", (e) => e.preventDefault());
    dom.addEventListener("mousedown", (e) => {
      // tasto destro, tasto centrale o Shift = sposta l'inquadratura
      const pan = e.button === 2 || e.button === 1 || e.shiftKey;
      if (pan) e.preventDefault();
      down(e.clientX, e.clientY, pan);
    });
    // doppio clic sul corpo: lo mette al centro dell'inquadratura
    dom.addEventListener("dblclick", (e) => {
      ndc(e.clientX, e.clientY);
      raycaster.setFromCamera(pointer, camera);
      const h = bodyGroup ? raycaster.intersectObjects(bodyGroup.children, true)[0] : null;
      if (h) focusOn(h.point, Math.max(1.1, dist * 0.65));
    });
    window.addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
    window.addEventListener("mouseup", up);
    dom.addEventListener("touchstart", (e) => { const t = e.touches[0]; down(t.clientX, t.clientY); }, { passive: true });
    dom.addEventListener("touchmove", (e) => { const t = e.touches[0]; move(t.clientX, t.clientY); }, { passive: true });
    dom.addEventListener("touchend", up);
    dom.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (editing && picked) { nudgeDepth(e.deltaY < 0 ? 0.01 : -0.01); return; }  // regola profondità
      dist = Math.max(1.0, Math.min(11, dist + e.deltaY * 0.01 * Math.max(0.35, dist / 6))); updateCamera();
    }, { passive: false });
    // pinch zoom
    let pinch0 = null, mid0 = null;
    const pmid = (e) => ({ x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
                           y: (e.touches[0].clientY + e.touches[1].clientY) / 2 });
    dom.addEventListener("touchstart", (e) => {
      if (e.touches.length === 2) { pinch0 = pdist(e); mid0 = pmid(e); dragging = false; }
    }, { passive: true });
    dom.addEventListener("touchmove", (e) => {
      if (e.touches.length === 2 && pinch0) {
        const d = pdist(e); dist = Math.max(1.0, Math.min(11, dist * pinch0 / d)); pinch0 = d;
        const m = pmid(e);                       // due dita trascinate = sposta l'inquadratura
        if (mid0) panBy(m.x - mid0.x, m.y - mid0.y);
        mid0 = m; updateCamera();
      }
    }, { passive: true });
    dom.addEventListener("touchend", () => { pinch0 = null; mid0 = null; });
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
    // 1) punti indicatori (solo se accesi)
    if (puntiVisibili) {
      const hit = raycaster.intersectObjects(markerMeshes, false)[0];
      if (hit) { selectPoint(hit.object.userData.punto); return; }
    }
    // 2) punti dei meridiani
    const mpts = merVisibleMeshes();
    if (mpts.length) {
      const h2 = raycaster.intersectObjects(mpts, false)[0];
      if (h2) { selectMerPoint(h2.object.userData.merPunto); return; }
    }
    // 3) tracciato di un meridiano
    const tubes = merVisibleTubes();
    if (tubes.length) {
      const h3 = raycaster.intersectObjects(tubes, false)[0];
      if (h3) { selectMeridiano(h3.object.userData.meridiano); return; }
    }
    // 4) punto qualsiasi del corpo -> meridiano più vicino
    if (bodyGroup) {
      const h4 = raycaster.intersectObjects(bodyGroup.children, true)[0];
      if (h4) probeAt(h4.point);
    }
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
    if (marker.userData && marker.userData.merPunto) { moveMerPointTo(marker, cx, cy); return; }
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
      persist();
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
    persist();
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
    if (!puntiVisibili) setPuntiVisible(true);   // riaccende i punti se erano spenti
    // uscendo dai punti Milza/Pancreas il test discriminante riparte da zero
    if (!isMilzaPoint(p)) mpScelta = null;
    picked = p; merSel = null;
    clearProbe();
    if (window.MeridianiMap) { try { window.MeridianiMap.highlight(null); } catch (e) {} }
    syncChips();
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
    tavMark({ kind: "ind", id: p.id });
    // highlight list
    if (listEl) Array.from(listEl.children).forEach((li) => li.classList.toggle("active", li.dataset.id === p.id));
    // NB: nessuna rotazione automatica — la camera resta nel punto di vista scelto dall'utente.
  }

  // cambia fronte/retro del punto: lo riproietta sulla superficie corrispondente (NON tocca la camera)
  function setVista(p, vista) {
    if (!p) return;
    const front = vista !== "retro";
    p.vista = front ? "fronte" : "retro";
    p.pos.z = round3(surfaceZ(p.pos.x, p.pos.y, front) + (front ? 0.005 : -0.005));
    const m = markerMeshes.find((mm) => mm.userData.punto.id === p.id);
    if (m) m.position.set(p.pos.x, p.pos.y, p.pos.z);
    renderInfo(p);
    persist();
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
      const fields =
        '<label class="pinfo__field">Nome<input type="text" id="fOrgano" value="' + esc(p.organo) + '"></label>' +
        (isLm ? "" :
          '<label class="pinfo__field">Meridiano<input type="text" id="fMer" value="' + esc(p.meridiano || "") + '"></label>' +
          '<label class="pinfo__field">Note<input type="text" id="fNote" value="' + esc(p.note || "") + '"></label>');
      editHtml =
        fields +
        '<dl class="pinfo__dl pinfo__coords">' +
        '<dt>x</dt><dd>' + p.pos.x.toFixed(3) + '</dd>' +
        '<dt>y</dt><dd>' + p.pos.y.toFixed(3) + '</dd>' +
        '<dt>z</dt><dd>' + p.pos.z.toFixed(3) + '</dd></dl>' +
        '<div class="pinfo__depth"><button type="button" id="depthMinus" aria-label="Meno profondità">−</button>' +
        '<span>profondità</span>' +
        '<button type="button" id="depthPlus" aria-label="Più profondità">+</button></div>' +
        '<div class="pinfo__vista"><span>Vista</span>' +
        '<button type="button" id="vFronte" class="ebtn ebtn--seg' + (p.vista !== "retro" ? " is-on" : "") + '">Fronte</button>' +
        '<button type="button" id="vRetro" class="ebtn ebtn--seg' + (p.vista === "retro" ? " is-on" : "") + '">Retro</button></div>' +
        (!isLm && p._added ? '<button type="button" id="delPoint" class="ebtn ebtn--danger">🗑 Elimina punto</button>' : '');
    }
    infoEl.innerHTML =
      '<div class="pinfo__head"><span class="pinfo__dot' + (isLm ? ' pinfo__dot--lm' : '') + '">' + dotTxt + '</span><h3>' + esc(p.organo) + '</h3></div>' +
      (p.note ? '<p class="pinfo__note">' + esc(p.note) + '</p>' : '') +
      '<dl class="pinfo__dl">' +
      rows.map(([k, v]) => '<dt>' + esc(k) + '</dt><dd>' + esc(v) + '</dd>').join("") +
      '</dl>' + mpBlockFor(p) + merBlockFor(p) + editHtml;
    infoEl.hidden = false;
    wireMerActions();
    wireMpActions(p);
    if (editing) {
      const mn = document.getElementById("depthMinus"), pl = document.getElementById("depthPlus");
      if (mn) mn.addEventListener("click", () => nudgeDepth(-0.02));
      if (pl) pl.addEventListener("click", () => nudgeDepth(0.02));
      const fo = document.getElementById("fOrgano"), fm = document.getElementById("fMer"), fn = document.getElementById("fNote");
      if (fo) fo.addEventListener("input", (e) => {
        p.organo = e.target.value;
        // aggiorna il titolo del pannello e la voce di lista SENZA ricostruire (mantiene il focus)
        const h = infoEl.querySelector(".pinfo__head h3"); if (h) h.textContent = p.organo;
        const li = listEl && listEl.querySelector('[data-id="' + cssEsc(p.id) + '"] .punti__li-name');
        if (li) li.textContent = p.organo;
        persist();
      });
      if (fm) fm.addEventListener("input", (e) => { p.meridiano = e.target.value; persist(); });
      if (fn) fn.addEventListener("input", (e) => { p.note = e.target.value; persist(); });
      const dp = document.getElementById("delPoint");
      if (dp) dp.addEventListener("click", () => removePoint(p.id));
      const vf = document.getElementById("vFronte"), vr = document.getElementById("vRetro");
      if (vf) vf.addEventListener("click", () => setVista(p, "fronte"));
      if (vr) vr.addEventListener("click", () => setVista(p, "retro"));
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
    if (window.MeridianiMap) { try { window.MeridianiMap.retheme(); } catch (e) {} }
  }

  /* ---------- Editor: attiva/disattiva, export, reset ---------- */
  function setEditing(on) {
    editing = !!on;
    document.body.classList.toggle("editing", editing);
    if (picked) renderInfo(picked);
  }

  function buildExport() {
    const src = window.PUNTI_INDICATORI || {};
    return {
      titolo: src.titolo || "Punti d'Allarme",
      descrizione: src.descrizione || "",
      punti: DATA.map((p) => ({
        id: p.id, organo: p.organo, meridiano: p.meridiano, vista: p.vista,
        lato: p.lato, regione: p.regione, riferimento: p.riferimento, note: p.note,
        _added: !!p._added,
        pos: { x: round3(p.pos.x), y: round3(p.pos.y), z: round3(p.pos.z) }
      })),
      landmarks: LANDMARKS.map((p) => ({
        id: p.id, organo: p.organo,
        pos: { x: round3(p.pos.x), y: round3(p.pos.y), z: round3(p.pos.z) }
      })),
      // modifiche ai tracciati dei meridiani (solo quelli ritoccati nell'editor)
      meridiani: (window.MeridianiMap ? window.MeridianiMap.exportOverrides() : {})
    };
  }

  // salva lo stato corrente in localStorage (modifiche permanenti sul dispositivo)
  function persist() {
    try { lsSet(STORE_KEY, JSON.stringify(buildExport())); } catch(e){}
  }

  function exportJSON() {
    // ricostruisce il file completo con le posizioni correnti
    const out = buildExport();
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
    // ripristina i default "di fabbrica" e cancella le modifiche salvate
    if (!window.confirm("Ripristinare i punti ai valori iniziali? Le modifiche salvate su questo dispositivo verranno cancellate.")) return;
    lsDel(STORE_KEY);
    if (window.MeridianiMap) { try { window.MeridianiMap.resetOverrides(); } catch (e) {} }
    applyData(FACTORY);
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
    persist();
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
    persist();
  }

  // ricostruisce tutti i marker 3D da ITEMS (dopo un import)
  function rebuildMarkers() {
    markerMeshes.forEach((m) => { if (m.parent) m.parent.remove(m); });
    markerMeshes = [];
    ITEMS.forEach((p) => addMarker(p));
  }

  // applica un oggetto {punti, landmarks} allo stato corrente (import o reset)
  function applyData(obj) {
    const inPunti = Array.isArray(obj) ? obj : (obj && obj.punti) || [];
    DATA.length = 0;
    inPunti.forEach((p) => {
      if (!p || !p.pos) return;
      DATA.push({
        id: p.id || ("imp-" + Math.random().toString(36).slice(2, 8)),
        organo: p.organo || "Punto", meridiano: p.meridiano || "",
        vista: (p.pos.z < 0 ? "retro" : "fronte"),
        lato: p.lato || "", regione: p.regione || "",
        riferimento: p.riferimento || "", note: p.note || "",
        pos: { x: +p.pos.x || 0, y: +p.pos.y || 0, z: +p.pos.z || 0 },
        _added: !!p._added || /^(nuovo|imp)-/.test(p.id || "")
      });
    });
    if (obj && Array.isArray(obj.landmarks)) {
      obj.landmarks.forEach((l) => {
        const lm = LANDMARKS.find((x) => x.id === l.id);
        if (lm && l.pos) { lm.pos.x = +l.pos.x || 0; lm.pos.y = +l.pos.y || 0; lm.pos.z = +l.pos.z || 0; lm.vista = lm.pos.z < 0 ? "retro" : "fronte"; }
      });
    }
    if (obj && obj.meridiani && window.MeridianiMap) {
      try { window.MeridianiMap.applyOverrides(obj.meridiani); } catch (e) {}
    }
    ITEMS = DATA.concat(LANDMARKS);
    ORIGINAL = ITEMS.map((p) => ({ id: p.id, x: p.pos.x, y: p.pos.y, z: p.pos.z }));
    picked = null; merSel = null; clearProbe(); if (infoEl) infoEl.hidden = true;
    if (pointsGroup) rebuildMarkers();
    buildList();
    if (DATA[0]) selectPoint(DATA[0]);
  }

  /* ---------- Editor: importa JSON ---------- */
  function importJSON(text) {
    let obj;
    try { obj = JSON.parse(text); } catch (e) { alert("File JSON non valido."); return false; }
    const inPunti = Array.isArray(obj) ? obj : (obj && obj.punti);
    if (!Array.isArray(inPunti)) { alert("JSON non riconosciuto: manca l'elenco 'punti'."); return false; }
    applyData(obj);
    persist();   // le modifiche importate diventano permanenti
    return true;
  }

  // rinomina il punto selezionato (dai campi editabili del pannello)
  function updateField(field, value) {
    if (!picked) return;
    picked[field] = value;
    if (field === "organo") buildList();
  }


  /* ============================================================================
     MERIDIANI MTC — selezione, schede informative e "a quale meridiano
     appartiene questo punto?". La geometria vive in assets/js/meridiani.js.
     ========================================================================== */
  function MM() { return window.MeridianiMap || null; }

  function merVisibleMeshes() {
    const mm = MM(); if (!mm || !mm.pointMeshes) return [];
    return mm.pointMeshes.filter((p) => p.visible && p.parent && p.parent.visible);
  }
  function merVisibleTubes() {
    const mm = MM(); if (!mm || !mm.group) return [];
    const out = [];
    mm.group.children.forEach((g) => {
      if (!g.visible) return;
      (g.children || []).forEach((c) => { if (c.userData && c.userData.tratto) out.push(c); });
    });
    return out;
  }
  function merMarkerAt(cx, cy) {
    const list = merVisibleMeshes(); if (!list.length) return null;
    ndc(cx, cy); raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(list, false)[0];
    return hit ? hit.object : null;
  }
  // distanza in centimetri (manichino normalizzato: 1 unità ≈ 40 cm)
  function cmOf(v) {
    if (v == null) return "";
    const mm = MM(); const c = v * ((mm && mm.UNIT_CM) || 40);
    return (c < 10 ? Math.round(c * 10) / 10 : Math.round(c)) + " cm";
  }
  function merLabel(m) { return m.nome + " (" + m.sigla + ")"; }
  function coordLabel(cid) {
    try {
      if (typeof COORDINATE !== "undefined" && COORDINATE && COORDINATE.length) {
        const c = COORDINATE.find((x) => x.id === cid);
        if (c) return c.muscolo;
      }
    } catch (e) {}
    return cid;
  }

  /* ---------- editor: trascinamento di un punto del meridiano ---------- */
  function moveMerPointTo(marker, cx, cy) {
    const mm = MM(); if (!mm || !bodyGroup) return;
    ndc(cx, cy); raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(bodyGroup.children, true);
    let hit = null;
    for (const h of hits) { if (h.object.userData && h.object.userData.landmark) continue; hit = h; break; }
    if (!hit) return;
    const ref = marker.userData.merPunto;
    mm.moveNode(ref, hit.point.x, hit.point.y, hit.point.z);
    marker.position.set(hit.point.x, hit.point.y, hit.point.z);
    const m = mm.get(ref.merId);
    if (m) renderMerPointInfo(m, ref);
    persist();
  }

  /* ---------- selezione ---------- */
  function selectMerPoint(ref) {
    const mm = MM(); if (!mm) return;
    const m = mm.get(ref.merId); if (!m) return;
    // ripristina la dimensione del punto MTC selezionato in precedenza
    if (merSelMesh) { merSelMesh.scale.setScalar(1); merSelMesh = null; }
    merSel = ref; picked = null; clearProbe();
    const mk = mm.markerFor(ref);
    if (mk) { mk.visible = true; mk.scale.setScalar(1.8); merSelMesh = mk; }
    const col = themeColors();
    markerMeshes.forEach((x) => {
      x.scale.setScalar(1);
      x.material.color.set(x.userData.punto.kind === "landmark" ? col.lmMarker : col.point);
    });
    if (listEl) Array.from(listEl.children).forEach((li) => li.classList && li.classList.remove("active"));
    mm.highlight(m.id);
    syncChips();
    renderMerPointInfo(m, ref);
    tavMark({ kind: "mer", merId: ref.merId, idx: ref.idx, ramo: ref.ramo });
  }

  function selectMeridiano(id) {
    const mm = MM(); if (!mm) return;
    const m = mm.get(id); if (!m) return;
    merSel = { merId: id, idx: -1, side: 1 };
    picked = null; clearProbe();
    mm.highlight(id);
    syncChips();
    renderMerInfo(m);
  }

  /* ---------- probe: click su un punto qualsiasi del corpo ---------- */
  function probeAt(pt) {
    const mm = MM(); if (!mm) return;
    probePos = { x: round3(pt.x), y: round3(pt.y), z: round3(pt.z) };
    if (!probeMesh && THREE) {
      probeMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 18, 14),
        new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x555555, roughness: 0.3 })
      );
      probeMesh.userData.probe = true;
      scene.add(probeMesh);
    }
    if (probeMesh) { probeMesh.visible = true; probeMesh.position.set(probePos.x, probePos.y, probePos.z); }
    picked = null; merSel = null;
    mm.highlight(null);
    syncChips();
    renderProbeInfo(probePos);
  }
  function clearProbe() { if (probeMesh) probeMesh.visible = false; probePos = null; }

  /* ---------- schede ---------- */
  function merDot(m, txt) {
    return '<span class="pinfo__dot pinfo__dot--mer" style="background:' + esc(m.colore) + '">' + esc(txt || m.sigla) + '</span>';
  }
  function merMetaRows(m) {
    const rows = [];
    if (m.elemento && m.elemento !== "—") rows.push(["Elemento", m.elemento]);
    if (m.natura) rows.push(["Natura", m.natura]);
    if (m.orario && m.orario !== "—") rows.push(["Massima energia", m.orario]);
    if (m.coppia) rows.push(["Accoppiato con", m.coppia]);
    return rows;
  }
  function dlOf(rows) {
    if (!rows.length) return "";
    return '<dl class="pinfo__dl">' + rows.map(([k, v]) => '<dt>' + esc(k) + '</dt><dd>' + esc(v) + '</dd>').join("") + '</dl>';
  }
  function merActions(m) {
    let h = '<div class="meractions">';
    h += '<button type="button" class="ebtn ebtn--mini" data-mact="iso" data-mid="' + esc(m.id) + '">Mostra solo questo</button>';
    h += '<button type="button" class="ebtn ebtn--mini" data-mact="all">Mostra tutti</button>';
    (m.coordinate || []).forEach((cid) => {
      h += '<a class="ebtn ebtn--mini ebtn--link" href="#/' + encodeURIComponent(cid) + '">Coordinata: ' + esc(coordLabel(cid)) + '</a>';
    });
    return h + '</div>';
  }

  function renderMerPointInfo(m, ref) {
    if (!infoEl) return;
    const mm = MM();
    const arr = mm.nodiDi(m.id, ref.ramo) || [];
    const n = arr[ref.idx] || {};
    const rows = [["Meridiano", m.nome + " (" + m.sigla + " / " + m.siglaInt + ")"]];
    if (n.nome) rows.push(["Nome cinese", n.nome]);
    if (n.ruolo) rows.push(["Ruolo", n.ruolo]);
    if (ref.ramo) rows.push(["Ramo", m.id === "vescica" ? "linea esterna del dorso (3 cun)" : "ramo secondario"]);
    if (m.bilaterale) rows.push(["Lato", mm.latoLabel(ref.side)]);
    merMetaRows(m).forEach((r) => rows.push(r));
    let editHtml = "";
    if (editing) {
      editHtml = '<p class="merhint">Trascina il punto sul corpo per riposizionarlo: la modifica è salvata su questo dispositivo ed esportata nel JSON.</p>' +
        '<dl class="pinfo__dl pinfo__coords"><dt>x</dt><dd>' + (n.x != null ? n.x.toFixed(3) : "") + '</dd>' +
        '<dt>y</dt><dd>' + (n.y != null ? n.y.toFixed(3) : "") + '</dd>' +
        '<dt>z</dt><dd>' + (n.z != null ? n.z.toFixed(3) : "") + '</dd></dl>';
    }
    infoEl.innerHTML =
      '<div class="pinfo__head">' + merDot(m, n.sigla) + '<h3>' + esc((n.sigla || "") + (n.nome ? " · " + n.nome : "")) + '</h3></div>' +
      (n.note ? '<p class="pinfo__note">' + esc(n.note) + '</p>' : '') +
      dlOf(rows) +
      '<div class="meractions"><button type="button" class="ebtn ebtn--mini" data-mzoom="' +
        esc(String(n.x)) + ',' + esc(String(n.y)) + ',' + esc(String(n.z)) + ',' + (ref.side || 1) +
        '">\u{1F50D} Inquadra il punto</button></div>' +
      merActions(m) + editHtml;
    infoEl.hidden = false;
    wireMerActions();
  }

  function renderMerInfo(m, tutti) {
    if (!infoEl) return;
    const mm = MM();
    const tot = mm.puntiDi(m.id, false);
    const chiave = mm.puntiDi(m.id, true);
    const mostra = tutti ? tot : chiave;
    const chip = (p) => '<button type="button" class="merpt' + (p.nodo.chiave ? ' merpt--key' : '') +
      '" data-mpt="' + p.idx + '" data-mid="' + esc(m.id) + '" data-mramo="' + (p.ramo ? 1 : 0) + '">' +
      '<b>' + esc(p.nodo.sigla) + '</b> ' + esc(p.nodo.nome || "") + '</button>';
    const toggle = '<button type="button" class="ebtn ebtn--mini" data-mall="' + (tutti ? '0' : '1') +
      '" data-mid="' + esc(m.id) + '">' + (tutti ? 'Mostra solo i principali' : 'Mostra tutti i ' + tot.length + ' punti') + '</button>';
    infoEl.innerHTML =
      '<div class="pinfo__head">' + merDot(m) + '<h3>' + esc(m.nome) + '</h3></div>' +
      (m.descrizione ? '<p class="pinfo__note">' + esc(m.descrizione) + '</p>' : '') +
      dlOf(merMetaRows(m).concat([
        ["Punti", String(tot.length) + (m.bilaterale ? " per lato" : "") + " · " + chiave.length + " principali"]
      ])) +
      '<h4 class="merbox__h">' + (tutti ? 'Tutti i punti' : 'Punti principali') + '</h4>' +
      '<div class="merpts merpts--scroll">' + mostra.map(chip).join("") + '</div>' +
      '<div class="meractions">' + toggle + '</div>' +
      merActions(m);
    infoEl.hidden = false;
    wireMerActions();
  }

  function renderProbeInfo(pos) {
    if (!infoEl) return;
    const mm = MM(); if (!mm) return;
    const near = mm.nearest(pos);
    if (!near) { infoEl.hidden = true; return; }
    const vicini = (near.vicini || []).map((v) =>
      '<button type="button" class="merpt merpt--near" data-msel="' + esc(v.mer.id) + '">' +
      '<span class="merpt__dot" style="background:' + esc(v.mer.colore) + '"></span>' +
      '<b>' + esc(v.mer.sigla) + '</b> ' + esc(v.mer.nome) +
      '<span class="merpt__d">' + esc(cmOf(v.dist)) + '</span></button>').join("");
    const sul = near.dist * ((mm.UNIT_CM || 40)) <= 3.5;
    const rows = [
      [sul ? "Sei sul meridiano" : "Meridiano più vicino", merLabel(near.mer)],
      ["Distanza dal tracciato", cmOf(near.dist)]
    ];
    if (near.mer.bilaterale && near.latoNome) rows.push(["Lato", near.latoNome]);
    if (near.punto) rows.push(["Punto MTC più vicino", near.punto.sigla + " · " + (near.punto.nome || "") + " (" + cmOf(near.puntoDist) + ")"]);
    merMetaRows(near.mer).forEach((r) => rows.push(r));
    infoEl.innerHTML =
      '<div class="pinfo__head"><span class="pinfo__dot pinfo__dot--probe">◎</span><h3>Punto sul corpo</h3></div>' +
      '<p class="pinfo__note">Posizione toccata: x ' + pos.x.toFixed(2) + ' · y ' + pos.y.toFixed(2) + ' · z ' + pos.z.toFixed(2) +
      ' — ' + (pos.z < 0 ? 'lato posteriore' : 'lato anteriore') + ', ' + (Math.abs(pos.x) < 0.03 ? 'linea mediana' : (pos.x > 0 ? 'sinistra del soggetto' : 'destra del soggetto')) + '.</p>' +
      dlOf(rows) +
      '<h4 class="merbox__h">Meridiani più vicini</h4><div class="merpts">' + vicini + '</div>' +
      merActions(near.mer);
    infoEl.hidden = false;
    wireMerActions();
  }

  /* ---------- blocco "Meridiani MTC" dentro la scheda di un punto indicatore ---------- */
  function merBlockFor(p) {
    const mm = MM();
    if (!mm || !p || p.kind === "landmark") return "";
    let dich = null;
    try { dich = p.meridiano ? mm.byName(p.meridiano) : null; } catch (e) { dich = null; }
    let near = null;
    try { near = mm.nearest(p.pos); } catch (e) { near = null; }
    if (!dich && !near) return "";
    let h = '<div class="merbox"><h4 class="merbox__h">Meridiani MTC</h4>';
    // 1) il meridiano dell'organo a cui il punto d'allarme si riferisce
    if (dich) {
      const pt = mm.nearestPoint(p.pos, { merId: dich.id });
      h += merRow(dich, 'meridiano dell\u2019organo' +
        (pt ? ' \u00b7 punto pi\u00f9 vicino di questo meridiano: ' + pt.nodo.sigla + ' (' + cmOf(pt.dist) + ')' : ''));
    }
    // 2) su quale tracciato cade fisicamente il punto (spesso NON è quello dell'organo:
    //    p.es. il Mu dello Stomaco è VC12, sul Vaso Concezione)
    if (near && (!dich || near.mer.id !== dich.id)) {
      const sul = near.dist * ((mm.UNIT_CM || 40)) <= 3.5;
      h += merRow(near.mer, (sul ? 'il punto cade su questo tracciato' : 'tracciato pi\u00f9 vicino') +
        ' \u00b7 ' + cmOf(near.dist) +
        (near.punto ? ' \u00b7 punto ' + near.punto.sigla + ' ' + (near.punto.nome || '') + ' a ' + cmOf(near.puntoDist) : ''));
    }
    // 3) corrispondenza diretta con un punto MTC classico
    const glob = mm.nearestPoint(p.pos);
    if (glob && glob.dist * ((mm.UNIT_CM || 40)) <= 3) {
      h += '<p class="mermatch">Corrisponde a <b>' +
        esc(glob.nodo.sigla + (glob.nodo.nome ? " \u00b7 " + glob.nodo.nome : "")) + '</b>' +
        (glob.nodo.ruolo ? ' \u2014 ' + esc(glob.nodo.ruolo) : '') + ' (' + esc(cmOf(glob.dist)) + ').</p>';
    }
    return h + '</div>';
  }

  /* ============================================================================
     ECCEZIONE MILZA / PANCREAS
     Il punto d'allarme dell'elemento Terra-yin non distingue Milza da Pancreas.
     Si discrimina con due muscoli indicatori:
        Trapezio Medio  → MILZA     (coordinata milza-trapezio-medio)
        Gran Dorsale    → PANCREAS  (coordinata milza-pancreas-gran-dorsale)
     Scelto l'organo, si mostrano SOLO i suoi punti: neurolinfatici,
     neurovascolari e reflessologia, presi dalla coordinata corrispondente.
     ========================================================================== */
  const MP = {
    milza:    { organo: "Milza",    coord: "milza-trapezio-medio",        muscolo: "Trapezio Medio" },
    pancreas: { organo: "Pancreas", coord: "milza-pancreas-gran-dorsale", muscolo: "Gran Dorsale" }
  };
  let mpScelta = null;            // "milza" | "pancreas" | null (per il punto selezionato)

  function isMilzaPoint(p) {
    if (!p || p.kind === "landmark") return false;
    const m = (p.meridiano || "").toLowerCase();
    const o = (p.organo || "").toLowerCase();
    return m.indexOf("milza") === 0 || m.indexOf("pancreas") !== -1 ||
           o.indexOf("milza") === 0 || o.indexOf("pancreas") !== -1;
  }
  function coordOf(cid) {
    try {
      if (typeof COORDINATE !== "undefined" && COORDINATE && COORDINATE.length)
        return COORDINATE.find((x) => x.id === cid) || null;
    } catch (e) {}
    return null;
  }
  function mpFig(src, cap) {
    if (!src) return "";
    return '<figure class="mpfig"><img class="pageimg" src="' + esc(src) + '" loading="lazy" alt="' +
      esc(cap || "") + '" />' + (cap ? '<figcaption>' + esc(cap) + '</figcaption>' : '') + '</figure>';
  }
  function mpZone(list) {
    const arr = (list || []).filter((x) => x && (x.zona || x.note));
    if (!arr.length) return '<p class="mphint">Non disponibile nel manuale per questo organo.</p>';
    return '<ul class="mpzone">' + arr.map((x) =>
      '<li><b>' + esc(x.zona || "") + '</b>' + (x.note ? ' — ' + esc(x.note) : '') + '</li>'
    ).join("") + '</ul>';
  }

  function mpRisultato(key) {
    const cfg = MP[key]; if (!cfg) return "";
    const c = coordOf(cfg.coord);
    if (!c) return '<p class="mphint">Dati della coordinata «' + esc(cfg.coord) + '» non disponibili.</p>';
    return '<div class="mpres">' +
      '<div class="mpres__head"><span class="mpres__tag">' + esc(cfg.organo) + '</span>' +
      '<span class="mpres__sub">indicato dal ' + esc(cfg.muscolo) + '</span></div>' +
      (c.storiaMeridiano ? '<p class="mphint">' + esc(c.storiaMeridiano) + '</p>' : '') +

      '<h5 class="mpsub">Punti neuro-linfatici (NL)</h5>' + mpZone(c.neuroLinfatici) +
      mpFig(c.schedaNL, "NL · " + cfg.organo + " (ant. &amp; post.)") +

      '<h5 class="mpsub">Punti neurovascolari (NV)</h5>' + mpZone(c.neurovascolari) +
      mpFig(c.schedaNV, "NV · " + cfg.organo) +

      '<h5 class="mpsub">Reflessologia (Basket Weaver)</h5>' +
      (c.ruota ? mpFig(c.ruota, "Ruota energetica · " + cfg.organo)
               : '<p class="mphint">Ruota energetica non disponibile per questo organo.</p>') +

      '<div class="meractions">' +
      '<a class="ebtn ebtn--mini ebtn--link" href="#/' + encodeURIComponent(cfg.coord) +
      '">Apri la coordinata: ' + esc(c.muscolo) + '</a>' +
      '<button type="button" class="ebtn ebtn--mini" data-mpreset="1">↺ Rifai il test</button>' +
      '</div></div>';
  }

  function mpBlockFor(p) {
    if (!isMilzaPoint(p)) return "";
    let h = '<div class="merbox mpbox"><h4 class="merbox__h">Milza o Pancreas?</h4>';
    if (!mpScelta) {
      h += '<p class="mphint">Il punto d’allarme non distingue i due organi. ' +
        'Testa i due muscoli indicatori: quello che risulta <b>debole</b> individua l’organo.</p>' +
        '<div class="mpchoice">' +
        '<button type="button" class="mpopt" data-mp="milza">' +
        '<b>Trapezio Medio</b><span>debole → MILZA</span></button>' +
        '<button type="button" class="mpopt" data-mp="pancreas">' +
        '<b>Gran Dorsale</b><span>debole → PANCREAS</span></button></div>';
    } else {
      h += mpRisultato(mpScelta);
    }
    return h + '</div>';
  }

  function wireMpActions(p) {
    if (!infoEl) return;
    infoEl.querySelectorAll("[data-mp]").forEach((b) => {
      b.addEventListener("click", () => { mpScelta = b.dataset.mp; renderInfo(p); });
    });
    infoEl.querySelectorAll("[data-mpreset]").forEach((b) => {
      b.addEventListener("click", () => { mpScelta = null; renderInfo(p); });
    });
    infoEl.querySelectorAll(".mpbox .pageimg").forEach((im) => {
      im.addEventListener("click", () => {
        if (!window.openLightbox) return;
        const thumbs = Array.from(infoEl.querySelectorAll(".mpbox .pageimg"));
        window.openLightbox(thumbs.map((t) => t.getAttribute("src")), thumbs.indexOf(im));
      });
    });
  }

  function merRow(m, testo) {
    return '<div class="merrow" data-msel="' + esc(m.id) + '">' +
      '<span class="merrow__dot" style="background:' + esc(m.colore) + '"></span>' +
      '<span class="merrow__txt"><b>' + esc(merLabel(m)) + '</b><em>' + esc(testo) + '</em></span></div>';
  }

  /* ---------- wiring dei bottoni generati via innerHTML ---------- */
  function wireMerActions() {
    if (!infoEl) return;
    const mm = MM(); if (!mm) return;
    infoEl.querySelectorAll("[data-mact]").forEach((b) => {
      b.addEventListener("click", () => {
        const a = b.dataset.mact;
        if (a === "all") { mm.setAllVisible(true); mm.highlight(null); }
        else if (a === "iso") { mm.setAllVisible(false); mm.setVisible(b.dataset.mid, true); mm.highlight(b.dataset.mid); }
        syncChips();
      });
    });
    infoEl.querySelectorAll("[data-msel]").forEach((b) => {
      b.addEventListener("click", () => selectMeridiano(b.dataset.msel));
    });
    infoEl.querySelectorAll("[data-mpt]").forEach((b) => {
      b.addEventListener("click", () => {
        const id = b.dataset.mid, idx = parseInt(b.dataset.mpt, 10);
        mm.setVisible(id, true);
        selectMerPoint({ merId: id, idx: idx, side: 1, ramo: b.dataset.mramo === "1" });
      });
    });
    infoEl.querySelectorAll("[data-mall]").forEach((b) => {
      b.addEventListener("click", () => renderMerInfo(mm.get(b.dataset.mid), b.dataset.mall === "1"));
    });
    infoEl.querySelectorAll("[data-mzoom]").forEach((b) => {
      b.addEventListener("click", () => {
        const v = b.dataset.mzoom.split(",").map(Number);
        focusOn({ x: v[0] * (v[3] || 1), y: v[1], z: v[2] }, 1.3);
      });
    });
  }

  /* ---------- sincronia con la vista 2D (tavole) ---------- */
  function tavRefresh() { if (window.Tavole && window.Tavole.refresh) window.Tavole.refresh(); }
  function tavMark(sel) { if (window.Tavole && window.Tavole.mark) window.Tavole.mark(sel); }

  /* ---------- sottoschede: Mappa 3D / Tavole 2D ---------- */
  let stage = "3d";
  function setStage(which) {
    stage = which === "2d" ? "2d" : "3d";
    const s3 = document.getElementById("stage3d"), s2 = document.getElementById("stage2d");
    if (s3) s3.hidden = stage !== "3d";
    if (s2) s2.hidden = stage !== "2d";
    const tabs = document.getElementById("stageTabs");
    if (tabs) Array.from(tabs.querySelectorAll("[data-stage]")).forEach(
      (b) => b.classList.toggle("is-on", b.dataset.stage === stage));
    if (stage === "2d") {
      running = false; if (rafId) cancelAnimationFrame(rafId);
      if (window.Tavole) { window.Tavole.activate(); tavMark(picked ? { kind: "ind", id: picked.id } :
        (merSel ? { kind: "mer", merId: merSel.merId, idx: merSel.idx, ramo: merSel.ramo } : null)); }
    } else {
      if (window.Tavole) window.Tavole.deactivate();
      if (inited) { running = true; resize(); loop(); }
    }
    return stage;
  }
  function initStageTabs() {
    const tabs = document.getElementById("stageTabs");
    if (!tabs || tabs.dataset.wired) return;
    tabs.dataset.wired = "1";
    tabs.addEventListener("click", (e) => {
      const b = e.target.closest("[data-stage]"); if (!b) return;
      setStage(b.dataset.stage);
    });
  }

  /* ---------- accensione/spegnimento dei Punti Indicatori ---------- */
  function setPuntiVisible(on) {
    puntiVisibili = !!on;
    if (pointsGroup) pointsGroup.visible = puntiVisibili;
    const ps = document.getElementById("puntiShow");
    if (ps && ps.checked !== puntiVisibili) ps.checked = puntiVisibili;
    if (listEl) listEl.classList.toggle("is-off", !puntiVisibili);
    tavRefresh();
    return puntiVisibili;
  }
  function puntiVisible() { return puntiVisibili; }

  /* ---------- pannello di controllo dei meridiani ---------- */
  function syncChips() {
    const mm = MM(); if (!mm) return;
    const wrap = document.getElementById("merChips"); if (!wrap) return;
    const hi = mm.highlighted();
    Array.from(wrap.children).forEach((b) => {
      const id = b.dataset.mer;
      b.classList.toggle("is-off", !mm.isVisible(id));
      b.classList.toggle("is-hi", hi === id);
      b.setAttribute("aria-pressed", mm.isVisible(id) ? "true" : "false");
    });
    tavRefresh();
  }

  let merUIdone = false;
  function buildMerUI() {
    const mm = MM(); if (!mm || merUIdone) return;
    const wrap = document.getElementById("merChips");
    if (wrap) {
      wrap.innerHTML = "";
      mm.list().forEach((m) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "merchip";
        b.dataset.mer = m.id;
        b.title = m.nome + " — clic: mostra/nascondi · doppio clic: scheda";
        b.innerHTML = '<span class="merchip__dot" style="background:' + esc(m.colore) + '"></span>' +
          '<span class="merchip__sig">' + esc(m.sigla) + '</span>' +
          '<span class="merchip__nm">' + esc(m.nome) + '</span>';
        b.addEventListener("click", () => { mm.setVisible(m.id, !mm.isVisible(m.id)); syncChips(); });
        b.addEventListener("dblclick", () => { mm.setVisible(m.id, true); selectMeridiano(m.id); });
        wrap.appendChild(b);
      });
    }
    const show = document.getElementById("merShow");
    if (show) show.addEventListener("change", () => {
      if (mm.group) mm.group.visible = !!show.checked;
      const p = document.getElementById("merPanel");
      if (p) p.classList.toggle("is-hidden", !show.checked);
    });
    // segmentato "punti dei meridiani": principali / tutti / nessuno
    const seg = document.getElementById("merPointsSeg");
    if (seg) {
      const sync = () => Array.from(seg.querySelectorAll("[data-pm]")).forEach(
        (b) => b.classList.toggle("is-on", b.dataset.pm === mm.pointsMode()));
      seg.addEventListener("click", (e) => {
        const b = e.target.closest("[data-pm]"); if (!b) return;
        mm.setPointsMode(b.dataset.pm);
        mm.setLabels(mm.labelsEnabled());   // rigenera le sigle secondo la nuova modalità
        sync(); tavRefresh();
      });
      sync();
    }
    const selOld = document.getElementById("merPointsMode");   // compatibilità
    if (selOld) {
      selOld.value = mm.pointsMode();
      selOld.addEventListener("change", () => mm.setPointsMode(selOld.value));
    }
    // interruttore dei Punti Indicatori (marker rossi + riferimenti anatomici)
    const ps = document.getElementById("puntiShow");
    if (ps) {
      ps.checked = puntiVisibili;
      ps.addEventListener("change", () => setPuntiVisible(!!ps.checked));
    }
    const lab = document.getElementById("merLabels");
    if (lab) {
      lab.checked = mm.labelsEnabled();
      lab.addEventListener("change", () => { mm.setLabels(!!lab.checked); tavRefresh(); });
    }
    const bar = document.getElementById("viewBar");
    if (bar) bar.addEventListener("click", (e) => {
      const b = e.target.closest("[data-view],[data-zona]"); if (!b) return;
      if (b.dataset.zona) setZona(b.dataset.zona); else setView(b.dataset.view);
    });
    syncBar();
    const bAll = document.getElementById("merAll");
    if (bAll) bAll.addEventListener("click", () => { mm.setAllVisible(true); mm.highlight(null); syncChips(); });
    const bNone = document.getElementById("merNone");
    if (bNone) bNone.addEventListener("click", () => { mm.setAllVisible(false); mm.highlight(null); syncChips(); });
    merUIdone = true;
    syncChips();
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
      initStageTabs();
      if (stage === "2d") { if (window.Tavole) window.Tavole.activate(); return; }
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
    removePoint: removePoint,
    importJSON: importJSON,
    // meridiani
    selectMeridiano: selectMeridiano,
    selectMerPoint: selectMerPoint,
    probeAt: probeAt,
    setView: setView,
    setZona: setZona,
    panBy: panBy,
    zona: () => zonaAttiva,
    focusOn: focusOn,
    setPuntiVisible: setPuntiVisible,
    puntiVisible: puntiVisible,
    setStage: setStage,
    stage: () => stage,
    selectPunto: (id) => { const p = DATA.find((x) => x.id === id) || LANDMARKS.find((x) => x.id === id);
                           if (p) selectPoint(p); return !!p; },
    meridianoDi: (pos) => (window.MeridianiMap ? window.MeridianiMap.nearest(pos) : null)
  };

  /* Se la pagina viene aperta DIRETTAMENTE sulla sezione Punti, app.js ha già
     chiamato route()/showPunti() PRIMA che questo script (e quindi PuntiMap)
     esistesse: la sezione risulta visibile ma la mappa non è mai stata attivata.
     Qui recuperiamo attivandola noi se #puntiView è visibile. */
  if (mount && !mount.hidden) {
    try { window.PuntiMap.activate(); } catch (e) {}
  }
})();
