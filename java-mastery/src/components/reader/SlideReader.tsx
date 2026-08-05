'use client';

/**
 * SlideReader.tsx
 *
 * Presentation-style reader for a markdown article.
 *
 * The article content is NOT duplicated — the original `content` string is
 * split into logical chunks by `parseSlides()`, then each chunk is rendered
 * by the existing MDXRenderer.  Nothing is summarised or rewritten.
 *
 * Features:
'use client';

/**
 * SlideReader.tsx
 *
 * Presentation-style reader for a markdown article.
 *
 * The article content is NOT duplicated — the original `content` string is
 * split into logical chunks by `parseSlides()`, then each chunk is rendered
 * by the existing MDXRenderer.  Nothing is summarised or rewritten.
 *
 * Features:
 *  - Prev/Next buttons + arrow-key + swipe navigation
 *  - Slide-scoped image carousel (consecutive images → carousel)
 *  - Progress bar + slide counter
 *  - Smooth fade + horizontal-slide CSS transition
 *  - Keyboard focus management
 *  - Accessibility: aria-live, role="region", focus trapping on slides
 */

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import {
  ChevronLeft,
  ChevronRight,
  List,
  Maximize2,
  Minimize2,
  Play,
  Pause,
} from 'lucide-react';
import { MDXRenderer } from '@/components/mdx/MDXRenderer';
import { ImageCarousel } from './ImageCarousel';
import { parseSlides, type Slide } from './slideParser';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Image group extraction                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */

const IMAGE_LINE_RE = /^!\[([^\]]*)\]\(([^)]+)\)\s*$/;

/**
 * Replace consecutive standalone image lines with a special @@CAROUSEL marker,
 * returning the transformed markdown and a map of marker → images array.
 *
 * Single images are left in-place (rendered normally by MDXRenderer).
 */
function extractImageGroups(raw: string): {
  processed: string;
  carousels: Map<string, Array<{ src: string; alt: string }>>;
} {
  const lines = raw.split('\n');
  const carousels = new Map<string, Array<{ src: string; alt: string }>>();
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (IMAGE_LINE_RE.test(line.trim())) {
      // Collect run of consecutive image lines
      const group: Array<{ src: string; alt: string }> = [];
      while (i < lines.length && IMAGE_LINE_RE.test(lines[i].trim())) {
        const m = lines[i].trim().match(IMAGE_LINE_RE)!;
        group.push({ alt: m[1], src: m[2] });
        i++;
      }
      if (group.length > 1) {
        const id = `carousel-${carousels.size}`;
        carousels.set(id, group);
        out.push(`@@CAROUSEL:${id}@@`);
      } else {
        // Single image — pass through as-is
        out.push(lines[i - 1]);
      }
    } else {
      out.push(line);
      i++;
    }
  }

  return { processed: out.join('\n'), carousels };
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  SlideContent — renders one slide, substituting carousel markers            */
/* ─────────────────────────────────────────────────────────────────────────── */

interface SlideContentProps {
  slide: Slide;
}

