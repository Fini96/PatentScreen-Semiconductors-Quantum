# Semiconductor & Quantum Patents in CN and TW (2024–2026)

Nov 4, 2026 · @fini

## 1. Executive summary

**80,062 CN and 19,484 TW invention publications** in semiconductors and quantum technologies were first published between 1 Nov 2024 and the data cut-off (CN: 8 Sep 2026; TW: Jun 2026). China is a mostly domestic, broad-based and academically heavy filing system. Taiwan is a small, foreign-dominated market led by TSMC and the global equipment makers.

*Data findings*

- **The corpus is far larger than the EP-style scope suggests.** Adding IPC to CPC and including the new 2026 subclasses H10P (processes) and H10W (packaging/interconnect) raises the CN corpus from 52,987 to 80,062 (+51%) and TW from 13,650 to 19,484 (+43%). With the legacy scope, CN would show a false 46% collapse in Q1 2026.
- **Largest technology fields (CN):** wafer handling & process apparatus 晶圆传输与工艺装置 (18,596), package substrates & leadframes 封装基板与引线框架 (8,611), deposition & epitaxy 薄膜沉积与外延 (7,607), bumps/wire bonds 凸块/引线键合 (7,193), encapsulation 塑封 (7,094). TW has the same top tier, led by wafer handling (5,659) and deposition (3,829).
- **Fastest-growing (CN, like-for-like Y1→Y2, full text):** 3D stacking 三维堆叠 +98%, chiplets/2.5D/interposer 芯粒/中介层 +94%, hybrid bonding 混合键合 +82%, glass substrates/TGV 玻璃基板/玻璃通孔 +82%, wafer bonding & layer transfer +48%, fan-out packaging 扇出型封装 +38%. Advanced packaging is the clear growth front.
- **Top players.** CN: Samsung (3,410), Hua Hong (1,454), TSMC (1,201), Chinese Academy of Sciences (1,182), BOE (1,135), Applied Materials (951), Tokyo Electron (909), YMTC (893), Huawei (888). TW: TSMC (2,083), Applied Materials (1,252), Tokyo Electron (1,042), Samsung (1,026), Nanya (550).
- **Origin.** 69% of CN filings are domestic (55,329). Japan 8,046, US 5,331, Korea 5,246, Taiwan 3,392 and Europe 2,635 follow. In TW, only 30% are Taiwanese (5,776): Japan 6,115, US 3,367, Korea 1,771, mainland China 1,090, Europe 1,005.
- **Quantum is a CN story.** 4,852 CN quantum inventions (6.1% of corpus, +21% Y1→Y2, 91% domestic, 39% academic) against 118 in TW. Origin Quantum 本源量子 (441) leads, then CAS, USTC, the Yangtze River Delta Quantum Innovation Center and Hefei National Laboratory. The Anhui/Hefei cluster dominates. Algorithms & software 量子算法与软件 is the biggest sub-field (3,250).
- **Academic weight.** Universities or research institutes appear on 13.6% of CN filings, against 2.1% in TW.
- **Cross-strait.** TSMC, Nanya, UMC, Innolux and ASE file actively in CN (3,392 CN publications with TW applicants). Mainland equipment makers (Naura, ACM Research, AMEC) and JCET are the main CN filers in TW (1,090). 55% of TW publications belong to families that also have a CN member.

*Main caveats:* CN applicant nationality is not in the data and is derived from names and priority claims. TW 2026 volumes are not robust (see section 2).

## 2. Data, scope and corpus

The corpus covers invention patents (kind A/B) whose first publication falls between 2024-11-01 and the last available date. Each application is counted once.

**Data freshness** (Google Patents Public Datasets, queried 3 Nov 2026): CN latest publication 2026-09-08, so September is partial and August is the last full month. TW latest overall is 2026-09-01, but TW A/B publications stop after June 2026; July–October are missing, not zero.

| Measure | CN | TW |
| --- | --- | --- |
| Invention publications (applications) | 80,062 | 19,484 (A 17,231 · B 2,253) |
| Distinct families | 79,118 | 18,824 |
| PCT national phase | 9,524 (11.9%) | 0 (Taiwan is not a PCT state) |
| PCT-excluded variant (EP-comparable): applications / families | 70,538 / 69,783 | 19,484 / 18,824 |
| Utility models, same scope (separate line, not in totals) | 18,288 (CN U, 实用新型) | 839 (TW U, 新型) |
| Selected only via IPC (no CPC match) | 28,982 (36.2%) | 3,967 (20.4%) |
| Would be in the EP-study (legacy) scope | 52,987 | 13,650 |
| Abstract retrieved in the second run (4 Nov 2026) | 23,072 (28.8%) | 3,866 (19.8%) |
| Family also filed at EP / US / JP / KR | 19,783 (24.7%) | 13,296 (68.2%) |
| Family also filed at EP | 5,002 (6.2%) | 2,284 (11.7%) |

**Filing-date view.** The median filing month of documents first published in Nov 2024 is Jul 2024 for CN and Jan 2024 for TW. By Aug 2026 it is Apr 2026 for CN. The window therefore mostly covers filings from mid-2024 to early 2026; CN publishes faster than TW.

**Kind codes.** CN first publications are almost all A (one B). CN U utility models are reported separately. TW has A, B (grants without prior A publication), U/M utility models and S designs (excluded).

**Why the corpus differs from the EP-style scope.** Two data facts force deviations, which are applied to both offices:

1. 31.6% of all CN invention publications in the window carry no CPC at all, and CPC on CN documents is a partial mapping. IPC is 100% populated, so selection uses **CPC ∪ IPC**.
2. From 2026 the data carries the new subclasses **H10P** (generic processes, successor of H01L 21/) and **H10W** (packages, interconnects, isolation, successor of H01L 23/25). CN documents carry no H01L at all from January 2026. Both subclasses were added to the core scope. Note: the EP prompt's regex misses them too and will under-count 2026.

## 3. Technology rankings

Process equipment and packaging dominate both offices by volume. Wafer handling & process apparatus alone is 23% of CN and 29% of TW filings. Counting is **full**: a document counts in every category it matches, so shares add up to more than 100%. Change = like-for-like windows (CN Nov–Aug vs Nov–Aug; TW Nov–Jun vs Nov–Jun), computed on full text (codes, title and abstract) for both periods. Baselines: CN total +2.5% (35,539 → 36,428), TW total −11% (8,104 → 7,207).

### CN (CNIPA) — top 22 of 50 core categories

