'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/hooks/use-user';
import SignInPrompt from '@/components/SignInPrompt';

export default function NotesPage() {
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();
  const { user, loading: userLoading } = useUser();

  // Load notes on mount
  useEffect(() => {
    async function loadNotes() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('user_notes')
        .select('content')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setNotes(data.content || '');
      }
      setLoading(false);
    }

    loadNotes();
  }, []);

  // Debounced save
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!notes || saving) return;

      setSaving(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setSaving(false);
        return;
      }

      await supabase.rpc('upsert_user_notes', {
        p_content: notes,
      });

      setSaved(true);
      setSaving(false);
      setTimeout(() => setSaved(false), 2000);
    }, 500);

    return () => clearTimeout(timer);
  }, [notes]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    setSaved(false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Personal Notes</h1>
        <p className="text-gray-400">Keep personal notes about your adventure. Changes are saved automatically.</p>
      </div>

      {!user && !userLoading && (
        <SignInPrompt message="Sign in to save personal notes" />
      )}

      {user && (
      <div className="relative">
        {loading ? (
          <div className="w-full h-96 bg-pywel-card rounded-lg flex items-center justify-center text-gray-400">
            Loading notes...
          </div>
        ) : (
          <>
            <textarea
              value={notes}
              onChange={handleChange}
              placeholder="Write your notes here. They will be saved automatically..."
              className="w-full h-96 bg-pywel-bg border-2 border-pywel-border rounded-lg p-4 text-gray-100 placeholder-gray-500 focus:border-crimson-500 focus:outline-none resize-none"
            />
            {saved && (
              <div className="absolute bottom-4 right-4 bg-green-600/90 text-white px-3 py-1 rounded text-sm font-semibold">
                Saved
              </div>
            )}
            {saving && (
              <div className="absolute bottom-4 right-4 bg-gold-600/90 text-pywel-bg px-3 py-1 rounded text-sm font-semibold">
                Saving...
              </div>
            )}
          </>
        )}
      </div>
      )}
    </div>
  );
}
