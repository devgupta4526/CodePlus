-- ============================================================================
-- CodePulse — Supabase Schema
-- Run this in the Supabase SQL editor to set up the database.
-- ============================================================================

-- User profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Course catalog (mirrors the course IDs: java, springboot, coa, python, ibps-so-it)
create table public.courses (
  id text primary key,           -- 'java', 'springboot', 'coa', 'python', 'ibps-so-it'
  title text not null,
  is_free boolean default true,  -- false = premium
  price_inr integer default 0    -- price in INR paise (0 = free)
);

-- Seed course catalog
insert into public.courses (id, title, is_free, price_inr) values
  ('java',       'Java Foundations',                         true,  0),
  ('coa',        'Computer Organization & Architecture',     true,  0),
  ('springboot', 'Spring Boot',                              false, 49900),
  ('python',     'Python & Django',                          false, 49900),
  ('ibps-so-it', 'IBPS SO IT Officer Professional Knowledge',true,  0);

-- Enrollments
create table public.enrollments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  course_id text references public.courses(id),
  enrolled_at timestamptz default now(),
  payment_status text default 'free',  -- 'free' | 'paid'
  unique(user_id, course_id)
);

-- Lesson progress (replaces localStorage)
create table public.lesson_progress (
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

-- RLS policies
alter table public.profiles enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;

create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can read own enrollments" on public.enrollments for select using (auth.uid() = user_id);
create policy "Users can insert own enrollments" on public.enrollments for insert with check (auth.uid() = user_id);

create policy "Users can manage own progress" on public.lesson_progress for all using (auth.uid() = user_id);

-- Allow public read of course catalog
alter table public.courses enable row level security;
create policy "Anyone can read courses" on public.courses for select using (true);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
