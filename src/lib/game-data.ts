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
    // Added 2026-03-20 via apply-data task
    { name: 'Blue Scout Lantern', location: 'Twitch Drop Week 1 (60 min)', category: 'edition' },
    { name: 'Blue Scout Earring', location: 'Twitch Drop Week 1 (120 min)', category: 'edition' },
    { name: 'Blue Scout Necklace', location: 'Twitch Drop Week 1 (120 min)', category: 'edition' },
    { name: 'Blue Scout Ring', location: 'Twitch Drop Week 1 (120 min)', category: 'edition' },
    { name: 'Blue Scout Shield', location: 'Twitch Drop Week 1 (180 min)', category: 'edition' },
    { name: 'Blue Scout Cloak', location: 'Twitch Drop Week 1 (300 min)', category: 'edition' },
    { name: 'Blue Scout Armor', location: 'Twitch Drop Week 1 (300 min)', category: 'edition' },
    { name: 'Blue Scout Hat', location: 'Twitch Drop Week 1 (300 min)', category: 'edition' },
    { name: 'Blue Scout Stirrups', location: 'Twitch Drop Week 2 (60 min)', category: 'edition' },
    { name: 'Blue Scout Champron', location: 'Twitch Drop Week 2 (120 min)', category: 'edition' },
    { name: 'Blue Scout Saddle', location: 'Twitch Drop Week 2 (180 min)', category: 'edition' },
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
    reward: 'Hungering Fang Leather Cloak, Hungering Fang Leather Boots', element: 'shock', weakness: 'physical',
    location: 'Pailune Castle (quest: Dawn)',
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
  { name: 'One-Armed Ludvig', region: 'pailune', type: 'Human', difficulty: 'hard',
    reward: 'None', element: 'shock', weakness: 'physical', // Updated 2026-03-24: game8 Tier 1 confirms no reward drop
    location: 'Kingshield Mountain, Pailune (quest: Twisted Fate)',
    mechanics: 'Forced Oongka play (no Kliff shield). Block/parry with weapon via L1/LB. Dual-wield one-handed weapons recommended. Sword of the Lord optimal for wave attacks. Prep: hunt animals nearby, cook at Beighen village.' },
  // Ch.8 — Demeniss campaign
  { name: 'Gregor the Halberd of Carnage', region: 'hernand', type: 'Human', difficulty: 'hard', // Updated 2026-03-24: region confirmed hernand by PowerPyx + GameRant (2 sources)
    reward: 'Golden Vanguard, Abyss Artifact x1', element: 'physical', weakness: 'physical', // Updated 2026-03-24: reward confirmed by PowerPyx Tier 1
    location: 'Fort Ironclad, Hernand (quest: Where the Wind Guides You)', // Updated 2026-03-24: location region corrected
    mechanics: '1 HP bar. Arrows fired from walls throughout fight. Super armor with successive stabs — dodge continuously until it stops. Combat loop: dodge → attack → heal simultaneously.' },
  { name: 'Fortain the Cursed Knight', region: 'hernand', type: 'Human', difficulty: 'extreme', // Updated 2026-03-22: region confirmed hernand by Fextralife, PowerPyx, game8, Deltia's Gaming (4 sources)
    reward: 'Shackle of Might, Abyss Artifact x1', element: 'abyss', weakness: 'physical',
    location: 'Thornbriar Fortress, Hernand (quest: The Cursed Knight)', // Updated 2026-03-22: location region corrected
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
    reward: 'Golden Piggy Bank', element: 'physical', weakness: 'frost', // Updated 2026-03-28: reward confirmed by GameRant + game8 (House Serkis Faction Quest)
    location: 'Alfonso Estate, Hernand',
    mechanics: 'Optional side quest (House Serkis Faction). Exceptional double-barreled gun shooter. Golden Piggy Bank generates offline income (Light Copper Pouches).' },
  { name: 'Muskan', region: 'desert', type: 'Human', difficulty: 'extreme',
    reward: 'Combat God\'s Plate Gloves', element: 'physical', weakness: 'physical', // Updated 2026-03-28: reward confirmed by nerdschalk + game8 (Bonepit questline completion)
    location: 'The Bonepit, Crimson Desert (Tommasoan territory)',
    mechanics: 'Arena fight with cheering onlookers. "Seemingly undefeated warrior of The Bonepit." Fist-only fighter. Counters any move used twice in a row -- vary grapple finishers. Observation rewards: enhanced Body Slam + Grapple Follow-up.' },

  // ─── PARTIALLY CONFIRMED (name known; full details TBD post-exploration) ──────────────────────
  { name: 'Queen Stoneback Crab', region: 'delesyia', type: 'Beast', difficulty: 'hard', // Updated 2026-04-02: region confirmed delesyia by GameRant + crimsondesert.app (Bardtree Gorge, east of Demeniss)
    reward: 'Abyss Artifact x1, Diamond x2, Garnet x3, Azurite x5', element: 'physical', weakness: 'fire', // Updated 2026-04-02: reward confirmed by GameRant + crimsondesert.app (2 sources)
    location: 'Bardtree Gorge / Redfox Forest, Delesyia (quest: The Queen\'s Lake)',
    mechanics: 'Climbing puzzle boss. Use Triple Force Jump to scale its back. P1: Cling (R3) + Pierce (R2) on glowing green cracks. P2: Smash ceramic pots on shell. Requires good Stamina investment for clinging. NPC Diederik becomes armor vendor after completion.' },
  { name: 'White Horn', region: 'pailune', type: 'Beast', difficulty: 'hard',
    reward: 'Unknown (TBD)', element: 'frost', weakness: 'fire',
    location: 'White Mountains, Pailune',
    mechanics: 'Multi-stage fight. Yeti/reindeer hybrid. Mountain spirit. Summons snowstorms and blizzards.' },
  { name: 'Golden Star', region: 'delesyia', type: 'Mechanical', difficulty: 'legendary',
    reward: 'Blackstar Dragon Mount, Abyssal Dragon Armor Component', element: 'shock', weakness: 'physical', // Updated 2026-04-02: rewards confirmed by GameSpot + Fextralife (2 sources)
    location: "Marni's Masterium, Delesyia (quest: Foreboding Shadow, Ch.11)",
    mechanics: '1 HP bar. Sits in corners of arena — position determines attack type. Throw javelins from arena devices to build stagger meter. When stunned, unleash melee combos. Flame tornado and bombard barrage are key attacks to dodge.' },
  { name: 'Snow Walker', region: 'pailune', type: 'Elemental', difficulty: 'extreme',
    reward: 'Unknown (TBD)', element: 'frost', weakness: 'fire',
    location: 'Pailune region',
    mechanics: 'Massive ice elemental. Ice attacks with charging and melee mix.' },
  { name: 'Gwen Kraber', region: 'hernand', type: 'Human', difficulty: 'hard',
    reward: 'Frostfang', element: 'physical', weakness: 'physical', // Updated 2026-03-31: reward confirmed as 'Frostfang' by game8 + web search (2-handed spear)
    location: 'Roothold Stronghold, Hernand' },
  { name: 'Sir Catfish', region: 'desert', type: 'Beast', difficulty: 'normal',
    reward: 'Unknown (TBD)', element: 'physical', weakness: 'shock',
    location: 'Unknown — confirmed in in-game Boss Knowledge Menu' },
  { name: 'Titan', region: 'pailune', type: 'Monster', difficulty: 'extreme', // Updated 2026-04-02: region confirmed pailune (Windsong Peaks) by GameRant + gamingpromax (2 sources)
    reward: 'Reckoning Two-Handed Spear, Lightning Bolt Plate Armor', element: 'shock', weakness: 'physical', // Updated 2026-04-02: rewards confirmed by nerdschalk + GameRant (2 sources)
    location: 'Windsong Peaks, Pailune (quest: Ancient Barrier faction quest)',
    mechanics: '3 phases including Gigantified form. Wields spear with lightning attacks. Attack exposed skin on hands during giant phase. Reckoning Spear has Lightning God\'s Affliction passive (calls lightning on parry).' },

  // Added 2026-03-24 via apply-data task
  // ─── CHAPTER 8–9 STORY BOSSES ──────────────────────────────────────────────────────────────────
  { name: 'Lucian Bastier', region: 'hernand', type: 'Human', difficulty: 'extreme',
    reward: "Official Knight's Plate Armor, Official Knight's Leather Boots, Official Knight's Leather Gloves, Official Knight's Plate Gloves, Spire of Clockwork",
    element: 'fire', weakness: 'physical',
    location: 'Chapter 8 Blood Coronation arc, Hernand (quest: A Fleeting Dream)',
    mechanics: "2 HP bars. FORCED DAMIANE play (Kliff unavailable). P1: Shield + mace with explosive fire floor damage -- fight from distance; attack after blocked attacks. P2: Constant teleportation -- dodge and strike after teleport animation ends. Former officer who betrayed Marquis Stefan Lanford of Calphade." },
  { name: "T'rukan the Ascended", region: 'demeniss', type: 'Human', difficulty: 'extreme',
    reward: "Wooden Mask of Lost Justice, Wanderer of Faith Leather Gloves, T'rukan's Fighting Spirit, Abyss Artifact x1",
    element: 'physical', weakness: 'physical',
    location: 'Serpent Marsh, South Demeniss (quest: True Strength, Ch.9)',
    mechanics: '1 HP bar. Extremely fast fist attacks (1-2 hits/sec). Pure dodge-based fight -- no blocking or parrying confirmed effective. Minimum prep: Health Skill Lv6 (750+ HP), gear refined to Lv6+. Patch 1.00.03 difficulty nerf applied.' },
  { name: 'Goyen', region: 'desert', type: 'Human', difficulty: 'extreme',
    reward: "Witch's Ring, Greymane's Earring",
    element: 'physical', weakness: 'physical',
    location: 'Crimson Desert region (quest: Unwavering Steps, Ch.9)',
    mechanics: '1 HP bar. Sword + shield, similar moveset to Kliff. Hits extremely hard -- can kill in 1-2 hits with strongest attacks. Jump + shockwave slam is most dangerous move. Tip: Fated Shadow weapon found on stairs at back of arena after the fight (world item, not a drop).' },

  // Added 2026-03-24 via apply-data task
  // ─── SHACKLED GOD FACTION QUEST BOSSES ─────────────────────────────────────────────────────────
  { name: 'Priscus the Ancient', region: 'pailune', type: 'Monster', difficulty: 'extreme',
    reward: "Blessing of the Immortal, Ancient's Necklace, Ancient Retribution, Delesyian Contribution EXP x100, Abyss Artifact x1",
    element: 'physical', weakness: 'physical', // element editorial: attacks include lasers, shadow, and spear projectiles; no in-game element confirmed
    location: 'Spire of Ringing Truth, Five-Finger Mountain area, Pailune',
    mechanics: "Optional boss. Part of the Shackled God faction quest (Delesyia). Flies and glides in midair. Use Focused Shot for ranged damage. Spawns sentry orbs that shoot lasers (block with Nature's Snare). Dive bomb attack deals heavy damage. Nature's Snare does NOT block shadow or spear attacks." },
  { name: 'Praevus the Ancient', region: 'desert', type: 'Monster', difficulty: 'extreme',
    reward: "Memory of Ancient Nature, Ancient Earring, Ancient Wrath, Abyss Artifact x1",
    element: 'fire', weakness: 'physical',
    location: 'Abyss Debris, west of Tashkalp, Crimson Desert',
    mechanics: 'Optional boss. Part of the Shackled God faction quest. Flying boss with fire lasers and meteors. Use Focused Shot to stun and ground it. Trap against arena rocks in northern area for sustained damage. Rolling extinguishes burning status. Confirmed identity of pre-launch "Desert Ancient" placeholder.' },
];

