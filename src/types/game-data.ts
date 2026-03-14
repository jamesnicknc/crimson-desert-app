// ═══════════════════════════════════════
// CRIMSON DESERT - TYPE DEFINITIONS
// ═══════════════════════════════════════

export type Region = 'hernand' | 'pailune' | 'demeniss' | 'delesyia' | 'desert' | 'abyss';
export type Character = 'kliff' | 'damiane' | 'oongka';
export type Difficulty = 'normal' | 'hard' | 'extreme' | 'legendary';
export type QuestType = 'main' | 'side' | 'faction';
export type QuestStatus = 'not-started' | 'active' | 'complete';
export type CollectibleCategory = 'artifact' | 'gear' | 'recipe' | 'lore' | 'fast-travel';
export type CraftingType = 'cooking' | 'alchemy' | 'blacksmith';
export type PinCategory = 'collectible' | 'boss' | 'npc' | 'poi' | 'custom';
export type ScrapedSource = 'wiki' | 'news' | 'guide' | 'map';

export interface Skill {
  id: string;
  name: string;
  cost: string;
  branch: string;
  character: Character;
}

export interface Collectible {
  name: string;
  location: string;
  category: CollectibleCategory;
}

export interface Boss {
  name: string;
  region: Region;
  type: string;
  difficulty: Difficulty;
  reward: string;
}

export interface Quest {
  name: string;
  description: string;
  type: QuestType;
}

export interface Weapon {
  name: string;
  icon: string;
  iconKey: string;
  type: string;
  atk: number;
  spd: number;
  rng: number;
  character: Character;
}

export interface Recipe {
  name: string;
  type: CraftingType;
  ingredients: string[];
  effect: string;
}

export interface RegionInfo {
  id: Region;
  name: string;
  subtitle: string;
  description: string;
  color: string;
  features: string[];
}

export interface MapPin {
  id: string;
  lat: number;
  lng: number;
  label: string;
  category: PinCategory;
  icon: string;
  notes?: string;
  isShared: boolean;
  userId?: string;
}

export interface Build {
  id: string;
  name: string;
  character: Character;
  skills: string[];
  weapons: string[];
  gears: string[];
  notes?: string;
  isPublic: boolean;
}

export interface UserProgress {
  category: string;
  itemKey: string;
  value: Record<string, unknown>;
}

export interface GroupMember {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  totalCompleted: number;
  skillsCompleted: number;
  bossesDefeated: number;
  collectiblesFound: number;
  questsCompleted: number;
}

export interface ScrapedContent {
  id: string;
  source: ScrapedSource;
  sourceUrl?: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  scrapedAt: string;
}
