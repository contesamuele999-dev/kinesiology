/* app.js — logica UI: elenco coordinate (muscolo↔movimento), ricerca, dettaglio
   a 6 sezioni collegate (neuro-linfatici, neurovascolari, modi, affermazioni,
   meridiani, fiore), tema chiaro/scuro. Vanilla JS. */
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
  const PH = '<p><span class="placeholder">Da compilare dai manuali.</span></p>';

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

  /* ---------- Altezza header sticky (ancore + scroll-margin) ---------- */
  const topbar = document.querySelector(".topbar");
  function updateStick(){
    const th = topbar ? topbar.offsetHeight : 60;
    const ah = (anchors && !detailView.hidden) ? anchors.offsetHeight : 0;
    const rs = document.documentElement.style;
    rs.setProperty("--topbar-h", th + "px");
    rs.setProperty("--stick-h", (th + ah + 14) + "px");
  }
  window.addEventListener("resize", updateStick);

  /* ---------- Elenco + ricerca ---------- */
  function renderList(filter) {
    const q = norm(filter);
    const rows = data.filter((c) =>
      !q || norm(c.muscolo).includes(q) || norm(c.movimento).includes(q)
        || norm(c.meridiano).includes(q) || norm(c.coloreNome).includes(q)
    );
    grid.innerHTML = rows.map((c) => `
      <button class="card" data-id="${esc(c.id)}">
        <span class="card__color" style="background:${esc(c.colore)}"></span>
        <span class="card__body">
          <span class="card__meridian">${esc(c.muscolo)}</span>
          <span class="card__muscle">${esc(c.movimento) || "Movimento da definire"}</span>
          <span class="card__colorname">${esc(c.meridiano)} · ${esc(c.coloreNome)}</span>
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

  /* ---------- Blocchi di rendering delle sezioni ---------- */
  // Punti (neuro-linfatici / neurovascolari) e modi: {zona|nome, lato, note}
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

  // Affermazioni: elenco frasi + tabella atteggiamenti collegati
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

  // Meridiani: nome + storia/attributi del meridiano
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

  /* ---------- Dettaglio ---------- */
  function renderDetail(c) {
    detailHead.style.background = c.colore;
    detailHead.style.color = isLight(c.colore) ? "#12202b" : "#fff";
    detailHead.innerHTML = `
      <h2>${esc(c.muscolo)}</h2>
      <div class="muscle">${esc(c.movimento) || "Movimento da definire"}</div>
      ${has(c.movimentoNote) ? `<div class="movnote">${esc(c.movimentoNote)}</div>` : ""}
      <span class="chip">${esc(c.meridiano)}</span>
      <span class="chip">${esc(c.coloreNome)}</span>`;

    const secs = [
      { id: "neurolinfatici", label: "Punti neuro-linfatici", html: pointsBlock(c.neuroLinfatici) },
      { id: "neurovascolari", label: "Punti neurovascolari", html: pointsBlock(c.neurovascolari) },
      { id: "modi", label: "Modi", html: pointsBlock(c.modi) },
      { id: "affermazioni", label: "Affermazioni", html: affBlock(c) },
      { id: "meridiani", label: "Meridiani", html: meridianiBlock(c) },
      { id: "fiore", label: "Fiore", html: fioreBlock(c) }
    ];

    anchors.innerHTML = secs.map((s, i) =>
      `<a href="#sec-${s.id}" data-sec="${s.id}"${i === 0 ? ' class="active"' : ""}>${s.label}</a>`).join("");
    sections.innerHTML = secs.map((s) =>
      `<section class="section" id="sec-${s.id}" style="--accent:${esc(c.colore)}">
         <h3>${s.label}</h3>${s.html}</section>`).join("");

    window.scrollTo(0, 0);
    watchSections();
    updateStick();
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
    if (location.hash.indexOf("#sec-") === 0) return;
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
    updateStick();
  }
  backBtn.addEventListener("click", () => { location.hash = ""; });
  window.addEventListener("hashchange", route);

  /* ---------- Avvio ---------- */
  renderList("");
  route();
})();
