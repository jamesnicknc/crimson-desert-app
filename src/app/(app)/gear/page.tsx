'use client';

import { useMemo, useState } from 'react';
import { Shield } from 'lucide-react';
import { ITEMS, ITEM_CATEGORY_LABELS, RARITY_LABELS } from '@/lib/game-data';
import PageHeader from '@/components/ui/PageHeader';
import Chips from '@/components/ui/Chips';
import SearchInput from '@/components/ui/SearchInput';
import ItemCard from '@/components/items/ItemCard';
import ItemDetail from '@/components/items/ItemDetail';
import type { Item, ItemCategory, Rarity } from '@/types/game-data';

const CATS: ItemCategory[] = ['shield', 'augment', 'gadget', 'consumable'];

export default function GearPage() {
  const [cat, setCat] = useState<ItemCategory | 'all'>('all');
  const [rarity, setRarity] = useState<Rarity | 'all'>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Item | null>(null);

  const gear = useMemo(() => ITEMS.filter((i) => CATS.includes(i.category)), []);
  const filtered = useMemo(() => {
    const lq = query.toLowerCase();
    return gear.filter((i) => (cat === 'all' || i.category === cat) && (rarity === 'all' || i.rarity === rarity) && (!lq || i.name.toLowerCase().includes(lq) || (i.effect ?? '').toLowerCase().includes(lq)));
  }, [gear, cat, rarity, query]);

  const grouped = useMemo(() => {
    const g: Record<string, Item[]> = {};
    filtered.forEach((i) => { (g[i.category] ??= []).push(i); });
    return g;
  }, [filtered]);

  return (
    <div className="space-y-6">
      <PageHeader icon={<Shield className="w-7 h-7" />} title="Gear & Gadgets" subtitle="Shields, augments, throwables, deployables and healing. Everything that goes in your loadout slots besides the guns." />
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <SearchInput value={query} onChange={setQuery} placeholder="Search gear..." className="md:w-64" />
          <Chips options={(['common', 'uncommon', 'rare', 'epic', 'legendary'] as Rarity[]).map((r) => ({ value: r, label: RARITY_LABELS[r] }))} value={rarity} onChange={setRarity} allLabel="Any rarity" size="xs" />
        </div>
        <Chips options={CATS.map((c) => ({ value: c, label: ITEM_CATEGORY_LABELS[c], count: gear.filter((i) => i.category === c).length }))} value={cat} onChange={setCat} />
      </div>
      {CATS.filter((c) => grouped[c]?.length).map((c) => (
        <section key={c}>
          <h2 className="font-display text-xl font-bold text-rust-300 mb-3">{ITEM_CATEGORY_LABELS[c]} <span className="text-sm text-gray-500">({grouped[c].length})</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {grouped[c].map((i) => <ItemCard key={i.id} item={i} onClick={() => setSelected(i)} />)}
          </div>
        </section>
      ))}
      {filtered.length === 0 && <p className="text-gray-500 text-sm">Nothing matches.</p>}
      {selected && <ItemDetail item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
