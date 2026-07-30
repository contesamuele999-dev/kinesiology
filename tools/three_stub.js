/* stub minimale di Three.js per i test jsdom */
function Col(c){ this.set(c); }
Col.prototype.set=function(c){ this._v = (typeof c==='string')? c : c; return this; };
Col.prototype.clone=function(){ return new Col(this._v); };
Col.prototype.multiplyScalar=function(){ return this; };
Col.prototype.offsetHSL=function(){ return this; };
Col.prototype.getHexString=function(){ return "000000"; };

function V3(x,y,z){ this.x=x||0; this.y=y||0; this.z=z||0; }
V3.prototype.set=function(x,y,z){ this.x=x;this.y=y;this.z=z; return this; };
V3.prototype.setScalar=function(v){ this.x=this.y=this.z=v; return this; };
V3.prototype.copy=function(o){ this.x=o.x;this.y=o.y;this.z=o.z; return this; };
V3.prototype.clone=function(){ return new V3(this.x,this.y,this.z); };
V3.prototype.addScaledVector=function(v,s){ this.x+=v.x*s; this.y+=v.y*s; this.z+=v.z*s; return this; };
V3.prototype.normalize=function(){ var l=Math.hypot(this.x,this.y,this.z)||1; this.x/=l;this.y/=l;this.z/=l; return this; };
function V2(x,y){ this.x=x||0; this.y=y||0; }
V2.prototype.set=function(x,y){ this.x=x;this.y=y; return this; };

function Obj3(){ this.children=[]; this.userData={}; this.visible=true; this.parent=null;
  this.position=new V3(); this.rotation=new V3(); this.scale=new V3(1,1,1); this.name=""; }
Obj3.prototype.add=function(){ for(const o of arguments){ if(o){ o.parent=this; this.children.push(o);} } return this; };
Obj3.prototype.remove=function(o){ const i=this.children.indexOf(o); if(i>=0){ this.children.splice(i,1); o.parent=null; } return this; };
Obj3.prototype.traverse=function(cb){ cb(this); this.children.forEach(c=>c.traverse&&c.traverse(cb)); };

function Group(){ Obj3.call(this); }
Group.prototype=Object.create(Obj3.prototype);

function Geo(){ this.disposed=false; }
Geo.prototype.scale=function(){ return this; };
Geo.prototype.dispose=function(){ this.disposed=true; };

function Mat(o){ Object.assign(this, o||{}); this.color=new Col((o&&o.color)||0); this.emissive=new Col((o&&o.emissive)||0);
  if(this.opacity==null) this.opacity=1; }
function Mesh(geo,mat){ Obj3.call(this); this.isMesh=true; this.geometry=geo||new Geo(); this.material=mat||new Mat(); }
Mesh.prototype=Object.create(Obj3.prototype);
Mesh.prototype.scale=null;
function mkMesh(geo,mat){ const m=new Mesh(geo,mat); m.scale=new V3(1,1,1); return m; }

function Curve(pts){ this.points=pts||[]; }
Curve.prototype.getPoint=function(t){
  var p=this.points; if(!p.length) return new V3();
  var f=t*(p.length-1), i=Math.min(p.length-2,Math.floor(f)), u=f-i;
  if(p.length===1) return p[0].clone();
  return new V3(p[i].x+(p[i+1].x-p[i].x)*u, p[i].y+(p[i+1].y-p[i].y)*u, p[i].z+(p[i+1].z-p[i].z)*u);
};
Curve.prototype.computeFrenetFrames=function(n){
  var N=[],B=[],T=[];
  for(var i=0;i<=n;i++){ N.push(new V3(1,0,0)); B.push(new V3(0,0,1)); T.push(new V3(0,1,0)); }
  return {normals:N,binormals:B,tangents:T};
};

const THREE = {
  Group: Group, Vector2: V2, Vector3: V3, Color: Col,
  LatheGeometry: Geo, SphereGeometry: Geo, CylinderGeometry: Geo, BoxGeometry: Geo,
  TubeGeometry: function(){ return new Geo(); },
  CatmullRomCurve3: Curve,
  MeshStandardMaterial: Mat, MeshBasicMaterial: Mat, SpriteMaterial: Mat,
  Mesh: function(g,m){ return mkMesh(g,m); },
  Sprite: function(m){ const s=mkMesh(new Geo(), m); s.isSprite=true; return s; },
  CanvasTexture: function(){ return {}; },
  Scene: function(){ const s=new Group(); s.background=null; return s; },
  PerspectiveCamera: function(){ const c=new Obj3(); c.lookAt=function(){}; c.updateProjectionMatrix=function(){}; c.aspect=1; return c; },
  WebGLRenderer: function(){
    const el = (typeof global.document !== 'undefined' && global.document) ? global.document.createElement('canvas') : null;
    return { domElement: el, setPixelRatio(){}, setSize(){}, render(){} };
  },
  Raycaster: function(){ this.setFromCamera=function(){}; this.intersectObjects=function(){ return (THREE.__hits||[]); }; },
  HemisphereLight: function(){ return new Obj3(); },
  DirectionalLight: function(){ const o=new Obj3(); return o; },
  BufferGeometry: function(){ var g=new Geo(); g.attributes={}; g.index=null;
    g.setIndex=function(a){ g.index={count:a.length}; return g; };
    g.setAttribute=function(k,v){ g.attributes[k]=v; return g; };
    return g; },
  Float32BufferAttribute: function(arr,size){ return { array:arr, itemSize:size, count:arr.length/size }; },
  __hits: []
};
module.exports = THREE;
