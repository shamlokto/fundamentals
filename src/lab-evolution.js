/*META
{"title":"Evolution in the Laboratory","eyebrow":"Genetics and genome biology · an animated primer","h1":"Watching bacteria evolve in a flask","parts":["Watching it happen","Resistance"],"foot":"Rates and population sizes are typical values for E. coli; the simulation is a simple Wright–Fisher model for illustration. Mutation, selection, drift and the fluctuation test are covered in the Mutation, Selection and Drift primer.","description":"Experimental evolution: the long-term E. coli experiment, transfer bottlenecks, clonal interference, fitness landscapes and epistasis, and the cost of resistance."}
META*/
const POPS=[{k:'N = 20',N:20},{k:'N = 200',N:200},{k:'N = 2,000',N:2000}];
let popSel=0;
function wf(N,s,p0,gens,seed){const r=rnd(seed);let p=p0;const out=[p];for(let g=0;g<gens;g++){const w=p*(1+s)/(p*(1+s)+(1-p));let k=0;
  const draws=Math.min(N,400);for(let i=0;i<draws;i++)if(r()<w)k++;p=k/draws;if(N>draws){p=w+(p-w)*Math.sqrt(draws/N);}p=Math.max(0,Math.min(1,p));out.push(p);}return out;}
function scG1(n){return introPlate(n,{q:'What happens when we let bacteria evolve under our eyes?',
  belief:'With billions of cells and many generations a week, a flask is a population we can freeze, revive and compete against its own ancestors. Experimental evolution turns the forces of evolution into things we can measure.',
  items:['The long-term evolution experiment','Bottlenecks at every transfer','Clonal interference','Fitness landscapes and epistasis','The cost of resistance'],
  art:(cx,cy)=>{let s='';const cols=['#A9C4DC','#E7A99B','#C6D3A8'];for(let i=0;i<5;i++){const w=[160,130,100,70,40][i];s+=`<rect x="${cx-w/2}" y="${cy-70+i*28}" width="${w}" height="22" rx="4" fill="${cols[i%3]}" stroke="${INK}" stroke-width=".8"/>`;}return s+T(cx,cy+80,'lineages rise and fall','note mid f11');},artH:180});}
