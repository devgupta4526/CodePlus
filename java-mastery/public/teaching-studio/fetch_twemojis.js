const fs = require('fs');
const https = require('https');
const path = require('path');

const emojis = [
  "💡", "❌", "✅", "✖", "✔", "🧠", "🗣️", "👨‍💻", "👷", "📦", "⚙️", 
  "🖥️", "📥", "📤", "⏳", "📋", "🗂️", "📍", "🌐", "📡", "🗄️", "💾", 
  "🔒", "🧬", "🔀", "🎭", "🧵", "⚡", "⚛️", "🗝️", "🔮", "1️⃣", "2️⃣", 
  "3️⃣", "🖼️", "🔁", "🤔", "📝", "📊", "👥"
];

// Converter for Twemoji codepoints
function toCodePoint(unicodeSurrogates) {
  const r = [];
  let c = 0, p = 0, i = 0;
  while (i < unicodeSurrogates.length) {
    c = unicodeSurrogates.charCodeAt(i++);
    if (p) {
      r.push((65536 + (p - 55296 << 10) + (c - 56320)).toString(16));
      p = 0;
    } else if (55296 <= c && c <= 56319) {
      p = c;
    } else {
      r.push(c.toString(16));
    }
  }
  return r.join('-');
}

// Some emojis have variation selector 16 (U+FE0F) which Twemoji typically strips unless it's a keycap
function getTwemojiUrl(emoji) {
    let cp = toCodePoint(emoji);
    // Remove FE0F unless it's a keycap sequence (which contains 20e3)
    if (!cp.includes('20e3')) {
        cp = cp.split('-').filter(c => c !== 'fe0f').join('-');
    }
    return `https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/${cp}.svg`;
}

function fetchSvg(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        resolve(null); // return null if not found
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const customSvgs = {};
  
  console.log('Fetching SVGs from Twemoji...');
  
  for (const emoji of emojis) {
    const url = getTwemojiUrl(emoji);
    let svgData = await fetchSvg(url);
    
    if (!svgData) {
        console.warn(`Could not fetch SVG for ${emoji} (${url})`);
        // Fallback to text if missing
        svgData = `<svg class="interactive-float-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width:1.8em;height:1.8em;vertical-align:-0.4em;display:inline-block;"><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="20">${emoji}</text></svg>`;
    } else {
        // Clean up SVG and add classes
        // Replace the opening <svg ...> to include our classes and styles
        svgData = svgData.replace(/<svg([^>]*)>/, (match, p1) => {
            // Remove any existing width/height to let our style dictate size
            let attrs = p1.replace(/width="[^"]*"/, '').replace(/height="[^"]*"/, '');
            return `<svg class="interactive-float-icon" style="width:1.8em;height:1.8em;vertical-align:-0.4em;display:inline-block;" ${attrs}>`;
        });
        
        // Remove linebreaks to format it cleanly for our JS string
        svgData = svgData.replace(/\\n/g, '').replace(/\\r/g, '').replace(/>\\s+</g, '><');
    }
    
    customSvgs[emoji] = svgData;
    console.log(`Fetched ${emoji}`);
  }

  // Now read utils.js and replace the CUSTOM_SVGS object
  const utilsPath = path.join(__dirname, 'js', 'utils.js');
  let utilsContent = fs.readFileSync(utilsPath, 'utf8');
  
  const newCustomSvgsStr = 'const CUSTOM_SVGS = ' + JSON.stringify(customSvgs, null, 2) + ';';
  
  // The regex replaces everything from `const CUSTOM_SVGS = {` until `};`
  const regex = /const CUSTOM_SVGS = \\{[\\s\\S]*?\\};/;
  utilsContent = utilsContent.replace(regex, newCustomSvgsStr);
  
  fs.writeFileSync(utilsPath, utilsContent);
  console.log('Updated utils.js with 41 high-quality static SVGs.');
}

main().catch(console.error);
