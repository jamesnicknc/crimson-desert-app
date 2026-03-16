import type {
  Skill, Collectible, Boss, Quest, Weapon, Recipe, RegionInfo, RegionPOI,
  Character, CollectibleCategory, Mount, Activity, CampFacility, Enemy, Trophy,
} from '@/types/game-data';

// ═══════════════════════════════════════
// REGIONS
// ═══════════════════════════════════════

export const REGIONS: RegionInfo[] = [
  {
    id: 'hernand', name: 'Hernand', subtitle: 'Fertile Heartland / Starting Region',
    description: 'Lush green fields dotted with prosperous cities and dense forests. The journey begins here amid political intrigue and noble house rivalries.',
    color: '#5BAA5B', features: ['Cities', 'Forests', 'Noble Houses', 'Meadows'],
    pois: [
      { name: 'Hernand Castle', type: 'landmark' },
      { name: 'Roothold Stronghold', type: 'stronghold' },
      { name: 'Unicorn Cliffs', type: 'landmark' },
      { name: 'Antumbra Ritual Grounds', type: 'ruins' },
      { name: 'Bluemont Manor', type: 'landmark' },
      { name: 'The Eldertree', type: 'landmark' },
      { name: 'Nas River Fishing Dock', type: 'other' },
      { name: 'Hernand Crossroads', type: 'town' },
      { name: 'Hernand Highway', type: 'other' },
    ],
  },
  {
    id: 'pailune', name: 'Pailune', subtitle: 'Northern Highlands / Greymane Homeland',
    description: 'Green highlands and rugged terrain give way to snowy mountain peaks. Open grasslands where wild horses roam lead to treacherous frozen passes. The ancestral home of the Greymanes, once unified under the great leader Gian.',
    color: '#5B8FA8', features: ['Highlands', 'Mountains', 'Grasslands', 'Greymane HQ', 'Wildlife'],
    pois: [
      { name: 'Greymane Base Camp', type: 'camp' },
      { name: 'Frozen Soul Mountain', type: 'landmark' },
      { name: 'Frozen Pass', type: 'landmark' },
      { name: 'Dragon Ridge', type: 'landmark' },
      { name: 'Pailune Archives', type: 'landmark' },
      { name: 'Pailune Monument', type: 'shrine' },
      { name: "Dragon's Nest", type: 'dungeon' },
      { name: 'Mountain Peak Shrine', type: 'shrine' },
    ],
  },
  {
    id: 'demeniss', name: 'Demeniss', subtitle: 'Capital / Seat of Power',
    description: "The grand capital of Pywel and major military staging ground. King Demeniss's coma has sparked a dangerous power vacuum here.",
    color: '#8B7530', features: ['Castle', 'Military', 'Politics', 'Markets'],
    pois: [
      { name: 'Demeniss Castle', type: 'landmark' },
      { name: 'Royal Quarter', type: 'town' },
      { name: 'Royal Catacombs', type: 'dungeon' },
      { name: 'Military Fort', type: 'stronghold' },
      { name: 'Demeniss Gate', type: 'landmark' },
      { name: 'Demeniss Throne Room', type: 'landmark' },
    ],
  },
  {
    id: 'delesyia', name: 'Delesyia', subtitle: 'Mechanical Frontier / Science & Tech',
    description: 'The most scientifically advanced region, filled with mechanical beings, otherworldly constructs, and alchemical innovation.',
    color: '#7B5EA7', features: ['Robots', 'Alchemy Labs', 'Tech', 'Constructs'],
    pois: [
      { name: "Marni's Masterium", type: 'landmark' },
      { name: 'Tesla Ruins', type: 'ruins' },
      { name: 'Sky Tower', type: 'landmark' },
      { name: 'Delesyia Lab', type: 'other' },
      { name: 'Delesyia Outskirts', type: 'town' },
    ],
  },
  {
    id: 'desert', name: 'The Crimson Desert', subtitle: 'Lawless Wastes / Red Sands',
    description: 'A barren wasteland of crimson sand, completely lawless and home to brigands, powerful beasts, and ancient secrets buried beneath the dunes.',
    color: '#C0392B', features: ['Brigands', 'Ruins', 'Beasts', 'Secrets'],
    pois: [
      { name: 'The Bonepit Arena', type: 'arena' },
      { name: 'Buried Temple', type: 'ruins' },
      { name: 'Lava Pit', type: 'landmark' },
      { name: 'Red Dunes Entry', type: 'landmark' },
      { name: "Bandit's Rest", type: 'other' },
      { name: 'Desert Hermit Outpost', type: 'other' },
    ],
  },
  // Added 2026-03-15 via apply-data task
  {
    id: 'abyss', name: 'The Abyss', subtitle: 'Otherworldly Dimension / Source of Abyss Power',
    description: 'A mysterious realm brimming with secrets and untold power. This otherworldly dimension lies beyond the known world and is tied to the dark magic threatening Pywel. Home to the Library of Providence and the dreaded Hexe Marie.',
    color: '#1A0A2E', features: ['Library of Providence', 'Skyloop Bridge', 'Abyss Magic', 'Mysteries'],
    pois: [
      { name: 'Library of Providence', type: 'landmark' },
      { name: 'Skyloop Bridge', type: 'landmark' },
      { name: 'Abyss Gateway', type: 'shrine' },
      { name: 'Final Depth', type: 'dungeon' },
    ],
  },
];

// ═══════════════════════════════════════
// SKILLS PER CHARACTER
// ═══════════════════════════════════════

