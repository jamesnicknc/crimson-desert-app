import type {
  Skill, Collectible, Boss, Quest, Weapon, Recipe, RegionInfo, RegionPOI,
  Character, CollectibleCategory, Mount, Activity, CampFacility, Enemy, Trophy,
  RecommendedBuild, AbyssArtifact,
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
      { name: 'Glenbright Manor', type: 'landmark' },
      { name: 'Glenbright Farm', type: 'landmark' },
      { name: 'Fort Warspike', type: 'stronghold' },
      { name: 'Hernand Castle Town', type: 'town' },
      { name: 'Karin Quarry', type: 'landmark' },
      { name: 'Three Saints\' Falls', type: 'landmark' },
      { name: 'Alfonso Estate', type: 'landmark' },
      { name: 'Goldleaf Guildhouse', type: 'landmark' },
      { name: 'City of Calphade', type: 'town' },
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
      { name: 'Silverwolf Mountain', type: 'landmark' },
      { name: 'Crow\'s Nest', type: 'landmark' },
      { name: 'Ashclaw Keep', type: 'stronghold' },
      { name: 'Icemoor Castle Ruins', type: 'ruins' },
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
      { name: 'City of Demeniss', type: 'town' },
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
      { name: 'Scholastone Institute', type: 'landmark' },
      { name: "Marni's Masterium", type: 'landmark' },
      { name: 'Karin Quarry', type: 'landmark' },
      { name: 'Emberwind Workshop', type: 'landmark' },
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
      { name: 'Fort Perwin', type: 'stronghold' },
      { name: 'Buried Temple', type: 'ruins' },
      { name: 'Lava Pit', type: 'landmark' },
      { name: 'Red Dunes Entry', type: 'landmark' },
      { name: "Bandit's Rest", type: 'other' },
      { name: 'Desert Hermit Outpost', type: 'other' },
    ],
  },
  {
    id: 'abyss', name: 'The Abyss', subtitle: 'Otherworldly Dimension / Source of Abyss Power',
    description: 'A mysterious realm brimming with secrets and untold power. This otherworldly dimension lies beyond the known world and is tied to the dark magic threatening Pywel. Home to the Library of Providence and the dreaded Hexe Marie.',
    color: '#1A0A2E', features: ['Library of Providence', 'Skyloop Bridge', 'Abyss Magic', 'Mysteries'],
    pois: [
      { name: 'Library of Providence', type: 'landmark' },
      { name: 'Sanctum of Absolution', type: 'landmark' },
      { name: 'Raventine Monastery', type: 'landmark' },
      { name: 'Skyloop Bridge', type: 'landmark' },
      { name: 'Abyss Gateway', type: 'shrine' },
      { name: 'Final Depth', type: 'dungeon' },
    ],
  },
];

// ═══════════════════════════════════════
// SKILLS PER CHARACTER
// ═══════════════════════════════════════
// Sources: allthings.how, Game8, Beebom, GamesRadar, GameRant, Fextralife wiki,
//          Xbox Wire/Pearl Abyss official tips, DualShockers, WCCFTech (verified March 2026)
// Unlock methods: Abyss Artifacts (skill points), Observation (boss/NPC watching), Story progression
// Respec: Faded Abyss Artifact resets the full tree (Observe skills are permanent and not refunded)
// Note: All three characters share the same Abyss Artifact pool — spending on companions reduces Kliff's supply

