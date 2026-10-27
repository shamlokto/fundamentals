/*META
{"title":"Applied Microbiology","eyebrow":"Applied context · an animated primer","h1":"Putting microbes to work, and keeping them in check","parts":["Industry","Environment and plants","Food","Clinic and design"],"foot":"Production volumes, D-values and turnaround times are rounded, typical figures that vary with strain, product, method and laboratory. Food-safety limits should be taken from current regulations, not from this primer.","description":"Industrial fermentation and bioreactors, bioremediation, rhizobia, mycorrhizae and Agrobacterium, food fermentation, pathogens and thermal processing, clinical diagnostics from culture to metagenomics, and synthetic biology circuits and chassis."}
META*/
const PROD=[
 {k:'Antibiotics',org:'Penicillium chrysogenum (penicillin); Streptomyces species (streptomycin, tetracyclines, many others)',sc:'penicillin titres rose from a few milligrams to tens of grams per litre through strain improvement',pr:'aerobic fed-batch; the antibiotic is a secondary metabolite made after growth slows, so sugar is fed slowly to hold the culture in production',note:'The 1943 Peoria strain of P. chrysogenum, found on a mouldy cantaloupe, and corn-steep liquor medium made wartime penicillin possible. Industrial strains were then improved by rounds of random mutagenesis and selection.'},
 {k:'Amino acids',org:'Corynebacterium glutamicum, isolated in Japan in 1956',sc:'millions of tonnes a year of L-glutamate (flavour enhancer) and L-lysine (animal feed)',pr:'aerobic fed-batch; glutamate is excreted when biotin is limiting or after penicillin or detergent treatment; lysine strains carry a feedback-resistant aspartokinase',note:'C. glutamicum was found by screening soil for bacteria that excrete glutamate. Lysine producers are now built by rational metabolic engineering of the whole pathway.'},
 {k:'Enzymes',org:'Bacillus species (amylases, proteases); Aspergillus and Trichoderma reesei (amylases, cellulases)',sc:'detergent proteases, starch processing, baking, brewing, textile and feed enzymes',pr:'secreted enzymes are harvested from the broth; most are made by recombinant production strains',note:'Recombinant chymosin made by fungi and yeast replaced most calf rennet for cheese-making after approval in the US in 1990.'},
 {k:'Ethanol',org:'Saccharomyces cerevisiae; Zymomonas mobilis in some processes',sc:'about 100 billion litres a year, mostly from maize starch and sugarcane',pr:'anaerobic batch or fed-batch; yeast is often recycled; ethanol is distilled off',note:'Yeast tolerates ethanol at more than 10% and low pH, which keeps contaminants down. Making ethanol from lignocellulose needs enzymes and strains that also use pentose sugars.'},
 {k:'Citric acid',org:'Aspergillus niger',sc:'about 2 million tonnes a year, for food, drinks and detergents',pr:'aerobic submerged culture on sugar at pH about 2 with manganese and iron kept very low, which blocks the TCA cycle and makes the mould overflow citrate',note:'Industrial production by A. niger began around 1919 and replaced extraction from Italian lemons.'},
 {k:'Biopharmaceuticals',org:'Escherichia coli, Saccharomyces cerevisiae, Pichia (Komagataella); mammalian CHO cells for antibodies',sc:'insulin, growth hormone, vaccine antigens, enzymes, antibodies',pr:'high-density fed-batch; proteins purified to pharmaceutical standards under strict process control',note:'Human insulin made in E. coli was the first recombinant drug approved, in 1982. Most complex glycoproteins still need mammalian cells.'}];
