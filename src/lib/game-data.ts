import type {
  Skill, Collectible, Boss, Quest, Weapon, Recipe, RegionInfo,
  Character, CollectibleCategory, Mount, Activity, CampFacility, Enemy,
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
    id: 'pailune', name: 'Pailune', subtitle: 'Northern Highlands / Greymane Homeland',
    description: 'Green highlands and rugged terrain give way to snowy mountain peaks. Open grasslands where wild horses roam lead to treacherous frozen passes. The ancestral home of the Greymanes, once unified under the great leader Gian.',
    color: '#5B8FA8', features: ['Highlands', 'Mountains', 'Grasslands', 'Greymane HQ', 'Wildlife'],
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
  // Added 2026-03-15 via apply-data task
  {
    id: 'abyss', name: 'The Abyss', subtitle: 'Otherworldly Dimension / Source of Abyss Power',
    description: 'A mysterious realm brimming with secrets and untold power. This otherworldly dimension lies beyond the known world and is tied to the dark magic threatening Pywel. Home to the Library of Providence and the dreaded Hexe Marie.',
    color: '#1A0A2E', features: ['Library of Providence', 'Skyloop Bridge', 'Abyss Magic', 'Mysteries'],
  },
];

// ═══════════════════════════════════════
// SKILLS PER CHARACTER
// ═══════════════════════════════════════

