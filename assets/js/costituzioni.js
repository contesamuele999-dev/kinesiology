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

  /* I 6 temperamenti: ognuno è "nativo" di una costituzione ed è rilevato su un polso.
     L'ordine segue la procedura del manuale (3 polsi per mano). */
  var TEMPERAMENTI = [
    { id: "nervoso",     nome: "Nervoso",     cost: "tai-yang",  mano: "destra"   },
    { id: "flemmatico",  nome: "Flemmatico",  cost: "tai-yin",   mano: "destra"   },
    { id: "linfatico",   nome: "Linfatico",   cost: "yang-ming", mano: "destra"   },
    { id: "melanconico", nome: "Melanconico", cost: "shao-yin",  mano: "sinistra" },
    { id: "bilioso",     nome: "Bilioso",     cost: "shao-yang", mano: "sinistra" },
    { id: "sanguigno",   nome: "Sanguigno",   cost: "jue-yin",   mano: "sinistra" }
  ];
  function tempById(id) { return byId(TEMPERAMENTI, id); }
  function tempDi(costId) {
    for (var i = 0; i < TEMPERAMENTI.length; i++) if (TEMPERAMENTI[i].cost === costId) return TEMPERAMENTI[i];
    return null;
  }

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
  /* ---- vocabolario locale: i capitoli di teoria ----
     I capitoli si citano a vicenda di continuo ("come in Ippocrate",
     "i tre foglietti embriologici"). I termini non sono scritti a mano:
     si ricavano dal titolo del capitolo — il nome proprio dopo "modello
     di", e ciò che segue i due punti — così aggiungendo un capitolo i
     rimandi compaiono da soli. */
  var TEORIA_TERMINI = null;
  function teoriaTermini() {
    if (TEORIA_TERMINI) return TEORIA_TERMINI;
    var out = [];
    (D.teoria || []).forEach(function (t) {
      var href = "#cost/teoria/" + t.id, titolo = "Capitolo: " + t.titolo;
      var m = /modello di ([^:]+)/i.exec(t.titolo);
      if (m) out.push({ testo: m[1].trim(), href: href, title: titolo });
      var d = /:\s*(?:i |le |gli |l')?(.+)$/i.exec(t.titolo);
      if (d) out.push({ testo: d[1].trim(), href: href, title: titolo });
      var f = /^I tre (.+)$/i.exec(t.titolo);
      if (f) out.push({ testo: f[1].trim(), href: href, title: titolo });
    });
    TEORIA_TERMINI = out.filter(function (x) { return x.testo.length >= 4; });
    return TEORIA_TERMINI;
  }
  /* Testo dei manuali reso cliccabile: meridiani, muscoli, costituzioni e
     sigle dei punti (links.js) più i rimandi fra capitoli di teoria. */
  function AL(t, o) {
    var L = window.Links;
    if (!L) return esc(t);
    var opz = {};
    Object.keys(o || {}).forEach(function (k) { opz[k] = o[k]; });
    opz.extra = (opz.extra || []).concat(teoriaTermini());
    return L.autolink(t, opz);
  }
  function paragrafi(list, opz) {
    if (!list || !list.length) return "";
    return list.map(function (p) { return "<p>" + AL(p, opz) + "</p>"; }).join("");
  }
  /* Una riga può portare un valore testuale (`v`, escapato) oppure un
     frammento già pronto (`h`), che è come si rendono cliccabili le voci
     che puntano a un'altra scheda: somatotipo, meridiani, punto di test. */
  function kvTabella(rows) {
    if (!rows || !rows.length) return "";
    return '<dl class="kv">' + rows.map(function (r) {
      var k = r.k != null ? r.k : r[0];
      var v = r.v != null ? r.v : r[1];
      var h = r.h != null ? r.h : null;
      return '<div class="kv__row"><dt>' + esc(k) + "</dt><dd>" +
             (h ? h : (v ? esc(v) : '<span class="kv__vuoto">—</span>')) + "</dd></div>";
    }).join("") + "</dl>";
  }
  function elenco(items, cls) {
    if (!items || !items.length) return "";
    return '<ul class="colist ' + (cls || "") + '">' +
      items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
  }
  /* I sei polsi della procedura: ognuno è il nome di un temperamento e
     porta alla costituzione di cui è nativo. */
  function elencoPolsi(items) {
    if (!items || !items.length) return "";
    return '<ul class="colist colist--forte">' +
      items.map(function (x) { return "<li>" + tempLink(x) + "</li>"; }).join("") + "</ul>";
  }
  function link(hash, testo) {
    return '<a class="colink" href="' + esc(hash) + '">' + esc(testo) + " ›</a>";
  }
  /* links.js con un fallback inerte: se non è caricato le schede restano
     leggibili, solo senza collegamenti. */
  var LNULL = { hrefCoppia: function () { return "#cost/coppia"; },
                linkSigleMer: function (s) { return esc(s); } };
  function L() { return window.Links || LNULL; }
  function hLink(hash, testo, titolo) {
    if (!testo) return '<span class="kv__vuoto">—</span>';
    return '<a class="xref" href="' + esc(hash) + '"' +
      (titolo ? ' title="' + esc(titolo) + '"' : "") + ">" + esc(testo) + "</a>";
  }
  /* "Ecto-Meso", "Endo": ogni metà rimanda al capitolo sui tre foglietti
     e al biotipo corrispondente. */
  var FOGL = { ecto: "ecto", meso: "meso", endo: "endo" };
  function foglLink(testo) {
    var s = String(testo || "");
    if (!s) return '<span class="kv__vuoto">—</span>';
    return s.replace(/[A-Za-zÀ-ÿ]+/g, function (tok) {
      var id = FOGL[tok.toLowerCase()];
      return id ? hLink("#cost/biotipo/" + id, tok, "Biotipo " + BIO[id]) : esc(tok);
    });
  }
  /* Collegamenti verso Punti Indicatori e Coordinate: il grafo sta in
     links.js e conosce già le equivalenze ("M – P" = milza + polmone,
     "M4" = MP4). Qui si incolla e basta. */
  function xlinkCostituzione(c) {
    var L = window.Links;
    if (!L) return "";
    var mers = L.merOfCost(c);
    if (!mers.length) return "";
    var chipsMer = mers.map(function (id) {
      var m = L.mer(id);
      return m ? L.chipMer(id, m.nome) : "";
    });
    var coordinate = [], punti = [], visti = {};
    mers.forEach(function (id) {
      L.chipsCoord(id).forEach(function (h) { if (!visti[h]) { visti[h] = 1; coordinate.push(h); } });
      L.chipsPunti(id).forEach(function (h) { if (!visti[h]) { visti[h] = 1; punti.push(h); } });
    });
    var pt = L.siglaPunto(c.puntoTest && c.puntoTest.sigla);
    var chipTest = pt ? [L.chip({
      kind: "mer", href: L.hrefMer(pt.merId, pt.sigla),
      colore: (L.mer(pt.merId) || {}).colore,
      label: c.puntoTest.sigla, sub: "sulla mappa 3D",
      title: "Inquadra il punto di test " + c.puntoTest.sigla + " sulla mappa 3D"
    })] : [];
    return L.box("", [
      L.row("Meridiani (" + c.meridiani + ")", chipsMer),
      L.row("Punto di test", chipTest),
      L.row("Coordinate di questi meridiani", coordinate),
      L.row("Punti d'allarme", punti)
    ]);
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

      '<section class="coblock coblock--hi"><h3 class="coblock__h"><span class="coblock__n">▶</span>Trova il profilo</h3>' +
      '<p class="coblock__d">Percorso guidato: prima la costituzione, poi il temperamento. ' +
      "Alla fine vedi solo ciò che riguarda la coppia.</p>" +
      '<div class="cogrid cogrid--2">' +
        cardHtml("#cost/coppia", "Costituzione + Temperamento",
                 "2 passi · sintesi della coppia", "", "Inizia") +
      "</div></section>" +

      '<section class="coblock"><h3 class="coblock__h"><span class="coblock__n">1</span>Come si testa</h3>' +
      '<p class="coblock__d">Le due procedure del manuale, passo per passo.</p>' +
      '<div class="cogrid cogrid--2">' + b3 + "</div></section>" +

      '<section class="coblock"><h3 class="coblock__h"><span class="coblock__n">2</span>I 3 Biotipi</h3>' +
      '<p class="coblock__d">La struttura del corpo: Ectomorfo, Mesomorfo, Endomorfo.</p>' +
      '<div class="cogrid cogrid--3">' + b1 + "</div></section>" +

      '<section class="coblock"><h3 class="coblock__h"><span class="coblock__n">3</span>Le 6 Costituzioni MTC</h3>' +
      '<p class="coblock__d">Il livello energetico: Tai Yang, Shao Yang, Tai Yin, Yang Ming, Jue Yin, Shao Yin.</p>' +
      '<div class="cogrid">' + b2 + "</div></section>" +

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
      return "<tr><td>" + foglLink(r.foglietto) + '</td><td><a href="#cost/costituzione/' + esc(r.id) +
        '"><strong>' + esc(r.livello) + "</strong></a></td><td>" + tempLink(r.biotipo) +
        "</td><td>" + esc(r.neurotipo) + "</td><td>" + L().linkSigleMer(r.meridiani) +
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

  /* "Nervoso / Melanconico" → ogni temperamento apre la costituzione di
     cui è nativo. L'elenco TEMPERAMENTI è già qui sopra: nessuna tabella
     di link da mantenere. */
  function tempLink(testo) {
    return String(testo || "").replace(/[A-Za-zÀ-ÿ]+/g, function (tok) {
      var t = null;
      for (var i = 0; i < TEMPERAMENTI.length; i++) {
        if (norm(TEMPERAMENTI[i].nome) === norm(tok)) { t = TEMPERAMENTI[i]; break; }
      }
      if (!t) return esc(tok);
      var c = byId(D.costituzioni, t.cost);
      return hLink("#cost/costituzione/" + t.cost, tok,
                   "Temperamento nativo di " + (c ? c.nome : t.cost));
    });
  }
  function biotipoHtml(b) {
    /* Le voci della sintesi non sono testo morto: livelli MTC,
       temperamenti e meridiani puntano tutti a una scheda. */
    var SINT_H = {
      "LIVELLI DI MTC": function (v) { return AL(v, { max: 4 }); },
      "TEMPERAMENTO": tempLink,
      "MERIDIANI": function (v) { return L().linkSigleMer(v); }
    };
    var breve = SINT_ORD.filter(function (k) { return b.sintesi[k]; })
      .map(function (k) {
        return SINT_H[k] ? { k: k, h: SINT_H[k](b.sintesi[k]) } : { k: k, v: b.sintesi[k] };
      });

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
      sezione("In breve", kvTabella(breve) + paragrafi(b.descrizione.slice(0, 1), { salta: "#cost/biotipo/" + b.id }), "b-breve") +
      sezione("Descrizione", paragrafi(b.descrizione.slice(1), { salta: "#cost/biotipo/" + b.id }), "b-desc") +
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
      { k: "TEMPERAMENTO", h: hLink(L().hrefCoppia(c.id), c.temperamento,
          "Componi il profilo: " + c.nome + " + un temperamento") },
      { k: "ANIMALE", v: c.animale },
      { k: "POPOLAZIONE", v: c.popolazione },
      { k: "SOMATOTIPO", h: hLink("#cost/biotipo/" + c.biotipo, BIO[c.biotipo],
          "Scheda del biotipo " + BIO[c.biotipo]) },
      { k: "FOGLIETTO EMBRIOLOGICO", h: foglLink(c.foglietto) },
      { k: "NEUROTIPO", v: c.neurotipo },
      { k: "MERIDIANI", h: L().linkSigleMer(c.meridiani) },
      { k: "PUNTO DI TEST", h: puntoLink(c.puntoTest.sigla) }
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
      sezione("Descrizione", paragrafi(c.descrizione, { salta: "#cost/costituzione/" + c.id }), "c-desc") +
      sezione("Personalità come difesa emotiva",
        '<p class="comotto">« ' + esc(c.difesa.motto) + " »</p>" + paragrafi(c.difesa.testo), "c-difesa") +
      sezione("Come si testa",
        "<p>Mentre la persona tocca con una mano il punto <strong>" + puntoLink("VC8") + " (Ombelico)</strong>, " +
        "testare il punto <strong>" + puntoLink(c.puntoTest.sigla) + "</strong>.</p>" +
        figura(c.puntoTest.immagine, c.puntoTest.sigla + " — " + c.nome) +
        '<p class="cohint">' + link("#cost/test/costituzioni", "Vedi tutti e 6 i punti chiave") + "</p>", "c-test") +
      sezione("Collegamenti",
        '<div class="cogrid cogrid--2">' +
        cardHtml("#cost/biotipo/" + c.biotipo, BIO[c.biotipo],
                 "Il somatotipo di questa costituzione",
                 (byId(D.biotipi, c.biotipo) || {}).immagine, "") +
        cardHtml("#cost/confronto", "Confronto fra i biotipi", "Tabella comparativa", "", "") +
        "</div>" + xlinkCostituzione(c), "c-link") +
      "</div>";
  }

  /* ------------------------------------------------------ procedure */
  function proceduraHtml(p) {
    /* I passi nominano VC8 e i sei punti chiave: tutti inquadrabili
       sulla mappa 3D senza uscire dalla procedura. */
    var passi = '<ol class="copassi">' + p.passi.map(function (x) {
      return "<li>" + AL(x) + "</li>";
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
        elencoPolsi(p.polsi.destra) + "</div>" +
        '<div class="copolsi__col"><h4>Mano sinistra</h4>' +
        elencoPolsi(p.polsi.sinistra) + "</div></div>" +
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
      sezione(t.titolo, paragrafi(t.paragrafi, { salta: "#cost/teoria/" + t.id }) +
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
        D.biotipi.map(function (b) { return "<td>" + AL(r[1](b) || "—", { max: 3 }) + "</td>"; }).join("") + "</tr>";
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

  /* ------------------------------------ coppia costituzione + temperamento
     Flusso guidato a 2 passi: prima la costituzione (6 punti chiave),
     poi il temperamento (6 polsi). Il risultato mostra SOLO ciò che riguarda
     la coppia: sintesi di confronto, convergenze/divergenze, come è stata
     rilevata, motti. Le schede complete restano raggiungibili a parte. */

  function passi(n) {
    var voci = [
      { n: 1, t: "Costituzione", d: "6 punti chiave" },
      { n: 2, t: "Temperamento", d: "6 polsi" },
      { n: 3, t: "La coppia", d: "sintesi" }
    ];
    return '<ol class="costeps">' + voci.map(function (v) {
      var cls = v.n < n ? "is-done" : (v.n === n ? "is-now" : "");
      return '<li class="costep ' + cls + '"><span class="costep__n">' +
        (v.n < n ? "✓" : v.n) + '</span><span class="costep__t">' + esc(v.t) +
        '</span><span class="costep__d">' + esc(v.d) + "</span></li>";
    }).join("") + "</ol>";
  }

  function coppiaStep1Html() {
    var cards = D.costituzioni.map(function (c) {
      return cardHtml("#cost/coppia/" + c.id, c.nome,
        "Punto chiave " + c.puntoTest.sigla + " · " + c.animale,
        c.immagini.profiling, "Codice " + c.codice);
    }).join("");
    return '<div class="cohome"><div class="cohero"><h2>Costituzione + Temperamento</h2>' +
      "<p>Due test, un solo profilo. Comincia dalla costituzione: mentre la persona tocca " +
      "<strong>" + puntoLink("VC8") + " (Ombelico)</strong>, testa i 6 punti chiave e scegli qui quello che ha risposto.</p></div>" +
      passi(1) +
      '<section class="coblock"><h3 class="coblock__h"><span class="coblock__n">1</span>Scegli la costituzione</h3>' +
      '<p class="coblock__d">Il livello energetico MTC emerso dal test dei 6 punti chiave.</p>' +
      '<div class="cogrid">' + cards + "</div></section>" +
      '<p class="cohint">' + link("#cost/test/costituzioni", "Rivedi la procedura completa") + "</p></div>";
  }

  function coppiaStep2Html(c) {
    function gruppo(mano) {
      var voci = TEMPERAMENTI.filter(function (t) { return t.mano === mano; });
      return '<div class="cocol"><h4>Mano ' + esc(mano) + "</h4>" +
        '<div class="cogrid cogrid--3">' + voci.map(function (t) {
          var orig = byId(D.costituzioni, t.cost);
          return cardHtml("#cost/coppia/" + c.id + "/" + t.id, t.nome,
            "Temperamento di " + (orig ? orig.nome : ""),
            orig ? orig.immagini.profiling : "",
            t.cost === c.id ? "coincide" : "");
        }).join("") + "</div></div>";
    }
    return '<div class="cohome"><div class="cohero"><h2>' + esc(c.nome) +
      " + quale temperamento?</h2>" +
      "<p>Costituzione scelta: <strong>" + esc(c.nome) + "</strong> (codice " + esc(c.codice) +
      "). Ora, sempre con una mano su <strong>" + puntoLink("VC8") + "</strong>, testa i 6 polsi e scegli il temperamento che ha risposto.</p></div>" +
      passi(2) +
      '<p class="cohint">' + link("#cost/coppia", "‹ Cambia costituzione") + "</p>" +
      '<section class="coblock"><h3 class="coblock__h"><span class="coblock__n">2</span>Scegli il temperamento</h3>' +
      '<p class="coblock__d">3 polsi per mano, come nella procedura del manuale.</p>' +
      '<div class="cocols">' + gruppo("destra") + gruppo("sinistra") + "</div></section>" +
      '<p class="cohint">' + link("#cost/test/temperamenti", "Rivedi la procedura completa") + "</p></div>";
  }

  /* righe della sintesi: [etichetta, valore, (facoltativo) come renderlo
     cliccabile]. Il terzo elemento riceve il valore e la costituzione da
     cui viene, così ogni cella del confronto porta alla sua scheda. */
  var COPPIA_ROWS = [
    ["Livello MTC",          function (c) { return c.nome; },
                             function (v, c) { return hLink("#cost/costituzione/" + c.id, v, "Scheda di " + v); }],
    ["Codice di riferimento",function (c) { return c.codice; }],
    ["Temperamento nativo",  function (c) { return c.temperamento; }, function (v) { return tempLink(v); }],
    ["Somatotipo",           function (c) { return BIO[c.biotipo]; },
                             function (v, c) { return hLink("#cost/biotipo/" + c.biotipo, v, "Scheda del biotipo " + v); }],
    ["Foglietto embriologico", function (c) { return c.foglietto; }, function (v) { return foglLink(v); }],
    ["Neurotipo",            function (c) { return c.neurotipo; }],
    ["Meridiani",            function (c) { return c.meridiani; }, function (v) { return L().linkSigleMer(v); }],
    ["Animale",              function (c) { return c.animale; }],
    ["Popolazione",          function (c) { return c.popolazione; }],
    ["Punto di test",        function (c) { return c.puntoTest.sigla; }, function (v) { return puntoLink(v); }]
  ];

  function coppiaHtml(c, t) {
    var orig = byId(D.costituzioni, t.cost);          // costituzione "proprietaria" del temperamento
    var puro = orig && orig.id === c.id;              // costituzione e temperamento coincidono

    var cella = function (r, valore, cost) {
      if (!valore) return "—";
      return r[2] ? r[2](valore, cost) : esc(valore);
    };
    var righe = COPPIA_ROWS.map(function (r) {
      var a = r[1](c) || "", b = orig ? (r[1](orig) || "") : "";
      var uguali = norm(a) === norm(b) && a !== "";
      return '<tr class="' + (uguali ? "is-same" : "is-diff") + '">' +
        '<th scope="row">' + esc(r[0]) + "</th><td>" + cella(r, a, c) + "</td>" +
        (puro ? "" : "<td>" + cella(r, b, orig) + "</td>") + "</tr>";
    }).join("");

    var capi = '<tr><th></th><th>Costituzione<br><span class="cocap">' + esc(c.nome) + "</span></th>" +
      (puro ? "" : '<th>Temperamento<br><span class="cocap">' + esc(t.nome) +
        (orig ? " · " + esc(orig.nome) : "") + "</span></th>") + "</tr>";

    var comuni = [], diverse = [];
    COPPIA_ROWS.forEach(function (r) {
      var a = r[1](c) || "", b = orig ? (r[1](orig) || "") : "";
      if (!a && !b) return;
      if (norm(a) === norm(b)) comuni.push(r[0] + ": " + a);
      else diverse.push(r[0] + ": " + (a || "—") + " / " + (b || "—"));
    });

    var esito = puro
      ? '<div class="coesito coesito--puro"><h4>Profilo coerente</h4><p>Costituzione e temperamento ' +
        "appartengono allo stesso livello: il quadro è omogeneo, senza tensioni fra struttura energetica " +
        "e tono di fondo. Vale il profilo di <strong>" + esc(c.nome) + "</strong>.</p></div>"
      : '<div class="coesito coesito--misto"><h4>Profilo misto</h4><p>La costituzione è <strong>' +
        esc(c.nome) + "</strong>, ma il temperamento rilevato è <strong>" + esc(t.nome) +
        "</strong>, nativo di <strong>" + (orig ? esc(orig.nome) : "") + "</strong>. " +
        "Il corpo si muove su un livello energetico e il tono di fondo su un altro: leggere " +
        "la coppia, non i due profili separatamente.</p></div>";

    var rilevata = '<div class="cocols">' +
      '<div class="cocol"><h4>Costituzione — punto chiave</h4>' +
      "<p>Con una mano su <strong>" + puntoLink("VC8") + " (Ombelico)</strong>, ha risposto <strong>" +
      puntoLink(c.puntoTest.sigla) + "</strong>.</p>" +
      figura(c.puntoTest.immagine, c.puntoTest.sigla + " — " + c.nome) + "</div>" +
      '<div class="cocol"><h4>Temperamento — polso</h4>' +
      "<p>Sempre con una mano su <strong>" + puntoLink("VC8") + "</strong>, ha risposto il polso <strong>" +
      tempLink(t.nome) + "</strong>, <strong>mano " + esc(t.mano) + "</strong>.</p></div></div>";

    var motti = '<div class="cocols">' +
      '<div class="cocol"><h4>Dalla costituzione · ' + esc(c.nome) + "</h4>" +
      '<p class="comotto">« ' + esc(c.difesa.motto) + " »</p></div>" +
      (puro ? "" : '<div class="cocol"><h4>Dal temperamento · ' + esc(t.nome) + "</h4>" +
        '<p class="comotto">« ' + esc(orig ? orig.difesa.motto : "") + " »</p></div>") +
      "</div>";

    var schede = '<div class="cogrid cogrid--2">' +
      cardHtml("#cost/costituzione/" + c.id, c.nome, "Scheda completa della costituzione",
               c.immagini.profiling, "Codice " + c.codice) +
      (puro ? "" : cardHtml("#cost/costituzione/" + orig.id, orig.nome,
               "Scheda completa del temperamento " + t.nome, orig.immagini.profiling,
               "Codice " + orig.codice)) + "</div>";

    return head(c.nome + " + " + t.nome,
                "Coppia costituzione · temperamento", c.immagini.profiling) +
      passi(3) +
      '<p class="cohint">' + link("#cost/coppia/" + c.id, "‹ Cambia temperamento") + " " +
      link("#cost/coppia", "‹ Ricomincia") + "</p>" +
      ancore([["k-esito", "Esito"], ["k-sint", "Sintesi"], ["k-conv", "Convergenze"],
              ["k-ril", "Come è stata rilevata"], ["k-motti", "Motti"]]) +
      '<div class="sections">' +
      sezione("Esito della coppia", esito, "k-esito") +
      sezione("Sintesi di confronto",
        '<div class="cotab-wrap"><table class="cotab cotab--coppia"><thead>' + capi +
        "</thead><tbody>" + righe + "</tbody></table></div>" +
        (puro ? "" : '<p class="cohint">Le righe evidenziate sono i punti in cui costituzione e temperamento coincidono.</p>'),
        "k-sint") +
      (puro ? "" : sezione("Convergenze e divergenze",
        '<div class="cocols"><div class="cocol"><h4>In comune</h4>' +
        (comuni.length ? elenco(comuni) : "<p>Nessuna voce in comune.</p>") + "</div>" +
        '<div class="cocol"><h4>Dove divergono</h4>' + elenco(diverse) + "</div></div>", "k-conv")) +
      sezione("Come è stata rilevata", rilevata, "k-ril") +
      sezione("Motti della coppia", motti, "k-motti") +
      sezione("Schede complete", schede, "k-schede") +
      "</div>";
  }

  /* ---------------------------------------------------- intestazione */
  function head(titolo, sotto, immagine) {
    return '<div class="cohead">' +
      (immagine ? '<img class="cohead__img" src="' + esc(immagine) + '" alt="" />' : "") +
      "<div><h2>" + esc(titolo) + "</h2>" +
      (sotto ? "<p>" + esc(sotto) + "</p>" : "") + "</div></div>";
  }
  /* "VC8", "M4"… dentro un testo diventano un salto alla mappa 3D. */
  function puntoLink(sigla) {
    var L = window.Links;
    var pt = L ? L.siglaPunto(sigla) : null;
    if (!pt) return esc(sigla);
    return '<a class="xref" href="' + esc(L.hrefMer(pt.merId, pt.sigla)) + '">' + esc(sigla) + "</a>";
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
    out.push({ hash: "#cost/coppia", t: "Costituzione + Temperamento",
               s: "Percorso guidato · sintesi della coppia", img: "",
               q: norm("coppia costituzione temperamento profilo guidato polsi punti chiave " +
                       TEMPERAMENTI.map(function (x) { return x.nome; }).join(" ")) });
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
    if (v.tipo === "coppia") {
      var cc = v.id ? byId(D.costituzioni, v.id) : null, tt = v.id2 ? tempById(v.id2) : null;
      if (cc && tt) return cc.nome + " + " + tt.nome;
      if (cc) return cc.nome + " + temperamento?";
      return "Costituzione + Temperamento";
    }
    if (v.tipo === "biotipo") { var b = byId(D.biotipi, v.id); return b ? b.nome : ""; }
    if (v.tipo === "costituzione") { var c = byId(D.costituzioni, v.id); return c ? c.nome : ""; }
    if (v.tipo === "test") { var p = byId(D.procedure, v.id); return p ? p.titolo : ""; }
    if (v.tipo === "teoria" && v.id) { var t = byId(D.teoria, v.id); return t ? t.titolo : "Teoria"; }
    if (v.tipo === "teoria") return "Teoria";
    if (v.tipo === "confronto") return "Confronto";
    return "";
  }

  function parse(hash) {
    var m = /^#cost\/([a-z]+)(?:\/([-a-z0-9]+))?(?:\/([-a-z0-9]+))?/.exec(hash || "");
    if (!m) return { tipo: "home", id: "", id2: "" };
    return { tipo: m[1], id: m[2] || "", id2: m[3] || "" };
  }

  function show(hash) {
    var v = parse(hash), html;
    if (v.tipo === "coppia") {
      var cc = v.id ? byId(D.costituzioni, v.id) : null;
      var tt = v.id2 ? tempById(v.id2) : null;
      if (cc && tt) html = coppiaHtml(cc, tt);
      else if (cc) html = coppiaStep2Html(cc);
      else html = coppiaStep1Html();
      mount.innerHTML = html;
      mount.hidden = false;
      return "coppia";
    }
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
