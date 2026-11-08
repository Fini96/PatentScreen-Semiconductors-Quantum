# Semiconductor Innovation Trends in European Patent Filings, Nov 2024 – Sep 2026

Nov 1, 2026 · @fini

## 1. Executive summary

**13,637 semiconductor and quantum applications** (12,747 families) entered the European system between 1 Nov 2024 and the data cut-off (EP: 16 Sep 2026). 9,069 are at the EPO: 4,382 filed directly and 4,687 Euro-PCT applications that entered the European phase. 4,568 are at national offices of the 39 EPO member states: 3,648 filed directly and 920 PCT national-phase entries, all at the German office. 41% of the corpus (5,607) comes through the PCT route. The EPO is an international market led by US, Japanese and Korean applicants. The national route, above all the German office, is a European home market led by power-electronics and automotive firms.

*Data findings*

- **Packaging, not transistors, is the largest field.** Thermal management (1,988), encapsulation (1,795), power-module packaging (1,658), wafer handling and fab equipment (1,622), BEOL interconnects (1,572) and 2.5D/chiplets (1,423) lead. The integration and design domain covers 6,769 applications (50%).
- **Fastest-growing (like-for-like Nov–Aug vs Nov–Aug):** photonic quantum computing +130% (10 → 23), CFET stacked transistors +112% (16 → 34), SRAM +65%, ferroelectric FETs +46% and 2D/carbon-nanotube FETs +42%. Among large categories, 3D stacking/TSV grew 22% and GAA transistors 20%. Deposition (−22%), lithography (−19%) and RF packaging (−33%) fell.
- **Top players.** Samsung (796), Intel (626), Infineon (522), TSMC (352), CEA (326), STMicroelectronics (299), Mitsubishi Electric (294), Bosch (275) and IBM (260). The top five hold 19.2% of filings. Counting the PCT route brings IBM, Huawei (212), Qualcomm (193), Applied Materials (146) and BOE (150) into the top 20.
- **Origin.** By earliest priority claim, the US leads (4,334; 31.8%), ahead of Japan (2,376; 17.4%), Germany (1,418), first filings at the EPO (1,307), Korea (1,218) and China (1,091). By first-named applicant, 33.0% of filings come from EPO member states (4,502; EU27 28.6%): 26.6% at the EPO and 45.8% at national offices.
- **Quantum is half European.** 1,801 quantum applications (13.2% of the corpus, +2%), half of them via PCT (878). 51.6% have a European first-named applicant and 21.4% a university or research institute. Fujitsu leads (161), then Google (79), Microsoft, Pasqal, CEA and Quantinuum (60 each), IBM (57) and IQM (47).
- **Academic weight.** Universities or research institutes appear on 8.5% of filings.
- **The PCT route is a different population.** PCT-route filings over-weight equipment and process steps (wafer cleaning 2.8×, CMP and dicing 2.0×, fab equipment 1.7×) and quantum hardware. Direct filings over-weight leading-edge logic (FinFET 4.5×, GAA 3.3×), because Intel, Samsung and TSMC file directly. Only 17.5% of PCT-route filings have a European first-named applicant, against 43.9% of direct filings.

*Main caveats:* Euro-PCT applications are dated by their first EP-office record, which appears at entry into the European phase, about 34 months after priority. They therefore describe older inventions (median filing date Nov 2023, against Sep 2024 for direct filings). Italian national data ends in December 2025 and British data thins out in 2026. Direct-only figures (the earlier version of this study) are kept as a variant in sections 9 and 11.

## 2. Data, scope and corpus

The corpus covers patent applications whose first publication at the EPO or at one of the 39 EPO member-state offices falls between 2024-11-01 and the last available date, and that carry a CPC code in scope. Both filing routes are counted: direct filings, and PCT applications entering the European phase (Euro-PCT) or a national phase. Each application is counted once.

**Data freshness** (Google Patents Public Datasets, queried 1–8 Nov 2026): latest publication EP 2026-09-16, DE 2026-09-24, GB 2026-09-16, FR 2026-09-04, so August 2026 is the last full month. Italian national records end on 2025-12-21, and British records thin out sharply in 2026. Both are coverage gaps, not drops in filing.

| Measure | EP | National offices | All |
| --- | --- | --- | --- |
| Applications | 9,069 (direct 4,382 · Euro-PCT 4,687) | 4,568 (direct 3,648 · PCT national phase 920) | 13,637 |
| of which PCT route | 4,687 (51.7%) | 920 (20.1%) | 5,607 (41.1%) |
| By office |  | DE 3,480 (incl. 920 PCT) · FR 464 · GB 259 · NL 127 · IT 77 · FI 55 · other 106 |  |
| Distinct families (DOCDB) | 8,812 | 4,397 | 12,747 |
| Utility models, validations and translations of EP patents (T1–T4) | excluded | excluded | excluded |
| Out of scope: LED, solar-cell or OLED packaging only |  |  | 1,057 |
| Family also filed at US | 6,845 (75.5%) | 2,808 (61.5%) | 9,653 (70.8%) |
| Family also filed at CN | 6,309 (69.6%) | 2,639 (57.8%) | 8,948 (65.6%) |
| Family also filed at KR / JP / TW | 3,945 / 3,865 / 3,119 | 955 / 1,316 / 918 | 4,900 / 5,181 / 4,037 |
| Family also has a WO publication | 5,279 (58.2%) | 1,706 (37.3%) | 6,985 (51.2%) |
| Family also filed at US / JP / KR | 7,880 (86.9%) | 3,136 (68.7%) | 11,016 (80.8%) |
| Family also filed at US / JP / KR / CN | 8,242 (90.9%) | 3,319 (72.7%) | 11,561 (84.8%) |
| National application with an EP family member | — | 477 (10.4%) |  |

**Filing-date view.** The median filing date is 2024-04-30 overall: 2024-10-24 for direct EP, 2023-11-03 for Euro-PCT and 2024-06-03 for national applications. PCT-route filings enter Europe about 31 months after priority, so they describe inventions about a year older than direct filings published in the same window.

**Kind codes and route.** Direct EP first publications are A1 or A2. A Euro-PCT application appears in the data as an EP A1 (4,407) or A2 (280) record with a PCT number, dated at entry into the European phase (median 34 months after priority, checked against the priority dates). PCT national-phase entries are German DE 11 2… applications, first published as T5 translations (876), B4 (30) or A5 (14). An application counts as PCT route if any of its records carries a PCT number, has an EP A4 supplementary search report, or has a DE 11 2 number. National first publications of direct filings are mostly A1 or A (DE, FR, GB).

**Why the scope differs from a legacy H01L study.** CPC 2025.01 and 2026.01 moved semiconductor devices to H10D and packaging and processes to the new subclasses **H10W** and **H10P**. No document in the window still carries legacy H01L 21/23/25/27/29. A study with the old code list would miss most of the corpus. Selection is by CPC only, because EPO and European national documents carry CPC; the CN/TW study needed IPC as well (see section 11).

The two comparison windows are ten months each, Nov 2024–Aug 2025 (Y1) and Nov 2025–Aug 2026 (Y2), because the data ends in mid-September 2026.

## 3. Technology rankings

Packaging and equipment dominate by volume: thermal management, encapsulation, power-module packaging and wafer handling each sit on 12–15% of filings. Counting is **full**: an application counts in every category it matches, so shares add up to more than 100%. Change = like-for-like windows (Nov 2024–Aug 2025 vs Nov 2025–Aug 2026). Baselines: all −2.1% (6,114 → 5,986), EP +1.5% (3,965 → 4,026), national −8.8% (2,149 → 1,960); direct filings −5.0%, PCT route +2.3%. Treat changes on fewer than about 30 applications as indicative only.

### Top 22 of 61 categories

