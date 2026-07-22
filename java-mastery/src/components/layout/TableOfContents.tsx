'use client';

import { useScrollSpy } from '@/hooks/useScrollSpy';
import { type Heading } from '@/types';

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const activeId = useScrollSpy(headings);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2" aria-label="Table of contents">
      <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
        On this page
      </p>
      <ul className="space-y-0.5">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block text-[13px] leading-relaxed py-1 border-l-2 transition-all duration-200 ${
                heading.level === 2 ? 'pl-3' : heading.level === 3 ? 'pl-5' : 'pl-7'
              } ${
                activeId === heading.id
                  ? 'border-l-[var(--accent)] text-[var(--accent)] font-medium'
                  : 'border-l-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-l-[var(--border-color)]'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