export const SKILLS: Skill[] = [
  // ─── KLIFF ───────────────────────────────────────────────────────────────────
  // Primary protagonist. Available from game start. Only character playable in main story bosses.
  // Three branches: Blue (Stamina, 16 levels), Green (Spirit, 14 levels), Red (Health, 18 levels)

  // Kliff — Blue Branch: Stamina (16 levels)
  { id: 'k-st', name: 'Stamina', cost: 'Passive', branch: 'Stamina', character: 'kliff', description: 'Increases maximum stamina pool (16 levels). Stamina fuels dodges, sprints, gliding, and special attacks.' },
  // Armed Combat + Sword Mastery
  { id: 'k-ac', name: 'Armed Combat', cost: 'Artifact', branch: 'Armed Combat', character: 'kliff', description: 'Master weapon-based fighting. Higher levels unlock Evasive Slash, Charge, Rush, and Quick Swap sub-skills.' },
  { id: 'k-s1', name: 'Forward Slash', cost: 'Artifact', branch: 'Sword Mastery', character: 'kliff', description: 'A forward slashing attack. Upgrades unlock Proficiency and Sure Hit variants.' },
  { id: 'k-s2', name: 'Turning Slash', cost: 'Artifact', branch: 'Sword Mastery', character: 'kliff', description: 'A wide turning slash hitting enemies on all sides. Upgrades unlock Expertise, Proficiency, and Rend Armor variants.' },
  { id: 'k-s3', name: 'Stab', cost: 'Artifact', branch: 'Sword Mastery', character: 'kliff', description: 'A piercing thrust with the highest single-target DPS. Upgrades include Aerial Stab, Rend Armor, Skewering Stab, and Swift Stab. Max-level Rend Armor ignores boss super armor.' },
  { id: 'k-s4', name: 'Spinning Slash', cost: 'Artifact', branch: 'Sword Mastery', character: 'kliff', description: 'A wide spinning attack hitting all surrounding enemies. Upgrades include Proficiency.' },
  { id: 'k-s5', name: 'Blinding Flash', cost: 'Artifact', branch: 'Sword Mastery', character: 'kliff', description: 'A flash of light from the blade that stuns enemies. The Blinding Flash Finisher triggers on perfect timing for burst damage with no stamina cost.' },
  { id: 'k-s6', name: 'Sword Flurry', cost: 'Artifact', branch: 'Sword Mastery', character: 'kliff', description: 'Unleash a rapid flurry of sword strikes in quick succession.' },
  { id: 'k-s7', name: 'Evasive Slash', cost: 'Artifact', branch: 'Armed Combat', character: 'kliff', description: 'Dodge and slash simultaneously, maintaining offense while avoiding damage.' },
  { id: 'k-s8', name: 'Shield Bash', cost: 'Artifact', branch: 'Armed Combat', character: 'kliff', description: 'Strike an enemy with your shield, staggering them and opening a counterattack window.' },
  { id: 'k-s9', name: 'Charge', cost: 'Artifact', branch: 'Armed Combat', character: 'kliff', description: 'Rush forward with your weapon to close distance and land a powerful hit.' },
  // Unarmed Combat
  { id: 'k-uc', name: 'Unarmed Combat', cost: 'Artifact', branch: 'Unarmed Combat', character: 'kliff', description: 'Develop hand-to-hand fighting prowess. Unlocks Leg Sweep, Scissor Takedown, and Proficiency sub-skills.' },
  { id: 'k-u1', name: 'Pump Kick', cost: 'Artifact', branch: 'Unarmed Combat', character: 'kliff', description: 'A fast pumping kick that pushes enemies back and creates distance.' },
  { id: 'k-u2', name: 'Dropkick', cost: 'Artifact', branch: 'Unarmed Combat', character: 'kliff', description: 'Launch forward and drive both feet into an enemy with devastating force.' },
  { id: 'k-u3', name: 'Vault', cost: 'Artifact', branch: 'Unarmed Combat', character: 'kliff', description: 'Vault over an enemy, repositioning behind them for a follow-up strike.' },
  { id: 'k-u4', name: 'Flying Kick', cost: 'Artifact', branch: 'Unarmed Combat', character: 'kliff', description: 'A leaping kick that covers distance and knocks enemies off-balance.' },
  { id: 'k-u5', name: 'Meteor Kick', cost: 'Artifact', branch: 'Unarmed Combat', character: 'kliff', description: 'A devastating aerial heel drop that slams enemies into the ground.' },
  { id: 'k-u6', name: 'Grappling', cost: 'Artifact', branch: 'Unarmed Combat', character: 'kliff', description: 'Master grappling techniques. Unlocks Restrain, Throw, Lariat, Giant Swing, Back Hang, and Lariat Follow-up sub-skills.' },
  { id: 'k-u7', name: 'Body Slam', cost: 'Artifact', branch: 'Unarmed Combat', character: 'kliff', description: 'A full-body tackle that sends enemies sprawling.' },
  { id: 'k-u8', name: 'Clothesline', cost: 'Artifact', branch: 'Unarmed Combat', character: 'kliff', description: 'A running lariat with AoE knockback and a shockwave on impact.' },
  // Archery / Ranged
  { id: 'k-ar', name: 'Archery', cost: 'Artifact', branch: 'Archery', character: 'kliff', description: 'Improve bow handling and accuracy. Foundation for all ranged techniques.' },
  { id: 'k-r1', name: 'Evasive Shot', cost: 'Artifact', branch: 'Archery', character: 'kliff', description: 'Fire while rolling or evading, maintaining offensive pressure during dodges. Upgrades include Proficiency and Expertise variants.' },
  { id: 'k-r2', name: 'Charged Shot', cost: 'Artifact', branch: 'Archery', character: 'kliff', description: 'Hold to charge the bow for a high-damage precision shot.' },
  { id: 'k-r3', name: 'Multishot', cost: 'Artifact', branch: 'Archery', character: 'kliff', description: 'Fire 10 arrows simultaneously, hitting multiple targets at once.' },
  { id: 'k-r4', name: 'Focused Shot', cost: 'Artifact', branch: 'Archery', character: 'kliff', description: 'Enter a focused aiming state where time slows for extreme accuracy.' },
  { id: 'k-r5', name: 'Marksmanship', cost: 'Artifact', branch: 'Archery', character: 'kliff', description: 'Passive skill improving ranged accuracy and damage for all bow attacks.' },

  // Kliff — Green Branch: Spirit (14 levels)
  { id: 'k-sp', name: 'Spirit', cost: 'Passive', branch: 'Spirit', character: 'kliff', description: 'Increases maximum spirit pool (14 levels). Spirit powers nature-based and defensive abilities.' },
  { id: 'k-g1', name: "Nature's Echo", cost: 'Artifact', branch: 'Spirit Arts', character: 'kliff', description: 'Summon phantom clones that mimic your attacks, effectively doubling your hit output.' },
  { id: 'k-g2', name: "Nature's Snare", cost: 'Artifact', branch: 'Spirit Arts', character: 'kliff', description: 'Create a spirit barrier that absorbs incoming projectiles. Most effective at level 3.' },
  { id: 'k-g3', name: 'Keen Senses', cost: 'Artifact', branch: 'Spirit Arts', character: 'kliff', description: 'Heighten combat awareness. Level 3 unlocks Counter, Parry, and Perfect Dodge.' },
  { id: 'k-g4', name: 'Focus', cost: 'Artifact', branch: 'Spirit Arts', character: 'kliff', description: 'Time slows around Kliff, enabling the Focused Insight parry and extreme accuracy.' },
  { id: 'k-g5', name: 'Force Palm', cost: 'Observe', branch: 'Spirit Arts', character: 'kliff', description: 'Condense energy and release it as an open-palm strike that reduces the target\'s defense. Learned by observing a holographic projection.' },
  { id: 'k-g5b', name: 'Focused Force Palm', cost: 'Observe', branch: 'Spirit Arts', character: 'kliff', description: 'A focused Force Palm variant required to break special rock walls blocking story and puzzle paths. Learned by observing a spirit near Fort Perwin in the Crimson Desert.' },
  { id: 'k-g5c', name: 'Healing Force Palm', cost: 'Artifact', branch: 'Spirit Arts', character: 'kliff', description: 'A Force Palm variant that restores health on hit.' },
  { id: 'k-g6', name: 'Parry', cost: 'Artifact', branch: 'Spirit Arts', character: 'kliff', description: 'Deflect incoming attacks with precise timing, creating a window for counterattack.' },
  { id: 'k-g7', name: 'Counter', cost: 'Artifact', branch: 'Spirit Arts', character: 'kliff', description: 'After a successful parry, automatically strike back with increased damage.' },
  { id: 'k-g8', name: 'Evasive Roll', cost: 'Observe', branch: 'Spirit Arts', character: 'kliff', description: 'Roll to evade attacks while regaining stamina, even after taking a hit. Learned by observing Kailok the Hornsplitter boss in Chapter 2.' },
  { id: 'k-g9', name: 'Double Jump', cost: 'Artifact', branch: 'Spirit Arts', character: 'kliff', description: 'Perform a second jump in mid-air, greatly improving vertical mobility and platforming.' },
  { id: 'k-g10', name: "Nature's Grasp", cost: 'Artifact', branch: 'Spirit Arts', character: 'kliff', description: 'Use nature energy to move heavy objects and interact with environmental puzzles.' },
  { id: 'k-gfc', name: 'Force Current', cost: 'Artifact', branch: 'Spirit Arts', character: 'kliff', description: 'A grapple-based technique used for resource gathering and environmental puzzle interactions.' },

  // Kliff — Red Branch: Health (18 levels)
  { id: 'k-hp', name: 'Health', cost: 'Passive', branch: 'Health', character: 'kliff', description: 'Increases maximum health pool (18 levels). The largest of the three core stat branches.' },
  { id: 'k-h5', name: 'Imbue Elements', cost: 'Artifact', branch: 'Elemental Power', character: 'kliff', description: 'Infuse your weapon with elemental power (up to level 4). Unlocks Elemental Turning Slash, Elemental Charged Shot, Elemental Force Palm, and Elemental Meteor Kick.' },
  { id: 'k-h1', name: 'Fist of Flame', cost: 'Artifact', branch: 'Elemental Power', character: 'kliff', description: 'Imbue your fists with fire, adding burn damage to unarmed strikes.' },
  { id: 'k-h8', name: 'Flame Strike', cost: 'Artifact', branch: 'Elemental Power', character: 'kliff', description: 'A fiery overhead slam that ignites the target and leaves burning ground.' },
  { id: 'k-h3', name: 'Mantle of Frost', cost: 'Artifact', branch: 'Elemental Power', character: 'kliff', description: 'Wrap yourself in frost that slows enemies who strike you in melee.' },
  { id: 'k-h9', name: 'Frost Mantle', cost: 'Artifact', branch: 'Elemental Power', character: 'kliff', description: 'Extended frost armor that also damages nearby enemies.' },
  { id: 'k-h4', name: 'Surge of Sparks', cost: 'Artifact', branch: 'Elemental Power', character: 'kliff', description: 'Release a crackling surge of lightning that chains across nearby enemies.' },
  { id: 'k-h10', name: 'Lightning Surge', cost: 'Artifact', branch: 'Elemental Power', character: 'kliff', description: 'Channel lightning through the ground in a line ahead of you.' },
  { id: 'k-h2', name: 'Veil of Fog', cost: 'Artifact', branch: 'Elemental Power', character: 'kliff', description: 'Shroud yourself in concealing fog, reducing enemy detection range.' },
  { id: 'k-h11', name: 'Storm Veil', cost: 'Artifact', branch: 'Elemental Power', character: 'kliff', description: 'Summon a storm that damages all nearby enemies with wind and lightning.' },
  { id: 'k-h6', name: 'Mystical Storage', cost: 'Artifact', branch: 'Elemental Power', character: 'kliff', description: 'Access a pocket dimension to store and retrieve items during combat.' },
  { id: 'k-h12', name: 'Elemental Charged Shot', cost: 'Artifact', branch: 'Elemental Power', character: 'kliff', description: 'Fire a ranged shot infused with elemental magic for explosive impact.' },
  // Axiom / Flight (unlocked through story)
  { id: 'k-ax1', name: 'Axiom Force', cost: 'Story', branch: 'Axiom', character: 'kliff', description: 'Harness Abyss power for aerial combat. Functions as a grappling hook — level 2 unlocks Aerial Swing, level 3 unlocks Aerial Maneuver.' },
  { id: 'k-ax2', name: 'Flight', cost: 'Story', branch: 'Axiom', character: 'kliff', description: 'Spread crow wings and take to the skies for aerial traversal and combat.' },
  { id: 'k-ax3', name: 'Aerial Maneuver', cost: 'Artifact', branch: 'Axiom', character: 'kliff', description: 'Perform advanced airborne maneuvers, repositioning rapidly to dodge attacks.' },
  { id: 'k-ax4', name: 'Aerial Swing', cost: 'Artifact', branch: 'Axiom', character: 'kliff', description: 'Execute powerful sword swings in flight, striking ground targets from above.' },
  { id: 'k-ax6', name: 'Swift Flight', cost: 'Artifact', branch: 'Axiom', character: 'kliff', description: 'Increase aerial movement speed and responsiveness.' },

  // Kliff — Core Convergence
  { id: 'k-c1', name: 'Falling Palm', cost: 'Convergence', branch: 'Core', character: 'kliff', description: 'Channel all remaining Stamina into a ground-impact strike. Unlocked by completing any one of the three branches (Blue, Green, or Red).' },

  // ─── DAMIANE ──────────────────────────────────────────────────────────────────
  // Unlocked at Chapter 3 after completing "A Fresh Start" quest at Howling Hill.
  // Archetype: glass cannon. Weapons: rapier, dual blades, pistol/musket.
  // Starting stats: Health 750, Spirit 220, Stamina 40, Attack 32, Defense 36.
  // Flight uses a mechanical propeller parasol instead of wings.

  // Core Stats
  { id: 'd-st', name: 'Stamina', cost: 'Passive', branch: 'Core Stats', character: 'damiane', description: 'Increases maximum stamina pool.' },
  { id: 'd-sp', name: 'Spirit', cost: 'Passive', branch: 'Core Stats', character: 'damiane', description: 'Increases maximum spirit pool.' },
  { id: 'd-hp', name: 'Health', cost: 'Passive', branch: 'Core Stats', character: 'damiane', description: 'Increases maximum health pool.' },
  // Armed Combat
  { id: 'd-ac', name: 'Armed Combat', cost: 'Artifact', branch: 'Armed Combat', character: 'damiane', description: 'Master rapier and blade techniques.' },
  { id: 'd-sf', name: 'Sword Flurry', cost: 'Artifact', branch: 'Armed Combat', character: 'damiane', description: 'Unleash a rapid flurry of rapier strikes.' },
  { id: 'd-bf', name: 'Blinding Flash', cost: 'Artifact', branch: 'Armed Combat', character: 'damiane', description: 'A flash of light from the blade that stuns and disorients enemies.' },
  { id: 'd-lu', name: 'Lunge', cost: 'Artifact', branch: 'Armed Combat', character: 'damiane', description: 'A forward-rushing thrust that covers distance quickly.' },
  { id: 'd-st2', name: 'Shield Toss', cost: 'Artifact', branch: 'Armed Combat', character: 'damiane', description: 'Throw the shield as a ricocheting ranged attack.' },
  // Shooting (Firearms)
  { id: 'd-sh', name: 'Shooting', cost: 'Artifact', branch: 'Shooting', character: 'damiane', description: 'Master firearm techniques. Foundation for pistol and musket skills.' },
  { id: 'd-cs', name: 'Charged Shot', cost: 'Artifact', branch: 'Shooting', character: 'damiane', description: 'Charge a high-damage precision shot with the pistol.' },
  { id: 'd-fs', name: 'Focused Shot', cost: 'Artifact', branch: 'Shooting', character: 'damiane', description: 'Enter a focused aiming state for extreme firearm accuracy.' },
  // Unarmed Combat
  { id: 'd-uc', name: 'Unarmed Combat', cost: 'Artifact', branch: 'Unarmed Combat', character: 'damiane', description: 'Hand-to-hand fighting techniques.' },
  { id: 'd-gr', name: 'Grappling', cost: 'Artifact', branch: 'Unarmed Combat', character: 'damiane', description: 'Master grappling throws and restraints.' },
  { id: 'd-sk', name: 'Scissor Kick', cost: 'Artifact', branch: 'Unarmed Combat', character: 'damiane', description: 'A scissoring kick that knocks enemies off their feet.' },
  // Evasion / Mobility
  { id: 'd-er', name: 'Evasive Roll', cost: 'Artifact', branch: 'Evasion', character: 'damiane', description: 'A quick evasive roll granting brief invincibility frames.' },
  { id: 'd-dj', name: 'Double Jump', cost: 'Artifact', branch: 'Evasion', character: 'damiane', description: 'Perform a second jump in mid-air for vertical mobility.' },
  { id: 'd-vt', name: 'Vault', cost: 'Artifact', branch: 'Evasion', character: 'damiane', description: 'Vault over an enemy, repositioning behind them.' },
  { id: 'd-sk2', name: 'Skystep', cost: 'Artifact', branch: 'Evasion', character: 'damiane', description: 'A unique aerial dash for rapid repositioning in combat.' },
  { id: 'd-fl', name: 'Flight', cost: 'Story', branch: 'Evasion', character: 'damiane', description: 'Aerial traversal using Damiane\'s mechanical propeller parasol. Unlocked through story.' },
  // Spirit Arts
  { id: 'd-fc', name: 'Focus', cost: 'Artifact', branch: 'Spirit Arts', character: 'damiane', description: 'Enter a focused state increasing accuracy and reaction speed.' },
  { id: 'd-ng', name: "Nature's Grasp", cost: 'Artifact', branch: 'Spirit Arts', character: 'damiane', description: 'Summon nature energy to immobilize a target.' },
  { id: 'd-ks', name: 'Keen Senses', cost: 'Artifact', branch: 'Spirit Arts', character: 'damiane', description: 'Heighten combat awareness to detect and react to threats.' },
  // Smiting (unique to Damiane)
  { id: 'd-sm1', name: 'Smiting Strike', cost: 'Artifact', branch: 'Smiting', character: 'damiane', description: 'A powerful melee blow charged with Abyss energy.' },
  { id: 'd-sm2', name: 'Smiting Bolt', cost: 'Artifact', branch: 'Smiting', character: 'damiane', description: 'Fire a bolt of smiting Abyss energy at a distant target.' },
  { id: 'd-pl', name: 'Piercing Light', cost: 'Artifact', branch: 'Smiting', character: 'damiane', description: 'A piercing beam of Abyss light that passes through multiple enemies.' },
  { id: 'd-ss', name: 'Shield Sentinel', cost: 'Artifact', branch: 'Smiting', character: 'damiane', description: 'Deploy a floating shield sentry turret that autonomously attacks nearby enemies.' },

  // ─── OONGKA ──────────────────────────────────────────────────────────────────
  // Unlocked in Chapter 7 during "Twisted Fate" quest at Ashclaw Keep (after Myurdin fight).
  // Also requires "Gentle Sound of Flowing River" side quest for permanent availability.
  // Archetype: tank/bruiser. Weapons: one-handed axes, two-handed staves, blaster cannon.
  // Starting stats: Health 1125, Spirit 240, Stamina 50, Attack 16, Defense 28.
  // Flight uses a jetpack (Vertical Flight) instead of wings.

  // Core Stats
  { id: 'o-st', name: 'Stamina', cost: 'Passive', branch: 'Core Stats', character: 'oongka', description: 'Increases maximum stamina pool.' },
  { id: 'o-sp', name: 'Spirit', cost: 'Passive', branch: 'Core Stats', character: 'oongka', description: 'Increases maximum spirit pool.' },
  { id: 'o-hp', name: 'Health', cost: 'Passive', branch: 'Core Stats', character: 'oongka', description: 'Increases maximum health pool. Orc constitution enables massive health totals.' },
  // Armed Combat (two-handed weapons)
  { id: 'o-ac', name: 'Armed Combat', cost: 'Artifact', branch: 'Armed Combat', character: 'oongka', description: 'Master two-handed axes and staves with Sure Hit and Quick Swap sub-skills.' },
  { id: 'o-ls', name: 'Leaping Smash', cost: 'Artifact', branch: 'Armed Combat', character: 'oongka', description: 'Leap forward and smash down with a devastating two-handed strike.' },
  { id: 'o-sl', name: 'Slash', cost: 'Artifact', branch: 'Armed Combat', character: 'oongka', description: 'A powerful horizontal slash with a two-handed weapon, with a Rend Armor upgrade.' },
  { id: 'o-bf', name: 'Blinding Flash', cost: 'Artifact', branch: 'Armed Combat', character: 'oongka', description: 'A disorienting flash that staggers enemies.' },
  { id: 'o-qf', name: 'Quaking Fury', cost: 'Artifact', branch: 'Armed Combat', character: 'oongka', description: 'A ground-shaking series of powerful slams with Rend Armor capability.' },
  { id: 'o-ra', name: 'Rampage', cost: 'Artifact', branch: 'Armed Combat', character: 'oongka', description: 'Enter a rampaging state with greatly increased offensive power and a Sure Hit modifier.' },
  { id: 'o-rg', name: 'Rage', cost: 'Artifact', branch: 'Armed Combat', character: 'oongka', description: 'Channel battle rage granting super armor, preventing stagger from enemy attacks.' },
  { id: 'o-rl', name: 'Raging Lightning', cost: 'Artifact', branch: 'Armed Combat', character: 'oongka', description: 'Infuse weapon strikes with raging electrical energy.' },
  { id: 'o-ex', name: 'Explosive Strike', cost: 'Artifact', branch: 'Armed Combat', character: 'oongka', description: 'A devastating blow that detonates on impact, dealing area damage.' },
  { id: 'o-dwm', name: 'Dual Wielding Mastery', cost: 'Artifact', branch: 'Armed Combat', character: 'oongka', description: 'Unique to Oongka — enables wielding two-handed weapons single-handed for dual-wielding.' },
  // Shooting (Hand Cannon / Blaster)
  { id: 'o-sh', name: 'Marksmanship', cost: 'Artifact', branch: 'Shooting', character: 'oongka', description: 'Master the Hand Cannon and Blaster. Foundation for all ranged techniques.' },
  { id: 'o-cs', name: 'Charged Shot', cost: 'Artifact', branch: 'Shooting', character: 'oongka', description: 'Charge the Hand Cannon for a high-damage explosive shot.' },
  { id: 'o-es', name: 'Evasive Shot', cost: 'Artifact', branch: 'Shooting', character: 'oongka', description: 'Fire while rolling, maintaining offensive pressure during dodges.' },
  { id: 'o-sc', name: 'Scatter Shot', cost: 'Artifact', branch: 'Shooting', character: 'oongka', description: 'Fire a cone of shrapnel hitting multiple enemies simultaneously.' },
  { id: 'o-fs', name: 'Focused Shot', cost: 'Artifact', branch: 'Shooting', character: 'oongka', description: 'An extreme accuracy cannon shot for single-target damage.' },
  // Unarmed Combat
  { id: 'o-uc', name: 'Unarmed Combat', cost: 'Artifact', branch: 'Unarmed Combat', character: 'oongka', description: 'Orc hand-to-hand combat. Raw strength enables devastating grapples and slams.' },
  { id: 'o-gr', name: 'Grappling', cost: 'Artifact', branch: 'Unarmed Combat', character: 'oongka', description: 'Master Orc grappling techniques: Throw, Lariat, and Restrain.' },
  { id: 'o-bs', name: 'Body Slam', cost: 'Artifact', branch: 'Unarmed Combat', character: 'oongka', description: 'A full-body tackle that sends enemies sprawling.' },
  { id: 'o-cl', name: 'Clothesline', cost: 'Artifact', branch: 'Unarmed Combat', character: 'oongka', description: 'A running lariat that takes enemies off their feet.' },
  { id: 'o-dk', name: 'Dropkick', cost: 'Artifact', branch: 'Unarmed Combat', character: 'oongka', description: 'Launch forward and drive both feet into an enemy.' },
  { id: 'o-pk', name: 'Pump Kick', cost: 'Artifact', branch: 'Unarmed Combat', character: 'oongka', description: 'A fast pumping kick that pushes enemies back.' },
  { id: 'o-re', name: 'Restrain', cost: 'Artifact', branch: 'Unarmed Combat', character: 'oongka', description: 'Pin an enemy, preventing them from acting.' },
  // Evasion / Mobility
  { id: 'o-er', name: 'Evasive Roll', cost: 'Artifact', branch: 'Evasion', character: 'oongka', description: 'A quick evasive roll granting brief invincibility frames.' },
  { id: 'o-dj', name: 'Double Jump', cost: 'Artifact', branch: 'Evasion', character: 'oongka', description: 'A second mid-air jump for surprising vertical mobility from a giant Orc.' },
  { id: 'o-vt', name: 'Vault', cost: 'Artifact', branch: 'Evasion', character: 'oongka', description: 'Vault over an enemy, repositioning behind them.' },
  { id: 'o-vf', name: 'Vertical Flight', cost: 'Story', branch: 'Evasion', character: 'oongka', description: 'Aerial traversal using Oongka\'s jetpack. Unlocked through story progression.' },
  // Spirit Arts
  { id: 'o-pa', name: 'Parry', cost: 'Artifact', branch: 'Spirit Arts', character: 'oongka', description: 'Deflect incoming attacks with precise timing for a counterattack window.' },
  { id: 'o-fc', name: 'Focus', cost: 'Artifact', branch: 'Spirit Arts', character: 'oongka', description: 'Enter a focused combat state for increased precision.' },
  { id: 'o-ng', name: "Nature's Grasp", cost: 'Artifact', branch: 'Spirit Arts', character: 'oongka', description: 'Summon binding energy to immobilize a target.' },
  { id: 'o-ks', name: 'Keen Senses', cost: 'Artifact', branch: 'Spirit Arts', character: 'oongka', description: 'Heighten awareness to detect hidden enemies and avoid ambushes.' },
];

