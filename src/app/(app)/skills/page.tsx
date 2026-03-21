'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { Character } from '@/types/game-data';
import { SKILLS } from '@/lib/game-data';

// ─── Skill data for Kliff ─────────────────────────────────────────────────────
// Source: Beebom pre-launch preview (beebom.com/crimson-desert-skills/)
// Full details to be verified post-launch.

interface SkillDetail {
  name: string;
  description: string;
  maxLevel: number;
  branch: string;
  enhancement?: string; // what's needed to unlock/enhance
  source?: string; // how it's learned
}

interface TreeNode {
  id: string;
  x: number; // % of canvas width
  y: number; // % of canvas height
  size: 'lg' | 'md' | 'sm';
  branch: 'blue' | 'green' | 'red' | 'core';
  connections: string[];
  skill?: SkillDetail;
}

// ─── Complete Kliff skill data ────────────────────────────────────────────────
// Sources: allthings.how, Game8, Beebom, GamesRadar, GameRant, Fextralife, Xbox Wire (March 2026)

const SKILL_DATA: Record<string, SkillDetail> = {
  // ── BLUE BRANCH: STAMINA ──────────────────────────────────────────────────
  'stamina': {
    name: 'Stamina',
    description: 'Increases maximum stamina pool (16 levels). Stamina fuels dodges, sprints, gliding, and special attacks.',
    maxLevel: 16,
    branch: 'Stamina',
    source: 'Passive — increases automatically',
  },
  'armed-combat': {
    name: 'Armed Combat',
    description: 'Master weapon-based fighting. Higher levels unlock Evasive Slash, Charge, Rush, and Quick Swap sub-skills.',
    maxLevel: 5,
    branch: 'Armed Combat',
    source: 'Abyss Artifact',
  },
  'unarmed-combat': {
    name: 'Unarmed Combat',
    description: 'Develop hand-to-hand fighting prowess. Unlocks Leg Sweep, Scissor Takedown, and Proficiency sub-skills.',
    maxLevel: 5,
    branch: 'Unarmed Combat',
    source: 'Abyss Artifact',
  },
  'archery': {
    name: 'Archery',
    description: 'Improve bow handling and accuracy. Foundation for all ranged techniques.',
    maxLevel: 5,
    branch: 'Archery',
    source: 'Abyss Artifact',
  },

  // Sword skills
  'forward-slash': {
    name: 'Forward Slash',
    description: 'A forward slashing attack. Upgrades unlock Proficiency and Sure Hit variants.',
    maxLevel: 3,
    branch: 'Sword Mastery',
    enhancement: 'Armed Combat Lv. 2',
    source: 'Abyss Artifact',
  },
  'turning-slash': {
    name: 'Turning Slash',
    description: 'A wide turning slash hitting enemies on all sides. Upgrades unlock Expertise, Proficiency, and Rend Armor variants.',
    maxLevel: 3,
    branch: 'Sword Mastery',
    enhancement: 'Forward Slash Lv. 2',
    source: 'Abyss Artifact',
  },
  'stab': {
    name: 'Stab',
    description: 'A piercing thrust with the highest single-target DPS. Upgrades include Aerial Stab, Rend Armor, Skewering Stab, and Swift Stab. Max-level Rend Armor ignores boss super armor.',
    maxLevel: 3,
    branch: 'Sword Mastery',
    enhancement: 'Armed Combat Lv. 3',
    source: 'Abyss Artifact',
  },
  'spinning-slash': {
    name: 'Spinning Slash',
    description: 'A wide spinning attack that hits all surrounding enemies. Upgrades include Proficiency.',
    maxLevel: 2,
    branch: 'Sword Mastery',
    enhancement: 'Stab Lv. 2',
    source: 'Abyss Artifact',
  },
  'sword-flurry': {
    name: 'Sword Flurry',
    description: 'Unleash a rapid flurry of sword strikes in quick succession.',
    maxLevel: 2,
    branch: 'Sword Mastery',
    enhancement: 'Turning Slash Lv. 2',
    source: 'Abyss Artifact',
  },
  'blinding-flash': {
    name: 'Blinding Flash',
    description: 'A flash of light from the blade that stuns enemies. The Blinding Flash Finisher triggers on perfect timing for burst damage with no stamina cost.',
    maxLevel: 1,
    branch: 'Sword Mastery',
    enhancement: 'Sword Flurry Lv. 1',
    source: 'Abyss Artifact',
  },
  'evasive-slash': {
    name: 'Evasive Slash',
    description: 'Dodge and slash simultaneously, maintaining offense while avoiding damage.',
    maxLevel: 1,
    branch: 'Armed Combat',
    enhancement: 'Armed Combat Lv. 1',
    source: 'Abyss Artifact',
  },
  'shield-bash': {
    name: 'Shield Bash',
    description: 'Strike an enemy with your shield, staggering them and opening a counterattack window.',
    maxLevel: 1,
    branch: 'Armed Combat',
    enhancement: 'Armed Combat Lv. 2',
    source: 'Abyss Artifact',
  },
  'charge': {
    name: 'Charge',
    description: 'Rush forward with your weapon to close distance and land a powerful hit.',
    maxLevel: 1,
    branch: 'Armed Combat',
    enhancement: 'Armed Combat Lv. 4',
    source: 'Abyss Artifact',
  },

  // Unarmed / kick skills
  'pump-kick': {
    name: 'Pump Kick',
    description: 'A fast pumping kick that pushes enemies back and creates distance.',
    maxLevel: 1,
    branch: 'Unarmed Combat',
    enhancement: 'Unarmed Combat Lv. 1',
    source: 'Abyss Artifact',
  },
  'dropkick': {
    name: 'Dropkick',
    description: 'Launch forward and drive both feet into an enemy with devastating force.',
    maxLevel: 1,
    branch: 'Unarmed Combat',
    enhancement: 'Pump Kick',
    source: 'Abyss Artifact',
  },
  'vault': {
    name: 'Vault',
    description: 'Vault over an enemy, repositioning behind them for a follow-up strike.',
    maxLevel: 1,
    branch: 'Unarmed Combat',
    enhancement: 'Dropkick',
    source: 'Abyss Artifact',
  },
  'flying-kick': {
    name: 'Flying Kick',
    description: 'A leaping kick that covers distance and knocks enemies off-balance.',
    maxLevel: 1,
    branch: 'Unarmed Combat',
    enhancement: 'Vault',
    source: 'Abyss Artifact',
  },
  'meteor-kick': {
    name: 'Meteor Kick',
    description: 'A devastating aerial heel drop that slams enemies into the ground.',
    maxLevel: 1,
    branch: 'Unarmed Combat',
    enhancement: 'Flying Kick',
    source: 'Abyss Artifact',
  },
  'grappling': {
    name: 'Grappling',
    description: 'Master grappling techniques. Unlocks Restrain, Throw, Lariat, Giant Swing, Back Hang, and Lariat Follow-up sub-skills.',
    maxLevel: 5,
    branch: 'Unarmed Combat',
    enhancement: 'Unarmed Combat Lv. 3',
    source: 'Abyss Artifact',
  },
  'body-slam': {
    name: 'Body Slam',
    description: 'A full-body tackle that sends enemies sprawling.',
    maxLevel: 1,
    branch: 'Unarmed Combat',
    enhancement: 'Grappling Lv. 2',
    source: 'Abyss Artifact',
  },
  'clothesline': {
    name: 'Clothesline',
    description: 'A running lariat with AoE knockback and a shockwave on impact.',
    maxLevel: 1,
    branch: 'Unarmed Combat',
    enhancement: 'Grappling Lv. 3',
    source: 'Abyss Artifact',
  },

  // Ranged / bow skills
  'evasive-shot': {
    name: 'Evasive Shot',
    description: 'Fire while rolling or evading, maintaining offensive pressure during dodges. Upgrades include Proficiency and Expertise variants.',
    maxLevel: 3,
    branch: 'Archery',
    enhancement: 'Archery Lv. 2',
    source: 'Abyss Artifact',
  },
  'charged-shot': {
    name: 'Charged Shot',
    description: 'Hold to charge the bow for a high-damage precision shot.',
    maxLevel: 1,
    branch: 'Archery',
    enhancement: 'Archery Lv. 3',
    source: 'Abyss Artifact',
  },
  'multishot': {
    name: 'Multishot',
    description: 'Fire 10 arrows simultaneously, hitting multiple targets at once.',
    maxLevel: 1,
    branch: 'Archery',
    enhancement: 'Archery Lv. 4',
    source: 'Abyss Artifact',
  },
  'focus-shot': {
    name: 'Focus Shot',
    description: 'Enter a focused aiming state where time slows for extreme accuracy.',
    maxLevel: 3,
    branch: 'Archery',
    enhancement: 'Charged Shot',
    source: 'Abyss Artifact',
  },
  'marksmanship': {
    name: 'Marksmanship',
    description: 'Passive skill improving ranged accuracy and damage for all bow attacks.',
    maxLevel: 3,
    branch: 'Archery',
    enhancement: 'Archery Lv. 5',
    source: 'Abyss Artifact',
  },
  'elemental-charged-shot': {
    name: 'Elemental Charged Shot',
    description: 'Fire a ranged shot infused with elemental magic for explosive impact.',
    maxLevel: 1,
    branch: 'Elemental Power',
    enhancement: 'Imbue Elements Lv. 2 + Charged Shot',
    source: 'Abyss Artifact',
  },

  // ── GREEN BRANCH: SPIRIT ──────────────────────────────────────────────────
  'spirit': {
    name: 'Spirit',
    description: 'Increases maximum spirit pool (14 levels). Spirit powers nature-based and defensive abilities.',
    maxLevel: 14,
    branch: 'Spirit',
    source: 'Passive — increases automatically',
  },
  'natures-echo': {
    name: "Nature's Echo",
    description: 'Summon phantom clones that mimic your attacks, effectively doubling your hit output.',
    maxLevel: 3,
    branch: 'Spirit Arts',
    enhancement: 'Spirit Lv. 3',
    source: 'Abyss Artifact',
  },
  'natures-snare': {
    name: "Nature's Snare",
    description: 'Create a spirit barrier that absorbs incoming projectiles. Most effective at level 3.',
    maxLevel: 3,
    branch: 'Spirit Arts',
    enhancement: 'Spirit Lv. 5',
    source: 'Abyss Artifact',
  },
  'natures-grasp': {
    name: "Nature's Grasp",
    description: 'Use nature energy to move heavy objects and interact with environmental puzzles.',
    maxLevel: 2,
    branch: 'Spirit Arts',
    enhancement: "Nature's Snare Lv. 2",
    source: 'Abyss Artifact',
  },
  'keen-senses': {
    name: 'Keen Senses',
    description: 'Heighten combat awareness. Level 3 unlocks Counter, Parry, and Perfect Dodge.',
    maxLevel: 3,
    branch: 'Spirit Arts',
    enhancement: 'Spirit Lv. 4',
    source: 'Abyss Artifact',
  },
  'focus': {
    name: 'Focus',
    description: 'Time slows around Kliff, enabling the Focused Insight parry and extreme accuracy.',
    maxLevel: 3,
    branch: 'Spirit Arts',
    enhancement: "Nature's Echo Lv. 2",
    source: 'Abyss Artifact',
  },
  'force-palm': {
    name: 'Force Palm',
    description: 'Condense energy and release it as an open-palm strike that reduces the target\'s defense.',
    maxLevel: 5,
    branch: 'Spirit Arts',
    enhancement: 'Focus Lv. 2',
    source: 'Observe — holographic projection',
  },
  'focused-force-palm': {
    name: 'Focused Force Palm',
    description: 'A focused Force Palm variant required to break special rock walls blocking story and puzzle paths. Learned by observing a spirit near Fort Perwin in the Crimson Desert.',
    maxLevel: 1,
    branch: 'Spirit Arts',
    enhancement: 'Force Palm',
    source: 'Observe — spirit near Fort Perwin',
  },
  'healing-force-palm': {
    name: 'Healing Force Palm',
    description: 'A Force Palm variant that restores health on hit.',
    maxLevel: 3,
    branch: 'Spirit Arts',
    enhancement: 'Force Palm Lv. 3',
    source: 'Abyss Artifact',
  },
  'force-current': {
    name: 'Force Current',
    description: 'A grapple-based technique used for resource gathering and environmental puzzle interactions.',
    maxLevel: 2,
    branch: 'Spirit Arts',
    enhancement: 'Focus Lv. 3',
    source: 'Abyss Artifact',
  },
  'parry': {
    name: 'Parry',
    description: 'Deflect incoming attacks with precise timing, creating a window for counterattack.',
    maxLevel: 1,
    branch: 'Spirit Arts',
    enhancement: 'Keen Senses Lv. 3',
    source: 'Abyss Artifact',
  },
  'counter': {
    name: 'Counter',
    description: 'After a successful parry, automatically strike back with increased damage.',
    maxLevel: 1,
    branch: 'Spirit Arts',
    enhancement: 'Parry',
    source: 'Abyss Artifact',
  },
  'evasive-roll': {
    name: 'Evasive Roll',
    description: 'Roll to evade attacks while regaining stamina, even after taking a hit.',
    maxLevel: 1,
    branch: 'Spirit Arts',
    enhancement: 'Keen Senses Lv. 3',
    source: 'Observe — Kailok the Hornsplitter boss (Chapter 2)',
  },
  'double-jump': {
    name: 'Double Jump',
    description: 'Perform a second jump in mid-air, greatly improving vertical mobility and platforming.',
    maxLevel: 1,
    branch: 'Spirit Arts',
    enhancement: 'Evasive Roll',
    source: 'Abyss Artifact',
  },

  // ── RED BRANCH: HEALTH / ELEMENTAL ────────────────────────────────────────
  'health': {
    name: 'Health',
    description: 'Increases maximum health pool (18 levels). The largest of the three core stat branches.',
    maxLevel: 18,
    branch: 'Health',
    source: 'Passive — increases automatically',
  },
  'fist-of-flame': {
    name: 'Fist of Flame',
    description: 'Imbue your fists with fire, adding burn damage to unarmed strikes.',
    maxLevel: 1,
    branch: 'Elemental Power',
    enhancement: 'Health Lv. 3',
    source: 'Abyss Artifact',
  },
  'veil-of-fog': {
    name: 'Veil of Fog',
    description: 'Shroud yourself in concealing fog, reducing enemy detection range.',
    maxLevel: 1,
    branch: 'Elemental Power',
    enhancement: 'Mystical Storage',
    source: 'Abyss Artifact',
  },
  'mantle-of-frost': {
    name: 'Mantle of Frost',
    description: 'Wrap yourself in frost that slows enemies who strike you in melee.',
    maxLevel: 1,
    branch: 'Elemental Power',
    enhancement: 'Imbue Elements Lv. 2',
    source: 'Abyss Artifact',
  },
  'frost-mantle': {
    name: 'Frost Mantle',
    description: 'Extended frost armor that also damages nearby enemies.',
    maxLevel: 1,
    branch: 'Elemental Power',
    enhancement: 'Mantle of Frost',
    source: 'Abyss Artifact',
  },
  'surge-of-sparks': {
    name: 'Surge of Sparks',
    description: 'Release a crackling surge of lightning that chains across nearby enemies.',
    maxLevel: 1,
    branch: 'Elemental Power',
    enhancement: 'Imbue Elements Lv. 3',
    source: 'Abyss Artifact',
  },
  'lightning-surge': {
    name: 'Lightning Surge',
    description: 'Channel lightning through the ground in a line ahead of you.',
    maxLevel: 1,
    branch: 'Elemental Power',
    enhancement: 'Surge of Sparks',
    source: 'Abyss Artifact',
  },
  'imbue-elements': {
    name: 'Imbue Elements',
    description: 'Infuse your weapon with elemental power (up to level 4). Unlocks Elemental Turning Slash, Elemental Charged Shot, Elemental Force Palm, and Elemental Meteor Kick.',
    maxLevel: 4,
    branch: 'Elemental Power',
    enhancement: 'Health Lv. 5',
    source: 'Abyss Artifact',
  },
  'flame-strike': {
    name: 'Flame Strike',
    description: 'A fiery overhead slam that ignites the target and leaves burning ground.',
    maxLevel: 1,
    branch: 'Elemental Power',
    enhancement: 'Fist of Flame',
    source: 'Abyss Artifact',
  },
  'storm-veil': {
    name: 'Storm Veil',
    description: 'Summon a storm that damages all nearby enemies with wind and lightning.',
    maxLevel: 1,
    branch: 'Elemental Power',
    enhancement: 'Imbue Elements Lv. 4',
    source: 'Abyss Artifact',
  },
  'mystical-storage': {
    name: 'Mystical Storage',
    description: 'Access a pocket dimension to store and retrieve items during combat.',
    maxLevel: 1,
    branch: 'Elemental Power',
    enhancement: 'Health Lv. 4',
    source: 'Abyss Artifact',
  },
  'axiom-force': {
    name: 'Axiom Force',
    description: 'Harness Abyss power for aerial combat. Functions as a grappling hook — level 2 unlocks Aerial Swing, level 3 unlocks Aerial Maneuver.',
    maxLevel: 3,
    branch: 'Axiom',
    enhancement: 'Story progression required',
    source: 'Story',
  },
  'flight': {
    name: 'Flight',
    description: 'Spread crow wings and take to the skies for aerial traversal and combat.',
    maxLevel: 2,
    branch: 'Axiom',
    enhancement: 'Axiom Force Lv. 1',
    source: 'Story',
  },
  'aerial-maneuver': {
    name: 'Aerial Maneuver',
    description: 'Perform advanced airborne maneuvers, repositioning rapidly to dodge attacks.',
    maxLevel: 1,
    branch: 'Axiom',
    enhancement: 'Axiom Force Lv. 3',
    source: 'Abyss Artifact',
  },
  'swift-flight': {
    name: 'Swift Flight',
    description: 'Increase aerial movement speed and responsiveness.',
    maxLevel: 2,
    branch: 'Axiom',
    enhancement: 'Flight Lv. 2',
    source: 'Abyss Artifact',
  },
  'aerial-swing': {
    name: 'Aerial Swing',
    description: 'Execute powerful sword swings while in flight, striking ground targets from above.',
    maxLevel: 1,
    branch: 'Axiom',
    enhancement: 'Axiom Force Lv. 2',
    source: 'Abyss Artifact',
  },

  // ── CORE: Convergence ─────────────────────────────────────────────────────
  'falling-palm': {
    name: 'Falling Palm',
    description: 'Channel all remaining Stamina into a ground-impact strike. Unlocked by completing any one branch (Blue, Green, or Red) — not all three.',
    maxLevel: 1,
    branch: 'Core',
    enhancement: 'Complete any one branch (Blue, Green, or Red)',
    source: 'Convergence',
  },
};

