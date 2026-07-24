/* punti_data.js — dati Punti d'Allarme (macrosezione Punti Indicatori).
   Generato da tools/punti_indicatori.json. NON editare a mano. */
window.PUNTI_INDICATORI = {
  "titolo": "Punti d'Allarme",
  "descrizione": "Punti Mu (allarme) di riferimento. Trascritti dalla tavola cliente (figura fronte + figura retro). Convenzione soggetto: x<0 = lato DESTRO del soggetto, x>0 = lato SINISTRO; y: 0=pube … ~2.6=vertice; z>0 fronte, z<0 retro. Coordinate su manichino normalizzato, calibrate sul profilo del torso.",
  "punti": [
    {
      "id": "polmone-dx",
      "organo": "Polmone (dx)",
      "meridiano": "Polmone",
      "vista": "fronte",
      "lato": "destra soggetto",
      "regione": "torace alto, sotto-clavicolare",
      "riferimento": "regione sotto-clavicolare destra (1°-2° spazio intercostale, vicino alla spalla)",
      "note": "punto bilaterale (uno per lato)",
      "pos": {
        "x": -0.3,
        "y": 2.02,
        "z": 0.272
      }
    },
    {
      "id": "polmone-sx",
      "organo": "Polmone (sx)",
      "meridiano": "Polmone",
      "vista": "fronte",
      "lato": "sinistra soggetto",
      "regione": "torace alto, sotto-clavicolare",
      "riferimento": "regione sotto-clavicolare sinistra (1°-2° spazio intercostale, vicino alla spalla)",
      "note": "punto bilaterale (uno per lato)",
      "pos": {
        "x": 0.3,
        "y": 2.02,
        "z": 0.272
      }
    },
    {
      "id": "maestro-del-cuore",
      "organo": "Maestro del Cuore",
      "meridiano": "Maestro del Cuore (Pericardio)",
      "vista": "fronte",
      "lato": "destra soggetto",
      "regione": "torace medio",
      "riferimento": "lato destro del torace, mediale rispetto al polmone destro",
      "note": "",
      "pos": {
        "x": -0.24,
        "y": 1.82,
        "z": 0.304
      }
    },
    {
      "id": "cuore",
      "organo": "Cuore",
      "meridiano": "Cuore",
      "vista": "fronte",
      "lato": "mediana",
      "regione": "sterno",
      "riferimento": "linea mediana, corpo dello sterno",
      "note": "",
      "pos": {
        "x": 0.0,
        "y": 1.8,
        "z": 0.344
      }
    },
    {
      "id": "stomaco",
      "organo": "Stomaco",
      "meridiano": "Stomaco",
      "vista": "fronte",
      "lato": "mediana",
      "regione": "epigastrio",
      "riferimento": "linea mediana, epigastrio (subito sotto il processo xifoideo)",
      "note": "",
      "pos": {
        "x": 0.0,
        "y": 1.58,
        "z": 0.304
      }
    },
    {
      "id": "vescica-biliare",
      "organo": "Vescica Biliare",
      "meridiano": "Vescica Biliare",
      "vista": "fronte",
      "lato": "sinistra soggetto",
      "regione": "arcata costale sinistra",
      "riferimento": "sotto il coperchio (arcata costale), su cartilagine della 6ª costa",
      "note": "sotto coperchio, su cartilag. costa 6",
      "pos": {
        "x": 0.26,
        "y": 1.52,
        "z": 0.228
      }
    },
    {
      "id": "fegato",
      "organo": "Fegato",
      "meridiano": "Fegato",
      "vista": "fronte",
      "lato": "sinistra soggetto",
      "regione": "arcata costale sinistra, sotto la vescica biliare",
      "riferimento": "6° spazio intercostale, sotto il coperchio (arcata costale)",
      "note": "6° spazio intercostale, sotto coperchio",
      "pos": {
        "x": 0.3,
        "y": 1.42,
        "z": 0.183
      }
    },
    {
      "id": "triplice-riscaldatore",
      "organo": "Triplice Riscaldatore",
      "meridiano": "Triplice Riscaldatore",
      "vista": "fronte",
      "lato": "mediana",
      "regione": "addome, sotto l'ombelico",
      "riferimento": "linea mediana dell'addome, sotto l'ombelico",
      "note": "",
      "pos": {
        "x": 0.0,
        "y": 1.16,
        "z": 0.231
      }
    },
    {
      "id": "intestino-tenue",
      "organo": "Intestino Tenue",
      "meridiano": "Intestino Tenue",
      "vista": "fronte",
      "lato": "mediana",
      "regione": "basso addome",
      "riferimento": "linea mediana del basso addome (tra ombelico e pube)",
      "note": "",
      "pos": {
        "x": 0.0,
        "y": 1.0,
        "z": 0.259
      }
    },
    {
      "id": "intestino-crasso-dx",
      "organo": "Intestino Crasso (dx)",
      "meridiano": "Intestino Crasso",
      "vista": "fronte",
      "lato": "destra soggetto",
      "regione": "basso addome laterale",
      "riferimento": "basso addome, lateralmente alla mediana (bilaterale)",
      "note": "punto bilaterale (uno per lato)",
      "pos": {
        "x": -0.26,
        "y": 0.94,
        "z": 0.204
      }
    },
    {
      "id": "intestino-crasso-sx",
      "organo": "Intestino Crasso (sx)",
      "meridiano": "Intestino Crasso",
      "vista": "fronte",
      "lato": "sinistra soggetto",
      "regione": "basso addome laterale",
      "riferimento": "basso addome, lateralmente alla mediana (bilaterale)",
      "note": "punto bilaterale (uno per lato)",
      "pos": {
        "x": 0.26,
        "y": 0.94,
        "z": 0.204
      }
    },
    {
      "id": "vescica",
      "organo": "Vescica",
      "meridiano": "Vescica",
      "vista": "fronte",
      "lato": "mediana",
      "regione": "ipogastrio sovrapubico",
      "riferimento": "linea mediana sovrapubica (appena sopra il pube)",
      "note": "",
      "pos": {
        "x": 0.0,
        "y": 0.82,
        "z": 0.284
      }
    },
    {
      "id": "rene-dx",
      "organo": "Rene (dx)",
      "meridiano": "Rene",
      "vista": "retro",
      "lato": "destra soggetto",
      "regione": "regione lombare posteriore",
      "riferimento": "sull'ultima costa (12ª), regione lombare destra",
      "note": "ultima costa · bilaterale",
      "pos": {
        "x": -0.2,
        "y": 1.34,
        "z": -0.214
      }
    },
    {
      "id": "rene-sx",
      "organo": "Rene (sx)",
      "meridiano": "Rene",
      "vista": "retro",
      "lato": "sinistra soggetto",
      "regione": "regione lombare posteriore",
      "riferimento": "sull'ultima costa (12ª), regione lombare sinistra",
      "note": "ultima costa · bilaterale",
      "pos": {
        "x": 0.2,
        "y": 1.34,
        "z": -0.214
      }
    },
    {
      "id": "milza",
      "organo": "Milza",
      "meridiano": "Milza",
      "vista": "retro",
      "lato": "sinistra soggetto",
      "regione": "regione costale posteriore sinistra",
      "riferimento": "sulla penultima costa (11ª), lato sinistro posteriore",
      "note": "penultima costa",
      "pos": {
        "x": 0.34,
        "y": 1.46,
        "z": -0.188
      }
    }
  ]
};
