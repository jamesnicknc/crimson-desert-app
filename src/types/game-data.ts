// ═══════════════════════════════════════
// ARC RAIDERS - TYPE DEFINITIONS
// ═══════════════════════════════════════

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type AmmoType = 'light' | 'medium' | 'heavy' | 'shotgun' | 'energy' | 'special';
export type WeaponClass =
  | 'assault_rifle'
  | 'battle_rifle'
  | 'smg'
  | 'shotgun'
  | 'sniper'
  | 'lmg'
  | 'pistol'
  | 'launcher'
  | 'special';
export type TierRank = 'S' | 'A' | 'B' | 'C' | 'D';
export type SizeClass = 'small' | 'medium' | 'large' | 'boss' | 'event';
export type ItemCategory =
  | 'shield'
  | 'augment'
  | 'gadget'
  | 'consumable'
  | 'material'
  | 'key'
  | 'ammo'
  | 'misc';
export type QuestStatus = 'not-started' | 'active' | 'complete';
export type PinCategory = 'loot' | 'arc' | 'extraction' | 'poi' | 'custom';
export type SkillRating = 'must-have' | 'good' | 'situational' | 'skip';

export interface Ingredient {
  item: string;
  itemId?: string;
  qty: number;
}

export interface WeaponStats {
  damage?: number;
  headshot?: string;
  fireRate?: number;
  fireRateStat?: number;
  magazine?: number;
  range?: number;
  stability?: number;
  agility?: number;
  stealth?: number;
  reload?: number;
}

export interface WeaponTier {
  tier: number;
  name: string;
  sellValue?: number;
  magazine?: number;
  bonuses: string[];
  upgradeCost?: Ingredient[];
}

export interface Weapon {
  id: string;
  name: string;
  weaponClass: WeaponClass;
  ammo: AmmoType;
  rarity: Rarity;
  description: string;
  firingMode?: string;
  penetration?: string;
  specialTrait?: string;
  weight?: number;
  stats: WeaponStats;
  source: string;
  blueprintLocked: boolean;
  benchLevel?: number;
  traderPrice?: { trader: string; coins: number; level?: number };
  questRewards: string[];
  recipe?: Ingredient[];
  tiers: WeaponTier[];
  modSlots: Record<string, string[]>;
  tier?: TierRank;
  tierNote?: string;
  tips?: string;
  addedIn: string;
  verified: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  slot: string;
  effect: string;
  rarity?: Rarity;
  compatible: string[];
  recipe?: Ingredient[];
  source: string;
  verified: boolean;
}

export interface AmmoInfo {
  id: AmmoType;
  name: string;
  rarity?: Rarity;
  description: string;
  compatible: string[];
  recipe?: Ingredient[];
  stackSize?: number;
  price?: string;
}

export interface Enemy {
  id: string;
  name: string;
  sizeClass: SizeClass;
  threat: 1 | 2 | 3 | 4 | 5;
  role?: string;
  description: string;
  attacks: string[];
  weakPoints: string[];
  tactics: string;
  recommendedWeapons: string[];
  damageNotes?: string;
  drops: string[];
  maps: string[];
  situations: string[];
  hp?: string;
  xp?: string;
  addedIn: string;
  verified: boolean;
}

export interface MapEvent {
  id: string;
  name: string;
  category: string;
  trigger: string;
  description: string;
  rewards: string[];
  maps: string[];
  verified: boolean;
}

export type PoiTier = 'red' | 'yellow' | 'green' | 'none';

export interface PointOfInterest {
  id: string;
  name: string;
  tier: PoiTier;
  description: string;
  loot: string[];
  verified: boolean;
}

export interface Extraction {
  name: string;
  type: string;
  notes: string;
  verified: boolean;
}

export interface LockedRoom {
  key: string;
  opens: string;
  loot: string;
  verified: boolean;
}

export interface MapImage {
  label: string;
  src: string;
  width: number;
  height: number;
}

