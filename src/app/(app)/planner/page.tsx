'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Layers, Save, Trash2, Crosshair, Shield, Backpack, Zap, GitBranch, Scale, Coins } from 'lucide-react';
import { WEAPONS, ITEMS, SKILLS, SKILL_BRANCHES, WEAPON_CLASS_LABELS, AMMO_LABELS, RARITY_DOT } from '@/lib/game-data';
import { LOADOUT_ROLES, resolveLoadout, type LoadoutRole, type LoadoutRow } from '@/lib/loadout';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/hooks/use-user';
import PageHeader from '@/components/ui/PageHeader';
import SignInPrompt from '@/components/SignInPrompt';
import Tag from '@/components/ui/Tag';
import Chips from '@/components/ui/Chips';
import SearchInput from '@/components/ui/SearchInput';
import type { WeaponClass } from '@/types/game-data';

const MAX_QUICK = 6;
const MAX_SKILLS = 12;

function Picker<T extends { id: string; name: string }>({ title, icon, items, value, onChange, render, searchable = true }: {
  title: string; icon: React.ReactNode; items: T[]; value: string | null; onChange: (id: string | null) => void; render: (t: T) => React.ReactNode; searchable?: boolean;
}) {
  const [q, setQ] = useState('');
  const list = items.filter((i) => !q || i.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="bg-arc-card border border-arc-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="flex items-center gap-2 font-display font-bold text-rust-300">{icon}{title}</h3>
        {value && <button onClick={() => onChange(null)} className="text-xs text-gray-500 hover:text-red-300">Clear</button>}
      </div>
      {searchable && <SearchInput value={q} onChange={setQ} placeholder="Filter..." className="mb-2" />}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-64 overflow-y-auto pr-1">
        {list.map((i) => (
          <button key={i.id} onClick={() => onChange(value === i.id ? null : i.id)} className={`text-left px-2.5 py-1.5 rounded border text-sm transition-colors ${value === i.id ? 'border-signal-400 bg-signal-500/10 text-signal-200' : 'border-arc-border bg-arc-bg/40 text-gray-300 hover:border-rust-400/60'}`}>
            {render(i)}
          </button>
        ))}
      </div>
    </div>
  );
}

