const fs=require("fs");
const {JSDOM}=require("jsdom");
const src=fs.readFileSync("assets/js/data.js","utf8");
const COORD=eval(src.replace('if (typeof window !== "undefined") window.COORDINATE = COORDINATE;','')+"\nCOORDINATE;");
// scegli una coppia valida per cuore: trova un meridiano posizione presente nella sua tabella
const c1=COORD.find(c=>c.id==="cuore-sottoscapolare");
const merKey=c1.atteggiamenti[0].meridiano; // meridianoKey della 1a posizione
const c2=COORD.find(c=>c.meridianoKey===merKey) || COORD.find(c=>c.meridiano===merKey);
console.log("Coppia test:", c1.id, "+", c2.id, "(pos meridiano:", merKey, ")");

const html=fs.readFileSync("index.html","utf8");
const dom=new JSDOM(html,{runScripts:"outside-only",url:"http://localhost/#/"+c1.id+"+"+c2.id,pretendToBeVisual:true});
const w=dom.window;
w.matchMedia=w.matchMedia||function(){return{matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}};};
w.scrollTo=()=>{};
w.COORDINATE=COORD;
try{ w.eval(fs.readFileSync("assets/js/app.js","utf8")); }catch(e){ console.log("eval err:",e.message.slice(0,120)); }
// forza un render se l'app usa hashchange
try{ w.dispatchEvent(new w.Event("hashchange")); }catch(e){}
try{ w.document.dispatchEvent(new w.Event("DOMContentLoaded")); }catch(e){}

const doc=w.document;
// trova la sezione reflessologia
const body=doc.body.innerHTML;
const secReflex = body.includes("Reflessologia (Basket Weaver)");
console.log("Sezione Reflessologia presente:", secReflex);
for(const kw of ["Corpo ·","Mani ·","Piedi ·","Ruota energetica","dominante destra","dominante sinistra","dominante destro","dominante sinistro"]){
  console.log("  contiene «"+kw+"»:", body.includes(kw));
}
// conta immagini reflessologia (path assets/pages/.../pos/ o ruota)
const imgs=(body.match(/assets\/pages\/[^"']+/g)||[]);
console.log("  immagini reflex referenziate nel DOM:", imgs.length);
console.log("  esempio:", imgs.slice(0,6));