// ─── Tree node layout ─────────────────────────────────────────────────────────
// Y-shaped layout: Blue (top, three arms), Green (bottom-left), Red (bottom-right).
// Core spine (Falling Palm) sits at center connecting all three branches.
// Structure verified against allthings.how branch breakdown and gameplay footage.

const KLIFF_NODES: TreeNode[] = [
  // ── CORE SPINE ────────────────────────────────────────────────────────────
  { id: 'n-falling-palm', x: 50, y: 50, size: 'lg', branch: 'core', connections: ['n-core-upper', 'n-core-lower-l', 'n-core-lower-r'], skill: SKILL_DATA['falling-palm'] },
  { id: 'n-core-upper', x: 50, y: 38, size: 'md', branch: 'core', connections: ['n-stamina'], skill: undefined },
  { id: 'n-core-lower-l', x: 38, y: 60, size: 'md', branch: 'core', connections: ['n-spirit'], skill: undefined },
  { id: 'n-core-lower-r', x: 62, y: 60, size: 'md', branch: 'core', connections: ['n-health'], skill: undefined },

  // ── BLUE BRANCH (STAMINA) - Top ───────────────────────────────────────────
  { id: 'n-stamina', x: 50, y: 26, size: 'lg', branch: 'blue', connections: ['n-armed-combat', 'n-unarmed-combat', 'n-archery'], skill: SKILL_DATA['stamina'] },

  // Left arm: Armed Combat / Sword Mastery
  { id: 'n-armed-combat', x: 32, y: 20, size: 'md', branch: 'blue', connections: ['n-evasive-slash', 'n-forward-slash', 'n-shield-bash', 'n-charge'], skill: SKILL_DATA['armed-combat'] },
  { id: 'n-evasive-slash', x: 22, y: 14, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['evasive-slash'] },
  { id: 'n-forward-slash', x: 24, y: 26, size: 'md', branch: 'blue', connections: ['n-turning-slash', 'n-stab'], skill: SKILL_DATA['forward-slash'] },
  { id: 'n-turning-slash', x: 14, y: 22, size: 'sm', branch: 'blue', connections: ['n-sword-flurry'], skill: SKILL_DATA['turning-slash'] },
  { id: 'n-stab', x: 14, y: 30, size: 'sm', branch: 'blue', connections: ['n-spinning-slash'], skill: SKILL_DATA['stab'] },
  { id: 'n-spinning-slash', x: 8, y: 30, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['spinning-slash'] },
  { id: 'n-sword-flurry', x: 7, y: 17, size: 'sm', branch: 'blue', connections: ['n-blinding-flash'], skill: SKILL_DATA['sword-flurry'] },
  { id: 'n-blinding-flash', x: 5, y: 10, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['blinding-flash'] },
  { id: 'n-shield-bash', x: 38, y: 12, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['shield-bash'] },
  { id: 'n-charge', x: 32, y: 8, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['charge'] },

  // Center arm: Unarmed Combat
  { id: 'n-unarmed-combat', x: 50, y: 15, size: 'md', branch: 'blue', connections: ['n-pump-kick', 'n-grappling'], skill: SKILL_DATA['unarmed-combat'] },
  { id: 'n-pump-kick', x: 44, y: 8, size: 'sm', branch: 'blue', connections: ['n-dropkick'], skill: SKILL_DATA['pump-kick'] },
  { id: 'n-dropkick', x: 38, y: 4, size: 'sm', branch: 'blue', connections: ['n-vault'], skill: SKILL_DATA['dropkick'] },
  { id: 'n-vault', x: 44, y: 2, size: 'sm', branch: 'blue', connections: ['n-flying-kick'], skill: SKILL_DATA['vault'] },
  { id: 'n-flying-kick', x: 50, y: 4, size: 'sm', branch: 'blue', connections: ['n-meteor-kick'], skill: SKILL_DATA['flying-kick'] },
  { id: 'n-meteor-kick', x: 56, y: 2, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['meteor-kick'] },
  { id: 'n-grappling', x: 56, y: 8, size: 'md', branch: 'blue', connections: ['n-body-slam', 'n-clothesline'], skill: SKILL_DATA['grappling'] },
  { id: 'n-body-slam', x: 62, y: 4, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['body-slam'] },
  { id: 'n-clothesline', x: 64, y: 10, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['clothesline'] },

  // Right arm: Archery / Ranged
  { id: 'n-archery', x: 68, y: 20, size: 'md', branch: 'blue', connections: ['n-evasive-shot', 'n-charged-shot', 'n-multishot', 'n-marksmanship'], skill: SKILL_DATA['archery'] },
  { id: 'n-evasive-shot', x: 78, y: 14, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['evasive-shot'] },
  { id: 'n-charged-shot', x: 76, y: 26, size: 'sm', branch: 'blue', connections: ['n-focus-shot'], skill: SKILL_DATA['charged-shot'] },
  { id: 'n-focus-shot', x: 86, y: 22, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['focus-shot'] },
  { id: 'n-multishot', x: 86, y: 14, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['multishot'] },
  { id: 'n-marksmanship', x: 78, y: 20, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['marksmanship'] },

  // ── GREEN BRANCH (SPIRIT) - Bottom Left ───────────────────────────────────
  { id: 'n-spirit', x: 26, y: 68, size: 'lg', branch: 'green', connections: ['n-natures-echo', 'n-keen-senses', 'n-natures-snare'], skill: SKILL_DATA['spirit'] },

  // Nature's Echo arm: Force Palm, Focus, Force Current
  { id: 'n-natures-echo', x: 16, y: 62, size: 'md', branch: 'green', connections: ['n-focus-g', 'n-force-palm'], skill: SKILL_DATA['natures-echo'] },
  { id: 'n-focus-g', x: 8, y: 56, size: 'sm', branch: 'green', connections: ['n-force-current'], skill: SKILL_DATA['focus'] },
  { id: 'n-force-current', x: 2, y: 50, size: 'sm', branch: 'green', connections: [], skill: SKILL_DATA['force-current'] },
  { id: 'n-force-palm', x: 8, y: 66, size: 'sm', branch: 'green', connections: ['n-healing-force-palm', 'n-focused-force-palm'], skill: SKILL_DATA['force-palm'] },
  { id: 'n-healing-force-palm', x: 4, y: 72, size: 'sm', branch: 'green', connections: [], skill: SKILL_DATA['healing-force-palm'] },
  { id: 'n-focused-force-palm', x: 2, y: 62, size: 'sm', branch: 'green', connections: [], skill: SKILL_DATA['focused-force-palm'] },

  // Keen Senses arm: Parry, Counter, Evasive Roll, Double Jump
  { id: 'n-keen-senses', x: 14, y: 74, size: 'md', branch: 'green', connections: ['n-parry', 'n-evasive-roll'], skill: SKILL_DATA['keen-senses'] },
  { id: 'n-parry', x: 6, y: 70, size: 'sm', branch: 'green', connections: ['n-counter'], skill: SKILL_DATA['parry'] },
  { id: 'n-counter', x: 4, y: 76, size: 'sm', branch: 'green', connections: [], skill: SKILL_DATA['counter'] },
  { id: 'n-evasive-roll', x: 10, y: 82, size: 'sm', branch: 'green', connections: ['n-double-jump'], skill: SKILL_DATA['evasive-roll'] },
  { id: 'n-double-jump', x: 6, y: 88, size: 'sm', branch: 'green', connections: [], skill: SKILL_DATA['double-jump'] },

  // Nature's Snare / Grasp arm
  { id: 'n-natures-snare', x: 22, y: 80, size: 'sm', branch: 'green', connections: ['n-natures-grasp'], skill: SKILL_DATA['natures-snare'] },
  { id: 'n-natures-grasp', x: 30, y: 84, size: 'sm', branch: 'green', connections: [], skill: SKILL_DATA['natures-grasp'] },

  // ── RED BRANCH (HEALTH / ELEMENTAL) - Bottom Right ────────────────────────
  { id: 'n-health', x: 74, y: 68, size: 'lg', branch: 'red', connections: ['n-imbue-elements', 'n-mystical-storage', 'n-axiom-force'], skill: SKILL_DATA['health'] },

  // Imbue Elements arm: elemental sub-skills
  { id: 'n-imbue-elements', x: 84, y: 62, size: 'md', branch: 'red', connections: ['n-fist-of-flame', 'n-mantle-of-frost', 'n-surge-of-sparks', 'n-storm-veil', 'n-elemental-charged-shot'], skill: SKILL_DATA['imbue-elements'] },
  { id: 'n-fist-of-flame', x: 92, y: 56, size: 'sm', branch: 'red', connections: ['n-flame-strike'], skill: SKILL_DATA['fist-of-flame'] },
  { id: 'n-flame-strike', x: 98, y: 52, size: 'sm', branch: 'red', connections: [], skill: SKILL_DATA['flame-strike'] },
  { id: 'n-mantle-of-frost', x: 94, y: 64, size: 'sm', branch: 'red', connections: ['n-frost-mantle'], skill: SKILL_DATA['mantle-of-frost'] },
  { id: 'n-frost-mantle', x: 100, y: 66, size: 'sm', branch: 'red', connections: [], skill: SKILL_DATA['frost-mantle'] },
  { id: 'n-surge-of-sparks', x: 92, y: 72, size: 'sm', branch: 'red', connections: ['n-lightning-surge'], skill: SKILL_DATA['surge-of-sparks'] },
  { id: 'n-lightning-surge', x: 98, y: 76, size: 'sm', branch: 'red', connections: [], skill: SKILL_DATA['lightning-surge'] },
  { id: 'n-storm-veil', x: 84, y: 50, size: 'sm', branch: 'red', connections: [], skill: SKILL_DATA['storm-veil'] },
  { id: 'n-elemental-charged-shot', x: 86, y: 30, size: 'sm', branch: 'red', connections: [], skill: SKILL_DATA['elemental-charged-shot'] },

  // Mystical Storage arm
  { id: 'n-mystical-storage', x: 82, y: 74, size: 'sm', branch: 'red', connections: ['n-veil-of-fog'], skill: SKILL_DATA['mystical-storage'] },
  { id: 'n-veil-of-fog', x: 90, y: 80, size: 'sm', branch: 'red', connections: [], skill: SKILL_DATA['veil-of-fog'] },

  // Axiom Force arm: Flight (→ Swift Flight), Aerial Swing (Lv.2), Aerial Maneuver (Lv.3)
  { id: 'n-axiom-force', x: 72, y: 78, size: 'md', branch: 'red', connections: ['n-flight', 'n-aerial-swing', 'n-aerial-maneuver'], skill: SKILL_DATA['axiom-force'] },
  { id: 'n-flight', x: 78, y: 86, size: 'sm', branch: 'red', connections: ['n-swift-flight'], skill: SKILL_DATA['flight'] },
  { id: 'n-swift-flight', x: 78, y: 94, size: 'sm', branch: 'red', connections: [], skill: SKILL_DATA['swift-flight'] },
  { id: 'n-aerial-swing', x: 86, y: 84, size: 'sm', branch: 'red', connections: [], skill: SKILL_DATA['aerial-swing'] },
  { id: 'n-aerial-maneuver', x: 66, y: 86, size: 'sm', branch: 'red', connections: [], skill: SKILL_DATA['aerial-maneuver'] },
];

