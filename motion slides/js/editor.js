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
  if(s.layout==='custom-html'){
    const htmlLbl=document.createElement('div');htmlLbl.style.cssText='font-size:10.5px;color:var(--text3);margin:5px 0 3px';htmlLbl.textContent='Custom HTML';
    const hta=document.createElement('textarea');hta.className='einput';hta.rows=7;hta.style.cssText='width:100%;font-size:11px;line-height:1.4;font-family:"JetBrains Mono",monospace;white-space:pre;overflow:auto';
    hta.value=s.customHtml||'<div style="color:#e8eaf6; text-align:center; padding: 40px;">\n  <h1>My Custom Slide</h1>\n  <p>Write your HTML here!</p>\n</div>';
    if(!s.customHtml) s.customHtml = hta.value;
    hta.oninput=e=>{s.customHtml=e.target.value;renderSlide(false);};
    const cssLbl=document.createElement('div');cssLbl.style.cssText='font-size:10.5px;color:var(--text3);margin:8px 0 3px';cssLbl.textContent='Custom CSS';
    const cta=document.createElement('textarea');cta.className='einput';cta.rows=5;cta.style.cssText='width:100%;font-size:11px;line-height:1.4;font-family:"JetBrains Mono",monospace;white-space:pre;overflow:auto';
    cta.value=s.customCss||'';
    cta.oninput=e=>{s.customCss=e.target.value;renderSlide(false);};
    body.append(htmlLbl,hta,cssLbl,cta);
  }
}
function renderCodeTab(s,body){
  const lbl=document.createElement('div');lbl.style.cssText='font-size:10.5px;color:var(--text3);margin-bottom:5px';
  if(s.layout==='compare') lbl.textContent='Left code panel';else lbl.textContent='Code (code / split layouts)';
  const ta=document.createElement('textarea');ta.className='einput';ta.rows=5;ta.style.cssText='width:100%;font-size:11px;line-height:1.5';
  ta.value=(s.layout==='compare'?s.leftCode:s.code)||'';
  ta.oninput=e=>{if(s.layout==='compare')s.leftCode=e.target.value;else s.code=e.target.value;renderSlide(false);updateSidebar();};
  body.append(lbl,ta);
  if(s.layout==='compare'){
    const lbl2=document.createElement('div');lbl2.style.cssText='font-size:10.5px;color:var(--text3);margin:7px 0 5px';lbl2.textContent='Right code panel';
    const ta2=document.createElement('textarea');ta2.className='einput';ta2.rows=5;ta2.style.cssText='width:100%;font-size:11px;line-height:1.5';
    ta2.value=s.rightCode||'';
    ta2.oninput=e=>{s.rightCode=e.target.value;renderSlide(false);updateSidebar();};
    body.append(lbl2,ta2);
  }
}
function renderAnimTab(s,body){
  const lbl=document.createElement('div');lbl.style.cssText='font-size:10.5px;color:var(--text3)';lbl.textContent='Slide entrance animation';
  const btns=document.createElement('div');btns.style.cssText='display:flex;gap:5px;flex-wrap:wrap;margin-top:6px';
  ANIMS.forEach(a=>{
    const b=document.createElement('button');b.className='lay-btn'+(s.anim===a?' active':'');b.textContent=a;
    b.onclick=()=>{s.anim=a;renderEditor();renderSlide(true);};btns.appendChild(b);
  });
  const hint=document.createElement('div');hint.style.cssText='font-size:10.5px;color:var(--text3);margin-top:8px';
  hint.textContent='Bullets/code reveal one by one with → or Space during presentation.';
  body.append(lbl,btns,hint);
}
function renderManageTab(s,body){
  const dup=document.createElement('button');dup.className='tb-btn';dup.textContent='⧉ Duplicate slide';
  dup.onclick=()=>{const c2=JSON.parse(JSON.stringify(s));c2._ann=null;slides.splice(cur+1,0,c2);goSlide(cur+1);updateSidebar();renderEditor();};
  const del=document.createElement('button');del.className='tb-btn danger';del.textContent='✕ Delete slide';
  del.onclick=()=>{if(slides.length===1){alert('Cannot delete the last slide.');return;}slides.splice(cur,1);goSlide(Math.max(0,cur-1));updateSidebar();renderEditor();};
  const up=document.createElement('button');up.className='tb-btn';up.textContent='↑ Move up';
  up.onclick=()=>{if(cur>0){const t=[slides[cur],slides[cur-1]];slides[cur]=t[1];slides[cur-1]=t[0];goSlide(cur-1);updateSidebar();}};
  const dn=document.createElement('button');dn.className='tb-btn';dn.textContent='↓ Move down';
  dn.onclick=()=>{if(cur<slides.length-1){const t=[slides[cur],slides[cur+1]];slides[cur]=t[1];slides[cur+1]=t[0];goSlide(cur+1);updateSidebar();}};
  const bgRow=document.createElement('div');bgRow.style.cssText='display:flex;gap:7px;align-items:center;margin-top:4px';
  bgRow.innerHTML='<span style="font-size:10.5px;color:var(--text3)">Bg color</span>';
  const bgInp=document.createElement('input');bgInp.type='color';bgInp.value=s.bg||'#0b0d14';
  bgInp.style.cssText='width:34px;height:24px;border-radius:4px;border:1px solid var(--border);background:transparent;cursor:pointer';
  bgInp.oninput=e=>{s.bg=e.target.value;renderSlide(false);updateSidebar();};
  bgRow.appendChild(bgInp);
  body.append(dup,up,dn,del,bgRow);
}