function SlideContent({ slide }: SlideContentProps) {
  const { processed, carousels } = useMemo(
    () => extractImageGroups(slide.raw),
    [slide.raw]
  );

  if (carousels.size === 0) {
    // Fast path: no carousels — just render the original markdown
    return <MDXRenderer content={slide.raw} animated />;
  }

  // Split processed markdown on @@CAROUSEL:xxx@@ markers
  const parts = processed.split(/(@@CAROUSEL:[^@]+@@)/);

  return (
    <>
      {parts.map((part, idx) => {
        const m = part.match(/^@@CAROUSEL:([^@]+)@@$/);
        if (m) {
          const images = carousels.get(m[1]);
          if (images) {
            return (
              <div
                key={idx}
                className="slide-reveal"
                style={{ '--reveal-index': idx } as React.CSSProperties}
              >
                <ImageCarousel images={images} />
              </div>
            );
          }
        }
        const trimmed = part.trim();
        if (!trimmed) return null;
        return <MDXRenderer key={idx} content={trimmed} animated />;
      })}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  SlideReader                                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */

interface SlideReaderProps {
  /** Article title displayed in the slide header */
  title: string;
  /** Raw markdown content — NOT modified */
  content: string;
  /** Rendered alongside the mode toggle in the header */
  modeToggle?: React.ReactNode;
  /** Optional initial slide index */
  initialSlide?: number;
}

export function SlideReader({ title, content, modeToggle, initialSlide = 0 }: SlideReaderProps) {
  const slides = useMemo(() => parseSlides(content), [content]);
  const [current, setCurrent] = useState(initialSlide);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [animKey, setAnimKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const totalSlides = slides.length;
  const progressPct = totalSlides > 1 ? Math.round((current / (totalSlides - 1)) * 100) : 100;

  const goTo = useCallback(
    (index: number, dir: 'forward' | 'backward') => {
      if (index < 0 || index >= totalSlides) return;
      setDirection(dir);
      setAnimKey((k) => k + 1);
      setCurrent(index);
      // Reset scroll and focus the slide body
      setTimeout(() => {
        if (bodyRef.current) {
          bodyRef.current.scrollTop = 0;
          bodyRef.current.focus({ preventScroll: true });
        }
      }, 0);
    },
    [totalSlides]
  );

  const goPrev = useCallback(() => goTo(current - 1, 'backward'), [current, goTo]);
  const goNext = useCallback(() => goTo(current + 1, 'forward'), [current, goTo]);

  /* Native Fullscreen Toggle */
  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    const doc = document as unknown as { webkitFullscreenElement?: Element; webkitExitFullscreen?: () => Promise<void> };
    const el = containerRef.current as unknown as { webkitRequestFullscreen?: () => Promise<void> };
    try {
      if (!document.fullscreenElement && !doc.webkitFullscreenElement) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
          await el.webkitRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch {
      // Fallback to CSS overlay mode if native fullscreen fails
      setIsFullscreen((prev) => !prev);
    }
  }, []);

  /* Synchronize native fullscreenchange event */
  useEffect(() => {
    const handleFsChange = () => {
      const doc = document as unknown as { webkitFullscreenElement?: Element };
      const isNativeFs = !!(document.fullscreenElement || doc.webkitFullscreenElement);
      setIsFullscreen(isNativeFs);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, []);

  /* Autoplay slide timer */
  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      if (current < totalSlides - 1) {
        goTo(current + 1, 'forward');
      } else {
        goTo(0, 'forward');
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoplay, current, totalSlides, goTo]);

  /* Keyboard navigation & shortcut handlers */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't steal keystrokes from inputs / textareas / selects
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (document.querySelector('.carousel-lightbox')) return;

      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
        return;
      }
      if (e.key === 'Escape' && isFullscreen && !document.fullscreenElement) {
        e.preventDefault();
        setIsFullscreen(false);
        return;
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goPrev();
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goNext();
      }
      if (e.key === 'Home') {
        e.preventDefault();
        goTo(0, 'backward');
      }
      if (e.key === 'End') {
        e.preventDefault();
        goTo(totalSlides - 1, 'forward');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goPrev, goNext, goTo, totalSlides, toggleFullscreen, isFullscreen]);

  /* Touch/swipe navigation */
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.carousel-wrapper')) return;
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slide = slides[current];
  const isFirst = current === 0;
  const isLast = current === totalSlides - 1;

  // Determine if the current slide already begins with a markdown heading
  const firstNonEmptyLine = slide?.raw.split('\n').find((l) => l.trim().length > 0) || '';
  const startsWithHeading = /^#{1,6}\s+/.test(firstNonEmptyLine.trim());
  const showContinuationHeader = !startsWithHeading && slide?.heading && current > 0;

  return (
    <div
      ref={containerRef}
      className={`slide-reader ${isFullscreen ? 'is-fullscreen' : ''}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label="Full Screen Slide Reader"
      role="region"
    >
      {/* ── PROGRESS BAR ─────────────────────────────────────────── */}
      <div className="slide-progress-bar" aria-hidden="true">
        <div
          className="slide-progress-fill"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* ── HEADER (HUD presenter controls) ───────────────────────── */}
      <header className="slide-header">
        <div className="slide-header-copy">
          <div className="flex items-center gap-2">
            <span className="slide-header-eyebrow">
              {isFullscreen ? '⚡ FULL SCREEN SLIDE VIEW' : 'Presentation Mode'}
            </span>
            {isFullscreen && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[var(--accent)] text-white animate-pulse">
                LIVE
              </span>
            )}
          </div>
          <h2 className="slide-header-title" title={title}>{title}</h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Autoplay toggle button */}
          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className={`slide-action-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              isAutoplay
                ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md'
                : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent)]'
            }`}
            title={isAutoplay ? 'Pause autoplay (5s per slide)' : 'Start slide autoplay (5s per slide)'}
          >
            {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isAutoplay ? 'Autoplay On' : 'Autoplay'}</span>
          </button>

          {/* Mode Toggle (if passed in non-fullscreen mode) */}
          {modeToggle && !isFullscreen && (
            <div className="slide-header-toggle">{modeToggle}</div>
          )}

          {/* Full Screen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            title={isFullscreen ? 'Exit Full Screen View (Esc)' : 'Enter Full Screen Slide View (Press F)'}
            aria-label={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-4 h-4" />
                <span className="hidden sm:inline">Exit Full Screen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4" />
                <span className="hidden sm:inline">Full Screen</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ── BODY ─────────────────────────────────────────────────── */}
      <div
        ref={bodyRef}
        tabIndex={-1}
        className={`slide-body slide-anim-${direction} ${current === 0 ? 'slide-body-intro' : ''}`}
        key={animKey}
        role="main"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Slide ${current + 1} of ${totalSlides}${slide.heading ? `: ${slide.heading}` : ''}`}
      >
        <div className="slide-body-inner">
          {showContinuationHeader && (
            <div className="mb-5 pb-2.5 border-b border-[var(--border-color)] flex items-center gap-2.5 text-left opacity-90">
              <span className="text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded bg-[var(--accent)] text-white shadow-xs shrink-0">
                {slide.headingLevel ? `H${slide.headingLevel}` : 'Section'}
              </span>
              <h3 className="font-heading font-semibold text-sm md:text-base text-[var(--text-secondary)] tracking-tight truncate m-0 flex-1">
                {slide.heading} <span className="text-xs font-normal opacity-65 ml-1.5">(Continued)</span>
              </h3>
            </div>
          )}
          <SlideContent slide={slide} />
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="slide-footer">
        <button
          onClick={goPrev}
          disabled={isFirst}
          className="slide-nav-btn"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="slide-footer-center">
          <label className="slide-jump-label">
            <List className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="sr-only">Jump to slide</span>
            <select
              className="slide-jump-select"
              value={current}
              onChange={(event) => {
                const nextIndex = Number(event.target.value);
                goTo(nextIndex, nextIndex >= current ? 'forward' : 'backward');
              }}
              aria-label="Jump to slide"
            >
              {slides.map((item, index) => (
                <option key={`${item.index}-${index}`} value={index}>
                  {index + 1}. {item.heading || (index === 0 ? 'Introduction' : 'Untitled slide')}
                </option>
              ))}
            </select>
          </label>
          <div className="slide-counter" aria-label={`Slide ${current + 1} of ${totalSlides}`}>
            <span className="slide-counter-current">{current + 1}</span>
            <span className="slide-counter-sep">of</span>
            <span className="slide-counter-total">{totalSlides}</span>
          </div>
        </div>

        <button
          onClick={goNext}
          disabled={isLast}
          className="slide-nav-btn"
          aria-label="Next slide"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}