| Technology | Code basis | Apps | of which PCT | Families | Share | Change | Top 5 applicants (apps) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Thermal management | H10W40, H10W90/288 | 1,988 | 816 | 1,834 | 14.6% | −10% | Bosch 101; Infineon 89; ZF 71; Mitsubishi Electric 66; Huawei 66 |
| Encapsulation & device protection | H10W74, H10W42 | 1,795 | 649 | 1,699 | 13.2% | −12% | Infineon 161; Intel 108; Mitsubishi Electric 84; STMicroelectronics 79; NXP 78 |
| Power-module & discrete packaging | H10D80/2, H10W90/73–81, H10W76 + text | 1,658 | 538 | 1,551 | 12.2% | −8% | Infineon 160; Mitsubishi Electric 89; Nexperia 70; Intel 67; Bosch 67 |
| Wafer handling & fab equipment | H10P72 | 1,622 | 885 | 1,523 | 11.9% | −6% | Applied Materials 91; Screen Holdings 85; ASML 60; Naura 46; Kokusai Electric 46 |
| On-chip interconnect (BEOL) | H10W20 | 1,572 | 485 | 1,488 | 11.5% | −5% | Samsung 224; Intel 223; TSMC 126; Qualcomm 88; IBM 83 |
| 2.5D, chiplets, interposers & RDL | H10W70/61, H10W90/10, /40, /724 + text | 1,423 | 535 | 1,335 | 10.4% | +1% | Intel 192; Qualcomm 89; Samsung 70; Infineon 60; TSMC 54 |
| Quantum processor architecture & qubit control | G06N10/40 + text | 1,114 | 613 | 1,010 | 8.2% | −7% | Fujitsu 65; Google 58; Quantinuum 53; IBM 47; Pasqal 47 |
| CMOS / logic device integration | H10D84/01, /83, /85 | 1,098 | 246 | 1,033 | 8.1% | +13% | Intel 245; Samsung 188; TSMC 161; IBM 87; imec 40 |
| 3D chip stacking & TSV | H10W90/2x, H10W70/635 + text | 964 | 350 | 918 | 7.1% | +22% | Intel 174; Samsung 83; Qualcomm 59; TSMC 57; Absolics 29 |
| Quantum algorithms & software | G06N10/20, /60, /80 | 917 | 439 | 855 | 6.7% | +10% | Fujitsu 108; Google 50; Microsoft 37; Pasqal 37; Quantinuum 25 |
| Deposition & layer formation (incl. epitaxy) | H10P14 | 900 | 463 | 838 | 6.6% | −22% | Shin-Etsu 58; Soitec 47; Kokusai Electric 43; Applied Materials 41; CEA 39 |
| GAA / nanosheet / nanowire FET | H10D30/43, /50x, /014, /019x, /6735, H10D84/851–852 + text | 826 | 145 | 791 | 6.1% | +20% | Intel 248; Samsung 176; TSMC 145; IBM 73; imec 40 |
| Thin-film transistors (display, oxide TFT) | H10D30/67xx, /031, H10D86/4, /6 + text | 724 | 271 | 676 | 5.3% | −11% | Samsung 170; LG 162; BOE 129; Intel 29; Semiconductor Energy Lab 25 |
| Hybrid / direct bonding | H10W80, H10W90/79, H10P10 + text | 681 | 268 | 638 | 5.0% | +11% | Intel 76; Samsung 66; Soitec 58; Adeia 53; CEA 45 |
| Wafer preparation & other processes | H10P90, H10P95 | 650 | 343 | 610 | 4.8% | −11% | Soitec 140; CEA 69; Shin-Etsu 27; Sumco 16; Fujimi 16 |
| Power MOSFET (trench, LDMOS, superjunction) | H10D30/66, /65, /028–029, H10D84/141 + text | 626 | 207 | 590 | 4.6% | +5% | Infineon 123; Mitsubishi Electric 40; Bosch 36; Rohm 35; Nexperia 35 |
| Integrated passives | H10D1, H10W20/49 | 583 | 187 | 562 | 4.3% | +2% | Samsung 68; Qualcomm 45; Intel 42; Murata 25; CEA 25 |
| Etching | H10P50 | 561 | 270 | 524 | 4.1% | −8% | Shin-Etsu 44; Applied Materials 31; TSMC 28; Screen Holdings 27; CEA 24 |
| Silicon carbide (SiC) | H10D62/8325 + text | 557 | 238 | 522 | 4.1% | 0% | Infineon 63; Mitsubishi Electric 40; Soitec 36; Rohm 33; STMicroelectronics 30 |
| CMP, grinding, cutting & dicing | H10P52–58 | 480 | 281 | 452 | 3.5% | +8% | Soitec 22; STMicroelectronics 19; CEA 17; Screen Holdings 17; Mitsubishi Electric 16 |
| RF / impedance matching in packages | H10W44 | 469 | 185 | 424 | 3.4% | −33% | NXP 39; Intel 33; Qualcomm 30; BorgWarner 23; Infineon 21 |
| Gallium nitride / III-nitrides | H10D62/8503, /824 + text | 431 | 141 | 388 | 3.2% | −1% | STMicroelectronics 44; Infineon 31; Bosch 29; CEA 29; Samsung 28 |

Not categorised beyond domain level: 579 applications (4.2%), for example those with only electrode or connector codes. Categories 23–61 are in section 4. The full table with the basis of every assignment (CPC only, CPC + text, text only) is in the BigQuery table `patent_study.cats2`.

## 4. Per-domain breakdown

Domain 1 (transistors, materials, memory and processes) is the largest: 7,960 applications (EP 5,344 · national 2,616 · PCT route 3,170). Domain 2 (integration, packaging and design) is 6,769 (EP 4,227 · national 2,542 · PCT 2,550). Quantum is 1,801 (EP 1,460 · national 341 · PCT 878). Domains overlap: one application can sit in several. EP, national and PCT columns are counts over the whole window; change is like-for-like Y1 → Y2.

### Domain 1 — devices, materials, memory and processes (beyond the top table)

| Sub-technology | Apps | Change | EP | National | PCT | Leading applicants |
| --- | --- | --- | --- | --- | --- | --- |
| IGBT | 407 | +1% | 137 | 270 | 165 | Infineon 76; Mitsubishi Electric 73; Rohm 29 |
| In-line testing & metrology | 407 | −1% | 263 | 144 | 192 | Applied Materials 21; Samsung 20; KLA 18 |
| DRAM | 387 | +29% | 341 | 46 | 136 | Samsung 167; CXMT 45; YMTC 29; Micron 23 |
| 3D NAND / flash | 351 | −3% | 282 | 69 | 118 | Samsung 82; YMTC 66; SanDisk 25 |
| Memory assemblies (HBM, memory–logic stacks) | 349 | +21% | 283 | 66 | 98 | Samsung 116; Intel 38; YMTC 27 |
| FinFET | 348 | +13% | 178 | 170 | 46 | TSMC 108; Samsung 80; Intel 66 |
| Power & Schottky diodes | 329 | −3% | 150 | 179 | 143 | Infineon 33; Mitsubishi Electric 28; STMicroelectronics 26 |
| Oxide semiconductors (IGZO) | 320 | +18% | 183 | 137 | 98 | LG 75; Samsung 64; Semiconductor Energy Lab 25 |
| Doping (implantation, diffusion) | 306 | −8% | 160 | 146 | 131 | Infineon 29; Rohm 18; Applied Materials 15 |
| HEMT (GaN / III-V) | 306 | +5% | 235 | 71 | 99 | STMicroelectronics 36; Samsung 29; Infineon 24 |
| SiGe / Ge | 248 | +23% | 147 | 101 | 46 | TSMC 69; Samsung 52; Intel 50 |
| ReRAM / phase-change memory | 235 | −18% | 150 | 85 | 66 | CEA 37; IBM 34; Samsung 32 |
| Lithography & masks (process) | 230 | −19% | 190 | 40 | 101 | Shin-Etsu 51; Nissan Chemical 19; Merck KGaA 16 |
| ESD & protection structures | 228 | −27% | 148 | 80 | 52 | Samsung 22; STMicroelectronics 18; Infineon 17 |
| Wafer cleaning | 184 | +14% | 144 | 40 | 122 | Screen Holdings 19; Applied Materials 11; Sumitomo Electric 10 |
| FeRAM | 154 | −7% | 119 | 35 | 58 | Samsung 26; CEA 23; Huawei 17 |
| MRAM | 135 | +2% | 90 | 45 | 47 | IBM 25; Samsung 23; Everspin 10 |
| 2D materials (graphene, TMDs) | 124 | −3% | 99 | 25 | 40 | Samsung 16; CEA 14; Intel 13 |
| SOI / engineered substrates | 118 | −5% | 93 | 25 | 46 | GlobalFoundries 23; Analog Devices 8; Shin-Etsu 7 |
| SRAM | 99 | +65% | 54 | 45 | 24 | TSMC 27; Intel 19; Samsung 13 |
| Bipolar transistors / HBT | 91 | −29% | 66 | 25 | 25 | GlobalFoundries 23; Analog Devices 8; STMicroelectronics 8 |
| Ferroelectric FET (FeFET) | 66 | +46% | 55 | 11 | 25 | Samsung 16; Merck KGaA 10; Intel 6 |
| CFET (stacked complementary FET) | 57 | +112% | 34 | 23 | 14 | TSMC 15; imec 11; Intel 10 |
| 2D-material & carbon-nanotube FETs | 50 | +42% | 41 | 9 | 11 | Samsung 14; Intel 6; CEA 6 |
| Diamond | 37 | +6% | 18 | 19 | 13 | Mitsubishi Electric 5; Soitec 5; CEA 5 |
| Gallium oxide (Ga2O3) | 18 | 12 → 6 | 7 | 11 | 12 | TDK 4; Bosch 3; Novel Crystal Technology 2 |

