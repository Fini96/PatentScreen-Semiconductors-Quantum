"""Build the dashboard's JSON data files from the BigQuery exports.

Usage: python3 build_data.py <dashboard_export.csv> <loc_export.csv> <map_export.csv> <out_dir>

Inputs
  dashboard_export.csv  one row per application (patent_study.dashboard_export)
  loc_export.csv        location research per raw applicant name (patent_study.loc_export):
                        Wikidata headquarters, USPTO PatentsView address re-geocoded with Overture Maps
  map_export.csv        map layers from Overture Maps (patent_study.map_export)
  orgs.json             Wikidata-verified groups: type, founding year (same folder)
  web_locations.json    manually researched locations with sources (same folder)

Nothing here estimates or fills in values: every number in the output is a count over the export
rows, and every coordinate comes from a named source. Applicants without a town-level source keep
no coordinates and are reported as "Location unverified".
"""
import csv, json, math, re, sys, collections, os, hashlib

csv.field_size_limit(10**8)
HERE = os.path.dirname(os.path.abspath(__file__))

# ---------------------------------------------------------------- taxonomy (from the study, table patent_study.rules)
CATS = [
 ("T01","Transistors","GAA / nanosheet / nanowire FET"),("T02","Transistors","CFET (stacked complementary FET)"),
 ("T03","Transistors","FinFET"),("T04","Transistors","HEMT (GaN / III-V)"),
 ("T05","Transistors","Power MOSFET (trench, VDMOS, LDMOS, superjunction)"),("T06","Transistors","IGBT"),
 ("T07","Transistors","Power and Schottky diodes"),("T08","Transistors","Thin-film transistors (display, oxide TFT)"),
 ("T09","Transistors","Ferroelectric FET (FeFET)"),("T10","Transistors","Bipolar transistors / HBT"),
 ("T11","Transistors","2D-material and carbon-nanotube FETs"),("T12","Transistors","ESD and protection structures"),
 ("T13","Transistors","Integrated passives (capacitors, resistors, inductors)"),("T14","Transistors","SOI / engineered substrates"),
 ("T15","Transistors","CMOS / logic device integration (general)"),
 ("X01","Materials","Silicon carbide (SiC)"),("X02","Materials","Gallium nitride / III-nitrides"),
 ("X03","Materials","Gallium oxide (Ga2O3)"),("X04","Materials","Diamond"),("X05","Materials","2D materials (graphene, TMDs)"),
 ("X06","Materials","Oxide semiconductors (IGZO etc.)"),("X07","Materials","SiGe / Ge"),
 ("M01","Memory","3D NAND / flash"),("M02","Memory","DRAM"),("M03","Memory","SRAM"),("M04","Memory","MRAM"),
 ("M05","Memory","ReRAM / phase-change memory"),("M06","Memory","FeRAM"),("M07","Memory","Memory assemblies (HBM, memory–logic stacks)"),
 ("I01","Integration","Hybrid / direct bonding"),("I02","Integration","3D chip stacking and TSV"),
 ("I03","Integration","2.5D, chiplets, interposers and RDL"),("I04","Integration","Fan-out and wafer/panel-level packaging"),
 ("I05","Integration","Glass and ceramic package substrates"),("I06","Integration","Backside power delivery"),
 ("I07","Integration","BEOL / on-chip interconnects"),("I08","Integration","Monolithic 3D integration"),
 ("I09","Integration","Power module and discrete packaging"),("I10","Integration","Thermal management"),
 ("I11","Integration","Encapsulation and device protection"),("I12","Integration","RF / impedance matching in packages"),
 ("D01","Design","IC layout and physical design (EDA)"),("D02","Design","Standard-cell / device layout and routing"),
 ("Q01","Quantum","Superconducting qubits / Josephson devices"),("Q02","Quantum","Semiconductor spin qubits / quantum dots"),
 ("Q03","Quantum","Trapped-ion qubits"),("Q04","Quantum","Neutral-atom qubits"),("Q05","Quantum","Photonic quantum computing"),
 ("Q06","Quantum","Topological / Majorana qubits"),("Q07","Quantum","Quantum processor architecture and qubit control"),
 ("Q08","Quantum","Quantum error correction"),("Q09","Quantum","Quantum algorithms and software"),
 ("P01","Processes","Wafer handling and fab equipment"),("P02","Processes","Deposition and layer formation (incl. epitaxy)"),
 ("P03","Processes","Etching"),("P04","Processes","Lithography and masks"),("P05","Processes","In-line testing and metrology"),
 ("P06","Processes","CMP, grinding, cutting and dicing"),("P07","Processes","Doping (implantation, diffusion, irradiation)"),
 ("P08","Processes","Wafer cleaning"),("P09","Processes","Wafer preparation and other processes"),
]
TEXT_ONLY = {"T02","I04","Q03","Q04","Q05","Q06","X03"}
DOMAINS = [("dT","Transistors & devices"),("dM","Memory"),("dI","Chip integration & packaging"),
           ("dD","Chip design & layout"),("dQ","Quantum"),("dP","Fabrication processes & equipment")]

