'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { Character } from '@/types/game-data';

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

const SKILL_DATA: Record<string, SkillDetail> = {
  // ── BLUE BRANCH: STAMINA ──────────────────────────────────────────────────
  // Core stats
  'stamina': {
    name: 'Stamina',
    description: 'Increases your maximum stamina pool, enabling more evasions and actions before tiring.',
    maxLevel: 16,
    branch: 'Stamina',
    enhancement: 'Level up through combat experience',
    source: 'Passive progression',
  },
  'armed-combat': {
    name: 'Armed Combat',
    description: 'Master the fundamentals of weapon-based fighting. Higher levels unlock new weapon techniques.',
    maxLevel: 5,
    branch: 'Armed Combat',
    enhancement: 'Defeat armed enemies, complete combat trials',
    source: 'Artifact',
  },
  'unarmed-combat': {
    name: 'Unarmed Combat',
    description: 'Develop hand-to-hand fighting prowess. Enables grappling, kicks, and body attacks.',
    maxLevel: 5,
    branch: 'Unarmed Combat',
    enhancement: 'Observe wrestlers, complete unarmed challenges',
    source: 'Artifact',
  },
  'archery': {
    name: 'Archery',
    description: 'Improve bow handling and accuracy. Higher levels unlock advanced ranged techniques.',
    maxLevel: 5,
    branch: 'Archery',
    enhancement: 'Practice at archery ranges, hunt wildlife',
    source: 'Artifact',
  },

  // Sword skills
  'forward-slash': {
    name: 'Forward Slash',
    description: 'A forward slashing attack. Can be leveled multiple times for increased potency.',
    maxLevel: 3,
    branch: 'Sword Mastery',
    enhancement: 'Armed Combat Lv. 2',
    source: 'Artifact',
  },
  'turning-slash': {
    name: 'Turning Slash',
    description: 'A wide turning slash that hits enemies on all sides. Upgrades into Double and Mastery variants.',
    maxLevel: 3,
    branch: 'Sword Mastery',
    enhancement: 'Forward Slash Lv. 2',
    source: 'Artifact',
  },
  'stab': {
    name: 'Stab',
    description: 'A piercing thrust that deals concentrated damage. Upgrades into Swift Stab and Skewer.',
    maxLevel: 3,
    branch: 'Sword Mastery',
    enhancement: 'Armed Combat Lv. 3',
    source: 'Artifact',
  },
  'sword-flurry': {
    name: 'Sword Flurry',
    description: 'Unleash a rapid flurry of sword strikes in quick succession.',
    maxLevel: 2,
    branch: 'Sword Mastery',
    enhancement: 'Turning Slash Lv. 2',
    source: 'Artifact',
  },
  'blinding-flash': {
    name: 'Blinding Flash',
    description: 'A flash of light from the blade that disorients enemies. Enables Blinding Flash Finisher.',
    maxLevel: 1,
    branch: 'Sword Mastery',
    enhancement: 'Sword Flurry Lv. 1',
    source: 'Artifact',
  },
  'evasive-slash': {
    name: 'Evasive Slash',
    description: 'Dodge and slash simultaneously, avoiding damage while dealing a precise cut.',
    maxLevel: 1,
    branch: 'Armed Combat',
    enhancement: 'Armed Combat Lv. 1',
    source: 'Artifact',
  },
  'shield-bash': {
    name: 'Shield Bash',
    description: 'Strike an enemy with your shield, staggering them and creating an opening for attack.',
    maxLevel: 1,
    branch: 'Armed Combat',
    enhancement: 'Armed Combat Lv. 2',
    source: 'Artifact',
  },

  // Unarmed / kick skills
  'pump-kick': {
    name: 'Pump Kick',
    description: 'A fast pumping kick that pushes enemies back and creates distance.',
    maxLevel: 1,
    branch: 'Unarmed Combat',
    enhancement: 'Unarmed Combat Lv. 1',
    source: 'Artifact',
  },
  'dropkick': {
    name: 'Dropkick',
    description: 'Launch forward and drive both feet into an enemy with devastating force.',
    maxLevel: 1,
    branch: 'Unarmed Combat',
    enhancement: 'Pump Kick',
    source: 'Artifact',
  },
  'vault': {
    name: 'Vault',
    description: 'Vault over an enemy, repositioning behind them for a follow-up strike.',
    maxLevel: 1,
    branch: 'Unarmed Combat',
    enhancement: 'Dropkick',
    source: 'Artifact',
  },
  'flying-kick': {
    name: 'Flying Kick',
    description: 'A leaping kick that covers distance and knocks enemies off-balance.',
    maxLevel: 1,
    branch: 'Unarmed Combat',
    enhancement: 'Vault',
    source: 'Artifact',
  },
  'meteor-kick': {
    name: 'Meteor Kick',
    description: 'A devastating aerial heel drop that slams enemies into the ground.',
    maxLevel: 1,
    branch: 'Unarmed Combat',
    enhancement: 'Flying Kick',
    source: 'Artifact',
  },
  'grappling': {
    name: 'Grappling',
    description: 'Master grappling techniques including throws, restraints, and lariats.',
    maxLevel: 5,
    branch: 'Unarmed Combat',
    enhancement: 'Unarmed Combat Lv. 3',
    source: 'Artifact',
  },
  'body-slam': {
    name: 'Body Slam',
    description: 'A full-body tackle that sends enemies sprawling.',
    maxLevel: 1,
    branch: 'Unarmed Combat',
    enhancement: 'Grappling Lv. 2',
    source: 'Artifact',
  },
  'clothesline': {
    name: 'Clothesline',
    description: 'A running lariat that takes enemies off their feet.',
    maxLevel: 1,
    branch: 'Unarmed Combat',
    enhancement: 'Grappling Lv. 3',
    source: 'Artifact',
  },
  'belly-slam': {
    name: 'Belly Slam',
    description: 'A devastating belly-first impact learned by observing a master wrestler.',
    maxLevel: 1,
    branch: 'Unarmed Combat',
    enhancement: 'Grappling Lv. 4',
    source: 'Observe enemy',
  },

  // Ranged / bow skills
  'evasive-shot': {
    name: 'Evasive Shot',
    description: 'Fire while rolling or evading, maintaining offensive pressure during dodges.',
    maxLevel: 3,
    branch: 'Archery',
    enhancement: 'Archery Lv. 2',
    source: 'Artifact',
  },
  'charged-shot': {
    name: 'Charged Shot',
    description: 'Hold to charge the bow for a high-damage precision shot.',
    maxLevel: 1,
    branch: 'Archery',
    enhancement: 'Archery Lv. 3',
    source: 'Artifact',
  },
  'multishot': {
    name: 'Multishot',
    description: 'Fire multiple arrows simultaneously, hitting several targets at once.',
    maxLevel: 1,
    branch: 'Archery',
    enhancement: 'Archery Lv. 4',
    source: 'Artifact',
  },
  'focus-shot': {
    name: 'Focus Shot',
    description: 'Enter a focused state for extreme accuracy. Time slows as you aim.',
    maxLevel: 3,
    branch: 'Archery',
    enhancement: 'Charged Shot',
    source: 'Artifact',
  },

  // ── GREEN BRANCH: SPIRIT ──────────────────────────────────────────────────
  'spirit': {
    name: 'Spirit',
    description: 'Increases your maximum spirit pool, powering all nature-based and defensive abilities.',
    maxLevel: 14,
    branch: 'Spirit',
    enhancement: 'Level up through skill usage',
    source: 'Passive progression',
  },
  'natures-echo': {
    name: "Nature's Echo",
    description: 'Channel the spirit of the natural world to amplify your next attack. Unlocks echoing variants.',
    maxLevel: 3,
    branch: 'Spirit Arts',
    enhancement: 'Spirit Lv. 3',
    source: 'Artifact',
  },
  'natures-snare': {
    name: "Nature's Snare",
    description: 'Summon binding roots or vines that immobilize a target briefly.',
    maxLevel: 3,
    branch: 'Spirit Arts',
    enhancement: 'Spirit Lv. 5',
    source: 'Artifact',
  },
  'keen-senses': {
    name: 'Keen Senses',
    description: 'Heighten awareness to detect hidden enemies and avoid ambushes. Enables Parry and Counter.',
    maxLevel: 3,
    branch: 'Spirit Arts',
    enhancement: 'Spirit Lv. 4',
    source: 'Artifact',
  },
  'focus': {
    name: 'Focus',
    description: 'Enter a focused state that slows perceived time and increases accuracy.',
    maxLevel: 3,
    branch: 'Spirit Arts',
    enhancement: "Nature's Echo Lv. 2",
    source: 'Artifact',
  },
  'force-palm': {
    name: 'Force Palm',
    description: 'A devastating open-palm strike that sends enemies flying. Can be leveled extensively.',
    maxLevel: 5,
    branch: 'Spirit Arts',
    enhancement: 'Focus Lv. 2',
    source: 'Observe hologram',
  },
  'parry': {
    name: 'Parry',
    description: 'Deflect incoming attacks with precise timing, creating a window for counterattack.',
    maxLevel: 1,
    branch: 'Spirit Arts',
    enhancement: 'Keen Senses Lv. 1',
    source: 'Artifact',
  },
  'counter': {
    name: 'Counter',
    description: 'After a successful parry, automatically strike back with increased damage.',
    maxLevel: 1,
    branch: 'Spirit Arts',
    enhancement: 'Parry',
    source: 'Artifact',
  },
  'evasive-roll': {
    name: 'Evasive Roll',
    description: 'A quick evasive roll that grants brief invincibility frames.',
    maxLevel: 1,
    branch: 'Spirit Arts',
    enhancement: 'Keen Senses Lv. 2',
    source: 'Artifact',
  },
  'double-jump': {
    name: 'Double Jump',
    description: 'Perform a second jump in mid-air, greatly improving vertical mobility.',
    maxLevel: 1,
    branch: 'Spirit Arts',
    enhancement: 'Evasive Roll',
    source: 'Artifact',
  },

  // ── RED BRANCH: HEALTH / ELEMENTAL ────────────────────────────────────────
  'health': {
    name: 'Health',
    description: 'Increases your maximum health pool, improving endurance during combat.',
    maxLevel: 18,
    branch: 'Health',
    enhancement: 'Level up through combat experience',
    source: 'Passive progression',
  },
  'fist-of-flame': {
    name: 'Fist of Flame',
    description: 'Imbue your fists with fire, adding burn damage to unarmed strikes.',
    maxLevel: 1,
    branch: 'Elemental Power',
    enhancement: 'Health Lv. 3',
    source: 'Artifact',
  },
  'veil-of-fog': {
    name: 'Veil of Fog',
    description: 'Shroud yourself in concealing fog, reducing enemy detection range.',
    maxLevel: 1,
    branch: 'Elemental Power',
    enhancement: 'Mystical Storage',
    source: 'Artifact',
  },
  'mantle-of-frost': {
    name: 'Mantle of Frost',
    description: 'Wrap yourself in frost that slows enemies who strike you in melee.',
    maxLevel: 1,
    branch: 'Elemental Power',
    enhancement: 'Imbue Elements Lv. 2',
    source: 'Artifact',
  },
  'surge-of-sparks': {
    name: 'Surge of Sparks',
    description: 'Release a crackling surge of lightning that chains across nearby enemies.',
    maxLevel: 1,
    branch: 'Elemental Power',
    enhancement: 'Imbue Elements Lv. 3',
    source: 'Artifact',
  },
  'imbue-elements': {
    name: 'Imbue Elements',
    description: 'Infuse your weapon with elemental power. Higher levels unlock Elemental Turning Slash and more.',
    maxLevel: 4,
    branch: 'Elemental Power',
    enhancement: 'Health Lv. 5',
    source: 'Artifact',
  },
  'mystical-storage': {
    name: 'Mystical Storage',
    description: 'Access a pocket dimension to store and retrieve items during combat.',
    maxLevel: 1,
    branch: 'Elemental Power',
    enhancement: 'Health Lv. 4',
    source: 'Artifact',
  },
  'axiom-force': {
    name: 'Axiom Force',
    description: 'Harness Abyss power to launch into aerial combat. Enables flight-style moves.',
    maxLevel: 3,
    branch: 'Axiom',
    enhancement: 'Health Lv. 8, Spirit Lv. 6',
    source: 'Story progression',
  },
  'flight': {
    name: 'Flight',
    description: 'Spread crow wings and take to the skies. Enables aerial exploration and combat.',
    maxLevel: 2,
    branch: 'Axiom',
    enhancement: 'Axiom Force Lv. 1',
    source: 'Story progression',
  },
  'aerial-maneuver': {
    name: 'Aerial Maneuver',
    description: 'Perform advanced maneuvers while airborne, dodging attacks and repositioning.',
    maxLevel: 1,
    branch: 'Axiom',
    enhancement: 'Axiom Force Lv. 2',
    source: 'Artifact',
  },
  'aerial-swing': {
    name: 'Aerial Swing',
    description: 'Execute powerful sword swings while in flight, striking ground targets from above.',
    maxLevel: 1,
    branch: 'Axiom',
    enhancement: 'Flight Lv. 1',
    source: 'Artifact',
  },
  'winch': {
    name: 'Winch',
    description: 'Fire a grappling shot that pulls enemies toward you or yanks you to a distant ledge.',
    maxLevel: 1,
    branch: 'Utility',
    enhancement: 'Health Lv. 6',
    source: 'Artifact',
  },

  // ── CORE: Convergence ─────────────────────────────────────────────────────
  'falling-palm': {
    name: 'Falling Palm',
    description: 'Unleash a powerful blow to the ground by harnessing the force of the fall. The ultimate convergence skill unlocked after mastering all three branches.',
    maxLevel: 1,
    branch: 'Core',
    enhancement: 'Complete all three branch roots',
    source: 'Convergence',
  },
};

