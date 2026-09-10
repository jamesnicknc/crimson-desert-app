'use client';

import Link from 'next/link';
import { Gift, Hammer, Recycle, Store, MapPin, Package, KeyRound } from 'lucide-react';
import { ITEMS, RECIPES, RARITY_COLORS, RARITY_LABELS, ITEM_CATEGORY_LABELS } from '@/lib/game-data';
import Modal from '@/components/ui/Modal';
import Tag, { Unverified } from '@/components/ui/Tag';
import type { Item } from '@/types/game-data';

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-signal-400 mb-2">{icon}{title}</h3>
      {children}
    </div>
  );
}

export function IngredientList({ list }: { list: { item: string; itemId?: string; qty: number }[] }) {
  return (
    <ul className="space-y-1">
      {list.map((i, idx) => {
        const known = i.itemId && ITEMS.some((x) => x.id === i.itemId);
        return (
          <li key={idx} className="flex items-center justify-between text-sm bg-arc-bg/50 rounded px-2 py-1">
            {known ? (
              <Link href={`/items?q=${encodeURIComponent(i.item)}`} className="text-gray-200 hover:text-rust-300">{i.item}</Link>
            ) : (
              <span className="text-gray-200">{i.item}</span>
            )}
            <span className="font-mono text-signal-300">x{i.qty}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default function ItemDetail({ item, onClose }: { item: Item; onClose: () => void }) {
  const usedIn = RECIPES.filter((r) => r.ingredients.some((i) => i.itemId === item.id));
  return (
    <Modal onClose={onClose}>
      <div className="px-6 py-5 border-b border-arc-border">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <Tag className={RARITY_COLORS[item.rarity]}>{RARITY_LABELS[item.rarity]}</Tag>
          <Tag className="text-gray-300 border-gray-600/50 bg-gray-600/10">{ITEM_CATEGORY_LABELS[item.category]}</Tag>
          {item.subtype && <Tag className="text-gray-400 border-gray-600/40 bg-transparent">{item.subtype}</Tag>}
          {!item.verified && <Unverified />}
        </div>
        <h2 className="text-2xl font-display font-bold text-rust-300">{item.name}</h2>
        <p className="text-sm text-gray-300 mt-2 leading-relaxed">{item.description}</p>
        {item.effect && <p className="text-sm text-signal-300 mt-2">{item.effect}</p>}
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
          <span>Sell: <span className="text-rust-300 font-mono">{item.value.toLocaleString()} c</span></span>
          {item.weight !== undefined && <span>Weight: <span className="text-gray-200 font-mono">{item.weight} kg</span></span>}
          {item.stackSize !== undefined && <span>Stack: <span className="text-gray-200 font-mono">{item.stackSize}</span></span>}
          <span>Added: <span className="text-gray-200">{item.addedIn}</span></span>
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div className="space-y-5">
          {item.stats && (
            <Section icon={<Package className="w-4 h-4" />} title="Stats">
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(item.stats).filter(([, v]) => v !== undefined && v !== null && v !== '').map(([k, v]) => (
                  <div key={k} className="bg-arc-bg/50 rounded p-2"><p className="text-gray-500 text-xs">{k}</p><p className="text-gray-100 font-mono">{String(v)}</p></div>
                ))}
              </div>
            </Section>
          )}
          {item.opens && (
            <Section icon={<KeyRound className="w-4 h-4" />} title="Opens">
              <p className="text-gray-300">{item.opens}</p>
              {item.map && <p className="text-xs text-gray-500 mt-1">Map: {item.map}</p>}
            </Section>
          )}
          {item.recipe && item.recipe.length > 0 && (
            <Section icon={<Hammer className="w-4 h-4" />} title={`Recipe${item.craftStation ? ` (${item.craftStation}${item.craftStationLevel ? ` L${item.craftStationLevel}` : ''})` : ''}`}>
              <IngredientList list={item.recipe} />
              {item.blueprintRequired && <p className="text-xs text-amber-300 mt-2">Blueprint required</p>}
            </Section>
          )}
          {item.recyclesInto.length > 0 && (
            <Section icon={<Recycle className="w-4 h-4" />} title="Recycles into">
              <IngredientList list={item.recyclesInto} />
            </Section>
          )}
        </div>
        <div className="space-y-5">
          {item.soldBy.length > 0 && (
            <Section icon={<Store className="w-4 h-4" />} title="Sold by">
              <ul className="space-y-1">
                {item.soldBy.map((s, i) => (
                  <li key={i} className="flex items-center justify-between bg-arc-bg/50 rounded px-2 py-1">
                    <span className="text-gray-200">{s.trader}{s.level ? <span className="text-gray-500 text-xs"> (lvl {s.level})</span> : null}</span>
                    <span className="font-mono text-rust-300">{s.price.toLocaleString()} {s.currency}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
          {item.foundIn.length > 0 && (
            <Section icon={<MapPin className="w-4 h-4" />} title="Found in">
              <div className="flex flex-wrap gap-1.5">{item.foundIn.map((f) => <Tag key={f} className="text-blue-300 border-blue-500/40 bg-blue-500/10">{f}</Tag>)}</div>
            </Section>
          )}
          {(item.usedFor.length > 0 || usedIn.length > 0) && (
            <Section icon={<Gift className="w-4 h-4" />} title="Used for">
              <div className="flex flex-wrap gap-1.5">
                {[...new Set([...item.usedFor, ...usedIn.map((r) => r.name)])].map((u) => <Tag key={u} className="text-signal-300 border-signal-500/40 bg-signal-500/10">{u}</Tag>)}
              </div>
            </Section>
          )}
        </div>
      </div>
    </Modal>
  );
}
