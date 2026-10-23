/*META
{"title":"Microbial Ecology","eyebrow":"Ecology and environmental microbiology · an animated primer","h1":"Who lives where, why, and with whom","parts":["Assembly and diversity","Interactions","Microbiomes"],"foot":"Diversity values are computed for the toy communities shown; abundances and rates are rounded literature estimates that vary widely between sites and studies.","description":"Community assembly by selection, drift, dispersal and diversification; alpha and beta diversity metrics; rarefaction and its pitfalls; syntrophy, cross-feeding, competition, predation and phage ecology; host-associated and environmental microbiomes; and why microbiome correlations are hard to read as causes."}
META*/
const SPC=['#4F7A3F','#2F5276','#C17A2C','#7D4A98','#A4473A','#2E7D78'];
function dotCloud(cx,cy,r,counts,seed){const rng=rnd(seed),pts=[];let k=0;const N=counts.reduce((a,b)=>a+b,0);
  while(pts.length<N&&k<4000){k++;const a=rng()*Math.PI*2,d=Math.sqrt(rng())*(r-6),x=cx+Math.cos(a)*d,y=cy+Math.sin(a)*d;if(pts.every(p=>Math.hypot(p[0]-x,p[1]-y)>7.4))pts.push([x,y]);}
  let s='',i=0;counts.forEach((c,j)=>{for(let q=0;q<c&&i<pts.length;q++,i++)s+=`<circle cx="${FX(pts[i][0])}" cy="${FX(pts[i][1])}" r="3.2" fill="${SPC[j]}" stroke="${INK}" stroke-width=".4"/>`;});
  return s;}
function scE1(n){return introPlate(n,{q:'Why does each place have the microbes it has, and what are they doing to each other?',
  belief:'A gram of soil or a millilitre of seawater holds thousands of microbial types. Which ones are present depends on the environment, on chance and on who arrived first; what they do depends on how they compete, cooperate, eat and infect one another. Sequencing lets us census them, but reading cause from those censuses is hard.',
  items:['Community assembly','Measuring diversity','Rarefaction and its pitfalls','Syntrophy and cross-feeding','Predators and phages','Microbiomes','Correlation and causation'],
  art:(cx,cy)=>`<circle cx="${cx}" cy="${cy-6}" r="62" fill="#EFE6D2" stroke="${INK}" stroke-width="1"/>`+dotCloud(cx,cy-6,62,[22,12,8,5,3,2],5)+T(cx,cy+76,'one sample, six taxa','note mid f11'),artH:160});}
