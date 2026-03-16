'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/hooks/use-user';

type ProgressValue = boolean | Record<string, unknown>;

// Manages syncing progress to/from Supabase with optimistic local updates.
// Relies on useUser for auth state so progress loads reliably after sign-in,
// token refresh, and page reload.
export function useProgress() {
  const [progress, setProgress] = useState<Record<string, Record<string, ProgressValue>>>({});
  const [loading, setLoading] = useState(true);
  const { user, loading: userLoading } = useUser();
  const supabase = createClient();
  const loadedForUser = useRef<string | null>(null);

  // Load all progress when user becomes available
  useEffect(() => {
    if (userLoading) return;

    if (!user) {
      setProgress({});
      setLoading(false);
      loadedForUser.current = null;
      return;
    }

    // Don't re-load if we already loaded for this user
    if (loadedForUser.current === user.id) return;

    async function load() {
      const { data, error } = await supabase
        .from('user_progress')
        .select('category, item_key, value')
        .eq('user_id', user!.id);

      if (error) {
        console.error('[useProgress] Failed to load:', error.message);
        setLoading(false);
        return;
      }

      if (data) {
        const grouped: Record<string, Record<string, ProgressValue>> = {};
        data.forEach(row => {
          if (!grouped[row.category]) grouped[row.category] = {};
          // Store full value for rich state (e.g. quest status)
          // Simple completions store { completed: true }, quests store { status: '...' }
          grouped[row.category][row.item_key] = row.value ?? true;
        });
        setProgress(grouped);
        loadedForUser.current = user!.id;
      }
      setLoading(false);
    }

    load();
  }, [user, userLoading, supabase]);

  const isAuthenticated = !!user;

  const isCompleted = useCallback((category: string, key: string) => {
    const val = progress[category]?.[key];
    if (!val) return false;
    // For quest entries, check if status is 'complete'
    if (typeof val === 'object' && 'status' in val) {
      return val.status === 'complete';
    }
    return !!val;
  }, [progress]);

  // Get the raw stored value for a progress entry (used for quest status etc.)
  const getValue = useCallback((category: string, key: string): ProgressValue | undefined => {
    return progress[category]?.[key];
  }, [progress]);

  const toggle = useCallback(async (category: string, key: string) => {
    const current = progress[category]?.[key];
    const isOn = !!current;
    const next = !isOn;

    // Optimistic update
    setProgress(prev => {
      const cat = { ...(prev[category] || {}) };
      if (next) cat[key] = true;
      else delete cat[key];
      return { ...prev, [category]: cat };
    });

    if (!user) return;

    if (next) {
      const { error } = await supabase.rpc('upsert_progress', {
        p_category: category,
        p_item_key: key,
        p_value: { completed: true },
      });
      if (error) console.error('[useProgress] Save failed:', error.message);
    } else {
      const { error } = await supabase
        .from('user_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('category', category)
        .eq('item_key', key);
      if (error) console.error('[useProgress] Delete failed:', error.message);
    }
  }, [progress, supabase, user]);

  // Set a rich value (e.g. quest status) instead of a simple boolean toggle
  const setValue = useCallback(async (category: string, key: string, value: Record<string, unknown> | null) => {
    // Optimistic update
    setProgress(prev => {
      const cat = { ...(prev[category] || {}) };
      if (value) cat[key] = value;
      else delete cat[key];
      return { ...prev, [category]: cat };
    });

    if (!user) return;

    if (value) {
      const { error } = await supabase.rpc('upsert_progress', {
        p_category: category,
        p_item_key: key,
        p_value: value,
      });
      if (error) console.error('[useProgress] setValue failed:', error.message);
    } else {
      const { error } = await supabase
        .from('user_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('category', category)
        .eq('item_key', key);
      if (error) console.error('[useProgress] delete failed:', error.message);
    }
  }, [supabase, user]);

  const countCompleted = useCallback((category: string, keys: string[]) => {
    return keys.filter(k => {
      const val = progress[category]?.[k];
      if (!val) return false;
      if (typeof val === 'object' && 'status' in val) return val.status === 'complete';
      return !!val;
    }).length;
  }, [progress]);

  const totalCompleted = useCallback(() => {
    return Object.values(progress).reduce(
      (sum, cat) => sum + Object.keys(cat).length, 0
    );
  }, [progress]);

  return { progress, loading, isAuthenticated, isCompleted, toggle, countCompleted, totalCompleted, getValue, setValue };
}
