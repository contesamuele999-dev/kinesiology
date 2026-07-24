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

  const DATA = (window.PUNTI_INDICATORI && window.PUNTI_INDICATORI.punti) || [];

  function themeColors() {
    const dark = document.body.classList.contains("dark");
    return {
      bg: dark ? 0x0e141b : 0xeef2f5,
      body: dark ? 0x2b3a49 : 0xcdd8e0,
      bodyEmis: dark ? 0x0a1016 : 0x000000,
      point: 0xff5a4d,
      pointHi: 0xffd23f,
      grid: dark ? 0x1c2836 : 0xdae2e8
    };
  }

  function makeBody() {
    const g = new THREE.Group();
    const col = themeColors();
    const mat = new THREE.MeshStandardMaterial({ color: col.body, roughness: 0.85, metalness: 0.05, emissive: col.bodyEmis });
    const add = (geo, x, y, z, rx, ry, rz, sx, sy, sz) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      if (rx || ry || rz) m.rotation.set(rx || 0, ry || 0, rz || 0);
      if (sx || sy || sz) m.scale.set(sx || 1, sy || 1, sz || 1);
      m.userData.bodyPart = true;
      g.add(m); return m;
    };
    // Torso (petto + addome) — ellissoide via sfera scalata
    add(new THREE.SphereGeometry(0.55, 32, 24), 0, 1.62, 0, 0,0,0, 1.05, 1.15, 0.62); // torace
    add(new THREE.SphereGeometry(0.5, 32, 24), 0, 1.05, 0, 0,0,0, 0.98, 1.05, 0.58);  // addome
    add(new THREE.SphereGeometry(0.46, 32, 24), 0, 0.72, 0, 0,0,0, 0.92, 0.7, 0.5);   // bacino
    // Collo + testa
    add(new THREE.CylinderGeometry(0.14, 0.17, 0.22, 20), 0, 2.18, 0);
    add(new THREE.SphereGeometry(0.30, 32, 24), 0, 2.52, 0, 0,0,0, 1, 1.12, 1);
    // Spalle
    add(new THREE.SphereGeometry(0.20, 20, 16), 0.62, 1.95, 0);
    add(new THREE.SphereGeometry(0.20, 20, 16), -0.62, 1.95, 0);
    // Braccia (lungo i fianchi)
    add(new THREE.CylinderGeometry(0.12, 0.10, 1.5, 16), 0.78, 1.25, 0, 0,0,0.06);
    add(new THREE.CylinderGeometry(0.12, 0.10, 1.5, 16), -0.78, 1.25, 0, 0,0,-0.06);
    // Gambe
    add(new THREE.CylinderGeometry(0.19, 0.14, 1.7, 18), 0.24, -0.15, 0);
    add(new THREE.CylinderGeometry(0.19, 0.14, 1.7, 18), -0.24, -0.15, 0);
    return g;
  }

  function makeMarkers() {
    const g = new THREE.Group();
    const col = themeColors();
    markerMeshes = [];
    DATA.forEach((p) => {
      const geo = new THREE.SphereGeometry(0.075, 20, 16);
      const m = new THREE.MeshStandardMaterial({ color: col.point, emissive: 0x7a1810, emissiveIntensity: 0.5, roughness: 0.4 });
      const mesh = new THREE.Mesh(geo, m);
      mesh.position.set(p.pos.x, p.pos.y, p.pos.z);
      mesh.userData.punto = p;
      // alone
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 12),
        new THREE.MeshBasicMaterial({ color: col.pointHi, transparent: true, opacity: 0.14 })
      );
      mesh.add(halo);
      g.add(mesh);
      markerMeshes.push(mesh);
    });
    return g;
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
    const down = (x, y) => { dragging = true; dragMoved = false; lastX = x; lastY = y; };
    const move = (x, y) => {
      if (!dragging) return;
      const dx = x - lastX, dy = y - lastY;
      if (Math.abs(dx) + Math.abs(dy) > 3) dragMoved = true;
      yaw -= dx * 0.008; pitch += dy * 0.006;
      lastX = x; lastY = y; updateCamera();
    };
    const up = () => { dragging = false; };
    dom.addEventListener("mousedown", (e) => down(e.clientX, e.clientY));
    window.addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
    window.addEventListener("mouseup", up);
    dom.addEventListener("touchstart", (e) => { const t = e.touches[0]; down(t.clientX, t.clientY); }, { passive: true });
    dom.addEventListener("touchmove", (e) => { const t = e.touches[0]; move(t.clientX, t.clientY); }, { passive: true });
    dom.addEventListener("touchend", up);
    dom.addEventListener("wheel", (e) => { e.preventDefault(); dist = Math.max(3.2, Math.min(11, dist + e.deltaY * 0.01)); updateCamera(); }, { passive: false });
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
    markerMeshes.forEach((m) => {
      const on = m.userData.punto.id === p.id;
      m.material.color.set(on ? themeColors().pointHi : themeColors().point);
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
    infoEl.innerHTML =
      '<div class="pinfo__head"><span class="pinfo__dot"></span><h3>' + esc(p.organo) + '</h3></div>' +
      (p.note ? '<p class="pinfo__note">' + esc(p.note) + '</p>' : '') +
      '<dl class="pinfo__dl">' +
      rows.map(([k, v]) => '<dt>' + esc(k) + '</dt><dd>' + esc(v) + '</dd>').join("") +
      '</dl>';
    infoEl.hidden = false;
  }

  function buildList() {
    if (!listEl) return;
    listEl.innerHTML = "";
    DATA.forEach((p) => {
      const li = document.createElement("button");
      li.className = "punti__li";
      li.type = "button";
      li.dataset.id = p.id;
      li.innerHTML = '<span class="punti__li-dot" aria-hidden="true"></span>' +
        '<span class="punti__li-name">' + esc(p.organo) + '</span>' +
        '<span class="punti__li-tag">' + (p.vista === "retro" ? "retro" : "fronte") + '</span>';
      li.addEventListener("click", () => selectPoint(p));
      listEl.appendChild(li);
    });
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
  window.addEventListener("resize", resize);

  function retheme() {
    if (!scene) return;
    const col = themeColors();
    scene.background = new THREE.Color(col.bg);
    bodyGroup.traverse((o) => { if (o.isMesh && o.userData.bodyPart) { o.material.color.set(col.body); o.material.emissive.set(col.bodyEmis); } });
    markerMeshes.forEach((m) => { if (!picked || m.userData.punto.id !== picked.id) m.material.color.set(col.point); });
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
    resize: resize
  };
})();
