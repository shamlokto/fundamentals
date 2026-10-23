/*META
{"title":"Cell Envelopes","eyebrow":"Cell structure · an animated primer","h1":"The layers that hold a microbe together","parts":["Three envelopes","Peptidoglycan","Surface polymers","Archaea and the domains"],"foot":"Layer thicknesses and compositions are typical; species vary widely. Envelope assembly machines (Sec, Bam, Lol, Lpt) are covered in the protein-targeting primer, and septal wall synthesis in the cell-division primer.","description":"Gram-positive, Gram-negative and acid-fast envelopes; peptidoglycan chemistry and turnover; LPS, teichoic and mycolic acids; archaeal membranes, S-layers and the three domains."}
META*/
const LAY={om:['outer membrane, LPS outside','#D9C89B'],lps:['LPS sugar chains','#C9A9D6'],pg:['peptidoglycan','#C6D3A8'],pgT:['thick peptidoglycan','#C6D3A8'],peri:['periplasm','#F1ECDF'],im:['cytoplasmic membrane','#EDE0B8'],ta:['teichoic acids','#E7A99B'],ag:['arabinogalactan','#E0C88A'],myc:['mycomembrane','#B9A0C8'],caps:['capsule','#E8E0CC'],sl:['S-layer','#A9C4DC'],arch:['ether-lipid membrane','#D6C79F'],cyto:['cytoplasm','#E4E8D4']};
function stack(n,x,y,w,layers,o={}){let s='',yy=y,post='';
  layers.forEach(([k,h],idx)=>{const L=LAY[k], prev=idx?layers[idx-1][0]:'', next=layers[idx+1];
    if(k==='im'||k==='om'||k==='arch'||k==='myc'){s+=membraneBand(x,x+w,yy,h,{fill:L[1]});
      // LPS is the outer leaflet of the outer membrane: colour those head groups as LPS
      if(k==='om'&&prev==='lps')s+=`<path d="M${x+3} ${yy+3} H${x+w}" stroke="#7D4A98" stroke-width="4.5" stroke-dasharray="0.1 7" stroke-linecap="round"/>`;}
    else if(k==='lps'){s+=`<rect x="${x}" y="${yy}" width="${w}" height="${h}" fill="#F1ECDF"/>`;for(let i=x+6;i<x+w;i+=12)s+=`<path d="M${i} ${yy+h} v-${h-3}" stroke="#7D4A98" stroke-width="1.6"/><circle cx="${i}" cy="${yy+3}" r="2.4" fill="#7D4A98"/>`;}
    else if(k==='ta'){s+=`<rect x="${x}" y="${yy}" width="${w}" height="${h}" fill="#F1ECDF"/>`;
      // teichoic acids are threaded through the wall, so draw them over the next (peptidoglycan) layer
      const d=next?next[1]*.85:0;for(let i=x+8;i<x+w-4;i+=16)post+=`<path d="M${i} ${yy+1} v${FX(h+d)}" stroke="#B5584A" stroke-width="1.6"/>`;}
    else if(k==='sl'){s+=`<rect x="${x}" y="${yy}" width="${w}" height="${h}" fill="#F1ECDF"/>`;for(let i=x+2;i<x+w-8;i+=14)s+=`<rect x="${i}" y="${yy+2}" width="11" height="${h-4}" rx="3" fill="${L[1]}" stroke="${INK}" stroke-width=".6"/>`;}
    else if(k==='pg'||k==='pgT'){s+=`<rect x="${x}" y="${yy}" width="${w}" height="${h}" fill="${L[1]}"/>`;for(let j=yy+4;j<yy+h-1;j+=7)s+=`<path d="M${x} ${j} H${x+w}" stroke="#7E8F5A" stroke-width="1" stroke-dasharray="10 3"/>`;}
    else s+=`<rect x="${x}" y="${yy}" width="${w}" height="${h}" fill="${L[1]}"${k==='caps'?' opacity=".8"':''}/>`;
    if(!o.nolab){let ly=yy+h/2+4;if(o._ly!=null&&ly<o._ly+14)ly=o._ly+14;o._ly=ly;s+=ln(x+w,FX(yy+h/2),x+w+10,FX(ly-4),'#9A8E78',.8)+T(x+w+13,FX(ly),L[0],'note start f11');}
    yy+=h;});
  return {s:s+post+`<rect x="${x}" y="${y}" width="${w}" height="${yy-y}" fill="none" stroke="${INK}" stroke-width=".8"/>`,y:yy};}
