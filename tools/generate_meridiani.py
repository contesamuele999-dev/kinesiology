# -*- coding: utf-8 -*-
"""
generate_meridiani.py — genera i dati dei 14 meridiani MTC per la mappa 3D.

Contiene TUTTI i 361 punti classici (LU 11, LI 20, ST 45, SP 21, HT 9, SI 19,
BL 67, KI 27, PC 9, TE 23, GB 44, LR 14, CV 24, GV 28).

Ogni meridiano è una sequenza ordinata di:
  A(n, pinyin, pos)  punto ANCORATO a un riferimento anatomico del manichino
  P(n, pinyin)       punto INTERPOLATO fra i due ancoraggi che lo circondano
  W(pos)             waypoint del tracciato (nessun punto, serve solo a curvare)
I punti interpolati vengono distribuiti uniformemente lungo il segmento.

Output:
  - tools/meridiani.json         (sorgente leggibile/modificabile)
  - assets/js/meridiani_data.js  (window.MERIDIANI, caricato da index.html)

Convenzione manichino (identica a punti.js / punti_indicatori.json):
  x < 0 = lato DESTRO del soggetto, x > 0 = lato SINISTRO
  y: -1.3 piedi … 0.80 pube … 1.28 ombelico … 2.6 testa … 2.93 vertice
  z > 0 fronte, z < 0 retro
I meridiani bilaterali sono definiti UNA volta sul lato sinistro (x>0) e
specchiati a runtime dall'app (campo "bilaterale": true).
"""
import json, math, os, sys

# ---------- geometria del torso (deve restare allineata a punti.js) ----------
TORSO_PROFILE = [
    (0.60,0.02),(0.64,0.20),(0.72,0.33),(0.82,0.40),(0.92,0.405),(1.02,0.36),
    (1.14,0.315),(1.20,0.315),(1.30,0.35),(1.44,0.385),(1.56,0.40),(1.68,0.435),
    (1.82,0.475),(1.96,0.505),(2.06,0.495),(2.14,0.44),(2.22,0.32),(2.28,0.17)
]
TORSO_ZSCALE = 0.64

def torso_r(y):
    p = TORSO_PROFILE
    if y <= p[0][0]: return p[0][1]
    if y >= p[-1][0]: return p[-1][1]
    for i in range(len(p)-1):
        y0,r0 = p[i]; y1,r1 = p[i+1]
        if y0 <= y <= y1:
            t = (y-y0)/(y1-y0)
            return r0 + (r1-r0)*t
    return 0.4

def surface_z(x, y, front=True):
    rx = torso_r(y); rz = rx*TORSO_ZSCALE
    frac = min(1.0, abs(x)/rx) if rx > 0 else 0.0
    z = rz*math.sqrt(max(0.35, 1-frac*frac))
    return z+0.03 if front else -(z+0.03)

def F(x, y, off=0.012):
    """punto sulla superficie ANTERIORE del tronco"""
    return (x, y, round(surface_z(x, y, True)+off, 3))
def B(x, y, off=0.012):
    """punto sulla superficie POSTERIORE del tronco"""
    return (x, y, round(surface_z(x, y, False)-off, 3))

# ---------- geometria del capo (ellissoide del cranio di punti.js) ----------
# add(SphereGeometry(0.27), 0, 2.62, 0.01, scale 1 x 1.15 x 1.02)
# testa umana media: larghezza ~15 cm, profondità ~19 cm, altezza ~21 cm
# (1 unità = 40 cm) → semiassi 0.185 x 0.290 x 0.235, centro a y 2.64
HC = (0.0, 2.64, 0.0)
HR = (0.185, 0.290, 0.235)

# riferimenti del viso (quote y e semi-distanze x)
FACE = {
    "vertice": 2.930, "attaccatura": 2.800, "glabella": 2.700, "occhi": 2.658,
    "naso": 2.545, "sottonaso": 2.505, "bocca": 2.462, "mento": 2.400,
    "ipd": 0.078,        # semi-distanza fra le pupille (IPD ~6,3 cm)
    "cantoInt": 0.030, "cantoEst": 0.122, "zigomo": 0.150,
    "orecchioX": 0.176, "orecchioY": 2.620, "orecchioZ": -0.030,
}

def FZ(x, y, off=0.022):
    """punto sulla superficie ANTERIORE della testa alla quota (x,y)"""
    t = 1.0 - (x/HR[0])**2 - ((y-HC[1])/HR[1])**2
    z = HR[2]*math.sqrt(max(0.05, t))
    return (round(x,3), round(y,3), round(HC[2] + z + off, 3))

def LZ(x, y, off=0.020):
    """punto sulla superficie POSTERIORE della testa alla quota (x,y)"""
    t = 1.0 - (x/HR[0])**2 - ((y-HC[1])/HR[1])**2
    z = HR[2]*math.sqrt(max(0.05, t))
    return (round(x,3), round(y,3), round(HC[2] - z - off, 3))

def H(dx, dy, dz, off=0.028):
    """proietta la direzione (dx,dy,dz) dal centro del cranio sulla superficie
       della testa, con un piccolo scostamento verso l'esterno (off) così il
       tracciato resta VISIBILE e non sprofonda dentro il modello."""
    q = math.sqrt((dx/HR[0])**2 + (dy/HR[1])**2 + (dz/HR[2])**2)
    if q == 0: return HC
    t = 1.0/q
    L = math.sqrt(dx*dx + dy*dy + dz*dz) or 1.0
    return (round(HC[0]+t*dx + off*dx/L, 3),
            round(HC[1]+t*dy + off*dy/L, 3),
            round(HC[2]+t*dz + off*dz/L, 3))


# ============================================================================
#  ANATOMIA DEL MANICHINO — sorgente unica condivisa con assets/js/manichino.js
#  (viene esportata in assets/js/corpo_data.js: se cambi qui, il modello 3D e i
#   punti restano automaticamente allineati)
# ============================================================================
#  Scala: 1 unità = 40 cm  (statura 170 cm = 4.24 unità, pianta piede y=-1.31)
#  x>0 = lato SINISTRO del soggetto · z>0 = fronte
#  POSIZIONE ANATOMICA: braccia lungo i fianchi con i PALMI IN AVANTI
#  (pollice laterale) — è la convenzione delle tavole di agopuntura.

# --- asse del braccio: (y, centro x, centro z, raggio) dall'alto in basso ---
ARM_AXIS = [
    (2.00, 0.495, 0.000, 0.140),   # deltoide
    (1.90, 0.515, 0.000, 0.130),
    (1.75, 0.525, 0.005, 0.116),   # bicipite
    (1.60, 0.527, 0.008, 0.105),
    (1.45, 0.525, 0.012, 0.094),
    (1.32, 0.525, 0.015, 0.086),   # gomito
    (1.22, 0.530, 0.020, 0.090),   # avambraccio prossimale
    (1.05, 0.535, 0.028, 0.080),
    (0.90, 0.540, 0.035, 0.066),
    (0.80, 0.543, 0.038, 0.058),
    (0.74, 0.545, 0.040, 0.052),   # polso
]
# --- asse della gamba ---
LEG_AXIS = [
    (0.90, 0.185, 0.000, 0.200),   # anca / gluteo
    (0.60, 0.195, 0.005, 0.185),
    (0.30, 0.200, 0.010, 0.170),   # coscia
    (0.05, 0.205, 0.012, 0.150),
    (-0.135,0.212, 0.015, 0.118),  # ginocchio
    (-0.30, 0.215, 0.005, 0.118),
    (-0.50, 0.218, 0.000, 0.115),  # polpaccio
    (-0.80, 0.216, 0.005, 0.088),
    (-1.00, 0.215, 0.008, 0.070),
    (-1.14, 0.215, 0.010, 0.058),  # caviglia
]
# --- mano (palmo in avanti): x delle dita, y di nocche e polpastrelli ---
HAND = {
    "polso_y": 0.74, "mcp_y": 0.49, "palmo_z": 0.040, "palmo_sp": 0.035,
    "centro_x": 0.545, "semilarghezza": 0.100,
    "dita": [   # nome, x nocca, x punta, y punta, raggio
        ("indice",  0.610, 0.600, 0.245, 0.026),
        ("medio",   0.565, 0.560, 0.222, 0.027),
        ("anulare", 0.520, 0.522, 0.250, 0.025),
        ("mignolo", 0.478, 0.487, 0.305, 0.022),
    ],
    "pollice": {"cmc": (0.600, 0.680, 0.055), "mcp": (0.648, 0.600, 0.060),
                "punta": (0.672, 0.515, 0.050), "raggio": 0.032},
}
# --- piede: profilo lungo z (tallone -0.12 → punta 0.46) ---
FOOT = {
    "cx": 0.215, "suola": -1.30, "tallone_z": -0.12, "punta_z": 0.46,
    "dorso": [(-0.12,-1.20),(0.0,-1.16),(0.20,-1.21),(0.33,-1.25),(0.46,-1.275)],
    "larghezza": [(-0.12,0.055),(0.0,0.062),(0.20,0.085),(0.33,0.088),(0.46,0.070)],
    "dita": [  # nome, x, z punta, raggio
        ("alluce", 0.150, 0.462, 0.030), ("2", 0.194, 0.458, 0.022),
        ("3", 0.228, 0.442, 0.021), ("4", 0.256, 0.418, 0.019),
        ("5", 0.282, 0.382, 0.018),
    ],
}

def _interp(axis, y):
    """(cx, cz, r) sull'asse dell'arto alla quota y"""
    if y >= axis[0][0]: a = axis[0]; return (a[1], a[2], a[3])
    if y <= axis[-1][0]: a = axis[-1]; return (a[1], a[2], a[3])
    for i in range(len(axis)-1):
        y0,x0,z0,r0 = axis[i]; y1,x1,z1,r1 = axis[i+1]
        if y1 <= y <= y0:
            t = (y0-y)/(y0-y1)
            return (x0+(x1-x0)*t, z0+(z1-z0)*t, r0+(r1-r0)*t)
    return (axis[-1][1], axis[-1][2], axis[-1][3])

def _surf(cx, cz, r, lat, ant, k=1.04):
    """punto sulla superficie del cilindro dell'arto.
       lat: -1 = mediale (ulnare/interno) … +1 = laterale (radiale/esterno)
       ant: -1 = posteriore … +1 = anteriore"""
    n = math.hypot(lat, ant)
    if n > 1: lat, ant = lat/n, ant/n
    return (round(cx + r*k*lat, 3), round(cz + r*k*ant, 3))

def ARM(y, lat, ant):
    cx, cz, r = _interp(ARM_AXIS, y)
    x, z = _surf(cx, cz, r, lat, ant)
    return (x, round(y,3), z)

