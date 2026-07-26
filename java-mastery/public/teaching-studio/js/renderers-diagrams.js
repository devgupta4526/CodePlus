// ═══════════════════════════════════════════════════════════════════════════
// renderers-diagrams.js  —  Diagrams, charts, and visual layouts
// ═══════════════════════════════════════════════════════════════════════════

/* DIAGRAM */
function renderDiagramDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(36,z)} ${px(46,z)};display:flex;flex-direction:column`);
  c.appendChild(el('div',`font-size:${px(28,z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;margin-bottom:${px(4,z)};${as(anim,0,z)}`,escHtml(s.title||'')));
  c.appendChild(el('div',`font-size:${px(13,z)};color:${acc};font-family:'Space Grotesk',sans-serif;margin-bottom:${px(18,z)};${as(anim,80,z)}`,escHtml(s.subtitle||'')));
  
  if(!s.diagramNodes||!s.diagramNodes.length){
    const seed=seedDiagramNodes(s.diagramType);
    s.diagramNodes=JSON.parse(JSON.stringify(seed.nodes));
    if(!s.diagramStyle) s.diagramStyle=seed.style;
  }
  const style=s.diagramStyle||'grid';
  const diag=el('div',`flex:1;display:flex;align-items:center;justify-content:center;${as(anim,160,z)}`);
  
  if(style==='chain') diag.innerHTML=buildChainDiagram(s.diagramNodes,acc,z);
  else if(style==='columns') diag.innerHTML=buildColumnsDiagram(s.diagramNodes,acc,z);
  else if(style==='layered') diag.innerHTML=buildLayeredDiagram(s.diagramNodes,acc,z);
  else diag.innerHTML=buildCustomDiagram(s.diagramNodes,acc,z);
  
  c.appendChild(diag); t.appendChild(c);
}

function seedDiagramNodes(type){
  const P={
    jvm:{style:'columns',nodes:[
      {label:'ClassLoader',color:'#7c8cf8',column:0,items:[]},
      {label:'Bytecode Verifier',color:'#7cd4f8',column:0,items:[]},
      {label:'JIT Compiler',color:'#7cf8a0',column:0,items:[]},
      {label:'Native Code',color:'#f8d07c',column:0,items:[]},
      {label:'Method Area',color:'#c792ea',column:1,items:[]},
      {label:'Heap',color:'#f87c7c',column:1,items:[]},
      {label:'Stack (per thread)',color:'#f87cd4',column:1,items:[]},
      {label:'PC Register',color:'#7c8cf8',column:1,items:[]},
      {label:'G1 GC',color:'#7cf8a0',column:2,items:[]},
      {label:'ZGC',color:'#7cd4f8',column:2,items:[]},
      {label:'Shenandoah',color:'#f8d07c',column:2,items:[]},
    ]},
    security:{style:'chain',nodes:[
      {label:'HTTP Request',color:'#7c8cf8',items:[]},
      {label:'SecurityContextPersistenceFilter',color:'#7cd4f8',items:[]},
      {label:'UsernamePasswordAuthFilter',color:'#c792ea',items:[]},
      {label:'JwtAuthFilter (custom)',color:'#f8d07c',items:[]},
      {label:'ExceptionTranslationFilter',color:'#f87c7c',items:[]},
      {label:'FilterSecurityInterceptor',color:'#7cf8a0',items:[]},
      {label:'DispatcherServlet → Controller',color:'#7c8cf8',items:[]},
    ]},
    springboot:{style:'grid',nodes:[
      {label:'@Controller',color:'#7c8cf8',items:[]},{label:'@Service',color:'#7cf8a0',items:[]},
      {label:'@Repository',color:'#f8d07c',items:[]},{label:'@Entity',color:'#f87c7c',items:[]},
      {label:'@Configuration',color:'#c792ea',items:[]},{label:'@Aspect',color:'#7cd4f8',items:[]},
      {label:'@Component',color:'#f87cd4',items:[]},{label:'@RestController',color:'#7c8cf8',items:[]},
    ]},
    gc:{style:'columns',nodes:[
      {label:'Eden',color:'#7cf8a0',column:0,items:['New objects allocated here']},
      {label:'Survivor S0',color:'#7cd4f8',column:0,items:['Objects that survived 1 GC']},
      {label:'Survivor S1',color:'#7cd4f8',column:0,items:['Objects that survived 2 GC']},
      {label:'Old Gen',color:'#c792ea',column:0,items:['Long-lived objects promoted here']},
      {label:'Metaspace',color:'#f8d07c',column:0,items:['Class metadata & bytecode']},
      {label:'1. Mark',color:'#7c8cf8',column:1,items:['Find all reachable objects from GC Roots']},
      {label:'2. Sweep',color:'#f87c7c',column:1,items:['Reclaim memory of unreachable objects']},
      {label:'3. Compact',color:'#7cf8a0',column:1,items:['Move survivors together, remove fragmentation']},
    ]},
    'rest-api':{style:'layered',nodes:[
      {label:'🌐 HTTP Client',color:'#7c8cf8',items:['Browser / Mobile / curl']},
      {label:'📡 @RestController',color:'#7cd4f8',items:['Handles HTTP, validates input, returns DTO']},
      {label:'⚙️ @Service',color:'#c792ea',items:['Business logic, transactions, orchestration']},
      {label:'🗄️ @Repository',color:'#7cf8a0',items:['Data access layer — JPA / JDBC / Redis']},
      {label:'💾 Database',color:'#f8d07c',items:['PostgreSQL / MySQL / MongoDB']},
    ]},
    microservices:{style:'layered',nodes:[
      {label:'API Gateway',color:'#7c8cf8',items:['Auth, rate-limit, routing']},
      {label:'User Service',color:'#7cf8a0',items:['CRUD, JWT issuer']},
      {label:'Order Service',color:'#f8d07c',items:['Cart, checkout, pricing']},
      {label:'Notification Service',color:'#f87cd4',items:['Email, SMS, push']},
      {label:'Message Broker',color:'#c792ea',items:['Kafka / RabbitMQ']},
      {label:'Database (per service)',color:'#7cd4f8',items:['Polyglot persistence']},
    ]},
    oop:{style:'grid',nodes:[
      {label:'🔒 Encapsulation',color:'#7c8cf8',items:['private fields','public getters/setters','hides implementation']},
      {label:'🧬 Inheritance',color:'#7cf8a0',items:['extends keyword','is-a relationship','reuse parent behavior']},
      {label:'🔀 Polymorphism',color:'#f8d07c',items:['method overriding','interface dispatch','runtime binding']},
      {label:'🎭 Abstraction',color:'#c792ea',items:['abstract class / interface','hide complexity','define contracts']},
    ]},
    solid:{style:'chain',nodes:[
      {label:'S — Single Responsibility',color:'#7c8cf8',items:['One class, one reason to change']},
      {label:'O — Open / Closed',color:'#7cf8a0',items:['Open for extension, closed for modification']},
      {label:'L — Liskov Substitution',color:'#f8d07c',items:['Subtypes must be substitutable for their base type']},
      {label:'I — Interface Segregation',color:'#f87cd4',items:['Prefer small focused interfaces']},
      {label:'D — Dependency Inversion',color:'#c792ea',items:['Depend on abstractions, not concretions']},
    ]},
    'design-patterns':{style:'grid',nodes:[
      {label:'Creational',color:'#7c8cf8',items:['Singleton','Factory','Builder','Prototype','Abstract Factory']},
      {label:'Structural',color:'#7cf8a0',items:['Adapter','Decorator','Proxy','Facade','Bridge','Composite']},
      {label:'Behavioral',color:'#f8d07c',items:['Observer','Strategy','Command','Iterator','Template Method']},
    ]},
    concurrency:{style:'grid',nodes:[
      {label:'🧵 Thread',color:'#7c8cf8',items:['Lightweight unit of execution sharing process memory']},
      {label:'🔒 synchronized',color:'#f87c7c',items:['Acquires intrinsic lock — one thread at a time']},
      {label:'⚡ volatile',color:'#f8d07c',items:['Prevents caching — reads always from main memory']},
      {label:'⚛️ AtomicInteger',color:'#7cf8a0',items:['Lock-free CAS operation — fastest counter pattern']},
      {label:'🗝️ ReentrantLock',color:'#c792ea',items:['Explicit lock with tryLock, fairness']},
      {label:'🔮 CompletableFuture',color:'#7cd4f8',items:['Async pipeline — thenApply, thenCompose']},
    ]},
    transactions:{style:'columns',nodes:[
      {label:'A — Atomicity',color:'#7c8cf8',column:0,items:['All-or-nothing commits']},
      {label:'C — Consistency',color:'#7cf8a0',column:0,items:['Valid state to valid state']},
      {label:'I — Isolation',color:'#f8d07c',column:0,items:['Concurrent tx see committed data only']},
      {label:'D — Durability',color:'#f87c7c',column:0,items:['Survives crashes (WAL / fsync)']},
      {label:'READ UNCOMMITTED',color:'#f87c7c',column:1,items:['Dirty read possible']},
      {label:'READ COMMITTED',color:'#f8d07c',column:1,items:['Non-repeatable read possible']},
      {label:'REPEATABLE READ',color:'#7cf8a0',column:1,items:['Phantom read possible']},
      {label:'SERIALIZABLE',color:'#7c8cf8',column:1,items:['No anomalies, lowest throughput']},
    ]},
    custom:{style:'grid',nodes:[]},
  };
  return P[type]||P.custom;
}

function buildCustomDiagram(nodes,acc,z){
  nodes=nodes||[];
  if(!nodes.length){
    return `<div style="font-size:${px(13,z)};color:#3a3d52;font-family:'Inter',sans-serif;text-align:center">Add boxes in the editor (Content tab → Diagram boxes)<br>to build your own diagram</div>`;
  }
  return `<div style="display:flex;gap:${px(16,z)};width:100%;flex-wrap:wrap;justify-content:center;align-items:stretch">
    ${nodes.map((nd,i)=>{
      const c=nd.color||acc;
      const items=(nd.items||[]).map(it=>`<div style="padding:${px(6,z)} ${px(10,z)};margin-bottom:${px(5,z)};border-radius:${px(6,z)};border:1px solid rgba(255,255,255,0.05);background:rgba(0,0,0,0.25);font-size:${px(11,z)};color:#a5a9c4;font-family:'Inter',sans-serif;display:flex;align-items:center;gap:${px(6,z)}"><div style="width:${px(4,z)};height:${px(4,z)};border-radius:50%;background:${c};box-shadow:0 0 6px ${c}"></div>${escHtml(it)}</div>`).join('');
      return `<div style="flex:1;min-width:${px(190,z)};padding:${px(16,z)};border-radius:${px(12,z)};border:1px solid ${c}30;background:linear-gradient(145deg,${c}12,transparent);box-shadow:0 ${px(8,z)} ${px(24,z)} rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05);backdrop-filter:blur(${px(12,z)});animation:scaleIn .5s cubic-bezier(.22,1,.36,1) ${i*90}ms both">
        <div style="font-size:${px(15,z)};font-weight:700;color:${c};font-family:'Space Grotesk',sans-serif;margin-bottom:${items.length?px(12,z):'0'};display:flex;align-items:center;gap:${px(8,z)};text-shadow:0 0 ${px(12,z)} ${c}60"><div style="width:${px(8,z)};height:${px(8,z)};border-radius:50%;background:${c};box-shadow:0 0 ${px(10,z)} ${c}"></div>${escHtml(nd.label||'Untitled')}</div>
        ${items}
      </div>`;
    }).join('')}
  </div>`;
}

function buildChainDiagram(nodes,acc,z){
  nodes=nodes||[];
  if(!nodes.length) return `<div style="font-size:${px(13,z)};color:#3a3d52;font-family:'Inter',sans-serif;text-align:center">Add steps in the editor</div>`;
  return `<div style="display:flex;flex-direction:column;align-items:center;gap:${px(8,z)};width:100%">${nodes.map((nd,i)=>{
    const c=nd.color||acc;
    const desc=(nd.items&&nd.items[0])?`<div style="font-size:${px(11,z)};color:#8C8C85;font-family:'Inter',sans-serif;margin-top:${px(2,z)}">${escHtml(nd.items[0])}</div>`:'';
    return `<div style="width:${px(520,z)};padding:${px(12,z)} ${px(16,z)};border-radius:${px(10,z)};border:1px solid ${c}40;background:linear-gradient(90deg,${c}1a,transparent);box-shadow:0 ${px(6,z)} ${px(16,z)} rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05);backdrop-filter:blur(${px(10,z)});display:flex;align-items:center;gap:${px(16,z)};animation:slideIn .5s cubic-bezier(.22,1,.36,1) ${i*80}ms both">
      <div style="width:${px(28,z)};height:${px(28,z)};border-radius:50%;background:${c}20;border:1px solid ${c}60;display:flex;align-items:center;justify-content:center;font-size:${px(11,z)};color:${c};font-family:'Inter',sans-serif;font-weight:700;box-shadow:0 0 ${px(12,z)} ${c}40;flex-shrink:0">${String(i+1).padStart(2,'0')}</div>
      <div><div style="font-size:${px(14,z)};color:#F5F5F4;font-family:'Inter',sans-serif;font-weight:600;text-shadow:0 0 ${px(8,z)} ${c}30">${escHtml(nd.label||'')}</div>${desc}</div>
    </div>${i<nodes.length-1?`<div style="font-size:${px(16,z)};color:${acc}80;animation:pulseR ${2.5}s ease infinite">↓</div>`:''}`;
  }).join('')}</div>`;
}

function buildColumnsDiagram(nodes,acc,z){
  nodes=nodes||[];
  if(!nodes.length) return `<div style="font-size:${px(13,z)};color:#3a3d52;font-family:'Inter',sans-serif;text-align:center">Add boxes in the editor</div>`;
  const cols=[[],[],[]];
  nodes.forEach(nd=>{cols[Math.min(2,Math.max(0,+nd.column||0))].push(nd);});
  return `<div style="display:flex;gap:${px(32,z)};align-items:flex-start;justify-content:center">${cols.map(col=>{
    if(!col.length) return '';
    return `<div style="display:flex;flex-direction:column;align-items:center;gap:${px(10,z)}">${col.map((nd,i)=>{
      const c=nd.color||acc;
      const desc=(nd.items&&nd.items[0])?`<div style="font-size:${px(10,z)};color:#8C8C85;font-family:'Inter',sans-serif;max-width:${px(160,z)};text-align:center;margin-top:${px(4,z)}">${escHtml(nd.items[0])}</div>`:'';
      return `<div style="display:flex;flex-direction:column;align-items:center;gap:${px(2,z)};animation:scaleIn .58s cubic-bezier(.22,1,.36,1) ${i*100}ms both">
        <div style="min-width:${px(160,z)};padding:${px(12,z)} ${px(16,z)};border-radius:${px(10,z)};border:1px solid ${c}50;background:linear-gradient(180deg,${c}1a,transparent);box-shadow:0 ${px(8,z)} ${px(20,z)} rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.08);backdrop-filter:blur(${px(8,z)});display:flex;align-items:center;justify-content:center;font-size:${px(13,z)};font-family:'Inter',sans-serif;color:${c};font-weight:700;text-align:center;text-shadow:0 0 ${px(12,z)} ${c}60">${escHtml(nd.label||'')}</div>
        ${desc}
      </div>`;
    }).join('')}</div>`;
  }).join('')}</div>`;
}

function buildLayeredDiagram(nodes,acc,z){
  nodes=nodes||[];
  if(!nodes.length) return `<div style="font-size:${px(13,z)};color:#3a3d52;font-family:'Inter',sans-serif;text-align:center">Add layers in the editor</div>`;
  return `<div style="display:flex;flex-direction:column;align-items:center;gap:0;width:100%;max-width:${px(640,z)};margin:0 auto">
    ${nodes.map((nd,i)=>{
      const c=nd.color||acc;
      const desc=(nd.items&&nd.items[0])?`<div style="font-size:${px(11,z)};color:#8C8C85;font-family:'Inter',sans-serif;margin-top:${px(4,z)}">${escHtml(nd.items[0])}</div>`:'';
      return `<div style="width:100%;padding:${px(14,z)} ${px(22,z)};border-radius:${px(10,z)};border:1px solid ${c}45;background:linear-gradient(180deg,${c}1a,transparent);box-shadow:0 ${px(10,z)} ${px(30,z)} rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.08);backdrop-filter:blur(${px(12,z)});animation:fadeUp .5s cubic-bezier(.22,1,.36,1) ${i*90}ms both">
        <div style="display:flex;align-items:center;gap:${px(10,z)}"><div style="width:${px(8,z)};height:${px(8,z)};border-radius:50%;background:${c};box-shadow:0 0 ${px(12,z)} ${c}"></div><div style="font-size:${px(15,z)};font-weight:700;color:${c};font-family:'Inter',sans-serif;text-shadow:0 0 ${px(12,z)} ${c}60">${escHtml(nd.label||'')}</div></div>${desc}
      </div>${i<nodes.length-1?`<div style="height:${px(16,z)};width:2px;background:linear-gradient(180deg,${c}80,transparent);margin:${px(2,z)} 0;animation:pulseR 2.5s ease infinite"></div>`:''}`;
    }).join('')}
  </div>`;
}

/* IMAGE + TEXT */
function renderImageTextDom(s,acc,anim,t,z){
  const pos=s.imagePosition||'right';
  const c=el('div',`position:absolute;inset:0;padding:${px(36,z)} ${px(46,z)};display:flex;flex-direction:column`);
  const hdr=el('div',`${as(anim,0,z)};margin-bottom:${px(14,z)}`);
  hdr.appendChild(el('div',`font-size:${px(28,z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;margin-bottom:${px(4,z)}`,escHtml(s.title||'')));
  if(s.subtitle) hdr.appendChild(el('div',`font-size:${px(13,z)};color:${acc};font-family:'Space Grotesk',sans-serif`,escHtml(s.subtitle)));
  c.appendChild(hdr);
  const body=el('div',`display:flex;gap:${px(24,z)};flex:1;min-height:0;flex-direction:${pos==='left'?'row-reverse':'row'}`);
  const txtSide=el('div',`flex:1;display:flex;flex-direction:column;gap:${px(8,z)};justify-content:center`);
  (s.bullets||[]).forEach((b,i)=>{
    const row=el('div',`display:flex;gap:${px(12,z)};align-items:flex-start;padding:${px(11,z)} ${px(14,z)};border-radius:${px(8,z)};border:1px solid ${acc}20;background:${acc}08`,'','bullet-item');
    row.dataset.idx=i;
    row.appendChild(el('span',`color:${acc};font-size:${px(14,z)};flex-shrink:0;font-family:'Inter',sans-serif`,'▸'));
    row.appendChild(el('span',`font-size:${px(15,z)};color:#CFCFC8;font-family:'Inter',sans-serif;line-height:1.5`,escHtml(b)));
    txtSide.appendChild(row);
  });
  body.appendChild(txtSide);
  const imgSide=el('div',`flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:0;${as(anim,150,z)}`);
  if(s.imageUrl){
    const img2=el('img','',''); img2.src=s.imageUrl;
    img2.style.cssText=`max-width:100%;max-height:${px(340,z)};border-radius:${px(10,z)};border:1px solid ${acc}30;object-fit:contain;`;
    imgSide.appendChild(img2);
    if(s.imageCaption) imgSide.appendChild(el('div',`font-size:${px(11,z)};color:#666662;font-family:'Space Grotesk',sans-serif;margin-top:${px(8,z)};text-align:center`,escHtml(s.imageCaption)));
  } else {
    const ph=el('div',`width:100%;height:${px(300,z)};border-radius:${px(10,z)};border:2px dashed ${acc}30;background:${acc}06;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${px(10,z)}`);
    ph.appendChild(el('div',`font-size:${px(32,z)};opacity:.4`,'🖼️'));
    ph.appendChild(el('div',`font-size:${px(12,z)};color:#3a3d52;font-family:'Inter',sans-serif`,'Paste image URL in editor'));
    imgSide.appendChild(ph);
  }
  body.appendChild(imgSide);
  c.appendChild(body);
  t.appendChild(c);
}

/* CONCEPT MAP */
function renderConceptMapDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(36,z)} ${px(46,z)};display:flex;flex-direction:column`);
  c.appendChild(el('div',`font-size:${px(28,z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;margin-bottom:${px(4,z)};${as(anim,0,z)}`,escHtml(s.title||'')));
  if(s.subtitle) c.appendChild(el('div',`font-size:${px(13,z)};color:${acc};font-family:'Space Grotesk',sans-serif;margin-bottom:${px(16,z)};${as(anim,80,z)}`,escHtml(s.subtitle)));
  const nodes=s.bullets&&s.bullets.length?s.bullets:(s.nodes||[]);
  if(!nodes.length){
    const hint=el('div',`flex:1;display:flex;align-items:center;justify-content:center;color:#3a3d52;font-family:'Inter',sans-serif;font-size:${px(13,z)}`,'Add nodes in the editor (each bullet = a node)');
    c.appendChild(hint); t.appendChild(c); return;
  }
  const area=el('div',`flex:1;position:relative;`);
  const n=nodes.length;
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.style.cssText=`position:absolute;inset:0;width:100%;height:100%;overflow:visible`;
  nodes.forEach((nd,i)=>{
    const angle=(i/n)*Math.PI*2-Math.PI/2;
    const nx=50+38*Math.cos(angle);
    const ny=50+35*Math.sin(angle);
    const line=document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1','50%'); line.setAttribute('y1','50%');
    line.setAttribute('x2',nx+'%'); line.setAttribute('y2',ny+'%');
    line.setAttribute('stroke',acc+'50'); line.setAttribute('stroke-width','1.5');
    svg.appendChild(line);
  });
  area.appendChild(svg);
  const cntr=el('div',`position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);padding:${px(14,z)} ${px(22,z)};border-radius:${px(10,z)};border:2px solid ${acc};background:${acc}18;font-size:${px(14,z)};font-weight:700;color:${acc};font-family:'Space Grotesk',sans-serif;text-align:center;white-space:nowrap;animation:scaleIn .5s ease 0ms both`,escHtml(s.title||''));
  area.appendChild(cntr);
  const colors=['#7c8cf8','#7cd4f8','#7cf8a0','#f8d07c','#f87cd4','#f87c7c','#c792ea'];
  nodes.forEach((nd,i)=>{
    const angle=(i/n)*Math.PI*2-Math.PI/2;
    const nx=50+38*Math.cos(angle);
    const ny=50+36*Math.sin(angle);
    const clr=colors[i%colors.length];
    const ndEl=el('div',`position:absolute;left:${nx}%;top:${ny}%;transform:translate(-50%,-50%);padding:${px(10,z)} ${px(16,z)};border-radius:${px(8,z)};border:1px solid ${clr}60;background:${clr}14;font-size:${px(12,z)};color:${clr};font-family:'Inter',sans-serif;text-align:center;white-space:nowrap;animation:scaleIn .45s cubic-bezier(.22,1,.36,1) ${100+i*80}ms both`,'','bullet-item');
    ndEl.dataset.idx=i;
    ndEl.textContent=nd;
    area.appendChild(ndEl);
  });
  c.appendChild(area);
  t.appendChild(c);
}

