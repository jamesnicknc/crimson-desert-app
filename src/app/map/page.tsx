'use client';

import Image from 'next/image';
import { REGIONS } from '@/lib/game-data';

export default function MapPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Interactive Map</h1>
        <p className="text-gray-400">Explore the world of Pywel and track important locations.</p>
      </div>

      <div className="bg-pywel-card rounded-lg border border-pywel-border overflow-hidden">
        <div className="relative">
          <Image
            src="/assets/pywel-map.png"
            alt="Map of Pywel"
            width={1200}
            height={1697}
            className="w-full h-auto opacity-60"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-gold-300 mb-4">
              Interactive Map
            </h2>
            <p className="text-xl text-gold-400/80 font-cinzel">Coming Soon</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {REGIONS.map(region => (
          <div
            key={region.id}
            className="bg-pywel-card rounded-lg p-4 border border-l-4"
            style={{ borderLeftColor: region.color }}
          >
            <h3 className="font-cinzel text-lg font-semibold text-gold-400 mb-1">{region.name}</h3>
            <p className="text-xs text-gray-400 mb-2">{region.subtitle}</p>
            <p className="text-sm text-gray-300 line-clamp-2">{region.description}</p>
            <div className="flex flex-wrap gap-1 mt-3">
              {region.features.map(feat => (
                <span key={feat} className="text-xs bg-pywel-secondary text-gold-300 px-2 py-1 rounded">
                  {feat}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