| Technology | Chinese term | Code basis | Apps | Families | Share | Change | Top 5 applicants (apps) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Wafer handling & process apparatus | 晶圆传输与工艺装置 | H01L21/67–68, H10P72 | 18,596 | 18,362 | 23.2% | −5% | Tokyo Electron 704; Naura 608; Samsung 593; Applied Materials 541; SCREEN 363 |
| Package substrates & leadframes | 封装基板与引线框架 | H01L23/49, H10W70 + text | 8,611 | 8,501 | 10.8% | +4% | Samsung 391; JCET 247; TSMC 191; Huawei 180; Infineon 167 |
| Deposition & epitaxy | 薄膜沉积与外延 | H01L21/02, H10P14 + text | 7,607 | 7,530 | 9.5% | −25% | Applied Materials 389; Tokyo Electron 271; ASM 232; Hua Hong 214; Lam 176 |
| Bumps, wire bonds & package interconnects | 凸块/引线键合/封装互连 | H10W72 + text | 7,193 | 7,064 | 9.0% | −10% | Samsung 380; JCET 214; TSMC 195; Infineon 144; Huawei 123 |
| Encapsulation & housings | 塑封与封装外壳 | H10W74/76 + text | 7,094 | 6,984 | 8.9% | −7% | Samsung 270; JCET 243; Infineon 163; Huawei 152; TSMC 139 |
| CMP & cleaning | 化学机械抛光与清洗 | H01L21/304–321, H10P52/70 + text | 6,494 | 6,385 | 8.1% | −10% | Tokyo Electron 259; Hua Hong 198; SCREEN 193; Applied Materials 168; Samsung 126 |
| Thermal management of chips/packages | 芯片与封装散热 | H01L23/34–473, H10W40 + text | 6,064 | 5,975 | 7.6% | +5% | Huawei 149; Samsung 124; JCET 106; TSMC 97; Infineon 79 |
| Etching | 刻蚀 | H01L21/3065–311, H10P50 + text | 5,912 | 5,849 | 7.4% | −10% | Tokyo Electron 344; Hua Hong 307; Samsung 176; Applied Materials 169; TSMC 129 |
| On-chip interconnect (BEOL) | 片上互连(后道) | H01L21/768, H01L23/52, H10W20 | 5,352 | 5,258 | 6.7% | −14% | Samsung 590; TSMC 340; SK hynix 173; Nanya 161; YMTC 135 |
| In-line test & metrology | 在线检测与量测 | H01L21/66, H01L22, H10P74 | 5,092 | 5,052 | 6.4% | +31% | Hua Hong 146; Applied Materials 127; Samsung 111; Eswin 106; Tokyo Electron 87 |
| IC design / EDA | 集成电路设计/EDA | G06F30/39 | 4,425 | 4,410 | 5.5% | +15% | Inspur 118; CAS 94; State Grid 64; UESTC 62; Huawei 58 |
| Thin-film transistor (TFT) | 薄膜晶体管 | H01L29/786, H10D86 + text | 3,408 | 3,322 | 4.3% | −19% | BOE 612; Samsung 479; LG Display 356; Tianma 214; TCL CSOT 195 |
| Doping & annealing | 掺杂与退火 | H01L21/22–324, H10P30/32 + text | 3,378 | 3,356 | 4.2% | −9% | Hua Hong 144; CAS 94; Applied Materials 92; Shanghai Jita 62; TSMC 61 |
| Quantum algorithms & software | 量子算法与软件 | G06N10/20–80 + text | 3,250 | 3,237 | 4.1% | +27% | Origin Quantum 329; State Grid 73; China Mobile 72; CAS 71; USTC 70 |
| DRAM | 动态随机存取存储器 | H10B12, H01L27/108 + text | 2,978 | 2,906 | 3.7% | +7% | Samsung 548; YMTC 373; CXMT 354; Beijing Superstring Academy 315; Nanya 282 |
| Lithography & patterning (process) | 光刻与图形化 | H01L21/027–033, H10P76 + text | 2,805 | 2,778 | 3.5% | −6% | Hua Hong 165; Samsung 132; Tokyo Electron 106; Applied Materials 80; CAS 69 |
| NAND / 3D NAND flash | NAND/三维闪存 | H10B41/43, H01L27/115 + text | 2,553 | 2,491 | 3.2% | +5% | YMTC 406; SK hynix 282; Samsung 262; Hua Hong 234; Kioxia 210 |
| SiC devices | 碳化硅器件 | text in scope | 2,067 | 2,052 | 2.6% | +5% | Xidian Univ. 73; Global Power Tech 66; Gree 49; CAS 41; Hangzhou Puxi 35 |
| Display backplanes / array substrates | 显示面板阵列基板 | text in scope | 1,911 | 1,839 | 2.4% | −39% | BOE 664; Visionox 246; Tianma 243; TCL CSOT 207; Samsung 112 |
| Through-silicon via (TSV) | 硅通孔 | H10W20/2 + text | 1,865 | 1,846 | 2.3% | −22% | Samsung 269; TSMC 108; Intel 69; Huawei 49; SK hynix 38 |
| GaN devices / HEMT | 氮化镓器件/HEMT | H01L29/7786 + text | 1,628 | 1,612 | 2.0% | +7% | Xidian Univ. 207; CAS 70; UESTC 40; SITRI 35 |
| Si power MOSFET (trench/SJ/LDMOS) | 硅功率MOSFET(沟槽/超结) | text in scope | 1,547 | 1,542 | 1.9% | −2% | Hua Hong 158; China Resources Micro 63; UESTC 52; Global Power Tech 38 |

### TW (TIPO) — top 17

| Technology | Chinese term | Apps | Families | Share | Change | Top 5 applicants (apps) |
| --- | --- | --- | --- | --- | --- | --- |
| Wafer handling & process apparatus | 晶圓傳送與製程裝置 | 5,659 | 5,510 | 29.0% | −19% | Tokyo Electron 644; Applied Materials 629; SCREEN 285; Lam 245; TSMC 225 |
| Deposition & epitaxy | 薄膜沉積與磊晶 | 3,829 | 3,743 | 19.7% | −32% | Applied Materials 468; TSMC 372; Tokyo Electron 345; Shin-Etsu 180; Lam 177 |
| On-chip interconnect (BEOL) | 晶片內連線(後段) | 2,615 | 2,482 | 13.4% | −21% | TSMC 643; Samsung 323; Nanya 181; Applied Materials 152; UMC 84 |
| CMP & cleaning | 化學機械研磨與清洗 | 2,398 | 2,350 | 12.3% | −19% | Tokyo Electron 339; Applied Materials 212; SCREEN 181; TSMC 143; Ebara 75 |
| Bumps, wire bonds & package interconnects | 凸塊/打線接合/封裝互連 | 2,373 | 2,270 | 12.2% | −13% | TSMC 427; JCET 105; Samsung 104; Amkor 104; Qualcomm 83 |
| Etching | 蝕刻 | 2,297 | 2,249 | 11.8% | −9% | Tokyo Electron 447; TSMC 271; Applied Materials 228; Lam 117; Nanya 109 |
| Package substrates & leadframes | 封裝基板與導線架 | 2,185 | 2,111 | 11.2% | −17% | TSMC 382; Amkor 105; Samsung 104; JCET 101; ASE 94 |
| Encapsulation & housings | 封膠與封裝外殼 | 1,935 | 1,869 | 9.9% | −12% | TSMC 320; Amkor 109; ASE 106; JCET 105; Samsung 68 |
| Lithography & patterning (process) | 微影與圖案化 | 1,786 | 1,738 | 9.2% | −26% | Tokyo Electron 169; Shin-Etsu 164; TSMC 146; Samsung 116; Applied Materials 92 |
| In-line test & metrology | 線上檢測與量測 | 1,177 | 1,140 | 6.0% | −11% | Applied Materials 136; Tokyo Electron 92; TSMC 78; KLA 62; Samsung 46 |
| Thermal management | 晶片與封裝散熱 | 1,143 | 1,113 | 5.9% | −9% | TSMC 186; ASE 52; Adeia 38; JCET 25; onsemi 24 |
| DRAM | 動態隨機存取記憶體 | 998 | 904 | 5.1% | +25% | Nanya 316; Samsung 237; Semiconductor Energy Lab 58; Winbond 58; Applied Materials 49 |
| Doping & annealing | 摻雜與退火 | 811 | 788 | 4.2% | −17% | TSMC 138; Applied Materials 125; Nanya 30; UMC 23; Tokyo Electron 22 |
| Through-silicon via (TSV) | 矽穿孔 | 772 | 742 | 4.0% | −19% | TSMC 215; Samsung 147; Nanya 36; Amkor 27; UMC 26 |
| NAND / 3D NAND flash | NAND/3D快閃記憶體 | 720 | 663 | 3.7% | +5% | Kioxia 193; Samsung 59; Macronix 56; Winbond 46; Semiconductor Energy Lab 41 |
| Hybrid bonding | 混合鍵合 | 573 | 549 | 2.9% | −19% | TSMC 160; Adeia 57; Samsung 39; Applied Materials 28; Kioxia 27 |
| Thin-film transistor (TFT) | 薄膜電晶體 | 542 | 506 | 2.8% | −39% | Semiconductor Energy Lab 132; LG Display 49; TSMC 46; Samsung 45; AUO 35 |

Not categorised beyond domain level: 8,388 CN (10.5%) and 1,794 TW (9.2%) documents. Code basis is the same for TW as for CN. The full 65-category tables with basis counts (code only / code + text / text only) are in the BigQuery table `cntw_study.application_list`.

