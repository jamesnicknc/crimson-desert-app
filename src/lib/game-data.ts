// Barrel module for all ARC Raiders game data plus small display helpers.
import type { AmmoType, Rarity, TierRank, WeaponClass, SizeClass, ItemCategory, PoiTier } from '@/types/game-data';

export { WEAPONS, ATTACHMENTS, AMMO_TYPES } from '@/data/weapons';
export { ENEMIES, MAP_EVENTS } from '@/data/enemies';
export { MAPS } from '@/data/maps';
export { QUESTS, EXPEDITION_PROJECTS, EXPEDITION_MECHANICS, TRIALS, ACHIEVEMENTS } from '@/data/quests';
export { ITEMS, RECIPES } from '@/data/items';
export {
  SKILLS,
  SKILL_BRANCHES,
  WORKSHOP_STATIONS,
  WORKSHOP_ORDER,
  TRADERS,
  NPCS,
  GUIDE_SECTIONS,
  PATCHES,
  GAME_OVERVIEW,
} from '@/data/progression';

// ─── Labels ─────────────────────────────────────────────────────────────────

export const WEAPON_CLASS_LABELS: Record<WeaponClass, string> = {
  assault_rifle: 'Assault Rifle',
  battle_rifle: 'Battle Rifle',
  smg: 'SMG',
  shotgun: 'Shotgun',
  sniper: 'Sniper / Marksman',
  lmg: 'Light Machine Gun',
  pistol: 'Pistol',
  launcher: 'Launcher',
  special: 'Special',
};

export const AMMO_LABELS: Record<AmmoType, string> = {
  light: 'Light Ammo',
  medium: 'Medium Ammo',
  heavy: 'Heavy Ammo',
  shotgun: 'Shotgun Shells',
  energy: 'Energy Cells',
  special: 'Special Ammo',
};

export const AMMO_COLORS: Record<AmmoType, string> = {
  light: 'text-signal-300 border-signal-500/40 bg-signal-500/10',
  medium: 'text-amber-300 border-amber-500/40 bg-amber-500/10',
  heavy: 'text-red-300 border-red-500/40 bg-red-500/10',
  shotgun: 'text-orange-300 border-orange-500/40 bg-orange-500/10',
  energy: 'text-purple-300 border-purple-500/40 bg-purple-500/10',
  special: 'text-pink-300 border-pink-500/40 bg-pink-500/10',
};

export const RARITY_ORDER: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

export const RARITY_LABELS: Record<Rarity, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};

export const RARITY_COLORS: Record<Rarity, string> = {
  common: 'text-gray-300 border-gray-500/50 bg-gray-500/10',
  uncommon: 'text-green-300 border-green-500/50 bg-green-500/10',
  rare: 'text-blue-300 border-blue-500/50 bg-blue-500/10',
  epic: 'text-purple-300 border-purple-500/50 bg-purple-500/10',
  legendary: 'text-amber-300 border-amber-500/50 bg-amber-500/10',
};

export const RARITY_DOT: Record<Rarity, string> = {
  common: 'bg-gray-400',
  uncommon: 'bg-green-400',
  rare: 'bg-blue-400',
  epic: 'bg-purple-400',
  legendary: 'bg-amber-400',
};

export const TIER_COLORS: Record<TierRank, string> = {
  S: 'bg-rust-400 text-black',
  A: 'bg-signal-400 text-black',
  B: 'bg-blue-500 text-white',
  C: 'bg-gray-500 text-white',
  D: 'bg-gray-700 text-gray-300',
};

export const SIZE_CLASS_LABELS: Record<SizeClass, string> = {
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
  boss: 'Boss',
  event: 'Event',
};

export const SIZE_CLASS_COLORS: Record<SizeClass, string> = {
  small: 'text-green-300 border-green-500/40 bg-green-500/10',
  medium: 'text-amber-300 border-amber-500/40 bg-amber-500/10',
  large: 'text-orange-300 border-orange-500/40 bg-orange-500/10',
  boss: 'text-red-300 border-red-500/40 bg-red-500/10',
  event: 'text-purple-300 border-purple-500/40 bg-purple-500/10',
};

export const ITEM_CATEGORY_LABELS: Record<ItemCategory, string> = {
  shield: 'Shields',
  augment: 'Augments',
  gadget: 'Gadgets & Throwables',
  consumable: 'Healing & Consumables',
  material: 'Materials & Components',
  key: 'Keys & Keycards',
  ammo: 'Ammunition',
  misc: 'Misc & Trade Goods',
};

export const POI_TIER_CONFIG: Record<PoiTier, { label: string; color: string; badge: string }> = {
  red: { label: 'High-value zone', color: '#ef4444', badge: 'bg-red-500/15 text-red-300 border-red-500/40' },
  yellow: { label: 'Mid-value zone', color: '#facc15', badge: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/40' },
  green: { label: 'Low-value zone', color: '#22c55e', badge: 'bg-green-500/15 text-green-300 border-green-500/40' },
  none: { label: 'Area', color: '#94a3b8', badge: 'bg-gray-500/15 text-gray-300 border-gray-500/40' },
};

export function threatLabel(threat: number): string {
  return ['', 'Minimal', 'Low', 'Moderate', 'High', 'Extreme'][threat] ?? 'Unknown';
}

export function threatColor(threat: number): string {
  return ['', 'text-green-400', 'text-lime-300', 'text-amber-300', 'text-orange-400', 'text-red-400'][threat] ?? 'text-gray-400';
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
