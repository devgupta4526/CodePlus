const fs = require('fs');
const https = require('https');
const path = require('path');

const emojis = [
  "1️⃣", "2️⃣", "3️⃣"
];

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

function getTwemojiUrl(emoji) {
    let cp = toCodePoint(emoji);
    // Twemoji strips fe0f universally now
    cp = cp.split('-').filter(c => c !== 'fe0f').join('-');
    return `https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/${cp}.svg`;
}

function fetchSvg(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        resolve(null);
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
  
  for (const emoji of emojis) {
    const url = getTwemojiUrl(emoji);
    let svgData = await fetchSvg(url);
    
    if (svgData) {
        svgData = svgData.replace(/<svg([^>]*)>/, (match, p1) => {
            let attrs = p1.replace(/width="[^"]*"/, '').replace(/height="[^"]*"/, '');
            return `<svg class="interactive-float-icon" style="width:1.8em;height:1.8em;vertical-align:-0.4em;display:inline-block;" ${attrs}>`;
        });
        svgData = svgData.replace(/\\n/g, '').replace(/\\r/g, '').replace(/>\\s+</g, '><');
        customSvgs[emoji] = svgData;
        console.log(`Fetched ${emoji}`);
    } else {
        console.warn(`Failed ${emoji} at ${url}`);
    }
  }

  const utilsPath = path.join(__dirname, 'js', 'utils.js');
  let utilsContent = fs.readFileSync(utilsPath, 'utf8');
  
  for (const [emoji, svgData] of Object.entries(customSvgs)) {
      // Create a regex to match the specific key inside CUSTOM_SVGS
      // e.g., "1️⃣": "<svg...>",
      const regex = new RegExp(`"${emoji}":\\s*"<svg.*?</svg>",?`, 'g');
      utilsContent = utilsContent.replace(regex, `"${emoji}": \`${svgData}\`,`);
  }
  
  fs.writeFileSync(utilsPath, utilsContent);
  console.log('Updated keycaps in utils.js');
}

main().catch(console.error);