## 4. Per-domain breakdown

Domain 1 (transistors, devices, memory and processes) is the largest in both offices: CN 56,974 · TW 16,163. Domain 2 (chips, integration & design) is CN 30,220 · TW 7,663. Quantum is CN 4,852 · TW 118. Domains overlap: one document can sit in several.

### Domain 1 — devices, materials and memory (beyond the top tables)

| Sub-technology | Chinese term (CN / TW) | CN | CN change | TW | Leading applicants (CN) |
| --- | --- | --- | --- | --- | --- |
| Dicing & singulation | 切割与划片 / 切割與晶粒分離 | 1,728 | +4% | 478 | Resonac 50; Samsung 37; Hua Hong 24 |
| Device isolation & buried regions | 器件隔离与埋层 / 元件隔離與埋層 | 1,426 | −8% | 449 | Hua Hong 165; Nexchip 67; TSMC 58 |
| IGBT | 绝缘栅双极型晶体管 / 絕緣閘雙極電晶體 | 1,289 | −16% | 96 | Mitsubishi Electric 79; Infineon 72; Toshiba 72; Fuji Electric 51 |
| RRAM / memristor | 阻变存储器/忆阻器 / 電阻式記憶體 | 1,110 | +6% | 262 | SK hynix 133; Xincun Tech 99; Samsung 91; UMC 45 |
| Oxide semiconductor (IGZO) | 氧化物半导体 / 氧化物半導體 | 891 | −5% | 273 | Samsung 70; Semiconductor Energy Lab 59; Japan Display 51 |
| Wafer bonding & layer transfer | 晶圆键合与层转移 / 晶圓接合與層轉移 | 851 | +48% | 246 | CAS 34; Tokyo Electron 28; Piotech 23; Soitec 21 |
| Ferroelectric (FeFET/FeRAM) | 铁电器件 / 鐵電元件 | 828 | +14% | 146 | CAS 67; Samsung 61; Huawei 46; YMTC 46 |
| MRAM / spintronics | 磁性随机存储器 / 磁阻式記憶體 | 699 | −5% | 259 | Samsung 93; SK hynix 65; Hikstor 64; UMC 45 |
| Image sensors | 图像传感器 / 影像感測器 | 608 | −48% | 217 | Sony 103; Hua Hong 28; Samsung 26 |
| 2D-material devices | 二维材料器件 / 二維材料元件 | 548 | +13% | 84 | CAS 37; Samsung 19; HUST 17; Fudan 15 |
| GAA / nanosheet | 全环绕栅极/纳米片晶体管 / 環繞式閘極電晶體 | 396 | +8% | 129 | CAS 53; Samsung 48; Intel 24 |
| CFET / stacked transistors | 互补场效应晶体管 / 互補式場效電晶體 | 392 | +8% | 113 | Peking Univ. 46; TSMC 42; CAS 31; Superstring Academy 28 |
| Ga2O3 devices | 氧化镓器件 / 氧化鎵元件 | 341 | +20% | 22 | Xidian Univ. 59; CAS 19; Jiufengshan Lab 16 |
| Micro-/Mini-LED | 微型发光二极管 / 微型發光二極體 | 243 | −18% | 60 | ams-OSRAM 21; LG Display 15; JBD 8 |
| III-V (GaAs/InP) | 砷化镓/磷化铟器件 | 237 | +30% | 48 | CAS 12; Guangdong Xiandao 11; Innoscience 9 |
| FinFET | 鳍式场效应晶体管 / 鰭式場效電晶體 | 156 | 0% | 103 | Samsung 21; Xidian 11; CAS 9; SMIC 8; TSMC 8 |
| Phase-change memory | 相变存储器 / 相變記憶體 | 100 | −26% | 10 | Xincun Tech 32; CAS 9 |
| Compute-in-memory | 存算一体 / 記憶體內運算 | 82 | +40% | 3 | HUST 6; CAS 6; Peking Univ. 5 |

Material platforms in CN, by count: SiC 2,067 > GaN 1,628 > oxide 891 > 2D 548 > Ga2O3 341 > III-V 237. Wide-bandgap power work is driven by universities (Xidian, UESTC, CAS) and domestic power firms. In TW, SiC (149) and GaN (113) are small and mostly materials suppliers.

### Domain 2 — advanced packaging and integration

| Sub-technology | Chinese term (CN / TW) | CN | CN change | TW | TW change | Leading applicants |
| --- | --- | --- | --- | --- | --- | --- |
| Chiplets / 2.5D / interposer | 芯粒/中介层 / 小晶片/中介層 | 1,343 | +94% | 386 | +10% | CN: TSMC 54, JCET 53, Samsung 53, Intel 39 · TW: TSMC 100, JCET 30 |
| 3D stacking / monolithic 3D | 三维堆叠 / 三維堆疊 | 1,284 | +98% | 279 | +45% | CN: Samsung 121, YMTC 40, SK hynix 37, Intel 37 · TW: TSMC 59, Samsung 29 |
| Hybrid bonding | 混合键合 / 混合鍵合 | 1,242 | +82% | 573 | −19% | CN: Samsung 99, YMTC 69, SK hynix 64, TSMC 61 · TW: TSMC 160, Adeia 57 |
| Fan-out / wafer- & panel-level | 扇出型/晶圆级封装 / 扇出型/晶圓級封裝 | 1,174 | +38% | 270 | −27% | CN: Huatian 51, Samsung 37, Huawei 32, JCET 30 · TW: TSMC 55 |
| Power modules | 功率模块 / 功率模組 | 1,137 | +7% | 42 | −20% | CN: Huawei 66, Changfei 30, Hyundai 25, Kia 25 |
| Glass substrates / TGV | 玻璃基板/玻璃通孔 | 584 | +82% | 97 | +32% | CN: Absolics (Ebersolic) 31, Intel 31, Visionox 30, Chengdu Yicheng 29 · TW: Absolics 29, NEG 9 |
| Backside power delivery | 背面供电 / 背面供電 | 110 | −25% | 69 | −25% | CN: IBM, Samsung, SJSemi · TW: Samsung, TSMC |

### Domain 3 — quantum (corrected definition, see section 11)

| Sub-technology | Chinese term (CN / TW) | CN | CN change | TW | Leading applicants (CN) |
| --- | --- | --- | --- | --- | --- |
| Algorithms & software | 量子算法与软件 / 量子演算法與軟體 | 3,250 | +27% | 60 | Origin Quantum 329; State Grid 73; China Mobile 72; CAS 71; USTC 70 |
| Superconducting qubits & devices | 超导量子比特 / 超導量子位元 | 608 | +6% | 31 | Origin Quantum 67; CAS 43; YRD Quantum Center 36; BAQIS 34; Hefei Nat. Lab 31 |
| Cryogenics, control & readout | 低温、测控与读取 | 509 | +25% | 13 | Origin Quantum 93; USTC 37; Hefei Nat. Lab 33; YRD Center 33; SpinQ 29 |
| Error correction / mitigation | 量子纠错与误差缓解 | 467 | +19% | 18 | Origin Quantum 59; Google 26; USTC 17 |
| Coupling & quantum-chip architecture | 量子比特耦合与量子芯片架构 | 403 | +32% | 6 | Origin Quantum 130; YRD Center 36; SpinQ 22; Inspur 21 |
| Photonic quantum computing | 光量子计算 | 96 | +340% | 1 | Turing Quantum (Shanghai/Wuxi) 38; Bose Quantum 17 |
| Trapped-ion | 离子阱 | 82 | 0% | 1 | USTC 16; Hefei Yaozheng Quantum 10; Huawei 9 |
| Neutral atoms | 中性原子 | 55 | +74% | 0 | Zhongke Kuyuan 5; Huawei 5; BAQIS 4 |
| Spin / semiconductor qubits | 自旋/半导体量子比特 | 38 | −13% | 2 | RWTH Aachen 10; FZ Jülich 8; Hefei Nat. Lab 5 |
| Topological | 拓扑量子 | 21 | +86% | 2 | SJTU 2; Microsoft 2 |

