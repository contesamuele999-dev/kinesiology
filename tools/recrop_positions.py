#!/usr/bin/env python3
"""
recrop_positions.py — Ri-ritaglia le immagini per-posizione (NL, NV, Ampiezza)
dal manuale Monitoraggio Muscolare con box ampi e CENTRATI: i punti e la
didascalia "Posizione N" restano sempre dentro il ritaglio.

La griglia (14 posizioni su 2 pagine ago[1-7]/anta[8-14]) e' regolare: 4 righe
di passo costante. La posizione verticale della griglia varia leggermente da
pagina a pagina (es. il blocco Quadricipite e' piu' in basso): per questo il
bordo alto (gt) e quello basso della griglia (gb) vengono RILEVATI per pagina e
le 4 righe distribuite uniformemente tra i due. Le colonne (coppia di figure per
NL/NV; figura+ruota per Ampiezza) sono frazioni fisse della larghezza.
Blocco titolo: agonista -> riga2 destra; antagonista -> riga2 sinistra
(Pos10 quindi dalla colonna destra della riga2).

USO: python3 tools/recrop_positions.py ["<path Monitoraggio.pdf>"]
"""
import sys, os, subprocess, glob
import numpy as np
from PIL import Image

PDF = sys.argv[1] if len(sys.argv) > 1 else \
    "/sessions/eager-nice-galileo/mnt/PDF/Manuale Monitoraggio Muscolare di Fisiologia Applicata.pdf"
DPI = "150"; THR = 85

S = {
 "vc-sovraspinato":35,"vg-grande-rotondo":45,"stomaco-gran-pettorale-clavicolare":55,
 "milza-pancreas-gran-dorsale":65,"milza-trapezio-medio":75,"cuore-sottoscapolare":85,
 "intestino-tenue-quadricipite":96,"vescica-tibiale-anteriore":106,"rene-psoas":116,
 "maestro-cuore-medio-gluteo":126,"tr-tiroide-piccolo-rotondo":136,"tr-surrenali-sartorio":146,
 "vescica-biliare-deltoide-anteriore":156,"fegato-romboide":166,"polmone-deltoide-medio":176,
 "intestino-crasso-tensore-fascia-lata":186,
}
def pages_for(cid):
    s = S[cid]
    if cid == "intestino-tenue-quadricipite":   # blocco 11 pp. (Ampiezza duplicata a p92)
        return {"amp_ago":89,"amp_anta":90,"nl_ago":91,"nl_anta":93,"nv_ago":94,"nv_anta":95}
    return {"amp_ago":s-6,"amp_anta":s-5,"nl_ago":s-4,"nl_anta":s-3,"nv_ago":s-2,"nv_anta":s-1}

# colonne (frazioni di W)
NLNV_L=(0.137,0.517); NLNV_R=(0.546,0.922)
AMP_L =(0.139,0.523); AMP_R =(0.527,0.913)
def maps(L,R):
    ago ={1:(L,0),2:(R,0),3:(L,1),4:(L,2),5:(R,2),6:(L,3),7:(R,3)}
    anta={8:(L,0),9:(R,0),10:(R,1),11:(L,2),12:(R,2),13:(L,3),14:(R,3)}
    return ago,anta

def _maxrun(row):
    b=c=0
    for v in row:
        if v:
            c+=1
            if c>b:b=c
        else:c=0
    return b
def rows_of(a):
    """Rileva gt/gb e distribuisce 4 righe uniformi. Ritorna lista (y0,y1)."""
    H,W=a.shape
    x0,x1=int(0.10*W),int(0.90*W)
    dark=a[:,x0:x1]<THR; frac=dark.mean(axis=1)
    gt=None
    for y in range(int(0.06*H),int(0.145*H)):
        if _maxrun(dark[y])>150: gt=y; break
    if gt is None: gt=int(0.090*H)
    gb=None
    for y in range(int(0.945*H),int(0.84*H),-1):
        if frac[max(0,y-5):y].mean()>0.07: gb=y+4; break
    if gb is None: gb=int(0.892*H)
    pitch=(gb-gt)/4.0
    return [(gt+i*pitch-8, gt+(i+1)*pitch+8) for i in range(4)]

def render(pg):
    stem=f"/tmp/_rc_{pg}"
    for f in glob.glob(stem+"*"): os.remove(f)
    subprocess.run(["pdftoppm","-f",str(pg),"-l",str(pg),"-r",DPI,"-jpeg",
                    "-jpegopt","quality=88",PDF,stem],check=True)
    return glob.glob(stem+"*.jpg")[0]

def crop_page(fn,mapping,outdir,prefix):
    im=Image.open(fn); W,H=im.size
    rows=rows_of(np.asarray(im.convert("L")))
    for pos,(col,ri) in mapping.items():
        y0,y1=rows[ri]
        box=(int(col[0]*W),int(max(0,y0)),int(col[1]*W),int(min(H,y1)))
        im.crop(box).save(os.path.join(outdir,f"{prefix}_{pos}.jpg"),quality=82)

def main():
    only=set(sys.argv[2:])  # opzionale: limita a certi id
    for cid in S:
        if only and cid not in only: continue
        pg=pages_for(cid)
        outdir=f"assets/nlnv/{cid}/pos"; os.makedirs(outdir,exist_ok=True)
        nl_ago,nl_anta=maps(NLNV_L,NLNV_R)
        amp_ago,amp_anta=maps(AMP_L,AMP_R)
        crop_page(render(pg["nl_ago"]), nl_ago,  outdir,"nl")
        crop_page(render(pg["nl_anta"]),nl_anta, outdir,"nl")
        crop_page(render(pg["nv_ago"]), nl_ago,  outdir,"nv")
        crop_page(render(pg["nv_anta"]),nl_anta, outdir,"nv")
        crop_page(render(pg["amp_ago"]),amp_ago, outdir,"amp")
        crop_page(render(pg["amp_anta"]),amp_anta,outdir,"amp")
        print(f"OK {cid}: {pg}")
    print("--- fatto ---")

if __name__=="__main__":
    main()
