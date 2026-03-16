'use client';

import { useState } from 'react';
import { QUESTS } from '@/lib/game-data';
import { useProgress } from '@/hooks/use-progress';
import { X, Scroll, Gift, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import type { QuestType, QuestStatus } from '@/types/game-data';

interface Quest {
  name: string;
  type: QuestType;
  description: string;
}

export default function QuestsPage() {
  const [selectedFilter, setSelectedFilter] = useState<QuestType | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const { getValue, setValue, countCompleted, loading, isAuthenticated, progress } = useProgress();

  const getQuestStatus = (questName: string): QuestStatus => {
    const val = getValue('quest', questName);
    if (!val) return 'not-started';
    if (typeof val === 'object' && 'status' in val) {
      return (val.status as QuestStatus) || 'not-started';
    }
    return 'not-started';
  };

  const filteredQuests = QUESTS.filter(q => {
    const matchesType = selectedFilter === 'all' || q.type === selectedFilter;
    const query = search.toLowerCase();
    const matchesSearch =
      !query ||
      q.name.toLowerCase().includes(query) ||
      q.description.toLowerCase().includes(query);
    return matchesType && matchesSearch;
  });

  // Completion counts (only 'complete' status counts toward completion)
  const completedCount = QUESTS.filter(q => getQuestStatus(q.name) === 'complete').length;
  const totalQuests = QUESTS.length;

  const getTypeColor = (type: QuestType): string => {
    const colors: Record<QuestType, string> = {
      main: 'bg-gold-600/20 border-gold-600 text-gold-300',
      side: 'bg-blue-600/20 border-blue-600 text-blue-300',
      faction: 'bg-amber-600/20 border-amber-600 text-amber-300',
      character: 'bg-purple-600/20 border-purple-600 text-purple-300',
      liberation: 'bg-red-600/20 border-red-600 text-red-300',
    };
    return colors[type];
  };

  const getTypeLabel = (type: QuestType): string => {
    const labels: Record<QuestType, string> = {
      main: 'Main Story',
      side: 'Side Quest',
      faction: 'Faction',
      character: 'Character Arc',
      liberation: 'Region Liberation',
    };
    return labels[type];
  };

  const cycleQuestStatus = (questName: string) => {
    const current = getQuestStatus(questName);
    const next: Record<QuestStatus, QuestStatus> = {
      'not-started': 'active',
      'active': 'complete',
      'complete': 'not-started',
    };
    const nextStatus = next[current];

    if (nextStatus === 'not-started') {
      setValue('quest', questName, null);
    } else {
      setValue('quest', questName, { status: nextStatus });
    }
  };

  const setQuestStatus = (questName: string, status: QuestStatus) => {
    if (status === 'not-started') {
      setValue('quest', questName, null);
    } else {
      setValue('quest', questName, { status });
    }
  };

  const getStatusBadge = (questName: string) => {
    const status = getQuestStatus(questName);
    const badges: Record<QuestStatus, string> = {
      'not-started': 'Not Started',
      'active': 'Active',
      'complete': 'Complete',
    };
    const colors: Record<QuestStatus, string> = {
      'not-started': 'bg-pywel-secondary text-gray-300',
      'active': 'bg-blue-600 text-white',
      'complete': 'bg-green-600 text-white',
    };
    return { label: badges[status], color: colors[status], status };
  };

  const getStatusIcon = (questName: string) => {
    const status = getQuestStatus(questName);
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'active':
        return <Loader2 className="w-5 h-5 text-blue-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Quest Log</h1>
        <p className="text-gray-400">Track your progress through the main story, side quests, and faction missions.</p>
      </div>

      {/* Completion bar */}
      <div className="bg-pywel-card border border-pywel-border rounded-lg p-4">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-sm font-cinzel font-semibold text-gold-400">Quests Completed</span>
          <span className="text-sm text-gold-300">{completedCount} / {totalQuests}</span>
        </div>
        <div className="w-full bg-pywel-bg rounded-full h-2.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-300"
            style={{ width: `${totalQuests > 0 ? (completedCount / totalQuests) * 100 : 0}%` }}
          ></div>
        </div>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by quest name or description..."
        className="w-full bg-pywel-bg border border-pywel-border rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:border-gold-400 focus:outline-none"
      />

      <div className="flex gap-2 flex-wrap">
        {(['all', 'main', 'side', 'faction', 'character', 'liberation'] as const).map(filter => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              selectedFilter === filter
                ? 'bg-gold-600 text-pywel-bg'
                : 'bg-pywel-card border border-pywel-border text-gray-300 hover:text-gold-300'
            }`}
          >
            {filter === 'all' ? 'All Quests' : getTypeLabel(filter as QuestType)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredQuests.map(quest => {
          const badge = getStatusBadge(quest.name);

          return (
            <div
              key={quest.name}
              onClick={() => setSelectedQuest(quest)}
              className="bg-pywel-card rounded-lg p-4 border border-pywel-border hover:border-gold-500/30 transition cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${getTypeColor(quest.type)}`}>
                      {getTypeLabel(quest.type)}
                    </span>
                  </div>
                  <h3 className="text-lg font-cinzel font-semibold text-gold-300 mb-2">{quest.name}</h3>
                  <p className="text-gray-400 text-sm">{quest.description}</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    cycleQuestStatus(quest.name);
                  }}
                  className={`px-4 py-2 rounded font-semibold text-sm whitespace-nowrap transition ${badge.color} hover:opacity-80`}
                >
                  {badge.label}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quest Detail Modal */}
      {selectedQuest && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedQuest(null)}
        >
          <div
            className="bg-pywel-secondary border border-pywel-border rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-pywel-border">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold border ${getTypeColor(selectedQuest.type)}`}>
                    {getTypeLabel(selectedQuest.type)}
                  </span>
                </div>
                <h2 className="text-xl font-cinzel font-bold text-gold-400">{selectedQuest.name}</h2>
                <p className="text-sm text-gray-400 mt-1">{selectedQuest.description}</p>
              </div>
              <button
                onClick={() => setSelectedQuest(null)}
                className="text-gray-400 hover:text-gold-300 transition-colors ml-4 flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Completion Status */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {getStatusIcon(selectedQuest.name)}
                  <h3 className="text-sm font-cinzel font-semibold text-gold-400 uppercase tracking-wider">Status</h3>
                </div>
                <div className="flex gap-2">
                  {(['not-started', 'active', 'complete'] as QuestStatus[]).map(status => {
                    const current = getQuestStatus(selectedQuest.name);
                    const isActive = current === status;
                    const statusLabels: Record<QuestStatus, string> = {
                      'not-started': 'Not Started',
                      'active': 'In Progress',
                      'complete': 'Complete',
                    };
                    const statusColors: Record<QuestStatus, string> = {
                      'not-started': isActive ? 'bg-gray-600 text-white border-gray-500' : 'bg-pywel-card text-gray-400 border-pywel-border',
                      'active': isActive ? 'bg-blue-600 text-white border-blue-500' : 'bg-pywel-card text-gray-400 border-pywel-border',
                      'complete': isActive ? 'bg-green-600 text-white border-green-500' : 'bg-pywel-card text-gray-400 border-pywel-border',
                    };
                    return (
                      <button
                        key={status}
                        onClick={() => setQuestStatus(selectedQuest.name, status)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${statusColors[status]}`}
                      >
                        {statusLabels[status]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Walkthrough Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Scroll className="w-5 h-5 text-gold-400" />
                  <h3 className="text-sm font-cinzel font-semibold text-gold-400 uppercase tracking-wider">Walkthrough</h3>
                </div>
                <div className="bg-pywel-card border border-pywel-border rounded-lg p-8 text-center min-h-[120px] flex items-center justify-center">
                  <p className="text-gray-500 italic text-sm">Walkthrough information coming soon</p>
                </div>
              </div>

              {/* Rewards Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="w-5 h-5 text-purple-400" />
                  <h3 className="text-sm font-cinzel font-semibold text-gold-400 uppercase tracking-wider">Rewards</h3>
                </div>
                <div className="bg-pywel-card border border-pywel-border rounded-lg p-8 text-center min-h-[80px] flex items-center justify-center">
                  <p className="text-gray-500 italic text-sm">Reward details coming soon</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 pt-0">
              <button
                onClick={() => setSelectedQuest(null)}
                className="w-full py-2.5 bg-pywel-card border border-pywel-border rounded-lg text-gray-300 text-sm font-cinzel font-semibold hover:bg-pywel-card-hover hover:text-gold-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
