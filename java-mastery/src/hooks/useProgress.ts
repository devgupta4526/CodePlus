'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getProgress,
  toggleLessonComplete,
  toggleBookmark,
  getCompletionCount,
  getBookmarkedSlugs,
  getLessonProgress,
} from '@/lib/progress';
import { type CourseProgress } from '@/types';

/** Hook to manage lesson progress state */
export function useProgress() {
  const [progress, setProgress] = useState<CourseProgress>({ lessons: {} });
  const [completionCount, setCompletionCount] = useState(0);

  useEffect(() => {
    setProgress(getProgress());
    setCompletionCount(getCompletionCount());
  }, []);

  const toggleComplete = useCallback((slug: string) => {
    const newState = toggleLessonComplete(slug);
    setProgress(getProgress());
    setCompletionCount(getCompletionCount());
    return newState;
  }, []);

  const toggleBookmarkFn = useCallback((slug: string) => {
    const newState = toggleBookmark(slug);
    setProgress(getProgress());
    return newState;
  }, []);

  const isCompleted = useCallback(
    (slug: string) => progress.lessons[slug]?.completed ?? false,
    [progress]
  );

  const isBookmarked = useCallback(
    (slug: string) => progress.lessons[slug]?.bookmarked ?? false,
    [progress]
  );

  return {
    progress,
    completionCount,
    toggleComplete,
    toggleBookmark: toggleBookmarkFn,
    isCompleted,
    isBookmarked,
  };
}

export { getLessonProgress, getBookmarkedSlugs };
