# EPOPatentScreen
AI supported Patent and emerging technologies Analysis

---

## Studies in this repository

| Study | Dashboard | Report | Folder |
|---|---|---|---|
| CNIPA & TIPO (China, Taiwan): 99,546 applications | [Open](https://fini96.github.io/PatentScreen-Semiconductors-Quantum/) | [PDF](report/CN-TW-semiconductor-quantum-patents-2024-2026.pdf) · [Markdown](report/CN-TW-semiconductor-quantum-patents-2024-2026.md) | `/` (root) |
| EPO & European national offices: report 13,637 applications incl. Euro-PCT and PCT national phase; atlas 8,062 direct filings | [Open](https://fini96.github.io/PatentScreen-Semiconductors-Quantum/ep/) | [PDF](ep/report/EP-semiconductor-quantum-patents-2024-2026.pdf) · [Markdown](ep/report/EP-semiconductor-quantum-patents-2024-2026.md) | [`ep/`](ep/) |

Both dashboards use the same front end (map, colours, legend, filters, charts) and the same `applicant_locations.json` schema. The datasets are separate, and the technology taxonomies differ (65 categories in 12 groups for CN/TW, 61 in 7 groups for EP), so technology results are only comparable through a mapping.

---

## Semiconductor Patent Atlas · CNIPA & TIPO

Interactive map and analytics dashboard of **99,546 semiconductor and quantum-technology patent applications** first published at CNIPA (China) and TIPO (Taiwan) between 1 Nov 2024 and the data cut-off (latest publication: CN 8 Sep 2026, TW 21 Jun 2026), with **verified applicant locations**.

It is a static website: no backend, no database, no API keys.

The written study report is in [`report/`](report/) as [PDF](report/CN-TW-semiconductor-quantum-patents-2024-2026.pdf) (with charts) and [Markdown](report/CN-TW-semiconductor-quantum-patents-2024-2026.md) (text and tables; the three embedded charts are only in the PDF).

### Run locally

The page loads its data with `fetch()`, which browsers block for `file://` pages, so serve the folder:

```bash
cd semiconductor-patent-atlas
python3 -m http.server 8000
# open http://localhost:8000
```

Any static server works (`npx serve`, `php -S localhost:8000`, …).

### Publish on GitHub Pages

1. Create a repository and copy the contents of this folder to its root (keep `.nojekyll`).
2. `git add . && git commit -m "Semiconductor Patent Atlas" && git push`
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
4. The site appears at `https://<user>.github.io/<repository>/` after a minute.

GitHub Pages serves the JSON/CSV files gzip-compressed (about 7 MB transferred on first load). All files are below GitHub’s 100 MB file limit.

### Map and basemap

* MapLibre GL JS 4.7.1 (bundled in `assets/vendor/`), d3 7.9.0 for charts.
* Basemap: OpenStreetMap vector tiles from [OpenFreeMap](https://openfreemap.org) (free, no key). If that service cannot be reached, the map automatically switches to an offline basemap built from Natural Earth 1:10m data in `data/basemap/` and `data/countries.geojson`.
* Country selection and shading: Natural Earth 1:10m admin-0 polygons (public domain).

### Files

| Path | Content |
|---|---|
| `index.html`, `assets/app.js` | Dashboard page and logic |
| `data/dashboard.json` | Applicants (names, type, country, counts), taxonomy, location fields, metadata — what the page loads |
| `data/docs.txt` | One compact line per application (office, month, filing year, family, categories, jurisdictions, CPC, applicant IDs, TW inventor countries) |
| `data/applicant_locations.json` | **Geographic enrichment**: one record per applicant ID with city, province, coordinates, precision, site type, source URL, source type, confidence, date verified, evidence |
| `data/applicants.csv` | Applicant table (ID, names, type, country, applications, families, top CPC/IPC, location) |
| `data/publications.csv` | One row per application: publication number, dates, family, categories, family offices, CPC subclasses, applicant IDs |
| `data/technology_taxonomy.csv` | The 65 categories and 12 groups (English, simplified and traditional Chinese) |
| `data/unverified_locations.csv` | Applicants without a verified city-level location |
| `data/countries.geojson`, `data/basemap/*` | Map geometry (Natural Earth) |
| `METHODOLOGY.md` | Dataset, counting rules, classifications, geography, limitations |
| `GEO_QUALITY_REPORT.md` | Geographic data-quality report and checks |

`applicant_id` links all files: it is the index into `dashboard.json → apps`, the `applicant_id` in the CSVs and in `applicant_locations.json`, and the IDs in `docs.txt` / `publications.csv`.

### Licences and attribution

Patent data: Google Patents Public Datasets (BigQuery). Locations: Wikidata (CC0), USPTO data via PatentsView, applicant names, manual checks (sources cited per record). Basemap © OpenMapTiles, data © OpenStreetMap contributors (ODbL), served by OpenFreeMap; Natural Earth (public domain). MapLibre GL JS (BSD-3-Clause), d3 (ISC).
