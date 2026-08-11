'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Zap, Trophy, ChevronDown } from 'lucide-react';
import { ChallengeCard } from './ChallengeCard';
import practiceData from '@/data/practiceProblems.json';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  starterCode: string;
  solution: string;
  testCases: { input: string; expectedOutput: string }[];
  hints: string[];
}

interface PracticeSectionProps {
  lessonSlug: string;
  lessonTitle: string;
}

const SOLVED_KEY = 'codepulse_practice_solved';

function getSolvedSet(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(SOLVED_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function saveSolved(id: string) {
  if (typeof window === 'undefined') return;
  try {
    const set = getSolvedSet();
    set.add(id);
    localStorage.setItem(SOLVED_KEY, JSON.stringify([...set]));
  } catch {}
}

const allProblems = practiceData as unknown as Record<string, Challenge[]>;

export function PracticeSection({ lessonSlug, lessonTitle }: PracticeSectionProps) {
  const challenges: Challenge[] = allProblems[lessonSlug] ?? [];
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setSolvedIds(getSolvedSet());
  }, []);

  function handleSolved(id: string) {
    saveSolved(id);
    setSolvedIds((prev) => new Set([...prev, id]));
  }

  // Don't render if no challenges for this lesson
  if (challenges.length === 0) return null;

  const solvedCount = challenges.filter((c) => solvedIds.has(c.id)).length;
  const allSolved = solvedCount === challenges.length && challenges.length > 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12 pt-10 border-t border-[var(--border-color)]"
      id="practice"
    >
      {/* Section header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center shadow-lg shadow-[var(--accent)]/20">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-[var(--text-primary)] flex items-center gap-2">
              Practice & Implement
              {allSolved && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--success)]/10 text-[var(--success)] text-sm">
                  <Trophy className="w-4 h-4" />
                  All Done!
                </span>
              )}
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Apply what you learned in <span className="font-medium text-[var(--text-secondary)]">{lessonTitle}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Progress pill */}
          {challenges.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-color)]">
              <Zap className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
              <span className="text-xs font-semibold text-[var(--text-primary)]">
                {solvedCount}/{challenges.length}
              </span>
              <div className="w-16 h-1.5 rounded-full bg-[var(--border-color)] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(solvedCount / challenges.length) * 100}%` }}
                  className="h-full rounded-full bg-[var(--accent)]"
                />
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="p-1.5 rounded-lg hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer text-[var(--text-muted)]"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${collapsed ? '' : 'rotate-180'}`}
            />
          </button>
        </div>
      </div>

      {/* Context callout */}
      {!collapsed && (
        <div className="mb-5 p-4 rounded-xl border border-[var(--accent)]/15 bg-[var(--accent)]/5 flex items-start gap-3">
          <Zap className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
          <div className="text-sm text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">Hands-on learning:</span>{' '}
            Each challenge below directly tests the concepts from this lesson.
            Try to solve without hints first. Your progress is saved locally.
          </div>
        </div>
      )}

      {/* Challenges */}
      {!collapsed && (
        <div className="space-y-4">
          {challenges.map((challenge, i) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              index={i}
              onSolved={handleSolved}
              isSolved={solvedIds.has(challenge.id)}
            />
          ))}
        </div>
      )}

      {/* XP earned callout */}
      {!collapsed && allSolved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-5 p-5 rounded-2xl border border-[var(--success)]/20 bg-[var(--success)]/8 text-center"
        >
          <div className="text-3xl mb-2">🎉</div>
          <h3 className="font-heading font-bold text-[var(--text-primary)] mb-1">
            Section Complete!
          </h3>
          <p className="text-sm text-[var(--text-muted)]">
            You&apos;ve solved all practice challenges for this lesson.
            <br />
            +{challenges.length * 10} XP earned · Move on to the next lesson!
          </p>
        </motion.div>
      )}
    </motion.section>
  );
}
