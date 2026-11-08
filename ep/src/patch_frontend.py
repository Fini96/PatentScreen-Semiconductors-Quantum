"""Configure the shared Semiconductor Patent Atlas front end (CNIPA & TIPO version, assets/app.js) for the EP study.
Usage: python3 patch_frontend.py <path to app.js of the CN/TW site> <output app.js>
Every replacement is asserted, so the script fails loudly if the shared front end changes."""
import sys
s = open(sys.argv[1], encoding="utf-8").read()
def rep(a, b, cnt=1):
    global s
    n = s.count(a)
    assert n == cnt, (n, a[:90])
    s = s.replace(a, b)

rep("/* Semiconductor Patent Atlas: dashboard logic. Data: data/*.json */", "/* Semiconductor Patent Atlas: dashboard logic. Data: data/*.json\n   Shared front end of the CNIPA & TIPO and the EPO dashboards; this copy is configured for the EP study\n   (offices, inventor coverage, filing-entity sites) through data/dashboard.json → meta. */")
rep("const CPCSUB = ['H01L', 'H10D', 'H10B', 'H10P', 'H10W', 'H10N', 'G06N10', 'G06F30'];\nconst CPCDESC = ['Semiconductor devices (legacy H01L)', 'Inorganic semiconductor devices (H10D)', 'Electronic memory devices (H10B)', 'Generic manufacturing processes (H10P, 2026)', 'Packages & interconnects (H10W, 2026)', 'Superconducting, thermoelectric, spintronic (H10N)', 'Quantum computing (G06N 10)', 'IC / EDA design (G06F 30)'];",
    "const CPCSUB = D.meta.cpcsub;\nconst CPCDESC_ALL = { H01L: 'Semiconductor devices (legacy H01L)', H10D: 'Inorganic semiconductor devices (H10D)', H10B: 'Electronic memory devices (H10B)', H10P: 'Generic manufacturing processes (H10P, 2026)', H10W: 'Packages & interconnects (H10W, 2026)', H10N: 'Superconducting, thermoelectric, spintronic (H10N)', G06N10: 'Quantum computing (G06N 10)', G06F30: 'IC / EDA design (G06F 30)', B82Y: 'Nanotechnology (B82Y)' };\nconst CPCDESC = CPCSUB.map(s => CPCDESC_ALL[s] || s);")
rep("const MONTHS = D.meta.months;", "const MONTHS = D.meta.months;\n// offices: EP (regional) and the national offices; time series are drawn as EP vs national\nconst OFFICES = D.meta.offices, EPI = OFFICES.indexOf('EP'), CHIPS = D.meta.officeChips;\nconst offKey = o => CHIPS.includes(OFFICES[o]) ? OFFICES[o] : 'other';\nconst sx = o => (o === EPI ? 0 : 1);\nconst SERIES_NAMES = ['EP (regional)', 'National offices'];\nconst FAMJUR = !!D.meta.famjur;")
rep("CBASIS = { P: 'study mapping (headquarters country of the group)', M: 'study mapping (headquarters country of the group)', D: 'patent record (harmonised applicant country / TIPO nationality)'",
    "CBASIS = { P: 'study mapping (headquarters country of the group)', M: 'study mapping (headquarters country of the Wikidata-verified group)', D: 'patent record (harmonised applicant country)'")
rep("const catOff = new Int32Array(N + 1), aidOff = new Int32Array(N + 1), invOff = new Int32Array(N + 1);\nconst catTmp = [], aidTmp = [], invTmp = [];",
    "const catOff = new Int32Array(N + 1), aidOff = new Int32Array(N + 1), invOff = new Int32Array(N + 1), sitOff = new Int32Array(N + 1);\nconst catTmp = [], aidTmp = [], invTmp = [], sitTmp = [];")
rep("  if (f[8]) for (const c of f[8].split('.')) { if (!invIdx.has(c)) { invIdx.set(c, invCodes.length); invCodes.push(c); } invTmp.push(invIdx.get(c)); }\n}",
    "  if (f[8]) for (const c of f[8].split('.')) { if (!invIdx.has(c)) { invIdx.set(c, invCodes.length); invCodes.push(c); } invTmp.push(invIdx.get(c)); }\n  sitOff[i] = sitTmp.length;\n  if (f[9]) for (const c of f[9].split('.')) sitTmp.push(+c);\n}")
