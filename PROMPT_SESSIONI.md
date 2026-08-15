# Brief di prodotto — Modulo «Pazienti, Sessioni e Agenda»

> Estensione di [PROMPT.md](PROMPT.md). Stessa app, stesso stack, nessun server.
> Usa questo file come specifica per lo sviluppo o come prompt per un modello AI.

---

## 1. In una frase

Aggiungere all'app di consultazione un **diario di lavoro cifrato**: per ogni paziente,
la lista delle sessioni con **data**, **cosa è stato consultato/applicato** durante quella
seduta e le note dell'operatore — più un **calendario degli appuntamenti**. Tutto in locale,
protetto da passphrase, senza account e senza cloud.

## 2. Problema da risolvere

Oggi l'app è di sola consultazione: chiuso il tablet, non resta traccia di nulla.
L'operatore deve ricordare a memoria (o su carta) quali coordinate ha testato, quali
correzioni ha fatto e quali essenze ha consigliato al singolo paziente, e non ha modo di
confrontare la seduta di oggi con quella di tre mesi fa.

## 3. Vincoli non negoziabili

- **Offline-first**: nessun backend, nessun login remoto, nessuna telemetria. L'app resta
  apribile da file o da sito statico.
- **Stack invariato**: HTML + CSS + JavaScript vanilla, nessun build step, nessun framework.
  Persistenza con **IndexedDB**, cifratura con **WebCrypto** (già nel browser: zero dipendenze).
- **Dati sanitari** = categoria particolare (GDPR art. 9). Il default è la riservatezza:
  nulla lascia il dispositivo se non per un backup che l'operatore esporta a mano.
- **Zero attrito**: registrare una sessione durante la seduta non deve costare più di
  **3 tocchi**. Se costa di più, l'operatore non lo userà e tornerà alla carta.

## 4. Utente e contesto

Il chinesiologo di PROMPT.md, in piedi col tablet, a paziente presente. Registra
**durante** la seduta, non dopo. Poco pratico di tecnologia: niente form lunghi,
niente campi obbligatori inutili, tutto recuperabile e modificabile dopo.

---

## 5. Funzionalità

### 5.1 Anagrafica paziente (minima)

Solo ciò che serve a distinguere e richiamare la persona:

- Nome/riferimento (può essere uno pseudonimo o un codice: **campo libero**, non forzare il nome vero)
- Data di nascita *(opzionale)*, contatto telefono/email *(opzionale)*
- Note permanenti: anamnesi, patologie note, farmaci, allergie, controindicazioni
- **Costituzione + Temperamento** (riuso della sezione `#cost/coppia` già esistente):
  si determina una volta e resta agganciata alla scheda
- Tag liberi (es. «cervicale», «sportivo», «gravidanza»)
- Flag **consenso al trattamento dati** con data: sì/no + campo note (dove è archiviato il cartaceo)
- Colore/iniziali per il riconoscimento a colpo d'occhio nella lista

**Lista pazienti**: ricerca istantanea per nome/tag, ordinamento per ultima sessione,
badge «prossimo appuntamento».

### 5.2 Sessione di trattamento — il cuore del modulo

Una sessione è un oggetto datato agganciato a un paziente:

| Campo | Note |
|---|---|
| Data e ora | Precompilate a «adesso», modificabili (per registrare sedute passate) |
| Durata | Opzionale, cronometro one-tap o inserimento manuale |
| **Coordinate toccate** | Meridiano ↔ Muscolo, con esito del test (forte / debole / non testato) |
| **Correzioni applicate** | Dalle Correzioni Basket Weaver della coordinata: quali, con quale tecnica, quale mano |
| **Modi / NL / NV / Riflessologia / Acu Touch** | Cosa è stato effettivamente usato |
| **Essenze e atteggiamenti** | Consigliati o somministrati, con posologia libera |
| Note libere | Testo dell'operatore, il campo più usato: grande, sempre visibile |
| Osservazioni sul paziente | Riferito/percepito prima e dopo, scala 0–10 opzionale |
| Compiti a casa | Cosa il paziente deve fare fino alla prossima seduta |
| Prossimo passo | Cosa provare la volta dopo — è la nota che l'operatore rileggerà per prima |
| Allegati | Foto/immagine opzionale (postura, punti), cifrata come il resto |

**Cattura automatica (funzione chiave).** Mentre l'operatore consulta l'app durante una
sessione aperta, l'app registra da sola cosa ha aperto: coordinate visitate, sezioni lette,
essenze consultate. A fine seduta le mostra come **checklist pre-compilata**: l'operatore
conferma con un tocco, deseleziona ciò che ha solo sfogliato, salva. Questo è ciò che rende
il modulo usabile a paziente presente — nessuno compila un form mentre lavora.

Meccanica minima:
- Un pulsante **«Inizia sessione»** in barra + scelta paziente (o «paziente rapido», da
  nominare dopo). Da quel momento la barra mostra un indicatore di sessione attiva.
