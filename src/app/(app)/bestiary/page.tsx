'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ArrowUpDown } from 'lucide-react';
import { BOSSES, REGIONS } from '@/lib/game-data';
import { useProgress } from '@/hooks/use-progress';
import SignInPrompt from '@/components/SignInPrompt';
import type { Difficulty, Region, Element } from '@/types/game-data';

type SortField = 'name' | 'region' | 'type' | 'difficulty' | 'reward';
type SortDir = 'asc' | 'desc';

const DIFFICULTY_ORDER: Record<Difficulty, number> = {
  normal: 0,
  hard: 1,
  extreme: 2,
  legendary: 3,
};

const REGION_OPTIONS: { label: string; value: Region }[] = [
  ...REGIONS.map(r => ({ label: r.name, value: r.id })),
  { label: 'Abyss', value: 'abyss' as Region },
];

const TYPE_OPTIONS = Array.from(new Set(BOSSES.map(b => b.type))).sort();

const DIFFICULTY_OPTIONS: { label: string; value: Difficulty }[] = [
  { label: 'Normal', value: 'normal' },
  { label: 'Hard', value: 'hard' },
  { label: 'Extreme', value: 'extreme' },
  { label: 'Legendary', value: 'legendary' },
];

export default function BestiaryPage() {
  const { isCompleted, toggle, loading, isAuthenticated } = useProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [regionFilters, setRegionFilters] = useState<Set<Region>>(new Set());
  const [typeFilters, setTypeFilters] = useState<Set<string>>(new Set());
  const [difficultyFilters, setDifficultyFilters] = useState<Set<Difficulty>>(new Set());
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const hasActiveFilters = regionFilters.size > 0 || typeFilters.size > 0 || difficultyFilters.size > 0;

  const toggleFilter = <T,>(set: Set<T>, value: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    setter(next);
  };

  const getDifficultyColor = (difficulty: Difficulty): string => {
    const colors: Record<Difficulty, string> = {
      normal: 'bg-green-600/20 border-green-600 text-green-300',
      hard: 'bg-amber-600/20 border-amber-600 text-amber-300',
      extreme: 'bg-orange-600/20 border-orange-600 text-orange-300',
      legendary: 'bg-purple-600/20 border-purple-600 text-purple-300',
    };
    return colors[difficulty];
  };

  const getRegionColor = (regionId: Region): string => {
    const colors: Record<Region, string> = {
      hernand: '#5BAA5B',
      pailune: '#5B8FA8',
      demeniss: '#8B7530',
      delesyia: '#7B5EA7',
      desert: '#C0392B',
      abyss: '#8B4789',
    };
    return colors[regionId];
  };

  const getRegionName = (regionId: Region): string => {
    const region = REGIONS.find(r => r.id === regionId);
    if (region) return region.name;
    return regionId.charAt(0).toUpperCase() + regionId.slice(1);
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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const clearFilters = () => {
    setRegionFilters(new Set());
    setTypeFilters(new Set());
    setDifficultyFilters(new Set());
    setSearchQuery('');
  };

  const filteredBosses = useMemo(() => {
    return BOSSES
      .filter(boss => {
        // Region filter (multi-select)
        if (regionFilters.size > 0 && !regionFilters.has(boss.region)) return false;
        // Type filter (multi-select)
        if (typeFilters.size > 0 && !typeFilters.has(boss.type)) return false;
        // Difficulty filter (multi-select)
        if (difficultyFilters.size > 0 && !difficultyFilters.has(boss.difficulty)) return false;
        // Search
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          return (
            boss.name.toLowerCase().includes(query) ||
            getRegionName(boss.region).toLowerCase().includes(query) ||
            boss.type.toLowerCase().includes(query) ||
            boss.difficulty.toLowerCase().includes(query) ||
            boss.reward.toLowerCase().includes(query)
          );
        }
        return true;
      })
      .sort((a, b) => {
        let cmp = 0;
        switch (sortField) {
          case 'name':
            cmp = a.name.localeCompare(b.name);
            break;
          case 'region':
            cmp = getRegionName(a.region).localeCompare(getRegionName(b.region));
            break;
          case 'type':
            cmp = a.type.localeCompare(b.type);
            break;
          case 'difficulty':
            cmp = DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty];
            break;
          case 'reward':
            cmp = a.reward.localeCompare(b.reward);
            break;
        }
        return sortDir === 'asc' ? cmp : -cmp;
      });
  }, [searchQuery, regionFilters, typeFilters, difficultyFilters, sortField, sortDir]);

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th
      className="px-4 py-3 text-left text-xs font-cinzel font-bold text-gold-400 cursor-pointer hover:text-gold-300 transition-colors select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown className={`w-3 h-3 ${sortField === field ? 'text-gold-300' : 'text-gray-600'}`} />
      </div>
    </th>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Bestiary</h1>
        <p className="text-gray-400">Track defeated bosses and legendary creatures across Pywel.</p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, region, type, difficulty, or reward..."
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
              {regionFilters.size + typeFilters.size + difficultyFilters.size}
            </span>
          )}
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-pywel-card border border-pywel-border rounded-lg p-5 space-y-5">
          {/* Region Filter */}
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

          {/* Type Filter */}
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

          {/* Difficulty Filter */}
          <div>
            <p className="text-xs font-cinzel font-semibold text-gold-400 uppercase tracking-wider mb-3">Difficulty</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setDifficultyFilters(new Set())}
                className={`px-3 py-1.5 rounded-full font-semibold text-xs transition-colors ${
                  difficultyFilters.size === 0
                    ? 'bg-gold-600 text-black'
                    : 'bg-pywel-bg border border-pywel-border text-gray-300 hover:text-gold-300'
                }`}
              >
                All Difficulties
              </button>
              {DIFFICULTY_OPTIONS.map(d => (
                <button
                  key={d.value}
                  onClick={() => toggleFilter(difficultyFilters, d.value, setDifficultyFilters)}
                  className={`px-3 py-1.5 rounded-full font-semibold text-xs transition-colors ${
                    difficultyFilters.has(d.value)
                      ? 'bg-gold-600 text-black'
                      : 'bg-pywel-bg border border-pywel-border text-gray-300 hover:text-gold-300'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
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

      {/* Results count */}
      {(hasActiveFilters || searchQuery.trim()) && (
        <p className="text-sm text-gray-500">
          Showing {filteredBosses.length} of {BOSSES.length} bosses
        </p>
      )}

      {!isAuthenticated && !loading && (
        <SignInPrompt message="Sign in to track your boss defeats" compact />
      )}

      {loading ? (
        <div className="text-center text-gray-400">Loading bosses...</div>
      ) : filteredBosses.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-pywel-card border border-pywel-border rounded-xl p-10 max-w-md mx-auto">
            <p className="text-gray-400 text-lg mb-2">No bosses found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 text-sm text-gold-400 hover:text-gold-300 underline transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gold-600/50">
                <th className="px-4 py-3 text-left text-xs font-cinzel font-bold text-gold-400 w-8"></th>
                <SortHeader field="name">Boss Name</SortHeader>
                <SortHeader field="region">Region</SortHeader>
                <SortHeader field="type">Type</SortHeader>
                <SortHeader field="difficulty">Difficulty</SortHeader>
                <th className="px-4 py-3 text-left text-xs font-cinzel font-bold text-gold-400">Element</th>
                <th className="px-4 py-3 text-left text-xs font-cinzel font-bold text-gold-400">Weak To</th>
                <SortHeader field="reward">Reward</SortHeader>
              </tr>
            </thead>
            <tbody className="divide-y divide-pywel-border">
              {filteredBosses.map((boss) => {
                const bossKey = `boss-${BOSSES.indexOf(boss)}`;
                const isDefeated = isCompleted('boss', bossKey);

                return (
                  <tr
                    key={bossKey}
                    className={`transition ${isDefeated ? 'bg-pywel-secondary/50' : 'hover:bg-pywel-card-hover'}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isDefeated}
                        onChange={() => toggle('boss', bossKey)}
                        className="w-4 h-4 cursor-pointer accent-gold-400"
                      />
                    </td>
                    <td className={`px-4 py-3 font-semibold ${isDefeated ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                      {boss.name}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: getRegionColor(boss.region) }}
                      >
                        {getRegionName(boss.region)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{boss.type}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold border ${getDifficultyColor(boss.difficulty)}`}>
                        {boss.difficulty.charAt(0).toUpperCase() + boss.difficulty.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {(() => { const s = getElementStyle(boss.element); return (
                        <span className={`px-2 py-1 rounded text-xs font-semibold border ${s.bg} ${s.text}`}>{s.label}</span>
                      ); })()}
                    </td>
                    <td className="px-4 py-3">
                      {boss.weakness ? (() => { const s = getElementStyle(boss.weakness); return (
                        <span className={`px-2 py-1 rounded text-xs font-semibold border ${s.bg} ${s.text}`}>{s.label}</span>
                      ); })() : <span className="text-xs text-gray-600">???</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-gold-300">{boss.reward}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