rep("catOff[N] = catTmp.length; aidOff[N] = aidTmp.length; invOff[N] = invTmp.length;\nconst catIdx = Uint8Array.from(catTmp), aidIdx = Int32Array.from(aidTmp), invArr = Uint8Array.from(invTmp);",
    "catOff[N] = catTmp.length; aidOff[N] = aidTmp.length; invOff[N] = invTmp.length; sitOff[N] = sitTmp.length;\nconst catIdx = Uint8Array.from(catTmp), aidIdx = Int32Array.from(aidTmp), invArr = Uint8Array.from(invTmp), sitIdx = Int32Array.from(sitTmp);")
rep("const hasPoint = a => LO.lat[a] != null;",
    "const hasPoint = a => LO.lat[a] != null;\n// filing-entity sites: a group whose filing entities sit in different places has one dot per place\nconst SITES = D.sites || []; const NS = SITES.length;\nconst SITES_OF = new Map(); SITES.forEach((s, i) => { if (!SITES_OF.has(s[0])) SITES_OF.set(s[0], []); SITES_OF.get(s[0]).push(i); });")
rep("    if (offSel && !offSel.has(off[d] ? 'TW' : 'CN')) continue;", "    if (offSel && !offSel.has(offKey(off[d]))) continue;")
rep("  const ks = Float64Array.from(keys).sort();\n  for (let i = 0; i < ks.length; i++) if (i === 0 || ks[i] !== ks[i - 1]) fam[Math.floor(ks[i] / 262144)]++;",
    "  const ks = Float64Array.from(keys).sort();\n  for (let i = 0; i < ks.length; i++) if (i === 0 || ks[i] !== ks[i - 1]) fam[Math.floor(ks[i] / 262144)]++;\n  // per filing-entity site\n  const sCnt = new Int32Array(NS), sFrac = new Float64Array(NS), sFam = new Int32Array(NS); const skeys = [];\n  for (let d = 0; d < N; d++) if (pass1[d]) { const np = nPar(d); for (let k = sitOff[d]; k < sitOff[d + 1]; k++) { const s = sitIdx[k]; sCnt[s]++; sFrac[s] += 1 / np; skeys.push(s * 262144 + fi[d]); } }\n  const sks = Float64Array.from(skeys).sort();\n  for (let i = 0; i < sks.length; i++) if (i === 0 || sks[i] !== sks[i - 1]) sFam[Math.floor(sks[i] / 262144)]++;")
rep("finalDoc[d] = 1; docs++; byOff[off[d]]++;", "finalDoc[d] = 1; docs++; byOff[sx(off[d])]++;")
rep("    if (F.basis === 'pub' || true) series[off[d]][pm[d]]++;", "    series[sx(off[d])][pm[d]]++;")
rep("    if (off[d] === 1 && invOff[d + 1] > invOff[d]) { invDocs++;", "    if (invOff[d + 1] > invOff[d]) { invDocs++;")
rep("  const val = a => F.measure === 'fams' ? fam[a] : (F.attr === 'frac' ? frac[a] : cnt[a]);", "  const val = a => F.measure === 'fams' ? fam[a] : (F.attr === 'frac' ? frac[a] : cnt[a]);\n  const sval = s => F.measure === 'fams' ? sFam[s] : (F.attr === 'frac' ? sFrac[s] : sCnt[s]);")
rep("R = { pass1, passA, finalDoc, cnt, frac, fam, val, docs,", "R = { pass1, passA, finalDoc, cnt, frac, fam, val, sval, sCnt, docs,")
rep("    n++; famS.add(fi[d]); ser[off[d]][pm[d]]++;", "    n++; famS.add(fi[d]); ser[sx(off[d])][pm[d]]++;", 2)
rep("""${t.k === 1 ? 'disabled title="No applicant could be classified as a startup from the patent data; see Methodology."' : ''}""", """${t.k === 1 ? 'title="Startups: founded 2015 or later, independent, founding year verified in Wikidata (checked for the largest groups only; see Methodology)."' : ''}""")
rep("""$('#officeChips').innerHTML = ['CN', 'TW'].map(o => `<button class="chip" type="button" data-o="${o}" aria-pressed="false">${o === 'CN' ? 'CNIPA (CN)' : 'TIPO (TW)'}</button>`).join('');""",
    """$('#officeChips').innerHTML = [...CHIPS, 'other'].map(o => `<button class="chip" type="button" data-o="${o}" aria-pressed="false" title="${o === 'EP' ? 'European Patent Office (regional)' : o === 'other' ? 'Other national offices: ' + OFFICES.filter(x => !CHIPS.includes(x)).join(', ') : 'National office ' + o}">${o === 'other' ? 'Other national' : o}</button>`).join('');""")
