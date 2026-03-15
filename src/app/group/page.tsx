'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/hooks/use-user';
import SignInPrompt from '@/components/SignInPrompt';
import type { GroupMember } from '@/types/game-data';

export default function GroupPage() {
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [inviteCode, setInviteCode] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);
  const supabase = createClient();
  const { user, loading: userLoading } = useUser();

  useEffect(() => {
    loadGroupData();
  }, []);

  const loadGroupData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    // Get group progress
    const { data: progressData } = await supabase.rpc('get_group_progress');
    if (progressData) {
      setGroupMembers(progressData);
    }

    setLoading(false);
  };

  const createGroup = async () => {
    setCreating(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setCreating(false);
      return;
    }

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Insert group with invite code
    await supabase.from('groups').insert([
      {
        name: `${user.email}'s Group`,
        invite_code: code,
        owner_id: user.id,
      },
    ]);

    setInviteCode(code);
    setCreating(false);
  };

  const joinGroup = async () => {
    if (!codeInput.trim()) {
      alert('Please enter an invite code');
      return;
    }

    setJoining(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setJoining(false);
      return;
    }

    const { data: group } = await supabase
      .from('groups')
      .select('id')
      .eq('invite_code', codeInput.toUpperCase())
      .single();

    if (!group) {
      alert('Invalid invite code');
      setJoining(false);
      return;
    }

    // Add user to group
    await supabase.from('group_members').insert([
      {
        group_id: group.id,
        user_id: user.id,
      },
    ]);

    setCodeInput('');
    await loadGroupData();
    setJoining(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Group Dashboard</h1>
        <p className="text-gray-400">Connect with friends and compare your progress across the game.</p>
      </div>

      {!user && !userLoading && (
        <SignInPrompt message="Sign in to create or join groups" />
      )}

      {user && (
      <>
      {/* Create/Join Group */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-pywel-card rounded-lg p-6 border border-pywel-border">
          <h2 className="text-lg font-cinzel font-semibold text-gold-400 mb-4">Create Group</h2>
          {inviteCode ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-300">Share this code with friends:</p>
              <div className="bg-pywel-bg border border-gold-600 rounded px-4 py-3">
                <p className="text-2xl font-cinzel font-bold text-gold-400 text-center">{inviteCode}</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(inviteCode);
                  alert('Invite code copied!');
                }}
                className="w-full bg-gold-600 hover:bg-gold-700 text-pywel-bg font-semibold py-2 rounded transition"
              >
                Copy Code
              </button>
            </div>
          ) : (
            <button
              onClick={createGroup}
              disabled={creating}
              className="w-full bg-crimson-600 hover:bg-crimson-700 disabled:bg-gray-600 text-white font-semibold py-2 rounded transition"
            >
              {creating ? 'Creating...' : 'Create Group'}
            </button>
          )}
        </div>

        <div className="bg-pywel-card rounded-lg p-6 border border-pywel-border">
          <h2 className="text-lg font-cinzel font-semibold text-gold-400 mb-4">Join Group</h2>
          <div className="space-y-3">
            <input
              type="text"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
              placeholder="Enter invite code"
              className="w-full bg-pywel-bg border border-pywel-border rounded px-3 py-2 text-white focus:border-gold-400 focus:outline-none"
            />
            <button
              onClick={joinGroup}
              disabled={joining || !codeInput.trim()}
              className="w-full bg-gold-600 hover:bg-gold-700 disabled:bg-gray-600 text-pywel-bg font-semibold py-2 rounded transition"
            >
              {joining ? 'Joining...' : 'Join Group'}
            </button>
          </div>
        </div>
      </div>

      {/* Group Members */}
      <div className="bg-pywel-card rounded-lg p-6 border border-pywel-border">
        <h2 className="text-xl font-cinzel font-semibold text-gold-400 mb-6">Group Members</h2>

        {loading ? (
          <div className="text-center text-gray-400">Loading members...</div>
        ) : groupMembers.length === 0 ? (
          <div className="text-center text-gray-400 py-6">
            <p>No group members yet. Create or join a group to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {groupMembers.map(member => (
              <div key={member.userId} className="flex items-center gap-4 p-4 bg-pywel-secondary rounded-lg border border-pywel-border">
                <div className="w-12 h-12 rounded-full bg-gold-600 flex items-center justify-center text-lg font-cinzel font-bold text-pywel-bg">
                  {member.displayName?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gold-300">{member.displayName || 'Unknown'}</p>
                  <p className="text-xs text-gray-400">
                    {member.totalCompleted} total progress items
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p className="text-gray-300">
                    <span className="text-gold-300 font-semibold">{member.skillsCompleted}</span> Skills
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gold-300 font-semibold">{member.bossesDefeated}</span> Bosses
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress Comparison */}
      {groupMembers.length > 0 && (
        <div className="bg-pywel-card rounded-lg p-6 border border-pywel-border">
          <h2 className="text-xl font-cinzel font-semibold text-gold-400 mb-6">Progress Comparison</h2>

          <div className="space-y-4">
            {groupMembers.map(member => (
              <div key={member.userId}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-300">{member.displayName}</span>
                  <span className="text-sm text-gold-300">{member.totalCompleted}</span>
                </div>
                <div className="w-full bg-pywel-bg rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-600 to-gold-500 transition-all"
                    style={{ width: `${Math.min((member.totalCompleted / 100) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
}
