'use client';

import { useState } from 'react';
import type { Character } from '@/types/game-data';

// ─── Tree structure ───────────────────────────────────────────────────────────
// Mirrors the in-game skill tree layout (3 colour branches + central spine).
// Node positions are expressed as percentages of the SVG canvas (800×700).
// Names and descriptions are intentionally omitted until post-launch.

interface TreeNode {
  id: string;
  x: number; // % of canvas width
  y: number; // % of canvas height
  size: 'lg' | 'md' | 'sm'; // lg = branch root, md = major node, sm = leaf
  branch: 'blue' | 'green' | 'red' | 'core';
  connections: string[]; // ids this node connects TO (drawn as lines)
}

// Central spine runs top-to-bottom; three branches radiate out.
const KLIFF_NODES: TreeNode[] = [
  // ── Core / Central spine ────────────────────────────────────────────────────
  { id: 'core-top',    x: 50,   y: 10,  size: 'lg', branch: 'core', connections: ['blue-root', 'core-mid'] },
  { id: 'core-mid',   x: 50,   y: 34,  size: 'md', branch: 'core', connections: ['core-hub'] },
  { id: 'core-hub',   x: 50,   y: 50,  size: 'lg', branch: 'core', connections: ['core-low', 'green-root', 'red-root'] },
  { id: 'core-low',   x: 50,   y: 65,  size: 'md', branch: 'core', connections: [] },

  // ── Blue branch (top) ───────────────────────────────────────────────────────
  // Root splits into two arms: left (sword) and right (bow/ranged)
  { id: 'blue-root',  x: 50,   y: 19,  size: 'md', branch: 'blue', connections: ['blue-lA', 'blue-rA'] },

  // Left arm – Sword Mastery
  { id: 'blue-lA',    x: 34,   y: 24,  size: 'md', branch: 'blue', connections: ['blue-lB', 'blue-lC'] },
  { id: 'blue-lB',    x: 22,   y: 22,  size: 'sm', branch: 'blue', connections: ['blue-lD'] },
  { id: 'blue-lD',    x: 13,   y: 17,  size: 'sm', branch: 'blue', connections: [] },
  { id: 'blue-lC',    x: 24,   y: 32,  size: 'sm', branch: 'blue', connections: ['blue-lE'] },
  { id: 'blue-lE',    x: 14,   y: 30,  size: 'sm', branch: 'blue', connections: [] },

  // Right arm – Unarmed / Bow
  { id: 'blue-rA',    x: 66,   y: 24,  size: 'md', branch: 'blue', connections: ['blue-rB', 'blue-rC'] },
  { id: 'blue-rB',    x: 78,   y: 22,  size: 'sm', branch: 'blue', connections: ['blue-rD'] },
  { id: 'blue-rD',    x: 87,   y: 17,  size: 'sm', branch: 'blue', connections: [] },
  { id: 'blue-rC',    x: 76,   y: 32,  size: 'sm', branch: 'blue', connections: ['blue-rE'] },
  { id: 'blue-rE',    x: 86,   y: 30,  size: 'sm', branch: 'blue', connections: [] },

  // ── Green branch (bottom-left) ──────────────────────────────────────────────
  { id: 'green-root', x: 21,   y: 72,  size: 'lg', branch: 'green', connections: ['green-A', 'green-B'] },
  { id: 'green-A',    x: 12,   y: 63,  size: 'md', branch: 'green', connections: ['green-C'] },
  { id: 'green-C',    x: 5,    y: 55,  size: 'sm', branch: 'green', connections: [] },
  { id: 'green-B',    x: 11,   y: 78,  size: 'md', branch: 'green', connections: ['green-D', 'green-E'] },
  { id: 'green-D',    x: 4,    y: 71,  size: 'sm', branch: 'green', connections: [] },
  { id: 'green-E',    x: 5,    y: 85,  size: 'sm', branch: 'green', connections: [] },

  // ── Red branch (bottom-right) ───────────────────────────────────────────────
  { id: 'red-root',   x: 79,   y: 72,  size: 'lg', branch: 'red',   connections: ['red-A', 'red-B'] },
  { id: 'red-A',      x: 88,   y: 63,  size: 'md', branch: 'red',   connections: ['red-C'] },
  { id: 'red-C',      x: 95,   y: 55,  size: 'sm', branch: 'red',   connections: [] },
  { id: 'red-B',      x: 89,   y: 78,  size: 'md', branch: 'red',   connections: ['red-D', 'red-E'] },
  { id: 'red-D',      x: 96,   y: 71,  size: 'sm', branch: 'red',   connections: [] },
  { id: 'red-E',      x: 95,   y: 85,  size: 'sm', branch: 'red',   connections: [] },
];

