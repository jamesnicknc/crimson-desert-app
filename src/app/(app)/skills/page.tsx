'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { Character } from '@/types/game-data';

// ─── Types ────────────────────────────────────────────────────────────────────

type Acquisition = 'auto' | 'artifact' | 'observe' | 'story';
type Branch = 'blue' | 'green' | 'red';

interface InnerSkill {
  name: string;
  requires?: string;
  description: string;
}

interface SkillDef {
  id: string;
  name: string;
  branch: Branch;
  category: string;
  acquisition: Acquisition;
  requires?: string;
  description: string;
  innerSkills?: InnerSkill[];
  charNote?: string;
  exclusive?: boolean;
}

// ─── Visual config ────────────────────────────────────────────────────────────

const BRANCH_CFG = {
  blue:  { label: 'Stamina',  sub: 'Combat',    color: '#60a5fa', bg: '#0d1e38', border: '#2563eb44' },
  green: { label: 'Spirit',   sub: 'Defense',   color: '#4ade80', bg: '#061a0e', border: '#16a34a44' },
  red:   { label: 'Health',   sub: 'Elemental', color: '#f87171', bg: '#1a0606', border: '#dc262644' },
} as const;

const ACQ_CFG = {
  auto:     { label: 'Auto',     color: '#9ca3af' },
  artifact: { label: 'Artifact', color: '#fbbf24' },
  observe:  { label: 'Observe',  color: '#a78bfa' },
  story:    { label: 'Story',    color: '#34d399' },
} as const;

// ─── Character meta ───────────────────────────────────────────────────────────

const CHAR_INFO: Record<Character, {
  title: string;
  role: string;
  unlock: string;
  startingWeapons: string;
  startingStats: string;
  signature: string;
  flightMethod: string;
}> = {
  kliff: {
    title: 'Leader of the Greymanes',
    role: 'Balanced Warrior / Protagonist',
    unlock: 'Starting character',
    startingWeapons: 'Sword of the Wolf + Grey Wolf Wooden Shield',
    startingStats: 'HP 100 · SP 50 · STM 130 · ATK 16 · DEF 14',
    signature: 'Axiom Force + Force Palm + Nature skills. Focus restores Spirit (unique to Kliff).',
    flightMethod: 'Supernatural Abyss glide',
  },
  damiane: {
    title: 'Member of House Spencer',
    role: 'Mobile Noble / Rapid Striker',
    unlock: 'After Chapter III + "First Step to Rebuilding" quest',
    startingWeapons: 'Spencer Pistol · White Wind Rapier · Absolute Justice Greatsword · Sydmon Dagger · Demenissian Shield',
    startingStats: 'HP 750 · SP 220 · STM 40 · ATK 32 · DEF 36',
    signature: 'Sentinel system (Shield + Blade Sentinels) · Piercing Light combos · Smiting skills. Most skills auto-unlocked.',
    flightMethod: 'Mechanical glider (auto-unlocked)',
  },
  oongka: {
    title: 'Greymanes Member — Orc Berserker',
    role: 'Brawler / Powerhouse',
    unlock: 'Chapter VII — after defeating Lava Myurdin at Ashclaw Keep',
    startingWeapons: 'Dekarr Greataxe · Orc Blaster (Hand Cannon) · Small Cannon Ball · Pailunese Riteblade',
    startingStats: 'HP 1125 · SP 240 · STM 50 · ATK 16 · DEF 28',
    signature: 'Dual Wielding Mastery · Slash/Quaking Fury chain · Rage (Super Armor in Focus, exclusive). Most skills auto-unlocked.',
    flightMethod: 'Rocket pack + exclusive Vertical Flight (L3)',
  },
};

// ─── Skill data (sourced: Fextralife wiki + Game8, post-launch March 2026) ────