// Knowledge Codex contains 76 total named bosses. Above list contains 35 confirmed.
// Remaining ~41 bosses exist but are not yet fully documented post-launch.

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
  { name: 'Gregor\'s Soldiers', region: 'hernand', type: 'Human', element: 'physical',
    location: 'Fort Ironclad, Hernand', drops: [],
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
  { name: 'Dead of the Night', description: 'Prologue that opens the game.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Watch the opening cinematic.' },
      { step: 2, instruction: 'The quest completes automatically as the prologue begins.' },
    ]
  },
  { name: 'Unfamiliar Lands', description: 'Prologue sub-quest: Ambush arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Walk down the hill toward the cabin.' },
      { step: 2, instruction: 'Speak with Oongka (optional) outside the cabin.' },
      { step: 3, instruction: 'Speak with Marius (follow the red X on the minimap).' },
      { step: 4, instruction: 'Speak with Ross (leaning against a tree).' },
      { step: 5, instruction: 'Enter the cabin to complete the quest.' },
    ]
  },
  { name: 'In Ashes', description: 'Prologue sub-quest: Ambush arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Defeat the 5 initial Black Bear enemies (combat tutorial).' },
      { step: 2, instruction: 'Help Naira — travel to the north marker and defeat 8 enemies.' },
      { step: 3, instruction: 'Help Oongka — travel to the east marker and defeat enemies.' },
      { step: 4, instruction: 'Help Yann — travel to the west marker, defeat enemies, and face boss Myurdin. Outcome does not affect progression.' },
    ]
  },
  { name: 'Realm of Uncertainty', description: 'Prologue sub-quest: Unknown Space arc — introduction to The Abyss.', type: 'main', region: 'abyss',
    walkthrough: [
      { step: 1, instruction: 'Move forward through the corridor.' },
      { step: 2, instruction: 'Get a running start and jump across the gap.' },
      { step: 3, instruction: 'Use the aim system to jump between pillars.' },
      { step: 4, instruction: 'Climb walls by approaching and pressing jump while moving toward them.' },
      { step: 5, instruction: 'Crouch through a hole at the top.' },
      { step: 6, instruction: 'Learn the Blinding Flash ability and use it to open light-locked doors.' },
      { step: 7, instruction: 'Navigate water platforms by timing your jumps.' },
      { step: 8, instruction: 'Light your way through darkness with a lantern to find the exit.' },
      { step: 9, instruction: 'Reach the diamond-shaped platform — a cutscene triggers to complete the quest.' },
    ]
  },
  { name: 'New Journey', description: 'Prologue sub-quest: Unknown Space arc.', type: 'main', region: 'hernand',
    rewards: ['Standard Inventory Expansion Tool x1', 'Oats x10', 'Blackberry x5'],
    walkthrough: [
      { step: 1, instruction: 'Find Sebastian by the river; hold the button to follow him automatically.' },
      { step: 2, instruction: 'After the cutscene, defeat 2 guards — they attack immediately so start blocking right away.' },
      { step: 3, instruction: 'Travel to Hernand following Sebastian.' },
      { step: 4, instruction: 'Mount a horse and follow Sebastian to House Celeste — a cutscene completes the quest.' },
    ]
  },

  // ─── CHAPTER 1: THE FIRST ENCOUNTER ──────────────────────────────────────────────────────────
  // Trials of Kindness arc
  { name: 'Where Rumors Gather', description: 'Ch.1 — Trials of Kindness: Follow rumors in Hernand.', type: 'main', region: 'hernand',
    rewards: ['Coins'],
    walkthrough: [
      { step: 1, instruction: 'Enter the Hernand Tavern by traveling south to the marker.' },
      { step: 2, instruction: 'Approach the arm wrestler and initiate a challenge.' },
      { step: 3, instruction: 'Win by rapidly pressing the action button to fill the meter; complete any QTE prompts.' },
    ]
  },
  { name: 'Mysterious Man', description: 'Ch.1 — Trials of Kindness: Investigate a stranger.', type: 'main', region: 'hernand',
    rewards: ['Standard Inventory Expansion Tool x1'],
    walkthrough: [
      { step: 1, instruction: 'Exit the tavern and turn left; find the elderly beggar behind the low wall of the tavern\'s front yard.' },
      { step: 2, instruction: 'Lock on and interact — choose "Give Alms" to offer a coin.' },
      { step: 3, instruction: 'The beggar relocates, revealing a hatch with a ladder for the next quest.' },
    ]
  },
  { name: 'True Wisdom in Kindness', description: 'Ch.1 — Trials of Kindness.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Interact with the trap door where the beggar was and climb down into the sewer.' },
      { step: 2, instruction: 'Navigate the sewer, jumping across broken floor sections.' },
      { step: 3, instruction: 'Find the kneeling woman at the tunnel\'s end; lock on and untie her.' },
    ]
  },
  { name: 'Actions Speak Louder than Words', description: 'Ch.1 — Trials of Kindness.', type: 'main', region: 'hernand',
    rewards: ['Standard Inventory Expansion Tool x1', 'Lentils x10', 'Apples x5'],
    walkthrough: [
      { step: 1, instruction: 'Speak with the distressed couple at the mission marker.' },
      { step: 2, instruction: 'Take the broom from the scene automatically during dialogue.' },
      { step: 3, instruction: 'Climb boxes at the back of the house to reach the roof.' },
      { step: 4, instruction: 'Equip the broom from inventory; stand directly on top of the chimney and use the clean prompt. Standing to the side will not work.', tip: 'You must stand directly on top of the chimney, not beside it.' },
    ]
  },
  { name: 'Heart Beyond Borders', description: 'Ch.1 — Trials of Kindness. Rewards Engraved Key and Shai\'s Pendant.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Speak with the child in the courtyard wearing a green cloak.' },
      { step: 2, instruction: 'Climb nearby rooftops to locate a cat; carry it back to the child.' },
      { step: 3, instruction: 'After the cutscene, pick up the pendant the child drops.', tip: 'Ring the bell in the tower above to reveal the Hernand region on the map.' },
    ]
  },
  // Trace arc
  { name: 'Mystical Key', description: 'Ch.1 — Trace arc: Investigate Abyss mysteries.', type: 'main', region: 'abyss',
    walkthrough: [
      { step: 1, instruction: 'Open your inventory and examine the engraved key closely (zoom in on the tip).' },
      { step: 2, instruction: 'Equip the "Hernandian Attire" from inventory; approach the castle gates — soldiers grant entry.' },
      { step: 3, instruction: 'Head to the second floor, turn right down the corridor; enter the first door on the left (the alchemist\'s chamber).' },
      { step: 4, instruction: 'Approach and interact with the glowing gate to complete the quest.' },
    ]
  },
  { name: 'Polar Opposites', description: 'Ch.1 — Trace arc.', type: 'main', region: 'abyss',
    walkthrough: [
      { step: 1, instruction: 'Activate the Abyss Nexus by standing on the sky platform.' },
      { step: 2, instruction: 'Walk forward following the cutscene.' },
      { step: 3, instruction: 'Solve the floor plate puzzle: shine your lantern to reveal yellow outlines; use Axiom Force to pull/push plates while rotating until the yellow lines align with the wires.' },
      { step: 4, instruction: 'Enter the structure; walk down the hallway to meet Alustin.' },
    ]
  },
  { name: 'Abyss without Balance', description: 'Ch.1 — Trace arc.', type: 'main', region: 'abyss',
    walkthrough: [
      { step: 1, instruction: 'Navigate the Abyss Nexus using Axiom Force on gates; manipulate totems to glow blue to create paths.' },
      { step: 2, instruction: 'Stand on the circular floor plate (white ring) to activate a teleport point.' },
      { step: 3, instruction: 'Solve the cube puzzle: use Axiom Force to move a floating blue cube onto the right pedestal to remove a barrier.' },
      { step: 4, instruction: 'Place a power cell, then strike it into the wall using Force Palm to synthesize it.' },
      { step: 5, instruction: 'Climb to the large circular cog and use Force Palm to activate it.' },
      { step: 6, instruction: 'Head up the stairs to automatically collect the glowing Abyss Artifact.' },
    ]
  },
  { name: 'Woman in White', description: 'Ch.1 — Trace arc: Encounter the White Crow.', type: 'main', region: 'abyss',
    rewards: ['Faded Abyss Artifact x1', 'Palmar Pill x1'],
    walkthrough: [
      { step: 1, instruction: 'Walk forward to trigger the cutscene with White Crow (the Woman in White).' },
      { step: 2, instruction: 'Complete the quick-time event when prompted.' },
      { step: 3, instruction: 'Use wings to glide down to Hernand, managing your stamina carefully.', tip: 'Watch your stamina gauge while gliding — land early if needed.' },
    ]
  },

  // ─── CHAPTER 2: GOLDEN GREED ──────────────────────────────────────────────────────────────────
  // Unexpected Gift arc
  { name: 'Where the Light Leads', description: 'Ch.2 — Unexpected Gift arc.', type: 'main', region: 'hernand',
    rewards: ['Arrows x10'],
    walkthrough: [
      { step: 1, instruction: 'Travel to Lioncrest Watchtower (may be fog-obscured on the map).' },
      { step: 2, instruction: 'Defeat approximately 10 bandits in the courtyard; prioritize archers first.' },
      { step: 3, instruction: 'Ascend the watchtower — use fire arrows on shrubbery blocking the door, or use Focused Light ability, or three consecutive Force Palms mid-jump to reach the roof.', tip: 'There are three ways up: fire arrows on the shrubs, Focused Light ability, or Force Palm jumps.' },
      { step: 4, instruction: 'Collect the Visione Helmet at the top floor — this triggers the next quest.' },
    ]
  },
  { name: 'Memory Fragment', description: 'Ch.2 — Unexpected Gift arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'At the top of Lioncrest Watchtower, pick up the golden helmet among the treasure — it auto-equips.' },
      { step: 2, instruction: 'View the memory: access the armor menu (D-pad Left > select helm > Play > Delysia > "Visione"), or hold the Options button and select the bottom icon.' },
    ]
  },
  { name: 'Reunion', description: 'Ch.2 — Unexpected Gift arc.', type: 'main', region: 'hernand',
    rewards: ['Standard Inventory Expansion Tool x1', 'Palmar Pill x1'],
    walkthrough: [
      { step: 1, instruction: 'Speak with the child; exit the Watchtower courtyard through the archway — a cutscene plays.' },
      { step: 2, instruction: 'Hold the interaction button to follow the cat over river portions and rock ledges.' },
      { step: 3, instruction: 'Speak to the hologram of the child at the ruins.' },
      { step: 4, instruction: 'Watch and learn the Nature\'s Grasp ability.' },
      { step: 5, instruction: 'Use Nature\'s Grasp on a rock wall, then tap the action button to lift it; enter where the child meditates and learn Focus.' },
      { step: 6, instruction: 'Solve the ancient ruins puzzle: use Force Palm on three round wall platforms in sequence — middle, left, right.' },
      { step: 7, instruction: 'Exit the cave and speak to the child outside; collect the Abyss Artifact from the pillar.' },
    ]
  },
  // Hernand in Chaos arc
  { name: 'For Honor', description: 'Ch.2 — Hernand in Chaos: Boss fight vs. Matthias.', type: 'main', region: 'hernand',
    rewards: ['Pump Kick x1'],
    walkthrough: [
      { step: 1, instruction: 'Travel to Hernand Square.' },
      { step: 2, instruction: 'Lock on to the knight Matthias (sitting surrounded by three people) and talk to him.' },
      { step: 3, instruction: 'Duel Matthias — he has two health bars. Use 3-hit light attack combos followed by heavy attacks. Healing items can be used mid-fight.', tip: 'Use healing items freely — this is an intended challenge fight.' },
    ]
  },
  { name: 'Awestruck', description: 'Ch.2 — Hernand in Chaos arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'After the duel with Matthias, locate Barden Middler (a knight without a helmet) in the crowd in Hernand Square.' },
      { step: 2, instruction: 'Approach him — a cutscene triggers and completes the quest.' },
    ]
  },
  { name: 'Shadow Cast Over the River', description: 'Ch.2 — Hernand in Chaos arc.', type: 'main', region: 'hernand',
    rewards: ['Standard Inventory Expansion Tool x1', 'Toasted Grains x10', 'Grilled Fruit x5'],
    walkthrough: [
      { step: 1, instruction: 'Travel to the Springtide Mill/bridge area in the Hernand region.' },
      { step: 2, instruction: 'Engage and defeat all Bleed Bandits around the bridge and floodgate.' },
      { step: 3, instruction: 'Check the nearby encampment if enemies remain.', tip: 'Be cautious of the bandit on horseback — use arrows to avoid harming the horse, as harming it triggers a bounty.' },
    ]
  },
  { name: 'Where Misery Gathers', description: 'Ch.2 — Hernand in Chaos arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Travel to the notice board at Springtide Mill.' },
      { step: 2, instruction: 'Collect and examine four flyers: Missing Cows (top left), Horn Thief (top middle), Missing Wooly (top right), Strange Noises from the Cave (bottom left).', tip: 'Completing this unlocks four follow-up quests completable in any order.' },
    ]
  },
  { name: 'Trial After Trial', description: 'Ch.2 — Hernand in Chaos arc.', type: 'main', region: 'hernand',
    rewards: ['Coins', 'Standard Inventory Expansion Tool x1', 'Thin Hide x5'],
    walkthrough: [
      { step: 1, instruction: 'Speak with Bremer at the farm (man in a blue shirt).' },
      { step: 2, instruction: 'Speak to the Herbalist witness at the marked location — costs 1 Copper coin.' },
      { step: 3, instruction: 'Mount your horse and follow the Herbalist to a specific location.' },
      { step: 4, instruction: 'Defeat bandits at the camp; use your lantern to track memory fragments and learn "The Missing Cow".' },
      { step: 5, instruction: 'Return to Bremer.' },
    ]
  },
  { name: 'The Man Trapped in the Mire', description: 'Ch.2 — Hernand in Chaos arc.', type: 'main', region: 'hernand',
    rewards: ['Coins', 'Standard Inventory Expansion Tool x1', 'Cloth Pieces x5'],
    walkthrough: [
      { step: 1, instruction: 'Speak with Ibano (the enraged rancher at the objective marker).' },
      { step: 2, instruction: 'Head east to the marked location; defeat 3 bandits; use your lantern to find memory fragments — learn "Hornless Goat".' },
      { step: 3, instruction: 'Pick up the "Mysterious Elixir" from a rock at the campsite.' },
      { step: 4, instruction: 'Return to Ibano at his farm — a cutscene completes the quest.' },
    ]
  },
  { name: 'Missing Companion', description: 'Ch.2 — Hernand in Chaos arc.', type: 'main', region: 'hernand',
    rewards: ['Standard Inventory Expansion Tool x1', 'Fleece x5'],
    walkthrough: [
      { step: 1, instruction: 'Speak with crying child Willian at Bloomwood Ranch.' },
      { step: 2, instruction: 'Head south to the three-way intersection and gather information from the other children.' },
      { step: 3, instruction: 'Cross the street to find herders; gather information from them.' },
      { step: 4, instruction: 'Travel south across the river to the bandit camp; defeat all bandits; locate sheep Wooly in the pen and pick her up.' },
      { step: 5, instruction: 'Carry Wooly back to Willian (by the road near a tree) — a cutscene completes the quest.' },
    ]
  },
  { name: 'Secrets Hidden in the Dark', description: 'Ch.2 — Hernand in Chaos arc.', type: 'main', region: 'hernand',
    rewards: ['Standard Inventory Expansion Tool x1', 'Grilled Meat x5', 'Grilled Fruit x5'],
    walkthrough: [
      { step: 1, instruction: 'Find the two men harassing drunkard Boris near Bloomwood Ranch.' },
      { step: 2, instruction: 'Call your horse; follow Boris on horseback to a cave with bandits.' },
      { step: 3, instruction: 'Clear enemies and reach the cave\'s back section; use lantern to view blue ghosts and learn memory "Lair of the Animal Thieves".' },
      { step: 4, instruction: 'Exit the cave.' },
      { step: 5, instruction: 'Travel northeast to approach and speak with guards at the marked location.' },
    ]
  },
  // The End of Greed arc
  { name: 'The Dark Veil', description: 'Ch.2 — The End of Greed arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Head to the marker in Hernand at Unicorn Cliff.' },
      { step: 2, instruction: 'Locate merchant Shakatu and speak to him — the quest completes.' },
    ]
  },
  { name: 'The Flames of Greed', description: 'Ch.2 — The End of Greed arc.', type: 'main', region: 'hernand',
    rewards: ['Coins', 'Abyss Artifact x1'],
    walkthrough: [
      { step: 1, instruction: 'Speak with the distressed nun on the road.' },
      { step: 2, instruction: 'Travel south of the Nas River by Unicorn Cliff to the healer\'s house in Windland Heights — a cutscene triggers.' },
      { step: 3, instruction: 'You have 2 minutes: use Nature\'s Grasp to remove two large logs blocking the doorway; find Marten inside; pick him up and carry him outside to safety.', tip: 'Act fast — the 2-minute timer starts immediately after the cutscene.' },
    ]
  },
  { name: 'Kidnapped Healer', description: 'Ch.2 — The End of Greed arc.', type: 'main', region: 'hernand',
    rewards: ['Standard Inventory Expansion Tool x1'],
    walkthrough: [
      { step: 1, instruction: 'Travel to the bandit camp in Windland Heights. Most enemies along the way can be ridden past.' },
      { step: 2, instruction: 'The kidnapper attacks on arrival — defeat him.' },
      { step: 3, instruction: 'Lock on to Healer Hubert and untie him.' },
    ]
  },
  { name: 'Rebellion or Revolution', description: 'Ch.2 — The End of Greed arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Travel toward Shakatu\'s location in Hernand Highlands — you automatically dismount on approach.' },
      { step: 2, instruction: 'Defend yourself against attacking soldiers; defeat all of them.' },
      { step: 3, instruction: 'Shakatu appears after combat.' },
      { step: 4, instruction: 'Follow Shakatu and talk with him as you walk — the quest completes.' },
    ]
  },
  { name: 'Cheers Echoing From the Edge', description: 'Ch.2 — The End of Greed: Boss fight vs. Kailok the Hornsplitter.', type: 'main', region: 'hernand',
    rewards: ['Sword of the Lord', 'Seal of Greed - Goldleaf Merchant Guild', 'Iron Ore x7'],
    walkthrough: [
      { step: 1, instruction: 'Head to the marked location in Hernand Highlands to encounter Hornsplitter (goblin boss).' },
      { step: 2, instruction: 'Use perfect counters (when the enemy attacks and you see a green glow) followed by quick combos.' },
      { step: 3, instruction: 'Block his sword wave attacks (stamina-consuming); avoid heavy attacks to preserve stamina.' },
      { step: 4, instruction: 'When he enters super armor mode (blue glow), dodge instead of blocking.', tip: 'Bring 40+ healing items — cooked meat is recommended.' },
    ]
  },

  // ─── CHAPTER 3: HOWLING HILL ──────────────────────────────────────────────────────────────────
  // Homestead arc
  { name: 'Old Friend', description: 'Ch.3 — Homestead arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Investigate the back alleys of Hernand — locate a group of people in the alley behind the inn.' },
      { step: 2, instruction: 'Approach them — a cutscene triggers a reunion with Marius and the quest completes.' },
    ]
  },
  { name: 'First Step to Rebuilding', description: 'Ch.3 — Homestead arc: Establish Greymane Camp.', type: 'main', region: 'hernand',
    rewards: ['Camp unlocked', 'Character: Damiane', 'Mount: Brianto', 'Formal Alliance with House Serkis and House Celeste'],
    walkthrough: [
      { step: 1, instruction: 'Speak with Marquis Serkis at his manor.' },
      { step: 2, instruction: 'Follow the soldier outside, then follow them on horseback.' },
      { step: 3, instruction: 'Speak with Marshal Middler at the campsite in Howling Hill.' },
    ]
  },
  { name: 'A Fresh Start', description: 'Ch.3 — Homestead arc: Unlock Camp feature.', type: 'main', region: 'hernand',
    rewards: ['Iron Ore x5'],
    walkthrough: [
      { step: 1, instruction: 'Move three sacks to the highlighted area behind your starting position.' },
      { step: 2, instruction: 'Collect the mallet from a nearby table; strike four tent stakes three times each.' },
      { step: 3, instruction: 'Use a pickaxe to destroy three rocks blocking a wagon; push the wagon into the tent structure.' },
      { step: 4, instruction: 'Use Nature\'s Grasp to lift the banner from the ground and place it in its designated holder.', tip: 'All four tasks can be completed in any order.' },
    ]
  },
  { name: 'Reward for Their Sweat', description: 'Ch.3 — Homestead arc.', type: 'main', region: 'hernand',
    rewards: ['Clear Soup x10'],
    walkthrough: [
      { step: 1, instruction: 'Go to the cooking pot at the mission marker; examine the Clear Soup recipe on the stool to the right.' },
      { step: 2, instruction: 'Access the cooking menu at the pot; switch to soups; locate Modest Clear Soup (requires Tough Meat x1, Barley x1, Water x1 — all on the same stool); craft at least 2 servings.' },
      { step: 3, instruction: 'Approach the workers\' table — a cutscene triggers to complete the quest.' },
    ]
  },
  { name: 'Return of the Comrade', description: 'Ch.3 — Homestead arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Travel to Scrapfold in the Hernand region; find Marius among beggars.' },
      { step: 2, instruction: 'Interact with Marius.' },
      { step: 3, instruction: 'Mount your horse; Marius mounts behind you.' },
      { step: 4, instruction: 'Ride back to the Greymane camp — auto-dismount and a cutscene complete the quest.' },
    ]
  },
  { name: 'Familiar Curses', description: 'Ch.3 — Homestead arc.', type: 'main', region: 'hernand',
    rewards: ['St. Halssius Priest Attire', "St. Halssius Priest's Cloak", "St. Halssius Priest's Leather Footwear", "St. Halssius Priest's Hat"],
    walkthrough: [
      { step: 1, instruction: 'Gain entry to the House of Healing — three options: sneak past guards by climbing roofs while crouched, purchase a St. Halssius Visitor Pass from the Church of Hernand, or buy the Halssius outfit from a merchant for 10 Silver.', tip: 'The easiest entry method is buying the disguise outfit from a merchant for 10 Silver.' },
      { step: 2, instruction: 'Head to the second floor, south wing; locate the man fighting patients.' },
      { step: 3, instruction: 'Follow Yann as he flees across roofs and into a cottage.' },
      { step: 4, instruction: 'Board the Pywell Wagon with him; travel to the Nas River Fishing Dock and proceed to the highlighted location.' },
    ]
  },
  // The Face Behind the Mask arc
  { name: 'Return', description: 'Ch.3 — The Face Behind the Mask arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Navigate to the Greymane campsite (Nas River Fishing Dock area).' },
      { step: 2, instruction: 'Speak with Marius at the table in front of the tent — brief dialogue completes the quest.', tip: 'Stock up on ~50 grilled meat, buy plate armor, and upgrade at the blacksmith before this quest — a difficult boss fight follows in an isolated area.' },
    ]
  },
  { name: 'Traces in the Manor', description: 'Ch.3 — The Face Behind the Mask arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Travel south to Glenbright Manor in the Hernand region.' },
      { step: 2, instruction: 'On arrival, an ambush triggers — defeat the five guards.' },
      { step: 3, instruction: 'Head upstairs to the right; down the hallway through the forward door; find the servant in the left corner and speak with them.' },
    ]
  },
  { name: 'Nonhuman', description: 'Ch.3 — The Face Behind the Mask arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'In the upper floor of Grace Manor, use the Visione to view the "Grace Manor" memory (blue outlines visible in the room).' },
      { step: 2, instruction: 'Exit through the window; turn right; activate your lantern to reveal a yellow tracking line.' },
      { step: 3, instruction: 'Follow the trail toward the endpoint hut, defeating or running past enemy groups along the way.' },
      { step: 4, instruction: 'Enter the hut — the objective completes automatically via cutscene.' },
    ]
  },
  { name: 'Seed of Unease', description: 'Ch.3 — The Face Behind the Mask arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'After the cutscene in the hut, activate your lantern and follow the yellow line to a canyon southwest.' },
      { step: 2, instruction: 'The Reed Devil appears with other enemies — damage him until he disappears.' },
      { step: 3, instruction: 'Continue following the linear canyon path; the Reed Devil reappears — hit him each time he appears.' },
      { step: 4, instruction: 'After the canyon, reach the large open field to the south — this completes the quest and triggers Dance with the Devil.' },
    ]
  },
  { name: 'Dance with the Devil', description: 'Ch.3 — The Face Behind the Mask: Boss fight vs. Reed Devil (Phase 1).', type: 'main', region: 'hernand',
    rewards: ['Sunset Reed Cloth Gloves'],
    walkthrough: [
      { step: 1, instruction: 'Phase 1 — One on One: Learn the Devil\'s attack patterns; parry to build the gauge under the health bar; when full, break the guard and combo. Repeat until health depletes.', tip: 'Bring up to 100 Grilled Meats; upgrade plate armor with ores beforehand.' },
      { step: 2, instruction: 'Phase 2 — Scarecrows: Destroy 5 scarecrows in the arena while avoiding attacks from 4 Devil clones; 3 clones disappear when all scarecrows are destroyed.' },
      { step: 3, instruction: 'Phase 3 — One on Two: Fight the remaining Devil with a second Devil interfering; dodge the new energy wave attack; use same parry-and-combo strategy.' },
    ]
  },
  { name: 'The Face Behind the Mask', description: 'Ch.3 — Boss fight vs. Reed Devil (full encounter).', type: 'main', region: 'hernand', rewards: ['Hernandian Contribution EXP x600', 'Sunset Reed Cloth Gloves'],
    walkthrough: [
      { step: 1, instruction: 'This is the continuation of Dance with the Devil — the fight resumes immediately after the Phase 3 cutscene.' },
      { step: 2, instruction: 'Phase 4 — Unmasked: The Reed Devil drops its disguise. Attacks become faster; a new ground-spike eruption appears — move laterally to avoid it.' },
      { step: 3, instruction: 'Continue the parry-and-combo strategy from Dance with the Devil. His guard-break threshold is reduced — parries charge the gauge faster.', tip: 'Save one healing item for this final phase; the speed increase is significant.' },
      { step: 4, instruction: 'Defeat the Reed Devil to earn Hernandian Contribution EXP x600 and the Sunset Reed Cloth Gloves.' },
    ],
  },
  // Pioneering arc
  { name: 'Hope After the Draught', description: 'Ch.3 — Pioneering arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Speak with the struggling settlers at the objective marker.' },
      { step: 2, instruction: 'Gather or provide the requested supplies to restore their hope.' },
    ]
  },
  { name: 'Scattered Comrades', description: 'Ch.3 — Pioneering arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Track down each scattered Greymane comrade at the marked locations.' },
      { step: 2, instruction: 'Speak with or rescue each comrade to bring them back to camp.' },
    ]
  },
  { name: 'Rumors from the Sawmill', description: 'Ch.3 — Pioneering arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Travel to the Sawmill in Hernand and speak with the workers there.' },
      { step: 2, instruction: 'Investigate the rumors — clear any enemies or resolve the issue at the mill.' },
    ]
  },
  { name: 'A Gentle Touch', description: 'Ch.3 — Pioneering arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Speak with the NPC in need at the objective marker.' },
      { step: 2, instruction: 'Complete the task requiring care — follow the on-screen prompts.' },
    ]
  },
  { name: 'Bustling Hill', description: 'Ch.3 — Pioneering arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Open the map; locate Howling Hill camp; access camp information; go to the Mission List tab; select "Howling Hill Camp Expansion"; dispatch Luke and Ronald.' },
      { step: 2, instruction: 'Wait 18 in-game hours — rest at a bed or campfire for 12 hours, or continue other activities.', tip: 'You can continue with other quests while waiting for the camp expansion to finish.' },
    ]
  },
  { name: 'Greymanes Reunited', description: 'Ch.3 — Pioneering arc: Reunite Greymane members.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Head to the newly expanded camp at Howling Hill.' },
      { step: 2, instruction: 'Enter the highlighted area — a single cutscene triggers, and Chapter 4 begins.' },
    ]
  },

  // ─── CHAPTER 4: THE PRICE OF KNOWLEDGE ───────────────────────────────────────────────────────
  { name: 'The Mysterious Pot', description: 'Ch.4 — Mysterious Iron Pot arc: Find the Kuku Pot crafting item.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Speak with the quest NPC to learn about the Kuku Pot.' },
      { step: 2, instruction: 'Follow the objective marker to locate the Kuku Pot crafting item.' },
    ]
  },
  { name: 'Kilnden Workshop', description: 'Ch.4 — Mysterious Iron Pot arc: Visit the Kilnden Workshop.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Travel to the Kilnden Workshop in Hernand.' },
      { step: 2, instruction: 'Speak with the workshop master to progress the arc.' },
    ]
  },
  { name: 'Kiln Repair in the Kilnden Workshop', description: 'Ch.4 — Mysterious Iron Pot arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Gather the required repair materials indicated by the objective.' },
      { step: 2, instruction: 'Use the materials to repair the kiln in the Kilnden Workshop.' },
    ]
  },
  { name: "The Pot's Use", description: 'Ch.4 — Mysterious Iron Pot arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Return to the quest NPC at the workshop with the completed Kuku Pot.' },
      { step: 2, instruction: 'Use the pot as instructed to complete the arc.' },
    ]
  },
  { name: 'Disturbance at the Arena', description: 'Ch.4 — Daily Life arc: Arena disturbance in Hernand.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Travel to the arena in Hernand.' },
      { step: 2, instruction: 'Investigate the disturbance and defeat any enemies present.' },
    ]
  },
  { name: 'Skilled in Archery', description: 'Ch.4 — Daily Life arc.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Travel to the archery range at the objective marker.' },
      { step: 2, instruction: 'Complete the archery challenge to pass the skill test.' },
    ]
  },
  // Forbidden Knowledge arc
  { name: 'The Words of Alustin', description: 'Ch.4 — Forbidden Knowledge: Begin the Abyss/Scholastone investigation.', type: 'main', region: 'hernand' },
  { name: 'Scholastone', description: 'Ch.4 — Forbidden Knowledge arc.', type: 'main', region: 'hernand' },
  { name: 'On the Right Path', description: 'Ch.4 — Forbidden Knowledge arc.', type: 'main', region: 'hernand' },
  { name: 'Gate to the Otherworld', description: 'Ch.4 — Forbidden Knowledge: Boss fight vs. Tenebrum.', type: 'main', region: 'hernand', rewards: ['Key to the Spire of the Stars'],
    walkthrough: [
      { step: 1, instruction: 'Reach the gate location after completing the Forbidden Knowledge investigation chain.' },
      { step: 2, instruction: 'Boss fight: Tenebrum — an Abyss-element construct that phases in and out of visibility. Only attack when it fully materializes.' },
      { step: 3, instruction: 'Watch for the visual shimmer that precedes its reappearance and position yourself to punish immediately after materialization.', tip: 'Abyss-resistant armor significantly reduces his phase-blast damage.' },
      { step: 4, instruction: 'Defeat Tenebrum to receive the Key to the Spire of the Stars, required for the next quest.' },
    ],
  },
  { name: 'Spire of the Stars', description: 'Ch.4 — Forbidden Knowledge arc.', type: 'main', region: 'hernand' },
  { name: 'Obsession and Madness', description: 'Ch.4 — Forbidden Knowledge arc.', type: 'main', region: 'hernand' },
  { name: 'Casted Shadow', description: 'Ch.4 — Forbidden Knowledge arc.', type: 'main', region: 'hernand' },

  // ─── CHAPTER 5: GUEST UNBIDDEN ────────────────────────────────────────────────────────────────
  // Uninvited Guest arc
  { name: 'Double-sided Invitation', description: 'Ch.5 — Uninvited Guest arc.', type: 'main', region: 'hernand' },
  { name: 'Unwelcomed Guests', description: 'Ch.5 — Uninvited Guest arc.', type: 'main', region: 'hernand' },
  { name: 'Demenissian Delegation', description: 'Ch.5 — Uninvited Guest: Boss fight vs. Kearush the Slayer.', type: 'main', region: 'hernand', rewards: ["The Grove's Thorn", 'Gale I', 'Howling of Chaos'],
    walkthrough: [
      { step: 1, instruction: 'Intercept the Demenissian Delegation at the Hernand meeting location — boss fight begins after the cutscene.' },
      { step: 2, instruction: 'Boss fight: Kearush the Slayer — dual-blade fighter with rapid gap-closing dashes. Dodge his dash laterally, not backward.' },
      { step: 3, instruction: 'His dash leaves a brief opening; punish with a heavy combo or burst skill immediately after.', tip: 'Frost-element attacks deal bonus damage and slow his movement.' },
      { step: 4, instruction: 'At ~40% HP he chains his dash into a follow-up stab — dodge the stab as a separate input after the dash.' },
      { step: 5, instruction: "Defeat Kearush to earn The Grove's Thorn, Gale I, and Howling of Chaos." },
    ],
  },
  { name: 'Exposed Plot', description: 'Ch.5 — Uninvited Guest arc.', type: 'main', region: 'hernand' },
  // Black and White arc
  { name: 'The Missing Seal', description: 'Ch.5 — Black and White arc.', type: 'main', region: 'abyss' },
  { name: 'Crowcaller', description: 'Ch.5 — Black and White: Encounter Draven (first fight).', type: 'main', region: 'abyss' },
  { name: "The Crow's Warning", description: 'Ch.5 — Black and White arc.', type: 'main', region: 'abyss' },
  { name: 'Bloodwind', description: 'Ch.5 — Black and White: Boss fight vs. Crowcaller (second fight, 3 HP bars).', type: 'main', region: 'abyss', rewards: ['Blackwing Leather Armor', 'Blackwing Mask', 'Tauria Curved Sword'],
    walkthrough: [
      { step: 1, instruction: 'Boss fight: Draven (Crowcaller) full encounter — three HP bars. Stock healing items before this fight.' },
      { step: 2, instruction: 'HP Bar 1: Feather projectile volleys and aerial dives. Dodge toward him (not away) on the dive to stay in melee range.', tip: 'Draven telegraphs aerial dives with a screech — begin your dodge on the audio cue.' },
      { step: 3, instruction: 'HP Bar 2: Dark energy blade appears. Block or roll the initial slash; punish the recovery with a burst combo.' },
      { step: 4, instruction: 'HP Bar 3: Full Abyss form with all attacks at higher speed. Use all remaining burst skills and healing items here.' },
      { step: 5, instruction: 'Defeat Crowcaller to earn the Blackwing Leather Armor, Blackwing Mask, and Tauria Curved Sword.' },
    ],
  },
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
  { name: 'Traitor', description: 'Ch.6 — The Unyielding Shields: Boss fight vs. Cassius Morten.', type: 'main', region: 'hernand', rewards: ['Shield of Betrayal'],
    walkthrough: [
      { step: 1, instruction: 'Confront Cassius Morten after the betrayal reveal at the front lines — fight starts after the cutscene.' },
      { step: 2, instruction: 'Boss fight: Cassius Morten — heavy shield-and-sword fighter who blocks most frontal attacks.' },
      { step: 3, instruction: 'Attack from his flanks or behind; he commits to a 2-hit shield bash — sidestep and punish after the second bash.', tip: 'Guard-break charged attacks bypass his shield stance effectively.' },
      { step: 4, instruction: 'Defeat Cassius to receive the Shield of Betrayal, a unique heavy shield.' },
    ],
  },
  { name: 'All Quiet on the Front', description: 'Ch.6 — The Unyielding Shields arc.', type: 'main', region: 'hernand' },
  { name: 'News of Victory', description: 'Ch.6 — The Unyielding Shields arc.', type: 'main', region: 'hernand' },
  { name: 'Return Home', description: 'Ch.6 — The Unyielding Shields arc: Chapter conclusion.', type: 'main', region: 'hernand' },

  // ─── CHAPTER 7: HOMECOMING ────────────────────────────────────────────────────────────────────
  // Morning Mist arc
  { name: 'Ashes of Treachery', description: 'Ch.7 — Morning Mist arc.', type: 'main', region: 'pailune',
    walkthrough: [
      { step: 1, instruction: 'Confront Ludvig in the Pailune highlands after clearing the Dawn arc quests.' },
      { step: 2, instruction: 'Phase 1 — Ludvig: Fast swordsman. Bait his triple-slash combo and counter-attack after the third hit.' },
      { step: 3, instruction: 'Phase 2 — Awakened Ludvig: Dark aura transformation with wider swing arcs. Step back during the awakening animation.', tip: 'The awakening animation lasts ~5 seconds — use the time to recover stamina and use a healing item.' },
      { step: 4, instruction: 'In Phase 2 target the glowing aura points on his body — they take increased damage.' },
    ],
  },
  // Decisive Battle arc
  { name: 'Unleashed Fury', description: 'Ch.7 — Decisive Battle arc.', type: 'main', region: 'pailune' },
  { name: 'The Final Bridge', description: 'Ch.7 — Decisive Battle arc.', type: 'main', region: 'pailune' },
  { name: 'Broken Claws', description: 'Ch.7 — Decisive Battle arc.', type: 'main', region: 'pailune' },
  { name: 'Battle at the Silver Wolf Mountain', description: 'Ch.7 — Decisive Battle: Boss fight vs. Lava Myurdin.', type: 'main', region: 'pailune', rewards: ['Melted Ambition', 'Pailunese Contribution EXP x3000'],
    walkthrough: [
      { step: 1, instruction: 'Reach the summit of Silver Wolf Mountain at the climax of the Decisive Battle sequence.' },
      { step: 2, instruction: 'Boss fight: Lava Myurdin — fire-element giant with ground-slam lava pools and sweeping arm attacks.' },
      { step: 3, instruction: 'Lava pools linger on the ground after slams — keep moving to avoid burn status.', tip: 'Frost-element weapons deal bonus damage and temporarily reduce his attack speed.' },
      { step: 4, instruction: 'At ~50% HP he enters lava-armor phase. Wait for the armor cracks to glow — only attack through the cracks for full damage.' },
      { step: 5, instruction: 'Defeat Lava Myurdin to earn Melted Ambition and 3000 Pailunese Contribution EXP.' },
    ],
  },
  { name: 'Incomplete Victory', description: 'Ch.7 — Decisive Battle arc conclusion.', type: 'main', region: 'pailune' },
  // Twisted Fate arc
  { name: "Ludvig's Whereabouts", description: 'Ch.7 — Twisted Fate arc: Track the surviving Ludvig.', type: 'main', region: 'demeniss',
    walkthrough: [
      { step: 1, instruction: 'Follow the trail of clues to Demeniss — speak with witnesses along the route.' },
      { step: 2, instruction: 'Locate Ludvig\'s last known position and investigate.' },
    ]
  },
  { name: 'Time to Face Justice', description: 'Ch.7 — Twisted Fate: Boss fight vs. One-Armed Ludvig (forced Oongka).', type: 'main', region: 'demeniss',
    walkthrough: [
      { step: 1, instruction: 'This fight forces you to play as Oongka — familiarize yourself with her moveset before engaging.' },
      { step: 2, instruction: 'Boss fight: One-Armed Ludvig — despite fighting one-handed, his sweeping strikes have wide arcs and high damage.' },
      { step: 3, instruction: 'Stay at mid-range to bait his long-range lunge and punish the recovery animation.', tip: "Oongka's ranged abilities are effective here; whittle his HP before spending burst skills." },
    ],
  },

  // ─── CHAPTER 8: BLOOD CORONATION ─────────────────────────────────────────────────────────────
  { name: 'Healing Pailune', description: 'Ch.8 — Ashen Steps arc: Recover from war in Pailune.', type: 'main', region: 'pailune',
    walkthrough: [
      { step: 1, instruction: 'Help the wounded and displaced in Pailune — complete the aid objectives at the marked locations.' },
      { step: 2, instruction: 'Speak with the local leader once all recovery tasks are done.' },
    ]
  },
  { name: 'The Weight of Command', description: 'Ch.8 — Ashen Steps arc.', type: 'main', region: 'pailune',
    walkthrough: [
      { step: 1, instruction: 'Attend the command meeting — speak with your officers.' },
      { step: 2, instruction: 'Make the required decisions and travel to the designated location to advance.' },
    ]
  },
  // To Demeniss arc
  { name: 'The Road to Demeniss', description: 'Ch.8 — To Demeniss arc: Travel to the capital.', type: 'main', region: 'demeniss',
    walkthrough: [
      { step: 1, instruction: 'Set out from Pailune toward the Demeniss capital — follow the road marker.' },
      { step: 2, instruction: 'Deal with any enemy patrols encountered along the route.' },
    ]
  },
  { name: 'Where the Wind Guides You', description: 'Ch.8 — To Demeniss: Boss fight vs. Gregor the Halberd of Carnage.', type: 'main', region: 'demeniss',
    walkthrough: [
      { step: 1, instruction: 'Engage Gregor on the road to Demeniss — fight begins after the encounter cutscene.' },
      { step: 2, instruction: 'Boss fight: Gregor the Halberd of Carnage — enormous halberd with wide horizontal sweeps and thrust attacks.' },
      { step: 3, instruction: "Stay inside his reach during combos — the halberd's sweep hits at the tip, so up close many attacks miss.", tip: 'Attack immediately after his 3-hit halberd combo ends for the safest damage window.' },
    ],
  },
  { name: 'The Cursed Knight', description: 'Ch.8 — To Demeniss: Boss fight vs. Fortain the Cursed Knight.', type: 'main', region: 'demeniss',
    walkthrough: [
      { step: 1, instruction: 'Confront Fortain the Cursed Knight at the gates of Demeniss after defeating Gregor.' },
      { step: 2, instruction: 'Boss fight: Fortain — heavily armored knight whose curse causes unpredictable attack bursts.' },
      { step: 3, instruction: 'When his armor begins to glow, roll away immediately to dodge the AoE curse burst.', tip: 'Shock-element attacks can interrupt his curse-charge animation.' },
      { step: 4, instruction: 'After each curse burst he is briefly stunned — use this window for a full burst combo.' },
    ],
  },

  // ─── CHAPTER 9: THE SAGE OF THE DESERT ──────────────────────────────────────────────────────
  { name: 'Into the Red Sands', description: 'Ch.9 — Journey into the Crimson Desert for the first time.', type: 'main', region: 'desert',
    walkthrough: [
      { step: 1, instruction: 'Travel south from Demeniss into the Crimson Desert — follow the route marker.' },
      { step: 2, instruction: 'Reach the first desert waypoint; your mount gains the desert heat resistance needed to proceed.', tip: 'Bring Desert Charger or another heat-resistant mount for this region.' },
    ]
  },
  { name: 'The Sage of the Desert', description: 'Ch.9 — Seek enlightenment from a desert hermit.', type: 'main', region: 'desert',
    walkthrough: [
      { step: 1, instruction: 'Navigate deep into the Crimson Desert to locate the hermit sage at the marked oasis.' },
      { step: 2, instruction: 'Speak with the Sage — complete his dialogue to receive his teaching.' },
    ]
  },
  { name: 'Trial of the Sands', description: 'Ch.9 — Spiritual trial in the desert wastes.', type: 'main', region: 'desert',
    walkthrough: [
      { step: 1, instruction: 'Accept the Sage\'s trial — you are placed in a spiritual challenge arena in the desert.' },
      { step: 2, instruction: 'Complete the trial objectives (combat or puzzle based) to prove your worth and earn the Sage\'s guidance.' },
    ]
  },
  { name: 'Echoes Beneath the Dunes', description: 'Ch.9 — Discover ancient secrets buried under the desert.', type: 'main', region: 'desert',
    walkthrough: [
      { step: 1, instruction: 'Follow the Sage\'s directions to a specific dune field — use your lantern to reveal buried ruins.' },
      { step: 2, instruction: 'Excavate and enter the ruins; investigate the ancient secrets within to conclude Chapter 9.' },
    ]
  },

  // ─── CHAPTER 10: COUNTERATTACK ──────────────────────────────────────────────────────────────
  { name: 'Rally the Banners', description: 'Ch.10 — Unite all allied factions for war.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Travel between faction leaders in Hernand — speak with each to secure their alliance.' },
      { step: 2, instruction: 'Return to Greymane Camp once all factions have committed.' },
    ]
  },
  { name: 'The War Council', description: 'Ch.10 — Strategic planning session.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Attend the War Council at Greymane Camp.' },
      { step: 2, instruction: 'Participate in the strategy meeting — a cutscene locks in the battle plan.' },
    ]
  },
  { name: 'Siege of the Black Fortress', description: 'Ch.10 — Large-scale battle against Black Bear stronghold.', type: 'main', region: 'pailune',
    walkthrough: [
      { step: 1, instruction: 'Lead the siege assault on the Black Fortress — break through the outer gate.' },
      { step: 2, instruction: 'Fight through enemy defenders in each section of the fortress.' },
      { step: 3, instruction: 'Reach the fortress core to complete the siege.' },
    ]
  },
  { name: 'Breaking the Line', description: 'Ch.10 — Push through enemy defenses.', type: 'main', region: 'pailune',
    walkthrough: [
      { step: 1, instruction: 'Push through the final enemy defensive line outside the fortress.' },
      { step: 2, instruction: 'Defeat all enemy officers holding the line to complete the breakthrough.' },
    ]
  },

  // ─── CHAPTER 11: TRUTH AND REALITY ──────────────────────────────────────────────────────────
  { name: 'Shattered Illusions', description: 'Ch.11 — Revelations about the Abyss and Pywel.', type: 'main', region: 'abyss',
    walkthrough: [
      { step: 1, instruction: 'Enter the Abyss — follow the path to a major revelation cutscene.' },
      { step: 2, instruction: 'Respond to the aftermath — fight through Abyss enemies drawn by the chaos.' },
    ]
  },
  { name: 'The Price of Truth', description: 'Ch.11 — Confrontation with hidden forces.', type: 'main', region: 'abyss',
    walkthrough: [
      { step: 1, instruction: 'Track down the hidden force behind the Abyss manipulations.' },
      { step: 2, instruction: 'Confront and defeat them — a significant story battle with multiple phases.' },
    ]
  },
  { name: 'Wings of Defiance', description: 'Ch.11 — Unlock Blackstar Dragon mount.', type: 'main', region: 'abyss',
    walkthrough: [
      { step: 1, instruction: 'Reach the Abyss summit area following the Chapter 11 objective.' },
      { step: 2, instruction: 'Complete the story event to unlock the Abyssal Dragon mount.' },
    ]
  },

  // ─── CHAPTER 12: THE ABYSS ─────────────────────────────────────────────────────────────────
  { name: 'Descent into Providence', description: 'Ch.12 — Enter the final Abyss dimension.', type: 'main', region: 'abyss' },
  { name: 'Closing the Rifts', description: "Ch.12 — Fulfill Gian's final wish by sealing the Rifts.", type: 'main', region: 'abyss' },
  { name: 'The Final Stand', description: 'Ch.12 — Final boss encounter vs. Hexe Marie.', type: 'main', region: 'abyss', rewards: ['Deep Abyss Core'],
    walkthrough: [
      { step: 1, instruction: 'Reach Hexe Marie at the heart of the final Abyss dimension after completing Closing the Rifts. Bring maximum healing items.' },
      { step: 2, instruction: 'Phase 1: Hexe Marie casts Abyss magic projectile volleys and melee combos. Dodge her homing orbs late — they curve and self-correct if you dodge too early.', tip: 'This is the hardest fight in the game — equip your best gear and bring all consumables.' },
      { step: 3, instruction: 'Phase 2 (at ~65% HP): Arena expands; she adds a sweeping beam attack. Move perpendicular to the beam — not away from it.' },
      { step: 4, instruction: 'Phase 3 (at ~30% HP): Full Abyss form with airborne dive-bomb strikes added. Save all burst skills and limit breaks for this phase.' },
      { step: 5, instruction: 'Defeat Hexe Marie to earn the Deep Abyss Core and complete the main story of Crimson Desert.' },
    ],
  },

  // ─── EPILOGUE ───────────────────────────────────────────────────────────────────────────────
  { name: "Journey's End", description: 'Epilogue: Post-game resolution. The fate of the Greymanes and Pywel.', type: 'main', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Return to Greymane Camp one final time.' },
      { step: 2, instruction: 'Speak with your companions — the Epilogue cutscene plays, resolving the story of the Greymanes and the fate of Pywel.' },
    ]
  },

  // ─── FACTION QUESTS ───────────────────────────────────────────────────────────────────────────
  // Greymanes — Scattered Embers
  { name: 'Record of the Greymanes', description: 'Greymane faction: Document the mercenary company\'s history.', type: 'faction', region: 'hernand' },
  { name: "The Greymanes' New Fangs", description: 'Greymane faction: Pet taming tutorial — a stray dog becomes your companion.', type: 'faction', region: 'hernand' },
  { name: 'Strongbox with Wheels', description: 'Greymane faction.', type: 'faction', region: 'hernand' },
  { name: 'Brightening the Spirits', description: 'Greymane faction.', type: 'faction', region: 'hernand',
    rewards: ['Grey Dye x1'],
  },
  { name: 'Change to Make a Fortune', description: 'Greymane faction.', type: 'faction', region: 'hernand' },
  { name: 'The First Steps of Little Marksmen', description: 'Greymane faction.', type: 'faction', region: 'hernand' },
  { name: 'Words Left by the Riverside', description: 'Greymane faction.', type: 'faction', region: 'hernand' },
  { name: 'Embers of Return', description: 'Greymane faction — Grounds of the Sunrise arc.', type: 'faction', region: 'hernand' },
  { name: 'A Rumor in Ivynook', description: 'Greymane faction — Grounds of the Sunrise arc.', type: 'faction', region: 'hernand' },
  { name: 'For a Better Tomorrow', description: 'Greymane faction — Grounds of the Sunrise arc.', type: 'faction', region: 'hernand' },
  // House Celeste bounties (8 total)
  { name: 'Outlaws in Hernand — Jeffrey', description: 'House Celeste bounty: Capture Jeffrey, a wandering pickpocket in the City of Hernand.', type: 'faction', region: 'hernand',
    rewards: ['Silver x1', 'Mask (crime disguise) x1', 'House Celeste Contribution EXP +100'],
    walkthrough: [
      { step: 1, instruction: 'Speak with Guard Captain Pedro at the constabulary to learn the bounty system.' },
      { step: 2, instruction: 'Take the bounty notice for Jeffrey.' },
      { step: 3, instruction: 'Find Jeffrey in the City of Hernand (bounty icon on minimap).' },
      { step: 4, instruction: 'Hit him until the tie-up prompt appears — do NOT kill him; tie him up.', tip: 'All bounties must be turned in alive for the full silver reward.' },
      { step: 5, instruction: 'Deliver him to the constabulary.' },
    ]
  },
  { name: 'Outlaws in Hernand — Simon de Montfort', description: 'House Celeste bounty: Simon de Montfort is located at Scholastone in the Everfrost Basin and will flee immediately on approach.', type: 'faction', region: 'hernand',
    rewards: ['Silver x8'],
    walkthrough: [
      { step: 1, instruction: 'Collect the bounty poster in Hernand (Chapter 2+).' },
      { step: 2, instruction: 'Travel to Scholastone, Everfrost Basin.' },
      { step: 3, instruction: 'Sprint and tackle immediately upon reaching Simon — he runs fast and flees on sight.', tip: 'Sprint tackle immediately — do not approach slowly or he will outrun you.' },
      { step: 4, instruction: 'Transport him by carrying or placing on a horse.' },
      { step: 5, instruction: 'Turn him in at a guard station or jail.' },
    ]
  },
  { name: 'Outlaws in Hernand — Alessio', description: 'House Celeste bounty: Alessio is located at the Ironwood Bandit Camp in Greenfield Highlands.', type: 'faction', region: 'hernand',
    rewards: ['Silver x12'],
    walkthrough: [
      { step: 1, instruction: 'Collect the bounty poster (Chapter 2+).' },
      { step: 2, instruction: 'Travel to Ironwood Bandit Camp in Greenfield Highlands — expect additional bandits in the area.' },
      { step: 3, instruction: 'Defeat Alessio in combat.' },
      { step: 4, instruction: 'Capture and surrender to the guard station.' },
    ]
  },
  { name: 'Outlaws in Hernand — Blix', description: 'House Celeste bounty: Blix is at Unicorn Cliff with a group of goblins. Only present before 1:00 PM in-game time.', type: 'faction', region: 'hernand',
    rewards: ['Silver x15 (alive)', 'House Celeste Contribution EXP +200'],
    walkthrough: [
      { step: 1, instruction: 'Collect the bounty poster near Nas Riverside (Chapter 2+).' },
      { step: 2, instruction: 'Travel to Unicorn Cliff before 1:00 PM in-game time.', tip: 'Blix only appears before 1:00 PM in-game time. If you miss the window, rest until morning and try again.' },
      { step: 3, instruction: 'Defeat Blix; tackle and punch until the tie option appears. Use a mask/disguise to avoid triggering immediate combat.' },
      { step: 4, instruction: 'Transport to and surrender at the Hernand constabulary.' },
    ]
  },
  { name: 'Outlaws in Hernand — Bianca', description: 'House Celeste bounty: Bianca is hiding in the kitchen of the Church of Hernand.', type: 'faction', region: 'hernand',
    rewards: ['Silver x5', 'House Celeste Contribution EXP +300'],
    walkthrough: [
      { step: 1, instruction: 'Collect the bounty poster near Beggar\'s End / lamp posts (Chapter 2+).' },
      { step: 2, instruction: 'Enter the Church of Hernand; go to the right room; proceed to the kitchen.' },
      { step: 3, instruction: 'Bianca will flee — chase her down.' },
      { step: 4, instruction: 'Tackle and tie her up.' },
      { step: 5, instruction: 'Place her on your mount; deliver to the guards.' },
    ]
  },
  { name: 'Outlaws in Hernand — Salvatore', description: 'House Celeste bounty: Salvatore is located in Sunset Valley at the southernmost part of Hernand.', type: 'faction', region: 'hernand',
    rewards: ['Silver x12'],
    walkthrough: [
      { step: 1, instruction: 'Collect the bounty poster (Chapter 2+).' },
      { step: 2, instruction: 'Travel to Sunset Valley.' },
      { step: 3, instruction: 'Find and capture Salvatore.' },
      { step: 4, instruction: 'Turn him in at a guard station.' },
    ]
  },
  { name: 'Outlaws in Hernand — Warren', description: 'House Celeste bounty: Warren is in Pororin at the southern part of Deepwoods. Requires completing The Unreachable Village first.', type: 'faction', region: 'hernand',
    rewards: ['Silver x25'],
    walkthrough: [
      { step: 1, instruction: 'Collect the bounty poster (Chapter 2+).' },
      { step: 2, instruction: 'Complete "The Unreachable Village" quest to unlock access to the Pororin Forest area.', tip: 'You must complete The Unreachable Village before you can access this area.' },
      { step: 3, instruction: 'Travel to Pororin, southern Deepwoods.' },
      { step: 4, instruction: 'Find and restrain Warren.' },
      { step: 5, instruction: 'Surrender to the guard station.' },
    ]
  },
  { name: 'Outlaws in Hernand — Billy', description: 'House Celeste bounty.', type: 'faction', region: 'hernand',
    rewards: ['Silver x2'],
  },
  // House Roberts
  { name: 'First Trial of Trust', description: 'House Roberts faction quest — Bluemont Manor. Start by speaking with the House Roberts servant near Bluemont Manor, south of the Notice Board.', type: 'faction', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Speak with the man near Bluemont Manor.' },
      { step: 2, instruction: 'Speak with the caretaker at Muckroot Ranch (sitting on a bench by a tree).' },
      { step: 3, instruction: 'Defeat enemies around the cask house at Bluemont Cask House.' },
    ]
  },
  { name: 'Troubled Count', description: 'House Roberts faction quest.', type: 'faction', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Talk to Erich outside Bluemont Manor.' },
      { step: 2, instruction: 'Head inside, up the stairs, and speak with Count Roberts on the 2nd floor.' },
    ]
  },
  { name: 'Stolen Quarry', description: 'House Roberts faction quest.', type: 'faction', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Travel north of Goldleaf Trading Post to Marni\'s Excavatron.' },
      { step: 2, instruction: 'Defeat the Excavatron.', tip: 'Switching to Damiane is recommended for her agility in this fight.' },
      { step: 3, instruction: 'Defeat remaining Bleed Bandits at Karin Quarry until the progress bar reaches zero.' },
    ]
  },
  { name: 'Sealed in Stone', description: 'House Roberts faction quest.', type: 'faction', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Talk to Erich in Karin Quarry to receive the Crane Control Room Key.' },
      { step: 2, instruction: 'Operate the elevator to reach the control room.' },
      { step: 3, instruction: 'Use crane controls to extract a buried relic from stone.' },
    ]
  },
  { name: "The Count's Honor", description: 'House Roberts faction quest — conclusion of the Estate in Dismay chain.', type: 'faction', region: 'hernand',
    rewards: ['Gold Vein Map x1', 'Mining Knuckledrill x1', 'Azurite x3', 'Bloodstones x3', 'Engraved Gold Earring x1'],
    walkthrough: [
      { step: 1, instruction: 'Return to Count Roberts at Bluemont Manor to complete the chain.' },
    ]
  },
  { name: 'Strange Red Smoke', description: 'House Roberts faction quest.', type: 'faction', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Speak with Count Roberts.' },
      { step: 2, instruction: 'Travel to investigate the red smoke phenomenon near Fort Perwin in eastern Hernand.' },
    ]
  },
  { name: 'The Crimson Nightmare', description: 'House Roberts faction quest: Boss fight vs. Crimson Nightmare at Fort Perwin.', type: 'faction', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Preparation: Farm normal enemies around Fort Perwin for a Crude Devil Mask or Scarlet Blades Gas Mask (grants Confusion Immunity). Bring Hearty Grilled Meat.', tip: 'Confusion Immunity from the mask is highly recommended for this fight.' },
      { step: 2, instruction: 'At the boss: Ignore the Crimson Nightmare initially; defeat the surrounding foot soldiers first.' },
      { step: 3, instruction: 'To stun the boss: Stand under it, jump, then use Force Palm — the boss cannot be damaged by regular attacks until stunned.' },
      { step: 4, instruction: 'Once stunned, the boss falls — deal heavy damage while it is grounded.' },
      { step: 5, instruction: 'Repeat: stun with aerial Force Palm, attack while down, until defeated.' },
    ]
  },
  { name: 'Veil of the Red Smoke', description: 'House Roberts faction quest conclusion.', type: 'faction', region: 'hernand',
    rewards: ["Freya's Elixir x1", "Apollonia's Lesser Elixir x2", "Melliara's Lesser Elixir x2", 'Bulging Copper Pouch x3'],
  },
  // Antumbra Order (sanctum chain) — unlock by meeting Elowen the Witch at Alfonso Estate (Chapter 5+)
  { name: 'Sanctum of Temperance', description: 'Antumbra Order: Clear the Sanctum of Temperance. Unlock by meeting Elowen the Witch at Alfonso Estate.', type: 'faction', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Defeat religious zealots guarding the area.' },
      { step: 2, instruction: 'Locate the missing pillar top on the southwest side, behind vine-covered tower entrance — burn vines with fire arrows or Blinding Flash ability, or walk through taking damage.' },
      { step: 3, instruction: 'Use Axiom Force to extract the "Fusion Reactor Core: III-3" piece into your kuku pot.' },
      { step: 4, instruction: 'Return to the pillars; slot it back into place with a jumping Force Palm.' },
      { step: 5, instruction: 'On the north side, stand on unstable ground above a square hole; retrieve the cube below.' },
      { step: 6, instruction: 'Force Palm the cube into place — the machine activates.' },
    ]
  },
  { name: 'Sanctum of Penitence', description: 'Antumbra Order: Clear the Sanctum of Penitence.', type: 'faction', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Defeat all Antumbra worshippers at the sanctum.' },
      { step: 2, instruction: 'Locate the missing cube top in the rubble on the south side of the ruins.' },
      { step: 3, instruction: 'Use Axiom Force to retrieve it; position it on the broken pillar.' },
      { step: 4, instruction: 'Climb on top and perform a jumping Force Palm to secure it.' },
    ]
  },
  { name: 'Sanctum of Benediction', description: 'Antumbra Order: Clear the Sanctum of Benediction.', type: 'faction', region: 'hernand',
    walkthrough: [
      { step: 1, instruction: 'Clear enemies in the area.' },
      { step: 2, instruction: 'Locate the first stone pillar top nearby; use Axiom Force to bring it to the pillar; place it on top; climb up and use Aerial Force Palm to push it into place.' },
      { step: 3, instruction: 'Light the lantern to the right of the main entrance of the central structure to open the door.' },
      { step: 4, instruction: 'Retrieve the second pillar top from inside.' },
      { step: 5, instruction: 'Place it on the other incomplete pillar; use Force Palm to lock it in.' },
    ]
  },
  { name: "Antumbra's Sword", description: "Antumbra Order: Final sanctum boss fight vs. Antumbra's Sword at the Sanctum of Absolution.", type: 'faction', region: 'hernand',
    rewards: ['Abyss Artifact x1', 'Vessel of Dark Pursuit', 'Kuku weapon blueprints'],
    walkthrough: [
      { step: 1, instruction: 'Prepare: bring significant healing food (Hearty Grilled Meat); ensure health and stamina are leveled up.', tip: 'Do not rush this fight — it is a war of attrition.' },
      { step: 2, instruction: 'Use stab moves for passive bleed damage.' },
      { step: 3, instruction: 'When the boss powers up, retreat immediately — the duplicate ground pound can one-shot you.' },
      { step: 4, instruction: 'Wait for each attack chain to end; then hit with a strong swing + stab twice.' },
      { step: 5, instruction: 'Use perfect blocks and dodges; exploit edge positioning for stun opportunities.' },
      { step: 6, instruction: 'After the boss, retrieve the pillar piece from the room south of the arena.' },
      { step: 7, instruction: 'Find the power cube by smashing clay pots in the corridor.' },
      { step: 8, instruction: 'Slam the cube into the machine to complete the sanctum.' },
    ]
  },
  // Pailune Militia
  { name: 'Shadows of Beasts', description: 'Pailune Militia faction quest.', type: 'faction', region: 'pailune' },
  { name: 'Lord of the Forgotten Castle', description: 'Pailune Militia: Boss fight vs. Saigord the Staglord.', type: 'faction', region: 'hernand', rewards: ["Staglord's Shield"] },
  // Beighen Tribe
  { name: 'The Frostwarden', description: 'Beighen Tribe faction quest — Pailune area.', type: 'faction', region: 'pailune' },
  // Witches
  { name: 'The Witch of Wisdom', description: 'Witches faction quest. Meet Elowen the Witch at Alfonso Estate to begin the Antumbra sanctum chain. After completing all four sanctums, return to Elowen for the final reward.', type: 'faction', region: 'hernand',
    rewards: ['Blue Lavender x20', 'Peony x20', 'Small Bone x20'],
  },
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
// Verified against: game8.co, Fextralife wiki, crimsondb.gg,
// crimsondesert.gg, PC Gamer, Steam community guides, GameSpot
// ═══════════════════════════════════════

