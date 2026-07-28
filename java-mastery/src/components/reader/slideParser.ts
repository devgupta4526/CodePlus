/**
 * slideParser.ts
 * Splits raw markdown content into logical slide chunks.
 * A new slide begins at every H1/H2 heading (or the very start of the document).
 * Content BEFORE the first heading is grouped into slide 0 (intro/title slide).
 * Nothing is removed or rewritten — the original markdown text is preserved verbatim.
 */

export interface Slide {
  /** Index of slide (0-based) */
  index: number;
  /** Raw markdown source for this slide */
  raw: string;
  /** The heading that opens this slide, or null for the intro slide */
  heading: string | null;
  /** Heading level (1–6) or null */
  headingLevel: number | null;
}

/**
 * Split `content` into slides.
 * Slide boundaries: every H1 or H2 heading starts a new slide.
 * If there is content before the first heading it becomes the first (intro) slide.
 */
export function parseSlides(content: string): Slide[] {
  const lines = content.split('\n');
  const boundaries: number[] = []; // line indices where a new slide starts

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,2})\s/);
    if (m) {
      boundaries.push(i);
    }
  }

  // No headings at all — entire content is one slide
  if (boundaries.length === 0) {
    return [{ index: 0, raw: content.trim(), heading: null, headingLevel: null }];
  }

  const slides: Slide[] = [];

  // Content before first heading → intro slide
  if (boundaries[0] > 0) {
    const raw = lines.slice(0, boundaries[0]).join('\n').trim();
    if (raw) {
      slides.push({ index: 0, raw, heading: null, headingLevel: null });
    }
  }

  // Each boundary → one slide
  for (let b = 0; b < boundaries.length; b++) {
    const start = boundaries[b];
    const end = b + 1 < boundaries.length ? boundaries[b + 1] : lines.length;
    const chunk = lines.slice(start, end);
    const raw = chunk.join('\n').trim();

    const headingLine = lines[start];
    const hm = headingLine.match(/^(#{1,6})\s+(.+)/);
    const heading = hm ? hm[2].replace(/[📚📌☕🗂️🎨]/g, '').trim() : null;
    const headingLevel = hm ? hm[1].length : null;

    slides.push({
      index: slides.length,
      raw,
      heading,
      headingLevel,
    });
  }

  return slides;
}