# ---------------------------------------------------------------- countries
EPO = set("AL AT BE BG CH CY CZ DE DK EE ES FI FR GB GR HR HU IE IS IT LI LT LU LV MC ME MK MT NL NO PL PT RO RS SE SI SK SM TR".split())
EU27 = set("AT BE BG CY CZ DE DK EE ES FI FR GR HR HU IE IT LT LU LV MT NL PL PT RO SE SI SK".split())
OTHER_EUROPE = set("UA BY MD BA XK RU AD VA GE AM AZ".split())
NORTH_AMERICA = set("US CA MX".split())
EAST_ASIA = set("CN JP KR TW HK MO MN KP".split())
NAMES = dict(x.split(":") for x in """AD:Andorra|AE:United Arab Emirates|AF:Afghanistan|AG:Antigua and Barbuda|AL:Albania|AM:Armenia|AO:Angola|AQ:Antarctica|AR:Argentina|AT:Austria|AU:Australia|AZ:Azerbaijan|BA:Bosnia and Herzegovina|BB:Barbados|BD:Bangladesh|BE:Belgium|BF:Burkina Faso|BG:Bulgaria|BH:Bahrain|BI:Burundi|BJ:Benin|BN:Brunei|BO:Bolivia|BR:Brazil|BS:Bahamas|BT:Bhutan|BW:Botswana|BY:Belarus|BZ:Belize|CA:Canada|CD:DR Congo|CF:Central African Republic|CG:Congo|CH:Switzerland|CI:Côte d'Ivoire|CL:Chile|CM:Cameroon|CN:China|CO:Colombia|CR:Costa Rica|CU:Cuba|CV:Cabo Verde|CY:Cyprus|CZ:Czechia|DE:Germany|DJ:Djibouti|DK:Denmark|DM:Dominica|DO:Dominican Republic|DZ:Algeria|EC:Ecuador|EE:Estonia|EG:Egypt|ER:Eritrea|ES:Spain|ET:Ethiopia|FI:Finland|FJ:Fiji|FM:Micronesia|FR:France|GA:Gabon|GB:United Kingdom|GD:Grenada|GE:Georgia|GH:Ghana|GM:Gambia|GN:Guinea|GQ:Equatorial Guinea|GR:Greece|GT:Guatemala|GW:Guinea-Bissau|GY:Guyana|HK:Hong Kong|HN:Honduras|HR:Croatia|HT:Haiti|HU:Hungary|ID:Indonesia|IE:Ireland|IL:Israel|IM:Isle of Man|IN:India|IQ:Iraq|IR:Iran|IS:Iceland|IT:Italy|JM:Jamaica|JO:Jordan|JP:Japan|KE:Kenya|KG:Kyrgyzstan|KH:Cambodia|KI:Kiribati|KM:Comoros|KN:Saint Kitts and Nevis|KP:North Korea|KR:South Korea|KW:Kuwait|KZ:Kazakhstan|LA:Laos|LB:Lebanon|LC:Saint Lucia|LI:Liechtenstein|LK:Sri Lanka|LR:Liberia|LS:Lesotho|LT:Lithuania|LU:Luxembourg|LV:Latvia|LY:Libya|MA:Morocco|MC:Monaco|MD:Moldova|ME:Montenegro|MG:Madagascar|MK:North Macedonia|ML:Mali|MM:Myanmar|MN:Mongolia|MO:Macao|MR:Mauritania|MT:Malta|MU:Mauritius|MW:Malawi|MX:Mexico|MY:Malaysia|MZ:Mozambique|NA:Namibia|NE:Niger|NG:Nigeria|NI:Nicaragua|NL:Netherlands|NO:Norway|NP:Nepal|NZ:New Zealand|OM:Oman|PA:Panama|PE:Peru|PG:Papua New Guinea|PH:Philippines|PK:Pakistan|PL:Poland|PT:Portugal|PW:Palau|PY:Paraguay|QA:Qatar|RO:Romania|RS:Serbia|RU:Russia|RW:Rwanda|SA:Saudi Arabia|SB:Solomon Islands|SC:Seychelles|SD:Sudan|SE:Sweden|SG:Singapore|SI:Slovenia|SK:Slovakia|SL:Sierra Leone|SM:San Marino|SN:Senegal|SO:Somalia|SR:Suriname|SS:South Sudan|ST:São Tomé and Príncipe|SV:El Salvador|SY:Syria|SZ:Eswatini|TD:Chad|TG:Togo|TH:Thailand|TJ:Tajikistan|TL:Timor-Leste|TM:Turkmenistan|TN:Tunisia|TO:Tonga|TR:Türkiye|TT:Trinidad and Tobago|TW:Taiwan|TZ:Tanzania|UA:Ukraine|UG:Uganda|US:United States|UY:Uruguay|UZ:Uzbekistan|VC:Saint Vincent and the Grenadines|VE:Venezuela|VN:Vietnam|VU:Vanuatu|WS:Samoa|XK:Kosovo|YE:Yemen|ZA:South Africa|ZM:Zambia|ZW:Zimbabwe""".split("|"))

def region(c):
    if c in EPO or c in OTHER_EUROPE: return "Europe"
    if c in NORTH_AMERICA: return "North America"
    if c in EAST_ASIA: return "East Asia"
    if not c: return "Unknown"
    return "Other regions"

