# Geographic data-quality report

Semiconductor Patent Atlas (EPO & European national offices study). Applicant locations verified 2026-11-05. File: `data/applicant_locations.json` (one record per applicant ID, joined to the patent statistics by `applicant_id`; each record also lists the places of the group's filing entities).

The located unit is the applicant name on the filing (legal entity). A group whose filing entities sit in different places is drawn once per place; the tables for applicant groups use the place of the group's largest filing entity.

## 1. Precision of applicant locations

### Filing entities (the unit that is located)

| Precision | Institutional filing entities | Share | Share of applicant mentions |
|---|---:|---:|---:|
| Exact site | 283 | 14.5% | 39.9% |
| City | 772 | 39.5% | 46.8% |
| Province / state only | 17 | 0.9% | 0.2% |
| Country only (location unverified) | 857 | 43.9% | 12.9% |
| Unknown | 25 | 1.3% | 0.2% |
| **Total** | **1,954** | 100% | 100% |

Private inventors: 72 (country level only, by design).

### Applicant groups (main place)

| Precision | Institutional applicants | Share | Share of their applications | Private inventors |
|---|---:|---:|---:|---:|
| Exact site (organisation coordinates) | 263 | 14.2% | 40.1% | 0 |
| City (city-centre coordinates) | 732 | 39.7% | 48.1% | 0 |
| Province / state only | 16 | 0.9% | 0.2% | 0 |
| Country only (location unverified) | 810 | 43.9% | 11.4% | 72 |
| Unknown | 25 | 1.4% | 0.2% | 0 |
| **Total** | **1,846** | 100% | 100% | **72** |

Applicant groups drawn on the map: **995 of 1846 institutional applicants (53.9%)**, accounting for 88.2% of their applications. They are drawn at 1037 places in total.

## 2. Sources and confidence (filing entities with a drawn location)

| Source | Filing entities |
|---|---:|
| none (country only) | 857 |
| Wikidata (P159 headquarters / P625 coordinates) | 590 |
| USPTO patent records (PatentsView), re-geocoded with Overture Maps | 408 |
| private inventors (country only) | 72 |
| Manual web verification (registers, official sites, annual reports) | 45 |
| none (no country) | 25 |
| Region only (not drawn) | 17 |
| Applicant country = city-state (Singapore) | 12 |

| Confidence | Filing entities |
|---|---:|
| medium | 517 |
| high | 431 |
| low | 107 |

Confidence rules: *high* = Wikidata item matched on its own label, single candidate, and the USPTO address (if any) within 50 km, or a manually verified register/official source; *medium* = alias match or USPTO address with ≥60% of ≥3 US patents, or manual source without street address; *low* = weaker USPTO evidence or dated sources.

## 3. Automated checks

- **Country consistency**: 1037 drawn points tested against Natural Earth 1:10m country polygons: **0 fall in a different country** than the applicant's country.
- **Coastal points**: 7 points fall just outside the generalised coastline; all lie within 2.9 km of their own country's polygon.
- **Latitude/longitude order**: 0 points would only match their country with swapped axes (0 = order correct). MapLibre receives `[longitude, latitude]`.
- **No national centroids**: applicants known only to country or province level are not drawn as markers; they are shown as dashed group circles at a label point and listed as unverified. 742 distinct coordinates are in use. In a second check against the Overture Maps polygons, every point lies within 30 km of a town in its own country, and the only points within 15 km of a country label point are in Singapore (a city-state) and Louvain-la-Neuve.
- **Largest shared coordinates** (city centres; they fan out into individually selectable markers on click): Tokyo (31), Tokyo (30), Singapore (23), Osaka (9), Shenzhen (9), Seoul (8), San Jose (7), Hsinchu (7).
- **Patent totals unchanged**: 13,637 application records, 1,918 applicant groups; applicant, family and technology counts are those of the study (Samsung 796, Intel 626, Infineon 522).

## 4. Large and diverse countries

| Country | Applicants | Exact | City | Province | Country only | Distinct cities | Leading cities (applicants) |
|---|---:|---:|---:|---:|---:|---:|---|
| US | 324 | 56 | 163 | 0 | 105 | 145 | Santa Clara 13, San Jose 9, San Diego 5, Sunnyvale 5, Wilmington 5, Mountain View 4 |
| CN | 225 | 11 | 43 | 8 | 163 | 27 | Shenzhen 11, Shanghai 5, Beijing 5, Hangzhou 5, Hefei 4, Nanjing 2 |
| DE | 244 | 51 | 92 | 0 | 101 | 86 | Munich 15, Dresden 7, Stuttgart 6, Berlin 6, Hamburg 4, Ulm 4 |
| IN | 5 | 1 | 1 | 0 | 3 | 2 | New Delhi 1, Mumbai 1 |
| JP | 308 | 54 | 173 | 4 | 77 | 74 | Tokyo 89, Osaka 15, Kyoto 12, Minato 10, Saitama 6, Kawasaki 5 |
| KR | 88 | 6 | 30 | 1 | 51 | 19 | Seoul 12, Daejeon 3, Ulsan 3, Suwon 2, Pyeongtaek 2, Icheon 1 |
| TW | 65 | 15 | 23 | 0 | 27 | 10 | Taipei 10, Hsinchu City 8, Hsinchu 8, New Taipei 4, Taichung 3, Taoyuan City 1 |
| FR | 108 | 16 | 48 | 0 | 44 | 39 | Paris 11, Grenoble 5, Palaiseau 4, Tours 3, Blagnac 2, Annecy 2 |
| GB | 69 | 9 | 20 | 1 | 39 | 23 | London 4, Abingdon-on-Thames 2, Cambridge 2, Cardiff 2, Cambourne 1, Edinburgh 1 |
| NL | 47 | 5 | 16 | 0 | 26 | 12 | Delft 5, Nijmegen 3, Eindhoven 3, Enschede 2, Duiven 1, Austin 1 |
| AT | 18 | 1 | 8 | 0 | 9 | 6 | Innsbruck 3, Leoben 2, Laakirchen 1, Graz 1, Vienna 1, St. Florian am Inn 1 |
| CH | 38 | 5 | 14 | 0 | 19 | 17 | Sennwald 2, Zurich 2, Dubendorf 1, La Chaux-de-Fonds 1, Môtiers 1, Fällanden 1 |

## 5. Spot checks of well-known applicants

| Applicant | Country | Main location | Precision | Source | Other places |
|---|---|---|---|---|---|
| Samsung | KR | Suwon, Gyeonggi | city | [Wikidata P159](https://www.wikidata.org/wiki/Q20718) | Yongin, Yongin |
| Intel | US | Santa Clara, California | exact | [Wikidata P159 headquarters with P625 coordinates](https://www.wikidata.org/wiki/Q248) | Neubiberg |
| Infineon | DE | Neubiberg, Bavaria | exact | [Wikidata P159 headquarters with P625 coordinates](https://www.wikidata.org/wiki/Q311394) | Villach, Ottawa, Dresden, El Segundo, San Jose |
| TSMC | TW | Hsinchu | exact | [Wikidata P159 headquarters with P625 coordinates](https://www.wikidata.org/wiki/Q713418) | – |
| STMicroelectronics | CH | Plan-les-Ouates (Geneva), Geneva | city | [Company directory](https://ch.kompass.com/c/stmicroelectronics-intern/ch370456/) | – |
| CEA | FR | Paris, Ile-de-France | exact | [Wikidata P159 headquarters with P625 coordinates](https://www.wikidata.org/wiki/Q868550) | – |
| Bosch | DE | Gerlingen, Baden-Württemberg | exact | [Wikidata P159 headquarters with P625 coordinates](https://www.wikidata.org/wiki/Q234021) | – |
| Mitsubishi Electric | JP | Tokyo | exact | [Wikidata P159 headquarters with P625 coordinates](https://www.wikidata.org/wiki/Q53257) | – |
| NXP | NL | Austin, Texas | city | [USPTO PatentsView assignee address](https://www.wikidata.org/wiki/Q16559) | Eindhoven |
| imec | BE | Leuven, Flanders | exact | [Wikidata P159 headquarters with P625 coordinates](https://www.wikidata.org/wiki/Q1667937) | Kissimmee |
| Soitec | FR | Bernin, Auvergne-Rhône-Alpes | city | [Company press release](https://in.marketscreener.com/quote/stock/SOITEC-4695/news/Soitec-Announces-New-Fabrication-Facility-at-its-Headquarters-in-Bernin-39748795/) | – |
| ASML | NL | Veldhoven, North Brabant | city | [USPTO PatentsView assignee address](https://www.wikidata.org/wiki/Q9875) | – |
| GlobalFoundries | US | Malta, NY, New York | city | [Trade press](https://www.everythingrf.com/news/details/12216-globalfoundries-relocates-corporate-headquarters-to-malta-in-new-york) | Singapore |
| Kioxia | JP | Tokyo | exact | [Wikidata P159 headquarters with P625 coordinates](https://www.wikidata.org/wiki/Q28840043) | – |
| Huawei | CN | Shenzhen, Guangdong | city | [USPTO PatentsView assignee address](https://www.wikidata.org/wiki/Q15174) | – |
| BOE | CN | Beijing | exact | [Wikidata P159 headquarters with P625 coordinates](https://www.wikidata.org/wiki/Q22234667) | Chengdu, Chongqing, Beijing |
| AT&S | AT | Leoben, Styria | city | [Austrian Chamber of Commerce directory](https://www.advantageaustria.org/us/company/en/at-s-austria-technologie-systemtechnik-aktiengesellschaft) | Chongqing |
| IBM | US | Armonk, NY, New York | city | [Annual report](https://www.sec.gov/Archives/edgar/data/51143/000005114326000010/ibm-20251231.htm) | – |

## 6. Subsidiaries are located independently

Each filing entity is located from its own name; a parent's headquarters is never copied to a subsidiary. Groups whose filing entities sit in different places:

- **Toshiba**: TOSHIBA KK → Minato, JP; TOSHIBA MATERIALS CO LTD → Yokohama, JP; TOSHIBA ELECTRONIC DEVICES & STORAGE CORP → Tokyo, JP
- **Sony**: SONY SEMICONDUCTOR SOLUTIONS CORP → Asahi-chō, JP; SONY CORP → Minato, JP; SONY INTERACTIVE ENTERTAINMENT INC → Tokyo, JP
- **Infineon**: INFINEON TECHNOLOGIES AG → Neubiberg, DE; INFINEON TECHNOLOGIES AUSTRIA AG → Villach, AT; INFINEON TECH CANADA INC → Ottawa, CA; INFINEON TECH DRESDEN GMBH & CO KG → Dresden, DE; INFINEON TECHNOLOGIES AMERICAS CORP → El Segundo, US; Infineon Technologies LLC → San Jose, US
- **Intel**: INTEL CORP → Santa Clara, US; INTEL DEUTSCHLAND GMBH → Neubiberg, DE
- **GlobalFoundries**: GLOBALFOUNDRIES US INC → Malta, NY, US; GLOBALFOUNDRIES SG PTE LTD → Singapore, SG
- **LG (Display/Electronics/Innotek)**: LG DISPLAY CO LTD → Seoul, KR; LG INNOTEK CO LTD → Yongin, KR; LG ENERGY SOLUTION LTD → Seoul, KR; LG CHEMICAL LTD → Seoul, KR
- **Samsung**: SAMSUNG ELECTRONICS CO LTD → Suwon, KR; SAMSUNG DISPLAY CO LTD → Yongin, KR; SAMSUNG SDI CO LTD → Yongin, KR
- **BESI**: BESI NETHERLANDS BV → Duiven, NL; BESI SWITZERLAND AG → Cham, CH
- **Hyundai Motor Group**: HYUNDAI MOTOR CO LTD → Seoul, KR; KIA CORP → Seoul, KR; HYUNDAI MOBIS CO LTD → Seoul, KR
- **ams OSRAM**: AMS OSRAM INT GMBH → Regensburg, DE; OSRAM OPTO SEMICONDUCTORS GMBH → Regensburg, DE; AMS OSRAM AG → Premstätten, AT
- **MediaTek**: MEDIATEK INC → Hsinchu City, TW; MEDIATEK SINGAPORE PTE LTD → Singapore, SG
- **Renesas**: RENESAS ELECTRONICS CORP → Tokyo, JP; RENESAS ELECTRONICS AMERICA INC → Santa Clara, US
- **Analog Devices**: ANALOG DEVICES INTERNATIONAL UNLIMITED CO → Limerick, IE; ANALOG DEVICES INC → Norwood, US
- **Shin-Etsu**: SHINETSU CHEMICAL CO → Chiyoda, Tokyo, JP; SHIN ETSU HANDOTAI CO LTD → Tokyo, JP
- **BOE**: BOE TECHNOLOGY GROUP CO LTD → Beijing, CN; CHENGDU BOE OPTOELECT TECH CO → Chengdu, CN; CHONGQING BOE OPTOELECTRONICS TECH CO LTD → Chongqing, CN; BEIJING BOE OPTOELECTRONICS TECH CO LTD → Beijing, CN
- **Astemo**: ASTEMO LTD → Chiyoda (Tokyo), JP; HITACHI ASTEMO LTD → Tokyo, JP
- **Merck KGaA**: VERSUM MAT US LLC → Tempe, US; MERCK PATENT GMBH → Darmstadt, DE
- **Applied Materials**: APPLIED MATERIALS INC → Santa Clara, US; APPLIED MATERIALS ISRAEL LTD → Kiryat Gat, IL
- **imec**: IMEC VZW → Leuven, BE; IMEC USA NANOELECTRONICS DESIGN CENTER INC → Kissimmee, US
- **Nexperia**: Nexperia BV → Nijmegen, NL; NEXPERIA TECH SHANGHAI LTD → Shanghai, CN
- **NXP**: NXP USA INC → Austin, US; NXP BV → Eindhoven, NL
- **AT&S**: AUSTRIA TECH & SYSTEM TECH → Leoben, AT; AT&S CHONGQING COMPANY LTD → Chongqing, CN
- **Pasqal**: PASQAL → Palaiseau, FR; PASQAL NETHERLANDS B V → Amsterdam, NL
- **Safran**: SAFRAN ELECTRICAL & POWER → Blagnac, FR; SAFRAN → Courcouronnes, FR; SAFRAN ELECTRONICS & DEFENSE → Paris, FR
- **AMD**: ADVANCED MICRO DEVICES INC → Santa Clara, US; XILINX INC → San Jose, US; ATI TECHNOLOGIES ULC → Markham, CA
- **KLA**: KLA CORP → Milpitas, US; KLA TENCOR CORP → Milpitas, US
- **Littelfuse**: LITTELFUSE SEMICONDUCTOR WUXI CO LTD → Wuxi, CN; LITTELFUSE INC → Chicago, US

Entities for which only the parent's headquarters could be found stay unverified (e.g. Heraeus Electronics, SUSS MicroTec Solutions, Adeia Semiconductor Bonding Technologies, SanDisk Technologies).

## 7. Applicants whose location could not be verified

923 applicant groups (incl. 72 private inventors) have no verified city-level location: 16 province only, 882 country only, 25 unknown. All remain in every statistic. The complete list is `data/unverified_locations.csv`; the 40 with the most applications:

| ID | Applicant | Type | Country | Precision | Applications |
|---:|---|---|---|---|---:|
| 290 | Adeia | company | US | country | 56 |
| 437 | Heraeus Electronics | company | DE | country | 23 |
| 770 | Mitsubishi Chem Corp | company | JP | country | 19 |
| 743 | Hpsp Co Ltd | company | KR | country | 14 |
| 796 | Fujifilm Electronic Mat Usa Inc | company | US | country | 14 |
| 860 | Orca Computing Ltd | company | GB | country | 14 |
| 342 | Apple Inc | company | US | country | 13 |
| 571 | Brooks Automation Germany Gmbh | company | DE | country | 13 |
| 1212 | Sk Enpulse Co Ltd | company | KR | country | 11 |
| 1387 | Brooks Automation Us Llc | company | US | country | 11 |
| 344 | Panasonic Ip Man Co Ltd | company | JP | country | 10 |
| 445 | Zhuzhou Crrc Times Semiconductor Co Ltd | company | CN | country | 10 |
| 39 | Mirise Technologies Corporation | company | JP | region (Aichi Prefecture) | 9 |
| 715 | Ideal Power Inc | company | US | country | 9 |
| 1 | Suss Microtec Solutions Gmbh & Co Kg | company | DE | country | 8 |
| 511 | Shenzhen Yinwang Intelligent Technology Co Ltd | company | CN | country | 8 |
| 930 | Pragmatic Semiconductor Ltd | company | GB | country | 8 |
| 989 | Suzhou Watech Electronics Co Ltd | company | CN | country | 8 |
| 96 | Shenzhen China Star Optoelectronics Semiconductor Display Tech Co Ltd | company | CN | country | 7 |
| 148 | Nexwafe Gmbh | company | DE | country | 7 |
| 305 | Hefei Boe Joint Tech Co Ltd | company | CN | country | 7 |
| 354 | Corintis Sa | company | CH | country | 7 |
| 464 | Gelest Inc | company | US | country | 7 |
| 480 | Towa Corp | company | JP | country | 7 |
| 800 | Silicon Quantum Computing Pty Ltd | company | AU | country | 7 |
| 1174 | Swaysure Tech Co Ltd | company | CN | country | 7 |
| 1393 | Semiqon Tech Oy | company | FI | country | 7 |
| 55 | Erwin Quarder Systemtechnik Gmbh | company | DE | country | 6 |
| 113 | Gsec German Semiconductor Equipment Company Gmbh | company | DE | country | 6 |
| 213 | X Fab Global Services Gmbh | company | DE | country | 6 |
| 283 | Guangzhou China Star Optoelectronics Semiconductor Display Tech Co Ltd | company | CN | country | 6 |
| 315 | Jiangsu Leadmicro Nano Tech Co Ltd | company | CN | country | 6 |
| 660 | Univ Oxford Innovation Ltd | university | GB | country | 6 |
| 740 | Oxford Ionics Ltd | company | GB | country | 6 |
| 826 | Jx Advanced Metals Corp | company | JP | country | 6 |
| 830 | Creative Tech Corp | company | JP | country | 6 |
| 1353 | Oxford Quantum Circuits Ltd | company | GB | country | 6 |
| 52 | Connaught Electronics Ltd | company | IE | region (County Galway) | 5 |
| 69 | Jenoptik Optical Sys Gmbh | company | DE | country | 5 |
| 264 | Wavepia Co Ltd | company | KR | country | 5 |

## 8. Map geometry

The first version of this dashboard drew country outlines that had been simplified country by country with a 20 km tolerance, snapped to a 0.1° grid, stripped of holes and of every polygon under 10,000 km²; neighbouring borders therefore did not match. The map now uses the same front end and geometry as the CNIPA & TIPO atlas: MapLibre GL JS with an OpenStreetMap-based vector basemap (OpenFreeMap, no API key) and Natural Earth 1:10m country polygons for selection and shading; if the online basemap is unreachable, Natural Earth 1:10m borders, provincial boundaries and cities shipped with the site are used. Zooming runs from world level to individual cities (zoom 0.8–17).
