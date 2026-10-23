/*META
{"title":"Viruses","eyebrow":"Virology · an animated primer","h1":"What viruses are and how they replicate","parts":["Particles","Classes","Replication","Evolution"],"foot":"Classifications and mutation rates are typical values that vary between families; figures are rounded. Bacteriophages are treated in the Bacteriophages primer and only mentioned here.","description":"What a virus is, capsid symmetry and envelopes, the Baltimore classification, the replication cycle, replication strategies, and viral evolution and zoonotic emergence."}
META*/
const BALT=[
 {k:'I · dsDNA',g:'double-stranded DNA',m:'host RNA polymerase II reads the DNA directly in the nucleus (poxviruses carry their own in the cytoplasm)',ex:'herpesviruses, adenoviruses, papillomaviruses, poxviruses',enz:'host RNA polymerase (poxviruses: own)',note:'The most "cell-like" strategy. Many are large and encode their own DNA-handling enzymes.'},
 {k:'II · ssDNA',g:'single-stranded DNA',m:'the strand is first copied to double-stranded DNA, which host polymerase then transcribes',ex:'parvoviruses (B19, adeno-associated virus)',enz:'host DNA and RNA polymerases',note:'Small, simple genomes; parvoviruses depend heavily on the host and often on a helper virus.'},
 {k:'III · dsRNA',g:'double-stranded RNA, usually segmented',m:'a viral RNA-dependent RNA polymerase packaged in the particle copies mRNA from the negative strand inside a sub-particle',ex:'reoviruses, rotavirus (childhood diarrhoea)',enz:'viral RdRp (brought in)',note:'The cell has no way to read dsRNA, so the enzyme must travel inside the virion.'},
 {k:'IV · (+)ssRNA',g:'positive-sense single-stranded RNA',m:'the genome IS mRNA: ribosomes translate it on entry, making the polymerase that then copies the genome',ex:'picornaviruses (polio, rhinovirus), coronaviruses (SARS-CoV-2), flaviviruses (dengue, Zika)',enz:'viral RdRp (made after entry)',note:'The largest RNA class. The bare genome is infectious on its own.'},
 {k:'V · (−)ssRNA',g:'negative-sense single-stranded RNA',m:'a packaged viral polymerase first transcribes the genome into mRNA; only then can proteins be made',ex:'rhabdoviruses (rabies), paramyxoviruses (measles), filoviruses (Ebola), influenza (segmented)',enz:'viral RdRp (brought in)',note:'Like class III, the enzyme must be carried in. Influenza’s segmented genome lets strains reassort.'},
 {k:'VI · ssRNA-RT',g:'positive-sense RNA, replicated through DNA',m:'reverse transcriptase copies the RNA to DNA, which integrates into the host genome and is transcribed as a host gene',ex:'retroviruses: HIV, HTLV, many tumour viruses',enz:'reverse transcriptase + integrase',note:'Integration makes the infection permanent and is why HIV cannot be cleared.'},
 {k:'VII · dsDNA-RT',g:'DNA genome, replicated through RNA',m:'the DNA is transcribed to an RNA pregenome, which reverse transcriptase copies back into the DNA genome',ex:'hepadnaviruses: hepatitis B virus',enz:'reverse transcriptase',note:'A DNA virus that still uses reverse transcription, which is why some HIV drugs also treat hepatitis B.'}];
let baltSel=3;
function icosa(cx,cy,r){let p='';for(let i=0;i<6;i++){const a=(-90+i*60)*Math.PI/180;p+=(i?'L':'M')+FX(cx+r*Math.cos(a))+' '+FX(cy+r*Math.sin(a));}p+='Z';
  const inner=`M${FX(cx)} ${FX(cy-r)} L${FX(cx+r*.5)} ${FX(cy+r*.29)} L${FX(cx-r*.5)} ${FX(cy+r*.29)} Z M${FX(cx)} ${FX(cy+r*.58)} L${FX(cx-r*.87)} ${FX(cy-r*.5)} M${FX(cx)} ${FX(cy+r*.58)} L${FX(cx+r*.87)} ${FX(cy-r*.5)}`;
  return `<path d="${p}" fill="${PAL.blue}" stroke="${INK}" stroke-width="1.4" class="tint"/><path d="${inner}" stroke="${INK}" stroke-width=".7" fill="none" opacity=".5"/>`;}
