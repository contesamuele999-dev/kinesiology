# Cosa manca (TODO)

## Fatto
- [x] 16 coordinate, ricerca, navigazione a sezioni, responsive tablet, dark mode, favicon
- [x] Correzioni: lista tecniche
- [x] Storia del problema (Basket Weaver): pagine-immagine per 9 coordinate
- [x] Storia del meridiano: elemento/organo/yin-yang/funzione per tutti i 16
- [x] Atteggiamenti: tabella 14 posizioni per tutti i 16
- [x] Essenze (nome+tipo) per tutti i 16; dettagli (squilibri + "Mi impegno") per Vaso Concezione

## Da fare
- [ ] Dettagli essenze (squilibri + affermazione) per gli altri 15 meridiani
      → in `tools/essenze_dettaglio.json`, dalle pagine-essenza del manuale Atteggiamenti.
- [ ] Immagini Basket Weaver per le 7 coordinate mancanti (Maestro del Cuore, TR/Tiroide,
      TR/Surrenali, Vescica Biliare, Fegato, Polmone, Intestino Crasso) → serve il 2° volume.
- [ ] (opzionale) Procedura di monitoraggio muscolare per coordinata (dal Monitoraggio, 1 pag./coord.).

## Pipeline dati
Tutti i contenuti stanno in tools/*.json (atteggiamenti, essenze_dettaglio, storia) + ESS in
generate_data.py. Rigenerare: `python tools/generate_data.py`.
