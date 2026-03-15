import type {
  Skill, Collectible, Boss, Quest, Weapon, Recipe, RegionInfo,
  Character, CollectibleCategory,
} from '@/types/game-data';

// ═══════════════════════════════════════
// REGIONS
// ═══════════════════════════════════════

export const REGIONS: RegionInfo[] = [
  {
    id: 'hernand', name: 'Hernand', subtitle: 'Fertile Heartland / Starting Region',
    description: 'Lush green fields dotted with prosperous cities and dense forests. The journey begins here amid political intrigue and noble house rivalries.',
    color: '#5BAA5B', features: ['Cities', 'Forests', 'Noble Houses', 'Meadows'],
  },
  {
    id: 'pailune', name: 'Pailune', subtitle: 'Frozen North / Greymane Homeland',
    description: 'Harsh snowy terrain and treacherous mountains. The ancestral home of the Greymanes, once unified under the great leader Gian.',
    color: '#5B8FA8', features: ['Mountains', 'Snow', 'Greymane HQ', 'Wildlife'],
  },
  {
    id: 'demeniss', name: 'Demeniss', subtitle: 'Capital / Seat of Power',
    description: "The grand capital of Pywel and major military staging ground. King Demeniss's coma has sparked a dangerous power vacuum here.",
    color: '#8B7530', features: ['Castle', 'Military', 'Politics', 'Markets'],
  },
  {
    id: 'delesyia', name: 'Delesyia', subtitle: 'Mechanical Frontier / Science & Tech',
    description: 'The most scientifically advanced region, filled with mechanical beings, otherworldly constructs, and alchemical innovation.',
    color: '#7B5EA7', features: ['Robots', 'Alchemy Labs', 'Tech', 'Constructs'],
  },
  {
    id: 'desert', name: 'The Crimson Desert', subtitle: 'Lawless Wastes / Red Sands',
    description: 'A barren wasteland of crimson sand, completely lawless and home to brigands, powerful beasts, and ancient secrets buried beneath the dunes.',
    color: '#C0392B', features: ['Brigands', 'Ruins', 'Beasts', 'Secrets'],
  },
];

// ═══════════════════════════════════════
// SKILLS PER CHARACTER
// ═══════════════════════════════════════

