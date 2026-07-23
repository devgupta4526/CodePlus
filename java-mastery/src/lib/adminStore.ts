// ============================================================================
// CodePulse — Admin Store
// All edits are persisted in localStorage so the running app reflects changes
// immediately (client-side). Keys are prefixed with "cp_admin_".
// ============================================================================

import { type LessonMeta } from '@/types';
import { ALL_LESSONS, CHAPTERS } from '@/data/course';
import { jobPostings, type JobPosting } from '@/data/jobs';

// ── Auth ─────────────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = 'codepulse2025'; // simple password gate
const SESSION_KEY    = 'cp_admin_session';

export function checkAdminSession(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(SESSION_KEY) === 'authenticated';
}

export function adminLogin(password: string): boolean {
  if (password !== ADMIN_PASSWORD) return false;
  localStorage.setItem(SESSION_KEY, 'authenticated');
  return true;
}

export function adminLogout(): void {
  localStorage.removeItem(SESSION_KEY);
}

// ── Generic helpers ───────────────────────────────────────────────────────────

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch { /* ignore */ }
  return fallback;
}

function write<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

// ── Lessons ──────────────────────────────────────────────────────────────────

const LS_LESSONS = 'cp_admin_lessons';

export type AdminLesson = LessonMeta & { _custom?: boolean; _deleted?: boolean };

export function getAdminLessons(): AdminLesson[] {
  const stored = read<AdminLesson[]>(LS_LESSONS, []);
  // Merge: stored overrides defaults; deleted ones are excluded
  const storedMap = new Map(stored.map((l) => [l.slug, l]));
  const base: AdminLesson[] = ALL_LESSONS.map((l) => storedMap.get(l.slug) ?? l);
  // Add any custom ones not in base
  const customOnly = stored.filter((l) => l._custom && !ALL_LESSONS.find((x) => x.slug === l.slug));
  return [...base, ...customOnly].filter((l) => !l._deleted);
}

export function saveAdminLessons(lessons: AdminLesson[]): void {
  write(LS_LESSONS, lessons);
}

export function upsertLesson(lesson: AdminLesson): void {
  const all = read<AdminLesson[]>(LS_LESSONS, []);
  const idx = all.findIndex((l) => l.slug === lesson.slug);
  if (idx >= 0) all[idx] = lesson;
  else all.push(lesson);
  write(LS_LESSONS, all);
}

export function deleteLesson(slug: string): void {
  const all = read<AdminLesson[]>(LS_LESSONS, []);
  const idx = all.findIndex((l) => l.slug === slug);
  if (idx >= 0) {
    all[idx] = { ...all[idx], _deleted: true };
  } else {
    // Mark default lesson as deleted
    const lesson = ALL_LESSONS.find((l) => l.slug === slug);
    if (lesson) all.push({ ...lesson, _deleted: true });
  }
  write(LS_LESSONS, all);
}

// ── Chapters ─────────────────────────────────────────────────────────────────

const LS_CHAPTERS = 'cp_admin_chapters';

export interface AdminChapter {
  number: number;
  title: string;
  description: string;
  course?: string;
}

export function getAdminChapters(): AdminChapter[] {
  return read<AdminChapter[]>(LS_CHAPTERS, CHAPTERS as AdminChapter[]);
}

export function saveAdminChapters(chapters: AdminChapter[]): void {
  write(LS_CHAPTERS, chapters);
}

// ── Jobs ─────────────────────────────────────────────────────────────────────

const LS_JOBS = 'cp_admin_jobs';

export type AdminJob = JobPosting & { _custom?: boolean; _deleted?: boolean };

export function getAdminJobs(): AdminJob[] {
  const stored = read<AdminJob[]>(LS_JOBS, []);
  const storedMap = new Map(stored.map((j) => [j.id, j]));
  const base: AdminJob[] = jobPostings.map((j) => storedMap.get(j.id) ?? j);
  const customOnly = stored.filter((j) => j._custom && !jobPostings.find((x) => x.id === j.id));
  return [...base, ...customOnly].filter((j) => !j._deleted);
}

export function upsertJob(job: AdminJob): void {
  const all = read<AdminJob[]>(LS_JOBS, []);
  const idx = all.findIndex((j) => j.id === job.id);
  if (idx >= 0) all[idx] = job;
  else all.push(job);
  write(LS_JOBS, all);
}

