/*META
{"title":"Class Switching and Effector Functions","eyebrow":"Immunology · an animated primer","h1":"How a B cell changes what its antibody does without changing what it binds","parts":["The classes","Switching","What antibodies do","Species and history"],"foot":"Textbook level (Janeway, 9th edition, chapters 5 and 10). Serum levels and half-lives are typical adult human values and vary between people.","description":"The five antibody classes, class-switch recombination and its cytokine control, Fc receptors, complement, FcRn, and how human and mouse IgG subclasses differ."}
META*/
function scC1(n){return introPlate(n,{q:'How can one B-cell clone make IgM, then IgG, then IgA, all binding the same antigen?',
  belief:'The variable region decides what an antibody binds; the constant region decides what it does. Class switching swaps the constant region by cutting out DNA, keeping the same variable region. Cytokines from helper T cells choose the new class, matching the antibody to the kind of infection.',
  items:['The five classes','Class-switch recombination','Cytokines choose the class','Fc receptors','Complement and FcRn','Human and mouse IgG subclasses'],
  art:(cx,cy)=>['IgM','IgG','IgA','IgE'].map((t,i)=>box(cx-140+i*72,cy-14,60,28,CAT[i],4)+T(cx-110+i*72,cy+5,t,'mono mid f12')).join('')+T(cx,cy+40,'same V region, different C region','note mid f12'),artH:110});}
