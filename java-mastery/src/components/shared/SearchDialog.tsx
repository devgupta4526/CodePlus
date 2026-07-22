'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, BookOpen, X } from 'lucide-react';
import { ALL_LESSONS } from '@/data/course';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const results = query.trim()
    ? ALL_LESSONS.filter((lesson) => {
        const q = query.toLowerCase();
        return (
          lesson.title.toLowerCase().includes(q) ||
          lesson.description.toLowerCase().includes(q) ||
          lesson.tags.some((tag) => tag.includes(q)) ||
          lesson.chapterTitle.toLowerCase().includes(q)
        );
      })
    : [];

  // Keyboard shortcut to open
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  // Keyboard navigation in results
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        router.push(`/lesson/${results[selectedIndex].slug}`);
        onOpenChange(false);
        setQuery('');
      }
    },
    [results, selectedIndex, router, onOpenChange]
  );

  // Reset on open/close
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="relative max-w-xl mx-auto mt-[15vh] animate-fade-in">
        <div className="mx-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl shadow-black/40 overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-color)]">
            <Search className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search lessons, topics, tags..."
              className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-disabled)] text-sm outline-none"
              autoFocus
            />
            <button
              onClick={() => onOpenChange(false)}
              className="w-6 h-6 rounded-md bg-[var(--surface-elevated)] flex items-center justify-center text-[var(--text-disabled)] hover:text-[var(--text-muted)] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto py-2">
            {query.trim() === '' ? (
              <div className="px-4 py-8 text-center text-sm text-[var(--text-disabled)]">
                Type to search across all lessons...
              </div>
            ) : results.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-[var(--text-disabled)]">
                No lessons found for &quot;{query}&quot;
              </div>
            ) : (
              results.map((lesson, index) => (
                <button
                  key={lesson.slug}
                  onClick={() => {
                    router.push(`/lesson/${lesson.slug}`);
                    onOpenChange(false);
                    setQuery('');
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer ${
                    index === selectedIndex
                      ? 'bg-[var(--surface-elevated)]'
                      : 'hover:bg-[var(--surface)]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-[10px] bg-[var(--surface)] border border-[var(--border-color)] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                      {lesson.title}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] truncate">
                      {lesson.chapterTitle} · {lesson.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--text-disabled)] shrink-0" />
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-[var(--border-color)] flex items-center gap-4 text-[10px] text-[var(--text-disabled)]">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border-color)] font-mono">↑↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border-color)] font-mono">↵</kbd>
              open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border-color)] font-mono">esc</kbd>
              close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