const KLIFF_SKILLS: SkillDef[] = [
  // ── BLUE: STAMINA / COMBAT ───────────────────────────────────────────────────
  {
    id: 'k-armed-combat', name: 'Armed Combat', branch: 'blue', category: 'Armed Combat',
    acquisition: 'auto',
    description: 'Foundation for all weapon-based combat (R1). Higher levels unlock sub-techniques.',
    innerSkills: [
      { name: 'Evasive Slash', requires: 'Lv2', description: 'Dodge and slash simultaneously (R1+○, 40 Stamina).' },
      { name: 'Charge', requires: 'Lv3', description: 'Rush forward with weapon while guarding (X+X, 30 Stam/sec).' },
      { name: 'Rush', requires: 'Lv4', description: 'Rush forward while dodging (R2 during dodge, 70 Stamina).' },
      { name: 'Quick Swap', requires: 'Lv5', description: 'Instantly switch weapons mid-combo.' },
    ],
  },
  {
    id: 'k-shield-bash', name: 'Shield Bash', branch: 'blue', category: 'Armed Combat',
    acquisition: 'auto',
    description: 'Strike with your shield (L1+R2) to stagger enemies and create an opening.',
  },
  {
    id: 'k-forward-slash', name: 'Forward Slash', branch: 'blue', category: 'Sword Mastery',
    acquisition: 'auto', exclusive: true,
    description: 'A forward slashing attack (R2, 20 Stamina). Foundation of Kliff\'s sword combos.',
    innerSkills: [
      { name: 'Forward Slash Proficiency', requires: 'Lv2', description: 'Improved animation, faster follow-ups.' },
      { name: 'Forward Slash Sure Hit', requires: 'Lv3', description: 'Guaranteed connection — removes miss chance.' },
    ],
  },
  {
    id: 'k-turning-slash', name: 'Turning Slash', branch: 'blue', category: 'Sword Mastery',
    acquisition: 'auto', exclusive: true,
    description: 'A wide turning slash (R1+R2, 10 Spirit) that hits enemies on all sides.',
    innerSkills: [
      { name: 'Turning Slash Proficiency', description: 'Faster execution.' },
      { name: 'Turning Slash Sure Hit', description: 'Guaranteed connection.' },
      { name: 'Turning Slash Expertise', requires: 'Lv3', description: 'Extended follow-up combo.' },
      { name: 'Turning Slash Rend Armor', requires: 'Lv3', description: 'Ignores Super Armor — critical for armored enemies.' },
    ],
  },
  {
    id: 'k-stab', name: 'Stab', branch: 'blue', category: 'Sword Mastery',
    acquisition: 'auto', exclusive: true,
    description: 'A piercing thrust (R1+△, 40 Stamina) dealing concentrated damage.',
    innerSkills: [
      { name: 'Swift Stab', requires: 'Lv2', description: 'Faster stab variant.' },
      { name: 'Skewering Stab', requires: 'Lv2', description: 'Penetrates through enemies.' },
      { name: 'Stab Rend Armor', description: 'Ignores Super Armor.' },
      { name: 'Aerial Stab', requires: 'Lv3', description: 'Downward piercing attack from the air.' },
    ],
  },
  {
    id: 'k-spinning-slash', name: 'Spinning Slash', branch: 'blue', category: 'Sword Mastery',
    acquisition: 'auto',
    description: 'A wide spinning attack (R1+X, 30 Stamina) that hits all surrounding enemies.',
    innerSkills: [
      { name: 'Spinning Slash Proficiency', requires: 'Lv2 or Observe', description: 'Can be chained consecutively.' },
    ],
  },
  {
    id: 'k-blinding-flash', name: 'Blinding Flash', branch: 'blue', category: 'Sword Mastery',
    acquisition: 'story', requires: 'Main quest: "Realm of Uncertainty"',
    description: 'A disorienting flash from the blade (L1+R1). Blinds enemies. Can ignite flammable vines in the environment.',
    charNote: 'Kliff must earn this via story. Damiane and Oongka auto-unlock it.',
    innerSkills: [
      { name: 'Blinding Flash Finisher', requires: 'Artifact or Observe', description: 'Powerful follow-up while enemies are blinded (R2, 5 Spirit).' },
    ],
  },
  {
    id: 'k-unarmed-combat', name: 'Unarmed Combat', branch: 'blue', category: 'Unarmed Combat',
    acquisition: 'auto',
    description: 'Foundation for hand-to-hand combat (△). Enables kicks and body attacks.',
    innerSkills: [
      { name: 'Leg Sweep', description: 'Low trip attack.' },
      { name: 'Scissor Takedown', requires: 'Lv2', description: 'Scissoring leg takedown.' },
      { name: 'Unarmed Combat Proficiency', requires: 'Lv3', description: 'Enhanced combo speed.' },
      { name: 'Flying Kick', requires: 'Lv4', description: 'Leaping kick that covers distance.' },
      { name: 'Meteor Kick', requires: 'Lv5 or Observe', description: 'Devastating aerial heel drop — unlocks Elemental Meteor Kick via Imbue Element.' },
    ],
  },
  {
    id: 'k-pump-kick', name: 'Pump Kick', branch: 'blue', category: 'Unarmed Combat',
    acquisition: 'observe',
    description: 'A pumping kick (Hold △) that pushes enemies back and creates distance.',
    charNote: 'Kliff must observe an enemy performing this. Oongka auto-unlocks it.',
  },
  {
    id: 'k-dropkick', name: 'Dropkick', branch: 'blue', category: 'Unarmed Combat',
    acquisition: 'artifact', requires: 'Pump Kick Lv1',
    description: 'Launch forward and drive both feet into an enemy. Also learnable via observation.',
  },
  {
    id: 'k-grappling', name: 'Grappling', branch: 'blue', category: 'Unarmed Combat',
    acquisition: 'auto',
    description: 'Master grappling (△+○ or X+□). Foundation for throws, restraints, and slams.',
    innerSkills: [
      { name: 'Restrain', description: 'Pin an enemy, preventing action.' },
      { name: 'Throw', description: 'Hurl an enemy (40 Stamina).' },
      { name: 'Lariat', requires: 'Lv2', description: 'Running arm clothesline.' },
      { name: 'Giant Swing', requires: 'Lv3 + Pump Kick or Dropkick', description: 'Grab and spin enemy for massive impact.' },
      { name: 'Back Hang', requires: 'Lv4', description: 'Suspend enemy behind you to use as a weapon.' },
      { name: 'Lariat Follow-up', requires: 'Lv5 or Observe', description: 'Chain a follow-up strike after Lariat.' },
    ],
  },
  {
    id: 'k-marksmanship', name: 'Marksmanship', branch: 'blue', category: 'Ranged',
    acquisition: 'auto',
    description: 'Foundation for all ranged attacks (L2 to aim). Passive accuracy improvement.',
  },
  {
    id: 'k-evasive-shot', name: 'Evasive Shot', branch: 'blue', category: 'Ranged',
    acquisition: 'artifact',
    description: 'Fire while rolling or evading (○+○ while aiming, 45 Stamina).',
    innerSkills: [
      { name: 'Explosive Evasive Shot', description: 'Deals explosive area damage.' },
      { name: 'Evasive Shot Proficiency', description: 'Improved accuracy while evading.' },
      { name: 'Evasive Shot Expertise', description: 'Enhanced follow-up shot.' },
    ],
  },

  // ── GREEN: SPIRIT / DEFENSE ──────────────────────────────────────────────────
  {
    id: 'k-keen-senses', name: 'Keen Senses', branch: 'green', category: 'Core Defense',
    acquisition: 'auto',
    description: 'Heighten combat awareness. Foundation for parrying, dodging, and countering.',
    innerSkills: [
      { name: 'Parry', description: 'Deflect incoming attacks with precise timing — auto-unlocked.' },
      { name: 'Dodge', requires: 'Lv2', description: 'Enhanced directional dodge with invincibility frames.' },
      { name: 'Counter', requires: 'Lv3 or Observe', description: 'After a successful parry, automatically strike back.' },
    ],
  },
  {
    id: 'k-focus', name: 'Focus', branch: 'green', category: 'Core Defense',
    acquisition: 'observe', exclusive: true,
    description: 'Enter a focused state (L3+R3) that slows perceived time. Kliff\'s Focus also regenerates Spirit while maintained — unique among the three characters.',
    charNote: 'Kliff\'s Focus restores Spirit. Damiane and Oongka\'s Focus only slows time with no inner skills.',
    innerSkills: [
      { name: 'Focused Repulsion', requires: 'Lv2 or Observe', description: 'Repels all nearby threats on R1 while focused, or on L3+R3 when hit (10 Spirit).' },
      { name: 'Focused Insight', requires: 'Lv3', description: 'Auto-faces threats while focused; press L1 to counter (1 Spirit/sec).' },
    ],
  },
  {
    id: 'k-evasive-roll', name: 'Evasive Roll', branch: 'green', category: 'Core Defense',
    acquisition: 'artifact',
    description: 'A quick evasive roll after taking a hit (○ after damage, 10 Spirit) granting brief invincibility frames.',
    charNote: 'Kliff needs an Artifact or observation. Damiane auto-unlocks this.',
  },
  {
    id: 'k-double-jump', name: 'Double Jump', branch: 'green', category: 'Mobility',
    acquisition: 'artifact',
    description: 'Perform a second jump in mid-air (□ twice, 5 Spirit).',
    charNote: 'Kliff needs an Artifact or observation. Damiane and Oongka auto-unlock.',
  },
  {
    id: 'k-natures-grasp', name: "Nature's Grasp", branch: 'green', category: 'Nature Skills',
    acquisition: 'observe',
    description: 'Grab an enemy with nature energy from a distance (△+○ on target, 40 Stamina).',
    charNote: 'Kliff must observe an enemy performing this. Damiane and Oongka auto-unlock.',
  },
  {
    id: 'k-natures-snare', name: "Nature's Snare", branch: 'green', category: 'Nature Skills',
    acquisition: 'artifact', requires: 'Keen Senses Lv3 + Focus Lv2', exclusive: true,
    description: 'Summon binding roots that immobilize a target briefly. Also learnable via observation.',
    innerSkills: [
      { name: "Nature's Retribution", requires: 'Lv2', description: 'After being hit, nature energy retaliates automatically.' },
      { name: "Nature's Veil", requires: 'Lv3', description: 'Become partially invisible, reducing enemy detection.' },
    ],
  },
  {
    id: 'k-natures-echo', name: "Nature's Echo", branch: 'green', category: 'Nature Skills',
    acquisition: 'artifact', requires: 'Keen Senses Lv3 + Forward Slash Lv3', exclusive: true,
    description: 'Channel nature energy to echo (duplicate) your next sword attack. Critical for shield-heavy bosses — doubles heavy attacks through blocking.',
    charNote: 'Key skill for boss fights — Nature\'s Echo + Tauria Curved Sword is the recommended setup for shield bosses like Antumbra\'s Sword.',
    innerSkills: [
      { name: 'Echoing Forward Slash', requires: 'Echo Lv1', description: 'Forward Slash creates a spirit echo.' },
      { name: 'Echoing Spinning Slash', description: 'Spinning Slash creates a spirit echo.' },
      { name: 'Echoing Stab', description: 'Stab creates a spirit echo.' },
    ],
  },
  {
    id: 'k-force-palm', name: 'Force Palm', branch: 'green', category: 'Spirit Arts',
    acquisition: 'observe', exclusive: true,
    description: 'A devastating open-palm strike (R3, 5 Spirit) that sends enemies flying. Learned by watching a holographic projection.',
    charNote: 'Exclusive to Kliff. Can chain up to 3 follow-up strikes at max level. Aerial, Healing, and Diving variants available.',
    innerSkills: [
      { name: 'Aerial Force Palm', requires: 'Lv1', description: 'Execute Force Palm while airborne.' },
      { name: 'Healing Force Palm', requires: 'Lv1', description: 'Variant that restores HP on hit.' },
      { name: 'Force Palm Proficiency', requires: 'Lv2', description: 'Chain up to 2 follow-up strikes.' },
      { name: 'Force Palm Expertise', requires: 'Lv3', description: 'Chain up to 3 follow-up strikes.' },
      { name: 'Force Palm Pulse', requires: 'Lv3 + Unarmed Combat Lv3', description: 'AoE pulse variant of Force Palm.' },
      { name: 'Diving Force Palm', requires: 'Observe (after Aerial Swing)', description: 'Dive from flight into a Force Palm ground slam.' },
    ],
  },
  {
    id: 'k-focused-shot', name: 'Focused Shot', branch: 'green', category: 'Ranged Focus',
    acquisition: 'artifact', requires: 'Marksmanship Lv2 + Focus Lv2',
    description: 'Enter Focus then fire (L3+R3 then R1, 3 Spirit) for extreme accuracy. Time slows while aiming.',
    charNote: 'Kliff requires prerequisites. Damiane and Oongka auto-unlock this.',
    innerSkills: [
      { name: 'Focused Evasive Shot', requires: 'Lv2', description: 'Evasive Shot usable while in Focus mode.' },
      { name: 'Focused Charged Shot', requires: 'Lv3', description: 'Charged Shot with full Focus precision.' },
    ],
  },

  // ── RED: HEALTH / ELEMENTAL ──────────────────────────────────────────────────
  {
    id: 'k-charged-shot', name: 'Charged Shot', branch: 'red', category: 'Ranged',
    acquisition: 'artifact',
    description: 'Hold to charge the bow for a high-damage precision shot (Hold R2 while aiming, 10 Spirit). Also learnable via observation.',
    charNote: 'Kliff needs an Artifact or observation. Damiane and Oongka auto-unlock.',
  },
  {
    id: 'k-axiom-force', name: 'Axiom Force', branch: 'red', category: 'Axiom',
    acquisition: 'story', requires: 'Chapter I — certain Abyss conditions', exclusive: true,
    description: 'Harness Abyss power to launch into aerial traversal and combat (L3). Enables the full aerial combat suite.',
    charNote: 'Exclusive to Kliff — granted through his Abyss connection. Gateway to Aerial Maneuver, Aerial Swing, and Diving Force Palm.',
    innerSkills: [
      { name: 'Aerial Maneuver', requires: 'Lv2', description: 'A powerful great leap covering distance (200 Stamina).' },
      { name: 'Aerial Swing', requires: 'Lv3', description: 'Lock on and leap into an overhead sword swing (200 Stamina).' },
    ],
  },
  {
    id: 'k-flight', name: 'Flight', branch: 'red', category: 'Axiom',
    acquisition: 'observe', requires: 'Certain story conditions',
    description: 'Spread crow-like Abyss wings and take to the skies (□ while airborne, 25 Stam/sec).',
    charNote: 'Kliff uses supernatural Abyss glide. Flight method is unique per character.',
    innerSkills: [
      { name: 'Swift Flight', requires: 'Lv2', description: 'Increases flight speed (50 Stamina/sec).' },
    ],
  },
  {
    id: 'k-aerial-roll', name: 'Aerial Roll', branch: 'red', category: 'Axiom',
    acquisition: 'artifact',
    description: 'Perform evasive rolls while airborne (○ during flight, 80 Stamina). Dodge aerial attacks.',
  },
  {
    id: 'k-imbue-element', name: 'Imbue Element', branch: 'red', category: 'Elemental',
    acquisition: 'artifact', requires: 'Any elemental skill at Lv1',
    description: 'Infuse weapon or abilities with elemental power. Unlocks elemental variants of your core skills.',
    innerSkills: [
      { name: 'Elemental Force Palm', description: 'Force Palm imbued with an element.' },
      { name: 'Elemental Charged Shot', description: 'Charged Shot with elemental explosion.' },
      { name: 'Elemental Turning Slash', description: 'Turning Slash with elemental effect.' },
      { name: 'Elemental Meteor Kick', description: 'Meteor Kick with elemental burst on landing.' },
    ],
  },
  {
    id: 'k-flame-strike', name: 'Flame Strike', branch: 'red', category: 'Elemental',
    acquisition: 'artifact', requires: 'Flame element Lv1',
    description: 'A fiery overhead slam (R2+△, 10 Spirit) that leaves burning ground on impact.',
  },
  {
    id: 'k-frost-mantle', name: 'Frost Mantle', branch: 'red', category: 'Elemental',
    acquisition: 'artifact', requires: 'Frost element Lv1',
    description: 'Frost armor (R2+□, 10 Spirit) that slows enemies who strike you in melee. Identical across all characters.',
  },
  {
    id: 'k-lightning-surge', name: 'Lightning Surge', branch: 'red', category: 'Elemental',
    acquisition: 'artifact', requires: 'Lightning element Lv1', exclusive: true,
    description: 'Create an electric field on the ground (R2+○, 10 Spirit) that chains across nearby enemies.',
  },
  {
    id: 'k-storm-veil', name: 'Storm Veil', branch: 'red', category: 'Elemental',
    acquisition: 'artifact', requires: 'Wind element Lv1', exclusive: true,
    description: 'Summon a smoke cloud (R2+X, 10 Spirit) for stealth — reduces enemy detection range.',
  },
];