Transistor filings split into two groups with almost no overlap in applicants. **Advanced logic** (GAA 826, FinFET 348, CFET 57) is held by Intel, Samsung and TSMC, with IBM fourth in GAA (73, mostly via PCT); the three file 569 of the 826 GAA applications, almost all directly. **Power devices** (power MOSFET 626, IGBT 407, diodes 329, HEMT 306) are held by European and Japanese firms: Infineon leads power MOSFETs (123) and IGBTs (76), followed by Mitsubishi Electric, Rohm, Fuji Electric and MinebeaMitsumi, which enter Germany through the PCT national phase. Display TFTs (724) are an East Asian field: Samsung, LG and BOE hold 461.

Material platforms, by count: SiC 557 > GaN 431 > oxide 320 > SiGe 248 > 2D 124 > diamond 37 > Ga2O3 18. Memory is led by Samsung (43% of DRAM), but the PCT route adds CXMT, YMTC and Micron; Europe's role is in emerging memories (CEA leads ReRAM/PCM and is second in FeRAM). Process filings are led by suppliers, most of them via PCT: Applied Materials, Screen, ASML, Naura and Kokusai in equipment; Shin-Etsu, Nissan Chemical and Merck in lithography materials; Soitec in wafer preparation.

### Domain 2 — integration, packaging and design

| Sub-technology | Apps | Change | EP | National | PCT | Leading applicants |
| --- | --- | --- | --- | --- | --- | --- |
| Power-module & discrete packaging | 1,658 | −8% | 879 | 779 | 538 | Infineon 160; Mitsubishi Electric 89; Nexperia 70; Intel 67 |
| 2.5D, chiplets, interposers & RDL | 1,423 | +1% | 939 | 484 | 535 | Intel 192; Qualcomm 89; Samsung 70; Infineon 60 |
| 3D chip stacking & TSV | 964 | +22% | 693 | 271 | 350 | Intel 174; Samsung 83; Qualcomm 59; TSMC 57 |
| Hybrid / direct bonding | 681 | +11% | 474 | 207 | 268 | Intel 76; Samsung 66; Soitec 58; Adeia 53; CEA 45 |
| RF / impedance matching in packages | 469 | −33% | 330 | 139 | 185 | NXP 39; Intel 33; Qualcomm 30 |
| Monolithic 3D integration | 332 | +11% | 225 | 107 | 71 | Samsung 73; Intel 52; TSMC 47; IBM 33; imec 29 |
| Glass & ceramic package substrates | 314 | +15% | 217 | 97 | 106 | Intel 97; Absolics 38; BorgWarner 24 |
| IC layout & physical design (EDA) | 258 | −23% | 198 | 60 | 108 | Samsung 24; Intel 16; TSMC 14; Siemens EDA 11 |
| Standard-cell / device layout & routing | 244 | +14% | 164 | 80 | 60 | Samsung 65; TSMC 40; Intel 28; Qualcomm 23 |
| Backside power delivery | 237 | −21% | 193 | 44 | 70 | Samsung 67; Intel 63; IBM 52 |
| Fan-out & wafer/panel-level packaging | 24 | 6 → 13 | 21 | 3 | 9 | Silicon Box 5; Infineon 2; Samsung 2 |

The domain has two halves. Automotive and power packaging (thermal, encapsulation, power modules) is led by Infineon, Bosch, ZF, Nexperia, Volkswagen and the Japanese power firms. Advanced logic packaging (chiplets, 3D stacking, hybrid bonding, glass substrates) is led by Intel, Samsung, TSMC and, via PCT, Qualcomm and Adeia; Europe's visible contributors are Soitec, CEA and imec. Fan-out packaging has no own CPC group and is found by keyword only, so it is almost certainly undercounted.

### Domain 3 — quantum

| Sub-technology | Apps | Change | EP | National | PCT | Leading applicants |
| --- | --- | --- | --- | --- | --- | --- |
| Processor architecture & qubit control | 1,114 | −7% | 915 | 199 | 613 | Fujitsu 65; Google 58; Quantinuum 53; IBM 47; Pasqal 47 |
| Algorithms & software | 917 | +10% | 792 | 125 | 439 | Fujitsu 108; Google 50; Microsoft 37; Pasqal 37 |
| Error correction | 410 | +32% | 347 | 63 | 204 | Google 44; Fujitsu 38; Microsoft 32; Alice & Bob 28; Riverlane 19 |
| Superconducting qubits (incl. cat qubits) | 376 | −13% | 310 | 66 | 204 | Fujitsu 40; Alice & Bob 28; IBM 24; CEA 22; Northrop Grumman 17 |
| Semiconductor spin qubits / quantum dots | 152 | −32% | 107 | 45 | 69 | CEA 38; TU Delft 19; FZ Jülich 11; RWTH Aachen 7; Silicon Quantum Computing 7 |
| Trapped-ion | 74 | −36% | 55 | 19 | 29 | eleQtron 22; Infineon 20; Quantinuum 9; IonQ 6 |
| Photonic quantum computing | 38 | +130% | 25 | 13 | 13 | SaxonQ 4; ORCA Computing 4; PsiQuantum 4; Quandela 3 |
| Neutral atoms | 34 | +20% | 32 | 2 | 20 | Pasqal 10; Max Planck Society 5; LMU Munich 4; Harvard 4 |
| Topological / Majorana | 22 | 9 → 12 | 19 | 3 | 14 | Microsoft 14; TU Delft 5 |

The quantum domain (1,801) grew 2% (778 → 795), and half of it (878) comes via PCT. Counting the PCT route adds the US quantum companies: Google (79), Microsoft (60), Quantinuum (60), IBM (57), PsiQuantum (29), IonQ and Rigetti. Platform counts depend on title and abstract keywords (searched in English, German and French), because CPC has platform groups only for superconducting (H10N60) and spin-qubit devices.

### Extensions

Not queried in the EP study. The CN/TW study reports quantum communication and sensing (QKD, magnetometry, atomic clocks) and equipment (lithography tools, CVD/ALD, plasma equipment) as separate extension sets. Here, wafer handling and fab equipment (H10P72, 1,622) is the only equipment category, and it sits in the core scope.

## 5. Top applicants