// ═══════════════════════════════════════
// RECOMMENDED BUILDS
// ═══════════════════════════════════════

export const RECOMMENDED_BUILDS: RecommendedBuild[] = [
  {
    id: 'build-abyssal-knight',
    name: 'Abyssal Knight',
    character: 'kliff',
    weapons: ['Iron Longsword', 'Greymane Shield'],
    keySkills: ['Sword Mastery', 'Shield Bash', 'Evasive Slash', 'Parry', 'Counter'],
    abyssCores: ['Defensive Core', 'Stability Core'],
    playstyle: 'Balanced melee fighter with strong defensive options. Focus on parrying, countering, and controlled aggression.',
    difficulty: 'intermediate',
    description: 'A well-rounded warrior build combining sword techniques with shield defense. Ideal for learning the game\'s combat rhythm and parry mechanics.',
  },
  {
    id: 'build-iron-fist',
    name: 'Iron Fist Monk',
    character: 'kliff',
    weapons: ['Axiom Bracelet'],
    keySkills: ['Unarmed Combat', 'Grappling', 'Pump Kick', 'Flying Kick', 'Body Slam'],
    abyssCores: ['Impact Core', 'Mobility Core'],
    playstyle: 'Aggressive close-range fighter using grapples and kicks. Highly mobile with crowd control.',
    difficulty: 'advanced',
    description: 'Master grappling and unarmed techniques for a unique martial arts style. Best for experienced players who can manage positioning.',
  },
  {
    id: 'build-standard-warrior',
    name: 'Standard Warrior',
    character: 'kliff',
    weapons: ['Steel Greatsword', 'Greymane Shield'],
    keySkills: ['Forward Slash', 'Turning Slash', 'Sword Flurry', 'Shield Bash', 'Charged Shot'],
    abyssCores: ['Strength Core', 'Stability Core'],
    playstyle: 'Straightforward heavy-hitting warrior. Strong offense with basic defense.',
    difficulty: 'beginner',
    description: 'The classic warrior archetype. Simple rotations and high damage make this perfect for new players learning the basics.',
  },
  {
    id: 'build-steel-rose',
    name: 'Steel Rose',
    character: 'damiane',
    weapons: ['Elegant Rapier', 'Dueling Pistol'],
    keySkills: ['Rapier Thrust', 'Quick Draw', 'Shadow Step', 'Blade Dance', 'Precision Shot'],
    abyssCores: ['Speed Core', 'Critical Core'],
    playstyle: 'Speedy hit-and-run tactics. High mobility and critical hit potential.',
    difficulty: 'intermediate',
    description: 'A stylish melee-ranged hybrid. Damiane\'s signature weapon combination for fast, elegant combat.',
  },
  {
    id: 'build-heavy-vanguard',
    name: 'Heavy Vanguard',
    character: 'damiane',
    weapons: ["Damiane's Claymore", 'Sharpshooter Musket'],
    keySkills: ['Claymore Sweep', 'Riposte', 'Explosive Round', 'Rapid Fire', 'Phase Dash'],
    abyssCores: ['Strength Core', 'Precision Core'],
    playstyle: 'Balanced melee-ranged fighter focusing on heavy hits and tactical repositioning.',
    difficulty: 'intermediate',
    description: 'Combine heavy melee swings with ranged support. Excellent for both single targets and groups.',
  },
  {
    id: 'build-gunslinger',
    name: 'Gunslinger',
    character: 'damiane',
    weapons: ['Dueling Pistol', 'Sharpshooter Musket'],
    keySkills: ['Quick Draw', 'Precision Shot', 'Rapid Fire', 'Dodge Roll', 'Smoke Screen'],
    abyssCores: ['Precision Core', 'Evasion Core'],
    playstyle: 'Pure ranged combat with exceptional mobility and evasion.',
    difficulty: 'advanced',
    description: 'For players who prefer staying at range. Demands careful positioning but offers great damage and safety.',
  },
  {
    id: 'build-siege-titan',
    name: 'Siege Titan',
    character: 'oongka',
    weapons: ["Oongka's Greataxe", 'Wrist Cannon'],
    keySkills: ['Cleave', 'Ground Shatter', 'Cannon Blast', 'Berserker Rage', 'Earthquake Slam'],
    abyssCores: ['Impact Core', 'Strength Core'],
    playstyle: 'Raw power and area-of-effect damage. Destroy everything.',
    difficulty: 'beginner',
    description: 'Oongka at his most powerful. Massive damage and crowd control make this build forgiving for beginners.',
  },
  {
    id: 'build-raging-berserker',
    name: 'Raging Berserker',
    character: 'oongka',
    weapons: ["Oongka's Greataxe", 'Balgran Shield'],
    keySkills: ['Berserker Rage', 'Spinning Axe', 'Ground Shatter', 'War Cry', 'Iron Skin'],
    abyssCores: ['Aggression Core', 'Endurance Core'],
    playstyle: 'Lean into aggression and defensive buffs. Tank and slaughter enemies.',
    difficulty: 'intermediate',
    description: 'A sustain-focused aggressive build. Use Berserker Rage and War Cry to dominate the battlefield.',
  },
];

// ═══════════════════════════════════════
// ABYSS ARTIFACTS
// ═══════════════════════════════════════

// 141 sealed Abyss Artifacts exist in-game. Only verified ones are listed below.
export const ABYSS_ARTIFACTS: AbyssArtifact[] = [
  { id: 'abyss-1', name: 'Sword of Trials I', region: 'hernand', location: 'Three Saints\' Falls', challengeType: 'Sealed Challenge' },
  { id: 'abyss-2', name: 'Shield of Unchanging Will I', region: 'hernand', location: 'Meandering Hills (north of Hernand Castle)', challengeType: 'Sealed Challenge' },
  { id: 'abyss-3', name: 'Shield of Unchanging Will II', region: 'delesyia', location: 'Kharonso roads', challengeType: 'Sealed Challenge' },
  { id: 'abyss-4', name: 'Shield of Unchanging Will IV', region: 'hernand', location: "Rocca's Hill", challengeType: 'Sealed Challenge' },
  { id: 'abyss-5', name: 'Sharpened Spear II', region: 'hernand', location: 'Red Greymane Shrine (southeast Hernand Castle)', challengeType: 'Sealed Challenge' },
  { id: 'abyss-6', name: 'Sharpened Spear V', region: 'pailune', location: 'Hills of No Return', challengeType: 'Sealed Challenge' },
  { id: 'abyss-7', name: 'Feather of the Earth', region: 'delesyia', location: 'Karin Quarry', challengeType: 'Sealed Challenge' },
  { id: 'abyss-8', name: 'Animal Meat', region: 'pailune', location: "The Sage's Peak", challengeType: 'Sealed Challenge' },
  { id: 'abyss-9', name: 'Night of the Silent Banner Pike', region: 'hernand', location: 'Anvil Riverside Terrace', challengeType: 'Sealed Challenge' },
  { id: 'abyss-10', name: 'Under a Starlit Sky', region: 'delesyia', location: 'Deepfog Basin', challengeType: 'Sealed Challenge' },
];

export const COLLECTIBLES: Record<CollectibleCategory, Collectible[]> = {
  artifact: [],
  gear: [],
  recipe: [],
  lore: [
    // Paintings (collectible home decorations)
    { name: 'Acclaimed - Prelude to War', location: 'Glenbright Manor', category: 'lore' },
    { name: 'Study - Golden Lands', location: 'Glenbright Manor', category: 'lore' },
    // Containers & Household Items
    { name: 'Liquor Bottle', location: 'Provisioner Shop / World', category: 'lore' },
    { name: 'Bread Plate', location: 'Provisioner Shop / World', category: 'lore' },
    { name: 'Deep Bowl', location: 'Provisioner Shop / World', category: 'lore' },
    { name: 'Grain Bowl', location: 'Provisioner Shop / World', category: 'lore' },
    { name: 'Storage Bowl', location: 'Provisioner Shop / World', category: 'lore' },
    { name: 'Damaged Bowl', location: 'Provisioner Shop / World', category: 'lore' },
    { name: 'Grain Jar', location: 'Provisioner Shop / World', category: 'lore' },
    { name: 'Pot', location: 'Provisioner Shop / World', category: 'lore' },
    // Lighting
    { name: 'Candle', location: 'Provisioner Shop / World', category: 'lore' },
    { name: 'Plain Candle', location: 'Provisioner Shop / World', category: 'lore' },
    { name: 'Icy White Glass Lamp', location: 'Provisioner Shop / World', category: 'lore' },
    { name: 'Twilight Glass Lamp', location: 'Provisioner Shop / World', category: 'lore' },
    // Misc
    { name: 'White-Handled Water Bottle', location: 'Provisioner Shop / World', category: 'lore' },
    // Dolls
    { name: 'Brown Dress Doll', location: 'Provisioner Shop / World', category: 'lore' },
    { name: 'Doll wearing Brown Bonnet', location: 'Provisioner Shop / World', category: 'lore' },
    { name: 'Simple Dress Doll', location: 'Provisioner Shop / World', category: 'lore' },
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
    { name: 'Grotevant Plate Set', location: 'PlayStation 5 Exclusive Bonus', category: 'edition' },
  ],
};

// ═══════════════════════════════════════
// BOSSES (24 verified + note about 76 total in Knowledge Codex)
// ═══════════════════════════════════════