function PlannerPageInner() {
  const params = useSearchParams();
  const [supabase] = useState(() => createClient());
  const { user } = useUser();
  const [role, setRole] = useState<LoadoutRole>('scout');
  const [primary, setPrimary] = useState<string | null>(null);
  const [secondary, setSecondary] = useState<string | null>(null);
  const [shield, setShield] = useState<string | null>(null);
  const [augment, setAugment] = useState<string | null>(null);
  const [quick, setQuick] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [mine, setMine] = useState<LoadoutRow[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [weaponClass, setWeaponClass] = useState<WeaponClass | 'all'>('all');
  const [quickTab, setQuickTab] = useState<'gadget' | 'consumable'>('consumable');

  const shields = useMemo(() => ITEMS.filter((i) => i.category === 'shield'), []);
  const augments = useMemo(() => ITEMS.filter((i) => i.category === 'augment'), []);
  const quickItems = useMemo(() => ITEMS.filter((i) => i.category === quickTab), [quickTab]);
  const weaponPool = useMemo(() => WEAPONS.filter((w) => weaponClass === 'all' || w.weaponClass === weaponClass), [weaponClass]);

  const loadMine = async (uid: string) => {
    const { data } = await supabase.from('builds').select('*').eq('user_id', uid).order('created_at', { ascending: false });
    setMine((data as LoadoutRow[]) ?? []);
  };
  useEffect(() => { if (user) loadMine(user.id); }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadRow = (row: LoadoutRow) => {
    setEditingId(row.id);
    setName(row.name);
    setRole((LOADOUT_ROLES.find((r) => r.id === row.character)?.id ?? 'scout') as LoadoutRole);
    setPrimary(row.weapons?.[0] ?? null);
    setSecondary(row.weapons?.[1] ?? null);
    const gearItems = (row.gears ?? []).map((id) => ITEMS.find((i) => i.id === id)).filter(Boolean);
    setShield(gearItems.find((g) => g!.category === 'shield')?.id ?? null);
    setAugment(gearItems.find((g) => g!.category === 'augment')?.id ?? null);
    setQuick(gearItems.filter((g) => g!.category !== 'shield' && g!.category !== 'augment').map((g) => g!.id));
    setSkills(row.skills ?? []);
    setNotes(row.notes ?? '');
    setIsPublic(row.is_public);
  };

  useEffect(() => {
    const load = params.get('load');
    if (load && mine.length) { const row = mine.find((r) => r.id === load); if (row) loadRow(row); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, mine]);

  const resolved = resolveLoadout({ weapons: [primary, secondary].filter(Boolean) as string[], gears: [shield, augment, ...quick].filter(Boolean) as string[], skills });
  const augmentItem = augment ? ITEMS.find((i) => i.id === augment) : undefined;
  const weightLimit = augmentItem?.stats?.['Weight limit'] ? parseFloat(String(augmentItem.stats['Weight limit'])) : undefined;
  const shieldItem = shield ? ITEMS.find((i) => i.id === shield) : undefined;
  const shieldCompat = augmentItem?.stats?.['Shields'] ? String(augmentItem.stats['Shields']) : '';
  const shieldWarning = shieldItem && shieldCompat && !shieldCompat.toLowerCase().includes(shieldItem.name.split(' ')[0].toLowerCase());

  const toggleQuick = (id: string) => setQuick((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length >= MAX_QUICK ? p : [...p, id]));
  const toggleSkill = (id: string) => setSkills((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length >= MAX_SKILLS ? p : [...p, id]));

  const reset = () => { setEditingId(null); setName(''); setPrimary(null); setSecondary(null); setShield(null); setAugment(null); setQuick([]); setSkills([]); setNotes(''); setIsPublic(false); setStatus(null); };

  const save = async () => {
    if (!user) { setStatus({ type: 'error', text: 'Sign in to save loadouts.' }); return; }
    if (!name.trim()) { setStatus({ type: 'error', text: 'Give the loadout a name.' }); return; }
    setSaving(true); setStatus(null);
    await supabase.from('profiles').upsert({ id: user.id }, { onConflict: 'id', ignoreDuplicates: true });
    const payload = { user_id: user.id, name: name.trim(), character: role, weapons: [primary, secondary].filter(Boolean), gears: [shield, augment, ...quick].filter(Boolean), skills, notes: notes || null, is_public: isPublic, updated_at: new Date().toISOString() };
    const { error } = editingId
      ? await supabase.from('builds').update(payload).eq('id', editingId).eq('user_id', user.id)
      : await supabase.from('builds').insert(payload);
    setSaving(false);
    if (error) { setStatus({ type: 'error', text: `Save failed: ${error.message}` }); return; }
    setStatus({ type: 'success', text: editingId ? 'Loadout updated.' : 'Loadout saved.' });
    await loadMine(user.id);
    if (!editingId) reset();
  };

  const remove = async (id: string) => {
    if (!user) return;
    await supabase.from('build_ratings').delete().eq('build_id', id);
    await supabase.from('builds').delete().eq('id', id).eq('user_id', user.id);
    if (editingId === id) reset();
    await loadMine(user.id);
  };

  return (
    <div className="space-y-6">
      <PageHeader icon={<Layers className="w-7 h-7" />} title="Loadout Planner" subtitle="Kit up before you deploy. Pick weapons, shield, augment, quick-use items and key skills, see the weight and coin cost, then save and share with your squad." />
      {!user && <SignInPrompt compact message="You can plan as a guest. Sign in to save loadouts and share them." />}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-arc-card border border-arc-border rounded-lg p-4">
            <h3 className="font-display font-bold text-rust-300 mb-2">Role</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LOADOUT_ROLES.map((r) => (
                <button key={r.id} onClick={() => setRole(r.id)} className={`text-left p-2.5 rounded-lg border transition-colors ${role === r.id ? 'border-rust-400 bg-rust-500/10' : 'border-arc-border bg-arc-bg/40 hover:border-rust-400/50'}`}>
                  <p className="font-display font-semibold text-sm text-gray-100">{r.label}</p>
                  <p className="text-[11px] text-gray-500">{r.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-arc-card border border-arc-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <h3 className="flex items-center gap-2 font-display font-bold text-rust-300"><Crosshair className="w-4 h-4" />Weapons</h3>
              <Chips options={(Object.keys(WEAPON_CLASS_LABELS) as WeaponClass[]).filter((c) => WEAPONS.some((w) => w.weaponClass === c)).map((c) => ({ value: c, label: WEAPON_CLASS_LABELS[c] }))} value={weaponClass} onChange={setWeaponClass} size="xs" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {([['Primary', primary, setPrimary], ['Secondary', secondary, setSecondary]] as const).map(([label, val, set]) => (
                <Picker key={label} title={label} icon={<span />} items={weaponPool} value={val} onChange={set} searchable={false} render={(w) => (
                  <span className="flex items-center justify-between gap-2"><span className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${RARITY_DOT[w.rarity]}`} />{w.name}</span><span className="text-[10px] text-gray-500">{AMMO_LABELS[w.ammo].replace(' Ammo', '')}</span></span>
                )} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Picker title="Shield" icon={<Shield className="w-4 h-4" />} items={shields} value={shield} onChange={setShield} searchable={false} render={(i) => <span className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${RARITY_DOT[i.rarity]}`} />{i.name}</span>} />
            <Picker title="Augment" icon={<Backpack className="w-4 h-4" />} items={augments} value={augment} onChange={setAugment} searchable={false} render={(i) => <span className="flex items-center justify-between gap-2"><span className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${RARITY_DOT[i.rarity]}`} />{i.name}</span><span className="text-[10px] text-gray-500">{i.stats?.['Weight limit'] ?? ''}</span></span>} />
          </div>
          {shieldWarning && <p className="text-xs text-amber-300">Heads up: {augmentItem?.name} lists compatible shields as {shieldCompat}. {shieldItem?.name} may not fit.</p>}

          <div className="bg-arc-card border border-arc-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <h3 className="flex items-center gap-2 font-display font-bold text-rust-300"><Zap className="w-4 h-4" />Quick-use ({quick.length}/{MAX_QUICK})</h3>
              <Chips options={[{ value: 'consumable', label: 'Healing & consumables' }, { value: 'gadget', label: 'Gadgets & throwables' }]} value={quickTab} onChange={(v) => v !== 'all' && setQuickTab(v)} allLabel={null} size="xs" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 max-h-64 overflow-y-auto pr-1">
              {quickItems.map((i) => {
                const on = quick.includes(i.id);
                return (
                  <button key={i.id} onClick={() => toggleQuick(i.id)} className={`text-left px-2.5 py-1.5 rounded border text-sm transition-colors ${on ? 'border-signal-400 bg-signal-500/10 text-signal-200' : 'border-arc-border bg-arc-bg/40 text-gray-300 hover:border-rust-400/60'}`}>
                    <span className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${RARITY_DOT[i.rarity]}`} />{i.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-arc-card border border-arc-border rounded-lg p-4">
            <h3 className="flex items-center gap-2 font-display font-bold text-rust-300 mb-2"><GitBranch className="w-4 h-4" />Key skills ({skills.length}/{MAX_SKILLS})</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {SKILL_BRANCHES.map((b) => (
                <div key={b.id}>
                  <p className="text-xs font-display uppercase tracking-wider mb-1" style={{ color: b.color }}>{b.name}</p>
                  <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                    {SKILLS.filter((s) => s.branch === b.id).map((s) => {
                      const on = skills.includes(s.id);
                      return <button key={s.id} onClick={() => toggleSkill(s.id)} className={`w-full text-left px-2 py-1 rounded border text-xs transition-colors ${on ? 'border-signal-400 bg-signal-500/10 text-signal-200' : 'border-arc-border bg-arc-bg/40 text-gray-300 hover:border-rust-400/60'}`}>{s.name}</button>;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="bg-arc-card border border-arc-border rounded-lg p-4 xl:sticky xl:top-4">
            <h3 className="font-display font-bold text-rust-300 mb-3">{editingId ? 'Editing loadout' : 'Loadout summary'}</h3>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Loadout name" className="w-full mb-2 px-3 py-2 bg-arc-bg border border-arc-border rounded-lg text-sm text-gray-100 placeholder-gray-500 focus:border-rust-400 focus:outline-none" />
            <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
              <div className="bg-arc-bg/50 rounded p-2"><p className="text-gray-500 flex items-center gap-1"><Scale className="w-3 h-3" />Weight</p><p className={`font-mono ${weightLimit && resolved.weight > weightLimit ? 'text-red-300' : 'text-gray-100'}`}>{resolved.weight.toFixed(1)} kg{weightLimit ? ` / ${weightLimit}` : ''}</p></div>
              <div className="bg-arc-bg/50 rounded p-2"><p className="text-gray-500 flex items-center gap-1"><Coins className="w-3 h-3" />Approx. value</p><p className="font-mono text-rust-300">{resolved.value.toLocaleString()} c</p></div>
            </div>
            <ul className="text-sm space-y-1.5 mb-3">
              <li className="flex justify-between"><span className="text-gray-500">Primary</span><span className="text-gray-100">{resolved.weapons[0]?.name ?? '-'}</span></li>
              <li className="flex justify-between"><span className="text-gray-500">Secondary</span><span className="text-gray-100">{resolved.weapons[1]?.name ?? '-'}</span></li>
              <li className="flex justify-between"><span className="text-gray-500">Shield</span><span className="text-gray-100">{resolved.shield?.name ?? '-'}</span></li>
              <li className="flex justify-between"><span className="text-gray-500">Augment</span><span className="text-gray-100">{resolved.augment?.name ?? '-'}</span></li>
            </ul>
            {resolved.ammo.length > 0 && <div className="flex flex-wrap gap-1 mb-2">{resolved.ammo.map((a) => <Tag key={a} className="text-amber-300 border-amber-500/40 bg-amber-500/10">{a}</Tag>)}</div>}
            {resolved.quickUse.length > 0 && <div className="flex flex-wrap gap-1 mb-3">{resolved.quickUse.map((q) => <Tag key={q.id} className="text-gray-300 border-arc-border bg-arc-bg/50">{q.name}</Tag>)}</div>}
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes for your squad..." rows={3} className="w-full mb-2 px-3 py-2 bg-arc-bg border border-arc-border rounded-lg text-sm text-gray-100 placeholder-gray-500 focus:border-rust-400 focus:outline-none resize-none" />
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-3"><input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="accent-rust-400" />Share publicly</label>
            {status && <p className={`text-xs mb-2 ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{status.text}</p>}
            <div className="flex gap-2">
              <button onClick={save} disabled={saving} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-rust-500 hover:bg-rust-400 text-black font-display font-semibold rounded-lg disabled:opacity-50"><Save className="w-4 h-4" />{saving ? 'Saving...' : editingId ? 'Update' : 'Save loadout'}</button>
              {editingId && <button onClick={reset} className="px-3 py-2 border border-arc-border rounded-lg text-sm text-gray-300 hover:text-rust-300">New</button>}
            </div>
          </div>

          {user && (
            <div className="bg-arc-card border border-arc-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2"><h3 className="font-display font-bold text-rust-300">My loadouts</h3><Link href="/builds" className="text-xs text-signal-400 hover:text-signal-300">Browse shared</Link></div>
              {mine.length === 0 ? <p className="text-xs text-gray-500">Nothing saved yet.</p> : (
                <ul className="space-y-1.5">
                  {mine.map((row) => (
                    <li key={row.id} className="flex items-center gap-2 bg-arc-bg/50 rounded px-2 py-1.5">
                      <button onClick={() => loadRow(row)} className="flex-1 text-left text-sm text-gray-200 hover:text-rust-300 truncate">{row.name} <span className="text-[10px] text-gray-500">{row.character}</span></button>
                      <button onClick={() => remove(row.id)} className="text-gray-600 hover:text-red-400" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PlannerPage() {
  return (
    <Suspense fallback={<div className="text-gray-500 text-sm">Loading...</div>}>
      <PlannerPageInner />
    </Suspense>
  );
}
