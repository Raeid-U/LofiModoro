-- Table
create table if not exists public.sprints ( id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, category text not null check (category in ('work','small_break','long_break')), start_time_utc bigint not null, end_time_utc bigint not null check (end_time_utc >= start_time_utc), created_at timestamptz not null default now() );
-- Row Level Security
alter table public.sprints enable row level security;
-- Policies: a user can see/insert only their own rows
create policy "s_user_select_own_sprints" on public.sprints for select using (auth.uid() = user_id);
create policy "s_user_insert_own_sprints" on public.sprints for insert with check (auth.uid() = user_id);
