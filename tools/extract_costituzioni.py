# -*- coding: utf-8 -*-
"""Estrae il manuale «Costituzioni & Temperamenti» (58 pp.) in JSON strutturato."""
import re, json, subprocess
from pdf_bbox import columns

# Percorso del PDF sorgente: variabile d'ambiente COST_PDF, altrimenti la cartella PDF
# accanto alla cartella del progetto.
import os as _os
PDF = _os.environ.get("COST_PDF") or _os.path.join(
    _os.path.dirname(_os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))),
    "PDF", "Costituzioni-Finale-2014-.pdf")
import subprocess as _sp
PAGES = _sp.run(["pdftotext", "-layout", PDF, "-"], capture_output=True,
                text=True).stdout.split("\f")
sp = lambda s: re.sub(r"\s+", " ", s).strip()
nk = lambda s: sp(s).replace("ELEMENTGARE", "ELEMENTARE").replace("PERSONALITA\u2019", "PERSONALIT\u00c0")

def P(n):
    out = []
    for l in PAGES[n-1].split("\n"):
        s = l.strip()
        if not s or s == "COSTITUZIONI & TEMPERAMENTI" or re.fullmatch(r"\d{1,3}", s):
            continue
        out.append(l.rstrip())
    return out

def cells(line):
    return [(m.start(), m.group().strip()) for m in re.finditer(r"\S+(?: \S+)*", line)]

def paragrafi(lines):
    txt = [l.strip() for l in lines if l.strip()]
    parts, cur = [], []
    for l in txt:
        if cur and (l.startswith(("■", "•")) or cur[-1].endswith((".", ":", "!", "?"))):
            parts.append(" ".join(cur)); cur = []
        cur.append(l.lstrip("■• ").strip() if l.startswith(("■", "•")) else l)
    if cur: parts.append(" ".join(cur))
    return [sp(p) for p in parts if sp(p)]

def col_text(pg, x, w):
    r = subprocess.run(["pdftotext", "-f", str(pg), "-l", str(pg), "-x", str(x), "-y", "100",
                        "-W", str(w), "-H", "742", PDF, "-"], capture_output=True, text=True)
    return [l.strip() for l in r.stdout.split("\n") if l.strip()]

# ----------------------------------------------------------------- tabelle 2x2
def tab_kv(lines, known_l, known_r, b=(12, 38, 58)):
    """Righe con 2 coppie chiave/valore. Le chiavi possono occupare piu' righe:
       una nuova riga inizia solo quando la chiave corrente e' completa."""
    rows = []
    for line in lines:
        cs = cells(line)
        if not cs: continue
        bk = [[], [], [], []]
        for c, t in cs:
            i = 0 if c < b[0] else (1 if c < b[1] else (2 if c < b[2] else 3))
            bk[i].append(t)
        nuovo = bk[0] and (not rows or nk(" ".join(rows[-1][0])) in known_l)
        if nuovo: rows.append([list(x) for x in bk])
        elif rows:
            for i in range(4): rows[-1][i].extend(bk[i])
        else: rows.append([list(x) for x in bk])
    out = []
    for r in rows:
        k1, v1 = nk(" ".join(r[0])), sp(" ".join(r[1]))
        k2, v2 = nk(" ".join(r[2])), sp(" ".join(r[3]))
        if k1: out.append({"k": k1, "v": v1})
        if k2: out.append({"k": k2, "v": v2})
    for o in out:
        if o["k"] not in known_l and o["k"] not in known_r:
            print("  ⚠ chiave inattesa:", repr(o["k"]))
    return out

KL_A = {"CORPURATURA", "CUTE", "COLORITO DEL VOLTO", "CAPELLI", "DENTI",
        "SINTOMI CHIAVE PRIMARIO", "SINTOMI ACCESSORI", "NEUROPEPTIDE CARENTE",
        "COMPORTAMENTO IN BASE AI NEUROPEPTIDI",
        "CAUSE POSSIBILI DI SQUILIBRIO NEUROPSICHICO",
        "DOSAGGIO DEGLI INTEGRATORI O RIMEDI", "FISIOPATOLOGIA"}
