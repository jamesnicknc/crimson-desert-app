'use client';

import { RARITY_COLORS, RARITY_DOT, RARITY_LABELS } from '@/lib/game-data';
import Tag from '@/components/ui/Tag';
import type { Item } from '@/types/game-data';

export default function ItemCard({ item, onClick }: { item: Item; onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-left bg-arc-card border border-arc-border rounded-lg p-3 hover:bg-arc-card-hover hover:border-rust-500/50 transition-colors">
      <div className="flex items-center gap-2 mb-1">
        <span className={`w-2 h-2 rounded-full ${RARITY_DOT[item.rarity]}`} />
        <h3 className="font-display font-semibold text-gray-100 text-sm truncate flex-1">{item.name}</h3>
        <span className="text-[11px] font-mono text-rust-300">{item.value.toLocaleString()}c</span>
      </div>
      <p className="text-xs text-gray-400 line-clamp-2 min-h-[2rem]">{item.effect || item.description}</p>
      <div className="flex flex-wrap gap-1 mt-2">
        <Tag className={RARITY_COLORS[item.rarity]}>{RARITY_LABELS[item.rarity]}</Tag>
        {item.subtype && <Tag className="text-gray-400 border-gray-600/40 bg-transparent">{item.subtype}</Tag>}
        {item.recipe && item.recipe.length > 0 && <Tag className="text-signal-300 border-signal-500/40 bg-signal-500/10">craftable</Tag>}
      </div>
    </button>
  );
}
