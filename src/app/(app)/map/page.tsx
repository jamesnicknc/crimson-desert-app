'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';
import { useUser } from '@/hooks/use-user';
import { useMapPins, PIN_CATEGORIES } from '@/hooks/use-map-pins';
import MapFilterBar from '@/components/map/MapFilterBar';
import SignInPrompt from '@/components/SignInPrompt';
import { Globe, MapPin, Users } from 'lucide-react';
import type { PinCategory } from '@/types/game-data';

// ── Dynamic import (Leaflet needs browser APIs) ─────────────────────────────

const InteractiveMap = dynamic(() => import('@/components/map/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div
      className="rounded-lg border border-pywel-border bg-pywel-card flex items-center justify-center"
      style={{ height: '70vh', minHeight: '520px' }}
    >
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm font-cinzel">Loading map of Pywel...</p>
      </div>
    </div>
  ),
});

// ── Page Component ──────────────────────────────────────────────────────────

export default function MapPage() {
  const { user, loading: userLoading } = useUser();
  const { myPins, groupPins, loading: pinsLoading, createPin, updatePin, deletePin } = useMapPins(user?.id ?? null);

  // ── Filter state ────────────────────────────────────────────────────────

  const [showMyPins, setShowMyPins] = useState(true);
  const [showGroupPins, setShowGroupPins] = useState(true);

  // ── Pin placement state ─────────────────────────────────────────────────

  const [isPlacingPin, setIsPlacingPin] = useState(false);
  const [pendingPinCoords, setPendingPinCoords] = useState<[number, number] | null>(null);
  const [savingNewPin, setSavingNewPin] = useState(false);

  const togglePlacePin = useCallback(() => {
    setIsPlacingPin(prev => {
      if (prev) {
        setPendingPinCoords(null);
      }
      return !prev;
    });
  }, []);

  const handlePinPlaced = useCallback((coords: [number, number]) => {
    setPendingPinCoords(coords);
  }, []);

  const handleSaveNewPin = useCallback(
    async (data: { label: string; category: PinCategory; notes: string; isShared: boolean }) => {
      if (!pendingPinCoords) return;
      setSavingNewPin(true);

      await createPin({
        lat: pendingPinCoords[0],
        lng: pendingPinCoords[1],
        label: data.label,
        category: data.category,
        notes: data.notes || undefined,
        isShared: data.isShared,
      });

      setSavingNewPin(false);
      setPendingPinCoords(null);
      setIsPlacingPin(false);
    },
    [pendingPinCoords, createPin]
  );

  const handleCancelNewPin = useCallback(() => {
    setPendingPinCoords(null);
  }, []);

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-1 flex items-center gap-3">
            <Globe className="w-8 h-8" />
            World Map
          </h1>
          <p className="text-gray-400 text-sm">
            Explore Pywel and drop pins to share discoveries with your group.
          </p>
        </div>

        {/* Pin stats (logged-in only) */}
        {user && !pinsLoading && (
          <div className="flex items-center gap-4 text-xs text-gray-500 flex-shrink-0 pt-2">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300 font-semibold">{myPins.length}</span>
              <span>my pins</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-sky-300 font-semibold">{groupPins.length}</span>
              <span>group pins</span>
            </div>
          </div>
        )}
      </div>

      {/* Sign in prompt for guests */}
      {!userLoading && !user && (
        <SignInPrompt message="Sign in to drop pins and share with your group" compact />
      )}

      {/* Filter bar */}
      <div className="bg-pywel-card rounded-lg border border-pywel-border p-3">
        <MapFilterBar
          showMyPins={showMyPins}
          onToggleMyPins={() => setShowMyPins(p => !p)}
          showGroupPins={showGroupPins}
          onToggleGroupPins={() => setShowGroupPins(p => !p)}
          myPinCount={myPins.length}
          groupPinCount={groupPins.length}
          isPlacingPin={isPlacingPin}
          onTogglePlacePin={togglePlacePin}
          isLoggedIn={!!user}
        />
      </div>

      {/* Map */}
      <InteractiveMap
        myPins={myPins}
        groupPins={groupPins}
        showMyPins={showMyPins}
        showGroupPins={showGroupPins}
        isPlacingPin={isPlacingPin}
        onPinPlaced={handlePinPlaced}
        userId={user?.id ?? null}
        onUpdatePin={updatePin}
        onDeletePin={deletePin}
        pendingPinCoords={pendingPinCoords}
        onSaveNewPin={handleSaveNewPin}
        onCancelNewPin={handleCancelNewPin}
        savingNewPin={savingNewPin}
      />

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5">
        {(Object.entries(PIN_CATEGORIES) as [PinCategory, typeof PIN_CATEGORIES[PinCategory]][]).map(
          ([cat, cfg]) => (
            <div key={cat} className="flex items-center gap-1.5 text-xs text-gray-400">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
              <span style={{ color: cfg.color }} className="font-bold">{cfg.letter}</span>
              <span>{cfg.label}</span>
            </div>
          )
        )}
        <div className="w-px h-4 bg-pywel-border mx-1 self-center" />
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 border-2 border-emerald-500 bg-gray-600" />
          <span className="text-emerald-400 font-bold">My Pin</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 border-2 border-sky-500 bg-gray-600" />
          <span className="text-sky-400 font-bold">Group Pin</span>
        </div>
      </div>
    </div>
  );
}
