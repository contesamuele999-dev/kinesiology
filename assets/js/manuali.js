/* ============================================================================
   Sezione «Manuali» — le dispense dei corsi trascritte in schede.
   Dati: assets/js/manuali/<id>.js, ognuno fa window.MANUALI.push({...}).
   API:  window.Manuali = { show(hash), filter(q), titolo(hash), parse(hash),
                            perMeridiano(merId) }

   Manuale  { id, titolo, breve, sotto, autore, intro:[…], capitoli:[Capitolo] }
            (breve = nome corto per i chip dei collegamenti)
   Capitolo { id, titolo, intro:[…], schede:[Scheda] }
   Scheda   { id, titolo, sotto, pag,
              meridiani:[id meridiano]   — per i collegamenti inversi; se manca
                                           si ricavano dal titolo
              test      "test d'ingresso" (testo o elenco)
              voci      [[chiave, valore]]           — dati a colpo d'occhio
              info      [paragrafi]
              passi     [testo | {t, sub:[…]}]       — procedura numerata
              tc        [punti premuti dall'operatore]
              tl        [punti premuti dal paziente (TL / LC)]
              liste     [{titolo, items:[…]}]
              tabelle   [{titolo, col:[…], righe:[[…]]}]
              img       [{src, cap}]
              appunti   [note scritte a mano sulla dispensa] }
   Tutti i campi della scheda sono facoltativi tranne id e titolo.
   ========================================================================== */