KR_A = {"MUSCULATURA", "OCCHI", "SOPRACCIGLIA", "MANI", "VOCE",
        "SINTOMI CHIAVE SECONDARIO", "NEUROPEPTIDE IN ECCESSO",
        "DISMETABOLISMO ELEMENTARE", "PERSONALITÀ", "COMPLIANCE NELLA TERAPIA"}
KL_B = {"REAZIONE EMOTIVA ALLE SEDUTE", "ORGANI IPOATTIVI",
        "SISTEMA DI DRENAGGIO IPOATTIVO", "DIATESI ENDOCRINA",
        "COSTITUZIONE ELEMENTARE", "COSTITUZIONE OMEOPATICA"}
KR_B = {"REAZIONE FISICA ALLE SEDUTE", "LIVELLO ENERGETICO SPECIFICO",
        "AREA FISICA DI MAGGIORE DEBOLEZZA", "COSTITUZIONE - GENOTIPO",
        "COSTITUZIONE CLASSICA", "TONO NERVOSO"}

def tabN(lines, bounds):
    cols = [[] for _ in range(len(bounds) + 1)]
    for line in lines:
        for c, t in cells(line):
            i = 0
            while i < len(bounds) and c >= bounds[i]: i += 1
            cols[i].append(t)
    return cols

def bullets(lines, bounds):
    out = []
    for col in tabN(lines, bounds):
        items, cur = [], []
        for t in col:
            if t in ("•", "-"):
                if cur: items.append(" ".join(cur)); cur = []
            elif t.startswith(("• ", "- ")):
                if cur: items.append(" ".join(cur)); cur = []
                cur.append(t[2:].strip())
            else: cur.append(t)
        if cur: items.append(" ".join(cur))
        out.append([sp(i) for i in items if sp(i)])
    return out

# =============================================================== TEORIA
def sez(pagine, titolo, img=None, heading=None):
    lines = []
    for p in pagine: lines += P(p)
    if lines and lines[0].strip() in (heading or titolo, titolo): lines = lines[1:]
    return {"titolo": titolo, "paragrafi": paragrafi(lines), "immagini": img or []}

teoria = [
    {"titolo": "Che cosa sono le costituzioni", "paragrafi": paragrafi(P(2)), "immagini": []},
    sez([3], "Il modello di Ippocrate: approccio umorale", heading="Il modello costituzionale di Ippocrate: approccio umorale"),
    sez([4, 5], "Il modello di Vannier: approccio psico-somatico"),
    sez([6, 7], "Il modello di Pende: approccio endocrinologico"),
    sez([8], "Il modello di Martiny: approccio embriologico"),
    sez([9], "Conclusioni", ["modelli.jpg", "autori.jpg"]),
    sez([10, 11], "Il modello di Sheldon: i Somatotipi", ["somatotipi.jpg", "triangolo.jpg"]),
    sez([13, 14, 15], "I tre foglietti embriologici", ["embrione.jpg"]),
]

# =============================================================== SINOTTICA
sinottica = [
 {"foglietto":"Ecto","livello":"Shao Yin","biotipo":"Melanconico","neurotipo":"Anergico","meridiani":"R – C","id":"shao-yin","bio":"ecto"},
 {"foglietto":"Ecto-Meso","livello":"Tai Yang","biotipo":"Nervoso","neurotipo":"Ipertonico","meridiani":"V – IT","id":"tai-yang","bio":"ecto"},
 {"foglietto":"Meso","livello":"Shao Yang","biotipo":"Bilioso","neurotipo":"Iperergico","meridiani":"VB – TR","id":"shao-yang","bio":"meso"},
 {"foglietto":"Meso-Endo","livello":"Jue Yin","biotipo":"Sanguigno","neurotipo":"Distonico","meridiani":"F – Pc","id":"jue-yin","bio":"meso"},
 {"foglietto":"Endo","livello":"Tai Yin","biotipo":"Flemmatico","neurotipo":"Ipoergico","meridiani":"M – P","id":"tai-yin","bio":"endo"},
 {"foglietto":"Endo-Ecto","livello":"Yang Ming","biotipo":"Linfatico","neurotipo":"Ipotonico","meridiani":"St – IC","id":"yang-ming","bio":"endo"},
]