// Build a lookup map
const NODE_MAP = Object.fromEntries(KLIFF_NODES.map(n => [n.id, n]));

// ─── Visual constants ─────────────────────────────────────────────────────────

const BRANCH_COLORS = {
  blue:  { stroke: '#60a5fa', fill: '#1e3a5f', glow: '#3b82f6', label: 'Stamina / Combat', bg: '#1a2d4a' },
  green: { stroke: '#4ade80', fill: '#14532d', glow: '#22c55e', label: 'Spirit / Defense', bg: '#0f2a1a' },
  red:   { stroke: '#f87171', fill: '#5c0a0a', glow: '#ef4444', label: 'Health / Elemental', bg: '#2a0f0f' },
  core:  { stroke: '#fbbf24', fill: '#451a03', glow: '#f59e0b', label: 'Core', bg: '#2a1f0a' },
};

const NODE_RADIUS = { lg: 20, md: 14, sm: 10 };

const W = 900;
const H = 800;

function px(pct: number, total: number) {
  return (pct / 100) * total;
}

// ─── Skill Node SVG component ─────────────────────────────────────────────────

interface NodeProps {
  node: TreeNode;
  unlocked: boolean;
  selected: boolean;
  onClick: () => void;
}

function SkillNode({ node, unlocked, selected, onClick }: NodeProps) {
  const cx = px(node.x, W);
  const cy = px(node.y, H);
  const r = NODE_RADIUS[node.size];
  const colors = BRANCH_COLORS[node.branch];

  return (
    <g onClick={onClick} className="cursor-pointer" role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}>
      {/* Glow ring */}
      {(selected || unlocked) && (
        <circle cx={cx} cy={cy} r={r + 4}
          fill="none"
          stroke={selected ? '#fbbf24' : colors.glow}
          strokeWidth={selected ? 2.5 : 1.5}
          opacity={selected ? 0.9 : 0.35}
        />
      )}
      {/* Outer ring for lg nodes */}
      {node.size === 'lg' && (
        <circle cx={cx} cy={cy} r={r + 1}
          fill="none"
          stroke={unlocked ? colors.stroke : '#374151'}
          strokeWidth={0.8}
          opacity={0.5}
        />
      )}
      {/* Main circle */}
      <circle
        cx={cx} cy={cy} r={r}
        fill={unlocked ? colors.fill : '#0f1117'}
        stroke={unlocked ? colors.stroke : '#374151'}
        strokeWidth={selected ? 2.5 : 1.5}
        opacity={unlocked ? 1 : 0.55}
      />
      {/* Inner icon for large nodes: crosshair pattern */}
      {node.size === 'lg' && (
        <>
          <line x1={cx - r * 0.4} y1={cy} x2={cx + r * 0.4} y2={cy}
            stroke={unlocked ? colors.stroke : '#6b7280'} strokeWidth={1.2} />
          <line x1={cx} y1={cy - r * 0.4} x2={cx} y2={cy + r * 0.4}
            stroke={unlocked ? colors.stroke : '#6b7280'} strokeWidth={1.2} />
        </>
      )}
      {/* Inner dot for md/sm nodes */}
      {node.size !== 'lg' && (
        <circle cx={cx} cy={cy} r={r * 0.3}
          fill={unlocked ? colors.stroke : '#4b5563'}
          opacity={unlocked ? 0.85 : 0.35}
        />
      )}
    </g>
  );
}