rep("""$('#jurChips').innerHTML = JUR.filter(j => j.k !== 'CN' && j.k !== 'TW').map(j => `<button class="chip" type="button" data-j="${j.k}" aria-pressed="false" title="${j.kind} system">${j.k}</button>`).join('');""",
    """$('#jurChips').innerHTML = JUR.map(j => `<button class="chip" type="button" data-j="${j.k}" aria-pressed="false" ${FAMJUR ? `title="${j.kind} system"` : 'disabled title="Family look-up not loaded"'}>${j.k}</button>`).join('');""")
rep("""$('#activeSummary').textContent = parts.length ? 'Active filters: ' + parts.join(' · ') : 'No filters: all 99,546 publications in the study.';""", """$('#activeSummary').textContent = parts.length ? 'Active filters: ' + parts.join(' · ') : `No filters: all ${fmt(N)} applications in the study.`;""")
rep("['Patent applications', fmt(R.docs), `CN ${fmt(R.byOff[0])} · TW ${fmt(R.byOff[1])}`],", "['Patent applications', fmt(R.docs), `EP ${fmt(R.byOff[0])} · national ${fmt(R.byOff[1])}`],")
rep("['Private inventors', fmt(ind), `${fmt(R.indivAny)} publications`],", "['Private inventors', fmt(ind), `${fmt(R.indivAny)} applications`],")
rep("R.docs ? `${fmt(R.grp[gi])} publications (${pct(R.grp[gi] / R.docs)})` : ''", "R.docs ? `${fmt(R.grp[gi])} applications (${pct(R.grp[gi] / R.docs)})` : ''")
rep("center: [112, 28], zoom: 2.2,", "center: [15, 38], zoom: 1.4,", 2)
rep("label = 'publications with an applicant from the country'; }", "label = 'applications with an applicant from the country'; }")
rep("label = 'TW publications naming ≥1 inventor from the country'; }", "label = 'applications naming ≥1 inventor from the country'; }")
rep("label = 'publications whose family has a member filed there'; }", "label = 'applications whose family has a member filed there'; }")
rep("nd: (mode === 'B' && iso === 'CN') || (mode === 'C' && !JUR.some(j => j.k === iso)),", "nd: (mode === 'C' && !JUR.some(j => j.k === iso)),")
rep("""  for (const a of R.ranked) if (hasPoint(a)) fs.push({ type: 'Feature', properties: { a, t: A.typ[a], v: R.val(a), p: LO.p[a] }, geometry: { type: 'Point', coordinates: [LO.lng[a], LO.lat[a]] } });""",
    """  for (const a of R.ranked) {
    const ss = SITES_OF.get(a);
    if (ss) { for (const s of ss) { const v = R.sval(s); if (v > 0) fs.push({ type: 'Feature', properties: { a, s, t: A.typ[a], v, p: SITES[s][3] }, geometry: { type: 'Point', coordinates: [SITES[s][2], SITES[s][1]] } }); } }
    else if (hasPoint(a)) fs.push({ type: 'Feature', properties: { a, s: -1, t: A.typ[a], v: R.val(a), p: LO.p[a] }, geometry: { type: 'Point', coordinates: [LO.lng[a], LO.lat[a]] } });
  }""")
