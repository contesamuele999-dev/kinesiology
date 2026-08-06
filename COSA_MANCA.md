# Cosa manca (TODO)

## Fatto
- [x] 16 coordinate, ricerca, navigazione a sezioni, responsive tablet, dark mode, favicon
- [x] Correzioni: lista tecniche
- [x] Storia del problema (Basket Weaver): pagine-immagine per 9 coordinate
- [x] Storia del meridiano: elemento/organo/yin-yang/funzione per tutti i 16
- [x] Atteggiamenti: tabella 14 posizioni per tutti i 16
- [x] Sezione **Costituzioni & Temperamenti** (manuale Costituzioni-Finale-2014): 3 biotipi,
      6 costituzioni MTC, 2 procedure di test, tabella riassuntiva, confronto, 8 capitoli di teoria
- [x] Essenze (nome+tipo) per tutti i 16; dettagli (squilibri + "Mi impegno") per Vaso Concezione
- [x] Percorso guidato **Costituzione + Temperamento** (`#cost/coppia`): 2 passi (6 punti chiave →
      6 polsi) e sintesi della sola coppia (confronto, convergenze/divergenze, motti)
- [x] Eccezione **Milza / Pancreas** sui Punti d'Allarme: test Trapezio Medio (Milza) vs
      Gran Dorsale (Pancreas); scelto l'organo mostra solo i suoi NL, NV e reflessologia

- [x] **Modi** (PDF «Modi Per Samuele») su ogni sezione della coordinata: NL, NV,
      Fiori/Atteggiamenti, Forme Pensiero & Sensazioni (frasi con le 2 voci IrF/IoF),
      Reflessologia, Acu Touch + tabella zona/tocco, Ologramma della Genealogia,
      elenco completo dei Modi digitali. Dati in `assets/js/modi_data.js`, immagini in
      `assets/modi/`. Test: `node tools/test_modi_ricerca.js`.
- [x] Barra di ricerca sempre visibile: fuori dagli elenchi evidenzia il testo
      (`mark.shl`) in qualunque sezione, con contatore risultati.

## Da fare
- [ ] Dettagli essenze (squilibri + affermazione) per gli altri 15 meridiani
      → in `tools/essenze_dettaglio.json`, dalle pagine-essenza del manuale Atteggiamenti.
- [ ] Immagini Basket Weaver per le 7 coordinate mancanti (Maestro del Cuore, TR/Tiroide,
      TR/Surrenali, Vescica Biliare, Fegato, Polmone, Intestino Crasso) → serve il 2° volume.
- [ ] (opzionale) Procedura di monitoraggio muscolare per coordinata (dal Monitoraggio, 1 pag./coord.).

## Pipeline dati
Tutti i contenuti stanno in tools/*.json (atteggiamenti, essenze_dettaglio, storia) + ESS in
generate_data.py. Rigenerare: `python tools/generate_data.py`.
Costituzioni: `tools/costituzioni.json` (prodotto da `tools/extract_costituzioni.py`, che rilegge il
PDF) → `python tools/generate_costituzioni.py` → `assets/js/costituzioni_data.js`.
Test: `node tools/test_costituzioni.js` (jsdom installato fuori dal mount) — 104 test, coprono anche
il percorso coppia e il test discriminante Milza/Pancreas.
