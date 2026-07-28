'use client';

import Link from 'next/link';
import {
  Clock,
  BookOpen,
  ChevronRight,
  CheckCircle2,
  Circle,
  BarChart3,
  Bookmark,
  Filter,
  ChevronDown,
  ChevronUp,
  PanelLeftClose,
  PanelLeftOpen,
  Lock,
  LogIn,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { getChaptersWithLessons, getCourseStats } from '@/data/course';
import { useProgress } from '@/hooks/useProgress';
import { useEnrollment } from '@/hooks/useEnrollment';
import { useState } from 'react';
import { type Difficulty } from '@/types';

// Which courses require enrollment to track progress
const PREMIUM_COURSES = new Set(['springboot', 'python']);

// ── Difficulty badge colours ──────────────────────────────────────────────────

const difficultyColors: Record<Difficulty, string> = {
  beginner:     'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20',
  intermediate: 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/20',
  advanced:     'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20',
};

// ── Course catalog ────────────────────────────────────────────────────────────

type CourseId = 'java' | 'coa' | 'python' | 'springboot';

interface CourseEntry {
  id: CourseId;
  emoji: string;
  label: string;
  sublabel: string;
  accentColor: string;        // CSS value used for progress bar & active ring
  available: boolean;
}

const COURSES: CourseEntry[] = [
  {
    id: 'java',
    emoji: '☕',
    label: 'Java Foundations',
    sublabel: 'Core · OOP · JVM · Collections',
    accentColor: 'var(--accent)',
    available: true,
  },
  {
    id: 'coa',
    emoji: '💻',
    label: 'Computer Organization & Architecture',
    sublabel: 'CPU · Cache · Pipelining · DMA · Assembly',
    accentColor: '#8b5cf6',
    available: true,
  },
  {
    id: 'springboot',
    emoji: '🍃',
    label: 'Spring Boot',
    sublabel: 'REST APIs · Security · JPA',
    accentColor: '#1baf7a',
    available: true,
  },
  {
    id: 'python',
    emoji: '🐍',
    label: 'Python & Django',
    sublabel: '60-day full-stack path',
    accentColor: '#2a78d6',
    available: true,
  },
];


// ── Page ──────────────────────────────────────────────────────────────────────

// Premium course enrollment CTA shown inside lesson list when not enrolled
function EnrollBanner({ courseId, courseName, onEnroll, user }: {
  courseId: string;
  courseName: string;
  onEnroll: () => void;
  user: { id: string } | null;
}) {
  const [enrolling, setEnrolling] = useState(false);
  const isPremium = PREMIUM_COURSES.has(courseId);

  if (!user) {
    return (
      <div className="mb-6 p-5 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 flex items-center gap-4">
        <LogIn className="w-5 h-5 text-[var(--accent)] shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--text-primary)]">Sign in to track your progress</p>
          <p className="text-xs text-[var(--text-muted)]">Create a free account to save completions, bookmarks & streaks.</p>
        </div>
        <Link href="/login" className="shrink-0 px-4 py-1.5 rounded-xl text-sm font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-6 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] flex items-center gap-4">
      {isPremium ? <Lock className="w-5 h-5 text-[var(--accent-secondary)] shrink-0" /> : <BookOpen className="w-5 h-5 text-[var(--success)] shrink-0" />}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--text-primary)]">
          {isPremium ? `Enroll to unlock all ${courseName} lessons` : `Enroll in ${courseName}`}
        </p>
        <p className="text-xs text-[var(--text-muted)]">
          {isPremium ? 'First 3 lessons are free. Enroll to get full access.' : 'Free course — enroll to track your progress.'}
        </p>
      </div>
      <button
        onClick={async () => { setEnrolling(true); await onEnroll(); setEnrolling(false); }}
        disabled={enrolling}
        className="shrink-0 px-4 py-1.5 rounded-xl text-sm font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-60 cursor-pointer"
      >
        {enrolling ? 'Enrolling…' : 'Enroll Free'}
      </button>
    </div>
  );
}

