'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ClipboardList, MapPin, Gift, ChevronRight, ChevronLeft, ListChecks, Lightbulb } from 'lucide-react';
import { QUESTS, MAPS, TRADERS } from '@/lib/game-data';
import { PROGRESS } from '@/lib/progress-keys';
import { useProgress } from '@/hooks/use-progress';
import PageHeader from '@/components/ui/PageHeader';
import Chips from '@/components/ui/Chips';
import SearchInput from '@/components/ui/SearchInput';
import Modal from '@/components/ui/Modal';
import Tag, { Unverified } from '@/components/ui/Tag';
import ProgressBar from '@/components/ui/ProgressBar';
import SignInPrompt from '@/components/SignInPrompt';
import type { Quest, QuestStatus } from '@/types/game-data';

const mapName = (slug: string) => MAPS.find((m) => m.slug === slug)?.name ?? slug;

const GIVER_COLORS: Record<string, string> = {
  Shani: 'border-l-amber-500',
  Celeste: 'border-l-green-500',
  'Tian Wen': 'border-l-blue-500',
  Apollo: 'border-l-purple-500',
  Lance: 'border-l-red-500',
};
const GIVER_TAG: Record<string, string> = {
  Shani: 'text-amber-300 border-amber-500/40 bg-amber-500/10',
  Celeste: 'text-green-300 border-green-500/40 bg-green-500/10',
  'Tian Wen': 'text-blue-300 border-blue-500/40 bg-blue-500/10',
  Apollo: 'text-purple-300 border-purple-500/40 bg-purple-500/10',
  Lance: 'text-red-300 border-red-500/40 bg-red-500/10',
};
const STATUS_COLORS: Record<QuestStatus, string> = {
  'not-started': 'bg-arc-secondary text-gray-300 border-arc-border',
  active: 'bg-blue-600/90 text-white border-blue-500',
  complete: 'bg-green-600/90 text-white border-green-500',
};
const STATUS_LABELS: Record<QuestStatus, string> = { 'not-started': 'Not started', active: 'In progress', complete: 'Complete' };

