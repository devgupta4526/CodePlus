// ═══════════════════════════════════════════════════════════════════════════
// renderers-narrative.js  —  Story, analogies, journey, and myth-busting
// ═══════════════════════════════════════════════════════════════════════════

/* HOOK */
function renderHookDom(s,acc,anim,t,z){
  const w=el('div',`position:absolute;inset:0;display:flex;overflow:hidden`);
  const decoArea=el('div',`position:absolute;right:${px(36,z)};top:0;bottom:0;width:${px(310,z)};display:flex;align-items:center;justify-content:center;pointer-events:none`);
  const astroWrap=el('div',`width:${px(210,z)};height:${px(280,z)};animation:floatY 4s ease-in-out infinite;position:relative;z-index:2`);
  if (typeof svgAstronaut === 'function') astroWrap.innerHTML=svgAstronaut(acc);
  decoArea.appendChild(astroWrap);
  if (typeof svgPlanet === 'function') {
    const p1=el('div',`position:absolute;top:${px(45,z)};right:${px(18,z)};width:${px(72,z)};height:${px(72,z)};animation:floatY 3.2s ease-in-out .7s infinite`);
    p1.innerHTML=svgPlanet('#f8d07c',true,'pA');
    decoArea.appendChild(p1);
    const p2=el('div',`position:absolute;top:${px(28,z)};left:${px(6,z)};width:${px(40,z)};height:${px(40,z)};animation:floatY 5.1s ease-in-out 1.3s infinite`);
    p2.innerHTML=svgPlanet('#c792ea',false,'pB');
    decoArea.appendChild(p2);
    const p3=el('div',`position:absolute;bottom:${px(80,z)};right:${px(10,z)};width:${px(28,z)};height:${px(28,z)};animation:floatY 4.5s ease-in-out 2s infinite`);
    p3.innerHTML=svgPlanet('#7cd4f8',false,'pC');
    decoArea.appendChild(p3);
  }
  for(let i=0;i<7;i++){
    const sx=5+Math.floor(Math.sin(i*1.7)*40+50), sy=5+Math.floor(Math.cos(i*2.1)*40+50);
    const sz2=Math.round((1.5+Math.random()*2)*z);
    const sp=el('div',`position:absolute;left:${sx}%;top:${sy}%;width:${sz2}px;height:${sz2}px;border-radius:50%;background:#fff;animation:glowPulse ${1.4+i*.3}s ease-in-out ${i*.4}s infinite`);
    decoArea.appendChild(sp);
  }
  w.appendChild(decoArea);
  
  const content=el('div',`position:absolute;left:${px(55,z)};top:50%;transform:translateY(-50%);max-width:${px(600,z)};display:flex;flex-direction:column;gap:${px(16,z)}`);
  const icons=['🤔','❓','💭','🧩','🔍','✨'];
  const icon=s.calloutIcon||icons[hashStr(s.title||'')%icons.length];
  content.appendChild(el('div',`font-size:${px(52,z)};line-height:1;${as(anim,0,z)}`,icon));
  content.appendChild(el('div',`font-size:${px(40,z)};font-weight:700;color:#e8eaf6;font-family:'JetBrains Mono',monospace;line-height:1.25;text-shadow:0 0 80px ${acc}50;${as(anim,150,z)}`,escHtml(s.title||'')));
  if(s.subtitle){
    const sub=el('div',`font-size:${px(16,z)};color:${acc};font-family:'JetBrains Mono',monospace;border-left:3px solid ${acc};padding-left:${px(12,z)};${as(anim,350,z)}`,escHtml(s.subtitle));
    content.appendChild(sub);
  }
  w.appendChild(content);
  t.appendChild(w);
}