rep("b.onmouseenter = e => showTip(e, appTip(it.a));", "b.onmouseenter = e => showTip(e, appTip(it.a, it.s));")
rep("if (fa.length) { map.getCanvas().style.cursor = 'pointer'; setHover(null); showTip(e.originalEvent, appTip(fa[0].properties.a)); return; }", "if (fa.length) { map.getCanvas().style.cursor = 'pointer'; setHover(null); showTip(e.originalEvent, appTip(fa[0].properties.a, fa[0].properties.s)); return; }")
rep("""    h += '<div class="row">' + TYPES.map(t => `<span class="it"><span class="sw" style="background:var(${t.tok})${t.k === 1 ? ';opacity:.4' : ''}"></span>${t.label}</span>`).join('') + '</div>';""",
    """    h += '<div class="row">' + TYPES.map(t => `<span class="it"><span class="sw" style="background:var(${t.tok})"></span>${t.label}</span>`).join('') + '</div>';""")
rep("Dots sit at the verified site or city centre; identical coordinates fan out on click.", "Dots sit at the verified site or city centre; a group whose filing entities are in different places has one dot per place; identical coordinates fan out on click.")
rep("""  if (mode === 'B') h += `<div class="row"><span class="it"><span class="sw" style="background:${css('--nodata')};border-radius:2px"></span>no inventor data (all CNIPA records)</span></div>`;\n""", "")
rep("""    A: '<b>Applicant location.</b> Each applicant is drawn at its verified headquarters site or city (Wikidata, USPTO applicant addresses, the city in a Chinese registered name, or manual checks; see Methodology). Applicants known only to province or country level are grouped in dashed circles; private inventors are never placed below country level.',
    B: '<b>Inventor location.</b> Countries named in inventor records. Only TIPO (TW) records carry inventor countries; CNIPA records carry none, so CN publications are excluded from this view. Inventors are not applicants: this shows where the research was done, at country level only.',
    C: '<b>Filing jurisdiction.</b> Where protection is sought: share of filtered publications whose patent family also has a member at each office. National offices (CN, TW, US, JP, KR) are shaded; the regional EP route and the international PCT (WO) route are shown separately and say nothing about where an invention was made. Other offices were not looked up.',""",
    """    A: '<b>Applicant location.</b> Each filing entity is drawn at its verified headquarters site or city (Wikidata headquarters, USPTO applicant addresses or manual checks; see Methodology), so a group such as Infineon appears in Neubiberg, Villach and Dresden. Applicants known only to province or country level are grouped in dashed circles; private inventors are never placed below country level.',
    B: '<b>Inventor location.</b> Countries named in the inventor records (Google Patents harmonised inventor data, country only). Inventors are not applicants: this shows where the research was done, at country level only.',
    C: '<b>Filing jurisdiction.</b> Where protection is sought: share of filtered applications whose patent family also has a member at each office. National offices (US, JP, KR, CN, TW) are shaded; the regional EP route and the international PCT (WO) route are shown separately and say nothing about where an invention was made. European national offices were not part of the family look-up.',""")
rep("""  if (mode === 'B') { ban.hidden = false; ban.textContent = `Inventor view uses ${fmt(R.invDocs)} TW publications with inventor countries. ${fmt(R.byOff[0])} CN publications in the filter have no inventor location and are not shown.`; }\n  else ban.hidden = true;""",
    """  if (mode === 'B' && R.docs > R.invDocs) { ban.hidden = false; ban.textContent = `Inventor view uses ${fmt(R.invDocs)} applications with inventor countries; ${fmt(R.docs - R.invDocs)} filtered applications carry none and are not shown.`; }
  else if (mode === 'C' && !FAMJUR) { ban.hidden = false; ban.textContent = 'The family look-up (offices where the same family has members) is not loaded in this build.'; }
  else ban.hidden = true;""")
rep("""function appTip(a) {
  const det = appDetail(a);""", """function appTip(a, s) {
  const det = appDetail(a);
  const site = s != null && s >= 0 && (SITES_OF.get(a) || []).length > 1 ? SITES[s] : null;""")
rep("""    <span>Location</span><span>${esc(locLabel(a))}</span>
    <span>Precision</span><span>${LPREC[LO.p[a]].label}${LO.conf[a] ? ' · ' + esc(LO.conf[a]) + ' confidence' : ''}</span>""",
    """    ${site ? `<span>This site</span><span>${esc(site[4])} · ${esc(site[5])}</span><span>Applications here</span><span class="mono">${fmt(R.sCnt[s])}</span><span>Precision</span><span>${LPREC[site[3]].label}${site[6] ? ' · ' + esc(site[6]) + ' confidence' : ''}</span><span>Group</span><span>${(SITES_OF.get(a) || []).length} places; main: ${esc(locLabel(a))}</span>` : `<span>Location</span><span>${esc(locLabel(a))}</span>
    <span>Precision</span><span>${LPREC[LO.p[a]].label}${LO.conf[a] ? ' · ' + esc(LO.conf[a]) + ' confidence' : ''}</span>`}""")
