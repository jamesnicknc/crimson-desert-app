'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Globe,
  Users,
  Skull,
  TrendingUp,
  Compass,
  Sparkles,
  Scroll,
  Hammer,
  BookOpen,
  Footprints,
  Trophy,
  Swords,
  MapPin,
  Shield,
  Leaf,
  Gem,
  Bug,
  Library,
} from 'lucide-react';
import { TROPHIES } from '@/lib/game-data';

// ─── Knowledge Codex counts (confirmed via in-game codex data) ──────────────
const CODEX_CATEGORIES = [
  { label: 'Characters', count: 467, icon: Users, color: 'text-blue-400' },
  { label: 'Factions', count: 110, icon: Shield, color: 'text-purple-400' },
  { label: 'Territories', count: 573, icon: MapPin, color: 'text-green-400' },
  { label: 'Creatures', count: 401, icon: Bug, color: 'text-red-400' },
  { label: 'Bosses', count: 76, icon: Skull, color: 'text-orange-400' },
  { label: 'Mounts', count: 29, icon: Footprints, color: 'text-amber-400' },
  { label: 'Adventures', count: 430, icon: Compass, color: 'text-cyan-400' },
  { label: 'Gatherables', count: 150, icon: Leaf, color: 'text-emerald-400' },
  { label: 'Collectibles', count: 94, icon: Gem, color: 'text-pink-400' },
  { label: 'Crafting Manuals', count: 355, icon: Hammer, color: 'text-yellow-400' },
];

