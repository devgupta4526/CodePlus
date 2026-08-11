'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Clock } from 'lucide-react';

interface ContinueLearningProps {
  slug: string;
  title: string;
  courseLabel: string;
  courseEmoji: string;
  accentColor: string;
  accentBg: string;
  estimatedMinutes: number;
  completedCount: number;
  totalLessons: number;
}

export function ContinueLearning({
  slug,
  title,
  courseLabel,
  courseEmoji,
  accentColor,
  accentBg,
  estimatedMinutes,
  completedCount,
  totalLessons,
}: ContinueLearningProps) {
  const pct = Math.round((completedCount / Math.max(totalLessons, 1)) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative overflow-hidden rounded-2xl border border-[var(--border-color)] mb-6"
      style={{
        background: `linear-gradient(135deg, ${accentBg} 0%, var(--surface) 60%)`,
      }}
    >
      {/* Decorative blob */}
      <div
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10 blur-2xl pointer-events-none"
        style={{ background: accentColor }}
      />

      <div className="relative z-10 p-5 flex items-center gap-4">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border"
          style={{ background: accentColor + '22', borderColor: accentColor + '44' }}
        >
          {courseEmoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: accentColor }}>
              Continue Learning · {courseLabel}
            </span>
          </div>
          <h3 className="text-sm font-bold text-[var(--text-primary)] truncate mb-1">{title}</h3>
          <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              ~{estimatedMinutes}m
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-16 h-1 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: accentColor }} />
              </div>
              <span>{pct}% done</span>
            </div>
          </div>
        </div>

        <Link
          href={`/lesson/${slug}`}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shrink-0 transition-all hover:opacity-90 active:scale-95"
          style={{ background: accentColor }}
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          Resume
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
