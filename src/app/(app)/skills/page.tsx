'use client';

import { useMemo } from 'react';
import { GitBranch, Minus, Plus, RotateCcw, Star } from 'lucide-react';
import { SKILLS, SKILL_BRANCHES } from '@/lib/game-data';
import { PROGRESS } from '@/lib/progress-keys';
import { useProgress } from '@/hooks/use-progress';
import PageHeader from '@/components/ui/PageHeader';
import ProgressBar from '@/components/ui/ProgressBar';
import Tag from '@/components/ui/Tag';
import SignInPrompt from '@/components/SignInPrompt';
import type { Skill, SkillRating } from '@/types/game-data';

const MAX_POINTS = 76;
const RATING_STYLE: Record<SkillRating, string> = {
  'must-have': 'text-rust-300 border-rust-500/50 bg-rust-500/10',
  good: 'text-signal-300 border-signal-500/40 bg-signal-500/10',
  situational: 'text-gray-300 border-gray-600/50 bg-gray-600/10',
  skip: 'text-gray-500 border-gray-700/50 bg-transparent',
};

// Arrange nodes into tiers by prerequisite depth so the tree reads top to bottom.
function depthOf(skill: Skill, all: Skill[], memo: Map<string, number>): number {
  if (memo.has(skill.id)) return memo.get(skill.id)!;
  if (skill.prerequisites.length === 0) { memo.set(skill.id, 0); return 0; }
  const d = 1 + Math.max(...skill.prerequisites.map((p) => { const s = all.find((x) => x.name === p); return s ? depthOf(s, all, memo) : 0; }));
  memo.set(skill.id, d);
  return d;
}

export default function SkillsPage() {
  const { getValue, setValue, loading, isAuthenticated } = useProgress();

  const pointsOf = (s: Skill) => Number(getValue(PROGRESS.skill, s.id)?.points ?? 0) || 0;
  const total = SKILLS.reduce((sum, s) => sum + pointsOf(s), 0);
  const branchTotals = Object.fromEntries(SKILL_BRANCHES.map((b) => [b.id, SKILLS.filter((s) => s.branch === b.id).reduce((sum, s) => sum + pointsOf(s), 0)]));

  const tiers = useMemo(() => {
    const memo = new Map<string, number>();
    const byBranch: Record<string, Skill[][]> = {};
    SKILL_BRANCHES.forEach((b) => {
      const nodes = SKILLS.filter((s) => s.branch === b.id);
      const rows: Skill[][] = [];
      nodes.forEach((n) => { const d = depthOf(n, SKILLS, memo); (rows[d] ??= []).push(n); });
      byBranch[b.id] = rows.filter(Boolean);
    });
    return byBranch;
  }, []);

  const prereqMet = (s: Skill) => s.prerequisites.every((p) => { const ps = SKILLS.find((x) => x.name === p); return !ps || pointsOf(ps) > 0; });

  const adjust = (s: Skill, delta: number) => {
    const next = Math.max(0, Math.min(s.maxPoints, pointsOf(s) + delta));
    if (delta > 0 && total >= MAX_POINTS) return;
    if (delta > 0 && !prereqMet(s)) return;
    setValue(PROGRESS.skill, s.id, next === 0 ? null : { points: next, completed: true });
  };
  const reset = () => SKILLS.forEach((s) => { if (pointsOf(s) > 0) setValue(PROGRESS.skill, s.id, null); });

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<GitBranch className="w-7 h-7" />}
        title="Skill Tree"
        subtitle="All 45 nodes across Conditioning, Mobility and Survival. Plan your 76 points, respect prerequisites, and see what the community rates as must-have."
        right={
          <div className="flex items-center gap-3">
            <div className="w-48"><ProgressBar value={total} max={MAX_POINTS} color="bg-signal-400" label="Points spent" /></div>
            <button onClick={reset} className="flex items-center gap-1 px-3 py-2 text-xs bg-arc-card border border-arc-border rounded-lg text-gray-300 hover:text-rust-300"><RotateCcw className="w-3.5 h-3.5" />Reset</button>
          </div>
        }
      />
      {!loading && !isAuthenticated && <SignInPrompt compact message="Sign in to save your skill build." />}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {SKILL_BRANCHES.map((b) => (
          <div key={b.id} className="bg-arc-card border border-arc-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-arc-border" style={{ borderTop: `3px solid ${b.color}` }}>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold" style={{ color: b.color }}>{b.name}</h2>
                <span className="text-xs font-mono text-gray-400">{branchTotals[b.id]} pts</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{b.description}</p>
              <p className="text-[11px] text-gray-600 mt-1">Tier gates: 15 points opens mid-tier, 36 opens the capstones.</p>
            </div>
            <div className="p-3 space-y-3">
              {tiers[b.id].map((row, ti) => (
                <div key={ti}>
                  <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-1.5">Tier {ti + 1}</p>
                  <div className="space-y-1.5">
                    {row.map((s) => {
                      const pts = pointsOf(s);
                      const locked = !prereqMet(s);
                      return (
                        <div key={s.id} className={`rounded-lg border p-2.5 transition-colors ${pts > 0 ? 'border-signal-500/50 bg-signal-500/5' : locked ? 'border-arc-border/50 bg-arc-bg/30 opacity-60' : 'border-arc-border bg-arc-bg/50'}`}>
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {s.isMajor && <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
                                <h3 className="font-display font-semibold text-sm text-gray-100">{s.name}</h3>
                                <Tag className={RATING_STYLE[s.rating]}>{s.rating}</Tag>
                              </div>
                              <p className="text-xs text-gray-400 mt-0.5">{s.effect}</p>
                              {s.prerequisites.length > 0 && <p className="text-[11px] text-gray-600 mt-0.5">Requires: {s.prerequisites.join(', ')}</p>}
                              {s.ratingNote && <p className="text-[11px] text-gray-500 mt-0.5 italic">{s.ratingNote}</p>}
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button onClick={() => adjust(s, -1)} disabled={pts === 0} className="w-6 h-6 rounded bg-arc-card border border-arc-border text-gray-300 disabled:opacity-30 hover:border-rust-400 flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                              <span className="w-8 text-center text-xs font-mono text-gray-100">{pts}/{s.maxPoints}</span>
                              <button onClick={() => adjust(s, 1)} disabled={pts >= s.maxPoints || locked || total >= MAX_POINTS} className="w-6 h-6 rounded bg-arc-card border border-arc-border text-gray-300 disabled:opacity-30 hover:border-signal-400 flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-600">Star marks major (single-rank) nodes. Ratings are community consensus as of September 2026 and will shift with the Frozen Trail skill rework.</p>
    </div>
  );
}
