'use client';

/**
 * ReadingModeToggle.tsx
 *
 * A compact radio-style toggle that lets the user switch between
 * "Continuous" (default) and "Slides" reading modes.
 *
 * Usage:
 *   <ReadingModeToggle mode={readingMode} onChange={setReadingMode} />
 */

import React from 'react';
import { AlignLeft, GalleryHorizontalEnd } from 'lucide-react';

export type ReadingMode = 'continuous' | 'slides';

interface ReadingModeToggleProps {
  mode: ReadingMode;
  onChange: (mode: ReadingMode) => void;
}

const OPTIONS: { value: ReadingMode; label: string; Icon: React.ElementType }[] = [
  { value: 'continuous', label: 'Continuous', Icon: AlignLeft },
  { value: 'slides',     label: 'Slides',     Icon: GalleryHorizontalEnd },
];

export function ReadingModeToggle({ mode, onChange }: ReadingModeToggleProps) {
  return (
    <div
      className="reading-mode-toggle"
      role="radiogroup"
      aria-label="Reading mode"
    >
      <span className="reading-mode-label">Reading Mode</span>
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = mode === value;
        return (
          <button
            key={value}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(value)}
            className={`reading-mode-option ${active ? 'reading-mode-option-active' : ''}`}
            title={`Switch to ${label} mode`}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