def LEG(y, lat, ant):
    cx, cz, r = _interp(LEG_AXIS, y)
    x, z = _surf(cx, cz, r, lat, ant)
    return (x, round(y,3), z)

def _lerp_tab(tab, z):
    if z <= tab[0][0]: return tab[0][1]
    if z >= tab[-1][0]: return tab[-1][1]
    for i in range(len(tab)-1):
        z0,v0 = tab[i]; z1,v1 = tab[i+1]
        if z0 <= z <= z1:
            t = (z-z0)/(z1-z0); return v0+(v1-v0)*t
    return tab[-1][1]

def FT(z, lat, sotto=0.0):
    """punto sul piede: z lungo il piede, lat -1 (mediale) … +1 (laterale),
       sotto = 0 dorso, 1 pianta"""
    w = _lerp_tab(FOOT["larghezza"], z)
    ytop = _lerp_tab(FOOT["dorso"], z)
    y = ytop + (FOOT["suola"] - ytop) * sotto
    return (round(FOOT["cx"] + w*1.03*lat, 3), round(y, 3), round(z, 3))

# ------------------------------- DSL ---------------------------------------
def A(n, pinyin, pos): return {"k":"A", "n":n, "nome":pinyin, "pos":pos}
def P(n, pinyin):      return {"k":"P", "n":n, "nome":pinyin}
def W(pos):            return {"k":"W", "pos":pos}

def compila(sigla, seq):
    """espande la sequenza in una lista di nodi {x,y,z,[sigla,nome,ruolo,note]}"""
    # 1) indici dei punti fissi (A o W)
    fissi = [i for i,e in enumerate(seq) if e["k"] in ("A","W")]
    if not fissi: return []
    assert seq[0]["k"] in ("A","W"), sigla + ": la sequenza deve iniziare con un ancoraggio"
    assert seq[-1]["k"] in ("A","W"), sigla + ": la sequenza deve finire con un ancoraggio"
    pos = [None]*len(seq)
    for i in fissi: pos[i] = seq[i]["pos"]
    # 2) interpolazione lineare dei punti liberi fra due fissi
    for a, b in zip(fissi, fissi[1:]):
        k = b - a - 1
        if k <= 0: continue
        pa, pb = pos[a], pos[b]
        for j in range(1, k+1):
            t = j/(k+1.0)
            pos[a+j] = (pa[0]+(pb[0]-pa[0])*t, pa[1]+(pb[1]-pa[1])*t, pa[2]+(pb[2]-pa[2])*t)
    # 3) i punti che cadono sul tronco vengono riproiettati sulla superficie
    #    (l'interpolazione lineare fra due ancoraggi taglia la curva dell'addome)
    for i, p in enumerate(pos):
        x, y, z = p
        if not (0.60 <= y <= 2.30): continue
        if abs(x) >= torso_r(y)*0.98: continue
        za = surface_z(x, y, z > 0) + (0.012 if z > 0 else -0.012)
        if abs(z - za) < 0.07:
            pos[i] = (x, y, za)
    # 4) nodi finali
    out = []
    for e, p in zip(seq, pos):
        nodo = {"x": round(p[0],3), "y": round(p[1],3), "z": round(p[2],3)}
        if e["k"] != "W":
            sg = sigla + str(e["n"])
            nodo["sigla"] = sg
            nodo["nome"] = e["nome"]
            info = CHIAVE.get(sg)
            if info:
                nodo["ruolo"] = info[0]
                nodo["note"] = info[1]
                nodo["chiave"] = True
        out.append(nodo)
    return out

