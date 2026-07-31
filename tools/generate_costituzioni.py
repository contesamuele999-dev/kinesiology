#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""tools/costituzioni.json  ->  assets/js/costituzioni_data.js

Aggiunge, per ogni scheda, un campo `_search` con tutto il testo in minuscolo
(usato dalla ricerca della sezione Costituzioni). NON editare a mano il file
generato: rigenerare con `python tools/generate_costituzioni.py`.
"""
import json, os, re, unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "tools", "costituzioni.json")
DST = os.path.join(ROOT, "assets", "js", "costituzioni_data.js")
IMGDIR = os.path.join(ROOT, "assets", "costituzioni")
BASE = "assets/costituzioni/"

def norm(s):
    s = unicodedata.normalize("NFD", s.lower())
    return "".join(c for c in s if unicodedata.category(c) != "Mn")

def testo(node, out):
    if isinstance(node, str):
        if not node.endswith((".png", ".jpg")): out.append(node)
    elif isinstance(node, list):
        for x in node: testo(x, out)
    elif isinstance(node, dict):
        for k, v in node.items():
            if k.startswith("_"): continue
            testo(k, out); testo(v, out)

def search(node):
    out = []
    testo(node, out)
    return norm(re.sub(r"\s+", " ", " ".join(out)))[:6000]

def paths(node):
    """prefissa i nomi file immagine col percorso della cartella"""
    if isinstance(node, str):
        return BASE + node if re.fullmatch(r"[-a-z0-9]+\.(png|jpg)", node) else node
    if isinstance(node, list): return [paths(x) for x in node]
    if isinstance(node, dict): return {k: paths(v) for k, v in node.items()}
    return node

data = json.load(open(SRC, encoding="utf-8"))
data = paths(data)

mancanti = []
def check(node):
    if isinstance(node, str):
        if node.startswith(BASE) and not os.path.exists(os.path.join(ROOT, node)):
            mancanti.append(node)
    elif isinstance(node, list):
        for x in node: check(x)
    elif isinstance(node, dict):
        for v in node.values(): check(v)
check(data)
if mancanti:
    raise SystemExit("Immagini mancanti:\n  " + "\n  ".join(sorted(set(mancanti))))

for b in data["biotipi"]:       b["_search"] = search(b)
for c in data["costituzioni"]:  c["_search"] = search(c)
for t in data["teoria"]:        t["_search"] = search(t)
for p in data["procedure"]:     p["_search"] = search(p)

# id stabili per la teoria (usati nell'hash di navigazione)
for i, t in enumerate(data["teoria"], 1):
    t["id"] = "t%d" % i

js = ("/* GENERATO da tools/generate_costituzioni.py — NON editare a mano.\n"
      "   Fonte: tools/costituzioni.json (manuale «Costituzioni & Temperamenti», 2014) */\n"
      "window.COSTITUZIONI = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")
open(DST, "w", encoding="utf-8", newline="\n").write(js)
n = lambda k: len(data[k])
print("scritto %s (%d KB) — %d biotipi, %d costituzioni, %d capitoli, %d procedure"
      % (os.path.relpath(DST, ROOT), os.path.getsize(DST) // 1024,
         n("biotipi"), n("costituzioni"), n("teoria"), n("procedure")))