const CODEX_TOTAL = CODEX_CATEGORIES.reduce((sum, c) => sum + c.count, 0);

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function DashboardPage() {
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date('2026-03-19T23:00:00Z').getTime(); // 6 PM EST (UTC-5)
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'World Size', value: '256 km²', icon: Globe, href: '/map' },
    { label: 'Territories', value: '573', icon: MapPin, href: '/map' },
    { label: 'Bosses', value: '76', icon: Skull, href: '/bosses' },
    { label: 'Adventures', value: '430', icon: Compass, href: '/quests' },
    { label: 'Creatures', value: '401', icon: Bug, href: '/bestiary' },
    { label: 'Codex Entries', value: CODEX_TOTAL.toLocaleString(), icon: Library, href: '/quests' },
  ];

  const quickAccess = [
    {
      title: 'World Map',
      description: 'Explore the cursed lands',
      href: '/map',
      icon: Globe,
      color: 'from-blue-600 to-blue-800',
    },
    {
      title: 'Quest Log',
      description: 'Track your adventures',
      href: '/quests',
      icon: Scroll,
      color: 'from-amber-600 to-amber-800',
    },
    {
      title: 'Bosses',
      description: 'Defeat powerful bosses',
      href: '/bosses',
      icon: Skull,
      color: 'from-red-600 to-red-800',
    },
    {
      title: 'Crafting',
      description: 'Create powerful items',
      href: '/crafting',
      icon: Hammer,
      color: 'from-yellow-600 to-yellow-800',
    },
    {
      title: 'Skill Trees',
      description: 'Master your abilities',
      href: '/skills',
      icon: Sparkles,
      color: 'from-purple-600 to-purple-800',
    },
    {
      title: 'Notes',
      description: 'Document your journey',
      href: '/notes',
      icon: BookOpen,
      color: 'from-gray-600 to-gray-800',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Countdown section */}
      <section className="bg-gradient-to-r from-pywel-secondary/30 to-black/30 border border-pywel-border rounded-lg p-8">
        <h2 className="font-cinzel text-2xl font-bold text-gold-300 mb-6">
          Launch Countdown
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-pywel-card border border-pywel-border rounded-lg p-4 text-center">
            <p className="text-3xl md:text-4xl font-bold text-gold-300">
              {countdown.days}
            </p>
            <p className="text-xs md:text-sm text-gray-400 mt-2 font-cinzel">
              DAYS
            </p>
          </div>
          <div className="bg-pywel-card border border-pywel-border rounded-lg p-4 text-center">
            <p className="text-3xl md:text-4xl font-bold text-gold-300">
              {countdown.hours}
            </p>
            <p className="text-xs md:text-sm text-gray-400 mt-2 font-cinzel">
              HOURS
            </p>
          </div>
          <div className="bg-pywel-card border border-pywel-border rounded-lg p-4 text-center">
            <p className="text-3xl md:text-4xl font-bold text-gold-300">
              {countdown.minutes}
            </p>
            <p className="text-xs md:text-sm text-gray-400 mt-2 font-cinzel">
              MINUTES
            </p>
          </div>
          <div className="bg-pywel-card border border-pywel-border rounded-lg p-4 text-center">
            <p className="text-3xl md:text-4xl font-bold text-gold-300">
              {countdown.seconds}
            </p>
            <p className="text-xs md:text-sm text-gray-400 mt-2 font-cinzel">
              SECONDS
            </p>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section>
        <h2 className="font-cinzel text-2xl font-bold text-gold-300 mb-6">
          World Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Link key={stat.label} href={stat.href}>
                <div className="bg-pywel-card border border-pywel-border rounded-lg p-4 hover:bg-pywel-card-hover hover:border-gold-500/50 transition-colors duration-200 cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <IconComponent className="w-5 h-5 text-gold-400" />
                    <p className="text-xs text-gray-400 font-cinzel uppercase">
                      {stat.label}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-gold-300">
                    {stat.value}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick access cards */}
      <section>
        <h2 className="font-cinzel text-2xl font-bold text-gold-300 mb-6">
          Quick Access
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickAccess.map((card) => {
            const IconComponent = card.icon;
            return (
              <Link key={card.href} href={card.href}>
                <div className="h-full bg-pywel-card border border-pywel-border rounded-lg p-6 hover:border-gold-400 hover:bg-pywel-card-hover transition-all duration-200 cursor-pointer group">
                  <div
                    className={`inline-flex p-3 rounded-lg mb-4 bg-gradient-to-br ${card.color}`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-gold-300 group-hover:text-gold-200 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">
                    {card.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Knowledge Codex section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Library className="w-6 h-6 text-gold-400" />
          <h2 className="font-cinzel text-2xl font-bold text-gold-300">
            Knowledge Codex
          </h2>
          <span className="ml-auto text-sm text-gray-500 font-cinzel">{CODEX_TOTAL.toLocaleString()} entries</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {CODEX_CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.label}
                className="bg-pywel-card border border-pywel-border rounded-lg p-4 hover:border-pywel-border/80 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <IconComponent className={`w-4 h-4 ${cat.color}`} />
                  <p className="text-xs text-gray-400 font-cinzel">{cat.label}</p>
                </div>
                <p className={`text-xl font-bold font-cinzel ${cat.color}`}>{cat.count.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-600 mt-3 text-center">
          Adventures include side quests, camp clearing missions, puzzles, and side boss encounters.
        </p>
      </section>

      {/* Trophies section */}
      <section className="bg-gradient-to-r from-black/30 to-pywel-secondary/30 border border-pywel-border rounded-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-gold-400" />
          <h2 className="font-cinzel text-2xl font-bold text-gold-300">
            Trophies & Achievements
          </h2>
          <span className="ml-auto text-sm text-gray-500 font-cinzel">{TROPHIES.length} total</span>
        </div>

        {/* Rarity summary row */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {(
            [
              { rarity: 'platinum', label: 'Platinum', color: 'text-cyan-300', bg: 'bg-cyan-900/20 border-cyan-700/30' },
              { rarity: 'gold', label: 'Gold', color: 'text-yellow-400', bg: 'bg-yellow-900/20 border-yellow-700/30' },
              { rarity: 'silver', label: 'Silver', color: 'text-gray-300', bg: 'bg-gray-700/20 border-gray-600/30' },
              { rarity: 'bronze', label: 'Bronze', color: 'text-amber-600', bg: 'bg-amber-900/20 border-amber-700/30' },
            ] as const
          ).map(({ rarity, label, color, bg }) => {
            const count = TROPHIES.filter(t => t.rarity === rarity).length;
            return (
              <div key={rarity} className={`rounded-lg border p-3 text-center ${bg}`}>
                <p className={`text-2xl font-bold font-cinzel ${color}`}>{count}</p>
                <p className={`text-xs font-cinzel mt-0.5 ${color} opacity-80`}>{label}</p>
              </div>
            );
          })}
        </div>

        {/* Trophy list */}
        <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
          {TROPHIES.map((trophy) => {
            const rarityStyles: Record<string, string> = {
              platinum: 'text-cyan-300 border-cyan-700/40',
              gold: 'text-yellow-400 border-yellow-700/40',
              silver: 'text-gray-300 border-gray-600/40',
              bronze: 'text-amber-600 border-amber-700/40',
            };
            const rarityDot: Record<string, string> = {
              platinum: 'bg-cyan-300',
              gold: 'bg-yellow-400',
              silver: 'bg-gray-400',
              bronze: 'bg-amber-600',
            };
            return (
              <div
                key={trophy.id}
                className="flex items-start gap-3 p-2.5 rounded-lg bg-pywel-bg/40 border border-pywel-border/50 hover:border-pywel-border transition-colors"
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${rarityDot[trophy.rarity]}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-cinzel font-semibold text-sm text-gray-100">{trophy.name}</span>
                    <span className={`text-xs font-cinzel ${rarityStyles[trophy.rarity]}`}>{trophy.rarity}</span>
                    <span className="text-xs text-gray-600 ml-auto">{trophy.category}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{trophy.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
