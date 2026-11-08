# Geographic data-quality report

Semiconductor Patent Atlas (EPO & European national offices study). Applicant locations verified 2026-11-05. File: `data/applicant_locations.json` (one record per applicant ID, joined to the patent statistics by `applicant_id`; each record also lists the places of the group's filing entities).

The located unit is the applicant name on the filing (legal entity). A group whose filing entities sit in different places is drawn once per place; the tables for applicant groups use the place of the group's largest filing entity.

## 1. Precision of applicant locations

### Filing entities (the unit that is located)

| Precision | Institutional filing entities | Share | Share of applicant mentions |
|---|---:|---:|---:|
| Exact site | 203 | 17.5% | 44.0% |
| City | 460 | 39.8% | 45.8% |
| Province / state only | 7 | 0.6% | 0.2% |
| Country only (location unverified) | 446 | 38.6% | 9.3% |
| Unknown | 41 | 3.5% | 0.6% |
| **Total** | **1,157** | 100% | 100% |

Private inventors: 23 (country level only, by design).

### Applicant groups (main place)

| Precision | Institutional applicants | Share | Share of their applications | Private inventors |
|---|---:|---:|---:|---:|
| Exact site (organisation coordinates) | 195 | 17.7% | 44.2% | 0 |
| City (city-centre coordinates) | 428 | 38.9% | 46.1% | 0 |
| Province / state only | 7 | 0.6% | 0.2% | 0 |
| Country only (location unverified) | 428 | 38.9% | 8.8% | 23 |
| Unknown | 41 | 3.7% | 0.6% | 0 |
| **Total** | **1,099** | 100% | 100% | **23** |

Applicant groups drawn on the map: **623 of 1099 institutional applicants (56.7%)**, accounting for 90.3% of their applications. They are drawn at 652 places in total.

## 2. Sources and confidence (filing entities with a drawn location)

| Source | Filing entities |
|---|---:|
| none (country only) | 446 |
| Wikidata (P159 headquarters / P625 coordinates) | 380 |
| USPTO patent records (PatentsView), re-geocoded with Overture Maps | 235 |
| none (no country) | 41 |
| Manual web verification (registers, official sites, annual reports) | 40 |
| private inventors (country only) | 23 |
| Applicant country = city-state (Singapore) | 8 |
| Region only (not drawn) | 7 |

| Confidence | Filing entities |
|---|---:|
| medium | 333 |
| high | 271 |
| low | 59 |

Confidence rules: *high* = Wikidata item matched on its own label, single candidate, and the USPTO address (if any) within 50 km, or a manually verified register/official source; *medium* = alias match or USPTO address with ≥60% of ≥3 US patents, or manual source without street address; *low* = weaker USPTO evidence or dated sources.

## 3. Automated checks

- **Country consistency**: 652 drawn points tested against Natural Earth 1:10m country polygons: **0 fall in a different country** than the applicant's country.
- **Coastal points**: 4 points fall just outside the generalised coastline; all lie within 2.9 km of their own country's polygon.
- **Latitude/longitude order**: 0 points would only match their country with swapped axes (0 = order correct). MapLibre receives `[longitude, latitude]`.
- **No national centroids**: applicants known only to country or province level are not drawn as markers; they are shown as dashed group circles at a label point and listed as unverified. 504 distinct coordinates are in use. In a second check against the Overture Maps polygons, every point lies within 30 km of a town in its own country, and the only points within 15 km of a country label point are in Singapore (a city-state) and Louvain-la-Neuve.
- **Largest shared coordinates** (city centres; they fan out into individually selectable markers on click): Singapore (16), Tokyo (10), Tokyo (8), Hsinchu (7), Seoul (7), Taipei (6), Munich (5), Shenzhen (5).
- **Patent totals unchanged**: 8,062 application records, 1,122 applicant groups; applicant, family and technology counts are those of the study (Samsung 720, Intel 560, Infineon 508).

## 4. Large and diverse countries

| Country | Applicants | Exact | City | Province | Country only | Distinct cities | Leading cities (applicants) |
|---|---:|---:|---:|---:|---:|---:|---|
| US | 166 | 42 | 77 | 0 | 47 | 88 | Santa Clara 7, San Jose 5, Sunnyvale 3, Chicago 3, Plano 3, San Diego 3 |
| CN | 89 | 8 | 24 | 3 | 54 | 17 | Shenzhen 6, Beijing 4, Hefei 4, Hangzhou 3, Shanghai 3, Chongqing 1 |
| DE | 206 | 46 | 76 | 0 | 84 | 77 | Munich 13, Dresden 7, Berlin 6, Stuttgart 5, Hamburg 4, Regensburg 3 |
| IN | 1 | 0 | 1 | 0 | 0 | 1 | Mumbai 1 |
| JP | 91 | 27 | 48 | 2 | 14 | 35 | Tokyo 26, Minato 7, Kyoto 4, Osaka 3, Saitama 3, Nagano 2 |
| KR | 47 | 5 | 22 | 1 | 19 | 14 | Seoul 9, Daejeon 3, Ulsan 3, Suwon 2, Oncheon 2(i)-dong 1, Jeonmin-dong 1 |
| TW | 64 | 15 | 23 | 0 | 26 | 10 | Taipei 9, Hsinchu City 8, Hsinchu 8, New Taipei 5, Taichung 3, Zhunan Township 1 |
| FR | 92 | 15 | 41 | 0 | 36 | 35 | Paris 8, Grenoble 5, Palaiseau 4, Tours 3, Blagnac 2, Famars 2 |
| GB | 39 | 6 | 14 | 0 | 19 | 15 | London 4, Cardiff 2, Cambridge 2, Farnborough 1, Cambourne 1, Edinburgh 1 |
| NL | 33 | 4 | 14 | 0 | 15 | 11 | Delft 5, Nijmegen 2, Enschede 2, Eindhoven 2, Almere 1, Veldhoven 1 |
| AT | 16 | 1 | 7 | 0 | 8 | 6 | Innsbruck 2, Leoben 2, Vienna 1, Graz 1, St. Florian am Inn 1, Laakirchen 1 |
| CH | 31 | 4 | 13 | 0 | 14 | 15 | Sennwald 2, Zurich 2, Cham 1, Fällanden 1, Plan-les-Ouates (Geneva) 1, Flamatt 1 |

## 5. Spot checks of well-known applicants

| Applicant | Country | Main location | Precision | Source | Other places |
|---|---|---|---|---|---|
| Samsung | KR | Suwon, Gyeonggi | city | [Wikidata P159](https://www.wikidata.org/wiki/Q20718) | Yongin, Yongin |
| Intel | US | Santa Clara, California | exact | [Wikidata P159 headquarters with P625 coordinates](https://www.wikidata.org/wiki/Q248) | Neubiberg |
| Infineon | DE | Neubiberg, Bavaria | exact | [Wikidata P159 headquarters with P625 coordinates](https://www.wikidata.org/wiki/Q311394) | Villach, Ottawa, Dresden, El Segundo |
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
| BOE | CN | Beijing | exact | [Wikidata P159 headquarters with P625 coordinates](https://www.wikidata.org/wiki/Q22234667) | Chengdu, Chongqing |
| AT&S | AT | Leoben, Styria | city | [Austrian Chamber of Commerce directory](https://www.advantageaustria.org/us/company/en/at-s-austria-technologie-systemtechnik-aktiengesellschaft) | Chongqing |
| IBM | US | Armonk, NY, New York | city | [Annual report](https://www.sec.gov/Archives/edgar/data/51143/000005114326000010/ibm-20251231.htm) | – |

## 6. Subsidiaries are located independently

Each filing entity is located from its own name; a parent's headquarters is never copied to a subsidiary. Groups whose filing entities sit in different places:

- **ams OSRAM**: AMS OSRAM INT GMBH → Regensburg, DE; OSRAM OPTO SEMICONDUCTORS GMBH → Regensburg, DE
- **Analog Devices**: ANALOG DEVICES INC → Norwood, US; ANALOG DEVICES INTERNATIONAL UNLIMITED CO → Limerick, IE
- **AT&S**: AUSTRIA TECH & SYSTEM TECH → Leoben, AT; AT&S CHONGQING COMPANY LTD → Chongqing, CN
- **BESI**: BESI SWITZERLAND AG → Cham, CH; BESI NETHERLANDS BV → Duiven, NL
- **BOE**: BOE TECHNOLOGY GROUP CO LTD → Beijing, CN; CHENGDU BOE OPTOELECT TECH CO → Chengdu, CN; CHONGQING BOE OPTOELECTRONICS TECH CO LTD → Chongqing, CN
- **Pasqal**: PASQAL → Palaiseau, FR; PASQAL NETHERLANDS B V → Amsterdam, NL
- **GlobalFoundries**: GLOBALFOUNDRIES US INC → Malta, NY, US; GLOBALFOUNDRIES SG PTE LTD → Singapore, SG
- **Hyundai Motor Group**: HYUNDAI MOTOR CO LTD → Seoul, KR; KIA CORP → Seoul, KR; HYUNDAI MOBIS CO LTD → Seoul, KR
- **imec**: IMEC VZW → Leuven, BE; IMEC USA NANOELECTRONICS DESIGN CENTER INC → Kissimmee, US
- **Infineon**: INFINEON TECHNOLOGIES AG → Neubiberg, DE; INFINEON TECHNOLOGIES AUSTRIA AG → Villach, AT; INFINEON TECH CANADA INC → Ottawa, CA; INFINEON TECH DRESDEN AG & CO KG → Dresden, DE; INFINEON TECHNOLOGIES AMERICAS CORP → El Segundo, US
- **Intel**: INTEL CORP → Santa Clara, US; INTEL DEUTSCHLAND GMBH → Neubiberg, DE
- **LG (Display/Electronics/Innotek)**: LG DISPLAY CO LTD → Seoul, KR; LG ENERGY SOLUTION LTD → Seoul, KR; LG INNOTEK CO LTD → Yongin, KR
- **Littelfuse**: LITTELFUSE INC → Chicago, US; LITTELFUSE SEMICONDUCTOR WUXI CO LTD → Wuxi, CN
- **MediaTek**: MEDIATEK INC → Hsinchu City, TW; MEDIATEK SINGAPORE PTE LTD → Singapore, SG
- **Nexperia**: NEXPERIA B V → Nijmegen, NL; NEXPERIA TECH SHANGHAI LTD → Shanghai, CN
- **NXP**: NXP USA INC → Austin, US; NXP BV → Eindhoven, NL
- **Safran**: SAFRAN ELECTRICAL & POWER → Blagnac, FR; SAFRAN → Courcouronnes, FR; SAFRAN ELECTRONICS & DEFENSE → Paris, FR
- **Samsung**: SAMSUNG ELECTRONICS CO LTD → Suwon, KR; SAMSUNG DISPLAY CO LTD → Yongin, KR; SAMSUNG SDI CO LTD → Yongin, KR
- **Shin-Etsu**: SHINETSU CHEMICAL CO → Chiyoda, Tokyo, JP; SHIN ETSU HANDOTAI CO LTD → Tokyo, JP
- **Toshiba**: TOSHIBA KK → Minato, JP; TOSHIBA ELECTRONIC DEVICES & STORAGE CORP → Tokyo, JP; TOSHIBA MATERIALS CO LTD → Yokohama, JP

Entities for which only the parent's headquarters could be found stay unverified (e.g. Heraeus Electronics, SUSS MicroTec Solutions, Adeia Semiconductor Bonding Technologies, SanDisk Technologies).

## 7. Applicants whose location could not be verified

499 applicant groups (incl. 23 private inventors) have no verified city-level location: 7 province only, 451 country only, 41 unknown. All remain in every statistic. The complete list is `data/unverified_locations.csv`; the 40 with the most applications:

| ID | Applicant | Type | Country | Precision | Applications |
|---:|---|---|---|---|---:|
| 873 | Heraeus Electronics | company | DE | country | 22 |
| 750 | Adeia Semiconductor Bonding Technologies Inc | company | US | country | 18 |
| 74 | Brooks Automation Germany Gmbh | company | DE | country | 13 |
| 151 | Mirise Technologies Corporation | company | JP | region (Aichi Prefecture) | 9 |
| 615 | Suss Microtec Solutions Gmbh & Co Kg | company | DE | country | 8 |
| 592 | Sk Enpulse Co Ltd | company | KR | country | 7 |
| 616 | Suzhou Watech Electronics Co Ltd | company | CN | country | 6 |
| 618 | Swaysure Tech Co Ltd | company | CN | country | 6 |
| 20 | Inria Inst Nat Rech Informatique & Automatique | research institute | FR | country | 5 |
| 113 | Chongqing Innoevsic Tech Co Ltd | company | CN | country | 5 |
| 235 | Gen Electric | other / unknown | US | country | 5 |
| 254 | Guangzhou China Star Optoelectronics Semiconductor Display Tech Co Ltd | company | CN | country | 5 |
| 289 | Hpsp Co Ltd | company | KR | country | 5 |
| 313 | X Fab Global Services Gmbh | company | DE | country | 5 |
| 431 | Nexwafe Gmbh | company | DE | country | 5 |
| 450 | Orca Computing Ltd | company | GB | country | 5 |
| 484 | Pragmatic Semiconductor Ltd | company | – | unknown | 5 |
| 571 | Semiqon Tech Oy | company | FI | country | 5 |
| 573 | Shenzhen China Star Optoelectronics Semiconductor Display Tech Co Ltd | company | CN | country | 5 |
| 672 | Ultraband Tech Inc | company | TW | country | 5 |
| 869 | Hangzhou Zhicun Witmem Tech Co Ltd | company | CN | country | 5 |
| 896 | Innoscience Suzhou Technology Holding Co Ltd | company | CN | country | 5 |
| 129 | Connaught Electronics Ltd | company | IE | region (County Galway) | 4 |
| 259 | Gebr Schmid Gmbh | company | DE | country | 4 |
| 271 | Helmholtz Zentrum Berlin Fuer Mat Und Energie Gesellschaft Mit Beschraenkter Haftung | research institute | DE | country | 4 |
| 302 | Ideal Power Inc | company | US | country | 4 |
| 341 | Jenoptik Optical Sys Gmbh | company | DE | country | 4 |
| 364 | Kyocera Tech Oy | company | FI | country | 4 |
| 456 | Oxford Quantum Circuits Ltd | company | GB | country | 4 |
| 457 | Pac Tech Packaging Tech Gmbh | company | DE | country | 4 |
| 460 | Paragraf Ltd | company | GB | country | 4 |
| 565 | Search For The Next Ltd | company | GB | country | 4 |
| 749 | Actron Tech Corp | company | TW | country | 4 |
| 793 | Borgwarner Us Tech Llc | company | US | country | 4 |
| 849 | Erwin Quarder Systemtechnik Gmbh | company | DE | country | 4 |
| 881 | HUANG TSUNG HSIEN | private inventor | TW | country | 4 |
| 902 | Invent And Collaboration Laboratory Inc | research institute | TW | country | 4 |
| 966 | Nd Hi Tech Lab Inc | company | TW | country | 4 |
| 1036 | Skyworks Solutions Inc | company | US | country | 4 |
| 1 | 3sun S R L | company | IT | country | 3 |

## 8. Map geometry

The first version of this dashboard drew country outlines that had been simplified country by country with a 20 km tolerance, snapped to a 0.1° grid, stripped of holes and of every polygon under 10,000 km²; neighbouring borders therefore did not match. The map now uses the same front end and geometry as the CNIPA & TIPO atlas: MapLibre GL JS with an OpenStreetMap-based vector basemap (OpenFreeMap, no API key) and Natural Earth 1:10m country polygons for selection and shading; if the online basemap is unreachable, Natural Earth 1:10m borders, provincial boundaries and cities shipped with the site are used. Zooming runs from world level to individual cities (zoom 0.8–17).