/* PROBLEM */
function renderProblemDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(46,z)} ${px(60,z)};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${px(20,z)}`);
  c.appendChild(el('div',`font-size:${px(34,z)};font-weight:700;color:#e8eaf6;font-family:'JetBrains Mono',monospace;text-align:center;${as(anim,0,z)}`,escHtml(s.title||'')));
  if(s.subtitle) c.appendChild(el('div',`font-size:${px(14,z)};color:${acc};font-family:'JetBrains Mono',monospace;text-align:center;${as(anim,80,z)}`,escHtml(s.subtitle)));
  const rows=el('div',`display:flex;flex-direction:column;gap:${px(8,z)};width:${px(420,z)}`);
  (s.bullets||[]).forEach((b,i)=>{
    const bad=/[✖❌xX]/.test(b)&&!/[✔✓]/.test(b);
    const clr=bad?'#f87c7c':/[✔✓]/.test(b)?'#7cf8a0':acc;
    const row=el('div',`padding:${px(10,z)} ${px(16,z)};border-radius:${px(8,z)};border:1px solid ${clr}50;background:${clr}10;font-size:${px(15,z)};color:#d0d4e8;font-family:'JetBrains Mono',monospace;text-align:center`,'','bullet-item');
    row.dataset.idx=i; row.textContent=b;
    rows.appendChild(row);
  });
  c.appendChild(rows);
  if(s.callout){
    const cb=el('div',`margin-top:${px(8,z)};padding:${px(12,z)} ${px(20,z)};border-radius:${px(10,z)};border:1px dashed ${acc}50;background:${acc}0a;font-size:${px(14,z)};color:#9095b8;font-style:italic;font-family:'JetBrains Mono',monospace;text-align:center;max-width:${px(520,z)}`,'','bullet-item');
    cb.dataset.idx=(s.bullets||[]).length;
    cb.textContent='"'+s.callout+'"';
    c.appendChild(cb);
  }
  t.appendChild(c);
}

/* PREDICTION */
function renderPredictionDom(s,acc,anim,t,z){
  const w=el('div',`position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${px(22,z)};padding:${px(70,z)}`);
  w.appendChild(el('div',`font-size:${px(12,z)};color:${acc};font-family:'JetBrains Mono',monospace;letter-spacing:.1em;border:1px solid ${acc}50;border-radius:${px(20,z)};padding:${px(5,z)} ${px(14,z)};${as(anim,0,z)}`,'🔮 PREDICTION'));
  w.appendChild(el('div',`font-size:${px(28,z)};font-weight:700;color:#e8eaf6;text-align:center;font-family:'JetBrains Mono',monospace;line-height:1.4;max-width:${px(700,z)};${as(anim,120,z)}`,escHtml(s.question||s.title||'')));
  if(s.answer){
    const ans=el('div',`margin-top:${px(10,z)};padding:${px(14,z)} ${px(22,z)};border-radius:${px(10,z)};border:1px solid #7cf8a050;background:#7cf8a012;font-size:${px(16,z)};color:#7cf8a0;font-family:'JetBrains Mono',monospace;text-align:center`,'','bullet-item');
    ans.dataset.idx=0;
    ans.innerHTML='✅ '+escHtml(s.answer);
    w.appendChild(ans);
  } else {
    w.appendChild(el('div',`font-size:${px(11,z)};color:#3a3d52;font-family:'JetBrains Mono',monospace`,'▸ Pause here — let students guess'));
  }
  t.appendChild(w);
}