function scE2(n){
  let s='';
  const py=n?96:100, px=n?70:90, lx=n?290:420, rr=n?50:60, lr=n?38:48;
  s+=G('a-fade',0,`<circle cx="${px}" cy="${py}" r="${rr}" fill="#EFE6D2" stroke="${INK}"/>`+dotCloud(px,py,rr,n?[8,8,8,8,8,8]:[10,10,10,10,10,10],3)+T(px,py+rr+18,'regional pool','note mid f11'));
  const fx=n?180:255;
  s+=G('a-fade',.4,`<path d="M${fx-24} ${py-46} H${fx+24} L${fx+8} ${py+8} V${py+40} H${fx-8} V${py+8} Z" fill="${PAL.gold}" stroke="${INK}" stroke-width="1" class="tint"/>`+T(fx,py+58,'selection','note mid f11')+T(fx,py+71,n?'(filter)':'(environment, partners)','note mid f10'));
  s+=G('a-fade',.4,arw(px+rr+4,py-10,fx-28,py-10,{w:1.4})+T((px+rr+fx-24)/2,n?py+8:py-18,'dispersal','note mid f11 halo'));
  s+=G('a-fade',.8,arw(fx+26,py-10,lx-lr-6,py-10,{w:1.4})+`<circle cx="${lx}" cy="${py}" r="${lr}" fill="#EFE6D2" stroke="${INK}"/>`+dotCloud(lx,py,lr,[14,7,0,4,0,1],8)+T(lx,py+lr+18,'local community','note mid f11'));
  s+=G('a-fade',1.1,`<path d="M${FX(lx+lr*.25)} ${FX(py-lr*.97)} a18 18 0 1 1 ${FX(lr*.5)} ${FX(lr*.35)}" stroke="#A4473A" stroke-width="1.4" fill="none" marker-end="url(#ahr)"/>`+T(FX(lx+lr*.45),FX(py-lr-30),'drift','note start f11 halo')
    +`<path d="M${FX(lx-lr*.25)} ${FX(py-lr*.97)} a18 18 0 1 0 ${FX(-lr*.5)} ${FX(lr*.35)}" stroke="#2F5276" stroke-width="1.4" fill="none" marker-end="url(#ahb)"/>`+T(FX(lx-lr*.45),FX(py-lr-30),n?'new types':'diversification','note end f11 halo'));
  const rows=[['Selection','fitness differences among taxa in a given environment','pH is the best single predictor of soil bacterial communities across continents'],
    ['Drift','random births and deaths change abundances','strongest in small populations and when selection is weak'],
    ['Dispersal','movement of cells between places','"everything is everywhere, but the environment selects" (Baas Becking, 1934); yet hot-spring Sulfolobus shows geographic isolation'],
    ['Diversification','new genetic variants arise','mutation and horizontal gene transfer act on ecological timescales']];
  const t=wtable(n,['Process','What it does','Microbial example'],rows,n?[[10,12],[100,15],[208,24]]:[[24,16],[150,30],[360,42]],{y0:py+(n?110:120),d0:1.3,R:n?354:620});
  const p=para(n?16:24,t.y+12,'Vellend (2010) argued that all community ecology reduces to these four processes; Nemergut and colleagues (2013) applied the framework to microbes. Their relative weight differs between habitats and is measured by comparing observed communities with null models.',n?50:92,'note start f13',17,1.6);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:s+t.s+p.s};
}
/* ---------- diversity metrics ---------- */
const CA=[10,10,10,10,0,0], CB=[31,3,2,2,1,1];
const prop=c=>{const N=c.reduce((a,b)=>a+b,0);return c.map(x=>x/N);};
const rich=c=>c.filter(x=>x>0).length;
const shan=c=>-prop(c).filter(p=>p>0).reduce((a,p)=>a+p*Math.log(p),0);
const simp=c=>1-prop(c).reduce((a,p)=>a+p*p,0);
const bray=(a,b)=>1-2*a.reduce((s,x,i)=>s+Math.min(x,b[i]),0)/(a.reduce((x,y)=>x+y,0)+b.reduce((x,y)=>x+y,0));
/* tree: branches [length, leaves] */
const TREE=[[1,[0,1]],[1,[2,3]],[2,[4,5]],[1,[0]],[1,[1]],[1,[2]],[1,[3]],[1,[4]],[1,[5]]];
const unifrac=(a,b)=>{let tot=0,u=0;TREE.forEach(([l,L])=>{const ia=L.some(i=>a[i]>0),ib=L.some(i=>b[i]>0);if(ia||ib){tot+=l;if(ia!==ib)u+=l;}});return u/tot;};
const DIV=[
 {k:'Richness',ty:'alpha',f:'S = number of taxa present',v:()=>['A: '+rich(CA),'B: '+rich(CB)],t:'The simplest alpha diversity: count the types. B has more taxa, but most are rare, and richness depends strongly on how deeply you sample. Estimators such as Chao1 use the number of singletons to guess how many taxa were missed.'},
 {k:'Shannon',ty:'alpha',f:'H′ = −Σ pᵢ ln pᵢ',v:()=>['A: '+shan(CA).toFixed(2),'B: '+shan(CB).toFixed(2)],t:'Shannon diversity combines richness and evenness: it is highest when many taxa are equally common. A, with four equal taxa, scores ln 4 ≈ 1.39; B, dominated by one taxon, scores lower despite having more taxa.'},
 {k:'Simpson',ty:'alpha',f:'1 − D = 1 − Σ pᵢ²',v:()=>['A: '+simp(CA).toFixed(2),'B: '+simp(CB).toFixed(2)],t:'The probability that two individuals drawn at random belong to different taxa. It is dominated by the commonest taxa and hardly notices rare ones, so it measures evenness more than richness.'},
 {k:'Bray–Curtis',ty:'beta',f:'BC = 1 − 2 Σ min(xᵢ, yᵢ) / (Σx + Σy)',v:()=>['A vs B: '+bray(CA,CB).toFixed(2)],t:'A beta diversity, comparing two samples: 0 means identical counts, 1 means no taxa shared. It weights abundant taxa heavily. Distances between all pairs of samples are usually displayed by ordination, such as principal coordinates analysis.'},
 {k:'UniFrac',ty:'beta',f:'unique / total branch length',v:()=>['A vs B: '+unifrac(CA,CB).toFixed(2)],t:'UniFrac (Lozupone and Knight, 2005) uses a phylogenetic tree: the fraction of branch length leading to taxa found in only one sample. Swapping a taxon for a close relative costs little; swapping it for a distant one costs a lot. Weighted UniFrac also accounts for abundance.'}];
