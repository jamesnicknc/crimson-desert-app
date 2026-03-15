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
} from 'lucide-react';

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
      const targetDate = new Date('2026-03-19T00:00:00').getTime();
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
    { label: 'World Size', value: '256 km²', icon: Globe },
    { label: 'Regions', value: '5', icon: Compass },
    { label: 'Bosses', value: '50+', icon: Skull },
    { label: 'Mounts', value: '29', icon: Footprints },
    { label: 'Characters', value: '3', icon: Users },
    { label: 'Completion', value: '0%', icon: TrendingUp },
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
      title: 'Bestiary',
      description: 'Learn about creatures',
      href: '/bestiary',
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
              <div
                key={stat.label}
                className="bg-pywel-card border border-pywel-border rounded-lg p-4 hover:bg-pywel-card-hover transition-colors duration-200"
              >
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

      {/* Features section */}
      <section className="bg-gradient-to-r from-black/30 to-pywel-secondary/30 border border-pywel-border rounded-lg p-8">
        <h2 className="font-cinzel text-2xl font-bold text-gold-300 mb-6">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-cinzel text-lg font-bold text-gold-300 mb-2">
              Progress Tracking
            </h3>
            <p className="text-gray-300">
              Monitor your completion across skill trees, quests, and collectibles.
              Watch your journey unfold through detailed statistics.
            </p>
          </div>
          <div>
            <h3 className="font-cinzel text-lg font-bold text-gold-300 mb-2">
              World Exploration
            </h3>
            <p className="text-gray-300">
              Discover all 5 regions with our interactive map. Track discovered
              locations and uncover secrets hidden across the desert.
            </p>
          </div>
          <div>
            <h3 className="font-cinzel text-lg font-bold text-gold-300 mb-2">
              Combat Mastery
            </h3>
            <p className="text-gray-300">
              Study our comprehensive bestiary and weapon database. Plan your
              loadouts and strategies against 50+ bosses.
            </p>
          </div>
          <div>
            <h3 className="font-cinzel text-lg font-bold text-gold-300 mb-2">
              Resource Management
            </h3>
            <p className="text-gray-300">
              Track crafting recipes, manage your inventory, and plan your builds.
              Organize your adventure with personal notes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
