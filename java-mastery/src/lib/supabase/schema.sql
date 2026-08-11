-- CodePulse Supabase schema
-- Safe to run repeatedly in the Supabase SQL editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text check (char_length(full_name) <= 100),
  avatar_url text,
  xp_points integer not null default 0 check (xp_points >= 0),
  streak_days integer not null default 0 check (streak_days >= 0),
  last_activity_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.courses (
  id text primary key,
  title text not null,
  is_free boolean not null default true,
  price_inr integer not null default 0 check (price_inr >= 0)
);

insert into public.courses (id, title, is_free, price_inr) values
  ('java',       'Java Foundations',                           true,      0),
  ('coa',        'Computer Organization & Architecture',       true,      0),
  ('springboot', 'Spring Boot Mastery',                        false, 49900),
  ('python',     'Python & Django',                             false, 49900),
  ('ibps-so-it', 'IBPS SO IT Officer Professional Knowledge',  true,      0),
  ('quants',     'Quantitative Aptitude',                       true,      0),
  ('reasoning',  'Reasoning',                                   true,      0),
  ('english',    'English Vocabulary',                          true,      0)
on conflict (id) do update set
  title = excluded.title,
  is_free = excluded.is_free,
  price_inr = excluded.price_inr;

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id text not null references public.courses(id),
  enrolled_at timestamptz not null default now(),
  payment_status text not null default 'free' check (payment_status in ('free', 'paid')),
  last_lesson_slug text,
  last_accessed_at timestamptz,
  unique (user_id, course_id)
);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_slug text not null,
  course_id text not null references public.courses(id),
  completed boolean not null default false,
  bookmarked boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_slug)
);

create table if not exists public.practice_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  challenge_id text not null,
  lesson_slug text not null,
  solved_at timestamptz not null default now(),
  xp_awarded integer not null default 10 check (xp_awarded >= 0),
  unique (user_id, challenge_id)
);

create index if not exists enrollments_course_id_idx on public.enrollments (course_id);
create index if not exists lesson_progress_course_id_idx on public.lesson_progress (course_id);

-- New Supabase projects can require explicit Data API grants.
grant usage on schema public to anon, authenticated;
grant select on public.courses to anon, authenticated;
revoke insert, update on public.profiles from authenticated;
grant select on public.profiles to authenticated;
grant insert (id, email, full_name, avatar_url) on public.profiles to authenticated;
grant update (email, full_name, avatar_url) on public.profiles to authenticated;
revoke insert, update on public.enrollments from authenticated;
grant select, delete on public.enrollments to authenticated;
grant insert (user_id, course_id) on public.enrollments to authenticated;
grant update (last_lesson_slug, last_accessed_at) on public.enrollments to authenticated;
grant select, insert, update, delete on public.lesson_progress to authenticated;
revoke insert, update on public.practice_completions from authenticated;
grant select, delete on public.practice_completions to authenticated;
grant insert (user_id, challenge_id, lesson_slug) on public.practice_completions to authenticated;

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.practice_completions enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert to authenticated
  with check ((select auth.uid()) = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "Anyone can read courses" on public.courses;
create policy "Anyone can read courses"
  on public.courses for select to anon, authenticated
  using (true);

drop policy if exists "Users can read own enrollments" on public.enrollments;
create policy "Users can read own enrollments"
  on public.enrollments for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can enroll in free courses" on public.enrollments;
drop policy if exists "Users can insert own enrollments" on public.enrollments;
create policy "Users can enroll in free courses"
  on public.enrollments for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and payment_status = 'free'
    and exists (
      select 1 from public.courses
      where courses.id = course_id and courses.is_free = true
    )
  );

drop policy if exists "Users can update own enrollment activity" on public.enrollments;
drop policy if exists "Users can update own enrollments" on public.enrollments;
create policy "Users can update own enrollment activity"
  on public.enrollments for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own enrollments" on public.enrollments;
create policy "Users can delete own enrollments"
  on public.enrollments for delete to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can read own lesson progress" on public.lesson_progress;
drop policy if exists "Users can manage own progress" on public.lesson_progress;
create policy "Users can read own lesson progress"
  on public.lesson_progress for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own lesson progress" on public.lesson_progress;
create policy "Users can insert own lesson progress"
  on public.lesson_progress for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own lesson progress" on public.lesson_progress;
create policy "Users can update own lesson progress"
  on public.lesson_progress for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own lesson progress" on public.lesson_progress;
create policy "Users can delete own lesson progress"
  on public.lesson_progress for delete to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can read own practice completions" on public.practice_completions;
drop policy if exists "Users can manage own practice completions" on public.practice_completions;
create policy "Users can read own practice completions"
  on public.practice_completions for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own practice completions" on public.practice_completions;
create policy "Users can insert own practice completions"
  on public.practice_completions for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own practice completions" on public.practice_completions;
create policy "Users can delete own practice completions"
  on public.practice_completions for delete to authenticated
  using ((select auth.uid()) = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill profiles for accounts that existed before this schema was installed.
insert into public.profiles (id, email, full_name, avatar_url, created_at)
select
  id,
  email,
  raw_user_meta_data ->> 'full_name',
  raw_user_meta_data ->> 'avatar_url',
  created_at
from auth.users
on conflict (id) do nothing;
