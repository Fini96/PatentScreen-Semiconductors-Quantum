# Semiconductor Innovation Trends in European Patent Filings, Nov 2024 – Sep 2026

Nov 1, 2026 · @fini

## 1. Executive summary

**8,062 non-PCT semiconductor and quantum applications** (7,560 families) were first published at the EPO (EP: 4,382) and at national offices of the 39 EPO member states (3,680; DE 2,590) between 1 Nov 2024 and the data cut-off (EP: 16 Sep 2026). The EPO route is an international market dominated by Korean, US and Japanese applicants. The national route, above all the German office, is a European home market led by power-electronics and automotive firms.

*Data findings*

- **Packaging, not transistors, is the largest field.** Thermal management (1,180), encapsulation (1,154), power-module packaging (1,127), BEOL interconnects (1,093) and 2.5D/chiplets (896) lead. The integration and design domain covers 4,236 applications (53%).
- **Fastest-growing (like-for-like Nov–Aug vs Nov–Aug):** CFET stacked transistors +190% (10 → 29), SRAM +92%, 2D/carbon-nanotube FETs +57%, glass and ceramic package substrates +56% (75 → 117) and quantum error correction +46% (72 → 105). Among large categories, 3D stacking/TSV grew 33%. Front-end process categories fell (lithography −40%, doping −36%, deposition −28%).
- **Top players.** Samsung (720), Intel (560), Infineon (508), TSMC (352), STMicroelectronics (298) and CEA (288). The top five groups hold 30.2% of filings. Intel is the fastest-growing large filer (+49%).
- **Origin.** By earliest priority claim, the US leads (2,289; 28.4%), ahead of Germany (1,240), first filings at the EPO itself (1,003) and Korea (1,000). By first-named applicant, 43.7% of filings come from EPO member states (3,525; EU27 38.3%): 34.0% at the EPO, but 55.3% at national offices.
- **Quantum is a European story.** 924 quantum applications (11.5% of the corpus, flat between windows), 70% with a European first-named applicant and 28.9% with a university or research institute. After Fujitsu (98), the leaders are CEA (57), Pasqal (36), Alice & Bob (34), Infineon (33) and eleQtron (31).
- **Academic weight.** Universities or research institutes appear on 10.3% of filings. CEA and imec are the only research institutes in the top 20.
- **Two routes, two industries.** The EPO over-weights memory and leading-edge logic (DRAM 5.8×, backside power 3.2×, HBM-type assemblies 2.8× relative to national offices). National offices over-weight power devices (IGBT, power MOSFET, SiC, power-module packaging). TSMC, Bosch, Mitsubishi Electric and Renesas file almost only at the German office; Samsung, NXP, imec and Fujitsu almost only at the EPO.

**Main caveats.** Excluding PCT-route filings removes several large players almost entirely: Qualcomm, IBM, Applied Materials, Huawei and Quantinuum file their European semiconductor applications mainly via PCT. The rankings show who files directly in Europe, not total European patent activity. Italian national data ends in December 2025 and British data thins out in 2026.

## 2. Data, scope and corpus

The corpus covers non-PCT patent applications whose first publication at the EPO or at one of the 39 EPO member-state offices falls between 2024-11-01 and the last available date, and that carry a CPC code in scope. Each application is counted once.

**Data freshness** (Google Patents Public Datasets, queried 1–5 Nov 2026): latest publication EP 2026-09-16, DE 2026-09-24, GB 2026-09-16, FR 2026-09-04, so August 2026 is the last full month. Italian national records end on 2025-12-21, and British records thin out sharply in 2026. Both are coverage gaps, not drops in filing.

| Measure | EP (direct) | National offices | All |
| --- | --- | --- | --- |
| Applications | 4,382 | 3,680 (DE 2,590 · FR 464 · GB 259 · NL 127 · IT 77 · FI 57 · other 106) | 8,062 |
| Distinct families (DOCDB) | 4,277 | 3,587 | 7,560 |
| PCT route (Euro-PCT, national phase) | excluded | excluded | excluded |
| Utility models, translations of EP patents (T1–T5), A4 search reports | excluded | excluded | excluded |
| Out of scope: LED, solar-cell or OLED packaging only |  |  | 501 |
| Family also filed at US | 3,614 (82.5%) | 2,197 (59.7%) | 5,811 (72.1%) |
| Family also filed at CN | 2,800 (63.9%) | 1,870 (50.8%) | 4,670 (57.9%) |
| Family also filed at KR / JP / TW | 1,578 / 1,271 / 1,134 | 757 / 671 / 681 | 2,335 / 1,942 / 1,815 |
| Family also filed via PCT (WO) | 683 (15.6%) | 827 (22.5%) | 1,510 (18.7%) |
| Family also filed at US / JP / KR | 3,741 (85.4%) | 2,311 (62.8%) | 6,052 (75.1%) |
| Family also filed at US / JP / KR / CN | 3,824 (87.3%) | 2,446 (66.5%) | 6,270 (77.8%) |
| National application with an EP family member | — | 454 (12.3%) |  |

**Filing-date view.** The median filing date is 2024-09-13 overall: 2024-10-24 for EP and 2024-07-24 for national applications. Publication follows filing by about 18 months, so the window mostly covers inventions filed from 2023 to early 2025.

**Kind codes.** EP first publications are A1 (with search report) or A2 (without). National first publications are mostly A1 or A (DE, FR, GB), plus some B4 grants without a prior publication (DE). Utility models (U), EP translations (T) and supplementary search reports (A4) are excluded.

**Why the scope differs from a legacy H01L study.** CPC 2025.01 and 2026.01 moved semiconductor devices to H10D and packaging and processes to the new subclasses **H10W** and **H10P**. No document in the window still carries legacy H01L 21/23/25/27/29. A study with the old code list would miss most of the corpus; the first build of this study missed H10W/H10P and was redone. Selection is by CPC only, because EPO and European national documents carry CPC; the CN/TW study needed IPC as well (see section 11).

The two comparison windows are ten months each, Nov 2024–Aug 2025 (Y1) and Nov 2025–Aug 2026 (Y2), because the data ends in mid-September 2026.

## 3. Technology rankings

Packaging dominates by volume: the three largest categories, thermal management, encapsulation and power-module packaging, each sit on about 14% of filings. Counting is **full**: an application counts in every category it matches, so shares add up to more than 100%. Change = like-for-like windows (Nov 2024–Aug 2025 vs Nov 2025–Aug 2026). Baselines: all −4.6% (3,695 → 3,525), EP +1.1% (1,937 → 1,959), national −10.9% (1,758 → 1,566). Treat changes on fewer than about 30 applications as indicative only.

### Top 22 of 61 categories