// ─── Tree node layout ─────────────────────────────────────────────────────────
// Arranged to match the in-game Y-shaped tree: Blue (top, spreading left/right),
// Green (bottom-left), Red (bottom-right), Core spine connecting them.

const KLIFF_NODES: TreeNode[] = [
  // ── CORE SPINE ────────────────────────────────────────────────────────────
  { id: 'n-falling-palm', x: 50, y: 50, size: 'lg', branch: 'core', connections: ['n-core-upper', 'n-core-lower-l', 'n-core-lower-r'], skill: SKILL_DATA['falling-palm'] },
  { id: 'n-core-upper', x: 50, y: 38, size: 'md', branch: 'core', connections: ['n-stamina'], skill: undefined },
  { id: 'n-core-lower-l', x: 38, y: 60, size: 'md', branch: 'core', connections: ['n-spirit'], skill: undefined },
  { id: 'n-core-lower-r', x: 62, y: 60, size: 'md', branch: 'core', connections: ['n-health'], skill: undefined },

  // ── BLUE BRANCH (STAMINA) - Top ───────────────────────────────────────────
  // Main trunk
  { id: 'n-stamina', x: 50, y: 26, size: 'lg', branch: 'blue', connections: ['n-armed-combat', 'n-unarmed-combat', 'n-archery'], skill: SKILL_DATA['stamina'] },

  // Left arm: Armed Combat / Sword Mastery
  { id: 'n-armed-combat', x: 32, y: 20, size: 'md', branch: 'blue', connections: ['n-evasive-slash', 'n-forward-slash', 'n-shield-bash'], skill: SKILL_DATA['armed-combat'] },
  { id: 'n-evasive-slash', x: 22, y: 14, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['evasive-slash'] },
  { id: 'n-forward-slash', x: 24, y: 26, size: 'md', branch: 'blue', connections: ['n-turning-slash', 'n-stab'], skill: SKILL_DATA['forward-slash'] },
  { id: 'n-turning-slash', x: 14, y: 22, size: 'sm', branch: 'blue', connections: ['n-sword-flurry'], skill: SKILL_DATA['turning-slash'] },
  { id: 'n-stab', x: 14, y: 30, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['stab'] },
  { id: 'n-sword-flurry', x: 7, y: 17, size: 'sm', branch: 'blue', connections: ['n-blinding-flash'], skill: SKILL_DATA['sword-flurry'] },
  { id: 'n-blinding-flash', x: 5, y: 10, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['blinding-flash'] },
  { id: 'n-shield-bash', x: 38, y: 12, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['shield-bash'] },

  // Center arm: Unarmed Combat
  { id: 'n-unarmed-combat', x: 50, y: 15, size: 'md', branch: 'blue', connections: ['n-pump-kick', 'n-grappling'], skill: SKILL_DATA['unarmed-combat'] },
  { id: 'n-pump-kick', x: 44, y: 8, size: 'sm', branch: 'blue', connections: ['n-dropkick'], skill: SKILL_DATA['pump-kick'] },
  { id: 'n-dropkick', x: 38, y: 4, size: 'sm', branch: 'blue', connections: ['n-vault'], skill: SKILL_DATA['dropkick'] },
  { id: 'n-vault', x: 44, y: 2, size: 'sm', branch: 'blue', connections: ['n-flying-kick'], skill: SKILL_DATA['vault'] },
  { id: 'n-flying-kick', x: 50, y: 4, size: 'sm', branch: 'blue', connections: ['n-meteor-kick'], skill: SKILL_DATA['flying-kick'] },
  { id: 'n-meteor-kick', x: 56, y: 2, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['meteor-kick'] },
  { id: 'n-grappling', x: 56, y: 8, size: 'sm', branch: 'blue', connections: ['n-body-slam', 'n-clothesline'], skill: SKILL_DATA['grappling'] },
  { id: 'n-body-slam', x: 60, y: 4, size: 'sm', branch: 'blue', connections: ['n-belly-slam'], skill: SKILL_DATA['body-slam'] },
  { id: 'n-belly-slam', x: 66, y: 2, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['belly-slam'] },
  { id: 'n-clothesline', x: 64, y: 10, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['clothesline'] },

  // Right arm: Archery / Ranged
  { id: 'n-archery', x: 68, y: 20, size: 'md', branch: 'blue', connections: ['n-evasive-shot', 'n-charged-shot', 'n-multishot'], skill: SKILL_DATA['archery'] },
  { id: 'n-evasive-shot', x: 78, y: 14, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['evasive-shot'] },
  { id: 'n-charged-shot', x: 76, y: 26, size: 'sm', branch: 'blue', connections: ['n-focus-shot'], skill: SKILL_DATA['charged-shot'] },
  { id: 'n-focus-shot', x: 86, y: 22, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['focus-shot'] },
  { id: 'n-multishot', x: 86, y: 14, size: 'sm', branch: 'blue', connections: [], skill: SKILL_DATA['multishot'] },

  // ── GREEN BRANCH (SPIRIT) - Bottom Left ───────────────────────────────────
  { id: 'n-spirit', x: 26, y: 68, size: 'lg', branch: 'green', connections: ['n-natures-echo', 'n-keen-senses', 'n-natures-snare'], skill: SKILL_DATA['spirit'] },

  { id: 'n-natures-echo', x: 16, y: 62, size: 'md', branch: 'green', connections: ['n-focus-g', 'n-force-palm'], skill: SKILL_DATA['natures-echo'] },
  { id: 'n-focus-g', x: 8, y: 56, size: 'sm', branch: 'green', connections: [], skill: SKILL_DATA['focus'] },
  { id: 'n-force-palm', x: 8, y: 66, size: 'sm', branch: 'green', connections: [], skill: SKILL_DATA['force-palm'] },

  { id: 'n-keen-senses', x: 14, y: 74, size: 'md', branch: 'green', connections: ['n-parry', 'n-evasive-roll'], skill: SKILL_DATA['keen-senses'] },
  { id: 'n-parry', x: 6, y: 70, size: 'sm', branch: 'green', connections: ['n-counter'], skill: SKILL_DATA['parry'] },
  { id: 'n-counter', x: 4, y: 76, size: 'sm', branch: 'green', connections: [], skill: SKILL_DATA['counter'] },
  { id: 'n-evasive-roll', x: 10, y: 82, size: 'sm', branch: 'green', connections: ['n-double-jump'], skill: SKILL_DATA['evasive-roll'] },
  { id: 'n-double-jump', x: 6, y: 88, size: 'sm', branch: 'green', connections: [], skill: SKILL_DATA['double-jump'] },

  { id: 'n-natures-snare', x: 22, y: 80, size: 'sm', branch: 'green', connections: [], skill: SKILL_DATA['natures-snare'] },

  // ── RED BRANCH (HEALTH / ELEMENTAL) - Bottom Right ────────────────────────
  { id: 'n-health', x: 74, y: 68, size: 'lg', branch: 'red', connections: ['n-imbue-elements', 'n-mystical-storage', 'n-axiom-force', 'n-winch'], skill: SKILL_DATA['health'] },

  { id: 'n-imbue-elements', x: 84, y: 62, size: 'md', branch: 'red', connections: ['n-fist-of-flame', 'n-mantle-of-frost', 'n-surge-of-sparks'], skill: SKILL_DATA['imbue-elements'] },
  { id: 'n-fist-of-flame', x: 92, y: 56, size: 'sm', branch: 'red', connections: [], skill: SKILL_DATA['fist-of-flame'] },
  { id: 'n-mantle-of-frost', x: 94, y: 64, size: 'sm', branch: 'red', connections: [], skill: SKILL_DATA['mantle-of-frost'] },
  { id: 'n-surge-of-sparks', x: 92, y: 72, size: 'sm', branch: 'red', connections: [], skill: SKILL_DATA['surge-of-sparks'] },

  { id: 'n-mystical-storage', x: 82, y: 74, size: 'sm', branch: 'red', connections: ['n-veil-of-fog'], skill: SKILL_DATA['mystical-storage'] },
  { id: 'n-veil-of-fog', x: 90, y: 80, size: 'sm', branch: 'red', connections: [], skill: SKILL_DATA['veil-of-fog'] },

  { id: 'n-axiom-force', x: 72, y: 78, size: 'md', branch: 'red', connections: ['n-flight', 'n-aerial-maneuver'], skill: SKILL_DATA['axiom-force'] },
  { id: 'n-flight', x: 78, y: 86, size: 'sm', branch: 'red', connections: ['n-aerial-swing'], skill: SKILL_DATA['flight'] },
  { id: 'n-aerial-swing', x: 86, y: 90, size: 'sm', branch: 'red', connections: [], skill: SKILL_DATA['aerial-swing'] },
  { id: 'n-aerial-maneuver', x: 66, y: 86, size: 'sm', branch: 'red', connections: [], skill: SKILL_DATA['aerial-maneuver'] },

  { id: 'n-winch', x: 64, y: 74, size: 'sm', branch: 'red', connections: [], skill: SKILL_DATA['winch'] },
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
          Source: pre-launch preview
        </p>
      </div>
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

      {/* Damiane / Oongka placeholder */}
      {selectedChar !== 'kliff' ? (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-pywel-card border border-pywel-border flex items-center justify-center mb-2">
            <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-2xl font-cinzel font-bold text-gold-300">Skills Coming Soon</h2>
          <p className="text-gray-400 max-w-sm">
            {selectedChar === 'damiane' ? "Damiane's" : "Oongka's"} skill tree will be
            mapped out once the game launches and confirmed skill names are available.
          </p>
          <p className="text-xs text-gray-600 font-cinzel">Available from March 19, 2026</p>
        </div>
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
            Skill data sourced from pre-launch preview footage. Details may change after launch.
          </p>
        </>
      )}
    </div>
  );
}
