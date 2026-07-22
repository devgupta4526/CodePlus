'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Code2,
  BookOpen,
  Brain,
  Terminal,
  Layers,
  ArrowRight,
  CheckCircle2,
  Clock,
  BarChart3,
  Sparkles,
  Zap,
  BookMarked,
  Search,
  Moon,
  FlaskConical,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { getChaptersWithLessons, getCourseStats, ALL_LESSONS } from '@/data/course';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
};

export default function HomePage() {
  const chapters = getChaptersWithLessons('java');
  const courseStats = getCourseStats('java');

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ── Hero Section ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 pt-20 pb-24 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 text-sm text-[var(--accent)] mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Free · No Login · {courseStats.totalLessons} Lessons</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[1.1] mb-6"
          >
            Master Java.
            <br />
            <span className="bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-[var(--highlight)] bg-clip-text text-transparent">
              Build with confidence.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-[var(--text-muted)] leading-relaxed mb-10"
          >
            A complete interactive learning platform to take you from zero to Java proficiency.
            Rich code examples, visual diagrams, quizzes, and interview prep — all in one place.
          </motion.p>

          {/* CTA buttons */}
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
              Start Learning
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/lesson/oop-fundamentals"
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl border border-[var(--border-color)] text-[var(--text-secondary)] font-medium text-base hover:bg-[var(--surface)] hover:border-[var(--accent)]/30 transition-all duration-300"
            >
              <BookOpen className="w-4 h-4" />
              Preview First Lesson
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: BookOpen, label: 'Lessons', value: courseStats.totalLessons },
            { icon: Layers, label: 'Chapters', value: courseStats.totalChapters },
            { icon: Clock, label: 'Hours', value: `~${courseStats.totalDurationHours}` },
            { icon: Code2, label: 'Code Examples', value: '100+' },
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

      {/* ── Features ──────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-heading font-bold mb-3">
            Everything you need to learn Java
          </h2>
          <p className="text-[var(--text-muted)]">
            Not just notes — a complete interactive learning experience.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: Terminal,
              title: 'Interactive Code Blocks',
              desc: 'Syntax-highlighted Java code with copy, collapse, line numbers, and output sections.',
            },
            {
              icon: Brain,
              title: 'Visual Diagrams',
              desc: 'Mermaid-powered flowcharts, mind maps, class diagrams, and sequence diagrams.',
            },
            {
              icon: FlaskConical,
              title: 'Knowledge Checks',
              desc: 'Interactive quizzes and flashcards at the end of each section.',
            },
            {
              icon: Search,
              title: 'Instant Search',
              desc: 'Find any topic across all lessons with Cmd+K search.',
            },
            {
              icon: BarChart3,
              title: 'Progress Tracking',
              desc: 'Track completed lessons, overall progress, and pick up where you left off.',
            },
            {
              icon: BookMarked,
              title: 'Bookmarks',
              desc: 'Bookmark lessons for quick access and revision.',
            },
            {
              icon: Moon,
              title: 'Dark & Light Mode',
              desc: 'Beautiful dark mode by default with full light mode support.',
            },
            {
              icon: Zap,
              title: 'Interview Prep',
              desc: 'Dedicated interview question sections in every lesson.',
            },
            {
              icon: Sparkles,
              title: 'Premium Design',
              desc: 'Clean, modern UI inspired by Linear, Vercel, and Raycast.',
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] hover:border-[var(--accent)]/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-3 group-hover:bg-[var(--accent)]/15 transition-colors">
                <feature.icon className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1 font-heading">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Course Roadmap ────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-3xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-heading font-bold mb-3">Course Roadmap</h2>
            <p className="text-[var(--text-muted)]">
              {courseStats.totalChapters} chapters taking you from fundamentals to advanced Java.
            </p>
          </motion.div>

          <div className="space-y-6">
            {chapters.map((chapter, i) => (
              <motion.div
                key={chapter.number}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative pl-8"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-secondary)]" />
                {/* Timeline line */}
                {i < chapters.length - 1 && (
                  <div className="absolute left-[7px] top-6 w-0.5 h-[calc(100%+0.5rem)] bg-[var(--border-color)]" />
                )}

                <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] hover:border-[var(--accent)]/20 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                      Chapter {chapter.number}
                    </span>
                    <span className="text-xs text-[var(--text-disabled)]">·</span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {chapter.lessons.length} lessons
                    </span>
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-[var(--text-primary)] mb-1.5">
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-3">
                    {chapter.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {chapter.lessons.map((lesson) => (
                      <span
                        key={lesson.slug}
                        className="px-2.5 py-1 rounded-full text-xs bg-[var(--surface-elevated)] text-[var(--text-muted)] border border-[var(--border-color)]"
                      >
                        {lesson.title}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Footer ────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border-color)]">
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Ready to start?
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            Begin your Java journey now. It&apos;s completely free.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white font-semibold shadow-lg shadow-[var(--accent)]/25 hover:shadow-[var(--accent)]/40 transition-all duration-300 hover:scale-[1.02]"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-heading font-semibold text-[var(--text-secondary)]">
              CodePulse
            </span>
          </div>
          <p className="text-xs text-[var(--text-disabled)]">
            Built for developers who want to learn Java properly.
          </p>
        </div>
      </footer>
    </div>
  );
}
