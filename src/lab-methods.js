/*META
{"title":"Methods in the Lab","eyebrow":"Methods · an animated primer","h1":"How microbiologists grow, count and measure cells","parts":["Culture","Isolation","Molecules","Single cells"],"foot":"Figures such as culturability and maturation times are typical values that vary widely with organism and protocol. Cloning, sequencing, Tn-seq and CRISPR have their own primers.","description":"Aseptic technique and media, streak plates and pure culture, anaerobic methods, enrichment and culturomics, qPCR, transcriptomics, proteomics, metabolomics, ChIP-seq, single-cell methods and reporter genes."}
META*/
const OMX=[
 {k:'RNA-seq',steps:['stabilise|RNA','deplete|rRNA','cDNA|library','sequence,|count'],meas:'transcripts of every gene at once, with strand; variants map transcription start sites (dRNA-seq) and small RNAs',quant:'reads counted per gene and compared between conditions with count models such as DESeq2; at least three biological replicates',pit:'Most bacterial RNA is rRNA and mRNA has no poly(A) tail, so rRNA must be depleted; mRNAs last only minutes, so cells are stabilised or frozen at once.',note:'Transcript levels are a proxy: protein levels correlate only moderately with them, because translation and protein stability are regulated too.'},
 {k:'Proteomics',steps:['lyse,|digest','LC|separate','MS/MS|spectra','match to|database'],meas:'proteins, identified from their tryptic peptides; also modifications such as phosphorylation',quant:'label-free: peptide intensities compared across runs, any number of samples; TMT: isobaric tags let up to about 16–18 samples share one run, more precise but ratios are compressed',pit:'Low-abundance and membrane proteins are under-sampled; a database of predicted proteins is needed to name peptides.',note:'In LC–MS/MS, peptides separated by liquid chromatography are ionised, selected and fragmented; the fragment spectrum identifies the sequence. A run on E. coli typically finds a few thousand proteins, most of the expressed proteome.'},
 {k:'Metabolomics',steps:['quench|(cold)','extract','LC–MS|or NMR','identify|features'],meas:'small molecules: sugars, amino acids, nucleotides, cofactors, lipids, secondary metabolites',quant:'targeted: a chosen list, measured against pure standards, often in absolute amounts; untargeted: thousands of features compared between samples, many never identified',pit:'Metabolites turn over in seconds, so sampling must quench metabolism instantly; medium carry-over and ion suppression distort signals.',note:'Mass spectrometry is far more sensitive; NMR is less sensitive but quantitative, reproducible and non-destructive, and identifies structures directly. Isotope tracing with ¹³C-glucose follows flux, not just levels.'},
 {k:'ChIP-seq',steps:['cross-|link','shear|DNA','antibody|pull-down','sequence,|call peaks'],meas:'where a protein binds the genome: transcription factors, σ factors, RNA polymerase, nucleoid proteins',quant:'reads compared with an input-DNA control; enriched regions called as peaks (for example with MACS) at tens of base pairs resolution',pit:'Depends on antibody quality, so proteins are often epitope-tagged; formaldehyde crosslinking captures indirect contacts; highly transcribed regions can give false peaks.',note:'Binding is not regulation: many ChIP peaks have no measurable effect on the nearby gene. Combining ChIP-seq with RNA-seq of a mutant separates direct from indirect targets.'}];
