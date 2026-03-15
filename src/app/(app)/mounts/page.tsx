'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';
import { MOUNTS, REGIONS } from '@/lib/game-data';
import { useProgress } from '@/hooks/use-progress';
import SignInPrompt from '@/components/SignInPrompt';
import type { MountCategory, Region } from '@/types/game-data';

type SortField = 'name' | 'category' | 'region' | 'speed' | 'combat' | 'stamina';
type SortDir = 'asc' | 'desc';

const CATEGORY_OPTIONS: { label: string; value: MountCategory }[] = [
  { label: 'Horses', value: 'horse' },
  { label: 'Bears', value: 'bear' },
  { label: 'Raptors', value: 'raptor' },
  { label: 'Lizards', value: 'lizard' },
  { label: 'Wyverns', value: 'wyvern' },
  { label: 'Mechanical', value: 'mechanical' },
  { label: 'Dinosaurs', value: 'dinosaur' },
  { label: 'Exotic', value: 'exotic' },
];

const REGION_OPTIONS: { label: string; value: Region | 'multiple' | 'abyss' }[] = [
  ...REGIONS.map(r => ({ label: r.name, value: r.id as Region | 'multiple' | 'abyss' })),
  { label: 'Abyss', value: 'abyss' as Region | 'multiple' | 'abyss' },
  { label: 'Multiple', value: 'multiple' as Region | 'multiple' | 'abyss' },
];

const getCategoryIcon = (cat: MountCategory): string => {
  const icons: Record<MountCategory, string> = {
    horse: '\uD83D\uDC0E',
    bear: '\uD83D\uDC3B',
    raptor: '\uD83E\uDD96',
    lizard: '\uD83E\uDD8E',
    wyvern: '\uD83D\uDC09',
    mechanical: '\u2699\uFE0F',
    dinosaur: '\uD83E\uDD95',
    exotic: '\u2728',
  };
  return icons[cat];
};

const getCategoryLabel = (cat: MountCategory): string => {
  const labels: Record<MountCategory, string> = {
    horse: 'Horse',
    bear: 'Bear',
    raptor: 'Raptor',
    lizard: 'Lizard',
    wyvern: 'Wyvern',
    mechanical: 'Mechanical',
    dinosaur: 'Dinosaur',
    exotic: 'Exotic',
  };
  return labels[cat];
};

const getRegionColor = (regionId: string): string => {
  const colors: Record<string, string> = {
    hernand: '#5BAA5B',
    pailune: '#5B8FA8',
    demeniss: '#8B7530',
    delesyia: '#7B5EA7',
    desert: '#C0392B',
    abyss: '#8B4789',
    multiple: '#6B7280',
  };
  return colors[regionId] || '#6B7280';
};

const getRegionName = (regionId: string): string => {
  const region = REGIONS.find(r => r.id === regionId);
  if (region) return region.name;
  if (regionId === 'abyss') return 'Abyss';
  if (regionId === 'multiple') return 'Multiple';
  return regionId.charAt(0).toUpperCase() + regionId.slice(1);
};

