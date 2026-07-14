#!/usr/bin/env python3
"""Genera assets/js/data.js.
Fonti:
- COORDS/ESS (qui sotto): metadati coordinate + elenco fiori.
- tools/monitoraggio.json: movimento + movimentoNote + neuroLinfatici + neurovascolari (Monitoraggio Muscolare).
- tools/atteggiamenti.json: tabella 14 atteggiamenti (resa sotto Affermazioni).
- tools/essenze_dettaglio.json: squilibri + impegno(=frasi) per fiore.
- tools/storia.json: storiaMeridiano (sezione Meridiani).
- tools/affermazioni.json (se presente): affermazioni per coordinata.
- tools/modi.json (se presente): modi per coordinata.
- assets/nlnv/<id>/nl.jpg, nv.jpg: immagini punti NL/NV (dal Monitoraggio Muscolare).
Uso: python tools/generate_data.py  (dalla cartella del progetto)."""
import glob, json, os
COORDS=[
 ("vc-sovraspinato","Vaso Concezione","Sovraspinato","#1a1a1a","Nero"),
 ("vg-grande-rotondo","Vaso Governatore","Grande Rotondo","#e9e9e9","Bianco"),
 ("stomaco-gran-pettorale-clavicolare","Stomaco","Gran Pettorale Clavicolare","#f4d03f","Giallo Chiaro"),
 ("milza-trapezio-medio","Milza","Trapezio Medio","#d4ac0d","Giallo Scuro"),
 ("milza-pancreas-gran-dorsale","Milza/Pancreas","Gran Dorsale","#c9a227","Giallo Scuro"),
 ("cuore-sottoscapolare","Cuore","Sottoscapolare","#922b21","Rosso Scuro"),
 ("intestino-tenue-quadricipite","Intestino Tenue","Quadricipite","#e74c3c","Rosso Chiaro"),
 ("vescica-tibiale-anteriore","Vescica","Tibiale Anteriore","#bb8fce","Viola Chiaro"),
 ("rene-psoas","Rene","Psoas","#6c3483","Viola Scuro"),
 ("maestro-cuore-medio-gluteo","Maestro del Cuore","Medio Gluteo","#ca6f1e","Arancione Scuro"),
 ("tr-tiroide-piccolo-rotondo","Triplice Riscaldatore/Tiroide","Piccolo Rotondo","#f0932b","Arancione Chiaro"),
 ("tr-surrenali-sartorio","Triplice Riscaldatore/Surrenali","Sartorio","#f39c47","Arancione Chiaro"),
 ("vescica-biliare-deltoide-anteriore","Vescica Biliare","Deltoide Anteriore","#52be80","Verde Chiaro"),
 ("fegato-romboide","Fegato","Romboide","#1e8449","Verde Scuro"),
 ("polmone-deltoide-medio","Polmone","Deltoide Medio","#1f618d","Blu Scuro"),
 ("intestino-crasso-tensore-fascia-lata","Intestino Crasso","Tensore Fascia Lata","#5dade2","Blu Chiaro"),
]
ESS={
 "vc-sovraspinato":[("Evening Star","Fiore del Deserto"),("Crab Apple","Fiore di Bach"),("Mimulus","Fiore di Bach"),("Devil's Claw","Fiore del Deserto"),("Bluebell","Fiore Australiano"),("Grey Spider Flower","Fiore Australiano"),("Scleranthus","Fiore di Bach")],
 "vg-grande-rotondo":[("Red Helmet Orchid","Fiore Australiano - VG 2,13"),("Desert Willow","Fiore del Deserto"),("Coral Bean","Fiore del Deserto - IT 7 / C 8")],
 "stomaco-gran-pettorale-clavicolare":[("Chaparral","Fiore del Deserto"),("Cane Cholla Cactus","Fiore del Deserto"),("Waratah","Fiore Australiano - S 3,12"),("Billy Goat Plum","Fiore Australiano - S 1,14")],
 "milza-trapezio-medio":[("Aloe Vera","Fiore del Deserto - M 1 / S 14"),("Arizona White Oak","Fiore del Deserto - P 2 / IC 13"),("Dagger Hakea","Fiore Australiano - M 4,11"),("Black-eyed Susan","Fiore Australiano - M 6,9")],
 "milza-pancreas-gran-dorsale":[("Aloe Vera","Fiore del Deserto"),("Arizona White Oak","Fiore del Deserto")],
 "cuore-sottoscapolare":[("Agave","Fiore del Deserto"),("Prickly Pear Cactus","Fiore del Deserto"),("Sturt Desert Rose","Fiore Australiano - C 4,11"),("Bauhinia","Fiore Australiano - C 7,8")],
 "intestino-tenue-quadricipite":[("Hoptree","Fiore del Deserto"),("Hedgehog Cactus","Fiore del Deserto")],
 "vescica-tibiale-anteriore":[("Pencil Cholla Cactus","Fiore del Deserto"),("Ocotillo","Fiore del Deserto"),("Mariposa Lily","Fiore del Deserto"),("Tall Yellow Top","Fiore Australiano - V 7,8")],
 "rene-psoas":[("Ephedra","Fiore del Deserto"),("Five Corners","Fiore Australiano - R 6,9"),("Paw Paw","Fiore Australiano - R 7,8"),("Dog Rose","Fiore Australiano - R 1,14")],
 "maestro-cuore-medio-gluteo":[("Cow Parsnip","Fiore del Deserto"),("Strawberry Cactus","Fiore del Deserto"),("Fairy Duster","Fiore del Deserto"),("Philotheca","Fiore Australiano - MC 3,12")],
 "tr-tiroide-piccolo-rotondo":[("Flame Tree","Fiore Australiano - TR 4,11"),("Kangaroo Paw","Fiore Australiano - TR 2,13"),("Sundew","Fiore Australiano - TR 3,12")],
 "tr-surrenali-sartorio":[("Flame Tree","Fiore Australiano - TR 4,11"),("Kangaroo Paw","Fiore Australiano - TR 2,13"),("Sundew","Fiore Australiano - TR 3,12")],
 "vescica-biliare-deltoide-anteriore":[("Spineless Prickly Pear","Fiore del Deserto"),("Wolfberry","Fiore del Deserto"),("Wild Potato","Fiore Australiano - VB 2,13"),("Wisteria","Fiore Australiano - VB 3,12")],
 "fegato-romboide":[("Fishhook Cactus","Fiore del Deserto"),("Desert Marigold","Fiore del Deserto"),("Hackberry","Fiore del Deserto"),("Melon Loco","Fiore del Deserto"),("Turkey Bush","Fiore Australiano - F 1,14")],
 "polmone-deltoide-medio":[("White Desert Primrose","Fiore del Deserto"),("Queen of the Night","Fiore del Deserto"),("Whitethorn","Fiore del Deserto"),("Silver Princess","Fiore Australiano - P 4,11"),("Slender Rice Flower","Fiore Australiano - P 5,10")],
 "intestino-crasso-tensore-fascia-lata":[("Ratany","Fiore del Deserto"),("Canyon Grapevine","Fiore del Deserto"),("She Oak","Fiore Australiano - IC 5,10"),("Sturt Desert Pea","Fiore Australiano - IC 1,14"),("Sunshine Wattle","Fiore Australiano - IC 4,11")],
}
def load(p): return json.load(open(p,encoding="utf-8")) if os.path.exists(p) else {}
ATT=load("tools/atteggiamenti.json")
DET=load("tools/essenze_dettaglio.json")
ST=load("tools/storia.json")
MON=load("tools/monitoraggio.json")
AFF=load("tools/affermazioni.json")
MODI=load("tools/modi.json")
FIORI=load("tools/fiori.json")
MER={"vc-sovraspinato":"Vaso Concezione","vg-grande-rotondo":"Vaso Governatore","stomaco-gran-pettorale-clavicolare":"Stomaco","milza-trapezio-medio":"Milza","milza-pancreas-gran-dorsale":"Milza","cuore-sottoscapolare":"Cuore","intestino-tenue-quadricipite":"Intestino Tenue","vescica-tibiale-anteriore":"Vescica","rene-psoas":"Rene","maestro-cuore-medio-gluteo":"Maestro del Cuore","tr-tiroide-piccolo-rotondo":"Triplice Riscaldatore","tr-surrenali-sartorio":"Triplice Riscaldatore","vescica-biliare-deltoide-anteriore":"Vescica Biliare","fegato-romboide":"Fegato","polmone-deltoide-medio":"Polmone","intestino-crasso-tensore-fascia-lata":"Intestino Crasso"}
def js(x): return json.dumps(x, ensure_ascii=False)
def js_list(items): return "["+", ".join(js(x) for x in items)+"]"
def imgs(cid): return [f.replace("\\","/") for f in sorted(glob.glob(f"assets/pages/{cid}/p*.jpg"))]
def nlnv(cid,kind):
    # ordine: scheda riassuntiva, poi pagine dettagliate Agonista e Antagonista
    bases={"nl":["nl","nl_ago","nl_anta"],"nv":["nv","nv_ago","nv_anta"]}[kind]
    out=[]
    for b in bases:
        p=f"assets/nlnv/{cid}/{b}.jpg"
        if os.path.exists(p): out.append(p)
    return out
