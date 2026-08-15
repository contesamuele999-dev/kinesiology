# Sync fra dispositivi — Cloudflare Workers + D1

Permette di usare la stessa area pazienti su tablet, telefono e computer.
Il server **non può leggere i dati**: riceve e restituisce solo ciphertext.
La chiave resta sul dispositivo, derivata dalla passphrase.

Piano gratuito Cloudflare: 100.000 richieste al giorno, D1 5 GB e 5 milioni di
letture al giorno. Per uno studio è ordini di grandezza sopra il necessario.
Non serve la carta di credito.

## Installazione (una volta sola, ~10 minuti)

1. Crea un account gratuito su <https://dash.cloudflare.com/sign-up>.
2. Installa Node.js, poi da questa cartella (`sync/`):

```bash
npx wrangler login
```

3. Crea il database e copia l'`database_id` stampato dentro `wrangler.toml`:

```bash
npx wrangler d1 create kin-sync
```

4. Crea le tabelle:

```bash
npx wrangler d1 execute kin-sync --remote --file=schema.sql
```

5. Pubblica il Worker:

```bash
npx wrangler deploy
```

Wrangler stampa l'indirizzo, del tipo `https://kin-sync.<tuo-nome>.workers.dev`.

6. Nell'app: **Pazienti → Impostazioni → Sync fra dispositivi**, incolla
   l'indirizzo e premi «Sincronizza adesso».

## Aggiungere un secondo dispositivo

1. Sul dispositivo che ha già i dati: **Impostazioni → Esporta backup** (file `.kin`).
2. Portalo sul nuovo dispositivo (chiavetta, AirDrop, allegato: è cifrato).
3. Sul nuovo dispositivo apri **Pazienti** e, nella schermata iniziale, usa
   **«⬆ Importa backup da un altro dispositivo»**. Poi sblocca con la stessa passphrase.
4. Incolla l'indirizzo del Worker e sincronizza.

> **Non basta ricreare l'area con la stessa passphrase.** Ogni area nuova genera
> un salt casuale, e da salt diversi escono chiave e spazio diversi: il secondo
> dispositivo finirebbe in uno spazio separato e vuoto, senza errori visibili.
> È il backup a trasportare il salt, cioè l'identità dell'area.

## Come funziona

- Ogni record sta già sul dispositivo come `{ id, updatedAt, iv, ct }`. Il sync
  spedisce esattamente quello, in base64.
- Il token di autenticazione è la **seconda metà** della derivazione PBKDF2
  (512 bit: primi 32 byte = chiave AES, ultimi 32 = token). Chi ruba il token
  dal server non ottiene materiale per decifrare.
- Il server identifica lo spazio con `SHA-256("kin-space|" + token)`: il token
  in chiaro non viene mai salvato.
- Conflitti: vince l'`updatedAt` più recente (last-write-wins). Con un solo
  operatore su 2–3 dispositivi è la scelta giusta; se un giorno più persone
  modificano lo stesso paziente insieme, serve qualcosa di più fine.
- Le cancellazioni viaggiano come lapidi, altrimenti l'altro dispositivo
  farebbe resuscitare il record.

## Limiti da conoscere

- **Il sync non è un backup**: replica anche le cancellazioni. Continua a
  esportare il `.kin` (Impostazioni → Esporta backup).
- Le foto allegate viaggiano dentro il record. Sono già ridimensionate a
  1600 px, ma una seduta con molte foto può avvicinarsi al limite di riga di
  D1 (il Worker rifiuta oltre ~900 KB per record, con un messaggio chiaro).
- Dati sanitari su un server terzo: sono cifrati end-to-end, ma il rapporto con
  Cloudflare resta un trattamento (GDPR art. 28). Accetta il DPA dal pannello
  Cloudflare e, se vuoi tenere tutto in UE, attiva la *EU data boundary*.
- «Cancella tutto» nell'app svuota il dispositivo. Per svuotare anche il
  server usa **prima** il pulsante «Cancella anche sul server»: dopo il wipe
  locale il token non è più derivabile.

## Test

```bash
node ../tools/test_sync.js
```

Verifica la derivazione del token (che non coincida con la chiave dati),
l'hash dello spazio e la regola di risoluzione dei conflitti.