function helical(cx,cy,R){let s=`<rect x="${cx-R}" y="${cy-9}" width="${2*R}" height="18" rx="9" fill="${PAL.gold}" stroke="${INK}" stroke-width="1.2" class="tint"/>`;
  for(let x=cx-R+5;x<cx+R;x+=6)s+=ln(FX(x),cy-9,FX(x),cy+9,INK,.6,'');
  s+=`<path d="M${cx-R} ${cy} H${cx+R}" stroke="${RNAC}" stroke-width="1.6" fill="none" opacity=".8"/>`;return s;}
function complexPhage(cx,cy){return `<path d="M${cx} ${cy-26} l16 9 v18 l-16 9 l-16 -9 v-18 Z" fill="${PAL.lilac}" stroke="${INK}" stroke-width="1.2" class="tint"/>`
  +`<rect x="${cx-3}" y="${cy+10}" width="6" height="18" fill="${PAL.lilac}" stroke="${INK}" stroke-width="1" class="tint"/>`
  +[-7,0,7].map(d=>ln(cx+d,cy+28,cx+d*1.6,cy+36,INK,1)).join('');}
function enveloped(cx,cy,r){let s=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${PAL.rose}" stroke="${INK}" stroke-width="1.3" class="tint"/>`;
  for(let i=0;i<12;i++){const a=i*30*Math.PI/180,x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);s+=ln(FX(x),FX(y),FX(cx+(r+7)*Math.cos(a)),FX(cy+(r+7)*Math.sin(a)),INK,1)+`<circle cx="${FX(cx+(r+8)*Math.cos(a))}" cy="${FX(cy+(r+8)*Math.sin(a))}" r="2.3" fill="${PAL.teal}" stroke="${INK}" stroke-width=".6"/>`;}
  s+=`<circle cx="${cx}" cy="${cy}" r="${r*.5}" fill="${PAL.gold}" stroke="${INK}" stroke-width=".8" opacity=".8"/>`;return s;}
function scV1(n){return introPlate(n,{q:'Is a virus alive, and how can something with a few genes hijack a whole cell?',
  belief:'A virus is a packet of genes, DNA or RNA, wrapped in protein and sometimes a stolen piece of membrane. It carries no ribosomes and makes no ATP, so outside a cell it does nothing. Inside one, it turns the cell’s own machinery to copying itself. How it makes its messenger RNA defines its whole life cycle.',
  items:['Capsids, symmetry and envelopes','The Baltimore classification (I–VII)','The replication cycle','Polymerases, reverse transcription, segments','Error rates and quasispecies','Antigenic shift and drift','Zoonotic spillover'],
  art:(cx,cy)=>enveloped(cx,cy,26)+T(cx,cy+48,'an enveloped virion','note mid f11'),artH:150});}
