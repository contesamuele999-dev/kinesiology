const fs=require("fs");
const {JSDOM}=require("jsdom");
const src=fs.readFileSync("assets/js/data.js","utf8");
const COORD=eval(src.replace('if (typeof window !== "undefined") window.COORDINATE = COORDINATE;','')+"\nCOORDINATE;");
const html=fs.readFileSync("index.html","utf8");
const dom=new JSDOM(html,{runScripts:"outside-only",url:"http://localhost/",pretendToBeVisual:true});
const w=dom.window;
w.matchMedia=function(){return{matches:false,media:"",onchange:null,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){},dispatchEvent(){return false;}};};
w.scrollTo=()=>{}; w.COORDINATE=COORD;
let app=fs.readFileSync("assets/js/app.js","utf8");
// esporta sectionsFor e posFor appena prima della chiusura dell'IIFE
app=app.replace(/\n\}\)\(\);\s*$/, "\n  window.__sectionsFor=sectionsFor; window.__posFor=posFor;\n})();\n");
w.eval(app);
console.log("export sectionsFor:", typeof w.__sectionsFor);

function testPair(id1,merName){
  const c1=COORD.find(c=>c.id===id1);
  const c2=COORD.find(c=>c.id!==id1 && (c.meridianoKey===merName));
  const row=w.__posFor(c1,c2);
  const secs=w.__sectionsFor(c1,c2,row);
  const refl=secs.find(s=>s.id==="reflessologia").html;
  const nImg=(refl.match(/pageimg/g)||[]).length;
  const heads=["Corpo ·","Mani ·","Piedi ·","Ruota energetica"].filter(h=>refl.includes(h));
  console.log(`\n[${id1} + ${c2?c2.id:'?'}] pos=${row?row.posizione:'-'} img=${nImg} heads=${JSON.stringify(heads)}`);
  console.log("   dominanze:",["destra","sinistra","destro","sinistro"].filter(d=>refl.includes("dominante "+d)).join(","));
}
// cuore: posizione con meridiano "Vaso Concezione" (VC) -> c2 vc-sovraspinato
testPair("cuore-sottoscapolare","Vaso Concezione");
// rene: feet parziali -> verifica una posizione con piede presente e una senza
testPair("rene-psoas","Vaso Concezione");
// milza-trapezio: mani parziali
testPair("milza-trapezio-medio","Vaso Concezione");
