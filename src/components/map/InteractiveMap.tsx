'use client';

import { useState, useMemo, useEffect } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_MARKERS, REGION_LABELS, CATEGORY_CONFIG, type MarkerCategory } from '@/lib/map-data';

// Map coordinate bounds: [0,0] (south-west) to [1000,1000] (north-east) in CRS.Simple
const MAP_BOUNDS: L.LatLngBoundsExpression = [[0, 0], [1000, 1000]];
const MAX_BOUNDS: L.LatLngBoundsExpression = [[-30, -30], [1030, 1030]];

const DIFFICULTY_COLORS: Record<string, string> = {
  Normal: '#4ade80',
  Hard: '#fbbf24',
  Extreme: '#f97316',
  Legendary: '#a855f7',
};

function createMarkerIcon(category: MarkerCategory): L.DivIcon {
  const { color, letter } = CATEGORY_CONFIG[category];
  return L.divIcon({
    html: `<div style="position:relative;width:26px;height:34px;"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="34" viewBox="0 0 26 34"><path d="M13 0 C5.8 0 0 5.8 0 13 C0 22.75 13 34 13 34 C13 34 26 22.75 26 13 C26 5.8 20.2 0 13 0 Z" fill="${color}"/><circle cx="13" cy="13" r="7" fill="rgba(0,0,0,0.3)"/><text x="13" y="17.5" text-anchor="middle" font-size="9" font-weight="bold" fill="white" font-family="Arial,sans-serif">${letter}</text></svg></div>`,
    className: '',
    iconSize: [26, 34],
    iconAnchor: [13, 34],
    popupAnchor: [0, -36],
  });
}

function createRegionLabelIcon(name: string, color: string): L.DivIcon {
  return L.divIcon({
    html: `<div style="color:${color};font-family:'Cinzel','Georgia',serif;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;text-shadow:0 0 6px rgba(0,0,0,1),0 0 12px rgba(0,0,0,0.8),1px 1px 0 rgba(0,0,0,1);white-space:nowrap;pointer-events:none;user-select:none;">${name}</div>`,
    className: '',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

export default function InteractiveMap() {
  const [activeCategories, setActiveCategories] = useState<Set<MarkerCategory>>(
    new Set(['town', 'boss', 'dungeon', 'poi', 'fast-travel'])
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleCategory = (cat: MarkerCategory) => {
    setActiveCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const filteredMarkers = useMemo(
    () => MAP_MARKERS.filter(m => activeCategories.has(m.category)),
    [activeCategories]
  );

  const markerIcons = useMemo(() => {
    const icons = {} as Record<MarkerCategory, L.DivIcon>;
    for (const cat of Object.keys(CATEGORY_CONFIG) as MarkerCategory[]) {
      icons[cat] = createMarkerIcon(cat);
    }
    return icons;
  }, []);

  const regionLabelMarkers = useMemo(
    () => REGION_LABELS.map(r => ({
      ...r,
      icon: createRegionLabelIcon(r.name, r.color),
    })),
    []
  );

  const visibleCount = filteredMarkers.length;

  if (!isClient) return null;

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Show:</span>
        {(Object.entries(CATEGORY_CONFIG) as [MarkerCategory, typeof CATEGORY_CONFIG[MarkerCategory]][]).map(
          ([cat, cfg]) => {
            const isActive = activeCategories.has(cat);
            const count = MAP_MARKERS.filter(m => m.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
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
        <span className="ml-auto text-xs text-gray-500 tabular-nums">
          {visibleCount} of {MAP_MARKERS.length} markers
        </span>
      </div>

      {/* Map */}
      <div
        className="rounded-lg overflow-hidden border border-pywel-border relative"
        style={{ height: '65vh', minHeight: '520px' }}
      >
        <MapContainer
          crs={L.CRS.Simple}
          bounds={MAP_BOUNDS}
          maxBounds={MAX_BOUNDS}
          maxBoundsViscosity={0.85}
          style={{ width: '100%', height: '100%', background: '#06060A' }}
          zoomSnap={0.25}
          zoomDelta={0.5}
          attributionControl={false}
          zoomControl={true}
        >
          <ImageOverlay
            url="/assets/pywel-map-real.jpg"
            bounds={MAP_BOUNDS}
            opacity={0.95}
          />

          {/* Region name labels */}
          {regionLabelMarkers.map(r => (
            <Marker
              key={r.id}
              position={r.coords as [number, number]}
              icon={r.icon}
              interactive={false}
            />
          ))}

          {/* Location markers */}
          {filteredMarkers.map(marker => (
            <Marker
              key={marker.id}
              position={marker.coords}
              icon={markerIcons[marker.category]}
            >
              <Popup className="pywel-popup" maxWidth={268} minWidth={200}>
                <div
                  style={{
                    background: '#19191E',
                    border: '1px solid #2A2630',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    color: '#e5e5e5',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Cinzel, Georgia, serif',
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#d4a847',
                      marginBottom: '7px',
                      lineHeight: '1.3',
                    }}
                  >
                    {marker.name}
                  </div>

                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        background: CATEGORY_CONFIG[marker.category].color,
                        color: '#000',
                        padding: '2px 9px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: '600',
                      }}
                    >
                      {CATEGORY_CONFIG[marker.category].label}
                    </span>
                    {marker.difficulty && (
                      <span
                        style={{
                          color: DIFFICULTY_COLORS[marker.difficulty] ?? '#aaa',
                          fontSize: '11px',
                          fontWeight: '600',
                        }}
                      >
                        ⚔ {marker.difficulty}
                      </span>
                    )}
                  </div>

                  {marker.description && (
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#9ca3af',
                        lineHeight: '1.55',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {marker.description}
                    </p>
                  )}

                  <div style={{ fontSize: '11px', color: '#4b5563', textTransform: 'capitalize' }}>
                    📍{' '}
                    {marker.region === 'desert'
                      ? 'Crimson Desert'
                      : marker.region === 'abyss'
                        ? 'The Abyss'
                        : marker.region.charAt(0).toUpperCase() + marker.region.slice(1)}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Compass rose overlay */}
        <div
          className="absolute bottom-10 right-3 z-[1000] pointer-events-none select-none"
          style={{ fontSize: '10px', color: 'rgba(212,168,71,0.7)', lineHeight: 1, textAlign: 'center' }}
        >
          <div style={{ fontSize: '13px', color: 'rgba(212,168,71,0.85)' }}>N</div>
          <div style={{ fontSize: '8px', marginTop: '1px', color: 'rgba(212,168,71,0.5)' }}>↑</div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
        {(Object.entries(CATEGORY_CONFIG) as [MarkerCategory, typeof CATEGORY_CONFIG[MarkerCategory]][]).map(
          ([cat, cfg]) => (
            <div key={cat} className="flex items-center gap-1.5 text-xs text-gray-400">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
              <span style={{ color: cfg.color }} className="font-bold">{cfg.letter}</span>
              <span>— {cfg.label}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
