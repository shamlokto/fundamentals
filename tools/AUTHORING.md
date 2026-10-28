# Writing a generated deck

Generated decks live in `src/<slug>.js` and are built into `decks/<slug>/index.html` by

    python3 tools/build.py <slug>

The build wraps the source in the shared page (`tools/base_head.html`), the shared helpers
of the hand-built decks (`tools/base_helpers.js`), the generic helpers in `tools/lib.js`, and
the runtime (`tools/base_runtime.html`), then syntax-checks the script with `node --check`.

Good examples to copy: `src/energy-redox.js`, `src/motility.js`,
`src/respiration.js`, `src/central-metabolism.js`.

## File layout

```
/*META
{"title":"Two to Four Words","eyebrow":"Section · an animated primer","h1":"A sentence-case headline",
 "parts":["Part one","Part two"],"foot":"One sentence on simplifications and where to check figures.",
 "description":"One sentence listing the topics."}
META*/
function scX1(n){ ... return {vb:..., s:...}; }   // one function per plate
const S=[ {p:1,title:'Plate title',draw:scX1,text:"Narration, 2–4 sentences."}, ... ];
const CHIPS={};          // or {key:{list:[...labels],get:()=>sel,set:k=>sel=k}} for interactive plates
```

* `n` is true on phone width. Wide plates use a 640-unit-wide viewBox (`wide(h)`), phone plates 360 (`slim(h)`).
  Every plate must lay out for both.
* Each plate returns `{vb, s}` where `s` is SVG markup and `vb` is `wide(height)` or `slim(height)`.
* An interactive plate has `chips:'key'` in its `S` entry and reads its selection from a `let xSel=0;`.
* Use plain Unicode for sub/superscripts (CO₂, NH₄⁺, Fe³⁺) but avoid long superscript exponents such as
  10⁻¹⁰ (they render badly in the plate font): write "1 in 10 billion" instead.

## Helpers (all already defined)

Text and layout
* `T(x,y,text,cls)`: text. Classes: `lab` (roman), `note` (italic, muted), `cname` (larger roman), `mono`,
  `acc` (accent colour), anchors `start|mid|end`, sizes `f10`–`f16`, `halo` (paper-coloured outline so
  labels stay readable over lines).
* `Tc(x,y,text,fill,fs,cls,weight)`: coloured text.
* `G('a-fade',delay,inner)`: animated group (`a-fade`, `a-pop`).
* `para(x,y,text,wrapChars,cls,lineH,delay)` → `{s,y}`: wrapped paragraph.
* `bullets(x,y,[[head,body],...],wrapChars,{d0,gap})` → `{s,y}`: numbered points.
* `cards(n,[[head,body],...],{y,cols,num,cw})` → `{s,y}`: grid of boxed cards (2 columns wide, 1 on phone).
* `wtable(n,headers,rows,cols,{y0,d0,R})` → `{s,y}`: table; `cols` is `[[x,wrapChars],...]` (give different
  values for n and wide).
* `explorer(n,{h,sub,rows:[[k,v]],pros,cons,note,art,artH},{y})` → `{vb,s}`: a whole interactive "card" plate.
* `introPlate(n,{q,belief,items,art:(cx,cy,n)=>svg,artH})` → `{vb,s}`: the opening plate.
* `artBullets(n,art,artW,artH,items,{foot})` → `{vb,s}`: picture left, points right.

Diagrams
* `flow(nodes,edges)`: boxes and arrows. `nodes={id:{x,y,w,t:'line1|line2',f:fill,sub}}` (x,y = centre),
  `edges=[[from,to,'label|second line',{side:±1,off,bend,dash:'4 3',both:1,red:1,blue:1}]]`. Arrows start and
  end at box edges automatically. Labels sit beside the arrow, on `side`.
* `cycle(cx,cy,R,[{t,w,f},...],{labs:[...],lr})`: boxes around a circle joined by arcs, labelled outside.
* `axes(x,y,w,h,{xr,yr,xt,yt,xlab,ylab,logx})` → `A` with `A.px(v)`, `A.py(v)`; `curve(A,f,{col,from,to})`.
  Every plotted axis needs a title: `build.py` warns about any `axes()` call without `xlab` or `ylab`.
* `hbars(n,x,y,w,[[label,value,colour,valueText]],{max,lw})` → `{s,y}`: horizontal bar chart.
* `arw(x1,y1,x2,y2,{w,red,blue,q:[cx,cy]})`: single arrow. `inh(x1,y1,x2,y2,{drug,w,dash,dx,dy})`: inhibition, a red
  line ending in a short perpendicular bar at (x2,y2), with the drug named in red italics at the tail (use it, never a
  red arrow, for drug ⊣ target). `ln(...)`, `box(x,y,w,h,fill,rx)`, `blob(cx,cy,rx,ry,fill)`.
