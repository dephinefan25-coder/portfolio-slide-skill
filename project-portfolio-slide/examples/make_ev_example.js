// EXAMPLE ONLY: the author's own project (WA electric car county analysis). Copy this file and replace the text and visuals with your project.
// Run: NODE_PATH=<dir with pptxgenjs> node make_ev_example.js && python3 ../fix.py EV_Adoption_Portfolio_recruiter.pptx
const pptxgen = require('pptxgenjs');
const path = require('path');
const D = __dirname;
const BG='FBF5EA', TEAL='1F5E57', FRAME='86A8A0', INK='1A1A1A', BODY='333333';
const pres = new pptxgen(); pres.layout='LAYOUT_WIDE'; pres.title='EV Adoption Analysis – Portfolio (recruiter-friendly)';
const s = pres.addSlide(); s.background={color:BG};
function runs(str, base){ // **bold** markup
  const out=[]; str.split(/(\*\*[^*]+\*\*)/).forEach(p=>{ if(!p) return;
    const b=p.startsWith('**'); out.push({text:b?p.slice(2,-2):p, options:Object.assign({}, base, b?{bold:true,color:INK}:{} )}); });
  return out;
}
const HF='Arial Narrow', BF='Calibri';
// Title
s.addText([
  {text:'1. ', options:{color:TEAL, italic:true, fontFace:'Cambria'}},
  {text:'WA ELECTRIC CARS - ', options:{color:INK}},
  {text:'COUNTY ANALYSIS', options:{color:TEAL}},
], {x:0.6,y:0.3,w:12.1,h:0.85,fontFace:HF,fontSize:38,bold:true,margin:0,valign:'middle',isTextBox:true});
const X=0.75, Wt=7.85; let y=1.35;
function section(head, body, h, bullets){
  s.addText(head,{x:X,y,w:Wt,h:0.36,fontFace:HF,fontSize:19,bold:true,color:TEAL,margin:0,isTextBox:true});
  y+=0.38;
  const base={fontFace:BF,fontSize:13.5,color:BODY};
  let content;
  if(bullets){ content=[]; body.forEach((b,i)=>{ const r=runs(b,base); r[r.length-1].options.breakLine = i<body.length-1; r[0].options.bullet={indent:14}; r[0].options.paraSpaceAfter=3; content.push(...r); }); }
  else content=runs(body,base);
  s.addText(content,Object.assign({x:X,y,w:Wt,h,margin:0,valign:'top',isTextBox:true,lineSpacingMultiple:1.05}, {}));
  y+=h+0.1;
}
section('PROBLEM','Washington has nearly **290K** registered electric vehicles (EVs), but some counties buy far more than others. Carmakers, policymakers, and utilities need to know **where demand is growing and why** to plan inventory, incentives, and charging stations.',0.68);
section('OBJECTIVE','Find which counties lead in **EV adoption and growth**, and test whether **income**, **clean-vehicle incentive eligibility**, **driving range**, and **car brand** explain the gaps.',0.46);
section('ACTION',[
 'Cleaned and combined **4 public datasets (~293K rows)** in **SQL**',
 'Compared counties on **adoption rate**, **yearly growth**, and **share of fully electric cars**',
 'Mapped results in **Python** and used **correlation analysis** to test what drives adoption'
],0.95,true);
section('OUTCOME',[
 '**King County** has the most EVs but ranks only **4th** in adoption rate',
 '**41.8%** of EVs go **300–350 miles** on a full charge, led by **Tesla**',
 'Found that **access to charging**, not **income**, drives fully electric car purchases'
],1.0,true);
// Images
const IX=8.95, IW=3.75, IH=IW*815/1446;
[[ 'ev_share.png','Share of EVs that are fully electric',1.45],['ev_range.png','Average miles per full charge',4.3]].forEach(([f,cap,iy])=>{
  s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:IX-0.08,y:iy-0.08,w:IW+0.16,h:IH+0.16,fill:{color:'FFFFFF'},line:{color:FRAME,width:4},rectRadius:0.06});
  s.addImage({path:path.join(D,f),x:IX,y:iy,w:IW,h:IH,altText:cap});
  s.addText('▲ '+cap,{x:IX-0.1,y:iy+IH+0.12,w:IW+0.2,h:0.3,fontFace:BF,fontSize:12,color:INK,align:'center',margin:0,isTextBox:true});
});
s.addNotes('Sources: SQL Presentation 1.pptx (slides 3-6, 8-10, 16) and SQL_Final_Haoran.sql. Plain-language rewrite of EV_Adoption_Portfolio.pptx per prompt/portfolio-prompt-v1-recruiter.md. Fully electric = battery-only, no gas engine (BEV); clean-vehicle incentive eligibility = WA CAFV status.');
pres.writeFile({fileName:path.join(D,'EV_Adoption_Portfolio_recruiter.pptx')}).then(f=>console.log(f));
