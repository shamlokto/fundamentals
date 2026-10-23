/*META
{"title":"Microbial Growth","eyebrow":"Growth and physiology · an animated primer","h1":"How bacterial populations grow, and what sets the pace","parts":["Batch growth","Continuous culture","Growth laws"],"foot":"Curves and chemostat parameters are illustrative; real growth rates, yields and Monod constants depend on strain, medium and temperature. Persistence and stationary-phase survival are covered in the stress and regulation primers.","description":"The batch growth curve, exponential growth maths, measuring growth, the chemostat and Monod kinetics, growth yield and maintenance energy, and bacterial growth laws including ribosome allocation and the adder model of cell size."}
META*/
/* ---------- shared pieces ---------- */
const GPH=[
 {k:'Lag',a:0,b:2.5,col:PAL.gold,h:'Lag phase',t:'Cells transferred to fresh medium do not divide at once. They repair damage, take up ions, and make the ribosomes and enzymes the new medium needs. The lag is longer when cells come from an old culture or a very different medium, and can vanish when exponential cells go into the same medium.'},
 {k:'Exponential',a:2.5,b:7.5,col:PAL.green,h:'Exponential (log) phase',t:'Every cell divides at a constant rate, so log cell number rises in a straight line. Growth is balanced: every component of the cell increases by the same factor in the same time. Physiology experiments are usually done here, because the cells are as uniform as they ever get.'},
 {k:'Stationary',a:7.5,b:14,col:PAL.blue,h:'Stationary phase',t:'A nutrient runs out or waste products build up, and net growth stops. Cells switch on the σS general stress response, shrink, condense their DNA with Dps and become tougher. Some cells may still divide while others die, so the count stays roughly flat.'},
 {k:'Death',a:14,b:24,col:PAL.rose,h:'Death (decline) phase',t:'Viable counts fall, often exponentially at first, then level off. A small surviving population can persist for months or years in long-term stationary phase, living on the remains of dead siblings while mutants with a growth advantage take over.'}];
let gphSel=1;
const gcurve=t=>5+4/(1+Math.exp(-1.3*(t-5)))-0.28*Math.log(1+Math.exp(1.6*(t-14)))/1.6;
function scG1(n){return introPlate(n,{q:'How fast can a bacterium multiply, and what stops it?',
  belief:'Given food, a bacterium copies itself, and its descendants do the same, so numbers rise exponentially until something runs out. How fast that happens, how big each cell is and how much of the cell is ribosomes all follow simple quantitative rules.',
  items:['The batch growth curve','Exponential growth maths','Measuring growth','The chemostat and Monod kinetics','Yield and maintenance','Growth laws and cell size'],
  art:(cx,cy)=>{const A=axes(cx-90,cy-56,180,100,{xr:[0,24],yr:[4,10],xlab:'time',ylab:'log cells'});
    return A.s+curve(A,gcurve,{col:'#2F5276'});},artH:160});}