- Su ogni schermata compare **«+ Aggiungi alla sessione»** (un tocco, con conferma leggera).
- **«Chiudi sessione»** → riepilogo pre-compilato → note → salva.
- Sessione dimenticata aperta: chiusura automatica dopo N ore, salvata come bozza, mai persa.

### 5.3 Storico e continuità

- **Timeline del paziente**: sessioni in ordine inverso, ognuna riassunta in una riga
  («12/03/2026 — Rene/Psoas, Fegato/Romboide — 3 correzioni — Impatiens»).
- **Confronto con la seduta precedente**: cosa era emerso, cosa era stato assegnato,
  cosa si era deciso di provare oggi. Mostrato in cima quando si apre una nuova sessione.
- **Ricorrenze**: quali coordinate escono più spesso per questo paziente, con frequenza.
  Solo un conteggio, niente statistiche pretenziose.
- **Ricerca trasversale**: «quali pazienti hanno avuto Rene/Psoas debole», «chi ha preso Mimulus».

### 5.4 Agenda / Calendario

- Viste **Giorno**, **Settimana**, **Lista prossimi** (la lista è la vista di default su
  smartphone; la settimana su tablet). Niente vista mese elaborata al primo giro.
- Appuntamento = paziente + data/ora + durata + luogo/nota + stato
  (**programmato / confermato / effettuato / disdetto / non presentato**).
- **Dall'appuntamento si apre la sessione** con un tocco: appuntamento «effettuato» e
  sessione creata sono la stessa azione.
- Ricorrenza semplice (ogni N settimane, fino a data) — senza regole in stile RRULE complete.
- **Promemoria locali** via Notification API quando il PWA è installato; se non concesso il
  permesso, semplice evidenza in-app all'apertura. Nessun invio di SMS/email.
- **Blocchi di indisponibilità** (ferie, ore non lavorabili) e orario di lavoro predefinito,
  così gli slot liberi sono visibili a colpo d'occhio.
- **Esporta in .ics** l'appuntamento o l'intera agenda, per chi vuole vederla nel proprio
  calendario di sistema. Import non previsto.

### 5.5 Altro utile all'operatore

- **Scheda paziente stampabile / PDF** (via `window.print()` con foglio di stile dedicato:
  nessuna libreria). Utile per consegnare i compiti a casa o archiviare.
- **Riepilogo di fine seduta per il paziente**: essenze e compiti, stampabile o copiabile
  come testo da inviare a mano su WhatsApp/email dall'operatore (l'app non invia nulla).
- **Cruscotto d'avvio**: appuntamenti di oggi, bozze di sessione non chiuse,
  pazienti non visti da oltre X mesi.
- **Registro prestazioni**: tipo di seduta e importo opzionale, con esportazione CSV per il
  commercialista. Solo un elenco, **non** un modulo di fatturazione.
- **Backup**: esporta/importa un unico file `.kin` cifrato. Promemoria di backup se l'ultimo
  risale a più di 30 giorni. Il backup è l'unica forma di sincronizzazione prevista:
  l'operatore lo sposta a mano tra i suoi dispositivi.
- **Modelli di sessione**: se l'operatore ripete spesso lo stesso protocollo, può salvare
  una sessione come modello e ripartire da lì. *(Fuori MVP: da fare solo se richiesto.)*

---

## 6. Sicurezza e cifratura

Modello: **un solo operatore, un solo dispositivo, una passphrase.**

- All'avvio del modulo Pazienti: schermata di sblocco con **passphrase**.
  La consultazione dei manuali resta libera e senza passphrase — non va protetta.
- Derivazione chiave: **PBKDF2-SHA256, ≥ 600.000 iterazioni**, salt casuale da 16 byte
  memorizzato in chiaro (è un salt, non un segreto).
- Cifratura record per record: **AES-GCM 256**, IV casuale da 12 byte per ogni scrittura,
  **mai riusato**. Le immagini allegate seguono la stessa strada.
- In IndexedDB finisce **solo ciphertext**. In chiaro resta esclusivamente il minimo
  indispensabile agli indici (id del record, timestamp). Nessun nome, nessuna nota in chiaro.
- La chiave vive **solo in memoria** (`CryptoKey` non estraibile). Mai in
  `localStorage`, mai in `sessionStorage`, mai in un cookie.
- **Auto-lock**: dopo 5 minuti di inattività o al cambio scheda/blocco schermo, la chiave
  viene scartata e serve di nuovo la passphrase.
- **Nessun recupero password.** Va detto esplicitamente in fase di creazione, con conferma:
  passphrase persa = dati persi. È il prezzo del non avere un server, ed è corretto così.
  Contromisura: promemoria di backup + suggerimento di annotare la passphrase altrove.
- Il file di backup è cifrato con lo stesso schema e resta inutilizzabile senza passphrase.
- Cancellazione paziente: **hard delete** del record (niente cestino nascosto) + avviso
  che i backup già esportati non vengono toccati.

