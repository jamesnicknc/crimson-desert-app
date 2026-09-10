'use client';

import { Suspense, useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Bot, Crosshair, Skull, Zap, MapPin, Gift, Radio } from 'lucide-react';
import { ENEMIES, MAP_EVENTS, MAPS, SIZE_CLASS_LABELS, SIZE_CLASS_COLORS, threatLabel, threatColor } from '@/lib/game-data';
import { PROGRESS } from '@/lib/progress-keys';
import { useProgress } from '@/hooks/use-progress';
import PageHeader from '@/components/ui/PageHeader';
import Chips from '@/components/ui/Chips';
import SearchInput from '@/components/ui/SearchInput';
import Modal from '@/components/ui/Modal';
import Checkbox from '@/components/ui/Checkbox';
import Tag, { Unverified } from '@/components/ui/Tag';
import ProgressBar from '@/components/ui/ProgressBar';
import type { Enemy, SizeClass } from '@/types/game-data';

const mapName = (slug: string) => MAPS.find((m) => m.slug === slug)?.name ?? slug;

function ThreatPips({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-0.5" title={`Threat ${level}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`w-2 h-2 rounded-sm ${i <= level ? 'bg-red-400' : 'bg-arc-border'}`} />
      ))}
    </span>
  );
}

function EnemyModal({ enemy, defeated, onToggle, onClose }: { enemy: Enemy; defeated: boolean; onToggle: () => void; onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <div className="px-6 py-5 border-b border-arc-border border-l-4 border-l-red-500">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <Tag className={SIZE_CLASS_COLORS[enemy.sizeClass]}>{SIZE_CLASS_LABELS[enemy.sizeClass]}</Tag>
          {enemy.role && <Tag className="text-gray-300 border-gray-600/50 bg-gray-600/10">{enemy.role}</Tag>}
          <span className={`text-xs font-display ${threatColor(enemy.threat)}`}>Threat: {threatLabel(enemy.threat)}</span>
          <ThreatPips level={enemy.threat} />
          {!enemy.verified && <Unverified />}
        </div>
        <h2 className="text-2xl font-display font-bold text-rust-300">{enemy.name}</h2>
        <p className="text-sm text-gray-300 mt-2 leading-relaxed">{enemy.description}</p>
        <div className="mt-3">
          <Checkbox checked={defeated} onChange={onToggle} label={defeated ? 'Destroyed one of these' : 'Mark as destroyed'} />
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div className="space-y-4">
          <Section icon={<Zap className="w-4 h-4" />} title="Attacks">
            <ul className="list-disc pl-5 space-y-1 text-gray-300">{enemy.attacks.map((a) => <li key={a}>{a}</li>)}</ul>
          </Section>
          <Section icon={<Crosshair className="w-4 h-4" />} title="Weak points">
            <ul className="list-disc pl-5 space-y-1 text-gray-300">{enemy.weakPoints.map((a) => <li key={a}>{a}</li>)}</ul>
          </Section>
          <Section icon={<Skull className="w-4 h-4" />} title="How to kill it">
            <p className="text-gray-300 leading-relaxed">{enemy.tactics}</p>
            {enemy.damageNotes && <p className="text-gray-500 mt-2 text-xs">{enemy.damageNotes}</p>}
            {enemy.recommendedWeapons.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {enemy.recommendedWeapons.map((w) => <Tag key={w} className="text-rust-300 border-rust-500/40 bg-rust-500/10">{w}</Tag>)}
              </div>
            )}
          </Section>
        </div>
        <div className="space-y-4">
          <Section icon={<Gift className="w-4 h-4" />} title="Drops">
            <div className="flex flex-wrap gap-1.5">{enemy.drops.map((d) => <Tag key={d} className="text-signal-300 border-signal-500/40 bg-signal-500/10">{d}</Tag>)}</div>
            {(enemy.hp || enemy.xp) && (
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                {enemy.hp && <div className="bg-arc-bg/50 rounded p-2"><p className="text-gray-500">HP (approx.)</p><p className="text-gray-200 font-mono">{enemy.hp}</p></div>}
                {enemy.xp && <div className="bg-arc-bg/50 rounded p-2"><p className="text-gray-500">XP</p><p className="text-gray-200 font-mono">{enemy.xp}</p></div>}
              </div>
            )}
          </Section>
          <Section icon={<MapPin className="w-4 h-4" />} title="Where it spawns">
            <div className="flex flex-wrap gap-1.5 mb-2">{enemy.maps.map((m) => <Tag key={m} className="text-blue-300 border-blue-500/40 bg-blue-500/10">{mapName(m)}</Tag>)}</div>
            <ul className="list-disc pl-5 space-y-1 text-gray-400">{enemy.situations.map((s) => <li key={s}>{s}</li>)}</ul>
            <p className="text-xs text-gray-600 mt-2">Added in: {enemy.addedIn}</p>
          </Section>
        </div>
      </div>
    </Modal>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-signal-400 mb-2">{icon}{title}</h3>
      {children}
    </div>
  );
}

