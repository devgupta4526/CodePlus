'use client';

import Link from 'next/link';
import { ArrowRight, Clock3 } from 'lucide-react';

interface ContinueLearningProps {
  slug: string;
  title: string;
  courseLabel: string;
  courseEmoji: string;
  accentColor: string;
  accentBg: string;
  estimatedMinutes: number;
  completedCount: number;
  totalLessons: number;
}

export function ContinueLearning({
  slug,
  title,
  courseLabel,
  estimatedMinutes,
  completedCount,
  totalLessons,
}: ContinueLearningProps) {
  const progress = Math.round((completedCount / Math.max(totalLessons, 1)) * 100);

  return (
    <section className="grid border-y border-[var(--text-primary)] bg-[var(--bg-secondary)] sm:grid-cols-[1fr_auto]" aria-labelledby="continue-title">
      <div className="p-6 sm:p-8">
        <p className="section-kicker">Current session</p>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">{courseLabel}</p>
        <h2 id="continue-title" className="mt-2 text-2xl font-heading font-semibold tracking-[-0.035em] sm:text-3xl">{title}</h2>
        <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-2"><Clock3 className="h-3.5 w-3.5" /> {estimatedMinutes} minute lesson</span>
          <span>{progress}% of course complete</span>
        </div>
      </div>
      <Link
        href={`/lesson/${slug}`}
        className="group flex min-h-20 items-center justify-between gap-8 border-t border-[var(--border-color)] px-6 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--text-primary)] hover:text-[var(--bg)] sm:min-w-56 sm:border-l sm:border-t-0 sm:px-8"
      >
        Resume lesson
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </section>
  );
}