/* WRONG ASSUMPTION */
function renderWrongAssumptionDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(34,z)} ${px(46,z)};display:flex;flex-direction:column`);
  c.appendChild(el('div',`font-size:${px(26,z)};font-weight:700;color:#e8eaf6;font-family:'JetBrains Mono',monospace;text-align:center;margin-bottom:${px(4,z)};${as(anim,0,z)}`,escHtml(s.title||'')));
  if(s.subtitle) c.appendChild(el('div',`font-size:${px(13,z)};color:${acc};font-family:'JetBrains Mono',monospace;text-align:center;margin-bottom:${px(16,z)};${as(anim,60,z)}`,escHtml(s.subtitle)));
  const cols=el('div',`display:flex;gap:${px(30,z)};flex:1;align-items:center;justify-content:center`);
  const chain=(steps,clr,icon,label,delayBase)=>{
    const colW=el('div',`display:flex;flex-direction:column;align-items:center;gap:${px(6,z)}`);
    colW.appendChild(el('div',`font-size:${px(11,z)};color:${clr};font-family:'JetBrains Mono',monospace;margin-bottom:${px(6,z)};font-weight:700`,label));
    steps.forEach((st,i)=>{
      const row=el('div',`width:${px(170,z)};padding:${px(9,z)} ${px(12,z)};border-radius:${px(7,z)};border:1px solid ${clr}50;background:${clr}10;font-size:${px(12,z)};color:#d0d4e8;font-family:'JetBrains Mono',monospace;text-align:center`,'','bullet-item');
      row.dataset.idx=delayBase+i; row.textContent=st;
      colW.appendChild(row);
      if(i<steps.length-1) colW.appendChild(el('div',`color:#3a3d52;font-size:${px(13,z)}`,'↓'));
    });
    colW.appendChild(el('div',`font-size:${px(20,z)};margin-top:${px(4,z)}`,icon));
    return colW;
  };
  cols.appendChild(chain(s.wrongSteps||['.java','CPU'],'#f87c7c','❌','WHAT STUDENTS ASSUME',0));
  cols.appendChild(el('div',`font-size:${px(20,z)};color:#3a3d52`,'vs'));
  cols.appendChild(chain(s.correctSteps||['.java','javac','.class','JVM','CPU'],'#7cf8a0','✅','WHAT ACTUALLY HAPPENS',(s.wrongSteps||[]).length));
  c.appendChild(cols); t.appendChild(c);
}

/* STORY */
function renderStoryDom(s,acc,anim,t,z){
  const w=el('div',`position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${px(14,z)};padding:${px(70,z)} ${px(110,z)}`);
  if(s.title) w.appendChild(el('div',`font-size:${px(13,z)};color:${acc};font-family:'JetBrains Mono',monospace;letter-spacing:.08em;margin-bottom:${px(8,z)};${as(anim,0,z)}`,'📖 '+escHtml(s.title)));
  (s.bullets||[]).forEach((b,i)=>{
    const line=el('div',`font-size:${px(19,z)};color:#d0d4e8;font-family:'JetBrains Mono',monospace;text-align:center;line-height:1.6`,'','bullet-item');
    line.dataset.idx=i; line.textContent=b;
    w.appendChild(line);
  });
  if(s.note){
    const map=el('div',`margin-top:${px(14,z)};padding:${px(12,z)} ${px(22,z)};border-radius:${px(10,z)};border:1px solid ${acc}50;background:${acc}10;font-size:${px(15,z)};color:${acc};font-weight:700;font-family:'JetBrains Mono',monospace;text-align:center`,'','bullet-item');
    map.dataset.idx=(s.bullets||[]).length;
    map.textContent=s.note;
    w.appendChild(map);
  }
  t.appendChild(w);
}

