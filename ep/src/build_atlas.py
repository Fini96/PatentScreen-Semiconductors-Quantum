"""Write the EP study in the data format of the shared Semiconductor Patent Atlas front end
(the same front end as the CNIPA & TIPO dashboard), so both dashboards render identically.

Usage: python3 build_atlas.py <ep_data_dir> <natural_earth_dir> <out_dir> [fam_jur.csv]

  ep_data_dir        output of build_data.py (meta.json, applicants.json, apps.json, applicant_locations.json)
  natural_earth_dir  folder with countries.geojson and basemap/ (Natural Earth 1:10m, shared with the CN/TW site)
                     plus dashboard.json of the CN/TW site (country label points, boxes and names are reused)
  fam_jur.csv        optional: family_id,bits (EP=1 US=2 JP=4 KR=8 WO=16 CN=32 TW=64) from patent_study.fam_jur

Patent counts, families, technology categories and applicant groups are taken unchanged from the EP study.
"""
import csv, json, math, os, sys, collections, shutil

DATE_VERIFIED = "2026-11-05 (PCT-route applicants added 2026-11-08)"
TYPE_IDX = {"established": 0, "company": 0, "startup": 1, "university": 2, "research": 3, "individual": 4, "unknown": 5}
TYPE_NAME = ["company", "startup", "university", "research institute", "private inventor", "other/unknown"]
PREC = {"exact headquarters": "E", "city": "C", "region": "R", "country": "K", "unknown": "U"}
PREC_WORD = {"E": "exact", "C": "city", "R": "region", "K": "country", "U": "unknown"}
# technology groups: the seven domains of the EP study taxonomy, in a fixed order
GROUPS = [("Transistors", "tran", "Transistors & device structures"), ("Materials", "mat", "Semiconductor materials"),
          ("Memory", "mem", "Memory devices"), ("Integration", "pkg", "Chip integration & packaging"),
          ("Design", "eda", "IC design / EDA"), ("Quantum", "qc", "Quantum technologies"),
          ("Processes", "proc", "Fabrication processes & equipment")]
# EP domain flags (apps row field 11, bit order dT dM dI dD dQ dP) -> group index, for filings flagged in a
# domain without a specific category; they get an "other ..." category so domain totals are preserved
DOMBIT_GROUP = {0: 0, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6}
OTHER_LABEL = {0: "Other transistor / device filings (no sub-category)", 2: "Other memory filings (no sub-category)",
               3: "Other integration & packaging filings (no sub-category)", 4: "Other design filings (no sub-category)",
               5: "Other quantum filings (no sub-category)", 6: "Other process filings (no sub-category)"}
CPCSUB = ["H10D", "H10B", "H10P", "H10W", "H10N", "G06N10", "G06F30", "B82Y"]
OFFICE_CHIPS = ["EP", "DE", "FR", "GB", "NL", "IT", "FI"]


def pip(pt, ring):
    x, y = pt; inside = False
    for (x0, y0), (x1, y1) in zip(ring, ring[1:] + ring[:1]):
        if (y0 > y) != (y1 > y) and x < (x1 - x0) * (y - y0) / (y1 - y0) + x0: inside = not inside
    return inside

def polys_of(geom):
    return [geom["coordinates"]] if geom["type"] == "Polygon" else geom["coordinates"] if geom["type"] == "MultiPolygon" else []

def in_poly(lon, lat, polys):
    for p in polys:
        if pip((lon, lat), p[0]) and not any(pip((lon, lat), h) for h in p[1:]): return True
    return False

