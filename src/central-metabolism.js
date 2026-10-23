/*META
{"title":"Central Carbon Metabolism","eyebrow":"Metabolism and bioenergetics · an animated primer","h1":"Sugar to precursors, energy and reducing power","parts":["Breaking sugar down","The TCA cycle","Regulation"],"foot":"Yields are per glucose and idealised; real cells divert intermediates to biosynthesis. Enzyme names are those of E. coli unless stated.","description":"Glycolysis, the Entner–Doudoroff and pentose phosphate pathways, the TCA cycle and its variants, gluconeogenesis and anaplerosis, overflow metabolism and catabolite repression."}
META*/
const PATHS=[
 {k:'EMP (glycolysis)',atp:2,nadh:2,nadph:0,rows:[['Steps','glucose → 2 pyruvate through fructose-1,6-bisphosphate'],['Net yield','2 ATP, 2 NADH per glucose'],['Key enzymes','phosphofructokinase (committed, regulated), pyruvate kinase'],['Who uses it','E. coli, Bacillus, yeast, most animals']]},
 {k:'Entner–Doudoroff',atp:1,nadh:1,nadph:1,rows:[['Steps','glucose-6-P → 6-phosphogluconate → KDPG, split by KDPG aldolase'],['Net yield','1 ATP, 1 NADH, 1 NADPH per glucose'],['Why','fewer enzymes and less protein needed for the same flux; favoured by many aerobes'],['Who uses it','Pseudomonas, Zymomonas, many marine bacteria; E. coli for gluconate']]},
 {k:'Pentose phosphate',atp:0,nadh:0,nadph:2,rows:[['Oxidative','glucose-6-P → ribulose-5-P + CO₂, making 2 NADPH'],['Non-oxidative','transketolase and transaldolase interconvert sugars of 3–7 carbons'],['Purpose','NADPH for biosynthesis and defence; ribose-5-P for nucleotides; erythrose-4-P for aromatic amino acids'],['Flexible','can return carbon to glycolysis or run in reverse']]}];
let pathSel=0;
function scC1(n){return introPlate(n,{q:'How does a cell turn sugar into everything else?',
  belief:'A dozen precursor metabolites, four energy and redox currencies, and a handful of pathways connect almost all of metabolism. Central carbon metabolism supplies all of them. Knowing its map lets you reason about growth, fermentation, antibiotic tolerance and engineering.',
  items:['Three ways to break down glucose','The twelve precursor metabolites','The TCA cycle and its variants','Gluconeogenesis and anaplerosis','Overflow metabolism','Catabolite repression'],
  art:(cx,cy)=>{const N={g:{x:cx,y:cy-70,w:90,t:'glucose'},p:{x:cx,y:cy,w:90,t:'pyruvate'},t:{x:cx,y:cy+70,w:90,t:'TCA',f:PAL.gold}};return flow(N,[['g','p',''],['p','t','']]);},artH:190});}
