# Brief di prodotto — App Consultazione Fisiologia Applicata

> Versione migliorata e strutturata del prompt iniziale. Usala come specifica di riferimento
> per lo sviluppo e per dare istruzioni a un modello AI o a uno sviluppatore.

## 1. In una frase
Web app di **consultazione rapida** per il chinesiologo: sceglie una **coordinata**
(coppia Meridiano ↔ Muscolo) e accede in pochi tocchi a **tutte** le informazioni correlate —
correzioni Basket Weaver, storia del problema, storia del meridiano, atteggiamenti ed essenze.

## 2. Obiettivo
Rendere la fruizione del materiale (i 3 manuali di Fisiologia Applicata) **veloce, fluida e
senza attrito**. Il professionista, anche durante una seduta, deve arrivare all'informazione
giusta in **massimo 2–3 tocchi**, senza cercare tra le pagine.

## 3. Utente e contesto d'uso
- **Chi:** chinesiologo, anche poco pratico di tecnologia. Zero curva di apprendimento.
- **Dove:** in studio, spesso **in piedi con un tablet in mano** durante la seduta.
- **Come:** consultazione a colpo d'occhio; niente testo denso, gerarchia visiva chiara,
  bersagli grandi per il tocco.

## 4. Principio di navigazione (il cuore dell'app)
Il materiale è organizzato attorno alla **coordinata = Meridiano ↔ Muscolo** (16 coppie,
codificate a colore secondo la ruota della Fisiologia Applicata).

Flusso:
1. **Scelgo la coordinata** — griglia di card color-codificate + ricerca istantanea
   (per meridiano, muscolo o colore).
2. **Vedo tutto il correlato** in un'unica schermata con sezioni ad accesso diretto:
   - **Correzioni (Basket Weaver)** — posizioni, riflessologia, tecniche (sfregare, tapping, acutouch, nutrire), mano dominante.
   - **Storia del problema** — l'evoluzione dello squilibrio.
   - **Storia del meridiano** — significato e percorso energetico.
   - **Atteggiamenti ed essenze** — correlazione emotiva/floreale.
3. **Salto tra sezioni** con una barra di ancore sempre visibile (nessuno scroll cieco).

## 5. Requisiti UX/UI
- **Tablet-first**, poi responsive per PC e smartphone (una sola base di codice).
- Grafica **pulita e funzionale**: molto spazio bianco, tipografia leggibile a distanza,
  colore del meridiano come accento della schermata.
- Bersagli tocco ≥ 48px, contrasto elevato, nessun menu nascosto complesso.
- **Ricerca sempre in cima**, filtro in tempo reale.
- **Funziona offline** (nessun login, nessun server): si apre da file o si ospita come sito statico.
- Prestazioni: caricamento istantaneo, nessun framework pesante.

## 6. Modello dati
Ogni coordinata è un oggetto:
```
{
  id, meridiano, muscolo, colore (hex), coloreNome,
  correzioni: [ { titolo, tecnica, descrizione } ],
  storiaProblema: testo,
  storiaMeridiano: testo,
  essenze: [ { nome, atteggiamento } ]
}
```
I contenuti testuali vengono popolati dai manuali; la struttura resta fissa e uniforme
per ogni coordinata (ordine eccellente e prevedibile).

## 7. Le 16 coordinate (Meridiano — Muscolo — Colore)
1. Vaso Concezione — Sovraspinato — Nero
2. Vaso Governatore — Grande Rotondo — Bianco
3. Stomaco — Gran Pettorale Clavicolare — Giallo Chiaro
4. Milza — Trapezio Medio — Giallo Scuro
5. Milza/Pancreas — Gran Dorsale — Giallo Scuro
6. Cuore — Sottoscapolare — Rosso Scuro
7. Intestino Tenue — Quadricipite — Rosso Chiaro
8. Vescica — Tibiale Anteriore — Viola Chiaro
9. Rene — Psoas — Viola Scuro
10. Maestro del Cuore — Medio Gluteo — Arancione Scuro
11. Triplice Riscaldatore/Tiroide — Piccolo Rotondo — Arancione Chiaro
12. Triplice Riscaldatore/Surrenali — Sartorio — Arancione Chiaro
13. Vescica Biliare — Deltoide Anteriore — Verde Chiaro
14. Fegato — Romboide — Verde Scuro
15. Polmone — Deltoide Medio — Blu Scuro
16. Intestino Crasso — Tensore Fascia Lata — Blu Chiaro

## 8. Ambito MVP
- ✅ Consultazione del materiale con il flusso coordinata → tutto il correlato.
- ✅ Ricerca/filtro istantaneo, navigazione a sezioni, responsive tablet.
- ⬜ (fuori MVP) editing dei contenuti in-app, note per paziente, account, sincronizzazione cloud.

## 9. Stack tecnico
HTML + CSS + JavaScript vanilla, nessun build step. Dati in un file `data.js` facile da
aggiornare. Deployabile come sito statico (GitHub Pages) o apribile in locale.

## 10. Fonti
- Manuale Basket Weaver di Fisiologia Applicata — Stress, la natura del male (R. Utt)
- Manuale Monitoraggio Muscolare di Fisiologia Applicata
- Atteggiamenti con le essenze
