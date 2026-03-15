'use client';

import { useState } from 'react';
import { WEAPONS } from '@/lib/game-data';
import type { Character } from '@/types/game-data';
import { getWeaponIcon } from '@/components/icons/WeaponIcons';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CHARACTERS: Character[] = ['kliff', 'damiane', 'oongka'];

export default function WeaponsPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedWeapons, setExpandedWeapons] = useState<Set<string>>(new Set());

  const getCharacterLabel = (char: Character | 'all'): string => {
    if (char === 'all') return 'All';
    return char.charAt(0).toUpperCase() + char.slice(1);
  };

  const toggleStats = (weaponName: string) => {
    setExpandedWeapons(prev => {
      const next = new Set(prev);
      if (next.has(weaponName)) {
        next.delete(weaponName);
      } else {
        next.add(weaponName);
      }
      return next;
    });
  };

  const filteredWeapons = WEAPONS.filter(w => {
    const matchesCharacter = selectedCharacter === 'all' || w.character === selectedCharacter;
    const matchesSearch = !searchQuery.trim() || w.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCharacter && matchesSearch;
  });

  const renderStatBar = (value: number, max: number = 100) => {
    const percentage = (value / max) * 100;
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-pywel-bg rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-xs text-gold-300 font-semibold w-6 text-right">{value}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Weapons</h1>
        <p className="text-gray-400">Compare weapons and their stats across all characters.</p>
      </div>

      {/* Search bar */}
      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by weapon name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 bg-pywel-card border border-pywel-border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCharacter('all')}
          className={`px-4 py-2 rounded-full font-semibold transition-colors ${
            selectedCharacter === 'all'
              ? 'bg-gold-600 text-pywel-bg'
              : 'bg-pywel-card border border-pywel-border text-gray-300 hover:text-gold-300'
          }`}
        >
          All
        </button>
        {CHARACTERS.map(char => (
          <button
            key={char}
            onClick={() => setSelectedCharacter(char)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              selectedCharacter === char
                ? 'bg-gold-600 text-pywel-bg'
                : 'bg-pywel-card border border-pywel-border text-gray-300 hover:text-gold-300'
            }`}
          >
            {getCharacterLabel(char)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWeapons.map(weapon => {
          const isExpanded = expandedWeapons.has(weapon.name);
          return (
            <div
              key={weapon.name}
              className="bg-pywel-card rounded-lg p-4 border border-pywel-border hover:border-gold-500/50 transition"
            >
              <div className="mb-3">
                <div className="mb-2">{(() => { const Icon = getWeaponIcon(weapon.iconKey); return <Icon size={36} />; })()}</div>
                <h3 className="text-lg font-cinzel font-semibold text-gold-400">{weapon.name}</h3>
                <p className="text-xs text-gray-400">
                  {weapon.type} <span className="text-gold-300">{getCharacterLabel(weapon.character)}</span>
                </p>
              </div>

              <button
                onClick={() => toggleStats(weapon.name)}
                className="flex items-center gap-1 text-sm text-gold-400 hover:text-gold-300 transition-colors font-semibold"
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {isExpanded ? 'Hide Stats' : 'Show Stats'}
              </button>

              {isExpanded && (
                <div className="space-y-3 pt-3 mt-3 border-t border-pywel-border">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Attack</label>
                    {renderStatBar(weapon.atk)}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Speed</label>
                    {renderStatBar(weapon.spd)}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Range</label>
                    {renderStatBar(weapon.rng)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