export const SKILLS: Skill[] = [
  // ─── KLIFF ──────────────────────────────────────────────────────────────────
  // KLIFF — STAMINA BRANCH (Blue) — Armed Combat cluster
  { id: 'k-a1', name: 'Armed Combat Rank 1', cost: '1 Artifact', branch: 'Stamina', cluster: 'Armed Combat', character: 'kliff', description: 'Basic weapon strikes with sword and shield.' },
  { id: 'k-a2', name: 'Armed Combat Rank 2', cost: '1 Artifact', branch: 'Stamina', cluster: 'Armed Combat', character: 'kliff', description: 'Unlocks Evasive Slash — cancel a dodge into a cutting strike.' },
  { id: 'k-a3', name: 'Armed Combat Rank 3', cost: '1 Artifact', branch: 'Stamina', cluster: 'Armed Combat', character: 'kliff', description: 'Unlocks Charge — shield rush that staggers enemies.' },
  { id: 'k-a4', name: 'Armed Combat Rank 4', cost: '1 Artifact', branch: 'Stamina', cluster: 'Armed Combat', character: 'kliff', description: 'Enhanced follow-up attack combos.' },
  { id: 'k-a5', name: 'Armed Combat Rank 5', cost: '1 Artifact', branch: 'Stamina', cluster: 'Armed Combat', character: 'kliff', description: 'Unlocks Rush — powerful counter strike executed after blocking.' },
  { id: 'k-a6', name: 'Forward Slash', cost: '1 Artifact', branch: 'Stamina', cluster: 'Armed Combat', character: 'kliff', description: 'Heavy forward swing (3 ranks). Each rank adds a follow-up strike for a 3-hit combo.' },
  { id: 'k-a7', name: 'Shield Bash', cost: '1 Artifact', branch: 'Stamina', cluster: 'Armed Combat', character: 'kliff', description: 'Counter with a powerful shield bash to stagger enemies and open attack windows.' },
  { id: 'k-a8', name: 'Turning Slash', cost: '1 Artifact', branch: 'Stamina', cluster: 'Armed Combat', character: 'kliff', description: 'Spinning power attack (3 ranks). Costs 10 Spirit. Higher ranks extend the spin arc.' },
  { id: 'k-a9', name: 'Stab', cost: '1 Artifact', branch: 'Stamina', cluster: 'Armed Combat', character: 'kliff', description: 'Thrust that inflicts Bleed (3 ranks). Higher ranks increase Bleed duration and damage.' },
  { id: 'k-a10', name: 'Sword Flurry', cost: '2 Artifacts', branch: 'Stamina', cluster: 'Armed Combat', character: 'kliff', description: 'Leaping AoE spin slash (2 ranks). Costs 30 Stamina.' },
  { id: 'k-a11', name: 'Blinding Flash', cost: '1 Artifact', branch: 'Stamina', cluster: 'Armed Combat', character: 'kliff', description: 'Reflects light off your blade to temporarily blind nearby enemies.' },
  { id: 'k-a12', name: 'Blinding Flash Finisher', cost: '1 Artifact', branch: 'Stamina', cluster: 'Armed Combat', character: 'kliff', description: 'Rapid flurry of strikes that can only be used against blinded enemies.' },
  // KLIFF — STAMINA BRANCH (Blue) — Unarmed Combat cluster
  { id: 'k-u1', name: 'Unarmed Combat', cost: '1 Artifact', branch: 'Stamina', cluster: 'Unarmed Combat', character: 'kliff', description: 'Bare-fist strikes (5 ranks). Each rank adds combo extensions, grappling, trip kicks, and throw combos.' },
  { id: 'k-u2', name: 'Grappling', cost: '1 Artifact', branch: 'Stamina', cluster: 'Unarmed Combat', character: 'kliff', description: 'Grab attacks (5 ranks). Rank 2: Throw. Rank 3: Restrain (hostage-hold). Rank 5: Lariat.' },
  { id: 'k-u3', name: 'Pump Kick', cost: '1 Artifact', branch: 'Stamina', cluster: 'Unarmed Combat', character: 'kliff', description: 'A forward kick that pushes enemies back.' },
  { id: 'k-u4', name: 'Dropkick', cost: '1 Artifact', branch: 'Stamina', cluster: 'Unarmed Combat', character: 'kliff', description: 'Full-body forward kick with knockback.' },
  { id: 'k-u5', name: 'Vault', cost: '1 Artifact', branch: 'Stamina', cluster: 'Unarmed Combat', character: 'kliff', description: 'Leap over enemies using 40 Stamina.' },
  { id: 'k-u6', name: 'Flying Kick', cost: '1 Artifact', branch: 'Stamina', cluster: 'Unarmed Combat', character: 'kliff', description: 'Midair double kick that launches you forward.' },
  { id: 'k-u7', name: 'Meteor Kick', cost: '1 Artifact', branch: 'Stamina', cluster: 'Unarmed Combat', character: 'kliff', description: 'Altitude foot slam from the air. Costs 10 Spirit.' },
  { id: 'k-u8', name: 'Clothesline', cost: '2 Artifacts', branch: 'Stamina', cluster: 'Unarmed Combat', character: 'kliff', description: 'Running grab-slam that sends enemies into the ground. Costs 60 Stamina.' },
  { id: 'k-u9', name: 'Body Slam', cost: '2 Artifacts', branch: 'Stamina', cluster: 'Unarmed Combat', character: 'kliff', description: 'Aerial slam with AoE impact on landing. Costs 60 Stamina.' },
  // KLIFF — STAMINA BRANCH (Blue) — Archery cluster
  { id: 'k-ar1', name: 'Archery', cost: '1 Artifact', branch: 'Stamina', cluster: 'Archery', character: 'kliff', description: 'Core bow attack (5 ranks). Each rank improves draw speed, damage, and range.' },
  { id: 'k-ar2', name: 'Multishot', cost: '2 Artifacts', branch: 'Stamina', cluster: 'Archery', character: 'kliff', description: 'Fire a 10-arrow cone spread. Costs 10 Spirit.' },
  { id: 'k-ar3', name: 'Evasive Shot', cost: '1 Artifact', branch: 'Stamina', cluster: 'Archery', character: 'kliff', description: 'Slide-dodge while firing (3 ranks). Rank 2: fires two arrows. Rank 3 (Explosive Evasive Shot): launches you airborne.' },
  { id: 'k-ar4', name: 'Charged Shot', cost: '2 Artifacts', branch: 'Stamina', cluster: 'Archery', character: 'kliff', description: 'Hold to charge a devastating powered arrow shot.' },
  // KLIFF — SPIRIT BRANCH (Green) — Nature's Arts cluster
  { id: 'k-sp1', name: "Nature's Echo", cost: '1 Artifact', branch: 'Spirit', cluster: "Nature's Arts", character: 'kliff', description: "Summons phantom clones (3 ranks). Rank 1: clone mimics Forward Slash. Rank 2: Spinning Slash. Rank 3: Stab." },
  { id: 'k-sp2', name: "Nature's Snare", cost: '1 Artifact', branch: 'Spirit', cluster: "Nature's Arts", character: 'kliff', description: "Projectile-blocking rotating barrier (3 ranks). Costs 2 Spirit/sec. Higher ranks expand range and rotation speed." },
  { id: 'k-sp3', name: "Nature's Grasp", cost: 'Story Unlock', branch: 'Spirit', cluster: "Nature's Arts", character: 'kliff', description: 'Lift and move heavy objects using Axiom Force. Unlocked through story progression.' },
  // KLIFF — SPIRIT BRANCH (Green) — Keen Senses & Evasion cluster
  { id: 'k-sp4', name: 'Keen Senses', cost: '1 Artifact', branch: 'Spirit', cluster: 'Keen Senses & Evasion', character: 'kliff', description: 'Enhanced perception (3 ranks). Rank 1: Parry (perfect block). Rank 2: Backstep (perfect dodge). Rank 3: Counter attack.' },
  { id: 'k-sp5', name: 'Evasive Roll', cost: '1 Artifact', branch: 'Spirit', cluster: 'Keen Senses & Evasion', character: 'kliff', description: 'Perfect-timed roll with invincibility frames. Costs 10 Spirit.' },
  { id: 'k-sp6', name: 'Double Jump', cost: '1 Artifact', branch: 'Spirit', cluster: 'Keen Senses & Evasion', character: 'kliff', description: 'A second midair jump that consumes Spirit.' },
  // KLIFF — SPIRIT BRANCH (Green) — Focus cluster
  { id: 'k-sp7', name: 'Focus', cost: '1 Artifact', branch: 'Spirit', cluster: 'Focus', character: 'kliff', description: 'Slow down time (3 ranks). Costs 5 Spirit/sec. Rank 3 unlocks Focused Insight parry.' },
  { id: 'k-sp8', name: 'Focus Shot', cost: '1 Artifact', branch: 'Spirit', cluster: 'Focus', character: 'kliff', description: 'Slow-motion precision aiming with multi-arrow volley (3 ranks). Higher ranks fire more arrows.' },
  // KLIFF — SPIRIT BRANCH (Green) — Force Palm cluster
  { id: 'k-sp9',  name: 'Force Palm Rank 1', cost: '1 Artifact', branch: 'Spirit', cluster: 'Force Palm', character: 'kliff', description: 'Open-palm energy strike that staggers enemies.' },
  { id: 'k-sp10', name: 'Force Palm Rank 2', cost: '1 Artifact', branch: 'Spirit', cluster: 'Force Palm', character: 'kliff', description: 'Unlocks Aerial Force Palm — perform Force Palm while airborne.' },
  { id: 'k-sp11', name: 'Force Palm Rank 3', cost: '1 Artifact', branch: 'Spirit', cluster: 'Force Palm', character: 'kliff', description: 'Unlocks Healing Force Palm — regain Spirit on successful hit.' },
  { id: 'k-sp12', name: 'Force Palm Rank 4', cost: '1 Artifact', branch: 'Spirit', cluster: 'Force Palm', character: 'kliff', description: 'Additional Palm Strikes I — chain a second consecutive palm strike.' },
  { id: 'k-sp13', name: 'Force Palm Rank 5', cost: '1 Artifact', branch: 'Spirit', cluster: 'Force Palm', character: 'kliff', description: 'Additional Palm Strikes II — chain up to three consecutive palm strikes.' },
  { id: 'k-sp14', name: 'Force Palm Pulse', cost: '1 Artifact', branch: 'Spirit', cluster: 'Force Palm', character: 'kliff', description: 'A swift follow-up attack immediately after a Force Palm strike.' },
  { id: 'k-sp15', name: 'Focused Palm', cost: '1 Artifact', branch: 'Spirit', cluster: 'Force Palm', character: 'kliff', description: "Charged Force Palm that targets an enemy's inner core for bonus damage." },
  { id: 'k-sp16', name: 'Light Falling Palm', cost: '2 Artifacts', branch: 'Spirit', cluster: 'Force Palm', character: 'kliff', description: 'A ground slam powered by Axiom Force.' },
  { id: 'k-sp17', name: 'Force Current', cost: '2 Artifacts', branch: 'Spirit', cluster: 'Force Palm', character: 'kliff', description: 'A long-range stagger-building energy pulse.' },
  // KLIFF — HEALTH BRANCH (Red) — Elemental Arts cluster
  { id: 'k-hp1', name: 'Imbue Elements Rank 1', cost: '1 Artifact', branch: 'Health', cluster: 'Elemental Arts', character: 'kliff', description: 'Elemental affinity via radial quick-select menu (4 ranks total). Rank 1: adds elemental Turning Slash.' },
  { id: 'k-hp2', name: 'Imbue Elements Rank 2', cost: '1 Artifact', branch: 'Health', cluster: 'Elemental Arts', character: 'kliff', description: 'Second element slot — access two affinities.' },
  { id: 'k-hp3', name: 'Imbue Elements Rank 3', cost: '1 Artifact', branch: 'Health', cluster: 'Elemental Arts', character: 'kliff', description: 'Third element slot — enhanced elemental switching speed.' },
  { id: 'k-hp4', name: 'Imbue Elements Rank 4', cost: '1 Artifact', branch: 'Health', cluster: 'Elemental Arts', character: 'kliff', description: 'Full elemental mastery — all four elements accessible at once.' },
  { id: 'k-hp5', name: 'Fist of Flame', cost: '2 Artifacts', branch: 'Health', cluster: 'Elemental Arts', character: 'kliff', description: 'Fire-imbued charging punch. Costs 10 Spirit.' },
  { id: 'k-hp6', name: 'Veil of Fog', cost: '2 Artifacts', branch: 'Health', cluster: 'Elemental Arts', character: 'kliff', description: 'Creates a fog area that breaks enemy line-of-sight. Costs 10 Spirit.' },
  { id: 'k-hp7', name: 'Mantle of Frost', cost: '2 Artifacts', branch: 'Health', cluster: 'Elemental Arts', character: 'kliff', description: 'Freezing barrier that absorbs one incoming hit. Costs 10 Spirit.' },
  { id: 'k-hp8', name: 'Surge of Sparks', cost: '2 Artifacts', branch: 'Health', cluster: 'Elemental Arts', character: 'kliff', description: 'AoE electric shock zone centered on Kliff. Costs 10 Spirit.' },
  // KLIFF — HEALTH BRANCH (Red) — Axiom Force cluster
  { id: 'k-hp9',  name: 'Axiom Force', cost: 'Story Unlock', branch: 'Health', cluster: 'Axiom Force', character: 'kliff', description: 'Magical telekinetic hand (3 ranks). Extends range and lifting capacity each rank. Unlocked via story.' },
  { id: 'k-hp10', name: 'Mystical Storage', cost: 'Story Unlock', branch: 'Health', cluster: 'Axiom Force', character: 'kliff', description: 'Seal objects in the Kuku Iron Pot using Axiom Force. Unlocked via story.' },
  { id: 'k-hp11', name: 'Winch', cost: '2 Artifacts', branch: 'Health', cluster: 'Axiom Force', character: 'kliff', description: 'Pull enemies toward you with Axiom Force, then slam them into the ground.' },
  // KLIFF — HEALTH BRANCH (Red) — Flight & Mobility cluster
  { id: 'k-hp12', name: 'Flight', cost: 'Story Unlock', branch: 'Health', cluster: 'Flight & Mobility', character: 'kliff', description: 'Stamina-consuming glide (2 ranks). Rank 2 (Swift Flight) greatly increases speed. Unlocked via story.' },
  { id: 'k-hp13', name: 'Aerial Roll', cost: '1 Artifact', branch: 'Health', cluster: 'Flight & Mobility', character: 'kliff', description: 'High-speed midair dash for aerial repositioning and dodging.' },
  // KLIFF — ULTIMATE
  { id: 'k-ult', name: 'Falling Palm', cost: 'Complete One Branch', branch: 'Ultimate', cluster: 'Ultimate', character: 'kliff', description: 'Activated while falling at full speed — consumes all remaining Stamina for a ground-impact AoE strike. Unlocks after fully completing any one branch.' },

  // ─── DAMIANE ────────────────────────────────────────────────────────────────
  // DAMIANE — STAMINA BRANCH (Blue) — Rapier Combat cluster
  { id: 'd-a1', name: 'Rapier Combat', cost: '1 Artifact', branch: 'Stamina', cluster: 'Rapier Combat', character: 'damiane', description: 'Core rapier attacks (5 ranks). Each rank adds combo extensions, precision follow-ups, and new guard-break mechanics.' },
  { id: 'd-a2', name: 'Lunge Rank 1', cost: '1 Artifact', branch: 'Stamina', cluster: 'Rapier Combat', character: 'damiane', description: 'Quick forward thrust that closes distance instantly.' },
  { id: 'd-a3', name: 'Lunge Rank 2', cost: '1 Artifact', branch: 'Stamina', cluster: 'Rapier Combat', character: 'damiane', description: 'Extended reach lunge — travels further and deals more damage.' },
  { id: 'd-a4', name: 'Lunge Rank 3', cost: '1 Artifact', branch: 'Stamina', cluster: 'Rapier Combat', character: 'damiane', description: 'Triple-lunge combo — immediately chains three consecutive thrusts.' },
  { id: 'd-a5', name: 'Piercing Light', cost: '2 Artifacts', branch: 'Stamina', cluster: 'Rapier Combat', character: 'damiane', description: 'Light-infused stab that penetrates armor and bypasses enemy blocks.' },
  { id: 'd-a6', name: 'Parry & Riposte', cost: '1 Artifact', branch: 'Stamina', cluster: 'Rapier Combat', character: 'damiane', description: 'Perfect-timed block instantly counters with a precise rapier thrust.' },
  // DAMIANE — STAMINA BRANCH (Blue) — Pistol Combat cluster
  { id: 'd-a7', name: 'Pistol Combat', cost: '1 Artifact', branch: 'Stamina', cluster: 'Pistol Combat', character: 'damiane', description: 'Core pistol attacks (5 ranks). Improves reload speed, damage, and unlocks new firing stances.' },
  { id: 'd-a8', name: 'Quick Draw', cost: '1 Artifact', branch: 'Stamina', cluster: 'Pistol Combat', character: 'damiane', description: 'Draw and fire in a single fluid motion with no wind-up delay.' },
  { id: 'd-a9', name: 'Smiting Bolt', cost: '2 Artifacts', branch: 'Stamina', cluster: 'Pistol Combat', character: 'damiane', description: 'Spirit-charged pistol shot that deals bonus damage to staggered enemies.' },
  { id: 'd-a10', name: 'Sure Hit', cost: '2 Artifacts', branch: 'Stamina', cluster: 'Pistol Combat', character: 'damiane', description: 'Locked-on precision shot that tracks enemies and always connects.' },
  // DAMIANE — SPIRIT BRANCH (Green) — Shield Arts cluster
  { id: 'd-sp1', name: 'Shield Toss Rank 1', cost: '1 Artifact', branch: 'Spirit', cluster: 'Shield Arts', character: 'damiane', description: 'Throw the shield as a projectile that returns to hand.' },
  { id: 'd-sp2', name: 'Shield Toss Rank 2', cost: '1 Artifact', branch: 'Spirit', cluster: 'Shield Arts', character: 'damiane', description: 'Bouncing ricochet — shield hits up to three enemies before returning.' },
  { id: 'd-sp3', name: 'Shield Toss Rank 3', cost: '1 Artifact', branch: 'Spirit', cluster: 'Shield Arts', character: 'damiane', description: 'Multi-target chain throw — pierces through groups of enemies.' },
  { id: 'd-sp4', name: 'Shield Sentinel', cost: '2 Artifacts', branch: 'Spirit', cluster: 'Shield Arts', character: 'damiane', description: 'Deploy shield as a floating autonomous turret sentry that fires at nearby enemies.' },
  // DAMIANE — SPIRIT BRANCH (Green) — Evasion & Mobility cluster
  { id: 'd-sp5', name: 'Evasive Step', cost: '1 Artifact', branch: 'Spirit', cluster: 'Evasion & Mobility', character: 'damiane', description: 'Quick dodge step with invincibility frames.' },
  { id: 'd-sp6', name: 'Phase Dash', cost: '2 Artifacts', branch: 'Spirit', cluster: 'Evasion & Mobility', character: 'damiane', description: 'Become intangible and dash forward through enemies and projectiles.' },
  { id: 'd-sp7', name: 'Counter Stance', cost: '2 Artifacts', branch: 'Spirit', cluster: 'Evasion & Mobility', character: 'damiane', description: 'Perfect-timed dodge triggers a powerful automatic counter-attack.' },
  { id: 'd-sp8', name: 'Double Jump', cost: '1 Artifact', branch: 'Spirit', cluster: 'Evasion & Mobility', character: 'damiane', description: 'A second midair jump that consumes Spirit.' },
  // DAMIANE — SPIRIT BRANCH (Green) — Focus cluster
  { id: 'd-sp9',  name: 'Heightened Senses', cost: '1 Artifact', branch: 'Spirit', cluster: 'Focus', character: 'damiane', description: 'Slow down time (3 ranks). Costs 5 Spirit/sec. Higher ranks reduce Spirit consumption.' },
  { id: 'd-sp10', name: 'Aimed Focus', cost: '1 Artifact', branch: 'Spirit', cluster: 'Focus', character: 'damiane', description: 'Precision aiming mode that increases critical hit chance on the next attack.' },
  // DAMIANE — HEALTH BRANCH (Red) — Abyss Arts cluster
  { id: 'd-hp1', name: 'Rend Armor Rank 1', cost: '1 Artifact', branch: 'Health', cluster: 'Abyss Arts', character: 'damiane', description: 'Strike that strips enemy defenses, reducing their armor rating.' },
  { id: 'd-hp2', name: 'Rend Armor Rank 2', cost: '1 Artifact', branch: 'Health', cluster: 'Abyss Arts', character: 'damiane', description: 'Deeper armor penetration — higher defense reduction and longer duration.' },
  { id: 'd-hp3', name: 'Rend Armor Rank 3', cost: '1 Artifact', branch: 'Health', cluster: 'Abyss Arts', character: 'damiane', description: 'Maximum defense reduction — especially devastating against armored bosses.' },
  { id: 'd-hp4', name: 'Arcane Bolt Rank 1', cost: '1 Artifact', branch: 'Health', cluster: 'Abyss Arts', character: 'damiane', description: 'Concentrated Abyss energy projectile that deals high single-target damage.' },
  { id: 'd-hp5', name: 'Arcane Bolt Rank 2', cost: '1 Artifact', branch: 'Health', cluster: 'Abyss Arts', character: 'damiane', description: 'Faster and stronger bolt — reduced cast time, increased damage.' },
  { id: 'd-hp6', name: 'Arcane Bolt Rank 3', cost: '2 Artifacts', branch: 'Health', cluster: 'Abyss Arts', character: 'damiane', description: 'Chain bolt — arcs between up to three nearby enemies on impact.' },
  { id: 'd-hp7', name: 'Abyss Ward', cost: '2 Artifacts', branch: 'Health', cluster: 'Abyss Arts', character: 'damiane', description: 'Magical barrier that absorbs a set amount of incoming damage (2 ranks).' },
  // DAMIANE — HEALTH BRANCH (Red) — Mobility cluster
  { id: 'd-hp8', name: 'Smoke Screen', cost: '1 Artifact', branch: 'Health', cluster: 'Mobility', character: 'damiane', description: 'Deploy a blinding smoke cloud that breaks enemy line-of-sight.' },
  { id: 'd-hp9', name: 'Phase Step', cost: '2 Artifacts', branch: 'Health', cluster: 'Mobility', character: 'damiane', description: 'Become briefly intangible, causing the next hit against you to pass through.' },
  { id: 'd-hp10', name: 'Aerial Dash', cost: '1 Artifact', branch: 'Health', cluster: 'Mobility', character: 'damiane', description: 'High-speed midair dash for repositioning during airborne combat.' },
  // DAMIANE — ULTIMATE
  { id: 'd-ult', name: 'Rending Waltz', cost: 'Complete One Branch', branch: 'Ultimate', cluster: 'Ultimate', character: 'damiane', description: 'A devastating dance of blade and pistol that depletes all Spirit for a massive multi-hit AoE. Unlocks after fully completing any one branch.' },

  // ─── OONGKA ─────────────────────────────────────────────────────────────────
  // OONGKA — STAMINA BRANCH (Blue) — Axe Mastery cluster
  { id: 'o-a1', name: 'Axe Combat', cost: '1 Artifact', branch: 'Stamina', cluster: 'Axe Mastery', character: 'oongka', description: 'Core axe attacks (5 ranks). Each rank increases combo reach, adds new swing patterns, and improves stagger output.' },
  { id: 'o-a2', name: 'Cleave Rank 1', cost: '1 Artifact', branch: 'Stamina', cluster: 'Axe Mastery', character: 'oongka', description: 'Wide horizontal swing that hits multiple enemies in front.' },
  { id: 'o-a3', name: 'Cleave Rank 2', cost: '1 Artifact', branch: 'Stamina', cluster: 'Axe Mastery', character: 'oongka', description: 'Extended arc cleave — larger sweep radius and added knockback.' },
  { id: 'o-a4', name: 'Cleave Rank 3', cost: '1 Artifact', branch: 'Stamina', cluster: 'Axe Mastery', character: 'oongka', description: 'Full 360° cleave with knockdown — hits all surrounding enemies.' },
  { id: 'o-a5', name: 'Rampage Rank 1', cost: '1 Artifact', branch: 'Stamina', cluster: 'Axe Mastery', character: 'oongka', description: 'Berserker charge that bulldozes through enemy groups dealing AoE damage.' },
  { id: 'o-a6', name: 'Rampage Rank 2', cost: '1 Artifact', branch: 'Stamina', cluster: 'Axe Mastery', character: 'oongka', description: 'Faster and wider rampage — covers more ground, hits more targets.' },
  { id: 'o-a7', name: 'Rampage Rank 3', cost: '2 Artifacts', branch: 'Stamina', cluster: 'Axe Mastery', character: 'oongka', description: 'Unstoppable rampage with super armor — cannot be interrupted while charging.' },
  // OONGKA — STAMINA BRANCH (Blue) — Heavy Attacks cluster
  { id: 'o-a8',  name: 'Ground Shatter Rank 1', cost: '1 Artifact', branch: 'Stamina', cluster: 'Heavy Attacks', character: 'oongka', description: 'Slam the axe into the ground, creating a shockwave that staggers nearby enemies.' },
  { id: 'o-a9',  name: 'Ground Shatter Rank 2', cost: '1 Artifact', branch: 'Stamina', cluster: 'Heavy Attacks', character: 'oongka', description: 'Extended shockwave radius and increased stagger duration.' },
  { id: 'o-a10', name: 'Quaking Fury Rank 1', cost: '2 Artifacts', branch: 'Stamina', cluster: 'Heavy Attacks', character: 'oongka', description: 'Massive ground slam that sends tremors rippling outward in a wide AoE.' },
  { id: 'o-a11', name: 'Quaking Fury Rank 2', cost: '2 Artifacts', branch: 'Stamina', cluster: 'Heavy Attacks', character: 'oongka', description: 'Full-power earth-splitting slam — especially effective against armored bosses (Rend Armor effect).' },
  // OONGKA — SPIRIT BRANCH (Green) — Cannon Combat cluster
  { id: 'o-sp1', name: 'Cannon Combat', cost: '1 Artifact', branch: 'Spirit', cluster: 'Cannon Combat', character: 'oongka', description: 'Core wrist cannon attacks (5 ranks). Improves fire rate, explosion radius, and unlocks new firing modes.' },
  { id: 'o-sp2', name: 'Scatter Shot Rank 1', cost: '1 Artifact', branch: 'Spirit', cluster: 'Cannon Combat', character: 'oongka', description: 'Spread shot that fires a cone of explosive pellets hitting multiple enemies.' },
  { id: 'o-sp3', name: 'Scatter Shot Rank 2', cost: '1 Artifact', branch: 'Spirit', cluster: 'Cannon Combat', character: 'oongka', description: 'Wider spread pattern with more pellets and increased individual damage.' },
  { id: 'o-sp4', name: 'Scatter Shot Rank 3', cost: '2 Artifacts', branch: 'Spirit', cluster: 'Cannon Combat', character: 'oongka', description: 'Maximum spread with explosive pellets — devastating close-range AoE.' },
  { id: 'o-sp5', name: 'Explosive Barrage Rank 1', cost: '2 Artifacts', branch: 'Spirit', cluster: 'Cannon Combat', character: 'oongka', description: 'Rapid-fire burst of explosive rounds in quick succession.' },
  { id: 'o-sp6', name: 'Explosive Barrage Rank 2', cost: '2 Artifacts', branch: 'Spirit', cluster: 'Cannon Combat', character: 'oongka', description: 'Three consecutive explosive rounds fired at maximum power.' },
  // OONGKA — SPIRIT BRANCH (Green) — Rage cluster
  { id: 'o-sp7', name: 'Rage Rank 1', cost: '1 Artifact', branch: 'Spirit', cluster: 'Rage', character: 'oongka', description: 'Super armor mode that absorbs hits without interrupting attacks.' },
  { id: 'o-sp8', name: 'Rage Rank 2', cost: '1 Artifact', branch: 'Spirit', cluster: 'Rage', character: 'oongka', description: 'Extended rage duration and increased damage while active.' },
  { id: 'o-sp9', name: 'Rage Rank 3', cost: '2 Artifacts', branch: 'Spirit', cluster: 'Rage', character: 'oongka', description: 'Unstoppable rage with damage boost — immune to knockback and stagger.' },
  { id: 'o-sp10', name: 'Battle Cry', cost: '1 Artifact', branch: 'Spirit', cluster: 'Rage', character: 'oongka', description: 'War shout that boosts attack for Oongka and nearby allies for 20 seconds.' },
  // OONGKA — HEALTH BRANCH (Red) — Fortitude cluster
  { id: 'o-hp1', name: 'Iron Skin Rank 1', cost: '1 Artifact', branch: 'Health', cluster: 'Fortitude', character: 'oongka', description: 'Harden the body, reducing all incoming damage by 15%.' },
  { id: 'o-hp2', name: 'Iron Skin Rank 2', cost: '1 Artifact', branch: 'Health', cluster: 'Fortitude', character: 'oongka', description: 'Reduce incoming damage by 25% and resist minor staggers.' },
  { id: 'o-hp3', name: 'Iron Skin Rank 3', cost: '1 Artifact', branch: 'Health', cluster: 'Fortitude', character: 'oongka', description: 'Maximum damage resistance — dramatically reduces impact from heavy blows.' },
  { id: 'o-hp4', name: 'Rend Armor Rank 1', cost: '1 Artifact', branch: 'Health', cluster: 'Fortitude', character: 'oongka', description: 'Defense-shattering strike that permanently reduces enemy armor rating.' },
  { id: 'o-hp5', name: 'Rend Armor Rank 2', cost: '2 Artifacts', branch: 'Health', cluster: 'Fortitude', character: 'oongka', description: 'Maximum armor penetration — especially devastating against armored bosses.' },
  { id: 'o-hp6', name: 'Regeneration', cost: '2 Artifacts', branch: 'Health', cluster: 'Fortitude', character: 'oongka', description: 'Slowly restore health over 30 seconds after taking a heavy hit.' },
  // OONGKA — HEALTH BRANCH (Red) — Endurance cluster
  { id: 'o-hp7', name: 'War Cry Rank 1', cost: '1 Artifact', branch: 'Health', cluster: 'Endurance', character: 'oongka', description: 'Battle shout that boosts attack by 10% for 20 seconds.' },
  { id: 'o-hp8', name: 'War Cry Rank 2', cost: '1 Artifact', branch: 'Health', cluster: 'Endurance', character: 'oongka', description: 'Enhanced shout with wider range — affects a larger area of allies.' },
  { id: 'o-hp9', name: 'Unstoppable', cost: '3 Artifacts', branch: 'Health', cluster: 'Endurance', character: 'oongka', description: 'Become immune to knockback and stagger for 10 seconds. Cannot be cancelled.' },
  // OONGKA — ULTIMATE
  { id: 'o-ult', name: 'Quaking Slam', cost: 'Complete One Branch', branch: 'Ultimate', cluster: 'Ultimate', character: 'oongka', description: 'Oongka leaps high and slams down with devastating force, creating massive AoE shockwaves that knock down all nearby enemies. Unlocks after fully completing any one branch.' },
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
  // Main Story
  { name: "The Greymane's Burden", description: 'Reunite with scattered Greymane members after the Black Bear ambush', type: 'main' },
  { name: 'Shadows over Demeniss', description: "Investigate the circumstances behind King Demeniss's coma", type: 'main' },
  { name: 'Into the Abyss', description: 'Discover the source of the Abyss and its threat to Pywel', type: 'main' },
  { name: 'The Black Bear Hunt', description: 'Track down and confront the Black Bear leadership', type: 'main' },
  { name: "Pywel's Last Stand", description: 'Unite the factions to face the ultimate threat to the continent', type: 'main' },
  // Side Quests
  { name: "The Hermit's Recipe", description: "Find rare ingredients for a desert hermit's legendary dish", type: 'side' },
  { name: 'Delesyian Blueprints', description: 'Recover stolen mechanical schematics from bandits', type: 'side' },
  { name: 'Ghost of Gian', description: 'Investigate supernatural sightings near the Pailune monument', type: 'side' },
  { name: 'Arena Champion', description: 'Win the underground fighting tournament in Hernand', type: 'side' },
  { name: 'Fishing Mastery', description: 'Catch one of every fish species across all five regions', type: 'side' },
  // Faction Quests
  { name: 'Greymane Stronghold', description: 'Liberate territory from Black Bear occupation', type: 'faction' },
  { name: 'Dispatch Missions', description: 'Send comrades on expeditions for rare resources', type: 'faction' },
  { name: 'Camp Expansion', description: 'Upgrade the Greymane Camp with all facilities', type: 'faction' },
  // Character Arcs
  { name: "Damiane's Redemption", description: "Uncover Damiane's hidden past and settle her debts with the noble houses of Hernand. A separate story arc with unique cutscenes and boss encounters.", type: 'character' },
  { name: "Oongka's Homeland", description: "Journey with Oongka to reclaim his ancestral orc territories in the far reaches of Pywel. Features unique combat encounters and tribe diplomacy.", type: 'character' },
  { name: "Kliff's Promise", description: "Fulfill the oath Kliff made to the fallen Greymane leader Gian. Follow the trail of clues across all five regions.", type: 'character' },
  // Region Liberation
  { name: 'Liberate Hernand Pass', description: 'Break the Black Bear blockade on the main trade route through Hernand. Once freed, merchants and travelers return to the region.', type: 'liberation' },
  { name: 'Liberate Pailune Bridge', description: 'Retake the frozen bridge connecting northern Pailune settlements. Restores supply lines to the Greymane homeland.', type: 'liberation' },
  { name: 'Liberate Desert Outpost', description: 'Drive Black Bear forces from the Crimson Desert trading post. Opens access to desert vendors and crafting materials.', type: 'liberation' },
  { name: 'Liberate Demeniss Docks', description: 'Free the capital docks from enemy occupation. Unlocks naval transport between regions.', type: 'liberation' },
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
  // Cooking (bonfire recipes)
  { name: 'Hearty Stew', type: 'cooking', ingredients: ['Venison x2', 'Root Vegetables x3', 'Salt x1'], effect: '+30% Max Health for 10 min' },
  { name: "Hunter's Feast", type: 'cooking', ingredients: ['Wild Boar x1', 'Forest Mushrooms x3', 'Herbs x2'], effect: '+20% Attack for 10 min' },
  { name: 'Frozen Berry Tart', type: 'cooking', ingredients: ['Snow Berries x4', 'Flour x2', 'Honey x1'], effect: '+25% Stamina Regen for 10 min' },
  { name: 'Spiced Desert Jerky', type: 'cooking', ingredients: ['Desert Lizard x2', 'Red Spice x3'], effect: '+15% Heat Resistance' },
  { name: "Warrior's Broth", type: 'cooking', ingredients: ['Bone Marrow x2', 'Garlic x3', 'Spring Water x1'], effect: '+15% Attack & +10% Defense for 8 min' },
  // Alchemy
  { name: 'Healing Salve', type: 'alchemy', ingredients: ['Healing Herb x3', 'Spring Water x1', 'Beeswax x1'], effect: 'Restores 50% HP over time' },
  { name: 'Stamina Elixir', type: 'alchemy', ingredients: ['Ginseng Root x2', 'Crystal Water x1'], effect: 'Full Stamina Restore' },
  { name: 'Fire Resistance Tonic', type: 'alchemy', ingredients: ['Fire Bloom x2', 'Ice Moss x1', 'Vial x1'], effect: '+40% Fire Resistance for 15 min' },
  { name: 'Strength Draught', type: 'alchemy', ingredients: ['Bear Claw x1', 'Iron Dust x2', 'Alcohol x1'], effect: '+25% Strength for 8 min' },
  // Blacksmithing
  { name: 'Weapon Refinement I', type: 'blacksmith', ingredients: ['Iron Ore x5', 'Coal x3'], effect: 'Weapon ATK +10' },
  { name: 'Weapon Refinement II', type: 'blacksmith', ingredients: ['Steel Ingot x3', 'Rare Coal x2', 'Gold Dust x1'], effect: 'Weapon ATK +25' },
  { name: 'Armor Reinforcement', type: 'blacksmith', ingredients: ['Leather x4', 'Iron Plates x2'], effect: 'DEF +15' },
  { name: 'Abyss Gear Socket', type: 'blacksmith', ingredients: ['Abyss Shard x1', 'Mithril x2'], effect: 'Adds gear socket to weapon' },
  // Alchemy - Potions & Medicine (alchemy covers all consumable crafting)
  { name: 'Healing Potion', type: 'alchemy', ingredients: ['Moonpetal x2', 'Purified Water x1'], effect: 'Instant 40% HP restore' },
  { name: 'Antidote', type: 'alchemy', ingredients: ['Charcoal x1', 'Swamp Lily x2', 'Vial x1'], effect: 'Cures poison and venom effects' },
  { name: 'Combat Stimulant', type: 'alchemy', ingredients: ['Crimson Root x1', 'Adrenaline Gland x1', 'Alcohol x1'], effect: '+30% Attack Speed for 60 seconds' },
  { name: 'Spirit Restoration Draught', type: 'alchemy', ingredients: ['Abyss Dewdrop x2', 'Silver Dust x1'], effect: 'Restores Spirit gauge used for Abyss Magic' },
  // Dye Crafting
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