/* ANALOGY */
function renderAnalogyDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(40,z)} ${px(50,z)};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${px(18,z)}`);
  if(s.title) c.appendChild(el('div',`font-size:${px(26,z)};font-weight:700;color:#e8eaf6;font-family:'JetBrains Mono',monospace;text-align:center;${as(anim,0,z)}`,escHtml(s.title)));
  const row=el('div',`display:flex;align-items:center;gap:${px(24,z)}`);
  const card=(icon,label,desc,clr,delay)=>{
    const cd=el('div',`width:${px(220,z)};padding:${px(20,z)};border-radius:${px(12,z)};border:1px solid ${clr}40;background:${clr}0c;display:flex;flex-direction:column;align-items:center;gap:${px(8,z)};${as(anim,delay,z)}`);
    cd.appendChild(el('div',`font-size:${px(40,z)}`,icon));
    cd.appendChild(el('div',`font-size:${px(16,z)};font-weight:700;color:${clr};font-family:'JetBrains Mono',monospace;text-align:center`,escHtml(label)));
    if(desc) cd.appendChild(el('div',`font-size:${px(11,z)};color:#9095b8;font-family:'JetBrains Mono',monospace;text-align:center`,escHtml(desc)));
    return cd;
  };
  row.appendChild(card(s.leftIcon||'⚙️',s.leftLabel||'Concept',s.leftDesc,'#7cd4f8',120));
  row.appendChild(el('div',`font-size:${px(28,z)};color:${acc};font-weight:700;${as(anim,200,z)}`,'='));
  row.appendChild(card(s.rightIcon||'🌍',s.rightLabel||'Real World',s.rightDesc,'#7cf8a0',280));
  c.appendChild(row);
  if(s.subtitle) c.appendChild(el('div',`font-size:${px(13,z)};color:#5a5f80;font-family:'JetBrains Mono',monospace;text-align:center;${as(anim,380,z)}`,escHtml(s.subtitle)));
  t.appendChild(c);
}

