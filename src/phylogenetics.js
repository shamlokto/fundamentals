/*META
{"title":"Phylogenetics and Taxonomy","eyebrow":"Evolution and systematics · an animated primer","h1":"Reading, building and naming the tree of life","parts":["Reading trees","Building trees","Naming microbes","Deep time"],"foot":"Thresholds for species are conventions, not laws, and dates for LUCA and eukaryogenesis carry wide uncertainties; figures are rounded. The history of 16S rRNA and the three domains is told in the Woese primer.","description":"Rooted and unrooted trees, alignments, substitution models, distance, parsimony, likelihood and Bayesian methods, bootstrap and posterior support, long-branch attraction, microbial species thresholds, GTDB and nomenclature codes, molecular clocks, LUCA and eukaryogenesis."}
META*/
/* rectangular tree: node {n:'leaf'} or {c:[..]}, branch length l, support s, colour col (inherited) */
function rtree(root,o){
  let i=0;const x0=o.x, y0=o.y, dy=o.dy, kx=o.kx; let s='',lab='';
  function rec(nd,px,col){const x=px+(nd.l||0)*kx, c=nd.col||col;
    if(!nd.c){const y=y0+i*dy;i++;nd._x=x;nd._y=y;}
    else{nd.c.forEach(ch=>rec(ch,x,c));const ys=nd.c.map(ch=>ch._y);nd._x=x;nd._y=(Math.min(...ys)+Math.max(...ys))/2;
      s+=ln(FX(x),FX(Math.min(...ys)),FX(x),FX(Math.max(...ys)),c,o.w||2);
      if(nd.s!=null)lab+=T(FX(x-4),FX(nd._y-5),nd.s,'mono end '+(o.sfs||'f10')+' halo');}
    s+=ln(FX(px),FX(nd._y),FX(x),FX(nd._y),c,o.w||2);
    if(!nd.c&&nd.n)lab+=T(FX(x+6),FX(nd._y+4),nd.n,(o.lc||'lab start ')+(o.fs||'f12'));
  }
  rec(root,x0-(root.l||0)*kx,o.col||'#5A4632');
  return s+lab;}
const tl=(n,l,o={})=>Object.assign({n,l},o), tn=(c,l,o={})=>Object.assign({c,l},o);
const TREEM=[
 {k:'Distance',h:'Distance methods',sub:'UPGMA, neighbour-joining, minimum evolution',rows:[['Input','a matrix of pairwise distances, corrected with a substitution model'],['Optimises','builds one tree by clustering; no search over alternatives'],['Typical use','quick first look; very large data sets; average nucleotide identity trees']],pros:['Very fast, even for thousands of sequences','Neighbour-joining copes with unequal rates'],cons:['Throws away site-by-site information','UPGMA assumes a constant clock and is badly misled when rates differ'],note:'Neighbour-joining (Saitou and Nei, 1987) repeatedly joins the pair of taxa that minimises total tree length, then treats the pair as one taxon.'},
 {k:'Parsimony',h:'Maximum parsimony',sub:'the tree needing the fewest changes',rows:[['Input','the aligned characters themselves'],['Optimises','minimum number of substitutions over the tree'],['Typical use','morphological characters, rare genomic changes such as indels']],pros:['No explicit model, easy to explain','Works directly on characters'],cons:['Statistically inconsistent in the Felsenstein zone: more data can make it more confidently wrong','Ignores multiple hits on long branches'],note:'Only parsimony-informative sites matter: those where at least two states each occur in at least two taxa.'},
 {k:'Maximum likelihood',h:'Maximum likelihood',sub:'Felsenstein, 1981; RAxML, IQ-TREE, PhyML',rows:[['Input','alignment plus an explicit substitution model'],['Optimises','the tree and branch lengths that make the observed data most probable'],['Typical use','the default for most gene and genome trees']],pros:['Uses all sites and a model of how they change','Can compare models statistically (AIC, BIC)'],cons:['Heuristic tree search can miss the best tree','Still misled if the model is badly wrong'],note:'The likelihood of a tree is computed site by site with Felsenstein’s pruning algorithm, summing over all possible ancestral states.'},
 {k:'Bayesian',h:'Bayesian inference',sub:'MrBayes, BEAST, PhyloBayes',rows:[['Input','alignment, a model, and prior distributions'],['Optimises','samples trees in proportion to their posterior probability by Markov chain Monte Carlo'],['Typical use','dated trees with molecular clocks; complex mixture models']],pros:['Gives a distribution of trees, not one tree','Natural way to add fossils, clocks and uncertainty'],cons:['Slow; chains must be checked for convergence','Priors can matter and posteriors can look overconfident'],note:'A clade’s posterior probability is simply the fraction of sampled trees, after burn-in, that contain it.'}];
