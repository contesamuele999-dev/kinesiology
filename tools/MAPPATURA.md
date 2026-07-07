# Mappatura dei manuali → app

Sintesi di come i 3 manuali si collegano al modello dati dell'app.

## 1. Natura dei file
Tutti e tre i PDF sono **scansioni** (immagini, nessun testo selezionabile).
- **Basket Weaver** — molto grafico (posizioni, riflessologia, correzioni). Le pagine
  sono **in ordine** e seguono l'indice: una coppia Meridiano–Muscolo dopo l'altra.
  → strategia: **immagini di pagina** (nessuna trascrizione).
- **Atteggiamenti con le essenze** — **testo pulito** (affermazioni, emozioni,
  forme-pensiero) + tabelle essenze. → strategia: **trascrizione** (via vision AI).
- **Monitoraggio Muscolare** — **testo pulito** (teoria, procedure). → **trascrizione**.

## 2. ⚠️ Ordine delle pagine non lineare
Nel PDF "Atteggiamenti" l'ordine fisico delle pagine **non** coincide con l'ordine del
libro: front-matter, appendici (elenchi essenze, numerazione romana) e capitoli
(numerazione araba) risultano interlacciati nella scansione. Esempio riscontrato:
la pagina PDF 26 è un'appendice romana (xxvii), mentre la PDF 28 è già il capitolo
"Vaso Governatore" (pag. stampata 11).

**Conseguenza:** la mappa pagina→coordinata non si può calcolare con un semplice offset;
va costruita scorrendo le pagine e leggendo le intestazioni. Per questo la trascrizione
completa è un lavoro a lotti (una passata di lettura pagina-per-pagina), non una formula.

## 3. Le 16 coordinate (dall'indice Basket Weaver)
Vedi `PROMPT.md` §7. Nota: "Atteggiamenti" usa 14 meridiani (accorpa Milza/Pancreas e
le due varianti del Triplice Riscaldatore), mentre Basket Weaver le distingue (16 coppie).

## 4. Essenze per meridiano (già estratte dalle tabelle)
Dalle appendici "Fiori Australiani / del Deserto per Meridiano". Esempio Vaso Concezione:
Australiani → Grey Spider Flower (VC 2,13), Bluebell (VC 3,12);
Deserto → Devil's Claw, Evening Star. (Le altre coordinate seguono lo stesso schema.)

## 5. Come rigenerare le immagini
`python tools/slice_pages.py "<manuale>.pdf" tools/page_map.json` (richiede poppler/pdftoppm).
Le immagini della coordinata POC (vc-sovraspinato) sono già incluse nel repo.

## 6. Stato del lotto (aggiornamento)
- ✅ Immagini Basket Weaver generate per **9 coordinate** (le uniche presenti in questo volume):
  Vaso Concezione, Vaso Governatore, Stomaco, Milza/Pancreas, Milza, Cuore,
  Intestino Tenue, Vescica, Rene. Confini pagina in `tools/page_map.json`.
  Le altre 7 coordinate (Maestro del Cuore, TR/Tiroide, TR/Surrenali, Vescica Biliare,
  Fegato, Polmone, Intestino Crasso) non sono in questo PDF: servirebbe l'altro volume.
- ✅ Essenze floreali (Australiane + Deserto) popolate per **tutti i 16** meridiani,
  dalle tabelle "per Meridiano" e "per ordine alfabetico".
- ⬜ Prosa da trascrivere (via vision) dal manuale "Atteggiamenti": affermazioni,
  emozioni/forme-pensiero, e i testi "storia del problema / del meridiano".