export interface RaidMap {
  slug: string;
  name: string;
  status: 'playable' | 'upcoming';
  addedIn: string;
  tagline: string;
  description: string;
  size: string;
  players: string;
  difficulty: string;
  danger: 1 | 2 | 3 | 4 | 5;
  recommendedLevel: string;
  conditions: string[];
  layout: { summary: string; north: string; south: string; east: string; west: string; center: string; verified: boolean };
  pois: PointOfInterest[];
  extractions: Extraction[];
  lockedRooms: LockedRoom[];
  arcSpawns: string[];
  events: string[];
  hotspots: string[];
  tips: string[];
  images: MapImage[];
  color: string;
}

export interface Quest {
  id: string;
  name: string;
  giver: string;
  order: number;
  description: string;
  objectives: string[];
  maps: string[];
  previous: string[];
  next: string[];
  rewards: string[];
  xp: number;
  tips?: string;
  verified: boolean;
}

export interface ProjectPhase {
  phase: number;
  name: string;
  description: string;
  requirements: Ingredient[];
}

export interface ExpeditionProject {
  id: string;
  name: string;
  kind: 'expedition' | 'community' | 'personal';
  description: string;
  phases: ProjectPhase[];
  startDate?: string;
  endDate?: string;
  rewards: string[];
  verified: boolean;
}

export interface Skill {
  id: string;
  name: string;
  branch: string;
  isMajor: boolean;
  maxPoints: number;
  effect: string;
  impacted?: string;
  prerequisites: string[];
  rating: SkillRating;
  ratingNote?: string;
}

export interface SkillBranch {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface WorkshopLevel {
  level: number;
  title?: string;
  materials: Ingredient[];
  coins?: number;
  unlocks: string;
  verified: boolean;
}

export interface WorkshopStation {
  id: string;
  name: string;
  description: string;
  maxLevel: number;
  levels: WorkshopLevel[];
  produces?: string[];
}

export interface TraderStock {
  item: string;
  itemId: string;
  price: number;
  currency: string;
  level?: number;
  dailyLimit?: number;
}

export interface Trader {
  id: string;
  name: string;
  role: string;
  description: string;
  personality: string;
  currency: string;
  stock: TraderStock[];
  unlockNote: string;
  verified: boolean;
}

export interface Item {
  id: string;
  name: string;
  category: ItemCategory;
  subtype?: string;
  rarity: Rarity;
  description: string;
  effect?: string;
  stats?: Record<string, string | number>;
  foundIn: string[];
  soldBy: { trader: string; price: number; currency: string; level?: number }[];
  value: number;
  weight?: number;
  stackSize?: number;
  usedFor: string[];
  recipe?: Ingredient[];
  craftStation?: string;
  craftStationLevel?: number;
  blueprintRequired: boolean;
  recyclesInto: Ingredient[];
  map?: string;
  opens?: string;
  addedIn: string;
  verified: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  station: string;
  stationLevel?: number;
  resultId: string;
  resultRarity?: Rarity;
  qty: number;
  ingredients: Ingredient[];
  category: string;
  blueprintRequired: boolean;
}

export interface GuideSection {
  id: string;
  title: string;
  content: string;
  bullets?: string[];
  subsections?: { title: string; content?: string; bullets?: string[] }[];
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  personality: string;
  offers: string;
}

export interface Patch {
  version: string;
  date: string;
  name: string;
  highlights: string[];
  verified: boolean;
}

export interface GameOverview {
  title: string;
  developer: string;
  publisher: string;
  engine: string;
  releaseDate: string;
  platforms: string[];
  price: string;
  genre: string;
  premise: string;
  lore: string;
  eras: { name: string; summary: string }[];
  latestPatch: string;
  nextUpdate: string;
  speranza: { name: string; description: string; facilities: { name: string; function: string }[] };
}

export interface Trial {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'event' | 'trial';
  description: string;
  reward: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  grade: 'bronze' | 'silver' | 'gold' | 'platinum';
  hidden: boolean;
}

export interface Build {
  id: string;
  name: string;
  character: string; // loadout role (assault, scout, support, marksman, mixed)
  skills: string[];
  weapons: string[];
  gears: string[];
  notes?: string;
  isPublic: boolean;
}
