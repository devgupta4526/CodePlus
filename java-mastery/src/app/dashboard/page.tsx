'use client';

import Link from 'next/link';
import {
  BookOpen, ChevronRight, CheckCircle2, Circle, BarChart3, Bookmark,
  Filter, ChevronDown, ChevronUp, LogIn, GraduationCap, Sparkles,
  ArrowRight, LayoutGrid, List as ListIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { getChaptersWithLessons, getCourseStats } from '@/data/course';
import { useProgress } from '@/hooks/useProgress';
import { useEnrollment } from '@/hooks/useEnrollment';
import { useState, useMemo } from 'react';
import { type Difficulty } from '@/types';
import { CourseCard, type CourseCardData } from '@/components/dashboard/CourseCard';
import { StatsBar } from '@/components/dashboard/StatsBar';
import { ContinueLearning } from '@/components/dashboard/ContinueLearning';

// ── Difficulty badge ─────────────────────────────────────────────────────────

const difficultyColors: Record<Difficulty, string> = {
  beginner:     'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20',
  intermediate: 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/20',
  advanced:     'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20',
};

type CourseId = 'java' | 'coa' | 'python' | 'springboot' | 'ibps-so-it' | 'quants' | 'reasoning' | 'english';

// ── Full course catalog with marketplace metadata ────────────────────────────

const COURSES: CourseCardData[] = [
  {
    id: 'java',
    emoji: '☕',
    label: 'Java Foundations',
    sublabel: 'Core · OOP · JVM · Collections',
    description: 'Master Java from the ground up. Learn core language features, object-oriented design, generics, streams, and modern Java 21 APIs.',
    accentColor: '#F97316',
    accentBg: 'rgba(249,115,22,0.08)',
    accentBorder: 'rgba(249,115,22,0.2)',
    totalLessons: 47,
    totalHours: 38,
    totalChapters: 8,
    isPremium: false,
    priceInr: 0,
    students: 2841,
    rating: 4.9,
    level: 'Beginner → Advanced',
    tags: ['OOP', 'JVM', 'Streams', 'Concurrency'],
  },
  {
    id: 'springboot',
    emoji: '🍃',
    label: 'Spring Boot Mastery',
    sublabel: 'REST APIs · Security · JPA · Microservices',
    description: 'Build production-grade backends with Spring Boot. REST APIs, Spring Security, JPA/Hibernate, JWT auth, and microservices architecture.',
    accentColor: '#22C55E',
    accentBg: 'rgba(34,197,94,0.08)',
    accentBorder: 'rgba(34,197,94,0.2)',
    totalLessons: 52,
    totalHours: 30,
    totalChapters: 10,
    isPremium: true,
    priceInr: 49900,
    students: 1249,
    rating: 4.8,
    level: 'Intermediate → Advanced',
    tags: ['REST', 'JWT', 'JPA', 'Microservices'],
  },
  {
    id: 'coa',
    emoji: '💻',
    label: 'Computer Organization & Architecture',
    sublabel: 'CPU · Cache · Pipelining · DMA · Assembly',
    description: 'Understand how computers work at the hardware level. CPU design, memory hierarchy, pipelining, instruction sets, and I/O.',
    accentColor: '#8B5CF6',
    accentBg: 'rgba(139,92,246,0.08)',
    accentBorder: 'rgba(139,92,246,0.2)',
    totalLessons: 7,
    totalHours: 5,
    totalChapters: 2,
    isPremium: false,
    priceInr: 0,
    students: 934,
    rating: 4.7,
    level: 'Core Computer Science',
    tags: ['CPU', 'Cache', 'Assembly', 'Pipelining'],
  },
  {
    id: 'python',
    emoji: '🐍',
    label: 'Python & Django',
    sublabel: '60-day full-stack path · Django · DRF',
    description: 'Go from Python basics to full-stack web development with Django and Django REST Framework in a structured 60-day curriculum.',
    accentColor: '#38BDF8',
    accentBg: 'rgba(56,189,248,0.08)',
    accentBorder: 'rgba(56,189,248,0.2)',
    totalLessons: 24,
    totalHours: 20,
    totalChapters: 6,
    isPremium: true,
    priceInr: 49900,
    students: 742,
    rating: 4.8,
    level: 'Beginner → Full Stack',
    tags: ['Django', 'DRF', 'ORM', 'APIs'],
  },
  {
    id: 'ibps-so-it',
    emoji: '🏛️',
    label: 'IBPS SO IT Officer',
    sublabel: 'Professional Knowledge · DBMS · OS · Networking',
    description: 'Complete preparation for IBPS SO IT Officer Professional Knowledge paper with topic-wise notes, MCQs, and practice sets.',
    accentColor: '#3B82F6',
    accentBg: 'rgba(59,130,246,0.08)',
    accentBorder: 'rgba(59,130,246,0.2)',
    totalLessons: 13,
    totalHours: 12,
    totalChapters: 5,
    isPremium: false,
    priceInr: 0,
    students: 3201,
    rating: 4.9,
    level: 'Exam Preparation',
    tags: ['DBMS', 'Networking', 'OS', 'Security'],
  },
  {
    id: 'quants',
    emoji: '📐',
    label: 'Quantitative Aptitude',
    sublabel: 'Arithmetic · Geometry · Algebra · Statistics',
    description: 'Crack aptitude rounds with structured quants preparation covering arithmetic, geometry, data interpretation, and statistics.',
    accentColor: '#F59E0B',
    accentBg: 'rgba(245,158,11,0.08)',
    accentBorder: 'rgba(245,158,11,0.2)',
    totalLessons: 20,
    totalHours: 10,
    totalChapters: 4,
    isPremium: false,
    priceInr: 0,
    students: 1876,
    rating: 4.6,
    level: 'Aptitude · All Levels',
    tags: ['Arithmetic', 'Geometry', 'Statistics', 'DI'],
  },
  {
    id: 'reasoning',
    emoji: '🧠',
    label: 'Reasoning',
    sublabel: 'Verbal · Non-Verbal · Analytical · Logical',
    description: 'Strengthen logical and analytical reasoning skills with pattern-based exercises, puzzles, and systematic approaches.',
    accentColor: '#EC4899',
    accentBg: 'rgba(236,72,153,0.08)',
    accentBorder: 'rgba(236,72,153,0.2)',
    totalLessons: 15,
    totalHours: 8,
    totalChapters: 4,
    isPremium: false,
    priceInr: 0,
    students: 1543,
    rating: 4.7,
    level: 'Aptitude · All Levels',
    tags: ['Syllogisms', 'Coding', 'Analogies', 'Series'],
  },
  {
    id: 'english',
    emoji: '📘',
    label: 'English Vocabulary',
    sublabel: 'One Word Substitution · Idioms · Grammar · RC',
    description: 'Build strong vocabulary and grammar skills essential for competitive exams with curated word lists and reading comprehension practice.',
    accentColor: '#0EA5E9',
    accentBg: 'rgba(14,165,233,0.08)',
    accentBorder: 'rgba(14,165,233,0.2)',
    totalLessons: 9,
    totalHours: 5,
    totalChapters: 3,
    isPremium: false,
    priceInr: 0,
    students: 987,
    rating: 4.5,
    level: 'All Levels',
    tags: ['Grammar', 'Vocabulary', 'Idioms', 'RC'],
  },
];

// ── Lesson tree (chapter view) ───────────────────────────────────────────────

type FilterKey = 'all' | 'bookmarked' | 'incomplete';

function LessonTreeView({
  courseId,
  accentColor,
  isCompleted,
  isBookmarked,
  toggleComplete,
  toggleBookmark,
}: {
  courseId: string;
  accentColor: string;
  isCompleted: (slug: string) => boolean;
  isBookmarked: (slug: string) => boolean;
  toggleComplete: (slug: string) => void;
  toggleBookmark: (slug: string) => void;
}) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [collapsedChapters, setCollapsedChapters] = useState<Set<number>>(new Set());

  const chapters = getChaptersWithLessons(courseId);
  const courseStats = getCourseStats(courseId);
  const completedCount = chapters.reduce(
    (t, ch) => t + ch.lessons.filter((l) => isCompleted(l.slug)).length, 0
  );
  const pct = courseStats.totalLessons > 0
    ? Math.round((completedCount / courseStats.totalLessons) * 100) : 0;

  function toggleChapter(num: number) {
    setCollapsedChapters((prev) => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });
  }

  return (
    <div>
      {/* Progress + filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]">
        <div className="flex items-center gap-3 flex-1">
          <BarChart3 className="w-4 h-4 text-[var(--accent)]" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[var(--text-primary)]">Course Progress</span>
              <span className="text-xs font-bold" style={{ color: accentColor }}>
                {completedCount}/{courseStats.totalLessons}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: accentColor }}
              />
            </div>
            <p className="text-[10px] text-[var(--text-muted)] mt-1">{pct}% complete</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {([
            { key: 'all' as const, label: 'All', icon: BookOpen },
            { key: 'bookmarked' as const, label: 'Saved', icon: Bookmark },
            { key: 'incomplete' as const, label: 'To Do', icon: Filter },
          ]).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
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
      </div>

      {/* Chapter tree */}
      <div className="space-y-3">
        {chapters.map((chapter, ci) => {
          const filteredLessons = chapter.lessons.filter((lesson) => {
            if (filter === 'bookmarked') return isBookmarked(lesson.slug);
            if (filter === 'incomplete') return !isCompleted(lesson.slug);
            return true;
          });
          if (filteredLessons.length === 0) return null;

          const chCompleted = chapter.lessons.filter((l) => isCompleted(l.slug)).length;
          const chPct = Math.round((chCompleted / chapter.lessons.length) * 100);
          const collapsed = collapsedChapters.has(chapter.number);

          return (
            <motion.div
              key={chapter.number}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.04 }}
              className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] overflow-hidden"
            >
              <button
                onClick={() => toggleChapter(chapter.number)}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer text-left"
              >
                <span
                  className="shrink-0 text-xs font-bold px-2 py-1 rounded-lg"
                  style={{ background: accentColor + '22', color: accentColor }}
                >
                  CH {chapter.number}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{chapter.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">{chapter.description}</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 shrink-0">
                  <div className="w-16 h-1.5 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${chPct}%`, background: accentColor }} />
                  </div>
                  <span className="text-xs text-[var(--text-muted)] w-10 text-right">{chCompleted}/{chapter.lessons.length}</span>
                </div>
                {collapsed
                  ? <ChevronDown className="w-4 h-4 text-[var(--text-disabled)] shrink-0" />
                  : <ChevronUp className="w-4 h-4 text-[var(--text-disabled)] shrink-0" />
                }
              </button>

              {!collapsed && (
                <div className="border-t border-[var(--border-color)] divide-y divide-[var(--border-color)]">
                  {filteredLessons.map((lesson) => {
                    const completed = isCompleted(lesson.slug);
                    const bookmarked = isBookmarked(lesson.slug);
                    return (
                      <div
                        key={lesson.slug}
                        className="group flex items-center gap-3 px-5 py-3.5 hover:bg-[var(--surface-elevated)] transition-colors"
                      >
                        <button
                          onClick={() => toggleComplete(lesson.slug)}
                          className="shrink-0 cursor-pointer"
                          aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
                        >
                          {completed
                            ? <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
                            : <Circle className="w-5 h-5 text-[var(--text-disabled)] hover:text-[var(--accent)]" />
                          }
                        </button>
                        <span className="shrink-0 text-xs text-[var(--text-disabled)] w-5 text-right font-mono">
                          {lesson.lesson}
                        </span>
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
                        <div className="hidden sm:flex items-center gap-3 shrink-0">
                          <span className="flex items-center gap-1 text-xs text-[var(--text-disabled)]">
                            ~{lesson.estimatedMinutes}m
                          </span>
                          <button
                            onClick={() => toggleBookmark(lesson.slug)}
                            className="cursor-pointer"
                            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
                          >
                            <Bookmark
                              className={`w-4 h-4 transition-colors ${bookmarked ? 'text-[var(--accent)] fill-[var(--accent)]' : 'text-[var(--text-disabled)] hover:text-[var(--accent)]'}`}
                            />
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
            <h3 className="text-lg font-heading font-semibold text-[var(--text-primary)] mb-2">Course in Development</h3>
            <p className="text-[var(--text-muted)] max-w-sm mx-auto">
              We&apos;re building the lessons for this course. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<'browse' | 'my-courses'>('browse');
  const [activeCourse, setActiveCourse] = useState<CourseId>('java');
  const [showLessons, setShowLessons] = useState(false);

  const { isCompleted, isBookmarked, toggleComplete, toggleBookmark, completionCount } = useProgress();
  const { user, isEnrolled, enroll, loading: enrollLoading } = useEnrollment();

  const activeCourseData = COURSES.find((c) => c.id === activeCourse)!;
  const enrolledCourses = COURSES.filter((c) => isEnrolled(c.id));
  const browseCourses = COURSES;

  // Streak (simple: days since first completed lesson — using count as proxy)
  const streak = Math.min(completionCount, 30);
  const xpPoints = completionCount * 10;

  // Total lessons across all courses for stats
  const totalLessonsAllCourses = COURSES.reduce((t, c) => t + c.totalLessons, 0);

  // Last accessed lesson (find first non-completed in active course)
  const chapters = getChaptersWithLessons(activeCourse);
  const lastLesson = useMemo(() => {
    for (const ch of chapters) {
      for (const l of ch.lessons) {
        if (!isCompleted(l.slug)) return l;
      }
    }
    return chapters[0]?.lessons[0] ?? null;
  }, [chapters, isCompleted]);

  async function handleEnroll(courseId: string) {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    await enroll(courseId);
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-heading font-bold text-[var(--text-primary)] flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-[var(--accent)]" />
              Learning Dashboard
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">
              {user ? `Signed in as ${user.email}` : 'Sign in to sync your progress across devices'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!user && (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}
            {/* View toggle: Browse / My Courses */}
            <div className="flex bg-[var(--surface)] border border-[var(--border-color)] rounded-xl p-1">
              <button
                onClick={() => { setActiveView('browse'); setShowLessons(false); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeView === 'browse' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Browse
              </button>
              <button
                onClick={() => { setActiveView('my-courses'); setShowLessons(false); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeView === 'my-courses' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
              >
                <ListIcon className="w-3.5 h-3.5" />
                My Courses
                {enrolledCourses.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-white/20 text-[10px] font-bold flex items-center justify-center">
                    {enrolledCourses.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats bar (always visible when user has progress) ── */}
        {completionCount > 0 && (
          <StatsBar
            streak={streak}
            totalCompleted={completionCount}
            totalLessons={totalLessonsAllCourses}
            xpPoints={xpPoints}
            userName={user?.user_metadata?.full_name ?? user?.email}
          />
        )}

        <AnimatePresence mode="wait">

          {/* ── BROWSE VIEW ── */}
          {activeView === 'browse' && !showLessons && (
            <motion.div
              key="browse"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Section heading */}
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                <h2 className="text-sm font-bold text-[var(--text-primary)]">All Courses</h2>
                <span className="text-xs text-[var(--text-muted)]">· {COURSES.length} available</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {browseCourses.map((course) => {
                  const chapters = getChaptersWithLessons(course.id);
                  const completed = chapters.reduce(
                    (t, ch) => t + ch.lessons.filter((l) => isCompleted(l.slug)).length, 0
                  );
                  return (
                    <CourseCard
                      key={course.id}
                      course={course}
                      isEnrolled={isEnrolled(course.id)}
                      isActive={activeCourse === course.id}
                      completedCount={completed}
                      onSelect={() => {
                        setActiveCourse(course.id as CourseId);
                        setShowLessons(true);
                      }}
                      onEnroll={() => handleEnroll(course.id)}
                      isLoggedIn={!!user}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── BROWSE → LESSON TREE ── */}
          {activeView === 'browse' && showLessons && (
            <motion.div
              key="lesson-tree"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Back + course header */}
              <div className="flex items-center gap-3 mb-5">
                <button
                  onClick={() => setShowLessons(false)}
                  className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  ← Back to Courses
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-[var(--text-disabled)]" />
                <span className="text-xs text-[var(--text-primary)] font-semibold">
                  {activeCourseData.emoji} {activeCourseData.label}
                </span>
              </div>

              {/* Continue learning banner */}
              {isEnrolled(activeCourse) && lastLesson && (
                <ContinueLearning
                  slug={lastLesson.slug}
                  title={lastLesson.title}
                  courseLabel={activeCourseData.label}
                  courseEmoji={activeCourseData.emoji}
                  accentColor={activeCourseData.accentColor}
                  accentBg={activeCourseData.accentBg}
                  estimatedMinutes={lastLesson.estimatedMinutes}
                  completedCount={chapters.reduce((t, ch) => t + ch.lessons.filter((l) => isCompleted(l.slug)).length, 0)}
                  totalLessons={activeCourseData.totalLessons}
                />
              )}

              {/* Sign in / enroll banner */}
              {!enrollLoading && !isEnrolled(activeCourse) && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 p-4 rounded-2xl border flex items-center gap-4"
                  style={{ borderColor: activeCourseData.accentBorder, background: activeCourseData.accentBg }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: activeCourseData.accentColor + '22' }}
                  >
                    {activeCourseData.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[var(--text-primary)]">
                      {activeCourseData.isPremium
                        ? `Enroll to unlock all ${activeCourseData.label} lessons`
                        : `Enroll in ${activeCourseData.label} for free`}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {activeCourseData.isPremium
                        ? `First 3 lessons free. Get full access for ₹${(activeCourseData.priceInr / 100).toLocaleString('en-IN')}.`
                        : 'Track your progress, bookmarks, and streaks across devices.'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEnroll(activeCourse)}
                    className="shrink-0 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                    style={{ background: activeCourseData.accentColor }}
                  >
                    {!user ? 'Sign In' : activeCourseData.isPremium ? 'Get Access' : 'Enroll Free'}
                  </button>
                </motion.div>
              )}

              <LessonTreeView
                courseId={activeCourse}
                accentColor={activeCourseData.accentColor}
                isCompleted={isCompleted}
                isBookmarked={isBookmarked}
                toggleComplete={toggleComplete}
                toggleBookmark={toggleBookmark}
              />
            </motion.div>
          )}

          {/* ── MY COURSES VIEW ── */}
          {activeView === 'my-courses' && (
            <motion.div
              key="my-courses"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {enrolledCourses.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] flex items-center justify-center text-4xl mb-5">
                    📚
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[var(--text-primary)] mb-2">
                    No courses yet
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] max-w-xs mb-6">
                    Browse the course catalog and enroll in your first course to track progress here.
                  </p>
                  <button
                    onClick={() => setActiveView('browse')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-bold hover:bg-[var(--accent-hover)] transition-colors"
                  >
                    Browse Courses
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  {/* Enrolled course selector */}
                  <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
                    {enrolledCourses.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setActiveCourse(c.id as CourseId)}
                        className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          activeCourse === c.id
                            ? 'text-white'
                            : 'border-[var(--border-color)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent)]/30'
                        }`}
                        style={
                          activeCourse === c.id
                            ? { background: c.accentColor, borderColor: c.accentColor }
                            : {}
                        }
                      >
                        <span>{c.emoji}</span>
                        <span>{c.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Continue learning */}
                  {lastLesson && (
                    <ContinueLearning
                      slug={lastLesson.slug}
                      title={lastLesson.title}
                      courseLabel={activeCourseData.label}
                      courseEmoji={activeCourseData.emoji}
                      accentColor={activeCourseData.accentColor}
                      accentBg={activeCourseData.accentBg}
                      estimatedMinutes={lastLesson.estimatedMinutes}
                      completedCount={chapters.reduce((t, ch) => t + ch.lessons.filter((l) => isCompleted(l.slug)).length, 0)}
                      totalLessons={activeCourseData.totalLessons}
                    />
                  )}

                  {/* Lesson tree */}
                  <LessonTreeView
                    courseId={activeCourse}
                    accentColor={activeCourseData.accentColor}
                    isCompleted={isCompleted}
                    isBookmarked={isBookmarked}
                    toggleComplete={toggleComplete}
                    toggleBookmark={toggleBookmark}
                  />
                </>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