/* BAR CHART */
function renderBarChartDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(40,z)} ${px(54,z)};display:flex;flex-direction:column`);
  c.appendChild(el('div',`font-size:${px(28,z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;margin-bottom:${px(2,z)};${as(anim,0,z)}`,escHtml(s.title||'')));
  if(s.subtitle) c.appendChild(el('div',`font-size:${px(13,z)};color:${acc};font-family:'Space Grotesk',sans-serif;margin-bottom:${px(22,z)};${as(anim,60,z)}`,escHtml(s.subtitle)));
  const data=s.chartData||[];
  const max=Math.max(1,...data.map(d=>+d.value||0));
  const area=el('div',`flex:1;display:flex;align-items:flex-end;gap:${px(20,z)};padding:0 ${px(10,z)} ${px(28,z)}`);
  data.forEach((d,i)=>{
    const clr=d.color||acc;
    const pct=Math.max(2,((+d.value||0)/max)*100);
    const colWrap=el('div',`flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%`);
    colWrap.appendChild(el('div',`font-size:${px(13,z)};font-weight:700;color:${clr};font-family:'Space Grotesk',sans-serif;margin-bottom:${px(6,z)}`,escHtml(String(d.value))+(s.chartUnit||'')));
    const bar=el('div',`width:100%;max-width:${px(70,z)};border-radius:${px(6,z)} ${px(6,z)} 0 0;background:linear-gradient(180deg,${clr},${clr}80);box-shadow:0 0 24px ${clr}40;height:${pct}%;animation:scaleIn .5s cubic-bezier(.22,1,.36,1) ${i*100}ms both;transform-origin:bottom`);
    colWrap.appendChild(bar);
    colWrap.appendChild(el('div',`font-size:${px(11,z)};color:#8C8C85;font-family:'Space Grotesk',sans-serif;margin-top:${px(8,z)};text-align:center`,escHtml(d.label||'')));
    area.appendChild(colWrap);
  });
  c.appendChild(area); t.appendChild(c);
}