# =============================================================== BIOTIPI
def biotipo(bid, nome, p_desc, p_car, p_t1, p_t2, p_t3, car_b):
    print(f"\n--- {nome}")
    lines = P(p_desc)
    if lines and lines[0].strip() == nome: lines = lines[1:]
    sintesi, testo, ultima = {}, [], None
    for l in lines:
        s = l.strip()
        m = re.match(r"^(LIVELLI DI MTC|TEMPERAMENTO|MERIDIANI|DIATESI|TENDENZA|ANIMALE)\s*:\s*(.+)$", s)
        if m:
            ultima = m.group(1); sintesi[ultima] = m.group(2).strip()
        elif ultima and s.isupper() and len(s) < 60:
            sintesi[ultima] += " " + s
        else:
            ultima = None; testo.append(s)
    car = [c for c in bullets(P(p_car), car_b)]
    scarta = {"Fisiologiche", "Fisiche", "Psichiche", "Caratteristiche", "Caratteristiche:"}
    car = [[x for x in col if x not in scarta] for col in car]
    car = [c for c in car if c]

    l2 = P(p_t2)
    i = next(i for i, l in enumerate(l2) if l.strip().startswith("ETA’ DI SVILUPPO"))
    j = next(k for k in range(i, len(l2)) if any(ch.islower() for ch in cells(l2[k])[0][1]))
    svil = tabN(l2[j:], [12, 38, 58])
    l3 = P(p_t3)
    i_s = next(i for i, l in enumerate(l3) if "SINDROMI MTC" in l)
    i_y = next(i for i, l in enumerate(l3) if "SISTEMI PREDISPOSTI" in l)
    appr = tabN(l3[:i_s], [28, 56])
    sind = tabN(l3[i_s + 1:i_y], [40])
    sist = " ".join(t for l in l3[i_y + 1:] for _, t in cells(l))
    return {
        "id": bid, "nome": nome, "sintesi": sintesi, "descrizione": paragrafi(testo),
        "caratteristiche": {"fisiologiche": car[0], "fisiche": car[1], "psichiche": car[2]},
        "scheda": tab_kv(P(p_t1), KL_A, KR_A),
        "scheda2": tab_kv(l2[:i], KL_B, KR_B),
        "sviluppo": [{"k": k, "v": sp(" ".join(v))} for k, v in zip(
            ["ETÀ DI SVILUPPO", "TIPO DI SVILUPPO", "TIPO DI SQUILIBRIO", "TIPO DI MENTE"], svil)],
        "apprendimento": {
            "tipo": sp(" ".join(appr[0][1:])),
            "aree": sp(" ".join(appr[1][1:])),
            "capacita": sp(" ".join(appr[2][2:]))},
        "sindromi": {"mtc": sp(" ".join(sind[0])), "esterne": sp(" ".join(sind[1]))},
        "sistemi": sp(sist),
        "immagine": f"sagoma-{bid}.png",
    }

biotipi = [biotipo("ecto", "ECTOMORFO", 17, 18, 19, 20, 21, [30, 58]),
           biotipo("meso", "MESOMORFO", 22, 23, 24, 25, 26, [28, 55]),
           biotipo("endo", "ENDOMORFO", 27, 28, 29, 30, 31, [29, 56])]