export const SKILLS: Skill[] = [
  // ─── KLIFF ───────────────────────────────────────────────────────────────────
  // Skill names sourced from Beebom skills article (beebom.com/crimson-desert-skills/)
  // Tier 2 source -- confirmed from direct gameplay preview. Full tree to be
  // verified and completed post-launch with in-game text.

  // Kliff - Blue Branch: Sword Mastery
  { id: 'k-s1', name: 'Forward Slash', cost: 'Artifact', branch: 'Sword Mastery', character: 'kliff', description: 'A forward slashing attack. Can be leveled multiple times for increased potency.' },
  { id: 'k-s2', name: 'Turning Slash', cost: 'Artifact', branch: 'Sword Mastery', character: 'kliff', description: 'A wide turning slash that hits enemies on all sides.' },
  { id: 'k-s3', name: 'Blinding Flash', cost: 'Artifact', branch: 'Sword Mastery', character: 'kliff', description: 'A flash of light from the blade that disorients enemies and opens a follow-up window.' },
  { id: 'k-s4', name: 'Sword Flurry', cost: 'Artifact', branch: 'Sword Mastery', character: 'kliff', description: 'Unleash a rapid flurry of sword strikes in quick succession.' },

  // Kliff - Blue Branch: Unarmed Combat
  { id: 'k-u1', name: 'Pump Kick', cost: 'Artifact', branch: 'Unarmed Combat', character: 'kliff', description: 'A fast pumping kick that pushes enemies back.' },
  { id: 'k-u2', name: 'Dropkick', cost: 'Artifact', branch: 'Unarmed Combat', character: 'kliff', description: 'Launch forward and drive both feet into an enemy.' },
  { id: 'k-u3', name: 'Vault', cost: 'Artifact', branch: 'Unarmed Combat', character: 'kliff', description: 'Vault over an enemy, repositioning behind them for a follow-up strike.' },
  { id: 'k-u4', name: 'Flying Kick', cost: 'Artifact', branch: 'Unarmed Combat', character: 'kliff', description: 'A leaping kick that covers distance and knocks enemies off-balance.' },
  { id: 'k-u5', name: 'Meteor Kick', cost: 'Artifact', branch: 'Unarmed Combat', character: 'kliff', description: 'A devastating aerial heel drop that slams enemies into the ground.' },
  { id: 'k-u6', name: 'Body Slam', cost: 'Artifact', branch: 'Unarmed Combat', character: 'kliff', description: 'A full-body tackle that sends enemies sprawling.' },
  { id: 'k-u7', name: 'Clothesline', cost: 'Artifact', branch: 'Unarmed Combat', character: 'kliff', description: 'A running lariat that takes enemies off their feet.' },
  { id: 'k-u8', name: 'Belly Slam', cost: 'Observe', branch: 'Unarmed Combat', character: 'kliff', description: 'Learned by observing a master wrestler. A devastating belly-first impact.' },

  // Kliff - Blue Branch: Ranged & Bow
  { id: 'k-r1', name: 'Evasive Shot', cost: 'Artifact', branch: 'Ranged & Bow', character: 'kliff', description: 'Fire while rolling or evading, maintaining offensive pressure during dodges.' },
  { id: 'k-r2', name: 'Charged Shot', cost: 'Artifact', branch: 'Ranged & Bow', character: 'kliff', description: 'Hold to charge the bow for a high-damage precision shot.' },
  { id: 'k-r3', name: 'Focus', cost: 'Artifact', branch: 'Ranged & Bow', character: 'kliff', description: 'Enter a focused state that slows perceived time and increases bow accuracy.' },
  { id: 'k-r4', name: 'Winch', cost: 'Artifact', branch: 'Ranged & Bow', character: 'kliff', description: 'Fire a grappling shot that pulls enemies toward you or yanks you to a distant ledge.' },

  // Kliff - Green Branch: Spirit Arts
  { id: 'k-g1', name: "Nature's Echo", cost: 'Artifact', branch: 'Spirit Arts', character: 'kliff', description: 'Channel the spirit of the natural world to amplify your next attack.' },
  { id: 'k-g2', name: "Nature's Snare", cost: 'Artifact', branch: 'Spirit Arts', character: 'kliff', description: 'Summon binding roots or vines that immobilize a target briefly.' },
  { id: 'k-g3', name: 'Keen Senses', cost: 'Artifact', branch: 'Spirit Arts', character: 'kliff', description: 'Heighten awareness to detect hidden enemies and avoid ambushes.' },

  // Kliff - Red Branch: Elemental Power
  { id: 'k-h1', name: 'Fist of Flame', cost: 'Artifact', branch: 'Elemental Power', character: 'kliff', description: 'Imbue your fists with fire, adding burn damage to unarmed strikes.' },
  { id: 'k-h2', name: 'Veil of Fog', cost: 'Artifact', branch: 'Elemental Power', character: 'kliff', description: 'Shroud yourself in concealing fog, reducing enemy detection range.' },
  { id: 'k-h3', name: 'Mantle of Frost', cost: 'Artifact', branch: 'Elemental Power', character: 'kliff', description: 'Wrap yourself in frost that slows enemies who strike you in melee.' },
  { id: 'k-h4', name: 'Surge of Sparks', cost: 'Artifact', branch: 'Elemental Power', character: 'kliff', description: 'Release a crackling surge of lightning that chains across nearby enemies.' },

  // Kliff - Core Skills (unlocked after completing a branch)
  { id: 'k-c1', name: 'Falling Palm', cost: 'Artifact', branch: 'Core', character: 'kliff', description: 'Unleash a powerful blow to the ground by harnessing the force of the fall and channeling all your Stamina into the strike. Unlocked after completing one full skill branch.' },
  { id: 'k-c2', name: 'Axiom Force', cost: 'Artifact', branch: 'Core', character: 'kliff', description: 'Harness Abyss power to launch into aerial combat. Enables flight-style moves.' },
  { id: 'k-c3', name: 'Force Palm', cost: 'Observe', branch: 'Core', character: 'kliff', description: 'Learned by observing a holographic projection. A devastating open-palm strike that sends enemies flying.' },

  // ─── DAMIANE ─────────────────────────────────────────────────────────────────
  // In-game skill names for Damiane are not confirmed from an authoritative
  // pre-launch source. Branch structure is correct; names updated post-launch.

  { id: 'd-b1', name: 'Rapier Thrust', cost: 'Artifact', branch: 'Blade Arts', character: 'damiane', description: 'A swift forward thrust with the rapier. (Name unverified -- updating post-launch.)' },
  { id: 'd-b2', name: 'Claymore Sweep', cost: 'Artifact', branch: 'Blade Arts', character: 'damiane', description: 'A wide horizontal sweep with the claymore. (Name unverified -- updating post-launch.)' },
  { id: 'd-b3', name: 'Riposte', cost: 'Artifact', branch: 'Blade Arts', character: 'damiane', description: 'Deflect and immediately counter with a precise strike. (Name unverified -- updating post-launch.)' },
  { id: 'd-b4', name: 'Shadow Step', cost: 'Artifact', branch: 'Blade Arts', character: 'damiane', description: 'Dash to appear behind an enemy. (Name unverified -- updating post-launch.)' },
  { id: 'd-b5', name: 'Blade Dance', cost: 'Artifact', branch: 'Blade Arts', character: 'damiane', description: 'Spin with dual blades, hitting all surrounding enemies. (Name unverified -- updating post-launch.)' },
  { id: 'd-g1', name: 'Quick Draw', cost: 'Artifact', branch: 'Gunplay', character: 'damiane', description: 'Draw and fire in a single fluid motion. (Name unverified -- updating post-launch.)' },
  { id: 'd-g2', name: 'Precision Shot', cost: 'Artifact', branch: 'Gunplay', character: 'damiane', description: 'Steady the firearm for a high-damage aimed shot. (Name unverified -- updating post-launch.)' },
  { id: 'd-g3', name: 'Explosive Round', cost: 'Artifact', branch: 'Gunplay', character: 'damiane', description: 'Load a round that explodes on impact. (Name unverified -- updating post-launch.)' },
  { id: 'd-g4', name: 'Rapid Fire', cost: 'Artifact', branch: 'Gunplay', character: 'damiane', description: 'Unleash a rapid burst of shots. (Name unverified -- updating post-launch.)' },
  { id: 'd-e1', name: 'Dodge Roll', cost: 'Artifact', branch: 'Evasion', character: 'damiane', description: 'A quick evasive roll. (Name unverified -- updating post-launch.)' },
  { id: 'd-e2', name: 'Phase Dash', cost: 'Artifact', branch: 'Evasion', character: 'damiane', description: 'Dash forward, passing through attacks. (Name unverified -- updating post-launch.)' },
  { id: 'd-e3', name: 'Smoke Screen', cost: 'Artifact', branch: 'Evasion', character: 'damiane', description: 'Deploy a concealing smoke cloud. (Name unverified -- updating post-launch.)' },
  { id: 'd-e4', name: 'Vanishing Strike', cost: 'Artifact', branch: 'Evasion', character: 'damiane', description: 'Disappear and reappear with a devastating strike. (Name unverified -- updating post-launch.)' },
  { id: 'd-m1', name: 'Abyss Bolt', cost: 'Artifact', branch: 'Abyss Spells', character: 'damiane', description: 'Fire a concentrated bolt of Abyss energy. (Name unverified -- updating post-launch.)' },
  { id: 'd-m2', name: 'Magic Ward', cost: 'Artifact', branch: 'Abyss Spells', character: 'damiane', description: 'Conjure a magical barrier that absorbs incoming damage. (Name unverified -- updating post-launch.)' },
  { id: 'd-m3', name: 'Chain Lightning', cost: 'Artifact', branch: 'Abyss Spells', character: 'damiane', description: 'Lightning that chains between multiple enemies. (Name unverified -- updating post-launch.)' },

  // ─── OONGKA ──────────────────────────────────────────────────────────────────
  // In-game skill names for Oongka are not confirmed from an authoritative
  // pre-launch source. Branch structure is correct; names updated post-launch.

  { id: 'o-a1', name: 'Cleave', cost: 'Artifact', branch: 'Axe Fury', character: 'oongka', description: 'A powerful downward axe chop. (Name unverified -- updating post-launch.)' },
  { id: 'o-a2', name: 'Spinning Axe', cost: 'Artifact', branch: 'Axe Fury', character: 'oongka', description: 'Whirl the greataxe in a circle, hitting all nearby enemies. (Name unverified -- updating post-launch.)' },
  { id: 'o-a3', name: 'Ground Shatter', cost: 'Artifact', branch: 'Axe Fury', character: 'oongka', description: 'Slam the axe into the ground, creating a staggering shockwave. (Name unverified -- updating post-launch.)' },
  { id: 'o-a4', name: 'Berserker Rage', cost: 'Artifact', branch: 'Axe Fury', character: 'oongka', description: 'Enter a combat frenzy increasing attack speed and damage. (Name unverified -- updating post-launch.)' },
  { id: 'o-a5', name: 'Earthquake Slam', cost: 'Artifact', branch: 'Axe Fury', character: 'oongka', description: 'Leap and slam down with earth-shattering force. (Name unverified -- updating post-launch.)' },
  { id: 'o-c1', name: 'Cannon Blast', cost: 'Artifact', branch: 'Wrist Cannon', character: 'oongka', description: 'Fire an explosive cannonball at medium range. (Name unverified -- updating post-launch.)' },
  { id: 'o-c2', name: 'Scatter Shot', cost: 'Artifact', branch: 'Wrist Cannon', character: 'oongka', description: 'Fire a cone of shrapnel hitting multiple enemies. (Name unverified -- updating post-launch.)' },
  { id: 'o-c3', name: 'Barrage', cost: 'Artifact', branch: 'Wrist Cannon', character: 'oongka', description: 'Rapidly fire three explosive rounds in succession. (Name unverified -- updating post-launch.)' },
  { id: 'o-f1', name: 'Iron Skin', cost: 'Artifact', branch: 'Fortitude', character: 'oongka', description: 'Harden your body, reducing incoming damage. (Name unverified -- updating post-launch.)' },
  { id: 'o-f2', name: 'War Cry', cost: 'Artifact', branch: 'Fortitude', character: 'oongka', description: 'A battle cry that boosts nearby allies\' attack. (Name unverified -- updating post-launch.)' },
  { id: 'o-f3', name: 'Regeneration', cost: 'Artifact', branch: 'Fortitude', character: 'oongka', description: 'Slowly regenerate health over time. (Name unverified -- updating post-launch.)' },
  { id: 'o-f4', name: 'Unstoppable', cost: 'Artifact', branch: 'Fortitude', character: 'oongka', description: 'Become immune to stagger and knockback. (Name unverified -- updating post-launch.)' },
  { id: 'o-v1', name: 'Vitality I', cost: 'Artifact', branch: 'Vitality', character: 'oongka', description: 'Increase maximum health. (Name unverified -- updating post-launch.)' },
  { id: 'o-v2', name: 'Vitality II', cost: 'Artifact', branch: 'Vitality', character: 'oongka', description: 'Further increase maximum health. (Name unverified -- updating post-launch.)' },
  { id: 'o-v3', name: 'Endurance I', cost: 'Artifact', branch: 'Vitality', character: 'oongka', description: 'Increase maximum stamina. (Name unverified -- updating post-launch.)' },
];