/* VENN DIAGRAM */
function renderVennDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(34,z)} ${px(50,z)};display:flex;flex-direction:column`);
  if(s.title) c.appendChild(el('div',`font-size:${px(24,z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;text-align:center;margin-bottom:${px(4,z)};${as(anim,0,z)}`,escHtml(s.title)));
  if(s.subtitle) c.appendChild(el('div',`font-size:${px(12,z)};color:${acc};font-family:'Space Grotesk',sans-serif;text-align:center;margin-bottom:${px(8,z)};${as(anim,60,z)}`,escHtml(s.subtitle)));
  const stage=el('div',`flex:1;position:relative;min-height:${px(360,z)}`);
  const clrA='#7cd4f8',clrB='#7cf8a0';
  const dia=px(300,z);
  const circ=(leftPct,clr,delay)=>el('div',`position:absolute;top:50%;left:${leftPct}%;transform:translate(-50%,-50%);width:${dia};height:${dia};border-radius:50%;background:${clr}1c;border:2.5px solid ${clr}90;animation:scaleIn .5s cubic-bezier(.22,1,.36,1) ${delay}ms both`);
  stage.appendChild(circ(37,clrA,0));
  stage.appendChild(circ(63,clrB,100));
  const lbl=(text,leftPct,clr)=>el('div',`position:absolute;left:${leftPct}%;top:8%;transform:translateX(-50%);font-size:${px(15,z)};font-weight:700;color:${clr};font-family:'Inter',sans-serif;background:#0B0B0C;padding:${px(2,z)} ${px(10,z)};border-radius:${px(12,z)};border:1px solid ${clr}50`,escHtml(text));
  stage.appendChild(lbl(s.leftLabel||'A',26,clrA));
  stage.appendChild(lbl(s.rightLabel||'B',74,clrB));
  const listAt=(items,leftPct,w,clr,startIdx)=>{
    const wrap=el('div',`position:absolute;left:${leftPct}%;top:54%;transform:translate(-50%,-50%);width:${w};display:flex;flex-direction:column;gap:${px(5,z)};align-items:center`);
    (items||[]).forEach((it,i)=>{
      const r=el('div',`font-size:${px(11,z)};color:${clr?'#0B0B0C':'#CFCFC8'};background:${clr?clr+'cc':'transparent'};padding:${clr?px(3,z)+' '+px(8,z):'0'};border-radius:${px(10,z)};font-family:'Inter',sans-serif;text-align:center;font-weight:${clr?'700':'400'}`,'','bullet-item');
      r.dataset.idx=startIdx+i; r.textContent=it;
      wrap.appendChild(r);
    });
    return wrap;
  };
  const leftLen=(s.leftBullets||[]).length, rightLen=(s.rightBullets||[]).length;
  stage.appendChild(listAt(s.leftBullets,20,px(150,z),null,0));
  stage.appendChild(listAt(s.rightBullets,80,px(150,z),null,leftLen));
  stage.appendChild(listAt(s.bullets,50,px(150,z),acc,leftLen+rightLen));
  c.appendChild(stage); t.appendChild(c);
}

/* STACK VISUALIZER */
function renderStackVisualDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(36,z)} ${px(50,z)};display:flex;flex-direction:column;align-items:center`);
  c.appendChild(el('div',`font-size:${px(26,z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;text-align:center;margin-bottom:${px(4,z)};${as(anim,0,z)}`,escHtml(s.title||'')));
  if(s.subtitle) c.appendChild(el('div',`font-size:${px(13,z)};color:${acc};font-family:'Space Grotesk',sans-serif;text-align:center;margin-bottom:${px(16,z)};${as(anim,60,z)}`,escHtml(s.subtitle)));
  const stackWrap=el('div',`flex:1;display:flex;flex-direction:column-reverse;align-items:center;gap:${px(4,z)};justify-content:flex-start`);
  (s.bullets||[]).forEach((b,i)=>{
    const box=el('div',`width:${px(220,z)};padding:${px(12,z)};border-radius:${px(7,z)};border:1px solid ${acc}60;background:${acc}14;font-size:${px(14,z)};color:#F5F5F4;font-family:'Inter',sans-serif;text-align:center`,'','bullet-item');
    box.dataset.idx=i; box.textContent=b;
    stackWrap.appendChild(box);
  });
  c.appendChild(stackWrap);
  c.appendChild(el('div',`font-size:${px(11,z)};color:#3a3d52;font-family:'Inter',sans-serif;margin-top:${px(10,z)}`,'▭ base of stack'));
  t.appendChild(c);
}