**Concentration is moderate overall and high at national offices.** The top 5 groups hold 19.2% of all filings (2,622 of 13,637: Samsung, Intel, Infineon, TSMC, CEA). At the EPO the top 5 hold 19.3% (Samsung 794, Intel 379, Huawei 212, Qualcomm 193, NXP 169); at national offices 33.1% (Infineon 385, TSMC 352, Mitsubishi Electric 284, Intel 247, Bosch 245). The PCT route is the least concentrated (14.0%: IBM 195, Qualcomm 188, Huawei 169, Applied Materials 131, Mitsubishi Electric 103). Applicants are grouped under parents (rules in section 11). Change = like-for-like windows; compare against the baseline (−2.1%).

### Top 20

| # | Applicant (parent) | Type | Country | Apps | of which PCT | Y1 → Y2 | Technology profile (top 3) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Samsung (Electronics, Display, Electro-Mechanics) | company | KR | 796 | 76 | 379 → 339 (−11%) | GAA; TFT; DRAM |
| 2 | Intel | company | US | 626 | 73 | 225 → 328 (+46%) | GAA; 2.5D/chiplets; 3D stacking/TSV |
| 3 | Infineon (all entities) | company | DE | 522 | 14 | 230 → 227 (−1%) | power-module packaging; power MOSFET; IGBT |
| 4 | TSMC | company | TW | 352 | 0 | 175 → 171 (−2%) | GAA; FinFET; SiGe |
| 5 | CEA | research institute | FR | 326 | 38 | 158 → 142 (−10%) | hybrid bonding; deposition; spin qubits |
| 6 | STMicroelectronics | company | CH | 299 | 1 | 150 → 115 (−23%) | power-module packaging; GaN; HEMT |
| 7 | Mitsubishi Electric | company | JP | 294 | 103 | 126 → 140 (+11%) | power-module packaging; IGBT; power MOSFET |
| 8 | Bosch | company | DE | 275 | 28 | 130 → 106 (−18%) | power-module packaging; power MOSFET; 2.5D/chiplets |
| 9 | IBM | company | US | 260 | 195 | 169 → 67 (−60%) | GAA; backside power; qubit control |
| 10 | Huawei | company | CN | 212 | 169 | 95 → 96 (+1%) | 2.5D/chiplets; power-module packaging; 3D stacking/TSV |
| 11 | LG (Display, Electronics, Innotek) | company | KR | 211 | 48 | 102 → 95 (−7%) | TFT; oxide semiconductors; 2.5D/chiplets |
| 12 | Qualcomm | company | US | 193 | 188 | 66 → 113 (+71%) | 2.5D/chiplets; 3D stacking/TSV; integrated passives |
| 13 | NXP | company | NL | 169 | 0 | 90 → 70 (−22%) | power-module packaging; 2.5D/chiplets; RF packaging |
| 14 | Fujitsu | company | JP | 165 | 64 | 42 → 96 (+129%) | quantum algorithms; qubit control; superconducting qubits |
| 15 | Soitec | company | FR | 157 | 64 | 69 → 53 (−23%) | hybrid bonding; deposition; SiC |
| 15 | Nexperia | company | NL | 157 | 3 | 64 → 83 (+30%) | power-module packaging; power MOSFET; 2.5D/chiplets |
| 17 | Shin-Etsu (incl. Shin-Etsu Handotai) | company | JP | 155 | 89 | 81 → 61 (−25%) | deposition; lithography/masks; etching |
| 18 | BOE | company | CN | 150 | 100 | 80 → 62 (−22%) | TFT; oxide semiconductors; ESD |
| 19 | Applied Materials | company | US | 146 | 131 | 79 → 49 (−38%) | wafer handling; deposition; etching |
| 20 | imec | research institute | BE | 136 | 7 | 65 → 53 (−18%) | GAA; monolithic 3D; etching |

Next five: onsemi (US) 110 (+89%), ZF Friedrichshafen (DE) 110 (−62%), Google (US) 102 (+23%), Texas Instruments (US) 100 (−30%), YMTC (CN) 100 (−15%).

Eight of the top 20 are European, including two research institutes (CEA, imec). The profile excludes the five catch-all categories (CMOS integration, BEOL, thermal, encapsulation, other wafer processes). Applicants split clearly by route: TSMC, NXP, STMicroelectronics, Infineon and Nexperia file almost only directly, while IBM (75% PCT), Huawei (80%), Qualcomm (97%), Applied Materials (90%) and BOE (67%) enter mainly via PCT. Mitsubishi Electric uses both, including 95 German national-phase entries. STMicroelectronics (230 families) and CEA (218) have notably fewer families than applications because they file the same invention at a national office and at the EPO.

**Applicant types (share of filings with at least one applicant of that type):**

| Type | Apps | Share |
| --- | --- | --- |
| Company | 12,461 | 91.4% |
| University | 436 | 3.2% |
| Research institute | 819 | 6.0% |
| University or institute | 1,153 | 8.5% |
| Individual or unclassified (no company suffix) | 306 | 2.2% |

Universities or institutes appear on 8.5% of EP and of national filings, on 9.8% of direct filings and on 6.5% of PCT-route filings. In quantum the academic share is 21.4% (385 of 1,801).

## 6. Quarterly time series

Volume is flat at about 1,550–2,000 applications per complete quarter through Q2 2026. Euro-PCT entries are steady (535–692 a quarter); national direct filings drift down. Among the ten largest specific technologies, 3D stacking/TSV (+22%) and GAA transistors (+20%) rose most, both with a jump in Q2 2026.

*[Chart in the PDF version. Source: Google Patents Public Datasets (BigQuery), queried 8 Nov 2026 · direct and PCT-route applications, complete quarters Q1 2025 – Q2 2026 · change = Nov–Aug vs Nov–Aug]*

The publication-lag boundary is the last complete month, August 2026; Q4 2024 covers only November and December, and Q3 2026 only July to mid-September. Both partial quarters are left out of the chart. Italian data stops after December 2025 and British data thins in 2026, which depresses national counts from 2026 on.

**Applications by quarter and route** (incomplete quarters in brackets):

| Route | \[24-Q4\] | 25-Q1 | 25-Q2 | 25-Q3 | 25-Q4 | 26-Q1 | 26-Q2 | \[26-Q3\] |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EP direct | 265 | 548 | 747 | 543 | 670 | 455 | 690 | 464 |
| EP Euro-PCT | 344 | 692 | 535 | 637 | 681 | 569 | 618 | 611 |
| National direct | 286 | 539 | 595 | 505 | 440 | 414 | 563 | 306 |
| National PCT (DE) | 62 | 121 | 123 | 130 | 117 | 108 | 120 | 139 |
| **All** | **957** | **1,900** | **2,000** | **1,815** | **1,908** | **1,546** | **1,991** | **1,520** |

**Top 10 technologies by quarter:**

| Technology | \[24-Q4\] | 25-Q1 | 25-Q2 | 25-Q3 | 25-Q4 | 26-Q1 | 26-Q2 | \[26-Q3\] |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Thermal management | 131 | 263 | 318 | 302 | 264 | 231 | 280 | 199 |
| Encapsulation | 126 | 280 | 278 | 228 | 255 | 204 | 229 | 195 |
| Power-module packaging | 111 | 238 | 250 | 244 | 219 | 188 | 234 | 174 |
| Wafer handling & equipment | 124 | 259 | 213 | 202 | 224 | 183 | 218 | 199 |
| BEOL interconnect | 126 | 234 | 222 | 194 | 223 | 162 | 250 | 161 |
| 2.5D / chiplets | 102 | 178 | 201 | 210 | 176 | 170 | 222 | 164 |
| Quantum processor & control | 79 | 156 | 154 | 160 | 139 | 140 | 157 | 129 |
| CMOS integration | 68 | 148 | 146 | 131 | 190 | 109 | 182 | 124 |
| 3D stacking / TSV | 57 | 129 | 125 | 109 | 130 | 116 | 166 | 132 |
| Quantum algorithms | 51 | 120 | 134 | 116 | 127 | 130 | 125 | 114 |

Quarterly counts swing by up to a third (EP publication batches), so single quarters say little. The Euro-PCT row is the steadiest, because European-phase entry follows a fixed 31-month deadline. The decline in process categories (deposition, lithography, doping) may partly be a classification effect: H10P only came into force with CPC 2026.01, and recently published documents may not yet carry their final H10P codes. Read those drops as provisional until a later re-run confirms them.