export default function MountsPage() {
  const { isCompleted, toggle, countCompleted, loading, isAuthenticated } = useProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilters, setCategoryFilters] = useState<Set<MountCategory>>(new Set());
  const [regionFilters, setRegionFilters] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [expandedMounts, setExpandedMounts] = useState<Set<number>>(new Set());

  const hasActiveFilters = categoryFilters.size > 0 || regionFilters.size > 0;

  const mountKeys = MOUNTS.map((_, i) => `mount-${i}`);
  const obtainedCount = countCompleted('mount', mountKeys);

  const toggleFilter = <T,>(set: Set<T>, value: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const toggleExpanded = (idx: number) => {
    setExpandedMounts(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
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
    setCategoryFilters(new Set());
    setRegionFilters(new Set());
    setSearchQuery('');
  };

  const filteredMounts = useMemo(() => {
    return MOUNTS
      .map((mount, index) => ({ mount, index }))
      .filter(({ mount }) => {
        if (categoryFilters.size > 0 && !categoryFilters.has(mount.category)) return false;
        if (regionFilters.size > 0 && !regionFilters.has(mount.region)) return false;
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          return (
            mount.name.toLowerCase().includes(query) ||
            getCategoryLabel(mount.category).toLowerCase().includes(query) ||
            getRegionName(mount.region).toLowerCase().includes(query) ||
            mount.acquisition.toLowerCase().includes(query) ||
            (mount.special && mount.special.toLowerCase().includes(query))
          );
        }
        return true;
      })
      .sort((a, b) => {
        let cmp = 0;
        switch (sortField) {
          case 'name':
            cmp = a.mount.name.localeCompare(b.mount.name);
            break;
          case 'category':
            cmp = a.mount.category.localeCompare(b.mount.category);
            break;
          case 'region':
            cmp = getRegionName(a.mount.region).localeCompare(getRegionName(b.mount.region));
            break;
          case 'speed':
            cmp = a.mount.speed - b.mount.speed;
            break;
          case 'combat':
            cmp = a.mount.combat - b.mount.combat;
            break;
          case 'stamina':
            cmp = a.mount.stamina - b.mount.stamina;
            break;
        }
        return sortDir === 'asc' ? cmp : -cmp;
      });
  }, [searchQuery, categoryFilters, regionFilters, sortField, sortDir]);

  const renderStatBar = (value: number, color: string) => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-pywel-bg rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all ${color}`}
            style={{ width: `${value}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-300 font-semibold w-6 text-right">{value}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Mounts</h1>
        <p className="text-gray-400">Track and compare all 29 confirmed mounts across Pywel.</p>
      </div>

      {/* Overall progress */}
      <div className="bg-pywel-card border border-pywel-border rounded-lg p-4">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-sm font-cinzel font-semibold text-gold-400">Mounts Obtained</span>
          <span className="text-sm text-gold-300">{obtainedCount} / {MOUNTS.length}</span>
        </div>
        <div className="w-full bg-pywel-bg rounded-full h-2.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-300"
            style={{ width: `${(obtainedCount / MOUNTS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, type, region, ability, or acquisition..."
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
              {categoryFilters.size + regionFilters.size}
            </span>
          )}
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-pywel-card border border-pywel-border rounded-lg p-5 space-y-5">
          {/* Category Filter */}
          <div>
            <p className="text-xs font-cinzel font-semibold text-gold-400 uppercase tracking-wider mb-3">Type</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategoryFilters(new Set())}
                className={`px-3 py-1.5 rounded-full font-semibold text-xs transition-colors ${
                  categoryFilters.size === 0
                    ? 'bg-gold-600 text-black'
                    : 'bg-pywel-bg border border-pywel-border text-gray-300 hover:text-gold-300'
                }`}
              >
                All Types
              </button>
              {CATEGORY_OPTIONS.map(c => (
                <button
                  key={c.value}
                  onClick={() => toggleFilter(categoryFilters, c.value, setCategoryFilters)}
                  className={`px-3 py-1.5 rounded-full font-semibold text-xs transition-colors ${
                    categoryFilters.has(c.value)
                      ? 'bg-gold-600 text-black'
                      : 'bg-pywel-bg border border-pywel-border text-gray-300 hover:text-gold-300'
                  }`}
                >
                  {getCategoryIcon(c.value)} {c.label}
                </button>
              ))}
            </div>
          </div>

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
          Showing {filteredMounts.length} of {MOUNTS.length} mounts
        </p>
      )}

      {!isAuthenticated && !loading && (
        <SignInPrompt message="Sign in to track your mount collection" compact />
      )}

      {loading ? (
        <div className="text-center text-gray-400">Loading mounts...</div>
      ) : filteredMounts.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-pywel-card border border-pywel-border rounded-xl p-10 max-w-md mx-auto">
            <p className="text-gray-400 text-lg mb-2">No mounts found</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMounts.map(({ mount, index }) => {
            const mountKey = `mount-${index}`;
            const isObtained = isCompleted('mount', mountKey);
            const isExpanded = expandedMounts.has(index);

            return (
              <div
                key={mountKey}
                onClick={() => toggleExpanded(index)}
                className={`bg-pywel-card rounded-lg border transition-all cursor-pointer ${
                  isObtained
                    ? 'border-gold-600/40 bg-pywel-secondary/50'
                    : 'border-pywel-border hover:border-gold-500/50'
                }`}
              >
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isObtained}
                      onChange={() => toggle('mount', mountKey)}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1 w-4 h-4 cursor-pointer accent-gold-400 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getCategoryIcon(mount.category)}</span>
                        <h3 className={`text-lg font-cinzel font-semibold ${
                          isObtained ? 'text-gray-500 line-through' : 'text-gold-400'
                        }`}>
                          {mount.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">{getCategoryLabel(mount.category)}</span>
                        <span className="text-gray-600">|</span>
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                          style={{ backgroundColor: getRegionColor(mount.region) }}
                        >
                          {getRegionName(mount.region)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-gold-400/60 ml-auto flex-shrink-0">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Quick stats row */}
                  <div className="flex gap-4 mt-3 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="text-blue-400 font-semibold">SPD</span>
                      <span className="text-gray-300">{mount.speed}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-red-400 font-semibold">CMB</span>
                      <span className="text-gray-300">{mount.combat}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-green-400 font-semibold">STA</span>
                      <span className="text-gray-300">{mount.stamina}</span>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="space-y-3 pt-3 mt-3 border-t border-pywel-border">
                      <div>
                        <label className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Speed</label>
                        {renderStatBar(mount.speed, 'bg-gradient-to-r from-blue-500 to-blue-400')}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-red-400 uppercase tracking-wider">Combat</label>
                        {renderStatBar(mount.combat, 'bg-gradient-to-r from-red-500 to-red-400')}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-green-400 uppercase tracking-wider">Stamina</label>
                        {renderStatBar(mount.stamina, 'bg-gradient-to-r from-green-500 to-green-400')}
                      </div>

                      {mount.special && (
                        <div className="pt-2 mt-2 border-t border-pywel-border">
                          <label className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Special Ability</label>
                          <p className="text-sm text-gray-300 mt-1">{mount.special}</p>
                        </div>
                      )}

                      <div className="pt-2 mt-2 border-t border-pywel-border">
                        <label className="text-xs font-semibold text-gold-400 uppercase tracking-wider">How to Obtain</label>
                        <p className="text-sm text-gray-400 mt-1">{mount.acquisition}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
