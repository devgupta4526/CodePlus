// ═══ EDITOR ═══════════════════════════════════════════════════════════════
function renderEditor(){
  const s=slides[cur], body=document.getElementById('editor-body');
  body.innerHTML='';
  if(activeTab==='content') renderContentTab(s,body);
  else if(activeTab==='code') renderCodeTab(s,body);
  else if(activeTab==='anim') renderAnimTab(s,body);
  else if(activeTab==='manage') renderManageTab(s,body);
}
function mkRow(label,el2){
  const r=document.createElement('div');r.className='erow';
  const l=document.createElement('span');l.className='elabel';l.textContent=label;
  r.append(l,el2);return r;
}
function mkInput(val,cb){
  const i=document.createElement('input');i.className='einput';i.value=val||'';i.style.height='28px';
  i.oninput=e=>cb(e.target.value);return i;
}
function mkImageRow(s,onChange){
  const wrap=document.createElement('div');wrap.style.cssText='flex:1;display:flex;flex-direction:column;gap:5px';
  const row=document.createElement('div');row.style.cssText='display:flex;gap:5px;align-items:center';
  const urlInp=document.createElement('input');urlInp.className='einput';urlInp.style.height='28px';urlInp.placeholder='https://... or upload below';
  urlInp.value=(s.imageUrl||'').startsWith('data:')?'(uploaded image)':(s.imageUrl||'');
  urlInp.oninput=e=>{s.imageUrl=e.target.value;onChange();};
  const fileInp=document.createElement('input');fileInp.type='file';fileInp.accept='image/*';fileInp.style.display='none';
  const upBtn=document.createElement('button');upBtn.className='tb-btn';upBtn.textContent='📂 Upload';upBtn.style.flexShrink='0';
  upBtn.onclick=()=>fileInp.click();
  fileInp.onchange=e=>{
    const f=e.target.files[0];if(!f)return;
    const r=new FileReader();
    r.onload=ev=>{s.imageUrl=ev.target.result;urlInp.value='(uploaded image)';onChange();renderEditor();};
    r.readAsDataURL(f);
  };
  row.append(urlInp,upBtn,fileInp);wrap.appendChild(row);
  if(s.imageUrl){
    const prev=document.createElement('img');prev.src=s.imageUrl;
    prev.style.cssText='max-width:100px;max-height:60px;border-radius:5px;border:1px solid var(--border);object-fit:contain';
    wrap.appendChild(prev);
  }
  return wrap;
}
function renderContentTab(s,body){
  // narrative role (separate from visual layout)
  const roleSel=document.createElement('select');
  roleSel.className='einput';roleSel.style.cssText='height:28px;cursor:pointer';
  ROLES.forEach(r=>{const op=document.createElement('option');op.value=r;op.textContent=r||'(none)';if(s.role===r)op.selected=true;roleSel.appendChild(op);});
  roleSel.onchange=e=>{s.role=e.target.value;};
  body.appendChild(mkRow('Role',roleSel));
  body.appendChild(mkRow('Title',mkInput(s.title,v=>{s.title=v;renderSlide(false);updateSidebar();})));
  body.appendChild(mkRow('Subtitle',mkInput(s.subtitle,v=>{s.subtitle=v;renderSlide(false);updateSidebar();})));
  // layout
  const lw=document.createElement('div');lw.style.cssText='display:flex;gap:4px;flex-wrap:wrap;flex:1';
  LAYOUTS.forEach(l=>{
    const b=document.createElement('button');b.className='lay-btn'+(s.layout===l?' active':'');b.textContent=l;
    b.onclick=()=>{s.layout=l;renderEditor();renderSlide(true);updateSidebar();};
    lw.appendChild(b);
  });
  body.appendChild(mkRow('Layout',lw));
  // accent
  const aw=document.createElement('div');aw.style.cssText='display:flex;gap:5px;flex:1;align-items:center';
  ACCENTS.forEach(c=>{
    const d=document.createElement('div');d.className='swatch'+(s.accent===c?' active':'');d.style.background=c;
    d.onclick=()=>{s.accent=c;renderEditor();renderSlide(false);updateSidebar();};
    aw.appendChild(d);
  });
  body.appendChild(mkRow('Accent',aw));
  if(s.layout==='title'){
    const tsWrap=document.createElement('div');tsWrap.style.cssText='display:flex;gap:4px;flex:1';
    [['','Auto'],['brackets','Brackets'],['orbit','Orbit'],['beams','Beams'],['mesh','Mesh']].forEach(([sv,lbl])=>{
      const b=document.createElement('button');b.className='lay-btn'+((s.titleStyle||'')===sv?' active':'');b.textContent=lbl;
      b.onclick=()=>{s.titleStyle=sv;renderEditor();renderSlide(true);};
      tsWrap.appendChild(b);
    });
    body.appendChild(mkRow('Background',tsWrap));
  }
  if(s.layout==='diagram'){
    const dw=document.createElement('div');dw.style.cssText='display:flex;gap:4px;flex:1;flex-wrap:wrap';
    ['jvm','security','springboot','gc','rest-api','microservices','oop','solid','design-patterns','concurrency','transactions','custom'].forEach(dt=>{
      const b=document.createElement('button');b.className='lay-btn'+(s.diagramType===dt?' active':'');b.textContent=dt;
      b.onclick=()=>{
        if(s.diagramNodes&&s.diagramNodes.length){
          if(!confirm('Load the "'+dt+'" preset? This replaces the boxes below — your current edits will be lost.')) return;
        }
        s.diagramType=dt;
        const seed=seedDiagramNodes(dt);
        s.diagramNodes=JSON.parse(JSON.stringify(seed.nodes));
        s.diagramStyle=seed.style;
        renderEditor();renderSlide(true);
      };dw.appendChild(b);
    });
    body.appendChild(mkRow('Preset',dw));
    const hint=document.createElement('div');hint.style.cssText='font-size:10.5px;color:var(--text3);margin-bottom:6px';
    hint.textContent='Every diagram is fully editable — change any label, color or item below. Click a preset above to load fresh starter content.';
    body.appendChild(hint);
    const styleWrap=document.createElement('div');styleWrap.style.cssText='display:flex;gap:4px;flex:1';
    [['grid','Grid'],['chain','Chain'],['columns','Columns'],['layered','Layered']].forEach(([sv,lbl])=>{
      const b=document.createElement('button');b.className='lay-btn'+((s.diagramStyle||'grid')===sv?' active':'');b.textContent=lbl;
      b.onclick=()=>{s.diagramStyle=sv;renderEditor();renderSlide(true);};
      styleWrap.appendChild(b);
    });
    body.appendChild(mkRow('Arrangement',styleWrap));
    const showColumn=(s.diagramStyle||'grid')==='columns';
    const nw=document.createElement('div');nw.style.cssText='flex:1;display:flex;flex-direction:column;gap:8px';
    (s.diagramNodes||[]).forEach((nd,ni)=>{
      const card=document.createElement('div');card.style.cssText='border:1px solid var(--border);border-radius:7px;padding:7px;display:flex;flex-direction:column;gap:5px';
      const hdrRow=document.createElement('div');hdrRow.style.cssText='display:flex;gap:5px;align-items:center';
      const labelInp=document.createElement('input');labelInp.className='bullet-inp';labelInp.placeholder='Box label';labelInp.value=nd.label||'';
      labelInp.oninput=e=>{nd.label=e.target.value;renderSlide(false);};
      const colorWrap=document.createElement('div');colorWrap.style.cssText='display:flex;gap:3px';
      ACCENTS.forEach(c=>{
        const sw=document.createElement('div');sw.className='swatch'+(nd.color===c?' active':'');sw.style.cssText+='width:14px;height:14px;background:'+c;
        sw.onclick=()=>{nd.color=c;renderEditor();renderSlide(false);};
        colorWrap.appendChild(sw);
      });
      const delBtn=document.createElement('button');delBtn.className='bullet-del';delBtn.textContent='×';
      delBtn.onclick=()=>{s.diagramNodes.splice(ni,1);renderEditor();renderSlide(false);};
      hdrRow.append(labelInp,colorWrap);
      if(showColumn){
        const colInp=document.createElement('select');colInp.className='einput';colInp.style.cssText='height:26px;width:54px;padding:0 2px';
        [0,1,2].forEach(cn=>{const op=document.createElement('option');op.value=cn;op.textContent='Col '+(cn+1);if((+nd.column||0)===cn)op.selected=true;colInp.appendChild(op);});
        colInp.onchange=e=>{nd.column=+e.target.value;renderSlide(false);};
        hdrRow.appendChild(colInp);
      }
      hdrRow.appendChild(delBtn);
      card.appendChild(hdrRow);
      const itemsWrap=document.createElement('div');itemsWrap.style.cssText='display:flex;flex-direction:column;gap:2px;margin-left:4px';
      (nd.items||[]).forEach((it,ii)=>{
        const row=document.createElement('div');row.className='bullet-row';
        const inp=document.createElement('input');inp.className='bullet-inp';inp.value=it;
        inp.oninput=e=>{nd.items[ii]=e.target.value;renderSlide(false);};
        const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
        del.onclick=()=>{nd.items.splice(ii,1);renderEditor();renderSlide(false);};
        row.append(inp,del);itemsWrap.appendChild(row);
      });
      const addItemBtn=document.createElement('button');addItemBtn.className='add-bullet-btn';addItemBtn.textContent='+ item';
      addItemBtn.onclick=()=>{nd.items=nd.items||[];nd.items.push('New item');renderEditor();renderSlide(false);};
      itemsWrap.appendChild(addItemBtn);
      card.appendChild(itemsWrap);
      nw.appendChild(card);
    });
    const addBoxBtn=document.createElement('button');addBoxBtn.className='add-bullet-btn';addBoxBtn.textContent='+ Add box';
    addBoxBtn.onclick=()=>{s.diagramNodes=s.diagramNodes||[];s.diagramNodes.push({label:'New Box',color:s.accent,column:0,items:[]});renderEditor();renderSlide(false);};
    nw.appendChild(addBoxBtn);
    body.appendChild(mkRow('Boxes',nw));
  }
  if(['prediction','challenge','mystery','quiz'].includes(s.layout)){
    body.appendChild(mkRow('Question',mkInput(s.question,v=>{s.question=v;renderSlide(false);})));
  }
  if(s.layout==='prediction'){
    body.appendChild(mkRow('Answer',mkInput(s.answer,v=>{s.answer=v;renderSlide(false);})));
  }
  if(s.layout==='challenge'||s.layout==='quiz'){
    const nta=document.createElement('textarea');nta.className='einput';nta.rows=2;nta.style.cssText='width:100%;font-size:11px';
    nta.value=s.note||'';nta.oninput=e=>{s.note=e.target.value;renderSlide(false);};
    body.appendChild(mkRow(s.layout==='quiz'?'Explain':'Hint',nta));
  }
  if(s.layout==='quiz'){
    const ow=document.createElement('div');ow.style.cssText='flex:1;display:flex;flex-direction:column;gap:4px';
    (s.options||[]).forEach((o,i)=>{
      const row=document.createElement('div');row.style.cssText='display:flex;gap:4px;align-items:center';
      const correctBtn=document.createElement('button');correctBtn.className='lay-btn'+(s.correctIndex===i?' active':'');correctBtn.textContent=String.fromCharCode(65+i);correctBtn.style.flexShrink='0';
      correctBtn.onclick=()=>{s.correctIndex=i;renderEditor();renderSlide(false);};
      const inp=document.createElement('input');inp.className='bullet-inp';inp.value=o;
      inp.oninput=e=>{s.options[i]=e.target.value;renderSlide(false);};
      const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
      del.onclick=()=>{s.options.splice(i,1);if(s.correctIndex>=s.options.length)s.correctIndex=0;renderEditor();renderSlide(false);};
      row.append(correctBtn,inp,del);ow.appendChild(row);
    });
    const ab=document.createElement('button');ab.className='add-bullet-btn';ab.textContent='+ Add option';
    ab.onclick=()=>{s.options=s.options||[];s.options.push('New option');renderEditor();renderSlide(false);};
    ow.appendChild(ab);
    body.appendChild(mkRow('Options',ow));
  }
  if(s.layout==='wrong-assumption'){
    const mkChain=(label,arr,key)=>{
      const cw=document.createElement('div');cw.style.cssText='flex:1;display:flex;flex-direction:column;gap:2px';
      const hl=document.createElement('div');hl.style.cssText='font-size:10.5px;color:var(--text3);margin-bottom:4px';hl.textContent=label;
      cw.appendChild(hl);
      (arr||[]).forEach((b,i)=>{
        const row=document.createElement('div');row.className='bullet-row';
        const inp=document.createElement('input');inp.className='bullet-inp';inp.value=b;
        inp.oninput=e=>{s[key][i]=e.target.value;renderSlide(false);};
        const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
        del.onclick=()=>{s[key].splice(i,1);renderEditor();renderSlide(false);};
        row.append(inp,del);cw.appendChild(row);
      });
      const ab=document.createElement('button');ab.className='add-bullet-btn';ab.textContent='+ step';
      ab.onclick=()=>{s[key]=s[key]||[];s[key].push('New step');renderEditor();renderSlide(false);};
      cw.appendChild(ab);
      return cw;
    };
    body.appendChild(mkRow('Wrong path',mkChain('What students assume',s.wrongSteps,'wrongSteps')));
    body.appendChild(mkRow('Real path',mkChain('What actually happens',s.correctSteps,'correctSteps')));
  }
  if(s.layout==='analogy'){
    body.appendChild(mkRow('Left icon',mkInput(s.leftIcon,v=>{s.leftIcon=v;renderSlide(false);})));
    body.appendChild(mkRow('Left label',mkInput(s.leftLabel,v=>{s.leftLabel=v;renderSlide(false);})));
    body.appendChild(mkRow('Left desc',mkInput(s.leftDesc,v=>{s.leftDesc=v;renderSlide(false);})));
    body.appendChild(mkRow('Right icon',mkInput(s.rightIcon,v=>{s.rightIcon=v;renderSlide(false);})));
    body.appendChild(mkRow('Right label',mkInput(s.rightLabel,v=>{s.rightLabel=v;renderSlide(false);})));
    body.appendChild(mkRow('Right desc',mkInput(s.rightDesc,v=>{s.rightDesc=v;renderSlide(false);})));
  }
  if(s.layout==='myth-vs-reality'){
    const mta=document.createElement('textarea');mta.className='einput';mta.rows=2;mta.style.cssText='width:100%;font-size:11px';
    mta.value=s.myth||'';mta.oninput=e=>{s.myth=e.target.value;renderSlide(false);};
    body.appendChild(mkRow('Myth',mta));
  }
  if(s.layout==='hook'){
    body.appendChild(mkRow('Icon',mkInput(s.calloutIcon,v=>{s.calloutIcon=v;renderSlide(false);})));
  }
  if(s.layout==='did-you-know'){
    body.appendChild(mkRow('Icon',mkInput(s.calloutIcon,v=>{s.calloutIcon=v;renderSlide(false);})));
    const fta=document.createElement('textarea');fta.className='einput';fta.rows=2;fta.style.cssText='width:100%;font-size:11px';
    fta.value=s.fact||'';fta.oninput=e=>{s.fact=e.target.value;renderSlide(false);};
    body.appendChild(mkRow('Fact',fta));
  }
  if(s.layout==='story'){
    const nta=document.createElement('textarea');nta.className='einput';nta.rows=2;nta.style.cssText='width:100%;font-size:11px';
    nta.value=s.note||'';nta.oninput=e=>{s.note=e.target.value;renderSlide(false);};
    body.appendChild(mkRow('Mapping',nta));
  }
  if(s.layout==='problem'){
    const cta=document.createElement('textarea');cta.className='einput';cta.rows=2;cta.style.cssText='width:100%;font-size:11px';
    cta.value=s.callout||'';cta.oninput=e=>{s.callout=e.target.value;renderSlide(false);};
    body.appendChild(mkRow('Imagine...',cta));
  }
  if(s.layout==='transition'){
    body.appendChild(mkRow('Next topic',mkInput(s.nextTopic,v=>{s.nextTopic=v;renderSlide(false);})));
  }
  if(['character','process-loop','icon-grid'].includes(s.layout)){
    const showDesc=s.layout==='icon-grid';
    const cw=document.createElement('div');cw.style.cssText='flex:1;display:flex;flex-direction:column;gap:4px';
    (s.characters||[]).forEach((ch,i)=>{
      const row=document.createElement('div');row.style.cssText='display:flex;gap:4px;align-items:center';
      const ic=document.createElement('input');ic.className='bullet-inp';ic.value=ch.icon||'';ic.placeholder='icon';ic.style.width='44px';
      ic.oninput=e=>{ch.icon=e.target.value;renderSlide(false);};
      const lb=document.createElement('input');lb.className='bullet-inp';lb.value=ch.label||'';lb.placeholder='label';
      lb.oninput=e=>{ch.label=e.target.value;renderSlide(false);};
      const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
      del.onclick=()=>{s.characters.splice(i,1);renderEditor();renderSlide(false);};
      row.append(ic,lb);
      if(showDesc){
        const ds=document.createElement('input');ds.className='bullet-inp';ds.value=ch.desc||'';ds.placeholder='desc (optional)';
        ds.oninput=e=>{ch.desc=e.target.value;renderSlide(false);};
        row.appendChild(ds);
      }
      row.appendChild(del);cw.appendChild(row);
    });
    const ab=document.createElement('button');ab.className='add-bullet-btn';ab.textContent='+ item';
    ab.onclick=()=>{s.characters=s.characters||[];s.characters.push({icon:'⚙️',label:'New'});renderEditor();renderSlide(false);};
    cw.appendChild(ab);
    body.appendChild(mkRow(s.layout==='character'?'Characters':s.layout==='process-loop'?'Loop steps':'Icons',cw));
  }
  if(s.layout==='bar-chart'){
    body.appendChild(mkRow('Unit',mkInput(s.chartUnit,v=>{s.chartUnit=v;renderSlide(false);})));
    const cw=document.createElement('div');cw.style.cssText='flex:1;display:flex;flex-direction:column;gap:4px';
    (s.chartData||[]).forEach((d,i)=>{
      const row=document.createElement('div');row.style.cssText='display:flex;gap:4px;align-items:center';
      const lb=document.createElement('input');lb.className='bullet-inp';lb.value=d.label||'';lb.placeholder='label';
      lb.oninput=e=>{d.label=e.target.value;renderSlide(false);};
      const vl=document.createElement('input');vl.className='bullet-inp';vl.type='number';vl.value=d.value||0;vl.style.width='70px';vl.placeholder='value';
      vl.oninput=e=>{d.value=+e.target.value;renderSlide(false);};
      const colorWrap=document.createElement('div');colorWrap.style.cssText='display:flex;gap:3px';
      ACCENTS.forEach(cc=>{
        const sw=document.createElement('div');sw.className='swatch'+(d.color===cc?' active':'');sw.style.cssText+='width:14px;height:14px;background:'+cc;
        sw.onclick=()=>{d.color=cc;renderEditor();renderSlide(false);};
        colorWrap.appendChild(sw);
      });
      const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
      del.onclick=()=>{s.chartData.splice(i,1);renderEditor();renderSlide(false);};
      row.append(lb,vl,colorWrap,del);cw.appendChild(row);
    });
    const ab=document.createElement('button');ab.className='add-bullet-btn';ab.textContent='+ bar';
    ab.onclick=()=>{s.chartData=s.chartData||[];s.chartData.push({label:'New',value:50,color:s.accent});renderEditor();renderSlide(false);};
    cw.appendChild(ab);
    body.appendChild(mkRow('Bars',cw));
  }
  if(s.layout==='venn'){
    body.appendChild(mkRow('Circle A',mkInput(s.leftLabel,v=>{s.leftLabel=v;renderSlide(false);})));
    body.appendChild(mkRow('Circle B',mkInput(s.rightLabel,v=>{s.rightLabel=v;renderSlide(false);})));
    const mkList=(label,arr,key)=>{
      const cw=document.createElement('div');cw.style.cssText='flex:1;display:flex;flex-direction:column;gap:2px';
      const hl=document.createElement('div');hl.style.cssText='font-size:10.5px;color:var(--text3);margin-bottom:4px';hl.textContent=label;
      cw.appendChild(hl);
      (arr||[]).forEach((b,i)=>{
        const row=document.createElement('div');row.className='bullet-row';
        const inp=document.createElement('input');inp.className='bullet-inp';inp.value=b;
        inp.oninput=e=>{s[key][i]=e.target.value;renderSlide(false);};
        const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
        del.onclick=()=>{s[key].splice(i,1);renderEditor();renderSlide(false);};
        row.append(inp,del);cw.appendChild(row);
      });
      const ab=document.createElement('button');ab.className='add-bullet-btn';ab.textContent='+ item';
      ab.onclick=()=>{s[key]=s[key]||[];s[key].push('New');renderEditor();renderSlide(false);};
      cw.appendChild(ab);
      return cw;
    };
    body.appendChild(mkRow('Only A',mkList('Unique to A',s.leftBullets,'leftBullets')));
    body.appendChild(mkRow('Only B',mkList('Unique to B',s.rightBullets,'rightBullets')));
  }
  if(s.layout==='spectrum'){
    body.appendChild(mkRow('Left end',mkInput(s.leftLabel,v=>{s.leftLabel=v;renderSlide(false);})));
    body.appendChild(mkRow('Right end',mkInput(s.rightLabel,v=>{s.rightLabel=v;renderSlide(false);})));
    body.appendChild(mkRow('Marker text',mkInput(s.spectrumLabel,v=>{s.spectrumLabel=v;renderSlide(false);})));
    const rw=document.createElement('div');rw.style.cssText='display:flex;gap:7px;align-items:center;flex:1';
    const range=document.createElement('input');range.type='range';range.min='0';range.max='100';range.value=s.spectrumPos||50;range.style.cssText='flex:1;accent-color:var(--accent)';
    const val=document.createElement('span');val.style.cssText='font-size:11px;color:var(--text3);min-width:28px';val.textContent=s.spectrumPos||50;
    range.oninput=e=>{s.spectrumPos=+e.target.value;val.textContent=e.target.value;renderSlide(false);};
    rw.append(range,val);
    body.appendChild(mkRow('Position',rw));
  }
  if(s.layout==='quote'){
    body.appendChild(mkRow('Quote',mkInput(s.quote,v=>{s.quote=v;renderSlide(false);})));
    body.appendChild(mkRow('Author',mkInput(s.author,v=>{s.author=v;renderSlide(false);})));
  }
  if(s.layout==='callout'){
    body.appendChild(mkRow('Icon',mkInput(s.calloutIcon,v=>{s.calloutIcon=v;renderSlide(false);})));
    const cta=document.createElement('textarea');cta.className='einput';cta.rows=3;cta.style.cssText='width:100%;font-size:11px';
    cta.value=s.callout||'';cta.oninput=e=>{s.callout=e.target.value;renderSlide(false);};
    body.appendChild(mkRow('Callout',cta));
    const nta=document.createElement('textarea');nta.className='einput';nta.rows=2;nta.style.cssText='width:100%;font-size:11px';
    nta.value=s.note||'';nta.oninput=e=>{s.note=e.target.value;renderSlide(false);};
    body.appendChild(mkRow('Note',nta));
  }
  if(s.layout==='stats'){
    const sw=document.createElement('div');sw.style.cssText='flex:1;display:flex;flex-direction:column;gap:4px';
    (s.stats||[]).forEach((st,i)=>{
      const row=document.createElement('div');row.style.cssText='display:flex;gap:4px;align-items:center';
      const vi=document.createElement('input');vi.className='bullet-inp';vi.value=st.value||'';vi.placeholder='value';vi.style.width='80px';
      vi.oninput=e=>{s.stats[i].value=e.target.value;renderSlide(false);};
      const li=document.createElement('input');li.className='bullet-inp';li.value=st.label||'';li.placeholder='label';
      li.oninput=e=>{s.stats[i].label=e.target.value;renderSlide(false);};
      const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
      del.onclick=()=>{s.stats.splice(i,1);renderEditor();renderSlide(false);};
      row.append(vi,li,del);sw.appendChild(row);
    });
    const ab=document.createElement('button');ab.className='add-bullet-btn';ab.textContent='+ Add stat';
    ab.onclick=()=>{s.stats.push({value:'',label:'',color:s.accent});renderEditor();renderSlide(false);};
    sw.appendChild(ab);
    body.appendChild(mkRow('Stats',sw));
  }
  if(s.layout==='two-col'){
    body.appendChild(mkRow('Left hdr',mkInput(s.leftLabel,v=>{s.leftLabel=v;renderSlide(false);})));
    body.appendChild(mkRow('Right hdr',mkInput(s.rightLabel,v=>{s.rightLabel=v;renderSlide(false);})));
  }
  if(s.layout==='two-col'){
    // left column bullets
    const lw=document.createElement('div');lw.style.cssText='flex:1;display:flex;flex-direction:column;gap:2px';
    const llbl=document.createElement('div');llbl.style.cssText='font-size:10.5px;color:var(--text3);margin-bottom:5px';llbl.textContent='Left column bullets';
    lw.appendChild(llbl);
    (s.leftBullets||[]).forEach((b,i)=>{
      const row=document.createElement('div');row.className='bullet-row';
      const inp=document.createElement('input');inp.className='bullet-inp';inp.value=b;
      inp.oninput=e=>{s.leftBullets[i]=e.target.value;renderSlide(false);};
      const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
      del.onclick=()=>{s.leftBullets.splice(i,1);renderEditor();renderSlide(false);};
      row.append(inp,del);lw.appendChild(row);
    });
    const lab=document.createElement('button');lab.className='add-bullet-btn';lab.textContent='+ Left';
    lab.onclick=()=>{s.leftBullets.push('New point');renderEditor();renderSlide(false);};
    lw.appendChild(lab);
    const rw=document.createElement('div');rw.style.cssText='flex:1;display:flex;flex-direction:column;gap:2px;margin-top:8px';
    const rlbl=document.createElement('div');rlbl.style.cssText='font-size:10.5px;color:var(--text3);margin-bottom:5px';rlbl.textContent='Right column bullets';
    rw.appendChild(rlbl);
    (s.rightBullets||[]).forEach((b,i)=>{
      const row=document.createElement('div');row.className='bullet-row';
      const inp=document.createElement('input');inp.className='bullet-inp';inp.value=b;
      inp.oninput=e=>{s.rightBullets[i]=e.target.value;renderSlide(false);};
      const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
      del.onclick=()=>{s.rightBullets.splice(i,1);renderEditor();renderSlide(false);};
      row.append(inp,del);rw.appendChild(row);
    });
    const rab=document.createElement('button');rab.className='add-bullet-btn';rab.textContent='+ Right';
    rab.onclick=()=>{s.rightBullets.push('New point');renderEditor();renderSlide(false);};
    rw.appendChild(rab);
    body.append(lw,rw); return;
  }
  if(s.layout==='compare'){
    body.appendChild(mkRow('Left lbl',mkInput(s.leftLabel,v=>{s.leftLabel=v;renderSlide(false);})));
    body.appendChild(mkRow('Right lbl',mkInput(s.rightLabel,v=>{s.rightLabel=v;renderSlide(false);})));
  }
  if(s.layout==='image-text'){
    body.appendChild(mkRow('Image',mkImageRow(s,()=>renderSlide(false))));
    body.appendChild(mkRow('Caption',mkInput(s.imageCaption,v=>{s.imageCaption=v;renderSlide(false);})));
    const posWrap=document.createElement('div');posWrap.style.cssText='display:flex;gap:4px;flex:1';
    ['left','right'].forEach(pos=>{
      const b=document.createElement('button');b.className='lay-btn'+(s.imagePosition===pos?' active':'');b.textContent='Image '+pos;
      b.onclick=()=>{s.imagePosition=pos;renderEditor();renderSlide(false);};
      posWrap.appendChild(b);
    });
    body.appendChild(mkRow('Img side',posWrap));
  }
  if(s.layout==='image-full'){
    body.appendChild(mkRow('Image',mkImageRow(s,()=>renderSlide(false))));
    body.appendChild(mkRow('Caption',mkInput(s.imageCaption,v=>{s.imageCaption=v;renderSlide(false);})));
  }
  if(s.layout==='concept-map'){
    const hint=document.createElement('div');hint.style.cssText='font-size:10.5px;color:var(--text3);margin-bottom:6px';
    hint.textContent='Each bullet = a concept node around the center (title).';
    body.appendChild(hint);
  }
  if(['bullets','split','timeline','callout','image-text','concept-map','problem','story','journey','mystery','myth-vs-reality','common-mistake','memory-trick','summary','transition','stack-visual','venn','bento-grid','glass-fan','3d-carousel'].includes(s.layout)){
    const bw=document.createElement('div');bw.style.cssText='flex:1;display:flex;flex-direction:column;gap:2px';
    (s.bullets||[]).forEach((b,i)=>{
      const row=document.createElement('div');row.className='bullet-row';
      const inp=document.createElement('input');inp.className='bullet-inp';inp.value=b;
      inp.oninput=e=>{s.bullets[i]=e.target.value;renderSlide(false);};
      const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
      del.onclick=()=>{s.bullets.splice(i,1);renderEditor();renderSlide(false);};
      row.append(inp,del);bw.appendChild(row);
    });
    const ab=document.createElement('button');ab.className='add-bullet-btn';ab.textContent='+ Add point';
    ab.onclick=()=>{s.bullets.push('New point');renderEditor();renderSlide(false);};
    bw.appendChild(ab);
    body.appendChild(mkRow('Points',bw));
  }

  
  // ─── STANDARD MOTION GRAPHIC LAYOUT EDITORS ───
  if(s.layout==='object-breakdown'){
    body.appendChild(mkRow('Icon', mkInput(s.icon||'dog', v=>{s.icon=v;renderSlide(false);})));
    
    // Properties list
    const pw = document.createElement('div'); pw.style.cssText='flex:1;display:flex;flex-direction:column;gap:4px';
    const plbl = document.createElement('div'); plbl.style.cssText='font-size:10.5px;color:var(--text3);margin-bottom:2px'; plbl.textContent='State / Properties (key = val)';
    pw.appendChild(plbl);
    (s.properties||[]).forEach((p, i)=>{
      const row = document.createElement('div'); row.style.cssText='display:flex;gap:4px;align-items:center';
      const ki = document.createElement('input'); ki.className='bullet-inp'; ki.value=p.key||''; ki.placeholder='key'; ki.style.width='90px';
      ki.oninput = e => { p.key = e.target.value; renderSlide(false); };
      const vi = document.createElement('input'); vi.className='bullet-inp'; vi.value=p.val||''; vi.placeholder='value';
      vi.oninput = e => { p.val = e.target.value; renderSlide(false); };
      const del = document.createElement('button'); del.className='bullet-del'; del.textContent='×';
      del.onclick = () => { s.properties.splice(i, 1); renderEditor(); renderSlide(false); };
      row.append(ki, vi, del); pw.appendChild(row);
    });
    const addProp = document.createElement('button'); addProp.className='add-bullet-btn'; addProp.textContent='+ Property';
    addProp.onclick = () => { s.properties = s.properties || []; s.properties.push({key:'key', val:'"val"'}); renderEditor(); renderSlide(false); };
    pw.appendChild(addProp);
    body.appendChild(mkRow('Properties', pw));

    // Behaviors list
    const bw = document.createElement('div'); bw.style.cssText='flex:1;display:flex;flex-direction:column;gap:4px;margin-top:6px';
    const blbl = document.createElement('div'); blbl.style.cssText='font-size:10.5px;color:var(--text3);margin-bottom:2px'; blbl.textContent='Methods / Behaviors (method -> result)';
    bw.appendChild(blbl);
    (s.behaviors||[]).forEach((b, i)=>{
      const row = document.createElement('div'); row.style.cssText='display:flex;gap:4px;align-items:center';
      const mi = document.createElement('input'); mi.className='bullet-inp'; mi.value=b.method||''; mi.placeholder='method()'; mi.style.width='110px';
      mi.oninput = e => { b.method = e.target.value; renderSlide(false); };
      const ri = document.createElement('input'); ri.className='bullet-inp'; ri.value=b.result||''; ri.placeholder='result';
      ri.oninput = e => { b.result = e.target.value; renderSlide(false); };
      const del = document.createElement('button'); del.className='bullet-del'; del.textContent='×';
      del.onclick = () => { s.behaviors.splice(i, 1); renderEditor(); renderSlide(false); };
      row.append(mi, ri, del); bw.appendChild(row);
    });
    const addBeh = document.createElement('button'); addBeh.className='add-bullet-btn'; addBeh.textContent='+ Behavior';
    addBeh.onclick = () => { s.behaviors = s.behaviors || []; s.behaviors.push({method:'bark()', result:'"Woof!"'}); renderEditor(); renderSlide(false); };
    bw.appendChild(addBeh);
    body.appendChild(mkRow('Behaviors', bw));
  }

  if(s.layout==='object-grid'){
    const cw = document.createElement('div'); cw.style.cssText='flex:1;display:flex;flex-direction:column;gap:6px';
    (s.cards||[]).forEach((card, i)=>{
      const row = document.createElement('div'); row.style.cssText='display:flex;gap:4px;align-items:center';
      const ti = document.createElement('input'); ti.className='bullet-inp'; ti.value=card.title||''; ti.placeholder='Card Title'; ti.style.width='110px';
      ti.oninput = e => { card.title = e.target.value; renderSlide(false); };
      const ii = document.createElement('input'); ii.className='bullet-inp'; ii.value=card.icon||''; ii.placeholder='icon (car/atm/dog)'; ii.style.width='70px';
      ii.oninput = e => { card.icon = e.target.value; renderSlide(false); };
      const del = document.createElement('button'); del.className='bullet-del'; del.textContent='×';
      del.onclick = () => { s.cards.splice(i, 1); renderEditor(); renderSlide(false); };
      row.append(ti, ii, del); cw.appendChild(row);
    });
    const addCard = document.createElement('button'); addCard.className='add-bullet-btn'; addCard.textContent='+ Card';
    addCard.onclick = () => { s.cards = s.cards || []; s.cards.push({title:'Object Card', icon:'car', color:s.accent, props:[{key:'field', val:'value'}]}); renderEditor(); renderSlide(false); };
    cw.appendChild(addCard);
    body.appendChild(mkRow('Cards', cw));
  }

  if(s.layout==='assembly-line'){
    body.appendChild(mkRow('Callout', mkInput(s.callout||'', v=>{s.callout=v;renderSlide(false);})));
    const sw = document.createElement('div'); sw.style.cssText='flex:1;display:flex;flex-direction:column;gap:6px';
    (s.stations||[]).forEach((st, i)=>{
      const row = document.createElement('div'); row.style.cssText='display:flex;gap:4px;align-items:center';
      const li = document.createElement('input'); li.className='bullet-inp'; li.value=st.label||''; li.placeholder='Label'; ti.style.width='110px';
      li.oninput = e => { st.label = e.target.value; renderSlide(false); };
      const ai = document.createElement('input'); ai.className='bullet-inp'; ai.value=st.action||''; ai.placeholder='action()';
      ai.oninput = e => { st.action = e.target.value; renderSlide(false); };
      const del = document.createElement('button'); del.className='bullet-del'; del.textContent='×';
      del.onclick = () => { s.stations.splice(i, 1); renderEditor(); renderSlide(false); };
      row.append(li, ai, del); sw.appendChild(row);
    });
    const addSt = document.createElement('button'); addSt.className='add-bullet-btn'; addSt.textContent='+ Station';
    addSt.onclick = () => { s.stations = s.stations || []; s.stations.push({label:'Step X', icon:'gear', action:'process()', color:s.accent}); renderEditor(); renderSlide(false); };
    sw.appendChild(addSt);
    body.appendChild(mkRow('Stations', sw));
  }

  if(s.layout==='domino-effect'){
    const dw = document.createElement('div'); dw.style.cssText='flex:1;display:flex;flex-direction:column;gap:6px';
    (s.dominoes||[]).forEach((d, i)=>{
      const row = document.createElement('div'); row.style.cssText='display:flex;gap:4px;align-items:center';
      const fi = document.createElement('input'); fi.className='bullet-inp'; fi.value=d.fnName||''; fi.placeholder='fnName()'; fi.style.width='100px';
      fi.oninput = e => { d.fnName = e.target.value; renderSlide(false); };
      const ti = document.createElement('input'); ti.className='bullet-inp'; ti.value=d.text||''; ti.placeholder='Description';
      ti.oninput = e => { d.text = e.target.value; renderSlide(false); };
      const del = document.createElement('button'); del.className='bullet-del'; del.textContent='×';
      del.onclick = () => { s.dominoes.splice(i, 1); renderEditor(); renderSlide(false); };
      row.append(fi, ti, del); dw.appendChild(row);
    });
    const addDom = document.createElement('button'); addDom.className='add-bullet-btn'; addDom.textContent='+ Domino';
    addDom.onclick = () => { s.dominoes = s.dominoes || []; s.dominoes.push({fnName:'fn()', text:'Description', isBroken:false}); renderEditor(); renderSlide(false); };
    dw.appendChild(addDom);
    body.appendChild(mkRow('Dominoes', dw));
  }

  if(s.layout==='blueprint-houses'){
    body.appendChild(mkRow('Blueprint', mkInput(s.blueprintTitle||'', v=>{s.blueprintTitle=v;renderSlide(false);})));
    const iw = document.createElement('div'); iw.style.cssText='flex:1;display:flex;flex-direction:column;gap:6px';
    (s.instances||[]).forEach((inst, i)=>{
      const row = document.createElement('div'); row.style.cssText='display:flex;gap:4px;align-items:center';
      const ni = document.createElement('input'); ni.className='bullet-inp'; ni.value=inst.name||''; ni.placeholder='House Name'; ni.style.width='90px';
      ni.oninput = e => { inst.name = e.target.value; renderSlide(false); };
      const ai = document.createElement('input'); ai.className='bullet-inp'; ai.value=inst.address||''; ai.placeholder='@0x101';
      ai.oninput = e => { inst.address = e.target.value; renderSlide(false); };
      const del = document.createElement('button'); del.className='bullet-del'; del.textContent='×';
      del.onclick = () => { s.instances.splice(i, 1); renderEditor(); renderSlide(false); };
      row.append(ni, ai, del); iw.appendChild(row);
    });
    const addInst = document.createElement('button'); addInst.className='add-bullet-btn'; addInst.textContent='+ Instance';
    addInst.onclick = () => { s.instances = s.instances || []; s.instances.push({name:'houseX', address:'@0x100', color:s.accent}); renderEditor(); renderSlide(false); };
    iw.appendChild(addInst);
    body.appendChild(mkRow('Instances', iw));
  }

  if(s.layout==='pillars-rising'){
    const pw = document.createElement('div'); pw.style.cssText='flex:1;display:flex;flex-direction:column;gap:6px';
    (s.pillars||[]).forEach((p, i)=>{
      const row = document.createElement('div'); row.style.cssText='display:flex;gap:4px;align-items:center';
      const ni = document.createElement('input'); ni.className='bullet-inp'; ni.value=p.name||''; ni.placeholder='Pillar Name'; ni.style.width='110px';
      ni.oninput = e => { p.name = e.target.value; renderSlide(false); };
      const ii = document.createElement('input'); ii.className='bullet-inp'; ii.value=p.icon||''; ii.placeholder='icon (mask/capsule/tree/chameleon)'; ii.style.width='70px';
      ii.oninput = e => { p.icon = e.target.value; renderSlide(false); };
      const di = document.createElement('input'); di.className='bullet-inp'; di.value=p.desc||''; di.placeholder='Description';
      di.oninput = e => { p.desc = e.target.value; renderSlide(false); };
      const del = document.createElement('button'); del.className='bullet-del'; del.textContent='×';
      del.onclick = () => { s.pillars.splice(i, 1); renderEditor(); renderSlide(false); };
      row.append(ni, ii, di, del); pw.appendChild(row);
    });
    const addPillar = document.createElement('button'); addPillar.className='add-bullet-btn'; addPillar.textContent='+ Pillar';
    addPillar.onclick = () => { s.pillars = s.pillars || []; s.pillars.push({name:'Pillar', icon:'mask', desc:'Description', color:s.accent}); renderEditor(); renderSlide(false); };
    pw.appendChild(addPillar);
    body.appendChild(mkRow('Pillars', pw));
  }

  if(s.layout==='access-circles'){
    const lw = document.createElement('div'); lw.style.cssText='flex:1;display:flex;flex-direction:column;gap:6px';
    (s.levels||[]).forEach((lvl, i)=>{
      const row = document.createElement('div'); row.style.cssText='display:flex;gap:4px;align-items:center';
      const li = document.createElement('input'); li.className='bullet-inp'; li.value=lvl.level||''; li.placeholder='public'; li.style.width='90px';
      li.oninput = e => { lvl.level = e.target.value; renderSlide(false); };
      const di = document.createElement('input'); di.className='bullet-inp'; di.value=lvl.desc||''; di.placeholder='Description';
      di.oninput = e => { lvl.desc = e.target.value; renderSlide(false); };
      const del = document.createElement('button'); del.className='bullet-del'; del.textContent='×';
      del.onclick = () => { s.levels.splice(i, 1); renderEditor(); renderSlide(false); };
      row.append(li, di, del); lw.appendChild(row);
    });
    const addLvl = document.createElement('button'); addLvl.className='add-bullet-btn'; addLvl.textContent='+ Level';
    addLvl.onclick = () => { s.levels = s.levels || []; s.levels.push({level:'private', desc:'Description', color:s.accent}); renderEditor(); renderSlide(false); };
    lw.appendChild(addLvl);
    body.appendChild(mkRow('Privacy Scopes', lw));
  }

  if(s.layout==='matrix-compare'){
    body.appendChild(mkRow('Col 1 Header', mkInput(s.col1Header||'', v=>{s.col1Header=v;renderSlide(false);})));
    body.appendChild(mkRow('Col 2 Header', mkInput(s.col2Header||'', v=>{s.col2Header=v;renderSlide(false);})));
    const rw = document.createElement('div'); rw.style.cssText='flex:1;display:flex;flex-direction:column;gap:6px';
    (s.rows||[]).forEach((r, i)=>{
      const row = document.createElement('div'); row.style.cssText='display:flex;gap:4px;align-items:center';
      const fi = document.createElement('input'); fi.className='bullet-inp'; fi.value=r.feature||''; fi.placeholder='Feature'; fi.style.width='90px';
      fi.oninput = e => { r.feature = e.target.value; renderSlide(false); };
      const v1 = document.createElement('input'); v1.className='bullet-inp'; v1.value=r.val1||''; v1.placeholder='Value 1';
      v1.oninput = e => { r.val1 = e.target.value; renderSlide(false); };
      const v2 = document.createElement('input'); v2.className='bullet-inp'; v2.value=r.val2||''; v2.placeholder='Value 2';
      v2.oninput = e => { r.val2 = e.target.value; renderSlide(false); };
      const del = document.createElement('button'); del.className='bullet-del'; del.textContent='×';
      del.onclick = () => { s.rows.splice(i, 1); renderEditor(); renderSlide(false); };
      row.append(fi, v1, v2, del); rw.appendChild(row);
    });
    const addRow = document.createElement('button'); addRow.className='add-bullet-btn'; addRow.textContent='+ Feature Row';
    addRow.onclick = () => { s.rows = s.rows || []; s.rows.push({feature:'Feature', val1:'Val A', val2:'Val B'}); renderEditor(); renderSlide(false); };
    rw.appendChild(addRow);
    body.appendChild(mkRow('Rows', rw));
  }

  if(s.layout==='solid-summary'){
    const pw = document.createElement('div'); pw.style.cssText='flex:1;display:flex;flex-direction:column;gap:6px';
    (s.principles||[]).forEach((p, i)=>{
      const row = document.createElement('div'); row.style.cssText='display:flex;gap:4px;align-items:center';
      const li = document.createElement('input'); li.className='bullet-inp'; li.value=p.letter||''; li.placeholder='S'; li.style.width='36px';
      li.oninput = e => { p.letter = e.target.value; renderSlide(false); };
      const ni = document.createElement('input'); ni.className='bullet-inp'; ni.value=p.name||''; ni.placeholder='Principle Name'; ni.style.width='140px';
      ni.oninput = e => { p.name = e.target.value; renderSlide(false); };
      const di = document.createElement('input'); di.className='bullet-inp'; di.value=p.desc||''; di.placeholder='Description';
      di.oninput = e => { p.desc = e.target.value; renderSlide(false); };
      const del = document.createElement('button'); del.className='bullet-del'; del.textContent='×';
      del.onclick = () => { s.principles.splice(i, 1); renderEditor(); renderSlide(false); };
      row.append(li, ni, di, del); pw.appendChild(row);
    });
    const addPrinc = document.createElement('button'); addPrinc.className='add-bullet-btn'; addPrinc.textContent='+ Principle';
    addPrinc.onclick = () => { s.principles = s.principles || []; s.principles.push({letter:'S', name:'Single Responsibility', desc:'A class should have one reason to change', color:s.accent}); renderEditor(); renderSlide(false); };
    pw.appendChild(addPrinc);
    body.appendChild(mkRow('Principles', pw));
  }

}