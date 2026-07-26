const fs = require('fs');
const path = require('path');

const htmlFile = 'java-teaching-studio.html';
const html = fs.readFileSync(htmlFile, 'utf8');

// 1. Extract CSS
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/i);
if (styleMatch) {
  const css = styleMatch[1].trim();
  fs.mkdirSync('css', { recursive: true });
  fs.writeFileSync('css/main.css', css);
  console.log('Extracted css/main.css');
}

// 2. Extract JS
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/i);
if (!scriptMatch) {
  console.error("No script block found");
  process.exit(1);
}
const js = scriptMatch[1];

// Split by section headers
const sections = js.split(/(\/\/\s*═══[^\n]+)/g);
// sections[0] is everything before the first header (usually just empty space or globals)
let currentHeader = 'INITIAL';
const blocks = {};

for (let i = 1; i < sections.length; i += 2) {
  const header = sections[i];
  const content = sections[i+1];
  blocks[header.trim()] = header + content;
}

// Define the mapping from file to sections
const fileMapping = {
  'js/state.js': [
    '// ═══ STATE ════════════════════════════════════════════════════════════════',
    '// ═══ DOM REFS ═════════════════════════════════════════════════════════════',
    '// ═══ SLIDE FACTORY ════════════════════════════════════════════════════════',
    '// ═══ DEFAULT DECK ═════════════════════════════════════════════════════════'
  ],
  'js/canvas.js': [
    '// ═══ CANVAS SETUP ═════════════════════════════════════════════════════════',
    '// ═══ BACKGROUND + ANIMATED BG ENGINE ═════════════════════════════════════',
    '// ═══ RENDER ═══════════════════════════════════════════════════════════════',
    '// ═══ STEP REVEAL ══════════════════════════════════════════════════════════',
    '// ═══ NAVIGATION ═══════════════════════════════════════════════════════════'
  ],
  'js/draw-tools.js': [
    '// ═══ DRAWING ══════════════════════════════════════════════════════════════'
  ],
  'js/sidebar.js': [
    '// ═══ UI UPDATES ═══════════════════════════════════════════════════════════'
  ],
  'js/editor.js': [
    '// ═══ EDITOR ═══════════════════════════════════════════════════════════════',
    '// ═══ JSON IMPORT / EXPORT ═════════════════════════════════════════════════'
  ],
  'js/present.js': [
    '// ═══ PRESENTATION MODE ════════════════════════════════════════════════════'
  ],
  'js/app.js': [
    '// ═══ SHORTCUTS PANEL ══════════════════════════════════════════════════════',
    '// ═══ TOOL BUTTONS ═════════════════════════════════════════════════════════',
    '// ═══ KEYBOARD ═════════════════════════════════════════════════════════════',
    '// ═══ INIT ═════════════════════════════════════════════════════════════════'
  ]
};

// Write files
fs.mkdirSync('js', { recursive: true });
for (const [file, headers] of Object.entries(fileMapping)) {
  let out = '';
  if (file === 'js/state.js') {
    out += sections[0]; // prepend any loose globals at the very top
  }
  for (const h of headers) {
    if (blocks[h]) {
      out += blocks[h];
    } else {
      console.warn('Missing block for header:', h);
    }
  }
  fs.writeFileSync(file, out.trim() + '\n');
  console.log('Created ' + file);
}

// 3. Update HTML file
const linkTag = `<link rel="stylesheet" href="css/main.css">`;
const scriptTags = Object.keys(fileMapping).map(f => `<script src="${f}"></script>`).join('\n');

let newHtml = html.replace(/<style>[\s\S]*?<\/style>/i, linkTag);
newHtml = newHtml.replace(/<script>[\s\S]*?<\/script>/i, scriptTags);

fs.writeFileSync(htmlFile, newHtml);
console.log('Updated ' + htmlFile);