(function () {
  "use strict";

  var D = window.MANUALI || [];
  var mount = document.getElementById("manView");
  if (!mount) return;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function arr(x) { return Array.isArray(x) ? x : (x ? [x] : []); }
  /* Vocabolario locale: i titoli delle schede dello stesso manuale (più
     gli eventuali `alias`), così «→ procedura dei muscoli extraoculari»
     porta alla scheda. Lo imposta schedaHtml per la scheda che disegna. */
  var EXTRA = [], QUI = "";
  function AL(t) {
    return window.Links ? window.Links.autolink(t, { max: 20, extra: EXTRA, salta: QUI }) : esc(t);
  }
  function termini(m) {
    var out = [];
    (m.capitoli || []).forEach(function (c) {
      (c.schede || []).forEach(function (s) {
        [s.titolo].concat(s.alias || []).forEach(function (t) {
          if (t && t.length >= 6) out.push({ testo: t, href: hrefMan(m.id, s.id), title: m.titolo + " · " + s.titolo });
        });
      });
    });
    return out;
  }
  function reg(t) { return window.Reg ? window.Reg(t) : ""; }

  /* ------------------------------------------------------------- indice */
  function byId(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function hrefMan(m, s) { return "#man/" + m + (s ? "/" + s : ""); }

  /* Tutte le schede in fila, con manuale e capitolo: serve alla ricerca,
     al «precedente / successivo» e all'indice per meridiano. */
  var TUTTE = [];
  D.forEach(function (m) {
    (m.capitoli || []).forEach(function (c) {
      (c.schede || []).forEach(function (s) {
        TUTTE.push({ m: m, c: c, s: s, q: norm(JSON.stringify(s) + " " + c.titolo + " " + m.titolo) });
      });
    });
  });
  function trova(mId, sId) {
    for (var i = 0; i < TUTTE.length; i++) if (TUTTE[i].m.id === mId && TUTTE[i].s.id === sId) return i;
    return -1;
  }

  /* Meridiani di una scheda: quelli dichiarati, altrimenti quelli che il
     titolo nomina (autolink di links.js, solo i rimandi alla mappa). */
  function meridiani(s) {
    var L = window.Links;
    if (!L) return [];
    if (s.meridiani) return s.meridiani.filter(function (id) { return L.mer(id); });
    var out = [];
    L.entitaCitate(s.titolo + " " + (s.sotto || ""), 6).forEach(function (e) {
      var m = /^#punti\/mer\/([^/]+)/.exec(e.href);
      var id = m && decodeURIComponent(m[1]);
      if (id && out.indexOf(id) === -1) out.push(id);
    });
    return out;
  }
  var PER_MER = null;
  function perMeridiano(id) {
    if (!PER_MER) {
      PER_MER = {};
      TUTTE.forEach(function (x) {
        meridiani(x.s).forEach(function (mid) { (PER_MER[mid] = PER_MER[mid] || []).push(x); });
      });
    }
    return (PER_MER[id] || []).map(function (x) {
      return { href: hrefMan(x.m.id, x.s.id), label: x.s.titolo, sub: x.m.breve || x.m.titolo,
               title: x.m.titolo + " · " + x.c.titolo };
    });
  }

  /* ------------------------------------------------------------ markup */
  function card(hash, t, sotto, badge) {
    return '<a class="cocard" href="' + esc(hash) + '"><span class="cocard__body">' +
      '<span class="cocard__t">' + esc(t) + "</span>" +
      (sotto ? '<span class="cocard__s">' + esc(sotto) + "</span>" : "") +
      (badge ? '<span class="cocard__b">' + esc(badge) + "</span>" : "") + "</span></a>";
  }
  function sezione(titolo, corpo, cls) {
    if (!corpo) return "";
    return '<section class="section' + (cls ? " " + cls : "") + '"><h3>' + esc(titolo) + reg(titolo) +
      "</h3>" + corpo + "</section>";
  }
  function paragrafi(list) {
    return arr(list).map(function (p) { return "<p>" + AL(p) + "</p>"; }).join("");
  }
  function elenco(list, tag) {
    var a = arr(list);
    if (!a.length) return "";
    return "<" + (tag || "ul") + ' class="colist manlist">' + a.map(function (x) {
      if (typeof x === "string") return "<li>" + AL(x) + "</li>";
      return "<li>" + AL(x.t) + (x.sub ? elenco(x.sub) : "") + "</li>";
    }).join("") + "</" + (tag || "ul") + ">";
  }
  function voci(rows) {
    if (!rows || !rows.length) return "";
    return '<dl class="kv">' + rows.map(function (r) {
      return '<div class="kv__row"><dt>' + esc(r[0]) + "</dt><dd>" +
        (r[1] ? AL(r[1]) : '<span class="kv__vuoto">—</span>') + "</dd></div>";
    }).join("") + "</dl>";
  }
  function tabella(t) {
    return (t.titolo ? '<p class="mantab__t">' + esc(t.titolo) + "</p>" : "") +
      '<div class="cotab-wrap"><table class="cotab"><thead><tr>' +
      arr(t.col).map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") +
      "</tr></thead><tbody>" + arr(t.righe).map(function (r) {
        return "<tr>" + r.map(function (v) { return "<td>" + AL(v) + "</td>"; }).join("") + "</tr>";
      }).join("") + "</tbody></table></div>";
  }
  function punti(list) {
    var a = arr(list);
    if (!a.length) return "";
    return '<ul class="manpunti">' + a.map(function (p) { return "<li>" + AL(p) + reg(p) + "</li>"; }).join("") + "</ul>";
  }
  function figure(list) {
    return arr(list).map(function (f) {
      return '<figure class="cofig"><img class="pageimg" src="' + esc(f.src) + '" loading="lazy" alt="' +
        esc(f.cap || "") + '" />' + (f.cap ? "<figcaption>" + esc(f.cap) + "</figcaption>" : "") + "</figure>";
    }).join("");
  }

  /* ------------------------------------------------------------- pagine */
  function homeHtml() {
    var cards = D.map(function (m) {
      var n = 0;
      (m.capitoli || []).forEach(function (c) { n += (c.schede || []).length; });
      return card(hrefMan(m.id), m.titolo, m.sotto || m.autore || "", n ? n + " schede" : "In preparazione");
    }).join("");
    return '<div class="cohome"><div class="cohero"><h2>Manuali dei corsi</h2>' +
      "<p>Le dispense trascritte in schede: test d'ingresso, procedura, punti. " +
      "Usa la ricerca in alto per cercare in tutti i manuali.</p></div>" +
      '<div class="cogrid cogrid--2">' + cards + "</div></div>";
  }

  function manualeHtml(m) {
    EXTRA = termini(m); QUI = "";
    var cap = (m.capitoli || []).map(function (c, i) {
      var schede = (c.schede || []).map(function (s) {
        return card(hrefMan(m.id, s.id), s.titolo, s.sotto || "", s.pag ? "pag. " + s.pag : "");
      }).join("");
      return '<section class="coblock" id="cap-' + esc(c.id) + '"><h3 class="coblock__h">' +
        '<span class="coblock__n">' + (i + 1) + "</span>" + esc(c.titolo) + "</h3>" +
        (c.intro ? '<div class="coblock__d">' + paragrafi(c.intro) + "</div>" : "") +
        '<div class="cogrid">' + schede + "</div></section>";
    }).join("");
    var indice = (m.capitoli || []).length > 2 ? '<nav class="anchors manidx">' + m.capitoli.map(function (c) {
      return '<a href="#" data-anchor="cap-' + esc(c.id) + '">' + esc(c.titolo) + "</a>";
    }).join("") + "</nav>" : "";
    return '<div class="cohome"><div class="cohero"><h2>' + esc(m.titolo) + "</h2>" +
      "<p>" + esc([m.sotto, m.autore].filter(Boolean).join(" · ")) + "</p>" +
      paragrafi(m.intro) + "</div>" + indice +
      (cap || '<p class="noresults">Manuale in preparazione.</p>') + "</div>";
  }

  function schedaHtml(i) {
    var x = TUTTE[i], s = x.s, L = window.Links;
    EXTRA = termini(x.m); QUI = hrefMan(x.m.id, s.id);
    var prev = TUTTE[i - 1] && TUTTE[i - 1].m === x.m ? TUTTE[i - 1] : null;
    var next = TUTTE[i + 1] && TUTTE[i + 1].m === x.m ? TUTTE[i + 1] : null;
    var mer = meridiani(s);
    var link = L && mer.length ? L.box("Collegamenti", [
      L.row("Meridiani", mer.map(function (id) { return L.chipMer(id); })),
      L.row("Coordinate", [].concat.apply([], mer.map(function (id) { return L.chipsCoord(id); }))),
      L.row("Punti d'allarme", [].concat.apply([], mer.map(function (id) { return L.chipsPunti(id); })))
    ]) : "";
    var nav = '<nav class="mannav">' +
      (prev ? '<a class="ebtn" href="' + hrefMan(prev.m.id, prev.s.id) + '">‹ ' + esc(prev.s.titolo) + "</a>" : "<span></span>") +
      (next ? '<a class="ebtn" href="' + hrefMan(next.m.id, next.s.id) + '">' + esc(next.s.titolo) + " ›</a>" : "") +
      "</nav>";
    return '<div class="cohome"><div class="cohero">' +
      '<p class="mancrumb"><a href="' + hrefMan(x.m.id) + '">' + esc(x.m.titolo) + "</a> · " +
      '<a href="' + hrefMan(x.m.id) + '" data-anchor="cap-' + esc(x.c.id) + '">' + esc(x.c.titolo) + "</a></p>" +
      "<h2>" + esc(s.titolo) + reg(s.titolo) + "</h2>" +
      (s.sotto || s.pag ? "<p>" + esc([s.sotto, s.pag ? "pag. " + s.pag : ""].filter(Boolean).join(" · ")) + "</p>" : "") +
      "</div>" +
      sezione("Test d'ingresso", typeof s.test === "string" ? paragrafi(s.test) : elenco(s.test), "mantest") +
      sezione("In sintesi", voci(s.voci)) +
      sezione("Procedura", elenco(s.passi, "ol")) +
      sezione("TC — punti che preme l'operatore", punti(s.tc)) +
      sezione("TL / LC — punti che preme il paziente", punti(s.tl)) +
      arr(s.tabelle).map(function (t) { return sezione(t.titolo || "Tabella", tabella({ col: t.col, righe: t.righe })); }).join("") +
      arr(s.liste).map(function (l) { return sezione(l.titolo, elenco(l.items)); }).join("") +
      sezione("Info", paragrafi(s.info)) +
      sezione("Immagini", figure(s.img)) +
      sezione("Appunti", paragrafi(s.appunti), "manappunti") +
      link + nav + "</div>";
  }

  /* ---------------------------------------------------------- ricerca */
  function risultatiHtml(q) {
    var termini = norm(q).split(/\s+/).filter(Boolean);
    var res = TUTTE.filter(function (x) {
      return termini.every(function (t) { return x.q.indexOf(t) !== -1; });
    });
    if (!res.length) return '<div class="cohome"><p class="noresults">Nessuna scheda per «' + esc(q) + "».</p></div>";
    return '<div class="cohome"><div class="cohero"><h2>Risultati</h2><p>' + res.length +
      (res.length === 1 ? " scheda trovata" : " schede trovate") + " per «" + esc(q) + "».</p></div>" +
      '<div class="cogrid">' + res.slice(0, 200).map(function (x) {
        return card(hrefMan(x.m.id, x.s.id), x.s.titolo, x.m.titolo + " · " + x.c.titolo, "");
      }).join("") + "</div></div>";
  }

  /* ----------------------------------------------------------- router */
  function parse(hash) {
    var m = /^#man(?:\/([-a-z0-9]+))?(?:\/([-a-z0-9]+))?/.exec(hash || "");
    return m ? { m: m[1] || "", s: m[2] || "" } : { m: "", s: "" };
  }
  function titolo(hash) {
    var v = parse(hash), i = trova(v.m, v.s);
    if (i !== -1) return TUTTE[i].m.titolo + " · " + TUTTE[i].s.titolo;
    var m = byId(D, v.m);
    return m ? m.titolo : "";
  }
  var ultimaQuery = "";
  /* Ritorna "home", "manuale" o "scheda": il router decide il «indietro». */
  function show(hash) {
    var v = parse(hash), i = trova(v.m, v.s), m = byId(D, v.m), tipo;
    if (i !== -1) { mount.innerHTML = schedaHtml(i); tipo = "scheda"; }
    else if (m) { mount.innerHTML = manualeHtml(m); tipo = "manuale"; }
    else { mount.innerHTML = ultimaQuery ? risultatiHtml(ultimaQuery) : homeHtml(); tipo = "home"; }
    mount.hidden = false;
    return tipo;
  }
  function filter(q) {
    ultimaQuery = (q || "").trim();
    if (parse(location.hash).m) return;
    mount.innerHTML = ultimaQuery ? risultatiHtml(ultimaQuery) : homeHtml();
  }

  mount.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-anchor]");
    if (a) {
      var t = document.getElementById(a.getAttribute("data-anchor"));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
      return;
    }
    var im = e.target.closest(".pageimg");
    if (!im || !window.openLightbox) return;
    var thumbs = Array.prototype.slice.call(mount.querySelectorAll(".pageimg"));
    window.openLightbox(thumbs.map(function (t) { return t.getAttribute("src"); }), thumbs.indexOf(im));
  });

  window.Manuali = { show: show, filter: filter, titolo: titolo, parse: parse, perMeridiano: perMeridiano };
})();