function scC2(n){
  const p=PATHS[pathSel];
  let s='';const items=[['ATP',p.atp,PAL.gold],['NADH',p.nadh,PAL.blue],['NADPH',p.nadph,PAL.green]];
  const h=hbars(n,n?20:40,40,n?320:300,items,{max:2,lw:70,bh:18});
  s+=G('a-fade',0,T(n?20:40,26,'net per glucose','note start f12')+h.s);
  const ex=explorer(n,{h:p.k,rows:p.rows},{y:h.y+30});
  return {vb:ex.vb,s:s+ex.s};
}
function scC3(n){
  const rows=[['glucose-6-P','glycolysis','polysaccharides, wall'],['fructose-6-P','glycolysis','amino sugars, peptidoglycan'],['ribose-5-P','pentose phosphate','nucleotides, histidine'],['erythrose-4-P','pentose phosphate','aromatic amino acids'],['triose-P','glycolysis','lipids (glycerol)'],['3-phosphoglycerate','glycolysis','serine, glycine, cysteine'],['phosphoenolpyruvate','glycolysis','aromatics; sugar uptake (PTS)'],['pyruvate','glycolysis','alanine, valine, leucine'],['acetyl-CoA','pyruvate dehydrogenase','fatty acids'],['2-oxoglutarate','TCA','glutamate family; nitrogen assimilation'],['succinyl-CoA','TCA','haem, lysine, methionine'],['oxaloacetate','TCA','aspartate family, pyrimidines']];
  const t=wtable(n,['Precursor','From','Builds'],rows,n?[[10,16],[118,14],[220,18]]:[[24,22],[220,22],[400,34]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+12,'Twelve precursor metabolites, drawn from glycolysis, the pentose phosphate pathway and the TCA cycle, are the starting points for every building block of the cell (Neidhardt’s scheme). Linking amino acids into protein costs about 4 ATP each; making them needs much NADPH.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function scC4(n){
  const cx=n?180:204, cy=n?200:214, R=n?118:142;
  const items=n?[{t:'citrate|6C',w:62,fs:10},{t:'isocitrate|6C',w:74,fs:10},{t:'2-oxo-|glutarate 5C',w:80,fs:10,f:PAL.gold},{t:'succinyl-|CoA 4C',w:66,fs:10,f:PAL.gold},{t:'succinate|4C',w:70,fs:10},{t:'fumarate|4C',w:64,fs:10},{t:'malate|4C',w:54,fs:10},{t:'oxalo-|acetate 4C',w:72,fs:10,f:PAL.gold}]
    :[{t:'citrate (6C)',w:110},{t:'isocitrate (6C)',w:126},{t:'2-oxoglutarate (5C)',w:150,f:PAL.gold},{t:'succinyl-CoA (4C)',w:140,f:PAL.gold},{t:'succinate (4C)',w:118},{t:'fumarate (4C)',w:112},{t:'malate (4C)',w:96},{t:'oxaloacetate (4C)',w:140,f:PAL.gold}];
  const labs=n?['','NADH|CO₂','NADH|CO₂','ATP or|GTP','QH₂|(via FAD)','','NADH','+ acetyl-|CoA (2C)']:['','NADH, CO₂','NADH, CO₂','ATP (GTP in some)','QH₂ (via FAD, complex II)','','NADH','+ acetyl-CoA (2C)'];
  let s=G('a-fade',0,cycle(cx,cy,R,items,{labs,lr:n?22:26}));
  const b=n?bullets(24,cy+R+64,[['Per acetyl-CoA','3 NADH, 1 reduced quinone (QH₂, via the FAD of succinate dehydrogenase), 1 ATP or GTP, 2 CO₂.'],['Also a hub','2-oxoglutarate, succinyl-CoA and oxaloacetate leave for biosynthesis and must be replaced.'],['Variants','Anaerobic E. coli runs it as a branched pathway; many bacteria have a glyoxylate shunt.']],44,{d0:1,gap:20})
    :bullets(452,52,[['Per acetyl-CoA','3 NADH, 1 reduced quinone from succinate dehydrogenase (complex II), 1 GTP or ATP, and 2 CO₂.'],['Also a hub','2-oxoglutarate, succinyl-CoA and oxaloacetate leave the cycle for biosynthesis, so it must be refilled.'],['Variants','Without oxygen, E. coli runs a branched pathway: an oxidative arm to 2-oxoglutarate and a reductive arm to succinate. Many organisms lack 2-oxoglutarate dehydrogenase.'],['Run backwards','The reductive TCA cycle fixes CO₂ in Chlorobium and Aquifex.']],23,{d0:1,gap:20});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,cy+R+40)),s:s+b.s};
}
function scC5(n){
  const items=[['Anaplerosis','Reactions that refill the cycle: PEP carboxylase and pyruvate carboxylase make oxaloacetate from PEP or pyruvate and CO₂.'],['Glyoxylate shunt','Isocitrate lyase and malate synthase bypass the two decarboxylations, so cells growing on acetate or fatty acids keep carbon instead of losing it as CO₂. Needed by Mycobacterium tuberculosis in the host.'],['Gluconeogenesis','To grow on acetate, succinate or amino acids, cells run glycolysis backwards, bypassing the irreversible steps with PEP carboxykinase, PEP synthetase and fructose-1,6-bisphosphatase.'],['Control at the branch','Isocitrate dehydrogenase is inactivated by phosphorylation (AceK) on acetate, diverting isocitrate into the shunt.']];
  const c=cards(n,items,{y:20,num:1});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scC6(n){
  const A=n?axes(54,40,280,160,{xr:[0,1],yr:[0,1],xt:[[0,'slow'],[1,'fast']],yt:[[0,'none'],[1,'high']],xlab:'growth rate on glucose',ylab:'acetate excreted'})
    :axes(70,40,300,180,{xr:[0,1],yr:[0,1],xt:[[0,'slow'],[1,'fast']],yt:[[0,'none'],[1,'high']],xlab:'growth rate on glucose',ylab:'acetate excreted'});
  let s=A.s+G('a-fade',.3,curve(A,x=>x<.55?0:(x-.55)/.45*.9,{col:'#A4473A',n:200})+ln(FX(A.px(.55)),A.y,FX(A.px(.55)),A.y+A.h,'#6A5B47',1,'4 3')+T(FX(A.px(.55)-4),A.y+12,'threshold','note end f11 halo'));
  const b=n?bullets(24,A.y+A.h+60,[['Overflow','Fast-growing E. coli excretes acetate even with plenty of oxygen; yeast makes ethanol (the Crabtree effect); cancer cells lactate (the Warburg effect).'],['Why waste carbon?','Fermentation makes ATP with less protein per unit flux than respiration, so when the proteome is the limit it is the cheaper route.']],44,{d0:1,gap:20})
    :bullets(410,52,[['Overflow','Fast-growing E. coli excretes acetate even with plenty of oxygen; yeast makes ethanol (the Crabtree effect); tumour cells make lactate (the Warburg effect).'],['Why waste carbon?','Per unit of enzyme, fermentation makes ATP faster than respiration. When protein, not carbon, limits growth, cells switch part of the flux to the cheaper route (Basan, Hwa and colleagues, 2015).'],['In practice','Acetate inhibits growth and recombinant protein yield, so fed-batch cultures limit the sugar supply.']],28,{d0:1,gap:20});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,A.y+A.h+50)),s:s+b.s};
}
function scC7(n){
  const items=[['Diauxie','Jacques Monod (1941) saw E. coli on glucose plus lactose grow in two phases with a lag between: glucose first, then lactose after enzymes are induced.'],['cAMP and CRP','When glucose is imported by the PTS, EIIA^Glc is mostly unphosphorylated and adenylate cyclase is weakly active. Without glucose, phospho-EIIA activates it, cAMP rises, and CRP–cAMP switches on catabolic operons.'],['Inducer exclusion','Unphosphorylated EIIA^Glc binds and blocks the lactose permease and other transporters: often the stronger effect.'],['Gram-positives differ','Bacillus and streptococci use CcpA with HPr-Ser-P, binding cre sites, for the same purpose.']];
  const c=cards(n,items,{y:20,num:1});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
const S=[
 {p:1,title:'The central map',draw:scC1,text:"Central carbon metabolism takes in a sugar and produces three things: ATP, reducing power as NADH and NADPH, and the precursor metabolites from which the whole cell is built. A few pathways, glycolysis, the pentose phosphate pathway and the TCA cycle, do almost all of it."},
 {p:1,title:'Three ways to break down glucose',chips:'path',draw:scC2,text:"Bacteria break down glucose by the Embden–Meyerhof–Parnas pathway, the Entner–Doudoroff pathway or the oxidative pentose phosphate pathway, often more than one at once. They differ in yield of ATP and NADPH and in how much enzyme they need. Pick one to compare."},
 {p:1,title:'The precursor metabolites',draw:scC3,text:"Twelve intermediates of central metabolism are the starting points for all biosynthesis. Amino acids, nucleotides, lipids and wall components branch from them. This is why a cell that is growing must continually draw carbon out of glycolysis and the TCA cycle."},
 {p:2,title:'The TCA cycle',draw:scC4,text:"The TCA cycle oxidises acetyl-CoA completely to CO₂, capturing electrons as NADH and reduced quinone for the respiratory chain. It is also a source of biosynthetic precursors, and bacteria run many variants: branched without oxygen, incomplete in some species, and backwards for CO₂ fixation in others."},
 {p:2,title:'Refilling and reversing',draw:scC5,text:"Because intermediates are drawn off for biosynthesis, the cycle must be refilled by anaplerotic reactions. On two-carbon substrates the glyoxylate shunt saves carbon, and on non-sugar carbon sources gluconeogenesis builds sugars by bypassing the irreversible steps of glycolysis."},
 {p:3,title:'Overflow metabolism',draw:scC6,text:"When E. coli grows fast on glucose it excretes acetate even in oxygen, apparently wasting carbon. The likely reason is that fermentation produces ATP with less enzyme per unit of flux, so when growth is limited by the cell's protein budget, overflow is the better use of resources."},
 {p:3,title:'Catabolite repression',draw:scC7,text:"Given a mixture of sugars, bacteria use the best first. In E. coli the glucose transport system controls both cAMP signalling and the activity of other transporters; in Gram-positives the regulator CcpA plays the equivalent role. Monod's diauxic growth curves were the first sign of it."}];
const CHIPS={path:{list:PATHS.map(p=>p.k),get:()=>pathSel,set:k=>pathSel=k}};
