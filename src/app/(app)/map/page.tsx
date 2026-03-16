'use client';

import { useState } from 'react';
import Image from 'next/image';
import { REGIONS, BOSSES, MOUNTS, COLLECTIBLES } from '@/lib/game-data';
import {
  Skull, Footprints, Sparkles, Shield, X, MapPin,
  Swords, Flame, Zap, Snowflake, Ghost, Star,
  Castle, Tent, Landmark, Pickaxe, Dices, Trees,
} from 'lucide-react';
import type { Region, Difficulty, Element, RegionPOI } from '@/types/game-data';

// ═══════════════════════════════════════
// CONSTANTS & HELPERS
// ═══════════════════════════════════════

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  normal: 'Normal',
  hard: 'Hard',
  extreme: 'Extreme',
  legendary: 'Legendary',
};

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  normal:    'text-green-400 bg-green-400/10 border-green-400/30',
  hard:      'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  extreme:   'text-orange-400 bg-orange-400/10 border-orange-400/30',
  legendary: 'text-red-400 bg-red-400/10 border-red-400/30',
};

const ELEMENT_ICONS: Record<Element, React.ReactNode> = {
  physical: <Swords className="w-3.5 h-3.5" />,
  fire:     <Flame className="w-3.5 h-3.5" />,
  shock:    <Zap className="w-3.5 h-3.5" />,
  frost:    <Snowflake className="w-3.5 h-3.5" />,
  abyss:    <Ghost className="w-3.5 h-3.5" />,
};

const ELEMENT_COLORS: Record<Element, string> = {
  physical: 'text-gray-300',
  fire:     'text-orange-400',
  shock:    'text-yellow-300',
  frost:    'text-cyan-300',
  abyss:    'text-purple-400',
};

const POI_ICONS: Record<RegionPOI['type'], React.ReactNode> = {
  town:       <MapPin className="w-3.5 h-3.5" />,
  dungeon:    <Pickaxe className="w-3.5 h-3.5" />,
  landmark:   <Landmark className="w-3.5 h-3.5" />,
  stronghold: <Castle className="w-3.5 h-3.5" />,
  ruins:      <Trees className="w-3.5 h-3.5" />,
  arena:      <Dices className="w-3.5 h-3.5" />,
  camp:       <Tent className="w-3.5 h-3.5" />,
  shrine:     <Star className="w-3.5 h-3.5" />,
  other:      <MapPin className="w-3.5 h-3.5" />,
};

const POI_COLORS: Record<RegionPOI['type'], string> = {
  town:       'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  dungeon:    'text-red-400 bg-red-400/10 border-red-400/20',
  landmark:   'text-gold-400 bg-gold-400/10 border-gold-400/20',
  stronghold: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  ruins:      'text-amber-600 bg-amber-600/10 border-amber-600/20',
  arena:      'text-pink-400 bg-pink-400/10 border-pink-400/20',
  camp:       'text-teal-400 bg-teal-400/10 border-teal-400/20',
  shrine:     'text-violet-400 bg-violet-400/10 border-violet-400/20',
  other:      'text-gray-400 bg-gray-400/10 border-gray-400/20',
};

const getRegionBosses   = (id: Region) => BOSSES.filter(b => b.region === id);
const getRegionMounts   = (id: Region) => MOUNTS.filter(m => m.region === id);

const getRegionCollectibles = (regionId: string) => {
  const regionNames: Record<string, string[]> = {
    hernand:  ['Hernand'],
    pailune:  ['Pailune'],
    demeniss: ['Demeniss'],
    delesyia: ['Delesyia'],
    desert:   ['Crimson Desert', 'Desert'],
    abyss:    ['Abyss'],
  };
  const names = regionNames[regionId] || [];
  const results: { name: string; location: string; category: string }[] = [];
  for (const items of Object.values(COLLECTIBLES)) {
    items.forEach(c => {
      if (names.some(n => c.location.includes(n))) results.push(c);
    });
  }
  return results;
};

const getDifficultyRange = (regionId: Region): string => {
  const bosses = getRegionBosses(regionId);
  if (bosses.length === 0) return 'No bosses';
  const order: Difficulty[] = ['normal', 'hard', 'extreme', 'legendary'];
  const difficulties = bosses.map(b => order.indexOf(b.difficulty));
  const min = Math.min(...difficulties);
  const max = Math.max(...difficulties);
  if (min === max) return DIFFICULTY_LABELS[order[min]];
  return `${DIFFICULTY_LABELS[order[min]]} – ${DIFFICULTY_LABELS[order[max]]}`;
};

// ═══════════════════════════════════════
// REGION MODAL
// ═══════════════════════════════════════

type Tab = 'pois' | 'bosses' | 'mounts' | 'collectibles';

