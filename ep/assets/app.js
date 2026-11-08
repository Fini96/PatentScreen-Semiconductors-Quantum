/* Semiconductor Patent Atlas: dashboard logic. Data: data/*.json
   Shared front end of the CNIPA & TIPO and the EPO dashboards; this copy is configured for the EP study
   (offices, inventor coverage, filing-entity sites) through data/dashboard.json → meta. */

(async function () {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const fmt = d3.format(',');
const fmt1 = d3.format(',.1f');
const pct = v => (v * 100 >= 10 ? d3.format('.0f')(v * 100) : d3.format('.1f')(v * 100)) + '%';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

// ------------------------------------------------------------------ load (static files next to index.html)
const BASE = location.href.replace(/[#?].*$/, '').replace(/[^/]*$/, '');
async function getJSON(p) { const r = await fetch(p); if (!r.ok) throw new Error(p + ': HTTP ' + r.status); return r.json(); }
async function getText(p) { const r = await fetch(p); if (!r.ok) throw new Error(p + ': HTTP ' + r.status); return r.text(); }
let D, DOCS, COUNTRIES_GJ;
try {
  [D, DOCS, COUNTRIES_GJ] = await Promise.all([getJSON('data/dashboard.json'), getText('data/docs.txt'), getJSON('data/countries.geojson')]);
} catch (e) {
  $('#loadmsg').innerHTML = 'The data files could not be loaded (' + esc(e.message) + ').<br>If you opened index.html straight from disk, start a local web server in the dashboard folder (<span class="mono">python3 -m http.server</span>) and open <span class="mono">http://localhost:8000</span>.';
  return;
}
if (typeof maplibregl === 'undefined') { $('#loadmsg').textContent = 'The map library could not be loaded.'; return; }

const TYPES = [
  { k: 0, label: 'Company', long: 'Company (established)', tok: '--t0' },
  { k: 1, label: 'Startup', long: 'Startup', tok: '--t1' },
  { k: 2, label: 'University', long: 'University', tok: '--t2' },
  { k: 3, label: 'Research institute', long: 'Public / non-profit research institute', tok: '--t3' },
  { k: 4, label: 'Private inventor', long: 'Private inventor (natural person as applicant)', tok: '--t4' },
  { k: 5, label: 'Other / unknown', long: 'Other or unknown', tok: '--t5' },
];
const typeColor = t => css(TYPES[t].tok);
const GROUPS = D.groups.map(([k, label], i) => ({ k, label, i }));
const GCOL = ['#3b6fb6', '#c4572d', '#6a8f2f', '#c08a1e', '#7d5aa6', '#2b8a86', '#b5487a', '#5b6b77', '#1f9bcf', '#7aa6c2', '#9c7f5a', '#a3a3a3'];
const CATS = D.cats.map(([id, g, en, cn, tw], i) => ({ i, id, g, en, cn, tw }));
const CPCSUB = D.meta.cpcsub;
const CPCDESC_ALL = { H01L: 'Semiconductor devices (legacy H01L)', H10D: 'Inorganic semiconductor devices (H10D)', H10B: 'Electronic memory devices (H10B)', H10P: 'Generic manufacturing processes (H10P, 2026)', H10W: 'Packages & interconnects (H10W, 2026)', H10N: 'Superconducting, thermoelectric, spintronic (H10N)', G06N10: 'Quantum computing (G06N 10)', G06F30: 'IC / EDA design (G06F 30)', B82Y: 'Nanotechnology (B82Y)' };
const CPCDESC = CPCSUB.map(s => CPCDESC_ALL[s] || s);
const JUR = [{ b: 1, k: 'EP', kind: 'regional' }, { b: 2, k: 'US', kind: 'national' }, { b: 4, k: 'JP', kind: 'national' }, { b: 8, k: 'KR', kind: 'national' }, { b: 16, k: 'WO', kind: 'international' }, { b: 32, k: 'CN', kind: 'national' }, { b: 64, k: 'TW', kind: 'national' }];
const MONTHS = D.meta.months;
// offices: EP (regional) and the national offices; time series are drawn as EP vs national
const OFFICES = D.meta.offices, EPI = OFFICES.indexOf('EP'), CHIPS = D.meta.officeChips;
const offKey = o => CHIPS.includes(OFFICES[o]) ? OFFICES[o] : 'other';
const sx = o => (o === EPI ? 0 : 1);
const SERIES_NAMES = ['EP (regional)', 'National offices'];
const FAMJUR = !!D.meta.famjur;
const CBASIS = { P: 'study mapping (headquarters country of the group)', M: 'study mapping (headquarters country of the Wikidata-verified group)', D: 'patent record (harmonised applicant country)', I: 'inferred from the priority office of the applicant’s own filings', L: 'taken from the verified location (dataset country was unknown)', U: 'unknown' };
const LPREC = {
  E: { label: 'Exact site', short: 'site', text: 'Coordinates of the organisation itself (Wikidata P625: headquarters building or main campus).' },
  C: { label: 'City', short: 'city', text: 'Located to a verified city and drawn at the city centre, not at a street address.' },
  R: { label: 'Province only', short: 'province', text: 'Only the province or state could be established. Not drawn as an individual marker; grouped in a dashed circle for the province.' },
  K: { label: 'Country only', short: 'country', text: 'Location unverified below country level. Counted in country statistics; grouped in a dashed circle for the country, never placed at a centroid as if it were an address.' },
  U: { label: 'Unknown', short: 'unknown', text: 'Neither country nor location could be established. Kept in all totals and listed as unmapped.' },
};
const REGIONS = {
  'Europe / EU': ['AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI','FR','GR','HR','HU','IE','IT','LT','LU','LV','MT','NL','PL','PT','RO','SE','SI','SK','GB','CH','NO','IS','LI'],
  'North America': ['US','CA','MX'],
  'East Asia': ['CN','TW','JP','KR','HK','MO','MN','KP'],
};

// ------------------------------------------------------------------ parse documents into typed arrays
const lines = DOCS.split('\n');
const N = lines.length;
const off = new Uint8Array(N), pm = new Uint8Array(N), fy = new Uint16Array(N), fi = new Int32Array(N), jm = new Uint8Array(N), cm = new Uint8Array(N), gmask = new Uint16Array(N);
const catOff = new Int32Array(N + 1), aidOff = new Int32Array(N + 1), invOff = new Int32Array(N + 1), sitOff = new Int32Array(N + 1);
const catTmp = [], aidTmp = [], invTmp = [], sitTmp = [];
const invCodes = [], invIdx = new Map();
let maxFi = 0, minFy = 9999, maxFy = 0;
for (let i = 0; i < N; i++) {
  const f = lines[i].split(',');
  off[i] = +f[0]; pm[i] = +f[1]; fy[i] = +f[2]; fi[i] = +f[3]; jm[i] = +f[5]; cm[i] = +f[6];
  if (fi[i] > maxFi) maxFi = fi[i];
  if (fy[i] < minFy) minFy = fy[i]; if (fy[i] > maxFy) maxFy = fy[i];
  catOff[i] = catTmp.length;
  if (f[4]) for (const c of f[4].split('.')) { const ci = +c; catTmp.push(ci); gmask[i] |= (1 << CATS[ci].g); }
  aidOff[i] = aidTmp.length;
  if (f[7]) for (const a of f[7].split('.')) aidTmp.push(+a);
  invOff[i] = invTmp.length;
  if (f[8]) for (const c of f[8].split('.')) { if (!invIdx.has(c)) { invIdx.set(c, invCodes.length); invCodes.push(c); } invTmp.push(invIdx.get(c)); }
  sitOff[i] = sitTmp.length;
  if (f[9]) for (const c of f[9].split('.')) sitTmp.push(+c);
}
catOff[N] = catTmp.length; aidOff[N] = aidTmp.length; invOff[N] = invTmp.length; sitOff[N] = sitTmp.length;
const catIdx = Uint8Array.from(catTmp), aidIdx = Int32Array.from(aidTmp), invArr = Uint8Array.from(invTmp), sitIdx = Int32Array.from(sitTmp);
DOCS = null; lines.length = 0;

const A = D.apps; const NA = A.name.length;
// inverted index applicant -> docs
const appCnt = new Int32Array(NA + 1);
for (let k = 0; k < aidIdx.length; k++) appCnt[aidIdx[k] + 1]++;
for (let a = 0; a < NA; a++) appCnt[a + 1] += appCnt[a];
const appDocs = new Int32Array(aidIdx.length); { const pos = appCnt.slice(0, NA); for (let d = 0; d < N; d++) for (let k = aidOff[d]; k < aidOff[d + 1]; k++) appDocs[pos[aidIdx[k]]++] = d; }
const nPar = d => aidOff[d + 1] - aidOff[d];
const nameLC = A.name.map((s, i) => (s + ' ' + (A.orig[i] || '')).toLowerCase());

// locations (data/applicant_locations.json, condensed into D.loc)
const LO = D.loc;
const hasPoint = a => LO.lat[a] != null;
// filing-entity sites: a group whose filing entities sit in different places has one dot per place
const SITES = D.sites || []; const NS = SITES.length;
const SITES_OF = new Map(); SITES.forEach((s, i) => { if (!SITES_OF.has(s[0])) SITES_OF.set(s[0], []); SITES_OF.get(s[0]).push(i); });
const ccName = c => (D.countries[c] && D.countries[c].n) || D.ccn[c] || c || 'Unknown';
const locLabel = a => {
  const p = LO.p[a], cn = A.cc[a] ? ccName(A.cc[a]) : '';
  if (p === 'E' || p === 'C') return [LO.city[a], LO.state[a] && LO.state[a] !== LO.city[a] ? LO.state[a] : '', cn].filter(Boolean).join(', ');
  if (p === 'R') return `${LO.state[a]}, ${cn} (province only)`;
  if (p === 'K') return `${cn} (country only, location unverified)`;
  return 'Location unknown';
};
const countriesWithApps = [...new Set(A.cc.filter(Boolean))].sort((x, y) => ccName(x).localeCompare(ccName(y)));

// ------------------------------------------------------------------ state
const DEFAULT = () => ({
  cats: new Set(), noCat: false, countries: new Set(), types: new Set(), basis: 'pub', from: 0, to: MONTHS.length - 1,
  offices: new Set(), jur: new Set(), cpc: new Set(), measure: 'apps', min: null, max: null, attr: 'full', q: '',
});
let F = DEFAULT();
let mode = 'A';
let view = { kind: 'global' }; const viewStack = [];
let selected = null; // applicant id
let selCountry = null;
const compare = { apps: [], types: [] };
let R = null;

// ------------------------------------------------------------------ compute
const famMark = new Int32Array(maxFi + 1); let famStamp = 0;
function compute() {
  const t0 = performance.now();
  const useCats = F.cats.size > 0 || F.noCat;
  const catSel = new Uint8Array(CATS.length); F.cats.forEach(c => catSel[c] = 1);
  const offSel = F.offices.size ? F.offices : null;
  let jSel = 0; F.jur.forEach(k => jSel |= JUR.find(j => j.k === k).b);
  let cSel = 0; F.cpc.forEach(i => cSel |= (1 << i));
  const pass1 = new Uint8Array(N);
  for (let d = 0; d < N; d++) {
    if (offSel && !offSel.has(offKey(off[d]))) continue;
    if (F.basis === 'pub') { if (pm[d] < F.from || pm[d] > F.to) continue; } else { if (fy[d] < F.from || fy[d] > F.to) continue; }
    if (jSel && !(jm[d] & jSel)) continue;
    if (cSel && !(cm[d] & cSel)) continue;
    if (useCats) {
      let ok = false;
      if (F.noCat && catOff[d] === catOff[d + 1]) ok = true;
      else for (let k = catOff[d]; k < catOff[d + 1]; k++) if (catSel[catIdx[k]]) { ok = true; break; }
      if (!ok) continue;
    }
    pass1[d] = 1;
  }
  // per applicant counts on doc-filtered set
  const cnt = new Int32Array(NA), frac = new Float64Array(NA), fam = new Int32Array(NA);
  const keys = [];
  for (let d = 0; d < N; d++) if (pass1[d]) {
    const np = nPar(d);
    for (let k = aidOff[d]; k < aidOff[d + 1]; k++) { const a = aidIdx[k]; cnt[a]++; frac[a] += 1 / np; keys.push(a * 262144 + fi[d]); }
  }
  const ks = Float64Array.from(keys).sort();
  for (let i = 0; i < ks.length; i++) if (i === 0 || ks[i] !== ks[i - 1]) fam[Math.floor(ks[i] / 262144)]++;
  // per filing-entity site
  const sCnt = new Int32Array(NS), sFrac = new Float64Array(NS), sFam = new Int32Array(NS); const skeys = [];
  for (let d = 0; d < N; d++) if (pass1[d]) { const np = nPar(d); for (let k = sitOff[d]; k < sitOff[d + 1]; k++) { const s = sitIdx[k]; sCnt[s]++; sFrac[s] += 1 / np; skeys.push(s * 262144 + fi[d]); } }
  const sks = Float64Array.from(skeys).sort();
  for (let i = 0; i < sks.length; i++) if (i === 0 || sks[i] !== sks[i - 1]) sFam[Math.floor(sks[i] / 262144)]++;
  // applicant filters
  const q = F.q.trim().toLowerCase();
  const passA = new Uint8Array(NA);
  const meas = F.measure === 'fams' ? fam : (F.attr === 'frac' ? frac : cnt);
  for (let a = 0; a < NA; a++) {
    if (!cnt[a]) continue;
    if (F.types.size && !F.types.has(A.typ[a])) continue;
    if (F.countries.size && !F.countries.has(A.cc[a] || '__U')) continue;
    if (q && !nameLC[a].includes(q)) continue;
    const m = meas[a];
    if (F.min != null && m < F.min) continue;
    if (F.max != null && m > F.max) continue;
    passA[a] = 1;
  }
  // final docs and aggregates
  famStamp++;
  let docs = 0, fams = 0; const byOff = [0, 0];
  const series = [new Int32Array(MONTHS.length), new Int32Array(MONTHS.length)];
  const fySeries = new Map();
  const grp = new Int32Array(GROUPS.length);
  const typeDocs = new Int32Array(6); const typeFamSets = TYPES.map(() => new Set());
  const ctyDocs = new Map(), ctyFam = new Map(), ctyGrp = new Map(), ctyFrac = new Map();
  const locDocs = new Map();
  const inv = new Int32Array(invCodes.length); let invDocs = 0;
  const jur = new Int32Array(7);
  let indivOnly = 0, indivAny = 0, instOnly = 0, unmappedDocs = 0;
  const finalDoc = new Uint8Array(N);
  const tmpC = [], tmpL = [], tmpT = new Uint8Array(6);
  for (let d = 0; d < N; d++) {
    if (!pass1[d]) continue;
    let any = false; tmpC.length = 0; tmpL.length = 0; tmpT.fill(0); let hasUnm = false;
    for (let k = aidOff[d]; k < aidOff[d + 1]; k++) {
      const a = aidIdx[k]; if (!passA[a]) continue; any = true;
      const c = A.cc[a] || '__U'; if (!tmpC.includes(c)) tmpC.push(c);
      if (!hasPoint(a)) hasUnm = true;
      tmpT[A.typ[a]] = 1;
    }
    if (!any) continue;
    finalDoc[d] = 1; docs++; byOff[sx(off[d])]++;
    if (famMark[fi[d]] !== famStamp) { famMark[fi[d]] = famStamp; fams++; }
    series[sx(off[d])][pm[d]]++;
    fySeries.set(fy[d], (fySeries.get(fy[d]) || 0) + 1);
    const gm = gmask[d];
    for (let g = 0; g < GROUPS.length; g++) if (gm & (1 << g)) grp[g]++;
    for (let t = 0; t < 6; t++) if (tmpT[t]) { typeDocs[t]++; typeFamSets[t].add(fi[d]); }
    if (tmpT[4]) { indivAny++; let inst = false; for (let t = 0; t < 6; t++) if (t !== 4 && tmpT[t]) inst = true; if (!inst) indivOnly++; } else instOnly++;
    if (hasUnm) unmappedDocs++;
    for (const c of tmpC) {
      ctyDocs.set(c, (ctyDocs.get(c) || 0) + 1);
      let s = ctyFam.get(c); if (!s) ctyFam.set(c, s = new Set()); s.add(fi[d]);
      let g2 = ctyGrp.get(c); if (!g2) ctyGrp.set(c, g2 = new Int32Array(GROUPS.length));
      for (let g = 0; g < GROUPS.length; g++) if (gm & (1 << g)) g2[g]++;
    }
    if (invOff[d + 1] > invOff[d]) { invDocs++; for (let k = invOff[d]; k < invOff[d + 1]; k++) inv[invArr[k]]++; }
    for (let j = 0; j < 7; j++) if (jm[d] & JUR[j].b) jur[j]++;
  }
  // fractional per country
  for (let a = 0; a < NA; a++) if (passA[a]) { const c = A.cc[a] || '__U'; ctyFrac.set(c, (ctyFrac.get(c) || 0) + frac[a]); }
  // applicants ranked
  const ranked = [];
  for (let a = 0; a < NA; a++) if (passA[a]) ranked.push(a);
  const val = a => F.measure === 'fams' ? fam[a] : (F.attr === 'frac' ? frac[a] : cnt[a]);
  const sval = s => F.measure === 'fams' ? sFam[s] : (F.attr === 'frac' ? sFrac[s] : sCnt[s]);
  ranked.sort((x, y) => val(y) - val(x) || cnt[y] - cnt[x]);
  const rankOf = new Int32Array(NA).fill(-1); ranked.forEach((a, i) => rankOf[a] = i);
  const typeApps = new Int32Array(6); const ctyApps = new Map();
  for (const a of ranked) { typeApps[A.typ[a]]++; const c = A.cc[a] || '__U'; let o = ctyApps.get(c); if (!o) ctyApps.set(c, o = new Int32Array(6)); o[A.typ[a]]++; }
  R = { pass1, passA, finalDoc, cnt, frac, fam, val, sval, sCnt, docs, fams, byOff, series, fySeries, grp, typeDocs, typeFams: typeFamSets.map(s => s.size),
    ctyDocs, ctyFam, ctyGrp, ctyFrac, ctyApps, typeApps, locDocs, inv, invDocs, jur, indivOnly, indivAny, instOnly, unmappedDocs, ranked, rankOf,
    ms: performance.now() - t0 };
}

// ------------------------------------------------------------------ per-applicant detail on current filters
function appDetail(a, useFinal) {
  const g = new Int32Array(GROUPS.length), c = new Int32Array(CATS.length), ser = [new Int32Array(MONTHS.length), new Int32Array(MONTHS.length)];
  const cp = new Int32Array(CPCSUB.length), jj = new Int32Array(7); let n = 0; const famS = new Set();
  let solo = 0, withPersons = 0, withInst = 0; const coTypes = new Int32Array(6);
  for (let k = appCnt[a]; k < appCnt[a + 1]; k++) {
    const d = appDocs[k]; if (!R.pass1[d]) continue;
    n++; famS.add(fi[d]); ser[sx(off[d])][pm[d]]++;
    for (let gg = 0; gg < GROUPS.length; gg++) if (gmask[d] & (1 << gg)) g[gg]++;
    for (let kk = catOff[d]; kk < catOff[d + 1]; kk++) c[catIdx[kk]]++;
    for (let s = 0; s < CPCSUB.length; s++) if (cm[d] & (1 << s)) cp[s]++;
    for (let j = 0; j < 7; j++) if (jm[d] & JUR[j].b) jj[j]++;
    const np = nPar(d);
    if (np === 1) solo++; else {
      let p = false, ins = false;
      for (let kk = aidOff[d]; kk < aidOff[d + 1]; kk++) { const b = aidIdx[kk]; if (b === a) continue; coTypes[A.typ[b]]++; if (A.typ[b] === 4) p = true; else ins = true; }
      if (ins) withInst++; else if (p) withPersons++;
    }
  }
  return { n, fams: famS.size, g, c, ser, cp, jj, solo, withPersons, withInst, coTypes };
}
function groupDetail(filterFn) { // aggregate for a set of applicants (category comparison): distinct docs
  const g = new Int32Array(GROUPS.length), ser = [new Int32Array(MONTHS.length), new Int32Array(MONTHS.length)], cp = new Int32Array(CPCSUB.length), jj = new Int32Array(7);
  let n = 0; const famS = new Set(); let apps = 0;
  for (let a = 0; a < NA; a++) if (R.passA[a] && filterFn(a)) apps++;
  for (let d = 0; d < N; d++) {
    if (!R.finalDoc[d]) continue;
    let hit = false; for (let k = aidOff[d]; k < aidOff[d + 1]; k++) { const a = aidIdx[k]; if (R.passA[a] && filterFn(a)) { hit = true; break; } }
    if (!hit) continue;
    n++; famS.add(fi[d]); ser[sx(off[d])][pm[d]]++;
    for (let gg = 0; gg < GROUPS.length; gg++) if (gmask[d] & (1 << gg)) g[gg]++;
    for (let s = 0; s < CPCSUB.length; s++) if (cm[d] & (1 << s)) cp[s]++;
    for (let j = 0; j < 7; j++) if (jm[d] & JUR[j].b) jj[j]++;
  }
  return { n, fams: famS.size, g, ser, cp, jj, apps };
}

// ------------------------------------------------------------------ filter UI
function buildFilters() {
  // technology menu
  const m = $('#menuTech');
  let h = '<div class="tools"><button class="btn" type="button" data-act="all">Select all</button><button class="btn" type="button" data-act="none">Clear</button></div>';
  GROUPS.forEach(g => {
    h += `<div class="grp"><label><input type="checkbox" data-g="${g.i}"> <span><span class="pill"><span class="sw" style="background:${GCOL[g.i]}"></span>${esc(g.label)}</span></span><span class="cnt" data-gc="${g.i}"></span></label><div class="sub">`;
    CATS.filter(c => c.g === g.i).forEach(c => { h += `<label><input type="checkbox" data-c="${c.i}"> <span>${esc(c.en)} <span class="zh">${esc(c.cn)}</span></span><span class="cnt" data-cc="${c.i}"></span></label>`; });
    h += '</div></div>';
  });
  h += `<div class="grp"><label><input type="checkbox" data-nocat="1"> <span>No specific technology category <span class="zh">(in scope by CPC/IPC, no sub-category matched)</span></span></label></div>`;
  m.innerHTML = h;
  m.addEventListener('change', e => {
    const t = e.target;
    if (t.dataset.g != null) { const gi = +t.dataset.g; CATS.filter(c => c.g === gi).forEach(c => t.checked ? F.cats.add(c.i) : F.cats.delete(c.i)); }
    else if (t.dataset.c != null) { t.checked ? F.cats.add(+t.dataset.c) : F.cats.delete(+t.dataset.c); }
    else if (t.dataset.nocat) F.noCat = t.checked;
    syncTechMenu(); update();
  });
  m.addEventListener('click', e => { const act = e.target.dataset.act; if (!act) return; if (act === 'all') CATS.forEach(c => F.cats.add(c.i)); else { F.cats.clear(); F.noCat = false; } syncTechMenu(); update(); });
  // country menu
  const mc = $('#menuCountry');
  let hc = '<div class="tools">' + Object.keys(REGIONS).map(r => `<button class="btn" type="button" data-reg="${esc(r)}">${esc(r)}</button>`).join('') + '<button class="btn" type="button" data-reg="Other">Other regions</button><button class="btn" type="button" data-reg="Global">Global</button></div>';
  hc += '<label><input type="checkbox" data-cty="__U"> <span>Unmapped (no country derivable)</span></label>';
  countriesWithApps.forEach(c => { hc += `<label><input type="checkbox" data-cty="${c}"> <span>${esc(ccName(c))} <span class="zh mono">${c}</span></span></label>`; });
  mc.innerHTML = hc;
  mc.addEventListener('change', e => { const c = e.target.dataset.cty; if (!c) return; e.target.checked ? F.countries.add(c) : F.countries.delete(c); syncCountryMenu(); update(); });
  mc.addEventListener('click', e => {
    const r = e.target.dataset.reg; if (!r) return;
    F.countries.clear();
    if (r === 'Other') { const known = new Set(Object.values(REGIONS).flat()); countriesWithApps.forEach(c => { if (!known.has(c)) F.countries.add(c); }); }
    else if (r !== 'Global') REGIONS[r].forEach(c => { if (countriesWithApps.includes(c)) F.countries.add(c); });
    syncCountryMenu(); update();
  });
  // type chips
  $('#typeChips').innerHTML = TYPES.map(t => `<button class="chip" type="button" data-t="${t.k}" aria-pressed="false" ${t.k === 1 ? 'title="Startups: founded 2015 or later, independent, founding year verified in Wikidata (checked for the largest groups only; see Methodology)."' : ''}><span class="sw" style="background:var(${t.tok})"></span>${t.label}</button>`).join('');
  $('#typeChips').addEventListener('click', e => { const b = e.target.closest('button[data-t]'); if (!b || b.disabled) return; const t = +b.dataset.t; F.types.has(t) ? F.types.delete(t) : F.types.add(t); update(); });
  // office & jurisdiction & cpc
  $('#officeChips').innerHTML = [...CHIPS, 'other'].map(o => `<button class="chip" type="button" data-o="${o}" aria-pressed="false" title="${o === 'EP' ? 'European Patent Office (regional)' : o === 'other' ? 'Other national offices: ' + OFFICES.filter(x => !CHIPS.includes(x)).join(', ') : 'National office ' + o}">${o === 'other' ? 'Other national' : o}</button>`).join('');
  $('#officeChips').addEventListener('click', e => { const b = e.target.closest('button[data-o]'); if (!b) return; const o = b.dataset.o; F.offices.has(o) ? F.offices.delete(o) : F.offices.add(o); update(); });
  $('#jurChips').innerHTML = JUR.map(j => `<button class="chip" type="button" data-j="${j.k}" aria-pressed="false" ${FAMJUR ? `title="${j.kind} system"` : 'disabled title="Family look-up not loaded"'}>${j.k}</button>`).join('');
  $('#jurChips').addEventListener('click', e => { const b = e.target.closest('button[data-j]'); if (!b) return; const k = b.dataset.j; F.jur.has(k) ? F.jur.delete(k) : F.jur.add(k); update(); });
  $('#menuCpc').innerHTML = '<div class="note" style="margin-bottom:6px">Publications with at least one CPC or IPC code in the selected subclass(es).</div>' + CPCSUB.map((s, i) => `<label><input type="checkbox" data-cpc="${i}"> <span><span class="mono">${s}</span> · ${esc(CPCDESC[i])}</span></label>`).join('');
  $('#menuCpc').addEventListener('change', e => { const i = e.target.dataset.cpc; if (i == null) return; e.target.checked ? F.cpc.add(+i) : F.cpc.delete(+i); update(); });
  // time
  const fillTime = () => {
    const opts = F.basis === 'pub' ? MONTHS.map((m, i) => [i, m]) : d3.range(minFy, maxFy + 1).map(y => [y, String(y)]);
    $('#timeFrom').innerHTML = opts.map(([v, l]) => `<option value="${v}">${l}</option>`).join('');
    $('#timeTo').innerHTML = $('#timeFrom').innerHTML;
    $('#timeFrom').value = F.from; $('#timeTo').value = F.to;
  };
  fillTime();
  $('#timeBasis').addEventListener('change', e => { F.basis = e.target.value; if (F.basis === 'pub') { F.from = 0; F.to = MONTHS.length - 1; } else { F.from = minFy; F.to = maxFy; } fillTime(); update(); });
  $('#timeFrom').addEventListener('change', e => { F.from = +e.target.value; if (F.from > F.to) { F.to = F.from; $('#timeTo').value = F.to; } update(); });
  $('#timeTo').addEventListener('change', e => { F.to = +e.target.value; if (F.to < F.from) { F.from = F.to; $('#timeFrom').value = F.from; } update(); });
  buildFilters.fillTime = fillTime;
  // activity
  const presets = [['1–10', 1, 10], ['11–50', 11, 50], ['51–100', 51, 100], ['100+', 101, null], ['All', null, null]];
  $('#actPresets').innerHTML = presets.map(([l, a, b]) => `<button class="chip" type="button" data-min="${a ?? ''}" data-max="${b ?? ''}">${l}</button>`).join('');
  $('#actPresets').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; F.min = b.dataset.min === '' ? null : +b.dataset.min; F.max = b.dataset.max === '' ? null : +b.dataset.max; $('#minAct').value = F.min ?? ''; $('#maxAct').value = F.max ?? ''; update(); });
  const onAct = () => { const a = $('#minAct').value, b = $('#maxAct').value; F.min = a === '' ? null : +a; F.max = b === '' ? null : +b; update(); };
  $('#minAct').addEventListener('change', onAct); $('#maxAct').addEventListener('change', onAct);
  segBind('#measureSeg', 'm', v => { F.measure = v; update(); });
  segBind('#attrSeg', 'a', v => { F.attr = v; update(); });
  let st; $('#search').addEventListener('input', e => { clearTimeout(st); st = setTimeout(() => { F.q = e.target.value; update(); }, 220); });
  $('#btnReset').addEventListener('click', () => {
    F = DEFAULT(); $('#timeBasis').value = 'pub'; fillTime(); $('#minAct').value = ''; $('#maxAct').value = ''; $('#search').value = '';
    setSeg('#measureSeg', 'm', 'apps'); setSeg('#attrSeg', 'a', 'full');
    $('#menuCpc').querySelectorAll('input').forEach(i => i.checked = false);
    syncTechMenu(); syncCountryMenu(); update();
  });
  document.addEventListener('click', e => { document.querySelectorAll('details.dd[open]').forEach(dd => { if (!dd.contains(e.target)) dd.open = false; }); });
}
function segBind(sel, attr, fn) { $(sel).addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; setSeg(sel, attr, b.dataset[attr]); fn(b.dataset[attr]); }); }
function setSeg(sel, attr, v) { $(sel).querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset[attr] === v))); }
function syncTechMenu() {
  const m = $('#menuTech');
  m.querySelectorAll('input[data-c]').forEach(i => i.checked = F.cats.has(+i.dataset.c));
  m.querySelectorAll('input[data-g]').forEach(i => { const gi = +i.dataset.g; const cs = CATS.filter(c => c.g === gi); const k = cs.filter(c => F.cats.has(c.i)).length; i.checked = k === cs.length; i.indeterminate = k > 0 && k < cs.length; });
  m.querySelector('input[data-nocat]').checked = F.noCat;
  const n = F.cats.size; const gs = GROUPS.filter(g => CATS.filter(c => c.g === g.i).every(c => F.cats.has(c.i)));
  $('#sumTech').textContent = (!n && !F.noCat) ? 'All technologies' : (gs.length && gs.length * 1 === GROUPS.filter(g => CATS.some(c => c.g === g.i && F.cats.has(c.i))).length && !F.noCat ? (gs.length === 1 ? gs[0].label : gs.length + ' groups') : (n + (F.noCat ? 1 : 0)) + ' selected');
}
function syncCountryMenu() {
  $('#menuCountry').querySelectorAll('input[data-cty]').forEach(i => i.checked = F.countries.has(i.dataset.cty));
  const n = F.countries.size;
  $('#sumCountry').textContent = !n ? 'Global' : n === 1 ? ([...F.countries][0] === '__U' ? 'Unmapped' : ccName([...F.countries][0])) : n + ' countries';
}
function syncChips() {
  $('#typeChips').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(F.types.has(+b.dataset.t))));
  $('#officeChips').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(F.offices.has(b.dataset.o))));
  $('#jurChips').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(F.jur.has(b.dataset.j))));
  const c = F.cpc.size; $('#sumCpc').textContent = c ? c + ' subclass' + (c > 1 ? 'es' : '') : 'Any subclass';
  // live counts in technology menu (current doc set before tech filter is not tracked; show counts in filtered set)
  $('#menuTech').querySelectorAll('[data-gc]').forEach(s => s.textContent = fmt(R.grp[+s.dataset.gc]));
  const parts = [];
  if (F.cats.size || F.noCat) parts.push($('#sumTech').textContent);
  if (F.countries.size) parts.push($('#sumCountry').textContent);
  if (F.types.size) parts.push([...F.types].map(t => TYPES[t].label).join(' / '));
  if (F.basis === 'pub' && (F.from > 0 || F.to < MONTHS.length - 1)) parts.push(`published ${MONTHS[F.from]} – ${MONTHS[F.to]}`);
  if (F.basis === 'fil') parts.push(`filed ${F.from}–${F.to}`);
  if (F.offices.size) parts.push('at ' + [...F.offices].join(', '));
  if (F.jur.size) parts.push('family also at ' + [...F.jur].join(' or '));
  if (F.cpc.size) parts.push([...F.cpc].map(i => CPCSUB[i]).join(' or '));
  if (F.min != null || F.max != null) parts.push(`${F.measure === 'fams' ? 'families' : 'applications'} per applicant ${F.min ?? 1}–${F.max ?? '∞'}`);
  if (F.q) parts.push(`name contains “${F.q}”`);
  if (F.attr === 'frac') parts.push('fractional attribution');
  $('#activeSummary').textContent = parts.length ? 'Active filters: ' + parts.join(' · ') : `No filters: all ${fmt(N)} applications in the study.`;
}