export const MOUNTS: Mount[] = [
  // ── Permanent Horses (8) ──────────────────
  { name: 'Herspia', category: 'horse', mountType: 'permanent', region: 'hernand', speed: 55, combat: 10, stamina: 60, special: 'Reliable starter horse; summon via whistle or [H] key', acquisition: "Story quest 'Unknown Space' after prologue; also tameable in the wild" },
  { name: 'Brianto', category: 'horse', mountType: 'permanent', region: 'hernand', speed: 50, combat: 15, stamina: 65, special: "Damiane's default horse; well-rounded stats for early game", acquisition: "Damiane's mount from Chapter 3; also tameable in the wild" },
  { name: 'Priden', category: 'horse', mountType: 'permanent', region: 'multiple', speed: 55, combat: 10, stamina: 60, special: 'Balanced all-purpose wild horse breed', acquisition: 'Capture in the wild and register at any stable' },
  { name: 'Elantrima', category: 'horse', mountType: 'permanent', region: 'multiple', speed: 45, combat: 10, stamina: 75, special: 'High vitality cargo horse with extra inventory slot; learns Lateral Movement skill', acquisition: 'Tame in the wild or purchase from stables; built for carrying goods' },
  { name: 'Numont', category: 'horse', mountType: 'permanent', region: 'multiple', speed: 55, combat: 10, stamina: 60, special: 'Standard wild horse breed with solid all-around performance', acquisition: 'Capture in the wild and register at any stable' },
  { name: 'Royler', category: 'horse', mountType: 'permanent', region: 'pailune', speed: 90, combat: 10, stamina: 90, special: 'Legendary white horse; fastest speed and highest stamina of all horses', acquisition: 'Tame at Silverwolf Mountains in Pailune, near Snowgrass Hearth; requires Stamina level 8+' },
  { name: 'Rokade', category: 'horse', mountType: 'permanent', region: 'hernand', speed: 70, combat: 15, stamina: 70, special: 'Legendary horse; highest health of all horses, the tankiest mount option', acquisition: 'Tame deep in the southern Steel Mountains of Grace Estate, near Spire of Insight' },
  { name: 'Camora', category: 'horse', mountType: 'permanent', region: 'desert', speed: 70, combat: 25, stamina: 70, special: 'Legendary red horse; highest attack and defense of all horses', acquisition: 'Tame in Redtree Forest near Red River in the southern Crimson Desert' },

  // ── Story / Special Permanent Mounts (2) ──
  { name: 'Blackstar', category: 'dragon', mountType: 'permanent', region: 'multiple', speed: 85, combat: 90, stamina: 50, special: 'Summonable dragon with Fireball and Fire Breath attacks; 15-minute ride duration, 50-minute cooldown', acquisition: "Unlocked at end of Chapter 11 after 'Master of a Forgotten Land' mission" },
  { name: 'ATAG', category: 'mech', mountType: 'permanent', region: 'delesyia', speed: 60, combat: 95, stamina: 80, special: 'All-Terrain Armored Gear; fires missiles and bullets, melee arm attacks', acquisition: 'Unlocked during Chapter 10 siege mission' },

  // ── Vehicles (2) ──────────────────────────
  { name: 'Pywel Wagon', category: 'vehicle', mountType: 'vehicle', region: 'multiple', speed: 30, combat: 0, stamina: 90, special: 'Horse-drawn cargo wagon for hauling goods across regions', acquisition: 'Steal from NPCs or craft via Brice (Wagon Master) dispatch mission at Howling Hill camp' },
  { name: 'Cloudcart', category: 'vehicle', mountType: 'vehicle', region: 'multiple', speed: 50, combat: 0, stamina: 80, special: 'Hot air balloon for aerial travel and reconnaissance', acquisition: 'Craft via Engineer dispatch mission after discovering Emberwind Workshop' },

  // ── Temporary Mounts: Bears (2) ───────────
  { name: 'Brown Bear', category: 'bear', mountType: 'temporary', region: 'multiple', speed: 40, combat: 80, stamina: 75, special: 'Claw swipes, bite attacks, and body slams without rider input', acquisition: 'Stagger a wild bear with enough damage until it stops moving, then mount when prompt appears; despawns on dismount' },
  { name: 'Clawed Bear', category: 'bear', mountType: 'temporary', region: 'hernand', speed: 45, combat: 85, stamina: 80, special: 'Black Bear faction war mount; stronger combat abilities than wild bears', acquisition: 'Defeat Black Bear faction soldiers and mount their bear before it flees' },

  // ── Temporary Mounts: Predators (4) ───────
  { name: 'Wolf', category: 'predator', mountType: 'temporary', region: 'multiple', speed: 75, combat: 50, stamina: 55, special: 'Fast and agile with flanking maneuvers; quicker than bears', acquisition: 'Stagger a wild wolf with damage, then mount when prompt appears; despawns on dismount' },
  { name: 'Lion', category: 'predator', mountType: 'temporary', region: 'demeniss', speed: 70, combat: 65, stamina: 55, special: 'Powerful predator mount with lunging attacks', acquisition: 'Steal from The Laughing Marionette circus in Demeniss' },
  { name: 'Tiger', category: 'predator', mountType: 'temporary', region: 'multiple', speed: 70, combat: 70, stamina: 55, special: 'Fast, aggressive predator mount with powerful swipe attacks', acquisition: 'Stagger a wild tiger with damage, then mount when prompt appears; despawns on dismount' },
  { name: 'Hyena', category: 'predator', mountType: 'temporary', region: 'hernand', speed: 65, combat: 40, stamina: 50, special: 'Quick and agile scavenger mount (Helms Hyena variant)', acquisition: 'Stagger a wild hyena with damage, then mount when prompt appears; despawns on dismount' },

  // ── Temporary Mounts: Birds (2) ───────────
  { name: 'Kuku Bird', category: 'bird', mountType: 'temporary', region: 'pailune', speed: 80, combat: 20, stamina: 50, special: 'Very fast flightless bird; runs rapidly once its rider is defeated', acquisition: 'Defeat Blinding Arrow soldiers in Steel Mountains, then chase and mount their Kuku Bird Hatchling before it escapes' },
  { name: 'Ibis', category: 'bird', mountType: 'temporary', region: 'multiple', speed: 60, combat: 10, stamina: 45, special: 'Large wading bird; one of the shortest-duration temporary mounts', acquisition: 'Approach and mount wild ibises; despawns within about a minute of riding' },

  // ── Temporary Mounts: Beasts (7) ──────────
  { name: 'Cow', category: 'beast', mountType: 'temporary', region: 'hernand', speed: 30, combat: 15, stamina: 70, special: 'Slow but sturdy farmstead livestock mount', acquisition: 'Ride farm livestock directly at farmsteads throughout Pywel; no combat required' },
  { name: 'Camel', category: 'beast', mountType: 'temporary', region: 'desert', speed: 50, combat: 15, stamina: 80, special: 'Desert-adapted mount with good stamina; saddled variants from NPCs', acquisition: 'Defeat NPC camel riders in the Crimson Desert, then catch and mount the saddled camel' },
  { name: 'Buffalo', category: 'beast', mountType: 'temporary', region: 'hernand', speed: 35, combat: 45, stamina: 85, special: 'Large and powerful with very high stamina; slow but tough', acquisition: 'Stagger a wild buffalo with damage, then mount when prompt appears; despawns on dismount' },
  { name: 'Elephant', category: 'beast', mountType: 'temporary', region: 'multiple', speed: 30, combat: 50, stamina: 90, special: 'Massive mount with the highest stamina of any temporary mount', acquisition: 'Stagger an elephant with damage, then mount when prompt appears; despawns on dismount' },
  { name: 'Ibex', category: 'beast', mountType: 'temporary', region: 'pailune', speed: 55, combat: 15, stamina: 65, special: 'Mountain goat that handles rocky and elevated terrain well', acquisition: 'Stagger a wild ibex with damage, then mount when prompt appears; despawns on dismount' },
  { name: 'Rosehorn Deer', category: 'beast', mountType: 'temporary', region: 'multiple', speed: 70, combat: 10, stamina: 55, special: 'Elegant, fast deer mount with distinctive antlers', acquisition: 'Stagger a Rosehorn Deer with damage, then mount when prompt appears; despawns on dismount' },
  { name: 'Boar', category: 'beast', mountType: 'temporary', region: 'hernand', speed: 50, combat: 55, stamina: 70, special: 'Aggressive mount with charging attacks (Black-Maned Boar variant)', acquisition: 'Stagger a wild boar with damage, then mount when prompt appears; despawns on dismount' },

  // ── Temporary Mounts: Reptiles (2) ────────
  { name: 'Red-Feathered Raptor', category: 'reptile', mountType: 'temporary', region: 'desert', speed: 80, combat: 45, stamina: 50, special: 'Fastest temporary land combat mount; ideal for hit-and-run tactics', acquisition: 'Defeat hostile NPC raptor riders in the Crimson Desert, then mount the raptor before it escapes' },
  { name: 'Giant Iguana', category: 'reptile', mountType: 'temporary', region: 'desert', speed: 40, combat: 15, stamina: 70, special: 'Docile reptile found in desert towns; no combat needed to mount', acquisition: 'Approach and ride docile iguanas in Crimson Desert towns; typically found near NPCs' },
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
