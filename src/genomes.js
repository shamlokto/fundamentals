/*META
{"title":"Bacterial Genomes","eyebrow":"Genetics and genome biology · an animated primer","h1":"How a bacterial genome is laid out","parts":["Organisation","Composition","Pangenomes"],"foot":"Genome sizes and percentages are typical values; the skew plot is schematic. Sequencing and assembly are covered in the sequencing and bioinformatics primers.","description":"Genome size and gene density, chromosome organisation, GC skew and strand bias, GC content and codon usage, mobile element load, and pangenomes."}
META*/
function scO1(n){return introPlate(n,{q:'What does a bacterial genome look like, and what can its layout tell you?',
  belief:'Bacterial genomes are compact, gene-dense and organised around replication. Their composition records mutation pressures, selection on translation and the history of gene transfer, and comparing many genomes of one species reveals a shared core and a vast accessory pool.',
  items:['Size and gene density','Organisation around the origin','GC skew and strand bias','GC content and codon usage','Mobile elements and genome decay','Core and accessory genes'],
  art:(cx,cy)=>{let s=`<circle cx="${cx}" cy="${cy}" r="70" fill="none" stroke="${DNAC}" stroke-width="10" opacity=".25"/>`;for(let i=0;i<60;i++){const a=i/60*2*Math.PI, r=i%2?78:62, c=i%3?'#A9C4DC':'#E7A99B';s+=`<path d="M${FX(cx+r*Math.cos(a))} ${FX(cy+r*Math.sin(a))} L${FX(cx+(r+(i%2?8:-8))*Math.cos(a))} ${FX(cy+(r+(i%2?8:-8))*Math.sin(a))}" stroke="${c}" stroke-width="4"/>`;}
    return s+T(cx,cy-80-8,'ori','mono mid f11')+T(cx,cy+100,'ter','mono mid f11');},artH:190});}