let prSel=0;
const PATH=[
 {k:'Listeria',full:'Listeria monocytogenes',src:'ready-to-eat foods: soft cheeses, deli meats, smoked fish, pre-cut produce; unpasteurised milk',ill:'listeriosis: sepsis, meningitis, miscarriage; about 20–30% of invasive cases die',inc:'usually 1–4 weeks, up to about 10 weeks',ctl:'it grows slowly even in the refrigerator and persists in factory drains, so control relies on hygiene, environmental monitoring and limiting shelf life',note:'Rare but severe: pregnant women, newborns, older and immunocompromised people are most at risk.'},
 {k:'Salmonella',full:'Salmonella enterica (non-typhoidal serovars)',src:'poultry, eggs, pork, raw produce, nuts and spices; also pet reptiles',ill:'gastroenteritis with fever; occasionally invasive',inc:'usually 12–72 hours',ctl:'thorough cooking, avoiding cross-contamination, vaccination of laying flocks',note:'Vaccinating hens in the UK from the late 1990s sharply cut egg-associated Salmonella Enteritidis infections.'},
 {k:'Campylobacter',full:'Campylobacter jejuni and C. coli',src:'undercooked poultry and cross-contamination in the kitchen; raw milk; untreated water',ill:'bloody or watery diarrhoea and cramps; occasionally followed by Guillain–Barré syndrome',inc:'2–5 days',ctl:'it cannot grow in food at room temperature but a few hundred cells can infect, so cooking and kitchen hygiene matter most',note:'The most commonly reported bacterial cause of gastroenteritis in Europe; most chicken carcasses at retail carry it.'},
 {k:'STEC',full:'Shiga toxin–producing E. coli, such as O157:H7',src:'undercooked minced beef, raw milk, leafy greens and sprouts, contact with cattle',ill:'bloody diarrhoea; haemolytic uraemic syndrome with kidney failure in roughly 5–10% of infected children',inc:'3–4 days on average',ctl:'cooking mince right through, pasteurisation, clean irrigation water; the infectious dose is under about 100 cells',note:'In 2011 an O104:H4 outbreak traced to fenugreek sprouts in Germany caused more than 3,800 cases and over 50 deaths.'},
 {k:'C. botulinum',full:'Clostridium botulinum',src:'improperly home-canned low-acid foods, fermented fish, some cured meats; honey for infants',ill:'botulism: descending flaccid paralysis caused by neurotoxin',inc:'usually 12–36 hours',ctl:'the 12D cook for low-acid canned food, acidity below pH 4.6, salt, nitrite, low water activity and refrigeration',note:'The spores survive boiling, so canning safety was built around killing them: the origin of the 12D concept.'}];
let paSel=0;
function reactor(cx,cy,k,lab){
  const w=90*k, h=140*k, x=cx-w/2, y=cy-h/2;
  let s=`<rect x="${FX(x-6*k)}" y="${FX(y+20*k)}" width="${FX(w+12*k)}" height="${FX(h-14*k)}" rx="${FX(18*k)}" fill="${PAL.blue}" opacity=".5"/>`;
  s+=`<path d="M${FX(x)} ${FX(y)} H${FX(x+w)} V${FX(y+h-20*k)} q0 ${FX(20*k)} ${FX(-20*k)} ${FX(20*k)} H${FX(x+20*k)} q${FX(-20*k)} 0 ${FX(-20*k)} ${FX(-20*k)} Z" fill="${GLASSF}" stroke="${INK}" stroke-width="1.6"/>`;
  s+=`<path d="M${FX(x+2)} ${FX(y+28*k)} H${FX(x+w-2)} V${FX(y+h-20*k)} q0 ${FX(18*k)} ${FX(-18*k)} ${FX(18*k)} H${FX(x+20*k)} q${FX(-18*k)} 0 ${FX(-18*k)} ${FX(-18*k)} Z" fill="${BROTH}"/>`;
  s+=`<rect x="${FX(cx-14*k)}" y="${FX(y-22*k)}" width="${FX(28*k)}" height="${FX(18*k)}" rx="3" fill="${PAL.grey}" stroke="${INK}"/>`+ln(cx,FX(y-4*k),cx,FX(y+h-28*k),INK,2);
  [.45,.75].forEach(f=>{const yy=y+h*f;s+=`<rect x="${FX(cx-20*k)}" y="${FX(yy-5*k)}" width="${FX(40*k)}" height="${FX(10*k)}" fill="${PAL.gold}" stroke="${INK}" stroke-width="1"/>`;});
  const sy=y+h-12*k;s+=ln(FX(x+14*k),FX(sy),FX(x+w-14*k),FX(sy),INK,2)+[.2,.35,.5,.65,.8].map((f,i)=>`<circle cx="${FX(x+w*f)}" cy="${FX(sy-10*k-(i%2)*14*k)}" r="${FX(2.6*k)}" fill="#F3EEE2" stroke="${GLASSE}"/>`).join('');
  s+=ln(FX(x+w-14*k),FX(y-10*k),FX(x+w-14*k),FX(y+h*.55),'#6A5B47',2.4)+`<path d="M${FX(x+12*k)} ${FX(y-14*k)} V${FX(y+16*k)}" stroke="#6A5B47" stroke-width="2.4"/>`;
  if(lab){const L=x-12, R=x+w+18;
    s+=T(FX(cx+20*k),FX(y-26*k),'motor','note start f11')
      +T(FX(L),FX(y+12*k),'feed','note end f11')
      +T(FX(L),FX(y+h*.45+4),'impellers','note end f11')+ln(FX(L+4),FX(y+h*.45),FX(cx-22*k),FX(y+h*.45),'#6A5B47',.7)
      +T(FX(L),FX(sy+4),'sparger (air in)','note end f11')
      +T(FX(R),FX(y+h*.3),'pH, O₂ and','note start f11')+T(FX(R),FX(y+h*.3+13),'temperature probes','note start f11')
      +T(FX(R),FX(y+h*.8),'cooling jacket','note start f11');}
  return s;}
