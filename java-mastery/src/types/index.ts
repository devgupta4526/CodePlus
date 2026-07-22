// ============================================================================
// CodePulse — Type Definitions
// ============================================================================

/** Difficulty level for lessons */
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

/** Lesson frontmatter metadata */
export interface LessonMeta {
  course: 'java' | 'python' | 'springboot';
  title: string;
  slug: string;
  chapter: number;
  chapterTitle: string;
  lesson: number;
  description: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  prerequisites: string[];
  objectives: string[];
  tags: string[];
}

/** Full lesson data including content */
export interface Lesson extends LessonMeta {
  content: string;
  headings: Heading[];
}

/** Heading extracted from content for TOC */
export interface Heading {
  id: string;
  text: string;
  level: number;
}

/** Chapter grouping */
export interface Chapter {
  number: number;
  title: string;
  description: string;
  lessons: LessonMeta[];
}

/** User progress for a lesson */
export interface LessonProgress {
  slug: string;
  completed: boolean;
  completedAt?: string;
  bookmarked: boolean;
  quizScores?: Record<string, number>;
}

/** Overall course progress */
export interface CourseProgress {
  lessons: Record<string, LessonProgress>;
  lastVisited?: string;
  startedAt?: string;
}

/** Search result */
export interface SearchResult {
  slug: string;
  title: string;
  chapter: string;
  excerpt: string;
  matchCount: number;
}

/** Callout types supported */
export type CalloutType =
  | 'note'
  | 'tip'
  | 'warning'
  | 'important'
  | 'caution'
  | 'success'
  | 'danger'
  | 'interview'
  | 'best-practice';

/** Quiz question */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

/** Navigation item for prev/next */
export interface NavItem {
  slug: string;
  title: string;
  chapter: string;
}