// ─── Skill detail popup ───────────────────────────────────────────────────────

interface PopupProps {
  node: TreeNode;
  unlocked: boolean;
  onClose: () => void;
  onToggle: () => void;
}

function SkillPopup({ node, unlocked, onClose, onToggle }: PopupProps) {
  const skill = node.skill;
  const colors = BRANCH_COLORS[node.branch];
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!skill) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div ref={popupRef} className="bg-pywel-card border border-pywel-border rounded-xl p-6 max-w-sm w-full shadow-2xl">
          <div className="flex justify-between items-start mb-3">
            <p className="text-gold-300 font-cinzel font-semibold">Unknown Node</p>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-300 text-xl leading-none">&times;</button>
          </div>
          <p className="text-gray-400 text-sm">Skill details will be added post-launch.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div ref={popupRef} className="bg-pywel-card border rounded-xl p-6 max-w-md w-full shadow-2xl"
        style={{ borderColor: colors.stroke + '66' }}>
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-full border-2 flex-shrink-0"
              style={{ borderColor: colors.stroke, backgroundColor: colors.fill }} />
            <div>
              <h3 className="text-gold-300 font-cinzel font-bold text-lg">{skill.name}</h3>
              <p className="text-xs font-cinzel" style={{ color: colors.stroke }}>{skill.branch}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 text-xl leading-none p-1">&times;</button>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4">{skill.description}</p>

        {/* Level info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-pywel-bg/60 rounded-lg px-3 py-2 border border-pywel-border/50">
            <p className="text-xs text-gray-500 font-cinzel">LEVEL</p>
            <p className="text-gold-300 font-cinzel font-bold">
              {unlocked ? skill.maxLevel : 0} / {skill.maxLevel}
            </p>
          </div>
          {skill.source && (
            <div className="bg-pywel-bg/60 rounded-lg px-3 py-2 border border-pywel-border/50">
              <p className="text-xs text-gray-500 font-cinzel">SOURCE</p>
              <p className="text-gray-300 text-sm">{skill.source}</p>
            </div>
          )}
        </div>

        {/* Enhancement requirements */}
        {skill.enhancement && (
          <div className="bg-pywel-bg/40 rounded-lg p-3 border border-pywel-border/30 mb-4">
            <p className="text-xs text-gray-500 font-cinzel mb-1">ENHANCEMENT REQUIREMENTS</p>
            <p className="text-gray-300 text-sm">{skill.enhancement}</p>
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={onToggle}
          className={`w-full py-2.5 rounded-lg font-cinzel font-semibold text-sm transition-all ${
            unlocked
              ? 'bg-green-900/30 border border-green-700/40 text-green-400 hover:bg-green-900/50'
              : 'bg-pywel-bg border border-pywel-border text-gray-400 hover:border-gold-500/50 hover:text-gold-300'
          }`}
        >
          {unlocked ? 'Unlocked (click to lock)' : 'Mark as Unlocked'}
        </button>

        <p className="text-center text-xs text-gray-600 mt-3">
          Verified: allthings.how, Game8, Beebom, Fextralife, Xbox Wire (March 2026)
        </p>
      </div>
    </div>
  );
}

