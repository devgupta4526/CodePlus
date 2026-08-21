'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Braces, Menu, X, Search, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { SearchDialog } from '@/components/shared/SearchDialog';
import { getCourseStats } from '@/data/course';

// Lazy Supabase — only imported when env vars are present to keep SSR safe.
const SUPABASE_CONFIGURED =
  typeof process !== 'undefined' &&
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url' &&
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

function useAuthUser() {
  const [user, setUser] = useState<{ email?: string | null; id: string } | null>(null);

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) return;
    // Dynamic import so build doesn't fail when env vars are missing
    import('@/lib/supabase/client').then(({ createClient }) => {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data }) => setUser(data.user));
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
        setUser(session?.user ?? null);
      });
      return () => subscription.unsubscribe();
    });
  }, []);

  return user;
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const courseStats = getCourseStats();
  const user = useAuthUser();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close user menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  async function handleSignOut() {
    if (!SUPABASE_CONFIGURED) return;
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.push('/');
    router.refresh();
  }

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : '';

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/today', label: 'Today' },
    { href: '/dashboard', label: 'Courses' },
    { href: '/projects', label: 'Projects' },
    { href: '/practice', label: 'Practice' },
    { href: '/roadmap', label: 'Roadmaps' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg)]/92 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 border border-[var(--border-color)] bg-[var(--surface)] flex items-center justify-center transition-colors group-hover:border-[var(--accent)]">
                <Braces className="w-4 h-4 text-[var(--accent)]" />
              </div>
              <span className="font-heading text-base font-bold text-[var(--text-primary)] tracking-[-0.025em]">
                CodePulse
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
                      ? 'text-[var(--text-primary)] after:block after:h-px after:bg-[var(--accent)] after:mt-1'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
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

              <span className="hidden lg:inline font-mono text-[10px] uppercase tracking-wider text-[var(--text-disabled)]">{courseStats.totalLessons} lessons</span>

              <ThemeToggle />

              {/* Auth: Sign In button or User avatar menu */}
              {user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center text-white text-xs font-bold cursor-pointer shadow-md hover:shadow-[var(--accent)]/30 transition-shadow"
                    aria-label="User menu"
                  >
                    {initials}
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-10 w-48 rounded-xl border border-[var(--border-color)] bg-[var(--surface-elevated)] shadow-xl z-50 overflow-hidden">
                      <div className="px-3 py-2.5 border-b border-[var(--border-color)]">
                        <p className="text-xs text-[var(--text-muted)] truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#FF5F57] hover:bg-[#FF5F57]/10 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors"
                >
                  Sign In
                </Link>
              )}

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
              {!user && (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-[10px] text-sm font-semibold text-[var(--accent)] hover:bg-[var(--surface)] transition-colors"
                >
                  Sign In
                </Link>
              )}
              {user && (
                <button
                  onClick={() => { setMobileMenuOpen(false); handleSignOut(); }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-[10px] text-sm text-[#FF5F57] hover:bg-[var(--surface)] cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
