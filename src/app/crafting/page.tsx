'use client';

import { useState } from 'react';
import { RECIPES } from '@/lib/game-data';
import type { CraftingType } from '@/types/game-data';

const FILTERS: { label: string; value: CraftingType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Cooking', value: 'cooking' },
  { label: 'Alchemy', value: 'alchemy' },
  { label: 'Blacksmithing', value: 'blacksmith' },
];

export default function CraftingPage() {
  const [selectedFilter, setSelectedFilter] = useState<CraftingType | 'all'>('all');

  const filteredRecipes = selectedFilter === 'all'
    ? RECIPES
    : RECIPES.filter(r => r.type === selectedFilter);

  const getTypeColor = (type: CraftingType): string => {
    const colors: Record<CraftingType, string> = {
      cooking: 'bg-orange-600/20 border-orange-600 text-orange-300',
      alchemy: 'bg-purple-600/20 border-purple-600 text-purple-300',
      blacksmith: 'bg-slate-600/20 border-slate-600 text-slate-300',
    };
    return colors[type];
  };

  const getTypeLabel = (type: CraftingType): string => {
    const labels: Record<CraftingType, string> = {
      cooking: 'Cooking',
      alchemy: 'Alchemy',
      blacksmith: 'Blacksmithing',
    };
    return labels[type];
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Crafting Recipes</h1>
        <p className="text-gray-400">Master the recipes for cooking, alchemy, and blacksmithing across Pywel.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecipes.map(recipe => (
          <div
            key={recipe.name}
            className="bg-pywel-card rounded-lg p-4 border border-pywel-border hover:border-gold-500/30 transition"
          >
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-cinzel font-semibold text-gold-400">{recipe.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-semibold border ${getTypeColor(recipe.type)}`}>
                  {getTypeLabel(recipe.type)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Ingredients</p>
                <ul className="space-y-1">
                  {recipe.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-gold-400">+</span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-pywel-border">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Effect</p>
                <p className="text-sm text-green-400 italic">{recipe.effect}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