// Data sourced: game8 / powerpyx / fextralife wikis (scraped 2026-03-20, launch+1 day)
// 76 total bosses in-game Knowledge System. ~30 confirmed below; remainder TBD post-exploration.
export const BOSSES: Boss[] = [
  // ─── STORY BOSSES (chapters 2–8) ──────────────────────────────────────────────────────────────
  // Ch.2 — first boss (tutorial); does NOT count toward the 76-boss Knowledge total
  { name: 'Matthias', region: 'hernand', type: 'Human', difficulty: 'normal',
    reward: 'Pump Kick x1', element: 'physical', weakness: 'physical',
    location: 'City of Hernand (town square)',
    mechanics: '2 HP bars. Tutorial boss. Light combos (3x R1) then heavy (3x R2) to interrupt. Easiest fight in the game.' },
  // Ch.2 — Goldleaf arc
  { name: 'Kailok the Hornsplitter', region: 'hernand', type: 'Humanoid', difficulty: 'hard',
    reward: 'Sword of the Lord, Seal of Greed - Goldleaf Merchant Guild, Iron Ore x7',
    element: 'physical', weakness: 'physical',
    location: 'Goldleaf Guildhouse, Hernand',
    mechanics: '1 HP bar. Shield counter (L1/LB at moment of attack — green glow = interrupt) then R1 combos. Blockable wide sword waves. Super armor (blue glow) = stop attacking and block/dodge. Drops Sword of the Lord.' },
  // Ch.3 — Reed field arc
  { name: 'Reed Devil', region: 'hernand', type: 'Humanoid', difficulty: 'extreme',
    reward: 'Hernandian Contribution EXP x600, Sunset Reed Cloth Gloves',
    element: 'physical', weakness: 'shock',
    location: 'Mountain of Frozen Souls (Frozen Soul Mountain), Hernand',
    mechanics: '3 HP bars. Phase 1: shield counters + R1 combos. Phase 2: destroy 5 totems while dodging. Phase 3: same as P1 but more aggressive; dodge sideways during red projectile dash. 40+ grilled meat + Palmer Pills recommended.' },
  // Ch.4 — Scholastone arc
  { name: 'Tenebrum', region: 'hernand', type: 'Spirit', difficulty: 'hard',
    reward: 'Key to the Spire of the Stars', element: 'abyss', weakness: 'physical',
    location: 'Scholastone Institute, Hernand',
    mechanics: 'Puzzle boss (no standard HP). Hold L1+R1 → press LB+RB → press RB (Blinding Flash) to expose weak point. Activate wings over floor gaps with double Square/X. Press R3/RS in midair for Force Palm. Recharge Spirit behind pillars.' },
  // Ch.5 — Hernand Castle
  { name: 'Kearush the Slayer', region: 'hernand', type: 'Monster', difficulty: 'legendary',
    reward: "The Grove's Thorn, Gale I, Howling of Chaos",
    element: 'physical', weakness: 'fire',
    location: 'Hernand Castle',
    mechanics: '3 HP bars. One of the hardest bosses. No blocking or parrying effective. P1: dodge forward-right behind boss → 3 quick R1 attacks → reset. P2: super armor (blue glow) → sprint to opposite arena wall where he cannot reach. P3: dodge constantly, attack in brief windows. Prep: plate armor refined to 4+, 4+ Health/Stamina upgrades, 100–200 grilled meat.' },
  // Ch.5 — Hills of No Return
  { name: 'Myurdin', region: 'hernand', type: 'Human', difficulty: 'hard',
    reward: 'Axiom Bracelet', element: 'physical', weakness: 'frost',
    location: 'Hills of No Return, Hernand',
    mechanics: 'Primary antagonist. Leader of Black Bear Forces. First encounter. Parry L1 → heavy R2 attacks.' },
  // Ch.5 — Crow's Nest (Abyss region); fought twice
  { name: 'Draven the Crowcaller', region: 'abyss', type: 'Humanoid', difficulty: 'extreme',
    reward: 'Blackwing Leather Armor, Blackwing Mask, Tauria Curved Sword',
    element: 'abyss', weakness: 'abyss',
    location: "Crow's Nest, The Abyss",
    mechanics: 'Fought twice. First encounter: 1 HP bar (easy). Second encounter (Ch.5 finale): 3 HP bars. Parry L1 → R1 combo → heal while attacking. Aerial dodge: wait for 2nd midair dodge, roll via Circle/B to dodge dive attack. Drops Tauria Curved Sword.' },
  // Ch.6 — Calphade arc
  { name: 'Cassius Morten', region: 'hernand', type: 'Human', difficulty: 'hard',
    reward: 'Shield of Betrayal', element: 'physical', weakness: 'physical',
    location: 'City of Calphade, Hernand',
    mechanics: '1 HP bar. Heavy shield user. Spam R2 heavy attacks; after 3 hits follow with light attacks. Heavy attacks deal damage through block. Recommended: Tauria Curved Sword + Nature\'s Echo skill.' },
  // Ch.7 — Pailune arc
  { name: 'Ludvig', region: 'pailune', type: 'Human', difficulty: 'hard',
    reward: 'Ignir (two-handed sword)', element: 'shock', weakness: 'physical',
    location: 'Pailune (quest: Lonely Jackals)',
    mechanics: '2 HP bars. Lightning user. Teleports constantly. Dodge > block/parry. Attack during combo gaps or after teleport stops. 100+ grilled meat.' },
  { name: 'Awakened Ludvig', region: 'pailune', type: 'Human', difficulty: 'extreme',
    reward: 'Unknown (TBD)', element: 'shock', weakness: 'physical',
    location: 'Pailune (continuation of Lonely Jackals)',
    mechanics: 'Empowered transformation. Consumes an imprisoned human to gain immense unholy power.' },
  { name: 'Lava Myurdin', region: 'pailune', type: 'Human', difficulty: 'legendary',
    reward: 'Melted Ambition, Pailunese Contribution EXP x3000',
    element: 'fire', weakness: 'frost',
    location: 'Ashclaw Keep, Pailune (Battle at Silverwolf Mountain)',
    mechanics: '2 HP bars. P1: parry L1 → heavy R2. P2: lava transformation — focus entirely on dodging, never let stamina deplete fully.' },
  // Ch.7 — Demeniss mountains (forced Oongka character)
  { name: 'One-Armed Ludvig', region: 'demeniss', type: 'Human', difficulty: 'hard',
    reward: 'Unknown (TBD)', element: 'shock', weakness: 'physical',
    location: 'Mountains of Demeniss (quest: Time to Face Justice)',
    mechanics: 'Forced Oongka play (no Kliff shield). Block/parry with weapon via L1/LB. Dual-wield one-handed weapons recommended. Sword of the Lord optimal for wave attacks. Prep: hunt animals nearby, cook at Beighen village.' },
  // Ch.8 — Demeniss campaign
  { name: 'Gregor the Halberd of Carnage', region: 'demeniss', type: 'Human', difficulty: 'hard',
    reward: 'Unknown (TBD)', element: 'physical', weakness: 'physical',
    location: 'Fort Ironclad, Demeniss (quest: Where the Wind Guides You)',
    mechanics: '1 HP bar. Arrows fired from walls throughout fight. Super armor with successive stabs — dodge continuously until it stops. Combat loop: dodge → attack → heal simultaneously.' },
  { name: 'Fortain the Cursed Knight', region: 'demeniss', type: 'Human', difficulty: 'extreme',
    reward: 'Unknown (TBD)', element: 'abyss', weakness: 'physical',
    location: 'Castle interior, Demeniss (quest: The Cursed Knight)',
    mechanics: '1 HP bar. Summons blue ghost knight (ground strikes + arrows). Spam R2 with Tauria Curved Sword. Nature\'s Echo skill recommended. Dodge away when ghost appears. "Gigantic warrior empowered by cursed warrior spirits."' },
  // Late game — The Abyss
  { name: 'Hexe Marie', region: 'abyss', type: 'Magical', difficulty: 'legendary',
    reward: 'Deep Abyss Core', element: 'abyss',
    location: 'The Abyss (connected to Reventine Monastery)',
    mechanics: 'Summons monsters. Grief-stricken dark sorcerer in despair over her slain child. Fully voice-acted. Infused dark power into her child.' },

  // ─── OPTIONAL / SIDE BOSSES ───────────────────────────────────────────────────────────────────
  { name: "Marni's Excavatron", region: 'hernand', type: 'Mechanical', difficulty: 'hard',
    reward: 'Gold Vein Map, Mining Knuckledrill (II)',
    element: 'physical', weakness: 'shock',
    location: 'Karin Quarry, Hernand (quest: Estate in Dismay)',
    mechanics: 'Hidden boss. Quarrying machine repurposed by Bleed Bandits. Wears diving suit; spinning drill arms.' },
  { name: 'Crimson Nightmare', region: 'hernand', type: 'Magical', difficulty: 'hard',
    reward: "Hernandian Contribution EXP x100, Freya's Elixir x1, Apollonia's Lesser Elixir x2, Meliara's Lesser Elixir x2",
    element: 'abyss', weakness: 'physical',
    location: 'Fort Perwin, Hernand (quest: Continuing Concern)' },
  { name: 'Saigord the Staglord', region: 'hernand', type: 'Humanoid', difficulty: 'legendary',
    reward: "Staglord's Shield", element: 'physical', weakness: 'abyss',
    location: 'Icemoor Castle Ruins, Hernand (quest: Lord Amidst the Ruins)',
    mechanics: '3 HP bars — among highest in game. Fallen king on forsaken throne. Sword and shield warlord of huge stature. Thinks challengers seek his treasure.' },
  { name: "Antumbra's Sword", region: 'hernand', type: 'Spirit', difficulty: 'extreme',
    reward: 'Abyss Artifact x1, Vessel of Dark Pursuit',
    element: 'abyss', weakness: 'physical',
    location: 'Sanctum of Absolution, Hernand (quest: Cloister of Ruination)',
    mechanics: 'Void spirit. Fitting judge of Antumbra\'s Order. Leader of the order.' },
  { name: 'Walter Lanford', region: 'hernand', type: 'Human', difficulty: 'extreme',
    reward: 'Unknown (TBD)', element: 'physical', weakness: 'frost',
    location: 'Alfonso Estate, Hernand',
    mechanics: 'Optional side quest. Exceptional double-barreled gun shooter.' },
  { name: 'Muskan', region: 'desert', type: 'Human', difficulty: 'extreme',
    reward: 'Unknown (TBD)', element: 'physical', weakness: 'physical',
    location: 'The Bonepit, Crimson Desert',
    mechanics: 'Arena fight with cheering onlookers. "Seemingly undefeated warrior of The Bonepit."' },

  // ─── PARTIALLY CONFIRMED (name known; full details TBD post-exploration) ──────────────────────
  { name: 'Queen Stoneback Crab', region: 'hernand', type: 'Beast', difficulty: 'hard',
    reward: 'Unknown (TBD)', element: 'physical', weakness: 'fire',
    location: 'Unknown (Hernand area)',
    mechanics: 'Enchanted gigantic crab. "Prism of riches." Target weak points for stagger. Awakened when Diederik strikes its carapace.' },
  { name: 'White Horn', region: 'pailune', type: 'Beast', difficulty: 'hard',
    reward: 'Unknown (TBD)', element: 'frost', weakness: 'fire',
    location: 'White Mountains, Pailune',
    mechanics: 'Multi-stage fight. Yeti/reindeer hybrid. Mountain spirit. Summons snowstorms and blizzards.' },
  { name: 'Golden Star', region: 'delesyia', type: 'Mechanical', difficulty: 'legendary',
    reward: 'Unknown (TBD)', element: 'shock', weakness: 'physical',
    location: 'Delesyian Territory',
    mechanics: 'Giant mechanical dragon with golden appearance. Fought while riding a Wyvern mount. Dragon\'s breath attack.' },
  { name: 'Snow Walker', region: 'pailune', type: 'Elemental', difficulty: 'extreme',
    reward: 'Unknown (TBD)', element: 'frost', weakness: 'fire',
    location: 'Pailune region',
    mechanics: 'Massive ice elemental. Ice attacks with charging and melee mix.' },
  { name: 'Gwen Kraber', region: 'demeniss', type: 'Human', difficulty: 'hard',
    reward: 'Spear (obtainable weapon)', element: 'physical', weakness: 'physical',
    location: 'Remote camp (exact location TBD)' },
  { name: 'Sir Catfish', region: 'desert', type: 'Beast', difficulty: 'normal',
    reward: 'Unknown (TBD)', element: 'physical', weakness: 'shock',
    location: 'Unknown — confirmed in in-game Boss Knowledge Menu' },
  { name: 'Titan', region: 'desert', type: 'Monster', difficulty: 'extreme',
    reward: 'Unknown (TBD)', element: 'shock', weakness: 'physical',
    location: 'Unknown',
    mechanics: 'Wields spear. Lightning attacks.' },
];

// Knowledge Codex contains 76 total named bosses. Above list contains 30 confirmed.
// Remaining ~46 bosses exist but are not yet fully documented post-launch.

// ═══════════════════════════════════════
// ENEMIES / BESTIARY
// ═══════════════════════════════════════