TW quantum (118) is almost entirely foreign: IBM 10, Multiverse Computing (ES) 9, Photonic Inc. (CA) 8, Silicon Quantum Computing (AU) 5, ITRI 5.

### Extensions (reported separately; full extension sets, not only the core overlap)

| Extension | Chinese term | CN | CN change | TW | Leading applicants (CN) |
| --- | --- | --- | --- | --- | --- |
| QKD / quantum cryptography | 量子密钥分发 / 量子金鑰分發 | 1,760 | −34% | 10 | China Telecom Quantum 156; State Grid 82; Matrix Time 60; China Mobile 56; QuantumCTek 44 |
| Quantum communication & networks | 量子通信与网络 | 1,006 | −16% | 25 | China Telecom 59; QuantumCTek 31; USTC 30; CAS 30 |
| Quantum magnetometry (NV/atomic/SQUID) | 量子磁测 | 689 | +46% | 6 | Beihang Univ. 119; State Grid 31; Anhui Guosheng Quantum 23 |
| Atomic clocks | 原子钟 | 260 | +46% | 0 | CAS 59; Beijing Inst. Radio Metrology 31; Peking Univ. 12 |
| Lithography tools, masks & resists | 光刻设备/掩模/光刻胶 | 9,690 | +11% | 3,634 | ASML 497; CAS 358; Shin-Etsu 308; Samsung 251; Hua Hong 187 |
| CVD / ALD | 化学气相沉积/原子层沉积 | 8,283 | +4% | 2,206 | Applied Materials 345; Piotech 319; ASM 296; CAS 246; Lam 213 |
| Plasma processing equipment | 等离子体工艺设备 | 3,318 | +6% | 1,837 | Applied Materials 346; Tokyo Electron 343; Naura 196; Lam 194 |
| Wafer handling apparatus | 晶圆处理装置 | 3,270 | +51% | 1,360 | Naura 149; Samsung 116; Applied Materials 82; Tokyo Electron 80; Piotech 65 |

Extension totals: quantum comm. & sensing CN 4,362 / TW 44; equipment CN 35,011 / TW 10,679. G01N24 (magnetic resonance, CN 1,282) is dominated by oil-industry NMR (PetroChina 119) and is not quantum-specific. C23C16 also includes non-semiconductor coatings.

## 5. Top applicants

**Concentration is low in CN and high in TW.** The top 5 groups hold 10.5% of CN filings (8,382 of 80,062) but 30.6% of TW filings (5,953 of 19,484). Applicants are grouped under parents (rules in section 11). Change = like-for-like windows; compare against the office baselines (CN +2.5%, TW −11%).

### CN — top 20

| # | Applicant (parent) | Type | Country (CN region) | Apps | Y1 → Y2 | Technology profile (top 3) |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Samsung (incl. Display, SDI, SEMES) | company | KR | 3,410 | 1,595 → 1,517 (−5%) | wafer handling; BEOL; DRAM |
| 2 | Hua Hong Group (incl. Huali) 华虹 | company | CN (Shanghai) | 1,454 | 563 → 733 (+30%) | etching; NAND; deposition |
| 3 | TSMC 台积电 | company | TW | 1,201 | 544 → 538 (−1%) | BEOL; bumps; package substrates |
| 4 | Chinese Academy of Sciences 中国科学院 (all institutes) | institute | CN (Beijing) | 1,182 | 554 → 486 (−12%) | deposition; EDA; etching |
| 5 | BOE 京东方 | company | CN (Beijing) | 1,135 | 672 → 375 (−44%) | display backplanes; TFT |
| 6 | Applied Materials | company | US | 951 | 451 → 413 (−8%) | wafer handling; deposition; etching |
| 7 | Tokyo Electron | company | JP | 909 | 385 → 414 (+8%) | wafer handling; etching; deposition |
| 8 | YMTC 长江存储 | company | CN (Hubei) | 893 | 329 → 423 (+29%) | NAND; DRAM; BEOL |
| 9 | Huawei 华为 (incl. HiSilicon) | company | CN (Guangdong) | 888 | 392 → 381 (−3%) | package substrates; thermal; encapsulation |
| 10 | SMIC 中芯国际 | company | CN (Shanghai) | 687 | 326 → 272 (−17%) | BEOL; metrology; NAND |
| 11 | Naura 北方华创 | company | CN (Beijing) | 648 | 266 → 283 (+6%) | wafer handling; CMP/cleaning; etching |
| 12 | CXMT 长鑫 | company | CN (Anhui) | 638 | 423 → 153 (−64%) | DRAM; BEOL; bumps |
| 13 | SK hynix | company | KR | 603 | 267 → 283 (+6%) | NAND; BEOL; RRAM |
| 14 | Nexchip 晶合集成 | company | CN (Anhui) | 557 | 181 → 323 (+78%) | etching; isolation; metrology |
| 15 | Beijing Superstring Academy of Memory Tech. 超弦存储器研究院 | institute | CN (Beijing) | 546 | 225 → 278 (+24%) | DRAM; NAND; ferroelectric |
| 16 | Xidian University 西安电子科技大学 | university | CN (Shaanxi) | 538 | 281 → 219 (−22%) | GaN/HEMT; SiC; Ga2O3 |
| 17 | LG Display | company | KR | 531 | 243 → 275 (+13%) | TFT; display backplanes |
| 18 | Nanya Technology 南亚科技 | company | TW | 499 | 212 → 204 (−4%) | DRAM; BEOL; etching |
| 19 | Visionox 维信诺 | company | CN (Jiangsu) | 471 | 225 → 220 (−2%) | display backplanes; TFT; substrates |
| 20 | Origin Quantum 本源量子 | company | CN (Anhui) | 447 | 175 → 222 (+27%) | quantum algorithms; quantum chips; control & readout |

Next five: Infineon (DE) 436, UESTC 423, SCREEN (JP) 382, JCET 379 (+24%), Shanghai Jita 376 (−70%).

### TW — top 20

| # | Applicant (parent) | Type | Country | Apps | Y1 → Y2 | Technology profile (top 3) |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | TSMC 台積電 | company | TW | 2,083 | 937 → 811 (−13%) | BEOL; bumps; package substrates |
| 2 | Applied Materials | company | US | 1,252 | 528 → 469 (−11%) | wafer handling; deposition; etching |
| 3 | Tokyo Electron | company | JP | 1,042 | 392 → 439 (+12%) | wafer handling; etching; deposition |
| 4 | Samsung (incl. Display, SDI, SEMES) | company | KR | 1,026 | 419 → 390 (−7%) | BEOL; DRAM; TSV |
| 5 | Nanya Technology 南亞科技 | company | TW | 550 | 259 → 164 (−37%) | DRAM; BEOL; etching |
| 6 | SCREEN | company | JP | 374 | 146 → 141 (−3%) | wafer handling; CMP/cleaning; etching |
| 7 | UMC 聯電 | company | TW | 359 | 134 → 131 (−2%) | BEOL; RRAM; MRAM |
| 8 | Lam Research | company | US | 356 | 132 → 131 (−1%) | wafer handling; deposition; etching |
| 9 | Kioxia | company | JP | 320 | 85 → 169 (+99%) | NAND; BEOL; bumps |
| 10 | Shin-Etsu | company | JP | 299 | 130 → 99 (−24%) | deposition; lithography; etching |
| 11 | ASM International | company | NL | 235 | 85 → 97 (+14%) | wafer handling; deposition |
| 12 | Semiconductor Energy Laboratory | company | JP | 205 | 74 → 90 (+22%) | TFT; oxide semiconductor; DRAM |
| 13 | Resonac | company | JP | 195 | 89 → 59 (−34%) | encapsulation; bumps; CMP |
| 14 | ASE Group (incl. SPIL) 日月光/矽品 | company | TW | 184 | 77 → 79 (+3%) | encapsulation; substrates; bumps |
| 15 | Naura 北方華創 | company | CN | 179 | 57 → 73 (+28%) | wafer handling; etching; deposition |
| 16 | Fujifilm | company | JP | 170 | 76 → 46 (−39%) | deposition; lithography |
| 17 | Innolux 群創 | company | TW | 166 | 88 → 39 (−56%) | BEOL; substrates; encapsulation |
| 18 | Qualcomm | company | US | 160 | 66 → 75 (+14%) | substrates; bumps; BEOL |
| 19 | Powerchip (PSMC) 力積電 | company | TW | 155 | 65 → 55 (−15%) | lithography; deposition; BEOL |
| 20 | Kokusai Electric | company | JP | 154 | 61 → 51 (−16%) | deposition; wafer handling |

