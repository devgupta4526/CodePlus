/**
 * Splits a complete markdown lesson into presentation-sized frames.
 *
 * Unlike article pagination, this parser works with markdown blocks. It keeps
 * every content block, repeats table headers when a long table is split, and
 * chunks long code samples so a slide never needs its own scrollbar.
 */

export interface Slide {
  index: number;
  raw: string;
  heading: string | null;
  headingLevel: number | null;
}

interface MarkdownBlock {
  raw: string;
  kind: 'heading' | 'paragraph' | 'list' | 'quote' | 'table' | 'code' | 'image' | 'rule';
  weight: number;
  heading?: string;
  headingLevel?: number;
}

const MAX_SLIDE_WEIGHT = 12.0;
const MAX_BLOCKS_PER_SLIDE = 7;
const MAX_CODE_LINES = 32;
const MAX_TABLE_ROWS = 12;
const MAX_PARAGRAPH_CHARS = 850;
const MAX_LIST_CHARS = 900;

const headingInfo = (line: string) => {
  const match = line.match(/^(#{1,6})\s+(.+)/);
  if (!match) return null;
  return {
    level: match[1].length,
    text: match[2].replace(/[ðŸ“šðŸ“Œâ˜•ðŸ—‚ï¸ðŸŽ¨]/g, '').trim(),
  };
};

function splitCodeBlock(lines: string[], start: number): { blocks: MarkdownBlock[]; next: number } {
  const opener = lines[start];
  const code: string[] = [];
  let i = start + 1;
  while (i < lines.length && !lines[i].trim().startsWith('```')) {
    code.push(lines[i]);
    i++;
  }
  const closer = i < lines.length ? lines[i] : '```';
  const blocks: MarkdownBlock[] = [];

  for (let offset = 0; offset < Math.max(code.length, 1); offset += MAX_CODE_LINES) {
    const chunk = code.slice(offset, offset + MAX_CODE_LINES);
    const lineCount = chunk.length;
    // Dynamic weight based on actual line count so shorter snippets do not force immediate slide breaks
    const weight = Math.max(3.0, Math.min(8.0, 2.5 + lineCount * 0.25));
    blocks.push({
      raw: [opener, ...chunk, closer].join('\n'),
      kind: 'code',
      weight,
    });
  }

  return { blocks, next: i < lines.length ? i + 1 : i };
}

function splitTableBlock(tableLines: string[]): MarkdownBlock[] {
  if (tableLines.length <= MAX_TABLE_ROWS + 2) {
    const rowCount = Math.max(1, tableLines.length - 2);
    return [{ raw: tableLines.join('\n'), kind: 'table', weight: Math.min(8.0, 2 + rowCount * 0.45) }];
  }

  const header = tableLines.slice(0, 2);
  const rows = tableLines.slice(2);
  const blocks: MarkdownBlock[] = [];
  for (let offset = 0; offset < rows.length; offset += MAX_TABLE_ROWS) {
    const chunk = [...header, ...rows.slice(offset, offset + MAX_TABLE_ROWS)];
    blocks.push({ raw: chunk.join('\n'), kind: 'table', weight: 7 });
  }
  return blocks;
}

function splitLongParagraph(raw: string): string[] {
  if (raw.length <= MAX_PARAGRAPH_CHARS) return [raw];

  const sentences = raw.match(/[^.!?]+(?:[.!?]+["')\]]*|$)/g)?.map((part) => part.trim()).filter(Boolean) ?? [raw];
  const chunks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    if (current && current.length + sentence.length + 1 > MAX_PARAGRAPH_CHARS) {
      chunks.push(current);
      current = '';
    }

    if (sentence.length > MAX_PARAGRAPH_CHARS) {
      const words = sentence.split(/\s+/);
      for (const word of words) {
        if (current && current.length + word.length + 1 > MAX_PARAGRAPH_CHARS) {
          chunks.push(current);
          current = '';
        }
        current += `${current ? ' ' : ''}${word}`;
      }
    } else {
      current += `${current ? ' ' : ''}${sentence}`;
    }
  }

  if (current) chunks.push(current);
  return chunks;
}

function splitListBlock(lines: string[]): MarkdownBlock[] {
  const chunks: string[][] = [];
  let current: string[] = [];
  let currentLength = 0;

  for (const line of lines) {
    if (current.length && (current.length >= 6 || currentLength + line.length > MAX_LIST_CHARS)) {
      chunks.push(current);
      current = [];
      currentLength = 0;
    }
    current.push(line);
    currentLength += line.length;
  }
  if (current.length) chunks.push(current);

  return chunks.map((chunk) => ({
    raw: chunk.join('\n'),
    kind: 'list',
    weight: 1 + chunk.length * 0.65 + chunk.join(' ').length / 420,
  }));
}

function tokenizeMarkdown(content: string): MarkdownBlock[] {
  const lines = content.split('\n');
  const blocks: MarkdownBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (!trimmed) { i++; continue; }

    if (trimmed.startsWith('```')) {
      const result = splitCodeBlock(lines, i);
      blocks.push(...result.blocks);
      i = result.next;
      continue;
    }

    const heading = headingInfo(lines[i]);
    if (heading) {
      blocks.push({
        raw: lines[i],
        kind: 'heading',
        weight: heading.level <= 2 ? 1.2 : 0.8,
        heading: heading.text,
        headingLevel: heading.level,
      });
      i++;
      continue;
    }

    if (trimmed === '---' || trimmed === '***') {
      blocks.push({ raw: lines[i], kind: 'rule', weight: 0.2 });
      i++;
      continue;
    }

    if (trimmed.startsWith('>')) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) quote.push(lines[i++]);
      blocks.push({ raw: quote.join('\n'), kind: 'quote', weight: 1.5 + quote.join(' ').length / 260 });
      continue;
    }

    if (lines[i].includes('|') && i + 1 < lines.length && lines[i + 1].match(/^\|?\s*[-:]+/)) {
      const table: string[] = [];
      while (i < lines.length && lines[i].includes('|')) table.push(lines[i++]);
      blocks.push(...splitTableBlock(table));
      continue;
    }

    if (/^!\[[^\]]*\]\([^)]+\)\s*$/.test(trimmed)) {
      const images: string[] = [];
      while (i < lines.length && /^!\[[^\]]*\]\([^)]+\)\s*$/.test(lines[i].trim())) images.push(lines[i++]);
      blocks.push({ raw: images.join('\n'), kind: 'image', weight: 6.5 });
      continue;
    }

    if (/^\s*(?:[-*]|\d+\.)\s/.test(lines[i])) {
      const list: string[] = [];
      while (i < lines.length && lines[i].trim() && !headingInfo(lines[i])) list.push(lines[i++]);
      blocks.push(...splitListBlock(list));
      continue;
    }

    const paragraph: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !headingInfo(lines[i]) &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('>') &&
      !/^\s*(?:[-*]|\d+\.)\s/.test(lines[i]) &&
      lines[i].trim() !== '---' &&
      lines[i].trim() !== '***'
    ) {
      paragraph.push(lines[i++]);
    }
    if (paragraph.length) {
      const raw = paragraph.join('\n');
      for (const chunk of splitLongParagraph(raw)) {
        blocks.push({ raw: chunk, kind: 'paragraph', weight: 1 + chunk.length / 320 });
      }
    }
  }

  return blocks;
}

