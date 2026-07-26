// ═══════════════════════════════════════════════════════════════════════════
// render.js  —  Central slide rendering dispatcher
// ═══════════════════════════════════════════════════════════════════════════

// Core render — target and z passed in so we can reuse for present overlay
function renderDom(s, target, z, animate) {
  target.innerHTML = '';
  const acc = s.accent || '#7c8cf8';
  const anim = animate ? (s.anim || 'fade-up') : 'none';

  // These globals must be defined in main app scope: curStep, updateStepCounter
  if (typeof curStep !== 'undefined') curStep = 0;
  if (typeof updateStepCounter === 'function') updateStepCounter();

  const fn = {
    title: renderTitleDom,
    bullets: renderBulletsDom,
    code: renderCodeDom,
    split: renderSplitDom,
    compare: renderCompareDom,
    quote: renderQuoteDom,
    timeline: renderTimelineDom,
    diagram: renderDiagramDom,
    stats: renderStatsDom,
    callout: renderCalloutDom,
    'two-col': renderTwoColDom,
    'image-text': renderImageTextDom,
    'concept-map': renderConceptMapDom,
    hook: renderHookDom,
    problem: renderProblemDom,
    prediction: renderPredictionDom,
    'wrong-assumption': renderWrongAssumptionDom,
    story: renderStoryDom,
    analogy: renderAnalogyDom,
    journey: renderJourneyDom,
    mystery: renderMysteryDom,
    'myth-vs-reality': renderMythRealityDom,
    'common-mistake': renderCommonMistakeDom,
    challenge: renderChallengeDom,
    quiz: renderQuizDom,
    'memory-trick': renderMemoryTrickDom,
    'did-you-know': renderDidYouKnowDom,
    character: renderCharacterDom,
    transition: renderTransitionDom,
    summary: renderSummaryDom,
    'bar-chart': renderBarChartDom,
    venn: renderVennDom,
    'stack-visual': renderStackVisualDom,
    'process-loop': renderProcessLoopDom,
    spectrum: renderSpectrumDom,
    'icon-grid': renderIconGridDom,
    'image-full': renderImageFullDom,
    pipeline: renderPipelineDom,
    'hero-split': renderHeroSplitDom,
    terminal: renderTerminalDom,
    'orbit-diagram': renderOrbitDiagramDom,
    'glitch-title': renderGlitchTitleDom,
    'bento-grid': renderBentoGridDom,
    'glass-fan': renderGlassFanDom,
    '3d-carousel': render3DCarouselDom,
    'custom-html': renderCustomHtmlDom,
    'cinematic-parallax': renderCinematicParallaxDom,
  }[s.layout];

  // Add animated SVG background - default if not specified to avoid dull empty space!
  const bgType = s.bgType || (['code', 'split', 'terminal'].includes(s.layout) ? 'code' : ['diagram', 'bar-chart', 'stats'].includes(s.layout) ? 'geo' : 'space');
  if (bgType) {
    const bgContainer = document.createElement('div');
    bgContainer.className = 'slide-bg-svg';
    bgContainer.dataset.bgType = bgType;
    let bgSvg = '';
    if (bgType === 'space' && typeof svgSpaceBackground === 'function') bgSvg = svgSpaceBackground(acc);
    else if (bgType === 'geo' && typeof svgGeometricBackground === 'function') bgSvg = svgGeometricBackground(acc);
    else if (bgType === 'data' && typeof svgDataStreamBackground === 'function') bgSvg = svgDataStreamBackground(acc);
    else if (bgType === 'code' && typeof svgCodeParticleBackground === 'function') bgSvg = svgCodeParticleBackground(acc);
    else if (bgType === 'blob' && typeof svgBlobBackground === 'function') bgSvg = svgBlobBackground(acc);

    if (bgSvg) {
      bgContainer.innerHTML = bgSvg;
      target.appendChild(bgContainer);
    }
  }

  if (fn) fn(s, acc, anim, target, z);
}

