/*META
{"title":"Bacteriophages","eyebrow":"Genetics and genome biology · an animated primer","h1":"Viruses of bacteria, and what they taught us","parts":["Phage lives","Phages at work"],"foot":"Numbers such as burst sizes and phage abundances are order-of-magnitude figures. Bacterial defences against phages have their own primer, as do CRISPR–Cas and viruses in general.","description":"Phage life cycles, the λ lysis–lysogeny decision, phages as tools of molecular biology, coevolution with their hosts, and phage therapy."}
META*/
const TOOL=[
 {k:'T2: DNA is the gene',rows:[['When','1952'],['Who','Alfred Hershey and Martha Chase'],['What','phage labelled with ³²P in its DNA or ³⁵S in its protein; after infection and a kitchen blender, the ³²P went into the cells and the ³⁵S stayed outside'],['Showed','the genetic material of the phage is DNA, not protein']]},
 {k:'T4 rII: inside the gene',rows:[['When','1955–1961'],['Who','Seymour Benzer; then Francis Crick, Sydney Brenner and colleagues'],['What','rII mutants fail to grow on λ lysogens, so even very rare recombinants can be selected and mapped'],['Showed','a gene is a linear string divisible almost to single bases; frameshift combinations revealed that the code is read in triplets']]},
 {k:'λ: switches and recombineering',rows:[['What','the CI–Cro switch became the model genetic switch; λ vectors and in vitro packaging built early gene libraries'],['Today','λ Red recombination (Datsenko and Wanner, 2000) swaps genes in E. coli using short homology arms on a PCR product'],['Also','integrase-based tools and the site-specific recombination that inserts λ at attB']]},
 {k:'P1: moving genes and Cre',rows:[['What','a generalised transducer: it packages random pieces of host DNA, so markers can be moved between E. coli strains'],['Cre–loxP','P1’s own recombinase and target site, now used to delete or switch genes in mice, plants and cells'],['Also','a plasmid-like prophage that keeps a single copy per cell']]},
 {k:'T7: an expression engine',rows:[['What','T7 RNA polymerase is a single, fast, very specific subunit that reads only T7 promoters'],['Use','pET vectors (Studier and colleagues, 1980s): the host makes T7 polymerase on induction, which then transcribes the cloned gene to very high levels'],['Also','T7 polymerase is used for in vitro transcription of RNA, including mRNA vaccines']]},
 {k:'M13: single strands and display',rows:[['What','a filamentous phage that leaves cells without lysing them and packages single-stranded DNA'],['Use','single-stranded templates for Sanger sequencing and mutagenesis; phage display (George Smith, 1985)'],['Legacy','display of antibodies (Greg Winter) led to drugs such as adalimumab; Smith and Winter shared half of the 2018 Nobel Prize in Chemistry']]}];
let toolSel=0;
function phage(cx,cy,k=1){return `<polygon points="${cx-12*k},${cy-34*k} ${cx+12*k},${cy-34*k} ${cx+20*k},${cy-20*k} ${cx+12*k},${cy-6*k} ${cx-12*k},${cy-6*k} ${cx-20*k},${cy-20*k}" fill="#C9A9D6" stroke="${INK}" stroke-width="1.2"/><rect x="${cx-3*k}" y="${cy-6*k}" width="${6*k}" height="${22*k}" fill="#B9A0C8" stroke="${INK}" stroke-width=".8"/>`+[-1,1].map(d=>`<path d="M${cx} ${cy+16*k} l ${d*14*k} ${10*k}" stroke="${INK}" stroke-width="1.2"/>`).join('');}
function scP1(n){return introPlate(n,{q:'What are bacteriophages, and why do they matter?',
  belief:'Phages are the most abundant biological entities, with an estimated 10³¹ particles on Earth. They kill a large share of ocean bacteria every day, move genes between strains, and supplied many of the founding experiments and tools of molecular biology.',
  items:['Lytic and temperate life cycles','The λ decision','Phages as tools','Coevolution with their hosts','Phage therapy'],
  art:(cx,cy)=>phage(cx-40,cy-10,1.3)+phage(cx+40,cy+20,1)+T(cx,cy+76,'tailed phages (Caudoviricetes)','note mid f11'),artH:170});}
