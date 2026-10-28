/*META
{"title":"Bioinformatics","eyebrow":"Methods · an animated primer","h1":"From sequencing reads to biological answers","parts":["Reads","Genomes","Communities","Practice"],"foot":"Tools change quickly; those named are widely used examples, not recommendations, and thresholds such as MIMAG’s are community conventions. Sequencing technologies are covered in the sequencing primer.","description":"Read quality control, mapping and variant calling, de Bruijn graph assembly and assembly quality, genome annotation, metagenomic profiling and binning, differential abundance, and command-line and workflow practice."}
META*/
const PIPE=[
 {k:'QC and trimming',id:'qc',in:'raw reads (FASTQ)',out:'trimmed FASTQ and a QC report',tools:'FastQC, MultiQC, fastp, cutadapt, Trimmomatic',chk:'quality along the read, adapter content, duplication, GC content'},
 {k:'Mapping',id:'map',in:'reads and a reference genome (FASTA)',out:'alignments (SAM, or compressed BAM), sorted and indexed',tools:'BWA-MEM, Bowtie2; minimap2 for long reads; samtools',chk:'percentage of reads mapped; depth and evenness of coverage'},
 {k:'Variant calling',id:'var',in:'sorted BAM and the reference',out:'variants (VCF)',tools:'bcftools, FreeBayes, GATK; for bacteria Snippy, and breseq for evolved lines',chk:'depth, base and mapping quality, allele frequency (near 100% in a clonal haploid)'},
 {k:'Assembly',id:'asm',in:'reads, short or long',out:'contigs (FASTA) and the assembly graph (GFA)',tools:'SPAdes, Unicycler, Flye, Canu; MEGAHIT for metagenomes',chk:'number of contigs, N50, total length, CheckM completeness and contamination'},
 {k:'Annotation',id:'ann',in:'contigs or MAGs',out:'genes and functions (GFF3, GenBank, protein FASTA)',tools:'Prodigal, Prokka, Bakta, NCBI PGAP; eggNOG-mapper, InterProScan',chk:'coding density near 85–90%; no broken genes from frameshifts'},
 {k:'Binning',id:'bin',in:'metagenome contigs and their coverage in each sample',out:'metagenome-assembled genomes (MAGs)',tools:'MetaBAT2, CONCOCT, MaxBin2, DAS Tool; CheckM2; GTDB-Tk for taxonomy',chk:'MIMAG completeness, contamination and rRNA/tRNA genes'},
 {k:'Profiling',id:'prof',in:'metagenomic reads (or 16S amplicons)',out:'a table of taxa and their abundances per sample',tools:'Kraken2 with Bracken, MetaPhlAn, mOTUs; DADA2 and QIIME 2 for amplicons',chk:'database coverage of your environment; false positives at low abundance'},
 {k:'Differential abundance',id:'da',in:'a count table and sample metadata',out:'genes or taxa with fold changes and adjusted p-values',tools:'DESeq2, edgeR and limma; for microbiomes, ANCOM-BC,\u00a0ALDEx2\u00a0and\u00a0MaAsLin2',chk:'replicates, batch effects, false discovery rate, compositionality'}];
let pipeSel=0;
function pipeArt(cx,cy,n){
  const sel=PIPE[pipeSel].id, f=k=>k===sel?PAL.blue:'#EFE6D2', fs=11;
  const L={qc:'QC and|trimming',map:'mapping',var:'variant|calling',asm:'assembly',ann:'annotation',bin:'binning',prof:'profiling',da:'differential|abundance'};
  const P=n?{qc:[180,-90],map:[60,-20],asm:[180,-20],prof:[300,-20],var:[60,50],bin:[180,50],da:[300,50],ann:[180,115]}
    :{qc:[70,0],map:[210,-55],var:[350,-55],asm:[210,0],bin:[350,0],ann:[490,0],prof:[210,55],da:[350,55]};
  const N={};Object.keys(P).forEach(k=>{N[k]={x:(n?0:-10)+P[k][0]+(n?0:cx-320),y:cy+P[k][1],w:n?104:108,t:L[k],f:f(k),fs};});
  return flow(N,[['qc','map',''],['qc','asm',''],['qc','prof',''],['map','var',''],['asm','bin',''],['bin','ann',''],['prof','da','']]);}
