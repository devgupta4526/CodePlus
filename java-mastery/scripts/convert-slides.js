const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content', 'lessons');

const lessonsToConvert = [
  'annotations',
  'collection-framework',
  'constructors',
  'control-flow-statements',
  'exception-handling',
  'float-double-ieee754',
  'functional-interfaces-lambdas',
  'generics',
  'how-java-works',
  'interfaces-fundamentals',
  'interfaces-java8-java9',
  'memory-management',
  'methods',
  'oop-fundamentals',
  'operators',
  'pojo-enum-final',
  'queue-comparator-comparable',
  'reference-types',
  'reflection',
  'singleton-immutable-wrapper',
  'types-of-classes',
  'variables-primitive-types'
];

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
  slideList.push({
    layout: 'title',
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    subtitle: 'Java Teaching Studio · Live Session Lecture',
    accent: '#F97316',
    anim: 'type-in'
  });

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
      slideList.push({
        layout: 'transition',
        title: rawTitle,
        subtitle: 'Section Introduction',
        accent: '#F97316',
        anim: 'type-in',
        nextTopic: rawTitle
      });
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
    
    const rawSubtitle = paragraphs[0] && paragraphs[0].length < 80 ? paragraphs[0] : '';
    const subtitle = rawSubtitle.replace(/\*\*|\*|`/g, '').trim() || 'Conceptual Details';

    const finalBullets = [...bullets];
    if (finalBullets.length === 0) {
      if (paragraphs.length > 0) {
        paragraphs.forEach(p => {
          if (p.length < 200) {
            finalBullets.push(p);
          } else {
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
      slideObj = {
        layout: 'diagram',
        title: rawTitle,
        subtitle: subtitle,
        diagramType: 'custom',
        accent: '#8B5CF6',
        anim: 'fade-up'
      };
    } else if (codeMatch) {
      const code = codeMatch[2].trim();
      slideObj = {
        layout: 'split',
        title: rawTitle,
        subtitle: subtitle,
        bullets: finalBullets.slice(0, 4),
        code: code,
        accent: '#10B981',
        anim: 'slide-right'
      };
    } else {
      slideObj = {
        layout: 'bullets',
        title: rawTitle,
        subtitle: subtitle,
        bullets: finalBullets.slice(0, 5),
        accent: '#3B82F6',
        anim: 'fade-up'
      };
    }

    Object.assign(slideObj, slideProps);
    slideList.push(slideObj);
  }

  return slideList;
}

lessonsToConvert.forEach(slug => {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const jsonPath = path.join(CONTENT_DIR, `${slug}-slides.json`);
  
  if (fs.existsSync(mdxPath)) {
    const raw = fs.readFileSync(mdxPath, 'utf8');
    const { content } = matter(raw);
    const slides = mdxToSlides(content, slug);
    
    fs.writeFileSync(jsonPath, JSON.stringify(slides, null, 2), 'utf8');
    console.log(`Successfully converted ${slug}.mdx -> ${slug}-slides.json (${slides.length} slides)`);
  } else {
    console.warn(`File not found: ${mdxPath}`);
  }
});
