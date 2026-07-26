const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const code = `
  <script>${fs.readFileSync('js/config.js', 'utf8')}</script>
  <script>${fs.readFileSync('js/motion.js', 'utf8')}</script>
  <script>${fs.readFileSync('js/svg-art.js', 'utf8')}</script>
  <script>${fs.readFileSync('js/utils.js', 'utf8')}</script>
  <script>${fs.readFileSync('js/renderers-core.js', 'utf8')}</script>
  <script>${fs.readFileSync('js/renderers-diagrams.js', 'utf8')}</script>
  <script>${fs.readFileSync('js/renderers-narrative.js', 'utf8')}</script>
  <script>${fs.readFileSync('js/renderers-premium.js', 'utf8')}</script>
  <script>${fs.readFileSync('js/render.js', 'utf8')}</script>
  <script>
    window.sCtx = { clearRect: ()=>{} };
    window.dCtx = { putImageData: ()=>{}, clearRect: ()=>{} };
    window.CW = 1920; window.CH = 1080;
    window.zoom = 1;
    window.slides = [];
    window.cur = 0;
    window.curStep = 0;
    window.updateStepCounter = () => {};

    const s = {
        layout: 'problem',
        title: 'Title',
        subtitle: 'Sub',
        bullets: ['a', 'b'],
        accent: '#7c8cf8'
    };
    
    const target = document.getElementById('slide-dom');
    window.renderDom(s, target, 1, true);
    console.log(target.innerHTML.substring(0, 500));
  </script>
`;

const dom = new JSDOM(`<!DOCTYPE html><html><body><div id="slide-dom"></div>${code}</body></html>`, { runScripts: "dangerously" });