const DAMIANE_SKILLS: SkillDef[] = [
  // ── BLUE: STAMINA / COMBAT ───────────────────────────────────────────────────
  {
    id: 'd-armed-combat', name: 'Armed Combat', branch: 'blue', category: 'Armed Combat',
    acquisition: 'auto',
    description: 'Foundation for weapon-based combat. Higher levels unlock sub-techniques.',
    innerSkills: [
      { name: 'Evasive Smite', description: 'Dodge and smite simultaneously (R1+○, 40 Stamina) — auto-unlocked.' },
      { name: 'Quick Swap', description: 'Instantly switch weapons — auto-unlocked.' },
      { name: 'Charge', requires: 'Lv3', description: 'Rush forward while guarding.' },
    ],
  },
  {
    id: 'd-piercing-light', name: 'Piercing Light', branch: 'blue', category: 'Sword Mastery',
    acquisition: 'auto', exclusive: true,
    description: 'A charged piercing thrust (R1+△, 40 Stamina). Damiane\'s signature stab, opening unique follow-up combos.',
    charNote: 'Damiane\'s equivalent of Kliff\'s Stab, but with entirely different inner skills — Uppercut launches enemies, enabling Aerial Grapple.',
    innerSkills: [
      { name: 'Uppercut', requires: 'Lv2', description: 'Press R1 after a charged Piercing Light to launch the enemy airborne.' },
      { name: 'Skewer', requires: 'Lv2 or Observe', description: 'Move after charged Piercing Light to pin the enemy.' },
      { name: 'Piercing Light Rend Armor', description: 'Ignores Super Armor.' },
    ],
  },
  {
    id: 'd-sword-flurry', name: 'Sword Flurry', branch: 'blue', category: 'Sword Mastery',
    acquisition: 'auto',
    description: 'Unleash a rapid flurry of rapier strikes (R1+X, 30 Stamina).',
    innerSkills: [
      { name: 'Sword Flurry Proficiency', requires: 'Lv2', description: 'Improved speed and additional hit.' },
    ],
  },
  {
    id: 'd-blinding-flash', name: 'Blinding Flash', branch: 'blue', category: 'Sword Mastery',
    acquisition: 'auto',
    description: 'A disorienting flash from the blade (L1+R1). Blinds enemies. Auto-unlocked for Damiane.',
    charNote: 'Damiane and Oongka auto-unlock this. Kliff must earn it via main story quest.',
  },
  {
    id: 'd-smiting-bolt', name: 'Smiting Bolt', branch: 'blue', category: 'Smiting',
    acquisition: 'auto', exclusive: true,
    description: 'Fire a bolt of smiting energy (R2, 40 Stamina) at a distant target.',
    charNote: 'Unique to Damiane — part of her Smiting skill cluster, powered by Abyss energy channeled through her noble training.',
    innerSkills: [
      { name: 'Smiting Bolt Proficiency', requires: 'Lv2', description: 'Faster cast and stronger impact.' },
      { name: 'Smiting Bolt Sure Hit', description: 'Guaranteed connection.' },
    ],
  },
  {
    id: 'd-smiting-strike', name: 'Smiting Strike', branch: 'blue', category: 'Smiting',
    acquisition: 'auto', exclusive: true,
    description: 'A powerful smiting blow (R1+R2, 10 Spirit) charged with Abyss energy — Damiane\'s heavy melee variant.',
    charNote: 'Unique to Damiane. Can be imbued with elemental power via Imbue Element.',
    innerSkills: [
      { name: 'Smiting Strike Expertise', description: 'Extended follow-up combo.' },
      { name: 'Smiting Strike Proficiency', description: 'Faster execution.' },
      { name: 'Smiting Strike Rend Armor', description: 'Ignores Super Armor.' },
    ],
  },
  {
    id: 'd-shield-toss', name: 'Shield Toss', branch: 'blue', category: 'Armed Combat',
    acquisition: 'auto', exclusive: true,
    description: 'Throw the shield as a ranged weapon (R3, 5 Spirit) that ricochets between enemies.',
    charNote: 'Exclusive to Damiane. Required to unlock Shield Sentinel and Blade Sentinel.',
    innerSkills: [
      { name: 'Shield Toss Proficiency', requires: 'Lv2', description: 'Shield bounces up to 5 times.' },
      { name: 'Shield Toss Expertise', description: 'Enhanced return path and damage.' },
    ],
  },
  {
    id: 'd-unarmed-combat', name: 'Unarmed Combat', branch: 'blue', category: 'Unarmed Combat',
    acquisition: 'auto',
    description: 'Foundation for hand-to-hand combat (△).',
    innerSkills: [
      { name: 'Leg Sweep', description: 'Low trip attack.' },
      { name: 'Scissor Takedown', requires: 'Lv2', description: 'Scissoring leg takedown.' },
      { name: 'Unarmed Combat Proficiency', requires: 'Lv3', description: 'Enhanced combo speed.' },
      { name: 'Flying Kick', requires: 'Lv4', description: 'Leaping kick.' },
      { name: 'Meteor Kick', requires: 'Lv5 or Observe', description: 'Devastating aerial heel drop.' },
    ],
  },
  {
    id: 'd-scissor-kick', name: 'Scissor Kick', branch: 'blue', category: 'Unarmed Combat',
    acquisition: 'auto', exclusive: true,
    description: 'A scissoring kick that launches enemies airborne (Hold △). Sets up aerial follow-ups.',
  },
  {
    id: 'd-tornado-kick', name: 'Tornado Kick', branch: 'blue', category: 'Unarmed Combat',
    acquisition: 'artifact', exclusive: true,
    description: 'A spinning kick that hits multiple surrounding enemies. Also learnable via observation.',
  },
  {
    id: 'd-flurry-of-kicks', name: 'Flurry of Kicks', branch: 'blue', category: 'Unarmed Combat',
    acquisition: 'artifact', requires: 'Unarmed Lv3 + Keen Senses Lv3', exclusive: true,
    description: 'A rapid barrage of kicks (Hold △, 20 Spirit).',
  },
  {
    id: 'd-grappling', name: 'Grappling', branch: 'blue', category: 'Unarmed Combat',
    acquisition: 'auto',
    description: 'Master grappling (△+○ or X+□). Damiane\'s version includes Screwdriver and Aerial Grapple.',
    innerSkills: [
      { name: 'Restrain', description: 'Pin an enemy.' },
      { name: 'Throw', description: 'Hurl an enemy (40 Stamina).' },
      { name: 'Lariat', requires: 'Lv2', description: 'Running arm clothesline.' },
      { name: 'Screwdriver', requires: 'Lv3', description: 'Grab enemy and spin into a drilling throw — unique to Damiane.' },
      { name: 'Back Hang', requires: 'Lv4', description: 'Suspend enemy behind you.' },
      { name: 'Aerial Grapple', requires: 'Lv5 + Uppercut', description: 'Grab an airborne enemy (X+□ after Uppercut) and slam them down — exclusive to Damiane.' },
    ],
  },
  {
    id: 'd-marksmanship', name: 'Marksmanship', branch: 'blue', category: 'Ranged',
    acquisition: 'auto',
    description: 'Foundation for all ranged attacks (L2 to aim). Passive accuracy improvement.',
  },
  {
    id: 'd-evasive-shot', name: 'Evasive Shot', branch: 'blue', category: 'Ranged',
    acquisition: 'artifact',
    description: 'Fire while rolling or evading (○+○ while aiming, 45 Stamina).',
    innerSkills: [
      { name: 'Explosive Evasive Shot', description: 'Deals explosive area damage.' },
      { name: 'Evasive Shot Proficiency', description: 'Improved accuracy.' },
      { name: 'Evasive Shot Expertise', description: 'Enhanced follow-up shot.' },
    ],
  },
  {
    id: 'd-evasive-roll', name: 'Evasive Roll', branch: 'blue', category: 'Mobility',
    acquisition: 'auto',
    description: 'A quick evasive roll after taking a hit (○ after damage, 10 Spirit). Auto-unlocked for Damiane.',
    charNote: 'Damiane auto-unlocks this. Kliff needs an Artifact or observation.',
  },

  // ── GREEN: SPIRIT / DEFENSE ──────────────────────────────────────────────────
  {
    id: 'd-keen-senses', name: 'Keen Senses', branch: 'green', category: 'Core Defense',
    acquisition: 'auto',
    description: 'Heighten combat awareness. Foundation for parrying, dodging, and countering.',
    innerSkills: [
      { name: 'Parry', description: 'Deflect incoming attacks — auto-unlocked for Damiane.' },
      { name: 'Dodge', description: 'Enhanced directional dodge — auto-unlocked for Damiane.' },
      { name: 'Counter', requires: 'Lv3 or Observe', description: 'After a successful parry, strike back.' },
    ],
  },
  {
    id: 'd-focus', name: 'Focus', branch: 'green', category: 'Core Defense',
    acquisition: 'auto',
    description: 'Enter a focused state (L3+R3) that slows perceived time. Starting ability for Damiane — no inner skills.',
    charNote: 'Damiane\'s Focus only slows time. No Spirit regen, no inner skills (unlike Kliff\'s version). Enables Shield Sentinel and Blade Sentinel when combined with Shield Toss.',
  },
  {
    id: 'd-double-jump', name: 'Double Jump', branch: 'green', category: 'Mobility',
    acquisition: 'auto',
    description: 'Perform a second jump in mid-air (□ twice, 5 Spirit). Auto-unlocked for Damiane.',
  },
  {
    id: 'd-natures-grasp', name: "Nature's Grasp", branch: 'green', category: 'Nature Skills',
    acquisition: 'auto',
    description: 'Grab an enemy with nature energy from a distance (△+○, 40 Stamina). Auto-unlocked for Damiane.',
  },
  {
    id: 'd-focused-shot', name: 'Focused Shot', branch: 'green', category: 'Ranged Focus',
    acquisition: 'auto',
    description: 'Enter Focus then fire (L3+R3 then R1, 3 Spirit) for extreme accuracy. Auto-unlocked for Damiane.',
    charNote: 'Damiane auto-unlocks this. Kliff requires Marksmanship Lv2 + Focus Lv2.',
    innerSkills: [
      { name: 'Focused Evasive Shot', requires: 'Lv2', description: 'Evasive Shot usable while in Focus mode.' },
      { name: 'Focused Charged Shot', requires: 'Lv3', description: 'Charged Shot with full Focus precision.' },
    ],
  },
  {
    id: 'd-shield-sentinel', name: 'Shield Sentinel', branch: 'green', category: 'Sentinel System',
    acquisition: 'artifact', requires: 'Focus Lv2 + Shield Toss Lv2', exclusive: true,
    description: 'In Focus mode, press R1 to summon a Shield Sentinel (10 Spirit) — an autonomous shield that attacks alongside you.',
    charNote: 'Exclusive to Damiane. Foundation of her Sentinel mechanic — combine with Blade Sentinel for a powerful dual attack.',
  },
  {
    id: 'd-blade-sentinel', name: 'Blade Sentinel', branch: 'green', category: 'Sentinel System',
    acquisition: 'artifact', requires: 'Focus Lv3 + Shield Toss Lv3', exclusive: true,
    description: 'In Focus mode, press R3 to summon a Blade Sentinel (10 Spirit) — a sword spirit that strikes simultaneously with you.',
    charNote: 'Exclusive to Damiane. Enables coordinated attacks from three angles at once.',
  },

  // ── RED: HEALTH / ELEMENTAL ──────────────────────────────────────────────────
  {
    id: 'd-charged-shot', name: 'Charged Shot', branch: 'red', category: 'Ranged',
    acquisition: 'auto',
    description: 'Hold to charge for a high-damage precision shot (Hold R2 while aiming, 10 Spirit). Auto-unlocked for Damiane.',
    charNote: 'Damiane auto-unlocks this. Kliff needs an Artifact or observation.',
  },
  {
    id: 'd-flight', name: 'Flight', branch: 'red', category: 'Mobility',
    acquisition: 'auto',
    description: 'Deploy a mechanical glider and soar (□ while airborne, 25 Stam/sec). Auto-unlocked for Damiane.',
    charNote: 'Damiane uses a mechanical glider and auto-unlocks it. Kliff/Oongka require story conditions.',
    innerSkills: [
      { name: 'Swift Flight', requires: 'Lv2', description: 'Increases flight speed (50 Stamina/sec).' },
    ],
  },
  {
    id: 'd-skystep', name: 'Skystep', branch: 'red', category: 'Mobility',
    acquisition: 'story', requires: 'Certain story conditions', exclusive: true,
    description: 'A mid-air repositioning step using the Abyss Fan gadget (L3 in mid-air, 10 Spirit). Instant aerial repositioning.',
    charNote: 'Exclusive to Damiane.',
  },
  {
    id: 'd-imbue-element', name: 'Imbue Element', branch: 'red', category: 'Elemental',
    acquisition: 'artifact', requires: 'Any elemental skill at Lv1',
    description: 'Infuse weapon or abilities with elemental power. Unlocks elemental variants of key skills.',
    innerSkills: [
      { name: 'Elemental Charged Shot', description: 'Charged Shot with elemental explosion.' },
      { name: 'Elemental Smiting Strike', description: 'Smiting Strike imbued with an element.' },
      { name: 'Elemental Shield Toss', description: 'Shield Toss with elemental effect.' },
      { name: 'Elemental Meteor Kick', description: 'Meteor Kick with elemental burst on landing.' },
    ],
  },
  {
    id: 'd-flame-rush', name: 'Flame Rush', branch: 'red', category: 'Elemental',
    acquisition: 'artifact', requires: 'Flame element Lv1', exclusive: true,
    description: 'A blazing forward rush (R2+△, 10 Spirit) that scorches enemies in the path.',
  },
  {
    id: 'd-frost-mantle', name: 'Frost Mantle', branch: 'red', category: 'Elemental',
    acquisition: 'artifact', requires: 'Frost element Lv1',
    description: 'Frost armor (R2+□, 10 Spirit) — identical across all characters.',
  },
  {
    id: 'd-lightning-strike', name: 'Lightning Strike', branch: 'red', category: 'Elemental',
    acquisition: 'artifact', requires: 'Lightning element Lv1', exclusive: true,
    description: 'Channel electricity through the sword tip for an electric burst (R2+○, 10 Spirit).',
  },
  {
    id: 'd-storm-pillar', name: 'Storm Pillar', branch: 'red', category: 'Elemental',
    acquisition: 'artifact', requires: 'Wind element Lv1', exclusive: true,
    description: 'Summon a whirlwind pillar (R2+X, 10 Spirit) that pulls enemies toward the center, then explodes.',
  },
];