export const COLLECTIBLES: Record<CollectibleCategory, Collectible[]> = {
  // Artifacts, gear, recipe collectibles, and lore entries will be populated
  // post-launch once confirmed names and locations are available in-game.
  artifact: [],
  gear: [],
  recipe: [],
  lore: [],
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
  edition: [
    { name: 'Kairos Plate Set', location: 'Deluxe Edition Bonus', category: 'edition' },
    { name: 'Balgran Shield (Deluxe Edition)', location: 'Deluxe Edition Bonus', category: 'edition' },
    { name: 'Exclaire Horse Tack Set', location: 'Deluxe Edition Bonus', category: 'edition' },
    { name: 'Tormented Soul Bow', location: 'Collector\'s Edition Bonus', category: 'edition' },
    { name: 'Derictus Spear', location: 'Collector\'s Edition Bonus', category: 'edition' },
    { name: 'Sielos Longsword', location: 'Collector\'s Edition Bonus', category: 'edition' },
    { name: 'Shroud Lantern', location: 'Collector\'s Edition Bonus', category: 'edition' },
    { name: 'Hyperion Horse Tack Set', location: 'Collector\'s Edition Bonus', category: 'edition' },
    { name: 'Khaled Shield', location: 'Pre-Order Exclusive', category: 'edition' },
    // Added 2026-03-15 via apply-data task
    { name: 'Grotevant Plate Set', location: 'PlayStation 5 Exclusive Bonus', category: 'edition' },
  ],
};