# ---------------------------------------------------------------- applicant typing
CORP = re.compile(r"\b(CO|LTD|LID|INC|CORP|CORPORATION|GMBH|AG|SA|SAS|SARL|BV|B V|NV|N V|LLC|LP|KK|GK|OY|OYJ|AB|AS|ASA|SE|PLC|SPA|S P A|SRL|S R L|S L|SL|PTE|LIMITED|COMPANY|KG|GES MBH|HOLDING|HOLDINGS|SRO|ZOO|SP Z O O|LTDA|KFT|BHD|PTY|SPOLKA AKCYJNA|S A|ANONIM SIRKETI)\b|BESCHRAENKTER HAFTUNG")
UNIV = re.compile(r"UNIV|UNIVERSIT|HOCHSCHULE|\bFH\b|\bECOLE\b|POLITECNICO|POLYTECHNIQUE|\bCOLLEGE\b|KATHOLIEKE|ADVANCED INST SCI|\bTU (DELFT|WIEN|DRESDEN|MUENCHEN)\b|TECHNISCHE UNIV|INST (OF )?TECHNOLOGY|INSTITUTE OF TECHNOLOGY|INST OF TECH|POSTECH|\bETH\b|\bEPFL\b|UENIVERSITESI|EGYETEM|UNIWERSYTET|POLITECHNIKA|YLIOPISTO")
RESEARCH = re.compile(r"\bINST\b|INSTITUT|ISTITUTO|COMMISSARIAT|CENTRE NAT|\bCNRS\b|FRAUNHOFER|FORSCHUNGSZENTRUM|FORSCHUNG|MAX PLANCK|HELMHOLTZ|CONSIGLIO|CONSEJO|\bACAD\b|AKADEMIE|ACADEMY|RIKEN|\bTNO\b|TUTKIMUSKESKUS|DEUTSCH ZENTR|BUNDESANSTALT|\bINRIA\b|\bIMEC\b|\bIHP\b|NATIONAL LAB|\bCENTRUM\b|\bRES (INST|CENT)|RESEARCH (INST|CENT|ORG)|RECH SCIENT|INVESTIG|PESQUISAS|AGENZIA NAZ|LABORATORY|\bRES & INNOVATION")

TYPE_LABEL = {"established": "Established company", "startup": "Startup", "company": "Company (founding year not checked)",
              "university": "University", "research": "Research institute", "individual": "Private inventor / individual applicant",
              "unknown": "Other / unknown"}

def classify(group, raws, is_inventor_any, orgs):
    if group in orgs:
        return orgs[group]["type"], "Wikidata (verified HQ and founding year)"
    if is_inventor_any:
        return "individual", "Applicant name matches an inventor named on the same application"
    up = " ".join(raws).upper()
    if UNIV.search(up): return "university", "Inferred from the name (university terms)"
    if RESEARCH.search(up): return "research", "Inferred from the name (research-institute terms)"
    if CORP.search(up): return "company", "Inferred from the legal form in the name; founding year not checked"
    return "unknown", "Not determinable from the patent data"

# ---------------------------------------------------------------- map layers (Overture Maps via BigQuery: patent_study.map_export)
def _pts(s):
    return [[int(a) / 1000, int(b) / 1000] for a, b in (p.split(",") for p in s.split())]

def _unwrap(ring):
    """Rings that cross the antimeridian come out of BigQuery with a 360° jump between two
    neighbouring vertices. Shift the western part by +360° so the ring stays continuous
    (MapLibre draws longitudes beyond 180° on the next world copy)."""
    if any(abs(b[0] - a[0]) > 180 for a, b in zip(ring, ring[1:])):
        return [[lo + 360 if lo < 0 else lo, la] for lo, la in ring]
    return ring

def _ring_area_centroid(ring):
    a = cx = cy = 0.0
    for (x0, y0), (x1, y1) in zip(ring, ring[1:] + ring[:1]):
        f = x0 * y1 - x1 * y0; a += f; cx += (x0 + x1) * f; cy += (y0 + y1) * f
    a /= 2
    if abs(a) < 1e-12: return 0.0, ring[0]
    return abs(a), [cx / (6 * a), cy / (6 * a)]

def _pip(pt, ring):
    x, y = pt; inside = False
    for (x0, y0), (x1, y1) in zip(ring, ring[1:] + ring[:1]):
        if (y0 > y) != (y1 > y) and x < (x1 - x0) * (y - y0) / (y1 - y0) + x0: inside = not inside
    return inside

# Microstates whose land polygon is below the 2 km² cut or merged in Overture: shown as points.
SMALL = {"MC": (43.738, 7.424), "VA": (41.903, 12.453), "SM": (43.942, 12.458), "LI": (47.141, 9.521),
         "GI": (36.140, -5.353), "MO": (22.199, 113.544), "HK": (22.320, 114.170), "SG": (1.352, 103.820),
         "BH": (26.067, 50.558), "MT": (35.917, 14.409), "AD": (42.546, 1.573), "LU": (49.815, 6.130)}

