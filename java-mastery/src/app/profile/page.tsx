import { redirect } from 'next/navigation';
import { BookOpen, Flame, Trophy, UserRound } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { createClient } from '@/lib/supabase/server';
import { ProfileForm } from './ProfileForm';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) redirect('/login?next=/profile');

  const [profileResult, enrollmentsResult, progressResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('email, full_name, avatar_url, xp_points, streak_days, created_at')
      .eq('id', user.id)
      .maybeSingle(),
    supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id),
    supabase
      .from('lesson_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('completed', true),
  ]);

  const profile = profileResult.data;
  const loadError = profileResult.error?.message
    ?? enrollmentsResult.error?.message
    ?? progressResult.error?.message
    ?? null;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)]/10">
            <UserRound className="h-5 w-5 text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)]">Your profile</h1>
            <p className="text-sm text-[var(--text-muted)]">Manage your account and learning details.</p>
          </div>
        </div>

        {loadError && (
          <div role="alert" className="mb-5 rounded-xl border border-[#EF4444]/25 bg-[#EF4444]/10 px-4 py-3 text-sm text-[#EF4444]">
            Profile data could not be loaded: {loadError}
          </div>
        )}

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {[
            { label: 'Enrolled courses', value: enrollmentsResult.count ?? 0, icon: BookOpen },
            { label: 'Lessons completed', value: progressResult.count ?? 0, icon: Trophy },
            { label: 'Current streak', value: `${profile?.streak_days ?? 0} days`, icon: Flame },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-4">
              <Icon className="mb-3 h-5 w-5 text-[var(--accent)]" />
              <p className="text-xl font-bold text-[var(--text-primary)]">{value}</p>
              <p className="text-xs text-[var(--text-muted)]">{label}</p>
            </div>
          ))}
        </div>

        <ProfileForm
          userId={user.id}
          initialEmail={profile?.email ?? user.email ?? ''}
          initialFullName={profile?.full_name ?? user.user_metadata.full_name ?? ''}
          initialAvatarUrl={profile?.avatar_url ?? user.user_metadata.avatar_url ?? ''}
          xpPoints={profile?.xp_points ?? 0}
          createdAt={profile?.created_at ?? user.created_at}
        />
      </main>
    </div>
  );
}
