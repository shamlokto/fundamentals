/*META
{"title":"Models of Growth and Spread","eyebrow":"Quantitative literacy · an animated primer","h1":"Writing biology as equations, and knowing when to trust them","parts":["Growth","Interactions","Networks","Epidemics and limits"],"foot":"All curves are computed from the simple equations shown, with illustrative parameters; real systems add lag, noise, space and evolution. Population genetics is treated more fully in the Mutation, Selection and Drift primer.","description":"Why model; exponential and logistic growth; Monod kinetics and the chemostat; Lotka–Volterra predator–prey dynamics; selection as a growth model; flux balance analysis; SIR and SEIR epidemic models; validation and the limits of models."}
META*/
const SIRS=[{k:'R₀ = 0.8',r:.8},{k:'R₀ = 1.5',r:1.5},{k:'R₀ = 2.5',r:2.5},{k:'R₀ = 4',r:4}];
let sirSel=2;
function moSIR(R0){const g=1/7, b=R0*g, dt=.1;let S=.999,I=.001,Rr=0;const out=[[0,S,I,Rr]];
  for(let k=1;k<=2000;k++){const inf=b*S*I*dt, rec=g*I*dt;S-=inf;I+=inf-rec;Rr+=rec;if(k%5===0)out.push([k*dt,S,I,Rr]);}return out;}
function moLV(){let B=4,P=1;const dt=.01,out=[[0,B,P]];const f=(b,p)=>[b-.5*b*p,.25*b*p-.75*p];
  for(let k=1;k<=3000;k++){const k1=f(B,P),k2=f(B+k1[0]*dt/2,P+k1[1]*dt/2),k3=f(B+k2[0]*dt/2,P+k2[1]*dt/2),k4=f(B+k3[0]*dt,P+k3[1]*dt);
    B+=dt/6*(k1[0]+2*k2[0]+2*k3[0]+k4[0]);P+=dt/6*(k1[1]+2*k2[1]+2*k3[1]+k4[1]);if(k%10===0)out.push([k*dt,B,P]);}return out;}
const moPath=(A,pts,col,w,dash)=>`<path d="${pts.map((p,i)=>(i?'L':'M')+FX(A.px(p[0]))+' '+FX(A.py(p[1]))).join(' ')}" stroke="${col}" stroke-width="${w||2.2}" fill="none"${dash?` stroke-dasharray="${dash}"`:''}/>`;
function scM1(n){return introPlate(n,{q:'What can a few equations tell us that experiments alone cannot?',
  belief:'A model states assumptions precisely enough to calculate their consequences. It can predict what an experiment should show, estimate what cannot be measured directly, such as a growth rate or a reproduction number, and expose which assumptions matter. It is only as good as those assumptions and the data used to test it.',
  items:['Exponential and logistic growth','Monod kinetics and the chemostat','Predators and prey: Lotka–Volterra','Selection as a growth model','Flux balance analysis','SIR and SEIR epidemics','Validation and limits'],
  art:(cx,cy)=>{const x0=cx-90,y0=cy+50,f=t=>y0-100/(1+Math.exp(-(t-90)/18)), e=t=>y0-100*Math.exp((t-90)/18)/(1+Math.exp(-0/18))/2;let d='',d2='';
    for(let t=0;t<=180;t+=3){d+=(d?' L':'M')+(x0+t)+' '+FX(f(t));}for(let t=0;t<=112;t+=3){d2+=(d2?' L':'M')+(x0+t)+' '+FX(y0-5*Math.exp(t/37.5));}
    return ln(x0,y0,x0+180,y0,'#6A5B47',1.2)+ln(x0,y0,x0,y0-110,'#6A5B47',1.2)+`<path d="${d2}" stroke="#A4473A" stroke-width="2" fill="none" stroke-dasharray="5 3"/><path d="${d}" stroke="#2F5276" stroke-width="2.2" fill="none"/>`+T(cx,y0+18,'population over time','note mid f11');},artH:150});}