// ─── Companion skill list (Damiane / Oongka) ──────────────────────────────────

const COMPANION_BRANCH_ORDER: Record<string, string[]> = {
  damiane: ['Core Stats', 'Armed Combat', 'Shooting', 'Unarmed Combat', 'Evasion', 'Spirit Arts', 'Smiting'],
  oongka:  ['Core Stats', 'Armed Combat', 'Shooting', 'Unarmed Combat', 'Evasion', 'Spirit Arts'],
};

const COMPANION_INFO: Record<string, { subtitle: string; note: string; color: string }> = {
  damiane: {
    subtitle: 'Glass cannon — rapier, dual blades, pistol/musket',
    note: 'Unlocked in Chapter 3 after "A Fresh Start" quest at Howling Hill. Uses a mechanical propeller parasol for flight.',
    color: '#a78bfa',
  },
  oongka: {
    subtitle: 'Tank / bruiser — axes, staves, blaster cannon',
    note: 'Unlocked in Chapter 7 during "Twisted Fate" quest at Ashclaw Keep. Complete "Gentle Sound of Flowing River" side quest for permanent access. Uses a jetpack for flight.',
    color: '#fb923c',
  },
};

const COST_BADGE: Record<string, string> = {
  Passive:     'bg-gray-800 text-gray-400 border-gray-700',
  Artifact:    'bg-amber-950/60 text-amber-400 border-amber-800/50',
  Observe:     'bg-teal-950/60 text-teal-400 border-teal-800/50',
  Story:       'bg-purple-950/60 text-purple-400 border-purple-800/50',
  Convergence: 'bg-yellow-950/60 text-yellow-300 border-yellow-700/50',
};