export const SKILLS: Skill[] = [
  // Kliff - Sword Mastery
  { id: 'k-s1', name: 'Quick Slash Combo', cost: '1 Artifact', branch: 'Sword Mastery', character: 'kliff' },
  { id: 'k-s2', name: 'Shield Counter', cost: '1 Artifact', branch: 'Sword Mastery', character: 'kliff' },
  { id: 'k-s3', name: 'Whirlwind Strike', cost: '2 Artifacts', branch: 'Sword Mastery', character: 'kliff' },
  { id: 'k-s4', name: 'Perfect Parry', cost: '2 Artifacts', branch: 'Sword Mastery', character: 'kliff' },
  { id: 'k-s5', name: 'Blade Storm Finisher', cost: '3 Artifacts', branch: 'Sword Mastery', character: 'kliff' },
  // Kliff - Unarmed
  { id: 'k-u1', name: 'Wrestling Grapple', cost: '1 Artifact', branch: 'Unarmed Combat', character: 'kliff' },
  { id: 'k-u2', name: 'Body Slam', cost: '1 Artifact', branch: 'Unarmed Combat', character: 'kliff' },
  { id: 'k-u3', name: 'Belly Slam (Observed)', cost: 'Observe', branch: 'Unarmed Combat', character: 'kliff' },
  { id: 'k-u4', name: 'Pile-Driver Finisher', cost: '2 Artifacts', branch: 'Unarmed Combat', character: 'kliff' },
  { id: 'k-u5', name: 'Throw Combo Chain', cost: '2 Artifacts', branch: 'Unarmed Combat', character: 'kliff' },
  // Kliff - Ranged
  { id: 'k-r1', name: 'Aimed Shot', cost: '1 Artifact', branch: 'Ranged & Bow', character: 'kliff' },
  { id: 'k-r2', name: 'Rain of Arrows', cost: '2 Artifacts', branch: 'Ranged & Bow', character: 'kliff' },
  { id: 'k-r3', name: 'Explosive Arrow', cost: '2 Artifacts', branch: 'Ranged & Bow', character: 'kliff' },
  { id: 'k-r4', name: 'Quickdraw Volley', cost: '3 Artifacts', branch: 'Ranged & Bow', character: 'kliff' },
  // Kliff - Abyss Magic
  { id: 'k-m1', name: 'Flame Imbue', cost: '1 Artifact', branch: 'Abyss Magic', character: 'kliff' },
  { id: 'k-m2', name: 'Frost Imbue', cost: '1 Artifact', branch: 'Abyss Magic', character: 'kliff' },
  { id: 'k-m3', name: 'Gravity Shift', cost: '2 Artifacts', branch: 'Abyss Magic', character: 'kliff' },
  { id: 'k-m4', name: 'Weightless Lift', cost: '2 Artifacts', branch: 'Abyss Magic', character: 'kliff' },
  { id: 'k-m5', name: 'Stun Burst', cost: '3 Artifacts', branch: 'Abyss Magic', character: 'kliff' },
  // Kliff - Vitality
  { id: 'k-v1', name: 'Health Boost I', cost: '1 Artifact', branch: 'Vitality', character: 'kliff' },
  { id: 'k-v2', name: 'Health Boost II', cost: '2 Artifacts', branch: 'Vitality', character: 'kliff' },
  { id: 'k-v3', name: 'Stamina Boost I', cost: '1 Artifact', branch: 'Vitality', character: 'kliff' },
  { id: 'k-v4', name: 'Stamina Boost II', cost: '2 Artifacts', branch: 'Vitality', character: 'kliff' },
  // Kliff - Observation
  { id: 'k-o1', name: 'NPC Fishing Technique', cost: 'Observe', branch: 'Observation', character: 'kliff' },
  { id: 'k-o2', name: 'Enemy Charge Attack', cost: 'Observe', branch: 'Observation', character: 'kliff' },
  { id: 'k-o3', name: 'Beast Taming Skill', cost: 'Observe', branch: 'Observation', character: 'kliff' },
  { id: 'k-o4', name: 'Abyss Glider Mastery', cost: 'Observe', branch: 'Observation', character: 'kliff' },
  // Damiane - Blade Arts
  { id: 'd-b1', name: 'Rapier Lunge', cost: '1 Artifact', branch: 'Blade Arts', character: 'damiane' },
  { id: 'd-b2', name: 'Claymore Sweep', cost: '1 Artifact', branch: 'Blade Arts', character: 'damiane' },
  { id: 'd-b3', name: 'Riposte Counter', cost: '2 Artifacts', branch: 'Blade Arts', character: 'damiane' },
  { id: 'd-b4', name: 'Shadow Step Slash', cost: '2 Artifacts', branch: 'Blade Arts', character: 'damiane' },
  { id: 'd-b5', name: 'Death Blossom', cost: '3 Artifacts', branch: 'Blade Arts', character: 'damiane' },
  // Damiane - Gunplay
  { id: 'd-g1', name: 'Pistol Quick Draw', cost: '1 Artifact', branch: 'Gunplay', character: 'damiane' },
  { id: 'd-g2', name: 'Musket Precision', cost: '1 Artifact', branch: 'Gunplay', character: 'damiane' },
  { id: 'd-g3', name: 'Explosive Round', cost: '2 Artifacts', branch: 'Gunplay', character: 'damiane' },
  { id: 'd-g4', name: 'Fan the Hammer', cost: '3 Artifacts', branch: 'Gunplay', character: 'damiane' },
  // Damiane - Evasion
  { id: 'd-e1', name: 'Dodge Roll', cost: '1 Artifact', branch: 'Evasion', character: 'damiane' },
  { id: 'd-e2', name: 'Phase Dash', cost: '2 Artifacts', branch: 'Evasion', character: 'damiane' },
  { id: 'd-e3', name: 'Smoke Bomb', cost: '2 Artifacts', branch: 'Evasion', character: 'damiane' },
  { id: 'd-e4', name: 'Vanishing Strike', cost: '3 Artifacts', branch: 'Evasion', character: 'damiane' },
  // Damiane - Abyss Spells
  { id: 'd-m1', name: 'Arcane Bolt', cost: '1 Artifact', branch: 'Abyss Spells', character: 'damiane' },
  { id: 'd-m2', name: 'Shield Ward', cost: '2 Artifacts', branch: 'Abyss Spells', character: 'damiane' },
  { id: 'd-m3', name: 'Chain Lightning', cost: '3 Artifacts', branch: 'Abyss Spells', character: 'damiane' },
  // Oongka - Axe Fury
  { id: 'o-a1', name: 'Cleave', cost: '1 Artifact', branch: 'Axe Fury', character: 'oongka' },
  { id: 'o-a2', name: 'Spinning Axe', cost: '1 Artifact', branch: 'Axe Fury', character: 'oongka' },
  { id: 'o-a3', name: 'Ground Shatter', cost: '2 Artifacts', branch: 'Axe Fury', character: 'oongka' },
  { id: 'o-a4', name: 'Berserker Rage', cost: '2 Artifacts', branch: 'Axe Fury', character: 'oongka' },
  { id: 'o-a5', name: 'Earthquake Slam', cost: '3 Artifacts', branch: 'Axe Fury', character: 'oongka' },
  // Oongka - Wrist Cannon
  { id: 'o-c1', name: 'Cannon Blast', cost: '1 Artifact', branch: 'Wrist Cannon', character: 'oongka' },
  { id: 'o-c2', name: 'Scatter Shot', cost: '2 Artifacts', branch: 'Wrist Cannon', character: 'oongka' },
  { id: 'o-c3', name: 'Explosive Barrage', cost: '3 Artifacts', branch: 'Wrist Cannon', character: 'oongka' },
  // Oongka - Fortitude
  { id: 'o-f1', name: 'Iron Skin', cost: '1 Artifact', branch: 'Fortitude', character: 'oongka' },
  { id: 'o-f2', name: 'War Cry', cost: '1 Artifact', branch: 'Fortitude', character: 'oongka' },
  { id: 'o-f3', name: 'Regeneration', cost: '2 Artifacts', branch: 'Fortitude', character: 'oongka' },
  { id: 'o-f4', name: 'Unstoppable Force', cost: '3 Artifacts', branch: 'Fortitude', character: 'oongka' },
  // Oongka - Vitality
  { id: 'o-v1', name: 'Health Boost I', cost: '1 Artifact', branch: 'Vitality', character: 'oongka' },
  { id: 'o-v2', name: 'Health Boost II', cost: '2 Artifacts', branch: 'Vitality', character: 'oongka' },
  { id: 'o-v3', name: 'Stamina Boost I', cost: '1 Artifact', branch: 'Vitality', character: 'oongka' },
];