## 7. Origin of filings

The EPO is an international market: about three quarters of EP filings (73.4%) come from applicants outside the EPO states. The national offices are a European home market: 45.8% of their filings have a European first-named applicant, most of them German, with Japanese power firms entering through the German national phase.

### a) Priority office (earliest priority claim, data-derived)

Every application in the corpus carries at least one priority claim.

| Priority office | All | At EP | At national offices | of which PCT route |
| --- | --- | --- | --- | --- |
| United States | 4,334 (31.8%) | 3,199 | 1,135 | 2,054 |
| Japan | 2,376 (17.4%) | 1,462 | 914 | 1,630 |
| Germany | 1,418 (10.4%) | 220 | 1,198 | 185 |
| EPO (first filing at the EPO) | 1,307 (9.6%) | 1,264 | 43 | 304 |
| South Korea | 1,218 (8.9%) | 1,048 | 170 | 218 |
| Mainland China | 1,091 (8.0%) | 956 | 135 | 746 |
| France | 748 (5.5%) | 296 | 452 | 128 |
| United Kingdom | 265 | 150 | 115 | 106 |
| Netherlands | 174 | 63 | 111 | 37 |
| Italy | 171 | 94 | 77 | 14 |
| Finland | 125 | 73 | 52 | 59 |
| Taiwan | 116 | 64 | 52 | 0 |
| India, Sweden, Austria, Australia | 63, 61, 26, 22 |  |  |  |

Most Japanese (1,630 of 2,376) and Chinese (746 of 1,091) first filings reach Europe via PCT, so both countries count about three times as much as in a direct-only view. Many Taiwanese applicants (TSMC above all) claim **US first filings**: Taiwanese applicants file 583 applications, but only 116 carry a TW priority. German first filings stay national: 1,198 national applications claim a German priority, against 220 EP applications.

### b) Filing route

41% of the corpus (5,607) comes through the PCT route: 4,687 Euro-PCT applications at the EPO and 920 national-phase entries at the German office. The share of the EP route that goes via PCT depends strongly on where the applicant comes from:

| First-named applicant country | EP filings | of which Euro-PCT |
| --- | --- | --- |
| United States | 2,636 | 1,679 (64%) |
| Japan | 1,522 | 1,090 (72%) |
| South Korea | 1,150 | 212 (18%) |
| Mainland China | 889 | 656 (74%) |
| Germany | 601 | 289 (48%) |
| France | 387 | 162 (42%) |
| Netherlands | 383 | 96 (25%) |
| Switzerland | 251 | 24 (10%) |
| United Kingdom | 168 | 115 (68%) |
| Taiwan | 158 | 14 (9%) |

The German national phase is used mainly by Japanese applicants (579 of 920; Mitsubishi Electric 95, Rohm 73, Fuji Electric 59, MinebeaMitsumi 54) and US applicants (195, IBM 57). Only 477 national applications (10.4%) belong to families that also have an EP member in the data. By applicant: Samsung (719 of 796), NXP, imec and GlobalFoundries file almost only directly at the EPO; TSMC (all 352), Bosch (245 of 275) and Renesas file almost only at the German office; Qualcomm, Huawei, Applied Materials, IBM, CXMT and Quantinuum enter almost only via Euro-PCT.

### c) Europe

Applicants from EPO member states file 4,502 applications (33.0%, first-named applicant), of which EU27 3,897 (28.6%). By route: 26.6% at the EPO, 45.8% at national offices; 43.9% of direct filings but only 17.5% of PCT-route filings. The largest European applicants are Infineon 500, CEA 319, Bosch 275, STMicroelectronics 248, Soitec 157, Nexperia 156, imec 135, ZF 110, ASML 80 and Siemens 75. In quantum, 51.6% of filings (929 of 1,801) have a European first-named applicant. 241 records carry no applicant country.

### d) Applicant origin by route

| First-named applicant country | At EP | At national offices | All |
| --- | --- | --- | --- |
| United States | 2,636 | 585 | 3,221 |
| Japan | 1,522 | 937 | 2,459 |
| Germany | 601 | 1,178 | 1,779 |
| South Korea | 1,150 | 153 | 1,303 |
| Mainland China | 889 | 112 | 1,001 |
| France | 387 | 339 | 726 |
| Taiwan | 158 | 425 | 583 |
| Netherlands | 383 | 105 | 488 |
| Switzerland | 251 | 134 | 385 |
| Austria | 150 | 145 | 295 |
| United Kingdom | 168 | 38 | 206 |
| **EPO member states** | **2,409 (26.6%)** | **2,093 (45.8%)** | **4,502 (33.0%)** |

Korean and Chinese applicants enter Europe almost only through the EPO; Taiwanese applicants mostly through the German office (TSMC). Family links run deeper than direct filings: 65.6% of the corpus belongs to families that also have a CN member and 29.6% a TW member (section 2).

### e) Inventor countries

Inventor countries come from Google's harmonised inventor data and are known for 13,483 of the 13,637 applications; Italian national filings carry no inventor data. By inventor location, Europe contributes 33.4% of the corpus (4,499 applications, fractional count), Asia 41.5% (5,592) and North America 24.2% (3,262). That is almost exactly Europe's applicant share (33.0%): European inventors and European applicants largely coincide. On direct filings alone Europe's inventor share is 44.8%; on PCT-route filings 17.2%.

*[Chart in the PDF version. Source: Google Patents Public Datasets (BigQuery), inventor\_harmonized country codes, queried 8 Nov 2026 · 13,483 of 13,637 applications with inventor data · top 15 countries]*

**Research is regional, not global.** Only 598 applications (4.4%) name inventors from more than one world region; 4,305 are purely European, 5,403 purely Asian and 3,070 purely North American. Of the 4,689 applications with at least one European inventor, 4,260 (91%) have a European first-named applicant, 282 a North American and 104 an Asian one.

**Share of inventor input by domain and technology** (fractional, rows may not add to 100% because of rounding and other regions):

| Domain / technology | Applications | Europe | Asia | N. America | of which DE | FR | AT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Quantum (domain) | 1,771 | 53% | 16% | 28% | 17% | 11% | 2% |
| Processes and equipment (domain) | 3,672 | 33% | 46% | 20% | 10% | 9% | 2% |
| Integration and packaging (domain) | 6,447 | 32% | 41% | 26% | 15% | 6% | 2% |
| Transistors and devices (domain) | 4,172 | 25% | 48% | 26% | 7% | 6% | 2% |
| Design (domain) | 450 | 20% | 38% | 40% | 7% | 3% | 0% |
| Memory (domain) | 1,324 | 13% | 57% | 30% | 1% | 7% | 0% |
| Trapped-ion qubits | 74 | 75% | 1% | 20% | 52% | 0% | 15% |
| Semiconductor spin qubits | 151 | 72% | 7% | 13% | 18% | 26% | 1% |
| Superconducting qubits | 372 | 53% | 20% | 26% | 11% | 17% | 1% |
| Gallium nitride | 421 | 48% | 29% | 22% | 12% | 14% | 3% |
| Silicon carbide | 549 | 42% | 44% | 14% | 16% | 8% | 6% |
| HEMT | 299 | 41% | 31% | 28% | 6% | 13% | 3% |
| Power MOSFET | 613 | 40% | 43% | 17% | 19% | 2% | 9% |
| Power-module packaging | 1,636 | 38% | 41% | 19% | 23% | 4% | 1% |
| Wafer handling & fab equipment | 1,598 | 31% | 47% | 21% | 10% | 4% | 2% |
| IGBT | 403 | 30% | 59% | 10% | 14% | 1% | 8% |
| Hybrid bonding | 673 | 28% | 37% | 35% | 5% | 14% | 2% |
| 2.5D / chiplets | 1,417 | 24% | 36% | 38% | 12% | 3% | 2% |
| 3D stacking / TSV | 961 | 14% | 37% | 49% | 4% | 2% | 1% |
| GAA / nanosheet FET | 826 | 12% | 36% | 52% | 2% | 4% | 0% |
| FinFET | 348 | 7% | 52% | 41% | 2% | 1% | 0% |
| DRAM | 385 | 4% | 78% | 18% | 1% | 1% | 0% |
| Thin-film transistors | 724 | 4% | 86% | 9% | 1% | 2% | 0% |