let mSel=0;
function scP1(n){return introPlate(n,{q:'How do we work out who is related to whom when all we have is today’s DNA?',
  belief:'Phylogenetics turns aligned sequences into trees of descent using explicit models of change. For microbes, which leave almost no fossils and swap genes, trees from genomes are the main evidence for evolution and the basis of how species are now delimited and named.',
  items:['Reading trees','Alignments and models','Distance, parsimony, likelihood, Bayes','Support and long-branch attraction','Microbial species thresholds','GTDB and the naming codes','Clocks, LUCA and eukaryogenesis'],
  art:(cx,cy)=>rtree(tn([tn([tn([tl('A',1.2),tl('B',1.6)],1.4),tl('C',2.6)],1),tn([tl('D',1.8),tl('E',1.1)],2.2)],.8),{x:cx-90,y:cy-48,dy:24,kx:36,w:2.2,fs:'f12'}),artH:140});}
function scP2(n){
  const tr=tn([tn([tn([tn([tl('Escherichia coli',.8),tl('Salmonella enterica',.9)],1.2,{col:RED}),tl('Vibrio cholerae',2)],.9),tl('Pseudomonas aeruginosa',3)],1.4),tl('Bacillus subtilis',4.2)],.6);
  const x=n?30:40, y=n?44:50, kx=n?30:36, dy=n?30:32;
  let s=G('a-fade',0,rtree(tr,{x,y,dy,kx,lc:'note start ',fs:'f12'}));
  const e=tr.c[0].c[0].c[0];
  s+=G('a-fade',.4,`<rect x="${FX(e._x-6)}" y="${FX(e.c[0]._y-14)}" width="${n?160:178}" height="${FX(e.c[1]._y-e.c[0]._y+26)}" rx="6" fill="none" stroke="${RED}" stroke-dasharray="4 3"/>`);
  s+=G('a-fade',.6,`<circle cx="${FX(tr._x)}" cy="${FX(tr._y)}" r="4" fill="${INK}"/>`+T(FX(tr._x+6),FX(tr._y+16),'root','note start f11 halo')
    +`<circle cx="${FX(e._x)}" cy="${FX(e._y)}" r="4" fill="${RED}"/>`+T(FX(e._x-12),FX(y-8),n?'last common ancestor':'node: last common ancestor','note end f11 halo')+ln(FX(e._x-9),FX(y-5),FX(e._x-3),FX(e._y-4),'#6A5B47',.8)
    +ln(x,y+5*dy,x+kx,y+5*dy,INK,1.6)+T(x+kx/2,y+5*dy+14,'0.1 substitutions per site','note start f10'));
  // unrooted quartet
  const ux=n?180:480, uy=n?y+5*dy+90:120;
  const U=[[-60,-40,'A'],[-60,40,'B'],[60,-40,'C'],[60,40,'D']];
  let u=ln(ux-24,uy,ux+24,uy,'#5A4632',2);
  U.forEach(([dx,dy2,t])=>{const sx=ux+(dx<0?-24:24);u+=ln(sx,uy,ux+dx,uy+dy2,'#5A4632',2)+T(ux+dx+(dx<0?-6:6),uy+dy2+4,t,'lab '+(dx<0?'end':'start')+' f13');});
  s+=G('a-fade',.8,u+T(ux,uy+66,'unrooted: relationships only,','note mid f11')+T(ux,uy+80,'no direction of time','note mid f11'));
  const b=bullets(n?24:30,uy+(n?112:150),[['Read the nodes, not the tips','Rotating branches around a node changes nothing. E. coli is no closer to Vibrio than Salmonella is, whatever the order on the page.'],['Clades','A clade is an ancestor and all its descendants (monophyletic). A group that leaves some descendants out is paraphyletic, like “prokaryotes”, which leaves out the eukaryotes descended from the same ancestor.'],['Rooting','A root needs extra information, usually an outgroup known to lie outside the group, or a molecular clock.']],n?44:88,{d0:1,gap:18});
  return {vb:n?slim(b.y-6):wide(b.y-6),s:s+b.s};
}
function scP3(n){
  const seq=['ATGGCTAAGCTT-ACGTTGAACG','ATGGCCAAGCTT-ACGTTGAGCG','ATGGCTAAACTCGACGTCGAACG','ATGGCGAAACTCGACGTCGAGCG'];
  const names=['taxon 1','taxon 2','taxon 3','taxon 4'], cw=n?11:13, x0=n?78:110, y0=36;
  let a='';seq.forEach((q,r)=>{a+=T(x0-10,y0+r*18,names[r],'note end f11');[...q].forEach((ch,j)=>{a+=Tc(FX(x0+j*cw+cw/2),y0+r*18,ch,NB[ch]||'#9A9384',n?11:12,'mono mid','600');});});
  const vc=[5,8,11,12,17,20];
  let hl=vc.map(j=>`<rect x="${FX(x0+j*cw)}" y="${y0-13}" width="${cw}" height="${4*18}" fill="${PAL.gold}" opacity=".45"/>`).join('');
  let s=G('a-fade',0,hl+a)+G('a-fade',.3,T(x0,y0+4*18+6,'shaded: variable sites; – : a gap (insertion or deletion)','note start f11'));
  const py=y0+4*18+40;
  const A=n?axes(54,py,140,120,{xr:[0,2],yr:[0,1],xt:[[0,'0'],[1,'1'],[2,'2']],yt:[[0,'0'],[.75,'.75']],xlab:'true distance',ylab:'observed p'})
    :axes(70,py,200,150,{xr:[0,2],yr:[0,1],xt:[[0,'0'],[1,'1'],[2,'2']],yt:[[0,'0'],[.75,'.75']],xlab:'true distance',ylab:'observed p'});
  s+=A.s+G('a-fade',.5,curve(A,d=>d,{col:'#9A9384',dash:'4 3',to:1})+curve(A,d=>.75*(1-Math.exp(-4*d/3)),{col:'#2F5276'})+ln(A.x,FX(A.py(.75)),A.x+A.w,FX(A.py(.75)),RED,1,'3 3')+T(FX(A.px(1.95)),FX(A.py(.75)-6),'saturation','note end f11 halo'));
  const items=[['JC69','Jukes and Cantor (1969): every substitution equally likely, equal base frequencies. Corrects p for multiple hits.'],['K80','Kimura (1980): transitions (A↔G, C↔T) and transversions at different rates.'],['GTR','Six exchange rates and four base frequencies: the most general reversible model.'],['+Γ','Rates vary across sites, drawn from a gamma distribution with shape α; small α means a few fast sites and many slow ones.']];
  const b=n?bullets(24,A.y+A.h+58,items,44,{d0:.8,gap:16}):bullets(330,py+4,items,40,{d0:.8,gap:16});
  return {vb:n?slim(b.y-6):wide(Math.max(b.y-6,A.y+A.h+48)),s:s+b.s};
}
function scP4(n){
  const m=TREEM[mSel];
  return explorer(n,{h:m.h,sub:m.sub,rows:m.rows,pros:m.pros,cons:m.cons,note:m.note},{y:32});
}
function scP5(n){
  const tr=tn([tn([tn([tn([tl('A',1),tl('B',1.1)],1.4,{s:'100 / 1.00'}),tl('C',2.2)],.6,{s:'54 / 0.97'}),tn([tl('D',1.5),tl('E',1.3)],1.2,{s:'88 / 1.00'})],.9,{s:'72 / 0.99'}),tl('outgroup',3.6)],.5);
  const x=n?40:60;
  let s=G('a-fade',0,rtree(tr,{x,y:44,dy:30,kx:n?40:50,sfs:'f11',fs:'f13'}));
  s+=G('a-fade',.5,T(n?16:24,226,'node labels: bootstrap % / posterior probability','note start f12'));
  const items=[['Bootstrap (Felsenstein, 1985)','Resample alignment columns with replacement, rebuild the tree many times, and count how often each clade reappears. Values above about 70% are usually taken as fair support.'],['Posterior probability','From a Bayesian run: the probability the clade is true given the data, model and priors. It is usually higher than the bootstrap for the same node; 0.95 is a common bar.'],['Neither is a guarantee','Both measure how consistently the data point one way. A wrong model or long-branch attraction can give high support to a wrong clade.']];
  const b=n?bullets(24,260,items,44,{d0:.8,gap:18}):bullets(360,52,items,36,{d0:.8,gap:18});
  return {vb:n?slim(b.y-6):wide(Math.max(b.y-6,240)),s:s+b.s};
}
function quartet(cx,cy,pairs,lens,title){
  // pairs: [[a,b],[c,d]] joined on left/right; lens: map name->length
  let s=ln(cx-20,cy,cx+20,cy,'#5A4632',2);
  const dirs=[[-1,-1],[-1,1],[1,-1],[1,1]];
  [pairs[0][0],pairs[0][1],pairs[1][0],pairs[1][1]].forEach((t,i)=>{const [sx,sy]=dirs[i], L2=lens[t], ex=cx+sx*20+sx*L2*.8, ey=cy+sy*L2*.6, lng=L2>40;
    s+=ln(cx+sx*20,cy,FX(ex),FX(ey),lng?RED:'#5A4632',lng?2.6:2)+T(FX(ex+sx*6),FX(ey+(sy>0?12:-2)),t,'lab '+(sx<0?'end':'start')+' f13');});
  return s+T(cx,cy+86,title,'cname mid f14');}
