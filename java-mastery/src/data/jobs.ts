// ============================================================================
// CodePulse — Job Postings Data
// ============================================================================

import jobsData from './jobs.json';

export type WorkMode   = 'Remote' | 'Hybrid' | 'On-site';
export type JobType    = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type ExpLevel   = 'Entry (0–1 yr)' | 'Junior (1–3 yrs)' | 'Mid (3–5 yrs)' | 'Senior (5+ yrs)';
export type JobRole    =
  | 'Java Backend'
  | 'Java Full Stack'
  | 'Java Microservices'
  | 'Spring Boot'
  | 'Java DevOps'
  | 'Android (Java)'
  | 'Data Engineering'
  | 'Cloud / Platform'
  | 'Security Engineering'
  | 'Python Backend'
  | 'Python Data Science'
  | 'Machine Learning'
  | 'React / Frontend'
  | 'Node.js Backend'
  | 'Full Stack (React + Node)'
  | 'DevOps / SRE'
  | 'Mobile (iOS / Android)'
  | 'Embedded / Systems';

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  companySize: string;
  location: string;
  workMode: WorkMode;
  role: JobRole;
  type: JobType;
  experienceLevel: ExpLevel;
  salary: string;
  postedAt: string;             // ISO date
  applicationDeadline: string; // ISO date
  url: string;
  featured?: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  techStack: string[];
}

// ── Category metadata (used by the Browse section) ───────────────────────────

export interface RoleCategory {
  label: string;
  roles: JobRole[];
  icon: string;          // emoji used in browse cards
  color: string;         // Tailwind accent class fragment, e.g. 'orange'
  description: string;
}

export const ROLE_CATEGORIES: RoleCategory[] = [
  {
    label: 'Java',
    roles: ['Java Backend', 'Java Full Stack', 'Java Microservices', 'Spring Boot', 'Java DevOps', 'Android (Java)'],
    icon: '☕',
    color: 'orange',
    description: 'Backend, full-stack, microservices & Spring Boot roles',
  },
  {
    label: 'Python',
    roles: ['Python Backend', 'Python Data Science', 'Machine Learning'],
    icon: '🐍',
    color: 'blue',
    description: 'Python services, data science & ML engineering',
  },
  {
    label: 'Frontend',
    roles: ['React / Frontend'],
    icon: '⚛️',
    color: 'cyan',
    description: 'React, TypeScript & modern UI engineering',
  },
  {
    label: 'Full Stack',
    roles: ['Full Stack (React + Node)', 'Java Full Stack'],
    icon: '🔗',
    color: 'violet',
    description: 'End-to-end product engineering roles',
  },
  {
    label: 'DevOps / Cloud',
    roles: ['DevOps / SRE', 'Cloud / Platform', 'Java DevOps'],
    icon: '☁️',
    color: 'sky',
    description: 'CI/CD, infrastructure, SRE & platform roles',
  },
  {
    label: 'Data & ML',
    roles: ['Data Engineering', 'Python Data Science', 'Machine Learning'],
    icon: '📊',
    color: 'green',
    description: 'Data pipelines, analytics & machine-learning engineering',
  },
  {
    label: 'Security',
    roles: ['Security Engineering'],
    icon: '🔒',
    color: 'red',
    description: 'AppSec, cloud security & penetration testing',
  },
  {
    label: 'Mobile',
    roles: ['Mobile (iOS / Android)', 'Android (Java)'],
    icon: '📱',
    color: 'pink',
    description: 'iOS, Android & cross-platform mobile development',
  },
];

// ── Lookup arrays used by filter UI ─────────────────────────────────────────

export const JOB_ROLES: JobRole[] = [
  'Java Backend',
  'Java Full Stack',
  'Java Microservices',
  'Spring Boot',
  'Java DevOps',
  'Android (Java)',
  'Data Engineering',
  'Cloud / Platform',
  'Security Engineering',
  'Python Backend',
  'Python Data Science',
  'Machine Learning',
  'React / Frontend',
  'Node.js Backend',
  'Full Stack (React + Node)',
  'DevOps / SRE',
  'Mobile (iOS / Android)',
  'Embedded / Systems',
];

export const JOB_TYPES: JobType[] = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
];

export const EXP_LEVELS: ExpLevel[] = [
  'Entry (0–1 yr)',
  'Junior (1–3 yrs)',
  'Mid (3–5 yrs)',
  'Senior (5+ yrs)',
];

export const WORK_MODES: WorkMode[] = ['Remote', 'Hybrid', 'On-site'];

// ── Job type metadata (used by browse section) ───────────────────────────────

export interface TypeMeta {
  type: JobType;
  icon: string;
  description: string;
}

export const JOB_TYPE_META: TypeMeta[] = [
  { type: 'Full-time', icon: '🏢', description: 'Permanent, benefits-included positions' },
  { type: 'Part-time', icon: '⏰', description: 'Flexible hours, ongoing engagements' },
  { type: 'Contract', icon: '📄', description: 'Fixed-term & freelance projects' },
  { type: 'Internship', icon: '🎓', description: 'Entry-level & new-grad programmes' },
];

// ── Data ─────────────────────────────────────────────────────────────────────

export const jobPostings: JobPosting[] = jobsData as JobPosting[];