// ------------------------------------------------------------------ KPIs
function renderKPIs() {
  let inst = 0, ind = 0; for (let t = 0; t < 6; t++) (t === 4 ? (ind += R.typeApps[t]) : (inst += R.typeApps[t]));
  const ctys = [...R.ctyApps.keys()].filter(c => c !== '__U').length;
  let gi = 0; for (let g = 1; g < GROUPS.length; g++) if (R.grp[g] > R.grp[gi]) gi = g;
  const items = [
    ['Patent applications', fmt(R.docs), `EP ${fmt(R.byOff[0])} · national ${fmt(R.byOff[1])}`],
    ['Distinct families', fmt(R.fams), 'by DOCDB family ID'],
    ['Institutional applicants', fmt(inst), 'companies, universities, institutes, other'],
    ['Private inventors', fmt(ind), `${fmt(R.indivAny)} applications`],
    ['Applicant countries', fmt(ctys), R.ctyApps.has('__U') ? `+ ${fmt(R.ctyApps.get('__U').reduce((s, v) => s + v, 0))} unmapped applicants` : 'all applicants mapped'],
    ['Most active technology', R.docs ? GROUPS[gi].label : '–', R.docs ? `${fmt(R.grp[gi])} applications (${pct(R.grp[gi] / R.docs)})` : ''],
  ];
  $('#kpis').innerHTML = items.map(([k, v, s]) => `<div class="kpi"><div class="k">${k}</div><div class="v" title="${esc(v)}">${v}</div><div class="s" title="${esc(s)}">${s}</div></div>`).join('');
}

