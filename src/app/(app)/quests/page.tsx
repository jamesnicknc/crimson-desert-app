'use client';

import { useState, useEffect } from 'react';
import { QUESTS } from '@/lib/game-data';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/hooks/use-user';
import SignInPrompt from '@/components/SignInPrompt';
import {
  X, Scroll, Gift, CheckCircle2, Circle, Loader2,
  MapPin, ChevronRight, BookOpen, Star,
} from 'lucide-react';
import type { QuestType, QuestStatus } from '@/types/game-data';

interface Quest {
  name: string;
  type: QuestType;
  description: string;
  region?: string;
  rewards?: string[];
  walkthrough?: { step: number; instruction: string; tip?: string }[];
}

// ═══════════════════════════════════════
// STYLE HELPERS
// ═══════════════════════════════════════

const TYPE_COLORS: Record<QuestType, string> = {
  main:        'bg-gold-600/20 border-gold-600 text-gold-300',
  side:        'bg-blue-600/20 border-blue-600 text-blue-300',
  faction:     'bg-amber-600/20 border-amber-600 text-amber-300',
  character:   'bg-purple-600/20 border-purple-600 text-purple-300',
  liberation:  'bg-red-600/20 border-red-600 text-red-300',
};

const TYPE_ACCENT: Record<QuestType, string> = {
  main:        'border-l-gold-500',
  side:        'border-l-blue-500',
  faction:     'border-l-amber-500',
  character:   'border-l-purple-500',
  liberation:  'border-l-red-500',
};

const TYPE_LABELS: Record<QuestType, string> = {
  main:        'Main Story',
  side:        'Side Quest',
  faction:     'Faction',
  character:   'Character Arc',
  liberation:  'Region Liberation',
};

const STATUS_COLORS: Record<QuestStatus, string> = {
  'not-started': 'bg-pywel-secondary text-gray-300 border-pywel-border',
  'active':      'bg-blue-600/90 text-white border-blue-500',
  'complete':    'bg-green-600/90 text-white border-green-500',
};

const STATUS_LABELS: Record<QuestStatus, string> = {
  'not-started': 'Not Started',
  'active':      'In Progress',
  'complete':    'Complete',
};

// ═══════════════════════════════════════
// QUEST DETAIL MODAL
// ═══════════════════════════════════════

