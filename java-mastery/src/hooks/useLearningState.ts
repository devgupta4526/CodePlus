'use client';

import { useSyncExternalStore } from 'react';
import {
  getLearningServerSnapshot,
  getLearningState,
  setLessonMastery,
  subscribeToLearningState,
  toggleProjectMilestone,
} from '@/lib/learningState';

export function useLearningState() {
  const state = useSyncExternalStore(
    subscribeToLearningState,
    getLearningState,
    getLearningServerSnapshot,
  );

  return {
    state,
    setLessonMastery,
    toggleProjectMilestone,
  };
}
