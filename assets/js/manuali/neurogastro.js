/* Manuale «NeuroGastroEnterologia Integrata 3» (M. Rado, 2021) — schede per manuali.js
   (formato descritto lì). Teoria riassunta, procedure e tabelle di punti trascritte,
   appunti a mano del corso letti dalle pagine.
   `pag` = numero di pagina stampato sul manuale (non quello del PDF). */
(function () {
  /* Punti di test dei vari microbiota: gli stessi per la procedura del
     microbiota e per quella del viroma. */
  var SITI = [
    ["P 1", "Respiratorio"], ["ST 25", "Intestino Crasso"], ["VC 4", "Intestino Tenue"],
    ["VC 3", "Vescica"], ["VC 2", "Prostatico"], ["F 5", "Vaginale"], ["ST 44", "Orale"], ["IT 7", "Cutaneo"]
  ];
  var FORMAT_NGE = "Format di NeuroGastroEnterologia: VC 4 × VG 17 + VC 12 × ST 25.";
  var DIG_APPUNTO = "Posso stimolarli con digitopressione, di solito dinamica e quasi mai forte.";
  var COPPIE = "Jing-pozzo e shu-torrente li faccio entrambi, accoppiati per meridiano; lo stesso per jing-fiume e he-mare.";

  /* Livelli energetici della procedura Leaky Gut: una scheda per livello. */
  function yang(id, nome, chiave, mer, m1, m2, pozzo, torrente, fiume, mare, prec, succ, pag, sintomi, appunti) {
    return {
      id: id, titolo: "Livello " + nome, sotto: "Punto chiave " + chiave + " · livello Yang", pag: pag, meridiani: mer,
      test: "Punto chiave " + chiave + " prioritario (Format di NeuroGastroEnterologia + MP 3 in circuito).",
      voci: [["Meridiani", m1 + " e " + m2]],
      info: sintomi,
      passi: [
        "Disperdere i punti jing-pozzo e shu-torrente del livello.",
        "Testare il Modo dell'Organo: se dà cambio d'indicatore lo squilibrio è arrivato al livello viscerale.",
        "Solo se viscerale: stimolare i punti jing-fiume e he-mare.",
        "Testare e stimolare il punto che riporta il patogeno al livello precedente.",
        "Testare e tonificare i punti che evitano il passaggio al livello successivo."
      ],
      tabelle: [{ titolo: "Punti del livello " + nome, col: ["Gruppo", m1, m2], righe: [
        ["Jing-pozzo", pozzo[0], pozzo[1]], ["Shu-torrente", torrente[0], torrente[1]],
        ["Jing-fiume", fiume[0], fiume[1]], ["He-mare", mare[0], mare[1]]
      ] }, { titolo: "Spostare il patogeno", col: ["Azione", "Punti"], righe: [
        ["Ritornare al livello precedente", prec], ["Evitare il livello successivo", succ]
      ] }],
      appunti: [COPPIE, DIG_APPUNTO].concat(appunti || [])
    };
  }
  function yin(id, nome, chiave, mer, m1, m2, yuan, mare, mu, shu, pag, sintomi, appunti) {
    return {
      id: id, titolo: "Livello " + nome, sotto: "Punto chiave " + chiave + " · livello Yin", pag: pag, meridiani: mer,
      test: "Punto chiave " + chiave + " prioritario (Format di NeuroGastroEnterologia + MP 3 in circuito).",
      voci: [["Meridiani", m1 + " e " + m2]],
      info: sintomi,
      passi: [
        "Tonificare i punti yuan e he-mare del livello.",
        "Riequilibrare i punti d'allarme (Mu).",
        "Riequilibrare i punti Shu del dorso."
      ],
      tabelle: [{ titolo: "Punti del livello " + nome, col: ["Gruppo", m1, m2], righe: [
        ["Yuan", yuan[0], yuan[1]], ["He-mare", mare[0], mare[1]],
        ["Mu (allarme)", mu[0], mu[1]], ["Shu del dorso", shu[0], shu[1]]
      ] }],
      appunti: appunti
    };
  }
  /* Diarrea e stipsi: quadro MTC + digitopressione + alimentazione. */
  function quadro(id, titolo, pag, mer, test, sintomi, punti, consumare, evitare, appunti, extra) {
    var s = {
      id: id, titolo: titolo, pag: pag, meridiani: mer, test: test, info: sintomi,
      tc: punti,
      liste: [], appunti: appunti
    };
    if (consumare) s.liste.push({ titolo: "Alimentazione: consumare", items: consumare });
    if (evitare) s.liste.push({ titolo: "Alimentazione: evitare", items: evitare });
    if (extra) for (var k in extra) s[k] = extra[k];
    return s;
  }
  var EVITA_FREDDI = ["Zucchero, latte e latticini, formaggi freschi, yogurt, dolci e gelati",
    "Farine, specie se lievitate; verdure non cotte; succhi di frutta e frutta fresca in genere",
    "Lardo e grassi animali, calamari, vongole, alghe, crescione, cetrioli, cavolo, cicoria",
    "Patata dolce, fragole, lampone, mirtillo, melograno, melone, frutto della passione, litchi",
    "Funghi champignon, insalata belga, scarola, tarassaco, zucca, tè verde, anguria, cachi, more di gelso, pompelmo"];

  (window.MANUALI = window.MANUALI || []).push({
    id: "neurogastro",
    titolo: "NeuroGastroEnterologia Integrata 3",
    breve: "NeuroGastro",
    sotto: "Microbiota, meridiani divergenti, viroma",
    autore: "Marco Rado",
    intro: [
      "Terzo livello del corso: dal microbiota intestinale si passa a quelli delle altre mucose (urogenitale, vaginale, prostatico, orale, cutaneo, respiratorio). Le procedure lavorano sul microbiota con meridiani divergenti e Luo, sulla Leaky Gut attraverso i sei livelli energetici, sul viroma con le procedure innata e acquisita; chiudono i quadri MTC di diarrea e stipsi.",
      "Appunto del corso: l'elenco di batteri e virus da testare si trova anche sul sito bacterio.net."
    ],
    capitoli: [
      {
        id: "microbiota", titolo: "I diversi microbiota",
        intro: ["Ovunque ci sia una mucosa c'è un microbiota: è la linea di confine fra interno ed esterno e il suo compito è proteggere il corpo."],
        schede: [
          {
            id: "mucose-microbiota", titolo: "Mucose e microbiota", pag: "3",
            info: [
              "Non esiste solo il microbiota intestinale: tutto il corpo ospita batteri, funghi e virus che collaborano alla salute. L'intestino è in relazione con il sistema urogenitale (vicinanza anatomica e passaggio di batteri verso vagina, prostata e vescica), con l'apparato respiratorio e con la pelle.",
              "Le mucose orali, respiratorie e urogenitali sono esposte di continuo a stimoli esterni (cibo, farmaci, sole, traumi): sono la prima difesa contro i patogeni e ospitano molti commensali, che modulano la risposta immunitaria locale.",
              "La disbiosi di queste mucose si associa a malattie immunitarie croniche dei rispettivi tessuti, con specie tipiche: Porphyromonas gingivalis nella bocca, Moraxella catarrhalis nel polmone, Gardnerella vaginalis nella vagina. Ciò che nasce in queste barriere può diffondersi e cronicizzare in tutto il corpo."
            ],
            appunti: [
              "Ovunque abbiamo una mucosa abbiamo un microbiota ed è la linea di confine tra interno ed esterno, quindi la sua funzione è proteggere il corpo.",
              "Mucosa orale e urogenitale hanno funzioni molto simili.",
              "Olio essenziale di timo rosso come antibatterico."
            ]
          },
          {
            id: "asse-urogenitale", titolo: "Asse intestino – sistema urogenitale", sotto: "Asse vescica–intestino–cervello", pag: "4-5",
            info: [
              "Con la disbiosi e l'intestino permeabile (Leaky Gut) batteri e messaggeri infiammatori passano dall'intestino a vagina, prostata e vescica: ne derivano vaginiti, prostatiti e cistiti recidivanti (anche da abuso di antibiotici e passaggio di Escherichia coli).",
              "I disturbi funzionali urologici e intestinali (vescica iperattiva, cistite interstiziale, dolore pelvico cronico, prostatite cronica, vaginosi; colon irritabile, dispepsia) spesso coesistono, sono cronici e resistono ai trattamenti: sembrano un unico continuum con un'ipersensibilità nervosa centrale di fondo.",
              "L'ipotesi dell'asse vescica–intestino–cervello dà un ruolo centrale alla sfera emotiva: ansia, depressione ed eventi stressanti peggiorano i sintomi e, con gli insuccessi terapeutici, alimentano un circolo vizioso. I disturbi funzionali sarebbero una risposta sensibilizzata a problemi precedenti (difficoltà vissute nell'infanzia, traumi): serve un approccio che integri funzione ed emozioni, e la kinesiologia può farlo."
            ],
            liste: [{ titolo: "In sintesi", items: [
              "I disturbi funzionali urogenitali e gastrointestinali si sovrappongono e condividono un'ipersensibilità di fondo.",
              "Hanno decorso cronico e risposta ai trattamenti molto variabile.",
              "Stress, relazioni negative ricorrenti, infezioni e sindromi intestinali possono contribuire a farli nascere.",
              "Sono false risposte d'allarme di un sistema difensivo ipersensibilizzato.",
              "Non riconoscere la co-morbidità urologica, intestinale e affettiva favorisce la resistenza al trattamento."
            ] }],
            meridiani: ["vescica", "intestino-tenue"],
            appunti: [
              "Associato al Tai Yang, che fa entrare dal mondo esterno a quello interno le emozioni (occhio, orecchio).",
              "Questi disturbi urologici spesso sono legati a problematiche emotive.",
              "Ogni batterio è la manifestazione materiale di un'emozione (così anche parassiti e funghi)."
            ]
          },
          {
            id: "microbiota-urinario", titolo: "Microbiota urologico / urinario", pag: "6, 22", meridiani: ["vescica"],
            info: ["Elenco dei generi del microbiota urinario, da usare nella sfida verbale della procedura del microbiota (VC 3)."],
            liste: [{ titolo: "Generi", items: [
              "Acinetobacter spp, Actinobaculum, Actinomyces, Aerococcus, Aminobacterium, Anaerococcus, Anaerophaga, Anaerosphaera, Anaerotruncus, Anaerovorax, Arcanobacterium, Arthrobacter, Atopobium, Atopostipes, Azospira",
              "Bacteroides spp, Brevibacterium, Brooklawnia, Butyricicoccus, Candida albicans, Catonella, Campylobacter, Caulobacter, Coriobacterium, Corynebacterium spp",
              "Dialister, Eikenella corrodens, Enterobacter, Enterococcus, Facklamia, Fastidiosipila, Filifactor, Finegoldia, Flavonifractor, Friedmanniella, Fusobacterium",
              "Gallicola, Gammaproteobacter, Gardnerella, Gemella, Gordonibacter, Gulosibacter, Helcococcus, Jonquetella, Kocuria",
              "Lactobacillus, Lactonifactor, Marixanthomonas, Megasphaera, Methylovirgula, Microvirgula, Mobiluncus, Modestobacter, Murdochiella, Mycobacterium, Mycoplasma",
              "Negativicoccus, Neisseria, Oligella, Paraprevotella, Parvimonas, Pelomonas, Peptococcus, Peptoniphilus, Peptostreptococcus, Porphyromonas, Prevotella, Propionimicrobium, Proteiniphilum, Pseudomonas, Pseudoramibacter",
              "Rhodococcus, Rikenella, Rhodopila, Saccharofermentans, Sediminitomix, Sneathia, Soehngenia, Sporanaerobacter, Staphylococcus, Stenotrophomonas, Streptococcus, Streptophyta, Sutterella",
              "Tepidimonas, Tessaracoccus, Thermoleophilum, Varibaculum"
            ] }]
          },
          {
            id: "microbiota-vaginale", titolo: "Microbiota vaginale", pag: "7-9", meridiani: ["fegato"],
            info: [
              "In eubiosi la flora vaginale è dominata dai lattobacilli, che proteggono dalle infezioni e sostengono la funzione riproduttiva. Si distinguono cinque «community state types» (CST): quattro sono dominati da un lattobacillo (il CST I, L. crispatus, è il più protettivo), mentre il CST IV, povero di lattobacilli, si associa a disturbi vaginali.",
              "I lattobacilli occupano i siti di adesione, producono perossido di idrogeno, acidificano l'ambiente trasformando il glicogeno in acido lattico, liberano batteriocine e formano un biofilm protettivo. Anche i patogeni possono formare biofilm: sono alla base delle forme croniche e recidivanti perché sfuggono alle difese e agli antibiotici. I biofilm dei lattobacilli a volte riescono a penetrarli: da qui il possibile ruolo dei probiotici.",
              "Il microbiota cambia con gli estrogeni: nell'infanzia mancano i lattobacilli, compaiono con la produzione ovarica di estrogeni, calano con le mestruazioni e soprattutto in menopausa, quando aumentano anaerobi e Gardnerella (pre-menopausa: CST I e III; peri-menopausa: IVA e II; menopausa: IVA).",
              "Lo stile di vita conta: le lavande vaginali squilibrano il microbiota; un'infiammazione intestinale anche lieve indebolisce vagina e vescica (asse intestino–urogenitale), per cui la prima terapia è un'alimentazione corretta; anche i rapporti sessuali possono alterarlo."
            ],
            tabelle: [{ titolo: "Community state types (vaginotipi)", col: ["CST", "Specie dominante"], righe: [
              ["CST I", "Lactobacillus crispatus"], ["CST II", "Lactobacillus gasseri"], ["CST III", "Lactobacillus iners"],
              ["CST IV-A", "Gardnerella vaginalis A; generi Anaerococcus, Peptoniphilus, Corynebacterium, Prevotella, Finegoldia, Streptococcus"],
              ["CST IV-B", "Gardnerella vaginalis B; Atopobium, Sneathia, Mobiluncus, Megasphaera e altri Clostridiales"],
              ["CST IV-C", "Gardnerella vaginalis C"], ["CST V", "Lactobacillus jensenii"]
            ] }, { titolo: "Grado di pulizia vaginale (dalla diapositiva del corso)", col: ["Grado", "pH", "Quadro"], righe: [
              ["1°", "< 6", "95% lattobacilli"], ["2°", "6-7", "60% lattobacilli, streptococco, stafilococco"],
              ["3°", "> 7", "Netta riduzione dei lattobacilli e infiltrazione di globuli bianchi"],
              ["4°", "> 7", "Niente lattobacilli, infiltrazione di globuli bianchi e patogeni"]
            ] }],
            appunti: [
              "I lattobacilli producono acido lattico, che mantiene il pH.",
              "Per valutare il pH vaginale: Modo Biochimica (pollice + medio) + Sodio × Potassio (centro delle guance dx-sx); i punti di Fegato da 1 a 14 indicano il livello di pH.",
              "I batteri aerobici vanno bene sulla pelle ma non nelle mucose interne.",
              "Ciclosan (Arcangea) per menopausa e problemi di secchezza o del microbiota vaginale: pomata con estrogeni vegetali."
            ]
          },
          {
            id: "vaginosi", titolo: "Vaginosi e infezioni vaginali", pag: "10-12", meridiani: ["fegato"],
            info: [
              "La vaginosi batterica è il disturbo vaginale più comune in età fertile: perdite bianco-grigiastre e forte odore di pesce (peggiore dopo i rapporti, durante il flusso e dopo l'igiene), con pochi sintomi infiammatori. È polimicrobica: il calo dei lattobacilli lascia proliferare Gardnerella, Prevotella bivia (che aiuta Gardnerella a formare il biofilm), Streptococcus anginosus, Mobiluncus, Bacteroides, Mycoplasma.",
              "L'antibiotico serve nella fase acuta ma stressa anche i lattobacilli: per evitare recidive bisogna riequilibrare il microbiota intestinale e favorire la ricolonizzazione dei lattobacilli (probiotici)."
            ],
            liste: [{ titolo: "Criteri di Amsel (bastano 3 su 4)", items: [
              "Secrezioni biancastre, omogenee, non viscose.",
              "Clue-cells (cellule punteggiate da batteri adesi) oltre il 20%.",
              "pH vaginale superiore a 4,5.",
              "Whiff test positivo: odore di pesce aggiungendo idrossido di potassio al campione."
            ] }],
            tabelle: [{ titolo: "Agenti delle infezioni vaginali ricorrenti", col: ["Agente", "Note", "Sintomi"], righe: [
              ["Candida albicans (fungo)", "Commensale intestinale che diventa opportunista; rischio maggiore con ipotiroidismo, ipoadrenalismo, immunodepressione", "Prurito intenso, secrezioni bianche simili a ricotta, bruciore, dolore alla minzione e nei rapporti"],
              ["Gardnerella vaginalis", "Favorita da antibiotici, contraccettivi uterini, lavande, rapporti (lo sperma alcalino alza il pH); doppia rispetto alla Candida", "Metà dei casi asintomatica; pH alterato, bruciore vulvare, perdite biancastre maleodoranti"],
              ["Mycoplasma hominis", "Commensale che diventa opportunista con la disbiosi; trasmissione sessuale e da madre a figlio", "Prurito, bruciore, secrezioni anomale; diagnosi differenziale con gonorrea, clamidia, sifilide"],
              ["Trichomonas vaginalis (protozoo, parassita)", "Trasmissione sessuale o con biancheria infetta; compete con i lattobacilli", "pH lievemente alcalino, bruciore e prurito, perdite giallo-verdastre schiumose"],
              ["Herpes simplex (HSV-1, HSV-2)", "Contatto sessuale; favorito da stress, calo delle difese, squilibri ormonali", "Vescicole biancastre su cute e mucose genitali, anche cervice e uretra"]
            ] }],
            appunti: ["Trichomonas vaginalis è un parassita."]
          },
          {
            id: "batteri-urogenitali", titolo: "Batteri simbionti e patogeni urogenitali", pag: "15",
            liste: [
              { titolo: "Lactobacillus (simbionti)", items: ["brevis, bulgaricus, casei, coleohominis, crispatus, delbrueckii, fermentum, gasseri, helveticus, iners, jensenii, johnsonii, pentosus, plantarum, rhamnosus, reuteri, salivarius, sakei, vaginalis"] },
              { titolo: "Simbionti e patogeni", items: [
                "Bifidobacterium, Eubacterium, Actinobacteria, Aerococcus, Anaerococcus, Acinetobacter, Actinomyces (israelii, naeslundii), Aggregatibacter (actinomycetemcomitans), Atopobium (vaginae)",
                "Bacteroides (fragilis, ureolyticus), Citrobacter, Chlamydia (trachomatis), Clostridiales, Clostridium, Collinsella (aerofaciens), Dialister, Difteroidi, Eggerthella (lenta), Enterobacter, Enterococcus faecalis, Escherichia (coli)",
                "Finegoldia, Fusobacterium (nucleatum), Gardnerella (vaginalis), Klebsiella, Leptotrichia (amnionii), Megasphaera, Mobiluncus, Mycoplasma (hominis, parvum)",
                "Peptococcus, Peptoniphilus, Peptostreptococcus (anaerobius), Porphyromonas (gingivalis), Prevotella (bivia, disiens, intermedia), Propionibacterium, Proteus, Pseudomonas, Slackia, Sneathia (sanguinegens)",
                "Staphylococcus (aureus, epidermidis), Streptococcus (viridans), Tannerella (forsythia), Treponema (denticola), Ureaplasma (urealyticum), Vaginella, Veillonella (parvula)"
              ] }
            ]
          },
          {
            id: "microbiota-prostatico", titolo: "Microbiota prostatico", pag: "16-21",
            info: [
              "Non è chiaro se esista un microbiota prostatico fisiologico: il fluido prostatico è chimicamente aggressivo e i batteri sembrano comparire soprattutto nell'organo malato. Il microbiota urinario, intestinale e orale influenza però prostatite, dolore pelvico cronico, ipertrofia prostatica benigna e cancro.",
              "Vie in gioco: batteri delle infezioni urinarie o sessualmente trasmesse che risalgono l'uretra; batteri del retto (E. coli, Proteus, Klebsiella) che, con lesioni intestinali o Leaky Gut, colonizzano la ghiandola vicina; citochine infiammatorie dalla disbiosi intestinale che arrivano col sangue; batteri della placca (parodontite) trovati nelle secrezioni prostatiche, con PSA più alto. Alcuni batteri intestinali modificano anche estrogeni e androgeni.",
              "Gli E. coli uropatogeni, con le adesine delle fimbrie, si ancorano all'urotelio e risalgono causando uretrite, cistite, prostatite, pielonefrite (più spesso nella donna, per l'uretra corta e vicina all'ano). Proteus mirabilis causa il 90% delle infezioni da Proteus; Klebsiella pneumoniae e oxytoca vivono su mucose respiratorie e intestino e diventano patogene in condizioni particolari, spesso in ospedale."
            ],
            tabelle: [{ titolo: "Tipi di prostatite", col: ["Tipo", "Descrizione"], righe: [
              ["I", "Acuta batterica: infiammazione rapida e improvvisa"], ["II", "Cronica batterica"],
              ["III", "Cronica non batterica"], ["IV", "Asintomatica"]
            ] }],
            liste: [
              { titolo: "Sintomi comuni (tipi I-III)", items: ["Difficoltà a urinare", "Dolore rettale, scrotale, inguinale", "Eiaculazione dolorosa"] },
              { titolo: "Batteri del microbiota prostatico", items: [
                "Actinobacteria, Anaerococcus (lactolyticus, obesiensis), Bacillus, Bacteroides ureolyticus, Bifidobacterium, Burkholderia, Brevundimonas intermedia",
                "Escherichia coli, Enterococcus faecalis, Neisseria (gonorrhoeae), Chlamydia trachomatis, Trichomonas vaginalis",
                "Propionibacterium (acnes), Proteobacteria, Ureaplasma spp, Mycoplasma, Sneathia, Pseudomonas, Prevotella",
                "Staphylococcus (haemolyticus, capitis, hominis), Corynebacteria (genitalium, pseudogenitalium), Lactobacillus, Streptococcus (anginosus), Sphingomonas, Enterobacteriaceae, Ralstonia",
                "Varibaculum cambriense, Propionimicrobium lymphophilum, Proteus, Klebsiella"
              ] },
              { titolo: "Microbiota urinario maschile", items: ["Corynebacterium, Staphylococcus, Streptococcus, Anaerococcus, Finegoldia, Lactobacillus, Peptoniphilus, Enterobacteriaceae, Pseudomonas, Actinobaculum, Gammaproteobacter, Actinomyces, Gardnerella, Anaerophaga, Azospira"] }
            ]
          },
          {
            id: "microbiota-fertilita", titolo: "Microbiota e fertilità", pag: "23-24",
            info: [
              "Il microbiota del tratto riproduttivo incide sulla fertilità. Nell'uomo E. coli riduce la motilità degli spermatozoi (agglutinazione, danno al DNA); Lactobacillus e Gardnerella si associano a sperma di buona qualità, Prevotella e Bordetella a scarsa vitalità. Per via indiretta i batteri possono aumentare i radicali liberi o stimolare anticorpi anti-spermatozoi.",
              "Nella donna i lattobacilli in follicoli ed endometrio favoriscono la fertilità, Propionibacterium e Streptococcus la riducono. La disbiosi aumenta il rischio di infezioni, infertilità, parto pretermine e si trasmette al nascituro.",
              "Il liquido seminale (pH basico, ricco di zuccheri) ospita un microbiota molto variabile, più ricco negli uomini infertili: Bacteroides ureolyticus si associa a motilità ridotta, Anaerococcus a qualità peggiore."
            ],
            appunti: [
              "L'Escherichia coli dà più viscosità allo sperma: controproducente, come Prevotella e Bordetella.",
              "Streptococchi e Proteobatteri sono negativi nella donna."
            ]
          },
          {
            id: "microbiota-orale", titolo: "Microbiota orale", pag: "25-31", meridiani: ["stomaco"],
            info: [
              "La bocca ospita circa 700 specie in nicchie diverse (denti, gengive, lingua, palato, placca, tonsille, gola). Sulle superfici molli la saliva lascia solo un monostrato non patogeno; sulle superfici dure si formano biofilm come la placca, che con cambi di pH o di immunità diventa patogena (gengivite, parodontite).",
              "Quando gli aerobi sono sostituiti dagli anaerobi, le sostanze rilasciate attraversano la gengiva e, grazie alla ricca vascolarizzazione, raggiungono il resto del corpo: infezione metastatica (batteri in circolo), lesione metastatica (tossine), infiammazione metastatica (immunocomplessi).",
              "Il microbiota orale riflette l'immunità locale e generale ed è associato a malattie sistemiche (colon-retto, pancreas, cuore, artrite reumatoide, Alzheimer, diabete). Le tasche parodontali oltre 4 mm sono colonizzate da anaerobi: Treponema, Porphyromonas, Prevotella, Tannerella, Fusobacterium, Leptotrichia. Porphyromonas gingivalis altera la risposta immunitaria inibendo la fagocitosi e stimolando l'infiammazione."
            ],
            tabelle: [{ titolo: "Malattie orali e microrganismi associati", col: ["Malattia", "Associati", "Inibiti"], righe: [
              ["Parodontite", "Spirochaetes, Synergistetes, Bacteroidetes; Clostridia; Prevotella, Fusobacterium; P. gingivalis, Treponema denticola, Tannerella forsythia, Filifactor alocis, Parvimonas micra, Aggregatibacter", "Proteobacteria"],
              ["Carie dentale", "Streptococcus mutans, Lactobacillus spp., Candida albicans; Neisseria, Selenomonas, Propionibacterium", "Bacilli; streptococchi non mutans"],
              ["Cancro orale", "Archaea (Methanobrevibacter oralis ecc.)", "Streptococcus, Actinomyces, Granulicatella"]
            ] }, { titolo: "Malattie sistemiche e microbiota orale", col: ["Malattia", "Associati", "Inibiti"], righe: [
              ["Cancro del colon-retto", "Fusobacterium nucleatum; Lactobacillus, Rothia", ""],
              ["Cancro del pancreas", "Leptotrichia (fasi avanzate)", "Leptotrichia (fasi iniziali)"],
              ["Malattia cardiovascolare", "Streptococcus oralis, S. mitis, S. gordonii, S. sanguinis", ""],
              ["Artrite reumatoide", "Porphyromonas gingivalis ed endodontalis, Prevotella intermedia e nigrescens, Campylobacter rectus", "Haemophilus, Neisseria, Rothia aeria"],
              ["Alzheimer", "Veillonella, Atopobium, Prevotella, Leptotrichia", ""],
              ["Diabete", "Rothia mucilaginosa e dentocariosa, Lactobacillus salivarius", "Porphyromonas, Filifactor, Eubacterium, Tannerella, Treponema"]
            ] }],
            liste: [
              { titolo: "Microbiota orale fungino", items: ["Candida, Cladosporium, Aspergillus, Fusarium, Glomus, Alternaria, Penicillium, Cryptococcus"] },
              { titolo: "Generi del microbiota orale", items: [
                "Abiotrophia, Achromobacter, Actinomyces, Aggregatibacter, Agrobacterium, Alloiococcus, Anaerococcus, Anaeroglobus, Arcanobacterium, Atopobium, Bacillus, Bacteroides, Bartonella, Bergeyella, Bifidobacterium, Bordetella, Bradyrhizobium, Brevundimonas, Bulleidia, Burkholderia, Butyrivibrio",
                "Campylobacter, Capnocytophaga, Catonella, Chlamydophila, Chloroflexi, Clostridiales, Corynebacterium, Cryptobacterium, Desulfobulbus, Desulfomicrobium, Desulfovibrio, Dialister, Dietzia, Dolosigranulum, Eggerthella, Eikenella, Enterococcus, Erysipelothrix, Eubacterium",
                "Filifactor, Finegoldia, Fusobacterium, Gardnerella, Gemella, Granulicatella, Haemophilus, Helicobacter, Johnsonella, Jonquetella, Kingella, Kocuria, Lachnospiraceae, Lactobacillus, Lactococcus, Lautropia, Leptotrichia, Listeria",
                "Megasphaera, Microbacterium, Mitsuokella, Mobiluncus, Mogibacterium, Mollicutes, Mycobacterium, Mycoplasma, Neisseria, Ochrobactrum, Olsenella, Oribacterium, Paenibacillus, Parascardovia, Parvimonas, Peptococcus, Peptoniphilus, Peptostreptococcus, Porphyromonas, Propionibacterium, Pseudoramibacter, Pyramidobacter",
                "Ralstonia, Rhizobium, Rothia, Scardovia, Selenomonas, Shuttleworthia, Simonsiella, Sneathia, Solobacterium, Sphingomonas, Staphylococcus, Streptococcus, Synergistetes, Tannerella, Treponema, Turicella, Veillonella, Yersinia"
              ] }
            ],
            appunti: ["Prodotti: Arcangea → Gengiben; Bromatech → Enterelle, Bifiselle, Lactoselle (in buste); oli essenziali."]
          },
          {
            id: "microbiota-cutaneo", titolo: "Microbiota cutaneo", pag: "32-36", meridiani: ["intestino-tenue"],
            info: [
              "La pelle (circa 1,8 m²) è una barriera secca, acida e povera di nutrienti, eppure ospita un microbiota molto vario, secondo solo all'intestino. La colonizzazione iniziale dipende dal parto (vaginale: microbiota simile alla vagina materna; cesareo: simile alla pelle); in pubertà prevalgono i batteri lipofili (Propionibacterium, Corynebacterium).",
              "La composizione dipende dal tipo di zona: sebacea (Propionibacterium), umida (Staphylococcus, Corynebacterium), secca (la più varia). I funghi invece sono simili su tutto il tronco (Malassezia), più vari sul piede. È il microbiota che cambia di più nel tempo.",
              "Il microbiota cutaneo educa l'immunità innata e adattativa: Staphylococcus epidermidis, per esempio, attiva con forza i linfociti che producono interleuchina 17A. Dermatite atopica, acne, dermatite seborroica e ferite croniche si associano a un microbiota alterato, e un commensale come S. epidermidis può diventare patogeno."
            ],
            tabelle: [{ titolo: "Zone cutanee", col: ["Zona", "Sedi", "Batteri tipici"], righe: [
              ["Secca", "Ipotenar palmare, avambraccio volare", "Propionibacterium acnes, Corynebacterium tuberculostearicum, Streptococcus mitis, Micrococcus luteus"],
              ["Umida", "Piega del gomito e inguinale, spazi fra le dita, fossa poplitea", "Corynebacterium tuberculostearicum, Staphylococcus hominis, epidermidis, capitis"],
              ["Sebacea", "Piega alare, guancia, glabella, condotto uditivo, manubrio sternale, retroauricolare, occipite, dorso", "Propionibacterium acnes, Staphylococcus epidermidis e capitis, Corynebacterium"],
              ["Piede", "Spazio interdigitale, unghia, tallone plantare", "Corynebacterium, Staphylococcus hominis, warneri, epidermidis, haemolyticus; funghi più vari (Trichophyton)"]
            ] }],
            liste: [
              { titolo: "Batteri", items: ["Acinetobacter, Bacillus, Corynebacterium (parvum), Cutibacterium acnes, Demodex folliculorum (acaro), Enhydrobacter, Enterobacter cloacae, Micrococcus (luteus), Mycobacterium, Neisseria, Peptostreptococcus, Propionibacterium, Pseudomonas aeruginosa, Sarcina, Staphylococcus (aureus, epidermidis, haemolyticus), Streptococcus, Veillonella"] },
              { titolo: "Funghi ed eucarioti", items: ["Alternaria alternata, Aspergillus flavus, Candida albicans e parapsilosis, Cryptococcus, Curvularia, Epicoccum, Epidermophyton floccosum, Fusarium, Malassezia (restricta, globosa, sympodialis), Microsporum gypseum, Nannizzia nana, Paecilomyces, Penicillium, Rhizopus stolonifer, Rhodotorula rubra, Scopulariopsis brevicaulis, Torulopsis, Trichophyton (rubrum, mentagrophytes), Trichosporon cutaneum"] },
              { titolo: "Virus", items: ["Fagi di Actinomyces, Enterobacteria, Propionibacterium, Pseudomonas, Staphylococcus, Stenotrophomonas, Streptococcus; Acheta domestica densovirus; Papillomavirus umani (alfa, beta, gamma, mu); Merkel cell polyomavirus e altri polyomavirus; Molluscum contagiosum virus; RD114 retrovirus; Simian virus"] }
            ]
          },
          {
            id: "microbiota-respiratorio", titolo: "Microbiota respiratorio", sotto: "Asse intestino–polmone", pag: "37-40", meridiani: ["polmone", "intestino-crasso"],
            info: [
              "Il polmone ha un nucleo di nove generi (Prevotella, Sphingomonas, Pseudomonas, Acinetobacter, Fusobacterium, Megasphaera, Veillonella, Staphylococcus, Streptococcus), aerobi e anaerobi. Nelle vie aeree si trovano spesso anche Moraxella catarrhalis, Haemophilus influenzae e Streptococcus pneumoniae, che diventano dannosi con le difese basse. Il micobioma comprende Candida, Malassezia, Saccharomyces, Aspergillus.",
              "Il microbiota intestinale può contare più di quello polmonare nelle malattie del polmone: attraverso citochine, metaboliti come gli acidi grassi a catena corta e la migrazione di cellule immunitarie dal tessuto linfoide intestinale, oltre alla micro-aspirazione. Anche la disbiosi fungina intestinale peggiora l'asma; gli antibiotici ad ampio spettro la favoriscono.",
              "Per l'esperienza kinesiologica l'asse è bidirezionale. Intestino e polmone nascono dall'endoderma e condividono il tessuto linfoide delle mucose; in MTC Polmone e Intestino Crasso formano l'elemento Metallo: l'asse è anche energetico."
            ],
            liste: [{ titolo: "Phyla e generi", items: [
              "Phyla: Gammaproteobacteria, Acidobacteria, Firmicutes, Ascomycota, Proteobacteria, Bacteroidetes, Actinobacteria, Crenarchaeota, Thermus, Deinococcus",
              "Generi: Coprococcus, Rothia, Granulicatella, Leuconostoc, Pseudomonas, Lactobacillus, Stenotrophomonas, Haemophilus, Cupriavidus, Actinobacillus, Mycobacterium, Sphingomonas, Corynebacterium, Streptococcus, Fusobacteria, Methylobacterium, Staphylococcus, Neisseria, Leptotrichia, Diaphorobacter, Ornithobacterium, Prevotella, Treponema, Comamonas, Mesorhizobium, Veillonella, Catonella, Mobilicoccus, Microbacterium, Micrococcus, Rhizobium, Lactococcus"
            ] }]
          }
        ]
      },
      {
        id: "procedura-microbiota", titolo: "Procedura del microbiota · divergenti e Luo",
        schede: [
          {
            id: "meridiani-divergenti", titolo: "Meridiani divergenti", sotto: "Appunti del corso", pag: "40-41",
            info: [
              "Il genoma dei batteri del microbiota supera di gran lunga quello umano e produce molte sostanze neuroattive: il 99% dei geni che portiamo è nelle cellule microbiche.",
              "Livelli di formattazione del corso: cervello = conscio; cuore (NeuroCardiologia, VC 14 × VG 17) = subconscio; intestino (NeuroGastroEnterologia, VC 4 × VG 17 + VC 12 × ST 25) = inconscio."
            ],
            tabelle: [{ titolo: "Coppie di divergenti in ordine di gravità", col: ["Coppia", "Meridiani"], righe: [
              ["1ª (più superficiale)", "Vescica – Rene"], ["2ª", "Vescica Biliare – Fegato"], ["3ª", "Stomaco – Milza"],
              ["4ª", "Intestino Tenue – Cuore"], ["5ª", "Triplice Riscaldatore – Maestro del Cuore"], ["6ª (più profonda)", "Polmone – Intestino Crasso"]
            ] }],
            appunti: [
              "Ogni codice genetico dei batteri e virus che ci abitano si aggiunge al nostro genoma. Ogni batterio porta con sé il suo codice evolutivo.",
              "I meridiani divergenti sono l'unione tra Wei Qi (energia difensiva) e Yuan Qi (energia ereditaria): avvenimenti accaduti a livello karmico rimangono «bloccati» in questo tipo di energia.",
              "Hanno la funzione di proteggere da fattori patogeni esterni, compresi quelli emotivi.",
              "Servono a mettere i patogeni non processati in un organo non vitale (anca, spalla, ginocchio: grandi articolazioni) perché non c'era abbastanza Wei Qi (può essere fisica o psicologica). Il Jing è il «freezer» per i patogeni non elaborati.",
              "Schema: il ramo yang parte dalla confluenza inferiore, va in contatto con l'organo e risale alla confluenza superiore, poi il ramo yin.",
              "Vanno a coppie, con 6 livelli di «gravità»: grandi articolazioni, seno, seni della testa…",
              "Il Dai Mai è il meridiano «pattumiera» dove stagnano tutte le «schifezze» non risolte, quindi l'intestino è un luogo di latenza."
            ]
          },
          {
            id: "procedura-microbiota", titolo: "Procedura del microbiota", sotto: "Microbiota sintomatico e causale", pag: "41-43",
            test: "Modo Organo × Modo Batteri in circuito.",
            passi: [
              "Mettere in circuito Modo Organo × Modo Batteri.",
              "Testare quale microbiota riequilibrare (microbiota sintomatico) con i punti della tabella.",
              "Identificare il batterio specifico di quel microbiota (elenco in fondo al capitolo di quel microbiota, o sul sito bacterio.net).",
              "Mettere in circuito il batterio prioritario e approfondire il set up con le informazioni aggiuntive sul batterio.",
              "Testare quale microbiota mantiene lo squilibrio (microbiota causale), con gli stessi punti.",
              "Identificare il batterio di quel microbiota.",
              "Mettere in circuito il batterio prioritario e approfondire il set up.",
              "Trovare l'emozione istintiva prioritaria nella tabella.",
              { t: "Smistamento:", sub: [
                "V 40 × V 10 dà cambio d'indicatore → procedura del divergente di Rene (passo 11).",
                "MP 3 dà cambio d'indicatore → riequilibrio dei meridiani Luo (passo 17)."
              ] }
            ],
            tabelle: [
              { titolo: "Punti dei microbiota", col: ["Punto", "Microbiota"], righe: SITI },
              { titolo: "Emozioni istintive", col: ["Io sono…", "Io mi sento…"], righe: [
                ["Io ho fiducia in me stesso e negli altri", "Io mi sento fiducioso"], ["Io sono attraente", "Io mi sento attraente"],
                ["Io accetto me stesso", "Io mi sento accettato"], ["Io proteggo me stesso", "Io mi sento protetto"],
                ["Io rispetto me stesso", "Io mi sento rispettato"], ["Io amo me stesso", "Io mi sento amato"],
                ["Io sono al sicuro", "Io mi sento al sicuro"], ["Io mi nutro", "Io mi sento nutrito"],
                ["Io sono tranquillo", "Io mi sento tranquillo"], ["Io sono in pace", "Io mi sento in pace"],
                ["Io sono libero (anche dal passato)", "Io mi sento libero (anche dal passato)"],
                ["Io sono un genitore", "Io mi sento un genitore"], ["Io sono un figlio/figlia", "Io mi sento figlio/figlia"],
                ["Io sono un adulto", "Io mi sento adulto"]
              ] }
            ],
            appunti: [
              "L'Akkermansia muciniphila è un probiotico che fa riformare la mucosa.",
              "La tabella delle emozioni è incompleta, ma sono tutti istinti."
            ]
          },
          {
            id: "divergente-rene", titolo: "Divergente di Rene", sotto: "Passi 11-16 della procedura del microbiota", pag: "43-45", meridiani: ["rene", "vescica"],
            test: "V 40 × V 10 (punti di confluenza inferiore e superiore) dà cambio d'indicatore.",
            passi: [
              "Stimolare contemporaneamente V 40 × V 10 per aprire il divergente di Rene, prima su un lato e poi sull'altro.",
              "Stimolare VG 22.",
              "Stimolare R 1.",
              "Testare e stimolare le «Finestre del Cielo» prioritarie.",
              "Testare e stimolare le «Porte della Terra» prioritarie.",
              "Stimolare IC 4."
            ],
            tc: ["V 40 × V 10 (un lato, poi l'altro)", "VG 22", "R 1 (lato opposto)", "Finestre del Cielo prioritarie", "Porte della Terra prioritarie", "IC 4"],
            appunti: [
              "V 40 × V 10 lo testo da entrambi i lati.",
              "Questo meridiano ha come area di latenza gli intestini.",
              "VG 22 è il punto che riporta il patogeno da inconscio a conscio, per poi buttarlo fuori.",
              "R 1 è il punto di scarico: sul lato opposto a quello da cui siamo partiti (solo dal lato opposto se la coppia iniziale era da un lato solo; altrimenti inizio dal lato opposto al primo e poi faccio anche l'altro lato).",
              "Le Finestre del Cielo servono a portare una nuova informazione dopo aver lasciato il «vecchio».",
              "Le Porte della Terra hanno 2 funzioni: eliminare ciò che non serve più e consolidare ancora meglio la cosa nuova.",
              "IC 4 serve a stabilizzare il lavoro fatto su Rene."
            ]
          },
          {
            id: "finestre-del-cielo", titolo: "Finestre del Cielo", pag: "44",
            info: ["Si testano e si stimolano quelle prioritarie (passo 14 della procedura del microbiota)."],
            tabelle: [{ titolo: "Punti", col: ["Punto", "Punto"], righe: [
              ["V 10", "IT 16"], ["IT 17", "TR 16"], ["ST 9", "IC 17"], ["VG 16", "VC 22"], ["P 3", "MC 1"]
            ] }],
            appunti: ["Aprono a energie sottili pure e sono strettamente legate ai sensi: di solito si usa luce, suono, solidi platonici o digitopressione leggera."]
          },
          {
            id: "porte-della-terra", titolo: "Porte della Terra", pag: "45",
            info: ["Si testano e si stimolano quelle prioritarie (passo 15 della procedura del microbiota)."],
            tabelle: [{ titolo: "Punti", col: ["Punto", "Punto"], righe: [
              ["V 40", "V 35"], ["VG 1", "VG 4"], ["VB 30", "VC 1"], ["VC 4", "VC 6"], ["ST 30", "MP 12"], ["F 12", "R 11"]
            ] }],
            appunti: ["Digitopressione forte o suono."]
          },
          {
            id: "meridiani-luo", titolo: "Meridiani Luo", sotto: "Passi 17-22 della procedura del microbiota", pag: "46-50",
            test: "MP 3 dà cambio d'indicatore (passo 10 della procedura del microbiota).",
            passi: [
              "Testare VG 1 (globalmente), V 58 (energeticamente), ST 40 (psicologicamente) e stimolare solo il prioritario: come ci poniamo e interagiamo con l'ambiente.",
              "Stimolare il punto o i punti del microbiota squilibrato trovato al passo 5 (tabella).",
              "Testare se stimolare i punti del Nutrimento dall'ambiente: C 5, VC 6.",
              "Testare se stimolare i punti del momento specifico del Nutrimento: R 16 fetale, V 51 bambino, V 43 e V 53 adulto.",
              "Testare e correggere i punti metaforici / strutture simboliche con cui interagire meglio con l'ambiente (tabella).",
              "Testare il punto prioritario per la capacità di essere coscienti ed esprimere se stessi nell'ambiente: VB 37 o VC 15."
            ],
            tabelle: [
              { titolo: "Punti per microbiota (passo 18)", col: ["Microbiota", "Punti"], righe: [
                ["Orale", "IC 6, C 5"], ["Respiratorio", "IC 6, ST 40"], ["Intestinale", "V 58, R 4"],
                ["Uro-genitale", "F 5"], ["Vaginale", "F 5"], ["Prostatico", "F 5"], ["Cutaneo", "IT 7"]
              ] },
              { titolo: "Momento del Nutrimento (passo 20)", col: ["Punto", "Nutrimento"], righe: [
                ["R 16", "Fetale"], ["V 51", "Bambino"], ["V 43", "Adulto"], ["V 53", "Adulto"]
              ] },
              { titolo: "Punti metaforici / strutture simboliche (passo 21)", col: ["Struttura", "Punto"], righe: [
                ["Globalmente", "MP 21"], ["Gamba", "ST 40"], ["Mano", "P 7"], ["Colonna vertebrale", "VG 1"],
                ["Piede", "VB 37"], ["Cervicale", "MC 6"], ["Braccio", "IT 7"], ["Lombare", "R 4"], ["Gomito", "TR 5"]
              ] }
            ],
            appunti: [
              "I meridiani Luo mettono in comunicazione il centro dell'essere con l'ambiente ed esprimono sia la capacità di interagire con l'ambiente sia il risultato di questa interazione. Il microbiota è esattamente la risultante di come l'ambiente è rimasto «appiccicato» a me.",
              "Passo 17: ne stimolo solo uno.",
              "VG 16: posso picchiettarlo per aggiungere informazioni, poi correggo con R 16.",
              "Passo 21: chiedere alla persona che significato ha per lei quella parte del corpo."
            ]
          }
        ]
      },
      {
        id: "leaky-gut", titolo: "Leaky Gut · i sei livelli energetici",
        schede: [
          {
            id: "leaky-gut-teoria", titolo: "Leaky Gut Syndrome", sotto: "Sindrome dell'intestino permeabile", pag: "51-56", meridiani: ["intestino-tenue", "vescica"],
            info: [
              "L'ipotesi è che un intestino troppo permeabile lasci entrare nel sangue antigeni alimentari, tossine e patogeni, scatenando una risposta immunitaria eccessiva: intolleranze, allergie, malattie autoimmuni. Il manuale avverte che più ci si allontana dalla medicina ufficiale, più disturbi le vengono attribuiti.",
              "La barriera intestinale è fatta di mucosa con villi e giunzioni strette, sistema immunitario (oltre metà delle cellule immunitarie), enzimi digestivi, antibiotici naturali (defensine), muco e flora. Non a caso l'Intestino Tenue appartiene al Tai Yang, il livello più esterno: il confine fra ambiente esterno e interno.",
              "Cause: infiammazione cronica da cattiva digestione e stress, eccessi di zuccheri, cereali raffinati, glutine e caseina, additivi e micotossine, antibiotici o cortisone prolungati, lassativi, disbiosi (per le cause della disbiosi vedi le sindromi di NeuroGastroEnterologia 1). Le cellule immunitarie attivate migrano e possono innescare infiammazioni e autoimmunità a distanza.",
              "Sintomi attribuiti: depressione, ansia, iperattività, dolori articolari e muscolari, mal di testa, fatica cronica, colon irritabile, stipsi o diarrea, ipotiroidismo.",
              "Energeticamente corrisponde a un deficit di difesa del Tai Yang (Vescica e Intestino Tenue): va rinforzato, ma se lo squilibrio è già passato ad altri livelli bisogna trovare il livello coinvolto e partire da lì (procedura successiva)."
            ],
            tabelle: [{ titolo: "Programma delle 4R (J. Bland)", col: ["Fase", "Cosa fare"], righe: [
              ["1 · Rimuovere", "Alimenti pro-infiammatori e allergizzanti (zuccheri, grani raffinati, glutine, caseina, dolcificanti, glutammato), irritanti (spezie, alcol, cotture lunghe o ad alta temperatura, legumi) e fattori patogeni (allergeni, patogeni, metalli, chimici, radiazioni)"],
              ["2 · Sostituire", "Verificare enzimi e acido gastrico con NeuroGastroEnterologia 2; brodo di carne, yogurt se tollerato, kefir e kombucha, semi e frutta secca, fibre secondo tolleranza"],
              ["3 · Reinoculare", "Riequilibrio con NeuroGastroEnterologia 1 e 2; probiotici (Acidophilus, Bifidobacterium, 3-5 miliardi) con prebiotici (inulina, FOS, GOS); conviene partire da Saccharomyces boulardii. Fino a 3 mesi"],
              ["4 · Riparare", "Dopo due settimane: L-glutammina 6-10 g, acido pantotenico 500-1000 mg, zinco citrato 10 mg, omega 3 1-3 g, vitamina E 400 mg, L-glicina 6-10 g, collagene e precursori, vitamina A, vitamina C (1000 mg), biotina 2000 mcg, silice"]
            ] }],
            liste: [
              { titolo: "Fitoterapia", items: ["Cicatrizzanti: radice di liquirizia, gel di aloe, echinacea, centella asiatica, bambù tabashir", "Antinfiammatori: boswellia, curcuma"] },
              { titolo: "Antimicrobici per la sovracrescita intestinale (formula «Repair» della diapositiva)", items: ["Artemisia annua 400 mg", "Foglia di olivo 300 mg", "Berberina solfato 200 mg", "Origano 200 mg", "Timo 200 mg", "Semi di pompelmo 150 mg", "Mallo di noce nera 100 mg", "Uva ursina 100 mg", "Artiglio del diavolo (Uncaria tomentosa) 100 mg"] },
              { titolo: "Alimenti per la riparazione", items: ["Okra, cavolo, cipolla, aglio, carciofi, topinambur, curcuma / zenzero"] }
            ],
            appunti: [
              "La L-glutammina può portare a crisi asmatiche in soggetti sensibili: al massimo 3 compresse da 500 mg al giorno.",
              "Argilla di sole della Argital.",
              "L'uva ursina funziona sia sulla vescica che sull'intestino."
            ]
          },
          {
            id: "leaky-gut-procedura", titolo: "Procedura della Leaky Gut", pag: "57-58",
            test: [FORMAT_NGE, "Testare MP 3: se dà cambio d'indicatore, riequilibrare la Leaky Gut."],
            passi: [
              "Mettere in circuito il Format di NeuroGastroEnterologia (VC 4 × VG 17 + VC 12 × ST 25).",
              "Testare MP 3: cambio d'indicatore = Leaky Gut da riequilibrare.",
              "Testare i 6 punti chiave dei livelli energetici.",
              "Livello Yang → riequilibrare i livelli Yang (scheda del livello).",
              "Livello Yin → riequilibrare i livelli Yin (scheda del livello)."
            ],
            tabelle: [{ titolo: "6 punti chiave · progressione difensiva", col: ["Livello", "Punto chiave", "Meridiani"], righe: [
              ["1° Tai Yang", "V 62", "Vescica, Intestino Tenue"], ["2° Yang Ming", "TR 5", "Stomaco, Intestino Crasso"],
              ["3° Shao Yang", "VB 41", "Vescica Biliare, Triplice Riscaldatore"], ["4° Tai Yin", "MP 4", "Milza, Polmone"],
              ["5° Shao Yin", "R 6", "Rene, Cuore"], ["6° Jue Yin", "MC 6", "Fegato, Maestro del Cuore"]
            ] }],
            appunti: [
              "Progressione difensiva contro un patogeno esterno: 1° livello Tai Yang (i sintomi della sera prima di ammalarsi), 2° Yang Ming (difesa del corpo), 3° Shao Yang, 4° Tai Yin, 5° Shao Yin, 6° Jue Yin (Fegato – Maestro del Cuore).",
              "La trombosi è il calore che penetra lo Jue Yin.",
              "1 g di N-acetilcisteina."
            ]
          },
          yang("tai-yang", "Tai Yang", "V 62", ["vescica", "intestino-tenue"], "Vescica", "Intestino Tenue",
            ["V 67", "IT 1"], ["V 65", "IT 3"], ["V 60", "IT 5"], ["V 40", "IT 8"], "V 57", "ST 36, IC 11", "59",
            ["Sintomi: quadro lieve con brividi, febbre, rigidità e mal di testa; tensione alla nuca e in zona lombare, dolore lungo la colonna, avversione al freddo."]),
          yang("yang-ming", "Yang Ming", "TR 5", ["stomaco", "intestino-crasso"], "Stomaco", "Intestino Crasso",
            ["ST 45", "IC 1"], ["ST 43", "IC 3"], ["ST 41", "IC 5"], ["ST 36", "IC 11"], "V 57", "VB 40, TR 4", "60",
            ["Sintomi: eccesso di Yang più profondo, febbre senza brividi, avversione al caldo, sudorazione abbondante, addome disteso e stitichezza, dolore agli occhi, naso secco e respiro difficoltoso, sinusiti, riniti, reazioni allergiche."]),
          yang("shao-yang", "Shao Yang", "VB 41", ["vescica-biliare", "triplice-riscaldatore"], "Vescica Biliare", "Triplice Riscaldatore",
            ["VB 44", "TR 1"], ["VB 41", "TR 3"], ["VB 38", "TR 6"], ["VB 34", "TR 10"], "IC 9", "MP 3, P 9", "61",
            ["Sintomi: metà esterno e metà interno, metà eccesso e metà deficit; fastidio al petto, alternanza di caldo e freddo, acufeni, dolore a torace e anche, infezioni delle basse vie respiratorie."]),
          yin("tai-yin", "Tai Yin", "MP 4", ["milza", "polmone"], "Milza", "Polmone",
            ["MP 3", "P 9"], ["MP 9", "P 5"], ["F 13", "P 1"], ["V 20", "V 13"], "62",
            ["Sintomi: brividi, addome disteso con dolore occasionale, gola secca, pienezza epigastrica, poco appetito, astenia, sintomi respiratori, gastrite; può comparire tiroidite."],
            ["Lo Shu del Polmone è V 13 (nell'esempio del testo stampato c'era V 12, corretto a mano)."]),
          yin("shao-yin", "Shao Yin", "R 6", ["rene", "cuore"], "Rene", "Cuore",
            ["R 3", "C 7"], ["R 10", "C 3"], ["VB 25", "VC 14"], ["V 23", "V 15"], "63",
            ["Sintomi: polso debole, ansia, diarrea, brividi, estremità fredde, bocca e lingua secche con sete, secchezza estrema delle mucose (come nella sindrome di Sjögren), sonnolenza: si esauriscono i liquidi Jin-Ye dello Stomaco che producono la Wei Qi."]),
          yin("jue-yin", "Jue Yin", "MC 6", ["fegato", "maestro-cuore"], "Fegato", "Maestro del Cuore",
            ["F 3", "MC 7"], ["F 8", "MC 3"], ["F 14", "VC 17"], ["V 18", "V 14"], "64",
            ["Sintomi: agitazione, retrazione dello scroto, menopausa precoce, sete, difficoltà a urinare, collasso fisico."],
            ["La trombosi è il calore che penetra lo Jue Yin."]),
          {
            id: "punti-trasporto", titolo: "I 5 punti di trasporto", sotto: "Shu antichi", pag: "dopo 64",
            info: ["Diapositiva del corso, utile per i livelli energetici. I punti vanno dal distale al prossimale."],
            tabelle: [
              { titolo: "Meridiani Yin", col: ["Meridiano", "Jing-pozzo (Legno)", "Ying-sorgente (Fuoco)", "Shu-torrente (Terra)", "Jing-fiume (Metallo)", "He-mare (Acqua)"], righe: [
                ["Polmone", "P 11", "P 10", "P 9", "P 8", "P 5"], ["Maestro del Cuore", "MC 9", "MC 8", "MC 7", "MC 5", "MC 3"],
                ["Cuore", "C 9", "C 8", "C 7", "C 4", "C 3"], ["Milza", "MP 1", "MP 2", "MP 3", "MP 5", "MP 9"],
                ["Fegato", "F 1", "F 2", "F 3", "F 4", "F 8"], ["Rene", "R 1", "R 2", "R 3", "R 7", "R 10"]
              ] },
              { titolo: "Meridiani Yang", col: ["Meridiano", "Jing-pozzo (Metallo)", "Ying-sorgente (Acqua)", "Shu-torrente (Legno)", "Jing-fiume (Fuoco)", "He-mare (Terra)"], righe: [
                ["Intestino Crasso", "IC 1", "IC 2", "IC 3", "IC 5", "IC 11"], ["Triplice Riscaldatore", "TR 1", "TR 2", "TR 3", "TR 6", "TR 10"],
                ["Intestino Tenue", "IT 1", "IT 2", "IT 3", "IT 5", "IT 8"], ["Stomaco", "ST 45", "ST 44", "ST 43", "ST 41", "ST 36"],
                ["Vescica Biliare", "VB 44", "VB 43", "VB 41", "VB 38", "VB 34"], ["Vescica", "V 67", "V 66", "V 65", "V 60", "V 40"]
              ] }
            ]
          }
        ]
      },
      {
        id: "viroma", titolo: "Viroma · procedure innata e acquisita",
        schede: [
          {
            id: "viroma-teoria", titolo: "Il viroma", pag: "65-71",
            info: [
              "Il viroma è l'insieme dei virus associati al microbiota. Quello intestinale è molto personale ma stabile nel tempo ed è dominato dai batteriofagi (fagi), che uccidono i batteri ospiti, trasferiscono geni fra ceppi e conferiscono loro tossine, fattori di virulenza e flessibilità metabolica, ma anche stabilità e resistenza alle invasioni.",
              "Nell'intestino prevalgono i Caudovirales (in particolare i crAssphage, fino al 90% della comunità virale) e i Microviridae; i virus eucarioti sono pochi. La maggior parte dei virus intestinali non ha involucro lipidico, che non resisterebbe a bile e disidratazione: i coronavirus sono un'eccezione.",
              "Bocca: Caudovirales e, fra gli eucarioti, Anelloviridae e Redondoviridae (aumentati in parodontite e malattie respiratorie gravi). Vie respiratorie: Anello- e Redondoviridae, fagi che vengono in gran parte dalla bocca. Sangue: soprattutto Anelloviridae. Pelle: poca biomassa, polyoma-, papilloma-, circovirus. Urogenitale: fagi e papillomavirus. Sistema nervoso: pochi virus; gli herpesvirus possono restare latenti e riattivarsi.",
              "Le gastroenteriti virali danno dolore e crampi addominali, nausea, vomito, diarrea, a volte febbre."
            ],
            tabelle: [{ titolo: "Principali virus intestinali", col: ["Virus", "Note"], righe: [
              ["Rotavirus", "Bambini di 3-15 mesi; 3-7 giorni; autunno e inverno"],
              ["Norovirus", "Prima causa negli adulti (focolai sulle navi da crociera); 1-3 giorni; tutto l'anno"],
              ["Adenovirus", "Bambini fino a 2 anni; 5-12 giorni; tutto l'anno"],
              ["Astrovirus", "Fra le principali cause di gastroenterite nei bambini"]
            ] }],
            liste: [{ titolo: "Viroma umano (famiglie)", items: [
              "Ackermannviridae, Adenoviridae, Ampullaviridae, Anelloviridae, Astroviridae, Autolykiviridae, Bicaudaviridae, Caliciviridae, Caudoviridae, Circoviridae, Clavaviridae, Corticoviridae, Cystoviridae",
              "Finnlakeviridae, Fuselloviridae, Geminiviridae, Globuloviridae, Guttaviridae, Herpesviridae, Inoviridae, Leviviridae, Lipothrixviridae, Marseilleviridae, Microviridae, Mimiviridae, Myoviridae, Nanoviridae",
              "Papillomaviridae, Parvoviridae, Phycodnaviridae, Picornaviridae, Plasmaviridae, Pleolipoviridae, Podoviridae, Polyomaviridae, Portogloboviridae, Redondoviridae, Reoviridae, Rudiviridae",
              "Siphoviridae, Sphaerolipoviridae, Spiraviridae, Tectiviridae, Tristromaviridae, Turriviridae, Virgaviridae"
            ] }],
            appunti: [
              "I virus sono la rappresentazione fisica dei sistemi di credenza, che sono collettivi: la forma + credo, idea o tradizione.",
              "Uno Shen si comporta come un virus e può «infettare» un altro Shen."
            ]
          },
          {
            id: "memetica-shen", titolo: "Memetica, Shen e Jing", sotto: "Diapositive del corso", pag: "dopo 71",
            info: [
              "La memetica studia come idee e tracce mentali (i «memi») passano da persona a persona, come la genetica studia i geni trasmessi ai discendenti. Un bagaglio memetico malato crea danni e non basta cambiare un comportamento se i memi sottostanti restano attivi; uno sano amplifica il potenziale personale. A differenza della genetica, la memetica è modificabile e si propaga quasi all'istante.",
              "Nella visione cinese l'uomo è Qi; Shen e Jing non gli appartengono ma servono alla sua esistenza. Quando si uniscono il Jing della madre e quello del padre arriva lo Shen, che porta un programma da compiere (Tian Ming, il mandato del Cielo): sfide da superare che, se non risolte, lo Shen riporta con sé e dovrà riaffrontare.",
              "Lo Zong Qi lega lo Shen agli antenati: il Jing appartiene alla linea di sangue, quindi ci sono questioni che vengono dallo Shen e questioni che vengono dal Jing e appartengono allo Shen degli antenati."
            ],
            appunti: [
              "Tian Ming (Cielo, destino): quella frazione di destino che lo Shen deve ancora fare per diventare perfetto.",
              "Zong Qi: energia respiratoria ed energia dei nostri antenati."
            ]
          },
          {
            id: "procedura-viroma", titolo: "Procedura del viroma", pag: "72-74",
            test: "Format del viroma: Modo Virus × Modo Organo + TR 7 sx × IT 11. Se dà cambio d'indicatore la procedura è appropriata.",
            passi: [
              "Mettere in circuito il Format del viroma: Modo Virus × Modo Organo + TR 7 sinistro × IT 11.",
              "Cambio d'indicatore = procedura appropriata.",
              "Testare i punti della tabella per identificare il viroma specifico.",
              "Identificare il virus specifico con una sfida verbale (elenco nella scheda «Il viroma»).",
              { t: "Testare TR 5 e MC 6:", sub: [
                "TR 5 (barriera esterna) dà cambio d'indicatore → procedura acquisita.",
                "MC 6 (barriera interna) dà cambio d'indicatore → procedura innata."
              ] }
            ],
            tabelle: [{ titolo: "Punti dei viromi", col: ["Punto", "Viroma"], righe: SITI.concat([["MP 10", "Sanguigno"], ["VG 16", "Sistema nervoso"]]) }],
            appunti: [
              "TR 7: punto di riunione degli antenati.",
              "IT 11: punto di riunione celeste.",
              "TR 5: il virus arriva dall'ambiente. MC 6: arriva dagli antenati.",
              "Prodotti omeopatici per i virus: Engistol (Heel); R⁠88 Devirol (Dr. Reckeweg); Labolife 2LEBV per l'Epstein-Barr, ciclo di 30 giorni con capsule da prendere aprendole."
            ]
          },
          {
            id: "procedura-innata", titolo: "Procedura innata", sotto: "Barriera interna · MC 6", pag: "75-78",
            test: "MC 6 dà cambio d'indicatore nella procedura del viroma.",
            passi: [
              "Toccare MP 4, metterlo in circuito e testare un muscolo indicatore.",
              "Continuare a toccare e mettere in circuito MP 4 finché si ottiene un cambio d'indicatore.",
              "Il numero di volte che MP 4 è stato messo in circuito indica la generazione genealogica da cui deriva il sistema di credenza.",
              "Identificare l'organo straordinario che mantiene l'informazione genetica (tabella).",
              "Stimolare VB 40.",
              "Stimolare i punti dell'organo straordinario trovato, con un magnete o i solidi platonici.",
              "Testare MP 3, VC 17, IC 18 e correggerli insieme al punto precedente.",
              "Correggere VG 4 insieme a VG 11.",
              "Stimolare con olio essenziale di salvia: TR 7, IT 11, VC 17, VC 22, VB 19.",
              "Controllare se ci sono altre correzioni da fare."
            ],
            tc: ["VB 40", "Punti dell'organo straordinario (magnete o solidi platonici)", "MP 3, VC 17, IC 18 (quelli testati)", "VG 4 × VG 11", "Olio di salvia su TR 7, IT 11, VC 17, VC 22, VB 19"],
            tabelle: [{ titolo: "Organi straordinari", col: ["Organo", "Punto di test", "Punto da stimolare"], righe: [
              ["Cervello", "VG 16", "VB 20"], ["Midollo", "VB 39", "VB 8 sinistro"], ["Vescica Biliare", "VB 34", "VB 34"],
              ["Utero", "Zigong", "VB 26"], ["Vasi", "P 9", "VB 22"], ["Ossa", "V 11", "VB 29"]
            ] }],
            appunti: [
              "MP 4: punto nonno e nipote.",
              "VB 40: punto di purificazione del Jing degli organi straordinari.",
              "I punti dell'organo straordinario li stimolo insieme ai punti del passo 7.",
              "Olio di salvia: devo stimolarli tutti in ordine; l'unico che potrei testare è VB 19.",
              "IT 11: punto di riunione del Cielo."
            ]
          },
          {
            id: "procedura-acquisita", titolo: "Procedura acquisita", sotto: "Barriera esterna · TR 5", pag: "79-82", meridiani: ["polmone", "intestino-crasso"],
            test: "TR 5 dà cambio d'indicatore nella procedura del viroma.",
            passi: [
              "Stimolare R 22, P 8, VG 20.",
              "Stimolare ST 12, IC 18, IC 17.",
              "Testare IC 15 (divergente di Intestino Crasso) e P 1 (divergente di Polmone) per scegliere il meridiano divergente.",
              "Testare tutti i punti del divergente trovato.",
              "Stimolare ogni punto 3 volte (dinamico e superficiale, statico e profondo, dinamico e superficiale), dal più distale al più prossimale.",
              "Stimolare VG 23.",
              "Stimolare gli stessi punti dal più prossimale al più distale.",
              "Stimolare IC 1 se si è lavorato sul divergente di Intestino Crasso.",
              "Stimolare P 11 se si è lavorato sul divergente di Polmone.",
              "Stimolare con olio essenziale di salvia: TR 7, IT 17, VC 17, VC 22, VG 20.",
              "Rinforzare la protezione esterna stimolando TR 5, VG 14, V 11."
            ],
            tc: ["R 22, P 8, VG 20 (bilaterali)", "ST 12 × IC 18 per lato, poi IC 17", "Punti del divergente (3 stimolazioni ciascuno)", "VG 23", "IC 1 o P 11", "Olio di salvia su TR 7, IT 17, VC 17, VC 22, VG 20", "TR 5, VG 14, V 11"],
            appunti: [
              "R 22, P 8, VG 20: bilaterali, senza testarli, per lavorare sulla Wei Qi.",
              "ST 12, IC 18, IC 17 sono 1 finestra del cielo e 2 punti di confluenza: ST 12 confluenza inferiore, IC 18 confluenza superiore. Stimolo ST 12 × IC 18 per lato, poi IC 17 bilaterale.",
              "IC 15 e P 1: questi due non passano per il cuore, quindi sono inconsci.",
              "Ciclo di stimolazioni: la 1ª volta con la digitopressione; la 2ª con il suono (diapason): per la stimolazione veloce lo muovo, per il profondo lo tengo fermo; la 3ª con il diapason passo facendo il giro senza soffermarmi."
            ]
          },
          {
            id: "divergente-polmone", titolo: "Divergente di Polmone", pag: "81", meridiani: ["polmone"],
            test: "P 1 dà cambio d'indicatore (passo 3 della procedura acquisita).",
            tabelle: [{ titolo: "Punti", col: ["Punto"], righe: [["P 1"], ["VB 22"], ["ST 12"], ["IC 18"], ["VG 23"]] }],
            appunti: [
              "Se inizio a destra: P 1 dx → VB 22 dx → ST 12 dx → IC 18 dx → VG 23 → IC 18 sx → ST 12 sx → VB 22 sx → P 1 sx; se inizio a sinistra il contrario. Ogni punto va stimolato con le 3 stimolazioni.",
              "Stimolo solo i punti testati; VG 23 sempre."
            ]
          },
          {
            id: "divergente-intestino-crasso", titolo: "Divergente di Intestino Crasso", pag: "83-84", meridiani: ["intestino-crasso"],
            test: "IC 15 dà cambio d'indicatore (passo 3 della procedura acquisita).",
            tabelle: [{ titolo: "Punti", col: ["Punto"], righe: [["IC 15"], ["VG 14"], ["ST 15"], ["ST 16"], ["ST 17"], ["ST 12"], ["IC 18"], ["ST 8"], ["VG 23"]] }],
            info: ["Stessa sequenza del divergente di Polmone: dal distale al prossimale, VG 23, poi a ritroso; si chiude con IC 1."]
          }
        ]
      },
      {
        id: "diarrea-stipsi", titolo: "Diarrea e stipsi in MTC",
        schede: [
          {
            id: "diarrea-stipsi-format", titolo: "Diarrea o stipsi: il test", pag: "85, 93", meridiani: ["intestino-crasso"],
            test: [FORMAT_NGE, "Modo Organo + VC 17 × IC 2 (IC 2 = defecazione): IC 2 a tocco leggero → diarrea; a tocco forte → costipazione."],
            info: [
              "In MTC la diarrea (Xie Xie) acuta dipende di solito da fattori esterni (dieta, clima), quella cronica da stati di deficit o da disarmonia fra Fegato e Milza.",
              "Cause occidentali: acuta alimentare, infettiva (virus, salmonella, shigella, ameba, giardia) o tossica; cronica da infezioni persistenti, malattie infiammatorie intestinali, malassorbimento, disturbi endocrini, colon irritabile."
            ],
            tabelle: [{ titolo: "Quadri MTC", col: ["Disturbo", "Quadri"], righe: [
              ["Diarrea acuta", "Fattori patogeni esterni (Freddo) · Freddo-Umidità · Umidità-Calore · Indigestione"],
              ["Diarrea cronica", "Disarmonia Fegato-Milza · Deficit di Qi della Milza · Deficit di Yang di Milza e Rene"],
              ["Stipsi", "Calore e secchezza · Stasi di Qi del Fegato · Deficit di Qi di Milza e Polmone · Deficit di Sangue · Deficit di Yang e Freddo interno"]
            ] }],
            appunti: [
              "Diarrea ⇒ Freddo; stipsi ⇒ Caldo.",
              "Diarrea acuta: freddo o umido.",
              "Diarrea da indigestione: posso usare i punti di discesa dello Stomaco."
            ]
          },
          quadro("diarrea-freddo", "Diarrea acuta da invasione di Freddo", "85-86", ["milza", "stomaco"],
            "Modo del Tempo + glabella picchiettata 2 volte (Freddo); poi Modo Organo e test dei punti d'allarme di Milza, Intestino Tenue, Intestino Crasso (volendo anche Stomaco).",
            ["Freddo esterno puro o secondario a deficit di Yang della Milza, in Milza, Intestino Tenue o Crasso: dolore periombelicale che migliora con pressione e calore, feci acquose o molli senza odore forte, urine chiare e frequenti, borborigmi, peggioramento con cibi freddi.",
             "Corrispondenze occidentali: candida, allergie alimentari, enteriti, dissenteria acuta, disturbi digestivi da stress."],
            ["Milza: VC 12, MP 4, VC 8, ST 25, ST 36", "Intestino Tenue: VC 6, ST 25, ST 39, ST 36, V 20, V 27", "Intestino Crasso: ST 37, ST 25, ST 36, MP 6, F 3, ST 27"],
            ["Alimenti che scaldano il Riscaldatore Inferiore: sorgo, trippa di maiale, fagiolini, scalogno, noce moscata, zenzero secco, rosmarino, olio di girasole e di soia, pinoli, semi di girasole, prugne umeboshi, caffè"],
            ["Amaranto, grano saraceno, coniglio, lardo, latte e latte di soia, formaggi, burro, panna, yogurt", "Alghe, cavolo, lattuga, spinaci, scarola, rafano, melanzana, champignon, avocado, banana, cachi, limone"],
            ["Sindrome da infezione virale (come il COVID) dello Stomaco e della Milza: lo Yang di Milza scalda lo Stomaco.",
             "Devo controllare anche se c'è l'Umido, picchiettando anche 3 volte.",
             "I punti d'allarme si testano, ma correggo con i punti della Milza."]),
          quadro("diarrea-freddo-umidita", "Diarrea acuta da Freddo-Umidità", "86", ["milza"],
            "Modo del Tempo + glabella picchiettata 2 volte + 3 volte (Freddo + Umido).",
            ["Da Umidità esterna (cibi e bevande freddi o crudi, clima umido) o da deficit di Qi o di Yang della Milza, che non trasforma i liquidi. Se prevale il Freddo si associa a ristagno di liquidi nello Stomaco; l'Umidità esterna è acuta e improvvisa, quella interna si accumula piano.",
             "Altri sintomi: poco appetito, pienezza epigastrica, freddo all'epigastrio che migliora col calore, pesantezza di testa e corpo, bocca dolciastra o insapore, niente sete, feci molli, stanchezza, nausea, edema, colorito pallido, leucorrea bianca."],
            ["MP 3", "MP 6", "MP 9", "ST 8", "VC 12"],
            ["Diuretici: segale, mais, asparagi, porcini, soia gialla, piselli, cavolo, rapa, caffè", "Spezie calde: cannella, cardamomo, zenzero secco, peperoncino, anice, rosmarino, prezzemolo, erba cipollina"],
            ["Formaggi, yogurt, carne di cavallo, vongole, alghe, crescione, cetrioli, cavolo, cicoria, champignon, insalata belga, scarola, tarassaco, zucca", "Tè verde, anguria, cachi, melone, more di gelso, pompelmo"]),
          quadro("diarrea-calore-umidita", "Diarrea acuta da Calore-Umidità", "86-87", ["intestino-crasso", "milza"],
            "Modo del Tempo + glabella picchiettata 2 volte (così negli appunti).",
            ["Colpisce soprattutto l'Intestino Crasso (anche Milza, Fegato e Vescica Biliare). Cause: cibi grassi, clima caldo-umido, tristezza e preoccupazione croniche (emozioni di Polmone e Intestino Crasso) che bloccano l'energia e generano calore.",
             "Sintomi: dolore addominale non alleviato dall'evacuazione, diarrea con muco (umidità) e sangue (calore intenso), feci maleodoranti, bruciore anale, urine scarse e scure, febbre con sudore che non la abbassa, sete senza voglia di bere, pesantezza di corpo e arti, rigidità toracica."],
            ["Intestino Crasso: MP 6, MP 9, V 20, V 22, V 25, ST 25, ST 27, ST 37, IC 11, VC 6, VC 12", "Milza: MP 6, MP 9, V 20, VB 34, IC 11, VG 9", "Niente moxa"],
            ["Diuretici: segale, mais, asparagi, porcini, soia gialla, piselli, cavolo, rapa, granchio, germogli di alfa alfa, carciofo, catalogna, cicoria, tarassaco, rucola, sedano, salvia, origano, mela, ribes", "Rinfrescanti: amaranto, ceci, piselli, zucchina, melanzana, salsa di soia"],
            ["Pepe, peperoncino, zenzero secco, caffè, alcolici, aglio, cipolla, scalogno, peperone rosso", "Cervo, agnello, capra, pecora, formaggi stagionati, olio di soia"]),
          quadro("diarrea-fegato-milza", "Diarrea cronica da disarmonia Fegato-Milza", "87-89", ["fegato", "milza"],
            "Modo Organo × punto d'allarme del Fegato, poi test del punto d'allarme della Milza.",
            ["Il Fegato (che nei 5 elementi controlla la Milza) diffonde il Qi e drena gli scarti; se ristagna, il drenaggio diventa lento o caotico. La Milza danneggiata (crudità, farine, cibi grassi, bevande ghiacciate, preoccupazione, pasti irregolari, superlavoro) produce umidità e muco e non genera abbastanza Sangue: il Fegato, carente di Sangue, diventa iperattivo e indebolisce ancora la Milza, in un circolo vizioso.",
             "Caffè, tabacco e alcol causano e aggravano il quadro.",
             "Sintomi: eruttazioni, reflusso, gonfiore, gas, alvo irregolare, dolore sotto le costole, irregolarità mestruali e tensione al seno, stanchezza, feci molli, vertigini, mal di testa, caldo e freddo alternati, mani e piedi freddi, depressione, ansia, bocca amara e secca, insonnia, irritabilità, sogni frequenti."],
            ["ST 36", "MP 4", "F 3", "F 14", "VC 12", "TR 6"],
            ["Cibi caldi e sempre cotti, poche spezie", "Che muovono il Qi: segale, grano, cavallo, spinaci, sedano, porri, peperone verde, cipolla, cavolo rosso, verza, aglio, scarola, ravanello, finocchio, erba cipollina, timo, senape, salvia, prezzemolo, curcuma, cumino, chiodi di garofano, cardamomo, capperi, basilico, anice, aneto, alloro, zafferano, uva, pesca, scorza di agrumi, camomilla", "Che drenano l'umidità: patate, rapa, funghi (porcini), cavolo, merluzzo, carpa, sogliola, sgombro"],
            EVITA_FREDDI,
            ["Il Fegato in eccesso inibisce la Milza.", "Devo prima avere Modo Organo + punto d'allarme del Fegato in circuito, poi testo il punto d'allarme della Milza."]),
          quadro("diarrea-qi-milza", "Diarrea cronica da vuoto di Qi della Milza", "89-90", ["milza"],
            "Format delle sindromi: V 37 × MP 13 + Modo Anatomia (vedi il manuale delle sindromi); punto valido R 13 (Qi).",
            ["La Milza debole digerisce male: diarrea con cibo non digerito o feci molli e appiccicose, gonfiore, gas, stanchezza, poco appetito; negli anziani può dare anche stitichezza per mancanza di forza. È il modello energetico del colon irritabile.",
             "La Milza trattiene il sangue nei vasi (emorroidi, feci con sangue) e sostiene gli organi verso l'alto (prolassi, utero retroflesso); se la sua spinta verso l'alto manca: vertigini, testa annebbiata.",
             "Ridurre sale e zucchero, latticini, alghe, succhi, agrumi, insalate, cipolla, coriandolo, miglio, menta, cereali crudi; limitare amidi, grano, avena e riso."],
            ["VC 12", "ST 36", "MP 3", "MP 6", "V 20", "V 21"],
            ["Cereali: amaranto, miglio, avena, riso, kamut, farro, mais, quinoa, orzo, grano saraceno", "Pollo, agnello, pecora, capra, lepre, manzo, trippa, acciughe, aringa, carpa, persico, sogliola, triglia, trota", "Verdure cotte (patate, rapa, zucca, carota, fagiolini), salsa di soia, tofu, cacao, liquirizia, sapori amarognoli", "Basilico, finocchio, chiodi di garofano, aneto, zenzero secco, aglio, gamberetti, lamponi, pistacchi"],
            ["Zucchero, latte e latticini, formaggi freschi, yogurt, vongole, dolci e gelati, farine lievitate, verdure crude", "Succhi e frutta fresca, alghe, germogli di soia, cetrioli, crescione, cicoria, insalata belga, tarassaco, pomodoro, melanzana", "Anguria, banana, cachi, limone, melone, caffè (anche d'orzo o di cicoria), tè"],
            ["Punti delle sindromi: R 13 = Qi (valido), ST 24 = Sangue, R 19 = Yin, V 35 = Yang. Sangue e Yin qui non ha senso testarli.", "Lo stesso format vale per la sindrome successiva."]),
          quadro("diarrea-yang-milza-rene", "Diarrea cronica da vuoto di Yang di Milza e Rene", "90", ["milza", "rene"],
            "Modo Organo + test dei punti d'allarme di Milza e Rene.",
            ["La Milza ha bisogno del calore e della spinta dello Yang del Rene; se manca il fuoco di Ming Men la trasformazione si blocca. I Reni controllano gli orifizi anteriore e posteriore. Tipico di anziani e malattie lunghe.",
             "Sintomi: diarrea cronica e mattutina, feci molli, poco appetito, mal di schiena, ginocchia deboli e fredde, freddo alla schiena, colorito bianco brillante, calo della libido, impotenza ed eiaculazione precoce, infertilità, urine abbondanti e chiare o notturne, edema alle gambe, apatia, voglia di stare sdraiati."],
            ["Milza: V 20, V 21, ST 36, MP 3, ST 37, ST 25", "Rene: V 23, VC 4, VC 6, VG 4, R 3, R 7", "Diapositiva: MP 1 × F 1 × VC 6 con moxa"],
            ["Tonificano Yang e Qi: avena, farro, riso, sorgo, segale, quinoa; agnello, manzo, pollo, vitello, selvaggina", "Datteri, piselli, aragosta, gamberetti, trota, acciughe, noci, pistacchi", "Chiodi di garofano, cannella, fieno greco, pepe, peperoncino, zenzero, aglio, carota, cipolla, patata dolce, zucca, porri, peperoni, barbabietola"],
            ["Assolutamente dolci e gelati", "Bevande fredde, succhi, frutta e verdura cruda, latticini, farine lievitate, aceto, sale, zucchero", "Alghe, cetrioli, tarassaco, insalata belga, cicoria, tè verde, cachi, more di gelso, pompelmo, anguria"],
            ["Molto utile anche dopo la radioterapia, quando causa diarrea.", "Quando uno fa la radioterapia, per togliere il calore spalmare yogurt o ricotta sulla parte trattata."]),
          quadro("stipsi-calore-secchezza", "Stipsi da Calore e secchezza", "91", ["stomaco", "intestino-crasso"],
            "Modo del Tempo + glabella picchiettata 5 volte (Calore) e 6 volte (Secchezza): che il cambio d'indicatore sia sul primo, sul secondo o su entrambi, comunque non ci sono altre sindromi.",
            ["Abuso di alimenti riscaldanti (carne, salumi, alcol, pepe, peperoncino) o calore residuo dopo una malattia febbrile: il Calore consuma i liquidi, l'Intestino Crasso non è lubrificato e le feci diventano secche.",
             "Sintomi: addome disteso, duro e dolente, febbre, viso rosso, labbra e lingua secche, alitosi, bruciore e gonfiore anale, urine scarse e scure."],
            ["IC 4", "IC 11", "ST 36", "MP 6", "R 3"],
            ["Cibi freschi che tolgono calore e producono liquidi", "Per lo Stomaco: zucchero di canna, cetriolo, cavolo cinese, pera, germogli di bambù, rabarbaro, pomodori", "Per l'Intestino Crasso: miele, latte, papaya, pera, spinaci"],
            ["Alimenti tiepidi o caldi e piccanti"],
            ["I fecalomi sono la materializzazione di un trauma: rimuoverli può slatentizzare «crisi» emotive."]),
          quadro("stipsi-stasi-qi", "Stipsi da stasi di Qi", "91-92", ["fegato"],
            "Modo del Tempo + glabella picchiettata 4 volte.",
            ["Il Qi del Fegato ristagna (in genere per cause psichiche), blocca Milza e Stomaco nel Riscaldatore Medio e l'energia dello Stomaco non scende: le feci sono trattenute.",
             "Sintomi: gonfiore e dolore addominale, eruttazioni, poco appetito, desiderio frustrato di defecare."],
            ["V 18", "V 20", "MC 6", "VB 34", "F 13", "F 14", "F 3", "TR 6"],
            ["Pasti leggeri, sapore piccante, natura tiepida: aglio, aneto, basilico, lattuga, grano, bulgur, cuscus, segale, orzo, miglio, cavallo, pollo, coniglio, carpa, lenticchie, spinaci, sedano, scarola, porri, rape, verze, rucola, ravanello", "Prugne, uva, pesca, tamarindo; erba cipollina, noce moscata, finocchio, timo, senape, salvia, prezzemolo, menta, maggiorana, ginepro, curcuma, cumino, chiodi di garofano, cardamomo, anice, zafferano"],
            EVITA_FREDDI),
          quadro("stipsi-qi-milza-polmone", "Stipsi da deficit di Qi di Milza e Polmone", "92", ["milza", "polmone"],
            "Format delle sindromi: testo R 13 (Qi); se dà ipo so che è questa sindrome.",
            ["Feci normali ma difficili da espellere: durante la defecazione si suda, manca il fiato e alla fine si è sfiniti. Complica asma, enfisema, diverticolosi.",
             "Altri sintomi: pallore, astenia, meteorismo, tosse cronica."],
            ["P 9", "P 7", "VC 6", "V 13", "VG 12", "ST 36", "VC 12", "MP 3", "MP 6", "V 20", "V 21"],
            ["Per il Polmone: mais, arachidi, uva, noci, latte di pecora e vaccino", "Per la Milza: sapore dolce, natura neutra o tiepida"],
            ["Piccanti e spezie (Polmone)", "Alimenti freddi (Milza)"],
            ["Lo testo come le sindromi: è l'unica legata al Qi fra quelle interne."]),
          quadro("stipsi-deficit-sangue", "Stipsi da deficit di Sangue", "92-93", ["milza", "fegato"],
            "Format delle sindromi testando il punto Sangue.",
            ["Carenza di Sangue per età o cattiva nutrizione: la «secchezza del Sangue» non umidifica l'intestino e le feci diventano asciutte.",
             "Sintomi: feci compatte e difficili, colorito spento, insonnia, irritabilità, debolezza, vertigini, palpitazioni."],
            ["V 17", "V 15", "V 18", "V 20", "MP 6"],
            ["Uova e tuorlo, formaggi, sangue e carne di manzo e maiale, fegato, montone; anguilla, granchio, piovra, pesce azzurro", "Melanzane, spinaci, ciliegie, castagne, litchi, noci, pesca, pera, uva, canna da zucchero, liquirizia"],
            ["Cibi troppo freddi, alghe, carne di cavallo, yogurt, verdure crude, germogli di soia, scarola, tarassaco, borragine, cetrioli, cicoria, insalata belga", "Anguria, melone, pompelmo, cachi, banane, caffè, alcolici", "Spezie calde (cannella, chiodi di garofano, pepe, peperoncino, zenzero, aglio), troppo sale, affumicati, cotti al forno, alla griglia o arrosto, gamberetti, cozze, pecorino"]),
          quadro("stipsi-freddo", "Stipsi da ostruzione di Freddo", "93", ["rene"],
            "Format delle sindromi testando il punto Yang.",
            ["Grave deficit di Yang del Rene (anziani, dopo malattie debilitanti): prevale lo Yin con freddo da vuoto.",
             "Sintomi: assenza di evacuazione, dolori addominali sordi e intermittenti, mani e piedi freddi, poco appetito, desiderio di calore e paura del freddo, urine abbondanti e chiare."],
            ["VG 4", "V 23", "R 3", "VC 6"],
            ["Pollo, rene e carne di montone, gamberetti, porri, litchi, chiodi di garofano"],
            null,
            ["Deficit di Yang e stagnazione del Freddo interno."])
        ]
      }
    ]
  });
})();
