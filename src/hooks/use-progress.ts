'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type ProgressValue = Record<string, unknown>;
type ProgressState = Record<string, Record<string, ProgressValue>>;

// Syncs per-item progress to Supabase (user_progress) with optimistic local updates.
// Guests get a local-only state that resets on reload.
export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>({});
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled) return;
      if (!user) { setLoading(false); return; }
      setIsAuthenticated(true);
      setUserId(user.id);

      const { data } = await supabase
        .from('user_progress')
        .select('category, item_key, value')
        .eq('user_id', user.id)
        .like('category', 'ar-%');

      if (data && !cancelled) {
        const grouped: ProgressState = {};
        data.forEach((row) => {
          if (!grouped[row.category]) grouped[row.category] = {};
          grouped[row.category][row.item_key] = (row.value as ProgressValue) ?? { completed: true };
        });
        setProgress(grouped);
      }
      if (!cancelled) setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [supabase]);

  const getValue = useCallback(
    (category: string, key: string): ProgressValue | undefined => progress[category]?.[key],
    [progress]
  );

  const isCompleted = useCallback(
    (category: string, key: string) => {
      const v = progress[category]?.[key];
      if (!v) return false;
      if ('status' in v) return v.status === 'complete';
      return v.completed !== false;
    },
    [progress]
  );

  const setValue = useCallback(
    async (category: string, key: string, value: ProgressValue | null) => {
      setProgress((prev) => {
        const cat = { ...(prev[category] ?? {}) };
        if (value) cat[key] = value;
        else delete cat[key];
        return { ...prev, [category]: cat };
      });

      if (!userId) return;
      if (value) {
        await supabase.rpc('upsert_progress', { p_category: category, p_item_key: key, p_value: value });
      } else {
        await supabase
          .from('user_progress')
          .delete()
          .eq('user_id', userId)
          .eq('category', category)
          .eq('item_key', key);
      }
    },
    [supabase, userId]
  );

  const toggle = useCallback(
    async (category: string, key: string) => {
      const current = isCompleted(category, key);
      await setValue(category, key, current ? null : { completed: true });
    },
    [isCompleted, setValue]
  );

  const countCompleted = useCallback(
    (category: string, keys: string[]) => keys.filter((k) => isCompleted(category, k)).length,
    [isCompleted]
  );

  const categoryCount = useCallback(
    (category: string) => Object.keys(progress[category] ?? {}).filter((k) => isCompleted(category, k)).length,
    [progress, isCompleted]
  );

  return { progress, loading, isAuthenticated, getValue, isCompleted, setValue, toggle, countCompleted, categoryCount };
}