const ENV=[
 {k:'Gram-negative',L:[['lps',12],['om',16],['peri',16],['pg',8],['peri',14],['im',16],['cyto',18]],rows:[['Example','Escherichia coli, Pseudomonas, Neisseria'],['Wall','a thin layer of peptidoglycan, 2–7 nm, in the periplasm'],['Outer membrane','asymmetric: phospholipid inside, lipopolysaccharide outside; porins let small solutes through'],['Gram stain','pink: the thin wall loses crystal violet when the outer membrane is dissolved by alcohol']],note:'The outer membrane is a permeability barrier that keeps out many antibiotics, detergents and bile; it is why vancomycin does not work on E. coli.'},
 {k:'Gram-positive',L:[['caps',14],['ta',6],['pgT',44],['im',16],['cyto',18]],rows:[['Example','Staphylococcus, Streptococcus, Bacillus'],['Wall','20–80 nm of peptidoglycan threaded with wall and lipoteichoic acids'],['Outer membrane','none; proteins are anchored to the wall by sortase or to lipids'],['Gram stain','purple: the thick, dehydrated wall traps the crystal-violet–iodine complex']],note:'Without an outer membrane, the thick wall is exposed: lysozyme and many antibiotics reach it directly, but it resists turgor and dehydration well.'},
 {k:'Acid-fast',L:[['caps',10],['myc',18],['ag',14],['pg',10],['im',16],['cyto',18]],rows:[['Example','Mycobacterium tuberculosis, M. smegmatis; Corynebacterium has a related envelope'],['Wall','peptidoglycan covalently linked to arabinogalactan, esterified to mycolic acids'],['Outer membrane','a mycomembrane of very long mycolic acids (C60–C90) and free glycolipids'],['Stain','retains carbol fuchsin even after acid-alcohol: acid-fast (Ziehl–Neelsen)']],note:'The waxy, nearly impermeable mycomembrane explains slow growth, resistance to disinfectants and many drugs, and why tuberculosis needs months of treatment with drugs such as isoniazid that block mycolic acid synthesis.'},
 {k:'Archaeon',L:[['sl',18],['peri',10],['arch',16],['cyto',18]],rows:[['Example','Haloferax, Sulfolobus, Methanococcus'],['Wall','usually none: a paracrystalline protein S-layer; some methanogens have pseudomurein'],['Membrane','isoprenoid chains ether-linked to glycerol-1-phosphate; in some, membrane-spanning tetraether monolayers'],['Gram stain','variable and not informative']],note:'Archaeal lipids are chemically unlike bacterial ones: the stereochemistry of the glycerol backbone is opposite, and the ether bonds and isoprenoids resist heat, acid and hydrolysis.'},
 {k:'No wall',L:[['im',16],['cyto',18]],rows:[['Example','Mycoplasma, Ureaplasma'],['Wall','none; the membrane contains sterols taken from the host'],['Outer membrane','none'],['Consequences','pleomorphic, osmotically fragile, naturally resistant to β-lactams and all other wall-targeting drugs']],note:'Mycoplasmas descend from Gram-positive ancestors and lost the wall along with much of their genome; they live where the host keeps them osmotically safe.'}];
let envSel=0;
function scV1(n){return introPlate(n,{q:'What surrounds a microbial cell, and why does it matter so much?',
  belief:'The envelope holds the cell together against turgor, decides what gets in, presents the cell to the immune system, and is the target of more antibiotics than any other structure. Its three main designs are the basis of the Gram stain and of much of clinical microbiology.',
  items:['Three bacterial envelopes and the Gram stain','Peptidoglycan: chemistry, synthesis, turnover','LPS, teichoic acids and mycolic acids','Archaeal membranes and S-layers','What distinguishes the three domains'],
  art:(cx,cy)=>stack(true,cx-110,cy-70,76,[['lps',12],['om',16],['peri',14],['pg',8],['peri',12],['im',16],['cyto',20]]).s,artH:170});}
