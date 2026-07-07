# Fisiologia Applicata — Consultazione rapida

Web app per il chinesiologo: scegli una **coordinata** (Meridiano ↔ Muscolo) e accedi in
pochi tocchi a tutto il correlato — correzioni Basket Weaver, storia del problema, storia del
meridiano, atteggiamenti ed essenze. Tablet-first, responsive, funziona **offline**.

## Provare l'app
Apri `index.html` con doppio clic (o pubblicala su GitHub Pages). Nessuna installazione.

## Struttura
```
index.html            → pagina unica
assets/css/style.css  → grafica
assets/js/data.js     → CONTENUTI (da compilare dai manuali)
assets/js/app.js      → logica (elenco, ricerca, dettaglio)
PROMPT.md             → brief/specifica di prodotto
push.bat              → push rapido su GitHub (Windows)
```

## Aggiornare i contenuti
Apri `assets/js/data.js` con un editor di testo. Ogni coordinata ha una struttura fissa:
correzioni, storia del problema, storia del meridiano, essenze. Compila i campi `""` e salva.
I campi vuoti mostrano automaticamente "Da compilare".

## Pubblicare online (GitHub Pages)
1. Crea una repo vuota su GitHub (senza README).
2. Lancia `push.bat` (chiede l'URL della repo la prima volta).
3. Su GitHub: **Settings → Pages → Branch: main / root → Save**. L'app sarà online in pochi minuti.

## Nota
I PDF dei manuali non vengono caricati su GitHub (esclusi in `.gitignore`): restano solo in locale.
