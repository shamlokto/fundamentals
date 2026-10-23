/*META
{"title":"Microscopy and Structure","eyebrow":"Methods · an animated primer","h1":"How we see cells, molecules and atoms","parts":["Resolution","Light","Electrons","Structures"],"foot":"Resolution figures are typical best-case values and depend on wavelength, optics, labelling and sample; record values move every year. Check current method papers before quoting a number.","description":"The diffraction limit, light microscopy methods compared, super-resolution, electron microscopy, cryo-EM and cryo-electron tomography, a size scale, and structural biology from X-ray crystallography to AlphaFold."}
META*/
const MSC=[
 {k:'Bright-field',res:'~200 nm with an oil objective',shows:'objects that absorb light; in practice stained cells: shape, arrangement, Gram reaction, spores, capsules',live:'barely: unstained bacteria are nearly invisible, and most stains need fixed cells',lim:'Little contrast without stains; fixation and heat can distort cells.',note:'The Gram stain (Christian Gram, 1884) still starts most clinical identifications: crystal violet, iodine, alcohol, then safranin.',bg:'#F3EEE2',cell:'#7D4A98'},
 {k:'Phase contrast',res:'~200 nm',shows:'unstained cells, by turning small phase shifts from refractive-index differences into brightness',live:'yes: the standard way to watch bacteria grow and divide',lim:'Bright halos at edges; poor for thick samples such as mature biofilms.',note:'Frits Zernike invented phase contrast in the 1930s and won the 1953 Nobel Prize in Physics for it. Most time-lapse growth movies of bacteria use it.',bg:'#9A9384',cell:'#3A2E22'},
 {k:'Dark-field',res:'~200 nm, but detects thinner objects',shows:'only scattered light reaches the objective, so cells glow on black; thin objects below the resolution limit, such as spirochaetes and some flagella, become visible',live:'yes',lim:'Dust and debris shine as brightly as cells; sizes look inflated; no internal detail.',note:'Dark-field is the classic way to see Treponema pallidum, the syphilis spirochaete, which is too thin to see in bright-field.',bg:'#1E1A16',cell:'#F3EEE2'},
 {k:'DIC',res:'~200 nm',shows:'gradients in optical path length, rendered as relief-like shading; gives thin optical sections',live:'yes',lim:'The 3D look is shading, not true height; plastic dishes spoil the polarised light.',note:'Differential interference contrast, developed by Georges Nomarski in the 1950s, uses prisms to split and recombine polarised light.',bg:'#B8B0A0',cell:'#B8B0A0'},
 {k:'Widefield fluorescence',res:'~250 nm',shows:'specific molecules: fluorescent protein fusions, DNA dyes such as DAPI, membrane dyes such as FM 4-64, FISH probes',live:'yes, with fluorescent proteins',lim:'Out-of-focus light blurs the image; dyes bleach; strong light is phototoxic.',note:'The fluorophore absorbs one colour and emits a longer one; filters pass only the emission, so labelled molecules shine on a dark field.',bg:'#14181A',cell:'#7FD08A'},
 {k:'Confocal',res:'~200 nm laterally, ~500–700 nm in depth',shows:'optical sections and 3D stacks, for example of biofilms and infected tissue',live:'yes, but slower and with more light per point',lim:'Point scanning is slow; spinning-disk versions are faster but less flexible.',note:'A pinhole in front of the detector rejects light from outside the focal plane, a principle patented by Marvin Minsky in 1957.',bg:'#14181A',cell:'#7FD08A'},
 {k:'Light-sheet',res:'~300 nm laterally; depth set by the sheet',shows:'large, living samples imaged fast: biofilms, embryos, colonised host tissue',live:'yes: the gentlest option for long movies',lim:'Awkward sample mounting and very large data sets.',note:'A thin sheet of light enters from the side and the camera looks at right angles, so only the plane being imaged is illuminated. Huisken and Stelzer’s SPIM (2004) popularised it.',bg:'#14181A',cell:'#7FD08A'}];
