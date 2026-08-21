'use client';

import { ArrowRight, Check, Clock3, LockKeyhole } from 'lucide-react';

export interface CourseCardData {
  id: string;
  emoji: string;
  label: string;
  sublabel: string;
  description: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  totalLessons: number;
  totalHours: number;
  totalChapters: number;
  isPremium: boolean;
  priceInr: number;
  students: number;
  rating: number;
  level: string;
  tags: string[];
}

interface CourseCardProps {
  course: CourseCardData;
  index: number;
  isEnrolled: boolean;
  isActive: boolean;
  completedCount: number;
  onSelect: () => void;
  onEnroll: () => Promise<void>;
  isLoggedIn: boolean;
}

export function CourseCard({
  course,
  index,
  isEnrolled,
  completedCount,
  onSelect,
  onEnroll,
  isLoggedIn,
}: CourseCardProps) {
  const progress = course.totalLessons > 0
    ? Math.round((completedCount / course.totalLessons) * 100)
    : 0;

  return (
    <article className="group border-t border-[var(--border-color)] py-6 sm:py-8 last:border-b">
      <div className="grid gap-5 sm:grid-cols-[56px_minmax(0,1fr)_190px] sm:gap-7">
        <div className="font-mono text-xs text-[var(--text-disabled)]">
          {String(index + 1).padStart(2, '0')}
        </div>

        <button onClick={onSelect} className="min-w-0 text-left cursor-pointer">
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
              {course.level}
            </span>
            {course.isPremium ? (
              <span className="border-l border-[var(--border-color)] pl-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Full access
              </span>
            ) : null}
          </div>
          <h3 className="max-w-2xl text-xl font-heading font-semibold tracking-[-0.025em] text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)] sm:text-2xl">
            {course.label}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">
            {course.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-disabled)]">
            <span>{course.totalChapters} chapters</span>
            <span>{course.totalLessons} lessons</span>
            <span>{course.tags.slice(0, 3).join(' / ')}</span>
          </div>
        </button>

        <div className="flex flex-col justify-between gap-5 sm:items-end">
          <div className="w-full sm:text-right">
            <div className="flex items-center justify-between text-xs sm:justify-end sm:gap-4">
              <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)]">
                <Clock3 className="h-3.5 w-3.5" /> {course.totalHours}h
              </span>
              <span className="font-mono text-[var(--text-primary)]">
                {isEnrolled ? `${progress}% complete` : course.isPremium ? `₹${(course.priceInr / 100).toLocaleString('en-IN')}` : 'Open access'}
              </span>
            </div>
            {isEnrolled ? (
              <div className="mt-3 h-px w-full overflow-hidden bg-[var(--border-color)] sm:ml-auto sm:w-36">
                <div className="h-full bg-[var(--accent)]" style={{ width: `${progress}%` }} />
              </div>
            ) : null}
          </div>

          {isEnrolled ? (
            <button onClick={onSelect} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]">
              <Check className="h-4 w-4" /> Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => void onEnroll()}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
            >
              {course.isPremium ? <LockKeyhole className="h-4 w-4" /> : null}
              {isLoggedIn ? (course.isPremium ? 'Request access' : 'Enroll free') : 'Sign in to enroll'}
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