function scV2(n){
  const steps=[['Crystal violet','All cells take up the purple dye.'],['Iodine','Forms a large dye–iodine complex inside the cell.'],['Alcohol or acetone','The decisive step: thin walls under a dissolved outer membrane release the complex; thick walls shrink and trap it.'],['Safranin','Decolourised cells are counterstained pink.']];
  const c=cards(n,steps.map(s=>[s[0],s[1]]),{y:20,cols:4,num:1,cw:6.2});
  const items=[['Gram-positive','purple','#6E3E8C'],['Gram-negative','pink','#C86A7A']];
  let s=c.s,y=c.y+20;
  items.forEach((it,i)=>{const x=(n?40:170)+i*(n?160:200);s+=G('a-fade',(1.2+i*.3).toFixed(1),coccus(x,y+26,18,{fill:it[2]})+coccus(x+30,y+30,18,{fill:it[2]})+T(x+15,y+70,it[0],'lab mid f13')+T(x+15,y+86,it[1],'note mid f11'));});
  const p=para(n?16:24,y+114,'Hans Christian Gram devised the stain in 1884. It works because of envelope architecture, not chemistry, so old or damaged Gram-positive cells can stain pink, and some groups (mycobacteria, archaea, mycoplasmas) do not fit the scheme at all.',n?50:92,'note start f13',17,1.6);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:s+p.s};
}
function scV3(n){
  const e=ENV[envSel];
  const st=stack(n,n?20:40,30,n?110:150,e.L.map(([k,h])=>[k,Math.round(h*1.5)]),{});
  const ex=explorer(n,{h:e.k,rows:e.rows,note:e.note},{y:n?st.y+40:30});
  if(!n){ // place the explorer to the right of the drawing
    const ex2=explorerAt(360,34,e);return {vb:wide(Math.max(st.y+20,ex2.y+10)),s:st.s+ex2.s};}
  return {vb:ex.vb,s:st.s+ex.s};
}
function explorerAt(x,y,e){let s=T(x,y,e.k,'cname start f16');y+=24;
  e.rows.forEach(r=>{const V=wrap(r[1],36);s+=T(x,y,r[0],'lab start f13')+V.map((l,j)=>T(x,y+17+j*16,l,'note start f12')).join('');y+=17+V.length*16+8;});
  const P=wrap(e.note,44);s+=P.map((l,j)=>T(x,y+8+j*16,l,'lab start f12')).join('');return {s,y:y+8+P.length*16};}
