'use client';

import Link from 'next/link';
import {
  Clock,
  BookOpen,
  ChevronRight,
  CheckCircle2,
  Circle,
  BarChart3,
  Bookmark,
  Filter,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { getChaptersWithLessons, getCourseStats, ALL_LESSONS } from '@/data/course';
import { useProgress } from '@/hooks/useProgress';
import { useState } from 'react';
import { type Difficulty } from '@/types';

const difficultyColors: Record<Difficulty, string> = {
  beginner: 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20',
  intermediate: 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/20',
  advanced: 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20',
};

export default function DashboardPage() {
  const [activeCourse, setActiveCourse] = useState<'java' | 'python' | 'springboot'>('java');
  const [filter, setFilter] = useState<'all' | 'bookmarked' | 'incomplete'>('all');
  
  const chapters = getChaptersWithLessons(activeCourse);
  const courseStats = getCourseStats(activeCourse);
  const { isCompleted, isBookmarked, toggleComplete, toggleBookmark } = useProgress();

  const courseCompletedCount = chapters.reduce((total, ch) => {
    return total + ch.lessons.filter(l => isCompleted(l.slug)).length;
  }, 0);

  const progressPercent = courseStats.totalLessons > 0 
    ? Math.round((courseCompletedCount / courseStats.totalLessons) * 100)
    : 0;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold mb-2">Course Dashboard</h1>
          <p className="text-[var(--text-muted)]">
            Track your progress through {courseStats.totalLessons} lessons across {courseStats.totalChapters} chapters.
          </p>
        </motion.div>

        {/* Course Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-[var(--surface-elevated)] border border-[var(--border-color)] rounded-xl w-fit">
          <button
            onClick={() => setActiveCourse('java')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCourse === 'java' 
                ? 'bg-[var(--accent)] text-white shadow-sm' 
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]'
            }`}
          >
            ☕ Java Foundations
          </button>
          <button
            onClick={() => setActiveCourse('python')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCourse === 'python' 
                ? 'bg-[#2a78d6] text-white shadow-sm' 
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]'
            }`}
          >
            🐍 Python & Django
          </button>
          <button
            onClick={() => setActiveCourse('springboot')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCourse === 'springboot' 
                ? 'bg-[#1baf7a] text-white shadow-sm' 
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]'
            }`}
          >
            🍃 Spring Boot
          </button>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                Overall Progress
              </span>
            </div>
            <span className="text-sm font-bold text-[var(--accent)]">
              {courseCompletedCount} / {courseStats.totalLessons} lessons
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"
            />
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-2">
            {progressPercent}% complete · ~{courseStats.totalDurationHours} hours total
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 mb-6">
          {[
            { key: 'all' as const, label: 'All', icon: BookOpen },
            { key: 'bookmarked' as const, label: 'Bookmarked', icon: Bookmark },
            { key: 'incomplete' as const, label: 'Incomplete', icon: Filter },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filter === f.key
                  ? 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20'
                  : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border-color)] hover:border-[var(--accent)]/30'
              }`}
            >
              <f.icon className="w-3 h-3" />
              {f.label}
            </button>
          ))}
        </div>

        {/* Chapters */}
        <div className="space-y-8">
          {chapters.map((chapter, chapterIdx) => {
            const filteredLessons = chapter.lessons.filter((lesson) => {
              if (filter === 'bookmarked') return isBookmarked(lesson.slug);
              if (filter === 'incomplete') return !isCompleted(lesson.slug);
              return true;
            });

            if (filteredLessons.length === 0) return null;

            const chapterCompleted = chapter.lessons.filter((l) =>
              isCompleted(l.slug)
            ).length;

            return (
              <motion.div
                key={chapter.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + chapterIdx * 0.05 }}
              >
                {/* Chapter header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[var(--accent)] bg-[var(--accent)]/10 px-2.5 py-1 rounded-lg">
                      CH {chapter.number}
                    </span>
                    <h2 className="text-lg font-heading font-semibold text-[var(--text-primary)]">
                      {chapter.title}
                    </h2>
                  </div>
                  <span className="text-xs text-[var(--text-muted)]">
                    {chapterCompleted}/{chapter.lessons.length}
                  </span>
                </div>

                {/* Lesson cards */}
                <div className="grid gap-3">
                  {filteredLessons.map((lesson) => {
                    const completed = isCompleted(lesson.slug);
                    const bookmarked = isBookmarked(lesson.slug);

                    return (
                      <div
                        key={lesson.slug}
                        className="group flex items-center gap-4 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] hover:border-[var(--accent)]/20 transition-all duration-200"
                      >
                        {/* Completion toggle */}
                        <button
                          onClick={() => toggleComplete(lesson.slug)}
                          className="shrink-0 cursor-pointer"
                          aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
                        >
                          {completed ? (
                            <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
                          ) : (
                            <Circle className="w-5 h-5 text-[var(--text-disabled)] hover:text-[var(--accent)]" />
                          )}
                        </button>

                        {/* Lesson info */}
                        <Link
                          href={`/lesson/${lesson.slug}`}
                          className="flex-1 min-w-0"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <h3
                              className={`text-sm font-semibold truncate ${
                                completed
                                  ? 'text-[var(--text-muted)] line-through'
                                  : 'text-[var(--text-primary)]'
                              }`}
                            >
                              {lesson.title}
                            </h3>
                            <span
                              className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium border ${difficultyColors[lesson.difficulty]}`}
                            >
                              {lesson.difficulty}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--text-muted)] truncate">
                            {lesson.description}
                          </p>
                        </Link>

                        {/* Meta */}
                        <div className="hidden sm:flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-1 text-xs text-[var(--text-disabled)]">
                            <Clock className="w-3 h-3" />
                            {lesson.estimatedMinutes}m
                          </div>
                          <button
                            onClick={() => toggleBookmark(lesson.slug)}
                            className="cursor-pointer"
                            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
                          >
                            <Bookmark
                              className={`w-4 h-4 transition-colors ${
                                bookmarked
                                  ? 'text-[var(--accent)] fill-[var(--accent)]'
                                  : 'text-[var(--text-disabled)] hover:text-[var(--accent)]'
                              }`}
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
              </motion.div>
            );
          })}
        </div>
        
        {chapters.length === 0 && (
          <div className="text-center py-20 border border-dashed border-[var(--border-color)] rounded-2xl bg-[var(--surface)]">
            <div className="w-16 h-16 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center mx-auto mb-4 text-2xl">
              🚧
            </div>
            <h3 className="text-lg font-heading font-semibold text-[var(--text-primary)] mb-2">
              Course in Development
            </h3>
            <p className="text-[var(--text-muted)] max-w-sm mx-auto">
              We're currently building the lessons for this course. Check back soon for updates!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