function scO2(n){
  const items=[['Carsonella ruddii',0.16,'#C9BFAB','0.16 Mb · insect endosymbiont'],['Mycoplasma genitalium',0.58,'#C9BFAB','0.58 Mb · 525 genes'],['Streptococcus pneumoniae',2.1,PAL.blue,'2.1 Mb'],['Escherichia coli K-12',4.6,PAL.blue,'4.6 Mb · ~4,300 genes'],['Pseudomonas aeruginosa',6.3,PAL.blue,'6.3 Mb'],['Streptomyces coelicolor',8.7,PAL.green,'8.7 Mb, linear'],['Sorangium cellulosum',14.8,PAL.green,'~13–15 Mb'],['human (for scale)',3100,'#E7A99B',n?'3,100 Mb':'3,100 Mb · ~1.5% coding']];
  const top=para(n?16:24,30,'Genome size, log scale. Bacterial genomes span about a hundredfold; nearly 90% of the DNA codes for proteins, so gene number scales with size at about one gene per kilobase.',n?50:92,'lab start f13',17,0);
  const h=hbars(n,n?10:24,top.y+12,n?340:600,items.map(i=>[i[0],Math.log10(i[1]*100),i[2],i[3]]),{max:Math.log10(310000),lw:n?130:170,vw:n?120:150});
  const p=para(n?16:24,h.y+10,'Small genomes belong to endosymbionts and pathogens that rely on hosts; large ones to soil bacteria with complex lifestyles and many regulators. Most bacteria have one circular chromosome, but Vibrio has two, Borrelia a linear chromosome and many plasmids, and Streptomyces linear chromosomes with terminal proteins.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:top.s+h.s+p.s};
}
function scO3(n){
  const cx=n?180:170, cy=140, R=n?80:96;
  let s=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${DNAC}" stroke-width="3"/>`;
  s+=T(cx,cy-R-10,'oriC','mono mid f12')+T(cx,cy+R+20,'ter (dif)','mono mid f12');
  s+=`<path d="M${cx+R*0.26} ${cy-R*0.97} A${R} ${R} 0 0 1 ${cx+R} ${cy}" stroke="#2F5276" stroke-width="4" fill="none" marker-end="url(#ahb)"/><path d="M${cx-R*0.26} ${cy-R*0.97} A${R} ${R} 0 0 0 ${cx-R} ${cy}" stroke="#2F5276" stroke-width="4" fill="none" marker-end="url(#ahb)"/>`;
  s+=T(cx+R*.8,cy-R*.95,'replichore','note start f11')+T(cx-R*.8,cy-R*.95,'replichore','note end f11');
  s=G('a-fade',0,s);
  const b=n?bullets(24,cy+R+50,[['Genes face the fork','Highly expressed and essential genes sit mostly on the leading strand, co-oriented with replication, avoiding head-on collisions with RNA polymerase.'],['Dosage near the origin','In fast growth, origin-proximal genes have more copies; rRNA and ribosomal-protein genes cluster there.'],['Macrodomains','The E. coli chromosome folds into Ori, Ter, Left and Right macrodomains.']],44,{d0:.8,gap:20})
    :bullets(330,52,[['Genes face the fork','Highly expressed and essential genes lie mostly on the leading strand, transcribed in the same direction as replication, which avoids head-on collisions with RNA polymerase.'],['Dosage near the origin','With overlapping replication rounds, genes near oriC have more copies; rRNA operons and ribosomal-protein genes cluster there.'],['Symmetry','Large inversions across the origin–terminus axis are tolerated; those that move genes between replichores are rare.'],['Macrodomains','The E. coli chromosome folds into Ori, Ter, Left and Right macrodomains, organised by MatP and MukBEF.']],38,{d0:.8,gap:20});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,cy+R+40)),s:s+b.s};
}
function scO4(n){
  const A=n?axes(54,40,280,150,{xr:[0,4.6],yr:[-1,1],xt:[[0,'ori'],[2.3,'ter'],[4.6,'ori']],yt:[[-1,'min'],[0,'0'],[1,'max']],xlab:'position (Mb)',ylab:'cumulative GC skew'})
    :axes(70,40,300,170,{xr:[0,4.6],yr:[-1,1],xt:[[0,'ori'],[2.3,'ter'],[4.6,'ori']],yt:[[-1,'min'],[0,'0'],[1,'max']],xlab:'position (Mb)',ylab:'cumulative GC skew'});
  const f=x=>x<2.3?-(x/2.3)*1.8+0.9:((x-2.3)/2.3)*1.8-0.9;
  let s;
  s=A.s+G('a-fade',.3,curve(A,x=>-f(x),{col:'#A4473A',n:200})+T(FX(A.px(2.3)),FX(A.py(.9)-8),'maximum: terminus','note mid f10 halo'));
  const b=n?bullets(24,A.y+A.h+60,[['(G − C)/(G + C)','The leading strand is richer in G than C, probably from mutation bias during replication.'],['Finding the origin','Cumulative skew is lowest at the origin and highest at the terminus.']],44,{d0:.8,gap:20})
    :bullets(410,52,[['(G − C)/(G + C)','On the leading strand, G exceeds C slightly, probably from asymmetric mutation during replication and transcription.'],['Finding the origin','Plotted cumulatively along the chromosome, skew changes direction at the origin and the terminus, so the turning points locate both: the minimum marks the origin, the maximum the terminus.'],['Disruptions','Kinks reveal recent inversions or acquired DNA.']],28,{d0:.8,gap:20});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,A.y+A.h+50)),s:s+b.s};
}
function scO5(n){
  const items=[['GC content','Ranges from below 20% (some endosymbionts) to above 70% (Streptomyces, Micrococcus). Mutation is biased towards A+T in most bacteria; selection, recombination and repair pull back.'],['Codon usage bias','Highly expressed genes prefer codons read by abundant tRNAs; the codon adaptation index measures this. Weak bias in slow growers, strong in fast growers.'],['Spotting foreign genes','Recently acquired DNA often has a different GC content and codon usage from the host genome, until it is ameliorated by mutation.'],['Practical consequences','Expressing a gene from a GC-rich organism in E. coli may need codon optimisation or rare-tRNA strains such as Rosetta.']];
  const c=cards(n,items,{y:20,num:1});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scO6(n){
  const items=[['Mobile element load','Free-living bacteria typically carry a few to dozens of insertion sequences. Shigella, Yersinia pestis and Bordetella pertussis carry hundreds, a sign of recent host restriction.'],['Genome decay','After a switch to a host-restricted life, selection weakens, IS elements expand, genes become pseudogenes, and DNA is lost. Mycobacterium leprae has about 1,100 pseudogenes, nearly as many as functional genes.'],['Endosymbionts','Buchnera of aphids and Carsonella of psyllids retain only genes the host cannot supply, with very low GC and very small genomes.'],['Defence islands and prophages','Much of the variable DNA in a genome is phage, plasmid and defence-system DNA.']];
  const c=cards(n,items,{y:20,num:1});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scO7(n){
  const A=n?axes(54,40,280,160,{xr:[1,100],yr:[0,30000],xt:[1,25,50,75,100],yt:[[0,'0'],[10000,'10k'],[20000,'20k'],[30000,'30k']],xlab:'genomes sampled',ylab:'gene families',ydx:40})
    :axes(80,40,300,180,{xr:[1,100],yr:[0,30000],xt:[1,25,50,75,100],yt:[[0,'0'],[10000,'10k'],[20000,'20k'],[30000,'30k']],xlab:'genomes sampled',ylab:'gene families',ydx:44});
  let s=A.s+G('a-fade',.3,curve(A,x=>4300+2400*(Math.sqrt(x)-1),{col:'#A4473A'})+T(FX(A.px(70)),FX(A.py(4300+2400*(Math.sqrt(70)-1))-10),'pangenome: still growing','note end f11 halo'))
    +G('a-fade',.6,curve(A,x=>2500+1800*Math.exp(-(x-1)/12),{col:'#2F5276'})+T(FX(A.px(70)),FX(A.py(2500)-10),'core genome','note mid f11 halo'));
  const b=n?bullets(24,A.y+A.h+60,[['Core','Genes in (nearly) every strain: housekeeping, often ~2,000–3,000 in E. coli.'],['Accessory','Genes in some strains: islands, prophages, plasmids, defence systems.'],['Open pangenomes','E. coli: more than 100,000 gene families across tens of thousands of genomes.']],44,{d0:1,gap:20})
    :bullets(410,52,[['Core genome','Genes present in nearly every strain of a species: housekeeping, translation, central metabolism. About 2,000–3,000 families in E. coli.'],['Accessory genome','Genes in some strains only: islands, prophages, plasmids, defence systems and niche-specific metabolism.'],['Open and closed','In open pangenomes such as E. coli’s, new genomes keep adding new genes; tens of thousands of genomes reveal well over 100,000 gene families. Isolated specialists have closed pangenomes.']],28,{d0:1,gap:20});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,A.y+A.h+50)),s:s+b.s};
}
const S=[
 {p:1,title:'Reading a genome',draw:scO1,text:"A bacterial genome is a compact text, mostly genes, organised around a single origin of replication. Its size reflects lifestyle, its layout reflects replication, and its composition records the mutation, selection and gene transfer that shaped it."},
 {p:1,title:'Size and gene density',draw:scO2,text:"Bacterial genomes range from about 150 kilobases in insect endosymbionts to over 13 megabases in soil myxobacteria. Almost nine-tenths of the sequence codes for proteins, so the number of genes rises in step with genome size."},
 {p:1,title:'Organised around replication',draw:scO3,text:"Replication runs both ways from the origin to the terminus, dividing the circle into two replichores. Essential and highly expressed genes tend to lie on the leading strand and near the origin, where they avoid collisions with the replisome and gain copies in fast growth."},
 {p:2,title:'GC skew',draw:scO4,text:"The two strands of a bacterial chromosome are not chemically identical: the leading strand carries a slight excess of G over C. Plotted cumulatively along the genome, this skew changes direction at the origin and the terminus, so it can be used to find them."},
 {p:2,title:'GC content and codon usage',draw:scO5,text:"Genomes differ widely in GC content, set by a balance of mutational bias and selection. Within a genome, highly expressed genes use codons matched to abundant tRNAs. Genes with unusual composition are often recent arrivals by horizontal transfer."},
 {p:2,title:'Mobile elements and genome decay',draw:scO6,text:"When a bacterium becomes restricted to a host, selection on many genes relaxes. Insertion sequences expand, genes decay into pseudogenes and the genome shrinks. Mycobacterium leprae and Yersinia pestis show the process under way; obligate endosymbionts show it complete."},
 {p:3,title:'Pangenomes',draw:scO7,text:"Sequencing many strains of one species shows a core of genes shared by all and a much larger accessory pool present in some. In species such as E. coli the pangenome keeps growing as more genomes are added; this accessory pool is where virulence and resistance genes live."}];
const CHIPS={};