**Applicant types (share of filings with at least one applicant of that type):**

| Type | CN | TW |
| --- | --- | --- |
| Company | 69,856 (87.3%) | 19,129 (98.2%) |
| University | 7,529 (9.4%) | 289 (1.5%) |
| Research institute | 3,738 (4.7%) | 127 (0.7%) |
| University or institute | 10,861 (13.6%) | 407 (2.1%) |
| Individual | 393 (0.5%) | 113 (0.6%) |
| No applicant field | 0 | 0 |

In CN quantum the academic share is 38.9% (1,887 of 4,852).

## 6. Quarterly time series

CN volume is flat at about 10.3–11.3k inventions per quarter through Q2 2026. The extended scope removes a classification artefact that would otherwise read as a collapse.

&#91;embedded content: BigQuery, patents-public-data · CN/TW A+B first publications Nov 2024–Sep 2026\]

The publication-lag boundary is the last complete month: Aug 2026 for CN and Jun 2026 for TW. Quarters after that are missing, not zero. TW's 2026 dip (2,406 in Q1) coincides with the same H01L → H10P/H10W transition, while total TW publications of all technologies stayed flat (≈3,100–3,600 a month). Treat the TW 2026 decline as **not robust**.

**Top 10 technologies by quarter, CN** (incomplete quarters in brackets):

| Technology | \[24-Q4\] | 25-Q1 | 25-Q2 | 25-Q3 | 25-Q4 | 26-Q1 | 26-Q2 | \[26-Q3\] |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Wafer handling & apparatus | 1,714 | 2,618 | 2,551 | 2,522 | 2,636 | 2,348 | 2,436 | 1,771 |
| Package substrates & leadframes | 826 | 1,108 | 1,143 | 1,115 | 934 | 1,316 | 1,287 | 882 |
| Deposition & epitaxy | 975 | 1,109 | 1,082 | 1,065 | 1,192 | 736 | 866 | 582 |
| Bumps / wire bonds | 840 | 1,024 | 927 | 1,007 | 645 | 1,047 | 990 | 713 |
| Encapsulation | 741 | 979 | 960 | 988 | 617 | 1,097 | 996 | 716 |
| CMP & cleaning | 642 | 891 | 862 | 973 | 971 | 753 | 840 | 562 |
| Thermal management | 512 | 789 | 810 | 798 | 778 | 823 | 857 | 697 |
| Etching | 655 | 762 | 850 | 781 | 823 | 669 | 812 | 560 |
| BEOL interconnect | 559 | 761 | 780 | 761 | 674 | 624 | 716 | 477 |
| In-line test & metrology | 398 | 639 | 552 | 617 | 706 | 778 | 835 | 567 |

**Top 10 technologies by quarter, TW:**

| Technology | \[24-Q4\] | 25-Q1 | 25-Q2 | 25-Q3 | 25-Q4 | 26-Q1 | 26-Q2 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Wafer handling & apparatus | 623 | 912 | 901 | 915 | 913 | 642 | 753 |
| Deposition & epitaxy | 473 | 680 | 599 | 648 | 729 | 309 | 391 |
| BEOL interconnect | 334 | 410 | 441 | 378 | 326 | 296 | 430 |
| CMP & cleaning | 270 | 401 | 363 | 380 | 460 | 238 | 286 |
| Bumps / wire bonds | 278 | 373 | 376 | 348 | 303 | 295 | 400 |
| Etching | 242 | 376 | 345 | 331 | 371 | 274 | 358 |
| Package substrates | 233 | 359 | 360 | 346 | 269 | 252 | 366 |
| Encapsulation | 223 | 325 | 287 | 268 | 259 | 241 | 332 |
| Lithography & patterning | 224 | 311 | 250 | 317 | 350 | 127 | 207 |
| In-line test & metrology | 120 | 184 | 175 | 208 | 194 | 106 | 190 |

The Q4 2025 dips in CN bumps and encapsulation, and the 2026 drops in deposition, CMP and lithography, line up with months where CPC is missing or reclassified. Read them as classification effects until confirmed.

## 7. Origin of filings

CNIPA is a home market: 69% of filings are domestic. TIPO is a foreign-majority market: 70% of filings come from abroad, Japan first.

&#91;embedded content: BigQuery, cntw\_study.corpus · CN 80,062 / TW 19,484 invention publications\]

### a) Priority office (earliest priority claim — data-derived for both offices)

| Priority office | At CN | of which PCT route | At TW |
| --- | --- | --- | --- |
| Mainland China | 55,696 (69.6%) | 672 | 1,108 (5.7%) |
| United States | 8,256 (10.3%) | 2,985 | 7,441 (38.2%) |
| Japan | 7,563 (9.4%) | 4,167 | 5,809 (29.8%) |
| South Korea | 5,330 (6.7%) | 644 | 1,653 (8.5%) |
| Taiwan | 1,009 (1.3%) | 0 | 2,759 (14.2%) |
| EPO | 825 | 456 | 263 |
| Germany | 669 | 225 | 133 |
| France | 254 | 135 | 78 |
| United Kingdom | 118 | 73 | 67 |

Many Taiwanese applicants (TSMC above all) claim **US first filings**, which is why only 14% of TW filings carry a TW priority although 30% have TW applicants.

### b) Filing route

CN: 9,524 PCT national-phase entries (11.9%), mostly from Japanese (4,455) and US (2,797) applicants. Domestic CN applicants almost never use the PCT route to enter CN (695). TW: 0, since Taiwan is not a PCT contracting state and foreign filers enter via Paris Convention priority.

### c) Europe

European applicants file 2,635 CN (3.3%) and 1,005 TW (5.2%) inventions. In CN the largest are Infineon 436, ASM International, Nexperia, STMicroelectronics and imec. In TW they are ASML, ASM International, Merck KGaA, Soitec and Zeiss. Europe's quantum filings in CN number 161 (e.g. RWTH Aachen and FZ Jülich on spin qubits).

### d) Cross-strait flows

| TW applicants filing in CN | CN apps | Y1 → Y2 | CN applicants filing in TW | TW apps | Y1 → Y2 |
| --- | --- | --- | --- | --- | --- |
| TSMC | 1,201 | 544 → 538 | Naura 北方华创 | 179 | 57 → 73 |
| Nanya Technology | 499 | 212 → 204 | JCET 长电 (incl. STATS ChipPAC) | 132 | 47 → 57 |
| UMC | 309 | 144 → 135 | ACM Research 盛美 (Shanghai) | 120 | 41 → 45 |
| Innolux | 246 | 144 → 83 | Jade Bird Display 显耀 | 104 | 77 → 14 |
| ASE Group | 182 | 88 → 76 | AMEC 中微 | 80 | 35 → 28 |
| Winbond | 144 | 39 → 86 | AaltoSemi 芯爱 | 40 | 15 → 16 |
| Macronix | 86 | 51 → 20 | YMTC 长江存储 | 36 | 16 → 14 |
| Powerchip (PSMC) | 82 | 30 → 40 | CXMT 长鑫 | 22 | 6 → 15 |
| **Total TW-applicant filings in CN** | **3,392** | 1,581 → 1,434 | **Total CN-applicant filings in TW** | **1,090** | 486 → 368 |

Family links run deeper than direct filings. 55% of TW publications (10,795) have a CN family member, and 12% of CN publications (9,936) have a TW family member. Mainland firms entering Taiwan are overwhelmingly **equipment makers** (Naura, ACM, AMEC) and the packaging house JCET.

