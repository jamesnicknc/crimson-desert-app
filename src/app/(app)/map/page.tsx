'use client';

import { useState } from 'react';
import Image from 'next/image';
import { REGIONS, BOSSES, MOUNTS, COLLECTIBLES } from '@/lib/game-data';
import { Skull, Footprints, Sparkles, Shield, X } from 'lucide-react';
import type { Region, RegionInfo, Difficulty } from '@/types/game-data';

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

function RegionDetailModal({
  region,
  onClose,
}: {
  region: RegionInfo;
  onClose: () => void;
}) {
  const bosses = getRegionBosses(region.id);
  const mounts = getRegionMounts(region.id);
  const collectibleCount = getRegionCollectibles(region.id);
  const diffRange = getDifficultyRange(region.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-lg bg-pywel-card border-2 rounded-xl overflow-hidden max-h-[85vh] flex flex-col"
        style={{ borderColor: region.color }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-pywel-border" style={{ background: `linear-gradient(135deg, ${region.color}20, ${region.color}08)` }}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-xl font-cinzel font-bold text-gold-300">{region.name}</h2>
              <p className="text-sm text-gray-400 mt-1">{region.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-200 bg-pywel-bg/50 rounded-lg transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick stats */}
          <div className="flex items-center gap-4 text-xs text-gray-400 mt-4">
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
            <div className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-300 font-semibold">{diffRange}</span>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          <p className="text-sm text-gray-300">{region.description}</p>

          {/* Feature tags */}
          <div>
            <h3 className="text-sm font-cinzel font-semibold text-gold-400 uppercase tracking-wider mb-2">Features</h3>
            <div className="flex flex-wrap gap-1.5">
              {region.features.map(feat => (
                <span key={feat} className="text-xs bg-pywel-secondary text-gold-300 px-2.5 py-1 rounded">
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Bosses */}
          {bosses.length > 0 && (
            <div>
              <h3 className="text-sm font-cinzel font-semibold text-red-400 uppercase tracking-wider mb-2">Key Bosses</h3>
              <div className="space-y-1.5">
                {bosses.map(b => (
                  <div key={b.name} className="flex items-center justify-between text-sm bg-pywel-bg rounded-lg px-3 py-2 border border-pywel-border">
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
              <h3 className="text-sm font-cinzel font-semibold text-blue-400 uppercase tracking-wider mb-2">Available Mounts</h3>
              <div className="flex flex-wrap gap-1.5">
                {mounts.map(m => (
                  <span key={m.name} className="inline-block bg-pywel-bg border border-pywel-border text-gray-300 text-xs px-2.5 py-1.5 rounded-full">
                    {m.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-pywel-card border border-pywel-border rounded-lg text-gray-300 text-sm font-cinzel font-semibold hover:bg-pywel-card-hover hover:text-gold-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MapPage() {
  const [selectedRegion, setSelectedRegion] = useState<RegionInfo | null>(null);

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

          return (
            <div
              key={region.id}
              onClick={() => setSelectedRegion(region)}
              className="bg-pywel-card rounded-lg border border-l-4 cursor-pointer hover:border-gold-500/50 transition-all"
              style={{ borderLeftColor: region.color }}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-cinzel text-lg font-semibold text-gold-400 mb-1">{region.name}</h3>
                    <p className="text-xs text-gray-400 mb-2">{region.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-3 line-clamp-2">{region.description}</p>

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
              </div>
            </div>
          );
        })}
      </div>

      {/* Region Detail Modal */}
      {selectedRegion && (
        <RegionDetailModal
          region={selectedRegion}
          onClose={() => setSelectedRegion(null)}
        />
      )}
    </div>
  );
}
