'use client';

import { CATEGORY_CONFIG, type MarkerCategory } from '@/lib/map-data';
import { PIN_CATEGORIES } from '@/hooks/use-map-pins';
import type { PinCategory } from '@/types/game-data';

// ─── Types ────────────────────────────────────────────────────────────────────

interface MapFilterBarProps {
  // Static marker filters
  activeStaticCategories: Set<MarkerCategory>;
  onToggleStaticCategory: (cat: MarkerCategory) => void;
  staticCounts: Record<MarkerCategory, number>;
  // User pin filters
  showMyPins: boolean;
  onToggleMyPins: () => void;
  showGroupPins: boolean;
  onToggleGroupPins: () => void;
  myPinCount: number;
  groupPinCount: number;
  // Pin placement mode
  isPlacingPin: boolean;
  onTogglePlacePin: () => void;
  isLoggedIn: boolean;
  // Summary
  visibleStaticCount: number;
  totalStaticCount: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MapFilterBar({
  activeStaticCategories,
  onToggleStaticCategory,
  staticCounts,
  showMyPins,
  onToggleMyPins,
  showGroupPins,
  onToggleGroupPins,
  myPinCount,
  groupPinCount,
  isPlacingPin,
  onTogglePlacePin,
  isLoggedIn,
  visibleStaticCount,
  totalStaticCount,
}: MapFilterBarProps) {
  return (
    <div className="space-y-2">
      {/* Row 1: Static world markers */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider w-14 flex-shrink-0">
          World:
        </span>
        {(Object.entries(CATEGORY_CONFIG) as [MarkerCategory, typeof CATEGORY_CONFIG[MarkerCategory]][]).map(
          ([cat, cfg]) => {
            const isActive = activeStaticCategories.has(cat);
            const count = staticCounts[cat] ?? 0;
            return (
              <button
                key={cat}
                onClick={() => onToggleStaticCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  isActive
                    ? 'border-transparent text-black'
                    : 'border-pywel-border text-gray-400 bg-pywel-secondary hover:border-gray-500'
                }`}
                style={isActive ? { backgroundColor: cfg.color } : {}}
              >
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold border border-current/40"
                  style={isActive ? { color: 'rgba(0,0,0,0.7)' } : { color: cfg.color }}
                >
                  {cfg.letter}
                </span>
                {cfg.label}
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-black/20 text-black/80' : 'bg-pywel-bg text-gray-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          }
        )}
        <span className="ml-auto text-xs text-gray-500 tabular-nums hidden sm:inline">
          {visibleStaticCount} of {totalStaticCount} markers
        </span>
      </div>

      {/* Row 2: User pins + place pin button */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider w-14 flex-shrink-0">
          Pins:
        </span>

        {/* My Pins toggle */}
        <button
          onClick={onToggleMyPins}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
            showMyPins
              ? 'border-transparent bg-emerald-500 text-black'
              : 'border-pywel-border text-gray-400 bg-pywel-secondary hover:border-gray-500'
          }`}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: showMyPins ? 'rgba(0,0,0,0.4)' : '#10b981' }} />
          My Pins
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
              showMyPins ? 'bg-black/20 text-black/80' : 'bg-pywel-bg text-gray-500'
            }`}
          >
            {myPinCount}
          </span>
        </button>

        {/* Group Pins toggle */}
        <button
          onClick={onToggleGroupPins}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
            showGroupPins
              ? 'border-transparent bg-sky-500 text-black'
              : 'border-pywel-border text-gray-400 bg-pywel-secondary hover:border-gray-500'
          }`}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: showGroupPins ? 'rgba(0,0,0,0.4)' : '#0ea5e9' }} />
          Group Pins
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
              showGroupPins ? 'bg-black/20 text-black/80' : 'bg-pywel-bg text-gray-500'
            }`}
          >
            {groupPinCount}
          </span>
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Place Pin button */}
        {isLoggedIn && (
          <button
            onClick={onTogglePlacePin}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              isPlacingPin
                ? 'border-gold-500 bg-gold-600 text-black animate-pulse'
                : 'border-gold-700/40 bg-pywel-card text-gold-400 hover:border-gold-500/50 hover:text-gold-300'
            }`}
          >
            {isPlacingPin ? (
              <>
                <span className="w-2 h-2 rounded-full bg-black/40" />
                Click Map to Place...
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Drop a Pin
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
