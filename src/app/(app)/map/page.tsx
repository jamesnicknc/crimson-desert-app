'use client';

import { useState } from 'react';
import Image from 'next/image';
import { REGIONS, BOSSES, MOUNTS, COLLECTIBLES } from '@/lib/game-data';
import { Skull, Footprints, Sparkles, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import type { Region, Difficulty } from '@/types/game-data';

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
  return `${DIFFICULTY_LABELS[order[min]]} - ${DIFFICULTY_LABELS[order[max]]}`;
};

export default function MapPage() {
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Interactive Map</h1>
        <p className="text-gray-400">Explore the world of Pywel and track important locations.</p>
      </div>

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

      <h2 className="text-xl font-cinzel font-bold text-gold-400">Regions of Pywel</h2>

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

                {/* Quick stats row */}
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

                {/* Difficulty */}
                <div className="flex items-center gap-1.5 mb-3">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs text-amber-300 font-semibold">{diffRange}</span>
                </div>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-1">
                  {region.features.map(feat => (
                    <span key={feat} className="text-xs bg-pywel-secondary text-gold-300 px-2 py-1 rounded">
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-pywel-border space-y-4">
                    {/* Bosses */}
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

                    {/* Mounts */}
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
