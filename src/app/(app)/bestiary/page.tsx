'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, BookOpen } from 'lucide-react';
import { ENEMIES, REGIONS } from '@/lib/game-data';
import type { Region, Element } from '@/types/game-data';

const REGION_OPTIONS: { label: string; value: Region }[] = REGIONS.map(r => ({ label: r.name, value: r.id }));

const TYPE_OPTIONS = Array.from(new Set(ENEMIES.map(e => e.type))).sort();

const ELEMENT_OPTIONS: { label: string; value: Element }[] = [
  { label: 'Physical', value: 'physical' },
  { label: 'Fire', value: 'fire' },
  { label: 'Frost', value: 'frost' },
  { label: 'Shock', value: 'shock' },
  { label: 'Abyss', value: 'abyss' },
];

export default function BestiaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [regionFilters, setRegionFilters] = useState<Set<Region>>(new Set());
  const [typeFilters, setTypeFilters] = useState<Set<string>>(new Set());
  const [elementFilters, setElementFilters] = useState<Set<Element>>(new Set());

  const hasActiveFilters = regionFilters.size > 0 || typeFilters.size > 0 || elementFilters.size > 0;

  const toggleFilter = <T,>(set: Set<T>, value: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    setter(next);
  };

  const getRegionName = (regionId: Region | 'multiple'): string => {
    if (regionId === 'multiple') return 'Multiple Regions';
    const region = REGIONS.find(r => r.id === regionId);
    if (region) return region.name;
    return regionId.charAt(0).toUpperCase() + regionId.slice(1);
  };

  const getRegionColor = (regionId: Region | 'multiple'): string => {
    const colors: Record<Region, string> = {
      hernand: '#5BAA5B',
      pailune: '#5B8FA8',
      demeniss: '#8B7530',
      delesyia: '#7B5EA7',
      desert: '#C0392B',
      abyss: '#8B4789',
    };
    if (regionId === 'multiple') return '#6B7280';
    return colors[regionId];
  };

  const getElementStyle = (element: Element): { bg: string; text: string; label: string } => {
    const styles: Record<Element, { bg: string; text: string; label: string }> = {
      physical: { bg: 'bg-gray-600/30 border-gray-500', text: 'text-gray-300', label: 'Physical' },
      fire: { bg: 'bg-red-600/30 border-red-500', text: 'text-red-300', label: 'Fire' },
      frost: { bg: 'bg-cyan-600/30 border-cyan-500', text: 'text-cyan-300', label: 'Frost' },
      shock: { bg: 'bg-yellow-600/30 border-yellow-500', text: 'text-yellow-300', label: 'Shock' },
      abyss: { bg: 'bg-purple-600/30 border-purple-500', text: 'text-purple-300', label: 'Abyss' },
    };
    return styles[element];
  };

  const clearFilters = () => {
    setRegionFilters(new Set());
    setTypeFilters(new Set());
    setElementFilters(new Set());
    setSearchQuery('');
  };

  const filteredEnemies = useMemo(() => {
    return ENEMIES.filter(enemy => {
      if (regionFilters.size > 0 && enemy.region !== 'multiple' && !regionFilters.has(enemy.region as Region)) return false;
      if (typeFilters.size > 0 && !typeFilters.has(enemy.type)) return false;
      if (elementFilters.size > 0 && !elementFilters.has(enemy.element)) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          enemy.name.toLowerCase().includes(query) ||
          getRegionName(enemy.region).toLowerCase().includes(query) ||
          enemy.type.toLowerCase().includes(query) ||
          enemy.location.toLowerCase().includes(query) ||
          enemy.drops.some(d => d.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [searchQuery, regionFilters, typeFilters, elementFilters]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Bestiary</h1>
        <p className="text-gray-400">
          Encyclopedia of creatures across Pywel. 401 creatures confirmed in the Knowledge Codex.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, region, type, location, or drop..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-pywel-card border border-pywel-border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors font-semibold text-sm ${
            showFilters || hasActiveFilters
              ? 'bg-gold-600/20 border-gold-600 text-gold-300'
              : 'bg-pywel-card border-pywel-border text-gray-400 hover:text-gold-300'
          }`}
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="bg-gold-600 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {regionFilters.size + typeFilters.size + elementFilters.size}
            </span>
          )}
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-pywel-card border border-pywel-border rounded-lg p-5 space-y-5">
          <div>
            <p className="text-xs font-cinzel font-semibold text-gold-400 uppercase tracking-wider mb-3">Region</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setRegionFilters(new Set())}
                className={`px-3 py-1.5 rounded-full font-semibold text-xs transition-colors ${
                  regionFilters.size === 0
                    ? 'bg-gold-600 text-black'
                    : 'bg-pywel-bg border border-pywel-border text-gray-300 hover:text-gold-300'
                }`}
              >
                All Regions
              </button>
              {REGION_OPTIONS.map(r => (
                <button
                  key={r.value}
                  onClick={() => toggleFilter(regionFilters, r.value, setRegionFilters)}
                  className={`px-3 py-1.5 rounded-full font-semibold text-xs transition-colors ${
                    regionFilters.has(r.value)
                      ? 'bg-gold-600 text-black'
                      : 'bg-pywel-bg border border-pywel-border text-gray-300 hover:text-gold-300'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {TYPE_OPTIONS.length > 0 && (
            <div>
              <p className="text-xs font-cinzel font-semibold text-gold-400 uppercase tracking-wider mb-3">Type</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setTypeFilters(new Set())}
                  className={`px-3 py-1.5 rounded-full font-semibold text-xs transition-colors ${
                    typeFilters.size === 0
                      ? 'bg-gold-600 text-black'
                      : 'bg-pywel-bg border border-pywel-border text-gray-300 hover:text-gold-300'
                  }`}
                >
                  All Types
                </button>
                {TYPE_OPTIONS.map(t => (
                  <button
                    key={t}
                    onClick={() => toggleFilter(typeFilters, t, setTypeFilters)}
                    className={`px-3 py-1.5 rounded-full font-semibold text-xs transition-colors ${
                      typeFilters.has(t)
                        ? 'bg-gold-600 text-black'
                        : 'bg-pywel-bg border border-pywel-border text-gray-300 hover:text-gold-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-cinzel font-semibold text-gold-400 uppercase tracking-wider mb-3">Element</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setElementFilters(new Set())}
                className={`px-3 py-1.5 rounded-full font-semibold text-xs transition-colors ${
                  elementFilters.size === 0
                    ? 'bg-gold-600 text-black'
                    : 'bg-pywel-bg border border-pywel-border text-gray-300 hover:text-gold-300'
                }`}
              >
                All Elements
              </button>
              {ELEMENT_OPTIONS.map(el => (
                <button
                  key={el.value}
                  onClick={() => toggleFilter(elementFilters, el.value, setElementFilters)}
                  className={`px-3 py-1.5 rounded-full font-semibold text-xs transition-colors ${
                    elementFilters.has(el.value)
                      ? 'bg-gold-600 text-black'
                      : 'bg-pywel-bg border border-pywel-border text-gray-300 hover:text-gold-300'
                  }`}
                >
                  {el.label}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-gold-400 hover:text-gold-300 underline transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {ENEMIES.length === 0 ? (
        <div className="text-center py-20">
          <div className="bg-pywel-card border border-pywel-border rounded-xl p-12 max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-gold-400/40 mx-auto mb-4" />
            <h2 className="font-cinzel text-xl font-bold text-gold-400 mb-3">Being Catalogued</h2>
            <p className="text-gray-400 mb-2">
              The bestiary is being compiled from the Knowledge Codex.
            </p>
            <p className="text-gray-500 text-sm">
              401 creatures across all regions of Pywel will be documented here. Check back after launch as entries are verified and added.
            </p>
          </div>
        </div>
      ) : (
        <>
          {(hasActiveFilters || searchQuery.trim()) && (
            <p className="text-sm text-gray-500">
              Showing {filteredEnemies.length} of {ENEMIES.length} creatures
            </p>
          )}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gold-600/50">
                  <th className="px-4 py-3 text-left text-xs font-cinzel font-bold text-gold-400">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-cinzel font-bold text-gold-400">Region</th>
                  <th className="px-4 py-3 text-left text-xs font-cinzel font-bold text-gold-400">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-cinzel font-bold text-gold-400">Element</th>
                  <th className="px-4 py-3 text-left text-xs font-cinzel font-bold text-gold-400">Weak To</th>
                  <th className="px-4 py-3 text-left text-xs font-cinzel font-bold text-gold-400">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-cinzel font-bold text-gold-400">Drops</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pywel-border">
                {filteredEnemies.map((enemy, i) => (
                  <tr key={i} className="hover:bg-pywel-card-hover transition">
                    <td className="px-4 py-3 font-semibold text-gray-200">{enemy.name}</td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: getRegionColor(enemy.region) }}
                      >
                        {getRegionName(enemy.region)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{enemy.type}</td>
                    <td className="px-4 py-3">
                      {(() => { const s = getElementStyle(enemy.element); return (
                        <span className={`px-2 py-1 rounded text-xs font-semibold border ${s.bg} ${s.text}`}>{s.label}</span>
                      ); })()}
                    </td>
                    <td className="px-4 py-3">
                      {enemy.weakness ? (() => { const s = getElementStyle(enemy.weakness); return (
                        <span className={`px-2 py-1 rounded text-xs font-semibold border ${s.bg} ${s.text}`}>{s.label}</span>
                      ); })() : <span className="text-xs text-gray-600">???</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">{enemy.location}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {enemy.drops.map((drop, j) => (
                          <span key={j} className="px-2 py-0.5 bg-pywel-bg border border-pywel-border rounded text-xs text-gold-300">
                            {drop}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
