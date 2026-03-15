'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Tent, Hammer, Flame, Sprout, Beef, ShoppingCart, ClipboardList } from 'lucide-react';
import { ACTIVITIES, CAMP_FACILITIES } from '@/lib/game-data';
import { useProgress } from '@/hooks/use-progress';
import SignInPrompt from '@/components/SignInPrompt';
import type { ActivityCategory } from '@/types/game-data';

const ACTIVITY_FILTERS: { label: string; value: ActivityCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Gathering', value: 'gathering' },
  { label: 'Farming', value: 'farming' },
  { label: 'Combat', value: 'combat' },
  { label: 'Social', value: 'social' },
];

const getCategoryColor = (cat: ActivityCategory): string => {
  const colors: Record<ActivityCategory, string> = {
    gathering: 'bg-green-600/20 border-green-600 text-green-300',
    farming: 'bg-amber-600/20 border-amber-600 text-amber-300',
    combat: 'bg-red-600/20 border-red-600 text-red-300',
    social: 'bg-blue-600/20 border-blue-600 text-blue-300',
  };
  return colors[cat];
};

const getCategoryLabel = (cat: ActivityCategory): string => {
  const labels: Record<ActivityCategory, string> = {
    gathering: 'Gathering',
    farming: 'Farming',
    combat: 'Combat',
    social: 'Social',
  };
  return labels[cat];
};

const getFacilityIcon = (name: string) => {
  if (name.includes('Blacksmith')) return Hammer;
  if (name.includes('Bonfire')) return Flame;
  if (name.includes('Farm')) return Sprout;
  if (name.includes('Ranch')) return Beef;
  if (name.includes('Vendor')) return ShoppingCart;
  if (name.includes('Dispatch')) return ClipboardList;
  return Tent;
};

export default function CampPage() {
  const { isCompleted, toggle, countCompleted, loading, isAuthenticated } = useProgress();
  const [activityFilter, setActivityFilter] = useState<ActivityCategory | 'all'>('all');
  const [expandedFacilities, setExpandedFacilities] = useState<Set<string>>(new Set());

  const activityKeys = ACTIVITIES.map((_, i) => `activity-${i}`);
  const completedActivities = countCompleted('collectible', activityKeys);

  const filteredActivities = ACTIVITIES.filter(a =>
    activityFilter === 'all' || a.category === activityFilter
  );

  const toggleFacility = (name: string) => {
    setExpandedFacilities(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Greymane Camp</h1>
        <p className="text-gray-400">Manage your home base, track activities, and upgrade facilities across Pywel.</p>
      </div>

      {!isAuthenticated && !loading && (
        <SignInPrompt message="Sign in to track your camp progress" compact />
      )}

      {/* ═══ ACTIVITIES SECTION ═══ */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-cinzel font-bold text-gold-400">Life Activities</h2>
          <span className="text-sm text-gold-300">{completedActivities} / {ACTIVITIES.length}</span>
        </div>

        <div className="w-full bg-pywel-bg rounded-full h-2.5 overflow-hidden mb-5">
          <div
            className="h-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-300"
            style={{ width: `${(completedActivities / ACTIVITIES.length) * 100}%` }}
          ></div>
        </div>

        <div className="flex gap-2 flex-wrap mb-5">
          {ACTIVITY_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActivityFilter(f.value)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                activityFilter === f.value
                  ? 'bg-gold-600 text-pywel-bg'
                  : 'bg-pywel-card border border-pywel-border text-gray-300 hover:text-gold-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredActivities.map((activity, idx) => {
            const globalIdx = ACTIVITIES.indexOf(activity);
            const actKey = `activity-${globalIdx}`;
            const isDone = isCompleted('collectible', actKey);

            return (
              <div
                key={actKey}
                className={`bg-pywel-card rounded-lg p-4 border transition-all ${
                  isDone
                    ? 'border-gold-600/40 bg-pywel-secondary/50'
                    : 'border-pywel-border hover:border-gold-500/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggle('collectible', actKey)}
                    className="mt-1 w-4 h-4 cursor-pointer accent-gold-400 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`text-lg font-cinzel font-semibold ${isDone ? 'text-gray-500 line-through' : 'text-gold-400'}`}>
                        {activity.name}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getCategoryColor(activity.category)}`}>
                        {getCategoryLabel(activity.category)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{activity.location}</p>
                    <p className="text-sm text-gray-300 mb-3">{activity.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {activity.yields.map(y => (
                        <span key={y} className="inline-block bg-pywel-bg border border-pywel-border text-gray-400 text-[10px] font-medium px-2 py-0.5 rounded-full">
                          {y}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ CAMP FACILITIES SECTION ═══ */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-cinzel font-bold text-gold-400">Camp Facilities</h2>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-600/20 border border-amber-600/50 text-amber-300 uppercase tracking-wider">
            Upgradeable
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CAMP_FACILITIES.map(facility => {
            const isExpanded = expandedFacilities.has(facility.name);
            const FacilityIcon = getFacilityIcon(facility.name);

            return (
              <div
                key={facility.name}
                onClick={() => toggleFacility(facility.name)}
                className="bg-pywel-card rounded-lg border border-pywel-border hover:border-gold-500/50 transition-all cursor-pointer"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gold-600/10 border border-gold-600/30">
                        <FacilityIcon className="w-6 h-6 text-gold-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-cinzel font-semibold text-gold-400">{facility.name}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{facility.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gold-400/60 flex-shrink-0 mt-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-pywel-border space-y-4">
                      {facility.upgrades.map(upgrade => {
                        const upgradeKey = `camp-${facility.name}-t${upgrade.tier}`;
                        const isUpgraded = isCompleted('collectible', upgradeKey);

                        return (
                          <div
                            key={upgrade.tier}
                            className={`p-3 rounded-lg border transition-all ${
                              isUpgraded
                                ? 'bg-gold-600/10 border-gold-600/30'
                                : 'bg-pywel-bg border-pywel-border'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <input
                                type="checkbox"
                                checked={isUpgraded}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  toggle('collectible', upgradeKey);
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-4 h-4 cursor-pointer accent-gold-400 flex-shrink-0"
                              />
                              <span className="text-sm font-cinzel font-semibold text-gold-300">
                                Tier {upgrade.tier}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300 mb-2 ml-7">{upgrade.effect}</p>
                            <div className="flex flex-wrap gap-1.5 ml-7">
                              {upgrade.materials.map(m => (
                                <span key={m} className="inline-block bg-pywel-card border border-pywel-border text-gray-400 text-[10px] font-medium px-2 py-0.5 rounded-full">
                                  {m}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