# ---------------- punti chiave: ruolo + localizzazione in italiano ----------
CHIAVE = {
  # Polmone
  "P1":  ("Mu del Polmone", "1° spazio intercostale, sotto la clavicola, lato esterno del torace"),
  "P5":  ("He-mare · dispersione", "piega del gomito, lato radiale (esterno) del tendine del bicipite"),
  "P6":  ("Xi dei fori", "5 cun sopra la piega del polso, sul bordo radiale dell'avambraccio"),
  "P7":  ("Luo di passaggio · punto chiave di Ren Mai", "1,5 cun sopra la piega del polso, sul bordo radiale"),
  "P9":  ("Yuan sorgente · tonificazione", "piega del polso, lato radiale, sull'arteria"),
  "P11": ("Jing-pozzo", "angolo ungueale del pollice, lato radiale"),
  # Grosso Intestino
  "GI1":  ("Jing-pozzo", "angolo ungueale dell'indice, lato radiale"),
  "GI4":  ("Yuan sorgente", "dorso della mano, tra 1° e 2° metacarpo"),
  "GI6":  ("Luo di passaggio", "3 cun sopra GI5, sulla faccia radiale dell'avambraccio"),
  "GI7":  ("Xi dei fori", "5 cun sopra GI5, sul bordo radiale dell'avambraccio"),
  "GI11": ("He-mare · tonificazione", "estremità esterna della piega del gomito, a gomito flesso"),
  "GI15": ("riunione della spalla", "depressione antero-esterna dell'acromion, a braccio abdotto"),
  "GI20": ("fine del meridiano", "nella piega naso-labiale, a lato dell'ala del naso"),
  # Stomaco
  "S1":  ("inizio del meridiano", "sotto la pupilla, sul bordo dell'orbita"),
  "S6":  ("", "angolo della mandibola, sul ventre del massetere"),
  "S9":  ("finestra del cielo", "a lato del pomo d'Adamo, sull'arteria carotide"),
  "S25": ("Mu del Grosso Intestino", "2 cun a lato dell'ombelico"),
  "S34": ("Xi dei fori", "2 cun sopra il bordo superiore-esterno della rotula"),
  "S36": ("He-mare · tonificazione generale", "3 cun sotto il ginocchio, un dito a lato della cresta tibiale"),
  "S40": ("Luo di passaggio", "8 cun sopra il malleolo esterno, a lato della tibia"),
  "S41": ("tonificazione", "centro della piega anteriore della caviglia, tra i tendini"),
  "S42": ("Yuan sorgente", "punto più alto del dorso del piede, sull'arteria pedidia"),
  "S45": ("Jing-pozzo · dispersione", "angolo ungueale del 2° dito del piede, lato esterno"),
  # Milza
  "MP1":  ("Jing-pozzo", "angolo ungueale dell'alluce, lato interno"),
  "MP2":  ("tonificazione", "davanti e sotto l'articolazione metatarso-falangea dell'alluce"),
  "MP3":  ("Yuan sorgente", "bordo interno del piede, dietro la testa del 1° metatarso"),
  "MP4":  ("Luo · punto chiave di Chong Mai", "bordo interno del piede, davanti alla base del 1° metatarso"),
  "MP5":  ("dispersione", "davanti e sotto il malleolo interno"),
  "MP6":  ("incrocio dei 3 Yin del piede", "3 cun sopra il malleolo interno, sul bordo posteriore della tibia"),
  "MP8":  ("Xi dei fori", "3 cun sotto MP9, sul bordo interno della tibia"),
  "MP9":  ("He-mare", "depressione sotto il condilo interno della tibia"),
  "MP10": ("mare del sangue", "2 cun sopra l'angolo supero-interno della rotula"),
  "MP21": ("grande Luo della Milza", "linea medio-ascellare, 6° spazio intercostale"),
  # Cuore
  "C1": ("inizio del meridiano", "centro del cavo ascellare, sull'arteria"),
  "C3": ("He-mare", "estremità interna della piega del gomito, a gomito flesso"),
  "C5": ("Luo di passaggio", "1 cun sopra la piega del polso, lato ulnare"),
  "C6": ("Xi dei fori", "0,5 cun sopra la piega del polso, lato ulnare"),
  "C7": ("Yuan sorgente · dispersione", "piega del polso, lato ulnare, nella depressione del pisiforme"),
  "C9": ("Jing-pozzo · tonificazione", "angolo ungueale del mignolo, lato radiale"),
  # Intestino Tenue
  "IT1":  ("Jing-pozzo", "angolo ungueale del mignolo, lato ulnare (esterno)"),
  "IT3":  ("tonificazione · punto chiave del Vaso Governatore", "bordo ulnare della mano, a pugno chiuso, alla fine della piega"),
  "IT4":  ("Yuan sorgente", "bordo ulnare della mano, tra 5° metacarpo e ossa carpali"),
  "IT6":  ("Xi dei fori", "sopra la testa dell'ulna, a palmo verso il petto"),
  "IT7":  ("Luo di passaggio", "5 cun sopra il polso, sul bordo ulnare dell'avambraccio"),
  "IT8":  ("He-mare · dispersione", "tra olecrano ed epicondilo interno (nervo ulnare)"),
  "IT11": ("", "centro della fossa sottospinata della scapola"),
  "IT19": ("fine del meridiano", "davanti al trago dell'orecchio, a bocca aperta"),
  # Vescica
  "V1":  ("inizio del meridiano", "angolo interno dell'occhio, 0,1 cun sopra il canto"),
  "V10": ("finestra del cielo", "alla nuca, sul bordo esterno del trapezio, sotto l'occipite"),
  "V13": ("Shu del dorso · Polmone", "1,5 cun a lato di D3"),
  "V14": ("Shu del dorso · Maestro del Cuore", "1,5 cun a lato di D4"),
  "V15": ("Shu del dorso · Cuore", "1,5 cun a lato di D5"),
  "V17": ("riunione del sangue", "1,5 cun a lato di D7, a livello della punta delle scapole"),
  "V18": ("Shu del dorso · Fegato", "1,5 cun a lato di D9"),
  "V19": ("Shu del dorso · Vescica Biliare", "1,5 cun a lato di D10"),
  "V20": ("Shu del dorso · Milza", "1,5 cun a lato di D11"),
  "V21": ("Shu del dorso · Stomaco", "1,5 cun a lato di D12"),
  "V22": ("Shu del dorso · Triplice Riscaldatore", "1,5 cun a lato di L1"),
  "V23": ("Shu del dorso · Rene", "1,5 cun a lato di L2, all'altezza dell'ultima costa"),
  "V25": ("Shu del dorso · Grosso Intestino", "1,5 cun a lato di L4"),
  "V27": ("Shu del dorso · Intestino Tenue", "1,5 cun a lato di S1"),
  "V28": ("Shu del dorso · Vescica", "1,5 cun a lato di S2"),
  "V40": ("He-mare · punto maestro della schiena", "centro della piega poplitea"),
  "V43": ("", "3 cun a lato di D4 — punto di tonificazione profonda (Gaohuang)"),
  "V57": ("", "sotto il ventre dei gemelli, a metà del polpaccio"),
  "V58": ("Luo di passaggio", "7 cun sopra V60, sul bordo posteriore del perone"),
  "V60": ("", "depressione tra malleolo esterno e tendine d'Achille"),
  "V62": ("punto chiave di Yang Qiao Mai", "1 cun sotto il malleolo esterno"),
  "V64": ("Yuan sorgente", "bordo esterno del piede, sotto la tuberosità del 5° metatarso"),
  "V67": ("Jing-pozzo · tonificazione", "angolo ungueale del 5° dito del piede, lato esterno"),
  # Rene
  "R1":  ("Jing-pozzo", "pianta del piede, depressione al 1/3 anteriore, a piede flesso"),
  "R3":  ("Yuan sorgente", "tra malleolo interno e tendine d'Achille"),
  "R4":  ("Luo di passaggio", "dietro e sotto R3, davanti all'inserzione del tendine d'Achille"),
  "R5":  ("Xi dei fori", "1 cun sotto R3, nella depressione del calcagno"),
  "R6":  ("punto chiave di Yin Qiao Mai", "1 cun sotto il malleolo interno"),
  "R7":  ("tonificazione", "2 cun sopra R3, sul bordo anteriore del tendine d'Achille"),
  "R10": ("He-mare", "estremità interna della piega poplitea, tra i tendini"),
  "R27": ("fine del meridiano", "sotto la clavicola, 2 cun dalla linea mediana"),
  # Maestro del Cuore
  "MC1": ("inizio del meridiano", "1 cun a lato del capezzolo, 4° spazio intercostale"),
  "MC3": ("He-mare", "piega del gomito, lato interno del tendine del bicipite"),
  "MC4": ("Xi dei fori", "5 cun sopra la piega del polso, tra i due tendini"),
  "MC6": ("Luo · punto chiave di Yin Wei Mai", "2 cun sopra la piega del polso, tra i due tendini"),
  "MC7": ("Yuan sorgente · dispersione", "centro della piega del polso, tra i due tendini"),
  "MC8": ("", "centro del palmo, dove poggia la punta del dito medio a pugno chiuso"),
  "MC9": ("Jing-pozzo · tonificazione", "punta del dito medio"),
  # Triplice Riscaldatore
  "TR1":  ("Jing-pozzo", "angolo ungueale dell'anulare, lato ulnare"),
  "TR3":  ("tonificazione", "dorso della mano, tra 4° e 5° metacarpo"),
  "TR4":  ("Yuan sorgente", "centro della piega dorsale del polso"),
  "TR5":  ("Luo · punto chiave di Yang Wei Mai", "2 cun sopra TR4, tra radio e ulna, faccia dorsale"),
  "TR7":  ("Xi dei fori", "3 cun sopra TR4, sul bordo ulnare del radio"),
  "TR10": ("He-mare · dispersione", "1 cun sopra l'olecrano, a gomito flesso"),
  "TR14": ("", "depressione postero-esterna dell'acromion, a braccio abdotto"),
  "TR17": ("", "depressione dietro il lobo dell'orecchio"),
  "TR23": ("fine del meridiano", "estremità esterna del sopracciglio"),
  # Vescica Biliare
  "VB1":  ("inizio del meridiano", "0,5 cun all'esterno dell'angolo esterno dell'occhio"),
  "VB14": ("", "1 cun sopra il centro del sopracciglio"),
  "VB20": ("", "sotto l'occipite, tra i due grandi muscoli della nuca"),
  "VB21": ("", "punto più alto della spalla, a metà tra C7 e l'acromion"),
  "VB24": ("Mu della Vescica Biliare", "7° spazio intercostale, sotto il capezzolo"),
  "VB25": ("Mu del Rene", "estremità libera della 12ª costa, sul fianco"),
  "VB26": ("punto di Dai Mai (cintura)", "sul fianco, all'altezza dell'ombelico, sotto la 11ª costa"),
  "VB30": ("", "depressione del grande trocantere, sul gluteo"),
  "VB34": ("He-mare · punto maestro dei tendini", "depressione davanti e sotto la testa del perone"),
  "VB36": ("Xi dei fori", "7 cun sopra il malleolo esterno, sul bordo anteriore del perone"),
  "VB37": ("Luo di passaggio", "5 cun sopra il malleolo esterno"),
  "VB39": ("punto maestro del midollo", "3 cun sopra il malleolo esterno, sul bordo del perone"),
  "VB40": ("Yuan sorgente", "davanti e sotto il malleolo esterno"),
  "VB41": ("punto chiave di Dai Mai", "dorso del piede, tra 4° e 5° metatarso"),
  "VB43": ("tonificazione", "tra 4° e 5° dito del piede, sulla piega interdigitale"),
  "VB44": ("Jing-pozzo", "angolo ungueale del 4° dito del piede, lato esterno"),
  # Fegato
  "F1":  ("Jing-pozzo", "angolo ungueale dell'alluce, lato esterno"),
  "F2":  ("dispersione", "tra 1° e 2° dito, sulla piega interdigitale"),
  "F3":  ("Yuan sorgente", "dorso del piede, nella depressione tra 1° e 2° metatarso"),
  "F5":  ("Luo di passaggio", "5 cun sopra il malleolo interno, sulla faccia mediale della tibia"),
  "F6":  ("Xi dei fori", "7 cun sopra il malleolo interno"),
  "F8":  ("He-mare · tonificazione", "estremità interna della piega del ginocchio flesso"),
  "F13": ("Mu della Milza · riunione degli organi", "estremità libera della 11ª costa, sul fianco"),
  "F14": ("Mu del Fegato", "6° spazio intercostale, sulla linea del capezzolo"),
  # Vaso Concezione
  "VC1":  ("inizio del meridiano", "centro del perineo"),
  "VC3":  ("Mu della Vescica", "4 cun sotto l'ombelico, 1 cun sopra il pube"),
  "VC4":  ("Mu dell'Intestino Tenue", "3 cun sotto l'ombelico"),
  "VC5":  ("Mu del Triplice Riscaldatore", "2 cun sotto l'ombelico"),
  "VC6":  ("mare del Qi", "1,5 cun sotto l'ombelico"),
  "VC8":  ("", "centro dell'ombelico (non si punge)"),
  "VC12": ("Mu dello Stomaco · riunione dei visceri", "a metà tra ombelico e apice dello sterno"),
  "VC14": ("Mu del Cuore", "6 cun sopra l'ombelico, sotto l'apice dello sterno"),
  "VC15": ("Luo di passaggio", "sotto l'apice dell'apofisi xifoide"),
  "VC17": ("Mu del Maestro del Cuore · mare del Qi", "centro dello sterno, a livello del 4° spazio intercostale"),
  "VC22": ("finestra del cielo", "centro dell'incisura giugulare (fossetta del collo)"),
  "VC24": ("fine del meridiano", "nella fossetta sotto il labbro inferiore"),
  # Vaso Governatore
  "VG1":  ("Luo di passaggio · inizio del meridiano", "tra la punta del coccige e l'ano"),
  "VG3":  ("", "sotto l'apofisi di L4, a livello delle creste iliache"),
  "VG4":  ("porta della vita (Mingmen)", "sotto l'apofisi di L2, di fronte all'ombelico"),
  "VG9":  ("", "sotto l'apofisi di D7, a livello della punta delle scapole"),
  "VG14": ("riunione dei meridiani Yang", "sotto l'apofisi di C7, la vertebra più sporgente del collo"),
  "VG16": ("finestra del cielo", "1 cun sopra l'attaccatura dei capelli, sotto l'occipite"),
  "VG20": ("riunione dei 100 incontri", "sulla sommità del capo, a metà tra gli apici delle orecchie"),
  "VG26": ("punto di rianimazione", "al terzo superiore del solco naso-labiale (filtro)"),
  "VG28": ("fine del meridiano", "frenulo del labbro superiore"),
}

M = []
def mer(**kw):
    kw["nodi"] = compila(kw["sigla"], kw.pop("seq"))
    if "ramo_seq" in kw:
        kw["ramo"] = compila(kw["sigla"], kw.pop("ramo_seq"))
    M.append(kw)

# =========================== 1. POLMONE (P / LU) ===========================
mer(id="polmone", nome="Polmone", sigla="P", siglaInt="LU", elemento="Metallo",
    natura="Yin", coppia="Grosso Intestino", orario="03:00 – 05:00",
    colore="#9fb3bf", bilaterale=True, coordinate=["polmone-deltoide-medio"],
    descrizione="Parte dal torace (P1 Zhongfu), sale a P2 sotto la clavicola, poi scende sulla faccia anteriore-radiale del braccio e dell'avambraccio e termina all'angolo ungueale del pollice. 11 punti.",
    seq=[
      A(1,"Zhongfu", F(0.36,1.98)),
      A(2,"Yunmen",  F(0.40,2.08)),
      W((0.47,1.96,0.16)),
      A(3,"Tianfu",  ARM(1.72, 0.55, 0.80)),
      A(4,"Xiabai",  ARM(1.58, 0.55, 0.80)),
      A(5,"Chize",   ARM(1.33, 0.60, 0.78)),
      A(6,"Kongzui", ARM(1.14, 0.70, 0.70)),
      A(7,"Lieque",  ARM(0.87, 0.85, 0.50)),
      A(8,"Jingqu",  ARM(0.80, 0.85, 0.50)),
      A(9,"Taiyuan", ARM(0.755,0.80, 0.55)),
      A(10,"Yuji",   (0.648,0.620,0.058)),
      A(11,"Shaoshang",(0.688,0.512,0.048)),
    ])

# ====================== 2. GROSSO INTESTINO (GI / LI) ======================
mer(id="intestino-crasso", nome="Grosso Intestino", sigla="GI", siglaInt="LI",
    elemento="Metallo", natura="Yang", coppia="Polmone", orario="05:00 – 07:00",
    colore="#c8d3d9", bilaterale=True, coordinate=["intestino-crasso-tensore-fascia-lata"],
    descrizione="Dall'indice risale il dorso della mano e la faccia dorso-radiale dell'avambraccio e del braccio fino alla spalla, poi il collo e il viso, terminando a lato dell'ala del naso. 20 punti.",
    seq=[
      A(1,"Shangyang",(0.626,0.255,0.030)),
      A(2,"Erjian",   (0.628,0.345,0.018)),
      A(3,"Sanjian",  (0.628,0.462,0.008)),
      A(4,"Hegu",     (0.622,0.575,0.004)),
      A(5,"Yangxi",   ARM(0.755,0.80,-0.50)),
      P(6,"Pianli"), P(7,"Wenliu"), P(8,"Xialian"), P(9,"Shanglian"),
      A(10,"Shousanli",ARM(1.24, 0.80,-0.25)),
      A(11,"Quchi",   ARM(1.33, 0.85,-0.15)),
      A(12,"Zhouliao",ARM(1.38, 0.85,-0.40)),
      A(13,"Shouwuli",ARM(1.47, 0.85,-0.20)),
      A(14,"Binao",   ARM(1.62, 0.90,-0.10)),
      A(15,"Jianyu",  (0.560,2.035,0.085)),
      A(16,"Jugu",    (0.420,2.140,0.020)),
      A(17,"Tianding",(0.126,2.330,0.056)),
      A(18,"Futu",    (0.118,2.380,0.056)),
      A(19,"Kouheliao",FZ(0.038, 2.512)),
      A(20,"Yingxiang",FZ(0.048, 2.498)),
    ])

