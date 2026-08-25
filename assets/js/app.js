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
  const costView = el("costView");

  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const has = (s) => s && String(s).trim().length > 0;
  /* Testo discorsivo reso cliccabile: i nomi di meridiano, i muscoli, le
     costituzioni e le sigle dei punti diventano <a>. Se links.js non c'è
     (o non ha ancora i dati) si ripiega sull'escape normale. */
  const AL = (t, o) => (window.Links ? window.Links.autolink(t, o) : esc(t));
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

  /* ---------- Indicatore "i dati vengono salvati" (header) ----------
     L'area pazienti si sblocca con una passphrase: finché è bloccata
     (o non esiste) nulla viene registrato. Senza un segnale fisso in
     testata l'operatore se ne accorge solo quando riapre la scheda e
     la trova vuota. */
  const vaultBadge = el("vaultBadge");
  const BADGE = {
    off:    { t: "Dati non attivi", cls: "off",
              d: "L'area pazienti non è ancora stata creata: nulla viene salvato. Tocca per crearla." },
    locked: { t: "Bloccato", cls: "locked",
              d: "Area pazienti bloccata: in questo momento non stai salvando nulla. Tocca per sbloccarla con la passphrase." },
    on:     { t: "Salvataggio attivo", cls: "on",
              d: "Area pazienti sbloccata: quello che registri viene salvato cifrato su questo dispositivo." }
  };
  function renderVaultBadge() {
    const V = window.Vault;
    if (!vaultBadge || !V) return;
    V.isSetUp().then((setUp) => {
      const k = !setUp ? "off" : (V.unlocked() ? "on" : "locked");
      const b = BADGE[k];
      const info = (window.Pazienti && window.Pazienti.statoSync) ? window.Pazienti.statoSync() : null;
      /* Il sync si mostra solo da sbloccati: da bloccati non parte comunque. */
      const conSync = k === "on" && info && info.url && info.accettato;
      vaultBadge.hidden = false;
      vaultBadge.dataset.state = b.cls;
      vaultBadge.querySelector(".vbadge__t").textContent = b.t + (conSync ? " · sync" : "");
      let d = b.d;
      if (conSync) d += info.ultimo
        ? " Ultima sincronizzazione: " + new Date(info.ultimo).toLocaleString("it-IT") + "."
        : " Sync configurato, mai eseguito.";
      vaultBadge.title = d;
      vaultBadge.setAttribute("aria-label", "Area pazienti: " + b.t);
    }).catch(() => {});
  }
  if (vaultBadge) {
    vaultBadge.addEventListener("click", () => { location.hash = "#paz"; });
    if (window.Vault) {
      window.Vault.onLock(renderVaultBadge);
      window.Vault.onUnlock(renderVaultBadge);
    }
  }
  /* pazienti.js la richiama dopo un sync o un cambio di impostazioni. */
  window.aggiornaBadgeDati = renderVaultBadge;

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
  searchInput.addEventListener("input", () => {
    if (costView && !costView.hidden) { if (window.Cost) window.Cost.filter(searchInput.value); }
    else if (!listView.hidden) renderList(searchInput.value);
    applyHighlight(true);
  });

  /* ---------- Evidenziazione della ricerca (in ogni sezione) ----------
     La barra resta sempre visibile: dove non c'è un elenco da filtrare
     (coordinata, punti, sottopagine costituzioni) evidenziamo il testo. */
  const FOLD = { "à":"a","á":"a","â":"a","ä":"a","ã":"a","è":"e","é":"e","ê":"e","ë":"e",
                 "ì":"i","í":"i","î":"i","ï":"i","ò":"o","ó":"o","ô":"o","ö":"o","õ":"o",
                 "ù":"u","ú":"u","û":"u","ü":"u","ç":"c","ñ":"n" };
  /* fold conserva la lunghezza 1:1 (niente NFD): gli indici restano validi. */
  const fold = (s) => s.toLowerCase().replace(/[àáâäãèéêëìíîïòóôöõùúûüçñ]/g, (c) => FOLD[c] || c);
  const searchInfo = el("searchInfo");

  function clearHighlight(root) {
    root.querySelectorAll("mark.shl").forEach((m) => {
      const p = m.parentNode;
      p.replaceChild(document.createTextNode(m.textContent), m);
      p.normalize();
    });
  }
  function highlightIn(root, terms) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = n.parentNode;
        if (!p || /^(SCRIPT|STYLE|TEXTAREA|MARK)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
        if (p.namespaceURI && p.namespaceURI !== "http://www.w3.org/1999/xhtml") return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n);
    let count = 0;
    nodes.forEach((node) => {
      const f = fold(node.nodeValue);
      const hits = [];
      terms.forEach((t) => {
        for (let i = f.indexOf(t); i !== -1; i = f.indexOf(t, i + t.length)) hits.push([i, i + t.length]);
      });
      if (!hits.length) return;
      hits.sort((a, b) => a[0] - b[0]);
      // unisce le sovrapposizioni, poi spezza il nodo da destra a sinistra
      const merged = [];
      hits.forEach((h) => {
        const last = merged[merged.length - 1];
        if (last && h[0] <= last[1]) last[1] = Math.max(last[1], h[1]);
        else merged.push(h.slice());
      });
      count += merged.length;
      let cur = node;
      for (let i = merged.length - 1; i >= 0; i--) {
        cur.splitText(merged[i][1]);
        const hit = cur.splitText(merged[i][0]);
        const mk = document.createElement("mark");
        mk.className = "shl";
        hit.parentNode.replaceChild(mk, hit);
        mk.appendChild(hit);
      }
    });
    return count;
  }
  function activeView() {
    return [coordView, costView, puntiView, listView]
      .filter((v) => v && !v.hidden)[0] || null;
  }
  function applyHighlight(scroll) {
    [coordView, costView, puntiView, listView].forEach((v) => { if (v) clearHighlight(v); });
    const view = activeView();
    const terms = fold(searchInput.value).split(/\s+/).filter((t) => t.length >= 2);
    let n = 0;
    if (view && terms.length) n = highlightIn(view, terms);
    if (searchInfo) {
      searchInfo.hidden = !terms.length;
      searchInfo.textContent = n ? n + (n === 1 ? " risultato" : " risultati") : "nessun risultato";
    }
    if (scroll && n) {
      const first = view.querySelector("mark.shl");
      if (first) first.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }

  /* ---------- Blocchi di rendering ---------- */
  function muscleBlock(c) {
    /* Il nome del muscolo NON si autolinka: si è già sulla sua scheda. */
    const qui = window.Links ? window.Links.hrefCoord(c.id) : "";   // la sua stessa scheda
    const parts = [`<p class="mus-name">${esc(c.muscolo)}</p>`];
    parts.push(has(c.movimento) ? `<p>${AL(c.movimento, { salta: qui })}</p>`
      : '<p><span class="placeholder">Movimento da definire.</span></p>');
    if (has(c.movimentoNote)) parts.push(`<p class="movnote">${AL(c.movimentoNote, { salta: qui })}</p>`);
    return parts.join("");
  }

  function pointsBlock(arr) {
    const items = (arr || []).filter((x) => x && (has(x.zona) || has(x.nome) || has(x.note)));
    if (!items.length) return "";
    return '<ul class="points">' + items.map((x) => {
      const title = esc(x.zona || x.nome || "");
      const lato = has(x.lato) ? ` <span class="pt-lato">(${esc(x.lato)})</span>` : "";
      const note = has(x.note) ? `<div class="pt-note">${AL(x.note, { max: 3 })}</div>` : "";
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
    const L = window.Links;
    return head + '<div class="ess__list">' + rows.map((x) => {
      const sq = (x.squilibri || []).map((s) => `<li><span class="ess__box">\u2610</span> ${esc(s)}</li>`).join("");
      const ref = Array.isArray(x.posizioni) && x.posizioni.length
        ? `<span class="ess__ref">Pos. ${x.posizioni.join(", ")}</span>` : "";
      /* Lo stesso fiore vale su due posizioni speculari (k e 15-k) e a
         volte torna su un altro muscolo: da qui ci si arriva in un tocco
         invece di ricostruire la coordinata a mano. */
      const xl = L ? L.box("", [
        L.row("Stesso fiore, altra posizione", L.chipsPosFiore(c, x.posizioni)),
        L.row("Stesso fiore, altro muscolo", L.chipsFiore(x.nome, c.id))
      ]) : "";
      return `
      <div class="ess">
        <div class="ess__head"><span class="ess__name">${esc(x.nome || "—")}</span><span class="ess__type">${esc(x.tipo || "")}</span>${ref}</div>
        ${essScelgoBlock()}
        ${sq ? `<p class="ess__label">Il mio / La mia\u2026</p><ul class="ess__sq">${sq}</ul><p class="ess__label">\u2026 in amore senza limiti.</p>` : ""}
        ${has(x.frasi) ? `<div class="ess__imp">${esc(x.frasi)}</div>` : ""}
        ${xl}
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
  function stressPair(stress) {
    if (!has(stress)) return [];
    /* Si divide solo sulla "/" che separa le due voci (quella seguita da
       un'etichetta tipo "IoF:"), non sulle "/" dentro ai valori
       ("Estroverso/Inespressivo", "(da altri/o)"). */
    return String(stress).split(/\s*\/\s*(?=I[ro]\w*\s*:)/i).map((s) => s.trim()).filter(Boolean).map((p) => {
      const m = p.match(/^([^:]+):\s*(.*)$/);
      return { lab: m ? m[1].trim() : "", val: m ? m[2].trim() : p };
    });
  }
  function stressBlock(stress) {
    if (!has(stress)) return "";
    const parts = stressPair(stress);
    if (parts.length < 2) return `<p class="stress-line">${esc(stress)}</p>`;
    return '<div class="stress">' + parts.map((p) =>
      `<div class="stress__item"><span class="stress__lab">${esc(p.lab)}</span><span class="stress__sep">–</span><span class="stress__val">${esc(p.val)}</span></div>`
    ).join("") + "</div>";
  }

  /* ---------- Modi (uguali per tutte le coordinate) ---------- */
  const MODI = window.MODI || { img: {} };
  if (!MODI.img) MODI.img = {};
  function modiBlock(list, titolo) {
    const rows = (list || []).filter((m) => has(m.nome));
    if (!rows.length) return "";
    const h = titolo ? `<p class="modi__title">${esc(titolo)}</p>` : "";
    return `<div class="modi">${h}<ul class="modi__list">` + rows.map((m) => {
      const src = (MODI.mani || {})[m.nome];
      const img = src
        ? `<img class="pageimg modi__img" src="${esc(src)}" loading="lazy" alt="Modo ${esc(m.nome)}" />` : "";
      return `<li>${img}<div class="modi__body"><span class="modi__name">${esc(m.nome)}${has(m.tocco) ? ":" : ""}</span>` +
             `<span class="modi__touch">${esc(m.tocco)}</span></div></li>`;
    }).join("") + "</ul></div>";
  }
  /* Frase da compilare: il vuoto si riempie con una delle 2 voci IrF / IoF. */
  function fraseBlock(frase, voci) {
    const opz = voci.length
      ? '<ul class="ess__sq">' + voci.map((v) =>
          `<li><span class="ess__box">☐</span> <span class="frase__lab">${esc(v.lab)}</span> ${esc(v.val)}</li>`).join("") + "</ul>"
      : '<p><span class="placeholder">Nessuna voce IrF / IoF per questa posizione.</span></p>';
    return `<div class="ess">${essScelgoBlock()}
      <p class="ess__label">${esc(frase)}…</p>${opz}
      <p class="ess__label">… in una responsabile espressione di amore senza limiti.</p>
      <p class="frase__hint">Alla fine ne resta <strong>una sola</strong> delle due.</p></div>`;
  }
  function pensieroBlock(row) {
    const voci = stressPair(row && row.stress);
    return (MODI.pensiero || []).map((m) =>
      `${modiBlock([m], "Modo")}${fraseBlock(m.frase, voci)}`
    ).join("");
  }
  function tabellaBlock() {
    const t = MODI.tabella;
    if (!t) return "";
    return `<h4 class="subh">Tabella di riferimento — zona e tocco</h4>
      <p class="modi__note">${esc(t.testaOggetto)}<br />${esc(t.testaRif)}</p>
      <table class="modtab"><tbody>` + t.righe.map((r) =>
        `<tr><th>${esc(r[0])}</th><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join("") +
      `</tbody></table>` +
      imgGrid([MODI.img.tabella, MODI.img.acuAnt, MODI.img.acuPost], "Acu Touch",
              ["Tabella di riferimento", "Tabella Acu Touch · anteriore (Yin)", "Tabella Acu Touch · posteriore (Yang)"]);
  }

  /* ---------- Collegamenti fra sezioni (grafo in links.js) ----------
     Il perno è il meridiano: da una coordinata si raggiungono la mappa 3D,
     i punti d'allarme dell'organo, le costituzioni che lo coinvolgono e le
     altre coordinate che condividono lo stesso meridiano. */
  function uniqChips(list) {
    const seen = {}, out = [];
    (list || []).filter(Boolean).forEach((h) => {
      const m = /href="([^"]+)"/.exec(h);
      const k = m ? m[1] : h;
      if (seen[k]) return;
      seen[k] = 1; out.push(h);
    });
    return out;
  }
  function bothMer(fn, m1, m2) {
    return uniqChips(fn(m1).concat(m2 && m2 !== m1 ? fn(m2) : []));
  }
  function coordLinkRows(c1, c2) {
    const L = window.Links;
    if (!L) return [];
    const m1 = L.merOfCoord(c1), m2 = L.merOfCoord(c2);
    const mappa = uniqChips([
      m1 ? L.chipMer(m1, c1.meridiano) : "",
      (m2 && m2 !== m1) ? L.chipMer(m2, c2.meridiano) : ""
    ]);
    const el1 = L.elementoOf(m1), el2 = L.elementoOf(m2);
    const etichEl = el1 && el2 && el2 !== el1 ? "Stesso elemento (" + el1 + " / " + el2 + ")"
                  : "Stesso elemento" + (el1 ? " (" + el1 + ")" : "");
    return [
      L.row("Sulla mappa 3D", mappa),
      L.row("Punti d'allarme", bothMer(L.chipsPunti, m1, m2)),
      L.row("Costituzioni", bothMer(L.chipsCost, m1, m2)),
      L.row("Altre coordinate", uniqChips(
        L.chipsCoord(m1, c1.id).concat(m2 && m2 !== m1 ? L.chipsCoord(m2, c1.id) : [])
      )),
      L.row(etichEl, bothMer(L.chipsElemento, m1, m2)),
      L.row("Meridiano accoppiato", uniqChips([
        L.chipCoppia(m1), (m2 && m2 !== m1) ? L.chipCoppia(m2) : ""
      ])),
      L.row("Orologio cinese", uniqChips(L.chipsOrologio(m1))),
      L.row("Altre posizioni del muscolo", L.chipsPosizioni(c1, m2)),
      L.row("Prova al contrario", [L.chip({
        kind: "coord", href: L.hrefCoord(c2.id, c1.id), colore: c2.colore,
        label: "Muscolo " + c2.muscolo + ", posizione " + c1.meridiano,
        sub: "inverte i due meridiani",
        title: "Scambia i ruoli: " + c2.meridiano + " definisce il muscolo, " + c1.meridiano + " la posizione"
      })])
    ];
  }
  function linksSection(c1, c2) {
    const L = window.Links;
    if (!L) return PH;
    return L.box("", coordLinkRows(c1, c2),
      "Ogni voce apre la sezione dove quell'informazione è trattata per esteso.") || PH;
  }
  /* Striscia compatta sotto l'intestazione: le due voci più usate. */
  function linksStrip(c1, c2) {
    const L = window.Links;
    if (!L) return "";
    const m1 = L.merOfCoord(c1), m2 = L.merOfCoord(c2);
    const chips = uniqChips([
      m1 ? L.chipMer(m1, c1.meridiano) : "",
      (m2 && m2 !== m1) ? L.chipMer(m2, c2.meridiano) : ""
    ].concat(bothMer(L.chipsPunti, m1, m2)));
    if (!chips.length) return "";
    return '<div class="xlinks xlinks--strip">' + L.row("", chips) +
      '<a class="xlinks__more" href="#sec-collegamenti">tutti i collegamenti ↓</a></div>';
  }
  /* Le 14 posizioni dello stesso muscolo, una per meridiano di
     riferimento: cambiare posizione era l'operazione più frequente e
     costava tornare all'elenco e riscegliere il 2° meridiano. */
  function altrePosizioni(c1, c2) {
    const L = window.Links;
    if (!L) return "";
    const chips = L.chipsPosizioni(c1, L.merOfCoord(c2));
    if (!chips.length) return "";
    return L.box("", [L.row("", chips)],
      "Tutte le posizioni in cui si può testare " + c1.muscolo + ": tocca per aprire quella coordinata.");
  }
  /* Sotto la storia di un meridiano: elemento, natura, coppia e orologio.
     Sono i dati che stanno in meridiani_data.js e che finora la scheda
     della coordinata non mostrava affatto. */
  function merMetaLinks(c) {
    const L = window.Links;
    if (!L) return "";
    const id = L.merOfCoord(c), m = id ? L.mer(id) : null;
    if (!m) return "";
    const el = L.elementoOf(id);
    const meta = [
      el ? `<span class="mermeta__k">Elemento</span> ${esc(el)}` : "",
      m.natura ? `<span class="mermeta__k">Natura</span> ${esc(m.natura)}` : "",
      m.orario && m.orario !== "—" ? `<span class="mermeta__k">Massima energia</span> ${esc(m.orario)}` : ""
    ].filter(Boolean).join(" · ");
    return (meta ? `<p class="mermeta">${meta}</p>` : "") + L.box("", [
      L.row(el ? "Stesso elemento (" + el + ")" : "Stesso elemento", L.chipsElemento(id)),
      L.row("Accoppiato con", [L.chipCoppia(id)]),
      L.row("Orologio cinese", L.chipsOrologio(id))
    ]);
  }
  /* Nome di meridiano cliccabile dentro un testo discorsivo. */
  function merLink(nome) {
    const L = window.Links;
    const id = L ? L.merId(nome) : null;
    if (!id) return esc(nome);
    return '<a class="xref" href="' + esc(L.hrefMer(id)) + '">' + esc(nome) + "</a>";
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
    /* La storia del meridiano cita organi, elementi e altri meridiani:
       autolink, tranne il meridiano di cui si sta parlando (si è già lì). */
    const L0 = window.Links;
    const qui = [c1, c2].map(function (x) { return L0 ? L0.hrefCoord(x.id) : ""; });
    const hrefM1 = L0 && L0.merOfCoord(c1) ? L0.hrefMer(L0.merOfCoord(c1)) : "";
    const hrefM2 = L0 && L0.merOfCoord(c2) ? L0.hrefMer(L0.merOfCoord(c2)) : "";
    let merHtml = "";
    if (has(c1.storiaMeridiano)) merHtml += `<h4 class="subh">Meridiano del muscolo (1°): ${merLink(c1.meridiano)}</h4><p>${AL(c1.storiaMeridiano, { salta: qui.concat(hrefM1) })}</p>` + merMetaLinks(c1);
    if (c2.id !== c1.id && has(c2.storiaMeridiano)) merHtml += `<h4 class="subh">Meridiano di riferimento (2° · posizione): ${merLink(c2.meridiano)}</h4><p>${AL(c2.storiaMeridiano, { salta: qui.concat(hrefM2) })}</p>` + merMetaLinks(c2);
    if (!merHtml) merHtml = PH;

    // Sezione posizione: numero + riferimento + emozioni/atteggiamenti
    let posHtml;
    if (row) {
      posHtml =
        `<div class="posbox">
           <span class="posbox__num">Pos. ${esc(posN)}</span>
           <div class="posbox__body">
             <p class="posbox__ref">Meridiano di riferimento: <strong>${merLink(refMer)}</strong></p>
             <p class="posbox__hint">Definita dal 2° meridiano testato.</p>
           </div>
         </div>
         <h4 class="subh">Emozioni &amp; atteggiamenti</h4>
         ${stressBlock(row.stress)}`;
    } else {
      posHtml = `<p><span class="placeholder">Nessuna posizione trovata per «${esc(refMer)}» sul muscolo ${esc(c1.muscolo)}.</span></p>`;
    }
    posHtml += altrePosizioni(c1, c2);

    // Ampiezza: ritaglio della singola posizione (come NL/NV); fallback pagine intere
    const ampHtml = row && has(row.amp)
      ? '<h4 class="subh">Ampiezza del movimento · ' + esc(cap) + '</h4>' + posImg(row.amp, "Ampiezza · " + cap)
      : imgGrid(c1.immaginiAmpiezza, "Ampiezza", AMP_CAP);

    return [
      { id: "muscolo", label: "Muscolo & come testarlo",
        html: muscleBlock(c1) + imgGrid(c1.immaginiMonitoraggio, "Monitoraggio", MON_CAP) + ampHtml },
      { id: "posizione", label: "Posizione di test", html: posHtml },
      { id: "neurolinfatici", label: "Punti neuro-linfatici (NL)",
        html: modiBlock(MODI.neurolinfatici, "Modo") + nlScheda + nlList + nlImg },
      { id: "neurovascolari", label: "Punti neurovascolari (NV)",
        html: modiBlock(MODI.neurovascolari, "Modo") + nvScheda + nvList + nvImg },
      { id: "fiore", label: "Fiori / Atteggiamenti",
        html: modiBlock(MODI.fiori, "Modi") + fioreBlock(c1, row ? row.posizione : null) },
      { id: "pensiero", label: "Forme Pensiero & Sensazioni", html: pensieroBlock(row) },
      { id: "reflessologia", label: "Reflessologia (Basket Weaver)",
        html: modiBlock(MODI.reflessologia, "Modi") + reflexHtml },
      { id: "acutouch", label: "Acu Touch & Modo dell'Amore",
        html: modiBlock(MODI.acutouch, "Modi") + tabellaBlock() },
      { id: "genealogia", label: "Ologramma della Genealogia",
        html: modiBlock(MODI.genealogia, "Modo") +
              imgGrid([MODI.img.matrice], "Genealogia", ["Matrice olografica dell'energia genealogica"]) },
      { id: "modi", label: "Modi digitali",
        html: modiBlock(MODI.digitali) + pointsBlock(c1.modi) +
              imgGrid([MODI.img.digitali], "Modi digitali", ["Tavola dei modi digitali"]) },
      { id: "meridiani", label: "Meridiani coinvolti", html: merHtml },
      { id: "collegamenti", label: "Collegamenti", html: linksSection(c1, c2) }
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
      <button id="changeSecond" class="coord__change" type="button">↺ Cambia 2° meridiano (posizione)</button>
      ${linksStrip(c1, c2)}`;
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
    backBtn.hidden = false; searchWrap.hidden = false;
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
  window.openLightbox = (list, i) => lbOpen(list, i);
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
  /* Indirizzi profondi dentro la mappa:
       #punti/mer/<id>          scheda del meridiano
       #punti/mer/<id>/<sigla>  singolo punto MTC (es. .../vescica/V62)
       #punti/p/<id>            punto d'allarme
     Servono perché le altre sezioni possano puntare qui. */
  function parsePunti(h) {
    let m = /^#punti\/mer\/([^/]+)(?:\/([^/]+))?/.exec(h || "");
    if (m) return { t: "mer", id: decodeURIComponent(m[1]), sigla: m[2] ? decodeURIComponent(m[2]) : "" };
    m = /^#punti\/p\/(.+)$/.exec(h || "");
    if (m) return { t: "p", id: decodeURIComponent(m[1]) };
    return null;
  }
  /* punti.js è l'ultimo script della pagina e la scena 3D si costruisce
     al primo activate(): al primo giro PuntiMap può non esistere ancora. */
  function applyPuntiTarget(target, tries) {
    if (!target) return;
    const P = window.PuntiMap;
    if (!P || !P.selectPunto) {
      if ((tries || 0) > 20) return;
      setTimeout(() => applyPuntiTarget(target, (tries || 0) + 1), 30);
      return;
    }
    try {
      P.activate();
      if (target.t === "p") { P.selectPunto(target.id); return; }
      if (target.sigla && P.selectMerPointBySigla && P.selectMerPointBySigla(target.sigla)) return;
      P.selectMeridiano(target.id);
    } catch (e) { /* niente WebGL: la sezione resta consultabile dall'elenco */ }
  }
  function showPunti(hash) {
    setActiveTab("punti");
    listView.hidden = true; coordView.hidden = true; puntiView.hidden = false;
    searchWrap.hidden = false;
    const target = parsePunti(hash);
    backBtn.hidden = !target;
    if (window.PuntiMap) window.PuntiMap.activate();
    applyPuntiTarget(target);
    window.scrollTo(0, 0); updateStick();
  }
  function leavePunti() {
    puntiView.hidden = true;
    if (window.PuntiMap) window.PuntiMap.deactivate();
  }
  /* --- Costituzioni & Temperamenti --- */
  function showCost(hash) {
    setActiveTab("costituzioni");
    listView.hidden = true; coordView.hidden = true; puntiView.hidden = true;
    if (window.PuntiMap) window.PuntiMap.deactivate();
    if (!costView) return;
    costView.hidden = false;
    const tipo = window.Cost ? window.Cost.show(hash) : "home";
    const home = tipo === "home";
    searchWrap.hidden = false;
    backBtn.hidden = home;
    if (home && window.Cost) window.Cost.filter(searchInput.value);
    window.scrollTo(0, 0); updateStick();
  }
  function leaveCost() { if (costView) costView.hidden = true; }
  if (macronav) {
    macronav.addEventListener("click", (e) => {
      const t = e.target.closest(".macronav__tab"); if (!t) return;
      const sec = t.dataset.sec;
      if (sec === "punti") location.hash = "";                     // Punti = default
      else if (sec === "costituzioni") location.hash = "#costituzioni";
      else if (sec === "pazienti") location.hash = "#paz";
      else location.hash = "#coordinate";                          // Coordinate
    });
  }

  /* ---------- Editor punti (wiring UI) ---------- */
  (function initEditorUI() {
    const menuBtn = el("puntiMenuToggle"), menu = el("puntiMenu");
    const toggle = el("editToggle"), tools = el("editTools"), hint = el("editHint");
    const exportBtn = el("editExport"), resetBtn = el("editReset");
    if (!toggle) return;

    if (menuBtn && menu) {
      function setMenuOpen(open) {
        menu.hidden = !open;
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      }
      menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        setMenuOpen(menu.hidden);
      });
      document.addEventListener("click", (e) => {
        if (!menu.hidden && !menu.contains(e.target) && e.target !== menuBtn) setMenuOpen(false);
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !menu.hidden) setMenuOpen(false);
      });
    }
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
    const addBtn = el("editAdd");
    if (addBtn) addBtn.addEventListener("click", () => {
      if (window.PuntiMap && window.PuntiMap.addPoint) window.PuntiMap.addPoint();
    });
    const importBtn = el("editImport"), importFile = el("editImportFile");
    if (importBtn && importFile) {
      importBtn.addEventListener("click", () => importFile.click());
      importFile.addEventListener("change", () => {
        const f = importFile.files && importFile.files[0];
        if (!f) return;
        const r = new FileReader();
        r.onload = () => {
          if (window.PuntiMap && window.PuntiMap.importJSON) window.PuntiMap.importJSON(String(r.result));
          importFile.value = "";
        };
        r.readAsText(f);
      });
    }
  })();

  /* ---------- Router (hash) ---------- */
  function route() { routeTo(); applyHighlight(false); }
  function routeTo() {
    const h = location.hash;
    // Sezione Pazienti (dati cifrati in locale, vedi pazienti.js)
    if (h.indexOf("#paz") === 0) {
      firstMeridian = null; leavePunti(); leaveCost();
      listView.hidden = true; coordView.hidden = true;
      setActiveTab("pazienti");
      searchWrap.hidden = true; backBtn.hidden = false;
      if (window.Pazienti) window.Pazienti.show(h);
      window.scrollTo(0, 0); updateStick();
      return;
    }
    if (window.Pazienti) window.Pazienti.hide();
    // Default (nessun hash) o esplicito #punti => sezione Punti Indicatori
    if (h === "" || h === "#" || h.indexOf("#punti") === 0) { firstMeridian = null; leaveCost(); showPunti(h); return; }
    // Sezione Costituzioni & Temperamenti
    if (h === "#costituzioni" || h.indexOf("#cost/") === 0) { firstMeridian = null; showCost(h); return; }
    // Da qui in poi siamo nella sezione Coordinate
    leavePunti(); leaveCost(); setActiveTab("coordinate");
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
    /* Su un indirizzo profondo della mappa il "indietro" utile è quello del
       browser: si torna alla coordinata (o alla costituzione) di partenza. */
    if (parsePunti(location.hash)) {
      if (history.length > 1) history.back(); else location.hash = "#punti";
      return;
    }
    if (location.hash.indexOf("#paz") === 0) {
      if (window.Pazienti) window.Pazienti.back();
      return;
    }
    if (costView && !costView.hidden) {
      const v = window.Cost ? window.Cost.parse(location.hash) : { tipo: "home" };
      if (v.tipo === "teoria" && v.id) location.hash = "#cost/teoria";
      else if (v.tipo === "coppia" && v.id2) location.hash = "#cost/coppia/" + v.id;
      else if (v.tipo === "coppia" && v.id) location.hash = "#cost/coppia";
      else location.hash = "#costituzioni";
      return;
    }
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

  renderVaultBadge();
  route();
})();

