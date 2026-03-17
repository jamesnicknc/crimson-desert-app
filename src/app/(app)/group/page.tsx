'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/hooks/use-user';
import SignInPrompt from '@/components/SignInPrompt';
import {
  Users2,
  Plus,
  LogIn,
  Copy,
  Check,
  Crown,
  LogOut,
  Trophy,
  Loader2,
  RefreshCw,
  X,
} from 'lucide-react';

interface Group {
  id: string;
  name: string;
  invite_code: string;
  created_by: string | null;
  created_at: string;
}

interface Member {
  user_id: string;
  joined_at: string;
  display_name: string;
  total_progress: number;
}

type View = 'dashboard' | 'create' | 'join';

export default function GroupPage() {
  const { user, loading: userLoading } = useUser();
  const [view, setView] = useState<View>('dashboard');
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [membersLoading, setMembersLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Create form
  const [groupName, setGroupName] = useState('');

  // Join form
  const [inviteCode, setInviteCode] = useState('');

  const supabase = createClient();

  const loadGroups = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    // Get all groups the user is a member of
    const { data: memberRows } = await supabase
      .from('group_members')
      .select('group_id')
      .eq('user_id', user.id);

    if (!memberRows || memberRows.length === 0) {
      setGroups([]);
      setLoading(false);
      return;
    }

    const groupIds = memberRows.map((r) => r.group_id);

    const { data: groupData } = await supabase
      .from('groups')
      .select('*')
      .in('id', groupIds)
      .order('created_at', { ascending: false });

    setGroups(groupData ?? []);
    setLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    if (user) loadGroups();
    else if (!userLoading) setLoading(false);
  }, [user, userLoading, loadGroups]);

  const loadMembers = useCallback(async (group: Group) => {
    setMembersLoading(true);
    setMembers([]);

    // Get all members of this group
    const { data: memberRows } = await supabase
      .from('group_members')
      .select('user_id, joined_at')
      .eq('group_id', group.id)
      .order('joined_at', { ascending: true });

    if (!memberRows || memberRows.length === 0) {
      setMembersLoading(false);
      return;
    }

    const userIds = memberRows.map((r) => r.user_id);

    // Get profiles
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, display_name')
      .in('id', userIds);

    // Get progress counts per user (only count truly completed items)
    const { data: progressRows } = await supabase
      .from('user_progress')
      .select('user_id, category, value')
      .in('user_id', userIds);

    const progressCounts: Record<string, number> = {};
    (progressRows ?? []).forEach((r) => {
      // For quests, only count items with status "complete" (not "active")
      if (r.category === 'quest') {
        const val = r.value as { status?: string } | null;
        if (val?.status !== 'complete') return;
      }
      progressCounts[r.user_id] = (progressCounts[r.user_id] ?? 0) + 1;
    });

    const profileMap: Record<string, string> = {};
    (profiles ?? []).forEach((p) => {
      profileMap[p.id] = p.display_name ?? 'Adventurer';
    });

    const built: Member[] = memberRows.map((r) => ({
      user_id: r.user_id,
      joined_at: r.joined_at,
      display_name: profileMap[r.user_id] ?? 'Adventurer',
      total_progress: progressCounts[r.user_id] ?? 0,
    }));

    // Sort by progress descending for leaderboard
    built.sort((a, b) => b.total_progress - a.total_progress);

    setMembers(built);
    setMembersLoading(false);
  }, [supabase]);

  useEffect(() => {
    if (selectedGroup) loadMembers(selectedGroup);
  }, [selectedGroup, loadMembers]);

  const handleCreate = async () => {
    if (!user || !groupName.trim()) return;
    setActionLoading(true);
    setError(null);

    const name = groupName.trim();

    // Ensure profile exists (required by groups.created_by FK constraint)
    await supabase
      .from('profiles')
      .upsert({ id: user.id }, { onConflict: 'id', ignoreDuplicates: true });

    // Insert group
    const { data: newGroup, error: createErr } = await supabase
      .from('groups')
      .insert({ name, created_by: user.id })
      .select()
      .single();

    if (createErr || !newGroup) {
      setError(`Failed to create group: ${createErr?.message ?? 'unknown error'}`);
      setActionLoading(false);
      return;
    }

    // Auto-join as creator
    const { error: joinErr } = await supabase
      .from('group_members')
      .insert({ group_id: newGroup.id, user_id: user.id });

    if (joinErr) {
      setError('Group created but failed to join. Please refresh.');
      setActionLoading(false);
      return;
    }

    setGroupName('');
    setView('dashboard');
    await loadGroups();
    setSelectedGroup(newGroup);
    setActionLoading(false);
  };

  const handleJoin = async () => {
    if (!user || !inviteCode.trim()) return;
    setActionLoading(true);
    setError(null);

    const code = inviteCode.trim().toLowerCase();

    // Find the group by invite code
    const { data: group, error: lookupErr } = await supabase
      .from('groups')
      .select('*')
      .eq('invite_code', code)
      .single();

    if (lookupErr || !group) {
      setError('No group found with that invite code. Double-check and try again.');
      setActionLoading(false);
      return;
    }

    // Check if already a member
    const { data: existing } = await supabase
      .from('group_members')
      .select('user_id')
      .eq('group_id', group.id)
      .eq('user_id', user.id)
      .single();

    if (existing) {
      setError("You're already a member of that group.");
      setActionLoading(false);
      return;
    }

    // Ensure profile exists (required by group_members.user_id FK constraint)
    await supabase
      .from('profiles')
      .upsert({ id: user.id }, { onConflict: 'id', ignoreDuplicates: true });

    const { error: joinErr } = await supabase
      .from('group_members')
      .insert({ group_id: group.id, user_id: user.id });

    if (joinErr) {
      setError(`Failed to join group: ${joinErr.message}`);
      setActionLoading(false);
      return;
    }

    setInviteCode('');
    setView('dashboard');
    await loadGroups();
    setSelectedGroup(group);
    setActionLoading(false);
  };

  const handleLeave = async (group: Group) => {
    if (!user) return;
    setActionLoading(true);

    await supabase
      .from('group_members')
      .delete()
      .eq('group_id', group.id)
      .eq('user_id', user.id);

    if (selectedGroup?.id === group.id) setSelectedGroup(null);
    await loadGroups();
    setActionLoading(false);
  };

  const copyInviteCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-1">Group Dashboard</h1>
          <p className="text-gray-400">Connect with friends and compare your progress.</p>
        </div>
        <SignInPrompt message="Sign in to create and join groups" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-1">Group Dashboard</h1>
          <p className="text-gray-400">Connect with friends and compare your progress.</p>
        </div>
        {view === 'dashboard' && (
          <div className="flex gap-2">
            <button
              onClick={() => { setView('join'); setError(null); }}
              className="flex items-center gap-2 px-4 py-2 bg-pywel-card border border-pywel-border hover:border-gold-500/50 text-gray-300 hover:text-gold-300 rounded-lg transition-colors text-sm font-cinzel"
            >
              <LogIn className="w-4 h-4" />
              Join Group
            </button>
            <button
              onClick={() => { setView('create'); setError(null); }}
              className="flex items-center gap-2 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-black rounded-lg transition-colors text-sm font-cinzel font-semibold"
            >
              <Plus className="w-4 h-4" />
              Create Group
            </button>
          </div>
        )}
      </div>

      {/* Create Group Form */}
      {view === 'create' && (
        <div className="bg-pywel-card border border-pywel-border rounded-xl p-6 max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-cinzel font-bold text-gold-300">Create a New Group</h2>
            <button onClick={() => { setView('dashboard'); setError(null); setGroupName(''); }}>
              <X className="w-5 h-5 text-gray-400 hover:text-gray-200" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1 font-cinzel">Group Name</label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                placeholder="e.g. The Desert Runners"
                maxLength={40}
                className="w-full bg-pywel-bg border border-pywel-border rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
              <p className="text-xs text-gray-600 mt-1">{groupName.length}/40</p>
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <div className="flex gap-2">
              <button
                onClick={() => { setView('dashboard'); setError(null); setGroupName(''); }}
                className="flex-1 px-4 py-2 bg-pywel-bg border border-pywel-border text-gray-400 hover:text-gray-200 rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!groupName.trim() || actionLoading}
                className="flex-1 px-4 py-2 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-cinzel font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
              >
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Group Form */}
      {view === 'join' && (
        <div className="bg-pywel-card border border-pywel-border rounded-xl p-6 max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-cinzel font-bold text-gold-300">Join a Group</h2>
            <button onClick={() => { setView('dashboard'); setError(null); setInviteCode(''); }}>
              <X className="w-5 h-5 text-gray-400 hover:text-gray-200" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1 font-cinzel">Invite Code</label>
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toLowerCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                placeholder="e.g. a1b2c3d4"
                maxLength={8}
                className="w-full bg-pywel-bg border border-pywel-border rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-600 font-mono focus:outline-none focus:border-gold-500/50 transition-colors tracking-widest"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <div className="flex gap-2">
              <button
                onClick={() => { setView('dashboard'); setError(null); setInviteCode(''); }}
                className="flex-1 px-4 py-2 bg-pywel-bg border border-pywel-border text-gray-400 hover:text-gray-200 rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleJoin}
                disabled={inviteCode.length < 6 || actionLoading}
                className="flex-1 px-4 py-2 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-cinzel font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
              >
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                Join
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard */}
      {view === 'dashboard' && (
        <>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
            </div>
          ) : groups.length === 0 ? (
            /* Empty state */
            <div className="bg-pywel-card border border-pywel-border rounded-xl p-12 text-center space-y-4">
              <Users2 className="w-14 h-14 text-gold-400/30 mx-auto" />
              <h2 className="text-xl font-cinzel font-bold text-gold-300">No Groups Yet</h2>
              <p className="text-gray-400 max-w-sm mx-auto">
                Create a group and share the invite code with friends, or enter a code someone shared with you.
              </p>
              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={() => { setView('join'); setError(null); }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-pywel-bg border border-pywel-border hover:border-gold-500/50 text-gray-300 hover:text-gold-300 rounded-lg transition-colors text-sm font-cinzel"
                >
                  <LogIn className="w-4 h-4" />
                  Join with Code
                </button>
                <button
                  onClick={() => { setView('create'); setError(null); }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-black rounded-lg transition-colors text-sm font-cinzel font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Create Group
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Group list (left column) */}
              <div className="space-y-3">
                <h2 className="text-sm font-cinzel font-semibold text-gold-400 uppercase tracking-wider">
                  Your Groups
                </h2>
                {groups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedGroup?.id === group.id
                        ? 'bg-pywel-card-hover border-gold-500/50'
                        : 'bg-pywel-card border-pywel-border hover:border-gold-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-cinzel font-semibold text-gold-300 truncate pr-2">
                        {group.name}
                      </span>
                      {group.created_by === user.id && (
                        <Crown className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-pywel-bg border border-pywel-border px-2 py-0.5 rounded text-gray-400 tracking-wider">
                        {group.invite_code}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Group detail (right columns) */}
              <div className="lg:col-span-2">
                {!selectedGroup ? (
                  <div className="bg-pywel-card border border-pywel-border rounded-xl p-10 text-center text-gray-500">
                    <Users2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="font-cinzel">Select a group to view members</p>
                  </div>
                ) : (
                  <div className="bg-pywel-card border border-pywel-border rounded-xl overflow-hidden">
                    {/* Group header */}
                    <div className="px-6 py-5 border-b border-pywel-border flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-cinzel font-bold text-gold-300 mb-1">
                          {selectedGroup.name}
                        </h2>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Invite code:</span>
                          <span className="font-mono text-sm text-gold-300 tracking-widest">
                            {selectedGroup.invite_code}
                          </span>
                          <button
                            onClick={() => copyInviteCode(selectedGroup.invite_code)}
                            className="text-gray-500 hover:text-gold-300 transition-colors"
                            title="Copy invite code"
                          >
                            {copiedCode ? (
                              <Check className="w-3.5 h-3.5 text-green-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => loadMembers(selectedGroup)}
                          className="p-2 text-gray-500 hover:text-gold-300 transition-colors"
                          title="Refresh"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleLeave(selectedGroup)}
                          disabled={actionLoading}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-cinzel text-red-400 hover:text-red-300 border border-red-900/40 hover:border-red-700/50 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Leave
                        </button>
                      </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Trophy className="w-4 h-4 text-gold-400" />
                        <h3 className="text-sm font-cinzel font-semibold text-gold-400 uppercase tracking-wider">
                          Progress Leaderboard
                        </h3>
                      </div>

                      {membersLoading ? (
                        <div className="flex items-center justify-center py-10">
                          <Loader2 className="w-6 h-6 animate-spin text-gold-400" />
                        </div>
                      ) : members.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center py-8">No members found.</p>
                      ) : (
                        <div className="space-y-2">
                          {members.map((member, index) => {
                            const isCurrentUser = member.user_id === user.id;
                            const isCreator = member.user_id === selectedGroup.created_by;
                            const rank = index + 1;
                            const rankColor =
                              rank === 1
                                ? 'text-yellow-400'
                                : rank === 2
                                ? 'text-gray-300'
                                : rank === 3
                                ? 'text-amber-600'
                                : 'text-gray-600';

                            return (
                              <div
                                key={member.user_id}
                                className={`flex items-center gap-4 p-3 rounded-lg ${
                                  isCurrentUser
                                    ? 'bg-gold-900/20 border border-gold-700/20'
                                    : 'bg-pywel-bg/50'
                                }`}
                              >
                                {/* Rank */}
                                <span className={`text-lg font-cinzel font-bold w-7 text-center ${rankColor}`}>
                                  {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : rank}
                                </span>

                                {/* Name + badges */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className={`font-semibold truncate ${isCurrentUser ? 'text-gold-300' : 'text-gray-200'}`}>
                                      {member.display_name}
                                    </span>
                                    {isCurrentUser && (
                                      <span className="text-xs bg-gold-900/40 text-gold-400 border border-gold-700/30 px-1.5 py-0.5 rounded font-cinzel">
                                        You
                                      </span>
                                    )}
                                    {isCreator && (
                                      <span title="Group creator">
                                        <Crown className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    Joined {new Date(member.joined_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                  </p>
                                </div>

                                {/* Progress count */}
                                <div className="text-right flex-shrink-0">
                                  <p className={`text-lg font-bold font-cinzel ${isCurrentUser ? 'text-gold-300' : 'text-gray-300'}`}>
                                    {member.total_progress}
                                  </p>
                                  <p className="text-xs text-gray-600">completions</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Share footer */}
                    <div className="px-6 py-4 border-t border-pywel-border bg-pywel-bg/30">
                      <p className="text-xs text-gray-500 text-center">
                        Share the invite code{' '}
                        <button
                          onClick={() => copyInviteCode(selectedGroup.invite_code)}
                          className="font-mono text-gold-400 hover:text-gold-300 transition-colors"
                        >
                          {selectedGroup.invite_code}
                        </button>{' '}
                        with friends so they can join this group.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