// Data sourced: Fextralife Enemies wiki (scraped 2026-03-20)
// Knowledge Codex contains 2,921 total entries; individual creature count TBD post-exploration.
export const ENEMIES: Enemy[] = [
  // ─── DUCHY OF HERNAND ─────────────────────────────────────────────────────────────────────────
  { name: "Hornsplitter's Guards", region: 'hernand', type: 'Humanoid', element: 'physical',
    location: 'Goldleaf Guildhouse, Hernand', drops: [],
    notes: 'The personal guard of Kailok the Hornsplitter, leader of the Goldleaf Merchant Guild.' },
  { name: "St. Halssius's House of Healing", region: 'hernand', type: 'Humanoid', element: 'physical',
    location: 'Halssius Apothecary / Halssius Conflux, Hernand', drops: [],
    notes: 'A House of Healing once dedicated to treating mental illness. Now corrupted.' },
  { name: 'Fundamentalist Goblins', region: 'hernand', type: 'Monster', element: 'physical',
    location: 'Various locations, Hernand', drops: [],
    notes: 'A band of goblin scholars scarcely different from common thieves.' },
  { name: 'Bleed Bandits', region: 'hernand', type: 'Human', element: 'physical',
    location: 'Various locations, Hernand', drops: [],
    notes: 'An armed faction that has plunged Hernand into fear. Their influence spread all across Hernand with alarming speed.' },
  { name: 'Wolf Trackers', region: 'hernand', type: 'Human', element: 'physical',
    location: 'Pywel — roaming', drops: [],
    notes: 'A roaming band that scours Pywel in search of prey.' },
  { name: 'Reed Devil Faction', region: 'hernand', type: 'Humanoid', element: 'physical',
    location: 'Mountain of Frozen Souls (Frozen Soul Mountain), Hernand', drops: [],
    notes: 'The faction of the Reed Field. Demon of the reed fields.' },
  { name: 'Southern Bandits', region: 'hernand', type: 'Human', element: 'physical',
    location: 'Southern Pywel', drops: [],
    notes: 'Bandits who threaten the southern reaches of Pywel. They mainly target merchants and travelers, ambushing and plundering them.' },
  // ─── TRIBAL STATE OF PAILUNE ──────────────────────────────────────────────────────────────────
  { name: 'Black Bears', region: 'pailune', type: 'Human', element: 'physical',
    location: 'Pailune (various strongholds); Hernand (occupied territory)', drops: [],
    notes: 'A hostile faction led by the formidable Myurdin. Conquered Pailune and drove out the Greymanes.' },
  // ─── FACTIONS / ENEMY GROUPS (additional — TBD with full bestiary post-launch) ───────────────
  { name: 'Crow Brothers', region: 'abyss', type: 'Humanoid', element: 'abyss',
    location: "Crow's Nest, The Abyss", drops: [],
    notes: "Led by Draven the Crowcaller. Sought to let evil souls out of the sealed Heaven's Gate." },
  { name: "Antumbra's Order", region: 'hernand', type: 'Spirit', element: 'abyss',
    location: 'Sanctum of Absolution and surrounding sanctums, Hernand', drops: [],
    notes: 'Void spirits serving Antumbra\'s Sword as their judge. Control six sanctums across Hernand.' },
  { name: 'Gregor\'s Soldiers', region: 'demeniss', type: 'Human', element: 'physical',
    location: 'Fort Ironclad, Demeniss', drops: [],
    notes: "Captain Gregor's personal military unit stationed at Fort Ironclad." },
  { name: 'Scarlet Blades', region: 'hernand', type: 'Human', element: 'physical',
    location: 'Various, Hernand', drops: [],
    notes: 'Bandit or mercenary faction. Drops Scarlet Blades Cloth Armor.' },
  { name: 'Jackals', region: 'hernand', type: 'Human', element: 'physical',
    location: 'Various, Hernand', drops: [],
    notes: 'Outlaw faction. Drops Jackals\' Leather Armor and Jackals\' Leather Helm.' },
];

// ═══════════════════════════════════════
// QUESTS (Main Story + Side Quests)
// ═══════════════════════════════════════

