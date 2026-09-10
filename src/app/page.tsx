import Link from 'next/link';
import { Compass, Map, Bot, Crosshair, ClipboardList, Wrench, Layers, Users2 } from 'lucide-react';
import { DISCLAIMER } from '@/lib/site';

const FEATURES = [
  { icon: Map, title: 'Raid Maps', text: 'Every map with points of interest, extraction points, locked rooms and loot hotspots.', href: '/maps' },
  { icon: Bot, title: 'ARC Bestiary', text: 'Weak points, behaviour and drops for every machine from the Tick to the Queen.', href: '/arc' },
  { icon: Crosshair, title: 'Weapons & Gear', text: 'Stats, ammo, recipes and attachments for the full arsenal, plus shields and gadgets.', href: '/weapons' },
  { icon: ClipboardList, title: 'Quest Tracker', text: 'Trader quest chains with objectives, rewards and a checklist that syncs to your account.', href: '/quests' },
  { icon: Wrench, title: 'Workshop Planner', text: 'Track every Speranza workshop upgrade and the materials you still need to farm.', href: '/workshop' },
  { icon: Layers, title: 'Loadout Planner', text: 'Build loadouts, price them out, and share them with your squad.', href: '/planner' },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-arc-bg text-gray-100 overflow-hidden flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-rust-900/30 via-arc-bg to-signal-900/20" />
        <div className="absolute inset-0 map-grid opacity-40" />
        <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-signal-400/5 to-transparent animate-scan" />
      </div>

      {/* Hero section */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-16">
        <div className="text-center mb-10">
          <p className="font-display text-signal-400 uppercase tracking-[0.4em] text-sm mb-4">Unofficial Companion</p>
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-3 tracking-wide">
            <span className="text-rust-300">ARC</span>{' '}
            <span className="text-sand-100">RAIDERS</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Maps, machines, weapons, quests and workshop upgrades for the Rust Belt. Track your raids and share loadouts with your squad.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-rust-400 to-signal-400 mx-auto mt-6" />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-gradient-to-r from-rust-400 to-rust-500 hover:from-rust-300 hover:to-rust-400 text-black font-display font-bold rounded-full transition-all duration-200 flex items-center gap-2 justify-center"
          >
            <Compass className="w-5 h-5" />
            Open the Companion
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 bg-arc-card hover:bg-arc-card-hover border border-rust-400/30 text-rust-300 font-display font-bold rounded-full transition-colors duration-200 text-center flex items-center gap-2 justify-center"
          >
            <Users2 className="w-5 h-5" />
            Sign In to Save Progress
          </Link>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl w-full">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <Link key={f.href} href={f.href}>
                <div className="h-full bg-arc-card/80 backdrop-blur border border-arc-border rounded-lg p-5 hover:border-rust-400/60 hover:bg-arc-card-hover transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 text-signal-400" />
                    <h3 className="font-display font-semibold text-rust-300">{f.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400">{f.text}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center text-gray-500 text-sm pb-6 space-y-1 px-4">
        <p>ARC Raiders Companion v2.0</p>
        <p className="text-xs text-gray-600 max-w-2xl mx-auto">{DISCLAIMER}</p>
      </div>
    </main>
  );
}