/* PROCESS LOOP */
function renderProcessLoopDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(36,z)} ${px(50,z)};display:flex;flex-direction:column`);
  c.appendChild(el('div',`font-size:${px(26,z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;text-align:center;margin-bottom:${px(4,z)};${as(anim,0,z)}`,escHtml(s.title||'')));
  if(s.subtitle) c.appendChild(el('div',`font-size:${px(13,z)};color:${acc};font-family:'Space Grotesk',sans-serif;text-align:center;margin-bottom:${px(12,z)};${as(anim,60,z)}`,escHtml(s.subtitle)));
  const stage=el('div',`flex:1;position:relative`);
  const steps=(s.characters&&s.characters.length)?s.characters:[{icon:'1️⃣',label:'Step one'},{icon:'2️⃣',label:'Step two'},{icon:'3️⃣',label:'Step three'}];
  const n=steps.length;
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('preserveAspectRatio','none');
  svg.style.cssText='position:absolute;inset:0;width:100%;height:100%';
  const circle=document.createElementNS('http://www.w3.org/2000/svg','circle');
  circle.setAttribute('cx','50');circle.setAttribute('cy','50');circle.setAttribute('r','34');
  circle.setAttribute('fill','none');circle.setAttribute('stroke',acc+'45');circle.setAttribute('stroke-width','0.6');
  circle.setAttribute('stroke-dasharray','3 2');
  svg.appendChild(circle);
  stage.appendChild(svg);
  stage.appendChild(el('div',`position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:${px(26,z)};opacity:.5`,'🔁'));
  steps.forEach((st,i)=>{
    const angle=(i/n)*Math.PI*2-Math.PI/2;
    const nx=50+38*Math.cos(angle), ny=50+38*Math.sin(angle);
    const card=el('div',`position:absolute;left:${nx}%;top:${ny}%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:${px(4,z)}`,'','bullet-item');
    card.dataset.idx=i;
    card.appendChild(el('div',`font-size:${px(32,z)}`,st.icon||'⚙️'));
    card.appendChild(el('div',`font-size:${px(11,z)};color:#CFCFC8;font-family:'Space Grotesk',sans-serif;white-space:nowrap`,escHtml(st.label||'')));
    stage.appendChild(card);
  });
  c.appendChild(stage); t.appendChild(c);
}

