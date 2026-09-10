import { WEAPONS, ITEMS, SKILLS, AMMO_LABELS } from '@/lib/game-data';
import type { Item, Weapon } from '@/types/game-data';

export const LOADOUT_ROLES = [
  { id: 'assault', label: 'Assault', description: 'Front-line PvP and heavy ARC fights.', color: 'text-red-300 border-red-500/40 bg-red-500/10' },
  { id: 'scout', label: 'Scout', description: 'Fast, quiet looter. Light shield, light ammo.', color: 'text-signal-300 border-signal-500/40 bg-signal-500/10' },
  { id: 'support', label: 'Support', description: 'Heals, shield rechargers and utility for the squad.', color: 'text-green-300 border-green-500/40 bg-green-500/10' },
  { id: 'marksman', label: 'Marksman', description: 'Long sightlines, heavy or energy ammo.', color: 'text-purple-300 border-purple-500/40 bg-purple-500/10' },
  { id: 'anti-arc', label: 'Anti-ARC', description: 'Launchers and penetration for Bastions, Queens and Matriarchs.', color: 'text-amber-300 border-amber-500/40 bg-amber-500/10' },
  { id: 'budget', label: 'Budget', description: 'Cheap kit you will not cry about losing.', color: 'text-gray-300 border-gray-600/50 bg-gray-600/10' },
] as const;

export type LoadoutRole = (typeof LOADOUT_ROLES)[number]['id'];

export function roleLabel(id: string): string {
  return LOADOUT_ROLES.find((r) => r.id === id)?.label ?? id;
}
export function roleColor(id: string): string {
  return LOADOUT_ROLES.find((r) => r.id === id)?.color ?? 'text-gray-300 border-gray-600/50 bg-gray-600/10';
}

export interface LoadoutRow {
  id: string;
  name: string;
  character: string;
  skills: string[];
  weapons: string[];
  gears: string[];
  notes?: string | null;
  is_public: boolean;
  created_at: string;
  user_id: string;
  rating_avg?: number | null;
  rating_count?: number | null;
}

export interface ResolvedLoadout {
  weapons: Weapon[];
  shield?: Item;
  augment?: Item;
  quickUse: Item[];
  skills: { id: string; name: string; branch: string }[];
  weight: number;
  value: number;
  ammo: string[];
}

export function resolveLoadout(row: Pick<LoadoutRow, 'weapons' | 'gears' | 'skills'>): ResolvedLoadout {
  const weapons = (row.weapons ?? []).map((id) => WEAPONS.find((w) => w.id === id)).filter((w): w is Weapon => !!w);
  const gears = (row.gears ?? []).map((id) => ITEMS.find((i) => i.id === id)).filter((i): i is Item => !!i);
  const shield = gears.find((g) => g.category === 'shield');
  const augment = gears.find((g) => g.category === 'augment');
  const quickUse = gears.filter((g) => g.category !== 'shield' && g.category !== 'augment');
  const skills = (row.skills ?? []).map((id) => SKILLS.find((s) => s.id === id)).filter((s): s is NonNullable<typeof s> => !!s).map((s) => ({ id: s.id, name: s.name, branch: s.branch }));
  const weight = weapons.reduce((s, w) => s + (w.weight ?? 0), 0) + gears.reduce((s, g) => s + (g.weight ?? 0), 0);
  const value = weapons.reduce((s, w) => s + (w.traderPrice?.coins ?? w.tiers[0]?.sellValue ?? 0), 0) + gears.reduce((s, g) => s + (g.soldBy[0]?.price ?? g.value), 0);
  const ammo = [...new Set(weapons.map((w) => AMMO_LABELS[w.ammo]))];
  return { weapons, shield, augment, quickUse, skills, weight, value, ammo };
}