# sintomatologia comparata (p32)
for b, col in zip(biotipi, tabN(P(32)[1:], [22, 48])):
    b["sintomi"] = [re.sub(r"^-\s*", "", x) for x in col
                    if x.upper() not in ("ECTOMORFO", "MESOMORFO", "ENDOMOROFO")]

# personalità acquisita (p33)
pp = P(33)
blk, cur = {}, None
for l in pp:
    s = l.strip()
    if s in ("ECTOIDE", "MESOIDE", "ENDOIDE"): cur = s; blk[cur] = []
    elif cur: blk[cur].append(s)
tutti = {x for v in blk.values() for x in v} | set(blk) | {"I tipi di personalità acquisita:"}
personalita_intro = paragrafi([l.strip() for l in pp[1:] if l.strip() not in tutti])

# reazione agli stimoli (p34)
rea, cur = {}, None
for l in P(34)[1:]:
    s = l.strip()
    m = re.match(r"^REAZIONE (ECTOMORFA|MESOMORFA|ENDOMORFA) \((.+)\)$", s)
    if m: cur = m.group(1)[:4].lower(); rea[cur] = {"fase": m.group(2), "righe": []}
    elif cur: rea[cur]["righe"].append(s)

# insofferenze (p35)
ins, cur = {}, None
for l in P(35)[1:]:
    s = l.strip()
    m = re.match(r"^La costituzione (ECTO|MESO|ENDO) diventa insofferente quando (.+)$", s)
    if m: cur = m.group(1).lower(); ins[cur] = {"quando": m.group(2).rstrip("."), "premessa": [], "reazioni": []}
    elif cur:
        if s.isupper() and len(s) < 25: ins[cur]["reazioni"].append(s.capitalize())
        else: ins[cur]["premessa"].append(s)

KEY = {"ecto": "ECTOIDE", "meso": "MESOIDE", "endo": "ENDOIDE"}
for b in biotipi:
    k = b["id"]
    b["personalita"] = {"tipo": KEY[k],
        "conflitti": sp(" ".join(blk[KEY[k]]).replace("Si genera in base a conflitti di", ""))}
    b["reazione"] = {"fase": rea[k]["fase"], "righe": rea[k]["righe"]}
    b["insofferenza"] = {"quando": ins[k]["quando"], "premessa": sp(" ".join(ins[k]["premessa"])),
                         "reazioni": ins[k]["reazioni"]}

# ergopsichica (p50)
ERGCOL = columns(50, [57, 223, 389], y0=140)
def toni(col):
    testo = " ".join(col); out = {}
    for lab, key in [("TONO EMOTIVO ALTO", "alto"), ("TONO EMOTIVO MEDIO", "medio"), ("TONO EMOTIVO BASSO", "basso")]:
        m = re.search(re.escape(lab) + r"(.*?)(?=TONO EMOTIVO|$)", testo, re.S)
        if not m: continue
        seg = sp(m.group(1))
        e = re.match(r"^(ENERGIA(?: METABOLICA)?(?: ATTIVA)?\s*(?:AL )?\d+%)\s*(.*)$", seg)
        out[key] = {"energia": e.group(1) if e else "", "tratti": (e.group(2) if e else seg).strip()}
    return out
for b, col in zip(biotipi, ERGCOL):
    b["ergopsichica"] = toni(col)

# =============================================================== COSTITUZIONI
COST = [("tai-yang", "TAI YANG", [36, 37], "V62", "TAI YANG"),
        ("shao-yang", "SHAO YANG", [38, 39], "VB41", "SHAO YANG"),
        ("tai-yin", "TAI YIN", [40, 41, 42], "M4", "TAI YIN"),
        ("yang-ming", "YANG MING", [43, 44], "TR5", "YANG MING"),
        ("jue-yin", "JUE YIN", [45, 46], "PC6", "JUE YIN"),
        ("shao-yin", "SHAO YIN", [47, 48, 49], "R6", "SHAO YIN")]