> **Limite dichiarato:** questa è cifratura *at rest* contro chi mette le mani sul
> dispositivo o legge il profilo del browser. Non protegge da un dispositivo già compromesso
> con keylogger, né da un'estensione malevola nel browser. Va scritto nella pagina «Privacy»
> dell'app, non nascosto.

## 7. Conformità (GDPR) — il minimo serio

- Pagina **Privacy** dentro l'app: quali dati, dove stanno (solo su questo dispositivo),
  chi è il titolare (l'operatore), come si esportano e come si cancellano.
- **Consenso** del paziente registrato come flag + data nella scheda; il modulo cartaceo
  firmato resta la fonte legale.
- **Esporta i dati di un singolo paziente** in JSON/PDF leggibile (diritto di accesso e
  portabilità) e **cancella un singolo paziente** (diritto alla cancellazione).
- Nessuna condivisione con terzi, nessun analytics, nessuna richiesta di rete: verificabile
  perché l'app è statica.

---

## 8. Modello dati

```js
patient = {
  id, createdAt, updatedAt,
  displayName, birthDate?, phone?, email?,
  tags: [string],
  anamnesi: text, farmaci: text, allergie: text, controindicazioni: text,
  costituzione: { biotipo, costituzioneMTC, temperamento, determinataIl },
  consenso: { dato: bool, data, note },
  color
}

session = {
  id, patientId, date, durataMin?,
  coordinate: [ { id, meridiano, muscolo, esito: 'forte'|'debole'|'nt' } ],
  correzioni: [ { coordinataId, titolo, tecnica, mano } ],
  modi:      [ { coordinataId, tipo: 'NL'|'NV'|'reflex'|'acutouch'|'digitale', voce } ],
  essenze:   [ { nome, atteggiamento, posologia? } ],
  note: text, osservazioni: text, primaDopo: { pre: 0..10, post: 0..10 },
  compitiCasa: text, prossimoPasso: text,
  allegati: [ { id, mime, blobCifrato } ],
  autoCapture: [ { route, ts } ],      // grezzo, per la checklist pre-compilata
  stato: 'bozza'|'chiusa'
}

appointment = {
  id, patientId, start, end, luogo?, note?,
  stato: 'programmato'|'confermato'|'effettuato'|'disdetto'|'assente',
  sessionId?,                          // popolato quando la seduta viene svolta
  ricorrenza?: { ogniSettimane, fino }
}
```

Su disco ogni record diventa `{ id, updatedAt, iv, ciphertext }`.
I campi in chiaro sono solo quelli citati.

## 9. Requisiti UX

- Il modulo vive dietro una nuova voce di menu **«Pazienti»**; la consultazione esistente
  non cambia di una virgola e non richiede mai la passphrase.
- Bersagli ≥ 48px, un'azione principale per schermata, nessun form a più pagine.
- Salvataggio **continuo** in bozza: l'app non deve mai perdere una nota perché il tablet
  si è bloccato o la batteria è finita.
- Tutto modificabile a posteriori, compresa la data della sessione.
- Funziona identico offline: è già un PWA con service worker.
- Dark mode già presente: le nuove schermate la rispettano.

## 10. Ambito MVP

> **Stato: implementato** in `assets/js/store.js`, `assets/js/pazienti.js`,
> `assets/css/pazienti.css` (scheda «Pazienti», hash `#paz`). Anche l'export `.ics`,
> escluso dall'MVP, è entrato perché costava venti righe. Restano fuori: vista settimana
> a griglia (l'agenda è un elenco per giorno), ricorrenze, notifiche locali, modelli di
> sessione, registro prestazioni.


- ✅ Pazienti (anagrafica minima + note permanenti)
- ✅ Sessioni con data, coordinate, correzioni, essenze, note + **cattura automatica**
- ✅ Timeline paziente e confronto con la seduta precedente
- ✅ Cifratura AES-GCM + passphrase + auto-lock
- ✅ Agenda: viste Giorno/Settimana/Lista, stati, apertura sessione dall'appuntamento
- ✅ Backup cifrato esporta/importa, cancellazione ed esportazione per singolo paziente
- ⬜ Fuori MVP: modelli di sessione, registro prestazioni/CSV, export `.ics`, ricorrenze,
  notifiche locali, statistiche, multi-operatore, sincronizzazione tra dispositivi

## 11. Criteri di accettazione

1. Registrare una sessione completa durante la seduta richiede **≤ 3 tocchi** oltre alla
   normale consultazione (inizia → aggiungi → chiudi e salva).
2. Riaprendo l'app dopo il blocco schermo viene richiesta la passphrase e **nessun dato del
   paziente è visibile prima**.
3. Ispezionando IndexedDB dagli strumenti per sviluppatori **non si legge alcun nome, nota o
   contenuto clinico in chiaro**.
4. Un backup esportato si reimporta su un browser pulito e restituisce tutti i dati, e
   **non** si apre con una passphrase sbagliata.
5. L'app non emette **nessuna richiesta di rete** verso terzi: verificabile dal pannello Rete.
6. Chiudendo il tablet a metà sessione e riaprendolo, la bozza è intatta.
