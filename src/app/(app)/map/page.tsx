'use client';

import { useState } from 'react';
import Image from 'next/image';
import { REGIONS, BOSSES, MOUNTS, COLLECTIBLES, ABYSS_ARTIFACTS } from '@/lib/game-data';
import {
  Skull, Footprints, Sparkles, Shield, X, MapPin,
  Swords, Flame, Zap, Snowflake, Ghost, Star,
  Castle, Tent, Landmark, Pickaxe, Dices, Trees,
  Compass,
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

const getRegionArtifacts = (regionId: Region) => {
  return ABYSS_ARTIFACTS.filter(a => a.region === regionId);
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
// INTERACTIVE SVG MAP
// ═══════════════════════════════════════

interface InteractiveMapProps {
  selectedRegion: Region | null;
  onSelectRegion: (region: Region) => void;
}

function InteractiveWorldMap({ selectedRegion, onSelectRegion }: InteractiveMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);

  const regionData: Record<Region, { color: string; hoverColor: string; polygon: string }> = {
    hernand: {
      color: '#5BAA5B',
      hoverColor: '#6FD56F',
      polygon: 'M 150 200 L 280 180 L 300 260 L 200 280 Z',
    },
    pailune: {
      color: '#5B8FA8',
      hoverColor: '#7AB3D6',
      polygon: 'M 200 50 L 350 40 L 360 150 L 280 140 Z',
    },
    demeniss: {
      color: '#8B7530',
      hoverColor: '#B39D61',
      polygon: 'M 320 200 L 420 190 L 440 280 L 330 290 Z',
    },
    delesyia: {
      color: '#7B5EA7',
      hoverColor: '#A67FD6',
      polygon: 'M 450 180 L 560 170 L 580 260 L 460 270 Z',
    },
    desert: {
      color: '#C0392B',
      hoverColor: '#E74C3C',
      polygon: 'M 200 300 L 450 310 L 480 450 L 150 460 Z',
    },
    abyss: {
      color: '#2C1B47',
      hoverColor: '#45326B',
      polygon: 'M 500 50 L 580 45 L 600 120 L 520 125 Z',
    },
  };

  return (
    <div className="bg-pywel-card rounded-lg border border-pywel-border overflow-hidden p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-cinzel font-bold text-gold-400 flex items-center gap-2">
            <Compass className="w-6 h-6" />
            World Map of Pywel
          </h2>
          <p className="text-sm text-gray-400 mt-1">Click on a region to view details</p>
        </div>
      </div>

      {/* SVG Map Container */}
      <div className="bg-black/40 rounded-lg p-4 border border-pywel-border/50">
        <svg
          viewBox="0 0 600 500"
          className="w-full h-auto"
          style={{ maxHeight: '500px' }}
        >
          {/* Map background with decorative elements */}
          <defs>
            <pattern id="diagonal-hatch" x="4" y="4" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" stroke="#ffffff" strokeWidth="0.5" opacity="0.05" />
            </pattern>
          </defs>

          {/* Background */}
          <rect width="600" height="500" fill="#1a1a2e" />
          <rect width="600" height="500" fill="url(#diagonal-hatch)" opacity="0.3" />

          {/* Regions */}
          {Object.entries(regionData).map(([regionId, data]) => (
            <g key={regionId}>
              {/* Region polygon */}
              <polygon
                points={data.polygon}
                fill={hoveredRegion === regionId || selectedRegion === regionId ? data.hoverColor : data.color}
                fillOpacity={hoveredRegion === regionId || selectedRegion === regionId ? 0.8 : 0.6}
                stroke={selectedRegion === regionId ? '#FFCC00' : '#ffffff'}
                strokeWidth={selectedRegion === regionId ? '2.5' : '1.5'}
                opacity={0.9}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredRegion(regionId as Region)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => onSelectRegion(regionId as Region)}
              />

              {/* Region label - adjusted positions */}
              {hoveredRegion === regionId || selectedRegion === regionId ? (
                <text
                  x={data.polygon.match(/M (\d+)/)?.[1] || '250'}
                  y={data.polygon.match(/M \d+ (\d+)/)?.[1] || '150'}
                  textAnchor="middle"
                  className="font-cinzel font-bold text-sm pointer-events-none"
                  fill="#ffffff"
                  dy={15}
                  stroke="#000000"
                  strokeWidth="2"
                  paintOrder="stroke"
                >
                  {REGIONS.find(r => r.id === regionId)?.name}
                </text>
              ) : null}
            </g>
          ))}

          {/* Compass rose decoration */}
          <g opacity="0.3">
            <circle cx="50" cy="50" r="30" fill="none" stroke="#FFCC00" strokeWidth="1" />
            <line x1="50" y1="25" x2="50" y2="5" stroke="#FFCC00" strokeWidth="1.5" />
            <polygon points="50,5 48,15 52,15" fill="#FFCC00" />
            <text x="50" y="30" textAnchor="middle" fill="#FFCC00" className="text-xs" fontSize="10">N</text>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
        {REGIONS.map(region => (
          <button
            key={region.id}
            onClick={() => onSelectRegion(region.id)}
            className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
              selectedRegion === region.id
                ? 'bg-pywel-secondary border-gold-400 text-gold-400'
                : 'bg-pywel-secondary/50 border-pywel-border/50 text-gray-300 hover:border-pywel-border hover:text-gold-300'
            }`}
          >
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: region.color }}
            />
            <span className="font-medium">{region.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// REGION MODAL
// ═══════════════════════════════════════

type Tab = 'pois' | 'bosses' | 'mounts' | 'collectibles' | 'artifacts';

function RegionModal({ regionId, onClose }: { regionId: Region; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('pois');

  const region      = REGIONS.find(r => r.id === regionId)!;
  const bosses      = getRegionBosses(regionId);
  const mounts      = getRegionMounts(regionId);
  const collectibles = getRegionCollectibles(regionId);
  const artifacts   = getRegionArtifacts(regionId);
  const pois        = region.pois;

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'pois',        label: 'Locations',    count: pois.length },
    { key: 'bosses',      label: 'Bosses',       count: bosses.length },
    { key: 'mounts',      label: 'Mounts',       count: mounts.length },
    { key: 'collectibles',label: 'Collectibles', count: collectibles.length },
    { key: 'artifacts',   label: 'Abyss Artifacts', count: artifacts.length },
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
            <div className="flex-shrink-0 flex border-b border-pywel-border px-4 pt-2 gap-1 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors border-b-2 -mb-px whitespace-nowrap ${
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

              {/* ABYSS ARTIFACTS TAB */}
              {activeTab === 'artifacts' && (
                <div className="space-y-3">
                  {artifacts.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No sealed artifacts found in this region.</p>
                  ) : (
                    artifacts.map(artifact => (
                      <div key={artifact.id} className="p-4 bg-pywel-secondary rounded-lg space-y-2 border-l-2 border-purple-500">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-cinzel font-semibold text-purple-300">{artifact.name}</p>
                          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 px-2 py-0.5 bg-purple-400/10 border border-purple-400/30 rounded-full">
                            {artifact.challengeType}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <MapPin className="w-3.5 h-3.5 text-purple-400" />
                          <span>{artifact.location}</span>
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
        <p className="text-gray-400">Explore the regions of Pywel. Click on the map or select a region below to view locations, bosses, mounts, collectibles, and sealed artifacts.</p>
      </div>

      {/* Interactive SVG Map */}
      <InteractiveWorldMap
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
      />

      {/* Region cards */}
      <div>
        <h2 className="text-xl font-cinzel font-bold text-gold-400 mb-4">Regions of Pywel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REGIONS.map(region => {
            const bosses     = getRegionBosses(region.id);
            const mounts     = getRegionMounts(region.id);
            const collectibles = getRegionCollectibles(region.id);
            const artifacts   = getRegionArtifacts(region.id);

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
                  <div className="flex items-center gap-4 text-xs text-gray-400 flex-wrap">
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
                    {artifacts.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Ghost className="w-3.5 h-3.5 text-purple-400" />
                        <span>{artifacts.length} artifacts</span>
                      </div>
                    )}
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
