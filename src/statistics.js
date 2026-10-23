/*META
{"title":"Statistics for Microbiologists","eyebrow":"Quantitative literacy · an animated primer","h1":"Designing experiments and reading the numbers honestly","parts":["Design","Testing","Models","Sequencing data"],"foot":"Power values use a standard approximation to the two-sample t-test; the Bayesian example uses a beta prior and binomial data. For real analyses, check the assumptions of each method and consult a statistician before the experiment, not after.","description":"Controls, randomisation and blocking, biological and technical replicates, power and sample size, common tests and p-values, multiple testing, regression and mixed models, Bayesian inference and compositional sequencing data."}
META*/
const stPhi=z=>{const t=1/(1+.2316419*Math.abs(z)), d=.3989423*Math.exp(-z*z/2), p=d*t*(.3193815+t*(-.3565638+t*(1.781478+t*(-1.821256+t*1.330274))));return z>0?1-p:p;};
const stTcrit=df=>{const z=1.959964;return z+(z**3+z)/(4*df)+(5*z**5+16*z**3+3*z)/(96*df*df);};
const stPower=(d,nn)=>{const df=2*nn-2, tc=stTcrit(df), del=d*Math.sqrt(nn/2);return stPhi((del-tc)/Math.sqrt(1+tc*tc/(2*df)));};
const stNeed=d=>{for(let k=2;k<500;k++)if(stPower(d,k)>=.8)return k;return 500;};
const POW=[{k:'d = 0.5',d:.5,t:'Half a standard deviation: a subtle phenotype, such as a small change in growth rate.'},
 {k:'d = 0.8',d:.8,t:'Cohen’s conventional “large” effect. Still more cultures than most labs run.'},
 {k:'d = 1.2',d:1.2,t:'A clear shift, for example a mutant that grows noticeably more slowly.'},
 {k:'d = 2',d:2,t:'A big, clean effect, such as a knockout that abolishes a function. Small n suffices only for effects this large.'}];
let powSel=1;
const PRI=[{k:'Flat prior',a:1,b:1,t:'Beta(1, 1): every prevalence equally plausible beforehand. The posterior follows the data.'},
 {k:'Sceptical prior',a:1,b:9,t:'Beta(1, 9): we expected the gene to be rare, around 10%. The posterior is pulled down.'},
 {k:'Earlier survey',a:30,b:70,t:'Beta(30, 70): a previous survey of 100 isolates found about 30%. The prior dominates 20 new isolates.'}];
let priSel=0;
function stBell(cx,cy,w,h,cut){const sd=w/6, f=x=>cy-h*Math.exp(-((x-cx)**2)/(2*sd*sd));let d='',tail=`M${FX(cut)} ${cy}`;
  for(let x=cx-w/2;x<=cx+w/2+.1;x+=2){d+=(d?' L':'M')+FX(x)+' '+FX(f(x));if(x>=cut)tail+=` L${FX(x)} ${FX(f(x))}`;}
  return `<path d="${tail} L${FX(cx+w/2)} ${cy} Z" fill="${PAL.rose}" opacity=".8"/><path d="${d}" stroke="#2F5276" stroke-width="2" fill="none"/>`+ln(cx-w/2,cy,cx+w/2,cy,'#6A5B47',1.2);}
function scS1(n){return introPlate(n,{q:'How do we tell a real effect from the noise of biology?',
  belief:'Cultures, animals and sequencing runs all vary. Statistics does not remove that variation; it measures it, so that a claim about a mutant, a drug or a community can be stated with an honest degree of uncertainty. Most of the work is done before any data exist, in the design.',
  items:['Controls, randomisation and blocking','Biological and technical replicates','Power and sample size','Tests, assumptions and p-values','Multiple testing','Regression and mixed models','Bayesian basics','Compositional sequencing data'],
  art:(cx,cy)=>stBell(cx,cy+30,200,100,cx+36)+T(cx+56,cy+10,'p','mono start f13')+arw(cx+60,cy+14,cx+52,cy+24,{w:1})+T(cx,cy+50,'the null distribution','note mid f11'),artH:150});}
