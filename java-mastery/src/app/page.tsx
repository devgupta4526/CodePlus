'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Braces,
  Check,
  ChevronRight,
  Clock3,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers3,
  Play,
  Search,
  ServerCog,
  TerminalSquare,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import settings from '@/data/settings.json';

const courses = [
  {
    index: '01',
    title: 'Java engineering',
    description: 'From the language fundamentals to concurrency, collections, JVM internals, and Java 21.',
    meta: '47 lessons · 38 hours',
    level: 'Foundation to advanced',
    href: '/dashboard',
    icon: Braces,
  },
  {
    index: '02',
    title: 'Spring Boot systems',
    description: 'Build production APIs with JPA, security, JWT, resilience patterns, and microservices.',
    meta: '52 lessons · 30 hours',
    level: 'Intermediate',
    href: '/dashboard',
    icon: ServerCog,
  },
  {
    index: '03',
    title: 'Data structures & algorithms',
    description: 'Learn reusable problem-solving patterns across arrays, trees, graphs, and dynamic programming.',
    meta: '40 lessons · 30 hours',
    level: 'Interview track',
    href: '/roadmap',
    icon: GitBranch,
  },
  {
    index: '04',
    title: 'Computer architecture',
    description: 'Understand the CPU, memory hierarchy, pipelining, I/O, and the machinery beneath your code.',
    meta: '7 lessons · 5 hours',
    level: 'Core computer science',
    href: '/dashboard',
    icon: Cpu,
  },
];

