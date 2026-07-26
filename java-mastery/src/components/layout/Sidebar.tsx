'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, X, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useState } from 'react';
import { getChaptersWithLessons } from '@/data/course';
import { useProgress } from '@/hooks/useProgress';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  course?: string;
}

export function Sidebar({ open, onClose, course = 'java' }: SidebarProps) {
  const pathname = usePathname();
  const chapters = getChaptersWithLessons(course);
  const { isCompleted } = useProgress();
  
  // Desktop minimizable state
  const [isMinimized, setIsMinimized] = useState(false);

  // Track which chapters are expanded
  const [expanded, setExpanded] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    chapters.forEach((ch) => {
      initial[ch.number] = true;
    });
    return initial;
  });

  const toggleChapter = (num: number) => {
    setExpanded((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const sidebarContent = (
    <div className="h-full flex flex-col w-72">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center justify-between shrink-0">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          Course Content
        </span>
        <div className="flex items-center gap-1">
          {/* Mobile close */}
          <button
            onClick={onClose}
            className="lg:hidden w-7 h-7 rounded-md hover:bg-[var(--surface-elevated)] flex items-center justify-center cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4 text-[var(--text-muted)]" />
          </button>
          {/* Desktop minimize */}
          <button
            onClick={() => setIsMinimized(true)}
            className="hidden lg:flex w-7 h-7 rounded-md hover:bg-[var(--surface-elevated)] items-center justify-center cursor-pointer"
            title="Minimize sidebar"
          >
            <PanelLeftClose className="w-4 h-4 text-[var(--text-muted)]" />
          </button>
        </div>
      </div>

      {/* Chapters */}
      <div className="flex-1 overflow-y-auto py-2">
        {chapters.map((chapter) => (
          <div key={chapter.number} className="mb-1">
            {/* Chapter header */}
            <button
              onClick={() => toggleChapter(chapter.number)}
              className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-[var(--sidebar-hover)] transition-colors cursor-pointer"
            >
              {expanded[chapter.number] ? (
                <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
              )}
              <span className="text-xs font-bold text-[var(--accent)] tracking-wide shrink-0">
                CH {chapter.number}
              </span>
              <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                {chapter.title}
              </span>
            </button>

            {/* Lessons */}
            {expanded[chapter.number] && (
              <div className="ml-4 pl-3 border-l border-[var(--border-color)]">
                {chapter.lessons.map((lesson) => {
                  const isActive = pathname === `/lesson/${lesson.slug}`;
                  const completed = isCompleted(lesson.slug);

                  return (
                    <Link
                      key={lesson.slug}
                      href={`/lesson/${lesson.slug}`}
                      onClick={onClose}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                        isActive
                          ? 'bg-[var(--sidebar-active)] text-[var(--text-primary)] font-medium'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--sidebar-hover)]'
                      }`}
                    >
                      {completed ? (
                        <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-[var(--text-disabled)] shrink-0" />
                      )}
                      <span className="truncate">{lesson.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside 
        className={`hidden lg:block shrink-0 border-r border-[var(--border-color)] bg-[var(--sidebar-bg)] h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 overflow-hidden ${isMinimized ? 'w-12' : 'w-72'}`}
      >
        <div className="w-72 h-full relative">
          {sidebarContent}
          
          {/* Minimized view overlay */}
          {isMinimized && (
            <div className="absolute inset-0 w-12 bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] flex flex-col items-center pt-3 z-10">
              <button
                onClick={() => setIsMinimized(false)}
                className="w-8 h-8 rounded-md hover:bg-[var(--surface-elevated)] flex items-center justify-center cursor-pointer"
                title="Expand sidebar"
              >
                <PanelLeftOpen className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] shadow-2xl animate-slide-in overflow-hidden">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
