/* Manuale «Le Basi della Vita» — schede per manuali.js (formato descritto lì).
   Fonte: dispensa Physis «Le Basi della Vita — La Matrice Extracellulare e gli
   8 Meridiani Straordinari» (M. Rado) + appunti a mano del corso.
   `pag` = numero di pagina stampato sulla dispensa (non quello del PDF).
   Sigle dei punti nella forma dell'app: VG = Du Mai (DM nella dispensa),
   VC = Ren Mai (RM), MP = Milza (M), MC = Pericardio (PC). */
(function () {
  /* Punti d'apertura per sesso (tabella a pag. 19): la donna usa il punto del
     meridiano da attivare a destra e quello dell'accoppiato a sinistra,
     l'uomo il contrario. */
  function apertura(proprio, accoppiato, nomeAcc) {
    return {
      t: "Attivare il meridiano stimolando insieme il suo punto d'apertura e quello del meridiano accoppiato (" + nomeAcc + "):",
      sub: ["Donna: " + proprio + " DX + " + accoppiato + " SX.", "Uomo: " + proprio + " SX + " + accoppiato + " DX."]
    };
  }
  function straordinario(o) {
    return {
      id: o.id, titolo: o.titolo, alias: o.alias,
      sotto: "Punto d'apertura " + o.ap + " · accoppiato a " + o.acc + " (" + o.apAcc + ")",
      pag: o.pag, meridiani: o.mer,
      test: "L.C. del punto d'apertura " + o.ap + ", che è anche punto diagnostico. Strutture spia del Jing: denti " + o.denti + ", chiave osteopatica (" + o.chiave + ").",
      voci: [
        ["Trigramma", o.trig], ["Generazione", o.gen], ["Punto d'apertura", o.ap],
        ["Accoppiato a", o.acc + " — punto " + o.apAcc], ["Zona del corpo", o.zona],
        ["Livello energetico", o.livello], ["Chiave osteopatica", o.chiave],
        ["Chiave cranica", o.cranica], ["Denti", o.denti]
      ].concat(o.cost ? [["Costituzione", o.cost]] : []),
      info: o.info,
      passi: [
        "Testare in L.C. il punto d'apertura " + o.ap + ": se causa un C.I. il meridiano è da riequilibrare.",
        apertura(o.ap, o.apAcc, o.acc),
        "Valutare e riequilibrare la chiave osteopatica (" + o.chiave + ") e la chiave cranica (" + o.cranica + ").",
        "La dispensa non descrive il test dei singoli punti né la chiusura: per la sequenza completa vedi «Procedura dei meridiani» nel manuale Occhi."
      ],
      tc: [o.ap + " + " + o.apAcc + " (lato secondo il sesso)"],
      tl: [o.ap + " (L.C. diagnostica)"],
      liste: [
        { titolo: "Decorso", items: o.decorso },
        { titolo: "Punti principali", items: [o.principali] }
      ].concat(o.secondari ? [{ titolo: "Punti secondari", items: [o.secondari] }] : [])
       .concat([{ titolo: "Aree corporee collegate", items: o.aree }])
       .concat(o.alt.map(function (a) { return { titolo: "Alterazioni " + a[0], items: a[1] }; })),
      appunti: o.appunti
    };
  }

  (window.MANUALI = window.MANUALI || []).push({
    id: "basi-vita",
    titolo: "Le Basi della Vita",
    breve: "Basi della Vita",
    sotto: "La Matrice Extracellulare e gli 8 Meridiani Straordinari",
    autore: "Marco Rado — Physis, Istituto Internazionale di Kinesiologia",
    intro: [
      "La prima parte presenta la matrice extracellulare (la «Matrice Vivente» di Pischinger) come rete continua che collega ogni cellula al resto del corpo; la seconda gli 8 Meridiani Straordinari: trigrammi, Cielo Anteriore e Posteriore, funzioni, punti d'apertura, chiavi osteopatiche e craniche, denti, e una scheda per ciascun meridiano.",
      "Nel modello Physis i Meridiani Straordinari non hanno muscoli indicatori: trasportano il Jing, l'energia «solida», e a parlarne sono le strutture solide — ossa (chiavi osteopatiche) e denti."
    ],
    capitoli: [
      {
        id: "matrice", titolo: "La Matrice Extracellulare",
        schede: [
          {
            id: "matrice-vivente", titolo: "La Matrice Vivente", sotto: "Pischinger, regolazione di base", pag: "5-9",
            info: [
              "Pischinger (Vienna) critica la biologia che studia la cellula isolata dal suo ambiente, eredità della patologia cellulare di Virchow (1858): la cellula vive in vivo, immersa in un microambiente che ne determina e controlla l'attività. È lo stesso principio della MTC, che non separa l'uomo dal suo ambiente.",
              "Il microambiente cellulare è fatto di proteine fibrose (collagene, elastina, fibronectina, laminina, condronectina, nidogeno, osteonectina), glicosaminoglicani (GAG) e cellule (fibroblasti, macrofagi, mastociti, plasmacellule): è la Matrice Extracellulare.",
              "Anche l'interno della cellula non è una «soluzione» ma un reticolo di filamenti (citoscheletro); le integrine attraversano la membrana e collegano matrice esterna, citoscheletro e matrice nucleare: esiste una continuità strutturale dall'esterno fino al nucleo. Questo sistema interconnesso è chiamato tessuto connettivo o Matrice Vivente.",
              "La Matrice è una rete elastica a tensione reciproca: ogni trazione locale si ridistribuisce su tutto il sistema, come l'onda di un sasso nell'acqua. È anche una rete di comunicazione ad alta velocità, più rapida della diffusione chimica.",
              "Pischinger, partendo dalla Sostanza Fondamentale di Eppinger, propone la Regolazione Fondamentale: ogni cellula è nutrita attraverso la matrice e vi scarica i suoi rifiuti; la matrice è il terreno dei processi immunitari e di riparazione. Non è un riempitivo né un filtro, ma un sistema di comunicazione e sostegno; la medicina accademica non la riconosce ancora come organo perché è troppo estesa e interconnessa.",
              "Gli esseri viventi non sono lineari (causa-effetto) ma sistemi aperti (Prigogine). L'Integrated Physiology cerca di tradurre i concetti della MTC nel linguaggio della scienza moderna."
            ],
            liste: [{ titolo: "Proprietà meccaniche della Matrice Vivente", items: [
              "Tutti i grandi sistemi (pelle, circolazione, nervi, muscoli e scheletro, digerente, organi e ghiandole) sono avvolti da connettivo, che a livello microscopico diventa la Matrice Vivente.",
              "Forma un continuum meccanico che arriva fino all'interno di ogni cellula.",
              "I connettivi determinano la forma del corpo e l'architettura delle sue parti.",
              "Ogni movimento nasce da tensioni trasmesse attraverso i connettivi.",
              "Tensioni, compressioni e movimenti fanno generare al reticolo cristallino del connettivo segnali bioelettronici caratteristici.",
              "Il connettivo è una rete a semiconduttori che porta segnali bioelettronici da ogni parte del corpo a ogni altra.",
              "Forma periostio, pericardio, rivestimento di stomaco e intestino, sinoviali, borse e retinacoli; nei muscoli penetra come epimisio, perimisio ed endomisio."
            ] }],
            appunti: ["Sottolineato: praticamente tutta l'acqua della cellula è legata in modo particolare alla sua struttura."]
          },
          {
            id: "membrane-mtc", titolo: "Il connettivo nella MTC", sotto: "Huang, Gao, Cou Li · 5 tessuti", pag: "9-10",
            info: [
              "La MTC descrive il connettivo come Huang (Membrane), Gao (Tessuto Grasso) e Cou Li (Cavità e Trama). Il «Lei Jing» colloca le Membrane fra la cavità addominale e la trama muscolare, estese in alto e in basso negli interstizi.",
              "Membrane e Tessuto Grasso corrispondono al connettivo che riempie l'addome e avvolge gli organi: fasce superficiali e profonde, omento, mesentere, stroma. La loro funzione è avvolgere, ancorare e collegare gli organi."
            ],
            tabelle: [{ titolo: "I 5 tessuti e i loro organi", col: ["Tessuto", "Organo"], righe: [
              ["Pelle", "Polmoni"], ["Muscoli", "Milza"], ["Tendini", "Fegato"], ["Vasi sanguigni", "Cuore"], ["Ossa", "Reni"]
            ] }],
            appunti: ["Lo schema dei 5 tessuti è cerchiato a mano."]
          }
        ]
      },
      {
        id: "teoria", titolo: "Gli Otto Meridiani Straordinari",
        schede: [
          {
            id: "trigrammi", titolo: "Gli otto trigrammi", sotto: "Qi Jing Ba Mai", pag: "11-12",
            info: [
              "Dai due principi (Yang e Yin) nascono Grande e Piccolo Yang, Grande e Piccolo Yin; il due diventa tre e nascono gli otto trigrammi, ognuno associato a un Meridiano Straordinario.",
              "Qi Jing Ba Mai: Qi = straordinario (raro, irregolare, eccedente), Jing Mai = meridiani, Ba = otto. Sono un'organizzazione energetica a parte, non lineare, implicita in quella dei meridiani principali.",
              "Trasportano e sono costituiti dall'energia ereditaria (Yuan Qi e Jing): il loro scopo è trasmettere la vita nel tempo, perciò sono legati a fecondazione, sessualità e codice genetico.",
              "Tranne Du Mai e Ren Mai non hanno punti propri: passano da un meridiano all'altro usandone i punti e coordinandone le funzioni.",
              "Hanno tutti un percorso dal basso verso l'alto: l'energia sessuale e genetica è massima espressione dello Yang, e il tragitto ascendente serve a opporsi alla gravità, determinando la postura.",
              "Ognuno ha un punto speciale che ne attiva la sequenza energetica: il Punto d'Apertura o Punto Chiave."
            ],
            tabelle: [{ titolo: "Trigramma → meridiano", col: ["Trigramma", "Meridiano"], righe: [
              ["Cielo", "Du Mai"], ["Lago", "Chong Mai"], ["Fuoco", "Yin Wei Mai"], ["Tuono", "Dai Mai"],
              ["Vento", "Yang Wei Mai"], ["Acqua", "Yin Qiao Mai"], ["Monte", "Yang Qiao Mai"], ["Terra", "Ren Mai"]
            ] }],
            appunti: [
              "I trigrammi: forme di un archetipo.",
              "Lago / abisso.",
              "Tuono: stomaco, diaframma, incidente; intenso, grosso, di breve durata; tendine d'Achille.",
              "Monte: osso, struttura immensa contro cui non puoi fare nulla; fermo, immobile.",
              "Sottolineati: Qi = straordinario, Jing Mai = meridiani, Ba = otto; i Meridiani Straordinari trasportano e sono costituiti dall'energia ereditaria; il percorso dal basso verso l'alto dipende dalla funzione di opporsi alla gravità e determina la postura."
            ]
          },
          {
            id: "cielo-anteriore-posteriore", titolo: "Cielo Anteriore e Cielo Posteriore", alias: ["Cielo Anteriore", "Cielo Posteriore"], pag: "13-15",
            info: [
              "Dall'unione di Yang e Yin assoluti (Cielo e Terra) nascono sei energie, tre Yang e tre Yin: in tutto otto energie primordiali o archetipi, che assicurano generazione ed evoluzione degli esseri. Nell'uomo si manifestano come gli 8 Meridiani Straordinari. La leggenda ne attribuisce la scoperta al re Fu Xi; la rappresentazione più chiara è il cerchio degli otto trigrammi (Ba Gua).",
              "Cielo Anteriore (Organizzazione Primordiale): la scintilla iniziale, l'idea dell'uomo; dominanza energia, carattere Yang.",
              "Cielo Posteriore (Distribuzione Secondaria, attribuita al re Wen Wang): deriva dal primo e dà il via alla strutturazione; dominanza struttura, carattere Yin. Contiene il progetto e ne permette la realizzazione.",
              "Entrambi sono comunque «Cielo», quindi Yang rispetto all'uomo: per realizzarsi la vita ha bisogno di una controparte Yin, che nell'uomo si manifesta attraverso i punti dei meridiani principali.",
              "Il ruolo dei Meridiani Straordinari è controllare istante per istante tutte le attività energetiche e fisiologiche, permettendo la trasmissione della vita, regolando l'apparato riproduttivo e governando il sistema neuroendocrino."
            ],
            voci: [["Cielo Anteriore", "Genetica — dominanza Yang, energia"], ["Cielo Posteriore", "Fisiologia — dominanza Yin, struttura"]],
            appunti: [
              "Cielo Anteriore: genetica; precede la vita.",
              "Cielo Posteriore: dalla nascita in poi, fisiologia.",
              "Sottolineato: entrambi sono Cielo, e quindi per definizione Yang."
            ]
          },
          {
            id: "caratteristiche", titolo: "Caratteristiche dei Meridiani Straordinari", pag: "16",
            liste: [{ titolo: "Le 8 caratteristiche", items: [
              "Non emanano da un organo né sono collegati a organi o visceri, ma hanno relazioni con gli Organi Straordinari.",
              "Attraverso utero, midollo, ossa, cervello, vasi sanguigni e vescica biliare sono collegati ai sistemi neuroimmunitario, endocrino e strutturale.",
              "Traggono l'energia dai Reni e trasportano tutto il Jing.",
              "Non hanno una sequenza Yin/Yang, ma si dividono in coppie funzionali Yin/Yin e Yang/Yang.",
              "Non hanno punti propri, tranne Du Mai (VG) e Ren Mai (VC): usano quelli dei meridiani principali.",
              "Pur essendo Yin o Yang, decorrono tutti dal basso verso l'alto.",
              "Compensano la gravità: sono fondamentali per assetto e controllo posturale e per lo sviluppo dello scheletro, specie assiale.",
              "Ognuno controlla un livello, cioè 2 meridiani principali: gli 8 Straordinari controllano le 24 funzioni fisiologiche."
            ] }],
            appunti: ["Ming Men: zona fra i reni (3 dita sotto l'ombelico) → VG 4, «Porta del Destino», fra la seconda e la terza vertebra lombare."]
          },
          {
            id: "funzioni-straordinari", titolo: "Funzioni dei Meridiani Straordinari", pag: "17-18",
            liste: [{ titolo: "Funzioni principali", items: [
              "Organizzano la struttura energetica della persona già nell'embrione: danno gli assi verticale e orizzontale lungo cui si formano le strutture, guidano crescita, differenziazione dei tessuti, attività neuroendocrina e ritmi biologici.",
              "Fanno da riserva per i meridiani principali: come laghi accanto ai fiumi, assorbono l'eccesso e lo restituiscono quando serve (shock, patologie acute).",
              "Diffondono le energie ereditarie in tutto il corpo, integrando Yuan Qi e Jing: sono l'anello fra Cielo Anteriore e Posteriore.",
              "Controllano gli organi riproduttivi, la gravidanza, lo sviluppo fetale e il ciclo mestruale.",
              "Nascono da due sedi: dal Ming Men i meridiani di prima generazione (Chong, Du, Ren, Dai); dalla caviglia quelli di seconda (Yin Wei da R 9, Yang Wei da V 63, Yin Qiao da R 6, Yang Qiao da V 62).",
              "Diffondono la Wei Qi in torace, addome e schiena (soprattutto Chong, Ren e Du).",
              "Regolano i cicli vitali (Ren e Chong): 7 anni nella donna (7, 14, 21, 28, 35, 42, 49), 8 nell'uomo (8, 16, 24, 32, 40, 48, 56).",
              "Ogni meridiano di prima generazione si accoppia con uno di seconda, Yang con Yang e Yin con Yin, e la coppia agisce sulle stesse aree del corpo.",
              "Per attivare un meridiano si usano entrambi i punti d'apertura della coppia funzionale (vedi «Coppie funzionali e punti d'apertura»)."
            ] }],
            tabelle: [{ titolo: "Coppie funzionali e aree d'azione", col: ["Coppia", "Aree"], righe: [
              ["Ren Mai + Yin Qiao Mai", "Addome, torace, polmoni, gola, faccia"],
              ["Du Mai + Yang Qiao Mai", "Parte posteriore delle gambe, schiena, colonna dorsale, collo, testa, occhi e cervello"],
              ["Chong Mai + Yin Wei Mai", "Parte interna delle gambe, addome, torace, cuore, stomaco"],
              ["Dai Mai + Yang Wei Mai", "Parte esterna delle gambe, lati del corpo, spalle e lato del collo"]
            ] }],
            appunti: [
              "Jing → ghiaccio; Yuan Qi → ghiaccio appena sciolto.",
              "Chong, Du, Ren, Dai segnati come 1ª generazione; Yin Wei, Yang Wei, Yin Qiao, Yang Qiao come 2ª generazione.",
              "Evidenziate le coppie Ren–Yin Qiao, Du–Yang Qiao, Dai–Yang Wei, Chong–Yin Wei e le loro aree."
            ]
          },
          {
            id: "coppie-apertura", titolo: "Coppie funzionali e punti d'apertura", sotto: "Lato destro o sinistro secondo il sesso", pag: "18-19",
            info: ["Per innescare la sequenza di un Meridiano Straordinario si stimolano il suo punto d'apertura e quello del meridiano accoppiato. Il lato dipende dal sesso: nella donna il punto del meridiano da attivare va a destra e quello dell'accoppiato a sinistra; nell'uomo il contrario."],
            tabelle: [{ titolo: "Punti da stimolare", col: ["Meridiano da attivare", "Donna", "Uomo"], righe: [
              ["Ren Mai + Yin Qiao", "P 7 DX + R 6 SX", "P 7 SX + R 6 DX"],
              ["Du Mai + Yang Qiao", "IT 3 DX + V 62 SX", "IT 3 SX + V 62 DX"],
              ["Chong Mai + Yin Wei", "MP 4 DX + MC 6 SX", "MP 4 SX + MC 6 DX"],
              ["Dai Mai + Yang Wei", "VB 41 DX + TR 5 SX", "VB 41 SX + TR 5 DX"],
              ["Yin Qiao + Ren Mai", "R 6 DX + P 7 SX", "R 6 SX + P 7 DX"],
              ["Yang Qiao + Du Mai", "V 62 DX + IT 3 SX", "V 62 SX + IT 3 DX"],
              ["Yin Wei + Chong Mai", "MC 6 DX + MP 4 SX", "MC 6 SX + MP 4 DX"],
              ["Yang Wei + Dai Mai", "TR 5 DX + VB 41 SX", "TR 5 SX + VB 41 DX"]
            ] }],
            appunti: [
              "Chong Mai è la scintilla del momento della fecondazione.",
              "Dai Mai è l'asse orizzontale: si occupa di tutti i diaframmi."
            ]
          },
          {
            id: "sviluppo-embrionale", titolo: "Sviluppo embrionale e zone del corpo", pag: "20-21",
            info: [
              "I Meridiani Straordinari sono l'imprinting energetico dello sviluppo fetale: portano il codice della vita, espresso in binario (Yin-Yang) nei trigrammi, alla base del codice genetico. Sono la prima traccia attorno a cui si formano i meridiani principali e il corpo.",
              "Il primo a formarsi è Chong Mai, al centro del vortice nato dall'unione dei gameti: asse verticale Cielo-Terra, «Mare dei 5 Organi e 6 Visceri», «Mare del Sangue», «Mare dei Meridiani».",
              "Poi Dai Mai (asse trasversale) e Ren e Du Mai (piano coronale). Ren e Du formano la Piccola Rivoluzione Celeste, interrotta alla nascita dal primo respiro (in alto) e dalla prima scarica di meconio (in basso).",
              "Quando l'energia di Chong raggiunge R 6, R 9, V 62 e V 63 nascono i meridiani di seconda generazione: Chong è la loro origine. Quelli di prima generazione stanno sul tronco, quelli di seconda sugli arti."
            ],
            tabelle: [{ titolo: "Zone controllate", col: ["Meridiano", "Zona"], righe: [
              ["Du Mai", "Parte posteriore del corpo"], ["Ren Mai", "Parte anteriore del corpo"],
              ["Chong Mai", "Baricentro"], ["Dai Mai", "Fianchi"],
              ["Yang Qiao", "Parte esterna della coscia"], ["Yin Qiao", "Parte interna della coscia"],
              ["Yang Wei", "Parte dorsale del braccio"], ["Yin Wei", "Parte ventrale del braccio"]
            ] }],
            appunti: ["Du Mai = VG, Ren Mai = VC; Chong Mai = piccolo yin, Dai Mai = piccolo yang."]
          },
          {
            id: "monitoraggio-denti", titolo: "Monitoraggio muscolare e denti", pag: "22-24",
            info: [
              "Altri autori (Barton, Topping, Tobar) associano muscoli specifici ai Meridiani Straordinari; il modello Physis no, per restare fedele ai testi classici: nei muscoli scorre il Qi (energia dinamica), nei Meridiani Straordinari il Jing (energia «solida»).",
              "L'energia è come l'acqua in tre stati: Shen gassoso ed etereo, Qi liquido e dinamico, Jing solido e statico. Le strutture solide — ossa, vertebre e denti — sono quelle che meglio «parlano» dei Meridiani Straordinari.",
              "I denti sono ologrammi: lo stesso dente riflette sistemi diversi secondo l'approccio, per questo esistono tante tabelle diverse e tutte funzionano. 32 denti diviso 8 = 4 denti per meridiano, uno per quadrante, con lo stesso numero d'ordine (1 = incisivo centrale, 8 = dente del giudizio)."
            ],
            tabelle: [{ titolo: "Meridiano → denti", col: ["Meridiano", "Denti"], righe: [
              ["Du Mai", "11 – 21 – 31 – 41"], ["Yang Qiao Mai", "12 – 22 – 32 – 42"], ["Dai Mai", "13 – 23 – 33 – 43"],
              ["Yang Wei Mai", "14 – 24 – 34 – 44"], ["Chong Mai", "15 – 25 – 35 – 45"], ["Yin Wei Mai", "16 – 26 – 36 – 46"],
              ["Yin Qiao Mai", "17 – 27 – 37 – 47"], ["Ren Mai", "18 – 28 – 38 – 48"]
            ] }],
            appunti: ["Sottolineato: le strutture che meglio comunicano le condizioni dei Meridiani Straordinari sono quelle solide — ossa, vertebre e denti."]
          },
          {
            id: "gravita", titolo: "Forza di gravità e Meridiani Straordinari", pag: "25-29",
            info: [
              "La gravità condiziona ogni gesto e gran parte della fisiologia: lo mostrano gli astronauti in microgravità, con atrofia muscolare, perdita di fibre rosse posturali, demineralizzazione ossea, sangue che rifluisce verso la testa, disidratazione, calo dei globuli rossi, riduzione del cuore, calo dei linfociti e disturbi psichici. Circa l'80% degli impulsi nervosi del cervello serve a contrastare la gravità.",
              "La gravità è anche utile: per effetto piezoelettrico, trazioni e compressioni sulle ossa (cristalli) producono differenze di potenziale, cioè energia.",
              "Gli antichi cinesi ponevano l'uomo «tra Cielo e Terra»: l'alternanza fra repulsione Yang e attrazione Yin genera la bioelettricità trasportata dai meridiani.",
              "I meridiani principali conducono la bioelettricità (Qi); i Meridiani Straordinari sono linee di gravità che controllano l'assetto del corpo in clinostatismo e ortostatismo. Poiché la gravità spinge dall'alto verso il basso, decorrono tutti dal basso verso l'alto.",
              "Ogni Meridiano Straordinario ha un punto d'apertura, che è anche punto diagnostico, ed è collegato a una chiave osteopatica: tramite essi si valutano i sistemi fisiologici e le chiavi osteopatiche."
            ]
          },
          {
            id: "punti-apertura", titolo: "Punti d'apertura e chiavi osteopatiche", alias: ["Punti di Apertura", "Punti Chiave"], pag: "28-31",
            tabelle: [{ titolo: "Punti d'apertura", col: ["Meridiano", "Punto", "Chiave osteopatica", "Localizzazione"], righe: [
              ["Du Mai", "IT 3", "Cranio (e coccige)", "Dietro l'articolazione metacarpo-falangea del mignolo, al limite fra pelle palmare e dorsale."],
              ["Ren Mai", "P 7", "Sacro", "Sopra il processo stiloideo del radio, nella doccia radiale, sul brachioradiale."],
              ["Chong Mai", "MP 4", "Sterno", "Lato mediale del piede, antero-inferiormente alla base del primo metatarso."],
              ["Dai Mai", "VB 41", "Iliaca", "Nella depressione davanti all'articolazione fra IV e V metatarso, lateralmente al tendine dell'estensore lungo del V dito."],
              ["Yin Wei Mai", "MC 6", "Clavicola", "2 distanze sopra la piega del polso, fra i tendini del palmare lungo e del flessore radiale del carpo."],
              ["Yang Wei Mai", "TR 5", "Zigomo", "2 distanze sopra la piega dorsale del polso, fra radio e ulna."],
              ["Yin Qiao Mai", "R 6", "Caviglia e sinfisi pubica", "Circa 0,4 distanze sotto l'estremità inferiore del malleolo interno."],
              ["Yang Qiao Mai", "V 62", "Perone e scapola", "Circa 0,4 distanze sotto l'estremità inferiore del malleolo laterale."]
            ] }],
            appunti: ["«Punti di apertura» scritto a mano sopra il riquadro, cerchiato."]
          },
          {
            id: "chiavi-osteopatiche", titolo: "Chiavi osteopatiche e craniche", pag: "100-101",
            tabelle: [{ titolo: "Riepilogo", col: ["Meridiano", "Punto", "Chiave cranica", "Chiave osteopatica"], righe: [
              ["Du Mai", "IT 3", "Sfenoide", "Cranio, coccige"],
              ["Yang Qiao Mai", "V 62", "Occipite", "Perone, scapola"],
              ["Yang Wei Mai", "TR 5", "Seni frontali e mascellari", "Zigomi"],
              ["Dai Mai", "VB 41", "Temporale", "Iliaca"],
              ["Chong Mai", "MP 4", "Mandibola", "Sterno"],
              ["Yin Wei Mai", "MC 6", "Parietale", "Clavicola"],
              ["Yin Qiao Mai", "R 6", "Frontale", "Sinfisi pubica, ginocchio, caviglia"],
              ["Ren Mai", "P 7", "Ioide", "Sacro"]
            ] }],
            info: ["Le tecniche di riequilibrio delle chiavi sono illustrate nella dispensa, nella scheda di ciascun meridiano."]
          },
          {
            id: "livelli-energetici", titolo: "Livelli energetici e Meridiani Straordinari", pag: "102",
            info: ["Ogni meridiano di seconda generazione e i due di prima generazione Chong e Dai controllano un livello energetico, cioè una coppia di meridiani principali; Du Mai e Ren Mai stanno ai due poli dello schema."],
            tabelle: [{ titolo: "Meridiano → livello controllato", col: ["Meridiano", "Meridiani principali", "Livello"], righe: [
              ["Chong Mai", "Polmone – Milza-Pancreas", "Tai Yin"],
              ["Yin Wei Mai", "Fegato – Pericardio", "Jue Yin"],
              ["Yin Qiao Mai", "Rene – Cuore", "Shao Yin"],
              ["Dai Mai", "Vescica Biliare – Triplice Riscaldatore", "Shao Yang"],
              ["Yang Wei Mai", "Intestino Crasso – Stomaco", "Yang Ming"],
              ["Yang Qiao Mai", "Vescica – Intestino Tenue", "Tai Yang"]
            ] }]
          }
        ]
      },
      {
        id: "meridiani", titolo: "Gli 8 Meridiani",
        intro: ["Una scheda per meridiano: punto d'apertura e accoppiato, decorso, punti, chiavi e alterazioni. Il riequilibrio si fa attivando la coppia di punti d'apertura (lato secondo il sesso) e lavorando sulle chiavi osteopatiche e craniche."],
        schede: [
          straordinario({
            id: "du-mai", titolo: "Du Mai", alias: ["Vaso Governatore"], pag: "35-41",
            mer: ["vaso-governatore", "intestino-tenue"],
            ap: "IT 3", acc: "Yang Qiao Mai", apAcc: "V 62", trig: "Cielo", gen: "Prima",
            zona: "Parte posteriore del corpo", livello: "Polo Yang dello schema (non controlla una coppia)",
            chiave: "Cranio, coccige", cranica: "Sfenoide", denti: "11 – 21 – 31 – 41",
            info: [
              "Du significa governare, dirigere, correggere: è il «padre» dei Meridiani Straordinari, che guida, sostiene e pone limiti utili a non disperdersi. Rappresenta la determinazione nel compiere il proprio destino: VG 4 si chiama «Porta del Destino»; è lui che ci fa passare dal gattonare al camminare dritti (VG 4) a testa alta (VG 14). Quando il peso della vita è insopportabile la schiena si deforma, fino alla scoliosi.",
              "Nasce con Ren e Chong dal Ming Men, scende a VC 1, sale lungo la colonna fino al cranio e termina fra gli incisivi superiori. Ha 28 punti propri, usati per colonna, disturbi neurologici, sessualità maschile, alcune turbe psichiche, infezioni e febbri. Per il collegamento Reni-Cervello è centrale nell'asse ipofisi-surrene.",
              "Funzioni: regola tutti i meridiani Yang, che convergono in VG 14 e VG 20 («Mare dei Meridiani Yang»); nutre cervello e midollo grazie al legame col Jing del Rene (da VG 16 parte un ramo verso il cervello); regge le funzioni sessuali maschili."
            ],
            decorso: [
              "Ramo principale: dal Ming Men al perineo, emerge a VG 1 sulla punta del coccige, sale lungo le spinose lombari, dorsali e cervicali fino alla nuca, passa sul cranio, scende su fronte, naso e labbro superiore e termina alle radici degli incisivi centrali (VG 28).",
              "Ramo B: dal basso ventre attraversa i genitali, incrocia VC 1, gira attorno all'ano, entra nella colonna e arriva ai Reni.",
              "Ramo C: anteriore, raggiunge ombelico e cuore, sale alla gola e al viso e termina sotto gli occhi.",
              "Ramo D: posteriore, dai genitali sale a V 1, si ramifica nel cervello e scende ai Reni (passando per V 12).",
              "Ramo E: da VG 16, «Punto del Mare del Midollo», un ramo profondo entra nel cervello."
            ],
            principali: "VG 1 – VG 28", secondari: "VC 1, V 1, V 12",
            aree: ["Colonna dorsale", "Schiena", "Parte posteriore di collo e testa"],
            alt: [
              ["posturali", ["Rigidità e dolori di tutto il rachide, specie dorsale", "Scoliosi", "Mal di testa e pesantezza alla testa", "Epistotono della colonna", "Freddo e dolore alla regione lombare", "Emiplegia", "Epilessia, convulsioni", "Nevralgie, dolori dentali, paralisi facciale, tic", "Arti freddi, vertigini"]],
              ["organiche", ["Affezioni oftalmiche, otorinolaringoiatriche, odontostomatologiche", "Cefalea, ipertensione", "Infertilità", "Patologie genito-urinarie, gastroenteriche, respiratorie, cardiache, neurologiche", "Ernie addominali, emorroidi", "Ritenzione urinaria, enuresi"]],
              ["dello Shen", ["Psicosi, nevrastenia, insonnia, agitazione, amnesia, ansia", "Confusione e rigidità mentale, eccesso di controllo", "Megalomania, delirio di onnipotenza, perdita del senso del limite, esagerata considerazione di sé"]],
              ["degli organi di senso", ["Turbe del visus", "Perdita di coscienza, coma", "Acufeni, ipoacusia, tinnito, sordomutismo", "Vertigini"]]
            ],
            appunti: ["Accanto a «Infertilità»: maschile."]
          }),
          straordinario({
            id: "ren-mai", titolo: "Ren Mai", alias: ["Vaso Concezione"], pag: "43-49",
            mer: ["vaso-concezione", "polmone"],
            ap: "P 7", acc: "Yin Qiao Mai", apAcc: "R 6", trig: "Terra", gen: "Prima",
            zona: "Parte anteriore del corpo", livello: "Polo Yin dello schema (non controlla una coppia)",
            chiave: "Sacro", cranica: "Ioide", denti: "18 – 28 – 38 – 48",
            info: [
              "Ren significa assumersi un incarico, portare una responsabilità: anticamente la donna gravida era chi «porta una responsabilità». È il Vaso Concezione, centrale per gravidanza e riproduzione.",
              "È Yin perché sta sulla parte anteriore del corpo: «Mare dei Meridiani Yin», coordina tutti i meridiani e le strutture Yin. Nasce con Du e Chong dal Ming Men, emerge a VC 1 al centro del perineo e incrocia il Du Mai a VG 28: insieme formano la Piccola Rivoluzione Celeste, accanto alla Grande Circolazione dei 12 meridiani principali.",
              "Funzioni: regola i meridiani Yin; nutre gli organi riproduttivi e sovrintende a ciclo, fertilità, concepimento, gravidanza, parto e menopausa («regge l'utero»; uno squilibrio può portare ad aborti o parti prematuri), e nell'uomo al sistema urogenitale e alla prostata; controlla Jing, Sangue (ciclo mestruale) e liquidi (Jin e Ye)."
            ],
            decorso: [
              "Ramo principale: dal Ming Men nella pelvi emerge al perineo (VC 1), sale lungo la linea mediana — sinfisi pubica, addome, sterno, fossa sovrasternale, gola, mento — e termina a VC 24 nel solco mento-labiale.",
              "Ramo B: da VC 1 un ramo profondo incrocia VG 1 e sale lungo la colonna fino a VG 14.",
              "Ramo C: da VC 24 due rami interni girano attorno alle labbra, si incrociano a VG 28 e salgono agli occhi, terminando a ST 1."
            ],
            principali: "VC 1 – VC 24", secondari: "VG 1, VG 28, ST 1",
            aree: ["Addome", "Torace", "Polmoni", "Gola", "Volto"],
            alt: [
              ["posturali", ["Rigidità e dolori cervicali", "Dolori perineali, pelvici, addominali", "Dolori ipocondriaci, epigastrici, toracici"]],
              ["organiche", ["Affezioni otorinolaringoiatriche, di laringe e faringe", "Cefalea", "Infertilità", "Patologie genito-urinarie, gastroenteriche, respiratorie, cardiache"]],
              ["dello Shen", ["Psicosi", "Nevrastenia", "Insonnia", "Ansia"]],
              ["degli organi di senso", ["Disfonia"]]
            ]
          }),
          straordinario({
            id: "chong-mai", titolo: "Chong Mai", alias: ["Vaso Spinta"], pag: "51-59",
            mer: ["rene", "stomaco", "milza"],
            ap: "MP 4", acc: "Yin Wei Mai", apAcc: "MC 6", trig: "Lago", gen: "Prima",
            zona: "Baricentro", livello: "Tai Yin (Polmone – Milza-Pancreas)",
            chiave: "Sterno", cranica: "Mandibola", denti: "15 – 25 – 35 – 45", cost: "Flemmatica",
            info: [
              "Chong significa incrocio, passaggio, ma anche impeto e trasformazione: è un centro di comando che controlla l'energia di tutto l'organismo e il sangue. L'incrocio è l'unione dei genitori, la scintilla che dà vita; la trasformazione dal Cielo Anteriore al Posteriore prosegue tutta la vita (neonato, adolescente, adulto, genitore). Tradotto «Vaso Spinta»: una spinta verso l'alto, verso la verticalizzazione.",
              "È il più complesso e forse il più importante: nasce dai Reni al Ming Men e diffonde le energie ereditarie; dai suoi punti di contatto nascono Yin Qiao, Yang Qiao, Yin Wei, Yang Wei e Dai Mai. È «Mare dei 12 Meridiani», «Mare dei 5 Organi e 6 Visceri» (li nutre di energie ereditarie e acquisite) e «Mare del Sangue».",
              "Funzioni: controlla l'energia dei 12 meridiani e la distribuzione delle energie ereditarie (collega Reni e Stomaco tramite ST 30, «Mare degli Alimenti»); controlla gli organi riproduttivi, utero, ovaie e mestruazioni, e la tiroide; controlla il Sangue (ramo C, collegato a MP 10 «Mare del Sangue»): il Sangue unisce Cielo Anteriore (Rene) e Posteriore (Milza + Polmone); controlla i liquidi tramite il livello Tai Yin."
            ],
            decorso: [
              "Ramo principale: dal Ming Men emerge al perineo (VC 1), dove nasce il ramo B; prosegue a ST 30, dove nasce il ramo C, e sale sull'addome lungo il Rene da R 11 a R 21.",
              "Ramo A: da R 21 arriva al petto e si dirama da R 22 a R 27, sale al collo (VC 22, VC 23), gira attorno alla bocca (VC 24, VG 26) e termina agli occhi (ST 1).",
              "Ramo B: dal perineo entra in profondità e sale dentro la colonna lombare e dorsale fino alla prima vertebra dorsale.",
              "Ramo C: da ST 30 scende lungo la faccia mediale di coscia e gamba (MP 10), passa dietro il malleolo mediale e termina sotto la pianta nel punto extra Yu Quan.",
              "Ramo D: dal ramo C arriva alla punta dell'alluce dopo aver toccato ST 42."
            ],
            principali: "R 11 – R 21, ST 30",
            secondari: "R 22 – R 27, VC 22, VC 23, VC 24, VG 26, ST 1, VC 1, MP 10, ST 42, Yu Quan (extra: sotto la pianta, sul bordo anteriore del calcagno fra navicolare e cuboide)",
            aree: ["Addome", "Torace", "Utero", "Cuore"],
            alt: [
              ["posturali", ["Dolori inguinali e toracici", "Paralisi e ipostenia degli arti inferiori"]],
              ["organiche", ["Infertilità, irregolarità mestruali, amenorrea, spotting, metrorragia, leucorrea, aborti ripetuti, ipogalattia", "Aritmia, palpitazioni, problemi cardiovascolari e di circolazione, aneurismi", "Bambini con problemi cardiaci o respiratori congeniti, ritardo mentale, sindrome di Down", "Inappetenza, tensione addominale, meteorismo, flatulenza, nausea, vomito, epigastralgie, eruttazioni", "Problemi degenerativi della colonna"]],
              ["dello Shen", ["Difficoltà a cambiare, specie nei passaggi critici (infanzia, pubertà, menarca, genitorialità, menopausa, pensione)", "Abitudinario, rigidità psicologica, lentezza di pensiero", "Eccessi e difetti della costituzione flemmatica"]]
            ],
            appunti: [
              "Controlla M-P (Milza-Polmone).",
              "Yu Quan: interlinea di Chopart; ha a che fare con l'utero — i tacchi troppo alti lo inibiscono → prolasso uterino.",
              "Accanto a Cielo Anteriore e Posteriore: genetica e fisiologia."
            ]
          }),
          straordinario({
            id: "dai-mai", titolo: "Dai Mai", alias: ["Vaso Cintura"], pag: "62-67",
            mer: ["vescica-biliare"],
            ap: "VB 41", acc: "Yang Wei Mai", apAcc: "TR 5", trig: "Tuono", gen: "Prima",
            zona: "Fianchi", livello: "Shao Yang (Vescica Biliare – Triplice Riscaldatore)",
            chiave: "Iliaca", cranica: "Temporale", denti: "13 – 23 – 33 – 43", cost: "Biliosa",
            info: [
              "Dai significa cintura: avvolge i fianchi all'altezza della vita, a contatto con la sacro-iliaca, e protegge il Ming Men e le energie ereditarie, permettendo che circolino. È l'unico meridiano orizzontale: divide il corpo in due metà, è più superficiale degli altri e li costringe ad allinearsi, dando ordine, coesione e compattezza.",
              "È il punto di contatto fra prima e seconda generazione, fra energie ereditarie (verticali: Du, Ren, Chong) e acquisite: per questo è legato allo Stomaco (ST 30), alla Vescica Biliare (VB 26, VB 27, VB 28), al Rene (V 23) e al Fegato (F 13).",
              "Funzioni: controlla tutti i meridiani delle gambe, che circonda (tranne Fegato e Vescica), e l'equilibrio Alto-Basso; controlla le funzioni genitali (piccolo bacino, mestruazioni, secrezioni vaginali, dilatazione dell'utero, perdite)."
            ],
            decorso: [
              "Ramo principale: nasce nell'ipocondrio inferiore (F 13), va a VB 26, scende obliquo a VB 27 e VB 28 e cinge il busto a livello dei fianchi.",
              "Non ha rami secondari, ma molti autori includono VG 4 (dove insorgerebbe), V 23 (dove prende le energie ereditarie del Rene) e VC 8 (dove termina)."
            ],
            principali: "VB 26, VB 27, VB 28", secondari: "F 13, VG 4, VC 8, V 23",
            aree: ["Fianchi", "Diaframma", "Genitali"],
            alt: [
              ["posturali", ["Ipostenia della muscolatura degli arti inferiori e lombare", "Lombalgie con sensazione di freddo", "Sensazione che il corpo sia diviso in due"]],
              ["organiche", ["Infertilità, irregolarità mestruali, amenorrea, dismenorrea, leucorrea", "Infiammazioni genito-urinarie, cistiti, vaginiti, disuria", "Alterazione delle secrezioni vaginali, perdite, dilatazione o strozzatura dell'utero, prolasso uterino, fibromi", "Meteorismo, dissenteria con cibo non digerito, ascessi intestinali, dolori addominali"]],
              ["dello Shen", ["Ipercriticismo, intolleranza, irritabilità, aggressività", "Attacchi di panico", "Disordine o ordine maniacale", "Iniziare mille cose senza concluderle", "Eccessi e difetti della costituzione biliosa"]]
            ],
            appunti: [
              "Controlla VB-TR.",
              "Genitali: problematiche del piccolo bacino (dilatazione dell'utero, VB 21).",
              "Foto di una slide del corso: oltre al ramo principale (F 13, VB 26, VB 27, VB 28, VC 8) sono disegnati un 1° ramo orizzontale all'altezza di VB 26 (passa per MP 15, ST 25, R 16 fino alla linea mediana), un 2° ramo, il Bao Mai verticale da VC 15 a VC 1 e il Da Bao, fascia toracica all'altezza di MP 21 (o VB 22) che dietro passa per VG 9."
            ]
          }),
          straordinario({
            id: "yin-wei-mai", titolo: "Yin Wei Mai", pag: "70-75",
            mer: ["rene", "milza", "fegato", "maestro-cuore"],
            ap: "MC 6", acc: "Chong Mai", apAcc: "MP 4", trig: "Fuoco", gen: "Seconda",
            zona: "Parte ventrale del braccio", livello: "Jue Yin (Fegato – Pericardio)",
            chiave: "Clavicola", cranica: "Parietale", denti: "16 – 26 – 36 – 46", cost: "Sanguigna",
            info: [
              "Wei significa legare, unire: unisce tutti i meridiani Yin, perciò ha stretti rapporti con Ren Mai. Con Yang Wei è l'unica coppia che rispetta la relazione interno-esterno dei meridiani principali accoppiati: Yin Wei cura fisiologia e patologia interna, cioè la vita vegetativa.",
              "Agisce in sinergia con Chong Mai nella regolazione dell'energia interna e soprattutto del Sangue; è un meridiano secondario del Rene.",
              "Funzioni: collega i meridiani Yin tramite il livello Jue Yin, «cerniera» dello Yin (alterazioni psicologiche e del Sangue; i fattori esterni lo colpiscono solo se un organo interno è già indebolito); porta le energie ereditarie dalle zone Yin del piede, da R 9, fino a VC 23; regola il Sangue, insieme a Chong e tramite le anastomosi con Rene, Milza-Pancreas e Fegato (sistema vascolare ed epatoematico)."
            ],
            decorso: [
              "Ramo principale: da R 9 sale lungo la faccia mediale della gamba fino all'addome, dove incontra la Milza-Pancreas a MP 12 (MP 13, MP 15, MP 16), passa per F 14, sale sul torace fino alla fossa sovrasternale (VC 22) e termina a VC 23.",
              "Non ha rami secondari."
            ],
            principali: "R 9, MP 12, MP 13, MP 15, MP 16, F 14, VC 22, VC 23",
            aree: ["Torace", "Cuore"],
            alt: [
              ["posturali", ["Lombalgie", "Dolori ipocondriaci e toracici", "Dolori da accrescimento osseo, soprattutto alle ginocchia"]],
              ["organiche", ["Precordialgie, angina pectoris, dolori intercostali, epigastralgie", "Cefalea a casco con rigidità del collo", "Acne giovanile", "Disturbi del menarca, irregolarità mestruale, disturbi della menopausa (scalmane, osteoporosi)", "Invecchiamento precoce"]],
              ["dello Shen", ["Agitazione, ansia, insonnia, depressione", "Eccessi e difetti della costituzione sanguigna"]]
            ],
            appunti: ["Controlla P-F (Pericardio-Fegato)."]
          }),
          straordinario({
            id: "yang-wei-mai", titolo: "Yang Wei Mai", pag: "78-84",
            mer: ["vescica", "vescica-biliare", "triplice-riscaldatore"],
            ap: "TR 5", acc: "Dai Mai", apAcc: "VB 41", trig: "Vento", gen: "Seconda",
            zona: "Parte dorsale del braccio", livello: "Yang Ming (Intestino Crasso – Stomaco)",
            chiave: "Zigomi", cranica: "Seni frontali e mascellari", denti: "14 – 24 – 34 – 44", cost: "Linfatica",
            info: [
              "Wei significa legare, unire: unisce tutti i meridiani Yang, perciò ha stretti rapporti con Du Mai. Presiede ai rapporti fra le parti superficiali del corpo e l'esterno (pelle, muscoli, mucose, vie aeree), in sinergia con Dai Mai. È un meridiano secondario della Vescica.",
              "Funzioni: collega e armonizza i meridiani e i livelli Yang, per cui risente delle energie perverse esterne; porta le energie ereditarie nelle zone Yang; presiede alla difesa esterna dalle energie cosmopatogene (freddo, vento, calore, umidità, secchezza, stasi), legato alla Wei Qi."
            ],
            decorso: [
              "Ramo principale: da V 63 sotto il malleolo laterale sale lungo la faccia laterale di gamba, anca e tronco fino alla spalla (IT 10, TR 15, VB 21), passa dietro, sale alla fronte (ST 8) dove incontra la Vescica Biliare a VB 13, prosegue da VB 13 a VB 20 sull'occipite, raggiunge la linea mediana e termina a VG 15 e VG 16.",
              "Non ha rami secondari."
            ],
            principali: "V 63, VB 35, IT 10, TR 15, VB 21, ST 8, VB 13 – VB 20, VG 16, VG 15",
            aree: ["Parte laterale delle gambe", "Schiena", "Parte laterale del collo", "Testa", "Occhi"],
            alt: [
              ["posturali", ["Dolori ipocondriaci", "Cervicalgia", "Lombosciatalgia"]],
              ["organiche", ["Fastidio per il freddo, brividi, febbre", "Meteoropatia", "Cefalee"]],
              ["dello Shen", ["Agitazione, torpore", "Ciclotimia, psicosi maniaco-depressive", "Claustrofobia", "Eccessi e difetti della costituzione linfatica"]],
              ["degli organi di senso", ["Vertigini", "Ipoacusia, acufeni", "Difficoltà visive"]]
            ],
            appunti: ["Controlla IC-S (Intestino Crasso-Stomaco).", "Ha il punto d'insorgenza a V 63."]
          }),
          straordinario({
            id: "yin-qiao-mai", titolo: "Yin Qiao Mai", alias: ["Vaso del Calcagno Yin"], pag: "86-92",
            mer: ["rene"],
            ap: "R 6", acc: "Ren Mai", apAcc: "P 7", trig: "Acqua", gen: "Seconda",
            zona: "Parte interna della coscia", livello: "Shao Yin (Rene – Cuore)",
            chiave: "Sinfisi pubica, ginocchio, caviglia", cranica: "Frontale", denti: "17 – 27 – 37 – 47", cost: "Melanconica",
            info: [
              "Qiao significa sollevare i piedi, alzarsi sulle punte, ma anche «equilibrio»: Vaso del Calcagno Yin, dall'osso che tiene in equilibrio il corpo. Forma un'unità funzionale con Yang Qiao: partono entrambi da sotto il malleolo e si incontrano a V 1. Equilibra i movimenti della parte Yin del corpo e prevale nella fase Yin del ritmo circadiano (sonno, riposo).",
              "Funzioni: controlla lo Yin — come diramazione del Rene porta energie ereditarie e liquidi verso l'alto, mentre Yang Qiao li porta verso il basso; nutre gli occhi (V 1), regolandone umidificazione, apertura e chiusura: in eccesso gli occhi tendono a chiudersi (sonnolenza), se in eccesso è Yang Qiao restano aperti (insonnia); controlla il tono muscolare dell'interno di cosce, anche e spalle (lo squilibrio dà rotazione interna del piede); con Yang Qiao presiede a diencefalo e midollo spinale. L'incrocio dei due lati ricorda la decussazione delle vie motorie."
            ],
            decorso: [
              "Ramo principale: dall'arco plantare dietro lo scafoide (R 2) raggiunge R 6 sotto il malleolo mediale, sale lungo la faccia mediale della gamba (R 8), accanto ai genitali, su addome e torace (ST 12), al collo (ST 9) e al volto fino a V 1, dove incontra Yang Qiao.",
              "Ramo secondario: da V 1 entra nel cervello e arriva a V 10."
            ],
            principali: "R 6, R 8, V 1", secondari: "ST 9, ST 12, R 2, V 10",
            aree: ["Parte interna delle gambe", "Addome", "Occhi"],
            alt: [
              ["posturali", ["Paresi spastica dei muscoli mediali degli arti inferiori con intrarotazione del piede e flaccidità dei laterali", "Lombalgia irradiata ai genitali"]],
              ["organiche", ["Affezioni oculari", "Fibromi uterini", "Ernie e algie addominali, meteorismo", "Epilessia, specie con crisi notturne"]],
              ["dello Shen", ["Agitazione (vuoto di Yin Qiao, pieno di Yang Qiao)", "Sonnolenza (pieno di Yin Qiao, vuoto di Yang Qiao)", "Insonnia, ipersonnia", "Eccessi e difetti della costituzione melanconica"]],
              ["degli organi di senso", ["Turbe del visus"]]
            ],
            appunti: ["Controlla R-C (Rene-Cuore).", "Nello schema del decorso il tratto R 2 – R 6 è segnato come ramo secondario."]
          }),
          straordinario({
            id: "yang-qiao-mai", titolo: "Yang Qiao Mai", alias: ["Vaso del Calcagno Yang"], pag: "94-99",
            mer: ["vescica"],
            ap: "V 62", acc: "Du Mai", apAcc: "IT 3", trig: "Monte", gen: "Seconda",
            zona: "Parte esterna della coscia", livello: "Tai Yang (Vescica – Intestino Tenue)",
            chiave: "Scapola, perone", cranica: "Occipite", denti: "12 – 22 – 32 – 42", cost: "Nervosa",
            info: [
              "Vaso del Calcagno Yang: in unità con Yin Qiao, sale lungo la faccia laterale della coscia a VB 29 e IT 10, collegando anca e spalla, poi lungo collo e volto fino a V 1. Equilibra i movimenti della parte Yang del corpo e prevale nella fase Yang del ritmo circadiano (veglia, attività).",
              "Funzioni: controlla lo Yang — come diramazione della Vescica porta energie ereditarie e liquidi verso il basso; nutre l'occhio con l'energia Yang e ne drena l'eccesso di liquidi (in eccesso: occhi che non si chiudono, insonnia); controlla l'attività motoria connettendo scapolo-omerale e coxo-femorale e la contrattilità volontaria (la mancanza di agilità è il segno tipico; lo squilibrio dà rotazione esterna del piede, camminata «a papera»); assorbe l'eccesso di Yang dalla testa (attacco cerebrovascolare, emiplegia, paralisi facciale, vertigini, afasia); con Yin Qiao presiede a diencefalo e midollo spinale."
            ],
            decorso: [
              "Ramo principale: da V 62 sotto il malleolo laterale (V 61, V 59) sale lungo la faccia laterale della gamba e l'ipocondrio fino a IT 10 vicino alla piega ascellare posteriore, gira attorno alla spalla (IC 15, IC 16), sale lungo il collo all'angolo della bocca (ST 4, ST 3, ST 1), passa lateralmente al naso fino a V 1, percorre la sutura parietale e termina a VB 20, dove entra nel cervello.",
              "Non ha rami secondari."
            ],
            principali: "V 62, V 61, V 59, VB 29, IT 10, IC 15, IC 16, ST 4, ST 3, ST 1, V 1, VB 20",
            aree: ["Parte laterale delle gambe", "Schiena", "Collo", "Testa", "Occhi"],
            alt: [
              ["posturali", ["Paresi spastica dei muscoli laterali degli arti inferiori con extrarotazione del piede e flaccidità dei mediali", "Lombosciatalgia, dolore e rigidità lombare", "Contratture, dolori muscolari e articolari"]],
              ["organiche", ["Affezioni oculari", "Ipogalattia", "Cefalee", "Epistassi", "Epilessia, specie con crisi diurne"]],
              ["dello Shen", ["Agitazione (vuoto di Yin Qiao, pieno di Yang Qiao)", "Sonnolenza (pieno di Yin Qiao, vuoto di Yang Qiao)", "Insonnia, ipersonnia", "Eccessi e difetti della costituzione nervosa"]],
              ["degli organi di senso", ["Turbe del visus", "Perdita di coscienza, coma", "Vertigini"]]
            ],
            appunti: ["Controlla V-IT (Vescica-Intestino Tenue).", "IT 10: subito sopra la piega ascellare.", "VB 29: sulla testa del femore."]
          })
        ]
      }
    ]
  });
})();