# ============================ 3. STOMACO (S / ST) ============================
mer(id="stomaco", nome="Stomaco", sigla="S", siglaInt="ST", elemento="Terra",
    natura="Yang", coppia="Milza/Pancreas", orario="07:00 – 09:00",
    colore="#f0a92e", bilaterale=True, coordinate=["stomaco-gran-pettorale-clavicolare"],
    descrizione="Dal viso (sotto l'occhio) scende lungo il collo, il torace sulla linea del capezzolo e l'addome a 2 cun dalla mediana, poi sulla faccia antero-esterna della coscia e della gamba fino al 2° dito del piede. 45 punti; il ramo facciale sale alla tempia (S7-S8).",
    seq=[
      A(1,"Chengqi",  FZ(0.078, 2.618)),
      A(2,"Sibai",    FZ(0.078, 2.580)),
      A(3,"Juliao",   FZ(0.075, 2.528)),
      A(4,"Dicang",   FZ(0.052, 2.470)),
      A(5,"Daying",   FZ(0.108, 2.436)),
      A(6,"Jiache",   (0.140, 2.438, 0.100)),
      A(9,"Renying",  (0.086,2.360,0.106)),
      A(10,"Shuitu",  (0.086,2.320,0.106)),
      A(11,"Qishe",   (0.078,2.288,0.108)),
      A(12,"Quepen",  F(0.22,2.14)),
      A(13,"Qihu",    F(0.235,2.08)),
      A(14,"Kufang",  F(0.24,1.99)),
      A(15,"Wuyi",    F(0.24,1.92)),
      A(16,"Yingchuang",F(0.24,1.87)),
      A(17,"Ruzhong", F(0.24,1.82)),
      A(18,"Rugen",   F(0.24,1.74)),
      A(19,"Burong",  F(0.22,1.62)),
      P(20,"Chengman"), P(21,"Liangmen"), P(22,"Guanmen"), P(23,"Taiyi"), P(24,"Huaroumen"),
      A(25,"Tianshu", F(0.20,1.28)),
      P(26,"Wailing"), P(27,"Daju"), P(28,"Shuidao"),
      A(29,"Guilai",  F(0.22,0.90)),
      A(30,"Qichong", F(0.24,0.82)),
      A(31,"Biguan",  LEG(0.72, 0.50, 0.80)),
      A(32,"Futu",    LEG(0.30, 0.35, 0.92)),
      A(33,"Yinshi",  LEG(0.02, 0.30, 0.94)),
      A(34,"Liangqiu",LEG(-0.05,0.30, 0.94)),
      A(35,"Dubi",    LEG(-0.17,0.45, 0.86)),
      A(36,"Zusanli", LEG(-0.28,0.45, 0.86)),
      A(37,"Shangjuxu",LEG(-0.42,0.45,0.86)),
      A(38,"Tiaokou", LEG(-0.58,0.45, 0.86)),
      A(39,"Xiajuxu", LEG(-0.66,0.45, 0.86)),
      A(40,"Fenglong",LEG(-0.58,0.80, 0.55)),
      A(41,"Jiexi",   (0.215,-1.152,0.075)),
      A(42,"Chongyang",(0.212,-1.208,0.235)),
      A(43,"Xiangu",  (0.205,-1.243,0.330)),
      A(44,"Neiting", (0.200,-1.262,0.400)),
      A(45,"Lidui",   (0.198,-1.272,0.452)),
    ],
    ramo_seq=[
      W((0.140,2.438,0.100)),          # parte da S6 (che appartiene al tracciato principale)
      A(7,"Xiaguan",  (0.163, 2.588, 0.078)),
      A(8,"Touwei",   H(0.55,0.62,0.56)),
    ])

# ======================= 4. MILZA / PANCREAS (MP / SP) =======================
mer(id="milza", nome="Milza / Pancreas", sigla="MP", siglaInt="SP", elemento="Terra",
    natura="Yin", coppia="Stomaco", orario="09:00 – 11:00",
    colore="#f7cf5a", bilaterale=True, coordinate=["milza-trapezio-medio","milza-pancreas-gran-dorsale"],
    descrizione="Dall'alluce risale il bordo interno del piede e della gamba, la faccia interna della coscia, l'addome e il fianco del torace fino a MP21 sulla linea medio-ascellare. 21 punti.",
    seq=[
      A(1,"Yinbai",   (0.135,-1.275,0.450)),
      A(2,"Dadu",     (0.132,-1.271,0.395)),
      A(3,"Taibai",   (0.130,-1.255,0.310)),
      A(4,"Gongsun",  (0.132,-1.240,0.220)),
      A(5,"Shangqiu", (0.148,-1.182,0.055)),
      A(6,"Sanyinjiao",LEG(-0.86,-0.85,0.30)),
      A(7,"Lougu",    LEG(-0.78,-0.85,0.30)),
      A(8,"Diji",     LEG(-0.42,-0.85,0.25)),
      A(9,"Yinlingquan",LEG(-0.28,-0.85,0.20)),
      A(10,"Xuehai",  LEG(-0.05,-0.70,0.60)),
      A(11,"Jimen",   LEG(0.22,-0.70,0.60)),
      A(12,"Chongmen",(0.22,0.80,0.21)),
      A(13,"Fushe",   F(0.24,0.88)),
      A(14,"Fujie",   F(0.28,1.12)),
      A(15,"Daheng",  F(0.30,1.28)),
      A(16,"Fuai",    F(0.30,1.44)),
      A(17,"Shidou",  F(0.36,1.70)),
      A(18,"Tianxi",  F(0.37,1.79)),
      A(19,"Xiongxiang",F(0.37,1.88)),
      A(20,"Zhourong",F(0.36,1.96)),
      A(21,"Dabao",   (0.44,1.72,0.10)),
    ])

# ============================= 5. CUORE (C / HT) =============================
mer(id="cuore", nome="Cuore", sigla="C", siglaInt="HT", elemento="Fuoco",
    natura="Yin", coppia="Intestino Tenue", orario="11:00 – 13:00",
    colore="#e0453c", bilaterale=True, coordinate=["cuore-sottoscapolare"],
    descrizione="Dal cavo ascellare scende sulla faccia interna (ulnare) del braccio e dell'avambraccio, attraversa il palmo e termina all'angolo ungueale del mignolo. 9 punti.",
    seq=[
      A(1,"Jiquan",   ARM(1.90,-0.80, 0.00)),
      A(2,"Qingling", ARM(1.50,-0.85, 0.30)),
      A(3,"Shaohai",  ARM(1.33,-0.85, 0.35)),
      A(4,"Lingdao",  ARM(0.95,-0.85, 0.45)),
      A(5,"Tongli",   ARM(0.92,-0.85, 0.45)),
      A(6,"Yinxi",    ARM(0.885,-0.85,0.45)),
      A(7,"Shenmen",  ARM(0.755,-0.80,0.50)),
      A(8,"Shaofu",   (0.502,0.535,0.072)),
      A(9,"Shaochong",(0.497,0.308,0.030)),
    ])

# ======================= 6. INTESTINO TENUE (IT / SI) =======================
mer(id="intestino-tenue", nome="Intestino Tenue", sigla="IT", siglaInt="SI",
    elemento="Fuoco", natura="Yang", coppia="Cuore", orario="13:00 – 15:00",
    colore="#f07a72", bilaterale=True, coordinate=["intestino-tenue-quadricipite"],
    descrizione="Dal mignolo risale il bordo ulnare della mano e dell'avambraccio, il retro della spalla e la scapola con un percorso a zig-zag, poi il collo e la guancia fino davanti all'orecchio. 19 punti.",
    seq=[
      A(1,"Shaoze",   (0.470,0.308,0.018)),
      A(2,"Qiangu",   (0.462,0.400,0.000)),
      A(3,"Houxi",    (0.458,0.500,-0.006)),
      A(4,"Wangu",    (0.458,0.600,-0.012)),
      A(5,"Yanggu",   ARM(0.760,-0.80,-0.50)),
      A(6,"Yanglao",  ARM(0.805,-0.85,-0.40)),
      A(7,"Zhizheng", ARM(0.980,-0.85,-0.40)),
      A(8,"Xiaohai",  ARM(1.320,-0.90,-0.35)),
      A(9,"Jianzhen", (0.435,1.880,-0.110)),
      A(10,"Naoshu",  (0.420,2.020,-0.130)),
      A(11,"Tianzong",B(0.30,1.92)),
      A(12,"Bingfeng",B(0.34,2.05)),
      A(13,"Quyuan",  B(0.24,2.07)),
      A(14,"Jianwaishu",B(0.20,2.17)),
      A(15,"Jianzhongshu",B(0.14,2.25)),
      A(16,"Tianchuang",(0.116,2.345,-0.062)),
      A(17,"Tianrong",(0.128, 2.428, -0.030)),
      A(18,"Quanliao",FZ(0.112, 2.566)),
      A(19,"Tinggong",(0.172, 2.618, 0.052)),
    ])

