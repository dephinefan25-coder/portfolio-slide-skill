// EXAMPLE ONLY: the author's own project (PM system migration). Copy this file and replace the text and visuals with your project.
// Run: NODE_PATH=<dir with pptxgenjs> node make_pm_example.js && python3 fix.py PM_System_Migration_Portfolio.pptx
const pptxgen = require('pptxgenjs');
const path = require('path');
const D = __dirname;
const BG='FBF5EA', TEAL='1F5E57', FRAME='86A8A0', INK='1A1A1A', BODY='333333', GREY='A9A9A9', LT='E3EEEC';
const pres = new pptxgen(); pres.layout='LAYOUT_WIDE'; pres.title='Project Management System Migration – Portfolio';
const s = pres.addSlide(); s.background={color:BG};
function runs(str, base){ const out=[]; str.split(/(\*\*[^*]+\*\*)/).forEach(p=>{ if(!p) return;
  const b=p.startsWith('**'); out.push({text:b?p.slice(2,-2):p, options:Object.assign({}, base, b?{bold:true,color:INK}:{} )}); }); return out; }
const HF='Arial Narrow', BF='Calibri';
s.addText([
  {text:'2. ', options:{color:TEAL, italic:true, fontFace:'Cambria'}},
  {text:'PM SYSTEM MIGRATION - ', options:{color:INK}},
  {text:'ANAPLAN → MSPO', options:{color:TEAL}},
], {x:0.6,y:0.3,w:12.1,h:0.85,fontFace:HF,fontSize:34,bold:true,margin:0,valign:'middle',isTextBox:true});
const X=0.75, Wt=7.85; let y=1.35;
function section(head, body, h, bullets){
  s.addText(head,{x:X,y,w:Wt,h:0.36,fontFace:HF,fontSize:19,bold:true,color:TEAL,margin:0,isTextBox:true});
  y+=0.38; const base={fontFace:BF,fontSize:13.5,color:BODY}; let content;
  if(bullets){ content=[]; body.forEach((b,i)=>{ const r=runs(b,base); r[r.length-1].options.breakLine = i<body.length-1; r[0].options.bullet={indent:14}; r[0].options.paraSpaceAfter=3; content.push(...r); }); }
  else content=runs(body,base);
  s.addText(content,{x:X,y,w:Wt,h,margin:0,valign:'top',isTextBox:true,lineSpacingMultiple:1.05});
  y+=h+0.1;
}
section('PROBLEM','The Digital Transformation project portfolio ran on **Anaplan**, which was hitting its limits, costing a lot in **licenses**, and close to expiring. Years of staff turnover had left the model\'s logic poorly documented, so few people knew how it worked.',0.68);
section('OBJECTIVE','Lead the business side of the move to **Microsoft Project Online (MSPO)**, from **requirements** to **reporting**, and simplify the process along the way.',0.46);
section('ACTION',[
 'Turned requirements from **9 business groups** into an **MSPO** build package for IT',
 'Redesigned **program setup** and automated **approval routing** by funding bucket',
 'Rebuilt the **data flow** and repointed the leadership **Power BI** dashboard'
],0.95,true);
section('OUTCOME',[
 'Saved **~$300K** a year in **license cost** once Anaplan was retired',
 'Cut the steps to set up a program by about **33%**',
 'Moved **200+ programs** into one tool instead of two'
],1.0,true);

