// ═══════════════════════════════════════════════════════════════════════════
// renderers-premium.js  —  High-end motion graphics vector art templates  v2
// ═══════════════════════════════════════════════════════════════════════════

/* ─────────────────────────────────────────────────────────────────────────
   PIPELINE — Gamma-quality circular pipeline with SVG icons + ripple glow
───────────────────────────────────────────────────────────────────────── */
function renderPipelineDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(34,z)} ${px(44,z)};display:flex;flex-direction:column;overflow:hidden`);
  c.appendChild(el('div',`font-size:${px(30,z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;margin-bottom:${px(5,z)};${as(anim,0,z)}`,escHtml(s.title||'')));
  if(s.subtitle) c.appendChild(el('div',`font-size:${px(13,z)};color:${acc};font-family:'Space Grotesk',sans-serif;margin-bottom:${px(14,z)};${as(anim,80,z)}`,escHtml(s.subtitle)));
  if(s.note) c.appendChild(el('div',`font-size:${px(12,z)};color:#8C8C85;font-family:'Inter',sans-serif;margin-bottom:${px(12,z)};line-height:1.55;${as(anim,60,z)}`,escHtml(s.note)));

  const steps=s.bullets||[];
  const colors=['#7c8cf8','#7cd4f8','#7cf8a0','#f8d07c','#f87cd4','#f87c7c','#c792ea'];
  const stage=el('div',`flex:1;display:flex;align-items:center;justify-content:center`);
  const flow=el('div',`display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:${px(2,z)}`);

  const rawSz=steps.length>0?Math.min(120,Math.max(70,Math.round((1280*.78-steps.length*20)/steps.length))):110;
  const nSz=Math.round(rawSz*z);

  steps.forEach((step,i)=>{
    const clr=colors[i%colors.length];
    const delay=i*140;
    const iconSvg=(typeof getNodeIcon==='function')?getNodeIcon(step,i):'';

    const nodeWrap=el('div',`display:flex;flex-direction:column;align-items:center;gap:${px(12,z)};animation:nodeAppear .58s cubic-bezier(.22,1,.36,1) ${delay}ms both`,'','bullet-item pipeline-node');
    nodeWrap.dataset.idx=i;

    const ring=el('div','','','p-ring');
    ring.style.cssText=`
      width:${nSz}px;height:${nSz}px;border-radius:50%;
      border:${Math.max(2,Math.round(3*z))}px solid ${clr};
      background:radial-gradient(circle at 35% 30%,${clr}30,${clr}08);
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 0 ${Math.round(28*z)}px ${clr}45,inset 0 0 ${Math.round(18*z)}px ${clr}12;
      position:relative;transition:transform .25s ease,box-shadow .3s ease;cursor:default;`;

    // two ripple rings
    [8,17].forEach((off,ri)=>{
      const rip=el('div','');
      rip.style.cssText=`position:absolute;border-radius:50%;border:1px solid ${clr}${ri===0?'35':'20'};inset:-${Math.round(off*z)}px;animation:ripple ${2.6+ri*.4}s ease-out ${delay+500+ri*350}ms infinite;`;
      ring.appendChild(rip);
    });

    const iconWrap=el('div','');
    const iSz=Math.round(nSz*.38);
    iconWrap.style.cssText=`color:${clr};width:${iSz}px;height:${iSz}px;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 0 ${Math.round(7*z)}px ${clr});`;
    iconWrap.innerHTML=iconSvg;
    if(iconWrap.firstChild) iconWrap.firstChild.style.cssText='width:100%;height:100%';
    ring.appendChild(iconWrap);
    nodeWrap.appendChild(ring);

    const lbl=el('div','',escHtml(step));
    lbl.style.cssText=`font-size:${px(12,z)};color:#CFCFC8;font-family:'Inter',sans-serif;text-align:center;font-weight:600;letter-spacing:.02em;max-width:${nSz+20}px;line-height:1.3;`;
    nodeWrap.appendChild(lbl);
    flow.appendChild(nodeWrap);

    if(i<steps.length-1){
      const aw=Math.round(20*z);
      const arr=el('div','');
      arr.style.cssText=`display:flex;align-items:center;padding:0 ${px(4,z)};padding-bottom:${px(24,z)};animation:fadeUp .4s ease ${delay+120}ms both;`;
      arr.innerHTML=`<svg width="${aw}" height="${aw}" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="${colors[(i+1)%colors.length]}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      flow.appendChild(arr);
    }
  });

  stage.appendChild(flow);
  c.appendChild(stage);

  if(s.callout){
    const ins=el('div','');
    ins.style.cssText=`border-radius:${px(8,z)};border:1px solid ${acc}40;background:${acc}0b;padding:${px(10,z)} ${px(16,z)};margin-top:${px(8,z)};font-size:${px(12,z)};color:#8C8C85;font-family:'Inter',sans-serif;line-height:1.5;${as(anim,steps.length*140+150,z)}`;
    ins.innerHTML=`<span style="color:${acc}">▸</span> ${escHtml(s.callout)}`;
    c.appendChild(ins);
  }
  t.appendChild(c);
}

/* ─────────────────────────────────────────────────────────────────────────
   HERO-SPLIT — astronaut/vector art left + bullets right
───────────────────────────────────────────────────────────────────────── */
function renderHeroSplitDom(s,acc,anim,t,z){
  const w=el('div',`position:absolute;inset:0;display:flex;overflow:hidden`);

  const deco=el('div',`position:absolute;left:${px(30,z)};top:0;bottom:0;width:${px(300,z)};display:flex;align-items:center;justify-content:center;pointer-events:none`);

  const astroW=el('div',`width:${px(230,z)};height:${px(300,z)};animation:heroFloat 4.5s ease-in-out infinite;position:relative;z-index:2`);
  if(typeof svgAstronaut==='function') astroW.innerHTML=svgAstronaut(acc);
  deco.appendChild(astroW);

  if(typeof svgPlanet==='function'){
    const p1=el('div',`position:absolute;top:${px(60,z)};right:${px(0,z)};width:${px(65,z)};height:${px(65,z)};animation:floatY 3.5s ease-in-out .5s infinite`);
    p1.innerHTML=svgPlanet('#f8d07c',true,'hsP1');
    deco.appendChild(p1);
    const p2=el('div',`position:absolute;bottom:${px(90,z)};left:${px(5,z)};width:${px(38,z)};height:${px(38,z)};animation:floatY 4.8s ease-in-out 1.2s infinite`);
    p2.innerHTML=svgPlanet('#7c8cf8',false,'hsP2');
    deco.appendChild(p2);
    const p3=el('div',`position:absolute;top:${px(30,z)};left:${px(30,z)};width:${px(22,z)};height:${px(22,z)};animation:floatY 6s ease-in-out 0.8s infinite`);
    p3.innerHTML=svgPlanet('#c792ea',false,'hsP3');
    deco.appendChild(p3);
  }

  // star field particles
  for(let i=0;i<8;i++){
    const sx=5+Math.floor(Math.sin(i*1.9)*42+50), sy=5+Math.floor(Math.cos(i*2.3)*42+50);
    const sz2=Math.round((1.2+Math.random()*2)*z);
    const sp=el('div',`position:absolute;left:${sx}%;top:${sy}%;width:${sz2}px;height:${sz2}px;border-radius:50%;background:#fff;opacity:.45;animation:glowPulse ${1.2+i*.25}s ease-in-out ${i*.35}s infinite`);
    deco.appendChild(sp);
  }
  w.appendChild(deco);

  // right content panel
  const content=el('div',`position:absolute;left:${px(350,z)};top:50%;transform:translateY(-50%);max-width:${px(750,z)};display:flex;flex-direction:column;gap:${px(6,z)};right:${px(40,z)}`);
  if(s.title) content.appendChild(el('div',`font-size:${px(32,z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;margin-bottom:${px(10,z)};${as(anim,0,z)}`,escHtml(s.title)));
  if(s.subtitle) content.appendChild(el('div',`font-size:${px(14,z)};color:${acc};font-family:'Space Grotesk',sans-serif;margin-bottom:${px(14,z)};${as(anim,60,z)}`,escHtml(s.subtitle)));

  (s.bullets||[]).forEach((b,i)=>{
    const row=el('div',`display:flex;align-items:center;gap:${px(14,z)};padding:${px(12,z)} ${px(16,z)};border-radius:${px(9,z)};border:1px solid ${acc}28;background:${acc}0a;margin-bottom:${px(6,z)};transition:border-color .3s,background .3s`,'','bullet-item');
    row.dataset.idx=i;
    const check=el('div',`width:${px(22,z)};height:${px(22,z)};border-radius:50%;border:2px solid ${acc};display:flex;align-items:center;justify-content:center;flex-shrink:0;background:${acc}18`);
    check.innerHTML=`<svg width="${Math.round(12*z)}" height="${Math.round(12*z)}" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="${acc}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    row.appendChild(check);
    row.appendChild(el('span',`font-size:${px(15,z)};color:#CFCFC8;font-family:'Inter',sans-serif;line-height:1.4`,escHtml(b)));
    content.appendChild(row);
  });

  if(s.note) content.appendChild(el('div',`font-size:${px(11,z)};color:#666662;font-family:'Inter',sans-serif;margin-top:${px(8,z)};${as(anim,400,z)}`,escHtml(s.note)));
  w.appendChild(content);
  t.appendChild(w);
}

/* ─────────────────────────────────────────────────────────────────────────
   TERMINAL — Animated live-typing terminal window slide
   Use for: command-line demos, process flows, compilation steps
───────────────────────────────────────────────────────────────────────── */
function renderTerminalDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(38,z)} ${px(48,z)};display:flex;flex-direction:column`);

  // Title row
  c.appendChild(el('div',`font-size:${px(28,z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;margin-bottom:${px(4,z)};${as(anim,0,z)}`,escHtml(s.title||'Terminal')));
  if(s.subtitle) c.appendChild(el('div',`font-size:${px(13,z)};color:${acc};font-family:'Space Grotesk',sans-serif;margin-bottom:${px(14,z)};${as(anim,80,z)}`,escHtml(s.subtitle)));

  // Terminal window
  const win=el('div',`flex:1;display:flex;flex-direction:column;border-radius:${px(12,z)};overflow:hidden;border:1px solid ${acc}45;box-shadow:0 0 ${px(40,z)} ${acc}22,0 ${px(20,z)} ${px(60,z)} #00000060;${as(anim,160,z)}`);

  // Title bar
  const bar=el('div',`background:#1a1e2e;padding:${px(10,z)} ${px(16,z)};display:flex;align-items:center;gap:${px(8,z)};border-bottom:1px solid ${acc}22;flex-shrink:0`);
  ['#f87c7c','#f8d07c','#7cf8a0'].forEach(clr=>bar.appendChild(el('span',`width:${px(9,z)};height:${px(9,z)};border-radius:50%;background:${clr};display:inline-block`)));
  bar.appendChild(el('div',`flex:1;margin-left:${px(12,z)};font-size:${px(11,z)};color:#666662;font-family:'JetBrains Mono',monospace`,escHtml(s.terminalTitle||'bash — java-app')));
  win.appendChild(bar);

  // Terminal body
  const body=el('div',`flex:1;background:#0a0d16;padding:${px(16,z)} ${px(20,z)};overflow:hidden;font-family:'JetBrains Mono',monospace;font-size:${px(13,z)};line-height:1.8;display:flex;flex-direction:column;gap:${px(2,z)}`);

  const lines=s.terminalLines||s.bullets||[];
  const promptColor=acc;

  lines.forEach((line,i)=>{
    const isOutput=line.startsWith('  ')||line.startsWith('→')||line.startsWith('✓')||line.startsWith('✗')||line.startsWith('[');
    const isError=line.includes('ERROR')||line.includes('Exception')||line.startsWith('✗');
    const isSuccess=line.includes('BUILD SUCCESS')||line.includes('Started ')||line.startsWith('✓');

    const row=el('div',`animation:termLine .3s ease-out ${80+i*90}ms both;overflow:hidden;display:flex;align-items:flex-start;gap:${px(8,z)};white-space:pre-wrap;word-break:break-all`,'','bullet-item');
    row.dataset.idx=i;

    if(!isOutput){
      const prompt=el('span',`color:${promptColor};flex-shrink:0`,'$');
      row.appendChild(prompt);
    }

    const txt=el('span',`color:${isError?'#f87c7c':isSuccess?'#7cf8a0':isOutput?'#8C8C85':'#F5F5F4'}`,escHtml(line.trim()));
    row.appendChild(txt);
    body.appendChild(row);
  });

  // blinking cursor at end
  const cursor=el('div',`display:flex;align-items:center;gap:${px(8,z)};animation:termLine .3s ease-out ${80+lines.length*90}ms both`);
  cursor.appendChild(el('span',`color:${promptColor}`,'$'));
  const blink=el('span',`width:${px(9,z)};height:${px(15,z)};background:${promptColor};display:inline-block;animation:glowPulse 1s ease-in-out infinite;border-radius:${px(1,z)}`);
  cursor.appendChild(blink);
  body.appendChild(cursor);

  win.appendChild(body);
  c.appendChild(win);

  if(s.note){
    const note=el('div',`margin-top:${px(10,z)};font-size:${px(11,z)};color:#666662;font-family:'Inter',sans-serif;${as(anim,lines.length*90+300,z)}`);
    note.innerHTML=`<span style="color:${acc}">//</span> ${escHtml(s.note)}`;
    c.appendChild(note);
  }
  t.appendChild(c);
}

/* ─────────────────────────────────────────────────────────────────────────
   ORBIT-DIAGRAM — Planets orbiting a center concept (excellent for OOP,
   JVM areas, Spring components, relationships)
───────────────────────────────────────────────────────────────────────── */
function renderOrbitDiagramDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(36,z)} ${px(48,z)};display:flex;flex-direction:column`);
  c.appendChild(el('div',`font-size:${px(26,z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;text-align:center;margin-bottom:${px(4,z)};${as(anim,0,z)}`,escHtml(s.title||'')));
  if(s.subtitle) c.appendChild(el('div',`font-size:${px(12,z)};color:${acc};font-family:'Space Grotesk',sans-serif;text-align:center;margin-bottom:${px(8,z)};${as(anim,60,z)}`,escHtml(s.subtitle)));

  const stage=el('div',`flex:1;position:relative`);
  stage.setAttribute('data-orbit-area','1');

  const nodes=s.bullets||[];
  const colors=['#7c8cf8','#7cd4f8','#7cf8a0','#f8d07c','#f87cd4','#f87c7c','#c792ea'];

  // SVG orbit rings
  const svgNS='http://www.w3.org/2000/svg';
  const svgEl=document.createElementNS(svgNS,'svg');
  svgEl.setAttribute('viewBox','0 0 100 100');
  svgEl.setAttribute('preserveAspectRatio','xMidYMid meet');
  svgEl.style.cssText='position:absolute;inset:0;width:100%;height:100%;overflow:visible';

  const radii=[28,40];
  radii.forEach((r,ri)=>{
    const circle=document.createElementNS(svgNS,'circle');
    circle.setAttribute('cx','50'); circle.setAttribute('cy','50');
    circle.setAttribute('r',r); circle.setAttribute('fill','none');
    circle.setAttribute('stroke',acc+(ri===0?'45':'28'));
    circle.setAttribute('stroke-width','0.5');
    circle.setAttribute('stroke-dasharray',ri===0?'3 3':'2 4');
    svgEl.appendChild(circle);
  });

  // Connection lines from center to nodes
  nodes.forEach((_,i)=>{
    const angle=(i/nodes.length)*Math.PI*2-Math.PI/2;
    const r=nodes.length<=4?35:42;
    const nx=50+r*Math.cos(angle);
    const ny=50+r*Math.sin(angle);
    const line=document.createElementNS(svgNS,'line');
    line.setAttribute('x1','50'); line.setAttribute('y1','50');
    line.setAttribute('x2',`${nx}`); line.setAttribute('y2',`${ny}`);
    line.setAttribute('stroke',acc+'30'); line.setAttribute('stroke-width','0.5');
    svgEl.appendChild(line);
  });

  stage.appendChild(svgEl);

  // Center node
  const cntr=el('div',`position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);padding:${px(14,z)} ${px(20,z)};border-radius:${px(12,z)};border:2px solid ${acc};background:${acc}22;backdrop-filter:blur(8px);font-size:${px(14,z)};font-weight:700;color:${acc};font-family:'Space Grotesk',sans-serif;text-align:center;white-space:nowrap;animation:scaleIn .5s ease 0ms both;box-shadow:0 0 ${px(30,z)} ${acc}45,inset 0 0 ${px(20,z)} ${acc}12;z-index:2`,escHtml(s.title||''));
  stage.appendChild(cntr);

  // Orbit nodes
  nodes.forEach((nd,i)=>{
    const angle=(i/nodes.length)*Math.PI*2-Math.PI/2;
    const r=nodes.length<=4?35:42;
    const nx=50+r*Math.cos(angle);
    const ny=50+r*Math.sin(angle);
    const clr=colors[i%colors.length];

    const ndEl=el('div',`position:absolute;left:${nx}%;top:${ny}%;transform:translate(-50%,-50%);padding:${px(9,z)} ${px(14,z)};border-radius:${px(8,z)};border:1px solid ${clr}70;background:${clr}18;backdrop-filter:blur(6px);font-size:${px(11,z)};color:${clr};font-family:'Inter',sans-serif;text-align:center;white-space:nowrap;font-weight:600;animation:nodeAppear .5s cubic-bezier(.22,1,.36,1) ${100+i*80}ms both;box-shadow:0 0 ${px(16,z)} ${clr}35;z-index:1;animation:floatY ${3+i*0.4}s ease-in-out ${i*0.5}s infinite`,'','bullet-item');
    ndEl.dataset.idx=i;
    ndEl.textContent=nd;
    stage.appendChild(ndEl);
  });

  c.appendChild(stage);
  t.appendChild(c);
}

/* ─────────────────────────────────────────────────────────────────────────
   GLITCH-TITLE — High-impact cinematic title with glitch/neon effect.
   Use as chapter openers, dramatic reveals, course intro slides.
───────────────────────────────────────────────────────────────────────── */
function renderGlitchTitleDom(s,acc,anim,t,z){
  const w=el('div',`position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden`);

  // Background code rain effect (CSS-only)
  const rain=el('div',`position:absolute;inset:0;overflow:hidden;opacity:.09;pointer-events:none`);
  const CHARS='JAVAΛΩΒJVMGCJITBYTECODEHEAPSTACK0101∑∂∇';
  for(let i=0;i<24;i++){
    const col=el('div',`position:absolute;display:flex;flex-direction:column;gap:${px(4,z)};animation:binaryDrop ${2+Math.random()*3}s linear ${Math.random()*4}s infinite`);
    col.style.left=`${Math.random()*100}%`;
    col.style.top=`${-20-Math.random()*40}%`;
    for(let j=0;j<6;j++){
      const ch=el('div',`font-size:${px(11,z)};color:${acc};font-family:'JetBrains Mono',monospace;opacity:${0.3+j*0.1}`,CHARS[Math.floor(Math.random()*CHARS.length)]);
      col.appendChild(ch);
    }
    rain.appendChild(col);
  }
  w.appendChild(rain);

  // Glowing backdrop blob
  const blob=el('div',`position:absolute;width:${px(500,z)};height:${px(280,z)};border-radius:50%;background:radial-gradient(ellipse,${acc}20 0%,transparent 70%);animation:morphBlob 8s ease-in-out infinite;top:50%;left:50%;transform:translate(-50%,-50%)`);
  w.appendChild(blob);

  // Top tag
  if(s.tag||s.subtitle){
    const tag=el('div',`font-size:${px(11,z)};color:${acc};font-family:'Space Grotesk',sans-serif;letter-spacing:.14em;border:1px solid ${acc}60;border-radius:${px(18,z)};padding:${px(5,z)} ${px(16,z)};margin-bottom:${px(20,z)};${as(anim,0,z)};animation:borderGlow 2.5s ease-in-out infinite;--gclr:${acc}`,escHtml(s.tag||s.subtitle||''));
    w.appendChild(tag);
  }

  // Main glitch title
  const titleWrap=el('div',`position:relative;text-align:center;${as(anim,120,z)}`);
  const mainTitle=el('div',`font-size:${px(72,z)};font-weight:700;color:#F5F5F4;font-family:'Space Grotesk',sans-serif;line-height:1.1;text-align:center;letter-spacing:-.02em`);
  mainTitle.textContent=s.title||'';

  // Glitch clones
  const g1=el('div',`position:absolute;inset:0;font-size:${px(72,z)};font-weight:700;font-family:'Inter',sans-serif;line-height:1.1;text-align:center;letter-spacing:-.02em;color:${acc};clip-path:inset(0 0 60% 0);transform:translateX(-3px);animation:glowPulse 2.5s ease-in-out .2s infinite;opacity:.35;pointer-events:none`);
  g1.textContent=s.title||'';
  const g2=el('div',`position:absolute;inset:0;font-size:${px(72,z)};font-weight:700;font-family:'Inter',sans-serif;line-height:1.1;text-align:center;letter-spacing:-.02em;color:#7cd4f8;clip-path:inset(55% 0 0 0);transform:translateX(3px);animation:glowPulse 3.1s ease-in-out .7s infinite;opacity:.28;pointer-events:none`);
  g2.textContent=s.title||'';

  titleWrap.appendChild(mainTitle);
  titleWrap.appendChild(g1);
  titleWrap.appendChild(g2);
  w.appendChild(titleWrap);

  // Glow line under title
  const line=el('div',`width:${px(220,z)};height:2px;background:linear-gradient(90deg,transparent,${acc},transparent);margin:${px(18,z)} auto 0;${as(anim,280,z)}`);
  w.appendChild(line);

  // Description
  if(s.note||s.description){
    const desc=el('div',`font-size:${px(16,z)};color:#8C8C85;font-family:'Inter',sans-serif;text-align:center;max-width:${px(620,z)};line-height:1.6;margin-top:${px(14,z)};${as(anim,380,z)}`,escHtml(s.note||s.description||''));
    w.appendChild(desc);
  }

  // Stat chips at bottom
  if(s.bullets&&s.bullets.length){
    const chips=el('div',`display:flex;flex-wrap:wrap;gap:${px(8,z)};justify-content:center;margin-top:${px(22,z)};${as(anim,500,z)}`);
    s.bullets.forEach((b,i)=>{
      const chip=el('div',`padding:${px(6,z)} ${px(14,z)};border-radius:${px(16,z)};border:1px solid ${acc}40;background:${acc}10;font-size:${px(12,z)};color:${acc};font-family:'Inter',sans-serif;animation:fadeUp .4s ease ${600+i*70}ms both`,'','bullet-item');
      chip.dataset.idx=i; chip.textContent=b;
      chips.appendChild(chip);
    });
    w.appendChild(chips);
  }

  // Bottom hint
  w.appendChild(el('div',`position:absolute;bottom:${px(24,z)};font-size:${px(11,z)};color:#2F3136;font-family:'Inter',sans-serif;${as(anim,800,z)}`,'▸ Press Space or → to continue'));

  t.appendChild(w);
}

/* ── BENTO GRID ──────────────────────────────────────────────────────────── */
function renderBentoGridDom(s, acc, anim, t, z) {
  const w = el('div', `width:100%;height:100%;padding:${px(40,z)} ${px(50,z)};display:flex;flex-direction:column;gap:${px(16,z)}`);
  
  w.appendChild(el('div', `font-size:${px(36,z)};font-weight:700;color:${acc};font-family:'Inter',sans-serif;letter-spacing:-.02em;${as(anim,0,z)}`, escHtml(s.title || '')));
  
  if (s.note || s.description) {
    w.appendChild(el('div', `font-size:${px(15,z)};color:#8C8C85;margin-top:-${px(8,z)};${as(anim,100,z)}`, escHtml(s.note || s.description)));
  }

  const grid = el('div', `flex:1;min-height:0;margin-top:${px(10,z)};${as(anim,200,z)}`, '', 'bento-grid');
  const bullets = s.bullets && s.bullets.length ? s.bullets : ['Highlight One', 'Key Metric Two', 'Core Feature Three', 'Final Takeaway'];
  const colors = [acc, '#7cd4f8', '#c792ea', '#7cf8a0', '#f8d07c', '#f87c7c'];
  
  bullets.forEach((b, i) => {
    const isLarge = i === 0 || i === 3;
    const isTall = i === 1;
    let cls = 'bento-card bullet-item';
    if (isLarge) cls += ' span-2-col';
    if (isTall) cls += ' span-2-row';
    
    const card = el('div', `border-color:${colors[i%colors.length]}30`, '', cls);
    
    const iconW = el('div', `width:${px(36,z)};height:${px(36,z)};border-radius:${px(8,z)};background:${colors[i%colors.length]}1a;border:1px solid ${colors[i%colors.length]}40;margin-bottom:${px(14,z)};display:flex;align-items:center;justify-content:center`);
    if (typeof getNodeIcon === 'function') iconW.innerHTML = getNodeIcon(b, i);
    card.appendChild(iconW);
    
    const text = el('div', `font-size:${px(isLarge?18:14,z)};color:#F5F5F4;font-family:'Inter',sans-serif;font-weight:500;line-height:1.4`, escHtml(b));
    card.appendChild(text);
    
    grid.appendChild(card);
  });
  
  w.appendChild(grid);
  t.appendChild(w);
}

/* ── GLASS FAN ───────────────────────────────────────────────────────────── */
function renderGlassFanDom(s, acc, anim, t, z) {
  const w = el('div', `width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative`);
  
  w.appendChild(el('div', `font-size:${px(42,z)};font-weight:700;color:${acc};font-family:'Inter',sans-serif;position:absolute;top:${px(50,z)};${as(anim,0,z)}`, escHtml(s.title || '')));

  const cardsContainer = el('div', `position:relative;width:${px(280,z)};height:${px(360,z)};margin-top:${px(40,z)};perspective:1000px;${as(anim,200,z)}`);
  
  const bullets = s.bullets && s.bullets.length ? s.bullets : ['Layer 1', 'Layer 2', 'Layer 3'];
  const colors = [acc, '#c792ea', '#7cd4f8'];
  
  bullets.forEach((b, i) => {
    // Fan spreads outward from center
    const rot = (i - 1) * 15;
    const tx = (i - 1) * 140;
    
    const card = el('div', `position:absolute;inset:0;background:rgba(255,255,255,0.03);border:1px solid ${colors[i%colors.length]}40;border-radius:${px(16,z)};padding:${px(24,z)};backdrop-filter:blur(16px);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,0.5);transform-origin:bottom center;transition:all 0.6s cubic-bezier(0.34,1.56,0.64,1) !important`, '', 'bullet-item glass-fan-card');
    
    card.style.setProperty('--fan-trans', `translateX(${tx*z}px) rotate(${rot}deg)`);
    
    card.appendChild(el('div', `font-size:${px(24,z)};font-weight:700;color:${colors[i%colors.length]};margin-bottom:${px(16,z)};font-family:'Inter',sans-serif`, `0${i+1}`));
    card.appendChild(el('div', `font-size:${px(16,z)};color:#F5F5F4;line-height:1.5`, escHtml(b)));
    
    cardsContainer.appendChild(card);
  });
  
  w.appendChild(cardsContainer);
  t.appendChild(w);
}

/* ── 3D CAROUSEL ─────────────────────────────────────────────────────────── */
function render3DCarouselDom(s, acc, anim, t, z) {
  const w = el('div', `width:100%;height:100%;display:flex;flex-direction:column;align-items:center;position:relative;overflow:hidden`);
  
  w.appendChild(el('div', `font-size:${px(42,z)};font-weight:700;color:${acc};font-family:'Inter',sans-serif;margin-top:${px(50,z)};${as(anim,0,z)}`, escHtml(s.title || '')));

  const scene = el('div', `width:100%;flex:1;perspective:1200px;display:flex;align-items:center;justify-content:center;${as(anim,200,z)}`);
  
  const bullets = s.bullets && s.bullets.length ? s.bullets : ['Option A', 'Option B', 'Option C'];
  
  bullets.forEach((b, i) => {
    // Distance from center pushes it back in Z space
    const distFromCenter = Math.abs(i - 1);
    const tz = distFromCenter * -150;
    const tx = (i - 1) * 220;
    
    const card = el('div', `position:absolute;width:${px(260,z)};height:${px(340,z)};background:${acc}0a;border:1px solid ${acc}40;border-radius:${px(16,z)};padding:${px(24,z)};display:flex;align-items:center;justify-content:center;text-align:center;font-size:${px(18,z)};color:#F5F5F4;backdrop-filter:blur(8px);transition:all 0.8s cubic-bezier(0.22,1,0.36,1) !important`, '', 'bullet-item carousel-card');
    
    card.style.setProperty('--car-trans', `translateX(${tx*z}px) translateZ(${tz*z}px)`);
    card.innerHTML = escHtml(b);
    scene.appendChild(card);
  });
  
  w.appendChild(scene);
  t.appendChild(w);
}

/* ── COLD OPEN ───────────────────────────────────────────────────────────── */
function renderColdOpenDom(s, acc, anim, t, z) {
  const stage = el('div', `width:100%;height:100%;background:#000000;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center`);
  
  const textScene = el('div', `position:absolute;inset:0;background:#000000;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 5%;z-index:10`, '', 'scene-text');
  const line1 = el('div', `font-family:'JetBrains Mono',monospace;font-size:${px(36,z)};font-weight:700;color:#e6edf3;line-height:1.8;white-space:nowrap`, `What is Object-Oriented Programming?<span style="display:inline-block;width:${px(12,z)};height:1em;background:#00ff88;margin-left:6px;vertical-align:middle;animation:blink 0.8s infinite;"></span>`);
  const line2 = el('div', `font-family:'JetBrains Mono',monospace;font-size:${px(24,z)};font-weight:500;color:#8b949e;margin-top:${px(16,z)}`, `— Asked in literally every Java interview. Ever.`);
  textScene.appendChild(line1);
  textScene.appendChild(line2);

  const flashScene = el('div', `position:absolute;inset:0;background:#ffffff;display:flex;align-items:center;justify-content:center;z-index:20;display:none`, '', 'scene-flash');
  const logoBox = el('div', `width:${px(300,z)};height:${px(300,z)};border:3px dashed rgba(0,0,0,0.3);border-radius:${px(16,z)};display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,0.03);color:#333;font-weight:700;font-size:${px(16,z)};text-transform:uppercase;font-family:'JetBrains Mono',monospace`);
  logoBox.id = "channel_logo_svg";
  logoBox.innerHTML = `<div style="font-size:${px(42,z)};margin-bottom:${px(12,z)}">📺</div><div>Upload: Channel Logo</div>`;
  flashScene.appendChild(logoBox);

  stage.appendChild(textScene);
  stage.appendChild(flashScene);
  t.appendChild(stage);
}

/* ── INTERVIEW HOOK ────────────────────────────────────────────────────────── */
function renderInterviewHookDom(s, acc, anim, t, z) {
  const stage = el('div', `width:100%;height:100%;background:linear-gradient(180deg,#0d1117 0%,#161b22 100%);position:relative;overflow:hidden`);
  
  const glitch = el('div', `position:absolute;right:calc(10% + ${px(90,z)});top:calc(60% - ${px(540,z)});width:${px(120,z)};height:${px(120,z)};border-radius:50%;border:2px dashed rgba(255,68,68,0.4);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#ff4444;font-size:${px(13,z)};font-weight:600;z-index:12;animation:flicker 1.8s infinite ease-in-out`, '', 'placeholder-box flicker');
  glitch.id = 'brain_glitch_fx_svg';
  glitch.innerHTML = `<div style="font-size:${px(24,z)};margin-bottom:${px(4,z)}">⚡</div><div>Upload: Glitch FX</div>`;

  const interviewer = el('div', `position:absolute;left:10%;top:calc(60% - ${px(400,z)});width:${px(300,z)};height:${px(400,z)};border:2px dashed rgba(255,255,255,0.25);border-radius:${px(8,z)};display:flex;flex-direction:column;align-items:center;justify-content:center;color:#8b949e;font-size:${px(13,z)};font-weight:600;z-index:10;animation:slideInLeft 0.8s ease forwards`, '', 'placeholder-box slide-in-left');
  interviewer.id = 'interviewer_svg';
  interviewer.innerHTML = `<div style="font-size:${px(32,z)};margin-bottom:${px(8,z)}">👔</div><div>Upload: Interviewer</div>`;

  const fresher = el('div', `position:absolute;right:10%;top:calc(60% - ${px(400,z)});width:${px(300,z)};height:${px(400,z)};border:2px dashed rgba(255,255,255,0.25);border-radius:${px(8,z)};display:flex;flex-direction:column;align-items:center;justify-content:center;color:#8b949e;font-size:${px(13,z)};font-weight:600;z-index:10;animation:slideInRight 0.8s ease forwards`, '', 'placeholder-box slide-in-right');
  fresher.id = 'fresher_svg';
  fresher.innerHTML = `<div style="font-size:${px(32,z)};margin-bottom:${px(8,z)}">🧑‍💻</div><div>Upload: Fresher</div>`;

  const paper = el('div', `position:absolute;left:50%;top:calc(60% - ${px(45,z)});transform:translateX(-50%);width:${px(160,z)};height:${px(110,z)};background:#fff;border:1px solid #d0d7de;border-radius:${px(4,z)};box-shadow:0 8px 20px rgba(0,0,0,0.4);z-index:15;display:flex;align-items:center;justify-content:center`);
  paper.id = 'question_paper_svg';
  paper.innerHTML = `<div style="color:#ff4444;font-weight:900;font-size:${px(18,z)};text-transform:uppercase;border:3px solid #ff4444;padding:${px(4,z)} ${px(10,z)};border-radius:${px(4,z)};transform:rotate(-15deg);white-space:nowrap">Explain OOP</div>`;

  const table = el('div', `position:absolute;top:60%;left:0;width:100%;height:40%;background:linear-gradient(180deg,#1c2128 0%,#161b22 100%);border-top:3px solid #30363d;z-index:5`);
  table.id = 'table_svg';

  stage.appendChild(glitch);
  stage.appendChild(interviewer);
  stage.appendChild(fresher);
  stage.appendChild(paper);
  stage.appendChild(table);
  t.appendChild(stage);
}

/* ── TWO CANDIDATES SPLIT ───────────────────────────────────────────────── */
function renderTwoCandidatesSplitDom(s, acc, anim, t, z) {
  const stage = el('div', `width:100%;height:100%;background:#0d1117;position:relative;display:flex;overflow:hidden`);
  
  const divider = el('div', `position:absolute;top:0;bottom:0;left:50%;width:2px;background:#7c8cf8;box-shadow:0 0 15px #7c8cf8;z-index:10;transform:translateX(-50%)`);
  
  const leftPanel = el('div', `flex:1;height:100%;padding:${px(30,z)};display:flex;flex-direction:column;align-items:center;justify-content:space-between;z-index:5`);
  leftPanel.innerHTML = `
    <div style="font-family:'Poppins',sans-serif;font-weight:800;font-size:${px(20,z)};color:#ff4444;background:rgba(255,68,68,0.12);border:2px solid #ff4444;padding:${px(6,z)} ${px(20,z)};border-radius:${px(20,z)}">Memorized</div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:${px(16,z)}">
      <div id="robotic_candidate_svg" class="jitter-loop" style="width:${px(280,z)};height:${px(380,z)};border:2px dashed rgba(255,255,255,0.25);border-radius:${px(12,z)};display:flex;flex-direction:column;align-items:center;justify-content:center;color:#8b949e">
        <div style="font-size:${px(32,z)};margin-bottom:${px(8,z)}">🤖</div>
        <div style="font-size:${px(12,z)};font-weight:600">Upload: Robotic Candidate</div>
      </div>
      <div style="width:${px(260,z)};padding:${px(8,z)};border:2px dashed rgba(255,68,68,0.4);border-radius:${px(12,z)};background:rgba(255,68,68,0.05);color:#ff8888;font-size:${px(11,z)};text-align:center;font-weight:600">
        💬 "OOP is a paradigm featuring classes..." (Looping)
      </div>
    </div>
  `;

  const rightPanel = el('div', `flex:1;height:100%;padding:${px(30,z)};display:flex;flex-direction:column;align-items:center;justify-content:space-between;z-index:5`);
  rightPanel.innerHTML = `
    <div style="font-family:'Poppins',sans-serif;font-weight:800;font-size:${px(20,z)};color:#00ff88;background:rgba(0,255,136,0.12);border:2px solid #00ff88;padding:${px(6,z)} ${px(20,z)};border-radius:${px(20,z)}">Understood</div>
    <div style="display:flex;align-items:center;gap:${px(16,z)}">
      <div id="confident_candidate_svg" style="width:${px(240,z)};height:${px(380,z)};border:2px dashed rgba(255,255,255,0.25);border-radius:${px(12,z)};display:flex;flex-direction:column;align-items:center;justify-content:center;color:#8b949e">
        <div style="font-size:${px(32,z)};margin-bottom:${px(8,z)}">💡</div>
        <div style="font-size:${px(12,z)};font-weight:600">Upload: Confident Candidate</div>
      </div>
      <div id="diagram_sketch_svg" class="smooth-build" style="width:${px(220,z)};height:${px(280,z)};border:2px dashed rgba(0,255,136,0.4);border-radius:${px(12,z)};background:rgba(0,255,136,0.03);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#8b949e">
        <div style="font-size:${px(32,z)};margin-bottom:${px(8,z)}">📐</div>
        <div style="font-size:${px(12,z)};font-weight:600">Upload: Diagram Sketch</div>
      </div>
    </div>
  `;

  stage.appendChild(divider);
  stage.appendChild(leftPanel);
  stage.appendChild(rightPanel);
  t.appendChild(stage);
}

/* ── ROADMAP GRAPHIC ─────────────────────────────────────────────────────── */
function renderRoadmapGraphicDom(s, acc, anim, t, z) {
  const stage = el('div', `width:100%;height:100%;background:linear-gradient(180deg,#0d1117 0%,#161b22 100%);position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden`);
  
  const road = el('div', `width:82%;height:75%;border:2px dashed rgba(255,255,255,0.25);border-radius:${px(24,z)};background:rgba(255,255,255,0.015);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3);font-size:${px(18,z)};font-weight:700;text-transform:uppercase`);
  road.id = 'road_graphic_svg';
  road.innerHTML = '🛣️ Upload: Road Graphic Path SVG (~1400x600px)';
  stage.appendChild(road);

  const topics = [
    "1. What is OOP & why it exists",
    "2. Classes and Objects",
    "3. Pillar 1 — Abstraction",
    "4. Pillar 2 — Encapsulation",
    "5. Pillar 3 — Inheritance + Diamond Problem",
    "6. Pillar 4 — Polymorphism",
    "7. OOP Relationships — IS-A and HAS-A",
    "8. Aggregation vs Composition",
    "9. Full Interview Q&A Rapid Fire"
  ];

  const coords = [
    `top:78%;left:8%`, `top:62%;left:16%`, `top:44%;left:24%`,
    `top:26%;left:34%`, `top:16%;left:50%;transform:translateX(-50%)`, `top:26%;right:34%`,
    `top:44%;right:24%`, `top:62%;right:16%`, `top:78%;right:8%`
  ];

  topics.forEach((tpc, i) => {
    const item = el('div', `position:absolute;z-index:10;display:flex;align-items:center;gap:${px(10,z)};background:rgba(13,17,23,0.85);padding:${px(6,z)} ${px(14,z)};border-radius:${px(10,z)};border:1px solid rgba(97,218,251,0.3);${coords[i]}`, '', 'signpost-item pop-in-sequential');
    item.innerHTML = `
      <div style="width:${px(36,z)};height:${px(36,z)};border:1.5px dashed rgba(255,255,255,0.25);border-radius:${px(6,z)};display:flex;align-items:center;justify-content:center;color:#61dafb;font-size:${px(14,z)}" class="signpost">🚩</div>
      <div style="color:#e6edf3;font-size:${px(13,z)};font-weight:600;font-family:'Poppins',sans-serif;white-space:nowrap;display:flex;align-items:center;gap:${px(6,z)}">
        <span style="width:${px(6,z)};height:${px(6,z)};border-radius:50%;background:#61dafb;display:inline-block"></span>
        ${tpc}
      </div>
    `;
    stage.appendChild(item);
  });

  t.appendChild(stage);
}

/* ── WHITEBOARD INTRO ────────────────────────────────────────────────────── */
function renderWhiteboardIntroDom(s, acc, anim, t, z) {
  const stage = el('div', `width:100%;height:100%;background:#f5f5f0;background-image:linear-gradient(to right,rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,0.03) 1px,transparent 1px);background-size:40px 40px;position:relative;overflow:hidden`);
  
  const hand = el('div', `position:absolute;left:15%;top:45%;transform:translateY(-50%);width:${px(300,z)};height:${px(360,z)};border:3px dashed rgba(0,0,0,0.25);border-radius:${px(16,z)};display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,0.02);color:#555;font-weight:700;font-size:${px(14,z)};text-transform:uppercase;z-index:20`);
  hand.id = 'hand_marker_svg';
  hand.innerHTML = `<div style="font-size:${px(40,z)};margin-bottom:${px(8,z)}">✍️</div><div>Upload: Hand + Marker</div>`;
  
  const svgCanvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgCanvas.setAttribute('style', 'position:absolute;inset:0;width:100%;height:100%;z-index:10;pointer-events:none');
  svgCanvas.setAttribute('viewBox', '0 0 1920 1080');
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.id = 'whiteboard-stroke';
  path.setAttribute('d', 'M 450 500 Q 700 350 950 500 T 1450 500');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', '#1a1a1a');
  path.setAttribute('stroke-width', '6');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-dasharray', '1000');
  path.setAttribute('stroke-dashoffset', '1000');
  svgCanvas.appendChild(path);

  stage.appendChild(hand);
  stage.appendChild(svgCanvas);
  t.appendChild(stage);
}
