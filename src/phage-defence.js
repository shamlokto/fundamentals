/*META
{"title":"Phages and Defences","eyebrow":"Genetics and genome biology · an animated primer","h1":"Bacteriophages, and how bacteria fight them","parts":["Phage lives","Defences","Phage as medicine"],"foot":"Numbers such as burst sizes and phage abundances are order-of-magnitude figures. CRISPR–Cas has its own primer; viruses in general are covered in the virology primer.","description":"Phage life cycles and the lysis–lysogeny decision, restriction–modification, abortive infection and the anti-phage arsenal, coevolution and phage therapy."}
META*/
const DEF=[
 {k:'Restriction–modification',rows:[['How','a methyltransferase marks the host’s own sites; a restriction enzyme cuts unmethylated foreign DNA at the same sequence'],['Found in','about 75–90% of genomes'],['Phage escape','losing sites, modifying their own bases (T4 glucosylated hydroxymethylcytosine), inhibitors such as Ocr, or methylation by chance before cutting'],['Legacy','the source of restriction enzymes for cloning']]},
 {k:'CRISPR–Cas',rows:[['How','acquired spacers guide nucleases to matching DNA or RNA: an adaptive, heritable memory'],['Found in','about 40% of bacteria and most archaea'],['Phage escape','point mutations in the protospacer or PAM; anti-CRISPR proteins'],['More','see the CRISPR–Cas9 primer']]},
 {k:'Abortive infection',rows:[['How','the infected cell kills itself or halts growth before the phage can finish, protecting neighbours'],['Examples','Rex in λ lysogens; toxin–antitoxin systems such as ToxIN; retrons; CBASS; Lit and PrrC that cleave host translation factors or tRNA'],['Logic','altruism: the cell dies, the clone survives'],['Phage escape','mutations in the phage protein that triggers the system']]},
 {k:'Signalling systems',rows:[['How','sensing infection produces a nucleotide signal that activates an effector, often a membrane-damaging or NAD⁺-depleting protein'],['Examples','CBASS (cyclic oligonucleotides, ancestral to human cGAS–STING); Thoeris (NAD⁺-derived signals, related to TIR domains); Pycsar'],['Evolution','several components of animal innate immunity have bacterial origins'],['Phage escape','sponges and enzymes that destroy the signal']]},
 {k:'The wider arsenal',rows:[['How','dozens of further systems discovered by screening defence islands since 2015: BREX, DISARM, Gabija, Zorya, Druantia, Wadjet, DSR, gasdermins and more'],['Where','clustered in defence islands, often on mobile elements, so they move between strains'],['Typical genome','carries about five systems on average'],['Prevention','some block phage DNA entry or adsorption altogether: receptor masking by capsules and superinfection exclusion by prophages']]}];
let defSel=0;
function phage(cx,cy,k=1){return `<polygon points="${cx-12*k},${cy-34*k} ${cx+12*k},${cy-34*k} ${cx+20*k},${cy-20*k} ${cx+12*k},${cy-6*k} ${cx-12*k},${cy-6*k} ${cx-20*k},${cy-20*k}" fill="#C9A9D6" stroke="${INK}" stroke-width="1.2"/><rect x="${cx-3*k}" y="${cy-6*k}" width="${6*k}" height="${22*k}" fill="#B9A0C8" stroke="${INK}" stroke-width=".8"/>`+[-1,1].map(d=>`<path d="M${cx} ${cy+16*k} l ${d*14*k} ${10*k}" stroke="${INK}" stroke-width="1.2"/>`).join('');}
function scP1(n){return introPlate(n,{q:'What are bacteriophages, and how do bacteria defend themselves against them?',
  belief:'Phages are the most abundant biological entities, with an estimated 10³¹ particles on Earth. They kill a large share of ocean bacteria every day, move genes between strains, and have driven bacteria to evolve dozens of immune systems, some ancestral to our own.',
  items:['Lytic and temperate life cycles','The λ decision','Restriction–modification and beyond','Coevolution','Phage therapy'],
  art:(cx,cy)=>phage(cx-40,cy-10,1.3)+phage(cx+40,cy+20,1)+T(cx,cy+76,'tailed phages (Caudoviricetes)','note mid f11'),artH:170});}
function scP2(n){
  const N=n?{ad:{x:180,y:40,w:200,t:'adsorption'},inj:{x:180,y:110,w:200,t:'DNA injection'},ch:{x:180,y:180,w:200,t:'decision',f:'#E0C88A'},ly:{x:90,y:270,w:150,t:'lytic: replicate,|assemble, lyse',f:'#E7A99B'},lg:{x:270,y:270,w:150,t:'lysogenic:|integrate as prophage',f:'#A9C4DC'},bu:{x:90,y:370,w:150,t:'50–200 progeny'},ind:{x:270,y:370,w:150,t:'induction by SOS'}}
   :{ad:{x:80,y:60,w:120,t:'adsorption'},inj:{x:230,y:60,w:120,t:'DNA injection'},ch:{x:390,y:60,w:110,t:'decision',f:'#E0C88A'},ly:{x:300,y:180,w:170,t:'lytic: replicate,|assemble, lyse',f:'#E7A99B'},lg:{x:520,y:180,w:170,t:'lysogenic: integrate|as a prophage',f:'#A9C4DC'},bu:{x:300,y:290,w:170,t:'50–200 progeny|per cell'},ind:{x:520,y:290,w:170,t:'induced by DNA damage'}};
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
function scP4(n){const d=DEF[defSel];return explorer(n,{h:d.k,rows:d.rows});}
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
 {p:1,title:'Viruses of bacteria',draw:scP1,text:"Bacteriophages outnumber bacteria in most environments. They shape microbial populations, carry genes between strains, and gave molecular biology many of its foundational experiments. The pressure they exert has driven bacteria to evolve a remarkable variety of defences."},
 {p:1,title:'Lytic and lysogenic',draw:scP2,text:"After injecting its genome, a phage either takes over the cell to make progeny and lyse it, or, if it is temperate, integrates as a prophage and replicates with the host. DNA damage can later induce the prophage to excise and lyse its host."},
 {p:1,title:'The λ decision',draw:scP3,text:"Phage λ chooses between lysis and lysogeny using competing repressors, CI and Cro, and the unstable activator CII. More phages per cell and poorer host conditions favour lysogeny. Some phages even signal to one another with peptides to make the choice."},
 {p:2,title:'The defence arsenal',chips:'def',draw:scP4,text:"Bacteria defend against phages with many distinct systems, often clustered in defence islands. Pick one to see how it works, how common it is and how phages escape it. Several animal immune proteins turn out to have bacterial ancestors among these systems."},
 {p:2,title:'Coevolution',draw:scP5,text:"Bacteria and phages are locked in a continual arms race. Resistance and counter-resistance cycle, the costs of resistance shape which side gains, and phages that prey on whichever strain is commonest help keep microbial communities diverse."},
 {p:3,title:'Phage therapy',draw:scP6,text:"Phages were used to treat infections before antibiotics, and the rise of resistance has revived interest. Successes in individual patients are encouraging, but narrow host range, resistance and regulation still limit routine use."}];
const CHIPS={def:{list:DEF.map(d=>d.k),get:()=>defSel,set:k=>defSel=k}};
