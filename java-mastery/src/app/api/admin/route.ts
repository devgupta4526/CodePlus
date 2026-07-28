import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const LESSONS_DIR = path.join(process.cwd(), 'src', 'content', 'lessons');

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    
    if (action === 'all') {
      const coursePath = path.join(DATA_DIR, 'course.json');
      const jobsPath = path.join(DATA_DIR, 'jobs.json');
      const problemsPath = path.join(DATA_DIR, 'problems.json');
      const mcqsPath = path.join(DATA_DIR, 'mcqs.json');
      const contestsPath = path.join(DATA_DIR, 'contests.json');
      const settingsPath = path.join(DATA_DIR, 'settings.json');

      const readJson = (p: string, fallback: any) => {
        if (!fs.existsSync(p)) return fallback;
        try {
          return JSON.parse(fs.readFileSync(p, 'utf-8'));
        } catch {
          return fallback;
        }
      };

      const courseData = readJson(coursePath, { chapters: [], lessons: [] });

      return NextResponse.json({
        success: true,
        lessons: courseData.lessons,
        chapters: courseData.chapters,
        jobs: readJson(jobsPath, []),
        problems: readJson(problemsPath, []),
        mcqs: readJson(mcqsPath, []),
        contests: readJson(contestsPath, []),
        settings: readJson(settingsPath, {})
      });
    }

    if (action === 'get_slides') {
      const slug = searchParams.get('slug');
      if (!slug) {
        return NextResponse.json({ success: false, error: 'Slug is required' }, { status: 400 });
      }
      const slidesPath = path.join(LESSONS_DIR, `${slug}-slides.json`);
      if (fs.existsSync(slidesPath)) {
        try {
          const slidesData = JSON.parse(fs.readFileSync(slidesPath, 'utf-8'));
          return NextResponse.json({ success: true, slides: slidesData });
        } catch {
          return NextResponse.json({ success: true, slides: [] });
        }
      }
      return NextResponse.json({ success: true, slides: [] });
    }

    const slug = searchParams.get('slug');
    if (!slug) {
      return NextResponse.json({ success: false, error: 'Slug or action=all is required' }, { status: 400 });
    }
    const mdxPath = path.join(LESSONS_DIR, `${slug}.mdx`);
    if (!fs.existsSync(mdxPath)) {
      return NextResponse.json({ success: true, content: '' });
    }
    const content = fs.readFileSync(mdxPath, 'utf-8');
    return NextResponse.json({ success: true, content });
  } catch (err) {
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { action, ...params } = await req.json();

    switch (action) {
      case 'save_lesson': {
        const { lesson, content } = params;
        const slug = lesson.slug;
        if (!slug) {
          return NextResponse.json({ success: false, error: 'Slug is required' }, { status: 400 });
        }

        // 1. Write MDX file
        const mdxPath = path.join(LESSONS_DIR, `${slug}.mdx`);
        if (!fs.existsSync(LESSONS_DIR)) {
          fs.mkdirSync(LESSONS_DIR, { recursive: true });
        }
        fs.writeFileSync(mdxPath, content || '', 'utf-8');

                // 2. Update course.json
        const coursePath = path.join(DATA_DIR, 'course.json');
        let courseData: { chapters: any[]; lessons: any[] } = { chapters: [], lessons: [] };
        if (fs.existsSync(coursePath)) {
          courseData = JSON.parse(fs.readFileSync(coursePath, 'utf-8'));
        }

        const idx = courseData.lessons.findIndex((l: any) => l.slug === slug);
        if (idx >= 0) {
          courseData.lessons[idx] = lesson;
        } else {
          courseData.lessons.push(lesson);
        }

        fs.writeFileSync(coursePath, JSON.stringify(courseData, null, 2), 'utf-8');
        return NextResponse.json({ success: true });
      }

      case 'delete_lesson': {
        const { slug } = params;
        if (!slug) {
          return NextResponse.json({ success: false, error: 'Slug is required' }, { status: 400 });
        }

        // 1. Delete MDX file
        const mdxPath = path.join(LESSONS_DIR, `${slug}.mdx`);
        if (fs.existsSync(mdxPath)) {
          fs.unlinkSync(mdxPath);
        }

        // 2. Remove from course.json
        const coursePath = path.join(DATA_DIR, 'course.json');
        if (fs.existsSync(coursePath)) {
          const courseData: { chapters: any[]; lessons: any[] } = JSON.parse(fs.readFileSync(coursePath, 'utf-8'));
          courseData.lessons = courseData.lessons.filter((l: any) => l.slug !== slug);
          fs.writeFileSync(coursePath, JSON.stringify(courseData, null, 2), 'utf-8');
        }
        return NextResponse.json({ success: true });
      }

      case 'save_chapters': {
        const { chapters } = params;
        const coursePath = path.join(DATA_DIR, 'course.json');
        let courseData: { chapters: any[]; lessons: any[] } = { chapters: [], lessons: [] };
        if (fs.existsSync(coursePath)) {
          courseData = JSON.parse(fs.readFileSync(coursePath, 'utf-8'));
        }
        courseData.chapters = chapters;
        fs.writeFileSync(coursePath, JSON.stringify(courseData, null, 2), 'utf-8');
        return NextResponse.json({ success: true });
      }

      case 'save_jobs': {
        const { jobs } = params;
        const jobsPath = path.join(DATA_DIR, 'jobs.json');
        fs.writeFileSync(jobsPath, JSON.stringify(jobs, null, 2), 'utf-8');
        return NextResponse.json({ success: true });
      }

      case 'save_problems': {
        const { problems } = params;
        const problemsPath = path.join(DATA_DIR, 'problems.json');
        fs.writeFileSync(problemsPath, JSON.stringify(problems, null, 2), 'utf-8');
        return NextResponse.json({ success: true });
      }

      case 'save_mcqs': {
        const { mcqs } = params;
        const mcqsPath = path.join(DATA_DIR, 'mcqs.json');
        fs.writeFileSync(mcqsPath, JSON.stringify(mcqs, null, 2), 'utf-8');
        return NextResponse.json({ success: true });
      }

      case 'save_contests': {
        const { contests } = params;
        const contestsPath = path.join(DATA_DIR, 'contests.json');
        fs.writeFileSync(contestsPath, JSON.stringify(contests, null, 2), 'utf-8');
        return NextResponse.json({ success: true });
      }

      case 'save_slides': {
        const { slug, slides } = params;
        if (!slug) {
          return NextResponse.json({ success: false, error: 'Slug is required' }, { status: 400 });
        }
        const slidesPath = path.join(LESSONS_DIR, `${slug}-slides.json`);
        if (!fs.existsSync(LESSONS_DIR)) {
          fs.mkdirSync(LESSONS_DIR, { recursive: true });
        }
        fs.writeFileSync(slidesPath, JSON.stringify(slides, null, 2), 'utf-8');
        return NextResponse.json({ success: true });
      }

      case 'save_settings': {
        const { settings } = params;
        const settingsPath = path.join(DATA_DIR, 'settings.json');
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');
        return NextResponse.json({ success: true });
      }

      case 'save_content_only': {
        // Lightweight action from the inline editor — only updates the MDX file,
        // leaves course.json metadata completely untouched.
        const { slug, content } = params;
        if (!slug) {
          return NextResponse.json({ success: false, error: 'Slug is required' }, { status: 400 });
        }
        const mdxPath = path.join(LESSONS_DIR, `${slug}.mdx`);
        if (!fs.existsSync(LESSONS_DIR)) {
          fs.mkdirSync(LESSONS_DIR, { recursive: true });
        }
        // Preserve existing frontmatter if the file already exists
        let finalContent = content as string;
        if (fs.existsSync(mdxPath)) {
          const existing = fs.readFileSync(mdxPath, 'utf-8');
          const fmMatch = existing.match(/^---[\s\S]*?---\n/);
          const newHasFm = finalContent.trimStart().startsWith('---');
          if (fmMatch && !newHasFm) {
            finalContent = fmMatch[0] + '\n' + finalContent;
          }
        }
        fs.writeFileSync(mdxPath, finalContent, 'utf-8');
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}