export const COLLECTIBLES: Record<CollectibleCategory, Collectible[]> = {
  artifact: [
    { name: 'Heart of the Abyss', location: 'Hernand - Ancient Shrine', category: 'artifact' },
    { name: 'Crimson Shard', location: 'Crimson Desert - Buried Temple', category: 'artifact' },
    { name: 'Frost Core', location: 'Pailune - Frozen Cave', category: 'artifact' },
    { name: 'Thunder Fragment', location: 'Delesyia - Tesla Ruins', category: 'artifact' },
    { name: 'Shadow Essence', location: 'Demeniss - Royal Catacombs', category: 'artifact' },
    { name: 'Vitality Stone', location: 'Hernand - Hidden Waterfall', category: 'artifact' },
    { name: 'Stamina Crystal', location: 'Pailune - Mountain Peak', category: 'artifact' },
    { name: 'Flame Ember', location: 'Crimson Desert - Lava Pit', category: 'artifact' },
    { name: 'Gravity Prism', location: 'Delesyia - Sky Tower', category: 'artifact' },
    { name: 'Wind Wisp', location: 'Hernand - Cliffside', category: 'artifact' },
    { name: 'Deep Abyss Core', location: 'The Abyss - Final Depth', category: 'artifact' },
    { name: "Dragon's Tear", location: 'Pailune - Dragon Nest', category: 'artifact' },
  ],
  gear: [
    { name: 'Swiftblade Augment', location: 'Boss Drop', category: 'gear' },
    { name: 'Iron Fortress Mod', location: 'Demeniss Vendor', category: 'gear' },
    { name: 'Critical Edge Gear', location: 'Hernand Boss', category: 'gear' },
    { name: 'Flame Ward Socket', location: 'Crimson Desert', category: 'gear' },
    { name: 'Frost Bite Enhancer', location: 'Pailune Boss', category: 'gear' },
    { name: 'Lifesteal Charm', location: 'Hidden Quest', category: 'gear' },
    { name: 'Speed Catalyst', location: 'Delesyia Lab', category: 'gear' },
    { name: 'AoE Amplifier', location: 'World Boss', category: 'gear' },
    { name: 'Stealth Module', location: 'Black Bear Camp', category: 'gear' },
    { name: 'Berserker Core', location: 'Arena Reward', category: 'gear' },
  ],
  recipe: [
    { name: 'Hearty Stew', location: 'Greymane Camp', category: 'recipe' },
    { name: "Hunter's Feast", location: 'Hernand Inn', category: 'recipe' },
    { name: 'Frozen Berry Tart', location: 'Pailune Settlement', category: 'recipe' },
    { name: 'Spiced Desert Jerky', location: 'Crimson Desert Outpost', category: 'recipe' },
    { name: 'Stamina Elixir', location: 'Delesyia Alchemist', category: 'recipe' },
    { name: "Warrior's Broth", location: 'Demeniss Barracks', category: 'recipe' },
    { name: 'Healing Salve', location: 'Herb Gatherer NPC', category: 'recipe' },
    { name: 'Fire Resistance Tonic', location: 'Crimson Desert', category: 'recipe' },
    { name: 'Strength Draught', location: 'Pailune Herbalist', category: 'recipe' },
    { name: 'Vitality Pie', location: 'Greymane Farm', category: 'recipe' },
  ],
  lore: [
    { name: 'The Fall of King Demeniss', location: 'Demeniss Castle', category: 'lore' },
    { name: 'Origins of the Greymanes', location: 'Pailune Archives', category: 'lore' },
    { name: 'Legend of the Abyss', location: 'Ancient Ruins', category: 'lore' },
    { name: 'Black Bear Manifesto', location: 'Enemy Stronghold', category: 'lore' },
    { name: "Gian's Last Words", location: 'Pailune Monument', category: 'lore' },
    { name: 'Delesyian Science Records', location: 'Delesyia Lab', category: 'lore' },
    { name: 'Crimson Sands History', location: 'Desert Hermit', category: 'lore' },
    { name: "The Unifier's Legacy", location: 'Demeniss Throne', category: 'lore' },
  ],
  'fast-travel': [
    { name: 'Hernand Crossroads', location: 'Hernand', category: 'fast-travel' },
    { name: 'Greendale Village', location: 'Hernand', category: 'fast-travel' },
    { name: 'Forest Gate', location: 'Hernand', category: 'fast-travel' },
    { name: 'Pailune Base Camp', location: 'Pailune', category: 'fast-travel' },
    { name: 'Frozen Pass', location: 'Pailune', category: 'fast-travel' },
    { name: 'Dragon Ridge', location: 'Pailune', category: 'fast-travel' },
    { name: 'Demeniss Gate', location: 'Demeniss', category: 'fast-travel' },
    { name: 'Royal Quarter', location: 'Demeniss', category: 'fast-travel' },
    { name: 'Military Fort', location: 'Demeniss', category: 'fast-travel' },
    { name: 'Delesyia Outskirts', location: 'Delesyia', category: 'fast-travel' },
    { name: 'Tesla Workshop', location: 'Delesyia', category: 'fast-travel' },
    { name: 'Sky Tower Landing', location: 'Delesyia', category: 'fast-travel' },
    { name: 'Red Dunes Entry', location: 'Crimson Desert', category: 'fast-travel' },
    { name: "Bandit's Rest", location: 'Crimson Desert', category: 'fast-travel' },
    { name: 'Abyss Gateway', location: 'The Abyss', category: 'fast-travel' },
  ],
};

