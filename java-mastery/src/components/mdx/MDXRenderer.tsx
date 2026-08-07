'use client';

import React, { useMemo } from 'react';
import { CodeBlock } from './CodeBlock';
import { Callout } from './Callout';
import { MermaidDiagram } from './MermaidDiagram';
import { DefinitionCard, InterviewCard, SummaryCard } from './Cards';
import { ExpandableSection } from './ExpandableSection';
import { QuizCard } from './QuizCard';
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

    // ── Quiz code blocks ──────────────────────────────────────────────
    if (line.trim().startsWith('```quiz')) {
      const blockLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        blockLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      try {
        const jsonStr = blockLines.join('\n');
        const parsed = JSON.parse(jsonStr);
        const items = Array.isArray(parsed) ? parsed : [parsed];
        elements.push(
          <div key={nextKey()} className="space-y-4 my-6">
            {items.map((item, idx) => (
              <QuizCard
                key={idx}
                question={item.question || ''}
                options={item.options || []}
                correctIndex={typeof item.correctIndex === 'number' ? item.correctIndex : 0}
                explanation={item.explanation || ''}
              />
            ))}
          </div>
        );
      } catch (e) {
        elements.push(
          <div key={nextKey()} className="p-4 text-red-500 bg-red-50 rounded border border-red-200 text-xs font-mono">
            Failed to parse interactive quiz block.
          </div>
        );
      }
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
    if (line.trim().match(/^>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION|INFO|DANGER|INTERVIEW|BEST-PRACTICE)\]/i)) {
      const typeMatch = line.match(/\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION|INFO|DANGER|INTERVIEW|BEST-PRACTICE)\]/i);
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
      const rawText = headingMatch[2].replace(/[^\x20-\x7E]/g, ' ').replace(/\s+/g, ' ').trim();
      const text = rawText || headingMatch[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      if (level === 1) {
        elements.push(
          <h1 key={nextKey()} id={id} className="text-3xl font-heading font-bold text-[var(--text-primary)] my-6">
            {text}
          </h1>
        );
      } else if (level === 2) {
        elements.push(
          <h2 key={nextKey()} id={id} className="text-2xl font-heading font-bold text-[var(--text-primary)] mt-10 mb-4 border-b border-[var(--border-color)] pb-2">
            {text}
          </h2>
        );
      } else if (level === 3) {
        elements.push(
          <h3 key={nextKey()} id={id} className="text-xl font-heading font-semibold text-[var(--text-primary)] mt-8 mb-3">
            {text}
          </h3>
        );
      } else {
        const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
        elements.push(
          <Tag key={nextKey()} id={id} className="mt-6 mb-3 text-sm font-heading font-bold text-[var(--accent)] uppercase tracking-wider flex items-center gap-2">
            <span className="text-xs text-[var(--accent-secondary)]">◆</span> {text}
          </Tag>
        );
      }
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
        <div key={nextKey()} className="my-5 grid gap-3 sm:grid-cols-1">
          {listItems.map((item, idx) => {
            const isDefinition = item.includes('**') && (item.includes(':') || item.includes('—') || item.includes('–') || item.includes('-'));
            return (
              <div
                key={idx}
                className={`group flex items-start gap-3.5 p-4 rounded-xl border transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDefinition
                    ? 'bg-gradient-to-r from-[var(--surface)] to-[var(--surface-elevated)] border-l-4 border-l-[var(--accent)] border-y-[var(--border-color)] border-r-[var(--border-color)] hover:border-l-[var(--accent-hover)]'
                    : 'bg-[var(--surface)] border-[var(--border-color)] hover:bg-[var(--surface-elevated)] hover:border-[var(--accent)]/40'
                }`}
              >
                <div className={`mt-2 w-2 h-2 rounded-full shrink-0 transition-transform group-hover:scale-125 ${
                  isDefinition ? 'bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]' : 'bg-[var(--accent-secondary)]'
                }`} />
                <div
                  className="text-[15px] text-[var(--text-secondary)] leading-relaxed flex-1 [&>strong]:text-[var(--text-primary)] [&>strong]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }}
                />
              </div>
            );
          })}
        </div>
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
        <div key={nextKey()} className="my-6 space-y-3">
          {listItems.map((item, idx) => (
            <div
              key={idx}
              className="group flex items-start gap-4 p-4 rounded-xl border border-[var(--border-color)] bg-gradient-to-r from-[var(--surface)] via-[var(--surface)] to-[var(--surface-elevated)] hover:border-[var(--accent)]/50 transition-all shadow-sm"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] font-heading font-bold text-xs shrink-0 group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                {idx + 1}
              </span>
              <div
                className="text-[15px] text-[var(--text-secondary)] leading-relaxed flex-1 pt-0.5 [&>strong]:text-[var(--text-primary)] [&>strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }}
              />
            </div>
          ))}
        </div>
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
      const textContent = paraLines.join(' ');
      const isBoldTerm = /^(\*\*|<strong>)[^:*—–-]+(\*\*|<\/strong>)\s*[:-—–]/.test(textContent);
      if (isBoldTerm) {
        elements.push(
          <div key={nextKey()} className="my-5 p-4 rounded-xl border-l-4 border-l-[var(--accent-secondary)] bg-[var(--surface-elevated)]/50 border border-[var(--border-color)] shadow-sm">
            <p
              className="text-[15px] text-[var(--text-secondary)] leading-relaxed m-0 [&>strong]:text-[var(--text-primary)] [&>strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(textContent) }}
            />
          </div>
        );
      } else {
        elements.push(
          <p
            key={nextKey()}
            className="text-[15px] text-[var(--text-secondary)] leading-relaxed my-4 [&>strong]:text-[var(--text-primary)] [&>strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: inlineMarkdown(textContent) }}
          />
        );
      }
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
