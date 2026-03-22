'use client';

import { useState } from 'react';
import { Pencil, Trash2, Share2, Lock, Loader2, X, Check } from 'lucide-react';
import { PIN_CATEGORIES, type MapPinWithProfile, type UpdatePinInput } from '@/hooks/use-map-pins';
import type { PinCategory } from '@/types/game-data';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PinPopupProps {
  pin: MapPinWithProfile;
  isOwner: boolean;
  onUpdate: (pinId: string, input: UpdatePinInput) => Promise<boolean>;
  onDelete: (pinId: string) => Promise<boolean>;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PinPopup({ pin, isOwner, onUpdate, onDelete }: PinPopupProps) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [label, setLabel] = useState(pin.label);
  const [notes, setNotes] = useState(pin.notes ?? '');
  const [category, setCategory] = useState<PinCategory>(pin.category as PinCategory);
  const [isShared, setIsShared] = useState(pin.is_shared);

  const catConfig = PIN_CATEGORIES[pin.category as PinCategory] ?? PIN_CATEGORIES.custom;

  const handleSave = async () => {
    setSaving(true);
    await onUpdate(pin.id, {
      label: label.trim() || pin.label,
      notes: notes.trim() || null,
      category,
      isShared,
    });
    setSaving(false);
    setEditing(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(pin.id);
    // Popup will be removed when pin disappears from state
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // ── Edit mode ─────────────────────────────────────────────────────────

  if (editing) {
    return (
      <div style={{ minWidth: '240px', maxWidth: '280px', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="space-y-2">
          <input
            type="text"
            value={label}
            onChange={e => setLabel(e.target.value)}
            maxLength={60}
            className="w-full bg-pywel-bg border border-pywel-border rounded px-2 py-1 text-sm text-gray-100 focus:outline-none focus:border-gold-500/50"
            autoFocus
          />

          <div className="flex flex-wrap gap-1">
            {(Object.entries(PIN_CATEGORIES) as [PinCategory, typeof PIN_CATEGORIES[PinCategory]][]).map(
              ([cat, cfg]) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all border ${
                    category === cat
                      ? 'border-transparent text-black'
                      : 'border-pywel-border text-gray-400'
                  }`}
                  style={category === cat ? { backgroundColor: cfg.color } : {}}
                >
                  {cfg.label}
                </button>
              )
            )}
          </div>

          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Notes..."
            rows={2}
            maxLength={300}
            className="w-full bg-pywel-bg border border-pywel-border rounded px-2 py-1 text-xs text-gray-100 placeholder-gray-600 focus:outline-none focus:border-gold-500/50 resize-none"
          />

          <button
            onClick={() => setIsShared(!isShared)}
            className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded border transition-all ${
              isShared ? 'border-sky-700/40 text-sky-300' : 'border-pywel-border text-gray-500'
            }`}
          >
            {isShared ? <Share2 className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
            {isShared ? 'Shared' : 'Private'}
          </button>

          <div className="flex gap-1.5">
            <button
              onClick={() => setEditing(false)}
              className="flex-1 px-2 py-1 text-xs text-gray-400 border border-pywel-border rounded hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 px-2 py-1 text-xs font-semibold bg-gold-600 text-black rounded hover:bg-gold-500 disabled:opacity-50 flex items-center justify-center gap-1 transition-colors"
            >
              {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── View mode ─────────────────────────────────────────────────────────

  return (
    <div style={{ minWidth: '210px', maxWidth: '280px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Label */}
      <div
        style={{
          fontFamily: 'Cinzel, Georgia, serif',
          fontSize: '14px',
          fontWeight: '700',
          color: '#d4a847',
          marginBottom: '6px',
          lineHeight: '1.3',
        }}
      >
        {pin.label}
      </div>

      {/* Category badge + shared indicator */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
        <span
          style={{
            background: catConfig.color,
            color: '#000',
            padding: '2px 9px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: '600',
          }}
        >
          {catConfig.label}
        </span>
        {pin.is_shared ? (
          <span style={{ fontSize: '11px', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Share2 size={10} /> Shared
          </span>
        ) : (
          <span style={{ fontSize: '11px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Lock size={10} /> Private
          </span>
        )}
      </div>

      {/* Notes */}
      {pin.notes && (
        <p style={{ fontSize: '12px', color: '#9ca3af', lineHeight: '1.55', margin: '0 0 8px 0' }}>
          {pin.notes}
        </p>
      )}

      {/* Attribution */}
      <div style={{ fontSize: '11px', color: '#4b5563', marginBottom: isOwner ? '8px' : '0' }}>
        {isOwner ? 'Placed by you' : `Placed by ${pin.display_name}`} · {timeAgo(pin.created_at)}
      </div>

      {/* Owner actions */}
      {isOwner && (
        <div style={{ display: 'flex', gap: '6px', borderTop: '1px solid #2A2630', paddingTop: '8px' }}>
          <button
            onClick={() => setEditing(true)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '4px 8px',
              borderRadius: '6px',
              border: '1px solid #2A2630',
              background: 'transparent',
              color: '#9ca3af',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            <Pencil size={11} /> Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '4px 8px',
              borderRadius: '6px',
              border: '1px solid rgba(239,68,68,0.3)',
              background: 'transparent',
              color: '#ef4444',
              fontSize: '11px',
              fontWeight: '600',
              cursor: deleting ? 'not-allowed' : 'pointer',
              opacity: deleting ? 0.5 : 1,
            }}
          >
            {deleting ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