function scP6(n){
  const LL=n?52:90, SS=n?16:22, lens={A:LL,B:SS,C:LL,D:SS};
  const c1=n?82:170, c2=n?278:470, cy=n?90:100;
  let s=G('a-fade',0,quartet(c1,cy,[['A','B'],['C','D']],lens,'true tree'));
  s+=G('a-fade',.6,arw(n?165:280,cy,n?195:360,cy,{w:1.6})+quartet(c2,cy,[['A','C'],['B','D']],{A:LL,C:LL,B:SS,D:SS},'inferred tree'));
  const b=bullets(n?24:30,cy+130,[['Long branches attract','A and C have evolved fast. By chance they share many identical states at saturated sites, and parsimony or a poor model reads those coincidences as shared ancestry (Felsenstein, 1978).'],['Real cases','Fast-evolving microsporidia once appeared at the base of eukaryotes; with better models they sit within the fungi. Endosymbionts with small, AT-rich genomes cluster together for the same reason.'],['Remedies','Add taxa that break up long branches, use site-heterogeneous models, remove the fastest sites, or recode amino acids into groups.']],n?44:88,{d0:1,gap:18});
  return {vb:n?slim(b.y-6):wide(b.y-6),s:s+b.s};
}
function scP7(n){
  const A=n?axes(50,40,280,130,{xr:[76,100],yr:[0,1],xt:[[80,'80'],[85,'85'],[90,'90'],[95,'95'],[100,'100%']],yt:[],xlab:'ANI between genome pairs',ylab:'pairs'})
    :axes(70,40,300,150,{xr:[76,100],yr:[0,1],xt:[[80,'80'],[85,'85'],[90,'90'],[95,'95'],[100,'100%']],yt:[],xlab:'ANI between genome pairs',ylab:'pairs'});
  const g=(x,m,sd,h)=>h*Math.exp(-((x-m)**2)/(2*sd*sd));
  let s=A.s+G('a-fade',.3,curve(A,x=>g(x,79,2.2,.55)+g(x,98.6,1,.9)+.02,{col:'#2F5276',n:200}))+G('a-fade',.5,`<rect x="${FX(A.px(95))}" y="${A.y}" width="${FX(A.px(96)-A.px(95))}" height="${A.h}" fill="${RED}" opacity=".25"/>`+T(FX(A.px(90)),FX(A.y+14),'few pairs','note mid f11 halo')+T(FX(A.px(95.5)),A.y-6,'95–96%','mono mid f11'));
  const rows=[['ANI','≥ 95–96%','average nucleotide identity of shared genome; the working standard'],['dDDH','≥ 70%','digital DNA–DNA hybridisation, calculated to match the old wet-lab test'],['16S rRNA','≥ 98.7%','below this, almost always different species; above it, not proof of the same one'],['Wet-lab DDH','≥ 70%','the historical gold standard (1987), now replaced']];
  const t=wtable(n,['Method',n?'Same if':'Same species if','Notes'],rows,n?[[10,10],[86,10],[170,28]]:[[24,14],[150,14],[290,48]],{y0:A.y+A.h+58,d0:.6,R:n?354:620});
  if(!n)s+=G('a-fade',.7,bullets(410,52,[['A real gap','Pairs of genomes rarely share 83–95% ANI, so 95% falls in a natural valley.'],['Not one concept','Recombination, ecology and shared gene pools all bear on what a microbial species is.']],28,{gap:20}).s);
  return {vb:n?slim(t.y+6):wide(t.y+8),s:s+t.s};
}
function scP8(n){
  const items=[['GTDB','The Genome Taxonomy Database (Parks and colleagues, 2018) builds ranks from a tree of conserved proteins in hundreds of thousands of genomes, normalised by relative evolutionary divergence. It split groups such as Clostridium.'],['The Prokaryotic Code (ICNP)','Governs names of cultured prokaryotes. A name is valid once published in, or validated by, the International Journal of Systematic and Evolutionary Microbiology; priority runs from the Approved Lists of 1980.'],['Type strains','Each new species needs a living type strain deposited in two public culture collections in different countries.'],['Candidatus','A provisional status for well-characterised organisms that are not in culture, such as Candidatus Carsonella. Not covered by the Code’s rules of priority.'],['SeqCode (2022)','A parallel code in which a high-quality genome sequence serves as the type, so uncultured organisms known from metagenomes can receive valid names.'],['New phylum names','Since 2021 phyla fall under the Code with the ending -ota: Proteobacteria became Pseudomonadota and Firmicutes Bacillota.']];
  const c=cards(n,items,{y:20,cw:6.5});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scP9(n){
  const x0=n?20:40, x1=n?340:600, ty=64, gx=v=>x0+(4.6-v)/4.6*(x1-x0);
  let s=G('a-fade',0,ln(x0,ty,x1,ty,'#6A5B47',1.6)+[4,3,2,1,0].map(v=>ln(FX(gx(v)),ty,FX(gx(v)),ty+5,'#6A5B47',1)+T(FX(gx(v)),ty+18,v+(v===0?' Ga':''),'mono '+(v===0?'end':'mid')+' f10')).join('')+T(x0,ty-44,'billions of years ago','note start f12'));
  const ev=n?[[4.5,'Earth',0],[4.2,'LUCA?',1],[3.5,'first fossils',0],[2.4,'oxygen rises',1],[1.8,'eukaryotes',0],[.6,'animals',1]]:[[4.5,'Earth forms',0],[4.2,'LUCA (estimates ~4.2)',1],[3.5,'stromatolites',0],[2.4,'Great Oxidation Event',1],[1.8,'eukaryotes (LECA ~1.8–1.2)',0],[.6,'animals',1]];
  s+=G('a-fade',.3,ev.map(([v,t,k])=>`<circle cx="${FX(gx(v))}" cy="${ty}" r="4.5" fill="${RED}"/>`+ln(FX(gx(v)),ty+(k?24:-6),FX(gx(v)),ty+(k?40:-14),'#6A5B47',.8)+T(FX(gx(v)),ty+(k?52:-18),t,'note '+(v>4.4?'start':v<1?'end':'mid')+' f11')).join(''));
  const yT=ty+100;
  const t3=tn([tl('Bacteria',2.6),tn([tl('Archaea',1.6),tl('Eukarya',1.6)],1)],.4);
  const t2=tn([tl('Bacteria',2.6),tn([tl('other archaea',1.8),tn([tl('Asgard archaea',.8),tl('Eukarya',.8)],1)],.8)],.4);
  const k=n?28:38;
  s+=G('a-fade',.6,T(n?20:40,yT,'three domains (Woese, 1990)','cname start f14')+rtree(t3,{x:n?28:50,y:yT+24,dy:26,kx:k,fs:'f12'}));
  const x2=n?28:340, y2=n?yT+130:yT;
  s+=G('a-fade',.9,T(n?20:330,y2,'two domains','cname start f14')+rtree(t2,{x:x2+(n?0:10),y:y2+24,dy:26,kx:k,fs:'f12'}));
  const by=n?y2+150:yT+130;
  const b=bullets(n?24:30,by,[['Molecular clocks','Branch lengths become time when calibrated with fossils or geological events; relaxed clocks let rates vary between lineages.'],['LUCA','The last universal common ancestor was already a complex cell with a genetic code, ribosomes and ATP synthase, probably anaerobic and possibly H₂-using.'],['Eukaryogenesis','Asgard archaea, found in 2015 and first cultured in 2020 (Prometheoarchaeum), carry eukaryote-like genes; eukaryotes seem to arise from an Asgard host that took in an alphaproteobacterium, the future mitochondrion.']],n?44:88,{d0:1.2,gap:18});
  return {vb:n?slim(b.y-6):wide(b.y-6),s:s+b.s};
}
const S=[
 {p:1,title:'Trees of descent',draw:scP1,text:"A phylogeny is a hypothesis about ancestry. Every branching point is an ancestor whose descendants went separate ways, and the tree is inferred from differences among sequences sampled today. For microbes, molecular trees are almost the only record of history we have."},
 {p:1,title:'How to read a tree',draw:scP2,text:"Trees are read by their branching points, not by the order of names at the tips. Branch lengths in a phylogram show amounts of change. A root, placed with an outgroup, gives the tree a direction in time; without one, the tree only shows which groups are closest."},
 {p:2,title:'Alignments and substitution models',draw:scP3,text:"Trees start from an alignment in which each column is assumed to share a common ancestral position. Counting differences underestimates change, because sites can mutate more than once. Substitution models correct for these hidden changes, from the one-parameter Jukes–Cantor model to GTR with gamma-distributed rates."},
 {p:2,title:'Four ways to build a tree',chips:'meth',draw:scP4,text:"Distance methods cluster a matrix of corrected distances; parsimony seeks the tree with fewest changes; maximum likelihood finds the tree that makes the data most probable under a model; Bayesian inference samples trees in proportion to their posterior probability. Pick one to compare them."},
 {p:2,title:'How sure are we?',draw:scP5,text:"A single best tree says nothing about confidence. The bootstrap asks how often a clade reappears when the data are resampled; Bayesian posterior probabilities report how much of the posterior falls on trees with that clade. They measure different things and should not be compared one-to-one."},
 {p:2,title:'Long-branch attraction',draw:scP6,text:"When two unrelated lineages both evolve quickly, they accumulate chance similarities that simple methods mistake for kinship, pulling the long branches together. Felsenstein showed in 1978 that parsimony can converge on this wrong answer as data accumulate. Better models and denser sampling are the cures."},
 {p:3,title:'What is a microbial species?',draw:scP7,text:"Microbes have no single agreed species concept, so in practice species are delimited by genome similarity. Average nucleotide identity of about 95–96 percent, matching 70 percent DNA–DNA hybridisation, is the usual boundary. Identity of 16S rRNA genes is too conserved to separate close species."},
 {p:3,title:'Taxonomy and the naming codes',draw:scP8,text:"Classification and naming are separate. GTDB proposes a genome-based classification that reorganises many groups, while the Prokaryotic Code and the newer SeqCode govern which names are valid. The 16S rRNA revolution that preceded all this is told in the Woese primer."},
 {p:4,title:'Clocks, LUCA and eukaryogenesis',draw:scP9,text:"Calibrated molecular clocks place the last universal common ancestor early in Earth's history, perhaps about 4 billion years ago, and the last eukaryotic common ancestor between roughly 1.2 and 1.8 billion. Genomes of Asgard archaea support a two-domain tree, in which eukaryotes arose from within the archaea."}];
const CHIPS={meth:{list:TREEM.map(m=>m.k),get:()=>mSel,set:k=>mSel=k}};