const IX=8.95, IW=3.75, IH=IW*860/1446, Y1=4.3, Y2=1.45;
function frame(iy,cap){
  s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:IX-0.08,y:iy-0.08,w:IW+0.16,h:IH+0.16,fill:{color:'FFFFFF'},line:{color:FRAME,width:4},rectRadius:0.06});
  s.addText('▲ '+cap,{x:IX-0.1,y:iy+IH+0.12,w:IW+0.2,h:0.3,fontFace:BF,fontSize:12,color:INK,align:'center',margin:0,isTextBox:true});
}
// Visual 1: setup steps bar chart
frame(Y1,'Program Setup: 18 → 12 Steps');
s.addChart(pres.charts.BAR,[{name:'Steps',labels:['Before (Anaplan)','After (MSPO)'],values:[18,12]}],{
  x:IX+0.1,y:Y1+0.05,w:IW-0.2,h:IH-0.1,barDir:'bar',chartColors:[GREY,TEAL],
  showTitle:true,title:'Steps to set up a program',titleFontFace:BF,titleFontSize:11,titleColor:INK,
  showValue:true,dataLabelFontFace:BF,dataLabelFontSize:12,dataLabelFontBold:true,dataLabelColor:INK,dataLabelPosition:'outEnd',
  catAxisLabelFontFace:BF,catAxisLabelFontSize:10,catAxisLabelColor:BODY,catAxisOrientation:'maxMin',
  valAxisHidden:true,valAxisMaxVal:21,valAxisMinVal:0,valGridLine:{style:'none'},catGridLine:{style:'none'},barGapWidthPct:60,
  plotArea:{fill:{color:'FFFFFF'}},showLegend:false});
// Visual 2: system flow before vs after
frame(Y2,'System Flow Before vs. After Migration');
const box=(t,x,yy,w,h,fill,col,bold)=>s.addText(t,{x,y:yy,w,h,shape:pres.shapes.ROUNDED_RECTANGLE,rectRadius:0.05,fill:{color:fill},line:{color:fill===TEAL?TEAL:FRAME,width:1},fontFace:BF,fontSize:8,color:col,bold:!!bold,align:'center',valign:'middle',margin:2});
const arrow=(x,yy)=>s.addText('→',{x,y:yy,w:0.25,h:0.3,fontFace:BF,fontSize:14,bold:true,color:TEAL,align:'center',valign:'middle',margin:0});
const lab=(t,yy,c)=>s.addText(t,{x:IX+0.12,y:yy,w:1.5,h:0.2,fontFace:HF,fontSize:10,bold:true,color:c,margin:0});
const c1=IX+0.12,w1=1.25,c2=IX+1.62,w2=0.9,c3=IX+2.71,w3=0.96;
let b=Y2+0.1; lab('BEFORE',b,'7A7A7A'); b+=0.22;
box([{text:'Anaplan',options:{bold:true,breakLine:true}},{text:'programs & budgets'}],c1,b,w1,0.36,'F2F2F2',BODY);
box([{text:'MSPO',options:{bold:true,breakLine:true}},{text:'projects'}],c1,b+0.42,w1,0.36,'F2F2F2',BODY);
arrow(c1+w1+0.0,b+0.24); box('Data platform',c2,b+0.21,w2,0.36,'F2F2F2',BODY,true);
arrow(c2+w2-0.02,b+0.24); box([{text:'Power BI',options:{bold:true,breakLine:true}},{text:'dashboard'}],c3,b+0.21,w3,0.36,'F2F2F2',BODY);
b=Y2+1.2; lab('AFTER',b,TEAL); b+=0.22;
box([{text:'MSPO',options:{bold:true,breakLine:true}},{text:'programs, projects & approvals'}],c1,b,w1,0.6,TEAL,'FFFFFF');
arrow(c1+w1+0.0,b+0.15); box([{text:'Data platform',options:{bold:true,breakLine:true}},{text:'new source'}],c2,b+0.12,w2,0.36,LT,TEAL);
arrow(c2+w2-0.02,b+0.15); box([{text:'Power BI',options:{bold:true,breakLine:true}},{text:'repointed'}],c3,b+0.12,w3,0.36,LT,TEAL);
s.addNotes('Source: dephinefan25-coder.github.io/#anaplan-migration (case study section).');
pres.writeFile({fileName:path.join(D,'PM_System_Migration_Portfolio.pptx')}).then(f=>console.log(f));
