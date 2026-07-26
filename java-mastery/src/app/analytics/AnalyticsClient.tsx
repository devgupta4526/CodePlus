'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { useProgress } from '@/hooks/useProgress';
import { getChaptersWithLessons, getCourseStats } from '@/data/course';
import {
  Flame,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  BookOpen,
  Target,
  Trophy,
  Plus,
  Trash2,
  ChevronRight,
  Zap,
  TrendingUp,
  Star,
} from 'lucide-react';

// ── Local-storage keys ───────────────────────────────────────────────────────

const LS_STREAK    = 'cp_streak_v1';      // { current, longest, lastDate }
const LS_ACTIVITY  = 'cp_activity_v1';    // Record<YYYY-MM-DD, number>
const LS_PLANNER   = 'cp_planner_v1';     // { date: string; items: PlannerItem[] }

// ── Types ────────────────────────────────────────────────────────────────────

interface StreakData {
  current: number;
  longest: number;
  lastDate: string; // YYYY-MM-DD
}

interface PlannerItem {
  id: string;
  text: string;
  done: boolean;
}

interface PlannerStore {
  date: string;
  items: PlannerItem[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function getStoredStreak(): StreakData {
  try {
    const raw = localStorage.getItem(LS_STREAK);
    if (raw) return JSON.parse(raw) as StreakData;
  } catch { /* ignore */ }
  return { current: 0, longest: 0, lastDate: '' };
}

function bumpStreak(): StreakData {
  const todayStr = today();
  const prev = getStoredStreak();
  if (prev.lastDate === todayStr) return prev; // already bumped today

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().slice(0, 10);

  const current = prev.lastDate === yStr ? prev.current + 1 : 1;
  const longest = Math.max(prev.longest, current);
  const next: StreakData = { current, longest, lastDate: todayStr };
  localStorage.setItem(LS_STREAK, JSON.stringify(next));
  return next;
}

function getActivity(): Record<string, number> {
  try {
    const raw = localStorage.getItem(LS_ACTIVITY);
    if (raw) return JSON.parse(raw) as Record<string, number>;
  } catch { /* ignore */ }
  return {};
}

function recordActivity(date: string, count: number) {
  const act = getActivity();
  act[date] = count;
  localStorage.setItem(LS_ACTIVITY, JSON.stringify(act));
}

function getPlanner(): PlannerStore {
  try {
    const raw = localStorage.getItem(LS_PLANNER);
    if (raw) {
      const store = JSON.parse(raw) as PlannerStore;
      if (store.date === today()) return store;
    }
  } catch { /* ignore */ }
  return { date: today(), items: [] };
}

function savePlanner(store: PlannerStore) {
  localStorage.setItem(LS_PLANNER, JSON.stringify(store));
}

// ── Heatmap helpers ──────────────────────────────────────────────────────────

/** Returns the last `weeks` weeks of YYYY-MM-DD strings, grid[col][row] */
function buildHeatmapGrid(weeks = 17): { date: string; count: number }[][] {
  const grid: { date: string; count: number }[][] = [];
  const end = new Date();
  // Align to Sunday
  end.setDate(end.getDate() - end.getDay());

  for (let w = weeks - 1; w >= 0; w--) {
    const col: { date: string; count: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const dt = new Date(end);
      dt.setDate(end.getDate() - w * 7 + d);
      col.push({ date: dt.toISOString().slice(0, 10), count: 0 });
    }
    grid.push(col);
  }
  return grid;
}

function heatColor(count: number): string {
  if (count === 0) return 'var(--surface-elevated)';
  if (count < 2)   return 'var(--accent)/25';
  if (count < 4)   return 'var(--accent)/50';
  if (count < 7)   return 'var(--accent)/75';
  return 'var(--accent)';
}

// Tailwind-safe static classes for heatmap cells
function heatCls(count: number): string {
  if (count === 0) return 'bg-[var(--surface-elevated)]';
  if (count < 2)   return 'bg-[var(--accent)]/25';
  if (count < 4)   return 'bg-[var(--accent)]/50';
  if (count < 7)   return 'bg-[var(--accent)]/75';
  return 'bg-[var(--accent)]';
}

const WEEK_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const COURSES_META = [
  { id: 'java',       label: 'Java Foundations', color: 'var(--accent)',           emoji: '☕' },
  { id: 'coa',        label: 'Computer Org & Arch', color: '#8b5cf6',              emoji: '💻' },
  { id: 'springboot', label: 'Spring Boot',       color: '#1baf7a',                emoji: '🍃' },
  { id: 'python',     label: 'Python & Django',   color: '#2a78d6',                emoji: '🐍' },
] as const;


// ── Component ─────────────────────────────────────────────────────────────────

export function AnalyticsClient() {
  const { isCompleted } = useProgress();

  // Streak
  const [streak, setStreak] = useState<StreakData>({ current: 0, longest: 0, lastDate: '' });
  // Activity map
  const [activity, setActivity] = useState<Record<string, number>>({});
  // Daily planner
  const [planner, setPlanner] = useState<PlannerStore>({ date: today(), items: [] });
  const [newTask, setNewTask] = useState('');

  // Hydrate from localStorage on mount
  useEffect(() => {
    const s = bumpStreak();
    setStreak(s);
    const act = getActivity();
    setActivity(act);
    const pl = getPlanner();
    setPlanner(pl);
  }, []);

  // ── Course progress ───────────────────────────────────────────────────────

  const courseStats = useMemo(() => {
    return COURSES_META.map((c) => {
      const chapters = getChaptersWithLessons(c.id);
      const stats    = getCourseStats(c.id);
      const done     = chapters.reduce(
        (t, ch) => t + ch.lessons.filter((l) => isCompleted(l.slug)).length,
        0,
      );
      return {
        ...c,
        total: stats.totalLessons,
        done,
        pct: stats.totalLessons > 0 ? Math.round((done / stats.totalLessons) * 100) : 0,
      };
    });
  }, [isCompleted]);

  const totalLessons  = courseStats.reduce((t, c) => t + c.total, 0);
  const totalDone     = courseStats.reduce((t, c) => t + c.done, 0);
  const overallPct    = totalLessons > 0 ? Math.round((totalDone / totalLessons) * 100) : 0;

  // Sync activity count for today (completed lessons count as proxy for "activity")
  useEffect(() => {
    const todayStr = today();
    recordActivity(todayStr, totalDone);
    setActivity(getActivity());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalDone]);

  // ── Heatmap ──────────────────────────────────────────────────────────────

  const grid = useMemo(() => {
    const base = buildHeatmapGrid(17);
    return base.map((col) =>
      col.map((cell) => ({ ...cell, count: activity[cell.date] ?? 0 })),
    );
  }, [activity]);

  const maxActivity = useMemo(() => Math.max(1, ...Object.values(activity)), [activity]);
  const totalActiveDays = useMemo(() => Object.values(activity).filter(Boolean).length, [activity]);

  // ── Planner ───────────────────────────────────────────────────────────────

  function addTask() {
    const trimmed = newTask.trim();
    if (!trimmed) return;
    const updated: PlannerStore = {
      ...planner,
      items: [
        ...planner.items,
        { id: Date.now().toString(), text: trimmed, done: false },
      ],
    };
    setPlanner(updated);
    savePlanner(updated);
    setNewTask('');
  }

  function toggleTask(id: string) {
    const updated: PlannerStore = {
      ...planner,
      items: planner.items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    };
    setPlanner(updated);
    savePlanner(updated);
  }

  function deleteTask(id: string) {
    const updated: PlannerStore = {
      ...planner,
      items: planner.items.filter((item) => item.id !== id),
    };
    setPlanner(updated);
    savePlanner(updated);
  }

  const plannerDone  = planner.items.filter((i) => i.done).length;
  const plannerTotal = planner.items.length;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-[var(--text-primary)]">Analytics</h1>
                <p className="text-sm text-[var(--text-muted)]">Streak, daily plan, heatmap & course progress</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Top stats row ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Flame,       label: 'Current Streak',   value: `${streak.current}d`,  accent: 'text-[#FF5F57]' },
            { icon: Trophy,      label: 'Longest Streak',   value: `${streak.longest}d`,  accent: 'text-[var(--accent-secondary)]' },
            { icon: CheckCircle2,label: 'Lessons Done',      value: `${totalDone}`,        accent: 'text-[var(--success)]' },
            { icon: Calendar,    label: 'Active Days',       value: `${totalActiveDays}`,  accent: 'text-[var(--accent)]' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] flex items-center gap-3"
            >
              <stat.icon className={`w-5 h-5 shrink-0 ${stat.accent}`} />
              <div>
                <p className="text-xl font-heading font-bold text-[var(--text-primary)] leading-none">{stat.value}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Streak block ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#FF5F57]" />
              <span className="text-sm font-semibold text-[var(--text-primary)]">Daily Streak</span>
            </div>
            <span className="text-xs text-[var(--text-muted)]">
              {streak.lastDate === today() ? '✓ Active today' : 'Visit a lesson to keep your streak!'}
            </span>
          </div>

          <div className="flex items-end gap-6">
            {/* Flame counter */}
            <div className="flex items-center gap-2">
              <div className="w-14 h-14 rounded-2xl bg-[#FF5F57]/10 flex items-center justify-center">
                <Flame className="w-7 h-7 text-[#FF5F57]" />
              </div>
              <div>
                <p className="text-4xl font-heading font-bold text-[var(--text-primary)]">{streak.current}</p>
                <p className="text-xs text-[var(--text-muted)]">day streak</p>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-1.5">
                <span>Progress to 7-day milestone</span>
                <span className="font-medium">{Math.min(streak.current, 7)} / 7</span>
              </div>
              <div className="flex gap-1.5">
                {Array.from({ length: 7 }, (_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2.5 rounded-full transition-colors ${
                      i < streak.current ? 'bg-[#FF5F57]' : 'bg-[var(--surface-elevated)]'
                    }`}
                  />
                ))}
              </div>
              <p className="text-[10px] text-[var(--text-disabled)] mt-1.5">
                Longest: {streak.longest} days
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Activity Heatmap ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-sm font-semibold text-[var(--text-primary)]">Activity Heatmap</span>
            </div>
            <span className="text-xs text-[var(--text-muted)]">{totalActiveDays} active days</span>
          </div>

          {/* Grid */}
          <div className="overflow-x-auto">
            <div className="inline-flex gap-1 min-w-0">
              {/* Day labels col */}
              <div className="flex flex-col gap-1 mr-1">
                <div className="h-3" /> {/* spacer for month row */}
                {WEEK_LABELS.map((d, i) => (
                  <div key={i} className="h-3 w-3 text-[9px] text-[var(--text-disabled)] flex items-center justify-center">
                    {i % 2 === 0 ? d : ''}
                  </div>
                ))}
              </div>

              {/* Weeks */}
              {grid.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-1">
                  {/* Month label (show on first of month) */}
                  <div className="h-3 text-[9px] text-[var(--text-disabled)] leading-none">
                    {col[0]?.date.endsWith('-01') ? col[0].date.slice(5, 7) : ''}
                  </div>
                  {col.map((cell) => (
                    <div
                      key={cell.date}
                      title={`${cell.date}: ${cell.count} lessons`}
                      className={`w-3 h-3 rounded-sm transition-colors ${heatCls(cell.count)}`}
                      style={
                        cell.count > 0
                          ? { opacity: 0.3 + 0.7 * (cell.count / maxActivity) }
                          : undefined
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1.5 mt-3">
            <span className="text-[10px] text-[var(--text-disabled)]">Less</span>
            {[0, 1, 3, 5, 8].map((v) => (
              <div
                key={v}
                className={`w-3 h-3 rounded-sm ${heatCls(v)}`}
              />
            ))}
            <span className="text-[10px] text-[var(--text-disabled)]">More</span>
          </div>
        </motion.div>

        {/* ── Overall Progress ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-sm font-semibold text-[var(--text-primary)]">Course Progress</span>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-1 text-xs text-[var(--accent)] hover:underline"
            >
              View dashboard <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Overall progress bar */}
          <div className="mb-5 p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[var(--text-secondary)]">Overall Completion</span>
              <span className="text-xs font-bold text-[var(--accent)]">{overallPct}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallPct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"
              />
            </div>
            <p className="text-[10px] text-[var(--text-disabled)] mt-1.5">
              {totalDone} / {totalLessons} lessons completed
            </p>
          </div>

          {/* Per-course rows */}
          <div className="space-y-4">
            {courseStats.map((c) => (
              <div key={c.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{c.emoji}</span>
                    <span className="text-xs font-medium text-[var(--text-primary)]">{c.label}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                    <span>{c.done} / {c.total}</span>
                    <span className="font-bold" style={{ color: c.color }}>{c.pct}%</span>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.pct}%` }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: c.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Daily Planner ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[var(--accent-secondary)]" />
              <span className="text-sm font-semibold text-[var(--text-primary)]">Daily Planner</span>
              <span className="text-xs text-[var(--text-disabled)]">— {today()}</span>
            </div>
            {plannerTotal > 0 && (
              <span className="text-xs text-[var(--text-muted)]">
                {plannerDone} / {plannerTotal} done
              </span>
            )}
          </div>

          {/* Add task */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add a study task for today..."
              className="flex-1 px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
            />
            <button
              onClick={addTask}
              className="w-9 h-9 rounded-xl bg-[var(--accent)] text-white flex items-center justify-center hover:bg-[var(--accent-hover)] transition-colors cursor-pointer shrink-0"
              aria-label="Add task"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Task list */}
          {planner.items.length === 0 ? (
            <div className="py-6 text-center border border-dashed border-[var(--border-color)] rounded-xl text-sm text-[var(--text-disabled)]">
              No tasks yet — add something to study today!
            </div>
          ) : (
            <div className="space-y-2">
              {planner.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] group"
                >
                  <button
                    onClick={() => toggleTask(item.id)}
                    className="shrink-0 cursor-pointer"
                    aria-label={item.done ? 'Mark incomplete' : 'Mark complete'}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 transition-colors ${
                        item.done ? 'text-[var(--success)]' : 'text-[var(--text-disabled)] hover:text-[var(--success)]'
                      }`}
                    />
                  </button>
                  <span className={`flex-1 text-sm transition-colors ${item.done ? 'line-through text-[var(--text-disabled)]' : 'text-[var(--text-primary)]'}`}>
                    {item.text}
                  </span>
                  <button
                    onClick={() => deleteTask(item.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                    aria-label="Delete task"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-[var(--text-disabled)] hover:text-[var(--error)]" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Daily planner progress bar */}
          {plannerTotal > 0 && (
            <div className="mt-4">
              <div className="w-full h-1.5 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.round((plannerDone / plannerTotal) * 100)}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full bg-[var(--success)]"
                />
              </div>
              <p className="text-[10px] text-[var(--text-disabled)] mt-1">
                {Math.round((plannerDone / plannerTotal) * 100)}% of today&apos;s plan complete
              </p>
            </div>
          )}
        </motion.div>

        {/* ── Quick tips / nudges ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid sm:grid-cols-3 gap-4"
        >
          {[
            {
              icon: Zap,
              title: 'Keep momentum',
              desc: 'Even 15 min of practice daily compounds over weeks.',
              color: 'text-[var(--accent)]',
            },
            {
              icon: BookOpen,
              title: 'Review bookmarks',
              desc: 'Revisit bookmarked lessons to reinforce memory.',
              color: 'text-[var(--accent-secondary)]',
              href: '/dashboard',
            },
            {
              icon: Star,
              title: 'Try a contest',
              desc: 'Timed OA practice builds speed and confidence.',
              color: 'text-[#FF5F57]',
              href: '/contests',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] flex gap-3"
            >
              <card.icon className={`w-4 h-4 shrink-0 mt-0.5 ${card.color}`} />
              <div>
                <p className="text-xs font-semibold text-[var(--text-primary)] mb-0.5">{card.title}</p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{card.desc}</p>
                {card.href && (
                  <Link href={card.href} className="text-[10px] text-[var(--accent)] hover:underline mt-1 inline-block">
                    Go →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
