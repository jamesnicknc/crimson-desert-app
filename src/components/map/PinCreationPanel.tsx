'use client';

import { useState } from 'react';
import { X, Loader2, MapPin, Share2, Lock } from 'lucide-react';
import { PIN_CATEGORIES } from '@/hooks/use-map-pins';
import type { PinCategory } from '@/types/game-data';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PinCreationPanelProps {
  coords: [number, number]; // [lat, lng]
  onSave: (data: {
    label: string;
    category: PinCategory;
    notes: string;
    isShared: boolean;
  }) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PinCreationPanel({
  coords,
  onSave,
  onCancel,
  saving,
}: PinCreationPanelProps) {
  const [label, setLabel] = useState('');
  const [category, setCategory] = useState<PinCategory>('custom');
  const [notes, setNotes] = useState('');
  const [isShared, setIsShared] = useState(true);

  const handleSubmit = async () => {
    if (!label.trim()) return;
    await onSave({
      label: label.trim(),
      category,
      notes: notes.trim(),
      isShared,
    });
  };

  return (
    <div className="absolute top-4 right-4 z-[1100] w-80 bg-pywel-card border border-pywel-border rounded-xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-pywel-border flex items-center justify-between bg-pywel-bg/50">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gold-400" />
          <h3 className="text-sm font-cinzel font-bold text-gold-300">New Pin</h3>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Form */}
      <div className="p-4 space-y-3">
        {/* Coordinates display */}
        <div className="text-xs text-gray-500 font-mono bg-pywel-bg rounded px-2 py-1">
          Position: {coords[0].toFixed(1)}, {coords[1].toFixed(1)}
        </div>

        {/* Label */}
        <div>
          <label className="block text-xs text-gray-400 mb-1 font-cinzel">Label</label>
          <input
            type="text"
            value={label}
            onChange={e => setLabel(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="e.g. Secret Chest, Rare Spawn..."
            maxLength={60}
            autoFocus
            className="w-full bg-pywel-bg border border-pywel-border rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs text-gray-400 mb-1 font-cinzel">Category</label>
          <div className="flex flex-wrap gap-1.5">
            {(Object.entries(PIN_CATEGORIES) as [PinCategory, typeof PIN_CATEGORIES[PinCategory]][]).map(
              ([cat, cfg]) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all border ${
                    category === cat
                      ? 'border-transparent text-black'
                      : 'border-pywel-border text-gray-400 hover:border-gray-500'
                  }`}
                  style={category === cat ? { backgroundColor: cfg.color } : {}}
                >
                  <span
                    className="w-3 h-3 rounded-full flex items-center justify-center text-[8px] font-bold"
                    style={category === cat ? { color: 'rgba(0,0,0,0.6)' } : { color: cfg.color }}
                  >
                    {cfg.letter}
                  </span>
                  {cfg.label}
                </button>
              )
            )}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs text-gray-400 mb-1 font-cinzel">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Any details about this location..."
            rows={2}
            maxLength={300}
            className="w-full bg-pywel-bg border border-pywel-border rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
          />
        </div>

        {/* Shared toggle */}
        <button
          onClick={() => setIsShared(!isShared)}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-all ${
            isShared
              ? 'border-sky-700/40 bg-sky-900/20 text-sky-300'
              : 'border-pywel-border bg-pywel-bg text-gray-400'
          }`}
        >
          {isShared ? (
            <Share2 className="w-3.5 h-3.5" />
          ) : (
            <Lock className="w-3.5 h-3.5" />
          )}
          {isShared ? 'Shared with your groups' : 'Private (only you)'}
        </button>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={onCancel}
            className="flex-1 px-3 py-2 bg-pywel-bg border border-pywel-border text-gray-400 hover:text-gray-200 rounded-lg transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!label.trim() || saving}
            className="flex-1 px-3 py-2 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-cinzel font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
            Save Pin
          </button>
        </div>
      </div>
    </div>
  );
}