const OONGKA_SKILLS: SkillDef[] = [
  // ── BLUE: STAMINA / COMBAT ───────────────────────────────────────────────────
  {
    id: 'o-armed-combat', name: 'Armed Combat', branch: 'blue', category: 'Armed Combat',
    acquisition: 'auto',
    description: 'Foundation for weapon-based combat. Oongka auto-unlocks several sub-techniques others must earn.',
    charNote: 'Oongka\'s Armed Combat auto-unlocks Leaping Smash, Clothesline, Body Slam, and Quick Swap. Dual Wielding Mastery at Lv4 lets him wield two-handed weapons one-handed — exclusive.',
    innerSkills: [
      { name: 'Leaping Smash', description: 'Leap and smash down (R1+○, 40 Stamina) — auto-unlocked.' },
      { name: 'Clothesline', description: 'Sprint and clothesline enemies (X+□ sprinting, 60 Stamina) — auto-unlocked.' },
      { name: 'Body Slam', description: 'Airborne body tackle (X+□ airborne, 60 Stamina) — auto-unlocked.' },
      { name: 'Charge', requires: 'Lv3 or Observe', description: 'Rush forward with weapon.' },
      { name: 'Dual Wielding Mastery', requires: 'Lv4', description: 'Wield two-handed weapons one-handed — exclusive to Oongka.' },
      { name: 'Quick Swap', description: 'Instantly switch weapons — auto-unlocked.' },
    ],
  },
  {
    id: 'o-slash', name: 'Slash', branch: 'blue', category: 'Heavy Strikes',
    acquisition: 'artifact', exclusive: true,
    description: 'A powerful horizontal slash (R1+△, 40 Stamina) with two-handed weapon. Unlocks a unique Oongka combo chain.',
    charNote: 'Exclusive to Oongka. Hack and Slash and Slash and Sling are entirely unique follow-ups.',
    innerSkills: [
      { name: 'Hack and Slash', description: 'Press R1 after charged Slash for a follow-up hack — auto-unlocked.' },
      { name: 'Slash and Sling', requires: 'Lv2', description: 'Move after charged Slash for a spinning grab throw.' },
      { name: 'Slash Rend Armor', description: 'Ignores Super Armor.' },
    ],
  },
  {
    id: 'o-rampage', name: 'Rampage', branch: 'blue', category: 'Heavy Strikes',
    acquisition: 'auto',
    description: 'A charging attack that bulldozes through enemies (R2, 30 Stamina).',
    innerSkills: [
      { name: 'Rampage Proficiency', requires: 'Lv2', description: 'Longer range, additional hits.' },
      { name: 'Rampage Sure Hit', requires: 'Lv3', description: 'Guaranteed connection.' },
    ],
  },
  {
    id: 'o-raging-lightning', name: 'Raging Lightning', branch: 'blue', category: 'Heavy Strikes',
    acquisition: 'artifact', exclusive: true,
    description: 'Channel Orc battle energy as lightning into weapon strikes (R1+X, 30 Stamina).',
    charNote: 'Exclusive to Oongka — natural Orc berserker power manifesting as electricity.',
    innerSkills: [
      { name: 'Raging Lightning Proficiency', requires: 'Lv2', description: 'Stronger electrical chain reaction.' },
    ],
  },
  {
    id: 'o-quaking-fury', name: 'Quaking Fury', branch: 'blue', category: 'Heavy Strikes',
    acquisition: 'artifact', exclusive: true,
    description: 'A ground-shaking series of powerful slams (R1+R2, 10 Stamina). Oongka\'s signature crowd-clearing combo.',
    charNote: 'Exclusive to Oongka. Rend Armor variant is critical for tough enemies.',
    innerSkills: [
      { name: 'Quaking Fury Expertise', requires: 'Lv2', description: 'Ground stomp that leads directly into Quaking Fury.' },
      { name: 'Quaking Fury Proficiency', description: 'Additional slam at end of the combo.' },
      { name: 'Quaking Rend Armor', description: 'Ignores Super Armor — vital for armored foes.' },
    ],
  },
  {
    id: 'o-blinding-flash', name: 'Blinding Flash', branch: 'blue', category: 'Heavy Strikes',
    acquisition: 'auto',
    description: 'A disorienting flash (L1+R1). Auto-unlocked for Oongka.',
    charNote: 'Auto-unlocked for Oongka and Damiane. Kliff must earn it via story.',
  },
  {
    id: 'o-unarmed-combat', name: 'Unarmed Combat', branch: 'blue', category: 'Unarmed Combat',
    acquisition: 'auto',
    description: 'Foundation for Orc hand-to-hand combat (△).',
    charNote: 'Oongka gets Low Dropkick instead of Flying Kick at Lv4.',
    innerSkills: [
      { name: 'Low Dropkick', description: 'Oongka\'s version — a low lunge kick (auto-unlocked).' },
      { name: 'Scissor Takedown', requires: 'Lv2', description: 'Scissoring leg takedown.' },
      { name: 'Unarmed Combat Proficiency', requires: 'Lv3', description: 'Enhanced combo speed.' },
      { name: 'Meteor Kick', requires: 'Lv5 or Observe', description: 'Devastating aerial heel drop.' },
    ],
  },
  {
    id: 'o-pump-kick', name: 'Pump Kick', branch: 'blue', category: 'Unarmed Combat',
    acquisition: 'auto',
    description: 'A pumping kick (Hold △) that pushes enemies back. Auto-unlocked for Oongka.',
    charNote: 'Auto-unlocked for Oongka. Kliff must observe an enemy doing it.',
  },
  {
    id: 'o-dropkick', name: 'Dropkick', branch: 'blue', category: 'Unarmed Combat',
    acquisition: 'auto',
    description: 'Launch forward and drive both feet into an enemy. Auto-unlocked for Oongka.',
    charNote: 'Auto-unlocked for Oongka. Kliff needs Pump Kick + Artifact.',
  },
  {
    id: 'o-grappling', name: 'Grappling', branch: 'blue', category: 'Unarmed Combat',
    acquisition: 'auto',
    description: 'Master grappling (△+○ or X+□). Oongka auto-unlocks Lariat — others need Lv2.',
    charNote: 'Oongka auto-unlocks Restrain, Throw, and Lariat. Kliff/Damiane must level to Lv2 for Lariat.',
    innerSkills: [
      { name: 'Restrain', description: 'Pin an enemy — auto-unlocked.' },
      { name: 'Throw', description: 'Hurl an enemy (40 Stamina) — auto-unlocked.' },
      { name: 'Lariat', description: 'Running arm clothesline — auto-unlocked for Oongka (Lv2 for others).' },
      { name: 'Giant Swing', requires: 'Lv3', description: 'Grab and spin enemy for massive impact.' },
      { name: 'Back Hang', requires: 'Lv4', description: 'Suspend enemy behind you.' },
      { name: 'Lariat Follow-up', requires: 'Lv5 or Observe', description: 'Chain a follow-up strike after Lariat.' },
    ],
  },
  {
    id: 'o-marksmanship', name: 'Marksmanship', branch: 'blue', category: 'Ranged',
    acquisition: 'auto',
    description: 'Foundation for Hand Cannon attacks (L2 to aim). Passive accuracy improvement.',
  },
  {
    id: 'o-evasive-shot', name: 'Evasive Shot', branch: 'blue', category: 'Ranged',
    acquisition: 'artifact', requires: '2+ Abyss Artifacts (or Observe)',
    description: 'Fire the Hand Cannon while rolling (○+○ while aiming, 45 Stamina).',
    charNote: 'Oongka requires 2+ Artifacts vs 1 for Kliff/Damiane — harder to unlock.',
    innerSkills: [
      { name: 'Explosive Evasive Shot', description: 'Deals explosive area damage.' },
      { name: 'Evasive Shot Proficiency', description: 'Improved accuracy.' },
      { name: 'Evasive Shot Expertise', description: 'Enhanced follow-up shot.' },
    ],
  },

  // ── GREEN: SPIRIT / DEFENSE ──────────────────────────────────────────────────
  {
    id: 'o-keen-senses', name: 'Keen Senses', branch: 'green', category: 'Core Defense',
    acquisition: 'auto',
    description: 'Heighten combat awareness. Foundation for parrying, dodging, and countering.',
    innerSkills: [
      { name: 'Parry', description: 'Deflect incoming attacks (L1 — Oongka uses L1, others guard-then-time) — auto-unlocked.' },
      { name: 'Dodge', requires: 'Lv2', description: 'Enhanced directional dodge.' },
      { name: 'Counter', requires: 'Lv3 or Observe', description: 'After a successful parry, strike back.' },
    ],
  },
  {
    id: 'o-focus', name: 'Focus', branch: 'green', category: 'Core Defense',
    acquisition: 'auto',
    description: 'Enter a focused state (L3+R3) that slows perceived time. In Focus mode, press R1 to activate Rage — Oongka\'s exclusive Super Armor state.',
    charNote: 'Oongka\'s Focus has no Spirit regen and no inner skills, but uniquely enables Rage.',
  },
  {
    id: 'o-rage', name: 'Rage', branch: 'green', category: 'Core Defense',
    acquisition: 'auto', requires: 'Focus', exclusive: true,
    description: 'Activate Super Armor in Focus mode (R1 while Focused, 10 Spirit). Tank hits without being staggered while continuing to attack.',
    charNote: 'Exclusive to Oongka. No equivalent exists for Kliff or Damiane. Fundamentally changes his damage-taking strategy.',
  },
  {
    id: 'o-double-jump', name: 'Double Jump', branch: 'green', category: 'Mobility',
    acquisition: 'auto',
    description: 'Perform a second jump in mid-air (□ twice, 5 Spirit). Auto-unlocked for Oongka.',
  },
  {
    id: 'o-natures-grasp', name: "Nature's Grasp", branch: 'green', category: 'Nature Skills',
    acquisition: 'auto',
    description: 'Grab an enemy with nature energy from a distance (△+○, 40 Stamina). Auto-unlocked for Oongka.',
  },
  {
    id: 'o-focused-shot', name: 'Focused Shot', branch: 'green', category: 'Ranged Focus',
    acquisition: 'auto',
    description: 'Enter Focus then fire the Hand Cannon (L3+R3 then R1, 3 Spirit). Auto-unlocked for Oongka.',
    innerSkills: [
      { name: 'Focused Evasive Shot', requires: 'Lv2', description: 'Evasive Shot in Focus mode.' },
      { name: 'Focused Charged Shot', requires: 'Lv3', description: 'Charged cannon shot with full Focus precision.' },
    ],
  },
  {
    id: 'o-scatter-shot', name: 'Scatter Shot', branch: 'green', category: 'Ranged Focus',
    acquisition: 'auto', exclusive: true,
    description: 'Fire the Orc Blaster in a wide scatter pattern (R3, 5 Spirit) hitting multiple enemies simultaneously.',
    charNote: 'Exclusive to Oongka — uses the Hand Cannon\'s shotgun capability. No equivalent for Kliff or Damiane.',
  },

  // ── RED: HEALTH / ELEMENTAL ──────────────────────────────────────────────────
  {
    id: 'o-charged-shot', name: 'Charged Shot', branch: 'red', category: 'Ranged',
    acquisition: 'auto',
    description: 'Charge the Hand Cannon for an explosive shot (Hold R2 while aiming, 10 Spirit). Auto-unlocked for Oongka.',
    charNote: 'Auto-unlocked for Oongka. Kliff needs an Artifact or observation.',
  },
  {
    id: 'o-flight', name: 'Flight', branch: 'red', category: 'Mobility',
    acquisition: 'story', requires: 'Certain story conditions',
    description: 'Ignite the Orc rocket pack and soar (□ while airborne, 25 Stam/sec).',
    charNote: 'Oongka uses a rocket pack. Requires story conditions — unlike Damiane who auto-unlocks flight.',
    innerSkills: [
      { name: 'Swift Flight', requires: 'Lv2', description: 'Increases flight speed (50 Stamina/sec).' },
    ],
  },
  {
    id: 'o-vertical-flight', name: 'Vertical Flight', branch: 'red', category: 'Mobility',
    acquisition: 'story', requires: 'Certain story conditions', exclusive: true,
    description: 'Fire the rocket pack straight up (L3, 50 Stamina) for rapid vertical ascent — instant altitude gain.',
    charNote: 'Exclusive to Oongka. No other character can ascend vertically while airborne.',
  },
  {
    id: 'o-imbue-element', name: 'Imbue Element', branch: 'red', category: 'Elemental',
    acquisition: 'artifact', requires: 'Any elemental skill at Lv1',
    description: 'Infuse weapon or abilities with elemental power. Unlocks elemental variants of Oongka\'s key skills.',
    innerSkills: [
      { name: 'Elemental Charged Shot', description: 'Charged Shot with elemental explosion.' },
      { name: 'Elemental Quaking Fury', description: 'Quaking Fury imbued with an element.' },
      { name: 'Elemental Scatter Shot', description: 'Scatter Shot with elemental bursts.' },
      { name: 'Elemental Meteor Kick', description: 'Meteor Kick with elemental burst on landing.' },
    ],
  },
  {
    id: 'o-flame-quake', name: 'Flame Quake', branch: 'red', category: 'Elemental',
    acquisition: 'artifact', requires: 'Flame element Lv1', exclusive: true,
    description: 'A fiery ground slam (R2+△, 10 Spirit) that ignites the area around impact.',
  },
  {
    id: 'o-frost-mantle', name: 'Frost Mantle', branch: 'red', category: 'Elemental',
    acquisition: 'artifact', requires: 'Frost element Lv1',
    description: 'Frost armor (R2+□, 10 Spirit) — identical across all characters.',
  },
  {
    id: 'o-lightning-pulse', name: 'Lightning Pulse', branch: 'red', category: 'Elemental',
    acquisition: 'artifact', requires: 'Lightning element Lv1', exclusive: true,
    description: 'Gather lightning in both hands and discharge (R2+○, 10 Spirit) for a radial electric burst.',
  },
  {
    id: 'o-storm-howl', name: 'Storm Howl', branch: 'red', category: 'Elemental',
    acquisition: 'artifact', requires: 'Wind element Lv1', exclusive: true,
    description: 'A bellowing roar (R2+X, 10 Spirit) that generates a shockwave driving all nearby enemies backward.',
  },
];

