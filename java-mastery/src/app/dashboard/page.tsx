'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen, ChevronRight, CheckCircle2, Circle, BarChart3, Bookmark,
  Filter, ChevronDown, ChevronUp, LogIn, ArrowRight, ArrowLeft,
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
      if (next.has(num)) {
        next.delete(num);
      } else {
        next.add(num);
      }
      return next;
    });
  }

  return (
    <div>
      {/* Progress + filter */}
      <div className="mb-8 grid gap-5 border-y border-[var(--border-color)] py-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="flex items-center gap-3 flex-1">
          <BarChart3 className="w-4 h-4 text-[var(--accent)]" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[var(--text-primary)]">Course Progress</span>
              <span className="text-xs font-bold" style={{ color: accentColor }}>
                {completedCount}/{courseStats.totalLessons}
              </span>
            </div>
            <div className="h-px w-full overflow-hidden bg-[var(--border-color)]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full"
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
              className={`flex min-h-9 items-center gap-1.5 border-b px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors cursor-pointer ${
                filter === f.key
                  ? 'text-[var(--text-primary)] border-[var(--accent)]'
                  : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
              }`}
            >
              <f.icon className="w-3 h-3" />
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chapter tree */}
      <div>
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
              className="border-t border-[var(--border-color)] last:border-b"
            >
              <button
                onClick={() => toggleChapter(chapter.number)}
                className="w-full flex items-center gap-4 px-1 py-5 hover:bg-[var(--surface)] transition-colors cursor-pointer text-left sm:px-4"
              >
                <span
                  className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: accentColor }}
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
                <div className="border-t border-[var(--border-color)] divide-y divide-[var(--border-color)] bg-[var(--bg-secondary)]">
                  {filteredLessons.map((lesson) => {
                    const completed = isCompleted(lesson.slug);
                    const bookmarked = isBookmarked(lesson.slug);
                    return (
                      <div
                        key={lesson.slug}
                        className="group flex items-center gap-3 px-3 py-4 hover:bg-[var(--surface)] transition-colors sm:px-8"
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
          <div className="border-y border-[var(--border-color)] py-20 text-center">
            <p className="section-kicker mb-5">Curriculum notice</p>
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
  const router = useRouter();
  const [activeView, setActiveView] = useState<'browse' | 'my-courses'>('browse');
  const [activeCourse, setActiveCourse] = useState<CourseId>('java');
  const [showLessons, setShowLessons] = useState(false);
  const [enrollmentMessage, setEnrollmentMessage] = useState<string | null>(null);

  const { isCompleted, isBookmarked, toggleComplete, toggleBookmark, completionCount } = useProgress();
  const {
    user,
    isEnrolled,
    enroll,
    loading: enrollLoading,
    error: enrollmentError,
  } = useEnrollment();

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
    setEnrollmentMessage(null);
    if (!user) {
      router.push(`/login?next=${encodeURIComponent('/dashboard')}`);
      return;
    }

    const course = COURSES.find((item) => item.id === courseId);
    if (course?.isPremium) {
      setEnrollmentMessage('Paid enrollment is not available yet. No charge was made.');
      return;
    }

    try {
      await enroll(courseId);
      setEnrollmentMessage(`You are now enrolled in ${course?.label ?? 'the course'}.`);
    } catch (error) {
      setEnrollmentMessage(error instanceof Error ? error.message : 'Enrollment failed.');
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      <header className="relative overflow-hidden border-b border-[var(--border-color)]">
        <div className="home-grid absolute inset-0 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:px-12">
          <div className="grid items-end gap-12 lg:grid-cols-[1fr_360px] lg:gap-24">
            <div>
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--accent)]" />
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">Learning workspace</span>
              </div>
              <h1 className="max-w-4xl text-[clamp(3rem,7vw,6.5rem)] font-heading font-bold leading-[0.91] tracking-[-0.06em] text-[var(--text-primary)]">
                Build depth.
                <span className="block text-[var(--text-muted)]">Keep momentum.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                A deliberate path through the curriculum—where your next lesson, course progress, and saved work stay in one place.
              </p>
            </div>

            <aside className="border-t-2 border-[var(--text-primary)] pt-5">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">Workspace status</span>
                <span className="text-xs text-[var(--success)]">Ready</span>
              </div>
              <div className="py-5">
                <p className="text-sm leading-6 text-[var(--text-secondary)]">
                  {user ? `Progress is syncing for ${user.email}.` : 'Your local progress is ready. Sign in when you want it synced across devices.'}
                </p>
                {!user ? (
                  <Link href="/login" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]">
                    <LogIn className="h-4 w-4" /> Sign in to sync <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">

        {(enrollmentMessage || enrollmentError) && (
          <div
            role="status"
            className={`mb-8 border-l-2 px-4 py-3 text-sm ${
              enrollmentMessage?.startsWith('You are now enrolled')
                ? 'border-[var(--success)] bg-[var(--success)]/5 text-[var(--success)]'
                : 'border-[#EF4444] bg-[#EF4444]/5 text-[#EF4444]'
            }`}
          >
            {enrollmentMessage ?? enrollmentError}
          </div>
        )}

        {completionCount > 0 && (
          <div className="mb-12">
            <StatsBar streak={streak} totalCompleted={completionCount} totalLessons={totalLessonsAllCourses} xpPoints={xpPoints} userName={user?.user_metadata?.full_name ?? user?.email} />
          </div>
        )}

        <div className="mb-10 flex items-center gap-7 border-b border-[var(--border-color)]">
          <button
            onClick={() => { setActiveView('browse'); setShowLessons(false); }}
            className={`border-b-2 pb-3 text-sm font-semibold transition-colors ${activeView === 'browse' ? 'border-[var(--accent)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
          >
            Curriculum
          </button>
          <button
            onClick={() => { setActiveView('my-courses'); setShowLessons(false); }}
            className={`border-b-2 pb-3 text-sm font-semibold transition-colors ${activeView === 'my-courses' ? 'border-[var(--accent)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
          >
            My courses {enrolledCourses.length > 0 ? `(${enrolledCourses.length})` : ''}
          </button>
        </div>

        <AnimatePresence mode="wait">

          {/* ── BROWSE VIEW ── */}
          {activeView === 'browse' && !showLessons && (
            <motion.div
              key="browse"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="mb-8 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <p className="section-kicker">Curriculum / {String(COURSES.length).padStart(2, '0')} paths</p>
                  <h2 className="mt-4 text-3xl font-heading font-semibold tracking-[-0.035em] sm:text-4xl">Choose the work that matters next.</h2>
                </div>
                <p className="max-w-sm text-sm leading-6 text-[var(--text-muted)]">Structured courses for foundational knowledge, production systems, and focused exam preparation.</p>
              </div>

              <div>
                {browseCourses.map((course, index) => {
                  const chapters = getChaptersWithLessons(course.id);
                  const completed = chapters.reduce(
                    (t, ch) => t + ch.lessons.filter((l) => isCompleted(l.slug)).length, 0
                  );
                  return (
                    <CourseCard
                      key={course.id}
                      course={course}
                      index={index}
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
              <div className="mb-8 flex items-center gap-3 border-b border-[var(--border-color)] pb-5">
                <button
                  onClick={() => setShowLessons(false)}
                  className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Curriculum
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-[var(--text-disabled)]" />
                <span className="text-xs text-[var(--text-primary)] font-semibold">{activeCourseData.label}</span>
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
                  className="mb-8 grid gap-5 border-y border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--accent)]">Course access</p>
                    <p className="mt-2 text-lg font-heading font-semibold text-[var(--text-primary)]">
                      {activeCourseData.isPremium
                        ? `Enroll to unlock all ${activeCourseData.label} lessons`
                        : `Enroll in ${activeCourseData.label} for free`}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                      {activeCourseData.isPremium
                        ? `First 3 lessons free. Get full access for ₹${(activeCourseData.priceInr / 100).toLocaleString('en-IN')}.`
                        : 'Track your progress, bookmarks, and streaks across devices.'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEnroll(activeCourse)}
                    className="shrink-0 bg-[var(--text-primary)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition-colors hover:bg-[var(--accent)] hover:text-white"
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
                <div className="border-y border-[var(--border-color)] py-20 text-center">
                  <p className="section-kicker mb-5">Your curriculum</p>
                  <h3 className="text-2xl font-heading font-semibold tracking-tight text-[var(--text-primary)] mb-2">
                    No courses yet
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] max-w-xs mb-6">
                    Browse the course catalog and enroll in your first course to track progress here.
                  </p>
                  <button
                    onClick={() => setActiveView('browse')}
                    className="mx-auto flex items-center gap-2 bg-[var(--text-primary)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition-colors hover:bg-[var(--accent)] hover:text-white"
                  >
                    Browse Courses
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  {/* Enrolled course selector */}
                  <div className="mb-8 flex items-center gap-6 overflow-x-auto border-b border-[var(--border-color)]">
                    {enrolledCourses.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setActiveCourse(c.id as CourseId)}
                        className={`shrink-0 border-b-2 pb-3 text-xs font-semibold transition-colors cursor-pointer ${
                          activeCourse === c.id
                            ? 'border-[var(--accent)] text-[var(--text-primary)]'
                            : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                        }`}
                      >
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
      </main>
    </div>
  );
}