| Technology | Code basis | Apps | Families | Share | Change | Top 5 applicants (apps) |
| --- | --- | --- | --- | --- | --- | --- |
| Thermal management | H10W40, H10W90/288 | 1,180 | 1,097 | 14.6% | −9% | Bosch 91; Infineon 89; ZF 71; Intel 44; Mitsubishi Electric 28 |
| Encapsulation & device protection | H10W74, H10W42 | 1,154 | 1,080 | 14.3% | −11% | Infineon 160; Intel 102; STMicroelectronics 79; NXP 78; TSMC 62 |
| Power-module & discrete packaging | H10D80/2, H10W90/73–81, H10W76 + text | 1,127 | 1,059 | 14.0% | +2% | Infineon 160; Nexperia 69; Intel 63; Bosch 62; Mitsubishi Electric 52 |
| On-chip interconnect (BEOL) | H10W20 | 1,093 | 1,039 | 13.6% | −8% | Samsung 224; Intel 206; TSMC 126; STMicroelectronics 43; Infineon 38 |
| 2.5D, chiplets, interposers & RDL | H10W70/61, H10W90/10, /40, /724 + text | 896 | 848 | 11.1% | +1% | Intel 158; Samsung 61; Infineon 60; TSMC 54; NXP 47 |
| CMOS / logic device integration | H10D84/01, /83, /85 | 853 | 821 | 10.6% | +16% | Intel 233; Samsung 188; TSMC 161; imec 39; Infineon 28 |
| Wafer handling & fab equipment | H10P72 | 740 | 680 | 9.2% | −15% | Screen Holdings 42; ASML 39; Kokusai Electric 37; TSMC 26; LPE 21 |
| GAA / nanosheet / nanowire FET | H10D30/43, /50x, /014, /019x, /6735, H10D84/851–852 + text | 683 | 668 | 8.5% | +18% | Intel 233; Samsung 176; TSMC 145; imec 39; CEA 23 |
| 3D chip stacking & TSV | H10W90/2x, H10W70/635 + text | 620 | 587 | 7.7% | +33% | Intel 153; Samsung 81; TSMC 57; Absolics 29; NXP 26 |
| Quantum processor architecture & qubit control | G06N10/40 + text | 502 | 460 | 6.2% | −14% | Fujitsu 32; Infineon 32; Alice & Bob 31; eleQtron 30; Pasqal 29 |
| Quantum algorithms & software | G06N10/20, /60, /80 | 478 | 453 | 5.9% | +2% | Fujitsu 74; Multiverse Computing 22; Alice & Bob 19; Pasqal 18; Tata Consultancy 15 |
| Thin-film transistors (display, oxide TFT) | H10D30/67xx, /031, H10D86/4, /6 + text | 456 | 431 | 5.7% | +9% | LG 151; Samsung 127; BOE 41; Intel 22; TSMC 22 |
| Deposition & layer formation (incl. epitaxy) | H10P14 | 438 | 401 | 5.4% | −28% | CEA 33; TSMC 29; Kokusai Electric 28; Intel 25; Soitec 21 |
| Power MOSFET (trench, LDMOS, superjunction) | H10D30/66, /65, /028–029, H10D84/141 + text | 423 | 401 | 5.2% | −10% | Infineon 118; Nexperia 35; Bosch 34; STMicroelectronics 32; Mitsubishi Electric 29 |
| Hybrid / direct bonding | H10W80, H10W90/79, H10P10 + text | 413 | 390 | 5.1% | +6% | Samsung 65; Intel 63; TSMC 43; Soitec 32; CEA 29 |
| Integrated passives | H10D1, H10W20/49 | 396 | 378 | 4.9% | +15% | Samsung 68; Intel 38; CEA 24; TSMC 24; NXP 20 |
| Silicon carbide (SiC) | H10D62/8325 + text | 324 | 306 | 4.0% | −13% | Infineon 63; Mitsubishi Electric 30; STMicroelectronics 30; Bosch 27; Soitec 19 |
| Wafer preparation & other processes | H10P90, H10P95 | 309 | 292 | 3.8% | −26% | Soitec 81; CEA 46; TSMC 13; STMicroelectronics 11; Infineon 9 |
| FinFET | H10D30/62, /024, H10D84/853 + text | 303 | 300 | 3.8% | +4% | TSMC 108; Samsung 80; Intel 62; Bosch 7; imec 7 |
| Etching | H10P50 | 292 | 268 | 3.6% | −28% | Shin-Etsu 39; TSMC 28; CEA 23; SPTS 20; Samsung 14 |
| Gallium nitride / III-nitrides | H10D62/8503, /824 + text | 290 | 254 | 3.6% | −2% | STMicroelectronics 44; Infineon 29; Bosch 28; Samsung 28; CEA 24 |
| RF / impedance matching in packages | H10W44 | 284 | 265 | 3.5% | −26% | NXP 39; Intel 30; Infineon 21; Samsung 12; STMicroelectronics 11 |

Not categorised beyond domain level: 334 applications (4.1%), for example those with only electrode or connector codes. Categories 23–61 are in section 4. The full table with the basis of every assignment (CPC only, CPC + text, text only) is in the BigQuery table `patent_study.application_list`.

## 4. Per-domain breakdown

Domain 1 (transistors, materials, memory and processes) is the largest: 4,793 applications (EP 2,734 · national 2,059). Domain 2 (integration, packaging and design) is 4,236 (EP 2,162 · national 2,074). Quantum is 924 (EP 593 · national 331). Domains overlap: one application can sit in several. EP and national columns below are counts over the whole window; change is like-for-like Y1 → Y2.

### Domain 1 — devices, materials, memory and processes (beyond the top table)

| Sub-technology | Apps | Change | EP | National | Leading applicants |
| --- | --- | --- | --- | --- | --- |
| DRAM | 251 | +27% | 219 | 32 | Samsung 166; SK hynix 20; imec 9 |
| Memory assemblies (HBM, memory–logic stacks) | 251 | +17% | 193 | 58 | Samsung 115; Intel 37; TSMC 17 |
| IGBT | 245 | −6% | 75 | 170 | Infineon 75; Mitsubishi Electric 65; Nexperia 14 |
| 3D NAND / flash | 233 | −8% | 177 | 56 | Samsung 82; YMTC 37; SK hynix 21 |
| Oxide semiconductors (IGZO) | 225 | +20% | 132 | 93 | LG 75; Samsung 57; Semiconductor Energy Lab 13 |
| In-line testing & metrology | 217 | −19% | 110 | 107 | Samsung 20; Infineon 17; STMicroelectronics 12 |
| HEMT (GaN / III-V) | 208 | +2% | 148 | 60 | STMicroelectronics 36; Samsung 29; Infineon 22 |
| SiGe / Ge | 204 | +23% | 109 | 95 | TSMC 69; Samsung 52; Intel 48 |
| CMP, grinding, cutting & dicing | 201 | −8% | 102 | 99 | STMicroelectronics 19; Mitsubishi Electric 13; TSMC 13 |
| Power & Schottky diodes | 191 | +7% | 86 | 105 | Infineon 33; STMicroelectronics 26; Mitsubishi Electric 22 |
| Doping (implantation, diffusion) | 178 | −36% | 73 | 105 | Infineon 28; STMicroelectronics 15; Mitsubishi Electric 11 |
| ESD & protection structures | 177 | −27% | 110 | 67 | Samsung 20; STMicroelectronics 18; NXP 17 |
| ReRAM / phase-change memory | 169 | −19% | 96 | 73 | CEA 36; Samsung 31; STMicroelectronics 22 |
| Lithography & masks (process) | 129 | −40% | 94 | 35 | Shin-Etsu 50; TSMC 13; imec 7 |
| FeRAM | 96 | −24% | 66 | 30 | Samsung 26; CEA 23; Intel 9 |
| MRAM | 89 | −8% | 53 | 36 | Samsung 21; Everspin 10; IBM 9 |
| 2D materials (graphene, TMDs) | 84 | 0% | 59 | 25 | Samsung 16; CEA 13; Intel 13 |
| SRAM | 75 | +92% | 35 | 40 | TSMC 27; Intel 18; Samsung 13 |
| SOI / engineered substrates | 72 | +31% | 52 | 20 | GlobalFoundries 23; Samsung 7; STMicroelectronics 7 |
| Bipolar transistors / HBT | 66 | −18% | 42 | 24 | GlobalFoundries 23; STMicroelectronics 8; Infineon 6 |
| Wafer cleaning | 63 | +8% | 36 | 27 | Screen Holdings 7; TSMC 6; Sumitomo Electric 5 |
| CFET (stacked complementary FET) | 43 | +190% | 22 | 21 | TSMC 15; imec 11; Intel 8 |
| Ferroelectric FET (FeFET) | 41 | +25% | 31 | 10 | Samsung 16; Intel 6; CEA 4 |
| 2D-material & carbon-nanotube FETs | 39 | +57% | 30 | 9 | Samsung 14; Intel 6; CEA 5 |
| Diamond | 24 | +10% | 7 | 17 | CEA 5; Mitsubishi Electric 5; Soitec 3 |
| Gallium oxide (Ga2O3) | 6 | 4 → 2 | 2 | 4 | Bosch 3; Disco 1; Hangzhou Fujia Gallium 1 |

