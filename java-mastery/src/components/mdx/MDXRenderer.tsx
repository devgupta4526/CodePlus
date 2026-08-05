'use client';

import React, { useMemo } from 'react';
import { CodeBlock } from './CodeBlock';
import { Callout } from './Callout';
import { MermaidDiagram } from './MermaidDiagram';
import { DefinitionCard, InterviewCard, SummaryCard } from './Cards';
import { ExpandableSection } from './ExpandableSection';
import { type CalloutType } from '@/types';

interface MDXRendererProps {
  content: string;
  animated?: boolean;
}

/**
 * Transforms raw markdown content into rich React components.
 * Handles: code blocks, mermaid, callouts, tables, headings, etc.
 */
export function MDXRenderer({ content, animated = false }: MDXRendererProps) {
  const elements = useMemo(() => parseContent(content), [content]);

  return (
    <div className={`prose ${animated ? 'slide-reveal-group' : ''}`}>
      {animated
        ? elements.map((element, index) => (
            <div
              key={`reveal-${index}`}
              className="slide-reveal"
              style={{ '--reveal-index': index } as React.CSSProperties}
            >
              {element}
            </div>
          ))
        : elements}
    </div>
  );
}

// ── Parsing Engine ──────────────────────────────────────────────────────────

function parseContent(content: string): React.ReactNode[] {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let keyCounter = 0;

  const nextKey = () => `el-${keyCounter++}`;

  while (i < lines.length) {
    const line = lines[i];

    // ── Mermaid code blocks ───────────────────────────────────────────
    if (line.trim().startsWith('```mermaid')) {
      const blockLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        blockLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <MermaidDiagram key={nextKey()} chart={blockLines.join('\n')} />
      );
      continue;
    }

    // ── Code blocks ───────────────────────────────────────────────────
    if (line.trim().startsWith('```')) {
      const langMatch = line.trim().match(/^```(\w+)?/);
      const language = langMatch?.[1] || 'text';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```

      // Check if next section is an output block
      let output: string | undefined;
      const lookAhead = skipEmpty(lines, i);
      if (
        lookAhead < lines.length &&
        (lines[lookAhead].trim() === '**Output:**' ||
          lines[lookAhead].trim() === '**Output**' ||
          lines[lookAhead].trim().startsWith('**Output'))
      ) {
        i = lookAhead + 1;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          i++;
        }
        if (i < lines.length) {
          i++;
          const outputLines: string[] = [];
          while (i < lines.length && !lines[i].trim().startsWith('```')) {
            outputLines.push(lines[i]);
            i++;
          }
          i++;
          output = outputLines.join('\n');
        }
      }

      elements.push(
        <CodeBlock key={nextKey()} language={language} output={output}>
          {codeLines.join('\n')}
        </CodeBlock>
      );
      continue;
    }

    // ── GitHub-style callouts (> [!NOTE], etc.) ──────────────────────
    if (line.trim().match(/^>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/i)) {
      const typeMatch = line.match(/\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/i);
      const type = (typeMatch?.[1]?.toLowerCase() ?? 'note') as CalloutType;
      const calloutLines: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        calloutLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      elements.push(
        <Callout key={nextKey()} type={type}>
          <div dangerouslySetInnerHTML={{ __html: inlineMarkdown(calloutLines.join('\n')) }} />
        </Callout>
      );
      continue;
    }

    // ── Definition blockquote ────────────────────────────────────────
    if (line.trim().match(/^>\s*\*\*[^*]+\*\*/)) {
      const defLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        defLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      const text = defLines.join(' ');
      const termMatch = text.match(/\*\*([^*]+)\*\*/);
      const term = termMatch?.[1] ?? 'Definition';
      const body = text.replace(/\*\*[^*]+\*\*\s*/, '');
      elements.push(
        <DefinitionCard key={nextKey()} term={term}>
          <p dangerouslySetInnerHTML={{ __html: inlineMarkdown(body) }} />
        </DefinitionCard>
      );
      continue;
    }

    // ── Simple blockquote ────────────────────────────────────────────
    if (line.trim().startsWith('>') && !line.trim().startsWith('> [!')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      elements.push(
        <blockquote key={nextKey()}>
          <div dangerouslySetInnerHTML={{ __html: inlineMarkdown(quoteLines.join('\n')) }} />
        </blockquote>
      );
      continue;
    }

    // ── Tables ───────────────────────────────────────────────────────
    if (line.includes('|') && i + 1 < lines.length && lines[i + 1]?.match(/^\|?\s*[-:]+/)) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      elements.push(renderTable(tableLines, nextKey()));
      continue;
    }

    // ── Headings ─────────────────────────────────────────────────────
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].replace(/[📚📌☕🗂️🎨]/g, '').trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
      elements.push(
        <Tag key={nextKey()} id={id}>
          {text}
        </Tag>
      );
      i++;
      continue;
    }

    // ── Horizontal rule ──────────────────────────────────────────────
    if (line.trim() === '---' || line.trim() === '***') {
      elements.push(<hr key={nextKey()} />);
      i++;
      continue;
    }

    // ── Unordered list ───────────────────────────────────────────────
    if (line.match(/^\s*[-*]\s/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^\s*[-*]\s/)) {
        listItems.push(lines[i].replace(/^\s*[-*]\s/, ''));
        i++;
      }
      elements.push(
        <ul key={nextKey()}>
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }} />
          ))}
        </ul>
      );
      continue;
    }

    // ── Ordered list ─────────────────────────────────────────────────
    if (line.match(/^\s*\d+\.\s/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^\s*\d+\.\s/)) {
        listItems.push(lines[i].replace(/^\s*\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={nextKey()}>
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }} />
          ))}
        </ol>
      );
      continue;
    }

    // ── Empty lines ──────────────────────────────────────────────────
    if (line.trim() === '') {
      i++;
      continue;
    }

    // ── Paragraphs ───────────────────────────────────────────────────
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('>') &&
      !lines[i].trim().startsWith('---') &&
      !lines[i].trim().match(/^\|/) &&
      !lines[i].trim().match(/^\s*[-*]\s/) &&
      !lines[i].trim().match(/^\s*\d+\.\s/)
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      elements.push(
        <p key={nextKey()} dangerouslySetInnerHTML={{ __html: inlineMarkdown(paraLines.join(' ')) }} />
      );
    }
  }

  return elements;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function skipEmpty(lines: string[], start: number): number {
  let i = start;
  while (i < lines.length && lines[i].trim() === '') i++;
  return i;
}

function inlineMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/~~([^~]+)~~/g, '<del>$1</del>')
    ;
}

function renderTable(lines: string[], key: string): React.ReactNode {
  const parseRow = (line: string) =>
    line
      .split('|')
      .map((cell) => cell.trim())
      .filter(Boolean);

  const headers = parseRow(lines[0]);
  const rows = lines.slice(2).map(parseRow);

  return (
    <div key={key} className="my-5 overflow-x-auto rounded-xl border border-[var(--border-color)]">
      <table>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} dangerouslySetInnerHTML={{ __html: inlineMarkdown(header) }} />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} dangerouslySetInnerHTML={{ __html: inlineMarkdown(cell) }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
