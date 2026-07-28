'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkAdminSession } from '@/lib/adminStore';
import { InlineEditor } from '@/components/admin/InlineEditor';
import { ArrowLeft } from 'lucide-react';

export default function AdminEditorPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [lessonTitle, setLessonTitle] = useState(slug);

  // Guard: redirect to /admin if not authenticated
  useEffect(() => {
    const ok = checkAdminSession();
    setAuthed(ok);
    if (!ok) router.replace('/admin');
  }, [router]);

  // Fetch lesson title from course data for the toolbar label
  useEffect(() => {
    if (!slug) return;
    fetch('/api/admin?action=all')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.lessons)) {
          const lesson = data.lessons.find((l: { slug: string; title: string }) => l.slug === slug);
          if (lesson?.title) setLessonTitle(lesson.title);
        }
      })
      .catch(() => {/* non-fatal */});
  }, [slug]);

  if (authed === null) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) return null; // redirect in progress

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Page header */}
      <div className="sticky top-0 z-20 h-14 flex items-center gap-3 px-6 border-b border-[var(--border-color)] bg-[var(--bg)]/90 backdrop-blur-xl">
        <button
          onClick={() => router.push('/admin')}
          className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Admin
        </button>
        <div className="h-4 w-px bg-[var(--border-color)]" />
        <span className="text-sm font-semibold text-[var(--text-primary)] truncate">
          Content Editor
        </span>
        <span className="text-xs text-[var(--text-disabled)] font-mono truncate hidden sm:block">
          {slug}.mdx
        </span>
      </div>

      {/* Editor canvas — matches the lesson reading layout width */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InlineEditor slug={slug} lessonTitle={lessonTitle} />
      </div>
    </div>
  );
}