// ------------------------------------------------------------------ map (MapLibre GL JS)
// Basemap: OpenFreeMap "positron" vector tiles (OpenStreetMap data, no API key). If that style cannot be reached
// (offline, blocked host), a basemap built from Natural Earth 1:10m data shipped with the site is used instead.
const ONLINE_STYLE = 'https://tiles.openfreemap.org/styles/positron';
const MAXZ = 17;
const GLYPHS = BASE + 'assets/fonts/{fontstack}/{range}' + (window.GLYPH_EXT || '.pbf');
const EMPTY = { type: 'FeatureCollection', features: [] };
let legendCollapsed = matchMedia('(max-width: 700px)').matches;
let map = null, mapReady = false, basemapKind = 'offline', showApprox = true;
let hoverIso = null;
const COUNTRY_ISO = COUNTRIES_GJ.features.map(f => f.properties.iso);
const clabels = { type: 'FeatureCollection', features: Object.entries(D.countries).filter(([, c]) => c.label).map(([iso, c]) => ({ type: 'Feature', properties: { n: c.n }, geometry: { type: 'Point', coordinates: [c.label[1], c.label[0]] } })) };

function typeExpr() { return ['match', ['get', 't'], 0, typeColor(0), 1, typeColor(1), 2, typeColor(2), 3, typeColor(3), 4, typeColor(4), typeColor(5)]; }
function overlaySources() {
  const cp = {}; for (let t = 0; t < 6; t++) cp['t' + t] = ['+', ['case', ['==', ['get', 't'], t], 1, 0]];
  cp.v = ['+', ['get', 'v']];
  return {
    countries: { type: 'geojson', data: COUNTRIES_GJ, promoteId: 'iso' },
    apps: { type: 'geojson', data: EMPTY, cluster: true, clusterMaxZoom: MAXZ, clusterRadius: 44, clusterProperties: cp, maxzoom: MAXZ + 1 },
  };
}
function overlayLayersBelow() {
  return [
    { id: 'countries-fill', type: 'fill', source: 'countries', paint: {
      'fill-color': ['case', ['boolean', ['feature-state', 'nd'], false], css('--nodata'),
        ['!=', ['feature-state', 'v'], null], ['interpolate', ['linear'], ['to-number', ['feature-state', 'v'], 0], 0, css('--ch-lo'), 1, css('--ch-hi')], 'rgba(0,0,0,0)'],
      'fill-opacity': ['interpolate', ['linear'], ['zoom'], 3, basemapKind === 'online' ? 0.45 : 0.7, 7, 0.12] } },
    { id: 'countries-line', type: 'line', source: 'countries', paint: {
      'line-color': ['case', ['boolean', ['feature-state', 'sel'], false], css('--accent'), css('--ink-2')],
      'line-width': ['case', ['boolean', ['feature-state', 'sel'], false], 2.2, ['boolean', ['feature-state', 'hover'], false], 1.4, 0],
      'line-opacity': 0.9 } },
  ];
}
function overlayLayersTop() {
  return [
    { id: 'apps-pt', type: 'circle', source: 'apps', filter: ['!', ['has', 'point_count']], paint: {
      'circle-color': typeExpr(),
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, ['min', 14, ['+', 2.5, ['*', 0.28, ['sqrt', ['get', 'v']]]]], 9, ['min', 30, ['+', 4, ['*', 0.55, ['sqrt', ['get', 'v']]]]]],
      'circle-stroke-color': css('--panel'), 'circle-stroke-width': 1.2,
      'circle-opacity': ['case', ['==', ['get', 'p'], 'E'], 0.95, 0.85] } },
    { id: 'apps-sel', type: 'circle', source: 'apps', filter: ['==', ['get', 'a'], -1], paint: {
      'circle-color': 'rgba(0,0,0,0)', 'circle-stroke-color': css('--ink'), 'circle-stroke-width': 3,
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, ['min', 17, ['+', 5.5, ['*', 0.28, ['sqrt', ['get', 'v']]]]], 9, ['min', 33, ['+', 7, ['*', 0.55, ['sqrt', ['get', 'v']]]]]] } },
  ];
}
function offlineStyle() {
  return { version: 8, glyphs: GLYPHS, name: 'Natural Earth offline',
    sources: { base: { type: 'geojson', data: COUNTRIES_GJ }, admin1: { type: 'geojson', data: EMPTY }, cities: { type: 'geojson', data: EMPTY }, clabels: { type: 'geojson', data: clabels } },
    layers: [
      { id: 'bg', type: 'background', paint: { 'background-color': css('--sea') } },
      { id: 'land', type: 'fill', source: 'base', paint: { 'fill-color': css('--land') } },
      { id: 'admin1', type: 'line', source: 'admin1', minzoom: 3, paint: { 'line-color': css('--land-line'), 'line-width': ['interpolate', ['linear'], ['zoom'], 3, 0.4, 10, 1], 'line-dasharray': [3, 2] } },
      { id: 'borders', type: 'line', source: 'base', paint: { 'line-color': css('--border'), 'line-width': ['interpolate', ['linear'], ['zoom'], 1, 0.5, 6, 1.1, 12, 2] } },
      { id: 'city-dot', type: 'circle', source: 'cities', minzoom: 3, filter: ['<=', ['get', 'r'], 4], paint: { 'circle-radius': 2.2, 'circle-color': css('--ink-3') } },
      { id: 'city-dot2', type: 'circle', source: 'cities', minzoom: 5.5, filter: ['>', ['get', 'r'], 4], paint: { 'circle-radius': 1.8, 'circle-color': css('--ink-3') } },
      { id: 'country-label', type: 'symbol', source: 'clabels', minzoom: 1.5, maxzoom: 5.5, layout: { 'text-field': ['get', 'n'], 'text-font': ['NotoSans-Bold'], 'text-size': 11, 'text-transform': 'uppercase', 'text-letter-spacing': 0.08, 'text-max-width': 8 }, paint: { 'text-color': css('--ink-3'), 'text-halo-color': css('--land'), 'text-halo-width': 1.2 } },
      { id: 'city-label', type: 'symbol', source: 'cities', minzoom: 3, filter: ['<=', ['get', 'r'], 4], layout: { 'text-field': ['get', 'n'], 'text-font': ['NotoSans-Regular'], 'text-size': 11, 'text-offset': [0, 0.7], 'text-anchor': 'top', 'text-optional': true }, paint: { 'text-color': css('--ink-2'), 'text-halo-color': css('--land'), 'text-halo-width': 1.2 } },
      { id: 'city-label2', type: 'symbol', source: 'cities', minzoom: 5.5, filter: ['>', ['get', 'r'], 4], layout: { 'text-field': ['get', 'n'], 'text-font': ['NotoSans-Regular'], 'text-size': 10.5, 'text-offset': [0, 0.7], 'text-anchor': 'top', 'text-optional': true }, paint: { 'text-color': css('--ink-2'), 'text-halo-color': css('--land'), 'text-halo-width': 1.2 } },
    ] };
}
function assemble(style) {
  Object.assign(style.sources, overlaySources());
  let at = style.layers.findIndex(l => l.type === 'symbol' || l.id === 'admin1');
  if (at < 0) at = style.layers.length;
  style.layers.splice(at, 0, ...overlayLayersBelow());
  style.layers.push(...overlayLayersTop());
  return style;
}
async function pickStyle() {
  try {
    const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 4500);
    const r = await fetch(ONLINE_STYLE, { signal: ctl.signal }); clearTimeout(tm);
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const st = await r.json(); if (!Array.isArray(st.layers)) throw new Error('bad style');
    basemapKind = 'online'; return st;
  } catch (e) { basemapKind = 'offline'; return offlineStyle(); }
}
let offlineLoaded = false;
async function loadOfflineLayers() {
  if (offlineLoaded || basemapKind !== 'offline') return; offlineLoaded = true;
  try {
    const [adm, cit] = await Promise.all([getJSON('data/basemap/admin1_lines.geojson'), getJSON('data/basemap/cities.geojson')]);
    map.getSource('admin1') && map.getSource('admin1').setData(adm);
    map.getSource('cities') && map.getSource('cities').setData(cit);
  } catch (e) { /* the basemap still shows countries and borders */ }
}
async function initMap() {
  const style = assemble(await pickStyle());
  map = new maplibregl.Map({ container: 'map', style, center: [15, 38], zoom: 1.4, minZoom: 0.8, maxZoom: MAXZ, attributionControl: false, dragRotate: false, pitchWithRotate: false, touchPitch: false });
  map.touchZoomRotate.disableRotation();
  map.addControl(new maplibregl.AttributionControl({ compact: true, customAttribution: basemapKind === 'online'
    ? '<a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a> © <a href="https://www.openmaptiles.org/" target="_blank" rel="noopener">OpenMapTiles</a> Data from <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
    : 'Basemap: <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a> 1:10m (public domain)' }), 'bottom-right');
  map.addControl(new maplibregl.ScaleControl({ maxWidth: 110 }), 'bottom-right');
  let tileErrors = 0;
  map.on('error', e => { if (basemapKind === 'online' && e && e.sourceId && e.sourceId !== 'apps' && e.sourceId !== 'countries') { tileErrors++; if (tileErrors === 8 && !map.areTilesLoaded()) switchOffline(); } });
  await new Promise(res => map.once('load', res));
  mapReady = true;
  wireMap();
  loadOfflineLayers();
}
function switchOffline() {
  basemapKind = 'offline'; mapReady = false;
  map.setStyle(assemble(offlineStyle()));
  map.once('style.load', () => { mapReady = true; offlineLoaded = false; loadOfflineLayers(); paintCountries(); drawOverlay(); renderLegend(); });
}
function themeMap() {
  if (!mapReady) return;
  if (basemapKind === 'offline') {
    map.setPaintProperty('bg', 'background-color', css('--sea'));
    map.setPaintProperty('land', 'fill-color', css('--land'));
    map.setPaintProperty('borders', 'line-color', css('--border'));
    map.setPaintProperty('admin1', 'line-color', css('--land-line'));
    ['city-label', 'city-label2', 'country-label'].forEach(id => map.setPaintProperty(id, 'text-halo-color', css('--land')));
  }
  map.setPaintProperty('countries-fill', 'fill-color', overlayLayersBelow()[0].paint['fill-color']);
  map.setPaintProperty('countries-line', 'line-color', overlayLayersBelow()[1].paint['line-color']);
  map.setPaintProperty('apps-pt', 'circle-color', typeExpr());
  map.setPaintProperty('apps-pt', 'circle-stroke-color', css('--panel'));
  map.setPaintProperty('apps-sel', 'circle-stroke-color', css('--ink'));
  clusterCache.clear(); clearClusterMarkers(); refreshClusters(); updateApprox();
}

