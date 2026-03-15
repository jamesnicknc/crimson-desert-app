-- ╔══════════════════════════════════════════════════════════╗
-- ║  CRIMSON DESERT COMPANION - DATABASE SCHEMA             ║
-- ╠══════════════════════════════════════════════════════════╣
-- ║  Run this in Supabase SQL Editor or via CLI migrations   ║
-- ╚══════════════════════════════════════════════════════════╝

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────
-- PROFILES (extends Supabase auth.users)
-- ─────────────────────────────────────
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text not null default 'Adventurer',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view any profile"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'Adventurer'),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────
-- GROUPS (friend groups)
-- ─────────────────────────────────────
create table public.groups (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  invite_code text unique not null default substr(md5(random()::text), 1, 8),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.group_members (
  group_id uuid references public.groups(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (group_id, user_id)
);

alter table public.groups enable row level security;
alter table public.group_members enable row level security;

create policy "Group members can view their groups"
  on public.groups for select using (
    id in (select group_id from public.group_members where user_id = auth.uid())
  );

create policy "Authenticated users can create groups"
  on public.groups for insert with check (auth.uid() = created_by);

create policy "Members can view group membership"
  on public.group_members for select using (
    group_id in (select group_id from public.group_members where user_id = auth.uid())
  );

create policy "Users can join groups"
  on public.group_members for insert with check (auth.uid() = user_id);

create policy "Users can leave groups"
  on public.group_members for delete using (auth.uid() = user_id);

-- ─────────────────────────────────────
-- PROGRESS TRACKING
-- ─────────────────────────────────────
create table public.user_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  category text not null, -- 'skill', 'collectible', 'boss', 'quest'
  item_key text not null, -- e.g. 'k-s1', 'art-0', 'boss-3'
  value jsonb not null default '{"completed": true}',
  updated_at timestamptz not null default now(),
  unique(user_id, category, item_key)
);

alter table public.user_progress enable row level security;

create policy "Users can view own progress"
  on public.user_progress for select using (auth.uid() = user_id);

create policy "Users can upsert own progress"
  on public.user_progress for insert with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.user_progress for update using (auth.uid() = user_id);

create policy "Users can delete own progress"
  on public.user_progress for delete using (auth.uid() = user_id);

-- Group members can view each other's progress
create policy "Group members can view peer progress"
  on public.user_progress for select using (
    user_id in (
      select gm2.user_id from public.group_members gm1
      join public.group_members gm2 on gm1.group_id = gm2.group_id
      where gm1.user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────
-- BUILD PLANNER (saved loadouts)
-- ─────────────────────────────────────
create table public.builds (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null default 'Untitled Build',
  character text not null, -- 'kliff', 'damiane', 'oongka'
  skills jsonb not null default '[]',
  weapons jsonb not null default '[]',
  gears jsonb not null default '[]',
  notes text,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.builds enable row level security;

create policy "Users can manage own builds"
  on public.builds for all using (auth.uid() = user_id);

create policy "Anyone can view public builds"
  on public.builds for select using (is_public = true);

-- ─────────────────────────────────────
-- MAP PINS (user-placed markers)
-- ─────────────────────────────────────
create table public.map_pins (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  lat float not null,
  lng float not null,
  label text not null,
  category text not null default 'custom', -- 'collectible', 'boss', 'npc', 'poi', 'custom'
  icon text not null default 'pin',
  notes text,
  is_shared boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.map_pins enable row level security;

create policy "Users can manage own pins"
  on public.map_pins for all using (auth.uid() = user_id);

create policy "Group members can view shared pins"
  on public.map_pins for select using (
    is_shared = true and user_id in (
      select gm2.user_id from public.group_members gm1
      join public.group_members gm2 on gm1.group_id = gm2.group_id
      where gm1.user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────
-- SCRAPED CONTENT (from Python scraper)
-- ─────────────────────────────────────
create table public.scraped_content (
  id uuid primary key default uuid_generate_v4(),
  source text not null, -- 'wiki', 'news', 'guide', 'map'
  source_url text,
  title text not null,
  content text,
  metadata jsonb default '{}',
  scraped_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '24 hours')
);

-- No RLS needed, read-only for all authenticated users
alter table public.scraped_content enable row level security;

create policy "Authenticated users can read scraped content"
  on public.scraped_content for select using (auth.role() = 'authenticated');

-- ─────────────────────────────────────
-- NOTES (personal)
-- ─────────────────────────────────────
create table public.user_notes (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  content text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.user_notes enable row level security;

create policy "Users can manage own notes"
  on public.user_notes for all using (auth.uid() = user_id);

-- ─────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────
create index idx_progress_user on public.user_progress(user_id);
create index idx_progress_category on public.user_progress(category);
create index idx_pins_user on public.map_pins(user_id);
create index idx_builds_user on public.builds(user_id);
create index idx_scraped_source on public.scraped_content(source);
create index idx_scraped_expires on public.scraped_content(expires_at);
create index idx_group_members_user on public.group_members(user_id);

-- ─────────────────────────────────────
-- HELPER FUNCTIONS
-- ─────────────────────────────────────

-- Upsert progress in one call
create or replace function public.upsert_progress(
  p_category text,
  p_item_key text,
  p_value jsonb default '{"completed": true}'
)
returns void as $$
begin
  insert into public.user_progress (user_id, category, item_key, value, updated_at)
  values (auth.uid(), p_category, p_item_key, p_value, now())
  on conflict (user_id, category, item_key)
  do update set value = p_value, updated_at = now();
end;
$$ language plpgsql security definer;

-- Join group by invite code
create or replace function public.join_group_by_code(p_code text)
returns uuid as $$
declare
  v_group_id uuid;
begin
  select id into v_group_id from public.groups where invite_code = p_code;
  if v_group_id is null then
    raise exception 'Invalid invite code';
  end if;
  insert into public.group_members (group_id, user_id)
  values (v_group_id, auth.uid())
  on conflict do nothing;
  return v_group_id;
end;
$$ language plpgsql security definer;

-- Get group progress summary
create or replace function public.get_group_progress(p_group_id uuid)
returns table (
  user_id uuid,
  display_name text,
  avatar_url text,
  total_completed bigint,
  skills_completed bigint,
  bosses_defeated bigint,
  collectibles_found bigint,
  quests_completed bigint
) as $$
begin
  return query
  select
    p.id as user_id,
    p.display_name,
    p.avatar_url,
    count(up.id) as total_completed,
    count(up.id) filter (where up.category = 'skill') as skills_completed,
    count(up.id) filter (where up.category = 'boss') as bosses_defeated,
    count(up.id) filter (where up.category = 'collectible') as collectibles_found,
    count(up.id) filter (where up.category = 'quest') as quests_completed
  from public.group_members gm
  join public.profiles p on p.id = gm.user_id
  left join public.user_progress up on up.user_id = p.id
  where gm.group_id = p_group_id
  group by p.id, p.display_name, p.avatar_url;
end;
$$ language plpgsql security definer;