export const BOSSES: Boss[] = [
  { name: 'Ironclad Guardian', region: 'hernand', type: 'Mechanical', difficulty: 'normal', reward: 'Iron Fortress Mod' },
  { name: 'Frost Wyrm', region: 'pailune', type: 'Dragon', difficulty: 'hard', reward: 'Frost Core Artifact' },
  { name: 'Black Bear Warlord', region: 'demeniss', type: 'Human', difficulty: 'hard', reward: 'Unique Weapon' },
  { name: 'Sand Colossus', region: 'desert', type: 'Golem', difficulty: 'extreme', reward: 'Crimson Shard' },
  { name: 'Delesyian Automaton', region: 'delesyia', type: 'Mechanical', difficulty: 'normal', reward: 'Speed Catalyst Gear' },
  { name: 'Dire Wolf Alpha', region: 'hernand', type: 'Beast', difficulty: 'normal', reward: 'Pelt Materials' },
  { name: 'Blizzard Drake', region: 'pailune', type: 'Dragon', difficulty: 'extreme', reward: "Dragon's Tear" },
  { name: 'Shadow Assassin', region: 'demeniss', type: 'Human', difficulty: 'hard', reward: 'Stealth Module Gear' },
  { name: 'Crimson Scorpion King', region: 'desert', type: 'Beast', difficulty: 'hard', reward: 'Venom Materials' },
  { name: 'Thunder Titan', region: 'delesyia', type: 'Magical', difficulty: 'extreme', reward: 'Thunder Fragment' },
  { name: 'The Hollow Knight', region: 'abyss', type: 'Magical', difficulty: 'legendary', reward: 'Deep Abyss Core' },
  { name: "Greymane's Ghost", region: 'pailune', type: 'Spirit', difficulty: 'legendary', reward: "Gian's Blade" },
  { name: 'Desert Hydra', region: 'desert', type: 'Beast', difficulty: 'extreme', reward: 'Hydra Scale Armor' },
  { name: 'Clockwork Dragon', region: 'delesyia', type: 'Mechanical', difficulty: 'legendary', reward: 'Mech Mount Key' },
  { name: "The Unifier's Shade", region: 'demeniss', type: 'Spirit', difficulty: 'legendary', reward: 'Crown of Pywel' },
];