// ---- choropleth (country layer, all modes)
function paintCountries() {
  let vals = new Map(), maxv = 0, label = '';
  if (mode === 'A') { for (const [c, v] of R.ctyDocs) if (c !== '__U') { vals.set(c, v); maxv = Math.max(maxv, v); } label = 'applications with an applicant from the country'; }
  if (mode === 'B') { invCodes.forEach((c, i) => { if (R.inv[i]) { vals.set(c, R.inv[i]); maxv = Math.max(maxv, R.inv[i]); } }); label = 'applications naming ≥1 inventor from the country'; }
  if (mode === 'C') { JUR.forEach((j, i) => { if (j.kind === 'national' && R.jur[i]) { vals.set(j.k, R.jur[i]); maxv = Math.max(maxv, R.jur[i]); } }); label = 'applications whose family has a member filed there'; }
  const lmax = Math.log(Math.max(2, maxv));
  paintCountries.scale = { maxv, label };
  if (!mapReady) return;
  for (const iso of COUNTRY_ISO) {
    const v = vals.get(iso);
    map.setFeatureState({ source: 'countries', id: iso }, {
      v: v ? Math.max(0.04, Math.log(v) / lmax) : null,
      nd: (mode === 'C' && !JUR.some(j => j.k === iso)),
      sel: iso === selCountry, hover: iso === hoverIso });
  }
}

// ---- applicant points, clusters, spiderfy
const clusterCache = new Map(); let clustersShown = new Map();
let pointsVersion = 0;
function appFeatures() {
  const fs = [];
  for (const a of R.ranked) {
    const ss = SITES_OF.get(a);
    if (ss) { for (const s of ss) { const v = R.sval(s); if (v > 0) fs.push({ type: 'Feature', properties: { a, s, t: A.typ[a], v, p: SITES[s][3] }, geometry: { type: 'Point', coordinates: [SITES[s][2], SITES[s][1]] } }); } }
    else if (hasPoint(a)) fs.push({ type: 'Feature', properties: { a, s: -1, t: A.typ[a], v: R.val(a), p: LO.p[a] }, geometry: { type: 'Point', coordinates: [LO.lng[a], LO.lat[a]] } });
  }
  return { type: 'FeatureCollection', features: fs };
}
function drawOverlay() {
  if (!mapReady) return;
  const on = mode === 'A';
  map.getSource('apps').setData(on ? appFeatures() : EMPTY);
  pointsVersion++; clusterCache.clear(); clearClusterMarkers(); clearSpider();
  map.setLayoutProperty('apps-pt', 'visibility', on ? 'visible' : 'none');
  map.setLayoutProperty('apps-sel', 'visibility', on ? 'visible' : 'none');
  updateApprox(); updateSelection();
  map.once('idle', refreshClusters);
}
function clearClusterMarkers() { for (const m of clustersShown.values()) m.remove(); clustersShown = new Map(); }
function donutSVG(counts, r, label) {
  const tot = counts.reduce((s, v) => s + v, 0) || 1; let a0 = -Math.PI / 2; let segs = '';
  counts.forEach((v, t) => {
    if (!v) return; const a1 = a0 + 2 * Math.PI * v / tot;
    if (v === tot) { segs += `<circle cx="${r}" cy="${r}" r="${r - 3}" fill="none" stroke="${typeColor(t)}" stroke-width="5"/>`; return; }
    const large = a1 - a0 > Math.PI ? 1 : 0, rr = r - 3;
    segs += `<path d="M${r + rr * Math.cos(a0)},${r + rr * Math.sin(a0)} A${rr},${rr} 0 ${large} 1 ${r + rr * Math.cos(a1)},${r + rr * Math.sin(a1)}" fill="none" stroke="${typeColor(t)}" stroke-width="5"/>`;
    a0 = a1;
  });
  return `<svg width="${2 * r}" height="${2 * r}" viewBox="0 0 ${2 * r} ${2 * r}" aria-hidden="true"><circle cx="${r}" cy="${r}" r="${r - 1}" class="cl-bg"/>${segs}<text x="${r}" y="${r}" class="cl-t">${label}</text></svg>`;
}
function clusterEl(p, coords) {
  const counts = [0, 1, 2, 3, 4, 5].map(t => p['t' + t] || 0);
  const n = p.point_count, r = Math.round(Math.min(34, 13 + 2.6 * Math.sqrt(n)));
  const el = document.createElement('button'); el.type = 'button'; el.className = 'cl';
  el.setAttribute('aria-label', `${n} applicants here; activate to expand`);
  el.innerHTML = donutSVG(counts, r, n >= 1000 ? d3.format('.2s')(n) : n);
  const id = p.cluster_id, ver = pointsVersion;
  el.addEventListener('mouseenter', async e => { showTip(e, clusterTip(p, null)); try { const lv = await map.getSource('apps').getClusterLeaves(id, 10000, 0); if (ver !== pointsVersion) return; showTip(e, clusterTip(p, lv)); } catch (er) { } });
  el.addEventListener('mousemove', e => moveTip(e));
  el.addEventListener('mouseleave', hideTip);
  el.addEventListener('click', e => { e.stopPropagation(); hideTip(); onClusterClick(id, coords); });
  return el;
}
function refreshClusters() {
  if (!mapReady || mode !== 'A') { clearClusterMarkers(); return; }
  const next = new Map();
  for (const f of map.querySourceFeatures('apps')) {
    const p = f.properties; if (!p.cluster) continue;
    const id = p.cluster_id; if (next.has(id)) continue;
    let m = clusterCache.get(id);
    if (!m) { const c = f.geometry.coordinates; m = new maplibregl.Marker({ element: clusterEl(p, c) }).setLngLat(c); clusterCache.set(id, m); }
    next.set(id, m); if (!clustersShown.has(id)) m.addTo(map);
  }
  for (const [id, m] of clustersShown) if (!next.has(id)) m.remove();
  clustersShown = next;
}
async function sameSpot(id) {
  const lv = await map.getSource('apps').getClusterLeaves(id, 100000, 0);
  const c0 = lv[0].geometry.coordinates;
  return lv.every(f => Math.abs(f.geometry.coordinates[0] - c0[0]) < 1e-6 && Math.abs(f.geometry.coordinates[1] - c0[1]) < 1e-6);
}
async function onClusterClick(id, coords) {
  const src = map.getSource('apps');
  if (await sameSpot(id)) { if (map.getZoom() < 9) map.easeTo({ center: coords, zoom: 9, duration: reduceMotion() ? 0 : 600 }); spiderfy(id, coords, null, true); return; }
  let z = MAXZ + 1; try { z = await src.getClusterExpansionZoom(id); } catch (e) { }
  if (z <= MAXZ && z > map.getZoom() + 0.05) map.easeTo({ center: coords, zoom: z + 0.2, duration: reduceMotion() ? 0 : 600 });
  else spiderfy(id, coords, null);
}
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
let spider = null;
function clearSpider() { if (spider) { spider.marker.remove(); const m = clusterCache.get(spider.id); if (m) m.getElement().classList.remove('cl-dim'); spider = null; } }
const SPMAX = 60;
async function spiderfy(id, coords, hi, keep) {
  clearSpider();
  { const m = clusterCache.get(id); if (m) m.getElement().classList.add('cl-dim'); }
  let leaves = await map.getSource('apps').getClusterLeaves(id, 100000, 0);
  leaves = leaves.map(f => f.properties).sort((x, y) => y.v - x.v);
  let shown = leaves.slice(0, SPMAX);
  if (hi != null && !shown.some(l => l.a === hi)) { const h = leaves.find(l => l.a === hi); if (h) shown = [h, ...shown.slice(0, SPMAX - 1)]; }
  const rest = leaves.length - shown.length;
  const items = shown.map(l => ({ ...l, r: Math.min(15, 4 + 0.5 * Math.sqrt(l.v)) }));
  if (rest > 0) items.push({ more: rest, r: 13 });
  // Leaflet.markercluster-style spiral / circle layout, in screen pixels around the shared coordinate
  const pos = []; const n = items.length;
  if (n <= 10) { const R0 = Math.max(34, 14 * n / Math.PI); items.forEach((it, i) => { const ang = 2 * Math.PI * i / n - Math.PI / 2; pos.push([R0 * Math.cos(ang), R0 * Math.sin(ang)]); }); }
  else { let leg = 24, ang = 0; items.forEach((it, i) => { ang += 30 / leg + i * 0.0005; pos.push([leg * Math.cos(ang), leg * Math.sin(ang)]); leg += 2 * Math.PI * 4.2 / ang; }); }
  const ext = Math.ceil(Math.max(...pos.map(p => Math.hypot(p[0], p[1]))) + 20);
  const el = document.createElement('div'); el.className = 'spider';
  let svg = `<svg width="${2 * ext}" height="${2 * ext}" style="left:${-ext}px;top:${-ext}px" aria-hidden="true">`;
  pos.forEach(p => svg += `<line x1="${ext}" y1="${ext}" x2="${ext + p[0]}" y2="${ext + p[1]}"/>`);
  svg += `<circle cx="${ext}" cy="${ext}" r="4" class="hub"/></svg>`;
  el.innerHTML = svg;
  items.forEach((it, i) => {
    const b = document.createElement('button'); b.type = 'button';
    b.style.left = (pos[i][0] - it.r) + 'px'; b.style.top = (pos[i][1] - it.r) + 'px'; b.style.width = b.style.height = (2 * it.r) + 'px';
    if (it.more) {
      b.className = 'sp-more'; b.textContent = '+' + d3.format('.2~s')(it.more);
      b.setAttribute('aria-label', `${it.more} more applicants at this location`);
      b.onclick = e => { e.stopPropagation(); openPlace({ title: placeTitle(leaves.map(l => l.a)), apps: leaves.map(l => l.a), note: 'All applicants sharing this coordinate (city-level locations are drawn at the city centre).' }); };
    } else {
      b.className = 'sp-dot' + (it.a === hi || it.a === selected ? ' on' : ''); b.style.background = typeColor(it.t);
      b.setAttribute('aria-label', A.name[it.a]);
      b.onmouseenter = e => showTip(e, appTip(it.a, it.s)); b.onmousemove = moveTip; b.onmouseleave = hideTip;
      b.onclick = e => { e.stopPropagation(); hideTip(); openApplicant(it.a, false, true); };
    }
    el.appendChild(b);
  });
  const cap = document.createElement('div'); cap.className = 'sp-cap';
  cap.textContent = `${fmt(leaves.length)} applicants at ${placeTitle(leaves.map(l => l.a))}`; cap.style.top = (ext - 6) + 'px';
  el.appendChild(cap);
  spider = { id, keep: !!keep, marker: new maplibregl.Marker({ element: el, anchor: 'center' }).setLngLat(coords).addTo(map), apps: leaves.map(l => l.a) };
  if (hi != null) { const k = items.findIndex(it => it.a === hi); if (k >= 0) setPulse(coords, pos[k]); }
}
function placeTitle(apps) {
  const cities = new Set(apps.map(a => LO.city[a] || '').filter(Boolean));
  const a0 = apps[0];
  if (cities.size === 1) return [...cities][0] + ', ' + ccName(A.cc[a0]);
  return 'this location';
}

// ---- approximate groups (province- or country-level only; not drawn as individual markers)
let approxMarkers = [];
function updateApprox() {
  approxMarkers.forEach(m => m.remove()); approxMarkers = [];
  if (!mapReady || mode !== 'A' || !showApprox) return;
  const groups = new Map();
  for (const a of R.ranked) {
    if (hasPoint(a)) continue;
    let key, pt, label, cc = A.cc[a];
    if (LO.p[a] === 'R' && D.regions[LO.rkey[a]]) { const g = D.regions[LO.rkey[a]]; key = 'R:' + LO.rkey[a]; pt = g.pt; label = g.n + ' (province level)'; }
    else if (cc && D.countries[cc] && D.countries[cc].label) { key = 'K:' + cc; pt = D.countries[cc].label; label = ccName(cc) + ' (country level)'; }
    else continue;
    let g = groups.get(key); if (!g) groups.set(key, g = { key, pt, label, cc, apps: [], types: [0, 0, 0, 0, 0, 0] });
    g.apps.push(a); g.types[A.typ[a]]++;
  }
  for (const g of groups.values()) {
    const el = document.createElement('button'); el.type = 'button'; el.className = 'ax' + (g.key[0] === 'R' ? ' ax-r' : '');
    const n = g.apps.length; const sz = Math.round(Math.min(40, 18 + 2.2 * Math.sqrt(n)));
    el.style.width = el.style.height = sz + 'px';
    el.innerHTML = `<span>${n >= 1000 ? d3.format('.2s')(n) : n}</span>`;
    el.setAttribute('aria-label', `${n} applicants located only at ${g.label}`);
    el.onmouseenter = e => showTip(e, `<h4>${esc(g.label)}</h4><div>${fmt(n)} applicants whose location could not be verified below this level${g.types[4] ? `, including ${fmt(g.types[4])} private inventors` : ''}.</div><div class="faint" style="margin-top:4px">Placed at a label point for the area, not at an address. Click to list them.</div>`);
    el.onmousemove = moveTip; el.onmouseleave = hideTip;
    el.onclick = e => { e.stopPropagation(); hideTip(); openPlace({ title: g.label, apps: g.apps, note: 'Applicants located only to this ' + (g.key[0] === 'R' ? 'province' : 'country') + '. They are included in all statistics.' }); };
    approxMarkers.push(new maplibregl.Marker({ element: el }).setLngLat([g.pt[1], g.pt[0]]).addTo(map));
  }
}

// ---- selection highlight
let pulseMarker = null;
function setPulse(lnglat, off) {
  if (pulseMarker) pulseMarker.remove();
  const el = document.createElement('div'); el.className = 'pulse-wrap'; el.innerHTML = '<span class="pulse"></span><span class="pulse p2"></span>';
  pulseMarker = new maplibregl.Marker({ element: el, offset: off || [0, 0] }).setLngLat(lnglat).addTo(map);
}
function updateSelection() {
  if (!mapReady) return;
  map.setFilter('apps-sel', ['==', ['get', 'a'], selected == null ? -1 : selected]);
  if (selected == null || mode !== 'A' || !hasPoint(selected) || !R.passA[selected]) { if (pulseMarker) { pulseMarker.remove(); pulseMarker = null; } return; }
  if (!spider || !spider.apps.includes(selected)) setPulse([LO.lng[selected], LO.lat[selected]]);
}
async function focusApplicant(a) {
  if (!mapReady || mode !== 'A' || !hasPoint(a)) return;
  const ll = [LO.lng[a], LO.lat[a]];
  const target = Math.max(map.getZoom(), LO.p[a] === 'E' ? 12 : 10);
  clearSpider();
  map.flyTo({ center: ll, zoom: target, duration: reduceMotion() ? 0 : 1100, essential: true });
  await new Promise(r => map.once('idle', r));
  for (let step = 0; step < 4; step++) {
    const pt = map.project(ll);
    const hit = map.queryRenderedFeatures(pt, { layers: ['apps-pt'] }).some(f => f.properties.a === a);
    if (hit) { updateSelection(); return; }
    let found = null;
    for (const f of map.querySourceFeatures('apps')) {
      if (!f.properties.cluster) continue;
      const c = map.project(f.geometry.coordinates); if (Math.hypot(c.x - pt.x, c.y - pt.y) > 80) continue;
      const lv = await map.getSource('apps').getClusterLeaves(f.properties.cluster_id, 100000, 0);
      if (lv.some(l => l.properties.a === a)) { found = f; break; }
    }
    if (!found) { updateSelection(); return; }
    if (await sameSpot(found.properties.cluster_id)) { await spiderfy(found.properties.cluster_id, found.geometry.coordinates, a, true); return; }
    let z = MAXZ + 1; try { z = await map.getSource('apps').getClusterExpansionZoom(found.properties.cluster_id); } catch (e) { }
    if (z > MAXZ || map.getZoom() >= MAXZ - 0.05) { await spiderfy(found.properties.cluster_id, found.geometry.coordinates, a); return; }
    map.easeTo({ center: ll, zoom: Math.min(MAXZ, z + 0.2), duration: reduceMotion() ? 0 : 500 });
    await new Promise(r => map.once('idle', r));
  }
}

