import re, subprocess, sys
# Percorso del PDF sorgente: variabile d'ambiente COST_PDF, altrimenti la cartella PDF
# accanto alla cartella del progetto.
import os as _os
PDF = _os.environ.get("COST_PDF") or _os.path.join(
    _os.path.dirname(_os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))),
    "PDF", "Costituzioni-Finale-2014-.pdf")
def words(pg):
    x = subprocess.run(["pdftotext","-f",str(pg),"-l",str(pg),"-bbox",PDF,"-"],
                       capture_output=True,text=True).stdout
    out=[]
    for m in re.finditer(r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</word>', x):
        t=m.group(5).replace("&amp;","&").replace("&lt;","<").replace("&gt;",">").replace("&#39;","'").replace("&quot;",'"')
        out.append((float(m.group(1)),float(m.group(2)),float(m.group(3)),float(m.group(4)),t))
    return out
def lines_in(pg, x0, x1, y0=0, y1=9999, tol=4):
    ws=[w for w in words(pg) if x0<=(w[0]+w[2])/2<x1 and w[1]>=y0 and w[3]<=y1]
    ws.sort(key=lambda w:(round(w[1]/tol), w[0]))
    out, cur, cy = [], [], None
    for w in ws:
        if cy is None or abs(w[1]-cy)<=tol: cur.append(w[4]); cy = w[1] if cy is None else cy
        else: out.append(" ".join(cur)); cur=[w[4]]; cy=w[1]
    if cur: out.append(" ".join(cur))
    return out
if __name__=="__main__":
    import collections
    for pg in (50,51):
        xs=sorted(set(round(w[0]) for w in words(pg)))
        print(pg, xs[:40])

def columns(pg, starts, y0=0, y1=9999, tol=4):
    """Assegna ogni parola alla colonna il cui inizio e' il piu' vicino a sinistra."""
    ws=[w for w in words(pg) if w[1]>=y0 and w[3]<=y1]
    cols=[[] for _ in starts]
    for w in ws:
        i=max((k for k,s in enumerate(starts) if w[0]>=s-3), default=0)
        cols[i].append(w)
    out=[]
    for col in cols:
        col.sort(key=lambda w:(round(w[1]/tol), w[0]))
        ls, cur, cy = [], [], None
        for w in col:
            if cy is None or abs(w[1]-cy)<=tol: cur.append(w[4]); cy=w[1] if cy is None else cy
            else: ls.append(" ".join(cur)); cur=[w[4]]; cy=w[1]
        if cur: ls.append(" ".join(cur))
        out.append(ls)
    return out
