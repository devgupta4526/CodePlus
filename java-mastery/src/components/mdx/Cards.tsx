'use client';

import { BookOpen } from 'lucide-react';

interface DefinitionCardProps {
  term: string;
  children: React.ReactNode;
}

export function DefinitionCard({ term, children }: DefinitionCardProps) {
  return (
    <div className="my-5 rounded-xl border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent)]/5 to-transparent overflow-hidden">
      <div className="px-4 py-3.5">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">
            Definition
          </span>
        </div>
        <p className="text-base font-semibold text-[var(--text-primary)] font-heading mb-1">
          {term}
        </p>
        <div className="text-sm text-[var(--text-secondary)] leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}

interface InterviewCardProps {
  children: React.ReactNode;
}

export function InterviewCard({ children }: InterviewCardProps) {
  return (
    <div className="my-5 rounded-xl border border-[var(--accent-secondary)]/20 bg-gradient-to-br from-[var(--accent-secondary)]/5 to-transparent overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--accent-secondary)]/10 flex items-center gap-2">
        <span className="text-lg">🎯</span>
        <span className="text-xs font-semibold text-[var(--accent-secondary)] uppercase tracking-wider">
          Interview Question
        </span>
      </div>
      <div className="px-4 py-3.5 text-sm text-[var(--text-secondary)] leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 [&>strong]:text-[var(--text-primary)]">
        {children}
      </div>
    </div>
  );
}

interface SummaryCardProps {
  children: React.ReactNode;
}

export function SummaryCard({ children }: SummaryCardProps) {
  return (
    <div className="my-5 rounded-xl border border-[var(--success)]/20 bg-gradient-to-br from-[var(--success)]/5 to-transparent overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--success)]/10 flex items-center gap-2">
        <span className="text-lg">📝</span>
        <span className="text-xs font-semibold text-[var(--success)] uppercase tracking-wider">
          Quick Summary
        </span>
      </div>
      <div className="px-4 py-3.5 text-sm text-[var(--text-secondary)] leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-1.5 [&>ul>li::marker]:text-[var(--success)]">
        {children}
      </div>
    </div>
  );
}