// ---- interaction wiring
function wireMap() {
  map.on('render', () => { if (map.isSourceLoaded('apps')) refreshClusters(); });
  map.on('zoomstart', e => { if (spider && !spider.keep) clearSpider(); else if (spider && e.originalEvent) clearSpider(); });
  map.on('mousemove', e => {
    const fa = mode === 'A' ? map.queryRenderedFeatures(e.point, { layers: ['apps-pt'] }) : [];
    if (fa.length) { map.getCanvas().style.cursor = 'pointer'; setHover(null); showTip(e.originalEvent, appTip(fa[0].properties.a, fa[0].properties.s)); return; }
    const fc = map.queryRenderedFeatures(e.point, { layers: ['countries-fill'] });
    if (fc.length) { map.getCanvas().style.cursor = 'pointer'; setHover(fc[0].properties.iso); showTip(e.originalEvent, countryTip(fc[0].properties.iso)); }
    else { map.getCanvas().style.cursor = ''; setHover(null); hideTip(); }
  });
  map.on('mouseout', () => { setHover(null); hideTip(); });
  map.on('click', e => {
    const fa = mode === 'A' ? map.queryRenderedFeatures(e.point, { layers: ['apps-pt'] }) : [];
    if (fa.length) { hideTip(); openApplicant(fa[0].properties.a, false, true); return; }
    clearSpider();
    const fc = map.queryRenderedFeatures(e.point, { layers: ['countries-fill'] });
    if (fc.length) openCountry(fc[0].properties.iso, true);
  });
}
function setHover(iso) {
  if (iso === hoverIso || !mapReady) return;
  if (hoverIso) map.setFeatureState({ source: 'countries', id: hoverIso }, { hover: false });
  hoverIso = iso;
  if (iso) map.setFeatureState({ source: 'countries', id: iso }, { hover: true });
}
function zoomToCountry(cc) {
  const c = D.countries[cc]; if (!mapReady || !c) return;
  map.fitBounds([[c.bbox[0], c.bbox[1]], [c.bbox[2], c.bbox[3]]], { padding: 36, maxZoom: 7, duration: reduceMotion() ? 0 : 900 });
}
$('#zin').onclick = () => map && map.zoomIn();
$('#zout').onclick = () => map && map.zoomOut();
$('#zreset').onclick = () => { clearSpider(); map && map.flyTo({ center: [15, 38], zoom: 1.4, duration: reduceMotion() ? 0 : 800 }); };

function renderLegend() {
  const s = paintCountries.scale || {};
  let h = '';
  if (mode === 'A') {
    h += '<div class="row">' + TYPES.map(t => `<span class="it"><span class="sw" style="background:var(${t.tok})"></span>${t.label}</span>`).join('') + '</div>';
    h += `<div class="row"><span class="it"><span class="sw lg-cl"></span>cluster: count of applicants, ring = type mix</span></div>`;
    h += `<div class="row"><label class="it"><input type="checkbox" id="axToggle" ${showApprox ? 'checked' : ''}> <span class="sw lg-ax"></span>province- or country-level only (not an address)</label></div>`;
    h += '<div class="faint lg-note">Dot size = applications in the current filter. Dots sit at the verified site or city centre; a group whose filing entities are in different places has one dot per place; identical coordinates fan out on click.</div>';
  }
  if (s.maxv) h += `<div class="row"><span class="faint">Shading: ${esc(s.label)}</span></div><div class="row"><span class="mono">1</span><span class="ramp" style="background:linear-gradient(90deg, ${css('--ch-lo')}, ${css('--ch-hi')})"></span><span class="mono">${fmt(s.maxv)}</span></div>`;
  if (mode === 'C') h += `<div class="row faint"><span class="sw" style="background:${css('--nodata')};border-radius:2px;display:inline-block;width:10px;height:10px"></span>&nbsp;office not covered by the family look-up</div>`;
  h += `<div class="faint lg-base">Basemap: ${basemapKind === 'online' ? 'OpenStreetMap (OpenFreeMap vector tiles)' : 'Natural Earth 1:10m (offline fallback)'}</div>`;
  $('#legend').innerHTML = `<button type="button" class="lg-toggle" id="lgToggle" aria-expanded="${!legendCollapsed}">${legendCollapsed ? 'Legend ▸' : 'Legend ▾'}</button><div class="lg-body" ${legendCollapsed ? 'hidden' : ''}>${h}</div>`;
  $('#lgToggle').onclick = () => { legendCollapsed = !legendCollapsed; renderLegend(); };
  const t = $('#axToggle'); if (t) t.onchange = () => { showApprox = t.checked; updateApprox(); };
}
function renderModeExtras() {
  const notes = {
    A: '<b>Applicant location.</b> Each filing entity is drawn at its verified headquarters site or city (Wikidata headquarters, USPTO applicant addresses or manual checks; see Methodology), so a group such as Infineon appears in Neubiberg, Villach and Dresden. Applicants known only to province or country level are grouped in dashed circles; private inventors are never placed below country level.',
    B: '<b>Inventor location.</b> Countries named in the inventor records (Google Patents harmonised inventor data, country only). Inventors are not applicants: this shows where the research was done, at country level only.',
    C: '<b>Filing jurisdiction.</b> Where protection is sought: share of filtered applications whose patent family also has a member at each office. National offices (US, JP, KR, CN, TW) are shaded; the regional EP route and the international PCT (WO) route are shown separately and say nothing about where an invention was made. European national offices were not part of the family look-up.',
  };
  $('#modeNote').innerHTML = notes[mode];
  const ban = $('#banner');
  if (mode === 'B' && R.docs > R.invDocs) { ban.hidden = false; ban.textContent = `Inventor view uses ${fmt(R.invDocs)} applications with inventor countries; ${fmt(R.docs - R.invDocs)} filtered applications carry none and are not shown.`; }
  else if (mode === 'C' && !FAMJUR) { ban.hidden = false; ban.textContent = 'The family look-up (offices where the same family has members) is not loaded in this build.'; }
  else ban.hidden = true;
  const jb = $('#juris');
  if (mode === 'C') {
    jb.hidden = false;
    const row = i => `<div class="j"><span><span class="mono">${JUR[i].k}</span> <span class="faint">${JUR[i].kind}</span></span><span class="mono">${fmt(R.jur[i])} · ${R.docs ? pct(R.jur[i] / R.docs) : '–'}</span></div>`;
    jb.innerHTML = `<div class="tag">Regional &amp; international routes</div>${row(0)}${row(4)}<div class="tag" style="margin-top:4px">National offices</div>${[5, 6, 1, 2, 3].map(row).join('')}`;
  } else jb.hidden = true;
}
function sizeMap() { if (map) map.resize(); }

// ------------------------------------------------------------------ tooltips
const tip = $('#tip');
function showTip(e, html) { tip.innerHTML = html; tip.hidden = false; const pad = 14; let x = e.clientX + pad, y = e.clientY + pad; const r = tip.getBoundingClientRect(); if (x + r.width > innerWidth - 8) x = e.clientX - r.width - pad; if (y + r.height > innerHeight - 8) y = e.clientY - r.height - pad; tip.style.left = x + 'px'; tip.style.top = y + 'px'; }
function hideTip() { tip.hidden = true; }
function topGroupsOf(det, n = 3) { return d3.range(GROUPS.length).filter(g => det.g[g]).sort((x, y) => det.g[y] - det.g[x]).slice(0, n); }
function moveTip(e) { if (tip.hidden) return; const pad = 14; let x = e.clientX + pad, y = e.clientY + pad; const r = tip.getBoundingClientRect(); if (x + r.width > innerWidth - 8) x = e.clientX - r.width - pad; if (y + r.height > innerHeight - 8) y = e.clientY - r.height - pad; tip.style.left = x + 'px'; tip.style.top = y + 'px'; }
function appTip(a, s) {
  const det = appDetail(a);
  const site = s != null && s >= 0 && (SITES_OF.get(a) || []).length > 1 ? SITES[s] : null;
  const tg = topGroupsOf(det).map(g => `${GROUPS[g].label} (${fmt(det.g[g])})`).join('<br>') || '<span class="faint">no specific category</span>';
  return `<h4>${esc(A.name[a])}</h4>${A.orig[a] ? `<div class="faint">${esc(A.orig[a])}</div>` : ''}<div class="kv">
    ${site ? `<span>This site</span><span>${esc(site[4])} · ${esc(site[5])}</span><span>Applications here</span><span class="mono">${fmt(R.sCnt[s])}</span><span>Precision</span><span>${LPREC[site[3]].label}${site[6] ? ' · ' + esc(site[6]) + ' confidence' : ''}</span><span>Group</span><span>${(SITES_OF.get(a) || []).length} places; main: ${esc(locLabel(a))}</span>` : `<span>Location</span><span>${esc(locLabel(a))}</span>
    <span>Precision</span><span>${LPREC[LO.p[a]].label}${LO.conf[a] ? ' · ' + esc(LO.conf[a]) + ' confidence' : ''}</span>`}
    <span>Type</span><span>${TYPES[A.typ[a]].label}</span>
    <span>Applications</span><span class="mono">${fmt(R.cnt[a])}${F.attr === 'frac' ? ` (fractional ${fmt1(R.frac[a])})` : ''}</span>
    <span>Families</span><span class="mono">${fmt(R.fam[a])}</span>
    <span>Share</span><span class="mono">${R.docs ? pct(R.cnt[a] / R.docs) : '–'} of filtered publications</span>
    <span>Main technologies</span><span>${tg}</span></div>`;
}
function clusterTip(p, leaves) {
  const counts = [0, 1, 2, 3, 4, 5].map(t => p['t' + t] || 0);
  const typ = TYPES.map((t, i) => counts[i] ? `<span class="pill"><span class="sw" style="background:var(${t.tok})"></span>${t.label} ${fmt(counts[i])}</span>` : '').join(' ');
  let tops = '<span class="faint">loading…</span>', where = '';
  if (leaves) {
    const ls = leaves.map(l => l.properties).sort((x, y) => y.v - x.v);
    tops = ls.slice(0, 4).map(l => `${esc(A.name[l.a])} <span class="mono">${fmt(l.v)}</span>`).join('<br>');
    const cities = d3.rollups(ls, v => v.length, l => LO.city[l.a] || '?').sort((x, y) => y[1] - x[1]);
    where = cities.slice(0, 3).map(([c, n]) => `${esc(c)} (${n})`).join(', ') + (cities.length > 3 ? ', …' : '');
  }
  return `<h4>${fmt(p.point_count)} applicants</h4><div class="kv">${where ? `<span>Cities</span><span>${where}</span>` : ''}<span>Applications</span><span class="mono">${fmt(p.v)} <span class="faint">(summed over applicants)</span></span><span>Largest</span><span>${tops}</span></div><div style="margin-top:4px">${typ}</div><div class="faint" style="margin-top:4px">Click to zoom in; applicants sharing one coordinate fan out.</div>`;
}
function countryTip(cc) {
  const name = ccName(cc);
  if (mode === 'B') { const i = invIdx.get(cc); return `<h4>${esc(name)}</h4><div class="kv"><span>Applications with an inventor here</span><span class="mono">${fmt(i != null ? R.inv[i] : 0)}</span></div>`; }
  if (mode === 'C') { const j = JUR.findIndex(x => x.k === cc); return `<h4>${esc(name)}</h4>` + (j >= 0 ? `<div class="kv"><span>Families with a member here</span><span class="mono">${fmt(R.jur[j])} (${R.docs ? pct(R.jur[j] / R.docs) : '–'})</span></div>` : '<div class="faint">Office not covered by the family look-up (only EP, US, JP, KR, WO, CN, TW were queried).</div>'); }
  const apps = R.ctyApps.get(cc); const docs = R.ctyDocs.get(cc) || 0;
  if (!apps) return `<h4>${esc(name)}</h4><div class="faint">No applicants in the current filter.</div>`;
  const g2 = R.ctyGrp.get(cc); const tg = d3.range(GROUPS.length).filter(g => g2[g]).sort((x, y) => g2[y] - g2[x]).slice(0, 3).map(g => `${GROUPS[g].label} (${fmt(g2[g])})`).join('<br>');
  const inst = apps.reduce((s, v, i) => s + (i === 4 ? 0 : v), 0);
  return `<h4>${esc(name)}</h4><div class="kv"><span>Institutional applicants</span><span class="mono">${fmt(inst)}</span><span>Private inventors</span><span class="mono">${fmt(apps[4])}</span><span>Applications</span><span class="mono">${fmt(docs)}</span><span>Leading technologies</span><span>${tg || '–'}</span></div><div style="margin-top:4px">${TYPES.map((t, i) => apps[i] ? `<span class="pill"><span class="sw" style="background:var(${t.tok})"></span>${t.label} ${fmt(apps[i])}</span>` : '').join(' ')}</div>`;
}

