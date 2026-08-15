/* config.js — configurazione della copia pubblicata dell'app.
   Modifica questo file UNA VOLTA, prima di pubblicare: tutti gli utenti che
   installano l'app trovano il sync già impostato e non devono incollare niente.
   Le impostazioni dell'app restano modificabili dal singolo operatore e, se
   le cambia, vincono sulle scelte fatte qui. */
window.KIN_CONFIG = {
  /* Indirizzo del Worker di sync. Vuoto = nessun sync preconfigurato:
     l'app funziona solo in locale finché l'operatore non ne inserisce uno.
     Esempio: "https://kin-sync.tuonome.workers.dev" */
  syncUrl: "https://kin-sync.kinesiology.workers.dev/",

  /* Codice di invito, se il Worker ne richiede uno (variabile INVITE_CODES).
     Serve solo alla prima attivazione di ogni nuovo operatore. */
  syncInvito: "",

  /* Con un syncUrl impostato, il sync automatico parte da solo.
     Metti false se preferisci che ogni operatore lo accenda a mano. */
  syncAuto: true
};