// ═══ JSON IMPORT / EXPORT ═════════════════════════════════════════════════
function slidesToJson(){
  return slides.map(s=>{
    const o={layout:s.layout,title:s.title||'',subtitle:s.subtitle||'',accent:s.accent||'#7c8cf8',bg:s.bg||'#0b0d14',anim:s.anim||'fade-up'};
    if(s.bullets&&s.bullets.length) o.bullets=[...s.bullets];
    if(s.code) o.code=s.code;
    if(s.diagramType) o.diagramType=s.diagramType;
    if(s.diagramStyle) o.diagramStyle=s.diagramStyle;
    if(s.titleStyle) o.titleStyle=s.titleStyle;
    if(s.diagramNodes&&s.diagramNodes.length) o.diagramNodes=s.diagramNodes;
    if(s.leftLabel) o.leftLabel=s.leftLabel;
    if(s.leftCode) o.leftCode=s.leftCode;
    if(s.rightLabel) o.rightLabel=s.rightLabel;
    if(s.rightCode) o.rightCode=s.rightCode;
    if(s.quote) o.quote=s.quote;
    if(s.author) o.author=s.author;
    if(s.stats&&s.stats.length) o.stats=s.stats;
    if(s.callout) o.callout=s.callout;
    if(s.calloutIcon) o.calloutIcon=s.calloutIcon;
    if(s.note) o.note=s.note;
    if(s.leftBullets&&s.leftBullets.length) o.leftBullets=s.leftBullets;
    if(s.rightBullets&&s.rightBullets.length) o.rightBullets=s.rightBullets;
    if(s.imageUrl) o.imageUrl=s.imageUrl;
    if(s.imagePosition) o.imagePosition=s.imagePosition;
    if(s.imageCaption) o.imageCaption=s.imageCaption;
    if(s.role) o.role=s.role;
    if(s.question) o.question=s.question;
    if(s.answer) o.answer=s.answer;
    if(s.options&&s.options.length){o.options=s.options;o.correctIndex=s.correctIndex||0;}
    if(s.wrongSteps&&s.wrongSteps.length) o.wrongSteps=s.wrongSteps;
    if(s.correctSteps&&s.correctSteps.length) o.correctSteps=s.correctSteps;
    if(s.layout==='analogy'){o.leftIcon=s.leftIcon;o.rightIcon=s.rightIcon;o.leftDesc=s.leftDesc;o.rightDesc=s.rightDesc;}
    if(s.myth) o.myth=s.myth;
    if(s.characters&&s.characters.length) o.characters=s.characters;
    if(s.fact) o.fact=s.fact;
    if(s.nextTopic) o.nextTopic=s.nextTopic;
    if(s.chartData&&s.chartData.length){o.chartData=s.chartData;if(s.chartUnit)o.chartUnit=s.chartUnit;}
    if(s.layout==='spectrum'){o.spectrumPos=s.spectrumPos;if(s.spectrumLabel)o.spectrumLabel=s.spectrumLabel;}
    if(s.customHtml) o.customHtml=s.customHtml;
    if(s.customCss) o.customCss=s.customCss;
    return o;
  });
}

