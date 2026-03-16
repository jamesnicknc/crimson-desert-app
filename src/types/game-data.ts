// ═══════════════════════════════════════
// CRIMSON DESERT - TYPE DEFINITIONS
// ═══════════════════════════════════════

export type Region = 'hernand' | 'pailune' | 'demeniss' | 'delesyia' | 'desert' | 'abyss';
export type Character = 'kliff' | 'damiane' | 'oongka';
export type Difficulty = 'normal' | 'hard' | 'extreme' | 'legendary';
export type Element = 'physical' | 'fire' | 'frost' | 'shock' | 'abyss';
export type QuestType = 'main' | 'side' | 'faction' | 'character' | 'liberation';
export type QuestStatus = 'not-started' | 'active' | 'complete';
export type CollectibleCategory = 'artifact' | 'gear' | 'recipe' | 'lore' | 'fast-travel' | 'edition';
export type CraftingType = 'cooking' | 'alchemy' | 'blacksmith' | 'dye' | 'camp-upgrade';
export type MountCategory = 'horse' | 'bear' | 'raptor' | 'lizard' | 'wyvern' | 'mechanical' | 'dinosaur' | 'exotic';
export type ActivityCategory = 'gathering' | 'farming' | 'combat' | 'social';
export type PinCategory = 'collectible' | 'boss' | 'npc' | 'poi' | 'custom';
export type ScrapedSource = 'wiki' | 'news' | 'guide' | 'map';

export interface Skill {
  id: string;
  name: string;
  cost: string;
  branch: string;
  character: Character;
  description?: string;
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
  element: Element;
  weakness?: Element;
}

export interface Enemy {
  name: string;
  region: Region | 'multiple';
  type: string;
  element: Element;
  weakness?: Element;
  drops: string[];
  location: string;
  notes?: string;
}

export interface Activity {
  name: string;
  category: ActivityCategory;
  location: string;
  description: string;
  yields: string[];
}

export interface CampFacility {
  name: string;
  description: string;
  upgrades: { tier: number; effect: string; materials: string[] }[];
}

export interface QuestStep {
  step: number;
  instruction: string;
  tip?: string;
}

export interface Quest {
  name: string;
  description: string;
  type: QuestType;
  region?: string;
  rewards?: string[];
  walkthrough?: QuestStep[];
}

export interface SignatureAbility {
  name: string;
  description: string;
  source: string;
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
  signatureAbility?: SignatureAbility;
}

export interface Recipe {
  name: string;
  type: CraftingType;
  ingredients: string[];
  effect: string;
}

export interface Mount {
  name: string;
  category: MountCategory;
  region: Region | 'multiple';
  speed: number;
  combat: number;
  stamina: number;
  special?: string;
  acquisition: string;
}

export interface RegionPOI {
  name: string;
  type: 'town' | 'dungeon' | 'landmark' | 'stronghold' | 'ruins' | 'arena' | 'camp' | 'shrine' | 'other';
}

export interface RegionInfo {
  id: Region;
  name: string;
  subtitle: string;
  description: string;
  color: string;
  features: string[];
  pois: RegionPOI[];
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
