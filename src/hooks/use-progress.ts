'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

// Manages syncing progress to/from Supabase with optimistic local updates
export function useProgress() {
  const [progress, setProgress] = useState<Record<string, Record<string, boolean>>>({});
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // Load all progress on mount
  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data } = await supabase
        .from('user_progress')
        .select('category, item_key, value')
        .eq('user_id', user.id);

      if (data) {
        const grouped: Record<string, Record<string, boolean>> = {};
        data.forEach(row => {
          if (!grouped[row.category]) grouped[row.category] = {};
          grouped[row.category][row.item_key] = true;
        });
        setProgress(grouped);
      }
      setLoading(false);
    }
    load();
  }, []);

  const isCompleted = useCallback((category: string, key: string) => {
    return progress[category]?.[key] ?? false;
  }, [progress]);

  const toggle = useCallback(async (category: string, key: string) => {
    const current = progress[category]?.[key] ?? false;
    const next = !current;

    // Optimistic update
    setProgress(prev => {
      const cat = { ...prev[category] };
      if (next) cat[key] = true;
      else delete cat[key];
      return { ...prev, [category]: cat };
    });

    // Sync to Supabase
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (next) {
      await supabase.rpc('upsert_progress', {
        p_category: category,
        p_item_key: key,
        p_value: { completed: true },
      });
    } else {
      await supabase
        .from('user_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('category', category)
        .eq('item_key', key);
    }
  }, [progress, supabase]);

  const countCompleted = useCallback((category: string, keys: string[]) => {
    return keys.filter(k => progress[category]?.[k]).length;
  }, [progress]);

  const totalCompleted = useCallback(() => {
    return Object.values(progress).reduce(
      (sum, cat) => sum + Object.keys(cat).length, 0
    );
  }, [progress]);

  return { progress, loading, isCompleted, toggle, countCompleted, totalCompleted };
}
