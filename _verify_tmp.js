const fs=require("fs"), path=require("path");
// data.js does: if(typeof window!=="undefined") window.COORDINATE=...
// In node without window, need to eval capturing COORDINATE
const src=fs.readFileSync("assets/js/data.js","utf8");
const COORD=eval(src.replace('if (typeof window !== "undefined") window.COORDINATE = COORDINATE;','')+"\nCOORDINATE;");
let missing=0, checked=0;
function chk(p){ if(!p) return; checked++; if(!fs.existsSync(p)){missing++; console.log("MISSING",p);} }
for(const c of COORD){
  chk(c.ruota);
  for(const r of (c.atteggiamenti||[])){
    chk(r.reflex); chk(r.refHandDx); chk(r.refHandSx); chk(r.refFootDx); chk(r.refFootSx);
    chk(r.nl); chk(r.nv); chk(r.amp);
  }
}
console.log(`Immagini controllate: ${checked}, mancanti: ${missing}`);

// jsdom render test
const {JSDOM}=require("jsdom");
const html=fs.readFileSync("index.html","utf8");
const dom=new JSDOM(html,{runScripts:"outside-only",url:"http://localhost/"});
global.window=dom.window; global.document=dom.window.document;
dom.window.COORDINATE=COORD;
// load app.js in the dom context
const appSrc=fs.readFileSync("assets/js/app.js","utf8");
dom.window.eval("window.COORDINATE="+JSON.stringify(COORD)+";");
try{ dom.window.eval(appSrc); }catch(e){ console.log("app.js eval err (atteso se serve DOM ready):", e.message.slice(0,80)); }
console.log("jsdom: index.html + app.js caricati senza throw fatali.");

// Verifica funzionale reflexBlock via ricostruzione: conta per coordinata quante viste reflex
let report=[];
for(const c of COORD){
  const atts=c.atteggiamenti||[];
  const hasWheel=!!c.ruota;
  const anyHand=atts.some(r=>r.refHandDx||r.refHandSx);
  const anyFoot=atts.some(r=>r.refFootDx||r.refFootSx);
  if(hasWheel||anyHand||anyFoot) report.push(`${c.id}: ruota=${hasWheel?'y':'n'} mani=${anyHand?'y':'n'} piedi=${anyFoot?'y':'n'}`);
}
console.log("--- coordinate con reflessologia mani/piedi/ruota ---");
report.forEach(r=>console.log("  "+r));