/* SPECTRUM */
function renderSpectrumDom(s,acc,anim,t,z){
  const w=el('div',`position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${px(26,z)};padding:${px(70,z)}`);
  if(s.title) w.appendChild(el('div',`font-size:${px(26,z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;text-align:center;${as(anim,0,z)}`,escHtml(s.title)));
  const pos=Math.max(0,Math.min(100,+s.spectrumPos||50));
  const track=el('div',`position:relative;width:${px(600,z)};height:${px(10,z)};border-radius:${px(6,z)};background:linear-gradient(90deg,#7cd4f8,${acc},#f87c7c);${as(anim,150,z)}`);
  const marker=el('div',`position:absolute;top:50%;left:${pos}%;transform:translate(-50%,-50%);width:${px(22,z)};height:${px(22,z)};border-radius:50%;background:#fff;border:3px solid ${acc};box-shadow:0 0 18px ${acc}80`);
  track.appendChild(marker);
  if(s.spectrumLabel){
    const lbl=el('div',`position:absolute;top:${px(-32,z)};left:${pos}%;transform:translateX(-50%);font-size:${px(12,z)};color:${acc};font-family:'Space Grotesk',sans-serif;white-space:nowrap;font-weight:700`,escHtml(s.spectrumLabel));
    track.appendChild(lbl);
  }
  w.appendChild(track);
  const labels=el('div',`width:${px(600,z)};display:flex;justify-content:space-between;font-size:${px(13,z)};color:#8C8C85;font-family:'Space Grotesk',sans-serif;${as(anim,250,z)}`);
  labels.appendChild(el('span','',escHtml(s.leftLabel||'')));
  labels.appendChild(el('span','',escHtml(s.rightLabel||'')));
  w.appendChild(labels);
  t.appendChild(w);
}