function scG2(n){
  const ph=GPH[gphSel];
  const A=n?axes(58,30,282,160,{xr:[0,24],yr:[4,10],xt:[[0,'0'],[6,'6'],[12,'12'],[18,'18'],[24,'24 h']],yt:[[5,'10⁵'],[7,'10⁷'],[9,'10⁹']],xlab:'time',ylab:'cells per mL (log)',ydx:40})
    :axes(78,34,320,200,{xr:[0,24],yr:[4,10],xt:[[0,'0'],[6,'6'],[12,'12'],[18,'18'],[24,'24 h']],yt:[[5,'10⁵'],[7,'10⁷'],[9,'10⁹']],xlab:'time',ylab:'cells per mL (log)',ydx:40});
  let s=`<rect x="${FX(A.px(ph.a))}" y="${A.y}" width="${FX(A.px(ph.b)-A.px(ph.a))}" height="${A.h}" fill="${ph.col}" opacity=".45"/>`;
  s+=A.s;
  s+=GPH.map(p=>T(FX((A.px(p.a)+A.px(p.b))/2),A.y-6,p.k==='Exponential'?(n?'exp.':'exponential'):p.k.toLowerCase(),'note mid f10')).join('');
  s+=G('a-fade',.2,curve(A,gcurve,{col:'#2F5276'}));
  if(gphSel===3)s+=G('a-fade',.5,curve(A,t=>gcurve(t)-0.0,{col:'#2F5276',from:14,to:24})+T(FX(A.px(23.5)),FX(A.py(gcurve(23.5))-10),'survivors','note end f10 halo'));
  if(gphSel===1)s+=G('a-fade',.5,ln(FX(A.px(3.5)),FX(A.py(gcurve(3.5))),FX(A.px(6.5)),FX(A.py(gcurve(3.5))),'#A4473A',1.2,'3 3')+ln(FX(A.px(6.5)),FX(A.py(gcurve(3.5))),FX(A.px(6.5)),FX(A.py(gcurve(6.5))),'#A4473A',1.2,'3 3')+T(FX(A.px(6.5)+6),FX((A.py(gcurve(3.5))+A.py(gcurve(6.5)))/2+4),'slope = μ','note start f11 halo'));
  const tx=n?16:428, ty=n?A.y+A.h+60:50;
  s+=G('a-fade',.3,T(tx,ty,ph.h,'cname start f15'));
  const p=para(tx,ty+22,ph.t,n?50:30,'note start f13',17,.5);
  const H=n?p.y+6:Math.max(p.y+8,A.y+A.h+48);
  return {vb:n?slim(H):wide(H),s:s+p.s};
}
function scG3(n){
  const eq=[['N = N₀ · 2ⁿ','n generations; n = t / g, where g is the doubling time'],['μ = ln 2 / g ≈ 0.69 / g','specific growth rate, per hour'],['ln N = ln N₀ + μt','a straight line on a log plot, slope μ'],['n = 3.3 × (log₁₀ N − log₁₀ N₀)','generations from two counts']];
  let s='', y=34; const x=n?16:24;
  eq.forEach((e,i)=>{s+=G('a-fade',(i*.25).toFixed(2),T(x,y,e[0],'mono start f14')+T(n?x:x+250,n?y+18:y,e[1],'note start f12'));y+=n?42:26;});
  const ex=para(x,y+6,'Worked example: E. coli in rich broth at 37 °C doubles about every 20 minutes, so μ ≈ 2.1 per hour. Unchecked, one cell would leave about 4 × 10²¹ descendants in a day, and after two days they would outweigh the Earth. Exponential growth never lasts long.',n?50:92,'lab start f13',17,1);
  s+=ex.s;
  const items=[['Vibrio natriegens',1.0,PAL.green,'~10 min'],['E. coli, rich broth',1.3,PAL.green,'~20 min'],['E. coli, glucose minimal',1.78,PAL.blue,'~60 min'],['baker’s yeast',1.95,PAL.lilac,'~90 min'],['Mycobacterium tuberculosis',3.08,PAL.rose,'~20 h'],['Prochlorococcus, in the sea',3.16,PAL.rose,'~1 day']];
  const t=T(x,ex.y+18,'Typical doubling times (log scale)','note start f12');
  const h=hbars(n,n?6:24,ex.y+30,n?344:560,items,{max:3.3,lw:n?150:200,vw:56});
  return {vb:n?slim(h.y+4):wide(h.y+6),s:s+t+h.s};
}
function scG4(n){
  let s='';const y=n?78:80, x0=n?36:60, dx=n?52:70;
  const labs=['culture','1/10','1/100','1/1000'];
  for(let i=0;i<4;i++)s+=G('a-fade',(i*.15).toFixed(2),tube(x0+i*dx,y+28,{h:58,w:18,turbid:i<2,seed:3+i,label:labs[i]}));
  for(let i=0;i<3;i++)s+=arw(x0+i*dx+12,y-36,x0+(i+1)*dx-12,y-36,{q:[x0+i*dx+dx/2,y-54],w:1.2});
  s+=T(x0+1.5*dx,y-58,n?'0.1 mL into 0.9 mL':'1 mL into 9 mL each step','note mid f11 halo');
  const dx1=n?x0+3*dx+50:x0+3*dx+90;
  s+=G('a-fade',.7,arw(x0+3*dx+14,y,dx1-34,y,{w:1.2})+dish(dx1+(n?6:10),y,n?30:36,colonySet(n?27:42,11,n?30:36),{label:n?'count':'42 colonies'}));
  if(!n)s+=G('a-fade',.9,T(dx1+60,y-6,'0.1 mL plated from the','note start f11')+T(dx1+60,y+8,'1/1000 tube → 42 × 10 × 1000','note start f11')+T(dx1+60,y+22,'= 4.2 × 10⁵ CFU per mL','note start f11'));
  const rows=[['Optical density (OD₆₀₀)','light scattered by all cells, live or dead','fast and non-destructive; linear only at low OD; calibrate per instrument and organism (OD 1 is very roughly 10⁹ E. coli per mL)'],
   ['Viable count (CFU)','cells that can form a colony','serial dilution and plating; count plates with about 30–300 colonies; chains and clumps count as one'],
   ['Direct count','all cells in a counting chamber','Petroff–Hausser chamber or haemocytometer under the microscope; counts the dead too'],
   ['Flow cytometry','cells passing a laser, one at a time','fast counts and sizes; with DNA or live/dead stains; routine for marine plankton'],
   ['Most probable number','growth in replicate dilution tubes','a statistical estimate; used for coliforms in water'],
   ['Dry weight, protein','biomass','what yields are expressed in; says nothing about cell number']];
  const t=wtable(n,['Method','Measures','Notes'],rows,n?[[10,12],[110,14],[220,17]]:[[24,18],[180,22],[350,40]],{y0:y+80,d0:.6,R:n?354:620});
  return {vb:n?slim(t.y+6):wide(t.y+8),s:s+t.s};
}
/* ---------- chemostat ---------- */
const CH={mu:1.0,Ks:10,SR:200,Y:0.5};
const CHD=[{k:'D = 0.2 per h',D:.2},{k:'D = 0.5',D:.5},{k:'D = 0.8',D:.8},{k:'D = 0.9',D:.9},{k:'D = 1.0: washout',D:1.0}];
let chSel=1;
const monod=S=>CH.mu*S/(CH.Ks+S);
const chSS=D=>{const Dc=monod(CH.SR);if(D>=Dc)return {S:CH.SR,X:0,P:0,wash:true};const S=CH.Ks*D/(CH.mu-D),X=CH.Y*(CH.SR-S);return {S,X,P:D*X,wash:false};};
function vessel(cx,cy,w,h,dens,seed){
  let s=`<rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="10" fill="${GLASSF}" fill-opacity=".55" stroke="${GLASSE}" stroke-width="1.6"/>`;
  s+=`<rect x="${cx-w/2+3}" y="${cy-h/2+16}" width="${w-6}" height="${h-19}" rx="8" fill="${dens>0?TURB:BROTH}" opacity="${dens>0?FX(.35+.6*dens,2):1}"/>`;
  if(dens>0)s+=microbes(cx,cy+8,w*.38,h*.3,Math.round(4+22*dens),seed);
  return s;}
