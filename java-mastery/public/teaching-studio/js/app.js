// ═══ SHORTCUTS PANEL ══════════════════════════════════════════════════════
(()=>{
  const panel=document.getElementById('shortcuts-panel');
  panel.classList.add('hidden');
  document.getElementById('sc-toggle').onclick=()=>panel.classList.toggle('hidden');
  document.getElementById('sc-close').onclick=()=>panel.classList.add('hidden');
})();

// ═══ TOOL BUTTONS ═════════════════════════════════════════════════════════
document.querySelectorAll('[id^="tool-"]').forEach(b=>b.onclick=()=>setTool(b.id.replace('tool-','')));
let prevTool='pen';
function setTool(t){
  prevTool=tool;
  // Commit any in-progress stroke before switching tools
  const cs=getCS(dCtx);
  if(cs.drawing){
    cs.drawing=false;
    ctx_resetState(dCtx);
    const img=dCtx.getImageData(0,0,CW,CH);
    drawHistory.push(img);redoStack=[];slides[cur]._ann=img;
  }
  tool=t;
  document.querySelectorAll('[id^="tool-"]').forEach(b=>b.classList.remove('active'));
  const b=document.getElementById('tool-'+t);if(b)b.classList.add('active');
  dc.style.cursor=t==='eraser'?'cell':t==='text'?'text':'crosshair';
  const pulse=document.getElementById('mode-pulse'),lbl=document.getElementById('mode-label');
  if(t==='laser'){pulse.className='mode-pulse laser';lbl.textContent='Laser';}
  else if(t==='eraser'){pulse.className='mode-pulse';lbl.textContent='Erasing';}
  else{pulse.className='mode-pulse drawing';lbl.textContent=t.charAt(0).toUpperCase()+t.slice(1);}
  // Only clean up laser dot when switching away from laser
  clearTimeout(laserTimerId);
  if(prevTool==='laser'&&t!=='laser'){
    // Restore annotations over the laser dot — do NOT wipe if no laser was active
    dCtx.clearRect(0,0,CW,CH);
    const img=slides[cur]&&slides[cur]._ann;
    if(img) dCtx.putImageData(img,0,0);
  }
}
document.querySelectorAll('.swatch').forEach(d=>d.onclick=()=>{
  color=d.dataset.color;
  document.querySelectorAll('.swatch').forEach(x=>x.classList.remove('active'));d.classList.add('active');
});
document.getElementById('stroke-range').oninput=e=>{strokeSize=+e.target.value;document.getElementById('stroke-val').textContent=strokeSize;};
document.getElementById('undo-btn').onclick=undo;
document.getElementById('redo-btn').onclick=redo;
document.getElementById('clear-btn').onclick=clearAnns;
document.getElementById('prev-btn').onclick=retreat;
document.getElementById('next-btn').onclick=advance;
document.getElementById('add-slide-btn').onclick=()=>{
  slides.push(mkSlide({layout:'bullets',title:'New Slide',subtitle:'Subtitle',bullets:['First point','Second point'],accent:'#7c8cf8'}));
  goSlide(slides.length-1);updateSidebar();renderEditor();
};
document.querySelectorAll('.etab').forEach(t=>t.onclick=()=>{
  activeTab=t.dataset.tab;
  document.querySelectorAll('.etab').forEach(x=>x.classList.remove('active'));t.classList.add('active');
  renderEditor();
});
document.getElementById('zm-in').onclick=()=>applyZoom(zoom+.1);
document.getElementById('zm-out').onclick=()=>applyZoom(zoom-.1);
document.getElementById('zm-reset').onclick=()=>{zoom=1;applyZoom(1);fitCanvases();};
document.getElementById('fs-btn').onclick=enterPresent;

// ═══ KEYBOARD ═════════════════════════════════════════════════════════════
document.addEventListener('keydown',e=>{
  if(document.getElementById('json-modal').classList.contains('open')) return;
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA') return;
  if(e.key==='Escape'){if(pActive){exitPresent();return;}}
  if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();advance();}
  else if(e.key==='ArrowLeft'){e.preventDefault();retreat();}
  else if(!e.ctrlKey&&!e.metaKey){
    if(e.key==='p'||e.key==='P'){if(pActive)pSetTool('pen');else setTool('pen');}
    else if(e.key==='m'||e.key==='M'){if(pActive)pSetTool('marker');else setTool('marker');}
    else if(e.key==='a'||e.key==='A'){if(pActive)pSetTool('arrow');else setTool('arrow');}
    else if(e.key==='r'||e.key==='R'){if(pActive)pSetTool('rect');else setTool('rect');}
    else if(e.key==='c'||e.key==='C'){if(pActive)pSetTool('circle');else setTool('circle');}
    else if(e.key==='t'||e.key==='T'){if(pActive)pSetTool('text');else setTool('text');}
    else if(e.key==='e'||e.key==='E'){if(pActive)pSetTool('eraser');else setTool('eraser');}
    else if(e.key==='l'||e.key==='L'){if(pActive)pSetTool('laser');else setTool('laser');}
    else if(e.key==='f'||e.key==='F') enterPresent();
    else if(e.key==='Delete'){if(pActive)pClear();else clearAnns();}
  }

  else if(e.ctrlKey&&e.key==='z'){e.preventDefault();if(pActive)pUndo();else undo();}
  else if(e.ctrlKey&&e.key==='y'){e.preventDefault();redo();}
  else if((e.ctrlKey||e.metaKey)&&e.key==='i'){e.preventDefault();openJsonModal('import');}
  else if((e.ctrlKey||e.metaKey)&&e.key==='e'){e.preventDefault();openJsonModal('export');}
});

