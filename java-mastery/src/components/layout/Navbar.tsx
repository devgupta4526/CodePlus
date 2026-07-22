'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, BookOpen, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { SearchDialog } from '@/components/shared/SearchDialog';
import { getCourseStats } from '@/data/course';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const courseStats = getCourseStats();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/roadmap', label: 'Roadmap' },
    { href: '/practice', label: 'Practice' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg)]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center shadow-lg shadow-[var(--accent)]/20 group-hover:shadow-[var(--accent)]/40 transition-shadow duration-300">
                <Code2 className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-heading text-lg font-bold text-[var(--text-primary)] tracking-tight">
                Code<span className="text-[var(--accent)]">Pulse</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-[10px] text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'bg-[var(--surface-elevated)] text-[var(--text-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Search button */}
              <button
                suppressHydrationWarning
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-[10px] border border-[var(--border-color)] bg-[var(--surface-elevated)] text-sm text-[var(--text-muted)] hover:border-[var(--border-secondary)] hover:text-[var(--text-primary)] transition-all"
                aria-label="Search lessons"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="text-xs">Search...</span>
                <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border-color)] text-[10px] text-[var(--text-disabled)] font-mono">
                  ⌘K
                </kbd>
              </button>

              {/* Lesson count badge */}
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-color)] text-xs text-[var(--text-muted)]">
                <BookOpen className="w-3 h-3" />
                <span>{courseStats.totalLessons} lessons</span>
              </div>

              <ThemeToggle />

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-9 h-9 rounded-[10px] border border-[var(--border-color)] bg-[var(--surface)] flex items-center justify-center cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4 text-[var(--text-secondary)]" />
                ) : (
                  <Menu className="w-4 h-4 text-[var(--text-secondary)]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg)] animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-[10px] text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-[var(--surface-elevated)] text-[var(--text-primary)]'
                      : 'text-[var(--text-muted)] hover:bg-[var(--surface)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-[10px] text-sm text-[var(--text-muted)] hover:bg-[var(--surface)] cursor-pointer"
              >
                <Search className="w-4 h-4" />
                Search lessons
              </button>
            </div>
          </div>
        )}
      </nav>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