# ============================ 7. VESCICA (V / BL) ============================
mer(id="vescica", nome="Vescica", sigla="V", siglaInt="BL", elemento="Acqua",
    natura="Yang", coppia="Rene", orario="15:00 – 17:00",
    colore="#2f7fd4", bilaterale=True, coordinate=["vescica-tibiale-anteriore"],
    descrizione="Il meridiano più lungo (67 punti): dall'angolo interno dell'occhio passa sul cranio, scende lungo tutta la schiena con i punti Shu del dorso (linea interna a 1,5 cun) e la linea esterna a 3 cun (V41-V54), poi il retro della coscia e del polpaccio fino al 5° dito del piede.",
    seq=[
      A(1,"Jingming", FZ(0.032, 2.662)),
      A(2,"Cuanzhu",  FZ(0.042, 2.700)),
      A(3,"Meichong", H(0.30,0.85,0.75)),
      A(4,"Qucha",    H(0.34,0.95,0.62)),
      A(5,"Wuchu",    H(0.32,1.05,0.45)),
      A(6,"Chengguang",H(0.30,1.10,0.20)),
      A(7,"Tongtian", H(0.30,1.10,-0.05)),
      A(8,"Luoque",   H(0.30,1.00,-0.35)),
      A(9,"Yuzhen",   H(0.30,0.32,-0.95)),
      A(10,"Tianzhu", (0.068, 2.462, -0.180)),
      A(11,"Dazhu",   B(0.10,2.28)),
      A(12,"Fengmen", B(0.10,2.20)),
      A(13,"Feishu",  B(0.10,2.12)),
      A(14,"Jueyinshu",B(0.10,2.05)),
      A(15,"Xinshu",  B(0.10,1.98)),
      A(16,"Dushu",   B(0.10,1.91)),
      A(17,"Geshu",   B(0.10,1.84)),
      A(18,"Ganshu",  B(0.10,1.70)),
      A(19,"Danshu",  B(0.10,1.63)),
      A(20,"Pishu",   B(0.10,1.56)),
      A(21,"Weishu",  B(0.10,1.49)),
      A(22,"Sanjiaoshu",B(0.10,1.43)),
      A(23,"Shenshu", B(0.10,1.37)),
      A(24,"Qihaishu",B(0.10,1.30)),
      A(25,"Dachangshu",B(0.10,1.22)),
      A(26,"Guanyuanshu",B(0.10,1.14)),
      A(27,"Xiaochangshu",B(0.10,1.06)),
      A(28,"Pangguangshu",B(0.10,0.99)),
      A(29,"Zhonglushu",B(0.10,0.93)),
      A(30,"Baihuanshu",B(0.10,0.87)),
      A(31,"Shangliao",B(0.05,0.98)),
      A(32,"Ciliao",  B(0.05,0.92)),
      A(33,"Zhongliao",B(0.05,0.87)),
      A(34,"Xialiao", B(0.05,0.82)),
      A(35,"Huiyang", (0.04,0.74,-0.17)),
      A(36,"Chengfu", LEG(0.55, 0.00,-0.95)),
      A(37,"Yinmen",  LEG(0.25, 0.00,-0.95)),
      A(38,"Fuxi",    LEG(-0.10,-0.35,-0.90)),
      A(39,"Weiyang", LEG(-0.155,0.50,-0.85)),
      A(40,"Weizhong",LEG(-0.155,0.00,-0.95)),
      A(55,"Heyang",  LEG(-0.28, 0.00,-0.95)),
      A(56,"Chengjin",LEG(-0.45, 0.00,-0.95)),
      A(57,"Chengshan",LEG(-0.60,0.00,-0.95)),
      A(58,"Feiyang", LEG(-0.72, 0.50,-0.85)),
      A(59,"Fuyang",  LEG(-1.00, 0.60,-0.70)),
      A(60,"Kunlun",  (0.287,-1.160,-0.050)),
      A(61,"Pucan",   (0.287,-1.240,-0.030)),
      A(62,"Shenmai", (0.292,-1.238,0.030)),
      A(63,"Jinmen",  (0.295,-1.250,0.090)),
      A(64,"Jinggu",  (0.295,-1.256,0.160)),
      A(65,"Shugu",   (0.290,-1.262,0.235)),
      A(66,"Zutonggu",(0.285,-1.268,0.315)),
      A(67,"Zhiyin",  (0.288,-1.272,0.378)),
    ],
    ramo_seq=[
      A(41,"Fufen",   B(0.20,2.22)),
      A(42,"Pohu",    B(0.20,2.12)),
      A(43,"Gaohuang",B(0.20,2.05)),
      A(44,"Shentang",B(0.20,1.98)),
      A(45,"Yixi",    B(0.20,1.91)),
      A(46,"Geguan",  B(0.20,1.84)),
      A(47,"Hunmen",  B(0.20,1.70)),
      A(48,"Yanggang",B(0.20,1.63)),
      A(49,"Yishe",   B(0.20,1.56)),
      A(50,"Weicang", B(0.20,1.49)),
      A(51,"Huangmen",B(0.20,1.43)),
      A(52,"Zhishi",  B(0.20,1.37)),
      A(53,"Baohuang",B(0.20,0.97)),
      A(54,"Zhibian", B(0.19,0.87)),
    ])

# ============================== 8. RENE (R / KI) ==============================
mer(id="rene", nome="Rene", sigla="R", siglaInt="KI", elemento="Acqua",
    natura="Yin", coppia="Vescica", orario="17:00 – 19:00",
    colore="#1c4f9c", bilaterale=True, coordinate=["rene-psoas"],
    descrizione="Nasce sotto la pianta del piede, gira attorno al malleolo interno, risale la faccia interna della gamba e della coscia, poi l'addome a 0,5 cun dalla mediana e il torace a 2 cun, fino sotto la clavicola. 27 punti.",
    seq=[
      A(1,"Yongquan", (0.205,-1.300,0.275)),
      A(2,"Rangu",    (0.145,-1.252,0.190)),
      A(3,"Taixi",    (0.148,-1.160,-0.040)),
      A(4,"Dazhong",  (0.152,-1.215,-0.048)),
      A(5,"Shuiquan", (0.148,-1.228,-0.010)),
      A(6,"Zhaohai",  (0.145,-1.215,0.045)),
      A(7,"Fuliu",    LEG(-0.98,-0.75,-0.50)),
      A(8,"Jiaoxin",  LEG(-0.98,-0.90,-0.15)),
      A(9,"Zhubin",   LEG(-0.70,-0.70,-0.60)),
      A(10,"Yingu",   LEG(-0.155,-0.60,-0.80)),
      W((0.16,0.10,-0.05)),
      W((0.07,0.82,0.185)),
      A(11,"Henggu",  F(0.07,0.90)),
      A(12,"Dahe",    F(0.07,1.00)),
      A(13,"Qixue",   F(0.07,1.08)),
      A(14,"Siman",   F(0.07,1.16)),
      A(15,"Zhongzhu",F(0.07,1.22)),
      A(16,"Huangshu",F(0.08,1.28)),
      A(17,"Shangqu", F(0.08,1.34)),
      A(18,"Shiguan", F(0.08,1.40)),
      A(19,"Yindu",   F(0.08,1.46)),
      A(20,"Futonggu",F(0.08,1.52)),
      A(21,"Youmen",  F(0.08,1.58)),
      A(22,"Bulang",  F(0.10,1.74)),
      A(23,"Shenfeng",F(0.10,1.82)),
      A(24,"Lingxu",  F(0.10,1.90)),
      A(25,"Shencang",F(0.10,1.98)),
      A(26,"Yuzhong", F(0.10,2.06)),
      A(27,"Shufu",   F(0.10,2.12)),
    ])

# ================== 9. MAESTRO DEL CUORE / PERICARDIO (MC/PC) ==================
mer(id="maestro-cuore", nome="Maestro del Cuore (Pericardio)", sigla="MC", siglaInt="PC",
    elemento="Fuoco", natura="Yin", coppia="Triplice Riscaldatore", orario="19:00 – 21:00",
    colore="#e0559b", bilaterale=True, coordinate=["maestro-cuore-medio-gluteo"],
    descrizione="Dal torace, a lato del capezzolo, scende al centro della faccia anteriore del braccio e dell'avambraccio, attraversa il palmo e termina sulla punta del dito medio. 9 punti.",
    seq=[
      A(1,"Tianchi",  F(0.33,1.80)),
      A(2,"Tianquan", ARM(1.72, 0.00, 0.95)),
      A(3,"Quze",     ARM(1.33, 0.00, 0.95)),
      A(4,"Ximen",    ARM(1.00, 0.00, 0.95)),
      A(5,"Jianshi",  ARM(0.86, 0.00, 0.95)),
      A(6,"Neiguan",  ARM(0.82, 0.00, 0.95)),
      A(7,"Daling",   ARM(0.755,0.00, 0.95)),
      A(8,"Laogong",  (0.552,0.600,0.080)),
      A(9,"Zhongchong",(0.560,0.218,0.032)),
    ])

# ==================== 10. TRIPLICE RISCALDATORE (TR / TE) ====================
mer(id="triplice-riscaldatore", nome="Triplice Riscaldatore", sigla="TR", siglaInt="TE",
    elemento="Fuoco", natura="Yang", coppia="Maestro del Cuore", orario="21:00 – 23:00",
    colore="#f2803c", bilaterale=True, coordinate=["tr-tiroide-piccolo-rotondo","tr-surrenali-sartorio"],
    descrizione="Dall'anulare risale il dorso della mano e il centro della faccia posteriore dell'avambraccio e del braccio, la spalla e il collo, poi gira attorno all'orecchio fino all'estremità del sopracciglio. 23 punti.",
    seq=[
      A(1,"Guanchong",(0.508,0.252,0.008)),
      A(2,"Yemen",    (0.500,0.468,-0.012)),
      A(3,"Zhongzhu", (0.506,0.552,-0.020)),
      A(4,"Yangchi",  ARM(0.755,0.00,-0.95)),
      A(5,"Waiguan",  ARM(0.830,0.00,-0.95)),
      A(6,"Zhigou",   ARM(0.870,0.00,-0.95)),
      A(7,"Huizong",  ARM(0.870,0.35,-0.90)),
      A(8,"Sanyangluo",ARM(0.930,0.00,-0.95)),
      A(9,"Sidu",     ARM(1.060,0.00,-0.95)),
      A(10,"Tianjing",ARM(1.360,0.00,-0.95)),
      A(11,"Qinglengyuan",ARM(1.440,0.00,-0.95)),
      A(12,"Xiaoluo", ARM(1.530,0.00,-0.95)),
      A(13,"Naohui",  ARM(1.660,0.30,-0.90)),
      A(14,"Jianliao",(0.520,2.060,-0.075)),
      A(15,"Tianliao",(0.380,2.180,-0.105)),
      A(16,"Tianyou", (0.114,2.380,-0.064)),
      A(17,"Yifeng",  (0.158, 2.548, -0.082)),
      A(18,"Chimai",  H(0.80,0.05,-0.60)),
      A(19,"Luxi",    H(0.82,0.38,-0.45)),
      A(20,"Jiaosun", H(0.72,0.66,-0.08)),
      A(21,"Ermen",   (0.176, 2.662, 0.042)),
      A(22,"Erheliao",(0.156, 2.692, 0.078)),
      A(23,"Sizhukong",FZ(0.118, 2.700)),
    ])

