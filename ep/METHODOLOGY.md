# Methodology and data-quality note

## Dataset

* **Source**: Google Patents Public Datasets on BigQuery (`patents-public-data.patents.publications`), queried 1–5 Nov 2026.
* **Scope**: patent applications whose *first* publication at the EPO (EP) or at a national office of the 39 EPO member states falls on or after 1 Nov 2024, on both filing routes: direct filings, and PCT applications entering the European phase (Euro-PCT, dated at their first EP-office record) or the German national phase (DE 11 2 numbers). The dashboard's *Filing route* filter separates the two.
  * Selection is by CPC: H10D, H10B, H10W, H10P, H10N60, G06N10, G06F30/39, and B82Y10 together with a quantum keyword.
  * LED, solar-cell and OLED filings (H10H, H10F, H10K) are excluded unless they also carry a device or quantum code.
* **Coverage**: 13,637 applications in 12,747 families: EP 9,069 (direct 4,382, Euro-PCT 4,687), national offices 4,568 (direct 3,648, German PCT national phase 920; DE 3,480, FR 464, GB 259, NL 127, IT 77, …). 41% come via the PCT route.
  * Latest publication in the data: EP 16 Sep 2026, DE 24 Sep 2026.
  * Italian national records end in December 2025, and British records thin out in 2026.
* **Not included**: publications at other offices. The CNIPA & TIPO study is a separate dataset with the same dashboard design.

## Counting

* **Applications**: each application is counted once. Later publications of the same application are merged.
* **Families**: distinct DOCDB family IDs.
* **Co-applicants**:
  * *Full counting* credits an application to every co-applicant.
  * *Fractional counting* credits 1/n to each of n applicant groups.
  * Dataset, country and applicant-type totals always count each application once.
* **Technology**: the EP study taxonomy of 61 categories (CPC rules plus text rules for 7 categories), shown in 7 groups.
  * Applications flagged in a group by CPC without a specific category appear as "Other … (no sub-category)".
  * This is **not** the 65-category taxonomy of the CNIPA & TIPO study, so technology results can only be compared between the two studies through a mapping.

## Applicants and types

* Names follow the study's grouping: 88 documented rules merge name variants and subsidiaries under a parent (e.g. all Infineon entities). Everything else stays a separate applicant.
* **Types**: company, startup, university, research institute, private inventor, other/unknown.
  * **Startups** are identified only for the Wikidata-verified groups (about the 60 largest): founded 2015 or later, no parent organisation, not a carve-out.
  * University and research institute are verified for CEA, CNRS, imec, Fraunhofer, DLR and TU Delft, and otherwise inferred from name terms.
* **Private inventors** are natural persons named as applicants whose name matches an inventor on the same application. Name variants are not merged.

## Geography

Three modes, chosen in the dashboard:

* **A · Applicant location** (default): the headquarters or organisational site of each filing entity.
* **B · Inventor location**: inventor countries from Google's harmonised inventor data, at country level. Inventors are not treated as applicants.
* **C · Filing jurisdiction**: the offices where the family has members (EP, US, JP, KR, WO, CN and TW were queried). EP (regional) and WO (PCT) are shown separately and are never treated as an origin.

### Applicant locations (`data/applicant_locations.json`)

The unit that is located is the **applicant name on the filing** (the legal entity). A subsidiary is therefore placed at its own address and never inherits its parent's headquarters: Infineon Technologies Austria AG sits in Villach, Infineon Technologies AG in Neubiberg. A group whose filing entities sit in different places is drawn once per place. In lists, the group's main location is the place of its largest filing entity.

Sources, in order of preference:

1. **Wikidata** (the snapshot on BigQuery):
   * The headquarters statement (P159), with its coordinate qualifier (P625) where given, otherwise the headquarters town.
   * For organisations without P159, the organisation's own coordinates.
   * A match must be an organisation in the applicant's country and not a broader parent name.
   * Building or district labels (e.g. "Hôtel de Vendôme", "Chiyoda-ku") are shown as their town.
2. **USPTO applicant addresses** (PatentsView, US patents up to 2021):
   * The most frequent address on the entity's own US patents.
   * Re-geocoded against the Overture Maps town gazetteer, because PatentsView's own coordinates are off by up to ~250 km.
   * Ambiguous town names and province-only addresses are not used.
3. **Manual web verification** for the largest remaining applicants (registers, official websites, annual reports). For Chinese entities, the registering city stated in the legal name is used.

Precision levels:

* *exact*: organisation coordinates.
* *city*: city centre.
* *region*: province only.
* *country*: location unverified.
* *unknown*.

Only exact and city locations are drawn as individual markers. Province- and country-level applicants are shown as dashed group circles at a label point and listed as unverified. They are never placed at a national centroid as if it were their address. Private inventors are kept at country level, and no residential information was searched.

## Quality checks

See `GEO_QUALITY_REPORT.md`. It covers:

* precision by applicant group and by filing entity;
* sources and confidence;
* the point-in-country test (0 mismatches against Natural Earth 1:10m);
* the coordinate order check;
* shared-coordinate stacks;
* unchanged patent totals;
* subsidiaries;
* the list of unverified applicants.

## Limitations

* City-level points are city centres. A company may have moved since its US patents were granted (up to 2021).
* PCT-route applications reach Europe about 31–34 months after priority, so they describe inventions about a year older than direct filings published in the same window.
* About 40% of institutional filing entities, holding about 10% of applicant mentions, could not be located below country level. Most are small applicants with one or two filings.
* The most frequent CPC groups and the sample publications in each profile are stored without filters.
