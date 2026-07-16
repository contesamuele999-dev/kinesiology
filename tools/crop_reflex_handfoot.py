#!/usr/bin/env python3
"""crop_reflex_handfoot.py — Ritaglia da manuale Basket Weaver le viste
Reflessologia MANO (dominante dx/sx) e PIEDE (dominante dx/sx) per singola
posizione (1..14), piu' la RUOTA del muscolo.

Le pagine sono gia' rese in assets/pages/<id>/pNN.jpg. La griglia e' 2 colonne
(coppia Sinistra+Destra) x 4 righe; blocco-titolo in riga2 (1-7: riga2-destra;
8-14: riga2-sinistra -> Pos10 in riga2-destra). Righe e colonne rilevate dai
bordi-box (robusto su sfondi colorati). Mappa pagina->ruolo verificata via OCR.

Output: assets/pages/<id>/pos/{refhand_dx,refhand_sx,reffoot_dx,reffoot_sx}_<N>.jpg
        assets/pages/<id>/ruota.jpg
USO: python3 tools/crop_reflex_handfoot.py [id ...]
"""
import os, sys, glob, shutil
import numpy as np
from PIL import Image

# [pagina_1-7, pagina_8-14]  (None se assente nel manuale)
STD = dict(hand_dx=[4,5], hand_sx=[6,7], foot_dx=[8,9], foot_sx=[10,11], wheel=12)
ROLES = {
 "vc-sovraspinato":STD, "vg-grande-rotondo":STD,
 "stomaco-gran-pettorale-clavicolare":STD, "cuore-sottoscapolare":STD,
 "intestino-tenue-quadricipite":STD, "vescica-tibiale-anteriore":STD,
 "rene-psoas":dict(hand_dx=[4,5], hand_sx=[6,7], foot_dx=[8,None], foot_sx=[None,9], wheel=10),
 "milza-trapezio-medio":dict(hand_dx=[4,None], hand_sx=[None,5], foot_dx=[6,7], foot_sx=[8,9], wheel=10),
 "milza-pancreas-gran-dorsale":dict(hand_dx=[4,5], hand_sx=[6,9], foot_dx=[10,11], foot_sx=[12,13], wheel=14),
}
AGO ={1:('L',0),2:('R',0),3:('L',1),4:('L',2),5:('R',2),6:('L',3),7:('R',3)}
ANTA={8:('L',0),9:('R',0),10:('R',1),11:('L',2),12:('R',2),13:('L',3),14:('R',3)}

def geometry(cid):
    """Rileva griglia dalla pagina p04 (1-7, pulita) e la riusa per tutte le pagine."""
    path=f"assets/pages/{cid}/p04.jpg"
    a=np.asarray(Image.open(path).convert("L")); H,W=a.shape
    thr=max(50,int(np.percentile(a,5))+28); dark=a<thr
    colsum=dark[int(0.15*H):int(0.85*H)].mean(0)
    xs=[x for x in range(W) if colsum[x]>0.30]; g=[]
    for i in xs:
        if g and i-g[-1][-1]<=5: g[-1].append(i)
        else: g.append([i])
    vb=[int(np.mean(v)) for v in g if np.mean(v)>15]
    left=[v for v in vb if v<0.51*W]; right=[v for v in vb if v>=0.51*W]
    L=(min(left),max(left)); R=(min(right),max(right))
    rowdark=dark[:,L[0]:L[1]].mean(1)
    hy=[y for y in range(H) if rowdark[y]>0.55]; gg=[]
    for i in hy:
        if gg and i-gg[-1][-1]<=6: gg[-1].append(i)
        else: gg.append([i])
    hb=[int(np.mean(v)) for v in gg if 30<np.mean(v)<H-25][:8]
    assert len(hb)==8, f"{cid}: hborders={hb}"
    tops=hb[0::2]; bots=hb[1::2]
    return W,H,L,R,tops,bots

def crop_page(path, mapping, outdir, prefix, geom):
    im=Image.open(path); W,H,L,R,tops,bots=geom
    cols={'L':L,'R':R}
    for pos,(cl,ri) in mapping.items():
        col=cols[cl]; top=tops[ri]
        y0=max(0,top-6)
        y1=min(H, (bots[ri]+46) if ri==3 else top+270)
        box=(col[0]-8, y0, col[1]+8, y1)
        im.crop(box).save(os.path.join(outdir,f"{prefix}_{pos}.jpg"),quality=84)

def do(cid):
    roles=ROLES[cid]; base=f"assets/pages/{cid}"
    outdir=f"{base}/pos"; os.makedirs(outdir,exist_ok=True)
    def page(n): return f"{base}/p{n:02d}.jpg"
    geom=geometry(cid)
    plan=[("hand_dx","refhand_dx"),("hand_sx","refhand_sx"),
          ("foot_dx","reffoot_dx"),("foot_sx","reffoot_sx")]
    for role,prefix in plan:
        p17,p814=roles[role]
        if p17: crop_page(page(p17), AGO,  outdir, prefix, geom)
        if p814:crop_page(page(p814),ANTA, outdir, prefix, geom)
    if roles.get("wheel"):
        shutil.copy(page(roles["wheel"]), f"{base}/ruota.jpg")
    print(f"OK {cid}")

if __name__=="__main__":
    ids=sys.argv[1:] or list(ROLES)
    for cid in ids: do(cid)
    print("--- fatto ---")