Transistor filings split into two groups with almost no overlap in applicants. **Advanced logic** (GAA 683, FinFET 303, CFET 43) is held by Intel, Samsung and TSMC: they file 554 of the 683 GAA applications. **Power devices** (power MOSFET 423, IGBT 245, HEMT 208, diodes 191) are held by European and Japanese firms: Infineon leads power MOSFETs (118) and IGBTs (75). 186 of the 208 HEMT applications also carry the GaN category, and 169 of the 423 power MOSFETs are SiC devices. Display TFTs (456) are a Korean field: LG and Samsung hold 61%.

Material platforms, by count: SiC 324 > GaN 290 > oxide 225 > SiGe 204 > 2D 84 > diamond 24 > Ga2O3 6. Wide-bandgap power work is led by Infineon, STMicroelectronics, Mitsubishi Electric and Bosch. Memory is Samsung's field (DRAM 66%, HBM-type assemblies 46%); Europe's role is in emerging memories, where CEA leads ReRAM/PCM and is second in FeRAM. Process filings (eight of nine categories down) are led by suppliers: Screen, ASML and Kokusai in equipment; Shin-Etsu in lithography materials and etching; Soitec in wafer preparation.

### Domain 2 — integration, packaging and design

| Sub-technology | Apps | Change | EP | National | Leading applicants |
| --- | --- | --- | --- | --- | --- |
| Power-module & discrete packaging | 1,127 | +2% | 507 | 620 | Infineon 160; Nexperia 69; Intel 63; Bosch 62 |
| 2.5D, chiplets, interposers & RDL | 896 | +1% | 507 | 389 | Intel 158; Samsung 61; Infineon 60; TSMC 54 |
| 3D chip stacking & TSV | 620 | +33% | 393 | 227 | Intel 153; Samsung 81; TSMC 57; Absolics 29 |
| Hybrid / direct bonding | 413 | +6% | 229 | 184 | Samsung 65; Intel 63; TSMC 43; Soitec 32; CEA 29 |
| RF / impedance matching in packages | 284 | −26% | 170 | 114 | NXP 39; Intel 30; Infineon 21 |
| Monolithic 3D integration | 261 | +21% | 169 | 92 | Samsung 73; Intel 48; TSMC 47; imec 29 |
| Glass & ceramic package substrates | 209 | +56% | 126 | 83 | Intel 87; Absolics 38; Infineon 11 |
| Standard-cell / device layout & routing | 184 | +37% | 116 | 68 | Samsung 65; TSMC 40; Intel 27 |
| Backside power delivery | 167 | −26% | 132 | 35 | Samsung 67; Intel 59; IBM 14 |
| IC layout & physical design (EDA) | 150 | −32% | 101 | 49 | Samsung 23; Intel 14; TSMC 14 |
| Fan-out & wafer/panel-level packaging | 15 | 0 → 12 | 14 | 1 | Silicon Box 5; Infineon 2; Samsung 2 |

The domain has two halves. Automotive and power packaging (thermal, encapsulation, power modules) is led by Infineon, Bosch, ZF, Nexperia and Volkswagen, and is filed mostly at national offices. Advanced logic packaging (chiplets, 3D stacking, hybrid bonding, glass substrates) is led by Intel, Samsung and TSMC; Europe's visible contributors are Soitec, CEA and imec. Backside power delivery is tied to GAA logic (114 of its 167 applications are also GAA filings). EDA vendors do not appear among the leaders. Fan-out packaging has no own CPC group and is found by keyword only, so it is almost certainly undercounted.

### Domain 3 — quantum

| Sub-technology | Apps | Change | EP | National | Leading applicants |
| --- | --- | --- | --- | --- | --- |
| Processor architecture & qubit control | 502 | −14% | 310 | 192 | Fujitsu 32; Infineon 32; Alice & Bob 31; eleQtron 30; Pasqal 29 |
| Algorithms & software | 478 | +2% | 357 | 121 | Fujitsu 74; Multiverse Computing 22; Alice & Bob 19; Pasqal 18 |
| Error correction | 206 | +46% | 144 | 62 | Alice & Bob 26; Fujitsu 24; Riverlane 12; Microsoft 10; Xanadu 10 |
| Superconducting qubits (incl. cat qubits) | 173 | +3% | 109 | 64 | Alice & Bob 26; CEA 22; Fujitsu 15; CNRS 6 |
| Semiconductor spin qubits / quantum dots | 83 | −30% | 38 | 45 | CEA 35; TU Delft 12; Quantum Technologies GmbH 5 |
| Trapped-ion | 45 | −61% | 26 | 19 | Infineon 20; eleQtron 16; Univ. Siegen 5 |
| Photonic quantum computing | 25 | +63% | 13 | 12 | Quandela 3; SaxonQ 3; DLR 2; PsiQuantum 2; Q.ANT 2 |
| Neutral atoms | 14 | −14% | 12 | 2 | Pasqal 5; Max Planck Society 3; LMU Munich 2 |
| Topological / Majorana | 8 | 4 → 3 | 5 | 3 | TU Delft 3; Microsoft 2 |

The quantum domain (924) was flat (404 → 403). 630 applications concern hardware (a qubit platform or G06N10/40), 253 algorithms or error correction only; 319 could be assigned to a specific platform. Platform counts depend on title and abstract keywords (searched in English, German and French), because CPC has platform groups only for superconducting (H10N60) and spin-qubit devices. Other notable filers: Multiverse Computing (23), TU Delft (20), Microsoft (18), DLR (17), Terra Quantum (17), Fraunhofer (15), Bull, IQM, Riverlane and Xanadu (14 each).

### Extensions

