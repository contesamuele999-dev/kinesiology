/* Manuale «Occhi, Stress, Postura e Apprendimento» — schede per manuali.js.
   Fonti: dispensa Physis «Introduzione alla Clinica Visuo Posturale» (M. Barutti, NVP)
   + manuale K~Physis Visione (M. Rado) + appunti a mano del corso.
   `pag` = numero di pagina stampato sul manuale (non quello del PDF). */
(function () {
  /* Le aree visive si scrivono "V⁠" + numero (word joiner): così l'autolink
     non le scambia per i punti di Vescica (V⁠1 = area visiva, V 1 = Jingming). */
  var CORR_VP = ["Meridiani Straordinari", "Meridiani Tendino Muscolari (specialmente i 3 Yang del Braccio)",
    "Meridiani Divergenti (specialmente quelli dell'Elemento Terra e Legno)", "Nervi Cranici", "Ossa Craniche",
    "Riequilibrio del Piede", "Riequilibrio dello Shen"];
  var CORR_ALTRE = ["7 Chiavi del Qi", "Figure ad 8", "K~Physis Foundations (Basi della Vita)",
    "K~Physis Structural 1-2-3-4 (Spine Physiology, Connectiv#Ology, 5 Pilastri)", "Coordinate"];
  var CHIUSURA = ["Ritestare i pre-test iniziali.",
    "Se qualche pre-test è ancora in squilibrio, metterlo in circuito e cercare altre correzioni."];
  function altre(extra) { return { t: "Testare altre eventuali correzioni:", sub: (extra || CORR_ALTRE) }; }
  function vp(extra) { return { t: "Testare altre eventuali correzioni visuo-posturali:", sub: (extra || CORR_VP) }; }

  /* Muscoli extraoculari: una scheda per muscolo, stessa struttura. */
  function moe(id, nome, coord, mer, locale, puntoCoord, catena, atm1, atm2, mov, c1, c2, pag, info, appunti) {
    return {
      id: id, titolo: nome, sotto: "Coordinata " + coord, pag: pag, meridiani: mer,
      test: "Modo Muscolo Specifico (polpastrello del pollice sull'unghia dell'indice) + L.C. del punto locale " + locale + ".",
      voci: [["Punto locale", locale], ["Punto coordinata", puntoCoord], ["Catena / MTM", catena],
             ["ATM 1", atm1], ["ATM 2", atm2], ["Movimento", mov], ["Catena 1", c1], ["Catena 2", c2]],
      info: info, appunti: appunti
    };
  }
  /* Muscoli suboccipitali, SCOM e trapezio: anatomia + riequilibrio. */
  function muscolo(id, nome, o, ins, az, inn, nutr, nv, pag, mer, appunti) {
    return {
      id: id, titolo: nome, pag: pag, meridiani: mer,
      voci: [["Origine", o], ["Inserzione", ins], ["Azione", az], ["Innervazione", inn],
             ["Riequilibrato da", nutr], ["NV", nv]],
      info: ["I riflessi NL anteriore e posteriore sono illustrati nel manuale (pagina successiva alla scheda)."],
      appunti: appunti
    };
  }
  function nervo(id, pa, nervo, punto, coord, pag, mer, testo) {
    return {
      id: id, titolo: nervo, sotto: "P.A. " + pa + " · " + punto + " · " + coord, pag: pag, meridiani: mer,
      test: "Punto d'Allarme " + pa + " prioritario (con VG 16 in circuito).",
      voci: [["Punto d'allarme", pa], ["Punto di riequilibrio", punto], ["Coordinata", coord]],
      info: [testo]
    };
  }
  function osso(id, punto, nome, pag, mer, ob, cliente, kin, contatti, mov, comm) {
    return {
      id: id, titolo: nome, sotto: "Punto chiave " + punto, pag: pag, meridiani: mer,
      test: "VG 20 in circuito + punto chiave " + punto + ".",
      voci: [["Obiettivo", ob], ["Posizione del cliente", cliente], ["Posizione del kinesiologo", kin]],
      liste: [{ titolo: "Punti di contatto", items: contatti }, { titolo: "Movimento", items: mov }],
      info: comm ? ["Commento: " + comm] : []
    };
  }
  function ocg(id, sigla, nome, punto, pag, testo) {
    return { id: id, titolo: nome, sotto: sigla + " · " + punto, pag: pag, voci: [["Punto indicatore", punto]], info: testo };
  }
  function divergente(id, nome, lc, mer, rami, pag, appunti) {
    return {
      id: id, titolo: "Divergente di " + nome, sotto: "L.C. " + lc, pag: pag, meridiani: mer,
      test: "L.C. " + lc + " (Modo Digitopressione Tocco Leggero in circuito).",
      tabelle: rami.map(function (r) { return { titolo: r.titolo, col: ["Punto", "Significato"], righe: r.righe }; }),
      appunti: appunti
    };
  }

  (window.MANUALI = window.MANUALI || []).push({
    id: "occhi",
    titolo: "Occhi, Stress, Postura e Apprendimento",
    breve: "Occhi",
    sotto: "Clinica visuo-posturale e procedure kinesiologiche",
    autore: "Marco Rado · dispensa Physis di Martina Barutti (scuola NVP)",
    intro: [
      "Occhi e postura si influenzano in entrambe le direzioni: il sistema visivo è il principale informatore del Sistema Tonico Posturale. Il corso parte dai test visuo-posturali di base, poi una procedura generale smista verso nove procedure specifiche: muscoli, nervi cranici, ossa craniche, agopressione, oculocefalogiria, piede, meridiani e Shen."
    ],
    capitoli: [
      {
        id: "basi", titolo: "Visione e postura · i pre-test",
        schede: [
          {
            id: "visione-postura", titolo: "Visione e postura", pag: "1-4",
            voci: [["Postura", "Posizione del corpo nello spazio in relazione alla forza di gravità"],
                   ["Sistema Tonico Posturale", "Unità anatomo-funzionale: il SNC raccoglie le afferenze dall'ambiente e dai recettori del corpo"],
                   ["L'occhio", "Doppio recettore: esterocettivo (retina) e propriocettivo (muscoli extraoculari)"],
                   ["Via chiave", "Oculocefalogiria (OCG): integra occhi, collo e vestibolo"]],
            info: [
              "La postura è il modo in cui reagiamo all'ambiente; per reagire dobbiamo percepirlo, e lo percepiamo con i sensi: la postura è quindi determinata dagli organi sensoriali, e l'occhio è il principale.",
              "Muscoli suboccipitali ed estrinseci dell'occhio hanno nomi identici, movimenti simili, la stessa origine embriologica e la più alta densità di fusi neuromuscolari: ogni squilibrio cervicale richiede un adattamento oculare e viceversa.",
              "Se occhi, collo e vestibolo non sono integrati il SNC compensa con la co-contrazione (aumenta il tono di agonisti e antagonisti). Ne possono derivare dolore cronico al collo, dolore al piede, malocclusione, deficit di convergenza, cambiamenti nell'astigmatismo e quasi ogni compenso posturale, fino ai piedi.",
              "Esempio di causa visiva: un'eteroforia verticale manda al SNC uno squilibrio paragonabile a una testa non livellata; attraverso l'OCG il SNC chiede a Trapezio Superiore e SCOM di correggere la testa, creando un conflitto fra riflessi vestibolari e cervicali che coinvolge fascia, ossa craniche e ATM.",
              "Due scenari possibili: la postura scorretta peggiora la vista, oppure la vista scarsa peggiora la postura (collo allungato in avanti o ruotato per vedere)."
            ],
            appunti: [
              "Il sistema tonico posturale reagisce alla forza di gravità: energeticamente sono i meridiani straordinari.",
              "Le vertigini possono non essere solo vestibolari.",
              "Per vedere se trattare i punti con il magnete vado a testare con 5 dita sul corpo.",
              "Il Fegato controlla il vestibolo più che gli occhi.",
              "Gli occhi stabilizzano il sistema posturale: sono la principale sorgente di sensazione cinestesica."
            ]
          },
          {
            id: "difetti-refrattivi", titolo: "Difetti refrattivi", pag: "appunti",
            tabelle: [{ titolo: "Difetti refrattivi", col: ["Difetto", "Occhio", "Correzione"], righe: [
              ["Miopia", "Cornea curva, bulbo più lungo e potente: fuoco davanti alla retina", "Lenti negative (es. −2,00 sf)"],
              ["Ipermetropia", "Cornea piatta, bulbo più corto e meno potente: fuoco dopo la retina", "Lenti positive (es. +2,00 sf)"],
              ["Astigmatismo", "Cornea con curvature diverse (palla da rugby): immagine deformata, il punto diventa linea", "Lenti toriche (es. −0,50 a 180°)"],
              ["Presbiopia", "Difetto fisiologico: cala il potere accomodativo del cristallino", "Addizione positiva (es. add +1,50 sf)"]
            ] }],
            voci: [["Diottrie", "Potere della lente degli occhiali"], ["Decimi", "La tabella: quanto vedi, da 1 a 10"], ["Gradi", "Asse dell'astigmatismo"]],
            liste: [{ titolo: "Riconoscere la lente in uso (guardando una linea attraverso la lente)", items: [
              "Lente positiva (ipermetrope/presbite): lo spigolo non si muove contro.",
              "Lente negativa (miope): lo spigolo si muove con la lente.",
              "Lente torica (astigmatismo): ruotando la lente lo spigolo si muove."
            ] }],
            appunti: ["Dominanza motoria: guida il nostro movimento. Dominanza oculare di fissazione: dirige lo sguardo e la testa sul bersaglio di interesse."]
          },
          {
            id: "dominanza", titolo: "Test della dominanza oculare di fissazione", pag: "Physis 6-7",
            test: "Si esegue per primo: orienta la lettura di tutti gli altri test (l'occhio dominante dirige testa e collo).",
            voci: [["Materiale", "Tavola di plexiglas trasparente forata al centro (il migliore) o cilindro forato"],
                   ["Distanza", "Lontano oltre 2,7 m; vicino alla distanza abituale di lavoro"],
                   ["Correzione", "Quella che il soggetto usa abitualmente a quella distanza"],
                   ["Registrazione", "Lontano: OD / OS"]],
            passi: [
              "Il soggetto tiene la tavola con entrambe le mani, braccia distese all'altezza delle ginocchia.",
              "Alza le braccia e guarda una mira piccola (circa 3 cm) attraverso il foro, con entrambi gli occhi aperti, fissando sempre la mira e mai il foro.",
              "Centrata la mira resta immobile; si occludono alternativamente gli occhi chiedendo se la mira è ancora dentro il foro.",
              "L'occhio che vede la mira allineata al foro è il dominante di fissazione.",
              "Ripetere almeno tre volte: la prima serve solo a istruire; se le due successive concordano il dato è affidabile, altrimenti usare un altro test di fissazione."
            ],
            info: ["Esistono 5 dominanze visive; quella di fissazione è quella che dirige il corpo verso l'oggetto di interesse. Doppia mano e cartone forato hanno la peggiore ripetibilità."]
          },
          {
            id: "vad", titolo: "Test VAD — Visual Acuity Differences", pag: "Physis 8-13",
            test: "Test posizionato a 2,7 m, ad altezza occhi, in ambiente ben illuminato.",
            liste: [{ titolo: "Cosa individua", items: [
              "Se la componente esocettiva della visione non è integrata nel Sistema Tonico Posturale.",
              "Una differenza di percezione fra i due occhi che favorisce una Posizione Anomala del Capo (PAC).",
              "Il confronto visione monoculare / binoculare: è significativo se il soggetto vede peggio con entrambi gli occhi aperti.",
              "L'astigmatismo (quadrante dell'orologio) e il suo legame con la PAC."
            ] }],
            info: [
              "Non misura i decimi di visus. Sopra la linea rossa del test la differenza è significativa da 2 linee fra OD e OS; sotto la linea rossa basta 1 linea per promuovere un adattamento del capo nelle attività visive precise.",
              "Se l'occhio che vede meglio è il non dominante, l'effetto sulla postura sembra maggiore.",
              "Quadrante dell'astigmatismo: si osserva quale gruppo di linee appare più nitido, con il capo nella PAC abituale e poi in ortoposizione imposta; se la direzione delle linee nitide cambia, astigmatismo e PAC sono collegati. L'astigmatismo non corretto può accompagnarsi a cervicalgia, lombalgia, podalgia e cefalea."
            ],
            appunti: [
              "PAC = posizione anomala del capo a occhi aperti; può essere vera o meno.",
              "Ortoposizione soggettiva vs PAC: «il tuo dritto corrisponde alla posizione dritta o sei consapevole?». Faccio chiudere gli occhi e faccio mettere la testa dritta, anche se dovesse sentire tensione o dolore.",
              "VAD: si sta a 2,70 m dal test."
            ]
          },
          {
            id: "convergenza", titolo: "Test di convergenza visuo-posturale", pag: "Physis 13",
            test: "In piedi, frontale al soggetto, lungo la linea mediana degli occhi fino alla radice del naso.",
            info: [
              "Valuta l'equilibrio tonico dei muscoli oculari e la capacità volontaria di convergenza: dice se la postura abituale disturba la binocularità e il rendimento cognitivo.",
              "Si confronta con l'occhio dominante, i cingoli scapolare e pelvico, i piedi e l'occlusione: l'ipoconvergenza favorisce adattamenti dell'ATM e una PAC.",
              "Si esegue in posizione eretta frontale, così da non far intervenire i muscoli obliqui."
            ],
            appunti: [
              "Si usa una mira con richiamo accomodativo, che riduce le variabili.",
              "Parte della risposta alla convergenza è cognitiva: devo usare uno stimolo cognitivo (deve guardare la X sulla mira).",
              "Tutti devono arrivare a convergere fino alla radice del naso."
            ]
          },
          {
            id: "foria", titolo: "Test della foria visuo-posturale", pag: "Physis 13",
            info: ["Interrompe il riflesso di fusione e porta un occhio nella posizione di riposo tonico (eteroforia). In ambito posturale descrive come l'individuo ha organizzato la relazione con l'ambiente percepito e quantifica le variazioni di tono dei muscoli oculari. Richiede meno di un minuto ed è molto affidabile."]
          },
          {
            id: "questionario", titolo: "Questionario visivo e convergenza podalica", pag: "allegati",
            liste: [
              { titolo: "Questionario per l'indagine visiva", items: [
                "Porti occhiali o lenti a contatto? Quando: sempre (anche quando mangi), lavoro/scuola, mai.",
                "Tipo di correzione: negativa (miope), positiva (ipermetrope/presbite), astigmatica.",
                "Patologie visive note (cataratta congenita, ambliopia, strabismo…).",
                "Cambiamenti visivi negli ultimi 6 mesi.",
                "Mano dominante e occhio dominante di fissazione.",
                "VAD: OD L…, OS L…, OO L…; binocularità sì/no; prova delle variabili (rotazione/inclinazione del capo)."
              ] },
              { titolo: "Test di convergenza: variabili da confrontare (OK / ipoconvergenza)", items: [
                "Rest position (denti staccati)", "Rotazione del capo dx / sx", "Inclinazione del capo dx / sx",
                "Bocca spalancata", "Lingua al palato", "Mandibola traslata", "Denti al primo contatto", "Denti serrati"
              ] }
            ],
            info: ["Il test biomeccanico di convergenza podalica si registra a destra e a sinistra insieme ai riflessi visivi."]
          }
        ]
      },
      {
        id: "generale", titolo: "Procedura generale",
        schede: [
          {
            id: "procedura-generale", titolo: "Procedura generale", sotto: "Quale procedura usare", pag: "5",
            meridiani: ["rene", "milza"],
            test: ["Pre-test: Dominanza, Convergenza, 8 Posizioni Oculari, VOR.",
                   "Format: MODO ORGANO × R 7 × MP 6 × MP 8.5"],
            passi: [
              "Eseguire tutti i pre-test: Dominanza, Convergenza, 8 Posizioni Oculari, VOR.",
              "Inserire il format MODO ORGANO × R 7 × MP 6 × MP 8.5.",
              "Testare i modi/format della tabella per sapere quale procedura usare.",
              "Seguire la procedura specifica."
            ],
            tabelle: [{ titolo: "Modo / format → procedura", col: ["Modo o format", "Procedura"], righe: [
              ["Modo dei Muscoli (polpastrello del pollice sull'unghia dell'indice)", "Procedura generale muscoli"],
              ["VG 16", "Procedura nervi cranici"],
              ["VG 20", "Procedura ossa craniche"],
              ["Modo Agopressione", "Procedura punti di agopressione"],
              ["V 1 × V 10", "Procedura dell'oculocefalogiria"],
              ["Comprimere la pianta dei piedi", "Procedura piedi"],
              ["Modo Agopressione Tocco Leggero", "Procedura dei meridiani (straordinari, divergenti, tendino muscolari)"],
              ["Modo Spirituale", "Procedura per lo Shen"],
              ["TL punta del mento", "ATM: procedura specifica"]
            ] }],
            appunti: [
              "R 7, MP 6 e MP 8.5 sono i punti dei 3 Imperatori nella nomenclatura Tung (77.28, 77.21, 77.18).",
              "V 1 × V 10 sono punti che fanno parte dello Yin Qiao Mai.",
              "Il Fegato controlla il vestibolo più che gli occhi."
            ]
          },
          {
            id: "procedura-muscoli", titolo: "Procedura generale muscoli", sotto: "Quale gruppo muscolare", pag: "6",
            test: "Modo dei Muscoli: polpastrello del pollice sull'unghia dell'indice.",
            passi: [
              "Toccare contemporaneamente entrambi i bulbi oculari e testare il M.I. Se causa un C.I. → procedura dei muscoli extraoculari.",
              "Altrimenti toccare insieme entrambi i bulbi oculari e il bordo inferiore dell'occipite. Se causa un C.I. → procedura dei muscoli suboccipitali.",
              "Altrimenti toccare insieme entrambi i bulbi oculari e un lato del collo (SCOM e Trapezio Superiore), prima un lato poi l'altro. Se causa un C.I. → procedura dello SCOM e del Trapezio Superiore.",
              "Altrimenti toccare insieme entrambi i bulbi oculari e la parte posteriore del collo. Se causa un C.I. → procedura dei muscoli secondari del collo.",
              "Se non causa un C.I.: testare ioide, ATM, altro."
            ],
            appunti: ["Si possono testare anche i muscoli di Spine (Spine Physiology), sempre toccando i bulbi oculari."]
          }
        ]
      },
      {
        id: "extraoculari", titolo: "Muscoli extraoculari",
        intro: ["Sei muscoli muovono il bulbo oculare; nascono fuori dal bulbo (nell'orbita) e si inseriscono sulla sclera. Lavorano in coppie antagoniste: retto superiore/inferiore, retto laterale/mediale, obliquo superiore/inferiore. I retti muovono l'occhio nelle quattro direzioni cardinali; gli obliqui compensano i movimenti della testa per mantenere la fissazione."],
        schede: [
          {
            id: "muscoli-extraoculari", titolo: "Procedura dei muscoli extraoculari", pag: "12-13",
            test: "Toccando entrambi i bulbi oculari si ha un C.I. (dalla procedura generale muscoli).",
            passi: [
              "Il kinesiologo muove delicatamente il bulbo oculare: lateralmente, medialmente, verso l'alto, verso il basso, intraruotando, extraruotando.",
              "Mettere in circuito il movimento che ha causato il C.I. prioritario.",
              "Controllare nella tabella quali muscoli sono coinvolti in quel movimento.",
              "Tenendo il Modo Muscolo Specifico fare la L.C. dei punti peri-oculari e testare il M.I. per trovare il muscolo da trattare.",
              "Andare alla scheda del muscolo trovato e testare i muscoli collegati della catena miofasciale e dell'ATM; mettere in circuito quelli in squilibrio.",
              { t: "Correzione — testare quale usare:", sub: [
                "VB 30 × IT 10 = Proprioception Integration Technique",
                "Modo Digitopressione = punto peri-oculare",
                "Punto Ting del MTM = riequilibrare il Meridiano Tendino Muscolare",
                "Modo Muscolo Specifico = riequilibrare i muscoli ATM o catena",
                "Modo della Coordinata: Digitopressione = punto della coordinata; Suono = diapason della coordinata; Atteggiamenti/Pensieri/Sensazioni = info emotive della coordinata"
              ] },
              "Muovere di nuovo il bulbo nella direzione che causava il C.I. e testare il M.I.",
              "Se c'è ancora un C.I. correggere gli altri muscoli coinvolti nello stesso movimento.",
              "Se non c'è più C.I. cercare altri muscoli extraoculari muovendo il bulbo nelle varie direzioni; continuare finché non ce ne sono più in squilibrio.",
              vp(),
              altre(["7 Chiavi del Qi", "Figure ad 8", "Fisiologia del Cervello", "Centralizzazione"])
            ].concat(CHIUSURA),
            tl: ["Retto Mediale = V 1", "Retto Laterale = VB 1", "Retto Inferiore = ST 1",
                 "Retto Superiore = Yuyao o Shaoming", "Obliquo Inferiore = Qiuhou", "Obliquo Superiore = V 2"],
            tabelle: [
              { titolo: "Movimento → muscoli coinvolti", col: ["Movimento", "Primario", "Secondario", "Terziario"], righe: [
                ["Lateralmente", "Retto Mediale", "Retto Inferiore", "Retto Superiore"],
                ["Medialmente", "Retto Laterale", "Obliquo Inferiore", "Obliquo Superiore"],
                ["Verso l'alto", "Retto Inferiore", "Obliquo Superiore", "—"],
                ["Verso il basso", "Retto Superiore", "Obliquo Inferiore", "—"],
                ["Intraruotando", "Obliquo Inferiore", "Retto Inferiore", "—"],
                ["Extraruotando", "Obliquo Superiore", "Retto Superiore", "—"]
              ] },
              { titolo: "Funzione, test e innervazione", col: ["Muscolo", "Funzione", "Direzione del test", "Innervazione"], righe: [
                ["Retto Laterale", "Abduzione", "Adduzione", "N. Abducente (VI) · R 27"],
                ["Retto Mediale", "Adduzione", "Abduzione", "N. Oculomotore (III) · C 1"],
                ["Retto Superiore", "Elevazione, intrarotazione, adduzione", "Abbassamento, extrarotazione, abduzione", "N. Oculomotore (III) · C 1"],
                ["Retto Inferiore", "Abbassamento, extrarotazione, adduzione", "Elevazione, intrarotazione, abduzione", "N. Oculomotore (III) · C 1"],
                ["Obliquo Superiore", "Intrarotazione, elevazione, abduzione", "Extrarotazione, abbassamento, adduzione", "N. Trocleare (IV) · IT 19"],
                ["Obliquo Inferiore", "Extrarotazione, abbassamento, abduzione", "Intrarotazione, elevazione, adduzione", "N. Oculomotore (III) · C 1"]
              ] },
              { titolo: "Coordinate dei muscoli", col: ["Muscolo", "Coordinata", "Punto coordinata", "Punto locale"], righe: [
                ["Retto Laterale", "IC/VB", "IC 3", "VB 1"], ["Retto Mediale", "F/TR", "F 6", "V 1"],
                ["Retto Superiore", "C/TR", "C 6", "Extra Yuyao / Extra Shaoming"], ["Retto Inferiore", "VG/F", "VG 20", "ST 1"],
                ["Obliquo Superiore", "C/P", "C 4", "V 2"], ["Obliquo Inferiore", "F/VB", "F 1", "Extra Qiuhou"]
              ] }
            ],
            appunti: [
              "Modo Muscolo Specifico: polpastrello del pollice sull'unghia dell'indice.",
              "Il manuale stampato riporta VB 29 × IT 10: corretto a mano in VB 30 × IT 10 (TEM o rilascio fasciale).",
              "Posso anche testare direttamente il modo del muscolo specifico."
            ]
          },
          moe("retto-superiore", "Retto Superiore", "C/TR", ["cuore", "triplice-riscaldatore"], "Yuyao & Shaoming", "C 6",
            "Posteriore / Vescica", "Frontale", "Occipitale", "Solleva, intraruota e adduce", "Grande Rotondo", "Grande Gluteo", "14-15",
            ["Origina dalla parte superiore dell'anello tendineo comune (anulus di Zinn), sopra e lateralmente al canale ottico; alcune fibre dalla guaina durale del nervo ottico. Si inserisce sulla parte superiore della sclera, circa 8,5 mm dal limbus corneale.",
             "Innervazione: nervo oculomotore (III). Sposta lo sguardo in alto e all'interno.",
             "Appartiene alla catena degli estensori (catena posteriore), che corrisponde al Meridiano Tendino Muscolare di Vescica."],
            ["Shaoming → punto Zhiyin, V 67."]),
          moe("retto-inferiore", "Retto Inferiore", "VG/F", ["vaso-governatore", "fegato"], "ST 1", "VG 20",
            "Anteriore / Stomaco", "Zigomatico", "Digastrico anteriore", "Deprime, adduce ed extraruota", "Deltoide Anteriore", "Retto Femorale", "16-17",
            ["Origina dalla parte inferiore dell'anello tendineo comune, sotto il canale ottico; si inserisce obliquamente sulla sclera circa 6,5 mm dietro il limbus.",
             "Innervazione: nervo oculomotore (III). Abbassa l'occhio, lo adduce e lo ruota all'esterno.",
             "Appartiene alla catena flessoria (catena anteriore), che corrisponde al Meridiano Tendino Muscolare di Stomaco."]),
          moe("retto-laterale", "Retto Laterale", "IC/VB", ["intestino-crasso", "vescica-biliare"], "VB 1", "IC 3",
            "Laterale / Vescica Biliare", "Temporale", "Massetere", "Abduce", "Deltoide Medio", "TFL e Medio Gluteo", "18-19",
            ["Origina dalla parte laterale dell'anello tendineo comune e dai margini della fessura orbitaria superiore (alcune fibre dall'ala maggiore dello sfenoide). Si inserisce sulla superficie laterale della sclera, 7-8 mm dietro il limbus.",
             "Abduce il bulbo oculare. Il manuale indica qui il nervo trocleare (IV), ma la tabella di funzione e il capitolo sui nervi cranici lo attribuiscono al nervo abducente (VI, R 27).",
             "Appartiene alla catena laterale, che corrisponde al Meridiano Tendino Muscolare di Vescica Biliare."]),
          moe("retto-mediale", "Retto Mediale", "F/TR", ["fegato", "triplice-riscaldatore"], "V 1", "F 6",
            "—", "Miloioideo", "Legamento nucale", "Adduce", "Coracobrachiale", "Adduttore Breve", "20-21",
            ["Origina dalla parte mediale dell'anello tendineo comune e dalla guaina durale del nervo ottico; corre lungo la parete mediale dell'orbita, sotto l'obliquo superiore. Si inserisce sulla superficie mediale della sclera, 5,5-6,5 mm dal limbus.",
             "Innervazione: nervo oculomotore (III). Adduce il bulbo oculare."]),
          moe("obliquo-superiore", "Obliquo Superiore", "C/P", ["cuore", "polmone"], "V 2", "C 4",
            "—", "Auricolare superiore", "Auricolare posteriore", "Intrarotazione, depressione e abduzione", "Infraspinato", "Piriforme", "22-23",
            ["Muscolo fusiforme che nasce dall'ala maggiore dello sfenoide, sopra il margine mediale del canale ottico; passa nella troclea (una puleggia) e si inserisce sulla parte postero-superiore e laterale del bulbo.",
             "Innervazione: nervo trocleare (IV). Per effetto della puleggia gira l'occhio in basso e all'esterno con rotazione mediale."]),
          moe("obliquo-inferiore", "Obliquo Inferiore", "F/VB", ["fegato", "vescica-biliare"], "Qiuhou", "F 1",
            "—", "Pterigoideo laterale", "Pterigoideo mediale", "Extrarotazione, elevazione e abduzione", "Sottoscapolare", "Grande Adduttore", "24-25",
            ["Unico muscolo extraoculare che non nasce dall'anulus di Zinn: origina dal mascellare, sul pavimento mediale dell'orbita sotto la fossa lacrimale. Si inserisce sulla parte postero-inferiore e laterale del bulbo.",
             "Innervazione: nervo oculomotore (III). Gira l'occhio in alto e all'esterno con rotazione laterale."])
        ]
      },
      {
        id: "suboccipitali", titolo: "Muscoli suboccipitali",
        intro: ["Quattro muscoli per lato fra occipite, atlante ed epistrofeo: retto posteriore del capo piccolo e grande, obliquo del capo superiore e inferiore. Partecipano al riflesso oculo-cervicale e all'oculocefalogiria; ogni loro disfunzione si riflette sui muscoli estrinseci dell'occhio e viceversa (es. la PAC assunta per vedere meglio). Innervati dai rami dorsali di prima e seconda cervicale, molto spessi per l'abbondanza di fusi. Bilateralmente estendono la testa; da un lato la flettono lateralmente."],
        schede: [
          {
            id: "procedura-suboccipitali", titolo: "Procedura dei muscoli suboccipitali", pag: "29",
            test: "Toccando insieme bulbi oculari e bordo inferiore dell'occipite si ha un C.I.",
            passi: [
              "Mettere in circuito i muscoli suboccipitali e i bulbi oculari, toccandoli contemporaneamente.",
              "Il kinesiologo muove delicatamente un bulbo oculare e testa il M.I.",
              "Se causa un C.I. bisogna riequilibrare i muscoli extraoculari come mezzo per sbloccare i suboccipitali → procedura dei muscoli extraoculari.",
              "Altrimenti muovere l'altro bulbo; se causa un C.I. → procedura dei muscoli extraoculari.",
              "Altrimenti testare uno alla volta i suboccipitali a destra e a sinistra tramite L.C.",
              "Mettere in circuito quello che causa il C.I. prioritario.",
              "Fare alcuni movimenti della testa per attivare il muscolo e metterlo in circuito.",
              "Palpare il muscolo per percepirne la tensione e mettere in circuito.",
              { t: "Correzione — testare quale applicare:", sub: ["Riflessi NL", "Riflessi NV", "Punto di agopressione", "Suono", "Diapason 32 Hz", "Riequilibrio delle meningi"] },
              vp(["Meridiani Straordinari", "Meridiani Tendino Muscolari (incluso il MTM di Rene)", "Meridiani Divergenti (specialmente Terra e Legno)", "Nervi Cranici", "Ossa Craniche", "Riequilibrio del Piede", "Riequilibrio dello Shen"]),
              altre(["7 Chiavi del Qi", "Figure ad 8", "Fisiologia del Cervello"].concat(CORR_ALTRE.slice(2)))
            ].concat(CHIUSURA),
            appunti: [
              "Suono: singolo o coppia (testo; se esce Ologramma sono 2).",
              "Il diapason 32 Hz ha effetto neuro-sedativo sul muscolo.",
              "Riequilibrio delle meningi: quello di Spine, ma riequilibrando i muscoli suboccipitali con i cunei sotto.",
              "Poi controllo che non ci siano altri muscoli suboccipitali, prima del punto 11."
            ]
          },
          muscolo("retto-posteriore-piccolo", "Retto posteriore del capo piccolo", "Arco posteriore dell'atlante",
            "Porzione mediale della linea nucale inferiore dell'occipite", "Estensione del capo", "Nervo suboccipitale",
            "Vitamina C, Vitamina E", "V 23 — 1,5 cun lateralmente alla linea mediana, all'altezza del margine inferiore del processo spinoso di L2",
            "30-31", ["vescica"], ["V 23 è il punto Shu dorsale del Rene."]),
          muscolo("retto-posteriore-grande", "Retto posteriore del capo grande", "Processo spinoso dell'epistrofeo",
            "Processo trasverso dell'atlante", "Movimenti fini della testa: flesso-estensione e latero-flessione", "Nervo suboccipitale",
            "Vitamina E", "V 52 — 3 cun lateralmente alla linea mediana, all'altezza del margine inferiore del processo spinoso di L2",
            "32-33", ["vescica"], ["V 52 è la «casa dello Zhi» del Rene."]),
          muscolo("obliquo-capo-superiore", "Obliquo del capo superiore", "Processo trasverso dell'atlante",
            "Occipite, fra linea nucale inferiore e superiore", "Movimenti fini della testa: flesso-estensione e latero-flessione", "Nervo suboccipitale",
            "Vitamina E", "ST 8 — all'angolo temporale della fronte, 0,5 cun dentro l'attaccatura dei capelli (si sente il temporale masticando)",
            "34-35", ["stomaco"]),
          muscolo("obliquo-capo-inferiore", "Obliquo del capo inferiore", "Processo spinoso dell'epistrofeo",
            "Processo trasverso dell'atlante", "Movimenti fini della testa; aiuta la rotazione", "Nervo suboccipitale",
            "Vitamina E", "IT 11 — nella fossa infraspinata, a un terzo fra il punto medio della spina della scapola e l'angolo inferiore; IT 13 — estremità mediale della fossa sopraspinata",
            "36-37", ["intestino-tenue"]),
          {
            id: "altri-muscoli-capo", titolo: "Altri muscoli profondi del capo", pag: "38-39",
            meridiani: ["rene", "vescica", "vaso-governatore"],
            tabelle: [{ titolo: "Muscolo → punto", col: ["Muscolo", "Punto"], righe: [
              ["Lungo del capo", "R 18"], ["Lungo del collo obliquo superiore", "V 34"],
              ["Retto anteriore del capo", "VG 21"], ["Retto laterale del capo", "V 23"]
            ] }],
            appunti: ["Per testarli uso il punto corrispondente (di correzione)."]
          },
          {
            id: "ponte-miodurale", titolo: "Retto posteriore piccolo e ponte miodurale", pag: "40-42",
            info: [
              "Il retto posteriore del capo piccolo è uno dei «piccoli muscoli» che possono portare a «grandi problemi»: si attacca anche alla dura madre spinale tramite il ponte miodurale (MDB), una rete fibrosa fra muscolatura suboccipitale e dura madre cervicale (descritto nel 1995; presente anche fra retto posteriore grande, obliquo inferiore, legamento nucale e dura).",
              "L'MDB contribuisce a controllo sensomotorio, propriocezione, stabilizzazione del midollo e circolazione del liquor. Se è troppo rilassato la dura può ripiegarsi sul midollo: congestione del liquor, irritazione delle radici, dolore cronico a collo e testa, cefalea tensiva.",
              "Suboccipitali deboli o squilibrati mandano al cervello un feedback propriocettivo confuso: vertigini, problemi di equilibrio, disturbi del movimento oculare, inclinazione della testa, difficoltà di lettura e di attenzione. Se la tensione passa alla dura attorno al cervelletto: difficoltà di coordinazione e di valutazione delle distanze.",
              "La trazione trasmessa lungo la dura fino a sacro e coccige può dare dolore al coccige o al pavimento pelvico; la fascia sotto tensione può alterare il sistema nervoso autonomo (ipertensione, cefalea, stanchezza, ansia, colon irritabile, sudorazione, visione offuscata)."
            ]
          }
        ]
      },
      {
        id: "scom-trapezio", titolo: "SCOM e Trapezio Superiore",
        schede: [
          {
            id: "procedura-scom-trapezio", titolo: "Procedura dello SCOM e del Trapezio Superiore", pag: "43",
            meridiani: ["intestino-crasso", "vescica-biliare"],
            test: "Toccando insieme bulbi oculari e un lato del collo si ha un C.I.",
            passi: [
              "Trovare la combinazione occhio + SCOM/Trapezio Superiore che causa il C.I. prioritario e metterla in circuito.",
              "Testare SCOM e Trapezio Superiore sul lato trovato e metterlo in circuito.",
              "Controllare se il muscolo è ipotonico, ipertonico o normotonico.",
              "Il kinesiologo muove delicatamente un bulbo dell'occhio trovato e testa il M.I.",
              "Se causa un C.I. → riequilibrare i muscoli extraoculari come mezzo per riequilibrare SCOM/Trapezio (procedura dei muscoli extraoculari).",
              "Altrimenti riequilibrare SCOM o Trapezio come mezzo per riequilibrare i muscoli extraoculari.",
              "Testare il M.I. mentre la persona guarda nelle 8 posizioni e contrae SCOM o Trapezio.",
              "Mettere in circuito la posizione oculare prioritaria.",
              { t: "Correzione — testare quale applicare:", sub: ["VB 30 × IT 10 (Proprioception Integration Technique)", "Riflessi NL", "Riflessi NV", "Punto di agopressione", "Suono", "Diapason 32, 64 o 128 Hz"] },
              altre(CORR_ALTRE.concat(["Centralizzazione"])),
              vp(["Meridiani Straordinari", "Meridiani Tendino Muscolari (specialmente quelli del Braccio)", "Meridiani Divergenti (specialmente Terra e Legno)", "Nervi Cranici", "Ossa Craniche", "Riequilibrio del Piede", "Riequilibrio dello Shen"])
            ].concat(CHIUSURA),
            tl: ["SCOM → IC 18", "Trapezio Superiore → VB 21"],
            appunti: ["Devo trovare se occhio dx o sx + SCOM o Trapezio: è la reattività occhio/collo."]
          },
          muscolo("trapezio-superiore", "Trapezio Superiore", "Linea nucale superiore (terzo mediale), protuberanza occipitale esterna, legamento nucale, spinoso della 7ª cervicale",
            "Acromion, terzo laterale della clavicola", "Eleva scapola e clavicola, ruota medialmente la scapola",
            "Nervo accessorio (XI), rami ventrali dei nervi spinali cervicali 2-4", "Vitamina A, complesso B, Vitamina B2 (riboflavina), Calcio",
            "ST 10 — margine anteriore dello SCOM, a un quarto fra inserzione sternale e mastoidea; V 58 — faccia postero-esterna della gamba, 7 cun sopra il malleolo laterale",
            "44-45", ["vescica-biliare"], ["Punto: VB 21."]),
          muscolo("scom", "Sternocleidomastoideo (SCOM)", "Capo sternale: manubrio dello sterno; capo clavicolare: parte mediale della clavicola",
            "Processo mastoideo del temporale, metà laterale della linea nucale superiore", "Unilaterale: flette lateralmente il collo e ruota la testa dal lato opposto. Bilaterale: flette il collo, porta avanti la testa ed eleva il mento, solleva lo sterno nell'inspirazione profonda",
            "Parte spinale del nervo accessorio", "Vitamina B6, complesso B, Vitamina B3 (niacina), Iodio",
            "ST 10 (come sopra); PC 2 — fra i due capi del bicipite, 2 cun sotto la piega ascellare",
            "46-47", ["intestino-crasso"], ["Punto: IC 18."])
        ]
      },
      {
        id: "collo", titolo: "Muscoli secondari del collo",
        schede: [
          {
            id: "procedura-collo", titolo: "Procedura dei muscoli secondari del collo", pag: "48-49",
            test: "Toccando insieme bulbi oculari e parte posteriore del collo si ha un C.I.",
            passi: [
              "Mettere in circuito la L.C. di entrambi i bulbi oculari e della parte posteriore del collo.",
              "Trovare la combinazione occhio + collo che causa il C.I. prioritario e metterla in circuito.",
              "Muovere il collo in varie direzioni, toccandolo, e testare il M.I.",
              "Controllare se il M.I. è ipotonico, ipertonico o normotonico.",
              "Il kinesiologo muove delicatamente un bulbo dell'occhio trovato e testa il M.I.",
              "Se causa un C.I. → riequilibrare i muscoli extraoculari come mezzo per riequilibrare i muscoli del collo.",
              "Altrimenti riequilibrare i muscoli secondari del collo come mezzo per riequilibrare gli extraoculari.",
              "Fare la L.C. di tutti i muscoli del collo delle tabelle e mettere in circuito quello prioritario.",
              "Testarlo direttamente (se possibile) e metterlo in circuito.",
              "Correggere il muscolo con il suo punto di digitopressione (tabelle).",
              "Proseguire con K~Physis Structural 1 e 2 (Spine Physiology, Connectiv#Ology), se si conoscono.",
              { t: "Testare quali altre correzioni applicare:", sub: ["VB 30 × IT 10 (Proprioception Integration Technique)", "Riflessi NL e NV (se si conoscono)", "Suono o diapason 32, 64 o 128 Hz"] },
              altre(), vp(["Meridiani Straordinari", "Meridiani Tendino Muscolari (specialmente quelli del Braccio)", "Meridiani Divergenti (specialmente Terra e Legno)", "Nervi Cranici", "Ossa Craniche", "Riequilibrio del Piede", "Riequilibrio dello Shen"])
            ].concat(CHIUSURA),
            tabelle: [
              { titolo: "Posteriori — coppia di test + punto di correzione", col: ["Muscolo", "Coppia di punti", "Punto"], righe: [
                ["Lunghissimo del capo", "R 6 + P 7", "TR 3,2"], ["Splenio cervicale", "PC 6 + P 7", "VG 18,1"],
                ["Elevatore della scapola", "V 62 + PC 6", "IC 13,5 – IC 14,7"], ["Lunghissimo cervicale", "VB 41 + TR 5", "IT 12,25"],
                ["Spinale del capo", "IT 3 + TR 5", "TR 13,2"], ["Semispinale cervicale", "R 6 + IT 3", "VB 1,1"],
                ["Semispinale del capo", "P 7 + TR 5", "R 8,7"], ["Splenio del capo", "MP 4 + TR 5", "VB 34,1"],
                ["Rotatori cervicali", "PC 6 + TR 5", "ST 9"], ["Multifido cervicale", "IT 3 × M 4", "M 11,9"]
              ] },
              { titolo: "Anteriori — coppia di test + punto di correzione", col: ["Muscolo", "Coppia di punti", "Punto"], righe: [
                ["Lungo del collo obliquo inferiore", "V 62 + P 7", "V 33"], ["Lungo del collo longitudinale", "PC 6 + IT 3", "VB 27,3"],
                ["Scaleno mediale", "IT 3 + P 7", "PC 9"], ["Scaleno anteriore", "R 6 + PC 6", "MP 10"],
                ["Scaleno posteriore", "V 62 + VB 41", "TR 12,25"]
              ] }
            ],
            appunti: ["Per testarli posso fare la L.C. sul ventre del muscolo o la coppia di punti coordinata."]
          }
        ]
      },
      {
        id: "nervi", titolo: "Nervi cranici",
        intro: ["Ben 9 nervi cranici su 12 sono collegati al sistema visivo: per questo va sempre valutato nelle disfunzioni posturali. Ci sono anche collegamenti indiretti: l'VIII nella funzione uditiva orienta il movimento saccadico verso l'origine del suono."],
        schede: [
          {
            id: "procedura-nervi", titolo: "Procedura nervi cranici", pag: "54-55",
            test: "VG 16 causa un C.I. (procedura generale).",
            passi: [
              "Mettere in circuito VG 16.",
              "Testare i Punti d'Allarme e trovare quello prioritario.",
              "Controllare nella tabella quale nervo cranico è coinvolto.",
              "Leggere il testo del nervo prioritario e mettere in circuito.",
              "Guardare l'immagine del nervo e mettere in circuito.",
              "Se possibile attivare la funzione del nervo e mettere in circuito.",
              { t: "Correzione:", sub: [
                "Modo Agopressione: corregge tramite il punto di agopressione del nervo.",
                "Modo del Suono: corregge tramite i diapason.",
                "Modo Ologramma: tutte le correzioni collegate alla coordinata del nervo."
              ] },
              altre(CORR_ALTRE.slice(0, 4)),
              vp(["Meridiani Straordinari", "Meridiani Tendino Muscolari", "Meridiani Divergenti", "Nervi Cranici", "Ossa Craniche", "Riequilibrio del Piede", "Riequilibrio dello Shen"])
            ].concat(CHIUSURA),
            tabelle: [{ titolo: "Punto d'Allarme → nervo cranico", col: ["Punto d'Allarme", "Nervo cranico"], righe: [
              ["Milza", "II — Ottico"], ["Cuore", "III — Oculomotore"], ["Intestino Tenue", "IV — Trocleare"],
              ["Vescica", "V — Trigemino"], ["Rene", "VI — Abducente"], ["Pericardio", "VII — Facciale"],
              ["Triplice Riscaldatore", "VIII — Vestibolare"], ["Fegato", "X — Vago"], ["Polmone", "XI — Accessorio"],
              ["Stomaco, Vescica Biliare, Intestino Crasso", "—"]
            ] }],
            appunti: ["Restano fuori dalla tabella: I olfattivo, IX glossofaringeo, XII ipoglosso.", "Il punto indicato in ogni scheda è il punto di riequilibrio del nervo."]
          },
          nervo("ii-ottico", "Milza", "II nervo cranico — Ottico", "MP 21", "MP/VG", "56", ["milza"],
            "Conduce la ricezione del mondo esterno alla corteccia occipitale, passando per i corpi genicolati laterali (talamo) e i collicoli superiori per la coordinazione testa-occhi."),
          nervo("iii-oculomotore", "Cuore", "III nervo cranico — Oculomotore", "C 1", "C/VG", "56", ["cuore"],
            "Muove l'occhio nelle posizioni dei muscoli che innerva: retto mediale, retto inferiore, retto superiore, obliquo inferiore ed elevatore della palpebra. Porta anche fibre parasimpatiche per accomodazione e diaframma pupillare."),
          nervo("iv-trocleare", "Intestino Tenue", "IV nervo cranico — Trocleare", "IT 19", "IT/VG", "57", ["intestino-tenue"],
            "Nervo motore dell'obliquo superiore: fa guardare in basso e verso il naso. È uno dei motivi per cui la convergenza con lo sguardo abbassato è così precisa."),
          nervo("v-trigemino", "Vescica", "V nervo cranico — Trigemino", "V 1", "V/VG", "57", ["vescica"],
            "Conduce dolore e propriocezione dei muscoli extraoculari attraverso lo stesso nucleo della propriocezione dell'apparato masticatorio: uno dei collegamenti più importanti fra occhi e bocca."),
          nervo("vi-abducente", "Rene", "VI nervo cranico — Abducente", "R 27", "R/VG", "58", ["rene"],
            "Innerva il retto laterale (abduzione) e aiuta a stabilizzare la visione durante le rotazioni orizzontali del capo, su stimolo vestibolare."),
          nervo("vii-facciale", "Pericardio", "VII nervo cranico — Facciale", "PC 1", "PC/VG", "58", ["maestro-cuore"],
            "Innerva l'orbicolare dell'occhio: chiusura e modulazione dell'apertura nelle espressioni facciali (comunicazione non verbale)."),
          nervo("viii-vestibolare", "Triplice Riscaldatore", "VIII nervo cranico — Vestibolare", "TR 23", "TR/VG", "59", ["triplice-riscaldatore"],
            "È legato al riflesso vestibolo-oculare (VOR), che tiene l'oggetto di interesse fermo sulla fovea mentre la testa si muove."),
          nervo("x-vago", "Fegato", "X nervo cranico — Vago", "F 14", "F", "59", ["fegato"],
            "Partecipa, con le fibre del III, alla gestione delle funzioni riflesse dell'occhio."),
          nervo("xi-accessorio", "Polmone", "XI nervo cranico — Accessorio", "P 1", "P/VG", "60", ["polmone"],
            "Innerva SCOM e Trapezio Superiore; tramite l'oculocefalogiria coordina occhi, rachide cervicale alto e funzione vestibolare. L'occhio è il principale organo sensoriale del Sistema Tonico Posturale e la principale sorgente della sensazione cinestesica.")
        ]
      },
      {
        id: "ossa", titolo: "Ossa craniche",
        schede: [
          {
            id: "procedura-ossa", titolo: "Procedura ossa craniche", pag: "62",
            test: "VG 20 causa un C.I. (procedura generale).",
            passi: [
              "Mettere in circuito VG 20.",
              "Testare i punti chiave della tabella per identificare l'osso cranico da trattare.",
              "Se nessun punto chiave causa un C.I. testare se eseguire l'allargamento o il restringimento dell'orbita.",
              "Correzione: eseguire la manovra cranio-sacrale specifica.",
              "Testare il Modo del Suono per vedere se servono i diapason.",
              "Controllare se correggere le membrane a tensione reciproca o le meningi (K~Physis Structural 1 — Spine Physiology).",
              altre(CORR_ALTRE.slice(0, 4)),
              vp(["Meridiani Straordinari", "Meridiani Tendino Muscolari", "Meridiani Divergenti", "Nervi Cranici", "Ossa Craniche", "Riequilibrio del Piede", "Riequilibrio dello Shen"])
            ].concat(CHIUSURA),
            tabelle: [{ titolo: "Punto chiave → osso", col: ["Punto chiave", "Osso cranico"], righe: [
              ["V 62", "Lacrimale"], ["VB 41", "Sfenoide"], ["TR 5", "Zigomatico"],
              ["MP 4", "Mascellare"], ["PC 6", "Etmoide"], ["R 6", "Frontale"]
            ] }],
            appunti: [
              "Posso vedere se devo trattare le membrane a tensione reciproca (Spine), le meningi, i 6 meridiani tendino muscolari yang (5 Pilastri) o i meridiani straordinari (Basi della Vita).",
              "Testare eventualmente anche il temporale, perché è molto spesso implicato."
            ]
          },
          osso("lacrimale", "V 62", "Osso lacrimale", "63", ["vescica"],
            "Ripristinare il rapporto del lacrimale fra etmoide e processo frontale del mascellare: importante per il drenaggio del canale lacrimale.",
            "Supino, comodo e rilassato.", "Seduto accanto al lettino, alla testa del paziente.",
            ["Mano cefalica sullo sfenoide: pollice e indice a pinza sopra il frontale senza bloccarlo, falangi distali sulle grandi ali.",
             "Pollice della mano caudale, leggermente piegato, sulla parte accessibile del lacrimale."],
            ["Espansione: la mano cefalica porta lo sfenoide in flessione mentre il pollice caudale spinge il lacrimale in avanti e appena lateralmente.",
             "Rilassamento: movimento inverso. Ripetere fino al rilascio."],
            "Serve un contatto preciso; evitare di premere sulla puleggia dell'obliquo superiore, davanti e sopra l'occhio."),
          osso("sfenoide", "VB 41", "Sfenoide", "64", ["vescica-biliare"],
            "Ripristinare la libertà funzionale fra sfenoide e occipite.",
            "Supino, comodo e rilassato.", "Seduto alla testa del paziente, lettino basso così che la testa sia all'altezza delle mani.",
            ["Mano cefalica che culla l'occipite dal lambda all'inion.",
             "Mano caudale sullo sfenoide: pinza pollice-indice verso il frontale senza contatto, falangi distali sulle grandi ali, mignolo in bocca sul processo pterigoideo."],
            ["Espansione: la mano cefalica porta l'occipite in flessione; la caudale posiziona lo sfenoide sui tre assi fino al punto di equilibrio della sincondrosi.",
             "Mantenere la tensione bilanciata fino al rilascio."],
            "Controllo eccellente dello sfenoide, ma richiede molta precisione della mano cefalica."),
          osso("zigomatico", "TR 5", "Zigomatico", "65", ["triplice-riscaldatore"],
            "Ristabilire la libertà dello zigomo in rotazione esterna e interna.",
            "Supino, comodo e rilassato.", "Seduto alla testa del paziente, avambracci appoggiati al lettino, la testa fra le mani.",
            ["Indici sugli zigomi appena sotto il bordo orbitale.", "Falangi distali dei medi sul bordo inferiore degli zigomi."],
            ["Espansione: i palmi seguono la rotazione esterna; gli indici accompagnano la rotazione esterna del bordo orbitale, i medi spingono in basso e medialmente.",
             "Rilassamento: movimento inverso; mantenere il punto di tensione bilanciata fino al rilascio.",
             "Si può fare da un solo lato: l'altra mano sul frontale aiuta il rilascio della sutura fronto-zigomatica."],
            "Non basta per trattare un'occlusione dello zigomo."),
          osso("mascellare", "MP 4", "Mascellare", "66", ["milza"],
            "Ripristinare la libertà di entrambi i mascellari in rotazione esterna e interna.",
            "Supino, comodo e rilassato.", "Seduto alla testa del paziente, avambracci appoggiati al lettino.",
            ["Mani ai lati della testa, pollici sugli zigomi.", "Indici (ed eventualmente altre dita) uncinati sotto i processi palatini dei mascellari."],
            ["Espansione: i pollici seguono gli zigomi mentre le dita uncinate separano orizzontalmente i mascellari.",
             "Rilassamento: ritorno alla posizione neutra. Ripetere fino al rilascio."],
            "Leve potenti: serve moderazione. Gengive in cattive condizioni o placche dentali possono impedirla."),
          osso("etmoide", "PC 6", "Etmoide", "67", ["maestro-cuore"],
            "Azione di pompaggio che fa drenare le secrezioni stagnanti del seno etmoidale.",
            "Supino, comodo e rilassato.", "Seduto verso la testa del paziente, dal lato opposto alla lesione.",
            ["Mano cefalica: palmo sul frontale, pollice dietro il processo orbitale esterno, anulare e mignolo fissano lo zigomo, medio sul mascellare, indice sul processo frontale del mascellare.",
             "Indice della mano caudale sulla sutura crociata del palato."],
            ["Espansione: la mano cefalica porta frontale, zigomo e mascellare in rotazione esterna mentre l'indice in bocca spinge il palato verso l'alto e in avanti, verso la radice del naso.",
             "Rilassamento: movimento opposto. Ripetere più volte fino al rilascio."],
            "La congestione del seno etmoidale ha spesso una causa altrove: una volta ventilato il seno, rilasciare la lesione primaria."),
          osso("frontale", "R 6", "Frontale", "68", ["rene"],
            "Lasciare al frontale il suo movimento nella fase di rilassamento e liberare la parte bassa della sutura coronale.",
            "Supino, comodo e rilassato.", "Seduto alla testa del paziente, busto leggermente in avanti.",
            ["Dita intrecciate sopra la sutura metopica.", "Eminenze ipotenar sugli angoli laterali del frontale, il palmo davanti alla sutura coronale."],
            ["Nel rilassamento le dita intrecciate premono dolcemente fra loro: pressione mediale sulle eminenze frontali.",
             "Poi sollevare il frontale in avanti, da un lato o da entrambi secondo la diagnosi; nella lesione unilaterale aggiungere una rotazione verso il lato opposto."],
            "A volte va preceduta dalla riduzione della lesione nella superficie a L fra frontale e grande ala dello sfenoide."),
          osso("allargamento-orbita", "nessun punto chiave", "Allargamento dell'orbita", "69", [],
            "Riportare la cavità orbitaria alla giusta dimensione quando è troppo stretta.",
            "Supino, comodo e rilassato.", "Seduto verso la testa del paziente, dal lato opposto alla lesione.",
            ["Mano cefalica: pollice sul margine orbitale del frontale, indice dietro l'articolazione fronto-zigomatica.",
             "Mano caudale: indice sul bordo superiore dello zigomo, medio sul bordo inferiore, pollice sul margine orbitale del mascellare."],
            ["Espansione: il pollice cefalico porta in alto il margine orbitale del frontale mentre l'indice spinge in avanti la fronto-zigomatica.",
             "Insieme: l'indice caudale ruota all'esterno il bordo orbitale dello zigomo, il medio spinge in basso e medialmente, il pollice porta in basso il bordo orbitale del mascellare.",
             "Rilassamento: le dita resistono dolcemente al ritorno. Ripetere fino al rilascio."],
            "Facile, ma richiede un coordinamento preciso di tutte le dita."),
          osso("restringimento-orbita", "nessun punto chiave", "Restringimento dell'orbita", "70", [],
            "Riportare la cavità orbitaria alla giusta dimensione quando è troppo larga.",
            "Supino, comodo e rilassato.", "Seduto alla testa del paziente, dal lato opposto alla lesione.",
            ["Pollice della mano cefalica sul margine orbitale del frontale.",
             "Mano caudale: indice davanti alla fronto-zigomatica, medio sul margine inferiore dello zigomo, pollice sul margine orbitale del mascellare."],
            ["Rilassamento: il pollice frontale spinge verso il centro dell'orbita; l'indice caudale chiude l'angolo fronto-zigomatico, il medio accentua la rotazione interna dello zigomo, il pollice spinge il margine orbitale inferiore verso il centro.",
             "Espansione: le dita resistono dolcemente al ritorno. Ripetere fino al rilascio.",
             "Variante: seduti dal lato della lesione, indice cefalico sul margine orbitale del frontale e pollice sulla fronto-zigomatica."],
            "Facile, ma richiede un coordinamento preciso di tutte le dita.")
        ]
      },
      {
        id: "agopressione", titolo: "Punti di agopressione",
        schede: [
          {
            id: "procedura-agopressione", titolo: "Procedura punti di agopressione", pag: "72-73",
            test: "Modo Agopressione causa un C.I. (procedura generale).",
            passi: [
              "Mettere tutte e 5 le dita attorno all'occhio.",
              "Se causa un C.I. testare i punti peri-oculari.",
              "Testare i Punti d'Allarme di: Vaso Governatore, Stomaco, Cuore, Intestino Tenue, Vescica, Rene, Pericardio, Triplice Riscaldatore, Vescica Biliare, Fegato, Intestino Crasso.",
              "Nella tabella del meridiano trovato testare tutti i punti specifici.",
              "Correzione: stimolare tutti i punti trovati.",
              "Ritestare i Punti d'Allarme e correggere finché non ci sono più punti da stimolare.",
              { t: "I punti si stimolano con:", sub: ["Digitopressione", "Luci colorate", "Suono", "Diapason 32, 64 o 128 Hz", "Magneti"] },
              altre(), vp(["Meridiani Straordinari", "Meridiani Tendino Muscolari", "Meridiani Divergenti", "Nervi Cranici", "Ossa Craniche", "Riequilibrio del Piede", "Riequilibrio dello Shen"])
            ].concat(CHIUSURA),
            tabelle: [{ titolo: "I punti che agiscono sull'occhio, per meridiano", col: ["Meridiano", "Punti"], righe: [
              ["Vaso Governatore", "VG 16, VG 17, VG 20, VG 23, VG 24"],
              ["Stomaco", "ST 1, ST 2, ST 8"],
              ["Cuore", "C 7, C 9"],
              ["Intestino Tenue", "IT 1, IT 2, IT 3, IT 6"],
              ["Vescica", "V 1, V 2, V 3, V 4, V 6, V 7, V 8, V 9, V 10, V 18, V 23, V 62, V 64, V 65, V 66, V 67"],
              ["Rene", "R 1, R 11, R 12, R 21"],
              ["Pericardio", "PC 8, PC 9"],
              ["Triplice Riscaldatore", "TR 3, TR 16, TR 23"],
              ["Vescica Biliare", "VB 1, VB 4, VB 5, VB 6, VB 7, VB 8, VB 11, VB 14, VB 15, VB 16, VB 19, VB 20, VB 37, VB 41, VB 43"],
              ["Fegato", "F 2, F 3"],
              ["Intestino Crasso", "IC 4, IC 5, IC 14, IC 20"]
            ] }]
          }
        ]
      },
      {
        id: "ocg", titolo: "Oculocefalogiria (OCG)",
        intro: ["L'oculocefalogiria è la via che integra occhi, collo e vestibolo: tiene stabile la scena visiva mentre il corpo si muove. Ogni struttura della via ha un punto indicatore."],
        schede: [
          {
            id: "procedura-ocg", titolo: "Procedura dell'oculocefalogiria", pag: "85",
            meridiani: ["vescica"],
            test: "V 1 × V 10 causa un C.I. (procedura generale).",
            passi: [
              "Mettere in circuito V 1 × V 10.",
              "Fare osservare immagini statiche e in movimento.",
              "Testare il Modo dei Muscoli: se causa un C.I. muovere delicatamente il bulbo nelle varie direzioni fino a trovare il muscolo prioritario, attivarlo e metterlo in circuito; altrimenti proseguire.",
              "Testare tutti i punti indicatori delle strutture dell'OCG (tabella).",
              "Mettere in circuito tutti i punti che causano un C.I.",
              "Leggere il testo di ogni struttura trovata e mettere in circuito.",
              "Attivare, se possibile, la struttura e mettere in circuito.",
              "Correzione: testare R 6 e V 62. Se uno dei due causa un C.I. riequilibrare il relativo meridiano straordinario (Yin Qiao Mai o Yang Qiao Mai).",
              { t: "Altrimenti trovare un'altra correzione:", sub: ["Meridiano Straordinario", "Meridiano Tendino Muscolare (specialmente i 3 Yang del Braccio)", "Meridiano Divergente (specialmente Terra e Legno)"] },
              altre(["7 Chiavi del Qi", "Figure ad 8", "Fisiologia del Cervello", "Coordinate (specialmente gli aspetti emotivi)"]),
              "Continuare a correggere finché non si mostrano più tecniche.",
              vp()
            ].concat(CHIUSURA),
            tabelle: [{ titolo: "Strutture dell'OCG → punto indicatore", col: ["Struttura", "Punto"], righe: [
              ["SEF — Supplementary Eye Field", "VB 18"], ["FEF — Front Eye Field", "VB 15"], ["PEF — Parietal Eye Field", "V 7"],
              ["Area 7 di Brodmann", "V 8"], ["MT — Middle Temporal", "VB 9"], ["MST — Medial Superior Temporal", "VB 10"],
              ["Area visiva primaria V⁠1", "V 9"], ["Area visiva secondaria V⁠2", "VG 18"], ["Area visiva terziaria V⁠3", "VG 19"],
              ["RiFLM — nucleo interstiziale rostrale del FLM", "VB 6"], ["INC — nucleo interstiziale di Cajal", "TR 22"],
              ["CS — collicoli superiori", "TR 19"], ["Retina", "V 1"],
              ["III — nuclei dell'oculomotore", "P.A. Cuore"], ["IV — nucleo del trocleare", "P.A. Intestino Tenue"],
              ["VI — nucleo dell'abducente", "P.A. Rene"], ["VIII — nuclei vestibolari", "P.A. Triplice Riscaldatore"],
              ["XI — nucleo dell'accessorio", "P.A. Polmone"], ["Cervelletto", "VG 16"], ["FLM — fascicolo longitudinale mediale", "TR 18"],
              ["FRM — formazione reticolare mesencefalica", "VB 8 tocco leggero"], ["FRP — formazione reticolare pontina", "VB 8 tocco profondo"],
              ["TS — via tetto-spinale", "TR 16"], ["vsl — tratto vestibolo-spinale laterale", "TR 17"],
              ["Mielomeri cervicali", "IT 3"], ["Mielomeri lombari", "V 40"], ["SCOM", "IC 18"], ["Trapezio Superiore", "VB 21"],
              ["Coclea — orecchio interno", "VB 2 × R 27"]
            ] }],
            appunti: [
              "Tengo la testa ferma e muovo l'immagine, poi tengo fermo l'oggetto e faccio muovere la testa. Meglio farlo in piedi.",
              "Al punto 3 vado a vedere e testare tutti i muscoli, ma li metto solo in circuito e non li correggo.",
              "Meridiani straordinari da testare: Du Mai, Ren Mai, Yin Qiao Mai, Yang Wei Mai, Dai Mai — convergono sul frontale e rappresentano il desiderio mentale di voler prendere la cosa che desidero: coordinazione oculo-manuale.",
              "Nelle pagine illustrate l'INC compare anche con VB 10 e l'MST con VB 7 o VB 9: la tabella riassuntiva dice TR 22 e VB 10."
            ]
          },
          ocg("sef", "SEF", "Campi visivi supplementari", "VB 18", "91",
            ["Regioni del lobo frontale coinvolte nel controllo dei movimenti saccadici, insieme a FEF (VB 15), solco intraparietale e collicolo superiore (TR 19).",
             "Non avviano direttamente la saccade: la migliorano usando la conoscenza preliminare del compito, bilanciano mantenimento e spostamento dello sguardo e ritardano la saccade quando serve. Se il FEF è il guidatore, il SEF è il passeggero che consiglia. Codificano anche l'errore di previsione della ricompensa."]),
          ocg("fef", "FEF", "Campi oculari frontali", "VB 15", "92",
            ["Area 8 di Brodmann: responsabile delle saccadi volontarie, della consapevolezza del campo visivo e dell'attenzione visiva. Comunica con i muscoli extraoculari tramite la formazione reticolare pontina (VB 8).",
             "Una sua lesione devia gli occhi verso il lato della lesione. Si attiva già 45 ms dopo uno stimolo visivo."]),
          ocg("pef", "PEF", "Campo oculare parietale", "V 7", "92",
            ["Aree 39 e 40 di Brodmann: integra i vettori spaziali e facilita l'esplorazione visiva riflessa (il FEF è più legato a quella intenzionale). Coinvolto nel disimpegno dalla fissazione e nell'innesco delle saccadi riflesse."]),
          ocg("area-7", "Area 7", "Area 7 di Brodmann", "V 8", "93",
            ["Corteccia parietale: localizza gli oggetti nello spazio e fa convergere visione e propriocezione; ha un ruolo nella coordinazione visuo-motoria (raggiungere e afferrare) e, con l'area 5, nel linguaggio."]),
          ocg("v1", "V⁠1", "Area visiva primaria", "V 9", "93-94",
            ["Area 17 di Brodmann, al polo posteriore del lobo occipitale: la più semplice e antica. Riceve dal nucleo genicolato laterale e ha una mappa precisissima del campo visivo; codifica soprattutto i bordi (contrasto locale).",
             "Potrebbe creare una mappa di salienza che guida gli spostamenti dello sguardo; i suoi output vanno anche al collicolo superiore."]),
          ocg("v2", "V⁠2", "Area visiva secondaria", "VG 18", "94-95",
            ["Corteccia prestriata: riceve da V⁠1 e proietta a V⁠3, V⁠4, V⁠5. Sintonizzata su orientamento, frequenza spaziale, dimensione, colore e forma; importante per la memoria di riconoscimento degli oggetti e il passaggio dalla memoria a breve a quella a lungo termine."]),
          ocg("v3", "V⁠3", "Area visiva terziaria", "VG 19", "95",
            ["Davanti a V⁠2. La parte dorsale appartiene al flusso dorsale e potrebbe elaborare il movimento globale; quella ventrale è più collegata alla corteccia temporale inferiore."]),
          ocg("mt", "MT", "Area visiva temporale media", "VB 9", "96",
            ["Detta anche V⁠5: alta concentrazione di neuroni selettivi per la direzione. Integra i segnali di movimento locali nel movimento globale e guida alcuni movimenti oculari; una sua lesione dà deficit nella percezione del movimento."]),
          ocg("mst", "MST", "Area mediale superiore temporale", "VB 10", "96",
            ["Riceve da MT e mette insieme il movimento coerente di tutta la scena per rilevare il flusso ottico."]),
          ocg("riflm", "RiFLM", "Nucleo interstiziale rostrale del FLM", "VB 6", "97",
            ["Centro dello sguardo verticale. Collega i nuclei di III (P.A. Cuore), IV (P.A. Intestino Tenue) e VI (P.A. Rene) e integra i comandi dei centri dello sguardo (FEF) con le informazioni sul movimento della testa (VIII, P.A. Triplice Riscaldatore).",
             "Nello sguardo orizzontale coordina l'abduzione di un occhio con l'adduzione dell'altro."]),
          ocg("flm", "FLM", "Fascicolo longitudinale mediale", "TR 18", "97-100",
            ["Mette d'accordo i nuclei dei nervi oculomotori: per guardare a destra attiva retto laterale destro e retto mediale sinistro e inibisce i loro antagonisti.",
             "Nel mesencefalo (nucleo di Cajal) coordina III (C 1) e IV (IT 19) per le saccadi verticali; nel ponte coordina VI (R 27) e III per quelle orizzontali. Integra le informazioni del nervo vestibolococleare (TR 23). Le sue lesioni possono dare nistagmo e diplopia."]),
          ocg("inc", "INC", "Nucleo interstiziale di Cajal", "TR 22", "101",
            ["Dentro il fascicolo longitudinale mediale: mantiene controllo oculomotorio, postura della testa e movimento verticale degli occhi, trasformando i segnali di velocità dello sguardo in segnali di posizione."]),
          ocg("collicoli", "CS", "Collicoli superiori", "TR 19", "98",
            ["Nel tetto del tronco encefalico, attorno alla pineale: ricevono dalla retina e da altri sensi e orientano occhi e testa verso stimoli visivi e uditivi (saccadi). Proiettano anche al pulvinar, che aiuta a mantenere stabile l'ambiente visivo."]),
          ocg("retina", "Retina", "Retina", "V 1", "98",
            ["Capta la luce e la trasforma in segnali nervosi (fototrasduzione) attraverso tre strati: fotorecettori, cellule bipolari/orizzontali/amacrine, cellule gangliari, i cui assoni formano il nervo ottico."]),
          ocg("cervelletto", "C", "Cervelletto", "VG 16", "99",
            ["Contiene più della metà dei neuroni del cervello in un decimo del volume. Non genera il movimento ma lo coordina: integra informazioni sensoriali, vestibolari e propriocettive per postura, equilibrio, parola e apprendimento motorio; ha anche funzioni cognitive."]),
          ocg("formazione-reticolare", "FRM / FRP", "Formazione reticolare", "VB 8", "100-101",
            ["Più di 100 piccole reti neurali: tono, equilibrio e postura (vie reticolospinali), centri dello sguardo, controllo cardiovascolare, modulazione del dolore, sonno e vigilanza, abituazione agli stimoli ripetitivi.",
             "Mesencefalica (FRM) = VB 8 a tocco leggero; pontina (FRP) = VB 8 a tocco profondo."]),
          ocg("tetto-spinale", "TS", "Via tetto-spinale", "TR 16", "100",
            ["Parte dai collicoli superiori e coordina i movimenti di capo e collo con quelli oculari, così che l'immagine cada sempre sulla fovea."]),
          ocg("vestibolo-spinale", "vsl", "Tratto vestibolo-spinale laterale", "TR 17", "101",
            ["Dai nuclei vestibolari fino alla regione lombare: mantiene la postura eretta stimolando gli estensori delle gambe e i muscoli del tronco; riceve input dal cervelletto."]),
          ocg("coclea", "Coclea", "Coclea — orecchio interno", "VB 2 × R 27", "101",
            ["Struttura a spirale dell'orecchio interno (circa 35 mm srotolata). Il sistema vestibolare rileva il movimento della testa rispetto al corpo per postura ed equilibrio; quando non funziona compaiono nausea e vertigini."]),
          {
            id: "ocg-midollo-collo", titolo: "Mielomeri, SCOM e Trapezio nell'OCG", pag: "90",
            tabelle: [{ col: ["Struttura", "Punto"], righe: [
              ["Mielomeri cervicali", "IT 3"], ["Mielomeri lombari", "V 40"], ["SCOM", "IC 18"], ["Trapezio Superiore", "VB 21"]
            ] }]
          }
        ]
      },
      {
        id: "piede", titolo: "Il piede",
        schede: [
          {
            id: "piede-info", titolo: "Il piede e la postura", pag: "103-104",
            info: [
              "Piede e occhio sono le due entrate più importanti del sistema posturale. Organo antigravitazionale inserito nelle catene miofasciali, il piede modula il tono muscolare; fondamentale l'articolazione sotto-astragalica.",
              "Ha tante articolazioni per appoggiare correttamente la pianta su qualunque terreno e per fare da ammortizzatore, assorbendo e restituendo le sollecitazioni.",
              "Squilibri acquisiti: scarpe inadeguate, cammino precoce, distorsioni di caviglia (soprattutto coppia cuboide/scafoide). Iatrogeni: solette con grossi rilievi e scarpe con volta sostenuta — i propriocettori percepiscono differenze di pochi grammi e gli esterocettori di centesimi di millimetro.",
              "Il piede adattativo è il tampone terminale che si deforma per riarmonizzare la postura: se è reversibile basta correggere la causa primaria; dopo dieci mesi-un anno le deformazioni si fissano e la correzione del piede diventa indispensabile."
            ]
          },
          {
            id: "procedura-piedi", titolo: "Procedura piedi", pag: "105-106",
            meridiani: ["vescica", "vescica-biliare", "stomaco", "fegato", "milza", "rene"],
            test: "Comprimere la pianta del piede destro e poi del sinistro.",
            passi: [
              "Comprimere la pianta del piede destro e poi del sinistro; mettere in circuito il piede che causa il C.I. prioritario.",
              "Testare sul lato del piede prioritario: soleo, gastrocnemio, tibiale posteriore, tibiale anteriore, peronieri, flessore lungo dell'alluce, estensore lungo dell'alluce, flessore lungo delle dita, estensore lungo delle dita.",
              "Controllare se sono in ipertono e mettere in circuito tutti quelli in squilibrio.",
              "Fare la L.C. di tutti i muscoli della pianta e del dorso del piede prioritario e mettere in circuito quello prioritario.",
              { t: "Correzione — P.I.T. (Tecnica di Integrazione Propriocettiva):", sub: ["Estensione dell'alluce", "Estensione delle dita", "Flessione dell'alluce", "Flessione delle dita", "Abduzione di alluce e dita", "Adduzione di alluce e dita"] },
              { t: "Testare se sul muscolo della pianta o del dorso serve:", sub: ["Rilascio fasciale", "Massaggio profondo", "Suono", "Colore", "Diapason 32 Hz", "Magneti"] },
              "Testare i punti distali dei meridiani Vescica, Vescica Biliare, Stomaco, Fegato, Milza, Rene.",
              "Testare tutti i punti dalle dita al ginocchio del meridiano trovato e trattare quelli che causano un C.I.",
              "Testare se riequilibrare il Meridiano Tendino Muscolare di Vescica, Vescica Biliare, Stomaco, Fegato, Milza o Rene, e con quale tecnica (K~Physis Structural 2 — Connectiv#Ology).",
              altre(CORR_ALTRE.slice(0, 4)),
              vp(["Meridiani Straordinari", "Meridiani Tendino Muscolari", "Meridiani Divergenti", "Nervi Cranici", "Ossa Craniche", "Riequilibrio del Piede", "Riequilibrio dello Shen"]),
              "Ritestare tutti i muscoli in squilibrio trovati all'inizio."
            ].concat(CHIUSURA),
            liste: [{ titolo: "Muscoli della pianta e del dorso del piede", items: [
              "Lombricali", "Interossei plantari", "Interossei dorsali", "Flessore breve delle dita", "Flessore breve dell'alluce",
              "Estensore breve delle dita", "Estensore breve dell'alluce", "Abduttore del mignolo", "Flessore breve del mignolo",
              "Quadrato della pianta", "Adduttore dell'alluce", "Abduttore dell'alluce"
            ] }]
          }
        ]
      },
      {
        id: "meridiani", titolo: "Meridiani",
        schede: [
          {
            id: "procedura-meridiani", titolo: "Procedura dei meridiani", pag: "109-110",
            test: "Modo Digitopressione Tocco Leggero (= meridiani) causa un C.I.",
            passi: [
              "Mettere in circuito il Modo Digitopressione Tocco Leggero.",
              "Testare il M.I. toccando i punti della tabella L.C. → meridiano.",
              { t: "Se R 6 causa un C.I. riequilibrare lo Yin Qiao Mai:", sub: ["Aprire il meridiano stimolando R 6 × P 7 con tocco statico e profondo.", "Testare tutti i punti del meridiano e stimolare (statico e profondo) quelli che causano un C.I.", "Riequilibrare le Chiavi Osteopatiche.", "Chiudere il meridiano."] },
              { t: "Se V 62 causa un C.I. riequilibrare lo Yang Qiao Mai:", sub: ["Aprire il meridiano stimolando V 62 × IT 3 con tocco statico e profondo.", "Testare tutti i punti del meridiano e stimolare quelli che causano un C.I.", "Riequilibrare le Chiavi Osteopatiche.", "Chiudere il meridiano."] },
              { t: "Se ST 3 × IT 18 o ST 8 × VB 13 causa un C.I. (MTM):", sub: ["Trovare con la L.C. il MTM coinvolto (tabelle).", "Testare tutti i punti del meridiano e trovare quelli prioritari.", "Stimolare il punto Ting × He del meridiano.", "Stimolare tutti i punti prioritari.", "Eseguire le altre tecniche sul MTM come da K~Physis Structural 2."] },
              "Se VC 2 × VB 1 o ST 30 × V 1 causa un C.I. (divergenti): correggere il meridiano trovato come da K~Physis Heart-Brain Axis 3.",
              altre(CORR_ALTRE.slice(0, 4)),
              vp(["Meridiani Straordinari", "Meridiani Tendino Muscolari", "Meridiani Divergenti", "Nervi Cranici", "Ossa Craniche", "Riequilibrio del Piede", "Riequilibrio dello Shen"])
            ].concat(CHIUSURA),
            tabelle: [
              { titolo: "L.C. → meridiano", col: ["L.C.", "Meridiano"], righe: [
                ["R 6", "Yin Qiao Mai"], ["V 62", "Yang Qiao Mai"], ["ST 3 × IT 18", "MTM Yang della Gamba"],
                ["ST 8 × VB 13", "MTM Yang del Braccio"], ["VC 2 × VB 1", "Divergenti Legno"], ["ST 30 × V 1", "Divergenti Terra"]
              ] },
              { titolo: "MTM Yang della Gamba (ST 3 × IT 18)", col: ["L.C.", "Meridiano"], righe: [["V 67", "MTM di Vescica"], ["ST 45", "MTM di Stomaco"], ["VB 44", "MTM di Vescica Biliare"]] },
              { titolo: "MTM Yang del Braccio (ST 8 × VB 13)", col: ["L.C.", "Meridiano"], righe: [["IT 1", "MTM di Intestino Tenue"], ["TR 1", "MTM di Triplice Riscaldatore"], ["IC 1", "MTM di Intestino Crasso"]] },
              { titolo: "Divergenti Legno (VC 2 × VB 1)", col: ["L.C.", "Meridiano"], righe: [["F 14", "Divergente di Fegato"], ["VB 23", "Divergente di Vescica Biliare"]] },
              { titolo: "Divergenti Terra (ST 30 × V 1)", col: ["L.C.", "Meridiano"], righe: [["VC 12", "Divergente di Stomaco"], ["F 13", "Divergente di Milza-Pancreas"]] }
            ],
            appunti: [
              "Yin Qiao Mai: contrazione muscolare, chiude l'occhio → addormentamento. Yang Qiao Mai: movimento muscolare, apre l'occhio → risveglio. Sono i più legati alla parte neurologica del movimento e all'occhio per il nutrimento: lo yin lo porta, lo yang lo drena.",
              "Testo l'area compresa fra le coppie di punti.",
              "Testare anche il Rene, che non c'è fra le foto del manuale (MTM).",
              "Anche R (MTM Yang del Braccio).",
              "I mal di testa da Fegato sono frontali o «a papalina», perché il ramo interno arriva a VG 20.",
              "Le coppie di punti dei divergenti vanno trattate anche per attivare i meridiani."
            ]
          },
          {
            id: "divergenti-tecnica", titolo: "Lavorare con i meridiani divergenti", sotto: "Appunti del corso", pag: "appunti",
            info: [
              "Le grandi articolazioni sono le nostre «pattumiere»: hanno lo spazio intra-articolare dove i patogeni possono venire congedati dai meridiani divergenti. R/V ginocchio; F/VB coxofemorale; ST/M coxofemorale secondo i testi, per Marco la cavità oculare; C/IT spalla.",
              "Ci sono 6 fasi del contenimento patogeno e i meridiani divergenti sono 12. In primavera-estate si può lavorare per dissipare il divergente; in autunno-inverno si lavora per mantenere la latenza (es. nei tumori, mantenere la latenza dà il tempo di costruire le risorse per risolvere)."
            ],
            passi: [
              "Prima di stimolare i punti del meridiano divergente attivarlo con la coppia di punti (stimolata dinamica e superficiale, poi statica e profonda, poi di nuovo dinamica e superficiale).",
              "Iniziare a testare i punti dal basso: il primo che trovo, e il lato in cui lo trovo, mi dicono da dove iniziare.",
              "Risalire testando; sul lato opposto trattare solo i punti trovati sul primo lato; finire con il punto più distale del meridiano, sull'ultimo lato trattato.",
              "Ogni punto: prima superficiale e dinamico (Wei Qi), poi statico e profondo (Yuan Qi), poi di nuovo dinamico e superficiale — prendo l'energia, la porto in superficie e la rimetto giù.",
              "Il punto del VG si fa sempre: è il VERBO della frase.",
              "Al punto finale chiedere alla persona di buttare fuori da quel punto la problematica, o in modo simbolico di inspirare e buttare fuori dal punto un fumo nero / il dolore.",
              "Finito il giro con la digitopressione, secondo giro con i diapason: per ogni punto primo suono muovendo veloce il diapason, secondo tenendolo fermo, terzo rimuovendolo veloce.",
              "Terzo giro con il diapason seguendo il percorso del meridiano (tante volte quante testate)."
            ],
            appunti: [
              "I punti che escono compongono una frase: non serve dirla alla persona, perché la renderei cosciente. È un lavoro somato-emotivo che non ho bisogno di far diventare consapevole.",
              "Chiedere alla persona se le è venuto in mente qualcosa dopo aver superato la metà.",
              "In latenza non trovo un trauma acuto, ma un trauma ripetuto che non sono riuscito a gestire.",
              "La Wei Qi scorre sotto la pelle ed è la più superficiale; la Yuan Qi è l'energia ereditaria in movimento, profonda (parte dinamica del Jing; se diventa liquido è Qi)."
            ]
          },
          {
            id: "yin-qiao-mai", titolo: "Yin Qiao Mai", sotto: "L.C. R 6 · apertura R 6 × P 7", pag: "111",
            meridiani: ["rene"],
            voci: [["Apertura", "R 6 × P 7, tocco statico e profondo"], ["Percorso (punti)", "R 2, R 6, R 8, ST 12, ST 9, V 1 (→ V 10)"]],
            appunti: ["Su alcuni libri questa via decussa anche a livello del pube.",
                      "R 8: punto molto importante per la postura, la propriocezione e il controllo motorio del piede e la catena posteriore."]
          },
          {
            id: "yang-qiao-mai", titolo: "Yang Qiao Mai", sotto: "L.C. V 62 · apertura V 62 × IT 3", pag: "112",
            meridiani: ["vescica"],
            voci: [["Apertura", "V 62 × IT 3, tocco statico e profondo"],
                   ["Percorso (punti)", "V 62, V 61, V 59, VB 29, IT 10, IC 15, IC 16, ST 4, ST 3, ST 2, ST 1, V 1, VB 20"]]
          },
          {
            id: "mtm-vescica", titolo: "Tendino muscolare della Vescica", sotto: "L.C. V 67", pag: "113", meridiani: ["vescica"],
            voci: [["Punti", "V 67, V 64, V 61, VB 40, V 58, V 57, VB 34, V 39, V 40, V 37, V 30, V 26, V 22, D10-D12, V 12, IC 15, IT 16, V 10, V 9, V 1, V 2, V 4, ST 2, ST 3, IT 8, VB 12, ST 12"]]
          },
          {
            id: "mtm-vescica-biliare", titolo: "Tendino muscolare della Vescica Biliare", sotto: "L.C. VB 44", pag: "114", meridiani: ["vescica-biliare"],
            voci: [["Punti", "VB 44, VB 40, VB 35, VB 34, ST 35, VB 32, ST 32, VG 1, VB 30, VB 29, V 54, V 52, V 47, ST 12, VB 12, IC 18, ST 6, IT 18, ST 3, VB 1, VB 4, VG 20, ST 8"]]
          },
          {
            id: "mtm-stomaco", titolo: "Tendino muscolare dello Stomaco", sotto: "L.C. ST 45", pag: "115", meridiani: ["stomaco"],
            voci: [["Punti", "ST 45, ST 43, ST 41, ST 40, ST 35, Xiyan, ST 32, VB 31, ST 31, ST 30, VC 2, VC 3, MP 14, ST 24, ST 19, ST 12, ST 9, ST 5, ST 7, ST 1, ST 2, ST 3, IT 18; ramo posteriore VB 30 → VG 9"]]
          },
          {
            id: "mtm-intestino-tenue", titolo: "Tendino muscolare dell'Intestino Tenue", sotto: "L.C. IT 1", pag: "116", meridiani: ["intestino-tenue"],
            voci: [["Punti", "IT 1, IT 4, IT 5, TR 7, IT 8, TR 12, IT 9, IT 10, IT 15, IT 16, VB 12, ST 5, VB 1, ST 8, VB 13"]]
          },
          {
            id: "mtm-triplice", titolo: "Tendino muscolare del Triplice Riscaldatore", sotto: "L.C. TR 1", pag: "117", meridiani: ["triplice-riscaldatore"],
            voci: [["Punti", "TR 1, TR 3, TR 4, TR 8, TR 10, TR 14, TR 15, ST 6, VB 1, ST 8, VB 13"]]
          },
          {
            id: "mtm-intestino-crasso", titolo: "Tendino muscolare dell'Intestino Crasso", sotto: "L.C. IC 1", pag: "118", meridiani: ["intestino-crasso"],
            voci: [["Punti", "IC 1, IC 4, IC 5, IC 9, IC 11, IC 15, IC 17, ST 5, ST 8, VB 13; ramo posteriore VG 14, D1-D5"]]
          },
          divergente("divergente-vescica-biliare", "Vescica Biliare", "VB 23", ["vescica-biliare"], [
            { titolo: "Ramo principale", righe: [
              ["VB 30", "Iperattività"], ["VC 2", "Relazione con gli altri"], ["VC 3", "Nutrire"], ["VC 6", "Rigidità"],
              ["VB 25", "Cambio della propria vita sentimentale"], ["F 13", "Intossicazioni alimentari"],
              ["VB 24", "Accumulo di situazioni irrisolte"], ["F 14", "Possibilità di trasformazione"],
              ["VC 14", "Reset emotivo dei sensi, ascolto emotivo senza stress"], ["VC 15", "Moltiplicazione, amplificazione benefica"],
              ["ST 12", "Insoddisfazione, accumulo di frustrazione"], ["ST 10", "Porta di accesso per aprire o chiudere l'ascolto dello stress emotivo"],
              ["ST 9", "Memoria del dolore, subito o inflitto"], ["ST 5", "Possibilità di rilettura della realtà"],
              ["VB 1", "Spostarsi, cambiare punto di vista, spostare attenzione"], ["VG 20", "Liberare blocchi"]
            ] },
            { titolo: "Ramo secondario", righe: [
              ["VB 30", "Iperattività"], ["VB 22", "Fermarsi (positivamente, se si è arrivati in una situazione positiva)"],
              ["VC 17", "Riconoscere i propri veri desideri"], ["ST 12", "Insoddisfazione, accumulo di frustrazione"],
              ["TR 16", "Modificare a diversi livelli"], ["TR 17", "Eliminare, usare calore per eliminare"],
              ["IC 20", "Vivere uno stato di serenità, raggiungimento di una meta serena"],
              ["VB 1", "Spostarsi, cambiare punto di vista, spostare attenzione"], ["VG 20", "Liberare blocchi"]
            ] }
          ], "119-121", ["Coppia VB 1 – VC 2. Pattumiera di F/VB: la coxofemorale.", "Punto più distale di uscita: VB 44.", "Faccio il ramo principale o il secondario: testo quale."]),
          divergente("divergente-stomaco", "Stomaco", "VC 12", ["stomaco"], [
            { titolo: "Punti", righe: [
              ["ST 31", "Prendere decisioni con coraggio"], ["ST 30", "Decompressione"], ["VC 12", "Delimitazione dei propri limiti"],
              ["VC 15", "Moltiplicazione, amplificazione benefica"], ["VC 22", "Comunicazione chiara"],
              ["ST 9", "Memoria del dolore, subito o inflitto"], ["ST 4", "Liberazione del peso"], ["ST 1", "Messa a fuoco"],
              ["V 1", "Disintossicarsi, buttare fuori, far uscire"], ["VG 21", "Sospiro di sollievo, detensionamento, rilassamento"],
              ["IC 20", "Vivere uno stato di serenità"]
            ] }
          ], "122-123", ["Coppia ST 30 – V 1.", "Punto più distale di uscita: ST 45."]),
          divergente("divergente-fegato", "Fegato", "F 14", ["fegato"], [
            { titolo: "Punti", righe: [
              ["ST 42", "Libera la tensione, apre con più possibilità di sciogliere"], ["F 5", "Capire come sblocca il freno del movimento/fare"],
              ["VC 2", "Relazione con gli altri"], ["VC 6", "Rigidità"], ["VB 25", "Cambio della propria vita sentimentale"],
              ["F 13", "Intossicazioni alimentari"], ["VB 24", "Accumulo di situazioni irrisolte"], ["F 14", "Possibilità di trasformazione"],
              ["VC 14", "Reset emotivo dei sensi, ascolto emotivo senza stress"], ["VC 15", "Moltiplicazione, amplificazione benefica"],
              ["VC 22", "Comunicazione chiara"], ["VC 23", "Riempimento o vuoto, tranquillizzarsi"],
              ["VB 1", "Spostarsi, cambiare punto di vista, spostare attenzione"], ["VG 20", "Liberare blocchi"]
            ] }
          ], "124-125", ["Punto più distale di uscita: F 1."]),
          divergente("divergente-milza", "Milza-Pancreas", "F 13", ["milza"], [
            { titolo: "Punti", righe: [
              ["M 12", "Razionalità"], ["ST 30", "Decompressione"], ["VC 12", "Delimitazione dei propri limiti"],
              ["VC 17", "Riconoscere i propri veri desideri"], ["VC 22", "Comunicazione chiara"],
              ["ST 9", "Memoria del dolore, subito o inflitto"], ["VC 23", "Riempimento o vuoto, tranquillizzarsi"],
              ["VG 26", "Chiusura, blocco"], ["V 1", "Disintossicarsi, buttare fuori, far uscire"],
              ["VG 21", "Sospiro di sollievo, detensionamento, rilassamento"]
            ] }
          ], "126-127", ["Punto più distale di uscita: M 1."])
        ]
      },
      {
        id: "shen", titolo: "Shen",
        schede: [
          {
            id: "procedura-shen", titolo: "Procedura per lo Shen", sotto: "Energia mentale e spirituale", pag: "129",
            meridiani: ["cuore", "intestino-tenue"],
            test: "Modo Spirituale: pollice che tocca contemporaneamente i polpastrelli del mignolo e dell'anulare.",
            passi: [
              "Mettere in circuito il Modo Spirituale.",
              "Stimolare con digitopressione i due punti C 7 simultaneamente.",
              "Stimolare con un magnete piccolo il punto IT 17.",
              "Muovere un magnete grande attorno alla rotula.",
              "Con una mano sotto la cavità poplitea fare l'unwinding della rotula."
            ],
            tc: ["C 7 (entrambi, insieme)", "IT 17 (magnete piccolo)", "Rotula (magnete grande, poi unwinding)"],
            appunti: [
              "Il manuale stampato dice «mignolo e medio»: corretto a mano in «mignolo e anulare».",
              "Spirito e mente per la MTC sono la stessa energia: lo Shen, che alberga nel Cuore. È radicato nel Cuore e nel sangue; il sangue è la parte materiale di mente, spirito ed emozioni. Il sangue dura 120 giorni, ma può lasciare memorie.",
              "Il sangue nutre gli occhi: lavorando sulla vista è importante il sangue. Il Fegato governa la vista, ma la comprensione di ciò che vediamo la governa lo Shen del Cuore, che governa tutti i sensi: senza di esso non riescono a essere «utilizzati».",
              "Lo Shen si incarna al momento del concepimento ed è divino; le anime Po e Hun sono della persona e si reincarnano (Hun: connessione con le vite precedenti; Po: vissuto, DNA e parenti).",
              "Il ginocchio è l'andare verso: essere in grado di sostenersi per andare in una direzione."
            ]
          }
        ]
      }
    ]
  });
})();
