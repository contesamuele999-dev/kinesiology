/* Manuale «I 9 Dolori del Cuore» — schede per manuali.js (formato descritto lì).
   Fonte: dispensa del corso di Monica Angelillo e Marco Rado + appunti a mano
   (le prime pagine del quaderno sono solo appunti e foto delle slide).
   `pag` = numero di pagina stampato sul manuale. Le vertebre si scrivono
   "C⁠7" (word joiner) così l'autolink non le scambia per il punto C 7. */
(function () {
  var ALTRE = { t: "Testare se vi sono altre correzioni da fare:", sub: ["7 Chiavi del Qi", "Meridiani Straordinari", "Figure a 8"] };
  var MODI = "Testare in che modo stimolare i punti: luce colorata, suono, digitopressione, magneti, solidi platonici, essenza floreale, olio essenziale…";

  /* Un Palazzo: teoria + i suoi quattro punti (Cuore, Pericardio, Mu, Yuan). */
  function palazzo(n, id, nome, ideo, o) {
    return {
      id: id, titolo: n + " · " + nome, alias: [nome].concat(o.alias || []),
      sotto: o.punti.join(" · "), pag: o.pag, meridiani: ["cuore", "maestro-cuore"].concat(o.mer),
      test: "Pettorale Clavicolare bilaterale con la persona in piedi sul foglio n. " + n + " del Quadrato Magico (" +
        o.colore + ", " + o.dir + "), rivolta a Sud. Si riequilibra il secondo Palazzo trovato.",
      voci: [["Trigramma / casella", ideo + " · " + o.dir + " · " + o.elem], ["Meridiano del quadrato", o.merQ],
             ["Temi", o.temi], ["Meridiano straordinario", o.straord],
             ["Focus", o.focus], ["Tema", o.tema], ["Connessione con il corpo", o.corpo]].concat(o.voci || []),
      info: o.info,
      tc: ["C 7 (porta dello Shen)", "Cuore: " + o.punti[0], "Pericardio: " + o.punti[1],
           "Mu: " + o.mu, "Yuan: " + o.yuan],
      appunti: o.appunti
    };
  }
  function visual(titolo, righe) { return { titolo: titolo, items: righe }; }

  (window.MANUALI = window.MANUALI || []).push({
    id: "cuore",
    titolo: "I 9 Dolori del Cuore",
    breve: "9 Dolori",
    sotto: "Cuore, Pericardio e i 9 Palazzi",
    autore: "Monica Angelillo · Marco Rado",
    intro: [
      "I «Nove Dolori del Cuore» non sono sintomi cardiaci: sono le nove sfide della vita che mettono in difficoltà il Cuore, sede dello Shen. Ogni sfida è un Palazzo (Jiu Gong) del Quadrato Magico ed è legata a un punto del Cuore (il cammino) e a uno del Pericardio (la resistenza).",
      "La procedura generale trova sul Quadrato Magico il Palazzo del dolore e un secondo Palazzo su cui lavorare; poi un format (VC 14 × VG 17 + PC 8) smista verso sette riequilibri: Flegma, Trasverso del Torace, Chong Mai / Yin Wei Mai, Zong Qi, 9 Fiori, Parassiti e Palazzo."
    ],
    capitoli: [
      {
        id: "teoria", titolo: "Il Cuore, lo Shen e i 9 Palazzi",
        schede: [
          {
            id: "nove-dolori", titolo: "I Nove Dolori del Cuore", sotto: "Le nove sfide del Mandato", pag: "1-3",
            meridiani: ["cuore", "maestro-cuore"],
            voci: [["Mandato (Ming)", "Serie di prove che capiteranno nella vita: non è un destino predeterminato, abbiamo il libero arbitrio di affrontarle e superarle o di subirle e restarne bloccati"],
                   ["Meridiano del Cuore", "I nove punti = il Cammino del Destino"],
                   ["Meridiano del Pericardio", "I nove punti = le resistenze al cambiamento interiore"],
                   ["Legge di Ohm (R. Utt)", "I × R = E · Atteggiamento × Resistenza / Attaccamento = Sentimenti / Emozioni"],
                   ["3 Dantian", "3 Palazzi ciascuno: inferiore = sopravvivenza, medio = interazione, superiore = differenziazione"]],
            info: [
              "La medicina cinese parla dei Nove Dolori del Cuore non per la sintomatologia cardiaca, ma per le questioni che mettono in difficoltà il Cuore come sede dello Shen (energia mentale-emotiva-spirituale). Sono le prove che l'individuo affronta durante la vita: se non le capisce e non le supera sviluppa blocchi e alterazioni psicologiche o fisiche, con sintomi in varie parti del corpo.",
              "Nella concezione taoista la vita è un racconto con le sue prove; i Nove Palazzi sono le nove prove principali per giungere alla Realizzazione, lungo il Destino nato dall'unione del Jing (energia genetica dei genitori) con lo Shen. Ogni volta che completiamo il Mandato lo Shen evolve; le sfide non superate si ripresentano, anche quelle che genitori e antenati non hanno risolto: l'evoluzione è di tutta la genealogia.",
              "Si chiamano 9 Palazzi perché l'imperatore aveva un palazzo per ognuna delle nove regioni dell'impero: uno per ogni direzione del Bagua (8 trigrammi) e uno centrale. Quando le sfide non si superano diventano i Nove Dolori del Cuore.",
              "Ogni difficoltà dipende dalla resistenza che si applica all'evento, che in realtà è la chiave per il livello di consapevolezza successivo: finché si applicano resistenza, sforzo e interferenza si incontrerà la stessa tipologia di situazioni e problemi. Il Tao significa appunto «cammino, via, sentiero».",
              "Avere desideri permette la manifestazione della vita; eliminare desideri, attaccamenti e resistenze permette di vedere il mistero oltre la manifestazione. Non esistono situazioni «dure» o «sfortunate»: sono ciò di cui quell'anima deve fare esperienza tramite il corpo (Shēn Ti 身体, il corpo come veicolo dello Spirito).",
              "Per liberare il Cuore dai suoi Dolori bisogna prima alleggerire il Pericardio dalle memorie di traumi e stress: prima dei 9 punti del Cuore si trattano i 9 punti del Pericardio e la struttura anatomica del Pericardio."
            ],
            appunti: [
              "Il Pericardio, con la sua durezza, vibra in modo diverso.",
              "È necessario sentire il dolore ma non soffrire: ascolto il dolore, lo vedo, lo sento, lo valuto. Ha senso avere un dolore quando succede qualcosa; se ho dolore quando va tutto bene è distruttivo.",
              "Le 9 sfide del Cuore sono le cause principali all'inizio di ogni problema: non sono un problema emotivo ma esistenziale, conflitti e condizioni che si ripetono continuamente nella vita.",
              "Lo spirito è anche la benedizione, quella goccia dorata che ci viene data per evolvere.",
              "L'autoimmune è uno che ha detto tanti no a se stesso e troppi sì agli altri."
            ]
          },
          {
            id: "shen-sangue", titolo: "Shen, sangue e i tre tesori", sotto: "Appunti del corso", pag: "appunti",
            meridiani: ["cuore", "rene", "milza", "polmone"],
            tabelle: [{ titolo: "I tre tesori", col: ["Tesoro", "Stato", "Livello", "Organi"], righe: [
              ["Shen", "Etereo, gassoso: nuvole / vapore", "Mentale, emotivo, spirituale", "Cuore"],
              ["Qi", "Liquido, dinamico: acqua", "Energetico", "Milza-Pancreas, Polmone"],
              ["Jing", "Solido, statico: neve / ghiaccio", "Genetico", "Reni"]
            ] }],
            info: [
              "Tutto ciò che è accaduto nel passato va portato nel presente e risolto nel presente, che subito dopo diventerà passato. Quando cambio il presente agisco nel passato e cambio il futuro. La pineale è uno strumento fatto per misurare il tempo.",
              "Medicina classica cinese = taoismo. Lo Shen è l'energia mentale-emotiva-spirituale.",
              "Il sangue è colui che contiene lo Shen; le emozioni (emo-zioni) sono movimento di sangue. Il calore del sangue è l'unità di misura per capire se uno è in iper o in ipo.",
              "«Accorato»: sembra che si arrabbi, in realtà aumenta il calore e aumenta la sensibilità. Il Cuore si manifesta nella lingua.",
              "Lo Shen che scende dal Cielo è incompleto, e noi con il nostro corpo gli permettiamo di fare esperienza: Shen (Cielo) – essere umano – Jing (Terra).",
              "Dobbiamo unire Po, Hun e Shen: il Po, anima del Polmone, torna nella terra; lo Hun, anima del Fegato, sopravvive alla morte ed è individuale; lo Shen, del Cuore, torna al Cielo."
            ]
          },
          {
            id: "cuore-pericardio", titolo: "Cuore e Pericardio", sotto: "I 9 punti e il numero 9", pag: "4-5",
            meridiani: ["cuore", "maestro-cuore"],
            voci: [["Xin Bao", "«Rete che avvolge il Cuore»: contenitore, chiude, protegge"],
                   ["Xin Zhu", "«Ciò attraverso cui il Cuore comanda»: mezzo, apre"],
                   ["Cuore", "Azione / movimento"], ["Pericardio", "Reazione agli stimoli esterni"],
                   ["PC 8 · Lao Gong", "Palazzo dello Sforzo (della Fatica)"]],
            liste: [{ titolo: "Le sfide dei 9 Palazzi", items: ["Salute e famiglia", "Abbondanza e prosperità", "Fama e reputazione",
              "Relazioni e amore", "Creatività e figli", "Persone di aiuto e viaggi", "Conoscenza e carriera", "Saggezza", "Ritorno a casa"] }],
            info: [
              "I meridiani del Cuore e del Pericardio sono legati ai 9 Palazzi (Jiu Gong): il nove viene dalla numerologia e coincide con il numero dei punti dei due meridiani. Ogni Palazzo comporta uno sforzo, una prova, che può dare affanno, preoccupazione, disarmonia: un «dolore del Cuore», in relazione a un punto del Cuore o del Pericardio. I nove Palazzi sono le tappe da conseguire nella vita.",
              "PC 8 ha lo stesso ideogramma di Palazzo: è il punto attorno al quale si chiudono le mani, il «Palazzo dello sforzo». Lao contiene in alto i due fuochi, Huo (fuoco sovrano e fuoco ministeriale), in basso Li, «forza, sforzo»: si traduce anche sfinimento. È lo sforzo che si impiega nella vita per raggiungere gli obiettivi.",
              "9 è il numero base: nessun meridiano ha meno di 9 punti, forse in origine erano 9 per tutti. L'Intestino Tenue, accoppiato al Cuore, ne ha 18 (9 × 2), oggi 19 per l'annessione di IT 17, che in origine era sulla Vescica Biliare.",
              "Il 9 è il numero del completamento, dispari, Yang (azione); i pari sono Yin (nutrizione, riposo). Il massimo Yang è associato al minimo Yin (9 – 2), il minimo Yang al massimo Yin (1 – 8). Ogni linea di 3 numeri del quadrato magico dà 15.",
              "3 e 4 sono Legno, 9 e 2 Fuoco, 6 e 7 Metallo, 1 e 8 Acqua, 5 Terra. La Terra è anche la transizione tra Yin e Yang: tra Fuoco e Metallo con il 2, tra Acqua e Legno con l'8."
            ],
            appunti: [
              "Il 9 è il numero perfetto per la completezza.",
              "I punti del Pericardio sono punti di difficoltà, come tanti ostacoli.",
              "Il Pericardio è come una porta: Xin Bao chiude, Xin Zhu apre."
            ]
          },
          {
            id: "quadrato-magico", titolo: "Il Quadrato Magico", sotto: "Cielo posteriore · ordine di test", pag: "5, 67, 75",
            tabelle: [{ titolo: "Le nove caselle", col: ["N.", "Palazzo", "Direzione", "Colore del foglio", "Meridiano", "Elemento", "Ordine di test"], righe: [
              ["3", "Salute (Famiglia)", "Est", "Verde", "VB", "Legno Yang", "1°"],
              ["4", "Abbondanza", "Sud-Est", "Viola", "F", "Legno Yin", "2°"],
              ["9", "Reputazione / Fama / Prosperità", "Sud", "Rosso", "IT", "Fuoco Yang", "3°"],
              ["2", "Relazioni", "Sud-Ovest", "Rosa", "PC", "Fuoco Yin", "4°"],
              ["7", "Creatività (Figli)", "Ovest", "Bianco", "IC", "Metallo Yang", "5°"],
              ["6", "Viaggi (Persone di aiuto)", "Nord-Ovest", "Grigio", "P", "Metallo Yin", "6°"],
              ["1", "Carriera", "Nord", "Nero", "V", "Acqua Yang", "7°"],
              ["8", "Saggezza / Conoscenza", "Nord-Est", "Blu", "R", "Acqua Yin", "8°"],
              ["5", "Casa (Ritorno a Casa)", "Centro", "Giallo", "ST-MP", "Terra", "9°"]
            ] }],
            info: [
              "Il quadrato magico è quello del Cielo Posteriore. Disposizione: in alto (Sud) 4 – 9 – 2, al centro 3 – 5 – 7, in basso (Nord) 8 – 1 – 6.",
              "Il Bagua (feng shui) associa a ogni direzione un ambito di vita: Sud fama (Li, fuoco), Sud-Ovest relazioni e matrimonio (K'un), Ovest figli e creatività (Tui), Nord-Ovest persone di aiuto e viaggi (Ch'ien), Nord carriera (K'an, acqua), Nord-Est conoscenza e spiritualità (Kên), Est famiglia (Chên, legno), Sud-Est ricchezza e abbondanza (Sun), centro la Casa (Terra, giallo)."
            ],
            appunti: ["Il manuale stampato chiama il n. 1 «Conoscenza» e l'8 «Saggezza»: corretto a mano in 1 = Carriera, 8 = Saggezza e conoscenza, 9 = Prosperità e reputazione."]
          },
          {
            id: "rimedi-shen", titolo: "Rimedi per lo Shen e il sangue", sotto: "Appunti del corso", pag: "32, 76",
            info: [
              "Per tonificare lo Shen e ripulire il sangue: Boswellia, Angelica arcangelica (si trova dell'Arcangea).",
              "Tonico del Cuore: Leonurus cardiaca.",
              "Per fortificare i reni: solidago dell'Arcangea (appunto: «Eugenia solidago»), spalmata sulla bassa schiena."
            ]
          }
        ]
      },
      {
        id: "procedura", titolo: "Procedura generale",
        schede: [
          {
            id: "procedura-generale", titolo: "Procedura generale dei 9 Dolori", sotto: "Quadrato Magico e format", pag: "67-68",
            meridiani: ["cuore", "maestro-cuore"],
            test: "Pettorale Clavicolare bilaterale (entrambi insieme) con la persona in piedi; se dà C.I. riequilibrare prima questi muscoli.",
            voci: [["Format", "VC 14 (allarme del Cuore) × VG 17 (Porta del Cervello) + PC 8 (Palazzo dello Sforzo) — «NeuroCardiologia»"],
                   ["Primo Palazzo", "Il Dolore del Cuore: non si lavora direttamente su di lui"],
                   ["Secondo Palazzo", "Il Palazzo su cui si fa il riequilibrio"]],
            passi: [
              { t: "Disporre per terra il Quadrato Magico con la corretta disposizione:", sub: ["n. 3 (verde) a Est", "n. 4 (viola) a Sud-Est", "n. 9 (rosso) a Sud", "n. 2 (rosa) a Sud-Ovest", "n. 7 (bianco) a Ovest", "n. 6 (grigio) a Nord-Ovest", "n. 1 (nero) a Nord", "n. 8 (blu) a Nord-Est", "n. 5 (giallo) al centro"] },
              "Ogni numero corrisponde a un Palazzo.",
              "Testare entrambi i Pettorali Clavicolari contemporaneamente, con la persona in piedi. Se c'è un C.I., riequilibrare questi muscoli.",
              "Far salire la persona sul n. 3, con la parte anteriore del corpo rivolta verso Sud.",
              { t: "Testare entrambi i Pettorali Clavicolari contemporaneamente:", sub: ["se c'è un C.I., quello è il Palazzo / Dolore del Cuore da riequilibrare;", "se non c'è, testare uno alla volta tutti i Palazzi facendo salire la persona sul foglio, in senso orario: 3 – 4 – 9 – 2 – 7 – 6 – 1 – 8 – 5."] },
              "Mettere in circuito il Cambio d'Indicatore e ritestare tutti i Palazzi nello stesso senso orario, per trovare quale Palazzo rinforza il Muscolo Indicatore.",
              "Questo secondo Palazzo trovato è quello su cui si fa il riequilibrio.",
              "Leggere il significato del primo Palazzo trovato: rappresenta il Dolore del Cuore. Non si può lavorare direttamente su questo Palazzo.",
              "Leggere il significato del secondo Palazzo: è anch'esso uno squilibrio, una difficoltà, ma se la persona riesce a superarlo potrà superare anche il Dolore del Cuore.",
              "Con la persona sdraiata sul lettino mettere in circuito il format VC 14 × VG 17 + PC 8.",
              { t: "Testare con quale protocollo continuare:", sub: ["Riequilibrio del Flegma — ST 40", "Riequilibrio del Trasverso del Torace — Modo Muscolo Specifico × VC 17", "Riequilibrio dei meridiani Chong Mai o Yin Wei Mai — MP 4 e PC 6", "Riequilibrio dell'energia Zong Qi — TR 7 a sinistra", "Riequilibrio dei 9 Fiori — VC 14", "Riequilibrio dei Parassiti — F 5", "Riequilibrio del Palazzo — C 7"] }
            ],
            appunti: [
              "Dove ho il C.I. avrò il dolore: metto in circuito il primo Palazzo che dà la priorità; il secondo sarà un problema secondario che toglie energia al primo, e lavoreremo solo il secondo.",
              "Accanto ai protocolli è annotato a mano un ordine: 1° Parassiti, 2° Trasverso del Torace, 3° Flegma (una freccia collega questi due), 4° Zong Qi, 5° Chong Mai / Yin Wei Mai, 6° 9 Fiori, 7° Palazzo.",
              "Per i Palazzi del Cuore si lavora prima con il Flegma, i cui problemi la persona non conosce; poi si considera se nel sangue c'è Freddo o Caldo."
            ]
          }
        ]
      },
      {
        id: "palazzi", titolo: "I 9 Palazzi",
        schede: [
          palazzo(1, "carriera", "Palazzo della Carriera", "坎宫 K'an", {
            pag: "6-7", punti: ["C 1", "PC 9", "VC 3", "V 64"], mu: "VC 3", yuan: "V 64", mer: ["vescica"],
            colore: "nero", dir: "Nord", elem: "Acqua Yang", merQ: "Vescica (V)",
            temi: "Corso della vita, occupazione, fare la cosa giusta al momento giusto, fiducia nel comando, essere nella corrente",
            straord: "Chong Mai: va al Cuore, che ospita lo Shen, e scende fino alle gambe (l'azione, muoversi verso ciò che si desidera)",
            focus: "Carriera, scopo e resilienza", tema: "Adattabilità, flusso, capacità di affrontare le sfide della vita",
            corpo: "Reni, orecchie, apparato riproduttivo",
            voci: [["Aspetti somatici", "Il sistema nervoso tra attivazione (risposta efficace) e ripristino (risposta affettiva)"]],
            info: [
              "Deve superarsi a questo livello chi non riconosce che ogni esperienza vissuta lo ha portato in modo perfetto a essere ciò che è ora, e non supera il giudizio su ciò che è stato, i rimpianti e i rimorsi.",
              "Entriamo nel flusso della vita solo se seguiamo la voce interiore e abbiamo il coraggio di fare ciò per cui siamo qui: «carriera» è più del successo professionale. Non conta cosa si fa, ma se lo si fa con dedizione e gioia.",
              "Il Palazzo coinvolge anche la volontà della società di facilitare la realizzazione (istruzione, risorse, determinazione). Non è un lavoro ma un'occupazione che nutre l'anima e dà abbondanza e autostima. Problemi tipici: sentirsi intrappolati in un lavoro che non sfrutta i propri talenti, o perdere un lavoro amato.",
              "Pratiche somatiche come la terapia del movimento o la definizione consapevole degli obiettivi incoraggiano adattabilità e perseveranza."
            ]
          }),
          palazzo(2, "relazioni", "Palazzo delle Relazioni", "坤宫 K'un", {
            pag: "8-9", punti: ["C 2", "PC 8", "VC 17", "PC 7"], mu: "VC 17", yuan: "PC 7", mer: [],
            colore: "rosa", dir: "Sud-Ovest", elem: "Fuoco Yin", merQ: "Pericardio (PC)",
            temi: "Relazioni sociali e matrimonio, migliore amico, vicini, rapporto con gli altri, socio d'affari",
            straord: "Yang Qiao Mai: si occupa del presente e di come ci si apprezza",
            focus: "Relazioni, collaborazioni, connessioni; nutrimento e radicamento", tema: "Passione, gioia e comunicazione",
            corpo: "Addome, funzioni digestive, energia di radicamento",
            voci: [["Aspetti somatici", "La connessione emotiva e la capacità di sintonizzarsi con gli altri"]],
            info: [
              "Le relazioni iniziano alla nascita con i genitori e si espandono a famiglia, amici, partner. Rispetto a Maslow (bisogno di essere amati) la visione cinese è meno emotiva: si cercano relazioni con il mondo che permettano di realizzare il proprio destino (un asceta può scegliere di stare solo). Le relazioni sono una questione di fuoco.",
              "Chi ha difficoltà qui può mettere da parte i propri bisogni pur di restare in una relazione, oppure non accettare gli altri; può avere perfino problemi a stare in piedi perché emotivamente non riesce a farsi valere. L'accettazione di sé è la chiave. Riguarda anche chi vive di brame, attaccamenti e aspettative verso il prossimo.",
              "Come la Terra, il trigramma più femminile, si tratta di apertura e disponibilità: problemi con vicini, partner, colleghi o soci; uno squilibrio può dare anche problemi di fertilità, di gravidanza, di salute delle donne.",
              "Simbolismo: armonia in famiglia e legami ancestrali. Respirazione focalizzata sul cuore ed esercizi relazionali coltivano gioia e intimità."
            ]
          }),
          palazzo(3, "famiglia-salute", "Palazzo della Famiglia e della Salute", "震宫 Chên", {
            pag: "10-11, 24", alias: ["Palazzo della Salute"], punti: ["C 3", "PC 7", "VB 24", "VB 40"], mu: "VB 24", yuan: "VB 40", mer: ["vescica-biliare"],
            colore: "verde", dir: "Est", elem: "Legno Yang", merQ: "Vescica Biliare (VB)",
            temi: "Genitori, avi, superiori",
            straord: "Dai Mai: ponte tra Qi prenatale e postnatale, ideale per condizioni costituzionali o ereditarie",
            focus: "Famiglia, crescita, vitalità; legami e modelli di attaccamento", tema: "Connessione, radici, armonia",
            corpo: "Fegato e piedi",
            voci: [["Aspetti somatici", "I modelli di attaccamento formati nella prima infanzia e la loro influenza sulle relazioni"]],
            info: [
              "Chi vive spesso condizioni di salute precarie, o ha l'altrui malattia come tema portante della vita, deve confrontarsi con questa prova e trovare la Via e la pace.",
              "Chi è vissuto prima di noi (genitori, nonni, ma anche capo, superiori, promotori) corrisponde al tuono che precede la tempesta: «famiglia» in senso ampio.",
              "Da neonati la salute è responsabilità dei genitori, da adulti è nostra (scelte di vita, alimentazione, esercizio, riposo). L'approccio dei Nove Dolori è appropriato solo per problemi di salute a lungo termine o costituzionali.",
              "Esercizi condivisi in sicurezza, narrazione somatica e costellazioni familiari approfondiscono il senso di appartenenza."
            ],
            appunti: ["Mu e Yuan come da tabella di pag. 24 corretta a mano (VB 24, VB 40, coerente con il quadrato: 3 = VB). La pagina di foto dei punti (pag. 11) riporta invece F 14 e F 3, che la tabella assegna al Palazzo dell'Abbondanza."]
          }),
          palazzo(4, "abbondanza", "Palazzo dell'Abbondanza", "巽宫 Sun", {
            pag: "12-13, 24", punti: ["C 4", "PC 6", "F 14", "F 3"], mu: "F 14", yuan: "F 3", mer: ["fegato"],
            colore: "viola", dir: "Sud-Est", elem: "Legno Yin", merQ: "Fegato (F)",
            temi: "«Ricchezza» interiore ed esteriore, soddisfazione, circostanze felici, denaro",
            straord: "Yang Wei Mai: collega tutti i palazzi e libera energia per un atteggiamento di abbondanza",
            focus: "Abbondanza, risorse e opportunità", tema: "Crescita, espansione, opportunità",
            corpo: "Cosce e flessibilità",
            voci: [["Aspetti somatici", "Il rapporto con la sicurezza materiale e il flusso energetico"]],
            info: [
              "Si armonizza a questo Palazzo chi sente di non avere mai davvero il necessario per la vita che lo porti dove il suo Cuore batte.",
              "Abbondanza è avere abbastanza per vivere comodamente (cibo, vestiti, riparo) ed è un atteggiamento di soddisfazione per ciò che si ha. Quando si indebolisce si perde il senso di adeguatezza e ci si sente spinti ad acquisire o a mangiare sempre di più.",
              "Chi non è riuscito a creare abbondanza può avere problemi digestivi, soprattutto umidità; l'umidità si manifesta anche come mancanza di orientamento: non si vede attraverso la nebbia.",
              "Non è solo denaro: un conflitto qui può dare una mancanza permanente di denaro, ma anche problemi in altri settori e impedire il senso di «ricchezza interiore» (salute, contatti umani, riconoscimento, buoni presagi). Radicamento e diario della gratitudine trasformano la contrazione in espansività."
            ],
            appunti: [
              "Punto del Pericardio: PC 6, come da tabella di pag. 24; la pagina di foto (pag. 13) stampa «Pc 7» ma la foto indica PC 6.",
              "Mu e Yuan come da tabella corretta a mano (F 14, F 3, coerente con il quadrato: 4 = F). La pagina di foto riporta invece VB 24 e VB 40."
            ]
          }),
          palazzo(5, "ritorno-a-casa", "Palazzo del Ritorno a Casa", "中宫 centro", {
            pag: "14-15", alias: ["Palazzo della Vita"], punti: ["C 5", "PC 5", "VC 12 / F 13", "ST 42 / MP 3"], mu: "VC 12 (Stomaco) / F 13 (Milza)", yuan: "ST 42 (Stomaco) / MP 3 (Milza)", mer: ["stomaco", "milza"],
            colore: "giallo", dir: "Centro", elem: "Terra", merQ: "Stomaco – Milza-Pancreas (ST-MP)",
            temi: "Salute, vitalità, unione e integrazione, trovare il centro interiore, equilibrio e armonia",
            straord: "—", focus: "Vitalità, integrazione, equilibrio del nucleo", tema: "Stabilità, radicamento, coerenza",
            corpo: "Stomaco e Milza",
            voci: [["Aspetti somatici", "Detto anche Palazzo della Vita: centro del Bagua, fondamento di tutti gli altri palazzi; omeostasi e resilienza"]],
            info: [
              "È lo stato di coscienza in cui la persona ha compreso il meccanismo organizzatore della Vita e non ha più bisogno di prove o eventi per sentirsi completa.",
              "Le arti marziali traggono forza dal centro del corpo (basso ventre); allo stesso modo il centro della casa (Tai Chi) va lasciato libero: niente muri, camini, ripostigli o scale, buona luce, un cristallo al centro del soffitto. Se manca, si creano «centri sostitutivi» in altre due stanze. Un centro libero dà sicurezza interiore e aiuta la guarigione; se è bloccato la vita si estende solo ai margini.",
              "Casa significa accettare che tutto abbia un lieto fine; tornare a casa è l'idea di morire e tornare al Tao. Non serve trattamento se la persona ha superato le sfide degli altri palazzi; altrimenti si individua il palazzo che dà più problemi e si aiuta la persona con quello."
            ]
          }),
          palazzo(6, "viaggi", "Palazzo dei Viaggi e delle Persone di Aiuto", "乾宫 Ch'ien", {
            pag: "16-17", punti: ["C 6", "PC 4", "P 1", "P 9"], mu: "P 1", yuan: "P 9", mer: ["polmone"],
            colore: "grigio", dir: "Nord-Ovest", elem: "Metallo Yin", merQ: "Polmone (P)",
            temi: "Sostegno da fuori e verso l'esterno per mezzo del dare e ricevere, viaggi",
            straord: "Yin Qiao Mai: dà la forza di adattarsi alle nuove situazioni",
            focus: "Sistemi di supporto ed esplorazione", tema: "Mentoring, guida, movimento, esplorazione",
            corpo: "Testa, cervello, intestino crasso",
            voci: [["Aspetti somatici", "Come cerchiamo e riceviamo supporto e ci relazioniamo con nuovi ambienti"]],
            info: [
              "È l'energia attraverso cui entrano i regali del cielo: buoni consigli, conoscenze «casuali», collaboratori validi, aiuto dal mondo spirituale; ma anche la disponibilità ad aiutare altre persone, istituzioni o una buona causa.",
              "È anche il Palazzo dell'Avventura: il desiderio di uscire dai confini della famiglia o di una relazione, di non restare bloccati nella routine (viaggiare, nuovi cibi, una lingua straniera, persone diverse).",
              "Un conflitto qui indica spesso problemi con autorità e superiori; colpisce soprattutto gli uomini. Ben equilibrato porta a un comportamento caritatevole, fortuna e benessere. Rituali di radicamento prima di un viaggio aiutano ad allargare la zona di comfort."
            ]
          }),
          palazzo(7, "creativita", "Palazzo della Creatività e dei Figli", "兑宫 Tui", {
            pag: "18-19", punti: ["C 7", "PC 3", "ST 25", "IC 4"], mu: "ST 25", yuan: "IC 4", mer: ["intestino-crasso"],
            colore: "bianco", dir: "Ovest", elem: "Metallo Yang", merQ: "Intestino Crasso (IC)",
            temi: "Idee, progetti, filiali e succursali",
            straord: "Yin Wei Mai (bilancia qi e sangue esauriti dal pensiero del futuro) e Yin Qiao Mai (la forma per mantenere l'orientamento e la flessibilità per creare)",
            focus: "Espressione, eredità, nutrimento, creatività, comunicazione", tema: "Creatività, gioco, continuità: il bambino interiore",
            corpo: "Polmoni e bocca",
            info: [
              "Un tempo la creatività era avere figli: un figlio ti rende eterno. In senso ampio è tutto ciò che produci e può durare oltre la tua vita (arte, musica, invenzioni, aziende): ciò di cui sarai orgoglioso alla fine.",
              "Problemi qui: insoddisfazione per le scelte dei figli, difficoltà a portare a termine i progetti, sognare a occhi aperti di lasciare il segno. Deve superare questa prova chi cerca l'invisibilità in nome di una vita «tranquilla», chi fugge dall'impegno nel mondo o chi vive per la fama: si tratta di lasciare traccia di sé in favore del prossimo.",
              "La vita non è solo lavoro ma anche celebrazione. Un Palazzo in conflitto porta a sperperare denaro, pensieri frivoli, lamentele, litigi e un rapporto troppo flessibile con la verità; ben equilibrato dà piacere di vivere, disinvoltura, eloquenza e inclinazione ai successi finanziari.",
              "Gioco somatico, arti espressive e movimento improvvisato nutrono le creazioni e la generazione successiva."
            ]
          }),
          palazzo(8, "saggezza", "Palazzo della Saggezza", "艮宫 Kên", {
            pag: "20-21", alias: ["Palazzo della Conoscenza"], punti: ["C 8", "PC 2", "VB 25", "R 3"], mu: "VB 25", yuan: "R 3", mer: ["rene"],
            colore: "blu", dir: "Nord-Est", elem: "Acqua Yin", merQ: "Rene (R)",
            temi: "Studio, scuola, conoscenza psicologica, contemplazione, meditazione, lavoro su se stessi",
            straord: "Ren Mai (Vaso Concezione): consolida il qi necessario per risolvere i problemi",
            focus: "Immobilità, apprendimento, crescita, neuroplasticità", tema: "Riflessione, immobilità, crescita: neurogenesi e integrazione di nuove esperienze",
            corpo: "Mani, schiena e ossa",
            info: [
              "La saggezza si evolve soddisfacendo gli altri palazzi: è autosufficienza e accettazione, sentirsi a proprio agio con se stessi, sapere che qualunque cosa accada si saprà gestirla.",
              "Deve lavorare qui chi fatica a trovare il senso della propria esistenza, chi non riconosce il distillato di ciò che ha vissuto e il filo che collega ogni aspetto della sua esperienza.",
              "Come i saggi si ritiravano nelle cavità della montagna, dovremmo ritirarci nelle stanze interiori per capire chi siamo e lo scopo della vita: servono silenzio e pace. Diario e riflessione meditativa attivano la corteccia prefrontale."
            ]
          }),
          palazzo(9, "fama", "Palazzo della Fama e Reputazione (Prosperità)", "离宫 Li", {
            pag: "22-23", alias: ["Palazzo della Prosperità"], punti: ["C 9", "PC 1", "VC 4", "IT 4"], mu: "VC 4", yuan: "IT 4", mer: ["intestino-tenue"],
            colore: "rosso", dir: "Sud", elem: "Fuoco Yang", merQ: "Intestino Tenue (IT)",
            temi: "Considerazione e stima, saggezza, illuminazione",
            straord: "Du Mai (Vaso Governatore): il meridiano più yang, dimora del fuoco Ming Men, tratta la prosperità",
            focus: "Riconoscimento ed espressione di sé", tema: "Visibilità, luce, autenticità",
            corpo: "Occhi e Cuore",
            voci: [["Due letture", "Confuciana = Fama; taoista = Prosperità"]],
            info: [
              "Prosperità: deve superare questa prova chi si trova spesso a provvedere all'altrui povertà vivendolo come un'ingiustizia invece che come un dono e un'opportunità. A differenza dell'abbondanza, la prosperità implica dare piuttosto che acquisire, e un senso di movimento: ciò che fai porta frutto, ti senti generoso. Se ti senti avaro, o che gli altri si approprino del tuo tempo o delle tue energie, hai problemi di prosperità.",
              "Fama e reputazione: il 9 è l'apice dello sviluppo, dove raggiungere chiarezza e un po' di saggezza; la luce del Fuoco risplende attraverso di noi (persona «illuminata», «raggiante») e ispira gli altri. Per chi ha un ruolo pubblico è la considerazione altrui.",
              "Un conflitto qui significa lasciarsi influenzare molto dall'opinione altrui, con un'autocoscienza instabile; ben equilibrato dà una buona immagine pubblica e la conoscenza di aspetti profondi della vita. Allineamento posturale ed esercizi vocali rafforzano la fiducia in sé."
            ]
          }),
          {
            id: "riequilibrio-palazzo", titolo: "Procedura di riequilibrio del Palazzo", sotto: "C 7", pag: "24, 74",
            meridiani: ["cuore", "maestro-cuore"],
            test: "C 7 in circuito (porta dello Shen).",
            passi: [
              "Mettere in circuito C 7.",
              "Stimolare C 7 (bilaterale) per accedere al Cuore.",
              "Stimolare il punto del meridiano del Cuore corrispondente al secondo Palazzo trovato.",
              "Stimolare il punto del meridiano del Pericardio corrispondente al secondo Palazzo trovato.",
              "Stimolare il Mu (punto d'allarme) del meridiano corrispondente al secondo Palazzo trovato.",
              "Stimolare il punto Yuan del meridiano corrispondente al secondo Palazzo trovato.",
              ALTRE
            ],
            tc: ["C 7 bilaterale", "punto del Cuore, del Pericardio, Mu e Yuan del Palazzo"],
            tabelle: [{ titolo: "Punti dei Palazzi", col: ["Palazzo", "Cuore", "Pericardio", "Mu", "Yuan"], righe: [
              ["1 Carriera", "C 1", "PC 9", "VC 3", "V 64"],
              ["2 Relazioni", "C 2", "PC 8", "VC 17", "PC 7"],
              ["3 Salute", "C 3", "PC 7", "VB 24", "VB 40"],
              ["4 Abbondanza", "C 4", "PC 6", "F 14", "F 3"],
              ["5 Ritorno a Casa", "C 5", "PC 5", "VC 12 / F 13", "ST 42 / MP 3"],
              ["6 Viaggi", "C 6", "PC 4", "P 1", "P 9"],
              ["7 Creatività", "C 7", "PC 3", "ST 25", "IC 4"],
              ["8 Saggezza / Conoscenza", "C 8", "PC 2", "VB 25", "R 3"],
              ["9 Fama", "C 9", "PC 1", "VC 4", "IT 4"]
            ] }],
            appunti: [
              "C 7 = Shen Men, «porta dello Shen».",
              "Nella tabella stampata Mu e Yuan di Salute e Abbondanza sono cancellati e riscritti a mano: Salute VB 24 / VB 40, Abbondanza F 14 / F 3.",
              "Il Palazzo n. 1 è riscritto a mano «Carriera»; l'8 «Saggezza / conoscenza»."
            ]
          }
        ]
      },
      {
        id: "flegma", titolo: "Flegma",
        schede: [
          {
            id: "flegma-shen", titolo: "Flegma che causa disturbi allo Shen", pag: "25-26",
            meridiani: ["stomaco", "fegato", "milza", "maestro-cuore"],
            voci: [["Origine", "Eccesso alimentare, ma soprattutto il Fegato che invade Stomaco e Milza"],
                   ["Dove cercarlo", "Patina sulla lingua (parte posteriore), sinusite, grasso addominale e sui glutei, lipoma"],
                   ["Dove si accumula", "Nel Dai Mai"],
                   ["Flegma nel Pericardio", "Svalutazione di sé, autocritica, bassa autostima, fino all'autolesionismo e alla malattia autoimmune"]],
            info: [
              "Spesso, prima di riequilibrare un Palazzo, si scopre che la persona non è disponibile a coinvolgersi nel cambiamento e non riconosce che alla base dei suoi problemi c'è un'incapacità di trasformazione: è il Flegma, che impedisce la consapevolezza. Non si può cambiare ciò di cui non si è coscienti: il primo elemento su cui lavorare è il Flegma, che può essere espulso o trasformato (ammorbidito).",
              "Il cibo nutre lo Spirito ed è usato per consolare e calmare: mangiare troppo nasconde le emozioni e impedisce di affrontarle e trasformarle.",
              "Il Flegma che ostruisce il Cuore è legato al Fegato che controlla il diaframma, punto di passaggio di tutti i movimenti di energia. Fattori patogeni esterni e interni creano costrizione: il diaframma è alla base dei processi di stagnazione; Sangue e Liquidi ristagnano e formano Flegma. Per la medicina classica è il Fegato a produrre il Flegma (ma anche la Milza: entrambe le eziologie sono valide). Cambiare l'alimentazione resta importante.",
              "La stasi di Qi produce Calore: Flegma-Calore. Il Polmone non riesce a espettorarlo per la costrizione del diaframma, e il Flegma arriva al Cuore e al Pericardio. Il trattamento principale di un problema autoimmune è imparare a volersi bene."
            ],
            tabelle: [{ titolo: "Punti del Flegma che affligge il Cuore", col: ["Punto", "Azione"], righe: [
              ["ST 40", "Trasforma Flegma e Umidità (noduli, artrite, calcoli); calma lo Spirito (ansia, paura); armonizza lo Stomaco"],
              ["R 9", "Isola il Calore-Flegma con l'acqua; primo punto dello Yin Wei Mai, che «tratta i dolori del Cuore»"],
              ["PC 1", "Punto locale: apre e rilassa il torace, fa discendere il qi ribelle, trasforma il Flegma"],
              ["PC 5", "Umidità e Flegma; nutre il Cuore e calma lo Spirito; apre gli orifici del Cuore (afasia, sintomi maniaco-depressivi)"],
              ["C 3", "Dissipa il Flegma; attiva il meridiano del Cuore, elimina il Calore, agisce sul Pericardio (disordini mentali ed emotivi)"]
            ] }],
            appunti: [
              "Per trattare il diaframma devo trattare anche il Fegato, oltre al Polmone. Tutti i meridiani attraversano il diaframma: è alla base di tutte le stagnazioni ed è un organo con funzioni metaboliche fondamentali.",
              "I calcoli sono Flegma. Il deficit di Qi di Milza potrebbe essere genetico: nasciamo con uno scarso corredo enzimatico.",
              "Il Flegma rappresenta anche il condizionamento.",
              "Ideale usare tutti i punti senza testarli, trattandoli in sequenza. Punto principale ST 40 (Luo: crea movimento tra Stomaco e Milza).",
              "Su una donna posso usare R 26 al posto di PC 1, se non sto usando il suono.",
              "Stimolarli con suono, colore, moxa (dissipa l'umido, ma se il Flegma è avanzato lo peggiora), essenza floreale. La stimolazione va ripetuta più volte a settimana: do i punti da fare a casa."
            ]
          },
          {
            id: "procedura-flegma", titolo: "Procedura di riequilibrio del Flegma", sotto: "ST 40", pag: "27, 69",
            meridiani: ["stomaco", "rene", "maestro-cuore", "cuore"],
            test: "ST 40 in circuito.",
            passi: [
              "Mettere in circuito ST 40.",
              "Far fare alla persona dei respiri profondi e valutare la pesantezza / leggerezza del corpo e della testa.",
              MODI,
              "Stimolare ST 40 – R 9 – PC 1 (oppure R 26) – PC 5 – C 3.",
              "Testare se riequilibrare il Dai Mai, il Chong Mai o lo Yin Wei Mai.",
              "Testare se riequilibrare le 7 Chiavi del Qi (cono a gancio con aspetto emotivo).",
              "Cercare altre correzioni.",
              "Far rifare i respiri profondi e rivalutare la pesantezza / leggerezza del corpo e della testa."
            ],
            tc: ["ST 40", "R 9", "PC 1 (o R 26)", "PC 5", "C 3"],
            appunti: [
              "Dopo il passo 5: faccio poi la coordinata, annotata prima di fare la correzione.",
              "7 Chiavi del Qi: ne discuto con la persona e correggo con la correzione del cono a gancio."
            ]
          }
        ]
      },
      {
        id: "trasverso", titolo: "Trasverso del Torace e Pericardio",
        schede: [
          {
            id: "trasverso-torace", titolo: "Muscolo trasverso del torace", sotto: "Triangolare dello sterno", pag: "28-30",
            meridiani: ["maestro-cuore"],
            voci: [["Posizione", "Endotoracico, dietro lo sterno e le prime sei cartilagini costali"],
                   ["Origine", "Faccia posterolaterale di sterno e xifoide"],
                   ["Inserzione", "Cinque rami sul margine interno e inferiore della 2ª – 6ª cartilagine costale"],
                   ["Azione", "Prevalentemente espiratorio; abbassa debolmente le coste; partecipa alla rotazione del tronco"],
                   ["Innervazione", "Nervi intercostali corrispondenti"],
                   ["Catena", "Continua il trasverso dell'addome: catena miofasciale spirale anteriore"]],
            info: [
              "L'arteria toracica interna decorre parallela allo sterno e irrora la superficie diaframmatica: ipertrofia o rigidità del trasverso toracico possono comprimerla e alterare la funzione del diaframma.",
              "Chi ha accumulato emozioni trattenute, traumi irrisolti, paure e depressione può avere un trasverso toracico ipertonico o fibrotizzato. La sua retrazione irrigidisce le catene anteriori: gabbia toracica abbassata, cifosi dorsale, teste omerali anteposte, iperestensione cervicale alta; la gravità fa il resto, fino alla postura di chiusura dell'anziano (capo, scapole e omeri anteposti, ipercifosi, bacino retroverso, ginocchia e caviglie flesse).",
              "Si trova anche nei giovani: sport ad alta frequenza respiratoria, ragazze adolescenti, introversi in pubertà. Spesso con inspirazione affidata ai muscoli accessori (intercostali esterni, levatores costarum, scaleni, serrato posteriore superiore, SCOM, piccolo pettorale) e diaframma disfunzionale.",
              "Utile rendere più elastiche le catene anteriori (tendinomuscolari di Stomaco e Rene). Lo schema è tipico di chi sta alla scrivania o usa molto lo smartphone: sindrome crociata superiore (contratti suboccipitali, trapezio superiore, elevatore della scapola, pettorali; deboli flessori cervicali, trapezio medio e inferiore, romboidi, dentato anteriore), con disfunzioni atlanto-occipitale, C⁠4-C⁠5, C⁠7, gleno-omerale, T4-T5.",
              "Fra trasverso toracico e pericardio c'è un'importante sinergia anatomica e funzionale."
            ],
            appunti: [
              "Muscolo endotoracico che riunisce tutti i 5 elementi, avendo 5 «rami».",
              "Muscolo espiratore: se contratto limita l'espansione toracica.",
              "Slide del medio gluteo in tre divisioni: posteriore (Vescica Biliare), media (Utero / Prostata), anteriore (Polmoni)."
            ]
          },
          {
            id: "pericardio", titolo: "Il Pericardio", sotto: "Ministro del Cuore", pag: "31-32",
            meridiani: ["maestro-cuore", "fegato"],
            voci: [["Altri nomi", "Circolazione-Sesso, Pericardio, Ministro del Cuore (心包絡)"],
                   ["Legamenti", "Sternopericardici (avanti), cervico-pericardico (sopra), diaframma (sotto), vertebropericardico a C⁠7 (dietro)"],
                   ["Rami interni", "Uno circonda il Cuore; uno scende attraverso il diaframma a stomaco e intestino; uno esce lateralmente accanto al capezzolo"]],
            info: [
              "Le tensioni viscerali pericardio – diaframma – trasverso toracico possono influenzare la postura (cifosi, dolore al collo) e alcune funzioni (palpitazioni, reflusso) attraverso la relazione fascia – struttura – funzione.",
              "Xin Bao, «rete che avvolge il Cuore», ne sottolinea la funzione protettiva; Xin Zhu, «ciò attraverso cui il Cuore comanda», è la via con cui i desideri dell'imperatore (il Cuore, con dentro lo Shen) raggiungono il popolo (il corpo). Il Ministro del Cuore è una porta che apre (Xin Zhu) o chiude (Xin Bao) l'accesso al Cuore.",
              "Il Pericardio è la via verso il nostro Shen e il nostro destino, ma può essere stata chiusa dalla sofferenza: per riaprirla si lavora sul Ministro del Cuore per liberare la memoria delle emozioni trattenute e dei traumi.",
              "Ogni punto del Ministro del Cuore agisce sul pericardio e sul diaframma. Anche il Fegato è legato al diaframma: permette il flusso delle emozioni attraverso il sangue, nutrimento dello Shen. Il diaframma armonizza la libera circolazione di Qi, Sangue (Xué) e Liquidi (Jin Ye).",
              "Davanti a un'emozione troppo dolorosa il Fegato, per proteggere il Cuore, blocca il diaframma, accesso al «palazzo imperiale» (il petto): non si percepiscono le emozioni né il Sé ma solo l'Ego, si respira meno, si ha meno energia. Come difesa successiva il Pericardio blocca l'accesso allo Shen: si perde la percezione del Sé, e l'emozione di questo blocco è il panico, che può sfociare nel terrore."
            ],
            appunti: [
              "Cappella di San Severo a Napoli: le macchine anatomiche.",
              "Il Fegato determina il movimento del sangue, cioè le emozioni: detiene tutto il sangue del corpo e decide quanto metterne in circolo. È il magazzino del sangue e lo rilascia quando serve attraverso il Pericardio. La rabbia fa parte del sistema di sopravvivenza.",
              "Teoria dei sei livelli: PC e Fegato sono un'unità funzionale perché sono il medio yin del corpo, collegati allo Yin Wei Mai, che governa la costituzione sanguigna.",
              "Sintomi tipici del Fegato: problemi capillari, vene varicose, varicocele, flusso mestruale. Tutto ciò che è a carico venoso sotto l'ombelico è di Fegato, l'arterioso è di Pericardio.",
              "Autunno: pulizia di IC e P. Inverno: gestione degli orari e lavorare V e R, nutrire lo yin. Le tossine alcaline vanno nell'intestino, le acide nelle urine: in inverno alcalinizzare l'intestino."
            ]
          },
          {
            id: "shu-anteriori", titolo: "Punti Shu del dorso e Shu anteriori", sotto: "R 22 – R 26 sui rami del trasverso", pag: "33-38",
            meridiani: ["rene", "vescica"],
            tabelle: [
              { titolo: "Shu del dorso", col: ["Organo", "Punto", "Localizzazione"], righe: [
                ["Polmoni", "V 13", "1,5 cun lateralmente al bordo inferiore del processo spinoso di T3"],
                ["Cuore", "V 15", "1,5 cun lateralmente al processo spinoso di T5"],
                ["Fegato", "V 18", "1,5 cun lateralmente al processo spinoso di T9"],
                ["Milza", "V 20", "1,5 cun lateralmente al processo spinoso di T11"],
                ["Reni", "V 23", "1,5 cun lateralmente al processo spinoso di L3"]
              ] },
              { titolo: "Shu anteriori — quale palazzo (tabella operativa)", col: ["Punto", "Cielo Posteriore · 2 cun · test PC 6", "Cielo Anteriore · 0,5 cun · test MP 4", "Spazio intercostale"], righe: [
                ["R 26", "Intestino Crasso → 7 Figli; Polmoni → 6 Viaggi", "Vescica → 1 Carriera; Reni → 8 Conoscenza", "1°"],
                ["R 25", "Intestino Tenue → 9 Fama; Pericardio → 2 Relazioni", "Stomaco, Milza → 5 Casa", "2°"],
                ["R 24", "Vescica Biliare → 3 Salute; Fegato → 4 Abbondanza", "Vescica Biliare → 3 Salute; Fegato → 4 Abbondanza", "3°"],
                ["R 23", "Stomaco, Milza → 5 Casa", "Intestino Tenue → 9 Fama; Pericardio → 2 Relazioni", "4°"],
                ["R 22", "Vescica → 1 Carriera; Reni → 8 Conoscenza", "Intestino Crasso → 7 Figli; Polmoni → 6 Viaggi", "5°"]
              ] }
            ],
            liste: [{ titolo: "Funzioni sullo Shen", items: [
              "R 22: fare i passi per guardare nel proprio Cuore", "R 23: essere in sintonia con i propri propositi",
              "R 24: lasciar andare, sbloccare il Ling (anima)", "R 25: entrare in contatto con lo Shen",
              "R 26: entrare in sintonia con la Tian Qi (ambiente)", "R 27: accogliere dentro di sé le energie del mondo"
            ] }],
            info: [
              "Gli Shu posteriori (Bei Shu, ramo interno della Vescica, disposizione metamerica) sono descritti già nel Ling Shu e servono sia alla terapia sia alla diagnosi. Portano agli organi la Yuan Qi del Ming Men: si usano per «ricaricare» un organo in deficit. Sono più utili per i disturbi funzionali o organici con poche conseguenze psichiche.",
              "Gli Shu anteriori, fra R 22 e R 26, portano agli organi il Qi postnatale e il sangue del Chong Mai: muovono le stasi e ricaricano il sangue degli organi; hanno sempre indicazioni psichiche (ansia, agitazione) e un'efficacia psicosomatica più marcata. Il punto anteriore «controlla» il viscere accoppiato all'organo. Sono spesso dolorosi alla palpazione: un microsistema che collega l'essenza dei Reni agli organi attraverso il torace, sede dello Shen.",
              "R 22 (primo punto a 2 cun): tosse, asma, pienezza al torace, costrizione diaframmatica, ansia; i gradini per cominciare a guardarsi dentro. Ventre del trasverso sulla 6ª costa.",
              "R 23: tosse, asma, ristagni al seno e mastite, perdita della voce; tonifica il rene; «mente senza riposo» da vuoto di reni; sintonia con i propositi della vita. Ventre sulla 5ª costa.",
              "R 24: tosse, asma, mastite; ansia da deficit di reni; sostiene il Jing quando mancano le risorse per esprimere il potenziale; anima «seppellita» in una situazione che non si supera: il superamento è lasciar andare. Ventre sulla 4ª costa.",
              "R 25: dolore al torace; calma lo Shen; ha nel nome l'ideogramma Shen: comunicazione fra acqua e fuoco, per chi non sostiene lo Shen con l'essenza e ha problemi di autostima. Ventre sulla 3ª costa.",
              "R 26: eccesso energetico (scialorrea, tosse, vomito, reflusso), palpitazioni, tachicardia; discesa della Tian Qi: altrimenti ci si sente giudicati e criticati, suscettibili. Ventre sulla 2ª costa.",
              "I punti del rene sono anche del Chong Mai: la branca del rene a 2 cun tratta il livello postnatale (Cielo Posteriore); la seconda branca del Chong Mai, a 0,5 cun, il livello prenatale (Cielo Anteriore), aspetti genetici e congeniti: si apre con MP 4 e si accompagna con PC 6. Nel prenatale la dinamica Yin / Yang è opposta e la sequenza dei punti si inverte.",
              "Scoperta di Monica Angelillo e Marco Rado: questi punti, legati ai 5 Elementi, sono connessi ai 9 Palazzi. Trattare lo Shu anteriore del Palazzo in squilibrio sblocca il trasverso toracico, il Pericardio, il diaframma e la memoria del conflitto emotivo. Evento postnatale: punto a 2 cun (R 22 Reni, R 23 Milza, R 24 Fegato, R 25 Cuore, R 26 Polmoni). Evento prenatale: punto a 0,5 cun (R 22 Polmoni, R 23 Cuore, R 24 Fegato, R 25 Milza, R 26 Reni)."
            ],
            appunti: [
              "Nel testo di pag. 34-35 gli elementi dei punti sono scritti al contrario (es. «R 22 Metallo Cielo Posteriore – Acqua Cielo Anteriore»); la tabella operativa di pag. 37 e la figura di pag. 38 coincidono fra loro e sono quelle riportate sopra.",
              "I punti a mezza distanza (0,5 cun) sono anche punti del Chong Mai: Cielo Anteriore, si testa MP 4. Il Cielo Posteriore si testa con PC 6.",
              "I punti anteriori comandano il viscere; si trovano esattamente sui rami del trasverso del torace. I punti posteriori sono più funzionali.",
              "L'unione di Rene e Cuore è fondamentale per la gestione del Jing. Sublimazione: usiamo il nostro Jing per sostenere lo Shen."
            ]
          },
          {
            id: "procedura-trasverso", titolo: "Procedura del muscolo trasverso del torace", sotto: "Modo Muscolo Specifico × VC 17", pag: "39-40, 70",
            meridiani: ["maestro-cuore", "rene", "milza", "polmone", "vaso-concezione"],
            test: "Modo Muscolo Specifico + VC 17: un C.I. prioritario indica di riequilibrare il trasverso toracico.",
            passi: [
              "Mantenendo il Modo Muscolo Specifico toccare VC 17 e testare il Muscolo Indicatore.",
              "Se si ottiene un C.I. prioritario, riequilibrare il muscolo trasverso toracico.",
              "Far fare al cliente un paio di respiri profondi e valutare la tensione toracica, in inspirazione e in espirazione.",
              "Testare MP 4: se dà C.I. usare la sequenza degli Shu anteriori del Cielo Anteriore (0,5 cun dalla linea mediana).",
              "Testare PC 6: se dà C.I. usare la sequenza degli Shu anteriori del Cielo Posteriore (2 cun dalla linea mediana).",
              "Trovare il lato da riequilibrare palpando bilateralmente i due Shu anteriori del Palazzo in squilibrio: il lato più dolorante e congestionato.",
              { t: "Cielo Anteriore: prima di lavorare sul punto aprire il Chong Mai con MP 4 × PC 6.", sub: ["donne: MP 4 destro, PC 6 sinistro", "uomini: MP 4 sinistro, PC 6 destro"] },
              { t: "Cielo Posteriore: prima di lavorare sul punto aprire lo Yin Wei Mai con PC 6 × MP 4.", sub: ["donne: PC 6 destro, MP 4 sinistro", "uomini: PC 6 sinistro, MP 4 destro"] },
              "Riequilibrare PC 6 bilateralmente.",
              "Riequilibrare P 1 bilateralmente.",
              "Riequilibrare VC 17.",
              "Riequilibrare lo Shu anteriore dolorante.",
              "Riequilibrare direttamente il muscolo trasverso toracico.",
              "Correggere la costola corrispondente allo Shu anteriore con la tecnica a energia muscolare appropriata.",
              "Rivalutare la tensione toracica e la fluidità respiratoria."
            ],
            tc: ["MP 4 × PC 6 (apertura)", "PC 6 bilaterale", "P 1 bilaterale", "VC 17", "Shu anteriore dolorante (R 22 – R 26)"],
            appunti: [
              "La procedura va fatta tutta completa: è come una formula, tratto tutti i punti dei passi 11-14.",
              "I passi 9-10 sono l'apertura dei meridiani straordinari.",
              "PC 6: punto barriera, apre il torace, rilassa diaframma, pericardio, stomaco.",
              "P 1: punto locale del torace che rilassa trasverso, pericardio, diaframma.",
              "VC 17: punto mare del Qi, diffonde l'energia nel torace.",
              "Lo Shu anteriore è quello relativo al Palazzo trovato e al Cielo (anteriore o posteriore) che ho testato.",
              "Se esce di riequilibrare con il suono, userò il suono relativo al Palazzo che sto trattando."
            ]
          },
          {
            id: "coste", titolo: "Rilascio del trasverso e riequilibrio delle coste", sotto: "Tecnica a energia muscolare", pag: "41-44",
            info: [
              "Rilascio fasciale: cliente supino; una mano sulla metà inferiore dello sterno, sostenuta dall'altra, con l'immagine mentale dell'anatomia sotto la mano. Pressione sufficiente a mantenere il contatto, traslare lo sterno ipsilateralmente (entro limiti ragionevoli), favorire il rilassamento di torace, braccia e spalle. Mantenere fino al rilascio (di solito entro due minuti): meno resistenza, tessuti più cedevoli, respiro migliore. Ripetere i test pre-trattamento.",
              "Per la disfunzione costale legata a ciascun ramo del trasverso si mobilizzano le coste con attivazione muscolare, mettendo il braccio del cliente in posizioni diverse per superare la barriera ristretta. Ogni costa si ripete 5-7 volte, poi si riporta il cliente in posizione neutra e si rivalutano disfunzione, dolore del punto Shu, tensione toracica e respiro."
            ],
            liste: [
              { titolo: "2ª costa (scaleni, scaleno posteriore)", items: [
                "Cliente supino, mano sulla fronte; guarda leggermente verso il lato opposto a quello da bilanciare.",
                "Trovare C⁠7, T1 e T2, spostarsi lateralmente sull'aspetto superiore dell'angolo della 2ª costa e trazionare in basso e lateralmente.",
                "Contatto sulla mano del cliente (sopra la fronte), solo per non spingere direttamente sulla testa.",
                "Il cliente spinge la testa verso il soffitto: resistenza isometrica con la mano e resistenza costante in basso sull'angolo costale posteriore.",
                "Rilassare, 1-2 secondi di pausa, avanzare alla barriera successiva tirando la costa più in basso e lateralmente; ogni contrazione 3-5 secondi."
              ] },
              { titolo: "3ª – 5ª costa (piccolo pettorale, «maniglia di pompa»)", items: [
                "Cliente supino, mano sulla fronte (non serve girare la testa).",
                "Appoggiare e premere delicatamente il gomito verso il pavimento, sentendo la tensione sulle coste 3-5 e sulla costa ristretta.",
                "La mano più vicina scivola sotto il cliente e aggancia l'angolo superiore della costa ristretta.",
                "Il cliente spinge il gomito verso il soffitto per alcuni secondi contro resistenza isometrica, mentre si mantiene la trazione inferiore e laterale sulla costa.",
                "Rilassare, pausa 1-2 secondi, avanzare alla barriera successiva (e, se cede, avvicinare il gomito al tavolo)."
              ] },
              { titolo: "6ª costa (dentato anteriore)", items: [
                "Cliente supino, gomito a 90° con la mano sul petto; trovare il bordo superiore della 6ª costa.",
                "Spingere gomito e braccio verso il tavolo mantenendo i 90° (retrae la scapola e allunga il dentato), con trazione inferiore e laterale sulla costa.",
                "Il cliente solleva il gomito verso il soffitto (porta la costa in inspirazione): impedire il movimento con resistenza isometrica per 5 secondi.",
                "Rilassare, pausa 2-3 secondi, avanzare alla barriera successiva."
              ] }
            ],
            appunti: ["Per la 2ª costa «testa» è corretto a mano in «fronte» (mano del cliente sulla fronte) e lo sguardo va verso il lato opposto a quello che si bilancia."]
          }
        ]
      },
      {
        id: "straordinari", titolo: "Chong Mai e Yin Wei Mai",
        schede: [
          {
            id: "chong-mai", titolo: "Chong Mai", sotto: "Apertura MP 4 × PC 6", pag: "45-47",
            meridiani: ["rene", "stomaco", "milza"],
            test: "MP 4 (Cielo Anteriore).",
            voci: [["Punto di apertura", "MP 4 (accoppiato PC 6)"],
                   ["Apertura", "Donne MP 4 destro × PC 6 sinistro; uomini MP 4 sinistro × PC 6 destro"]],
            tabelle: [{ titolo: "Punti principali", col: ["Punto", "Localizzazione"], righe: [
              ["R 11", "Bordo anteriore del pube, 0,5 distanze dalla linea mediana"],
              ["R 12 – R 15", "Ogni punto 1 distanza sopra il precedente (R 13 a lato di VC 4, R 15 a lato di VC 7), 0,5 dalla linea mediana"],
              ["R 16", "0,5 distanze a lato dell'ombelico"],
              ["R 17 – R 21", "Sopra l'ombelico, 0,5 dalla linea mediana (R 20: 5 distanze sopra l'ombelico; R 21: 6 distanze)"],
              ["ST 30", "Bordo superiore della sinfisi pubica, 2 distanze da VC 2"],
              ["R 22 – R 26", "Dal 5° al 1° spazio intercostale, 2 distanze dalla linea mediana"],
              ["R 27", "Fra la clavicola e la prima costa, 2 distanze dalla linea mediana"],
              ["VC 22", "0,5 distanze sopra lo sterno, al centro della fossa sovrasternale"],
              ["VC 23", "Nella depressione sopra il pomo d'Adamo"],
              ["VC 24", "Al centro del solco mento-labiale"],
              ["VG 26", "Al centro del solco naso-labiale"],
              ["ST 1", "Sotto la palpebra inferiore, sulla verticale della pupilla"],
              ["VC 1", "Al centro del perineo"],
              ["MP 10", "Aspetto mediale della coscia, 2 distanze sopra il bordo superiore della rotula"],
              ["ST 42", "Punto più alto del dorso del piede, 1,5 distanze distalmente da ST 41"],
              ["Yu Quan", "Sotto la pianta del piede, bordo anteriore del calcagno, tra navicolare e cuboide"]
            ] }],
            info: ["Il Chong Mai sale dal perineo lungo il Rene (0,5 cun dalla linea mediana), si apre a ventaglio sul torace e sale al viso; un ramo scende lungo la gamba (ST 30, MP 10, ST 42) fino alla pianta. Lavora sul livello prenatale: aspetti genetici e congeniti."]
          },
          {
            id: "yin-wei-mai", titolo: "Yin Wei Mai", sotto: "Apertura PC 6 × MP 4", pag: "48-49",
            meridiani: ["rene", "milza", "fegato", "maestro-cuore"],
            test: "PC 6 (Cielo Posteriore).",
            voci: [["Punto di apertura", "PC 6 (accoppiato MP 4)"],
                   ["Apertura", "Donne PC 6 destro × MP 4 sinistro; uomini PC 6 sinistro × MP 4 destro"],
                   ["Funzione", "«Tratta i dolori del Cuore»; governa la costituzione sanguigna"]],
            tabelle: [{ titolo: "Punti principali", col: ["Punto", "Localizzazione"], righe: [
              ["R 9", "5 distanze sopra R 3, sul bordo interno del gastrocnemio, all'altezza di V 57"],
              ["MP 12", "3,5 distanze a lato del Ren Mai, al bordo superiore della sinfisi pubica"],
              ["MP 13", "0,7 distanze sopra MP 12, 4 distanze a lato del Ren Mai"],
              ["MP 15", "4 distanze a lato dell'ombelico"],
              ["MP 16", "3 distanze sopra MP 15, 1,5 distanze sotto la cartilagine della IX costa"],
              ["F 14", "Nel sesto spazio intercostale, sulla verticale del capezzolo"],
              ["VC 22", "0,5 distanze sopra lo sterno, al centro della fossa sovrasternale"],
              ["VC 23", "Nella depressione sopra il pomo d'Adamo"]
            ] }]
          }
        ]
      },
      {
        id: "zong-qi", titolo: "Zong Qi",
        schede: [
          {
            id: "zong-qi", titolo: "La Zong Qi", sotto: "Energia ancestrale, energia del petto", pag: "50",
            meridiani: ["rene", "cuore", "polmone", "triplice-riscaldatore"],
            voci: [["Collega", "Reni, Cuore e Polmoni · congenito e acquisito · Cielo Anteriore e Cielo Posteriore"],
                   ["Disturbi dello Shen", "Senso di colpa, di responsabilità, di inadeguatezza; sentirsi assediati dal passato"],
                   ["Tono", "Più depressivo (Metallo) o più ansioso (Fuoco)"],
                   ["Ideogramma 宗", "Tetto + altare: antenati, clan, famiglia"]],
            tabelle: [{ titolo: "I punti della Zong Qi", col: ["Punto", "Azione"], righe: [
              ["TR 7 a sinistra", "Hui Zong, riunione con gli antenati: ritrovare l'equilibrio con le energie ancestrali, liberarsi delle stasi che tornano nelle generazioni"],
              ["VC 17", "Shan Zhong, centro del petto: allarme del Pericardio, coordina ed espande l'energia di Polmone e Cuore; punto del Protettore del Cuore"],
              ["VC 22", "Tian Tu: porta fuori dal petto ciò che ristagna, verso l'alto, con la parola; finestra del cielo, fa uscire il vecchio ed entrare il nuovo; chakra della gola"],
              ["VC 4", "Guan Yuan: attiva le energie congenite (Yuan Qi); allarme dell'Intestino Tenue, depura il calore di Cuore e Shen; contatto con il Ming Men e il Mandato"],
              ["ST 30", "Qi Chong: attiva il muscolo degli antenati (Zong Jin), legato al Chong Mai e al programma genetico, per dare forza a compiere il Mandato"]
            ] }],
            info: [
              "La Zong Qi è l'energia ancestrale, legata agli antenati e quindi ai Reni (energia innata, Cielo Anteriore). È anche l'energia del petto: lega Polmone (fluidi: lacrime, scolo nasale) e Cuore (emozioni). Presiede al movimento con cui l'energia del Cielo scende dal Polmone al Riscaldatore Inferiore, viene afferrata dai Reni e risale al Cuore per svolgere il Mandato.",
              "Si forma dalla Gu Qi del cibo (Milza) e dalla Tian Qi dell'aria (Polmone), con l'aiuto della Yuan Qi dei Reni. Se è debole le estremità sono deboli o fredde; si indebolisce facilmente con i problemi emotivi (il dolore indebolisce i polmoni e disperde l'energia del petto). Il torace (diaframma, pericardio, trasverso) può risentire delle emozioni genealogiche.",
              "Serve anche al sonno profondo e ristoratore, che chiede torace e diaframma rilassati: nel sonno la Yuan dei Reni si mette in contatto con lo Shen e con la Tian Qi per rigenerarsi. Il riequilibrio della Zong Qi elimina le stasi che restano nella famiglia e si ripresentano nelle generazioni."
            ],
            appunti: [
              "Energia ancestrale: «dalla mia famiglia».",
              "Le energie: Gu Qi (di accudimento, nutrimento), Tian Qi (del cielo, respiratoria), Yuan Qi (energia innata, ancestrale), Wei Qi (difensiva), Zhen Qi (corretta), Zhong Qi (centrale), Ying Qi (nutrizionale). Aria (P) → Tian Qi e cibo (MP) → Gu Qi formano la Zong Qi, che va al Cuore insieme alla Yuan Qi (R); la Zheng Qi (energia corretta) si divide in Wei Qi e Ying Qi verso organi e meridiani.",
              "Gas ionizzato = plasma, cioè un gas elettrificato, eccitato.",
              "Triplice Riscaldatore: superiore (P, PC, C) distribuzione, come una nebbia; medio (MP, ST, F, VB) trasformazione, come una camera di fermentazione; inferiore (R, V, IT, IC) eliminazione, come un canale di scolo.",
              "Il Polmone è il primo ministro, il Pericardio il ministro privato del Cuore. Il Polmone rettifica, dà le regole della rettitudine, mentre il Cuore vede tutto fiori e farfalle: il Polmone è anche la pressione della società contro il Cuore."
            ]
          },
          {
            id: "procedura-zong-qi", titolo: "Procedura di riequilibrio della Zong Qi", sotto: "TR 7 a sinistra", pag: "51-56, 71",
            meridiani: ["triplice-riscaldatore", "vaso-concezione", "stomaco"],
            test: "Con il format dei 9 Dolori in circuito (VC 14 × VG 17 + PC 8) testare TR 7 a sinistra: un C.I. indica di riequilibrare la Zong Qi.",
            passi: [
              "Mettere in circuito TR 7 a sinistra.",
              "Mettere 2 gocce di olio essenziale di Salvia Sclarea sulle mani del cliente.",
              "Far fare un paio di respiri profondi «lasciando entrare» l'olio essenziale.",
              "La persona si tocca TR 7 a sinistra mentre la si guida nella visualizzazione «Riunione con gli antenati».",
              "Un paio di respiri profondi con l'olio essenziale.",
              "La persona si tocca VC 17: visualizzazione «Punto del Protettore del Cuore».",
              "Un paio di respiri profondi.",
              "La persona si tocca VC 22: visualizzazione «Chakra della gola».",
              "Un paio di respiri profondi.",
              "La persona si tocca VC 4: visualizzazione «Punto Mare dell'Energia».",
              "Un paio di respiri profondi.",
              "La persona si tocca ST 30: visualizzazione «Punto Mare della Nutrizione».",
              "Un paio di respiri profondi.",
              ALTRE
            ],
            tl: ["TR 7 a sinistra", "VC 17", "VC 22", "VC 4", "ST 30"],
            liste: [
              visual("TR 7 a sinistra · Riunione con gli antenati", [
                "Immagina una riunione di famiglia con tutti i tuoi antenati: davanti a te i genitori, alla destra del padre i nonni paterni, alla sinistra della madre i nonni materni, accanto i bisnonni e così via, generazione dopo generazione, fino a un immenso cerchio di migliaia di avi.",
                "Ognuno ha avuto le sue sfide, difficoltà, conflitti e blocchi, e li ha affrontati come poteva, con i mezzi che aveva.",
                "Ringrazia tutti i tuoi antenati perché ti hanno dato la vita: senza anche uno solo di loro non esisteresti.",
                "Puoi dire: «Accetto e mi connetto alla forza di ognuno di voi, all'amore che scorre nel nostro albero genealogico. Lascio andare tutto ciò che non è mio, tutti i pesi e lo stress, e lo restituisco perché possa essere trasformato in qualcosa di positivo.»"
              ]),
              visual("VC 17 · Punto del Protettore del Cuore", [
                "Il Pericardio avvolge e protegge il Cuore, e per proteggerlo si contrae e si irrigidisce.",
                "Respira profondamente e immagina una luce di colore … che dal naso e dalla bocca arriva al Cuore: lo rilassa, lo alleggerisce, scioglie resistenze, autosabotaggi, soppressioni e condizionamenti, conosciuti e non conosciuti, e ti apre alle nuove sfide come opportunità di evoluzione.",
                "La luce espande il Cuore, il petto e tutto il corpo, portando pace, tranquillità e sicurezza. Lascia andare tutti i pesi che hai portato per altri: ora sei libero.",
                "Ripeti: «Sono libero su tutti i livelli e piani del mio essere, conosciuti e non conosciuti da me.»"
              ]),
              visual("VC 22 · Chakra della gola, finestra del cielo dei sensi", [
                "Questa leggerezza e libertà arriva al chakra della gola: puoi esprimerti, comunicare, sentire ed esprimere i veri desideri del tuo Cuore.",
                "È il maestro di tutti i sensi: attraverso di lui puoi vedere, ascoltare, gustare, annusare e sentire i desideri più profondi del tuo Cuore.",
                "Di che colore sono i desideri del tuo Cuore? Espira dalla gola questo colore mentre li esprimi: ciò che hai dentro inizia a manifestarsi attorno a te."
              ]),
              visual("VC 4 · Punto Mare dell'Energia", [
                "La libertà si espande verso l'addome, fino al Mare dell'Energia: stimolandolo si attiva una nuova energia. Di che colore è?",
                "Respirando, il colore entra nel punto e si espande in tutto il corpo, aumentando energia e risorse e nutrendo ogni organo, muscolo, meridiano e chakra."
              ]),
              visual("ST 30 · Punto Mare della Nutrizione", [
                "L'energia arriva al Mare del Nutrimento. Di che colore è il nutrimento?",
                "Facendo entrare il colore inizi a nutrire te stesso: forza, sicurezza, centratura, autostima, gioia, amore e gratitudine. Ti senti al sicuro e in pace con te e con il mondo.",
                "Il colore entra dalla sommità della testa, in tutto il corpo e intorno al corpo; ti connetti alle cose belle dell'ambiente e alle persone che vogliono far scorrere l'amore: non c'è separazione, solo unione con il bello e il buono.",
                "Visualizza la luce che arriva a ogni cellula, fino al nucleo, purificandola, nutrendola e portando cambiamento e rinnovamento: tutto si trasforma nella versione migliore di te."
              ])
            ]
          }
        ]
      },
      {
        id: "nove-fiori", titolo: "I Nove Fiori",
        schede: [
          {
            id: "nove-fiori", titolo: "I Nove Fiori di Ge Hong", sotto: "R 21 · ST 19 · R 19 · R 23 · VC 14", pag: "57-59",
            meridiani: ["rene", "stomaco", "vaso-concezione"],
            voci: [["Centro del trattamento", "VC 14, allarme del Cuore"],
                   ["Lato", "Si fa prima da un lato e poi dall'altro: donne partendo da destra, uomini da sinistra"],
                   ["Strategia", "Rilassare il diaframma per non sentirsi chiusi e oppressi"]],
            tabelle: [{ titolo: "I punti", col: ["Punto", "Nome", "Azione"], righe: [
              ["R 21", "Cancello misterioso", "Si entra nel processo: aprirsi a una nuova percezione della realtà"],
              ["ST 19", "Trasformazione alchemica", "All'altezza del diaframma: scioglie il Flegma ostinato dei conflitti irrisolti; se si blocca vediamo il mondo come fisso e immutabile"],
              ["R 19", "Trasformazione emotiva", "Trasformazione interna, molto Yin, non violenta né reattiva: possiamo vivere nel mondo, al centro delle attività?"],
              ["R 23", "Sigillo dello spirito", "Sullo Shen, la sintonia con i propositi della vita; il «piccolo Shen», connessione Cuore – Rene, Fuoco – Acqua"],
              ["VC 14", "Torre di guardia", "Chiusura: stato di Yin e Yang del Cuore, autoprotezione del corpo come una fortezza"]
            ] }],
            info: [
              "Il maestro taoista e alchimista Ge Hong propose nove punti, i «Nove Fiori», per liberare il Cuore dai 9 dolori che, se non risolti, ci costringono a reincarnarci per superarli. Richiamano i 9 Palazzi: non possiamo comprendere il Destino finché siamo attaccati ad abitudini, carriera, desideri.",
              "Agiscono anche sulla disarmonia del centro (Terra), origine dei Parassiti (Gu): nel Ling Shu i vermi si sviluppano dove Stomaco e Milza sono alterati. Ciò che non è digerito crea umidità e parassiti, veri e soprattutto emotivi / spirituali: autosabotaggi e blocchi nell'evoluzione.",
              "I «fiori» sono la metafora della trasformazione in una versione migliore di sé: diffondere il Qi, trasformare il denso e pesante in luminoso e prezioso. Ge Hong raccomanda di ridurre i cereali, metafora del ridurre appetiti, desideri e attaccamento all'effimero.",
              "Lo Stomaco, ben collegato al Rene (gli altri punti sono tutti del Rene), influenza i meccanismi mentali e la percezione del mondo: il suo meridiano percorre il viso e nutre gli organi di senso.",
              "Simbolicamente il trattamento prende ciò che non riusciamo a trasformare (ST 19) e lo usa per rivitalizzare lo Shen (R 23). Alla fine si può proporre una visualizzazione: la sera si passa in rassegna la giornata come in un diario, poi il diario va bruciato. L'alchimia non è conservare ma lasciar andare: chi non è disposto a bruciare il proprio diario resta bloccato e non riesce a elaborare uno dei 9 Palazzi."
            ],
            appunti: [
              "Nelle donne si fanno i primi 4 punti a destra, poi li rifaccio a sinistra, e infine quello centrale. Negli uomini i primi 4 a sinistra, poi a destra, e il centrale.",
              "Lo Stomaco è a contatto con tutti i sensi tranne il tatto (ma ST 8 è vicino alla corteccia somato-sensitiva) e come meridiano nutre i sensi: in caso di problemi ai sensi trattare Stomaco e diaframma.",
              "Il cervello è un filtro delle sensazioni, che elaboriamo tramite i filtri degli eventi del passato.",
              "Gli obiettivi: sentirsi meno vittime, meno timorosi di ciò che è «altro», meno reattivi e più autoprotettivi; ci ammaliamo per l'iper-reattività (facciamo troppo, ci preoccupiamo troppo, sempre sul filo del rasoio)."
            ]
          },
          {
            id: "procedura-nove-fiori", titolo: "Procedura di riequilibrio dei 9 Fiori", sotto: "VC 14", pag: "60-64, 72",
            meridiani: ["rene", "stomaco", "vaso-concezione"],
            test: "VC 14 in circuito.",
            passi: [
              "Mettere in circuito VC 14.",
              MODI,
              "Stimolare R 21, ST 19, R 19, R 23 a destra se si tratta una donna, a sinistra se si tratta un uomo.",
              "Stimolare gli stessi punti sull'altro lato, poi VC 14, usando per ogni punto la visualizzazione corrispondente.",
              ALTRE
            ],
            tc: ["R 21", "ST 19", "R 19", "R 23 (primo lato, poi l'altro)", "VC 14"],
            liste: [
              visual("R 21 · Porta del mistero", [
                "Sei davanti a una porta misteriosa, nascosta; aprendola ti ritrovi in una stanza buia e fredda. È la «porta dello sconosciuto»: gli aspetti di noi che non conosciamo, le nostre paure.",
                "In fondo alla stanza c'è una luce: il nuovo, il cambiamento, nuove opportunità. Di che colore è? Percorri la stanza facendoti guidare dalla luce."
              ]),
              visual("ST 19 · Trasformazione alchemica", [
                "Questa luce di colore … ti permette una trasmutazione alchemica: trasforma gli aspetti emotivi che non ti piacciono in qualcosa di nuovo e bello.",
                "La luce illumina la stanza: buio, paure, insicurezze e blocchi inconsci svaniscono come bolle di sapone.",
                "Respira: la luce arriva al diaframma e allo stomaco e dà sicurezza, forza, stabilità; ti senti sicuro nel cambiamento.",
                "Continuando a respirare la luce illumina tutti i sensi (sguardo, udito, olfatto, gusto, tatto): da ora cambia il modo di percepire il mondo."
              ]),
              visual("R 19 · La trasformazione emotiva", [
                "Hai qualche immagine? Commentarla cercando una relazione con il Palazzo trovato in squilibrio."
              ]),
              visual("R 23 · Sigillo dello spirito", [
                "Questo punto è vicino al Cuore e agisce su emozioni e desideri: immagina di dare sicurezza e libertà al tuo Cuore.",
                "Sintonizzati con i veri desideri del tuo Cuore e percorri il Destino migliore per te."
              ]),
              visual("VC 14 · La torre di guardia", [
                "Il punto è come una torre di guardia all'entrata di un castello, e il castello è il tuo Cuore: «Sono protetto. Sono al sicuro. Posso esprimere le mie emozioni e aprirmi agli altri in modo sicuro.»",
                "Invece di un castello, cosa dà al tuo Cuore protezione e forza? Con … che ti protegge, percorri il Destino migliore per te."
              ]),
              visual("Verso il destino migliore", [
                "Sei davanti a uno spazio non definito: fai il primo passo verso il tuo Destino migliore e davanti a te si crea un sentiero, in un prato, una foresta, un deserto: il panorama lo scegli tu e può cambiare.",
                "Il sentiero diventa più nitido (sabbia, sassi, luce, nuvole). A destra vedi il tuo futuro, a sinistra il passato: tutto cambia e si trasforma.",
                "In fondo c'è un'alba meravigliosa su una spiaggia bianca, con le onde come colonna sonora. Ti siedi su una panchina, da solo o con chi vuoi accanto: una persona benefica, un essere di luce, qualcuno del passato o del presente.",
                "È l'alba di una nuova vita e di una nuova visione del mondo: con la gioia e la bellezza del tuo Cuore percepisci i nuovi desideri che delineano il destino migliore, quello con più energia, risultato e soddisfazione, che ti porta all'evoluzione. Quello che hai scelto, ora lo ri-scegli per te. Fai dei bei respiri profondi."
              ])
            ],
            appunti: [
              "ST 19: non riuscire a contenere le emozioni.",
              "R 23: la capitale dello yin si trova nella pineale.",
              "VC 14: punto di fine, di ritorno a casa, di bilanciamento completo."
            ]
          }
        ]
      },
      {
        id: "parassiti", titolo: "Parassiti",
        schede: [
          {
            id: "parassiti", titolo: "I Parassiti (Gu)", sotto: "R 1 · VC 23 · V 62 · F 5", pag: "65",
            meridiani: ["rene", "vaso-concezione", "vescica", "fegato"],
            voci: [["Origine", "Alterazione della Terra: vuoto o blocco del Triplice Riscaldatore Medio, umidità"],
                   ["Sul piano psichico", "Difficoltà a cambiare, attaccamento al passato, al possedere, accumulare, non lasciar andare"],
                   ["Forze esterne", "Famiglia, lavoro, amicizie, società che alterano pensieri e valori e consumano energia"],
                   ["Legame", "Con il Vento (e quindi il Legno: Fegato e Vescica Biliare) e con gli antenati (Zong Qi)"]],
            tabelle: [{ titolo: "I punti", col: ["Punto", "Azione"], righe: [
              ["R 1", "Apre gli orifizi (organi di senso), rianima lo Yang, espelle il Flegma, caccia parassiti e vermi"],
              ["VC 23", "Trasforma il Flegma"],
              ["V 62", "Tratta il Qi ribelle ed espelle i fantasmi: Sun Si Miao lo usava quando non era chiaro quale Gui trattare"],
              ["F 5", "«Canale delle termiti»: elimina le stasi che bloccano l'evoluzione della vita"]
            ] }],
            info: [
              "In medicina cinese si parla di Parassiti e Vermi per sostituire il concetto di invasione di un Fantasma (Gui), nel passaggio da una medicina più sciamanica a una più razionale. I 13 punti fantasma (Gui) furono sviluppati nel VI secolo da Sun Si-Miao per i disturbi mentali attribuiti a possessione; lui li ricondusse a troppo Flegma e all'invasione di Vento, Calore e Umidità. Servono anche a coltivare il senso di sé: ansia, sopraffazione, vertigini, non sentirsi se stessi, fino a mania, disturbo bipolare, allucinazioni, schizofrenia, epilessia, pensieri suicidi.",
              "Oltre al corpo i parassiti possono invadere lo Shen: nei disturbi dello Shen sono legati ai desideri materiali che ostacolano l'evoluzione dello spirito. Possono esserci parassiti innati, influenza degli antenati: il trattamento si può integrare con la Zong Qi.",
              "Sono collegati al Vento, come sindrome e come forza motrice che porta i cambiamenti: il Vento è spesso la risposta del corpo a una difficoltà a cambiare, a evolvere.",
              "Il carattere Gu è un piatto sacrificale (la mente) pieno di vermi: veleno, malignità, offesa, putrefazione, decadenza, essere stregati. L'esagramma Gu (Monte sopra Vento, «la correzione del guasto»; sulla slide V 64 e TR 5): il vento ai piedi del monte ristagna, l'albero schiacciato marcisce e va rimosso; lavorare per riaggiustare errori, inganni, problemi familiari e del passato, influenze nascoste; rielaborare problemi genetici."
            ],
            appunti: [
              "Parassiti e Flegma hanno lo stesso punto di origine: l'umidità.",
              "La gratitudine è l'emozione che porta più in equilibrio il Cuore (HRV).",
              "La sindrome da vento interno è un cambiamento: la persona sta cercando di cambiare.",
              "Riferimenti: i tatuaggi di Ötzi; il libro «Geometria della guarigione»."
            ]
          },
          {
            id: "procedura-parassiti", titolo: "Procedura di riequilibrio dei Parassiti", sotto: "F 5", pag: "66, 73",
            meridiani: ["fegato", "rene", "vescica", "vaso-concezione"],
            test: "F 5 in circuito.",
            passi: [
              "Mettere in circuito F 5.",
              MODI,
              "Stimolare R 1, VC 23, V 62, F 5.",
              "Usare i diapason Rene e Vescica su tutta l'aura della persona.",
              "Testare se riequilibrare le 7 Chiavi del Qi (cono rotto con aspetto emotivo).",
              "Cercare altre correzioni.",
              "Far rifare i respiri profondi e rivalutare la pesantezza / leggerezza del corpo e della testa."
            ],
            tc: ["R 1", "VC 23", "V 62", "F 5", "Diapason Rene e Vescica sull'aura"],
            appunti: [
              "È una formula: vanno trattati tutti; il più importante è F 5, «sentiero dei vermi del legno».",
              "V 62 è il jolly di tutti i punti Gui (fantasma).",
              "Il manuale stampa «diapason Cuore e Vescica», corretto a mano in Rene e Vescica: finiti i punti controllare il modo del suono e passare Rene e Vescica su tutta l'aura per 2 minuti, per risanarla.",
              "Olio essenziale di timo rosso (utile per i batteri); spezie come l'aneto; buchu, olio essenziale africano usato dagli sciamani, pianta contro la magia nera, batteri e parassiti.",
              "La pulizia si fa in luna calante: si inizia la notte della luna piena e si prosegue per 15 giorni. Il reimpianto dei probiotici si fa in luna crescente, ma i probiotici sono l'alimento preferito dei parassiti."
            ]
          }
        ]
      }
    ]
  });
})();
