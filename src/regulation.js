/*META
{"title":"Bacterial Gene Regulation","eyebrow":"Central dogma and its regulation · an animated primer","h1":"How a bacterium decides which genes to use","parts":["Circuits","Signals","Programs","Memory and chance"],"foot":"Circuits are simplified; most real regulons involve several overlapping inputs. Sigma factors, attenuation and riboswitches are covered in the transcription primer, and the stringent response in the translation primer.","description":"Operons and regulons, the lac operon, two-component systems, small RNAs, quorum sensing, sporulation, DNA methylation, phase variation, bistability and persistence."}
META*/
const LAC=[
 {k:'glucose, no lactose',r:'repressor bound',c:'cAMP low; CAP off',lvl:.01,t:'LacI sits on the operator and, with no inducer, blocks transcription. Expression is almost nil.'},
 {k:'no glucose, no lactose',r:'repressor bound',c:'cAMP high; CAP on',lvl:.03,t:'CAP is ready to help, but the repressor still blocks the promoter. A few transcripts leak, which matters: they make the permease that lets the first lactose in.'},
 {k:'glucose + lactose',r:'repressor released',c:'cAMP low; CAP off',lvl:.1,t:'Allolactose pulls the repressor off, but without CAP the weak lac promoter fires only modestly. Glucose is used first.'},
 {k:'lactose only',r:'repressor released',c:'cAMP high; CAP on',lvl:1,t:'Repressor off and CAP–cAMP recruiting RNA polymerase: full induction, about a thousand-fold over the repressed level.'}];
let lacSel=3;
function operonDraw(cx,y,w,on,capOn){
  const x1=cx-w/2;let s=dsDNA(x1,x1+w,y,DNA,8);
  const seg=(a,b,f,t)=>box(x1+w*a,y-14,w*(b-a),36,f,3)+Tc(x1+w*(a+b)/2,y+8,t,'#3A2E22',11,'mono mid','600');
  s+=seg(.0,.1,'#E0C88A','CAP')+seg(.1,.2,'#EFE6D2','P')+seg(.2,.28,'#C9A9D6','O')+seg(.3,.6,'#A9C4DC','lacZ')+seg(.6,.8,'#A9C4DC','lacY')+seg(.8,.95,'#A9C4DC','lacA');
  if(!on)s+=blob(x1+w*.24,y-26,20,12,'#7D4A98')+T(x1+w*.24,y-44,'LacI','mono mid f11');
  if(capOn)s+=blob(x1+w*.05,y-26,18,11,'#C99A2E')+T(x1+w*.05,y-44,'CAP','mono mid f11');
  return s;}
function scR1(n){return introPlate(n,{q:'How does a cell with a few thousand genes decide which to use, and when?',
  belief:'A bacterium cannot afford to make every protein all the time. It reads its environment through repressors and activators, sensor kinases, small RNAs and secreted signals, and some decisions become developmental programs or heritable states that outlast the signal.',
  items:['Operons, regulons and stimulons','The lac operon, again','Two-component systems','Small RNAs','Quorum sensing','Sporulation','Methylation, phase variation, bistability, persisters'],
  art:(cx,cy)=>operonDraw(cx,cy,210,true,true)+T(cx,cy+46,'the lac operon, induced','note mid f11'),artH:150});}
