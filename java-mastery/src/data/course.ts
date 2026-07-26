// ============================================================================
// CodePulse — Course Data Structure
// Flexible: add/remove lessons and chapters by editing this file
// ============================================================================

import { type LessonMeta, type Chapter } from '@/types';

import courseData from './course.json';

export const ALL_LESSONS: LessonMeta[] = courseData.lessons as LessonMeta[];
export const CHAPTERS: Omit<Chapter, 'lessons'>[] = courseData.chapters as Omit<Chapter, 'lessons'>[];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get chapters with their lessons populated */
export function getChaptersWithLessons(course: string = 'java'): Chapter[] {
  return CHAPTERS
    .filter((ch) => ch.course === course || (!ch.course && course === 'java'))
    .map((ch) => ({
      ...ch,
      lessons: ALL_LESSONS.filter(
        (l) => (l.course === course || (!l.course && course === 'java')) && l.chapter === ch.number
      ).sort((a, b) => a.lesson - b.lesson),
    }))
    .filter((ch) => ch.lessons.length > 0);
}

/** Get a lesson by slug */
export function getLessonBySlug(slug: string): LessonMeta | undefined {
  return ALL_LESSONS.find((l) => l.slug === slug);
}

/** Get previous and next lessons for navigation */
export function getAdjacentLessons(slug: string): {
  prev: LessonMeta | null;
  next: LessonMeta | null;
} {
  const lesson = getLessonBySlug(slug);
  const course = lesson?.course || 'java';
  const sorted = [...ALL_LESSONS].filter(l => l.course === course || (!l.course && course === 'java')).sort(
    (a, b) => a.chapter * 100 + a.lesson - (b.chapter * 100 + b.lesson)
  );
  const index = sorted.findIndex((l) => l.slug === slug);
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

/** Course statistics */
export function getCourseStats(course: string = 'java') {
  const lessons = ALL_LESSONS.filter((l) => l.course === course || (!l.course && course === 'java'));
  const totalDuration = lessons.reduce((sum, l) => sum + l.estimatedMinutes, 0);
  const chapterCount = new Set(lessons.map(l => l.chapter)).size;
  return {
    totalLessons: lessons.length,
    totalChapters: chapterCount,
    totalDurationMinutes: totalDuration,
    totalDurationHours: Math.round(totalDuration / 60),
  };
}


