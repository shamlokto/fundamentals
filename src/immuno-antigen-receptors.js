/*META
{"title":"Antigen Receptors and Genes","eyebrow":"Immunology · an animated primer","h1":"How lymphocytes build millions of receptors from a few hundred gene segments","parts":["The receptors","Assembling the genes","Diversity","Rules and history"],"foot":"Textbook level (Janeway, 9th edition, chapters 4 and 5). Gene-segment numbers are for the human loci and vary between people; mouse numbers differ.","description":"Antibody and T-cell receptor structure, gene segments, V(D)J recombination, the 12/23 rule, junctional and combinatorial diversity, allelic exclusion, and the experiments that showed genes rearrange."}
META*/
const HC=CAT[0], LC=CAT[2];
/* an IgG-shaped receptor: two heavy chains (blue), two light chains (gold), each domain a rounded box */
function abY(cx,cy,k,o={}){
  const d=(x,y,f,t)=>`<rect x="${FX(x-9*k)}" y="${FX(y-11*k)}" width="${FX(18*k)}" height="${FX(22*k)}" rx="${FX(6*k)}" fill="${f}" stroke="${INK}" stroke-width="1.1"/>`+(t&&o.lab?T(FX(x),FX(y+4),t,'mono mid f10'):'');
  let s='';
  [-1,1].forEach(sg=>{
    const hx=cx+sg*36*k, lx=cx+sg*56*k;
    s+=ln(FX(hx),FX(cy-9*k),FX(cx+sg*10*k),FX(cy+3*k),INK,1.4);            // hinge
    s+=d(cx+sg*10*k,cy+14*k,HC,'CH2')+d(cx+sg*10*k,cy+38*k,HC,'CH3');      // Fc
    s+=d(hx,cy-20*k,HC,'CH1')+d(hx,cy-44*k,HC,'VH');                       // heavy chain in the arm
    s+=d(lx,cy-20*k,LC,'CL')+d(lx,cy-44*k,LC,'VL');                        // light chain beside it
  });
  return s;
}
function scR1(n){return introPlate(n,{q:'How can a few hundred genes encode receptors for millions of different antigens?',
  belief:'Receptor genes are not inherited whole. Each developing lymphocyte picks one segment from each of several families, cuts out the DNA between them and joins them, adding random bases at the joints. The result is a new receptor gene, different in almost every cell.',
  items:['Antibody and T-cell receptor structure','Gene segments and their numbers','V(D)J recombination and the 12/23 rule','Sources of diversity','Allelic exclusion','How rearrangement was discovered'],
  art:(cx,cy)=>abY(cx,cy+6,1.25),artH:150});}
