'use client';

import Link from 'next/link';
import {
  Map, Bot, Crosshair, ClipboardList, Wrench, GitBranch, Rocket, Store, BookOpen, Layers, Shield, Package, Trophy, Sparkles, CalendarClock,
} from 'lucide-react';
import {
  MAPS, ENEMIES, WEAPONS, QUESTS, ITEMS, SKILLS, WORKSHOP_STATIONS, ACHIEVEMENTS, PATCHES, GAME_OVERVIEW, EXPEDITION_PROJECTS,
} from '@/lib/game-data';
import { PROGRESS } from '@/lib/progress-keys';
import { useProgress } from '@/hooks/use-progress';
import ProgressBar from '@/components/ui/ProgressBar';
import SignInPrompt from '@/components/SignInPrompt';

export default function DashboardPage() {
  const { isAuthenticated, loading, isCompleted, categoryCount, getValue } = useProgress();

  const playableMaps = MAPS.filter((m) => m.status === 'playable');
  const stats = [
    { label: 'Raid Maps', value: playableMaps.length, icon: Map, href: '/maps' },
    { label: 'ARC Machines', value: ENEMIES.length, icon: Bot, href: '/arc' },
    { label: 'Weapons', value: WEAPONS.length, icon: Crosshair, href: '/weapons' },
    { label: 'Quests', value: QUESTS.length, icon: ClipboardList, href: '/quests' },
    { label: 'Items', value: ITEMS.length, icon: Package, href: '/items' },
    { label: 'Skill Nodes', value: SKILLS.length, icon: GitBranch, href: '/skills' },
  ];

  const quickAccess = [
    { title: 'Raid Maps', description: 'POIs, extractions, keys and events', href: '/maps', icon: Map, color: 'from-blue-600 to-blue-800' },
    { title: 'ARC Bestiary', description: 'Weak points and kill strategies', href: '/arc', icon: Bot, color: 'from-red-600 to-red-800' },
    { title: 'Weapons', description: 'Stats, recipes, tiers and mods', href: '/weapons', icon: Crosshair, color: 'from-rust-500 to-rust-700' },
    { title: 'Gear & Gadgets', description: 'Shields, augments and throwables', href: '/gear', icon: Shield, color: 'from-signal-500 to-signal-700' },
    { title: 'Quests', description: 'Every trader chain, tracked', href: '/quests', icon: ClipboardList, color: 'from-amber-600 to-amber-800' },
    { title: 'Workshop', description: 'Upgrade costs and what to farm', href: '/workshop', icon: Wrench, color: 'from-purple-600 to-purple-800' },
    { title: 'Expeditions', description: 'Projects, trials and achievements', href: '/expeditions', icon: Rocket, color: 'from-pink-600 to-pink-800' },
    { title: 'Traders', description: 'Who sells what and at which level', href: '/traders', icon: Store, color: 'from-emerald-600 to-emerald-800' },
    { title: 'New Raider Guide', description: 'The loop, the ARC, the etiquette', href: '/guide', icon: BookOpen, color: 'from-gray-600 to-gray-800' },
    { title: 'Loadout Planner', description: 'Kit up and share with your squad', href: '/planner', icon: Layers, color: 'from-cyan-600 to-cyan-800' },
  ];

  // Progress summary
  const questsDone = QUESTS.filter((q) => isCompleted(PROGRESS.quest, q.id)).length;
  const questsActive = QUESTS.filter((q) => getValue(PROGRESS.quest, q.id)?.status === 'active').length;
  const skillPoints = SKILLS.reduce((sum, s) => sum + (Number(getValue(PROGRESS.skill, s.id)?.points ?? 0) || 0), 0);
  const workshopLevels = WORKSHOP_STATIONS.reduce((sum, s) => sum + s.levels.filter((l) => isCompleted(PROGRESS.workshop, `${s.id}-${l.level}`)).length, 0);
  const workshopMax = WORKSHOP_STATIONS.reduce((sum, s) => sum + s.levels.length, 0);
  const arcSeen = categoryCount(PROGRESS.arc);
  const achievementsDone = categoryCount(PROGRESS.achievement);
  const blueprints = categoryCount(PROGRESS.weapon);

  const latestPatches = [...PATCHES].reverse().slice(0, 4);
  const activeExpedition = EXPEDITION_PROJECTS.filter((p) => p.kind === 'expedition').slice(-1)[0];

  return (
    <div className="space-y-8">
      {/* Status banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-rust-500/15 to-signal-500/10 border border-rust-400/40 rounded-lg p-6">
        <div className="absolute inset-y-0 right-0 w-1/3 hazard-stripe opacity-30 pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-display text-xl font-bold text-rust-300 mb-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-signal-400" />
              {GAME_OVERVIEW.latestPatch || 'Live'}
            </p>
            <p className="text-gray-400 text-sm max-w-2xl">
              {GAME_OVERVIEW.nextUpdate ? `Next: ${GAME_OVERVIEW.nextUpdate}` : 'Track your raids, quests and workshop below.'}
            </p>
          </div>
          {activeExpedition && (
            <Link href="/expeditions" className="flex items-center gap-3 bg-arc-card/80 border border-arc-border rounded-lg px-4 py-3 hover:border-rust-400/60 transition-colors">
              <CalendarClock className="w-5 h-5 text-signal-400" />
              <div>
                <p className="text-xs text-gray-400 font-display uppercase tracking-wider">Current expedition</p>
                <p className="text-sm text-gray-100 font-semibold">{activeExpedition.name}</p>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Stats */}
      <section>
        <h2 className="font-display text-2xl font-bold text-rust-300 mb-4">Database</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.label} href={stat.href}>
                <div className="bg-arc-card border border-arc-border rounded-lg p-4 hover:bg-arc-card-hover hover:border-rust-500/50 transition-colors duration-200 cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-signal-400" />
                    <p className="text-xs text-gray-400 font-display uppercase">{stat.label}</p>
                  </div>
                  <p className="text-2xl font-bold text-rust-300 font-display">{stat.value}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Your progress */}
      <section>
        <h2 className="font-display text-2xl font-bold text-rust-300 mb-4">Your Raider</h2>
        {!loading && !isAuthenticated && (
          <div className="mb-4">
            <SignInPrompt compact message="Sign in to track quests, skills, workshop upgrades and ARC kills across devices." />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/quests" className="bg-arc-card border border-arc-border rounded-lg p-4 hover:border-rust-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-3"><ClipboardList className="w-4 h-4 text-amber-400" /><span className="text-sm font-display text-gray-300">Quests</span><span className="ml-auto text-xs text-gray-500">{questsActive} active</span></div>
            <ProgressBar value={questsDone} max={QUESTS.length} color="bg-amber-400" compact />
          </Link>
          <Link href="/workshop" className="bg-arc-card border border-arc-border rounded-lg p-4 hover:border-rust-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-3"><Wrench className="w-4 h-4 text-purple-400" /><span className="text-sm font-display text-gray-300">Workshop levels</span></div>
            <ProgressBar value={workshopLevels} max={workshopMax} color="bg-purple-400" compact />
          </Link>
          <Link href="/skills" className="bg-arc-card border border-arc-border rounded-lg p-4 hover:border-rust-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-3"><GitBranch className="w-4 h-4 text-signal-400" /><span className="text-sm font-display text-gray-300">Skill points spent</span></div>
            <ProgressBar value={skillPoints} max={76} color="bg-signal-400" compact />
          </Link>
          <Link href="/arc" className="bg-arc-card border border-arc-border rounded-lg p-4 hover:border-rust-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-3"><Bot className="w-4 h-4 text-red-400" /><span className="text-sm font-display text-gray-300">ARC destroyed (types)</span></div>
            <ProgressBar value={arcSeen} max={ENEMIES.filter((e) => e.sizeClass !== 'event').length} color="bg-red-400" compact />
          </Link>
          <Link href="/weapons" className="bg-arc-card border border-arc-border rounded-lg p-4 hover:border-rust-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-3"><Crosshair className="w-4 h-4 text-rust-400" /><span className="text-sm font-display text-gray-300">Weapons unlocked</span></div>
            <ProgressBar value={blueprints} max={WEAPONS.length} color="bg-rust-400" compact />
          </Link>
          <Link href="/expeditions" className="bg-arc-card border border-arc-border rounded-lg p-4 hover:border-rust-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-3"><Trophy className="w-4 h-4 text-yellow-400" /><span className="text-sm font-display text-gray-300">Achievements</span></div>
            <ProgressBar value={achievementsDone} max={ACHIEVEMENTS.length} color="bg-yellow-400" compact />
          </Link>
        </div>
      </section>

      {/* Quick access */}
      <section>
        <h2 className="font-display text-2xl font-bold text-rust-300 mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {quickAccess.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.href} href={card.href}>
                <div className="h-full bg-arc-card border border-arc-border rounded-lg p-4 hover:border-rust-400 hover:bg-arc-card-hover transition-all duration-200 cursor-pointer group">
                  <div className={`inline-flex p-2.5 rounded-lg mb-3 bg-gradient-to-br ${card.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-rust-300 group-hover:text-rust-200 transition-colors">{card.title}</h3>
                  <p className="text-gray-400 text-xs mt-1">{card.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Maps strip */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl font-bold text-rust-300">Raid Maps</h2>
          <Link href="/maps" className="text-sm text-signal-400 hover:text-signal-300">View all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {playableMaps.map((m) => (
            <Link key={m.slug} href={`/maps/${m.slug}`} className="group relative rounded-lg overflow-hidden border border-arc-border hover:border-rust-400/70 transition-colors aspect-[4/3] bg-arc-card">
              {m.images[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.images[0].src} alt={m.name} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" loading="lazy" />
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                <p className="font-display font-semibold text-sm text-gray-100">{m.name}</p>
                <p className="text-[11px] text-gray-400">Danger {m.danger}/5</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Patch history */}
      <section className="bg-gradient-to-r from-black/30 to-arc-secondary/30 border border-arc-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <CalendarClock className="w-5 h-5 text-signal-400" />
          <h2 className="font-display text-xl font-bold text-rust-300">Recent Updates</h2>
          <Link href="/guide#patches" className="ml-auto text-sm text-signal-400 hover:text-signal-300">Full timeline</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {latestPatches.map((p) => (
            <div key={p.version + p.date} className="bg-arc-bg/40 border border-arc-border/60 rounded-lg p-3">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display font-semibold text-gray-100 text-sm">{p.name}</span>
                <span className="text-xs text-gray-500 font-mono">{p.version}</span>
                <span className="ml-auto text-xs text-gray-500">{p.date}</span>
              </div>
              <ul className="text-xs text-gray-400 space-y-0.5">
                {p.highlights.slice(0, 3).map((h) => <li key={h}>{h}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