function scP2(n){
  const N=n?{ad:{x:180,y:40,w:200,t:'adsorption'},inj:{x:180,y:110,w:200,t:'DNA injection'},ch:{x:180,y:180,w:200,t:'decision',f:'#E0C88A'},ly:{x:90,y:270,w:150,t:'lytic:|replicate,|assemble, lyse',f:'#E7A99B'},lg:{x:270,y:270,w:150,t:'lysogenic:|integrate as|prophage',f:'#A9C4DC'},bu:{x:90,y:370,w:150,t:'50–200 progeny'},ind:{x:270,y:370,w:150,t:'induction by SOS'}}
   :{ad:{x:76,y:60,w:124,t:'adsorption'},inj:{x:250,y:60,w:140,t:'DNA injection'},ch:{x:420,y:60,w:110,t:'decision',f:'#E0C88A'},ly:{x:300,y:180,w:170,t:'lytic: replicate,|assemble, lyse',f:'#E7A99B'},lg:{x:520,y:180,w:184,t:'lysogenic: integrate|as a prophage',f:'#A9C4DC'},bu:{x:300,y:290,w:170,t:'50–200 progeny|per cell'},ind:{x:520,y:290,w:170,t:'induced by|DNA damage'}};
  const E=n?[['ad','inj',''],['inj','ch',''],['ch','ly',''],['ch','lg',''],['ly','bu',''],['lg','ind',''],['ind','ly','',{dash:'4 3'}]]
    :[['ad','inj','receptor'],['inj','ch',''],['ch','ly',''],['ch','lg',''],['ly','bu',''],['lg','ind',''],['ind','ly','SOS: excise, lyse',{dash:'4 3',side:1}]];
  let s=G('a-fade',0,flow(N,E));
  const by=n?430:350;
  const b=bullets(n?24:30,by,[['Virulent phages','Always lytic, such as T4 and T7; the ones used for phage therapy.'],['Temperate phages','Such as λ, can also integrate and be inherited as prophages, often carrying genes that change the host (lysogenic conversion).'],['Lysis','Holins time the end; endolysins cut the wall; spanins breach the outer membrane in Gram-negatives.']],n?44:88,{d0:1,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scP3(n){
  const items=[['Two repressors in competition','The CI repressor keeps λ dormant; CII switches on the promoter that first makes CI; Cro represses cI and favours lysis. Whichever wins at the operators sets the cell’s fate.'],['Counting infections','When several phages infect one cell, CII accumulates and lysogeny is favoured: a crowded host population is a poor place to make more phage.'],['Reading the cell','Starved cells have less of the protease FtsH that degrades CII, so poor conditions also favour lysogeny.'],['Arbitrium','Some Bacillus phages (SPβ) secrete a small peptide; when enough is around, new infections choose lysogeny: phages communicating to decide.']];
  const c=cards(n,items,{y:20,num:1});
  const p=para(n?16:24,c.y+10,'Mark Ptashne’s work on λ made the lysis–lysogeny switch the textbook example of a genetic switch, and the CI protein one of the first repressors understood in molecular detail.',n?50:92,'note start f13',17,1.2);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:c.s+p.s};
}
function scP4(n){const d=TOOL[toolSel];return explorer(n,{h:d.k,rows:d.rows});}
function scP5(n){
  const items=[['Arms races','Bacteria lose or alter receptors, gain defence systems or spacers; phages switch receptors, mutate targets and carry anti-defence genes.'],['Fluctuating selection','In many settings no side wins for long; genotypes cycle as each adapts to the other’s current state.'],['Costs shape outcomes','Losing a receptor that is also a transporter or virulence factor costs the bacterium, which phage therapy can exploit.'],['Kill the winner','Phages that multiply on the most abundant host keep any one strain from dominating, which helps maintain diversity in oceans and guts.']];
  const c=cards(n,items,{y:20,num:1});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scP6(n){
  const rows=[['1917','Félix d’Hérelle names bacteriophages and soon treats dysentery with them'],['1930s–','phage therapy used in the Soviet Union and Georgia (Eliava Institute); eclipsed elsewhere by antibiotics'],['2016','Tom Patterson, near death from multidrug-resistant Acinetobacter, recovers after intravenous phage cocktails'],['2019','engineered phages used for a disseminated Mycobacterium abscessus infection in a teenager with cystic fibrosis'],['today','compassionate use and clinical trials; personalised phage banks']];
  const t=wtable(n,['When','What'],rows,n?[[16,8],[80,34]]:[[30,10],[140,64]],{y0:30});
  const b=bullets(n?24:30,t.y+20,[['Strengths','Very specific, self-amplifying at the site of infection, active against antibiotic-resistant strains, and can select for less virulent or resensitised bacteria.'],['Problems','Narrow host range, rapid resistance, immune clearance, manufacturing and regulation of living, evolving products.']],n?44:88,{d0:.8,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:t.s+b.s};
}
const S=[
 {p:1,title:'Viruses of bacteria',draw:scP1,text:"Bacteriophages outnumber bacteria in most environments. They shape microbial populations, carry genes between strains, and gave molecular biology many of its foundational experiments. How bacteria fight back is the subject of the Bacterial Defence Systems primer."},
 {p:1,title:'Lytic and lysogenic',draw:scP2,text:"After injecting its genome, a phage either takes over the cell to make progeny and lyse it, or, if it is temperate, integrates as a prophage and replicates with the host. DNA damage can later induce the prophage to excise and lyse its host."},
 {p:1,title:'The λ decision',draw:scP3,text:"Phage λ chooses between lysis and lysogeny using competing repressors, CI and Cro, and the unstable activator CII. More phages per cell and poorer host conditions favour lysogeny. Some phages even signal to one another with peptides to make the choice."},
 {p:2,title:'Phages as tools',chips:'tool',draw:scP4,text:"Phages were the simplest genetic systems available, and many landmarks of molecular biology came from them. Pick a phage to see what it showed or what it is still used for, from proving that genes are DNA to making proteins and antibodies."},
 {p:2,title:'Coevolution',draw:scP5,text:"Bacteria and phages are locked in a continual arms race. Resistance and counter-resistance cycle, the costs of resistance shape which side gains, and phages that prey on whichever strain is commonest help keep microbial communities diverse."},
 {p:2,title:'Phage therapy',draw:scP6,text:"Phages were used to treat infections before antibiotics, and the rise of resistance has revived interest. Successes in individual patients are encouraging, but narrow host range, resistance and regulation still limit routine use."}];
const CHIPS={tool:{list:TOOL.map(d=>d.k),get:()=>toolSel,set:k=>toolSel=k}};
