'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { REGION_LABELS } from '@/lib/map-data';
import { PIN_CATEGORIES, type MapPinWithProfile, type UpdatePinInput } from '@/hooks/use-map-pins';
import type { PinCategory } from '@/types/game-data';
import PinPopup from './PinPopup';
import PinCreationPanel from './PinCreationPanel';

// ─── Constants ────────────────────────────────────────────────────────────────

const MAP_BOUNDS: L.LatLngBoundsExpression = [[0, 0], [1000, 1000]];
const MAX_BOUNDS: L.LatLngBoundsExpression = [[-50, -50], [1050, 1050]];

// ─── Icon Factories ───────────────────────────────────────────────────────────

function createUserPinIcon(pinCategory: string, isOwner: boolean): L.DivIcon {
  const cfg = PIN_CATEGORIES[pinCategory as PinCategory] ?? PIN_CATEGORIES.custom;
  const borderColor = isOwner ? '#10b981' : '#0ea5e9';
  return L.divIcon({
    html: `<div style="position:relative;width:28px;height:36px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
        <path d="M14 0 C6.3 0 0 6.3 0 14 C0 24.5 14 36 14 36 C14 36 28 24.5 28 14 C28 6.3 21.7 0 14 0 Z" fill="${cfg.color}" stroke="${borderColor}" stroke-width="2"/>
        <circle cx="14" cy="14" r="8" fill="rgba(0,0,0,0.25)"/>
        <text x="14" y="18.5" text-anchor="middle" font-size="10" font-weight="bold" fill="white" font-family="Arial,sans-serif">${cfg.letter}</text>
      </svg>
    </div>`,
    className: '',
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -38],
  });
}

