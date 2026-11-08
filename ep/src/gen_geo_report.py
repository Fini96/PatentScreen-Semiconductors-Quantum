"""Write GEO_QUALITY_REPORT.md for the EP atlas (same structure as the CNIPA & TIPO report).
Usage: python3 gen_geo_report.py <atlas_dir> <ep_data_dir>"""
import json, sys, os, collections

site, ep = sys.argv[1], sys.argv[2]
D = json.load(open(os.path.join(site, "data", "dashboard.json"), encoding="utf-8"))
L = json.load(open(os.path.join(site, "data", "applicant_locations.json"), encoding="utf-8"))
QC = json.load(open(os.path.join(ep, "location_qc.json"), encoding="utf-8"))
A, LO, q = D["apps"], D["loc"], D["meta"]["geoqc"]
NA = len(A["name"])
T = ["company", "startup", "university", "research institute", "private inventor", "other / unknown"]
P = [("E", "Exact site (organisation coordinates)"), ("C", "City (city-centre coordinates)"), ("R", "Province / state only"), ("K", "Country only (location unverified)"), ("U", "Unknown")]
inst = [a for a in range(NA) if A["typ"][a] != 4]; ind = [a for a in range(NA) if A["typ"][a] == 4]
apps_inst = sum(A["n"][a] for a in inst)
out = ["# Geographic data-quality report", "",
       "Semiconductor Patent Atlas (EPO & European national offices study). Applicant locations verified 2026-11-05. File: `data/applicant_locations.json` (one record per applicant ID, joined to the patent statistics by `applicant_id`; each record also lists the places of the group's filing entities).", "",
       "The located unit is the applicant name on the filing (legal entity). A group whose filing entities sit in different places is drawn once per place; the tables for applicant groups use the place of the group's largest filing entity.", "",
       "## 1. Precision of applicant locations", "",
       "### Filing entities (the unit that is located)", "",
       "| Precision | Institutional filing entities | Share | Share of applicant mentions |", "|---|---:|---:|---:|"]
for k, lab in [("exact headquarters", "Exact site"), ("city", "City"), ("region", "Province / state only"), ("country", "Country only (location unverified)"), ("unknown", "Unknown")]:
    v = QC["by_precision"][k]; out.append(f"| {lab} | {v['entities']:,} | {100*v['share_entities']:.1f}% | {100*v['share_links']:.1f}% |")
out += [f"| **Total** | **{QC['institutional_entities']:,}** | 100% | 100% |", "", f"Private inventors: {QC['individual_entities']} (country level only, by design).", "",
        "### Applicant groups (main place)", "", "| Precision | Institutional applicants | Share | Share of their applications | Private inventors |", "|---|---:|---:|---:|---:|"]
for k, lab in P:
    ia = [a for a in inst if LO["p"][a] == k]; ii = [a for a in ind if LO["p"][a] == k]
    out.append(f"| {lab} | {len(ia):,} | {100*len(ia)/len(inst):.1f}% | {100*sum(A['n'][a] for a in ia)/apps_inst:.1f}% | {len(ii)} |")
drawn = [a for a in inst if LO["lat"][a] is not None]
out += [f"| **Total** | **{len(inst):,}** | 100% | 100% | **{len(ind)}** |", "",
        f"Applicant groups drawn on the map: **{len(drawn)} of {len(inst)} institutional applicants ({100*len(drawn)/len(inst):.1f}%)**, accounting for {100*sum(A['n'][a] for a in drawn)/apps_inst:.1f}% of their applications. They are drawn at {len(D['sites'])} places in total.", "",
        "## 2. Sources and confidence (filing entities with a drawn location)", "", "| Source | Filing entities |", "|---|---:|"]
names = {"wikidata": "Wikidata (P159 headquarters / P625 coordinates)", "patentsview": "USPTO patent records (PatentsView), re-geocoded with Overture Maps", "web": "Manual web verification (registers, official sites, annual reports)", "city-state": "Applicant country = city-state (Singapore)", "region": "Region only (not drawn)", "country-only": "none (country only)", "unknown": "none (no country)", "individual": "private inventors (country only)"}
for k, v in sorted(QC["by_source"].items(), key=lambda kv: -kv[1]): out.append(f"| {names.get(k, k)} | {v:,} |")
out += ["", "| Confidence | Filing entities |", "|---|---:|"] + [f"| {k} | {v:,} |" for k, v in sorted(QC["by_confidence"].items(), key=lambda kv: -kv[1])]
out += ["", "Confidence rules: *high* = Wikidata item matched on its own label, single candidate, and the USPTO address (if any) within 50 km, or a manually verified register/official source; *medium* = alias match or USPTO address with ≥60% of ≥3 US patents, or manual source without street address; *low* = weaker USPTO evidence or dated sources.", "",
        "## 3. Automated checks", "",
        f"- **Country consistency**: {q['points']} drawn points tested against Natural Earth 1:10m country polygons: **{q['mismatch']} fall in a different country** than the applicant's country.",
        f"- **Coastal points**: {q['coastal']} points fall just outside the generalised coastline; all lie within {q['coastal_maxkm']} km of their own country's polygon.",
        f"- **Latitude/longitude order**: {q['swapped']} points would only match their country with swapped axes (0 = order correct). MapLibre receives `[longitude, latitude]`.",
        f"- **No national centroids**: applicants known only to country or province level are not drawn as markers; they are shown as dashed group circles at a label point and listed as unverified. {q['distinct']} distinct coordinates are in use. In a second check against the Overture Maps polygons, every point lies within 30 km of a town in its own country, and the only points within 15 km of a country label point are in Singapore (a city-state) and Louvain-la-Neuve.",
        "- **Largest shared coordinates** (city centres; they fan out into individually selectable markers on click): " + ", ".join(f"{c} ({n})" for c, n in q["stacks"]) + ".",
        f"- **Patent totals unchanged**: {sum(1 for _ in open(os.path.join(site, 'data', 'docs.txt'), encoding='utf-8')):,} application records, {NA:,} applicant groups; applicant, family and technology counts are those of the study (Samsung {A['n'][A['name'].index('Samsung')]}, Intel {A['n'][A['name'].index('Intel')]}, Infineon {A['n'][A['name'].index('Infineon')]}).", "",
        "## 4. Large and diverse countries", "", "| Country | Applicants | Exact | City | Province | Country only | Distinct cities | Leading cities (applicants) |", "|---|---:|---:|---:|---:|---:|---:|---|"]
