#!/usr/bin/env python3
"""
slice_pages.py — Esporta le pagine di un manuale (PDF) in immagini JPEG,
raggruppate per coordinata, pronte per l'app.

USO:
    python tools/slice_pages.py <manuale.pdf> tools/page_map.json

page_map.json ha la forma:
    { "vc-sovraspinato": [5,6,7,8,9,10,11,12,13,14], ... }
dove i numeri sono le PAGINE DEL PDF (non quelle stampate).

Requisiti: pdftoppm (poppler). Su Windows installa "poppler" e mettilo nel PATH,
oppure usa la versione già pronta delle immagini fornita nel repo.

Output: assets/pages/<coordinata>/p01.jpg, p02.jpg, ...
"""
import json, os, subprocess, sys, glob

def main():
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(1)
    pdf, mapfile = sys.argv[1], sys.argv[2]
    dpi = int(os.environ.get("DPI", "140"))
    quality = os.environ.get("QUALITY", "78")
    page_map = json.load(open(mapfile, encoding="utf-8"))
    root = os.path.join("assets", "pages")
    for coord, pages in page_map.items():
        outdir = os.path.join(root, coord)
        os.makedirs(outdir, exist_ok=True)
        for i, pg in enumerate(pages, 1):
            stem = os.path.join(outdir, f"__tmp{i:03d}")
            subprocess.run(["pdftoppm", "-f", str(pg), "-l", str(pg), "-r", str(dpi),
                            "-jpeg", "-jpegopt", f"quality={quality}", pdf, stem],
                           check=True)
            produced = glob.glob(stem + "*.jpg")
            if produced:
                os.replace(produced[0], os.path.join(outdir, f"p{i:02d}.jpg"))
        print(f"{coord}: {len(pages)} pagine -> {outdir}")

if __name__ == "__main__":
    main()
