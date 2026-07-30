# -*- coding: utf-8 -*-
"""
generate_meridiani.py — genera i dati dei 14 meridiani MTC per la mappa 3D.

Sorgente: le definizioni qui sotto (nodi ancorati ai landmark del manichino di
assets/js/punti.js). Output:
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

def FS(x, y, off=0.012):  # superficie anteriore
    return round(surface_z(x, y, True)+off, 3)
def BS(x, y, off=0.012):  # superficie posteriore
    return round(surface_z(x, y, False)-off, 3)

def N(x, y, z, sigla=None, nome=None, ruolo=None, note=None):
    """nodo del tracciato; se ha 'sigla' diventa un punto visibile/cliccabile"""
    d = {"x": round(x,3), "y": round(y,3), "z": round(z,3)}
    if sigla:
        d["sigla"] = sigla
        d["nome"] = nome or ""
        if ruolo: d["ruolo"] = ruolo
        if note: d["note"] = note
    return d

M = []   # elenco meridiani

def mer(**kw):
    M.append(kw)

# ============================ 1. POLMONE (P / LU) ============================
mer(id="polmone", nome="Polmone", sigla="P", siglaInt="LU", elemento="Metallo",
    natura="Yin", coppia="Grosso Intestino", orario="03:00 – 05:00",
    colore="#9fb3bf", bilaterale=True,
    coordinate=["polmone-deltoide-medio"],
    descrizione="Parte dal torace (P1), scorre sulla faccia anteriore-radiale del braccio e termina all'angolo ungueale del pollice.",
    nodi=[
      N(0.36,1.98,FS(0.36,1.98),"P1","Zhongfu","Mu del Polmone","1° spazio intercostale, sotto la clavicola, lato esterno del torace"),
      N(0.44,1.92,0.22),
      N(0.56,1.82,0.14),
      N(0.64,1.60,0.12),
      N(0.72,1.36,0.12,"P5","Chize","He-mare · dispersione","piega del gomito, lato radiale (esterno) del tendine del bicipite"),
      N(0.735,1.14,0.11),
      N(0.755,0.95,0.10,"P7","Lieque","Luo di passaggio","1,5 cun sopra la piega del polso, sul bordo radiale"),
      N(0.77,0.86,0.09,"P9","Taiyuan","Yuan sorgente · tonificazione","piega del polso, lato radiale, sull'arteria"),
      N(0.80,0.76,0.10),
      N(0.82,0.67,0.10,"P11","Shaoshang","Jing-pozzo","angolo ungueale del pollice, lato radiale"),
    ])

# ====================== 2. GROSSO INTESTINO (GI / LI) ======================
mer(id="intestino-crasso", nome="Grosso Intestino", sigla="GI", siglaInt="LI",
    elemento="Metallo", natura="Yang", coppia="Polmone", orario="05:00 – 07:00",
    colore="#c8d3d9", bilaterale=True,
    coordinate=["intestino-crasso-tensore-fascia-lata"],
    descrizione="Dall'indice risale il dorso della mano e la faccia esterna del braccio fino alla spalla, al collo e all'ala del naso.",
    nodi=[
      N(0.805,0.66,0.09,"GI1","Shangyang","Jing-pozzo","angolo ungueale dell'indice, lato radiale"),
      N(0.79,0.755,-0.02,"GI4","Hegu","Yuan sorgente","dorso della mano, tra 1° e 2° metacarpo"),
      N(0.775,0.86,-0.05),
      N(0.755,1.05,-0.04),
      N(0.74,1.36,0.04,"GI11","Quchi","He-mare · tonificazione","estremità esterna della piega del gomito, a gomito flesso"),
      N(0.70,1.62,0.02),
      N(0.60,2.02,0.10,"GI15","Jianyu","punto di riunione della spalla","depressione antero-esterna dell'acromion, a braccio abdotto"),
      N(0.30,2.20,0.13),
      N(0.18,2.38,0.11),
      N(0.15,2.47,0.19),
      N(0.05,2.52,0.27,"GI20","Yingxiang","fine del meridiano","nella piega naso-labiale, a lato dell'ala del naso"),
    ])

# ============================ 3. STOMACO (S / ST) ============================
mer(id="stomaco", nome="Stomaco", sigla="S", siglaInt="ST", elemento="Terra",
    natura="Yang", coppia="Milza/Pancreas", orario="07:00 – 09:00",
    colore="#f0a92e", bilaterale=True,
    coordinate=["stomaco-gran-pettorale-clavicolare"],
    descrizione="Dal viso scende lungo il collo, il torace (linea del capezzolo) e l'addome, poi sulla faccia antero-esterna della gamba fino al 2° dito del piede.",
    nodi=[
      N(0.09,2.55,0.25,"S1","Chengqi","inizio del meridiano","sotto la pupilla, sul bordo dell'orbita"),
      N(0.06,2.46,0.26,"S4","Dicang","","0,4 cun a lato dell'angolo della bocca"),
      N(0.18,2.44,0.16,"S6","Jiache","","angolo della mandibola, sul ventre del massetere"),
      N(0.12,2.24,0.14,"S9","Renying","finestra del cielo","a lato del pomo d'Adamo, sull'arteria carotide"),
      N(0.20,2.12,FS(0.20,2.12)),
      N(0.24,1.82,FS(0.24,1.82)),
      N(0.22,1.50,FS(0.22,1.50)),
      N(0.20,1.28,FS(0.20,1.28),"S25","Tianshu","Mu del Grosso Intestino","2 cun a lato dell'ombelico"),
      N(0.20,1.02,FS(0.20,1.02)),
      N(0.25,0.82,FS(0.25,0.82)),
      N(0.26,0.40,0.17),
      N(0.25,0.00,0.16),
      N(0.27,-0.28,0.13),
      N(0.28,-0.48,0.12,"S36","Zusanli","He-mare · punto di tonificazione generale","3 cun sotto il ginocchio, un dito a lato della cresta tibiale"),
      N(0.30,-0.75,0.11,"S40","Fenglong","Luo di passaggio","8 cun sopra il malleolo esterno, a lato della tibia"),
      N(0.24,-1.15,0.10,"S41","Jiexi","tonificazione","centro della piega anteriore della caviglia, tra i tendini"),
      N(0.22,-1.23,0.18,"S42","Chongyang","Yuan sorgente","punto più alto del dorso del piede, sull'arteria pedidia"),
      N(0.20,-1.28,0.27,"S45","Lidui","Jing-pozzo · dispersione","angolo ungueale del 2° dito del piede, lato esterno"),
    ])

# ======================= 4. MILZA / PANCREAS (MP / SP) =======================
mer(id="milza", nome="Milza / Pancreas", sigla="MP", siglaInt="SP", elemento="Terra",
    natura="Yin", coppia="Stomaco", orario="09:00 – 11:00",
    colore="#f7cf5a", bilaterale=True,
    coordinate=["milza-trapezio-medio","milza-pancreas-gran-dorsale"],
    descrizione="Dall'alluce risale il bordo interno del piede e della gamba, la faccia interna della coscia, l'addome e termina sul fianco del torace.",
    nodi=[
      N(0.145,-1.28,0.24,"MP1","Yinbai","Jing-pozzo","angolo ungueale dell'alluce, lato interno"),
      N(0.13,-1.26,0.13,"MP3","Taibai","Yuan sorgente","bordo interno del piede, dietro la testa del 1° metatarso"),
      N(0.13,-1.25,0.04,"MP4","Gongsun","Luo di passaggio","bordo interno del piede, davanti alla base del 1° metatarso"),
      N(0.14,-1.16,0.06),
      N(0.14,-0.98,0.04,"MP6","Sanyinjiao","incrocio dei 3 Yin del piede","3 cun sopra il malleolo interno, sul bordo posteriore della tibia"),
      N(0.135,-0.40,0.05,"MP9","Yinlingquan","He-mare","depressione sotto il condilo interno della tibia"),
      N(0.15,0.05,0.11),
      N(0.19,0.78,0.21),
      N(0.30,1.28,FS(0.30,1.28),"MP15","Daheng","","4 cun a lato dell'ombelico, sulla linea del capezzolo"),
      N(0.31,1.52,FS(0.31,1.52)),
      N(0.44,1.72,0.10,"MP21","Dabao","grande Luo della Milza","linea medio-ascellare, 6° spazio intercostale"),
    ])

# ============================= 5. CUORE (C / HT) =============================
mer(id="cuore", nome="Cuore", sigla="C", siglaInt="HT", elemento="Fuoco",
    natura="Yin", coppia="Intestino Tenue", orario="11:00 – 13:00",
    colore="#e0453c", bilaterale=True,
    coordinate=["cuore-sottoscapolare"],
    descrizione="Dal cavo ascellare scende sulla faccia interna (ulnare) del braccio fino all'angolo ungueale del mignolo.",
    nodi=[
      N(0.47,1.88,0.02,"C1","Jiquan","inizio del meridiano","centro del cavo ascellare, sull'arteria"),
      N(0.52,1.62,0.05),
      N(0.575,1.36,0.09,"C3","Shaohai","He-mare","estremità interna della piega del gomito, a gomito flesso"),
      N(0.61,1.10,0.07),
      N(0.63,0.98,0.07,"C5","Tongli","Luo di passaggio","1 cun sopra la piega del polso, lato ulnare"),
      N(0.655,0.86,0.07,"C7","Shenmen","Yuan sorgente · dispersione","piega del polso, lato ulnare, nella depressione del pisiforme"),
      N(0.67,0.77,0.07),
      N(0.685,0.66,0.07,"C9","Shaochong","Jing-pozzo · tonificazione","angolo ungueale del mignolo, lato radiale (verso l'anulare)"),
    ])

# ======================= 6. INTESTINO TENUE (IT / SI) =======================
mer(id="intestino-tenue", nome="Intestino Tenue", sigla="IT", siglaInt="SI",
    elemento="Fuoco", natura="Yang", coppia="Cuore", orario="13:00 – 15:00",
    colore="#f07a72", bilaterale=True,
    coordinate=["intestino-tenue-quadricipite"],
    descrizione="Dal mignolo risale il bordo ulnare dell'avambraccio, il retro della spalla e la scapola, poi il collo fino davanti all'orecchio.",
    nodi=[
      N(0.665,0.65,0.01,"IT1","Shaoze","Jing-pozzo","angolo ungueale del mignolo, lato ulnare (esterno)"),
      N(0.665,0.76,-0.04,"IT3","Houxi","punto chiave del Vaso Governatore","bordo ulnare della mano, a pugno chiuso, alla fine della piega"),
      N(0.655,0.85,-0.05,"IT4","Wangu","Yuan sorgente","bordo ulnare della mano, tra 5° metacarpo e ossa carpali"),
      N(0.655,1.06,-0.08),
      N(0.62,1.33,-0.09,"IT8","Xiaohai","He-mare · dispersione","tra olecrano ed epicondilo interno (nervo ulnare)"),
      N(0.58,1.64,-0.08),
      N(0.50,1.98,-0.14),
      N(0.30,1.92,BS(0.30,1.92),"IT11","Tianzong","","centro della fossa sottospinata della scapola"),
      N(0.22,2.16,BS(0.22,2.16)),
      N(0.14,2.34,-0.11),
      N(0.20,2.47,0.05),
      N(0.26,2.575,0.11,"IT19","Tinggong","fine del meridiano","davanti al trago dell'orecchio, a bocca aperta"),
    ])

# ============================ 7. VESCICA (V / BL) ============================
mer(id="vescica", nome="Vescica", sigla="V", siglaInt="BL", elemento="Acqua",
    natura="Yang", coppia="Rene", orario="15:00 – 17:00",
    colore="#2f7fd4", bilaterale=True,
    coordinate=["vescica-tibiale-anteriore"],
    descrizione="Il meridiano più lungo: dall'angolo interno dell'occhio passa sul cranio, scende lungo tutta la schiena (punti Shu del dorso), il retro della coscia e del polpaccio, fino al 5° dito del piede.",
    nodi=[
      N(0.05,2.61,0.25,"V1","Jingming","inizio del meridiano","angolo interno dell'occhio, 0,1 cun sopra il canto"),
      N(0.10,2.68,0.23),
      N(0.10,2.82,0.16),
      N(0.09,2.90,0.03),
      N(0.09,2.78,-0.16),
      N(0.09,2.46,-0.17,"V10","Tianzhu","finestra del cielo","alla nuca, sul bordo esterno del trapezio, sotto l'occipite"),
      N(0.10,2.28,BS(0.10,2.28)),
      N(0.10,2.06,BS(0.10,2.06),"V13","Feishu","Shu del dorso · Polmone","1,5 cun a lato di D3 (3ª vertebra dorsale)"),
      N(0.10,1.93,BS(0.10,1.93),"V15","Xinshu","Shu del dorso · Cuore","1,5 cun a lato di D5"),
      N(0.10,1.70,BS(0.10,1.70),"V18","Ganshu","Shu del dorso · Fegato","1,5 cun a lato di D9"),
      N(0.10,1.53,BS(0.10,1.53),"V20","Pishu","Shu del dorso · Milza","1,5 cun a lato di D11"),
      N(0.10,1.37,BS(0.10,1.37),"V23","Shenshu","Shu del dorso · Rene","1,5 cun a lato di L2, all'altezza dell'ultima costa"),
      N(0.10,1.10,BS(0.10,1.10)),
      N(0.09,0.90,BS(0.09,0.90)),
      N(0.16,0.58,-0.22),
      N(0.20,0.18,-0.17),
      N(0.21,-0.30,-0.15,"V40","Weizhong","He-mare · punto maestro della schiena","centro della piega poplitea (dietro il ginocchio)"),
      N(0.22,-0.72,-0.13,"V57","Chengshan","","sotto il ventre dei gemelli, a metà del polpaccio"),
      N(0.30,-1.19,-0.06,"V60","Kunlun","","depressione tra malleolo esterno e tendine d'Achille"),
      N(0.30,-1.27,0.05),
      N(0.29,-1.29,0.22,"V67","Zhiyin","Jing-pozzo · tonificazione","angolo ungueale del 5° dito del piede, lato esterno"),
    ])

# ============================== 8. RENE (R / KI) ==============================
mer(id="rene", nome="Rene", sigla="R", siglaInt="KI", elemento="Acqua",
    natura="Yin", coppia="Vescica", orario="17:00 – 19:00",
    colore="#1c4f9c", bilaterale=True,
    coordinate=["rene-psoas"],
    descrizione="Nasce sotto la pianta del piede, gira attorno al malleolo interno, risale la faccia interna della gamba e l'addome vicino alla linea mediana fino alla clavicola.",
    nodi=[
      N(0.20,-1.31,0.06,"R1","Yongquan","Jing-pozzo","pianta del piede, depressione al 1/3 anteriore, a piede flesso"),
      N(0.14,-1.27,-0.02),
      N(0.13,-1.18,-0.05,"R3","Taixi","Yuan sorgente","tra malleolo interno e tendine d'Achille"),
      N(0.12,-1.24,0.00,"R6","Zhaohai","punto chiave di Yin Qiao Mai","1 cun sotto il malleolo interno"),
      N(0.13,-1.05,-0.06,"R7","Fuliu","tonificazione","2 cun sopra R3, sul bordo anteriore del tendine d'Achille"),
      N(0.14,-0.32,-0.10,"R10","Yingu","He-mare","estremità interna della piega poplitea, tra i tendini"),
      N(0.14,0.10,-0.06),
      N(0.07,0.82,0.20),
      N(0.08,1.28,FS(0.08,1.28),"R16","Huangshu","","0,5 cun a lato dell'ombelico"),
      N(0.08,1.56,FS(0.08,1.56)),
      N(0.09,1.86,FS(0.09,1.86)),
      N(0.10,2.10,FS(0.10,2.10),"R27","Shufu","fine del meridiano","sotto la clavicola, 2 cun dalla linea mediana"),
    ])

# ================== 9. MAESTRO DEL CUORE / PERICARDIO (MC/PC) ==================
mer(id="maestro-cuore", nome="Maestro del Cuore (Pericardio)", sigla="MC", siglaInt="PC",
    elemento="Fuoco", natura="Yin", coppia="Triplice Riscaldatore", orario="19:00 – 21:00",
    colore="#e0559b", bilaterale=True,
    coordinate=["maestro-cuore-medio-gluteo"],
    descrizione="Dal torace, a lato del capezzolo, scende al centro della faccia anteriore del braccio e dell'avambraccio fino alla punta del dito medio.",
    nodi=[
      N(0.33,1.80,FS(0.33,1.80),"MC1","Tianchi","inizio del meridiano","1 cun a lato del capezzolo, 4° spazio intercostale"),
      N(0.46,1.86,0.11),
      N(0.55,1.60,0.11),
      N(0.65,1.36,0.13,"MC3","Quze","He-mare","piega del gomito, lato interno del tendine del bicipite"),
      N(0.695,1.10,0.12),
      N(0.705,0.95,0.11,"MC6","Neiguan","Luo di passaggio · punto chiave di Yin Wei Mai","2 cun sopra la piega del polso, tra i due tendini"),
      N(0.715,0.86,0.10,"MC7","Daling","Yuan sorgente · dispersione","centro della piega del polso, tra i due tendini"),
      N(0.73,0.76,0.10,"MC8","Laogong","","centro del palmo, dove poggia la punta del dito medio a pugno chiuso"),
      N(0.74,0.645,0.10,"MC9","Zhongchong","Jing-pozzo · tonificazione","punta del dito medio"),
    ])

# ==================== 10. TRIPLICE RISCALDATORE (TR / TE) ====================
mer(id="triplice-riscaldatore", nome="Triplice Riscaldatore", sigla="TR", siglaInt="TE",
    elemento="Fuoco", natura="Yang", coppia="Maestro del Cuore", orario="21:00 – 23:00",
    colore="#f2803c", bilaterale=True,
    coordinate=["tr-tiroide-piccolo-rotondo","tr-surrenali-sartorio"],
    descrizione="Dall'anulare risale il dorso della mano e il centro della faccia posteriore del braccio, la spalla, il collo e gira attorno all'orecchio fino al sopracciglio.",
    nodi=[
      N(0.705,0.655,-0.02,"TR1","Guanchong","Jing-pozzo","angolo ungueale dell'anulare, lato ulnare"),
      N(0.72,0.78,-0.06),
      N(0.72,0.86,-0.07,"TR4","Yangchi","Yuan sorgente","centro della piega dorsale del polso"),
      N(0.72,0.98,-0.09,"TR5","Waiguan","Luo · punto chiave di Yang Wei Mai","2 cun sopra TR4, tra radio e ulna, faccia dorsale"),
      N(0.70,1.20,-0.10),
      N(0.665,1.42,-0.10,"TR10","Tianjing","He-mare · dispersione","1 cun sopra l'olecrano, a gomito flesso"),
      N(0.63,1.68,-0.09),
      N(0.55,2.06,-0.06,"TR14","Jianliao","","depressione postero-esterna dell'acromion, a braccio abdotto"),
      N(0.30,2.26,-0.07),
      N(0.27,2.52,-0.06,"TR17","Yifeng","","depressione dietro il lobo dell'orecchio"),
      N(0.28,2.65,0.05,"TR21","Ermen","","davanti all'incisura superiore dell'orecchio, a bocca aperta"),
      N(0.17,2.68,0.19,"TR23","Sizhukong","fine del meridiano","estremità esterna del sopracciglio"),
    ])

# ====================== 11. VESCICA BILIARE (VB / GB) ======================
mer(id="vescica-biliare", nome="Vescica Biliare", sigla="VB", siglaInt="GB",
    elemento="Legno", natura="Yang", coppia="Fegato", orario="23:00 – 01:00",
    colore="#3fa14a", bilaterale=True,
    coordinate=["vescica-biliare-deltoide-anteriore"],
    descrizione="Dall'angolo esterno dell'occhio percorre a zig-zag il lato del cranio, scende sul fianco del tronco, sull'anca e sulla faccia esterna della gamba fino al 4° dito del piede.",
    nodi=[
      N(0.14,2.62,0.22,"VB1","Tongziliao","inizio del meridiano","0,5 cun all'esterno dell'angolo esterno dell'occhio"),
      N(0.26,2.58,0.10),
      N(0.27,2.78,0.02),
      N(0.22,2.72,-0.12),
      N(0.14,2.46,-0.19,"VB20","Fengchi","","sotto l'occipite, tra i due grandi muscoli della nuca"),
      N(0.38,2.14,-0.02,"VB21","Jianjing","","punto più alto della spalla, a metà tra C7 e l'acromion"),
      N(0.46,1.84,-0.02),
      N(0.31,1.58,FS(0.31,1.58),"VB24","Riyue","Mu della Vescica Biliare","7° spazio intercostale, sotto il capezzolo (cartilagine della 6ª costa)"),
      N(0.40,1.44,0.06,"VB25","Jingmen","Mu del Rene","estremità libera della 12ª costa, sul fianco"),
      N(0.40,1.16,0.03),
      N(0.36,0.62,-0.16,"VB30","Huantiao","","depressione del grande trocantere, sul gluteo"),
      N(0.33,0.10,-0.02),
      N(0.30,-0.42,0.04,"VB34","Yanglingquan","He-mare · punto maestro dei tendini","depressione davanti e sotto la testa del perone"),
      N(0.31,-0.80,0.03),
      N(0.29,-1.19,0.08,"VB40","Qiuxu","Yuan sorgente","davanti e sotto il malleolo esterno"),
      N(0.27,-1.25,0.17),
      N(0.26,-1.28,0.25,"VB44","Zuqiaoyin","Jing-pozzo","angolo ungueale del 4° dito del piede, lato esterno"),
    ])

# ============================= 12. FEGATO (F / LR) =============================
mer(id="fegato", nome="Fegato", sigla="F", siglaInt="LR", elemento="Legno",
    natura="Yin", coppia="Vescica Biliare", orario="01:00 – 03:00",
    colore="#1f7a34", bilaterale=True,
    coordinate=["fegato-romboide"],
    descrizione="Dall'alluce (lato esterno) risale il dorso del piede, la faccia interna della gamba e della coscia, l'inguine, e termina sul torace sotto il capezzolo.",
    nodi=[
      N(0.17,-1.29,0.26,"F1","Dadun","Jing-pozzo","angolo ungueale dell'alluce, lato esterno"),
      N(0.17,-1.26,0.22,"F2","Xingjian","dispersione","tra 1° e 2° dito, sulla piega interdigitale"),
      N(0.17,-1.235,0.16,"F3","Taichong","Yuan sorgente","dorso del piede, nella depressione tra 1° e 2° metatarso"),
      N(0.16,-1.16,0.09),
      N(0.16,-0.80,0.06),
      N(0.15,-0.34,0.02,"F8","Ququan","He-mare · tonificazione","estremità interna della piega del ginocchio flesso"),
      N(0.18,0.10,0.11),
      N(0.22,0.80,0.20),
      N(0.38,1.50,0.10,"F13","Zhangmen","Mu della Milza","estremità libera della 11ª costa, sul fianco"),
      N(0.27,1.66,FS(0.27,1.66),"F14","Qimen","Mu del Fegato","6° spazio intercostale, sulla linea del capezzolo"),
    ])

# ======================= 13. VASO CONCEZIONE (VC / CV) =======================
mer(id="vaso-concezione", nome="Vaso Concezione", sigla="VC", siglaInt="CV",
    elemento="—", natura="Yin (mare dei meridiani Yin)", coppia="Vaso Governatore",
    orario="—", colore="#20b6cc", bilaterale=False,
    coordinate=["vc-sovraspinato"],
    descrizione="Vaso straordinario mediano anteriore: dal perineo risale al centro dell'addome e del torace fino al mento. Raccoglie molti punti Mu (allarme).",
    nodi=[
      N(0.0,0.70,0.05,"VC1","Huiyin","inizio del meridiano","centro del perineo"),
      N(0.0,0.86,FS(0.0,0.86)),
      N(0.0,0.94,FS(0.0,0.94),"VC3","Zhongji","Mu della Vescica","4 cun sotto l'ombelico, 1 cun sopra il pube"),
      N(0.0,1.04,FS(0.0,1.04),"VC4","Guanyuan","Mu dell'Intestino Tenue","3 cun sotto l'ombelico"),
      N(0.0,1.15,FS(0.0,1.15),"VC6","Qihai","mare del Qi","1,5 cun sotto l'ombelico"),
      N(0.0,1.28,FS(0.0,1.28),"VC8","Shenque","","centro dell'ombelico (non si punge)"),
      N(0.0,1.44,FS(0.0,1.44),"VC12","Zhongwan","Mu dello Stomaco","a metà tra ombelico e apice dello sterno (4 cun sopra l'ombelico)"),
      N(0.0,1.58,FS(0.0,1.58),"VC14","Juque","Mu del Cuore","6 cun sopra l'ombelico, sotto l'apice dello sterno"),
      N(0.0,1.70,FS(0.0,1.70),"VC17","Shanzhong","Mu del Maestro del Cuore · mare del Qi","centro dello sterno, a livello del 4° spazio intercostale"),
      N(0.0,1.95,FS(0.0,1.95)),
      N(0.0,2.14,FS(0.0,2.14),"VC22","Tiantu","","centro dell'incisura giugulare (fossetta del collo)"),
      N(0.0,2.30,0.15),
      N(0.0,2.44,0.245,"VC24","Chengjiang","fine del meridiano","nella fossetta sotto il labbro inferiore"),
    ])

# ====================== 14. VASO GOVERNATORE (VG / GV) ======================
mer(id="vaso-governatore", nome="Vaso Governatore", sigla="VG", siglaInt="GV",
    elemento="—", natura="Yang (mare dei meridiani Yang)", coppia="Vaso Concezione",
    orario="—", colore="#8e4ec6", bilaterale=False,
    coordinate=["vg-grande-rotondo"],
    descrizione="Vaso straordinario mediano posteriore: dal coccige risale lungo la colonna vertebrale, la nuca e il cranio fino al labbro superiore.",
    nodi=[
      N(0.0,0.74,-0.17,"VG1","Changqiang","Luo · inizio del meridiano","tra la punta del coccige e l'ano"),
      N(0.0,0.92,BS(0.0,0.92)),
      N(0.0,1.12,BS(0.0,1.12),"VG3","Yaoyangguan","","sotto l'apofisi di L4, a livello delle creste iliache"),
      N(0.0,1.37,BS(0.0,1.37),"VG4","Mingmen","porta della vita","sotto l'apofisi di L2, di fronte all'ombelico"),
      N(0.0,1.58,BS(0.0,1.58)),
      N(0.0,1.82,BS(0.0,1.82)),
      N(0.0,2.06,BS(0.0,2.06)),
      N(0.0,2.28,BS(0.0,2.28),"VG14","Dazhui","riunione dei meridiani Yang","sotto l'apofisi di C7 (la vertebra più sporgente del collo)"),
      N(0.0,2.50,-0.19,"VG16","Fengfu","","1 cun sopra l'attaccatura dei capelli, sotto l'occipite"),
      N(0.0,2.74,-0.14),
      N(0.0,2.93,0.00,"VG20","Baihui","riunione dei 100 incontri","sulla sommità del capo, a metà tra gli apici delle orecchie"),
      N(0.0,2.82,0.17),
      N(0.0,2.54,0.32),
      N(0.0,2.475,0.275,"VG26","Renzhong","punto di rianimazione","al terzo superiore del solco naso-labiale (filtro)"),
      N(0.0,2.44,0.26,"VG28","Yinjiao","fine del meridiano","frenulo del labbro superiore"),
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

def build():
    out = {
        "titolo": "Meridiani MTC",
        "descrizione": ("Tracciati e punti principali dei 12 meridiani principali + Vaso Concezione e "
                        "Vaso Governatore, mappati sul manichino. Convenzione: x<0 = lato DESTRO del "
                        "soggetto, x>0 = lato SINISTRO; i meridiani bilaterali sono definiti sul lato "
                        "sinistro e specchiati dall'app. Posizioni indicative a scopo di consultazione."),
        "alias": ALIASES,
        "meridiani": M,
    }
    n_pt = sum(1 for m in M for n in m["nodi"] if n.get("sigla"))
    n_nd = sum(len(m["nodi"]) for m in M)
    return out, n_pt, n_nd

def main():
    root = sys.argv[1] if len(sys.argv) > 1 else "."
    out, n_pt, n_nd = build()
    jpath = os.path.join(root, "tools", "meridiani.json")
    with open(jpath, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    jspath = os.path.join(root, "assets", "js", "meridiani_data.js")
    with open(jspath, "w", encoding="utf-8") as f:
        f.write("/* meridiani_data.js — dati dei meridiani MTC (tracciati + punti principali).\n")
        f.write("   Generato da tools/generate_meridiani.py. NON editare a mano. */\n")
        f.write("window.MERIDIANI = ")
        json.dump(out, f, ensure_ascii=False, indent=2)
        f.write(";\n")
    print("meridiani: %d  ·  nodi: %d  ·  punti nominati: %d" % (len(M), n_nd, n_pt))
    print("scritti: %s , %s" % (jpath, jspath))

if __name__ == "__main__":
    main()