function scC2(n){
  const rows=[['IgM','pentamer (membrane monomer)','~1.5','first antibody made; strong complement activation'],
   ['IgD','monomer','~0.03','mostly on naive B cells, with IgM'],
   ['IgG','monomer','~12','the main serum antibody; crosses the placenta; four subclasses in humans'],
   ['IgA','monomer in blood; dimer in secretions','~3','the main antibody at mucosal surfaces; two subclasses in humans'],
   ['IgE','monomer','trace','binds mast cells and basophils; worms and allergy']];
  const t=wtable(n,['Class','Form','mg/mL','Main role'],rows,n?[[10,5],[60,10],[150,7],[214,16]]:[[24,6],[90,20],[290,10],[390,30]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+14,'The class is set by the heavy-chain constant region: μ, δ, γ, α or ε. Light chains (κ or λ) are shared by all classes.',n?50:92,'note start f13',17,.8);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function scC3(n){
  const W=n?360:640, y=n?60:70, x0=n?14:30;
  const genes=['VDJ','μ','δ','γ3','γ1','α1','γ2','γ4','ε','α2'];
  const gw=n?29:52, gap=n?4:8;
  let s=G('a-fade',0,ln(x0,y,W-x0,y,INK,1.2));
  genes.forEach((g,i)=>{const x=x0+i*(gw+gap);s+=G('a-pop',(.1+i*.06).toFixed(2),box(x,y-12,gw,24,i===0?CAT[0]:(g==='γ1'?CAT[2]:CAT[6]),3)+T(x+gw/2,y+5,g,'mono mid '+(n?'f10':'f12')));});
  s+=G('a-fade',.9,T(x0,y+34,'human heavy-chain constant genes (pseudogenes not shown)','note start f12'));
  const y2=y+80;
  const after=['VDJ','γ1','α1','γ2','γ4','ε','α2'];
  let r=ln(x0,y2,x0+after.length*(gw+gap)-gap+6,y2,INK,1.2);
  after.forEach((g,i)=>{const x=x0+i*(gw+gap);r+=box(x,y2-12,gw,24,i===0?CAT[0]:(i===1?CAT[2]:CAT[6]),3)+T(x+gw/2,y2+5,g,'mono mid '+(n?'f10':'f12'));});
  const cx=x0+after.length*(gw+gap)+(n?34:40), cr=n?19:20;
  r+=`<circle cx="${cx}" cy="${y2}" r="${cr}" fill="none" stroke="${INK}" stroke-dasharray="3 2"/>`+T(cx,y2+4,n?'μδγ3':'μ δ γ3','mono mid f10');
  s+=G('a-fade',1.2,r+T(x0,y2+34,n?'after IgG1: μ, δ, γ3 lost as a switch circle':'after switching to IgG1: μ, δ and γ3 are lost as a switch circle; downstream genes remain','note start f12'));
  const it=[['Switch regions','Each constant gene except δ is preceded by a long repetitive switch region. AID creates breaks in the μ switch region and in the target switch region.'],
   ['Deletion','The two breaks are joined by end-joining repair and the DNA between them is lost as a circle, so switching is irreversible on that chromosome, although the cell can still switch further downstream, for example from IgG1 to IgE.'],
   ['Same specificity','The VDJ exon is untouched, so the new antibody binds the same antigen.']];
  const b=bullets(n?24:30,y2+62,it,n?44:88,{d0:1.4,gap:20});
  return {vb:n?slim(b.y-4):wide(b.y-4),s:s+b.s};
}
const CYT=[
 {k:'IL-4',rows:[['Made by','Th2 and Tfh cells'],['Human','IgG4 and IgE'],['Mouse','IgG1 and IgE'],['Typical setting','worm infections; allergy']]},
 {k:'IFN-γ',rows:[['Made by','Th1 and some Tfh cells'],['Human','IgG1 and IgG3 are favoured'],['Mouse','IgG2a (IgG2c in some strains)'],['Typical setting','viral and intracellular bacterial infections']]},
 {k:'TGF-β',rows:[['Made by','many cells; activated on the spot in gut tissue'],['Human','IgA (both subclasses)'],['Mouse','IgA, and IgG2b'],['Typical setting','mucosal tissues, often with retinoic acid']]},
 {k:'IL-21',rows:[['Made by','Tfh cells'],['Human','supports IgG1 and IgG3, and plasma-cell differentiation'],['Mouse','supports switching and plasma-cell differentiation'],['Typical setting','germinal centres']]}];
let cytSel=0;
function scC4(n){const c=CYT[cytSel];return explorer(n,{h:c.k,sub:'cytokine that steers switching',rows:c.rows,note:'Cytokines make a chosen switch region accessible to AID by switching on its transcription. CD40 signalling from the T cell is needed as well.'},{y:32});}
function scC5(n){
  const items=[['FcγRI, FcγRIIA, FcγRIIIA','Activating IgG receptors on macrophages, neutrophils and NK cells: phagocytosis and antibody-dependent cell killing.'],
   ['FcγRIIB','The only inhibitory Fc receptor. On B cells it damps activation; on myeloid cells it raises the threshold for response.'],
   ['FcεRI','High-affinity IgE receptor on mast cells and basophils. Cross-linking by antigen triggers release of histamine and other mediators.'],
   ['FcαRI and pIgR','FcαRI binds IgA on myeloid cells; the polymeric Ig receptor carries IgA and IgM across epithelia into secretions.']];
  const c=cards(n,items,{y:24});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scC6(n){
  const rows=[['IgM','strong (one pentamer is enough)'],['IgG3','strong'],['IgG1','good'],['IgG2','weak'],['IgG4','none'],['IgA, IgE','none by the classical pathway']];
  const t=wtable(n,['Human class','Classical-pathway activation'],rows,n?[[10,12],[140,22]]:[[24,20],[260,40]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+14,'C1q binds the Fc regions of antibodies sitting close together on a surface. A single bound IgM pentamer, or several adjacent IgG molecules, starts the classical pathway, which coats the target with C3b for phagocytosis and can assemble the membrane-attack complex.',n?50:92,'note start f13',17,.8);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function scC7(n){
  const items=[['Long life for IgG','FcRn rescues IgG and albumin taken up by endothelial cells from breakdown and returns them to the blood, giving most IgG a half-life of about three weeks.'],
   ['Across the placenta','FcRn carries maternal IgG across the placenta, so newborns start life with their mother\'s IgG.'],
   ['Shorter-lived classes','IgM, IgA and IgE are not rescued: their half-lives are about 5–10 days in serum, and only a few days for IgE.'],
   ['Used in medicine','Therapeutic antibodies are engineered to bind FcRn more tightly to last longer, and FcRn blockers lower harmful autoantibodies.']];
  const c=cards(n,items,{y:24});
  return {vb:n?slim(c.y+4):wide(c.y+6),s:c.s};
}
function scC8(n){
  const rows=[['Subclasses','IgG1, IgG2, IgG3, IgG4','IgG1, IgG2a or IgG2c, IgG2b, IgG3'],
   ['Strong effector subclasses','IgG1 and IgG3','IgG2a/c and IgG2b'],
   ['Weak effector subclasses','IgG2 and IgG4','IgG1'],
   ['Typical against carbohydrates','IgG2','IgG3'],
   ['IgA subclasses','IgA1 and IgA2','one IgA']];
  const t=wtable(n,['','Human','Mouse'],rows,n?[[10,12],[120,16],[240,16]]:[[24,22],[230,30],[440,28]],{y0:30,R:n?354:620});
  const p=para(n?16:24,t.y+14,'The subclass names do not correspond across species: mouse IgG1 is not the equivalent of human IgG1. The C57BL/6 strain carries IgG2c in place of IgG2a. Always check which species an antibody result comes from.',n?50:92,'note start f13',17,.8);
  return {vb:n?slim(p.y+6):wide(p.y+8),s:t.s+p.s};
}
function scC9(n){
  const rows=[['1959–69','Porter; Edelman','antibody chains and domain structure (Nobel 1972)'],
   ['1966','Ishizaka and Ishizaka','IgE identified as the antibody of allergy'],
   ['1978','Honjo and Kataoka','class switching deletes the constant genes in between'],
   ['1989','Simister and Mostov','FcRn cloned; Brambell had predicted such a receptor in the 1960s'],
   ['2000','Muramatsu, Honjo and colleagues','AID is needed for class switching']];
  const t=wtable(n,['Year','Who','Finding'],rows,n?[[10,7],[66,14],[176,22]]:[[24,8],[100,24],[310,38]],{y0:30,R:n?354:620});
  return {vb:n?slim(t.y+6):wide(t.y+8),s:t.s};
}
const S=[
 {p:1,title:'Same binding, new job',draw:scC1,text:"An antibody's variable region decides what it binds and its constant region decides what it does. Class switching changes the constant region and keeps the variable region."},
 {p:1,title:'The five classes',draw:scC2,text:"There are five antibody classes, defined by the heavy-chain constant region. They differ in shape, amount in the blood, where they work and what they trigger."},
 {p:2,title:'Class-switch recombination',draw:scC3,text:"Switching joins the rearranged VDJ to a downstream constant gene by cutting out the DNA in between, at repetitive switch regions. AID starts the cuts."},
 {p:2,title:'Cytokines choose the class',chips:'cyt',draw:scC4,text:"Which class a B cell switches to depends on the cytokines it receives from helper T cells. Pick a cytokine to see what it favours in humans and in mice."},
 {p:3,title:'Fc receptors',draw:scC5,text:"Cells of the immune system read the antibody class through Fc receptors. Most activate the cell; one, FcγRIIB, holds it back."},
 {p:3,title:'Complement',draw:scC6,text:"Antibodies bound close together on a surface start the classical complement pathway. Classes and subclasses differ greatly in how well they do it."},
 {p:3,title:'FcRn',draw:scC7,text:"A single receptor, FcRn, gives IgG its long life in the blood and carries it across the placenta."},
 {p:4,title:'Human and mouse IgG',draw:scC8,text:"Humans and mice both have four IgG subclasses, but they are not equivalents, and the subclasses with strong effector functions have different names in the two species."},
 {p:4,title:'How it was found',draw:scC9,text:"Antibody structure was solved in the 1960s, IgE was found in 1966, switching was shown to delete DNA in 1978, and FcRn and AID were identified later."}];
const CHIPS={cyt:{list:CYT.map(c=>c.k),get:()=>cytSel,set:k=>cytSel=k}};