export function deleteJob(id: string): void {
  const all = read<AdminJob[]>(LS_JOBS, []);
  const idx = all.findIndex((j) => j.id === id);
  if (idx >= 0) {
    all[idx] = { ...all[idx], _deleted: true };
  } else {
    const job = jobPostings.find((j) => j.id === id);
    if (job) all.push({ ...job, _deleted: true });
  }
  write(LS_JOBS, all);
}

// ── Practice Problems ─────────────────────────────────────────────────────────

const LS_PROBLEMS = 'cp_admin_problems';

export interface AdminProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  tags: string[];
  timeLimit: string;
  description: string;
  starterCode: Record<string, string>;
  solutionCode: Record<string, string>;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  _custom?: boolean;
  _deleted?: boolean;
}

const DEFAULT_PROBLEMS: AdminProblem[] = [
  {
    id: 'fizzbuzz', title: 'FizzBuzz', difficulty: 'Easy', category: 'Loops',
    tags: ['loops', 'conditionals', 'math'], timeLimit: '< 1ms',
    description: 'Print numbers from 1 to 100 following FizzBuzz rules.',
    starterCode: { java: '// Write FizzBuzz in Java', javascript: '// Write FizzBuzz in JS' },
    solutionCode: { java: '// Solution', javascript: '// Solution' },
    examples: [{ input: 'n = 15', output: '1 2 Fizz 4 Buzz ... FizzBuzz' }],
    constraints: ['1 ≤ n ≤ 100'],
  },
  {
    id: 'reverse-string', title: 'Reverse a String', difficulty: 'Easy', category: 'Strings',
    tags: ['strings', 'two-pointer'], timeLimit: 'O(n)',
    description: 'Given a string s, return the string reversed.',
    starterCode: { java: '// Reverse string in Java', javascript: '// Reverse string in JS' },
    solutionCode: { java: '// Solution', javascript: '// Solution' },
    examples: [{ input: 's = "hello"', output: '"olleh"' }],
    constraints: ['1 ≤ s.length ≤ 10⁵'],
  },
  {
    id: 'two-sum', title: 'Two Sum', difficulty: 'Medium', category: 'Arrays',
    tags: ['arrays', 'hash-map'], timeLimit: 'O(n)',
    description: 'Return indices of two numbers that add up to target.',
    starterCode: { java: '// Two Sum in Java', javascript: '// Two Sum in JS' },
    solutionCode: { java: '// Solution', javascript: '// Solution' },
    examples: [{ input: 'nums=[2,7,11,15], target=9', output: '[0,1]' }],
    constraints: ['2 ≤ nums.length ≤ 10⁴'],
  },
];

export function getAdminProblems(): AdminProblem[] {
  return read<AdminProblem[]>(LS_PROBLEMS, DEFAULT_PROBLEMS).filter((p) => !p._deleted);
}

export function upsertProblem(problem: AdminProblem): void {
  const all = read<AdminProblem[]>(LS_PROBLEMS, DEFAULT_PROBLEMS);
  const idx = all.findIndex((p) => p.id === problem.id);
  if (idx >= 0) all[idx] = problem;
  else all.push(problem);
  write(LS_PROBLEMS, all);
}

export function deleteProblem(id: string): void {
  const all = read<AdminProblem[]>(LS_PROBLEMS, DEFAULT_PROBLEMS);
  const idx = all.findIndex((p) => p.id === id);
  if (idx >= 0) all[idx] = { ...all[idx], _deleted: true };
  write(LS_PROBLEMS, all);
}

// ── MCQ Questions ─────────────────────────────────────────────────────────────

const LS_MCQ = 'cp_admin_mcq';

export interface AdminMcq {
  id: string;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  _deleted?: boolean;
}

const DEFAULT_MCQ: AdminMcq[] = [
  {
    id: 'java-jvm', question: 'What is the primary role of the JVM in Java?', difficulty: 'Easy', topic: 'Java Basics',
    options: [
      { id: 'a', text: 'To compile Java source code into bytecode' },
      { id: 'b', text: 'To execute Java bytecode on different platforms' },
      { id: 'c', text: 'To replace the Java compiler completely' },
      { id: 'd', text: 'To store Java source files in memory' },
    ],
    correctOptionId: 'b',
    explanation: "The JVM runs compiled Java bytecode, enabling platform independence.",
  },
  {
    id: 'oop-encapsulation', question: 'Which OOP principle hides internal implementation?', difficulty: 'Easy', topic: 'OOP',
    options: [
      { id: 'a', text: 'Inheritance' }, { id: 'b', text: 'Polymorphism' },
      { id: 'c', text: 'Encapsulation' }, { id: 'd', text: 'Abstraction leak' },
    ],
    correctOptionId: 'c',
    explanation: 'Encapsulation bundles data and behavior, controlling direct access.',
  },
];

