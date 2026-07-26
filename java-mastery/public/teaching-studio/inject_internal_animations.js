const fs = require('fs');
const path = require('path');

function injectAnimations() {
  const utilsPath = path.join(__dirname, 'js', 'utils.js');
  let utilsContent = fs.readFileSync(utilsPath, 'utf8');

  // I will fetch the raw twemojis again to clear the previously injected animations
  // and re-apply fresh ones so they don't stack.
  
  const startIdx = utilsContent.indexOf('const CUSTOM_SVGS = {');
  let endIdx = utilsContent.indexOf('};', startIdx) + 2;
  const customSvgsStr = utilsContent.substring(startIdx, endIdx);
  
  let customSvgs = new Function('return ' + customSvgsStr.substring(customSvgsStr.indexOf('{')))();
  
  // Clean up any previously injected animations by removing anything after </path></svg>
  // Actually, our previous script appended to </svg> or injected <g>.
  // Since we don't want to double-inject, it's safer to just fetch the pristine dictionary from fetch_twemojis_robust.js logic or clean it.
  for (const key of Object.keys(customSvgs)) {
      // Remove previously injected groups
      customSvgs[key] = customSvgs[key]
          .replace(/<g><!-- Star 1 -->.*?<\/g><\/g>/is, '')
          .replace(/<g><path d="M-10,0 L0,36 L10,36 L0,0 Z".*?<\/g>/is, '')
          .replace(/<circle cx="18" cy="18".*?<\/circle>/is, '')
          .replace(/<animateTransform.*?additive="sum"\s*\/>/isg, '')
          .replace(/<g>(<path.*?)<\/g>/is, '$1');
  }

  const starsGroup = '<g><!-- Star 1 --><g transform="translate(2, 2) scale(0.3)"><polygon points="18 2 22.94 12.02 34 13.62 26 21.41 27.89 32.41 18 27.21 8.11 32.41 10 21.41 2 13.62 13.06 12.02" fill="#FFD700" /><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="4s" repeatCount="indefinite" additive="sum"/><animateTransform attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur="2s" repeatCount="indefinite" additive="sum"/></g><!-- Star 2 --><g transform="translate(26, 4) scale(0.2)"><polygon points="18 2 22.94 12.02 34 13.62 26 21.41 27.89 32.41 18 27.21 8.11 32.41 10 21.41 2 13.62 13.06 12.02" fill="#FFA500" /><animateTransform attributeName="transform" type="rotate" from="360 18 18" to="0 18 18" dur="3s" repeatCount="indefinite" additive="sum"/><animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="1.5s" repeatCount="indefinite" additive="sum"/></g><!-- Star 3 --><g transform="translate(4, 24) scale(0.25)"><polygon points="18 2 22.94 12.02 34 13.62 26 21.41 27.89 32.41 18 27.21 8.11 32.41 10 21.41 2 13.62 13.06 12.02" fill="#FFC0CB" /><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="5s" repeatCount="indefinite" additive="sum"/><animateTransform attributeName="transform" type="translate" values="0,0; 2,0; 0,0" dur="2s" repeatCount="indefinite" additive="sum"/></g></g>';
  
  const sweepGlow = '<g><path d="M-10,0 L0,36 L10,36 L0,0 Z" fill="rgba(255,255,255,0.4)"><animateTransform attributeName="transform" type="translate" values="-20,0; 50,0; 50,0" dur="3s" repeatCount="indefinite"/></path></g>';
  
  const glowPulse = '<circle cx="18" cy="18" r="18" fill="rgba(255, 215, 0, 0.4)" filter="blur(4px)"><animate attributeName="opacity" values="0.2; 0.7; 0.2" dur="2s" repeatCount="indefinite" /></circle>';

  const heartbeat = '<animateTransform attributeName="transform" type="scale" values="1; 1.15; 1; 1.15; 1" dur="1.5s" repeatCount="indefinite" additive="sum" /><animateTransform attributeName="transform" type="translate" values="0,0; -1.5,-1.5; 0,0; -1.5,-1.5; 0,0" dur="1.5s" repeatCount="indefinite" additive="sum" />';

  for (const [emoji, svgStr] of Object.entries(customSvgs)) {
      if (!svgStr.includes('<svg')) continue;
      
      let injected = '';
      
      // Let\'s distribute them widely so everything has a very distinct internal animation
      if (['🧠', '🤔', '💭', '🔮', '✨', '🌟', '🚀', '👨‍💻', '👷', '👥', '👤'].includes(emoji)) {
          injected = starsGroup;
      } else if (['🔍', '🖥️', '🖼️', '📦', '🗂️', '🗄️', '💾', '📋', '📝', '📊', '⌨', '🍱'].includes(emoji)) {
          injected = sweepGlow;
      } else if (['💡', '⚡', '🗝️', '🔒', '🧬', '⚛️', '📍', '🌐', '📡'].includes(emoji)) {
          injected = glowPulse;
      } else if (['⚙️', '🔁', '🔀', '↓', '↔', '⊙', '⊛'].includes(emoji)) {
          injected = '<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="4s" repeatCount="indefinite" additive="sum" />';
      } else {
          // Checkmarks, crosses, numbers, and the rest get a heartbeat
          injected = heartbeat;
      }
      
      let newSvg = svgStr;
      
      if (injected === heartbeat || injected.includes('type="rotate"')) {
          const innerContentMatch = newSvg.match(new RegExp('<svg[^>]*>(.*?)</svg>', 'is'));
          if (innerContentMatch) {
              const svgOpening = newSvg.match(new RegExp('<svg[^>]*>', 'is'))[0];
              const inner = innerContentMatch[1];
              newSvg = svgOpening + '<g>' + injected + inner + '</g></svg>';
          }
      } else {
          newSvg = newSvg.replace(/<\/svg>/, injected + '</svg>');
      }
      
      customSvgs[emoji] = newSvg;
  }
  
  const newCustomSvgsStr = 'const CUSTOM_SVGS = ' + JSON.stringify(customSvgs, null, 2) + ';';
  utilsContent = utilsContent.substring(0, startIdx) + newCustomSvgsStr + utilsContent.substring(endIdx);
  fs.writeFileSync(utilsPath, utilsContent);
  
  console.log("Internal SVG animations successfully re-injected for ALL icons.");
}

injectAnimations();
