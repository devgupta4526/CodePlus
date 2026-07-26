'use client';

import Link from 'next/link';
import { useState, useCallback, useRef } from 'react';
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Bookmark,
  Menu,
  ChevronRight,
  Target,
  GraduationCap,
  List,
  Play,
  Tv
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { TableOfContents } from '@/components/layout/TableOfContents';
import { MDXRenderer } from '@/components/mdx/MDXRenderer';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { useProgress } from '@/hooks/useProgress';
import { WatermarkOverlay } from '@/components/shared/WatermarkOverlay';
import { type LessonMeta, type Heading, type Difficulty } from '@/types';

const difficultyColors: Record<Difficulty, string> = {
  beginner: 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20',
  intermediate: 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/20',
  advanced: 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20',
};

interface LessonClientProps {
  meta: LessonMeta;
  content: string;
  headings: Heading[];
  prev: LessonMeta | null;
  next: LessonMeta | null;
}

function getEmbedUrl(url?: string): string | null {
  if (!url) return null;
  if (url.startsWith('/')) return url;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return url;
}


export function LessonClient({ meta, content, headings, prev, next }: LessonClientProps) {
  const readingProgress = useReadingProgress();
  const { isCompleted, isBookmarked, toggleComplete, toggleBookmark } = useProgress();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tocExpanded, setTocExpanded] = useState(false);
  
  // Interactive split states
  const [studyMode, setStudyMode] = useState<'notes' | 'interactive'>('notes');
  const [descWidthPct, setDescWidthPct] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  const togglePiP = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.error('Failed to trigger PiP', err);
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const completed = isCompleted(meta.slug);
  const bookmarked = isBookmarked(meta.slug);
  const embedUrl = getEmbedUrl(meta.videoUrl);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMouseMove = (ev: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = ev.clientX - rect.left;
      const pct = Math.min(Math.max((offsetX / rect.width) * 100, 20), 80);
      setDescWidthPct(pct);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, []);

  return (
    <div className={`flex flex-col overflow-hidden ${studyMode === 'interactive' ? 'h-screen' : 'min-h-screen'}`}>
      {/* Reading Progress Bar */}
      <div
        className="reading-progress"
        style={{ width: `${readingProgress}%` }}
      />

      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} course={meta.course} />

        {studyMode === 'notes' ? (
          /* Main content area - Notes Only Mode */
          <main className="flex-1 min-w-0 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Mobile sidebar toggle + Breadcrumb + Mode Toggle */}
              <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden w-9 h-9 rounded-[10px] border border-[var(--border-color)] bg-[var(--surface)] flex items-center justify-center cursor-pointer"
                    aria-label="Open sidebar"
                  >
                    <Menu className="w-4 h-4 text-[var(--text-muted)]" />
                  </button>

                  {/* Breadcrumb */}
                  <nav className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-[var(--accent)] transition-colors">
                      Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/dashboard" className="hover:text-[var(--accent)] transition-colors">
                      Dashboard
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[var(--accent)]">{meta.chapterTitle}</span>
                  </nav>
                </div>

                {/* Mode Selector */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-color)]">
                  <button
                    onClick={() => setStudyMode('notes')}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer bg-[var(--accent)] text-white shadow-sm"
                  >
                    Notes Only
                  </button>
                  <button
                    onClick={() => setStudyMode('interactive')}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5" /> Interactive Split
                  </button>
                </div>
              </div>

              {/* Lesson Header */}
              <header className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[var(--accent)] bg-[var(--accent)]/10 px-2.5 py-1 rounded-lg">
                    CH {meta.chapter}
                  </span>
                  <span className="text-xs text-[var(--text-disabled)]">·</span>
                  <span className="text-xs text-[var(--text-muted)]">
                    Lesson {meta.lesson}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3 text-[var(--text-primary)]">
                  {meta.title}
                </h1>

                <p className="text-base text-[var(--text-muted)] mb-4">
                  {meta.description}
                </p>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${difficultyColors[meta.difficulty]}`}>
                    {meta.difficulty}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <Clock className="w-3.5 h-3.5" />
                    {meta.estimatedMinutes} min read
                  </span>
                  <button
                    onClick={() => toggleBookmark(meta.slug)}
                    className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'text-[var(--accent)] fill-[var(--accent)]' : ''}`} />
                    {bookmarked ? 'Bookmarked' : 'Bookmark'}
                  </button>
                  <button
                    onClick={() => toggleComplete(meta.slug)}
                    className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                      completed ? 'text-[var(--success)]' : 'text-[var(--text-muted)] hover:text-[var(--success)]'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {completed ? 'Completed' : 'Mark complete'}
                  </button>
                </div>
              </header>

              {/* Objectives */}
              {meta.objectives.length > 0 && (
                <div className="mb-8 p-5 rounded-2xl border border-[var(--accent)]/15 bg-[var(--accent)]/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-[var(--accent)]" />
                    <span className="text-sm font-semibold text-[var(--accent)] font-heading">
                      Learning Objectives
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {meta.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        <GraduationCap className="w-3.5 h-3.5 text-[var(--accent)] mt-0.5 shrink-0" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Table of Contents - Top */}
              {headings.length > 0 && (
                <div className="mb-10 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] overflow-hidden">
                  <button 
                    onClick={() => setTocExpanded(!tocExpanded)}
                    className="w-full flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[var(--surface-elevated)] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <List className="w-4 h-4 text-[var(--accent)]" />
                      <span className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                        On this page
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${tocExpanded ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {tocExpanded && (
                    <div className="px-5 pb-5 border-t border-[var(--border-color)] pt-4">
                      <TableOfContents headings={headings} />
                    </div>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="min-w-0">
                <MDXRenderer content={content} />
              </div>

              {/* Completion CTA */}
              <div className="mt-12 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] text-center">
                <p className="text-sm text-[var(--text-muted)] mb-3">
                  Finished this lesson?
                </p>
                <button
                  onClick={() => toggleComplete(meta.slug)}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                    completed
                      ? 'bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20'
                      : 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white shadow-lg shadow-[var(--accent)]/20'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {completed ? 'Completed ✓' : 'Mark as Complete'}
                </button>
              </div>

              {/* Prev/Next Navigation */}
              <nav className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Lesson navigation">
                {prev ? (
                  <Link
                    href={`/lesson/${prev.slug}`}
                    className="group flex items-center gap-3 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] hover:border-[var(--accent)]/20 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                    <div className="min-w-0">
                      <p className="text-xs text-[var(--text-muted)]">Previous</p>
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                        {prev.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {next ? (
                  <Link
                    href={`/lesson/${next.slug}`}
                    className="group flex items-center justify-end gap-3 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] hover:border-[var(--accent)]/20 transition-all text-right"
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-[var(--text-muted)]">Next</p>
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                        {next.title}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                  </Link>
                ) : (
                  <div />
                )}
              </nav>
            </div>
          </main>
        ) : (
          /* Main content area - Resizable Split interactive Mode */
          <main ref={containerRef} className="flex-1 flex min-w-0 overflow-hidden bg-[var(--bg)]">
            {/* Left Column: Sticky/Fixed Video Frame (width controlled by descWidthPct) */}
            <div className="overflow-hidden p-6 bg-[var(--bg-secondary)] flex flex-col gap-4 border-r border-[var(--border-color)]" style={{ width: `${descWidthPct}%` }}>
              {embedUrl ? (
                embedUrl.includes('youtube.com') || embedUrl.includes('youtu.be') ? (
                  <div className="w-full aspect-video rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-lg bg-black shrink-0 relative">
                    <iframe
                      src={`${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=0&controls=1&rel=0`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <WatermarkOverlay />
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 shrink-0">
                    <div className="w-full aspect-video rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-lg bg-black relative">
                      <video
                        ref={videoRef}
                        src={embedUrl}
                        controls
                        controlsList="nodownload"
                        className="w-full h-full object-contain"
                      />
                      <WatermarkOverlay />
                    </div>

                    
                    {/* Custom Controls Panel */}
                    <div className="flex items-center justify-between gap-4 p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface)]">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mr-1">Speed</span>
                        {[0.5, 1.0, 1.25, 1.5, 2.0].map((speed) => (
                          <button
                            key={speed}
                            onClick={() => handleSpeedChange(speed)}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer transition-colors ${
                              playbackSpeed === speed
                                ? 'bg-[var(--accent)] text-white'
                                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]'
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={togglePiP}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border-color)] bg-[var(--surface-elevated)] text-[10px] font-semibold text-[var(--text-primary)] hover:bg-[var(--surface)] transition-all cursor-pointer shadow-sm"
                      >
                        <Tv className="w-3.5 h-3.5 text-[var(--accent)]" /> Picture-in-Picture
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <div className="p-8 text-center border border-dashed border-[var(--border-color)] rounded-2xl bg-[var(--surface)] shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-[#FF5F57]/10 flex items-center justify-center mx-auto mb-3">
                    <Play className="w-5 h-5 text-[#FF5F57]" />
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">No Video Available</h3>
                  <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto mt-1">
                    There is no video URL defined for this lesson. You can add one in the Admin dashboard under "Lessons".
                  </p>
                </div>
              )}
              
              <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--surface)]">
                <h4 className="text-xs font-semibold text-[var(--text-primary)] mb-1">Interactive Learning Tips</h4>
                <ul className="text-[11px] text-[var(--text-muted)] space-y-1.5 list-disc pl-4">
                  <li>Drag the splitter line to change column widths.</li>
                  <li>Watch and code along inside your local IDE or playground.</li>
                  <li>For YouTube videos, use the settings cog inside the player for speed adjustments, and right-click twice on the video to open Picture-in-Picture.</li>
                  <li>Toggle back to "Notes Only" at any time for regular full-width reading.</li>
                </ul>
              </div>
            </div>

            {/* Splitter Resize Handle */}
            <div
              onMouseDown={onMouseDown}
              title="Drag to resize"
              className={`w-1 cursor-col-resize hover:bg-[var(--accent)]/20 active:bg-[var(--accent)] transition-colors flex items-center justify-center relative z-10 border-x border-[var(--border-color)] ${
                isDragging ? 'bg-[var(--accent)]' : 'bg-[var(--bg-secondary)]'
              }`}
            >
              <div className="w-[2px] h-8 rounded-full bg-[var(--border-color)]" />
            </div>

            {/* Right Column: Notes details (flex-1) */}
            <div className="flex-1 overflow-y-auto h-full">
              <div className="p-6 max-w-4xl mx-auto space-y-6">
                
                {/* Mobile sidebar toggle + Breadcrumb + Mode Toggle */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)] flex-wrap">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSidebarOpen(true)}
                      className="lg:hidden w-9 h-9 rounded-[10px] border border-[var(--border-color)] bg-[var(--surface)] flex items-center justify-center cursor-pointer"
                      aria-label="Open sidebar"
                    >
                      <Menu className="w-4 h-4 text-[var(--text-muted)]" />
                    </button>
                    <nav className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                      <span className="text-[var(--text-secondary)] font-medium">CH {meta.chapter}</span>
                      <ChevronRight className="w-3 h-3" />
                      <span className="text-[var(--accent)] font-semibold truncate max-w-[120px]">{meta.title}</span>
                    </nav>
                  </div>

                  {/* Mode Selector */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-color)]">
                    <button
                      onClick={() => setStudyMode('notes')}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    >
                      Notes Only
                    </button>
                    <button
                      onClick={() => setStudyMode('interactive')}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer bg-[var(--accent)] text-white shadow-sm flex items-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5" /> Interactive Split
                    </button>
                  </div>
                </div>

                {/* Lesson Header */}
                <header>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold mb-2 text-[var(--text-primary)]">
                    {meta.title}
                  </h1>
                  <p className="text-sm text-[var(--text-muted)] mb-3 leading-relaxed">
                    {meta.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${difficultyColors[meta.difficulty]}`}>
                      {meta.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                      <Clock className="w-3.5 h-3.5" />
                      {meta.estimatedMinutes} min read
                    </span>
                    <button
                      onClick={() => toggleBookmark(meta.slug)}
                      className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'text-[var(--accent)] fill-[var(--accent)]' : ''}`} />
                      {bookmarked ? 'Bookmarked' : 'Bookmark'}
                    </button>
                    <button
                      onClick={() => toggleComplete(meta.slug)}
                      className={`flex items-center gap-1 text-[10px] transition-colors cursor-pointer ${
                        completed ? 'text-[var(--success)]' : 'text-[var(--text-muted)] hover:text-[var(--success)]'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {completed ? 'Completed' : 'Mark complete'}
                    </button>
                  </div>
                </header>

                {/* Objectives */}
                {meta.objectives.length > 0 && (
                  <div className="p-4 rounded-xl border border-[var(--accent)]/15 bg-[var(--accent)]/5 text-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span className="font-semibold text-[var(--accent)] font-heading">
                        Learning Objectives
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {meta.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[var(--text-secondary)]">
                          <GraduationCap className="w-3 h-3 text-[var(--accent)] mt-0.5 shrink-0" />
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Table of Contents */}
                {headings.length > 0 && (
                  <div className="rounded-xl border border-[var(--border-color)] bg-[var(--surface)] overflow-hidden">
                    <button 
                      onClick={() => setTocExpanded(!tocExpanded)}
                      className="w-full flex items-center justify-between px-4 py-2 text-xs cursor-pointer hover:bg-[var(--surface-elevated)] transition-colors"
                    >
                      <span className="font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                        On this page
                      </span>
                      <ChevronRight className={`w-3 h-3 text-[var(--text-muted)] transition-transform duration-200 ${tocExpanded ? 'rotate-90' : ''}`} />
                    </button>
                    {tocExpanded && (
                      <div className="px-4 pb-3 border-t border-[var(--border-color)] pt-2.5 text-xs">
                        <TableOfContents headings={headings} />
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="min-w-0 text-sm leading-relaxed prose prose-sm max-w-none">
                  <MDXRenderer content={content} />
                </div>

                {/* Completion CTA */}
                <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] text-center text-xs">
                  <p className="text-[var(--text-muted)] mb-2">
                    Finished this lesson?
                  </p>
                  <button
                    onClick={() => toggleComplete(meta.slug)}
                    className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-lg font-medium text-xs transition-all cursor-pointer ${
                      completed
                        ? 'bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20'
                        : 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white shadow-sm'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {completed ? 'Completed' : 'Mark complete'}
                  </button>
                </div>

                {/* Prev/Next Navigation */}
                <nav className="grid grid-cols-2 gap-3" aria-label="Lesson navigation">
                  {prev ? (
                    <Link
                      href={`/lesson/${prev.slug}`}
                      className="group flex items-center gap-2 p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] hover:border-[var(--accent)]/20 transition-all"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-[var(--text-muted)]">Previous</p>
                        <p className="text-xs font-medium text-[var(--text-primary)] truncate">
                          {prev.title}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {next ? (
                    <Link
                      href={`/lesson/${next.slug}`}
                      className="group flex items-center justify-end gap-2 p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] hover:border-[var(--accent)]/20 transition-all text-right"
                    >
                      <div className="min-w-0">
                        <p className="text-[10px] text-[var(--text-muted)]">Next</p>
                        <p className="text-xs font-medium text-[var(--text-primary)] truncate">
                          {next.title}
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                    </Link>
                  ) : (
                    <div />
                  )}
                </nav>

              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