// Data sourced: game8 Crimson Desert wiki (scraped 2026-03-20). 430 total quests confirmed in-game.
// Main story: 12 chapters + prologue + epilogue. Individual sub-quest names confirmed from game8.
export const QUESTS: Quest[] = [
  // ─── PROLOGUE ─────────────────────────────────────────────────────────────────────────────────
  { name: 'Dead of the Night', description: 'Prologue that opens the game.', type: 'main', region: 'hernand' },
  { name: 'Unfamiliar Lands', description: 'Prologue sub-quest: Ambush arc.', type: 'main', region: 'hernand' },
  { name: 'In Ashes', description: 'Prologue sub-quest: Ambush arc.', type: 'main', region: 'hernand' },
  { name: 'Realm of Uncertainty', description: 'Prologue sub-quest: Unknown Space arc — introduction to The Abyss.', type: 'main', region: 'abyss' },
  { name: 'New Journey', description: 'Prologue sub-quest: Unknown Space arc.', type: 'main', region: 'hernand' },

  // ─── CHAPTER 1: THE FIRST ENCOUNTER ──────────────────────────────────────────────────────────
  // Trials of Kindness arc
  { name: 'Where Rumors Gather', description: 'Ch.1 — Trials of Kindness: Follow rumors in Hernand.', type: 'main', region: 'hernand' },
  { name: 'Mysterious Man', description: 'Ch.1 — Trials of Kindness: Investigate a stranger.', type: 'main', region: 'hernand' },
  { name: 'True Wisdom in Kindness', description: 'Ch.1 — Trials of Kindness.', type: 'main', region: 'hernand' },
  { name: 'Actions Speak Louder than Words', description: 'Ch.1 — Trials of Kindness.', type: 'main', region: 'hernand' },
  { name: 'Heart Beyond Borders', description: 'Ch.1 — Trials of Kindness. Rewards Engraved Key and Shai\'s Pendant.', type: 'main', region: 'hernand' },
  // Trace arc
  { name: 'Mystical Key', description: 'Ch.1 — Trace arc: Investigate Abyss mysteries.', type: 'main', region: 'abyss' },
  { name: 'Polar Opposites', description: 'Ch.1 — Trace arc.', type: 'main', region: 'abyss' },
  { name: 'Abyss without Balance', description: 'Ch.1 — Trace arc.', type: 'main', region: 'abyss' },
  { name: 'Woman in White', description: 'Ch.1 — Trace arc: Encounter the White Crow.', type: 'main', region: 'abyss' },

  // ─── CHAPTER 2: GOLDEN GREED ──────────────────────────────────────────────────────────────────
  // Unexpected Gift arc
  { name: 'Where the Light Leads', description: 'Ch.2 — Unexpected Gift arc.', type: 'main', region: 'hernand' },
  { name: 'Memory Fragment', description: 'Ch.2 — Unexpected Gift arc.', type: 'main', region: 'hernand' },
  { name: 'Reunion', description: 'Ch.2 — Unexpected Gift arc.', type: 'main', region: 'hernand' },
  // Hernand in Chaos arc
  { name: 'For Honor', description: 'Ch.2 — Hernand in Chaos: Boss fight vs. Matthias.', type: 'main', region: 'hernand', rewards: ['Pump Kick x1'] },
  { name: 'Awestruck', description: 'Ch.2 — Hernand in Chaos arc.', type: 'main', region: 'hernand' },
  { name: 'Shadow Cast Over the River', description: 'Ch.2 — Hernand in Chaos arc.', type: 'main', region: 'hernand' },
  { name: 'Where Misery Gathers', description: 'Ch.2 — Hernand in Chaos arc.', type: 'main', region: 'hernand' },
  { name: 'Trial After Trial', description: 'Ch.2 — Hernand in Chaos arc.', type: 'main', region: 'hernand' },
  { name: 'The Man Trapped in the Mire', description: 'Ch.2 — Hernand in Chaos arc.', type: 'main', region: 'hernand' },
  { name: 'Missing Companion', description: 'Ch.2 — Hernand in Chaos arc.', type: 'main', region: 'hernand' },
  { name: 'Secrets Hidden in the Dark', description: 'Ch.2 — Hernand in Chaos arc.', type: 'main', region: 'hernand' },
  // The End of Greed arc
  { name: 'The Dark Veil', description: 'Ch.2 — The End of Greed arc.', type: 'main', region: 'hernand' },
  { name: 'The Flames of Greed', description: 'Ch.2 — The End of Greed arc.', type: 'main', region: 'hernand' },
  { name: 'Kidnapped Healer', description: 'Ch.2 — The End of Greed arc.', type: 'main', region: 'hernand' },
  { name: 'Rebellion or Revolution', description: 'Ch.2 — The End of Greed arc.', type: 'main', region: 'hernand' },
  { name: 'Cheers Echoing From the Edge', description: 'Ch.2 — The End of Greed: Boss fight vs. Kailok the Hornsplitter.', type: 'main', region: 'hernand', rewards: ['Sword of the Lord', 'Seal of Greed - Goldleaf Merchant Guild', 'Iron Ore x7'] },

  // ─── CHAPTER 3: HOWLING HILL ──────────────────────────────────────────────────────────────────
  // Homestead arc
  { name: 'Old Friend', description: 'Ch.3 — Homestead arc.', type: 'main', region: 'hernand' },
  { name: 'First Step to Rebuilding', description: 'Ch.3 — Homestead arc: Establish Greymane Camp.', type: 'main', region: 'hernand' },
  { name: 'A Fresh Start', description: 'Ch.3 — Homestead arc: Unlock Camp feature.', type: 'main', region: 'hernand' },
  { name: 'Reward for Their Sweat', description: 'Ch.3 — Homestead arc.', type: 'main', region: 'hernand' },
  { name: 'Return of the Comrade', description: 'Ch.3 — Homestead arc.', type: 'main', region: 'hernand' },
  { name: 'Familiar Curses', description: 'Ch.3 — Homestead arc.', type: 'main', region: 'hernand' },
  // The Face Behind the Mask arc
  { name: 'Return', description: 'Ch.3 — The Face Behind the Mask arc.', type: 'main', region: 'hernand' },
  { name: 'Traces in the Manor', description: 'Ch.3 — The Face Behind the Mask arc.', type: 'main', region: 'hernand' },
  { name: 'Nonhuman', description: 'Ch.3 — The Face Behind the Mask arc.', type: 'main', region: 'hernand' },
  { name: 'Seed of Unease', description: 'Ch.3 — The Face Behind the Mask arc.', type: 'main', region: 'hernand' },
  { name: 'Dance with the Devil', description: 'Ch.3 — The Face Behind the Mask: Boss fight vs. Reed Devil (Phase 1).', type: 'main', region: 'hernand' },
  { name: 'The Face Behind the Mask', description: 'Ch.3 — Boss fight vs. Reed Devil (full encounter).', type: 'main', region: 'hernand', rewards: ['Hernandian Contribution EXP x600', 'Sunset Reed Cloth Gloves'] },
  // Pioneering arc
  { name: 'Hope After the Draught', description: 'Ch.3 — Pioneering arc.', type: 'main', region: 'hernand' },
  { name: 'Scattered Comrades', description: 'Ch.3 — Pioneering arc.', type: 'main', region: 'hernand' },
  { name: 'Rumors from the Sawmill', description: 'Ch.3 — Pioneering arc.', type: 'main', region: 'hernand' },
  { name: 'A Gentle Touch', description: 'Ch.3 — Pioneering arc.', type: 'main', region: 'hernand' },
  { name: 'Bustling Hill', description: 'Ch.3 — Pioneering arc.', type: 'main', region: 'hernand' },
  { name: 'Greymanes Reunited', description: 'Ch.3 — Pioneering arc: Reunite Greymane members.', type: 'main', region: 'hernand' },

  // ─── CHAPTER 4: THE PRICE OF KNOWLEDGE ───────────────────────────────────────────────────────
  { name: 'The Mysterious Pot', description: 'Ch.4 — Mysterious Iron Pot arc: Find the Kuku Pot crafting item.', type: 'main', region: 'hernand' },
  { name: 'Kilnden Workshop', description: 'Ch.4 — Mysterious Iron Pot arc: Visit the Kilnden Workshop.', type: 'main', region: 'hernand' },
  { name: 'Kiln Repair in the Kilnden Workshop', description: 'Ch.4 — Mysterious Iron Pot arc.', type: 'main', region: 'hernand' },
  { name: "The Pot's Use", description: 'Ch.4 — Mysterious Iron Pot arc.', type: 'main', region: 'hernand' },
  { name: 'Disturbance at the Arena', description: 'Ch.4 — Daily Life arc: Arena disturbance in Hernand.', type: 'main', region: 'hernand' },
  { name: 'Skilled in Archery', description: 'Ch.4 — Daily Life arc.', type: 'main', region: 'hernand' },
  // Forbidden Knowledge arc
  { name: 'The Words of Alustin', description: 'Ch.4 — Forbidden Knowledge: Begin the Abyss/Scholastone investigation.', type: 'main', region: 'hernand' },
  { name: 'Scholastone', description: 'Ch.4 — Forbidden Knowledge arc.', type: 'main', region: 'hernand' },
  { name: 'On the Right Path', description: 'Ch.4 — Forbidden Knowledge arc.', type: 'main', region: 'hernand' },
  { name: 'Gate to the Otherworld', description: 'Ch.4 — Forbidden Knowledge: Boss fight vs. Tenebrum.', type: 'main', region: 'hernand', rewards: ['Key to the Spire of the Stars'] },
  { name: 'Spire of the Stars', description: 'Ch.4 — Forbidden Knowledge arc.', type: 'main', region: 'hernand' },
  { name: 'Obsession and Madness', description: 'Ch.4 — Forbidden Knowledge arc.', type: 'main', region: 'hernand' },
  { name: 'Casted Shadow', description: 'Ch.4 — Forbidden Knowledge arc.', type: 'main', region: 'hernand' },

  // ─── CHAPTER 5: GUEST UNBIDDEN ────────────────────────────────────────────────────────────────
  // Uninvited Guest arc
  { name: 'Double-sided Invitation', description: 'Ch.5 — Uninvited Guest arc.', type: 'main', region: 'hernand' },
  { name: 'Unwelcomed Guests', description: 'Ch.5 — Uninvited Guest arc.', type: 'main', region: 'hernand' },
  { name: 'Demenissian Delegation', description: 'Ch.5 — Uninvited Guest: Boss fight vs. Kearush the Slayer.', type: 'main', region: 'hernand', rewards: ["The Grove's Thorn", 'Gale I', 'Howling of Chaos'] },
  { name: 'Exposed Plot', description: 'Ch.5 — Uninvited Guest arc.', type: 'main', region: 'hernand' },
  // Black and White arc
  { name: 'The Missing Seal', description: 'Ch.5 — Black and White arc.', type: 'main', region: 'abyss' },
  { name: 'Crowcaller', description: 'Ch.5 — Black and White: Encounter Draven (first fight).', type: 'main', region: 'abyss' },
  { name: "The Crow's Warning", description: 'Ch.5 — Black and White arc.', type: 'main', region: 'abyss' },
  { name: 'Bloodwind', description: 'Ch.5 — Black and White: Boss fight vs. Crowcaller (second fight, 3 HP bars).', type: 'main', region: 'abyss', rewards: ['Blackwing Leather Armor', 'Blackwing Mask', 'Tauria Curved Sword'] },
  { name: 'Secret at the Church', description: 'Ch.5 — Black and White arc.', type: 'main', region: 'abyss' },
  { name: 'Toward the Nest', description: 'Ch.5 — Black and White arc: Conclusion of Crow\'s Nest arc.', type: 'main', region: 'abyss' },

  // ─── CHAPTER 6: CRACKS IN THE SHIELD ─────────────────────────────────────────────────────────
  { name: 'News', description: 'Ch.6 — Blazing Beacon arc.', type: 'main', region: 'hernand' },
  { name: 'To the Battlefield', description: 'Ch.6 — Blazing Beacon arc.', type: 'main', region: 'hernand' },
  { name: 'The Counterattack', description: 'Ch.6 — Blazing Beacon arc (also appears in Ch.7).', type: 'main', region: 'hernand' },
  { name: 'Cradle of Defense', description: 'Ch.6 — Below the Banners arc.', type: 'main', region: 'hernand' },
  { name: 'Hand of Deliverance', description: 'Ch.6 — Below the Banners arc.', type: 'main', region: 'hernand' },
  { name: 'Fire on the Frontlines', description: 'Ch.6 — Below the Banners arc.', type: 'main', region: 'hernand' },
  { name: 'Fire Support', description: 'Ch.6 — Turning Tides arc.', type: 'main', region: 'hernand' },
  { name: 'Hidden Fangs', description: 'Ch.6 — Turning Tides arc.', type: 'main', region: 'hernand' },
  { name: 'Reclamation', description: 'Ch.6 — Turning Tides arc (also appears in Ch.7).', type: 'main', region: 'hernand' },
  { name: 'A Thousand Troops', description: 'Ch.6 — The Unyielding Shields arc.', type: 'main', region: 'hernand' },
  { name: 'Traitor', description: 'Ch.6 — The Unyielding Shields: Boss fight vs. Cassius Morten.', type: 'main', region: 'hernand', rewards: ['Shield of Betrayal'] },
  { name: 'All Quiet on the Front', description: 'Ch.6 — The Unyielding Shields arc.', type: 'main', region: 'hernand' },
  { name: 'News of Victory', description: 'Ch.6 — The Unyielding Shields arc.', type: 'main', region: 'hernand' },
  { name: 'Return Home', description: 'Ch.6 — The Unyielding Shields arc: Chapter conclusion.', type: 'main', region: 'hernand' },

  // ─── CHAPTER 7: HOMECOMING ────────────────────────────────────────────────────────────────────
  // Morning Mist arc
  { name: 'Ashes of Treachery', description: 'Ch.7 — Morning Mist arc.', type: 'main', region: 'pailune' },
  { name: 'Trust Lost', description: 'Ch.7 — Morning Mist arc.', type: 'main', region: 'pailune' },
  { name: 'Bared Fang', description: 'Ch.7 — Morning Mist arc.', type: 'main', region: 'pailune' },
  { name: 'Rekindle Hope', description: 'Ch.7 — Morning Mist arc.', type: 'main', region: 'pailune' },
  { name: 'Podium of Resolve', description: 'Ch.7 — Morning Mist arc.', type: 'main', region: 'pailune' },
  // Dawn arc
  { name: 'Shadows Over Pailune', description: 'Ch.7 — Dawn arc.', type: 'main', region: 'pailune' },
  { name: 'Driving out the Shadows', description: 'Ch.7 — Dawn arc.', type: 'main', region: 'pailune' },
  { name: 'Lurking Wolves', description: 'Ch.7 — Dawn arc.', type: 'main', region: 'pailune' },
  { name: 'Lonely Jackals', description: 'Ch.7 — Dawn: Boss fight vs. Ludvig and Awakened Ludvig.', type: 'main', region: 'pailune' },
  { name: 'Resolution', description: 'Ch.7 — Dawn arc conclusion.', type: 'main', region: 'pailune' },
  // Decisive Battle arc
  { name: 'Unleashed Fury', description: 'Ch.7 — Decisive Battle arc.', type: 'main', region: 'pailune' },
  { name: 'The Final Bridge', description: 'Ch.7 — Decisive Battle arc.', type: 'main', region: 'pailune' },
  { name: 'Broken Claws', description: 'Ch.7 — Decisive Battle arc.', type: 'main', region: 'pailune' },
  { name: 'Battle at the Silver Wolf Mountain', description: 'Ch.7 — Decisive Battle: Boss fight vs. Lava Myurdin.', type: 'main', region: 'pailune', rewards: ['Melted Ambition', 'Pailunese Contribution EXP x3000'] },
  { name: 'Incomplete Victory', description: 'Ch.7 — Decisive Battle arc conclusion.', type: 'main', region: 'pailune' },
  // Twisted Fate arc
  { name: "Ludvig's Whereabouts", description: 'Ch.7 — Twisted Fate arc: Track the surviving Ludvig.', type: 'main', region: 'demeniss' },
  { name: 'Time to Face Justice', description: 'Ch.7 — Twisted Fate: Boss fight vs. One-Armed Ludvig (forced Oongka).', type: 'main', region: 'demeniss' },

  // ─── CHAPTER 8: BLOOD CORONATION ─────────────────────────────────────────────────────────────
  { name: 'Healing Pailune', description: 'Ch.8 — Ashen Steps arc: Recover from war in Pailune.', type: 'main', region: 'pailune' },
  { name: 'The Weight of Command', description: 'Ch.8 — Ashen Steps arc.', type: 'main', region: 'pailune' },
  // To Demeniss arc
  { name: 'The Road to Demeniss', description: 'Ch.8 — To Demeniss arc: Travel to the capital.', type: 'main', region: 'demeniss' },
  { name: 'Where the Wind Guides You', description: 'Ch.8 — To Demeniss: Boss fight vs. Gregor the Halberd of Carnage.', type: 'main', region: 'demeniss' },
  { name: 'The Cursed Knight', description: 'Ch.8 — To Demeniss: Boss fight vs. Fortain the Cursed Knight.', type: 'main', region: 'demeniss' },
  { name: 'Cracks in Loyalty', description: 'Ch.8 — Traitor arc: Uncover betrayal within allied ranks.', type: 'main', region: 'demeniss' },
  { name: 'Blood Coronation', description: 'Ch.8 — Traitor arc: Chapter conclusion with dramatic political upheaval.', type: 'main', region: 'demeniss' },

  // ─── CHAPTER 9: THE SAGE OF THE DESERT ──────────────────────────────────────────────────────
  { name: 'Into the Red Sands', description: 'Ch.9 — Journey into the Crimson Desert for the first time.', type: 'main', region: 'desert' },
  { name: 'The Sage of the Desert', description: 'Ch.9 — Seek enlightenment from a desert hermit.', type: 'main', region: 'desert' },
  { name: 'Trial of the Sands', description: 'Ch.9 — Spiritual trial in the desert wastes.', type: 'main', region: 'desert' },
  { name: 'Echoes Beneath the Dunes', description: 'Ch.9 — Discover ancient secrets buried under the desert.', type: 'main', region: 'desert' },

  // ─── CHAPTER 10: COUNTERATTACK ──────────────────────────────────────────────────────────────
  { name: 'Rally the Banners', description: 'Ch.10 — Unite all allied factions for war.', type: 'main', region: 'hernand' },
  { name: 'The War Council', description: 'Ch.10 — Strategic planning session.', type: 'main', region: 'hernand' },
  { name: 'Siege of the Black Fortress', description: 'Ch.10 — Large-scale battle against Black Bear stronghold.', type: 'main', region: 'pailune' },
  { name: 'Breaking the Line', description: 'Ch.10 — Push through enemy defenses.', type: 'main', region: 'pailune' },

  // ─── CHAPTER 11: TRUTH AND REALITY ──────────────────────────────────────────────────────────
  { name: 'Shattered Illusions', description: 'Ch.11 — Revelations about the Abyss and Pywel.', type: 'main', region: 'abyss' },
  { name: 'The Price of Truth', description: 'Ch.11 — Confrontation with hidden forces.', type: 'main', region: 'abyss' },
  { name: 'Wings of Defiance', description: 'Ch.11 — Unlock Blackstar Dragon mount.', type: 'main', region: 'abyss' },

  // ─── CHAPTER 12: THE ABYSS ─────────────────────────────────────────────────────────────────
  { name: 'Descent into Providence', description: 'Ch.12 — Enter the final Abyss dimension.', type: 'main', region: 'abyss' },
  { name: 'Closing the Rifts', description: "Ch.12 — Fulfill Gian's final wish by sealing the Rifts.", type: 'main', region: 'abyss' },
  { name: 'The Final Stand', description: 'Ch.12 — Final boss encounter vs. Hexe Marie.', type: 'main', region: 'abyss', rewards: ['Deep Abyss Core'] },

  // ─── EPILOGUE ───────────────────────────────────────────────────────────────────────────────
  { name: "Journey's End", description: 'Epilogue: Post-game resolution. The fate of the Greymanes and Pywel.', type: 'main', region: 'hernand' },

  // ─── FACTION QUESTS ───────────────────────────────────────────────────────────────────────────
  // Greymanes — Scattered Embers
  { name: 'Record of the Greymanes', description: 'Greymane faction: Document the mercenary company\'s history.', type: 'faction', region: 'hernand' },
  { name: "The Greymanes' New Fangs", description: 'Greymane faction: Recruit new members.', type: 'faction', region: 'hernand' },
  { name: 'Strongbox with Wheels', description: 'Greymane faction.', type: 'faction', region: 'hernand' },
  { name: 'Brightening the Spirits', description: 'Greymane faction.', type: 'faction', region: 'hernand' },
  { name: 'Change to Make a Fortune', description: 'Greymane faction.', type: 'faction', region: 'hernand' },
  { name: 'The First Steps of Little Marksmen', description: 'Greymane faction.', type: 'faction', region: 'hernand' },
  { name: 'Words Left by the Riverside', description: 'Greymane faction.', type: 'faction', region: 'hernand' },
  { name: 'Embers of Return', description: 'Greymane faction — Grounds of the Sunrise arc.', type: 'faction', region: 'hernand' },
  { name: 'A Rumor in Ivynook', description: 'Greymane faction — Grounds of the Sunrise arc.', type: 'faction', region: 'hernand' },
  { name: 'For a Better Tomorrow', description: 'Greymane faction — Grounds of the Sunrise arc.', type: 'faction', region: 'hernand' },
  // House Celeste bounties (8 total)
  { name: 'Outlaws in Hernand — Jeffrey', description: 'House Celeste bounty: Capture Jeffrey.', type: 'faction', region: 'hernand' },
  { name: 'Outlaws in Hernand — Simon de Montfort', description: 'House Celeste bounty.', type: 'faction', region: 'hernand' },
  { name: 'Outlaws in Hernand — Alessio', description: 'House Celeste bounty.', type: 'faction', region: 'hernand' },
  { name: 'Outlaws in Hernand — Blix', description: 'House Celeste bounty.', type: 'faction', region: 'hernand' },
  { name: 'Outlaws in Hernand — Bianca', description: 'House Celeste bounty.', type: 'faction', region: 'hernand' },
  { name: 'Outlaws in Hernand — Salvatore', description: 'House Celeste bounty.', type: 'faction', region: 'hernand' },
  { name: 'Outlaws in Hernand — Warren', description: 'House Celeste bounty.', type: 'faction', region: 'hernand' },
  { name: 'Outlaws in Hernand — Billy', description: 'House Celeste bounty.', type: 'faction', region: 'hernand' },
  // House Roberts
  { name: 'First Trial of Trust', description: 'House Roberts faction quest — Bluemont Manor.', type: 'faction', region: 'hernand' },
  { name: 'Troubled Count', description: 'House Roberts faction quest.', type: 'faction', region: 'hernand' },
  { name: 'Stolen Quarry', description: 'House Roberts faction quest.', type: 'faction', region: 'hernand' },
  { name: 'Sealed in Stone', description: 'House Roberts faction quest.', type: 'faction', region: 'hernand' },
  { name: "The Count's Honor", description: 'House Roberts faction quest.', type: 'faction', region: 'hernand' },
  { name: 'Strange Red Smoke', description: 'House Roberts faction quest.', type: 'faction', region: 'hernand' },
  { name: 'The Crimson Nightmare', description: 'House Roberts faction quest: Triggers Crimson Nightmare boss encounter.', type: 'faction', region: 'hernand' },
  { name: 'Veil of the Red Smoke', description: 'House Roberts faction quest conclusion.', type: 'faction', region: 'hernand' },
  // Antumbra Order (sanctum chain)
  { name: 'Sanctum of Temperance', description: 'Antumbra Order: Clear the Sanctum of Temperance.', type: 'faction', region: 'hernand' },
  { name: 'Sanctum of Penitence', description: "Antumbra Order: Clear the Sanctum of Penitence.", type: 'faction', region: 'hernand' },
  { name: 'Sanctum of Benediction', description: 'Antumbra Order: Clear the Sanctum of Benediction.', type: 'faction', region: 'hernand' },
  { name: "Antumbra's Sword", description: "Antumbra Order: Final boss fight vs. Antumbra's Sword.", type: 'faction', region: 'hernand', rewards: ['Abyss Artifact x1', 'Vessel of Dark Pursuit'] },
  // Pailune Militia
  { name: 'Shadows of Beasts', description: 'Pailune Militia faction quest.', type: 'faction', region: 'pailune' },
  { name: 'Lord of the Forgotten Castle', description: 'Pailune Militia: Boss fight vs. Saigord the Staglord.', type: 'faction', region: 'hernand', rewards: ["Staglord's Shield"] },
  // Beighen Tribe
  { name: 'The Frostwarden', description: 'Beighen Tribe faction quest — Pailune area.', type: 'faction', region: 'pailune' },
  // Witches
  { name: 'The Witch of Wisdom', description: 'Witches faction quest.', type: 'faction', region: 'hernand' },
  // Goldleaf Merchant Guild
  { name: 'Extinguishing the Last Flames', description: 'Goldleaf Merchant Guild faction quest.', type: 'faction', region: 'hernand' },
  // Pororin Forest Guardians
  { name: 'The Unreachable Village', description: 'Pororin Forest Guardians faction quest.', type: 'faction', region: 'hernand' },
  // House Serkis
  { name: 'Remaining Chains', description: 'House Serkis faction quest — Oakenshield Manor.', type: 'faction', region: 'hernand' },

  // ─── SIDE / REQUEST QUESTS (sample — 430 total quests; full list TBD post-launch) ─────────────
  { name: 'Estate in Dismay', description: 'Side: Triggers Marni\'s Excavatron hidden boss at Karin Quarry.', type: 'side', region: 'hernand', rewards: ['Gold Vein Map', 'Mining Knuckledrill (II)'] },
  { name: 'Continuing Concern', description: 'Side: Triggers Crimson Nightmare boss at Fort Perwin.', type: 'side', region: 'hernand', rewards: ["Hernandian Contribution EXP x100", "Freya's Elixir x1"] },
  { name: 'Cloister of Ruination', description: "Side: Triggers Antumbra's Sword boss at Sanctum of Absolution.", type: 'side', region: 'hernand' },
  { name: 'Savior on the Road', description: 'Hernand Request — Tales from the Corners.', type: 'side', region: 'hernand' },
  { name: 'Woodcutter in Peril', description: 'Hernand Request — Tales from the Corners.', type: 'side', region: 'hernand' },
  { name: 'Path Crossing the River', description: 'Hernand Request — A Favor for Hernand.', type: 'side', region: 'hernand' },
  { name: 'Goddess of Abundance', description: 'Hernand Request — A Favor for Hernand.', type: 'side', region: 'hernand' },
  { name: 'Wolf Protecting Hernand', description: 'Hernand Request — A Favor for Hernand.', type: 'side', region: 'hernand' },
];