function scR2(n){
  const rows=[['Operon','genes under one promoter, one transcript','lacZYA'],['Regulon','operons scattered around the genome controlled by one regulator','the LexA (SOS) regulon, ~40 genes'],['Modulon','several regulons under one global regulator','CRP–cAMP: hundreds of genes'],['Stimulon','everything that changes in response to one stimulus, whatever the mechanism','the heat-shock stimulon'],['Global regulators','proteins with hundreds of targets, often nucleoid-associated','CRP, FNR, ArcA, Lrp, H-NS, Fis, IHF']];
  const t=wtable(n,['Unit','What it is','Example'],rows,n?[[10,10],[90,20],[240,14]]:[[24,16],[150,44],[440,26]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+12,'Regulators act at every step: σ factor choice, repressors and activators at the promoter, attenuation and riboswitches during elongation, small RNAs at translation, and proteases afterwards.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function scR3(n){
  const c=LAC[lacSel], on=c.r==='repressor released', cap=c.c.includes('on');
  let s=G('a-fade',0,operonDraw(n?180:250,64,n?320:440,on,cap));
  const bx=n?16:24, by=118;
  s+=G('a-fade',.3,T(bx,by,c.k,'cname start f16')+T(bx,by+22,c.r,'lab start f13')+T(bx,by+40,c.c,'lab start f13'));
  const bw=n?320:420, lv=Math.max(4,bw*Math.log10(c.lvl*1000)/3);
  s+=G('a-fade',.5,T(bx,by+70,'β-galactosidase (log scale)','note start f11')+`<rect x="${bx}" y="${by+78}" width="${bw}" height="16" fill="none" stroke="${INK}" stroke-dasharray="3 3"/>`+box(bx,by+78,FX(lv),16,'#A9C4DC',2));
  const p=para(bx,by+124,c.t,n?50:90,'lab start f13',17,.7);
  const q=para(bx,p.y+10,'Jacob and Monod’s operon model (1961) came from this system. Catabolite repression by glucose works mainly through cAMP–CAP and through inducer exclusion: the glucose transporter’s EIIA blocks the lactose permease.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(q.y+6):wide(q.y+8),s:s+p.s+q.s};
}
function scR4(n){
  const N=n?{sig:{x:70,y:40,w:110,t:'signal'},hk:{x:250,y:40,w:150,t:'sensor kinase|(HK)',f:'#A9C4DC'},hp:{x:250,y:140,w:110,t:'HK~P (His)',f:'#A9C4DC'},rr:{x:250,y:240,w:150,t:'response|regulator~P (Asp)',f:'#E7A99B'},dna:{x:180,y:340,w:200,t:'DNA: genes on or off'}}
   :{sig:{x:70,y:60,w:100,t:'signal'},hk:{x:230,y:60,w:150,t:'sensor kinase (HK)',f:'#A9C4DC'},hp:{x:420,y:60,w:120,t:'HK~P (His)',f:'#A9C4DC'},rr:{x:420,y:170,w:180,t:'response regulator~P|(Asp)',f:'#E7A99B'},dna:{x:180,y:170,w:180,t:'genes on or off'}};
  const E=n?[['sig','hk','',{}],['hk','hp','ATP → ADP',{side:-1}],['hp','rr','phosphotransfer',{side:-1}],['rr','dna','binds DNA',{side:-1}]]
    :[['sig','hk','binds'],['hk','hp','autophosphorylation|ATP → ADP'],['hp','rr','phosphotransfer',{side:-1}],['rr','dna','binds promoters',{side:-1}]];
  let s=G('a-fade',0,flow(N,E));
  const rows=[['EnvZ–OmpR','osmolarity','porin balance OmpF / OmpC'],['PhoR–PhoB','phosphate starvation','phosphate scavenging'],['ArcB–ArcA','respiratory state','aerobic vs anaerobic metabolism'],['PhoQ–PhoP','Mg²⁺, antimicrobial peptides','Salmonella virulence, LPS changes'],['ComD–ComE','CSP peptide','pneumococcal competence'],['VanS–VanR','vancomycin','vanHAX resistance']];
  const t=wtable(n,['System','Senses','Controls'],rows,n?[[10,12],[110,14],[220,16]]:[[24,16],[200,26],[400,32]],{y0:n?390:240,d0:.8,R:n?354:620});
  return {vb:n?slim(t.y+6):wide(t.y+8),s:s+t.s};
}
function scR5(n){
  const items=[['Trans-acting sRNAs','50–300 nucleotides, base-pair imperfectly with target mRNAs near the ribosome binding site, blocking translation or marking the duplex for RNase E. In Gram-negatives the chaperone Hfq helps them pair.'],['Many targets, fast','One sRNA regulates many mRNAs. RyhB, made during iron starvation, shuts off iron-using proteins so iron goes where it is needed.'],['Porins and stress','MicF, MicA and MicC repress porin mRNAs when the envelope is stressed; RprA and DsrA activate the σS mRNA by opening an inhibitory structure.'],['Antisense and CRISPR','Cis-encoded antisense RNAs control plasmid copy number and toxin–antitoxin systems; crRNAs guide CRISPR nucleases.']];
  const c=cards(n,items,{y:20,num:1});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scR6(n){
  const A=n?axes(54,40,280,150,{xr:[0,10],yr:[0,1],xt:[[0,'few'],[10,'many']],yt:[[0,'off'],[1,'on']],xlab:'cell density',ylab:'target genes'})
    :axes(70,40,300,170,{xr:[0,10],yr:[0,1],xt:[[0,'few'],[10,'many']],yt:[[0,'off'],[1,'on']],xlab:'cell density',ylab:'target genes'});
  let s=A.s+G('a-fade',.3,curve(A,x=>1/(1+Math.exp(-(x-6)*2)),{col:'#2F5276'})+ln(FX(A.px(6)),A.y,FX(A.px(6)),A.y+A.h,'#A4473A',1,'4 3')+T(FX(A.px(6)-4),A.y+12,'threshold','note end f11 halo'));
  const rows=[['Vibrio fischeri','LuxI/LuxR, acyl-homoserine lactone','light in the squid light organ'],['Pseudomonas aeruginosa','LasI/R, RhlI/R, PQS','elastase, pyocyanin, biofilm'],['Staphylococcus aureus','AgrD peptide, AgrC/A two-component','toxins, decreased adhesion'],['Streptococcus pneumoniae','CSP peptide, ComD/E','competence for transformation'],['Vibrio cholerae','CAI-1 and AI-2, via a phosphorelay','biofilm off, toxin off at high density']];
  const t=wtable(n,['Organism','Signal','Output'],rows,n?[[10,12],[110,16],[240,14]]:[[24,18],[200,30],[430,26]],{y0:A.y+A.h+56,d0:.6,R:n?354:620});
  if(!n)s+=G('a-fade',.5,bullets(410,52,[['Talk by diffusion','Each cell secretes a small signal; only when many cells are present does it reach the threshold.'],['Gram-negatives use AHLs','Gram-positives use peptides, sensed by two-component systems.']],28,{gap:22}).s);
  return {vb:n?slim(t.y+6):wide(t.y+8),s:s+t.s};
}
function scR7(n){
  const N=n?{v:{x:180,y:40,w:220,t:'vegetative cell'},s0:{x:180,y:120,w:220,t:'Spo0A~P (phosphorelay)',f:'#E7A99B'},a:{x:180,y:200,w:240,t:'asymmetric septum',f:'#E0C88A'},
     f:{x:90,y:290,w:140,t:'forespore|σF → σG',f:'#A9C4DC'},m:{x:270,y:290,w:140,t:'mother cell|σE → σK',f:'#C9A9D6'},sp:{x:180,y:380,w:200,t:'mature spore released'}}
   :{v:{x:70,y:70,w:110,t:'vegetative|cell'},s0:{x:260,y:70,w:140,t:'Spo0A~P|phosphorelay',f:'#E7A99B'},a:{x:470,y:70,w:140,t:'asymmetric|septum',f:'#E0C88A'},
     f:{x:360,y:190,w:140,t:'forespore|σF → σG',f:'#A9C4DC'},m:{x:580,y:190,w:110,t:'mother cell|σE → σK',f:'#C9A9D6'},sp:{x:470,y:310,w:200,t:'mature spore released'}};
  const E=n?[['v','s0','starvation, density',{side:-1}],['s0','a','',{}],['a','f','',{}],['a','m','',{}],['f','m','signals',{both:1,side:1}],['m','sp','engulfment, coat',{side:1}]]
    :[['v','s0','starvation,|density',{side:-1}],['s0','a',''],['a','f',''],['a','m',''],['f','m','signals',{both:1,side:-1}],['m','sp','engulfment,|cortex, coat',{side:-1}],['f','sp','',{}]];
  let s=G('a-fade',0,flow(N,E));
  const by=n?430:350;
  const b=bullets(n?24:30,by,[['A cascade of σ factors','σF in the forespore, then σE in the mother cell, then σG and σK. Each stage checks the last through signals across the septum: criss-cross regulation.'],['A last resort','Sporulation takes about 8 hours and is irreversible after the septum forms; cells first try other options, even cannibalising siblings.'],['Remarkably durable','Spores survive heat, desiccation and radiation for years, protected by dipicolinic acid, small acid-soluble proteins and a thick coat.']],n?44:88,{d0:1.2,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scR8(n){
  const items=[['Dam methylation','Dam methylates GATC in E. coli. Hemimethylated DNA after replication marks the new strand for mismatch repair and delays re-initiation at oriC (SeqA).'],['CcrM and the cell cycle','In Caulobacter, CcrM methylation switches between states as the chromosome replicates, timing gene expression to the cycle.'],['Phase variation by methylation','The pap pili of uropathogenic E. coli switch ON or OFF depending on which GATC sites Dam and the Lrp protein protect; the state is inherited for generations.'],['Phase variation by DNA','Salmonella flips a promoter by site-specific inversion to swap flagellins (Hin); slipped-strand mispairing in repeats switches Neisseria and Haemophilus surface genes.'],['Phasevarions','Phase-variable methyltransferases change methylation genome-wide, switching whole sets of genes at once.'],['Why vary at random?','A population that keeps a few cells in each state survives sudden changes, such as an immune response that recognises one surface type.']];
  const c=cards(n,items,{y:20,cw:6.5});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scR9(n){
  const A=n?axes(54,40,280,140,{xr:[0,10],yr:[0,1],xt:[[1.5,'off'],[8.5,'on']],yt:[],xlab:'expression level',ylab:'cells'})
    :axes(70,40,300,160,{xr:[0,10],yr:[0,1],xt:[[1.5,'off'],[8.5,'on']],yt:[],xlab:'expression level',ylab:'cells'});
  const g=(x,m,sd,h)=>h*Math.exp(-((x-m)**2)/(2*sd*sd));
  let s=A.s+G('a-fade',.3,curve(A,x=>g(x,1.5,.8,.9)+g(x,8.5,.9,.35),{col:'#2F5276',n:200}));
  s+=G('a-fade',.6,T(FX(A.px(1.5)),FX(A.py(.92)-6),'most cells','note mid f11 halo')+T(FX(A.px(8.5)),FX(A.py(.37)-6),'a few cells','note mid f11 halo'));
  const b=n?bullets(24,A.y+A.h+60,[['Bistability','Positive feedback makes two stable states; noise decides which a cell takes.'],['Competence in B. subtilis','About 10% of cells turn on ComK and become competent.'],['Persisters','A small fraction, often slow-growing, survive antibiotics that kill the rest; regrown, they give an ordinary sensitive population. Tolerance, not resistance.'],['Bet-hedging','Keeping some cells in an unlikely state is insurance against change.']],44,{d0:1,gap:20})
    :bullets(410,52,[['Bistability','Positive feedback can make two stable states. Random noise in gene expression then decides which one a cell adopts.'],['Competence in B. subtilis','About one cell in ten switches on ComK and becomes competent; the rest do not.'],['Persisters','A small fraction of a population survives antibiotics that kill the rest, often because it is dormant. Regrown, they give an ordinary sensitive population: tolerance, not resistance.'],['Bet-hedging','Keeping a few cells in an unlikely state insures the population against sudden change.']],28,{d0:1,gap:20});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,A.y+A.h+50)),s:s+b.s};
}
const S=[
 {p:1,title:'Choosing genes',draw:scR1,text:"Gene regulation lets a bacterium make what it needs when it needs it. Signals from outside and inside the cell are read by regulatory proteins and RNAs that act on transcription, translation and protein stability. Some decisions are reversible within minutes; others commit the cell to a program or a heritable state."},
 {p:1,title:'Operons, regulons and global regulators',draw:scR2,text:"Bacterial genes are organised for regulation at several scales. An operon puts related genes under one promoter; a regulon gathers operons under one regulator; global regulators control hundreds of genes and tie metabolism to the state of the cell."},
 {p:1,title:'The lac operon',chips:'lac',draw:scR3,text:"The lac operon reads two inputs. The repressor LacI reports whether lactose is present; CAP bound to cAMP reports whether glucose is scarce. Pick a condition to see how the two combine. Only lactose without glucose gives full expression."},
 {p:2,title:'Two-component systems',draw:scR4,text:"A typical bacterium has dozens of two-component systems. A membrane sensor kinase detects a signal and phosphorylates itself on histidine, then passes the phosphate to an aspartate on its partner response regulator, which binds DNA. Many are essential for virulence and for antibiotic resistance."},
 {p:2,title:'Small RNAs',draw:scR5,text:"Bacteria also regulate with small RNAs that pair with messenger RNAs. They act quickly, can hit many targets at once, and often control translation or mRNA decay. In Gram-negative bacteria the chaperone Hfq helps them find their targets."},
 {p:2,title:'Quorum sensing',draw:scR6,text:"Many bacteria secrete small signal molecules and respond only when the signal accumulates past a threshold, which happens when cells are numerous. This quorum sensing coordinates behaviours that pay only in groups, such as light production, virulence, competence and biofilm formation."},
 {p:3,title:'Sporulation',draw:scR7,text:"Starved Bacillus subtilis can build a dormant spore. The master regulator Spo0A, activated by a phosphorelay, triggers an asymmetric division; the forespore and mother cell then run separate programs of sigma factors that check on each other across the septum until the mother cell lyses to release the spore."},
 {p:4,title:'Methylation and phase variation',draw:scR8,text:"DNA methylation in bacteria marks new strands, times the cell cycle and controls gene expression. Combined with DNA inversions and slipped-strand repeats, it lets bacteria switch surface structures on and off at random, a heritable variation that helps populations evade immunity."},
 {p:4,title:'Bistability and persistence',draw:scR9,text:"Genetically identical cells in the same environment can behave differently. Positive feedback loops create two stable states, and chance decides which each cell takes. Persisters, a small dormant fraction that survives antibiotic treatment, are the clinically important example."}];
const CHIPS={lac:{list:LAC.map(l=>l.k),get:()=>lacSel,set:k=>lacSel=k}};
