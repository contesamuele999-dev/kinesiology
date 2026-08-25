/* links.js — il grafo dei collegamenti fra le sezioni dell'app.

   Coordinate, Punti d'Allarme e Costituzioni parlano tutte dello stesso
   oggetto — il MERIDIANO — ma con nomi diversi: la coordinata dice
   "Milza", il punto d'allarme dice "Milza (sx)", la costituzione dice
   "M – P" e il punto di test dice "M4". Qui si normalizza tutto su un
   unico id (quello di meridiani_data.js) e da lì si risale a ciò che è
   collegato, in qualunque direzione.

   Oltre al perno "meridiano" il grafo conosce altre quattro dimensioni,
   tutte ricavate dai dati e mai scritte a mano: l'ELEMENTO (i 5
   movimenti), la COPPIA yin/yang, l'OROLOGIO cinese (precedente,
   successivo e opposto nel giro delle 24 ore) e le 14 POSIZIONI di un
   muscolo. In più sa trasformare un testo discorsivo in testo cliccabile
   (autolink), perché i manuali nominano di continuo meridiani, muscoli,
   costituzioni e sigle di punti.

   Nessuna dipendenza, nessun rendering proprio: espone dati e piccoli
   frammenti HTML che le sezioni incollano dove vogliono. */
(function () {
  "use strict";

  var MER = (window.MERIDIANI && window.MERIDIANI.meridiani) || [];
  var ALIAS = (window.MERIDIANI && window.MERIDIANI.alias) || {};
  var COORD = window.COORDINATE || [];
  var PUNTI = (window.PUNTI_INDICATORI && window.PUNTI_INDICATORI.punti) || [];
  var COST = (window.COSTITUZIONI && window.COSTITUZIONI.costituzioni) || [];
  var BIOT = (window.COSTITUZIONI && window.COSTITUZIONI.biotipi) || [];

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function norm(s) {
    return String(s == null ? "" : s).toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/\(.*?\)/g, " ")          // "Milza (sx)" -> "milza"
      .replace(/[^a-z0-9]+/g, " ").trim();
  }

  /* ---------- indice nome/sigla -> id meridiano ----------
     Solo corrispondenze esatte: il fallback "che inizia per" di
     MeridianiMap.byName confonde "C" (Cuore) con "Colon". */
  var IDX = {};
  function addName(n, id) { var k = norm(n); if (k && !IDX[k]) IDX[k] = id; }
  MER.forEach(function (m) {
    addName(m.id.replace(/-/g, " "), m.id);
    addName(m.nome, m.id);
    addName(m.sigla, m.id);
    addName(m.siglaInt, m.id);
  });
  Object.keys(ALIAS).forEach(function (id) {
    (ALIAS[id] || []).forEach(function (a) { addName(a, id); });
  });
  /* Sigle usate solo dal manuale Costituzioni, assenti dagli alias MTC. */
  var EXTRA = { "m": "milza", "ic": "intestino crasso", "pc": "maestro cuore", "st": "stomaco" };
  Object.keys(EXTRA).forEach(function (k) {
    var id = norm(EXTRA[k]).replace(/ /g, "-");
    if (MER.some(function (m) { return m.id === id; })) IDX[k] = id;
  });

  function merId(nome) { return IDX[norm(nome)] || null; }
  function mer(id) { return MER.find(function (m) { return m.id === id; }) || null; }

  /* Sigla di un punto MTC nella forma del manuale ("M4", "PC6") tradotta
     in quella dei dati ("MP4", "MC6"). Ritorna { merId, sigla } o null. */
  function siglaPunto(sigla) {
    var m = /^\s*([a-zA-Z]+)\s*[-\.]?\s*(\d+)\s*$/.exec(String(sigla || ""));
    if (!m) return null;
    var id = merId(m[1]);
    var M = id ? mer(id) : null;
    if (!M) return null;
    return { merId: id, sigla: M.sigla + m[2], n: m[2] };
  }

  /* ---------- risalita: entità -> meridiano ---------- */
  function merOfCoord(c) { return c ? merId(c.meridianoKey || c.meridiano) : null; }
  function merOfPunto(p) { return p ? (merId(p.meridiano) || merId(p.organo)) : null; }
  function merOfCost(c) {
    if (!c || !c.meridiani) return [];
    return String(c.meridiani).split(/[–—\-\/,]/)
      .map(function (s) { return merId(s); })
      .filter(function (v, i, a) { return v && a.indexOf(v) === i; });
  }

  /* ---------- discesa: meridiano -> entità ----------
     Il controllo su id non è pedanteria: senza, un id nullo (dati non
     ancora caricati, nome sconosciuto) combacerebbe con tutte le entità
     che a loro volta non risalgono a un meridiano, e la scheda si
     riempirebbe di collegamenti sbagliati invece di restare vuota. */
  function coordsOf(id) { return id ? COORD.filter(function (c) { return merOfCoord(c) === id; }) : []; }
  function puntiOf(id) { return id ? PUNTI.filter(function (p) { return merOfPunto(p) === id; }) : []; }
  function costOf(id) { return id ? COST.filter(function (c) { return merOfCost(c).indexOf(id) !== -1; }) : []; }

  /* ---------- elemento, coppia, orologio ----------
     Tre relazioni che stanno già nei dati del meridiano (elemento,
     coppia, orario) ma che finora nessuna scheda permetteva di
     percorrere: si leggeva "Metallo" e bisognava ricordarsi a memoria
     quali fossero gli altri meridiani di Metallo. */
  var ELEM = {};                       // "Metallo" -> [id, id]
  MER.forEach(function (m) {
    if (!m.elemento || m.elemento === "—") return;
    (ELEM[m.elemento] = ELEM[m.elemento] || []).push(m.id);
  });
  function elementi() { return Object.keys(ELEM); }
  function elementoOf(id) {
    var m = mer(id);
    return (m && m.elemento && m.elemento !== "—") ? m.elemento : null;
  }
  function merOfElemento(nome) { return (ELEM[nome] || []).slice(); }
  function coppiaOf(id) { var m = mer(id); return m ? merId(m.coppia) : null; }

  /* L'ordine di meridiani_data.js è già quello della circolazione
     dell'energia (Polmone 3-5 → Fegato 1-3): il "prima" e il "dopo" sono
     i vicini nell'elenco, l'opposto è a sei ore di distanza (regola
     mezzogiorno–mezzanotte). Vaso Concezione e Governatore non hanno
     orario e restano fuori dal giro. */
  var CICLO = MER.filter(function (m) { return m.orario && m.orario !== "—"; })
                 .map(function (m) { return m.id; });
  function orologio(id) {
    var i = CICLO.indexOf(id);
    if (i === -1) return null;
    var n = CICLO.length;
    return {
      prec: CICLO[(i - 1 + n) % n],
      succ: CICLO[(i + 1) % n],
      opposto: CICLO[(i + n / 2) % n]
    };
  }

  /* ---------- le 14 posizioni di un muscolo ----------
     Ogni coordinata porta la tabella degli atteggiamenti: 14 righe, una
     per meridiano di riferimento, ognuna con il proprio numero di
     posizione. Da lì si ricostruisce l'indirizzo della coordinata
     completa "muscolo + posizione". */
  function posizioniDi(c) {
    if (!c) return [];
    return (c.atteggiamenti || []).map(function (a) {
      var id = merId(a.meridiano);
      var alt = coordsOf(id).filter(function (x) { return x.id !== c.id; })[0] || null;
      return { n: a.posizione, meridiano: a.meridiano, merId: id, coord: alt, stress: a.stress || "" };
    }).filter(function (r) { return r.merId && r.coord; });
  }

  /* ---------- i fiori ----------
     Lo stesso fiore torna su muscoli diversi: l'indice dice dove. */
  var FIORI = null;
  function fioriIdx() {
    if (FIORI) return FIORI;
    FIORI = {};
    COORD.forEach(function (c) {
      (c.fiore || []).forEach(function (f) {
        if (!f || !f.nome) return;
        var k = norm(f.nome);
        (FIORI[k] = FIORI[k] || []).push({ coord: c, posizioni: f.posizioni || [], tipo: f.tipo || "" });
      });
    });
    return FIORI;
  }
  function fioreAltrove(nome, escludiCoordId) {
    return (fioriIdx()[norm(nome)] || []).filter(function (r) { return r.coord.id !== escludiCoordId; });
  }

  /* ---------- indirizzi ---------- */
  function hrefMer(id, sigla) { return "#punti/mer/" + encodeURIComponent(id) + (sigla ? "/" + encodeURIComponent(sigla) : ""); }
  function hrefPunto(id) { return "#punti/p/" + encodeURIComponent(id); }
  function hrefCoord(id, id2) { return "#/" + encodeURIComponent(id) + (id2 ? "+" + encodeURIComponent(id2) : ""); }
  function hrefCost(id) { return "#cost/costituzione/" + encodeURIComponent(id); }
  function hrefBiotipo(id) { return "#cost/biotipo/" + encodeURIComponent(id); }
  function hrefTeoria(id) { return "#cost/teoria/" + encodeURIComponent(id); }
  function hrefTest(id) { return "#cost/test/" + encodeURIComponent(id); }
  function hrefCoppia(costId, tempId) {
    return "#cost/coppia" + (costId ? "/" + encodeURIComponent(costId) : "") +
           (costId && tempId ? "/" + encodeURIComponent(tempId) : "");
  }

  /* ---------- frammenti HTML ----------
     Un "chip" è un <a> normale: il router a hash fa il resto, quindi
     funziona anche col tasto destro / apri in nuova scheda. */
  var ICO = { mer: "●", punto: "◎", coord: "⌗", cost: "◈", pos: "△",
              elem: "✵", ora: "◔", fiore: "❀", sez: "→" };
  function chip(o) {
    var c = o.colore ? ' style="--xc:' + esc(o.colore) + '"' : "";
    return '<a class="xlink xlink--' + esc(o.kind || "sez") + (o.cls ? " " + esc(o.cls) : "") +
      '" href="' + esc(o.href) + '"' + c +
      (o.title ? ' title="' + esc(o.title) + '"' : "") + '>' +
      '<span class="xlink__ic" aria-hidden="true">' + (ICO[o.kind] || ICO.sez) + '</span>' +
      '<span class="xlink__t">' + esc(o.label) + '</span>' +
      (o.sub ? '<span class="xlink__s">' + esc(o.sub) + '</span>' : "") + '</a>';
  }
  function row(title, chips) {
    var list = (chips || []).filter(Boolean);
    if (!list.length) return "";
    return '<div class="xlinks__row">' +
      (title ? '<span class="xlinks__lb">' + esc(title) + '</span>' : "") +
      '<span class="xlinks__set">' + list.join("") + '</span></div>';
  }
  function box(title, rows, hint) {
    var body = (rows || []).filter(Boolean).join("");
    if (!body) return "";
    return '<div class="xlinks">' + (title ? '<p class="xlinks__h">' + esc(title) + '</p>' : "") +
      body + (hint ? '<p class="xlinks__hint">' + esc(hint) + '</p>' : "") + '</div>';
  }

  /* Chip già confezionati per un meridiano: la mappa, i suoi punti
     d'allarme, le sue coordinate, le costituzioni che lo coinvolgono. */
  function chipMer(id, etichetta) {
    var m = mer(id); if (!m) return "";
    return chip({ kind: "mer", href: hrefMer(id), colore: m.colore,
                  label: etichetta || m.nome, sub: m.sigla,
                  title: "Apri il meridiano " + m.nome + " sulla mappa 3D" });
  }
  function chipsPunti(id, escludi) {
    return puntiOf(id).filter(function (p) { return p.id !== escludi; }).map(function (p) {
      return chip({ kind: "punto", href: hrefPunto(p.id), label: p.organo,
                    title: "Punto d'allarme — " + (p.riferimento || p.regione || p.organo) });
    });
  }
  function chipsCoord(id, escludi) {
    return coordsOf(id).filter(function (c) { return c.id !== escludi; }).map(function (c) {
      return chip({ kind: "coord", href: hrefCoord(c.id), colore: c.colore,
                    label: c.muscolo, sub: c.meridiano,
                    title: "Coordinata: " + c.meridiano + " · " + c.muscolo });
    });
  }
  function chipsCost(id) {
    return costOf(id).map(function (c) {
      return chip({ kind: "cost", href: hrefCost(c.id), label: c.nome,
                    sub: c.meridiani, title: "Costituzione " + c.nome + " (" + c.meridiani + ")" });
    });
  }
  /* Gli altri meridiani dello stesso elemento (il corrente escluso). */
  function chipsElemento(id) {
    var e = elementoOf(id); if (!e) return [];
    return merOfElemento(e).filter(function (x) { return x !== id; }).map(function (x) {
      var m = mer(x);
      return chip({ kind: "elem", href: hrefMer(x), colore: m.colore, label: m.nome,
                    sub: m.natura, title: "Stesso elemento (" + e + "): " + m.nome });
    });
  }
  function chipCoppia(id) {
    var a = mer(id), b = mer(coppiaOf(id));
    if (!a || !b) return "";
    return chip({ kind: "mer", href: hrefMer(b.id), colore: b.colore, label: b.nome,
                  sub: b.natura, title: "Meridiano accoppiato di " + a.nome + " (" + b.natura + ")" });
  }
  /* Precedente, successivo e opposto nell'orologio cinese: sono i tre
     salti che si fanno davvero quando l'orario del disturbo non torna
     con il meridiano testato. */
  function chipsOrologio(id) {
    var o = orologio(id); if (!o) return [];
    return [["prec", "prima"], ["succ", "dopo"], ["opposto", "opposto"]].map(function (e) {
      var m = mer(o[e[0]]); if (!m) return "";
      return chip({ kind: "ora", href: hrefMer(m.id), colore: m.colore, label: m.nome,
                    sub: e[1] + " · " + m.orario,
                    title: m.nome + " — " + e[1] + " nel giro dell'energia (" + m.orario + ")" });
    }).filter(Boolean);
  }
  /* Le 14 posizioni del muscolo di c1: ogni chip apre la coordinata
     completa. `attivaMerId` è il meridiano della posizione già aperta. */
  function chipsPosizioni(c1, attivaMerId) {
    return posizioniDi(c1).map(function (r) {
      return chip({ kind: "pos", href: hrefCoord(c1.id, r.coord.id),
                    cls: r.merId === attivaMerId ? "is-on" : "",
                    label: "Pos. " + r.n, sub: r.meridiano,
                    title: "Testa " + c1.muscolo + " in posizione " + r.n + " (" + r.meridiano + ")" });
    });
  }
  /* Le posizioni coperte da un fiore, sullo stesso muscolo. */
  function chipsPosFiore(c1, posizioni) {
    var mappa = {};
    posizioniDi(c1).forEach(function (r) { mappa[r.n] = r; });
    return (posizioni || []).map(function (n) {
      var r = mappa[Number(n)];
      if (!r) return "";
      return chip({ kind: "pos", href: hrefCoord(c1.id, r.coord.id),
                    label: "Pos. " + n, sub: r.meridiano,
                    title: "Lo stesso fiore in posizione " + n + " (" + r.meridiano + ")" });
    }).filter(Boolean);
  }
  /* Lo stesso fiore su altri muscoli. */
  function chipsFiore(nome, escludiCoordId) {
    return fioreAltrove(nome, escludiCoordId).map(function (r) {
      return chip({ kind: "fiore", href: hrefCoord(r.coord.id), colore: r.coord.colore,
                    label: r.coord.muscolo, sub: r.coord.meridiano,
                    title: nome + " compare anche su " + r.coord.muscolo + " (" + r.coord.meridiano + ")" });
    });
  }

  /* ============================ AUTOLINK ============================
     I manuali nominano di continuo meridiani, muscoli, costituzioni e
     sigle di punti: qui quei nomi diventano <a> senza toccare i dati.

     Le occorrenze si cercano sul testo GREZZO e l'output si ricompone
     escapando i pezzi in chiaro: così è impossibile che un dato con
     dentro "<" produca markup, ed è impossibile annidare un link in un
     altro (la funzione riceve testo, mai HTML).

     Il criterio è la prudenza: si linkano solo nomi lunghi almeno 3
     caratteri (le sigle brevi le prende la regex dei punti), una sola
     volta per destinazione, e mai una parola dentro un'altra parola. */
  var TERMINI = null;
  function terminiIdx() {
    if (TERMINI) return TERMINI;
    var t = [], visti = {};
    function add(testo, href, titolo) {
      var s = String(testo == null ? "" : testo).trim();
      if (s.length < 3) return;                     // "P", "C", "M": troppo ambigui
      var k = s.toLowerCase() + "|" + href;
      if (visti[k]) return;
      visti[k] = 1;
      t.push({ testo: s, href: href, title: titolo });
    }
    MER.forEach(function (m) {
      var tit = "Apri il meridiano " + m.nome + " sulla mappa 3D";
      add(m.nome, hrefMer(m.id), tit);
      (ALIAS[m.id] || []).forEach(function (a) { add(a, hrefMer(m.id), tit); });
    });
    COORD.forEach(function (c) {
      add(c.muscolo, hrefCoord(c.id), "Coordinate del muscolo " + c.muscolo);
    });
    COST.forEach(function (c) {
      add(c.nome, hrefCost(c.id), "Costituzione " + c.nome + " (" + c.meridiani + ")");
      add(c.id.replace(/-/g, " "), hrefCost(c.id), "Costituzione " + c.nome);
    });
    BIOT.forEach(function (b) { add(b.nome, hrefBiotipo(b.id), "Biotipo " + b.nome); });
    /* Il più lungo prima: "Vescica Biliare" non deve perdere contro "Vescica". */
    t.sort(function (a, b) { return b.testo.length - a.testo.length; });
    TERMINI = t;
    return t;
  }
  function rxEsc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  var RX_NOMI = null, MAP_NOMI = null;
  function rxNomi() {
    if (RX_NOMI !== null) return RX_NOMI;
    var t = terminiIdx();
    MAP_NOMI = {};
    t.forEach(function (x) {
      var k = x.testo.toLowerCase();
      if (!MAP_NOMI[k]) MAP_NOMI[k] = x;
    });
    var alt = t.map(function (x) { return rxEsc(x.testo); }).join("|");
    RX_NOMI = alt ? new RegExp("(?:" + alt + ")", "gi") : false;
    return RX_NOMI;
  }
  /* Sigla di punto MTC scritta come nei manuali: maiuscole + numero,
     con o senza spazio o trattino ("VC8", "M 4", "PC-6"). Volutamente
     case-sensitive: "f1" dentro un testo non è il punto Fegato 1. */
  var RX_SIGLA = /\b([A-Z]{1,3})[ \-]?([0-9]{1,2})\b/g;
  var LETTERA = /[0-9A-Za-zÀ-ɏ]/;
  function isBordo(testo, i) { return i < 0 || i >= testo.length || !LETTERA.test(testo.charAt(i)); }

  /* `extra` = termini validi solo per questa chiamata, nella forma
     { testo, href, title }. Serve alle sezioni che hanno un vocabolario
     proprio — i capitoli di teoria delle Costituzioni, per esempio —
     senza doverlo far conoscere a tutta l'app. */
  function trovaLink(testo, extra) {
    var out = [], m;
    RX_SIGLA.lastIndex = 0;
    while ((m = RX_SIGLA.exec(testo))) {
      var pt = siglaPunto(m[1] + m[2]);
      if (!pt) continue;
      var etich = pt.sigla === m[0] ? pt.sigla : m[0] + " (" + pt.sigla + ")";
      out.push({ a: m.index, b: m.index + m[0].length, href: hrefMer(pt.merId, pt.sigla),
                 title: "Punto " + etich + " sulla mappa 3D" });
    }
    var rx = rxNomi();
    if (rx) {
      rx.lastIndex = 0;
      while ((m = rx.exec(testo))) {
        if (!isBordo(testo, m.index - 1) || !isBordo(testo, m.index + m[0].length)) continue;
        var voce = MAP_NOMI[m[0].toLowerCase()];
        if (!voce) continue;
        out.push({ a: m.index, b: m.index + m[0].length, href: voce.href, title: voce.title });
      }
    }
    (extra || []).forEach(function (v) {
      if (!v || !v.testo || !v.href || String(v.testo).length < 3) return;
      var rxE = new RegExp(rxEsc(String(v.testo)), "gi"), me;
      while ((me = rxE.exec(testo))) {
        if (!isBordo(testo, me.index - 1) || !isBordo(testo, me.index + me[0].length)) continue;
        out.push({ a: me.index, b: me.index + me[0].length, href: v.href, title: v.title || "" });
      }
    });
    /* Sovrapposizioni: vince chi inizia prima, a parità il più lungo. */
    out.sort(function (x, y) { return x.a - y.a || y.b - x.b; });
    var puliti = [], fine = -1;
    out.forEach(function (h) { if (h.a >= fine) { puliti.push(h); fine = h.b; } });
    return puliti;
  }

  /* autolink(testo, opzioni)
       opzioni.salta  href da NON linkare — la pagina su cui si è già;
                      uno solo o un elenco
       opzioni.max    quanti link al massimo (default 8)
       opzioni.extra  termini aggiuntivi [{ testo, href, title }]
     Ritorna HTML già escapato: si usa al posto di esc(). */
  function autolink(testo, opzioni) {
    var s = String(testo == null ? "" : testo);
    if (!s) return "";
    var o = opzioni || {};
    var max = o.max == null ? 8 : o.max;
    var usati = {};
    [].concat(o.salta || []).forEach(function (h) { if (h) usati[h] = 1; });
    var hit = trovaLink(s, o.extra), out = "", cur = 0, n = 0;
    hit.forEach(function (h) {
      if (n >= max || usati[h.href]) return;
      usati[h.href] = 1; n++;
      out += esc(s.slice(cur, h.a)) +
        '<a class="xref" href="' + esc(h.href) + '"' +
        (h.title ? ' title="' + esc(h.title) + '"' : "") + '>' + esc(s.slice(h.a, h.b)) + "</a>";
      cur = h.b;
    });
    return out + esc(s.slice(cur));
  }
  /* Le entità nominate dentro un testo, senza toccarne il markup: serve
     dove il testo resta modificabile (le note del paziente sono in una
     textarea) e i collegamenti vanno mostrati accanto, non dentro. */
  function entitaCitate(testo, max) {
    var s = String(testo == null ? "" : testo);
    if (!s.trim()) return [];
    var visti = {}, out = [];
    trovaLink(s).forEach(function (h) {
      if (visti[h.href] || out.length >= (max == null ? 8 : max)) return;
      visti[h.href] = 1;
      out.push({ href: h.href, label: s.slice(h.a, h.b), title: h.title });
    });
    return out;
  }
  function chipsCitate(testo, max) {
    return entitaCitate(testo, max).map(function (e) {
      var kind = e.href.indexOf("#cost/") === 0 ? "cost"
               : e.href.indexOf("#/") === 0 ? "coord"
               : e.href.indexOf("#punti/p/") === 0 ? "punto" : "mer";
      return chip({ kind: kind, href: e.href, label: e.label, title: e.title });
    });
  }
  /* Comodità: un elenco di paragrafi già autolinkati. */
  function autoP(list, cls) {
    var arr = Array.isArray(list) ? list : (list ? [list] : []);
    return arr.filter(Boolean).map(function (p) {
      return "<p" + (cls ? ' class="' + esc(cls) + '"' : "") + ">" + autolink(p) + "</p>";
    }).join("");
  }
  /* "V – IT", "M – P": la notazione del manuale Costituzioni con ogni
     sigla resa cliccabile, separatori compresi. */
  function linkSigleMer(str) {
    var s = String(str == null ? "" : str);
    if (!s) return "";
    return s.replace(/[^\s–—\-\/,]+/g, function (tok) {
      var id = merId(tok);
      if (!id) return esc(tok);
      var m = mer(id);
      return '<a class="xref" href="' + esc(hrefMer(id)) + '" title="' + esc("Meridiano " + m.nome) +
             '">' + esc(tok) + "</a>";
    });
  }

  window.Links = {
    merId: merId, mer: mer, siglaPunto: siglaPunto,
    meridiani: function () { return MER.slice(); },
    merOfCoord: merOfCoord, merOfPunto: merOfPunto, merOfCost: merOfCost,
    coordsOf: coordsOf, puntiOf: puntiOf, costOf: costOf,
    elementi: elementi, elementoOf: elementoOf, merOfElemento: merOfElemento,
    coppiaOf: coppiaOf, orologio: orologio,
    posizioniDi: posizioniDi, fioreAltrove: fioreAltrove,
    entitaCitate: entitaCitate, chipsCitate: chipsCitate,
    hrefMer: hrefMer, hrefPunto: hrefPunto, hrefCoord: hrefCoord, hrefCost: hrefCost,
    hrefBiotipo: hrefBiotipo, hrefTeoria: hrefTeoria, hrefTest: hrefTest, hrefCoppia: hrefCoppia,
    chip: chip, row: row, box: box,
    chipMer: chipMer, chipsPunti: chipsPunti, chipsCoord: chipsCoord, chipsCost: chipsCost,
    chipsElemento: chipsElemento, chipCoppia: chipCoppia, chipsOrologio: chipsOrologio,
    chipsPosizioni: chipsPosizioni, chipsPosFiore: chipsPosFiore, chipsFiore: chipsFiore,
    autolink: autolink, autoP: autoP, linkSigleMer: linkSigleMer,
    esc: esc
  };
})();