function scS2(n){
  const art=(cx,cy)=>{let s='';const pat=[[1,0,0,1],[0,1,1,0],[1,0,1,0]];
    pat.forEach((r,b)=>{const y=cy-120+b*76;s+=`<rect x="${cx-125}" y="${y}" width="250" height="68" rx="8" fill="none" stroke="#6A5B47" stroke-dasharray="4 3"/>`+T(cx-112,y+40,'day '+(b+1),'note start f12');
      r.forEach((t,i)=>{s+=tube(cx-40+i*44,y+60,{w:16,h:44,full:.7,fill:t?PAL.rose:PAL.blue});});});
    const ly=cy+122;s+=box(cx-100,ly-10,12,12,PAL.rose,2)+T(cx-82,ly,'treated','note start f12')+box(cx+10,ly-10,12,12,PAL.blue,2)+T(cx+28,ly,'control','note start f12');
    return s;};
  return artBullets(n,art,260,262,[['Controls','A negative control (untreated, or vehicle only) and a positive control that shows the assay can detect an effect. For mutants: wild type and a complemented strain.'],['Randomisation','Assign treatments to flasks, wells or animals by a random process, so position in the incubator or order of handling cannot line up with treatment.'],['Blocking','Run every treatment within each day, batch of medium or plate-reader run. The analysis then removes the block-to-block differences.'],['Blinding','Score without knowing the group whenever judgement is involved, as in histology or colony morphology.']],{gap:18,wn:42,ay:20,by:40});
}
function scS3(n){
  const gx=n?[70,180,290]:[140,320,500], off=n?36:52, ww=n?30:40, y1=n?70:72, y2=n?150:156;
  const N={}, E=[];
  gx.forEach((x,i)=>{N['c'+i]={x,y:y1,w:n?96:120,t:'culture '+(i+1),f:PAL.blue};
    [-1,0,1].forEach((o,j)=>{const k='w'+i+j;N[k]={x:x+o*off,y:y2,w:ww,t:'ABC'[i]+(j+1),f:PAL.gold};E.push(['c'+i,k,'']);});});
  let s=G('a-fade',0,T(n?180:320,28,n?'biological replicates: n = 3':'three independent cultures: biological replicates, n = 3','note mid f12'))+G('a-fade',.2,flow(N,E));
  s+=G('a-fade',.6,T(n?180:320,y2+38,n?'technical replicates: average them':'three wells from each culture: technical replicates, averaged first','note mid f12'));
  const b=bullets(n?24:30,y2+80,[['Biological replicates','Independent samples of the biology: separate colonies grown on separate occasions, separate animals. They measure the variation a claim must survive.'],['Technical replicates','Repeated measurements of one sample. They show how precise the assay is, and are averaged (or modelled) rather than counted as n.'],['Pseudoreplication','Hurlbert’s term (1984) for treating non-independent measurements as independent. Nine wells from three cultures are n = 3, not n = 9; counting nine shrinks the p-value without adding evidence. Mice in one cage share a microbiota, so the cage can be the unit.']],n?44:88,{d0:.9,gap:20});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scS4(n){
  const c=POW[powSel], need=stNeed(c.d);
  const A=n?axes(54,30,280,160,{xr:[2,70],yr:[0,1],xt:[[2,'2'],[10,'10'],[30,'30'],[50,'50'],[70,'70']],yt:[[0,'0'],[.5,'0.5'],[.8,'0.8'],[1,'1']],xlab:'cultures per group',ylab:'power'})
    :axes(70,36,300,190,{xr:[2,70],yr:[0,1],xt:[[2,'2'],[10,'10'],[30,'30'],[50,'50'],[70,'70']],yt:[[0,'0'],[.5,'0.5'],[.8,'0.8'],[1,'1']],xlab:'cultures per group',ylab:'power'});
  let s=A.s+ln(A.x,FX(A.py(.8)),A.x+A.w,FX(A.py(.8)),'#A4473A',1,'4 3');
  s+=G('a-fade',.2,POW.map((p,i)=>i===powSel?'':curve(A,x=>stPower(p.d,x),{col:'#9A8F7C',w:1.2,dash:'3 3'})).join(''));
  s+=G('a-fade',.4,curve(A,x=>stPower(c.d,x),{col:'#2F5276',w:2.6})+`<circle cx="${FX(A.px(need))}" cy="${FX(A.py(.8))}" r="4.5" fill="#A4473A"/>`
    +T(FX(A.px(need)+(need>50?-8:8)),FX(A.py(.8)+18),'n ≈ '+need,'mono f12 halo '+(need>50?'end':'start')));
  const bx=n?16:410, by=n?A.y+A.h+60:52;
  let t=G('a-fade',.6,T(bx,by,c.k+': about '+need+' per group','cname start f15'));
  const p=para(bx,by+22,c.t,n?50:30,'lab start f13',17,.7);
  const q=n?bullets(24,p.y+28,[['Power','The probability of detecting an effect of a given size if it is real. Aim for at least 80%.'],['Effect size d','The difference in means divided by the standard deviation. Take the SD from pilot data or earlier work.'],['Do it first','Underpowered studies miss real effects, and the significant results they do find overstate the effect.']],44,{d0:1,gap:18})
    :bullets(bx+6,p.y+30,[['Power','The chance of detecting an effect of a given size if it is real. Aim for 80% or more.'],['Effect size d','Difference in means divided by the SD, from pilot data or earlier work.'],['Do it first','Small studies miss real effects, and the hits they find overstate them.']],28,{d0:1,gap:16});
  const foot=para(n?16:24,Math.max(q.y,A.y+A.h+48)+(n?0:6),'Two-sided two-sample t-test, α = 0.05. Grey dashed lines: the other effect sizes.',n?50:92,'note start f12',16,1.2);
  return {vb:n?slim(foot.y+6):wide(foot.y+8),s:s+t+p.s+q.s+foot.s};
}
function scS5(n){
  const rows=[['t-test (Welch)','means of two groups','independent units; roughly normal residuals or decent n; Welch’s version allows unequal variances'],
   ['Paired t-test','mean of paired differences','pairs are matched (same donor, same day); differences roughly normal'],
   ['Mann–Whitney U','whether one group tends to have larger values (ranks)','independent units; no normality needed, but less power with very small n'],
   ['One-way ANOVA','means of three or more groups','normal residuals, similar variances; follow with a post-hoc test such as Tukey’s'],
   ['Chi-square / Fisher’s exact','counts in categories','independent observations; Fisher’s when expected counts are below about 5']];
  const t=wtable(n,['Test','Compares','Assumes'],rows,n?[[10,12],[110,14],[210,20]]:[[24,18],[180,24],[370,38]],{y0:30,R:n?354:620});
  const c=cards(n,[['A p-value is','The probability, if the null hypothesis and the model’s assumptions were true, of data at least as extreme as those observed.'],['A p-value is not','The probability that the null is true, the size or importance of the effect, or the chance the result will replicate. p = 0.049 and 0.051 are the same evidence.']],{y:t.y+14});
  const p=para(n?16:24,c.y+10,'Report effect sizes with confidence intervals, not stars. The American Statistical Association’s 2016 statement on p-values makes the same points.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+c.s+p.s};
}
const STP=[.0003,.0008,.0015,.004,.006,.009,.012,.03,.045,.08,.15,.22,.31,.4,.52,.6,.71,.8,.88,.95];
function scS6(n){
  const yt=[[.0001,'0.0001'],[.001,'0.001'],[.01,'0.01'],[.1,'0.1'],[1,'1']];
  const A=n?axes(64,30,272,180,{xr:[0,21],yr:[.0001,1],logy:1,xt:[[1,'1'],[5,'5'],[10,'10'],[15,'15'],[20,'20']],yt,ydx:44,xlab:'rank (smallest p first)',ylab:'p-value'})
    :axes(80,36,290,200,{xr:[0,21],yr:[.0001,1],logy:1,xt:[[1,'1'],[5,'5'],[10,'10'],[15,'15'],[20,'20']],yt,ydx:44,xlab:'rank (smallest p first)',ylab:'p-value'});
  const m=STP.length, bon=.05/m;let kBH=0;STP.forEach((p,i)=>{if(p<=(i+1)*.05/m)kBH=i+1;});
  let s=A.s+G('a-fade',.2,ln(A.x,FX(A.py(.05)),A.x+A.w,FX(A.py(.05)),'#9A8F7C',1,'4 3')+ln(A.x,FX(A.py(bon)),A.x+A.w,FX(A.py(bon)),'#A4473A',1.4)
    +curve(A,i=>i*.05/m,{col:'#2F5276',w:1.6,from:1,to:20})
    +T(A.x+A.w-2,FX(A.py(.05)-6),'0.05, unadjusted','note end f11 halo')+T(A.x+A.w-2,FX(A.py(bon)+14),'Bonferroni 0.05/20','note end f11 halo')+T(FX(A.px(9)),FX(A.py(.0225)+16),'BH: rank × 0.05/20','note start f11 halo'));
  const col=(p,i)=>p<=bon?'#4F7A3F':i<kBH?'#2F5276':p<.05?'#C17A2C':'#9A8F7C';
  s+=G('a-fade',.5,STP.map((p,i)=>`<circle cx="${FX(A.px(i+1))}" cy="${FX(A.py(p))}" r="4" fill="${col(p,i)}" stroke="${INK}" stroke-width=".6"/>`).join(''));
  const lg=[['#4F7A3F','pass Bonferroni (3)'],['#2F5276','pass BH only (4 more)'],['#C17A2C','p < 0.05 only (2)'],['#9A8F7C','not significant']];
  const ly=A.y+A.h+52;
  s+=G('a-fade',.7,lg.map((L,i)=>{const x=n?(i%2?190:24):A.x-40+(i%2)*170, y=ly+(n?Math.floor(i/2)*18:Math.floor(i/2)*18);return `<circle cx="${x}" cy="${y-4}" r="4" fill="${L[0]}" stroke="${INK}" stroke-width=".6"/>`+T(x+10,y,L[1],'note start f11');}).join(''));
  const b=n?bullets(24,ly+56,[['Why correct','Test 4,000 genes with no real differences at α = 0.05 and about 200 come out “significant”.'],['Bonferroni','Divide α by the number of tests. It controls the chance of even one false positive (the family-wise error rate) and is conservative.'],['Benjamini–Hochberg','Rank the p-values and compare the i-th with i × α/m. It controls the false discovery rate, the expected share of false positives among the hits: the usual choice for RNA-seq and screens.']],44,{d0:1,gap:18})
    :bullets(410,52,[['Why correct','Test 4,000 genes with no real differences at α = 0.05 and about 200 come out “significant”.'],['Bonferroni','Divide α by the number of tests. Controls the chance of any false positive; conservative.'],['Benjamini–Hochberg','Compare the i-th smallest p with i × α/m. Controls the false discovery rate, the expected share of false hits: the usual choice for RNA-seq and screens.']],28,{d0:1,gap:18});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,ly+46)),s:s+b.s};
}
function scS7(n){
  const A=n?axes(50,30,268,170,{xr:[0,4],yr:[0,1.2],xt:[[0,'0'],[1,'1'],[2,'2'],[3,'3'],[4,'4']],yt:[[0,'0'],[.4,'0.4'],[.8,'0.8'],[1.2,'1.2']],xlab:'drug (µg/mL)',ylab:'growth rate (per h)'})
    :axes(70,36,300,200,{xr:[0,4],yr:[0,1.2],xt:[[0,'0'],[1,'1'],[2,'2'],[3,'3'],[4,'4']],yt:[[0,'0'],[.4,'0.4'],[.8,'0.8'],[1.2,'1.2']],xlab:'drug (µg/mL)',ylab:'growth rate (per h)'});
  const reps=[[1.02,'#2F5276'],[.86,'#4F7A3F'],[.7,'#C17A2C']], sl=-.16, jit=[.03,-.02,.04,-.03,.01,-.04,.02,.0,-.01];
  let s=A.s;
  reps.forEach((r,k)=>{s+=G('a-fade',(.2+k*.2).toFixed(1),curve(A,x=>r[0]+sl*x,{col:r[1],w:1.4})+[0,1,2,3,4].map((x,i)=>`<circle cx="${FX(A.px(x))}" cy="${FX(A.py(r[0]+sl*x+jit[(i+k*3)%9]))}" r="3.6" fill="${r[1]}" stroke="${INK}" stroke-width=".5"/>`).join('')
    +T(FX(A.px(4)+6),FX(A.py(r[0]+sl*4)+4),'rep '+(k+1),'note start f11'));});
  s+=G('a-fade',.9,curve(A,x=>.86+sl*x,{col:INK,w:2.6,dash:'6 4'})+T(FX(A.px(.15)),FX(A.py(1.17)),'dashed: fixed effect of drug','note start f11 halo'));
  const items=[['Regression','Fits y = a + b·x + error. Assumes a straight-line relation, independent errors and constant spread. Generalised linear models extend it to counts and proportions.'],['Fixed effects','Factors you set and want to estimate: drug dose, genotype, medium. Here, the common slope.'],['Random effects','Units sampled from a larger population: replicate culture, day, mouse, cage. Each replicate gets its own intercept, drawn from a distribution.'],['A mixed model','In R’s lme4: rate ~ dose + (1 | replicate). It uses every measurement without pseudoreplication.']];
  const b=n?bullets(24,A.y+A.h+60,items,44,{d0:1.1,gap:18}):bullets(418,52,items,27,{d0:1.1,gap:14});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,A.y+A.h+50)),s:s+b.s};
}
function scS8(n){
  const c=PRI[priSel], k=7, N=20, a2=c.a+k, b2=c.b+N-k, G0=400;
  const grid=[...Array(G0+1).keys()].map(i=>Math.min(.9995,Math.max(.0005,i/G0)));
  const un=(a,b)=>grid.map(p=>Math.exp((a-1)*Math.log(p)+(b-1)*Math.log(1-p)));
  const norm=v=>{const z=v.reduce((x,y)=>x+y,0)/G0;return v.map(x=>x/z);};
  const pr=norm(un(c.a,c.b)), lk=norm(un(k+1,N-k+1)), po=norm(un(a2,b2));
  let cum=0, lo=0, hi=1;po.forEach((v,i)=>{const prev=cum;cum+=v/G0;if(prev<.025&&cum>=.025)lo=grid[i];if(prev<.975&&cum>=.975)hi=grid[i];});
  const mean=a2/(a2+b2), ymax=Math.ceil(Math.max(...pr,...lk,...po)*1.15);
  const A=n?axes(46,30,290,170,{xr:[0,1],yr:[0,ymax],xt:[[0,'0'],[.25,'0.25'],[.5,'0.5'],[.75,'0.75'],[1,'1']],yt:[],xlab:'prevalence of the gene',ylab:'density'})
    :axes(60,36,320,200,{xr:[0,1],yr:[0,ymax],xt:[[0,'0'],[.25,'0.25'],[.5,'0.5'],[.75,'0.75'],[1,'1']],yt:[],xlab:'prevalence of the gene',ylab:'density'});
  const path=(v,col,w,dash)=>`<path d="${v.map((y,i)=>(i?'L':'M')+FX(A.px(grid[i]))+' '+FX(A.py(Math.min(y,ymax)))).join(' ')}" stroke="${col}" stroke-width="${w}" fill="none"${dash?` stroke-dasharray="${dash}"`:''}/>`;
  const band=`<rect x="${FX(A.px(lo))}" y="${A.y}" width="${FX(A.px(hi)-A.px(lo))}" height="${A.h}" fill="${PAL.gold}" opacity=".35"/>`;
  let s=A.s+G('a-fade',.1,band)+G('a-fade',.2,path(pr,'#C17A2C',1.8,'5 4'))+G('a-fade',.4,path(lk,'#9A8F7C',1.6,'2 3'))+G('a-fade',.6,path(po,'#2F5276',2.6));
  const lg=[['#C17A2C','prior','5 4'],['#9A8F7C','likelihood (7 of 20)','2 3'],['#2F5276','posterior','']], ly=A.y+A.h+50;
  s+=G('a-fade',.8,lg.map((L,i)=>{const x=n?16+[0,70,0][i]:A.x-20+[0,80,240][i], y=ly+(n&&i==2?0:0)+(n?(i==2?0:0):0);const xx=n?[16,90,250][i]:x;return ln(xx,y-4,xx+20,y-4,L[0],2.4,L[2])+T(xx+26,y,L[1],'note start f11');}).join(''));
  const bx=n?16:410, by=n?ly+36:52;
  let t=G('a-fade',.9,T(bx,by,c.k,'cname start f15')+T(bx,by+22,'posterior mean '+mean.toFixed(2),'mono start f12')+T(bx,by+40,'95% credible interval '+lo.toFixed(2)+'–'+hi.toFixed(2),'mono start f12'));
  const p=para(bx,by+64,c.t,n?50:30,'lab start f13',17,1);
  const q=para(bx,p.y+10,'Posterior ∝ likelihood × prior. A 95% credible interval contains the parameter with 95% probability, given the model and prior; a confidence interval is a statement about the procedure over repeated experiments. With more data the prior matters less.',n?50:30,'note start f12',16,1.2);
  return {vb:n?slim(q.y+6):wide(Math.max(q.y+8,ly+20)),s:s+t+p.s+q.s};
}
function scS9(n){
  const sam=[[100,100,100],[100,100,400]], cols=[PAL.blue,PAL.green,PAL.rose], nm=['A','B','C'];
  const base=n?240:250, k=.33, bw=n?44:50;
  const xs=n?[40,110,210,280]:[50,120,230,300];
  let s=G('a-fade',0,T(n?(xs[0]+xs[1]+bw)/2:(xs[0]+xs[1]+bw)/2,28,'cells in sample','note mid f12')+T((xs[2]+xs[3]+bw)/2,28,'reads (%)','note mid f12'));
  const bar=(x,vals,scale,lab,rel,d)=>{let y=base,o='';const tot=vals.reduce((a,b)=>a+b,0);
    vals.forEach((v,i)=>{const h=rel?v/tot*190:v*scale;y-=h;o+=box(x,FX(y),bw,FX(h),cols[i],1)+Tc(x+bw/2,FX(y+h/2+4),rel?nm[i]+' '+Math.round(v/tot*100):nm[i]+' '+v,'#3A2E22',10,'mono mid','600');});
    return G('a-fade',d,o+T(x+bw/2,base+16,lab,'note mid f11'));};
  s+=bar(xs[0],sam[0],k,'sample 1',0,.2)+bar(xs[1],sam[1],k,'sample 2',0,.4)+bar(xs[2],sam[0],k,'sample 1',1,.7)+bar(xs[3],sam[1],k,'sample 2',1,.9);
  s+=G('a-fade',1.1,arw(xs[1]+bw+10,140,xs[2]-10,140,{w:1.4})+T((xs[1]+bw+xs[2])/2,130,'sequence','note mid f11 halo'));
  const items=[['Closure','Reads add up to the sequencing depth, so only proportions are seen. C bloomed; A and B did not change, yet their share halved.'],['Log-ratios survive','The ratio A/B is 1 in both samples, in cells and in reads. Aitchison built compositional statistics on such ratios.'],['CLR','The centred log-ratio, clr(xᵢ) = log(xᵢ / g(x)) with g the geometric mean of all taxa, moves data to a space where ordinary methods behave. Zeros need a pseudocount or a model.'],['Absolute numbers','Spike-in standards, qPCR or flow cytometry recover total load. Tools such as ALDEx2 and ANCOM-BC test differential abundance with compositions in mind.']];
  const b=n?bullets(24,base+50,items,44,{d0:1.3,gap:18}):bullets(400,52,items,30,{d0:1.3,gap:14});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,base+30)),s:s+b.s};
}
const S=[
 {p:1,title:'Why statistics',draw:scS1,text:"Biological measurements vary, from culture to culture, day to day and animal to animal. Statistics quantifies that variation so that a claim can carry an honest measure of uncertainty. Good design matters more than clever analysis: no test can rescue an experiment that confounded treatment with batch."},
 {p:1,title:'Controls, randomisation and blocking',draw:scS2,text:"Controls show what happens without the treatment and that the assay can detect an effect. Randomisation stops hidden factors lining up with treatment. Blocking puts every treatment into each day or batch, so that day-to-day differences can be removed rather than mistaken for an effect."},
 {p:1,title:'Biological and technical replicates',draw:scS3,text:"The sample size of an experiment is the number of independent units that received the treatment, not the number of measurements. Technical replicates tell you about the assay; biological replicates tell you about the biology. Counting measurements as if they were independent is pseudoreplication."},
 {p:1,title:'Power and sample size',chips:'pow',draw:scS4,text:"Power is the chance that an experiment detects an effect that is really there. It depends on the effect size relative to the noise, the number of replicates and the significance threshold. Pick an effect size to see how many cultures per group give 80% power."},
 {p:2,title:'Tests and p-values',draw:scS5,text:"Each test answers a specific question under specific assumptions, and the most important assumption is usually independence. A p-value measures how surprising the data would be if there were no effect. It is not the probability that the hypothesis is true, and it says nothing about how large the effect is."},
 {p:2,title:'Multiple testing',draw:scS6,text:"Run enough tests and some will be significant by chance. Here are twenty sorted p-values. Bonferroni keeps only the three below 0.05 divided by 20; Benjamini–Hochberg compares each p with a rising threshold and accepts seven, controlling the expected proportion of false discoveries instead."},
 {p:3,title:'Regression and mixed models',draw:scS7,text:"Regression estimates how a response changes with a predictor. When measurements are grouped, as here with five doses on each of three replicate cultures, a mixed model treats dose as a fixed effect and replicate as a random effect, so that differences between cultures are accounted for rather than ignored."},
 {p:3,title:'Bayesian basics',chips:'pri',draw:scS8,text:"Bayesian inference combines a prior belief with the likelihood of the data to give a posterior distribution. Suppose 7 of 20 clinical isolates carry a resistance gene. Pick a prior to see how it shifts the posterior and its 95% credible interval. With little data, the prior matters; with plenty, it hardly does."},
 {p:4,title:'Compositional sequencing data',draw:scS9,text:"Amplicon and metagenomic sequencing give relative abundances: each sample is a fixed total of reads. If one taxon blooms, all the others fall as fractions even when their cell numbers are unchanged. Log-ratio methods such as the centred log-ratio, and absolute quantification, avoid this trap."}];
const CHIPS={pow:{list:POW.map(p=>p.k),get:()=>powSel,set:k=>powSel=k},pri:{list:PRI.map(p=>p.k),get:()=>priSel,set:k=>priSel=k}};
