// ============================================================================
// CodePulse — Type Definitions
// ============================================================================

/** Difficulty level for lessons */
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

/** Lesson frontmatter metadata */
export interface LessonMeta {
  course: 'java' | 'python' | 'springboot' | 'coa' | 'ibps-so-it' | 'quants' | 'reasoning' | 'english';
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
  /** Optional YouTube / direct-video URL for the video lesson variant */
  videoUrl?: string;
}

/** Image note item for visual learning */
export interface ImageNote {
  id: string;
  filename: string;
  url: string;
  type: 'image' | 'video';
  title: string;
  order: number;
  sectionNumber?: number;
  keywords: string[];
}

/** Full lesson data including content */
export interface Lesson extends LessonMeta {
  content: string;
  headings: Heading[];
  imageNotes?: ImageNote[];
}

/** Heading extracted from content for TOC */
export interface Heading {
  id: string;
  text: string;
  level: number;
}

/** Chapter grouping */
export interface Chapter {
  course?: 'java' | 'python' | 'springboot' | 'coa' | 'ibps-so-it' | 'quants' | 'reasoning' | 'english' | string;
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

export type MasteryStatus = 'learning' | 'review' | 'mastered';

export interface LessonMastery {
  slug: string;
  status: MasteryStatus;
  confidence: 1 | 2 | 3;
  lastReviewedAt: string;
  nextReviewAt: string;
}

export interface GuidedProjectProgress {
  projectId: string;
  completedMilestones: string[];
  startedAt?: string;
  updatedAt: string;
}

export interface LearningState {
  version: 1;
  mastery: Record<string, LessonMastery>;
  projects: Record<string, GuidedProjectProgress>;
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
export type CourseId = 
  | 'java'
  | 'python'
  | 'system-design'
  | 'web-dev'
  | 'software'
  | 'dbms'
  | 'quants'
  | 'reasoning'
  | 'english';

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