const SKILL_SETS: Record<Character, SkillDef[]> = {
  kliff: KLIFF_SKILLS,
  damiane: DAMIANE_SKILLS,
  oongka: OONGKA_SKILLS,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function groupByCategory(skills: SkillDef[]): Map<string, SkillDef[]> {
  const map = new Map<string, SkillDef[]>();
  for (const skill of skills) {
    if (!map.has(skill.category)) map.set(skill.category, []);
    map.get(skill.category)!.push(skill);
  }
  return map;
}

// ─── Acquisition badge ────────────────────────────────────────────────────────

function AcqBadge({ acq }: { acq: Acquisition }) {
  const cfg = ACQ_CFG[acq];
  return (
    <span
      className="text-xs font-cinzel px-1.5 py-0.5 rounded"
      style={{ color: cfg.color, backgroundColor: cfg.color + '18', border: `1px solid ${cfg.color}33` }}
    >
      {cfg.label}
    </span>
  );
}

// ─── Skill card ───────────────────────────────────────────────────────────────

interface SkillCardProps {
  skill: SkillDef;
  unlocked: boolean;
  selected: boolean;
  onSelect: () => void;
  onToggle: () => void;
}

function SkillCard({ skill, unlocked, selected, onSelect, onToggle }: SkillCardProps) {
  const branch = BRANCH_CFG[skill.branch];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={e => e.key === 'Enter' && onSelect()}
      className="relative flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all focus:outline-none focus:ring-1"
      style={
        selected
          ? { borderColor: '#fbbf24aa', backgroundColor: '#fbbf2410', boxShadow: '0 0 0 1px #fbbf2444' }
          : unlocked
          ? { borderColor: branch.color + '55', backgroundColor: branch.bg }
          : { borderColor: '#1f2937', backgroundColor: '#0a0e16' }
      }
    >
      {/* Unlock checkbox */}
      <button
        className="flex-shrink-0 mt-0.5 w-4 h-4 rounded border-2 transition-all focus:outline-none"
        style={{
          borderColor: unlocked ? branch.color : '#374151',
          backgroundColor: unlocked ? branch.color + '33' : 'transparent',
        }}
        onClick={e => { e.stopPropagation(); onToggle(); }}
        aria-label={unlocked ? 'Mark locked' : 'Mark unlocked'}
      >
        {unlocked && (
          <svg viewBox="0 0 16 16" fill="none" className="w-full h-full p-px">
            <path d="M3 8l3.5 3.5L13 5" stroke={branch.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className={`font-cinzel text-sm font-semibold leading-tight truncate ${unlocked ? 'text-gold-300' : 'text-gray-300'}`}>
            {skill.name}
          </span>
          {skill.exclusive && (
            <span className="text-xs font-cinzel px-1 py-px rounded text-amber-400 bg-amber-900/20 border border-amber-700/40 flex-shrink-0">
              ★
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <AcqBadge acq={skill.acquisition} />
          {skill.innerSkills && skill.innerSkills.length > 0 && (
            <span className="text-xs text-gray-600">{skill.innerSkills.length} inner</span>
          )}
        </div>
      </div>

      {/* Chevron */}
      <svg className="flex-shrink-0 w-3.5 h-3.5 text-gray-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}

// ─── Skill detail modal ───────────────────────────────────────────────────────

interface SkillDetailProps {
  skill: SkillDef;
  unlocked: boolean;
  onClose: () => void;
  onToggle: () => void;
}

function SkillDetail({ skill, unlocked, onClose, onToggle }: SkillDetailProps) {
  const branch = BRANCH_CFG[skill.branch];
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const handleClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div
        ref={cardRef}
        className="bg-pywel-card rounded-xl p-6 max-w-lg w-full shadow-2xl border overflow-y-auto max-h-[90vh]"
        style={{ borderColor: branch.color + '44' }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: branch.color }} />
              <span className="text-xs font-cinzel" style={{ color: branch.color }}>
                {branch.label} · {skill.category}
              </span>
              {skill.exclusive && (
                <span className="text-xs font-cinzel px-1.5 py-0.5 rounded text-amber-400 bg-amber-900/20 border border-amber-700/40">
                  ★ Exclusive
                </span>
              )}
            </div>
            <h3 className="text-xl font-cinzel font-bold text-gold-300">{skill.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 text-2xl leading-none p-1 -mr-1 -mt-1 flex-shrink-0"
          >
            ×
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4">{skill.description}</p>

        {/* Acquisition + Requirements */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="bg-pywel-bg/60 rounded-lg px-3 py-2 border border-pywel-border/40">
            <p className="text-xs text-gray-500 font-cinzel mb-1">UNLOCK</p>
            <AcqBadge acq={skill.acquisition} />
          </div>
          {skill.requires && (
            <div className="bg-pywel-bg/60 rounded-lg px-3 py-2 border border-pywel-border/40 flex-1 min-w-32">
              <p className="text-xs text-gray-500 font-cinzel mb-1">REQUIRES</p>
              <p className="text-sm text-gray-300">{skill.requires}</p>
            </div>
          )}
        </div>

        {/* Character note */}
        {skill.charNote && (
          <div
            className="rounded-lg p-3 mb-4 border"
            style={{ backgroundColor: branch.color + '0d', borderColor: branch.color + '33' }}
          >
            <p className="text-xs font-cinzel mb-1" style={{ color: branch.color }}>CHARACTER NOTE</p>
            <p className="text-sm text-gray-300 leading-relaxed">{skill.charNote}</p>
          </div>
        )}

        {/* Inner skills */}
        {skill.innerSkills && skill.innerSkills.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-cinzel text-gray-500 mb-2 uppercase tracking-wider">
              Inner Skills ({skill.innerSkills.length})
            </p>
            <div className="space-y-2">
              {skill.innerSkills.map((inner, i) => (
                <div key={i} className="rounded-lg p-2.5 border border-pywel-border/30 bg-pywel-bg/40">
                  <div className="flex items-start gap-2 mb-0.5 flex-wrap">
                    <span className="text-sm font-cinzel font-semibold text-gray-200">{inner.name}</span>
                    {inner.requires && (
                      <span className="text-xs text-gray-500 font-cinzel">req: {inner.requires}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{inner.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toggle */}
        <button
          onClick={onToggle}
          className={`w-full py-2.5 rounded-lg font-cinzel font-semibold text-sm transition-all border ${
            unlocked
              ? 'bg-green-900/20 border-green-700/40 text-green-400 hover:bg-green-900/40'
              : 'bg-pywel-bg border-pywel-border text-gray-400 hover:text-gold-300 hover:border-gold-500/50'
          }`}
        >
          {unlocked ? '✓ Unlocked — click to reset' : 'Mark as Unlocked'}
        </button>
      </div>
    </div>
  );
}

// ─── Branch panel ─────────────────────────────────────────────────────────────

interface BranchPanelProps {
  branch: Branch;
  skills: SkillDef[];
  unlocked: Set<string>;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
}

function BranchPanel({ branch, skills, unlocked, selectedId, onSelect, onToggle }: BranchPanelProps) {
  const cfg = BRANCH_CFG[branch];
  const grouped = groupByCategory(skills);
  const total = skills.length;
  const unlockedCount = skills.filter(s => unlocked.has(s.id)).length;

  return (
    <div className="rounded-xl border overflow-hidden flex flex-col" style={{ borderColor: cfg.border }}>
      {/* Branch header */}
      <div
        className="px-4 py-3 flex items-center gap-3 border-b flex-shrink-0"
        style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}
      >
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.color }} />
        <div className="flex-1">
          <h3 className="font-cinzel font-bold text-sm" style={{ color: cfg.color }}>{cfg.label}</h3>
          <p className="text-xs text-gray-500">{cfg.sub}</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-cinzel font-semibold" style={{ color: unlockedCount === total ? '#4ade80' : cfg.color }}>
            {unlockedCount}/{total}
          </span>
          <div className="w-16 bg-black/40 rounded-full h-1 mt-1 overflow-hidden">
            <div
              className="h-full transition-all duration-300 rounded-full"
              style={{ width: `${total > 0 ? (unlockedCount / total) * 100 : 0}%`, backgroundColor: cfg.color + 'cc' }}
            />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="p-3 space-y-4 overflow-y-auto" style={{ backgroundColor: '#08091200' }}>
        {[...grouped.entries()].map(([category, catSkills]) => (
          <div key={category}>
            <p className="text-xs font-cinzel text-gray-600 uppercase tracking-widest mb-2 px-1">{category}</p>
            <div className="space-y-1.5">
              {catSkills.map(skill => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  unlocked={unlocked.has(skill.id)}
                  selected={selectedId === skill.id}
                  onSelect={() => onSelect(skill.id)}
                  onToggle={() => onToggle(skill.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Character info bar ───────────────────────────────────────────────────────

function CharInfoBar({ char }: { char: Character }) {
  const info = CHAR_INFO[char];
  return (
    <div className="bg-pywel-card rounded-lg border border-pywel-border p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <p className="text-xs font-cinzel text-gray-500 mb-0.5 uppercase tracking-wider">Role</p>
          <p className="text-sm text-gray-200 font-semibold">{info.role}</p>
          <p className="text-xs text-gray-500 mt-0.5">{info.title}</p>
          {char !== 'kliff' && (
            <p className="text-xs text-gold-600 mt-1 italic">Unlock: {info.unlock}</p>
          )}
        </div>
        <div>
          <p className="text-xs font-cinzel text-gray-500 mb-0.5 uppercase tracking-wider">Starting Stats</p>
          <p className="text-xs font-mono text-gray-300 leading-relaxed">{info.startingStats}</p>
          <p className="text-xs text-gray-500 mt-1">Flight: {info.flightMethod}</p>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-cinzel text-gray-500 mb-0.5 uppercase tracking-wider">Signature Mechanic</p>
          <p className="text-xs text-gray-300 leading-relaxed">{info.signature}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const CHARACTERS: { key: Character; label: string }[] = [
  { key: 'kliff',   label: 'Kliff' },
  { key: 'damiane', label: 'Damiane' },
  { key: 'oongka',  label: 'Oongka' },
];

export default function SkillsPage() {
  const [selectedChar, setSelectedChar] = useState<Character>('kliff');
  const [unlockedByChar, setUnlockedByChar] = useState<Record<Character, Set<string>>>({
    kliff:   new Set(),
    damiane: new Set(),
    oongka:  new Set(),
  });
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [activeBranch, setActiveBranch] = useState<Branch>('blue');

  const skills = SKILL_SETS[selectedChar];
  const unlocked = unlockedByChar[selectedChar];

  const toggleUnlock = useCallback((id: string) => {
    setUnlockedByChar(prev => {
      const s = new Set(prev[selectedChar]);
      if (s.has(id)) s.delete(id); else s.add(id);
      return { ...prev, [selectedChar]: s };
    });
  }, [selectedChar]);

  const handleCharChange = useCallback((char: Character) => {
    setSelectedChar(char);
    setSelectedSkillId(null);
    setActiveBranch('blue');
  }, []);

  const selectedSkill = selectedSkillId ? skills.find(s => s.id === selectedSkillId) ?? null : null;
  const branchSkills = (branch: Branch) => skills.filter(s => s.branch === branch);
  const totalSkills = skills.length;
  const totalUnlocked = skills.filter(s => unlocked.has(s.id)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Skill Tree</h1>
        <p className="text-gray-400 text-sm">Track unlocked skills across all three characters.</p>
      </div>

      {/* Character tabs */}
      <div className="flex gap-1 border-b border-pywel-border">
        {CHARACTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleCharChange(key)}
            className={`px-5 py-3 font-cinzel font-semibold text-sm transition-colors ${
              selectedChar === key
                ? 'text-gold-400 border-b-2 border-gold-400 -mb-px'
                : 'text-gray-400 hover:text-gold-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Character info */}
      <CharInfoBar char={selectedChar} />

      {/* Overall progress */}
      <div className="bg-pywel-card rounded-lg border border-pywel-border p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-cinzel text-gold-300">Skills Tracked</span>
          <span className="text-sm text-gold-400 font-bold">{totalUnlocked} / {totalSkills}</span>
        </div>
        <div className="w-full bg-pywel-bg rounded-full h-2 overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-500 rounded-full"
            style={{ width: `${totalSkills > 0 ? (totalUnlocked / totalSkills) * 100 : 0}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {(['blue', 'green', 'red'] as Branch[]).map(branch => {
            const bs = branchSkills(branch);
            const bu = bs.filter(s => unlocked.has(s.id)).length;
            const cfg = BRANCH_CFG[branch];
            return (
              <div key={branch}>
                <div className="flex justify-between text-xs font-cinzel mb-1">
                  <span style={{ color: cfg.color }}>{cfg.label}</span>
                  <span style={{ color: cfg.color }}>{bu}/{bs.length}</span>
                </div>
                <div className="w-full bg-pywel-bg rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{ width: `${bs.length > 0 ? (bu / bs.length) * 100 : 0}%`, backgroundColor: cfg.color + 'cc' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-cinzel">
        {(Object.entries(ACQ_CFG) as [Acquisition, typeof ACQ_CFG[Acquisition]][]).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
            <span style={{ color: cfg.color }}>{cfg.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5 text-amber-400">
          <span>★</span>
          <span>Exclusive — unique to this character</span>
        </div>
      </div>

      {/* Branch tabs (mobile / tablet) */}
      <div className="flex gap-1 lg:hidden">
        {(['blue', 'green', 'red'] as Branch[]).map(branch => {
          const cfg = BRANCH_CFG[branch];
          const isActive = activeBranch === branch;
          return (
            <button
              key={branch}
              onClick={() => setActiveBranch(branch)}
              className="flex-1 py-2 px-3 rounded-lg text-xs font-cinzel font-bold transition-all border"
              style={isActive
                ? { backgroundColor: cfg.bg, borderColor: cfg.color + '88', color: cfg.color }
                : { backgroundColor: 'transparent', borderColor: '#1f2937', color: '#6b7280' }
              }
            >
              {cfg.label}
            </button>
          );
        })}
      </div>

      {/* Mobile: single active branch */}
      <div className="lg:hidden">
        <BranchPanel
          branch={activeBranch}
          skills={branchSkills(activeBranch)}
          unlocked={unlocked}
          selectedId={selectedSkillId}
          onSelect={setSelectedSkillId}
          onToggle={toggleUnlock}
        />
      </div>

      {/* Desktop: all 3 branches side by side */}
      <div className="hidden lg:grid grid-cols-3 gap-4">
        {(['blue', 'green', 'red'] as Branch[]).map(branch => (
          <BranchPanel
            key={branch}
            branch={branch}
            skills={branchSkills(branch)}
            unlocked={unlocked}
            selectedId={selectedSkillId}
            onSelect={setSelectedSkillId}
            onToggle={toggleUnlock}
          />
        ))}
      </div>

      {/* Skill detail modal */}
      {selectedSkill && (
        <SkillDetail
          skill={selectedSkill}
          unlocked={unlocked.has(selectedSkill.id)}
          onClose={() => setSelectedSkillId(null)}
          onToggle={() => toggleUnlock(selectedSkill.id)}
        />
      )}

      <p className="text-center text-xs text-gray-600">
        Skill data sourced from Fextralife wiki + Game8 guides — verified post-launch (March 2026)
      </p>
    </div>
  );
}