export function parseSlides(content: string): Slide[] {
  const blocks = tokenizeMarkdown(content);
  const slides: Slide[] = [];
  let currentBlocks: MarkdownBlock[] = [];
  let currentWeight = 0;
  let activeHeading: string | null = null;
  let activeHeadingLevel: number | null = null;

  const flush = () => {
    const raw = currentBlocks.map((block) => block.raw).join('\n\n').trim();
    if (raw) {
      slides.push({
        index: slides.length,
        raw,
        heading: activeHeading,
        headingLevel: activeHeadingLevel,
      });
    }
    currentBlocks = [];
    currentWeight = 0;
  };

  for (const block of blocks) {
    const isHeading = block.kind === 'heading';

    // Any heading should start a new slide if there is already non-heading content on the current slide,
    // or if we encounter a major heading (H1/H2) with existing blocks. This ensures clean topic transitions.
    if (isHeading) {
      const hasNonHeadingContent = currentBlocks.some((b) => b.kind !== 'heading' && b.kind !== 'rule');
      const isMajorHeading = (block.headingLevel ?? 6) <= 2;
      if (hasNonHeadingContent || (isMajorHeading && currentBlocks.length > 0)) {
        flush();
      }
      activeHeading = block.heading ?? activeHeading;
      activeHeadingLevel = block.headingLevel ?? activeHeadingLevel;
    }

    // Prevent orphaned headings:
    // If the current slide only contains headings (or heading + short intro text), NEVER trigger an overflow
    // split before adding the primary content (code block, image, diagram, table, etc.).
    const onlyHeadings = currentBlocks.every((b) => b.kind === 'heading' || b.kind === 'rule');
    const headingWithIntro =
      currentBlocks.length <= 2 &&
      currentBlocks[0]?.kind === 'heading' &&
      currentBlocks.slice(1).every((b) => (b.kind === 'paragraph' || b.kind === 'quote') && b.weight <= 3.5) &&
      (block.kind === 'code' || block.kind === 'image' || block.kind === 'table' || block.kind === 'list');

    const isStickyContent = onlyHeadings || headingWithIntro;

    const wouldOverflow =
      !isStickyContent &&
      currentBlocks.length > 0 &&
      (currentWeight + block.weight > MAX_SLIDE_WEIGHT || currentBlocks.length >= MAX_BLOCKS_PER_SLIDE);

    if (wouldOverflow) {
      flush();
    }

    currentBlocks.push(block);
    currentWeight += block.weight;

    // Flush after completing a major visual unit (heavy code block, image deck, large table)
    // ONLY if we also already have explanation or sufficient weight on the slide.
    const isHeavyVisual = block.kind === 'code' || block.kind === 'image' || block.kind === 'table';
    if (isHeavyVisual && (block.weight >= 7.0 || currentWeight >= 9.5)) {
      flush();
    }
  }

  flush();
  return slides.length ? slides : [{ index: 0, raw: content.trim(), heading: null, headingLevel: null }];
}
