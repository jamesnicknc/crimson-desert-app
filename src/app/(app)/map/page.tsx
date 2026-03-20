'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { REGIONS, BOSSES, MOUNTS, COLLECTIBLES } from '@/lib/game-data';
import { Skull, Footprints, Sparkles, ChevronDown, ChevronUp, Shield, Map } from 'lucide-react';
import type { Region, Difficulty } from '@/types/game-data';

const InteractiveMap = dynamic(() => import('@/components/map/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div
      className="rounded-lg border border-pywel-border bg-pywel-card flex items-center justify-center"
      style={{ height: '65vh', minHeight: '520px' }}
    >
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm font-cinzel">Loading map of Pywel...</p>
      </div>
    </div>
  ),
});

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  normal: 'Normal',
  hard: 'Hard',
  extreme: 'Extreme',
  legendary: 'Legendary',
};

const getRegionBosses = (regionId: Region) =>
  BOSSES.filter(b => b.region === regionId);

const getRegionMounts = (regionId: Region) =>
  MOUNTS.filter(m => m.region === regionId);

const getRegionCollectibles = (regionId: string) => {
  const regionNames: Record<string, string[]> = {
    hernand: ['Hernand'],
    pailune: ['Pailune'],
    demeniss: ['Demeniss'],
    delesyia: ['Delesyia'],
    desert: ['Crimson Desert', 'Desert'],
    abyss: ['Abyss'],
  };
  const names = regionNames[regionId] || [];
  let count = 0;
  for (const items of Object.values(COLLECTIBLES)) {
    count += items.filter(c => names.some(n => c.location.includes(n))).length;
  }
  return count;
};

const getDifficultyRange = (regionId: Region): string => {
  const bosses = getRegionBosses(regionId);
  if (bosses.length === 0) return 'Unknown';
  const order: Difficulty[] = ['normal', 'hard', 'extreme', 'legendary'];
  const difficulties = bosses.map(b => order.indexOf(b.difficulty));
  const min = Math.min(...difficulties);
  const max = Math.max(...difficulties);
  if (min === max) return DIFFICULTY_LABELS[order[min]];
  return `${DIFFICULTY_LABELS[order[min]]} – ${DIFFICULTY_LABELS[order[max]]}`;
};

export default function MapPage() {
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-1">
          Interactive Map
        </h1>
        <p className="text-gray-400 text-sm">
          Explore the world of Pywel — pan, zoom, and filter locations by category.
        </p>
      </div>

      {/* Interactive Leaflet map */}
      <div className="bg-pywel-card rounded-lg border border-pywel-border p-4">
        <InteractiveMap />
      </div>

      {/* Regions section */}
      <div className="flex items-center gap-2">
        <Map className="w-5 h-5 text-gold-400" />
        <h2 className="text-xl font-cinzel font-bold text-gold-400">Regions of Pywel</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {REGIONS.map(region => {
          const bosses = getRegionBosses(region.id);
          const mounts = getRegionMounts(region.id);
          const collectibleCount = getRegionCollectibles(region.id);
          const diffRange = getDifficultyRange(region.id);
          const isExpanded = expandedRegion === region.id;

          return (
            <div
              key={region.id}
              onClick={() => setExpandedRegion(isExpanded ? null : region.id)}
              className="bg-pywel-card rounded-lg border border-l-4 cursor-pointer hover:border-gold-500/50 transition-all"
              style={{ borderLeftColor: region.color }}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-cinzel text-lg font-semibold text-gold-400 mb-1">{region.name}</h3>
                    <p className="text-xs text-gray-400 mb-2">{region.subtitle}</p>
                  </div>
                  <div className="flex items-center text-gold-400/60 flex-shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-3">{region.description}</p>

                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
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
                    <span>{collectibleCount} items</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mb-3">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs text-amber-300 font-semibold">{diffRange}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {region.features.map(feat => (
                    <span key={feat} className="text-xs bg-pywel-secondary text-gold-300 px-2 py-1 rounded">
                      {feat}
                    </span>
                  ))}
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-pywel-border space-y-4">
                    {bosses.length > 0 && (
                      <div>
                        <p className="text-xs font-cinzel font-semibold text-red-400 uppercase tracking-wider mb-2">Key Bosses</p>
                        <div className="space-y-1.5">
                          {bosses.map(b => (
                            <div key={b.name} className="flex items-center justify-between text-sm">
                              <span className="text-gray-200">{b.name}</span>
                              <span className="text-xs text-gray-500 capitalize">{b.difficulty}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {mounts.length > 0 && (
                      <div>
                        <p className="text-xs font-cinzel font-semibold text-blue-400 uppercase tracking-wider mb-2">Available Mounts</p>
                        <div className="flex flex-wrap gap-1.5">
                          {mounts.map(m => (
                            <span key={m.name} className="inline-block bg-pywel-bg border border-pywel-border text-gray-300 text-xs px-2 py-1 rounded-full">
                              {m.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
