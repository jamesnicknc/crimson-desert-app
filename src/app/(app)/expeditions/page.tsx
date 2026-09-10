'use client';

import { useState } from 'react';
import { Rocket, Trophy, Target, CalendarDays, CheckCircle2, Circle, Info } from 'lucide-react';
import { EXPEDITION_PROJECTS, EXPEDITION_MECHANICS, TRIALS, ACHIEVEMENTS } from '@/lib/game-data';
import { PROGRESS } from '@/lib/progress-keys';
import { useProgress } from '@/hooks/use-progress';
import PageHeader from '@/components/ui/PageHeader';
import ProgressBar from '@/components/ui/ProgressBar';
import Tag, { Unverified } from '@/components/ui/Tag';
import Chips from '@/components/ui/Chips';
import SignInPrompt from '@/components/SignInPrompt';

type Tab = 'projects' | 'mechanics' | 'trials' | 'achievements';
const GRADE_STYLE: Record<string, string> = {
  platinum: 'text-cyan-300 border-cyan-500/40 bg-cyan-500/10',
  gold: 'text-yellow-300 border-yellow-500/40 bg-yellow-500/10',
  silver: 'text-gray-200 border-gray-500/40 bg-gray-500/10',
  bronze: 'text-amber-500 border-amber-700/40 bg-amber-700/10',
};