function ArcPageInner() {
  const params = useSearchParams();
  const [query, setQuery] = useState('');
  const [size, setSize] = useState<SizeClass | 'all'>('all');
  const [selected, setSelected] = useState<Enemy | null>(null);
  const [tab, setTab] = useState<'arc' | 'events'>('arc');
  const { isCompleted, toggle } = useProgress();

  useEffect(() => {
    const q = params.get('q');
    if (q) {
      const match = ENEMIES.find((e) => e.name.toLowerCase() === q.toLowerCase());
      if (match) setSelected(match); else setQuery(q);
    }
  }, [params]);

  const filtered = useMemo(() => {
    const lq = query.toLowerCase();
    return ENEMIES.filter((e) => (size === 'all' || e.sizeClass === size) && (!lq || e.name.toLowerCase().includes(lq) || e.description.toLowerCase().includes(lq)));
  }, [query, size]);

  const sizeOptions = (['small', 'medium', 'large', 'boss', 'event'] as SizeClass[]).map((s) => ({ value: s, label: SIZE_CLASS_LABELS[s], count: ENEMIES.filter((e) => e.sizeClass === s).length }));
  const killable = ENEMIES.filter((e) => e.sizeClass !== 'event');
  const defeated = killable.filter((e) => isCompleted(PROGRESS.arc, e.id)).length;

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Bot className="w-7 h-7" />}
        title="ARC Bestiary"
        subtitle="Every machine on the Rust Belt with its tells, weak points, drops and the maps it haunts. Tick the ones you have destroyed."
        right={<div className="w-56"><ProgressBar value={defeated} max={killable.length} color="bg-red-400" label="Destroyed" /></div>}
      />

      <div className="flex gap-2 border-b border-arc-border">
        {(['arc', 'events'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-display border-b-2 -mb-px transition-colors ${tab === t ? 'text-rust-300 border-rust-400' : 'text-gray-400 border-transparent hover:text-gray-200'}`}>
            {t === 'arc' ? `Machines (${ENEMIES.length})` : `Map Conditions & Events (${MAP_EVENTS.length})`}
          </button>
        ))}
      </div>

      {tab === 'arc' ? (
        <>
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <SearchInput value={query} onChange={setQuery} placeholder="Search machines..." className="md:w-72" />
            <Chips options={sizeOptions} value={size} onChange={setSize} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((e) => {
              const done = isCompleted(PROGRESS.arc, e.id);
              return (
                <div key={e.id} onClick={() => setSelected(e)} className={`bg-arc-card border rounded-lg p-4 cursor-pointer hover:bg-arc-card-hover transition-colors ${done ? 'border-green-500/40' : 'border-arc-border hover:border-red-500/50'}`}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag className={SIZE_CLASS_COLORS[e.sizeClass]}>{SIZE_CLASS_LABELS[e.sizeClass]}</Tag>
                      <ThreatPips level={e.threat} />
                    </div>
                    {e.sizeClass !== 'event' && <Checkbox checked={done} onChange={() => toggle(PROGRESS.arc, e.id)} size="sm" />}
                  </div>
                  <h3 className="font-display font-bold text-lg text-gray-100">{e.name}</h3>
                  {e.role && <p className="text-xs text-gray-500 mb-1">{e.role}</p>}
                  <p className="text-sm text-gray-400 line-clamp-3">{e.description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {e.weakPoints.slice(0, 2).map((w) => <Tag key={w} className="text-red-300 border-red-500/30 bg-red-500/10">{w}</Tag>)}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MAP_EVENTS.map((ev) => (
            <div key={ev.id} className="bg-arc-card border border-arc-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Radio className="w-4 h-4 text-signal-400" />
                <h3 className="font-display font-bold text-gray-100">{ev.name}</h3>
                <Tag className="text-gray-300 border-gray-600/50 bg-gray-600/10">{ev.category}</Tag>
                {!ev.verified && <Unverified />}
              </div>
              <p className="text-xs text-gray-500 mb-2"><span className="text-gray-400">Trigger:</span> {ev.trigger}</p>
              <p className="text-sm text-gray-300 mb-2">{ev.description}</p>
              {ev.rewards.length > 0 && <p className="text-xs text-gray-400"><span className="text-signal-400">Rewards:</span> {ev.rewards.join('; ')}</p>}
              <div className="flex flex-wrap gap-1 mt-2">
                {ev.maps.map((m) => <Tag key={m} className="text-blue-300 border-blue-500/40 bg-blue-500/10">{m === 'all' ? 'All maps' : mapName(m)}</Tag>)}
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <EnemyModal enemy={selected} defeated={isCompleted(PROGRESS.arc, selected.id)} onToggle={() => toggle(PROGRESS.arc, selected.id)} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

export default function ArcPage() {
  return (
    <Suspense fallback={<div className="text-gray-500 text-sm">Loading...</div>}>
      <ArcPageInner />
    </Suspense>
  );
}
