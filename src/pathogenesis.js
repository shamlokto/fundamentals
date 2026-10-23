/*META
{"title":"Pathogenesis and Epidemiology","eyebrow":"Host–microbe interaction · an animated primer","h1":"How microbes cause disease and how it spreads","parts":["Infection","Weapons","Evasion and ecology","Epidemiology"],"foot":"Mechanisms are simplified and examples are representative, not exhaustive. Epidemiological figures are rounded illustrations. Koch’s postulates are covered in full in the koch primer.","description":"Steps of infection, virulence factors and toxins, secretion-system effectors, immune evasion and antigenic variation, colonization resistance and dysbiosis, Koch’s postulates, and epidemiology basics."}
META*/
const TOX=[
 {k:'Cholera (AB)',t:'AB enterotoxin',mech:'the A subunit ADP-ribosylates Gsα, locking adenylate cyclase on; cAMP rises and chloride and water pour into the gut',ex:'Vibrio cholerae',eff:'massive watery "rice-water" diarrhoea and dehydration'},
 {k:'Diphtheria (AB)',t:'AB toxin',mech:'the A subunit ADP-ribosylates elongation factor 2, halting protein synthesis and killing the cell',ex:'Corynebacterium diphtheriae (phage-encoded)',eff:'pseudomembrane in the throat, heart and nerve damage'},
 {k:'Botulinum / tetanus (AB)',t:'AB neurotoxins (proteases)',mech:'cleave SNARE proteins, blocking neurotransmitter release; botulinum stops acetylcholine (flaccid), tetanus stops inhibitory signals (rigid)',ex:'Clostridium botulinum, C. tetani',eff:'flaccid paralysis (botulism) or spastic paralysis (tetanus)'},
 {k:'Shiga (AB)',t:'AB toxin',mech:'the A subunit (an N-glycosidase) removes a single adenine from 28S rRNA, stopping protein synthesis, with a tropism for the gut and kidney endothelium',ex:'Shigella dysenteriae; Shiga-toxin E. coli (O157:H7)',eff:'bloody diarrhoea and haemolytic-uraemic syndrome'},
 {k:'Pore-forming',t:'pore-forming toxins',mech:'insert into the host membrane and punch a hole, dissipating gradients and triggering the inflammasome',ex:'Staphylococcus aureus α-toxin; streptolysin O; listeriolysin O',eff:'cell lysis; listeriolysin lets Listeria escape the phagosome'},
 {k:'Superantigens',t:'superantigens',mech:'clamp MHC II to the T-cell receptor outside the normal groove, activating up to a fifth of all T cells at once',ex:'S. aureus TSST-1 and enterotoxins; streptococcal SPEs',eff:'cytokine storm: toxic shock syndrome'},
 {k:'Endotoxin (LPS)',t:'endotoxin, not a secreted protein',mech:'lipid A of LPS, released as Gram-negatives lyse, is sensed by TLR4 and drives systemic inflammation',ex:'any Gram-negative (E. coli, Neisseria, Salmonella)',eff:'fever, hypotension, septic shock when overwhelming'}];
let toxSel=0;
function adhesin(cx,cy){return rodCell2(cx,cy,46,14)+[-14,-4,6,16].map(d=>ln(cx+d,cy+14,cx+d,cy+26,INK,1)+`<circle cx="${cx+d}" cy="${cy+28}" r="2.4" fill="${PAL.gold}" stroke="${INK}" stroke-width=".6"/>`).join('');}
function scP1(n){return introPlate(n,{q:'Why do only some microbes make us ill, and what decides how far an outbreak spreads?',
  belief:'Disease is an outcome of the meeting between a microbe’s weapons and a host’s defences, shaped by dose and by the host’s state. Pathogenesis asks how a single microbe attaches, invades, resists killing and causes damage. Epidemiology scales that up to populations: who gets infected, how fast, and how to stop it.',
  items:['Steps of infection','Virulence factors','Toxins and effectors','Immune evasion and antigenic variation','Colonization resistance and dysbiosis','Koch’s postulates, briefly','R0, incidence, outbreaks'],
  art:(cx,cy)=>adhesin(cx,cy-6)+T(cx,cy+42,'adhesins grip the host','note mid f11'),artH:150});}