// ═══ INIT ═════════════════════════════════════════════════════════════════
slides=buildDefaultSlides();
fitCanvases();
updateSidebar();
renderEditor();
setTool('pen');
window.addEventListener('resize',fitCanvases);

// Helper to convert base64 drawing string to ImageData
async function loadSlideAnnotations(slidesList) {
  for (let s of slidesList) {
    if (s.annotation) {
      try {
        s._ann = await new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const temp = document.createElement('canvas');
            temp.width = CW;
            temp.height = CH;
            const tCtx = temp.getContext('2d');
            tCtx.drawImage(img, 0, 0);
            resolve(tCtx.getImageData(0, 0, CW, CH));
          };
          img.onerror = () => resolve(null);
          img.src = s.annotation;
        });
      } catch (err) {
        console.error('Failed to load annotation', err);
      }
    }
  }
}

// Check if a specific lesson slug was requested in the URL
(async () => {
  const params = new URLSearchParams(window.location.search);
  const lessonSlug = params.get('lesson');
  if (lessonSlug) {
    try {
      // 1. Try to load saved slides from the server
      const slidesRes = await fetch(`/api/admin?action=get_slides&slug=${lessonSlug}`);
      const slidesData = await slidesRes.json();
      if (slidesData.success && slidesData.slides && slidesData.slides.length > 0) {
        await loadSlideAnnotations(slidesData.slides);
        slides = slidesData.slides.map(s => mkSlide(s));
        cur = 0;
        curStep = 0;
        fitCanvases();
        updateSidebar();
        renderEditor();
        return;
      }

      // 2. Fallback to compiling slides from the MDX notes file
      const res = await fetch(`/api/admin?slug=${lessonSlug}`);
      const data = await res.json();
      if (data.success && data.content) {
        const parsed = mdxToSlides(data.content, lessonSlug);
        if (parsed && parsed.length > 0) {
          slides = parsed;
          cur = 0;
          curStep = 0;
          fitCanvases();
          updateSidebar();
          renderEditor();
        }
      }
    } catch (err) {
      console.error('Failed to load lesson slides', err);
    }
  }
})();

// Convert MD notes file uploader listener
const mdInput = document.getElementById('md-file-input');
document.getElementById('md-import-btn').onclick = () => mdInput.click();
mdInput.onchange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const text = event.target?.result;
    if (text) {
      const parsed = mdxToSlides(text, file.name.replace(/\.mdx?$/, ''));
      if (parsed && parsed.length > 0) {
        slides = parsed;
        cur = 0;
        curStep = 0;
        fitCanvases();
        updateSidebar();
        renderEditor();
        alert(`Successfully converted ${parsed.length} slides from MD notes!`);
      }
    }
  };
  reader.readAsText(file);
};

// Save slides to server API post listener
document.getElementById('server-save-btn').onclick = async () => {
  const params = new URLSearchParams(window.location.search);
  const lessonSlug = params.get('lesson');
  if (!lessonSlug) {
    alert('No lesson specified in URL. Slides cannot be saved.');
    return;
  }
  
  // Serialize current slide annotations
  const serializedSlides = slides.map(s => {
    const o = { ...s };
    // If the active slide has canvas drawing image data, convert to dataURL string
    if (s._ann) {
      const temp = document.createElement('canvas');
      temp.width = CW;
      temp.height = CH;
      const tCtx = temp.getContext('2d');
      tCtx.putImageData(s._ann, 0, 0);
      o.annotation = temp.toDataURL();
    }
    // Delete native ImageDatas to avoid JSON serialization failures
    delete o._ann;
    return o;
  });

  try {
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'save_slides',
        slug: lessonSlug,
        slides: serializedSlides
      })
    });
    const data = await res.json();
    if (data.success) {
      alert('Slides saved to server successfully!');
    } else {
      alert('Failed to save slides: ' + data.error);
    }
  } catch (err) {
    alert('Error saving slides: ' + err.message);
  }
};