export function getAdminMcq(): AdminMcq[] {
  return read<AdminMcq[]>(LS_MCQ, DEFAULT_MCQ).filter((q) => !q._deleted);
}

export function upsertMcq(mcq: AdminMcq): void {
  const all = read<AdminMcq[]>(LS_MCQ, DEFAULT_MCQ);
  const idx = all.findIndex((q) => q.id === mcq.id);
  if (idx >= 0) all[idx] = mcq;
  else all.push(mcq);
  write(LS_MCQ, all);
}

export function deleteMcq(id: string): void {
  const all = read<AdminMcq[]>(LS_MCQ, DEFAULT_MCQ);
  const idx = all.findIndex((q) => q.id === id);
  if (idx >= 0) all[idx] = { ...all[idx], _deleted: true };
  write(LS_MCQ, all);
}

// ── Contests ─────────────────────────────────────────────────────────────────

const LS_CONTESTS = 'cp_admin_contests';

export interface AdminContest {
  id: string;
  title: string;
  company?: string;
  type: 'OA' | 'Contest' | 'Mock Test' | 'Weekly';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
  status: 'live' | 'upcoming' | 'completed' | 'practice';
  duration: string;
  problems: number;
  participants?: number;
  startsAt?: string;
  topics: string[];
  description: string;
  locked: boolean;
  _deleted?: boolean;
}

const DEFAULT_CONTESTS: AdminContest[] = [
  {
    id: 'weekly-1', title: 'Weekly Challenge #1', type: 'Weekly', difficulty: 'Mixed',
    status: 'practice', duration: '90 min', problems: 4, participants: 1243,
    topics: ['Arrays', 'Strings', 'HashMap', 'Two Pointer'],
    description: 'A 4-problem set covering arrays, strings and hashing.', locked: false,
  },
  {
    id: 'amazon-oa-1', title: 'Amazon OA Simulation', company: 'Amazon', type: 'OA',
    difficulty: 'Medium', status: 'practice', duration: '105 min', problems: 2, participants: 3421,
    topics: ['Sliding Window', 'BFS', 'Heaps', 'Greedy'],
    description: 'Simulates the standard Amazon OA format.', locked: false,
  },
];

export function getAdminContests(): AdminContest[] {
  return read<AdminContest[]>(LS_CONTESTS, DEFAULT_CONTESTS).filter((c) => !c._deleted);
}

export function upsertContest(contest: AdminContest): void {
  const all = read<AdminContest[]>(LS_CONTESTS, DEFAULT_CONTESTS);
  const idx = all.findIndex((c) => c.id === contest.id);
  if (idx >= 0) all[idx] = contest;
  else all.push(contest);
  write(LS_CONTESTS, all);
}

export function deleteContest(id: string): void {
  const all = read<AdminContest[]>(LS_CONTESTS, DEFAULT_CONTESTS);
  const idx = all.findIndex((c) => c.id === id);
  if (idx >= 0) all[idx] = { ...all[idx], _deleted: true };
  write(LS_CONTESTS, all);
}

// ── Site Settings ─────────────────────────────────────────────────────────────

const LS_SETTINGS = 'cp_admin_settings';

export interface SiteSettings {
  platformName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  statsLessons: string;
  statsCourses: string;
  statsHours: string;
  statsTopics: string;
  footerText: string;
  adminPassword?: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  platformName: 'CodePulse',
  heroTitle: 'Learn to code.\nLand the job.',
  heroSubtitle: 'CodePulse is an interactive learning platform covering Java, Python, Spring Boot, DSA, and more.',
  heroTagline: 'Free · No Login · 6 Learning Paths',
  statsLessons: '100+',
  statsCourses: '6',
  statsHours: '80+',
  statsTopics: '200+',
  footerText: 'Built for developers who want to learn and land jobs.',
};

export function getSiteSettings(): SiteSettings {
  return read<SiteSettings>(LS_SETTINGS, DEFAULT_SETTINGS);
}

export function saveSiteSettings(settings: SiteSettings): void {
  write(LS_SETTINGS, settings);
}

// ── Reset ────────────────────────────────────────────────────────────────────

export function resetAllAdminData(): void {
  [LS_LESSONS, LS_CHAPTERS, LS_JOBS, LS_PROBLEMS, LS_MCQ, LS_CONTESTS, LS_SETTINGS].forEach((key) =>
    localStorage.removeItem(key),
  );
}