let divSel=0;
function treeDraw(x,y,w,h){const lx=i=>x+w,ly=i=>y+i*(h/5);
  const X=l=>x+l*(w/3);
  let s='';const C='#6A5B47';
  const node=(L,d)=>[X(d),L.reduce((a,i)=>a+ly(i),0)/L.length];
  const n1=node([0,1],1),n2=node([2,3],1),n3=node([4,5],2), rt=[x,(n1[1]+n2[1]+n3[1])/3];
  const br=(a,b,c)=>`<path d="M${FX(a[0])} ${FX(a[1])} V${FX(b[1])} H${FX(b[0])}" stroke="${c||C}" stroke-width="${c?2.6:1.4}" fill="none"/>`;
  s+=br(rt,n1)+br(rt,n2)+br(rt,n3,'#A4473A');
  [[n1,0],[n1,1],[n2,2],[n2,3],[n3,4],[n3,5]].forEach(([p,i])=>{s+=br(p,[X(3),ly(i)],i>3?'#A4473A':null)+`<circle cx="${FX(X(3)+6)}" cy="${FX(ly(i))}" r="4" fill="${SPC[i]}" stroke="${INK}" stroke-width=".5"/>`;});
  return s;}
function scE3(n){
  const d=DIV[divSel];
  let s='';
  const r=n?62:66, ay=n?84:100, ax=n?90:96, bx=n?270:262;
  s+=G('a-fade',0,`<circle cx="${ax}" cy="${ay}" r="${r}" fill="#EFE6D2" stroke="${INK}"/>`+dotCloud(ax,ay,r,CA,21)+T(ax,ay+r+18,'sample A','cname mid f14')
    +`<circle cx="${bx}" cy="${ay}" r="${r}" fill="#EFE6D2" stroke="${INK}"/>`+dotCloud(bx,ay,r,CB,22)+T(bx,ay+r+18,'sample B','cname mid f14'));
  s+=G('a-fade',.2,T(ax,ay+r+36,'4 taxa, even','note mid f12')+T(bx,ay+r+36,'6 taxa, one dominant','note mid f12'));
  const tx=n?16:370; let ty=n?ay+r+76:40;
  s+=G('a-fade',.3,T(tx,ty,d.k,'cname start f16')+T(tx,ty+20,d.ty==='alpha'?'alpha diversity: within one sample':'beta diversity: between samples','mono acc start f12'));
  ty+=46;
  s+=G('a-fade',.45,T(tx,ty,d.f,'mono start '+(n?'f12':(d.f.length>30?'f11':'f12'))));
  ty+=26;
  d.v().forEach((v,i)=>{s+=G('a-fade',(.6+i*.1).toFixed(2),Tc(tx+i*(n?120:120),ty,v,'#A4473A',15,'mono start','600'));});
  ty+=16;
  if(d.k==='UniFrac'){const th=90;s+=G('a-fade',.7,treeDraw(tx+4,ty+8,n?140:150,th)+T(tx+(n?170:180),ty+30,'red branches','note start f11')+T(tx+(n?170:180),ty+44,'lead only to taxa','note start f11')+T(tx+(n?170:180),ty+58,'unique to B','note start f11'));ty+=th+20;}
  const p=para(n?16:tx,ty+12,d.t,n?50:36,'note start f13',17,.8);
  const H=n?p.y+6:Math.max(p.y+8,ay+r+50);
  return {vb:n?slim(H):wide(H),s:s+p.s};
}
function scE4(n){
  const A=n?axes(58,36,270,160,{xr:[0,20000],yr:[0,320],xt:[[0,'0'],[5000,'5k'],[10000,'10k'],[20000,'20k']],yt:[[0,'0'],[100,'100'],[200,'200'],[300,'300']],xlab:'reads sampled',ylab:'taxa observed',ydx:34})
    :axes(74,40,300,200,{xr:[0,20000],yr:[0,320],xt:[[0,'0'],[5000,'5000'],[10000,'10 000'],[20000,'20 000']],yt:[[0,'0'],[100,'100'],[200,'200'],[300,'300']],xlab:'reads sampled',ylab:'taxa observed',ydx:34});
  const c1=x=>300*(1-Math.exp(-x/5000)), c2=x=>200*(1-Math.exp(-x/1600));
  let s=A.s+G('a-fade',.3,curve(A,c1,{col:'#2F5276',to:18000})+curve(A,c2,{col:'#C17A2C',to:6000})
    +`<circle cx="${FX(A.px(18000))}" cy="${FX(A.py(c1(18000)))}" r="4" fill="#2F5276"/><circle cx="${FX(A.px(6000))}" cy="${FX(A.py(c2(6000)))}" r="4" fill="#C17A2C"/>`);
  s+=G('a-fade',.6,ln(FX(A.px(5000)),A.y+6,FX(A.px(5000)),A.y+A.h,'#A4473A',1.2,'4 3')+T(FX(A.px(5000)+5),A.y+14,'rarefy to 5000','note start f11 halo')
    +T(FX(A.px(17500)),FX(A.py(c1(18000))+20),'sample 1 (deep)','note end f11 halo')+T(FX(A.px(6400)),FX(A.py(c2(6000))+24),'sample 2 (shallow)','note start f11 halo'));
  const items=[['Why rarefy','Samples are sequenced to very different depths, and deeper samples find more taxa. Rarefaction subsamples every sample to the same number of reads before comparing diversity.'],['The pitfalls','It throws away data and adds random noise. McMurdie and Holmes (2014) showed that rarefying counts before testing which taxa differ loses power and inflates false positives, and recommended statistical models of the counts instead.'],['Still useful','Rarefaction curves show whether sampling is near saturation, and subsampling remains a common, defensible way to compare alpha and beta diversity when depths differ.']];
  const b=n?bullets(24,A.y+A.h+64,items,44,{d0:.9,gap:20}):bullets(410,52,items,28,{d0:.9,gap:16});
  const H=n?b.y-4:Math.max(b.y-4,A.y+A.h+50);
  return {vb:n?slim(H):wide(H),s:s+b.s};
}
function scE5(n){
  const N=n?{b:{x:84,y:40,w:140,t:'butyrate'},sy:{x:84,y:130,w:150,t:'Syntrophomonas',f:PAL.green},ah:{x:84,y:220,w:128,t:'acetate + H₂',f:PAL.gold},me:{x:276,y:220,w:120,t:'methanogen',f:PAL.blue},ch:{x:270,y:310,w:140,t:'CH₄ + CO₂'}}
    :{b:{x:80,y:60,w:110,t:'butyrate'},sy:{x:240,y:60,w:140,t:'Syntrophomonas',f:PAL.green},ah:{x:420,y:60,w:130,t:'acetate + H₂',f:PAL.gold},me:{x:420,y:170,w:130,t:'methanogens',f:PAL.blue},ch:{x:240,y:170,w:130,t:'CH₄ + CO₂'}};
  const E=n?[['b','sy',''],['sy','ah',''],['ah','me','H₂ removed',{side:1}],['me','ch',''],['me','sy','',{dash:'4 3',red:1,bend:40}]]
    :[['b','sy',''],['sy','ah',''],['ah','me','H₂ removed',{side:-1}],['me','ch',''],['me','sy','',{dash:'4 3',red:1,bend:30}]];
  let s=G('a-fade',0,flow(N,E))+G('a-fade',.4,n?T(250,138,'keeps H₂ low','note start f11 halo'):T(330,138,'keeps H₂ very low','note end f11 halo'));
  const rows=[['Syntrophy (+/+)','partners together do what neither can alone; thermodynamically coupled'],['Cross-feeding (+/0 or +/+)','one excretes what another uses: in the gut, acetate from bifidobacteria feeds butyrate producers'],['Competition (−/−)','for the same nutrients (exploitative), or by attacking rivals with bacteriocins, antibiotics and type VI secretion (interference)'],['Predation, parasitism (+/−)','protists, Bdellovibrio and phages kill bacteria (next plates)']];
  const t=wtable(n,['Interaction','What happens'],rows,n?[[10,16],[130,30]]:[[24,26],[230,58]],{y0:n?370:240,d0:.8,R:n?354:620});
  const p=para(n?16:24,t.y+12,'Oxidising butyrate to acetate and H₂ yields no energy at standard conditions. It becomes favourable only when methanogens keep hydrogen below about 10 Pa, so the two organisms share a thin energy margin and must live close together.',n?50:92,'note start f13',17,1.2);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:s+t.s+p.s};
}
function scE6(n){
  const R=n?104:118, cx=n?180:190, cy=n?150:170;
  const it=[{t:n?'attack|phase':'attack phase:|fast swimmer',w:n?84:124,f:PAL.green},{t:n?'attaches|to prey':'attaches to|Gram-negative prey',w:n?96:140},{t:n?'enters|periplasm':'enters the|periplasm',w:n?96:104,f:PAL.gold},{t:n?'bdelloplast|grows':'bdelloplast:|grows as filament',w:n?104:136,f:PAL.gold},{t:n?'divides':'divides into|progeny',w:n?80:104},{t:n?'prey lyses,|release':'prey lyses,|progeny released',w:n?100:134,f:PAL.rose}];
  let s=G('a-fade',0,cycle(cx,cy,R,it,{}));
  s+=G('a-fade',.6,rodCell2(cx,cy,46,12,{fill:'#E4E8D4'})+coccus(cx-12,cy,5,{fill:'#8C6D46'})+T(cx,cy+30,'Bdellovibrio','note mid f11'));
  const items=[['Bdellovibrio','Discovered by Stolp and Petzold in 1962, these small vibrios hunt other Gram-negative bacteria, growing inside the prey’s periplasm. They are being explored as living antibiotics.'],['Protist grazers','Flagellates and ciliates eat a large share of bacterial production in water and soil. They prefer certain sizes, so bacteria escape by forming filaments, aggregates or biofilms, or by being very small or fast.'],['Training grounds','Some bacteria survive being eaten: Legionella multiplies inside amoebae, and the same tricks later let it grow in human macrophages.']];
  const b=n?bullets(24,cy+R+74,items,44,{d0:1,gap:20}):bullets(398,52,items,30,{d0:1,gap:16});
  const H=n?b.y-4:Math.max(b.y-4,cy+R+56);
  return {vb:n?slim(H):wide(H),s:s+b.s};
}
function scE7(n){
  const N=n?{ph:{x:100,y:40,w:150,t:'phytoplankton'},zo:{x:260,y:150,w:150,t:'zooplankton,|fish'},dm:{x:100,y:150,w:130,t:'dissolved|organic matter',f:PAL.gold},ba:{x:80,y:270,w:110,t:'bacteria',f:PAL.green},pr:{x:280,y:270,w:110,t:'protists',f:PAL.blue}}
    :{ph:{x:90,y:50,w:140,t:'phytoplankton'},zo:{x:520,y:50,w:150,t:'zooplankton, fish'},dm:{x:90,y:190,w:140,t:'dissolved|organic matter',f:PAL.gold},ba:{x:310,y:190,w:110,t:'bacteria',f:PAL.green},pr:{x:520,y:190,w:110,t:'protists',f:PAL.blue}};
  const E=n?[['ph','zo','grazing',{side:-1}],['ph','dm','exudation',{side:-1}],['dm','ba','uptake',{side:-1,bend:-24}],['ba','dm','viral lysis',{red:1,dash:'4 3',bend:-24,side:-1}],['ba','pr','grazing',{side:-1}],['pr','zo','',{}]]
    :[['ph','zo','grazing'],['ph','dm','exudation, lysis',{side:-1}],['dm','ba','uptake',{bend:-22}],['ba','dm','viral lysis',{red:1,dash:'4 3',bend:-22}],['ba','pr','grazing'],['pr','zo','',{}]];
  let s=G('a-fade',0,flow(N,E));
  const by=n?340:270;
  const b=bullets(n?24:30,by,[['Abundant and lethal','Surface seawater holds about ten million virus particles per mL, roughly ten for every bacterium. Viral lysis is estimated to kill 20–40% of marine bacteria each day.'],['The viral shunt','Lysis returns cell contents to the dissolved pool, where other bacteria take them up, instead of passing carbon up the food chain to grazers (Wilhelm and Suttle, 1999).'],['Kill the winner','Lytic phages multiply fastest on the most abundant host, so whoever wins the competition for nutrients is cut back. This keeps many host strains coexisting (Thingstad and colleagues). At high host density, temperate phages may instead favour lysogeny.']],n?44:88,{d0:1,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
const MB=[
 {k:'Human gut',rows:[['How many','About 40 trillion bacteria in an adult, similar to the number of human cells (Sender, Fuchs and Milo, 2016), mostly in the colon.'],['Who','Mainly strict anaerobes of the Bacillota (Firmicutes) and Bacteroidota, with Actinomycetota such as bifidobacteria; composition differs a lot between people.'],['What they do','Ferment dietary fibre to short-chain fatty acids (butyrate fuels the colon lining), transform bile acids and drugs, make vitamins, and block pathogens (colonisation resistance).']],note:'Antibiotics can wipe out colonisation resistance: Clostridioides difficile infection follows, and faecal microbiota transplantation cures most recurrent cases.'},
 {k:'Soil',rows:[['How many','Up to about a billion cells per gram, of thousands of taxa; most cannot yet be cultured and many are dormant at any time.'],['Who','Acidobacteriota, Actinomycetota, Pseudomonadota, Verrucomicrobiota and many archaea, plus fungi and protists.'],['What they do','Decompose organic matter, drive the nitrogen cycle (fixation, nitrification, denitrification) and make many of our antibiotics.']],note:'Across continents, soil pH predicts bacterial community composition better than temperature or plant cover.'},
 {k:'Ocean',rows:[['How many','About a million bacterial and archaeal cells per mL of surface seawater, and ten times as many viruses.'],['Who','SAR11 (Pelagibacter) is probably the most abundant organism on Earth; the cyanobacterium Prochlorococcus is the most abundant photosynthetic organism.'],['What they do','Marine microbes carry out about half of global primary production and recycle most of it within days.']],note:'The Tara Oceans survey (2015) found that temperature was the main driver of community composition in sunlit surface waters.'},
 {k:'Plant roots',rows:[['How many','The rhizosphere is far richer in cells than the bulk soil around it, because roots release a substantial part of the plant’s fixed carbon as exudates.'],['Who','Pseudomonas, Bacillus, Streptomyces and many others; rhizobia in root nodules of legumes; mycorrhizal fungi on most plants.'],['What they do','Fix nitrogen, mobilise phosphate, make plant hormones and protect against pathogens.']],note:'In disease-suppressive soils, such as those showing take-all decline of wheat, root-associated Pseudomonas that make the antifungal 2,4-diacetylphloroglucinol protect the crop.'},
 {k:'Animal partners',rows:[['Bobtail squid','Vibrio fischeri colonises the light organ of the Hawaiian bobtail squid and glows by quorum sensing; the squid expels most of them each dawn and the rest regrow.'],['Aphids','Buchnera aphidicola lives inside aphid cells, supplies essential amino acids missing from sap, has a genome of about 640 kb, and has been passed from mother to offspring for over 150 million years.'],['Cows, termites','Microbial fermentation of cellulose in the rumen or termite gut feeds the animal with short-chain fatty acids.']],note:'Long-term inherited symbionts tend to lose genes and evolve small genomes, because they live in a stable host and pass through tight bottlenecks.'}];
let mbSel=0;
function scE8(n){const m=MB[mbSel];return explorer(n,{h:m.k,rows:m.rows,note:m.note},{y:34});}
function scE9(n){
  const N=n?{d:{x:90,y:40,w:150,t:'type 2 diabetes'},m:{x:270,y:110,w:120,t:'metformin',f:PAL.gold},g:{x:90,y:180,w:150,t:'gut microbiome|shift',f:PAL.green}}
    :{d:{x:90,y:60,w:140,t:'type 2 diabetes'},m:{x:300,y:60,w:110,t:'metformin',f:PAL.gold},g:{x:200,y:170,w:150,t:'gut microbiome|shift',f:PAL.green}};
  const E=n?[['d','m','treated with',{side:1}],['m','g','alters',{side:1}],['d','g','causal?',{dash:'4 3',red:1,side:-1}]]
    :[['d','m','treated with'],['m','g','alters',{side:1}],['d','g','causal?',{dash:'4 3',red:1,side:-1}]];
  let s=G('a-fade',0,flow(N,E));
  const bx=n?60:420, by=n?250:40, bw=n?36:40, bh=n?100:120;
  const bar=(x,vals,lab,abs)=>{let y=by+bh, q='';const tot=vals.reduce((a,b)=>a+b,0), sc=abs?bh/120:bh/tot;vals.forEach((v,i)=>{const h=v*sc;y-=h;q+=`<rect x="${x}" y="${FX(y)}" width="${bw}" height="${FX(h)}" fill="${['#A4473A','#2F5276','#4F7A3F'][i]}" stroke="${INK}" stroke-width=".5"/>`;});return q+T(x+bw/2,by+bh+16,lab,'note mid f10');};
  s+=G('a-fade',.6,T(bx-4,by-8,'absolute','note start f11')+bar(bx,[20,20,20],'day 1',1)+bar(bx+bw+10,[80,20,20],'day 2',1)
    +T(bx+2*bw+40,by-8,'relative','note start f11')+bar(bx+2*bw+44,[20,20,20],'day 1',0)+bar(bx+3*bw+54,[80,20,20],'day 2',0));
  s+=G('a-fade',.8,T(bx+2*bw+44+bw+5,by+bh+34,'blue looks halved','note mid f11'));
  const items=[['Compositional data','Sequencing gives proportions, not counts. If one taxon blooms, all others appear to fall even when unchanged (right), producing spurious correlations. Log-ratio methods or absolute counts help.'],['Confounders','Metformin explained much of the gut signature once attributed to type 2 diabetes (Forslund and colleagues, 2015). Diet, other drugs, age, alcohol and stool consistency all shift the microbiome.'],['Reverse causation','Disease changes the gut: inflammation supplies respiratory electron acceptors that favour Enterobacteriaceae, so a bloom can be a consequence rather than a cause.'],['Testing causes','Germ-free mice given human microbiota can transfer traits such as adiposity (Ridaura and colleagues, 2013), but such experiments are easy to over-interpret. Strains, mechanisms and human interventions are stronger evidence.']];
  const c=cards(n,items,{y:n?by+bh+40:Math.max(by+bh+44,230),num:1,cw:6.5});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:s+c.s};
}
const S=[
 {p:1,title:'Microbes in their places',draw:scE1,text:"Microbial ecology asks why particular microbes live in particular places and how they interact. The same questions as in plant and animal ecology apply, but microbes are tiny, numerous, fast-evolving, and mostly known only from their DNA, which brings its own methods and its own traps."},
 {p:1,title:'How communities assemble',draw:scE2,text:"Mark Vellend proposed that four processes shape every ecological community: selection, drift, dispersal and diversification. A local microbial community is what is left of the regional pool after cells arrive, the environment and neighbours sort them, and chance and evolution do the rest."},
 {p:1,title:'Measuring diversity',chips:'div',draw:scE3,text:"Alpha diversity describes one sample; beta diversity compares samples. Richness, evenness and phylogenetic relatedness are different things, and each metric weights them differently. Pick a metric to see how it scores the two toy communities. The values are computed from the dots shown."},
 {p:1,title:'Rarefaction and its pitfalls',draw:scE4,text:"The more reads you sequence, the more taxa you find, so samples sequenced to different depths cannot be compared directly. Rarefying, randomly subsampling to equal depth, is the classic fix. It is convenient but wasteful, and for testing which taxa differ between groups it is statistically unsound."},
 {p:2,title:'Syntrophy, cross-feeding and competition',draw:scE5,text:"Microbes interact in every way that animals and plants do. Syntrophy is the most microbial: two organisms jointly carry out a reaction that neither can run alone, as when fatty-acid oxidisers depend on methanogens to remove hydrogen in anaerobic digesters and sediments."},
 {p:2,title:'Predators',draw:scE6,text:"Bacteria are eaten as well as infected. Protists graze on them in every habitat, and the bacterium Bdellovibrio preys on other bacteria by invading them, consuming them from within and bursting out as several new cells."},
 {p:2,title:'Phage ecology',draw:scE7,text:"Viruses are the most numerous biological entities in the sea. By killing bacteria and phytoplankton they divert carbon away from grazers and back into the dissolved pool, and by attacking whichever host is commonest they help maintain diversity."},
 {p:3,title:'Microbiomes',chips:'mb',draw:scE8,text:"A microbiome is the community of microbes in a defined habitat, from a human colon to a gram of soil or an insect's cells. Pick one to see how many microbes live there, who they are, and what they do for the habitat and its host."},
 {p:3,title:'Correlation and causation',draw:scE9,text:"Microbiome studies find many differences between sick and healthy people, but differences are not causes. Proportional data, drugs and diet, and effects of the disease itself can all produce associations. Establishing causation needs experiments, from germ-free animals to human trials."}];
const CHIPS={div:{list:DIV.map(d=>d.k),get:()=>divSel,set:k=>divSel=k},mb:{list:MB.map(m=>m.k),get:()=>mbSel,set:k=>mbSel=k}};
