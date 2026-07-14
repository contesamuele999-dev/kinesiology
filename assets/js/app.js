/* app.js — Fisiologia Applicata (modello a COPPIE di meridiani).
   Flusso: Home (elenco meridiani) → scelta 1° meridiano → scelta 2° meridiano
   → coordinata completa (es. S-VC) con schede/tab per meridiano.
   Ogni meridiano mostra: muscolo & movimento, punti NL, punti NV, modi,
   affermazioni, meridiano, fiore, immagini (Basket Weaver). Vanilla JS. */
(function () {
  "use strict";
  const data = window.COORDINATE || [];

  const el = (id) => document.getElementById(id);
  const listView = el("listView"), coordView = el("coordView");
  const grid = el("grid"), noResults = el("noResults"), listHead = el("listHead");
  const searchInput = el("search"), searchWrap = el("searchWrap");
  const backBtn = el("backBtn"), themeBtn = el("themeBtn");
  const coordHead = el("coordHead"), coordTabs = el("coordTabs"), sections = el("sections");

  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const has = (s) => s && String(s).trim().length > 0;
  const PH = '<p><span class="placeholder">Da compilare dai manuali.</span></p>';
  const PH_IMG = '<p><span class="placeholder">Nessuna immagine disponibile per questo meridiano.</span></p>';
  const find = (id) => data.find((x) => x.id === id);

  /* ---------- Tema chiaro/scuro ---------- */
  function safeGet(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
  function safeSet(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
  function applyTheme(t){
    document.body.classList.toggle("dark", t === "dark");
    if (themeBtn) themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#0f141a" : "#0f766e");
  }
  let theme = safeGet("kapp-theme");
  if (!theme) theme = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
  applyTheme(theme);
  if (themeBtn) themeBtn.addEventListener("click", () => {
    theme = document.body.classList.contains("dark") ? "light" : "dark";
    applyTheme(theme); safeSet("kapp-theme", theme);
  });

  /* ---------- Header sticky (scroll-margin sezioni) ---------- */
  const topbar = document.querySelector(".topbar");
  function updateStick(){
    const th = topbar ? topbar.offsetHeight : 60;
    const tabsH = (coordTabs && !coordView.hidden) ? coordTabs.offsetHeight : 0;
    const rs = document.documentElement.style;
    rs.setProperty("--topbar-h", th + "px");
    rs.setProperty("--stick-h", (th + tabsH + 14) + "px");
  }
  window.addEventListener("resize", updateStick);

  /* ---------- Indice di ricerca: tutto il testo del meridiano ---------- */
  function collectText(v, out) {
    if (v == null) return;
    if (typeof v === "string" || typeof v === "number") { out.push(String(v)); return; }
    if (Array.isArray(v)) { v.forEach((x) => collectText(x, out)); return; }
    if (typeof v === "object") { Object.values(v).forEach((x) => collectText(x, out)); return; }
  }
  const SEARCH_SKIP = { colore: 1, immagini: 1, id: 1 };
  data.forEach((c) => {
    const parts = [];
    Object.keys(c).forEach((k) => { if (!SEARCH_SKIP[k]) collectText(c[k], parts); });
    c._search = norm(parts.join(" "));
  });

  /* ---------- Stato corrente della vista ----------
     firstMeridian = null  → Home (scegli 1° meridiano)
     firstMeridian = <c>   → scegli 2° meridiano                  */
  let firstMeridian = null;

  /* ---------- Card meridiano ---------- */
  function meridianCard(c) {
    return `
      <button class="card" data-id="${esc(c.id)}">
        <span class="card__color" style="background:${esc(c.colore)}"></span>
        <span class="card__body">
          <span class="card__meridian">${esc(c.meridiano)}</span>
          <span class="card__muscle">${esc(c.muscolo)}</span>
          <span class="card__colorname">${esc(c.coloreNome)}</span>
        </span>
      </button>`;
  }

  /* ---------- Render elenco (Home o scelta 2° meridiano) ---------- */
  function renderList(filter) {
    const q = norm(filter);
    const terms = q.split(/\s+/).filter(Boolean);
    let rows = data.slice();
    if (firstMeridian) rows = rows.filter((c) => c.id !== firstMeridian.id);
    if (terms.length) rows = rows.filter((c) => terms.every((t) => c._search.includes(t)));

    if (firstMeridian) {
      listHead.innerHTML =
        `<p class="listhead__step">Coordinata in costruzione</p>
         <div class="listhead__pair">
           <span class="pairchip" style="--c:${esc(firstMeridian.colore)}">${esc(firstMeridian.meridiano)}</span>
           <span class="pairchip pairchip--q">+ scegli il 2°</span>
         </div>
         <p class="listhead__hint">Tocca il secondo meridiano per aprire la coordinata completa.</p>`;
    } else {
      listHead.innerHTML =
        `<p class="listhead__hint">Scegli il <strong>primo meridiano</strong> della coppia da testare.</p>`;
    }

    grid.innerHTML = rows.map(meridianCard).join("");
    noResults.hidden = rows.length > 0;
    noResults.textContent = firstMeridian ? "Nessun secondo meridiano trovato." : "Nessun meridiano trovato.";
  }

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const id = card.dataset.id;
    if (firstMeridian) location.hash = "#/" + firstMeridian.id + "+" + id; // apre la coordinata
    else location.hash = "#/" + id;                                        // passa alla scelta del 2°
  });
  searchInput.addEventListener("input", () => renderList(searchInput.value));

  /* ---------- Blocchi di rendering delle sezioni ---------- */
  // Muscolo & movimento
  function muscleBlock(c) {
    const parts = [`<p class="mus-name">${esc(c.muscolo)}</p>`];
    parts.push(has(c.movimento) ? `<p>${esc(c.movimento)}</p>`
      : '<p><span class="placeholder">Movimento da definire.</span></p>');
    if (has(c.movimentoNote)) parts.push(`<p class="movnote">${esc(c.movimentoNote)}</p>`);
    return parts.join("");
  }

  // Punti (NL / NV) e modi: {zona|nome, lato, note}
  function pointsBlock(arr) {
    const items = (arr || []).filter((x) => x && (has(x.zona) || has(x.nome) || has(x.note)));
    if (!items.length) return PH;
    return '<ul class="points">' + items.map((x) => {
      const title = esc(x.zona || x.nome || "");
      const lato = has(x.lato) ? ` <span class="pt-lato">(${esc(x.lato)})</span>` : "";
      const note = has(x.note) ? `<div class="pt-note">${esc(x.note)}</div>` : "";
      return `<li><span class="pt-title">${title}</span>${lato}${note}</li>`;
    }).join("") + "</ul>";
  }

  // Affermazioni + tabella atteggiamenti collegati
  function affBlock(c) {
    const aff = (c.affermazioni || []).filter(has);
    const affHtml = aff.length
      ? '<ul class="aff">' + aff.map((a) => `<li>${esc(a)}</li>`).join("") + "</ul>" : "";
    const attRows = (c.atteggiamenti || []).map((a) =>
      `<tr><td class="att__pos">${esc(a.posizione)}</td><td>${esc(a.meridiano)}</td><td>${esc(a.stress)}</td></tr>`).join("");
    const attHtml = attRows
      ? `<h4 class="subh">Atteggiamenti collegati</h4><div class="att__wrap"><table class="att"><thead><tr><th>Pos.</th><th>Meridiano rif.</th><th>Stress: pensieri &amp; emozioni</th></tr></thead><tbody>${attRows}</tbody></table></div>`
      : "";
    return (affHtml || attHtml) ? (affHtml + attHtml) : PH;
  }

  // Meridiano: nome + storia/attributi
  function meridianiBlock(c) {
    const parts = [];
    if (has(c.meridiano)) parts.push(`<p class="mer-name">${esc(c.meridiano)}</p>`);
    if (has(c.storiaMeridiano)) parts.push(`<p>${esc(c.storiaMeridiano)}</p>`);
    return parts.length ? parts.join("") : PH;
  }

  // Fiore: nome, tipo, squilibri, frasi
  function fioreBlock(c) {
    const rows = (c.fiore || []).filter((x) => has(x.nome) || has(x.tipo));
    if (!rows.length) return PH;
    return '<div class="ess__list">' + rows.map((x) => {
      const sq = (x.squilibri || []).map((s) => `<li>${esc(s)}</li>`).join("");
      return `
      <div class="ess">
        <div class="ess__head"><span class="ess__name">${esc(x.nome || "—")}</span><span class="ess__type">${esc(x.tipo || "")}</span></div>
        ${sq ? `<ul class="ess__sq">${sq}</ul>` : ""}
        ${has(x.frasi) ? `<div class="ess__imp">${esc(x.frasi)}</div>` : ""}
      </div>`;
    }).join("") + "</div>";
  }

  // Griglia di miniature (NL/NV/Basket Weaver) che aprono la lightbox.
  function imgGrid(list, alt) {
    const imgs = (list || []).filter(has);
    if (!imgs.length) return "";
    return '<div class="pages">' + imgs.map((src, i) =>
      `<img class="pageimg" src="${esc(src)}" loading="lazy" alt="${esc(alt || "Immagine")} ${i + 1}" />`).join("") + "</div>";
  }

  function sectionsFor(c) {
    return [
      { id: "muscolo", label: "Muscolo & movimento", html: muscleBlock(c) },
      { id: "neurolinfatici", label: "Punti neuro-linfatici (NL)", html: pointsBlock(c.neuroLinfatici) + imgGrid(c.immaginiNL, "Punti NL") },
      { id: "neurovascolari", label: "Punti neurovascolari (NV)", html: pointsBlock(c.neurovascolari) + imgGrid(c.immaginiNV, "Punti NV") },
      { id: "modi", label: "Modi", html: pointsBlock(c.modi) },
      { id: "affermazioni", label: "Affermazioni", html: affBlock(c) },
      { id: "meridiani", label: "Meridiano", html: meridianiBlock(c) },
      { id: "fiore", label: "Fiore", html: fioreBlock(c) },
      { id: "immagini", label: "Immagini (Basket Weaver)", html: imgGrid(c.immagini, "Diagramma") || PH_IMG }
    ];
  }

  /* ---------- Vista coordinata (coppia di meridiani) ---------- */
  let pair = [null, null];   // [meridianoA, meridianoB]
  let activeIdx = 0;

  function renderCoordHead() {
    const [a, b] = pair;
    coordHead.innerHTML = `
      <p class="coord__label">Coordinata completa</p>
      <div class="coord__pair">
        <span class="coord__mer" style="--c:${esc(a.colore)}">${esc(a.meridiano)}</span>
        <span class="coord__x">↔</span>
        <span class="coord__mer" style="--c:${esc(b.colore)}">${esc(b.meridiano)}</span>
      </div>
      <button id="changeSecond" class="coord__change" type="button">↺ Cambia 2° meridiano</button>`;
    el("changeSecond").addEventListener("click", () => { location.hash = "#/" + pair[0].id; });
  }

  function renderCoordTabs() {
    coordTabs.innerHTML = pair.map((c, i) =>
      `<button class="coordtab${i === activeIdx ? " active" : ""}" data-idx="${i}"
               style="--c:${esc(c.colore)}">
         <span class="coordtab__mer">${esc(c.meridiano)}</span>
         <span class="coordtab__mus">${esc(c.muscolo)}</span>
       </button>`).join("");
  }

  function renderActiveSections() {
    const c = pair[activeIdx];
    sections.innerHTML = sectionsFor(c).map((s) =>
      `<section class="section" id="sec-${s.id}">
         <h3>${s.label}</h3>${s.html}</section>`).join("");
    updateStick();
  }

  coordTabs.addEventListener("click", (e) => {
    const t = e.target.closest(".coordtab");
    if (!t) return;
    activeIdx = Number(t.dataset.idx) || 0;
    renderCoordTabs();
    renderActiveSections();
    window.scrollTo(0, 0);
  });

  function showCoordinate(a, b) {
    pair = [a, b];
    activeIdx = 0;
    listView.hidden = true; coordView.hidden = false;
    backBtn.hidden = false; searchWrap.hidden = true;
    renderCoordHead();
    renderCoordTabs();
    renderActiveSections();
    window.scrollTo(0, 0);
    updateStick();
  }

  function showList() {
    coordView.hidden = true; listView.hidden = false;
    searchWrap.hidden = false;
    backBtn.hidden = !firstMeridian; // in Home niente "indietro"
    renderList(searchInput.value);
    updateStick();
  }

  /* ---------- Lightbox immagini ---------- */
  const lightbox = el("lightbox"), lbImg = el("lbImg"), lbCount = el("lbCount");
  const lbPrev = el("lbPrev"), lbNext = el("lbNext"), lbClose = el("lbClose");
  let lbList = [], lbIdx = 0;

  function lbShow(i) {
    if (!lbList.length) return;
    lbIdx = (i + lbList.length) % lbList.length;
    lbImg.src = lbList[lbIdx];
    lbCount.textContent = (lbIdx + 1) + " / " + lbList.length;
    const multi = lbList.length > 1;
    lbPrev.hidden = !multi; lbNext.hidden = !multi; lbCount.hidden = !multi;
  }
  function lbOpen(list, i) {
    lbList = list; lightbox.hidden = false;
    document.body.classList.add("lb-open");
    lbShow(i);
  }
  function lbCloseFn() { lightbox.hidden = true; document.body.classList.remove("lb-open"); lbImg.src = ""; }

  sections.addEventListener("click", (e) => {
    const img = e.target.closest(".pageimg");
    if (!img) return;
    const sec = img.closest(".section");
    const thumbs = Array.from(sec.querySelectorAll(".pageimg"));
    const list = thumbs.map((t) => t.getAttribute("src"));
    lbOpen(list, thumbs.indexOf(img));
  });
  lbPrev.addEventListener("click", (e) => { e.stopPropagation(); lbShow(lbIdx - 1); });
  lbNext.addEventListener("click", (e) => { e.stopPropagation(); lbShow(lbIdx + 1); });
  lbClose.addEventListener("click", lbCloseFn);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lbCloseFn(); });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") lbCloseFn();
    else if (e.key === "ArrowLeft") lbShow(lbIdx - 1);
    else if (e.key === "ArrowRight") lbShow(lbIdx + 1);
  });

  /* ---------- Router (hash) ----------
     #/            → Home
     #/<id>        → scelta 2° meridiano (1° = id)
     #/<id>+<id2>  → coordinata completa                        */
  function route() {
    const h = location.hash;
    const mPair = h.match(/^#\/([^+]+)\+(.+)$/);
    if (mPair) {
      const a = find(mPair[1]), b = find(mPair[2]);
      if (a && b && a.id !== b.id) { firstMeridian = a; showCoordinate(a, b); return; }
    }
    const mOne = h.match(/^#\/(.+)$/);
    if (mOne) {
      const a = find(mOne[1]);
      if (a) { firstMeridian = a; showList(); return; }
    }
    firstMeridian = null; showList();
  }

  backBtn.addEventListener("click", () => {
    if (!coordView.hidden) location.hash = "#/" + pair[0].id; // da coordinata → scelta 2°
    else location.hash = "";                                  // da scelta 2° → Home
  });
  window.addEventListener("hashchange", route);

  /* ---------- PWA: service worker + popup installazione ---------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }

  (function initInstallPopup() {
    const pop = el("installPop");
    if (!pop) return;
    const btn = el("installBtn"), later = el("installLater"), closeX = el("installClose");
    const textEl = el("installText"), titleEl = el("installTitle");
    const SEEN_KEY = "kapp-install-seen";
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
      || window.navigator.standalone === true;
    const ua = navigator.userAgent || "";
    const isIOS = /iphone|ipad|ipod/i.test(ua) && !window.MSStream;
    let deferredPrompt = null;

    function show() {
      if (isStandalone) return;
      if (safeGet(SEEN_KEY)) return;
      pop.hidden = false; document.body.classList.add("installpop-open");
    }
    function dismiss() {
      pop.hidden = true; document.body.classList.remove("installpop-open");
      safeSet(SEEN_KEY, "1");
    }
    window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferredPrompt = e; show(); });
    window.addEventListener("appinstalled", () => { safeSet(SEEN_KEY, "1"); dismiss(); });
    btn.addEventListener("click", async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        try { await deferredPrompt.userChoice; } catch (e) {}
        deferredPrompt = null; dismiss();
      } else { dismiss(); }
    });
    later.addEventListener("click", dismiss);
    closeX.addEventListener("click", dismiss);
    pop.addEventListener("click", (e) => { if (e.target === pop) dismiss(); });
    if (isIOS && !isStandalone && !safeGet(SEEN_KEY)) {
      titleEl.textContent = "Aggiungi alla Home";
      textEl.innerHTML = 'Tocca il pulsante <strong>Condividi</strong> ' +
        '<span aria-hidden="true">⏏</span> e poi <strong>«Aggiungi a Home»</strong> ' +
        'per installare l\'app e usarla offline.';
      btn.textContent = "Ho capito";
      setTimeout(show, 1200);
    }
  })();

  /* ---------- Avvio ---------- */
  route();
})();
