'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Crosshair, Hammer, Layers, Wrench, Zap, Info } from 'lucide-react';
import {
  WEAPONS, ATTACHMENTS, AMMO_TYPES, WEAPON_CLASS_LABELS, AMMO_LABELS, AMMO_COLORS, RARITY_COLORS, RARITY_LABELS, TIER_COLORS,
} from '@/lib/game-data';
import { PROGRESS } from '@/lib/progress-keys';
import { useProgress } from '@/hooks/use-progress';
import PageHeader from '@/components/ui/PageHeader';
import Chips from '@/components/ui/Chips';
import SearchInput from '@/components/ui/SearchInput';
import Modal from '@/components/ui/Modal';
import Checkbox from '@/components/ui/Checkbox';
import Tag, { Unverified } from '@/components/ui/Tag';
import ProgressBar from '@/components/ui/ProgressBar';
import { IngredientList } from '@/components/items/ItemDetail';
import type { Weapon, WeaponClass, AmmoType } from '@/types/game-data';

const STAT_KEYS: { key: keyof Weapon['stats']; label: string; max: number }[] = [
  { key: 'damage', label: 'Damage', max: 120 },
  { key: 'fireRateStat', label: 'Fire rate', max: 100 },
  { key: 'range', label: 'Range', max: 100 },
  { key: 'stability', label: 'Stability', max: 100 },
  { key: 'agility', label: 'Agility', max: 100 },
  { key: 'stealth', label: 'Stealth', max: 100 },
];

function StatBar({ label, value, max }: { label: string; value?: number; max: number }) {
  if (value === undefined) return null;
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-16 text-gray-500">{label}</span>
      <div className="flex-1 h-1.5 bg-arc-bg rounded overflow-hidden"><div className="h-full bg-signal-400" style={{ width: `${pct}%` }} /></div>
      <span className="w-10 text-right font-mono text-gray-300">{value}</span>
    </div>
  );
}

