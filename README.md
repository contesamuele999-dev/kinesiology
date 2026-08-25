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

Per usare l'app su più dispositivi il modo previsto è il **backup cifrato** `.kin`: si esporta
da un dispositivo e si importa nell'altro. Ricreare l'area con la stessa passphrase **non**
basta (ogni area ha un salt casuale).

Esiste anche un **sync end-to-end** opzionale, ma **non è preconfigurato**: `assets/js/config.js`
ha `syncUrl` vuoto e nessun server viene fornito. Chi lo vuole se lo installa
([`sync/README.md`](sync/README.md)) e ne incolla l'indirizzo nelle impostazioni. È una scelta
deliberata: chi non gestisce alcun server non è responsabile del trattamento ex art. 28 GDPR.
Se attivi un server tuo, quel ruolo lo assumi tu (o il tuo hosting) e i testi legali vanno
riscritti di conseguenza.

## Testi legali
`privacy.html` e `termini.html` sono **modelli da far rivedere a un legale**: compila i campi
tra parentesi quadre (nome, P.IVA, indirizzo, email, foro, date) prima di pubblicare.
La sezione 6 dei Termini **non è più una nomina a responsabile**: dichiara che il Fornitore
non tratta alcun dato, coerentemente con l'assenza di un server. Se un giorno riattivi un
server tuo, quella nomina va ripristinata, altrimenti il testo non corrisponde ai fatti.
L'app registra l'accettazione (versione + data) sul dispositivo. Se cambi i testi in modo
sostanziale, alza `LEGAL_VER` in `assets/js/pazienti.js` per richiedere una nuova accettazione
(attualmente `"2"`).

## Struttura
```
index.html               → pagina unica
privacy.html             → informativa privacy (modello)
termini.html             → termini d'uso (modello; il Fornitore non tratta dati)
assets/css/style.css     → grafica
assets/css/pazienti.css  → grafica area pazienti
assets/js/data.js        → CONTENUTI (da compilare dai manuali)
assets/js/app.js         → logica (elenco, ricerca, dettaglio, router)
assets/js/links.js       → collegamenti fra sezioni (grafo con perno il meridiano)
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
node tools/test_links.js        → collegamenti fra sezioni (1559 controlli)
node tools/dev_sync_server.js   → server di sync in locale, per provare l'app
```

## Collegamenti fra sezioni
Coordinate, Punti d'Allarme e Costituzioni parlano tutte dello stesso oggetto — il
**meridiano** — con nomi diversi ("Milza", "Milza (sx)", "M – P", "M4"). `assets/js/links.js`
normalizza tutto su un unico id e da lì costruisce i collegamenti in ogni direzione. Oltre al
meridiano il grafo conosce altre quattro dimensioni, tutte ricavate dai dati:

- **elemento** — i 5 movimenti: da un meridiano si raggiungono gli altri dello stesso elemento;
- **coppia yin/yang** — il meridiano accoppiato ("Accoppiato con" è un link, non più testo);
- **orologio cinese** — precedente, successivo e opposto nel giro delle 24 ore;
- **le 14 posizioni** di un muscolo — da una coordinata si salta a qualunque altra posizione
  dello stesso muscolo senza tornare all'elenco;
- **i fiori** — le due posizioni speculari coperte dallo stesso fiore e gli altri muscoli su
  cui quel fiore torna.

In più il testo discorsivo dei manuali è **cliccabile**: `Links.autolink()` riconosce nomi di
meridiano e alias, muscoli, costituzioni, biotipi e sigle di punti MTC ("VC8", "M4", "P1") e li
trasforma in `<a>`. Lavora sul testo grezzo e ricompone l'output escapando i pezzi in chiaro,
quindi non può iniettare markup né annidare un link dentro un altro; salta la pagina su cui si
è già, linka una sola volta per destinazione e mai una parola dentro un'altra parola. Le sezioni
possono aggiungere un vocabolario locale (`opzioni.extra`): così i capitoli di teoria delle
Costituzioni si citano a vicenda, con i termini ricavati dai loro stessi titoli.

Dove il testo resta modificabile — le note del paziente sono in una `textarea` — i riferimenti
riconosciuti compaiono come chip sotto al campo (`Links.chipsCitate`).

Indirizzi profondi disponibili:

```
#punti/mer/<id>          scheda di un meridiano sulla mappa 3D
#punti/mer/<id>/<sigla>  singolo punto MTC (es. #punti/mer/vescica/V62)
#punti/p/<id>            punto d'allarme (es. #punti/p/rene-dx)
#/<coord>+<coord>        coordinata
#cost/costituzione/<id>  costituzione
#cost/biotipo/<id>       biotipo
#cost/teoria/<id>        capitolo di teoria
#cost/test/<id>          procedura di test
#cost/coppia/<c>/<t>     coppia costituzione + temperamento
```

Aggiungendo un meridiano, una coordinata, un punto o un capitolo i collegamenti si aggiornano
da soli: non c'è nessun elenco di link scritto a mano. `node tools/test_links.js` verifica che
ogni entità risalga al proprio meridiano, che le nuove relazioni siano coerenti e reciproche e
che l'autolink sia sicuro (niente markup iniettato, niente link annidati).

## Indicatore in testata
Il badge accanto al pulsante del tema dice se i dati vengono salvati: grigio = area pazienti
non ancora creata, ambra = bloccata (nulla viene registrato), verde = sbloccata, con
l'aggiunta di «· sync» quando la sincronizzazione è attiva e i termini sono stati accettati.
Toccandolo si va all'area pazienti.

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