/* JOURNEY */
function renderJourneyDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(36,z)} ${px(48,z)};display:flex;flex-direction:column`);
  c.appendChild(el('div',`font-size:${px(28,z)};font-weight:700;color:#e8eaf6;font-family:'JetBrains Mono',monospace;text-align:center;margin-bottom:${px(4,z)};${as(anim,0,z)}`,escHtml(s.title||'')));
  if(s.subtitle) c.appendChild(el('div',`font-size:${px(13,z)};color:${acc};font-family:'JetBrains Mono',monospace;text-align:center;margin-bottom:${px(16,z)};${as(anim,60,z)}`,escHtml(s.subtitle)));
  const steps=s.bullets||[];
  const colors=['#7c8cf8','#7cd4f8','#7cf8a0','#f8d07c','#f87cd4','#f87c7c','#c792ea'];
  const stage=el('div',`flex:1;display:flex;align-items:center;justify-content:center`);
  const flow=el('div',`display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:${px(2,z)}`);
  const nSz=Math.max(64, Math.min(88, Math.round((720-steps.length*22)/steps.length * z)));
  steps.forEach((step,i)=>{
    const clr=colors[i%colors.length];
    const delay=i*130;
    const iconSvg = (typeof getNodeIcon === 'function') ? getNodeIcon(step,i) : '';
    const nodeWrap=el('div',`display:flex;flex-direction:column;align-items:center;gap:${px(9,z)};animation:nodeAppear .55s cubic-bezier(.22,1,.36,1) ${delay}ms both`,'','bullet-item pipeline-node');
    nodeWrap.dataset.idx=i;
    const ring=el('div','','','p-ring');
    ring.style.cssText=`width:${nSz}px;height:${nSz}px;border-radius:50%;border:${Math.max(2,Math.round(2.5*z))}px solid ${clr};background:radial-gradient(circle at 35% 30%,${clr}28,${clr}0a);display:flex;align-items:center;justify-content:center;box-shadow:0 0 ${Math.round(22*z)}px ${clr}40,inset 0 0 ${Math.round(14*z)}px ${clr}10;position:relative;`;
    const rip=el('div','');
    rip.style.cssText=`position:absolute;border-radius:50%;border:1px solid ${clr}28;inset:-${Math.round(7*z)}px;animation:ripple 2.8s ease-out ${delay+600}ms infinite;`;
    ring.appendChild(rip);
    const iconWrap=el('div','');
    iconWrap.style.cssText=`color:${clr};width:${Math.round(28*z)}px;height:${Math.round(28*z)}px;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 0 ${Math.round(6*z)}px ${clr}90);`;
    iconWrap.innerHTML=iconSvg;
    if(iconWrap.firstChild) iconWrap.firstChild.style.cssText='width:100%;height:100%';
    ring.appendChild(iconWrap);
    nodeWrap.appendChild(ring);
    const lbl=el('div','',escHtml(step));
    lbl.style.cssText=`font-size:${px(10,z)};color:#9095b8;font-family:'JetBrains Mono',monospace;text-align:center;max-width:${nSz+16}px;line-height:1.3;font-weight:600;`;
    nodeWrap.appendChild(lbl);
    flow.appendChild(nodeWrap);
    if(i<steps.length-1){
      const aw=Math.round(14*z);
      const arr=el('div','');
      arr.style.cssText=`display:flex;align-items:center;padding:0 ${px(3,z)};padding-bottom:${px(18,z)};animation:fadeUp .35s ease ${delay+100}ms both;`;
      arr.innerHTML=`<svg width="${aw}" height="${aw}" viewBox="0 0 14 14" fill="none"><path d="M4 3l5 4-5 4" stroke="${colors[(i+1)%colors.length]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      flow.appendChild(arr);
    }
  });
  stage.appendChild(flow);
  c.appendChild(stage);
  t.appendChild(c);
}

/* MYSTERY */
function renderMysteryDom(s,acc,anim,t,z){
  const w=el('div',`position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${px(14,z)};padding:${px(60,z)}`);
  if(s.title) w.appendChild(el('div',`font-size:${px(26,z)};font-weight:700;color:#e8eaf6;font-family:'JetBrains Mono',monospace;text-align:center;${as(anim,0,z)}`,escHtml(s.title)));
  const chips=el('div',`display:flex;flex-wrap:wrap;gap:${px(8,z)};justify-content:center;max-width:${px(560,z)}`);
  (s.bullets||[]).forEach((b,i)=>{
    const chip=el('div',`padding:${px(8,z)} ${px(16,z)};border-radius:${px(20,z)};border:1px solid ${acc}50;background:${acc}10;font-size:${px(13,z)};color:#d0d4e8;font-family:'JetBrains Mono',monospace`,'','bullet-item');
    chip.dataset.idx=i; chip.textContent=b;
    chips.appendChild(chip);
  });
  w.appendChild(chips);
  const q=el('div',`font-size:${px(40,z)};font-weight:700;color:${acc};font-family:'JetBrains Mono',monospace;text-shadow:0 0 50px ${acc}50;margin-top:${px(10,z)}`,'','bullet-item');
  q.dataset.idx=(s.bullets||[]).length;
  q.textContent=s.question||'How?';
  w.appendChild(q);
  t.appendChild(w);
}

/* MYTH VS REALITY */
function renderMythRealityDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(40,z)} ${px(50,z)};display:flex;flex-direction:column`);
  if(s.title) c.appendChild(el('div',`font-size:${px(24,z)};font-weight:700;color:#e8eaf6;font-family:'JetBrains Mono',monospace;text-align:center;margin-bottom:${px(18,z)};${as(anim,0,z)}`,escHtml(s.title)));
  const row=el('div',`display:flex;gap:${px(18,z)};flex:1`);
  const myth=el('div',`flex:1;border-radius:${px(12,z)};border:1px solid #f87c7c50;background:#f87c7c0c;padding:${px(18,z)};display:flex;flex-direction:column;gap:${px(8,z)};${as(anim,100,z)}`);
  myth.appendChild(el('div',`font-size:${px(13,z)};font-weight:700;color:#f87c7c;font-family:'JetBrains Mono',monospace`,'❌ MYTH'));
  myth.appendChild(el('div',`font-size:${px(18,z)};color:#e8eaf6;font-family:'JetBrains Mono',monospace;line-height:1.5`,escHtml(s.myth||'')));
  const reality=el('div',`flex:1;border-radius:${px(12,z)};border:1px solid #7cf8a050;background:#7cf8a00c;padding:${px(18,z)};display:flex;flex-direction:column;gap:${px(7,z)};${as(anim,250,z)}`);
  reality.appendChild(el('div',`font-size:${px(13,z)};font-weight:700;color:#7cf8a0;font-family:'JetBrains Mono',monospace;margin-bottom:${px(4,z)}`,'✅ REALITY'));
  (s.bullets||[]).forEach((b,i)=>{
    const row2=el('div',`display:flex;gap:${px(8,z)};align-items:flex-start;font-size:${px(13,z)};color:#d0d4e8;font-family:'JetBrains Mono',monospace`,'','bullet-item');
    row2.dataset.idx=i; row2.innerHTML='▸ '+escHtml(b);
    reality.appendChild(row2);
  });
  row.append(myth,reality); c.appendChild(row); t.appendChild(c);
}