// ═══════════════════════════════════════
// WEAPONS
// ═══════════════════════════════════════

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
  { name: 'Broken Spear', icon: '🔨', iconKey: 'polearm', type: 'Polearm', atk: 50, spd: 55, rng: 50, character: 'kliff', description: 'Overpowered early-game weapon with Evasive Slash counter.' },
  { name: 'Sword of the Wolf', icon: '⚔', iconKey: 'sword', type: 'Sword', atk: 25, spd: 65, rng: 30, character: 'kliff', description: "Kliff's starting weapon. Basic but reliable." },
  { name: 'Fated Shadow', icon: '⚔', iconKey: 'sword', type: 'Sword', atk: 85, spd: 70, rng: 30, character: 'kliff', description: 'Found in Ch.9 dead-end room adjacent to boss Goyen arena. Highest starting ATK of any sword. Comes with Greysoul Howling Abyss Core (adds strikes to Turning Slash).' },
  { name: 'Tauria Curved Sword', icon: '⚔', iconKey: 'sword', type: 'Curved Sword', atk: 72, spd: 75, rng: 28, character: 'kliff', description: "Dropped by Draven the Crowcaller (Boss #6). Comes with Crow's Pursuit Abyss Core (adds ranged projectiles to heavy strikes)." },
  { name: 'Ignir Sword', icon: '⚔', iconKey: 'sword', type: 'Sword', atk: 80, spd: 65, rng: 30, character: 'kliff', description: 'Best boss weapon. Upgradeable to 45 base ATK. 5 Abyss Core sockets. Dropped by Ludvig.' },
  { name: 'Axiom Bracelet', icon: '👊', iconKey: 'unarmed', type: 'Unarmed', atk: 65, spd: 75, rng: 15, character: 'kliff', description: 'Legendary unarmed weapon. Dropped by Myurdin.' },
  { name: 'Sword of the Lord', icon: '⚔', iconKey: 'sword', type: 'Sword', atk: 75, spd: 70, rng: 30, character: 'kliff', description: 'Dropped by Kailok the Hornsplitter.' },
  { name: "The Grove's Thorn", icon: '⚔', iconKey: 'sword', type: 'Sword', atk: 78, spd: 68, rng: 30, character: 'kliff', description: 'Dropped by Kearush the Slayer. Chapter 5 reward.' },
  { name: 'Glenmore Sword', icon: '⚔', iconKey: 'sword', type: 'Sword', atk: 35, spd: 65, rng: 30, character: 'kliff', description: 'Basic crafted sword from One-Handed Weapons Vol. I.' },
  { name: 'White Wood Bow', icon: '🏹', iconKey: 'bow', type: 'Bow', atk: 30, spd: 55, rng: 90, character: 'kliff', description: 'Basic crafted bow from Bows Vol. I.' },
  { name: 'Thalwynd Longsword', icon: '⚔', iconKey: 'sword', type: 'Greatsword', atk: 55, spd: 35, rng: 40, character: 'kliff', description: 'Two-handed sword crafted from Two-Handed Weapons Vol. II.' },
  { name: 'Medium Staglord Banner Pike', icon: '🔨', iconKey: 'polearm', type: 'Two-Handed Polearm', atk: 75, spd: 40, rng: 50, character: 'kliff', description: 'Highest ATK polearm. Dropped by Staglord.' },
  { name: "Staglord's Shield", icon: '🛡', iconKey: 'shield', type: 'Shield', atk: 15, spd: 50, rng: 10, character: 'kliff', description: "Legendary shield dropped by Saigord the Staglord. High defense." },
  { name: 'Shield of Betrayal', icon: '🛡', iconKey: 'shield', type: 'Shield', atk: 12, spd: 55, rng: 10, character: 'kliff', description: 'Dropped by Cassius Morten in Chapter 6.' },
  { name: 'Melted Ambition', icon: '⚔', iconKey: 'sword', type: 'Greatsword', atk: 82, spd: 30, rng: 40, character: 'kliff', description: 'Dropped by Lava Myurdin. Forged in volcanic fire.' },

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
  { name: 'Bekker Musket', icon: '🔫', iconKey: 'pistol', type: 'Musket', atk: 50, spd: 30, rng: 90, character: 'damiane', description: 'Basic crafted musket from Guns Vol. I.' },
  { name: 'Absolute Justice Greatsword', icon: '⚔', iconKey: 'sword', type: 'Greatsword', atk: 85, spd: 25, rng: 40, character: 'damiane', description: 'High ATK greatsword.' },

  // Oongka
  { name: "Oongka's Greataxe", icon: '🪓', iconKey: 'axe', type: 'Battle Axe', atk: 80, spd: 25, rng: 35, character: 'oongka',
    signatureAbility: { name: "Slayer's Fury", description: 'Each consecutive hit increases attack speed by 8%, stacking up to 5 times. Resets after 3 seconds without hitting.', source: 'Kearush the Slayer' } },
  { name: 'Wrist Cannon', icon: '💣', iconKey: 'cannon', type: 'Cannon', atk: 55, spd: 35, rng: 60, character: 'oongka' },
  { name: 'Iron Warhammer', icon: '🔨', iconKey: 'warhammer', type: 'Warhammer', atk: 85, spd: 20, rng: 30, character: 'oongka',
    signatureAbility: { name: 'Stoneback Slam', description: 'Ground slam attacks create shockwaves in a 5m radius that stagger all nearby enemies.', source: 'Queen Stoneback Crab' } },
  { name: 'Bonepit Greathammer', icon: '🔨', iconKey: 'warhammer', type: 'Warhammer', atk: 90, spd: 15, rng: 35, character: 'oongka', description: 'Highest ATK warhammer.' },
  { name: 'Balgran Shield', icon: '🛡', iconKey: 'shield', type: 'Shield', atk: 15, spd: 40, rng: 10, character: 'oongka' },
];

// ═══════════════════════════════════════
// RECIPES & CRAFTING
// ═══════════════════════════════════════

