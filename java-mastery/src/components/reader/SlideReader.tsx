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
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    return <MDXRenderer content={slide.raw} />;
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
            return <ImageCarousel key={idx} images={images} />;
          }
        }
        const trimmed = part.trim();
        if (!trimmed) return null;
        return <MDXRenderer key={idx} content={trimmed} />;
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
}

export function SlideReader({ title, content, modeToggle }: SlideReaderProps) {
  const slides = useMemo(() => parseSlides(content), [content]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [animKey, setAnimKey] = useState(0);
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

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't steal from inputs / textareas
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goPrev, goNext]);

  /* Touch/swipe navigation */
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slide = slides[current];
  const isFirst = current === 0;
  const isLast = current === totalSlides - 1;

  return (
    <div
      className="slide-reader"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label="Slide reader"
      role="region"
    >
      {/* ── PROGRESS BAR ─────────────────────────────────────────── */}
      <div className="slide-progress-bar" aria-hidden="true">
        <div
          className="slide-progress-fill"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* ── HEADER ───────────────────────────────────────────────── */}
      <header className="slide-header">
        <h2 className="slide-header-title" title={title}>
          {title}
        </h2>
        {modeToggle && (
          <div className="slide-header-toggle">{modeToggle}</div>
        )}
      </header>

      {/* ── BODY ─────────────────────────────────────────────────── */}
      <div
        ref={bodyRef}
        tabIndex={-1}
        className={`slide-body slide-anim-${direction}`}
        key={animKey}
        role="main"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Slide ${current + 1} of ${totalSlides}${slide.heading ? `: ${slide.heading}` : ''}`}
      >
        <div className="slide-body-inner prose">
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

        <div className="slide-counter" aria-label={`Slide ${current + 1} of ${totalSlides}`}>
          <span className="slide-counter-current">{current + 1}</span>
          <span className="slide-counter-sep">of</span>
          <span className="slide-counter-total">{totalSlides}</span>
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
