"""Add the 'Filing route' filter (direct vs PCT) to the EP atlas front end.
Usage: python3 patch_route.py <app.js> <index.html> [<more html files>...]
Runs after patch_frontend.py; every replacement is asserted."""
import sys
def patch(path, reps):
    s = open(path, encoding="utf-8").read()
    for a, b in reps:
        assert s.count(a) == 1, (path, a[:80], s.count(a))
        s = s.replace(a, b)
    open(path, "w", encoding="utf-8").write(s)
JS = [
 ("const off = new Uint8Array(N), pm", "const rte = new Uint8Array(N), off = new Uint8Array(N), pm"),
 ("  off[i] = +f[0]; pm[i] = +f[1];", "  rte[i] = +(f[10] || 0); off[i] = +f[0]; pm[i] = +f[1];"),
 ("offices: new Set(), jur: new Set(),", "offices: new Set(), route: new Set(), jur: new Set(),"),
 ("    if (offSel && !offSel.has(offKey(off[d]))) continue;\n", "    if (offSel && !offSel.has(offKey(off[d]))) continue;\n    if (F.route.size && !F.route.has(rte[d])) continue;\n"),
 ("  $('#officeChips').addEventListener('click',",
  "  $('#routeChips').innerHTML = [[0, 'Direct', 'Filed directly at the EPO or a national office'], [1, 'PCT route', 'Euro-PCT applications entering the European phase, and German PCT national-phase entries']].map(([k, l, t]) => `<button class=\"chip\" type=\"button\" data-r=\"${k}\" aria-pressed=\"false\" title=\"${t}\">${l}</button>`).join('');\n  $('#routeChips').addEventListener('click', e => { const b = e.target.closest('button[data-r]'); if (!b) return; const k = +b.dataset.r; F.route.has(k) ? F.route.delete(k) : F.route.add(k); update(); });\n  $('#officeChips').addEventListener('click',"),
 ("  $('#officeChips').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(F.offices.has(b.dataset.o))));",
  "  $('#officeChips').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(F.offices.has(b.dataset.o))));\n  $('#routeChips').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(F.route.has(+b.dataset.r))));"),
 ("  if (F.offices.size) parts.push('at ' + [...F.offices].join(', '));",
  "  if (F.offices.size) parts.push('at ' + [...F.offices].join(', '));\n  if (F.route.size === 1) parts.push(F.route.has(1) ? 'PCT route' : 'direct filings');"),
]
HTML = [("""      <div class="fgroup"><span class="flabel">Published at</span><span id="officeChips" class="fgroup"></span></div>""",
         """      <div class="fgroup"><span class="flabel">Published at</span><span id="officeChips" class="fgroup"></span></div>
      <div class="fgroup"><span class="flabel">Filing route</span><span id="routeChips" class="fgroup"></span></div>""")]
patch(sys.argv[1], JS)
for h in sys.argv[2:]: patch(h, HTML)
print("route filter added")
