'use client';

import { useMemo, useState } from 'react';
import { Store, Users } from 'lucide-react';
import { TRADERS, NPCS, ITEMS, QUESTS, RARITY_DOT } from '@/lib/game-data';
import PageHeader from '@/components/ui/PageHeader';
import SearchInput from '@/components/ui/SearchInput';
import Tag from '@/components/ui/Tag';
import ItemDetail from '@/components/items/ItemDetail';
import type { Item } from '@/types/game-data';

export default function TradersPage() {
  const [active, setActive] = useState(TRADERS[0]?.id ?? '');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Item | null>(null);
  const trader = TRADERS.find((t) => t.id === active) ?? TRADERS[0];
  const npc = NPCS.find((n) => n.name.toLowerCase() === trader?.name.toLowerCase());
  const questCount = QUESTS.filter((q) => q.giver === trader?.name).length;

  const stock = useMemo(() => {
    const lq = query.toLowerCase();
    return (trader?.stock ?? []).filter((s) => !lq || s.item.toLowerCase().includes(lq));
  }, [trader, query]);
  const byLevel = useMemo(() => {
    const g: Record<string, typeof stock> = {};
    stock.forEach((s) => { const k = s.level ? `Level ${s.level}` : 'Always available'; (g[k] ??= []).push(s); });
    return g;
  }, [stock]);

  return (
    <div className="space-y-6">
      <PageHeader icon={<Store className="w-7 h-7" />} title="Traders of Speranza" subtitle="Who sells what, at which Raider level, and for what currency. Stock is gated by your level, not reputation. Limited items refresh every 24 hours." />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {TRADERS.map((t) => (
          <button key={t.id} onClick={() => setActive(t.id)} className={`px-4 py-2 rounded-lg border font-display text-sm whitespace-nowrap transition-colors ${active === t.id ? 'bg-rust-500 text-black border-rust-400' : 'bg-arc-card text-gray-300 border-arc-border hover:border-rust-400/60'}`}>{t.name}</button>
        ))}
      </div>

      {trader && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="bg-arc-card border border-arc-border rounded-lg p-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rust-400 to-rust-700 flex items-center justify-center font-display text-2xl font-bold text-black mb-3">{trader.name[0]}</div>
              <h2 className="font-display text-2xl font-bold text-rust-300">{trader.name}</h2>
              <p className="text-sm text-signal-300 mt-1">{trader.role}</p>
              {npc?.personality && <p className="text-sm text-gray-400 mt-3 leading-relaxed">{npc.personality}</p>}
              {npc?.offers && <p className="text-xs text-gray-500 mt-2">{npc.offers}</p>}
              <div className="flex flex-wrap gap-1.5 mt-4">
                <Tag className="text-rust-300 border-rust-500/40 bg-rust-500/10">Currency: {trader.currency}</Tag>
                <Tag className="text-amber-300 border-amber-500/40 bg-amber-500/10">{questCount} quests</Tag>
                <Tag className="text-gray-300 border-gray-600/50 bg-gray-600/10">{trader.stock.length} stock lines</Tag>
              </div>
              {trader.unlockNote && <p className="text-[11px] text-gray-600 mt-3">{trader.unlockNote}</p>}
            </div>
            <div className="bg-arc-card border border-arc-border rounded-lg p-4">
              <h3 className="flex items-center gap-2 font-display font-bold text-rust-300 mb-2"><Users className="w-4 h-4" />Other faces</h3>
              <ul className="space-y-2">
                {NPCS.filter((n) => !TRADERS.some((t) => t.name.toLowerCase() === n.name.toLowerCase())).map((n) => (
                  <li key={n.id}><p className="text-sm font-semibold text-gray-100">{n.name}</p><p className="text-xs text-gray-400">{n.role}</p></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <SearchInput value={query} onChange={setQuery} placeholder={`Search ${trader.name}'s stock...`} className="md:w-72" />
            {Object.entries(byLevel).map(([lvl, rows]) => (
              <div key={lvl} className="bg-arc-card border border-arc-border rounded-lg overflow-hidden">
                <div className="px-4 py-2 border-b border-arc-border text-xs font-display uppercase tracking-wider text-signal-400">{lvl}</div>
                <table className="w-full text-sm">
                  <tbody>
                    {rows.map((s, i) => {
                      const item = ITEMS.find((it) => it.id === s.itemId);
                      return (
                        <tr key={i} className="border-t border-arc-border/50 hover:bg-arc-card-hover">
                          <td className="px-4 py-2">
                            <button onClick={() => item && setSelected(item)} className={`flex items-center gap-2 text-left ${item ? 'text-gray-100 hover:text-rust-300' : 'text-gray-300'}`}>
                              {item && <span className={`w-2 h-2 rounded-full ${RARITY_DOT[item.rarity]}`} />}
                              {s.item}
                            </button>
                          </td>
                          <td className="px-4 py-2 text-right font-mono text-rust-300 whitespace-nowrap">{s.price.toLocaleString()} {s.currency}</td>
                          <td className="px-4 py-2 text-right text-xs text-gray-500 whitespace-nowrap">{s.dailyLimit ? `${s.dailyLimit}/day` : ''}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
            {stock.length === 0 && <p className="text-sm text-gray-500">No stock matches.</p>}
          </div>
        </div>
      )}
      {selected && <ItemDetail item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
