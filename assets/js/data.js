/*
 * data.js — Modello dati delle coordinate (Meridiano <-> Muscolo).
 *
 * COME AGGIORNARE I CONTENUTI:
 *  - Ogni coordinata ha una struttura FISSA. Compila i campi testuali dai manuali.
 *  - "correzioni": voci { titolo, tecnica, descrizione }.
 *  - "immagini": elenco di percorsi a immagini di pagina (Basket Weaver). Opzionale.
 *  - "storiaProblema" e "storiaMeridiano": testo libero (piu' paragrafi con \n\n).
 *  - "essenze": elenco { nome, atteggiamento }.
 *  - I campi vuoti ("") mostrano automaticamente un segnaposto "Da compilare".
 *  - Non serve alcun software: modifica questo file con un editor di testo e salva.
 */

const COORDINATE = [
  {
    id: "vc-sovraspinato",
    meridiano: "Vaso Concezione",
    muscolo: "Sovraspinato",
    colore: "#1a1a1a",
    coloreNome: "Nero",
    correzioni: [
      { titolo: "Riflessologia 1-7", tecnica: "Sfregare forte", descrizione: "" },
      { titolo: "Riflessologia 8-14", tecnica: "Tapping forte", descrizione: "" },
      { titolo: "Acutouch / Nutrire", tecnica: "Acutouch", descrizione: "" }
    ],
    immagini: [
      "assets/pages/vc-sovraspinato/p01.jpg",
      "assets/pages/vc-sovraspinato/p02.jpg",
      "assets/pages/vc-sovraspinato/p03.jpg",
      "assets/pages/vc-sovraspinato/p04.jpg",
      "assets/pages/vc-sovraspinato/p05.jpg",
      "assets/pages/vc-sovraspinato/p06.jpg",
      "assets/pages/vc-sovraspinato/p07.jpg",
      "assets/pages/vc-sovraspinato/p08.jpg",
      "assets/pages/vc-sovraspinato/p09.jpg",
      "assets/pages/vc-sovraspinato/p10.jpg"
    ],
    storiaProblema: "",
    storiaMeridiano: "",
    essenze: [
      { nome: "Grey Spider Flower", atteggiamento: "Fiore Australiano - riferimento VC 2,13" },
      { nome: "Bluebell", atteggiamento: "Fiore Australiano - riferimento VC 3,12" },
      { nome: "Devil's Claw", atteggiamento: "Fiore del Deserto" },
      { nome: "Evening Star", atteggiamento: "Fiore del Deserto" }
    ]
  },
  { id: "vg-grande-rotondo", meridiano: "Vaso Governatore", muscolo: "Grande Rotondo", colore: "#e9e9e9", coloreNome: "Bianco",
    correzioni: [{ titolo: "Correzione base", tecnica: "", descrizione: "" }], immagini: [], storiaProblema: "", storiaMeridiano: "",
    essenze: [
      { nome: "Red Helmet Orchid", atteggiamento: "Fiore Australiano - riferimento VG 2,13" },
      { nome: "Desert Willow", atteggiamento: "Fiore del Deserto" },
      { nome: "Coral Bean", atteggiamento: "Fiore del Deserto - riferimento IT 7 / C 8" }
    ] },
  { id: "stomaco-gran-pettorale-clavicolare", meridiano: "Stomaco", muscolo: "Gran Pettorale Clavicolare", colore: "#f4d03f", coloreNome: "Giallo Chiaro",
    correzioni: [{ titolo: "Correzione base", tecnica: "", descrizione: "" }], immagini: [], storiaProblema: "", storiaMeridiano: "", essenze: [{ nome: "", atteggiamento: "" }] },
  { id: "milza-trapezio-medio", meridiano: "Milza", muscolo: "Trapezio Medio", colore: "#d4ac0d", coloreNome: "Giallo Scuro",
    correzioni: [{ titolo: "Correzione base", tecnica: "", descrizione: "" }], immagini: [], storiaProblema: "", storiaMeridiano: "", essenze: [{ nome: "", atteggiamento: "" }] },
  { id: "milza-pancreas-gran-dorsale", meridiano: "Milza/Pancreas", muscolo: "Gran Dorsale", colore: "#c9a227", coloreNome: "Giallo Scuro",
    correzioni: [{ titolo: "Correzione base", tecnica: "", descrizione: "" }], immagini: [], storiaProblema: "", storiaMeridiano: "", essenze: [{ nome: "", atteggiamento: "" }] },
  { id: "cuore-sottoscapolare", meridiano: "Cuore", muscolo: "Sottoscapolare", colore: "#922b21", coloreNome: "Rosso Scuro",
    correzioni: [{ titolo: "Correzione base", tecnica: "", descrizione: "" }], immagini: [], storiaProblema: "", storiaMeridiano: "", essenze: [{ nome: "", atteggiamento: "" }] },
  { id: "intestino-tenue-quadricipite", meridiano: "Intestino Tenue", muscolo: "Quadricipite", colore: "#e74c3c", coloreNome: "Rosso Chiaro",
    correzioni: [{ titolo: "Correzione base", tecnica: "", descrizione: "" }], immagini: [], storiaProblema: "", storiaMeridiano: "", essenze: [{ nome: "", atteggiamento: "" }] },
  { id: "vescica-tibiale-anteriore", meridiano: "Vescica", muscolo: "Tibiale Anteriore", colore: "#bb8fce", coloreNome: "Viola Chiaro",
    correzioni: [{ titolo: "Correzione base", tecnica: "", descrizione: "" }], immagini: [], storiaProblema: "", storiaMeridiano: "", essenze: [{ nome: "", atteggiamento: "" }] },
  { id: "rene-psoas", meridiano: "Rene", muscolo: "Psoas", colore: "#6c3483", coloreNome: "Viola Scuro",
    correzioni: [{ titolo: "Correzione base", tecnica: "", descrizione: "" }], immagini: [], storiaProblema: "", storiaMeridiano: "", essenze: [{ nome: "", atteggiamento: "" }] },
  { id: "maestro-cuore-medio-gluteo", meridiano: "Maestro del Cuore", muscolo: "Medio Gluteo", colore: "#ca6f1e", coloreNome: "Arancione Scuro",
    correzioni: [{ titolo: "Correzione base", tecnica: "", descrizione: "" }], immagini: [], storiaProblema: "", storiaMeridiano: "", essenze: [{ nome: "", atteggiamento: "" }] },
  { id: "tr-tiroide-piccolo-rotondo", meridiano: "Triplice Riscaldatore/Tiroide", muscolo: "Piccolo Rotondo", colore: "#f0932b", coloreNome: "Arancione Chiaro",
    correzioni: [{ titolo: "Correzione base", tecnica: "", descrizione: "" }], immagini: [], storiaProblema: "", storiaMeridiano: "", essenze: [{ nome: "", atteggiamento: "" }] },
  { id: "tr-surrenali-sartorio", meridiano: "Triplice Riscaldatore/Surrenali", muscolo: "Sartorio", colore: "#f39c47", coloreNome: "Arancione Chiaro",
    correzioni: [{ titolo: "Correzione base", tecnica: "", descrizione: "" }], immagini: [], storiaProblema: "", storiaMeridiano: "", essenze: [{ nome: "", atteggiamento: "" }] },
  { id: "vescica-biliare-deltoide-anteriore", meridiano: "Vescica Biliare", muscolo: "Deltoide Anteriore", colore: "#52be80", coloreNome: "Verde Chiaro",
    correzioni: [{ titolo: "Correzione base", tecnica: "", descrizione: "" }], immagini: [], storiaProblema: "", storiaMeridiano: "", essenze: [{ nome: "", atteggiamento: "" }] },
  { id: "fegato-romboide", meridiano: "Fegato", muscolo: "Romboide", colore: "#1e8449", coloreNome: "Verde Scuro",
    correzioni: [{ titolo: "Correzione base", tecnica: "", descrizione: "" }], immagini: [], storiaProblema: "", storiaMeridiano: "", essenze: [{ nome: "", atteggiamento: "" }] },
  { id: "polmone-deltoide-medio", meridiano: "Polmone", muscolo: "Deltoide Medio", colore: "#1f618d", coloreNome: "Blu Scuro",
    correzioni: [{ titolo: "Correzione base", tecnica: "", descrizione: "" }], immagini: [], storiaProblema: "", storiaMeridiano: "", essenze: [{ nome: "", atteggiamento: "" }] },
  { id: "intestino-crasso-tensore-fascia-lata", meridiano: "Intestino Crasso", muscolo: "Tensore Fascia Lata", colore: "#5dade2", coloreNome: "Blu Chiaro",
    correzioni: [{ titolo: "Correzione base", tecnica: "", descrizione: "" }], immagini: [], storiaProblema: "", storiaMeridiano: "", essenze: [{ nome: "", atteggiamento: "" }] }
];

if (typeof window !== "undefined") window.COORDINATE = COORDINATE;
