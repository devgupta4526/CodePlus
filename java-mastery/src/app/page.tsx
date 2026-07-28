'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Code2,
  BookOpen,
  Brain,
  Terminal,
  ArrowRight,
  Clock,
  BarChart3,
  Sparkles,
  Zap,
  BookMarked,
  Search,
  Moon,
  FlaskConical,
  Play,
  Briefcase,
  Trophy,
  GraduationCap,
  Layers,
  Globe,
  CheckCircle2,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import settingsData from '@/data/settings.json';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

// ── Courses catalog (shown on home) ──────────────────────────────────────────

const COURSES = [
  {
    emoji: '☕',
    color: '#F97316',
    bg: 'rgba(249,115,22,0.08)',
    border: 'rgba(249,115,22,0.2)',
    title: 'Java Mastery',
    subtitle: 'Core language · OOP · Collections · Concurrency · Java 21',
    lessons: 47,
    hours: '~38',
    level: 'Beginner → Advanced',
    href: '/dashboard',
    available: true,
  },
  {
    emoji: '🍃',
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.2)',
    title: 'Spring Boot',
    subtitle: 'REST APIs · JPA · Security · JWT · Microservices',
    lessons: 52,
    hours: '~30',
    level: 'Intermediate → Advanced',
    href: '/dashboard',
    available: true,
  },
  {
    emoji: '💻',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
    title: 'Computer Organization & Architecture',
    subtitle: 'CPU · Memory · Pipelining · DMA · Assembly',
    lessons: 7,
    hours: '~5',
    level: 'Core Computer Science',
    href: '/dashboard',
    available: true,
  },
  {
    emoji: '🐍',
    color: '#38BDF8',
    bg: 'rgba(56,189,248,0.08)',
    border: 'rgba(56,189,248,0.2)',
    title: 'Python & Django',
    subtitle: '60-day full-stack path · Django · DRF',
    lessons: 24,
    hours: '~20',
    level: 'Beginner → Full Stack',
    href: '/dashboard',
    available: true,
  },
  {
    emoji: '🧠',
    color: '#A78BFA',
    bg: 'rgba(167,139,250,0.08)',
    border: 'rgba(167,139,250,0.2)',
    title: 'DSA Masterclass',
    subtitle: 'Arrays · Trees · Graphs · DP · Patterns',
    lessons: 40,
    hours: '~30',
    level: 'All levels',
    href: '/roadmap',
    available: true,
  },
  {
    emoji: '⚡',
    color: '#FACC15',
    bg: 'rgba(250,204,21,0.08)',
    border: 'rgba(250,204,21,0.2)',
    title: 'System Design',
    subtitle: 'HLD · LLD · CAP · Databases · Caching',
    lessons: 0,
    hours: '—',
    level: 'Advanced',
    href: '#',
    available: false,
  },
  {
    emoji: '🔒',
    color: '#F43F5E',
    bg: 'rgba(244,63,94,0.08)',
    border: 'rgba(244,63,94,0.2)',
    title: 'Aptitude & OA Prep',
    subtitle: 'Quant · Reasoning · Online Assessments',
    lessons: 0,
    hours: '—',
    level: 'All levels',
    href: '#',
    available: false,
  },
];