rep("""  if (mode === 'B') { const i = invIdx.get(cc); return `<h4>${esc(name)}</h4>${cc === 'CN' ? '<div>CNIPA records carry no inventor country.</div>' : ''}<div class="kv"><span>TW publications with an inventor here</span><span class="mono">${fmt(i != null ? R.inv[i] : 0)}</span></div>`; }""",
    """  if (mode === 'B') { const i = invIdx.get(cc); return `<h4>${esc(name)}</h4><div class="kv"><span>Applications with an inventor here</span><span class="mono">${fmt(i != null ? R.inv[i] : 0)}</span></div>`; }""")
rep("<span>Publications</span><span class=\"mono\">${fmt(docs)}</span><span>Leading technologies</span>", "<span>Applications</span><span class=\"mono\">${fmt(docs)}</span><span>Leading technologies</span>")
rep("""${fmt(R.unmappedDocs)} filtered publications have at least one such applicant.""", """${fmt(R.unmappedDocs)} filtered applications have at least one such applicant.""")
rep("""Computed in ${Math.round(R.ms)} ms over ${fmt(N)} publication records.""", """Computed in ${Math.round(R.ms)} ms over ${fmt(N)} application records.""")
rep("""  if (mode === 'B') { const i = invIdx.get(cc); h += `<div class="prec">Inventor view: ${fmt(i != null ? R.inv[i] : 0)} TW publications name an inventor in ${esc(ccName(cc))}.${cc === 'CN' ? ' CNIPA records carry no inventor country.' : ''}</div>`; }""",
    """  if (mode === 'B') { const i = invIdx.get(cc); h += `<div class="prec">Inventor view: ${fmt(i != null ? R.inv[i] : 0)} filtered applications name an inventor in ${esc(ccName(cc))}.</div>`; }""")
rep("""' filtered publications belong to families with a member filed here.'""", """' filtered applications belong to families with a member filed here.'""")
rep("""  if (grp) h += `<div class="note">This applicant groups related entities under one parent (documented study rule). Its location is the verified group headquarters where checked, otherwise the address of the group's principal filing entity; subsidiaries may be elsewhere.</div>`;""",
    """  const ss = SITES_OF.get(a) || [];
  if (ss.length > 1) h += `<div class="note" style="margin-top:6px"><b>${ss.length} places.</b> Each filing entity of this group is located on its own (a subsidiary never inherits the parent's address):</div><ul class="alist sites">${ss.map(s => `<li><span class="pc pc-${SITES[s][3]}">${LPREC[SITES[s][3]].short}</span><span style="min-width:0"><div class="nm">${esc(SITES[s][4])}</div><div class="sub">${esc(SITES[s][5])}${SITES[s][7] > 1 ? ` + ${SITES[s][7] - 1} more name${SITES[s][7] > 2 ? 's' : ''}` : ''}${SITES[s][6] ? ' · ' + esc(SITES[s][6]) + ' confidence' : ''}</div></span><span class="mono">${fmt(R.sCnt[s])}</span></li>`).join('')}</ul><div class="note">Applications under the current filters filed under the names at each place. Names without a verified town are not drawn.</div>`;
  else if (grp) h += `<div class="note">This applicant groups related entities under one parent (documented study rule). Entities without a verified town are not drawn.</div>`;""")
rep("""<div class="note">Published at CNIPA/TIPO, plus offices where the same family has a member (EP, US, JP, KR, WO looked up).</div>""", """<div class="note">Offices where the same family has a member (EP, US, JP, KR, WO, CN, TW looked up)${FAMJUR ? '' : ': look-up not loaded in this build'}.</div>""")
rep("""  lineChart($('#saT'), [{ n: 'CN', c: 'var(--t0)', v: Array.from(det.ser[0]) }, { n: 'TW', c: 'var(--t1)', v: Array.from(det.ser[1]), until: 19 }], MONTHS.map(m => m.slice(2)), { h: 140, aria: 'publications per month' });""",
    """  lineChart($('#saT'), [{ n: 'EP', c: 'var(--t0)', v: Array.from(det.ser[0]) }, { n: 'National', c: 'var(--t1)', v: Array.from(det.ser[1]) }], MONTHS.map(m => m.slice(2)), { h: 140, aria: 'applications per month' });""")
