/*META
{"title":"Antimicrobials and Resistance","eyebrow":"Antimicrobials · an animated primer","h1":"How antibiotics kill bacteria, and how bacteria escape","parts":["Targets","Resistance","Measuring activity","Using drugs well"],"foot":"Spectra, breakpoints and PK/PD targets are typical values and differ by organism, guideline and year: check current EUCAST or CLSI tables before using any number clinically. Ribosome-targeting drugs are covered in more depth in the translation primer and wall synthesis in the envelope primer.","description":"Selective toxicity, drug targets by class, resistance mechanisms and genes, MIC and breakpoints, synergy, tolerance and persistence, PK/PD indices, stewardship and the discovery pipeline."}
META*/
/* a rod-shaped bacterium with its drug targets; hl picks one to highlight in red */
function bact(cx,cy,L,R,hl){
  const W=hl==='wall', M=hl==='mem', r30=hl==='30S', r50=hl==='50S', NU=hl==='nuc', FO=hl==='fol';
  let s=`<rect x="${FX(cx-L/2)}" y="${FX(cy-R)}" width="${L}" height="${2*R}" rx="${R}" fill="#E4E8D4" stroke="${W?RED:INK}" stroke-width="${W?4.5:3}" class="tint"/>`;
  s+=`<rect x="${FX(cx-L/2+7)}" y="${FX(cy-R+7)}" width="${L-14}" height="${2*R-14}" rx="${R-7}" fill="none" stroke="${M?RED:'#B89A5E'}" stroke-width="${M?3:1.6}" ${M?'':'stroke-dasharray="5 3"'}/>`;
  const rib=[[-.3,-.38],[-.08,.42],[.32,.3],[.36,-.4]];
  rib.forEach(([a,b])=>{const x=cx+L*a,y=cy+R*b;
    s+=`<ellipse cx="${FX(x)}" cy="${FX(y-4)}" rx="9" ry="6" fill="${r50?RED:'#BBA27A'}" stroke="${INK}" stroke-width=".8"/><ellipse cx="${FX(x)}" cy="${FX(y+5)}" rx="7" ry="4" fill="${r30?RED:'#D9C89B'}" stroke="${INK}" stroke-width=".8"/>`;});
  s+=`<path d="M${FX(cx-L*.2)} ${FX(cy)} q${FX(L*.05)} ${FX(-R*.45)} ${FX(L*.1)} 0 t${FX(L*.1)} 0 t${FX(L*.1)} 0 t${FX(L*.1)} 0" stroke="${NU?RED:DNAC}" stroke-width="${NU?3:2.2}" fill="none"/>`;
  const hx=cx+L*.12, hy=cy-R*.5;
  const hex=(x,y)=>{let p='';for(let i=0;i<6;i++){const a=Math.PI/3*i;p+=(i?'L':'M')+FX(x+6*Math.cos(a))+' '+FX(y+6*Math.sin(a));}return `<path d="${p}Z" fill="${FO?RED:PAL.gold}" stroke="${INK}" stroke-width=".8"/>`;};
  s+=hex(hx,hy)+hex(hx+12,hy+3);
  return s;}
