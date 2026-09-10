'use client';

import { useEffect, useMemo, useState } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PIN_CATEGORIES, type MapPinWithProfile, type UpdatePinInput } from '@/hooks/use-map-pins';
import type { MapImage, PinCategory } from '@/types/game-data';

// Coordinate space: y (lat) 0..1000 from bottom to top, x (lng) 0..1000*aspect.
export function boundsFor(img: MapImage): L.LatLngBoundsExpression {
  const h = 1000;
  const w = (1000 * img.width) / img.height;
  return [[0, 0], [h, w]];
}

function pinIcon(category: string, isOwner: boolean, isPending = false): L.DivIcon {
  const cfg = PIN_CATEGORIES[category as PinCategory] ?? PIN_CATEGORIES.custom;
  const border = isPending ? '#fff' : isOwner ? '#3ec9b8' : '#e8853a';
  return L.divIcon({
    html: `<div style="width:28px;height:36px;${isPending ? 'animation:bounce 0.6s ease-in-out infinite alternate;' : ''}">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
        <path d="M14 0 C6.3 0 0 6.3 0 14 C0 24.5 14 36 14 36 C14 36 28 24.5 28 14 C28 6.3 21.7 0 14 0 Z" fill="${cfg.color}" stroke="${border}" stroke-width="2"/>
        <circle cx="14" cy="14" r="8" fill="rgba(0,0,0,0.3)"/>
        <text x="14" y="18.5" text-anchor="middle" font-size="10" font-weight="bold" fill="white" font-family="Arial,sans-serif">${cfg.letter}</text>
      </svg></div>`,
    className: '',
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -38],
  });
}

function ClickCatcher({ enabled, onClick }: { enabled: boolean; onClick: (c: [number, number]) => void }) {
  useMapEvents({ click(e) { if (enabled) onClick([e.latlng.lat, e.latlng.lng]); } });
  return null;
}

function FitOnChange({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => { map.fitBounds(bounds); }, [map, bounds]);
  return null;
}

function PinEditor({ initial, onSave, onCancel, saving }: { initial?: { label: string; category: PinCategory; notes: string; isShared: boolean }; onSave: (v: { label: string; category: PinCategory; notes: string; isShared: boolean }) => void; onCancel: () => void; saving: boolean }) {
  const [label, setLabel] = useState(initial?.label ?? '');
  const [category, setCategory] = useState<PinCategory>(initial?.category ?? 'loot');
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [isShared, setIsShared] = useState(initial?.isShared ?? true);
  return (
    <div className="bg-arc-card border border-arc-border rounded-lg p-3 w-64 text-sm space-y-2">
      <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label" className="w-full px-2 py-1.5 bg-arc-bg border border-arc-border rounded text-gray-100 text-sm focus:border-rust-400 focus:outline-none" />
      <select value={category} onChange={(e) => setCategory(e.target.value as PinCategory)} className="w-full px-2 py-1.5 bg-arc-bg border border-arc-border rounded text-gray-100 text-sm">
        {(Object.keys(PIN_CATEGORIES) as PinCategory[]).map((c) => <option key={c} value={c}>{PIN_CATEGORIES[c].label}</option>)}
      </select>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" rows={2} className="w-full px-2 py-1.5 bg-arc-bg border border-arc-border rounded text-gray-100 text-sm resize-none focus:border-rust-400 focus:outline-none" />
      <label className="flex items-center gap-2 text-xs text-gray-300"><input type="checkbox" checked={isShared} onChange={(e) => setIsShared(e.target.checked)} className="accent-rust-400" />Share with squad</label>
      <div className="flex gap-2">
        <button onClick={() => label.trim() && onSave({ label: label.trim(), category, notes, isShared })} disabled={saving || !label.trim()} className="flex-1 px-2 py-1.5 bg-rust-500 hover:bg-rust-400 text-black font-display font-semibold rounded text-xs disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
        <button onClick={onCancel} className="px-2 py-1.5 border border-arc-border rounded text-xs text-gray-300">Cancel</button>
      </div>
    </div>
  );
}

export default function RaidMapViewer({
  image,
  pins,
  userId,
  placing,
  onPlaced,
  pendingCoords,
  onCreate,
  onCancelCreate,
  onUpdate,
  onDelete,
  saving,
}: {
  image: MapImage;
  pins: MapPinWithProfile[];
  userId: string | null;
  placing: boolean;
  onPlaced: (c: [number, number]) => void;
  pendingCoords: [number, number] | null;
  onCreate: (v: { label: string; category: PinCategory; notes: string; isShared: boolean }) => void;
  onCancelCreate: () => void;
  onUpdate: (id: string, v: UpdatePinInput) => void;
  onDelete: (id: string) => void;
  saving: boolean;
}) {
  const bounds = useMemo(() => boundsFor(image), [image]);
  const [editing, setEditing] = useState<string | null>(null);

  return (
    <MapContainer
      crs={L.CRS.Simple}
      bounds={bounds}
      maxBounds={[[-100, -100], [1100, (1000 * image.width) / image.height + 100]]}
      minZoom={-2}
      maxZoom={3}
      zoomSnap={0.25}
      style={{ height: '70vh', minHeight: 480, width: '100%', cursor: placing ? 'crosshair' : 'grab' }}
      className="rounded-lg border border-arc-border"
      attributionControl={false}
    >
      <ImageOverlay url={image.src} bounds={bounds} />
      <FitOnChange bounds={bounds} />
      <ClickCatcher enabled={placing && !pendingCoords} onClick={onPlaced} />

      {pendingCoords && (
        <Marker position={pendingCoords} icon={pinIcon('custom', true, true)} eventHandlers={{ add: (e) => e.target.openPopup() }}>
          <Popup closeButton={false} autoClose={false} closeOnClick={false}>
            <PinEditor onSave={onCreate} onCancel={onCancelCreate} saving={saving} />
          </Popup>
        </Marker>
      )}

      {pins.map((pin) => {
        const isOwner = pin.user_id === userId;
        const cfg = PIN_CATEGORIES[pin.category as PinCategory] ?? PIN_CATEGORIES.custom;
        return (
          <Marker key={pin.id} position={[pin.lat, pin.lng]} icon={pinIcon(pin.category, isOwner)}>
            <Popup>
              {editing === pin.id ? (
                <PinEditor
                  initial={{ label: pin.label, category: pin.category as PinCategory, notes: pin.notes ?? '', isShared: pin.is_shared }}
                  onSave={(v) => { onUpdate(pin.id, { label: v.label, category: v.category, notes: v.notes || null, isShared: v.isShared }); setEditing(null); }}
                  onCancel={() => setEditing(null)}
                  saving={saving}
                />
              ) : (
                <div className="bg-arc-card border border-arc-border rounded-lg p-3 w-56 text-sm">
                  <div className="flex items-center gap-2 mb-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: cfg.color }} /><span className="text-[11px] uppercase tracking-wider text-gray-400">{cfg.label}</span></div>
                  <p className="font-display font-semibold text-gray-100">{pin.label}</p>
                  {pin.notes && <p className="text-xs text-gray-400 mt-1">{pin.notes}</p>}
                  <p className="text-[11px] text-gray-500 mt-2">{isOwner ? 'Your pin' : `By ${pin.display_name}`}{pin.is_shared ? ' · shared' : ''}</p>
                  {isOwner && (
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => setEditing(pin.id)} className="text-xs text-signal-300 hover:text-signal-200">Edit</button>
                      <button onClick={() => onDelete(pin.id)} className="text-xs text-red-300 hover:text-red-200">Delete</button>
                    </div>
                  )}
                </div>
              )}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