function scV2(n){
  const cy=n?64:70;
  const xs=n?[64,152,240,312]:[110,250,400,540];
  let s=G('a-fade',0,icosa(xs[0],cy,26)+T(xs[0],cy+44,'icosahedral','note mid f11')
    +helical(xs[1],cy,n?36:46)+T(xs[1],cy+44,'helical','note mid f11')
    +complexPhage(xs[2],cy)+T(xs[2],cy+52,'complex','note mid f11')
    +enveloped(xs[3],cy,n?18:22)+T(xs[3],cy+48,'enveloped','note mid f11'));
  const b=bullets(n?24:30,n?150:150,[
    ['The capsid','A shell of many copies of a few protein subunits, which saves genome space. Nearly all capsids are either icosahedral (a near-spherical cage, like poliovirus) or helical (a rod or coil wound round the genome, like tobacco mosaic virus and rabies). Poxviruses are "complex".'],
    ['The nucleocapsid and envelope','Capsid plus genome is the nucleocapsid. Many animal viruses wrap this in an envelope of host membrane, studded with viral glycoprotein spikes (influenza haemagglutinin, HIV Env, coronavirus spike) that bind the next cell.'],
    ['Enveloped versus naked','Enveloped viruses enter by membrane fusion and are fragile, needing close contact or droplets. Naked capsids (noroviruses, rhinoviruses) resist drying, acid and detergents, so they spread on surfaces and through the gut.']],
    n?44:82,{d0:.4,gap:22});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scV3(n){
  const c=BALT[baltSel];
  const ex=explorer(n,{h:'Baltimore class '+c.k,sub:c.g,
    rows:[['mRNA made by',c.m],['Examples',c.ex],['Key enzyme',c.enz]],note:c.note},{y:n?34:40});
  return ex;
}
function scV4(n){
  const N=n?{at:{x:180,y:34,w:200,t:'attachment|(receptor binding)'},en:{x:180,y:104,w:200,t:'entry and uncoating',f:PAL.blue},
     ge:{x:180,y:176,w:220,t:'genome replication|and gene expression',f:PAL.gold},as:{x:180,y:250,w:200,t:'assembly',f:PAL.green},
     ma:{x:90,y:322,w:140,t:'maturation',f:PAL.lilac},re:{x:270,y:322,w:150,t:'release:|lysis or budding',f:PAL.rose}}
   :{at:{x:110,y:70,w:150,t:'attachment|receptor binding'},en:{x:300,y:70,w:150,t:'entry and|uncoating',f:PAL.blue},
     ge:{x:500,y:70,w:150,t:'replication and|gene expression',f:PAL.gold},as:{x:500,y:200,w:150,t:'assembly',f:PAL.green},
     ma:{x:300,y:200,w:150,t:'maturation',f:PAL.lilac},re:{x:110,y:200,w:150,t:'release:|lysis or budding',f:PAL.rose}};
  const E=n?[['at','en',''],['en','ge',''],['ge','as',''],['as','ma',''],['as','re','',{side:-1}]]
    :[['at','en',''],['en','ge',''],['ge','as',''],['as','ma',''],['ma','re','',{side:1}]];
  let s=G('a-fade',0,flow(N,E));
  const b=bullets(n?24:30,n?400:300,[
    ['Attachment is specific','A viral protein binds a particular host molecule: HIV binds CD4 plus a chemokine co-receptor, SARS-CoV-2 binds ACE2. This tropism decides which cells, and which hosts, a virus can infect.'],
    ['Making messenger RNA is the pivot','Whatever the genome, it must be turned into mRNA the ribosome can read. The Baltimore class is simply the route a virus takes to that mRNA.'],
    ['Release','Naked viruses usually burst the cell; enveloped ones bud through a membrane, taking a wrapper with them. Budding can let the cell survive and shed virus for a long time.']],
    n?44:82,{d0:.6,gap:22});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,330)),s:s+b.s};
}
function scV5(n){
  const items=[
   ['RNA-dependent RNA polymerase','Cells never copy RNA from RNA, so RNA viruses must encode their own RdRp. It has no proofreading, which is the root of their high mutation rate. It is a prime drug target: remdesivir and molnupiravir attack the coronavirus RdRp.'],
   ['Reverse transcription','Retroviruses (class VI) and hepadnaviruses (class VII) copy RNA back into DNA with reverse transcriptase, discovered by Temin and Baltimore in 1970. Retroviral DNA integrates into the host chromosome; most anti-HIV drugs block this enzyme or integration.'],
   ['Segmented genomes','Some viruses split their genome into separate pieces (influenza has eight, rotavirus eleven). When two strains infect one cell, segments can be repackaged in new combinations, a fast route to novelty called reassortment.'],
   ['Where replication happens','DNA viruses mostly replicate in the nucleus and borrow its polymerases; influenza is the exception. RNA viruses mostly stay in the cytoplasm, often in membrane-bound "factories" that hide their RNA from host sensors.']];
  const c=cards(n,items,{y:20});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scV6(n){
  const A=n?axes(58,36,268,150,{xr:[2,10],yr:[-9,-3],logx:0,xt:[[3,'DNA'],[9,'RNA']],yt:[[-4,'high'],[-8,'low']],xlab:'genome type',ylab:'error rate'})
    :axes(72,40,300,160,{xr:[2,10],yr:[-9,-3],xt:[[3,'DNA pol'],[9,'RNA pol'],[6,'reverse transcr.']],yt:[[-4,'high'],[-8,'low']],xlab:'polymerase (less to more error-prone)',ylab:'mutation rate'});
  const pts=[[3,-8.2,'herpes (DNA)'],[6,-5.2,'HIV (RT)'],[9,-4.1,'influenza, SARS-CoV-2 (RNA)']];
  let s=A.s;
  s+=G('a-fade',.3,pts.map(p=>`<circle cx="${FX(A.px(p[0]))}" cy="${FX(A.py(p[1]))}" r="4.5" fill="${PAL.rose}" stroke="${INK}" stroke-width="1"/>`).join('')
    +curve(A,x=>-9+(x-2)*(6/8),{col:'#2F5276',dash:'5 4'}));
  if(!n){const short=['herpes','HIV','influenza'];s+=G('a-fade',.5,pts.map((p,i)=>T(FX(A.px(p[0])),FX(A.py(p[1])+15),short[i],'note mid f10 halo')).join(''));}
  const b=bullets(n?24:400,n?A.y+A.h+54:52,[
    ['Quasispecies','An RNA virus does not exist as one sequence but as a swarm of related mutants around a consensus. Selection acts on the swarm, which is why resistance to a single drug appears so fast.'],
    ['Error catastrophe','The rate is near the limit: push it higher with a mutagenic drug such as molnupiravir and the population collapses under its own errors.'],
    ['Recombination','Polymerases can switch templates mid-copy, stitching two genomes together. This created some pandemic strains and complicates vaccine design for HIV and enteroviruses.']],
    n?44:34,{d0:.6,gap:20});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,A.y+A.h+50)),s:s+b.s};
}
function scV7(n){
  const N=n?{h3:{x:95,y:40,w:150,t:'human H3N2',f:PAL.blue},av:{x:265,y:40,w:150,t:'avian H5N1',f:PAL.green},
     co:{x:180,y:150,w:200,t:'co-infected pig or bird',f:PAL.gold},nw:{x:180,y:250,w:220,t:'new reassortant|(e.g. 2009 H1N1)',f:PAL.rose}}
   :{h3:{x:150,y:60,w:150,t:'human H3N2',f:PAL.blue},av:{x:150,y:150,w:150,t:'avian H5N1',f:PAL.green},
     co:{x:360,y:105,w:160,t:'co-infected host',f:PAL.gold},nw:{x:560,y:105,w:150,t:'new reassortant',f:PAL.rose}};
  const E=n?[['h3','co','',{side:1}],['av','co','',{side:-1}],['co','nw','segments mixed']]
    :[['h3','co','',{side:-1}],['av','co','',{side:1}],['co','nw','segments mixed']];
  let s=G('a-fade',0,flow(N,E));
  const b=bullets(n?24:30,n?330:230,[
    ['Drift: small, steady change','Point mutations in the surface proteins haemagglutinin and neuraminidase slowly change them until last year’s antibodies no longer fit. This is why the flu vaccine is reformulated every year.'],
    ['Shift: a sudden swap','When two influenza strains infect one cell, their segments reassort and a surface protein the population has never seen can appear at once. Such antigenic shifts caused the 1957, 1968 and 2009 pandemics.'],
    ['Why influenza is special','Only segmented viruses reassort this way. It makes influenza uniquely prone to pandemics, and makes pigs and birds important mixing vessels.']],
    n?44:82,{d0:.6,gap:22});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,250)),s:s+b.s};
}
function scV8(n){
  const rows=[
   ['HIV-1','chimpanzee SIV','bushmeat contact, c. 1920s','adapted fully to humans'],
   ['SARS-CoV-1','bats via civets','live-animal markets, 2002','contained, ~8000 cases'],
   ['SARS-CoV-2','bats (intermediate debated)','2019','ongoing pandemic'],
   ['MERS-CoV','bats via camels','2012','camel contact, limited spread'],
   ['Nipah','fruit bats via pigs/date palm sap','1998 onward','high fatality, little human spread'],
   ['Influenza','wild waterfowl','recurring','poultry and pigs as bridges'],
   ['Rabies','many mammals','ancient','near-100% fatal once symptomatic']];
  const t=wtable(n,['Virus','Reservoir','Spillover','Outcome'],rows,
    n?[[10,10],[96,12],[200,12],[290,10]]:[[24,14],[180,18],[330,20],[500,18]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+14,'Most new human viruses come from animals. Spillover needs a reservoir (often bats or birds, which tolerate many viruses), contact, and then adaptation to spread human-to-human. Bats carry many RNA viruses in part because their immune and metabolic biology limits the damage. Surveillance of reservoirs and interfaces is how the next spillover is caught early.',n?50:92,'note start f13',17,.6);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
const S=[
 {p:1,title:'What a virus is',draw:scV1,text:"A virus is genetic material in a protein coat, with no metabolism of its own. It replicates only by entering a cell and redirecting that cell’s machinery. The single most useful thing to know about any virus is how it turns its genome into messenger RNA, because everything else follows from that."},
 {p:1,title:'Capsids and envelopes',draw:scV2,text:"The genome is packed in a capsid built from repeated protein subunits, almost always with icosahedral or helical symmetry. Many animal viruses add an envelope of host membrane carrying viral spike proteins. Whether a virus is enveloped or naked shapes how it enters cells and how it spreads."},
 {p:2,title:'The Baltimore classification',chips:'balt',draw:scV3,text:"David Baltimore sorted all viruses into seven classes by how they reach messenger RNA, placing the (+)ssRNA genome, which is itself mRNA, at the centre. Pick a class to see how its mRNA is made, examples, and the key enzyme. Classes III and V must carry their own polymerase into the cell; classes VI and VII use reverse transcription."},
 {p:3,title:'The replication cycle',draw:scV4,text:"Every infection runs through the same steps: attachment to a specific receptor, entry and uncoating, replication of the genome and expression of its genes, assembly of new particles, maturation, and release. The details differ by class, but making mRNA is always the hinge on which the rest turns."},
 {p:3,title:'Replication strategies',draw:scV5,text:"Three tricks recur. RNA viruses encode an error-prone RNA-dependent RNA polymerase. Retroviruses and hepatitis B reverse-transcribe RNA into DNA. And some viruses carry segmented genomes that can be shuffled. Each is both a vulnerability and a drug target."},
 {p:4,title:'Error rates and quasispecies',draw:scV6,text:"RNA polymerases do not proofread, so RNA viruses mutate roughly a hundred thousand times faster than their hosts. A single infection is therefore a cloud of variants, a quasispecies, on which selection acts immediately. The same error rate also sets a limit that antiviral mutagens can push past."},
 {p:4,title:'Antigenic shift and drift',draw:scV7,text:"Influenza changes in two ways. Drift is the slow accumulation of point mutations in its surface proteins that erodes immunity year by year. Shift is the sudden reassortment of whole genome segments between strains, which can produce a pandemic virus the population has never met."},
 {p:4,title:'Zoonotic emergence',draw:scV8,text:"Most new human viruses spill over from animal reservoirs, often bats or birds, sometimes through an intermediate host. Spillover then has to be followed by adaptation to human-to-human spread. HIV, SARS-CoV-2 and Nipah all crossed this way, which is why watching the animal interface matters."}];
const CHIPS={balt:{list:BALT.map(b=>b.k),get:()=>baltSel,set:k=>baltSel=k}};