/* ICON GRID */
function renderIconGridDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(40,z)} ${px(54,z)};display:flex;flex-direction:column`);
  if(s.title) c.appendChild(el('div',`font-size:${px(28,z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;text-align:center;margin-bottom:${px(4,z)};${as(anim,0,z)}`,escHtml(s.title)));
  if(s.subtitle) c.appendChild(el('div',`font-size:${px(13,z)};color:${acc};font-family:'Space Grotesk',sans-serif;text-align:center;margin-bottom:${px(18,z)};${as(anim,60,z)}`,escHtml(s.subtitle)));
  const items=s.characters&&s.characters.length?s.characters:[];
  const grid=el('div',`flex:1;display:grid;grid-template-columns:repeat(${Math.min(4,Math.max(2,items.length))},1fr);gap:${px(14,z)};align-content:center`);
  items.forEach((it,i)=>{
    const card=el('div',`display:flex;flex-direction:column;align-items:center;gap:${px(6,z)};padding:${px(16,z)};border-radius:${px(10,z)};border:1px solid ${acc}30;background:${acc}08`,'','bullet-item');
    card.dataset.idx=i;
    card.appendChild(el('div',`font-size:${px(38,z)}`,it.icon||'⚙️'));
    card.appendChild(el('div',`font-size:${px(13,z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;text-align:center`,escHtml(it.label||'')));
    if(it.desc) card.appendChild(el('div',`font-size:${px(10,z)};color:#8C8C85;font-family:'Inter',sans-serif;text-align:center`,escHtml(it.desc)));
    grid.appendChild(card);
  });
  c.appendChild(grid); t.appendChild(c);
}

/* FULL-BLEED IMAGE */
function renderImageFullDom(s,acc,anim,t,z){
  const w=el('div',`position:absolute;inset:0;display:flex;align-items:center;justify-content:center;overflow:hidden`);
  if(s.imageUrl){
    const img2=el('img','','');img2.src=s.imageUrl;
    img2.style.cssText=`max-width:92%;max-height:80%;object-fit:contain;border-radius:${px(10,z)};${as(anim,0,z)}`;
    w.appendChild(img2);
  } else {
    w.appendChild(el('div',`display:flex;flex-direction:column;align-items:center;gap:${px(10,z)};color:#3a3d52;font-family:'Inter',sans-serif`,`<div style="font-size:${px(50,z)}">🖼️</div><div style="font-size:${px(13,z)}">Upload or paste an image URL in the editor</div>`));
  }
  if(s.title||s.imageCaption){
    const overlay=el('div',`position:absolute;left:0;right:0;bottom:0;padding:${px(20,z)} ${px(40,z)};background:linear-gradient(transparent,rgba(0,0,0,.75));display:flex;flex-direction:column;gap:${px(2,z)};${as(anim,200,z)}`);
    if(s.title) overlay.appendChild(el('div',`font-size:${px(20,z)};font-weight:700;color:#fff;font-family:'Space Grotesk',sans-serif`,escHtml(s.title)));
    if(s.imageCaption) overlay.appendChild(el('div',`font-size:${px(12,z)};color:${acc};font-family:'Space Grotesk',sans-serif`,escHtml(s.imageCaption)));
    w.appendChild(overlay);
  }
  t.appendChild(w);
}
