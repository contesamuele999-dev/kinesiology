/* app.js — Fisiologia Applicata (modello MUSCOLO + POSIZIONE).
   Il 1° meridiano scelto definisce il MUSCOLO da testare.
   Il 2° meridiano scelto definisce la POSIZIONE in cui testarlo.
   La coordinata mostra: muscolo & come testarlo, la posizione specifica con
   le sue emozioni/atteggiamenti, i punti NL e NV di quella posizione, i modi,
   i meridiani coinvolti, i fiori e le immagini. Vanilla JS. */
(function () {
  "use strict";
  const data = window.COORDINATE || [];

  const el = (id) => document.getElementById(id);
  const listView = el("listView"), coordView = el("coordView");
  const grid = el("grid"), noResults = el("noResults"), listHead = el("listHead");
  const searchInput = el("search"), searchWrap = el("searchWrap");
  const backBtn = el("backBtn"), themeBtn = el("themeBtn");
  const coordHead = el("coordHead"), coordTabs = el("coordTabs"), sections = el("sections");
  const puntiView = el("puntiView"), macronav = el("macronav");

  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const has = (s) => s && String(s).trim().length > 0;
  const PH = '<p><span class="placeholder">Da compilare dai manuali.</span></p>';
  const PH_IMG = '<p><span class="placeholder">Nessuna immagine disponibile.</span></p>';
  const find = (id) => data.find((x) => x.id === id);
  const keyOf = (c) => c.meridianoKey || c.meridiano;

  /* Trova la riga atteggiamenti (posizione) del muscolo c1 che corrisponde
     al meridiano di riferimento del 2° meridiano c2. */
  function posFor(c1, c2) {
    if (!c1 || !c2) return null;
    const k = keyOf(c2);
    return (c1.atteggiamenti || []).find((a) => a.meridiano === k) || null;
  }

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
    if (window.PuntiMap && window.PuntiMap.retheme) window.PuntiMap.retheme();
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

  /* ---------- Indice di ricerca ---------- */
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

  /* ---------- Stato ----------
     firstMeridian = null  → Home (scegli 1° meridiano = MUSCOLO)
     firstMeridian = <c>   → scegli 2° meridiano = POSIZIONE            */
  let firstMeridian = null;

  /* ---------- Card meridiano ---------- */
  function meridianCard(c) {
    let extra = "";
    if (firstMeridian) {
      const p = posFor(firstMeridian, c);
      extra = p
        ? `<span class="card__pos">${esc(p.posizione)}</span>`
        : `<span class="card__pos card__pos--na">–</span>`;
    }
    return `
      <button class="card" data-id="${esc(c.id)}">
        <span class="card__color" style="background:${esc(c.colore)}"></span>
        <span class="card__body">
          <span class="card__meridian">${esc(c.meridiano)}</span>
          <span class="card__muscle">${esc(c.muscolo)}</span>
          <span class="card__colorname">${esc(c.coloreNome)}</span>
        </span>
        ${extra}
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
           <span class="pairchip" style="--c:${esc(firstMeridian.colore)}">
             1° · ${esc(firstMeridian.meridiano)}
           </span>
           <span class="pairchip pairchip--q">2° · scegli la posizione</span>
         </div>
         <p class="listhead__muscle">Muscolo da testare: <strong>${esc(firstMeridian.muscolo)}</strong></p>
         <p class="listhead__hint">Il <strong>2° meridiano</strong> definisce la <strong>posizione</strong> in cui testarlo. L'etichetta mostra il numero di posizione.</p>`;
    } else {
      listHead.innerHTML =
        `<p class="listhead__hint">Scegli il <strong>1° meridiano</strong>: definisce il <strong>muscolo</strong> da testare.</p>`;
    }

    grid.innerHTML = rows.map(meridianCard).join("");
    noResults.hidden = rows.length > 0;
    noResults.textContent = firstMeridian ? "Nessun secondo meridiano trovato." : "Nessun meridiano trovato.";
  }

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const id = card.dataset.id;
    if (firstMeridian) location.hash = "#/" + firstMeridian.id + "+" + id;
    else location.hash = "#/" + id;
  });
  searchInput.addEventListener("input", () => renderList(searchInput.value));

  /* ---------- Blocchi di rendering ---------- */
  function muscleBlock(c) {
    const parts = [`<p class="mus-name">${esc(c.muscolo)}</p>`];
    parts.push(has(c.movimento) ? `<p>${esc(c.movimento)}</p>`
      : '<p><span class="placeholder">Movimento da definire.</span></p>');
    if (has(c.movimentoNote)) parts.push(`<p class="movnote">${esc(c.movimentoNote)}</p>`);
    return parts.join("");
  }

  function pointsBlock(arr) {
    const items = (arr || []).filter((x) => x && (has(x.zona) || has(x.nome) || has(x.note)));
    if (!items.length) return "";
    return '<ul class="points">' + items.map((x) => {
      const title = esc(x.zona || x.nome || "");
      const lato = has(x.lato) ? ` <span class="pt-lato">(${esc(x.lato)})</span>` : "";
      const note = has(x.note) ? `<div class="pt-note">${esc(x.note)}</div>` : "";
      return `<li><span class="pt-title">${title}</span>${lato}${note}</li>`;
    }).join("") + "</ul>";
  }

  /* Checkbox fissi "scelgo di ..." (uguali per tutti i fiori nel manuale) */
  function essScelgoBlock() {
    const opzioni = ["tramutare", "trasformare", "trascendere", "dissolvere"];
    return `<p class="ess__intro">Mi prendo la responsabilit\u00e0 dei miei atteggiamenti ed ora con gentilezza, cortesia, amore e dandomi sostegno scelgo di \u2026</p>` +
      '<ul class="ess__scelgo">' + opzioni.map((o) => `<li><span class="ess__box">\u2610</span> ${esc(o)}</li>`).join("") + "</ul>";
  }

  /* Sezione Fiori: mostra SOLO i fiori relativi alla posizione corrente.
     posN = numero della posizione (row.posizione). Ogni fiore ha x.posizioni = [k, 15-k]. */
  function fioreBlock(c, posN) {
    let rows = (c.fiore || []).filter((x) => has(x.nome) || has(x.tipo));
    if (!rows.length) return PH;
    // filtra per posizione se disponibile
    if (posN != null) {
      const f = rows.filter((x) => Array.isArray(x.posizioni) && x.posizioni.indexOf(Number(posN)) !== -1);
      if (f.length) rows = f;
    }
    const head = posN != null
      ? `<p class="ess__head-sec">Fiori per la <strong>posizione ${esc(posN)}</strong></p>`
      : "";
    return head + '<div class="ess__list">' + rows.map((x) => {
      const sq = (x.squilibri || []).map((s) => `<li><span class="ess__box">\u2610</span> ${esc(s)}</li>`).join("");
      const ref = Array.isArray(x.posizioni) && x.posizioni.length
        ? `<span class="ess__ref">Pos. ${x.posizioni.join(", ")}</span>` : "";
      return `
      <div class="ess">
        <div class="ess__head"><span class="ess__name">${esc(x.nome || "—")}</span><span class="ess__type">${esc(x.tipo || "")}</span>${ref}</div>
        ${essScelgoBlock()}
        ${sq ? `<p class="ess__label">Il mio / La mia\u2026</p><ul class="ess__sq">${sq}</ul><p class="ess__label">\u2026 in amore senza limiti.</p>` : ""}
        ${has(x.frasi) ? `<div class="ess__imp">${esc(x.frasi)}</div>` : ""}
      </div>`;
    }).join("") + "</div>";
  }

  /* Immagine singola (posizione) con didascalia, apre lightbox */
  function posImg(src, caption) {
    if (!has(src)) return PH_IMG;
    const cap = caption ? `<figcaption>${esc(caption)}</figcaption>` : "";
    return `<div class="pages pages--single"><figure class="pagefig"><img class="pageimg" src="${esc(src)}" loading="lazy" alt="${esc(caption || "Immagine")}" />${cap}</figure></div>`;
  }

  /* Riga di immagini reflessologia (mani/piedi dominante dx+sx) */
  function reflexRow(items) {
    const figs = items.filter((it) => has(it.src));
    if (!figs.length) return "";
    return '<div class="pages">' + figs.map((it) =>
      `<figure class="pagefig"><img class="pageimg" src="${esc(it.src)}" loading="lazy" alt="${esc(it.cap)}" /><figcaption>${esc(it.cap)}</figcaption></figure>`
    ).join("") + "</div>";
  }

  /* Sezione Reflessologia (Basket Weaver): corpo + mani dx/sx + piedi dx/sx + ruota */
  function reflexBlock(c1, row, cap) {
    const parts = [];
    if (row && has(row.reflex))
      parts.push('<h4 class="subh">Corpo · ' + esc(cap) + '</h4>' + posImg(row.reflex, "Corpo · " + cap));
    const mani = row ? reflexRow([
      { src: row.refHandDx, cap: "Mano · dominante destra" },
      { src: row.refHandSx, cap: "Mano · dominante sinistra" }
    ]) : "";
    if (mani) parts.push('<h4 class="subh">Mani · ' + esc(cap) + '</h4>' + mani);
    const piedi = row ? reflexRow([
      { src: row.refFootDx, cap: "Piede · dominante destro" },
      { src: row.refFootSx, cap: "Piede · dominante sinistro" }
    ]) : "";
    if (piedi) parts.push('<h4 class="subh">Piedi · ' + esc(cap) + '</h4>' + piedi);
    if (has(c1.ruota))
      parts.push('<h4 class="subh">Ruota energetica</h4>' + posImg(c1.ruota, "Ruota energetica — " + c1.muscolo));
    if (!parts.length)
      return '<p><span class="placeholder">Reflessologia non disponibile per questo muscolo nel manuale Basket Weaver.</span></p>';
    return parts.join("");
  }

  /* Parsing dello stress "IrF: X / IoF: Y" in coppia leggibile */
  function stressBlock(stress) {
    if (!has(stress)) return "";
    const parts = String(stress).split("/").map((s) => s.trim()).filter(Boolean);
    if (parts.length < 2) return `<p class="stress-line">${esc(stress)}</p>`;
    return '<div class="stress">' + parts.map((p) => {
      const m = p.match(/^([^:]+):\s*(.*)$/);
      const lab = m ? m[1].trim() : "";
      const val = m ? m[2].trim() : p;
      return `<div class="stress__item"><span class="stress__lab">${esc(lab)}</span><span class="stress__sep">–</span><span class="stress__val">${esc(val)}</span></div>`;
    }).join("") + "</div>";
  }

  /* ---------- Vista coordinata (muscolo + posizione) ---------- */
  let pair = [null, null];   // [c1 = muscolo/1°, c2 = posizione/2°]

  function sectionsFor(c1, c2, row) {
    const posN = row ? row.posizione : null;
    const refMer = c2.meridiano;
    const posLabel = posN ? `Posizione ${posN} — ${refMer}` : refMer;

    // Punti NL/NV: scheda principale del muscolo + dettaglio della posizione
    const cap = posN ? ("Posizione " + posN + " — " + refMer) : refMer;
    const nlScheda = has(c1.schedaNL) ? posImg(c1.schedaNL, "Punti principali del muscolo (Ant. & Post.)") : "";
    const nvScheda = has(c1.schedaNV) ? posImg(c1.schedaNV, "Punti principali del muscolo") : "";
    const nlList = pointsBlock(c1.neuroLinfatici);
    const nlImg = row && has(row.nl) ? posImg(row.nl, "Dettaglio NL · " + cap) : "";
    const nvList = pointsBlock(c1.neurovascolari);
    const nvImg = row && has(row.nv) ? posImg(row.nv, "Dettaglio NV · " + cap) : "";
    const reflexHtml = reflexBlock(c1, row, cap);

    // Meridiani coinvolti
    let merHtml = "";
    if (has(c1.storiaMeridiano)) merHtml += `<h4 class="subh">Meridiano del muscolo (1°): ${esc(c1.meridiano)}</h4><p>${esc(c1.storiaMeridiano)}</p>`;
    if (c2.id !== c1.id && has(c2.storiaMeridiano)) merHtml += `<h4 class="subh">Meridiano di riferimento (2° · posizione): ${esc(c2.meridiano)}</h4><p>${esc(c2.storiaMeridiano)}</p>`;
    if (!merHtml) merHtml = PH;

    // Sezione posizione: numero + riferimento + emozioni/atteggiamenti
    let posHtml;
    if (row) {
      posHtml =
        `<div class="posbox">
           <span class="posbox__num">Pos. ${esc(posN)}</span>
           <div class="posbox__body">
             <p class="posbox__ref">Meridiano di riferimento: <strong>${esc(refMer)}</strong></p>
             <p class="posbox__hint">Definita dal 2° meridiano testato.</p>
           </div>
         </div>
         <h4 class="subh">Emozioni &amp; atteggiamenti</h4>
         ${stressBlock(row.stress)}`;
    } else {
      posHtml = `<p><span class="placeholder">Nessuna posizione trovata per «${esc(refMer)}» sul muscolo ${esc(c1.muscolo)}.</span></p>`;
    }

    // Ampiezza: ritaglio della singola posizione (come NL/NV); fallback pagine intere
    const ampHtml = row && has(row.amp)
      ? '<h4 class="subh">Ampiezza del movimento · ' + esc(cap) + '</h4>' + posImg(row.amp, "Ampiezza · " + cap)
      : imgGrid(c1.immaginiAmpiezza, "Ampiezza", AMP_CAP);

    return [
      { id: "muscolo", label: "Muscolo & come testarlo",
        html: muscleBlock(c1) + imgGrid(c1.immaginiMonitoraggio, "Monitoraggio", MON_CAP) + ampHtml },
      { id: "posizione", label: "Posizione di test", html: posHtml },
      { id: "neurolinfatici", label: "Punti neuro-linfatici (NL)", html: nlScheda + nlList + nlImg },
      { id: "neurovascolari", label: "Punti neurovascolari (NV)", html: nvScheda + nvList + nvImg },
      { id: "modi", label: "Modi", html: pointsBlock(c1.modi) || PH },
      { id: "meridiani", label: "Meridiani coinvolti", html: merHtml },
      { id: "fiore", label: "Fiori / essenze", html: fioreBlock(c1, row ? row.posizione : null) },
      { id: "reflessologia", label: "Reflessologia (Basket Weaver)", html: reflexHtml }
    ];
  }

  const MON_CAP = ["Test muscolo (facilitazione)", "Test organo correlato (inibizione)"];
  const AMP_CAP = ["Agonista", "Antagonista", "Antagonista (2)"];
  function imgGrid(list, alt, captions) {
    const imgs = (list || []).filter(has);
    if (!imgs.length) return "";
    return '<div class="pages">' + imgs.map((src, i) => {
      const cap = captions && captions[i] ? `<figcaption>${esc(captions[i])}</figcaption>` : "";
      return `<figure class="pagefig"><img class="pageimg" src="${esc(src)}" loading="lazy" alt="${esc(alt || "Immagine")} ${i + 1}" />${cap}</figure>`;
    }).join("") + "</div>";
  }

  function renderCoordHead() {
    const [c1, c2] = pair;
    const row = posFor(c1, c2);
    const posN = row ? row.posizione : "—";
    coordHead.innerHTML = `
      <p class="coord__label">Coordinata di test</p>
      <div class="coord__roles">
        <div class="coord__role" style="--c:${esc(c1.colore)}">
          <span class="coord__tag">1° meridiano → muscolo</span>
          <span class="coord__mer">${esc(c1.meridiano)}</span>
          <span class="coord__mus">${esc(c1.muscolo)}</span>
        </div>
        <div class="coord__role" style="--c:${esc(c2.colore)}">
          <span class="coord__tag">2° meridiano → posizione</span>
          <span class="coord__mer">${esc(c2.meridiano)}</span>
          <span class="coord__mus">Posizione ${esc(posN)}</span>
        </div>
      </div>
      <button id="changeSecond" class="coord__change" type="button">↺ Cambia 2° meridiano (posizione)</button>`;
    el("changeSecond").addEventListener("click", () => { location.hash = "#/" + pair[0].id; });
  }

  function renderSections() {
    const [c1, c2] = pair;
    const row = posFor(c1, c2);
    sections.innerHTML = sectionsFor(c1, c2, row).map((s) =>
      `<section class="section" id="sec-${s.id}">
         <h3>${s.label}</h3>${s.html}</section>`).join("");
    updateStick();
  }

  function showCoordinate(c1, c2) {
    pair = [c1, c2];
    coordTabs.innerHTML = "";
    listView.hidden = true; coordView.hidden = false;
    backBtn.hidden = false; searchWrap.hidden = true;
    renderCoordHead();
    renderSections();
    window.scrollTo(0, 0);
    updateStick();
  }

  function showList() {
    coordView.hidden = true; listView.hidden = false;
    searchWrap.hidden = false;
    backBtn.hidden = !firstMeridian;
    renderList(searchInput.value);
    updateStick();
  }

  /* ---------- Lightbox ---------- */
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
  function lbOpen(list, i) { lbList = list; lightbox.hidden = false; document.body.classList.add("lb-open"); lbShow(i); }
  function lbCloseFn() { lightbox.hidden = true; document.body.classList.remove("lb-open"); lbImg.src = ""; }
  sections.addEventListener("click", (e) => {
    const img = e.target.closest(".pageimg");
    if (!img) return;
    const sec = img.closest(".section");
    const thumbs = Array.from(sec.querySelectorAll(".pageimg"));
    lbOpen(thumbs.map((t) => t.getAttribute("src")), thumbs.indexOf(img));
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

  /* ---------- Macrosezioni (Coordinate / Punti Indicatori) ---------- */
  function setActiveTab(sec) {
    if (!macronav) return;
    Array.from(macronav.querySelectorAll(".macronav__tab"))
      .forEach((b) => b.classList.toggle("active", b.dataset.sec === sec));
  }
  function showPunti() {
    setActiveTab("punti");
    listView.hidden = true; coordView.hidden = true; puntiView.hidden = false;
    searchWrap.hidden = true; backBtn.hidden = true;
    if (window.PuntiMap) window.PuntiMap.activate();
    window.scrollTo(0, 0); updateStick();
  }
  function leavePunti() {
    puntiView.hidden = true;
    if (window.PuntiMap) window.PuntiMap.deactivate();
  }
  if (macronav) {
    macronav.addEventListener("click", (e) => {
      const t = e.target.closest(".macronav__tab"); if (!t) return;
      if (t.dataset.sec === "punti") location.hash = "";       // Punti = default
      else location.hash = "#coordinate";                        // Coordinate
    });
  }

  /* ---------- Editor punti (wiring UI) ---------- */
  (function initEditorUI() {
    const toggle = el("editToggle"), tools = el("editTools"), hint = el("editHint");
    const exportBtn = el("editExport"), resetBtn = el("editReset");
    if (!toggle) return;
    function setOn(on) {
      toggle.setAttribute("aria-pressed", on ? "true" : "false");
      toggle.textContent = on ? "✓ Fine modifica" : "✎ Modifica punti";
      if (tools) tools.hidden = !on;
      if (hint) hint.hidden = !on;
      if (window.PuntiMap && window.PuntiMap.setEditing) window.PuntiMap.setEditing(on);
    }
    toggle.addEventListener("click", () => {
      const on = toggle.getAttribute("aria-pressed") !== "true";
      setOn(on);
    });
    if (exportBtn) exportBtn.addEventListener("click", () => {
      if (window.PuntiMap && window.PuntiMap.exportJSON) window.PuntiMap.exportJSON();
    });
    if (resetBtn) resetBtn.addEventListener("click", () => {
      if (window.PuntiMap && window.PuntiMap.resetPositions) window.PuntiMap.resetPositions();
    });
  })();

  /* ---------- Router (hash) ---------- */
  function route() {
    const h = location.hash;
    // Default (nessun hash) o esplicito #punti => sezione Punti Indicatori
    if (h === "" || h === "#" || h === "#punti") { firstMeridian = null; showPunti(); return; }
    // Da qui in poi siamo nella sezione Coordinate
    leavePunti(); setActiveTab("coordinate");
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
    firstMeridian = null; showList();  // "#coordinate" => home Coordinate
  }
  backBtn.addEventListener("click", () => {
    if (!coordView.hidden) location.hash = "#/" + pair[0].id;
    else location.hash = "#coordinate";
  });
  window.addEventListener("hashchange", route);

  /* ---------- PWA ---------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => {}); });
  }
  (function initInstallPopup() {
    const pop = el("installPop");
    if (!pop) return;
    const btn = el("installBtn"), later = el("installLater"), closeX = el("installClose");
    const textEl = el("installText"), titleEl = el("installTitle");
    const SEEN_KEY = "kapp-install-seen";
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
    const ua = navigator.userAgent || "";
    const isIOS = /iphone|ipad|ipod/i.test(ua) && !window.MSStream;
    let deferredPrompt = null;
    function show() { if (isStandalone) return; if (safeGet(SEEN_KEY)) return; pop.hidden = false; document.body.classList.add("installpop-open"); }
    function dismiss() { pop.hidden = true; document.body.classList.remove("installpop-open"); safeSet(SEEN_KEY, "1"); }
    window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferredPrompt = e; show(); });
    window.addEventListener("appinstalled", () => { safeSet(SEEN_KEY, "1"); dismiss(); });
    btn.addEventListener("click", async () => {
      if (deferredPrompt) { deferredPrompt.prompt(); try { await deferredPrompt.userChoice; } catch (e) {} deferredPrompt = null; dismiss(); }
      else { dismiss(); }
    });
    later.addEventListener("click", dismiss);
    closeX.addEventListener("click", dismiss);
    pop.addEventListener("click", (e) => { if (e.target === pop) dismiss(); });
    if (isIOS && !isStandalone && !safeGet(SEEN_KEY)) {
      titleEl.textContent = "Aggiungi alla Home";
      textEl.innerHTML = 'Tocca il pulsante <strong>Condividi</strong> <span aria-hidden="true">⏏</span> e poi <strong>«Aggiungi a Home»</strong> per installare l\'app e usarla offline.';
      btn.textContent = "Ho capito";
      setTimeout(show, 1200);
    }
  })();

  route();
})();