function scM1(n){return introPlate(n,{q:'How do we turn microbes into factories, cleaners, crop partners, food and medical tools, and keep the dangerous ones out?',
  belief:'Applied microbiology uses what microbes already do well: grow fast, make and break almost any molecule, and partner with plants. The same knowledge of growth and death underpins food safety and clinical diagnosis, and synthetic biology now designs new behaviours from parts.',
  items:['Industrial products and bioreactors','Bioremediation','Plant–microbe partnerships','Food fermentation, spoilage and pathogens','D-values, 12D and HACCP','Clinical diagnostics','Synthetic biology'],
  art:(cx,cy)=>reactor(cx,cy+6,1,false),artH:170});}
function scM2(n){
  const p=PROD[prSel];
  return explorer(n,{h:p.k,rows:[['Organisms',p.org],['Product and scale',p.sc],['Process',p.pr]],note:p.note},{y:32});
}
function scM3(n){
  return artBullets(n,(cx,cy)=>reactor(cx,cy,n?1.05:1.1,true),n?200:250,n?200:210,[
   ['Batch, fed-batch, continuous','Batch is simplest. Fed-batch adds substrate gradually, avoiding overflow metabolism (acetate in E. coli, ethanol in yeast) and reaching high cell densities; most industrial processes use it. Continuous culture is rare outside ethanol and research.'],
   ['Oxygen is usually the limit','Oxygen dissolves poorly. Its transfer rate, set by the coefficient kLa, depends on stirring, aeration and pressure, and often caps productivity.'],
   ['Scale-up is not just bigger','In a 100 m³ tank mixing takes far longer, so cells cycle through zones of high sugar and low oxygen; heat removal and shear also change. Processes are scaled by matching kLa, power per volume or mixing time.']],{gap:18,bx:310,wn:44});
}
function scM4(n){
  const C=['PCE','TCE','cis-DCE','vinyl chloride','ethene'];
  const nodes={};C.forEach((c,i)=>{nodes['c'+i]=n?{x:180,y:40+i*66,w:150,t:c,f:i===4?PAL.green:PAL.rose}:{x:[54,170,290,436,578][i],y:56,w:[84,84,96,140,84][i],t:c,f:i===4?PAL.green:PAL.rose};});
  const E=[0,1,2,3].map(i=>['c'+i,'c'+(i+1),n?'+ 2[H], − Cl⁻':'',{side:1}]);
  let s=G('a-fade',0,flow(nodes,E));
  const yb=n?40+4*66+40:100;
  const pp=para(n?16:24,yb,'Each step is organohalide respiration: the chlorinated compound is the electron acceptor and H₂ the donor.',n?50:96,'note start f12',16,.4);s+=pp.s;
  const items=[['Dehalococcoides mccartyi','The only bacteria known to take PCE all the way to harmless ethene. Without them, sites stall at cis-DCE and carcinogenic vinyl chloride.'],['Biostimulation','Add what the native community lacks: electron donors (lactate, vegetable oil), nutrients or oxygen. Fertiliser on oiled beaches after the Exxon Valdez spill in 1989 is the classic case.'],['Bioaugmentation','Add organisms: Dehalococcoides-containing consortia are injected into aquifers where they are missing.'],['Oil and metals','Alkane degraders such as Alcanivorax bloom after spills, as after Deepwater Horizon in 2010. Metals cannot be destroyed, but Geobacter reduces soluble uranium(VI) to insoluble uranium(IV), trapping it underground.']];
  const b=bullets(n?24:30,pp.y+(n?20:22),items,n?44:88,{d0:.8,gap:20});
  return {vb:n?slim(b.y-6):wide(b.y-6),s:s+b.s};
}
function scM5(n){
  const N=n?{fl:{x:180,y:34,w:220,t:'flavonoids from the root',f:PAL.green},nd:{x:180,y:96,w:220,t:'rhizobial NodD|switches on nod genes',f:PAL.blue},nf:{x:180,y:166,w:220,t:'Nod factor (a lipo-|chitooligosaccharide)',f:PAL.gold},cu:{x:180,y:236,w:220,t:'root hair curls;|infection thread',f:PAL.green},bc:{x:180,y:306,w:220,t:'nodule: bacteroids fix N₂',f:PAL.rose}}
    :{fl:{x:80,y:46,w:130,t:'flavonoids|from the root',f:PAL.green},nd:{x:258,y:46,w:180,t:'rhizobial NodD|switches on nod genes',f:PAL.blue},nf:{x:500,y:46,w:196,t:'Nod factor (lipo-|chitooligosaccharide)',f:PAL.gold},cu:{x:500,y:146,w:196,t:'root hair curls;|infection thread',f:PAL.green},bc:{x:200,y:146,w:220,t:'nodule: bacteroids fix N₂|with leghaemoglobin',f:PAL.rose}};
  const E=n?[['fl','nd',''],['nd','nf',''],['nf','cu','plant LysM receptors',{side:1}],['cu','bc','']]:[['fl','nd',''],['nd','nf',''],['nf','cu','plant LysM|receptors',{side:1}],['cu','bc','cortical cells|divide',{side:1}]];
  let s=G('a-fade',0,flow(N,E));
  const items=[['Mycorrhizae','Arbuscular mycorrhizal fungi colonise roots of most land plants, trading phosphate and water for sugars and lipids, a partnership more than 400 million years old.'],['Agrobacterium','Transfers T-DNA from its Ti plasmid into plant chromosomes through a type IV secretion system; the genes make tumours and opines that feed the bacterium. Disarmed, it is the standard tool for making transgenic plants.'],['Growth promotion and biocontrol','Rhizosphere bacteria make auxin, lower ethylene with ACC deaminase, release phosphate and compete with pathogens. Bacillus thuringiensis Cry toxins are used as sprays and in Bt crops.'],['Plant pathogens','Pseudomonas syringae and Xanthomonas inject effectors through type III secretion; Ralstonia and Xylella block the xylem; the oomycete Phytophthora infestans caused the Irish potato famine.']];
  const c=cards(n,items,{y:n?350:200,cw:6.5});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:s+c.s};
}
function scM6(n){
  const top=para(n?16:24,28,'Fermentation is one of the oldest ways to keep food: lactic acid bacteria acidify yoghurt, cheese, sauerkraut and kimchi, yeasts make bread, beer and wine, and moulds ripen cheese and make soy sauce. Spoilage is the same chemistry unwanted. The pathogens below are the main concerns:',n?50:92,'note start f13',17,0);
  const p=PATH[paSel];
  const ex=explorer(n,{h:p.full,rows:[['Typical sources',p.src],['Illness',p.ill],['Incubation',p.inc],['Control',p.ctl]],note:p.note},{y:top.y+30});
  return {vb:ex.vb,s:top.s+ex.s};
}
function scM7(n){
  const A=n?axes(54,40,270,170,{xr:[0,3],yr:[-12,2],xt:[[0,'0'],[1,'1'],[2,'2'],[3,'3 min']],yt:[[2,'2'],[0,'0'],[-6,'−6'],[-12,'−12']],xlab:'time at 121 °C',ylab:'log₁₀ spores per can'})
    :axes(70,40,300,190,{xr:[0,3],yr:[-12,2],xt:[[0,'0'],[1,'1'],[2,'2'],[3,'3 min']],yt:[[2,'2'],[0,'0'],[-6,'−6'],[-12,'−12']],xlab:'time at 121 °C',ylab:'log₁₀ spores per can'});
  const D=.21, f=t=>-t/D;
  let s=A.s+G('a-fade',.3,curve(A,f,{col:'#2F5276',to:12*D})+ln(A.x,FX(A.py(0)),A.x+A.w,FX(A.py(0)),'#9A9384',.8,'3 3'));
  const x1=A.px(0), x2=A.px(D);
  s+=G('a-fade',.6,`<path d="M${FX(x1)} ${FX(A.py(0))} H${FX(x2)} V${FX(A.py(-1))}" stroke="${RED}" stroke-width="1.4" fill="none"/>`+T(FX(x2+4),FX(A.py(.5)),'one D: tenfold fewer','note start f11 halo')
    +ln(FX(A.px(12*D)),FX(A.py(0)),FX(A.px(12*D)),FX(A.py(-12)),RED,1,'4 3')+T(FX(A.px(12*D)-6),FX(A.py(-4)),'12D ≈ 2.5 min','mono end f11 halo')
    +T(FX(A.px(2.45)),FX(A.py(0)-5),'1 spore per can','note end f11 halo'));
  const items=[['D-value','Time at a set temperature to kill 90% of a population. For C. botulinum spores at 121 °C it is about 0.2 minutes.'],['z-value','Temperature rise that cuts D tenfold, about 10 °C for these spores.'],['The 12D cook','Low-acid canned foods are heated to reduce botulinum spores by 12 log units: from 1 spore per can to 1 in a trillion cans.'],['Hurdles','Mild barriers combined, such as acidity, low water activity, salt, preservatives, chilling and packaging, stop growth where no single one would.']];
  const b=n?bullets(24,A.y+A.h+58,items,44,{d0:.9,gap:16}):bullets(400,52,items,33,{d0:.9,gap:22});
  const H=n?b.y-6:Math.max(b.y-6,A.y+A.h+46);
  const p=para(n?16:24,H+12,'HACCP (hazard analysis and critical control points), developed with NASA and Pillsbury in the 1960s, has seven principles: analyse hazards, set critical control points and their limits, monitor them, plan corrective actions, verify, and keep records.',n?50:92,'note start f13',17,1.6);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:s+b.s+p.s};
}
function scM8(n){
  const top=para(n?16:24,28,'Typical time to an answer for a bloodstream infection, in hours',n?50:92,'note start f13',17,0);
  const items=[['blood culture flags positive',24,PAL.grey,'~12–48 h'],['growth to colonies',18,PAL.grey,'~18 h'],['MALDI-TOF identification',.2,PAL.blue,'minutes'],['phenotypic AST',18,PAL.gold,'~16–20 h'],['syndromic PCR panel',1,PAL.green,'~1 h'],['metagenomic sequencing',24,PAL.lilac,'~1 day']];
  const h=hbars(n,n?10:30,top.y+14,n?340:560,items,{max:30,lw:n?150:200});
  const b=bullets(n?24:30,h.y+24,[['MALDI-TOF mass spectrometry','A smear of colony is ionised and the mass fingerprint of abundant proteins, mostly ribosomal, is matched to a database. Routine since about 2010, it replaced days of biochemical tests.'],['Antimicrobial susceptibility','Still needs growth: broth microdilution or disc diffusion read against breakpoints. Rapid systems that follow growth directly cut this to several hours.'],['Molecular and metagenomic tests','Multiplex PCR panels detect dozens of pathogens and a few resistance genes (mecA, KPC, CTX-M) in about an hour. Sequencing all DNA in a sample can find unexpected or unculturable pathogens, but host DNA, contamination and cost limit it, and neither predicts every resistance.']],n?44:88,{d0:.8,gap:20});
  return {vb:n?slim(b.y-6):wide(b.y-6),s:top.s+h.s+b.s};
}
function scM9(n){
  const tx=n?180:160, ty=92;
  const N={a:{x:tx-(n?80:90),y:ty,w:n?100:110,t:'repressor 1|(LacI)',f:PAL.blue},b:{x:tx+(n?80:90),y:ty,w:n?100:110,t:'repressor 2|(cI)',f:PAL.rose}};
  const tee=x=>x.replace(/marker-end="url\(#ah[pr]\)"/g,'marker-end="url(#amTee)"');
  let s=`<defs><marker id="amTee" viewBox="0 0 10 12" refX="8" refY="6" markerWidth="5" markerHeight="7" orient="auto"><path d="M8 0 V12" stroke="#A4473A" stroke-width="3"/></marker></defs>`;
  s+=G('a-fade',0,T(tx,22,'toggle switch','cname mid f14')+tee(flow(N,[['a','b','represses',{bend:-50,red:1,off:22}],['b','a','represses',{bend:-50,red:1,off:22}]]))+T(tx,ty+84,'two stable states; a pulse','note mid f11')+T(tx,ty+98,'of inducer flips it','note mid f11'));
  const rx=n?180:470, ry=n?330:140;
  s+=G('a-fade',.5,T(rx,n?ry-108:22,'repressilator','cname mid f14')+tee(cycle(rx,ry,n?64:66,[{t:'LacI',w:58,f:PAL.blue},{t:'TetR',w:58,f:PAL.gold},{t:'λ cI',w:58,f:PAL.rose}],{labs:['represses','represses','represses'],lr:14}).replace(/stroke="#6A5B47" stroke-width="1.5"/g,'stroke="#A4473A" stroke-width="1.5"')));
  const by=n?ry+122:ry+104;
  const b=bullets(n?24:30,by,[['2000: circuits from parts','Gardner, Cantor and Collins built the toggle switch and Elowitz and Leibler the repressilator, whose three repressors make E. coli cells blink in oscillating cycles.'],['Chassis','E. coli, Bacillus subtilis, yeast and Pseudomonas putida are the usual hosts. JCVI-syn3.0 (2016) runs on a synthetic genome of 473 genes.'],['Biosensors and engineered strains','Whole-cell biosensors report arsenic or other pollutants with a coloured or glowing output. Yeast engineered to make artemisinic acid supplied a semi-synthetic route to the antimalarial artemisinin from 2013.']],n?44:88,{d0:1,gap:20});
  return {vb:n?slim(b.y-6):wide(b.y-6),s:s+b.s};
}
const S=[
 {p:1,title:'Microbes at work',draw:scM1,text:"Microbes make our antibiotics, amino acids, enzymes, fuels and foods, clean polluted ground, feed crops with nitrogen, and are themselves the targets of food safety and clinical microbiology. This deck surveys how that knowledge is applied, from the factory to the farm and the hospital laboratory."},
 {p:1,title:'Industrial products',chips:'prod',draw:scM2,text:"Industrial microbiology began with alcohol and vinegar and grew in the twentieth century with citric acid, wartime penicillin and amino acids. Pick a product to see the organism, the scale and how the process is run. Most modern production strains are heavily engineered."},
 {p:1,title:'Bioreactors and scale-up',draw:scM3,text:"A stirred-tank bioreactor controls temperature, pH, oxygen and feeding while keeping out contaminants. What works in a shake flask often fails at production scale, because oxygen transfer, mixing and heat removal do not scale with volume. Fed-batch operation is the industrial workhorse."},
 {p:2,title:'Bioremediation',draw:scM4,text:"Microbes can destroy many pollutants or lock them away. Chlorinated solvents are dechlorinated step by step under anaerobic conditions, and for most of its history only Dehalococcoides was known to finish the job. Engineers either stimulate the native community or add the organisms that are missing."},
 {p:2,title:'Plants and microbes',draw:scM5,text:"Legumes and rhizobia exchange signals before building a nodule in which bacteria fix nitrogen. Most plants also rely on mycorrhizal fungi, and many soil bacteria promote growth or protect against disease. Agrobacterium, a pathogen that engineers plant genomes, became the main tool for doing so on purpose."},
 {p:3,title:'Food: fermentation and pathogens',chips:'path',draw:scM6,text:"Controlled fermentation preserves food and gives it flavour, while spoilage and pathogens are the same growth uncontrolled. Pick a pathogen to see where it comes from, the illness it causes and how it is controlled. Listeria is unusual in growing at refrigeration temperatures."},
 {p:3,title:'Killing microbes in food',draw:scM7,text:"Heat kills microbes exponentially, so food processing is planned in decimal reductions. The 12D cook for low-acid canned foods is designed around Clostridium botulinum spores. Hurdle technology combines milder barriers, and HACCP organises the whole process around points where hazards can be controlled."},
 {p:4,title:'Clinical diagnostics',draw:scM8,text:"Culture remains the backbone of clinical microbiology because it yields a live isolate for susceptibility testing. MALDI-TOF mass spectrometry made identification almost instant once colonies grow, molecular panels give answers within an hour, and metagenomic sequencing can look for anything at once."},
 {p:4,title:'Synthetic biology',draw:scM9,text:"Synthetic biology treats genes as parts to be assembled into circuits with predictable behaviour. Two circuits published in 2000, a toggle switch and an oscillator, launched the field. It now designs chassis organisms, sensors and production strains, though biology remains noisier than the engineering analogy suggests."}];
const CHIPS={prod:{list:PROD.map(p=>p.k),get:()=>prSel,set:k=>prSel=k},path:{list:PATH.map(p=>p.k),get:()=>paSel,set:k=>paSel=k}};