const capabilities = [
  {
    label: 'Read',
    title: 'Lessons that explain the why',
    description: 'Concepts, diagrams, code, and interview context are kept together so you do not have to reconstruct the subject from scattered notes.',
    icon: Layers3,
  },
  {
    label: 'Run',
    title: 'A real code workspace',
    description: 'Move from explanation to execution without leaving the lesson. Test ideas, inspect output, and learn by changing working examples.',
    icon: TerminalSquare,
  },
  {
    label: 'Recall',
    title: 'Practice with a purpose',
    description: 'Use focused problems, knowledge checks, bookmarks, and progress history to turn reading into durable understanding.',
    icon: Check,
  },
];

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      <main>
        <section className="relative border-b border-[var(--border-color)] overflow-hidden">
          <div className="home-grid absolute inset-0 pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-14 sm:pb-20">
            <div className="grid lg:grid-cols-[1fr_360px] gap-14 lg:gap-24 items-end">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="h-px w-8 bg-[var(--accent)]" />
                  <span className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    A working curriculum for developers
                  </span>
                </div>

                <h1 className="max-w-4xl text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.065em] font-heading font-bold text-[var(--text-primary)]">
                  Learn the system,
                  <span className="block text-[var(--text-muted)]">not just the syntax.</span>
                </h1>

                <p className="mt-8 max-w-2xl text-base sm:text-lg leading-8 text-[var(--text-secondary)]">
                  {settings.heroSubtitle} Built as one connected path from first principles to production work and technical interviews.
                </p>

                <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[var(--text-primary)] px-5 text-sm font-semibold text-[var(--bg)] transition-colors hover:bg-[var(--accent)] hover:text-white"
                  >
                    Explore the curriculum
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/practice"
                    className="inline-flex min-h-12 items-center justify-center gap-3 border border-[var(--border-color)] px-5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    <Play className="h-4 w-4" />
                    Open practice workspace
                  </Link>
                </div>
              </div>

              <aside className="border-t-2 border-[var(--text-primary)] pt-5" aria-label="Platform summary">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">Curriculum status</span>
                  <span className="flex items-center gap-2 text-xs text-[var(--success)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" /> Live
                  </span>
                </div>
                <dl className="divide-y divide-[var(--border-color)]">
                  {[
                    ['Lessons', settings.statsLessons],
                    ['Guided paths', settings.statsCourses],
                    ['Coursework', `${settings.statsHours} hours`],
                    ['Access', 'Open'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-baseline justify-between py-4">
                      <dt className="text-sm text-[var(--text-muted)]">{label}</dt>
                      <dd className="font-mono text-sm text-[var(--text-primary)]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-20">
            <div>
              <p className="section-kicker">Curriculum / 01</p>
              <h2 className="mt-4 text-3xl sm:text-4xl font-heading font-bold tracking-tight">Choose a path. Go deep.</h2>
              <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">
                Each path is structured as a sequence, with enough context to understand how the pieces fit together.
              </p>
              <Link href="/dashboard" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline underline-offset-4">
                See every course <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="border-t border-[var(--text-primary)]">
              {courses.map((course, index) => (
                <motion.div
                  key={course.index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  custom={index * 0.04}
                  variants={reveal}
                >
                  <Link
                    href={course.href}
                    className="course-row group grid sm:grid-cols-[52px_1fr_auto] gap-4 sm:gap-6 py-7 border-b border-[var(--border-color)]"
                  >
                    <div className="flex sm:block items-center gap-3">
                      <span className="font-mono text-xs text-[var(--text-disabled)]">{course.index}</span>
                      <course.icon className="mt-0 sm:mt-5 h-5 w-5 text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{course.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">{course.description}</p>
                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-[var(--text-disabled)]">
                        <span>{course.meta}</span>
                        <span>{course.level}</span>
                      </div>
                    </div>
                    <ChevronRight className="hidden sm:block h-5 w-5 self-center text-[var(--text-disabled)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--text-primary)]" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
            <div className="max-w-2xl mb-12 sm:mb-16">
              <p className="section-kicker">Method / 02</p>
              <h2 className="mt-4 text-3xl sm:text-4xl font-heading font-bold tracking-tight">A tighter learning loop.</h2>
              <p className="mt-4 text-base leading-7 text-[var(--text-muted)]">
                Reading alone creates familiarity. The platform is designed to move you repeatedly through understanding, execution, and recall.
              </p>
            </div>

            <div className="grid md:grid-cols-3 border-t border-l border-[var(--border-color)]">
              {capabilities.map((item, index) => (
                <motion.article
                  key={item.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index * 0.08}
                  variants={reveal}
                  className="min-h-[280px] border-r border-b border-[var(--border-color)] p-7 sm:p-8 flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[var(--accent)]">0{index + 1} / {item.label}</span>
                    <item.icon className="h-5 w-5 text-[var(--text-disabled)]" />
                  </div>
                  <div className="mt-auto pt-16">
                    <h3 className="text-xl font-heading font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="relative overflow-hidden border border-[var(--border-color)] bg-[#101113] p-4 sm:p-6 shadow-2xl shadow-black/20">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4 font-mono text-[11px] text-white/40">
                <Code2 className="h-4 w-4 text-[#f97316]" />
                Main.java
                <span className="ml-auto">Java 21</span>
              </div>
              <pre className="overflow-x-auto py-7 text-[12px] sm:text-sm leading-7 text-[#c9d1d9]"><code><span className="text-[#ff7b72]">sealed interface</span> Result {'{'}{`\n`}  record Success(String value) implements Result {'{}'}{`\n`}  record Failure(Exception cause) implements Result {'{}'}{`\n`}{'}'}{`\n\n`}<span className="text-[#ff7b72]">static</span> String describe(Result result) {'{'}{`\n`}  return switch (result) {'{'}{`\n`}    case Success(var value) -&gt; value;{`\n`}    case Failure(var cause) -&gt; cause.getMessage();{`\n`}  {'}'};{`\n`}{'}'}</code></pre>
              <div className="absolute right-0 top-20 h-28 w-px bg-[var(--accent)]" />
            </div>

            <div>
              <p className="section-kicker">Workspace / 03</p>
              <h2 className="mt-4 text-3xl sm:text-5xl font-heading font-bold tracking-tight">Keep context while you code.</h2>
              <p className="mt-5 text-base leading-7 text-[var(--text-muted)]">
                Examples are part of the explanation, not screenshots pasted beneath it. Inspect modern language features, run code, compare output, and return to the concept without changing tools.
              </p>
              <ul className="mt-7 space-y-3 text-sm text-[var(--text-secondary)]">
                {['Syntax-aware examples with output', 'Java, Python, JavaScript, TypeScript, and C++', 'Focused practice problems with solutions'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-px w-4 bg-[var(--accent)]" /> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <Link href="/practice" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                  Open the practice workspace <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                  Build a guided project <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--border-color)]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Start anywhere</p>
                <h2 className="mt-4 max-w-3xl text-4xl sm:text-6xl font-heading font-bold tracking-[-0.04em]">Find the gap in your knowledge. Close it.</h2>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link href="/dashboard" className="group inline-flex min-h-12 items-center justify-between gap-8 bg-[var(--accent)] px-5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors">
                  Browse lessons <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button type="button" className="inline-flex min-h-12 items-center justify-center gap-3 border border-[var(--border-color)] px-5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors" onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}>
                  <Search className="h-4 w-4" /> Search the library
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <Database className="h-4 w-4 text-[var(--accent)]" />
            <span className="font-heading font-semibold">CodePulse</span>
          </div>
          <p>{settings.footerText}</p>
          <div className="flex items-center gap-5">
            <Link href="/roadmap" className="hover:text-[var(--text-primary)]">Roadmaps</Link>
            <Link href="/jobs" className="hover:text-[var(--text-primary)]">Jobs</Link>
            <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> Updated regularly</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