def build_map(path):
    countries, lines, cities, regnames = {}, [], [], {}
    with open(path, newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            L, iso = r["layer"], (r["iso"] or "").strip()
            if L == "country":
                if iso in ("AQ", ""): continue
                polys = []
                for poly in r["geo"].split("|"):
                    rings = [_unwrap(_pts(rs)) for rs in poly.split(";") if rs.strip()]
                    rings = [rg for rg in rings if len(rg) >= 4]
                    if rings: polys.append(rings)
                if polys: countries[iso] = {"name": r["name"], "polys": polys}
            elif L in ("b_country", "b_region"):
                for ln in r["geo"].split("|"):
                    p = _pts(ln)
                    if len(p) >= 2:
                        lines.append({"k": "country" if L == "b_country" else "region", "iso": iso,
                                      "disputed": r["disputed"].lower() == "true", "pts": _unwrap(p)})
            elif L == "city":
                lo, la = _pts(r["geo"])[0]
                cities.append([r["name"], iso, lo, la, int(r["npts"] or 0)])
            elif L == "regname":
                regnames[r["region"]] = r["name"]
    out = {}
    for iso, c in countries.items():
        best, bb = (0, None), [999, 999, -999, -999]
        for poly in c["polys"]:
            a, cen = _ring_area_centroid(poly[0])
            if a > best[0]: best = (a, cen)
            for lo, la in poly[0]:
                bb = [min(bb[0], lo), min(bb[1], la), max(bb[2], lo), max(bb[3], la)]
        # centroid of the largest part can fall outside a concave shape; fall back to its first vertex then
        lp = best[1]
        main = max(c["polys"], key=lambda p: _ring_area_centroid(p[0])[0])
        if not _pip(lp, main[0]):
            xs = sorted(main[0], key=lambda p: abs(p[1] - lp[1]))[:2]
            lp = [(xs[0][0] + xs[1][0]) / 2, (xs[0][1] + xs[1][1]) / 2] if len(xs) == 2 else main[0][0]
        out[iso] = {"name": NAMES.get(iso, c["name"]), "polys": c["polys"], "lp": [round(lp[0], 3), round(lp[1], 3)],
                    "bb": [round(v, 3) for v in bb], "area": best[0]}
    for iso, (la, lo) in SMALL.items():
        if iso not in out:
            out[iso] = {"name": NAMES.get(iso, iso), "polys": [], "lp": [lo, la], "bb": [lo - .1, la - .1, lo + .1, la + .1], "area": 0, "point": True}
    return out, lines, cities, regnames

def in_country(lon, lat, c, tol_deg=0.15):
    """True if the point lies in one of the country's polygons, or within ~15 km of its bbox edge
    for coastal sites that simplification shaved off."""
    if c.get("point"): return abs(lon - c["lp"][0]) < .5 and abs(lat - c["lp"][1]) < .5
    for poly in c["polys"]:
        if _pip([lon, lat], poly[0]) and not any(_pip([lon, lat], h) for h in poly[1:]): return True
        if lon < 0 and _pip([lon + 360, lat], poly[0]): return True
    near = False
    for poly in c["polys"]:
        for x, y in poly[0][::max(1, len(poly[0]) // 400)]:
            if abs(x - lon) < tol_deg and abs(y - lat) < tol_deg: near = True; break
        if near: break
    return near

def hav(lon1, lat1, lon2, lat2):
    p1, p2 = math.radians(lat1), math.radians(lat2)
    a = math.sin((p2 - p1) / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(math.radians(lon2 - lon1) / 2) ** 2
    return 6371 * 2 * math.asin(math.sqrt(a))

def norm(s): return " ".join((s or "").upper().split())

# ---------------------------------------------------------------- applicant locations
DATE_VERIFIED = "2026-11-05"
# Wikidata headquarters labels that name a building or site rather than a town: the town they are in
SITE_TOWN = {"Hôtel de Vendôme": "Paris", "BMW Headquarters": "Munich", "Main building of the TU Wien": "Vienna",
             "ETH Zurich main building": "Zurich", "Shiodome City Center": "Tokyo", "Hsinchu Science Park": "Hsinchu"}
DISTRICT = re.compile(r"(?i)( District|-ku| Ward)$")

def town_of(hq_label, region, pv_city=None, d_wd_pv=None):
    """City name for display: building/site labels are replaced by their town, city districts by their city
    (the entity's own USPTO address city when it lies within 25 km, otherwise the region)."""
    if hq_label in SITE_TOWN: return SITE_TOWN[hq_label], hq_label
    if hq_label and DISTRICT.search(hq_label) and pv_city and d_wd_pv is not None and d_wd_pv <= 25: return pv_city, hq_label
    if hq_label and DISTRICT.search(hq_label) and region: return region, hq_label
    return hq_label, None
INSTITUTION_KIND = {"university": "main campus", "research": "headquarters"}

def locate_entity(raw, row, web, city_states, regnames, gtype):
    """Return the location record for one raw applicant name. Never invents a place: a record has
    coordinates only when Wikidata, the USPTO address or a cited web source names the town."""
    base = {"country": "", "state_province": None, "city": None, "lat": None, "lon": None,
            "precision": "unknown", "location_kind": None, "source_url": None, "source_type": None,
            "confidence": None, "date_verified": DATE_VERIFIED, "note": ""}
    ctry = (row or {}).get("ctry") or ""
    base["country"] = ctry
    w = web.get(norm(raw))
    pick = (row or {}).get("pick") or ""
    if w and w.get("override"): pick = ""   # documented manual decision replaces the automatic pick
    if row and pick == "wd":
        exact = row["wd_kind"] == "wd_hq_exact"; own = row["wd_kind"] == "wd_own"
        lbl_ok = row["label_exact"].lower() == "true"
        d = float(row["d_wd_pv"]) if row["d_wd_pv"] else None
        strong = int(row["n_strong2"] or 0)
        conf = "high" if lbl_ok and (d is None or d <= 50) and strong <= 1 and not row["ov_note"] else "medium"
        q = f"Q{row['qid']}"
        town, detail = town_of(row["hq_label"], row["region_en"], row.get("pg_pvcity") or None, d)
        base.update(lat=float(row["lat"]), lon=float(row["lon"]),
                    city=town or row["near_city"], state_province=row["region_en"] or None,
                    precision="exact headquarters" if (exact or own) else "city",
                    location_kind=(INSTITUTION_KIND.get(gtype, "headquarters") if own else "headquarters"),
                    source_url=f"https://www.wikidata.org/wiki/{q}",
                    source_type=("Wikidata P159 headquarters with P625 coordinates" if exact else
                                 "Wikidata P625 coordinates of the organisation" if own else
                                 "Wikidata P159 headquarters (town centre coordinates)"),
                    confidence=conf,
                    note="; ".join(x for x in [(f"Headquarters: {detail}" if detail else ""), row["ov_note"],
                        (f"USPTO address {row['pg_pvcity']} is {d:.0f} km away" if d and d > 50 else "")] if x))
        if row["hq_ctry"] and row["hq_ctry"] != ctry and not ctry: base["country"] = row["hq_ctry"]
        return base, "wikidata"
    if w:
        lat, lon = w["lat"], w["lon"]
        if w.get("use_pv_coords") and row and row["pg_lat"]: lat, lon = float(row["pg_lat"]), float(row["pg_lon"])
        if lat is None: return base, None
        base.update(country=w["country"], lat=lat, lon=lon, city=w["city"],
                    state_province=regnames.get(w["region"]) if w.get("region") else None,
                    precision="city", location_kind=w["kind"], source_url=w["url"], source_type=w["stype"],
                    confidence=w["conf"], note=w["note"])
        return base, "web"
    if row and pick == "pv":
        share = int(row["pg_npat"] or 0) / max(1, int(row["pg_tot"] or 1))
        conf = "medium" if share >= .6 and int(row["pg_npat"] or 0) >= 3 else "low"
        wd = row["pg_wd"]
        base.update(lat=float(row["lat"]), lon=float(row["lon"]), city=row["pg_pvcity"] or row["pg_city"],
                    state_province=row["region_en"] or None, precision="city", location_kind="registered office",
                    source_url=(f"https://www.wikidata.org/wiki/{wd}" if wd else None),
                    source_type=f"USPTO PatentsView assignee address (assignee {row['pg_assignee']}; {row['pg_npat']} of {row['pg_tot']} US patents); town point from Overture Maps",
                    confidence=conf, note=row["ov_note"] or "")
        return base, "patentsview"
    if ctry in city_states:
        cs = city_states[ctry]
        base.update(lat=cs["lat"], lon=cs["lon"], city=cs["city"], precision="city", location_kind="registered office",
                    source_url=f"https://www.wikidata.org/wiki/{cs['town_wd']}", source_type="Applicant country in the patent data (city-state)",
                    confidence="medium", note=f"{cs['city']} is a city-state, so the country fixes the city.")
        return base, "city-state"
    if row and row["hq_region"].lower() == "true" and row["qid"] and row["hq_label"]:
        base.update(state_province=row["hq_label"], precision="region", location_kind="headquarters",
                    source_url=f"https://www.wikidata.org/wiki/Q{row['qid']}", source_type="Wikidata P159 headquarters (region only)",
                    confidence="medium", note="Location unverified at town level: the source names only the region.")
        return base, "region"
    if row and row["pg_prov"] and int(row["pg_npat"] or 0) >= 2:
        base.update(state_province=row["pg_pvcity"] or row["pg_prov"], precision="region", location_kind="registered office",
                    source_type=f"USPTO PatentsView assignee address (assignee {row['pg_assignee']}); names only the province",
                    confidence="medium", note="Location unverified at town level: the address names only the province.")
        return base, "region"
    if ctry:
        base.update(precision="country", note="Location unverified: no town-level source found.")
    return base, None

# ---------------------------------------------------------------- main
def main(export_csv, loc_csv, map_csv, out_dir):
    orgs = {o["group"]: o for o in json.load(open(os.path.join(HERE, "orgs.json")))["orgs"]}
    webj = json.load(open(os.path.join(HERE, "web_locations.json")))
    web = {norm(e["raw"]): e for e in webj["entries"]}
    world, lines, cities, regnames = build_map(map_csv)
    locrows = {}
    for r in csv.DictReader(open(loc_csv, newline="", encoding="utf-8")):
        locrows[norm(r["raw_name"])] = r

    rows = list(csv.DictReader(open(export_csv, newline="", encoding="utf-8")))
    assert len({r["application_number"] for r in rows}) == len(rows), "duplicate applications in export"

    cat_index = {c[0]: i for i, c in enumerate(CATS)}
    offices, cpcs, inv_ctry, fams = [], [], [], {}
    office_map, cpc_map, ic_map = {}, {}, {}
    def midx(m, lst, v):
        if v not in m: m[v] = len(lst); lst.append(v)
        return m[v]

    # applicants: key = group name as in the study (parent grouping); individuals = their own exact raw name.
    # entities: one per distinct raw applicant name (the legal entity on the filing) — the unit that gets a location.
    A = collections.OrderedDict()
    E = collections.OrderedDict()   # norm(raw) -> {raw, key, ctry Counter, n}
    apps = []
    min_d, max_d = 99999999, 0
    for r in rows:
        raws = r["applicants_raw"].split("|") if r["applicants_raw"] else []
        ctys = r["applicant_countries"].split("|") if r["applicant_countries"] else []
        grps = r["applicant_groups"].split("|") if r["applicant_groups"] else []
        isinv = r["applicant_is_inventor"].split("|") if r["applicant_is_inventor"] else []
        ids, ents = [], []
        for k, raw in enumerate(raws):
            g = grps[k] if k < len(grps) and grps[k] else raw
            inv = k < len(isinv) and isinv[k] == "1"
            key = ("IND:" + " ".join(raw.upper().split())) if inv else g
            a = A.setdefault(key, {"group": g, "raws": collections.Counter(), "ctry": collections.Counter(), "inv": False})
            a["raws"][raw] += 1
            c = ctys[k] if k < len(ctys) else ""
            if c: a["ctry"][c] += 1
            a["inv"] = a["inv"] or inv
            ids.append(key)
            ek = ("IND:" if inv else "") + norm(raw)
            e = E.setdefault(ek, {"raw": raw, "key": key, "ctry": collections.Counter(), "n": 0, "ind": inv})
            e["n"] += 1
            if c: e["ctry"][c] += 1
            ents.append(ek)
        ids = list(dict.fromkeys(ids)); ents = list(dict.fromkeys(ents))
        fpd = int(r["first_publication_date"])
        min_d, max_d = min(min_d, fpd), max(max_d, fpd)
        fi = fams.setdefault(r["family_id"], len(fams))
        cats = sorted(cat_index[c] for c in r["cats"].split("|") if c in cat_index) if r["cats"] else []
        cpc = [midx(cpc_map, cpcs, c) for c in r["cpc_main_groups"].split("|") if c] if r["cpc_main_groups"] else []
        inv = []
        if r["inventor_countries"]:
            for part in r["inventor_countries"].split("|"):
                cc, n = part.rsplit(":", 1)
                if cc and cc != "??": inv.append([midx(ic_map, inv_ctry, cc), int(n)])
        dom = sum(1 << i for i, (k, _) in enumerate(DOMAINS) if r[k].strip().lower() == "true")
        fy = int(r["filing_date"][:4]) if r["filing_date"] and r["filing_date"] != "0" else 0
        apps.append([r["publication_number"], midx(office_map, offices, r["office"]), r["kind_code"], fpd, fy, fi,
                     r["title"] or "", ids, cats, cpc, inv, dom, ents, r["family_id"],
                     1 if (r.get("route") or "direct") == "PCT" else 0])

    keys = list(A.keys()); kidx = {k: i for i, k in enumerate(keys)}
    ekeys = list(E.keys()); eidx = {k: i for i, k in enumerate(ekeys)}
    for a_ in apps:
        a_[7] = [kidx[k] for k in a_[7]]
        a_[12] = [eidx[k] for k in a_[12]]

    applicants = []
    for k in keys:
        a = A[k]
        raws = [n for n, _ in a["raws"].most_common()]
        t, basis = classify(a["group"], raws, a["inv"], orgs)
        o = orgs.get(a["group"]) if t != "individual" else None
        data_c = a["ctry"].most_common(1)[0][0] if a["ctry"] else ""
        rec = {"name": (o.get("display") if o else None) or (raws[0] if t == "individual" else a["group"]),
               "type": t, "typeBasis": basis, "raw": [[n, c] for n, c in a["raws"].most_common()],
               "dataCountry": data_c}
        # country attribution is unchanged from the first release (keeps every country total identical):
        # Wikidata-verified groups use their HQ country, all others the country in the patent data.
        if o:
            rec.update({"country": o["iso2"], "groupHq": o["hq"], "qid": o["qid"], "founded": o["founded"], "note": o.get("note", "")})
        else:
            rec.update({"country": data_c})
        applicants.append(rec)

    # ---------- entity locations -> applicant_locations.json
    city_states = webj["city_states"]
    locs, src_count = [], collections.Counter()
    for ek in ekeys:
        e = E[ek]; gi = kidx[e["key"]]; ap = applicants[gi]
        rid = "E" + hashlib.sha1(("IND:" if e["ind"] else "ORG:") .encode() + norm(e["raw"]).encode()).hexdigest()[:10]
        rec = {"applicant_id": rid, "original_name": e["raw"], "harmonised_name": ap["name"],
               "group_id": "G" + hashlib.sha1(norm(keys[gi]).encode()).hexdigest()[:10], "group_index": gi,
               "applicant_type": ap["type"], "applications": e["n"]}
        if ap["type"] == "individual":
            c = e["ctry"].most_common(1)[0][0] if e["ctry"] else ""
            rec.update({"country": c, "state_province": None, "city": None, "lat": None, "lon": None,
                        "precision": "country" if c else "unknown", "location_kind": None, "source_url": None,
                        "source_type": "Applicant country in the patent data" if c else None, "confidence": None,
                        "date_verified": DATE_VERIFIED,
                        "note": "Private individual: placed at country level only. No address is searched for or shown."})
            src_count["individual"] += 1
        else:
            row = locrows.get(norm(e["raw"]))
            l, src = locate_entity(e["raw"], row, web, city_states, regnames, ap["type"])
            if not l["country"]: l["country"] = e["ctry"].most_common(1)[0][0] if e["ctry"] else ""
            if l["precision"] == "unknown" and l["country"]:
                l.update(precision="country", note=l["note"] or "Location unverified: no town-level source found.")
            if l["lat"] is not None:
                l["lat"], l["lon"] = round(l["lat"], 5), round(l["lon"], 5)
            rec.update(l); src_count[src or ("country-only" if l["precision"] == "country" else l["precision"])] += 1
        locs.append(rec)

    # ---------- QC on coordinates: inside the right country, lat/lon order, no centroid placement
    qc_issues = []
    for rec in locs:
        if rec["lat"] is None: continue
        c = world.get(rec["country"])
        ok = in_country(rec["lon"], rec["lat"], c) if c else False
        swapped = (c and not ok and in_country(rec["lat"], rec["lon"], c))
        dcen = hav(rec["lon"], rec["lat"], *c["lp"]) if c else None
        rec["_qc"] = {"in_country": bool(ok), "swapped": bool(swapped), "km_from_country_label_point": round(dcen, 1) if dcen is not None else None}
        if not ok: qc_issues.append([rec["original_name"], rec["country"], rec["lat"], rec["lon"], "outside country polygon" + (" (lat/lon swapped)" if swapped else "")])

    # ---------- sites per applicant group (entities of a group at the same point form one site)
    for gi, ap in enumerate(applicants):
        ap["ents"] = []
    for i, rec in enumerate(locs): applicants[rec["group_index"]]["ents"].append(i)
    for ap in applicants:
        sites = {}
        for i in ap["ents"]:
            rec = locs[i]
            if rec["lat"] is None: continue
            k = (round(rec["lon"], 4), round(rec["lat"], 4))
            sites.setdefault(k, []).append(i)
        ap["sites"] = [{"lon": k[0], "lat": k[1], "e": v} for k, v in sorted(sites.items(), key=lambda kv: -sum(locs[i]["applications"] for i in kv[1]))]
        precs = [locs[i]["precision"] for i in ap["ents"]]
        ap["locStatus"] = ("located" if ap["sites"] else "region" if "region" in precs else "country" if ap["country"] else "none")

    countries = {iso: {"name": w["name"], "region": region(iso)} for iso, w in world.items()}
    for c in set([a["country"] for a in applicants if a["country"]] + offices + inv_ctry):
        if c not in countries and c != "EP":
            countries[c] = {"name": NAMES.get(c, c), "region": region(c), "noGeometry": True}
    for c in countries: countries[c]["epo"] = c in EPO; countries[c]["eu"] = c in EU27
    for iso, w in world.items(): countries[iso].update({"lp": w["lp"], "bb": w["bb"]})

    # ---------- QC summary
    inst = [r for r in locs if r["applicant_type"] != "individual"]
    def share(rs): return sum(r["applications"] for r in rs)
    prec_order = ["exact headquarters", "city", "region", "country", "unknown"]
    by_prec = {p: [r for r in inst if r["precision"] == p] for p in prec_order}
    links_total = share(inst)
    qc = {
        "date": DATE_VERIFIED,
        "institutional_entities": len(inst), "individual_entities": len(locs) - len(inst),
        "by_precision": {p: {"entities": len(v), "share_entities": round(len(v) / len(inst), 4),
                             "applicant_links": share(v), "share_links": round(share(v) / links_total, 4)} for p, v in by_prec.items()},
        "by_source": dict(src_count),
        "by_confidence": dict(collections.Counter(r["confidence"] or "none" for r in inst if r["lat"] is not None)),
        "outside_country": qc_issues,
        "near_country_label_point": [[r["original_name"], r["country"], r["city"], r["_qc"]["km_from_country_label_point"]]
                                     for r in inst if r.get("_qc") and r["_qc"]["km_from_country_label_point"] is not None and r["_qc"]["km_from_country_label_point"] < 15],
        "distinct_points": len({(r["lat"], r["lon"]) for r in inst if r["lat"] is not None}),
        "unverified": sorted([[r["original_name"], r["country"], r["applications"], r["precision"]] for r in inst if r["lat"] is None], key=lambda x: -x[2]),
    }
    spot = {}
    for c in ["US", "CN", "DE", "IN", "JP", "AT", "TW", "FR"]:
        rs = sorted([r for r in inst if r["country"] == c and r["lat"] is not None], key=lambda r: -r["applications"])[:8]
        spot[c] = [[r["original_name"], r["city"], r["state_province"], r["precision"], r["confidence"], r["source_type"].split(" (")[0]] for r in rs]
        spot[c + "_unverified"] = sum(1 for r in inst if r["country"] == c and r["lat"] is None)
    qc["spot_checks"] = spot
    # subsidiaries: groups whose entities sit at different places (none inherits the parent's point)
    multi = []
    for ap in applicants:
        if len(ap.get("sites", [])) > 1:
            multi.append([ap["name"], [[locs[s["e"][0]]["original_name"], locs[s["e"][0]]["city"], locs[s["e"][0]]["country"]] for s in ap["sites"]]])
    qc["groups_with_several_sites"] = multi

    meta = {
        "title": "European semiconductor patent filings",
        "source": "Google Patents Public Datasets (patents-public-data.patents.publications), BigQuery, queried 1–4 Nov 2026",
        "firstPubMin": min_d, "firstPubMax": max_d,
        "latestByOffice": {"EP": 20260916, "DE": 20260924, "GB": 20260916, "FR": 20260904},
        "nApps": len(apps), "nFamilies": len(fams), "nApplicants": len(applicants), "nEntities": len(locs),
        "cats": [{"id": c[0], "domain": c[1], "label": c[2], "textOnly": c[0] in TEXT_ONLY} for c in CATS],
        "domains": [{"key": k, "label": l} for k, l in DOMAINS],
        "offices": offices, "cpc": cpcs, "invCountries": inv_ctry,
        "types": TYPE_LABEL, "countries": countries,
        "borders": "Overture Maps division_area (country, land polygons) simplified at 0.9 km, and division_boundary shared border lines (country 0.9 km, regions 1.5 km), release 2026-10-21, via BigQuery public dataset bigquery-public-data.overture_maps",
        "orgSource": json.load(open(os.path.join(HERE, "orgs.json")))["_source"],
        "locQC": {k: qc[k] for k in ("date", "institutional_entities", "individual_entities", "by_precision", "by_source", "by_confidence", "distinct_points")} | {"outside_country": len(qc_issues), "near_label_point": len(qc["near_country_label_point"])},
    }
    os.makedirs(out_dir, exist_ok=True)
    def dump(name, obj, pretty=False):
        with open(os.path.join(out_dir, name), "w", encoding="utf-8") as f:
            json.dump(obj, f, ensure_ascii=False, indent=1 if pretty else None, separators=None if pretty else (",", ":"))
    for r in locs: r.pop("_qc", None)
    dump("meta.json", meta); dump("applicants.json", applicants); dump("apps.json", apps)
    dump("applicant_locations.json", {"about": "One record per applicant name as it appears on the filings (legal entity). Linked to applicants.json by group_index and to apps.json by position (apps row field 12). Coordinates are WGS84 decimal degrees; lat/lon given separately.", "date_verified": DATE_VERIFIED, "applicants": locs}, pretty=False)
    dump("location_qc.json", qc, pretty=True)
    # map geometry: GeoJSON for MapLibre, the same data projected client-side for the SVG fallback
    feats = [{"type": "Feature", "id": i, "properties": {"iso": iso, "name": w["name"]},
              "geometry": {"type": "MultiPolygon", "coordinates": w["polys"]}} for i, (iso, w) in enumerate(world.items()) if w["polys"]]
    dump("countries.geojson", {"type": "FeatureCollection", "features": feats})
    groups = collections.defaultdict(list)
    for l in lines: groups[(l["k"], l["disputed"])].append(l["pts"])
    lf = [{"type": "Feature", "properties": {"k": k, "d": dsp}, "geometry": {"type": "MultiLineString", "coordinates": v}} for (k, dsp), v in groups.items()]
    dump("borders.geojson", {"type": "FeatureCollection", "features": lf})
    dump("cities.json", sorted(cities, key=lambda c: -c[4]))

    # ---------- console report
    per = collections.Counter()
    for a_ in apps:
        for i in a_[7]: per[applicants[i]["name"]] += 1
    print(json.dumps({"apps": len(apps), "families": len(fams), "applicants": len(applicants), "entities": len(locs),
                      "types": collections.Counter(a["type"] for a in applicants),
                      "locStatus": collections.Counter(a["locStatus"] for a in applicants),
                      "precision": {p: len(v) for p, v in by_prec.items()}, "sources": src_count,
                      "outside_country": qc_issues[:20], "near_label": qc["near_country_label_point"][:20],
                      "top": per.most_common(8), "countries": len(world), "lines": len(lines), "cities": len(cities)}, indent=1, default=str, ensure_ascii=False))

if __name__ == "__main__":
    main(*sys.argv[1:5])
