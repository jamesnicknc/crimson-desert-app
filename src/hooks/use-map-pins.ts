'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { PinCategory } from '@/types/game-data';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MapPinRow {
  id: string;
  user_id: string;
  lat: number;
  lng: number;
  label: string;
  category: string;
  icon: string;
  notes: string | null;
  is_shared: boolean;
  is_system?: boolean;
  map_slug?: string | null;
  created_at: string;
}

export interface MapPinWithProfile extends MapPinRow {
  display_name: string;
  avatar_url: string | null;
}

export interface CreatePinInput {
  lat: number;
  lng: number;
  label: string;
  category: PinCategory;
  icon?: string;
  notes?: string;
  isShared: boolean;
  mapSlug: string;
}

export interface UpdatePinInput {
  label?: string;
  category?: PinCategory;
  icon?: string;
  notes?: string | null;
  isShared?: boolean;
}

// ─── Pin Category Config ──────────────────────────────────────────────────────

export const PIN_CATEGORIES: Record<PinCategory, { label: string; color: string; letter: string }> = {
  loot: { label: 'Loot Spot', color: '#f5a65b', letter: '$' },
  arc: { label: 'ARC Sighting', color: '#ef4444', letter: 'A' },
  extraction: { label: 'Extraction', color: '#facc15', letter: 'E' },
  poi: { label: 'Point of Interest', color: '#3ec9b8', letter: 'P' },
  custom: { label: 'Custom', color: '#a855f7', letter: '?' },
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useMapPins(userId: string | null, mapSlug: string) {
  const [myPins, setMyPins] = useState<MapPinWithProfile[]>([]);
  const [groupPins, setGroupPins] = useState<MapPinWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const supabaseRef = useRef(createClient());
  const supabase = supabaseRef.current;

  const loadPins = useCallback(async () => {
    setLoading(true);

    if (!userId) {
      setMyPins([]);
      setGroupPins([]);
      setLoading(false);
      return;
    }

    const { data: ownPins } = await supabase
      .from('map_pins')
      .select('*')
      .eq('user_id', userId)
      .eq('map_slug', mapSlug)
      .order('created_at', { ascending: false });

    const { data: sharedPins } = await supabase
      .from('map_pins')
      .select('*')
      .eq('is_shared', true)
      .eq('map_slug', mapSlug)
      .neq('user_id', userId)
      .order('created_at', { ascending: false });

    const allPins = [...(ownPins ?? []), ...(sharedPins ?? [])];
    const userIds = [...new Set(allPins.map((p) => p.user_id))];

    const profileMap: Record<string, { display_name: string; avatar_url: string | null }> = {};
    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_url')
        .in('id', userIds);

      (profiles ?? []).forEach((p) => {
        profileMap[p.id] = { display_name: p.display_name ?? 'Raider', avatar_url: p.avatar_url };
      });
    }

    const enrich = (pin: MapPinRow): MapPinWithProfile => ({
      ...pin,
      display_name: profileMap[pin.user_id]?.display_name ?? 'Raider',
      avatar_url: profileMap[pin.user_id]?.avatar_url ?? null,
    });

    setMyPins((ownPins ?? []).map(enrich));
    setGroupPins((sharedPins ?? []).map(enrich));
    setLoading(false);
  }, [userId, mapSlug, supabase]);

  useEffect(() => {
    loadPins();
  }, [loadPins]);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`map-pins-${mapSlug}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'map_pins' }, () => {
        loadPins();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, mapSlug, supabase, loadPins]);

  const createPin = useCallback(
    async (input: CreatePinInput): Promise<MapPinWithProfile | null> => {
      if (!userId) return null;

      await supabase.from('profiles').upsert({ id: userId }, { onConflict: 'id', ignoreDuplicates: true });

      const { data, error } = await supabase
        .from('map_pins')
        .insert({
          user_id: userId,
          lat: input.lat,
          lng: input.lng,
          label: input.label,
          category: input.category,
          icon: input.icon ?? 'pin',
          notes: input.notes ?? null,
          is_shared: input.isShared,
          map_slug: input.mapSlug,
        })
        .select()
        .single();

      if (error || !data) return null;

      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name, avatar_url')
        .eq('id', userId)
        .single();

      const enriched: MapPinWithProfile = {
        ...data,
        display_name: profile?.display_name ?? 'Raider',
        avatar_url: profile?.avatar_url ?? null,
      };

      setMyPins((prev) => [enriched, ...prev]);
      return enriched;
    },
    [userId, supabase]
  );

  const updatePin = useCallback(
    async (pinId: string, input: UpdatePinInput): Promise<boolean> => {
      if (!userId) return false;

      const updates: Record<string, unknown> = {};
      if (input.label !== undefined) updates.label = input.label;
      if (input.category !== undefined) updates.category = input.category;
      if (input.icon !== undefined) updates.icon = input.icon;
      if (input.notes !== undefined) updates.notes = input.notes;
      if (input.isShared !== undefined) updates.is_shared = input.isShared;

      const { error } = await supabase.from('map_pins').update(updates).eq('id', pinId).eq('user_id', userId);
      if (error) return false;

      setMyPins((prev) =>
        prev.map((p) =>
          p.id === pinId
            ? {
                ...p,
                ...(input.label !== undefined && { label: input.label }),
                ...(input.category !== undefined && { category: input.category }),
                ...(input.icon !== undefined && { icon: input.icon }),
                ...(input.notes !== undefined && { notes: input.notes ?? null }),
                ...(input.isShared !== undefined && { is_shared: input.isShared }),
              }
            : p
        )
      );
      return true;
    },
    [userId, supabase]
  );

  const deletePin = useCallback(
    async (pinId: string): Promise<boolean> => {
      if (!userId) return false;
      const { error } = await supabase.from('map_pins').delete().eq('id', pinId).eq('user_id', userId);
      if (error) return false;
      setMyPins((prev) => prev.filter((p) => p.id !== pinId));
      return true;
    },
    [userId, supabase]
  );

  return {
    myPins,
    groupPins,
    allPins: [...myPins, ...groupPins],
    loading,
    createPin,
    updatePin,
    deletePin,
    reload: loadPins,
  };
}