export const BOSSES: Boss[] = [
  { name: 'Queen Stoneback Crab', region: 'hernand', type: 'Beast', difficulty: 'hard', reward: 'Stoneback Shell Armor', element: 'physical', weakness: 'fire' },
  { name: 'White Horn', region: 'pailune', type: 'Beast', difficulty: 'hard', reward: 'Frost Core Artifact', element: 'frost', weakness: 'fire' },
  { name: 'Myurdin', region: 'demeniss', type: 'Human', difficulty: 'legendary', reward: 'Black Bear Standard', element: 'physical', weakness: 'frost' },
  { name: 'Walter Lanford', region: 'desert', type: 'Human', difficulty: 'extreme', reward: 'Hand Cannon Blueprint', element: 'fire', weakness: 'frost' },
  { name: 'Delesyian Automaton', region: 'delesyia', type: 'Mechanical', difficulty: 'normal', reward: 'Speed Catalyst Gear', element: 'shock', weakness: 'physical' },
  { name: 'Kearush the Slayer', region: 'hernand', type: 'Monster', difficulty: 'hard', reward: 'Slayer Claw Materials', element: 'physical', weakness: 'fire' },
  { name: 'Reed Devil', region: 'pailune', type: 'Humanoid', difficulty: 'extreme', reward: "Dragon's Tear", element: 'physical', weakness: 'shock' },
  { name: 'Matthias', region: 'hernand', type: 'Human', difficulty: 'hard', reward: 'Radiant Knight Armor', element: 'physical', weakness: 'shock' }, // Updated 2026-03-15: region corrected from 'demeniss' to 'hernand' -- confirmed by Fextralife Wiki and Game8
  { name: 'Crimson Scorpion King', region: 'desert', type: 'Beast', difficulty: 'hard', reward: 'Venom Materials', element: 'fire', weakness: 'frost' },
  { name: 'Golden Star', region: 'delesyia', type: 'Mechanical', difficulty: 'legendary', reward: 'Mech Mount Key', element: 'shock', weakness: 'physical' },
  { name: 'Hexe Marie', region: 'abyss', type: 'Magical', difficulty: 'legendary', reward: 'Deep Abyss Core', element: 'abyss' },
  { name: 'Staglord', region: 'pailune', type: 'Humanoid', difficulty: 'legendary', reward: "Gian's Blade", element: 'physical', weakness: 'abyss' },
  { name: 'Desert Hydra', region: 'desert', type: 'Beast', difficulty: 'extreme', reward: 'Hydra Scale Armor', element: 'fire', weakness: 'frost' },
  { name: 'Snow Walker', region: 'pailune', type: 'Elemental', difficulty: 'extreme', reward: 'Permafrost Crystal', element: 'frost', weakness: 'fire' },
  { name: "The Unifier's Shade", region: 'demeniss', type: 'Spirit', difficulty: 'legendary', reward: 'Crown of Pywel', element: 'abyss', weakness: 'shock' },
];

// ═══════════════════════════════════════
// ENEMIES / BESTIARY
// (401 creatures confirmed in Knowledge Codex -- populated post-launch)
// ═══════════════════════════════════════

export const ENEMIES: Enemy[] = [
  // Entries will be populated post-launch once the full Knowledge Codex
  // creature list is available. The Knowledge Codex confirms 401 creatures
  // total across all regions of Pywel.
];

export const QUESTS: Quest[] = [
  // Main Story -- names and beats confirmed from trailers, developer presentations, and wiki
  { name: "The Greymane's Burden", description: 'Reunite with scattered Greymane members after the Black Bear ambush.', type: 'main' },
  { name: 'Shadows over Demeniss', description: "Investigate the circumstances behind King Demeniss's coma.", type: 'main' },
  { name: 'Into the Abyss', description: 'Discover the source of the Abyss and its threat to Pywel.', type: 'main' },
  { name: 'The Black Bear Hunt', description: 'Track down and confront the Black Bear leadership.', type: 'main' },
  { name: "Pywel's Last Stand", description: 'Unite the factions to face the ultimate threat to the continent.', type: 'main' },
  // Faction Quests -- confirmed from Fextralife Greymane Camp wiki
  { name: 'Greymane Stronghold', description: 'Liberate territory from Black Bear occupation on behalf of the Greymanes.', type: 'faction' },
  { name: 'Dispatch Missions', description: 'Send comrades on expeditions from the Greymane Camp to gather rare resources.', type: 'faction' },
  { name: 'Camp Expansion', description: 'Upgrade the Greymane Camp with new facilities and improvements.', type: 'faction' },
  // Character Arcs -- confirmed from official story materials
  { name: "Damiane's Redemption", description: "Uncover Damiane's hidden past and settle her debts with the noble houses of Hernand. A separate story arc with unique cutscenes and boss encounters.", type: 'character' },
  { name: "Oongka's Homeland", description: "Journey with Oongka to reclaim his ancestral territories in the far reaches of Pywel.", type: 'character' },
  { name: "Kliff's Promise", description: "Fulfill the oath Kliff made to the fallen Greymane leader Gian. Follow the trail of clues across all regions.", type: 'character' },
  // Region Liberation -- confirmed game mechanic from multiple sources
  { name: 'Liberate Hernand Pass', description: 'Break the Black Bear blockade on the main trade route through Hernand.', type: 'liberation' },
  { name: 'Liberate Pailune Bridge', description: 'Retake the frozen bridge connecting northern Pailune settlements.', type: 'liberation' },
  { name: 'Liberate Desert Outpost', description: 'Drive Black Bear forces from the Crimson Desert trading post.', type: 'liberation' },
  { name: 'Liberate Demeniss Docks', description: 'Free the capital docks from enemy occupation.', type: 'liberation' },
  // Side quests -- to be populated post-launch with confirmed in-game names and details
];

