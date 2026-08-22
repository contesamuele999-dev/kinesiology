/* config.js — configurazione della copia pubblicata dell'app.

   Il Fornitore NON eroga alcun server: l'app funziona interamente sul
   dispositivo e nessun dato esce di lì. Chi vuole sincronizzare fra più
   dispositivi installa un proprio Worker (istruzioni in sync/README.md) e
   ne incolla l'indirizzo nelle impostazioni: da quel momento il
   responsabile del trattamento è chi gestisce quel server, non l'autore
   dell'app. Lasciare syncUrl vuoto è quindi una scelta, non una svista. */
window.KIN_CONFIG = {
  /* Indirizzo di un Worker di sync. Vuoto = nessun server preconfigurato. */
  syncUrl: "",

  /* Codice di invito, se il Worker ne richiede uno (variabile INVITE_CODES). */
  syncInvito: "",

  /* Il sync automatico non parte mai da solo: lo accende l'operatore
     dopo aver configurato un server proprio. */
  syncAuto: false
};