function WeaponModal({ weapon, unlocked, onToggle, onClose }: { weapon: Weapon; unlocked: boolean; onToggle: () => void; onClose: () => void }) {
  const mods = Object.entries(weapon.modSlots);
  return (
    <Modal onClose={onClose} wide>
      <div className="px-6 py-5 border-b border-arc-border border-l-4 border-l-rust-500">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <Tag className={RARITY_COLORS[weapon.rarity]}>{RARITY_LABELS[weapon.rarity]}</Tag>
          <Tag className="text-gray-300 border-gray-600/50 bg-gray-600/10">{WEAPON_CLASS_LABELS[weapon.weaponClass]}</Tag>
          <Tag className={AMMO_COLORS[weapon.ammo]}>{AMMO_LABELS[weapon.ammo]}</Tag>
          {weapon.tier && <span className={`px-2 py-0.5 rounded text-xs font-display font-bold ${TIER_COLORS[weapon.tier]}`}>{weapon.tier} tier</span>}
          {!weapon.verified && <Unverified />}
        </div>
        <h2 className="text-2xl font-display font-bold text-rust-300">{weapon.name}</h2>
        <p className="text-sm text-gray-300 mt-2">{weapon.description}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
          {weapon.firingMode && <span>Mode: <span className="text-gray-200">{weapon.firingMode}</span></span>}
          {weapon.penetration && <span>ARC penetration: <span className="text-gray-200">{weapon.penetration}</span></span>}
          {weapon.weight !== undefined && <span>Weight: <span className="text-gray-200 font-mono">{weapon.weight} kg</span></span>}
          {weapon.stats.magazine !== undefined && <span>Mag: <span className="text-gray-200 font-mono">{weapon.stats.magazine}</span></span>}
          <span>Added: <span className="text-gray-200">{weapon.addedIn}</span></span>
        </div>
        <div className="mt-3"><Checkbox checked={unlocked} onChange={onToggle} label={unlocked ? 'In my arsenal' : 'Mark as unlocked / owned'} /></div>
      </div>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm">
        <div className="space-y-5">
          <div>
            <h3 className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-signal-400 mb-2"><Zap className="w-4 h-4" />Stats</h3>
            <div className="space-y-1.5">
              {STAT_KEYS.map((s) => <StatBar key={s.key} label={s.label} value={weapon.stats[s.key] as number | undefined} max={s.max} />)}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              {weapon.stats.headshot && <div className="bg-arc-bg/50 rounded p-2"><p className="text-gray-500">Headshot</p><p className="font-mono text-gray-100">{weapon.stats.headshot}</p></div>}
              {weapon.stats.fireRate && <div className="bg-arc-bg/50 rounded p-2"><p className="text-gray-500">RPM</p><p className="font-mono text-gray-100">{weapon.stats.fireRate}</p></div>}
              {weapon.stats.reload && <div className="bg-arc-bg/50 rounded p-2"><p className="text-gray-500">Reload</p><p className="font-mono text-gray-100">{weapon.stats.reload}s</p></div>}
            </div>
            {weapon.specialTrait && <p className="text-xs text-amber-300 mt-2">{weapon.specialTrait}</p>}
          </div>
          {weapon.tips && (
            <div>
              <h3 className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-signal-400 mb-2"><Info className="w-4 h-4" />Playstyle</h3>
              <p className="text-gray-300 leading-relaxed">{weapon.tips}</p>
              {weapon.tierNote && <p className="text-xs text-gray-500 mt-2">Community tier: {weapon.tierNote}</p>}
            </div>
          )}
        </div>
        <div className="space-y-5">
          <div>
            <h3 className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-signal-400 mb-2"><Hammer className="w-4 h-4" />How to get it</h3>
            <p className="text-gray-300">{weapon.source}</p>
            {weapon.recipe && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Base recipe{weapon.benchLevel ? ` (Gunsmith L${weapon.benchLevel})` : ''}</p>
                <IngredientList list={weapon.recipe} />
              </div>
            )}
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-signal-400 mb-2"><Layers className="w-4 h-4" />Upgrade tiers</h3>
            <div className="space-y-2">
              {weapon.tiers.map((t) => (
                <div key={t.tier} className="bg-arc-bg/50 rounded p-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-gray-100">{t.name}</span>
                    {t.sellValue !== undefined && <span className="text-xs font-mono text-rust-300">{t.sellValue.toLocaleString()}c</span>}
                  </div>
                  {t.bonuses.length > 0 && <p className="text-xs text-signal-300 mt-1">{t.bonuses.join(', ')}</p>}
                  {t.upgradeCost && <p className="text-xs text-gray-400 mt-1">Cost: {t.upgradeCost.map((c) => `${c.item} x${c.qty}`).join(', ')}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3 className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-signal-400 mb-2"><Wrench className="w-4 h-4" />Mod slots</h3>
          {mods.length === 0 ? <p className="text-gray-500 text-xs">No attachment slots.</p> : (
            <div className="space-y-3">
              {mods.map(([slot, list]) => (
                <div key={slot}>
                  <p className="text-xs text-gray-400 font-display uppercase mb-1">{slot}</p>
                  <div className="flex flex-wrap gap-1">{list.map((m) => <Tag key={m} className="text-gray-300 border-arc-border bg-arc-bg/50">{m}</Tag>)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

type SortKey = 'name' | 'damage' | 'rarity' | 'tier';

function WeaponsPageInner() {
  const params = useSearchParams();
  const [tab, setTab] = useState<'weapons' | 'attachments' | 'ammo'>('weapons');
  const [query, setQuery] = useState('');
  const [cls, setCls] = useState<WeaponClass | 'all'>('all');
  const [ammo, setAmmo] = useState<AmmoType | 'all'>('all');
  const [sort, setSort] = useState<SortKey>('name');
  const [selected, setSelected] = useState<Weapon | null>(null);
  const [compare, setCompare] = useState<string[]>([]);
  const { isCompleted, toggle } = useProgress();

  useEffect(() => {
    const q = params.get('q');
    if (q) {
      const match = WEAPONS.find((w) => w.name.toLowerCase() === q.toLowerCase());
      if (match) setSelected(match); else setQuery(q);
    }
  }, [params]);

  const filtered = useMemo(() => {
    const lq = query.toLowerCase();
    const list = WEAPONS.filter((w) => (cls === 'all' || w.weaponClass === cls) && (ammo === 'all' || w.ammo === ammo) && (!lq || w.name.toLowerCase().includes(lq)));
    const rarityRank = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 };
    const tierRank = { S: 0, A: 1, B: 2, C: 3, D: 4 };
    return [...list].sort((a, b) => {
      if (sort === 'damage') return (b.stats.damage ?? 0) - (a.stats.damage ?? 0);
      if (sort === 'rarity') return rarityRank[b.rarity] - rarityRank[a.rarity];
      if (sort === 'tier') return (a.tier ? tierRank[a.tier] : 9) - (b.tier ? tierRank[b.tier] : 9);
      return a.name.localeCompare(b.name);
    });
  }, [query, cls, ammo, sort]);

  const classOptions = (Object.keys(WEAPON_CLASS_LABELS) as WeaponClass[]).filter((c) => WEAPONS.some((w) => w.weaponClass === c)).map((c) => ({ value: c, label: WEAPON_CLASS_LABELS[c], count: WEAPONS.filter((w) => w.weaponClass === c).length }));
  const ammoOptions = (Object.keys(AMMO_LABELS) as AmmoType[]).map((a) => ({ value: a, label: AMMO_LABELS[a] }));
  const unlocked = WEAPONS.filter((w) => isCompleted(PROGRESS.weapon, w.id)).length;
  const compared = compare.map((id) => WEAPONS.find((w) => w.id === id)!).filter(Boolean);

  const toggleCompare = (id: string) => setCompare((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : prev.length >= 3 ? prev : [...prev, id]));

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Crosshair className="w-7 h-7" />}
        title="Weapons"
        subtitle="The full arsenal with stats, recipes, upgrade tiers, mod slots and community tier placements. Tick the guns you own or have unlocked."
        right={<div className="w-56"><ProgressBar value={unlocked} max={WEAPONS.length} label="Arsenal" /></div>}
      />

      <div className="flex gap-2 border-b border-arc-border overflow-x-auto">
        {([['weapons', `Weapons (${WEAPONS.length})`], ['attachments', `Attachments (${ATTACHMENTS.length})`], ['ammo', 'Ammo']] as const).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-display border-b-2 -mb-px whitespace-nowrap transition-colors ${tab === t ? 'text-rust-300 border-rust-400' : 'text-gray-400 border-transparent hover:text-gray-200'}`}>{label}</button>
        ))}
      </div>

      {tab === 'weapons' && (
        <>
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <SearchInput value={query} onChange={setQuery} placeholder="Search weapons..." className="md:w-64" />
              <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="bg-arc-card border border-arc-border rounded-lg px-3 py-2 text-sm text-gray-200">
                <option value="name">Sort: Name</option>
                <option value="damage">Sort: Damage</option>
                <option value="rarity">Sort: Rarity</option>
                <option value="tier">Sort: Community tier</option>
              </select>
            </div>
            <Chips options={classOptions} value={cls} onChange={setCls} />
            <Chips options={ammoOptions} value={ammo} onChange={setAmmo} allLabel="Any ammo" size="xs" />
          </div>

          {compared.length > 0 && (
            <div className="bg-arc-secondary border border-signal-500/40 rounded-lg p-4 overflow-x-auto">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-signal-300">Compare ({compared.length}/3)</h3>
                <button onClick={() => setCompare([])} className="text-xs text-gray-400 hover:text-gray-200">Clear</button>
              </div>
              <table className="w-full text-xs min-w-[480px]">
                <thead><tr className="text-gray-500 text-left"><th className="py-1 pr-3">Stat</th>{compared.map((w) => <th key={w.id} className="py-1 pr-3 text-gray-100 font-display">{w.name}</th>)}</tr></thead>
                <tbody>
                  {[['Class', (w: Weapon) => WEAPON_CLASS_LABELS[w.weaponClass]], ['Ammo', (w: Weapon) => AMMO_LABELS[w.ammo]], ['Damage', (w: Weapon) => w.stats.damage ?? '-'], ['Headshot', (w: Weapon) => w.stats.headshot ?? '-'], ['Fire rate', (w: Weapon) => w.stats.fireRate ?? w.stats.fireRateStat ?? '-'], ['Range', (w: Weapon) => w.stats.range ?? '-'], ['Stability', (w: Weapon) => w.stats.stability ?? '-'], ['Agility', (w: Weapon) => w.stats.agility ?? '-'], ['Magazine', (w: Weapon) => w.stats.magazine ?? '-'], ['Weight', (w: Weapon) => (w.weight !== undefined ? `${w.weight} kg` : '-')], ['Penetration', (w: Weapon) => w.penetration ?? '-'], ['Tier', (w: Weapon) => w.tier ?? '-']].map(([label, fn]) => (
                    <tr key={label as string} className="border-t border-arc-border/60"><td className="py-1 pr-3 text-gray-400">{label as string}</td>{compared.map((w) => <td key={w.id} className="py-1 pr-3 font-mono text-gray-200">{String((fn as (w: Weapon) => unknown)(w))}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((w) => {
              const owned = isCompleted(PROGRESS.weapon, w.id);
              const inCompare = compare.includes(w.id);
              return (
                <div key={w.id} className={`bg-arc-card border rounded-lg p-4 hover:bg-arc-card-hover transition-colors ${owned ? 'border-green-500/40' : 'border-arc-border hover:border-rust-500/50'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <button onClick={() => setSelected(w)} className="text-left flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Tag className={RARITY_COLORS[w.rarity]}>{RARITY_LABELS[w.rarity]}</Tag>
                        <Tag className={AMMO_COLORS[w.ammo]}>{AMMO_LABELS[w.ammo].replace(' Ammo', '')}</Tag>
                        {w.tier && <span className={`px-1.5 py-0.5 rounded text-[10px] font-display font-bold ${TIER_COLORS[w.tier]}`}>{w.tier}</span>}
                      </div>
                      <h3 className="font-display font-bold text-lg text-gray-100">{w.name}</h3>
                      <p className="text-xs text-gray-500">{WEAPON_CLASS_LABELS[w.weaponClass]}{w.firingMode ? ` · ${w.firingMode}` : ''}</p>
                    </button>
                    <Checkbox checked={owned} onChange={() => toggle(PROGRESS.weapon, w.id)} size="sm" />
                  </div>
                  <button onClick={() => setSelected(w)} className="w-full text-left mt-3 space-y-1">
                    <StatBar label="Damage" value={w.stats.damage} max={120} />
                    <StatBar label="Range" value={w.stats.range} max={100} />
                    <StatBar label="Stability" value={w.stats.stability} max={100} />
                  </button>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">{w.blueprintLocked ? 'Blueprint' : `Gunsmith L${w.benchLevel ?? 1}`}{w.traderPrice ? ` · ${w.traderPrice.coins.toLocaleString()}c` : ''}</span>
                    <button onClick={() => toggleCompare(w.id)} className={`text-xs px-2 py-0.5 rounded border ${inCompare ? 'bg-signal-500 text-black border-signal-400' : 'border-arc-border text-gray-400 hover:text-signal-300'}`}>{inCompare ? 'Comparing' : 'Compare'}</button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {tab === 'attachments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {ATTACHMENTS.map((a) => (
            <div key={a.id} className="bg-arc-card border border-arc-border rounded-lg p-4">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                {a.rarity && <Tag className={RARITY_COLORS[a.rarity]}>{RARITY_LABELS[a.rarity]}</Tag>}
                <Tag className="text-gray-300 border-gray-600/50 bg-gray-600/10">{a.slot}</Tag>
              </div>
              <h3 className="font-display font-bold text-gray-100">{a.name}</h3>
              <p className="text-sm text-signal-300 mt-1">{a.effect}</p>
              {a.recipe && <p className="text-xs text-gray-400 mt-2">Recipe: {a.recipe.map((r) => `${r.item} x${r.qty}`).join(', ')}</p>}
              {a.source && <p className="text-xs text-gray-500 mt-1">{a.source}</p>}
              <details className="mt-2">
                <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-200">Compatible weapons ({a.compatible.length})</summary>
                <div className="flex flex-wrap gap-1 mt-1">{a.compatible.map((c) => <Tag key={c} className="text-gray-300 border-arc-border bg-arc-bg/50">{c}</Tag>)}</div>
              </details>
            </div>
          ))}
        </div>
      )}

      {tab === 'ammo' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AMMO_TYPES.map((a) => (
            <div key={a.id} className="bg-arc-card border border-arc-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2"><Tag className={AMMO_COLORS[a.id]}>{a.name}</Tag>{a.rarity && <Tag className={RARITY_COLORS[a.rarity]}>{RARITY_LABELS[a.rarity]}</Tag>}</div>
              <p className="text-sm text-gray-300">{a.description}</p>
              {a.recipe && <p className="text-xs text-gray-400 mt-2">Recipe: {a.recipe.map((r) => `${r.item} x${r.qty}`).join(', ')}</p>}
              {a.price && <p className="text-xs text-gray-500 mt-1">Buy: {a.price}</p>}
              <div className="flex flex-wrap gap-1 mt-2">{a.compatible.map((c) => <Tag key={c} className="text-gray-300 border-arc-border bg-arc-bg/50">{c}</Tag>)}</div>
            </div>
          ))}
        </div>
      )}

      {selected && <WeaponModal weapon={selected} unlocked={isCompleted(PROGRESS.weapon, selected.id)} onToggle={() => toggle(PROGRESS.weapon, selected.id)} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default function WeaponsPage() {
  return (
    <Suspense fallback={<div className="text-gray-500 text-sm">Loading...</div>}>
      <WeaponsPageInner />
    </Suspense>
  );
}
