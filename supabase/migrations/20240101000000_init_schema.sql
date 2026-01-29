-- Enable UUID extension
create extension if not exists "pgcrypto";

-- 1. PROFILES
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  is_therapist boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Users can view own profile" 
  on profiles for select 
  using (auth.uid() = id);

create policy "Users can update own profile" 
  on profiles for update 
  using (auth.uid() = id);

-- 2. JOURNAL PROMPTS
create table if not exists public.journal_prompts (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  category text,
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table public.journal_prompts enable row level security;

-- Policies for prompts
create policy "Authenticated users can view active prompts" 
  on journal_prompts for select 
  to authenticated 
  using (is_active = true);

-- 3. MOOD LOGS
create table if not exists public.mood_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  mood_score integer check (mood_score >= 1 and mood_score <= 10),
  emotions text[],
  note text,
  created_at timestamptz default now()
);

alter table public.mood_logs enable row level security;

-- Policies for mood logs
create policy "Users can CRUD own mood logs" 
  on mood_logs 
  using (auth.uid() = user_id);

-- 4. JOURNAL ENTRIES
create table if not exists public.journal_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  prompt_id uuid references public.journal_prompts(id),
  title text,
  content text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.journal_entries enable row level security;

-- Policies for journal entries
create policy "Users can CRUD own entries" 
  on journal_entries 
  using (auth.uid() = user_id);

-- 5. THERAPIST CONNECTIONS
create table if not exists public.therapist_connections (
  id uuid default gen_random_uuid() primary key,
  patient_id uuid references public.profiles(id) not null,
  therapist_id uuid references public.profiles(id) not null,
  status text default 'pending' check (status in ('pending', 'active', 'rejected', 'terminated')),
  created_at timestamptz default now()
);

alter table public.therapist_connections enable row level security;

-- Policies for connections
create policy "Users can view their own connections" 
  on therapist_connections for select 
  using (auth.uid() = patient_id or auth.uid() = therapist_id);

create policy "Users can create connection requests" 
  on therapist_connections for insert 
  with check (auth.uid() = patient_id);

-- Function to handle new user signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
