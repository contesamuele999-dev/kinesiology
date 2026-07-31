/* ============================================================================
   Sezione «Costituzioni & Temperamenti»
   Dati: assets/js/costituzioni_data.js (window.COSTITUZIONI)
   API:  window.Cost = { show(hash), filter(q), titolo(hash) }
   ========================================================================== */
(function () {
  "use strict";

  var D = window.COSTITUZIONI;
  var mount = document.getElementById("costView");
  if (!D || !mount) return;

  /* ---------------------------------------------------------- utilità */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function byId(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  var BIO = { ecto: "Ectomorfo", meso: "Mesomorfo", endo: "Endomorfo" };

  /* ------------------------------------------------- frammenti di markup */
  function img(src, alt, cls) {
    if (!src) return "";
    return '<img class="pageimg ' + (cls || "") + '" src="' + esc(src) +
           '" loading="lazy" alt="' + esc(alt || "") + '" />';
  }
  function figura(src, cap) {
    if (!src) return "";
    return '<figure class="cofig">' + img(src, cap) +
           (cap ? "<figcaption>" + esc(cap) + "</figcaption>" : "") + "</figure>";
  }
  function sezione(titolo, corpo, id) {
    if (!corpo) return "";
    return '<section class="section"' + (id ? ' id="' + esc(id) + '"' : "") +
           "><h3>" + esc(titolo) + "</h3>" + corpo + "</section>";
  }
  function paragrafi(list) {
    if (!list || !list.length) return "";
    return list.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  }
  function kvTabella(rows) {
    if (!rows || !rows.length) return "";
    return '<dl class="kv">' + rows.map(function (r) {
      var k = r.k != null ? r.k : r[0], v = r.v != null ? r.v : r[1];
      return '<div class="kv__row"><dt>' + esc(k) + "</dt><dd>" +
             (v ? esc(v) : '<span class="kv__vuoto">—</span>') + "</dd></div>";
    }).join("") + "</dl>";
  }
  function elenco(items, cls) {
    if (!items || !items.length) return "";
    return '<ul class="colist ' + (cls || "") + '">' +
      items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
  }
  function link(hash, testo) {
    return '<a class="colink" href="' + esc(hash) + '">' + esc(testo) + " ›</a>";
  }

  /* --------------------------------------------------------- home */
  function cardHtml(hash, titolo, sotto, immagine, badge) {
    return '<a class="cocard" href="' + esc(hash) + '">' +
      (immagine ? '<span class="cocard__img">' +
        '<img src="' + esc(immagine) + '" alt="" loading="lazy" /></span>' : "") +
      '<span class="cocard__body"><span class="cocard__t">' + esc(titolo) + "</span>" +
      (sotto ? '<span class="cocard__s">' + esc(sotto) + "</span>" : "") +
      (badge ? '<span class="cocard__b">' + esc(badge) + "</span>" : "") +
      "</span></a>";
  }

  function homeHtml() {
    var b1 = D.biotipi.map(function (b) {
      return cardHtml("#cost/biotipo/" + b.id, b.nome,
        (b.sintesi["LIVELLI DI MTC"] || ""), b.immagine, b.sintesi["TENDENZA"] || "");
    }).join("");

    var b2 = D.costituzioni.map(function (c) {
      return cardHtml("#cost/costituzione/" + c.id, c.nome,
        "Temperamento " + c.temperamento + " · " + c.animale,
        c.immagini.profiling, "Codice " + c.codice);
    }).join("");

    var b3 = D.procedure.map(function (p) {
      return cardHtml("#cost/test/" + p.id,
        p.id === "costituzioni" ? "Testare le Costituzioni" : "Testare i Temperamenti",
        p.id === "costituzioni" ? "VC8 + i 6 punti chiave" : "VC8 + i 6 polsi", "", "");
    }).join("");

    return '<div class="cohome">' +
      '<div class="cohero"><h2>Costituzioni &amp; Temperamenti</h2>' +
      "<p>Scegli da dove partire. Tocca una scheda per aprirla.</p></div>" +

      '<section class="coblock"><h3 class="coblock__h"><span class="coblock__n">1</span>I 3 Biotipi</h3>' +
      '<p class="coblock__d">La struttura del corpo: Ectomorfo, Mesomorfo, Endomorfo.</p>' +
      '<div class="cogrid cogrid--3">' + b1 + "</div></section>" +

      '<section class="coblock"><h3 class="coblock__h"><span class="coblock__n">2</span>Le 6 Costituzioni MTC</h3>' +
      '<p class="coblock__d">Il livello energetico: Tai Yang, Shao Yang, Tai Yin, Yang Ming, Jue Yin, Shao Yin.</p>' +
      '<div class="cogrid">' + b2 + "</div></section>" +

      '<section class="coblock"><h3 class="coblock__h"><span class="coblock__n">3</span>Come si testa</h3>' +
      '<p class="coblock__d">Le due procedure del manuale, passo per passo.</p>' +
      '<div class="cogrid cogrid--2">' + b3 + "</div></section>" +

      sinotticaHtml(true) +

      '<section class="coblock"><h3 class="coblock__h"><span class="coblock__n">+</span>Approfondimenti</h3>' +
      '<div class="cogrid cogrid--2">' +
        cardHtml("#cost/confronto", "Confronto fra i 3 biotipi",
                 "Sintomi, reazioni e insofferenze fianco a fianco", "", "") +
        cardHtml("#cost/teoria", "Teoria e modelli storici",
                 "Ippocrate, Vannier, Pende, Martiny, Sheldon", "", "") +
      "</div></section>" +
      "</div>";
  }

  function sinotticaHtml(conTitolo) {
    var righe = D.sinottica.map(function (r) {
      return "<tr><td>" + esc(r.foglietto) + '</td><td><a href="#cost/costituzione/' + esc(r.id) +
        '"><strong>' + esc(r.livello) + "</strong></a></td><td>" + esc(r.biotipo) +
        "</td><td>" + esc(r.neurotipo) + "</td><td>" + esc(r.meridiani) +
        '</td><td><a href="#cost/biotipo/' + esc(r.bio) + '">' + esc(BIO[r.bio]) + "</a></td></tr>";
    }).join("");
    var tabella = '<div class="cotab-wrap"><table class="cotab"><thead><tr>' +
      "<th>Foglietto</th><th>Livello MTC</th><th>Biotipo</th><th>Neurotipo</th>" +
      "<th>Meridiani</th><th>Somatotipo</th></tr></thead><tbody>" + righe + "</tbody></table></div>";
    if (!conTitolo) return tabella;
    return '<section class="coblock"><h3 class="coblock__h"><span class="coblock__n">★</span>Tabella riassuntiva</h3>' +
      '<p class="coblock__d">Tutte le corrispondenze in un colpo d\'occhio. Tocca una voce per aprire la scheda.</p>' +
      tabella + "</section>";
  }

  /* ------------------------------------------------------- biotipo */
  var SINT_ORD = ["LIVELLI DI MTC", "TEMPERAMENTO", "MERIDIANI", "DIATESI", "TENDENZA", "ANIMALE"];

  function biotipoHtml(b) {
    var breve = SINT_ORD.filter(function (k) { return b.sintesi[k]; })
      .map(function (k) { return { k: k, v: b.sintesi[k] }; });

    var cost = D.costituzioni.filter(function (c) { return c.biotipo === b.id; });

    var car = '<div class="cocols">' +
      '<div class="cocol"><h4>Fisiologiche</h4>' + elenco(b.caratteristiche.fisiologiche) + "</div>" +
      '<div class="cocol"><h4>Fisiche</h4>' + elenco(b.caratteristiche.fisiche) + "</div>" +
      '<div class="cocol"><h4>Psichiche</h4>' + elenco(b.caratteristiche.psichiche) + "</div></div>";

    var ergo = ["alto", "medio", "basso"].filter(function (k) { return b.ergopsichica[k]; })
      .map(function (k) {
        var e = b.ergopsichica[k];
        return '<div class="coergo coergo--' + k + '"><h4>Tono emotivo ' + k +
          (e.energia ? ' <span class="coergo__e">' + esc(e.energia) + "</span>" : "") +
          "</h4><p>" + esc(e.tratti) + "</p></div>";
      }).join("");

    return head(b.nome, "Biotipo · " + (b.sintesi["TEMPERAMENTO"] || ""), b.immagine) +
      ancore([["b-breve", "In breve"], ["b-car", "Caratteristiche"], ["b-scheda", "Scheda fisica"],
              ["b-terreno", "Terreno"], ["b-appr", "Apprendimento"], ["b-sint", "Sintomi"],
              ["b-pers", "Personalità"], ["b-ergo", "Ergopsichica"]]) +
      '<div class="sections">' +
      sezione("In breve", kvTabella(breve) + paragrafi(b.descrizione.slice(0, 1)), "b-breve") +
      sezione("Descrizione", paragrafi(b.descrizione.slice(1)), "b-desc") +
      sezione("Caratteristiche", car, "b-car") +
      sezione("Scheda fisica e sintomi", kvTabella(b.scheda), "b-scheda") +
      sezione("Terreno, reazioni e corrispondenze",
              kvTabella(b.scheda2) + kvTabella(b.sviluppo), "b-terreno") +
      sezione("Apprendimento e aree cerebrali", kvTabella([
        { k: "TIPO DI APPRENDIMENTO", v: b.apprendimento.tipo },
        { k: "AREE CEREBRALI", v: b.apprendimento.aree },
        { k: "CAPACITÀ CONNESSE", v: b.apprendimento.capacita },
        { k: "SINDROMI MTC CLASSICHE", v: b.sindromi.mtc },
        { k: "SINDROMI ESTERNE", v: b.sindromi.esterne },
        { k: "SISTEMI PREDISPOSTI ALLA DISFUNZIONE", v: b.sistemi }
      ]), "b-appr") +
      sezione("Sintomatologia", elenco(b.sintomi, "colist--fitta"), "b-sint") +
      sezione("Personalità e reazioni",
        '<h4 class="cosub">Personalità acquisita: ' + esc(b.personalita.tipo) + "</h4>" +
        "<p>Si genera in base a conflitti di <strong>" + esc(b.personalita.conflitti) + "</strong>.</p>" +
        '<h4 class="cosub">Reazione agli stimoli esterni — ' + esc(b.reazione.fase) + "</h4>" +
        paragrafi(b.reazione.righe) +
        '<h4 class="cosub">Insofferenza</h4>' +
        "<p>Diventa insofferente quando <strong>" + esc(b.insofferenza.quando) + "</strong>.</p>" +
        "<p>" + esc(b.insofferenza.premessa) + "</p>" +
        elenco(b.insofferenza.reazioni, "colist--forte"), "b-pers") +
      sezione("Ergopsichica", "<p>" + esc(D.ergoIntro) + "</p>" + ergo, "b-ergo") +
      sezione("Le sue 2 costituzioni MTC",
        '<div class="cogrid cogrid--2">' + cost.map(function (c) {
          return cardHtml("#cost/costituzione/" + c.id, c.nome,
            "Temperamento " + c.temperamento, c.immagini.profiling, "Codice " + c.codice);
        }).join("") + "</div>", "b-cost") +
      "</div>";
  }

  /* --------------------------------------------------- costituzione */
  function costituzioneHtml(c) {
    var breve = [
      { k: "CODICE DI RIFERIMENTO", v: c.codice },
      { k: "TEMPERAMENTO", v: c.temperamento },
      { k: "ANIMALE", v: c.animale },
      { k: "POPOLAZIONE", v: c.popolazione },
      { k: "SOMATOTIPO", v: BIO[c.biotipo] },
      { k: "FOGLIETTO EMBRIOLOGICO", v: c.foglietto },
      { k: "NEUROTIPO", v: c.neurotipo },
      { k: "MERIDIANI", v: c.meridiani },
      { k: "PUNTO DI TEST", v: c.puntoTest.sigla }
    ];
    var fig = '<div class="cofigs">' +
      figura(c.immagini.trigramma, "Codice " + c.codice) +
      figura(c.immagini.curva, "Curva energetica") +
      figura(c.immagini.profiling, "Profiling — tratti del volto") + "</div>";

    return head(c.nome, "Costituzione MTC · " + c.temperamento, c.immagini.profiling) +
      ancore([["c-breve", "In breve"], ["c-desc", "Descrizione"],
              ["c-difesa", "Difesa emotiva"], ["c-test", "Come si testa"]]) +
      '<div class="sections">' +
      sezione("In breve", kvTabella(breve) + fig, "c-breve") +
      sezione("Descrizione", paragrafi(c.descrizione), "c-desc") +
      sezione("Personalità come difesa emotiva",
        '<p class="comotto">« ' + esc(c.difesa.motto) + " »</p>" + paragrafi(c.difesa.testo), "c-difesa") +
      sezione("Come si testa",
        "<p>Mentre la persona tocca con una mano il punto <strong>VC8 (Ombelico)</strong>, " +
        "testare il punto <strong>" + esc(c.puntoTest.sigla) + "</strong>.</p>" +
        figura(c.puntoTest.immagine, c.puntoTest.sigla + " — " + c.nome) +
        '<p class="cohint">' + link("#cost/test/costituzioni", "Vedi tutti e 6 i punti chiave") + "</p>", "c-test") +
      sezione("Collegamenti",
        '<div class="cogrid cogrid--2">' +
        cardHtml("#cost/biotipo/" + c.biotipo, BIO[c.biotipo],
                 "Il somatotipo di questa costituzione",
                 (byId(D.biotipi, c.biotipo) || {}).immagine, "") +
        cardHtml("#cost/confronto", "Confronto fra i biotipi", "Tabella comparativa", "", "") +
        "</div>", "c-link") +
      "</div>";
  }

  /* ------------------------------------------------------ procedure */
  function proceduraHtml(p) {
    var passi = '<ol class="copassi">' + p.passi.map(function (x) {
      return "<li>" + esc(x) + "</li>";
    }).join("") + "</ol>";

    var corpo;
    if (p.voci) {
      corpo = '<div class="copunti">' + p.voci.map(function (v) {
        return '<a class="copunto" href="#cost/costituzione/' + esc(v.id) + '">' +
          '<img src="' + esc(v.immagine) + '" alt="" loading="lazy" />' +
          '<span class="copunto__t">' + esc(v.sigla) + "</span>" +
          '<span class="copunto__s">' + esc(v.nome) + "</span></a>";
      }).join("") + "</div>";
    } else {
      corpo = '<div class="copolsi"><div class="copolsi__col"><h4>Mano destra</h4>' +
        elenco(p.polsi.destra, "colist--forte") + "</div>" +
        '<div class="copolsi__col"><h4>Mano sinistra</h4>' +
        elenco(p.polsi.sinistra, "colist--forte") + "</div></div>" +
        (p.immagini || []).map(function (i) { return figura(i, "I 6 polsi"); }).join("");
    }
    return head(p.titolo, "Procedura di test", "") +
      '<div class="sections">' +
      sezione("Procedura", passi, "p-passi") +
      sezione(p.voci ? "I 6 punti chiave" : "I 6 polsi", corpo, "p-voci") +
      "</div>";
  }

  /* -------------------------------------------------------- teoria */
  function teoriaIndiceHtml() {
    return head("Teoria e modelli storici", "Come si è arrivati alle costituzioni", "") +
      '<div class="sections"><section class="section"><h3>Capitoli</h3>' +
      '<div class="cogrid cogrid--2">' + D.teoria.map(function (t, i) {
        return cardHtml("#cost/teoria/" + t.id, t.titolo,
          t.paragrafi.length + " paragrafi", "", String(i + 1));
      }).join("") + "</div></section></div>";
  }
  function teoriaHtml(t) {
    var i = D.teoria.indexOf(t);
    var prec = D.teoria[i - 1], succ = D.teoria[i + 1];
    return head(t.titolo, "Teoria · capitolo " + (i + 1) + " di " + D.teoria.length, "") +
      '<div class="sections">' +
      sezione(t.titolo, paragrafi(t.paragrafi) +
        (t.immagini || []).map(function (im) { return figura(im, ""); }).join(""), "t-corpo") +
      '<div class="conav">' +
      (prec ? link("#cost/teoria/" + prec.id, "‹ " + prec.titolo) : "<span></span>") +
      (succ ? link("#cost/teoria/" + succ.id, succ.titolo) : "<span></span>") +
      "</div></div>";
  }

  /* ------------------------------------------------------ confronto */
  var CONFRONTO = [
    ["Livelli MTC", function (b) { return b.sintesi["LIVELLI DI MTC"]; }],
    ["Temperamento", function (b) { return b.sintesi["TEMPERAMENTO"]; }],
    ["Meridiani", function (b) { return b.sintesi["MERIDIANI"]; }],
    ["Diatesi", function (b) { return b.sintesi["DIATESI"]; }],
    ["Tendenza", function (b) { return b.sintesi["TENDENZA"]; }],
    ["Animale", function (b) { return b.sintesi["ANIMALE"]; }],
    ["Sintomo chiave primario", function (b) { return kv(b.scheda, "SINTOMI CHIAVE PRIMARIO"); }],
    ["Sintomo chiave secondario", function (b) { return kv(b.scheda, "SINTOMI CHIAVE SECONDARIO"); }],
    ["Organi ipoattivi", function (b) { return kv(b.scheda2, "ORGANI IPOATTIVI"); }],
    ["Area di maggiore debolezza", function (b) { return kv(b.scheda2, "AREA FISICA DI MAGGIORE DEBOLEZZA"); }],
    ["Costituzione classica", function (b) { return kv(b.scheda2, "COSTITUZIONE CLASSICA"); }],
    ["Costituzione omeopatica", function (b) { return kv(b.scheda2, "COSTITUZIONE OMEOPATICA"); }],
    ["Tipo di apprendimento", function (b) { return b.apprendimento.tipo; }],
    ["Personalità acquisita", function (b) { return b.personalita.tipo + " — " + b.personalita.conflitti; }],
    ["Reazione agli stimoli", function (b) { return b.reazione.fase; }],
    ["Insofferente quando", function (b) { return b.insofferenza.quando; }],
    ["Reazioni all'insofferenza", function (b) { return b.insofferenza.reazioni.join(", "); }]
  ];
  function kv(list, chiave) {
    for (var i = 0; i < list.length; i++) if (list[i].k === chiave) return list[i].v;
    return "";
  }
  function confrontoHtml() {
    var capi = "<tr><th></th>" + D.biotipi.map(function (b) {
      return '<th><a href="#cost/biotipo/' + esc(b.id) + '">' + esc(b.nome) + "</a></th>";
    }).join("") + "</tr>";
    var righe = CONFRONTO.map(function (r) {
      return "<tr><th scope=\"row\">" + esc(r[0]) + "</th>" +
        D.biotipi.map(function (b) { return "<td>" + esc(r[1](b) || "—") + "</td>"; }).join("") + "</tr>";
    }).join("");
    var sintomi = "<tr><th scope=\"row\">Sintomatologia</th>" + D.biotipi.map(function (b) {
      return "<td>" + elenco(b.sintomi, "colist--fitta") + "</td>";
    }).join("") + "</tr>";

    var ergo = ["alto", "medio", "basso"].map(function (k) {
      return "<tr><th scope=\"row\">Tono emotivo " + k + "</th>" + D.biotipi.map(function (b) {
        var e = b.ergopsichica[k] || {};
        return "<td>" + esc(e.tratti || "—") + "</td>";
      }).join("") + "</tr>";
    }).join("");

    return head("Confronto fra i 3 biotipi", "Ectomorfo · Mesomorfo · Endomorfo", "") +
      '<div class="sections">' +
      sezione("Tabella comparativa",
        '<div class="cotab-wrap"><table class="cotab cotab--conf"><thead>' + capi +
        "</thead><tbody>" + righe + sintomi + "</tbody></table></div>", "k-tab") +
      sezione("Ergopsichica a confronto",
        "<p>" + esc(D.ergoIntro) + "</p>" +
        '<div class="cotab-wrap"><table class="cotab cotab--conf"><thead>' + capi +
        "</thead><tbody>" + ergo + "</tbody></table></div>", "k-ergo") +
      sezione("Tabella riassuntiva dei 6 livelli", sinotticaHtml(false), "k-sin") +
      "</div>";
  }

  /* ---------------------------------------------------- intestazione */
  function head(titolo, sotto, immagine) {
    return '<div class="cohead">' +
      (immagine ? '<img class="cohead__img" src="' + esc(immagine) + '" alt="" />' : "") +
      "<div><h2>" + esc(titolo) + "</h2>" +
      (sotto ? "<p>" + esc(sotto) + "</p>" : "") + "</div></div>";
  }
  function ancore(list) {
    return '<nav class="anchors coanchors" aria-label="Vai alla sezione">' +
      list.map(function (a) {
        return '<a href="#' + esc(a[0]) + '" data-anchor="' + esc(a[0]) + '">' + esc(a[1]) + "</a>";
      }).join("") + "</nav>";
  }

  /* ------------------------------------------------------- ricerca */
  function tuttiGliElementi() {
    var out = [];
    D.biotipi.forEach(function (b) {
      out.push({ hash: "#cost/biotipo/" + b.id, t: b.nome, s: "Biotipo · " + (b.sintesi["TEMPERAMENTO"] || ""),
                 img: b.immagine, q: b._search });
    });
    D.costituzioni.forEach(function (c) {
      out.push({ hash: "#cost/costituzione/" + c.id, t: c.nome,
                 s: "Costituzione MTC · " + c.temperamento + " · " + c.animale,
                 img: c.immagini.profiling, q: c._search });
    });
    D.procedure.forEach(function (p) {
      out.push({ hash: "#cost/test/" + p.id, t: p.titolo, s: "Procedura di test", img: "", q: p._search });
    });
    D.teoria.forEach(function (t) {
      out.push({ hash: "#cost/teoria/" + t.id, t: t.titolo, s: "Teoria", img: "", q: t._search });
    });
    return out;
  }
  var INDICE = tuttiGliElementi();

  function risultatiHtml(q) {
    var termini = norm(q).split(/\s+/).filter(Boolean);
    var res = INDICE.filter(function (x) {
      var testo = norm(x.t + " " + x.s) + " " + x.q;
      return termini.every(function (t) { return testo.indexOf(t) !== -1; });
    });
    if (!res.length) {
      return '<div class="cohome"><p class="noresults">Nessun risultato per «' + esc(q) + '».</p></div>';
    }
    return '<div class="cohome"><div class="cohero"><h2>Risultati</h2><p>' +
      res.length + (res.length === 1 ? " scheda trovata" : " schede trovate") +
      " per «" + esc(q) + "».</p></div>" +
      '<div class="cogrid">' + res.map(function (x) {
        return cardHtml(x.hash, x.t, x.s, x.img, "");
      }).join("") + "</div></div>";
  }

  /* -------------------------------------------------------- render */
  var ultimaQuery = "";

  function titolo(hash) {
    var v = parse(hash);
    if (v.tipo === "biotipo") { var b = byId(D.biotipi, v.id); return b ? b.nome : ""; }
    if (v.tipo === "costituzione") { var c = byId(D.costituzioni, v.id); return c ? c.nome : ""; }
    if (v.tipo === "test") { var p = byId(D.procedure, v.id); return p ? p.titolo : ""; }
    if (v.tipo === "teoria" && v.id) { var t = byId(D.teoria, v.id); return t ? t.titolo : "Teoria"; }
    if (v.tipo === "teoria") return "Teoria";
    if (v.tipo === "confronto") return "Confronto";
    return "";
  }

  function parse(hash) {
    var m = /^#cost\/([a-z]+)(?:\/([-a-z0-9]+))?/.exec(hash || "");
    if (!m) return { tipo: "home", id: "" };
    return { tipo: m[1], id: m[2] || "" };
  }

  function show(hash) {
    var v = parse(hash), html;
    if (v.tipo === "biotipo" && byId(D.biotipi, v.id)) html = biotipoHtml(byId(D.biotipi, v.id));
    else if (v.tipo === "costituzione" && byId(D.costituzioni, v.id)) html = costituzioneHtml(byId(D.costituzioni, v.id));
    else if (v.tipo === "test" && byId(D.procedure, v.id)) html = proceduraHtml(byId(D.procedure, v.id));
    else if (v.tipo === "teoria" && v.id && byId(D.teoria, v.id)) html = teoriaHtml(byId(D.teoria, v.id));
    else if (v.tipo === "teoria") html = teoriaIndiceHtml();
    else if (v.tipo === "confronto") html = confrontoHtml();
    else html = ultimaQuery ? risultatiHtml(ultimaQuery) : homeHtml();
    mount.innerHTML = html;
    mount.hidden = false;
    return v.tipo;
  }

  function filter(q) {
    ultimaQuery = (q || "").trim();
    if (parse(location.hash).tipo !== "home") return;
    mount.innerHTML = ultimaQuery ? risultatiHtml(ultimaQuery) : homeHtml();
  }

  /* scorrimento morbido per le ancore interne */
  mount.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-anchor]");
    if (!a) return;
    e.preventDefault();
    var t = document.getElementById(a.getAttribute("data-anchor"));
    if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* lightbox condivisa con il resto dell'app */
  mount.addEventListener("click", function (e) {
    var im = e.target.closest(".pageimg");
    if (!im || !window.openLightbox) return;
    var sec = im.closest(".section") || mount;
    var thumbs = Array.prototype.slice.call(sec.querySelectorAll(".pageimg"));
    window.openLightbox(thumbs.map(function (t) { return t.getAttribute("src"); }), thumbs.indexOf(im));
  });

  window.Cost = { show: show, filter: filter, titolo: titolo, parse: parse, indice: INDICE };
})();