/* COMMON MISTAKE */
function renderCommonMistakeDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(40,z)} ${px(54,z)};display:flex;flex-direction:column`);
  c.appendChild(el('div',`font-size:${px(28,z)};font-weight:700;color:#e8eaf6;font-family:'JetBrains Mono',monospace;margin-bottom:${px(4,z)};${as(anim,0,z)}`,'⚠️ '+escHtml(s.title||'Common Mistakes')));
  if(s.subtitle) c.appendChild(el('div',`font-size:${px(13,z)};color:${acc};font-family:'JetBrains Mono',monospace;margin-bottom:${px(18,z)};${as(anim,60,z)}`,escHtml(s.subtitle)));
  const list=el('div',`display:flex;flex-direction:column;gap:${px(9,z)}`);
  (s.bullets||[]).forEach((b,i)=>{
    const row=el('div',`display:flex;gap:${px(12,z)};align-items:center;padding:${px(11,z)} ${px(15,z)};border-radius:${px(8,z)};border:1px solid #f87c7c40;background:#f87c7c0c`,'','bullet-item');
    row.dataset.idx=i;
    row.appendChild(el('span',`color:#f87c7c;font-size:${px(15,z)}`,'✖'));
    row.appendChild(el('span',`font-size:${px(15,z)};color:#d0d4e8;font-family:'JetBrains Mono',monospace`,escHtml(b)));
    list.appendChild(row);
  });
  c.appendChild(list); t.appendChild(c);
}

/* CHALLENGE */
function renderChallengeDom(s,acc,anim,t,z){
  const w=el('div',`position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${px(20,z)};padding:${px(70,z)}`);
  w.appendChild(el('div',`font-size:${px(13,z)};color:${acc};font-family:'JetBrains Mono',monospace;letter-spacing:.1em;border:2px solid ${acc};border-radius:${px(20,z)};padding:${px(6,z)} ${px(16,z)};${as(anim,0,z)}`,'⏸ CHALLENGE — PAUSE THE LESSON'));
  w.appendChild(el('div',`font-size:${px(30,z)};font-weight:700;color:#e8eaf6;text-align:center;font-family:'JetBrains Mono',monospace;line-height:1.4;max-width:${px(700,z)};${as(anim,150,z)}`,escHtml(s.question||s.title||'')));
  if(s.note) w.appendChild(el('div',`font-size:${px(13,z)};color:#5a5f80;font-family:'JetBrains Mono',monospace;text-align:center;${as(anim,300,z)}`,escHtml(s.note)));
  t.appendChild(w);
}

