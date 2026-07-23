'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import {
  Trophy,
  Clock,
  Users,
  Target,
  Zap,
  BookOpen,
  ChevronRight,
  Play,
  Lock,
  Star,
  Calendar,
  Timer,
  BarChart3,
  Brain,
  Code2,
  CheckCircle2,
  ArrowRight,
  Flame,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

type ContestStatus = 'live' | 'upcoming' | 'completed' | 'practice';
type ContestDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Mixed';

interface Contest {
  id: string;
  title: string;
  company?: string;
  type: 'OA' | 'Contest' | 'Mock Test' | 'Weekly';
  difficulty: ContestDifficulty;
  status: ContestStatus;
  duration: string;
  problems: number;
  participants?: number;
  startsAt?: string;
  topics: string[];
  description: string;
  locked: boolean;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const CONTESTS: Contest[] = [
  {
    id: 'weekly-1',
    title: 'Weekly Challenge #1',
    type: 'Weekly',
    difficulty: 'Mixed',
    status: 'practice',
    duration: '90 min',
    problems: 4,
    participants: 1243,
    topics: ['Arrays', 'Strings', 'HashMap', 'Two Pointer'],
    description: 'A 4-problem set covering arrays, strings and hashing — ideal warm-up for any OA.',
    locked: false,
  },
  {
    id: 'amazon-oa-1',
    title: 'Amazon OA Simulation',
    company: 'Amazon',
    type: 'OA',
    difficulty: 'Medium',
    status: 'practice',
    duration: '105 min',
    problems: 2,
    participants: 3421,
    topics: ['Sliding Window', 'BFS', 'Heaps', 'Greedy'],
    description: 'Simulates the standard Amazon OA format with 2 timed problems drawn from common patterns.',
    locked: false,
  },
  {
    id: 'google-oa-1',
    title: 'Google Kickstart Sim.',
    company: 'Google',
    type: 'OA',
    difficulty: 'Hard',
    status: 'practice',
    duration: '120 min',
    problems: 3,
    participants: 889,
    topics: ['Dynamic Programming', 'Graphs', 'Math', 'Binary Search'],
    description: 'Inspired by Google Kickstart round formats. Expect multiple test sets per problem.',
    locked: false,
  },
  {
    id: 'campus-placement-1',
    title: 'Campus Placement Mock',
    type: 'Mock Test',
    difficulty: 'Easy',
    status: 'practice',
    duration: '60 min',
    problems: 3,
    participants: 5102,
    topics: ['Basics', 'Sorting', 'Recursion', 'OOP'],
    description: 'Targeted at freshers appearing in campus placements. Covers fundamentals + 1 DSA problem.',
    locked: false,
  },
  {
    id: 'weekly-2',
    title: 'Weekly Challenge #2',
    type: 'Weekly',
    difficulty: 'Mixed',
    status: 'upcoming',
    startsAt: 'Sat, 7:00 PM IST',
    duration: '90 min',
    problems: 4,
    topics: ['Trees', 'DFS', 'Stack', 'Prefix Sum'],
    description: 'Tree traversal, stack-based problems, and prefix sums in this week\'s challenge.',
    locked: false,
  },
  {
    id: 'microsoft-oa-1',
    title: 'Microsoft OA Simulation',
    company: 'Microsoft',
    type: 'OA',
    difficulty: 'Medium',
    status: 'upcoming',
    startsAt: 'Sun, 5:00 PM IST',
    duration: '75 min',
    problems: 2,
    topics: ['Linked List', 'Recursion', 'Binary Tree'],
    description: 'Mirrors the Microsoft OA structure with LeetCode-medium level problems.',
    locked: false,
  },
  {
    id: 'faang-sprint-1',
    title: 'FAANG Speed Sprint',
    type: 'Contest',
    difficulty: 'Hard',
    status: 'completed',
    duration: '45 min',
    problems: 3,
    participants: 672,
    topics: ['DP', 'Graphs', 'Backtracking'],
    description: 'Sprint-style contest: solve as many as you can in 45 minutes. Leaderboard scoring.',
    locked: false,
  },
  {
    id: 'aptitude-1',
    title: 'Quantitative Aptitude OA',
    type: 'Mock Test',
    difficulty: 'Easy',
    status: 'practice',
    duration: '30 min',
    problems: 20,
    participants: 2301,
    topics: ['Percentages', 'Ratios', 'Time-Work', 'Probability'],
    description: '20-question MCQ covering quant aptitude — essential for MNC OA rounds.',
    locked: false,
  },
];

// ── Company badge helpers ──────────────────────────────────────────────────────

const COMPANY_COLORS: Record<string, string> = {
  Amazon:    'bg-[#FF9900]/10 text-[#FF9900] border-[#FF9900]/25',
  Google:    'bg-[#4285F4]/10 text-[#4285F4] border-[#4285F4]/25',
  Microsoft: 'bg-[#00A4EF]/10 text-[#00A4EF] border-[#00A4EF]/25',
};

const DIFFICULTY_COLORS: Record<ContestDifficulty, string> = {
  Easy:   'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20',
  Medium: 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/20',
  Hard:   'bg-[#FF5F57]/10 text-[#FF5F57] border-[#FF5F57]/20',
  Mixed:  'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20',
};

const STATUS_LABEL: Record<ContestStatus, { label: string; cls: string }> = {
  live:      { label: 'LIVE',      cls: 'bg-[var(--error)]/10 text-[var(--error)] border-[var(--error)]/20 animate-pulse' },
  upcoming:  { label: 'UPCOMING',  cls: 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/20' },
  completed: { label: 'ENDED',     cls: 'bg-[var(--surface-elevated)] text-[var(--text-disabled)] border-[var(--border-color)]' },
  practice:  { label: 'PRACTICE',  cls: 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20' },
};

const TYPE_ICON: Record<Contest['type'], React.ElementType> = {
  'OA':         Target,
  'Contest':    Trophy,
  'Mock Test':  Brain,
  'Weekly':     Calendar,
};

// ── OA Tips data ──────────────────────────────────────────────────────────────

const OA_TIPS = [
  { icon: Timer,      tip: 'Read all problems first — start with the one you can solve fastest.' },
  { icon: Code2,      tip: 'Write edge-case tests before submitting: empty input, single element, large values.' },
  { icon: BarChart3,  tip: 'Aim for O(n log n) or better — brute force O(n²) often TLEs on large inputs.' },
  { icon: CheckCircle2, tip: 'Partial credit matters in some OA formats — submit working brute force before optimising.' },
  { icon: Flame,      tip: 'Practice 2–3 contests a week to build speed and pattern recognition.' },
];

// ── Component ─────────────────────────────────────────────────────────────────

type FilterTab = 'all' | ContestStatus | Contest['type'];

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: 'all',        label: 'All' },
  { key: 'practice',  label: 'Practice' },
  { key: 'upcoming',  label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
  { key: 'OA',        label: 'OA Sim' },
  { key: 'Weekly',    label: 'Weekly' },
  { key: 'Mock Test', label: 'Mock Tests' },
];

export function ContestsClient() {
  const [filter, setFilter] = useState<FilterTab>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = CONTESTS.filter((c) => {
    if (filter === 'all') return true;
    return c.status === filter || c.type === filter;
  });

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-[var(--text-primary)]">
                  Contests & OA Prep
                </h1>
                <p className="text-sm text-[var(--text-muted)]">
                  Timed practice, OA simulations, and mock tests for placements
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { icon: Trophy,  label: 'Contests',     value: CONTESTS.length },
              { icon: Play,    label: 'Practice Now',  value: CONTESTS.filter(c => c.status === 'practice').length },
              { icon: Target,  label: 'OA Sims',       value: CONTESTS.filter(c => c.type === 'OA').length },
              { icon: Users,   label: 'Total Attempts', value: '12k+' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface)]">
                <s.icon className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <div>
                  <p className="text-lg font-heading font-bold text-[var(--text-primary)] leading-none">{s.value}</p>
                  <p className="text-xs text-[var(--text-muted)]">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Filter tabs ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
                filter === tab.key
                  ? 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/25'
                  : 'bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--accent)]/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Contest cards ────────────────────────────────────────────────── */}
        <AnimatePresence mode="popLayout">
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((contest, idx) => {
              const TypeIcon = TYPE_ICON[contest.type];
              const statusMeta = STATUS_LABEL[contest.status];
              const isExpanded = expanded === contest.id;

              return (
                <motion.div
                  key={contest.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: idx * 0.04 }}
                  className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] overflow-hidden"
                >
                  {/* Card header */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[var(--surface-elevated)] flex items-center justify-center shrink-0">
                          <TypeIcon className="w-4 h-4 text-[var(--accent)]" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-[var(--text-primary)] leading-tight">{contest.title}</h3>
                          {contest.company && (
                            <span className={`inline-block mt-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${COMPANY_COLORS[contest.company] ?? 'bg-[var(--surface-elevated)] text-[var(--text-muted)] border-[var(--border-color)]'}`}>
                              {contest.company}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={`shrink-0 text-[10px] font-bold px-2 py-1 rounded-full border tracking-wide ${statusMeta.cls}`}>
                        {statusMeta.label}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-muted)] mb-3 leading-relaxed">{contest.description}</p>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-disabled)]">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{contest.duration}</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{contest.problems} problems</span>
                      {contest.participants && (
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{contest.participants.toLocaleString()} attempts</span>
                      )}
                      {contest.startsAt && (
                        <span className="flex items-center gap-1 text-[var(--accent-secondary)]"><Calendar className="w-3 h-3" />{contest.startsAt}</span>
                      )}
                      <span className={`px-1.5 py-0.5 rounded-full border text-[10px] font-medium ${DIFFICULTY_COLORS[contest.difficulty]}`}>
                        {contest.difficulty}
                      </span>
                    </div>

                    {/* Topics (collapsible) */}
                    <div className="mt-3">
                      <button
                        onClick={() => setExpanded(isExpanded ? null : contest.id)}
                        className="flex items-center gap-1.5 text-[10px] text-[var(--text-disabled)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                      >
                        <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        {isExpanded ? 'Hide topics' : 'Show topics'}
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {contest.topics.map((t) => (
                                <span key={t} className="px-2 py-0.5 text-[10px] rounded-full border border-[var(--border-color)] bg-[var(--surface-elevated)] text-[var(--text-muted)]">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* CTA footer */}
                  <div className="border-t border-[var(--border-color)] px-5 py-3 flex items-center justify-between">
                    <span className="text-[10px] text-[var(--text-disabled)] uppercase tracking-wider font-medium">{contest.type}</span>
                    {contest.locked ? (
                      <span className="flex items-center gap-1.5 text-xs text-[var(--text-disabled)] px-3 py-1.5 rounded-lg border border-[var(--border-color)]">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    ) : (
                      <Link
                        href="/practice"
                        className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 hover:bg-[var(--accent)]/20"
                      >
                        <Play className="w-3 h-3" />
                        {contest.status === 'upcoming' ? 'Set Reminder' : 'Start'}
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16 border border-dashed border-[var(--border-color)] rounded-2xl bg-[var(--surface)]">
            <Trophy className="w-10 h-10 text-[var(--text-disabled)] mx-auto mb-3" />
            <p className="text-[var(--text-muted)]">No contests match this filter.</p>
          </div>
        )}

        {/* ── OA Tips ──────────────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Star className="w-4 h-4 text-[var(--accent)]" />
            <h2 className="text-base font-heading font-semibold text-[var(--text-primary)]">OA Strategy Tips</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {OA_TIPS.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-3 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--surface)]"
              >
                <tip.icon className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{tip.tip}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Practice CTA ─────────────────────────────────────────────────── */}
        <div className="p-6 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Sharpen your skills in the Practice Arena</p>
            <p className="text-xs text-[var(--text-muted)]">Solve LeetCode-style problems, run MCQ drills, and use the live playground.</p>
          </div>
          <Link
            href="/practice"
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
          >
            Open Practice <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