export const WEAPONS: Weapon[] = [
  // Kliff
  { name: 'Iron Longsword', icon: '⚔', iconKey: 'sword', type: 'Sword', atk: 45, spd: 70, rng: 30, character: 'kliff' },
  { name: 'Greymane Shield', icon: '🛡', iconKey: 'shield', type: 'Shield', atk: 10, spd: 50, rng: 10, character: 'kliff' },
  { name: "Hunter's Bow", icon: '🏹', iconKey: 'bow', type: 'Bow', atk: 35, spd: 60, rng: 90, character: 'kliff' },
  { name: 'War Polearm', icon: '🔨', iconKey: 'polearm', type: 'Polearm', atk: 55, spd: 45, rng: 50, character: 'kliff',
    signatureAbility: { name: 'Spectral Guardians', description: 'Successful parries summon phantom warriors that attack nearby enemies for 5 seconds.', source: 'Staglord' } },
  { name: 'Steel Greatsword', icon: '⚔', iconKey: 'sword', type: 'Greatsword', atk: 70, spd: 30, rng: 40, character: 'kliff',
    signatureAbility: { name: 'Frost Cleave', description: 'Charged heavy attacks leave frozen ground that slows enemies by 40% for 3 seconds.', source: 'White Horn' } },
  { name: 'Mercenary Daggers', icon: '🗡', iconKey: 'dagger', type: 'Daggers', atk: 30, spd: 90, rng: 15, character: 'kliff' },
  { name: 'Abyss Staff', icon: '🪄', iconKey: 'staff', type: 'Staff', atk: 40, spd: 55, rng: 65, character: 'kliff',
    signatureAbility: { name: 'Abyssal Conduit', description: 'Magic attacks chain to one additional enemy. Chained damage is reduced by 50%.', source: 'Hexe Marie' } },
  // Damiane
  { name: 'Elegant Rapier', icon: '🗡', iconKey: 'rapier', type: 'Rapier', atk: 40, spd: 85, rng: 25, character: 'damiane',
    signatureAbility: { name: 'Golden Pierce', description: 'Critical hits release two homing projectiles that deal 25% weapon damage each.', source: 'Golden Star' } },
  { name: 'Dueling Pistol', icon: '🔫', iconKey: 'pistol', type: 'Pistol', atk: 30, spd: 75, rng: 70, character: 'damiane' },
  { name: 'Sharpshooter Musket', icon: '🔫', iconKey: 'pistol', type: 'Musket', atk: 60, spd: 25, rng: 95, character: 'damiane',
    signatureAbility: { name: 'Hexed Rounds', description: 'Shots mark enemies for 8 seconds. Marked enemies take 15% bonus damage from all sources.', source: 'Hexe Marie' } },
  { name: "Damiane's Claymore", icon: '⚔', iconKey: 'sword', type: 'Claymore', atk: 65, spd: 40, rng: 35, character: 'damiane' },
  { name: 'Marksman Rifle', icon: '🔫', iconKey: 'rifle', type: 'Rifle', atk: 55, spd: 35, rng: 95, character: 'damiane' },
  { name: 'Blackpowder Hand Cannon', icon: '💣', iconKey: 'handcannon', type: 'Hand Cannon', atk: 75, spd: 20, rng: 50, character: 'damiane',
    signatureAbility: { name: 'Stonebreaker Shot', description: 'Fully charged shots shatter enemy guard and stagger for 2 seconds, ignoring all block.', source: 'Queen Stoneback Crab' } },
  // Oongka
  { name: "Oongka's Greataxe", icon: '🪓', iconKey: 'axe', type: 'Battle Axe', atk: 80, spd: 25, rng: 35, character: 'oongka',
    signatureAbility: { name: "Slayer's Fury", description: 'Each consecutive hit increases attack speed by 8%, stacking up to 5 times. Resets after 3 seconds without hitting.', source: 'Kearush the Slayer' } },
  { name: 'Wrist Cannon', icon: '💣', iconKey: 'cannon', type: 'Cannon', atk: 55, spd: 35, rng: 60, character: 'oongka' },
  { name: 'Iron Warhammer', icon: '🔨', iconKey: 'warhammer', type: 'Warhammer', atk: 85, spd: 20, rng: 30, character: 'oongka',
    signatureAbility: { name: 'Stoneback Slam', description: 'Ground slam attacks create shockwaves in a 5m radius that stagger all nearby enemies.', source: 'Queen Stoneback Crab' } },
  { name: 'Balgran Shield', icon: '🛡', iconKey: 'shield', type: 'Shield', atk: 15, spd: 40, rng: 10, character: 'oongka' },
];

export const RECIPES: Recipe[] = [
  // Cooking, alchemy, and blacksmith recipes will be populated post-launch
  // once confirmed ingredient lists and effects are available in-game.
  // Dye Crafting -- confirmed categories; specific recipes to be verified post-launch
  { name: 'Crimson Dye', type: 'dye', ingredients: ['Red Desert Flower x4', 'Mordant x1'], effect: 'Deep red armor/clothing color' },
  { name: 'Midnight Black Dye', type: 'dye', ingredients: ['Squid Ink x3', 'Charcoal x2', 'Mordant x1'], effect: 'Pure black armor/clothing color' },
  { name: 'Royal Gold Dye', type: 'dye', ingredients: ['Gold Dust x2', 'Saffron x3', 'Mordant x1'], effect: 'Metallic gold armor/clothing color' },
  { name: 'Forest Green Dye', type: 'dye', ingredients: ['Green Moss x4', 'Copper Sulfate x1'], effect: 'Deep green armor/clothing color' },
  // Camp Upgrades
  { name: 'Reinforced Palisade', type: 'camp-upgrade', ingredients: ['Timber x10', 'Iron Nails x5', 'Rope x3'], effect: 'Increases camp defense; reduces raid damage' },
  { name: 'Watchtower', type: 'camp-upgrade', ingredients: ['Timber x15', 'Stone Block x8', 'Iron Fittings x3'], effect: 'Early warning of incoming attacks; extends minimap range at camp' },
  { name: 'Expanded Stables', type: 'camp-upgrade', ingredients: ['Timber x8', 'Hay x10', 'Leather x4'], effect: 'Stores up to 4 additional mounts at camp' },
  { name: 'Upgraded Forge', type: 'camp-upgrade', ingredients: ['Firebrick x6', 'Bellows x1', 'Steel Ingot x4'], effect: 'Unlocks Tier 2 blacksmithing recipes' },
];

// ═══════════════════════════════════════
// MOUNTS (29 confirmed)
// ═══════════════════════════════════════