/* QUIZ */
function renderQuizDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(40,z)} ${px(60,z)};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${px(16,z)}`);
  c.appendChild(el('div',`font-size:${px(11,z)};color:${acc};font-family:'JetBrains Mono',monospace;letter-spacing:.1em`,'❓ '+(s.title||'QUIZ').toUpperCase()));
  c.appendChild(el('div',`font-size:${px(22,z)};font-weight:700;color:#e8eaf6;font-family:'JetBrains Mono',monospace;text-align:center;max-width:${px(640,z)};${as(anim,0,z)}`,escHtml(s.question||'')));
  const opts=el('div',`display:flex;flex-direction:column;gap:${px(8,z)};width:${px(460,z)}`);
  (s.options||[]).forEach((o,i)=>{
    const isCorrect=i===s.correctIndex;
    const row=el('div',`padding:${px(10,z)} ${px(16,z)};border-radius:${px(8,z)};border:1px solid ${isCorrect?'#7cf8a0':acc+'30'};background:${isCorrect?'#7cf8a012':acc+'08'};font-size:${px(14,z)};color:#d0d4e8;font-family:'JetBrains Mono',monospace;display:flex;gap:${px(10,z)};align-items:center`);
    row.appendChild(el('span',`color:${acc};font-weight:700`,String.fromCharCode(65+i)));
    row.appendChild(el('span','',escHtml(o)));
    opts.appendChild(row);
  });
  c.appendChild(opts);
  if(typeof s.correctIndex==='number'&&s.options&&s.options.length){
    const reveal=el('div',`padding:${px(8,z)} ${px(16,z)};border-radius:${px(7,z)};font-size:${px(13,z)};color:#7cf8a0;font-family:'JetBrains Mono',monospace`,'','bullet-item');
    reveal.dataset.idx=0;
    reveal.textContent='✅ Correct answer: '+String.fromCharCode(65+s.correctIndex)+(s.note?' — '+s.note:'');
    c.appendChild(reveal);
  }
  t.appendChild(c);
}

/* MEMORY TRICK */
function renderMemoryTrickDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(40,z)} ${px(54,z)};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${px(16,z)}`);
  c.appendChild(el('div',`font-size:${px(26,z)};font-weight:700;color:#e8eaf6;font-family:'JetBrains Mono',monospace;text-align:center;${as(anim,0,z)}`,'🧠 '+escHtml(s.title||'Memory Trick')));
  const list=el('div',`display:flex;flex-direction:column;gap:${px(10,z)};width:${px(420,z)}`);
  (s.bullets||[]).forEach((b,i)=>{
    const parts=b.split('→').map(x=>x.trim());
    const row=el('div',`display:flex;align-items:center;gap:${px(12,z)};padding:${px(10,z)} ${px(16,z)};border-radius:${px(8,z)};border:1px solid ${acc}40;background:${acc}0a`,'','bullet-item');
    row.dataset.idx=i;
    const circ=el('div',`width:${px(28,z)};height:${px(28,z)};border-radius:50%;border:2px solid ${acc};background:${acc}20;display:flex;align-items:center;justify-content:center;font-size:${px(13,z)};font-weight:700;color:${acc};font-family:'JetBrains Mono',monospace;flex-shrink:0`,String(i+1));
    row.appendChild(circ);
    row.appendChild(el('span',`font-size:${px(14,z)};color:#d0d4e8;font-family:'JetBrains Mono',monospace`,escHtml(parts.join('  →  '))));
    list.appendChild(row);
  });
  c.appendChild(list); t.appendChild(c);
}

/* DID YOU KNOW */
function renderDidYouKnowDom(s,acc,anim,t,z){
  const w=el('div',`position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${px(18,z)};padding:${px(70,z)}`);
  w.appendChild(el('div',`font-size:${px(13,z)};color:${acc};font-family:'JetBrains Mono',monospace;letter-spacing:.1em;${as(anim,0,z)}`,(s.calloutIcon||'💡')+' DID YOU KNOW?'));
  w.appendChild(el('div',`font-size:${px(24,z)};font-weight:600;color:#e8eaf6;text-align:center;font-family:'JetBrains Mono',monospace;line-height:1.5;max-width:${px(680,z)};${as(anim,150,z)}`,escHtml(s.fact||s.title||'')));
  t.appendChild(w);
}