// ------------------------------------------------------------------ small chart helpers (d3)
function hbar(el, items, o = {}) {
  const w = el.clientWidth || 340, lw = o.labelW ?? Math.min(170, w * 0.42), rh = o.rh ?? 18, h = items.length * rh + 4;
  const max = d3.max(items, d => d.v) || 1;
  const x = d3.scaleLinear([0, max], [0, Math.max(10, w - lw - 56)]);
  const s = d3.select(el).html('').append('svg').attr('viewBox', `0 0 ${w} ${h}`).attr('role', 'img').attr('aria-label', o.aria || 'bar chart');
  const g = s.selectAll('g').data(items).join('g').attr('transform', (d, i) => `translate(0,${i * rh})`).attr('class', d => d.on ? 'clickable' : null).on('click', (e, d) => d.on && d.on());
  g.append('text').attr('x', lw - 6).attr('y', rh / 2).attr('dy', '0.35em').attr('text-anchor', 'end').text(d => { const mx = Math.max(8, Math.floor((lw - 8) / 6.2)); return d.l.length > mx ? d.l.slice(0, mx - 1) + '…' : d.l; }).append('title').text(d => d.l);
  g.append('rect').attr('x', lw).attr('y', 3).attr('height', rh - 6).attr('width', d => Math.max(1, x(d.v))).attr('rx', 2).attr('fill', d => d.c || 'var(--accent)').append('title').text(d => `${d.l}: ${o.fmt ? o.fmt(d.v) : fmt(d.v)}`);
  g.append('text').attr('class', 'v').attr('x', d => lw + x(d.v) + 4).attr('y', rh / 2).attr('dy', '0.35em').text(d => o.fmt ? o.fmt(d.v) : fmt(d.v));
}
function donut(el, items, o = {}) {
  if (!items.length) { el.innerHTML = '<div class="note">None in the current filter.</div>'; return; }
  const w = Math.min(el.clientWidth || 320, 420), r = 54, h = Math.max(2 * r + 8, items.length * 17 + 8);
  const s = d3.select(el).html('').append('svg').attr('viewBox', `0 0 ${w} ${h}`).attr('role', 'img').attr('aria-label', o.aria || 'donut chart');
  const tot = d3.sum(items, d => d.v) || 1;
  const arcs = d3.pie().sort(null).value(d => d.v)(items);
  s.append('g').attr('transform', `translate(${r + 4},${h / 2})`).selectAll('path').data(arcs).join('path').attr('d', d3.arc().innerRadius(r * 0.58).outerRadius(r)).attr('fill', d => d.data.c).attr('stroke', 'var(--panel)').append('title').text(d => `${d.data.l}: ${fmt(d.data.v)}`);
  s.append('text').attr('x', r + 4).attr('y', h / 2).attr('dy', '0.35em').attr('text-anchor', 'middle').attr('class', 'v').text(o.center ?? fmt(tot));
  const lg = s.selectAll('g.l').data(items).join('g').attr('class', 'l').attr('transform', (d, i) => `translate(${2 * r + 18},${h / 2 - items.length * 8.5 + i * 17 + 8})`);
  lg.append('rect').attr('width', 9).attr('height', 9).attr('y', -5).attr('rx', 2).attr('fill', d => d.c);
  lg.append('text').attr('x', 14).attr('dy', '0.35em').text(d => `${d.l.length > 30 ? d.l.slice(0, 29) + '…' : d.l}  ${fmt(d.v)} (${pct(d.v / tot)})`);
}
function lineChart(el, series, labels, o = {}) {
  const w = el.clientWidth || 340, h = o.h ?? 170, m = { l: 44, r: 10, t: 10, b: 22 };
  const s = d3.select(el).html('').append('svg').attr('viewBox', `0 0 ${w} ${h}`).attr('role', 'img').attr('aria-label', o.aria || 'line chart');
  const x = d3.scalePoint(labels, [m.l, w - m.r]);
  const ymax = d3.max(series, se => d3.max(se.v)) || 1;
  const y = d3.scaleLinear([0, ymax], [h - m.b, m.t]).nice();
  s.append('g').attr('class', 'grid').selectAll('line').data(y.ticks(4)).join('line').attr('x1', m.l).attr('x2', w - m.r).attr('y1', y).attr('y2', y);
  s.append('g').selectAll('text').data(y.ticks(4)).join('text').attr('x', m.l - 6).attr('y', y).attr('dy', '0.35em').attr('text-anchor', 'end').text(d3.format('~s'));
  const step = Math.ceil(labels.length / Math.max(2, Math.floor((w - m.l) / 62)));
  s.append('g').selectAll('text').data(labels.filter((l, i) => i % step === 0)).join('text').attr('x', d => x(d)).attr('y', h - 6).attr('text-anchor', 'middle').text(d => d);
  if (o.mark != null) { const xm = x(labels[o.mark]); s.append('line').attr('x1', xm).attr('x2', xm).attr('y1', m.t).attr('y2', h - m.b).attr('stroke', 'var(--ink-3)').attr('stroke-dasharray', '3 3'); s.append('text').attr('x', xm - 4).attr('y', m.t + 8).attr('text-anchor', 'end').text(o.markLabel || ''); }
  series.forEach(se => {
    const pts = se.v.map((v, i) => [x(labels[i]), y(v), v, labels[i]]).filter((p, i) => se.until == null || i <= se.until);
    s.append('path').attr('d', d3.line()(pts.map(p => [p[0], p[1]]))).attr('fill', 'none').attr('stroke', se.c).attr('stroke-width', 2).attr('stroke-dasharray', se.dash || null);
    s.append('g').selectAll('circle').data(pts).join('circle').attr('cx', p => p[0]).attr('cy', p => p[1]).attr('r', 2.4).attr('fill', se.c).append('title').text(p => `${se.n} · ${p[3]}: ${fmt(p[2])}`);
  });
  const lg = s.append('g').attr('transform', `translate(${m.l + 6},${m.t + 4})`);
  series.forEach((se, i) => { const gg = lg.append('g').attr('transform', `translate(${i * 110},0)`); gg.append('rect').attr('width', 12).attr('height', 3).attr('y', -1).attr('fill', se.c); gg.append('text').attr('x', 16).attr('dy', '0.35em').text(se.n); });
}
function stack100(el, rows, keys, colors, o = {}) {
  const w = el.clientWidth || 600, lw = 130, rh = 22;
  const lpos = []; { let lx = 0, ly = 0; keys.forEach(k => { const kw = 18 + k.length * 6.1; if (lx + kw > w - lw && lx > 0) { lx = 0; ly += 16; } lpos.push([lx, ly]); lx += kw + 6; }); }
  const h = rows.length * rh + 22 + (lpos.length ? lpos[lpos.length - 1][1] : 0);
  const s = d3.select(el).html('').append('svg').attr('viewBox', `0 0 ${w} ${h}`).attr('role', 'img').attr('aria-label', o.aria || 'stacked bars');
  const max = o.abs ? d3.max(rows, r => d3.sum(r.v)) || 1 : 1;
  const x = d3.scaleLinear([0, max], [lw, w - 40]);
  rows.forEach((r, i) => {
    const tot = d3.sum(r.v) || 1; let acc = 0;
    const g = s.append('g').attr('transform', `translate(0,${i * rh})`).attr('class', r.on ? 'clickable' : null).on('click', () => r.on && r.on());
    g.append('text').attr('x', lw - 8).attr('y', rh / 2).attr('dy', '0.35em').attr('text-anchor', 'end').text(r.l);
    r.v.forEach((v, k) => { const val = o.abs ? v : v / tot; g.append('rect').attr('x', x(acc)).attr('y', 3).attr('height', rh - 6).attr('width', Math.max(0, x(acc + val) - x(acc))).attr('fill', colors[k]).append('title').text(`${r.l} · ${keys[k]}: ${fmt(v)} (${pct(v / tot)})`); acc += val; });
    g.append('text').attr('class', 'v').attr('x', o.abs ? x(acc) + 4 : w - 36).attr('y', rh / 2).attr('dy', '0.35em').text(fmt(r.n ?? tot));
  });
  const lg = s.append('g').attr('transform', `translate(${lw},${rows.length * rh + 12})`);
  keys.forEach((k, i) => { const gg = lg.append('g').attr('transform', `translate(${lpos[i][0]},${lpos[i][1]})`); gg.append('rect').attr('width', 9).attr('height', 9).attr('y', -5).attr('fill', colors[i]); gg.append('text').attr('x', 12).attr('dy', '0.35em').text(k); });
}