// Data sourced: Fextralife Crafting Manuals wiki (scraped 2026-03-20). 78 food recipes confirmed.
export const RECIPES: Recipe[] = [
  // ─── COOKING — GRILLED (Open Flame) ───────────────────────────────────────────────────────────
  { name: 'Grilled Meat', type: 'cooking', ingredients: ['Tough Meat x1'], effect: '+80 HP. Best bulk healing item: cook 10x for 800 HP at lowest resource cost.', recipeLocation: 'Base knowledge' },
  { name: 'Grilled Fish', type: 'cooking', ingredients: ['Fish Fillet x1'], effect: '+100 HP.', recipeLocation: 'Base knowledge' },
  { name: 'Grilled Bird Meat', type: 'cooking', ingredients: ['Lean Bird Meat x1'], effect: '+80 HP.', recipeLocation: 'Base knowledge' },
  { name: 'Grilled Vegetables', type: 'cooking', ingredients: ['Onion x1 (or any vegetable)'], effect: '+4 Spirit.', recipeLocation: 'Base knowledge' },
  { name: 'Grilled Fruit', type: 'cooking', ingredients: ['Raspberry x1 (or any fruit)'], effect: '+4 Spirit.', recipeLocation: 'Base knowledge' },
  { name: 'Toasted Grains', type: 'cooking', ingredients: ['Barley x1 (or any grain)'], effect: '+4 Spirit.', recipeLocation: 'Base knowledge' },
  { name: 'Smoked Eggs', type: 'cooking', ingredients: ['Egg x2'], effect: '+40 HP, +2 Spirit.', recipeLocation: 'Base knowledge' },
  { name: 'Small Grilled Fish', type: 'cooking', ingredients: ['Northern Pike x1'], effect: '+80 HP.', recipeLocation: 'Base knowledge' },
  { name: 'Large Grilled Fish', type: 'cooking', ingredients: ['Striped Marlin x1'], effect: '+120 HP.', recipeLocation: 'Base knowledge' },
  { name: 'Grilled Pincers', type: 'cooking', ingredients: ['Freshwater Clam x2'], effect: '+60 HP, +4 Spirit.', recipeLocation: 'Base knowledge' },
  { name: 'Grilled Seafood', type: 'cooking', ingredients: ['Squid x1'], effect: '+80 HP.', recipeLocation: 'Base knowledge' },

  // ─── COOKING — FIELD GRILL ─────────────────────────────────────────────────────────────────────
  { name: 'Fish Skewers', type: 'cooking', ingredients: ['Vegetable x1', 'Fish Fillet x2'], effect: '+120 HP, +4 Spirit.', recipeLocation: 'Unknown' },
  { name: 'Battered Vegetables', type: 'cooking', ingredients: ['Onion x2', 'Egg x1', 'Cooking Oil x1'], effect: '+20 Spirit.', recipeLocation: 'Unknown' },
  { name: 'Battered Meat and Fish', type: 'cooking', ingredients: ['Tough Meat x1', 'Fish Fillet x1', 'Egg x1', 'Cooking Oil x1'], effect: '+160 HP, +8 Spirit.', recipeLocation: 'Unknown' },
  { name: 'Marinated Meat (Hearty)', type: 'cooking', ingredients: ['Tough Meat x18', 'Raspberry x12', 'Egg x12', 'Cooking Oil x3'], effect: '+580 HP, +56 Spirit, Fire Lv4 resistance.', recipeLocation: 'Unknown' },
  { name: 'Battered Fish', type: 'cooking', ingredients: ['Fish Fillet x2', 'Egg x1', 'Cooking Oil x1'], effect: '+140 HP.', recipeLocation: 'Unknown' },
  { name: 'Vegetable Rice Cake', type: 'cooking', ingredients: ['Lentils x2', 'Onion x1', 'Egg x1', 'Cooking Oil x1'], effect: '+20 Spirit.', recipeLocation: 'Unknown' },
  { name: 'Chewy Rice Cakes', type: 'cooking', ingredients: ['Lentils x3', 'Egg x2', 'Cooking Oil x1'], effect: '+240 HP, +24 Spirit.', recipeLocation: 'Unknown' },
  { name: 'Hearty Chewy Rice Cakes', type: 'cooking', ingredients: ['Lentils x24', 'Raspberry x12', 'Egg x12', 'Cooking Oil x3'], effect: '+540 HP, +52 Spirit, Fire Lv4 resistance.', recipeLocation: 'Unknown' },
  { name: 'Long Horn Soup', type: 'cooking', ingredients: ['Tough Meat x2', 'Long Horn x1', 'Salt x1', 'Water x4'], effect: '+360 HP, +36 Spirit.', recipeLocation: 'Unknown' },

  // ─── COOKING — FIELD POT ──────────────────────────────────────────────────────────────────────
  { name: 'Clear Soup', type: 'cooking', ingredients: ['Tough Meat x1', 'Lentils x1', 'Water x1'], effect: '+180 HP, Ice Lv2 resistance (5 min).', recipeLocation: 'Unknown' },
  { name: 'Fish Porridge', type: 'cooking', ingredients: ['Lentils x1', 'Fish Fillet x2', 'Salt x1', 'Water x3'], effect: '+240 HP, Ice Lv4 resistance (1 min).', recipeLocation: 'Unknown' },
  { name: 'Vegetable Porridge', type: 'cooking', ingredients: ['Lentils x2', 'Onion x2', 'Salt x1', 'Water x3'], effect: '+40 Spirit.', recipeLocation: 'Unknown' },
  { name: 'Braised Ribs (Hearty)', type: 'cooking', ingredients: ['Tough Meat x24', 'Onion x12', 'Raspberry x12', 'Water x3'], effect: '+560 HP, +54 Spirit, Fire Lv4 resistance.', recipeLocation: 'Unknown' },
  { name: 'Meat and Vegetable Porridge', type: 'cooking', ingredients: ['Tough Meat x2', 'Lentils x2', 'Onion x1', 'Salt x1', 'Water x3'], effect: '+300 HP, +16 Spirit.', recipeLocation: 'Unknown' },
  { name: 'Fishball Soup (Filling)', type: 'cooking', ingredients: ['Lentils x10', 'Onion x3', 'Fish Fillet x8', 'Salt x1', 'Water x3'], effect: '+560 HP, Ice Lv4 resistance.', recipeLocation: 'Unknown' },

  // ─── COOKING — CAULDRON (Drinks) ─────────────────────────────────────────────────────────────
  { name: 'Wine', type: 'cooking', ingredients: ['Fruit x2', 'Sugar x1', 'Water x2'], effect: '+12 Spirit, morale boost.', recipeLocation: 'Unknown' },
  { name: 'Oakwood Mushroom Tea', type: 'cooking', ingredients: ['Oakwood Mushroom x2', 'Water x2'], effect: '+8 Spirit.', recipeLocation: 'Unknown' },
  { name: 'Mild Herbal Tea', type: 'cooking', ingredients: ['Herb x2', 'Honey x1', 'Water x2'], effect: '+10 Spirit, minor HP regen.', recipeLocation: 'Unknown' },
  { name: 'Honey Tea', type: 'cooking', ingredients: ['Honey x2', 'Water x2'], effect: '+8 Spirit.', recipeLocation: 'Unknown' },

  // ─── COOKING — MEAT SKEWERS & MISC ──────────────────────────────────────────────────────────
  { name: 'Meat Skewers', type: 'cooking', ingredients: ['Tough Meat x1', 'Onion x1'], effect: '+100 HP, +4 Spirit.', recipeLocation: 'Unknown' },
  { name: 'Grilled Meat and Fish', type: 'cooking', ingredients: ['Tough Meat x1', 'Fish Fillet x1'], effect: '+120 HP, Fire Lv2 resistance.', recipeLocation: 'Unknown' },
  { name: 'Steamed Fish', type: 'cooking', ingredients: ['Fish Fillet x2', 'Herb x1', 'Water x2'], effect: '+140 HP, +8 Spirit.', recipeLocation: 'Unknown' },
  { name: 'Pickled Vegetables', type: 'cooking', ingredients: ['Onion x3', 'Salt x2', 'Water x1'], effect: '+16 Spirit.', recipeLocation: 'Unknown' },
  { name: 'Pan-Fried Rice Cakes', type: 'cooking', ingredients: ['Lentils x2', 'Egg x1', 'Cooking Oil x1', 'Honey x1'], effect: '+200 HP, +16 Spirit.', recipeLocation: 'Unknown' },
  { name: 'Vegetable Juice', type: 'cooking', ingredients: ['Onion x2', 'Raspberry x1', 'Water x2'], effect: '+12 Spirit, minor HP regen.', recipeLocation: 'Unknown' },
  { name: 'Braised Fish', type: 'cooking', ingredients: ['Fish Fillet x3', 'Onion x1', 'Salt x1', 'Water x3'], effect: '+220 HP, Ice Lv3 resistance.', recipeLocation: 'Unknown' },
  { name: 'Herbal Tea', type: 'cooking', ingredients: ['Herb x3', 'Honey x1', 'Water x3'], effect: '+12 Spirit, minor HP regen for 2 minutes.', recipeLocation: 'Unknown' },

  // ─── ALCHEMY (Cauldron) ───────────────────────────────────────────────────────────────────────
  { name: "Haiden's Lesser Elixir", type: 'alchemy', ingredients: ['Lesser Spirit Reagent x2', 'Lesser Catalyst x1', 'Empty Bottle x1'], effect: 'No Spirit Consumption for 4 seconds.', recipeLocation: 'Unknown' },
  { name: "Meliara's Lesser Elixir", type: 'alchemy', ingredients: ['Lesser Health Reagent x2', 'Lesser Catalyst x1', 'Empty Bottle x1'], effect: 'Increases health by 75 and attack speed by 1 for 5 minutes.', recipeLocation: 'Unknown' },
  { name: "Astrid's Lesser Elixir", type: 'alchemy', ingredients: ['Lesser Defense Reagent x2', 'Lesser Catalyst x1', 'Empty Bottle x1'], effect: 'Increases defense for 5 minutes.', recipeLocation: 'Unknown' },
  { name: "Freya's Elixir", type: 'alchemy', ingredients: ['Spirit Reagent x3', 'Catalyst x1', 'Empty Bottle x1'], effect: 'Full Spirit restoration and temporary Spirit regen.', recipeLocation: 'Unknown' },
  { name: "Apollonia's Lesser Elixir", type: 'alchemy', ingredients: ['Lesser Stamina Reagent x2', 'Lesser Catalyst x1', 'Empty Bottle x1'], effect: 'Increases stamina recovery for 5 minutes.', recipeLocation: 'Unknown' },
  { name: 'Palmer Pills', type: 'alchemy', ingredients: ['Crimson Root x1', 'Adrenaline Gland x1', 'Empty Bottle x1'], effect: 'Self-revival: revives with 30% HP. Critical combat consumable.', recipeLocation: 'Unknown' },
  { name: 'Attack Speed Potion', type: 'alchemy', ingredients: ['Crimson Root x1', 'Adrenaline Gland x1', 'Alcohol x1'], effect: '+30% attack speed for 60 seconds. One of the most useful early unlocks.', recipeLocation: 'Unknown' },

  // ─── BLACKSMITH — WEAPONS ────────────────────────────────────────────────────────────────────
  { name: 'Arrow', type: 'blacksmith', ingredients: ['Timber x5', 'Iron Ore x1'], effect: 'Standard bow ammunition.', recipeLocation: 'Base knowledge' },
  { name: 'Bullet', type: 'blacksmith', ingredients: ['Iron Ore x2', 'Gunpowder x4'], effect: 'Firearm ammunition for pistols and muskets.', recipeLocation: 'Base knowledge' },
  { name: 'Small Cannon Ball', type: 'blacksmith', ingredients: ['Iron Ore x10', 'Gunpowder x10'], effect: 'Heavy ammunition for Hand Cannon and Orc Blaster.', recipeLocation: 'Unknown' },
  { name: 'One-Handed Weapons Vol. I', type: 'blacksmith', ingredients: ['Iron Ore x5', 'Copper Ore x2'], effect: 'Crafts Glenmore Sword and upgrades. Unlocks one-handed weapon refinement.', recipeLocation: 'Unknown' },
  { name: 'Two-Handed Weapons Vol. II', type: 'blacksmith', ingredients: ['Iron Ore x10', 'Copper Ore x3'], effect: 'Crafts Thalwynd Longsword and upgrades.', recipeLocation: 'Unknown' },
  { name: 'Bows Vol. I', type: 'blacksmith', ingredients: ['Timber x10', 'Fine Timber x5'], effect: 'Crafts White Wood Bow and upgrades.', recipeLocation: 'Unknown' },
  { name: 'Guns Vol. I', type: 'blacksmith', ingredients: ['Iron Ore x5', 'Copper Ore x2'], effect: 'Crafts Bekker Musket and upgrades.', recipeLocation: 'Unknown' },

  // ─── BLACKSMITH — ARMOR ──────────────────────────────────────────────────────────────────────
  { name: 'Plate Armor Vol. I', type: 'blacksmith', ingredients: ['Iron Ore x5', 'Copper Ore x2', 'Cloth x9', 'Fleece x2'], effect: 'Crafts Northern Fighter\'s Chain Mail and upgrades.', recipeLocation: 'Unknown' },
  { name: 'Cloth Armor Vol. I', type: 'blacksmith', ingredients: ['Cloth x10', 'Fleece x2'], effect: 'Crafts Grey Wolf Cloth Cloak and upgrades.', recipeLocation: 'Unknown' },
  { name: 'Kuku Pot', type: 'blacksmith', ingredients: ['Iron Ore x5', 'Timber x5'], effect: 'Special cooking vessel. Unlocked via Ch.4 quest "Kilnden Workshop." Craft at Grimnir.', recipeLocation: 'Kilnden Workshop (Ch.4 quest) / Grimnir' },

  // ─── SPECIAL CRAFTING ─────────────────────────────────────────────────────────────────────────
  { name: 'Scarecrow Cloak', type: 'blacksmith', ingredients: ['Hay x5', 'Cloth x10'], effect: 'Reduces enemy detection range. Obtained from Scholastone or crafted.', recipeLocation: 'Scholastone' },
  { name: 'Haste Core', type: 'blacksmith', ingredients: ['Defense Reagent x1', 'Abyss Cell x1', 'Diamond x1'], effect: 'Movement Speed upgrade. Craft at Witches\' location.', recipeLocation: "Witches' Location" },

  // ─── DYES (Cauldron) ──────────────────────────────────────────────────────────────────────────
  { name: 'Bright Red Dye', type: 'dye', ingredients: ['Pink Herb x10', 'Rhinoceros Beetle x3', 'Longhorn Beetle x3'], effect: 'Bright red armor/clothing color.', recipeLocation: 'Unknown' },
  { name: 'Dark Red Dye', type: 'dye', ingredients: ['Pink Herb x10', 'Rhinoceros Beetle x3', 'Longhorn Beetle x1', 'Stag Beetle x2'], effect: 'Dark red armor/clothing color.', recipeLocation: 'Unknown' },
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

  // Wolf (1)
  { name: 'Direwolf', category: 'wolf', region: 'pailune', speed: 78, combat: 65, stamina: 70, special: 'Pack howl that buffs nearby allied mounts. Leaping bite attack', acquisition: 'Tame in the wild (Pailune highlands, appears in release trailer)' },

  // Story mounts (obtained through main story progression)
  { name: 'Herspia', category: 'horse', region: 'hernand', speed: 65, combat: 10, stamina: 70, special: "Kliff's personal horse obtained after the prologue. Reliable starter mount", acquisition: 'Automatically obtained after completing the Prologue' },
  { name: 'Brianto', category: 'horse', region: 'hernand', speed: 70, combat: 10, stamina: 65, special: "Damiane's default horse. Available when unlocking her in Chapter 3", acquisition: 'Automatically obtained when unlocking Damiane (Chapter 3)' },
  { name: 'Blackstar Dragon', category: 'wyvern', region: 'abyss', speed: 95, combat: 90, stamina: 55, special: 'Full flight. End-game flying mount obtained during Chapter 11 story events', acquisition: 'Story reward after completing Chapter 11' },
];

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
  {
    name: 'Barber Shop',
    description: 'Customize the appearance of your character, including hairstyle, beard, eyebrows, face tattoos, and body tattoos. Purely cosmetic with no effect on gameplay stats.',
    upgrades: [],
  },
  {
    name: 'Dyehouse Shop',
    description: 'Change outfit colors and customize mount colors for horses and mechanical mounts. Applies cosmetic dyes crafted at the camp.',
    upgrades: [],
  },
  {
    name: 'Trading Center',
    description: 'Exchange goods for useful items needed during exploration across the lands of Pywel. A distinct trading facility separate from the Camp Vendor.',
    upgrades: [],
  },
  {
    name: 'Personal Resting House',
    description: 'Create and customize your own house at Greymane Camp, used as a personal resting place between adventures.',
    upgrades: [],
  },
];

// ═══════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════

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
// TROPHIES / ACHIEVEMENTS (35 total)
// Source: gamingbible.com [2026-03-16] -- Tier 2
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