export const MOUNTS: Mount[] = [
  // Horses (6)
  { name: 'Plains Stallion', category: 'horse', region: 'hernand', speed: 70, combat: 10, stamina: 75, acquisition: 'Starter mount, available at game start' },
  { name: 'Greymane Warhorse', category: 'horse', region: 'pailune', speed: 65, combat: 30, stamina: 85, special: 'Charge attack that knocks enemies aside while galloping', acquisition: 'Greymane faction reputation reward' },
  { name: 'Noble Destrier', category: 'horse', region: 'demeniss', speed: 75, combat: 20, stamina: 80, special: 'Increased speed on roads and paved surfaces', acquisition: 'Purchase from Demeniss Royal Stables' },
  { name: 'Desert Charger', category: 'horse', region: 'desert', speed: 80, combat: 15, stamina: 60, special: 'Heat-resistant; no stamina penalty in desert biomes', acquisition: 'Tame in the wild (Crimson Desert outskirts)' },
  { name: 'Dappled Palfrey', category: 'horse', region: 'hernand', speed: 85, combat: 5, stamina: 90, special: 'Fastest sustained gallop; ideal for long-distance travel', acquisition: 'Reward from the Hernand Horse Breeder side quest' },
  { name: 'Midnight Runner', category: 'horse', region: 'multiple', speed: 90, combat: 15, stamina: 70, special: 'Near-silent movement; enemies are slower to detect you while mounted', acquisition: 'Rare wild spawn at night across all regions' },
  // Bears (4)
  { name: 'Pailune Snow Bear', category: 'bear', region: 'pailune', speed: 45, combat: 85, stamina: 80, special: 'Slashes with claws and bites enemies while riding; frost resistance aura', acquisition: 'Tame in the wild (Pailune mountain caves)' },
  { name: 'Ironhide Cave Bear', category: 'bear', region: 'hernand', speed: 40, combat: 90, stamina: 85, special: 'Massive HP pool; acts as a shield absorbing hits for the rider', acquisition: 'Defeat and tame in Ironhide Den (Hernand)' },
  { name: 'Black Bear War Mount', category: 'bear', region: 'demeniss', speed: 50, combat: 80, stamina: 75, special: 'Intimidation roar that fears nearby enemies for 3 seconds', acquisition: 'Captured from Black Bear faction stronghold' },
  { name: 'Crimson Grizzly', category: 'bear', region: 'desert', speed: 45, combat: 75, stamina: 65, special: 'Ground slam attack that staggers enemies in a frontal cone', acquisition: 'Tame in the wild (Crimson Desert oasis)' },
  // Raptors (4)
  { name: 'Sand Raptor', category: 'raptor', region: 'desert', speed: 90, combat: 40, stamina: 55, special: 'Extreme burst speed; double sprint in desert terrain', acquisition: 'Tame in the wild (Red Dunes hunting grounds)' },
  { name: 'Forest Stalker', category: 'raptor', region: 'hernand', speed: 80, combat: 50, stamina: 60, special: 'Pounce attack that pins smaller enemies', acquisition: 'Tame in the wild (Hernand deep forest)' },
  { name: 'Frost Raptor', category: 'raptor', region: 'pailune', speed: 75, combat: 45, stamina: 70, special: 'Ice-trail movement; leaves slippery terrain that slows pursuers', acquisition: 'Complete the Pailune Hunter chain quest' },
  { name: 'Delesyian Swift', category: 'raptor', region: 'delesyia', speed: 85, combat: 35, stamina: 65, special: 'Enhanced agility; can perform sharp turns without speed loss', acquisition: 'Purchase from Delesyia Beast Handler' },
  // Lizards (3)
  { name: 'Rock Lizard', category: 'lizard', region: 'hernand', speed: 55, combat: 25, stamina: 80, special: 'Wall climbing; can scale vertical cliff faces and fortress walls', acquisition: 'Tame in the wild (Hernand canyon walls)' },
  { name: 'Sand Skimmer', category: 'lizard', region: 'desert', speed: 70, combat: 20, stamina: 75, special: 'Glides across sand dunes; ignores quicksand and soft terrain', acquisition: 'Tame in the wild (Crimson Desert flats)' },
  { name: 'Frost Salamander', category: 'lizard', region: 'pailune', speed: 50, combat: 30, stamina: 85, special: 'Traverses ice and frozen water without slipping; cold immunity', acquisition: 'Found in Frozen Soul Mountain caves' },
  // Wyverns & Dragons (4)
  { name: 'Highland Wyvern', category: 'wyvern', region: 'pailune', speed: 80, combat: 60, stamina: 50, special: 'Full flight control; dive-bomb attack on ground targets', acquisition: 'Complete the Dragon Ridge wyvern egg quest' },
  { name: 'Storm Drake', category: 'wyvern', region: 'delesyia', speed: 85, combat: 70, stamina: 45, special: 'Lightning breath attack; chain-damages groups of enemies from the sky', acquisition: 'Tame atop the Tesla Ruins during a storm event' },
  { name: 'Ember Wyvern', category: 'wyvern', region: 'desert', speed: 75, combat: 75, stamina: 40, special: 'Fire breathing from the sky; scorches terrain creating fire hazard zones', acquisition: 'Rare spawn in the Crimson Desert volcanic rifts' },
  { name: 'Abyssal Dragon', category: 'wyvern', region: 'abyss', speed: 90, combat: 95, stamina: 60, special: 'Void breath that bypasses all resistances; full aerial combat', acquisition: 'End-game reward from the Abyss storyline' },
  // Mechanical (3)
  { name: 'Scout Automaton', category: 'mechanical', region: 'delesyia', speed: 65, combat: 40, stamina: 100, special: 'Infinite stamina; never tires. Built-in lantern for dark areas', acquisition: 'Craft at Delesyia Workshop (Blueprints required)' },
  { name: 'Siege Walker', category: 'mechanical', region: 'delesyia', speed: 40, combat: 95, stamina: 90, special: 'Fires devastating missiles; massive AoE siege damage', acquisition: 'Rare blueprint drop from Delesyian Automaton boss' },
  { name: 'Golden Star Mech', category: 'mechanical', region: 'delesyia', speed: 70, combat: 90, stamina: 80, special: 'Homing projectile barrage; energy shield absorbs 3 hits before cooldown', acquisition: 'Boss drop from Golden Star (Mech Mount Key)' },
  // Dinosaurs (3)
  { name: 'Steppe Ceratops', category: 'dinosaur', region: 'hernand', speed: 50, combat: 70, stamina: 90, special: 'Horn charge attack that sends enemies flying; high knockback', acquisition: 'Tame in the wild (Hernand steppe plains)' },
  { name: 'Jungle Strider', category: 'dinosaur', region: 'hernand', speed: 60, combat: 45, stamina: 80, special: 'Tall mount; rider can see over obstacles and foliage. Kick attack', acquisition: 'Tame in the wild (Hernand jungle canopy)' },
  { name: 'Armored Ankylo', category: 'dinosaur', region: 'desert', speed: 35, combat: 80, stamina: 95, special: 'Heavily armored; tail swipe knocks back all surrounding enemies', acquisition: 'Tame in the wild (Crimson Desert bone fields)' },
  // Exotic (2)
  { name: 'Abyssal Spider', category: 'exotic', region: 'abyss', speed: 60, combat: 55, stamina: 70, special: 'Wall climbing on any surface; leaves web trail that slows enemies', acquisition: 'Tame in the Abyss depths (requires Beast Taming skill)' },
  { name: 'Phantom Steed', category: 'exotic', region: 'multiple', speed: 95, combat: 10, stamina: 50, special: 'Ghostly mount that phases through obstacles and enemies; cannot attack', acquisition: "Legendary reward from the Ghost of Gian side quest" },
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

// ═══════════════════════════════════════
// ACTIVITIES & GREYMANE CAMP
// ═══════════════════════════════════════

export const ACTIVITIES: Activity[] = [
  { name: 'Fishing', category: 'gathering', location: 'Riverbanks & coastlines throughout Pywel', description: 'Cast your line along rivers and coastal areas to catch fish for cooking ingredients and rare catches.', yields: ['Fish', 'Cooking Ingredients', 'Rare Catches'] },
  { name: 'Hunting', category: 'gathering', location: 'Wilderness across all regions', description: 'Track and hunt wildlife for meat, pelts, and crafting materials. Different prey in each region.', yields: ['Meat', 'Pelts', 'Bones', 'Animal Materials'] },
  { name: 'Mining', category: 'gathering', location: 'Caves, cliffs, and mountain passes', description: 'Extract ores and minerals from rock deposits for blacksmithing and camp upgrades.', yields: ['Iron Ore', 'Coal', 'Gold Dust', 'Rare Minerals'] },
  { name: 'Herb Gathering', category: 'gathering', location: 'Forests, fields, and swamps', description: 'Collect medicinal herbs, flowers, and alchemical reagents growing throughout the wild.', yields: ['Healing Herbs', 'Alchemical Reagents', 'Rare Plants'] },
  { name: 'Crop Farming', category: 'farming', location: 'Greymane Camp farm plots', description: 'Plant, tend, and harvest crops at the Greymane Camp to produce cooking ingredients and trade goods.', yields: ['Vegetables', 'Grain', 'Fruit', 'Trade Goods'] },
  { name: 'Livestock Raising', category: 'farming', location: 'Greymane Camp ranch', description: 'Raise cows, pigs, goats, and chickens at camp for a steady supply of food and crafting materials.', yields: ['Milk', 'Eggs', 'Meat', 'Wool', 'Leather'] },
  { name: 'Horse Taming', category: 'farming', location: 'Wild grasslands across Pywel', description: 'Find and tame wild horses roaming the open grasslands. Each breed has different stats and abilities.', yields: ['Tamed Horses', 'Mount Variety'] },
  { name: 'Sheep Wrangling', category: 'farming', location: 'Pailune highlands', description: 'Herd and wrangle sheep across the highland pastures of Pailune for wool and camp resources.', yields: ['Wool', 'Camp Supplies'] },
  { name: 'Wrestling', category: 'social', location: 'Greymane Camp fighting ring', description: 'Challenge fellow mercenaries to wrestling bouts at camp. Wins earn respect and reward tokens.', yields: ['Reward Tokens', 'Faction Reputation'] },
  { name: 'Cooking', category: 'social', location: 'Any bonfire throughout Pywel', description: 'Prepare meals at any bonfire using gathered ingredients. Cooked food provides temporary stat buffs.', yields: ['Stat Buffs', 'Health Restoration', 'Stamina Recovery'] },
  { name: 'Mercenary Dispatch', category: 'combat', location: 'Greymane Camp dispatch board', description: 'Send AI companions on timed expeditions to acquire timber, ore, rare materials, or besiege enemy fortresses.', yields: ['Timber', 'Ore', 'Rare Materials', 'Abyss Remnants'] },
];

export const CAMP_FACILITIES: CampFacility[] = [
  {
    name: 'Blacksmith Forge',
    description: 'Craft and upgrade weapons, armor, and equipment. Higher tiers unlock advanced recipes and gear sockets.',
    upgrades: [
      { tier: 1, effect: 'Basic weapon/armor crafting and Refinement I recipes', materials: ['Timber x5', 'Iron Ore x10', 'Coal x5'] },
      { tier: 2, effect: 'Refinement II recipes and Abyss Gear Socket crafting', materials: ['Steel Ingot x8', 'Firebrick x6', 'Bellows x1'] },
      { tier: 3, effect: 'Legendary weapon forging and signature ability infusion', materials: ['Mithril x5', 'Abyss Shard x3', 'Master Plans x1'] },
    ],
  },
  {
    name: 'Bonfire Kitchen',
    description: 'Prepare meals from gathered ingredients. Upgraded kitchens unlock complex recipes with stronger buffs.',
    upgrades: [
      { tier: 1, effect: 'Basic cooking recipes (stews, jerky)', materials: ['Stone x5', 'Timber x3', 'Iron Pot x1'] },
      { tier: 2, effect: 'Advanced recipes and dual-buff meals', materials: ['Firebrick x4', 'Copper Cookware x1', 'Spice Rack x1'] },
      { tier: 3, effect: 'Feast-tier recipes that buff entire party', materials: ['Master Cookbook x1', 'Silver Cookware x1', 'Rare Spices x5'] },
    ],
  },
  {
    name: 'Farm Plots',
    description: 'Grow crops for cooking ingredients and trade goods. Expansions add more plots and unlock rare seed types.',
    upgrades: [
      { tier: 1, effect: '4 basic crop plots (vegetables, grain)', materials: ['Timber x3', 'Fertilizer x5', 'Seeds x10'] },
      { tier: 2, effect: '8 plots, fruit trees, and irrigation system', materials: ['Stone Pipe x6', 'Rich Soil x8', 'Fruit Saplings x4'] },
      { tier: 3, effect: '12 plots, rare herb garden, and automated watering', materials: ['Mechanical Pump x1', 'Abyss-Touched Seeds x3', 'Gold x5'] },
    ],
  },
  {
    name: 'Livestock Ranch',
    description: 'House and breed animals for food and materials. Higher tiers add pens for larger and rarer animals.',
    upgrades: [
      { tier: 1, effect: 'Chicken coop and goat pen (eggs, milk)', materials: ['Timber x5', 'Fence Posts x8', 'Hay x10'] },
      { tier: 2, effect: 'Cattle barn and pig sty (meat, leather)', materials: ['Timber x10', 'Iron Fittings x4', 'Trough x2'] },
      { tier: 3, effect: 'Exotic animal pen (rare materials from unique creatures)', materials: ['Reinforced Fence x6', 'Exotic Feed x5', 'Gold x3'] },
    ],
  },
  {
    name: 'Camp Vendor',
    description: 'A merchant stall where you can buy supplies, sell goods, and access special faction inventory.',
    upgrades: [
      { tier: 1, effect: 'Basic supplies: potions, arrows, repair kits', materials: ['Timber x4', 'Cloth x3', 'Gold x2'] },
      { tier: 2, effect: 'Expanded inventory with rare materials and recipes', materials: ['Timber x6', 'Trade Ledger x1', 'Gold x5'] },
      { tier: 3, effect: 'Black market access: unique gear, mounts, and blueprints', materials: ['Merchant Contract x1', 'Gold x10', 'Faction Token x3'] },
    ],
  },
  {
    name: 'Dispatch Board',
    description: 'Send mercenary companions on expeditions for resources, intel, and siege missions.',
    upgrades: [
      { tier: 1, effect: '2 dispatch slots, short expeditions (timber, ore)', materials: ['Timber x3', 'Map x1', 'Ink x2'] },
      { tier: 2, effect: '4 dispatch slots, medium expeditions (rare materials, intel)', materials: ['War Table x1', 'Courier Horse x1', 'Gold x3'] },
      { tier: 3, effect: '6 dispatch slots, siege missions and legendary material runs', materials: ['Command Banner x1', 'Siege Plans x1', 'Gold x8'] },
    ],
  },
  // Added 2026-03-15 via apply-data task
  {
    name: 'Barber Shop',
    description: 'Customize the appearance of your character, including hairstyle, beard, eyebrows, face tattoos, and body tattoos. Purely cosmetic with no effect on gameplay stats.',
    upgrades: [],
  },
  // Added 2026-03-15 via apply-data task
  {
    name: 'Dyehouse Shop',
    description: 'Change outfit colors and customize mount colors for horses and mechanical mounts. Applies cosmetic dyes crafted at the camp.',
    upgrades: [],
  },
  // Added 2026-03-15 via apply-data task
  {
    name: 'Trading Center',
    description: 'Exchange goods for useful items needed during exploration across the lands of Pywel. A distinct trading facility separate from the Camp Vendor.',
    upgrades: [],
  },
  // Added 2026-03-15 via apply-data task
  {
    name: 'Personal Resting House',
    description: 'Create and customize your own house at Greymane Camp, used as a personal resting place between adventures.',
    upgrades: [],
  },
];

// All collectibles as flat array with keys
export function getAllCollectiblesWithKeys() {
  const result: { key: string; item: Collectible }[] = [];
  const prefixMap: Record<CollectibleCategory, string> = {
    artifact: 'art', gear: 'gear', recipe: 'rec', lore: 'lore', 'fast-travel': 'trav', edition: 'ed',
  };
  for (const [cat, items] of Object.entries(COLLECTIBLES)) {
    items.forEach((item, i) => {
      result.push({ key: `${prefixMap[cat as CollectibleCategory]}-${i}`, item });
    });
  }
  return result;
}

// ═══════════════════════════════════════
// TROPHIES / ACHIEVEMENTS (35 total)
// Source: gamingbible.com [2026-03-16] -- Tier 2
// Rarity tiers are editorial estimates; confirmed post-launch.
// ═══════════════════════════════════════

export const TROPHIES: Trophy[] = [
  // Platinum
  { id: 'troph-plat', name: 'Pywel Legend', rarity: 'platinum', description: 'Unlock all other trophies and prove yourself the ultimate legend of Pywel.', category: 'Mastery' },
  // Gold
  { id: 'troph-g01', name: 'Conqueror of Spires', rarity: 'gold', description: 'Conquer the towering spires that pierce the sky across the lands of Pywel.', category: 'Exploration' },
  { id: 'troph-g02', name: 'Conqueror of the Abysses', rarity: 'gold', description: 'Explore and master the multiple Abyss areas that threaten the world of Pywel.', category: 'Exploration' },
  { id: 'troph-g03', name: 'Tamer of Legends', rarity: 'gold', description: 'Tame legendary mounts and build an extraordinary stable of companions.', category: 'Mounts' },
  { id: 'troph-g04', name: 'Grand Collector of Arms', rarity: 'gold', description: 'Collect an impressive arsenal of weapons from across the world of Pywel.', category: 'Collection' },
  { id: 'troph-g05', name: 'Natural Collector', rarity: 'gold', description: 'Discover and catalog the natural wonders and creatures found throughout Pywel.', category: 'Collection' },
  // Silver
  { id: 'troph-s01', name: 'Master of Swords', rarity: 'silver', description: 'Demonstrate mastery over the sword through skill and countless victories.', category: 'Combat' },
  { id: 'troph-s02', name: 'Master of Shields', rarity: 'silver', description: 'Master the art of defense and shield combat.', category: 'Combat' },
  { id: 'troph-s03', name: 'Master of Bows', rarity: 'silver', description: 'Prove your expertise with the bow through ranged combat mastery.', category: 'Combat' },
  { id: 'troph-s04', name: 'Master of Spears', rarity: 'silver', description: 'Achieve mastery over the spear and polearm weapons.', category: 'Combat' },
  { id: 'troph-s05', name: 'Master of Two-Handed Weapons', rarity: 'silver', description: 'Wield massive two-handed weapons with devastating expertise.', category: 'Combat' },
  { id: 'troph-s06', name: 'Master of Artillery', rarity: 'silver', description: 'Unleash the full power of artillery weapons on the enemies of Pywel.', category: 'Combat' },
  { id: 'troph-s07', name: 'Master of Rapiers', rarity: 'silver', description: 'Demonstrate supreme finesse and precision with the rapier.', category: 'Combat' },
  { id: 'troph-s08', name: 'Master of Firearms', rarity: 'silver', description: 'Master the modern firearms of Pywel with deadly accuracy.', category: 'Combat' },
  { id: 'troph-s09', name: 'Master Camper', rarity: 'silver', description: 'Build and fully develop the Greymane Camp into a thriving base of operations.', category: 'Camp' },
  { id: 'troph-s10', name: 'Expert Storyteller', rarity: 'silver', description: 'Complete a significant portion of the stories woven across Pywel.', category: 'Story' },
  { id: 'troph-s11', name: 'Expert Explorer', rarity: 'silver', description: 'Explore a vast range of locations and regions throughout Pywel.', category: 'Exploration' },
  { id: 'troph-s12', name: 'Ultimate Hunter', rarity: 'silver', description: 'Hunt and defeat legendary beasts across every region of Pywel.', category: 'Combat' },
  { id: 'troph-s13', name: 'Battlefield Conqueror', rarity: 'silver', description: 'Dominate the battlefields of Pywel through superior combat and strategy.', category: 'Combat' },
  { id: 'troph-s14', name: 'The Golden Merchant', rarity: 'silver', description: 'Accumulate great wealth and become a prominent merchant across Pywel.', category: 'Economy' },
  { id: 'troph-s15', name: 'Shadowlord', rarity: 'silver', description: 'Master stealth and shadow-based abilities to become a feared Shadowlord.', category: 'Combat' },
  { id: 'troph-s16', name: 'Lord of Honor', rarity: 'silver', description: 'Uphold honor and justice throughout your journey across Pywel.', category: 'Story' },
  // Bronze
  { id: 'troph-b01', name: 'Novice Adventurer', rarity: 'bronze', description: 'Take your first steps as an adventurer in the world of Pywel.', category: 'Story' },
  { id: 'troph-b02', name: 'Maze Pathfinder', rarity: 'bronze', description: 'Navigate through the complex mazes and labyrinths hidden across Pywel.', category: 'Exploration' },
  { id: 'troph-b03', name: 'Unvanquished Strategist', rarity: 'bronze', description: 'Use cunning strategy and tactics to overcome challenging encounters.', category: 'Combat' },
  { id: 'troph-b04', name: 'Proud Returnee', rarity: 'bronze', description: 'Return to a significant location with renewed purpose and strength.', category: 'Story' },
  { id: 'troph-b05', name: 'Pilgrim of Wonders', rarity: 'bronze', description: 'Visit the remarkable wonders and landmarks scattered across Pywel.', category: 'Exploration' },
  { id: 'troph-b06', name: 'Puzzle Solver', rarity: 'bronze', description: 'Unravel the mysteries and solve the puzzles hidden throughout the world.', category: 'Exploration' },
  { id: 'troph-b07', name: 'Lightbringer', rarity: 'bronze', description: 'Bring light to dark places and illuminate the hidden corners of Pywel.', category: 'Exploration' },
  { id: 'troph-b08', name: 'Navigator of the Stars', rarity: 'bronze', description: 'Use the stars and celestial markers to navigate and explore Pywel.', category: 'Exploration' },
  { id: 'troph-b09', name: 'True Gamer', rarity: 'bronze', description: 'Prove your versatility by mastering the minigames and side activities of Pywel.', category: 'Minigames' },
  { id: 'troph-b10', name: 'Protector of Pailune', rarity: 'bronze', description: 'Defend the frozen lands of Pailune from the threats that endanger its people.', category: 'Story' },
  { id: 'troph-b11', name: 'Relentless Warrior', rarity: 'bronze', description: 'Fight relentlessly and never back down from the challenges of Pywel.', category: 'Combat' },
  { id: 'troph-b12', name: 'Brilliant Tactician', rarity: 'bronze', description: 'Demonstrate tactical brilliance in overcoming the enemies of Pywel.', category: 'Combat' },
  { id: 'troph-b13', name: 'Beast Slayer', rarity: 'bronze', description: 'Hunt and defeat the fearsome beasts that roam the wilds of Pywel.', category: 'Combat' },
];
