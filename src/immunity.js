/*META
{"title":"Immunity to Microbes","eyebrow":"Host–microbe interaction · an animated primer","h1":"How the body detects and destroys microbes","parts":["Innate","Cells and complement","Adaptive","Memory"],"foot":"Immunology is simplified to its microbial essentials; cytokine networks and signalling are abbreviated. The herd-immunity figures are rounded illustrations.","description":"Barriers and pattern-recognition receptors, complement, phagocytes and the inflammasome, antigen presentation and T and B cells, antibodies, and immune memory and vaccination."}
META*/
const PRR=[
 {k:'TLR4',r:'Toll-like receptor 4',lig:'lipopolysaccharide (LPS) of Gram-negatives',loc:'cell surface (with MD-2, CD14)',out:'NF-κB → inflammatory cytokines; the classic endotoxin sensor'},
 {k:'TLR5',r:'Toll-like receptor 5',lig:'flagellin',loc:'cell surface',out:'NF-κB; detects motile bacteria'},
 {k:'TLR3/7/9',r:'endosomal Toll-like receptors',lig:'viral dsRNA (3), ssRNA (7), unmethylated CpG DNA (9)',loc:'endosome membrane',out:'type I interferon and cytokines; tuned to nucleic acids'},
 {k:'NOD1/2',r:'NOD-like receptors',lig:'peptidoglycan fragments (iE-DAP, muramyl dipeptide)',loc:'cytosol',out:'NF-κB; senses bacteria that reach the cytoplasm'},
 {k:'NLRP3',r:'inflammasome sensor',lig:'diverse danger signals: pore-forming toxins, ATP, crystals, ionic flux',loc:'cytosol',out:'assembles the inflammasome → caspase-1 → IL-1β and pyroptosis'},
 {k:'cGAS–STING',r:'cytosolic DNA sensor',lig:'double-stranded DNA in the cytosol (viruses, some bacteria)',loc:'cytosol → ER',out:'type I interferon; a major antiviral and self-DNA alarm'}];
let prrSel=0;
function phago(cx,cy,k=1){return `<path d="M${cx-30*k} ${cy} q-6 -26 20 -30 q10 -12 24 -2 q22 -8 26 18 q14 10 2 26 q6 20 -18 22 q-12 14 -26 2 q-22 6 -26 -18 q-12 -10 2 -26Z" transform="translate(0 0)" fill="${PAL.blue}" stroke="${INK}" stroke-width="1.2" class="tint"/>`
  +`<circle cx="${cx}" cy="${cy}" r="${10*k}" fill="${PAL.lilac}" stroke="${INK}" stroke-width=".8"/>`;}
function bactDot(cx,cy,f){return `<ellipse cx="${cx}" cy="${cy}" rx="7" ry="4.2" fill="${f||PAL.green}" stroke="${INK}" stroke-width=".8" class="tint"/>`;}
function abY(cx,cy,k=1,col=PAL.gold){const a=`M${cx} ${cy} V${cy-8*k}`,l=`M${cx} ${cy-8*k} L${cx-12*k} ${cy-20*k}`,r=`M${cx} ${cy-8*k} L${cx+12*k} ${cy-20*k}`;
  return `<path d="${a} ${l} ${r}" stroke="${INK}" stroke-width="${2.4*k}" fill="none" stroke-linecap="round"/>`
    +`<circle cx="${cx-12*k}" cy="${cy-20*k}" r="${3.2*k}" fill="${col}" stroke="${INK}" stroke-width=".7"/><circle cx="${cx+12*k}" cy="${cy-20*k}" r="${3.2*k}" fill="${col}" stroke="${INK}" stroke-width=".7"/>`;}