* Drawings: `rodCell2(cx,cy,L,R)`, `coccus(cx,cy,r,{fill})`, `membraneBand(x1,x2,y,h,{sides:['outside','cytoplasm'],sideX})`
  (labels the two faces), `dsDNA(x1,x2,y,col,gap,{ends:true|'rev',top,bottom})` (`ends` labels 5′/3′ outside both strands;
  `top`/`bottom` colour one strand, e.g. `bottom:NEW`), `ribosome(cx,my,k,{trnas,codons,sites})` (E/P/A are labelled
  whenever `trnas` are given; `sites:false` turns them off),
  `dish(cx,cy,R,colonies)`, `colonySet(n,seed,R)`, `tube(...)`, `flask(...)`, `mouse(cx,cy,k)`, `pill(x,y,text,fill)`.
* Colours: `PAL.sand|blue|green|rose|gold|lilac|teal|grey`, `INK`, `RED`, `BLUE`, `GREEN`, `DNAC`, `NEW`.
  `CAT[0..7]`: neutral washes for categories with no meaning (gene A, B, C; systems; steps), in a fixed order
  (blue, green, gold, lilac, teal, sand, grey, cream). Use them instead of `RED`, `BLUE`, `GREEN` or `RNAC` for categories
  (`tools/STYLE.md` §2).

## Checking

All checking tools live in `tools/` and need Python 3 with Pillow, Node, and Playwright with Chromium
(`tools/pw.js` finds them; set `PLAYWRIGHT_MODULE` or `CHROMIUM_PATH` if they are somewhere unusual).

    tools/check_all.sh                  # build every generated deck, then audit every deck (no screenshots)
    tools/check_all.sh --shots          # the same, with screenshots of every plate at both widths
    node tools/audit.js <slug> ...      # audit chosen decks; report in .audit/report.json, shots in .audit/shots
    NOSHOT=1 node tools/audit.js <slug> # faster, no screenshots
    python3 tools/sheet.py <slug> wide  # contact sheets from the shots (also: narrow) in .audit/sheets
    node tools/plates.js <slug>         # settled screenshots of every plate and chip, in .audit/plates
    python3 tools/site_check.py         # links, local assets, page weight, lang/title/description/Open Graph
    python3 tools/meta.py [--write]     # add description and Open Graph tags to hand-built decks

The audit loads the real web fonts, since label widths depend on them; offline, set `AUDIT_NOFONTS=1` to
measure with fallback fonts instead (results then differ from what readers see). `.audit/` is git-ignored.

CI on GitHub is the reference result. Its Chromium sets text slightly wider than local containers, so
local runs flag text within 4% of the plate edge as an early warning (CI flags only text that actually
crosses it). If CI fails on a plate that passes locally, download the `audit-report` artifact from the
failed run and fix what it lists. Set `AUDIT_OUT=dir` to write somewhere else (useful when several people audit at once).

The audit flags overlapping text, arrows running through text, crossing arrows, text cut off at the plate
edge, page errors and console errors, at desktop (900 px) and phone (390 px) width and for every chip. It
exits non-zero on any finding not listed in `tools/audit_ignore.json` (known false positives, as regular
expressions over keys such as `woese/wide/05`). Fix every finding, then look at every contact sheet and fix
anything else that overlaps or looks wrong (labels on lines, arrows into boxes, text spilling out of boxes).
Rotated labels can trigger false text-text flags; judge those by eye and add them to the ignore list only
when a person has checked them.

Plate text must not be smaller than 12 px: the classes `f8` to `f16` and `Tc()` sizes are floored at 12.

## Content rules

* Accurate, specific and teachable: names, dates and numbers you are confident of; round when unsure;
  never invent citations. Bacteria first, eukaryotic comparisons where useful.
* British spelling, plain sentences, no em-dash chains, no marketing tone.
* 6–9 plates per deck, at least one interactive (chips) plate and at least two real diagrams
  (flow, cycle, plot or drawing), not only cards and tables.

## Password protection

The live site is published by `.github/workflows/pages.yml`, which runs

    SITE_PASSWORD=... node tools/protect.mjs _site

and deploys `_site/`. Every HTML page is AES-GCM encrypted under the password and replaced by
an unlock page; one correct entry unlocks every page in that browser. The password lives only
in the repository secret `SITE_PASSWORD`; to change it, update the secret and re-run the
workflow. The key is derived with a fixed salt, so readers stay unlocked across deploys; changing
the password (or setting an optional `SITE_SALT` secret) signs everyone out. To lock a browser again, clear the site's storage (key `fundamentals-key`).
The five portrait JPEGs under `decks/` are copied unencrypted.
