# Fisiologia Applicata — Consultazione rapida

Web app per il chinesiologo: scegli una **coordinata** (Meridiano ↔ Muscolo) e accedi in
pochi tocchi a tutto il correlato — correzioni Basket Weaver, storia del problema, storia del
meridiano, atteggiamenti ed essenze. Tablet-first, responsive, funziona **offline**.

## Provare l'app
Apri `index.html` con doppio clic (o pubblicala su GitHub Pages). Nessuna installazione.

## Pazienti, sessioni e agenda
La scheda **Pazienti** registra le sedute (data, coordinate testate, correzioni, essenze,
note) e l'agenda degli appuntamenti. Mentre consulti i manuali durante una sessione aperta,
l'app segna da sola cosa hai aperto e a fine seduta te lo propone come checklist.

I dati restano **solo su questo dispositivo**, cifrati (AES-GCM 256, chiave da passphrase
con PBKDF2 600k) e protetti da passphrase con blocco automatico. **Non esiste alcun recupero
della passphrase**: annotala e usa i backup (Impostazioni → Esporta backup). Il backup `.kin`
è cifrato e serve anche per spostare i dati su un altro dispositivo.

## Struttura
```
index.html               → pagina unica
assets/css/style.css     → grafica
assets/css/pazienti.css  → grafica area pazienti
assets/js/data.js        → CONTENUTI (da compilare dai manuali)
assets/js/app.js         → logica (elenco, ricerca, dettaglio)
assets/js/store.js       → vault cifrato (IndexedDB + WebCrypto)
assets/js/pazienti.js    → pazienti, sessioni, agenda
PROMPT.md                → brief/specifica di prodotto
PROMPT_SESSIONI.md       → specifica del modulo pazienti/sessioni/agenda
push.bat                 → push rapido su GitHub (Windows)
```

## Test
```
node tools/test_vault.js        → cifratura del vault
node tools/test_costituzioni.js → contenuti costituzioni
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
