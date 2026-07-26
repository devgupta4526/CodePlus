// ═══════════════════════════════════════════════════════════════════════════
// config.js  —  Global constants for Java Teaching Studio
// ═══════════════════════════════════════════════════════════════════════════

/* Slide canvas dimensions (never change these at runtime) */
const CW = 1280, CH = 720;

/* Accent palette */
const ACCENTS = ['#7c8cf8','#7cd4f8','#7cf8a0','#f8d07c','#f87cd4','#f87c7c','#c792ea'];

/* All registered layout IDs */
const LAYOUTS = [
  // core
  'title','bullets','code','split','compare','quote','timeline','stats',
  'callout','two-col','image-text','concept-map','diagram','blank',
  // narrative
  'hook','problem','prediction','wrong-assumption','story','analogy',
  'journey','mystery','myth-vs-reality','common-mistake','challenge',
  'quiz','memory-trick','did-you-know','character','transition','summary',
  // charts / visual
  'bar-chart','venn','stack-visual','process-loop','spectrum','icon-grid',
  'image-full',
  // premium (vector art)
  'pipeline','hero-split',
  // motion graphics premium
  'terminal','orbit-diagram','glitch-title',
  'bento-grid','glass-fan','3d-carousel',
  // developer
  'custom-html',
];

/* Entrance animation names */
const ANIMS = ['fade-up','slide-right','type-in','scale-in','none'];

/* Slide role taxonomy (for AI prompt / labelling) */
const ROLES = [
  '','hook','problem','curiosity','question','prediction','story','analogy',
  'visualization','journey','explanation','deep-dive','example','comparison',
  'myth-vs-reality','wrong-assumption','common-mistake','challenge','quiz',
  'checkpoint','memory-trick','did-you-know','fact','summary','revision',
  'transition','next-topic',
];