function scV4(n){
  // two glycan strands; stems hang from MurNAc only; offset so each 4→3 link runs diagonally
  // from D-Ala⁴ of a top stem to m-DAP³ of a bottom stem
  let s='';const x0=n?34:48, dx=n?52:50, k=6, y0=58, y1=n?208:214, st=15;
  const RES=[['L-Ala','#EFE6D2'],['D-Glu','#A8CFC9'],['m-DAP','#E0B84A'],['D-Ala','#E7A99B']];
  const unit=(x,y,m)=>`<rect x="${x-10}" y="${y-9}" width="20" height="18" rx="3" fill="${m?'#C9A9D6':'#A9C4DC'}" stroke="${INK}" stroke-width=".8"/>`+Tc(x,y+4,m?'M':'G','#3A2E22',9,'mono mid','600');
  const strand=(y,mOdd)=>`<path d="M${x0-16} ${y} H${x0+(k-1)*dx+16}" stroke="${INK}" stroke-width="1.4"/>`+[...Array(k)].map((_,i)=>unit(x0+i*dx,y,(i%2===1)===mOdd)).join('');
  const stem=(x,y,d)=>{let t=`<path d="M${x} ${y+d*9} V${y+d*(18+3*st)}" stroke="${INK}" stroke-width="1"/>`;
    RES.forEach((r,j)=>{t+=`<circle cx="${x}" cy="${y+d*(18+j*st)}" r="5.5" fill="${r[1]}" stroke="${INK}" stroke-width=".8"/>`;});return t;};
  const top=[1,3,5], bot=[0,2,4], ry=(y,d,j)=>y+d*(18+j*st);
  s+=G('a-fade',0,strand(y0,true)+top.map(i=>stem(x0+i*dx,y0,1)).join(''));
  s+=G('a-fade',.3,strand(y1,false)+bot.map(i=>stem(x0+i*dx,y1,-1)).join(''));
  // cross-links: top stem i → bottom stem i+1 (D-Ala⁴ → m-DAP³)
  s+=G('a-pop',1.2,[[1,2],[3,4]].map(([a,b])=>{const xa=x0+a*dx, xb=x0+b*dx, ya=ry(y0,1,3), yb=ry(y1,-1,2);
    const L=Math.hypot(xb-xa,yb-ya), ux=(xb-xa)/L, uy=(yb-ya)/L;
    return `<path d="M${FX(xa+ux*6)} ${FX(ya+uy*6)} L${FX(xb-ux*6)} ${FX(yb-uy*6)}" stroke="#A4473A" stroke-width="2.6" stroke-linecap="round"/>`;}).join(''));
  // label one stem
  const lx=x0+5*dx+12;
  s+=G('a-fade',1.5,RES.map((r,j)=>T(lx,ry(y0,1,j)+4,(j+1)+' '+r[0],'mono start f10')).join(''));
  s+=G('a-fade',1.6,T(x0-16,y0-20,'glycan strands: GlcNAc (G) and MurNAc (M), β1→4','note start f11')
    +Tc(x0-16,y1+34,'red: 4→3 cross-link, D-Ala⁴ of one stem to m-DAP³ of another','#A4473A',11,'note start'));
  const bx=n?24:372, by=n?y1+66:48;
  const items=[['Stem peptide','Attached to the lactyl group of MurNAc: L-Ala, D-Glu (linked through its γ-carboxyl), m-DAP (L-Lys in many Gram-positives), then D-Ala–D-Ala in the newly made unit.'],
    ['Transpeptidation','PBPs join the carbonyl of D-Ala⁴ on one stem to the side-chain amino group of m-DAP³ on another, releasing the fifth residue, D-Ala. β-lactams mimic that D-Ala–D-Ala end.'],
    ['Variations','S. aureus bridges Lys³ to D-Ala⁴ with five glycines; mycobacteria and stationary-phase E. coli add 3→3 links made by L,D-transpeptidases, which most β-lactams do not block.']];
  const b=bullets(bx,by,items,n?44:34,{d0:1.8,gap:20});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,y1+50)),s:s+b.s};
}
function scV5(n){
  // cytoplasmic steps above the membrane; lipid I and lipid II anchored in it by undecaprenyl pyrophosphate;
  // inhibitors in red, pointing at the enzyme they block
  const R='#A4473A';
  const bx=(cx,cy,w,t,f=PAL.cream,h)=>{const L=t.split('|');h=h||(L.length>1?46:34);
    return `<rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="6" fill="${f}" stroke="${INK}" stroke-width="1.2"/>`
      +L.map((l,i)=>Tc(cx,cy+5+(i-(L.length-1)/2)*17,l,'#2A2118',14,'mono mid','600')).join('');};
  const anch=(x,y1,y2)=>{let d=`M${x} ${y1}`;const st=(y2-y1)/6;for(let i=1;i<=6;i++)d+=` L${x+(i%2?4:-4)} ${FX(y1+i*st)}`;return `<path d="${d}" fill="none" stroke="#6A5B47" stroke-width="1.6"/>`;};
  const lab=(x,y,t,a='start')=>T(x,y,t,`lab ${a} f14 halo`);
  const red=(x,y,t,a='start')=>Tc(x,y,t,R,13,`note ${a} halo`,'600');
  let s='';
  if(!n){
    const my=246, mh=30;
    s+=G('a-fade',0,membraneBand(16,624,my,mh)+T(616,my-8,'cytoplasm','note end f13')+T(616,my+mh+18,'outside','note end f13'));
    s+=G('a-fade',.2,bx(78,50,124,'UDP-GlcNAc')+bx(236,50,124,'UDP-MurNAc')+bx(480,50,180,'UDP-MurNAc-|pentapeptide',PAL.cream,50)
      +arw(141,50,172,50)+lab(156,26,'MurA, B','mid')+red(156,82,'fosfomycin ⊣ MurA','mid')
      +arw(299,50,388,50)+lab(344,40,'MurC, D, E','mid'));
    s+=G('a-fade',.5,bx(78,150,96,'L-Ala')+bx(268,150,140,'D-Ala–D-Ala')+arw(127,150,196,150)+lab(162,140,'Alr, Ddl','mid')+red(162,176,'D-cycloserine ⊣','mid')+red(162,192,'Alr and Ddl','mid')
      +arw(340,140,414,78)+lab(386,122,'MurF','start'));
    s+=G('a-fade',.8,bx(480,my-24,110,'lipid I',PAL.gold)+anch(480,my-7,my+mh-4)
      +arw(480,76,480,my-43)+lab(490,150,'MraY','start')+T(490,168,'transfers to Und-P','note start f13')
      +bx(300,my-24,110,'lipid II',PAL.gold)+anch(300,my-7,my+mh-4)+arw(424,my-24,357,my-24)+lab(390,my-48,'MurG','mid'));
    s+=G('a-fade',1.1,arw(357,my-14,357,my+mh+26,{q:[400,my+mh/2]})+lab(392,my+mh/2+5,'MurJ flips','start')
      +bx(300,my+mh+40,110,'lipid II',PAL.gold)+anch(300,my+4,my+mh+22)
      +bx(84,my+mh+40,130,'cross-linked|wall','#C6D3A8')+arw(244,my+mh+40,152,my+mh+40)+lab(198,my+mh+76,'PBPs, SEDS','mid')
      +red(412,my+mh+46,'β-lactams ⊣ PBPs','start')+red(412,my+mh+64,'vancomycin binds the','start')+red(412,my+mh+80,'D-Ala–D-Ala of lipid II','start'));
    const p=para(24,my+mh+108,'Wall synthesis starts in the cytoplasm, moves onto the membrane as lipid I and lipid II, is flipped to the outside by MurJ, and ends with polymerisation and cross-linking. The carrier, undecaprenyl pyrophosphate, is recycled; bacitracin blocks that step.',84,'note start f14',18,1.4);
    return {vb:wide(p.y+8),s:s+p.s};
  }
  const my=330, mh=30;
  s+=G('a-fade',0,membraneBand(8,352,my,mh)+T(12,my-8,'cytoplasm','note start f13')+T(12,my+mh+18,'outside','note start f13'));
  const oy=my+mh+56;
  s+=G('a-fade',.2,bx(110,40,190,'UDP-GlcNAc')+arw(110,58,110,96)+lab(120,74,'MurA, B')+red(120,90,'fosfomycin ⊣ MurA')
    +bx(110,116,190,'UDP-MurNAc')+arw(110,134,110,170)+lab(120,156,'MurC, D, E')
    +bx(110,196,190,'UDP-MurNAc-|pentapeptide',PAL.cream,50));
  s+=G('a-fade',.5,bx(290,40,110,'L-Ala')+arw(290,58,290,96)+lab(284,72,'Alr,','end')+lab(284,88,'Ddl','end')
    +bx(290,116,120,'D-Ala–|D-Ala',PAL.cream,46)+red(290,158,'D-cycloserine','mid')+red(290,174,'⊣ Alr and Ddl','mid')
    +arw(260,140,206,180)+lab(250,196,'MurF','start'));
  s+=G('a-fade',.8,arw(110,222,110,my-43)+lab(120,262,'MraY: onto Und-P')
    +bx(130,my-24,104,'lipid I',PAL.gold)+anch(130,my-7,my+mh-4)
    +bx(276,my-24,104,'lipid II',PAL.gold)+anch(276,my-7,my+mh-4)+arw(183,my-24,223,my-24)+lab(203,my-48,'MurG','mid'));
  s+=G('a-fade',1.1,arw(330,my-12,330,oy-16,{q:[352,(my+oy)/2]})+lab(322,my+mh+16,'MurJ','end')
    +bx(276,oy,104,'lipid II',PAL.gold)+anch(276,my+4,oy-17)
    +bx(86,oy,124,'cross-linked|wall','#C6D3A8')+arw(223,oy,150,oy)+lab(186,oy+38,'PBPs, SEDS','mid')
    +red(16,oy+64,'β-lactams ⊣ PBPs')+red(16,oy+80,'vancomycin binds the D-Ala–D-Ala of lipid II'));
  const p=para(16,oy+108,'Wall synthesis starts in the cytoplasm, moves onto the membrane as lipid I and lipid II, is flipped outside by MurJ, then polymerised and cross-linked. The carrier is recycled; bacitracin blocks that step.',44,'note start f14',18,1.4);
  return {vb:slim(p.y+6),s:s+p.s};
}
function scV6(n){
  const items=[['Autolysins','Amidases, endopeptidases and lytic transglycosylases cut the wall so it can grow, divide and separate. Unchecked, they lyse the cell, which is part of how β-lactams kill.'],
   ['Recycling','E. coli breaks down nearly half of its wall each generation. Lytic transglycosylases release anhydro-muropeptides; AmpG imports them and the cell reuses the parts.'],
   ['A sensor for β-lactams','In Enterobacter, Citrobacter and Pseudomonas, recycled muropeptides control AmpR, which induces the chromosomal β-lactamase AmpC when the wall is damaged.'],
   ['Fragments as signals','Shed muropeptides are recognised by host NOD1 and NOD2 receptors, and in some bacteria trigger germination of spores.']];
  const c=cards(n,items,{y:20,num:1});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scV7(n){
  // a stretch of outer membrane: LPS in the outer leaflet (lipid A acyl chains in the bilayer, core, O-antigen of
  // varying length), phospholipids in the inner leaflet, Mg2+ bridging neighbouring LPS phosphates
  let s='';const x0=n?14:40, x1=n?214:330, top=34, mT=184, mB=264, LX=x1+26;
  const GN='#E7A99B', KDO='#E0C88A', HEP='#D9A441', OAG='#C9A9D6', TAIL='#8C6D46';
  s+=G('a-fade',0,`<rect x="${x0}" y="${mT}" width="${x1-x0}" height="${mB-mT}" fill="#EDE0B8"/>`+`<path d="M${x0} ${(mT+mB)/2} H${x1}" stroke="#C9B98F" stroke-width="1" stroke-dasharray="3 3"/>`
    +T(x0,mT-152,'outside','note start f12')+T(x0,mB+20,'periplasm','note start f12'));
  const step=n?40:52, xs=[];for(let x=x0+step/2;x<x1;x+=step)xs.push(x);
  const oLen=[4,6,0,5,3,6,4];
  let lps='';
  xs.forEach((x,i)=>{
    // lipid A: two glucosamines with phosphates, six acyl chains down into the outer leaflet
    for(let k=0;k<6;k++){const tx=x-12+k*4.8;lps+=`<path d="M${FX(tx)} ${mT+8} V${mT+36}" stroke="${TAIL}" stroke-width="1.6"/>`;}
    lps+=`<rect x="${x-13}" y="${mT-4}" width="12" height="11" rx="2" fill="${GN}" stroke="${INK}" stroke-width=".7"/><rect x="${x+1}" y="${mT-4}" width="12" height="11" rx="2" fill="${GN}" stroke="${INK}" stroke-width=".7"/>`
      +`<circle cx="${x-15}" cy="${mT+2}" r="2.6" fill="#B5584A"/><circle cx="${x+15}" cy="${mT+2}" r="2.6" fill="#B5584A"/>`;
    // core: Kdo then heptoses then hexoses
    const cy=[mT-12,mT-22,mT-32,mT-42,mT-52];
    lps+=`<path d="M${x} ${mT-4} V${mT-56}" stroke="${INK}" stroke-width=".8"/>`;
    cy.forEach((yy,j)=>lps+=`<circle cx="${x}" cy="${yy}" r="4.2" fill="${j<1?KDO:(j<3?HEP:'#F1E3B8')}" stroke="${INK}" stroke-width=".6"/>`);
    // O-antigen repeats (one molecule has none: rough LPS)
    const L=oLen[i%oLen.length];
    for(let r=0;r<L;r++){const yy=mT-64-r*14;lps+=`<path d="M${x} ${yy+4} V${yy+10}" stroke="${INK}" stroke-width=".8"/><rect x="${x-4}" y="${yy-5}" width="8" height="9" rx="1.5" fill="${OAG}" stroke="${INK}" stroke-width=".6"/>`;}
  });
  s+=G('a-fade',.3,lps);
  // Mg2+ between neighbouring lipid A phosphates
  let mg='';for(let i=0;i<xs.length-1;i++){const mx=(xs[i]+xs[i+1])/2;mg+=`<circle cx="${mx}" cy="${mT+2}" r="3.6" fill="#3E7FC1"/>`;}
  s+=G('a-pop',.8,mg);
  // inner leaflet: phospholipids
  let pl='';for(let x=x0+6;x<x1-2;x+=11){pl+=`<path d="M${x-1.5} ${mB-8} V${mB-36} M${x+1.5} ${mB-8} V${mB-36}" stroke="${TAIL}" stroke-width="1.2"/><circle cx="${x}" cy="${mB-5}" r="3.6" fill="#B89A5E"/>`;}
  s+=G('a-fade',.5,pl);
  // labels with brackets
  const br=(y1,y2,t,sub,d)=>G('a-fade',d,`<path d="M${x1+14} ${y1} h5 V${y2} h-5" stroke="#6A5B47" stroke-width="1" fill="none"/>`+T(LX,FX((y1+y2)/2+(sub&&!n?-2:4)),t,'lab start f13')+(sub&&!n?T(LX,FX((y1+y2)/2+14),sub,'note start f12'):''));
  s+=br(mT-140,mT-60,'O-antigen',n?'':'repeating sugar units; sets the serotype (e.g. O157)',1.0);
  s+=br(mT-56,mT-9,n?'core':'core oligosaccharide','Kdo (inner) and heptoses',1.2);
  s+=br(mT-6,(mT+mB)/2,'lipid A','glucosamine disaccharide, six acyl chains',1.4);
  s+=br((mT+mB)/2+2,mB,n?'phospholipid':'inner leaflet','phospholipid',1.6);
  s+=G('a-fade',1.8,`<circle cx="${x0+6}" cy="${mB+38}" r="3.6" fill="#3E7FC1"/>`+T(x0+16,mB+42,'Mg²⁺ bridges between phosphates','note start f12')+(n?'':T(x0,mB+62,'one molecule here is rough LPS, with no O-antigen','note start f12')));
  const yb=mB+(n?70:96);
  const b=n?bullets(24,yb,[['Endotoxin','Lipid A activates TLR4–MD-2; in blood it drives septic shock.'],['A barrier','LPS packs tightly with Mg²⁺ bridges, excluding detergents and hydrophobic drugs.'],['Colistin','Polymyxins bind lipid A; resistance comes from adding positive charges (mcr genes).']],44,{d0:2,gap:20})
    :bullets(24,yb,[['Endotoxin','Hexa-acylated lipid A activates TLR4–MD-2 at picomolar levels; in blood it drives septic shock. Some pathogens remodel lipid A to evade it.'],['A barrier','LPS molecules pack tightly with Mg²⁺ bridges, excluding detergents, bile and hydrophobic antibiotics.'],['Colistin','Polymyxins bind lipid A and disrupt the membrane; resistance adds positive charges to lipid A, including by plasmid-borne mcr genes.']],80,{d0:2,gap:18});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scV8(n){
  const items=[['Wall teichoic acids','Polymers of ribitol- or glycerol-phosphate attached to peptidoglycan; up to half the wall’s mass in some Gram-positives. They shape the cell, bind cations and phages, and position autolysins.'],
   ['Lipoteichoic acids','Similar polymers anchored in the membrane by a glycolipid. In the pneumococcus both carry phosphorylcholine, which choline-binding proteins grip.'],
   ['D-alanylation','The Dlt system adds D-alanine to teichoic acids, reducing negative charge and repelling cationic antimicrobial peptides.'],
   ['Mycolic acids','α-alkyl, β-hydroxy fatty acids of 60–90 carbons, esterified to arabinogalactan or to trehalose. Isoniazid and ethionamide block their synthesis; ethambutol blocks arabinan.']];
  const c=cards(n,items,{y:20,num:1});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scV9(n){
  const rows=[['Membrane lipids','ester-linked fatty acids, G3P','ether-linked isoprenoids, G1P','ester-linked fatty acids, G3P'],['Wall','peptidoglycan (most)','S-layer; pseudomurein in some','none, or cellulose/chitin'],['RNA polymerase','one, 5 subunits','one, many subunits, eukaryote-like','three or more'],['Translation start','formyl-Met','Met','Met'],['Nucleus, organelles','no','no','yes'],['Histones','no (HU, H-NS)','many have histones','yes'],['Introns in genes','rare','rare (tRNA, rRNA)','common']];
  const t=wtable(n,['Feature','Bacteria','Archaea','Eukarya'],rows,n?[[10,9],[80,12],[170,12],[270,10]]:[[24,16],[170,24],[340,26],[500,20]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+12,'The "lipid divide" between bacterial and archaeal membranes is one of the deepest differences in biology. Archaea share their information-processing machinery with eukaryotes but their cell plan with bacteria, a mosaic the Woese primer follows.',n?50:92,'note start f13',17,1);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
const S=[
 {p:1,title:'The envelope',draw:scV1,text:"Every microbe is wrapped in an envelope that resists turgor pressure, filters what enters, and faces the world. Bacteria use three main designs, archaea a fourth, and the differences between them drive the Gram stain, antibiotic spectra and immune recognition."},
 {p:1,title:'The Gram stain',draw:scV2,text:"Hans Christian Gram's stain, from 1884, still sorts most bacteria into two groups in a few minutes. Crystal violet and iodine form a complex inside the cell; alcohol washes it out of thin-walled cells with an outer membrane, while thick walls hold it. The result reflects envelope structure."},
 {p:1,title:'Five envelopes compared',chips:'env',draw:scV3,text:"Pick an envelope to see its layers, an example organism, and what the design means in practice. The differences explain why some drugs reach their targets in one group and not another."},
 {p:2,title:'Peptidoglycan',draw:scV4,text:"Peptidoglycan is a single bag-shaped molecule: glycan strands of alternating GlcNAc and MurNAc, cross-linked through short peptides that contain D-amino acids. The cross-links give it strength, and the enzymes that make them, the penicillin-binding proteins, are the targets of β-lactams."},
 {p:2,title:'Building the wall',draw:scV5,text:"Wall synthesis starts in the cytoplasm with nucleotide-sugar precursors, moves onto the lipid carrier undecaprenyl phosphate as lipid I and lipid II, crosses the membrane through MurJ, and ends outside where glycosyltransferases polymerise and transpeptidases cross-link. Each red label is a drug and the enzyme or substrate it blocks: fosfomycin inhibits MurA, D-cycloserine inhibits Alr and Ddl, β-lactams inhibit the PBPs, and vancomycin binds the D-Ala–D-Ala end of lipid II."},
 {p:2,title:'Turnover and recycling',draw:scV6,text:"A growing wall must be cut as well as made. Autolysins open it for insertion and separate daughter cells, Gram-negatives recycle much of their wall each generation, and the recycled fragments double as signals, both inside the cell and to the host immune system."},
 {p:3,title:'Lipopolysaccharide',draw:scV7,text:"The outer leaflet of the Gram-negative outer membrane is made of lipopolysaccharide: lipid A, a core oligosaccharide and a variable O-antigen. Lipid A is the endotoxin that triggers septic shock; the dense, cation-bridged layer is also what keeps many antibiotics out."},
 {p:3,title:'Teichoic and mycolic acids',draw:scV8,text:"Gram-positive walls are threaded with teichoic acids, anionic polymers that shape the cell and bind ions, proteins and phages. Mycobacteria instead attach arabinogalactan and very long mycolic acids, forming a waxy outer layer that is the target of several tuberculosis drugs."},
 {p:4,title:'Archaea and the three domains',draw:scV9,text:"Archaeal membranes are built from isoprenoid chains joined by ether bonds to the opposite enantiomer of glycerol, and most archaea have a protein S-layer instead of a peptidoglycan wall. Together with their eukaryote-like information machinery, these features define the archaea as a domain of their own."}];
const CHIPS={env:{list:ENV.map(e=>e.k),get:()=>envSel,set:k=>envSel=k}};