// ═══ PROJECT MANAGEMENT (LocalStorage) ════════════════════════════════════
const STORAGE_KEY = 'motion_slides_projects';

function getProjects() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function renderProjectList() {
  const list = document.getElementById('projects-list');
  list.innerHTML = '';
  const projects = getProjects();
  const keys = Object.keys(projects).sort((a,b) => projects[b].updatedAt - projects[a].updatedAt);
  
  if (keys.length === 0) {
    list.innerHTML = '<div style="color:var(--text3);font-size:11.5px;padding:10px 0;">No saved projects yet.</div>';
    return;
  }
  
  keys.forEach(name => {
    const p = projects[name];
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--bg3);border:1px solid var(--border);border-radius:6px;';
    
    const info = document.createElement('div');
    const title = document.createElement('div');
    title.style.cssText = 'font-weight:600;font-size:13px;color:var(--text);margin-bottom:3px;';
    title.textContent = name;
    
    const meta = document.createElement('div');
    meta.style.cssText = 'font-size:10px;color:var(--text3);';
    const date = new Date(p.updatedAt).toLocaleString();
    meta.textContent = `${p.slideCount} slides • Last saved: ${date}`;
    
    info.append(title, meta);
    
    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:5px;';
    
    const loadBtn = document.createElement('button');
    loadBtn.className = 'tb-btn primary';
    loadBtn.textContent = 'Load';
    loadBtn.onclick = () => {
      if(confirm(`Load project "${name}"? Your current unsaved changes will be lost.`)) {
        try {
          slides = parseSlides(JSON.stringify(p.data));
          cur = 0;
          renderSlide(true);
          updateSidebar();
          renderEditor();
          document.getElementById('projects-modal').classList.remove('open');
        } catch(e) {
          alert('Failed to load project: ' + e.message);
        }
      }
    };
    
    const delBtn = document.createElement('button');
    delBtn.className = 'tb-btn danger';
    delBtn.textContent = '✕';
    delBtn.onclick = () => {
      if(confirm(`Delete project "${name}" permanently?`)) {
        const projs = getProjects();
        delete projs[name];
        saveProjects(projs);
        renderProjectList();
      }
    };
    
    actions.append(loadBtn, delBtn);
    row.append(info, actions);
    list.appendChild(row);
  });
}

document.getElementById('projects-btn').onclick = () => {
  renderProjectList();
  document.getElementById('project-name-input').value = slides[0].title || 'Untitled Presentation';
  document.getElementById('projects-modal').classList.add('open');
};

document.getElementById('projects-close').onclick = () => {
  document.getElementById('projects-modal').classList.remove('open');
};

document.getElementById('projects-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('projects-modal')) {
    document.getElementById('projects-modal').classList.remove('open');
  }
});

document.getElementById('save-project-btn').onclick = () => {
  const name = document.getElementById('project-name-input').value.trim();
  if (!name) return alert('Please enter a project name.');
  
  const projects = getProjects();
  if (projects[name] && !confirm(`Overwrite existing project "${name}"?`)) {
    return;
  }
  
  projects[name] = {
    updatedAt: Date.now(),
    slideCount: slides.length,
    data: slidesToJson()
  };
  
  saveProjects(projects);
  renderProjectList();
  
  const btn = document.getElementById('save-project-btn');
  const old = btn.textContent;
  btn.textContent = '✓ Saved!';
  setTimeout(() => btn.textContent = old, 1500);
};