export default function DashboardPage() {
  const [activeCourse, setActiveCourse] = useState<CourseId>('java');
  const [filter, setFilter] = useState<'all' | 'bookmarked' | 'incomplete'>('all');
  const [collapsedChapters, setCollapsedChapters] = useState<Set<number>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const chapters = getChaptersWithLessons(activeCourse);
  const courseStats = getCourseStats(activeCourse);
  const { isCompleted, isBookmarked, toggleComplete, toggleBookmark } = useProgress();
  const { user, isEnrolled, enroll, loading: enrollLoading } = useEnrollment();

  const activeMeta = COURSES.find((c) => c.id === activeCourse)!;
  const enrolled = isEnrolled(activeCourse);

  const courseCompletedCount = chapters.reduce(
    (total, ch) => total + ch.lessons.filter((l) => isCompleted(l.slug)).length,
    0,
  );
  const progressPercent =
    courseStats.totalLessons > 0
      ? Math.round((courseCompletedCount / courseStats.totalLessons) * 100)
      : 0;

  function toggleChapter(num: number) {
    setCollapsedChapters((prev) => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      <div className="flex max-w-[1280px] mx-auto">

        {/* ── Left sidebar: course catalog ─────────────────────────────── */}
        <aside className={`hidden md:flex flex-col shrink-0 min-h-[calc(100vh-4rem)] border-r border-[var(--border-color)] bg-[var(--bg-secondary)] transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-12'}`}>
          <div className={`flex items-center border-b border-[var(--border-color)] ${sidebarOpen ? 'p-5 justify-between' : 'p-2 justify-center'}`}>
            {sidebarOpen && (
              <p className="text-xs font-bold text-[var(--text-disabled)] uppercase tracking-widest">
                My Courses
              </p>
            )}
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="p-1 rounded-lg hover:bg-[var(--surface)] transition-colors cursor-pointer text-[var(--text-muted)]"
              title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {COURSES.map((course) => {
              const isActive = course.id === activeCourse;
              const stats = getCourseStats(course.id);
              const completed = getChaptersWithLessons(course.id).reduce(
                (t, ch) => t + ch.lessons.filter((l) => isCompleted(l.slug)).length,
                0,
              );
              const pct = stats.totalLessons > 0 ? Math.round((completed / stats.totalLessons) * 100) : 0;

              return (
                <button
                  key={course.id}
                  onClick={() => { setActiveCourse(course.id); setFilter('all'); }}
                  disabled={!course.available}
                  title={course.label}
                  className={`w-full text-left rounded-xl transition-all cursor-pointer group ${
                    sidebarOpen ? 'px-3 py-3' : 'p-2 flex justify-center'
                  } ${
                    isActive
                      ? 'bg-[var(--surface-elevated)] ring-1 ring-[var(--border-color)]'
                      : 'hover:bg-[var(--surface)] disabled:opacity-40 disabled:cursor-not-allowed'
                  }`}
                >
                  {sidebarOpen ? (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{course.emoji}</span>
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-semibold truncate ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                            {course.label}
                          </p>
                          <p className="text-[10px] text-[var(--text-disabled)] truncate">{course.sublabel}</p>
                        </div>
                      </div>
                      <div className="w-full h-1 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: isActive ? course.accentColor : 'var(--text-disabled)' }} />
                      </div>
                      <p className="text-[10px] text-[var(--text-disabled)] mt-1">{pct}% · {completed}/{stats.totalLessons} lessons</p>
                    </>
                  ) : (
                    <span className="text-xl">{course.emoji}</span>
                  )}
                </button>
              );
            })}

            {/* Coming-soon placeholders */}
            {sidebarOpen && (
              <div className="pt-3 border-t border-[var(--border-color)] mt-3 space-y-1">
                {[
                  { emoji: '🧠', label: 'DSA Masterclass', href: '/roadmap' },
                  { emoji: '⚡', label: 'System Design', href: '#' },
                  { emoji: '🔒', label: 'Aptitude & OA', href: '#' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[var(--text-disabled)] hover:text-[var(--text-muted)] hover:bg-[var(--surface)] transition-all"
                  >
                    <span>{item.emoji}</span>
                    <span className="truncate">{item.label}</span>
                    {item.href === '#' && (
                      <span className="ml-auto text-[9px] uppercase tracking-wider border border-[var(--border-color)] rounded-full px-1.5 py-0.5 text-[var(--text-disabled)]">
                        Soon
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </nav>
        </aside>

        {/* ── Main content ─────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 py-8">

          {/* Enrollment banner — shown when not yet enrolled (and not loading) */}
          {!enrollLoading && !enrolled && (
            <EnrollBanner
              courseId={activeCourse}
              courseName={activeMeta.label}
              onEnroll={() => enroll(activeCourse)}
              user={user}
            />
          )}

          {/* Course header */}
          <motion.div
            key={activeCourse}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-1">
              <span className="text-3xl">{activeMeta.emoji}</span>
              <div>
                <h1 className="text-2xl font-heading font-bold text-[var(--text-primary)]">
                  {activeMeta.label}
                </h1>
                <p className="text-sm text-[var(--text-muted)]">
                  {courseStats.totalLessons} lessons · {courseStats.totalChapters} chapters · ~{courseStats.totalDurationHours}h
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mobile course switcher */}
          <div className="md:hidden flex gap-2 mb-6 overflow-x-auto pb-1">
            {COURSES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCourse(c.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  c.id === activeCourse
                    ? 'border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--text-primary)]'
                    : 'border-[var(--border-color)] text-[var(--text-muted)]'
                }`}
              >
                <span>{c.emoji}</span> {c.label}
              </button>
            ))}
          </div>

          {/* Progress card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-6 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-sm font-semibold text-[var(--text-primary)]">Progress</span>
              </div>
              <span className="text-sm font-bold" style={{ color: activeMeta.accentColor }}>
                {courseCompletedCount} / {courseStats.totalLessons}
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: activeMeta.accentColor }}
              />
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-2">
              {progressPercent}% complete
            </p>
          </motion.div>

          {/* Filter strip */}
          <div className="flex items-center gap-2 mb-6">
            {([ 
              { key: 'all'        as const, label: 'All Lessons', icon: BookOpen },
              { key: 'bookmarked' as const, label: 'Bookmarked',  icon: Bookmark },
              { key: 'incomplete' as const, label: 'Incomplete',  icon: Filter },
            ] as const).map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                  filter === f.key
                    ? 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20'
                    : 'bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--accent)]/30'
                }`}
              >
                <f.icon className="w-3 h-3" />
                {f.label}
              </button>
            ))}
          </div>

          {/* Chapter → lesson tree */}
          <div className="space-y-5">
            {chapters.map((chapter, chapterIdx) => {
              const filteredLessons = chapter.lessons.filter((lesson) => {
                if (filter === 'bookmarked') return isBookmarked(lesson.slug);
                if (filter === 'incomplete') return !isCompleted(lesson.slug);
                return true;
              });
              if (filteredLessons.length === 0) return null;

              const chapterCompleted = chapter.lessons.filter((l) => isCompleted(l.slug)).length;
              const chapterPct = Math.round((chapterCompleted / chapter.lessons.length) * 100);
              const isCollapsed = collapsedChapters.has(chapter.number);

              return (
                <motion.div
                  key={chapter.number}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + chapterIdx * 0.04 }}
                  className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] overflow-hidden"
                >
                  {/* Chapter header — clickable collapse */}
                  <button
                    onClick={() => toggleChapter(chapter.number)}
                    className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer text-left"
                  >
                    {/* Chapter number badge */}
                    <span className="shrink-0 text-xs font-bold px-2 py-1 rounded-lg"
                      style={{ background: activeMeta.accentColor + '22', color: activeMeta.accentColor }}>
                      CH {chapter.number}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                        {chapter.title}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">{chapter.description}</p>
                    </div>

                    {/* Mini chapter progress */}
                    <div className="hidden sm:flex items-center gap-3 shrink-0">
                      <div className="w-20 h-1.5 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${chapterPct}%`, background: activeMeta.accentColor }} />
                      </div>
                      <span className="text-xs text-[var(--text-muted)] w-12 text-right">
                        {chapterCompleted}/{chapter.lessons.length}
                      </span>
                    </div>

                    {isCollapsed
                      ? <ChevronDown className="w-4 h-4 text-[var(--text-disabled)] shrink-0" />
                      : <ChevronUp   className="w-4 h-4 text-[var(--text-disabled)] shrink-0" />
                    }
                  </button>

                  {/* Lesson rows */}
                  {!isCollapsed && (
                    <div className="border-t border-[var(--border-color)] divide-y divide-[var(--border-color)]">
                      {filteredLessons.map((lesson) => {
                        const completed = isCompleted(lesson.slug);
                        const bookmarked = isBookmarked(lesson.slug);

                        return (
                          <div
                            key={lesson.slug}
                            className="group flex items-center gap-4 px-5 py-3.5 hover:bg-[var(--surface-elevated)] transition-colors"
                          >
                            {/* Completion toggle */}
                            <button
                              onClick={() => toggleComplete(lesson.slug)}
                              className="shrink-0 cursor-pointer"
                              aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
                            >
                              {completed ? (
                                <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
                              ) : (
                                <Circle className="w-5 h-5 text-[var(--text-disabled)] hover:text-[var(--accent)]" />
                              )}
                            </button>

                            {/* Lesson number */}
                            <span className="shrink-0 text-xs text-[var(--text-disabled)] w-6 text-right font-mono">
                              {lesson.lesson}
                            </span>

                            {/* Info */}
                            <Link href={`/lesson/${lesson.slug}`} className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <h3 className={`text-sm font-medium truncate ${completed ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-primary)]'}`}>
                                  {lesson.title}
                                </h3>
                                <span className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium border ${difficultyColors[lesson.difficulty]}`}>
                                  {lesson.difficulty}
                                </span>
                              </div>
                              <p className="text-xs text-[var(--text-muted)] truncate">{lesson.description}</p>
                            </Link>

                            {/* Meta */}
                            <div className="hidden sm:flex items-center gap-3 shrink-0">
                              <span className="flex items-center gap-1 text-xs text-[var(--text-disabled)]">
                                <Clock className="w-3 h-3" />
                                {lesson.estimatedMinutes}m
                              </span>
                              <button
                                onClick={() => toggleBookmark(lesson.slug)}
                                className="cursor-pointer"
                                aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
                              >
                                <Bookmark className={`w-4 h-4 transition-colors ${bookmarked ? 'text-[var(--accent)] fill-[var(--accent)]' : 'text-[var(--text-disabled)] hover:text-[var(--accent)]'}`} />
                              </button>
                              <Link href={`/lesson/${lesson.slug}`}>
                                <ChevronRight className="w-4 h-4 text-[var(--text-disabled)] group-hover:text-[var(--accent)] transition-colors" />
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              );
            })}

            {chapters.length === 0 && (
              <div className="text-center py-20 border border-dashed border-[var(--border-color)] rounded-2xl bg-[var(--surface)]">
                <div className="w-16 h-16 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center mx-auto mb-4 text-2xl">
                  🚧
                </div>
                <h3 className="text-lg font-heading font-semibold text-[var(--text-primary)] mb-2">
                  Course in Development
                </h3>
                <p className="text-[var(--text-muted)] max-w-sm mx-auto">
                  We&apos;re currently building the lessons for this course. Check back soon!
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