def dist_km_to(lon, lat, polys):
    best = 1e9
    for p in polys:
        for x, y in p[0][::max(1, len(p[0]) // 3000)]:
            d = 111.2 * math.hypot((x - lon) * math.cos(math.radians(lat)), y - lat)
            if d < best: best = d
    return best


def main(ep_dir, ne_dir, out_dir, famjur_csv=None):
    J = lambda p: json.load(open(os.path.join(ep_dir, p), encoding="utf-8"))
    meta, AP, PA, LOCS = J("meta.json"), J("applicants.json"), J("apps.json"), J("applicant_locations.json")["applicants"]
    cn = json.load(open(os.path.join(ne_dir, "data", "dashboard.json"), encoding="utf-8"))
    ne = json.load(open(os.path.join(ne_dir, "data", "countries.geojson"), encoding="utf-8"))
    NEP = collections.defaultdict(list)
    for f in ne["features"]: NEP[f["properties"]["iso"]] += polys_of(f["geometry"])
    fam_bits = {}
    if famjur_csv and os.path.exists(famjur_csv):
        for r in csv.DictReader(open(famjur_csv, encoding="utf-8")): fam_bits[r["family_id"]] = int(r["bits"])

    # ---------- taxonomy
    cats = []; cat_map = {}
    gidx = {g[0]: i for i, g in enumerate(GROUPS)}
    for i, c in enumerate(meta["cats"]):
        cat_map[i] = len(cats); cats.append([c["id"], gidx[c["domain"]], c["label"], "", ""])
    other_cat = {}
    for g, lab in OTHER_LABEL.items():
        other_cat[g] = len(cats); cats.append(["O_" + GROUPS[g][1], g, lab, "", ""])

    # ---------- months
    def mkey(d): s = str(d); return s[:4] + "-" + s[4:6]
    months = sorted({mkey(a[3]) for a in PA}); midx = {m: i for i, m in enumerate(months)}
    offices = meta["offices"]

    # ---------- entity sites
    NA = len(AP)
    site_list = []   # [a, lat, lng, p, city, entity names, conf, url, stype, kind]
    ent_site = {}
    for a, ap in enumerate(AP):
        for s in ap.get("sites", []):
            sid = len(site_list)
            recs = [LOCS[e] for e in s["e"]]
            r0 = max(recs, key=lambda r: r["applications"])
            site_list.append({"a": a, "lat": s["lat"], "lng": s["lon"], "p": PREC[r0["precision"]], "city": r0["city"] or "",
                              "state": r0["state_province"] or "", "cc": r0["country"], "names": [r["original_name"] for r in recs],
                              "conf": r0["confidence"] or "", "url": r0["source_url"] or "", "stype": r0["source_type"] or "",
                              "kind": r0["location_kind"] or "", "note": r0["note"] or "", "n": sum(r["applications"] for r in recs)})
            for e in s["e"]: ent_site[e] = sid

    # ---------- docs.txt  (office, month, filing year, family, cats, jur bits, cpc bits, applicants, inventor countries, sites)
    fam_index = {}
    lines, n_jur = [], 0
    for di, a in enumerate(PA):
        cs = [cat_map[c] for c in a[8]]
        have_g = {cats[c][1] for c in cs}
        for bit, g in DOMBIT_GROUP.items():
            if a[11] & (1 << bit) and g not in have_g and g in other_cat: cs.append(other_cat[g])
        cpcbits = 0
        for ci in a[9]:
            code = meta["cpc"][ci]
            for k, s in enumerate(CPCSUB):
                if code.startswith(s): cpcbits |= 1 << k
        inv = [meta["invCountries"][ci] for ci, n in a[10]]
        sites = sorted({ent_site[e] for e in a[12] if e in ent_site})
        fam = a[5]
        fid = a[13] if len(a) > 13 else None
        jb = fam_bits.get(fid, 0) if fid else 0
        if jb: n_jur += 1
        route = a[14] if len(a) > 14 else 0
        lines.append(",".join([str(a[1]), str(midx[mkey(a[3])]), str(a[4] or 0), str(fam), ".".join(map(str, sorted(set(cs)))),
                               str(jb), str(cpcbits), ".".join(map(str, a[7])), ".".join(inv), ".".join(map(str, sites)), str(route)]))

    # ---------- applicants
    nameA, origA, typA, ccA, precA, nA, famA, cpcA = [], [], [], [], [], [], [], []
    apps_of = collections.defaultdict(list)
    for di, a in enumerate(PA):
        for x in a[7]: apps_of[x].append(di)
    loc = {k: [] for k in ["lat", "lng", "p", "city", "state", "site", "stype", "url", "conf", "evid", "date", "notes", "rkey"]}
    cty_from_loc = 0
    for a, ap in enumerate(AP):
        t = TYPE_IDX[ap["type"]]
        raws = [r[0] for r in ap["raw"]]
        nameA.append(ap["name"]); origA.append(raws[0] if raws and raws[0].lower() != ap["name"].lower() else "")
        typA.append(t)
        ds = apps_of[a]; nA.append(len(ds)); famA.append(len({PA[d][5] for d in ds}))
        cc = ap.get("country") or ""
        basis = "M" if ap.get("qid") else ("D" if cc else "U")
        sites = [s for s in site_list if s["a"] == a]
        if sites:
            s = max(sites, key=lambda s: s["n"])
            if not cc: cc = s["cc"]; basis = "L"; cty_from_loc += 1
            loc["lat"].append(round(s["lat"], 5)); loc["lng"].append(round(s["lng"], 5)); loc["p"].append(s["p"])
            loc["city"].append(s["city"]); loc["state"].append(s["state"])
            loc["site"].append(f"{s['kind']} of {s['names'][0]}" + (f" (principal filing entity; {len(sites)} sites in total)" if len(sites) > 1 else ""))
            loc["stype"].append(s["stype"]); loc["url"].append(s["url"]); loc["conf"].append(s["conf"])
            loc["evid"].append(s["note"]); loc["date"].append(DATE_VERIFIED); loc["notes"].append(""); loc["rkey"].append("")
        else:
            ents = [LOCS[e] for e in ap.get("ents", [])]
            p = "R" if any(r["precision"] == "region" for r in ents) else ("K" if cc else "U")
            reg = next((r for r in ents if r["precision"] == "region"), None)
            for k in loc: loc[k].append(None if k in ("lat", "lng") else "")
            loc["p"][-1] = p; loc["date"][-1] = DATE_VERIFIED
            if reg: loc["state"][-1] = reg["state_province"] or ""; loc["stype"][-1] = reg["source_type"] or ""; loc["url"][-1] = reg["source_url"] or ""; loc["conf"][-1] = reg["confidence"] or ""
            loc["evid"][-1] = "Private individual: country level only; no address searched or used." if t == 4 else "No town-level source found for the applicant names in this group."
        ccA.append(cc); precA.append(basis)
        cnt = collections.Counter()
        for d in ds:
            for ci in PA[d][9]: cnt[meta["cpc"][ci]] += 1
        cpcA.append(" ".join(f"{k}:{v}" for k, v in cnt.most_common(6)))

    pats = {}
    for a in range(NA):
        ds = sorted(apps_of[a], key=lambda d: -PA[d][3])[: (6 if nA[a] >= 20 else 2)]
        pats[str(a)] = [[d, PA[d][0], PA[d][6]] for d in ds]

    # ---------- QC against the Natural Earth polygons used by this front end
    pts = [(s["lng"], s["lat"], s["cc"], s["city"]) for s in site_list]
    mismatch, coastal, coastal_max, swapped = [], 0, 0.0, 0
    for lon, lat, cc, city in pts:
        P = NEP.get(cc)
        if cc == "CN": P = (P or []) + NEP.get("HK", []) + NEP.get("MO", [])
        if not P: mismatch.append([city, cc, "no polygon"]); continue
        if in_poly(lon, lat, P): continue
        if in_poly(lat, lon, P): swapped += 1
        d = dist_km_to(lon, lat, P)
        if d <= 15: coastal += 1; coastal_max = max(coastal_max, d)
        else: mismatch.append([city, cc, round(d, 1)])
    stacks = collections.Counter((s["city"], round(s["lat"], 3), round(s["lng"], 3)) for s in site_list)
    geoqc = {"points": len(pts), "mismatch": len(mismatch), "mismatch_list": mismatch, "coastal": coastal, "coastal_maxkm": round(coastal_max, 1),
             "swapped": swapped, "distinct": len(stacks), "stacks": [[k[0], v] for k, v in stacks.most_common(8)]}

    D = {
        "meta": {"title": "Semiconductor & quantum patent applications at the EPO and European national offices",
                 "window": f"First publication {str(meta['firstPubMin'])[6:]}.{str(meta['firstPubMin'])[4:6]}.{str(meta['firstPubMin'])[:4]} – {str(meta['firstPubMax'])[6:]}.{str(meta['firstPubMax'])[4:6]}.{str(meta['firstPubMax'])[:4]}",
                 "months": months, "queried": "2026-11-01 / 2026-11-05", "source": "Google Patents Public Datasets on BigQuery (patents-public-data)",
                 "overrides": [], "latest": {k: f"{str(v)[:4]}-{str(v)[4:6]}-{str(v)[6:]}" for k, v in meta["latestByOffice"].items()},
                 "geo_verified": DATE_VERIFIED, "country_from_location": cty_from_loc, "geoqc": geoqc,
                 "offices": offices, "officeChips": OFFICE_CHIPS, "cpcsub": CPCSUB, "famjur": bool(fam_bits), "famjurDocs": n_jur, "routes": True,
                 "locqc": meta["locQC"]},
        "groups": [[g[1], g[2]] for g in GROUPS], "cats": cats,
        "apps": {"name": nameA, "orig": origA, "typ": typA, "cc": ccA, "prec": precA, "prov": [""] * NA, "ronly": [""] * NA, "n": nA, "fam": famA},
        "cpc": cpcA, "pats": pats, "ccn": {**cn["ccn"], **{c: v["name"] for c, v in meta["countries"].items()}},
        "loc": loc, "regions": {}, "countries": cn["countries"],
        "sites": [[s["a"], round(s["lat"], 5), round(s["lng"], 5), s["p"], s["city"], s["names"][0], s["conf"], len(s["names"])] for s in site_list],
    }
    os.makedirs(os.path.join(out_dir, "data", "basemap"), exist_ok=True)
    dump = lambda p, o: json.dump(o, open(os.path.join(out_dir, "data", p), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    dump("dashboard.json", D)
    open(os.path.join(out_dir, "data", "docs.txt"), "w", encoding="utf-8").write("\n".join(lines))
    for f in ["countries.geojson", "basemap/admin1_lines.geojson", "basemap/cities.geojson"]:
        shutil.copy(os.path.join(ne_dir, "data", f), os.path.join(out_dir, "data", f))

    # ---------- applicant_locations.json in the shared schema (one record per applicant ID) + its filing-entity sites
    recs = []
    site_by_a = collections.defaultdict(list)
    for sid, s in enumerate(site_list): site_by_a[s["a"]].append(s)
    for a, ap in enumerate(AP):
        ents = [LOCS[e] for e in ap.get("ents", [])]
        main_e = max(ents, key=lambda r: r["applications"]) if ents else None
        p = loc["p"][a]
        recs.append({
            "applicant_id": a, "harmonised_name": ap["name"], "original_name": origA[a] or ap["name"], "applicant_type": TYPE_NAME[typA[a]],
            "is_group": len(ents) > 1, "principal_member": main_e["original_name"] if main_e else "",
            "country": ccA[a], "country_basis": {"M": "study mapping (Wikidata-verified group)", "D": "patent record", "L": "verified location", "U": "unknown"}[precA[a]],
            "state_province": loc["state"][a] or None, "city": loc["city"][a] or None, "latitude": loc["lat"][a], "longitude": loc["lng"][a],
            "location_precision": PREC_WORD[p], "location_type": loc["site"][a] or None, "source_url": loc["url"][a] or None,
            "source_type": loc["stype"][a] or None, "verification_confidence": loc["conf"][a] or None, "date_verified": DATE_VERIFIED,
            "evidence": loc["evid"][a] or None, "notes": [],
            "sites": [{"filing_entities": s["names"], "city": s["city"], "state_province": s["state"] or None, "country": s["cc"],
                       "latitude": round(s["lat"], 5), "longitude": round(s["lng"], 5), "location_precision": PREC_WORD[s["p"]],
                       "location_type": s["kind"], "source_url": s["url"] or None, "source_type": s["stype"], "verification_confidence": s["conf"] or None,
                       "applications": s["n"]} for s in sorted(site_by_a[a], key=lambda s: -s["n"])],
            "filing_entities": [{"applicant_id": r["applicant_id"], "original_name": r["original_name"], "country": r["country"],
                                 "city": r["city"], "location_precision": PREC_WORD[PREC[r["precision"]]], "applications": r["applications"]} for r in ents],
        })
    json.dump(recs, open(os.path.join(out_dir, "data", "applicant_locations.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    # ---------- CSVs
    with open(os.path.join(out_dir, "data", "applicants.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f); w.writerow(["applicant_id", "harmonised_name", "original_name", "applicant_type", "country", "applications", "families", "top_cpc_groups", "city", "state_province", "latitude", "longitude", "location_precision", "location_source", "sites"])
        for a in range(NA): w.writerow([a, nameA[a], origA[a], TYPE_NAME[typA[a]], ccA[a], nA[a], famA[a], cpcA[a], loc["city"][a], loc["state"][a], loc["lat"][a], loc["lng"][a], PREC_WORD[loc["p"][a]], loc["stype"][a], len(site_by_a[a])])
    with open(os.path.join(out_dir, "data", "publications.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f); w.writerow(["publication_number", "office", "first_publication_date", "filing_year", "family_index", "technology_categories", "family_offices", "cpc_subclasses_in_scope", "applicant_ids", "inventor_countries", "filing_route"])
        for di, a in enumerate(PA):
            fl = lines[di].split(",")
            w.writerow([a[0], offices[a[1]], a[3], a[4], a[5], "|".join(cats[int(c)][0] for c in fl[4].split(".") if c), "|".join(k for k, b in [("EP", 1), ("US", 2), ("JP", 4), ("KR", 8), ("WO", 16), ("CN", 32), ("TW", 64)] if int(fl[5]) & b), "|".join(s for k, s in enumerate(CPCSUB) if int(fl[6]) & (1 << k)), "|".join(fl[7].split(".")), "|".join(fl[8].split(".")) if fl[8] else "", "PCT" if fl[10] == "1" else "direct"])
    with open(os.path.join(out_dir, "data", "unverified_locations.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f); w.writerow(["applicant_id", "harmonised_name", "original_name", "applicant_type", "country", "location_precision", "state_province", "applications", "notes"])
        for a in sorted(range(NA), key=lambda a: -nA[a]):
            if loc["lat"][a] is None: w.writerow([a, nameA[a], origA[a], TYPE_NAME[typA[a]], ccA[a], PREC_WORD[loc["p"][a]], loc["state"][a], nA[a], loc["evid"][a]])
    with open(os.path.join(out_dir, "data", "technology_taxonomy.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f); w.writerow(["category_id", "group_id", "group", "category_en"])
        for c in cats: w.writerow([c[0], GROUPS[c[1]][1], GROUPS[c[1]][2], c[2]])
    print(json.dumps({"docs": len(lines), "applicants": NA, "sites": len(site_list), "located_applicants": sum(1 for x in loc["lat"] if x is not None),
                      "prec": collections.Counter(loc["p"]), "geoqc": {k: v for k, v in geoqc.items() if k != "mismatch_list"}, "mismatch": mismatch[:10],
                      "fam_jur_docs": n_jur, "country_from_location": cty_from_loc, "months": len(months)}, default=str, ensure_ascii=False))

if __name__ == "__main__":
    main(*sys.argv[1:5])