const TARG=[
 {k:'Cell wall',hl:'wall',lab:'peptidoglycan wall',cls:'β-lactams (penicillins, cephalosporins, carbapenems, monobactams); glycopeptides (vancomycin); fosfomycin',tg:'β-lactams acylate the penicillin-binding proteins (transpeptidases); glycopeptides cap the D-Ala-D-Ala end of lipid II; fosfomycin blocks MurA',fx:'bactericidal, but only to growing cells',sp:'β-lactams range from narrow to very broad; glycopeptides reach only Gram-positives because they cannot cross the outer membrane',note:'Peptidoglycan has no counterpart in human cells, which makes it the cleanest example of selective toxicity. The steps of wall synthesis are drawn in the envelope primer.'},
 {k:'Membrane',hl:'mem',lab:'cell membranes',cls:'polymyxins (colistin, polymyxin B); the lipopeptide daptomycin',tg:'polymyxins bind lipid A of LPS and disrupt both membranes; daptomycin inserts into Gram-positive membranes with calcium',fx:'bactericidal, rapidly',sp:'polymyxins: Gram-negatives only; daptomycin: Gram-positives only',note:'Membranes are shared with host cells, so membrane-active drugs are harder to make selective. Colistin is toxic to the kidney and kept as a last resort; daptomycin is inactivated by lung surfactant and so is not used for pneumonia.'},
 {k:'Ribosome 30S',hl:'30S',lab:'30S subunit',cls:'aminoglycosides (gentamicin, amikacin, streptomycin); tetracyclines (doxycycline, tigecycline)',tg:'aminoglycosides bind the decoding site of 16S rRNA and cause misreading; tetracyclines block aminoacyl-tRNA from the A site',fx:'aminoglycosides bactericidal; tetracyclines bacteriostatic',sp:'aminoglycosides: aerobic Gram-negatives and staphylococci (uptake needs the proton motive force, so anaerobes escape); tetracyclines: broad, including intracellular bacteria',note:'Bacterial 70S and human 80S ribosomes differ enough to be targeted separately. Binding sites and mechanisms are detailed in the translation primer.'},
 {k:'Ribosome 50S',hl:'50S',lab:'50S subunit',cls:'macrolides (erythromycin, azithromycin); lincosamides (clindamycin); chloramphenicol; oxazolidinones (linezolid); streptogramins; pleuromutilins',tg:'23S rRNA at the peptidyl transferase centre or the exit tunnel',fx:'mostly bacteriostatic',sp:'mainly Gram-positives and atypical bacteria; linezolid is used against MRSA and vancomycin-resistant enterococci',note:'Mitochondrial ribosomes resemble bacterial ones. This explains the bone-marrow toxicity of chloramphenicol and of long courses of linezolid.'},
 {k:'Nucleic acids',hl:'nuc',lab:'DNA and RNA synthesis',cls:'fluoroquinolones (ciprofloxacin, levofloxacin); rifamycins (rifampicin); nitroimidazoles (metronidazole)',tg:'quinolones trap DNA gyrase and topoisomerase IV on cut DNA; rifampicin blocks the RNA polymerase β subunit; metronidazole is activated to radicals that break DNA',fx:'bactericidal',sp:'quinolones: broad; rifampicin: mycobacteria and staphylococci, always in combination; metronidazole: anaerobes only, because only they reduce it',note:'Single mutations in gyrA, parC or rpoB raise the MIC, which is why rifampicin is never given alone and why quinolone resistance rose quickly.'},
 {k:'Folate',hl:'fol',lab:'folate synthesis',cls:'sulfonamides (sulfamethoxazole); trimethoprim; together as co-trimoxazole',tg:'sulfonamides mimic PABA and inhibit dihydropteroate synthase; trimethoprim inhibits dihydrofolate reductase',fx:'each bacteriostatic; the pair often bactericidal',sp:'broad; urinary tract infections, Pneumocystis pneumonia',note:'Humans take folate from the diet and have no dihydropteroate synthase. Trimethoprim binds bacterial dihydrofolate reductase thousands of times more tightly than the human enzyme.'},
 {k:'Others',hl:'',lab:'specialised targets',cls:'nitrofurantoin; isoniazid and other anti-tuberculosis drugs; bedaquiline; fidaxomicin',tg:'nitrofurantoin: reactive intermediates hit many targets; isoniazid: mycolic acid synthesis (InhA), after activation by KatG; bedaquiline: the c ring of ATP synthase; fidaxomicin: RNA polymerase',fx:'varies by drug',sp:'deliberately narrow: urine, mycobacteria, Clostridioides difficile',note:'Narrow-spectrum drugs spare the gut microbiota. Fidaxomicin, which barely touches most gut anaerobes, gives fewer C. difficile relapses than vancomycin.'}];