function scM2(n){
  const r=.9, N0=.01, te=Math.log(1.2/N0)/r;
  const A=n?axes(50,30,286,170,{xr:[0,10],yr:[0,1.2],xt:[[0,'0'],[2,'2'],[4,'4'],[6,'6'],[8,'8'],[10,'10']],yt:[[0,'0'],[.5,'K/2'],[1,'K']],xlab:'time (h)',ylab:'cells'})
    :axes(70,36,300,200,{xr:[0,10],yr:[0,1.2],xt:[[0,'0'],[2,'2'],[4,'4'],[6,'6'],[8,'8'],[10,'10']],yt:[[0,'0'],[.5,'K/2'],[1,'K']],xlab:'time (h)',ylab:'cells'});
  let s=A.s+ln(A.x,FX(A.py(1)),A.x+A.w,FX(A.py(1)),'#9A8F7C',1,'4 3');
  s+=G('a-fade',.2,curve(A,t=>N0*Math.exp(r*t),{col:'#A4473A',dash:'6 3',to:te})+T(FX(A.px(te)-6),FX(A.py(1.2)+12),'exponential','note end f11 halo'));
  s+=G('a-fade',.5,curve(A,t=>1/(1+(1/N0-1)*Math.exp(-r*t)),{col:'#2F5276'})+T(FX(A.px(9.6)),FX(A.py(1)+16),'logistic','note end f11 halo'));
  const items=[['Exponential','dN/dt = rN. Each cell divides at a constant rate, so N = N₀·exp(rt) and the doubling time is ln 2 / r. E. coli in rich medium doubles in about 20 minutes.'],['Logistic','dN/dt = rN(1 − N/K). Growth slows as the population nears the carrying capacity K, set by nutrients or space. Fastest growth is at K/2.'],['Real batch cultures','Add a lag phase while cells adjust, and a death phase after stationary phase. Plot log N against time: the exponential phase is a straight line with slope r.']];
  const b=n?bullets(24,A.y+A.h+60,items,44,{d0:.8,gap:22}):bullets(410,52,items,28,{d0:.8,gap:22});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,A.y+A.h+50)),s:s+b.s};
}
function scM3(n){
  const A=n?axes(66,30,270,160,{xr:[0,10],yr:[0,1.1],xt:[[0,'0'],[1,'Ks'],[5,'5 Ks'],[10,'10 Ks']],yt:[[0,'0'],[.5,'½ μmax'],[1,'μmax']],ydx:50,xlab:'substrate concentration S',ylab:'growth rate μ'})
    :axes(84,36,286,190,{xr:[0,10],yr:[0,1.1],xt:[[0,'0'],[1,'Ks'],[5,'5 Ks'],[10,'10 Ks']],yt:[[0,'0'],[.5,'½ μmax'],[1,'μmax']],ydx:52,xlab:'substrate concentration S',ylab:'growth rate μ'});
  let s=A.s+ln(A.x,FX(A.py(1)),A.x+A.w,FX(A.py(1)),'#9A8F7C',1,'4 3');
  s+=G('a-fade',.2,curve(A,x=>x/(1+x),{col:'#2F5276'})+ln(FX(A.px(1)),FX(A.py(.5)),FX(A.px(1)),A.y+A.h,'#A4473A',1,'3 3')+ln(A.x,FX(A.py(.5)),FX(A.px(1)),FX(A.py(.5)),'#A4473A',1,'3 3')+`<circle cx="${FX(A.px(1))}" cy="${FX(A.py(.5))}" r="4" fill="#A4473A"/>`);
  s+=G('a-fade',.4,T(FX(A.px(5)),FX(A.py(.6)),'μ = μmax · S / (Ks + S)','mono mid f12 halo'));
  const items=[['Monod (1949)','Growth rate saturates with substrate, like an enzyme. Ks is the concentration giving half the maximum rate; for sugars with high-affinity transporters it is often micromolar.'],['Yield','Biomass made per unit of substrate consumed, Y. Substrate falls as dS/dt = −μX / Y.'],['The chemostat','Fresh medium flows in at dilution rate D. At steady state μ = D, so the experimenter sets the growth rate. If D exceeds μmax the culture washes out.']];
  const b=n?bullets(24,A.y+A.h+60,items,44,{d0:.8,gap:22}):bullets(410,52,items,28,{d0:.8,gap:22});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,A.y+A.h+50)),s:s+b.s};
}
function scM4(n){
  const D=moLV();
  const A=n?axes(46,30,290,160,{xr:[0,30],yr:[0,10],xt:[[0,'0'],[10,'10'],[20,'20'],[30,'30']],yt:[],xlab:'time',ylab:'abundance'})
    :axes(60,36,320,190,{xr:[0,30],yr:[0,10],xt:[[0,'0'],[10,'10'],[20,'20'],[30,'30']],yt:[],xlab:'time',ylab:'abundance'});
  let s=A.s+G('a-fade',.2,moPath(A,D.map(p=>[p[0],p[1]]),'#4F7A3F',2.2))+G('a-fade',.5,moPath(A,D.map(p=>[p[0],p[2]]),'#7D4A98',2.2,'6 3'));
  const ly=A.y+A.h+50, lx=n?40:A.x+20;
  s+=G('a-fade',.7,ln(lx,ly-4,lx+22,ly-4,'#4F7A3F',2.4)+T(lx+28,ly,'bacteria (prey)','note start f11')+ln(lx+150,ly-4,lx+172,ly-4,'#7D4A98',2.4,'6 3')+T(lx+178,ly,'phage (predator)','note start f11'));
  const items=[['The equations','dB/dt = rB − aBP for bacteria; dP/dt = caBP − mP for phage. Prey grow alone; predators need prey; encounters scale with B × P.'],['Cycles','Prey rise, predators follow, prey crash, predators starve. Peaks of predator lag behind those of prey by about a quarter cycle.'],['Real phage and bacteria','Resistance mutants, spatial refuges, lysogeny and debris damp the cycles. Bdellovibrio, a bacterium that preys on other bacteria, gives similar dynamics in chemostats.']];
  const b=n?bullets(24,ly+40,items,44,{d0:.9,gap:22}):bullets(410,52,items,28,{d0:.9,gap:22});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,ly+20)),s:s+b.s};
}
function scM5(n){
  const art=(cx,cy,nn)=>{const w=nn?280:240,h=150,A=axes(cx-w/2+20,cy-h/2-10,w-20,h,{xr:[0,100],yr:[0,1],xt:[[0,'0'],[50,'50'],[100,'100']],yt:[[0,'0'],[.5,'0.5'],[1,'1']],xlab:'generations',ylab:'mutant frequency'});
    const p=(t,sc)=>.01*Math.exp(sc*t)/(.99+.01*Math.exp(sc*t));
    return A.s+curve(A,t=>p(t,.2),{col:'#2F5276'})+curve(A,t=>p(t,.1),{col:'#C17A2C',dash:'5 3'})+T(FX(A.px(24)),FX(A.py(.9)),'s = 0.2','note end f11 halo')+T(FX(A.px(64)),FX(A.py(.5)),'s = 0.1','note start f11 halo');};
  return artBullets(n,art,270,210,[['Selection is growth','A mutant growing a fraction s faster than its parent rises along a logistic curve in frequency; a 10% advantage takes it from 1% to 99% in about a hundred generations.'],['Most new winners are lost','A single new beneficial mutant fixes with probability of only about 2s (Haldane), because drift removes most while they are rare.'],['Drift and supply','Drift scales with 1/N; the supply of new mutations with N times the mutation rate. Bacterial populations are huge, so supply rarely limits.'],['See also','The Mutation, Selection and Drift primer develops these ideas with simulations.']],{gap:22,wn:40});
}
function scM6(n){
  const N=n?{o:{x:60,y:50,w:84,t:'glucose|outside'},a:{x:180,y:50,w:60,t:'A',f:PAL.gold},bm:{x:300,y:50,w:84,t:'biomass',f:PAL.green},ac:{x:180,y:140,w:84,t:'acetate',f:PAL.rose}}
    :{o:{x:70,y:70,w:90,t:'glucose|outside'},a:{x:200,y:70,w:60,t:'A',f:PAL.gold},bm:{x:330,y:70,w:90,t:'biomass',f:PAL.green},ac:{x:200,y:170,w:90,t:'acetate',f:PAL.rose}};
  let s=G('a-fade',0,flow(N,[['o','a','v₁',{side:-1}],['a','bm','v₂',{side:-1}],['a','ac','v₃',{side:1}]]));
  const mx=n?40:40, my=n?200:228;
  s+=G('a-fade',.3,T(mx,my,'S · v = 0 for A:','mono start f12')+T(mx,my+20,'v₁ − v₂ − v₃ = 0','mono start f12')+T(mx,my+44,'bounds: v₁ ≤ 10, v₂ ≤ 8','mono start f12')+T(mx,my+64,'objective: maximise v₂','mono start f12'));
  const A=n?axes(70,my+110,250,180,{xr:[0,11],yr:[0,11],xt:[[0,'0'],[4,'4'],[8,'8']],yt:[[0,'0'],[4,'4'],[8,'8']],xlab:'v₂ (to biomass)',ylab:'v₃ (to acetate)',ydx:26})
    :axes(440,36,170,170,{xr:[0,11],yr:[0,11],xt:[[0,'0'],[4,'4'],[8,'8']],yt:[[0,'0'],[4,'4'],[8,'8']],xlab:'v₂ (to biomass)',ylab:'v₃ (to acetate)',ydx:26});
  const poly=[[0,0],[8,0],[8,2],[0,10]].map(p=>FX(A.px(p[0]))+','+FX(A.py(p[1]))).join(' ');
  s+=A.s+G('a-fade',.6,`<polygon points="${poly}" fill="${PAL.blue}" opacity=".7" stroke="#2F5276" stroke-width="1.2"/>`+ln(FX(A.px(8)),FX(A.py(0)),FX(A.px(8)),FX(A.py(2)),'#A4473A',3.5)
    +T(FX(A.px(2.6)),FX(A.py(3)),'feasible','note mid f11 halo')+T(FX(A.px(8.4)),FX(A.py(2)-8),'optimum','note start f11 halo'));
  const by=n?A.y+A.h+64:336;
  const b=bullets(n?24:30,by,[['Steady state','S is the stoichiometric matrix (metabolites × reactions) and v the fluxes. S·v = 0 says each internal metabolite is made as fast as it is used.'],['Constraints and objective','Bounds come from measured uptake, irreversibility and enzyme capacity. Linear programming finds fluxes that maximise an objective, usually biomass.'],['Genome scale','Models of E. coli such as iML1515 have about 2,700 reactions. Optima are often not unique: here any point on the red edge maximises v₂, which flux variability analysis reports.']],n?44:88,{d0:.9,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scM7(n){
  const c=SIRS[sirSel], D=moSIR(c.r), peak=D.reduce((m,p)=>p[2]>m[2]?p:m,D[0]), fin=D[D.length-1][3];
  const A=n?axes(46,30,290,170,{xr:[0,200],yr:[0,1],xt:[[0,'0'],[50,'50'],[100,'100'],[150,'150'],[200,'200']],yt:[[0,'0'],[.5,'0.5'],[1,'1']],xlab:'days',ylab:'fraction of population'})
    :axes(70,36,300,200,{xr:[0,200],yr:[0,1],xt:[[0,'0'],[50,'50'],[100,'100'],[150,'150'],[200,'200']],yt:[[0,'0'],[.5,'0.5'],[1,'1']],xlab:'days',ylab:'fraction of population'});
  let s=A.s+G('a-fade',.1,moPath(A,D.map(p=>[p[0],p[1]]),'#2F5276',2.2))+G('a-fade',.3,moPath(A,D.map(p=>[p[0],p[2]]),'#A4473A',2.6))+G('a-fade',.5,moPath(A,D.map(p=>[p[0],p[3]]),'#4F7A3F',2.2,'6 3'));
  const ly=A.y+A.h+50, lx=n?30:A.x;
  s+=G('a-fade',.6,[['#2F5276','S susceptible',''],['#A4473A','I infectious',''],['#4F7A3F','R recovered','6 3']].map((L,i)=>{const x=lx+i*(n?104:110);return ln(x,ly-4,x+18,ly-4,L[0],2.4,L[2])+T(x+23,ly,L[1],'note start f11');}).join(''));
  const bx=n?16:410, by=n?ly+36:52;
  const hit=c.r>1?Math.round((1-1/c.r)*100)+'%':'none';
  let t=G('a-fade',.8,T(bx,by,c.k,'cname start f15')+T(bx,by+22,'peak infectious '+Math.round(peak[2]*100)+'%'+(c.r>1?', day '+Math.round(peak[0]):''),'mono start f12')+T(bx,by+40,'ever infected '+Math.round(fin*100)+'%','mono start f12')+T(bx,by+58,'herd immunity threshold '+hit,'mono start f12'));
  const p=para(bx,by+84,'dS/dt = −βSI, dI/dt = βSI − γI, dR/dt = γI, with R₀ = β/γ and an infectious period 1/γ of 7 days. Solved here by Euler steps of 0.1 day.',n?50:30,'note start f12',16,1);
  const q=para(bx,p.y+10,'SEIR adds an exposed, not yet infectious class E. It delays and flattens the peak but leaves R₀ and the final size unchanged. The epidemic turns over when S falls below 1/R₀, before everyone is infected.',n?50:30,'note start f12',16,1.2);
  return {vb:n?slim(q.y+6):wide(Math.max(q.y+8,ly+20)),s:s+t+p.s+q.s};
}
function scM8(n){
  const it=[{t:'observe',w:84,f:PAL.blue},{t:'formulate|assumptions',w:110,f:PAL.gold},{t:'fit|parameters',w:90,f:PAL.lilac},{t:'predict',w:80,f:PAL.rose},{t:'test on|new data',w:90,f:PAL.green}];
  const cx=n?180:150, cy=n?150:170, Rr=n?100:108;
  let s=G('a-fade',0,cycle(cx,cy,Rr,it));
  const items=[['All models are wrong','George Box’s point: models simplify on purpose. Ask whether the simplification matters for the question, not whether it is true.'],['Validate on new data','A model that fits the data it was tuned on proves little. Test predictions on independent experiments.'],['Know what is identifiable','Different parameter sets can fit equally well. Report ranges and do sensitivity analysis.'],['Check the assumptions','Well-mixed, deterministic, constant parameters? Small populations go extinct by chance; space and evolution change outcomes.']];
  const b=n?bullets(24,cy+Rr+70,items,44,{d0:.8,gap:22}):bullets(330,52,items,38,{d0:.8,gap:22});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,cy+Rr+50)),s:s+b.s};
}
const S=[
 {p:1,title:'Why model',draw:scM1,text:"A mathematical model turns a verbal idea into something that can be calculated and tested. Models let us estimate quantities we cannot measure directly, predict the outcome of an experiment before running it, and see which assumptions drive a result."},
 {p:1,title:'Exponential and logistic growth',draw:scM2,text:"With unlimited resources, a bacterial population grows exponentially: the more cells, the faster it grows. Real resources run out, and the logistic model captures the slowdown towards a carrying capacity. Both are simple enough to fit to a growth curve and estimate a rate."},
 {p:1,title:'Monod growth and the chemostat',draw:scM3,text:"Jacques Monod showed that growth rate depends on substrate concentration in the same saturating way that enzyme rate depends on substrate. The same equation underlies the chemostat, where the dilution rate sets the growth rate at steady state."},
 {p:2,title:'Predators and prey',draw:scM4,text:"Lotka and Volterra wrote down, in the 1920s, a pair of equations in which prey grow and are eaten while predators need prey to grow. The populations cycle, with the predator lagging behind. Phage and bacteria, or Bdellovibrio and its prey, can show such cycles, though real systems damp them."},
 {p:2,title:'Selection as a growth model',draw:scM5,text:"Population genetics uses the same mathematics. Two genotypes growing at slightly different rates change in relative frequency along a logistic curve. The selection coefficient s sets how fast; drift and the supply of new mutations decide whether a beneficial mutation appears and survives."},
 {p:3,title:'Flux balance analysis',draw:scM6,text:"Flux balance analysis predicts metabolic fluxes without knowing enzyme kinetics. It assumes steady state, so the stoichiometric matrix times the flux vector is zero, adds bounds on fluxes, and uses linear programming to find the fluxes that maximise an objective such as growth."},
 {p:4,title:'Epidemic models',chips:'sir',draw:scM7,text:"The SIR model divides a population into susceptible, infectious and recovered people. Each infectious person infects R₀ others in a fully susceptible population. Pick a value of R₀ to see the curves, computed in your browser. Below 1, the outbreak fades; above it, an epidemic burns through until susceptibles run short."},
 {p:4,title:'Limits and validation',draw:scM8,text:"Models are tools for thinking, not oracles. A good model is built from stated assumptions, fitted to data, used to make a prediction, and then tested against new data, which often sends the modeller back to revise the assumptions."}];
const CHIPS={sir:{list:SIRS.map(x=>x.k),get:()=>sirSel,set:k=>sirSel=k}};