let omxSel=0;
function streakDish(cx,cy,R){
  let s=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="${AGAR}" stroke="${GLASSE}" stroke-width="1.8"/><circle cx="${cx}" cy="${cy}" r="${R-4}" fill="none" stroke="${GLASSE}" stroke-width=".6" opacity=".7"/>`;
  const rr=rnd(7), dens=[1,.35,.12,.07], k=R/80;
  for(let q=0;q<4;q++){const a=q*Math.PI/2, ca=Math.cos(a), sa=Math.sin(a), P=[];
    for(let i=0;i<7;i++){const lx=(-34+i*11)*k, ly=(i%2?-58:-36)*k; P.push([cx+lx*ca-ly*sa, cy+lx*sa+ly*ca]);}
    s+=`<path d="M${P.map(p=>FX(p[0])+' '+FX(p[1])).join(' L')}" stroke="#B89A5E" stroke-width="1" fill="none" opacity=".7"/>`;
    for(let i=0;i<P.length-1;i++)for(let t=0;t<1;t+=.08){if(rr()<dens[q]){const x=P[i][0]+(P[i+1][0]-P[i][0])*t, y=P[i][1]+(P[i+1][1]-P[i][1])*t, r=q===3?3.6:q===2?3:2.2;
      s+=`<circle cx="${FX(x)}" cy="${FX(y)}" r="${r}" fill="${COLC}" stroke="${INK}" stroke-width=".5"/>`;}}
  }
  const lab=[[0,-1,'1'],[1,0,'2'],[0,1,'3'],[-1,0,'4']];
  lab.forEach(([dx,dy,l])=>{s+=Tc(FX(cx+dx*R*.22),FX(cy+dy*R*.22+4),l,'#6A5B47',11,'mono mid','600');});
  return s;}
function scL1(n){return introPlate(n,{q:'How do you turn a drop of pond water into data?',
  belief:'Most of microbiology rests on a few practical skills: keeping cultures pure, giving organisms the conditions they need, and then measuring their molecules, from DNA and RNA to proteins and metabolites, in populations or in single cells.',
  items:['Aseptic technique and pure culture','Media and anaerobic methods','Enrichment, culturomics and the plate count anomaly','qPCR','Omics methods compared','Single-cell methods','Reporter genes'],
  art:(cx,cy)=>streakDish(cx,cy-6,62)+T(cx,cy+76,'a quadrant streak plate','note mid f11'),artH:170});}
function scL2(n){
  return artBullets(n,(cx,cy)=>streakDish(cx,cy,n?84:96)+T(cx,cy+(n?84:96)+20,'streak in order 1 → 4','note mid f11'),220,230,
   [['Aseptic practice','Sterilise media and glassware (autoclave, 121 °C for 15 minutes), flame or use sterile disposable loops, and work by a flame or in a biosafety cabinet so nothing from the air or your hands gets in.'],['The streak plate','Each quadrant drags cells from the last across fresh agar, diluting them. By the third or fourth, single cells are far enough apart to grow into separate colonies.'],['Pure culture','A colony usually arises from one cell, so restreaking a single colony gives a clone. Check it under the microscope and by restreaking before trusting it.'],['Solid media','Fanny Hesse suggested agar in Koch’s laboratory in 1881, and Julius Petri described his dish in 1887. Agar melts near 85 °C, sets near 40 °C, and few microbes digest it.']],{gap:18});
}
function scL3(n){
  const rows=[['Defined','every ingredient chemically known','M9 salts with glucose: tests what a strain can make for itself'],['Complex','extracts and digests of yeast, meat or soy; exact make-up unknown','LB, tryptic soy broth: rich, fast growth'],['Selective','contains something that stops some organisms growing','MacConkey (bile salts, crystal violet against Gram-positives); mannitol salt (7.5% NaCl, for staphylococci)'],['Differential','an indicator shows a difference between colonies','MacConkey: lactose fermenters turn pink with neutral red; blood agar shows haemolysis'],['Enrichment','favours a rare organism by its unusual needs, usually liquid','nitrogen-free medium for N₂ fixers; selenite broth for Salmonella']];
  const t=wtable(n,['Medium','What defines it','Example'],rows,n?[[10,11],[100,16],[226,16]]:[[24,14],[150,34],[390,34]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+12,'Many media are several types at once: MacConkey is both selective and differential. Clinical laboratories combine them so a single plate narrows down an identification, later confirmed by MALDI-TOF mass spectrometry or sequencing.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function scL4(n){
  const roll=(cx,cy)=>{let s=`<rect x="${cx-46}" y="${cy-11}" width="86" height="22" rx="11" fill="#DCE6E8" stroke="${GLASSE}" stroke-width="1.4"/><rect x="${cx+38}" y="${cy-13}" width="14" height="26" rx="2" fill="#3A3A3A"/>`;
    [[-30,-5],[-18,4],[-6,-6],[8,5],[20,-4],[-24,6],[14,-7]].forEach(([dx,dy])=>{s+=`<circle cx="${cx+dx}" cy="${cy+dy}" r="2.2" fill="${COLC}" stroke="${INK}" stroke-width=".4"/>`;});return s;};
  const chamber=(cx,cy)=>`<rect x="${cx-56}" y="${cy-22}" width="112" height="44" rx="4" fill="#DCE6E8" stroke="${GLASSE}" stroke-width="1.4"/><rect x="${cx+56}" y="${cy-10}" width="16" height="24" fill="#D8D2C2" stroke="${GLASSE}"/><circle cx="${cx-20}" cy="${cy+4}" r="9" fill="#3A3A3A"/><circle cx="${cx+20}" cy="${cy+4}" r="9" fill="#3A3A3A"/>`;
  const jar=(cx,cy)=>{let s=`<rect x="${cx-26}" y="${cy-24}" width="52" height="48" rx="6" fill="#DCE6E8" stroke="${GLASSE}" stroke-width="1.4"/><rect x="${cx-30}" y="${cy-28}" width="60" height="8" rx="2" fill="#6A5B47"/>`;
    for(let i=0;i<3;i++)s+=`<rect x="${cx-20}" y="${cy-14+i*10}" width="30" height="6" rx="1" fill="${AGAR}" stroke="${GLASSE}" stroke-width=".6"/>`;return s+`<rect x="${cx+13}" y="${cy-14}" width="8" height="28" fill="#F3EEE2" stroke="${INK}" stroke-width=".6"/>`;};
  const redox=(cx,cy)=>tube(cx-20,cy+26,{h:50,fill:'#E7A0B4'})+tube(cx+20,cy+26,{h:50,fill:'#EFE6D2'})+T(cx-34,cy+4,'oxidised','note end f10')+T(cx+34,cy+4,'reduced','note start f10');
  const items=[['Hungate roll tubes','Robert Hungate’s method for rumen microbes (1950s): medium is boiled and dispensed under oxygen-free gas, sealed with butyl rubber stoppers, and the agar is rolled to coat the tube wall, where colonies grow.',roll],
    ['Anaerobic chambers','A glove box filled with nitrogen with a few percent H₂ and CO₂. A palladium catalyst turns traces of O₂ and H₂ into water; an airlock lets plates in and out.',chamber],
    ['Anaerobic jars','A sealed jar for plates with a sachet that generates H₂ and CO₂ or absorbs O₂. Simple and cheap, but less strict than a chamber.',jar],
    ['Redox indicators','Resazurin in the medium is pink when oxidised and colourless when reduced. Reducing agents such as cysteine or sulfide lower the potential further for strict anaerobes like methanogens.',redox]];
  const c=cards(n,items,{y:20,artH:58});
  const p=para(n?16:24,c.y+10,'Strict anaerobes can be killed by minutes of air, so every step from sampling to plating must exclude oxygen. Tolerant anaerobes, such as many clostridia, survive brief exposure.',n?50:92,'note start f13',17,1.2);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:c.s+p.s};
}
function scL5(n){
  const N=n?{s:{x:90,y:36,w:150,t:'environmental|sample'},e:{x:270,y:36,w:150,t:'enrichment|culture',f:PAL.green},i:{x:270,y:116,w:150,t:'isolation|on plates',f:PAL.gold},p:{x:90,y:116,w:150,t:'pure culture',f:PAL.blue},d:{x:90,y:196,w:150,t:'identify|(MALDI-TOF, 16S)',f:PAL.lilac}}
    :{s:{x:72,y:44,w:110,t:'environmental|sample'},e:{x:196,y:44,w:100,t:'enrichment|culture',f:PAL.green},i:{x:320,y:44,w:100,t:'isolation|on plates',f:PAL.gold},p:{x:444,y:44,w:100,t:'pure|culture',f:PAL.blue},d:{x:568,y:44,w:110,t:'identify|(MALDI, 16S)',f:PAL.lilac}};
  let s=G('a-fade',0,flow(N,[['s','e',''],['e','i',''],['i','p',''],['p','d','']]));
  const b=bullets(n?24:30,n?254:110,[['Enrichment','Beijerinck and Winogradsky’s idea: choose conditions, such as no fixed nitrogen or one unusual carbon source, that let a rare organism outgrow the rest, then isolate it.'],['The great plate count anomaly','Staley and Konopka named it in 1985: microscopic counts of environmental samples exceed colony counts by a hundred- to ten-thousand-fold. Often under 1% of cells form colonies on standard media.'],['Why cells do not grow','Slow growth, dependence on partners, dormancy, unknown nutrients, or media that are too rich. Dilution to extinction in natural seawater gave the first SAR11 isolate (2002); diffusion chambers such as the iChip grow cells in their own soil.'],['Culturomics','Jean-Christophe Lagier, Didier Raoult and colleagues cultured gut samples in hundreds of conditions and identified colonies by MALDI-TOF, isolating over a thousand gut species, hundreds of them new.']],n?44:88,{d0:.8,gap:18});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scL6(n){
  const A=n?axes(54,40,280,140,{xr:[0,40],yr:[0,1],xt:[[0,'0'],[10,'10'],[20,'20'],[30,'30'],[40,'40']],yt:[],xlab:'cycle',ylab:'fluorescence'})
    :axes(60,40,280,160,{xr:[0,40],yr:[0,1],xt:[[0,'0'],[10,'10'],[20,'20'],[30,'30'],[40,'40']],yt:[],xlab:'cycle',ylab:'fluorescence'});
  const mids=[18,21.3,24.6], cols=['#2F5276','#4F7A3F','#A4473A'], thr=.12;
  const sig=m=>x=>.95/(1+Math.exp(-(x-m)/1.4));
  let s=A.s+G('a-fade',.2,ln(A.x,FX(A.py(thr)),A.x+A.w,FX(A.py(thr)),'#6A5B47',1,'4 3')+T(A.x+A.w-2,FX(A.py(thr)-5),'threshold','note end f10 halo'));
  mids.forEach((m,i)=>{const ct=m-1.4*Math.log(.95/thr-1);s+=G('a-fade',(.4+i*.2).toFixed(1),curve(A,sig(m),{col:cols[i],n:160})+`<circle cx="${FX(A.px(ct))}" cy="${FX(A.py(thr))}" r="3" fill="${cols[i]}"/>`);});
  s+=G('a-fade',1,T(FX(A.px(14.5)),FX(A.py(.7)),'10⁶','mono end f11')+T(FX(A.px(28)),FX(A.py(.7)),'10⁴ copies','mono start f11')+T(FX(A.px(15.3)),FX(A.py(.03)+0),'Ct','note mid f10 halo'));
  const B=n?axes(54,A.y+A.h+90,280,110,{xr:[2,7],yr:[14,32],xt:[[2,'10²'],[4,'10⁴'],[6,'10⁶']],yt:[[15,'15'],[25,'25']],xlab:'starting copies (log)',ylab:'Ct'})
    :axes(410,40,190,160,{xr:[2,7],yr:[14,32],xt:[[2,'10²'],[4,'10⁴'],[6,'10⁶']],yt:[[15,'15'],[25,'25']],xlab:'starting copies (log)',ylab:'Ct'});
  const ct=x=>18+3.32*(6-x);
  s+=G('a-fade',1.2,B.s+curve(B,ct,{col:'#6A5B47',w:1.4,from:2,to:7})+[2,3,4,5,6,7].map(x=>`<circle cx="${FX(B.px(x))}" cy="${FX(B.py(ct(x)))}" r="3.2" fill="#2F5276"/>`).join('')+T(FX(B.px(5.6)),FX(B.py(29)),'slope −3.32','note mid f11 halo')+T(FX(B.px(5.6)),FX(B.py(26.5)),'= 100% efficient','note mid f11 halo'));
  const b=bullets(n?24:30,B.y+B.h+62,[['Cycle threshold','Ct is the cycle at which fluorescence crosses a threshold set in the exponential phase. Ten times more template crosses about 3.3 cycles earlier.'],['Efficiency and standard curves','A dilution series plotted as Ct against log copies gives a line; efficiency = 10^(−1/slope) − 1. A slope of −3.32 means perfect doubling; 90–110% is usually accepted.'],['ΔΔCt','Livak and Schmittgen (2001): normalise the target to a reference gene (ΔCt), compare with a control condition (ΔΔCt); fold change ≈ 2^−ΔΔCt, valid only when efficiencies are near 100%.'],['Chemistry','SYBR Green binds any double-stranded DNA, so a melt curve checks for a single product; TaqMan probes add sequence specificity. RT-qPCR measures RNA after reverse transcription.']],n?44:88,{d0:1.4,gap:18});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scL7(n){
  const o=OMX[omxSel];
  const art=(cx,cy)=>{const w=n?66:120, dx=n?86:150, N={};o.steps.forEach((t,i)=>{N['n'+i]={x:cx+(i-1.5)*dx,y:cy,w,t,fs:n?10:12,f:i===3?PAL.blue:'#EFE6D2'};});
    return flow(N,[['n0','n1',''],['n1','n2',''],['n2','n3','']]);};
  return explorer(n,{h:o.k,rows:[['Measures',o.meas],['Quantification',o.quant],['Pitfalls',o.pit]],note:o.note,art,artH:54},{y:20});
}
function scL8(n){
  const mm=(cx,cy)=>{let s=`<rect x="${cx-70}" y="${cy+12}" width="140" height="12" fill="#A9C4DC" opacity=".6"/>`;
    for(let i=0;i<6;i++){const x=cx-60+i*24;s+=`<rect x="${x-5}" y="${cy-24}" width="10" height="36" fill="#EFE6D2" stroke="${GLASSE}" stroke-width=".8"/>`+`<rect x="${x-3.5}" y="${cy-22}" width="7" height="13" rx="3.5" fill="#4F7A3F"/><rect x="${x-3.5}" y="${cy-8}" width="7" height="13" rx="3.5" fill="#A9C49A"/>`;}
    return s;};
  const fish=(cx,cy)=>{let s=`<rect x="${cx-60}" y="${cy-22}" width="120" height="44" rx="4" fill="#14181A"/>`;
    [[-36,-8,'#E7A99B'],[-8,6,'#7FD08A'],[20,-6,'#7FD08A'],[40,8,'#E7A99B']].forEach(([dx,dy,c])=>{s+=`<rect x="${cx+dx-12}" y="${cy+dy-6}" width="24" height="12" rx="6" fill="${c}" opacity=".85"/>`;});return s;};
  const flowc=(cx,cy)=>{let s=`<rect x="${cx-8}" y="${cy-26}" width="16" height="52" fill="#DCE6E8" stroke="${GLASSE}"/>`;
    [-18,-4,10].forEach(d=>{s+=`<rect x="${cx-3}" y="${cy+d-4}" width="6" height="9" rx="3" fill="#4F7A3F"/>`;});
    return s+`<line x1="${cx-60}" y1="${cy-4}" x2="${cx-10}" y2="${cy-4}" stroke="#A4473A" stroke-width="2"/>`+`<line x1="${cx+10}" y1="${cy-4}" x2="${cx+50}" y2="${cy-16}" stroke="#7FD08A" stroke-width="1.4" stroke-dasharray="3 2"/><line x1="${cx+10}" y1="${cy-4}" x2="${cx+54}" y2="${cy-2}" stroke="#7FD08A" stroke-width="1.4" stroke-dasharray="3 2"/>`;};
  const split=(cx,cy)=>{let s='';const C=['#2F5276','#4F7A3F','#A4473A','#C99A2E'];
    for(let r=0;r<3;r++)for(let c=0;c<3;c++){const x=cx-48+c*32, y=cy-18+r*14;s+=`<rect x="${x}" y="${y}" width="28" height="10" rx="2" fill="#EFE6D2" stroke="${INK}" stroke-width=".5"/><rect x="${x+2}" y="${y+2}" width="7" height="6" fill="${C[r]}"/><rect x="${x+10}" y="${y+2}" width="7" height="6" fill="${C[c]}"/><rect x="${x+18}" y="${y+2}" width="7" height="6" fill="${C[(r+c)%4]}"/>`;}
    return s;};
  const items=[['Microfluidics and the mother machine','Cells grow in channels a few micrometres wide, fed by flowing medium. In the mother machine (Wang, Jun and colleagues, 2010) the cell at the closed end of each dead-end channel can be followed for hundreds of generations.',mm],
    ['FISH','Fluorescently labelled oligonucleotides bind ribosomal RNA, so cells of a chosen taxon light up in a mixed sample. Single-molecule FISH counts individual mRNAs in each cell.',fish],
    ['Flow cytometry','Cells stream one by one through a laser, thousands per second; scatter and fluorescence are recorded for each. Fluorescence-activated cell sorting (FACS) isolates chosen cells.',flowc],
    ['Single-cell RNA-seq in bacteria','Hard, because a cell holds only a few thousand mRNAs at most, without poly(A) tails. Split-pool barcoding methods (PETRI-seq, microSPLiT, 2020–21) label each cell’s RNA in fixed cells.',split]];
  const c=cards(n,items,{y:20,artH:58});
  const p=para(n?16:24,c.y+10,'Population averages hide heterogeneity: persisters, bistable switches and division asymmetry are only visible cell by cell.',n?50:92,'note start f13',17,1.2);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:c.s+p.s};
}
function scL9(n){
  const A=n?axes(54,40,280,140,{xr:[0,90],yr:[0,90],xt:[[0,'0'],[30,'30'],[60,'60'],[90,'90 min']],yt:[],xlab:'time after promoter turns on',ylab:'signal'})
    :axes(70,40,280,160,{xr:[0,90],yr:[0,90],xt:[[0,'0'],[30,'30'],[60,'60'],[90,'90 min']],yt:[],xlab:'time after promoter turns on',ylab:'signal'});
  const mat=tau=>t=>t-tau*(1-Math.exp(-t/tau));
  let s=A.s+G('a-fade',.3,curve(A,t=>t,{col:'#6A5B47',w:1.4,dash:'4 3'})+curve(A,mat(8),{col:'#4F7A3F'})+curve(A,mat(40),{col:'#A4473A'}));
  s+=G('a-fade',.8,T(FX(A.px(60)),FX(A.py(78)),'protein made','note end f11 halo')+T(FX(A.px(89)),FX(A.py(57)),'fast-maturing','note end f11 halo')+T(FX(A.px(88)),FX(A.py(26)),'slow-maturing','note end f11 halo'));
  const right=[['lacZ','β-galactosidase is assayed in lysates with ONPG, which turns yellow (Miller units, 1972), or on plates with X-gal, which turns colonies blue.'],['Luciferase (lux)','The luxCDABE operon, from Photorhabdus or Vibrio, makes both enzyme and substrate, so cells glow with no additions. Light needs O₂ and reducing power, so it also reports metabolic activity.']];
  const low=[['GFP','From the jellyfish Aequorea victoria; Chalfie used it as a reporter in 1994. The chromophore forms by itself but needs O₂ and time: fast variants such as superfolder GFP mature in minutes, some red proteins take an hour or more.'],['Tuning the reporter','GFP is very stable, so it reports accumulated, not current, expression; degradation tags (ssrA variants) make short-lived versions. Under anoxia, flavin-binding or FAST tags replace GFP.']];
  let b;
  if(n)b=bullets(24,A.y+A.h+60,right.concat(low),44,{d0:1,gap:18});
  else{const r=bullets(410,52,right,28,{d0:1,gap:28,nonum:1});const lo=bullets(30,Math.max(r.y,A.y+A.h+60),low,88,{d0:1.4,gap:28,nonum:1});b={s:r.s+lo.s,y:lo.y};}
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
const S=[
 {p:1,title:'From sample to data',draw:scL1,text:"Laboratory microbiology begins with growing organisms reliably and ends with measuring what they do. This primer covers culture and isolation, then the molecular methods that read out DNA, RNA, proteins and metabolites, and the tools that follow single cells."},
 {p:1,title:'Pure culture',draw:scL2,text:"Since Robert Koch's laboratory in the 1880s, microbiology has relied on pure cultures, all descended from one cell. Aseptic technique keeps contaminants out; the streak plate dilutes cells across agar until single colonies appear."},
 {p:1,title:'Media',draw:scL3,text:"Media are designed for a purpose. Defined media reveal what a strain can make for itself, complex media grow it fast, and selective and differential media pick out and distinguish particular organisms in a mixture, the basis of clinical diagnostics."},
 {p:1,title:'Growing anaerobes',draw:scL4,text:"Strict anaerobes, which include most gut bacteria and all methanogens, die or stop growing in air. Robert Hungate's roll tubes, anaerobic chambers and jars, and redox indicators make it possible to grow them in the laboratory."},
 {p:2,title:'Enrichment and the uncultured majority',draw:scL5,text:"Enrichment culture selects for organisms with particular abilities, a method pioneered by Beijerinck and Winogradsky. Yet most cells seen under the microscope never form colonies on standard plates, the great plate count anomaly. Culturomics and new devices are steadily shrinking that gap."},
 {p:3,title:'PCR and qPCR',draw:scL6,text:"Quantitative PCR follows amplification as it happens, using a fluorescent dye or probe. The more template at the start, the earlier the signal crosses a threshold. Standard curves give absolute amounts and the ΔΔCt method relative changes in expression. PCR itself and cloning are covered in the molecular cloning primer."},
 {p:3,title:'Omics methods compared',chips:'omx',draw:scL7,text:"Omics methods measure thousands of molecules at once: transcripts by RNA-seq, proteins by mass spectrometry, metabolites by mass spectrometry or NMR, and protein binding sites on DNA by ChIP-seq. Pick one to see its workflow, how it quantifies and where it misleads. Sequencing technology has its own primer."},
 {p:4,title:'Single cells',draw:scL8,text:"Genetically identical cells differ. Microfluidic devices, fluorescence in situ hybridisation, flow cytometry and new single-cell sequencing methods measure cells one at a time, revealing variation that population averages hide."},
 {p:4,title:'Reporter genes',draw:scL9,text:"A reporter gene fused to a promoter turns its activity into something easy to measure: colour, light or fluorescence. Each reporter has quirks. Fluorescent proteins lag behind expression while they mature, and stable ones accumulate, so the signal is not a direct readout of current promoter activity."}];
const CHIPS={omx:{list:OMX.map(o=>o.k),get:()=>omxSel,set:k=>omxSel=k}};
