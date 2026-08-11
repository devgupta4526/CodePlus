'use client';

import { useState } from 'react';
import { CalendarDays, Mail, Save, Sparkles, UserRound } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ProfileFormProps {
  userId: string;
  initialEmail: string;
  initialFullName: string;
  initialAvatarUrl: string;
  xpPoints: number;
  createdAt: string;
}

export function ProfileForm({
  userId,
  initialEmail,
  initialFullName,
  initialAvatarUrl,
  xpPoints,
  createdAt,
}: ProfileFormProps) {
  const [fullName, setFullName] = useState(initialFullName);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const supabase = createClient();
      const { error: profileError } = await supabase.from('profiles').upsert(
        {
          id: userId,
          email: initialEmail,
          full_name: fullName.trim() || null,
          avatar_url: avatarUrl.trim() || null,
        },
        { onConflict: 'id' },
      );
      if (profileError) throw profileError;

      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: fullName.trim() || null,
          avatar_url: avatarUrl.trim() || null,
        },
      });
      if (authError) throw authError;

      setMessage({ type: 'success', text: 'Profile saved.' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Could not save your profile.',
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-5 sm:p-6">
        <h2 className="mb-5 font-heading text-lg font-bold text-[var(--text-primary)]">Account details</h2>

        <div className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Full name</span>
            <div className="relative">
              <UserRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-disabled)]" />
              <input value={fullName} onChange={(event) => setFullName(event.target.value)} maxLength={100} className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent)]/60" />
            </div>
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Email</span>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-disabled)]" />
              <input value={initialEmail} disabled className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--surface-elevated)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-muted)]" />
            </div>
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Avatar URL</span>
            <input type="url" value={avatarUrl} onChange={(event) => setAvatarUrl(event.target.value)} placeholder="https://example.com/avatar.jpg" className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-disabled)] focus:border-[var(--accent)]/60" />
          </label>
        </div>

        {message && (
          <div role="status" className={`mt-4 rounded-xl border px-3.5 py-2.5 text-sm ${message.type === 'success' ? 'border-[var(--success)]/25 bg-[var(--success)]/10 text-[var(--success)]' : 'border-[#EF4444]/25 bg-[#EF4444]/10 text-[#EF4444]'}`}>
            {message.text}
          </div>
        )}

        <button type="submit" disabled={saving} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
          <Save className="h-4 w-4" />
          {saving ? 'Saving…' : 'Save profile'}
        </button>
      </form>

      <aside className="space-y-3">
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-5">
          <Sparkles className="mb-3 h-5 w-5 text-[var(--accent)]" />
          <p className="text-2xl font-bold text-[var(--text-primary)]">{xpPoints}</p>
          <p className="text-xs text-[var(--text-muted)]">XP points earned</p>
        </div>
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-5">
          <CalendarDays className="mb-3 h-5 w-5 text-[var(--accent-secondary)]" />
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            {new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(new Date(createdAt))}
          </p>
          <p className="text-xs text-[var(--text-muted)]">Member since</p>
        </div>
      </aside>
    </div>
  );
}