// ------------------------------------------------------------------ sidebar
function setSide(crumb, title) { $('#sideCrumb').textContent = crumb; $('#sideTitle').textContent = title; $('#sideBack').hidden = viewStack.length === 0; }
function pushView(v) { if (view && !(view.kind === v.kind && view.id === v.id)) viewStack.push(view); view = v; renderSide(); }
$('#sideBack').onclick = () => { view = viewStack.pop() || { kind: 'global' }; if (view.kind !== 'applicant') selected = null; else selected = view.id; if (view.kind === 'country') selCountry = view.id; else if (view.kind === 'global') selCountry = null; renderSide(); paintCountries(); updateSelection(); };
function renderSide() {
  $('#sideBody').scrollTop = 0;
  if (view.kind === 'applicant') return sideApplicant(view.id);
  if (view.kind === 'country') return sideCountry(view.id);
  if (view.kind === 'place') return sidePlace(view);
  return sideGlobal();
}
const precChip = a => `<span class="pc pc-${LO.p[a]}" title="${esc(LPREC[LO.p[a]].text)}">${LPREC[LO.p[a]].short}</span>`;
function appRow(a, sub) {
  return `<li data-a="${a}"><span class="sw" style="background:var(${TYPES[A.typ[a]].tok})"></span><span style="min-width:0"><div class="nm">${esc(A.name[a])}</div><div class="sub">${sub}</div></span><span class="mono">${F.measure === 'fams' ? fmt(R.fam[a]) : F.attr === 'frac' ? fmt1(R.frac[a]) : fmt(R.cnt[a])}</span></li>`;
}
function bindRows(root) { root.querySelectorAll('li[data-a]').forEach(li => li.onclick = () => openApplicant(+li.dataset.a, true)); }
function listInto(el, apps, subFn, step = 60) {
  let shown = 0; const ul = el.querySelector('ul'); const more = el.querySelector('.morebtn');
  const fill = () => { shown = Math.min(apps.length, shown + (shown ? 200 : step)); ul.innerHTML = apps.slice(0, shown).map(a => appRow(a, subFn(a))).join(''); bindRows(ul); if (more) more.hidden = shown >= apps.length; };
  if (more) more.onclick = fill; fill();
}
function precBar(apps) {
  const c = { E: 0, C: 0, R: 0, K: 0, U: 0 }; apps.forEach(a => c[LO.p[a]]++);
  return { c, items: ['E', 'C', 'R', 'K', 'U'].map(k => ({ l: LPREC[k].label, v: c[k], c: `var(--pc-${k})` })) };
}
function sideGlobal() {
  setSide('Global overview', 'All applicants in the filter');
  const unm = R.ranked.filter(a => !hasPoint(a));
  const pb = precBar(R.ranked);
  let h = `<div class="sec"><div class="stats">
    <div class="stat"><div class="k">Applications</div><div class="v">${fmt(R.docs)}</div></div>
    <div class="stat"><div class="k">Families</div><div class="v">${fmt(R.fams)}</div></div>
    <div class="stat"><div class="k">Applicants</div><div class="v">${fmt(R.ranked.length)}</div></div>
    <div class="stat"><div class="k">Drawn on the map</div><div class="v">${fmt(R.ranked.length - unm.length)}</div></div></div></div>`;
  h += `<div class="sec"><h3>Location precision of these applicants</h3><div class="chart" id="sgPrec"></div><div class="note">Exact site and city-level applicants are drawn as dots. The others stay in every statistic and are listed below.</div></div>`;
  h += `<div class="sec"><h3>Applicant types</h3><div class="chart" id="sgTypes"></div></div>`;
  h += `<div class="sec"><h3>Top applicants</h3><ul class="alist" id="sgTop"></ul></div>`;
  h += `<div class="sec" id="sgUnm"><h3>Unmapped applicants: location unverified (${fmt(unm.length)})</h3><div class="note">Known only to province or country level, or not at all. ${fmt(R.unmappedDocs)} filtered applications have at least one such applicant.</div><ul class="alist"></ul><button class="btn morebtn" type="button">Show more</button></div>`;
  h += `<div class="sec note">Click a country, a dot or a cluster on the map for details. Computed in ${Math.round(R.ms)} ms over ${fmt(N)} application records.</div>`;
  $('#sideBody').innerHTML = h;
  hbar($('#sgPrec'), pb.items, { labelW: 130, aria: 'location precision' });
  donut($('#sgTypes'), TYPES.map((t, i) => ({ l: t.label, v: R.typeApps[i], c: typeColor(i) })).filter(d => d.v), { center: fmt(R.ranked.length), aria: 'applicants by type' });
  $('#sgTop').innerHTML = R.ranked.slice(0, 15).map(a => appRow(a, `${esc(locLabel(a))} · ${TYPES[A.typ[a]].label}`)).join(''); bindRows($('#sgTop'));
  listInto($('#sgUnm'), unm, a => `${precChip(a)} ${esc(ccName(A.cc[a]))}${LO.p[a] === 'R' ? ' · ' + esc(LO.state[a]) : ''} · ${TYPES[A.typ[a]].label}${A.ronly[a] ? ' · only ' + A.ronly[a] + ' priority' : ''}`, 40);
}
function openCountry(cc, keepZoom) {
  selCountry = cc; selected = null;
  pushView({ kind: 'country', id: cc });
  paintCountries(); updateSelection(); clearSpider();
  if (!keepZoom) zoomToCountry(cc);
}
function openPlace(v) { pushView({ kind: 'place', id: v.title + ':' + v.apps.length, title: v.title, apps: v.apps, note: v.note }); }
function sidePlace(v) {
  setSide('Location', v.title);
  const apps = v.apps.filter(a => R.passA[a]).sort((x, y) => R.val(y) - R.val(x));
  let h = `<div class="note">${esc(v.note || '')}</div><div class="sec" id="spList"><h3>${fmt(apps.length)} applicants</h3><ul class="alist"></ul><button class="btn morebtn" type="button">Show more</button></div>`;
  $('#sideBody').innerHTML = h;
  listInto($('#spList'), apps, a => `${precChip(a)} ${esc(locLabel(a))} · ${TYPES[A.typ[a]].label}`);
}
function sideCountry(cc) {
  setSide('Country overview', ccName(cc));
  const apps = R.ranked.filter(a => (A.cc[a] || '__U') === cc);
  const located = apps.filter(hasPoint), approx = apps.filter(a => !hasPoint(a));
  const ta = R.ctyApps.get(cc) || new Int32Array(6);
  const docs = R.ctyDocs.get(cc) || 0, fams = (R.ctyFam.get(cc) || new Set()).size;
  const inst = ta.reduce((s, v, i) => s + (i === 4 ? 0 : v), 0);
  const cities = d3.rollups(located, v => v.length, a => LO.city[a] || '?').sort((x, y) => y[1] - x[1]);
  let h = `<div class="sec"><div class="stats">
    <div class="stat"><div class="k">Applications</div><div class="v">${fmt(docs)}</div></div>
    <div class="stat"><div class="k">Families</div><div class="v">${fmt(fams)}</div></div>
    <div class="stat"><div class="k">Institutional applicants</div><div class="v">${fmt(inst)}</div></div>
    <div class="stat"><div class="k">Private inventors</div><div class="v">${fmt(ta[4])}</div></div></div>
    <div class="note" style="margin-top:6px">${F.attr === 'frac' ? `Fractional attribution: ${fmt1(R.ctyFrac.get(cc) || 0)} publication-equivalents. ` : ''}Country statistics count applicants by their country (headquarters country or patent-record country), whether or not a city could be verified.</div></div>`;
  if (mode === 'B') { const i = invIdx.get(cc); h += `<div class="prec">Inventor view: ${fmt(i != null ? R.inv[i] : 0)} filtered applications name an inventor in ${esc(ccName(cc))}.</div>`; }
  if (mode === 'C') { const j = JUR.findIndex(x => x.k === cc); h += `<div class="prec">Jurisdiction view: ${j >= 0 ? fmt(R.jur[j]) + ' filtered applications belong to families with a member filed here.' : 'this office was not covered by the family look-up.'}</div>`; }
  h += `<div class="sec"><h3>Institutional vs individual applicants</h3><div class="chart" id="scTypes"></div></div>`;
  h += `<div class="sec"><h3>Leading technology groups</h3><div class="chart" id="scTech"></div></div>`;
  if (cities.length) h += `<div class="sec"><h3>Leading applicant cities</h3><div class="chart" id="scCities"></div></div>`;
  h += `<div class="sec" id="scLoc"><h3>Applicants located to a site or city (${fmt(located.length)})</h3><ul class="alist"></ul><button class="btn morebtn" type="button">Show more</button></div>`;
  h += `<div class="sec" id="scApprox"><h3>Without verified city-level location (${fmt(approx.length)})</h3><div class="note">Province-level, country-only or unknown location; includes private inventors, who are never located below country level.</div><ul class="alist"></ul><button class="btn morebtn" type="button">Show more</button></div>`;
  $('#sideBody').innerHTML = h;
  donut($('#scTypes'), TYPES.map((t, i) => ({ l: t.label, v: ta[i], c: typeColor(i) })).filter(d => d.v), { aria: 'applicants by type' });
  const g2 = R.ctyGrp.get(cc) || new Int32Array(GROUPS.length);
  hbar($('#scTech'), d3.range(GROUPS.length).filter(g => g2[g]).sort((x, y) => g2[y] - g2[x]).map(g => ({ l: GROUPS[g].label, v: g2[g], c: GCOL[g], on: () => { F.cats = new Set(CATS.filter(c => c.g === g).map(c => c.i)); syncTechMenu(); update(); } })), { aria: 'technology groups' });
  if (cities.length) hbar($('#scCities'), cities.slice(0, 10).map(([c, n]) => ({ l: c, v: n, c: 'var(--accent)', on: () => openPlace({ title: c + ', ' + ccName(cc), apps: located.filter(a => (LO.city[a] || '?') === c), note: 'Applicants located in this city (site or city-centre coordinates).' }) })), { aria: 'applicants by city', fmt: v => fmt(v) + ' appl.' });
  const sub = a => { const tg = topGroupsOf(appDetail(a), 1)[0]; return `${precChip(a)} ${TYPES[A.typ[a]].label}${tg != null ? ' · ' + GROUPS[tg].label : ''}${LO.city[a] ? ' · ' + esc(LO.city[a]) : LO.p[a] === 'R' ? ' · ' + esc(LO.state[a]) : ''}`; };
  listInto($('#scLoc'), located, sub);
  listInto($('#scApprox'), approx, sub, 30);
}
function openApplicant(a, fromSidebar, fromMap) {
  selected = a; if (A.cc[a]) selCountry = A.cc[a];
  pushView({ kind: 'applicant', id: a });
  paintCountries(); updateSelection();
  if (!fromMap && mode === 'A' && hasPoint(a)) focusApplicant(a);
  else if (!fromMap && A.cc[a] && !hasPoint(a)) zoomToCountry(A.cc[a]);
}
function locBlock(a) {
  const p = LO.p[a];
  const grp = A.prec[a] === 'M' || A.prec[a] === 'P';
  let h = `<div class="sec"><h3>Location</h3><div class="locbox">
    <div class="loc-main">${esc(locLabel(a))}</div>
    <div class="cmpchips"><span class="pc pc-${p}">${LPREC[p].label}</span>${LO.conf[a] ? `<span class="pill">${esc(LO.conf[a])} confidence</span>` : ''}${hasPoint(a) && mode === 'A' ? '<button class="btn" type="button" id="saShow">Show on map</button>' : ''}</div>
    <div class="note">${esc(LPREC[p].text)}</div><dl class="kvs">`;
  if (LO.site[a]) h += `<dt>Location refers to</dt><dd>${esc(LO.site[a])}</dd>`;
  if (hasPoint(a)) h += `<dt>Coordinates</dt><dd class="mono">${LO.lat[a].toFixed(4)}, ${LO.lng[a].toFixed(4)} (lat, lon)</dd>`;
  if (LO.url[a]) h += `<dt>Source</dt><dd><a href="${esc(LO.url[a])}" target="_blank" rel="noopener">${esc(LO.stype[a] || 'source')}</a></dd>`;
  if (LO.evid[a]) h += `<dt>Evidence</dt><dd>${esc(LO.evid[a])}</dd>`;
  if (LO.date[a]) h += `<dt>Verified</dt><dd>${esc(LO.date[a])}</dd>`;
  h += `<dt>Country basis</dt><dd>${esc(CBASIS[A.prec[a]] || '')}</dd>`;
  if (LO.notes[a]) h += `<dt>Checks</dt><dd>${esc(LO.notes[a])}</dd>`;
  h += `</dl>`;
  const ss = SITES_OF.get(a) || [];
  if (ss.length > 1) h += `<div class="note" style="margin-top:6px"><b>${ss.length} places.</b> Each filing entity of this group is located on its own (a subsidiary never inherits the parent's address):</div><ul class="alist sites">${ss.map(s => `<li><span class="pc pc-${SITES[s][3]}">${LPREC[SITES[s][3]].short}</span><span style="min-width:0"><div class="nm">${esc(SITES[s][4])}</div><div class="sub">${esc(SITES[s][5])}${SITES[s][7] > 1 ? ` + ${SITES[s][7] - 1} more name${SITES[s][7] > 2 ? 's' : ''}` : ''}${SITES[s][6] ? ' · ' + esc(SITES[s][6]) + ' confidence' : ''}</div></span><span class="mono">${fmt(R.sCnt[s])}</span></li>`).join('')}</ul><div class="note">Applications under the current filters filed under the names at each place. Names without a verified town are not drawn.</div>`;
  else if (grp) h += `<div class="note">This applicant groups related entities under one parent (documented study rule). Entities without a verified town are not drawn.</div>`;
  h += `</div></div>`;
  return h;
}
function sideApplicant(a) {
  setSide(TYPES[A.typ[a]].long, A.name[a]);
  const det = appDetail(a);
  const rank = R.rankOf[a];
  const inCmp = compare.apps.includes(a);
  let h = '';
  if (A.orig[a]) h += `<div class="muted">${esc(A.orig[a])}</div>`;
  h += `<div class="cmpchips"><span class="pill"><span class="sw" style="background:var(${TYPES[A.typ[a]].tok})"></span>${TYPES[A.typ[a]].label}</span>
    <button class="btn" type="button" id="saCmp">${inCmp ? 'Remove from comparison' : 'Add to comparison'}</button>${A.cc[a] ? `<button class="btn ghost" type="button" id="saCty">${esc(ccName(A.cc[a]))} overview</button>` : ''}</div>`;
  if (A.typ[a] === 4) h += `<div class="prec inf"><b>Private inventor.</b> A natural person named as applicant (name-pattern classification, see Methodology). Shown at country level only; no address is used or searched. Name variants are not merged.</div>`;
  h += `<div class="sec"><div class="stats">
    <div class="stat"><div class="k">Applications (filtered)</div><div class="v">${fmt(det.n)}</div></div>
    <div class="stat"><div class="k">Families (filtered)</div><div class="v">${fmt(det.fams)}</div></div>
    <div class="stat"><div class="k">Rank in filter</div><div class="v">${rank >= 0 ? '#' + fmt(rank + 1) : '–'}</div></div>
    <div class="stat"><div class="k">Share of filtered publications</div><div class="v">${R.docs ? pct(det.n / R.docs) : '–'}</div></div></div>
    <div class="note" style="margin-top:6px">All years, no filters: ${fmt(A.n[a])} applications, ${fmt(A.fam[a])} families.${F.attr === 'frac' ? ` Fractional attribution: ${fmt1(R.frac[a])}.` : ''}${rank >= 0 ? ` Rank #${fmt(rank + 1)} of ${fmt(R.ranked.length)} applicants in the filter.` : ''}</div></div>`;
  h += locBlock(a);
  h += `<div class="sec"><h3>Technology groups</h3><div class="chart" id="saG"></div></div>`;
  h += `<div class="sec"><h3>Top technology categories</h3><div class="chart" id="saC"></div></div>`;
  h += `<div class="sec"><h3>Publications per month</h3><div class="chart" id="saT"></div></div>`;
  h += `<div class="sec"><h3>Filing jurisdictions</h3><div class="chart" id="saJ"></div><div class="note">Offices where the same family has a member (EP, US, JP, KR, WO, CN, TW looked up)${FAMJUR ? '' : ': look-up not loaded in this build'}.</div></div>`;
  h += `<div class="sec"><h3>Most frequent CPC/IPC groups</h3><div class="cpc">${(D.cpc[a] || '').split(' ').filter(Boolean).map(s => { const [g, n] = s.split(':'); return `<span title="${n} publications">${g} · ${n}</span>`; }).join('') || '<span class="faint">none</span>'}</div><div class="note">All years, unfiltered. CPC subclass shares under the current filter: ${CPCSUB.map((s, i) => det.cp[i] ? `${s} ${fmt(det.cp[i])}` : '').filter(Boolean).join(' · ') || '–'}.</div></div>`;
  h += `<div class="sec"><h3>Filed alone or jointly</h3><div class="note">${fmt(det.solo)} alone · ${fmt(det.withInst)} with an institution · ${fmt(det.withPersons)} with other private inventors only.</div></div>`;
  const ps = (D.pats[a] || []);
  h += `<div class="sec"><h3>Selected publications</h3><ul class="plist">${ps.map(([di, pn, t]) => { const on = R.pass1[di]; const code = pn.replace(/-/g, ''); return `<li class="${on ? '' : 'off'}"><span class="pn">${pn}</span>${on ? '' : ' <span class="faint">(outside current filter)</span>'}<br>${esc(t || '(no English title)')}<br><a href="https://patents.google.com/patent/${code}" target="_blank" rel="noopener">Google Patents</a> · <a href="https://worldwide.espacenet.com/patent/search?q=pn%3D${code}" target="_blank" rel="noopener">Espacenet</a></li>`; }).join('') || '<li class="faint">none</li>'}</ul><div class="note">Most recent first publications of this applicant (up to ${A.n[a] >= 20 ? 6 : 2} stored).</div></div>`;
  $('#sideBody').innerHTML = h;
  $('#saCmp').onclick = () => { toggleCompare(a); sideApplicant(a); };
  if ($('#saCty')) $('#saCty').onclick = () => openCountry(A.cc[a]);
  if ($('#saShow')) $('#saShow').onclick = () => focusApplicant(a);
  donut($('#saG'), d3.range(GROUPS.length).filter(g => det.g[g]).sort((x, y) => det.g[y] - det.g[x]).map(g => ({ l: GROUPS[g].label, v: det.g[g], c: GCOL[g] })), { center: fmt(det.n), aria: 'technology groups' });
  hbar($('#saC'), d3.range(CATS.length).filter(c => det.c[c]).sort((x, y) => det.c[y] - det.c[x]).slice(0, 8).map(c => ({ l: CATS[c].en, v: det.c[c], c: GCOL[CATS[c].g] })), { aria: 'technology categories' });
  lineChart($('#saT'), [{ n: 'EP', c: 'var(--t0)', v: Array.from(det.ser[0]) }, { n: 'National', c: 'var(--t1)', v: Array.from(det.ser[1]) }], MONTHS.map(m => m.slice(2)), { h: 140, aria: 'applications per month' });
  hbar($('#saJ'), JUR.map((j, i) => ({ l: `${j.k} (${j.kind})`, v: det.jj[i], c: j.kind === 'national' ? 'var(--accent)' : 'var(--ink-3)' })).filter(d => d.v), { aria: 'jurisdictions' });
}

// ------------------------------------------------------------------ analytics cards
let techCtyMode = 'pct';
function renderCharts() {
  $('#capTop').textContent = F.measure === 'fams' ? 'families' : F.attr === 'frac' ? 'fractional applications' : 'applications';
  hbar($('#chTop'), R.ranked.slice(0, 20).map(a => ({ l: A.name[a], v: R.val(a), c: typeColor(A.typ[a]), on: () => openApplicant(a, true) })), { fmt: F.attr === 'frac' && F.measure !== 'fams' ? fmt1 : fmt, labelW: 190, aria: 'top 20 applicants' });
  lineChart($('#chTime'), [{ n: SERIES_NAMES[0], c: 'var(--t0)', v: Array.from(R.series[0]) }, { n: SERIES_NAMES[1], c: 'var(--t1)', v: Array.from(R.series[1]) }], MONTHS.map(m => m.slice(2)), { mark: MONTHS.length - 1, markLabel: 'partial', aria: 'applications per month' });
  $('#noteTime').textContent = `Latest data: EP ${D.meta.latest.EP}, DE ${D.meta.latest.DE} (September 2026 partial). Italian national records end in December 2025 and British records thin out in 2026; lower counts in the last months reflect data cut-off, not falling activity.` + (F.basis === 'fil' ? ' The time filter currently uses filing year; the chart still runs by publication month.' : '');
  const ctys = [...R.ctyDocs.entries()].filter(([c]) => c !== '__U').sort((x, y) => y[1] - x[1]).slice(0, 10);
  const used = d3.range(GROUPS.length).filter(g => ctys.some(([c]) => R.ctyGrp.get(c)[g]));
  stack100($('#chTechCty'), ctys.map(([c, n]) => ({ l: ccName(c), n, v: used.map(g => R.ctyGrp.get(c)[g]), on: () => openCountry(c) })), used.map(g => GROUPS[g].label), used.map(g => GCOL[g]), { abs: techCtyMode === 'abs', aria: 'technology mix by country' });
  hbar($('#chTypes'), TYPES.map((t, i) => ({ l: `${t.label} (${fmt(R.typeApps[i])} applicants)`, v: R.typeDocs[i], c: typeColor(i), on: () => { F.types = new Set([i]); update(); } })), { labelW: 210, aria: 'applications by applicant type' });
  const tot = R.docs || 1;
  stack100($('#chIndiv'), [{ l: 'Applications', n: R.docs, v: [R.instOnly, R.indivAny - R.indivOnly, R.indivOnly] }], ['Institutional applicants only', 'Private inventor + institution', 'Private inventors only'], ['var(--t0)', 'color-mix(in srgb, var(--t4) 55%, var(--t0))', 'var(--t4)'], { aria: 'private inventor share' });
  $('#noteIndiv').textContent = `${fmt(R.indivAny)} of ${fmt(R.docs)} filtered applications (${pct(R.indivAny / tot)}) name at least one private inventor as applicant; ${fmt(R.indivOnly)} are filed by private inventors alone or together.`;
}
segBind('#techCtySeg', 'v', v => { techCtyMode = v; renderCharts(); });