# difesa emotiva (p51-53)
difesa = {}
for pg, coppia in [(51, ["shao-yin", "tai-yang"]), (52, ["shao-yang", "jue-yin"]), (53, ["tai-yin", "yang-ming"])]:
    for idx, col in enumerate(columns(pg, [57, 298], y0=120)):
        ls = [l for l in col if not re.fullmatch(r"\d{1,3}", l)]
        tipo = ls[1].strip("()"); motto = ls[2]
        difesa[coppia[idx]] = {"motto": motto, "tipo": tipo, "testo": paragrafi(ls[3:])}

costituzioni = []
for cid, nome, pgs, punto, _ in COST:
    lines = []
    for p in pgs: lines += P(p)
    if lines and lines[0].strip() == nome: lines = lines[1:]
    meta, testo = {}, []
    for l in lines:
        m = re.match(r"^(Codice di riferimento|Animale|Popolazione|Temperamento)\s*:\s*(.+)$", l.strip())
        if m: meta[m.group(1)] = m.group(2).strip()
        else: testo.append(l)
    row = next(r for r in sinottica if r["id"] == cid)
    costituzioni.append({
        "id": cid, "nome": nome,
        "codice": meta.get("Codice di riferimento", ""),
        "animale": meta.get("Animale", ""),
        "popolazione": meta.get("Popolazione", ""),
        "temperamento": meta.get("Temperamento", ""),
        "foglietto": row["foglietto"], "biotipo": row["bio"],
        "neurotipo": row["neurotipo"], "meridiani": row["meridiani"],
        "descrizione": paragrafi(testo),
        "difesa": difesa[cid],
        "puntoTest": {"sigla": punto, "immagine": f"punto-{cid}.jpg"},
        "immagini": {"trigramma": f"trigramma-{cid}.png", "curva": f"curva-{cid}.png",
                     "profiling": f"profiling-{cid}.jpg"},
    })

# =============================================================== PROCEDURE
procedure = [
 {"id": "costituzioni", "titolo": "Procedura per testare le COSTITUZIONI",
  "passi": ["Mentre la persona tocca con una mano il punto VC8 (Ombelico)",
            "Testare i 6 Punti Chiave seguenti"],
  "voci": [{"sigla": next(x["puntoTest"]["sigla"] for x in costituzioni if x["id"] == i),
            "nome": next(x["nome"] for x in costituzioni if x["id"] == i), "id": i,
            "immagine": f"punto-{i}.jpg"}
           for i in ["tai-yin", "tai-yang", "jue-yin", "shao-yang", "shao-yin", "yang-ming"]],
  "immagini": []},
 {"id": "temperamenti", "titolo": "Procedura per testare i TEMPERAMENTI",
  "passi": ["Mentre la persona tocca con una mano il punto VC8 (Ombelico)",
            "Testare i 6 Polsi"],
  "polsi": {"destra": ["Nervoso", "Flemmatico", "Linfatico"],
            "sinistra": ["Melanconico", "Bilioso", "Sanguigno"]},
  "immagini": ["polsi.jpg"]},
]

DATA = {"titolo": "Costituzioni & Temperamenti",
        "fonte": "Costituzioni-Finale-2014-.pdf",
        "teoria": teoria, "sinottica": sinottica, "biotipi": biotipi,
        "costituzioni": costituzioni, "procedure": procedure,
        "personalitaIntro": personalita_intro,
        "ergoIntro": "Ergopsichica significa l’influsso dello stato energetico sul comportamento e sulle manifestazioni psicologiche dell’individuo.",
        "figure": {"animali": "animali.jpg", "triangolo": "triangolo.jpg",
                   "modelli": "modelli.jpg", "somatotipi": "somatotipi.jpg"}}

OUT = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "costituzioni.json")
json.dump(DATA, open(OUT, "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
print("scritto", OUT)
