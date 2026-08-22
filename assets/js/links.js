/* links.js — il grafo dei collegamenti fra le sezioni dell'app.

   Coordinate, Punti d'Allarme e Costituzioni parlano tutte dello stesso
   oggetto — il MERIDIANO — ma con nomi diversi: la coordinata dice
   "Milza", il punto d'allarme dice "Milza (sx)", la costituzione dice
   "M – P" e il punto di test dice "M4". Qui si normalizza tutto su un
   unico id (quello di meridiani_data.js) e da lì si risale a ciò che è
   collegato, in qualunque direzione.

   Nessuna dipendenza, nessun rendering proprio: espone dati e piccoli
   frammenti HTML che le sezioni incollano dove vogliono. */
(function () {
  "use strict";

  var MER = (window.MERIDIANI && window.MERIDIANI.meridiani) || [];
  var ALIAS = (window.MERIDIANI && window.MERIDIANI.alias) || {};
  var COORD = window.COORDINATE || [];
  var PUNTI = (window.PUNTI_INDICATORI && window.PUNTI_INDICATORI.punti) || [];
  var COST = (window.COSTITUZIONI && window.COSTITUZIONI.costituzioni) || [];

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function norm(s) {
    return String(s == null ? "" : s).toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
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
    return String(c.meridiani).split(/[\u2013\u2014\-\/,]/)
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

  /* ---------- indirizzi ---------- */
  function hrefMer(id, sigla) { return "#punti/mer/" + encodeURIComponent(id) + (sigla ? "/" + encodeURIComponent(sigla) : ""); }
  function hrefPunto(id) { return "#punti/p/" + encodeURIComponent(id); }
  function hrefCoord(id, id2) { return "#/" + encodeURIComponent(id) + (id2 ? "+" + encodeURIComponent(id2) : ""); }
  function hrefCost(id) { return "#cost/costituzione/" + encodeURIComponent(id); }

  /* ---------- frammenti HTML ----------
     Un "chip" è un <a> normale: il router a hash fa il resto, quindi
     funziona anche col tasto destro / apri in nuova scheda. */
  var ICO = { mer: "\u25CF", punto: "\u25CE", coord: "\u2317", cost: "\u25C8", sez: "\u2192" };
  function chip(o) {
    var c = o.colore ? ' style="--xc:' + esc(o.colore) + '"' : "";
    return '<a class="xlink xlink--' + esc(o.kind || "sez") + '" href="' + esc(o.href) + '"' + c +
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
                    title: "Coordinata: " + c.meridiano + " \u00b7 " + c.muscolo });
    });
  }
  function chipsCost(id) {
    return costOf(id).map(function (c) {
      return chip({ kind: "cost", href: hrefCost(c.id), label: c.nome,
                    sub: c.meridiani, title: "Costituzione " + c.nome + " (" + c.meridiani + ")" });
    });
  }

  window.Links = {
    merId: merId, mer: mer, siglaPunto: siglaPunto,
    merOfCoord: merOfCoord, merOfPunto: merOfPunto, merOfCost: merOfCost,
    coordsOf: coordsOf, puntiOf: puntiOf, costOf: costOf,
    hrefMer: hrefMer, hrefPunto: hrefPunto, hrefCoord: hrefCoord, hrefCost: hrefCost,
    chip: chip, row: row, box: box,
    chipMer: chipMer, chipsPunti: chipsPunti, chipsCoord: chipsCoord, chipsCost: chipsCost,
    esc: esc
  };
})();
