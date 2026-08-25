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

- [x] **Pazienti, Sessioni e Agenda** (`#paz`) — specifica in `PROMPT_SESSIONI.md`.
      Dati cifrati in locale: IndexedDB + WebCrypto (AES-GCM 256, PBKDF2-SHA256 600k),
      passphrase, auto-lock 5 min, nessun server. Codice: `assets/js/store.js` (vault),
      `assets/js/pazienti.js` (UI), `assets/css/pazienti.css`.
      Include: anagrafica, sessioni con **cattura automatica** di ciò che si consulta
      durante la seduta, timeline e confronto con la precedente, agenda con stati ed
      export `.ics`, backup cifrato `.kin`, stampa scheda/riepilogo, export ed
      eliminazione per singolo paziente. Test: `node tools/test_vault.js`.
- [x] **Nessun server fornito** (scelta legale, non tecnica): `config.js` ha `syncUrl` vuoto e
      `syncAuto: false`. Chi non gestisce un server non è responsabile del trattamento ex
      art. 28 GDPR; privacy e termini sono stati riscritti di conseguenza (`LEGAL_VER: "2"`,
      così gli operatori riaccettano la versione nuova). Il codice del Worker resta in `sync/`
      per chi vuole ospitarselo: in quel caso il ruolo di responsabile è suo.
- [x] **Sync fra dispositivi**, end-to-end cifrato: Cloudflare Workers + D1 (piano gratuito).
      Il server vede solo ciphertext; token = seconda metà della derivazione PBKDF2.
      Conflitti last-write-wins, cancellazioni con lapidi. Codice e istruzioni in `sync/`.
      Test: `node tools/test_sync.js`, `node tools/test_worker.js`.
      Per aggiungere un dispositivo serve importare il backup (il salt viaggia lì).

- [x] **Collegamenti fra le sezioni** (`assets/js/links.js`): un grafo con perno il meridiano
      che unisce coordinate, punti d'allarme e costituzioni, normalizzando le denominazioni
      diverse dei tre manuali ("Milza" / "Milza (sx)" / "M – P" / "M4"). Ogni scheda mostra
      dove ritrovare le informazioni correlate e la mappa 3D ha indirizzi profondi
      (`#punti/mer/<id>`, `#punti/mer/<id>/<sigla>`, `#punti/p/<id>`).
      Test: `node tools/test_links.js` (197 controlli).
- [x] **Anteprima delle sedute** nella timeline del paziente: coordinate testate con esito
      (pallino verde/rosso/grigio) oppure, se non ne sono state aggiunte a mano, ciò che l'app
      ha registrato da sola durante la seduta, più una riga di indicatori (durata, scala
      pre→post, correzioni, essenze, compiti, foto, note). Prima mostrava data e trattino.
- [x] **Indicatore «i dati vengono salvati»** in testata: tre stati (area non creata /
      bloccata / sbloccata) più lo stato del sync, aggiornato da `Vault.onLock`/`onUnlock`.

- [x] **Più collegamenti interni ovunque**: il grafo di `links.js` guadagna quattro
      dimensioni oltre al meridiano — elemento (5 movimenti), coppia yin/yang, orologio cinese
      (prima / dopo / opposto) e le 14 posizioni di un muscolo — più l'indice dei fiori. Il testo
      discorsivo dei manuali diventa cliccabile (`Links.autolink`): nomi di meridiano e alias,
      muscoli, costituzioni, biotipi e sigle di punti MTC ("VC8", "M4", "P1" → mappa 3D). Le
      voci dei metadati non sono più testo morto ("Accoppiato con", "Somatotipo", "Foglietto",
      "Meridiani", "Punto di test", i sei polsi). I capitoli di teoria delle Costituzioni si
      citano a vicenda con termini ricavati dai loro titoli. Nelle note del paziente, che
      restano modificabili, i riferimenti riconosciuti compaiono come chip sotto al campo.
      Test: `node tools/test_links.js` (1559 controlli, compresa la sicurezza dell'autolink:
      niente markup iniettato, niente link annidati, mai una parola dentro un'altra).

## Da fare
- [ ] Dettagli essenze (squilibri + affermazione) per gli altri 15 meridiani
      → in `tools/essenze_dettaglio.json`, dalle pagine-essenza del manuale Atteggiamenti.
- [ ] Immagini Basket Weaver per le 7 coordinate mancanti (Maestro del Cuore, TR/Tiroide,
      TR/Surrenali, Vescica Biliare, Fegato, Polmone, Intestino Crasso) → serve il 2° volume.
- [ ] (opzionale) Procedura di monitoraggio muscolare per coordinata (dal Monitoraggio, 1 pag./coord.).
- [ ] Pazienti — fuori MVP, da fare solo se servono davvero: vista settimana a griglia
      dell'agenda (ora è elenco per giorno), ricorrenze, notifiche locali, modelli di
      sessione, registro prestazioni/CSV.

## Pipeline dati
Tutti i contenuti stanno in tools/*.json (atteggiamenti, essenze_dettaglio, storia) + ESS in
generate_data.py. Rigenerare: `python tools/generate_data.py`.
Costituzioni: `tools/costituzioni.json` (prodotto da `tools/extract_costituzioni.py`, che rilegge il
PDF) → `python tools/generate_costituzioni.py` → `assets/js/costituzioni_data.js`.
Test: `node tools/test_costituzioni.js` (jsdom installato fuori dal mount) — 104 test, coprono anche
il percorso coppia e il test discriminante Milza/Pancreas.