# ====================== 11. VESCICA BILIARE (VB / GB) ======================
mer(id="vescica-biliare", nome="Vescica Biliare", sigla="VB", siglaInt="GB",
    elemento="Legno", natura="Yang", coppia="Fegato", orario="23:00 – 01:00",
    colore="#3fa14a", bilaterale=True, coordinate=["vescica-biliare-deltoide-anteriore"],
    descrizione="Dall'angolo esterno dell'occhio percorre a zig-zag il lato del cranio (VB1-VB20), scende sulla spalla e sul fianco del tronco, sull'anca e sulla faccia esterna della coscia e della gamba, fino al 4° dito del piede. 44 punti.",
    seq=[
      A(1,"Tongziliao",FZ(0.128, 2.660)),
      A(2,"Tinghui",  (0.172, 2.556, 0.045)),
      A(3,"Shangguan",(0.170, 2.622, 0.048)),
      A(4,"Hanyan",   H(0.85,0.45,0.35)),
      A(5,"Xuanlu",   H(0.90,0.30,0.26)),
      A(6,"Xuanli",   H(0.92,0.20,0.16)),
      A(7,"Qubin",    H(0.92,0.26,-0.06)),
      A(8,"Shuaigu",  H(0.70,0.74,-0.05)),
      A(9,"Tianchong",H(0.68,0.70,-0.30)),
      A(10,"Fubai",   H(0.70,0.36,-0.55)),
      A(11,"Touqiaoyin",H(0.62,0.15,-0.75)),
      A(12,"Wangu",   (0.132, 2.508, -0.148)),
      A(13,"Benshen", H(0.60,0.74,0.42)),
      A(14,"Yangbai", FZ(0.078, 2.736)),
      A(15,"Toulinqi",H(0.35,0.92,0.55)),
      A(16,"Muchuang",H(0.35,1.02,0.30)),
      A(17,"Zhengying",H(0.35,1.05,0.03)),
      A(18,"Chengling",H(0.35,0.95,-0.27)),
      A(19,"Naokong", H(0.35,0.56,-0.72)),
      A(20,"Fengchi", (0.098, 2.478, -0.176)),
      A(21,"Jianjing",(0.38,2.14,-0.02)),
      A(22,"Yuanye",  (0.46,1.80,-0.02)),
      A(23,"Zhejin",  (0.45,1.76,0.05)),
      A(24,"Riyue",   F(0.31,1.58)),
      A(25,"Jingmen", (0.40,1.44,0.06)),
      A(26,"Daimai",  (0.40,1.24,0.02)),
      A(27,"Wushu",   (0.385,1.00,0.06)),
      A(28,"Weidao",  (0.375,0.96,0.08)),
      A(29,"Juliao",  (0.365,0.78,0.02)),
      A(30,"Huantiao",(0.355,0.62,-0.16)),
      A(31,"Fengshi", LEG(0.22, 0.95, 0.00)),
      A(32,"Zhongdu", LEG(0.05, 0.95, 0.00)),
      A(33,"Xiyangguan",LEG(-0.155,0.90,0.30)),
      A(34,"Yanglingquan",LEG(-0.26,0.85,0.35)),
      A(35,"Yangjiao",LEG(-0.50, 0.92, 0.10)),
      A(36,"Waiqiu",  LEG(-0.50, 0.95, 0.25)),
      A(37,"Guangming",LEG(-0.66,0.90,0.25)),
      A(38,"Yangfu",  LEG(-0.80, 0.90, 0.25)),
      A(39,"Xuanzhong",LEG(-0.92,0.85,0.30)),
      A(40,"Qiuxu",   (0.285,-1.185,0.090)),
      A(41,"Zulinqi", (0.262,-1.235,0.290)),
      A(42,"Diwuhui", (0.258,-1.245,0.335)),
      A(43,"Xiaxi",   (0.252,-1.262,0.400)),
      A(44,"Zuqiaoyin",(0.252,-1.272,0.435)),
    ])

# ============================= 12. FEGATO (F / LR) =============================
mer(id="fegato", nome="Fegato", sigla="F", siglaInt="LR", elemento="Legno",
    natura="Yin", coppia="Vescica Biliare", orario="01:00 – 03:00",
    colore="#1f7a34", bilaterale=True, coordinate=["fegato-romboide"],
    descrizione="Dall'alluce (lato esterno) risale il dorso del piede, la faccia interna della gamba e della coscia, l'inguine, e termina sul torace sotto il capezzolo (F14 Qimen). 14 punti.",
    seq=[
      A(1,"Dadun",    (0.168,-1.272,0.455)),
      A(2,"Xingjian", (0.172,-1.262,0.375)),
      A(3,"Taichong", (0.175,-1.235,0.280)),
      A(4,"Zhongfeng",(0.165,-1.185,0.115)),
      A(5,"Ligou",    LEG(-0.85,-0.80,0.35)),
      A(6,"Zhongdu",  LEG(-0.76,-0.80,0.35)),
      A(7,"Xiguan",   LEG(-0.20,-0.85,0.20)),
      A(8,"Ququan",   LEG(-0.155,-0.85,0.15)),
      A(9,"Yinbao",   LEG(0.10,-0.80,0.30)),
      A(10,"Zuwuli",  LEG(0.55,-0.70,0.50)),
      A(11,"Yinlian", LEG(0.68,-0.60,0.60)),
      A(12,"Jimai",   (0.200,0.780,0.200)),
      A(13,"Zhangmen",(0.380,1.500,0.100)),
      A(14,"Qimen",   F(0.27,1.66)),
    ])

# ======================= 13. VASO CONCEZIONE (VC / CV) =======================
mer(id="vaso-concezione", nome="Vaso Concezione", sigla="VC", siglaInt="CV",
    elemento="—", natura="Yin (mare dei meridiani Yin)", coppia="Vaso Governatore",
    orario="—", colore="#20b6cc", bilaterale=False, coordinate=["vc-sovraspinato"],
    descrizione="Vaso straordinario mediano anteriore: dal perineo risale al centro dell'addome e del torace fino al mento. Raccoglie molti punti Mu (allarme). 24 punti.",
    seq=[
      A(1,"Huiyin",   (0.0,0.70,0.05)),
      A(2,"Qugu",     F(0.0,0.88)),
      A(3,"Zhongji",  F(0.0,0.94)),
      A(4,"Guanyuan", F(0.0,1.04)),
      A(5,"Shimen",   F(0.0,1.10)),
      A(6,"Qihai",    F(0.0,1.15)),
      A(7,"Yinjiao",  F(0.0,1.22)),
      A(8,"Shenque",  F(0.0,1.28)),
      A(9,"Shuifen",  F(0.0,1.32)),
      A(10,"Xiawan",  F(0.0,1.36)),
      A(11,"Jianli",  F(0.0,1.40)),
      A(12,"Zhongwan",F(0.0,1.44)),
      A(13,"Shangwan",F(0.0,1.49)),
      A(14,"Juque",   F(0.0,1.545)),
      A(15,"Jiuwei",  F(0.0,1.59)),
      A(16,"Zhongting",F(0.0,1.64)),
      A(17,"Shanzhong",F(0.0,1.70)),
      A(18,"Yutang",  F(0.0,1.77)),
      A(19,"Zigong",  F(0.0,1.83)),
      A(20,"Huagai",  F(0.0,1.89)),
      A(21,"Xuanji",  F(0.0,1.96)),
      A(22,"Tiantu",  F(0.0,2.14)),
      A(23,"Lianquan",(0.0, 2.352, 0.128)),
      A(24,"Chengjiang",(0.0, 2.436, 0.228)),
    ])

# ====================== 14. VASO GOVERNATORE (VG / GV) ======================
mer(id="vaso-governatore", nome="Vaso Governatore", sigla="VG", siglaInt="GV",
    elemento="—", natura="Yang (mare dei meridiani Yang)", coppia="Vaso Concezione",
    orario="—", colore="#8e4ec6", bilaterale=False, coordinate=["vg-grande-rotondo"],
    descrizione="Vaso straordinario mediano posteriore: dal coccige risale lungo la colonna vertebrale, la nuca e la linea mediana del cranio fino al labbro superiore. 28 punti.",
    seq=[
      A(1,"Changqiang",(0.0,0.74,-0.17)),
      A(2,"Yaoshu",   B(0.0,0.86)),
      A(3,"Yaoyangguan",B(0.0,1.12)),
      A(4,"Mingmen",  B(0.0,1.37)),
      A(5,"Xuanshu",  B(0.0,1.45)),
      A(6,"Jizhong",  B(0.0,1.56)),
      A(7,"Zhongshu", B(0.0,1.64)),
      A(8,"Jinsuo",   B(0.0,1.72)),
      A(9,"Zhiyang",  B(0.0,1.80)),
      A(10,"Lingtai", B(0.0,1.88)),
      A(11,"Shendao", B(0.0,1.96)),
      A(12,"Shenzhu", B(0.0,2.06)),
      A(13,"Taodao",  B(0.0,2.18)),
      A(14,"Dazhui",  B(0.0,2.28)),
      A(15,"Yamen",   (0.0, 2.452, -0.212)),
      A(16,"Fengfu",  LZ(0.0, 2.512)),
      A(17,"Naohu",   H(0.0,0.30,-0.95)),
      A(18,"Qiangjian",H(0.0,0.65,-0.75)),
      A(19,"Houding", H(0.0,0.90,-0.45)),
      A(20,"Baihui",  H(0.0,1.00,0.0)),
      A(21,"Qianding",H(0.0,0.95,0.35)),
      A(22,"Xinhui",  H(0.0,0.80,0.60)),
      A(23,"Shangxing",H(0.0,0.62,0.80)),
      A(24,"Shenting",H(0.0,0.48,0.90)),
      W(H(0.0,0.10,1.00)),
      A(25,"Suliao",  (0.0, 2.545, 0.272)),
      A(26,"Renzhong",(0.0, 2.492, 0.242)),
      A(27,"Duiduan", (0.0, 2.474, 0.238)),
      A(28,"Yinjiao", (0.0, 2.462, 0.234)),
    ])

# ---------------- mappa nomi usati altrove nell'app -> id meridiano ----------------
ALIASES = {
    "polmone": ["Polmone","P","LU"],
    "intestino-crasso": ["Intestino Crasso","Grosso Intestino","GI","LI"],
    "stomaco": ["Stomaco","S","ST"],
    "milza": ["Milza","Milza/Pancreas","Milza / Pancreas","Pancreas","MP","SP"],
    "cuore": ["Cuore","C","HT"],
    "intestino-tenue": ["Intestino Tenue","IT","SI"],
    "vescica": ["Vescica","V","BL"],
    "rene": ["Rene","R","KI"],
    "maestro-cuore": ["Maestro del Cuore (Pericardio)","Maestro del Cuore","Pericardio","MC","PC"],
    "triplice-riscaldatore": ["Triplice Riscaldatore","Triplice","TR","TE"],
    "vescica-biliare": ["Vescica Biliare","VB","GB"],
    "fegato": ["Fegato","F","LR"],
    "vaso-concezione": ["Vaso Concezione","VC","CV"],
    "vaso-governatore": ["Vaso Governatore","VG","GV"],
}

ATTESI = {"polmone":11,"intestino-crasso":20,"stomaco":45,"milza":21,"cuore":9,
          "intestino-tenue":19,"vescica":67,"rene":27,"maestro-cuore":9,
          "triplice-riscaldatore":23,"vescica-biliare":44,"fegato":14,
          "vaso-concezione":24,"vaso-governatore":28}