let tgSel=0;
function scA1(n){return introPlate(n,{q:'How can a drug kill a bacterium inside a person without harming the person?',
  belief:'Antibiotics work by selective toxicity: they hit structures that bacteria have and human cells lack or make differently, such as peptidoglycan, the 70S ribosome, bacterial topoisomerases and folate synthesis. Bacteria answer with resistance, and the gap between the two is what the clinic measures and manages.',
  items:['Targets by drug class','Five ways to resist','Mutation versus acquired genes','MIC, breakpoints and synergy','Tolerance and persistence','PK/PD indices','Stewardship and the empty pipeline'],
  art:(cx,cy)=>bact(cx,cy-8,190,52,'')+T(cx,cy+66,'wall, membrane, ribosomes, DNA, folate','note mid f11'),artH:150});}
function scA2(n){
  const t=TARG[tgSel];
  const ex=explorer(n,{h:t.k,sub:'target: '+t.lab,rows:[['Drug classes',t.cls],['How they act',t.tg],['Effect',t.fx],['Spectrum',t.sp]],note:t.note,
    art:(cx,cy)=>bact(cx,cy,n?220:260,n?44:50,t.hl),artH:n?104:116},{y:20});
  return ex;
}
function resArt(cx,cy,n){
  const L=n?260:236, R=n?62:70;
  let s=rodCell2(cx,cy,L,R,{fill:'#E4E8D4',sw:3});
  s+=`<rect x="${FX(cx-L/2+7)}" y="${FX(cy-R+7)}" width="${L-14}" height="${2*R-14}" rx="${R-7}" fill="none" stroke="#B89A5E" stroke-width="1.6" stroke-dasharray="5 3"/>`;
  const drug=(x,y)=>`<circle cx="${FX(x)}" cy="${FX(y)}" r="4.5" fill="${RED}" stroke="${INK}" stroke-width=".7"/>`;
  // 1 enzyme destroys drug
  const ex=cx-L*.26, ey=cy+R*.22;
  s+=`<path d="M${FX(ex)} ${FX(ey)} l14 -8 a16 16 0 1 0 0 16 z" fill="${PAL.lilac}" stroke="${INK}" stroke-width="1"/>`+`<path d="M${FX(ex+20)} ${FX(ey-4)} l5 -3 m2 9 l5 2" stroke="${RED}" stroke-width="2.2"/>`+badge(ex-8,ey-26,1);
  // 2 altered target
  const tx=cx+L*.02, ty=cy-R*.25;
  s+=`<path d="M${FX(tx-14)} ${FX(ty-10)} h28 v20 h-28 z" fill="${PAL.blue}" stroke="${INK}" stroke-width="1"/><path d="M${FX(tx-5)} ${FX(ty-10)} l5 7 l5 -7" fill="#E4E8D4" stroke="${INK}" stroke-width="1"/>`+drug(tx+16,ty-18)+badge(tx-24,ty-14,2);
  // 3 efflux pump at right pole
  const px=cx+L/2-4;
  s+=`<rect x="${FX(px-9)}" y="${FX(cy-13)}" width="18" height="26" rx="4" fill="${PAL.teal}" stroke="${INK}" stroke-width="1"/>`+arw(px-34,cy,px+30,cy,{w:1.8,red:1})+drug(px-40,cy)+drug(px+38,cy)+badge(px+18,cy-26,3);
  // 4 porin loss at top
  const qx=cx-L*.12, qy=cy-R;
  s+=`<rect x="${FX(qx-7)}" y="${FX(qy-6)}" width="14" height="12" fill="${PAL.grey}" stroke="${INK}" stroke-width="1"/>`+drug(qx,qy-26)+`<path d="M${FX(qx-6)} ${FX(qy-17)} l12 0" stroke="${RED}" stroke-width="2.4"/>`+badge(qx-24,qy-20,4);
  // 5 bypass: blocked target plus an extra one that works
  const bx=cx+L*.16, by=cy+R*.36;
  s+=`<rect x="${FX(bx-12)}" y="${FX(by-8)}" width="24" height="16" rx="3" fill="${PAL.blue}" stroke="${INK}" stroke-width="1"/>`+drug(bx,by-12)+`<rect x="${FX(bx+18)}" y="${FX(by-8)}" width="24" height="16" rx="3" fill="${PAL.green}" stroke="${INK}" stroke-width="1"/>`+badge(bx-22,by+12,5);
  return s;}
