'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, Users, Clock, BookOpen, ArrowRight, Star, Zap } from 'lucide-react';

export interface CourseCardData {
  id: string;
  emoji: string;
  label: string;
  sublabel: string;
  description: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  totalLessons: number;
  totalHours: number;
  totalChapters: number;
  isPremium: boolean;
  priceInr: number;
  students: number;
  rating: number;
  level: string;
  tags: string[];
}

interface CourseCardProps {
  course: CourseCardData;
  isEnrolled: boolean;
  isActive: boolean;
  completedCount: number;
  onSelect: () => void;
  onEnroll: () => Promise<void>;
  isLoggedIn: boolean;
}

function ProgressRing({
  percent,
  color,
  size = 56,
}: {
  percent: number;
  color: string;
  size?: number;
}) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={4} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
    </svg>
  );
}

export function CourseCard({
  course,
  isEnrolled,
  isActive,
  completedCount,
  onSelect,
  onEnroll,
  isLoggedIn,
}: CourseCardProps) {
  const progressPercent =
    course.totalLessons > 0 ? Math.round((completedCount / course.totalLessons) * 100) : 0;

  return (
    <motion.div
      layout
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={onSelect}
      className={`relative flex flex-col rounded-2xl border cursor-pointer overflow-hidden transition-all duration-200 ${
        isActive
          ? 'border-[var(--accent)]/50 shadow-lg shadow-[var(--accent)]/10'
          : 'border-[var(--border-color)] hover:border-[var(--accent)]/30'
      }`}
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${course.accentBg} 0%, var(--surface) 70%)`
          : 'var(--surface)',
      }}
    >
      {/* Premium badge */}
      {course.isPremium && (
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider z-10"
          style={{ background: course.accentColor + '22', color: course.accentColor, border: `1px solid ${course.accentColor}44` }}
        >
          <Zap className="w-2.5 h-2.5" />
          Premium
        </div>
      )}

      {/* Top area */}
      <div className="p-5 flex-1">
        <div className="flex items-start gap-3 mb-3">
          {/* Emoji icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: course.accentBg, border: `1px solid ${course.accentBorder}` }}
          >
            {course.emoji}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-[var(--text-primary)] leading-tight mb-0.5">
              {course.label}
            </h3>
            <p className="text-[11px] text-[var(--text-disabled)] truncate">{course.sublabel}</p>
          </div>

          {/* Progress ring when enrolled */}
          {isEnrolled && (
            <div className="relative shrink-0">
              <ProgressRing percent={progressPercent} color={course.accentColor} size={44} />
              <span
                className="absolute inset-0 flex items-center justify-center text-[9px] font-bold"
                style={{ color: course.accentColor }}
              >
                {progressPercent}%
              </span>
            </div>
          )}
        </div>

        <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium"
              style={{ background: course.accentBg, color: course.accentColor }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-[10px] text-[var(--text-disabled)]">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {course.totalLessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            ~{course.totalHours}h
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {course.students.toLocaleString()}
          </span>
          <span className="flex items-center gap-1 ml-auto">
            <Star className="w-3 h-3 fill-[var(--warning)] text-[var(--warning)]" />
            {course.rating}
          </span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-5 pb-5">
        {isEnrolled ? (
          <Link
            href="/dashboard"
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background: course.accentColor + '1A', color: course.accentColor }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Continue Learning
            <ArrowRight className="w-3.5 h-3.5 ml-auto" />
          </Link>
        ) : course.isPremium ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-[var(--text-primary)]">
                ₹{(course.priceInr / 100).toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[var(--text-disabled)] line-through">₹999</span>
            </div>
            <button
              onClick={async (e) => { e.stopPropagation(); await onEnroll(); }}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: `linear-gradient(135deg, ${course.accentColor}, ${course.accentColor}cc)` }}
            >
              <Lock className="w-3.5 h-3.5" />
              Get Full Access
            </button>
          </div>
        ) : (
          <button
            onClick={async (e) => { e.stopPropagation(); if (isLoggedIn) await onEnroll(); }}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90 active:scale-95"
            style={{ background: course.accentBg, color: course.accentColor, border: `1px solid ${course.accentBorder}` }}
          >
            {isLoggedIn ? 'Enroll Free' : 'Sign in to Enroll'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Enrolled progress bar at bottom */}
      {isEnrolled && (
        <div className="h-1 w-full bg-[var(--surface-elevated)]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="h-full rounded-full"
            style={{ background: course.accentColor }}
          />
        </div>
      )}
    </motion.div>
  );
}