# ============================================================================
#  TAVOLE 2D — contorni e linee anatomiche ricavati dalle STESSE quote del
#  manichino 3D, così i punti proiettati coincidono con il disegno.
#  Unità identiche al 3D; l'app converte in coordinate SVG.
# ============================================================================
def _head_x(y):
    t = (y - HC[1]) / HR[1]
    if abs(t) >= 1: return 0.0
    return HR[0] * math.sqrt(1 - t*t)

def _head_z(y):
    t = (y - HC[1]) / HR[1]
    if abs(t) >= 1: return 0.0
    return HR[2] * math.sqrt(1 - t*t)

def _collo(y):
    return 0.145 if 2.23 <= y <= 2.45 else 0.0

def _tronco_x(y):
    return torso_r(y) if 0.60 <= y <= 2.31 else 0.0

def _orecchio(y):
    return 0.196 if 2.560 <= y <= 2.682 else 0.0

def _corpo_x(y):
    return max(_tronco_x(y), _collo(y), _head_x(y), _orecchio(y))

def _arm_edge(y, esterno=True):
    cx, cz, r = _interp(ARM_AXIS, y)
    return cx + r if esterno else cx - r

def _leg_edge(y, esterno=True):
    cx, cz, r = _interp(LEG_AXIS, y)
    return cx + r if esterno else cx - r

def _R(v): return round(v, 3)
def _poly(pts): return [[_R(a), _R(b)] for a, b in pts]

def _contorno_simmetrico(y0, y1, fx, passo=0.025):
    """contorno chiuso di una parte simmetrica rispetto a x=0"""
    su, giu = [], []
    y = y0
    while y <= y1 + 1e-9:
        v = fx(y)
        if v > 0.001:
            su.append((v, y)); giu.append((-v, y))
        y += passo
    return _poly(su + list(reversed(giu)))

def _cap(p, q, verso, n=8):
    """semicerchio che raccorda due bordi (verso=+1 verso l'alto, -1 verso il basso)"""
    cx, cy = (p[0]+q[0])/2.0, (p[1]+q[1])/2.0
    r = abs(q[0]-p[0])/2.0
    if r < 1e-4: return []
    a0 = math.atan2(p[1]-cy, p[0]-cx); a1 = math.atan2(q[1]-cy, q[0]-cx)
    out = []
    for i in range(1, n):
        t = i/float(n)
        a = a0 + (a1-a0)*t
        out.append((cx + r*math.cos(a), cy + verso*abs(r*math.sin(math.pi*t))*1.0))
    return out

def _contorno_bordi(y0, y1, fdx, fsx, passo=0.025, cap_alto=False, cap_basso=False):
    """contorno chiuso definito da bordo destro e bordo sinistro"""
    a, b = [], []
    y = y0
    while y <= y1 + 1e-9:
        a.append((fdx(y), y)); b.append((fsx(y), y))
        y += passo
    pts = list(a)
    if cap_alto: pts += _cap(a[-1], b[-1], +1)
    pts += list(reversed(b))
    if cap_basso: pts += _cap(b[0], a[0], -1)
    return _poly(pts)

def _capsula(p0, p1, r0, r1, n=10):
    """contorno di una capsula fra due punti 2D (per dita e ossa)"""
    (x0, y0), (x1, y1) = p0, p1
    dx, dy = x1 - x0, y1 - y0
    L = math.hypot(dx, dy) or 1.0
    ux, uy = dx / L, dy / L
    px, py = -uy, ux
    pts = []
    for i in range(n + 1):
        a = math.pi * i / n
        pts.append((x0 + px*r0*math.cos(a) - ux*r0*math.sin(a),
                    y0 + py*r0*math.cos(a) - uy*r0*math.sin(a)))
    for i in range(n + 1):
        a = math.pi * i / n
        pts.append((x1 - px*r1*math.cos(a) + ux*r1*math.sin(a),
                    y1 - py*r1*math.cos(a) + uy*r1*math.sin(a)))
    return _poly(pts)

def _arco(cx, cy, rx, ry, a0, a1, n=14):
    return _poly([(cx + rx*math.cos(a0 + (a1-a0)*i/n), cy + ry*math.sin(a0 + (a1-a0)*i/n))
                  for i in range(n + 1)])

def sagome_fronte():
    """contorni chiusi della vista frontale (piano x-y)"""
    C = []
    C.append(_contorno_simmetrico(0.60, 2.93, _corpo_x))
    for s in (1, -1):
        # braccio + palmo
        def _palmo_w(y):
            t = max(0.0, min(1.0, (0.74 - y) / (0.74 - 0.50)))
            return 0.052 + (HAND["semilarghezza"] - 0.052) * math.sin(t * math.pi * 0.5)
        C.append(_contorno_bordi(0.47, 2.00,
            lambda y, s=s: s*(_arm_edge(y) if y >= 0.74 else HAND["centro_x"] + _palmo_w(y)),
            lambda y, s=s: s*(_arm_edge(y, False) if y >= 0.74 else HAND["centro_x"] - _palmo_w(y)),
            cap_alto=True, cap_basso=True))
        # dita
        for nome, xm, xt, yt, r in HAND["dita"]:
            C.append(_capsula((s*xm, HAND["mcp_y"] + 0.01), (s*xt, yt), r, r*0.75))
        P = HAND["pollice"]
        C.append(_capsula((s*P["cmc"][0], P["cmc"][1]), (s*P["punta"][0], P["punta"][1]),
                          P["raggio"], P["raggio"]*0.7))
        # gamba
        C.append(_contorno_bordi(-1.14, 0.70,
            lambda y, s=s: s*_leg_edge(y), lambda y, s=s: s*_leg_edge(y, False), cap_alto=True))
        # piede visto di fronte
        C.append(_poly([(s*0.157,-1.14),(s*0.288,-1.14),(s*0.305,-1.30),(s*0.128,-1.30)]))
    return C

def dettagli_fronte():
    D = []
    A = lambda pts: D.append(_poly(pts))
    zf = lambda x, y: 0
    # viso
    fx = FACE
    for s in (1, -1):
        D.append(_arco(s*fx["ipd"], fx["occhi"], 0.036, 0.020, 0, 2*math.pi))            # occhio
        D.append(_arco(s*0.075, fx["occhi"]+0.042, 0.058, 0.024, math.pi*0.12, math.pi*0.88))  # sopracciglio
        D.append(_arco(s*fx["orecchioX"], fx["orecchioY"], 0.022, 0.050, -math.pi/2, math.pi/2))  # orecchio
    A([(-0.026, fx["glabella"]-0.02), (-0.018, fx["naso"]+0.02), (0.0, fx["naso"]),
       (0.018, fx["naso"]+0.02), (0.026, fx["glabella"]-0.02)])              # naso
    A([(-0.030, fx["sottonaso"]), (0.0, fx["sottonaso"]-0.008), (0.030, fx["sottonaso"])])  # narici
    A([(-0.046, fx["bocca"]), (0.0, fx["bocca"]+0.010), (0.046, fx["bocca"])])   # bocca
    A([(-0.152, 2.635), (-0.150, fx["zigomo"] and 2.545), (-0.108, 2.462),
       (-0.048, fx["mento"]+0.012), (0.0, fx["mento"]),
       (0.048, fx["mento"]+0.012), (0.108, 2.462), (0.150, 2.545), (0.152, 2.635)])  # mandibola
    A([(-0.132, 2.800), (0.0, 2.826), (0.132, 2.800)])                       # attaccatura dei capelli
    # collo e clavicole
    for s in (1, -1):
        A([(s*0.05, 2.44), (s*0.10, 2.32), (s*0.16, 2.22)])                  # sternocleidomastoideo
        A([(s*0.02, 2.15), (s*0.20, 2.16), (s*0.38, 2.11), (s*0.47, 2.04)])  # clavicola
    # sterno + linea alba
    A([(0.0, 2.12), (0.0, LAND.get("arcata", 1.55) if isinstance(LAND, dict) else 1.55)]) if False else None
    A([(0.0, 2.12), (0.0, 1.58)])
    A([(0.0, 1.52), (0.0, 0.86)])
    # pettorali
    for s in (1, -1):
        A([(s*0.04, 2.02), (s*0.22, 1.96), (s*0.36, 1.86), (s*0.30, 1.74), (s*0.10, 1.72)])
        D.append(_arco(s*0.24, 1.82, 0.026, 0.026, 0, 2*math.pi))            # capezzolo
    # arcata costale
    for s in (1, -1):
        A([(s*0.02, 1.65), (s*0.20, 1.55), (s*0.34, 1.40)])
    # coste
    for k, yb in enumerate((1.72, 1.86, 2.00)):
        for s in (1, -1):
            A([(s*0.06, yb), (s*0.22, yb + 0.03), (s*0.36, yb - 0.03)])
    # addominali
    for s in (1, -1):
        A([(s*0.075, 1.55), (s*0.075, 1.20)])
    for y in (1.46, 1.36, 1.26):
        A([(-0.075, y), (0.075, y)])
    D.append(_arco(0.0, 1.28, 0.028, 0.028, 0, 2*math.pi))                   # ombelico
    # creste iliache + inguine
    for s in (1, -1):
        A([(s*0.10, 0.96), (s*0.26, 1.00), (s*0.36, 1.06)])
        A([(s*0.06, 0.80), (s*0.24, 0.90), (s*0.36, 1.00)])
    D.append(_arco(0.0, 0.82, 0.14, 0.05, math.pi, 2*math.pi))               # arco pubico
    # arti: rilievi
    for s in (1, -1):
        A([(s*0.10, 1.94), (s*0.03, 1.86)])                                  # solco sterno
        A([(s*0.52, 1.90), (s*0.58, 1.72), (s*0.57, 1.50)])                  # bicipite
        A([(s*0.50, 1.86), (s*0.49, 1.55)])
        A([(s*0.545, 0.74), (s*0.545, 0.52)])                                # centro palmo
        D.append(_arco(s*0.212, -0.135, 0.055, 0.06, 0, 2*math.pi))          # rotula
        A([(s*0.13, 0.30), (s*0.17, -0.02)])                                 # vasto mediale
        A([(s*0.30, 0.35), (s*0.28, 0.00)])                                  # vasto laterale
        A([(s*0.205, -0.24), (s*0.212, -1.00)])                              # cresta tibiale
        D.append(_arco(s*0.163, -1.155, 0.030, 0.030, 0, 2*math.pi))         # malleolo interno
        D.append(_arco(s*0.272, -1.165, 0.028, 0.028, 0, 2*math.pi))         # malleolo esterno
        for nome, x, zt, r in FOOT["dita"]:
            A([(s*x, -1.30), (s*x, -1.26)])
    return D

