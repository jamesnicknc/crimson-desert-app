'use client';

import { useMemo, useState } from 'react';
import { Wrench, ListOrdered, ShoppingBasket, CheckCircle2, Circle } from 'lucide-react';
import { WORKSHOP_STATIONS, WORKSHOP_ORDER, ITEMS } from '@/lib/game-data';
import { PROGRESS } from '@/lib/progress-keys';
import { useProgress } from '@/hooks/use-progress';
import PageHeader from '@/components/ui/PageHeader';
import ProgressBar from '@/components/ui/ProgressBar';
import Tag, { Unverified } from '@/components/ui/Tag';
import SignInPrompt from '@/components/SignInPrompt';
import ItemDetail from '@/components/items/ItemDetail';
import type { Item } from '@/types/game-data';

export default function WorkshopPage() {
  const { isCompleted, setValue, loading, isAuthenticated } = useProgress();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const key = (stationId: string, level: number) => `${stationId}-${level}`;
  const isDone = (stationId: string, level: number) => isCompleted(PROGRESS.workshop, key(stationId, level));

  // Completing a level also completes lower levels; un-completing clears higher ones.
  const setLevel = (stationId: string, level: number, done: boolean) => {
    const station = WORKSHOP_STATIONS.find((s) => s.id === stationId)!;
    station.levels.forEach((l) => {
      if (done && l.level <= level && !isDone(stationId, l.level)) setValue(PROGRESS.workshop, key(stationId, l.level), { completed: true });
      if (!done && l.level >= level && isDone(stationId, l.level)) setValue(PROGRESS.workshop, key(stationId, l.level), null);
    });
  };

  const totalLevels = WORKSHOP_STATIONS.reduce((s, st) => s + st.levels.length, 0);
  const doneLevels = WORKSHOP_STATIONS.reduce((s, st) => s + st.levels.filter((l) => isDone(st.id, l.level)).length, 0);

  // Shopping list: materials for the next incomplete level of every station.
  const shopping = useMemo(() => {
    const need: Record<string, { item: string; itemId?: string; qty: number; from: string[] }> = {};
    WORKSHOP_STATIONS.forEach((st) => {
      const next = st.levels.find((l) => !isDone(st.id, l.level));
      if (!next) return;
      next.materials.forEach((m) => {
        const k = m.itemId ?? m.item;
        need[k] ??= { item: m.item, itemId: m.itemId, qty: 0, from: [] };
        need[k].qty += m.qty;
        need[k].from.push(`${st.name} L${next.level}`);
      });
    });
    return Object.values(need).sort((a, b) => a.item.localeCompare(b.item));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted]);

  const openItem = (itemId?: string) => { const it = itemId ? ITEMS.find((i) => i.id === itemId) : null; if (it) setSelectedItem(it); };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Wrench className="w-7 h-7" />}
        title="Workshop"
        subtitle="Every Speranza station, what each level costs, and what it unlocks. Mark your current levels and the shopping list tells you what to farm next."
        right={<div className="w-56"><ProgressBar value={doneLevels} max={totalLevels} color="bg-purple-400" label="Upgrades done" /></div>}
      />
      {!loading && !isAuthenticated && <SignInPrompt compact message="Sign in to save workshop progress." />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {WORKSHOP_STATIONS.map((st) => {
            const done = st.levels.filter((l) => isDone(st.id, l.level)).length;
            return (
              <div key={st.id} className="bg-arc-card border border-arc-border rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-arc-border flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <h2 className="font-display text-lg font-bold text-rust-300">{st.name}</h2>
                    <p className="text-xs text-gray-400">{st.description}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-400 whitespace-nowrap">L{done}/{st.levels.length}</span>
                </div>
                {st.produces && (
                  <div className="px-4 py-2 border-b border-arc-border/60 flex flex-wrap gap-1">
                    <span className="text-[11px] text-gray-500 mr-1">Produces:</span>
                    {st.produces.map((p) => <Tag key={p} className="text-signal-300 border-signal-500/40 bg-signal-500/10">{p}</Tag>)}
                  </div>
                )}
                <div className="divide-y divide-arc-border/60">
                  {st.levels.length === 0 && <p className="px-4 py-3 text-xs text-gray-500">Available from the start.</p>}
                  {st.levels.map((l) => {
                    const d = isDone(st.id, l.level);
                    return (
                      <div key={l.level} className={`px-4 py-3 flex gap-3 ${d ? 'bg-green-500/5' : ''}`}>
                        <button onClick={() => setLevel(st.id, l.level, !d)} className={`flex-shrink-0 mt-0.5 ${d ? 'text-green-400' : 'text-gray-600 hover:text-gray-300'}`} aria-label={`Toggle level ${l.level}`}>
                          {d ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-display font-semibold text-gray-100 text-sm">Level {l.level}{l.title ? ` · ${l.title}` : ''}</span>
                            {l.coins ? <span className="text-xs font-mono text-rust-300">{l.coins.toLocaleString()} coins</span> : null}
                            {!l.verified && <Unverified />}
                          </div>
                          {l.unlocks && <p className="text-xs text-gray-400 mt-0.5">{l.unlocks}</p>}
                          {l.materials.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {l.materials.map((m, i) => (
                                <button key={i} onClick={() => openItem(m.itemId)} className={`text-xs px-2 py-0.5 rounded border ${d ? 'border-arc-border/50 text-gray-500' : 'border-arc-border text-gray-200 hover:border-rust-400/60'}`}>
                                  {m.item} <span className="font-mono text-signal-300">x{m.qty}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="bg-arc-card border border-arc-border rounded-lg p-4 lg:sticky lg:top-4">
            <h3 className="flex items-center gap-2 font-display font-bold text-rust-300 mb-3"><ShoppingBasket className="w-4 h-4" />Farm next</h3>
            {shopping.length === 0 ? <p className="text-xs text-gray-500">All stations maxed. Go touch grass topside.</p> : (
              <ul className="space-y-1.5 max-h-[50vh] overflow-y-auto pr-1">
                {shopping.map((s) => (
                  <li key={s.item} className="text-sm">
                    <button onClick={() => openItem(s.itemId)} className="w-full flex items-center justify-between bg-arc-bg/50 rounded px-2 py-1 hover:bg-arc-card-hover text-left">
                      <span className="text-gray-200">{s.item}</span>
                      <span className="font-mono text-signal-300">x{s.qty}</span>
                    </button>
                    <p className="text-[10px] text-gray-600 px-2">{s.from.join(', ')}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-arc-card border border-arc-border rounded-lg p-4">
            <h3 className="flex items-center gap-2 font-display font-bold text-rust-300 mb-3"><ListOrdered className="w-4 h-4" />Recommended order</h3>
            <ol className="space-y-1.5 text-sm text-gray-300 list-decimal pl-5">
              {WORKSHOP_ORDER.map((o) => <li key={o}>{o}</li>)}
            </ol>
            <p className="text-[11px] text-gray-600 mt-3">Refiner Level 2 gates most other Level 2 upgrades. Level 3 costs need rare ARC drops (Sentinel Firing Cores, Bastion Cells, Bombardier Cells, Rocketeer Drivers).</p>
          </div>
        </div>
      </div>

      {selectedItem && <ItemDetail item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}