function scG5(n){
  const c=CHD[chSel], ss=chSS(c.D), dens=ss.X/100;
  let s='';
  const vx=n?180:130, vy=n?96:104;
  const rx=vx-(n?120:100), ox=vx+(n?118:100);
  s+=G('a-fade',0,`<rect x="${rx-22}" y="${vy-40}" width="44" height="70" rx="6" fill="${BROTH}" stroke="${GLASSE}" stroke-width="1.5"/>`+T(rx,vy+46,'fresh','note mid f11')+T(rx,vy+60,'medium','note mid f11')
    +vessel(vx,vy,92,96,dens,5)+T(vx,vy+66,'culture vessel','note mid f11')
    +`<rect x="${ox-20}" y="${vy-6}" width="40" height="46" rx="6" fill="${dens>0?TURB:BROTH}" fill-opacity=".6" stroke="${GLASSE}" stroke-width="1.5"/>`+T(ox,vy+56,'effluent','note mid f11'));
  s+=G('a-fade',.3,`<path d="M${rx} ${vy-40} V${vy-62} H${vx-14} V${vy-46}" stroke="${INK}" stroke-width="1.6" fill="none" marker-end="url(#ahp)"/>`
    +`<circle cx="${(rx+vx)/2}" cy="${vy-62}" r="8" fill="${PAL.gold}" stroke="${INK}"/>`+T((rx+vx)/2,vy-76,'pump, F','note mid f11 halo')
    +`<path d="M${vx+46} ${vy-28} H${ox} V${vy-10}" stroke="${INK}" stroke-width="1.6" fill="none" marker-end="url(#ahp)"/>`+T(vx+46+(ox-vx-46)/2+(n?0:4),vy-34,'overflow','note mid f11 halo'));
  const ax=n?{x:58,y:vy+104,w:270,h:130}:{x:330,y:40,w:270,h:140};
  const A=axes(ax.x,ax.y,ax.w,ax.h,{xr:[0,200],yr:[0,1.1],xt:[[0,'0'],[100,'100'],[200,'200']],yt:[[0,'0'],[.5,'0.5'],[1,'1.0']],xlab:'substrate S (mg/L)',ylab:'μ (per h)'});
  s+=A.s+G('a-fade',.4,curve(A,monod,{col:'#2F5276'})+ln(A.x,FX(A.py(CH.mu)),A.x+A.w,FX(A.py(CH.mu)),'#6A5B47',.8,'2 3')+T(A.x+A.w,FX(A.py(CH.mu)-5),'μmax','note end f10 halo')
    +ln(A.x,FX(A.py(c.D)),FX(A.px(Math.min(ss.S,200))),FX(A.py(c.D)),'#A4473A',1.4,'4 3')+(ss.wash?'':`<circle cx="${FX(A.px(ss.S))}" cy="${FX(A.py(c.D))}" r="4.5" fill="#A4473A"/>`)
    +T(FX(A.px(ss.wash?100:Math.max(ss.S,40))+8),FX(A.py(c.D)+(c.D>.85?16:-8)),ss.wash?'D above μ at any S':'μ = D at S*','note start f11 halo'));
  const by=n?A.y+A.h+80:A.y+A.h+60;
  const rows=ss.wash?[['Steady state','none: cells are washed out faster than they can divide'],['Residual substrate','S rises to the feed concentration, 200 mg/L'],['Critical D','μmax·S_R/(Ks+S_R) ≈ 0.95 per hour']]
    :[['Growth rate','μ = D = '+c.D.toFixed(1)+' per h (doubling '+Math.round(60*Math.LN2/c.D)+' min)'],['Residual substrate','S* = Ks·D/(μmax − D) = '+FX(ss.S,1)+' mg/L'],['Biomass','X* = Y(S_R − S*) = '+FX(ss.X,0)+' mg/L'],['Productivity','D·X* = '+FX(ss.P,0)+' mg/L per h']];
  let yy=by;const kx=n?16:24, vx2=n?122:190;
  s+=G('a-fade',.5,T(kx,yy-22,'Steady state at '+c.k.replace(': washout',''),'cname start f15'));
  rows.forEach((r,i)=>{const L=wrap(r[1],n?29:56);s+=G('a-fade',(.6+i*.08).toFixed(2),T(kx,yy,r[0],'lab start f13')+L.map((l,j)=>T(vx2,yy+j*16,l,'mono start f12')).join(''));yy+=L.length*16+8;});
  const p=para(kx,yy+8,'Illustrative values: μmax 1.0 per h, Ks 10 mg/L, feed S_R 200 mg/L, yield 0.5. In a chemostat the dilution rate D = F/V, not the medium, sets the growth rate: if cells grow faster than D they consume substrate until μ falls back to D.',n?50:92,'note start f13',17,.9);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:s+p.s};
}
function scG6(n){
  const A=n?axes(58,36,270,150,{xr:[0,1],yr:[0,2.4],xt:[[0,'0'],[.5,'0.5'],[1,'1.0']],yt:[[0,'0'],[1,'1'],[2,'2']],xlab:'growth rate μ (per h)',ylab:'qS (g/g per h)'})
    :axes(70,40,280,180,{xr:[0,1],yr:[0,2.4],xt:[[0,'0'],[.5,'0.5'],[1,'1.0']],yt:[[0,'0'],[1,'1'],[2,'2']],xlab:'growth rate μ (per h)',ylab:'qS (g/g per h)'});
  const m=.25,Ym=.5;
  let s=A.s+G('a-fade',.3,curve(A,u=>u/Ym+m,{col:'#2F5276'})+curve(A,u=>u/Ym,{col:'#6A5B47',dash:'4 3',w:1.4}));
  s+=G('a-fade',.6,`<circle cx="${A.x}" cy="${FX(A.py(m))}" r="4" fill="#A4473A"/>`+T(A.x+8,FX(A.py(m)-8),'m: maintenance','note start f11 halo')
    +T(FX(A.px(.62)),FX(A.py(.62/Ym+m)-10),'slope 1/Ymax','note end f11 halo')+T(FX(A.px(.78)),FX(A.py(.78/Ym)+18),'no maintenance','note start f11 halo'));
  const items=[['Pirt’s equation (1965)','qS = μ/Ymax + m. Substrate is spent on growth and on maintenance; dividing by μ gives 1/Yobs = 1/Ymax + m/μ, so the observed yield falls at low growth rates.'],['What maintenance pays for','Turnover of proteins and RNA, repair, motility, and keeping ion gradients against leaks. Measured from chemostats run at several dilution rates.'],['Typical yields','Aerobic E. coli on glucose makes about 0.5 g dry cells per g glucose; fermenting cells make far less. Per ATP, yields are about 10 g dry cells per mole (YATP, Bauchop and Elsden 1960).']];
  const b=n?bullets(24,A.y+A.h+64,items,44,{d0:.9,gap:20}):bullets(390,50,items,30,{d0:.9,gap:18});
  const H=n?b.y-4:Math.max(b.y-4,A.y+A.h+50);
  return {vb:n?slim(H):wide(H),s:s+b.s};
}
function scG7(n){
  const A=n?axes(58,36,270,170,{xr:[0,2],yr:[0,.6],xt:[[0,'0'],[1,'1'],[2,'2']],yt:[[0,'0'],[.2,'0.2'],[.4,'0.4'],[.6,'0.6']],xlab:'growth rate λ (per h)',ylab:'RNA / protein',ydx:38})
    :axes(74,40,290,200,{xr:[0,2],yr:[0,.6],xt:[[0,'0'],[1,'1'],[2,'2']],yt:[[0,'0'],[.2,'0.2'],[.4,'0.4'],[.6,'0.6']],xlab:'growth rate λ (per h)',ylab:'RNA / protein',ydx:38});
  const r=l=>.087+l/4.5;
  let s=A.s+G('a-fade',.3,curve(A,r,{col:'#2F5276',from:.2,to:1.9}));
  const meds=[.5,1.0,1.6];
  s+=G('a-fade',.4,meds.map(l=>`<circle cx="${FX(A.px(l))}" cy="${FX(A.py(r(l)))}" r="4" fill="#2F5276"/>`).join(''));
  s+=G('a-fade',.7,meds.map(l=>curve(A,u=>r(l)+(l-u)*(.5-r(l))/l,{col:'#A4473A',dash:'4 3',w:1.4,from:l*.25,to:l})).join(''));
  s+=G('a-fade',.9,T(FX(A.px(1.95)),FX(A.py(r(1.9))+20),'richer media','note end f11 halo')+T(FX(A.px(.12)),FX(A.py(.56)),'+ chloramphenicol','note start f11 halo'));
  const items=[['Copenhagen, 1958','Schaechter, Maaløe and Kjeldgaard found that in Salmonella grown in different media, cell mass and RNA per cell rose exponentially with growth rate. Growth rate, not the medium itself, set cell composition.'],['A linear law, 2010','Scott, Hwa and colleagues showed that in E. coli the ribosome share of the proteome rises linearly with growth rate when nutrients are varied: faster growth needs more ribosomes, each working near full speed.'],['The other line','Slowing translation with chloramphenicol makes cells raise their ribosome share as growth falls (red). Together the lines describe a proteome split between ribosomes, metabolic enzymes and a fixed core.']];
  const b=n?bullets(24,A.y+A.h+62,items,44,{d0:1,gap:20}):bullets(400,50,items,29,{d0:1,gap:16});
  const H=n?b.y-4:Math.max(b.y-4,A.y+A.h+50);
  return {vb:n?slim(H):wide(H),s:s+b.s};
}
function scG8(n){
  const A=n?axes(58,36,270,150,{xr:[.5,1.5],yr:[0,1.6],xt:[[.5,'small'],[1,'average'],[1.5,'large']],yt:[[0,'0'],[1,'1']],xlab:'size at birth',ylab:'size added'})
    :axes(70,40,270,180,{xr:[.5,1.5],yr:[0,1.6],xt:[[.5,'small'],[1,'average'],[1.5,'large']],yt:[[0,'0'],[1,'1']],xlab:'size at birth',ylab:'size added'});
  let s=A.s+G('a-fade',.3,curve(A,b=>b,{col:'#6A5B47',dash:'4 3',w:1.4})+curve(A,b=>2-b,{col:'#A4473A',dash:'4 3',w:1.4})+curve(A,b=>1,{col:'#2F5276',w:2.6}));
  s+=G('a-fade',.6,T(FX(A.px(1.48)),FX(A.py(1.48)+16),'timer','note end f11 halo')+T(FX(A.px(1.48)),FX(A.py(.52)-8),'sizer','note end f11 halo')+T(FX(A.px(.56)),FX(A.py(1)-8),'adder (observed)','note start f11 halo'));
  const rng=rnd(4);let dots='';for(let i=0;i<26;i++){const b=.7+rng()*.6,d=1+(rng()-.5)*.28;dots+=`<circle cx="${FX(A.px(b))}" cy="${FX(A.py(d))}" r="2.4" fill="#2F5276" opacity=".55"/>`;}
  s+=G('a-fade',.5,dots);
  const items=[['The adder','E. coli, B. subtilis and Caulobacter add a roughly constant size between birth and division, whatever size they were born at (Campos and colleagues 2014; Taheri-Araghi and colleagues 2015). Deviations from average size shrink by half each generation.'],['Size and growth rate','Average cell size rises roughly exponentially with growth rate across media, as Schaechter and colleagues found. In the Cooper–Helmstetter picture, replication takes about 40 min and division about 20 min more, so fast-growing cells start new rounds before the last has finished.'],['Why not a sizer or a timer?','A timer would let size errors grow; a sizer would need a precise size sensor. An adder is simple and still keeps sizes stable.']];
  const b=n?bullets(24,A.y+A.h+62,items,44,{d0:.9,gap:20}):bullets(380,50,items,31,{d0:.9,gap:16});
  const H=n?b.y-4:Math.max(b.y-4,A.y+A.h+50);
  return {vb:n?slim(H):wide(H),s:s+b.s};
}
const S=[
 {p:1,title:'Growing by doubling',draw:scG1,text:"Bacteria multiply by binary fission: one cell grows and divides into two. Because every new cell can divide again, populations grow exponentially, until a nutrient runs out or waste builds up. Simple rules connect growth rate, cell size and composition."},
 {p:1,title:'The batch growth curve',chips:'phase',draw:scG2,text:"Inoculate a flask of broth and count the cells over a day, and the plot of log cell number against time shows four phases. Pick a phase to see what the cells are doing. The shape changes with the organism and the medium, but the phases are almost universal."},
 {p:1,title:'Exponential growth in numbers',draw:scG3,text:"In exponential growth the number of cells doubles every generation time. The specific growth rate μ, the natural log of two divided by the doubling time, is the slope of the line on a log plot and is the quantity physiologists usually compare. Doubling times range from minutes to days."},
 {p:1,title:'Measuring growth',draw:scG4,text:"There is no single measure of growth. Turbidity is quick but counts dead cells and debris; plate counts give viable cells but take a day and miss clumps and cells that will not grow on the plate. Choose the method that answers the question, and calibrate one against another."},
 {p:2,title:'The chemostat',chips:'chemo',draw:scG5,text:"Monod, and independently Novick and Szilard, described the chemostat in 1950. Fresh medium is pumped in at a fixed rate and culture overflows at the same rate, so cells must grow as fast as they are diluted. Pick a dilution rate: below the critical value a steady state forms; above it the culture washes out."},
 {p:2,title:'Yield and maintenance',draw:scG6,text:"Not all substrate becomes cells. Some is spent just staying alive, and that maintenance cost matters most when growth is slow. Pirt's simple linear model separates the two and is still how yields from chemostats are analysed."},
 {p:3,title:'Ribosomes and growth rate',draw:scG7,text:"Fast-growing bacteria are packed with ribosomes. Since Schaechter, Maaløe and Kjeldgaard's work in Copenhagen in 1958, growth rate has been known to set cell composition. Scott and Hwa's growth laws of 2010 turned this into a quantitative theory of how cells divide their proteome."},
 {p:3,title:'Cell size and the adder',draw:scG8,text:"How does a cell know when to divide? Tracking thousands of single cells in microfluidic channels showed that many bacteria add a fixed amount of size each cycle. This adder behaviour automatically corrects cells born too large or too small within a few generations."}];
const CHIPS={phase:{list:GPH.map(p=>p.k),get:()=>gphSel,set:k=>gphSel=k},chemo:{list:CHD.map(c=>c.k),get:()=>chSel,set:k=>chSel=k}};