function QuestModal({
  quest,
  questStatus,
  onClose,
  onStatusChange,
}: {
  quest: Quest;
  questStatus: QuestStatus;
  onClose: () => void;
  onStatusChange: (status: QuestStatus) => void;
}) {
  const [activeTab, setActiveTab] = useState<'walkthrough' | 'rewards'>('walkthrough');

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-pywel-card border border-pywel-border rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className={`flex-shrink-0 px-6 py-5 border-b border-pywel-border border-l-4 ${TYPE_ACCENT[quest.type]}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${TYPE_COLORS[quest.type]}`}>
                  {TYPE_LABELS[quest.type]}
                </span>
                {quest.region && (
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    {quest.region}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-cinzel font-bold text-gold-400 leading-tight">{quest.name}</h2>
              <p className="text-sm text-gray-300 mt-2 leading-relaxed">{quest.description}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-pywel-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status selector */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs text-gray-500 mr-1">Status:</span>
            {(['not-started', 'active', 'complete'] as QuestStatus[]).map(s => (
              <button
                key={s}
                onClick={() => onStatusChange(s)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                  questStatus === s
                    ? STATUS_COLORS[s]
                    : 'bg-pywel-secondary text-gray-500 border-pywel-border hover:text-gray-300'
                }`}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex-shrink-0 flex border-b border-pywel-border px-4 pt-2 gap-1">
          <button
            onClick={() => setActiveTab('walkthrough')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors border-b-2 -mb-px ${
              activeTab === 'walkthrough'
                ? 'text-gold-400 border-gold-400 bg-pywel-secondary/50'
                : 'text-gray-400 border-transparent hover:text-gray-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Walkthrough
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors border-b-2 -mb-px ${
              activeTab === 'rewards'
                ? 'text-gold-400 border-gold-400 bg-pywel-secondary/50'
                : 'text-gray-400 border-transparent hover:text-gray-200'
            }`}
          >
            <Gift className="w-4 h-4" />
            Rewards
          </button>
        </div>

        {/* ── Tab content ── */}
        <div className="flex-1 overflow-y-auto p-6">

          {activeTab === 'walkthrough' && (
            <div className="space-y-4">
              {quest.walkthrough && quest.walkthrough.length > 0 ? (
                quest.walkthrough.map(step => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-600/20 border border-gold-600/40 flex items-center justify-center">
                      <span className="text-xs font-bold text-gold-400">{step.step}</span>
                    </div>
                    <div className="flex-1 pt-1 space-y-2">
                      <p className="text-sm text-gray-200 leading-relaxed">{step.instruction}</p>
                      {step.tip && (
                        <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
                          <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-300">{step.tip}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Scroll className="w-10 h-10 text-gray-600 mb-3" />
                  <p className="text-gray-400 font-cinzel font-semibold mb-1">Walkthrough Coming Soon</p>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Full step-by-step walkthroughs will be added after launch once the quest details are confirmed.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="space-y-3">
              {quest.rewards && quest.rewards.length > 0 ? (
                quest.rewards.map((reward, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-pywel-secondary rounded-lg">
                    <Gift className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-sm text-gray-200">{reward}</span>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Gift className="w-10 h-10 text-gray-600 mb-3" />
                  <p className="text-gray-400 font-cinzel font-semibold mb-1">Rewards Coming Soon</p>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Quest reward details will be added after launch.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-pywel-border">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-pywel-secondary border border-pywel-border rounded-lg text-gray-300 text-sm font-cinzel font-semibold hover:text-gold-300 hover:border-gold-500/40 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// QUESTS PAGE
// ═══════════════════════════════════════

export default function QuestsPage() {
  const [selectedFilter, setSelectedFilter] = useState<QuestType | 'all'>('all');
  const [questStatus, setQuestStatus] = useState<Record<string, QuestStatus>>({});
  const [search, setSearch] = useState('');
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const supabase = createClient();
  const { user } = useUser();

  // Load saved quest statuses from Supabase on mount
  useEffect(() => {
    async function loadQuestStatus() {
      const { data: { user: u } } = await supabase.auth.getUser();
      if (!u) return;

      const { data } = await supabase
        .from('user_progress')
        .select('item_key, value')
        .eq('user_id', u.id)
        .eq('category', 'quest');

      if (data && data.length > 0) {
        const loaded: Record<string, QuestStatus> = {};
        data.forEach(row => {
          const status = (row.value as { status?: string })?.status;
          if (status === 'active' || status === 'complete') {
            loaded[row.item_key] = status;
          }
        });
        setQuestStatus(loaded);
      }
    }
    loadQuestStatus();
  }, [supabase]);

  const filteredQuests = QUESTS.filter(q => {
    const matchesType = selectedFilter === 'all' || q.type === selectedFilter;
    const query = search.toLowerCase();
    const matchesSearch =
      !query ||
      q.name.toLowerCase().includes(query) ||
      q.description.toLowerCase().includes(query);
    return matchesType && matchesSearch;
  });

  const toggleQuestStatus = async (questName: string) => {
    const current = questStatus[questName] || 'not-started';
    const cycle: Record<QuestStatus, QuestStatus> = {
      'not-started': 'active',
      'active': 'complete',
      'complete': 'not-started',
    };
    const next = cycle[current];
    setQuestStatus(prev => ({ ...prev, [questName]: next }));

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (next === 'not-started') {
      await supabase
        .from('user_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('category', 'quest')
        .eq('item_key', questName);
    } else {
      await supabase.rpc('upsert_progress', {
        p_category: 'quest',
        p_item_key: questName,
        p_value: { status: next },
      });
    }
  };

  const setQuestStatusDirect = async (questName: string, status: QuestStatus) => {
    setQuestStatus(prev => ({ ...prev, [questName]: status }));

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (status === 'not-started') {
      await supabase
        .from('user_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('category', 'quest')
        .eq('item_key', questName);
    } else {
      await supabase.rpc('upsert_progress', {
        p_category: 'quest',
        p_item_key: questName,
        p_value: { status },
      });
    }
  };

  const getStatusIcon = (questName: string) => {
    const status = questStatus[questName] || 'not-started';
    switch (status) {
      case 'complete': return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'active':   return <Loader2 className="w-5 h-5 text-blue-400" />;
      default:         return <Circle className="w-5 h-5 text-gray-500" />;
    }
  };

  // Count by type for filter badges
  const countByType = (type: QuestType | 'all') =>
    type === 'all' ? QUESTS.length : QUESTS.filter(q => q.type === type).length;

  const completedCount = Object.values(questStatus).filter(s => s === 'complete').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Quest Log</h1>
        <p className="text-gray-400">Track your progress through the story, side quests, and faction missions.</p>
      </div>

      {/* Progress bar */}
      {QUESTS.length > 0 && (
        <div className="bg-pywel-card border border-pywel-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-cinzel font-semibold text-gold-400">Overall Progress</span>
            <span className="text-sm text-gray-400">{completedCount} / {QUESTS.length} complete</span>
          </div>
          <div className="w-full bg-pywel-secondary rounded-full h-2">
            <div
              className="bg-gold-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${QUESTS.length > 0 ? (completedCount / QUESTS.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by quest name or description..."
        className="w-full bg-pywel-bg border border-pywel-border rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-500 focus:border-gold-400 focus:outline-none"
      />

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'main', 'side', 'faction', 'character', 'liberation'] as const).map(filter => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
              selectedFilter === filter
                ? 'bg-gold-600 text-pywel-bg'
                : 'bg-pywel-card border border-pywel-border text-gray-300 hover:text-gold-300'
            }`}
          >
            {filter === 'all' ? 'All Quests' : TYPE_LABELS[filter as QuestType]}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              selectedFilter === filter ? 'bg-black/20 text-pywel-bg' : 'bg-pywel-secondary text-gray-500'
            }`}>
              {countByType(filter)}
            </span>
          </button>
        ))}
      </div>

      {!user && <SignInPrompt message="Sign in to track your quest progress" compact />}

      {/* Quest cards */}
      <div className="space-y-3">
        {filteredQuests.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Scroll className="w-8 h-8 mx-auto mb-3 opacity-40" />
            <p>No quests match your search.</p>
          </div>
        )}

        {filteredQuests.map(quest => {
          const status = questStatus[quest.name] || 'not-started';
          const isComplete = status === 'complete';

          return (
            <div
              key={quest.name}
              onClick={() => setSelectedQuest(quest)}
              className={`bg-pywel-card rounded-lg border border-pywel-border border-l-4 hover:border-gold-500/30 transition-all cursor-pointer group ${
                TYPE_ACCENT[quest.type]
              } ${isComplete ? 'opacity-60' : ''}`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">

                  {/* Left: quest info */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${TYPE_COLORS[quest.type]}`}>
                        {TYPE_LABELS[quest.type]}
                      </span>
                      {quest.region && (
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {quest.region}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-cinzel font-semibold text-gold-300 group-hover:text-gold-200 transition-colors leading-tight">
                      {quest.name}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed">{quest.description}</p>

                    {/* Walkthrough / rewards indicators */}
                    <div className="flex items-center gap-3 text-xs text-gray-600 pt-1">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {quest.walkthrough && quest.walkthrough.length > 0
                          ? `${quest.walkthrough.length} steps`
                          : 'Walkthrough coming soon'}
                      </span>
                      {quest.rewards && quest.rewards.length > 0 && (
                        <span className="flex items-center gap-1 text-purple-500">
                          <Gift className="w-3 h-3" />
                          {quest.rewards.length} reward{quest.rewards.length !== 1 ? 's' : ''}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-gold-600 ml-auto group-hover:text-gold-500 transition-colors">
                        View walkthrough
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Right: status button */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    {getStatusIcon(quest.name)}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleQuestStatus(quest.name);
                      }}
                      className={`px-3 py-1.5 rounded-lg font-semibold text-xs whitespace-nowrap border transition-colors ${STATUS_COLORS[status]} hover:opacity-80`}
                    >
                      {STATUS_LABELS[status]}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quest detail modal */}
      {selectedQuest && (
        <QuestModal
          quest={selectedQuest}
          questStatus={questStatus[selectedQuest.name] || 'not-started'}
          onClose={() => setSelectedQuest(null)}
          onStatusChange={status => setQuestStatusDirect(selectedQuest.name, status)}
        />
      )}
    </div>
  );
}
