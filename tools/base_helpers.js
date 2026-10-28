const INK='#3A2E22', OLD='#5A4632', DNA='#5A4632', RNAC='#C17A2C', NEWL='#8FB1CF', POLC='#9DB4AE', POLD='#6F9A8E', SIG='#E0B84A',
      RED='#A4473A', GREY='#C9BFAB', PURP='#7D4A98', TEAL='#2E7D78', GREEN='#4F7A3F', ROSE='#B4766E', BROWN='#8C6D46', BLUE='#3E5F82', PAPER='#EFE8D8';
const roman=n=>[['XX',20],['X',10],['IX',9],['V',5],['IV',4],['I',1]].reduce((s,[r,v])=>{while(n>=v){s+=r;n-=v;}return s;},'');
const T=(x,y,s,c='')=>`<text x="${x}" y="${y}" class="${c}">${s}</text>`;
const Tc=(x,y,s,fill,fs,c='mono mid',w='')=>`<text x="${x}" y="${y}" class="${c}" style="fill:${fill};font-size:${Math.max(12,+(fs*1.12).toFixed(1))}px${w?';font-weight:'+w:''}">${s}</text>`;
const G=(c,d,inner,st='')=>`<g class="${c}" style="--d:${d}s;${st}">${inner}</g>`;
const R=(x,y,w,h,c,rx=8)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="${c}"/>`;
const box=(x,y,w,h,fill,rx=3,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${INK}" stroke-width="1" ${extra}/>`;
const wide=h=>`0 0 640 ${h||400}`, slim=h=>`0 0 360 ${h}`;
const ln=(x1,y1,x2,y2,c='#6A5B47',w=1,dash='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
const blob=(cx,cy,rx,ry,fill,extra='')=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${INK}" stroke-width="1" class="tint" ${extra}/>`;
function mark(x,y,ok,r=11){return ok?`<circle cx="${x}" cy="${y}" r="${r}" class="okc"/><path d="M${x-5} ${y} l3.5 3.5 l6.5 -7" class="tick"/>`:`<circle cx="${x}" cy="${y}" r="${r}" class="badc"/><path d="M${x-4.5} ${y-4.5} l9 9 m0 -9 l-9 9" class="tick"/>`;}
function wrap(text,max){const w=text.split(' ');const L=[''];w.forEach(x=>{if((L[L.length-1]+' '+x).trim().length>max)L.push(x);else L[L.length-1]=(L[L.length-1]+' '+x).trim();});return L;}
function badge(x,y,num){return `<circle cx="${x}" cy="${y}" r="8.5" fill="#2F5276"/>`+Tc(x,y+3.5,num,'#F3EDE0',10,'mono mid','600');}
function rungs(x1,x2,y1,y2,step=7){let r='';for(let x=x1+3;x<x2;x+=step)r+=`M${x} ${y1} V${y2}`;return `<path d="${r}" stroke="${INK}" stroke-width=".9" opacity=".4"/>`;}
/* o.top / o.bottom: strand colours (e.g. bottom:NEW for a new strand); o.ends:true labels 5′/3′ outside the strands, top strand 5′→3′
   left to right ('rev' flips it) */
function dsDNA(x1,x2,y,col=DNA,gap=8,o={}){const top=o.top||col, bot=o.bottom||col;
  let s=rungs(x1,x2,y,y+gap)+(top===bot?`<path d="M${x1} ${y} H${x2} M${x1} ${y+gap} H${x2}" stroke="${col}" stroke-width="2.2" fill="none"/>`
    :`<path d="M${x1} ${y} H${x2}" stroke="${top}" stroke-width="2.2" fill="none"/><path d="M${x1} ${y+gap} H${x2}" stroke="${bot}" stroke-width="2.2" fill="none"/>`);
  if(o.ends){const [a,b]=o.ends==='rev'?['3′','5′']:['5′','3′'];
    s+=Tc(x1,y-5,a,'#6A5B47',11,'mono start')+Tc(x2,y-5,b,'#6A5B47',11,'mono end')+Tc(x1,y+gap+14,b,'#6A5B47',11,'mono start')+Tc(x2,y+gap+14,a,'#6A5B47',11,'mono end');}
  return s;}
function wave(x1,x2,y,c=RNAC,sw=2.6,a=3,p=10){let d=`M${x1} ${y} q${p/4} ${-a} ${p/2} 0`;const n=Math.max(0,Math.floor((x2-x1)/(p/2))-1);for(let i=0;i<n;i++)d+=` t${p/2} 0`;return `<path d="${d}" stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round"/>`;}
function bend(x,y,h=18,len=14){return `<path d="M${x} ${y} V${y-h} H${x+len}" stroke="${INK}" stroke-width="2" fill="none" marker-end="url(#ahp)"/>`;}
function hairpin(x,y,h,w,c=RNAC){let r='';for(let yy=y-4;yy>y-h+3;yy-=5)r+=`M${x} ${yy} H${x+w}`;return `<path d="${r}" stroke="${INK}" stroke-width=".8" opacity=".6"/><path d="M${x} ${y} V${y-h} a${w/2} ${w/2} 0 1 1 ${w} 0 V${y}" stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;}
function portrait(cx,cy,k,glasses=true){const bust='M-62 70 Q-56 22 0 20 Q56 22 62 70 Q46 94 0 98 Q-46 94 -62 70Z';
  return `<g transform="translate(${cx} ${cy}) scale(${k})"><ellipse rx="84" ry="102" fill="#E8E0CC"/><rect x="-12" y="0" width="24" height="26" fill="url(#hatch)"/><path d="${bust}" fill="url(#hatch)"/><path d="${bust}" fill="url(#hatchX)"/><path d="M-14 22 L0 46 L14 22" fill="#E3D9C3" stroke="#3A2E22" stroke-width="1"/><circle cy="-30" r="36" fill="url(#hatch)" stroke="#3A2E22" stroke-width="1"/><path d="M-30 -36 q2 -30 30 -30 q28 0 30 30 q-14 -14 -30 -14 q-16 0 -30 14z" fill="#3A2E22" opacity=".6"/>`
   +(glasses?`<circle cx="-12" cy="-30" r="7" fill="none" stroke="#3A2E22" stroke-width="1.6"/><circle cx="12" cy="-30" r="7" fill="none" stroke="#3A2E22" stroke-width="1.6"/><path d="M-5 -30 h10" stroke="#3A2E22" stroke-width="1.4"/>`:'')
   +`<ellipse rx="84" ry="102" fill="none" stroke="#3A2E22" stroke-width="1.6"/><ellipse rx="90" ry="108" fill="none" stroke="#3A2E22" stroke-width=".7"/></g>`;}
function rnap(cx,cy,k=1,sigma=false,dim=false){return `<g opacity="${dim?.25:1}" transform="translate(${cx} ${cy}) scale(${k})" class="tint"><ellipse rx="30" ry="20" fill="${POLC}" stroke="${INK}" stroke-width="1.2"/><path d="M-14 -8 q14 -10 28 0" stroke="${INK}" stroke-width=".8" fill="none" opacity=".5"/>${sigma?`<ellipse cx="-24" cy="12" rx="14" ry="8" fill="${SIG}" stroke="${INK}" stroke-width="1"/>`:''}</g>`;}
function ribo(cx,cy,k=1,fill='#BBA27A'){return `<g transform="translate(${cx} ${cy}) scale(${k})" class="tint"><ellipse cx="0" cy="-6" rx="11" ry="8" fill="${fill}" stroke="${INK}" stroke-width=".8"/><ellipse cx="0" cy="5" rx="9" ry="5" fill="${fill}" opacity=".8" stroke="${INK}" stroke-width=".8"/></g>`;}
function medal(cx,cy,r,year,lines){return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#D9B85A" stroke="${INK}" stroke-width="1.4" class="tint"/><circle cx="${cx}" cy="${cy}" r="${r*.8}" fill="none" stroke="${INK}" stroke-width=".8"/>`+Tc(cx,cy-3,'NOBEL','#3A2E22',r>40?14:12,'mono mid','600')+Tc(cx,cy+15,year,'#3A2E22',r>40?13:12,'mono mid','600')+lines.map((l,i)=>T(cx,cy+r+22+i*18,l[0],l[1])).join('');}

/* ===================== shared translation glyphs ===================== */
const SSU='#D9C89B', LSU='#BBA27A', TRNA_C='#8FB1CF', AA_C='#4F7A3F', CHAIN=['#4F7A3F','#3E5F82','#7D4A98','#C17A2C','#2E7D78','#8C6D46','#B4766E','#5E7F7A'];
const GRP={np:['nonpolar','#D6C79F'],po:['polar','#A9C4DC'],ac:['acidic','#E7A99B'],ba:['basic','#B9A0C8']};
const AAS=[['G','Gly','np'],['A','Ala','np'],['V','Val','np'],['L','Leu','np'],['I','Ile','np'],['P','Pro','np'],['F','Phe','np'],['M','Met','np'],['W','Trp','np'],
 ['S','Ser','po'],['T','Thr','po'],['C','Cys','po'],['N','Asn','po'],['Q','Gln','po'],['Y','Tyr','po'],['D','Asp','ac'],['E','Glu','ac'],['K','Lys','ba'],['R','Arg','ba'],['H','His','ba']];
const THREE=Object.fromEntries(AAS.map(a=>[a[0],a[1]]));THREE['*']='Stop';
const CODE='FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
function tr(c){const o='UCAG';const i=16*o.indexOf(c[0])+4*o.indexOf(c[1])+o.indexOf(c[2]);return CODE[i];}
function sub(x,y,k){return k;} // placeholder

function trna(x,my,k,ac,aa,col=TRNA_C,o={}){
  const S=v=>v*k;
  let s=`<g opacity="${o.dim?.35:1}"><path d="M${x-S(10)} ${my-S(10)} V${my-S(70)} q0 ${-S(16)} ${S(10)} ${-S(22)} q${S(10)} ${S(6)} ${S(10)} ${S(22)} V${my-S(10)} Z" fill="${col}" stroke="${INK}" stroke-width="1" class="tint"/>`;
  if(ac)s+=Tc(x,my-S(13),ac,'#3A2E22',S(9),'mono mid','600');
  if(aa)s+=`<circle cx="${x}" cy="${my-S(100)}" r="${S(8)}" fill="${o.aaCol||AA_C}" stroke="${INK}" class="tint"/>`+Tc(x,my-S(97),aa,'#F3EDE0',S(9),'mono mid','600');
  return s+'</g>';
}
function chain(x,y,k,n,dir=-1){let s='';for(let i=0;i<n;i++){const xx=x-i*k*6,yy=y-i*k*13;s+=`<circle cx="${xx}" cy="${yy}" r="${k*7}" fill="${CHAIN[i%CHAIN.length]}" stroke="${INK}" stroke-width=".8" class="tint"/>`;}return s;}
function ribosome(cx,my,k,o={}){
  const S=v=>v*k, sx={E:cx-S(50),P:cx,A:cx+S(50)};
  let s='';
  if(o.large!==false)s+=`<path d="M${cx-S(130)} ${my-S(22)} C ${cx-S(156)} ${my-S(160)}, ${cx+S(156)} ${my-S(160)}, ${cx+S(130)} ${my-S(22)} C ${cx+S(80)} ${my-S(36)}, ${cx-S(80)} ${my-S(36)}, ${cx-S(130)} ${my-S(22)} Z" fill="${LSU}" opacity=".55" stroke="${INK}" stroke-width="1.2" class="tint"/>`;
  if(o.small!==false)s+=`<path d="M${cx-S(120)} ${my+S(4)} C ${cx-S(126)} ${my+S(56)}, ${cx+S(126)} ${my+S(56)}, ${cx+S(120)} ${my+S(4)} C ${cx+S(80)} ${my-S(10)}, ${cx-S(80)} ${my-S(10)}, ${cx-S(120)} ${my+S(4)} Z" fill="${SSU}" opacity=".7" stroke="${INK}" stroke-width="1.2" class="tint"/>`;
  if(o.tunnel)s+=`<path d="M${cx+S(10)} ${my-S(104)} C ${cx} ${my-S(118)}, ${cx-S(14)} ${my-S(126)}, ${cx-S(22)} ${my-S(150)}" stroke="${INK}" stroke-width="${S(1.2)}" stroke-dasharray="3 3" fill="none"/>`;
  if(o.mrna!==false){const x1=cx-S(170),x2=cx+S(170);s+=`<path d="M${x1} ${my} H${x2}" stroke="${RNAC}" stroke-width="${Math.max(2,S(2.6))}"/>`+Tc(x1-S(4),my+S(4),'5′','#6A5B47',S(11),'mono end')+Tc(x2+S(4),my+S(4),'3′','#6A5B47',S(11),'mono start');}
  (o.codons||[]).forEach(([site,c])=>{s+=Tc(sx[site],my+S(16),c,o.codonCol&&o.codonCol[site]||'#6A3E12',S(11),'mono mid','600');});
  if(o.sites||(o.sites!==false&&(o.trnas||[]).length))['E','P','A'].forEach(k2=>s+=Tc(sx[k2],my+S(34),k2,'#2F5276',S(12),'mono mid','600'));
  (o.trnas||[]).forEach(t=>s+=trna(sx[t.site]+(t.dx||0)*k,my-S(4),k,t.ac,t.aa,t.col,t));
  if(o.chainOn){const x=sx[o.chainOn]+S(4),y=my-S(118);s+=chain(x,y,k,o.chainN||5);}
  return s;
}

function timeline(x,y,ev,wrapN,fs,indent,gap,d0){let s='',yy=y;ev.forEach((e,i)=>{const L=wrap(e[1],wrapN);s+=G('a-fade',(d0+i*.4).toFixed(1),T(x,yy,e[0],'mono acc start f13')+L.map((l,j)=>T(x+indent,yy+j*18,l,'lab start '+fs)).join(''));yy+=L.length*18+gap;});return {s,y:yy};}
/* ===================== text & layout utilities ===================== */
const FX=(v,d=1)=>Number(v).toFixed(d);
const SB=t=>`<tspan baseline-shift="-24%" style="font-size:.72em">${t}</tspan>`;
const SP=t=>`<tspan baseline-shift="super" style="font-size:.72em">${t}</tspan>`;
function para(x,y,text,wn,cls='note start f13',lh=17,d=0){const L=wrap(text,wn);return {s:G('a-fade',d,L.map((l,j)=>T(x,y+j*lh,l,cls)).join('')),y:y+L.length*lh};}
function boxItem(x,y,W,head,body,o={}){
  const L=wrap(body,Math.floor(W/(o.cw||6.3))), H=34+L.length*16+8;
  return {s:box(x,y,W,o.H||H,o.fill||'#E7DEC9',4)+(o.num?badge(x+14,y+16,o.num):'')+T(x+(o.num?28:12),y+21,head,'lab start f14')
    +L.map((l,j)=>T(x+12,y+42+j*16,l,'note start f12')).join(''),h:H};
}
function bullets(x,y,items,wrapN,o={}){
  let s='',yy=y;
  items.forEach((it,i)=>{const L=wrap(it[1],wrapN);
    s+=G('a-fade',((o.d0||0)+i*.3).toFixed(1),(o.nonum?'':badge(x,yy-4,i+1))+T(x+(o.nonum?0:16),yy,it[0],'cname start '+(o.hfs||'f14'))
      +L.map((l,j)=>T(x+(o.nonum?0:16),yy+18+j*17,l,'note start '+(o.fs||'f13'))).join(''));
    yy+=L.length*17+(o.gap||30);});
  return {s,y:yy};
}
function wtable(n,head,rows,cols,o={}){
  let y=o.y0||30, s=''; const R2=o.R||(n?350:620);
  s+=G('a-fade',o.d0||0,head.map((h,i)=>T(cols[i][0],y,h,'cname start '+(n?'f13':'f14'))).join('')+ln(cols[0][0]-4,y+7,R2,y+7));
  y+=26;
  rows.forEach((r,i)=>{const W=r.map((c,j)=>wrap(c,cols[j][1])); const L=Math.max(...W.map(w=>w.length)); const h=L*16+10;
    const hi=o.hi===i;
    s+=G('a-fade',((o.d0||0)+.1*i).toFixed(2),(hi?`<rect x="${cols[0][0]-6}" y="${y-15}" width="${R2-cols[0][0]+8}" height="${h}" rx="3" fill="#E7DEC9" stroke="${INK}" stroke-width="1"/>`
        :(i%2?'':`<rect x="${cols[0][0]-6}" y="${y-15}" width="${R2-cols[0][0]+8}" height="${h}" fill="#E7DEC9" opacity=".5"/>`))
      +W.map((w,j)=>w.map((l,k)=>T(cols[j][0],y+k*16,l,(j?'note':'lab')+' start '+(n?'f12':'f13'))).join('')).join(''));
    y+=h;});
  return {s,y};
}

/* ===================== DNA-repair toolkit ===================== */
const BB='#5A4632', NEW='#3E7FA8', LESU='#A4473A', OXO='#7D4A98', METH='#C17A2C', CPDC='#C99A2E', INV='#C17A2C',
      E1='#9DB4AE', E2='#B4766E', E3='#D9B85A', E4='#A9C4DC', E5='#A9C49A', E6='#C9A9D6', RECAC='#E3B26B', PAPR='#ECE4D2';
function segAt(segs,i){for(const s of segs)if(i>=s[0]&&i<s[1])return s[2]||BB;return null;}
/* ladder: n base pairs from x; top strand at y, bottom at y+g.
   o.top/o.bot = [[i0,i1,col]] strand segments; o.mk = {i:{t:col,b:col,tx:1,bx:1}} (tx/bx = base missing)
   o.lab=[{i,s,t,col}]; o.dimer=[i]; o.me=[{i,s,op}]; o.nick=[{i,s}] (gap before index i); o.flip=[{i,s,col}] */
function lad(x,y,n,o={}){
  const dx=o.dx||12,g=o.g||24,top=o.top||[[0,n,BB]],bot=o.bot||[[0,n,BB]],mk=o.mk||{};
  let s='';
  for(let i=0;i<n;i++){const cx=x+i*dx+dx/2, tc=segAt(top,i), bc=segAt(bot,i), m=mk[i]||{};
    if(tc&&!m.tx){const c=m.t;s+=`<path d="M${FX(cx)} ${FX(y)} V${FX(y+g/2-1.5)}" stroke="${c||tc}" stroke-width="${c?4.5:1.8}"${c?'':' opacity=".7"'}/>`;}
    if(bc&&!m.bx){const c=m.b;s+=`<path d="M${FX(cx)} ${FX(y+g)} V${FX(y+g/2+1.5)}" stroke="${c||bc}" stroke-width="${c?4.5:1.8}"${c?'':' opacity=".7"'}/>`;}}
  const bbp=(segs,yy)=>segs.map(sg=>`<path d="M${FX(x+sg[0]*dx)} ${FX(yy)} H${FX(x+sg[1]*dx)}" stroke="${sg[2]||BB}" stroke-width="2.8"/>`).join('');
  s+=bbp(top,y)+bbp(bot,y+g);
  (o.nick||[]).forEach(k=>{const xx=x+k.i*dx, yy=k.s==='b'?y+g:y;s+=`<rect x="${FX(xx-2)}" y="${FX(yy-2.5)}" width="4" height="5" fill="${PAPR}"/>`;});
  (o.dimer||[]).forEach(d=>{const cx=x+d*dx+dx/2;s+=`<path d="M${FX(cx)} ${FX(y+g/2-4)} H${FX(cx+dx)}" stroke="${CPDC}" stroke-width="3.2"/>`;});
  (o.dimerB||[]).forEach(d=>{const cx=x+d*dx+dx/2;s+=`<path d="M${FX(cx)} ${FX(y+g/2+4)} H${FX(cx+dx)}" stroke="${CPDC}" stroke-width="3.2"/>`;});
  (o.flip||[]).forEach(f=>{const cx=x+f.i*dx+dx/2;s+=f.s==='b'?`<path d="M${FX(cx)} ${FX(y+g)} V${FX(y+g+12)}" stroke="${f.col||LESU}" stroke-width="4.5"/>`
      :`<path d="M${FX(cx)} ${FX(y)} V${FX(y-12)}" stroke="${f.col||LESU}" stroke-width="4.5"/>`;});
  (o.me||[]).forEach(m=>{const cx=x+m.i*dx+dx/2, yy=m.s==='b'?y+g+6:y-6;s+=`<circle cx="${FX(cx)}" cy="${FX(yy)}" r="3.2" fill="${METH}" stroke="${INK}" stroke-width=".6"${m.op?` opacity="${m.op}"`:''}/>`;});
  (o.lab||[]).forEach(L=>{const cx=x+L.i*dx+dx/2;s+=Tc(FX(cx+(L.dx||0)),FX(L.s==='b'?y+g+(L.dy||16):y-(L.dy||7)),L.t,L.col||'#3A2E22',L.fs||10,'mono mid','600');});
  if(o.ends)s+=Tc(x-5,y+4,'5′','#6A5B47',10,'mono end')+Tc(x-5,y+g+4,'3′','#6A5B47',10,'mono end')
    +Tc(x+n*dx+5,y+4,'3′','#6A5B47',10,'mono start')+Tc(x+n*dx+5,y+g+4,'5′','#6A5B47',10,'mono start');
  return s;
}
function prot(cx,cy,rx,ry,fill,label,o={}){
  return blob(FX(cx),FX(cy),rx,ry,fill,o.op?`opacity="${o.op}"`:'')+(label?Tc(FX(cx),FX(cy+3.8),label,o.tc||'#3A2E22',o.fs||11,'mono mid','600'):'');}
function ring(cx,cy,rx,ry,fill,label,o={}){
  return `<ellipse cx="${FX(cx)}" cy="${FX(cy)}" rx="${rx}" ry="${ry}" fill="${fill}" fill-opacity=".55" stroke="${INK}" stroke-width="1.1" class="tint"/>`
    +(label?Tc(FX(cx+(o.ldx||0)),FX(cy+(o.ldy!==undefined?o.ldy:-ry-5)),label,o.tc||'#3A2E22',o.fs||11,'mono mid','600'):'');}
function recaFil(x1,x2,y,o={}){let s='';for(let x=x1;x<=x2-8;x+=9)s+=`<rect x="${FX(x)}" y="${FX(y-6)}" width="8" height="12" rx="3" fill="${o.col||RECAC}" stroke="${INK}" stroke-width=".7"/>`;
  return s+(o.label?Tc(FX((x1+x2)/2),FX(y-11),o.label,'#8C5A1E',10,'mono mid','600'):'');}
function ssb(cx,y){return `<circle cx="${FX(cx)}" cy="${FX(y)}" r="5" fill="${E4}" stroke="${INK}" stroke-width=".7"/>`;}
/* inhibition: red line ending in a perpendicular bar at (x2,y2), drug named in red italics at the tail; o:{drug,w,dash,dx,dy} */
function inh(x1,y1,x2,y2,o={}){const L=Math.hypot(x2-x1,y2-y1)||1, ux=(x1-x2)/L, uy=(y1-y2)/L;
  let s=`<path d="M${FX(x1)} ${FX(y1)} L${FX(x2)} ${FX(y2)}" stroke="${RED}" stroke-width="${o.w||1.6}" fill="none" marker-end="url(#tbar)"${o.dash?` stroke-dasharray="${o.dash}"`:''}/>`;
  if(o.drug){const hz=Math.abs(ux)>=Math.abs(uy), tx=x1+ux*6+(o.dx||0), ty=y1+uy*6+(hz?4:uy>0?12:-4)+(o.dy||0);
    s+=Tc(FX(tx),FX(ty),o.drug,RED,11,'note '+(hz?(ux>0?'start':'end'):'mid'));}
  return s;}
function arw(x1,y1,x2,y2,o={}){const m=o.red?'ahr':o.blue?'ahb':'ahp', c=o.red?'#A4473A':o.blue?'#2F5276':(o.col||'#6A5B47');
  return `<path d="M${FX(x1)} ${FX(y1)} ${o.q?`Q${FX(o.q[0])} ${FX(o.q[1])} `:'L'}${FX(x2)} ${FX(y2)}" stroke="${c}" stroke-width="${o.w||1.6}" fill="none" marker-end="url(#${m})"${o.dash?` stroke-dasharray="${o.dash}"`:''}/>`;}
function pairBox(cx,cy,t,b,o={}){const w=o.w||62,h=o.h||46;
  return box(cx-w/2,cy-h/2,w,h,o.fill||'#EFE6D2',5)+Tc(cx,cy-5,t,o.tc||'#3A2E22',o.fs||13,'mono mid','600')
    +`<path d="M${cx-10} ${cy+1} h20" stroke="${INK}" stroke-width="1" stroke-dasharray="2 2"/>`+Tc(cx,cy+17,b,o.bc||'#3A2E22',o.fs||13,'mono mid','600');}
function photon(x1,y1,x2,y2,col='#3E7FA8'){const L=Math.hypot(x2-x1,y2-y1), a=Math.atan2(y2-y1,x2-x1)*180/Math.PI; let d='M0 0';
  for(let t=0;t<L-12;t+=8)d+=` q2 -5 4 0 q2 5 4 0`;
  return `<g transform="translate(${FX(x1)} ${FX(y1)}) rotate(${FX(a)})"><path d="${d} L${FX(L-2)} 0" stroke="${col}" stroke-width="1.6" fill="none" marker-end="url(#ahb)"/></g>`;}
/* left-text / right-drawing steps; d(x,y,w) draws a ladder whose top strand is at y */
function stepsLad(n,steps,o={}){
  let s='',y=o.y0||24;
  const tx=n?16:20;
  steps.forEach((st,i)=>{const L=wrap(st.t,n?52:(o.wn||36)), th=22+L.length*16, top=st.top||24, dh=st.dh||44, dl=((o.d0||0)+i*.6).toFixed(1);
    const head=badge(tx+8,y-4,i+1)+T(tx+22,y,st.h,'cname start f14')+L.map((l,j)=>T(tx,y+20+j*16,l,'note start f12')).join('');
    if(n){const dy=y+th+top;s+=G('a-fade',dl,head)+G('a-fade',(+dl+.3).toFixed(1),st.d(24,dy,312));y=dy+dh+28;}
    else{const h=Math.max(th,top+dh-8);s+=G('a-fade',dl,head)+G('a-fade',(+dl+.3).toFixed(1),st.d(o.dx0||284,y-14+top,o.dw||330));
      y+=h+22;if(i<steps.length-1)s+=ln(tx,y-14,620,y-14,'#6A5B47',.5,'2 4');}});
  return {s,y};
}
function cut(cx,y){return Tc(FX(cx),FX(y),'\u25be','#A4473A',15,'mono mid');}
function oligo(x1,x2,y,dx,dim){let s=`<path d="M${FX(x1)} ${FX(y)} H${FX(x2)}" stroke="${BB}" stroke-width="2.6"/>`;
  for(let xx=x1+dx/2;xx<x2;xx+=dx)s+=`<path d="M${FX(xx)} ${FX(y)} V${FX(y+10)}" stroke="${BB}" stroke-width="1.8" opacity=".7"/>`;
  if(dim!==undefined)s+=`<path d="M${FX(x1+dim*dx+dx/2)} ${FX(y)} V${FX(y+10)} M${FX(x1+(dim+1)*dx+dx/2)} ${FX(y)} V${FX(y+10)}" stroke="${CPDC}" stroke-width="4.5"/><path d="M${FX(x1+dim*dx+dx/2)} ${FX(y+7)} h${FX(dx)}" stroke="${CPDC}" stroke-width="3"/>`;
  return s;}
function tbox(cx,cy,w,t,o={}){return box(cx-w/2,cy-14,w,28,o.fill||'#EFE6D2',4)+Tc(cx,cy+4,t,o.tc||'#3A2E22',o.fs||12,'mono mid','600');}
/* ===================== history toolkit ===================== */
let UID=0;
const AXC='#6A5B47', GLASSE='#7E8F92', GLASSF='#DCE6E8', BROTH='#EAD9A0', TURB='#C4A86A', DUST='#5A4632', AGAR='#E9DAA8', COLC='#C99A2E',
      MOUSEC='#D3C8B6', BLOOD='#A4473A', CAPS='#C9A9D6', LEAF='#7FA05A', LEAFD='#C9D58A';
function rnd(seed){let s=seed;return ()=>{s=(s*9301+49297)%233280;return s/233280;};}
function microbes(cx,cy,rx,ry,n,seed,col='#5A4632'){const r=rnd(seed);let s='';
  for(let i=0;i<n;i++){const a=r()*Math.PI*2,d=Math.sqrt(r()),x=cx+Math.cos(a)*rx*d,y=cy+Math.sin(a)*ry*d,an=r()*180;
    s+=`<rect x="${FX(x-3)}" y="${FX(y-1.2)}" width="6" height="2.4" rx="1.2" fill="${col}" opacity=".75" transform="rotate(${FX(an)} ${FX(x)} ${FX(y)})"/>`;}
  return s;}
/* round-bottomed flask; type: straight | swan | broken | sealed | plug */
function flask(cx,by,type,o={}){
  const r=o.r||30, t=by-2*r+4, id='fl'+(UID++), lvl=by-r*(o.full||1.05);
  let s=`<defs><clipPath id="${id}"><circle cx="${cx}" cy="${by-r}" r="${r-1.5}"/></clipPath></defs>`;
  s+=`<circle cx="${cx}" cy="${by-r}" r="${r}" fill="${GLASSF}" fill-opacity=".55" stroke="${GLASSE}" stroke-width="1.6"/>`;
  s+=`<rect x="${cx-r}" y="${FX(lvl)}" width="${2*r}" height="${FX(by-lvl)}" fill="${o.turbid?TURB:BROTH}" clip-path="url(#${id})"/>`;
  if(o.turbid)s+=microbes(cx,by-r*.45,r*.7,r*.32,14,o.seed||7);
  const tube=(d,w=10)=>`<path d="${d}" stroke="${GLASSE}" stroke-width="${w+3}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#EEF3F3" stroke-width="${w-1}" fill="none" stroke-linecap="round"/>`;
  if(type==='straight'||type==='plug')s+=tube(`M${cx} ${t} V${t-34}`);
  if(type==='plug')s+=`<rect x="${cx-6}" y="${t-44}" width="12" height="16" rx="3" fill="#F4F0E6" stroke="${INK}" stroke-width=".8"/>`;
  if(type==='sealed')s+=tube(`M${cx} ${t} V${t-28}`)+`<circle cx="${cx}" cy="${t-30}" r="6.5" fill="${GLASSE}"/>`;
  if(type==='broken')s+=tube(`M${cx} ${t} V${t-10}`)+`<path d="M${cx-6.5} ${t-11} l3 -4 l3 3 l3 -4 l3 4" stroke="${GLASSE}" stroke-width="1.6" fill="none"/>`;
  if(type==='swan'){const d=`M${cx} ${t} V${t-18} C${cx} ${t-46} ${cx+34} ${t-50} ${cx+44} ${t-26} C${cx+50} ${t-12} ${cx+62} ${t-10} ${cx+68} ${t-24} L${cx+80} ${t-50}`;
    s+=tube(d);
    if(o.wet)s+=`<path d="M${cx+46} ${t-21} C${cx+50} ${t-12} ${cx+62} ${t-10} ${cx+66} ${t-19}" stroke="${o.turbid?TURB:BROTH}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    s+=[[54,-14],[58,-13],[61,-15],[56,-16]].map(p=>`<circle cx="${cx+p[0]}" cy="${t+p[1]}" r="1.6" fill="${DUST}"/>`).join('');}
  if(o.label)s+=T(cx,by+18,o.label,'note mid f12');
  return s;
}
function colonySet(n,seed,R){const r=rnd(seed),a=[];let k=0;while(a.length<n&&k<500){k++;const ang=r()*Math.PI*2,d=Math.sqrt(r())*R*.82,x=Math.cos(ang)*d,y=Math.sin(ang)*d,rad=2.4+r()*2.6;
  if(a.every(c=>Math.hypot(c[0]-x,c[1]-y)>c[2]+rad+2))a.push([x,y,rad]);}return a;}
function dish(cx,cy,R,cols=[],o={}){
  let s=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="${o.agar||AGAR}" stroke="${GLASSE}" stroke-width="1.8"/><circle cx="${cx}" cy="${cy}" r="${R-4}" fill="none" stroke="${GLASSE}" stroke-width=".6" opacity=".7"/>`;
  cols.forEach(c=>s+=`<circle cx="${FX(cx+c[0])}" cy="${FX(cy+c[1])}" r="${FX(c[2])}" fill="${c[3]||o.col||COLC}" stroke="${INK}" stroke-width=".5"/>`);
  if(o.mark)s+=`<path d="M${cx} ${cy-R-6} v8" stroke="${INK}" stroke-width="2"/>`;
  if(o.label)s+=T(cx,cy+R+17,o.label,'note mid f12');
  return s;}
function tube(cx,by,o={}){const w=o.w||18,h=o.h||70,top=by-h,lvl=by-h*(o.full||.55);
  let s=`<path d="M${cx-w/2} ${top} V${by-w/2} a${w/2} ${w/2} 0 0 0 ${w} 0 V${top}" fill="${GLASSF}" fill-opacity=".5" stroke="${GLASSE}" stroke-width="1.5"/>`;
  s+=`<path d="M${cx-w/2+1.5} ${FX(lvl)} V${by-w/2} a${w/2-1.5} ${w/2-1.5} 0 0 0 ${w-3} 0 V${FX(lvl)} Z" fill="${o.fill||(o.turbid?TURB:BROTH)}"/>`;
  if(o.turbid)s+=microbes(cx,(lvl+by)/2,w*.3,(by-lvl)*.38,6,o.seed||3);
  if(o.label)s+=T(cx,by+16,o.label,'note mid f11');
  return s;}
function mouse(cx,cy,k=1,o={}){
  const f=o.dead?'#B8B0A2':MOUSEC;
  let g=`<path d="M${cx-19*k} ${cy+2*k} q${-14*k} ${-2*k} ${-22*k} ${-12*k}" stroke="${INK}" stroke-width="1.2" fill="none"/>`
   +`<ellipse cx="${cx}" cy="${cy}" rx="${20*k}" ry="${11*k}" fill="${f}" stroke="${INK}" stroke-width="1"/>`
   +`<circle cx="${cx+19*k}" cy="${cy-3*k}" r="${8.5*k}" fill="${f}" stroke="${INK}" stroke-width="1"/>`
   +`<circle cx="${cx+15*k}" cy="${cy-11*k}" r="${4.2*k}" fill="${f}" stroke="${INK}" stroke-width="1"/>`
   +`<circle cx="${cx+27*k}" cy="${cy-2*k}" r="${1.6*k}" fill="${INK}"/>`;
  if(o.dead)g+=`<path d="M${cx-10*k} ${cy+10*k} v${5*k} M${cx-3*k} ${cy+11*k} v${5*k} M${cx+5*k} ${cy+11*k} v${5*k} M${cx+12*k} ${cy+9*k} v${5*k}" stroke="${INK}" stroke-width="1.2"/>`
    +`<path d="M${cx+20*k} ${cy-7*k} l${4*k} ${4*k} m0 ${-4*k} l${-4*k} ${4*k}" stroke="${INK}" stroke-width="1.1"/>`;
  else g+=`<circle cx="${cx+21*k}" cy="${cy-5*k}" r="${1.4*k}" fill="${INK}"/>`;
  let s=o.dead?`<g transform="rotate(180 ${cx} ${cy})">${g}</g>`:g;
  if(o.label)s+=T(cx,cy+(o.ldy||26)*k,o.label,'note mid f12');
  return s;}
function rod(cx,cy,l,w,ang=0,col='#8C6D46'){return `<rect x="${FX(cx-l/2)}" y="${FX(cy-w/2)}" width="${l}" height="${w}" rx="${w/2}" fill="${col}" stroke="${INK}" stroke-width=".7" transform="rotate(${ang} ${FX(cx)} ${FX(cy)})"/>`;}
function pneumo(cx,cy,k=1,caps=true,col='#9DB4AE'){
  let s=caps?`<ellipse cx="${cx}" cy="${cy}" rx="${22*k}" ry="${12*k}" fill="${CAPS}" fill-opacity=".55" stroke="#7D4A98" stroke-width=".8" stroke-dasharray="2 2"/>`:'';
  return s+`<ellipse cx="${cx-8*k}" cy="${cy}" rx="${8.5*k}" ry="${6.5*k}" fill="${col}" stroke="${INK}" stroke-width=".9"/><ellipse cx="${cx+8*k}" cy="${cy}" rx="${8.5*k}" ry="${6.5*k}" fill="${col}" stroke="${INK}" stroke-width=".9"/>`;}
function syringe(x,y,len=46,ang=0){return `<g transform="rotate(${ang} ${x} ${y})"><path d="M${x} ${y-8} v16 M${x} ${y} h-10" stroke="${GLASSE}" stroke-width="1.6"/><rect x="${x}" y="${y-5}" width="${len}" height="10" rx="2" fill="#EEF3F3" stroke="${GLASSE}" stroke-width="1.2"/><path d="M${x+len} ${y} h14" stroke="${GLASSE}" stroke-width="1.6"/></g>`;} // needle points right
function medallion(cx,cy,k,name,dates,glasses=false){return portrait(cx,cy,k,glasses)+T(cx,cy+112*k+20,name,'cname mid f14')+T(cx,cy+112*k+38,dates,'note mid f12');}
function titlePlate(n,o){ // o: {name,dates,glasses,q,belief,items}
  let s='';const mx=n?180:130, my=n?118:132, k=n?.8:.95;
  s+=G('a-fade',0,medallion(mx,my,k,o.name,o.dates,o.glasses));
  let x=n?16:270, y=n?my+112*k+76:44;
  s+=G('a-fade',.5,T(x,y,'The question','mono acc start f12'));
  const Q=wrap(o.q,n?40:40);s+=G('a-fade',.6,Q.map((l,i)=>T(x,y+24+i*22,l,'cname start')).join(''));y+=24+Q.length*22+18;
  s+=G('a-fade',1,T(x,y,'What was believed','mono acc start f12'));
  const B=wrap(o.belief,n?50:56);s+=G('a-fade',1.1,B.map((l,i)=>T(x,y+20+i*17,l,'note start f13')).join(''));y+=20+B.length*17+16;
  if(o.items){s+=G('a-fade',1.5,T(x,y,'In this deck','mono acc start f12'));y+=20;o.items.forEach((it,i)=>{s+=G('a-fade',(1.6+i*.15).toFixed(2),T(x,y+i*18,'• '+it,'note start f13'));});y+=o.items.length*18;}
  const H=n?y+12:Math.max(y+14,my+112*k+56);
  return {vb:n?slim(H):wide(H),s};
}
/* hypothesis-testing plate: spec={hyps:[[name,short]],conds:[{n,d,draw(cx,y,n),pred:[...],obs,note}],dh} */
function predictPlate(n,spec,sel){
  const c=spec.conds[sel], H=spec.hyps, oc=x=>Array.isArray(x)?x[0]:x, tx=x=>Array.isArray(x)?(x[1]?x[0]+': '+x[1]:x[0]):x, hit=(cc,i)=>oc(cc.pred[i])===oc(cc.obs);
  let s='', y=14;
  const dh=n?(spec.dhn||spec.dh||150):(spec.dh||150);
  s+=G('a-fade',0,c.draw(n?180:320,y,n));
  y+=dh+8;
  s+=G('a-fade',.2,T(n?16:24,y,`${sel+1}. ${c.n}`,'cname start f15'));
  const D=wrap(c.d||'',n?52:92);s+=G('a-fade',.3,D.map((l,i)=>T(n?16:24,y+20+i*16,l,'note start f12')).join(''));y+=20+D.length*16+18;
  const cx=n?[16,148,338]:[24,300,606];
  s+=G('a-fade',.5,T(cx[0],y,n?'If it were…':'If the explanation were…','mono acc start f11')+T(cx[1],y,'we would expect','mono acc start f11')+ln(cx[0],y+6,n?346:616,y+6));
  y+=24;
  H.forEach((h,i)=>{const A=wrap(h[0],n?20:40),P=wrap(tx(c.pred[i]),n?28:42),L=Math.max(A.length,P.length),ok=hit(c,i);
    s+=G('a-fade',(.6+i*.2).toFixed(1),A.map((l,j)=>T(cx[0],y+j*16,l,'lab start f13')).join('')+P.map((l,j)=>T(cx[1],y+j*16,l,'note start f13')).join('')+mark(cx[2],y-4,ok,8));
    y+=L*16+10;});
  const O=wrap(tx(c.obs),n?28:42);
  s+=G('a-fade',(.7+H.length*.2).toFixed(1),`<rect x="${cx[0]-6}" y="${y-16}" width="${(n?352:620)-cx[0]}" height="${O.length*16+12}" rx="3" fill="#E7DEC9" stroke="${INK}" stroke-width="1"/>`
    +T(cx[0],y,'Observed','cname start f14')+O.map((l,j)=>T(cx[1],y+j*16,l,'lab start f13')).join(''));
  y+=O.length*16+28;
  // running tally
  const mx=n?160:300, cw=n?32:36;
  s+=G('a-fade',1.4,T(cx[0],y,'Across all tests','mono acc start f11')+spec.conds.map((cc,j)=>(j===sel?`<rect x="${mx+j*cw-cw/2+2}" y="${y-13}" width="${cw-4}" height="${18+H.length*22}" rx="3" fill="#E7DEC9"/>`:'')+Tc(mx+j*cw,y,j+1,'#2F5276',11,'mono mid','600')).join(''));
  y+=20;
  H.forEach((h,i)=>{s+=G('a-fade',(1.5+i*.1).toFixed(1),T(cx[0],y+4,h[1],'note start f12')+spec.conds.map((cc,j)=>mark(mx+j*cw,y,hit(cc,i),6.5)).join(''));y+=22;});
  if(c.note){const p=para(n?16:24,y+12,c.note,n?50:92,'note start f13',17,1.8);s+=p.s;y=p.y;}
  return {vb:n?slim(y+10):wide(y+12),s};
}
/* generic text-and-picture plate helpers */
function sideText(n,x,y,items,wn,o={}){return bullets(n?24:x,y,items,n?44:wn,o);}
/* ===================== sequencing toolkit ===================== */
const NB={A:'#4F7A3F',C:'#2F5276',G:'#8C6D46',T:'#A4473A',N:'#9A9384'};
const ADP1='#7D4A98', ADP2='#C17A2C', IDX='#2E7D78', DNAC='#5A4632', SIGC='#2F5276', GLS='#7E8F92';
/* double-stranded fragment, optionally with adapters/index blocks at each end */
function frag(x,y,w,o={}){
  const h=o.h||9, a=o.a||0;
  let s='';
  if(a){s+=`<rect x="${FX(x)}" y="${FX(y)}" width="${a}" height="${h}" fill="${ADP1}" stroke="${INK}" stroke-width=".7"/>`
       +`<rect x="${FX(x+w-a)}" y="${FX(y)}" width="${a}" height="${h}" fill="${ADP2}" stroke="${INK}" stroke-width=".7"/>`;}
  s+=`<rect x="${FX(x+a)}" y="${FX(y)}" width="${FX(w-2*a)}" height="${h}" fill="${o.fill||'#D9CDB0'}" stroke="${INK}" stroke-width=".8"/>`;
  for(let xx=x+a+5;xx<x+w-a;xx+=7)s+=`<path d="M${FX(xx)} ${FX(y+1)} v${h-2}" stroke="${INK}" stroke-width=".5" opacity=".4"/>`;
  if(o.idx)s+=`<rect x="${FX(x+a)}" y="${FX(y)}" width="12" height="${h}" fill="${IDX}" stroke="${INK}" stroke-width=".7"/>`;
  if(o.label)s+=T(FX(x+w/2),FX(y+h+15),o.label,'note mid f11');
  return s;}
/* flowcell surface: a lawn of short oligos */
function lawn(x1,x2,y,o={}){
  let s=`<rect x="${x1}" y="${y}" width="${x2-x1}" height="${o.h||8}" fill="#DCE6E8" stroke="${GLS}" stroke-width="1"/>`;
  for(let x=x1+5;x<x2-2;x+=9)s+=`<path d="M${FX(x)} ${y} v-7" stroke="${x%18<9?ADP1:ADP2}" stroke-width="2" stroke-linecap="round"/>`;
  return s;}
/* a cluster of identical strands standing on the flowcell */
function clust(cx,y,n,col,o={}){
  let s='';const sp=o.sp||4.5;
  for(let i=0;i<n;i++){const x=cx+(i-(n-1)/2)*sp;s+=`<path d="M${FX(x)} ${y} v-${o.h||20}" stroke="${col||DNAC}" stroke-width="1.6" stroke-linecap="round"/>`;}
  if(o.dot)s+=`<circle cx="${cx}" cy="${FX(y-(o.h||20)-5)}" r="4.5" fill="${o.dot}" stroke="${INK}" stroke-width=".7"/>`;
  if(o.label)s+=T(cx,y+16,o.label,'note mid f11');
  return s;}
/* bead carrying clonal DNA */
function bead(cx,cy,r,o={}){
  let s=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${o.fill||'#C9BFAB'}" stroke="${INK}" stroke-width="1.1"/><ellipse cx="${FX(cx-r*.3)}" cy="${FX(cy-r*.35)}" rx="${r*.3}" ry="${r*.18}" fill="#FFF" opacity=".5"/>`;
  if(o.dna!==false)for(let i=0;i<10;i++){const a=i/10*Math.PI*2;s+=`<path d="M${FX(cx+r*Math.cos(a))} ${FX(cy+r*Math.sin(a))} l${FX(7*Math.cos(a))} ${FX(7*Math.sin(a))}" stroke="${DNAC}" stroke-width="1.3"/>`;}
  if(o.label)s+=T(cx,cy+r+(o.ldy||20),o.label,'note mid f11');
  return s;}
/* microwell holding a bead, with an ISFET sensor underneath */
function well(cx,by,w,h,o={}){
  let s=`<path d="M${cx-w/2} ${by-h} v${h} h${w} v${-h}" fill="#E8E3D4" stroke="${GLS}" stroke-width="1.6"/>`;
  if(o.bead!==false)s+=bead(cx,by-w*.42,w*.3,{dna:false});
  s+=`<rect x="${cx-w/2}" y="${by}" width="${w}" height="12" fill="${o.sense||'#B9C6CE'}" stroke="${INK}" stroke-width=".9"/>`;
  if(o.label)s+=T(cx,by+26,o.label,'note mid f11');
  return s;}
/* zero-mode waveguide: a well in metal film with polymerase at the floor */
function zmw(cx,by,w,h,o={}){
  let s=`<rect x="${cx-w/2-26}" y="${by-h}" width="${26}" height="${h}" fill="#B9AE96" stroke="${INK}" stroke-width=".8"/><rect x="${cx+w/2}" y="${by-h}" width="${26}" height="${h}" fill="#B9AE96" stroke="${INK}" stroke-width=".8"/>`;
  s+=`<rect x="${cx-w/2}" y="${by-h}" width="${w}" height="${h}" fill="#E6EEF0" opacity=".55"/>`;
  if(o.lit)s+=`<path d="M${cx-w/2} ${by} L${cx+w/2} ${by} L${cx+w/2-4} ${by-h*.55} L${cx-w/2+4} ${by-h*.55} Z" fill="#E0B84A" opacity=".35"/>`;
  s+=prot(cx,by-9,13,9,'#9DB4AE','pol',{fs:9});
  if(o.label)s+=T(cx,by+20,o.label,'note mid f11');
  return s;}
/* membrane with a protein pore, motor protein and translocating strand */
function poreMemb(cx,my,o={}){
  const h=o.h||26;
  let s=`<rect x="${cx-110}" y="${my}" width="220" height="${h}" fill="#EDE0B8"/><path d="M${cx-108} ${my+3} H${cx+108} M${cx-108} ${my+h-3} H${cx+108}" stroke="#B89A5E" stroke-width="5" stroke-dasharray="0.1 7.5" stroke-linecap="round"/>`;
  s+=`<path d="M${cx-17} ${my-3} h34 l-7 ${h+6} h-20 z" fill="#9DB4AE" stroke="${INK}" stroke-width="1.1"/>`;
  s+=`<path d="M${cx-70} ${my-30} q30 4 50 -8 q12 -7 20 2" stroke="${DNAC}" stroke-width="2.4" fill="none"/>`;
  s+=`<path d="M${cx} ${my-16} V${my+h+22}" stroke="${DNAC}" stroke-width="2.2"/>`;
  s+=prot(cx-26,my-18,15,10,'#C99A2E','motor',{fs:8.5});
  if(o.label)s+=T(cx,my+h+40,o.label,'note mid f11');
  return s;}
/* generic trace: pts = array of y values 0..1, drawn in a box */
function trace(x,y,w,h,pts,o={}){
  let d='';pts.forEach((v,i)=>{const px=x+i*w/(pts.length-1),py=y+h-v*h;d+=(i?(o.step?`H${FX(px)} V${FX(py)}`:`L${FX(px)} ${FX(py)}`):`M${FX(px)} ${FX(py)}`);});
  let s=o.frame===false?'':`<path d="M${x} ${y} V${y+h} H${x+w}" stroke="${AXC}" stroke-width="1.1" fill="none"/>`;
  return s+`<path d="${d}" stroke="${o.col||SIGC}" stroke-width="${o.w||1.8}" fill="none" stroke-linejoin="round"/>`+(o.label?T(x+w/2,y+h+16,o.label,'note mid f11'):'');}
/* sanger-style chromatogram: seq of bases as gaussian peaks */
function chroma(x,y,w,h,seq,o={}){
  const n=seq.length, dx=w/n;let s=`<path d="M${x} ${y+h} H${x+w}" stroke="${AXC}" stroke-width="1"/>`;
  seq.split('').forEach((b,i)=>{const cx=x+dx*(i+.5);
    let d=`M${FX(cx-dx*.5)} ${FX(y+h)}`;for(let t=-.5;t<=.5;t+=.1){const px=cx+t*dx,py=y+h-h*.82*Math.exp(-t*t*18);d+=` L${FX(px)} ${FX(py)}`;}
    s+=`<path d="${d}" stroke="${NB[b]}" stroke-width="1.6" fill="none"/>`+Tc(FX(cx),FX(y+h+14),b,NB[b],o.fs||11,'mono mid','600');});
  return s;}
/* coloured base letters in a row */
function baseSeq(x,y,seq,dx,o={}){
  return seq.split('').map((b,i)=>Tc(FX(x+i*dx+dx/2),y,b,NB[b]||'#6A5B47',o.fs||12,'mono mid','600')).join('');}
/* stacked reads aligned under a reference line */
function pileup(x,y,w,reads,o={}){
  let s=`<path d="M${x} ${y} H${x+w}" stroke="${BB}" stroke-width="2.6"/>`;
  reads.forEach((r,i)=>{const rx=x+r[0]*w,rw=r[1]*w,ry=y+12+i*(o.gap||9);
    s+=`<path d="M${FX(rx)} ${FX(ry)} h${FX(rw)}" stroke="${r[2]||'#8FB1CF'}" stroke-width="${o.sw||5}" stroke-linecap="round"/>`;});
  return s;}

/* clickable external link rendered inside the plate */
function xlink(x,y,text,url,o={}){
  return `<a href="${url}" target="_blank" rel="noopener"><text x="${FX(x)}" y="${FX(y)}" class="mono ${o.a||'start'} ${o.fs||'f11'}">${text} \u2197</text></a>`;}
const VENDOR={
  illumina:['Illumina: sequencing by synthesis, with animation','https://www.illumina.com/science/technology/next-generation-sequencing/sequencing-technology.html'],
  ion:['Thermo Fisher: Ion Torrent semiconductor sequencing','https://www.thermofisher.com/sg/en/home/life-science/sequencing/next-generation-sequencing/ion-torrent-next-generation-sequencing-technology.html'],
  mgi:['MGI: DNBSEQ technology, with figures','https://global-mgitech.com/technologies/dnbseq-technology'],
  pacbio:['PacBio: the steps of SMRT sequencing','https://www.pacb.com/blog/steps-of-smrt-sequencing'],
  hifi:['PacBio: HiFi reads','https://www.pacb.com/technology/hifi-sequencing/'],
  ont:['Oxford Nanopore: how nanopore sequencing works','https://nanoporetech.com/platform/technology']};
function vendorLine(n,y,keys){let s='',yy=y;keys.forEach(k=>{const v=VENDOR[k];s+=xlink(n?16:30,yy,n?v[0].replace(/, with (animation|figures)/,''):v[0],v[1],{fs:n?'f10':'f11'});yy+=16;});return {s,y:yy};}
/* ===================== Part I · the idea ===================== */
const OUT=[['Sanger capillary, 96 wells','c. 2000',7.7e4,'#9A9384'],['454 pyrosequencing','2005',2e7,'#B9AE96'],['Illumina Genome Analyzer','2007',1e9,'#8FB1CF'],
 ['Illumina HiSeq 2500','2013',6e11,'#5E87AD'],['Illumina NovaSeq X','2023',1.6e13,'#2F5276'],['Nanopore PromethION','2023',1.4e13,'#C17A2C']];