// Build a lookup map
const NODE_MAP = Object.fromEntries(KLIFF_NODES.map(n => [n.id, n]));

// ─── Visual constants ─────────────────────────────────────────────────────────
const BRANCH_COLORS = {
  blue:  { stroke: '#60a5fa', fill: '#1e3a5f', glow: '#3b82f6', label: 'Combat Arts' },
  green: { stroke: '#4ade80', fill: '#14532d', glow: '#22c55e', label: 'Spirit Arts' },
  red:   { stroke: '#f87171', fill: '#5c0a0a', glow: '#ef4444', label: 'Elemental Power' },
  core:  { stroke: '#fbbf24', fill: '#451a03', glow: '#f59e0b', label: 'Core' },
};

const NODE_RADIUS = {
  lg: 22,
  md: 16,
  sm: 11,
};

// ─── SVG canvas dimensions ────────────────────────────────────────────────────
const W = 800;
const H = 700;

function px(pct: number, total: number) {
  return (pct / 100) * total;
}

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
      {/* Glow ring when selected or unlocked */}
      {(selected || unlocked) && (
        <circle cx={cx} cy={cy} r={r + 5}
          fill="none"
          stroke={colors.glow}
          strokeWidth={selected ? 2.5 : 1.5}
          opacity={selected ? 0.9 : 0.45}
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
      {/* Inner dot for medium/small nodes */}
      {node.size !== 'lg' && (
        <circle cx={cx} cy={cy} r={r * 0.35}
          fill={unlocked ? colors.stroke : '#4b5563'}
          opacity={unlocked ? 0.9 : 0.4}
        />
      )}
      {/* Cross / plus for large root nodes */}
      {node.size === 'lg' && (
        <>
          <line x1={cx - r * 0.45} y1={cy} x2={cx + r * 0.45} y2={cy}
            stroke={unlocked ? colors.stroke : '#6b7280'} strokeWidth={1.5} />
          <line x1={cx} y1={cy - r * 0.45} x2={cx} y2={cy + r * 0.45}
            stroke={unlocked ? colors.stroke : '#6b7280'} strokeWidth={1.5} />
        </>
      )}
    </g>
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
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const toggleNode = (id: string) => {
    setSelectedNode(id === selectedNode ? null : id);
    setUnlockedNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalNodes = KLIFF_NODES.length;
  const unlockedCount = unlockedNodes.size;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Skill Tree</h1>
        <p className="text-gray-400">Unlock and master skills for each character.</p>
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
          {/* Progress bar */}
          <div className="bg-pywel-card rounded-lg p-4 border border-pywel-border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-cinzel font-semibold text-gold-300">Skills Unlocked</span>
              <span className="text-sm text-gold-400">{unlockedCount} / {totalNodes}</span>
            </div>
            <div className="w-full bg-pywel-bg rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-300"
                style={{ width: `${totalNodes > 0 ? (unlockedCount / totalNodes) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Branch legend */}
          <div className="flex flex-wrap gap-3">
            {(Object.entries(BRANCH_COLORS) as [keyof typeof BRANCH_COLORS, typeof BRANCH_COLORS['blue']][]).map(([key, c]) => (
              <div key={key} className="flex items-center gap-2 text-xs font-cinzel">
                <span className="w-3 h-3 rounded-full border-2 flex-shrink-0"
                  style={{ borderColor: c.stroke, backgroundColor: c.fill }} />
                <span className="text-gray-400">{c.label}</span>
              </div>
            ))}
            <p className="text-xs text-gray-600 ml-auto self-center">Click a node to toggle unlocked</p>
          </div>

          {/* Skill tree SVG */}
          <div className="bg-pywel-card border border-pywel-border rounded-xl overflow-hidden">
            <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="absolute inset-0 w-full h-full"
                style={{ background: 'radial-gradient(ellipse at 50% 30%, #0c1220 0%, #080c14 100%)' }}
              >
                {/* Decorative outer ring */}
                <ellipse cx={W / 2} cy={H * 0.48} rx={W * 0.46} ry={H * 0.44}
                  fill="none" stroke="#1e2a3a" strokeWidth={1} strokeDasharray="4 6" opacity={0.5} />
                <ellipse cx={W / 2} cy={H * 0.48} rx={W * 0.38} ry={H * 0.36}
                  fill="none" stroke="#1a2436" strokeWidth={1} opacity={0.4} />

                {/* Branch sector fills (subtle coloured wedges) */}
                {/* Blue sector -- top */}
                <path
                  d={`M ${W/2} ${H*0.5} L ${W*0.08} ${H*0.02} A ${W*0.5} ${H*0.5} 0 0 1 ${W*0.92} ${H*0.02} Z`}
                  fill="#1a2d4a" opacity={0.18}
                />
                {/* Green sector -- bottom-left */}
                <path
                  d={`M ${W/2} ${H*0.5} L ${W*0.02} ${H*0.52} A ${W*0.5} ${H*0.5} 0 0 0 ${W*0.35} ${H*0.98} Z`}
                  fill="#0f2a1a" opacity={0.18}
                />
                {/* Red sector -- bottom-right */}
                <path
                  d={`M ${W/2} ${H*0.5} L ${W*0.65} ${H*0.98} A ${W*0.5} ${H*0.5} 0 0 0 ${W*0.98} ${H*0.52} Z`}
                  fill="#2a0f0f" opacity={0.18}
                />

                {/* Connection lines -- drawn first so nodes sit on top */}
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
                        strokeWidth={active ? 2 : 1.5}
                        opacity={active ? 0.75 : 0.45}
                        strokeDasharray={active ? 'none' : '4 4'}
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
                    selected={selectedNode === node.id}
                    onClick={() => toggleNode(node.id)}
                  />
                ))}

                {/* Branch root labels */}
                <text x={px(50, W)} y={px(5.5, H)} textAnchor="middle"
                  fill="#60a5fa" fontSize={11} fontFamily="serif" opacity={0.7} letterSpacing={2}>
                  COMBAT ARTS
                </text>
                <text x={px(10, W)} y={px(93, H)} textAnchor="middle"
                  fill="#4ade80" fontSize={11} fontFamily="serif" opacity={0.7} letterSpacing={2}>
                  SPIRIT
                </text>
                <text x={px(90, W)} y={px(93, H)} textAnchor="middle"
                  fill="#f87171" fontSize={11} fontFamily="serif" opacity={0.7} letterSpacing={2}>
                  ELEMENTAL
                </text>
              </svg>
            </div>
          </div>

          {/* Selected node info panel */}
          {selectedNode && (
            <div className="bg-pywel-card border border-pywel-border rounded-xl p-5">
              <div className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full border-2 flex-shrink-0"
                  style={{
                    borderColor: BRANCH_COLORS[NODE_MAP[selectedNode].branch].stroke,
                    backgroundColor: BRANCH_COLORS[NODE_MAP[selectedNode].branch].fill,
                  }}
                />
                <div>
                  <p className="text-gold-300 font-cinzel font-semibold">
                    {BRANCH_COLORS[NODE_MAP[selectedNode].branch].label}
                  </p>
                  <p className="text-gray-500 text-sm mt-0.5">
                    Skill names and descriptions will be added after launch.
                  </p>
                </div>
                <span className={`ml-auto text-xs font-cinzel px-2.5 py-1 rounded-full border ${
                  unlockedNodes.has(selectedNode)
                    ? 'bg-green-900/30 border-green-700/40 text-green-400'
                    : 'bg-pywel-bg border-pywel-border text-gray-500'
                }`}>
                  {unlockedNodes.has(selectedNode) ? 'Unlocked' : 'Locked'}
                </span>
              </div>
            </div>
          )}

          <p className="text-center text-xs text-gray-600">
            Skill tree layout sourced from pre-launch preview footage. Names and details added post-launch.
          </p>
        </>
      )}
    </div>
  );
}
