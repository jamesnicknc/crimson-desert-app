'use client';

import { useState } from 'react';
import { QUESTS } from '@/lib/game-data';
import { createClient } from '@/lib/supabase/client';
import type { QuestType, QuestStatus } from '@/types/game-data';

export default function QuestsPage() {
  const [selectedFilter, setSelectedFilter] = useState<QuestType | 'all'>('all');
  const [questStatus, setQuestStatus] = useState<Record<string, QuestStatus>>({});
  const supabase = createClient();

  const filteredQuests = selectedFilter === 'all'
    ? QUESTS
    : QUESTS.filter(q => q.type === selectedFilter);

  const getTypeColor = (type: QuestType): string => {
    const colors: Record<QuestType, string> = {
      main: 'bg-gold-600/20 border-gold-600 text-gold-300',
      side: 'bg-blue-600/20 border-blue-600 text-blue-300',
      faction: 'bg-crimson-600/20 border-crimson-600 text-crimson-300',
    };
    return colors[type];
  };

  const getTypeLabel = (type: QuestType): string => {
    const labels: Record<QuestType, string> = {
      main: 'Main Story',
      side: 'Side Quest',
      faction: 'Faction',
    };
    return labels[type];
  };

  const toggleQuestStatus = async (questName: string) => {
    const current = questStatus[questName] || 'not-started';
    const statuses: Record<QuestStatus, QuestStatus> = {
      'not-started': 'active',
      'active': 'complete',
      'complete': 'not-started',
    };
    const next = statuses[current];

    setQuestStatus(prev => ({
      ...prev,
      [questName]: next,
    }));

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

  const getStatusBadge = (questName: string) => {
    const status = questStatus[questName] || 'not-started';
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
    return { label: badges[status], color: colors[status] };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Quest Log</h1>
        <p className="text-gray-400">Track your progress through the main story, side quests, and faction missions.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['all', 'main', 'side', 'faction'] as const).map(filter => (
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
              className="bg-pywel-card rounded-lg p-4 border border-pywel-border hover:border-gold-500/30 transition"
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
                  onClick={() => toggleQuestStatus(quest.name)}
                  className={`px-4 py-2 rounded font-semibold text-sm whitespace-nowrap transition ${badge.color} hover:opacity-80`}
                >
                  {badge.label}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