Not queried in the EP study. The CN/TW study reports quantum communication and sensing (QKD, magnetometry, atomic clocks) and equipment (lithography tools, CVD/ALD, plasma equipment) as separate extension sets. Here, wafer handling and fab equipment (H10P72, 740) is the only equipment category, and it sits in the core scope.

## 5. Top applicants

**Concentration is high on both routes.** The top 5 groups hold 30.2% of all filings (2,438 of 8,062: Samsung, Intel, Infineon, TSMC, STMicroelectronics). At the EPO the top 5 hold 34.4% (Samsung 719, Intel 332, NXP 169, STMicroelectronics 151, Infineon 135); at national offices 37.8% (Infineon 373, TSMC 352, Bosch 245, Intel 228, Mitsubishi Electric 192). Applicants are grouped under parents (rules in section 11). Change = like-for-like windows; compare against the baseline (−4.6%).

### Top 20

| # | Applicant (parent) | Type | Country | Apps | Y1 → Y2 | Technology profile (top 3) |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Samsung (Electronics, Display, Electro-Mechanics) | company | KR | 720 | 335 → 314 (−6%) | GAA; DRAM; TFT |
| 2 | Intel | company | US | 560 | 196 → 293 (+49%) | GAA; 2.5D/chiplets; 3D stacking/TSV |
| 3 | Infineon (all entities) | company | DE | 508 | 227 → 216 (−5%) | power-module packaging; power MOSFET; IGBT |
| 4 | TSMC | company | TW | 352 | 175 → 171 (−2%) | GAA; FinFET; SiGe |
| 5 | STMicroelectronics | company | CH | 298 | 150 → 114 (−24%) | power-module packaging; GaN; HEMT |
| 6 | CEA | research institute | FR | 288 | 143 → 127 (−11%) | ReRAM/PCM; spin qubits; deposition |
| 7 | Bosch | company | DE | 247 | 119 → 95 (−20%) | power-module packaging; power MOSFET; 2.5D/chiplets |
| 8 | Mitsubishi Electric | company | JP | 194 | 76 → 97 (+28%) | IGBT; power-module packaging; SiC |
| 9 | NXP | company | NL | 169 | 90 → 70 (−22%) | power-module packaging; 2.5D/chiplets; RF packaging |
| 10 | LG (Display, Electronics, Innotek) | company | KR | 163 | 71 → 81 (+14%) | TFT; oxide semiconductors |
| 11 | Nexperia | company | NL | 154 | 64 → 83 (+30%) | power-module packaging; power MOSFET; 2.5D/chiplets |
| 12 | imec | research institute | BE | 129 | 60 → 52 (−13%) | GAA; monolithic 3D; integrated passives |
| 13 | ZF Friedrichshafen | company | DE | 110 | 74 → 28 (−62%) | power-module packaging; 2.5D/chiplets |
| 14 | Fujitsu | company | JP | 101 | 20 → 60 (+200%) | quantum algorithms; qubit control; error correction |
| 15 | GlobalFoundries | company | US | 96 | 42 → 42 (0%) | bipolar/HBT; SOI; integrated passives |
| 16 | Soitec | company | FR | 93 | 40 → 33 (−18%) | hybrid bonding; deposition; SiC |
| 17 | IBM | company | US | 67 | 53 → 14 (−74%) | GAA; backside power; ReRAM/PCM |
| 18 | Shin-Etsu | company | JP | 66 | 40 → 21 (−48%) | lithography/masks; etching; deposition |
| 19 | SK hynix | company | KR | 64 | 26 → 34 (+31%) | 3D NAND; DRAM; HBM-type assemblies |
| 20 | Volkswagen | company | DE | 57 | 15 → 34 (+127%) | power-module packaging; 2.5D/chiplets; glass substrates |
| 20 | Broadcom | company | US | 57 | 29 → 23 (−21%) | 2.5D/chiplets; 3D stacking/TSV; power-module packaging |

Next five: Renesas (JP) 56 (−42%), onsemi (US) 55 (+169%), Texas Instruments (US) 53 (−31%), Kokusai Electric (JP) 51 (−44%), ASML (NL) 50 (+56%) and BOE (CN) 50 (+33%), tied.

Ten of the top 21 are European, including two research institutes (CEA, imec), two automotive suppliers (Bosch, ZF) and one carmaker (Volkswagen). The profile excludes the five catch-all categories (CMOS integration, BEOL, thermal, encapsulation, other wafer processes). STMicroelectronics (230 families) and CEA (189 families) have notably fewer families than applications because they file the same invention at the French or Italian office and at the EPO. IBM's fall reflects its use of the PCT route (138 Euro-PCT applications in the window).

**Applicant types (share of filings with at least one applicant of that type):**

| Type | Apps | Share |
| --- | --- | --- |
| Company | 7,179 | 89.0% |
| University | 258 | 3.2% |
| Research institute | 640 | 7.9% |
| University or institute | 828 | 10.3% |
| Individual | 27 | 0.3% |
| Not classified (no applicant or unsuffixed name) | 184 | 2.3% |

By route, universities or institutes appear on 9.8% of EP filings (430) and 10.8% of national filings (398). In quantum the academic share is 28.9% (267 of 924).

## 6. Quarterly time series

Volume is flat at about 1,000–1,350 applications per complete quarter through Q2 2026. EP filings are stable; national filings drift down. Among the ten largest specific technologies, only gate-all-around transistors (+18%) and 3D stacking/TSV (+33%) rose clearly, both with a jump in Q2 2026.

*[Chart in the PDF version. Source: Google Patents Public Datasets (BigQuery), queried 1 Nov 2026 · first publications, complete quarters Q1 2025 – Q2 2026 · change = Nov–Aug vs Nov–Aug]*

The publication-lag boundary is the last complete month, August 2026; Q4 2024 covers only November and December, and Q3 2026 only July to mid-September. Both partial quarters are left out of the chart. Italian data stops after December 2025 and British data thins in 2026, which depresses national counts from 2026 on.

**Applications by quarter and route** (incomplete quarters in brackets):

| Route | \[24-Q4\] | 25-Q1 | 25-Q2 | 25-Q3 | 25-Q4 | 26-Q1 | 26-Q2 | \[26-Q3\] |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EP (direct) | 265 | 548 | 747 | 543 | 670 | 455 | 690 | 464 |
| National offices | 288 | 540 | 599 | 507 | 443 | 420 | 570 | 313 |
| **All** | **553** | **1,088** | **1,346** | **1,050** | **1,113** | **875** | **1,260** | **777** |

**Top 10 technologies by quarter:**

| Technology | \[24-Q4\] | 25-Q1 | 25-Q2 | 25-Q3 | 25-Q4 | 26-Q1 | 26-Q2 | \[26-Q3\] |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Thermal management | 82 | 151 | 197 | 179 | 144 | 131 | 179 | 117 |
| Encapsulation | 74 | 170 | 192 | 153 | 164 | 126 | 169 | 106 |
| Power-module packaging | 74 | 141 | 179 | 163 | 144 | 130 | 178 | 118 |
| BEOL interconnect | 89 | 164 | 168 | 128 | 159 | 93 | 196 | 96 |
| 2.5D / chiplets | 56 | 112 | 146 | 124 | 109 | 102 | 151 | 96 |
| CMOS integration | 55 | 111 | 118 | 94 | 164 | 85 | 140 | 86 |
| Wafer handling & equipment | 53 | 114 | 124 | 93 | 101 | 81 | 105 | 69 |
| GAA / nanosheet | 48 | 86 | 98 | 66 | 136 | 62 | 121 | 66 |
| 3D stacking / TSV | 28 | 78 | 91 | 62 | 79 | 75 | 125 | 82 |
| Quantum processor & control | 47 | 71 | 78 | 66 | 61 | 58 | 74 | 47 |

