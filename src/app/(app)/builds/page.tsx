'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Share2, Star, Trash2, Eye, EyeOff, Pencil } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/hooks/use-user';
import { LOADOUT_ROLES, resolveLoadout, roleColor, roleLabel, type LoadoutRow } from '@/lib/loadout';
import PageHeader from '@/components/ui/PageHeader';
import Chips from '@/components/ui/Chips';
import SearchInput from '@/components/ui/SearchInput';
import Modal from '@/components/ui/Modal';
import Tag from '@/components/ui/Tag';
import SignInPrompt from '@/components/SignInPrompt';

type TabKey = 'top-rated' | 'my-builds' | 'group-builds';

function Stars({ avg, mine, onRate }: { avg: number; mine?: number; onRate?: (r: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((s) => {
        const filled = hover ? s <= hover : mine ? s <= mine : s <= Math.round(avg);
        return (
          <button key={s} type="button" disabled={!onRate} onMouseEnter={() => onRate && setHover(s)} onClick={(e) => { e.stopPropagation(); onRate?.(s); }} className={onRate ? 'cursor-pointer' : 'cursor-default'}>
            <Star className={`w-4 h-4 ${filled ? 'text-rust-300 fill-rust-300' : 'text-gray-600'}`} />
          </button>
        );
      })}
    </div>
  );
}

