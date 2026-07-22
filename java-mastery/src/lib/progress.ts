// ============================================================================
// CodePulse — Progress Tracking (localStorage)
// ============================================================================

import { type CourseProgress, type LessonProgress } from '@/types';

const STORAGE_KEY = 'codepulse-progress';

/** Get all progress data */
export function getProgress(): CourseProgress {
  if (typeof window === 'undefined') {
    return { lessons: {} };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lessons: {} };
    return JSON.parse(raw) as CourseProgress;
  } catch {
    return { lessons: {} };
  }
}

/** Save progress data */
function saveProgress(progress: CourseProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

/** Get progress for a single lesson */
export function getLessonProgress(slug: string): LessonProgress {
  const progress = getProgress();
  return (
    progress.lessons[slug] ?? {
      slug,
      completed: false,
      bookmarked: false,
    }
  );
}

/** Toggle lesson completion */
export function toggleLessonComplete(slug: string): boolean {
  const progress = getProgress();
  const current = progress.lessons[slug] ?? {
    slug,
    completed: false,
    bookmarked: false,
  };
  current.completed = !current.completed;
  current.completedAt = current.completed
    ? new Date().toISOString()
    : undefined;
  progress.lessons[slug] = current;
  saveProgress(progress);
  return current.completed;
}

/** Toggle lesson bookmark */
export function toggleBookmark(slug: string): boolean {
  const progress = getProgress();
  const current = progress.lessons[slug] ?? {
    slug,
    completed: false,
    bookmarked: false,
  };
  current.bookmarked = !current.bookmarked;
  progress.lessons[slug] = current;
  saveProgress(progress);
  return current.bookmarked;
}

/** Set last visited lesson */
export function setLastVisited(slug: string): void {
  const progress = getProgress();
  progress.lastVisited = slug;
  if (!progress.startedAt) {
    progress.startedAt = new Date().toISOString();
  }
  saveProgress(progress);
}

/** Get completion count */
export function getCompletionCount(): number {
  const progress = getProgress();
  return Object.values(progress.lessons).filter((l) => l.completed).length;
}

/** Get bookmarked lesson slugs */
export function getBookmarkedSlugs(): string[] {
  const progress = getProgress();
  return Object.values(progress.lessons)
    .filter((l) => l.bookmarked)
    .map((l) => l.slug);
}