def collect(cid,bases):
    out=[]
    for b in bases:
        p=f"assets/nlnv/{cid}/{b}.jpg"
        if os.path.exists(p): out.append(p)
    return out
out=['/*',' * data.js - GENERATO da tools/generate_data.py. Non modificare a mano.',
     ' * Aggiorna i tools/*.json (monitoraggio, atteggiamenti, essenze_dettaglio, storia,',
     ' * affermazioni, modi) o ESS in generate_data.py e rilancia lo script.',' */','','const COORDINATE = [']
for (cid,mer,mus,col,cn) in COORDS:
    im=imgs(cid); mon=MON.get(cid,{})
    # Fiore (dal manuale Atteggiamenti, per meridiano)
    fl=FIORI.get(MER.get(cid,""),[]); parts=[]
    for x in fl:
        extra=""
        if x.get("squilibri"): extra+=", squilibri: "+js(x["squilibri"])
        if x.get("frasi"): extra+=", frasi: "+js(x["frasi"])
        parts.append("{ nome: %s, tipo: %s%s }"%(js(x["nome"]),js(x.get("tipo","")),extra))
    fiore_js="[ "+", ".join(parts)+" ]"
    aff=[f"{x['nome']}: {x['frasi']}" for x in fl if x.get("frasi")]
    att=ATT.get(cid); att_js=""
    if att: att_js="\n    atteggiamenti: [ "+", ".join("{ posizione: %d, meridiano: %s, stress: %s }"%(int(p),js(m),js(s)) for p,m,s in att)+" ],"
    st=ST.get(cid,{})
    im_js="["+", ".join(js(p) for p in im)+"]" if im else "[]"
    out+=["  {",
      f"    id: {js(cid)}, muscolo: {js(mus)}, movimento: {js(mon.get('movimento',''))}, movimentoNote: {js(mon.get('movimentoNote',''))}, meridiano: {js(mer)}, colore: {js(col)}, coloreNome: {js(cn)},",
      f"    immaginiMonitoraggio: {js(collect(cid,['mon_musc','mon_org']))}, immaginiAmpiezza: {js(collect(cid,['amp_ago','amp_anta','amp_anta2']))},",
      f"    neuroLinfatici: {js_list(mon.get('neuroLinfatici',[]))},",
      f"    immaginiNL: {js(nlnv(cid,'nl'))},",
      f"    neurovascolari: {js_list(mon.get('neurovascolari',[]))},",
      f"    immaginiNV: {js(nlnv(cid,'nv'))},",
      f"    modi: {js_list(MODI.get(cid,[]))},",
      f"    affermazioni: {js_list(aff if aff else AFF.get(cid,[]))},{att_js}",
      "    storiaMeridiano: %s,"%(js(st.get("meridiano",""))),
      f"    fiore: {fiore_js},",
      f"    immagini: {im_js}","  },"]
out+=["];","",'if (typeof window !== "undefined") window.COORDINATE = COORDINATE;']
open("assets/js/data.js","w",encoding="utf-8").write("\n".join(out)+"\n")
print("data.js rigenerato:", len(COORDS), "coordinate. Monitoraggio:", len(MON))
