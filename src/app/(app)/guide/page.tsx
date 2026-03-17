'use client';

import Link from 'next/link';
import {
  BookOpen,
  Users,
  Sword,
  Sparkles,
  Tent,
  Footprints,
  Zap,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

const QUICK_TIPS = [
  'Explore everywhere — Abyss Artifacts are hidden in caves, cliffs, and ruins.',
  'Upgrade your Blacksmith Forge early for better weapons.',
  'Watch NPCs carefully — the Observation system lets you learn new skills by watching.',
  'Cook meals before boss fights for powerful stat buffs.',
  'Try all three characters — each has a unique story arc.',
  'Liberation quests unlock new vendors and fast travel points.',
];

export default function GuidePage() {
  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-gold-400">
          New Player Guide
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Everything you need to know to begin your journey through Pywel.
        </p>
      </div>

      {/* ── Section 1: Welcome to Pywel ── */}
      <div className="bg-pywel-card rounded-lg border border-pywel-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-gold-400" />
          <h2 className="text-xl font-cinzel font-bold text-gold-400">
            Welcome to Pywel
          </h2>
        </div>
        <p className="text-gray-300 leading-relaxed">
          Crimson Desert is an open-world action RPG where you play as Kliff, a
          mercenary leader of the Greymane company. Set in the war-torn
          continent of Pywel, the game features seamless exploration across
          sprawling landscapes, intense skill-based combat against towering
          bosses, and deep life-sim systems — from farming and cooking to
          upgrading your mercenary camp. Whether you prefer swordplay, archery,
          or magic, the world of Pywel has something for every adventurer.
        </p>
      </div>

      {/* ── Section 2: The Three Playable Characters ── */}
      <div className="bg-pywel-card rounded-lg border border-pywel-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-gold-400" />
          <h2 className="text-xl font-cinzel font-bold text-gold-400">
            The Three Playable Characters
          </h2>
        </div>

        <div className="space-y-4">
          <div className="border border-pywel-border rounded-lg p-4">
            <h3 className="font-cinzel font-semibold text-gold-300 mb-1">
              Kliff — Versatile Mercenary Leader
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Leader of the Greymane mercenary company. Wields swords, bows,
              polearms, and staffs. A true jack-of-all-trades and the ideal
              starting character for learning the combat system.
            </p>
          </div>

          <div className="border border-pywel-border rounded-lg p-4">
            <h3 className="font-cinzel font-semibold text-gold-300 mb-1">
              Damiane — Agile Noble
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              A swift swashbuckler armed with rapiers, guns, and devastating
              evasion skills. A glass cannon with high mobility — nearly
              untouchable when played well, but punishing if you make mistakes.
            </p>
          </div>

          <div className="border border-pywel-border rounded-lg p-4">
            <h3 className="font-cinzel font-semibold text-gold-300 mb-1">
              Oongka — Powerful Orc Warrior
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              A massive orc warrior wielding axes, wrist cannons, and brute
              force. Slow but absolutely devastating — built for clearing crowds
              and tanking massive hits.
            </p>
          </div>
        </div>

        <Link
          href="/characters"
          className="inline-flex items-center gap-1 text-sm text-gold-300 hover:text-gold-200 transition-colors mt-3"
        >
          Explore Characters <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ── Section 3: Combat & Elements ── */}
      <div className="bg-pywel-card rounded-lg border border-pywel-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Sword className="w-6 h-6 text-gold-400" />
          <h2 className="text-xl font-cinzel font-bold text-gold-400">
            Combat &amp; Elements
          </h2>
        </div>

        <div className="space-y-3 text-gray-300 leading-relaxed">
          <p>
            Combat in Crimson Desert revolves around <strong className="text-gold-300">five elements</strong>:{' '}
            <span className="text-gray-200">Physical</span>,{' '}
            <span className="text-orange-400">Fire</span>,{' '}
            <span className="text-sky-400">Frost</span>,{' '}
            <span className="text-yellow-300">Shock</span>, and{' '}
            <span className="text-purple-400">Abyss</span>.
          </p>
          <p>
            Bosses deal elemental damage <em>and</em> have elemental
            weaknesses — learning to exploit them is the key to victory.
            Weapons can be imbued with elements through Abyss Magic skills,
            letting you tailor your loadout to each encounter.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mt-3">
          <Link
            href="/bestiary"
            className="inline-flex items-center gap-1 text-sm text-gold-300 hover:text-gold-200 transition-colors"
          >
            Explore Bestiary <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href="/weapons"
            className="inline-flex items-center gap-1 text-sm text-gold-300 hover:text-gold-200 transition-colors"
          >
            Explore Weapons <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Section 4: Abyss Artifacts & Skills ── */}
      <div className="bg-pywel-card rounded-lg border border-pywel-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-gold-400" />
          <h2 className="text-xl font-cinzel font-bold text-gold-400">
            Abyss Artifacts &amp; Skills
          </h2>
        </div>

        <div className="space-y-3 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-gold-300">Abyss Artifacts</strong> are the
            skill currency of Crimson Desert — think of them like skill points.
            They are scattered throughout the world in hidden locations: tucked
            inside caves, perched on cliff edges, and buried in ancient ruins.
          </p>
          <p>
            Spend them to unlock powerful abilities in each character&apos;s skill
            tree. But not every skill is unlocked with artifacts — some are
            learned through the{' '}
            <strong className="text-gold-300">Observation system</strong>.
            Watch NPCs and enemies carefully to learn their techniques and add
            them to your own repertoire.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mt-3">
          <Link
            href="/skills"
            className="inline-flex items-center gap-1 text-sm text-gold-300 hover:text-gold-200 transition-colors"
          >
            Explore Skills <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href="/collectibles"
            className="inline-flex items-center gap-1 text-sm text-gold-300 hover:text-gold-200 transition-colors"
          >
            Explore Collectibles <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Section 5: Greymane Camp ── */}
      <div className="bg-pywel-card rounded-lg border border-pywel-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Tent className="w-6 h-6 text-gold-400" />
          <h2 className="text-xl font-cinzel font-bold text-gold-400">
            Greymane Camp
          </h2>
        </div>

        <div className="space-y-3 text-gray-300 leading-relaxed">
          <p>
            Your camp serves as your base of operations. Upgrade its facilities
            to unlock better crafting, cooking, farming, and more.
          </p>

          <div>
            <h3 className="text-sm font-semibold text-gold-300 mb-2">
              10 Facilities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'Blacksmith Forge',
                'Bonfire Kitchen',
                'Farm Plots',
                'Livestock Ranch',
                'Camp Vendor',
                'Dispatch Board',
                'Barber Shop',
                'Dyehouse Shop',
                'Trading Center',
                'Personal Resting House',
              ].map((facility) => (
                <div
                  key={facility}
                  className="text-sm text-gray-300 bg-pywel-bg rounded px-3 py-2 border border-pywel-border"
                >
                  {facility}
                </div>
              ))}
            </div>
          </div>

          <p>
            Life activities keep your camp thriving:{' '}
            <span className="text-gray-200">
              Fishing, Hunting, Mining, Herb Gathering, Farming, Cooking
            </span>
            , and more. Each activity feeds into crafting and camp upgrades.
          </p>
        </div>

        <Link
          href="/camp"
          className="inline-flex items-center gap-1 text-sm text-gold-300 hover:text-gold-200 transition-colors mt-3"
        >
          Explore Camp <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ── Section 6: Mounts ── */}
      <div className="bg-pywel-card rounded-lg border border-pywel-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Footprints className="w-6 h-6 text-gold-400" />
          <h2 className="text-xl font-cinzel font-bold text-gold-400">
            Mounts
          </h2>
        </div>

        <div className="space-y-3 text-gray-300 leading-relaxed">
          <p>
            Pywel features <strong className="text-gold-300">29 mounts</strong>{' '}
            across 8 categories:{' '}
            <span className="text-gray-200">
              Horses, Bears, Raptors, Lizards, Wyverns, Mechanical, Dinosaurs,
              and Exotic
            </span>
            .
          </p>
          <p>
            Each mount has unique speed, combat, and stamina stats along with
            special abilities. Acquire them through taming wild creatures,
            completing quests, defeating bosses for rare drops, or crafting at
            the Blacksmith Forge.
          </p>
        </div>

        <Link
          href="/mounts"
          className="inline-flex items-center gap-1 text-sm text-gold-300 hover:text-gold-200 transition-colors mt-3"
        >
          Explore Mounts <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ── Section 7: Quick Tips ── */}
      <div className="bg-pywel-card rounded-lg border border-pywel-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-gold-400" />
          <h2 className="text-xl font-cinzel font-bold text-gold-400">
            Quick Tips
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {QUICK_TIPS.map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-pywel-bg rounded-lg border border-pywel-border p-4"
            >
              <ArrowRight className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
              <p className="text-sm text-gray-300 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
