const https = require('https');

const emojis = [
  '💡', '❌', '✅', '✖', '✔', '🧠', '🗣️', '👨‍💻', '👷', '📦', '⚙️', '🖥️', '📥', '📤', '⏳', '📋', '🗂️', '📍', '🌐', '📡', '🗄️', '💾', '🔒', '🧬', '🔀', '🎭', '🧵', '⚡', '⚛️', '🗝️', '🔮', '1️⃣', '2️⃣', '3️⃣', '🖼️', '🔁', '🤔', '❓', '💭', '🧩', '🔍', '🚀'
];

function getCodepoint(emoji) {
  // Noto Animated URLs use the hex code of the code points, separated by underscores if multiple
  // But usually for flags or complicated things. 
  // Let's strip Variation Selector-16 (fe0f) from the end if present
  let str = emoji;
  if (str.codePointAt(str.length - 1) === 0xfe0f && str.length > 1) {
     // only strip if it's not the only character
     // well, let's just create an array of code points
  }
  
  const cps = [];
  for (let i = 0; i < emoji.length; ) {
    const cp = emoji.codePointAt(i);
    if (cp !== 0xfe0f) {
      cps.push(cp.toString(16).toLowerCase());
    }
    i += (cp > 0xffff) ? 2 : 1;
  }
  // The fonts.gstatic.com URLs usually format it with underscores
  return cps.join('_');
}

async function checkUrl(emoji) {
  const cp = getCodepoint(emoji);
  const url = `https://fonts.gstatic.com/s/e/notoemoji/latest/${cp}/lottie.json`;
  
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ emoji, cp, status: res.statusCode, url });
    }).on('error', () => resolve({ emoji, cp, status: 500 }));
  });
}

async function run() {
  const map = {};
  let success = 0;
  for (const e of emojis) {
    const res = await checkUrl(e);
    console.log(`${res.status === 200 ? '✅' : '❌'} ${e} (${res.cp}): ${res.status}`);
    if (res.status === 200) {
      map[e] = res.url;
      success++;
    } else {
        // Try without stripping fe0f if it had it? Or just first char?
        const cp1 = e.codePointAt(0).toString(16).toLowerCase();
        if (cp1 !== res.cp) {
            const url2 = `https://fonts.gstatic.com/s/e/notoemoji/latest/${cp1}/lottie.json`;
            const res2 = await new Promise((r) => https.get(url2, (rs) => r({status: rs.statusCode, url: url2})));
            if (res2.status === 200) {
                console.log(`  -> ✅ Found with single cp: ${cp1}`);
                map[e] = res2.url;
                success++;
            }
        }
    }
  }
  console.log(`Found ${success}/${emojis.length}`);
}

run();
