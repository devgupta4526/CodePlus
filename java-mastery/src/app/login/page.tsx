'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Code2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const SUPABASE_CONFIGURED =
  typeof process !== 'undefined' &&
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url';

// Inner component that uses useSearchParams — must be inside Suspense
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const err = searchParams.get('error');
    if (err === 'auth_callback_failed') {
      setError('Authentication failed. Please try again.');
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!SUPABASE_CONFIGURED) {
      setError('Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.');
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (signUpError) throw signUpError;
        setMessage('Check your email for a confirmation link to complete sign up.');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Tabs */}
      <div className="flex border-b border-[var(--border-color)] mb-6">
        {(['signin', 'signup'] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setError(null); setMessage(null); }}
            className={`flex-1 pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
              mode === m
                ? 'border-[var(--accent)] text-[var(--text-primary)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {m === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-[var(--accent)]/60 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            minLength={6}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-[var(--accent)]/60 transition-colors"
          />
        </div>

        {error && (
          <div className="px-3.5 py-2.5 rounded-xl border border-[#FF5F57]/20 bg-[#FF5F57]/10 text-xs text-[#FF5F57]">
            {error}
          </div>
        )}

        {message && (
          <div className="px-3.5 py-2.5 rounded-xl border border-[var(--success)]/20 bg-[var(--success)]/10 text-xs text-[var(--success)]">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white text-sm font-semibold shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading
            ? 'Loading…'
            : mode === 'signin'
            ? 'Sign In'
            : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-[var(--text-disabled)]">
        By continuing you agree to our{' '}
        <span className="text-[var(--text-muted)]">Terms of Service</span>.
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center shadow-lg shadow-[var(--accent)]/20">
          <Code2 className="w-5 h-5 text-white" />
        </div>
        <span className="font-heading text-xl font-bold text-[var(--text-primary)] tracking-tight">
          Code<span className="text-[var(--accent)]">Pulse</span>
        </span>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-8 shadow-xl">
        <Suspense fallback={<div className="h-48 animate-pulse bg-[var(--surface-elevated)] rounded-xl" />}>
          <LoginForm />
        </Suspense>
      </div>

      {/* Back link */}
      <a
        href="/"
        className="mt-6 text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
      >
        ← Back to home
      </a>
    </div>
  );
}