function scI1(n){return introPlate(n,{q:'How do millions of short reads become a genome, a list of genes or an answer?',
  belief:'Sequencers produce text, not biology. Bioinformatics checks the reads, places or assembles them, finds genes and their functions, sorts mixtures into genomes, and tests what changes between conditions, ideally in a pipeline someone else can rerun.',
  items:['A pipeline overview','Read quality and FASTQ','Mapping and variant calling','Assembly with de Bruijn graphs','Annotation','Metagenomes and MAGs','Differential abundance','Command line and reproducibility'],
  art:(cx,cy)=>{let s='';const R=[[-90,40],[-60,50],[-20,40],[10,50],[40,44],[-80,30]];
    R.forEach(([x,w],i)=>{s+=`<path d="M${cx+x} ${cy-50+i*9} h${w}" stroke="#8FB1CF" stroke-width="5" stroke-linecap="round"/>`;});
    s+=arw(cx,cy+6,cx,cy+28)+`<path d="M${cx-90} ${cy+44} H${cx+90}" stroke="${DNAC}" stroke-width="6" stroke-linecap="round"/>`;
    return s+T(cx,cy-64,'overlapping reads','note mid f11')+T(cx,cy+66,'contig','note mid f11');},artH:160});}
function scI2(n){
  const p=PIPE[pipeSel];
  return explorer(n,{h:p.k,rows:[['Input',p.in],['Output',p.out],['Tools',p.tools],['Check',p.chk]],note:'Arrows show the usual order. Mapping feeds variant calling and, for RNA-seq, gene counts; assembly feeds annotation, through binning for metagenomes; profiling skips assembly altogether.',art:(cx,cy)=>pipeArt(cx,cy,n),artH:n?290:168},{y:20});
}
function scI3(n){
  const x0=n?16:24, y0=40;
  let s=G('a-fade',0,box(x0,y0-22,n?328:290,104,'#EFE6D2',4)+['@read_1 sample=A','GATTTGGGGTTCAAAGCAGT','+','IIIIHHHGG@@@:::555++'].map((l,i)=>T(x0+12,y0+i*20,l,'mono start f13')).join('')
    +T(x0+12,y0+92,'line 4: one character per base','note start f11'));
  s+=G('a-fade',.3,T(x0+(n?250:200),y0+20,'bases','note start f11')+T(x0+(n?250:200),y0+60,'qualities','note start f11'));
  const A=n?axes(54,y0+130,280,120,{xr:[1,150],yr:[0,40],xt:[[1,'1'],[75,'75'],[150,'150']],yt:[[20,'20'],[28,'28'],[40,'40']],xlab:'position in read (bp)',ylab:'Phred'})
    :axes(380,y0-10,230,140,{xr:[1,150],yr:[0,40],xt:[[1,'1'],[75,'75'],[150,'150']],yt:[[20,'20'],[28,'28'],[40,'40']],xlab:'position in read (bp)',ylab:'Phred'});
  const band=(a,b,c)=>`<rect x="${A.x}" y="${FX(A.py(b))}" width="${A.w}" height="${FX(A.py(a)-A.py(b))}" fill="${c}" opacity=".35"/>`;
  s+=G('a-fade',.5,band(28,40,'#A9C49A')+band(20,28,'#E0C88A')+band(0,20,'#E7A99B')+A.s+curve(A,x=>36-8*Math.pow(x/150,3),{col:'#2F5276'})+curve(A,x=>30-14*Math.pow(x/150,2.5),{col:'#2F5276',w:1.2,dash:'4 3'})+T(FX(A.px(70)),FX(A.py(37.5)),'mean','note mid f10 halo')+T(FX(A.px(70)),FX(A.py(23.5)),'worst 10%','note mid f10 halo'));
  const b=bullets(n?24:30,A.y+A.h+60,[['Phred scores','Q = −10 log₁₀ P(error). Q20 means 1 error in 100, Q30 1 in 1,000, Q40 1 in 10,000. Each score is stored as one ASCII character, Q + 33: “I” is Q40, “5” is Q20.'],['Quality falls along the read','In Illumina data, phasing errors accumulate, so read ends are trimmed or filtered; FastQC plots this per position, MultiQC gathers many reports.'],['Adapters','When a DNA fragment is shorter than the read, the sequencer reads on into the adapter. Trimmers such as cutadapt and fastp cut it off before mapping or assembly.']],n?44:88,{d0:1,gap:18});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scI4(n){
  const ref=n?'ACGTTAGCCGATACGGTCATTGCA':'ACGTTAGCCGATACGGTCATTGCAGGCTAACGTTGACCAT', dx=n?13.5:14.5, x0=n?18:30, y0=50, snp=n?12:17, err=n?5:8;
  let s=G('a-fade',0,T(x0-4,y0-18,'reference','note start f11')+ref.split('').map((b,i)=>Tc(FX(x0+i*dx+dx/2),y0,b,i===snp?'#A4473A':(NB[b]||INK),12,'mono mid','600')).join(''));
  const L=ref.length, reads=n?[[0,11],[3,12],[6,12],[9,13],[11,12],[13,11]]:[[0,15],[4,16],[9,16],[13,17],[15,14],[20,16],[24,16]];
  reads.forEach(([a,l],i)=>{const y=y0+18+i*12, x1=x0+a*dx+2, x2=x0+Math.min(L,a+l)*dx-2;
    let r=`<path d="M${FX(x1)} ${y} H${FX(x2)}" stroke="#8FB1CF" stroke-width="7" stroke-linecap="round"/>`;
    if(snp>=a&&snp<a+l)r+=`<rect x="${FX(x0+snp*dx+1)}" y="${y-4}" width="${FX(dx-2)}" height="8" fill="#A4473A"/>`;
    if(i===1&&err>=a&&err<a+l)r+=`<rect x="${FX(x0+err*dx+1)}" y="${y-4}" width="${FX(dx-2)}" height="8" fill="#2F5276"/>`;
    s+=G('a-fade',(.2+i*.1).toFixed(1),r);});
  const yb=y0+18+reads.length*12+10;
  s+=G('a-fade',1,T(FX(x0+snp*dx+dx/2),yb+6,n?'C→T in every read: a SNP':'reference C, but T in every read: a real SNP','note mid f11')+T(n?FX(x0+err*dx):FX(x0+err*dx+dx/2),yb+22,'once only: a sequencing error',`note ${n?'start':'mid'} f11`));
  const b=bullets(n?24:30,yb+56,[['Aligners','BWA-MEM and Bowtie2 index the reference with the Burrows–Wheeler transform so millions of short reads can be placed quickly; minimap2 handles long reads. Output is SAM text or its compressed form, BAM.'],['Coverage and MAPQ','Depth is the number of reads over a base; 30–100× is typical for a bacterial genome. MAPQ is −10 log₁₀ of the chance a read is misplaced; 0 means it fits equally well elsewhere, as in repeated rRNA operons.'],['Calling variants','A clonal bacterium is haploid, so a true SNP sits in nearly all reads; intermediate frequencies suggest a mixed population or contamination. bcftools, FreeBayes, Snippy and breseq call them.']],n?44:88,{d0:1.2,gap:18});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scI5(n){
  const w=n?40:52, P=n?{AT:[30,110],TG:[105,110],GG:[180,40],GC:[255,110],CA:[330,110],CG:[255,190],GT:[105,190]}
    :{AT:[60,110],TG:[180,110],GG:[300,44],GC:[420,110],CA:[540,110],CG:[420,190],GT:[180,190]};
  const N={};Object.keys(P).forEach(k=>{N[k]={x:P[k][0],y:P[k][1]+20,w,t:k,f:k==='TG'||k==='GC'?PAL.gold:'#EFE6D2'};});
  const E=[['AT','TG','ATG',{side:-1}],['TG','GG','TGG',{side:-1}],['GG','GC','GGC',{side:-1}],['TG','GC','TGC',{side:1}],['GC','CA','GCA',{side:-1}],['GC','CG','GCG',{side:-1}],['CG','GT','CGT',{side:1}],['GT','TG','GTG',{side:-1}]];
  let s=G('a-fade',0,T(n?16:24,24,'genome ATGGCGTGCA, read as 3-mers; nodes are 2-mers','note start f12'));
  s+=G('a-fade',.3,flow(N,E));
  const yb=(n?190:190)+20+40;
  s+=G('a-fade',.8,T(n?16:24,yb,'Two walks use every edge once:','lab start f13')+T(n?16:24,yb+20,'ATGGCGTGCA','mono start f13')+T(n?120:150,yb+20,'and','note start f12')+T(n?156:190,yb+20,'ATGCGTGGCA','mono start f13')+T(n?16:24,yb+38,'The repeated TG and GC (gold) make the graph ambiguous.','note start f12'));
  const b=bullets(n?24:30,yb+74,[['De Bruijn graphs','Short-read assemblers (Velvet, SPAdes) break reads into k-mers, link overlapping ones, and walk the graph. Repeats longer than k create tangles, so short-read assemblies break at rRNA operons and insertion sequences.'],['Overlap–layout–consensus','Long-read assemblers (Canu; Flye uses a related repeat graph) compare whole reads. Reads longer than the longest repeat usually give a complete, circular chromosome.'],['N50 and CheckM','N50: half the assembly lies in contigs at least this long. CheckM counts lineage-specific single-copy marker genes: missing ones estimate incompleteness, duplicated ones contamination.']],n?44:88,{d0:1.2,gap:18});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scI6(n){
  const N=n?{c:{x:180,y:30,w:120,t:'contigs'},g:{x:180,y:100,w:200,t:'gene calling|(Prodigal)',f:PAL.gold},h:{x:90,y:180,w:160,t:'homology|BLAST, DIAMOND',f:PAL.blue},m:{x:270,y:180,w:160,t:'profile HMMs|HMMER, Pfam',f:PAL.lilac},a:{x:180,y:260,w:220,t:'annotated genome|(GFF3, GenBank)',f:PAL.green}}
    :{c:{x:70,y:110,w:100,t:'contigs'},g:{x:220,y:70,w:150,t:'gene calling|(Prodigal)',f:PAL.gold},r:{x:220,y:185,w:178,t:'tRNA, rRNA|(tRNAscan, barrnap)'},h:{x:404,y:40,w:164,t:'homology|BLAST, DIAMOND',f:PAL.blue},m:{x:404,y:110,w:164,t:'profile HMMs|HMMER, Pfam',f:PAL.lilac},a:{x:569,y:110,w:110,t:'annotated|genome',f:PAL.green}};
  const E=n?[['c','g',''],['g','h',''],['g','m',''],['h','a',''],['m','a','']]:[['c','g',''],['c','r',''],['g','h',''],['g','m',''],['h','a',''],['m','a',''],['r','a','']];
  let s=G('a-fade',0,flow(N,E));
  const b=bullets(n?24:30,n?320:240,[['Finding genes','Prodigal (2010) trains itself on each genome, scoring open reading frames, start codons and ribosome binding sites; bacterial genomes are about 85–90% coding. Prokka (2014) and Bakta (2021) wrap gene callers and databases into one command.'],['BLAST and the E-value','BLAST (Altschul and colleagues, 1990) finds similar sequences; the E-value is how many hits this good you would expect by chance in a database this size. DIAMOND is far faster for millions of proteins.'],['Profile HMMs','A hidden Markov model of a protein family records which positions are conserved, so HMMER and Pfam find distant relatives that pairwise BLAST misses.'],['Hypothetical proteins','Typically a quarter to a third of genes in a new genome get no function, and errors spread when annotations are copied from earlier annotations.']],n?44:88,{d0:1,gap:18});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scI7(n){
  const A=n?axes(60,30,270,150,{xr:[25,75],yr:[1,1000],logy:1,xt:[[30,'30'],[50,'50'],[70,'70']],yt:[[1,'1×'],[10,'10×'],[100,'100×'],[1000,'1000×']],xlab:'contig GC (%)',ylab:'coverage',ydx:40})
    :axes(80,30,270,170,{xr:[25,75],yr:[1,1000],logy:1,xt:[[30,'30'],[50,'50'],[70,'70']],yt:[[1,'1×'],[10,'10×'],[100,'100×'],[1000,'1000×']],xlab:'contig GC (%)',ylab:'coverage',ydx:40});
  const r=rnd(11), C=[[34,250,'#2F5276'],[52,40,'#4F7A3F'],[66,12,'#A4473A'],[44,3.5,'#C99A2E']];
  let s=A.s;
  C.forEach(([gc,cv,col],i)=>{let p='';for(let j=0;j<16;j++){const g=gc+(r()-.5)*7, c=cv*Math.pow(10,(r()-.5)*.35);p+=`<circle cx="${FX(A.px(g))}" cy="${FX(A.py(c))}" r="${(2+r()*2.5).toFixed(1)}" fill="${col}" opacity=".75"/>`;}
    s+=G('a-fade',(.2+i*.2).toFixed(1),p+`<ellipse cx="${FX(A.px(gc))}" cy="${FX(A.py(cv))}" rx="${FX(A.px(gc+5.5)-A.px(gc))}" ry="${FX(A.py(cv)-A.py(cv*1.8))}" fill="none" stroke="${col}" stroke-dasharray="3 2"/>`+T(FX(A.px(gc+7)),FX(A.py(cv)+4),'MAG '+(i+1),'note start f10 halo'));});
  let g='';for(let j=0;j<10;j++)g+=`<circle cx="${FX(A.px(28+r()*44))}" cy="${FX(A.py(Math.pow(10,r()*2.6)))}" r="1.8" fill="#9A9384"/>`;s+=G('a-fade',1,g);
  const it=[['Profiling','Classify reads directly: Kraken2 matches k-mers to a database, MetaPhlAn uses clade-specific marker genes. Fast, but blind to organisms missing from the database.'],['Assembly and binning','Assemble (metaSPAdes, MEGAHIT), then group contigs that share composition (GC, tetranucleotide frequencies) and coverage, especially coverage across many samples (MetaBAT2, CONCOCT).']];
  const b=n?bullets(24,A.y+A.h+60,it,44,{d0:1,gap:18}):bullets(410,48,it,28,{d0:1,gap:18});
  const rows=[['High quality','> 90%','< 5%','23S, 16S and 5S rRNA genes and at least 18 tRNAs'],['Medium quality','≥ 50%','< 10%','none'],['Low quality','< 50%','< 10%','none']];
  const t=wtable(n,['MIMAG (2017)','Complete','Contam.','Also needs'],rows,n?[[10,14],[112,8],[176,8],[240,16]]:[[24,20],[180,10],[280,10],[380,40]],{y0:Math.max(b.y,A.y+A.h+56)+(n?4:12),d0:1.4,R:n?354:620});
  const p=para(n?16:24,t.y+12,'Hundreds of thousands of MAGs from uncultured lineages, classified with the Genome Taxonomy Database (GTDB), have redrawn the bacterial and archaeal trees. A MAG is a population consensus, not a single genome.',n?50:92,'note start f13',17,1.6);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:s+b.s+t.s+p.s};
}
function scI8(n){
  const bx=n?[40,95,215,270]:[60,120,260,320], base=n?200:200, bw=44, k=.3, col=['#2F5276','#4F7A3F','#C99A2E'];
  const abs=[[40,30,30],[400,30,30]], rel=abs.map(a=>{const t=a.reduce((x,y)=>x+y);return a.map(v=>v/t*100);});
  let s='';
  const stack=(x,vals,sc,d)=>{let y=base, r='';vals.forEach((v,i)=>{const h=v*sc;r+=`<rect x="${x}" y="${FX(y-h)}" width="${bw}" height="${FX(h)}" fill="${col[i]}" stroke="${INK}" stroke-width=".6"/>`;y-=h;});return G('a-fade',d,r);};
  s+=stack(bx[0],abs[0],k,0)+stack(bx[1],abs[1],k,.2)+stack(bx[2],rel[0],1.4,.5)+stack(bx[3],rel[1],1.4,.7);
  s+=ln(bx[0]-6,base,bx[1]+bw+6,base,'#6A5B47',1.2)+ln(bx[2]-6,base,bx[3]+bw+6,base,'#6A5B47',1.2);
  s+=[0,1,2,3].map(i=>T(bx[i]+bw/2,base+15,i%2?'after':'before','note mid f11')).join('');
  s+=T((bx[0]+bx[1]+bw)/2,base+34,'absolute cells','lab mid f13')+T((bx[2]+bx[3]+bw)/2,base+34,'what sequencing sees (%)','lab mid f13');
  s+=G('a-fade',1,T(n?16:24,base+58,n?'Only blue grew, yet green and gold appear to fall':'Only the blue taxon grew, yet in proportions green and gold appear to fall fivefold.','note start f12'));
  if(!n)s+=G('a-fade',1.2,bullets(410,40,[['Closed data','Sequencing reports proportions. If one taxon blooms, every other share must shrink.'],['Fixes','Log-ratio methods (CLR, ANCOM, ANCOM-BC, ALDEx2), or measure total load by qPCR, flow cytometry or spike-ins.']],26,{gap:20}).s);
  const b=bullets(n?24:30,base+(n?92:96),(n?[['Closed data','Sequencing reports proportions: if one taxon blooms, every other share must shrink. Log-ratio methods (CLR, ANCOM, ANCOM-BC, ALDEx2) or measured total load fix this.']]:[]).concat([['DESeq2 for RNA-seq','Love, Huber and Anders (2014): read counts per gene are modelled as negative binomial, size factors correct for sequencing depth, and fold changes are shrunk when evidence is weak. Three or more biological replicates per condition.'],['Many tests at once','Testing 4,000 genes at p < 0.05 gives about 200 false hits by chance; report Benjamini–Hochberg adjusted values (false discovery rate) instead.'],['Methods disagree','Nearing and colleagues (2022) ran 14 microbiome differential-abundance methods on 38 data sets and got strikingly different answers. Use more than one and report it.']]),n?44:88,{d0:1.4,gap:18});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scI9(n){
  const L=[['$ zcat reads.fastq.gz | awk \'NR%4==2\' | wc -l','# count reads'],['$ grep -c \'&gt;\' assembly.fasta','# count contigs'],['$ samtools view -c -q 30 sample.bam','# reads with MAPQ ≥ 30'],['$ snakemake --cores 8 --sdm conda','# rerun the whole pipeline']];
  const x0=n?10:24, w=n?340:592, lh=n?34:36;
  let t=`<rect x="${x0}" y="20" width="${w}" height="${n?L.length*lh+20:L.length*lh+22}" rx="6" fill="#2B2620"/>`;
  L.forEach(([c,m],i)=>{const y=40+i*lh;t+=n?Tc(x0+10,y,c,'#EFE8D8',10.5,'mono start')+Tc(x0+10,y+14,m,'#A9C49A',10,'mono start'):Tc(x0+12,y,c,'#EFE8D8',12,'mono start')+Tc(x0+40,y+16,m,'#A9C49A',12,'mono start');});
  const top=n?20+L.length*lh+20:20+L.length*lh+22;
  const items=[['Pipes and text tools','Each Unix tool does one job and passes text along a pipe (|): grep finds lines, awk picks columns and computes, sort and uniq count. Most bioinformatic formats are plain text for this reason.'],['Python and R','Python (with Biopython and pandas) for parsing and gluing tools together; R (with Bioconductor, DESeq2, phyloseq, ggplot2) for statistics and figures.'],['Workflow managers','Snakemake (2012) and Nextflow (2017) describe a pipeline as rules with inputs and outputs, rerun only what changed, and run on a laptop, a cluster or the cloud; nf-core shares tested pipelines.'],['Reproducibility','Pin software versions with conda environments or containers, keep code in git, record parameters and random seeds, and deposit raw reads in SRA or ENA.']];
  const c=cards(n,items,{y:top+16,num:1});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:G('a-fade',0,t)+c.s};
}
const S=[
 {p:1,title:'Reads to answers',draw:scI1,text:"A sequencing run yields millions of short strings of letters with quality scores. Bioinformatics turns them into genomes, genes, variants and comparisons, through a chain of steps whose assumptions and checks matter as much as the tools."},
 {p:1,title:'A pipeline overview',chips:'pipe',draw:scI2,text:"Most analyses are chains of standard steps, each taking a file format in and writing another out. Pick a step to see its inputs, outputs, typical tools and what to check before trusting the result."},
 {p:1,title:'Read quality',draw:scI3,text:"Reads arrive as FASTQ: a name, the bases, a separator, and a quality character for every base. The Phred scale turns error probabilities into scores. Quality control checks the scores, trims adapters and low-quality ends, and flags problems before they spread downstream."},
 {p:1,title:'Mapping and variants',draw:scI4,text:"When a reference genome exists, reads are aligned to it. The pile of reads over each position shows coverage, and positions where nearly all reads disagree with the reference are variants. A mismatch in a single read is usually a sequencing error."},
 {p:2,title:'Assembly',draw:scI5,text:"Without a reference, the genome must be assembled. Short-read assemblers build a de Bruijn graph of overlapping k-mers and walk it; repeats create branches that the reads cannot resolve. Long reads span repeats, which is why they give complete genomes."},
 {p:2,title:'Annotation',draw:scI6,text:"Annotation finds the genes in an assembly and predicts what they do. Gene callers find protein-coding regions; RNA genes need their own tools; functions come from similarity to characterised proteins, by pairwise search or by profile hidden Markov models of protein families."},
 {p:3,title:'Metagenomes and MAGs',draw:scI7,text:"Sequencing a whole community mixes reads from hundreds of species. Profiling classifies reads against databases; assembly and binning instead reconstruct metagenome-assembled genomes, sorting contigs by composition and coverage. Community standards say how complete and clean a MAG must be."},
 {p:3,title:'Differential abundance',draw:scI8,text:"Comparing conditions means testing thousands of genes or taxa at once, with few replicates and noisy counts. DESeq2 handles this for RNA-seq. Microbiome data add a further trap: sequencing gives only proportions, so one taxon's rise can make the others look as if they fell."},
 {p:4,title:'Command line and reproducibility',draw:scI9,text:"Most bioinformatics runs on the Unix command line, where small tools are chained with pipes and scripts in Python or R do the rest. Workflow managers, environments and version control make an analysis something another person, or you next year, can rerun exactly."}];
const CHIPS={pipe:{list:PIPE.map(p=>p.k),get:()=>pipeSel,set:k=>pipeSel=k}};
