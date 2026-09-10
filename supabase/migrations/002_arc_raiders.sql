-- ╔══════════════════════════════════════════════════════════╗
-- ║  ARC RAIDERS COMPANION - MIGRATION 002                   ║
-- ╠══════════════════════════════════════════════════════════╣
-- ║  Converts the schema from the previous game to           ║
-- ║  ARC Raiders. Additive except for the system map pins.   ║
-- ╚══════════════════════════════════════════════════════════╝

-- Map pins now belong to a specific raid map.
alter table public.map_pins
  add column if not exists map_slug text not null default 'dam-battlegrounds';

create index if not exists idx_pins_map on public.map_pins(map_slug);

-- Old system pins were world markers for the previous game; remove them.
delete from public.map_pins where is_system = true;

-- Pins players placed on the previous game's map are kept but parked on a
-- slug no raid map uses, so they never render on an ARC Raiders map.
update public.map_pins set map_slug = 'legacy' where created_at < '2026-09-10';

-- Default display name for new profiles.
alter table public.profiles alter column display_name set default 'Raider';

-- Progress categories for ARC Raiders are prefixed "ar-" so old rows never
-- collide. Update the squad summary function to count only those.
create or replace function public.get_group_progress(p_group_id uuid)
returns table (
  user_id uuid,
  display_name text,
  avatar_url text,
  total_completed bigint,
  quests_completed bigint,
  arc_destroyed bigint,
  workshop_levels bigint,
  weapons_unlocked bigint
) as $$
begin
  return query
  select
    p.id as user_id,
    p.display_name,
    p.avatar_url,
    count(up.id) filter (where up.category like 'ar-%') as total_completed,
    count(up.id) filter (where up.category = 'ar-quest' and up.value->>'status' = 'complete') as quests_completed,
    count(up.id) filter (where up.category = 'ar-arc') as arc_destroyed,
    count(up.id) filter (where up.category = 'ar-workshop') as workshop_levels,
    count(up.id) filter (where up.category = 'ar-weapon') as weapons_unlocked
  from public.group_members gm
  join public.profiles p on p.id = gm.user_id
  left join public.user_progress up on up.user_id = p.id
  where gm.group_id = p_group_id
  group by p.id, p.display_name, p.avatar_url;
end;
$$ language plpgsql security definer;

-- Scraped content is no longer used by the app.
drop table if exists public.scraped_content;
