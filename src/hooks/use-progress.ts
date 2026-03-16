'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

// Manages syncing progress to/from Supabase with optimistic local updates
export function useProgress() {
  const [progress, setProgress] = useState<Record<string, Record<string, boolean>>>({});
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const supabase = createClient();
  const loadedRef = useRef(false);

  // Load progress for a given user
  const loadProgress = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('category, item_key, value')
      .eq('user_id', userId);

    if (error) {
      console.error('Failed to load progress:', error.message);
      setLoading(false);
      return;
    }

    if (data) {
      const grouped: Record<string, Record<string, boolean>> = {};
      data.forEach(row => {
        if (!grouped[row.category]) grouped[row.category] = {};
        grouped[row.category][row.item_key] = true;
      });
      setProgress(grouped);
    }
    setIsAuthenticated(true);
    setLoading(false);
    loadedRef.current = true;
  }, [supabase]);

  // Listen for auth state changes so progress loads even if session
  // isn't ready on first mount (fixes progress not appearing on reload)
  useEffect(() => {
    // Try loading immediately if session already exists
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user && !loadedRef.current) {
        loadProgress(user.id);
      } else if (!user) {
        setLoading(false);
      }
    });

    // Also listen for auth state changes (sign-in, token refresh, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user && !loadedRef.current) {
          loadProgress(session.user.id);
        } else if (!session?.user) {
          // User signed out - clear progress
          setProgress({});
          setIsAuthenticated(false);
          setLoading(false);
          loadedRef.current = false;
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase, loadProgress]);

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
      const { error } = await supabase.rpc('upsert_progress', {
        p_category: category,
        p_item_key: key,
        p_value: { completed: true },
      });
      if (error) console.error('Failed to save progress:', error.message);
    } else {
      const { error } = await supabase
        .from('user_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('category', category)
        .eq('item_key', key);
      if (error) console.error('Failed to delete progress:', error.message);
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

  return { progress, loading, isAuthenticated, isCompleted, toggle, countCompleted, totalCompleted };
}