function mdxToSlides(content, slug) {
  // Let's find all headers and their contents
  // We use a regex to find all headers starting with # or ##
  const headerRegex = /^(#{1,2})\s+(.+)$/gm;
  const matches = [];
  let match;
  while ((match = headerRegex.exec(content)) !== null) {
    matches.push({
      level: match[1].length, // 1 for #, 2 for ##
      title: match[2].trim(),
      index: match.index,
      fullHeader: match[0]
    });
  }

  const slideList = [];

  // Slide 1: Welcome title slide
  slideList.push(mkSlide({
    layout: 'title',
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    subtitle: 'Java Teaching Studio · Live Session Lecture',
    accent: '#F97316',
    anim: 'type-in'
  }));

  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const nextIndex = (i + 1 < matches.length) ? matches[i + 1].index : content.length;
    // Extract the text content belonging to this header
    const rawRest = content.substring(current.index + current.fullHeader.length, nextIndex).trim();
    
    // Ignore Table of Contents slide completely
    if (current.title.toLowerCase().includes('table of contents')) {
      continue;
    }

    const rawTitle = current.title.replace(/[📚📌☕🗂️🎨]/g, '').trim();

    if (current.level === 1) {
      // Treat level 1 headers (#) as transition slides!
      slideList.push(mkSlide({
        layout: 'transition',
        title: rawTitle,
        subtitle: 'Section Introduction',
        accent: '#F97316',
        anim: 'type-in',
        nextTopic: rawTitle
      }));
      continue;
    }

    // Level 2 headers (##) are parsed as normal slides
    const slideProps = {};
    const commentMatch = rawRest.match(/^\s*<!--\s*([\s\S]*?)\s*-->/);
    let cleanRest = rawRest;
    if (commentMatch) {
      cleanRest = rawRest.replace(commentMatch[0], '').trim();
      const commentText = commentMatch[1];
      const pairs = commentText.split(',');
      pairs.forEach(pair => {
        const colonIdx = pair.indexOf(':');
        if (colonIdx >= 0) {
          const key = pair.substring(0, colonIdx).trim();
          let val = pair.substring(colonIdx + 1).trim();
          
          if (val.startsWith('[') && val.endsWith(']')) {
            try {
              // Convert single quotes to double quotes for valid JSON parse
              val = JSON.parse(val.replace(/'/g, '"'));
            } catch(e) {}
          } else if (!isNaN(val) && val !== '') {
            val = Number(val);
          } else {
            val = val.replace(/^['"]|['"]$/g, '');
          }
          slideProps[key] = val;
        }
      });
    }

    const codeMatch = cleanRest.match(/```(\w+)?\n([\s\S]*?)```/);
    const mermaidMatch = cleanRest.match(/```mermaid\n([\s\S]*?)```/);
    
    const bullets = [];
    const bulletLines = cleanRest.match(/^\s*[-*+]\s+(.+)$/gm);
    if (bulletLines) {
      bulletLines.forEach(bl => {
        bullets.push(bl.replace(/^\s*[-*+]\s+/, '').trim());
      });
    }

    const paragraphs = cleanRest.split(/\n\s*\n/).map(p => p.trim()).filter(p => p && !p.startsWith('`') && !p.startsWith('-') && !p.startsWith('>'));
    
    // Clean subtitle of asterisks and limit length
    const rawSubtitle = paragraphs[0] && paragraphs[0].length < 80 ? paragraphs[0] : '';
    const subtitle = rawSubtitle.replace(/\*\*|\*|`/g, '').trim() || 'Conceptual Details';

    const finalBullets = [...bullets];
    if (finalBullets.length === 0) {
      if (paragraphs.length > 0) {
        paragraphs.forEach(p => {
          if (p.length < 200) {
            finalBullets.push(p);
          } else {
            // Split long paragraphs into sentence-based cards
            const sentences = p.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 10);
            sentences.forEach(s => finalBullets.push(s.trim()));
          }
        });
      } else {
        finalBullets.push('Interactive conceptual explanation', 'Drawing & whiteboard analysis', 'Live code annotation');
      }
    }

    let slideObj;
    if (mermaidMatch) {
      slideObj = mkSlide({
        layout: 'diagram',
        title: rawTitle,
        subtitle: subtitle,
        diagramType: 'custom',
        accent: '#8B5CF6',
        anim: 'fade-up'
      });
    } else if (codeMatch) {
      const code = codeMatch[2].trim();
      slideObj = mkSlide({
        layout: 'split',
        title: rawTitle,
        subtitle: subtitle,
        bullets: finalBullets.slice(0, 4),
        code: code,
        accent: '#10B981',
        anim: 'slide-right'
      });
    } else {
      slideObj = mkSlide({
        layout: 'bullets',
        title: rawTitle,
        subtitle: subtitle,
        bullets: finalBullets.slice(0, 5),
        accent: '#3B82F6',
        anim: 'fade-up'
      });
    }

    // Merge slideProps from the HTML comment to override the default parsed values!
    Object.assign(slideObj, slideProps);
    slideList.push(slideObj);
  }

  return slideList;
}