function parseSlides(raw){
  let parsed;
  try{parsed=JSON.parse(raw);}catch(e){throw new Error('Invalid JSON: '+e.message);}
  if(!Array.isArray(parsed)) throw new Error('Expected a JSON array [ ... ]');
  if(!parsed.length) throw new Error('Array is empty');
  const valid=new Set(LAYOUTS);
  parsed.forEach((s,i)=>{
    if(typeof s!=='object'||!s) throw new Error(`Slide ${i+1} must be an object`);
    if(!s.layout) throw new Error(`Slide ${i+1} missing "layout"`);
    if(!valid.has(s.layout)) throw new Error(`Slide ${i+1}: unknown layout "${s.layout}"`);
  });
  return parsed.map(s=>mkSlide(s));
}
function showJsonErr(msg){const e=document.getElementById('json-error');e.textContent=msg;e.classList.add('show');}
function clearJsonErr(){const e=document.getElementById('json-error');e.textContent='';e.classList.remove('show');}
function openJsonModal(tab){document.getElementById('json-modal').classList.add('open');switchJTab(tab||'import');clearJsonErr();}
function closeJsonModal(){document.getElementById('json-modal').classList.remove('open');}
function switchJTab(name){
  document.querySelectorAll('.jtab').forEach(t=>t.classList.toggle('active',t.dataset.jtab===name));
  document.querySelectorAll('.json-pane').forEach(p=>p.classList.toggle('active',p.id==='jpane-'+name));
  if(name==='export') document.getElementById('json-export-area').value=JSON.stringify(slidesToJson(),null,2);
}
document.querySelectorAll('.jtab').forEach(t=>t.onclick=()=>switchJTab(t.dataset.jtab));
document.getElementById('json-close').onclick=closeJsonModal;
document.getElementById('json-modal').addEventListener('click',e=>{if(e.target===document.getElementById('json-modal'))closeJsonModal();});
document.getElementById('json-import-btn').onclick=()=>openJsonModal('import');
document.getElementById('json-export-btn').onclick=()=>openJsonModal('export');
document.getElementById('json-replace-btn').onclick=()=>{
  clearJsonErr();const raw=document.getElementById('json-textarea').value.trim();
  if(!raw){showJsonErr('Paste JSON first.');return;}
  try{slides=parseSlides(raw);cur=0;renderSlide(true);updateSidebar();renderEditor();closeJsonModal();}
  catch(e){showJsonErr(e.message);}
};
document.getElementById('json-append-btn').onclick=()=>{
  clearJsonErr();const raw=document.getElementById('json-textarea').value.trim();
  if(!raw){showJsonErr('Paste JSON first.');return;}
  try{const ns=parseSlides(raw);const from=slides.length;slides=[...slides,...ns];updateSidebar();renderEditor();closeJsonModal();setTimeout(()=>goSlide(from),50);}
  catch(e){showJsonErr(e.message);}
};
document.getElementById('json-file-btn').onclick=()=>document.getElementById('json-file-input').click();
document.getElementById('json-file-input').onchange=e=>{
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();r.onload=ev=>{document.getElementById('json-textarea').value=ev.target.result;clearJsonErr();};
  r.readAsText(f);e.target.value='';
};
document.getElementById('json-clear-ta').onclick=()=>{document.getElementById('json-textarea').value='';clearJsonErr();};
document.getElementById('copy-export-btn').onclick=()=>{
  navigator.clipboard.writeText(document.getElementById('json-export-area').value).then(()=>{
    const b=document.getElementById('copy-export-btn');const o=b.textContent;b.textContent='✓ Copied!';setTimeout(()=>b.textContent=o,1800);
  });
};
document.getElementById('download-json-btn').onclick=()=>{
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([document.getElementById('json-export-area').value],{type:'application/json'}));a.download='slides.json';a.click();
};
document.getElementById('copy-prompt-btn').onclick=()=>{
  navigator.clipboard.writeText(document.getElementById('ai-prompt-text').textContent).then(()=>{
    const b=document.getElementById('copy-prompt-btn');const o=b.textContent;b.textContent='✓ Copied!';setTimeout(()=>b.textContent=o,1800);
  });
};
document.getElementById('copy-prompt-topic-btn').onclick=()=>{
  const topic=prompt('Enter your topic:','');if(!topic)return;
  const filled=document.getElementById('ai-prompt-text').textContent.replace('[REPLACE WITH YOUR TOPIC]',topic);
  navigator.clipboard.writeText(filled).then(()=>{
    const b=document.getElementById('copy-prompt-topic-btn');const o=b.textContent;b.textContent='✓ Copied!';setTimeout(()=>b.textContent=o,1800);
  });
};