export const QUESTS: Quest[] = [
  { name: "The Greymane's Burden", description: 'Reunite with scattered Greymane members after the Black Bear ambush', type: 'main' },
  { name: 'Shadows over Demeniss', description: "Investigate the circumstances behind King Demeniss's coma", type: 'main' },
  { name: 'Into the Abyss', description: 'Discover the source of the Abyss and its threat to Pywel', type: 'main' },
  { name: 'The Black Bear Hunt', description: 'Track down and confront the Black Bear leadership', type: 'main' },
  { name: "Pywel's Last Stand", description: 'Unite the factions to face the ultimate threat to the continent', type: 'main' },
  { name: "The Hermit's Recipe", description: "Find rare ingredients for a desert hermit's legendary dish", type: 'side' },
  { name: 'Delesyian Blueprints', description: 'Recover stolen mechanical schematics from bandits', type: 'side' },
  { name: 'Ghost of Gian', description: 'Investigate supernatural sightings near the Pailune monument', type: 'side' },
  { name: 'Arena Champion', description: 'Win the underground fighting tournament in Hernand', type: 'side' },
  { name: 'Fishing Mastery', description: 'Catch one of every fish species across all five regions', type: 'side' },
  { name: 'Greymane Stronghold', description: 'Liberate territory from Black Bear occupation', type: 'faction' },
  { name: 'Dispatch Missions', description: 'Send comrades on expeditions for rare resources', type: 'faction' },
  { name: 'Camp Expansion', description: 'Upgrade the Greymane Camp with all facilities', type: 'faction' },
];

