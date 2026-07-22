'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Bookmark,
  Menu,
  ChevronRight,
  Target,
  GraduationCap,
  List
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { TableOfContents } from '@/components/layout/TableOfContents';
import { MDXRenderer } from '@/components/mdx/MDXRenderer';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { useProgress } from '@/hooks/useProgress';
import { type LessonMeta, type Heading, type Difficulty } from '@/types';

const difficultyColors: Record<Difficulty, string> = {
  beginner: 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20',
  intermediate: 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/20',
  advanced: 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20',
};

interface LessonClientProps {
  meta: LessonMeta;
  content: string;
  headings: Heading[];
  prev: LessonMeta | null;
  next: LessonMeta | null;
}

export function LessonClient({ meta, content, headings, prev, next }: LessonClientProps) {
  const readingProgress = useReadingProgress();
  const { isCompleted, isBookmarked, toggleComplete, toggleBookmark } = useProgress();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tocExpanded, setTocExpanded] = useState(false);

  const completed = isCompleted(meta.slug);
  const bookmarked = isBookmarked(meta.slug);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Reading Progress Bar */}
      <div
        className="reading-progress"
        style={{ width: `${readingProgress}%` }}
      />

      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content area */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Mobile sidebar toggle + Breadcrumb */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-9 h-9 rounded-[10px] border border-[var(--border-color)] bg-[var(--surface)] flex items-center justify-center cursor-pointer"
                aria-label="Open sidebar"
              >
                <Menu className="w-4 h-4 text-[var(--text-muted)]" />
              </button>

              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-[var(--accent)] transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/dashboard" className="hover:text-[var(--accent)] transition-colors">
                  Dashboard
                </Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[var(--accent)]">{meta.chapterTitle}</span>
              </nav>
            </div>

            {/* Lesson Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-[var(--accent)] bg-[var(--accent)]/10 px-2.5 py-1 rounded-lg">
                  CH {meta.chapter}
                </span>
                <span className="text-xs text-[var(--text-disabled)]">·</span>
                <span className="text-xs text-[var(--text-muted)]">
                  Lesson {meta.lesson}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3 text-[var(--text-primary)]">
                {meta.title}
              </h1>

              <p className="text-base text-[var(--text-muted)] mb-4">
                {meta.description}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${difficultyColors[meta.difficulty]}`}>
                  {meta.difficulty}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                  <Clock className="w-3.5 h-3.5" />
                  {meta.estimatedMinutes} min read
                </span>
                <button
                  onClick={() => toggleBookmark(meta.slug)}
                  className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'text-[var(--accent)] fill-[var(--accent)]' : ''}`} />
                  {bookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
                <button
                  onClick={() => toggleComplete(meta.slug)}
                  className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                    completed ? 'text-[var(--success)]' : 'text-[var(--text-muted)] hover:text-[var(--success)]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {completed ? 'Completed' : 'Mark complete'}
                </button>
              </div>
            </header>

            {/* Objectives */}
            {meta.objectives.length > 0 && (
              <div className="mb-8 p-5 rounded-2xl border border-[var(--accent)]/15 bg-[var(--accent)]/5">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-[var(--accent)]" />
                  <span className="text-sm font-semibold text-[var(--accent)] font-heading">
                    Learning Objectives
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {meta.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <GraduationCap className="w-3.5 h-3.5 text-[var(--accent)] mt-0.5 shrink-0" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Table of Contents - Top */}
            {headings.length > 0 && (
              <div className="mb-10 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] overflow-hidden">
                <button 
                  onClick={() => setTocExpanded(!tocExpanded)}
                  className="w-full flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[var(--surface-elevated)] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <List className="w-4 h-4 text-[var(--accent)]" />
                    <span className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                      On this page
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${tocExpanded ? 'rotate-90' : ''}`} />
                </button>
                
                {tocExpanded && (
                  <div className="px-5 pb-5 border-t border-[var(--border-color)] pt-4">
                    <TableOfContents headings={headings} />
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <div className="min-w-0">
              <MDXRenderer content={content} />
            </div>

            {/* Completion CTA */}
            <div className="mt-12 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] text-center">
              <p className="text-sm text-[var(--text-muted)] mb-3">
                Finished this lesson?
              </p>
              <button
                onClick={() => toggleComplete(meta.slug)}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                  completed
                    ? 'bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20'
                    : 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white shadow-lg shadow-[var(--accent)]/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {completed ? 'Completed ✓' : 'Mark as Complete'}
              </button>
            </div>

            {/* Prev/Next Navigation */}
            <nav className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Lesson navigation">
              {prev ? (
                <Link
                  href={`/lesson/${prev.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] hover:border-[var(--accent)]/20 transition-all"
                >
                  <ArrowLeft className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                  <div className="min-w-0">
                    <p className="text-xs text-[var(--text-muted)]">Previous</p>
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                      {prev.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/lesson/${next.slug}`}
                  className="group flex items-center justify-end gap-3 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] hover:border-[var(--accent)]/20 transition-all text-right"
                >
                  <div className="min-w-0">
                    <p className="text-xs text-[var(--text-muted)]">Next</p>
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                      {next.title}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
}