export default function ExpeditionsPage() {
  const [tab, setTab] = useState<Tab>('projects');
  const [kind, setKind] = useState<'expedition' | 'community' | 'personal' | 'all'>('all');
  const [trialType, setTrialType] = useState<'daily' | 'weekly' | 'event' | 'trial' | 'all'>('all');
  const { isCompleted, toggle, loading, isAuthenticated } = useProgress();

  const projects = EXPEDITION_PROJECTS.filter((p) => kind === 'all' || p.kind === kind);
  const phaseKey = (pid: string, phase: number) => `${pid}-p${phase}`;
  const achDone = ACHIEVEMENTS.filter((a) => isCompleted(PROGRESS.achievement, a.id)).length;
  const trials = TRIALS.filter((t) => trialType === 'all' || t.type === trialType);

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Rocket className="w-7 h-7" />}
        title="Expeditions & Projects"
        subtitle="The prestige system, community and personal projects with their phase requirements, weekly Trials, daily Feats and the full achievement list."
        right={<div className="w-56"><ProgressBar value={achDone} max={ACHIEVEMENTS.length} color="bg-yellow-400" label="Achievements" /></div>}
      />
      {!loading && !isAuthenticated && <SignInPrompt compact message="Sign in to track project phases and achievements." />}

      <div className="flex gap-2 border-b border-arc-border overflow-x-auto">
        {([['projects', 'Projects'], ['mechanics', 'How Expeditions Work'], ['trials', 'Trials & Feats'], ['achievements', `Achievements (${ACHIEVEMENTS.length})`]] as [Tab, string][]).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-display border-b-2 -mb-px whitespace-nowrap transition-colors ${tab === t ? 'text-rust-300 border-rust-400' : 'text-gray-400 border-transparent hover:text-gray-200'}`}>{label}</button>
        ))}
      </div>

      {tab === 'projects' && (
        <>
          <Chips options={[{ value: 'expedition', label: 'Expeditions' }, { value: 'community', label: 'Community' }, { value: 'personal', label: 'Personal' }]} value={kind} onChange={setKind} />
          <div className="space-y-4">
            {projects.map((p) => {
              const done = p.phases.filter((ph) => isCompleted(PROGRESS.expedition, phaseKey(p.id, ph.phase))).length;
              return (
                <div key={p.id} className="bg-arc-card border border-arc-border rounded-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-arc-border">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-display text-lg font-bold text-rust-300">{p.name}</h2>
                      <Tag className="text-gray-300 border-gray-600/50 bg-gray-600/10">{p.kind}</Tag>
                      {(p.startDate || p.endDate) && <span className="flex items-center gap-1 text-xs text-gray-500"><CalendarDays className="w-3 h-3" />{p.startDate ?? '?'} to {p.endDate ?? '?'}</span>}
                      {!p.verified && <Unverified />}
                      <span className="ml-auto text-xs font-mono text-gray-400">{done}/{p.phases.length} phases</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1 whitespace-pre-line">{p.description}</p>
                  </div>
                  <div className="divide-y divide-arc-border/60">
                    {p.phases.map((ph) => {
                      const d = isCompleted(PROGRESS.expedition, phaseKey(p.id, ph.phase));
                      return (
                        <div key={ph.phase} className={`px-4 py-3 flex gap-3 ${d ? 'bg-green-500/5' : ''}`}>
                          <button onClick={() => toggle(PROGRESS.expedition, phaseKey(p.id, ph.phase))} className={`flex-shrink-0 mt-0.5 ${d ? 'text-green-400' : 'text-gray-600 hover:text-gray-300'}`}>
                            {d ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                          </button>
                          <div className="flex-1 min-w-0">
                            <p className="font-display font-semibold text-sm text-gray-100">Phase {ph.phase}: {ph.name}</p>
                            {ph.description && <p className="text-xs text-gray-400 mt-0.5">{ph.description}</p>}
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {ph.requirements.map((r, i) => <span key={i} className={`text-xs px-2 py-0.5 rounded border ${d ? 'border-arc-border/50 text-gray-500' : 'border-arc-border text-gray-200'}`}>{r.item}{r.qty > 1 ? <span className="font-mono text-signal-300"> x{r.qty}</span> : null}</span>)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {p.rewards.length > 0 && (
                    <div className="px-4 py-3 border-t border-arc-border bg-arc-bg/30">
                      <p className="text-xs font-display uppercase tracking-wider text-signal-400 mb-1">{p.kind === 'expedition' ? 'Departure window' : 'Rewards'}</p>
                      <ul className="text-xs text-gray-300 space-y-0.5">{p.rewards.map((r) => <li key={r}>{r}</li>)}</ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {tab === 'mechanics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['Unlock requirement', EXPEDITION_MECHANICS.unlockRequirement],
            ['How it works', EXPEDITION_MECHANICS.howItWorks],
            ['Departure challenge', EXPEDITION_MECHANICS.departureChallenge],
            ['Lineage buffs', EXPEDITION_MECHANICS.lineageBuffs],
            ['Stash slots', EXPEDITION_MECHANICS.stashSlots],
            ['Cosmetics', EXPEDITION_MECHANICS.cosmetics],
          ].map(([t, c]) => (
            <div key={t} className="bg-arc-card border border-arc-border rounded-lg p-4">
              <h3 className="flex items-center gap-2 font-display font-bold text-rust-300 mb-2"><Info className="w-4 h-4 text-signal-400" />{t}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{c}</p>
            </div>
          ))}
          <div className="bg-arc-card border border-red-500/30 rounded-lg p-4">
            <h3 className="font-display font-bold text-red-300 mb-2">What resets on departure</h3>
            <ul className="text-sm text-gray-300 space-y-1 list-disc pl-5">{EXPEDITION_MECHANICS.whatResets.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div className="bg-arc-card border border-green-500/30 rounded-lg p-4">
            <h3 className="font-display font-bold text-green-300 mb-2">What carries over</h3>
            <ul className="text-sm text-gray-300 space-y-1 list-disc pl-5">{EXPEDITION_MECHANICS.whatCarriesOver.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          {EXPEDITION_MECHANICS.scheduleHistory.length > 0 && (
            <div className="bg-arc-card border border-arc-border rounded-lg p-4 md:col-span-2">
              <h3 className="font-display font-bold text-rust-300 mb-2">Expedition history</h3>
              <ul className="text-sm text-gray-300 space-y-1">{EXPEDITION_MECHANICS.scheduleHistory.map((s) => <li key={s.expedition}><span className="font-mono text-signal-300">#{s.expedition}</span> {s.window}</li>)}</ul>
            </div>
          )}
        </div>
      )}

      {tab === 'trials' && (
        <>
          <Chips options={[{ value: 'weekly', label: 'Weekly' }, { value: 'trial', label: 'Trial challenges' }, { value: 'daily', label: 'Daily feats' }, { value: 'event', label: 'Other' }]} value={trialType} onChange={setTrialType} />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {trials.map((t) => (
              <div key={t.id} className="bg-arc-card border border-arc-border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1"><Target className="w-4 h-4 text-signal-400 flex-shrink-0" /><h3 className="font-display font-semibold text-sm text-gray-100">{t.name}</h3><Tag className="ml-auto text-gray-400 border-gray-600/40 bg-transparent">{t.type}</Tag></div>
                <p className="text-xs text-gray-400">{t.description}</p>
                <p className="text-xs text-rust-300 mt-1">{t.reward}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'achievements' && (
        <div className="space-y-1.5">
          {ACHIEVEMENTS.map((a) => {
            const d = isCompleted(PROGRESS.achievement, a.id);
            return (
              <button key={a.id} onClick={() => toggle(PROGRESS.achievement, a.id)} className={`w-full flex items-center gap-3 p-2.5 rounded-lg border text-left transition-colors ${d ? 'bg-green-500/5 border-green-500/30' : 'bg-arc-card border-arc-border hover:border-rust-500/40'}`}>
                {d ? <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" /> : <Trophy className="w-5 h-5 text-gray-600 flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-display font-semibold text-sm ${d ? 'text-gray-400' : 'text-gray-100'}`}>{a.name}</span>
                    <Tag className={GRADE_STYLE[a.grade]}>{a.grade}</Tag>
                    {a.hidden && <Tag className="text-gray-500 border-gray-600/40 bg-transparent">hidden</Tag>}
                  </div>
                  <p className="text-xs text-gray-500">{a.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
