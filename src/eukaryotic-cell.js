/*META
{"title":"Organelles and Endosymbiosis","eyebrow":"Cell structure · an animated primer","h1":"The eukaryotic cell, and the bacteria inside it","parts":["Compartments","Trafficking","Endosymbiosis"],"foot":"Cells and organelles are schematic and not to scale; gene and protein counts are typical figures for well-studied species.","description":"Eukaryotic organelles, the secretory and endocytic pathways, and the bacterial origin of mitochondria and plastids."}
META*/
function euCell(cx,cy,k=1){
  let s=`<ellipse cx="${cx}" cy="${cy}" rx="${110*k}" ry="${78*k}" fill="#EEF0E2" stroke="${INK}" stroke-width="1.6" class="tint"/>`;
  s+=`<circle cx="${cx-28*k}" cy="${cy}" r="${28*k}" fill="#D9CDE6" stroke="${INK}" stroke-width="1.4"/><circle cx="${cx-28*k}" cy="${cy}" r="${10*k}" fill="#B9A0C8"/>`;
  for(let i=0;i<3;i++)s+=`<path d="M${cx-28*k+(32+i*7)*k} ${cy-26*k} q ${10*k} ${26*k} 0 ${52*k}" stroke="#7D4A98" stroke-width="${2*k}" fill="none"/>`;
  for(let i=0;i<4;i++)s+=`<path d="M${cx+30*k} ${cy-30*k+i*7*k} h ${34*k-i*4*k}" stroke="#C99A2E" stroke-width="${3*k}" stroke-linecap="round"/>`;
  s+=`<ellipse cx="${cx+55*k}" cy="${cy+32*k}" rx="${22*k}" ry="${11*k}" fill="#E7A99B" stroke="${INK}"/><path d="M${cx+38*k} ${cy+32*k} q 5 -8 10 0 q 5 8 10 0 q 5 -8 10 0 q 5 8 10 0" stroke="${INK}" fill="none" stroke-width=".8"/>`;
  s+=`<circle cx="${cx-70*k}" cy="${cy+40*k}" r="${8*k}" fill="#C6D3A8" stroke="${INK}"/><circle cx="${cx+20*k}" cy="${cy+50*k}" r="${7*k}" fill="#E0C88A" stroke="${INK}"/>`;
  return s;}
function scK1(n){return introPlate(n,{q:'How did cells with a nucleus and organelles come to be, and how do they move things between compartments?',
  belief:'Eukaryotic cells divide their work among membrane-bound compartments, so they need an address system and a vesicle traffic network. Two of their organelles, mitochondria and plastids, are the descendants of bacteria taken in more than a billion years ago.',
  items:['A tour of the organelles','The secretory pathway','Endocytosis and its hijackers','The evidence for endosymbiosis','Genes that moved, proteins that return','Plastids within plastids'],
  art:(cx,cy)=>euCell(cx,cy,1)+T(cx-28,cy+44,'nucleus','note mid f10')+T(cx+48,cy-38,'Golgi','note mid f10')+T(cx+70,cy+94,'mitochondrion','note mid f10')+ln(cx+62,cy+44,cx+68,cy+84,'#9A8E78',.8)+T(cx+4,cy-31,'ER','note mid f10'),artH:180});}