Quarterly counts swing by up to a factor of two (EP publication batches), so single quarters say little. The decline in process categories (deposition, etching, lithography, doping) may partly be a classification effect: H10P only came into force with CPC 2026.01, and recently published documents may not yet carry their final H10P codes. Read those drops as provisional until a later re-run confirms them.

## 7. Origin of filings

The EPO is an international market: two thirds of direct EP filings (66.0%) come from applicants outside the EPO states. The national offices are a European home market: 55.3% of their filings have a European first-named applicant, most of them German.

### a) Priority office (earliest priority claim, data-derived)

Every application in the corpus carries at least one priority claim.

| Priority office | All | At EP | At national offices |
| --- | --- | --- | --- |
| United States | 2,289 (28.4%) | 1,366 | 923 |
| Germany | 1,240 (15.4%) | 61 | 1,179 |
| EPO (first filing at the EPO) | 1,003 (12.4%) | 987 | 16 |
| South Korea | 1,000 (12.4%) | 837 | 163 |
| Japan | 760 (9.4%) | 390 | 370 |
| France | 620 (7.7%) | 170 | 450 |
| Mainland China | 345 (4.3%) | 282 | 63 |
| United Kingdom | 159 | 45 | 114 |
| Italy | 157 | 80 | 77 |
| Netherlands | 137 | 27 | 110 |
| Taiwan | 116 | 64 | 52 |
| Finland, India, Sweden, Austria | 68, 40, 27, 24 |  |  |

Many Taiwanese applicants (TSMC above all) claim **US first filings**: Taiwanese applicants file 569 applications, but only 116 carry a TW priority. German first filings stay national: 1,179 national applications claim a German priority, against only 61 direct EP applications.

### b) Filing route

PCT-route filings are excluded by design, so every application here was filed directly. 54% go to the EPO (4,382), and the German office is the second channel (2,590). Only 454 national applications (12.3%) belong to families that also have an EP member in the data. The applicant mix differs sharply by route. Samsung (719 of 720), NXP, imec, Fujitsu and Shin-Etsu file almost only at the EPO. TSMC (all 352), Bosch (244 of 247), Mitsubishi Electric (191 of 194) and Renesas (all 56) file almost only at the German office, and Soitec at the French office (90 of 93). Infineon (370 DE, 135 EP) and Intel (219 DE, 332 EP) use both routes.

Excluded PCT applicants in the same window (Euro-PCT semiconductor applications): Qualcomm 188, Huawei 140, IBM 138, Applied Materials 131, BOE 83, Google 74, Microsoft 71, Entegris 55, CXMT 52, Quantinuum 50.

### c) Europe

Applicants from EPO member states file 3,525 applications (43.7%, first-named applicant), of which EU27 3,088 (38.3%), Switzerland 337 and the UK 89. The largest are Infineon 508, STMicroelectronics 298, CEA 288, Bosch 247, NXP 169, Nexperia 154, imec 129, ZF 110 and Soitec 93. In quantum, 70% of filings (649 of 924) have a European first-named applicant. 241 records carry no applicant country.

### d) Applicant origin by route

| First-named applicant country | At EP | At national offices | All |
| --- | --- | --- | --- |
| Germany | 312 | 1,158 | 1,470 |
| United States | 957 | 402 | 1,359 |
| South Korea | 938 | 146 | 1,084 |
| Japan | 432 | 375 | 807 |
| Taiwan | 144 | 425 | 569 |
| France | 225 | 337 | 562 |
| Netherlands | 287 | 104 | 391 |
| Switzerland | 227 | 110 | 337 |
| Mainland China | 233 | 40 | 273 |
| Austria | 111 | 136 | 247 |
| United Kingdom | 53 | 36 | 89 |
| **EPO member states** | **1,491 (34.0%)** | **2,034 (55.3%)** | **3,525 (43.7%)** |

Korean and Chinese applicants enter Europe almost only through the EPO; Taiwanese applicants mostly through the German office (TSMC). Family links run deeper than direct filings: 57.9% of the corpus belongs to families that also have a CN member and 22.5% a TW member (section 2).

### e) Inventor countries

Inventor countries come from Google's harmonised inventor data and are known for 7,912 of the 8,062 applications; Italian national filings carry no inventor data. By inventor location, Europe contributes 45% of the corpus (3,536 applications, fractional count), Asia 37% (2,907) and North America 18% (1,433). That is about the same as Europe's applicant share (43.7%): European inventors and European applicants largely coincide.

*[Chart in the PDF version. Source: Google Patents Public Datasets (BigQuery), inventor\_harmonized country codes, queried 2 Nov 2026 · 7,912 of 8,062 applications with inventor data · top 15 countries]*

**Research is regional, not global.** Only 370 applications (4.7%) name inventors from more than one world region; 3,399 are purely European, 2,784 purely Asian and 1,331 purely North American. Of the 3,658 applications with at least one European inventor, 3,353 (92%) have a European first-named applicant, 195 a North American and 71 an Asian one.

**Share of inventor input by domain and technology** (fractional, rows may not add to 100% because of rounding and other regions):

| Domain / technology | Applications | Europe | Asia | N. America | of which DE | FR | AT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Quantum (domain) | 894 | 71% | 15% | 13% | 25% | 17% | 3% |
| Processes and equipment (domain) | 1,805 | 50% | 37% | 12% | 16% | 13% | 2% |
| Integration and packaging (domain) | 4,030 | 43% | 35% | 22% | 21% | 8% | 2% |
| Transistors and devices (domain) | 2,867 | 31% | 48% | 21% | 9% | 8% | 3% |
| Design (domain) | 293 | 26% | 43% | 30% | 9% | 5% | 1% |
| Memory (domain) | 921 | 17% | 63% | 21% | 1% | 10% | 0% |
| Trapped-ion qubits | 45 | 99% | 1% | 0% | 72% | 0% | 25% |
| Semiconductor spin qubits | 82 | 90% | 2% | 7% | 17% | 43% | 1% |
| Superconducting qubits | 169 | 78% | 12% | 10% | 15% | 33% | 1% |
| Gallium nitride | 280 | 61% | 23% | 16% | 15% | 19% | 5% |
| Silicon carbide | 316 | 57% | 36% | 7% | 25% | 7% | 11% |
| Power MOSFET | 410 | 53% | 37% | 11% | 26% | 2% | 13% |
| HEMT | 201 | 52% | 28% | 21% | 6% | 17% | 4% |
| Power-module packaging | 1,106 | 49% | 35% | 16% | 30% | 5% | 2% |
| IGBT | 241 | 42% | 53% | 5% | 21% | 1% | 12% |
| 2.5D / chiplets | 891 | 32% | 34% | 34% | 16% | 4% | 3% |
| Hybrid bonding | 408 | 32% | 40% | 28% | 6% | 14% | 2% |
| 3D stacking / TSV | 619 | 18% | 38% | 44% | 5% | 4% | 1% |
| GAA / nanosheet FET | 683 | 13% | 43% | 44% | 2% | 4% | 0% |
| FinFET | 303 | 8% | 58% | 33% | 2% | 1% | 1% |
| DRAM | 251 | 5% | 85% | 10% | 1% | 1% | 0% |
| Thin-film transistors | 456 | 4% | 88% | 8% | 1% | 3% | 0% |

