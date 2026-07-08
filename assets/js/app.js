/* app.js — logica UI: elenco coordinate, ricerca, dettaglio con sezioni, tema. Vanilla JS. */
(function () {
  "use strict";
  const data = window.COORDINATE || [];

  const el = (id) => document.getElementById(id);
  const listView = el("listView"), detailView = el("detailView");
  const grid = el("grid"), noResults = el("noResults");
  const searchInput = el("search"), searchWrap = el("searchWrap");
  const backBtn = el("backBtn"), themeBtn = el("themeBtn");
  const detailHead = el("detailHead"), anchors = el("anchors"), sections = el("sections");

  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const has = (s) => s && String(s).trim().length > 0;
  const ph = '<span class="placeholder">Da compilare dai manuali.</span>';

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

  /* ---------- Elenco + ricerca ---------- */
  function renderList(filter) {
    const q = norm(filter);
    const rows = data.filter((c) =>
      !q || norm(c.meridiano).includes(q) || norm(c.muscolo).includes(q) || norm(c.coloreNome).includes(q)
    );
    grid.innerHTML = rows.map((c) => `
      <button class="card" data-id="${esc(c.id)}">
        <span class="card__color" style="background:${esc(c.colore)}"></span>
        <span class="card__body">
          <span class="card__meridian">${esc(c.meridiano)}</span>
          <span class="card__muscle">${esc(c.muscolo)}</span>
          <span class="card__colorname">${esc(c.coloreNome)}</span>
        </span>
      </button>`).join("");
    noResults.hidden = rows.length > 0;
  }

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) location.hash = "#/" + card.dataset.id;
  });
  searchInput.addEventListener("input", () => renderList(searchInput.value));

  /* ---------- Navigazione a sezioni (scroll, senza toccare l'hash) ---------- */
  anchors.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    e.preventDefault();
    const target = document.getElementById("sec-" + a.dataset.sec);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ---------- Dettaglio ---------- */
  function textBlock(v) { return has(v) ? `<p>${esc(v)}</p>` : `<p>${ph}</p>`; }

  function renderDetail(c) {
    detailHead.style.background = c.colore;
    detailHead.style.color = isLight(c.colore) ? "#12202b" : "#fff";
    detailHead.innerHTML = `
      <h2>${esc(c.meridiano)}</h2>
      <div class="muscle">${esc(c.muscolo)}</div>
      <span class="chip">${esc(c.coloreNome)}</span>`;

    const corrList = (c.correzioni || []).map((x) => `
      <div class="corr">
        <div class="corr__title">${esc(x.titolo || "Correzione")}</div>
        ${has(x.tecnica) ? `<span class="corr__tech">${esc(x.tecnica)}</span>` : ""}
        ${has(x.descrizione) ? `<div class="corr__desc">${esc(x.descrizione)}</div>` : ""}
      </div>`).join("");
    const imgs = (c.immagini || []).map((src, i) => `
      <img class="pageimg" src="${esc(src)}" alt="Pagina ${i + 1} del manuale" loading="lazy" data-full="${esc(src)}" />`).join("");
    const corr = corrList ? corrList : `<p>${ph}</p>`;
    // Storia del problema (Basket Weaver): testo + pagine del manuale
    const pagesHtml = imgs ? `<div class="pages">${imgs}</div>` : "";
    const problema = (has(c.storiaProblema) || pagesHtml)
      ? `${has(c.storiaProblema) ? `<p>${esc(c.storiaProblema)}</p>` : ""}${pagesHtml}`
      : `<p>${ph}</p>`;

    const attRows = (c.atteggiamenti || []).map((a) => `
      <tr><td class="att__pos">${esc(a.posizione)}</td><td>${esc(a.meridiano)}</td><td>${esc(a.stress)}</td></tr>`).join("");
    const attHtml = attRows
      ? `<div class="att__wrap"><table class="att"><thead><tr><th>Pos.</th><th>Meridiano rif.</th><th>Stress: pensieri &amp; emozioni</th></tr></thead><tbody>${attRows}</tbody></table></div>`
      : "";
    const essRows = (c.essenze || []).filter((x) => has(x.nome) || has(x.atteggiamento)).map((x) => {
      const sq = (x.squilibri || []).map((s) => `<li>${esc(s)}</li>`).join("");
      return `
      <div class="ess">
        <div class="ess__head"><span class="ess__name">${esc(x.nome || "—")}</span><span class="ess__type">${esc(x.atteggiamento || "")}</span></div>
        ${sq ? `<ul class="ess__sq">${sq}</ul>` : ""}
        ${has(x.impegno) ? `<div class="ess__imp">${esc(x.impegno)}</div>` : ""}
      </div>`;
    }).join("");
    const ess = (attHtml || essRows)
      ? `${attHtml}${essRows ? `<div class="ess__list">${essRows}</div>` : ""}`
      : `<p>${ph}</p>`;

    const secs = [
      { id: "correzioni", label: "Correzioni", html: corr },
      { id: "problema", label: "Storia del problema", html: problema },
      { id: "meridiano", label: "Storia del meridiano", html: textBlock(c.storiaMeridiano) },
      { id: "essenze", label: "Atteggiamenti ed essenze", html: ess }
    ];

    anchors.innerHTML = secs.map((s, i) =>
      `<a href="#sec-${s.id}" data-sec="${s.id}"${i === 0 ? ' class="active"' : ""}>${s.label}</a>`).join("");
    sections.innerHTML = secs.map((s) =>
      `<section class="section" id="sec-${s.id}" style="--accent:${esc(c.colore)}">
         <h3>${s.label}</h3>${s.html}</section>`).join("");

    window.scrollTo(0, 0);
    watchSections();
  }

  let observer;
  function watchSections() {
    if (observer) observer.disconnect();
    const links = Array.from(anchors.querySelectorAll("a"));
    observer = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const id = en.target.id.replace("sec-", "");
          links.forEach((l) => l.classList.toggle("active", l.dataset.sec === id));
        }
      });
    }, { rootMargin: "-180px 0px -60% 0px", threshold: 0 });
    document.querySelectorAll(".section").forEach((s) => observer.observe(s));
  }

  function isLight(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");
    if (!m) return false;
    const r = parseInt(m[1], 16), g = parseInt(m[2], 16), b = parseInt(m[3], 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) > 165;
  }

  /* ---------- Router (hash #/id). Ignora gli hash di sezione (#sec-...) ---------- */
  function route() {
    if (location.hash.indexOf("#sec-") === 0) return; // ancore di sezione: non resettare la vista
    const m = location.hash.match(/^#\/(.+)$/);
    if (m) {
      const c = data.find((x) => x.id === m[1]);
      if (c) {
        listView.hidden = true; detailView.hidden = false;
        backBtn.hidden = false; searchWrap.hidden = true;
        renderDetail(c);
        return;
      }
    }
    detailView.hidden = true; listView.hidden = false;
    backBtn.hidden = true; searchWrap.hidden = false;
  }
  backBtn.addEventListener("click", () => { location.hash = ""; });
  window.addEventListener("hashchange", route);

  /* ---------- Lightbox immagini (zoom a tutto schermo) ---------- */
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.hidden = true;
  lightbox.innerHTML = '<button class="lightbox__close" aria-label="Chiudi">×</button><img alt="Pagina ingrandita" />';
  document.body.appendChild(lightbox);
  const lbImg = lightbox.querySelector("img");
  function closeLb() { lightbox.hidden = true; lbImg.src = ""; }
  sections.addEventListener("click", (e) => {
    const img = e.target.closest(".pageimg");
    if (img) { lbImg.src = img.dataset.full; lightbox.hidden = false; }
  });
  lightbox.addEventListener("click", closeLb);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });

  /* ---------- Avvio ---------- */
  renderList("");
  route();
})();
