-- ============================================================================
-- CodePulse — Supabase Schema (Production)
-- Run this in the Supabase SQL editor to set up the database.
-- ============================================================================

-- User profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  xp_points integer default 0,
  streak_days integer default 0,
  last_activity_at timestamptz,
  created_at timestamptz default now()
);

-- Course catalog
create table if not exists public.courses (
  id text primary key,
  title text not null,
  is_free boolean default true,
  price_inr integer default 0
);

-- Seed course catalog
insert into public.courses (id, title, is_free, price_inr) values
  ('java',       'Java Foundations',                          true,  0),
  ('coa',        'Computer Organization & Architecture',      true,  0),
  ('springboot', 'Spring Boot Mastery',                       false, 49900),
  ('python',     'Python & Django',                           false, 49900),
  ('ibps-so-it', 'IBPS SO IT Officer Professional Knowledge', true,  0),
  ('quants',     'Quantitative Aptitude',                     true,  0),
  ('reasoning',  'Reasoning',                                 true,  0),
  ('english',    'English Vocabulary',                        true,  0)
on conflict (id) do nothing;

-- Enrollments
create table if not exists public.enrollments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  course_id text references public.courses(id),
  enrolled_at timestamptz default now(),
  payment_status text default 'free',   -- 'free' | 'paid'
  last_lesson_slug text,
  last_accessed_at timestamptz,
  unique(user_id, course_id)
);

-- Lesson progress (replaces localStorage for signed-in users)
create table if not exists public.lesson_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  lesson_slug text not null,
  course_id text not null,
  completed boolean default false,
  bookmarked boolean default false,
  completed_at timestamptz,
  updated_at timestamptz default now(),
  unique(user_id, lesson_slug)
);

-- Practice challenge completions
create table if not exists public.practice_completions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  challenge_id text not null,          -- e.g. 'oop-1', 'cons-1'
  lesson_slug text not null,
  solved_at timestamptz default now(),
  xp_awarded integer default 10,
  unique(user_id, challenge_id)
);

-- ── Row Level Security ────────────────────────────────────────────────────────

alter table public.profiles enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.practice_completions enable row level security;
alter table public.courses enable row level security;

-- Profiles
create policy "Users can read own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Enrollments
create policy "Users can read own enrollments"
  on public.enrollments for select using (auth.uid() = user_id);
create policy "Users can insert own enrollments"
  on public.enrollments for insert with check (auth.uid() = user_id);
create policy "Users can update own enrollments"
  on public.enrollments for update using (auth.uid() = user_id);

-- Lesson progress
create policy "Users can manage own progress"
  on public.lesson_progress for all using (auth.uid() = user_id);

-- Practice completions
create policy "Users can manage own practice completions"
  on public.practice_completions for all using (auth.uid() = user_id);

-- Courses (public read)
create policy "Anyone can read courses"
  on public.courses for select using (true);

-- ── Auto-create profile on signup ─────────────────────────────────────────────

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── XP update function ────────────────────────────────────────────────────────

create or replace function public.add_xp(p_user_id uuid, p_xp integer)
returns void as $$
begin
  update public.profiles
  set xp_points = xp_points + p_xp,
      last_activity_at = now()
  where id = p_user_id;
end;
$$ language plpgsql security definer;