**Inside the companies: where their inventors are** (fractional share of each group's inventor input):

| Applicant | Applications with inventor data | Inventor countries |
| --- | --- | --- |
| Infineon | 507 | Germany 57% · Austria 25% · Malaysia 8% · Canada 3% · USA 2% |
| STMicroelectronics | 249 | France 57% · Italy 31% · Singapore 3% (Italian filings lack inventor data) |
| NXP | 169 | Netherlands 91% · France 7% |
| Nexperia | 154 | UK 31% · Germany 22% · China 16% · Netherlands 11% · Hong Kong 11% |
| Bosch | 247 | Germany 93% · Hungary 4% |
| GlobalFoundries | 96 | USA 61% · Germany 14% · Singapore 13% · India 9% |
| Huawei | 43 | China 52% · Germany 43% · Belgium 5% |
| Texas Instruments | 53 | USA 62% · Germany 12% · Philippines 8% |
| onsemi | 55 | USA 41% · China 12% · Korea 11% · Czechia 7% |
| Intel | 560 | USA 93% · Germany 2% |
| Samsung | 720 | Korea 86% · USA 14% |
| TSMC | 352 | Taiwan 100% |

**Austria.** 261 applications name at least one inventor in Austria. Infineon accounts for 188 of them (72%), followed by AT&S (23, all entities), TDK Electronics (10), Miba Sinter (8) and Alpine Quantum Technologies (4). Infineon's Austrian-invented applications centre on power semiconductors: power MOSFETs 81, SiC 50, IGBTs 44, power-module packaging 23, doping processes 21. They also include quantum work: qubit control 22 and trapped-ion 14. Of the 188, 95 were filed by Infineon Technologies Austria AG and 93 by the German parent, so counting by applicant entity alone would hide half of the Austrian output.

**City level (e.g. Villach) is not in this dataset**, which records only the inventor's country. The EPO Register has published each inventor's place of residence (city and postcode) since November 2021 ([OJ EPO 2021, A12](https://www.epo.org/en/legal/official-journal/2021/02/a12)). For the EP applications, a Villach count is therefore possible as a second step. Note that it measures where inventors live, not where they work: Villach-site staff living in Klagenfurt would not show up as Villach.

### f) Applicant locations by city (verified, data-derived)

Unlike the CN regions in the CN/TW study, which are inferred from the headquarters of the top 50 applicants, applicant locations here are verified per filing entity (Wikidata headquarters, USPTO applicant addresses re-geocoded against Overture Maps, and manual checks of registers and company websites; method in section 11). The located unit is the applicant entity on the filing, so a subsidiary sits at its own address: Infineon Technologies Austria AG in Villach, Infineon Technologies AG in Neubiberg. Counts are applications per filing-entity city (full count).

| City | Apps | Main applicants |
| --- | --- | --- |
| Suwon (KR) | 628 | Samsung |
| Santa Clara (US) | 583 | Intel |
| Tokyo (JP) | 512 | Mitsubishi Electric, Fujitsu, Renesas, Kokusai Electric |
| Hsinchu (TW) | 453 | TSMC, MediaTek, UMC (incl. 83 recorded as "Hsinchu City") |
| Paris (FR) | 375 | CEA, CNRS, Alice & Bob |
| Plan-les-Ouates (CH) | 295 | STMicroelectronics |
| Neubiberg (DE) | 295 | Infineon |
| Gerlingen (DE) | 247 | Bosch |
| Seoul (KR) | 240 | LG, Hyundai |
| Villach (AT) | 185 | Infineon Technologies Austria |
| Nijmegen (NL) | 165 | Nexperia |
| Leuven (BE) | 145 | imec |
| Munich (DE) | 127 |  |
| Singapore (SG) | 123 |  |
| Friedrichshafen (DE) | 110 | ZF |
| Austin (US) | 100 | NXP (US entity) |
| Bernin (FR) | 93 | Soitec |
| Yongin (KR) | 93 |  |
| Malta, NY (US) | 83 | GlobalFoundries |
| Eindhoven (NL) | 72 |  |
| Armonk (US) | 67 | IBM |

The interactive atlas shows all located applicants on a map, with sources and precision per record. About 40% of institutional filing entities, holding about 10% of applicant mentions, could not be located below country level; they are not placed at a national centroid. Private inventors are kept at country level, and no residential information was searched.

## 8. Emerging technologies

The logic generation after GAA (CFET, SRAM, 2D-channel FETs) and packaging for AI chips (glass substrates) are the fastest-growing fronts, together with quantum error correction. Rule (as in the CN/TW study, with a threshold adapted to the smaller corpus): at least +40% like-for-like and at least 20 applications in the later window.

| Technology | Y1 → Y2 | Change | Example publications (later window) |
| --- | --- | --- | --- |
| CFET (stacked complementary FET) | 10 → 29 | +190% | [DE102025118029A1](https://patents.google.com/patent/DE102025118029A1) (TSMC); [DE102025148495A1](https://patents.google.com/patent/DE102025148495A1) (Intel); [EP4793814A1](https://patents.google.com/patent/EP4793814A1) (imec) |
| SRAM | 24 → 46 | +92% | [DE102025149977A1](https://patents.google.com/patent/DE102025149977A1) (TSMC); [DE102025147699A1](https://patents.google.com/patent/DE102025147699A1) memory architectures with backside metal-zero bit lines (Intel); [EP4770329A2](https://patents.google.com/patent/EP4770329A2) (Samsung) |
| 2D-material & carbon-nanotube FETs | 14 → 22 | +57% | [EP4780161A1](https://patents.google.com/patent/EP4780161A1) (Samsung); [EP4791140A1](https://patents.google.com/patent/EP4791140A1) (Intel); [FR3166241A1](https://patents.google.com/patent/FR3166241A1) (CEA) |
| Glass & ceramic package substrates | 75 → 117 | +56% | [DE112019008036B4](https://patents.google.com/patent/DE112019008036B4) (Intel); [EP4770286A1](https://patents.google.com/patent/EP4770286A1) packaging substrate (Absolics); [DE102016016004B4](https://patents.google.com/patent/DE102016016004B4) (Infineon) |
| Quantum error correction | 72 → 105 | +46% | [EP4793836A1](https://patents.google.com/patent/EP4793836A1) (Fujitsu); [EP4786411A2](https://patents.google.com/patent/EP4786411A2) measuring an observable of a cat qubit (Alice & Bob); [EP4722992A1](https://patents.google.com/patent/EP4722992A1) (Xanadu) |

Just below the +40% bar: standard-cell / device layout 71 → 97 (+37%), 3D stacking/TSV 238 → 317 (+33%), SOI / engineered substrates 29 → 38 (+31%). Very small bases: fan-out packaging 0 → 12, photonic quantum computing 8 → 13. Backside power delivery, often named as a next-node technology, fell 26% (88 → 65).

**New applicants** (none in the earlier window, at least 5 in the later one). This is new *within the study window*, since earlier history was not queried.

- Musco Corp (US, 10), Nvidia (US, 7), Bitdeer Semiconductor (SG, 7), Aehr Test Systems (US, 6), Nu Quantum (GB, 6, quantum networking), Chongqing Innoevsic (CN, 5), Guangzhou CSOT (CN, 5), Ultraband Tech (TW, 5), Ampere SAS (FR, 5).

**Fastest-rising title terms: not used.** Titles in this corpus are in German, French and English (national offices publish in their own language), so bigram counts mostly reflect the language mix ("und herstellungsverfahren", "un dispositif") rather than technology. This is the same reason the CN/TW study did not use the TW `top_terms`.

## 9. EP vs national comparison

The two routes show opposite profiles. Direct EP filings over-weight memory and leading-edge logic: DRAM 5.8×, backside power 3.2×, HBM-type memory assemblies 2.8×, 3D NAND 2.7×, quantum algorithms 2.5×, lithography and masks 2.3×, SOI 2.2× and HEMT 2.1× (share among EP filings ÷ share among national filings; categories with at least 60 applications). National filings over-weight power electronics and process steps: IGBT 2.7×, wafer preparation 2.2×, doping 1.7×, power MOSFET 1.5×, and power-module packaging, power diodes, thermal management and SiC about 1.4× each. This is the agenda of the German power and automotive industry, plus TSMC and the Japanese power firms that use the German office.

| Structural indicator | EP (direct) | National offices |
| --- | --- | --- |
| Applications / families | 4,382 / 4,277 | 3,680 / 3,587 |
| Top-5 applicant concentration | 34.4% | 37.8% |
| European first-named applicant | 34.0% (1,491) | 55.3% (2,034) |
| University or research institute involved | 9.8% (430) | 10.8% (398) |
| Quantum intensity (quantum domain share) | 13.5% (593) | 9.0% (331) |
| Advanced packaging (2.5D/chiplets + 3D stacking + hybrid bonding, Y1 → Y2) | 296 → 350 (+18%) | 255 → 252 (−1%) |
| Power-module packaging (Y1 → Y2) | 229 → 220 (−4%) | 270 → 288 (+7%) |
| Family also at US / JP / KR / CN | 87.3% | 66.5% |
| Median filing date | 2024-10-24 | 2024-07-24 |
| Overall volume change (like-for-like) | +1.1% | −10.9% (partly coverage gaps in IT and GB) |

The EP study and the CN/TW study are kept separate. A side-by-side reading is possible on the structural indicators, which use the same definitions; technology categories differ (61 here, 65 there) and would need a mapping.

## 10. Interpretation (not data)

*This section reads the patterns above. Patent counts measure filing behaviour, not capability, and short windows are noisy.*

**Logic and power are two separate industries.** Europe has no own player in leading-edge logic transistors: imec and CEA are the only European names among the top GAA filers, and both are research institutes. In power semiconductors Europe leads: Infineon, STMicroelectronics, Nexperia and Bosch are among the main filers in every power category, and European inventors contribute about half of the inventor input in SiC, GaN, power MOSFETs and power-module packaging.

**The German office as a second European route.** TSMC, Bosch, Mitsubishi Electric and Renesas file almost exclusively at the German office, and German first filings rarely go on to a direct EP application within the window. A DE filing is cheaper and becomes a German patent faster, and Germany is the largest market for automotive power electronics. For these applicants, the German office looks like the main European route rather than a step towards the EPO.

**Advanced packaging grows at the EPO, power packaging at home.** Chiplets, 3D stacking and hybrid bonding grew 18% at the EPO but were flat nationally; power-module packaging grew only at national offices. Glass substrates (Intel, Absolics) are the fastest-growing packaging topic. Europe's contribution to advanced packaging comes through wafer bonding and 3D-integration research (Soitec, CEA, imec) rather than through packaging companies.

**Quantum as a European start-up and research ecosystem.** Quantum is the one domain where European start-ups and institutes lead the ranks: 70% of quantum filings have a European applicant and 29% an academic one. Error correction rising (+46%) while qubit-hardware filings fall (−14%) fits a field moving towards fault-tolerant architectures. The fall in trapped-ion filings says more about filing route than about the technology: Quantinuum files only via PCT and is absent here.

**Memory is a Samsung field.** Samsung files two thirds of DRAM applications, almost all directly at the EPO, which inflates its weight in every memory category. A count including Euro-PCT would show more Micron and CXMT. Europe's memory role is in emerging memories (CEA, STMicroelectronics).

**Next-node preparation.** The cluster of CFET, SRAM and cell-layout filings by TSMC, Intel and Samsung looks like early preparation for nodes beyond the first GAA generation. Backside power delivery fell 26%; its main filing wave may already lie before this window.

**Austria and Villach.** 261 applications name an Austrian inventor and Infineon accounts for 72% of them, centred on power semiconductors and also trapped-ion and qubit-control work. Infineon Technologies Austria AG in Villach is the tenth-largest applicant location in the corpus (185 applications), which makes Villach one of Europe's main semiconductor invention sites by this measure.

**Implications for Europe.** European applicants hold 44% of filings in their own market, about the same as Europe's share of inventor input (45%). Their strength is in power electronics, automotive packaging, process research and quantum, and they are largely absent from leading-edge logic, memory and advanced packaging. This mirrors the CN/TW study, where European applicants appear mainly in lithography, materials and power semiconductors.

Other readings exist. The decline in process categories may be a CPC reclassification effect (H10P from 2026.01) rather than less process research. The national-route decline is partly a coverage gap (IT, GB). Intel's growth (+49%) may reflect a change in its own filing strategy rather than more invention. And because PCT filings are excluded, applicants who prefer PCT (Qualcomm, Huawei, IBM, Applied Materials) are underweighted throughout.

## 11. Methodology appendix

All numbers come from the Google Patents Public Datasets on BigQuery (`patents-public-data.patents.publications`), run in project `patent-study-513418`, dataset `patent_study`.

### Queries and bytes processed (public tables)

| Step | Table built | Bytes |
| --- | --- | --- |
| Corpus build, first run (missed H10W/H10P, redone) | `corpus` | ≈ 263 GB |
| Corpus build, final | `corpus`, `apps_final` | ≈ 264 GB |
| Categories, applicant grouping, inventor countries, application list | `rules`, `cats`, `appl`, `inv_app`, `application_list` | ≈ 83 GB |
| Family jurisdictions (EP, US, JP, KR, WO, CN, TW) | `fam_jur` | 2.4 GB |
| Earliest priority claims | `prio` | 10.2 GB |
| Applicant locations (Wikidata, PatentsView, Overture Maps) | `ent_loc2`, `ent_loc3`, `gaz`, `pv_geo`, `loc_export`, `map_export` | not itemised |
| **Total, study tables** |  | **≈ 623 GB** plus location lookups |

The study ran in a BigQuery sandbox (free tier, 1 TB a month). Tables in a sandbox expire 60 days after creation: export them before about 31 Dec 2026 (in the console: query the table, then Save results → CSV or Google Drive).

### Corpus definition

- **Unit:** application (first publication only; later publications of the same application merged), plus distinct DOCDB `family_id`.
- **Offices:** EP plus the 39 EPO member states.
- **Window:** first publication 2024-11-01 to 2026-10-31. Effective end: EP 2026-09-16, DE 2026-09-24; IT 2025-12-21.
- **Core scope (CPC, any position):** `^(H10D|H10B|H10W|H10P|H10N60/|H01L(21|23|25|27|29)/|G06N10/|B82Y10/|G06F30/39)`, with B82Y10 counted only together with a quantum keyword. Legacy H01L is matched but carries no document in the window.
- **Excluded:** anything with a PCT number (Euro-PCT and national phase), EP translations (T1–T5), utility models (U), A4 supplementary search reports, and 501 applications that entered only through H10W/H10P and concern LEDs, solar cells or OLEDs (H10H, H10F, H10K without a device or quantum code).
- **Duplicates:** where an application had several publications on its first date, one record was kept.

### Technology assignment

- 61 categories in 7 groups (transistors, materials, memory, processes, integration, design, quantum), each defined by CPC regular expressions and, where useful, English, German and French keywords in title and abstract. Keywords apply only within the matching CPC domain. Rules are stored in `patent_study.rules`.
- Basis recorded per assignment: of 18,371 assignments, 16,270 rest on CPC alone, 1,402 on CPC confirmed by text and 699 on text only (96% CPC-based). Seven categories are text-only (CFET, fan-out, trapped ion, neutral atom, photonic, topological, Ga2O3).
- **Full counting:** an application counts in every matching category. 334 applications fall into a domain but no specific category.
- Spot check: a sample of text- and CPC-based assignments was read. One error was found and fixed: H10D30/47 also covers nanoribbon FETs, so HEMT was restricted to H10D30/471 ff. and H10D30/015.
- Trends use like-for-like windows: Nov 2024–Aug 2025 vs Nov 2025–Aug 2026.

### Applicant grouping rules

- Starting point is Google's harmonised assignee name. 51 documented rules merge name variants and subsidiaries under a parent, for example all Infineon entities; Samsung Electronics + Display + Electro-Mechanics; LG Display + Electronics + Innotek; BOE and subsidiaries; Kia + Hyundai Motor + Hyundai Mobis; the two CEA name variants. Unmapped applicants keep their harmonised name.
- Co-applicants each receive full credit; totals by country and type count each application once.
- Type is rule-based (company, university, research institute, individual); CEA, CNRS, imec, Fraunhofer, DLR and TU Delft were verified. 184 applications by unsuffixed names or without an applicant could not be classified.

### Origin rules

- **Applicant country** = country code of the first-named applicant on the patent record (`assignee_harmonized.country_code`); 241 records carry none. Group countries in the top-20 table are the parent's headquarters, so Infineon Austria counts as AT in section 7 and as part of the DE parent in section 5.
- **Priority office** = office prefix of the earliest-dated priority claim.
- **Inventor countries** from `inventor_harmonized`, fractional across inventors; known for 7,912 applications.
- **Applicant locations** are verified per filing entity: Wikidata headquarters (P159 with coordinates), then the most frequent USPTO applicant address (PatentsView, re-geocoded against Overture Maps), then manual checks. Only exact and city-level locations are placed; nothing is placed at a national centroid, and private inventors stay at country level.

### Deviations from the CN/TW study

1. PCT entries excluded (CN/TW kept and flagged them).
2. CPC only instead of CPC ∪ IPC, because European documents carry CPC.
3. 61 categories instead of 65; the taxonomies need a mapping for comparison.
4. Emerging-technology rule: ≥ +40% and ≥ 20 applications in the later window (CN/TW: ≥ 40 CN, ≥ 20 TW).
5. No extension domains (quantum communication and sensing, equipment).
6. Applicant locations verified per filing entity instead of inferred regions.
7. Title terms not used because of mixed-language titles.

### Known gaps

- **PCT exclusion biases the picture:** Qualcomm, Huawei, IBM, Applied Materials, Quantinuum and other PCT-heavy applicants are underweighted.
- **National coverage is uneven:** Italian data ends in December 2025, British data thins out in 2026, small offices are sparsely covered.
- Text-only categories depend on keywords and probably undercount, especially for national filings in other languages.
- The window is by first publication, which lags filing by about 18 months.
- New applicants are new within the window only (no pre-2024 history).
- City-level applicant points are city centres; a company may have moved since its US patents were granted (up to 2021).

The final selection query:

```sql
CREATE OR REPLACE TABLE `patent-study-513418.patent_study.corpus` AS
WITH first_pub AS (
  SELECT application_number, MIN(publication_date) AS first_publication_date
  FROM `patents-public-data.patents.publications`
  WHERE country_code IN ('EP','AL','AT','BE','BG','CH','CY','CZ','DE','DK','EE','ES','FI','FR','GB','GR','HR','HU','IE','IS','IT','LI','LT','LU','LV','MC','ME','MK','MT','NL','NO','PL','PT','RO','RS','SE','SI','SK','SM','TR')
  GROUP BY application_number
)
SELECT p.publication_number, p.country_code, p.kind_code, p.application_number,
  p.family_id, p.publication_date, f.first_publication_date, p.filing_date, p.priority_date,
  (SELECT t.text FROM UNNEST(p.title_localized) t ORDER BY t.language = 'en' DESC LIMIT 1) AS title,
  (SELECT a.text FROM UNNEST(p.abstract_localized) a ORDER BY a.language = 'en' DESC LIMIT 1) AS abstract,
  ARRAY(SELECT c.code FROM UNNEST(p.cpc) c) AS cpc_all,
  ARRAY(SELECT c.code FROM UNNEST(p.cpc) c WHERE c.first) AS cpc_first,
  ARRAY(SELECT c.code FROM UNNEST(p.cpc) c WHERE c.inventive) AS cpc_inventive,
  ARRAY(SELECT a.name FROM UNNEST(p.assignee_harmonized) a) AS applicants,
  ARRAY(SELECT a.country_code FROM UNNEST(p.assignee_harmonized) a) AS applicant_countries
FROM `patents-public-data.patents.publications` p
JOIN first_pub f USING (application_number)
WHERE f.first_publication_date BETWEEN 20241101 AND 20261031
  AND p.publication_date = f.first_publication_date
  AND (p.pct_number IS NULL OR p.pct_number = '')
  AND p.kind_code NOT IN ('T','T1','T2','T3','T4','T5','U','U1','U8','A4')
  AND EXISTS (SELECT 1 FROM UNNEST(p.cpc) c WHERE REGEXP_CONTAINS(c.code,
    r'^(H10D|H10B|H10W|H10P|H10N60/|H01L(21|23|25|27|29)/|G06N10/|B82Y10/|G06F30/39)'))
```

As-of: corpus queried 1 Nov 2026; inventor countries 2 Nov; applicant locations 3–5 Nov; priority claims, family jurisdictions and all figures restructured to the CN/TW outline recomputed on 8 Nov 2026.