**Inside the companies: where their inventors are** (fractional share of each group's inventor input):

| Applicant | Applications with inventor data | Inventor countries |
| --- | --- | --- |
| Infineon | 521 | Germany 57% · Austria 25% · Malaysia 8% · Canada 3% · USA 3% |
| STMicroelectronics | 250 | France 57% · Italy 31% · Singapore 3% (Italian filings lack inventor data) |
| NXP | 169 | Netherlands 91% · France 7% |
| Nexperia | 157 | UK 31% · Germany 23% · China 16% · Netherlands 11% · Hong Kong 11% |
| Bosch | 275 | Germany 93% · Hungary 3% |
| GlobalFoundries | 96 | USA 61% · Germany 14% · Singapore 13% · India 9% |
| Huawei | 212 | China 80% · Germany 17% · Belgium 2% |
| Texas Instruments | 100 | USA 71% · Japan 7% · Germany 6% · Philippines 6% |
| onsemi | 110 | USA 35% · Korea 18% · China 13% · Malaysia 5% |
| Applied Materials | 146 | USA 84% · Israel 5% · Singapore 4% |
| IBM | 259 | USA 92% · Switzerland 3% · Japan 2% |
| Intel | 626 | USA 93% · Germany 2% |
| Qualcomm | 193 | USA 100% |
| Samsung | 796 | Korea 87% · USA 13% |
| Mitsubishi Electric | 294 | Japan 98% |
| TSMC | 352 | Taiwan 100% |

**Austria.** 314 applications name at least one inventor in Austria. Infineon accounts for 197 of them (63%), followed by AT&S (21), EV Group (17), TDK Electronics (13), Miba Sinter (8) and the University of Innsbruck (5). Infineon's Austrian-invented applications centre on power semiconductors: power MOSFETs 85, SiC 50, IGBTs 45, power-module packaging 23, doping processes 22. They also include quantum work: qubit control 22 and trapped-ion 14. Of the 197, 100 were filed by Infineon Technologies Austria AG and 96 by the German parent, so counting by applicant entity alone would hide half of the Austrian output. 188 of the 197 were filed directly.

**City level (e.g. Villach) is not in this dataset**, which records only the inventor's country. The EPO Register has published each inventor's place of residence (city and postcode) since November 2021 ([OJ EPO 2021, A12](https://www.epo.org/en/legal/official-journal/2021/02/a12)). For the EP applications, a Villach count is therefore possible as a second step. Note that it measures where inventors live, not where they work: Villach-site staff living in Klagenfurt would not show up as Villach.

### f) Applicant locations by city (verified, direct filings)

Unlike the CN regions in the CN/TW study, which are inferred from the headquarters of the top 50 applicants, applicant locations here are verified per filing entity (Wikidata headquarters, USPTO applicant addresses re-geocoded against Overture Maps, and manual checks of registers and company websites; method in section 11). The located unit is the applicant entity on the filing, so a subsidiary sits at its own address: Infineon Technologies Austria AG in Villach, Infineon Technologies AG in Neubiberg. **This table covers the 8,062 direct filings only**; applicants that enter mainly via PCT (Qualcomm, Huawei, Applied Materials, IBM, BOE) have not yet been located. Counts are applications per filing-entity city (full count).

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

The logic generation after GAA (CFET, SRAM, ferroelectric and 2D-channel FETs) and photonic quantum computing are the fastest-growing fronts. Rule (as in the CN/TW study, with a threshold adapted to the smaller corpus): at least +40% like-for-like and at least 20 applications in the later window.

| Technology | Y1 → Y2 | Change | Example publications (later window) |
| --- | --- | --- | --- |
| Photonic quantum computing | 10 → 23 | +130% | [EP4655724A1](https://patents.google.com/patent/EP4655724A1) (ORCA Computing, Euro-PCT); [EP4789143A2](https://patents.google.com/patent/EP4789143A2) (PsiQuantum, Euro-PCT); [EP4760606A1](https://patents.google.com/patent/EP4760606A1) (Quandela) |
| CFET (stacked complementary FET) | 16 → 34 | +112% | [DE102025118029A1](https://patents.google.com/patent/DE102025118029A1) (TSMC); [EP4781807A1](https://patents.google.com/patent/EP4781807A1) (Qualcomm, Euro-PCT); [EP4793814A1](https://patents.google.com/patent/EP4793814A1) (imec) |
| SRAM | 34 → 56 | +65% | [DE102025149977A1](https://patents.google.com/patent/DE102025149977A1) (TSMC); [DE102025147699A1](https://patents.google.com/patent/DE102025147699A1) memory architectures with backside metal-zero bit lines (Intel); [EP4770329A2](https://patents.google.com/patent/EP4770329A2) (Samsung) |
| Ferroelectric FET (FeFET) | 24 → 35 | +46% | [EP4759092A1](https://patents.google.com/patent/EP4759092A1) (Merck KGaA, Euro-PCT); [EP4646734A1](https://patents.google.com/patent/EP4646734A1) (University of Michigan, Euro-PCT); [EP4658016A1](https://patents.google.com/patent/EP4658016A1) (Samsung) |
| 2D-material & carbon-nanotube FETs | 19 → 27 | +42% | [EP4780161A1](https://patents.google.com/patent/EP4780161A1) (Samsung); [EP4681247A1](https://patents.google.com/patent/EP4681247A1) (Paragraf, Euro-PCT); [FR3166241A1](https://patents.google.com/patent/FR3166241A1) (CEA) |

Just below the +40% bar: quantum error correction 151 → 199 (+32%), DRAM 153 → 198 (+29%), SiGe 104 → 128 (+23%), 3D stacking/TSV 388 → 474 (+22%) and HBM-type memory assemblies 138 → 167 (+21%). Very small bases: fan-out packaging 6 → 13, topological qubits 9 → 12. Glass and ceramic package substrates grew 56% in direct filings (Intel, Absolics) but only 15% overall (133 → 153), because PCT-route glass-substrate filings fell; the direct-only signal was an Intel effect. Backside power delivery fell 21%.

**New applicants** (none in the earlier window, at least 6 in the later one). This is new *within the study window*, since earlier history was not queried.

- Musco Corp (US, 12), Yamaha Robotics (JP, 11), Nvidia (US, 7), Aehr Test Systems (US, 7), Nu Quantum (GB, 7), Niterra Materials (JP, 7), Bitdeer Semiconductor (SG, 7), Guangzhou CSOT (CN, 6), Ampere SAS (FR, 6), Yield Engineering Systems (US, 6).

**Fastest-rising title terms: not used.** Titles in this corpus are in German, French and English (national offices publish in their own language), so bigram counts mostly reflect the language mix ("und herstellungsverfahren", "un dispositif") rather than technology. This is the same reason the CN/TW study did not use the TW `top_terms`.

## 9. EP vs national comparison, and direct vs PCT route

The two offices show opposite profiles. EP filings over-weight memory, quantum and leading-edge logic: DRAM 3.7×, quantum algorithms 3.2×, quantum error correction 2.8×, FeFET 2.5×, lithography and masks 2.4×, superconducting qubits 2.4×, qubit control 2.3×, backside power 2.2× and HBM-type assemblies 2.2× (share among EP filings ÷ share among national filings; categories with at least 60 applications). National filings over-weight power electronics: IGBT 3.8×, power MOSFET and power diodes 2.4×, FinFET 1.9×, doping 1.8×, power-module packaging 1.8× and SiC 1.7×. This is the agenda of the German power and automotive industry, plus TSMC and the Japanese power firms that use the German office.

The two routes differ just as much. PCT-route filings over-weight process steps and quantum hardware: wafer cleaning 2.8×, CMP and dicing 2.0×, qubit control 1.8×, fab equipment 1.7×, superconducting qubits 1.7×, wafer preparation 1.6×. Direct filings over-weight leading-edge logic: FinFET 4.5×, GAA 3.3×, SiGe 3.0×, monolithic 3D 2.6×, CMOS integration 2.4×.

| Structural indicator | EP | National offices | Direct (all offices) | PCT route (all offices) |
| --- | --- | --- | --- | --- |
| Applications / families | 9,069 / 8,812 | 4,568 / 4,397 | 8,030 / 7,530 | 5,607 / 5,493 |
| Top-5 applicant concentration | 19.3% | 33.1% | 30.3% | 14.0% |
| European first-named applicant | 26.6% | 45.8% | 43.9% | 17.5% |
| European share of inventor input | 27.5% | 45.5% | 44.8% | 17.2% |
| University or research institute involved | 8.5% | 8.5% | 9.8% | 6.5% |
| Quantum intensity (quantum domain share) | 16.1% (1,460) | 7.5% (341) | 11.5% (923) | 15.7% (878) |
| Advanced packaging (2.5D/chiplets + 3D stacking + hybrid bonding, Y1 → Y2) | 603 → 654 (+8%) | 299 → 313 (+5%) | 550 → 596 (+8%) | 352 → 371 (+5%) |
| Power-module packaging (Y1 → Y2) | 421 → 359 (−15%) | 351 → 353 (+1%) | 496 → 504 (+2%) | 276 → 208 (−25%) |
| Family also at US / JP / KR / CN | 90.9% | 72.7% | 77.8% | 94.8% |
| Median filing date | 2024-04-12 | 2024-06-03 | 2024-09-19 | 2023-10-31 |
| Overall volume change (like-for-like) | +1.5% | −8.8% (partly coverage gaps in IT and GB) | −5.0% | +2.3% |

**Direct-only variant.** The direct column reproduces the earlier version of this study (8,062 applications), except that 32 German DE 11 2 applications, previously counted as direct, are now recognised as PCT national-phase entries. Its rankings are those of applicants who file directly in Europe.

The EP study and the CN/TW study are kept separate. Both now count PCT-route filings and also report a PCT-excluded variant, so they can be read side by side on the structural indicators, which use the same definitions; technology categories differ (61 here, 65 there) and would need a mapping.

## 10. Interpretation (not data)

*This section reads the patterns above. Patent counts measure filing behaviour, not capability, and short windows are noisy.*

**Logic and power are two separate industries.** Europe has no own player in leading-edge logic transistors: imec and CEA are the only European names among the top GAA filers, and both are research institutes. In power semiconductors Europe leads: Infineon, STMicroelectronics, Nexperia and Bosch are among the main filers in every power category, now joined by Japanese firms (Mitsubishi Electric, Rohm, Fuji Electric, MinebeaMitsumi) once their PCT national-phase entries are counted. European inventors still contribute 38–48% of the inventor input in SiC, GaN, power MOSFETs and power-module packaging.

**Two ways into Europe.** Korean, Taiwanese, Swiss and Dutch applicants file directly; US, Japanese, Chinese and British applicants mostly enter via PCT. Many equipment, materials and quantum companies file mainly via PCT (Applied Materials 90% of its filings, Entegris, Merck KGaA, Quantinuum 98%, Google 70%). A direct-only count therefore measures who chooses the direct route as much as who invents, which is why the earlier version showed Samsung and the European power firms so prominently.

**The German office as a second European route.** TSMC, Bosch and Renesas file almost exclusively at the German office, and Japanese power firms enter Germany via the PCT national phase rather than the EPO. A DE filing is cheaper and becomes a German patent faster, and Germany is the largest market for automotive power electronics. For these applicants, the German office looks like the main European route rather than a step towards the EPO.

**Advanced packaging grows on every route.** Chiplets, 3D stacking and hybrid bonding grew 5–8% on every route, with Qualcomm and Adeia adding to Intel, Samsung and TSMC. Glass substrates turned out to be an Intel effect in direct filings rather than a broad trend. Europe's contribution to advanced packaging comes through wafer bonding and 3D-integration research (Soitec, CEA, imec) rather than through packaging companies.

**Quantum: European start-ups and US platforms.** Quantum is the domain with the highest European share of inventor input (53%; 52% of filings have a European first-named applicant), but counting the PCT route shows the US platforms: Google, Microsoft, Quantinuum, IBM, PsiQuantum, IonQ. Error correction rising (+32%) while qubit-hardware filings fall (−7%) fits a field moving towards fault-tolerant architectures. The fall in trapped-ion filings (−36%) holds even with Quantinuum counted, so it is not only a filing-route effect, as the direct-only version suggested.

**Memory is a Samsung field, with Chinese challengers.** Samsung files 43% of DRAM applications, almost all directly. The PCT route adds CXMT (45 DRAM), YMTC (66 3D NAND) and Micron. Europe's memory role is in emerging memories (CEA, STMicroelectronics).

**Next-node preparation.** The cluster of CFET, SRAM, FeFET and cell-layout filings by TSMC, Intel, Samsung and imec looks like early preparation for nodes beyond the first GAA generation. Backside power delivery fell 21%; its main filing wave may already lie before this window.

**Austria and Villach.** 314 applications name an Austrian inventor and Infineon accounts for 63% of them, centred on power semiconductors and also trapped-ion and qubit-control work. Among direct filings, Infineon Technologies Austria AG in Villach is the tenth-largest applicant location (185 applications), which makes Villach one of Europe's main semiconductor invention sites by this measure.

**Implications for Europe.** European applicants hold a third of filings in their own market (33%), the same as Europe's share of inventor input (33%), and 44% of direct filings. Their strength is in power electronics, automotive packaging, process research and quantum, and they are largely absent from leading-edge logic, memory, advanced packaging and equipment outside lithography (ASML). This mirrors the CN/TW study, where European applicants appear mainly in lithography, materials and power semiconductors.

Other readings exist. The decline in process categories may be a CPC reclassification effect (H10P from 2026.01) rather than less process research. The national-route decline is partly a coverage gap (IT, GB). Euro-PCT applications describe inventions about a year older than direct filings, so a mix of routes also mixes invention vintages. And IBM's fall (−60%) or Intel's rise (+46%) may reflect changes in filing strategy rather than in invention.

## 11. Methodology appendix

All numbers come from the Google Patents Public Datasets on BigQuery (`patents-public-data.patents.publications`), run in project `patent-study-513418`, dataset `patent_study`.

### Queries and bytes processed (public tables)

| Step | Table built | Bytes |
| --- | --- | --- |
| Corpus builds, direct filings only (first run missed H10W/H10P, redone) | `corpus`, `apps_final` | ≈ 527 GB |
| Categories, applicant grouping, inventor countries, application list (direct) | `rules`, `cats`, `appl`, `inv`, `inv_app`, `application_list` | ≈ 83 GB |
| Family jurisdictions (direct) and earliest priority claims (direct) | `fam_jur`, `prio` | 12.6 GB |
| Route check: kind codes and PCT flags at European offices | — | 16.7 GB |
| Corpus build incl. PCT route, with inventors and priority claims | `corpus2` | 278 GB |
| Categories, applicant grouping, inventors for the full corpus | `apps2`, `apps_final2`, `cats2`, `appl2`, `inv2`, `inv_app2` | 0.2 GB |
| Family jurisdictions (full corpus) | `fam_jur2` | 2.4 GB |
| Applicant locations (Wikidata, PatentsView, Overture Maps; direct filers) | `ent_loc2`, `ent_loc3`, `gaz`, `pv_geo`, `loc_export`, `map_export` | not itemised |
| **Total, study tables** |  | **≈ 920 GB** plus location lookups |

The PCT rebuild (8 Nov) billed about 300 GB, roughly $1.90 at on-demand pricing ($6.25/TB), because the project had already used its free 1 TB this month. Tables in a sandbox expire 60 days after creation: export them before about early January 2027 (in the console: query the table, then Save results → CSV or Google Drive).

### Corpus definition

- **Unit:** application (first publication only; later publications of the same application merged), plus distinct DOCDB `family_id`.
- **Offices:** EP plus the 39 EPO member states.
- **Window:** first publication at a European office 2024-11-01 to 2026-10-31. Effective end: EP 2026-09-16, DE 2026-09-24; IT 2025-12-21.
- **Core scope (CPC, any position):** `^(H10D|H10B|H10W|H10P|H10N60/|H01L(21|23|25|27|29)/|G06N10/|B82Y10/|G06F30/39)`, with B82Y10 counted only together with a quantum keyword. Legacy H01L is matched but carries no document in the window.
- **Route:** an application is PCT route if any of its records carries a PCT number, it has an EP A4 supplementary search report, or it has a German DE 11 2 national-phase number. Euro-PCT applications are dated by their first EP-office record (A1 or A2), which Google Patents dates at entry into the European phase; PCT national-phase entries by their first DE record (mostly T5).
- **Excluded:** utility models (U, Y), validations and translations of EP patents (T, T1–T4), and 1,057 applications that entered only through H10W/H10P and concern LEDs, solar cells or OLEDs (H10H, H10F, H10K without a device or quantum code).
- **Duplicates:** where an application had several publications on its first date, one record was kept.

### Technology assignment

- 61 categories in 7 groups (transistors, materials, memory, processes, integration, design, quantum), each defined by CPC regular expressions and, where useful, English, German and French keywords in title and abstract. Keywords apply only within the matching CPC domain. Rules are stored in `patent_study.rules`.
- Basis recorded per assignment: of 29,738 assignments, 26,404 rest on CPC alone, 2,168 on CPC confirmed by text and 1,166 on text only (96% CPC-based). Seven categories are text-only (CFET, fan-out, trapped ion, neutral atom, photonic, topological, Ga2O3).
- **Full counting:** an application counts in every matching category. 579 applications fall into a domain but no specific category.
- Spot check (direct filings): a sample of text- and CPC-based assignments was read. One error was found and fixed: H10D30/47 also covers nanoribbon FETs, so HEMT was restricted to H10D30/471 ff. and H10D30/015.
- Trends use like-for-like windows: Nov 2024–Aug 2025 vs Nov 2025–Aug 2026.

### Applicant grouping rules

- Starting point is Google's harmonised assignee name. 88 documented rules merge name variants and subsidiaries under a parent, for example all Infineon entities; Samsung Electronics + Display + Electro-Mechanics; LG Display + Electronics + Innotek; BOE and subsidiaries; Shin-Etsu Chemical + Shin-Etsu Handotai; Merck KGaA incl. Versum Materials; AMD incl. Xilinx; Adeia incl. Invensas and Xperi; Resonac incl. Showa Denko. Unmapped applicants keep their harmonised name.
- Co-applicants each receive full credit; totals by country and type count each application once.
- Type is rule-based on the name (company, university, research institute, individual or unclassified); CEA, CNRS, imec and Fraunhofer are set as research institutes. The Wikidata-verified types in the atlas cover direct filers only.

### Origin rules

- **Applicant country** = country code of the first-named applicant on the patent record (`assignee_harmonized.country_code`); 241 records carry none. Group countries in the top-20 table are the parent's headquarters, so Infineon Austria counts as AT in section 7 and as part of the DE parent in section 5.
- **Priority office** = office prefix of the earliest-dated priority claim.
- **Inventor countries** from `inventor_harmonized`, fractional across inventors; known for 13,483 applications. For direct filings all publications of the application are used; for PCT-route additions the first European record.
- **Applicant locations** are verified per filing entity for direct filers: Wikidata headquarters (P159 with coordinates), then the most frequent USPTO applicant address (PatentsView, re-geocoded against Overture Maps), then manual checks. Only exact and city-level locations are placed; nothing is placed at a national centroid, and private inventors stay at country level.

### Deviations from the CN/TW study

1. Both studies now include PCT-route filings and report a PCT-excluded variant. Dating differs: CN counts the CN national-phase publication; here a Euro-PCT application counts at its first EP-office record (European-phase entry).
2. CPC only instead of CPC ∪ IPC, because European documents carry CPC.
3. 61 categories instead of 65; the taxonomies need a mapping for comparison.
4. Emerging-technology rule: ≥ +40% and ≥ 20 applications in the later window (CN/TW: ≥ 40 CN, ≥ 20 TW).
5. No extension domains (quantum communication and sensing, equipment).
6. Applicant locations verified per filing entity instead of inferred regions (direct filers only so far).
7. Title terms not used because of mixed-language titles.

### Known gaps

- **Route dating:** Euro-PCT and direct filings published in the same window stem from different filing years (median Nov 2023 vs Sep 2024).
- **National coverage is uneven:** Italian data ends in December 2025, British data thins out in 2026, small offices are sparsely covered.
- **Locations and verified types** have not yet been extended to applicants that enter only via PCT; the interactive atlas still shows the direct-only corpus.
- Text-only categories depend on keywords and probably undercount, especially for national filings in other languages.
- The window is by first publication, which lags filing by about 18 months (direct) or 31–34 months (PCT route).
- New applicants are new within the window only (no pre-2024 history).
- City-level applicant points are city centres; a company may have moved since its US patents were granted (up to 2021).

The final selection query:

```sql
CREATE OR REPLACE TABLE `patent-study-513418.patent_study.corpus2` AS
WITH g AS (
  SELECT application_number, MIN(publication_date) AS fpd,
    LOGICAL_OR(IFNULL(pct_number,'') != '') AS any_pct,
    LOGICAL_OR(country_code = 'EP' AND kind_code = 'A4') AS any_a4
  FROM `patents-public-data.patents.publications`
  WHERE country_code IN ('EP','AL','AT','BE','BG','CH','CY','CZ','DE','DK','EE','ES','FI','FR','GB','GR','HR','HU','IE','IS','IT','LI','LT','LU','LV','MC','ME','MK','MT','NL','NO','PL','PT','RO','RS','SE','SI','SK','SM','TR')
  GROUP BY application_number
)
SELECT p.publication_number, p.country_code, p.kind_code, p.application_number,
  p.family_id, p.publication_date, g.fpd AS first_publication_date, p.filing_date, p.priority_date,
  p.pct_number, g.any_pct, g.any_a4,
  (SELECT t.text FROM UNNEST(p.title_localized) t ORDER BY t.language = 'en' DESC LIMIT 1) AS title,
  (SELECT a.text FROM UNNEST(p.abstract_localized) a ORDER BY a.language = 'en' DESC LIMIT 1) AS abstract,
  ARRAY(SELECT c.code FROM UNNEST(p.cpc) c) AS cpc_all,
  ARRAY(SELECT a.name FROM UNNEST(p.assignee_harmonized) a) AS applicants,
  ARRAY(SELECT a.country_code FROM UNNEST(p.assignee_harmonized) a) AS applicant_countries,
  ARRAY(SELECT AS STRUCT i.name, NULLIF(i.country_code,'') AS country_code FROM UNNEST(p.inventor_harmonized) i) AS inventors,
  (SELECT pc.application_number FROM UNNEST(p.priority_claim) pc ORDER BY pc.filing_date, pc.application_number LIMIT 1) AS prio_app
FROM `patents-public-data.patents.publications` p
JOIN g USING (application_number)
WHERE g.fpd BETWEEN 20230101 AND 20261031      -- study window applied later: 20241101
  AND p.publication_date = g.fpd
  AND p.kind_code NOT IN ('T','T1','T2','T3','T4','U','U1','U8','Y1')
  AND EXISTS (SELECT 1 FROM UNNEST(p.cpc) c WHERE REGEXP_CONTAINS(c.code,
    r'^(H10D|H10B|H10W|H10P|H10N60/|H01L(21|23|25|27|29)/|G06N10/|B82Y10/|G06F30/39)'))
-- route: is_pct = any_pct OR any_a4 OR STARTS_WITH(application_number, 'DE-112')
```

As-of: direct corpus queried 1 Nov 2026; inventor countries 2 Nov; applicant locations 3–5 Nov; PCT route added and all figures recomputed on 8 Nov 2026.
