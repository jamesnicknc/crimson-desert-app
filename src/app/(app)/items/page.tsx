'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Package, Hammer } from 'lucide-react';
import { ITEMS, RECIPES, ITEM_CATEGORY_LABELS, RARITY_LABELS, RARITY_COLORS } from '@/lib/game-data';
import PageHeader from '@/components/ui/PageHeader';
import Chips from '@/components/ui/Chips';
import SearchInput from '@/components/ui/SearchInput';
import Tag from '@/components/ui/Tag';
import ItemCard from '@/components/items/ItemCard';
import ItemDetail from '@/components/items/ItemDetail';
import type { Item, ItemCategory, Rarity } from '@/types/game-data';

const CATS: ItemCategory[] = ['material', 'key', 'ammo', 'misc'];

function ItemsPageInner() {
  const params = useSearchParams();
  const [tab, setTab] = useState<'items' | 'recipes'>('items');
  const [cat, setCat] = useState<ItemCategory | 'all'>('all');
  const [sub, setSub] = useState<string | 'all'>('all');
  const [rarity, setRarity] = useState<Rarity | 'all'>('all');
  const [query, setQuery] = useState('');
  const [station, setStation] = useState<string | 'all'>('all');
  const [selected, setSelected] = useState<Item | null>(null);

  useEffect(() => {
    const q = params.get('q');
    if (q) {
      const match = ITEMS.find((i) => i.name.toLowerCase() === q.toLowerCase());
      if (match) setSelected(match); else setQuery(q);
    }
  }, [params]);

  const pool = useMemo(() => ITEMS.filter((i) => CATS.includes(i.category)), []);
  const subtypes = useMemo(() => [...new Set(pool.filter((i) => cat === 'all' || i.category === cat).map((i) => i.subtype).filter(Boolean))] as string[], [pool, cat]);
  const filtered = useMemo(() => {
    const lq = query.toLowerCase();
    const src = query ? ITEMS : pool;
    return src.filter((i) => (query || cat === 'all' || i.category === cat) && (sub === 'all' || i.subtype === sub) && (rarity === 'all' || i.rarity === rarity) && (!lq || i.name.toLowerCase().includes(lq)));
  }, [pool, cat, sub, rarity, query]);

  const stations = useMemo(() => [...new Set(RECIPES.map((r) => r.station))], []);
  const recipes = useMemo(() => {
    const lq = query.toLowerCase();
    return RECIPES.filter((r) => (station === 'all' || r.station === station) && (!lq || r.name.toLowerCase().includes(lq) || r.ingredients.some((i) => i.item.toLowerCase().includes(lq))));
  }, [station, query]);

  return (
    <div className="space-y-6">
      <PageHeader icon={<Package className="w-7 h-7" />} title="Items & Materials" subtitle="Every material, component, trinket, key and ammo type with sell values, recycle outputs, who sells it and what it is used for." />

      <div className="flex gap-2 border-b border-arc-border">
        {([['items', `Items (${pool.length})`], ['recipes', `Recipes (${RECIPES.length})`]] as const).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-display border-b-2 -mb-px transition-colors ${tab === t ? 'text-rust-300 border-rust-400' : 'text-gray-400 border-transparent hover:text-gray-200'}`}>{label}</button>
        ))}
      </div>

      <SearchInput value={query} onChange={setQuery} placeholder={tab === 'items' ? 'Search all items...' : 'Search recipes or ingredients...'} className="md:w-80" />

      {tab === 'items' ? (
        <>
          <div className="space-y-2">
            <Chips options={CATS.map((c) => ({ value: c, label: ITEM_CATEGORY_LABELS[c], count: pool.filter((i) => i.category === c).length }))} value={cat} onChange={(v) => { setCat(v); setSub('all'); }} />
            {subtypes.length > 1 && <Chips options={subtypes.map((s) => ({ value: s, label: s }))} value={sub} onChange={setSub} allLabel="All types" size="xs" />}
            <Chips options={(['common', 'uncommon', 'rare', 'epic', 'legendary'] as Rarity[]).map((r) => ({ value: r, label: RARITY_LABELS[r] }))} value={rarity} onChange={setRarity} allLabel="Any rarity" size="xs" />
          </div>
          <p className="text-xs text-gray-500">{filtered.length} items</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((i) => <ItemCard key={i.id} item={i} onClick={() => setSelected(i)} />)}
          </div>
        </>
      ) : (
        <>
          <Chips options={stations.map((s) => ({ value: s, label: s, count: RECIPES.filter((r) => r.station === s).length }))} value={station} onChange={setStation} />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {recipes.map((r) => {
              const result = ITEMS.find((i) => i.id === r.resultId);
              return (
                <div key={r.id} className="bg-arc-card border border-arc-border rounded-lg p-4">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Hammer className="w-4 h-4 text-signal-400" />
                    <h3 className="font-display font-bold text-gray-100">{r.name}{r.qty > 1 ? ` x${r.qty}` : ''}</h3>
                    {r.resultRarity && <Tag className={RARITY_COLORS[r.resultRarity]}>{RARITY_LABELS[r.resultRarity]}</Tag>}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{r.station}{r.stationLevel ? ` L${r.stationLevel}` : ''} · {r.category}{r.blueprintRequired ? ' · blueprint' : ''}</p>
                  <ul className="space-y-1">
                    {r.ingredients.map((i, idx) => (
                      <li key={idx} className="flex items-center justify-between text-sm bg-arc-bg/50 rounded px-2 py-1">
                        <button onClick={() => { const it = ITEMS.find((x) => x.id === i.itemId); if (it) setSelected(it); }} className="text-gray-200 hover:text-rust-300 text-left">{i.item}</button>
                        <span className="font-mono text-signal-300">x{i.qty}</span>
                      </li>
                    ))}
                  </ul>
                  {result && <button onClick={() => setSelected(result)} className="mt-2 text-xs text-signal-400 hover:text-signal-300">View {result.name}</button>}
                </div>
              );
            })}
          </div>
        </>
      )}

      {selected && <ItemDetail item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default function ItemsPage() {
  return (
    <Suspense fallback={<div className="text-gray-500 text-sm">Loading...</div>}>
      <ItemsPageInner />
    </Suspense>
  );
}
