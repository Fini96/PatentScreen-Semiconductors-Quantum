## Semiconductor Patent Atlas · EPO & European national offices

An interactive map and analytics dashboard of **8,062 semiconductor and quantum-technology patent applications** (7,560 families). They were first published at the European Patent Office (EP) or a national office of the 39 EPO member states between 1 Nov 2024 and the data cut-off (latest publication: EP 16 Sep 2026, DE 24 Sep 2026). PCT filings are excluded. Applicant locations are verified.

The dashboard uses **the same front end as the [CNIPA & TIPO atlas](https://fini96.github.io/PatentScreen-Semiconductors-Quantum/)**: the same map, colours, legend, filters, charts, comparison and methodology layout, and the same `applicant_locations.json` fields. Only the data and a few EP-specific settings differ:

- offices: EP vs national offices;
- inventor countries are available for all applications;
- groups whose filing entities sit in different places get one dot per place.

The datasets are not combined.

It is a static website: no backend, no database, no API keys.

The written study report is in [`report/`](report/) as [PDF](report/EP-semiconductor-quantum-patents-2024-2026.pdf) (with charts) and [Markdown](report/EP-semiconductor-quantum-patents-2024-2026.md) (text and tables; the two embedded charts are only in the PDF).

### Run locally

The page loads its data with `fetch()`, which browsers block for `file://` pages, so serve the folder:

```bash
cd semiconductor-patent-atlas-ep
python3 -m http.server 8000
# open http://localhost:8000
```

### GitHub Pages

This folder lives in the `ep/` subfolder of the CNIPA & TIPO repository and is served with it: `https://fini96.github.io/PatentScreen-Semiconductors-Quantum/ep/`. All paths are relative, so the folder also works on its own at the root of another repository (keep `.nojekyll`).

### Map and basemap

- **Libraries.** MapLibre GL JS 4.7.1 (bundled in `assets/vendor/`) and d3 7.9.0 for charts.
- **Basemap.** OpenStreetMap vector tiles from [OpenFreeMap](https://openfreemap.org) (free, no key). If that service cannot be reached, the map switches automatically to an offline basemap built from the Natural Earth 1:10m data in `data/basemap/` and `data/countries.geojson`.
- **Country selection and shading.** Natural Earth 1:10m admin-0 polygons (public domain).

### Files

| Path | Content |
|---|---|
| `index.html`, `assets/app.js` | Dashboard page and logic (shared front end, configured for the EP study) |
| `data/dashboard.json` | Applicants (names, type, country, counts), taxonomy, locations, filing-entity places (`sites`), metadata |
| `data/docs.txt` | One compact line per application: office, month, filing year, family, categories, family jurisdictions, CPC subclasses, applicant IDs, inventor countries, places |
| `data/applicant_locations.json` | **Geographic enrichment.** One record per applicant ID, with the same fields as the CNIPA & TIPO atlas (city, province, coordinates, precision, site type, source URL, source type, confidence, date verified, evidence). Also the places and filing entities of each group |
| `data/applicants.csv` | Applicant table (ID, names, type, country, applications, families, top CPC groups, location, number of places) |
| `data/publications.csv` | One row per application: publication number, office, dates, family, categories, family offices, CPC subclasses, applicant IDs, inventor countries |
| `data/technology_taxonomy.csv` | The 61 EP study categories in 7 groups, plus "other … (no sub-category)" entries |
| `data/unverified_locations.csv` | Applicants without a verified city-level location |
| `data/countries.geojson`, `data/basemap/*` | Map geometry (Natural Earth, identical to the CNIPA & TIPO atlas) |
| `METHODOLOGY.md` | Dataset, counting rules, classifications, geography, limitations |
| `GEO_QUALITY_REPORT.md` | Geographic data-quality report and checks |
| `src/` | Build scripts: `build_data.py` (study export → locations), `build_atlas.py` (→ this data format), `patch_frontend.py` and `method_ep.js` (configure the shared front end), `gen_geo_report.py`, plus `orgs.json` and `web_locations.json` (manually researched locations with sources) |

`applicant_id` links all files. It is the index into `dashboard.json → apps`, the `applicant_id` in the CSVs and in `applicant_locations.json`, and the ID used in `docs.txt` and `publications.csv`.

### Rebuild

1. Export these tables from BigQuery (project `patent-study-513418`) as CSV:
   - `patent_study.dashboard_export`
   - `patent_study.loc_export`
   - `patent_study.map_export`
   - `patent_study.fam_jur`
2. Run:

```bash
python3 src/build_data.py dashboard_export.csv loc_export.csv map_export.csv build/
python3 src/build_atlas.py build/ <CN/TW atlas folder> . fam_jur.csv
python3 src/patch_frontend.py <CN/TW atlas folder>/assets/app.js assets/app.js src/method_ep.js
python3 src/gen_geo_report.py . build/
```

### Licences and attribution

- **Patent data:** Google Patents Public Datasets (BigQuery).
- **Locations:** Wikidata (CC0), USPTO data via PatentsView, Overture Maps (town points), and manual checks. Sources are cited per record.
- **Basemap:** © OpenMapTiles, data © OpenStreetMap contributors (ODbL), served by OpenFreeMap; Natural Earth (public domain).
- **Libraries:** MapLibre GL JS (BSD-3-Clause), d3 (ISC).
