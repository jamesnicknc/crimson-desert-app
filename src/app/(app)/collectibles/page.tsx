'use client';

import { useState } from 'react';
import { COLLECTIBLES, getAllCollectiblesWithKeys } from '@/lib/game-data';
import { useProgress } from '@/hooks/use-progress';
import SignInPrompt from '@/components/SignInPrompt';
import type { CollectibleCategory } from '@/types/game-data';

const FILTERS: { label: string; value: CollectibleCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Abyss Artifacts', value: 'artifact' },
  { label: 'Abyss Gears', value: 'gear' },
  { label: 'Recipes', value: 'recipe' },
  { label: 'Lore Items', value: 'lore' },
  { label: 'Fast Travel', value: 'fast-travel' },
];

export default function CollectiblesPage() {
  const [selectedFilter, setSelectedFilter] = useState<CollectibleCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const { isCompleted, toggle, countCompleted, loading, isAuthenticated } = useProgress();

  const allItems = getAllCollectiblesWithKeys();

  const getFilteredCategories = (): CollectibleCategory[] => {
    if (selectedFilter === 'all') {
      return ['artifact', 'gear', 'recipe', 'lore', 'fast-travel'];
    }
    return [selectedFilter];
  };

  const getCategoryLabel = (cat: CollectibleCategory): string => {
    const labels: Record<CollectibleCategory, string> = {
      artifact: 'Abyss Artifacts',
      gear: 'Abyss Gears',
      recipe: 'Recipes',
      lore: 'Lore Items',
      'fast-travel': 'Fast Travel',
    };
    return labels[cat];
  };

  const filteredCategories = getFilteredCategories();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Collectibles</h1>
        <p className="text-gray-400">Track every item, recipe, and lore piece across Pywel.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(filter => (
          <button
            key={filter.value}
            onClick={() => setSelectedFilter(filter.value)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              selectedFilter === filter.value
                ? 'bg-gold-600 text-pywel-bg'
                : 'bg-pywel-card border border-pywel-border text-gray-300 hover:text-gold-300'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search collectibles by name or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 bg-pywel-card border border-pywel-border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
      />

      {!isAuthenticated && !loading && (
        <SignInPrompt message="Sign in to track your collectibles" compact />
      )}

      {loading ? (
        <div className="text-center text-gray-400">Loading collectibles...</div>
      ) : (
        <div className="space-y-8">
          {filteredCategories.map(category => {
            const rawItems = COLLECTIBLES[category];
            const items = search
              ? rawItems.filter(item =>
                  item.name.toLowerCase().includes(search.toLowerCase()) ||
                  item.location.toLowerCase().includes(search.toLowerCase())
                )
              : rawItems;
            const itemKeys = allItems
              .filter(item => item.item.category === category)
              .map(item => item.key);
            const completed = countCompleted('collectible', itemKeys);
            const total = items.length;

            return (
              <div key={category} className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <h2 className="text-xl font-cinzel font-bold text-gold-400">{getCategoryLabel(category)}</h2>
                  <span className="text-sm text-gold-300">{completed} / {total}</span>
                </div>

                <div className="w-full bg-pywel-bg rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-300"
                    style={{ width: `${(completed / total) * 100}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {items.map((item, idx) => {
                    const key = `${allItems.find(i => i.item === item)?.key || `${category}-${idx}`}`;
                    const isComplete = isCompleted('collectible', key);

                    return (
                      <div
                        key={key}
                        onClick={() => toggle('collectible', key)}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          isComplete
                            ? 'bg-pywel-card/50 border-pywel-border/50 opacity-60'
                            : 'bg-pywel-card border-pywel-border hover:border-gold-500/50 hover:bg-pywel-card-hover'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={isComplete}
                            onChange={() => toggle('collectible', key)}
                            className="mt-1 w-4 h-4 cursor-pointer accent-gold-400 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${
                              isComplete
                                ? 'line-through text-gray-500'
                                : 'text-gray-200'
                            }`}>
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-1 line-clamp-1">{item.location}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