function RegionModal({ regionId, onClose }: { regionId: Region; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('pois');

  const region      = REGIONS.find(r => r.id === regionId)!;
  const bosses      = getRegionBosses(regionId);
  const mounts      = getRegionMounts(regionId);
  const collectibles = getRegionCollectibles(regionId);
  const pois        = region.pois;

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'pois',        label: 'Locations',    count: pois.length },
    { key: 'bosses',      label: 'Bosses',       count: bosses.length },
    { key: 'mounts',      label: 'Mounts',       count: mounts.length },
    { key: 'collectibles',label: 'Collectibles', count: collectibles.length },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-pywel-card border border-pywel-border rounded-xl overflow-hidden flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Modal Header ── */}
        <div
          className="relative flex-shrink-0 px-6 py-5 border-b border-pywel-border"
          style={{ borderLeftWidth: 4, borderLeftColor: region.color }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-cinzel font-bold text-gold-400 leading-tight">{region.name}</h2>
              <p className="text-sm text-gray-400 mt-0.5">{region.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-pywel-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Modal Body ── */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">

          {/* Left column — region overview */}
          <div className="md:w-72 flex-shrink-0 border-b md:border-b-0 md:border-r border-pywel-border p-6 space-y-5 overflow-y-auto">

            <p className="text-sm text-gray-300 leading-relaxed">{region.description}</p>

            {/* Stats */}
            <div className="space-y-2">
              <p className="text-xs font-cinzel font-semibold text-gold-400 uppercase tracking-wider">At a Glance</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-pywel-secondary rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-red-400">{bosses.length}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Bosses</p>
                </div>
                <div className="bg-pywel-secondary rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-blue-400">{mounts.length}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Mounts</p>
                </div>
                <div className="bg-pywel-secondary rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-purple-400">{collectibles.length}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Collectibles</p>
                </div>
                <div className="bg-pywel-secondary rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-emerald-400">{pois.length}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Locations</p>
                </div>
              </div>
            </div>

            {/* Difficulty range */}
            <div className="space-y-1.5">
              <p className="text-xs font-cinzel font-semibold text-gold-400 uppercase tracking-wider">Difficulty Range</p>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-amber-300 font-semibold">{getDifficultyRange(regionId)}</span>
              </div>
            </div>

            {/* Feature tags */}
            <div className="space-y-2">
              <p className="text-xs font-cinzel font-semibold text-gold-400 uppercase tracking-wider">Features</p>
              <div className="flex flex-wrap gap-1.5">
                {region.features.map(feat => (
                  <span key={feat} className="text-xs bg-pywel-secondary text-gold-300 px-2 py-1 rounded">
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — tabs */}
          <div className="flex-1 flex flex-col min-h-0 min-w-0">

            {/* Tab bar */}
            <div className="flex-shrink-0 flex border-b border-pywel-border px-4 pt-2 gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors border-b-2 -mb-px ${
                    activeTab === tab.key
                      ? 'text-gold-400 border-gold-400 bg-pywel-secondary/50'
                      : 'text-gray-400 border-transparent hover:text-gray-200'
                  }`}
                >
                  {tab.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.key ? 'bg-gold-400/20 text-gold-300' : 'bg-pywel-secondary text-gray-500'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto p-5">

              {/* LOCATIONS TAB */}
              {activeTab === 'pois' && (
                <div className="space-y-2">
                  {pois.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No locations confirmed yet.</p>
                  ) : (
                    pois.map(poi => (
                      <div key={poi.name} className="flex items-center gap-3 p-3 bg-pywel-secondary rounded-lg">
                        <span className={`flex-shrink-0 p-1.5 rounded-md border ${POI_COLORS[poi.type]}`}>
                          {POI_ICONS[poi.type]}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-100">{poi.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{poi.type}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* BOSSES TAB */}
              {activeTab === 'bosses' && (
                <div className="space-y-3">
                  {bosses.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No bosses confirmed for this region.</p>
                  ) : (
                    bosses.map(boss => (
                      <div key={boss.name} className="p-4 bg-pywel-secondary rounded-lg space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-cinzel font-semibold text-gray-100">{boss.name}</p>
                          <span className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[boss.difficulty]}`}>
                            {DIFFICULTY_LABELS[boss.difficulty]}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="text-gray-500">{boss.type}</span>
                          <span className={`flex items-center gap-1 ${ELEMENT_COLORS[boss.element]}`}>
                            {ELEMENT_ICONS[boss.element]}
                            <span className="capitalize">{boss.element}</span>
                          </span>
                          {boss.weakness && (
                            <span className="text-gray-500">
                              Weak: <span className={`${ELEMENT_COLORS[boss.weakness]} capitalize`}>{boss.weakness}</span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-amber-300">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>{boss.reward}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* MOUNTS TAB */}
              {activeTab === 'mounts' && (
                <div className="space-y-3">
                  {mounts.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No mounts confirmed for this region.</p>
                  ) : (
                    mounts.map(mount => (
                      <div key={mount.name} className="p-4 bg-pywel-secondary rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-cinzel font-semibold text-gray-100">{mount.name}</p>
                          <span className="text-xs text-gray-500 capitalize px-2 py-0.5 bg-pywel-card rounded-full border border-pywel-border">
                            {mount.category}
                          </span>
                        </div>
                        {/* Stat bars */}
                        <div className="space-y-1.5">
                          {[
                            { label: 'Speed',  value: mount.speed,  color: 'bg-blue-500' },
                            { label: 'Combat', value: mount.combat, color: 'bg-red-500' },
                            { label: 'Stamina',value: mount.stamina,color: 'bg-green-500' },
                          ].map(stat => (
                            <div key={stat.label} className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-14">{stat.label}</span>
                              <div className="flex-1 bg-pywel-card rounded-full h-1.5 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${stat.color}`}
                                  style={{ width: `${stat.value}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-400 w-7 text-right">{stat.value}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400">{mount.acquisition}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* COLLECTIBLES TAB */}
              {activeTab === 'collectibles' && (
                <div className="space-y-2">
                  {collectibles.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No collectibles confirmed for this region.</p>
                  ) : (
                    collectibles.map(c => (
                      <div key={c.name} className="flex items-center gap-3 p-3 bg-pywel-secondary rounded-lg">
                        <span className="flex-shrink-0 text-xs font-bold uppercase tracking-wider text-gray-500 w-12 text-center bg-pywel-card border border-pywel-border px-1.5 py-1 rounded">
                          {c.category === 'fast-travel' ? 'FT' : c.category.slice(0, 3).toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-100 truncate">{c.name}</p>
                          <p className="text-xs text-gray-500 truncate">{c.location}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// MAP PAGE
// ═══════════════════════════════════════

export default function MapPage() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">World Map</h1>
        <p className="text-gray-400">Explore the regions of Pywel. Select a region to view locations, bosses, mounts, and collectibles.</p>
      </div>

      {/* Map image */}
      <div className="bg-pywel-card rounded-lg border border-pywel-border overflow-hidden">
        <div className="relative overflow-hidden" style={{ aspectRatio: '1270 / 847' }}>
          <Image
            src="/assets/pywel-map.webp"
            alt="Map of Pywel"
            width={1587}
            height={2245}
            className="absolute opacity-70"
            style={{
              width: '125%',
              maxWidth: 'none',
              height: 'auto',
              top: '-33.55%',
              left: '-12.52%',
            }}
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-gold-300 mb-4">
              Interactive Map
            </h2>
            <p className="text-xl text-gold-400/80 font-cinzel">Coming Soon</p>
          </div>
        </div>
      </div>

      {/* Region cards */}
      <div>
        <h2 className="text-xl font-cinzel font-bold text-gold-400 mb-4">Regions of Pywel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REGIONS.map(region => {
            const bosses     = getRegionBosses(region.id);
            const mounts     = getRegionMounts(region.id);
            const collectibles = getRegionCollectibles(region.id);

            return (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className="text-left bg-pywel-card rounded-lg border border-pywel-border border-l-4 hover:border-gold-500/50 hover:bg-pywel-secondary/30 transition-all group"
                style={{ borderLeftColor: region.color }}
              >
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-cinzel text-lg font-semibold text-gold-400 group-hover:text-gold-300 transition-colors">
                      {region.name}
                    </h3>
                    <p className="text-xs text-gray-400">{region.subtitle}</p>
                  </div>

                  <p className="text-sm text-gray-300 line-clamp-2">{region.description}</p>

                  {/* Stats row */}
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Skull className="w-3.5 h-3.5 text-red-400" />
                      <span>{bosses.length} boss{bosses.length !== 1 ? 'es' : ''}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Footprints className="w-3.5 h-3.5 text-blue-400" />
                      <span>{mounts.length} mount{mounts.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>{collectibles.length} items</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{region.pois.length} POIs</span>
                    </div>
                  </div>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-1">
                    {region.features.map(feat => (
                      <span key={feat} className="text-xs bg-pywel-secondary text-gold-300 px-2 py-1 rounded">
                        {feat}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-gold-500 group-hover:text-gold-400 transition-colors font-medium">
                    View details →
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Region modal */}
      {selectedRegion && (
        <RegionModal
          regionId={selectedRegion}
          onClose={() => setSelectedRegion(null)}
        />
      )}
    </div>
  );
}