function scP2(n){
  const items=[
   ['Exposure and entry','A microbe reaches a portal: skin breaks, the respiratory, gut or urogenital tract, or a vector bite. The infectious dose varies enormously, from about ten Shigella to millions of cholera.'],
   ['Adhesion','It must grip to avoid being swept away, using pili, fimbriae and surface adhesins that bind specific host receptors. This tropism sets which tissue, and often which host, it can colonise.'],
   ['Invasion or colonisation','Some stay on the surface and secrete toxins; others invade cells or tissues, triggering their own uptake with secretion-system effectors.'],
   ['Multiplication and damage','To grow the microbe must get nutrients, above all iron, and resist defences. Damage follows, done by the microbe, by its toxins, or by the host’s own inflammation.'],
   ['Transmission','Finally it must leave and reach a new host, by shedding in stool, droplets, skin or a vector. Many virulence traits exist to serve this last step.']];
  const c=cards(n,items,{y:20,num:1});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scP3(n){
  const rows=[
   ['Adhesins','pili, fimbriae, afimbrial adhesins','grip host cells; set tissue tropism'],
   ['Capsules','polysaccharide coat','resist phagocytosis and complement (pneumococcus, meningococcus)'],
   ['Iron acquisition','siderophores, haem uptake, transferrin theft','win iron from the host (nutritional immunity)'],
   ['Invasins','effectors that trigger uptake','force entry into non-phagocytic cells'],
   ['Enzymes','hyaluronidase, collagenase, proteases','spread through tissue; degrade antibody (IgA proteases)'],
   ['Biofilm','extracellular matrix','tolerance to antibiotics and immunity, on devices and tissues']];
  const t=wtable(n,['Factor','Examples','What it buys the microbe'],rows,
    n?[[10,10],[96,14],[210,15]]:[[24,14],[170,20],[350,30]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+14,'Virulence factors are the tools that turn a microbe into a pathogen. Many are clustered on pathogenicity islands acquired by horizontal transfer, which is how a harmless strain can suddenly become dangerous. Iron is so limited in the host that its acquisition is a decisive battleground.',n?50:92,'note start f13',17,.6);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function scP4(n){
  const c=TOX[toxSel];
  const ex=explorer(n,{h:c.t,sub:c.k,
    rows:[['Mechanism',c.mech],['Examples',c.ex],['Effect',c.eff]],
    note:'Exotoxins are secreted proteins, often extremely potent and specific, and many are carried on phages or plasmids. Endotoxin is different: it is the LPS of the Gram-negative wall itself, released on lysis, and causes harm through the host’s own inflammatory response rather than a targeted action.'},{y:n?34:40});
  return ex;
}
function secStack(n,y0){
  // layered envelope, host on top: host cytoplasm | host membrane | outside | OM | periplasm | IM | bacterial cytoplasm
  const x1=n?96:150, x2=n?354:620, L=n?8:24;
  const Y={hc:y0,hm:y0+44,out:y0+54,om:y0+96,pp:y0+108,im:y0+136,bc:y0+148,end:y0+196};
  let s=`<rect x="${x1}" y="${Y.hc}" width="${x2-x1}" height="44" fill="${PAL.rose}" opacity=".18"/>`
    +`<rect x="${x1}" y="${Y.bc}" width="${x2-x1}" height="${Y.end-Y.bc}" fill="${PAL.green}" opacity=".18"/>`
    +membraneBand(x1,x2,Y.hm,10)+membraneBand(x1,x2,Y.om,12)+membraneBand(x1,x2,Y.im,12)
    +ln(x1,Y.pp+14,x2,Y.pp+14,'#8C6D46',2.2,'3 3');
  const lab=(y,a,b)=>b?T(L,y-3,a,'note start f12')+T(L,y+11,b,'note start f12'):T(L,y+4,a,'note start f12');
  s+=n?lab(Y.hc+22,'host','cytoplasm')+lab(Y.hm+5,'host memb.')+lab(Y.out+21,'outside')+lab(Y.om+6,'outer memb.')+lab(Y.pp+14,'periplasm')+lab(Y.im+6,'inner memb.')+lab(Y.bc+24,'bacterial','cytoplasm')
      :lab(Y.hc+22,'host cytoplasm')+lab(Y.hm+5,'host membrane')+lab(Y.out+21,'outside the cell')+lab(Y.om+6,'outer membrane')+lab(Y.pp+14,'periplasm (PG)')+lab(Y.im+6,'inner membrane')+lab(Y.bc+24,'bacterial cytoplasm');
  return {s,Y,x1,x2};}
function eff(x,y){return `<circle cx="${FX(x)}" cy="${FX(y)}" r="4.2" fill="${PAL.gold}" stroke="${INK}" stroke-width=".8"/>`;}
function scP5(n){
  const y0=n?40:46, st=secStack(n,y0), Y=st.Y;
  const a=n?150:250, b=n?282:480; // T3SS and T4SS centres
  // T3SS: basal body with IM and OM rings, needle across the gap, translocon pore in the host membrane
  let t3=`<rect x="${a-9}" y="${Y.om-4}" width="18" height="${Y.im+16-Y.om}" fill="${PAL.blue}" stroke="${INK}" stroke-width="1" class="tint"/>`
    +`<rect x="${a-18}" y="${Y.im-2}" width="36" height="16" rx="4" fill="${PAL.blue}" stroke="${INK}" stroke-width="1" class="tint"/>`
    +`<rect x="${a-16}" y="${Y.om-3}" width="32" height="18" rx="4" fill="${PAL.blue}" stroke="${INK}" stroke-width="1" class="tint"/>`
    +`<rect x="${a-3}" y="${Y.hm+8}" width="6" height="${Y.om-3-Y.hm-8}" fill="${PAL.blue}" stroke="${INK}" stroke-width=".9"/>`
    +`<rect x="${a-11}" y="${Y.hm-3}" width="7" height="16" rx="3" fill="${PAL.rose}" stroke="${INK}" stroke-width=".9"/><rect x="${a+4}" y="${Y.hm-3}" width="7" height="16" rx="3" fill="${PAL.rose}" stroke="${INK}" stroke-width=".9"/>`
    +eff(a+8,Y.bc+34)+eff(a-10,Y.bc+40)+eff(a,Y.pp+8)+eff(a,Y.out+20)+eff(a+22,Y.hc+12)+eff(a+36,Y.hc+26);
  t3+=arw(a+3,Y.hm-4,a+17,Y.hc+16,{blue:1,w:1.3});
  const tl=(x,y,t,an)=>T(x,y,t,'note '+(an||'start')+' f12 halo');
  t3+=n?tl(a-18,Y.out+20,'needle','end')+tl(a,y0-8,'T3SS','mid')
       :tl(a+48,Y.hc+22,'effectors','start')+tl(a-20,Y.out+16,'needle','end')+tl(a-16,Y.hm-6,'translocon pore','end')+tl(a-24,Y.im+30,'basal body','end')+tl(a,y0-10,'type III (injectisome)','mid');
  // T4SS: core complex spanning both membranes, short pilus to the host membrane
  let t4=`<rect x="${b-14}" y="${Y.om-4}" width="28" height="${Y.im+16-Y.om}" rx="5" fill="${PAL.lilac}" stroke="${INK}" stroke-width="1" class="tint"/>`
    +`<rect x="${b-4}" y="${Y.hm+10}" width="8" height="${Y.om-4-Y.hm-10}" fill="${PAL.lilac}" stroke="${INK}" stroke-width=".9"/>`
    +`<rect x="${b-12}" y="${Y.im+14}" width="24" height="12" rx="3" fill="${PAL.lilac}" stroke="${INK}" stroke-width=".9"/>`
    +eff(b-6,Y.bc+38)+eff(b+10,Y.bc+44)+eff(b,Y.pp+8)+eff(b,Y.out+22)+eff(b-20,Y.hc+12)+eff(b-36,Y.hc+26);
  t4+=arw(b-3,Y.hm-2,b-15,Y.hc+16,{blue:1,w:1.3});
  t4+=n?tl(b,y0-8,'T4SS','mid')
       :tl(b+22,Y.out+20,'pilus','start')+tl(b+20,Y.pp+8,'core complex','start')+tl(b,y0-10,'type IV (Dot/Icm, Cag)','mid');
  let s=G('a-fade',0,st.s)+G('a-fade',.3,t3)+G('a-fade',.6,t4);
  const yn=Y.end+18;
  const pn=para(n?16:24,yn,'Effector proteins (gold) cross both bacterial membranes and the host membrane in one step. For Legionella the host membrane is the membrane of the vacuole it lives in.',n?52:96,'note start f13',17,.8);
  s+=pn.s;
  const bl=bullets(n?24:30,pn.y+14,[
    ['Type III secretion','A molecular syringe, evolutionarily kin to the flagellum, that injects effector proteins straight into a host cell. Salmonella and Shigella use it to force their own uptake and reshape the gut; Yersinia uses Yops to shut down phagocytes.'],
    ['Type IV secretion','Related to conjugation machinery, it moves proteins and even DNA. Legionella delivers hundreds of effectors through its Dot/Icm T4SS to build a replicative vacuole inside macrophages; Helicobacter injects CagA; Agrobacterium transfers DNA into plants.'],
    ['A shared logic','Rather than brute force, these systems reprogramme the host cell from within, switching off its defences and rebuilding a niche the microbe can live in.']],
    n?44:82,{d0:.6,gap:22});
  return {vb:n?slim(bl.y-4):wide(bl.y-4),s:s+bl.s};
}
function scP6(n){
  const items=[
   ['Hide or cloak','Capsules and surface sialic acid mimic host molecules; some microbes live inside cells (Mycobacterium, Listeria, Salmonella) where antibody cannot reach, or coat themselves in host proteins.'],
   ['Attack the response','IgA proteases cut mucosal antibody; proteins that bind or degrade complement; leukocidins that kill phagocytes; molecules that block antigen presentation.'],
   ['Antigenic variation','Change the surface faster than immunity can track it. Neisseria gonorrhoeae shuffles pilin genes so each generation looks new; the African trypanosome switches its VSG coat from a vast silent archive; Borrelia (relapsing fever and Lyme VlsE) recombines its surface lipoproteins, giving waves of relapse.'],
   ['Phase variation','Switching surface genes on and off at random (by slipped-strand repeats or inversion) keeps a few cells ready for whatever the immune system has not yet seen.']];
  const c=cards(n,items,{y:20});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scP7(n){
  const N=n?{he:{x:180,y:36,w:230,t:'healthy microbiota|(colonization resistance)',f:PAL.green},
     ab:{x:180,y:128,w:200,t:'broad antibiotics',f:PAL.rose},
     dy:{x:180,y:206,w:200,t:'dysbiosis: niches open',f:PAL.gold},
     cd:{x:88,y:290,w:150,t:'C. difficile|overgrows',f:PAL.lilac},
     ft:{x:272,y:290,w:160,t:'faecal transplant|restores community',f:PAL.green}}
   :{he:{x:140,y:60,w:180,t:'healthy microbiota|colonization resistance',f:PAL.green},
     ab:{x:360,y:60,w:160,t:'broad-spectrum|antibiotics',f:PAL.rose},
     dy:{x:560,y:60,w:150,t:'dysbiosis:|niches open',f:PAL.gold},
     cd:{x:420,y:190,w:160,t:'C. difficile|overgrows, colitis',f:PAL.lilac},
     ft:{x:180,y:190,w:180,t:'faecal transplant|restores resistance',f:PAL.green}};
  const E=n?[['he','ab',''],['ab','dy',''],['dy','cd','',{side:-1}],['cd','ft','treat',{side:1}]]
    :[['he','ab',''],['ab','dy',''],['dy','cd','',{side:1}],['cd','ft','treat',{side:1}]];
  let s=G('a-fade',0,flow(N,E));
  const b=bullets(n?24:30,n?360:290,[
    ['Commensals defend us','The resident microbiota occupies niches, consumes nutrients, lowers pH and makes inhibitory compounds, so incoming pathogens cannot gain a foothold. This is colonization resistance.'],
    ['Antibiotics break it','Wiping out commensals opens the field. Clostridioides difficile seizes it, causing severe colitis, the classic antibiotic-associated infection.'],
    ['Restoring the community','Transplanting stool from a healthy donor re-establishes the microbiota and cures recurrent C. difficile in most cases, a striking demonstration that the community itself is the defence.']],
    n?44:82,{d0:.6,gap:22});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,310)),s:s+b.s};
}
function scP8(n){
  const A=n?axes(54,36,276,150,{xr:[0,20],yr:[0,30],xt:[[0,'0'],[10,'10'],[20,'20 d']],yt:[[0,'0'],[30,'30']],xlab:'day',ylab:'new cases'})
    :axes(66,40,300,160,{xr:[0,24],yr:[0,30],xt:[[0,'0'],[6,'6'],[12,'12'],[18,'18'],[24,'24 days']],yt:[[0,'0'],[15,'15'],[30,'30']],xlab:'day of onset',ylab:'new cases'});
  const point=x=>22*Math.exp(-((x-5)**2)/8);
  const prop=x=>7*Math.exp(-((x-6)**2)/4)+12*Math.exp(-((x-13)**2)/6)+16*Math.exp(-((x-19)**2)/8);
  let s=A.s;
  s+=G('a-fade',.3,curve(A,point,{col:'#2F5276',from:0,to:n?20:24})+(n?'':T(FX(A.px(5)),FX(A.py(22)-6),'point source','note mid f12 halo')));
  s+=G('a-fade',.5,curve(A,prop,{col:'#A4473A',dash:'5 4',from:0,to:n?20:24})+(n?'':T(FX(A.px(19)),FX(A.py(16)-6),'propagated','note mid f12 halo')));
  if(n)s+=G('a-fade',.6,T(200,A.y+10,'— point source','note start f12')+T(200,A.y+26,'- - propagated','note start f12'));
  const b=bullets(n?24:400,n?A.y+A.h+54:52,[
    ['The epidemic curve','Plotting cases by date of onset reveals the shape of an outbreak. A single sharp peak suggests a point source (one contaminated meal); successive rising waves, each one incubation period apart, suggest person-to-person (propagated) spread.'],
    ['Investigation steps','Confirm the diagnosis and that an outbreak exists; define a case and count; describe by person, place and time; form and test a hypothesis (often a case-control study); then control the source and communicate.'],
    ['It points to the cause','The curve’s shape and timing narrow the source long before the microbe is confirmed in the lab.']],
    n?44:34,{d0:.6,gap:20});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,A.y+A.h+50)),s:s+b.s};
}
function scP9(n){
  const rows=[
   ['R0','average secondary cases from one case in a fully susceptible population','if R0 > 1 an epidemic can grow'],
   ['Re','the effective number once some are immune or measures are in place','control aims to push Re below 1'],
   ['Incidence','new cases per population per time','measures risk and the speed of spread'],
   ['Prevalence','existing cases at a point in time','incidence × duration; burden of chronic disease'],
   ['Attack rate','proportion of an exposed group who fall ill','used in a defined outbreak'],
   ['Case-fatality','proportion of cases who die','severity; distinct from mortality rate'],
   ['Koch / molecular','isolate, reinoculate, re-isolate; or inactivate and restore a gene','establishes that a microbe (or gene) causes a disease']];
  const t=wtable(n,['Measure','Definition','Use'],rows,
    n?[[10,9],[76,13],[200,15]]:[[24,10],[120,24],[380,28]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+14,'Epidemiology measures disease in populations. R0 is an intrinsic property of a pathogen in a setting; vaccination, treatment and behaviour lower it to Re. Koch’s postulates, and their molecular revision by Falkow (inactivate a gene, lose virulence; restore it, regain it), connect a single cause to a disease; they are covered in full in the koch primer.',n?50:92,'note start f13',17,.6);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
const S=[
 {p:1,title:'Disease as a meeting',draw:scP1,text:"Whether a microbe causes disease depends on its weapons, the host’s defences, the dose and the route. Pathogenesis studies how one microbe attaches, invades, resists and damages. Epidemiology scales that up to ask how disease moves through a population and how to stop it."},
 {p:1,title:'Steps of infection',draw:scP2,text:"Infection runs through a sequence: reach a portal of entry, adhere, colonise or invade, acquire nutrients and multiply while resisting defences, cause damage, and finally transmit to a new host. Each step is a hurdle, and a microbe’s virulence factors are the tools for clearing them."},
 {p:2,title:'Virulence factors',draw:scP3,text:"Virulence factors are the equipment of a pathogen: adhesins to grip, capsules to resist being eaten, systems to steal iron, invasins to force entry, enzymes to spread, and biofilms to persist. Many ride on mobile genetic elements, so virulence can jump between strains."},
 {p:2,title:'Toxins',chips:'tox',draw:scP4,text:"Toxins do damage at a distance or on contact. AB toxins have a binding part and an enzymatic part that attacks a precise target inside the cell; pore-forming toxins punch holes; superantigens hijack the immune system itself. Endotoxin is the wall of the Gram-negative microbe, not a secreted protein. Pick one."},
 {p:3,title:'Secretion-system effectors',draw:scP5,text:"Gram-negative pathogens use molecular machines to inject effector proteins directly into host cells. The type III system is a syringe related to the flagellum, used by Salmonella and Yersinia; the type IV system, kin to conjugation machinery, lets Legionella build a home inside a macrophage. Both reprogramme the host from within."},
 {p:3,title:'Immune evasion and antigenic variation',draw:scP6,text:"To persist, microbes hide, attack the immune response, or keep changing their surface. Antigenic variation is the most elegant: Neisseria, trypanosomes and Borrelia each switch their surface coat from a genetic archive faster than antibodies can catch up, which is why they cause recurrent or chronic disease and defy vaccines."},
 {p:3,title:'Colonization resistance and dysbiosis',draw:scP7,text:"The normal microbiota is itself a defence, occupying niches so pathogens cannot settle. Broad-spectrum antibiotics break this colonization resistance, and Clostridioides difficile seizes the opening to cause colitis. Transplanting a healthy donor’s stool restores the community and cures it, showing the community was the defence."},
 {p:4,title:'The epidemic curve',draw:scP8,text:"Plotting new cases against their date of onset shows an outbreak’s shape. A single sharp peak points to a common point source; a series of rising waves spaced one incubation period apart points to person-to-person spread. The curve guides the investigation before the lab confirms the cause."},
 {p:4,title:'Epidemiology basics',draw:scP9,text:"A few measures frame population disease: R0 and the effective Re for transmissibility, incidence and prevalence for how much disease there is, attack rate and case-fatality within an outbreak. Koch’s postulates and their molecular revision tie a specific microbe, or gene, to a specific disease."}];
const CHIPS={tox:{list:TOX.map(t=>t.k),get:()=>toxSel,set:k=>toxSel=k}};