function scR2(n){
  const cx=n?180:180, cy=n?110:120;
  let s=G('a-fade',0,abY(cx,cy,n?1.5:1.7,{lab:1}));
  const lx=n?20:330;
  if(!n){s+=G('a-fade',.4,T(cx,cy-100,'antigen-binding sites at the tips','note mid f12')+T(cx,cy+92,'Fc stem: heavy-chain constant domains','note mid f12'));}
  const it=[['Two kinds of chain','Two identical heavy chains (blue) and two identical light chains (gold), held together by disulfide bonds.'],
   ['Variable and constant domains','The first domain of each chain varies between antibodies; the rest are constant. A VH and a VL domain pair to form each binding site.'],
   ['Two business ends','The two Fab arms bind antigen. The heavy-chain constant region sets the isotype, and the Fc stem carries the effector functions.']];
  const b=bullets(lx,n?260:40,it,n?44:40,{d0:.6,gap:20});
  const h=n?b.y:Math.max(b.y,cy+110);
  return {vb:n?slim(h-4):wide(h),s:s+b.s};
}
function scR3(n){
  const rows=[['Chains','two heavy + two light','α + β (most T cells), or γ + δ'],
   ['Binding sites','two per molecule','one per molecule'],
   ['Recognises','intact antigen of almost any kind','αβ: peptide bound to an MHC molecule; γδ: mostly other ligands'],
   ['Secreted form','yes: antibody','no'],
   ['Signalling partners','Igα and Igβ','the CD3 complex and ζ chains'],
   ['Changes after activation','class switching and somatic hypermutation','none: fixed once made']];
  const t=wtable(n,['','B-cell receptor','T-cell receptor'],rows,n?[[10,12],[110,16],[240,16]]:[[24,20],[200,30],[420,28]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+14,'Both receptors are members of the immunoglobulin superfamily, built from domains of about 110 amino acids, and both are assembled by the same gene-rearrangement machinery.',n?50:92,'note start f13',17,.8);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function scR4(n){
  const rows=[['Variable (V)','38–46','34–38','29–33'],['Diversity (D)','23','none','none'],['Joining (J)','6','5','4–5'],['Constant (C)','9','1','4–5']];
  const t=wtable(n,['Segment','Heavy chain','κ light','λ light'],rows,n?[[10,12],[120,9],[200,9],[280,9]]:[[24,20],[220,12],[360,12],[500,12]],{y0:30,R:n?354:620});
  const W=n?360:640, y=t.y+40, x0=n?20:40, x1=W-(n?20:40);
  let s=t.s+G('a-fade',.6,ln(x0,y,x1,y,INK,1.4));
  const seg=[['V',CAT[0],n?6:10],['D',CAT[1],n?3:4],['J',CAT[2],n?3:4],['C',CAT[3],n?2:3]];
  let x=x0+10;
  seg.forEach(([lab,f,k],j)=>{for(let i=0;i<k;i++){s+=G('a-pop',(.7+j*.15).toFixed(2),box(x,y-9,n?10:12,18,f,2));x+=n?13:15;}
    s+=G('a-fade',(.8+j*.15).toFixed(2),T(x-(n?13:15)*k/2-2,y+26,lab,'mono mid f12'));x+=n?12:22;});
  s+=G('a-fade',1.4,T(x1,y-16,'heavy-chain locus, not to scale','note end f12'));
  const p=para(n?16:24,y+50,'Numbers are functional segments in the human loci (Janeway, figure 5.4); some people carry more or fewer. The T-cell receptor loci are built the same way: β and δ chains have V, D and J segments, α and γ chains only V and J.',n?50:92,'note start f13',17,1.6);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:s+p.s};
}
function scR5(n){
  const N=n?{g:{x:180,y:40,w:200,t:'germline: V … D … J … C',f:CAT[6]},dj:{x:180,y:120,w:200,t:'step 1: D joined to J',f:CAT[1]},vdj:{x:180,y:200,w:200,t:'step 2: V joined to DJ',f:CAT[0]},m:{x:180,y:280,w:200,t:'transcribe, splice|VDJ joined to C',f:CAT[2]}}
    :{g:{x:110,y:70,w:170,t:'germline locus|V … D … J … C',f:CAT[6]},dj:{x:320,y:70,w:150,t:'step 1|D joined to J',f:CAT[1]},vdj:{x:530,y:70,w:150,t:'step 2|V joined to DJ',f:CAT[0]},m:{x:320,y:190,w:240,t:'RNA splicing joins|VDJ to the C exon',f:CAT[2]}};
  const E=[['g','dj','',{}],['dj','vdj','',{}],['vdj','m','',{}]];
  let s=G('a-fade',0,flow(N,E));
  const it=[['RAG1 and RAG2','Expressed only in developing lymphocytes, they recognise the signal sequences and cut the DNA beside the two chosen segments.'],
   ['Repair joins the ends','The cut ends are joined by the cell\'s general DNA double-strand-break repair (non-homologous end joining). The DNA between the segments is lost.'],
   ['Order','Heavy chains join D to J, then V to DJ. Light chains have no D and join V straight to J.']];
  const b=bullets(n?24:30,n?330:250,it,n?44:88,{d0:.6,gap:20});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
function scR6(n){
  const W=n?360:640, y=n?70:80, x0=n?20:40;
  let s='';
  const sw=n?30:42, rs=n?{12:22,23:38}:{12:30,23:52};
  let x=x0+(n?4:20);
  const seg=(lab,f)=>{const r=box(x,y-12,sw,24,f,3)+T(x+sw/2,y+5,lab,'mono mid f12');x+=sw;return r;};
  const rss=sp=>{const w=rs[sp];const r=`<rect x="${x}" y="${y-6}" width="${w}" height="12" fill="${sp===12?CAT[4]:CAT[5]}" stroke="${INK}" stroke-width="1"/>`+T(x+w/2,y-14,String(sp),'mono mid f11');x+=w;return r;};
  const gap=d=>{x+=d;return '';};
  s+=G('a-fade',0,ln(x0,y,W-(n?20:40),y,INK,1.2));
  s+=G('a-pop',.2,seg('V',CAT[0])+rss(23)+gap(n?16:40));
  s+=G('a-pop',.4,rss(12)+seg('D',CAT[1])+rss(12)+gap(n?16:40));
  s+=G('a-pop',.6,rss(23)+seg('J',CAT[2]));
  s+=G('a-fade',.8,`<rect x="${x0+(n?4:20)}" y="${y+24}" width="22" height="10" fill="${CAT[4]}" stroke="${INK}"/>`+T(x0+(n?32:48),y+33,'12-bp spacer',"note start f12")
    +`<rect x="${x0+(n?150:200)}" y="${y+24}" width="38" height="10" fill="${CAT[5]}" stroke="${INK}"/>`+T(x0+(n?194:244),y+33,'23-bp spacer',"note start f12"));
  s+=G('a-fade',.9,T(x0+(n?4:20),y+54,'shaded bars: recombination signal sequences (number = spacer length)','note start f12'));
  const it=[['Signal sequences','Each segment is flanked by a recombination signal sequence: a conserved heptamer and nonamer separated by a spacer of 12 or 23 base pairs.'],
   ['The rule','RAG joins a segment with a 12-bp spacer only to one with a 23-bp spacer. On the heavy-chain locus this lets D join J and V join D, but stops V joining J directly.'],
   ['Why it matters','The rule keeps the segments in the right order and makes sure a D segment is included in every heavy chain.']];
  const b=bullets(n?24:30,y+80,it,n?44:88,{d0:.8,gap:20});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
const DIV=[
 {h:'Combinatorial diversity',rows:[['What varies','which V, D and J segments are chosen'],['Heavy chain','about 40 V × 23 D × 6 J ≈ 5,500 combinations'],['Light chains','about 200 κ and 120 λ V–J combinations'],['Limit','fixed by the number of inherited segments']]},
 {h:'Junctional diversity',rows:[['What varies','the sequence at each joint'],['Lost bases','nucleotides trimmed from the cut ends'],['P nucleotides','short palindromes left when the hairpin ends are opened'],['N nucleotides','random bases added by TdT: in B cells mostly in heavy chains, in T cells in both chains'],['Effect','the third hypervariable loop (CDR3), at the centre of the binding site, is the most variable part']]},
 {h:'Chain pairing',rows:[['What varies','which heavy chain pairs with which light chain'],['Arithmetic','about 5,500 heavy × 320 light ≈ 1.8 million receptors before junctional diversity (Janeway gives about 1.9 million)'],['With junctions','the potential repertoire is estimated at over a hundred billion'],['T cells','α and β chains pair in the same way']]}];
function scR7(n){const c=DIV[divSel];return explorer(n,{h:c.h,sub:'source of receptor diversity',rows:c.rows,note:'Round numbers for human B cells, from the segment counts on plate 4. Somatic hypermutation adds more diversity later, but only in B cells after activation.'},{y:32});}
function scR8(n){
  const N=n?{h:{x:180,y:40,w:220,t:'heavy chain rearranges|first copy, then second',f:CAT[0]},p:{x:180,y:130,w:220,t:'pre-B-cell receptor|(heavy + surrogate light chain)',f:CAT[3]},s:{x:180,y:220,w:220,t:'stop heavy rearrangement;|start light chain',f:CAT[1]},l:{x:180,y:310,w:220,t:'κ first, then λ;|stop at the first that works',f:CAT[2]}}
    :{h:{x:100,y:70,w:170,t:'heavy chain: one copy,|then the other if needed',f:CAT[0]},p:{x:320,y:70,w:190,t:'pre-B-cell receptor|surrogate light chain',f:CAT[3]},s:{x:540,y:70,w:170,t:'stop heavy;|start light',f:CAT[1]},l:{x:320,y:190,w:240,t:'κ first, then λ;|stop at first that works',f:CAT[2]}};
  const E=[['h','p','',{}],['p','s','',{}],['s','l','',{}]];
  let s=G('a-fade',0,flow(N,E));
  const p=para(n?16:24,n?370:250,'A rearrangement is productive only if it keeps the reading frame, roughly one try in three, so the second copy is a back-up. Signals from the first working receptor shut the locus down. The result is one heavy and one light chain per cell (allelic exclusion), and either κ or λ, not both (isotypic exclusion). T cells exclude the β locus in the same way, but not α.',n?48:90,'note start f13',17,.8);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:s+p.s};
}
function scR9(n){
  const rows=[['1965','Dreyer and Bennett','propose that one antibody chain is encoded by two genes, one variable and one constant'],
   ['1976','Hozumi and Tonegawa','V and C sequences lie far apart in embryo DNA but together in an antibody-making tumour'],
   ['1978–80','several laboratories','J and D segments and the signal sequences are identified'],
   ['1987','Tonegawa','Nobel Prize for the genetic principle of antibody diversity'],
   ['1989–90','Schatz, Oettinger and Baltimore','RAG1 and RAG2, the genes that switch on recombination']];
  const t=wtable(n,['Year','Who','Finding'],rows,n?[[10,7],[66,14],[176,22]]:[[24,8],[100,22],[300,40]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+14,'The 1976 experiment compared DNA from mouse embryos with DNA from a mouse plasma-cell tumour. In embryo DNA, probes for the V and C regions bound two different restriction fragments; in tumour DNA both bound a single, smaller fragment, showing that the segments had been brought together.',n?50:92,'note start f13',17,.8);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
const S=[
 {p:1,title:'One cell, one specificity',draw:scR1,text:"Each B or T cell carries receptors of a single specificity, yet the population as a whole can recognise almost any antigen. This primer explains how a modest set of inherited gene segments is cut and joined to make that variety."},
 {p:1,title:'The antibody molecule',draw:scR2,text:"An antibody is made of two identical heavy chains and two identical light chains. The variable domains at the tips of the arms form the antigen-binding site; the constant region of the heavy chain decides what the antibody does."},
 {p:1,title:'B-cell and T-cell receptors',draw:scR3,text:"The B-cell receptor is a membrane-bound antibody. The T-cell receptor is built on the same plan, but it has only one binding site, is never secreted, and recognises a peptide held by an MHC molecule rather than a free antigen."},
 {p:2,title:'Gene segments',draw:scR4,text:"Receptor genes are inherited in pieces. Heavy chains are assembled from V, D and J segments; light chains from V and J. Each locus carries dozens of V segments, about two dozen D segments on the heavy-chain locus, a handful of J segments, and the constant-region exons."},
 {p:2,title:'V(D)J recombination',draw:scR5,text:"In a developing lymphocyte, the RAG enzymes cut the DNA next to two chosen segments, and the cell's DNA-repair machinery joins them. The heavy chain is joined D to J first, then V to DJ."},
 {p:2,title:'The 12/23 rule',draw:scR6,text:"Every segment is flanked by a recombination signal sequence with a spacer of either 12 or 23 base pairs. Joining happens only between a 12 and a 23 signal, which keeps segments joining in the right order."},
 {p:3,title:'Where the diversity comes from',chips:'div',draw:scR7,text:"Diversity comes from several sources that multiply together. Pick one to see how much it contributes."},
 {p:4,title:'Allelic exclusion',draw:scR8,text:"A B cell has two copies of each receptor locus but makes receptors from only one. Once a productive rearrangement makes a chain, further rearrangement of the other copy is switched off, so each cell keeps a single specificity."},
 {p:4,title:'How rearrangement was discovered',draw:scR9,text:"In 1965 Dreyer and Bennett proposed that one antibody chain is encoded by two separate genes. In 1976 Hozumi and Tonegawa showed that the gene segments lie far apart in embryonic DNA but close together in an antibody-making tumour."}];
let divSel=0;
const CHIPS={div:{list:['Combinatorial','Junctional','Chain pairing'],get:()=>divSel,set:k=>divSel=k}};