const PLATFORM_FEATURES = [
  {
    icon: Terminal,
    title: 'Interactive Code Blocks',
    desc: 'Syntax-highlighted examples with copy, collapse, line numbers and output panels.',
  },
  {
    icon: Brain,
    title: 'Visual Diagrams',
    desc: 'Mermaid-powered flowcharts, class diagrams, mind maps and sequence diagrams.',
  },
  {
    icon: FlaskConical,
    title: 'Knowledge Checks',
    desc: 'MCQ drills and flashcards with instant feedback at the end of every section.',
  },
  {
    icon: Play,
    title: 'Multi-language Playground',
    desc: 'Write Java, Python, JS and more in the browser with a Monaco-powered editor.',
  },
  {
    icon: Trophy,
    title: 'LeetCode-style Practice',
    desc: 'Coding problems with difficulty tags, starter code, solutions and test cases.',
  },
  {
    icon: Search,
    title: 'Instant Search',
    desc: 'Find any topic across all courses with ⌘K universal search.',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    desc: 'Per-course completion tracking, bookmarks and resume where you left off.',
  },
  {
    icon: Zap,
    title: 'Interview Prep',
    desc: 'Curated interview questions and explanations embedded in every lesson.',
  },
  {
    icon: BookMarked,
    title: 'Bookmarks',
    desc: 'Save lessons for revision and build a personalised study queue.',
  },
  {
    icon: Moon,
    title: 'Dark & Light Mode',
    desc: 'Polished dark mode by default with full light mode support.',
  },
  {
    icon: Briefcase,
    title: 'Java Job Board',
    desc: 'Filtered job listings by role, experience level and work mode.',
  },
  {
    icon: Globe,
    title: 'Always Free',
    desc: 'No login, no paywall, no ads. The full platform is free for everyone.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 pt-20 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 text-sm text-[var(--accent)] mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{settingsData.heroTagline}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[1.1] mb-6"
          >
            {settingsData.heroTitle.split('\\n').map((line, idx) => (
              <span key={idx}>
                {idx > 0 && <br />}
                {idx === 1 ? (
                  <span className="bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-[var(--highlight)] bg-clip-text text-transparent">
                    {line}
                  </span>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-[var(--text-muted)] leading-relaxed mb-10"
          >
            {settingsData.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white font-semibold text-base shadow-lg shadow-[var(--accent)]/25 hover:shadow-[var(--accent)]/40 transition-all duration-300 hover:scale-[1.02]"
            >
              Browse Courses
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/practice"
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl border border-[var(--border-color)] text-[var(--text-secondary)] font-medium text-base hover:bg-[var(--surface)] hover:border-[var(--accent)]/30 transition-all duration-300"
            >
              <Play className="w-4 h-4" />
              Open Practice Arena
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Platform stats ───────────────────────────────────────────────── */}
      <section className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: BookOpen,      label: 'Lessons',      value: settingsData.statsLessons },
            { icon: Layers,        label: 'Courses',       value: settingsData.statsCourses },
            { icon: Clock,         label: 'Content Hours', value: settingsData.statsHours },
            { icon: GraduationCap, label: 'Topics Covered',value: settingsData.statsTopics },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center"
            >
              <stat.icon className="w-5 h-5 text-[var(--accent)] mx-auto mb-2" />
              <p className="text-3xl font-heading font-bold text-[var(--text-primary)]">
                {stat.value}
              </p>
              <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Course catalog ───────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">Learning Paths</h2>
              <p className="text-[var(--text-muted)]">
                Structured courses from beginner to production-ready.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COURSES.map((course, i) => (
            <motion.div
              key={course.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Link
                href={course.href}
                className={`group block p-5 rounded-2xl border transition-all duration-200 h-full ${
                  course.available
                    ? 'hover:scale-[1.01] hover:shadow-lg cursor-pointer'
                    : 'opacity-55 cursor-default pointer-events-none'
                }`}
                style={{
                  borderColor: course.available ? course.border : 'var(--border-color)',
                  background: course.available ? course.bg : 'var(--surface)',
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{course.emoji}</span>
                  {!course.available && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-[var(--border-color)] text-[var(--text-disabled)]">
                      Coming soon
                    </span>
                  )}
                  {course.available && (
                    <CheckCircle2 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: course.color }} />
                  )}
                </div>
                <h3 className="text-base font-heading font-bold text-[var(--text-primary)] mb-1">
                  {course.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed">{course.subtitle}</p>
                <div className="flex items-center gap-3 text-xs text-[var(--text-disabled)]">
                  {course.available ? (
                    <>
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.lessons} lessons</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.hours}h</span>
                      <span>·</span>
                      <span>{course.level}</span>
                    </>
                  ) : (
                    <span>In development</span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Platform features ────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-heading font-bold mb-3">
              Everything in one place
            </h2>
            <p className="text-[var(--text-muted)]">
              Not just notes — a complete developer education platform.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PLATFORM_FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] hover:border-[var(--accent)]/20 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-3 group-hover:bg-[var(--accent)]/15 transition-colors">
                  <feature.icon className="w-4.5 h-4.5 text-[var(--accent)]" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1 font-heading">
                  {feature.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Jobs teaser ──────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border-color)]">
        <div className="max-w-5xl mx-auto px-4 py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/5"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Java Job Board</p>
                <p className="text-sm text-[var(--text-muted)]">
                  12 positions · filter by role, experience & work mode
                </p>
              </div>
            </div>
            <Link
              href="/jobs"
              className="shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
            >
              Browse Jobs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-heading font-bold mb-4">
              Start learning today.
            </h2>
            <p className="text-[var(--text-muted)] mb-8">
              Pick a course, open a lesson, and start building. Completely free, always.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white font-semibold shadow-lg shadow-[var(--accent)]/25 hover:shadow-[var(--accent)]/40 transition-all duration-300 hover:scale-[1.02]"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl border border-[var(--border-color)] text-[var(--text-secondary)] font-medium hover:bg-[var(--surface)] transition-all duration-300"
              >
                <BookOpen className="w-4 h-4" />
                Explore Roadmaps
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-heading font-semibold text-[var(--text-secondary)]">
              {settingsData.platformName}
            </span>
          </div>
          <p className="text-xs text-[var(--text-disabled)]">
            {settingsData.footerText}
          </p>
        </div>
      </footer>
    </div>
  );
}