function QuestModal({ quest, status, onStatus, onClose, onNavigate }: { quest: Quest; status: QuestStatus; onStatus: (s: QuestStatus) => void; onClose: () => void; onNavigate: (name: string) => void }) {
  return (
    <Modal onClose={onClose}>
      <div className={`px-6 py-5 border-b border-arc-border border-l-4 ${GIVER_COLORS[quest.giver] ?? 'border-l-rust-500'}`}>
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <Tag className={GIVER_TAG[quest.giver] ?? ''}>{quest.giver}</Tag>
          <span className="text-xs text-gray-500">#{quest.order}</span>
          {quest.maps.map((m) => <span key={m} className="flex items-center gap-1 text-xs text-gray-400"><MapPin className="w-3 h-3" />{mapName(m)}</span>)}
          {!quest.verified && <Unverified />}
        </div>
        <h2 className="text-2xl font-display font-bold text-rust-300">{quest.name}</h2>
        <p className="text-sm text-gray-300 mt-2 leading-relaxed whitespace-pre-line">{quest.description}</p>
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <span className="text-xs text-gray-500 mr-1">Status:</span>
          {(['not-started', 'active', 'complete'] as QuestStatus[]).map((s) => (
            <button key={s} onClick={() => onStatus(s)} className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${status === s ? STATUS_COLORS[s] : 'bg-arc-secondary text-gray-500 border-arc-border hover:text-gray-300'}`}>{STATUS_LABELS[s]}</button>
          ))}
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div className="space-y-5">
          <div>
            <h3 className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-signal-400 mb-2"><ListChecks className="w-4 h-4" />Objectives</h3>
            <ol className="space-y-2">
              {quest.objectives.map((o, i) => (
                <li key={i} className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-arc-bg border border-arc-border text-xs flex items-center justify-center text-signal-300 font-mono">{i + 1}</span><span className="text-gray-200">{o}</span></li>
              ))}
            </ol>
          </div>
          {quest.tips && (
            <div>
              <h3 className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-signal-400 mb-2"><Lightbulb className="w-4 h-4" />Tips</h3>
              <p className="text-gray-300 leading-relaxed">{quest.tips}</p>
            </div>
          )}
        </div>
        <div className="space-y-5">
          <div>
            <h3 className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-signal-400 mb-2"><Gift className="w-4 h-4" />Rewards</h3>
            {quest.rewards.length === 0 ? <p className="text-gray-500 text-xs">No item rewards recorded.</p> : (
              <ul className="space-y-1">{quest.rewards.map((r) => <li key={r} className="bg-arc-bg/50 rounded px-2 py-1 text-gray-200">{r}</li>)}</ul>
            )}
            {quest.xp > 0 && <p className="text-xs text-gray-400 mt-2">{quest.xp.toLocaleString()} XP</p>}
          </div>
          <div>
            <h3 className="text-xs font-display uppercase tracking-wider text-signal-400 mb-2">Quest chain</h3>
            <div className="space-y-2">
              {quest.previous.map((p) => (
                <button key={p} onClick={() => onNavigate(p)} className="w-full flex items-center gap-2 text-left bg-arc-bg/50 hover:bg-arc-card-hover rounded px-2 py-1.5 text-gray-300"><ChevronLeft className="w-4 h-4 text-gray-500" />{p}</button>
              ))}
              {quest.next.map((n) => (
                <button key={n} onClick={() => onNavigate(n)} className="w-full flex items-center gap-2 text-left bg-arc-bg/50 hover:bg-arc-card-hover rounded px-2 py-1.5 text-gray-300"><ChevronRight className="w-4 h-4 text-signal-400" />{n}</button>
              ))}
              {quest.previous.length === 0 && quest.next.length === 0 && <p className="text-gray-500 text-xs">Standalone quest.</p>}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function QuestsPageInner() {
  const params = useSearchParams();
  const [giver, setGiver] = useState<string | 'all'>('all');
  const [status, setStatus] = useState<QuestStatus | 'all'>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Quest | null>(null);
  const { getValue, setValue, loading, isAuthenticated } = useProgress();

  useEffect(() => {
    const q = params.get('q');
    if (q) {
      const match = QUESTS.find((x) => x.name.toLowerCase() === q.toLowerCase());
      if (match) setSelected(match); else setQuery(q);
    }
  }, [params]);

  const statusOf = (q: Quest): QuestStatus => (getValue(PROGRESS.quest, q.id)?.status as QuestStatus) ?? 'not-started';
  const setStatusOf = (q: Quest, s: QuestStatus) => setValue(PROGRESS.quest, q.id, s === 'not-started' ? null : { status: s });

  const givers = TRADERS.map((t) => t.name).filter((n) => QUESTS.some((q) => q.giver === n));
  const filtered = useMemo(() => {
    const lq = query.toLowerCase();
    return QUESTS.filter((q) => (giver === 'all' || q.giver === giver) && (status === 'all' || statusOf(q) === status) && (!lq || q.name.toLowerCase().includes(lq) || q.objectives.some((o) => o.toLowerCase().includes(lq))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [giver, status, query, getValue]);

  const done = QUESTS.filter((q) => statusOf(q) === 'complete').length;

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<ClipboardList className="w-7 h-7" />}
        title="Quests"
        subtitle="All trader quest chains in the order the game unlocks them. Set a status on each quest to keep your log in sync across devices."
        right={<div className="w-56"><ProgressBar value={done} max={QUESTS.length} color="bg-amber-400" label="Completed" /></div>}
      />
      {!loading && !isAuthenticated && <SignInPrompt compact message="Sign in to save quest progress. Guest changes reset on reload." />}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {givers.map((g) => {
          const mine = QUESTS.filter((q) => q.giver === g);
          const c = mine.filter((q) => statusOf(q) === 'complete').length;
          return (
            <button key={g} onClick={() => setGiver(giver === g ? 'all' : g)} className={`bg-arc-card border rounded-lg p-3 text-left transition-colors ${giver === g ? 'border-rust-400' : 'border-arc-border hover:border-rust-500/50'}`}>
              <p className="font-display font-semibold text-gray-100 text-sm mb-1">{g}</p>
              <ProgressBar value={c} max={mine.length} color="bg-amber-400" compact />
              <p className="text-[11px] text-gray-500 mt-1">{c}/{mine.length}</p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <SearchInput value={query} onChange={setQuery} placeholder="Search quests or objectives..." className="md:w-72" />
        <Chips options={(['not-started', 'active', 'complete'] as QuestStatus[]).map((s) => ({ value: s, label: STATUS_LABELS[s] }))} value={status} onChange={setStatus} allLabel="Any status" size="xs" />
      </div>

      <div className="space-y-2">
        {filtered.map((q) => {
          const s = statusOf(q);
          return (
            <div key={q.id} onClick={() => setSelected(q)} className={`bg-arc-card border border-arc-border border-l-4 ${GIVER_COLORS[q.giver] ?? 'border-l-rust-500'} rounded-lg px-4 py-3 cursor-pointer hover:bg-arc-card-hover transition-colors flex flex-col sm:flex-row sm:items-center gap-2`}>
              <span className="text-xs font-mono text-gray-600 w-8">#{q.order}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className={`font-display font-semibold ${s === 'complete' ? 'text-gray-500 line-through' : 'text-gray-100'}`}>{q.name}</h3>
                  <Tag className={GIVER_TAG[q.giver] ?? ''}>{q.giver}</Tag>
                  {q.maps.map((m) => <Tag key={m} className="text-blue-300 border-blue-500/40 bg-blue-500/10">{mapName(m)}</Tag>)}
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{q.objectives[0]}{q.objectives.length > 1 ? ` (+${q.objectives.length - 1} more)` : ''}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {(['not-started', 'active', 'complete'] as QuestStatus[]).map((st) => (
                  <button key={st} onClick={(e) => { e.stopPropagation(); setStatusOf(q, st); }} title={STATUS_LABELS[st]} className={`w-7 h-7 rounded-full border text-[10px] font-bold transition-colors ${s === st ? STATUS_COLORS[st] : 'bg-arc-secondary text-gray-600 border-arc-border hover:text-gray-300'}`}>
                    {st === 'not-started' ? '·' : st === 'active' ? '▶' : '✓'}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p className="text-gray-500 text-sm">No quests match.</p>}
      </div>

      {selected && (
        <QuestModal
          quest={selected}
          status={statusOf(selected)}
          onStatus={(s) => setStatusOf(selected, s)}
          onClose={() => setSelected(null)}
          onNavigate={(name) => { const q = QUESTS.find((x) => x.name === name); if (q) setSelected(q); }}
        />
      )}
    </div>
  );
}

export default function QuestsPage() {
  return (
    <Suspense fallback={<div className="text-gray-500 text-sm">Loading...</div>}>
      <QuestsPageInner />
    </Suspense>
  );
}