export const WEAPONS: Weapon[] = [
  { name: 'Iron Longsword', icon: '⚔', iconKey: 'sword', type: 'Sword', atk: 45, spd: 70, rng: 30, character: 'kliff' },
  { name: 'Greymane Shield', icon: '🛡', iconKey: 'shield', type: 'Shield', atk: 10, spd: 50, rng: 10, character: 'kliff' },
  { name: "Hunter's Bow", icon: '🏹', iconKey: 'bow', type: 'Bow', atk: 35, spd: 60, rng: 90, character: 'kliff' },
  { name: 'War Polearm', icon: '🔨', iconKey: 'polearm', type: 'Polearm', atk: 55, spd: 45, rng: 50, character: 'kliff' },
  { name: 'Steel Greatsword', icon: '⚔', iconKey: 'sword', type: 'Greatsword', atk: 70, spd: 30, rng: 40, character: 'kliff' },
  { name: 'Elegant Rapier', icon: '🗡', iconKey: 'rapier', type: 'Rapier', atk: 40, spd: 85, rng: 25, character: 'damiane' },
  { name: 'Dueling Pistol', icon: '🔫', iconKey: 'pistol', type: 'Pistol', atk: 30, spd: 75, rng: 70, character: 'damiane' },
  { name: 'Sharpshooter Musket', icon: '🔫', iconKey: 'pistol', type: 'Musket', atk: 60, spd: 25, rng: 95, character: 'damiane' },
  { name: "Damiane's Claymore", icon: '⚔', iconKey: 'sword', type: 'Claymore', atk: 65, spd: 40, rng: 35, character: 'damiane' },
  { name: "Oongka's Greataxe", icon: '🪓', iconKey: 'axe', type: 'Battle Axe', atk: 80, spd: 25, rng: 35, character: 'oongka' },
  { name: 'Wrist Cannon', icon: '💣', iconKey: 'cannon', type: 'Cannon', atk: 55, spd: 35, rng: 60, character: 'oongka' },
];

export const RECIPES: Recipe[] = [
  { name: 'Hearty Stew', type: 'cooking', ingredients: ['Venison x2', 'Root Vegetables x3', 'Salt x1'], effect: '+30% Max Health for 10 min' },
  { name: "Hunter's Feast", type: 'cooking', ingredients: ['Wild Boar x1', 'Forest Mushrooms x3', 'Herbs x2'], effect: '+20% Attack for 10 min' },
  { name: 'Frozen Berry Tart', type: 'cooking', ingredients: ['Snow Berries x4', 'Flour x2', 'Honey x1'], effect: '+25% Stamina Regen for 10 min' },
  { name: 'Spiced Desert Jerky', type: 'cooking', ingredients: ['Desert Lizard x2', 'Red Spice x3'], effect: '+15% Heat Resistance' },
  { name: 'Healing Salve', type: 'alchemy', ingredients: ['Healing Herb x3', 'Spring Water x1', 'Beeswax x1'], effect: 'Restores 50% HP over time' },
  { name: 'Stamina Elixir', type: 'alchemy', ingredients: ['Ginseng Root x2', 'Crystal Water x1'], effect: 'Full Stamina Restore' },
  { name: 'Fire Resistance Tonic', type: 'alchemy', ingredients: ['Fire Bloom x2', 'Ice Moss x1', 'Vial x1'], effect: '+40% Fire Resistance for 15 min' },
  { name: 'Strength Draught', type: 'alchemy', ingredients: ['Bear Claw x1', 'Iron Dust x2', 'Alcohol x1'], effect: '+25% Strength for 8 min' },
  { name: 'Weapon Refinement I', type: 'blacksmith', ingredients: ['Iron Ore x5', 'Coal x3'], effect: 'Weapon ATK +10' },
  { name: 'Weapon Refinement II', type: 'blacksmith', ingredients: ['Steel Ingot x3', 'Rare Coal x2', 'Gold Dust x1'], effect: 'Weapon ATK +25' },
  { name: 'Armor Reinforcement', type: 'blacksmith', ingredients: ['Leather x4', 'Iron Plates x2'], effect: 'DEF +15' },
  { name: 'Abyss Gear Socket', type: 'blacksmith', ingredients: ['Abyss Shard x1', 'Mithril x2'], effect: 'Adds gear socket to weapon' },
];

// Skill branches grouped by character
export function getSkillBranches(character: Character) {
  const charSkills = SKILLS.filter(s => s.character === character);
  const branches = new Map<string, Skill[]>();
  charSkills.forEach(s => {
    if (!branches.has(s.branch)) branches.set(s.branch, []);
    branches.get(s.branch)!.push(s);
  });
  return branches;
}

// All collectibles as flat array with keys
export function getAllCollectiblesWithKeys() {
  const result: { key: string; item: Collectible }[] = [];
  const prefixMap: Record<CollectibleCategory, string> = {
    artifact: 'art', gear: 'gear', recipe: 'rec', lore: 'lore', 'fast-travel': 'trav',
  };
  for (const [cat, items] of Object.entries(COLLECTIBLES)) {
    items.forEach((item, i) => {
      result.push({ key: `${prefixMap[cat as CollectibleCategory]}-${i}`, item });
    });
  }
  return result;
}