function CompanionSkills({ character }: { character: Character }) {
  const info = COMPANION_INFO[character];
  const branchOrder = COMPANION_BRANCH_ORDER[character] ?? [];
  const skills = SKILLS.filter(s => s.character === character);

  const byBranch = branchOrder.reduce<Record<string, typeof skills>>((acc, b) => {
    acc[b] = skills.filter(s => s.branch === b);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Character header */}
      <div className="bg-pywel-card rounded-xl p-5 border border-pywel-border">
        <p className="text-sm font-cinzel mb-1" style={{ color: info.color }}>{info.subtitle}</p>
        <p className="text-xs text-gray-500 leading-relaxed">{info.note}</p>
      </div>

      {/* Warning: shared artifact pool */}
      <div className="bg-amber-950/30 border border-amber-800/40 rounded-lg p-3 flex gap-2 items-start">
        <span className="text-amber-400 text-sm mt-0.5">⚠</span>
        <p className="text-xs text-amber-300/80">All three characters share the same Abyss Artifact pool. Investing in companions reduces what is available for Kliff, who is required for all story bosses.</p>
      </div>

      {/* Skills by branch */}
      {branchOrder.map(branch => {
        const branchSkills = byBranch[branch];
        if (!branchSkills?.length) return null;
        return (
          <div key={branch}>
            <h3 className="text-xs font-cinzel font-bold text-gray-500 tracking-widest uppercase mb-3 pl-1">{branch}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {branchSkills.map(skill => (
                <div key={skill.id}
                  className="bg-pywel-card rounded-lg p-3 border border-pywel-border hover:border-pywel-border/70 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-sm font-cinzel font-semibold text-gold-300">{skill.name}</span>
                    <span className={`text-[10px] font-cinzel px-1.5 py-0.5 rounded border whitespace-nowrap flex-shrink-0 ${COST_BADGE[skill.cost] ?? COST_BADGE['Artifact']}`}>
                      {skill.cost}
                    </span>
                  </div>
                  {skill.description && (
                    <p className="text-xs text-gray-400 leading-relaxed">{skill.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <p className="text-center text-xs text-gray-600">
        Skill data sourced from Fextralife, Game8, and GameSpot (verified March 2026)
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const CHARACTERS: { key: Character; label: string }[] = [
  { key: 'kliff', label: 'Kliff' },
  { key: 'damiane', label: 'Damiane' },
  { key: 'oongka', label: 'Oongka' },
];

export default function SkillsPage() {
  const [selectedChar, setSelectedChar] = useState<Character>('kliff');
  const [unlockedNodes, setUnlockedNodes] = useState<Set<string>>(new Set());
  const [popupNodeId, setPopupNodeId] = useState<string | null>(null);

  const handleNodeClick = useCallback((id: string) => {
    setPopupNodeId(id);
  }, []);

  const toggleUnlock = useCallback((id: string) => {
    setUnlockedNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const totalNodes = KLIFF_NODES.filter(n => n.skill).length;
  const unlockedCount = [...unlockedNodes].filter(id => NODE_MAP[id]?.skill).length;

  // Count per branch
  const branchCounts = (branch: TreeNode['branch']) => {
    const total = KLIFF_NODES.filter(n => n.branch === branch && n.skill).length;
    const unlocked = [...unlockedNodes].filter(id => NODE_MAP[id]?.branch === branch && NODE_MAP[id]?.skill).length;
    return { total, unlocked };
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Skill Tree</h1>
        <p className="text-gray-400">Master combat, spirit, and elemental abilities.</p>
      </div>

      {/* Character tabs */}
      <div className="flex gap-2 border-b border-pywel-border">
        {CHARACTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelectedChar(key)}
            className={`px-4 py-3 font-cinzel font-semibold transition-colors ${
              selectedChar === key
                ? 'text-gold-400 border-b-2 border-gold-400'
                : 'text-gray-400 hover:text-gold-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Damiane / Oongka skill listings */}
      {selectedChar !== 'kliff' ? (
        <CompanionSkills character={selectedChar} />
      ) : (
        <>
          {/* Progress summary */}
          <div className="bg-pywel-card rounded-lg p-4 border border-pywel-border">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-cinzel font-semibold text-gold-300">Skills Unlocked</span>
              <span className="text-sm text-gold-400">{unlockedCount} / {totalNodes}</span>
            </div>
            <div className="w-full bg-pywel-bg rounded-full h-2 overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-300"
                style={{ width: `${totalNodes > 0 ? (unlockedCount / totalNodes) * 100 : 0}%` }}
              />
            </div>
            {/* Per-branch breakdown */}
            <div className="grid grid-cols-3 gap-3">
              {(['blue', 'green', 'red'] as const).map(branch => {
                const { total, unlocked } = branchCounts(branch);
                const colors = BRANCH_COLORS[branch];
                return (
                  <div key={branch} className="text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.stroke }} />
                      <span className="text-xs font-cinzel text-gray-400">{colors.label.split(' / ')[0]}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: colors.stroke }}>{unlocked}/{total}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 items-center">
            {(Object.entries(BRANCH_COLORS) as [keyof typeof BRANCH_COLORS, typeof BRANCH_COLORS['blue']][]).map(([key, c]) => (
              <div key={key} className="flex items-center gap-1.5 text-xs font-cinzel">
                <span className="w-3 h-3 rounded-full border-2 flex-shrink-0"
                  style={{ borderColor: c.stroke, backgroundColor: c.fill }} />
                <span className="text-gray-400">{c.label}</span>
              </div>
            ))}
            <p className="text-xs text-gray-600 ml-auto">Click any node for details</p>
          </div>

          {/* Skill tree SVG */}
          <div className="bg-pywel-card border border-pywel-border rounded-xl overflow-hidden">
            <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="absolute inset-0 w-full h-full"
                style={{ background: 'radial-gradient(ellipse at 50% 40%, #0c1220 0%, #080c14 100%)' }}
              >
                {/* Subtle decorative elements */}
                <defs>
                  <radialGradient id="glow-blue" cx="50%" cy="25%" r="35%">
                    <stop offset="0%" stopColor="#1a2d4a" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#1a2d4a" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="glow-green" cx="25%" cy="75%" r="30%">
                    <stop offset="0%" stopColor="#0f2a1a" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#0f2a1a" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="glow-red" cx="75%" cy="75%" r="30%">
                    <stop offset="0%" stopColor="#2a0f0f" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2a0f0f" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="glow-core" cx="50%" cy="50%" r="15%">
                    <stop offset="0%" stopColor="#2a1f0a" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#2a1f0a" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Branch ambient glows */}
                <rect x="0" y="0" width={W} height={H} fill="url(#glow-blue)" />
                <rect x="0" y="0" width={W} height={H} fill="url(#glow-green)" />
                <rect x="0" y="0" width={W} height={H} fill="url(#glow-red)" />
                <rect x="0" y="0" width={W} height={H} fill="url(#glow-core)" />

                {/* Decorative rings */}
                <ellipse cx={W / 2} cy={H * 0.45} rx={W * 0.46} ry={H * 0.44}
                  fill="none" stroke="#1e2a3a" strokeWidth={0.8} strokeDasharray="4 8" opacity={0.4} />

                {/* Connection lines */}
                {KLIFF_NODES.map(node =>
                  node.connections.map(targetId => {
                    const target = NODE_MAP[targetId];
                    if (!target) return null;
                    const fromUnlocked = unlockedNodes.has(node.id);
                    const toUnlocked = unlockedNodes.has(targetId);
                    const active = fromUnlocked && toUnlocked;
                    const colors = BRANCH_COLORS[node.branch];
                    return (
                      <line
                        key={`${node.id}-${targetId}`}
                        x1={px(node.x, W)} y1={px(node.y, H)}
                        x2={px(target.x, W)} y2={px(target.y, H)}
                        stroke={active ? colors.stroke : '#1f2937'}
                        strokeWidth={active ? 2 : 1.2}
                        opacity={active ? 0.75 : 0.4}
                        strokeDasharray={active ? 'none' : '3 4'}
                      />
                    );
                  })
                )}

                {/* Nodes */}
                {KLIFF_NODES.map(node => (
                  <SkillNode
                    key={node.id}
                    node={node}
                    unlocked={unlockedNodes.has(node.id)}
                    selected={popupNodeId === node.id}
                    onClick={() => handleNodeClick(node.id)}
                  />
                ))}

                {/* Branch labels */}
                <text x={px(50, W)} y={px(96, H)} textAnchor="middle"
                  fill="#fbbf24" fontSize={10} fontFamily="serif" opacity={0.5} letterSpacing={3}>
                  KLIFF &middot; SKILL TREE
                </text>
                <text x={px(50, W)} y={px(33, H)} textAnchor="middle"
                  fill="#60a5fa" fontSize={10} fontFamily="serif" opacity={0.6} letterSpacing={2}>
                  STAMINA
                </text>
                <text x={px(16, W)} y={px(92, H)} textAnchor="middle"
                  fill="#4ade80" fontSize={10} fontFamily="serif" opacity={0.6} letterSpacing={2}>
                  SPIRIT
                </text>
                <text x={px(84, W)} y={px(92, H)} textAnchor="middle"
                  fill="#f87171" fontSize={10} fontFamily="serif" opacity={0.6} letterSpacing={2}>
                  ELEMENTAL
                </text>
              </svg>
            </div>
          </div>

          {/* Popup */}
          {popupNodeId && NODE_MAP[popupNodeId] && (
            <SkillPopup
              node={NODE_MAP[popupNodeId]}
              unlocked={unlockedNodes.has(popupNodeId)}
              onClose={() => setPopupNodeId(null)}
              onToggle={() => toggleUnlock(popupNodeId)}
            />
          )}

          <p className="text-center text-xs text-gray-600">
            Skill data sourced from allthings.how, Game8, Beebom, GamesRadar, Fextralife, and Xbox Wire (verified March 2026)
          </p>
        </>
      )}
    </div>
  );
}
