/* Manuale «Le Sindromi Energetiche della Medicina Tradizionale Cinese» (Marco Rado)
   — schede per manuali.js (formato descritto lì). Generato dalla dispensa:
   tabelle stampate trascritte così come sono, appunti a mano a parte.
   `pag` = numero di pagina stampato sul manuale.
   Schema Xuè · Yin · Yang · Qi: O = normale, – = ipoattivo (deficit),
   + = iperattivo (eccesso) sui punti ST 24 · R 19 · V 35 · R 13.
   Le sigle dei prodotti che somigliano a punti («VC 15 Forte») hanno un
   word joiner fra lettere e numero, così l'autolink non le prende. */
(window.MANUALI = window.MANUALI || []).push({
  id: "sindromi",
  titolo: "Le Sindromi Energetiche",
  breve: "Sindromi",
  sotto: "della Medicina Tradizionale Cinese",
  autore: "Marco Rado",
  intro: ["In Medicina Tradizionale Cinese la diagnosi non si fa sui sintomi ma sugli squilibri che li generano: le Sindromi. Il manuale le riconosce con quattro «torrette» – Xuè (Sangue), Yin, Yang e Qi – testate su ST 24, R 19, V 35 e R 13, più il punto d'allarme dell'organo colpito. Ogni combinazione di deficit ed eccessi, per ogni organo, è una sindrome con i suoi punti, prodotti e consigli alimentari."],
  capitoli: [
    {
      id: "fondamenti", titolo: "Fondamenti: Yin, Yang, Xuè e Qi",
      intro: ["Le basi del manuale: come si valuta in MTC, i quattro squilibri di Yin e Yang, le quattro «torrette» Xuè, Yin, Yang e Qi e i Liquidi."],
      schede: [
        {
          id: "valutazione-mtc",
          titolo: "La valutazione in Medicina Tradizionale Cinese",
          pag: "1-2",
          voci: [
            ["Medicina occidentale", "Basata sulla patologia: indagini strumentali con soglie fissate; si interviene quando si supera la soglia della patologia"],
            ["M.T.C.", "Basata sulla salute, «stato di armonia in cui nulla eccede e nulla è in difetto»; la malattia è la perdita di tale armonia"],
            ["Sindrome", "Alterazione degli equilibri interni: è la base interpretativa per giungere alla diagnosi"],
            ["Approcci del corso", "Sindromi degli organi e visceri secondo Xuè, Yin, Yang e Qi; sindromi da Fattori Cosmopatogeni Esterni e Sei Livelli Energetici"]
          ],
          liste: [
            {"titolo": "Cause interne", "items": ["Le Sette Emozioni (Collera, Gioia, Preoccupazioni, Rimuginare, Tristezza, Paura, Spavento)", "Gli errori alimentari"]},
            {"titolo": "Cause esterne", "items": ["Le Sei Energie Cosmopatogene (Vento, Freddo, Umido, Stasi, Calore, Secco)", "Virus, batteri, parassiti, metalli pesanti, pesticidi, tossine in genere", "Le ferite e le lesioni"]},
            {"titolo": "Cause né interne né esterne", "items": ["Debolezza costituzionale", "Stress, affaticamento, eccesso di lavoro", "Eccessiva attività sessuale", "Terapie sbagliate"]},
            {"titolo": "Gli 8 tipi di diagnosi in MTC (slide del corso)", "items": ["Secondo gli 8 principi", "Secondo la causa della malattia", "Sugli zang-fu", "Sui meridiani", "Secondo i 6 livelli energetici", "Secondo i 4 strati", "Secondo i 3 riscaldatori (Triplice Riscaldatore)", "Secondo Qi, Sangue, Yin e Yang"]}
          ],
          info: [
            "Lo scopo di una valutazione di M.T.C. è riconoscere gli equilibri interni della persona: la qualità di funzionamento degli organi interni; la produzione, trasformazione e distribuzione delle sostanze; lo stato emotivo e l'equilibrio tra ambiente interno ed esterno. La diagnosi non si fa direttamente sui sintomi manifesti, ma sugli squilibri alla base di tali manifestazioni: in M.T.C. si riconoscono decine di sindromi che si manifestano con la febbre, ognuna trattata in modo differente. È una medicina estremamente personalizzata, non protocollata.",
            "Nel Huangdi Neijing (Il Classico di Medicina Interna dell'Imperatore Giallo) le cause di malattia sono quasi tutte riconducibili a una disarmonia tra Yin e Yang. All'inizio del II secolo Zhang Zhong Jing, «l'Ippocrate di Cina», nel Jin Gui Yao Lue trattò per primo l'origine esterna delle malattie (un agente patogeno che penetra attraverso pelle e orifizi, supera i Livelli e ostruisce i Meridiani) e nel Shang Han Lun sviluppò l'identificazione delle Sindromi in base ai Sei Livelli energetici.",
            "In Fisiologia Integrata ci si basa sulle interazioni tra Yin e Yang per valutare le Cause Interne, e sui Fattori Cosmopatogeni e i Sei Livelli per valutare le Cause Esterne."
          ],
          appunti: [
            "Lombosciatalgia = deficit di Yang di Rene. Amenorrea = vuoto di sangue di Fegato. Ulcera gastrica = fuoco/calore di Stomaco.",
            "La legge dei 5 elementi è solo una piccola parte della medicina, perché ogni dinastia cancellava tutto quello di quella precedente: dobbiamo riferirci alle medicine cinesi.",
            "Utilizzano gli stessi strumenti per la diagnosi: polso (per impararlo bene ci vogliono 20-25 anni) e lingua.",
            "Noi in Kinesiologia facciamo molto la diagnosi sui meridiani; in questo corso faremo la diagnosi sugli organi in base all'energia, sullo Yin e lo Yang.",
            "Cause di malattia interne: deficit di Yin o di Yang; iniziano con un deficit ma si possono manifestare come eccesso («falso eccesso»).",
            "Cause esterne: l'energia interna si somma a quella esterna per rispondere all'attacco (vero eccesso). Ci deve essere già un punto debole da dove entrano i patogeni.",
            "Cause né interne né esterne: traumi."
          ]
        },
        {
          id: "yin-yang",
          titolo: "Yin e Yang: i quattro squilibri",
          pag: "4-5",
          liste: [
            {"titolo": "Le 4 leggi della relazione Yin-Yang (slide del corso)", "items": ["Yin e Yang sono opposti", "Hanno origine reciproca", "La crescita e la riduzione di Yin e Yang sono inversamente proporzionali", "Si trasformano e si alterano reciprocamente"]}
          ],
          tabelle: [
            {"titolo": "I quattro squilibri", "col": ["Squilibrio", "Genera", "Cause", "Effetti"], "righe": [["Eccesso di Yin", "Freddo", "Energie Cosmopatogene Yin (Freddo, Umido); eccesso di cibi di natura termica fredda o crudi", "Blocco delle circolazioni e delle attività funzionali, soprattutto del Triplice Riscaldatore Medio (Milza e Stomaco); accumuli; consuma lo Yang"], ["Eccesso di Yang", "Calore", "Energie Perverse Yang (Calore, Secco); energie Yin che creano accumuli e stasi; Sette Passioni; ogni tipo di Stasi (Qi, Sangue, Liquidi); cibi caldi (fumo, alcol, cioccolata, carni alla brace, spezie)", "Eccesso di attività in meridiani, organi e visceri; consuma lo Yin"], ["Deficit di Yin", "Sindromi di calore", "Congenito; Energie Perverse Yang; Sette Emozioni; esaurimento; malattie croniche; deficit alimentari", "Sangue e Liquidi in carenza, lo Yang non è più controllato: calore relativo con iperattivazione apparente di organi e visceri"], ["Deficit di Yang", "Sindromi di freddo", "Malattie croniche e debilitanti; sforzo eccessivo prolungato; malnutrizione", "Lo Yin diventa relativamente eccessivo: diminuisce il calore, rallentano circolazione e attività fisiologiche, i liquidi si accumulano"]]}
          ],
          info: [
            "La salute è l'equilibrio dinamico di Yin e Yang all'interno del corpo e con lo Yin e lo Yang dell'ambiente. Si controllano a vicenda, si trasformano continuamente l'uno nell'altro, sono antagonisti ma interdipendenti: se uno dei due aumenta di forza o intensità, nel tempo insorge la malattia. Per la M.T.C. l'origine di ogni malattia è lo squilibrio tra Yin e Yang.",
            "La malattia nasce da due fattori: le forze e le qualità delle energie dell'uomo (la sua capacità di resistenza) e la presenza di un'energia perversa o patogena. Entrambe hanno caratteristiche Yin e Yang, e quelle interne interagiscono con quelle esterne.",
            "Quando lo Yin è in eccesso consuma lo Yang, che diminuisce; quando lo Yang è in eccesso consuma lo Yin. Quando lo Yin è in deficit lo Yang è apparentemente in eccesso; quando lo Yang è debole lo Yin è in apparenza in eccesso."
          ],
          appunti: [
            "Tutti gli squilibri partono dallo Yin e lo Yang. Lo Yin concretizza e stabilizza lo Yang.",
            "Sono come acqua e fuoco: l'acqua può spegnere il fuoco, il fuoco può far evaporare l'acqua.",
            "Lo Yang del corpo è rappresentato dalle surrenali; inoltre sono Yang gli organi riproduttivi.",
            "Eccesso di Yin = acqua: freddo esterno o alimentazione; nel tempo porta a carenza di Yang.",
            "Eccesso di Yang: emozioni che alterano il fluire dei meridiani. All'inizio c'è una diminuzione dell'acqua: falso fuoco con sintomi da eccesso (tipo una 2ª fase di stress, secchezza): non devo sedare ma tonificare. Se mantengo la condizione arrivo al vero fuoco.",
            "Menopausa → vampate di calore: di solito compaiono la sera/notte, che è la fase Yin della giornata.",
            "La sudorazione notturna è carenza di Yin e diventa un circolo vizioso perché continuo a perdere Yin.",
            "Deficit di Yin: può essere congenito. Nei bambini: bambini emaciati, enuresi notturna.",
            "L'eccesso di antibiotici porta a freddo.",
            "Quando ho un deficit di un organo, esso a cascata si diffonde sugli altri: un deficit di Yin di Milza-Stomaco porta deficit di Yin al Cuore e al Rene, e il Fegato aumenta il vuoto della Milza.",
            "Quando trovo eccesso di Yin e di Yang insieme: non dovrebbe esistere, ma lo valutiamo come sindrome da Umido-Calore."
          ]
        },
        {
          id: "sintomi-yin-yang",
          titolo: "Sintomi di deficit di Yin e di vuoto di Yang",
          pag: "appunti",
          liste: [
            {"titolo": "Deficit di Yin", "items": ["Sensazione di febbre", "Calore nei 5 cuori (arti + gonadi): mani sempre calde o piedi sempre caldi", "Sudorazione notturna (tipica nei bambini, nelle donne in menopausa e in chi ha carenza di Yin): incapacità di trattenere i liquidi", "Ipereccitabilità psichica (gambe senza riposo, bambini iperattivi)", "Emaciati", "Ipereccitabilità emotiva, perché il calore che sale destabilizza lo Shen", "Xerostomia (secchezza delle fauci)", "Sudorazione non motivata", "Consumo dei liquidi a livello delle mucose: bocca secca, costipazione con stitichezza, urine frequenti e ipercromiche"]},
            {"titolo": "Deficit di Yin: secondo l'organo coinvolto", "items": ["Polmoni: gola secca, tosse secca, pelle secca", "Stomaco: irritabilità, sete, costipazione", "Fegato: problemi oftalmici (congiuntive infiammate o secche), riduzione della vista, cecità; problemi cocleovestibolari (vertigini, acufeni); problemi ginecologici (dismenorrea e ipermenorrea)"]},
            {"titolo": "Vuoto di Yang", "items": ["Astenia fisica, psichica e sessuale (soprattutto nell'uomo)", "Sensibilità al freddo e percezione di freddo (freddo alla zona lombare)", "Diarrea", "Urinazione frequente con urine ipocromiche", "Debolezza lombare e dolore lombare", "Assenza di sete o desiderio di bevande calde", "Arti freddi", "Squilibri sessuali (spermatorrea, polluzioni notturne o sotto sforzo, eiaculazione precoce)", "Pallore", "Segni di debolezza sistemica e stanchezza (cronica)"]}
          ],
          info: ["Scheda ricavata dalle pagine di appunti a mano all'inizio della dispensa."],
          appunti: [
            "Il deficit di Yin colpisce lo Stomaco e il Rene: il Rene perché sede del Jing (DNA, cielo anteriore), lo Stomaco perché sede delle energie acquisite (nutrizione, cielo posteriore). Di conseguenza possono essere in deficit di Yin Fegato, Cuore e Polmone.",
            "È caratterizzato da segni di ipertiroidismo con eccesso di produzione degli ormoni surrenali. Il metabolismo sarà accelerato con eccesso di calore in alto; quando è molto profondo può portare a febbre, mal di testa, afte e glossite (calore che va in alto).",
            "Deficit di Yin con eccesso di Yang: siamo al 2° livello di stress. Deficit di Yang con eccesso di Yin sarebbe una 3ª fase di stress. In fase estrema di stress posso tornare a un deficit di Yin, perché si brucia la materia.",
            "Il vuoto di Yang corrisponde all'incapacità del corpo di utilizzare i substrati nutrizionali per generare una corretta termogenesi e protezione dai fattori esterni (sistema immunitario). I riflessi primitivi sono governati dalla Wei Qi.",
            "Ipotiroidismo (con scorretta termogenesi). Un deficit di Yang parte sempre dal deficit di Yang del Rene, poi potrà diventare un deficit di Yang di tutti gli altri organi. Può esserci iposurrenalismo con insufficienza surrenale, tiroidea e gonadica: influenza sulla funzione anabolica, la termogenesi e la produzione di temperatura.",
            "La radice di tutto lo Yang è il Rene e la radice di tutto lo Yin è il Rene: Rene destro radice dello Yin, sinistro radice dello Yang.",
            "La ptosi renale è un crollo dello Yang."
          ]
        },
        {
          id: "quattro-torrette",
          titolo: "Le quattro torrette: Xuè, Yin, Yang e Qi",
          pag: "6",
          voci: [
            ["Xuè (Sangue)", "Nutrimento"],
            ["Yin", "Idratazione"],
            ["Yang", "Calore"],
            ["Qi (Energia)", "Funzione"]
          ],
          info: [
            "Yin e Yang si rappresentano come due «torrette»: a colpo d'occhio si vede se sono in squilibrio. Ogni torretta si suddivide a sua volta: accanto a Yin e Yang compaiono Xuè (Sangue) e Qi (Energia). Le quattro torrette, usate in tutto il manuale, fanno capire lo squilibrio dell'organo da trattare, guidano la scelta di punti e tecniche e dicono subito se l'organismo va tonificato, sedato o entrambi.",
            "Xuè e Yin stanno insieme (lato Yin), Yang e Qi insieme (lato Yang). I termini Xuè, Yin, Yang e Qi sono usati da molti autori, a volte con significati diversi: in questo corso Xuè e Yin sono spesso usati con il significato di Liquidi."
          ]
        },
        {
          id: "xue-sangue",
          titolo: "Xuè (Sangue): nutrimento degli organi",
          pag: "7-8",
          tabelle: [
            {"titolo": "Il Sangue degli organi", "col": ["Organo", "Il suo Sangue nutre", "Deficit di Sangue"], "righe": [["Cuore", "Vasi sanguigni, mente e sue funzioni, lingua e parola", "Pallore al viso, freddo in varie parti del corpo, depressione, cattiva concentrazione e memoria, sonno non riposante"], ["Polmoni", "Pelle e peli corporei, organi della respirazione", "Energia bassa, fiato corto, pelle fina e con meno peli"], ["Milza", "L'intero corpo (muscoli e grasso), labbra, arti, organi digestivi", "Persona eccessivamente magra o denutrita, problemi di assimilazione"], ["Reni", "Ossa e cartilagini, capelli, cervello e sistema nervoso, sistema urogenitale", "Ossa che si rompono facilmente e guariscono lentamente, perdita di capelli, bassa vitalità, ovuli e sperma malformati"], ["Fegato", "Tendini e occhi; funzioni del movimento muscolare e capacità di reagire allo stress", "Pallore al viso, stanchezza, contratture muscolari e lacerazioni tendinee, visione offuscata, mestruazioni scarse con cicli molto lunghi"]]}
          ],
          info: [
            "«Il Qi è il comandante del Sangue: lo dinamizza, lo mantiene nei vasi e lo rigenera». «Il Sangue è la madre del Qi: lo contiene, e ogni sua perdita si esprime con una perdita di Qi». Il Sangue è energia più materializzata e densa del Qi.",
            "Xuè è il Sangue Rosso (ossigenato) che nutre tutte le cellule: è nutrito dalla Milza, sintetizzato dal Cuore (che integra nutrimento, fluidi e ossigeno dei Polmoni e lo fa circolare), arricchito dai Reni (midollo osseo), immagazzinato nei vasi e rilasciato dal Fegato. Xuè indica soprattutto nutrimento: l'osteoporosi, per esempio, è una Carenza di Sangue dei Reni, perché i Reni nutrono le Ossa.",
            "Deficit di Sangue: ha natura Yin e somiglia al Deficit di Yin, ma senza i sintomi di Calore verso l'alto; spesso i due quadri si sovrappongono. In genere nasce da un Deficit di Milza e Stomaco (disfunzione o carenza nutrizionale), poi da perdite croniche di sangue (ciclo, emorragie occulte) e da problemi emotivi protratti. Può vicariarsi in Deficit di Yin (Secco), Deficit di Yang (Freddo), Deficit di Qi o Eccesso di Qi (Vento).",
            "Stasi di Sangue: cause interne da deficit (Deficit di Qi; Deficit di Xuè che porta Deficit di Qi; Deficit di Yang che porta Freddo e rallenta il flusso) e cause esterne (Stasi di Qi; Calore nel Sangue, che lo essicca e lo coagula)."
          ],
          appunti: [
            "Il significato di sangue in medicina cinese è diverso dal nostro. Xuè è una forma molto densa e materiale di Qi: è impossibile separarli, come Yin e Yang. Il Sangue è Yin e il Qi è Yang.",
            "Il Qi dà vita al sangue: senza il Qi sarebbe un fluido morto. Il sangue è la materializzazione dell'energia nutritiva.",
            "Nei meridiani abbiamo più energia che sangue, nei vasi più sangue che energia: i vasi sono la componente materiale e i meridiani la componente energetica della stessa entità.",
            "Il Qi del Cuore sintetizza il sangue prodotto dalla Milza, arricchito dal Polmone e sintetizzato in forma definitiva dal Cuore. Il sangue origina da Milza, Polmone e Rene.",
            "ST 21: punto di armonizzazione tra Stomaco e Milza.",
            "Funzioni del sangue: 1. nutre, 2. umidifica (mantengono la vitalità di organi e tessuti), 3. ancora gli Shen, la componente mentale/spirituale/emotiva, volatili come i bambini in mano ai bambini. Si radicano nel sangue: con un vuoto di sangue non hanno più una casa → insonnia, nervosismo, fino a patologie psicologiche. Le patologie psichiatriche sono muco che ostruisce le vie del Cuore.",
            "La funzione principale è nutrire il corpo e umidificarlo, cosa che il Qi non può fare. Rottura del tendine d'Achille → vuoto di Qi del Fegato.",
            "Se ho un + di Xuè con + o – di Qi è una stasi di sangue: utili la coppettazione e il guasha."
          ]
        },
        {
          id: "qi-funzione",
          titolo: "Il Qi: la funzione degli organi",
          pag: "8",
          tabelle: [
            {"titolo": "Il Qi degli organi", "col": ["Organo", "Funzione (Qi)", "Percepisce"], "righe": [["Cuore", "Sintetizza e fa circolare sangue e calore; governa la mente e la parola", ""], ["Milza", "Fa circolare sangue e fluidi in periferia, distribuisce le sostanze nutritive, dà consistenza al connettivo", "Il gusto"], ["Polmone", "Governa la respirazione, apertura e chiusura dei pori, il sistema immunitario", "Il tocco"], ["Rene", "Governa il metabolismo dell'acqua, il sistema riproduttivo e quello urinario", "Il suono"], ["Fegato", "Immagazzina e rilascia il sangue; genera il movimento che fa fluire Sangue, Energia e Liquidi; controlla muscoli e tendini", "La vista"]]},
            {"titolo": "Le forme del Qi (appunti)", "col": ["Nome", "Che cos'è", "Organo / circuito"], "righe": [["Jing", "Forma più densa, energia genetica statica", "Rene"], ["Yuan Qi", "Forma ancestrale dinamica", "Parte dal Rene, il TR la distribuisce; legata ai meridiani straordinari e divergenti"], ["Gu Qi", "Energia alimentare", "Stomaco-Milza → sangue"], ["Zong Qi", "Energia respiratoria", "Polmone → sangue"], ["Zheng Qi", "Energia pura (si divide in Ying Qi e Wei Qi)", "Cuore, 12 meridiani"], ["Ying Qi", "Energia nutritiva", "MC, perché è il sangue trasportato dai 12 meridiani + i 15 meridiani Luo"], ["Wei Qi", "Energia difensiva", "Polmone; meridiani tendino-muscolari e divergenti"], ["Tian Qi", "Energia del cielo", "Può entrare attraverso le finestre del cielo"]]}
          ],
          liste: [
            {"titolo": "Le funzioni del Qi (appunti)", "items": ["Muovere", "Scaldare", "Contenere", "Sollevare o far salire", "Proteggere", "Nutrire", "Trasformare"]}
          ],
          info: [
            "La parola Qi indica molti concetti (respirazione, energia, forza, rabbia, effetto dell'agopuntura…); usata insieme a Sangue, Yin e Yang significa Funzione. L'iperfunzione di un organo corrisponde a un Eccesso di Qi, l'ipofunzione a un Deficit di Qi.",
            "Deficit di Qi: è legato a Milza e Polmone, che assimilano, producono, trasportano e distribuiscono il Qi. Cause: postumi di malattie debilitanti, vecchiaia, stress fisici, psichici o sessuali, carenze alimentari, disordini respiratori. I sintomi dipendono dall'organo coinvolto.",
            "Stasi di Qi: rallentamento della circolazione dell'energia che altera tessuti, organi e funzioni. Le stasi interne colpiscono soprattutto Milza, Polmone, Stomaco e Fegato; quelle esterne i Meridiani, la pelle, le ossa e le articolazioni."
          ],
          appunti: [
            "L'ideogramma del Qi è una spiga di riso che fermenta facendo uscire il suo vapore. Il Qi può essere molte cose in diversi momenti; è difficilmente traducibile. È la base di tutti i fenomeni dell'universo (Qi = physis in greco): la varietà dei fenomeni è il risultato di contrazione o rarefazione del Qi. La massima coagulazione del Qi è la terra, la massima rarefazione è il cielo; il corpo è una forma molto densa di Qi.",
            "Il Qi è sempre quello ma si manifesta in modo diverso. Plasma = Zhen Qi. Nella produzione del Qi che scorre nei meridiani ci sono vari passaggi: l'elettrificazione (Cuore) del sangue, dell'ossigeno e delle sostanze nutritive.",
            "I meridiani hanno una gerarchia sociale: l'imperatore è il Cuore, tutti gli altri sono sudditi perché lui li elettrifica trasformandoli in Zhen Qi, energia pura.",
            "Il Qi si manifesta sia a livello fisico che spirituale, in uno stato costante di flusso da solido a rarefatto (gli 8 trigrammi rappresentano queste possibilità). Quando è condensato si accumula e si trasforma in forma fisica.",
            "Il Qi è l'essenza raffinata prodotta dagli organi interni che nutre corpo e spirito. L'attività funzionale degli organi è sempre Qi: il Qi del Fegato non risiede nel Fegato, sono tutte le funzioni e attività svolte dal Fegato."
          ]
        },
        {
          id: "sintomi-qi-xue",
          titolo: "Sintomi di deficit di Qi e di Xuè",
          pag: "appunti",
          liste: [
            {"titolo": "Deficit di Qi: sintomi generici", "items": ["Pallore", "Tono debole della voce", "Sudorazione durante il giorno (mani umide o sudore a caso)", "Dispnea", "Astenia generalizzata", "Letargia", "Perdita o mancanza d'appetito", "Dolore addominale con gonfiore (deficit di Qi di Milza)", "Diarrea", "Incontinenza (deficit di Qi di Rene)"]},
            {"titolo": "Vuoto di Xuè: sintomi", "items": ["Pallore giallastro", "Anemia", "Labbra pallide", "Secchezza profonda e fragilità dei capelli, che non passa nemmeno con le creme", "Depressione e insonnia (lo Shen, radicato nel sangue, diventa instabile)", "Vertigini, capogiri", "Disturbi della vista", "Anoressia (che può anche essere la causa)", "Amenorrea o polimenorrea, fino a un ciclo emorragico", "Intorpidimento (insensibilità)"]}
          ],
          info: ["Scheda ricavata dalle pagine di appunti a mano all'inizio della dispensa."],
          appunti: [
            "Il deficit di Qi può essere congenito oppure acquisito; la radice del Qi è Milza-Pancreas. La Milza produce il Qi (assimila e distribuisce i substrati derivanti dal cibo) e il Polmone lo governa (assimila e distribuisce l'energia derivante dalla respirazione).",
            "Se le funzioni di Milza e Polmone non sono corrette non avremo sufficienti risorse per compiere tutti i processi metabolici (produzione di sangue, rigenerazione ossea): si avrà una riduzione di nutritivi, respiratori ed energia. All'inizio sintomi di Milza e Polmone, poi possono evolvere in Rene e Cuore con eccesso di urinazione, palpitazioni e aritmia.",
            "Il sangue è strettamente legato a Shen e Cuore: con un vuoto di sangue lo Shen diventa instabile → insonnia; lo Shen è anche la psiche → depressione.",
            "L'origine dei sintomi del vuoto di sangue è la carenza di Qi della Milza, che non riesce a produrre sangue dagli alimenti, o un'alimentazione insufficiente o scorretta: manca il trasporto di ferro, acido folico, aminoacidi… per produrre sangue.",
            "È una delle principali sindromi, insieme a deficit di Yin di Rene, deficit di Yang di Rene, stasi di Qi di Fegato e deficit di Qi di Milza.",
            "Inizierà con sintomi di anemia, alterazione del trofismo della pelle, oligomenorrea, astenia, pallore giallastro: tutti sintomi di carenza di Qi della Milza. Poi può evolvere in carenza di sangue di Fegato o Cuore.",
            "La Milza è lo stoccaggio del sangue e il Cuore lo controlla. Il ciclo è una problematica di Fegato.",
            "Vertigini, tremori e spasmi sono sintomi di deficit di Qi di Fegato. Aritmia, insonnia e ipereccitabilità sono sintomi di deficit di Qi di Cuore."
          ]
        },
        {
          id: "liquidi-jin-ye",
          titolo: "I Liquidi (Jin Ye)",
          pag: "9",
          voci: [
            ["Jin – liquidi fini", "Umidificano pelle, mucose e tendini (elasticità e morbidezza); lubrificano bocca, naso, occhi, orecchie: saliva, muco, lacrime, sudore. Legati alle ghiandole esocrine"],
            ["Ye – liquidi densi", "Più densi, viscosi e pesanti: nutrono organi, midolli, cervello e articolazioni; contribuiscono a formare il Sangue. Legati alle ghiandole endocrine"],
            ["Organi coinvolti", "Yang: Stomaco, Intestino Tenue, Intestino Crasso, Vescica. Yin: Milza, Polmoni, Reni"]
          ],
          liste: [
            {"titolo": "Qi, Sangue e Liquidi", "items": ["Il Qi produce i Liquidi", "Il Qi muove e governa i Liquidi organici (li diffonde, li distribuisce e li secerne)", "Il Qi trattiene i Liquidi", "I Liquidi racchiudono e veicolano il Qi", "Sangue e Liquidi sono interdipendenti"]}
          ],
          info: [
            "I Liquidi nascono dal cibo e dalle bevande e vengono assimilati, metabolizzati ed eliminati da quattro organi Yang e tre organi Yin. In questo corso Xuè e Yin sono spesso usati con il significato di Liquidi."
          ],
          appunti: [
            "La sindrome da Umido è calda o fredda. Calda → cistite cronica, patologie intestinali, borborigmi: ha componente batterica. Fredda → sintomi simili, gastroenterici e cistiti: ha componente virale.",
            "Se il calore diventa eccessivo a causa dello Stomaco, lo trasforma in catarro (flegma); se questo sale al Cuore dà origine alle patologie psichiche.",
            "I Jin Ye derivano dalla parte liquida di alimenti e bevande, purificata da Stomaco e Milza (slide)."
          ]
        }
      ]
    },
    {
      id: "metodo", titolo: "Procedura, lingua e alimenti",
      intro: ["Come si trova la sindrome con il test muscolare, i punti degli organi, l'esame della lingua e la natura termica degli alimenti."],
      schede: [
        {
          id: "procedura",
          titolo: "Procedura delle Sindromi Energetiche",
          pag: "10-11",
          test: [
            "Format in circuito: Anatomia + MP 13 + V 37.",
            "Testare ST 24 (Xuè), R 19 (Yin), V 35 (Yang), R 13 (Qi): ipoattivo (–) = deficit, iperattivo (+) = eccesso, O = normale.",
            "Modo dell'organo in circuito e punti d'allarme: quello che dà cambio d'indicatore è l'organo colpito."
          ],
          voci: [
            ["ST 24 · Xuè", "Ipoattivo = Deficit di Sangue; iperattivo = Stasi di Sangue o Umidità"],
            ["R 19 · Yin", "Ipoattivo = Deficit di Yin; iperattivo = Eccesso di Yin"],
            ["V 35 · Yang", "Ipoattivo = Deficit di Yang; iperattivo = Eccesso di Yang"],
            ["R 13 · Qi", "Ipoattivo = Deficit di Qi; iperattivo = Stasi di Qi o Vento"]
          ],
          passi: [
            "Immettere in circuito il Format: Anatomia + MP 13 + V 37.",
            "Testare ST 24, R 19, V 35 e R 13 per vedere se sono ipoattivi o iperattivi.",
            "Immettere in circuito il Modo dell'Organo e testare i Punti d'Allarme: quello che dà cambio d'indicatore è l'organo colpito dalla Sindrome.",
            "La combinazione di deficit ed eccessi delle quattro sostanze e l'organo coinvolto determinano la Sindrome (es. Eccesso di Sangue + Eccesso di Yang + Intestino Tenue = Umidità-Calore dell'Intestino Tenue).",
            "Cercare la Sindrome nelle tabelle di pag. 12-19 (qui: i capitoli per livello energetico).",
            "Leggere il testo.",
            "Testare tutti i Muscoli collegati a quell'organo.",
            "Testare i vari punti specifici per ogni Sindrome.",
            {"t": "Stimolare tutti i Punti con:", "sub": ["Digitopressione", "Thie Shin", "Diapason", "Cromopuntura", "Elettroagopuntura", "Stimolo informatizzato"]},
            "Stimolare Neurovascolari, Neurolinfatici, Origine/Inserzione, Punti di Tonificazione/Sedazione corrispondenti.",
            "Testare se servono altre tecniche di correzione.",
            "Testare se serve un supporto fitoterapico, ortomolecolare o omeopatico.",
            "Testare se serve una variazione alimentare.",
            "Ritestare tutti i muscoli."
          ],
          tabelle: [
            {"titolo": "Punti degli organi", "col": ["Organo", "Allarme", "Chiave", "Yuan", "Shu", "Xi"], "righe": [["Polmone", "P 1", "MP 4", "P 9", "V 13", "P 6"], ["Cuore", "VC 14", "R 6", "C 7", "V 15", "C 6"], ["Stomaco", "VC 12", "TR 5", "ST 42", "V 21", "ST 34"], ["Intestino Crasso", "ST 25", "TR 5", "IC 4", "V 25", "IC 7"], ["Intestino Tenue", "VC 4", "V 62", "IT 4", "V 27", "IT 6"], ["Vescica", "VC 3", "V 62", "V 64", "V 28", "V 63"], ["Fegato", "F 14", "MC 6", "F 3", "V 18", "F 6"], ["Vescica Biliare", "MP 13", "VB 41", "VB 40", "V 19", "VB 36"], ["Milza", "F 13", "MP 4", "MP 3", "V 20", "MP 8"], ["Reni", "VB 25", "R 6", "R 3", "V 23", "R 5"]]}
          ],
          appunti: [
            "ST 24 (Sangue): una distanza più in alto del punto d'allarme dell'IC. Se è iperattivo vado a testare MP 9: se dà cambio d'indicatore è umido, sennò è stasi.",
            "R 19 (Yin): mezza distanza a lato del punto d'allarme dello Stomaco. Iperattivo: eccesso di Yin o freddo.",
            "V 35 (Yang): a lato di VG 1, a fianco al coccige. Iperattivo: eccesso di Yang o calore.",
            "R 13 (Qi): se è iperattivo tocco VB 20: se mi dà cambio d'indicatore è vento, se non ho cambio d'indicatore è stasi.",
            "Testare i punti relativi a quell'organo nella tabella di pag. 11.",
            "Allarme: effetto parasimpaticotonico → sedativo. Chiave: armonizza. Yuan: tonifica. Shu: simpaticotonici → tonificano. Xi: punti d'urgenza, dissipano gli eccessi.",
            "Se la sindrome non corrisponde a nessun caso del manuale posso usare: per lo Xuè i NV, per lo Yin i NL, per lo Yang Origine/Inserzione, per il Qi i punti di tonificazione e sedazione. Questi punti li posso usare anche se la sindrome è una di quelle conosciute.",
            "In più posso testare un Can Opener con quell'organo come meridiano oggetto."
          ]
        },
        {
          id: "lingua-polso",
          titolo: "Lingua e polso",
          pag: "appunti · 146",
          tabelle: [
            {"titolo": "L'esame della lingua (Appendice 2)", "col": ["Zona della lingua", "Organi", "Riscaldatore"], "righe": [["Radice", "Rene, Vescica", "Jiao inferiore"], ["Bordi", "Fegato, Vescica Biliare", "Jiao medio"], ["Centro", "Stomaco, Milza", "Jiao medio"], ["Davanti al centro", "Polmone", "Jiao superiore"], ["Punta", "Cuore", "Jiao superiore"]]},
            {"titolo": "Principali squilibri della lingua (tavola mostrata al corso)", "col": ["Quadro", "Lingua", "Segni"], "righe": [["Normale", "Patina bianca sottile", ""], ["Deficit di Qi", "Pallida, segni dei denti, qualche punto rosso, patina bianca sottile", "Fatica, poco appetito, sudorazione spontanea, fiato corto, rimuginare e preoccupazione"], ["Calore", "Rossa, patina gialla sottile", "Sensazione di caldo, suda facilmente, sete, stitichezza, irritabilità, problemi di pelle"], ["Ritenzione di umidità", "Gonfia, patina bianca grassa", "Gonfiore, pienezza a torace e addome, pesantezza, letargia"], ["Stasi di sangue", "Violacea, macchie scure", "Arti freddi, vene varicose, gambe dolenti, cefalee, dolore toracico, macchie epatiche, pelle senza lucentezza"], ["Stasi di Qi", "Punta rossa, patina bianca sottile", "Stress, tendenza alla depressione, emotività instabile, sindrome premestruale"], ["Umidità-calore", "Rossa, patina gialla grassa", "Problemi di pelle, infezioni urinarie, pelle umida, rabbia, disagio"], ["Deficit di Yang", "Pallida e gonfia, patina bianca spessa", "Sente freddo, carnagione pallida, mal di schiena, tendenza al panico, libido bassa, impotenza, infertilità"], ["Deficit di Yin", "Rossa, screpolata, poca o nessuna patina", "Vampate, sudori notturni, insonnia, irritabilità, ronzii alle orecchie, menopausa"], ["Deficit di sangue", "Pallida, poca o nessuna patina", "Vertigini, fatica, palpitazioni, scarsa concentrazione e memoria, insonnia, disturbi femminili"]]}
          ],
          appunti: [
            "Questo è ciò che si dovrebbe sentire con i polsi: abbiamo 3 «strati», Qi, sangue e organo. Ci sono 64 tipi di polso.",
            "La lingua ti dice quale organo è colpito.",
            "Per fare la diagnosi della lingua si hanno da 3 a 5 secondi, poi si altera."
          ]
        },
        {
          id: "natura-termica-alimenti",
          titolo: "Natura termica degli alimenti",
          pag: "146",
          tabelle: [
            {"titolo": "Appendice 1", "col": ["Caldo", "Tiepido", "Neutro", "Fresco", "Freddo"], "righe": [["Peperoncino, pepe, cannella, carne di agnello, capra e montone, olio di soia, grappa", "Farro, riso dolce, carne di manzo, pollo, aglio, basilico, cardamomo, pesca, ciliegia, formaggio di pecora, noce, castagna, gamberetto, trota, porro, finocchio", "Riso a chicco rotondo, mais, uovo, zafferano, uva, fico, lamponi, more, latte, piselli, ceci, soia rossa, mandorla, sesamo, olio d'oliva, carpa, seppia, carota, patata, cavolo", "Frumento, orzo, miglio, carne di maiale, coniglio, origano, salvia, arancia, mela, pera, fragola, yogurt, soia verde, melanzana, sedano, spinaci, carciofo, insalata", "Anguria, melone, banana, kiwi, ananas, pompelmo, limone, tofu, vongole, alghe marine, pomodoro, cetriolo, sale, asparagi, zucchini"]]}
          ],
          appunti: ["Cottura Yin: bollito, vapore, bagnomaria. Cottura Yang: forno, griglia, fritto."]
        }
      ]
    },
    {
      id: "prodotti", titolo: "Integratori e fitoterapia cinese",
      intro: ["Gli appunti del corso sui prodotti e le formule cinesi di base per tonificare Yin, Yang, Qi e Xuè (pag. 148 e seguenti)."],
      schede: [
        {
          id: "integratori-appunti",
          titolo: "Integratori: appunti del corso",
          pag: "appunti",
          liste: [
            {"titolo": "Dal catalogo commentato al corso", "items": ["Betaina cloridrica: per insufficienza di acido cloridrico", "Prebiotici + probiotici + enzimi lattasi", "Enzimi digestivi, Ultra-Zyme, Acti-Zyme: combinazioni di enzimi con organoterapia", "Acidophilus e Tri-Dophilus: non sono i migliori", "Complesso B (Ultra Stress, Mega Stress, Super B-50, Mega B-100, Mega B-150): sono ottimi, così anche il ferro viene assorbito; utili quando servono risorse nei casi di stress di 3° livello", "Mega Stress ha anche dei fitoterapici che sono blandi sedativi", "Esterified Vit C: vitamina C non acida, non dà acidità allo stomaco", "Aminoacidi (L-Glutammina, L-Lisina, L-Carnitina, L-Arginina) e singole vitamine: buoni anche questi", "Endocannabinoidi (HempCeutix; CBD di una ditta olandese): hanno effetto sul sistema immunitario"]}
          ],
          info: ["Scheda ricavata dalle pagine di appunti a mano all'inizio della dispensa."],
          appunti: [
            "Il Qi di un organo è la sua funzione: vuoto di Qi di Milza = carenza enzimatica.",
            "Anche il complesso di vitamine B è ottimo (de La Strega).",
            "L'ectoderma è fortemente sensibile alla vitamina D.",
            "Prodotti Arcangea: i prodotti con i colori vanno bene anche per le costituzioni cinesi e le stagioni, e armonizzano. (Riga cancellata: Acqua Yin per deficit, Yang per eccesso.)",
            "Qiutian: ditta di prodotti cinesi."
          ]
        },
        {
          id: "formule-cinesi",
          titolo: "Formule cinesi: imperatore, ministro, assistenti",
          pag: "148",
          voci: [
            ["Imperatore", "Principio fondamentale: tratta la causa principale della sindrome"],
            ["Ministro", "Coadiuva e potenzia l'imperatore"],
            ["Assistenti", "Correggono l'azione dell'imperatore o i suoi effetti collaterali"],
            ["Messaggero", "Dirige la formula verso un determinato organo"]
          ],
          info: [
            "Nelle prescrizioni della MTC ci sono sempre più erbe con funzioni diverse, identificate con un linguaggio politico-militare. Le formule di base del corso tonificano Yin, Yang, Qi e Xuè: lavorano sugli squilibri alla base di quasi tutte le sindromi, sono usate da secoli e servono anche a prevenire i problemi in chi ha una debolezza costituzionale."
          ],
          appunti: ["Prodotti per i vuoti o comunque tonificanti: avrò sempre una pianta imperatore."]
        },
        {
          id: "liu-wei-di-huang-wan",
          titolo: "Liu Wei Di Huang Wan",
          sotto: "Vuoto di Yin",
          pag: "148",
          meridiani: ["rene"],
          voci: [
            ["Tratta", "Deficit di Yin (tonifica lo Yin di Rene e Fegato)"],
            ["Organo", "Rene"],
            ["Origine", "Qian Yi (1032-1113)"]
          ],
          tabelle: [
            {"titolo": "Ingredienti", "col": ["Erba", "Nome botanico", "Ruolo", "Parti"], "righe": [["Shu Di Huang", "Rehmannia glutinosa, radix preparata", "Imperatore: nutre lo Yin del Rene", "20-25"], ["Shan Zhu Yu", "Cornus officinalis, fructus", "Ministro: Yin del Fegato", "10-15"], ["Shan Yao", "Dioscorea opposita, radix", "Ministro: Yin della Milza", "10-15"], ["Ze Xie", "Alisma plantago, rhizoma", "Tratta il fuoco di origine renale", "9-12"], ["Mu Dan Pi", "Paeonia suffruticosa, radix", "Riduce il fuoco del Fegato", "6-9"], ["Fu Ling", "Poria cocos, sclerotium", "Rinforza la Milza, previene stasi, stagnazione di Qi e umidità", "9-12"]]}
          ],
          liste: [
            {"titolo": "Usi (slide del corso)", "items": ["Diabete", "Ipertiroidismo", "Ipertensione", "Disfunzioni renali croniche", "Disfunzioni polmonari croniche", "Disturbi cocleo-vestibolari", "Disfunzioni oftalmiche"]}
          ],
          info: [
            "Una delle formule più famose: tonificando lo Yin di Rene e Fegato si usa per moltissimi problemi. Per la MTC i Reni sono la sorgente della Quintessenza (Jing), del Sangue e dei Liquidi, e la formula lavora soprattutto su di loro. Nel deficit di Yin lo Yang tende a manifestarsi in alto.",
            "Dal foglietto illustrativo: con marcato calore vuoto può essere alternata a Zhi Bai Di Huang Wan; integrata con Rou Gui si ricrea la formula classica Ba Wei Di Huang Wan."
          ],
          appunti: [
            "Tratta il vuoto di Yin: menopausa, esaurimento, mancanza di riposo, mancanza di massa, anoressia, anzianità.",
            "Funziona principalmente sul Rene."
          ]
        },
        {
          id: "jin-gui-shen-qi-wan",
          titolo: "Jin Gui Shen Qi Wan",
          sotto: "Vuoto di Yang",
          pag: "149",
          meridiani: ["rene"],
          voci: [
            ["Tratta", "Deficit di Yang: tonifica lo Yang del Rene"],
            ["Origine", "Zhang Zhong Jing (150-219 d.C.)"]
          ],
          tabelle: [
            {"titolo": "Ingredienti", "col": ["Erba", "Nome botanico"], "righe": [["Fu Zi", "Aconitum carmichaeli, radix"], ["Rou Gui", "Cinnamomum cassia, cortex"], ["Shu Di Huang", "Rehmannia glutinosa, radix preparata"], ["Shan Zhu Yu", "Cornus officinalis, fructus"], ["Shan Yao", "Dioscorea opposita, radix"], ["Ze Xie", "Alisma plantago, rhizoma"], ["Fu Ling", "Poria cocos, sclerotium"], ["Mu Dan Pi", "Paeonia suffruticosa, radix"]]}
          ],
          info: [
            "Yin e Yang sono interdipendenti: per generare Yang serve Yin, che ne è la sorgente. Per questo si usa la stessa prescrizione che tonifica lo Yin (Liu Wei Di Huang Wan) con due erbe in più che riscaldano lo Yang: Fu Zi e Rou Gui."
          ],
          appunti: [
            "Trattamento per il vuoto di Yang: tonifica lo Yang di Rene.",
            "Per farlo aggiungiamo il Rou Gui a quello per il vuoto di Yin."
          ]
        },
        {
          id: "si-jun-zi-tang",
          titolo: "Si Jun Zi Tang",
          sotto: "Deficit di Qi",
          pag: "149-150",
          meridiani: ["milza", "stomaco"],
          voci: [
            ["Tratta", "Deficit di Qi di Milza e Stomaco (assorbimento e trasporto dei nutrienti)"],
            ["Origine", "Dinastia Song (970-1280)"],
            ["Per il Polmone", "Non è specifica per il deficit di Qi di Polmone: meglio Bu Fei Tang"]
          ],
          tabelle: [
            {"titolo": "Ingredienti", "col": ["Erba", "Nome botanico", "Ruolo"], "righe": [["Ren Shen", "Panax ginseng, radix", "Imperatore: tonifica la Milza e rafforza il Qi"], ["Bai Zhu", "Atractylodes macrocephala, radix", "Ministro"], ["Fu Ling", "Poria cocos, sclerotium", "Assistente: con Bai Zhu evita il ristagno di umidità del deficit di Qi di Milza e drena"], ["Gan Cao", "Glycyrrhiza uralensis, radix", "Messaggero: armonizza le altre erbe e tonifica Stomaco-Milza"]]}
          ],
          info: [
            "Consigliata a chi ha un apparato digerente debole, con facili disturbi gastrici e gastroduodenali e difficile assimilazione dei nutrienti di origine alimentare.",
            "Dal foglietto illustrativo: astenia che peggiora nella giornata e dopo i pasti, con interessamento degli arti; scarso appetito e precoce senso di pienezza epigastrica e addominale; tendenza ad alvo diarroico, leucorree, mucorree, sonnolenza. Con abbondante umidità e addome gonfio si può associare a Xiang Sha Wan."
          ],
          appunti: [
            "Specifico per i deficit di Qi dovuti a un deficit di Qi di Milza (non di Polmone).",
            "Bu Fei Tang → formula specifica per il Qi di Polmone."
          ]
        },
        {
          id: "si-wu-tang",
          titolo: "Si Wu Tang",
          sotto: "Deficit di Sangue",
          pag: "150",
          meridiani: ["fegato"],
          voci: [
            ["Tratta", "Deficit di Sangue di Fegato, anemia, dismenorrea, anemia post-partum"],
            ["Origine", "Dinastia Song (circa 1110)"]
          ],
          tabelle: [
            {"titolo": "Ingredienti", "col": ["Erba", "Nome botanico", "Azione"], "righe": [["Shu Di Huang", "Rehmannia glutinosa, radix preparata", "Tonifica Sangue e Yin di Rene e Fegato"], ["Bai Shao Yao", "Paeonia lactiflora, radix", "Tonifica Sangue e Yin di Rene e Fegato; tratta spasmi e dolori"], ["Dang Gui", "Angelica sinensis, radix", "Dinamizza il Sangue, effetto tonico"], ["Chuan Xiong", "Ligusticum wallichii, radix", "Dinamizza il Sangue"]]}
          ],
          appunti: [
            "Tonifica il vuoto di sangue: nella donna un segno sono i coaguli di sangue durante il ciclo mestruale (Fegato e MC comandano il ciclo)."
          ]
        }
      ]
    },
    {
      id: "shao-yin-rene", titolo: "Shao Yin · Rene",
      intro: ["Le sindromi del Rene (tabella di pag. 12).", "Punti dell'organo: allarme VB 25 · chiave R 6 · yuan R 3 · shu V 23 · xi R 5."],
      schede: [
        {
          id: "deficit-yin-rene",
          titolo: "Deficit di Yin di Shao Yin – Rene",
          sotto: "Shao Yin · Rene",
          pag: "22-23",
          meridiani: ["rene"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) – · V 35 (Yang) O · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VB 25 (Rene)."
          ],
          voci: [
            ["Origine", "Sono numerose le cause che possono indurre questa Sindrome: come conseguenza di un’eccessiva attività lavorativa protratta negli anni; come conseguenza di una malattia febbrile in cui il Calore ha consumato i Liquidi; come vicariazione di una malattia cronica che ha colpito il Fegato o i Polmoni o il Cuore; come conseguenza dell’eccessiva attività sessuale; come conseguenza di un Vuoto di Sangue di Fegato, che a sua volta è determinata da emorragie protratte nel tempo; come conseguenza di una errata terapia a base di prodotti che tonificano lo Yang di Rene; come conseguenza ad un forte trauma psichico che ha consumato lo Yin."],
            ["Principi di trattamento", "Tonificare i Reni"],
            ["Muscoli", "Psoas, Iliaco, Trapezio Superiore"]
          ],
          tc: [
            "R 1 — Nutre lo Yin di Rene",
            "R 10 — Tonifica lo Yin di Rene",
            "VC 1 — Tonifica lo Yin di Rene",
            "R 2 — Tonifica il Rene",
            "MC 6 — Regolarizza l’Energia",
            "VC 4 — Tonifica lo Yin di Rene",
            "R 3 — Tonifica i Reni",
            "V 17 — Nutre il Sangue",
            "VC 6 — Tonifica il Qi",
            "R 6 — Tonifica lo Yin di Rene",
            "V 23 — Punto Shu di Rene",
            "MP 1 — Calma lo Shen",
            "R 7 — Tonifica lo Yin di Rene",
            "V 52 — Tonifica lo Yin di Rene",
            "MP 6 — Tonifica lo Yin di Rene"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Dioscorea", "Artemisia", "Coenzima Q10", "Liu Wei Di Huang Wan", "Solidago"], ["Astragalo", "Eleuterococco", "L-Arginina", "Gou Qi Zi Cha", "Atropinum"], ["Althea Officinalis", "Salvia", "Rame", "Tian Ma Gou Teng Yin", "Cuprum"], ["Luppolo", "Lichene islandico", "Ecto 2", "Hei Zi Ma Cha", "Cantharis"], ["Acqua YIN", "Nero Acqua", "Stamina", "", "Berberis"]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Ipoacusia", "Vertigini", "Acufene", "Spermatorrea", "Lombalgia", "Lombosciatalgia", "Amenorrea", "Sindrome pre mestruale", "Carenza di estrogeni", "Turbe dello Shen"]},
            {"titolo": "Sintomi", "items": ["Bocca secca", "Affezioni circolatorie piccolo bacino", "Sensazione di gola secca notturna", "Sordità", "Stipsi con feci secche", "Otiti", "Eiaculazione precoce", "Urine scarse e cariche", "Polluzioni notturne", "Calore al palmo delle mani", "Calore nella regione precordiale", "Debolezza dei muscoli lombari", "Calore alla pianta dei piedi", "Dorsalgia", "Capogiri", "Debolezza alle ginocchia", "Algomenorrea", "Diabete mellito", "Gonalgia", "Oligomenorrea", "Diabete insipido", "Sudorazione notturna", "Disturbi neurovegetativi", "Memoria scarsa", "Palpitazioni", "Amnesia", "Sindrome climaterica", "Sindromi ansiose", "Invecchiamento precoce", "Ipertiroidismo", "Paure", "Capelli fragili", "Dimagrimento", "Depressione", "Algie muscolari da insufficienza metabolica degli acidi urici", "Insonnia", "Astenia", "Turbe dello sviluppo osseo", "Agitazione", "Asma", "Dolori alle ossa", "Nervosismo", "Tosse", "Osteoporosi", "Nevrosi", "Nefrite", "Ansia", "Cistite"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti amari che drenano (te, caffè, azuki)", "Alimenti che riscaldano troppo (alcool in genere, carne di agnello, capra, manzo, pollo, tacchino, salumi, affumicati, formaggi stagionati, con muffa, spezie calde; Alimenti arrostiti, fritti, grigliati, essicati.Troppo sale. Evitare il troppo astringente, troppo freddo, troppo umidificante"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti che nutrono lo yin e creano liquidi", "Frutta e verdura meglio cotta o centrifugata", "Ottimi centrifugati di uva, pera", "Piccole quantità di cibi astringenti e acidi (yogurt, limone, ananas, arance, kiwi, ecc)", "Utilizzare metodi di cottura yin: in acqua, a vapore, fermentati, crudo se la digestione lo permette", "Bere tisane o anche acqua tiepida", "Assumere polline, pappa reale, semi di sesamo, semi di lino", "Cereali: Grano integrale, Germogli di grano, Miglio, Orzo, Riso non a chicco lungo, Quinoa, Amaranto", "Legumi e noci: Soia nera, Soia verde, Ceci, Germogli, Latte di soia, Tofù, Sesamo, Mandorle", "Verdure: Sedano, Spinaci, Bietola, Cetrioli cotti, Pomodoro cotto, Rape rosse, Cavoli, Olive, Ravanelli, Asparagi, Alghe", "Frutta: Pera, Uva, Mela, Anguria, Arancia, Limone, Pompelmo, Mandarino, Caco, Banane, More, Ananas, Ribes, Fragola, Avocado", "Carne e latticini: Anatra, Coniglio, Cavallo, Fegato, Latte, Burro, Panna, Formaggi freschi, Yogurt", "Pesce: Frutti di mare, Calamari, Seppia, Polpo, Ostriche, Vongole", "Spezie: Salvia, Crescione, Menta, Melissa, Limone, Ortica", "Bevande: tisane con l’aggiunta di miele o melassa"]}
          ],
          info: [
            "Stile di vita: Importante osservare le emozioni che si vivono prima del sonno, Non agitarsi, Evitare stress fretta e super lavoro, Evitare di lavorare nelle ore notturne e serali, Per due settimane coricarsi prima possibile e svegliarsi spontaneamente senza sveglia, Eventualmente aiutarsi con tisane a base di : luppolo, valeriane, lavanda, melissa."
          ],
          appunti: [
            "Stato di iperattività.",
            "Per Rene si possono intendere anche gli organi sessuali interni (ovaie, testicoli)."
          ]
        },
        {
          id: "deficit-yin-eccesso-yang-rene",
          titolo: "Deficit di Yin ed eccesso di Yang di Shao Yin – Rene",
          sotto: "Shao Yin · Rene",
          pag: "24-25",
          meridiani: ["rene"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) – · V 35 (Yang) + · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VB 25 (Rene)."
          ],
          voci: [
            ["Origine", "E’ una vicariazione dello Vuoto di Yin di Rene. Il Deficit dello Yin non riesce a contrastare lo Yang di Rene e si ha una manifestazione da Calore. E’ una condizione da Vuoto, ma con una manifestazione da pieno. Secondo la Legge dei 5 Elementi, il Rene nutre il Fegato, che a sua volta nutre il Cuore, un deficit di Yin di Rene può determinare un deficit di Yin di Fegato e Cuore e questo causa la sintomatologia di alterazione dello Shen."],
            ["Principi di trattamento", "Tonificare lo Yin di Rene, Purificare il Calore, Calmare lo Shen"],
            ["Muscoli", "Psoas, Iliaco, Trapezio Superiore"]
          ],
          tc: [
            "R 3 — Tonifica i Reni",
            "C 5 — Dirige il Calore verso il Basso",
            "R 6 — Tonifica lo Yin di Rene",
            "C 7 — Dirige il Calore verso il Basso",
            "R 9 — Tonifica lo Yin di Rene e calma lo Shen",
            "P 10 — Elimina il Calore",
            "R 10 — Tonifica lo Yin di Rene",
            "VC 4 — Tonifica lo Yin di Rene e calma lo Shen",
            "V 15 — Punto Shu del Dorso di Cuore",
            "MP 6 — Tonifica lo Yin di Rene e calma lo Shen",
            "V 23 — Punto Shu del Dorso di Rene",
            "R 2 — Elimina il Calore dai Reni"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Biancospino", "Boswellia", "Vit.B6", "Zhi Bai Di Huang Wan", "Solidago"], ["Lycopo", "Salice", "CoEnzima Q10", "Zuo Gui Wan", "Berberis"], ["Melissa", "Acqua Yin", "Rame", "Ba Zheng San Wan", "Atropinum"], ["Astragalo", "Nero Acqua", "L-Arginina", "Long Dan Xie Gan Tang", "Cuprum"], ["Artemisia", "Solidago", "Stamina", "Tian Ma Gou Teng Yin", "Cantharis"], ["Achillea", "", "Ecto 2", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Lombalgia", "Alterazioni dello Shen", "Vertigini", "Sindromi ansiose", "Ipertiroidismo"]},
            {"titolo": "Sintomi", "items": ["Stipsi ostinata con feci molto secche", "Gola secca specialmente notturna", "Sensazione di calore soprattutto nel pomeriggio", "Vertigini", "Polluzioni notturne", "Sete notturna", "Sogni a sfondo sessuale", "Acufeni", "Eccessivo desiderio sessuale", "Ansia", "Profusa sudorazione notturna", "Oliguria con urine cariche", "Palpitazioni", "Bocca secca", "Sangue nelle urine", "Agitazione mentale", "Perdita delle masse muscolari", "Dimagrimento con aspetto emaciato", "Nervosismo", "Insonnia", "Sentirsi “a pezzi”", "Zigomi rossi", "Lieve febbre pomeridiana", "Capogiri", "Tachicardia", "Disturbi neurovegetativi", "Amnesie", "Alterazioni cardiache", "Nevrosi", "Diabete mellito", "Risvegli frequenti", "Diabete insipido"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti amari e che drenano come caffè, tè", "Alimenti diuretici come la soia rossa (azuki)", "Alimenti che riscaldano troppo come alcol in genere, carne di agnello, capra, manzo, pollo, tacchino, salumi affumicati, formaggi stagionati, spezie calde", "Troppo sale"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti che umidificano, nutrono lo yin, creano liquidi", "Assumere regolarmente frutta e verdura, meglio cotti o centrifugati, ottimi gli sciroppi di uva, pera", "Assumere regolarmente piccole quantità di alimenti acidi o astringenti", "Scegliere metodi di cottura yin: in acqua, a vapore, fermentato, eventualmente wok, crudi se la digestione lo consente", "Con sete bere secondo la sete, in assenza di sete sforzarsi di bere!", "Cereali: grano integrale, germogli di grano, miglio, orzo, riso (non a chicco lungo), quinoa, amaranto", "Legumi e noci: soia verde, soia nera, ceci, germogli di soia, latte di soia, tofu, mandorle, sesamo", "Verdure: sedano, spinaci, bietola, cetriolo (cotto), pomodoro (cotto), avocado, rape rosse, cavolo cinese, alghe marine, oliva, ravanello, asparago", "Frutta: pera, uva, mela, anguria, melone, arancia, limone, pompelmo, mandarino, caco, banane, more di gelso, ananas, fragola, ribes nero", "Carne e latticini: maiale, anatra, coniglio, cavallo, fegato, reni, brodo di ossa, latte, burro, panna, formaggi freschi, yogurt", "Pesce: calamaro, seppia, polpo, ostriche, vongole, lumache di mare", "Erbe e spezie: salvia, crescione, menta, melissa, valeriana, passiflora, luppolo, lavanda, ortica", "Bevande: acqua del rubinetto calda, tisane di erbe, tisane alla frutta, acqua d’orzo o di grano"]}
          ],
          info: [
            "Stile di vita: Dormire a sufficienza e curare la qualità del sonno; importante il sonno prima di mezzanotte. Evitare stress, fatica, superlavoro. Evitare di lavorare nelle ore serale e durante la notte. Cura del sonno: per 2 settimane coricarsi il prima possibile e dormire fino a quando si riesce. Eventualmente aiutare il sonno con erbe: luppolo, valeriana, lavanda, melissa, passiflora, avena verde.",
            "Prodotti: vedere i prodotti per Deficit di Yin di Rene."
          ],
          appunti: ["Stato di iperattività."]
        },
        {
          id: "deficit-yang-rene",
          titolo: "Deficit di Yang di Shao Yin – Rene",
          sotto: "Shao Yin · Rene",
          pag: "26-27",
          meridiani: ["rene"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) – · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VB 25 (Rene)."
          ],
          voci: [
            ["Origine", "Sono numerose le possibili cause: innanzitutto un deficit costituzionale; come esito di una malattia cronica; abitudini alimentari errate; vita sessuale eccessiva, come vicariazione di una problematica Polmonare, vicariazione di una problematica di Milza, vecchiaia. E’ importante eseguire una buona anamnesi per comprendere l’origine del problema."],
            ["Principi di trattamento", "Tonificare i Reni, Rafforzare il Ming Men"],
            ["Muscoli", "Psoas, Iliaco, Trapezio Superiore"]
          ],
          tc: [
            "R 3 — Tonifica i Reni",
            "VC 4 — Tonifica lo Yang di Rene",
            "V 23 — Tonifica lo Yang di Rene",
            "VC 6 — Tonifica lo Yang di Rene",
            "R 7 — Tonifica il Qi di Rene",
            "VG 14 — Tonifica e riscalda lo Yang",
            "R 9 — Calma lo Shen",
            "VG 4 — Tonifica lo Yang di Rene",
            "V 52 — Tonifica lo Yang di Rene e lo Zhi",
            "ST 36 — Indirettamente tonifica il Rene",
            "VB 39 — Tonifica il Midollo"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Dioscorea", "Aswaganda", "L-Arginina", "Jin Gui Shen Qi Wan", "Damiana"], ["Ginseng", "Serenoa", "Coenzima Q10", "Ba Wei Di Huang", "FM Agnus, Sabal"], ["Eleuterococco", "Aglio", "Vit B3", "Nan Zi Han Cha", "FM Magnesium"], ["Fieno Greco", "Astragalo", "Vit E", "Yi Guan Jian", "Phosphorus"], ["Tribulus Terrestris", "Acqua Yin", "Vitamina B12", "Rou Gui", "VC⁠15 Forte"], ["Nero Acqua", "Sambuco", "Therm Max", "", ""], ["", "", "Rame", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Patologie dell’orecchio", "Enterocoliti croniche", "Patologie genitali", "Enfisema cronico", "Dispnea", "Problemi lombari", "Freddo nell’area lombare", "Avversione al freddo", "Problemi alle ginocchia", "Incontinenza", "Astenia", "Ipocorticosurrenalismo", "Ipotiroidismo", "Nefriti (croniche)", "Asma", "Cardiopatie croniche"]},
            {"titolo": "Sintomi", "items": ["Colorito pallido e biancastro", "Acufeni", "Dissenteria, soprattutto mattutina", "Otiti", "Feci non formate", "Impotenza", "Eiaculazione precoce", "Dispnea da sforzo", "Spermatorrea", "Debolezza nell’area lombare", "Dispnea astenica", "Sterilità", "Instabilità dell’equilibrio", "Irregolarità mestruali", "Incontinenza delle urine e feci", "Leucorrea cronica", "Arti freddi", "Poliuria con urine chiare", "Estremità fredde", "Vertigini", "Ricerca del calore", "Edema alle gambe", "Astenia fisica", "Dolore alle ginocchia", "Astenia psichica", "Debolezza delle ginocchia", "Astenia sessuale", "Freddo alle ginocchia", "Malattie urologiche", "Apatia", "Tosse con espettorato", "Angoscia", "Caduta dei capelli", "Depressione", "Osteoporosi"]},
            {"titolo": "Alimentazione da evitare", "items": ["Limitare cibi crudi, caffè, tè nero o tè verde, zucchero e bevande zuccherate, non esagerare con le spezie ed i cibi che riscaldano"]},
            {"titolo": "Alimentazione consigliata", "items": ["Bere liquidi caldi", "Giornalmente cucinare proteine: carne, uova, pesce, legumi", "Ottimi i brodi di pesce o carne", "Legumi cotti a lungo con l’aggiunta di spezie", "Cereali: quinoa, avena, riso dolce, riso basmati, farro, segale, grano, miglio, mais", "Legumi: fave, ceci, fagioli neri, lenticchie, piselli, noci, castagne, nocciole, semi di girasole, semi di zucca, pinoli, arachidi, sesamo, pistacchi", "Verdure: carota, patata, zucca, finocchio, cipolla, porro, aglio, cavolo, peperone", "Frutta: ciliegia, fichi, litchi, lamponi, mirtilli, uva, ribes, frutta cotta con spezie", "Carne: manzo, pollo, capra, cervo, Tacchino", "Pesce: cozze, gamberetti, gamberi, aragosta, seppie, trote, vongole, polipo, persico, ostriche, calamari", "Spezie: anice, zenzero, anice stellato, cannella, timo, rosmarino, noce moscata, chiodi di garofano, poco peperoncino", "Bevande: acqua tiepida, tisane (rosmarino timo salvia anice cardamomo zenzero), Caffè d’orzo"]}
          ],
          info: [
            "Stile di vita: coprirsi bene (addome schiena gambe e piedi), esporsi ben coperti all’aria fresca anche in inverno (almeno un ora al gg facendo movimento fisico), evitare di sostare a lungo in ambienti troppo freddi, usare fonti di calore da applicare sulle zone fredde, non dormire troppo (altrimenti si produce ancora meno yang), attenzione a sauna e bagni troppo caldi, tutti gli stimolanti indeboliscono i reni."
          ],
          appunti: ["Sindromi di debolezza: qui si inizia ad avere anche «patologie» del polmone."]
        },
        {
          id: "deficit-yang-eccesso-yin-rene",
          titolo: "Deficit di Yang ed eccesso di Yin di Shao Yin – Rene",
          sotto: "Shao Yin · Rene",
          pag: "28-29",
          meridiani: ["rene"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) + · V 35 (Yang) – · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VB 25 (Rene)."
          ],
          voci: [
            ["Origine", "E’ una vicariazione del Deficit di Yang del Rene, che non è più in grado di controllare i Liquidi che debordano. Questo deborda mento può arrivare a colpire anche il Cuore ed i Polmoni. Le cause sono diverse: vicriazione di Vuoto dello Yang di Milza dato dall’eccesivo consumo di cibi crudi e freddi; una condizione cronica di Umidità; vicari azione di un Vuoto dello Yang di Cuore, causato da problemi emotivi; vicari azione di un Vuoto di Qi di Polmone, causato da una invasione di Freddo."],
            ["Principi di trattamento", "Tonificare i Reni, Trasformare i Liquidi, Tonificare lo Yang della Milza"],
            ["Muscoli", "Psoas, Iliaco, Trapezio Superiore"]
          ],
          tc: [
            "R 3 — Tonifica i Reni",
            "VC 4 — Tonifica lo Yang di Rene, trasforma i Liquidi",
            "R 7 — Tonifica lo Yang di Rene",
            "VC 6 — Tonifica lo Yang di Rene",
            "V 13 — Tonifica il Qi di polmone",
            "VG 4 — Tonifica lo Yang di Rene",
            "V 15 — Tonifica lo Yang di Cuore",
            "MP 6 — Elimina l’Umidità dal TR inferiore",
            "V 20 — Tonifica lo Yang di Milza",
            "MP 9 — Elimina l’Umidità dal TR inferiore",
            "V 22 — Trasforma i Liquidi nel TR Inferiore",
            "ST 28 — Trasforma i Liquidi nel TR Inferiore",
            "V 23 — Tonifica lo Yang di Rene",
            "ST 36 — Indirettamente tonifica il Rene"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Alburno di Tiglio", "Bambu", "Vit. B1", "Rou Gui", "FM Cantharis"], ["Artiglio del Diavolo", "Litothame", "Vit. B12", "Zhen Wu Tang", "Calcarea Carbonica 30 CH"], ["Aswaganda", "Solidago", "Therm Max", "", "Thuya 30 CH"], ["Acqua Yin", "Acqua Yang", "Ecto 2", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Avversione al freddo", "Problemi lombari", "Freddo nell’area lombare", "Patologie croniche dell’orecchio", "Insufficienza renale cronica", "Patologie genitali (maschili)", "Astenia", "Edemi", "Dispnea", "Asma", "Enfisema", "Insufficienza cardiaca cronica", "Nefriti croniche ed acute", "Problemi alle ginocchia"]},
            {"titolo": "Sintomi", "items": ["Enterocolite cronica", "Colorito pallido e biancastro", "Acufeni", "Diarrea, soprattutto mattutina", "Tachicardia", "Poliuria con urine chiare", "Mancanza di voglia di parlare", "Debolezza nell’area lombare", "Vertigini", "Oppressione toracica", "Instabilità dell’equilibrio", "Freddo alle ginocchia", "Arti freddi", "Impotenza", "Estremità fredde", "Astenia fisica", "Eiaculazione precoce", "Ricerca del calore", "Astenia psichica", "Spermatorrea", "Astenia sessuale", "Sterilità", "Edema agli arti inferiori", "Dissenteria acquosa", "Irregolarità mestruali", "Tessuto edematoso su cui rimane l’impronta delle dita", "Sudorazione spontanea immotivata", "Tosse con espettorato abbondante", "Edema alle caviglie", "Catarro", "Edema del viso", "Dispnea da sforzo", "Espettorato acquoso", "Edema dei fianchi", "Dispnea astenica", "Dilatazione addominale", "Dispnea con respiro asmatico", "Meteorismo", "Aritmia cardia", "Voce debole", "Offuscamento visivo", "Palpitazioni", "Debolezza delle ginocchia"]},
            {"titolo": "Alimentazione da evitare", "items": ["Limitare i cibi crudi, freddi, pesanti ed umidi (gelati, alimenti presi direttamente dal frigorifero, yogurt), niente caffè tè verde e te nero, zucchero bianco e bevande zuccherate, non esagerare con le spezie troppo calde"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cucinare tre volte al giorno, bere liquidi caldi non oltre la sete (esclusi i casi in cui abbiamo dei calcoli in cui è necessario bere molto). quotidianamente piccole dosi di uova, pesce, carne, legumi cotti a lungo con spezie che riscaldano, brodi di carne e pesce, assumere bevande mobilizzanti con le spezie consigliate", "Cereali: quinoa, riso, riso basmati, farro, segale, avena", "Legumi e noci: fave, ceci, lenticchie, piselli, fagioli neri, fagioli comuni, noci, nocciole, pinoli, semi di girasole, arachidi, castagne", "Verdure: carote, patate, zucca, peperone, porri, cipolla, aglio, finocchi, cavoli", "Frutta: frutta cotta con spezie, ciliege, litchi, fichi", "Carne: manzo, tacchino, pollo, agnello, capra, cervo, selvaggina", "Pesce: aragosta, cozze, gamberetti, capesante, seppie, trote", "Spezie: anice, chiodi di garofano, cannella, timo, rosmarino, noce moscata, zenzero secco", "Bevande: acqua calda, tisane con: cumino, timo, rosmarino salvia, cardamomo, anice. caffè d’orzo"]}
          ],
          info: [
            "Stile di vita: vestirsi bene, tenere al caldo l’addome, la schiena, le gambe ed i piedi. eventualmente usare fonti di calore esterni da applicare alle zone fredde, se ben coperti esporsi all’aria fredda anche in inverno, esercizio fisico all’aria aperta, non dormire troppo, attenzione a sauna e bagni troppo caldi.",
            "Prodotti: vedere anche i prodotti per Deficit di Yang di Rene."
          ],
          appunti: ["3ª fase di stress."]
        },
        {
          id: "deficit-qi-rene",
          titolo: "Deficit di Qi di Shao Yin – Rene",
          sotto: "Shao Yin · Rene",
          pag: "30-31",
          meridiani: ["rene"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VB 25 (Rene)."
          ],
          voci: [
            ["Origine", "L’origine è l’esaurimento dell’energia renale, le cui cause possono essere l’eccessiva attività sessuale o un suo inizio troppo precoce, oppure troppe gravidanze ravvicinate, o l’età avanzata. Nel bambino, può essere causato da un deficit congenito o ad un ritardo di consolidamento del Qi del Rene. Infine, anche lo stress, l’affaticamento, le malattie croniche, possono indurre questa Sindrome."],
            ["Principi di trattamento", "Tonificare il Qi di Rene"],
            ["Muscoli", "Psoas, Iliaco, Trapezio Superiore"]
          ],
          tc: [
            "R 3 — Tonifica il Qi di rene",
            "VC 4 — Tonifica il Rene",
            "V 23 — Tonifica il Qi ed il Jing di Rene",
            "VG 4 — Tonifica il Vuoto",
            "V 52 — Tonifica il Rene",
            "VC 6 — Tonifica il Qi, Tonifica il Rene",
            "ST 36 — Trasforma il Qi"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Ginseng", "Aswaganda", "Selenio", "Jin Suo Gu Jing Wan", "Agnus, Sabal"], ["Equiseto", "Boswellia", "Litio", "Wu Ling San", "Cantharis"], ["Aglio", "Angelica Sinensis", "Boro", "Liu Wei Di Huang Wan", "VC⁠15 Forte"], ["Cardo Mariano", "Tribulus Terrestris", "Calmag", "Ba Wei Di Huang Wan", "Solidago"], ["Kelp", "Solidago", "Vit. B1", "Ba Zhen Wan", ""], ["Acqua Yin", "Nero Acqua", "Ecto 2", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Alterazione della sfera sessuale", "Astenia", "Incontinenza urinaria con urine pallide", "Debolezza lombare"]},
            {"titolo": "Sintomi", "items": ["Impotenza", "Astenia psichica", "Enuresi", "Sterilità", "Astenia fisica", "Enuresi infantile", "Polluzioni notturne non accompagnate da sogni", "Astenia sessuale", "Gocciolamento dopo la minzione", "Spermatorrea", "Pollachiuria", "Eiaculazione precoce", "Dolore lombare", "Nicturia", "Leucorrea (cronica)", "Debolezza delle ginocchia", "Incontinenza dell’anziano", "Diminuzione della potenza sessuale", "Dolore alle ginocchia", "Incontinenza delle feci", "Prolasso vaginale", "Afonia", "Poliuria notturna", "Prolasso uterino", "Dispnea", "Poliuria del diabete insipido", "Minaccia di aborto", "Respiro corto e tagliato", "Dissenteria", "Asma", "Tosse"]},
            {"titolo": "Alimentazione da evitare", "items": ["Cibi crudi, freddi, umidi, pesanti, dolci. caffè tè verde, tè nero, zucchero bianco, alimenti privi di qi (denaturati, industriali, confezionati, scatolette) oltre a richiederne maggiore assunzione, non apportano energia. mangiare velocemente, senza masticare, con ritmi irregolari, stuzzicare continuamente"]},
            {"titolo": "Alimentazione consigliata", "items": ["Piccole quantità di alimenti astringenti (infusi di more, lamponi immaturi, prugne umeboschi), cucinare tre volte al giorno, bere liquidi caldi non oltre la sete (esclusi i casi in cui abbiamo dei calcoli in cui è necessario bere molto). quotidianamente piccole dosi di uova, pesce, carne. legumi cotti a lungo con spezie che riscaldano. brodi di carne e pesce. assumere bevande mobilizzanti con le spezie consigliate", "Cereali: quinoa, riso, riso basmati, farro, segale, avena", "Legumi e noci: fave, ceci, lenticchie, piselli, fagioli neri, agioli comuni, noci, nocciole, pinoli, semi di girasole, arachidi, castagne", "Verdure: carote, patate, zucca, peperone, porri, cipolla, aglio, finocchi, cavoli. FRUTTA.: frutta cotta con spezie, ciliege, litchi, fichi", "Carne: manzo, tacchino, pollo, agnello, capra, cervo, selvaggina", "Pesce: aragosta cozze gamberetti, capesante, seppie, trote, acciuga, anguilla", "Spezie: anice, chiodi di garofano, cannella, timo, rosmarino, noce moscata, zenzero secco, coriandolo, pepe, capperi, rafano, cumino", "Bevande: acqua calda, tisane con: cumino, timo, rosmarino salvia, cardamomo, anice. caffè d’orzo"]}
          ],
          info: [
            "Stile di vita: vestirsi bene, tenere al caldo l’addome e la schiena, le gambe ed i piedi. eventualmente usare fonti di calore esterni da applicare alle zone fredde. se ben coperti esporsi all’aria fredda anche in inverno. esercizio fisico all’aria aperta. non dormire troppo. attenzione a sauna e bagni troppo caldi."
          ]
        },
        {
          id: "deficit-yang-qi-rene",
          titolo: "Deficit di Yang e di Qi di Shao Yin – Rene",
          sotto: "Shao Yin · Rene",
          pag: "32-33",
          meridiani: ["rene", "polmone"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) – · R 13 (Qi) –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VB 25 (Rene)."
          ],
          voci: [
            ["Origine", "Possiamo riassumere questa Sindrome come una difficoltà di comunicazione tra Reni e Polmoni. In genere è la conseguenza di una malattia cronica che, nel tempo, ha colpito i Reni, specialmente se è nata nei Polmoni. Può anche essere collegata ad un deficit costituzionale dei Reni e dei Polmoni. Infine può essere la conseguenza di un eccesso di esercizio fisico in età puberale."],
            ["Principi di trattamento", "Tonificare i Reni, Stimolare i Polmoni"],
            ["Muscoli", "Psoas, Iliaco, Trapezio Superiore"]
          ],
          tc: [
            "R 3 — Stabilizza e sostiene i Reni",
            "P 7 — Stimola i Polmoni",
            "R 6 — Attiva i Reni",
            "P 9 — Tonifica i Polmoni",
            "R 7 — Tonifica il Qi e lo Yang di Rene",
            "VC 6 — Stimola il Qi",
            "R 25 — Stimola Reni e Polmoni",
            "VC 17 — Stimola il Qi e lo Yang",
            "V 13 — Stimola i Polmoni",
            "ST 36 — Stimola il Qi e lo fa circolare",
            "V 23 — Timola i Reni",
            "VG 4 — Stimola lo Yang",
            "VG 14 — Stimola lo Yang"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Tribulus Terrestris", "Aswaganda", "N-Acetilcisteina", "Jin Suo Gu Jing Wan", "FM Cantharis"], ["Ginseng", "Astragalo", "Selenio", "Su Zi Jiang Qi Tang", "FMS Benzochinon"], ["Equiseto", "Angelica Sinensis", "Zinco", "Ba Zheng San Wan", "Arsenicum Album"], ["Dioscorea", "Adatoda Vasica", "Ramo", "Liu Wei", "Ipeca"], ["Cardo Mariano", "Serenoa", "Calmag", "Wu Ling San", ""], ["Kelp", "", "Bioflavonoidi", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Asma", "Bronchiti croniche", "Enfisema polmonare"]},
            {"titolo": "Sintomi", "items": ["Volto edematoso", "Ristagno ed edema di liquidi nella parte alta del corpo", "Gonfiore del viso", "Magrezza", "Gonfiore sottopalpebrale", "Astenia", "Dispnea da sforzo", "Respiro corto e rapido", "Lombalgia", "Tosse", "Difficoltà nella inspirazione", "Debolezza lombare", "Sudorazione spontanea o da sforzo lieve", "Arti freddi soprattutto dopo la sudorazione", "Urine frequenti di colore pallido", "Svogliatezza mentale", "Arti freddi", "Esaurimento mentale"]},
            {"titolo": "Alimentazione da evitare", "items": ["Cibi crudi, freddi, umidi, pesanti, dolci. caffè tè verde, tè nero, zucchero bianco, alimenti privi di qi (denaturati, industriali, confezionati, scatolette) oltre a richiederne maggiore assunzione, non apportano energia. mangiare velocemente, senza masticare, con ritmi irregolari, stuzzicare continuamente"]},
            {"titolo": "Alimentazione consigliata", "items": ["Piccole quantità di alimenti astringenti (infusi di more, lamponi immaturi, prugne umeboschi), cucinare tre volte al giorno, bere liquidi caldi non oltre la sete (esclusi i casi in cui abbiamo dei calcoli in cui è necessario bere molto). quotidianamente piccole dosi di uova, pesce, carne. legumi cotti a lungo con spezie che riscaldano. brodi di carne e pesce. assumere bevande mobilizzanti con le spezie consigliate", "Cereali: quinoa, riso, riso basmati, farro, segale, avena", "Legumi e noci: fave, ceci, lenticchie, piselli, fagioli neri, agioli comuni, noci, nocciole, pinoli, semi di girasole, arachidi, castagne", "Verdure: carote, patate, zucca, peperone, porri, cipolla, aglio, finocchi, cavoli. FRUTTA.: frutta cotta con spezie, ciliege, litchi, fichi", "Carne: manzo, tacchino, pollo, agnello, capra, cervo, selvaggina", "Pesce: aragosta cozze gamberetti, capesante, seppie, trote, acciuga, anguilla", "Spezie: anice, chiodi di garofano, cannella, timo, rosmarino, noce moscata, zenzero secco, coriandolo, pepe capperi, rafano, cumino", "Bevande: acqua calda, tisane con: cumino, timo, rosmarino salvia, cardamomo, anice. caffè d’orzo"]}
          ],
          info: [
            "Stile di vita: vestirsi bene, tenere al caldo l’addome e la schiena, le gambe ed i piedi. eventualmente usare fonti di calore esterni da applicare alle zone fredde. se ben coperti esporsi all’aria fredda anche in inverno. esercizio fisico all’aria aperta. non dormire troppo. attenzione a sauna e bagni troppo caldi."
          ],
          appunti: ["Tutti sintomi respiratori, ma la causa è del rene.", "Il Cordyceps può essere d'aiuto."]
        }
      ]
    },
    {
      id: "tai-yang-vescica", titolo: "Tai Yang · Vescica",
      intro: ["Le sindromi della Vescica (tabella di pag. 13).", "Punti dell'organo: allarme VC 3 · chiave V 62 · yuan V 64 · shu V 28 · xi V 63."],
      schede: [
        {
          id: "vuoto-qi-vescica",
          titolo: "Vuoto di Qi di Tai Yang – Vescica",
          sotto: "Tai Yang · Vescica",
          pag: "34-35",
          meridiani: ["vescica"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 3 (Vescica)."
          ],
          voci: [
            ["Origine", "Corrisponde quasi totalmente ad una Sindrome da Deficit di Yang di Qi di Rene, solo con un interessamento della Vescica. E’ tipico delle persone anziane, che mano a mano che diminuisce l’energia renale aumentano la sintomatologia vescicale. Oppure nei bambini sofferenti di enuresi."],
            ["Principi di trattamento", "Tonificare lo Yang di Rene, Tonificare la Vescica"],
            ["Muscoli", "Tibiale Anteriore, Tibiale Posteriore, Sacrospinale"]
          ],
          tc: [
            "R 3 — Tonifica i Reni",
            "VC 4 — Tonifica lo Yang di Rene",
            "R 7 — Tonifica il Qi di Rene",
            "VC 6 — Tonifica lo Yang di Rene",
            "R 9 — Calma lo Shen",
            "VG 14 — Tonifica e riscalda lo Yang",
            "V 23 — Tonifica lo Yang di Rene",
            "VG 4 — Tonifica lo Yang di Rene",
            "V 28 — Tonifica lo Yang di Vescica",
            "ST 36 — Indirettamente tonifica il Rene",
            "V 52 — Tonifica lo Yang di Rene e lo Zhi",
            "VB 39 — Tonifica il Midollo"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Ambrosia", "Shilajit", "L-Arginina", "Zhen Wu Tang", "FM Sabal"], ["Luppolo", "Terminalia", "GLA", "Ba Zhen", "FM Cantharis"], ["Angelica", "Aswaganda", "Vit E400", "", "Solidago"], ["Bambù", "Acqua Yin", "Betacarotene", "", "Populus"], ["", "", "B complex, B12, B9", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Incontinenza", "Problemi lombari", "Freddo nell’area lombare", "Patologie genitali (maschili)", "Patologie croniche dell’orecchio", "Problemi alle ginocchia", "Avversione al freddo", "Congestione cefalica"]},
            {"titolo": "Sintomi", "items": ["Osteoporosi", "Edema alle gambe", "Sbandamento", "Debolezza nell’area lombare", "Dolore alle ginocchia", "Vertigini", "Debolezza delle ginocchia", "Freddo alle ginocchia", "Impotenza", "Arti freddi", "Tosse con espettorato", "Eiaculazione precoce", "Estremità fredde", "Spermatorrea", "Ricerca del calore", "Sterilità", "Convulsioni", "Acufeni", "Irregolarità mestruali", "Epilessia", "Leucorrea cronica", "Cefalea", "Calore distretto cefalico", "Epistassi"]},
            {"titolo": "Alimentazione da evitare", "items": ["Cibi crudi, freddi, umidi, pesanti, dolci. caffè tè verde, tè nero, zucchero bianco, alimenti privi di qi (denaturati, industriali, confezionati, scatolette) oltre a richiederne maggiore assunzione, non apportano energia. mangiare velocemente, senza masticare, con ritmi irregolari, stuzzicare continuamente"]},
            {"titolo": "Alimentazione consigliata", "items": ["Piccole quantità di alimenti astringenti (infusi di more, lamponi immaturi, prugne umeboschi), cucinare tre volte al giorno, bere liquidi caldi non oltre la sete (esclusi i casi in cui abbiamo dei calcoli in cui è necessario bere molto). quotidianamente piccole dosi di uova, pesce, carne. legumi cotti a lungo con spezie che riscaldano. brodi di carne e pesce. assumere bevande mobilizzanti con le spezie consigliate", "Seguire un alimentazione leggera: evitare cibi crudi, no alla natura termica troppo fredda e troppo calda", "Mantenere un alimentazione il più possibile bilanciata evitando il sapore amaro e quello piccante che disperde l’energia già scarsa", "Cereali: quinoa, riso, riso basmati, farro, segale, avena", "Legumi e noci: fave, ceci, lenticchie, piselli, fagioli neri, agioli comuni, noci, nocciole, pinoli, semi di girasole, arachidi, castagne", "Verdure: carote, patate, zucca, peperone, porri, cipolla, aglio, finocchi, cavoli. FRUTTA.: frutta cotta con spezie, ciliege, litchi, fichi", "Carne: manzo, tacchino, pollo, agnello, capra, cervo, selvaggina", "Pesce: aragosta cozze gamberetti, capesante, seppie, trote, acciuga, anguilla", "Spezie: anice, chiodi di garofano, cannella, timo, rosmarino, noce moscata, zenzero secco, coriandolo, pepe capperi, rafano, cumino", "Bevande: acqua calda, tisane con: cumino, timo, rosmarino salvia, cardamomo, anice. caffè d’orzo"]}
          ],
          info: [
            "Stile di vita: vestirsi bene, tenere al caldo l’addome e la schiena, le gambe ed i piedi. eventualmente usare fonti di calore esterni da applicare alle zone fredde. se ben coperti esporsi all’aria fredda anche in inverno. esercizio fisico all’aria aperta. non dormire troppo. attenzione a sauna e bagni troppo caldi."
          ],
          appunti: ["→ incontinenza."]
        },
        {
          id: "vuoto-freddo-vescica",
          titolo: "Vuoto-Freddo di Tai Yang – Vescica",
          sotto: "Tai Yang · Vescica",
          pag: "36-37",
          meridiani: ["vescica"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) + · V 35 (Yang) – · R 13 (Qi) O",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): O + – – — + + – O — + + – –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 3 (Vescica)."
          ],
          voci: [
            ["Origine", "E’ determinata dall’invasione dell’Umidità e dal concomitante Vuoto di Yang. Il Freddo e l’Umido si depositano del Triplice Riscaldatore Inferiore, causando l’ostruzione dei passaggi dell’Acqua e alterando la funzione di Vescica di trasformare il Qi. E’ in pratica una sindrome da attacco esterno che colpisce un organo predisposto, dal Vuoto di Yang"],
            ["Principi di trattamento", "Espellere il Freddo, Eliminare l’Umidità, Tonificare lo Yang"],
            ["Muscoli", "Tibiale Anteriore, Tibiale Posteriore, Sacrospinale"]
          ],
          tc: [
            "V 22 — Muove l’Acqua nel TR Inferiore",
            "VC 3 — Elimina l’Umidità dalla Vescica",
            "V 23 — Tonifica lo Yang di Rene",
            "VC 6 — Riscalda lo Yang",
            "V 28 — Elimina l’Umidità dalla Vescica",
            "VC 9 — Elimina l’Umidità in generale",
            "MP 6 — Elimina l’Umidità dal TR Inferiore",
            "ST 28 — Elimina l’Umidità dal TR Inferiore",
            "MP 9 — Elimina l’Umidità dal TR Inferiore"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Ginko Biloba", "Cyperus", "Vit. B5, Vit. B9", "Jin Gui Shen Qi Wan", "Actea Racemosa"], ["Acqua Yin", "Chyavanprash", "Calcio", "You Gui Was", "Dulcamara"], ["Nero Acqua", "Shilajit", "Potassio", "Wu Ling San", "Populus"], ["Ecto 1", "", "Vit C", "", "Glonoinum"], ["", "", "Therm Max", "", "Sabal"], ["", "", "", "", "Berberis"]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Cistiti (da freddo)", "Cervicalgia", "Cefalea con Vasocostrizione", "Cefalea occipitale", "Cefalea Dispeptica"]},
            {"titolo": "Sintomi", "items": ["Sensazione di pesantezza e distensione epigastrica", "Sensazione di pesantezza all’uretra", "Nefriti croniche", "Stranguria", "Minzione urgente", "Alcune coliche renali", "Pollachiuria", "Minzione frequente", "Urine pallide e torbide", "Disuria", "Difficoltà di minzione", "Tenesmo vescicale", "Incontinenza urinaria"]},
            {"titolo": "Alimentazione da evitare", "items": ["Limitare i cibi crudi, freddi, pesanti ed umidi (gelati, alimenti presi direttamente dal frigorifero,. niente caffè tè verde e te nero, zucchero bianco e bevande zuccherate. non esagerare con le spezie troppo calde. niente pane bianco, bevande alcoliche alimenti combinati grasso dolce (cioccolata, panna, torte) e grasso salato (patatine, fritti, salumi)"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cucinare tre volte al giorno, bere liquidi caldi non oltre la sete (esclusi i casi in cui abbiamo dei calcoli in cui è necessario bere molto). quotidianamente piccole dosi di uova, pesce. legumi cotti a lungo con spezie che riscaldano. brodi di verdura e pesce. cucinare in modo semplice e con pochi ingredienti. alimenti con effetto diuretico: soia rossa, cardamomo, mais, barba di mais, assumere bevande mobilizzanti con le spezie consigliate", "Cereali: quinoa, riso, riso basmati, farro, segale, avena, orzo grano saraceno", "Legumi e noci: soia gialla, soia nera, azuki, piselli, fave, ceci, lenticchie, piselli, fagioli neri, fagioli comuni, noci, pinoli, nocciole, semi di girasole, arachidi, castagna", "Verdure: carote, patate, zucca, peperone, porri, cipolla, aglio, finocchi, cavoli, funghi", "Frutta: frutta cotta con spezie, ciliegie, litchi, fichi", "Carne: manzo, tacchino, pollo, agnello, capra, cervo", "Pesce: generalmente tutti i pesci; aragosta, cozze, gamberetti, capesante, seppie, trote", "Spezie: anice, basilico, rucola, aglio, paprika, coriandolo, chiodi di garofano, cannella, timo, rosmarino, noce moscata, zenzero secco", "Bevande: acqua calda, tisane con: cumino, zenzero, barba di mais, cardamomo; caffè d’orzo"]}
          ],
          info: [
            "Stile di vita: vestirsi bene, tenere al caldo l’addome, la schiena, le gambe ed i piedi. eventualmente usare fonti di calore esterni da applicare alle zone fredde. se ben coperti esporsi all’aria fredda anche in inverno. esercizio fisico all’aria aperta. non dormire troppo. attenzione a sauna e bagni troppo caldi, evitare di esporsi troppo a freddo ed umidità esterni. ."
          ],
          appunti: [
            "Cistiti o cefalee da vasocostrizione (passano con alcool o caffè): bisogna ridurre lo Yin.",
            "Classico mal di testa miotensivo."
          ]
        },
        {
          id: "umidita-calore-vescica",
          titolo: "Umidità-Calore di Tai Yang – Vescica",
          sotto: "Tai Yang · Vescica",
          pag: "38-39",
          meridiani: ["vescica"],
          test: [
            "ST 24 (Xuè) + · R 19 (Yin) O · V 35 (Yang) + · R 13 (Qi) –",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): + O + O — O + + O — O + + –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 3 (Vescica)."
          ],
          voci: [
            ["Origine", "Le cause possono essere gli eccessi alimentari; le energie perverse esterne; può essere la vicariazione di una condizione di Umidità-Calore di un altro organo; infine può insorgere da cause emotive. In MTC, questa sindrome è collegata, a livello psichico, alla gelosia (repressa), ad un eccessivo attaccamento alle cose e alle persone, il sospetto."],
            ["Principi di trattamento", "Eliminare l’Umidità"],
            ["Muscoli", "Tibiale Anteriore, Tibiale Posteriore, Sacrospinale"]
          ],
          tc: [
            "V 28 — Elimina l’Umidità dalla Vescica",
            "MP 6 — Elimina l’Umidità dal TR Inferiore",
            "V 66 — Elimina l’eccesso di Calore",
            "MP 9 — Elimina l’Umidità dal TR Inferiore",
            "VC 3 — Stimola le funzioni della Vescica",
            "F 8 — Libera la Vescica",
            "VC 9 — Elimina l’Umidità",
            "F 2 — Rinfresca il TR Inferiore"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Althea Officinalis", "Bambù", "Boro", "Ba Zheng San", "FM Sabal♂"], ["Salice Bianco", "Boswelia", "B6", "Er Miao San", "FM Agnus♀"], ["Mirtillo Rosso", "Acqua Yang", "Betacarotene", "Astragalo", "FMS Drosera"], ["Uva Ursina", "", "Calmag", "", "FM Cantharis"], ["Solidago", "", "B complex", "", "Thuya 30 CH"], ["Malva", "", "Fermenti Lattici", "", "Helonias 5CH"], ["Lapacho", "", "", "", "Monilia Albicans 9CH"]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Infezioni delle vie urinarie", "Algie muscolo scheletriche", "Problemi sessuali maschili", "Prostatite", "Depositi batterici", "Micosi urogenitali", "Cefalea"]},
            {"titolo": "Sintomi", "items": ["Cistiti", "Disuria", "Uretriti", "Urine scarse, torbidi e gialle", "Impotenza", "Bruciore alla minzione", "Ematuria", "Coliche renali", "Iperpiressia", "Calcoli renali", "Tbc renale", "Renella", "Leucorrea", "Algie reumatiche alle gambe", "Pollachiuria impellente", "Candidosi", "Algie muscolari sorde", "Dolori generali", "Lombosciatalgia", "Emicrania", "Sete"]},
            {"titolo": "Alimentazione da evitare", "items": ["Mangiare troppo, meglio fermarsi al 70%, alimenti pesanti come fritti, latticini, molto dolci come cioccolata. alcol, superalcolici, liquori. spezie troppo riscaldanti, alimenti arrostiti, grigliati, affumicati. alimenti troppo freddi umidi e crudi, difficili da digerire. farina bianca, zucchero, carne e caffè"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti leggermente drenanti, neutri e non troppo nutrienti (per i primi giorni meno cereali) alimenti aromatici ed un po’ piccanti che alzano e diffondono il Qi, aiutando la digestione, un po’ cibi amari per drenare", "Cereali: orzo, grano saraceno, amaranto, mais, riso, segale, miglio", "Legumi e noci: soia rossa, soia verde, soia gialla, germogli di soia", "Verdure: tarassaco patata zucca cetriolo. sedano, carciofo, cavolo, asparago, funghi, rafano, ravanello, rucola, melanzana, insalate a foglia amara", "Pesce: granchio, vongole", "Spezie: rucola crescione limone, tarassaco, barba di mais, artemisia, achillea", "Bevande: tisana e centrifuga di tarassaco, decotto con bucce di agrumi, acqua d’orzo e tè verde"]}
          ],
          info: [
            "Stile di vita: evitare le fonti di umidità o calore di origine esterna, seguire una cura con riso azuki e verdure cotte."
          ],
          appunti: [
            "Infezione delle vie urinarie → cistiti, prostatiti.",
            "→ stasi di sangue, perché il Qi muove il sangue."
          ]
        }
      ]
    },
    {
      id: "jue-yin-fegato", titolo: "Jue Yin · Fegato",
      intro: ["Le sindromi del Fegato (tabella di pag. 14).", "Punti dell'organo: allarme F 14 · chiave MC 6 · yuan F 3 · shu V 18 · xi F 6."],
      schede: [
        {
          id: "stasi-sangue-fegato",
          titolo: "Stasi di Sangue di Jue Yin – Fegato",
          sotto: "Jue Yin · Fegato",
          pag: "40-41",
          meridiani: ["fegato"],
          test: [
            "ST 24 (Xuè) + · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) –",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): + O O +",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme F 14 (Fegato)."
          ],
          voci: [
            ["Origine", "E’ una vicariazione di una Stasi di Qi di Fegato che si è protratta nel tempo. La funzione del Fegato è di accumulare Sangue. Quando c’è la Stasi di Qi il Fegato accumula troppo Sangue, che ristagna. Essendo causata da una Stasi di Qi, questa Sindrome, insorge a causa di conflitti emotivi (frustrazione, collera repressa, risentimento)."],
            ["Principi di trattamento", "Disperdere il Fegato, Regolarizzare il Sangue"],
            ["Muscoli", "Romboide, Gran Pettorale Sternale"]
          ],
          tc: [
            "F 2 — Mobilizza il ristagno",
            "V 18 — Regolarizza il Sangue di Fegato",
            "F 3 — Regolarizza Qi e Sangue di Fegato",
            "MP 10 — Regolarizza il Sangue",
            "VB 34 — Regolarizza il Qi di Fegato",
            "VC 6 — Regolarizza il Qi e muove il Sangue",
            "V 17 — Regolarizza il Sangue"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Biancospino – Crataegus", "Agnocasto", "Vit. B6", "Chai Hu Shu Gan", "FM Magnesium"], ["Curcuma", "Alburno di Tiglio", "Coenzima Q10", "Xiao Yao San", "FM Chelidonium"], ["Alfalfa", "", "Rame", "Si Wu Tang", "FM Agnus"], ["Dioscorea", "", "Zinco", "Angelica", ""], ["", "", "Meso 2", "Dan Shen Yin", ""], ["Achillea 5 + Borsa del Pastore 5 + Calendula 5 + Millefoglie 5 + Cupressi 5", "", "", "Xue Fu Zhu Yu Tang", ""], ["Alchemilla 5 + Rosmarino 4 + Peonia 5 + Borsa del Pastore 5 + Calendula 5 + Millefoglie 5", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Sangue mestruale scuro con coaguli", "Sindrome pre mestruale"]},
            {"titolo": "Sintomi", "items": ["Presenza di “masse” addominali", "Dolore all’addome", "Unghie violacee", "Mestruazioni dolorose", "Pelle secca", "Labbra violacee", "Mestruazioni irregolari", "Petecchie", "Carnagione violacea", "Fibroma uterino", "Vomito di sangue", "Epistassi", "Dolore fisso, acuto, costante", "Vedi anche i sintomi di Stasi di Qi di Fegato"]},
            {"titolo": "Alimentazione da evitare", "items": ["Come deficit di qi e deficit di sangue in generale", "Alimenti molto salati che riscaldano e seccano troppo", "Alimenti pesanti, grassi e di scarsa qualità", "Alimenti molto acidi", "Evitare caffè", "Usare alcool con la massima cautela"]},
            {"titolo": "Alimentazione consigliata", "items": ["Per muovere c’è bisogno di yang, ma attenzione a non creare troppo calore", "Cereali: Orzo, Riso, Grano saraceno, Segale", "Legumi e noci: Azuki, Germogli di soia, Soia nera, Arachidi", "Verdure: Porro, Sedano, Melanzane, Rape, Carote, Alghe, Asparagi, Cipolle", "Frutta: Ciliegie, More, Papaia, Lampone, Prugna", "Carne: Poco coniglio, Vitello", "Pesce: Granchio, Polipo", "Erbe e spezie: Curcuma (medicina del fegato), Coriandolo, Origano, Zafferano, Salvia, Timo, Capperi, Verbena", "Bevande: Tisane (rosa, salvia, leonurus cardiaca, verbena, menta, timo, basilico)"]}
          ],
          appunti: [
            "Comune, perché conseguente alla stasi di Qi.",
            "Dolori trafittivi.",
            "Sangue coagulato o molto scuro nel ciclo."
          ]
        },
        {
          id: "deficit-sangue-fegato",
          titolo: "Deficit di Sangue di Jue Yin – Fegato",
          sotto: "Jue Yin · Fegato",
          pag: "42-43",
          meridiani: ["fegato"],
          test: [
            "ST 24 (Xuè) – · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme F 14 (Fegato)."
          ],
          voci: [
            ["Origine", "E’ la vicariazione di una problematica di Milza, che non riesce a produrre a sufficienza il Sangue. Questo può essere determinato da una dieta povera di proteine, una emorragia acuta o cronica. Infine, può essere la vicariazione di un Vuoto di Qi del Rene."],
            ["Principi di trattamento", "Nutrire il Sangue, Tonificare il Fegato"],
            ["Muscoli", "Gran Pettorale Sternale, Romboide"]
          ],
          tc: [
            "F 8 — Tonifica il Sangue di Fegato",
            "VC 4 — Tonifica il Sangue",
            "V 17 — Nutre il Sangue",
            "MP 6 — Nutre il Sangue",
            "V 18 — Nutre il Fegato",
            "MP 10 — Tonifica e fa circolare il Sangue",
            "V 20 — Nutre il Sangue",
            "ST 36 — Risolve le stasi",
            "V 23 — Tonifica i Reni per produrre il Sangue"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Angelica Sinensis", "Curcuma", "Vit. B1", "Si Wu Tang", "Natrium Muriaticum 9CH"], ["Achillea", "Eleuterococco", "Vit. B6", "Ba Zhen Wan", "FM Agnus"], ["Acerola", "Genziana", "Magnesio", "Dang Gui", "China 9 CH"], ["Aswaganda", "Equiseto", "Zinco", "Bu Gan Tang", "FM Chelidonium"], ["Alfa Alfa", "Spirulina", "Ferro", "Gou Qi Zi Cha", ""], ["Nasturzio 5 +Arserinae 5 + Ortica 5 + Liquirizia 3 + Pulmonaria 5", "", "Ecto 2", "Qi Ju Di Huang Wan", ""], ["Semi di Lino 5 + Nasturzio 5 + Ortica 5 + Liquirizia 3 + Altea 5 + Tarassaco 5", "", "Legno Yin", "Sheng Hua Wan", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Periartrite scapolo omerale", "Atrofia del nervo ottico", "Esaurimento psicofisico", "Fibroma uterino", "Anemia", "Trombosi cerebrali", "Amenorrea"]},
            {"titolo": "Sintomi", "items": ["Labbra pallide", "Colorito pallido giallastro", "Unghie secche e fragili", "Visione offuscata", "Astenia", "Annebbiamento visivo", "Palpitazioni", "“Mosche volanti”", "Dolore mestruale", "Capogiri", "Secchezza oculare", "Mestruazioni scarse", "Vertigini", "Spasmi", "Coaguli sanguigni", "Tremori", "Contratture muscolari", "Dispnea da sforzo", "Insonnia", "Crampi", "Crampi ai polpacci", "Intorpidimento degli arti", "Pelle secca", "Spasmi muscolari", "Acufeni", "Capelli secchi", "Cefalea", "Parestesie", "Ansia", "Irascibilità", "Iperonirismo", "Nevrosi", "Ipertensione", "Epatite"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti che riscaldano troppo o dissecano (caffè, tè verde e tè nero, superalcolici, spezie calde, fritti, cioccolata, troppo sale, alimenti grigliati, arrostiti, crostacei)", "Attenti ai pesci che aumentano il calore nel sangue (trota, aringa, acciuga, cappesante, cozze, gamberetti)", "Fumare", "Dormire poco e coricarsi troppo tardi", "Donare il sangue", "Cibi secchi"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti neutri e freschi ma cucinati in modo da facilitare l’assimilazione, piccole quantità di tiepidi", "Alimenti di sapore dolce blando e acido", "Cucinare cibi succosi e umidi utilizzando metodi di cottura yin", "Assumere regolarmente, almeno 2 volte a settimana piccole quantità di pesce carne ed interiora o brodi di carne o pesce", "Olio di sesamo, di girasole, di borragine", "Pappa reale, melassa, polline", "Erba di grano", "Cereali: Riso, Orzo, Grano, Kamut, Miglio, Quinoa, Amaranto", "Legumi e noci: Soia nera e soia gialla (anche germogliata), Lenticchie, Noci, Nocciole, Semi di sesamo, girasole, Pinoli", "Verdure: Carote, Sedano, Spinaci, Coste, Tarassaco, Ortica, Pomodoro, Broccoli, Cavolo, Rape rosse, Asparagi, Insalate amare, Ravanello, Germogli di erba medica", "Frutta: Uva, Litchi, More di gelso, Prugne, Limoni, Fragole, Ciliegie, Lamponi, Mirtilli, Uvetta, Avocado, Datteri", "Carne e latticini: Anatra, Maiale, Pollo, Latte, Ghee, Yogurt, Ricotta, Uova, Formaggio", "Pesce: Calamaro, Polpo, Anguilla, Ostriche, Sarde, Alici, Sgombro, Cozze", "Spezie: Prezzemolo, Crescione, Salvia, Ortica", "Bevande: Succo d ‘uva, Tisane, Brodo"]}
          ],
          info: ["Stile di vita: Riposare, Attenzione a stati emotivi che creano stress."],
          appunti: [
            "Comune, perché conseguente alla stasi di Qi.",
            "Accanto ad «Amenorrea» aggiunto: ipermenorrea.",
            "Il succo di mela chiodata è una buona fonte di ferro.",
            "Si Wu Tang e Ba Zhen Wan: formule importanti per nutrire il sangue."
          ]
        },
        {
          id: "eccesso-yang-fegato",
          titolo: "Eccesso dello Yang del Jue Yin – Fegato",
          sotto: "Jue Yin · Fegato",
          pag: "44-45",
          meridiani: ["fegato"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) – · V 35 (Yang) + · R 13 (Qi) O",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): O O + O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme F 14 (Fegato)."
          ],
          voci: [
            ["Origine", "E’ la vicariazione di un Vuoto di Yin di Rene, che non è più in grado di nutrire il Fegato, il quale manifesta anch’egli un Vuoto di Yin. Anche se si manifesta con segni da eccesso, in realtà nasce da un vuoto, perché l’eccesso di Yang e solo relativo. Lo Yin non è più in grado di controllare lo Yang, che aumenta e causa uno stato di pienezza nell’alto e di vuoto nel basso del corpo."],
            ["Principi di trattamento", "Nutrire lo Yin, Sedare l’Eccesso di Fegato"],
            ["Muscoli", "Gran Pettorale Sternale, Romboide"]
          ],
          tc: [
            "MC 6 — Punto chiave del Jue Yin",
            "VB 43 — Seda l’eccesso di Yang",
            "TR 2 — Seda l’eccesso di Yang",
            "F 3 — Riequilibra questa Sindrome",
            "VB 20 — Seda lo Yang della testa",
            "TR 5 — Agisce sulle emicranie",
            "F 8 — Tonifica lo Yin del Fegato",
            "VB 34 — Agisce sulle emicranie",
            "R 3 — Tonifica lo Yin di Rene",
            "VB 5 — Drena lo Yang",
            "VB 38 — Sottomette lo Yang di F",
            "MP 6 — Tonifica lo Yin",
            "VB 8 — Drena lo Yang",
            "V 18 — Nutre il Fegato",
            "VC 4 — Tonifica lo Yin",
            "VB 14 — Sottomette lo Yang",
            "V 23 — Tonifica lo Yin di Rene",
            "VG 20 — Controlla lo Yang"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Desmodio", "Tarassaco", "B Complex", "Liu Wei Di Huang Wan", "Chelidonium"], ["Cardo Mariano", "Carciofo", "Vit. C", "Tian Ma Gou Teng Yin", "China 5CH"], ["Chrysantellum", "Lycopo", "Genziana", "Schisandra Chinensis", "Lycopodium 5CH"], ["Rafano", "Legno Yang", "Iperico", "", "Nux Vomica"], ["Fumaria", "Verde Legno", "", "", "Phosphorus 15CH"]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Sindrome premestruale", "Problemi muscolari E tendinei", "Epatite acuta", "Ipertiroidismo", "Ipertensione", "Stato post apoplettico", "Coronaropatia", "Sindrome Ménière", "Problematiche oculari", "Cefalea vasomotoria", "Nevrosi"]},
            {"titolo": "Sintomi", "items": ["Vampate di calore con arrossamento del volto", "Dolore e debolezza lombare", "Febbre intermittente", "Dolore e debolezza ginocchia", "Sudori notturni", "Sensazione di scosse muscolari", "Contratture, spasmi muscolari", "Vertigini", "Patologie oftalmiche acute", "Cefalea temporale", "Capogiri", "Congiuntivite", "Cefalea parietale", "Arrossamento e bruciore oculare", "Cefalea del vertice", "Irritabilità", "Fotofobia", "Cefalea oculare", "Collera", "Nevralgie oculari", "Cefalea occipitale", "Insonnia", "Secchezza oculare", "Secchezza della bocca", "Ansia", "Acufeni", "Secchezza faringea", "Palpitazioni", "Ipoacusia", "Emorragie"]},
            {"titolo": "Alimentazione da evitare", "items": ["Attenzione ai cibi yang che muovono, perché ciò che muove va anche in alto", "Alimenti che creano calore, tutti gli alcolici eccetto qualche birra, crostacei, carni che scaldano (cervo, manzo, pollo), spezie calde", "Metodi di cucina yang: grigliare, friggere, arrostire", "Troppo sale, insaccati, stagionati", "Caffè", "Sigarette", "Alimenti che ledono la milza: gelati, dolci", "Mangiare troppo, troppo grasso, difficile da digerire, troppo a cena"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti freschi, amari, acid", "Centrifughe di verdura con molto sedano", "Tisane di melissa, salvia, lavanda, tarassaco", "Alimenti a fermentazione lattica, yogurt", "Insalate amare ad ogni pasto", "Dormire abbastanza", "Evitare tensioni e scocciature", "Cereali: Orzo, Grano saraceno, Miglio, Amaranto, Quinoa", "Legumi e noci: Soia gialla, Soia nera, Soia verde, Germogli di soia verde, Germogli di erba medica (alfa alfa), Ceci", "Verdure: Sedano, Pomodoro, Cicoria, Radicchio, Insalata belga, Spinaci, Tarassaco, Coste, Funghi, Ravanello, Crescione, Rafano, Zucchine, Melanzane, Cetrioli, Ortica, Asparagi, Carciofi, Carota, Lattuga, Broccoli", "Frutta: Melone, Anguria, Pera, Pompelmo, Arancia, Mandarini", "Carne e latticini: Coniglio, Anatra, Brodo, Ricotta, Ghee", "Pesce: Polpo, Calamari, Ostriche", "Erbe e spezie: Bucce di agrumi, Salvia, Menta, Origano, Passiflora, Lavanda, Verbena, Maggiorana"]}
          ],
          appunti: [
            "Sintomi più acuti e legati realmente al fegato.",
            "Da tenere sotto controllo perché come conseguenza può avere una fuga dello Yang del Fegato, dovuta a un'incazzatura, che porta all'ictus."
          ]
        },
        {
          id: "stasi-qi-fegato",
          titolo: "Stasi del Qi di Jue Yin – Fegato",
          sotto: "Jue Yin · Fegato",
          pag: "46-47",
          meridiani: ["fegato"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) +",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): O O O –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme F 14 (Fegato)."
          ],
          voci: [
            ["Origine", "E’ la Sindrome più frequente in assoluto. Anche se le manifestazioni sintomatiche sembrano da vuoto (tristezza, depressione, apatia), in realtà questa Sindrome è una Sindrome da Pieno. La principale causa sono i conflitti emotivi: frustrazione, collera repressa, risentimento. Se provati per molto tempo, possono innescare questa condizione."],
            ["Principi di trattamento", "Regolarizzare il Qi, Disperdere il Fegato"],
            ["Muscoli", "Romboide, Gran Pettorale Sternale"]
          ],
          tc: [
            "VC 18 — Punto nodo del Jue Yin",
            "F 2 — Mobilizza il ristagno",
            "VB 34 — Regolarizza il Qi di Feagato",
            "F 3 — Regolarizza il Qi di Fegato",
            "VB 41 — Disperde il Fegato",
            "F 13 — Riduce la superinizione del Fegato sulla Milza",
            "ST 36 — Fa scendere il Qi",
            "F 14 — Regolarizza il Qi",
            "MC 6 — Dinamizza il Qi",
            "MP 6 — Mobilizza il ristagno"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Cardo Mariano", "Shilajit", "B6", "", "Lycopodium"], ["Salice Bianco", "Brahmi", "Metionina", "Ban Xia Huo Po Tang", "Sulfur"], ["Terminalia", "Carciofo", "Colina", "Xiao Yao San", "Chelidonium"], ["Tarassaco", "Alburno di Tiglio", "Magnesio", "Chai Hu Su Gan Tang", ""], ["Boldo", "Legno Yin", "B Complex", "", ""], ["Menta 3 + Valeriana 3 + Lavanda 3 + Alchemilla 5 + Millefoglie 5", "", "", "", ""], ["Millefoglie 5 + Anice 5 + Menta 5 + Alchemilla 5 + Carvi 5", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Mastite", "Irregolarità mestruali", "Mastopatia fibrocistica", "Colecistite", "Discinesie biliari", "Epato spleno megalia", "Sindrome ansiosa con depressione occasionale E manie", "Stasi portali", "Stasi venose"]},
            {"titolo": "Sintomi", "items": ["Unghie Fragili", "Funzioni ormonali mediate dalla conversione steroidea", "Amenorrea", "Anoressia", "Dismenorrea", "Perdita di appetito", "Mestruazioni dolorose", "Brividi", "Sindrome premestruale", "Formazione di masse nell’addome", "Formazioni nodulari a livello del collo e della gola", "Distensione mammaria premestruale", "Tensione e distensione ipocondriaca e costale laterale", "Sensazione di un corpo estraneo nella gola, nodo alla gola con difficoltà a deglutire", "Depressione", "Rigurgito acido", "Congiuntivite", "Frustrazione", "Nausea", "Turbe della Vista", "Tristezza", "Vomito", "Crampi Muscolari", "Apatia", "Eruttazione", "Spasmi muscolari", "Irritabilità", "Ipocondralgia", "Tensione", "Malumore", "Epigastralgia", "Malinconia", "Borborigmi", "Oscillazione dell’umore", "Dissenteria", "Disglicemia con ipotiroidismo", "Insonnia", "Dispepsia con nausea", "Disturbi tiroidei", "Infelicità", "Oppressione toracica", "Disturbi ormonali", "Sentirsi “Ferito”"]},
            {"titolo": "Alimentazione da evitare", "items": ["Di mangiare per alleviare la tensione", "Alimenti che riscaldano troppo, attenzione ad alcool e aglio", "Alimenti pesanti, grassi e di scarsa qualità", "Alimenti molto acidi", "Evitare caffè, Troppa carne, mangiare a buffet"]},
            {"titolo": "Alimentazione consigliata", "items": ["Un’alimentazione leggera e non troppo tonificante, aggiungere sempre spezie mobilizzanti", "Cucinare con un po’ di vino", "Per muovere c’è bisogno di yang, ma attenzione a non creare troppo calore", "Cereali: Orzo, Grano saraceno, Segale, Mais, Grano, Kamut, Farro, Miglio, Riso", "Legumi e noci: Azuki, Germogli di soia, Soia nera", "Verdure: Porro, Sedano, Melanzana, Carota, Alghe wakame o kombu, Rucola, Ravanello, Crescione, Rafano, Carciofo", "Frutta: Arancini cinesi, Pompelmi, Prugne", "Carne: Coniglio, Pollo", "Pesce: Granchio", "Erbe e spezie: Curcuma (medicina del fegato), Coriandolo, Origano, Zafferano, Capperi, Cardamomo, Maggiorana, Prezzemolo, Cumino, Rucola, Pepe, Basilico, Rosmarino", "Bevande: Tisane (rosa, fiori d’arancio, gelsomino) bucce di arancia, acqua d’orzo, melissa, passiflora, menta, lavanda, achillea, artemisia"]}
          ],
          info: [
            "Stile di vita: importantissimo il lavoro sulle emozioni e sugli impulsi. Evitare stress, pressione emotiva, perfezionismo. Ballare, cantare, ridere, dipingere, cercare un modo per esprimersi spontaneamente. Importantissimo il movimento fisico ma senza competitività. Yoga, tai qi, rilassamento. La stasi a volte causa una muscolatura poco elastica ed un tono muscolare alto, fare qualcosa per contrastarlo. SE QUALCOSA TI DISTURBA: CAMBIA QUELLO CHE PUOI CAMBIARE ED ACCETTA QUELLO CHE NON PUOI CAMBIARE."
          ],
          appunti: ["La più comune.", "«Mi rodo il fegato» → gli italiani."]
        },
        {
          id: "umidita-calore-fegato-vb",
          titolo: "Umidità-Calore di Fegato e Vescica Biliare",
          sotto: "Jue Yin · Fegato",
          pag: "48-49",
          meridiani: ["fegato", "vescica-biliare"],
          test: [
            "ST 24 (Xuè) + · R 19 (Yin) O · V 35 (Yang) + · R 13 (Qi) –",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): + O + O — O + + O — O + + –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme F 14 (Fegato)."
          ],
          voci: [
            ["Origine", "E’ una vicariazione di un Vuoto di Qi della Milza. L’Umidità della Milza si combina con uno stato di Calore nel Fegato. Oppue può nascere come una Stasi di Qi di Fegato che produce Calore e che causa un deficit di Qi di Milza, facendo ristagnare l’Umido. Comunque sia, questo è un quadro che si raggiunge nell’arco di molto tempo, con una implicazione emotiva (collera) ed alimentare (cibi grassi, troppo speziati, troppi dolci, alcool)."],
            ["Principi di trattamento", "Dissolvere l’Umido, Purificare il Calore"],
            ["Muscoli", "Romboide, Gran Pettorale Sternale"]
          ],
          tc: [
            "F 2 — Purifica il Calore dal Fegato",
            "V 18 — Muove il Qi di Fegato, dissolve l’Umido",
            "F 14 — Regola il Qi di Fegato",
            "V 19 — Muove il Qi di Fegato, dissolve l’Umido",
            "VB 24 — Regola il Qi di Fegato, dissolve l’Umido",
            "V 20 — Attiva il TR Medio per dissolvere l’Umido",
            "VB 34 — Muove il Qi di Fegato, dissolve l’Umido",
            "VC 12 — Attiva il TR Medio per dissolvere l’Umido",
            "MP 3 — Dissolve l’Umido",
            "IC 11 — Dissolve l’Umido e purifica il Calore",
            "MP 6 — Dissolve l’Umido dal TR Inferiore",
            "VG 9 — Dissolve l’Umido da VB",
            "MP 9 — Dissolve l’Umido dal TR Inferiore"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Curcuma", "Desmodio", "Colina", "Da Chai Hu Tang", "Lycopodium"], ["Tarassaco", "Rafano nero", "B Complex", "Long Dan Xie Gan", "Chelidonium"], ["Boldo", "Fumaria", "Vit. E", "Dan Huang Pills", "Sulfur"], ["Carciofo", "Legno Yang", "Inositolo", "", ""], ["Cardo Mariano", "", "Lecitina di soia", "", ""], ["", "", "Enzimi proteolitici 48", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Eczema", "Angiocolite", "Febbre tifoidea E malarica", "Ittero subacuto da stasi", "Epatite acuta E cronica", "Leptospirosi", "Vaginite", "Anoressia", "Ittero", "Calcoli biliari", "Herpes zoster", "Colecistite"]},
            {"titolo": "Sintomi", "items": ["Stordimento", "Iperpiressia", "Eczema Scrotale", "Testa pesante", "Unghie fragili", "Gonfiore ed arrossamento dello scroto", "Ipocondralgia e sensazione di pienezza toracica", "Nausea", "Leucorrea e prurito vaginale", "Vomito", "Sapore amaro in bocca", "Distensione addominale", "Vaginiti", "Febbre", "Perdita di appetito", "Eczema scrotale", "Bocca amara", "Occhi gialli"]},
            {"titolo": "Alimentazione da evitare", "items": ["Mangiare troppo, meglio fermarsi al 70%, alimenti pesanti come fritti, latticini", "Niente zucchero, alcool, superalcolici, liquori. spezie troppo riscaldanti, alimenti arrostiti, grigliati, affumicati", "Alimenti troppo freddi umidi, difficili da digerire", "Farina bianca, carne e caffè", "Oli i scadenti"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti leggermente drenanti, neutri e non troppo nutrienti", "Alimenti aromatici ed un po’ piccanti che alzano e diffondono il qi, aiutando la digestione", "Ottimo il grano saraceno associato alle verdure, riso con azuki", "Attenzione alla qualità degli alimenti", "Un po’di cibi amari per drenare", "Bollire, stufare o cucinare a vapore", "Cereali: orzo, grano saraceno, amaranto, riso, miglio", "Legumi e noci: soia rossa, soia verde, germogli di soia", "Verdure: tarassaco, patate, zucca, cetrioli, sedano, carciofi, cavoli, asparagi, funghi, rucola, melanzane, insalate a foglia amara, insalata belga, cicoria, rucola, tutti i germogli", "Pesce: granchio, vongole", "Erbe e spezie: rucola, crescione, tarassaco, cardo santo, fumaria officinale, berberis vulgaris, radice di genziana", "Bevande: tisana e centrifuga di tarassaco, decotto con bucce di agrumi, barba di mais, acqua d’orzo e tè verde"]}
          ],
          info: [
            "Stile di vita: evitare le cause di umidità e calore di origine esterna, seguire una cura con riso, azuki e verdure cotte. Lavorare sulla sfera emotiva che porta negatività."
          ],
          appunti: ["Frustrazione repressa, rabbia repressa."]
        },
        {
          id: "liberazione-fuoco-fegato",
          titolo: "Liberazione del Fuoco di Jue Yin – Fegato",
          sotto: "Jue Yin · Fegato",
          pag: "50-51",
          meridiani: ["fegato"],
          test: [
            "ST 24 (Xuè) – · R 19 (Yin) – · V 35 (Yang) + · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme F 14 (Fegato)."
          ],
          voci: [
            ["Origine", "E’ un aggravamento della Stasi di Qi di Fegato. Anche in questo caso le cause psichiche sono il fattore determinante. La collera e la frustrazione provate a lungo, come nelle frustrazioni familiari o sul posto di lavoro. Anche un eccessivo consumo di natura termica calda, speziati, alcool e cioccolata possono contribuire alla sua insorgenza."],
            ["Principi di trattamento", "Sottomettere lo Yang ed il Qi, Purificare il Calore, Muovere il Qi"],
            ["Muscoli", "Romboide, Gran Pettorale Sternale"]
          ],
          tc: [
            "F 2 — Punto specifico per questa sindrome",
            "VB 20 — Purifica il Calore, sottomette il Qi di F.",
            "F 3 — Calma il Fegato",
            "VB 13 — Sottomette lo Yang e calma lo Shen",
            "F 8 — Purifica il Calore del Fegato",
            "VG 16 — Sottomette lo Yang",
            "V 17 — Stimola il Sangue",
            "VG 20 — Disperde il Fuoco",
            "V 18 — Muove il Qi di Fegato",
            "R 3 — Purifica il Calore",
            "V 20 — Stimola il Qi di Milza",
            "MP 6 — Muove il Qi",
            "V 23 — Stimola i Reni",
            "IC 11 — Purifica il Calore"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Emblica", "Lapacho", "Rutina", "Dan Gui Long Hui Wan", "FM Valeriana"], ["Salice", "Aglio", "Zinco", "Long Dan Xie Gan Wan", "FM Chelidonium"], ["Curcuma", "Genziana", "Gla", "Angelica Sinensis", "FM Sulfur"], ["Alfalfa", "Melissa", "Cobalto", "", "Lycopodium"], ["Uncaria", "Iperico", "Magnesio", "", ""], ["Legno Yang", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Morbo di parkinson", "Candida", "Acidosi", "Spasmofilia", "Sindrome ansiosa", "Tic neuromuscolare", "Chetosi E nausea", "Epatite acuta", "Sindrome di Ménière", "Ipertiroidismo", "Sindrome maniaco- depressiva", "Ipertensione arteriosa"]},
            {"titolo": "Sintomi", "items": ["Spasmi muscolari e crampi", "Perdita di coscienza", "Convulsioni", "Affezioni colecisti", "Scosse e tremore al capo", "Cefalea temporale", "Tic e spasmi palpebrali", "Viso arossato", "Congestione del capo", "Tic e spasmi del volto", "Vertigine e capogiro", "Congestione occhi", "Tremori e tics", "Intorpidimento degli arti", "Congestione orecchie", "Gola secca", "Dolori ai fianchi", "Emorragie gastrointestinali", "Mucose secche", "Epistassi", "Oligoruia", "Iperonirismo", "Stipsi con feci secche", "Irritabilità, Collera, Ansia", "Capogiri", "Ipoacusia", "Emorragie", "Dolore e debolezza lombare", "Congiuntivite", "Glaucoma"]},
            {"titolo": "Alimentazione da evitare", "items": ["Cibi che appesantiscono il fegato, grassi, alimenti che riscaldano (spezie, alcool, carne rossa, aglio)", "Alimenti molto salati, fritti, arrostiti o grigliati, insaccati, crostacei, caffè, sigarette, dolci, gelati, esagerare a cena"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti che purificano il calore (Orzo, Miglio, Yogurt, etc.), che nutrono il sangue e lo yin in generale", "Alimenti neutri e freschi ma cucinati in modo da facilitare l’assimilazione, piccole quantità di tiepidi (Farro,)", "Alimenti di sapore blandamente dolce e acido", "Cucinare cibi succosi e umidi utilizzando metodi di cottura yin (bolliti, al vapore, a bagnomaria)", "Assumere regolarmente, almeno 2 volte a settimana, piccole quantità di pesce, carne ed interiora o brodi di carne o pesce", "Olio di sesamo, di girasole, di borragine", "Pappa reale, melassa, polline", "Erba di grano", "Cereali: Orzo, Grano integrale, Grano saraceno, Miglio, Farro", "Legumi e noci: Soia nera, Soia verde, Latte di soia, Tofu, Germogli di soia", "Verdure: Sedano, Coste, Tarassaco, Cetrioli, Pomodori, Broccoli, Cavolo, Spinaci, Insalata belga, Ravanello, Zucchine, Olive, Alghe marine", "Frutta: Pere, Melone, Anguria, Banana, Arancia, Limoni, Prugne", "Carne e latticini: Anatra, Yogurt", "Pesce: Calamaro, Polpo, Ostriche, Seppie", "Erbe e spezie: Crescione, Agaragar, Origano, Salvia, Limone, Alghe, Tarassaco, Menta, Melissa", "Bevande: Centrifughe di sedano, cetrioli e pomodori. Tisane di: Alghe, Tarassaco, Menta e Melissa"]}
          ],
          info: ["Stile di vita: Riposare, Attenzione a stati emotivi che creano stress."],
          appunti: ["Poi può diventare fuga dello Yang (ictus).", "Nell'origine: frustrazione «repressa»."]
        },
        {
          id: "freddo-fegato",
          titolo: "Freddo nel Jue Yin – Fegato",
          sotto: "Jue Yin · Fegato",
          pag: "52-53",
          meridiani: ["fegato"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) + · V 35 (Yang) O · R 13 (Qi) –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme F 14 (Fegato)."
          ],
          voci: [
            ["Origine", "E’ una invasione di Freddo, che ostruisce la circolazione del Qi. Il meridiano di Fegato scorre attorno ai genitali. Per questo motivo i sintomi si manifestano a livello genitale, con caratteristiche tipiche del Freddo: contrazione e miglioramento col calore."],
            ["Principi di trattamento", "Disperdere il Freddo, Mobilizzare il Qi"],
            ["Muscoli", "Romboide, Gran Pettorale Sternale"]
          ],
          tc: [
            "F 1 — Rimuove il Freddo dal TR Inferiore",
            "ST 30 — Regolarizza il Qi del TR Inferiore",
            "VC 3 — Disperde il Freddo dal TR Inferiore",
            "F 2 — Scalda il meridiano del Fegato",
            "MP 3 — Tonifica il Qi",
            "VC 4 — Elimina le Stasi",
            "F 3 — Fa circolare il Qi",
            "MP 6 — Nutre il Sangue e lo Yin",
            "VC 2 — Agisce sulla zona ipogastrica",
            "F 5 — Disperde il Freddo dai genitali",
            "V 23 — Tonifica il Qi"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Guggul", "Vit K", "Shatavari", "Xuan Gan Jiang", "FM Chelidonium"], ["Ginko", "Thermogen", "Vitha", "Tian Tai Wu Yao San", "FM Sulfur"], ["Desmodio", "Zolfo", "Legno Yin", "", "Lycopodium"], ["Tarassaco", "Zinco", "Verde Legno", "", ""], ["Carciofo", "Vit E400", "", "", ""], ["Fumaria", "Iodio", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Torsione del funicolo spermatico", "Annessite", "Ernia inguino-scrotale", "Varicocele", "Adenomi", "Epatite", "Fibromi", "Fegato grasso", "Sindrome post vurale", "Dismenorrea"]},
            {"titolo": "Sintomi", "items": ["Patologie dei testicoli e degli annessi", "Gonfiore ipogastrico con dolore irradiato allo scroto ed al testicolo", "Epididimite acuta", "Contrazione allo scroto", "I dolori si alleviano con il calore", "Sensazione di tensione ai testicoli", "Disturbi tiroidei", "Contrazione vaginale", "Dolore vaginale", "Dolore pelvico", "Depositi epatici di grasso", "Spasmi muscolari", "Cefalea", "Oppressione toracica", "Brividi e freddo agli arti", "Nodo alla gola", "Presenza di masse", "Stipsi", "Cistite", "Ipertrofia prostatica", "Ritensione urinaria", "Prostatite", "Dolore agli occhi", "Irritabilità", "Frustrazione", "Turbe della vista", "Tensione"]},
            {"titolo": "Alimentazione da evitare", "items": ["Cibi crudi, presi direttamente dal frigorifero", "Cibi pesanti", "Evitare tutto fiò che è dolce"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cucinare sempre, ottimi i brodi di carne e pesce", "Bere tisane mobilizzanti", "Cucinate con spezie mobilizzanti", "Cereali: segale, farro, avena, grano, quinoa, riso, mais", "Legumi e noci: fagioli neri, soia nera, soia verde, soia rossa", "Verdure: sedano, rucola, ravanelli, porri, cipolla, cavolo, broccolo, aglio, finocchi, patate, zucca, rape, cavolini di bruxelles, peperone, olive", "Frutta: prugne, pesche, limone, arancia, papaia, noce di cocco, litchi, lamponi, fichi, datteri, ciliegie, albicocche", "Carne e latticini: formaggio di capra, pollo, uova in piccole dosi", "Pesce: acciuga, cozza, polipo", "Erbe e spezie: Melissa, Rosmarino, Cumino, Cannella, Chiodi di garofano, Assenzio, Rosmarino, Arancio Lavanda, Verbena, Salvia, Lavanda"]}
          ],
          info: [
            "Stile di vita: coprirsi molto bene, evitare di esporsi troppo ad ambienti freddi. Utilizzare fonti di calore esterno da applicare direttamente sulle zone fredde (borsa dell’acqua calda, sale caldo, noccioli di ciliegia caldi, impacchi con lo zenzero). Attività fisica quotidiana, possibilmente all’aria aperta."
          ],
          appunti: [
            "Spesso conseguenza di cattiva alimentazione.",
            "Da alimentazione o freddo esterno → steatosi epatica.",
            "Aggiunto ai sintomi: frigidità."
          ]
        },
        {
          id: "deficit-yin-fegato",
          titolo: "Deficit dello Yin di Jue Yin – Fegato",
          sotto: "Jue Yin · Fegato",
          pag: "54-55",
          meridiani: ["fegato"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) – · V 35 (Yang) O · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme F 14 (Fegato)."
          ],
          voci: [
            ["Origine", "Questa Sindrome è in genere accompagnata da un Deficit di Yin del Rene. Il Rene, organo dell’Acqua, dovrebbe nutrire il Fegato, per la Legge di Generazione, ma se è in Deficit, non ne’ sarà in grado."],
            ["Principi di trattamento", "Tonificare lo Yin di Fegato"],
            ["Muscoli", "Romboide, Gran Pettorale Sternale"]
          ],
          tc: [
            "F 8 — Tonifica lo Yin di Fegato",
            "R 3 — Tonifica lo Yin",
            "V 23 — Tonifica lo Yin",
            "MP 6 — Tonifica lo Yin",
            "VC 4 — Tonifica lo Yin"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Ligustrum Lucidum", "B Complex", "Meso 2", "Liu Wei Di Huang Wan", "FM Chelidonium"], ["Sesamum Indicum", "Vit. B6", "", "", ""], ["Shatavari", "Legno Yin", "", "", ""], ["Boswelia", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Lombalgia", "Debolezza lombare"]},
            {"titolo": "Sintomi", "items": ["Bocca secca", "Allergie", "Gola secca", "Ipertensione arteriosa", "Vertigini", "Stipsi", "Cefalea", "Capogiri", "Oliguria con urine cariche", "Disturbi vascolari cerebrali", "Ipoacusia"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti che nutrono lo Yin e creano liquidi", "Frutta e verdura, meglio cotta o centrifugata", "Ottimi i centrifugati di uva e pera", "Piccole quantità di cibi astringenti e acidi (yogurt, limone, ananas, arance, kiwi ecc)", "Utilizzare metodi di cottura yin: in acqua, a vapore, fermentati, wok, crudo se la digestione lo permette", "Bere tisane o anche acqua tiepida", "Assumere polline, pappa reale, semi di sesamo, semi di lino", "Cereali: Grano integrale, Germogli di grano, Miglio, Orzo, Riso non a chicco lungo, Quinoa, Amaranto", "Legumi e noci: Soia nera, Soia verde, Ceci, Germogli, Latte di soia, Tofù", "Verdure: Sedano, Spinaci, Bietola, Cetriolo cotto, Pomodoro cotto, Avocado, Rape rosse, Cavolo, Olive, Ravanello, Asparagi, Alghe", "Frutta: Pere, Uva, Mele, Anguria, Arance, Limoni, Pompelmo, Mandarino, Cachi, Banane, More, Ananas, Ribes, Fragole", "Carne e latticini: Anatra, Coniglio, Cavallo, Fegato, Latte, Panna, Formaggi freschi, Yogurt", "Pesce: Frutti di mare, Calamari, Seppie, Polpo, Ostriche, Vongole", "Erbe e spezie: Salvia, Crescione, Menta, Melissa, Limone, Ortica Luppolo, Valeriana, Lichene, Malva, Altea", "Bevande: Tisane con l’aggiunta di miele o melassa"]}
          ],
          info: [
            "Stile di vita: Importante osservare le emozioni che si vivono prima del sonno. Non agitarsi. Evitare stress fretta e super lavoro. Evitare di lavorare nelle ore notturne e serali. Coricarsi prima possibile e svegliarsi spontaneamente senza sveglia."
          ]
        },
        {
          id: "vento-fuoco-fegato",
          titolo: "Vento da liberazione del Fuoco di Jue Yin – Fegato",
          sotto: "Jue Yin · Fegato",
          pag: "56-57",
          meridiani: ["fegato"],
          test: [
            "ST 24 (Xuè) – · R 19 (Yin) – · V 35 (Yang) + · R 13 (Qi) +",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme F 14 (Fegato)."
          ],
          voci: [
            ["Origine", "E’ una condizione molto grave causata dall’invasione di Calore esterno o di Vento- Calore, che arrivano fino al Sangue, dando origine al Vento Interno. E’ frequente nei bambini come conseguenza di una malattia da morbillo, da encefalite o da meningite. Essendo, come detto una condizione grave, necessita un intervento medico immediato."],
            ["Principi di trattamento", "Sottomettere il Vento, Purificare il Calore"],
            ["Muscoli", "Romboide, Gran Pettorale Sternale"]
          ],
          tc: [
            "IC 4 — Disperde il Calore",
            "IT 3 — Con V 62 per eliminare il Vento dal VG",
            "IC 11 — Disperde il Calore",
            "V 62 — Con IT 3 per eliminare il Vento dal VG",
            "F 2 — In dispersione – Disperde il Vento",
            "VG 16 — Disperde il vento dalla testa",
            "F 3 — Disperde il Vento",
            "VG 20 — Disperde il vento dalla testa",
            "VB 20 — Disperde il vento dalla testa"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Curcuma", "China", "Alfalfa", "Ling Yang Gou Teng", "Belladonna"], ["Valeriana", "", "Passilora", "Long Dan Xie Gan Wan", "FM Valeriana"], ["Luppolo", "", "Papavero", "", ""], ["Scutellaria", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Febbre alta", "Convulsioni"]},
            {"titolo": "Sintomi", "items": ["Tremore agli arti", "In casi gravi Coma", "Opistotono", "Crisi epilettiche", "Rigidità del collo", "Emiplegia", "Tic", "Stato di incoscienza", "Intorpidimento degli arti", "Paralisi facciale", "Difficoltà a parlare", "Spasmi muscolari", "Tendenza a cadere senza una motivazione"]},
            {"titolo": "Alimentazione da evitare", "items": ["Cibi che appesantiscono, grassi, alimenti che riscaldano, spezie, alcool, carne rossa, aglio", "Alimenti molto salati, fritti, arrostiti o grigliati", "Insaccati, crostacei, caffè, sigarette, dolci, gelati", "Mangiare troppo a cena"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti neutri e freschi ma cucinati in modo da facilitare l’assimilazione, piccole quantità di tiepidi", "Alimenti di sapore blandamente dolce e acido", "Cucinare cibi succosi e umidi utilizzando metodi di cottura Yin", "Olio di sesamo, di girasole, di borragine", "Pappa reale, melassa, polline", "Erba di grano. abbondare con l’assunzione di sedano", "Cereali: Amaranto, Miglio, Grano saraceno, Orzo", "Legumi e noci: Fagioli, Germogli di soia verde, Latte di soia, Soia nera, Soia rossa, Soia verde, Tofù", "Verdure: Alghe, Germogli, Bambù, Broccoli, Carciofi, Cavoli, carote, Cetrioli, Crescione, Insalata belga, Indivia, Lattuga, Melanzane, Pomodori, Melanzane, Ravanelli, Rucola, Sedano, Tarassaco, Zucchine", "Carne e latticini: Anatra, Cavallo, Latte di Soia, Tofù", "Pesce: Anguille, Granchio, Ostriche, Vongole", "Frutta: Ananas, Anguria, Banane, Cachi, Kiwi, Lamponi, Limone, Mele, Melone, Prugne, Pere, Ciliegie, Noce di cocco", "Erbe e spezie: Menta, Coriandolo, Valeriana, Genziana, Sambuco, Malva, Ortica, Camomilla, Melissa"]}
          ]
        },
        {
          id: "vento-yang-fegato",
          titolo: "Vento da liberazione dello Yang di Jue Yin – Fegato",
          sotto: "Jue Yin · Fegato",
          pag: "58-59",
          meridiani: ["fegato"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) – · V 35 (Yang) + · R 13 (Qi) +",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme F 14 (Fegato)."
          ],
          voci: [
            ["Origine", "E’ la combinazione di più fattori. Innanzitutto il Vuoto di Yin è causato da un eccesso di attività fisica o eccessiva attività sessuale. Nelle donne può anche essere la conseguenza di un Vuoto di Sangue di Fegato, dato a sua volta da emorragie croniche (ciclo emorragico). L’Eccesso di Yang, invece, in genere è la conseguenza di stati emotivi associati alla collera, alla frustrazione e al risentimento. Oppure dalla penetrazione di Calore Esterno. Tutto ciò porta ad eccesso di Qi (Vento). Questa Sindrome, perciò, è la stessa del Vuoto di Yin ed Eccesso di Yang di Fegato (Fuga dello Yang di Fegato), a cui, però, si aggiunge un fattore aggravante, generalmente di tipo emotivo (attacco acuto di collera)."],
            ["Principi di trattamento", "Nutrire lo Yin di Fegato, Sottomettere lo Yang di Fegato, Sottomettere il Vento"],
            ["Muscoli", "Romboide, Gran Pettorale Sternale"]
          ],
          tc: [
            "F 3 — Sottomette lo Yang ed il Vento",
            "R 3 — Tonifica lo Yin",
            "F 8 — Tonifica lo Yin di Fegato",
            "VG 16 — Sottomette il Vento",
            "MP 6 — Tonifica lo Yin",
            "VB 20 — Sottomette il Vento",
            "V 18 — Tonifica lo yin e sottomette lo Yang di F."
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Ligustrum Lucidum", "Omega 3-6-9", "", "Liu Wei Di Huang Wan", ""], ["Sesamum Indicum", "Vit. E", "", "", ""], ["Shatavari", "Magnesio", "", "", ""], ["", "Coenzima Q 10", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Perdita improvvisa di coscienza", "Transitory ischemic attack", "Convulsioni", "Ictus cerebrale"]},
            {"titolo": "Sintomi", "items": ["Tendenza a cadere senza una motivazione", "Afasia", "Tic", "Disartria", "Bocca e occhi deviati", "Vertigini", "Prurito", "Crampi", "Cefalea", "Intorpidimento degli arti", "Paralisi facciale", "Difficoltà a parlare", "Spasmi muscolari", "Accidente Cerebro-Vascoalre", "Stato di incoscienza", "Emiplegia"]},
            {"titolo": "Alimentazione da evitare", "items": ["Attenzione ai cibi yang che muovono, perché ciò che muove va anche in alto", "Alimenti che creano calore, tutti gli alcolici, crostacei, carni che scaldano (cervo, manzo, pollo), spezie calde", "Metodi di cucina yang: grigliare, friggere, arrostire", "Troppo sale, insaccati stagionati", "Caffè", "Sigarette", "Alimenti che ledono la Milza: gelati, dolci", "Mangiare troppo, troppo grasso, troppo a cena, cibi difficili da digerire", "Evitare tensioni e scocciature"]},
            {"titolo": "Alimentazione consigliata", "items": ["Come deficit di xue di Fegato", "Alimenti freschi, amari, acidi", "Centrifughe di verdura con molto sedano", "Tisane di melissa, salvia, lavanda, tarassaco", "Alimenti a fermentazione lattica, yogurt", "Insalate amare ad ogni pasto", "Dormire abbastanza", "Cereali: Grano saraceno, Miglio, Amaranto, Quinoa, Orzo", "Legumi e noci: Soia gialla, Soia nera, Soia verde, Germogli di soia, Ceci", "Verdure: Sedano, Funghi, Cavoli Ravanello, Crescione, Rafano, Zucchine, Melanzane, Cetrioli, Ortica, Asparagi, Carciofi, Carote, Lattuga, Broccoli, Pomodori, Cicoria, Radicchio, Insalata belga, Tarassaco", "Frutta: Melone, Anguria, Pera, Pompelmo, Arancia, Mandarini", "Carne e latticini: Coniglio, Anatra, Brodo, Ricotta, Ghee", "Pesce: Polpo, Calamaro, Ostriche", "Erbe e spezie: Bucce di agrumi, Salvia, Menta, Origano, Maggiorana, Passiflora, Lavanda, Verbena, Luppolo, Valeriana, Lichene, Malva, Altea"]}
          ]
        },
        {
          id: "vento-deficit-sangue-fegato",
          titolo: "Vento da deficit di Sangue di Jue Yin – Fegato",
          sotto: "Jue Yin · Fegato",
          pag: "60-61",
          meridiani: ["fegato"],
          test: [
            "ST 24 (Xuè) – · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) +",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme F 14 (Fegato)."
          ],
          voci: [
            ["Origine", "E’ un Vento che nasce da un Vuoto. Nasce, infatti, da un Vuoto cronico di Sangue di Fegato. Il vuoto di sangue nei Vasi, viene sostituito dal Vento Interno. Questo Vuoto di Sangue può essere causato da una errata alimentazione, priva di proteine; da un Deficit di Milza; da un Vuoto di Qi di Rene, da un Vuoto di Jing di Rene, da una emorragia grave o cronica."],
            ["Principi di trattamento", "Tonificare il Sangue di Fegato, Sottomettere il Vento"],
            ["Muscoli", "Romboide, Gran Pettorale Sternale"]
          ],
          tc: [
            "F 3 — Sottomette lo Yang ed il Vento",
            "IC 4 — Elimina il Vento dal volto",
            "F 8 — Tonifica il Sangue di Fegato",
            "R 3 — Tonifica il Sangue",
            "V 17 — Tonifica il Sangue",
            "VG 16 — Sottomette il Vento",
            "V 18 — Tinifica il Sangue",
            "VG 20 — Sottomette il Vento",
            "V 20 — Tonifica il Sangue",
            "VB 20 — Sottomette il Vento",
            "V 23 — Tonifica il Sangue",
            "MP 6 — Tonifica il Sangue"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Curcuma", "Eleuterococco", "Vit. B1", "Bu Gan Tang", "FM Chelidonium"], ["Alfalfa", "Genziana", "Vit. B6", "Sheng Hua Wan", "FM Agnus"], ["Achillea", "Equiseto", "Magnesio", "Si Wu", "China 9 CH"], ["Acerola", "Angelica Sinensis", "Zinco", "Ba Zhen", "Natrium Nuriaticum 9CH"], ["Aswaganda", "", "Ferro", "Dang Gui", ""], ["", "", "", "Xiao Yao San", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Intorpedimento degli arti", "Tremore E scosse alla testa", "Tremore degli arti", "Tic"]},
            {"titolo": "Sintomi", "items": ["Anemia", "Debolezza muscolare", "Vertigini", "Prurito", "Crampi", "Cefalea", "Intorpidimento degli arti", "Paralisi facciale", "Difficoltà a parlare", "Spasmi muscolari", "Spasmi palpebrali", "Spasmi del volto"]},
            {"titolo": "Alimentazione da evitare", "items": ["Come vuoto di Qi di milza", "Alimenti che riscaldano troppo o dissecano: caffè, tè verde e tè nero, superalcolici, spezie calde, fritti, troppo sale, alimenti grigliati, arrostiti, crostacei", "Attenti ai pesci che aumentano il calore nel sangue (trota, aringa, acciuga, cappesante, cozze, gamberetti)", "Fumare", "Dormire poco e coricarsi troppo tardi", "Donare il sangue", "Cibi secchi"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti neutri e freschi ma cucinati in modo da facilitare l’assimilazione", "Piccole quantità di tiepidi", "Alimenti di sapore blandamente dolce e acido", "Cucinare cibi succosi e umidi utilizzando metodi di cottura yin", "Assumere regolarmente, almeno 2 volte a settimana piccole quantità di pesce carne ed interiora, o brodi di carne o pesce", "Olio di sesamo, di girasole, di borragine", "Pappa reale, melassa, polline, Erba di grano", "Cereali: Riso, Orzo, Grano, Kamut, Miglio, Quinoa, Amaranto", "Legumi e noci: Soia nera e soia gialla (anche germogliata), Lenticchie, Noci, Nocciole, Semi di sesamo, Semi di girasole, Pinoli", "Verdure: Carote, Sedano, Spinaci, Coste, Tarassaco, Ortica, Pomodoro, Broccoli, Cavolo, Rape rosse, Asparagi, Insalate amare, Ravanello, Germogli di erba medica", "Frutta: Uva, Litchi, More di gelso, Prugne, Limoni, Fragole, Ciliegie, Lamponi, Mirtilli, Uvetta, Avocado, Datteri", "Carne e latticini: Anatra, maiale, pollo, latte, ghee, yogurt, ricotta, uova, formaggio", "Pesce: Calamari, Polpo, Anguilla, Ostriche, Sarde, Alici, Sgombro, Cozze", "Spezie: Prezzemolo, Crescione, Salvia, Ortica, Achillea, Equiseto, Lampone (le foglie tonificano l’utero), Luppolo", "Bevande: Succo d ‘uva, Tisane, Brodo, Acqua d’orzo con datteri, fichi e uvetta!!!"]}
          ],
          info: ["Stile di vita: Riposare, attenzione a stati emotivi che creano stress."],
          appunti: [
            "Nella tabella «deficit» è corretto in «vuoto»: vento da vuoto di sangue.",
            "Aggiunto ai sintomi: Parkinson."
          ]
        }
      ]
    },
    {
      id: "shao-yang-vb", titolo: "Shao Yang · Vescica Biliare",
      intro: ["Le sindromi della Vescica Biliare (tabella di pag. 15).", "Punti dell'organo: allarme MP 13 · chiave VB 41 · yuan VB 40 · shu V 19 · xi VB 36."],
      schede: [
        {
          id: "calore-umidita-vb",
          titolo: "Calore-Umidità del Shao Yang – Vescica Biliare",
          sotto: "Shao Yang · Vescica Biliare",
          pag: "62-63",
          meridiani: ["vescica-biliare"],
          test: [
            "ST 24 (Xuè) + · R 19 (Yin) O · V 35 (Yang) + · R 13 (Qi) –",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): O + – – — + + – O — + + – –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme MP 13 (Vescica Biliare)."
          ],
          voci: [
            ["Origine", "E’ una vicariazione del Vuoto di Qi di Milza, che genera l’Umidità, che a sua volta invade VB interferendo nel libero fluire di Qi di Fegato. Questo quadro poi si combine con il Calore, generato dall’eccesivo consumo di cibi di natura termica calda (alcool, manzo, cioccolata, fumo). Il sintomo più classico di questa Sindrome sono i calcoli biliari, che in MTC vengono considerati una forma estrema di Umidità. Questa Sindrome è molto simile al Calore- Umidità di Fegato e VB, solo che questa ha una sintomatologia più locale, mentre quella di F+VB è caratterizzata da segni più generali."],
            ["Principi di trattamento", "Dissolvere l’Umidità, Purificare il Calore di VB, Stimolare il Qi di Fegato"],
            ["Muscoli", "Deltoide Anteriore, Popliteo"]
          ],
          tc: [
            "F 14 — Elimina il Calore da Fegato",
            "V 18 — Elimina il Calore da Fegato",
            "TR 6 — Disperde il Calore",
            "V 19 — Elimina il Calore da VB",
            "VB 24 — Elimina il Calore da VB",
            "V 20 — Dissolve l’Umidità",
            "VB 34 — Purifica il Calore, muove il Qi di Fegato, dissolve l’Umidità",
            "VG 9 — Dissolve l’Umidità, muove il Qi di Fegato, elimina il Calore da VB",
            "IC 11 — Dissolve l’Umidità, purifica il Calore",
            "ST 36 — Dissolve l’Umidità",
            "TR 6 — Muove il Qi di Fegato, elimina il Calore",
            "VC 12 — Dissolve l’Umidità"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Emblica", "Ortosiphon", "B Complex", "Da Chai Hu Tang", "Chelidonium"], ["Cardo Mariano", "Carciofo", "Vit. B6", "Dan Dao Pai Shi Tang", "Sulfur"], ["Desmodio", "Ribes Nigrum", "Acido Folico", "Yinchen hao", ""], ["Tarassaco", "Tarassaco", "Colina", "Redu", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Epatiti acute", "Colicistiti acute", "Calcolosi biliare", "Discinesie colicistiche", "Ittero"]},
            {"titolo": "Sintomi", "items": ["Incapacità di digerire i grassi", "Sensazione di bocca amara", "Urine scarse di colore scuro", "Vomito", "Febbre", "Risentimento", "Sete senza desiderio di bere", "Collera", "Frustrazione", "Nausea", "Dolori ipocondriaci irradiati al dorso", "Dolore e distensione ipocondriaca", "Colorito itterico (carnagione giallastra)", "Vertigini", "Cefalea", "Fotoobia", "Oppressione toracica", "Palpitazioni", "Sospiri profondi", "Insonnia dovuta ad irritabilità", "Paura", "Agitazione"]},
            {"titolo": "Alimentazione da evitare", "items": ["Mangiare troppo, meglio fermarsi al 70%, alimenti pesanti come fritti, latticini", "Niente zucchero, alcol, superalcolici, liquori. spezie troppo riscaldanti, alimenti arrostiti, grigliati, affumicati", "Alimenti troppo freddi, umidi, difficili da digerire", "Farina bianca, carne e caffè", "Olii scadenti"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti leggermente drenanti, neutri e non troppo nutrienti", "Alimenti aromatici ed un po’ piccanti che alzano e diffondono il qi aiutando la digestione", "Ottimo il grano saraceno associato alle verdure, riso con azuki", "Attenziuone alla qualità degli alimenti", "Un po’ cibi amari per drenare", "Bollire, stufare o cucinare a vapore", "Cereali: orzo, grano saraceno, amaranto, riso, miglio", "Legumi e noci: soia rossa, soia verde, germogli di soia", "Verdure: tarassaco, patata, zucca, cetriolo, sedano, carciofo, cavolo, asparago, funghi, tarassaco, crescione, melanzana, insalate a foglia amara, insalata belga, cicoria, rucola, tutti i germogli", "Pesce: granchio, vongole", "Erbe e spezie: Salvia, Angelica, Betulla, Ortica, Passiflora, Melissa, Assenzio, Rosmarino, Arancio, Lavanda, Verbena, Valeriana, Genziana, Sambuco, Malva, Ortica, Camomilla", "Bevande: tisana e centrifuga di tarassaco, decotto con bucce di agrumi, barba di mais, acqua d’orzo e tè verde. radice di genziana, cardo santo, fumaria officinale, berberis vulgaris"]}
          ],
          info: [
            "Stile di vita: evitare le cause di umidità - calore di origine esterna. Seguire una cura con riso azuki e verdure cotte. Lavorare sulla sfera emotiva che porta negatività."
          ]
        },
        {
          id: "deficit-qi-vb",
          titolo: "Deficit del Qi dello Shao Yang – Vescica Biliare",
          sotto: "Shao Yang · Vescica Biliare",
          pag: "64",
          meridiani: ["vescica-biliare"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme MP 13 (Vescica Biliare)."
          ],
          voci: [
            ["Origine", "Piuttosto che una Sindrome vera e propria si tratta delle conseguenze del carattere della persona: cioè la mancanza di coraggio, la timidezza e la mancanza di iniziative. Può anche insorgere come conseguenza di un Vuoto di Sangue di Fegato, ma anche come deficit costituzionale. Il Vuoto di Sangue non permette allo HUN (lo Spirito del Fegato) di radicarsi, manifestando stati di timore ed incapacità a prendere decisioni."],
            ["Principi di trattamento", "Tonificare la VB"],
            ["Muscoli", "Deltoide Anteriore, Popliteo"]
          ],
          tc: ["VB 40 — Tonifica VB e tratta i suoi aspetti mentali", "VB 43 — Sottomette lo Yang di Fegato"],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Rafano Nero", "Ferro", "Iperico", "Huang Lian Wen Dan Tang", "Chelidonium"], ["Curcuma", "", "Melissa", "", ""], ["Rodiola", "", "Genziana", "", ""], ["Terminalia", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Vertigini", "Nevrosi ansiosa"]},
            {"titolo": "Sintomi", "items": ["Tendenza a sussultare facilmente", "Incapacità a prendere decisioni o iniziative", "Capogiri", "Nervosismo", "Allarmismo", "Annebbiamenti della vista", "Timidezza", "Preoccupazione", "Indecisione", "Poca determinazione", "Sospiri", "Ansia", "Visione offuscata", "Scarso coraggio", "Mancanza di coraggio", "Mancanza di determinazione", "Apprensione"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cereali: avena, riso, farro, grano, grano saraceno, mais, segale, quinoa", "Legumi e noci: lenticchie", "Verdure: carota, patata, catalogna, cicoria, luffa, pomodoro, cavolo di Bruxelles, cavolo cappuccio, cavolo rapa, cavolo verza", "Frutta: lampone, dattero, fico, mora di gelso", "Carne: fegato di animali (fegato di manzo, fegato di pollo), pollo, manzo, tacchino, coniglio, piccione", "Pesce: cozza, anguilla, abalone, granchio, sgombro"]}
          ],
          appunti: [
            "È una sindrome psicologica: la VB è prendere le decisioni, in questo caso c'è incapacità nel farlo."
          ]
        }
      ]
    },
    {
      id: "shao-yin-cuore", titolo: "Shao Yin · Cuore",
      intro: ["Le sindromi del Cuore (tabella di pag. 16).", "Punti dell'organo: allarme VC 14 · chiave R 6 · yuan C 7 · shu V 15 · xi C 6."],
      schede: [
        {
          id: "deficit-qi-cuore",
          titolo: "Deficit di Qi di Shao Yin – Cuore",
          sotto: "Shao Yin · Cuore",
          pag: "65",
          meridiani: ["cuore"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 14 (Cuore)."
          ],
          voci: [
            ["Origine", "Le cause sono numerose: i problemi emozionali, in particolare la tristezza; come esito di una malattia cronica; come conseguenza della perdita cronica di Sangue o un evento acuto di emorragia, come conseguenza di un deficit congenito di energia, a causa di un affaticamento psicofisico; a causa della senilità."],
            ["Principi di trattamento", "Tonificare il Qi di Cuore"],
            ["Muscoli", "Sottoscapolare"]
          ],
          tc: [
            "C 5 — Tonifica il Qi di Cuore",
            "VC 6 — Tonifica il Qi di tutto il corpo",
            "C 9 — Rianima lo Shen",
            "VC 14 — Regolarizza il Qi",
            "MC 6 — Tonifica il Qi di Cuore",
            "VC 17 — Tonifica e regolarizza il Qi",
            "V 15 — Tonifica il Qi di Cuore"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Liquirizia", "Metionina", "Terminalia", "Yang Xing Tang", "FM Crataegus"], ["Achillea", "Calcio", "Aswaganda", "Angelica", ""], ["Biancospino", "Vit B12", "Eleuterococco", "Ginseng", ""], ["Fuoco Yin", "Zolfo", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Astenia", "Aritmie", "Malattie cardiache"]},
            {"titolo": "Sintomi", "items": ["Oppressione toracica peggiorata dal movimento", "Oppressione toracica e cardiaca", "Calo delle difese immunitarie", "Affaticamento", "Cefalea", "Svogliatezza", "Respiro corto", "Vertigini", "Colorito del viso pallido", "Dispnea da sforzo", "Turbe della vista", "Astenia", "Nevrastenia", "Sudorazione spontanea", "Palpitazioni", "Mancanza di forza", "Voce debole"]},
            {"titolo": "Alimentazione da evitare", "items": ["Tutto ciò che crea umidità ed indebolisce la milza"]},
            {"titolo": "Alimentazione consigliata", "items": ["Tonificare la milza, nutrire lo yang di rene, nutrire il sangue, Cucinare con poco alcool e o vino rosso", "Cereali: Mais, Grano a vela, Quinoa, Avena", "Legumi e noci: Azucki, Ceci, Noci", "Verdure: Aglio, Carota, Patata, Zucca, Barbabietola, Porro", "Frutta: Uvetta", "Carne e latticini: Manzo, Pollo, Uovo", "Pesce: Trota, Acciuga, Aringa, Persico, Triglia, Cefalo", "Erbe: Anice, Cumino, Rosmarino, Paprica, Peperoncino, Liquirizia", "Bevande: Acqua calda, Poco caffè, Tisane con: rosmarino, cumino, anice, cardamomo, decotto di liquirizia, un po’ di vino rosso"]}
          ],
          appunti: [
            "Shao Yin – Cuore: alla base c'è la tristezza.",
            "Malattie cardiache propriamente dette: è proprio la funzione cardiaca vera e propria."
          ]
        },
        {
          id: "deficit-yang-cuore",
          titolo: "Deficit di Yang dello Shao Yin – Cuore",
          sotto: "Shao Yin · Cuore",
          pag: "66-67",
          meridiani: ["cuore"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) – · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 14 (Cuore)."
          ],
          voci: [
            ["Origine", "E’ molto simile al Deficit di Qi di Cuore, a cui si è aggiunto una condizione di Freddo. Può anche derivare da una condizione cronica di deficit di Yang di Rene. Perciò, le cause di questa sindrome, possono essere tutte le stesse condizioni del Deficit di Yang di Rene."],
            ["Principi di trattamento", "Tonificare lo Yang di Cuore, Riscaldare lo Yang"],
            ["Muscoli", "Sottoscapolare"]
          ],
          tc: [
            "C 5 — Promuove il Qi di Cuore",
            "VG 8 — Stimola lo Yang",
            "C 7 — Tonifica lo Yin e lo Yang",
            "VG 14 — Stimola lo Yang",
            "MC 6 — Riequilibrante psicofisico e azione anti aritmica",
            "VC 6 — Tonifica lo Yang di tutto il corpo",
            "V 15 — Tonifica lo Yang di Cuore",
            "VG 20 — Tonifica il Qi e lo Yang",
            "V 18 — Mobilizza i ristagni di Qi",
            "ST 36 — Stimola lo Yang e disperde il Freddo",
            "F 3 — Fa circolare il Qi"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Angelica Arcangelica", "Vitamina B12", "Aswaganda", "Yang Xing Tang", "Cactus Grandiflorus"], ["Yohimbe", "", "", "", "Aurum Metallicum"], ["Fuoco Yin", "", "", "", "FM Crataegus"], ["Rosso Fuoco", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Astenia", "Insufficienza cardiaca", "Malattie cardiache"]},
            {"titolo": "Sintomi", "items": ["Dispnea da sforzo", "Astenia peggiorata dall’attività", "Confusione mentale", "Svogliatezza", "Pallore", "Palpitazioni", "Oppressione nella zona precordiale", "Sudorazione spontanea al minimo sforzo", "Stato di Shock", "Oppressione cardiaca", "Sudorazione fredda", "Viso pallido", "Sensazione di freddo", "Estremità fredde"]},
            {"titolo": "Alimentazione da evitare", "items": ["Niente cibi crudi, freddi, umidi e pesanti", "Niente caffè, tè verde, tè nero", "Evitare zucchero bianco e bevande zuccherate", "Latticini con natura fresca", "Bollire a lungo i cereali integrali"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cereali: mais, grano saraceno, riso dolce, avena", "Legumi e noci: ", "Verdure: agli, carota, patata dolce, zucca, cavolo, barbabietola, porro, finocchio", "Frutta: uvetta, frutta cotta con spezie, litchi, fichi, ciliegie", "Carne e latticini: manzo, pollo, agnello, selvaggina", "Pesce: crostacei, trota, acciuga, anguilla, cozza, gamberetto", "Spezie: anice, cumino, rosmarino, paprika, peperoncino, cannella, zenzero, curcuma, coriandolo, timo", "Bevande: acqua calda, pochissimo caffè, tisane aromatiche: rosmarino, anice, cardamomo, cumino. Decotto di zenzero, vino rosso"]}
          ],
          info: ["Stile di vita: Riposare per mezz’ ora dopo aver mangiato. Dormire sdraiati sul fianco destro."]
        },
        {
          id: "deficit-qi-yang-cuore",
          titolo: "Deficit di Qi e Yang dello Shao Yin – Cuore",
          sotto: "Shao Yin · Cuore",
          pag: "68-69",
          meridiani: ["cuore"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) – · R 13 (Qi) –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 14 (Cuore)."
          ],
          voci: [
            ["Origine", "E’ una vicariazione del Deficit di Qi di Cuore. Le cause del Deficit di Qi sono, in genere, uno stato cronico di tristezza o di super lavoro e preoccupazioni, che inibiscono le funzioni di assimilazione e trasformazione delle sostanze nutritive da parte di Milza. Anche le malattie croniche consumano il Qi. Il Deficit di Yang può essere di origine congenita o acquisita. Generalmente parte da un Deficit di Yang di Rene."],
            ["Principi di trattamento", "Tonificare il Qi di Cuore, Tonificare lo Yang"],
            ["Muscoli", "Sottoscapolare"]
          ],
          tc: [
            "C 5 — Promuove il Qi di Cuore",
            "VG 4 — Stimola lo Yang",
            "C 7 — Tonifica lo Yin e lo yang",
            "VG 14 — Stimola lo Yang",
            "MC 6 — Riequilibrante psicofisico e azione anti aritmica",
            "VC 6 — Tonifica il Qi di tutto il corpo",
            "V 15 — Tonifica il Qi e lo Yang di Cuore",
            "VC 17 — Tonifica il Cuore",
            "V 18 — Mobilizza i ristagni di Qi",
            "VG 20 — Tonifica il Qi e lo Yang",
            "F 3 — Fa circolare il Qi",
            "ST 36 — Stimola lo Yang e disperde il Freddo"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Angelica Arcangelica", "Vit. E", "Aswaganda", "Yang Xing Tang", "Cactus Grandiflorus"], ["Liquirizia", "Rame", "Eleuterococco", "", "FM Crataegus"], ["Achillea Millefolium", "", "", "", "Aurum Metallicum"]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Astenia", "Nevrosi cardiache", "Aritmie cardiache"]},
            {"titolo": "Sintomi", "items": ["Dispnea da sforzo", "Astenia psicofisica", "Confusione mentale", "Palpitazioni", "Astenia marcata", "Esaurimento nervoso", "Svogliatezza", "Stato di Shock", "Extra sistole", "Oppressione toracica", "Pallore", "Cardiopalmo", "Sensazione di freddo e ricerca del calore", "Sudorazione spontanea al minimo sforzo", "Viso pallido tendente al nerastro e labbra cianotiche", "Collassi cardiaci", "Abulia", "Estremità fredde"]},
            {"titolo": "Alimentazione da evitare", "items": ["Tutto quello che indebolisce la milza e crea umidità", "Niente cibi crudi, freddi, umidi e pesanti", "Niente caffè, tè verde, tè nero", "Evitare zucchero bianco e bevande zuccherate", "Latticini con natura fresca", "Bollire a lungo i cereali integrali"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cereali: mais, grano saraceno, quinoa, avena", "Legumi e noci: Noci, azuki, ceci", "Verdure: aglio, carota, patata dolce, zucca, cavolo, barbabietola, porro, finocchio", "Frutta: uvetta, frutta cotta con spezie, litchi, fichi, cigliegie", "Carne e latticini: manzo, pollo, uova", "Pesce: crostacei, trota, acciuga, aringa, triglia, cefalo, persico", "Spezie: anice, cumino, rosmarino, paprika, peperoncino, cannella, zenzero, curcuma, coriandolo, timo, cardamomo, noce mscata, ginepro", "Bevande: acqua calda, pochissimo caffè, tisane aromatiche (rosmarino, anice, cardamomo, cumino, timo, salvia, zenzero). Decotto di zenzero, vino rosso. Acqua d’orzo"]}
          ]
        },
        {
          id: "deficit-sangue-cuore",
          titolo: "Deficit di Sangue dello Shao Yin – Cuore",
          sotto: "Shao Yin · Cuore",
          pag: "70-71",
          meridiani: ["cuore"],
          test: [
            "ST 24 (Xuè) – · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 14 (Cuore)."
          ],
          voci: [
            ["Origine", "Può essere originata da eventi emorragici o come conseguenza di una difficoltà di produzione di Sangue da parte di Milza. Il Vuoto di Qi di Milza, se diventa una condizione cronica, determina un Vuoto di Sangue. Pur essendo da vuoto i segni di questa sindrome sono più da eccesso. La componente Emotiva può essere un’importante causa d’insorgenza, soprattutto a causa dell’ansia, delle preoccupazioni e della rimuginazione."],
            ["Principi di trattamento", "Nutrire il Sangue di Cuore, Calmare lo Shen"],
            ["Muscoli", "Sottoscapolare"]
          ],
          tc: [
            "VC 4 — Tonifica il Sangue",
            "V 15 — Tonifica il Cuore",
            "VC 14 — Tonifica il Qi di Cuore e calma lo Shen",
            "V 17 — Tonifica il Sangue",
            "VC 15 — Tonifica il Qi di Cuore e calma lo Shen",
            "V 20 — Tonifica il Sangue",
            "C 7 — Tonifica il Sangue di Cuore",
            "V 23 — Tonifica il Sangue",
            "C 9 — Rianima lo Shen",
            "MP 10 — Nutre il Sangue",
            "MC 5 — Regolarizza il Qi di Cuore",
            "MP 9 — Fa circolare il Qi nel Cuore",
            "MC 6 — Tonifica il Qi di Cuore e calma lo Shen"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Fitoterapici", "Ortomolecolari", "Cinesi", "Omeopatici"], "righe": [["Curcuma", "Biancospino", "Acido Folico", "Si WuTang", "FM Crataegus"], ["Alfalfa", "Lycopo", "Vit. C", "Tian Wang Bu Xin Dan", "Cactus Grandiflorus"], ["Zafferano", "Melissa", "B Complex", "Angelica Sinensis", "FMS Valeriana"], ["Aglio", "Lithotame", "Fuoco Yin", "", ""], ["Clorella", "Melissa", "Rosso Fuoco", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Anemia", "Ansia", "Insonnia", "Sudorazione notturna", "Psicastenia", "Nevrosi cardiache", "Ipertiroidismo"]},
            {"titolo": "Sintomi", "items": ["Colorito pallido e smorto", "Agitazione", "Eccesso di sogni", "Calore ai cinque fuochi", "Iperreattività", "Insonnia, difficoltà a prendere sonno", "Sensazione di calore al volto, specialmente nel pomeriggio", "Ipereccitabilità apparente-mente immotivata", "Frequenti risvegli notturni", "Pomelli rossi", "Irritabilità", "Bocca secca", "Stato Fight or Flight", "Amnesie", "Aritmie, soprattutto serali", "Disturbi della memoria", "Sonno disturbato da sogni", "Palpitazioni", "Scarsa memoria", "Voce debole", "Cardiopalmo", "Spaventarsi facilmente", "Respiro corto", "Irrequietezza", "Turbe visive", "Alterazioni del ciclo mestruale", "Capogiri", "Depressione", "Paure", "Vertigini", "Depressione post-parto", "Sudorazione notturna"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti che riscaldano troppo o disseccano come caffè, superalcolici, spezie calde, fritto, troppo sale, tè nero, tè verde", "Non fumare", "Evitare sostanze eccitanti come guaranà, coca cola, cioccolato amaro"]},
            {"titolo": "Alimentazione consigliata", "items": ["Snack quotidiano con frutta secca e noci", "Cereali: orzo, malto d’orzo, grano integrale, riso integrale, amaranto, miglio, farro, kamut", "Legumi e noci: sesamo, sesamo nero, pinoli, semi di girasole, lenticchie, soia nera, rossa e verde", "Verdure: rape rosse, verdure verdi, spinaci, avocado", "Frutta: ciliegia, uva, uvetta, datteri, prugna, pesca, frutto della passione, more di gelso, more di rovo, lamponi, mirtilli, ribes rossi e neri, longan, limone", "Carne: cuore d’animali, pollo, anatra, coniglio, vitello, manzo e maiale in piccole quantità, latte, burro, ghee, formaggi", "Pesce: calamaro, seppie, polpo, ostriche, anguilla, acciuga, aringa, merluzzo, aringa, sgombro, salmone", "Erbe e spezie: salvia, luppolo, valeriana, melissa, passiflora, lavanda, decotto di grano", "Bevande: acqua del rubinetto calda, tisane di erbe, succo d’uva, succo di ciliegia, vino rosso in quantità moderata"]}
          ],
          info: [
            "Stile di vita: Evitare stress, superlavoro, fretta. Dormire a sufficienza e curare la qualità del sonno; importante il sonno prima della mezzanotte. Stimolare l’aspetto yin: immaginazione, fantasia, musica calma, contemplazione di opere artistiche o di paesaggi."
          ],
          appunti: [
            "È un importante squilibrio dello Shen.",
            "Tian Wang Bu Xin Dan: rimedio molto utile per chi ha uno stato depressivo e ansioso; è un ottimo sedativo. Nutre Qi e Yin di Cuore e Rene, spegne il calore del Cuore, calma lo Shen."
          ]
        },
        {
          id: "deficit-yin-cuore",
          titolo: "Deficit di Yin dello Shao Yin – Cuore",
          sotto: "Shao Yin · Cuore",
          pag: "72-73",
          meridiani: ["cuore"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) – · V 35 (Yang) O · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 14 (Cuore)."
          ],
          voci: [
            ["Origine", "Sono numerose le cause che possono generare questa sindrome. 1) a causa di una insufficiente produzione di Sangue da parte di Milza; 2) emorragie, sia croniche (ciclo emorragico) che acute (parto); 3) a causa di frustrazioni emotive che producono Fuoco e ledono lo Yin; 4) a causa di una vicariazione di Stasi di Qi; 5) a causa di malattie febbrili che consumono i Liquidi."],
            ["Principi di trattamento", "Nutrire lo Yin del Cuore, Nutrire il Sangue di Cuore, Calmare lo Shen"],
            ["Muscoli", "Sottoscapolare"]
          ],
          tc: [
            "VC 4 — Tonifica il Sangue, Nutre lo Yin",
            "V 15 — Tonifica il Cuore",
            "VC 14 — Tonifica il Qi di Cuore e calma lo Shen",
            "V 17 — Tonifica il Sangue, Nutre lo Yin",
            "VC 15 — Tonifica il Qi di Cuore e calma lo Shen",
            "V 20 — Tonifica il Sangue, Nutre lo Yin",
            "C 7 — Tonifica il Sangue di Cuore",
            "V 23 — Tonifica il Sangue, Nutre lo Yin",
            "C 9 — Rianima lo Shen",
            "MP 10 — Nutre il Sangue",
            "MC 5 — Regolarizza il Qi di Cuore",
            "MP 9 — Fa circolare il Qi nel Cuore",
            "R 6 — Tonifica il Sangue, Nutre lo Yin"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Alfalfa", "L-Glutammina", "Fuoco Yin", "Si WuTang", "Cactus"], ["Fieno Greco", "Inositolo", "Rosso Fuoco", "Tian Wang Bu Xin Dan", "Biancospino"], ["Valeriana", "Manganese-Cobalto", "", "", "Aurum"], ["Iperico", "Ferro", "", "", "Glonoinum"], ["Emblica", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Anemia", "Ansia", "Insonnia", "Sudorazione notturna", "Psicastenia", "Nevrosi cardiache", "Ipertiroidismo"]},
            {"titolo": "Sintomi", "items": ["Colorito pallido e smorto", "Agitazione", "Iperonirismo", "Calore ai cinque fuochi", "Iperreattività", "Insonnia, difficoltà a prendere sonno", "Sensazione di calore al volto, specialmente nel pomeriggio", "Ipereccitabilità apparente-mente immotivata", "Frequenti risvegli notturni", "Pomelli rossi", "Irritabilità", "Bocca secca", "Stato di Fight or Flight", "Amnesie", "Aritmie, soprattutto serali", "Irrequietezza", "Disturbi della memoria", "Capogiri", "Palpitazioni", "Depressione, Depressione post- parto", "Vertigini", "Cardiopalmo", "Paure", "Amnesia", "Mucose secche", "Eruzioni cutanee"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti amari che drenano (te, caffè, azuki)", "Alimenti che riscaldano troppo (alcool in genere, carne di agnello, capra, manzo, pollo, tacchino, salumi, affumicati, formaggi stagionati, con muffa, spezie calde; Alimenti arrostiti, fritti, grigliati, essicati.Troppo sale. Evitare il troppo astringente, troppo freddo, troppo umidificante"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti che nutrono lo yin e creano liquidi", "Frutta e verdura meglio cotta o centrifugata", "Ottimi centrifugati di uva, pera", "Piccole quantità di cibi astringenti e acidi (yogurt, limone, ananas, arance, kiwi, ecc)", "Utilizzare metodi di cottura yin: in acqua, a vapore, fermentati, crudo se la digestione lo permette", "Bere tisane o anche acqua tiepida", "Assumere polline, pappa reale, semi di sesamo, semi di lino", "Cereali: Grano integrale, Germogli di grano, Miglio, Orzo, Riso non a chicco lungo, Quinoa, Amaranto", "Legumi e noci: Soia nera, Soia verde, lenticchie Sesamo", "Verdure: Sedano, Spinaci, Bietola, Cetrioli cotti, Pomodoro cotto, Rape rosse, Cavoli, Olive, Ravanelli, Asparagi, Alghe", "Frutta: Pera, Uva, Mela, Anguria, Arancia, Limone, Pompelmo, Mandarino, Caco, Banane, More, Ananas, Ribes, Fragola, Avocado", "Carne e latticini: Anatra, Coniglio, Cavallo, Fegato, Latte, Burro, Panna, Formaggi freschi, Yogurt", "Pesce: Frutti di mare, Calamari, Seppia, Polpo, Ostriche, Vongole", "Spezie: Salvia, Crescione, Menta, Melissa, Limone, Ortica", "Bevande: tisane con l’aggiunta di miele o melassa"]}
          ],
          info: [
            "Stile di vita: Importante osservare le emozioni che si vivono prima del sonno, Non agitarsi, Evitare stress fretta e super lavoro, Evitare di lavorare nelle ore notturne e serali, Per due settimane coricarsi prima possibile e svegliarsi spontaneamente senza sveglia, Eventualmente aiutarsi con tisane a base di: luppolo, valeriane, lavanda, melissa. Non stimolare troppo l’aspetto yang dello shen con tv, telegiornali e film, sviluppare invece l'aspetto yin: immaginazione, fantasia e musica calma…"
          ]
        },
        {
          id: "deficit-sangue-yin-cuore",
          titolo: "Deficit di Sangue e Yin dello Shao Yin – Cuore",
          sotto: "Shao Yin · Cuore",
          pag: "74-75",
          meridiani: ["cuore"],
          test: [
            "ST 24 (Xuè) – · R 19 (Yin) – · V 35 (Yang) O · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 14 (Cuore)."
          ],
          voci: [
            ["Origine", "Nasce come vicariazione del Vuoto di Sangue del Cuore. Pur essendo da Vuoto i segni di questa sindrome sono più da eccesso. La componente del Deficit di Sangue può essere originata da eventi emorragici o come conseguenza di una difficoltà di produzione di Sangue da parte di Milza. La carenza di Yin può essere generata dall’eccessiva perdita di Liquidi, come sudore, vomito, dissenteria, eccessiva urinazione, o come conseguenza di una Sindrome di Calore. La componente Emotiva può essere un’importante causa di insorgenza."],
            ["Principi di trattamento", "Nutrire lo Yin del Cuore, Nutrire il sangue di Cuore, Calmare lo Shen"],
            ["Muscoli", "Sottoscapolare"]
          ],
          tc: [
            "VC 4 — Tonifica il Sangue, Nutre lo Yin",
            "V 15 — Tonifica il Cuore",
            "VC 14 — Tonifica il Qi di Cuore e calma lo Shen",
            "V 17 — Tonifica il Sangue, Nutre lo Yin",
            "VC 15 — Tonifica il Qi di Cuore e calma lo Shen",
            "V 20 — Tonifica il Sangue, Nutre lo Yin",
            "C 7 — Tonifica il Sangue di Cuore",
            "V 23 — Tonifica il Sangue, Nutre lo Yin",
            "C 9 — Rianima lo Shen",
            "MP 10 — Nutre il Sangue",
            "MC 5 — Regolarizza il Qi di Cuore",
            "MP 9 — Fa circolare il Qi nel Cuore",
            "R 6 — Tonifica il Sangue, Nutre lo Yin"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Alfalfa", "L-Glutammina", "Fuoco Yin", "Si WuTang", "Glonoinum"], ["Fieno Greco", "Inositolo", "Rosso Fuoco", "Tian Wang Bu Xin Dan", "Aurum"], ["Valeriana", "Manganese-Cobalto", "Achillea", "Angelica Sinensis", "Cactus"], ["Iperico", "Ferro", "Curcuma", "", ""], ["Emblica", "", "Fuoco Yin", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Anemia", "Ansia", "Insonnia", "Sudorazione notturna", "Psicastenia", "Nevrosi cardiache", "Ipertiroidismo"]},
            {"titolo": "Sintomi", "items": ["Colorito pallido e smorto", "Agitazione", "Iperonirismo", "Calore ai cinque fuochi", "Iperreattività", "Insonnia, difficoltà a prendere sonno", "Sensazione di calore al volto, specialmente nel pomeriggio", "Ipereccitabilità apparente-mente immotivata", "Frequenti risvegli notturni", "Pomelli rossi", "Irritabilità", "Bocca secca", "Stato di Fight or Flight", "Amnesie", "Aritmie, soprattutto serali", "Irrequietezza", "Disturbi della memoria", "Capogiri", "Palpitazioni", "Depressione", "Vertigini", "Cardiopalmo", "Depressione post-parto"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti amari che drenano (te, caffè, azuki)", "Alimenti che riscaldano troppo (alcool in genere, carne di agnello, capra, manzo, pollo, tacchino, salumi, affumicati, formaggi stagionati, con muffa, spezie calde)", "Alimenti arrostiti, fritti, grigliati, essicati.Troppo sale", "Evitare il troppo astringente, troppo freddo, troppo umidificante"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti che nutrono lo yin e creano liquidi", "Frutta e verdura meglio cotta o centrifugata", "Ottimi centrifugati di uva, pera", "Piccole quantità di cibi astringenti e acidi (yogurt, limone, ananas, arance, kiwi, ecc)", "Utilizzare metodi di cottura yin: in acqua, a vapore, fermentati, crudo se la digestione lo permette", "Bere tisane o anche acqua tiepida", "Assumere polline, pappa reale, semi di sesamo, semi di lino", "Cereali: Grano integrale, Germogli di grano, Miglio, Orzo, Riso non a chicco lungo, Quinoa, Amaranto", "Legumi e noci: Soia nera, Soia verde, Ceci, Germogli, Latte di soia, Tofù, Sesamo, Mandorle", "Verdure: Sedano, Spinaci, Bietola, Cetrioli cotti, Pomodoro cotto, Rape rosse, Cavoli, Olive, Ravanelli, Asparagi, Alghe", "Frutta: Pera, Uva, Mela, Anguria, Arancia, Limone, Pompelmo, Mandarino, Caco, Banane, More, Ananas, Ribes, Fragola, Avocado", "Carne e latticini: Anatra, Coniglio, Cavallo, Fegato, Latte, Burro, Panna, Formaggi freschi, Yogurt", "Pesce: Frutti di mare, Calamari, Seppia, Polpo, Ostriche, Vongole", "Erbe e spezie: Salvia, Crescione, Menta, Melissa, Limone, Ortica, Melissa, Luppolo, Grano, Passiflora, Lavanda, Rosa, Biancospino", "Bevande: tisane con l’aggiunta di miele o melassa"]}
          ],
          info: [
            "Stile di vita: Importante osservare le emozioni che si vivono prima del sonno, Non agitarsi, Evitare stress fretta e super lavoro, Evitare di lavorare nelle ore notturne e serali, Per due settimane coricarsi prima possibile e svegliarsi spontaneamente senza sveglia, Eventualmente aiutarsi con tisane a base di : luppolo, valeriane, lavanda, melissa."
          ],
          appunti: ["→ Secco."]
        },
        {
          id: "liberazione-fuoco-cuore",
          titolo: "Liberazione del Fuoco di Yang dello Shao Yin – Cuore",
          sotto: "Shao Yin · Cuore",
          pag: "76-77",
          meridiani: ["cuore"],
          test: [
            "ST 24 (Xuè) – · R 19 (Yin) – · V 35 (Yang) + · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 14 (Cuore)."
          ],
          voci: [
            ["Origine", "E’ la vicariazione del Deficit di Yin di Cuore. Anche la Stasi del Qi di Fegato può contribuire a causarla. Ma spesso il fattore determinante è lo Shen. Si manifesta con evidenti segni di calore e di eccesso a livello psichico, urinario e della bocca. Il Cuore è collegato all’Intestino Tenue, che, a sua volta, essendo parte del Livello Tai Yang è collegato alla Vescica. Questa sindrome causa sintomi vescicali. Inoltre, anche il consumo eccessivo di alimenti piccanti o di medicamenti riscaldanti e tonificanti possono generare questa Sindrome."],
            ["Principi di trattamento", "Disperdere il Calore, Calmare lo Shen"],
            ["Muscoli", "Sottoscapolare"]
          ],
          tc: [
            "C 7 — Calma lo Shen ed agisce sul Cuore",
            "R 3 — Aumenta lo Yin",
            "C 8 — Elimina il Fuoco da Cuore",
            "R 6 — Aumenta lo Yin",
            "C 9 — Elimina il Fuoco da Cuore",
            "MP 6 — Aumenta lo Yin",
            "V 15 — Punto Shu del Cuore",
            "IT 3 — Diffonde l’acqua del Tai Yang",
            "VC 15 — Agisce sul Cuore",
            "IC 4 — Purifica il Calore",
            "VG 14 — Disperde il Calore"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Liquirizia", "Vit. B1", "Aloe Vera", "Dao Chi San", "FM Crataegus"], ["Ginseng", "Ferro", "Calendula", "Da Chen Qi", ""], ["Iperico", "5 Htp", "Fuoco Yang", "", ""], ["Melissa", "Rame", "", "", ""], ["Genziana", "Vit. C", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Glossiti", "Infezioni acute delle vie urinarie", "Agitazione", "Ulcerazioni della bocca E della lingua", "Insonnia", "Sensazione di amaro in bocca al mattino", "Turbepsichiche"]},
            {"titolo": "Sintomi", "items": ["Urine scure", "Cistiti", "Ansia", "Sangue nelle urine", "Uretriti", "Irritazione", "Afte", "Cistopieliti", "Irrequietezza", "Colorito rosso del volto", "Epistassi", "Squilibrio mentale", "Sensazione di secchezza alla gola", "Perdita del controllo psichico", "Sete", "Delirio", "Difficoltà ad addormentarsi con continui risvegli notturni", "Crisi maniacali", "Sensazione di calore", "Intensa attività onirica", "Impulsività", "Turbe del linguaggio", "Viso rosso", "Palpitazioni", "Balbuzie", "Feci secche", "Aritmie", "Logorrea", "Ipersudorazione"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti amari che drenano (te, caffè, azuki)", "Alimenti che riscaldano troppo (alcool in genere, carne di agnello, capra, manzo, pollo, tacchino, salumi, affumicati, formaggi stagionati, con muffa, spezie calde; Alimenti arrostiti, fritti, grigliati, essicati.Troppo sale. Evitare il troppo astringente, troppo freddo, troppo umidificante"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti che purificano il calore, cioè grano integrale, germe di grano, eventualmente tè verde, ma con cautela perché agita", "Tisane ed alimenti che calmano lo shen: ribes nero, grano, lattuga, cavolo, salvia, basilico, melissa, valeriana, lavanda, luppolo, passiflora", "Tè bancha!!", "Cereali: grano, germogli di grano, miglio, orzo, amaranto, grano saraceno, segale", "Legumi e noci: soia verde, latte di soia, tofù.soia rossa e soia nera", "Verdure: cetriolo, pomodoro, cavolo, sedano, spinaci, bietola, insalata indivia e belga.cicoria, tarassaco, lattuga, ravanello, alghe marine", "Frutta: melone, pera, anguria, banana, mela, cachi", "Carne e latticini: Anatra, coniglio, quaglia, yogurt", "Pesce: calamari, seppia, polipo, ostriche, anguilla lumaca sgombro, granchio vongole", "Erbe e spezie: crescione, limone, salvia, alghe, valeriana, genziana, sambuco, ortica, camomilla, melissa, lavanda, rosa, biancospino", "Bevande: centrifughe di sedano, cetriolo, pomodoro. Tisane di alghe, melissa, decotto di grano"]}
          ],
          appunti: ["Aggiunto ai sintomi: gengiviti."]
        },
        {
          id: "flegma-fuoco-cuore",
          titolo: "Flegma-Fuoco di Qi dello Shao Yin – Cuore",
          sotto: "Shao Yin · Cuore",
          pag: "78-79",
          meridiani: ["cuore"],
          test: [
            "ST 24 (Xuè) + · R 19 (Yin) O · V 35 (Yang) + · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 14 (Cuore)."
          ],
          voci: [
            ["Origine", "All’origine di questa sindrome c’è una disfunzione della Milza che produce l’Umidità associata ad una alterazione del Cuore che ne determina il riscaldamento. Il risultato è una grave alterazione dello Shen. Quando prevale l’Umidità si hanno dei comportamenti schizofrenici, quando prevale il Calore si hanno comportamenti maniacali. Gli stati emotivi predisponenti sono: la collera repressa, l’inquietudine, il tormento derivato da ingiustizie (vere o solo percepiti tali)"],
            ["Principi di trattamento", "Spegnere il Calore, Trasformare l’Umidità, Calmare lo Shen"],
            ["Muscoli", "Sottoscapolare"]
          ],
          tc: [
            "C 7 — Calma lo Shen ed agisce sul Cuore",
            "V 15 — Punto Shu del Cuore",
            "C 8 — Disperde il Calore",
            "V 20 — Punto Shu della Milza",
            "C 9 — Disperde il Calore e mobilizza il Qi",
            "VG 15 — Porta del Mutismo",
            "MC 5 — Azione specifica su questa sindrome: trasforma l’umidità nella parte alta del corpo",
            "VG 20 — Ripristinare la cosienza negli stati stuporosi, disperde in alto",
            "ST 36 — Punto Terra dello Stomaco",
            "VG 24 — Calma lo Shen",
            "ST 40 — Attiva il Qi di Stomaco, contro l’umido",
            "VG 26 — Punto di Rianimazione",
            "MP 6 — Attiva Milza e tonifica lo Yin",
            "VC 12 — Punto d’Allarme dello Stomaco",
            "F 3 — Calma lo Shen e sottomette il Fuoco",
            "VC 14 — Punto d’allarme del Cuore",
            "VB 13 — Calma lo Shen",
            "VC 15 — Calma lo Shen"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Achillea Millefolium", "5 Htp", "Luppolo", "An Gong Niu Huang", "Psorinum"], ["Ginseng", "", "Passiflora", "Zhi Bao Dan", ""], ["Rhodiola", "", "Genziana", "", ""], ["Iperico", "", "Valeriana", "", ""], ["Melissa", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Isteria", "Psicosi maniacali", "Schizofrenia", "Epilessia"]},
            {"titolo": "Sintomi", "items": ["Depressione grave con immobilità e mutismo", "Collera e comportamento violento", "Stato stuporoso e afasia", "Stipsi", "Insonnia", "Oliguria", "Sonno molto disturbato", "Bocca secca e amara", "Delirio", "Rimuginazione", "Palpitazioni cardiopalmo", "Riso e pianto immotivati", "Collera repressa", "Stati Stuporosi", "Agitazione maniacale", "Tendenza ad essere aggressivi sia verbalmente sia fisicamente", "Tendenza a spaventarsi facilmente", "Irritabilità", "Comportamento violento", "Discorsi sconnessi", "Agitazione mentale", "Risentimento", "Riso o pianto incontrollato", "Confusione", "Inquietudine", "Tendenza ad urlare", "Borbottare tra sé e sé", "Depressione", "Ottusità", "Afasia", "Disturbi del linguaggio", "Ictus"]}
          ]
        },
        {
          id: "mucosita-cuore",
          titolo: "Mucosità che ostruiscono lo Shao Yin – Cuore",
          sotto: "Shao Yin · Cuore",
          pag: "80-81",
          meridiani: ["cuore"],
          test: [
            "ST 24 (Xuè) + · R 19 (Yin) – · V 35 (Yang) + · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 14 (Cuore)."
          ],
          voci: [
            ["Origine", "Alla base di questa sindrome c’è una disfunzione della Milza che produce l’Umidità. Questo deficit della Milza è indotta dalle preoccupazioni, le idee ossessive, il rimuginare, l’ansia. Inoltre anche una dieta ricca di cibi freddi, crudi e grassi causano l’umido. A tutto ciò si può associare Calore esterno. Se il Calore non viene metabolizzato correttamente si trasforma in Catarri, che ostruiscono, poi, le aperture del Cuore."],
            ["Principi di trattamento", "Eliminare l’umidità, Ripristinare la coscienza"],
            ["Muscoli", "Sottoscapolare"]
          ],
          tc: [
            "C 7 — Calma lo Shen ed agisce sul Cuore",
            "V 15 — Punto Shu del Cuore",
            "ST 36 — Punto Terra dello Stomaco",
            "V 20 — Punto Shu della Milza",
            "ST 40 — Attiva il Qi di Stomaco, contro l’umido",
            "VC 12 — Punto d’Allarme dello Stomaco",
            "MC 5 — Azione specifica su questa sindrome: trasforma l’umidità nella parte alta del corpo",
            "VG 20 — Ripristinare la cosienza negli stati stuporosi, disperde in alto",
            "IC 4 — Apre gli orifizi, rianima lo Shen",
            "VG 26 — Punto di Rianimazione",
            "TR 8 — Apre gli orifizi, disperde il Calore"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Achillea Millefolium", "Enzimi", "Passiflora", "Su He Xiang Wan", "Psorinum"], ["Ginseng", "HCl", "Papavero", "", ""], ["Genziana", "Epa Dha", "", "", ""], ["Iperico", "", "", "", ""], ["Melissa", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Epilessia", "Schizofrenia", "Ictus cerebrali", "Stati isterici", "T.I.A."]},
            {"titolo": "Sintomi", "items": ["Confusione mentale", "Stato stuporoso", "Perdita di coscienza", "Vomito", "Obnubilamento sensorio", "Disartria", "Rantoli respiratori", "Disturbi del linguaggio", "Oppressione toracica e addominale", "Fissità dello sguardo", "Demenza", "Allucinazioni visive e uditive", "Palpitazioni", "Stato confusionale", "Depressione", "Inquietudine", "Isteria"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti amari che drenano (te, caffè, azuki)", "Alimenti che riscaldano troppo (alcool in genere, carne di agnello, capra, manzo, pollo, tacchino, salumi, affumicati, formaggi stagionati, con muffa, spezie calde; Alimenti arrostiti, fritti, grigliati, essicati.Troppo sale. Evitare il troppo astringente, troppo freddo, troppo umidificante"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti che purificano il calore, cioè grano integrale, germe di grano, eventualmente tè verde, ma con cautela perché agita", "Tisane ed alimenti che calmano lo shen: ribes nero, grano, lattuga, cavolo, salvia, basilico, melissa, valeriana, lavanda, luppolo, passiflora", "Tè bancha", "Cereali: grano, germogli di grano, miglio, orzo, amaranto, grano saraceno, segale", "Legumi e noci: soia verde, latte di soia, tofù.soia rossa e soia nera", "Verdure: cetriolo, pomodoro, cavolo, sedano, spinaci, bietola, insalata indivia e belga.cicoria, tarassaco, lattuga, ravanello, alghe marine", "Frutta: melone, pera, anguria, banana, mela, cachi", "Carne e latticini: Anatra, coniglio, quaglia, yogurt", "Pesce: calamari, seppia, polipo, ostriche, anguilla lumaca sgombro, granchio vongole", "Erbe e spezie: crescione, limone, salvia, alghe, valeriana, genziana, sambuco, ortica, camomilla, melissa", "Bevande: centrifughe di sedano, cetriolo, pomodoro. Tisane di alghe, melissa, decotto di grano"]}
          ],
          appunti: ["Ginseng (fitoterapici) cancellato: «meglio di no»."]
        },
        {
          id: "stasi-sangue-cuore",
          titolo: "Stasi del Sangue dello Shao Yin – Cuore",
          sotto: "Shao Yin · Cuore",
          pag: "82-83",
          meridiani: ["cuore"],
          test: [
            "ST 24 (Xuè) + · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) –",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): + O O +",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 14 (Cuore)."
          ],
          voci: [
            ["Origine", "La causa primaria sono i fattori psicologici, legati all’ansia, all’agitazione ed in genere all’istabilità emotiva che esauriscono lo Yang, compromettono il Qi, consumando il Sangue."],
            ["Principi di trattamento", "Far circolare il Qi, Far circolare lo Yang, Dissolvere la Stasi di Sangue, Calmare lo Shen"],
            ["Muscoli", "Sottoscapolare"]
          ],
          tc: [
            "V 15 — Regola il Qi e lo Yang di Cuore",
            "VC 14 — Regola il Qi e lo Yang di Cuore",
            "V 14 — Regola il Qi e lo Yang di Cuore",
            "VC 17 — Regola il Qi e lo Yang di Cuore",
            "V 17 — Azione diretta sul Sangue",
            "MC 6 — Azione anti aritmica",
            "C 6 — Mobilizza e dinamizza",
            "C 5 — Calma lo Shen",
            "VG 26 — Rianima lo Shen",
            "ST 36 — Tonifica e fa circolare il Qi"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Biancospino", "Vit. E", "", "Gua Lou Xie Bai Ban Xia Tang", "FM Aesculus"], ["Olivo", "Magnesio", "", "Xue Fu Zhu Yu Tang", "FM Crataegus"], ["Passiflora", "Epa Dha", "", "", ""], ["Iperico", "Calcio", "", "", ""], ["Melissa", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Vulvopatia reumatica", "Infarto miocardico", "Ostruzione coronarica", "Angina pectoris", "Ipertensione", "Coronopatie"]},
            {"titolo": "Sintomi", "items": ["Precordialgia irradiata alle spalle e al braccio sinistro", "Precordalgia con oppressione toracica", "Dolore irradiato al dorso alla spalla all’arto sinistro", "Aritmie gravi", "Turbe del sonno", "Cianosi alle labbra e al letto ungueale", "Dolore al decorso del meridia-no del Cuore o I.T.", "Palpitazioni e cardiopalmo", "Stasi di tutto il sistema circolatorio", "Insonnia", "Ansia", "Sudorazione fredda", "Agitazione", "Attacchi di dolori intermittenti"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti molto salati che riscaldano e seccano troppo", "Alimenti pesanti, grassi e di scarsa qualità", "Alimenti molto acidi", "Evitare caffè", "Usare alcool con la massima cautela"]},
            {"titolo": "Alimentazione consigliata", "items": ["Per muovere c’è bisogno di Yang, ma attenzione a non creare troppo calore", "Cereali: Orzo, Riso, Grano saraceno, Segale", "Legumi e noci: Azuki, Germogli di soia, Soia nera, Arachidi", "Verdure: Porri, Sedano, Melanzane, Rape, Carote, Alghe, Asparagi, Cipolla", "Frutta: Ciliegie, More, Papaia, Lamponi, Prugne", "Carne: Poco coniglio, Vitello", "Pesce: Granchio, Polipo", "Erbe e spezie: Curcuma (medicina del fegato), Coriandolo, Origano, Zafferano, Salvia, Timo, Capperi, Verbena", "Bevande: Tisane (rosa, salvia, leonurus cardiaca, verbena, menta, timo, basilico)"]}
          ]
        }
      ]
    },
    {
      id: "tai-yang-it", titolo: "Tai Yang · Intestino Tenue",
      intro: ["Le sindromi dell'Intestino Tenue (tabella di pag. 17).", "Punti dell'organo: allarme VC 4 · chiave V 62 · yuan IT 4 · shu V 27 · xi IT 6."],
      schede: [
        {
          id: "ostruzione-qi-it",
          titolo: "Ostruzione del Qi del Tai Yang – Intestino Tenue",
          sotto: "Tai Yang · Intestino Tenue",
          pag: "84-85",
          meridiani: ["intestino-tenue"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 4 (Intestino Tenue)."
          ],
          voci: [
            ["Origine", "Spesso la causa è la Stasi ed ostruzione di Qi di Fegato che invade l’Intestino Tenue, causandone il blocco della circolazione energetica. Anche un attacco esterno di freddo o calore può causare questa sindrome. Inoltre il consumo frequente di cibi freddi può generare questo quadro sintomatico."],
            ["Principi di trattamento", "Mobilizzare il Qi di IT, Armonizzare il Fegato"],
            ["Muscoli", "Sottoscapolare"]
          ],
          tc: [
            "VC 6 — Azione sul Riscaldatore inferiore",
            "VB 34 — Azione sul Riscaldatore inferiore",
            "VC 4 — Azione sul Riscaldatore inferiore",
            "MP 6 — Tonifica la Milza",
            "ST 25 — Per trattare il dolore addominale",
            "F 3 — Regolarizza il Qi di Fegato",
            "ST 29 — Risolve le Stasi",
            "V 23 — Tonifica il Qi",
            "ST 39 — Azione antalgica sull’ostruzione intestinale"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Semi di Pompelmo", "Fermenti Lattici", "Triphala", "Ju He Wan", "FM Nux Vomica"], ["Angelica", "Magnesio", "", "Da Cheng Qi Tang", "Asa Foetida 9CH"], ["Carbone Vegetale", "Probiotici", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Distensione addominale", "Sindromi gastroenteriche", "Fermentazione", "Ernie inguino-scrotali", "Disbiosi intestinale", "Varicocele"]},
            {"titolo": "Sintomi", "items": ["Torsione del funicolo spermatico", "Dolore ombelicale", "Dolore testicolare", "Ernia strozzata", "Flatulenze", "Vomito", "Appendicite", "Dolore addominale irradiato ai lombi", "Dolore e sensazione di pienezza", "Aggravamento dei dolori con abiti stretti", "Borbogismi", "Dolori ai genitali esterni", "Dolore al piccolo bacino", "Gonfiore allo scroto"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cereali: miglio, avena, riso, farro, grano, grano saraceno, mais, orzo, quinoa, sorgo", "Legumi e noci: fave, ceci, lenticchie, piselli, nocciole, noci, semi di girasole, arachidi, pinolo, pistacchio, anacardo, castagna", "Verdure: carota, patata, patata dolce, zucca, cavolo di Bruxelles, cavolo cappuccio, cavolo rapa, cavolo verza, funghi, cipolla, porro", "Frutta: dattero, ciliegia, fico, frutta secca non oleosa, prugna umeboshi, fico d’india, pesca", "Carne e latticini: manzo, vitello, pollo, tacchino, agnello, capra, uova di quaglia, ghee. PESCE, FRUTTI DI MARE: carpa, trota, acciuga, aringa, persico, triglia, cefalo", "Erbe e spezie: anice, cumino, zenzero fresco e secco, cardamomo, rosmarino, vaniglia, ginepro, coriandolo, scorza d’agrumi, pepe", "Bevande: acqua del rubinetto calda, tisane aromatiche (rosmarino, timo, salvia, cumino, anice, cardamomo, zenzero…), acqua d’orzo", "Olii: olio di soia"]}
          ]
        },
        {
          id: "vuoto-freddo-it",
          titolo: "Vuoto-Freddo del Tai Yang – Intestino Tenue",
          sotto: "Tai Yang · Intestino Tenue",
          pag: "86-87",
          meridiani: ["intestino-tenue"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) + · V 35 (Yang) – · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 4 (Intestino Tenue)."
          ],
          voci: [
            ["Origine", "La principale origine di questa sindrome è l’assunzione di cibi freddi e crudi o l’uso eccessivo di ghiaccio nelle bevande. Può, inoltre, insorgere come vicariazione di una sindrome da Vuoto-Freddo dello Stomaco o da un vuoto di Qi e di Yang della Milza. Si possono manifestare anche dei sintomi a carico della Vescica a causa del collegamento di questi due organi tramite il Livello Tai Yang."],
            ["Principi di trattamento", "Riscaldare lo Yang, Mobilizzare lo Yang"],
            ["Muscoli", "Quadricipite, Addominali"]
          ],
          tc: [
            "ST 25 — Per dolore addominale",
            "V 26 — Punto Shu di Vescica",
            "ST 36 — Riequilibra la componente Terra",
            "V 27 — Punto Shu di IT",
            "ST 39 — Azione diretta su IT",
            "VC 4 — Punto d’Allarme di IT",
            "V 20 — Tonifica il Qi di Milza",
            "VC 6 — Tonifica il Riscaldatore Inferiore"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Angelica Arcangelica", "Betaina HCL", "Triphala", "Wu Zhu Yu Tang", "Nux Vomica"], ["Zenzero", "Acido Pantotenico", "Finocchio", "Angelica Sinensis", "Mercurius"], ["Fuoco Yin", "Calcio", "Valeriana", "", "Lycopodium"], ["Rosso Fuoco", "Potassio", "Fuoco Yin", "", ""], ["Zenzero", "Vit. B9", "Rosso Fuoco", "", ""], ["", "Ferro", "", "", ""], ["", "Prebiotici", "", "", ""], ["", "Probiotici", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Enterite acuta da freddo", "Sindromi gastroenteriche", "Dissenteria cronica O acuta", "Cefalea (vasocostrizione)", "Deficit di assorbimen-to del tenue", "Disturbi di metabolismo del calcio", "Cervicalgia", "Lombosciatalgia"]},
            {"titolo": "Sintomi", "items": ["Poliuria con urine pallide", "Freddo interno", "Dissenteria", "Borborigmi", "Arti freddi", "Dolori periombelicali", "Addome dolente con disturbo alleviato da pressione", "Dolori al basso ventre irradiati posteriormente al dorso", "I vari sintomi migliorano con l’applicazione di calore", "Dolori ipogastrici", "Desiderio di bevande calde", "Stipsi", "Dolore addominale", "Nausea", "Cefalea occipitale", "Vomito", "Distorsioni croniche alle caviglie", "Sterilità", "Dolori ai muscoli delle gambe", "Dismenorrea", "Affezioni oculari"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cereali: miglio, avena, riso, farro, grano, grano saraceno, mais, orzo, quinoa, sorgo", "Legumi e noci: fave, ceci, lenticchie, piselli, nocciole, noci, semi di girasole, arachidi, pinolo, pistacchio, anacardo, castagna", "Verdure: carota, patata, patata dolce, zucca, cavolo di Bruxelles, cavolo cappuccio, cavolo rapa, cavolo verza, funghi, cipolla, porro", "Frutta: dattero, ciliegia, fico, frutta secca non oleosa, prugna umeboshi, fico d’india, pesca", "Carne e latticini: manzo, vitello, pollo, tacchino, agnello, capra, uova di quaglia, ghee. PESCE, FRUTTI DI MARE: carpa, trota, acciuga, aringa, persico, triglia, cefalo", "Erbe e spezie: anice, cumino, zenzero fresco e secco, cardamomo, rosmarino, vaniglia, ginepro, coriandolo, scorza d’agrumi, pepe", "Bevande: acqua del rubinetto calda, tisane aromatiche (rosmarino, timo, salvia, cumino, anice, cardamomo, zenzero…), acqua d’orzo", "Olii: olio di soia"]}
          ]
        },
        {
          id: "calore-umidita-it",
          titolo: "Calore-Umidità del Tai Yang – Intestino Tenue",
          sotto: "Tai Yang · Intestino Tenue",
          pag: "88-89",
          meridiani: ["intestino-tenue"],
          test: [
            "ST 24 (Xuè) + · R 19 (Yin) O · V 35 (Yang) + · R 13 (Qi) –",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): O + – – — + + – O — + + – –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 4 (Intestino Tenue)."
          ],
          voci: [
            ["Origine", "E’ la conseguenza di una sindrome di Fuoco del Cuore. Il Fuoco si espande dal Cuore al suo viscere collegato (IT) e da questo alla Vescica per il collegamento IT-V del Livello energetico Tai Yang. Questa sindrome, perciò, ha una forte connotazione emotiva, provocata da una forte ansia provata per molto tempo, dovuta, soprattutto, dalle pressioni ambientali che la persona subisce. Questa sindrome si riscontra spesso in persone con comportamento maniacale, o a persone impegnate in una miriade di progetti diversi, che li impegnano fino al limite delle loro forze. Può anche essere la conseguenza di errori alimentari e la complicanza di Calore in Milza/ Stomaco."],
            ["Principi di trattamento", "Purificare il Calore di Cuore e IT"],
            ["Muscoli", "Quadricipite, Addominali"]
          ],
          tc: [
            "IT 2 — Elimina il Calore da IT",
            "VC 3 — Punto d’Allarme di Vescica",
            "IT 5 — Elimina il Calore da IT e calma lo Shen",
            "VC 4 — Punto d’Allarme di IT",
            "C 5 — Agisce sul Fuoco di Cuore",
            "IC 11 — Purifica il calore",
            "C 8 — In dispersione agisce sul Fuoco di Cuore",
            "ST 39 — Azione diretta su IT"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Althea Officinalis", "Probiotici", "Aglio", "Dao Chi San", "Mercurius"], ["Mirtillo Rosso", "Prebiotici", "Fuoco Yang", "Du Huo", "Cantharis"], ["Salice Bianco", "Manganese", "Rosso Fuoco", "Huang Lian", "Nux Vomica"], ["Uva Ursina", "Fermenti Lattici", "", "Wu Ling San", "Solidago"], ["Solidago", "L-Glutammina", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Diverticolite", "Infezioni acute delle vie urinarie", "Ulcerazioni della bocca E della lingua", "Enterocolite acuta", "Appendicite acuta", "Agitazione", "Ipoacusia"]},
            {"titolo": "Sintomi", "items": ["Cistiti", "Afte", "Uretriti", "Faringodinia", "Cistopieliti", "Ansia", "Calore toracico", "Ematuria", "Irritazione", "Sete e bocca secca", "Disuria", "Irrequietezza", "Addome dolente", "Insonnia", "Oliguria con urine scarse", "Sordità", "Squilibrio mentale", "Oliguria con urine cariche", "Stipsi", "Perdita del controllo psichico", "Meteorismo", "Blocco intestinale"]},
            {"titolo": "Alimentazione da evitare", "items": ["Crostacei e gamberi", "In caso di dissenteria evitare di fermarla, perché l’Umidità e il Calore devono uscire", "Per questo si consiglia di bere molto"]},
            {"titolo": "Alimentazione consigliata", "items": ["Decotto di Bardana, Marrubio Volgare e radice di Genziana (no, però, in gravidanza e con ulcera gastrointestinale)", "Molta attenzione agli alimenti già precotti e di scarsa qualità", "Cereali: Orzo, Grano Saraceno, Amaranto, Riso", "Legumi e noci: Soia rossa, Soia verde, Germogli di soia", "Verdure: Tarassaco, Insalate a foglia amara, Insalata belga, Cicoria, Patate, Zucca, Cetrioli, Sedano, Carciofi, Asparagi, Funghi, Rucola, Cavalo Cinese, Germogli in genere", "Pesce: Granchio e Vongole", "Spezie: Rucola, Crescione, Tarassaco, Rosmarino", "Bevande: Decotto con bucce d’agrumi, Barba di mais, Acqua d’Orzo, Tisana di Tarassaco, Valeriana, Genziana, Ortica, Melissa, Angelica, Betulla, Passilora"]}
          ],
          info: ["Stile di vita: Lavorare sulla negatività emotiva."]
        },
        {
          id: "calore-it",
          titolo: "Calore nel Tai Yang – Intestino Tenue",
          sotto: "Tai Yang · Intestino Tenue",
          pag: "90-91",
          meridiani: ["intestino-tenue"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) + · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 4 (Intestino Tenue)."
          ],
          voci: [
            ["Origine", "La causa principale sono gli stress dello Shen, una forte ansia provata per molto tempo, forti pressioni emotive. Questa sindrome è, in genere, associata al Calore del Cuore, che interferisce sulla capacità di IT di separare i Liquidi a livello del TR inferiore. Il calore, dissipa i Liquidi e quindi si avranno poche urine e scure."],
            ["Principi di trattamento", "Armonizzare il Cuore, Purificare il Fuoco di IT"],
            ["Muscoli", "Quadricipite, Addominali"]
          ],
          tc: [
            "IT 2 — Elimina il Calore da IT",
            "C 5 — Purifica il Calore di Cuore",
            "IT 5 — Elimina il Calore da IT, Calma lo Shen",
            "C 8 — Purifica il Calore di Cuore",
            "ST 39 — Blocca il dolore addominale"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Salice Bianco", "Boro", "Fuoco Yang", "Ba Zheng San", "Nux Vomica"], ["Mirtillo Rosso", "B6", "", "Astragalo", "Solidago"], ["Uva Ursina", "B Complex", "", "", "Mercurius"], ["Solidago", "Betacarotene", "", "", ""], ["", "Cal Mag", "", "", ""], ["", "L-Glutammina", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Sindromi gastroenteriche", "Sindromi genitourinarie", "Enterite", "Enterocolite con effetti cefalici", "Acetone", "Algie varie", "Cefalea", "Acidi intestinali", "Acidi gastrici"]},
            {"titolo": "Sintomi", "items": ["Disagio e calore al petto", "Urine scarse e scure", "Irrequitezza mentale", "Enterocolite batterica con effetti riflessi agli arti superiori – epicondilite", "Disturbi dell’udito", "Sangue nelle urine", "Sordità", "Stipsi", "Ulcerazioni della lingua", "Cistiti", "Dolore alla gola", "Dolore all’addome", "Afte", "Disturbi digestivi"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti amari che drenano (te, caffè, azuki)", "Alimenti che riscaldano troppo (alcool in genere, carne di agnello, capra, manzo, pollo, tacchino, salumi, affumicati, formaggi stagionati, con muffa, spezie cald)", "Alimenti arrostiti, fritti, grigliati, quindi essicati.Troppo sale", "Evitare il troppo astringente, troppo freddo, troppo umidificante"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti che nutrono lo yin e creano liquidi", "Frutta e verdura meglio cotta o centrifugata", "Ottimi centrifugati di uva, pera", "Piccole quantità di cibi astringenti e acidi (yogurt, limone, ananas, arance, kiwi, ecc)", "Utilizzare metodi di cottura yin: in acqua, a vapore, fermentati, crudo se la digestione lo permette", "Bere tisane o anche acqua tiepida", "Assumere polline, pappa reale, semi di sesamo, semi di lino", "Cereali: Grano integrale, Germogli di grano, Miglio, Quinoa, Amaranto", "Legumi e noci: Soia nera, Soia verde, Latte di soia, Tofu", "Verdure: Sedano, Spinaci, Bietola, Cetrioli, Pomodoro, Cavoli, Indivia, Insalata belga, Cicoria, Tarassaco, Lattuga, Germogli, Ravanello, Alghe", "Frutta: Pera, Uva, Mela, Anguria, Arancia, Limone, Pompelmo, Mandarino, Caco, Banane, Ananas, Avocado. CARNE E LATTICINI: Anatra, Coniglio, Cavallo, Yogurt", "Pesce: Frutti di mare, Calamari, Seppia, Polpo, Ostriche, Vongole", "Spezie: Salvia, Crescione, Menta, Melissa, Limone, Ortica", "Bevande: Tisane con l’aggiunta di Alghe, Melissa, Grano. Centrifughe con: Sedano, Cetrioli, Pomodori, Erba di grano"]}
          ]
        },
        {
          id: "stasi-qi-it",
          titolo: "Stasi del Qi del Tai Yang – Intestino Tenue",
          sotto: "Tai Yang · Intestino Tenue",
          pag: "92-93",
          meridiani: ["intestino-tenue"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) +",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 4 (Intestino Tenue)."
          ],
          voci: [
            ["Origine", "Questa sindrome è spesso associata alla Stasi di Qi di Fegato che invade la Milza. Può essere sia una condizione acuta che cronica. Può essere provocata dall’eccesivo consumo di cibi freddi e crudi che alterano la funzione di trasformazione di IT. Essendo associata alla Stasi di Qi di Fegato, spesso può originare da stati di collera, frustrazione o risentimento."],
            ["Principi di trattamento", "Muovere il Qi nel TR Inferiore, Equilibrare il Fegato"],
            ["Muscoli", "Quadricipite, Addominali"]
          ],
          tc: [
            "F 3 — Dissolve la Stasi del qi di Fegato",
            "MP 6 — Blocca il dolore addominale",
            "F 13 — Equilibra il Fegato",
            "VB 34 — Muove il Qi nel TR inferiore",
            "ST 27 — Muove il Qi e stimola le funzioni di IT",
            "VC 4 — Elimina le Stasi",
            "ST 29 — Muove il Qi e stimola le funzioni di IT",
            "VC 6 — Muove il Qi nel TR inferiore",
            "ST 39 — Armonizza IT, rimuove le Stasi"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Cardo Mariano", "L-Glutammina", "Fuoco Yin", "Da Cheng Qi Tang", "Nux Vomica"], ["Tarassaco", "Fermenti Lattici", "", "Ju He Wan", "Chelidonium"], ["Carciofo", "Magnesio", "", "", ""], ["", "B 6", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Spasmo intestinale", "Intossicazione alimentare O chimica", "Sindromi gastroenteriche", "Varicocele", "Ernie inguino-scrotali", "Ernia strozzata"]},
            {"titolo": "Sintomi", "items": ["Dolore addominale che si irradia nella zona Lombare", "Dolore all’addome che si diffonde anteriormente", "Insofferenza alla pressione sull’addome", "Flatulenze", "Gonfiore addominale", "Dolore addominale alleviato dall’emissione di gas", "Dolore con sensazione di torsione all’addome", "Dolore ai testicoli", "Disbiosi", "Borbogismi", "Dolori ai genitali esterni", "Dolori al piccolo bacino", "Gonfiore allo scroto"]},
            {"titolo": "Alimentazione da evitare", "items": ["Tutti gli alimenti freschi come latticini, the, insalate, la maggior parte di frutti", "Caffè con grande parsimonia", "Niente gelati, bevande o alimenti presi direttamente dal frigorifero", "Poca frutta e verdura cruda", "Bollire a lungo i cereali integrali interi"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cucinare almeno tre volte al giorno", "Tostare i semi come noci, sesamo, semi di girasole", "Lasciare bollire o cuocere i cibi a lungo", "Cucinare con un po’ di vino", "Cereali: Avena, Riso, Riso basmati, Mais, Farro, Segale, Quinoa", "Legumi e noci: Fave, Ceci, Fagioli neri, Lenticchie, Piselli, Noci, Castagne, Nocciole, Semi di girasole, Pinoli, Arachidi", "Verdure: Carota, Patata, Zucca, Finocchio, Cipolla, Aglio, Porro, Cavolo (tranne quello cinese), Peperone", "Frutta: Ciliegia, Fichi, Litchi, Frutta cotta con spezie", "Carne e latticini: Manzo, Vitello, Pollo, Tacchino, Agnello, Capra, Cervo, Selvaggina", "Pesce: Trota, Acciuga, Anguilla, Cozze, Gamberetti", "Spezie: Anice, Anice stellato, Cumino, Cardamomo, Zenzero fresco o secco, Cannella, Rosmarino, Timo, Origano, Noce moscata, Chiodi di garofano, Ginepro, Coriandolo, Pepe, Peperoncino, Capperi, Rafano", "Bevande: Acqua calda, Tisane (rosmarino, timo, salvia, cumino, anice, cardamomo, zenzero). Caffè d’orzo"]}
          ],
          info: [
            "Stile di vita: Vestirsi bene tenendo l’addome al caldo, coprire i reni, le gambe ed i piedi. Evitare l’esposizione ad ambienti umidi e freddi. Eventualmente usare fonti di calore esterno da applicare alle zone più fredde (es:borsa dell’acqua calda, sale, noccioli di ciliegie, impacchi con lo zenzero). Muovere il Qi con : movimento fisico, Qi Gong, massaggi e assumendo spezie."
          ]
        }
      ]
    },
    {
      id: "tai-yin-milza", titolo: "Tai Yin · Milza-Pancreas",
      intro: ["Le sindromi della Milza-Pancreas (tabella di pag. 18).", "Punti dell'organo: allarme F 13 · chiave MP 4 · yuan MP 3 · shu V 20 · xi MP 8."],
      schede: [
        {
          id: "deficit-qi-milza",
          titolo: "Deficit di Qi del Tai Yin – Milza",
          sotto: "Tai Yin · Milza-Pancreas",
          pag: "94-95",
          meridiani: ["milza"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme F 13 (Milza)."
          ],
          voci: [
            ["Origine", "E’ forse la Sindrome più frequente in assoluto. Le causa sono: 1) stati congeniti di debolezza della Milza e dello Stomaco, 2) l’esito di disfunzioni croniche che hanno debilitato il corpo, 3) gli errori alimentari, con il consumo eccessivo di dolci, grassi e verdure crude, 4) gli stress emotivi, 5) affaticamento mentale eccessivo, 6) dissenteria prolungata ed ininterrotta, 7) eccesso di Qi di Fegato che aggredisce la Milza."],
            ["Principi di trattamento", "Tonificare Milza e Stomaco"],
            ["Muscoli", "Gran Dorsale, Trapezio Medio, Tricipite, Estensori Pollice-Mignolo"]
          ],
          tc: [
            "MP 6 — Tonifica il Qi della milza",
            "V 20 — Punto d’Allarme della Milza",
            "ST 25 — Attiva il Qi Nutrizionale",
            "V 21 — Punto d’allarme dello Stomaco",
            "ST 36 — Tonifica Milza e Stomaco",
            "ST 21 — Tonifica la Milza",
            "VC 12 — Punto d’Allarme di Stomaco",
            "F 13 — Stimola Milza e Stomaco",
            "VC 4 — Tonifica lo Yang di M, il Sangue e lo Yin",
            "MP 9 — Tonifica M, nutre il Sangue e lo Yin"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Zenzero", "Litio", "Eufer", "Si Jun Zi Tang", "Phaseolus"], ["Kudzu – Pueraria Radix", "Cromo", "Shilajit", "Shen Ling Bai Zu San", "Leptandra"], ["Liquirizia", "Vit K", "Terra Yin", "Astragalo", ""], ["Dioscorea", "Enzimi", "Giallo Terra", "Bu Zhong Yi Qi Tang", ""], ["Ginseng", "Vit B6", "", "Xiao Yao San", ""], ["Achillea Millefolium", "", "", "Er Chen Tang", ""], ["Angelica Arcangelica", "", "", "Gui Pi Tang", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Gastroenterite", "Ernia iatale", "Enterocolite", "Gastroduodenite", "Reflusso gastroesofageo", "Ulcera gastroduodenale", "Esofagite", "Colite cronica", "Prolassi", "Epatite cronica", "Cirrosi epatica", "Carenza di vit K", "Nevrosi", "Astenia"]},
            {"titolo": "Sintomi", "items": ["Singhiozzo", "Oppressione epigastrica", "Rigurgiti acido", "Miastenia", "Scialorrea", "Nausea mattutina", "Dolore lombare sordo", "Feci molli e diarrea liquida", "Spasmi dell’esofago, gastrici, del piloro", "Sensazione di pesantezza di tutti i visceri addominali", "Distensione addominale post prandiale", "Mancanza di desiderio di parlare", "Aspetto emaciato", "Edema", "Pesantezza", "Oliguria", "Meteorismo", "Disfagia", "Anemia", "Dispepsia", "Dissenteria cronica", "Inappetenza", "Ipotermia alle estremità", "Anoressia", "Muco", "Algie gastriche", "Parto difficoltoso", "Geopatie", "Insonnia", "Dolori mestruali"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti di natura fredda o troppo umidificanti (succhi di frutta, zucchero, dolcificanti e pane)", "Il sapore dolce eccessivo in generale", "Bollire le verdure e condire con spezie riscaldanti(timo, peperoncino, zenzero, curry)", "Evitare cibi crudi", "Evitare di mangiare velocemente, senza masticare, con ritmi irregolari (buffet), continuamente nell’arco della giornata", "Bere bevande fredde, soprattutto durante i pasti", "Alimenti denaturati, privi di Qi, industriali, riscaldati con microonde, confezionati"]},
            {"titolo": "Alimentazione consigliata", "items": ["Colazione cucinata, calda, ed in inverno anche cereali, legumi, carne", "Masticare bene e fermarsi prima di essere sazi", "Frutta, meglio se cotta, solo lontano dai pasti", "Piccole quantità di alimenti fermentati, dopo i pasti", "Una tazza di brodo o una tisana aromatica prima dei pasti", "Importanti i cereali, lasciarli in ammollo prima, macinarli, e poi cuocerli a lungo", "Senza carne ne pesce è molto difficile tonificare il Qi e lo Yang, meglio se sottoforma di brodo, bollito a lungo, spezzatini, carne macinata", "L’aromatico aiuta la milza nella trasformazione e nel portare verso l’alto", "Cereali: miglio, avena, riso, grano, grano saraceno, mais", "Legumi e noci: azuki, fave, ceci, lenticchie, piselli, latte di soia, noci nocciole, semi di girasole, arachidi", "Verdure: carote, patate, zucca, cavolo, funghi", "Frutta: datteri, ciliegie, fichi, frutta secca non oleosa", "Carne e latticini: manzo, vitello, pollo, agnello, capra, coniglio, ghee", "Pesce: trota, acciuga, aringa, persico, triglia, cefalo", "Spezie: anice, cumino, zenzero fresco, cardamomo, cannella, rosmarino, noce moscata, vaniglia, ginepro, coriandolo", "Bevande: Acqua calda, tisane aromatiche, (rosmarino, timo, salvia, anice, cardammomo, zenzero) acqua d’orzo"]}
          ],
          info: [
            "Stile di vita: attenzione con sauna e bagni caldi perché disperdono il calore che già manca. Lavorare con il corpo, sentirsi a proprio agio, la Milza ama il contatto fisico, i massaggi, gli stiramenti, ed il contatto con il pavimento. Movimento rilassato. Cercare di strutturare la vita quotidiana in modo regolare, con pasti regolari. Avere un luogo dove sentirsi a casa propria, non troppe avventure, una vita stabile e centrata. Una doccia fresca, il movimento all’aria aperta rinvigoriscono."
          ],
          appunti: [
            "Legata alle capacità mentali e alla memoria scolastica.",
            "Il sapore che lede la milza è il tanto dolce; il poco dolce tonifica.",
            "Patisce tantissimo le geopatie.",
            "Astenia: perché una delle 2 fonti del Qi del corpo è la Milza."
          ]
        },
        {
          id: "vuoto-yang-milza",
          titolo: "Vuoto dello Yang di Tai Yin – Milza",
          sotto: "Tai Yin · Milza-Pancreas",
          pag: "96-97",
          meridiani: ["milza"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) – · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme F 13 (Milza)."
          ],
          voci: [
            ["Origine", "E’ una vicariazione della Sindrome di Vuoto di Qi di Milza. A tale quadro si aggiungono i sintomi di Freddo. Il Freddo può essere di origine alimentare con un consumo eccessivo di cibi freddi o freschi e di cibi crudi. Oppure il freddo può essere di origine esterna (Vento-Freddo- Umidità). Inoltre può essere l’esito di una complicazione di un Deficit di Yang di Rene."],
            ["Principi di trattamento", "Promuovere le funzioni della Milza, Tonificare lo Yang"],
            ["Muscoli", "Gran Dorsale, Trapezio Medio, Tricipite, Estensori Pollice-Mignolo"]
          ],
          tc: [
            "MP 6 — Tonifica il Qi della milza",
            "V 20 — Punto Shu della Milza",
            "MP 9 — Mobilizza i liquidi e tratta gli edemi",
            "V 21 — Punto Shu dello Stomaco",
            "ST 25 — Attiva il Qi Nutrizionale",
            "V 22 — Punto Shu del Triplice Riscaldatore",
            "ST 28 — Mobilizza i liquidi",
            "VC 6 — Tonifica lo Yang",
            "ST 36 — Tonifica lo Stomaco",
            "VC 9 — Mobilizza i liquidi",
            "VG 4 — Tonifica lo Yang",
            "VC 12 — Punto d’Allarme di Stomaco"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Zenzero", "Litio", "Eufer", "Li Zhong Tang", "Phaseolus"], ["Ginseng", "Cromo", "Shilajit", "Aconitum Carmichaeli", "Leptandra"], ["Astragalo", "Enzimi", "Bacopa", "Tian Ma", ""], ["", "Vit B6", "Gotukola", "He Ye Cha", ""], ["", "Potassio", "Terra Yin", "Rou Gui", ""], ["", "Ferro", "Giallo Terra", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Gastriti croniche", "Anemia", "Castroenteriti", "Ulcera gastrica", "Ulcera duodenale", "Ptosi gastrica", "Colite cronica", "Epatite", "Cirrosi epatica"]},
            {"titolo": "Sintomi", "items": ["Nausea", "Astenia", "Sensazione di pienezza", "Aspetto emaciato", "Oppressione toracica", "Viso pallido", "Oppressione epigastrica", "Sensazione di freddo", "Dissenteria con feci molli", "Freddo agli arti", "Dissenteria con feci liquide", "Debolezza degli arti", "Anoressia", "Dispepsia", "Meteorismo", "Gonfiore addominale dopo i pasti", "Dolore addominale che peggiora dopo i pasti e migliora col calore", "Feci con presenza di cibo non digerito", "Stato edematoso generalizzato", "Scarso appetito", "Dispnea", "Leucorree chiare e liquide", "Poliuria con urine chiare", "Edemi", "Depressione", "Enteriti croniche"]},
            {"titolo": "Alimentazione da evitare", "items": ["Tutti gli alimenti freschi come latticini, the", "Caffè con grande parsimonia", "Niente gelati, bevande o alimenti presi direttamente dal frigor Poca frutta e verdura cruda", "Bollire a lungo i cereali integrali interi"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cucinare almeno tre volte al giorno", "Tostare i semi come noci, sesamo, semi di girasole", "Lasciare bollire o cuocere i cibi a lungo", "Cucinare con un po’ di vino", "Cereali: Avena, Riso, Riso basmati, Mais, Farro, Segale, Quinoa", "Legumi e noci: Fave, Ceci fagiolo nero, Lenticchie, Piselli, Noci, Castagne, Nocciole, Semi di girasole, Pinoli, Arachidi", "Verdure: Carota, Patata, Zucca, Finocchio, Cipolla, Aglio, Porro, Cavolo, Peperone", "Frutta: Ciliegia, Fichi, Litchi, Frutta cotta con spezie", "Carne e latticini: Manzo, Vitello, Pollo, Tacchino, Agnello, Capra, Cervo, Selvaggina", "Pesce: Trota, Acciuge, Anguilla, Cozze, Gamberetti", "Spezie: Anice, Anice stellato, Cumino, Cardamomo, Zenzero fresco o secco, Cannella, Rosmarino, Timo, Origano, Noce moscata, Chiodi di garofano, Ginepro, Coriandolo, Pepe, Peperoncino, Capperi, Rafano", "Bevande: Acqua calda, Tisane (rosmarino, timo, salvia, cumino, anice, cardamomo, zenzero), Caffè d’orzo"]}
          ]
        },
        {
          id: "qi-milza-affondato",
          titolo: "Qi di Tai Yin – Milza affondato",
          sotto: "Tai Yin · Milza-Pancreas",
          pag: "98-99",
          meridiani: ["milza"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) – · R 13 (Qi) –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme F 13 (Milza)."
          ],
          voci: [
            ["Origine", "E’ una vicariazione del Vuoto di Qi di Milza. Il Qi e lo Yang ristagnano verso il basso non riuscendo a raggiungere la parte alta del corpo. Chi lavora restando per parecchie ore in piedi è più predisposto a questa Sindrome. La conseguenza sono le ptosi."],
            ["Principi di trattamento", "Rinforzare la Milza, Tonificare lo Yang, Far salire lo Yang, Muovere il Qi"],
            ["Muscoli", "Gran Dorsale, Trapezio Medio, Tricipite, Estensori Pollice-Mignolo"]
          ],
          tc: [
            "MP 6 — Tonifica il Qi della milza",
            "V 20 — Punto Shu della Milza",
            "MP 9 — Mobilizza i liquidi e tratta gli edemi",
            "V 21 — Punto Shu dello Stomaco",
            "ST 21 — Ptosi dello stomaco",
            "V 22 — Punto Shu del Triplice Riscaldatore",
            "ST 25 — Attiva il Qi Nutrizionale",
            "R 6 — Per tutti i tipi di prolasso",
            "ST 28 — Mobilizza i liquidi",
            "VC 6 — Tonifica lo Yang",
            "ST 36 — Tonifica lo Stomaco",
            "VC 9 — Mobilizza i liquidi",
            "VG 1 — Solleva l’energia",
            "VC 12 — Punto d’Allarme di Stomaco",
            "VG 4 — Tonifica lo Yang",
            "VG 20 — Solleva l’energia"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Zenzero", "Cromo", "Shilajit", "Bu Zhong Yi Qi Tang", "Veratrum Album"], ["Kuzu – Pueraria Radix", "HCl", "Gotukola", "Ling Gui Zhu Gan Tang", "Phaseolus"], ["Liquirizia", "", "Terra Yin", "Angelica Sinensis", "Leptandra"], ["Astragalo", "", "Giallo Terra", "Bluperum", ""], ["Ginseng", "", "Prophase", "", ""], ["Dioscorea", "", "Endo 2", "", ""], ["Achillea Millefolium", "", "", "", ""], ["Angelica Arcangel.", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Ptosi gastrica", "Ptosi renale", "Ptosi vaginale", "Ptosi anale", "Prolasso uterino", "Prolasso vescicale", "Prolasso rettale", "Astenia", "Sindrome post virale"]},
            {"titolo": "Sintomi", "items": ["Vertigini", "Freddo agli arti", "Offuscamento visivo", "Incontinenza Urinaria", "Confusione mentale", "Dissenteria cronica", "Sensazione di testa pesante", "Bronchiti croniche", "Dispnea", "Edema", "Voce debole", "Edema cardiaco", "Ristagno di muco", "Edema nefritico", "Anemia", "Trofismo dei tessuti scarso", "Sensazione di trazione verso il basso dell’addome", "Sensazione di pesantezza di tutto il corpo", "Gonfiore addominale post prandiale", "Vene varicose", "Asma", "Poliuria con urgenza della minzione", "Emmoroidi", "Anoressia"]},
            {"titolo": "Alimentazione da evitare", "items": ["Tutti gli alimenti freschi come latticini, the, insalate, la maggior parte di frutti", "Caffè con grande parsimonia", "Niente gelati, bevande o alimenti presi direttamente dal frigorifero", "Poca frutta e verdura cruda", "Bollire a lungo i cereali integrali interi"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cucinare almeno tre volte al giorno", "Tostare i semi come noci, sesamo, semi di girasole", "Lasciare bollire o cuocere i cibi a lungo", "Cucinare con un po’ di vino", "Cereali: Avena, Riso, Riso basmati, Mais, Farro, Segale, Quinoa", "Legumi e noci: Fave, Ceci, Fagioli neri, Lenticchie, Piselli, Noci, Castagne, Nocciole, Semi di girasole, Pinoli, Arachidi", "Verdure: Carota, Patata, Zucca, Finocchio, Cipolla, Aglio, Porro, Cavolo (tranne quello cinese), Peperone", "Frutta: Ciliegia, Fichi, Litchi, Frutta cotta con spezie", "Carne e latticini: Manzo, Vitello, Pollo, Tacchino, Agnello, Capra, Cervo, Selvaggina", "Pesce: Trota, Acciuga, Anguilla, Cozze, Gamberetti", "Spezie: Anice, Anice stellato, Cumino, Cardamomo, Zenzero fresco o secco, Cannella, Rosmarino, Timo, Origano, Noce moscata, Chiodi di garofano, Ginepro, Coriandolo, Pepe, Peperoncino, Capperi, Rafano", "Bevande: Acqua calda, Tisane (rosmarino, timo, salvia, cumino, anice, cardamomo, zenzero). Caffè d’orzo"]}
          ],
          info: [
            "Stile di vita: Vestirsi bene tenendo l’addome al caldo, coprire i reni, le gambe ed i piedi. Evitare l’esposizione ad ambienti umidi e freddi. Eventualmente usare fonti di calore esterno da applicare alle zone più fredde (es:borsa dell’acqua calda, sale, noccioli di ciliegie, impacchi con lo zenzero). Muovere il Qi con : movimento fisico, Qi Gong, massaggi e assumendo spezie."
          ],
          appunti: ["Bu Zhong Yi Qi Tang: ottimo in caso di prolassi."]
        },
        {
          id: "milza-non-controlla-sangue",
          titolo: "Tai Yin – Milza che non controlla il Sangue",
          sotto: "Tai Yin · Milza-Pancreas",
          pag: "100-101",
          meridiani: ["milza"],
          test: [
            "ST 24 (Xuè) – · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme F 13 (Milza)."
          ],
          voci: [
            ["Origine", "La causa di questa sindrome è il Vuoto di Qi della Milza, che non riesce a nutrire il Sangue e si ha di conseguenza anemia, e trattenere il Sangue nei vasi e si hanno emorragie. Sono emorragie da Vuoto e non come quelle più comuni date da Calore o Pieno."],
            ["Principi di trattamento", "Tonificare il Qi della Milza, Trattenere il Sangue"],
            ["Muscoli", "Gran Dorsale, Trapezio Medio, Tricipite, Estensori Pollice-Mignolo"]
          ],
          tc: [
            "MP 1 — Controlla il Sangue",
            "V 17 — Controlla il Sangue",
            "MP 6 — Tonifica il Qi della Milza",
            "V 18 — Punto Shu del Fegato",
            "MP 10 — Azione diretta sul Sangue",
            "V 20 — Punto Shu della Milza",
            "ST 25 — Attiva il Qi Nutrizionale",
            "V 23 — Punto Shu del Rene",
            "ST 36 — Tonifica lo Stomaco",
            "VC 4 — Controlla il Sangue"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Zenzero", "Ferro", "Shilajit", "Gui Pi Tang", "Leptandra"], ["Dioscorea", "Acido Folico", "Gotukola", "Huang Tu Tang", "Phaseolus"], ["Scutellaria", "B Complex", "Terra Yin", "Angelica Sinensis", "Veratrum"], ["Achillea Millefolium", "Vit K", "Giallo Terra", "Astragalo", ""], ["Angelica Arcangelica", "", "", "Ginseng", ""], ["Biancospino", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Emorragie sotto- cutanee O del tratto gastrointestinale", "Porpora trombocitopenica", "Astenia", "Sangue nelle urine", "Sangue nelle feci", "Menorragia", "Metrorragia", "Emorroidi", "Anemia", "Gastroenterite", "Ernia iatale", "Enterocolite", "Reflusso gastroesofageo", "Ulcera gastroduodenale", "Esofagite", "Colite cronica", "Prolassi"]},
            {"titolo": "Sintomi", "items": ["Sensazione di pesantezza di tutti i visceri addominali", "Sensazione di confusione mentale", "Dissenteria, Dissenteria cronica", "Astenia fisica", "Voce debole", "Astenia psichica", "Deficit digestivo", "Astenia sessuale", "Dispnea", "Offuscamento visivo", "Aspetto emaciato", "Singhiozzo", "Volto Pallido-Giallastro", "Rigurgiti acido", "Oppressione epigastrica", "Scialorrea", "Miastenia", "Dolore lombare sordo", "Nausea mattutina", "Dolori mestruali", "Feci molli e diarrea liquida", "Edema", "Spasmi dell’esofago, gastrici, del piloro", "Emorragie croniche del tratto digestivo", "Distensione addominale postprandiale", "Insonnia", "Oliguria", "Pesantezza", "Disfagia", "Meteorismo", "Dispepsia", "Ipotermia alle estremità", "Vertigini", "Inappetenza, Anoressia"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti di natura fredda o troppo umidificanti (succhi di frutta, zucchero, dolcificanti e pane)", "Il sapore dolce eccessivo in generale", "Bollire le verdure e condire con spezie riscaldanti(timo, peperoncino, zenzero, curry)", "Evitare cibi crudi", "Evitare di mangiare velocemente, senza masticare, con ritmi irregolari (buffet), continuamente nell’arco della giornata", "Bere bevande fredde, soprattutto durante i pasti", "Alimenti denaturati, privi di Qi, industriali, riscaldati con microonde, confezionati"]},
            {"titolo": "Alimentazione consigliata", "items": ["Colazione cucinata, calda, ed in inverno anche cereali, legumi, carne", "Masticare bene e fermarsi prima di essere sazi", "Frutta, meglio se cotta, solo lontano dai pasti", "Piccole quantità di alimenti fermentati, dopo i pasti", "Una tazza di brodo o una tisana aromatica prima dei pasti", "Importanti i cereali, lasciarli in ammollo prima, macinarli, e poi cuocerli a lungo", "Senza carne ne pesce è molto difficile tonificare il Qi e lo Yang, meglio se sottoforma di brodo, bollito a lungo, spezzatini, carne macinata", "L’aromatico aiuta la milza nella trasformazione e nel portare verso l’alto", "Cereali: miglio, avena, riso, grano, grano saraceno, mais", "Legumi e noci: azuki, fave, ceci, lenticchie, piselli, latte di soia, noci nocciole, semi di girasole, arachidi", "Verdure: carote, patate, zucca, cavolo, funghi", "Frutta: datteri, ciliegie, fichi, frutta secca non oleosa", "Carne e latticini: manzo, vitello, pollo, agnello, capra, coniglio, ghee", "Pesce: trota, acciuga, aringa, persico, triglia, cefalo", "Spezie: anice, cumino, zenzero fresco, cardamomo, cannella, rosmarino, noce moscata, vaniglia, ginepro, coriandolo", "Bevande: Acqua calda, tisane aromatiche, (rosmarino, timo, salvia, anice, cardammomo, zenzero) acqua d’orzo"]}
          ],
          info: [
            "Stile di vita: attenzione con sauna e bagni caldi perché disperdono il calore che già manca. Lavorare con il corpo, sentirsi a proprio agio, la Milza ama il contatto fisico, i massaggi, gli stiramenti, ed il contatto con il pavimento. Movimento rilassato. Cercare di strutturare la vita quotidiana in modo regolare, con pasti regolari. Avere un luogo dove sentirsi a casa propria, non troppe avventure, una vita stabile e centrata. Una doccia fresca, il movimento all’aria aperta rinvigoriscono."
          ],
          appunti: [
            "Menorragia: flusso più lungo e più abbondante.",
            "Metrorragia: perdite di sangue al di fuori del ciclo."
          ]
        },
        {
          id: "freddo-umidita-milza",
          titolo: "Freddo-Umidità che invade il Tai Yin – Milza",
          sotto: "Tai Yin · Milza-Pancreas",
          pag: "102-103",
          meridiani: ["milza"],
          test: [
            "ST 24 (Xuè) + · R 19 (Yin) + · V 35 (Yang) O · R 13 (Qi) O",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): + + – – — + + – O — + O – –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme F 13 (Milza)."
          ],
          voci: [
            ["Origine", "Il deficit di Qi e Yang della Milza sono il terreno su cui può inserirsi una invasione di Umidità-Freddo dall’Esterno. Una condizione di Vuoto crea i presupposti per una Sindrome da Pieno. Questa sindrome è quindi una condizione da Pieno. Un eccesso di alimenti freddi o di natura fredda, o l’esposizione prolungata ad ambienti umidi possono indurre questa Sindrome."],
            ["Principi di trattamento", "Eliminare l’Umidità, Eliminare il Freddo, Rafforzare la Milza, Armonizzare lo Stomaco"],
            ["Muscoli", "Gran Dorsale, Trapezio Medio, Tricipite, Estensori Pollice-Mignolo"]
          ],
          tc: [
            "MP 3 — Tonifica la Milza",
            "ST 8 — Elimina l’Umidità dalla testa",
            "MP 6 — Dissolve l’Umidità",
            "ST 36 — Tonifica il Qi della Milza",
            "MP 9 — Elimina l’Umidità dal TR Inferiore",
            "V 20 — Tonifica il Qi della Milza",
            "VC 12 — Tonifica la Milza",
            "V 21 — Tonifica il Qi della Milza"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Zenzero", "Ferro", "Bacopa", "Wei Ling Tang", "Nux Vomica"], ["Ananas", "Enzimi", "Gotukola", "Tian Ma", "Leptandra"], ["Broccoli", "Vitamina B3", "", "Er Chen Tang", "Veratrum"], ["Terra Yin", "Potassio Citrato", "", "", ""], ["", "Sodio Citrato", "", "", ""], ["", "Acidophilus", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Gastrite acuta, cronica", "Enterite acuta, cronica", "Ritenzione urinaria", "Sindrome da deficit di assorbimento", "Colesterolo alto", "Edemi"]},
            {"titolo": "Sintomi", "items": ["Reazioni auto immuni delle mucose", "Gonfiore addominale", "Sapore dolciastro in bocca", "Nausea", "Assenza di gusto", "Labbra pallide", "Mancanza di appetito", "Assenza di sete", "Dolori addominali", "Sensazione di oppressione al petto", "Feci non formate ed acquose", "Stanchezza", "Sensazione di oppressione epigastrio", "Cefalea con sensazione di stordimento", "Sensazione di freddo all’epigastrio che migliora col calore", "Gastroenterite con componente batterica o micotica", "Sensazione di pesantezza alla testa", "Corpo pesante", "Anoressia", "Dissenteria, Dissenteria cronica", "Corpo edematoso", "Cattivo trofismo muscolare", "Oligoruia", "Leucorrea", "Reazioni allergiche", "Perdite vaginali biancastre", "Nevrosi ossessiva", "Disturbi assimilativi", "Mancato riconoscimento dei sapori e gusti", "Fermentazione alcalina", "Alterazioni della salivazione", "Depressione di tipo ossessivo", "Cefalea"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti di natura fredda o troppo umidificanti (succhi di frutta, zucchero dolcificanti e pane)", "Il sapore dolce eccessivo in genere", "Bollire le verdure e condirle con spezie riscaldanti (timo, peperoncino, zenzero, curry)", "Evitare cibi crudi", "Evitare di mangiare velocemente, senza masticare, con ritmi irregolari (buffet), continuamente nell’arco della giornata", "Bere bevande fredde, soprattutto durante i pasti", "Alimenti denaturati, privi di Qi, industriali, riscaldati con microonde, confezionati", "Bevande alcoliche, latticini, frutta e verdura fredde, fresche, o crude", "Le combinazioni di grasso/dolce (panna, cioccolato), o grasso/salato (salame, patatine fritte)"]},
            {"titolo": "Alimentazione consigliata", "items": ["Assumere cibi semplici fatti di pochi ingredienti", "Cucinare sempre utilizzando spezie aromatiche (piccanti, amare, drenanti e che riscaldano)", "Diuretici (soia rossa, cardamomo, funghi, mais, barba di mais)", "Arrostire i cereali", "Meglio il pesce della carne perché è più digeribile", "Cereali: orzo, grano saraceno, semi di lacrime di giobbe, segale, mais", "Legumi e noci: azuki, fave, piselli, lenticchie, soia gialla, soia nera", "Verdure: tutti i funghi, finocchi ed il resto solo cotto", "Carne: pollo, tacchino", "Pesce: tutti", "Spezie: aglio, zenzero, cardamomo, basilico, crescione, rucola, pepe, peperoncino, paprika, noce moscata, coriandolo", "Bevande: acqua calda, tisana con cardamomo, decotto di zenzero, barba di mais"]}
          ],
          info: ["Stile di vita: Evitare di esporsi al Freddo e agli ambienti Umidi."],
          appunti: ["Problematiche articolari (sindrome Bi): artrosi di anca e ginocchio."]
        },
        {
          id: "calore-umidita-milza",
          titolo: "Calore-Umidità che invade il Tai Yin – Milza",
          sotto: "Tai Yin · Milza-Pancreas",
          pag: "104-105",
          meridiani: ["milza"],
          test: [
            "ST 24 (Xuè) + · R 19 (Yin) O · V 35 (Yang) + · R 13 (Qi) –",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): O + – – — + + – O — + + – –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme F 13 (Milza)."
          ],
          voci: [
            ["Origine", "Come per l’Umidità-Freddo, la condizione predisponente è un Vuoto di Qi e di Yang di Milza e di Stomaco. In questo caso saranno il Calore e l’Umidità Esterne ad indurre questa Sindrome. Anche mangiare cibi contaminati o non integri possono causarla. A volte può essere causata da un eccesso di inibizione da parte del Calore dell’Elemento Legno (Fegato e VB), oppure un invasione da parte dell’Elemento Fuoco (Cuoree IT)."],
            ["Principi di trattamento", "Dissolvere l’Umidità, Purificare il Calore"],
            ["Muscoli", "Gran Dorsale, Trapezio Medio, Tricipite, Estensori Pollice-Mignolo"]
          ],
          tc: [
            "IC 11 — Purifica il calore e dissolve l’Umidità",
            "VB 34 — Elimina l’Umidità-Calore",
            "MP 6 — Dissolve l’Umidità",
            "ST 36 — Tonifica il Qi della Milza",
            "MP 9 — Elimina l’Umidità dal TR Inferiore",
            "V 20 — Tonifica il Qi della Milza",
            "VC 10 — Disperde il Calore e l’Umidità",
            "V 21 — Tonifica il Qi della Milza",
            "VC 12 — Tonifica la Milza",
            "VG 9 — Elimina l’Uminità-Calore"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Kuzu – Puerriae Radix", "Rame", "Terra Yang", "Yin Chen Hao Tang", "Nux Vomica"], ["Liquirizia", "", "Carciofo", "Er Chen Tang", "Phaseolus"], ["Desmodio", "", "Cardo Mariano", "He Ye Cha", ""], ["Schisandra", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Gastroenterite acuta", "Ittero", "Colecistiti acute", "Epatite acuta", "Calcoli biliari"]},
            {"titolo": "Sintomi", "items": ["Sensazione di pesantezza", "Confusione mentale", "Urine scarse e cariche", "Emorroidi", "Dolore addominale", "Nausea", "Tachicardie postprandiali", "Vomito", "Mancanza di appetito", "Gastroptosi", "Stipsi", "Febbre bassa e continua", "Anemia", "Necrosi epatica subacuta", "Feci non formate dal cattivo odore", "Cefalea dispeptica con ipercloridria gastrica", "Bruciore anale", "Cefalea", "Diarrea", "Colorito giallastro", "Stomatite", "Turbe della salivazione", "Palpitazioni extrasistole", "Ansia ossessiva"]},
            {"titolo": "Alimentazione da evitare", "items": ["Mangiare troppo, meglio fermarsi al 70%", "Alimenti pesanti, fritti, dolci, oleosi, latticini Alcool, superalcolici, liquori, cioccolata", "Spezie piccanti o alimenti che riscaldano troppo", "Alimenti arrostiti, grigliati, affumicati", "Alimenti crudi, freddi, difficili da digerire", "Farina bianca e derivati", "Zucchero", "Carne", "Caffè"]},
            {"titolo": "Alimentazione consigliata", "items": ["Prediligere alimenti non troppo nutrienti, riducendo i cereali ed aumentando verdure e proteine", "Alimenti drenanti", "Alimenti aromatici cucinati con spezie", "Un Po’ di piccante. alimenti amari (carciofo, asparagi, rafano…)", "Cereali: orzo, grano saraceno, amaranto, mais, riso, segale, miglio", "Legumi: soia rossa, soia verde, soia gialla e germogli", "Verdure: tarassaco, patata, zucca, cetriolo, sedano, carciofo, asparagi, funghi, rafano, ravanello, rucola, melanzana, cavolo, insalate a foglie amare", "Pesce: granchi, vongole", "Spezie: crescione, limone, tarassaco", "Bevande: decotto di bucce di agrumi, di tarassaco, di barba di mais. Acqua d’orzo, tè verde"]}
          ],
          info: ["Stile di vita: evitare le cause di umidità calore, esterne. Cura di riso, azuki e verdure cotte."]
        }
      ]
    },
    {
      id: "yang-ming-stomaco", titolo: "Yang Ming · Stomaco",
      intro: ["Le sindromi dello Stomaco (tabella di pag. 19).", "Punti dell'organo: allarme VC 12 · chiave TR 5 · yuan ST 42 · shu V 21 · xi ST 34."],
      schede: [
        {
          id: "vuoto-qi-stomaco",
          titolo: "Vuoto di Qi dello Yang Ming – Stomaco",
          sotto: "Yang Ming · Stomaco",
          pag: "106-107",
          meridiani: ["stomaco"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 12 (Stomaco)."
          ],
          voci: [
            ["Origine", "La causa principale è una disarmonia nella dieta: una dieta priva di sostanze nutritive o di proteine o seguendo un regime dietetico. Inoltre uno stato generale di Vuoto di Qi può colpire lo Stomaco, in genere dopo una malattia cronica o prolungata."],
            ["Principi di trattamento", "Tonificare il Qi dello Stomaco"],
            ["Muscoli", "Gran Pettorale Clavicolare, Elevatore Scapola, Brachioradiale, Estensori e Flessori del Collo"]
          ],
          tc: [
            "ST 25 — Attiva il Qi nutrizionale",
            "V 20 — Punto d’Allarme della Milza",
            "ST 36 — Tonifica Milza e Stomaco",
            "V 21 — Punto d’allarme dello Stomaco",
            "VC 12 — Punto d’Allarme di Stomaco",
            "ST 21 — Tonifica la Milza",
            "VC 4 — Tonifica lo Yang di M, il Sangue e lo Yin",
            "F 13 — Stimola Milza e Stomaco",
            "VC 6 — Tonifica il Qi in generale",
            "MP 9 — Tonifica M, nutre il Sangue e lo Yin",
            "MP 6 — Tonifica il Qi della milza"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Liquirizia", "B Complex", "Terra Yin", "Bu Zhong Yi Qi", "Nux Vomica"], ["Ginseng", "B12 B6", "Giallo Terra", "Liang Fu Cuan", "Argentum Nitricum"], ["Dioscorea", "Vit.e", "", "Er Chen Tang", "Iris Versicolor"], ["Melissa", "", "", "", ""], ["Angelica", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Astenia", "Astenia mattutina (7-9)", "Gastroenterite", "Ernia iatale", "Enterocolite", "Gastroduodenite", "Reflusso gastroesofageo", "Ulcera gastroduodenale", "Esofagite", "Colite cronica", "Prolassi"]},
            {"titolo": "Sintomi", "items": ["Secchezza delle fauci", "Inappetenza", "Secchezza linguale", "Anoressia", "Disagio all’epigastrio", "Nausea", "Algie gastriche", "Mancanza di appetito", "Vomito", "Feci non formate", "Sensazione di masse allo Stomaco", "Stipsi con feci secche", "Debolezza agli arti", "Anemia", "Oppressione epigastrica", "Singhiozzo", "Miastenia", "Rigurgiti acido", "Nausea mattutina", "Scialorrea", "Feci molli e diarrea liquida", "Dolore lombare sordo", "Mancanza di desiderio di parlare", "Spasmi dell’esofago, gastrici, del piloro", "Sensazione di pesantezza di tutti i visceri addominali", "Distensione addominale post prandiale", "Edema", "Aspetto emaciato", "Oliguria", "Pesantezza", "Disfagia", "Meteorismo", "Dispepsia"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti di natura fredda o troppo umidificanti (succhi di frutta, zucchero, dolcificanti e pane)", "Il sapore dolce eccessivo in generale", "Bollire le verdure e condire con spezie riscaldanti (timo, peperoncino, zenzero, curry)", "Evitare cibi crudi", "Evitare di mangiare velocemente, senza masticare, con ritmi irregolari (buffet), continuamentew nell’arco della giornata", "Bere bevande fredde soprattutto durante i pasti", "Alimenti denaturati, privi di Qi, industriali, riscaldati con microonde, confezionati"]},
            {"titolo": "Alimentazione consigliata", "items": ["Colazione cucinata, calda, ed in inverno anche cereali, legumi, carne", "Masticare bene e fermarsi prima di essere sazi", "Piatti semplici, solo una portata", "Piccole quantità di alimenti a fermentazione lattica (verdure fermentate, aceto di prugne)", "Molte minestre, vellutate e creme", "L’aromatico aiuta la milza nella trasformazione e nel portare verso l’alto", "Cereali: miglio, avena, riso, grano, grano saraceno, mais", "Legumi e noci: fave, ceci, piselli, latte di soia, tofu, castagne", "Verdure: carote, patate, zucca, cavolo, funghi, cipolla sedano", "Frutta: datteri, arance, mandarini, fichi", "Carne e latticini: manzo, pollo, tacchino, lepre, conigli, poco latte", "Pesce: trota, acciuga, aringa, persico, triglia, cefalo", "Spezie: anice, cumino, zenzero fresco, cardamomo, cannella, rosmarino, noce moscata, coriandolo", "Bevande: Acqua calda, tisane aromatiche, (rosmarino, timo, cumino finocchio maggiorana anice, cardammomo, zenzero). Acqua d’orzo. Tisana di liquirizia"]}
          ],
          info: [
            "Stile di vita: Mangiare con calma, in un clima sereno. Durante i pasti spegnere la tv, la radio, non leggere, non parlare di argomenti spiacevoli."
          ]
        },
        {
          id: "freddo-vuoto-stomaco",
          titolo: "Yang dello Stomaco freddo e vuoto",
          sotto: "Yang Ming · Stomaco",
          pag: "108-109",
          meridiani: ["stomaco"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) + · V 35 (Yang) – · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 12 (Stomaco)."
          ],
          voci: [
            ["Origine", "Sono numerose le possibili cause: può essere causata dall’eccessivo consumo di cibi di natura fredda o cruda, di bevande ghiacciate, di gelati, di frutta; oppure da una dieta povera e scarsa di proteine; oppure come vicariazione di una sindrome di Deficit di Yang di Milza e dello Stomaco; infine, può insorgere a causa di una invasione di Freddo dall’esterno."],
            ["Principi di trattamento", "Tonificare il Qi dello Stomaco, Tonificare il Qi della Milza, Riscaldare lo Stomaco"],
            ["Muscoli", "Gran Pettorale Clavicolare, Elevatore Scapola, Brachioradiale, Estensori e Flessori del Collo"]
          ],
          tc: [
            "VC 6 — Tonifica il Qi in generale",
            "V 20 — Tonifica il Qi della Milza",
            "VC 12 — Tonifica la Milza e lo Stomaco",
            "V 21 — Tonifica il Qi dello Stomaco",
            "ST 21 — Armonizza lo Stomaco",
            "MP 4 — Tonifica lo Stomaco",
            "ST 34 — Fa circolare il Qi",
            "MC 6 — Armonizza lo Stomaco",
            "ST 36 — Tonifica il Qi dello Stomaco"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Zenzero", "Enzimi", "Alfa Alfa (medicago sativa)", "Huang Qi Jian Zhong Tang", "Nux Vomica 2ch"], ["Gramigna (agropyron repens)", "Magnesio", "Terra Yin", "An Zhong San", "Argentum Nitricum 9ch"], ["Escolthia Californica", "Vit.B6 – B12", "", "Ban Xia Xie Xin", "Iris Versicolor 9ch"], ["", "Acido Folico", "", "", "Nitricum Acidum 7ch"]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Ulcera gastro duodenale", "Dolore sordo all’epigastrio che migliora dopo una pressione o un massaggio", "Dolore sordo all’epigastrio che peggiora dopo l’evacuazione", "Gastroduodenite", "Dolore sordo all’epigastrio che migliora dopo mangiato", "Mal assorbimento del ferro", "Spasmo gastrico da distonia neuro vegetativa", "Anemia", "Deficit enzimatico", "Gastrite, cronica", "Ipocloridria"]},
            {"titolo": "Sintomi", "items": ["Cefalea e senso di pesantezza", "Desiderio di cibi o bevande calde", "Feci non formate", "Dolore attenuato dal caldo", "Assenza di sete", "Vomito liquido e chiaro", "Astenia", "Borborigmi", "Arti freddi", "Mancanza di appetito", "Epigastralgia con spasmi", "Affezioni oculari", "Bocca amara", "Rigurgiti", "Inappetenza", "Alitosi", "Intolleranza al freddo", "Sensazione di freddo"]},
            {"titolo": "Alimentazione da evitare", "items": ["Tutti gli alimenti freschi come latticini, the", "Caffè con grande parsimonia", "Niente gelati, bevande o limenti presi direttamente dal frigorifero", "Poca frutta e verdura cruda", "Bollire a lungo i cereali integrali interi"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cucinare almeno tre volte al giorno", "Tostare i semi come noci, sesamo, semi di girasole", "Lasciare bollire o cuocere i cibi a lungo", "Cucinare con un po’ di vino", "Cereali: Avena, Riso, Riso basmati, Mais, Farro, Segale, Quinoa", "Legumi e noci: Fave, Ceci fagiolo nero, Lenticchie, Piselli, Noci, Castagne, Nocciole, Semi di girasole, Pinoli, Arachidi", "Verdure: Carota, Patata, Zucca, Finocchio, Cipolla, Aglio, Porro, Cavolo, Peperone", "Frutta: Ciliegia, Fichi, Litchi, Frutta cotta con spezie", "Carne e latticini: Manzo, Vitello, Pollo, Tacchino, Agnello, Capra, Cervo, Selvaggina", "Pesce: Trota, Acciuge, Anguilla, Cozze, Gamberetti", "Spezie: Anice, Anice stellato, Cumino, Cardamomo, Zenzero fresco o secco, Cannella, Rosmarino, Timo, Origano, Noce moscata, Chiodi di garofano, Ginepro, Coriandolo, Pepe, Peperoncino, Capperi, Rafano", "Bevande: Acqua calda, Tisane (Rosmarino, Timo, Salvia, Cumino, Anice, Cardamomo, Zenzero), Caffè d’orzo"]}
          ]
        },
        {
          id: "vuoto-yin-stomaco",
          titolo: "Vuoto dello Yin dello Yang Ming – Stomaco",
          sotto: "Yang Ming · Stomaco",
          pag: "110-111",
          meridiani: ["stomaco"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) – · V 35 (Yang) O · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 12 (Stomaco)."
          ],
          voci: [
            ["Origine", "L’origine di questa Sindrome può essere multeplice: come vicariazione di un prolungato Deficit di Qi dello Stomaco si può trasformare in Vuoto di Yin dello Stomaco; come vicariazione di un eccesso di Calore del Polmone, che indebolisce lo Yin di Stomaco; come vicariazione di un Vuoto di Yin di Rene; come fase di convalescenza di una malattia febbrile; come esito dell’attacco di una energia perversa esterna che lede lo Yin; come conseguenza di cattive abitudini alimentari, incluso il mangiare troppo tardi alla sera, saltare i pasti, fare delle pause pranzo brevi o frenetiche e con preoccupazioni, ma anche un consumo eccessivo di cibi piccanti."],
            ["Principi di trattamento", "Nutrire lo Yin dello Stomaco, Nutrire i Liquidi"],
            ["Muscoli", "Gran Pettorale Clavicolare, Elevatore Scapola, Brachioradiale, Estensori e Flessori del Collo"]
          ],
          tc: [
            "VC 12 — Tonifica la Milza e lo Stomaco",
            "ST 36 — Tonifica lo Yin dello Stomaco",
            "MP 3 — Nutre i Liquidi",
            "ST 44 — Purifica il Calore-Vuoto dello Stomaco",
            "MP 6 — Tonifica lo Yin dello Stomaco e nutre i Liquidi",
            "R 3 — Stimola lo Yin di Rene",
            "V 20 — Tonifica Milza e Stomaco",
            "MC 6 — Armonizza lo Stomaco",
            "V 21 — Tonifica Milza e Stomaco"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Silicio", "Betaina - Hcl", "Shatavari", "Yi Wei Tang", "Nux Vomica"], ["Kuzu – Puerariae Radix", "Magnesio Ossido", "Terra Yin", "Mai Men Dong Tang", "Kali Bicaromicum 7ch"], ["Ginseng", "Vit. B2- B6 -B12", "Giallo Terra", "Jan Pi Cuan", "Artemisia"], ["Althea Officinalis Achillea", "Enzimi", "", "", "Atropinum"]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Ulcera gastroduodenale", "Gastrite", "Esofagite", "Feci secche", "Secchezza delle fauci"]},
            {"titolo": "Sintomi", "items": ["Dolore retro sternale", "Sensazione di pienezza dopo mangiato", "Epigastralgia", "Febbre pomeridiana", "Sete e desiderio di bevande fredde", "Sensazione di calore al pomeriggio", "Gengivorragie", "Feci secche", "Calore alle estremita’", "Dolore all’epigastrio", "Odontalgia", "Cataratta", "Bocca e gola secche", "Cefalea frontale", "Glaucoma", "Trisma", "Stipsi", "Orzaiolo", "Epistassi", "Irritabilità", "Retinite", "Stomatite", "Afta buccale", "Irite", "Nausea e vomito liquido", "Ascesso periodontale", "Ozena", "Mancanza di appetito", "Secchezza linguale", "Nausea", "Dispepsia", "Rigurgiti acidi", "Vomito", "Gastralgia di origine nervosa"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti amari che drenano (te, caffè, azuki)", "Alimenti che riscaldano troppo (alcool in genere, carne di agnello, capra, manzo, pollo, tacchino, salumi, affumicati, formaggi stagionati, con muffa, spezie calde; Alimenti arrostiti, fritti, grigliati, essicati.Troppo sale. Evitare il troppo astringente, troppo freddo, troppo umidificante"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti che nutrono lo yin e creano liquidi", "Frutta e verdura meglio cotta o centrifugata", "Ottimi centrifugati di uva, pera", "Piccole quantità di cibi astringenti e acidi (yogurt, limone, ananas, arance, kiwi, ecc)", "Utilizzare metodi di cottura yin: in acqua, a vapore", "Bere tisane o anche acqua tiepida", "Zabaione, zucchero, malto", "Cereali: Miglio, Orzo, Riso, mais, grano", "Legumi e noci: Soia nera, Soia verde, tofu, Latte di soia, Tofù", "Verdure: Sedano, Cetrioli, Pomodoro, Cavoli, champignon, patata, spinaci, bietola", "Frutta: Pera, Uva,, Anguria, Arancia, Caco, Banane, Ananas", "Carne e latticini: Anatra, Coniglio, Latte, Burro, Panna, Yogurt", "Pesce: Frutti di mare, Calamari, Seppia, Polpo", "Spezie: Salvia, Crescione, Menta, Melissa, Limone, Ortica, Malto d’orzo, Kuzu", "Bevande: Tisane di frutta, Malva, Altea, Liquirizia con l’aggiunta di miele o melassa. Acqua d’orzo o di grano. Succo di Pere, Mele, Uva, Latte di Mandorle, Latte di Soia, Bicarbonato"]}
          ],
          info: [
            "Stile di vita: Importante mangiare con calma in un bell’ ambiente, lentamente e masticando molto bene. Riposare dopo mangiato. Non cenare tardi. Non fumare."
          ],
          appunti: ["Accanto a «Ozena»: rinite cronica atrofica."]
        },
        {
          id: "calore-stomaco",
          titolo: "Calore allo Yang Ming – Stomaco",
          sotto: "Yang Ming · Stomaco",
          pag: "112-113",
          meridiani: ["stomaco"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) + · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 12 (Stomaco)."
          ],
          voci: [
            ["Origine", "Può essere causata da numerosi fattori: da un eccesso di Yang di Stomaco; dall’attacco di Calore Esterno, che penetrando nel corpo si può trasformare in Fuoco; dal fumo di sigaretta o dal consumo eccessivo di cibi caldi e piccanti (Calore); dal consumo eccessivo di cibi caldi, fritti e dall’abuso di alcool (Flegma-Fuoco)."],
            ["Principi di trattamento", "Purificare il Calore dello Stomaco"],
            ["Muscoli", "Gran Pettorale Clavicolare, Elevatore Scapola, Brachioradiale, Estensori e Flessori del Collo"]
          ],
          tc: [
            "ST 21 — Purifica il Calore dello Stomaco",
            "MC 6 — Sottomette il Qi ribelle e calma lo Shen",
            "ST 25 — Purifica il Calore",
            "VC 12 — Purifica il Calore dello Stomaco",
            "ST 36 — Tonifica lo Yin dello Stomaco",
            "VC 13 — Sottomette il Qi ribelle dello Stomaco",
            "ST 44 — Purifica il Calore-Vuoto dello Stomaco",
            "MP 4 — Tonifica lo Stomaco e la Milza",
            "ST 45 — Purifica il Calore e calma lo Shen",
            "MP 6 — Nutre i Liquidi e calma lo Shen"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Liquirizia", "Manganese-Rame", "Terra Yang", "Qing Wei San", "Nux Vomica 9ch"], ["Althea Officinalis", "Zinco", "", "Tiao Wei Cheng Qi Tang", "Argentum Nitricum 9ch"], ["Biancospino", "L-Glutammina", "", "Ban Xia Hou Po Tan", ""], ["Escholtzia", "Acidophilus", "", "Huang Lian", ""], ["Emblica", "Basen Pulver", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Ulcera gastica", "Ulcera peptica", "Odontalgie", "Periodontite"]},
            {"titolo": "Sintomi", "items": ["Fame costante", "Insonnia", "Gengivite", "Depressione", "Gengivite gonfie", "Stipsi", "Gengive sanguinanti", "Stomatite", "Sete e desiderio di bevande fredde", "Alitosi con gusto amaro in bocca", "Dimagrimento nonostante una abbondante alimentazione", "Rigurgito acido", "Vomito subito dopo mangiato", "Bruciore gastrico", "Nausea", "Bruciore all’epigastrio"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti amari come caffè", "Alimenti che riscaldano troppo come carni di agnello, capra, manzo, pollo, tacchino, salumi affumicati, formaggi stagionati o con la muffa, alcol", "Alimenti arrostiti, fritti, grigliati", "Troppo sale"]},
            {"titolo": "Alimentazione consigliata", "items": ["Consumare molte minestre, brodi, umidi", "Frutta e verdura (meglio cotti o centrifugati), latticini, oli", "Scegliere metodi di cottura yin: cottura in acqua, cottura a vapore, eventualmente wok", "Tisane, succhi e centrifughe diluiti, acqua d’orzo", "Cereali: grano (integrale), germogli di grano, miglio, orzo, riso, mais", "Legumi e noci: soia verde, germogli di soia, tofu, latte di soia", "Verdure: cetriolo, pomodoro, olive, alghe (kombu, sargassi, wakame), sedano, patata, spinaci, bietola, insalata indivia, belga, cicoria, tarassaco", "Frutta: pera, uva, banana, pompelmo, limone, melone, anguria, kiwi Carne, latticini e uova: maiale, anatra, cavallo, coniglio, yogurt, latte, burro, panna, uovo di gallina Pesce, frutti di mare: calamaro, seppie, ostriche, polpo", "Erbe e spezie: crescione, kuzu (amido della radice di Pueraria), malva, altea, liquirizia, maggiorana, salvia", "Bevande: acqua d’orzo o di grano, tisane di frutta, tisane di erbe, latte di soia, latte di mandorla", "Condimenti: salsa di soia, olio d’oliva"]}
          ],
          info: [
            "Stile di vita: importantissimo mangiare con calma, lentamente, masticare bene, riposare dopo il pasto. non cenare troppo tardi",
            "Nella tabella di pag. 19 anche «Flegma-Fuoco» (+ O + O) rimanda a questa pagina."
          ]
        },
        {
          id: "freddo-invade-stomaco",
          titolo: "Freddo che invade lo Yang Ming – Stomaco",
          sotto: "Yang Ming · Stomaco",
          pag: "114-115",
          meridiani: ["stomaco"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) + · V 35 (Yang) O · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 12 (Stomaco)."
          ],
          voci: [
            ["Origine", "E’ causata dall’invasione del Freddo esterno, che ostruisce lo Stomaco ed impedisce al Qi di Stomaco di scendere. Il Freddo esterno consuma lo Yang dello Stomaco, ma anche della Milza, impedendo alle essenze dei cibi di diffondersi in tutto il corpo. Anche il consumo eccessivo di cibi di natura fredda, cruda e di bevande ghiacciate possono far penetrare il Freddo. Inoltre può essere l’esito di deficit congenito di Yang di Stomaco, o secondario ad un sovraffaticamento e malattie croniche."],
            ["Principi di trattamento", "Espellere il Freddo, Scaldare lo Stomaco, Stimolare la discesa del Qi dello Stomaco"],
            ["Muscoli", "Gran Pettorale Clavicolare, Elevatore Scapola, Brachioradiale, Estensori e Flessori del Collo"]
          ],
          tc: [
            "ST 21 — Espelle il Freddo dallo Stomaco",
            "MC 6 — Armonizza lo Stomaco",
            "ST 36 — Stimola lo Stomaco",
            "V 21 — Tonifica lo Stomaco",
            "ST 34 — Elimina le ostruzioni dello Stomaco",
            "VC 13 — Stimola la discesa del Qi dello St.",
            "MP 4 — Espelle il Vento e permette la discesa del Qi dello Stomaco",
            "VC 12 — Tonifica lo Stomaco, elimina il Freddo, riscalda lo Yang"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Angelica Arcangelica", "Betaina hcl", "Terra Yin", "Huang Qi Jian Zhong Tang", "Nux Vomica"], ["Zenzero", "Enzimi", "", "Gao Liang Wan", "Argentum Nitricum"], ["Escholtzia", "Magnesio", "", "Angelica Sinensis", ""], ["", "Vit.B3", "", "An Zhong San", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Ulcera gastroduodenale", "Gastrite cronica", "Nevrastenia", "Epatite cronica"]},
            {"titolo": "Sintomi", "items": ["Epigastralgia anche violenta con spasmi e gonfiori", "Dolore improvviso all’epigastrio", "Dolori alleviati con il caldo", "Intolleranza al freddo", "Ricerca del caldo", "Sensazione di freddo", "Ricerca di bevande calde", "Arti freddi", "Vomito subito dopo aver consumato bevande fredde", "Dolore all’epigastrio che peggiora dopo l’evacuazione", "Mancanza di appetito", "Rigurgiti di liquidi chiari", "Astenia", "Borborigmi", "Vomito di liquidi chiari", "Anemia", "Feci non ben formate"]},
            {"titolo": "Alimentazione da evitare", "items": ["Succhi di frutta, zucchero, dolcificanti artificiali, pane fresco, alimenti lievitati, alimenti molto grassi, alimenti fritti, latte e latticini (con moderazione)", "Troppi alimenti crudi", "Mangiare velocemente, senza masticare, con ritmi irregolari, tipo buffet, mangiare grandi quantità, mangiare continuamente, troppo pesante, troppo dolce, bere troppo durante i pasti (soprattutto cose fredde)", "Consumare alimenti refrigerati, no gelato! Bevande gassate", "Cibi secchi"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cucinare tre volte al giorno", "Cucinare la colazione e in inverno consumarla anche calda (zuppe di cereali, frutta…)", "Consumare solo una portata, piatti semplici", "Masticare bene! Aggiungere spezie per aiutare la digestione", "Consumare molte minestre, vellutate, creme, zappette", "Cereali: avena, riso a chicco tondo, farro, mais", "Legumi e noci: fave, fagiolo nero, castagna, nocciole", "Verdure: carota, patata, patata dolce, zucca, cavolo di Bruxelles, cavolo cappuccio, cavolo rapa, cavolo verza, funghi, cipolla, aglio, porro, cipollotto", "Frutta: dattero, fico", "Carne: manzo, pollo, tacchino, lepre, uovo di quaglia", "Pesce: carpa, trota, acciuga, aringa, persico, cefalo", "Erbe e spezie: anice, finocchio, zenzero fresco, cardamomo, rosmarino, cannella, noce moscata, coriandolO", "Bevande: acqua del rubinetto calda, tisane aromatiche (rosmarino, finocchio, anice, cardamomo, zenzero…)"]}
          ],
          info: [
            "Stile di vita: mangiare con calma in un clima sereno. Durante i pasti spegnere TV, radio, non leggere, ascoltare musica o parlare di argomenti spiacevoli."
          ]
        },
        {
          id: "stasi-sangue-stomaco",
          titolo: "Stasi di Sangue nello Yang Ming – Stomaco",
          sotto: "Yang Ming · Stomaco",
          pag: "116-117",
          meridiani: ["stomaco"],
          test: [
            "ST 24 (Xuè) + · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) –",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): + O O +",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 12 (Stomaco)."
          ],
          voci: [
            ["Origine", "In genere è la vicariazione di altri sindromi dello Stomaco (Fuoco, Stasi di Qi) o di altri organi (Stasi di Qi di Fegato). Può anche essere la conseguenza di una Stasi di Qi (in particolare del Fegato) che si è protratta molto nel tempo, in genere, a sua volta causata da problemi emozionali come collera, frustrazione, risentimento e depressione."],
            ["Principi di trattamento", "Mobilizzare la Stasi, Muovere il Sangue, Stimolare la discesa del Qi dello Stomaco"],
            ["Muscoli", "Gran Pettorale Clavicolare, Elevatore Scapola, Brachioradiale, Estensori e Flessori del Collo"]
          ],
          tc: [
            "MP 4 — Espelle il Vento e permette la discesa del Qi dello Stomaco",
            "VC 10 — Stimola la discesa del Qi",
            "MP 10 — Muove il Sangue",
            "VC 13 — Stimola la discesa del Qi dello Stomaco",
            "ST 21 — Rimuove le ostruzioni",
            "V 17 — Mobilizza il Sangue",
            "ST 34 — Elimina le ostruzioni dello Stomaco"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Desmodio", "B Complex", "Terra Yang", "Dhan Shen Yin", ""], ["Cardo Mariano", "", "", "Xue Fu Zhu Yu Tang", ""], ["Rafano", "", "", "", ""], ["Boldo", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Sintomi", "items": ["Dolore dopo mangiato", "Vomito di sangue scuro", "Dolore all’epigastrio che peggiora col calore o con la pressione", "Dolore trafittivo dell’epigastrio", "Sangue nelle feci"]}
          ]
        },
        {
          id: "stasi-cibo-stomaco",
          titolo: "Stasi di Cibo dello Yang Ming – Stomaco",
          sotto: "Yang Ming · Stomaco",
          pag: "118-119",
          meridiani: ["stomaco"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) + · V 35 (Yang) O · R 13 (Qi) +",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme VC 12 (Stomaco)."
          ],
          voci: [
            ["Origine", "E’ causata semplicemente dall’eccesso di cibo, soprattutto dal mangiare troppo tardi la sera e dal mangiare troppo in fretta o quando si è in uno stato di ansia o di agitazione. Anche il Freddo ed il Calore possono incidere in questa Sindrome."],
            ["Principi di trattamento", "Favorire la digestione dei cibi, Stimolare la discesa del Qi dello Stomaco"],
            ["Muscoli", "Gran Pettorale Clavicolare, Elevatore Scapola, Brachioradiale, Estensori e Flessori del Collo"]
          ],
          tc: [
            "ST 21 — Rimuove le ostruzioni",
            "MP 4 — Permette la discesa del Qi dello Stomaco",
            "ST 34 — Elimina le ostruzioni dello Stomaco",
            "MC 6 — Stimola la disecesa del Qi di Stomaco",
            "ST 44 — Elimina il cibo stagnante",
            "VC 10 — Stimola la discesa del Qi di Stomaco",
            "ST 45 — Elimina il Cibo stagnante",
            "VC 13 — Sottomette il Qi di Stomaco"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Zenzero", "Betaina hcl", "", "Bao He Wan", "Amara (Pascoe)"], ["Finocchio", "Enzimi", "", "Ban Xia Hou Po Tang", "Bismuthum"], ["Achillea", "", "", "Ban Xia Xie Xin", "Arsenicum Album"]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Dispepsia acuta", "Gastrite acuta", "Gastroenteriti acute", "Patologie influenzali con sintomatologia gastrica", "Indigestione"]},
            {"titolo": "Sintomi", "items": ["Pienezza e gonfiore dell’epigastrio alleviati dal vomito", "Vomito di materiale acido e nauseabondo, Vomito di materiale non digerito", "Ventre gonfio e doloroso", "Eruttazioni", "Insonnia", "Disgusto per i cibi", "Borborigmi", "Dissenteria di feci putride", "Mancanza di appetito", "Nausea", "Alitosi nauseabonda", "Rigurgiti acidi"]},
            {"titolo": "Alimentazione da evitare", "items": ["Succhi di frutta, zucchero, dolcificanti artificiali, pane fresco, alimenti lievitati, alimenti molto grassi, alimenti fritti, latte e latticini (con moderazione)", "Troppi alimenti crudi", "Mangiare velocemente, senza masticare, con ritmi irregolari, tipo buffet, mangiare grandi quantità, mangiare continuamente, troppo pesante, troppo dolce, bere troppo durante i pasti (soprattutto cose fredde)", "Consumare alimenti refrigerati, no gelato! Bevande gassate", "Cibi secchi"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cucinare tre volte al giorno", "Cucinare la colazione e in inverno consumarla anche calda (zuppe di cereali, frutta…)", "Consumare solo una portata, piatti semplici", "Masticare bene! Aggiungere spezie per aiutare la digestione", "Consumare molte minestre, vellutate, creme, zappette", "Cereali: miglio, avena, riso a chicco tondo, farro, grano saraceno, mais", "Legumi e noci: fave, ceci, piselli, tofu, castagna, nocciole, latte di soia", "Verdure: carota, patata, patata dolce, zucca, cavolo di Bruxelles, cavolfiore, cavolo cappuccio, cavolo cinese, cavolo rapa, cavolo verza, funghi, cipolla, sedano", "Frutta: dattero, arancio, mandarino, fico", "Carne e uova: manzo, pollo, tacchino, lepre, coniglio, uovo di quaglia PESCE, FRUTTI DI MARE: carpa, trota, aringa, acciuga, persico, cefalo", "Erbe e spezie: anice, finocchio, zenzero fresco, menta, maggiorana, origano, salvia, cardamomo, cannella, rosmarino, noce moscata, coriandolo, pepe", "Bevande: acqua del rubinetto calda, tisane di erbe, decotto di liquirizia"]}
          ],
          info: [
            "Stile di vita: mangiare con calma in un clima sereno. Durante i pasti spegnere TV, radio, non leggere, ascoltare musica o parlare di argomenti spiacevoli."
          ],
          appunti: ["Cibo che rimane sullo stomaco."]
        }
      ]
    },
    {
      id: "tai-yin-polmone", titolo: "Tai Yin · Polmone",
      intro: ["Le sindromi del Polmone (tabella di pag. 20).", "Punti dell'organo: allarme P 1 · chiave MP 4 · yuan P 9 · shu V 13 · xi P 6."],
      schede: [
        {
          id: "vuoto-qi-polmone",
          titolo: "Vuoto del Qi del Tai Yin – Polmone",
          sotto: "Tai Yin · Polmone",
          pag: "120-121",
          meridiani: ["polmone"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme P 1 (Polmone)."
          ],
          voci: [
            ["Origine", "Questa Sindrome può avere numerose origini: 1) causata da un attacco esterno di Vento-Freddo o Vento-Calore non curati correttamente, quindi rimanendo all’interno del corpo, questo Fattore Patogeno conduce ad un Vuoto di Qi del Polmone. Ciò avviene spesso quando si cura un banale raffreddore o influenza con gli antibiotici, che “intrappolano” il Freddo nel torace, interferendo con le funzioni del Polmone. 2) causata da una predisposizione ereditaria, soprattutto quando uno dei genitori ha contratto la tubercolosi polmonare. 3) causata da una postura che limita la respirazione, come ad esempio restare chinati troppo a lungo su una scrivania. 4) causata da un Deficit di Yang di Rene, che a livello del Polmone si trasforma in deficit di Qi, 5) causata da malattie debilitanti in genere ed in particolare le polmoniti, le broncopolmoniti o le pleuriti."],
            ["Principi di trattamento", "Tonificare il Qi di polmone"],
            ["Muscoli", "Gran dentato, Deltoide Medio, Coracobrachiale, Diaframma"]
          ],
          tc: [
            "P 1 — Punto d’Allarme di Polmone",
            "VC 6 — Tonifica il Qi",
            "P 7 + IC 4 — Tonifica il Qi di Polmone",
            "VC 17 — Azione sul TR Superiore",
            "P 9 — Tonifica il Qi di Polmone",
            "ST 36 — Tonifica il Qi dell’Elemento Terra (M e St), che è Madre del Metallo e perchè Milza è associato a Polmone nel Livello Tai Yin",
            "V 13 — Shu del dorso, tonifica il Qi di Polmone",
            "V 43 — Importante per le astenie",
            "VG 12 — Tonifica il Qi di Polmone",
            "IC 18 — Libera il Polmone"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Liquirizia", "N-Acetil Cisteina", "", "Si Jun Zi Tang", "Drosera"], ["Astragalo", "Vit.c", "", "Bu Fei Tang", "Kali Carbonicum"], ["Ginseng", "Beta Carotene", "Manganese- Rame", "Sheng Mai San", "Benzochinon"], ["Dioscora", "Zinco", "", "", ""], ["Achillea", "Rame", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Convalescenza da patologie febbrili", "Asma bronchiale", "Enfisema polmonare", "Influenze virali recidivanti"]},
            {"titolo": "Sintomi", "items": ["Tendenza a prendere spesso raffreddori", "Espettorato di muco abbondante e chiaro", "Tosse", "Espettorato acquoso", "Tosse debole", "Sudorazione spontanea", "Minzione difficile", "Muco", "Voce debole", "Avversione a parlare", "Pallore", "Faringite", "Affezioni respiratorie", "Asma", "Tonsillite", "Febbre", "Colorito pallido e biancastro", "Dispnea astenica", "Apatia", "Tendenza ad essere taciturni", "Dispnea da sforza anche lieve", "Astenia", "Depressione", "Ipounzionalità respiratoria", "Timore del freddo", "Tristezza"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti che indeboliscono il qi di milza", "Alimenti di natura fredda o troppo umidificanti, succhi di frutta, dolcificanti artificiali, zucchero", "Troppi alimenti crudi, yogurt, gelato, bevande fredde, troppi latticini"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cucinare con alimenti piccanti o con un po’ di alcol", "Una tazza di brodo, una tisana o acqua calda prima dei pasti", "Cereali: amaranto, riso integrale, avena, farro, mais", "Legumi e noci: azuki, fave, ceci, lenticchie, piselli, fagioli, noci, semi di girasole, arachidi (con secchezza)", "Verdure: carota, patata, zucca, tutti i tipi di cavolo, funghi, aglio, porro, cipolla, rafano, ravanello", "Frutta: uvetta", "Carne: manzo, pollo, coniglio, manzo", "Pesce: carpa, trota, acciuga, aringa", "Erbe e spezie: anice, cumino, zenzero fresco e secco, cardamomo, cannella, vaniglia, ginepro, coriandolo, timo, senape", "Bevande: acqua del rubinetto calda, tisane di erbe, bevande alcoliche"]}
          ],
          appunti: [
            "Sintomi di astenia, stanchezza e vuoto di Qi, perché il polmone è uno dei 2 produttori di Qi del corpo. Sintomi tipici del polmone.",
            "Trattabile con il nosode Tuberculinum, perché facilmente trovabile in chi ha nell'albero genealogico presenza di tubercolosi.",
            "Gli antibiotici vicariano o radicano il Freddo nel corpo."
          ]
        },
        {
          id: "deficit-yin-polmone",
          titolo: "Deficit dello Yin del Tai Yin – Polmone",
          sotto: "Tai Yin · Polmone",
          pag: "122-123",
          meridiani: ["polmone"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) – · V 35 (Yang) O · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme P 1 (Polmone)."
          ],
          voci: [
            ["Origine", "In genere è la vicariazione di un Vuoto di Qi del Polmone. Questa Sindrome si associa spesso ad un Vuoto di Yin di Stomaco e ad un Vuoto di Yin del Rene. Ciò è causato dall’eccessivo lavoro (R) e mangiare troppo tardi la sera (St). Infine questa Sindrome può essere generata da un Secco esterno. Questa Sindrome, spesso, si trasforma in Calore-Vuoto perché lo Yin non è più in grado di bilanciare lo Yang che sfugge."],
            ["Principi di trattamento", "Tonificare lo Yin di Polmone, Nutrire i Liquidi, Umidificare i Polmoni"],
            ["Muscoli", "Gran dentato, Deltoide Medio, Coracobrachiale, Diaframma"]
          ],
          tc: [
            "P 9 — Tonifica lo Yin del Polmone",
            "VC 12 — Nutre i Liquidi e stimola lo Stomaco",
            "VC 17 — Tonifica il Qi e lo Yin del Polmone",
            "MP 6 — Nutre i Liquidi",
            "V 13 — Tonifica il Qi e lo Yin del Polmone",
            "R 6 — Tonifica lo Yin di Rene e nutre i Liquidi",
            "VG 12 — Tonifica il Qi e lo Yin del Polmone",
            "IC 11 — ",
            "VC 4 — Tonifica lo Yin di Rene e nutre i Liquidi",
            "V 43 — Tonifica lo Yin del Polmone"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Ginseng", "Sodio", "Eucalipto", "Bai He Gu Jin Tang", "Aconitum"], ["Dioscorea", "Zinco", "Gemme di Pino", "Sheng Mai", "Bryonia"], ["Althea Officinalis", "Arginina", "Marrubio Bianco", "", "Drosera"], ["Astragalo", "B12", "Timo", "", "Cinnabaris"], ["Asmatica", "Bismuto", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Bronchite cronica", "Nevrastenia", "Faringo tracheite cronica", "Insufficienza cardiaca", "T.B.C polmonare", "Sindrome climaterica", "Tosse secca"]},
            {"titolo": "Sintomi", "items": ["Epistassi", "Stipsi", "Traspirazione notturna", "Oliguria", "Iperemia ed arrossamento del volto", "Faringodinia", "Emottisi", "Faringite", "Afonia", "Pelle secca", "Voce rauca", "Gola secca", "Depressione", "Bocca secca", "Tristezza", "Rinite"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti amari e che drenano come caffè, tè", "Alimenti diuretici come la soia rossa (azuki)", "Alimenti che riscaldano troppo come alcol in genere, carne di agnello, capra, manzo, pollo, tacchino, salumi affumicati, formaggi stagionati, spezie calde", "Troppo sale"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti che umidificano, nutrono lo yin, creano liquidi", "Alimenti che umidificano soprattutto se diretti al polmone come arachidi, mandorle, semi di girasole, latte, prugne umeboshi", "Eventualmente piccole quantità di alimenti freddi o che purificano il calore come limone, melone, banana", "Assumere regolarmente frutta e verdura, meglio cotti o centrifugati, ottimi gli sciroppi di uva, pera", "Assumere regolarmente piccole quantità di alimenti acidi o astringenti", "Scegliere metodi di cottura yin: in acqua, a vapore, fermentato, eventualmente wok, crudi de la digestione lo consente", "Con sete bere secondo la sete, in assenza di sete sforzarsi di bere!", "Cereali: grano integrale, germogli di grano, miglio, orzo, riso (non a chicco lungo)", "Legumi e noci: soia verde, germogli di soia, latte di soia, tofu, mandorle, sesamo, semi di girasole, arachidi, noci, pinoli", "Verdure: rapa, cavolo rapa, cavolfiore, avocado, champignon, asparago, sedano, patata", "Frutta: pera, uva, mela, melone, limone, mandarino, banane, fragola, datteri, umeboshi", "Carne e latticini: maiale, anatra, coniglio, latte, latte di mandorla, burro, panna, formaggi freschi, yogurt, uova", "Pesce: calamaro, seppia, polpo, ostriche", "Erbe e spezie: crescione, melissa, limone", "Bevande: acqua del rubinetto calda, tisane di erbe, tisane alla frutta, acqua d’orzo o di grano"]}
          ],
          info: [
            "Stile di vita: Dormire a sufficienza e curare la qualità del sonno; importante il sonno prima di mezzanotte. Evitare stress, fatica, superlavoro. Mangiare con calma. Evitare climi secchi. Non fumare. Umidificare l’aria."
          ],
          appunti: ["Bagno turco e suffumigi."]
        },
        {
          id: "secco-polmone",
          titolo: "Secco nel Tai Yin – Polmone",
          sotto: "Tai Yin · Polmone",
          pag: "124-125",
          meridiani: ["polmone"],
          test: [
            "ST 24 (Xuè) – · R 19 (Yin) – · V 35 (Yang) O · R 13 (Qi) O",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): O – + + — – – + O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme P 1 (Polmone)."
          ],
          voci: [
            ["Origine", "Sono numerose le possibili cause: 1) attacco da Secchezza esterna; 2) attacco da Vento-Calore o Vento-Freddo che ristagna nei Polmoni e si trasforma in Calore e prosciugano i Liquidi; 3) vacariazione di un Deficit di Yin di Stomaco; 4) Eccesso di Calore nello Stomaco e/o nell’Intestino Crasso; 5) eccessivo uso di lassativi; 6) permanenza in ambienti troppo caldi e secchi; 7) uso eccessivo di aria condizionata non umidificata."],
            ["Principi di trattamento", "Umidificare i Polmoni, Nutrire i Liquidi"],
            ["Muscoli", "Gran dentato, Deltoide Medio, Coracobrachiale, Diaframma"]
          ],
          tc: [
            "P 6 — Armonizza il Qi di Polmone",
            "R 7 — Nutre lo Yin e abbassa il Fuoco",
            "P 9 — Umidifica i Polmini",
            "VC 4 — Tonifica lo Yin di Rene e nutre i Liquidi",
            "P 10 — Disperde il Calore",
            "V 13 — Tonifica il Qi di Polmone",
            "R 3 — Tonifica lo Yin ed il Qi di Rene",
            "VC 12 — Tonifica lo Stomaco e nutre i Liquidi",
            "R 6 — Nutre i Liquidi",
            "MP 6 — Nutre i Liquidi"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Echinacea", "Rame", "Timo", "Qing Zao Jiu Fei Tang", "Kalium Chloratum"], ["Eucalipto", "Selenio", "", "Sheng Mai San", "Cinnabaris"], ["Poliyala", "Zinco", "", "Gui Zhi uan", "Benzochinon"], ["Radice Nera", "", "", "Cang Er Zi San", "Drosera"], ["Asmatica", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Sindrome influenzale", "Tracheo bronchite", "Sinusite acuta", "Rinite allergica", "Tonsillite acuta", "Malattie respiratorie"]},
            {"titolo": "Sintomi", "items": ["Traspirazione abbondante", "Avversione al freddo", "Dispnea", "Febbricola", "Ostruzione nasale", "Faringodinia", "Stipsi", "Tosse secca", "Sete", "Tosse asmatiforme", "Difficoltà di espettorazione", "Pelle Secca", "Afonia", "Avversione al Vento o Freddo", "Bocca Secca", "Voce rauca", "Tristezza", "Muco spesso e secco", "Oliguria con urine rossastre", "Depressione", "Naso secco", "Rinorrea con liquido chiaro e starnuti", "Dolore vertebrale cervico- dorsale", "Dolore toracico durante gli attacchi di tosse", "Prurito faringeo", "Brividi"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti amari e che drenano come caffè, tè", "Alimenti diuretici come la soia rossa (azuki)", "Alimenti che riscaldano troppo come alcol in genere, carne di agnello, capra, manzo, pollo, tacchino, salumi affumicati, formaggi stagionati, spezie calde", "Troppo sale"]},
            {"titolo": "Alimentazione consigliata", "items": ["Alimenti che umidificano, nutrono lo yin, creano liquidi", "Alimenti che umidificano soprattutto se diretti al polmone come arachidi, mandorle, semi di girasole, latte", "Eventualmente piccole quantità di alimenti freddi o che purificano il calore come limone, melone, banana", "Assumere regolarmente frutta e verdura, meglio cotti o centrifugati, ottimi gli sciroppi di uva, pera", "Assumere regolarmente piccole quantità di alimenti acidi o astringenti", "Scegliere metodi di cottura yin: in acqua, a vapore, fermentato, eventualmente wok, crudi de la digestione lo consente", "Non sete bere secondo la sete, in assenza di sete sforzarsi di bere!", "Cereali: grano integrale, germogli di grano, miglio, orzo, riso (non a chicco lungo)", "Legumi e noci: soia verde, germogli di soia, latte di soia, tofu, mandorle, sesamo, semi di girasole, semi di lino, arachidi, noci, pinoli, pistacchi", "Verdure: rapa, cavolo rapa, cavolfiore, avocado, cappuccio, verza, sedano", "Frutta: pera, melone, mandarino, banana, fragola, datteri, umeboshi, fichi, ananas, pompelmo, arancia, albicocca", "Carne: maiale, anatra, coniglio, latte, latte di mandorla, burro, panna, formaggi freschi, yogurt, uova", "Pesce: calamaro, seppia, polpo, ostriche", "Erbe e spezie: Crescione, limone", "Bevande: acqua del rubinetto calda, tisane di erbe, succo di pera", "Olii: olio di semi di girasole, olio di sesamo, olio d’oliva, olio di germe di grano, olio di enotera, olio di lino", "Dolci: miele, zucchero, malto"]}
          ],
          info: [
            "Stile di vita: Dormire a sufficienza e curare la qualità del sonno; importante il sonno prima di mezzanotte. Evitare stress, fatica, superlavoro. Mangiare con calma. Evitare climi secchi. Non fumare. Umidificare l’aria"
          ]
        },
        {
          id: "vento-freddo-polmone",
          titolo: "Vento-Freddo di Tai Yin – Polmone",
          sotto: "Tai Yin · Polmone",
          pag: "126-127",
          meridiani: ["polmone"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) + · V 35 (Yang) O · R 13 (Qi) +",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme P 1 (Polmone)."
          ],
          voci: [
            ["Origine", "E’ un attacco esterno di Vento e Freddo, predisposto da una deficit di Qi della persona. E’ una Sindrome da eccesso, ma che nasce da un deficit, per cui bisogna anche rinforzare il Qi."],
            ["Principi di trattamento", "Disperdere il Vento, Disperdere il Freddo, Diffondere il Qi Polmonare"],
            ["Muscoli", "Gran dentato, Deltoide Medio, Coracobrachiale, Diaframma"]
          ],
          tc: [
            "IC 4 + P 7 — Diffondono il Qi di Polmone",
            "VG 14 — Disperde il Freddo",
            "TR 5 — Punto chiave del Yangwei e si chiama “Barriera Esterna”",
            "VB 20 — Disperde il Vento ed il Freddo dalla regione cervico-occipitale",
            "P 5 — Sblocca il Qi di Polmone",
            "IT 15 — Agisce sull’energia toracica e polmonare",
            "P 9 — Regola il Qi di Polmone",
            "V 60 — Apporta calore",
            "V 12 — Agisce sull’energia toracica e polmonare",
            "IC 20 — Elimina il Vento e libera il naso",
            "V 13 — Tonifica il Qi di Polmone",
            "IC 11 — Disperde il Vento ed elimina il Freddo",
            "VC 17 — Apre il petto, purifica il Polmone"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Echinacea", "Rame", "Ribes Nigrum", "Xing Su San", "Dulcamara"], ["Marrubio Bianco", "Manganese-Rame", "Pino Silvestre", "Yin Qiao San", "Kalium Chloratum"], ["Asmatica", "Zinco", "", "Chung Xiong Cha Xiao", "Benzochinon"], ["Piantaggine", "Vit.c", "", "Xin Yi Wan", ""], ["Timo", "Selenio", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Malattie respiratorie acute", "Sinusite acuta", "Sindrome influenzale", "Rinite allergica", "Tracheo bronchite", "Tonsillite acuta"]},
            {"titolo": "Sintomi", "items": ["Rinorrea con liquido chiaro e starnuti", "Traspirazione abbondante, se prevale il Vento", "Traspirazione assente, se prevale il Freddo", "Avvesione al freddo", "Dispnea", "Febbricola", "Dolore vertebrale cervicodorsale", "Faringodinia", "Cefalea frontale e occipitale", "Ostruzione nasale", "Tosse", "Brividi", "Afonia, Voce rauca", "Edema", "Minzione difficoltosa", "Prurito faringeo"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti freddi e/o che creano umidità (latticini, zuccheri…)", "Alimenti troppo tonificanti come cereali, brodo di carne, uova"]},
            {"titolo": "Alimentazione consigliata", "items": ["Assumere alimenti piccanti, che riscaldano", "Cereali: fiocchi d’avena, riso, farro", "Verdure: carota, finocchio, cipolla, porro, cipollotto, aglio, rafano, kren", "Carne: manzo, agnello, capra, cervo, selvaggina in generale, (tutti preferibilmente cucinati con spezie)", "Erbe e spezie: zenzero fresco, peperoncino, pepe, cannella", "Bevande: decotto di zenzero e aglio, piccole quantità di superalcolici, vin brulè, decotto di zenzero fresco"]}
          ],
          info: [
            "Stile di vita: Sono consigliati bagni caldi e saune. Quando si suda fare attenzione a non esporsi a freddo e a correnti d’aria."
          ],
          appunti: ["L'attacco di Vento-Freddo è sempre esterno; il Freddo può anche essere interno."]
        },
        {
          id: "vento-calore-polmone",
          titolo: "Vento-Calore che aggredisce il Tai Yin – Polmone",
          sotto: "Tai Yin · Polmone",
          pag: "128-129",
          meridiani: ["polmone"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) + · R 13 (Qi) +",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): – – + +",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme P 1 (Polmone)."
          ],
          voci: [
            ["Origine", "Il corpo viene attaccato dal Vento e dal Calore Esterni. Spesso può essere legata al fumo di tabacco, poiché fumare produce Calore e Secchezza. Le fonti del Vento e del Calore possono essere ambientali, ma anche artificiali, come nel caso del riscaldamento centralizzato delle case o lavorare in ambienti molto caldi e secchi, come nel caso di acciaierie o nelle cucine (cuochi/pizzaioli)."],
            ["Principi di trattamento", "Disperdere il Vento, Liberare l’esterno, Purificare il Polmonare"],
            ["Muscoli", "Gran dentato, Deltoide Medio, Coracobrachiale, Diaframma"]
          ],
          tc: [
            "IC 4 — Disperde il Calore",
            "VG 14 — Disperde il Calore",
            "IC 11 — Disperde il Calore",
            "VB 20 — Disperde il Vento",
            "P 5 — Disperde il Polmone",
            "VC 22 — Facilita la ventilazione polmonare",
            "V 12 — Disperde il Vento",
            "TR 5 — Punto chiave del Yangwei che si chiama “Barriera Esterna”",
            "V 13 — Tonifica il Qi di Polmone"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Eucalipto", "Rame", "Gemme di Pino", "Sang Su Yin", "Cinnabaris"], ["Marrubio", "Manganese-Rame", "Ribes Nigrum", "Pang Da Hai Cha", "Kalium Chloratum"], ["Propoli", "B6", "", "Xie Bai San", "Benzochinon"], ["Timo", "Ornitina", "", "", ""], ["Poligala", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Faringite", "Rinite allergica", "Laringite", "Ascessi polmonari", "Tracheiti acute", "Flogosi acuta delle prime vie respiratorie", "Sinusite acuta", "Tonsillite acuta", "Rino-sinusiti acute", "Bronchiti acute", "Broncopolmoniti"]},
            {"titolo": "Sintomi", "items": ["Faringodinia", "Dispnea", "Secchezza della mucosa nasale", "Brividi", "Sete", "Bocca secca", "Ostruzione nasale", "Gola secca", "Avvesione al freddo", "Respiro asmatiforme", "Epistassi", "Espettorato giallo e vischioso", "Tosse", "Stipsi", "Avversione al vento", "Oliguria con urine cariche"]},
            {"titolo": "Alimentazione da evitare", "items": ["Alimenti troppo caldi che seccano (spezie calde, caffè, cacao, cipolla, aglio, peperone rosso, cervo…)", "Alimenti troppo tonificanti come cereali, brodo di carne, uova", "Alimenti pesanti e difficili da digerire"]},
            {"titolo": "Alimentazione consigliata", "items": ["Assumere erbe piccanti e fresche come achillea, menta, fiori di sambuco, tiglio", "Cereali: orzo, riso, miglio, germogli di grano", "Legumi: germogli di soia", "Verdure: carota, sedano, pomodori, cetrioli cotti, funghi, ravanello, crescione", "Frutta: pere, melone, mele", "Erbe e spezie: achillea, menta, fiori di sambuco, tiglio, verbena, salvia, maggiorana"]}
          ]
        },
        {
          id: "vento-acqua-polmone",
          titolo: "Vento-Acqua che invade il Tai Yin – Polmone",
          sotto: "Tai Yin · Polmone",
          pag: "130-131",
          meridiani: ["polmone"],
          test: [
            "ST 24 (Xuè) + · R 19 (Yin) O · V 35 (Yang) O · R 13 (Qi) +",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): + + O +",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme P 1 (Polmone)."
          ],
          voci: [
            ["Origine", "E’ determinata dall’esposizione del Vento-Freddo e all’Umidità. Differisce dalla Sindrome di Vento-Freddo del Polmone per la compromissione della funzione del Polmone di indirizzare i Liquidi verso il basso. Come conseguenza si hanno gli edemi. Questa condizione coinvolge anche il Livello Tai Yang che si occupa anch’esso, tramite le funzioni di Vescica, della discesa dei fluidi."],
            ["Principi di trattamento", "Disperdere il Freddo, Liberare l’esterno, Eliminare l’Umidità"],
            ["Muscoli", "Gran dentato, Deltoide Medio, Coracobrachiale, Diaframma"]
          ],
          tc: [
            "IC 4 — Libera l’esterno ed apre i passaggi dell’Acqua",
            "V 12 — Libera l’esterno e stimola la discesa del Qi di Polmone",
            "IC 6 — Apre i passaggi dell’Acqua del Polmone",
            "V 13 — Libera l’esterno e stimola la discesa del Qi di Polmone",
            "IC 7 — Tratta le condizioni acute",
            "V 28 — Shu di Vescica apre i passaggi dell’Acqua",
            "VC 9 — Apre i passaggi dell’Acqua e dissolve l’edema",
            "P 7 — Libera l’Esterno, Stimola la discesa del Polmone, Apre i passaggi dell’Acqua"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Solidago", "Selenio", "", "Wu Ling San", "Lymdiaral"], ["Ortosiphon", "Molibdeno", "", "", "Benzochinon"], ["Betulla", "Co Q10", "", "", "Natrum Sulfuricum 15ch"], ["Zea Mais", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Edema del viso", "Edema palpebrale"]},
            {"titolo": "Sintomi", "items": ["Gonfiore degli occhi e del viso che si estende gradualmente al corpo", "Sensazione di gonfiore diffuso", "Avversione al Vento e al Freddo", "Tosse", "Dispnea", "Urine scarse e pallide", "Minzione scarsa e difficile", "Febbre", "Colorito pallido e biancastro"]},
            {"titolo": "Alimentazione da evitare", "items": ["Succhi di frutta, zucchero, dolcificanti artificiali, pane fresco, alimenti lievitati, alimenti molto grassi, alimenti fritti, latte e latticini (con moderazione)", "Troppi alimenti crudi", "Mangiare velocemente, senza masticare, con ritmi irregolari, tipo buffet, mangiare grandi quantità, mangiare continuamente, troppo pesante, troppo dolce, bere troppo durante i pasti (soprattutto cose fredde)", "Consumare alimenti refrigerati, no gelato!"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cucinare tre volte al giorno", "Cucinare la colazione e in inverno consumarla anche calda (zuppe di cereali, frutta…)", "Importantissimo masticare bene e fermarsi di mangiare prima di essere pieni", "Consumare la frutta lontano dai pasti e in inverno è consigliato consumarla cotta", "Consumare una tazza di brodo o un bicchiere di acqua calda prima dei pasti", "Consumare carne e pesce", "La carne soprattutto sotto forma di brodo bollito a lungo, spezzatino oppure carne macinata", "Non bere troppo durante il pasto, meglio acqua tiepida", "Cereali: miglio, avena, riso, farro, grano, grano saraceno, mais", "Legumi e noci: soia rossa, fave, ceci, lenticchie, piselli, nocciole, noci, semi di girasole, arachidi, latte di soia", "Verdure: carota, patata, patata dolce, zucca, cavolo di Bruxelles, cavolfiore, cavolo cappuccio, cavolo cinese, cavolo rapa, cavolo verza, funghi", "Frutta: dattero, ciliegia, fico, frutta secca non oleosa", "Carne e latticini: manzo, vitello, pollo, tacchino, agnello, capra, coniglio, uova di quaglia, ghee", "Pesce: carpa, trota, acciuga, aringa, persico, triglia, cefalo", "Erbe e spezie: anice, cumino, zenzero fresco, cardamomo, rosmarino, vaniglia, ginepro, coriandolo, scorza d’agrumi", "Bevande: acqua del rubinetto calda, tisane aromatiche (rosmarino, timo, salvia, cumino, anice, cardamomo, zenzero…) acqua d’orzo"]}
          ],
          info: [
            "Stile di vita: Attenzione con saune e bagni caldi. Sono consigliati massaggi e stiramenti e movimenti rilassati. Cercare di strutturare la vita in modo regolare consumando pasti regolari."
          ],
          appunti: ["Può bloccare il polmone con un edema che si pone nella parte alta del corpo (viso)."]
        },
        {
          id: "flegma-calore-polmone",
          titolo: "Flegma-Calore che ostruiscono il Tai Yin – Polmone",
          sotto: "Tai Yin · Polmone",
          pag: "132-133",
          meridiani: ["polmone"],
          test: [
            "ST 24 (Xuè) + · R 19 (Yin) O · V 35 (Yang) + · R 13 (Qi) O",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): + O + – — + – + –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme P 1 (Polmone)."
          ],
          voci: [
            ["Origine", "Le origini sono sia di carattere Interno che Esterno. I fattori Interni sono causati da un Deficit di Qi di Milza e di Polmone, a volte peggiorato dal Deficit di Yin, che libera Calore e surriscalda i Catarri (Tan). I fattori Esterni sono il Vento, il Calore e l’Umidità. Il Vento-Calore si approfondisce ed indebolisce la funzione dei Polmoni di diffondere i Liquidi, da causare una stasi di Yinye (i Liquidi), che si trasforma nella produzione di Catarri Calore-Umidità. Anche l’alimentazione può essere una causa, sia aggravante sia scatenante. L’uso eccessivo di cibi caldi (carne grigliata, alcool, speziati e piccanti) e grassi, ltre che il fumo di tabacco generano Umidità- Calore nel TR Medio, che poi si trasmette al TR Superiore."],
            ["Principi di trattamento", "Disperdere il Freddo, Liberare l’esterno, Eliminare l’Umidità"],
            ["Muscoli", "Gran dentato, Deltoide Medio, Coracobrachiale, Diaframma"]
          ],
          tc: [
            "P 1 — Ripristina la discesa del Polmone",
            "IC 1 — Disperde il Calore",
            "P 5 — Purifica il Calore",
            "IC 4 — Disperde il Calore",
            "P 7 — Ripristina la discesa del Polmone",
            "IC 11 — Disperde il Calore",
            "P 10 — Purifica il Calore",
            "ST 36 — Trasforma l’Umidità",
            "P 11 — Purifica il Calore",
            "VG 14 — Disperde il Calore",
            "V 13 — Purifica il Calore",
            "VC 12 — Trasforma l’Umidità",
            "ST 40 — Trasforma l’Umidità",
            "VC 22 — Tratta la dispnea e l’asma"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Efedra", "Beta Carotene", "", "Ma Xing Gan Tang", "Benzochinon"], ["Astragalo", "Vit.C", "", "Wei Jing Tang", "Aconitum"], ["Uncaria", "Co Q10", "", "Xian Xiong Tang", "Bryonia"], ["Echinacea", "Olio Fegato di Merluzzo", "", "Bei Mu Xing Ren Cha", ""], ["Eucalipto", "", "", "Xie Bai San", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Patologie respiratorie infiammatorie", "Tracheiti", "Bronchiti"]},
            {"titolo": "Sintomi", "items": ["Tosse abbaiante con espettorato abbondante e muco-purulento", "Espettorato maleodorante e tinto di verde", "Oppressione toracica", "Tosse secca", "Dispnea", "Sensazione di oppressione al petto", "Asma"]},
            {"titolo": "Alimentazione da evitare", "items": ["Succhi di frutta, zucchero, dolcificanti artificiali, pane fresco, alimenti lievitati, alimenti molto grassi, alimenti fritti, latte e latticini (con moderazione)", "Troppi alimenti crudi", "Mangiare velocemente, senza masticare, con ritmi irregolari, tipo buffet, mangiare grandi quantità, mangiare continuamente, troppo pesante, troppo dolce, bere troppo durante i pasti (soprattutto cose fredde)", "Consumare alimenti refrigerati, no gelato!"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cucinare tre volte al giorno", "Cucinare la colazione e in inverno consumarla anche calda (zuppe di cereali, frutta…)", "Importantissimo masticare bene e fermarsi di mangiare prima di essere pieni", "Consumare la frutta lontano dai pasti e in inverno è consigliato consumarla cotta", "Consumare una tazza di brodo o un bicchiere di acqua calda prima dei pasti", "Consumare carne e pesce", "La carne soprattutto sotto forma di brodo bollito a lungo, spezzatino oppure carne macinata - non bere troppo durante il pasto, meglio acqua tiepida", "Cereali: miglio, avena, riso, farro, grano, grano saraceno, mais", "Legumi e noci: soia rossa, fave, ceci, lenticchie, piselli, nocciole, arachidi, latte di soia", "Verdure: carota, patata, patata dolce, cavolo di Bruxelles, cavolfiore, cavolo cappuccio, cavolo cinese, cavolo rapa, cavolo verza, funghi", "Frutta: fico", "Carne e latticini: vitello, pollo, tacchino, agnello, capra, coniglio, uova di quaglia, ghee", "Pesce: carpa, trota, aringa, persico, triglia, cefalo", "Erbe e spezie: zenzero fresco, maggiorana, menta, salvia, origano, vaniglia, coriandolo, scorza d’agrumi", "Bevande: acqua del rubinetto calda, tisane aromatiche, acqua d’orzo"]}
          ],
          info: [
            "Stile di vita: Attenzione con saune e bagni caldi. Sono consigliati massaggi e stiramenti e movimenti rilassati. Cercare di strutturare la vita in modo regolare consumando pasti regolari."
          ]
        },
        {
          id: "flegma-umidita-polmone",
          titolo: "Flegma-Umidità che ostruisce il Tai Yin – Polmone",
          sotto: "Tai Yin · Polmone",
          pag: "134-135",
          meridiani: ["polmone"],
          test: [
            "ST 24 (Xuè) + · R 19 (Yin) + · V 35 (Yang) O · R 13 (Qi) –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme P 1 (Polmone)."
          ],
          voci: [
            ["Origine", "La causa principale è il Deficit di Qi e Yang della Milza e di Qi del Polmone, che può essere costituzionale o acquisita. La Milza non trasporta e trasforma il Qi ed i Liquidi. Il risultato è una stasi di Liquidi, che, privi della “spinta” della Milza, si trasformano in Flegma e si accumulano nel Polmone. Inoltre, il Deficit di Qi di Polmone fa si che il Polmone non adempi il suo compito di diffondere e distribuire il Qi ed i Liquidi. Anche i fattori Esterni che ledono le funzioni della Milza e del Polmone possono scatenare questa sindrome. Infine anche l’abuso di cibi grassi, fritti, crudi e freddi possono esserne la causa."],
            ["Principi di trattamento", "Trasformare il Flegma, Eliminare l’Umidità, Drenare il Polmone"],
            ["Muscoli", "Gran dentato, Deltoide Medio, Coracobrachiale, Diaframma"]
          ],
          tc: [
            "P 1 — Ripristina la discesa del Polmone",
            "V 20 — Elimina l’Umidità",
            "P 7 — Ripristina la discesa del Polmone",
            "ST 36 — Trasforma l’Umidità",
            "P 9 — Tonifica il Qi di Polmone",
            "VC 9 — Elimina l’Umidità",
            "P 10 — Purifica il Calore",
            "VC 12 — Trasforma l’Umidità",
            "P 11 — Purifica il Calore",
            "VC 17 — Tonifica il Qi di Polmone",
            "V 13 — Tonifica il Qi di Polmone",
            "VC 22 — Tonifica il Qi di Polmone",
            "ST 40 — Trasforma l’Umidità"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Efedra", "Rame", "", "Er Chen Tang", "Calcarea Carbonica 30 CH"], ["Asmatica", "N-Acetil Cisteina", "", "Bei Mu Xing Ren Cha", "Thuya 30 CH"], ["Escholtzia", "Vit.C", "", "", "Kalium Cloratum"], ["Piantaggine", "", "", "", "Benzochinon"], ["Radice Nera", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Enfisema", "Asma", "Bronchiti", "Bronchiti asmatiche", "Tracheiti croniche", "Tosse"]},
            {"titolo": "Sintomi", "items": ["Tosse con espettorato di muco abbondante", "Ostruzione nasale", "Irritazione della gola", "Delirio", "Oppressione toracica", "Convulsioni", "Senso di ostruzione", "Tristezza", "Catarro nella trachea", "Depressione", "Catarro nei bronchi", "Dispnea", "Tosse secca", "Disagio a restare supini", "Edemi", "Carnagione bianca e pallida"]}
          ]
        }
      ]
    },
    {
      id: "yang-ming-ic", titolo: "Yang Ming · Intestino Crasso",
      intro: ["Le sindromi dell'Intestino Crasso (tabella di pag. 21).", "Punti dell'organo: allarme ST 25 · chiave TR 5 · yuan IC 4 · shu V 25 · xi IC 7."],
      schede: [
        {
          id: "umidita-calore-ic",
          titolo: "Umidità-Calore dello Yang Ming – Intestino Crasso",
          sotto: "Yang Ming · Intestino Crasso",
          pag: "136-137",
          meridiani: ["intestino-crasso"],
          test: [
            "ST 24 (Xuè) + · R 19 (Yin) O · V 35 (Yang) + · R 13 (Qi) –",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): O + – – — + + – O — + + – –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme ST 25 (Intestino Crasso)."
          ],
          voci: [
            ["Origine", "Può esseri di origine alimentare o di origine emozionale. Il consumo eccessivo di cibi grassi e di natura termica calda può generare l’accumulo di Calore, che si associa alla presenza di Umidità data dal Vuoto di Qi della Milza. Anche stati cronici di ansia e preoccupazioni possono causare Calore Interno. Può essere la vicariazione di un invasione di Freddo che si trasforma, poi, in Calore. Oppure può essere un attacco diretto di Calore e/o di Umidità."],
            ["Principi di trattamento", "Purificare il Calore, Dissolvere l’Umidità"],
            ["Muscoli", "Tensore Fascia Lata, Ischiocrurali, Quadrato dei Lombi"]
          ],
          tc: [
            "IC 11 — Purifica il Calore",
            "V 17 — Blocca il sanguinamento",
            "MP 6 — Dissolve l’Umidità dal TR Inferiore",
            "V 20 — Tonifica la Milza ed elimina l’Umidità",
            "MP 9 — Dissolve l’Umidità dal TR Inferiore",
            "V 22 — Dissolve l’Umidità dal TR Inferiore",
            "ST 25 — Punto d’Allarme di IC",
            "V 25 — Shu del Dorso di IC",
            "ST 37 — Blocca la dissenteria",
            "VC 3 — Dissolve l’Umidità dal TR Inferiore",
            "VC 12 — Elimina l’Umidità"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Althea Officinalis", "Magnesio Ossido", "", "Huang Lian", "Nux Vomica"], ["Lapacho", "Fermenti", "", "", "Momordica"], ["Zenzero", "Enzimi", "", "", "Leptandra"], ["Aglio", "", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Stipsi", "Appendicite acuta", "Ostruzione intestinale", "Enterocolite", "Micosi intestinale", "Candidosi", "Morbo di crohn", "Epatite", "Depositi intestinali con ipotiroidismo E ipotermia", "Disbiosi con fermentazione E putrefazione", "Disbiosi intestinale", "Infezione batterica intestinale", "Colecistite acuta"]},
            {"titolo": "Sintomi", "items": ["Rinite", "Addome dolorante", "Oliguria con urine scure", "Bruciore della mucosa orale", "Iperpiressia serotina", "Tonsillite", "Stipsi con feci secche", "Cefalea nucale", "Bruciore anale", "Muscoli degli arti intorpiditi", "Gonfiore anale", "Dissenteria", "Agitazione", "Vomito", "Delirio", "Feci malformate", "Feci con muco e sanguinolenti", "Dolore all’addome", "Feci dall’odore fetido", "Oppressione toracica ed epigastrica", "Febbre con sudorazione abbondante", "Ostruzione intestinale", "Febbre", "Sensazione di soffocamento all’epigastrio", "Sensazione di pesantezza al corpo e agli arti", "Sensazione di soffocamento al petto"]},
            {"titolo": "Alimentazione da evitare", "items": ["Succhi di frutta, zucchero, dolcificanti artificiali, pane fresco, alimenti lievitati, alimenti molto grassi, alimenti fritti", "Mangiare velocemente, senza masticare, con ritmi irregolari, tipo buffet, mangiare grandi quantità, mangiare continuamente, troppo pesante", "Mangiare troppi alimenti crudi"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cereali: amaranto, miglio, avena, riso, farro, grano, grano saraceno, segale, mais", "Legumi e noci: fave, soia nera, soia verde, fagiolo bianco, germogli di soia, ceci, lenticchie, piselli, nocciole", "Verdure: agar agar, carota, patata, cavolo di Bruxelles, cavolo cappuccio, cavolo rapa, cavolo verza, lattuga, oliva, radicchio rosso, pomodoro, sedano, rucola, ravanello", "Frutta: arancia, banana, cachi, fico d’india, fragola, limone, mandarino, mela, melone, mirtillo, pompelmo, ribes rosso", "Carne: anatra, cavallo, coniglio, maiale, tacchino. PESCE, FRUTTI DI MARE: riccio di mare, cefalo, ostrica, polipo, persico, seppia, salmone, vongola", "Erbe e spezie: maggiorana, menta, origano, salvia", "Bevande: acqua del rubinetto calda, tisane di erbe, acqua d’orzo", "Condimenti: sale, salsa di soia, olio di sesamo"]}
          ],
          appunti: [
            "Disbiosi intestinale data da fermentazione o putrefazione intestinale, soprattutto in caso di insufficienza biliare."
          ]
        },
        {
          id: "calore-ic",
          titolo: "Calore nello Yang Ming – Intestino Crasso",
          sotto: "Yang Ming · Intestino Crasso",
          pag: "138-139",
          meridiani: ["intestino-crasso"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) O · V 35 (Yang) + · R 13 (Qi) O",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): O – + O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme ST 25 (Intestino Crasso)."
          ],
          voci: [
            ["Origine", "La causa principale di questa Sindrome è di origine alimentare, data dall’eccessivo consumo di cibi di natura calda (alcool, cioccolata, manzo, fumo) e secca (cotti alla brace o al forno). Il deficit di Yin non è primario, ma come conseguenza dell’eccesso di Calore che evapora i liquidi."],
            ["Principi di trattamento", "Purificare il Calore nell’IC e St, Stimolare i Liquidi"],
            ["Muscoli", "Tensore Fascia Lata, Ischiocrurali, Quadrato dei Lombi"]
          ],
          tc: [
            "IC 2 — Elimina il Calore da IC",
            "VC 4 — Tonifica lo Yin, stimola i Liquidi",
            "IC 11 — Purifica il Calore",
            "VC 12 — Stimola i Liquidi",
            "ST 25 — Punto d’Allarme di IC",
            "MP 6 — Stimola i Liquidi",
            "ST 37 — Tratta le patologie croniche dell’IC",
            "R 6 — Stimola i Liquidi",
            "ST 44 — Purifica il Calore di Stomaco"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Althea Officinalis", "Magnesio", "", "", "FM Nux Vomica"], ["Estratto di semi di pompelmo", "Fermenti lattici", "", "", ""], ["Mirtillo Rosso", "Probiotici", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Stitichezza con feci secche", "Fermentazione intestnale", "Calore nel jao inferiore", "Bruciore anale", "Infiammazioni urinarie", "Disbiosi"]},
            {"titolo": "Sintomi", "items": ["Urine scarse e scure", "Bruciore alla bocca", "Lingua secca", "Gonfiore anale", "Vomito"]},
            {"titolo": "Alimentazione da evitare", "items": ["Zucchero, dolcificanti artificiali, pane fresco, alimenti lievitati, alimenti molto grassi, alimenti fritti", "Mangiare velocemente, senza masticare, con ritmi irregolari, tipo buffet, mangiare grandi quantità, mangiare continuamente, troppo pesante"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cereali: amaranto, miglio, avena, riso, farro, grano, grano saraceno, segale, mais", "Legumi e noci: fave, soia nera, soia verde, fagiolo bianco, germogli di soia, ceci, lenticchie, piselli, nocciole, mandorle, arachidi, latte di soia", "Verdure: agar agar, carota, patata, cavolo di Bruxelles, cavolo cappuccio, cavolo rapa, cavolo verza, lattuga, oliva, radicchio rosso, pomodoro", "Frutta: arancia, banana, cachi, fico d’india, fragola, limone, mandarino, mela, melone, mirtillo, pompelmo, ribes rosso", "Carne e latticini: anatra, cavallo, coniglio, maiale, tacchino, yogurt, latte, ghee", "Pesce: riccio di mare, cefalo, ostrica, polipo, persico, seppia, salmone, vongola", "Erbe e spezie: maggiorana, menta, origano, salvia", "Bevande: acqua del rubinetto calda, tisane di erbe, acqua d’orzo", "Condimenti: sale, salsa di soia, olio di sesamo"]}
          ]
        },
        {
          id: "freddo-ic",
          titolo: "Freddo nello Yang Ming – Intestino Crasso",
          sotto: "Yang Ming · Intestino Crasso",
          pag: "140-141",
          meridiani: ["intestino-crasso"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) + · V 35 (Yang) – · R 13 (Qi) O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme ST 25 (Intestino Crasso)."
          ],
          voci: [
            ["Origine", "E’ la conseguenza del Vuoto di Qi e di Yang di Milza, Stomaco, Polmone. E’ la concomitanza della mancata funzione di digestione, assorbimento, trasporto, e trasformazione della Milza ed il Vuoto di Polmone, che causano una mancata attivazione delle funzioni dell’Intestino Crasso. Può essere causata dall’eccessivo consumo di cibi di natura termica fredda e crudi, oltre che una continua esposizione dell’addome al Freddo Esterno. Questa Sindrome è praticamente identica al Vuoto di Yang di Milza. I sintomi differiscono leggermente se l’origine è Interna (dolore sordo), o Esterna (dolore improvviso)."],
            ["Principi di trattamento", "Espellere il Freddo, Riscaldare il TR Inferiore, Tonificare e Riscaldare IC e Milza"],
            ["Muscoli", "Tensore Fascia Lata, Ischiocrurali, Quadrato dei Lombi"]
          ],
          tc: [
            "ST 25 — Punto d’Allarme di IC",
            "F 3 — Calma gli spasmi, agisce sul TR Inferiore",
            "ST 27 — Espelle il Freddo da IC",
            "VC 6 — Tonifica il Qi",
            "ST 36 — Espelle il Freddo da IC",
            "V 20 — Tonifica il Qi della Milza",
            "ST 37 — Blocca la dissenteria",
            "V 25 — Tonifica l’IC",
            "MP 6 — Calma il dolore addominale"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["", "Fermenti", "Trikatu", "Huo Xiang Zheng Qi San", "FM Nux Vomica"], ["", "Vit. B3", "Shilajit", "Zhen Ren Yang Zang Tang", ""], ["", "Magnesio", "", "Angelica Sinensis", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Colite acuta", "Colite cronica", "Gastrocolite acuta", "Insufficienza pancreatica", "Sindrome da malassorbimento", "Sindrome del colon irritabile", "Diverticolite", "Linfo adeno patie", "Dissenteria cronica"]},
            {"titolo": "Sintomi", "items": ["Emorroidi", "Astenia dopo l’evacuazione", "Borborigmi", "Mani e piedi freddi", "Psicastenia", "Anoressia", "Sensazione di freddo diffuso", "Astenia", "Congestione nasale", "Freddo all’addome", "Dissenteria accompagnata da dolore", "Spasmi addominali sordi migliorati da calore", "Feci non ben formate", "Prolasso anale", "Urine pallide", "Brividi e sudori freddi", "Megacolon", "Stanchezza mentale", "Dolore addominale improvviso", "Gonfiore linfonodi della gola", "Dolore addominale sordo", "Gonfiore linfonodi cervicali"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cereali: miglio, avena, riso, farro, grano, grano saraceno, mais, orzo, quinoa, sorgo", "Legumi e noci: fave, ceci, lenticchie, piselli, nocciole, noci, semi di girasole, arachidi, pinolo, pistacchio, anacardo, castagna", "Verdure: carota, patata, patata dolce, zucca, cavolo di Bruxelles, cavolo cappuccio, cavolo rapa, cavolo verza, funghi, cipolla, porro", "Frutta: dattero, ciliegia, fico, frutta secca non oleosa, prugna umeboshi, fico d’india, pesca", "Carne e latticini: manzo, vitello, pollo, tacchino, agnello, capra, uova di quaglia, ghee", "Pesce: carpa, trota, acciuga, aringa, persico, triglia, cefalo", "Erbe e spezie: anice, cumino, zenzero fresco e secco, cardamomo, rosmarino, vaniglia, ginepro, coriandolo, scorza d’agrumi, pepe", "Bevande: acqua del rubinetto calda, tisane aromatiche (rosmarino, timo, salvia, cumino, anice, cardamomo, zenzero…), acqua d’orzo", "Olii: olio di soia"]}
          ]
        },
        {
          id: "invasione-freddo-ic",
          titolo: "Invasione di Freddo dello Yang Ming – Intestino Crasso",
          sotto: "Yang Ming · Intestino Crasso",
          pag: "142-143",
          meridiani: ["intestino-crasso"],
          test: [
            "ST 24 (Xuè) O · R 19 (Yin) + · V 35 (Yang) O · R 13 (Qi) O",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): O + O –",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme ST 25 (Intestino Crasso)."
          ],
          voci: [
            ["Origine", "E’ la conseguenza dell’aggressione del Freddo o del Vento-Freddo. Oppure è l’esito dell’eccesivo consumo di alimenti di natura termica fredda o bevande eccessivamente fredde. Infine può essere l’esito di una complicanza dell’esaurimento dello Yang."],
            ["Principi di trattamento", "Espellere il Freddo, Riscaldare il TR Inferiore, Tonificare e Riscaldare IC e Milza"],
            ["Muscoli", "Tensore Fascia Lata, Ischiocrurali, Quadrato dei Lombi"]
          ],
          tc: [
            "ST 25 — Punto d’Allarme di IC",
            "F 3 — Calma gli spasmi, agisce sul TR Inferiore",
            "ST 27 — Espelle il Freddo da IC",
            "MP 6 — Calma il dolore addominale",
            "ST 36 — Espelle il Freddo da IC",
            "V 25 — Tonifica l’IC",
            "ST 37 — Blocca la dissenteria"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["", "Fermenti", "Trikatu", "Huo Xiang Zheng Qi San", "FM Nux Vomica"], ["", "Vit. B3", "Shilajit", "", ""], ["", "Magnesio", "", "", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Colite acuta", "Dissenteria", "Gastrocolite acuta", "Colite cronica"]},
            {"titolo": "Sintomi", "items": ["Poliuria", "Dolori addominali", "Senso di freddo generalizzato", "Dissenteria con coliche addominali", "Dolori addominali con spasmi intestinali migliorati col calore", "Sensazione di freddo all’addome", "Desiderio di coprire e riscaldare l’addome", "Borborigmi"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cereali: miglio, avena, riso, farro, grano, grano saraceno, mais, orzo, quinoa, sorgo", "Legumi e noci: fave, ceci, lenticchie, piselli, nocciole, noci, semi di girasole, arachidi, pinolo, pistacchio, anacardo, castagna", "Verdure: carota, patata, patata dolce, zucca, cavolo di Bruxelles, cavolo cappuccio, cavolo rapa, cavolo verza, funghi, cipolla, porro", "Frutta: dattero, ciliegia, fico, frutta secca non oleosa, prugna umeboshi, fico d’india, pesca", "Carne e latticini: manzo, vitello, pollo, tacchino, agnello, capra, uova di quaglia, ghee", "Pesce: carpa, trota, acciuga, aringa, persico, triglia, cefalo", "Erbe e spezie: anice, cumino, zenzero fresco e secco, cardamomo, rosmarino, vaniglia, ginepro, coriandolo, scorza d’agrumi, pepe", "Bevande: acqua del rubinetto calda, tisane aromatiche (rosmarino, timo, salvia, cumino, anice, cardamomo, zenzero…), acqua d’orzo", "Olii: olio di soia"]}
          ]
        },
        {
          id: "secco-ic",
          titolo: "Secco nello Yang Ming – Intestino Crasso",
          sotto: "Yang Ming · Intestino Crasso",
          pag: "144-145",
          meridiani: ["intestino-crasso"],
          alias: ["Vuoto di Sangue di Yang Ming – Intestino Crasso"],
          test: [
            "ST 24 (Xuè) – · R 19 (Yin) – · V 35 (Yang) O · R 13 (Qi) O",
            "Varianti dello schema (Xuè · Yin · Yang · Qi): O – + + — – – + O",
            "Modo dell'organo in circuito: cambio d'indicatore sul punto d'allarme ST 25 (Intestino Crasso)."
          ],
          voci: [
            ["Origine", "Il Vuoto di Yin o di Sangue porta ad un esaurimento dei Liquidi di IC generando il Secco. Dato il collegamento a tra IC e Stomaco nel Livello Yang Ming, i sintomi di secchezza si manifestano anche in quest’ultimo organo. E’ tipica delle persone molto magre o anziane (cioè con deficit di Yin) o dopo un parto, o dopo una emorragia."],
            ["Principi di trattamento", "Stimolare i Liquidi nell’IC"],
            ["Muscoli", "Tensore Fascia Lata, Ischiocrurali, Quadrato dei Lombi"]
          ],
          tc: [
            "ST 36 — Stimola i Liquidi in IC e Stomaco",
            "MP 6 — Stimola i Liquidi e lo Yin",
            "VC 4 — Stimola i Liquidi e lo Yin",
            "MP 9 — ",
            "R 6 — Stimola i Liquidi, Tonifica lo Yin, Umidifica le feci"
          ],
          tabelle: [
            {"titolo": "Prodotti", "col": ["Fitoterapici", "Ortomolecolari", "Fitoterapici", "Cinesi", "Omeopatici"], "righe": [["Curcuma", "Betacarotene", "", "Zhen Yi Tang", "FM Nux Vomica"], ["Alfalfa", "Magnesio", "", "Dangui", ""], ["", "", "", "Angelica Sinensis", ""]]}
          ],
          liste: [
            {"titolo": "Patologie", "items": ["Feci secche con stipsi ostinata", "Stipsi cronica"]},
            {"titolo": "Sintomi", "items": ["Rigidità del collo e delle spalle", "Bocca secca", "Dolore agli occhi", "Pollachiuria", "Gola secca", "Affezioni gomito", "Emorroidi", "Bronchite", "Epicondilite", "Aspetto emaciato", "Laringite", "Epitrocleite", "Corpo magro"]},
            {"titolo": "Alimentazione da evitare", "items": ["Zucchero, dolcificanti artificiali, pane fresco, alimenti lievitati, alimenti molto grassi, alimenti fritti", "Mangiare velocemente, senza masticare, con ritmi irregolari, tipo buffet, mangiare grandi quantità, mangiare continuamente, troppo pesante"]},
            {"titolo": "Alimentazione consigliata", "items": ["Cereali: amaranto, miglio, avena, riso, farro, grano, grano saraceno, segale, mais", "Legumi e noci: fave, soia nera, soia verde, fagiolo bianco, germogli di soia, ceci, lenticchie, piselli, nocciole, mandorle, arachidi, latte di soia", "Verdure: agar agar, carota, patata, cavolo di Bruxelles, cavolo cappuccio, cavolo rapa, cavolo verza, lattuga, oliva, radicchio rosso, pomodoro", "Frutta: arancia, banana, cachi, fico d’india, fragola, limone, mandarino, mela, melone, mirtillo, pompelmo, ribes rosso", "Carne e latticini: anatra, cavallo, coniglio, maiale, tacchino, yogurt, latte, ghee PESCE, FRUTTI DI MARE: riccio di mare, cefalo, ostrica, polipo, persico, seppia, salmone, vongola", "Erbe e spezie: maggiorana, menta, origano, salvia", "Bevande: acqua del rubinetto calda, tisane di erbe, acqua d’orzo", "Condimenti: sale, salsa di soia, olio di sesamo"]}
          ],
          info: [
            "La stessa pagina porta anche il titolo «Vuoto di Sangue di Yang Ming – Intestino Crasso» (schema – – O O, tabella di pag. 21)."
          ]
        }
      ]
    }
  ]
});
