'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { REGIONS } from '@/lib/game-data';
import type { PinCategory, MapPin } from '@/types/game-data';
import { MapPinCollectible, MapPinBoss, MapPinNPC, MapPinPOI, MapPinCustom } from '@/components/icons/WeaponIcons';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-pywel-card rounded-lg flex items-center justify-center text-gold-300">Loading map...</div>,
});

export default function MapPage() {
  const [pins, setPins] = useState<MapPin[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PinCategory>('poi');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ label: '', notes: '' });

  const handleMapClick = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const handleAddPin = useCallback((label: string, notes: string) => {
    const newPin: MapPin = {
      id: `pin-${Date.now()}`,
      lat: 50,
      lng: 50,
      label,
      category: selectedCategory,
      icon: getCategoryIcon(selectedCategory),
      notes,
      isShared: false,
    };
    setPins([...pins, newPin]);
    setIsFormOpen(false);
    setFormData({ label: '', notes: '' });
  }, [pins, selectedCategory]);

  const getCategoryIcon = (category: PinCategory): string => {
    const icons: Record<PinCategory, string> = {
      collectible: '⭐',
      boss: '🔴',
      npc: '🔵',
      poi: '🟡',
      custom: '⚪',
    };
    return icons[category];
  };

  const getCategoryColor = (category: PinCategory): string => {
    const colors: Record<PinCategory, string> = {
      collectible: 'bg-green-500',
      boss: 'bg-red-500',
      npc: 'bg-blue-500',
      poi: 'bg-yellow-500',
      custom: 'bg-gray-400',
    };
    return colors[category];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Interactive Map</h1>
        <p className="text-gray-400">Click on the map to add markers and track important locations.</p>
      </div>

      <div className="bg-pywel-card rounded-lg p-4 border border-pywel-border">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gold-300 mb-2">Pin Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as PinCategory)}
            className="w-full bg-pywel-bg border border-pywel-border rounded px-3 py-2 text-white focus:border-gold-400 focus:outline-none"
          >
            <option value="collectible">Collectible</option>
            <option value="boss">Boss</option>
            <option value="npc">NPC</option>
            <option value="poi">Point of Interest</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <MapComponent onMapClick={handleMapClick} pins={pins} />
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-pywel-card rounded-lg p-6 border border-pywel-border max-w-md w-full">
            <h2 className="text-xl font-cinzel text-gold-400 mb-4">Add New Pin</h2>
            <input
              type="text"
              placeholder="Pin label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              className="w-full bg-pywel-bg border border-pywel-border rounded px-3 py-2 text-white mb-3 focus:border-gold-400 focus:outline-none"
            />
            <textarea
              placeholder="Notes (optional)"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-pywel-bg border border-pywel-border rounded px-3 py-2 text-white mb-4 focus:border-gold-400 focus:outline-none h-24"
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleAddPin(formData.label || 'Unnamed', formData.notes)}
                className="flex-1 bg-crimson-600 hover:bg-crimson-700 text-white font-semibold py-2 rounded transition"
              >
                Add Pin
              </button>
              <button
                onClick={() => setIsFormOpen(false)}
                className="flex-1 bg-pywel-secondary hover:bg-pywel-border text-white font-semibold py-2 rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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

      <div className="bg-pywel-card rounded-lg p-6 border border-pywel-border">
        <h2 className="text-xl font-cinzel text-gold-400 mb-4">Legend</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex items-center gap-2">
            <MapPinCollectible size={18} />
            <span className="text-sm text-gray-300">Collectible</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinBoss size={18} />
            <span className="text-sm text-gray-300">Boss</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinNPC size={18} />
            <span className="text-sm text-gray-300">NPC</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinPOI size={18} />
            <span className="text-sm text-gray-300">Point of Interest</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinCustom size={18} />
            <span className="text-sm text-gray-300">Custom</span>
          </div>
        </div>
      </div>
    </div>
  );
}