def dettagli_retro():
    D = []
    A = lambda pts: D.append(_poly(pts))
    # colonna
    A([(0.0, 2.30), (0.0, 0.84)])
    for i in range(17):
        y = 2.28 - i*0.09
        A([(-0.022, y), (0.022, y)])
    # scapole
    for s in (1, -1):
        A([(s*0.09, 2.14), (s*0.34, 2.08), (s*0.30, 1.86), (s*0.12, 1.94), (s*0.09, 2.14)])
        A([(s*0.11, 2.05), (s*0.32, 2.02)])
    # coste posteriori
    for yb in (1.60, 1.74, 1.88, 2.02):
        for s in (1, -1):
            A([(s*0.03, yb), (s*0.20, yb - 0.05), (s*0.33, yb - 0.13)])
    # trapezio
    A([(-0.42, 2.10), (-0.06, 2.32), (0.06, 2.32), (0.42, 2.10)])
    # creste iliache + sacro
    for s in (1, -1):
        A([(s*0.06, 1.00), (s*0.24, 1.02), (s*0.35, 1.08)])
    A([(-0.07, 1.00), (0.0, 0.80), (0.07, 1.00)])
    # solco gluteo + pieghe
    A([(0.0, 0.84), (0.0, 0.52)])
    for s in (1, -1):
        A([(s*0.03, 0.52), (s*0.18, 0.50), (s*0.31, 0.56)])
        A([(s*0.10, -0.28), (s*0.32, -0.28)])                # piega poplitea
        A([(s*0.215, -0.42), (s*0.215, -0.90)])              # solco dei gemelli
        A([(s*0.16, -0.50), (s*0.215, -0.86)])
        A([(s*0.27, -0.50), (s*0.215, -0.86)])
        A([(s*0.215, -0.95), (s*0.215, -1.20)])              # tendine d'Achille
        A([(s*0.14, 1.60), (s*0.30, 1.50)])                  # margine gran dorsale
    return D

def sagome_lato():
    """contorni della vista laterale (piano z-y): profilo del corpo"""
    def zmax(y):
        v = 0.0
        if 0.60 <= y <= 2.31: v = max(v, torso_r(y)*TORSO_ZSCALE + 0.02)
        if 2.23 <= y <= 2.45: v = max(v, 0.115)
        if 2.35 <= y <= 2.93: v = max(v, _head_z(y) + HC[2])
        for (yy, zz) in ((2.40,0.150),(2.44,0.196),(2.47,0.222),(2.50,0.240),
                         (2.545,0.272),(2.58,0.238),(2.62,0.230),(2.68,0.222),(2.74,0.200)):
            if abs(y - yy) < 0.022: v = max(v, zz)      # profilo del viso (naso, labbra, mento)
        if -1.30 <= y <= -1.10: v = max(v, 0.46)        # piede
        if -1.14 <= y <= 0.92:
            cx, cz, r = _interp(LEG_AXIS, y); v = max(v, cz + r)
        return v
    def zmin(y):
        v = 0.0
        if 0.60 <= y <= 2.31: v = min(v, -(torso_r(y)*TORSO_ZSCALE + 0.02))
        if 2.23 <= y <= 2.45: v = min(v, -0.115)
        if 2.35 <= y <= 2.93: v = min(v, -(_head_z(y) - HC[2]))
        if 0.45 <= y <= 0.90: v = min(v, -0.34)         # glutei
        if -1.30 <= y <= -1.14: v = min(v, -0.16)       # tallone
        if -1.14 <= y <= 0.92:
            cx, cz, r = _interp(LEG_AXIS, y); v = min(v, cz - r)
        return v
    C = [_contorno_bordi(-1.30, 2.93, zmax, zmin)]
    # braccio di profilo
    C.append(_contorno_bordi(0.47, 2.00,
        lambda y: (_interp(ARM_AXIS, y)[1] + _interp(ARM_AXIS, y)[2]) if y >= 0.74 else 0.078,
        lambda y: (_interp(ARM_AXIS, y)[1] - _interp(ARM_AXIS, y)[2]) if y >= 0.74 else 0.002,
        cap_alto=True, cap_basso=True))
    return C

def dettagli_lato():
    D = []
    A = lambda pts: D.append(_poly(pts))
    D.append(_arco(FACE["orecchioZ"], FACE["orecchioY"], 0.026, 0.050, 0, 2*math.pi))   # orecchio
    A([(0.16, 2.62), (0.21, 2.57), (0.20, 2.49), (0.15, 2.44)])  # zigomo/mascella
    A([(0.19, 2.43), (0.09, 2.405), (0.02, 2.36)])               # mandibola
    A([(-0.20, 2.30), (-0.19, 2.10), (-0.17, 1.80), (-0.20, 1.50),
       (-0.19, 1.20), (-0.16, 0.95), (-0.13, 0.84)])             # colonna di profilo
    A([(0.0, 2.14), (0.10, 2.10), (0.20, 2.00)])                 # clavicola di profilo
    A([(0.24, 1.82), (0.30, 1.80)])                              # capezzolo
    A([(0.235, 1.28), (0.26, 1.28)])                             # ombelico
    A([(0.24, 1.55), (0.20, 1.42)])                              # arcata costale
    A([(-0.30, 0.80), (-0.26, 0.60), (-0.16, 0.48)])             # gluteo
    A([(0.14, -0.135), (0.18, -0.135)])                          # rotula
    A([(-0.12, -0.90), (-0.09, -1.16)])                          # tendine d'Achille
    A([(-0.12, -1.28), (0.44, -1.28)])                           # pianta
    return D

def sagoma_piede():
    """dorso del piede visto dall'alto (piano x-z), lato sinistro"""
    C = []
    pts = []
    zs = [i*0.02 - 0.12 for i in range(int((0.46+0.12)/0.02)+1)]
    for z in zs: pts.append((FOOT["cx"] + _lerp_tab(FOOT["larghezza"], z), z))
    for z in reversed(zs): pts.append((FOOT["cx"] - _lerp_tab(FOOT["larghezza"], z), z))
    C.append(_poly(pts))
    for nome, x, zt, r in FOOT["dita"]:
        C.append(_capsula((x, zt - 0.11), (x, zt), r, r*0.8))
    return C

def dettagli_piede():
    D = []
    A = lambda pts: D.append(_poly(pts))
    for nome, x, zt, r in FOOT["dita"]:
        A([(x, zt - 0.11), (x, 0.06)])                 # metatarsi
    A([(FOOT["cx"] - 0.05, -0.10), (FOOT["cx"] + 0.05, -0.10)])   # tallone
    D.append(_arco(FOOT["cx"], -0.02, 0.055, 0.045, 0, 2*math.pi))  # caviglia
    A([(0.150, 0.20), (0.282, 0.20)])                  # linea dei metatarsi
    return D

def tavole():
    return {
        "fronte":  {"contorni": sagome_fronte(), "dettagli": dettagli_fronte()},
        "retro":   {"contorni": sagome_fronte(), "dettagli": dettagli_retro()},
        "lato":    {"contorni": sagome_lato(),   "dettagli": dettagli_lato()},
        "piede":   {"contorni": sagoma_piede(),  "dettagli": dettagli_piede()},
    }

def corpo():
    """dati anatomici condivisi con assets/js/manichino.js"""
    return {
        "unitaCm": 40,
        "torsoProfile": [[y, r] for (y, r) in TORSO_PROFILE],
        "torsoZScale": TORSO_ZSCALE,
        "testa": {"centro": list(HC), "raggi": [round(v,4) for v in HR], "viso": FACE},
        "braccio": [list(a) for a in ARM_AXIS],
        "gamba": [list(a) for a in LEG_AXIS],
        "mano": HAND,
        "piede": FOOT,
        "spalla": [0.50, 2.02, 0.0],
        "anca": [0.185, 0.86, 0.0],
        "tavole": tavole(),
    }

def build():
    tot = 0
    for m in M:
        lista = [nodo["sigla"] for nodo in (m.get("nodi") or []) + (m.get("ramo") or []) if nodo.get("sigla")]
        sig = set(lista)
        assert len(lista) == len(sig), "%s: sigle duplicate %s" % (m["id"], sorted(set(x for x in lista if lista.count(x) > 1)))
        n = len(sig)
        att = ATTESI[m["id"]]
        assert n == att, "%s: %d punti invece di %d" % (m["id"], n, att)
        nums = sorted(int(s[len(m["sigla"]):]) for s in sig)
        assert nums == list(range(1, att+1)), "%s: numerazione non contigua" % m["id"]
        tot += n
    assert tot == 361, "totale punti %d invece di 361" % tot
    out = {
        "titolo": "Meridiani MTC",
        "descrizione": ("Tracciati e TUTTI i 361 punti classici dei 12 meridiani principali + Vaso "
                        "Concezione e Vaso Governatore, mappati sul manichino in posizione anatomica "
                        "(palmi in avanti). Convenzione: x<0 = lato DESTRO del soggetto, x>0 = lato "
                        "SINISTRO; i meridiani bilaterali sono definiti sul lato sinistro e specchiati "
                        "dall'app. Posizioni indicative a scopo di consultazione."),
        "totalePunti": tot,
        "alias": ALIASES,
        "meridiani": M,
    }
    return out, tot

def main():
    root = sys.argv[1] if len(sys.argv) > 1 else "."
    out, tot = build()
    jpath = os.path.join(root, "tools", "meridiani.json")
    with open(jpath, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    jspath = os.path.join(root, "assets", "js", "meridiani_data.js")
    with open(jspath, "w", encoding="utf-8") as f:
        f.write("/* meridiani_data.js — dati dei meridiani MTC (tracciati + 361 punti classici).\n")
        f.write("   Generato da tools/generate_meridiani.py. NON editare a mano. */\n")
        f.write("window.MERIDIANI = ")
        json.dump(out, f, ensure_ascii=False, indent=2)
        f.write(";\n")
    cpath = os.path.join(root, "assets", "js", "corpo_data.js")
    with open(cpath, "w", encoding="utf-8") as f:
        f.write("/* corpo_data.js — anatomia del manichino (scheletro, profili, mano, piede).\n")
        f.write("   Sorgente unica condivisa da manichino.js e dai punti dei meridiani.\n")
        f.write("   Generato da tools/generate_meridiani.py. NON editare a mano. */\n")
        f.write("window.CORPO = ")
        json.dump(corpo(), f, ensure_ascii=False, indent=2)
        f.write(";\n")
    chiave = sum(1 for m in M for a in (m.get("nodi") or []) + (m.get("ramo") or []) if a.get("chiave"))
    nodi = sum(len(m.get("nodi") or []) + len(m.get("ramo") or []) for m in M)
    print("meridiani: %d · nodi: %d · punti: %d (di cui chiave: %d)" % (len(M), nodi, tot, chiave))
    print("scritti: %s , %s , %s" % (jpath, jspath, cpath))

if __name__ == "__main__":
    main()
