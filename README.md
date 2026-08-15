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

I dati restano **sul dispositivo**, cifrati (AES-GCM 256, chiave da passphrase con PBKDF2
600k) e protetti da passphrase con blocco automatico. **Non esiste alcun recupero della
passphrase**: annotala e usa i backup (Impostazioni → Esporta backup).

Per usare l'app su più dispositivi c'è un **sync end-to-end** opzionale: il server riceve
solo ciphertext e non può leggere nulla. Installazione e limiti in [`sync/README.md`](sync/README.md).
Per aggiungere un dispositivo si importa il backup `.kin` e poi si sincronizza: ricreare
l'area con la stessa passphrase **non** basta (ogni area ha un salt casuale).

## Struttura
```
index.html               → pagina unica
assets/css/style.css     → grafica
assets/css/pazienti.css  → grafica area pazienti
assets/js/data.js        → CONTENUTI (da compilare dai manuali)
assets/js/app.js         → logica (elenco, ricerca, dettaglio)
assets/js/store.js       → vault cifrato (IndexedDB + WebCrypto) e sync
assets/js/pazienti.js    → pazienti, sessioni, agenda
sync/                    → server di sync (Cloudflare Workers + D1) + istruzioni
PROMPT.md                → brief/specifica di prodotto
PROMPT_SESSIONI.md       → specifica del modulo pazienti/sessioni/agenda
push.bat                 → push rapido su GitHub (Windows)
```

## Test
```
node tools/test_vault.js        → cifratura del vault
node tools/test_sync.js         → derivazione del token e regole di conflitto
node tools/test_worker.js       → server di sync su SQLite (due dispositivi simulati)
node tools/test_costituzioni.js → contenuti costituzioni
node tools/dev_sync_server.js   → server di sync in locale, per provare l'app
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