function scK2(n){
  const items=[['Nucleus','Holds the chromosomes behind a double membrane with pores; transcription and translation are separated, which allows splicing.'],['Endoplasmic reticulum','Rough ER takes in secreted and membrane proteins through Sec61, the homologue of bacterial SecY; smooth ER makes lipids.'],['Golgi apparatus','Stacked cisternae that modify glycans and sort cargo towards the plasma membrane, endosomes or lysosomes.'],['Endosomes and lysosomes','Sort what the cell takes in; lysosomes digest it at pH ~4.5–5.'],['Mitochondria','Respiration and much more: iron–sulfur clusters, haem, apoptosis signals. Descended from an alphaproteobacterium.'],['Plastids','Photosynthesis in plants and algae; descended from a cyanobacterium.'],['Peroxisomes','β-oxidation of long fatty acids and H₂O₂ detoxification; imported proteins, no genome.'],['Cytoskeleton','Actin, microtubules and motors move vesicles and organelles: the active transport small bacteria do without.']];
  const c=cards(n,items,{y:20,cw:6.5});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scK3(n){
  const N=n?{r:{x:80,y:40,w:120,t:'ribosome'},er:{x:80,y:120,w:120,t:'ER',f:'#D9CDE6'},cg:{x:80,y:210,w:120,t:'cis-Golgi',f:'#E0C88A'},tg:{x:270,y:210,w:120,t:'trans-Golgi',f:'#E0C88A'},
      pm:{x:180,y:300,w:140,t:'plasma|membrane'},en:{x:270,y:120,w:120,t:'endosome',f:'#E7A99B'},ly:{x:270,y:40,w:120,t:'lysosome',f:'#E7A99B'}}
    :{r:{x:50,y:60,w:88,t:'ribosome'},er:{x:208,y:60,w:70,t:'ER',f:'#D9CDE6'},cg:{x:356,y:60,w:100,t:'cis-Golgi',f:'#E0C88A'},tg:{x:526,y:60,w:110,t:'trans-Golgi',f:'#E0C88A'},
      pm:{x:526,y:220,w:120,t:'plasma|membrane'},en:{x:330,y:220,w:110,t:'endosome',f:'#E7A99B'},ly:{x:130,y:220,w:110,t:'lysosome',f:'#E7A99B'}};
  const E=n?[['r','er','SRP, Sec61',{side:1}],['er','cg','COPII',{side:-1}],['cg','er','COPI',{bend:-30,dash:'4 3',off:10}],['cg','tg','',{}],['tg','pm','secretion',{side:1}],['tg','en','M6P',{side:-1}],['en','ly','',{}]]
    :[['r','er','SRP, Sec61',{side:-1}],['er','cg','COPII',{side:-1,lx:-6}],['cg','er','COPI (retrieval)',{bend:-40,dash:'4 3',off:10}],['cg','tg','maturation',{side:-1}],['tg','pm','secretory vesicles',{side:-1}],['tg','en','mannose-6-P tag',{side:1}],['en','ly','',{}],['pm','en','endocytosis (clathrin)',{bend:-40,dash:'4 3',side:-1,off:12}]];
  let s=G('a-fade',0,flow(N,E));
  const by=n?360:290;
  const b=bullets(n?24:30,by,[['Vesicles carry cargo','Coats (COPII, COPI, clathrin) bend membranes into vesicles; Rab GTPases mark identity; SNARE pairs decide which membranes may fuse.'],['Sugars on the way','N-glycans added in the ER are trimmed and rebuilt in the Golgi, and act as quality-control tags.'],['Signals decide','A signal peptide sends a protein to the ER; KDEL brings it back; mannose-6-phosphate sends enzymes to lysosomes.']],n?44:88,{d0:1.2,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scK4(n){
  const items=[['Phagocytosis','Macrophages and amoebae engulf whole bacteria. The phagosome fuses with lysosomes, acidifies and fills with proteases and reactive oxygen.'],['Legionella','Its Dot/Icm type IV system injects over 300 effectors that disguise its vacuole as ER, avoiding lysosomes, in amoebae and in human macrophages.'],['Salmonella','Its SPI-2 type III system builds the Salmonella-containing vacuole and sends out tubules from it.'],['Mycobacterium tuberculosis','Stops phagosome maturation and acidification, and can damage the membrane to reach the cytosol.'],['Listeria and Shigella','Escape the vacuole into the cytosol and polymerise host actin to move and spread from cell to cell.'],['Chlamydia','Lives only inside its inclusion, intercepting host vesicles and lipids from the Golgi.']];
  const c=cards(n,items,{y:20,cw:6.5});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scK5(n){
  const rows=[['Two membranes','an inner membrane like a bacterium’s, an outer one with β-barrel porins inserted by Sam50, a BamA relative'],['Own genome','circular DNA without histones, in nucleoids'],['Own ribosomes','70S-like, sensitive to some bacterial antibiotics (chloramphenicol, aminoglycosides at high dose)'],['Division','plastids and some protist mitochondria divide with FtsZ, as bacteria do'],['Phylogeny','mitochondrial genes nest within Alphaproteobacteria; plastid genes within Cyanobacteria'],['Lipids','cardiolipin in the inner mitochondrial membrane, a bacterial hallmark']];
  const top=para(n?16:24,30,'Lynn Margulis (then Sagan) argued in 1967 that mitochondria and plastids began as free-living bacteria. Sequencing made the case decisive.',n?50:92,'lab start f13',17,0);
  const t=wtable(n,['Evidence','What is seen'],rows,n?[[16,14],[120,30]]:[[30,20],[200,60]],{y0:top.y+20,d0:.3});
  const p=para(n?16:24,t.y+12,'The closest living relatives of the mitochondrial ancestor are still debated within the Alphaproteobacteria; the plastid ancestor was related to living freshwater cyanobacteria such as Gloeomargarita.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:top.s+t.s+p.s};
}
function scK6(n){
  const items=[['Genomes shrank','Most of the symbiont’s genes were lost or moved to the nucleus. Human mitochondrial DNA is 16.6 kb with 13 protein genes; Reclinomonas, a protist, keeps about 100 genes.'],['Proteins come back','About 1,000 mitochondrial proteins are made in the cytoplasm and imported through TOM and TIM complexes, guided by an N-terminal presequence. Plastids use TOC and TIC.'],['Why keep any genes?','The retained genes mostly encode hydrophobic core subunits of the respiratory and photosynthetic chains, perhaps so their expression can be controlled locally.'],['Codes diverged','Mitochondria use variant genetic codes: in human mitochondria UGA means tryptophan and AGA/AGG are stops.']];
  const c=cards(n,items,{y:20,num:1});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scK7(n){
  let s='';const cx=n?180:180,y=80;
  const ring=(x,r,dash)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${INK}" stroke-width="1.3"${dash?' stroke-dasharray="3 3"':''}/>`;
  const nest=(x,photo,extra,lab)=>{let g=`<circle cx="${x}" cy="${y}" r="26" fill="${photo?'#7FA55A':'#C6D3A8'}"/>`;
    if(photo)g+=[-9,0,9].map(d=>`<path d="M${x-14} ${y+d} h28" stroke="#4E7A33" stroke-width="2.4" stroke-linecap="round"/>`).join('');
    g+=ring(x,27)+ring(x,31);for(let i=0;i<extra;i++)g+=ring(x,38+i*6,1);
    return g+lines(lab).map((l,i)=>T(x,y+70+i*14,l,'note mid f11')).join('');};
  const xs=n?[70,180,290]:[110,280,450];
  s+=G('a-fade',0,nest(xs[0],1,0,n?'primary:|2 membranes|plants, green|and red algae':'primary: 2 membranes|plants, green|and red algae'));
  s+=G('a-fade',.4,nest(xs[1],1,2,'secondary: 3 or 4|diatoms (4),|euglenids (3)'));
  s+=G('a-fade',.8,nest(xs[2],0,2,'apicoplast: 4|Plasmodium;|no photosynthesis'));
  if(!n)s+=G('a-fade',1,['solid: the original','cyanobacterial','envelope; dashed:','extra membranes','from a second','engulfment'].map((l,i)=>T(528,y-36+i*15,l,'note start f11')).join(''));
  const b=bullets(n?24:30,y+(n?146:130),[['Endosymbiosis happened again','Eukaryotic algae with plastids were themselves engulfed, giving plastids with three or four membranes in diatoms, brown algae and the apicomplexans.'],['A drug target in a parasite','The malaria parasite keeps a non-photosynthetic plastid, the apicoplast, which makes isoprenoids; doxycycline and fosmidomycin act on it.'],['Reduced mitochondria','Anaerobic eukaryotes such as Trichomonas have hydrogenosomes, and Giardia has mitosomes: mitochondria that lost respiration but kept iron–sulfur cluster assembly.']],n?44:88,{d0:1.2,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
const S=[
 {p:1,title:'A cell of compartments',draw:scK1,text:"Bacteria do most of their chemistry in one compartment. Eukaryotic cells divide theirs among membrane-bound organelles, each with its own proteins and conditions. That arrangement needs an addressing system and a traffic network, and two of the compartments turn out to be former bacteria."},
 {p:1,title:'A tour of the organelles',draw:scK2,text:"The nucleus separates transcription from translation; the endoplasmic reticulum and Golgi make, modify and sort proteins; endosomes and lysosomes handle what the cell takes in; mitochondria and plastids make energy; peroxisomes oxidise fatty acids; and the cytoskeleton moves it all."},
 {p:2,title:'The secretory pathway',draw:scK3,text:"A secreted protein enters the ER through Sec61 as it is made, then travels in COPII vesicles to the Golgi, where its sugars are processed and it is sorted. Escaped ER residents return in COPI vesicles. Lysosomal enzymes are tagged with mannose-6-phosphate and diverted to endosomes."},
 {p:2,title:'Endocytosis, and the bacteria that hijack it',draw:scK4,text:"Cells take material in by endocytosis, and immune cells swallow bacteria by phagocytosis, then destroy them in acidic lysosomes. Many intracellular pathogens survive by rewiring this traffic, using secretion-system effectors to disguise their vacuole or escape it."},
 {p:3,title:'The evidence for endosymbiosis',draw:scK5,text:"Mitochondria and plastids have two membranes, their own circular genomes, bacterial-type ribosomes, and divide like bacteria. Their genes place them within the Alphaproteobacteria and the Cyanobacteria. Lynn Margulis championed the idea in 1967, when it was still widely doubted."},
 {p:3,title:'Genes that moved, proteins that return',draw:scK6,text:"Over time most of the symbionts' genes were lost or transferred to the nucleus. Their products are now made in the cytoplasm and imported back through dedicated translocons. Only a small core of genes stays in the organelle, read with a genetic code that has drifted from the standard one."},
 {p:3,title:'Plastids within plastids',draw:scK7,text:"Endosymbiosis did not happen only once. Algae that already had plastids were themselves engulfed by other eukaryotes, which is why diatoms and the malaria parasite have plastids with extra membranes. In anaerobic protists, mitochondria have been reduced to hydrogenosomes and mitosomes."}];
const CHIPS={};
