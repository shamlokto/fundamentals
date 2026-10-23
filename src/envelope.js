/*META
{"title":"Cell Envelopes","eyebrow":"Cell structure · an animated primer","h1":"The layers that hold a microbe together","parts":["Three envelopes","Peptidoglycan","Surface polymers","Archaea and the domains"],"foot":"Layer thicknesses and compositions are typical; species vary widely. Envelope assembly machines (Sec, Bam, Lol, Lpt) are covered in the protein-targeting primer, and septal wall synthesis in the cell-division primer.","description":"Gram-positive, Gram-negative and acid-fast envelopes; peptidoglycan chemistry and turnover; LPS, teichoic and mycolic acids; archaeal membranes, S-layers and the three domains."}
META*/
const LAY={om:['outer membrane','#D9C89B'],lps:['LPS','#C9A9D6'],pg:['peptidoglycan','#C6D3A8'],pgT:['thick peptidoglycan','#C6D3A8'],peri:['periplasm','#F1ECDF'],im:['cytoplasmic membrane','#EDE0B8'],ta:['teichoic acids','#E7A99B'],ag:['arabinogalactan','#E0C88A'],myc:['mycomembrane','#B9A0C8'],caps:['capsule','#E8E0CC'],sl:['S-layer','#A9C4DC'],arch:['ether-lipid membrane','#D6C79F'],cyto:['cytoplasm','#E4E8D4']};
function stack(n,x,y,w,layers,o={}){let s='',yy=y;
  layers.forEach(([k,h])=>{const L=LAY[k];
    if(k==='im'||k==='om'||k==='arch'||k==='myc')s+=membraneBand(x,x+w,yy,h,{fill:L[1]});
    else if(k==='lps'){s+=`<rect x="${x}" y="${yy}" width="${w}" height="${h}" fill="#F1ECDF"/>`;for(let i=x+6;i<x+w;i+=12)s+=`<path d="M${i} ${yy+h} v-${h-3}" stroke="#7D4A98" stroke-width="1.6"/><circle cx="${i}" cy="${yy+3}" r="2.4" fill="#7D4A98"/>`;}
    else if(k==='ta'){s+=`<rect x="${x}" y="${yy}" width="${w}" height="${h}" fill="#F1ECDF"/>`;}
    else if(k==='sl'){s+=`<rect x="${x}" y="${yy}" width="${w}" height="${h}" fill="#F1ECDF"/>`;for(let i=x+2;i<x+w-8;i+=14)s+=`<rect x="${i}" y="${yy+2}" width="11" height="${h-4}" rx="3" fill="${L[1]}" stroke="${INK}" stroke-width=".6"/>`;}
    else if(k==='pg'||k==='pgT'){s+=`<rect x="${x}" y="${yy}" width="${w}" height="${h}" fill="${L[1]}"/>`;for(let j=yy+4;j<yy+h-1;j+=7)s+=`<path d="M${x} ${j} H${x+w}" stroke="#7E8F5A" stroke-width="1" stroke-dasharray="10 3"/>`;}
    else s+=`<rect x="${x}" y="${yy}" width="${w}" height="${h}" fill="${L[1]}"${k==='caps'?' opacity=".8"':''}/>`;
    if(!o.nolab){let ly=yy+h/2+4;if(o._ly!=null&&ly<o._ly+14)ly=o._ly+14;o._ly=ly;s+=ln(x+w,FX(yy+h/2),x+w+10,FX(ly-4),'#9A8E78',.8)+T(x+w+13,FX(ly),L[0],'note start f11');}
    yy+=h;});
  return {s:s+`<rect x="${x}" y="${y}" width="${w}" height="${yy-y}" fill="none" stroke="${INK}" stroke-width=".8"/>`,y:yy};}
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
  art:(cx,cy)=>stack(true,cx-90,cy-70,90,[['lps',12],['om',16],['peri',14],['pg',8],['peri',12],['im',16],['cyto',20]]).s,artH:170});}
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
  let s='';const x0=n?30:50, y0=60, dx=n?40:52, k=n?6:6;
  const unit=(x,y,i)=>`<rect x="${x-9}" y="${y-8}" width="18" height="16" rx="3" fill="${i%2?'#C9A9D6':'#A9C4DC'}" stroke="${INK}" stroke-width=".8"/>`+Tc(x,y+4,i%2?'M':'G','#3A2E22',9,'mono mid','600');
  [0,1].forEach(r=>{const y=y0+r*(n?118:128);
    s+=G('a-fade',r*.3,`<path d="M${x0-14} ${y} H${x0+(k-1)*dx+14}" stroke="${INK}" stroke-width="1.4"/>`+[...Array(k)].map((_,i)=>unit(x0+i*dx,y,i)).join(''));
    for(let i=1;i<k;i+=2){const x=x0+i*dx, d=r?-1:1;const aa=['L-Ala','D-Glu','m-DAP','D-Ala'];
      s+=G('a-fade',(.6+r*.3).toFixed(1),aa.map((a,j)=>`<circle cx="${x}" cy="${y+d*(18+j*13)}" r="5" fill="${j===2?'#E0B84A':'#EFE6D2'}" stroke="${INK}" stroke-width=".7"/>`).join(''));}});
  for(let i=1;i<k;i+=2){const x=x0+i*dx;if(i===3)continue;s+=G('a-pop',1.4,`<path d="M${x+5} ${y0+18+3*13} L${x+5} ${y0+(n?118:128)-18-2*13-4}" stroke="#A4473A" stroke-width="2.2"/>`);}
  s+=G('a-fade',1.6,T(x0-14,y0-18,'glycan strand: GlcNAc (G) and MurNAc (M), β1→4','note start f11')+T(x0-14,y0+(n?118:128)+28,'red: 4→3 cross-link, D-Ala⁴ to m-DAP³','note start f11').replace('class=','style="fill:#A4473A" class='));
  const b=n?bullets(24,y0+(n?118:128)+56,[['Stem peptide','L-Ala–D-Glu–m-DAP (or L-Lys)–D-Ala–D-Ala on each MurNAc.'],['Transpeptidation','PBPs link D-Ala⁴ of one stem to the third residue of another, releasing the terminal D-Ala.'],['Variations','S. aureus bridges with five glycines; mycobacteria and stationary E. coli add 3→3 links made by L,D-transpeptidases, which most β-lactams do not block.']],44,{d0:1.8,gap:20})
    :bullets(400,52,[['Stem peptide','L-Ala–D-Glu–m-DAP (L-Lys in many Gram-positives)–D-Ala–D-Ala on each MurNAc. The D-amino acids resist ordinary proteases.'],['Transpeptidation','PBPs link D-Ala⁴ of one stem to the third residue of another, releasing the terminal D-Ala. β-lactams mimic that D-Ala–D-Ala.'],['Variations','S. aureus bridges with five glycines; mycobacteria and stationary-phase E. coli add 3→3 links made by L,D-transpeptidases, which most β-lactams do not block.']],30,{d0:1.8,gap:20});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,y0+(n?118:128)+50)),s:s+b.s};
}
function scV5(n){
  const N=n?{
    a:{x:90,y:40,w:150,t:'UDP-GlcNAc'},b:{x:90,y:104,w:150,t:'UDP-MurNAc'},c:{x:90,y:168,w:150,t:'UDP-MurNAc-|pentapeptide'},
    d:{x:270,y:168,w:110,t:'D-Ala–D-Ala'},e:{x:90,y:250,w:150,t:'lipid I',f:PAL.gold},f:{x:90,y:314,w:150,t:'lipid II',f:PAL.gold},
    g:{x:270,y:314,w:110,t:'lipid II|outside',f:PAL.gold},h:{x:270,y:400,w:130,t:'cross-linked|wall',f:'#C6D3A8'}}
   :{a:{x:65,y:50,w:110,t:'UDP-GlcNAc'},b:{x:205,y:50,w:110,t:'UDP-MurNAc'},c:{x:400,y:50,w:142,t:'UDP-MurNAc-|pentapeptide'},
    d:{x:570,y:50,w:110,t:'D-Ala–D-Ala'},e:{x:400,y:180,w:120,t:'lipid I',f:PAL.gold},f:{x:570,y:180,w:110,t:'lipid II',f:PAL.gold},
    g:{x:570,y:360,w:110,t:'lipid II|outside',f:PAL.gold},h:{x:250,y:360,w:140,t:'cross-linked|wall',f:'#C6D3A8'}};
  const E=n?[['a','b','MurA ⊣ fosfomycin; MurB',{side:-1,la:'start',lx:80}],['b','c','MurC–F',{side:-1,la:'start',lx:80}],['d','c','',{}],['c','e','MraY + Und-P',{side:-1,la:'start',lx:80}],['e','f','MurG',{side:-1,la:'start',lx:80}],['f','g','MurJ flips'],['g','h','PBPs, SEDS|⊣ β-lactams|⊣ vancomycin',{side:1,la:'start',lx:20}]]
    :[['a','b','MurA ⊣ fosfomycin|MurB',{side:-1,off:16}],['b','c','MurC–F',{side:-1,off:14}],['d','c','Ddl, Alr ⊣ cycloserine',{side:-1,off:34,lx:30}],['c','e','MraY + Und-P',{side:-1,la:'start'}],['e','f','MurG',{side:1}],['f','g','MurJ flips',{side:1}],['g','h','PBPs and SEDS polymerise and cross-link|⊣ β-lactams; vancomycin caps D-Ala–D-Ala',{side:1,off:20}]];
  const my=n?280:280;
  let s=G('a-fade',0,membraneBand(n?8:20,n?352:620,my-10,20)+T(n?12:24,my-16,'cytoplasm ↑','note start f11')+T(n?12:24,my+26,'outside ↓','note start f11'));
  s+=G('a-fade',.3,flow(N,E.filter(e=>!(e[3]&&e[3].none))));
  const H=n?430:420;
  const p=para(n?16:24,H,'The wall is built inside the cell, flipped across the membrane on the lipid carrier undecaprenyl phosphate, and assembled outside. Almost every step is an antibiotic target.',n?50:92,'note start f13',17,1.4);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:s+p.s};
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
  let s='';const x=n?40:60, y=40, w=n?60:70;
  const seg=(yy,h,f,lab,sub)=>box(x,yy,w,h,f,3)+T(x+w+12,yy+h/2+2,lab,'lab start f13')+T(x+w+12,yy+h/2+18,sub,'note start f11');
  s+=G('a-fade',0,seg(y,70,'#C9A9D6','O-antigen','repeating sugar units; serotype (e.g. O157)'));
  s+=G('a-fade',.3,seg(y+74,40,'#E0C88A','core oligosaccharide','includes Kdo and heptose'));
  s+=G('a-fade',.6,seg(y+118,44,'#E7A99B','lipid A','acylated glucosamine disaccharide: endotoxin'));
  s+=G('a-fade',.9,membraneBand(x-20,x+w+20,y+166,22)+T(x-20,y+206,'outer membrane (LPS in the outer leaflet)','note start f11'));
  const b=n?bullets(24,y+222,[['Endotoxin','Lipid A activates TLR4–MD-2; in blood it drives septic shock.'],['A barrier','LPS packs tightly with Mg²⁺ bridges, excluding detergents and hydrophobic drugs.'],['Colistin','Polymyxins bind lipid A; resistance comes from adding positive charges (mcr genes).']],44,{d0:1.2,gap:20})
    :bullets(400,52,[['Endotoxin','Hexa-acylated lipid A activates TLR4–MD-2 at picomolar levels; in blood it drives septic shock. Some pathogens remodel lipid A to evade it.'],['A barrier','LPS molecules pack tightly with Mg²⁺ bridges, excluding detergents, bile and hydrophobic antibiotics.'],['Colistin','Polymyxins bind lipid A and disrupt the membrane; resistance adds positive charges to lipid A, including by plasmid-borne mcr genes.']],30,{d0:1.2,gap:20});
  return {vb:n?slim(b.y-4):wide(Math.max(b.y-4,y+200)),s:s+b.s};
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
 {p:2,title:'Building the wall',draw:scV5,text:"Wall synthesis starts in the cytoplasm with nucleotide-sugar precursors, moves onto the lipid carrier undecaprenyl phosphate as lipid I and lipid II, crosses the membrane through MurJ, and ends outside where glycosyltransferases polymerise and transpeptidases cross-link. Fosfomycin, cycloserine, vancomycin and the β-lactams each block a different step."},
 {p:2,title:'Turnover and recycling',draw:scV6,text:"A growing wall must be cut as well as made. Autolysins open it for insertion and separate daughter cells, Gram-negatives recycle much of their wall each generation, and the recycled fragments double as signals, both inside the cell and to the host immune system."},
 {p:3,title:'Lipopolysaccharide',draw:scV7,text:"The outer leaflet of the Gram-negative outer membrane is made of lipopolysaccharide: lipid A, a core oligosaccharide and a variable O-antigen. Lipid A is the endotoxin that triggers septic shock; the dense, cation-bridged layer is also what keeps many antibiotics out."},
 {p:3,title:'Teichoic and mycolic acids',draw:scV8,text:"Gram-positive walls are threaded with teichoic acids, anionic polymers that shape the cell and bind ions, proteins and phages. Mycobacteria instead attach arabinogalactan and very long mycolic acids, forming a waxy outer layer that is the target of several tuberculosis drugs."},
 {p:4,title:'Archaea and the three domains',draw:scV9,text:"Archaeal membranes are built from isoprenoid chains joined by ether bonds to the opposite enantiomer of glycerol, and most archaea have a protein S-layer instead of a peptidoglycan wall. Together with their eukaryote-like information machinery, these features define the archaea as a domain of their own."}];
const CHIPS={env:{list:ENV.map(e=>e.k),get:()=>envSel,set:k=>envSel=k}};