function scA3(n){
  return artBullets(n,(cx,cy)=>resArt(cx,cy,n),260,200,[
   ['Inactivate the drug','β-lactamases hydrolyse the β-lactam ring; aminoglycoside-modifying enzymes add acetyl, phosphate or adenyl groups.'],
   ['Change the target','Mutated gyrase or RNA polymerase, methylated 23S rRNA (erm genes), or a wall precursor ending in D-Ala-D-Lac.'],
   ['Pump it out','Efflux pumps such as AcrAB–TolC in E. coli and MexAB–OprM in Pseudomonas expel many unrelated drugs.'],
   ['Keep it out','Losing or narrowing outer-membrane porins slows entry, adding to carbapenem resistance in Klebsiella and Pseudomonas.'],
   ['Bypass the target','A second enzyme takes over: PBP2a in MRSA, or a drug-insensitive dihydrofolate reductase for trimethoprim.']],{gap:16,wn:46,bx:310,by:40});
}
function scA4(n){
  const rows=[['Point mutations','gyrA, parC: quinolones; rpoB: rifampicin; 23S rRNA: macrolides, linezolid','chromosome; arise during treatment and pass to descendants'],
   ['ESBLs (CTX-M, TEM and SHV variants)','penicillins and third-generation cephalosporins','plasmids, mostly E. coli and Klebsiella'],
   ['Carbapenemases (KPC, NDM, OXA-48, VIM, IMP)','carbapenems and nearly all other β-lactams','plasmids; Enterobacterales, Acinetobacter, Pseudomonas'],
   ['mecA','PBP2a, a transpeptidase that β-lactams barely bind: MRSA','SCCmec cassette in the staphylococcal chromosome'],
   ['vanA','rebuilds the wall precursor to end in D-Ala-D-Lac, which binds vancomycin about 1000-fold less well','transposon Tn1546 on plasmids; enterococci, rarely S. aureus'],
   ['mcr-1','adds phosphoethanolamine to lipid A: colistin','plasmid, first reported from China in 2015']];
  const t=wtable(n,['Gene or change','Resists','Where it lives'],rows,n?[[10,13],[118,16],[240,15]]:[[24,22],[220,32],[440,24]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+12,'Mutations change what the cell already has and spread only vertically. Acquired genes arrive ready-made by conjugation, transformation or transduction, usually on plasmids, transposons and integrons that collect several resistance genes together, so one drug can select for resistance to many.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function scA5(n){
  const C=[.25,.5,1,2,4,8,16,32], sp=n?38:58, x0=n?30:60, by=n?110:118;
  let s=G('a-fade',0,T(n?16:24,24,'broth dilution, twofold steps (mg/L)','note start f12'));
  let tb='';C.forEach((c,i)=>{const x=x0+i*sp;tb+=tube(x,by,{w:n?16:20,h:n?62:70,turbid:c<4,full:.6,seed:i+2})+T(x,by+18,String(c),'mono mid f10');});
  s+=G('a-fade',.2,tb);
  const mx=x0+5*sp;
  s+=G('a-fade',.6,arw(mx,by+56,mx,by+26,{w:1.6,red:1})+T(mx,by+70,'MIC = 4 mg/L','mono mid f12 acc'));
  s+=G('a-fade',.4,T(x0+1.5*sp,by-(n?72:80),'growth (turbid)','note mid f11')+T(x0+5.5*sp,by-(n?72:80),'no growth (clear)','note mid f11'));
  const y2=by+100, bx=n?16:24, bw=n?328:592, kx=v=>bx+bw*(Math.log2(v)+2)/8;
  s+=G('a-fade',.9,T(bx,y2,'illustrative breakpoints','note start f12')+box(bx,y2+10,FX(kx(1)-bx),18,PAL.green,2)+box(FX(kx(1)),y2+10,FX(kx(4)-kx(1)),18,PAL.gold,2)+box(FX(kx(4)),y2+10,FX(bx+bw-kx(4)),18,PAL.rose,2)
    +T(FX((bx+kx(1))/2),y2+23,'S ≤ 1','mono mid f11')+T(FX((kx(1)+kx(4))/2),y2+23,'I','mono mid f11')+T(FX((kx(4)+bx+bw)/2),y2+23,'R > 4','mono mid f11'));
  const b=bullets(n?24:30,y2+64,[['Minimum inhibitory concentration','The lowest concentration that prevents visible growth overnight from a standard inoculum (about 500,000 cells per mL). Broth microdilution is the reference method; agar dilution, disc diffusion and gradient strips are calibrated against it.'],
   ['Breakpoints turn an MIC into advice','EUCAST in Europe and CLSI in the US set them from MIC distributions of wild-type strains, PK/PD targets and clinical outcomes. EUCAST’s I now means “susceptible, increased exposure”: use a higher dose.']],n?44:88,{d0:1.1,gap:20});
  return {vb:n?slim(b.y-6):wide(b.y-6),s:s+b.s};
}
function scA6(n){
  const F=[0,.0625,.125,.25,.5,1], lab=['0','1/16','1/8','1/4','1/2','1'], c=n?32:34, gx=n?78:90, gy=44;
  let g='';
  for(let i=0;i<6;i++)for(let j=0;j<6;j++){const fa=F[i], fb=F[5-j], inh=Math.sqrt(fa)+Math.sqrt(fb)>=1-1e-9, hi=(i===3&&5-j===3);
    g+=`<rect x="${gx+i*c}" y="${gy+j*c}" width="${c-3}" height="${c-3}" rx="4" fill="${inh?'#F3EEE2':TURB}" stroke="${hi?RED:INK}" stroke-width="${hi?2.4:.8}"/>`;}
  for(let i=0;i<6;i++)g+=T(gx+i*c+(c-3)/2,gy+6*c+12,lab[i],'mono mid f10');
  for(let j=0;j<6;j++)g+=T(gx-6,gy+j*c+(c-3)/2+4,lab[5-j],'mono end f10');
  g+=T(gx+3*c,gy+6*c+30,'drug A (× MIC alone)','note mid f12')+`<text transform="translate(${gx-42} ${gy+3*c}) rotate(-90)" class="note mid f12">drug B (× MIC alone)</text>`;
  let s=G('a-fade',0,g)+G('a-fade',.4,T(gx+6*c+4,gy+12,'turbid = growth','note start f11'));
  const fy=n?gy+6*c+60:gy+20, fx=n?16:330;
  s+=G('a-fade',.6,T(fx,fy+(n?0:30),'FIC index = A/MICA + B/MICB','mono start '+(n?'f12':'f13')));
  const items=[['Read the first clear well','The ringed well inhibits growth with a quarter of each drug’s MIC alone: FIC index 0.25 + 0.25 = 0.5.'],['Interpret','≤ 0.5 synergy; above 0.5 and up to 4 no interaction; > 4 antagonism.'],['Why it matters','A β-lactam damages the enterococcal wall and lets gentamicin in: the classic synergy behind endocarditis treatment.']];
  const b=n?bullets(24,fy+34,items,44,{d0:.8,gap:18}):bullets(346,fy+70,items,36,{d0:.8,gap:18});
  return {vb:n?slim(b.y-6):wide(Math.max(b.y-6,gy+6*c+44)),s:s+b.s};
}
function scA7(n){
  const A=n?axes(54,30,270,170,{xr:[0,24],yr:[2,9],xt:[[0,'0'],[6,'6'],[12,'12'],[18,'18'],[24,'24 h']],yt:[[3,'10³'],[5,'10⁵'],[7,'10⁷'],[9,'10⁹']],xlab:'time in drug',ylab:'CFU per mL'})
    :axes(70,30,320,190,{xr:[0,24],yr:[2,9],xt:[[0,'0'],[6,'6'],[12,'12'],[18,'18'],[24,'24 h']],yt:[[3,'10³'],[5,'10⁵'],[7,'10⁷'],[9,'10⁹']],xlab:'time in drug',ylab:'CFU per mL'});
  const res=t=>Math.min(8.8,7+t*.16), sus=t=>Math.max(2.2,7-t*.9), tol=t=>Math.max(2.2,7-t*.28), per=t=>Math.max(2.2,Math.log10(Math.pow(10,7)*(.999*Math.exp(-t*1.4)+.001*Math.exp(-t*.05))));
  let s=A.s+G('a-fade',.3,curve(A,res,{col:'#A4473A'})+curve(A,tol,{col:'#C17A2C',dash:'6 3'})+curve(A,per,{col:'#7D4A98'})+curve(A,sus,{col:'#2F5276',to:5.6}));
  s+=G('a-fade',.6,T(FX(A.px(14)),FX(A.py(res(14))-8),'resistant','note mid f11 halo')+T(FX(A.px(16)),FX(A.py(tol(16))+16),'tolerant','note start f11 halo')+T(FX(A.px(23)),FX(A.py(per(23))-8),'persisters','note end f11 halo')+T(FX(A.px(3.2)),FX(A.py(sus(3.2))+2),'susceptible','note end f11 halo'));
  const items=[['Resistance','The MIC rises, so the drug no longer stops growth at usable doses.'],['Tolerance','The MIC is unchanged but the whole population dies more slowly: the minimum duration for killing 99% (MDK99) is longer.'],['Persistence','Most cells die fast; a small dormant subpopulation dies slowly, giving a biphasic curve and a long MDK99.99. Regrown, persisters give a normal sensitive culture.']];
  const b=n?bullets(24,A.y+A.h+58,items,44,{d0:.9,gap:18}):bullets(420,48,items,28,{d0:.9,gap:18});
  const H=n?b.y-6:Math.max(b.y-6,A.y+A.h+46);
  const p=para(n?16:24,H+8,'The distinction, set out by Brauner and colleagues in 2016, matters because tolerance and persistence cause relapse and can be a stepping stone to resistance, yet a routine MIC cannot see them.',n?50:92,'note start f13',17,1.6);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:s+b.s+p.s};
}
function scA8(n){
  const A=n?axes(50,34,280,160,{xr:[0,12],yr:[0,10],xt:[[0,'0'],[4,'4'],[8,'8'],[12,'12 h']],yt:[],xlab:'time after dose',ylab:'concentration'})
    :axes(64,34,320,180,{xr:[0,12],yr:[0,10],xt:[[0,'0'],[4,'4'],[8,'8'],[12,'12 h']],yt:[],xlab:'time after dose',ylab:'concentration'});
  const C=t=>11.2*(Math.exp(-.3*t)-Math.exp(-2.2*t)), MIC=2;
  let d='M'+FX(A.px(0))+' '+FX(A.py(0));for(let i=0;i<=60;i++){const t=12*i/60;d+=' L'+FX(A.px(t))+' '+FX(A.py(C(t)));}d+=' L'+FX(A.px(12))+' '+FX(A.py(0))+'Z';
  let s=A.s+G('a-fade',.2,`<path d="${d}" fill="${PAL.blue}" opacity=".45"/>`+curve(A,C,{col:'#2F5276'}));
  const t1=.13, t2=5.03, tm=Math.log(2.2/.3)/1.9, cm=C(tm);
  s+=G('a-fade',.5,ln(A.x,FX(A.py(MIC)),A.x+A.w,FX(A.py(MIC)),RED,1.4,'5 3')+T(A.x+A.w,FX(A.py(MIC)-5),'MIC','mono end f11 halo')
    +ln(FX(A.px(tm)),FX(A.py(cm)),FX(A.px(tm)+46),FX(A.py(cm)),'#6A5B47',1,'2 2')+T(FX(A.px(tm)+50),FX(A.py(cm)+4),'Cmax','mono start f11 halo')
    +T(FX(A.px(2.2)),FX(A.py(2.2)+2),'AUC','mono mid f12 halo'));
  const yb=FX(A.py(0)-14);
  s+=G('a-fade',.8,`<path d="M${FX(A.px(t1))} ${FX(A.py(MIC)+8)} V${FX(A.py(MIC)+14)} H${FX(A.px(t2))} V${FX(A.py(MIC)+8)}" stroke="${INK}" stroke-width="1.2" fill="none"/>`+T(FX(A.px(7.6)),FX(A.py(MIC)+16),'time above MIC','note start f11 halo'));
  const rows=[['Cmax/MIC','aminoglycosides; also daptomycin','once-daily high doses; peak around 8–10 × MIC'],['AUC/MIC','fluoroquinolones, vancomycin, azithromycin, tetracyclines, linezolid','total exposure; vancomycin AUC about 400–600 mg·h/L'],['Time above MIC','β-lactams','free drug above MIC for roughly 40–70% of the interval; frequent dosing or extended infusions']];
  const t=wtable(n,['Index','Drug classes','Dosing goal'],rows,n?[[10,10],[96,18],[226,16]]:[[24,16],[160,34],[400,32]],{y0:A.y+A.h+60,d0:1,R:n?354:620});
  return {vb:n?slim(t.y+6):wide(t.y+8),s:s+t.s};
}
function scA9(n){
  const ev=[['sulfonamides',1935],['penicillins',1942],['aminoglycosides',1946],['tetracyclines',1948],['chloramphenicol',1949],['macrolides',1952],['glycopeptides',1958],['quinolones',1962],['oxazolidinones',2000],['lipopeptides',2003],['diarylquinolines (TB)',2012],['triazaacenaphthylenes',2025]];
  const lw=n?132:170, x0=(n?10:24)+lw, x1=n?340:430, y0=34, rh=n?17:18, yr=v=>x0+(v-1930)/(2030-1930)*(x1-x0);
  let s=G('a-fade',0,T(n?10:24,20,'first clinical use of each class (approximate)','note start f12')+box(FX(yr(1962.5)),y0-6,FX(yr(1999.5)-yr(1962.5)),ev.length*rh+4,'#E7DEC9',2)
    +T(FX((yr(1962.5)+yr(1999.5))/2),y0+ev.length*rh+18,'few new classes','note mid f11'));
  ev.forEach((e,i)=>{const y=y0+i*rh+6;s+=G('a-fade',(.1+i*.06).toFixed(2),T(x0-8,y+4,e[0],'lab end '+(n?'f11':'f12'))+ln(x0,y,x1,y,'#C9BFAB',.6)+`<circle cx="${FX(yr(e[1]))}" cy="${y}" r="4" fill="${i<8?'#2F5276':RED}"/>`);});
  const ay=y0+ev.length*rh+26;
  s+=G('a-fade',.8,ln(x0,ay,x1,ay,'#6A5B47',1)+[1940,1980,2020].map(v=>T(FX(yr(v)),ay+14,String(v),'mono mid f10')).join(''));
  const items=[['Stewardship','The right drug, dose and duration; narrow spectrum once culture results are back; shorter courses where trials show they work; and less use in farming.'],['Why the pipeline is thin','Easy targets and soil producers were mined by the 1960s. Most new compounds cannot cross the Gram-negative envelope. A new drug held in reserve earns little: Achaogen went bankrupt in 2019, a year after its antibiotic was approved.'],['Fixes being tried','Payments decoupled from sales (the UK subscription model), public funders such as CARB-X, and new sources such as uncultured soil bacteria.']];
  const b=n?bullets(24,ay+46,items,44,{d0:1,gap:18}):bullets(458,44,items,23,{d0:1,gap:16,fs:'f12'});
  const H=n?b.y-6:Math.max(b.y-6,ay+24);
  const p=para(n?16:24,H+10,'Bacterial resistance was directly responsible for about 1.3 million deaths in 2019 and associated with about 5 million (GRAM study, Lancet 2022).',n?50:92,'note start f13',17,1.6);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:s+b.s+p.s};
}
const S=[
 {p:1,title:'Selective toxicity',draw:scA1,text:"An antibiotic is useful only if it harms the microbe far more than the patient. Paul Ehrlich called this a magic bullet. The best targets are structures bacteria have and we lack, like peptidoglycan, or make differently, like the 70S ribosome and bacterial topoisomerases."},
 {p:1,title:'Targets and drug classes',chips:'targ',draw:scA2,text:"Antibiotics are grouped by what they hit. Pick a target to see which classes act there, whether they kill (bactericidal) or only stop growth (bacteriostatic), and their usual spectrum. The distinction between cidal and static is less sharp in practice than on paper, and depends on dose and organism."},
 {p:2,title:'Five ways to resist',draw:scA3,text:"Bacteria resist in a handful of ways: destroy or modify the drug, change its target, pump it out, keep it from getting in, or bring in a substitute for the target. Many clinical isolates combine several, and Gram-negative bacteria add the outer membrane as a barrier to everything."},
 {p:2,title:'Mutations and acquired genes',draw:scA4,text:"Resistance arises either by mutation of the cell's own genes or by acquiring a resistance gene from elsewhere. The most feared resistances, ESBLs and carbapenemases in Gram-negatives, MRSA and vancomycin-resistant enterococci, are mostly acquired genes that travel between strains and species on mobile elements."},
 {p:3,title:'MIC and breakpoints',draw:scA5,text:"The minimum inhibitory concentration is the lowest concentration that stops visible growth in a standard test. On its own it is just a number; breakpoints from EUCAST or CLSI translate it into susceptible, susceptible at increased exposure, or resistant for a given drug, organism and dose."},
 {p:3,title:'Synergy and the checkerboard',draw:scA6,text:"Two drugs can be tested together in a checkerboard of twofold dilutions. The fractional inhibitory concentration index adds the fraction of each drug's own MIC needed in combination. A sum of 0.5 or less is called synergy; above 4, antagonism."},
 {p:3,title:'Tolerance, resistance, persistence',draw:scA7,text:"Not every treatment failure is resistance. Tolerant bacteria die more slowly without any change in MIC, and persisters are a small dormant subpopulation that survives killing. Time-kill curves and the minimum duration for killing show what the MIC cannot."},
 {p:4,title:'PK/PD: dosing to the bug',draw:scA8,text:"Pharmacokinetics describes the drug concentration in the body over time; pharmacodynamics links it to killing. Aminoglycosides kill best at high peaks, β-lactams need time above the MIC, and many others depend on total exposure, the area under the curve. Dosing regimens follow from this."},
 {p:4,title:'Stewardship and the pipeline',draw:scA9,text:"Most antibiotic classes were introduced between the 1930s and the early 1960s. Few new classes have arrived since, and those mostly treat Gram-positive or mycobacterial infections. Using existing drugs carefully buys time while new incentives try to restart discovery."}];
const CHIPS={targ:{list:TARG.map(t=>t.k),get:()=>tgSel,set:k=>tgSel=k}};
