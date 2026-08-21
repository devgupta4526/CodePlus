import type { LearningState, MasteryStatus } from '@/types';

const STORAGE_KEY = 'codepulse-learning-state-v1';
const CHANGE_EVENT = 'codepulse-learning-state-change';
const EMPTY_STATE: LearningState = { version: 1, mastery: {}, projects: {} };

let cachedRaw: string | null = null;
let cachedState: LearningState = EMPTY_STATE;

function parseState(raw: string | null): LearningState {
  if (!raw) return EMPTY_STATE;
  try {
    const parsed = JSON.parse(raw) as Partial<LearningState>;
    return {
      version: 1,
      mastery: parsed.mastery ?? {},
      projects: parsed.projects ?? {},
    };
  } catch {
    return EMPTY_STATE;
  }
}

export function getLearningState(): LearningState {
  if (typeof window === 'undefined') return EMPTY_STATE;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedState;
  cachedRaw = raw;
  cachedState = parseState(raw);
  return cachedState;
}

export function getLearningServerSnapshot(): LearningState {
  return EMPTY_STATE;
}

function writeState(state: LearningState) {
  if (typeof window === 'undefined') return;
  const raw = JSON.stringify(state);
  window.localStorage.setItem(STORAGE_KEY, raw);
  cachedRaw = raw;
  cachedState = state;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeToLearningState(callback: () => void) {
  if (typeof window === 'undefined') return () => undefined;
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener('storage', handleStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener('storage', handleStorage);
  };
}

export function setLessonMastery(slug: string, status: MasteryStatus, confidence: 1 | 2 | 3) {
  const state = getLearningState();
  const now = new Date();
  const reviewDays = status === 'mastered' ? 21 : status === 'review' ? Math.max(1, confidence * 2) : 1;
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + reviewDays);
  writeState({
    ...state,
    mastery: {
      ...state.mastery,
      [slug]: {
        slug,
        status,
        confidence,
        lastReviewedAt: now.toISOString(),
        nextReviewAt: nextReview.toISOString(),
      },
    },
  });
}

export function toggleProjectMilestone(projectId: string, milestoneId: string) {
  const state = getLearningState();
  const existing = state.projects[projectId];
  const completed = new Set(existing?.completedMilestones ?? []);
  if (completed.has(milestoneId)) completed.delete(milestoneId);
  else completed.add(milestoneId);
  const now = new Date().toISOString();
  writeState({
    ...state,
    projects: {
      ...state.projects,
      [projectId]: {
        projectId,
        completedMilestones: [...completed],
        startedAt: existing?.startedAt ?? now,
        updatedAt: now,
      },
    },
  });
}