function scG3(n){
  const P=POPS[popSel], A=n?axes(54,30,280,170,{xr:[0,100],yr:[0,1],xt:[0,25,50,75,100],yt:[0,.5,1],xlab:'generations',ylab:'frequency'}):axes(70,30,320,190,{xr:[0,100],yr:[0,1],xt:[0,25,50,75,100],yt:[0,.5,1],xlab:'generations',ylab:'frequency'});
  let s=A.s;const cols=['#2F5276','#A4473A','#4F7A3F','#C17A2C','#7D4A98','#2E7D78'];
  for(let k=0;k<6;k++){const tr=wf(P.N,0,.5,100,11+k*7);s+=G('a-fade',(k*.1).toFixed(1),`<path d="M${tr.map((p,g)=>FX(A.px(g))+' '+FX(A.py(p))).join(' L')}" stroke="${cols[k]}" stroke-width="1.5" fill="none" opacity=".85"/>`);}
  const b=n?bullets(24,A.y+A.h+60,[['Neutral alleles wander','Six neutral alleles starting at 50%. In small populations they drift to loss or fixation within tens of generations.'],['Effective size matters','Drift is strong when Ne·s < 1: then selection is blind to the allele.'],['Bottlenecks','Transmission between hosts or a dilution in the lab can reduce Ne to a handful of cells.']],44,{d0:.8,gap:20})
    :bullets(420,46,[['Neutral alleles wander','Six neutral alleles, each starting at 50%. In small populations they drift to loss or fixation within tens of generations; in large ones they barely move.'],['Effective size matters','Selection outweighs drift only when Ne × s is well above 1. Below that an allele behaves as if neutral.'],['Bottlenecks','Transmission between hosts, or a serial dilution in the lab, can reduce the effective size to a handful of cells.']],28,{d0:.8,gap:22});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y,A.y+A.h+56)),s:s+b.s};
}
function scG6(n){
  const A=n?axes(54,30,280,160,{xr:[0,75],yr:[1,1.8],xt:[0,25,50,75],yt:[1,1.4,1.8],xlab:'thousands of generations',ylab:'relative fitness'}):axes(70,30,320,180,{xr:[0,75],yr:[1,1.8],xt:[0,25,50,75],yt:[1,1.4,1.8],xlab:'thousands of generations',ylab:'relative fitness'});
  const f=t=>Math.pow(5.15*t+1,0.095); // Wiser, Ribeck & Lenski 2013 power law, t in thousands of generations
  let s=A.s+G('a-fade',.2,curve(A,f,{col:'#2F5276',from:.01,n:200})+T(FX(A.px(40)),FX(A.py(f(40))-12),'still rising','note mid f11 halo'));
  const b=n?bullets(24,A.y+A.h+60,[['The long-term experiment','Since 1988, Richard Lenski’s 12 E. coli populations have been transferred daily, more than 75,000 generations, with frozen samples every 500.'],['Fitness keeps rising','Gains slow but do not stop: no peak in sight.'],['Rare innovations','One population evolved citrate use under oxygen after ~31,000 generations, building on earlier potentiating mutations.']],44,{d0:.8,gap:20})
    :bullets(420,46,[['The long-term experiment','Since 1988, Richard Lenski’s twelve E. coli populations have been transferred daily, now beyond 75,000 generations, with samples frozen every 500.'],['Fitness keeps rising','Gains slow but have not stopped, following a power law rather than approaching a ceiling.'],['Rare innovations','One population evolved aerobic citrate use after ~31,000 generations, possible only because of earlier potentiating mutations.']],28,{d0:.8,gap:22});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y,A.y+A.h+56)),s:s+b.s};
}
function scG7(n){
  const items=[['Fitness landscapes','Picture genotypes as places and fitness as height. Adaptation climbs; the shape of the landscape decides which routes are open.'],['Epistasis','The effect of one mutation depends on others. Sign epistasis, where a mutation is good on one background and bad on another, makes some routes impassable.'],['Few roads to resistance','Weinreich and colleagues (2006) built all 32 combinations of five β-lactamase mutations: only 18 of the 120 possible orders lead uphill to high cefotaxime resistance.'],['Diminishing returns','Beneficial mutations often help less in fitter backgrounds, one reason fitness gains slow down.']];
  const c=cards(n,items,{y:20,num:1});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scG8(n){
  const A=n?axes(48,30,292,170,{xr:[0,100],yr:[0,1],xt:[],yt:[],xlab:'time',ylab:'frequency'}):axes(60,30,360,190,{xr:[0,100],yr:[0,1],xt:[],yt:[],xlab:'time',ylab:'frequency'});
  const L=(k,t0)=>t=>1/(1+Math.exp(-k*(t-t0)));
  const fb=L(.12,45), fc=t=>Math.min(fb(t),L(.22,80)(t)), fa=t=>Math.min(.42*Math.exp(-Math.pow((t-30)/16,2)),1-fb(t));
  const band=(lo,hi,col,t0=0)=>{let up='',dn='';for(let i=t0;i<=100;i++){const t=i;up+=(i>t0?' L':'M')+FX(A.px(t))+' '+FX(A.py(hi(t)));dn=' L'+FX(A.px(t))+' '+FX(A.py(lo(t)))+dn;}return `<path d="${up}${dn}Z" fill="${col}" stroke="${INK}" stroke-width=".6"/>`;};
  let s=A.s+`<rect x="${A.x}" y="${A.y}" width="${A.w}" height="${A.h}" fill="#EFE6D2"/>`
    +G('a-fade',.2,band(t=>0,fa,'#E7A99B')+T(FX(A.px(30)),FX(A.py(.12)),'A','mono mid f11'))
    +G('a-fade',.4,band(t=>1-fb(t),t=>1,'#A9C4DC')+T(FX(A.px(62)),FX(A.py(.9)),'B','mono mid f11'))
    +G('a-fade',.6,band(t=>1-fb(t)+(fb(t)-fc(t))/2,t=>1-(fb(t)-fc(t))/2,'#C6D3A8',52)+T(FX(A.px(92)),FX(A.py(.5)+4),'B+C','mono mid f11'))
    +T(FX(A.px(8)),FX(A.py(.6)),'ancestor','note start f11');
  const b=n?bullets(24,A.y+A.h+50,[['Clonal interference','In large asexual populations several beneficial mutations arise at once and compete; only one lineage can win.'],['A wins, then loses','A rises but is outcompeted by B. C arises within B and sweeps. Many beneficial mutations are lost.']],44,{d0:.8,gap:20})
    :bullets(450,46,[['Clonal interference','In large asexual populations several beneficial mutations arise at once in different cells. Without recombination they cannot combine, so they compete.'],['Winners and losers','A rises but is outcompeted by B; C arises within B and sweeps. Many beneficial mutations are lost this way.'],['Seen by barcoding','Tracking hundreds of thousands of barcoded lineages, as Levy and colleagues did in yeast in 2015, shows the same dynamics in detail.']],24,{d0:.8,gap:20});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y,A.y+A.h+56)),s:s+b.s};
}
function scG9(n){
  const items=[['A cost, often','Resistance mutations frequently slow growth: altered ribosomal proteins (streptomycin), RNA polymerase (rifampicin) or gyrase (quinolones) work less well. Carrying plasmids costs too.'],['Compensation, not reversion','When the drug is removed, resistant strains usually acquire second-site compensatory mutations that restore fitness without losing resistance, because there are many more ways to compensate than to revert.'],['Some resistance is free','Some mutations cost almost nothing, such as rpsL K43R (streptomycin) in Mycobacterium tuberculosis or K42R in E. coli and Salmonella. Then resistance persists for good.'],['Implications','Stopping use of a drug does not reliably bring back susceptibility, a central problem for stewardship.']];
  const c=cards(n,items,{y:20,num:1});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
const S=[
 {p:1,title:'Evolution in a flask',draw:scG1,text:"Bacteria let us run evolution as an experiment. Populations of billions grow through several generations a day, samples can be frozen and revived, and an evolved strain can be competed directly against its own ancestor. The basic forces are covered in the Mutation, Selection and Drift primer; this one shows what happens when we watch them act."},
 {p:1,title:'Experimental evolution',draw:scG6,text:"Richard Lenski's long-term evolution experiment has followed twelve E. coli populations since 1988. Fitness has risen throughout, more slowly over time but without levelling off, and rare innovations such as citrate use have appeared only after many generations of groundwork."},
 {p:1,title:'Bottlenecks in the flask',chips:'pop',draw:scG3,text:"Each daily transfer keeps only a sample of the culture, so chance decides which lineages carry on. Pick a population size: small populations drift quickly to fixation or loss, while large ones hold steady. Experimenters choose transfer sizes so that selection, not chance, drives the outcome."},
 {p:1,title:'Clonal interference',draw:scG8,text:"In large asexual populations, beneficial mutations arise in different lineages at the same time and compete. Only one lineage can take over, so many good mutations are lost. This clonal interference slows adaptation and is one reason recombination is valuable."},
 {p:1,title:'Landscapes and epistasis',draw:scG7,text:"The effect of a mutation often depends on the genetic background. This epistasis shapes the fitness landscape, making some evolutionary paths accessible and others not. Studies of antibiotic resistance enzymes show that only a few orders of mutations lead uphill."},
 {p:2,title:'The cost of resistance',draw:scG9,text:"Resistance often comes at a cost in growth. But when the drug is withdrawn, bacteria usually compensate with second mutations rather than revert, and some resistance mutations cost almost nothing. Resistance, once common, tends to stay."}];
const CHIPS={pop:{list:POPS.map(p=>p.k),get:()=>popSel,set:k=>popSel=k}};