export default function BuildsPage() {
  const [supabase] = useState(() => createClient());
  const { user, loading: userLoading } = useUser();
  const [tab, setTab] = useState<TabKey>('top-rated');
  const [rows, setRows] = useState<(LoadoutRow & { author?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [role, setRole] = useState<string | 'all'>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<(LoadoutRow & { author?: string }) | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    let data: LoadoutRow[] = [];
    if (tab === 'top-rated') {
      const r = await supabase.from('builds').select('*').eq('is_public', true).order('rating_avg', { ascending: false }).order('created_at', { ascending: false });
      data = (r.data as LoadoutRow[]) ?? [];
    } else if (user) {
      if (tab === 'my-builds') {
        const r = await supabase.from('builds').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        data = (r.data as LoadoutRow[]) ?? [];
      } else {
        const { data: memberships } = await supabase.from('group_members').select('group_id').eq('user_id', user.id);
        const groupIds = (memberships ?? []).map((m) => m.group_id);
        if (groupIds.length) {
          const { data: members } = await supabase.from('group_members').select('user_id').in('group_id', groupIds);
          const ids = [...new Set((members ?? []).map((m) => m.user_id))];
          const r = await supabase.from('builds').select('*').in('user_id', ids).order('created_at', { ascending: false });
          data = ((r.data as LoadoutRow[]) ?? []).filter((b) => b.is_public || b.user_id === user.id);
        }
      }
    }
    const userIds = [...new Set(data.map((b) => b.user_id))];
    const names: Record<string, string> = {};
    if (userIds.length) {
      const { data: profiles } = await supabase.from('profiles').select('id, display_name').in('id', userIds);
      (profiles ?? []).forEach((p) => { names[p.id] = p.display_name ?? 'Raider'; });
    }
    setRows(data.map((b) => ({ ...b, author: names[b.user_id] ?? 'Raider' })));
    if (user) {
      const { data: mine } = await supabase.from('build_ratings').select('build_id, rating').eq('user_id', user.id);
      const map: Record<string, number> = {};
      (mine ?? []).forEach((r) => { map[r.build_id] = r.rating; });
      setRatings(map);
    }
    setLoading(false);
  }, [tab, user, supabase]);

  useEffect(() => { if (!userLoading) load(); }, [userLoading, load]);

  const rate = async (id: string, rating: number) => {
    if (!user) return;
    setRatings((p) => ({ ...p, [id]: rating }));
    await supabase.from('build_ratings').upsert({ build_id: id, user_id: user.id, rating, updated_at: new Date().toISOString() }, { onConflict: 'build_id,user_id' });
    const { data } = await supabase.from('builds').select('rating_avg, rating_count').eq('id', id).single();
    if (data) {
      setRows((p) => p.map((b) => (b.id === id ? { ...b, rating_avg: data.rating_avg, rating_count: data.rating_count } : b)));
      setSelected((p) => (p && p.id === id ? { ...p, rating_avg: data.rating_avg, rating_count: data.rating_count } : p));
    }
  };
  const remove = async (id: string) => {
    if (!user) return;
    setRows((p) => p.filter((b) => b.id !== id));
    setSelected(null);
    await supabase.from('build_ratings').delete().eq('build_id', id);
    await supabase.from('builds').delete().eq('id', id).eq('user_id', user.id);
  };
  const toggleVisibility = async (b: LoadoutRow) => {
    if (!user) return;
    const next = !b.is_public;
    setRows((p) => p.map((x) => (x.id === b.id ? { ...x, is_public: next } : x)));
    setSelected((p) => (p && p.id === b.id ? { ...p, is_public: next } : p));
    await supabase.from('builds').update({ is_public: next }).eq('id', b.id).eq('user_id', user.id);
  };

  const filtered = useMemo(() => rows.filter((b) => (role === 'all' || b.character === role) && (!query || b.name.toLowerCase().includes(query.toLowerCase()))), [rows, role, query]);

  return (
    <div className="space-y-6">
      <PageHeader icon={<Share2 className="w-7 h-7" />} title="Shared Loadouts" subtitle="Browse loadouts other Raiders have published, rate them, and copy the ones that work. Your squad's loadouts show up under the Squad tab." right={<Link href="/planner" className="px-4 py-2 bg-rust-500 hover:bg-rust-400 text-black font-display font-semibold rounded-lg text-sm">Open planner</Link>} />

      <div className="flex gap-2 border-b border-arc-border">
        {([['top-rated', 'Top rated'], ['my-builds', 'My loadouts'], ['group-builds', 'Squad']] as [TabKey, string][]).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-display border-b-2 -mb-px transition-colors ${tab === t ? 'text-rust-300 border-rust-400' : 'text-gray-400 border-transparent hover:text-gray-200'}`}>{label}</button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <SearchInput value={query} onChange={setQuery} placeholder="Search loadouts..." className="md:w-64" />
        <Chips options={LOADOUT_ROLES.map((r) => ({ value: r.id, label: r.label }))} value={role} onChange={setRole} size="xs" />
      </div>

      {tab !== 'top-rated' && !user && !userLoading ? <SignInPrompt message="Sign in to see your own and your squad's loadouts" /> : loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">No loadouts here yet. {tab === 'my-builds' && <Link href="/planner" className="text-signal-400">Build one.</Link>}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((b) => {
            const r = resolveLoadout(b);
            return (
              <div key={b.id} onClick={() => setSelected(b)} className="bg-arc-card border border-arc-border rounded-lg p-4 cursor-pointer hover:bg-arc-card-hover hover:border-rust-500/50 transition-colors">
                <div className="flex items-center gap-2 mb-1"><Tag className={roleColor(b.character)}>{roleLabel(b.character)}</Tag>{!b.is_public && <Tag className="text-gray-500 border-gray-600/40 bg-transparent">private</Tag>}</div>
                <h3 className="font-display font-bold text-gray-100">{b.name}</h3>
                <p className="text-xs text-gray-500 mb-2">by {b.author}</p>
                <p className="text-sm text-gray-300">{r.weapons.map((w) => w.name).join(' + ') || 'No weapons'}</p>
                <p className="text-xs text-gray-400">{[r.shield?.name, r.augment?.name].filter(Boolean).join(' · ')}</p>
                <div className="flex items-center justify-between mt-3">
                  <Stars avg={b.rating_avg ?? 0} mine={ratings[b.id]} onRate={user && user.id !== b.user_id ? (v) => rate(b.id, v) : undefined} />
                  <span className="text-xs text-gray-500">{(b.rating_avg ?? 0) > 0 ? `${(b.rating_avg ?? 0).toFixed(1)} (${b.rating_count ?? 0})` : 'No ratings'}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selected && (() => {
        const r = resolveLoadout(selected);
        const isOwner = user?.id === selected.user_id;
        return (
          <Modal onClose={() => setSelected(null)}>
            <div className="px-6 py-5 border-b border-arc-border">
              <div className="flex items-center gap-2 mb-1"><Tag className={roleColor(selected.character)}>{roleLabel(selected.character)}</Tag>{!selected.is_public && <Tag className="text-gray-500 border-gray-600/40 bg-transparent">private</Tag>}</div>
              <h2 className="text-2xl font-display font-bold text-rust-300">{selected.name}</h2>
              <p className="text-xs text-gray-500">by {selected.author}</p>
              <div className="flex items-center gap-3 mt-3">
                <Stars avg={selected.rating_avg ?? 0} mine={ratings[selected.id]} onRate={user && !isOwner ? (v) => rate(selected.id, v) : undefined} />
                <span className="text-xs text-gray-500">{(selected.rating_avg ?? 0).toFixed(1)} avg ({selected.rating_count ?? 0})</span>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div><p className="text-xs font-display uppercase tracking-wider text-signal-400 mb-1">Weapons</p>{r.weapons.length ? r.weapons.map((w) => <p key={w.id} className="text-gray-100">{w.name} <span className="text-xs text-gray-500">{w.rarity}</span></p>) : <p className="text-gray-500">None</p>}</div>
                <div><p className="text-xs font-display uppercase tracking-wider text-signal-400 mb-1">Shield & augment</p><p className="text-gray-100">{r.shield?.name ?? '-'}</p><p className="text-gray-100">{r.augment?.name ?? '-'}</p></div>
                <div><p className="text-xs font-display uppercase tracking-wider text-signal-400 mb-1">Quick-use</p><div className="flex flex-wrap gap-1">{r.quickUse.length ? r.quickUse.map((q) => <Tag key={q.id} className="text-gray-300 border-arc-border bg-arc-bg/50">{q.name}</Tag>) : <span className="text-gray-500">None</span>}</div></div>
              </div>
              <div className="space-y-3">
                <div><p className="text-xs font-display uppercase tracking-wider text-signal-400 mb-1">Key skills</p><div className="flex flex-wrap gap-1">{r.skills.length ? r.skills.map((s) => <Tag key={s.id} className="text-signal-300 border-signal-500/40 bg-signal-500/10">{s.name}</Tag>) : <span className="text-gray-500">None listed</span>}</div></div>
                <div className="grid grid-cols-2 gap-2 text-xs"><div className="bg-arc-bg/50 rounded p-2"><p className="text-gray-500">Weight</p><p className="font-mono text-gray-100">{r.weight.toFixed(1)} kg</p></div><div className="bg-arc-bg/50 rounded p-2"><p className="text-gray-500">Approx. value</p><p className="font-mono text-rust-300">{r.value.toLocaleString()} c</p></div></div>
                {selected.notes && <div><p className="text-xs font-display uppercase tracking-wider text-signal-400 mb-1">Notes</p><p className="text-gray-300 whitespace-pre-line">{selected.notes}</p></div>}
                {isOwner && (
                  <div className="flex gap-2 pt-2">
                    <Link href={`/planner?load=${selected.id}`} className="flex items-center gap-1 px-3 py-1.5 text-xs border border-arc-border rounded-lg text-gray-300 hover:text-rust-300"><Pencil className="w-3.5 h-3.5" />Edit</Link>
                    <button onClick={() => toggleVisibility(selected)} className="flex items-center gap-1 px-3 py-1.5 text-xs border border-arc-border rounded-lg text-gray-300 hover:text-signal-300">{selected.is_public ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}{selected.is_public ? 'Make private' : 'Publish'}</button>
                    <button onClick={() => remove(selected.id)} className="flex items-center gap-1 px-3 py-1.5 text-xs border border-red-500/40 rounded-lg text-red-300 hover:bg-red-500/10"><Trash2 className="w-3.5 h-3.5" />Delete</button>
                  </div>
                )}
              </div>
            </div>
          </Modal>
        );
      })()}
    </div>
  );
}