function scI1(n){return introPlate(n,{q:'How does the body tell self from a microbe, and respond fast but also remember?',
  belief:'Immunity works in two layers. An innate system reacts within minutes to molecular patterns shared by whole classes of microbe. A slower adaptive system then builds receptors tailored to the exact invader, and remembers it for next time. Vaccines exploit that memory. The two layers constantly talk to each other.',
  items:['Barriers and pattern receptors','Complement','Phagocytes and the inflammasome','Antigen presentation, MHC I and II','T cell subsets and B cells','Antibodies and class switching','Memory and vaccination'],
  art:(cx,cy)=>phago(cx-18,cy,1)+bactDot(cx+26,cy-6,PAL.green)+bactDot(cx+30,cy+8,PAL.rose)+T(cx,cy+58,'a phagocyte meets bacteria','note mid f12'),artH:150});}
function scI2(n){
  const items=[
   ['Barriers come first','Intact skin, the acid of the stomach, lysozyme in tears and saliva, mucus and its beating cilia, and the competition of the normal microbiota keep most microbes out before any sensing is needed.'],
   ['Pattern recognition','Innate cells carry receptors (PRRs) for conserved microbial molecules (PAMPs) such as LPS, flagellin, peptidoglycan and microbial nucleic acids, and for host "danger" signals. Charles Janeway predicted these receptors; Hoffmann and Beutler shared the 2011 Nobel Prize for showing that Toll (in flies) and TLR4 (in mice) sense microbes.'],
   ['One pattern, one class of microbe','Because PAMPs are shared and essential, a handful of receptors covers huge groups of pathogens at once, and the microbe cannot easily discard the target.'],
   ['Output: inflammation and interferon','Engaged receptors switch on NF-κB and interferon programs: cytokines, recruitment of phagocytes, fever, and an antiviral state in neighbouring cells.']];
  const c=cards(n,items,{y:20});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scI3(n){
  const p=PRR[prrSel];
  const ex=explorer(n,{h:p.r,sub:p.k,
    rows:[['Ligand (PAMP)',p.lig],['Location',p.loc],['Output',p.out]],
    note:'Pattern receptors sit where their targets appear: on the surface for extracellular microbes, in endosomes for engulfed ones, and in the cytosol for invaders that break in. Together they survey every compartment a microbe might occupy.'},{y:n?34:40});
  return ex;
}
function scI4(n){
  const N=n?{t:{x:180,y:34,w:240,t:'trigger: microbe surface|or antibody or lectin'},
     c3:{x:180,y:112,w:200,t:'C3 → C5|convertases',f:PAL.gold},
     op:{x:88,y:196,w:150,t:'C3b: opsonisation',f:PAL.blue},
     an:{x:264,y:196,w:150,t:'C3a, C5a:|inflammation',f:PAL.rose},
     mac:{x:180,y:278,w:210,t:'C5–C9: membrane|attack complex',f:PAL.lilac}}
   :{t:{x:120,y:60,w:170,t:'three triggers:|classical, lectin,|alternative'},
     c3:{x:330,y:60,w:150,t:'C3 → C5|convertases',f:PAL.gold},
     op:{x:540,y:40,w:150,t:'C3b: opsonisation',f:PAL.blue},
     an:{x:540,y:110,w:160,t:'C3a, C5a:|inflammation',f:PAL.rose},
     mac:{x:540,y:185,w:160,t:'MAC (C5b–C9):|lysis',f:PAL.lilac}};
  const E=n?[['t','c3','cascade'],['c3','op',''],['c3','an',''],['c3','mac','']]
    :[['t','c3','cascade'],['c3','op','',{side:-1}],['c3','an',''],['c3','mac','',{side:1}]];
  let s=G('a-fade',0,flow(N,E));
  const b=bullets(n?24:30,n?330:230,[
    ['Three ways in, one hub','The classical pathway starts on antibody bound to a microbe, the lectin pathway on mannose-binding lectin recognising sugars, the alternative pathway by spontaneous ticking-over on any surface that fails to switch it off. All converge on C3 convertase, which then forms C5 convertase.'],
    ['Three outputs','C3b coats the microbe for phagocytes (opsonisation), the small fragments C3a and C5a recruit and activate cells (and C5a is a strong chemoattractant), and C5b, cut from C5 by C5 convertase, nucleates the pore-forming membrane attack complex.'],
    ['Why it is dangerous and controlled','The alternative pathway attacks indiscriminately, so host cells carry regulators (CD55, CD59, factor H). Losing them causes disease; people who lack the terminal components (C5–C9) suffer recurrent Neisseria infections.']],
    n?44:82,{d0:.6,gap:22});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,250)),s:s+b.s};
}
function scI5(n){
  const items=[
   ['Neutrophils','The first and most numerous responders, short-lived, drawn from blood by C5a and chemokines. They engulf and kill, and cast nets of DNA (NETs) that trap bacteria. Pus is spent neutrophils.'],
   ['Macrophages','Longer-lived tissue sentinels that phagocytose, present antigen, and set the tone of inflammation. They are both a defence and, for intracellular pathogens like Mycobacterium tuberculosis and Salmonella, a hiding place.'],
   ['The oxidative burst','On engulfment, the NADPH oxidase floods the phagosome with superoxide and, with myeloperoxidase, hypochlorous acid. Losing this (chronic granulomatous disease) brings recurrent catalase-positive infections.'],
   ['The inflammasome','When NLRP3 senses danger such as pore-forming toxins or ion flux, it assembles a platform that activates caspase-1, which cleaves IL-1β to its active form and triggers pyroptosis, an inflammatory cell death that releases alarm signals and the microbe’s contents.']];
  const c=cards(n,items,{y:20});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scI6(n){
  const xb=n?90:150, xa=n?270:470, w=n?172:210, ys=n?[56,134,212,290]:[62,138,214,290];
  const N={mb:{x:xa,y:ys[0],w,t:'microbe engulfed|into a phagosome'},lp:{x:xa,y:ys[1],w,t:'lysosomal proteases|cut it up',f:PAL.sand},
     m2:{x:xa,y:ys[2],w,t:'peptide loaded on|MHC II, to surface',f:PAL.gold},cd4:{x:xa,y:ys[3],w,t:'CD4 helper T cell|reads MHC II',f:PAL.blue},
     cy:{x:xb,y:ys[0],w,t:'cytosolic protein|(virus-infected cell)'},pr:{x:xb,y:ys[1],w,t:'proteasome cuts;|TAP pumps peptide|into the ER',f:PAL.sand},
     m1:{x:xb,y:ys[2],w,t:'peptide loaded on|MHC I, to surface',f:PAL.rose},cd8:{x:xb,y:ys[3],w,t:'CD8 killer T cell|reads MHC I',f:PAL.lilac}};
  const E=[['mb','lp',''],['lp','m2',''],['m2','cd4',''],['cy','pr',''],['pr','m1',''],['m1','cd8','']];
  const hd=T(xa,22,'MHC class II route','lab mid f13')+T(xb,22,'MHC class I route','lab mid f13');
  let s=G('a-fade',0,hd+flow(N,E));
  const b=bullets(n?24:30,n?340:345,[
    ['MHC I: "what is inside me"','Almost every cell displays fragments of its own cytosolic proteins on MHC class I. A virus-infected or cancerous cell shows foreign peptides and is killed by a CD8 T cell. Many viruses fight back by downregulating MHC I, which then alerts NK cells.'],
    ['MHC II: "what I have eaten"','Professional antigen-presenting cells (dendritic cells, macrophages, B cells) display fragments of engulfed material on MHC class II to CD4 helper T cells, which then coordinate the whole adaptive response.']],
    n?44:82,{d0:.6,gap:24});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,340)),s:s+b.s};
}
function scI7(n){
  const rows=[
   ['CD8 cytotoxic','recognise MHC I','kill infected and tumour cells with perforin and granzymes'],
   ['CD4 Th1','IFN-γ','activate macrophages against intracellular bacteria and viruses'],
   ['CD4 Th2','IL-4, IL-5, IL-13','help against helminths; drive IgE and eosinophils'],
   ['CD4 Th17','IL-17, IL-22','recruit neutrophils; guard mucosal surfaces against fungi, extracellular bacteria'],
   ['CD4 Tfh','IL-21, CD40L','drive B cell affinity maturation and class switching'],
   ['Treg','IL-10, TGF-β','suppress responses; prevent autoimmunity and limit damage'],
   ['B cells','make antibody','secrete immunoglobulin; also present antigen']];
  const t=wtable(n,['Cell','Signal / ligand','Job against microbes'],rows,
    n?[[10,10],[92,14],[200,16]]:[[24,14],[150,20],[330,34]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+14,'A naive CD4 cell is pushed toward one fate by the cytokines dendritic cells make, which depend on the PRRs that fired. The match of T-helper subset to microbe type is central: a strong Th1 response contains leprosy in its limited tuberculoid form, while a Th2-skewed response allows the spreading lepromatous form.',n?50:92,'note start f13',17,.6);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function igG(cx,hy){
  // two heavy chains (VH CH1 | hinge | CH2 CH3) and two light chains (VL CL); variable domains form the antigen-binding tips
  const dom=(x,y,w,h,f)=>`<rect x="${FX(x)}" y="${FX(y)}" width="${w}" height="${h}" rx="7" fill="${f}" stroke="${INK}" stroke-width="1" class="tint"/>`;
  const arm=(sg)=>{const hx=sg<0?0:-16, lx=sg<0?-18:2; // heavy inner, light outer
    return dom(hx,-58,16,24,PAL.rose)+dom(hx,-32,16,24,PAL.blue)+dom(lx,-58,16,24,PAL.rose)+dom(lx,-32,16,24,PAL.gold)
      ''+'';};
  let s=`<g transform="translate(${cx-11} ${hy}) rotate(-38)">${arm(-1)}</g><g transform="translate(${cx+11} ${hy}) rotate(38)">${arm(1)}</g>`;
  s+=`<path d="M${cx-9.6} ${hy-11} L${cx-8} ${hy+13} M${cx+9.6} ${hy-11} L${cx+8} ${hy+13}" stroke="${INK}" stroke-width="2.2" fill="none"/>`
    +ln(cx-8,hy+6,cx+8,hy+6,RED,1.4)+ln(cx-8,hy+10,cx+8,hy+10,RED,1.4)
    +dom(cx-17,hy+13,16,24,PAL.blue)+dom(cx+1,hy+13,16,24,PAL.blue)+dom(cx-17,hy+39,16,24,PAL.blue)+dom(cx+1,hy+39,16,24,PAL.blue);
  // antigen held by the left tip
  const a=-38*Math.PI/180, tx=cx-11+(-1)*Math.cos(a)-(-64)*Math.sin(a), ty=hy+(-1)*Math.sin(a)+(-64)*Math.cos(a);
  s+=`<path d="M${FX(tx)} ${FX(ty-9)} l8 5 l-2 9 h-12 l-2 -9 Z" fill="${PAL.green}" stroke="${INK}" stroke-width="1" class="tint"/>`;
  return {s,tx,ty};}
function scI8(n){
  const cx=n?96:120, hy=n?110:116, g=igG(cx,hy);
  const lab=(x,y,t,an)=>T(x,y,t,'note '+an+' f12 halo');
  let s=G('a-fade',0,g.s
    +(n?lab(g.tx,g.ty-14,'antigen','mid'):lab(g.tx-12,g.ty-4,'antigen','end'))
    +lab(cx+62,hy-50,'Fab arm','start')+lab(cx+62,hy-36,'(binds antigen)','start')
    +lab(cx+30,hy+10,'hinge (S–S)','start')+lab(cx+24,hy+42,'Fc stem','start')+lab(cx+24,hy+56,'(effector end)','start'));
  const ly=hy+86, lx=n?20:24, sw=(x,y,f,t)=>`<rect x="${x}" y="${y-9}" width="14" height="11" rx="3" fill="${f}" stroke="${INK}" stroke-width=".8" class="tint"/>`+T(x+20,y,t,'note start f12');
  s+=G('a-fade',.2,sw(lx,ly,PAL.rose,'variable domains (V)')+sw(lx,ly+17,PAL.blue,'heavy-chain constant')+sw(lx,ly+34,PAL.gold,'light-chain constant')
    +T(lx,ly+54,'IgG: 2 heavy + 2 light chains','note start f12'));
  const rows=[
   ['IgM','pentamer, first made','strong complement activation; stays in blood'],
   ['IgG','monomer, most abundant','neutralises, opsonises, crosses the placenta'],
   ['IgA','dimer at mucosa','guards gut and airway surfaces; in breast milk'],
   ['IgE','on mast cells','parasites and, unhelpfully, allergy'],
   ['IgD','on naive B cells','a receptor; little secreted']];
  const t=wtable(n,['Isotype','Form','Role'],rows,n?[[10,10],[70,12],[150,16]]:[[270,16],[350,18],[470,22]],{y0:n?ly+78:40,R:n?354:620});
  let wb={s:'',y:t.y};
  if(!n)wb=bullets(24,ly+82,[
    ['One site, many jobs','The two Fab arms fix the target; the Fc stem decides what happens: neutralise, flag for phagocytosis, trigger complement.'],
    ['Class switching','Activated B cells keep the same antigen-binding site but swap the Fc region (IgM → IgG, IgA, IgE) to suit the site of battle.'],
    ['Affinity maturation','In germinal centres, B cells hypermutate their binding site and the best binders are selected, so antibodies improve over weeks.']],28,{d0:.3,gap:22});
  if(!n)s+=G('a-fade',.3,wb.s);
  const foot=n?para(16,t.y+12,'Class switching keeps the binding site but swaps the Fc stem to suit the site of battle; affinity maturation in germinal centres hypermutates and selects the binding site so antibodies improve over weeks.',50,'note start f13',17,.5):{s:'',y:t.y};
  return {vb:n?slim(foot.y+6):wide(Math.max(t.y+8,wb.y+8,250)),s:s+t.s+foot.s};
}
function scI9(n){
  const AX=n?axes(58,36,268,150,{xr:[1,13],yr:[0,100],xt:[[2,'2'],[6,'6'],[12,'12']],yt:[[0,'0'],[50,'50'],[100,'100%']],xlab:'R0',ylab:'% immune'})
    :axes(72,40,300,160,{xr:[1,13],yr:[0,100],xt:[[2,'2'],[6,'6'],[12,'12']],yt:[[0,'0'],[50,'50'],[100,'100%']],xlab:'basic reproduction number R0',ylab:'% immune needed (1 − 1/R0)'});
  let s=AX.s+G('a-fade',.3,curve(AX,x=>100*(1-1/x),{col:'#2F5276'}));
  const marks=[[2,'1918 flu'],[3,'SARS-CoV-2 early'],[12,'measles']];
  s+=G('a-fade',.5,marks.map(m=>`<circle cx="${FX(AX.px(m[0]))}" cy="${FX(AX.py(100*(1-1/m[0])))}" r="4" fill="${PAL.rose}" stroke="${INK}" stroke-width="1"/>`
    +(n?'':T(FX(AX.px(m[0])+6),FX(AX.py(100*(1-1/m[0]))+4),m[1],'note start f10 halo'))).join(''));
  const b=bullets(n?24:400,n?AX.y+AX.h+54:52,[
    ['Types of vaccine','Live-attenuated (MMR, BCG, oral polio) give strong, lasting immunity but can rarely revert; inactivated (whole-cell pertussis, injected polio) are safe but weaker; subunit, toxoid (tetanus, diphtheria), conjugate (Hib, pneumococcus) and mRNA or viral-vector (COVID-19) vaccines show just the right piece.'],
    ['Herd immunity','If enough of a population is immune, chains of transmission break and even the unvaccinated are protected. The threshold is 1 − 1/R0: about 50% at R0 of 2, but 92–95% for measles, with R0 of 12–18.'],
    ['Memory','Memory T and B cells persist for years, so a second exposure is met in days, not weeks, and often cleared before symptoms. This is the whole point of vaccination.']],
    n?44:34,{d0:.6,gap:20});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,AX.y+AX.h+50)),s:s+b.s};
}
const S=[
 {p:1,title:'Two layers of defence',draw:scI1,text:"Immunity to microbes has a fast innate layer and a slower, specific adaptive layer. The innate layer recognises molecular patterns common to many microbes and reacts in minutes. The adaptive layer builds receptors against the exact invader and remembers it. Vaccines work by priming that memory safely."},
 {p:1,title:'Barriers and pattern recognition',draw:scI2,text:"Before any immune cell acts, physical and chemical barriers and the normal microbiota exclude most microbes. Cells that patrol the body carry pattern-recognition receptors for conserved microbial molecules, so a few receptors cover whole classes of pathogen and switch on inflammation and interferon."},
 {p:1,title:'Pattern-recognition receptors',chips:'prr',draw:scI3,text:"Pattern receptors are tuned to molecules microbes cannot easily discard, and are placed in every compartment an invader might reach: the surface, the endosome and the cytosol. Pick a receptor to see what it detects, where it sits, and what it switches on. TLR4 sensing LPS is the textbook example."},
 {p:2,title:'Complement',draw:scI4,text:"Complement is a cascade of blood proteins that three pathways feed into a central enzyme, C3 convertase. Its outputs coat microbes for eating, recruit and inflame, and build a pore that lyses them. It is powerful enough to need tight regulation to spare host cells."},
 {p:2,title:'Phagocytes and the inflammasome',draw:scI5,text:"Neutrophils and macrophages engulf microbes and kill them with an oxidative burst and enzymes. The inflammasome is an intracellular alarm: when it senses danger such as a pore-forming toxin, it activates caspase-1, releases the cytokine IL-1β and triggers an inflammatory cell death called pyroptosis."},
 {p:3,title:'Antigen presentation',draw:scI6,text:"Adaptive immunity starts when T cells read peptides displayed on MHC molecules. MHC class I shows what is inside a cell to CD8 killer T cells, exposing virus-infected cells. MHC class II shows what a phagocyte has eaten to CD4 helper T cells, which then direct the whole response."},
 {p:3,title:'T cells and B cells',draw:scI7,text:"CD8 T cells kill infected cells. CD4 helper cells come in flavours, each matched to a kind of microbe: Th1 for intracellular invaders, Th2 for worms, Th17 for fungi and extracellular bacteria, with regulatory T cells holding the brakes. B cells make antibody. The right choice of helper decides whether an infection is cleared."},
 {p:3,title:'Antibodies',draw:scI8,text:"An antibody is a Y: two arms bind the antigen, the stem decides the effector action. Five isotypes split the work, from IgM made first to IgA guarding mucosal surfaces. B cells switch the stem class and hypermutate the binding arms, so antibodies both specialise and sharpen over the weeks of a response."},
 {p:4,title:'Memory and vaccination',draw:scI9,text:"Memory cells make a second exposure fast and often silent, which is what a vaccine installs without the disease. Vaccines range from live-attenuated to mRNA. When enough of a population is immune, transmission chains break: the herd-immunity threshold is 1 minus 1 over R0, modest for mild viruses but near 95% for measles."}];
const CHIPS={prr:{list:PRR.map(p=>p.k),get:()=>prrSel,set:k=>prrSel=k}};
