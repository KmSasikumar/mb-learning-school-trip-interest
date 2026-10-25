-- School Trip Interest — Supabase schema.
-- Run this in the Supabase SQL editor, once, for a new project.
-- Then, in Authentication > Users, create one admin user with an email
-- and password. That user signs in at /admin (Supabase email login).

create table if not exists public.trip_interests (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  school text not null,
  email text not null,
  phone text not null,
  trip text not null check (trip in ('singapore-stem', 'jaipur-heritage', 'london-universities')),
  students integer not null check (students > 0)
);

alter table public.trip_interests enable row level security;

-- Anyone may submit interest (public form). No other public access.
drop policy if exists "Public may insert trip interests" on public.trip_interests;
create policy "Public may insert trip interests"
  on public.trip_interests for insert
  to anon, authenticated
  with check (true);

-- Only signed-in users (the admin) may read submissions.
drop policy if exists "Signed-in users may read trip interests" on public.trip_interests;
create policy "Signed-in users may read trip interests"
  on public.trip_interests for select
  to authenticated
  using (true);
