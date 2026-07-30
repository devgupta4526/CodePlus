// ============================================================================
// CodePulse — Lesson Loading & MDX Processing
// ============================================================================

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { type LessonMeta, type Heading, type ImageNote } from '@/types';
import { ALL_LESSONS } from '@/data/course';
import { getImageNotesForLesson } from './imageNotesServer';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'lessons');

/** Read a lesson MDX file and return its content and frontmatter */
export function getLessonContent(slug: string): {
  meta: LessonMeta;
  content: string;
  headings: Heading[];
  imageNotes: ImageNote[];
} | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { content } = matter(raw);

  // Get metadata from course data (single source of truth)
  const meta = ALL_LESSONS.find((l) => l.slug === slug);
  if (!meta) return null;

  // Extract headings for TOC
  const headings = extractHeadings(content);
  // Get image notes for this lesson
  const imageNotes = getImageNotesForLesson(slug);

  return { meta, content, headings, imageNotes };
}

/** Extract headings from markdown content for Table of Contents */
function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const regex = /^(#{1,4})\s+(.+)$/gm;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2]
      .replace(/\*\*/g, '')
      .replace(/`/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();

    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    if (level >= 2 && level <= 4) {
      headings.push({ id, text, level });
    }
  }

  return headings;
}

/** Get all lesson slugs for static generation */
export function getAllLessonSlugs(): string[] {
  return ALL_LESSONS.map((l) => l.slug);
}

/** Build search index from all lessons */
export function buildSearchIndex(): Array<{
  slug: string;
  title: string;
  chapter: string;
  content: string;
}> {
  return ALL_LESSONS.map((lesson) => {
    const filePath = path.join(CONTENT_DIR, `${lesson.slug}.mdx`);
    let content = '';
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { content: mdxContent } = matter(raw);
      // Strip markdown syntax for search
      content = mdxContent
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`]+`/g, '')
        .replace(/#{1,6}\s/g, '')
        .replace(/\*\*/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/<[^>]+>/g, '')
        .replace(/\n{2,}/g, '\n')
        .trim();
    }
    return {
      slug: lesson.slug,
      title: lesson.title,
      chapter: lesson.chapterTitle,
      content,
    };
  });
}