rep("""  const tw = Array.from(R.series[1]); const lastTW = 19; // Jun 2026
  lineChart($('#chTime'), [{ n: 'CNIPA (CN)', c: 'var(--t0)', v: Array.from(R.series[0]) }, { n: 'TIPO (TW)', c: 'var(--t1)', v: tw, until: lastTW }], MONTHS.map(m => m.slice(2)), { mark: 22, markLabel: 'CN partial', aria: 'publications per month' });
  $('#noteTime').textContent = 'TW data end in Jun 2026; CN data end on 8 Sep 2026 (September partial). Lower counts in the last months reflect data cut-off, not falling activity.' + (F.basis === 'fil' ? ' The time filter currently uses filing year; the chart still runs by publication month.' : '');""",
    """  lineChart($('#chTime'), [{ n: SERIES_NAMES[0], c: 'var(--t0)', v: Array.from(R.series[0]) }, { n: SERIES_NAMES[1], c: 'var(--t1)', v: Array.from(R.series[1]) }], MONTHS.map(m => m.slice(2)), { mark: MONTHS.length - 1, markLabel: 'partial', aria: 'applications per month' });
  $('#noteTime').textContent = `Latest data: EP ${D.meta.latest.EP}, DE ${D.meta.latest.DE} (September 2026 partial). Italian national records end in December 2025 and British records thin out in 2026; lower counts in the last months reflect data cut-off, not falling activity.` + (F.basis === 'fil' ? ' The time filter currently uses filing year; the chart still runs by publication month.' : '');""")
rep("""on: i === 1 ? null : () => { F.types = new Set([i]); update(); } })), { labelW: 210, aria: 'publications by applicant type' });""", """on: () => { F.types = new Set([i]); update(); } })), { labelW: 210, aria: 'applications by applicant type' });""")
rep("""stack100($('#chIndiv'), [{ l: 'Publications',""", """stack100($('#chIndiv'), [{ l: 'Applications',""")
rep("""$('#noteIndiv').textContent = `${fmt(R.indivAny)} of ${fmt(R.docs)} filtered publications (${pct(R.indivAny / tot)}) name at least one private inventor as applicant; ${fmt(R.indivOnly)} are filed by private inventors alone or together.`;""", """$('#noteIndiv').textContent = `${fmt(R.indivAny)} of ${fmt(R.docs)} filtered applications (${pct(R.indivAny / tot)}) name at least one private inventor as applicant; ${fmt(R.indivOnly)} are filed by private inventors alone or together.`;""")
rep("""data-ct="${t.k}" aria-pressed="false" ${t.k === 1 ? 'disabled' : ''}>""", """data-ct="${t.k}" aria-pressed="false">""")
rep("""$('#coverage').textContent = `${D.meta.window} · latest publication in data: CN ${D.meta.latest.CN}, TW ${D.meta.latest.TW} · ${fmt(N)} applications · ${fmt(NA)} applicant groups · sources: Google Patents Public Datasets (BigQuery); applicant locations verified ${D.meta.geo_verified}`;""",
    """$('#coverage').textContent = `${D.meta.window} · latest publication in data: EP ${D.meta.latest.EP}, DE ${D.meta.latest.DE} · ${fmt(N)} applications · ${fmt(NA)} applicant groups · sources: Google Patents Public Datasets (BigQuery); applicant locations verified ${D.meta.geo_verified}`;""")

# methodology: replace the CN/TW text with the EP study's
i = s.index("  $('#methBody').innerHTML = `"); j = s.index("`;\n}\n$('#btnMethod')")
s = s[:i] + open(sys.argv[3], encoding="utf-8").read().rstrip() + s[j + 2:]
open(sys.argv[2], "w", encoding="utf-8").write(s)
print("patched")