let mscSel=1;
function mscArt(m,cx,cy,w){
  const h=96, x=cx-w/2, y=cy-h/2;
  let s=`<rect x="${FX(x)}" y="${FX(y)}" width="${w}" height="${h}" rx="6" fill="${m.bg}" stroke="${INK}" stroke-width="1"/>`;
  const P=[[-.32,-.15,0],[-.05,.18,25],[.22,-.2,-15],[.34,.14,60]];
  const k=mscSel;
  if(k===6)s+=`<rect x="${FX(x+2)}" y="${FX(cy-14)}" width="${w-4}" height="28" fill="#7FD08A" opacity=".18"/>`;
  P.forEach(([dx,dy,a],i)=>{const px=cx+dx*w, py=(k===6&&i%2===0)?cy:cy+dy*h*1.4, L=44, r=8, tr=`transform="rotate(${a} ${FX(px)} ${FX(py)})"`;
    const rr=(o)=>`<rect x="${FX(px-L/2)}" y="${FX(py-r)}" width="${L}" height="${2*r}" rx="${r}" ${o} ${tr}/>`;
    if(k===0)s+=rr(`fill="${m.cell}" opacity=".8" stroke="#3A2E22" stroke-width=".8"`);
    else if(k===1)s+=rr(`fill="none" stroke="#F3EEE2" stroke-width="5" opacity=".7"`)+rr(`fill="#3A2E22" opacity=".85"`);
    else if(k===2)s+=rr(`fill="none" stroke="#F3EEE2" stroke-width="2"`);
    else if(k===3)s+=`<g ${tr}><rect x="${FX(px-L/2-1)}" y="${FX(py-r-1)}" width="${L}" height="${2*r}" rx="${r}" fill="none" stroke="#F6F1E6" stroke-width="2"/><rect x="${FX(px-L/2+1)}" y="${FX(py-r+1)}" width="${L}" height="${2*r}" rx="${r}" fill="none" stroke="#4A4036" stroke-width="2"/></g>`;
    else if(k===4)s+=rr(`fill="${m.cell}" opacity=".25" stroke="${m.cell}" stroke-width="7" stroke-opacity=".25"`)+rr(`fill="${m.cell}" opacity=".7"`);
    else if(k===5)s+=rr(`fill="none" stroke="${m.cell}" stroke-width="2.4"`);
    else s+=rr(Math.abs(py-cy)<16?`fill="${m.cell}" opacity=".85"`:`fill="${m.cell}" opacity=".12"`);
  });
  if(k===6)s+=arw(x+4,cy,x+26,cy,{w:1.6,col:'#7FD08A'})+Tc(x+8,y+h-8,'side view: sheet from the left, camera above','#E8E2D2',12,'note start');
  return s;}
function scM1(n){return introPlate(n,{q:'How small a thing can we see, and how do we see it?',
  belief:'A bacterium is about a micrometre across, its ribosomes twenty nanometres and its atoms a tenth of a nanometre. Each step down needs a different trick: light and contrast, then fluorescence and super-resolution, then electrons, crystals and computation.',
  items:['Resolution and the diffraction limit','Light microscopy methods','Super-resolution','Electron microscopy and cryo-EM','A scale from atoms to cells','Crystallography, NMR and AlphaFold'],
  art:(cx,cy)=>{let s=rodCell2(cx,cy-18,120,24,{fill:'#E4E8D4'});
    [[-36,-22],[-10,-12],[18,-26],[40,-14],[-24,-6]].forEach(([dx,dy])=>{s+=`<circle cx="${cx+dx}" cy="${cy+dy}" r="3.2" fill="#BBA27A" stroke="${INK}" stroke-width=".5"/>`;});
    s+=ln(cx-50,cy+30,cx+50,cy+30,INK,2.4)+T(cx,cy+48,'1 µm','mono mid f11');
    return s+T(cx,cy+66,'a rod cell; dots stand for ribosomes (enlarged)','note mid f11');},artH:150});}
