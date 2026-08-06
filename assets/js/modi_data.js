/* modi_data.js — "Procedure e modi" (dal PDF «Modi Per Samuele»).
   Scritto a mano, NON generato da tools/generate_data.py.
   I modi sono uguali per tutte le coordinate: l'unica parte variabile sono le
   due voci IrF / IoF, che vengono dalla posizione corrente (row.stress). */
window.MODI = {
  neurolinfatici: [
    { nome: "Neurolinfatici", tocco: "LC di St35 dx o sx" }
  ],
  neurovascolari: [
    { nome: "Neurovascolari", tocco: "LC di TR10 dx o sx" }
  ],
  fiori: [
    { nome: "Modo delle Essenze", tocco: "Pollice sull'unghia dell'anulare, tocco leggero." },
    { nome: "Modo degli Atteggiamenti", tocco: "Pollice sull'unghia dell'anulare, tocco profondo." }
  ],
  /* Ogni modo porta la sua frase: il vuoto si riempie con una delle 2 voci
     IrF / IoF della coordinata (alla fine ne resta una sola). */
  pensiero: [
    { nome: "Forme Pensiero", tocco: "Toccare eminenze frontali con tocco neutro.",
      frase: "il mio pensiero che ho associato con l'essere" },
    { nome: "Sensazioni", tocco: "Toccare VB20 alla base del cranio, tocco neutro.",
      frase: "la mia emozione" }
  ],
  reflessologia: [
    { nome: "Basket Weaver", tocco: "Il pollice tocca la nocca distale del dito medio, tocco profondo." },
    { nome: "Riflessologia della Mano", tocco: "Tocca o strofina il palmo della mano dominante del cliente con la tua mano opposta (polarità opposta)." },
    { nome: "Riflessologia del Piede", tocco: "Tocca o strofina la pianta del piede dominante del cliente con la tua mano opposta (polarità opposta)." }
  ],
  acutouch: [
    { nome: "Acu Touch", tocco: "Strofinare i palmi delle mani insieme." },
    { nome: "Modo dell'Amore", tocco: "Indice, medio e anulare toccano il lato del pollice, dalla nocca distale alla punta del pollice." }
  ],
  genealogia: [
    { nome: "Genealogia", tocco: "Mano a pugno, pollice su VG 24.5 (Glabella)." }
  ],

  /* Tabella di Riferimento (Acu Touch): meridiano oggetto = zona del corpo,
     meridiano di riferimento = tipo di tocco. */
  tabella: {
    testaOggetto: "Meridiano Oggetto (area del corpo) — Yin = fronte, Yang = retro",
    testaRif: "Meridiano di Riferimento (tipo di tocco) — Yin = profondo, Yang = leggero",
    righe: [
      ["VC/VG", "Testa", "Impastare"],
      ["C/IT", "Parte destra del torace", "Sfregare (sempre verso la testa)"],
      ["PC/TR", "Parte sinistra del torace", "Tapping"],
      ["M/ST", "Braccio sinistro", "Coppettazione"],
      ["P/IC", "Gamba sinistra", "Pizzicare"],
      ["R/V", "Gamba destra", "Piuma"],
      ["F/VB", "Braccio destro", "Grattare"]
    ]
  },

  /* Elenco completo dei modi digitali (tavola «Modi Digitali»). */
  digitali: [
    { nome: "Ologramma", tocco: "Pollice tocca la nocca distale del dito medio, tocco medio" },
    { nome: "Can Opener", tocco: "Pollice tocca la nocca distale del dito medio, tocco leggero" },
    { nome: "Basket Weaver", tocco: "Pollice tocca la nocca distale del dito medio, tocco profondo" },
    { nome: "Priorità", tocco: "Unghia del dito medio su piega del pollice" },
    { nome: "Atteggiamenti", tocco: "Polpastrello del pollice su unghia dell'anulare, tocco profondo" },
    { nome: "Essenze", tocco: "Polpastrello del pollice su unghia dell'anulare, tocco leggero" },
    { nome: "Suono", tocco: "Polpastrello del pollice su nocca distale dell'indice" },
    { nome: "Colore", tocco: "Pollice su falange prossimale del dito medio (lato dorsale)" },
    { nome: "Agopressione 5 Elementi", tocco: "Pollice su piega distale del mignolo, tocco leggero" },
    { nome: "Agopressione 7 Elementi", tocco: "Pollice su piega distale del mignolo, tocco profondo" },
    { nome: "Acu-touch", tocco: "Strofinare i palmi delle mani e mettere in circuito" },
    { nome: "Amore", tocco: "Estremità di indice, medio e anulare a lato del pollice, tra l'estremità di esso e la nocca distale" },
    { nome: "Genealogia", tocco: "Mano a pugno, pollice su glabella" },
    { nome: "Tempo", tocco: "Mano a pugno, polpastrello del pollice su dito medio, sulla seconda falange" }
  ],

  img: {
    tabella: "assets/modi/tabella_riferimento.png",
    acuAnt: "assets/modi/acutouch_anteriore.png",
    acuPost: "assets/modi/acutouch_posteriore.png",
    matrice: "assets/modi/matrice_genealogia.png",
    digitali: "assets/modi/modi_digitali.png"
  }
};