### e) Inventor countries

CN: inventor country is empty for every record, so it cannot be compared. TW: populated for 100% of records, giving a data-derived view of where the research is done.

| TW applicant origin | Apps | Inventors include TW | Inventors include mainland CN | Inventors include US | Multi-country inventor teams |
| --- | --- | --- | --- | --- | --- |
| Japan | 6,115 | 53 | 119 | 233 | 366 |
| Taiwan | 5,776 | 5,637 | 83 | 354 | 580 |
| United States | 3,367 | 318 | **771 (23%)** | 2,814 | 2,022 |
| South Korea | 1,771 | 5 | 26 | 131 | 158 |
| Mainland China | 1,090 | 133 | 866 | 112 | 257 |
| Germany | 287 | 24 | 26 | 69 | 127 |

US companies' Taiwanese filings often come from mainland-China R&D teams, and 318 come from teams in Taiwan. Taiwanese applicants' inventions are almost entirely Taiwan-made (98%).

### f) CN regions — INFERRED from known headquarters of the top 50 domestic applicants

The dataset holds no applicant address. These 50 applicants cover 18,597 filings (34% of domestic CN filings).

| Region | Filings (top-50 applicants) | Main applicants |
| --- | --- | --- |
| Beijing | 4,631 | CAS, BOE, Naura, Superstring Academy, Peking Univ., Tsinghua, State Grid |
| Shanghai | 3,365 | Hua Hong, SMIC, Shanghai Jita, Fudan, ACM Research, SITRI, AMEC |
| Guangdong | 1,993 | Huawei, Tianma, TCL CSOT, Gree, CanSemi |
| Anhui (Hefei) | 1,822 | CXMT, Nexchip, Origin Quantum, USTC |
| Jiangsu | 1,506 | Visionox, JCET, China Resources Micro, Southeast Univ., Nanjing Univ. |
| Hubei (Wuhan) | 1,473 | YMTC, Changfei, XMC, HUST |
| Shandong | 944 | SiEn, Inspur, Aucma, Hisense, Shandong Univ. |
| Shaanxi (Xi'an) | 773 | Xidian Univ., Eswin |
| Zhejiang | 629 | Zhejiang Univ., Zhejiang Chuangxin |
| Sichuan, Liaoning, Fujian, Chongqing, Gansu | 1,461 | UESTC, Piotech, Sanan/Jinhua, Chongqing Xinlian, Huatian |

## 8. Emerging technologies

Advanced packaging is the fastest-growing front in CN, ahead of every device or quantum topic. Rule: at least +40% like-for-like, and a minimum of 40 publications (CN) or 20 (TW) in the later window, on full text (codes, title and abstract) in both windows.

| Office | Technology | Chinese term | Y1 → Y2 | Change | Example publications (later window) |
| --- | --- | --- | --- | --- | --- |
| CN | Photonic quantum computing | 光量子计算 | 15 → 66 | +340% | [CN122635586A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122635586A) ([Google](https://patents.google.com/patent/CN122635586A/en)) photonic quantum chip packaging (Bose Quantum 玻色量子); [CN122592555A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122592555A) ([Google](https://patents.google.com/patent/CN122592555A/en)) thin-film lithium niobate photonic chip (Turing Quantum 图灵智算) |
| CN | 3D stacking / monolithic 3D | 三维堆叠 | 393 → 778 | +98% | [CN122662189A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122662189A) ([Google](https://patents.google.com/patent/CN122662189A/en)) HBM device (YMTC); [CN122662733A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122662733A) ([Google](https://patents.google.com/patent/CN122662733A/en)) chip stacking structure (CXMT); [CN122662731A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122662731A) ([Google](https://patents.google.com/patent/CN122662731A/en)) DDR chip stacking (Jiangsu Huachuang) |
| CN | Chiplets / 2.5D / interposer | 芯粒/2.5D/中介层 | 421 → 816 | +94% | [CN122662715A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122662715A) ([Google](https://patents.google.com/patent/CN122662715A/en)) 2.5D micro-bump packaging (Forehope 甬矽); [CN122658370A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122658370A) ([Google](https://patents.google.com/patent/CN122658370A/en)) optically disaggregated HBM (Marvell); [CN122641372A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122641372A) ([Google](https://patents.google.com/patent/CN122641372A/en)) interposer with embedded passives (Marvell) |
| CN | Hybrid bonding | 混合键合 | 404 → 735 | +82% | [CN122662729A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122662729A) ([Google](https://patents.google.com/patent/CN122662729A/en)) wafer hybrid bonding (Chongqing Xinlian); [CN122662191A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122662191A) ([Google](https://patents.google.com/patent/CN122662191A/en)) memory device (YMTC); [CN122662274A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122662274A) ([Google](https://patents.google.com/patent/CN122662274A/en)) through-hole for hybrid bonding (Intel) |
| CN | Glass substrates / TGV | 玻璃基板/玻璃通孔 | 182 → 332 | +82% | [CN122662697A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122662697A) ([Google](https://patents.google.com/patent/CN122662697A/en)) TGV metallisation (Visionox); [CN122662688A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122662688A) ([Google](https://patents.google.com/patent/CN122662688A/en)) glass interconnect for embedded packages; [CN122641359A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122641359A) ([Google](https://patents.google.com/patent/CN122641359A/en)) through-hole glass (Jiangxi Wog) |
| CN | Neutral-atom quantum computing | 中性原子 | 19 → 33 | +74% | [CN122656012A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122656012A) ([Google](https://patents.google.com/patent/CN122656012A/en)) Rydberg optical trap (HUST); [CN122549622A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122549622A) ([Google](https://patents.google.com/patent/CN122549622A/en)) neutral-atom control (BAQIS) |
| CN | Wafer handling apparatus (ext.) | 晶圆处理装置 | 870 → 1,310 | +51% | Naura, Piotech, AMEC: domestic equipment makers |
| CN | Wafer bonding & layer transfer | 晶圆键合与层转移 | 311 → 460 | +48% | [CN122641308A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122641308A) ([Google](https://patents.google.com/patent/CN122641308A/en)) wafer-bonding chuck (Piotech); [CN122662310A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122662310A) ([Google](https://patents.google.com/patent/CN122662310A/en)) edge bonding (Hua Hong); [CN122662581A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122662581A) ([Google](https://patents.google.com/patent/CN122662581A/en)) diamond-based AlN substrate (USTB) |
| CN | Quantum magnetometry (ext.) | 量子磁测 | 254 → 370 | +46% | Beihang University dominates (119 in total) |
| CN | Compute-in-memory | 存算一体 | 30 → 42 | +40% | [CN122641022A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122641022A) ([Google](https://patents.google.com/patent/CN122641022A/en)) ferroelectric transistor array (USTC); [CN122396216A](https://worldwide.espacenet.com/patent/search?q=pn%3DCN122396216A) ([Google](https://patents.google.com/patent/CN122396216A/en)) nanoscale memristor array (Suzhou Lab) |
| TW | MRAM / spintronics | 磁阻式記憶體 | 71 → 122 | +72% | [TW202625180A](https://worldwide.espacenet.com/patent/search?q=pn%3DTW202625180A) ([Google](https://patents.google.com/patent/TW202625180A/en)) magnetic memory (Kioxia); [TW202625567A](https://worldwide.espacenet.com/patent/search?q=pn%3DTW202625567A) ([Google](https://patents.google.com/patent/TW202625567A/en)) (TSMC) |
| TW | Wafer bonding & layer transfer | 晶圓接合與層轉移 | 76 → 130 | +71% | [TW202625761A](https://worldwide.espacenet.com/patent/search?q=pn%3DTW202625761A) ([Google](https://patents.google.com/patent/TW202625761A/en)) substrate bonding with electrostatic chucks (Applied Materials); Soitec; Tokyo Electron |
| TW | GAA / nanosheet | 環繞式閘極電晶體 | 40 → 63 | +58% | [TW202625581A](https://worldwide.espacenet.com/patent/search?q=pn%3DTW202625581A) ([Google](https://patents.google.com/patent/TW202625581A/en)) GAA source/drain (Intel); [TW202625585A](https://worldwide.espacenet.com/patent/search?q=pn%3DTW202625585A) ([Google](https://patents.google.com/patent/TW202625585A/en)) (TSMC); [TW202625579A](https://worldwide.espacenet.com/patent/search?q=pn%3DTW202625579A) ([Google](https://patents.google.com/patent/TW202625579A/en)) (Tokyo Electron) |
| TW | 3D stacking | 三維堆疊 | 95 → 138 | +45% | [TW202625857A](https://worldwide.espacenet.com/patent/search?q=pn%3DTW202625857A) ([Google](https://patents.google.com/patent/TW202625857A/en)) cell dies sharing a logic die (SK hynix); [TW202625863A](https://worldwide.espacenet.com/patent/search?q=pn%3DTW202625863A) ([Google](https://patents.google.com/patent/TW202625863A/en)) (TSMC) |
| TW | RRAM / memristor | 電阻式記憶體 | 83 → 119 | +43% | [TW202625566A](https://worldwide.espacenet.com/patent/search?q=pn%3DTW202625566A) ([Google](https://patents.google.com/patent/TW202625566A/en)) RRAM circuit (Xiamen ITRI); [TW-I928723B](https://worldwide.espacenet.com/patent/search?q=pn%3DTWI928723B) ([Google](https://patents.google.com/patent/TWI928723B/en)) (UMC) |

Just below the +40% bar: CN fan-out packaging 454 → 625 (+38%), CN III-V 93 → 121 (+30%), TW glass substrates 31 → 41 (+32%), TW CFET 44 → 59 (+34%). Very small bases: CN topological qubits 7 → 13, TW phase-change memory 2 → 7.

**New applicants** (none in the earlier window, at least 15 CN / 5 TW in the later one). This is new *within the study window*, since earlier history was not queried.

- CN: Shanghai Bangxin Semiconductor 上海邦芯 (33), Turing Quantum 图灵智算 (31, photonic quantum), Chengdu Xinziguang 芯紫光 (33), CETC Institutes 58, 24, 55 and 13 (19–28 each), Beijing Ziyixin IC (24), Zhejiang Chuanghao (25), Shanghai Yaogan (20), Robert Bosch China (20), Chint New Energy (18), Harbin Institute of Technology (16), Yamaha Smart Machine (27).
- TW: Rapidus (JP, 18), Festo (DE, 10), MI Equipment (MY, 10), Nidec (8), Yamaha Robotics (8), Multiverse Computing (ES, 5), Photonic Inc. (CA, 5), Wolfspeed (US, 5), Veeco (US, 5).

The entry of several **CETC (中国电子科技集团) research institutes** points to defence-electronics institutes beginning to publish in this space.

**Fastest-rising English title terms** (later vs earlier window; minimum 25 CN / 10 TW mentions):

- CN: "light quantum" 5 → 29, "cold plate" 9 → 34, "packaging carrier" 7 → 27, "collaborative optimization" 7 → 26, "composite material" 34 → 91, "carrier plate" 50 → 116, "glass substrate" 44 → 99, "fan-out type" 24 → 54, "polishing solution" 49 → 99, "layout optimization" 29 → 58, "quantum measurement" 15 → 32.
- TW: "semiconductor photoresist" 5 → 23, "glass substrate" 3 → 13, "cold plate" 4 → 12, "magnetoresistive random" 5 → 13, "hybrid bonding" 13 → 22, "heat sink" 7 → 16.

**Fastest-rising Google `top_terms`, CN** (machine-generated key terms per document; minimum 40 in the later window): "fabricating" 15 → 124, "polishing slurry" 9 → 42, "gradient" 32 → 119, "superjunction" 19 → 58, "TGV" 27 → 81, "hardware" 28 → 81, "lattice" 20 → 50, "composite material" 38 → 93, "abrasive" 33 → 76, "semiconductor packaging" 33 → 72. They confirm the title signals: glass vias (TGV), CMP consumables and superjunction power MOSFETs are rising. The TW `top_terms` mostly reflect a change in machine-translation wording ("sacrifice", "disclosure", "furthermore" from 0 to 30–50), so they are not used.

## 9. CN vs TW comparison

The two offices show opposite profiles. Mainland filings over-weight quantum (10×), power electronics, displays, wide-bandgap materials and EDA. Taiwan over-weights front-end process steps (lithography 2.6×, deposition 2.1×, BEOL 2.0×) and hybrid bonding/TSV, the leading-edge foundry and equipment agenda.

&#91;embedded content: BigQuery, cntw\_study.corpus · category shares per office\]

| Structural indicator | CN | TW |
| --- | --- | --- |
| Invention publications / families | 80,062 / 79,118 | 19,484 / 18,824 |
| Top-5 applicant concentration | 10.5% | 30.6% |
| Domestic applicants | 69.1% | 29.6% |
| University or research institute involved | 13.6% | 2.1% |
| Quantum intensity (quantum domain share) | 6.1% (4,852) | 0.6% (118) |
| Advanced packaging growth (hybrid bonding + 3D + chiplets, Y1 → Y2) | 1,218 → 2,329 | 509 → 516 |
| Family also at EP/US/JP/KR | 24.7% | 68.2% |
| Overall volume change (like-for-like) | +2.5% | −11% (not robust) |

The EP column foreseen in the prompt is left out on purpose: you asked to keep the two studies separate for now. The same core scope (PCT-excluded CN variant: 70,538 applications) allows the comparison once the EP study is run, ideally with H10P/H10W added there too.

## 10. Interpretation (not data)

*This section reads the patterns above. Patent counts measure filing behaviour, not capability, and short windows are noisy.*

**Technological self-reliance (自主可控).** Domestic tool makers are visible in the categories where substitution is feasible. Naura is #2 in CN wafer handling (608), and Piotech is #2 in CN CVD/ALD (319). The extension category of wafer handling apparatus grew +51%. In etching, deposition and CMP, however, Tokyo Electron and Applied Materials still lead. In lithography tools the leader is ASML (497), followed by the Chinese Academy of Sciences (358) rather than a domestic company; SMEE does not reach the top lists. This suggests substitution is advancing in handling, deposition and cleaning, while lithography remains a research-institute effort.

**Export-control effects.** Leading-edge logic architectures are a small share of CN filings: GAA 392, CFET 382, FinFET 155. They are carried largely by CAS, universities and foreign filers (Samsung, Intel, Qualcomm). Meanwhile mature-node and specialty fabs grow fast: Hua Hong +30%, Nexchip +78%, YMTC +29%. SMIC declines (−17%). Advanced packaging (3D stacking +98%, chiplets +94%, hybrid bonding +82%) is the strongest growth area. Huawei's profile is dominated by substrates, thermal management and encapsulation rather than transistor design. Together this is consistent with system-level integration as a route around node limits, though patent data alone cannot prove that intent.

**Quantum as a state-coordinated ecosystem.** Mainland quantum filings are 91% domestic and 39% academic, concentrated in the Hefei cluster (Origin Quantum, USTC, Hefei National Laboratory, China Telecom Quantum) and among state-owned operators (State Grid, China Mobile, China Telecom). QKD filings fell (−34%) while computing grew (+21%), which may indicate a shift in emphasis from secure communication to computation. Photonic (+340%) and neutral-atom (+74%) approaches are new entrants. Taiwan has almost no domestic quantum patenting (ITRI 5); its quantum filings come from foreign start-ups.

**Cross-strait interdependence.** Patenting runs both ways despite political tension. Taiwanese chipmakers keep a stable CN portfolio (TSMC 544 → 538). Mainland tool makers and JCET are building TW portfolios (Naura +28%). Over half of TW filings sit in families that also cover CN. 23% of US companies' TW filings name mainland-China inventors, which shows how R&D, not only markets, spans the Strait.

**Implications for Europe.** European applicants are a small share (3.3% of CN, 5.2% of TW). Their presence is strongest in lithography and materials (ASML, Zeiss, Merck, Soitec) and power semiconductors (Infineon, ST, Nexperia). This mirrors Europe's known strengths in equipment and power electronics. European exposure to CN quantum is minimal (161 filings), so scientific contacts in quantum may matter more than IP positioning there.

For patent statistics generally, the 2026 H01L → H10P/H10W transition can halve semiconductor counts in any study that does not update its code list. That matters for EPO-side monitoring as well.

Other readings exist. For example, the CN packaging boom may simply reflect strong demand (AI/HPC) and subsidy-driven filing behaviour rather than a strategic response to controls. CN filing volume also responds to domestic patent-quality reforms that reduced low-value filings.

## 11. Methodology appendix

All numbers come from the Google Patents Public Datasets on BigQuery, run in project `patent-study-513418`, dataset `cntw_study`. Every statement as executed is in the attached file `cntw_study_queries.sql`.

### Queries and bytes processed (public tables)

| Step | Table built | Bytes |
| --- | --- | --- |
| Freshness check | — | 2.08 GB |
| Base: CN/TW first publications in window + CPC flags | `base` | 46.1 GB |
| IPC flags | `ipc` | 9.2 GB |
| Titles, abstracts, claims head, keyword net | `text` | 361.4 GB |
| Family reach (EP/US/JP/KR/CN/TW/WO) | `family_reach` | 2.6 GB |
| Titles for H10P/H10W additions | `text_add_title`, `text_add_title2` | 35.1 + 22.6 GB |
| CPC definitions H10P/H10W | — | 0.03 GB |
| Second run (4 Nov, billed): Google MT text + `top_terms` | `research` | 148.5 GB |
| Second run (4 Nov, billed): abstracts for the 26,938 additions | `text_add_abs` | 218.5 GB |
| Rebuilds of study tables (`tx_all`, `apps`, `corpus`, `application_list`) | — | 2.8 GB |
| **Total** |  | **≈ 849 GB** |

The two queries refused for quota in the first run were run on 4 Nov under the authorised $15 budget. They billed ≈ 370 GB in total, about **$2.30** at on-demand pricing ($6.25/TB). Analysis queries on the study tables used 1–200 MB each.

### Corpus definition

- **Unit:** application (first publication only; later A/B of the same application merged), plus distinct `family_id`.
- **Window:** first publication 2024-11-01 to 2026-10-31. Effective end: CN 2026-09-08, TW 2026-06-30.
- **Core scope (CPC ∪ IPC):** `^(H10D|H10B|H10N60/|H10P|H10W|H01L(21|23|25|27|29)/|G06N10/|B82Y10/|G06F30/39)`.
- **Quantum keyword net** (any text): `量子比特|量子位元|量子计算|量子計算|qubit|quantum comput`. It added 875 CN and 2 TW documents.
- **Quantum domain (final):** G06N10 or H10N60, or B82Y10 together with "quantum/qubit/量子" in the text, or the keyword net. This excluded 724 CN and 477 TW B82Y10-only documents (nanosheet/nanowire devices).
- **Extensions:** quantum comm. & sensing `H04L9/085[2-8]|H04B10/70|G01R33/03[25]|G01N24/|G04F5/14`; equipment `G03F7/|G03F1/|H01J37/32|C23C16/|H01L21/67|H10P72/`.
- **Domains:** devices/memory/processes = H10D, H10B, H01L27/29, H01L21 (non-packaging), H10P, H10W10/15. Integration = H01L23/25, H01L21/48–60, H10W20–99, G06F30/39.
- **Legacy H01L → H10 mapping:** both generations are matched in every category (e.g. etching = H01L21/3065|3213|311 or H10P50; hybrid bonding = text or H10W80; TSV = text or H10W20/2).

### Technology assignment

- 65 categories. Each matches if its CPC/IPC pattern hits or its English/Chinese regex hits the title or abstract, within the domain's code scope. Process categories also require H01L21 or H10P.
- Basis recorded per document and category: CPC/IPC only · CPC/IPC + text · text within code scope.
- **Full counting:** a document counts in every matching category.
- No sampling: the whole corpus was processed. Claims are not populated for CN/TW, so claim 1 was not used.
- Trends use like-for-like windows: CN Nov 2024–Aug 2025 vs Nov 2025–Aug 2026; TW Nov 2024–Jun 2025 vs Nov 2025–Jun 2026. Since the second run, every document has title and abstract, so both periods are compared on full text.

### Applicant grouping rules

- 155 ordered regex rules on "harmonised name | original-language name", first match wins. Key groupings: Samsung = Electronics + Display + SDI + SEMES; Hua Hong = Hua Hong Grace + Huahong Wuxi + Huali; Huawei = Huawei + HiSilicon; SMIC = all SMIC fabs; CAS = all CAS institutes (incl. IME, SIMIT, Suzhou Nano); JCET = JCET + STATS ChipPAC; ASE = ASE + SPIL; Kioxia = Kioxia + Toshiba Memory; Resonac incl. Showa Denko / 力森诺科; Merck KGaA incl. Versum; Visionox incl. Govisionox and Chenxian; Inspur incl. Yuanno and Yunhai Guochuang; China Telecom incl. China Telecom Quantum; State Grid incl. SmartChip; BOE incl. BOE HC SemiTek.
- Unmapped applicants keep their harmonised name; type by name tokens (大学/UNIV → university; 公司/CO LTD/INC/株式会社 → company; 研究所/研究院/实验室/INST/LAB → institute; 2–4-character personal names → individual).
- Known limits: CETC research institutes are typed "company" (name contains 公司). Fraunhofer was typed "individual" in one TW case. Harmonised names for CN are partly machine-romanised (e.g. 罗姆 → "ROEHM GMBH" is corrected to Rohm by the map).

### Origin rules

- **TW:** applicant country from `assignee_harmonized.country_code` (100% populated), cross-checked against TIPO prefixes such as 日商 (JP), 美商 (US), 大陸商 (CN).
- **CN:** applicant country is empty in the data. Order of use: (1) the parent map; (2) 株式会社 → JP; (3) INFERRED from the earliest priority office when foreign, else CN. This inference applies to 38,464 CN documents. It would mislabel a foreign firm filing first in China, or a Chinese firm claiming foreign priority.
- **Priority office** = office prefix of the earliest-dated priority claim (PCT receiving office when only a WO claim exists).
- **CN regions** are INFERRED from known headquarters of the top 50 domestic applicants only.

### Deviations from the EP study

1. PCT entries kept and flagged (EP excluded them). A PCT-excluded CN variant is reported.
2. CPC ∪ IPC instead of CPC only.
3. H10P and H10W added to the core scope.
4. Quantum keyword net and the stricter B82Y10 rule.
5. Matched windows for Y1 vs Y2 instead of full years, because of the data cut-off.
6. Extension domains (quantum comm./sensing, equipment) reported separately.

### Known gaps

- `top_terms` are machine-generated from machine translations. For TW they track translation wording more than technology and are not used.
- New applicants are new within the window only (no pre-2024 history).
- TW 2026 volumes fall during the classification transition, although total TW publications stay flat; not robust.
- Category regexes trade precision for recall. Spot checks found a few false positives (e.g. a consumer "light quantum" device in photonic quantum, LED "stacked" pixels in CFET).
- Extension-domain figures (quantum comm./sensing, equipment) were re-checked on full text in the second run and are unchanged.
- The full per-application list (99,546 rows, all CSV columns requested, plus `top_terms`) is in BigQuery as `patent-study-513418.cntw_study.application_list` (≈150 MB). It cannot be pulled through this session: the BigQuery connection returns rows into the conversation, and a file export needs a Cloud Storage login the session does not have. Export it from the BigQuery console: open the table → Export → Export to GCS (CSV), or query it and use Save results → Google Drive.

As-of: data queried 3 Nov 2026; abstracts, machine translations and top\_terms added and all figures recomputed on 4 Nov 2026.