/* CHARACTER */
function renderCharacterDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(38,z)} ${px(50,z)};display:flex;flex-direction:column`);
  c.appendChild(el('div',`font-size:${px(26,z)};font-weight:700;color:#e8eaf6;font-family:'JetBrains Mono',monospace;text-align:center;margin-bottom:${px(4,z)};${as(anim,0,z)}`,escHtml(s.title||'')));
  if(s.subtitle) c.appendChild(el('div',`font-size:${px(13,z)};color:${acc};font-family:'JetBrains Mono',monospace;text-align:center;margin-bottom:${px(20,z)};${as(anim,60,z)}`,escHtml(s.subtitle)));
  const row=el('div',`flex:1;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:${px(10,z)}`);
  const chars=s.characters&&s.characters.length?s.characters:[{icon:'👨‍💻',label:'Programmer'},{icon:'⚙️',label:'CPU'}];
  chars.forEach((ch,i)=>{
    if(i>0) row.appendChild(el('div',`color:#3a3d52;font-size:${px(18,z)}`,'→'));
    const card=el('div',`display:flex;flex-direction:column;align-items:center;gap:${px(6,z)}`,'','bullet-item');
    card.dataset.idx=i;
    card.appendChild(el('div',`font-size:${px(38,z)}`,ch.icon||'⚙️'));
    card.appendChild(el('div',`font-size:${px(12,z)};color:#d0d4e8;font-family:'JetBrains Mono',monospace`,escHtml(ch.label||'')));
    row.appendChild(card);
  });
  c.appendChild(row); t.appendChild(c);
}

/* TRANSITION / NEXT TOPIC */
function renderTransitionDom(s,acc,anim,t,z){
  const w=el('div',`position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${px(16,z)};padding:${px(70,z)}`);
  if(s.bullets&&s.bullets.length){
    const recap=el('div',`display:flex;flex-wrap:wrap;gap:${px(7,z)};justify-content:center;max-width:${px(560,z)};${as(anim,0,z)}`);
    s.bullets.forEach(b=>recap.appendChild(el('span',`padding:${px(5,z)} ${px(12,z)};border-radius:${px(14,z)};border:1px solid ${acc}40;background:${acc}0a;font-size:${px(11,z)};color:#9095b8;font-family:'JetBrains Mono',monospace`,'✔ '+escHtml(b))));
    w.appendChild(recap);
  }
  if(s.subtitle) w.appendChild(el('div',`font-size:${px(16,z)};color:#9095b8;font-family:'JetBrains Mono',monospace;text-align:center;${as(anim,150,z)}`,escHtml(s.subtitle)));
  w.appendChild(el('div',`font-size:${px(22,z)};color:${acc}`,'↓'));
  w.appendChild(el('div',`font-size:${px(30,z)};font-weight:700;color:#e8eaf6;text-align:center;font-family:'JetBrains Mono',monospace;text-shadow:0 0 60px ${acc}40;${as(anim,300,z)}`,escHtml(s.nextTopic||s.title||'')));
  t.appendChild(w);
}

/* SUMMARY */
function renderSummaryDom(s,acc,anim,t,z){
  const c=el('div',`position:absolute;inset:0;padding:${px(46,z)} ${px(60,z)};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${px(20,z)}`);
  c.appendChild(el('div',`font-size:${px(30,z)};font-weight:700;color:#e8eaf6;font-family:'JetBrains Mono',monospace;text-align:center;${as(anim,0,z)}`,escHtml(s.title||'Today you learned')));
  const grid=el('div',`display:grid;grid-template-columns:repeat(2,1fr);gap:${px(10,z)};width:${px(520,z)}`);
  (s.bullets||[]).forEach((b,i)=>{
    const row=el('div',`display:flex;align-items:center;gap:${px(10,z)};padding:${px(10,z)} ${px(14,z)};border-radius:${px(8,z)};border:1px solid #7cf8a040;background:#7cf8a00c`,'','bullet-item');
    row.dataset.idx=i;
    row.appendChild(el('span',`color:#7cf8a0;font-size:${px(15,z)}`,'✔'));
    row.appendChild(el('span',`font-size:${px(14,z)};color:#d0d4e8;font-family:'JetBrains Mono',monospace`,escHtml(b)));
    grid.appendChild(row);
  });
  c.appendChild(grid); t.appendChild(c);
}
