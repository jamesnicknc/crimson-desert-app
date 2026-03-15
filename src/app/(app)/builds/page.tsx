'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Star, ChevronDown, Filter, Trash2, X, Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/hooks/use-user';
import SignInPrompt from '@/components/SignInPrompt';
import type { Character } from '@/types/game-data';

type BuildTab = 'top-rated' | 'my-builds' | 'group-builds';

interface SharedBuild {
  id: string;
  name: string;
  character: Character;
  skills: string[];
  weapons: string[];
  gears: string[];
  is_public: boolean;
  created_at: string;
  user_id: string;
  rating_avg: number;
  rating_count: number;
  author_name?: string;
}

const CHARACTERS: { label: string; value: Character | 'all' }[] = [
  { label: 'All Characters', value: 'all' },
  { label: 'Kliff', value: 'kliff' },
  { label: 'Damiane', value: 'damiane' },
  { label: 'Oongka', value: 'oongka' },
];

const TABS: { label: string; value: BuildTab }[] = [
  { label: 'Top Rated', value: 'top-rated' },
  { label: 'My Builds', value: 'my-builds' },
  { label: 'Group Builds', value: 'group-builds' },
];

function StarRating({
  avgRating,
  userRating,
  onRate,
  size = 'sm',
}: {
  avgRating: number;
  userRating?: number;
  onRate?: (r: number) => void;
  size?: 'sm' | 'lg';
}) {
  const [hovered, setHovered] = useState(0);
  const canRate = !!onRate;
  const iconSize = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <div className="flex gap-0.5" onMouseLeave={() => setHovered(0)}>
      {[1, 2, 3, 4, 5].map(star => {
        let filled = false;
        if (hovered) {
          filled = star <= hovered;
        } else if (userRating) {
          filled = star <= userRating;
        } else {
          filled = star <= Math.round(avgRating);
        }

        return (
          <button
            key={star}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (canRate) onRate(star);
            }}
            onMouseEnter={() => canRate && setHovered(star)}
            className={canRate ? 'cursor-pointer' : 'cursor-default'}
            disabled={!canRate}
          >
            <Star
              className={`${iconSize} transition-colors ${
                filled
                  ? 'text-gold-400 fill-gold-400'
                  : 'text-gray-600'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

function getCharacterLabel(char: Character): string {
  return char.charAt(0).toUpperCase() + char.slice(1);
}

function getCharacterGradient(char: Character): string {
  switch (char) {
    case 'kliff': return 'from-amber-900/30 to-amber-950/30';
    case 'damiane': return 'from-rose-900/30 to-rose-950/30';
    case 'oongka': return 'from-slate-700/30 to-slate-900/30';
    default: return 'from-gray-900/30 to-gray-950/30';
  }
}

function getCharacterAccent(char: Character): string {
  switch (char) {
    case 'kliff': return 'border-amber-700';
    case 'damiane': return 'border-rose-700';
    case 'oongka': return 'border-slate-600';
    default: return 'border-gray-600';
  }
}

/* ─── Build Detail Modal ─── */
function BuildDetailModal({
  build,
  userRating,
  canRate,
  onRate,
  onClose,
  onDelete,
  onToggleVisibility,
  isOwner,
}: {
  build: SharedBuild;
  userRating?: number;
  canRate: boolean;
  onRate: (r: number) => void;
  onClose: () => void;
  onDelete: () => void;
  onToggleVisibility: () => void;
  isOwner: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-lg bg-pywel-card border-2 ${getCharacterAccent(build.character)} rounded-xl overflow-hidden max-h-[85vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-br ${getCharacterGradient(build.character)} p-6 border-b border-pywel-border`}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-xl font-cinzel font-bold text-gold-300">{build.name}</h2>
              <p className="text-sm text-gray-400 mt-1">{getCharacterLabel(build.character)} Build</p>
              <p className="text-xs text-gray-500 mt-1">
                Created {new Date(build.created_at).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-200 bg-pywel-bg/50 rounded-lg transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Rating in header */}
          <div className="flex items-center gap-3 mt-4">
            <StarRating
              avgRating={build.rating_avg}
              userRating={userRating}
              onRate={canRate ? onRate : undefined}
              size="lg"
            />
            <span className="text-sm text-gray-400">
              {build.rating_avg > 0
                ? `${build.rating_avg.toFixed(1)} avg`
                : 'No ratings yet'}
              {' '}({build.rating_count})
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-pywel-bg rounded-lg p-3 border border-pywel-border">
              <p className="text-2xl font-bold text-gold-400">{build.skills?.length || 0}</p>
              <p className="text-xs text-gray-500 mt-1">Skills</p>
            </div>
            <div className="bg-pywel-bg rounded-lg p-3 border border-pywel-border">
              <p className="text-2xl font-bold text-gold-400">{build.weapons?.length || 0}</p>
              <p className="text-xs text-gray-500 mt-1">Weapons</p>
            </div>
            <div className="bg-pywel-bg rounded-lg p-3 border border-pywel-border">
              <p className="text-2xl font-bold text-gold-400">{build.gears?.length || 0}</p>
              <p className="text-xs text-gray-500 mt-1">Gears</p>
            </div>
          </div>

          {/* Skills */}
          {build.skills && build.skills.length > 0 && (
            <div>
              <h3 className="text-sm font-cinzel font-semibold text-gold-400 uppercase tracking-wider mb-2">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {build.skills.map(skill => (
                  <span key={skill} className="text-xs bg-pywel-bg border border-gold-600/30 text-gold-300 px-3 py-1.5 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Weapons */}
          {build.weapons && build.weapons.length > 0 && (
            <div>
              <h3 className="text-sm font-cinzel font-semibold text-gold-400 uppercase tracking-wider mb-2">
                Weapons
              </h3>
              <div className="flex flex-wrap gap-2">
                {build.weapons.map(weapon => (
                  <span key={weapon} className="text-xs bg-pywel-bg border border-pywel-border text-gray-300 px-3 py-1.5 rounded-full">
                    {weapon}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gears */}
          {build.gears && build.gears.length > 0 && (
            <div>
              <h3 className="text-sm font-cinzel font-semibold text-gold-400 uppercase tracking-wider mb-2">
                Abyss Gears
              </h3>
              <div className="flex flex-wrap gap-2">
                {build.gears.map(gear => (
                  <span key={gear} className="text-xs bg-pywel-bg border border-pywel-border text-gray-300 px-3 py-1.5 rounded-full">
                    {gear}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {(!build.skills || build.skills.length === 0) &&
           (!build.weapons || build.weapons.length === 0) &&
           (!build.gears || build.gears.length === 0) && (
            <p className="text-gray-500 text-sm text-center py-4">
              This build has no items selected yet.
            </p>
          )}
        </div>

        {/* Footer actions */}
        {isOwner && (
          <div className="border-t border-pywel-border p-4 space-y-2">
            <button
              onClick={onToggleVisibility}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm rounded-lg border transition-colors ${
                build.is_public
                  ? 'text-gray-300 hover:text-gray-200 bg-pywel-bg/50 hover:bg-pywel-bg border-pywel-border'
                  : 'text-gold-300 hover:text-gold-200 bg-gold-600/10 hover:bg-gold-600/20 border-gold-600/30'
              }`}
            >
              {build.is_public ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Make Private
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Make Public
                </>
              )}
            </button>
            <button
              onClick={() => {
                if (window.confirm('Delete this build? This cannot be undone.')) {
                  onDelete();
                  onClose();
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 bg-red-900/10 hover:bg-red-900/20 border border-red-900/30 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Build
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function BuildsPage() {
  const [activeTab, setActiveTab] = useState<BuildTab>('top-rated');
  const [search, setSearch] = useState('');
  const [charFilter, setCharFilter] = useState<Character | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [builds, setBuilds] = useState<SharedBuild[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});
  const [selectedBuild, setSelectedBuild] = useState<SharedBuild | null>(null);
  const supabase = createClient();
  const { user, loading: userLoading } = useUser();

  const loadBuilds = useCallback(async () => {
    setLoading(true);

    try {
      if (activeTab === 'top-rated') {
        const { data } = await supabase
          .from('builds')
          .select('*')
          .eq('is_public', true)
          .order('created_at', { ascending: false });

        setBuilds(data?.map(b => ({
          ...b,
          rating_avg: b.rating_avg ?? 0,
          rating_count: b.rating_count ?? 0,
        })) || []);
      } else if (activeTab === 'my-builds') {
        if (!user) {
          setBuilds([]);
          setLoading(false);
          return;
        }

        const { data } = await supabase
          .from('builds')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        setBuilds(data?.map(b => ({
          ...b,
          rating_avg: b.rating_avg ?? 0,
          rating_count: b.rating_count ?? 0,
        })) || []);
      } else if (activeTab === 'group-builds') {
        if (!user) {
          setBuilds([]);
          setLoading(false);
          return;
        }

        const { data: membership } = await supabase
          .from('group_members')
          .select('group_id')
          .eq('user_id', user.id)
          .single();

        if (membership?.group_id) {
          const { data: members } = await supabase
            .from('group_members')
            .select('user_id')
            .eq('group_id', membership.group_id);

          if (members && members.length > 0) {
            const memberIds = members.map(m => m.user_id);
            const { data } = await supabase
              .from('builds')
              .select('*')
              .in('user_id', memberIds)
              .order('created_at', { ascending: false });

            setBuilds(data?.map(b => ({
              ...b,
              rating_avg: b.rating_avg ?? 0,
              rating_count: b.rating_count ?? 0,
            })) || []);
          } else {
            setBuilds([]);
          }
        } else {
          setBuilds([]);
        }
      }

      // Load user's ratings
      if (user) {
        try {
          const { data: ratings } = await supabase
            .from('build_ratings')
            .select('build_id, rating')
            .eq('user_id', user.id);

          if (ratings) {
            const ratingsMap: Record<string, number> = {};
            ratings.forEach(r => { ratingsMap[r.build_id] = r.rating; });
            setUserRatings(ratingsMap);
          }
        } catch {
          // build_ratings table may not exist yet
          setUserRatings({});
        }
      }
    } catch {
      setBuilds([]);
    }

    setLoading(false);
  }, [activeTab, user, supabase]);

  useEffect(() => {
    if (!userLoading) {
      loadBuilds();
    }
  }, [activeTab, userLoading, loadBuilds]);

  const rateBuild = async (buildId: string, rating: number) => {
    if (!user) return;

    // Optimistic update for user's rating
    setUserRatings(prev => ({ ...prev, [buildId]: rating }));

    try {
      // Upsert the rating - DB trigger auto-updates builds.rating_avg/rating_count
      await supabase
        .from('build_ratings')
        .upsert({
          build_id: buildId,
          user_id: user.id,
          rating,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'build_id,user_id' });

      // Re-fetch the updated build to get the new avg/count from the trigger
      const { data: updatedBuild } = await supabase
        .from('builds')
        .select('rating_avg, rating_count')
        .eq('id', buildId)
        .single();

      if (updatedBuild) {
        const newAvg = updatedBuild.rating_avg ?? 0;
        const newCount = updatedBuild.rating_count ?? 0;

        setBuilds(prev =>
          prev.map(b =>
            b.id === buildId
              ? { ...b, rating_avg: newAvg, rating_count: newCount }
              : b
          )
        );

        if (selectedBuild?.id === buildId) {
          setSelectedBuild(prev => prev ? { ...prev, rating_avg: newAvg, rating_count: newCount } : null);
        }
      }
    } catch {
      // Rating failed - revert optimistic update
      setUserRatings(prev => {
        const copy = { ...prev };
        delete copy[buildId];
        return copy;
      });
    }
  };

  const deleteBuild = async (buildId: string) => {
    if (!user) return;

    setBuilds(prev => prev.filter(b => b.id !== buildId));

    try {
      await supabase.from('build_ratings').delete().eq('build_id', buildId);
    } catch {
      // table may not exist
    }

    await supabase
      .from('builds')
      .delete()
      .eq('id', buildId)
      .eq('user_id', user.id);
  };

  const toggleBuildVisibility = async (buildId: string, currentlyPublic: boolean) => {
    if (!user) return;

    const newVisibility = !currentlyPublic;

    // Optimistic update
    setBuilds(prev =>
      prev.map(b => b.id === buildId ? { ...b, is_public: newVisibility } : b)
    );
    if (selectedBuild?.id === buildId) {
      setSelectedBuild(prev => prev ? { ...prev, is_public: newVisibility } : null);
    }

    try {
      const { error } = await supabase
        .from('builds')
        .update({ is_public: newVisibility })
        .eq('id', buildId)
        .eq('user_id', user.id);

      if (error) throw error;
    } catch {
      // Revert on failure
      setBuilds(prev =>
        prev.map(b => b.id === buildId ? { ...b, is_public: currentlyPublic } : b)
      );
      if (selectedBuild?.id === buildId) {
        setSelectedBuild(prev => prev ? { ...prev, is_public: currentlyPublic } : null);
      }
    }
  };

  // Filter and sort builds
  const filteredBuilds = builds
    .filter(b => {
      if (charFilter !== 'all' && b.character !== charFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          b.name.toLowerCase().includes(q) ||
          b.character.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (activeTab === 'top-rated') {
        return (b.rating_avg || 0) - (a.rating_avg || 0);
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Saved & Shared Builds</h1>
        <p className="text-gray-400">Browse community builds, share your own, and find the best strategies.</p>
      </div>

      {/* Tab Selectors */}
      <div className="flex gap-1 bg-pywel-card border border-pywel-border rounded-lg p-1">
        {TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex-1 px-4 py-3 rounded-md font-cinzel font-semibold text-sm transition-all ${
              activeTab === tab.value
                ? 'bg-gold-600 text-black shadow-md'
                : 'text-gray-400 hover:text-gold-300 hover:bg-pywel-card-hover'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search & Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search builds by name or character..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-pywel-card border border-pywel-border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors font-semibold text-sm ${
            showFilters || charFilter !== 'all'
              ? 'bg-gold-600/20 border-gold-600 text-gold-300'
              : 'bg-pywel-card border-pywel-border text-gray-400 hover:text-gold-300'
          }`}
        >
          <Filter className="w-4 h-4" />
          Filters
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-pywel-card border border-pywel-border rounded-lg p-4">
          <p className="text-xs font-cinzel font-semibold text-gold-400 uppercase tracking-wider mb-3">Filter by Character</p>
          <div className="flex flex-wrap gap-2">
            {CHARACTERS.map(char => (
              <button
                key={char.value}
                onClick={() => setCharFilter(char.value)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                  charFilter === char.value
                    ? 'bg-gold-600 text-black'
                    : 'bg-pywel-bg border border-pywel-border text-gray-300 hover:text-gold-300'
                }`}
              >
                {char.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Auth prompt for My Builds / Group Builds */}
      {(activeTab === 'my-builds' || activeTab === 'group-builds') && !user && !userLoading && (
        <SignInPrompt
          message={activeTab === 'my-builds' ? 'Sign in to view your saved builds' : 'Sign in to view group builds'}
        />
      )}

      {/* Loading */}
      {loading ? (
        <div className="text-center text-gray-400 py-12">Loading builds...</div>
      ) : filteredBuilds.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-pywel-card border border-pywel-border rounded-xl p-10 max-w-md mx-auto">
            <p className="text-gray-400 text-lg mb-2">
              {activeTab === 'my-builds'
                ? 'You haven\'t saved any builds yet'
                : activeTab === 'group-builds'
                  ? 'No group builds found'
                  : 'No builds found'}
            </p>
            <p className="text-gray-500 text-sm">
              {activeTab === 'my-builds'
                ? 'Head to the Build Planner to create and save your first build!'
                : activeTab === 'group-builds'
                  ? 'Join a group or ask members to share their builds.'
                  : 'Try adjusting your search or filters.'}
            </p>
          </div>
        </div>
      ) : (
        /* Build Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBuilds.map(build => (
            <div
              key={build.id}
              onClick={() => setSelectedBuild(build)}
              className={`bg-gradient-to-br ${getCharacterGradient(build.character)} bg-pywel-card rounded-lg border border-pywel-border overflow-hidden hover:border-gold-500/50 transition-colors cursor-pointer`}
            >
              {/* Build Header */}
              <div className="p-4 border-b border-pywel-border/50">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-cinzel font-bold text-gold-300 truncate">{build.name}</h3>
                    <p className="text-sm text-gray-400 mt-0.5">{getCharacterLabel(build.character)}</p>
                  </div>
                  <span className={`flex-shrink-0 px-2 py-1 rounded text-xs font-semibold ${
                    build.is_public
                      ? 'bg-gold-600/20 text-gold-300 border border-gold-600/30'
                      : 'bg-gray-700/50 text-gray-400 border border-gray-600/30'
                  }`}>
                    {build.is_public ? 'Public' : 'Private'}
                  </span>
                </div>
              </div>

              {/* Build Stats */}
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-lg font-semibold text-gold-400">{build.skills?.length || 0}</p>
                    <p className="text-xs text-gray-500">Skills</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gold-400">{build.weapons?.length || 0}</p>
                    <p className="text-xs text-gray-500">Weapons</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gold-400">{build.gears?.length || 0}</p>
                    <p className="text-xs text-gray-500">Gears</p>
                  </div>
                </div>

                {/* Weapons list preview */}
                {build.weapons && build.weapons.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {build.weapons.slice(0, 4).map(w => (
                      <span key={w} className="text-xs bg-pywel-bg border border-pywel-border text-gray-300 px-2 py-0.5 rounded-full">
                        {w}
                      </span>
                    ))}
                    {build.weapons.length > 4 && (
                      <span className="text-xs text-gray-500 px-2 py-0.5">
                        +{build.weapons.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Rating Footer */}
              <div className="px-4 py-3 border-t border-pywel-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StarRating
                    avgRating={build.rating_avg}
                    userRating={userRatings[build.id]}
                    onRate={user ? (r) => rateBuild(build.id, r) : undefined}
                  />
                  <span className="text-xs text-gray-500">
                    ({build.rating_count || 0})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-500">
                    {new Date(build.created_at).toLocaleDateString()}
                  </p>
                  {user && user.id === build.user_id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Delete this build? This cannot be undone.')) {
                          deleteBuild(build.id);
                        }
                      }}
                      className="p-1 text-gray-600 hover:text-red-400 transition-colors"
                      title="Delete build"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Build Detail Modal */}
      {selectedBuild && (
        <BuildDetailModal
          build={selectedBuild}
          userRating={userRatings[selectedBuild.id]}
          canRate={!!user}
          onRate={(r) => rateBuild(selectedBuild.id, r)}
          onClose={() => setSelectedBuild(null)}
          onDelete={() => deleteBuild(selectedBuild.id)}
          onToggleVisibility={() => toggleBuildVisibility(selectedBuild.id, selectedBuild.is_public)}
          isOwner={!!user && user.id === selectedBuild.user_id}
        />
      )}
    </div>
  );
}
