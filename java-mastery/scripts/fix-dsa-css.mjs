import fs from 'fs';
import path from 'path';

const cssToInject = `
:root {
  --color-background-primary: #0B0B0C;
  --color-background-secondary: #18191B;
  --color-border-secondary: #2F3136;
  --color-border-tertiary: #404040;
  
  --color-text-primary: #F5F5F4;
  --color-text-secondary: #CFCFC8;
  --color-text-tertiary: #8C8C85;
  
  --color-background-info: rgba(59, 130, 246, 0.15);
  --color-border-info: rgba(59, 130, 246, 0.4);
  --color-text-info: #60A5FA;
  
  --color-background-primary: transparent;
  --color-border-primary: #333333;
  --color-border-secondary: #222222;
  --color-border-tertiary: #444444;
  --color-text-primary: #EDEDED;
  --color-text-secondary: #A1A1A1;
  --color-text-muted: #888888;
  --color-text-highlight: #FFFFFF;
  --color-button-primary-bg: #2a78d6;
  --color-button-primary-text: #ffffff;
  --color-button-primary-hover: #1e5a99;
  --color-button-secondary-bg: #222222;
  --color-button-secondary-text: #EDEDED;
  --color-button-secondary-hover: #333333;
  --color-button-disabled-bg: #111111;
  --color-button-disabled-text: #555555;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
body {
  background-color: transparent !important;
  color: var(--color-text-primary) !important;
  font-family: var(--font-sans) !important;
  margin: 2rem auto !important;
}
`;

const dir = 'e:/Notes/Java/java-mastery/public/dsa';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // ensure we only inject it once at the bottom
  if (content.includes('!important')) {
    console.log('Already injected', file);
    return;
  }
  
  content = content.replace('</style>', cssToInject + '</style>');
  fs.writeFileSync(filePath, content);
  console.log('Injected CSS overrides into', file);
});