// ------------------------------------------------------------------ comparison
function toggleCompare(a) { const i = compare.apps.indexOf(a); if (i >= 0) compare.apps.splice(i, 1); else if (compare.apps.length < 6) compare.apps.push(a); $('#cmpCount').textContent = compare.apps.length + compare.types.length; }
let cmpNorm = 'pct';
$('#cmpCats').innerHTML = TYPES.map(t => `<button class="chip" type="button" data-ct="${t.k}" aria-pressed="false"><span class="sw" style="background:var(${t.tok})"></span>${['Companies','Startups','Universities','Research institutes','Private inventors','Other / unknown'][t.k]}</button>`).join('');
$('#cmpCats').addEventListener('click', e => { const b = e.target.closest('button[data-ct]'); if (!b || b.disabled) return; const t = +b.dataset.ct; const i = compare.types.indexOf(t); i >= 0 ? compare.types.splice(i, 1) : compare.types.push(t); b.setAttribute('aria-pressed', String(i < 0)); $('#cmpCount').textContent = compare.apps.length + compare.types.length; renderCompare(); });
segBind('#cmpNorm', 'v', v => { cmpNorm = v; renderCompare(); });
$('#btnCompare').onclick = () => { $('#cmpOverlay').hidden = false; renderCompare(); };
$('#cmpClose').onclick = () => { $('#cmpOverlay').hidden = true; };
$('#cmpOverlay').addEventListener('click', e => { if (e.target.id === 'cmpOverlay') e.target.hidden = true; });
function renderCompare() {
  if ($('#cmpOverlay').hidden) return;
  const ents = [
    ...compare.apps.map(a => { const d = appDetail(a); return { name: A.name[a], col: typeColor(A.typ[a]), n: d.n, fams: d.fams, g: d.g, ser: d.ser, cp: d.cp, jj: d.jj, apps: 1, typ: TYPES[A.typ[a]].label, cty: ccName(A.cc[a]) }; }),
    ...compare.types.map(t => { const d = groupDetail(a => A.typ[a] === t); return { name: 'All: ' + TYPES[t].label, col: typeColor(t), ...d, typ: 'category', cty: '–' }; }),
  ];
  $('#cmpChips').innerHTML = compare.apps.length ? compare.apps.map(a => `<span class="pill"><span class="sw" style="background:var(${TYPES[A.typ[a]].tok})"></span>${esc(A.name[a])}<button type="button" data-rm="${a}" aria-label="Remove">×</button></span>`).join('') : '<span class="note">No applicants added yet. Open an applicant and choose “Add to comparison” (up to 6).</span>';
  $('#cmpChips').querySelectorAll('button[data-rm]').forEach(b => b.onclick = () => { toggleCompare(+b.dataset.rm); renderCompare(); });
  if (!ents.length) { $('#cmpTable').innerHTML = ''; ['#cmpTech', '#cmpTrend', '#cmpCpc', '#cmpJur'].forEach(s => $(s).innerHTML = '<div class="note">Add applicants or categories to compare.</div>'); return; }
  const q = ser => { const out = []; for (let i = 0; i < MONTHS.length; i += 3) out.push((ser[0][i] || 0) + (ser[0][i + 1] || 0) + (ser[0][i + 2] || 0) + (ser[1][i] || 0) + (ser[1][i + 1] || 0) + (ser[1][i + 2] || 0)); return out; };
  const v = (x, tot) => cmpNorm === 'pct' ? (tot ? pct(x / tot) : '–') : fmt(x);
  let t = `<thead><tr><th></th>${ents.map(e => `<th><span class="pill"><span class="sw" style="background:${e.col}"></span>${esc(e.name)}</span></th>`).join('')}</tr></thead><tbody>`;
  t += `<tr><td>Type · country</td>${ents.map(e => `<td>${esc(e.typ)} · ${esc(e.cty)}</td>`).join('')}</tr>`;
  t += `<tr><td>Applicants</td>${ents.map(e => `<td>${fmt(e.apps)}</td>`).join('')}</tr>`;
  t += `<tr><td>Applications</td>${ents.map(e => `<td>${fmt(e.n)}</td>`).join('')}</tr>`;
  t += `<tr><td>Families</td>${ents.map(e => `<td>${fmt(e.fams)}</td>`).join('')}</tr>`;
  GROUPS.forEach((g, i) => { if (ents.some(e => e.g[i])) t += `<tr><td>${esc(g.label)}</td>${ents.map(e => `<td>${v(e.g[i], e.n)}</td>`).join('')}</tr>`; });
  JUR.forEach((j, i) => { t += `<tr><td>Family member at ${j.k}</td>${ents.map(e => `<td>${v(e.jj[i], e.n)}</td>`).join('')}</tr>`; });
  $('#cmpTable').innerHTML = t + '</tbody>';
  const keys = GROUPS.map(g => g.label);
  stack100($('#cmpTech'), ents.map(e => ({ l: e.name.length > 18 ? e.name.slice(0, 17) + '…' : e.name, n: e.n, v: Array.from(e.g) })), keys, GCOL, { abs: cmpNorm === 'abs', aria: 'technology profile' });
  const ql = []; for (let i = 0; i < MONTHS.length; i += 3) ql.push(MONTHS[i].slice(2));
  const pal = d3.schemeTableau10;
  lineChart($('#cmpTrend'), ents.map((e, i) => { const s = q(e.ser); return { n: e.name.slice(0, 14), c: pal[i % 10], v: cmpNorm === 'pct' ? s.map(x => e.n ? Math.round(1000 * x / e.n) / 10 : 0) : s }; }), ql, { aria: 'filing trend', h: 190 });
  stack100($('#cmpCpc'), ents.map(e => ({ l: e.name.length > 18 ? e.name.slice(0, 17) + '…' : e.name, n: e.n, v: Array.from(e.cp) })), CPCSUB, ['#3b6fb6', '#6a8f2f', '#c4572d', '#2b8a86', '#b5487a', '#7d5aa6', '#1f9bcf', '#c08a1e'], { abs: cmpNorm === 'abs', aria: 'cpc profile' });
  stack100($('#cmpJur'), ents.map(e => ({ l: e.name.length > 18 ? e.name.slice(0, 17) + '…' : e.name, n: e.n, v: Array.from(e.jj) })), JUR.map(j => j.k), ['#7b8783', '#2f6fde', '#c4572d', '#6a8f2f', '#a3a3a3', '#b5487a', '#e8833a'], { abs: cmpNorm === 'abs', aria: 'jurisdictions' });
}

// ------------------------------------------------------------------ methodology
function renderMethod() {
  const ov = D.meta.overrides.map(([n, t]) => `${esc(n)} → ${esc(t)}`).join('; ');
  const q = D.meta.geoqc || {};
  const inst = d3.range(NA).filter(a => A.typ[a] !== 4), ind = d3.range(NA).filter(a => A.typ[a] === 4);
  const cnt = (arr, k) => arr.filter(a => LO.p[a] === k).length;
  const row = k => `<tr><td>${LPREC[k].label}</td><td class="mono">${fmt(cnt(inst, k))}</td><td class="mono">${pct(cnt(inst, k) / inst.length)}</td><td class="mono">${fmt(cnt(ind, k))}</td></tr>`;
  const src = d3.rollups(inst.filter(a => LO.stype[a]), v => v.length, a => LO.stype[a].startsWith('Manual') ? 'Manual web verification' : LO.stype[a]).sort((x, y) => y[1] - x[1]);
  const lq = D.meta.locqc || {}; const bp = lq.by_precision || {};
  const erow = (k, l) => bp[k] ? `<tr><td>${l}</td><td class="mono">${fmt(bp[k].entities)}</td><td class="mono">${pct(bp[k].share_entities)}</td><td class="mono">${pct(bp[k].share_links)}</td></tr>` : '';
  const nSites = (D.sites || []).length, multi = [...SITES_OF.values()].filter(v => v.length > 1).length;
  $('#methBody').innerHTML = `
<p><b>Source.</b> ${esc(D.meta.source)}. Queried ${esc(D.meta.queried)}. Every figure is recomputed in the browser from the ${fmt(N)} application records and ${fmt(NA)} applicant groups in <span class="mono">data/</span>. Latest publication in the data: EP ${esc(D.meta.latest.EP)}, DE ${esc(D.meta.latest.DE)}, FR ${esc(D.meta.latest.FR)}, GB ${esc(D.meta.latest.GB)}.</p>
<p>This dashboard uses the same front end as the <a href="https://fini96.github.io/PatentScreen-Semiconductors-Quantum/" target="_blank" rel="noopener">CNIPA &amp; TIPO atlas</a>: identical map, colours, location rules and charts. The datasets are not combined, and the two technology taxonomies differ (see below).</p>
<h3>Dataset</h3>
<p>Patent applications first published between 1 Nov 2024 and the data cut-off at the European Patent Office or a national office of the 39 EPO member states, excluding every application filed via the PCT route. Selected by CPC: H10D, H10B, H10W, H10P, H10N60, G06N10, G06F30/39 and B82Y10 (with a quantum keyword); LED, solar-cell and OLED filings (H10H, H10F, H10K) without a device or quantum code are excluded. Italian national records end in December 2025 and British records thin out in 2026.</p>
<h3>What is counted</h3>
<ul><li><b>Applications</b>: each application counted once (later publications of the same application merged).</li>
<li><b>Families</b>: distinct DOCDB family IDs among the filtered applications.</li>
<li><b>Co-applicants</b>: <i>full count</i> credits an application to every co-applicant; <i>fractional</i> credits 1/n to each of n applicant groups. Dataset, country and type totals always count each application once.</li>
<li><b>Technology</b>: the EP study taxonomy of 61 categories, shown here in 7 groups (transistors, materials, memory, integration, design, quantum, processes). Applications flagged in a group by CPC without matching a specific category are listed as “Other … (no sub-category)” so that group totals are complete. This taxonomy is <b>not</b> the 65-category taxonomy of the CNIPA &amp; TIPO study; compare technology results between the two only through a mapping.</li></ul>
<h3>Applicants</h3>
<p>Names follow the study's grouping: 51 rules merge name variants and subsidiaries under a parent (e.g. all Infineon entities). <b>Startups</b> are only identified for the Wikidata-verified groups (about the 60 largest): founded 2015 or later, no parent organisation, not a carve-out. All other companies are shown as “Company”. <b>Private inventors</b> are natural persons named as applicants whose name matches an inventor on the same application.</p>
<h3>Applicant locations</h3>
<p>The unit that is located is the <b>applicant name on the filing</b> (the legal entity, e.g. “Infineon Technologies Austria AG”), so a subsidiary is placed at its own address and never inherits its parent's headquarters. A group whose filing entities sit in different places has one dot per place (${fmt(nSites)} places for ${fmt(NA)} groups; ${fmt(multi)} groups have several). The group's main location shown in lists is the place of its largest filing entity. Sources, in order of preference (verified ${esc(D.meta.geo_verified)}):</p>
<ol><li><b>Wikidata</b>: the organisation's headquarters statement (P159) with its coordinate qualifier where given, otherwise the headquarters town; for organisations without P159 their own coordinates (P625). A match must be an organisation in the applicant's country and not a broader parent name (e.g. “LG Group” for “LG Electronics”).</li>
<li><b>USPTO applicant addresses</b> (PatentsView, US patents to 2021): the most frequent address on the entity's own US patents, re-geocoded against the Overture Maps town gazetteer; ambiguous town names and province-only addresses are not used.</li>
<li><b>Manual web verification</b> for the largest remaining applicants (registers, official websites, annual reports); for Chinese entities, the registering city stated in the legal name.</li></ol>
<table><tr><th>Precision (filing entities)</th><th>Entities</th><th>Share</th><th>Share of applicant mentions</th></tr>${erow('exact headquarters', 'Exact site')}${erow('city', 'City')}${erow('region', 'Province only')}${erow('country', 'Country only')}${erow('unknown', 'Unknown')}</table>
<table><tr><th>Location precision (applicant groups, main place)</th><th>Institutional applicants</th><th>Share</th><th>Private inventors</th></tr>${['E', 'C', 'R', 'K', 'U'].map(row).join('')}</table>
<p>Location sources used (groups, main place): ${src.map(([s, n]) => `${esc(s.split(' (')[0])} ${fmt(n)}`).join(' · ')}. Private inventors are not geocoded below country level and their addresses were not searched.</p>
<h3>Geographic quality checks</h3>
<ul><li>Every drawn point lies inside its applicant's country on the Natural Earth 1:10m map (${fmt(q.points || 0)} points checked, ${fmt(q.mismatch || 0)} mismatches); ${fmt(q.coastal || 0)} points on coasts fall just outside the generalised coastline (all within ${q.coastal_maxkm ?? '–'} km).</li>
<li>Latitude/longitude order verified: no point would fall in its own country with the axes swapped (${fmt(q.swapped || 0)} cases).</li>
<li>No national centroids are used. Applicants known only to country or province level are drawn as dashed group circles at a label point. ${fmt(q.distinct || 0)} distinct coordinates are used; the largest shared ones are city centres (e.g. ${esc((q.stacks || []).slice(0, 3).map(s => `${s[0]} ${fmt(s[1])}`).join(', '))}), which fan out on click.</li>
<li>Patent totals are unchanged by the geocoding (${fmt(N)} applications, ${fmt(D.meta.locqc ? NA : NA)} applicant groups).</li></ul>
<p>Full lists: <span class="mono">data/applicant_locations.json</span> (one record per applicant ID, same fields as the CNIPA &amp; TIPO atlas, plus the places of its filing entities), <span class="mono">data/unverified_locations.csv</span> and <span class="mono">GEO_QUALITY_REPORT.md</span>.</p>
<h3>Map</h3>
<p>MapLibre GL JS (bundled) with OpenStreetMap vector tiles from OpenFreeMap (no API key). If those tiles cannot be loaded, the map falls back to Natural Earth 1:10m borders, provincial boundaries and cities shipped with the site; country shading uses the Natural Earth 1:10m polygons.</p>
<p><b>Mode B (inventor location)</b> uses the inventor countries in Google's harmonised inventor data (country only). <b>Mode C (filing jurisdiction)</b> uses family members at EP, US, JP, KR, WO, CN and TW${FAMJUR ? '' : ' (look-up not loaded in this build)'}; EP and WO are never treated as a country of origin.</p>
<h3>Limitations</h3>
<ul><li>Excluding PCT removes most filings of PCT-heavy applicants (e.g. Qualcomm, Applied Materials, Quantinuum), so the map shows direct European filing activity.</li>
<li>City-level locations are city centres; a company may have moved since its US patents were granted (until 2021).</li>
<li>About 40% of institutional filing entities, carrying about 10% of applicant mentions, could not be located below country level; most are small applicants with one or two filings.</li>
<li>Most frequent CPC groups and the “selected publications” list are stored per applicant without filters; everything else follows the filters.</li></ul>`;
}
$('#btnMethod').onclick = () => { renderMethod(); $('#methOverlay').hidden = false; };
$('#methClose').onclick = () => { $('#methOverlay').hidden = true; };
$('#methOverlay').addEventListener('click', e => { if (e.target.id === 'methOverlay') e.target.hidden = true; });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { $('#methOverlay').hidden = true; $('#cmpOverlay').hidden = true; hideTip(); } });

// ------------------------------------------------------------------ mode & side toggle
segBind('#modeSeg', 'mode', v => { mode = v; clearSpider(); paintCountries(); renderLegend(); renderModeExtras(); drawOverlay(); renderSide(); });
$('#btnSide').onclick = () => { const m = $('#main'); const c = m.classList.toggle('collapsed'); $('#btnSide').textContent = c ? 'Show sidebar' : 'Hide sidebar'; $('#btnSide').setAttribute('aria-pressed', String(!c)); setTimeout(sizeMap, 30); };

// ------------------------------------------------------------------ update cycle
function update() {
  compute(); syncChips(); renderKPIs(); paintCountries(); renderLegend(); renderModeExtras(); drawOverlay(); renderSide(); renderCharts(); renderCompare();
}
$('#coverage').textContent = `${D.meta.window} · latest publication in data: EP ${D.meta.latest.EP}, DE ${D.meta.latest.DE} · ${fmt(N)} applications · ${fmt(NA)} applicant groups · sources: Google Patents Public Datasets (BigQuery); applicant locations verified ${D.meta.geo_verified}`;
buildFilters(); syncTechMenu(); syncCountryMenu();
compute(); syncChips(); renderKPIs(); renderSide(); renderCharts(); renderModeExtras();
$('#loading').remove();
await initMap();
update();
window.__atlas = { map: () => map, R: () => R, openApplicant, openCountry, focusApplicant, basemap: () => basemapKind, F: () => F, update };
let rt; new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => { sizeMap(); renderCharts(); }, 150); }).observe($('#mapbox'));
const retheme = () => { themeMap(); paintCountries(); renderLegend(); renderCharts(); };
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', retheme);
new MutationObserver(() => { retheme(); renderSide(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();
