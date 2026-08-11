'use client';

import { motion } from 'framer-motion';
import { Flame, Trophy, BookOpen, Zap } from 'lucide-react';

interface StatsBarProps {
  streak: number;
  totalCompleted: number;
  totalLessons: number;
  xpPoints: number;
  userName?: string;
}

export function StatsBar({ streak, totalCompleted, totalLessons, xpPoints, userName }: StatsBarProps) {
  const stats = [
    {
      icon: Flame,
      value: streak,
      label: 'Day Streak',
      color: '#F97316',
      bg: 'rgba(249,115,22,0.1)',
      suffix: streak === 1 ? '' : '',
    },
    {
      icon: BookOpen,
      value: totalCompleted,
      label: `of ${totalLessons} Lessons`,
      color: '#22C55E',
      bg: 'rgba(34,197,94,0.1)',
    },
    {
      icon: Zap,
      value: xpPoints,
      label: 'XP Earned',
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
      suffix: ' XP',
    },
    {
      icon: Trophy,
      value: Math.floor((totalCompleted / Math.max(totalLessons, 1)) * 100),
      label: 'Avg Progress',
      color: '#8B5CF6',
      bg: 'rgba(139,92,246,0.1)',
      suffix: '%',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-4 mb-6"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-bold text-[var(--text-primary)]">
            {userName ? `Welcome back, ${userName.split(' ')[0]}! 👋` : 'Your Learning Dashboard'}
          </h2>
          <p className="text-xs text-[var(--text-muted)]">Keep up the momentum</p>
        </div>
        {streak >= 3 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/20">
            <Flame className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="text-xs font-bold text-[#F97316]">{streak} day streak!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ background: stat.bg }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: stat.color + '22' }}
            >
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-base font-bold text-[var(--text-primary)] leading-none">
                {stat.value}{stat.suffix ?? ''}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