for c in ["US", "CN", "DE", "IN", "JP", "KR", "TW", "FR", "GB", "NL", "AT", "CH"]:
    aa = [a for a in inst if A["cc"][a] == c]
    if not aa: out.append(f"| {c} | 0 | | | | | | |"); continue
    cnt = collections.Counter(LO["p"][a] for a in aa)
    cities = collections.Counter(LO["city"][a] for a in aa if LO["city"][a])
    out.append(f"| {c} | {len(aa)} | {cnt['E']} | {cnt['C']} | {cnt['R']} | {cnt['K'] + cnt['U']} | {len(cities)} | " + ", ".join(f"{k} {v}" for k, v in cities.most_common(6)) + " |")
out += ["", "## 5. Spot checks of well-known applicants", "", "| Applicant | Country | Main location | Precision | Source | Other places |", "|---|---|---|---|---|---|"]
for nm in ["Samsung", "Intel", "Infineon", "TSMC", "STMicroelectronics", "CEA", "Bosch", "Mitsubishi Electric", "NXP", "imec", "Soitec", "ASML", "GlobalFoundries", "Kioxia", "Huawei", "BOE", "AT&S", "IBM"]:
    if nm not in A["name"]: continue
    a = A["name"].index(nm); r = L[a]
    others = [s["city"] for s in r["sites"][1:]]
    src = f"[{(r['source_type'] or '').split(' (')[0]}]({r['source_url']})" if r["source_url"] else (r["source_type"] or "–")
    out.append(f"| {nm} | {r['country']} | {r['city'] or '–'}{', ' + r['state_province'] if r['state_province'] and r['state_province'] != r['city'] else ''} | {r['location_precision']} | {src} | {', '.join(others) or '–'} |")
out += ["", "## 6. Subsidiaries are located independently", "",
        "Each filing entity is located from its own name; a parent's headquarters is never copied to a subsidiary. Groups whose filing entities sit in different places:", ""]
for g, sites in QC["groups_with_several_sites"]:
    out.append(f"- **{g}**: " + "; ".join(f"{n} → {c}, {cc}" for n, c, cc in sites))
out += ["", "Entities for which only the parent's headquarters could be found stay unverified (e.g. Heraeus Electronics, SUSS MicroTec Solutions, Adeia Semiconductor Bonding Technologies, SanDisk Technologies).", "",
        "## 7. Applicants whose location could not be verified", ""]
unv = [a for a in range(NA) if LO["lat"][a] is None]
cntp = collections.Counter(LO["p"][a] for a in unv)
out += [f"{len(unv)} applicant groups (incl. {len(ind)} private inventors) have no verified city-level location: {cntp['R']} province only, {cntp['K']} country only, {cntp['U']} unknown. All remain in every statistic. The complete list is `data/unverified_locations.csv`; the 40 with the most applications:", "",
        "| ID | Applicant | Type | Country | Precision | Applications |", "|---:|---|---|---|---|---:|"]
for a in sorted(unv, key=lambda a: -A["n"][a])[:40]:
    out.append(f"| {a} | {A['name'][a]} | {T[A['typ'][a]]} | {A['cc'][a] or '–'} | {L[a]['location_precision']}{' (' + LO['state'][a] + ')' if LO['p'][a] == 'R' and LO['state'][a] else ''} | {A['n'][a]} |")
out += ["", "## 8. Map geometry", "",
        "The first version of this dashboard drew country outlines that had been simplified country by country with a 20 km tolerance, snapped to a 0.1° grid, stripped of holes and of every polygon under 10,000 km²; neighbouring borders therefore did not match. The map now uses the same front end and geometry as the CNIPA & TIPO atlas: MapLibre GL JS with an OpenStreetMap-based vector basemap (OpenFreeMap, no API key) and Natural Earth 1:10m country polygons for selection and shading; if the online basemap is unreachable, Natural Earth 1:10m borders, provincial boundaries and cities shipped with the site are used. Zooming runs from world level to individual cities (zoom 0.8–17).", ""]
open(os.path.join(site, "GEO_QUALITY_REPORT.md"), "w", encoding="utf-8").write("\n".join(out))
print("written", len(out), "lines")