function createPlacementIcon(): L.DivIcon {
  return L.divIcon({
    html: `<div style="position:relative;width:28px;height:36px;animation:bounce 0.6s ease-in-out infinite alternate;">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
        <path d="M14 0 C6.3 0 0 6.3 0 14 C0 24.5 14 36 14 36 C14 36 28 24.5 28 14 C28 6.3 21.7 0 14 0 Z" fill="#d4a847" stroke="#fff" stroke-width="2" opacity="0.9"/>
        <circle cx="14" cy="14" r="5" fill="rgba(255,255,255,0.5)"/>
        <line x1="14" y1="8" x2="14" y2="20" stroke="white" stroke-width="2"/>
        <line x1="8" y1="14" x2="20" y2="14" stroke="white" stroke-width="2"/>
      </svg>
    </div>`,
    className: '',
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -38],
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

// ─── Map Click Handler ────────────────────────────────────────────────────────

interface MapClickHandlerProps {
  isPlacingPin: boolean;
  onMapClick: (latlng: L.LatLng) => void;
}

function MapClickHandler({ isPlacingPin, onMapClick }: MapClickHandlerProps) {
  useMapEvents({
    click(e: L.LeafletMouseEvent) {
      if (isPlacingPin) {
        onMapClick(e.latlng);
      }
    },
  });
  return null;
}

// ─── Cursor style injector ────────────────────────────────────────────────────

function CursorStyleInjector({ isPlacingPin }: { isPlacingPin: boolean }) {
  useEffect(() => {
    const mapEl = document.querySelector('.leaflet-container') as HTMLElement | null;
    if (mapEl) {
      mapEl.style.cursor = isPlacingPin ? 'crosshair' : '';
    }
    return () => {
      if (mapEl) mapEl.style.cursor = '';
    };
  }, [isPlacingPin]);
  return null;
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface InteractiveMapProps {
  // User pin data
  myPins: MapPinWithProfile[];
  groupPins: MapPinWithProfile[];
  showMyPins: boolean;
  showGroupPins: boolean;
  // Pin placement
  isPlacingPin: boolean;
  onPinPlaced: (coords: [number, number]) => void;
  // Pin CRUD
  userId: string | null;
  onUpdatePin: (pinId: string, input: UpdatePinInput) => Promise<boolean>;
  onDeletePin: (pinId: string) => Promise<boolean>;
  // Creation panel
  pendingPinCoords: [number, number] | null;
  onSaveNewPin: (data: {
    label: string;
    category: PinCategory;
    notes: string;
    isShared: boolean;
  }) => Promise<void>;
  onCancelNewPin: () => void;
  savingNewPin: boolean;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function InteractiveMap({
  myPins,
  groupPins,
  showMyPins,
  showGroupPins,
  isPlacingPin,
  onPinPlaced,
  userId,
  onUpdatePin,
  onDeletePin,
  pendingPinCoords,
  onSaveNewPin,
  onCancelNewPin,
  savingNewPin,
}: InteractiveMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // ── Memoized region labels ────────────────────────────────────────────

  const regionLabelMarkers = useMemo(
    () => REGION_LABELS.map(r => ({
      ...r,
      icon: createRegionLabelIcon(r.name, r.color),
    })),
    []
  );

  // ── Placement icon ────────────────────────────────────────────────────

  const placementIcon = useMemo(() => createPlacementIcon(), []);

  // ── Map click handler ─────────────────────────────────────────────────

  const handleMapClick = useCallback(
    (latlng: L.LatLng) => {
      onPinPlaced([latlng.lat, latlng.lng]);
    },
    [onPinPlaced]
  );

  if (!isClient) return null;

  return (
    <div className="relative">
      <div
        className="rounded-lg overflow-hidden border border-pywel-border"
        style={{ height: '70vh', minHeight: '520px' }}
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
          {/* Click handler + cursor */}
          <MapClickHandler isPlacingPin={isPlacingPin} onMapClick={handleMapClick} />
          <CursorStyleInjector isPlacingPin={isPlacingPin} />

          {/* Base map image */}
          <ImageOverlay
            url="/assets/pywel-map-real.jpg"
            bounds={MAP_BOUNDS}
            opacity={0.95}
          />

          {/* ── Region name labels ────────────────────────────────────── */}
          {regionLabelMarkers.map(r => (
            <Marker
              key={`region-${r.id}`}
              position={r.coords as [number, number]}
              icon={r.icon}
              interactive={false}
            />
          ))}

          {/* ── User's own pins ───────────────────────────────────────── */}
          {showMyPins &&
            myPins.map(pin => (
              <Marker
                key={`my-${pin.id}`}
                position={[pin.lat, pin.lng]}
                icon={createUserPinIcon(pin.category, true)}
              >
                <Popup className="pywel-popup" maxWidth={300} minWidth={220}>
                  <div
                    style={{
                      background: '#19191E',
                      border: '1px solid #2A2630',
                      borderRadius: '8px',
                      padding: '12px 14px',
                    }}
                  >
                    <PinPopup
                      pin={pin}
                      isOwner={true}
                      onUpdate={onUpdatePin}
                      onDelete={onDeletePin}
                    />
                  </div>
                </Popup>
              </Marker>
            ))}

          {/* ── Group member pins ──────────────────────────────────────── */}
          {showGroupPins &&
            groupPins.map(pin => (
              <Marker
                key={`group-${pin.id}`}
                position={[pin.lat, pin.lng]}
                icon={createUserPinIcon(pin.category, false)}
              >
                <Popup className="pywel-popup" maxWidth={300} minWidth={220}>
                  <div
                    style={{
                      background: '#19191E',
                      border: '1px solid #2A2630',
                      borderRadius: '8px',
                      padding: '12px 14px',
                    }}
                  >
                    <PinPopup
                      pin={pin}
                      isOwner={false}
                      onUpdate={onUpdatePin}
                      onDelete={onDeletePin}
                    />
                  </div>
                </Popup>
              </Marker>
            ))}

          {/* ── Pending pin placement marker ──────────────────────────── */}
          {pendingPinCoords && (
            <Marker
              position={pendingPinCoords}
              icon={placementIcon}
              interactive={false}
            />
          )}
        </MapContainer>

        {/* Compass rose overlay */}
        <div
          className="absolute bottom-10 right-3 z-[1000] pointer-events-none select-none"
          style={{ fontSize: '10px', color: 'rgba(212,168,71,0.7)', lineHeight: 1, textAlign: 'center' }}
        >
          <div style={{ fontSize: '13px', color: 'rgba(212,168,71,0.85)' }}>N</div>
          <div style={{ fontSize: '8px', marginTop: '1px', color: 'rgba(212,168,71,0.5)' }}>&#8593;</div>
        </div>

        {/* Placement mode banner */}
        {isPlacingPin && !pendingPinCoords && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1100] bg-gold-900/90 border border-gold-600/50 rounded-full px-5 py-2 text-sm text-gold-200 font-cinzel font-semibold shadow-lg backdrop-blur-sm">
            Click anywhere on the map to place your pin
          </div>
        )}
      </div>

      {/* Pin creation panel (overlaid on map) */}
      {pendingPinCoords && (
        <PinCreationPanel
          coords={pendingPinCoords}
          onSave={onSaveNewPin}
          onCancel={onCancelNewPin}
          saving={savingNewPin}
        />
      )}
    </div>
  );
}