function scM2(n){
  const g=(x,m)=>Math.exp(-((x-m)**2)/(2*.3*.3));
  const mk=(x,y,w,h,sep,tt)=>{const A=axes(x,y,w,h,{xr:[-2,2],yr:[0,1.8],xt:[],yt:[],xlab:'position'});
    let s=A.s+curve(A,v=>g(v,-sep/2),{col:'#9A9384',w:1.4,dash:'4 3'})+curve(A,v=>g(v,sep/2),{col:'#9A9384',w:1.4,dash:'4 3'})+curve(A,v=>g(v,-sep/2)+g(v,sep/2),{col:'#2F5276'});
    s+=T(x+w/2,y-8,tt,'lab mid f13');return s;};
  let s=n?G('a-fade',0,mk(40,40,290,90,1.6,'two points, resolved: a dip between'))+G('a-fade',.4,mk(40,190,290,90,.5,'closer than d: one blur'))
    :G('a-fade',0,mk(40,40,250,110,1.6,'two points, resolved: a dip between'))+G('a-fade',.4,mk(350,40,250,110,.5,'closer than d: one blur'));
  const y0=n?340:220;
  const b=bullets(n?24:30,y0,[['d ≈ λ / 2NA','Ernst Abbe (1873): a lens images a point as a blur, and two points closer than about half the wavelength divided by the numerical aperture merge. With green light (~500 nm) and an oil objective (NA ~1.4), d is about 180–200 nm.'],['Depth is worse','Along the optical axis the limit is two to three times larger, about 500–700 nm.'],['Magnification is not resolution','Beyond about 1,000× a light microscope only enlarges the blur. A 1 µm bacterium is just five resolvable spots across.']],n?44:88,{d0:.8,gap:20});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scM3(n){
  const m=MSC[mscSel];
  const ex=explorer(n,{h:m.k,rows:[['Resolution',m.res],['What it shows',m.shows],['Live cells?',m.live],['Limitations',m.lim]],note:m.note,art:(cx,cy)=>mscArt(m,cx,cy,n?300:320),artH:104},{y:20});
  return ex;
}
function scM4(n){
  let s='';const cy=70, xs=n?[60,180,300]:[110,320,530];
  s+=G('a-fade',0,`<circle cx="${xs[0]}" cy="${cy}" r="30" fill="#7FD08A" opacity=".35"/><circle cx="${xs[0]}" cy="${cy}" r="30" fill="none" stroke="#A4473A" stroke-width="14" opacity=".55"/><circle cx="${xs[0]}" cy="${cy}" r="7" fill="#4F7A3F"/>`+T(xs[0],cy+52,'STED','lab mid f13')+T(xs[0],cy+68,'donut shrinks the spot','note mid f11'));
  let st='';for(let i=-4;i<=4;i++)st+=`<rect x="${FX(xs[1]-36+i*8+32)}" y="${cy-34}" width="4" height="68" fill="#2F5276" opacity=".35"/>`;
  s+=G('a-fade',.3,`<rect x="${xs[1]-36}" y="${cy-34}" width="72" height="68" fill="#EFE6D2" stroke="${INK}" stroke-width="1"/>`+st+T(xs[1],cy+52,'SIM','lab mid f13')+T(xs[1],cy+68,'striped light, ~2× gain','note mid f11'));
  let pa=`<rect x="${xs[2]-36}" y="${cy-34}" width="72" height="68" fill="#14181A" stroke="${INK}" stroke-width="1"/>`;
  [[-18,-12],[8,-20],[20,10],[-6,14],[-24,18],[14,-2]].forEach(([dx,dy],i)=>{pa+=i<2?`<circle cx="${xs[2]+dx}" cy="${cy+dy}" r="7" fill="#7FD08A" opacity=".45"/>`:'';pa+=`<circle cx="${xs[2]+dx}" cy="${cy+dy}" r="1.8" fill="#F3EEE2"/>`;});
  s+=G('a-fade',.6,pa+T(xs[2],cy+52,'PALM / STORM','lab mid f13')+T(xs[2],cy+68,'find each blinking centre','note mid f11'));
  const rows=[['STED','a doughnut of depletion light switches off fluorescence except at the centre','~30–80 nm','yes, scanned'],['SIM','patterned light; moiré fringes carry finer detail, recovered by computation','~100–120 nm','yes, fast'],['PALM / STORM','only a few molecules fluoresce at a time; each is localised to its centre over thousands of frames','~20–30 nm','mostly fixed'],['MINFLUX, expansion','localising with a light minimum; or swelling the sample in a gel about fourfold','a few nm to ~70 nm','fixed']];
  const t=wtable(n,['Method','Principle','Resolution','Live?'],rows,n?[[10,10],[86,22],[230,10],[300,7]]:[[24,14],[140,46],[440,14],[540,12]],{y0:n?170:170,d0:.8,R:n?354:620});
  const p=para(n?16:24,t.y+12,'Eric Betzig, Stefan Hell and William Moerner shared the 2014 Nobel Prize in Chemistry. In bacteria these methods showed that the FtsZ division ring is patchy and treadmilling, and mapped the positions of chemoreceptor arrays and chromosome loci.',n?50:92,'note start f13',17,1.2);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:s+t.s+p.s};
}
function scM5(n){
  const C1='#EFE6D2', N=n?{
     fix:{x:90,y:40,w:160,t:'fix, embed in resin,|cut thin sections'},t1:{x:270,y:40,w:160,t:'TEM: inside|cells',f:PAL.blue},
     neg:{x:90,y:110,w:160,t:'negative stain|(uranyl acetate)'},t2:{x:270,y:110,w:160,t:'TEM: particle|shapes, ~2 nm',f:PAL.blue},
     coat:{x:90,y:180,w:160,t:'dry, coat|with metal'},sem:{x:270,y:180,w:160,t:'SEM: surfaces',f:PAL.gold},
     vit:{x:90,y:290,w:160,t:'plunge-freeze|in vitreous ice',f:PAL.green},spa:{x:270,y:255,w:160,t:'single-particle|cryo-EM',f:PAL.lilac},et:{x:270,y:325,w:160,t:'FIB milling,|cryo-ET',f:PAL.lilac}}
   :{sp:{x:60,y:165,w:96,t:'specimen'},
     fix:{x:290,y:40,w:170,t:'fix, embed in resin,|cut thin sections'},t1:{x:515,y:40,w:190,t:'TEM: ultrastructure|inside cells',f:PAL.blue},
     neg:{x:290,y:115,w:170,t:'negative stain|(uranyl acetate)'},t2:{x:515,y:115,w:190,t:'TEM: particle shapes,|~2 nm',f:PAL.blue},
     coat:{x:290,y:190,w:170,t:'dry, coat with metal'},sem:{x:515,y:190,w:190,t:'SEM: surfaces in 3D|perspective',f:PAL.gold},
     vit:{x:290,y:290,w:170,t:'plunge-freeze|in vitreous ice',f:PAL.green},spa:{x:515,y:260,w:190,t:'single-particle cryo-EM|(purified complexes)',f:PAL.lilac},et:{x:515,y:325,w:190,t:'FIB milling, then|cryo-ET (cells)',f:PAL.lilac}};
  const E=[['fix','t1',''],['neg','t2',''],['coat','sem',''],['vit','spa',''],['vit','et','']];
  if(!n)E.push(['sp','fix',''],['sp','neg',''],['sp','coat',''],['sp','vit','']);
  let s=G('a-fade',0,flow(N,E));
  const by=n?380:370;
  const b=bullets(n?24:30,by,[['Short wavelength, other limits','Electrons accelerated through 300 kV have a wavelength of about 2 picometres. Lens aberrations, specimen thickness and radiation damage, not wavelength, set the real limit.'],['A vacuum inside','Samples must be dry, embedded or frozen. Ernst Ruska and Max Knoll built the first electron microscope in 1931; Ruska shared the 1986 Nobel Prize in Physics.'],['Contrast from heavy metals','Biological atoms scatter electrons weakly, so classical EM stains with uranium, lead or osmium; cryo-EM instead images unstained frozen samples at very low dose.']],n?44:88,{d0:1,gap:20});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scM6(n){
  const ice=(cx,cy,W)=>{let s=`<rect x="${FX(cx-50)}" y="${cy-20}" width="100" height="40" fill="#DCE6E8" stroke="${GLASSE}" stroke-width="1"/>`;
    [[-34,-6,20],[-12,8,80],[10,-8,140],[32,6,40],[-26,10,110],[22,-10,0]].forEach(([dx,dy,a])=>{s+=`<rect x="${FX(cx+dx-6)}" y="${FX(cy+dy-3)}" width="12" height="6" rx="3" fill="#7D4A98" transform="rotate(${a} ${FX(cx+dx)} ${FX(cy+dy)})"/>`;});return s;};
  const spa=(cx,cy)=>{let s='';for(let i=0;i<4;i++)s+=`<rect x="${cx-62+i*14}" y="${cy-14}" width="12" height="12" fill="#9A9384" opacity="${.4+i*.12}"/>`;
    return s+arw(cx-2,cy-8,cx+20,cy-8)+blob(cx+44,cy-8,18,13,'#C9A9D6');};
  const tilt=(cx,cy)=>{let s='';[-50,-25,0,25,50].forEach(a=>{s+=`<line x1="${cx}" y1="${cy+16}" x2="${FX(cx+30*Math.sin(a*Math.PI/180))}" y2="${FX(cy+16-30*Math.cos(a*Math.PI/180))}" stroke="#2F5276" stroke-width="1.2" opacity=".7"/>`;});
    return s+`<rect x="${cx-24}" y="${cy+12}" width="48" height="8" fill="#DCE6E8" stroke="${GLASSE}"/>`;};
  const fib=(cx,cy)=>`<rect x="${cx-40}" y="${cy-14}" width="80" height="28" rx="12" fill="#E4E8D4" stroke="${INK}" stroke-width="1"/><rect x="${cx-42}" y="${cy-16}" width="84" height="12" fill="#A4473A" opacity=".35"/><rect x="${cx-42}" y="${cy+4}" width="84" height="12" fill="#A4473A" opacity=".35"/>`+ln(cx-60,cy-4,cx+60,cy-4,'#2F5276',1,'2 2')+ln(cx-60,cy+4,cx+60,cy+4,'#2F5276',1,'2 2');
  const items=[['Vitrification','Plunging a thin film into liquid ethane at about −180 °C freezes water so fast it forms glass, not crystals. Jacques Dubochet developed it in the 1980s.',ice],
    ['Single-particle analysis','Hundreds of thousands of noisy images of identical complexes in random orientations are sorted and averaged into a 3D map, often at 2–4 Å since direct electron detectors arrived around 2013.',spa],
    ['Cryo-electron tomography','Tilting the frozen sample through about ±60° gives a 3D reconstruction of one unique object, such as a whole thin cell; repeated complexes can then be averaged in situ.',tilt],
    ['FIB milling','Most cells are too thick for electrons. A focused ion beam mills away material above and below, leaving a lamella about 100–200 nm thick to image by tomography.',fib]];
  const c=cards(n,items,{y:20,artH:54});
  const p=para(n?16:24,c.y+10,'Dubochet, Joachim Frank and Richard Henderson shared the 2017 Nobel Prize in Chemistry for cryo-EM. The record is now near 1.2 Å for very rigid particles such as apoferritin.',n?50:92,'note start f13',17,1.2);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:c.s+p.s};
}
function scM7(n){
  const x0=n?120:170, x1=n?346:610, lo=Math.log10(.05), hi=Math.log10(1e5);
  const px=v=>x0+(Math.log10(v)-lo)/(hi-lo)*(x1-x0);
  const top=para(n?16:24,24,'Sizes on a log scale: each tick is ten times the last. A method can resolve an object’s shape only when its resolution is well below the object’s size.',n?50:92,'lab start f13',17,0);
  const y0=top.y+(n?40:36);
  const items=[['carbon atom',.15,PAL.grey,'~0.15 nm'],['a protein (50 kDa)',5,PAL.green,'~5 nm'],['70S ribosome',20,PAL.gold,'~20 nm'],['a virus',100,PAL.rose,'~30–300 nm'],['E. coli cell',2000,PAL.blue,'~2 µm'],['human cell',20000,PAL.lilac,'~20 µm']];
  const bh=16,gap=n?14:12, H=items.length*(bh+gap);
  let s='';
  const R=[[.2,n?'EM':'~0.2 nm: cryo-EM, X-ray',0],[20,n?'super-res':'~20 nm: super-resolution',1],[200,n?'light':'~200 nm: light',0],[1e5,n?'eye':'0.1 mm: eye',1]];
  R.forEach(([v,l,row],i)=>{const X=FX(px(v));s+=G('a-fade',(.8+i*.15).toFixed(2),ln(X,y0-8,X,y0+H,'#A4473A',1.2,'4 3')+T(X,y0-14-row*14,l,`note ${i===3?'end':'mid'} f11 halo`));});
  items.forEach((it,i)=>{const y=y0+i*(bh+gap), w=Math.max(2,px(it[1])-x0);
    s+=G('a-fade',(i*.12).toFixed(2),T(x0-8,y+bh-4,it[0],'lab end '+(n?'f11':'f12'))+box(x0,y,FX(w),bh,it[2],2)+(n&&i>=4?T(FX(x0+w-6),y+bh-4,it[3],'mono end f10'):T(FX(x0+w+6),y+bh-4,it[3],'mono start f10 halo')));});
  const ay=y0+H+4;
  s+=ln(x0,ay,x1,ay,'#6A5B47',1.2);
  [[.1,'0.1 nm'],[1,'1 nm'],[10,'10'],[100,'100'],[1000,'1 µm'],[1e4,'10'],[1e5,'100 µm']].forEach(([v,l],i)=>{const X=FX(px(v));s+=ln(X,ay,X,ay+4,'#6A5B47',1)+T(X,ay+16,n&&i%2?'':l,`note ${i===6?'end':'mid'} f10`);});
  const p=para(n?16:24,ay+40,'Light microscopes resolve cells but not their molecules; super-resolution reaches large complexes; only electrons, X-rays and NMR reach atoms. An ångström (Å) is 0.1 nm, about the radius of an atom.',n?50:92,'note start f13',17,1.4);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:top.s+s+p.s};
}
function scM8(n){
  const rows=[['X-ray crystallography','ordered crystals of the molecule','~1–3 Å','about four in five PDB entries; enzymes with bound ligands, drug design'],['NMR','concentrated, isotope-labelled protein in solution, usually under ~40 kDa','ensemble of models','dynamics, flexible regions, small domains'],['Cryo-EM (single particle)','purified complexes in ice, easiest above ~100 kDa','~2–4 Å','large assemblies, membrane proteins, several states'],['Cryo-ET with averaging','cells or lamellae','~10 Å; at best ~3–4 Å','complexes in their native setting']];
  const t=n?wtable(n,['Method','Typical','Sample; best for'],rows.map(r=>[r[0],r[2],r[1]+'; '+r[3]]),[[10,12],[104,9],[176,26]],{y0:30,R:354})
    :wtable(n,['Method','Sample','Typical','Best for'],rows,[[24,16],[160,30],[370,14],[470,22]],{y0:30,R:620});
  const A=axes(n?30:60,t.y+72,n?300:520,0,{xr:[1,20],yr:[0,1],logx:1,xt:[[1,'1 Å'],[2,'2'],[5,'5'],[10,'10'],[20,'20 Å']],yt:[]});
  const L=[[1.2,'atoms separate',0],[3,'side chains',1],[4.5,'β-strands part',0],[8,'helices as rods',1],[20,'overall shape',0]];
  let s=G('a-fade',.8,A.s.replace(/<path d="M[^"]*V[^"]*H[^"]*"/,`<path d="M${A.x} ${A.y} H${A.x+A.w}"`)+L.map(([v,l,r])=>{const X=FX(A.px(v));return `<circle cx="${X}" cy="${A.y}" r="4" fill="#2F5276"/>`+T(X,A.y-12-r*15,l,`note ${v>15?'end':v<1.5?'start':'mid'} f11`);}).join(''));
  s+=T(n?16:24,t.y+22,'What a map shows at each resolution (smaller is better)','lab start f13');
  const p=para(n?16:24,A.y+40,'Resolution is quoted in ångströms: 1 Å is 0.1 nm, and a carbon–carbon bond is about 1.5 Å. The Protein Data Bank, founded in 1971, now holds over 200,000 experimental structures.',n?50:92,'note start f13',17,1.2);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+s+p.s};
}
function scM9(n){
  const A=n?axes(54,40,280,130,{xr:[1,300],yr:[20,100],xt:[[1,'1'],[150,'150'],[300,'300']],yt:[[50,'50'],[70,'70'],[90,'90']],xlab:'residue',ylab:'pLDDT'})
    :axes(70,40,300,150,{xr:[1,300],yr:[20,100],xt:[[1,'1'],[100,'100'],[200,'200'],[300,'300']],yt:[[50,'50'],[70,'70'],[90,'90']],xlab:'residue',ylab:'pLDDT'});
  const band=(a,b,c)=>`<rect x="${A.x}" y="${FX(A.py(b))}" width="${A.w}" height="${FX(A.py(a)-A.py(b))}" fill="${c}" opacity=".35"/>`;
  let s=band(90,100,'#2F5276')+band(70,90,'#8FB1CF')+band(50,70,'#E0C88A')+band(20,50,'#E7A99B')+A.s;
  const f=x=>{const dom=(m,w)=>Math.exp(-(((x-m)/w)**6));return 30+62*Math.max(dom(85,62),dom(225,55))+3*Math.sin(x/7);};
  s+=G('a-fade',.4,curve(A,f,{col:'#3A2E22',n:200})+T(FX(A.px(85)),FX(A.py(97)),'domain 1','note mid f10 halo')+T(FX(A.px(225)),FX(A.py(97)),'domain 2','note mid f10 halo')+T(FX(A.px(158)),FX(A.py(38)),'linker','note mid f10 halo'));
  const items=[['AlphaFold2 (2020–21)','DeepMind’s network predicted structures close to experimental accuracy at the CASP14 assessment in 2020; the paper and a database with EMBL-EBI followed in 2021, now over 200 million predictions.'],['pLDDT, per residue','0–100. Above 90 very high, 70–90 confident, below 50 usually disordered. It is a confidence score, not a measured quantity.'],['PAE, per pair','Predicted aligned error, in Å: whether the relative position of two domains is trustworthy, even when each domain is.'],['Limitations','One static conformation; ligands, cofactors and the effects of point mutations are often missed; complexes need multimer versions. A prediction is a hypothesis to test.']];
  let b;
  if(n)b=bullets(24,A.y+A.h+60,items,44,{d0:.8,gap:18});
  else{const r=bullets(410,52,items.slice(1,3),28,{d0:.8,gap:28,nonum:1});const lo=bullets(30,Math.max(r.y,A.y+A.h+62),[items[0],items[3]],88,{d0:1.4,gap:28,nonum:1});b={s:r.s+lo.s,y:lo.y};}
  const p=para(n?16:24,b.y+4,'Demis Hassabis and John Jumper shared the 2024 Nobel Prize in Chemistry with David Baker, whose lab built RoseTTAFold and designs new proteins.',n?50:92,'note start f13',17,2);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:s+b.s+p.s};
}
const S=[
 {p:1,title:'Seeing small',draw:scM1,text:"Microscopy and structural biology answer one question at different scales: what does it look like? The answer depends on resolution, the smallest separation at which two points stay distinct, and on contrast, which decides whether anything is visible at all."},
 {p:1,title:'The diffraction limit',draw:scM2,text:"Light bends around small objects, so a lens images a point as a blur. Ernst Abbe showed that two points closer than about half the wavelength divided by the numerical aperture cannot be separated. For visible light that is about 200 nanometres, a fifth of a typical bacterium."},
 {p:2,title:'Light microscopy methods',chips:'msc',draw:scM3,text:"Most bacteria are colourless and nearly transparent, so light microscopes differ mainly in how they create contrast. Pick a method to compare its resolution, what it shows, whether cells can stay alive, and its limitations."},
 {p:2,title:'Super-resolution',draw:scM4,text:"Super-resolution methods get round the diffraction limit by controlling which molecules fluoresce, rather than by better lenses. STED shrinks the emitting spot, SIM extracts finer detail from patterned light, and PALM and STORM localise single molecules one at a time."},
 {p:3,title:'Electron microscopy',draw:scM5,text:"Fast electrons have a wavelength about a hundred thousand times shorter than visible light, so electron microscopes can approach atomic detail. Transmission EM looks through thin sections or stained particles, scanning EM looks at surfaces, and cryo-EM images frozen, unstained samples."},
 {p:3,title:'Cryo-EM and tomography',draw:scM6,text:"Cryo-EM freezes samples so fast that water becomes glass, preserving their native state. Single-particle analysis averages many copies of a purified complex into a near-atomic map; cryo-electron tomography reconstructs whole cells, after ion-beam milling has thinned them."},
 {p:3,title:'From atoms to cells',draw:scM7,text:"Biological objects span about five orders of magnitude, from atoms to cells. The dashed lines show roughly what each class of method can resolve: the eye stops at a tenth of a millimetre, light at a fifth of a micrometre, and electrons and X-rays reach atoms."},
 {p:4,title:'Atomic structures',draw:scM8,text:"Three methods give most atomic structures. X-ray crystallography needs crystals, NMR works in solution for smaller proteins, and cryo-EM needs neither but works best for large complexes. The resolution number tells you which features in a map you can trust."},
 {p:4,title:'Structure prediction',draw:scM9,text:"AlphaFold2 showed in 2020 that a neural network trained on known structures can predict many protein structures from sequence alone. Its confidence scores matter as much as the model: pLDDT for each residue and the predicted aligned error between parts."}];
const CHIPS={msc:{list:MSC.map(m=>m.k),get:()=>mscSel,set:k=>mscSel=k}};
