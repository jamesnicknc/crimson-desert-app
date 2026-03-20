'use client';

import { useState } from 'react';
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
  ChevronDown,
  Flame,
  Snowflake,
  Zap as ZapIcon,
  Shield,
  Scroll,
  Star,
  Settings,
  Mountain,
} from 'lucide-react';

interface ChapterInfo {
  number: number;
  title: string;
  subtitle: string;
  summary: string;
  bosses: string[];
  rewards: string[];
  tips: string[];
}

const CHAPTERS: ChapterInfo[] = [
  {
    number: 0,
    title: 'Dead of Night',
    subtitle: 'Prologue',
    summary: 'Your journey begins when Greymane Company is ambushed by black bears in the night. This opening tutorial teaches you the fundamentals of combat and exploration.',
    bosses: ['Black Bear Pack'],
    rewards: ['Basic Sword', 'Starter Armor'],
    tips: [
      'Learn basic attack and parry mechanics here',
      'Watch for enemy tells before they attack',
      'Use the environment to your advantage',
    ],
  },
  {
    number: 1,
    title: 'The First Encounter',
    subtitle: 'Chapter 1',
    summary: 'The Greymane Company seeks work and finds the Trials of Kindness. Meet your first allies and uncover the politics of the mercenary world.',
    bosses: ['Trial Guardian', 'Bandits'],
    rewards: ['Bounty Gold', 'First Artifact Seals'],
    tips: [
      'This chapter introduces the camp system',
      'Complete exploration objectives for bonus rewards',
      'Talk to all NPCs to unlock character backstory',
    ],
  },
  {
    number: 2,
    title: 'Golden Greed',
    subtitle: 'Chapter 2',
    summary: 'The chaos of Hernand deepens. Face Kailok, a powerful Abyss-corrupted foe, in your first major confrontation. The stakes are raised.',
    bosses: ['Kailok', 'Abyss Cultists'],
    rewards: ['Abyss Core Accessory', 'Fire-Infused Weapon'],
    tips: [
      'Learn elemental weaknesses by observing Kailok',
      'This fight requires understanding of the element system',
      'Stock up on cooked meals before this boss',
    ],
  },
  {
    number: 3,
    title: 'Howling Hill',
    subtitle: 'Chapter 3',
    summary: 'Journey to Greymane Camp and establish your base. Damiane joins the party, expanding your combat options.',
    bosses: ['Hill Spirits', 'Greymane Trials'],
    rewards: ['Camp Upgrade Materials', 'Damiane Joins'],
    tips: [
      'This chapter unlocks the full camp management system',
      'Upgrade the Blacksmith Forge and Kitchen first',
      'Damiane excels at evasion-based combat',
    ],
  },
  {
    number: 4,
    title: 'Price of Knowledge',
    subtitle: 'Chapter 4',
    summary: 'Explore Delesyia and delve into ancient mysteries. Face Marni\'s Excavatron in an epic mechanical battle.',
    bosses: ['Marni\'s Excavatron', 'Ancient Guardians'],
    rewards: ['Ancient Mechanism Part', 'Knowledge Scroll'],
    tips: [
      'Learn to target weak points on mechanical enemies',
      'Gather resources in Delesyia for crafting',
      'The Observation system shines here',
    ],
  },
  {
    number: 5,
    title: 'Guest Unbidden',
    subtitle: 'Chapter 5',
    summary: 'Political intrigue unfolds as unexpected allies reveal themselves. Navigate complex relationships and hidden betrayals.',
    bosses: ['Political Rival', 'Mercenary Challenger'],
    rewards: ['Diplomatic Favor', 'Faction Reputation'],
    tips: [
      'Your dialogue choices begin to matter',
      'Befriend multiple factions for rewards',
      'This chapter opens new side quest lines',
    ],
  },
  {
    number: 6,
    title: 'Cracks in the Shield',
    subtitle: 'Chapter 6',
    summary: 'Major battles erupt across Pywel. Face multiple bosses in succession and confront the growing darkness.',
    bosses: ['Warlord Captain', 'Shadow Knight', 'Chaos Elemental'],
    rewards: ['War Spoils', 'Legendary Gear'],
    tips: [
      'This chapter features some of the toughest fights',
      'Ensure all three characters are well-equipped',
      'Use all three characters in succession',
    ],
  },
  {
    number: 7,
    title: 'Homecoming',
    subtitle: 'Chapter 7',
    summary: 'Journey to the Myurdin region for a climactic confrontation. Oongka joins the party and you discover the Axiom Bracelet.',
    bosses: ['Myurdin Guardian', 'Oongka\'s Trial'],
    rewards: ['Axiom Bracelet', 'Oongka Joins', 'Dragon Egg Item'],
    tips: [
      'Oongka is a powerhouse for crowd control',
      'The Axiom Bracelet unlocks new mechanics',
      'You can now tame dragons in limited capacity',
    ],
  },
  {
    number: 8,
    title: 'Blood Coronation',
    subtitle: 'Chapter 8',
    summary: 'Travel to Demeniss, the heart of power. A shocking betrayal sets the stage for the final act.',
    bosses: ['Demeniss Guardian', 'The Betrayer'],
    rewards: ['Royal Insignia', 'Abyss Core Fragment'],
    tips: [
      'This chapter shifts the narrative dramatically',
      'Prepare for increased difficulty',
      'Some NPCs will become unavailable',
    ],
  },
  {
    number: 9,
    title: 'Shattered Throne',
    subtitle: 'Chapter 9',
    summary: 'The conspiracy deepens. Face the remnants of corrupted leadership and uncover the true nature of the Abyss.',
    bosses: ['Corrupted Lord', 'Abyss Herald'],
    rewards: ['Crown Fragment', 'Abyss Essence'],
    tips: [
      'Use all three characters effectively here',
      'Element mastery is crucial',
      'Exploration unlocks secret areas',
    ],
  },
  {
    number: 10,
    title: 'The Abyss Calls',
    subtitle: 'Chapter 10',
    summary: 'Venture into the Abyss itself. Face manifestations of pure corruption and discover the source of the world\'s troubles.',
    bosses: ['Abyss Entity', 'Corruption Core'],
    rewards: ['Abyss Key', 'Ancient Rune'],
    tips: [
      'This is the point of no return',
      'Ensure you have completed all desired side quests',
      'Abyss damage becomes prevalent',
    ],
  },
  {
    number: 11,
    title: 'Trials of Ascension',
    subtitle: 'Chapter 11',
    summary: 'Push through dimensional rifts and spiritual trials. Test yourself against the strongest opponents yet.',
    bosses: ['Rift Titan', 'Spirit Avatar', 'Echo of Power'],
    rewards: ['Ascension Sigil', 'Ultimate Weapon Part'],
    tips: [
      'This chapter requires mastery of combat mechanics',
      'Prepare with the best gear available',
      'Consider legendary difficulty for extra rewards',
    ],
  },
  {
    number: 12,
    title: 'Reckoning',
    subtitle: 'Chapter 12',
    summary: 'The final confrontation looms. Gather your strength for the ultimate battle against the source of darkness.',
    bosses: ['The Dark One'],
    rewards: ['Victory Spoils', 'Ultimate Abyss Core'],
    tips: [
      'This is the final main story boss',
      'All three characters will be tested',
      'Use every skill and ability you\'ve learned',
    ],
  },
  {
    number: 13,
    title: 'Journey\'s End',
    subtitle: 'Epilogue',
    summary: 'In the aftermath of victory, rebuild Pywel. Spend time with the characters you\'ve grown to know and decide the fate of the world.',
    bosses: [],
    rewards: ['Epilogue Completion Bonus', 'New Game+ Unlock'],
    tips: [
      'This epilogue expands based on your choices',
      'Different dialogue options lead to different endings',
      'Complete it for a sense of closure',
      'Unlocks New Game+ with carryover rewards',
    ],
  },
];

const COMBAT_ELEMENTS = [
  {
    name: 'Physical',
    color: 'text-gray-300',
    description: 'Traditional blade and blunt force damage. No special effects, pure power.',
    advantages: ['Reliable', 'No setup required'],
    weakness: 'None; all enemies take Physical damage',
  },
  {
    name: 'Fire',
    color: 'text-orange-400',
    description: 'Blazing damage that scorches enemies. Can trigger burn status effects.',
    advantages: ['DoT potential', 'High damage against frost enemies'],
    weakness: 'Fire enemies resist or heal from fire attacks',
  },
  {
    name: 'Frost',
    color: 'text-sky-400',
    description: 'Freezing damage that slows and can freeze enemies in place.',
    advantages: ['Movement control', 'Excellent for kiting'],
    weakness: 'Frost enemies are immune or heal',
  },
  {
    name: 'Shock',
    color: 'text-yellow-300',
    description: 'Electric damage that can stun enemies and interrupt their attacks.',
    advantages: ['Interrupt potential', 'Fast attack chains'],
    weakness: 'Shock enemies are resistant',
  },
  {
    name: 'Abyss',
    color: 'text-purple-400',
    description: 'Corrupted magic damage from another dimension. Rare and powerful.',
    advantages: ['Unique mechanics', 'Effective against most foes'],
    weakness: 'Abyss enemies reflect it; limited availability early game',
  },
];

const RECOMMENDED_BUILDS = [
  {
    id: 'kliff-balanced',
    name: 'Balanced Swordmaster',
    character: 'kliff',
    difficulty: 'beginner',
    playstyle: 'Versatile, with balanced offense and defense',
    weapons: ['Iron Sword', 'Wooden Bow', 'Simple Staff'],
    keySkills: ['Parry Mastery', 'Multi-hit Combo', 'Elemental Slash'],
    abyssCores: ['Fire Core', 'Frost Core'],
    description: 'Perfect for learning the game. Kliff can switch between swords, bows, and staffs to adapt to any situation. Focus on learning parry timing and basic combo chains.',
  },
  {
    id: 'damiane-glass-cannon',
    name: 'Glass Cannon Duelist',
    character: 'damiane',
    difficulty: 'intermediate',
    playstyle: 'Evasion-focused, high damage output',
    weapons: ['Rapier', 'Pistol', 'Dagger'],
    keySkills: ['Evasion Dance', 'Riposte', 'Bullet Barrage'],
    abyssCores: ['Shock Core', 'Abyss Core'],
    description: 'For experienced players. Damiane excels at dodging every attack and punishing with massive damage. Requires precision timing but rewards mastery.',
  },
  {
    id: 'oongka-bruiser',
    name: 'Unstoppable Bruiser',
    character: 'oongka',
    difficulty: 'intermediate',
    playstyle: 'Tank and crowd control',
    weapons: ['Great Axe', 'Wrist Cannon', 'Heavy Mace'],
    keySkills: ['Cleave', 'Shockwave', 'Endurance'],
    abyssCores: ['Fire Core', 'Physical Core'],
    description: 'Oongka dominates through sheer power. His slow but devastating attacks clear groups and tank hits. Great for learning fight patterns without constant dodging.',
  },
  {
    id: 'kliff-archer',
    name: 'Swift Archer',
    character: 'kliff',
    difficulty: 'beginner',
    playstyle: 'Ranged damage, mobile',
    weapons: ['Longbow', 'Dagger', 'Fist Weapon'],
    keySkills: ['Power Shot', 'Rain of Arrows', 'Swift Strike'],
    abyssCores: ['Shock Core', 'Frost Core'],
    description: 'Ranged playstyle with mobility. Stay at a distance and rain arrows on enemies. Switch to dagger for close encounters.',
  },
  {
    id: 'damiane-rapier-master',
    name: 'Elegant Rapier Master',
    character: 'damiane',
    difficulty: 'advanced',
    playstyle: 'Precision strikes and advanced parries',
    weapons: ['Moonlight Rapier', 'Pistol', 'Void Dagger'],
    keySkills: ['Precision Strike', 'Blade Dance', 'Riposte Chain'],
    abyssCores: ['Abyss Core', 'Shock Core'],
    description: 'For masters of Damiane. Weave impossibly tight patterns of strikes and perfectly-timed ripostes. The ceiling is incredibly high.',
  },
  {
    id: 'oongka-support',
    name: 'Support Tank',
    character: 'oongka',
    difficulty: 'advanced',
    playstyle: 'Protect allies, control battles',
    weapons: ['War Hammer', 'Shield Cannon', 'Chain'],
    keySkills: ['Guardian Stance', 'Taunt', 'Protective Shout'],
    abyssCores: ['Fire Core', 'Frost Core'],
    description: 'Oongka as the party anchor. Position yourself between enemies and allies, control enemy aggression, and deliver earth-shaking attacks.',
  },
];

const CAMP_FACILITIES = [
  {
    name: 'Blacksmith Forge',
    description: 'Craft and enhance weapons, armor, and accessories.',
    upgrades: 3,
    priority: 'Very High',
  },
  {
    name: 'Bonfire Kitchen',
    description: 'Cook meals that provide stat buffs and healing.',
    upgrades: 3,
    priority: 'High',
  },
  {
    name: 'Farm Plots',
    description: 'Grow crops that are used in cooking and crafting.',
    upgrades: 3,
    priority: 'High',
  },
  {
    name: 'Livestock Ranch',
    description: 'Raise animals for meat and materials.',
    upgrades: 2,
    priority: 'Medium',
  },
  {
    name: 'Camp Vendor',
    description: 'Buy and sell goods. Unlock specialty merchants with upgrades.',
    upgrades: 2,
    priority: 'High',
  },
  {
    name: 'Dispatch Board',
    description: 'Send mercenaries on missions for passive income and resources.',
    upgrades: 2,
    priority: 'Medium',
  },
  {
    name: 'Barber Shop',
    description: 'Change character appearance and hairstyles.',
    upgrades: 1,
    priority: 'Low',
  },
  {
    name: 'Dyehouse Shop',
    description: 'Dye weapons and armor custom colors.',
    upgrades: 2,
    priority: 'Low',
  },
  {
    name: 'Trading Center',
    description: 'Exchange rare materials and conduct trade route missions.',
    upgrades: 2,
    priority: 'Medium',
  },
  {
    name: 'Personal Resting House',
    description: 'Sleep to pass time and restore stamina. Unlock cosmetics here.',
    upgrades: 1,
    priority: 'Low',
  },
];

const MOUNT_INFO = [
  {
    category: 'Horses',
    count: 5,
    description: 'Balanced mounts with good speed and reliability.',
    strength: 'Versatile',
    weakness: 'No special combat bonuses',
  },
  {
    category: 'Bears',
    count: 3,
    description: 'Powerful melee mounts that excel at charging and crowd control.',
    strength: 'Combat power',
    weakness: 'Slower than horses',
  },
  {
    category: 'Raptors',
    count: 4,
    description: 'Agile and fast. Perfect for kiting and hit-and-run tactics.',
    strength: 'Speed and mobility',
    weakness: 'Fragile in combat',
  },
  {
    category: 'Lizards',
    count: 3,
    description: 'Desert-adapted mounts with special environmental abilities.',
    strength: 'Desert traversal',
    weakness: 'Limited to specific regions',
  },
  {
    category: 'Wyverns',
    count: 2,
    description: 'Winged mounts that can glide and access high areas.',
    strength: 'Vertical movement',
    weakness: 'Rare and difficult to tame',
  },
  {
    category: 'Mechanical',
    count: 2,
    description: 'Crafted mounts with unique properties and durability.',
    strength: 'Customizable',
    weakness: 'Requires rare materials',
  },
  {
    category: 'Dinosaurs',
    count: 2,
    description: 'Prehistoric titans with incredible power.',
    strength: 'Raw power',
    weakness: 'Very slow',
  },
  {
    category: 'Dragons',
    count: 2,
    description: 'Ultimate mounts unlocked late game. Unmatched in every category.',
    strength: 'All-around superior',
    weakness: 'Limited availability',
  },
];

const ABYSS_BASICS = [
  'Abyss Artifacts are scattered across all regions - caves, cliff faces, underwater, inside ruins.',
  'Look for shimmering blue orbs or glow in otherwise dark areas.',
  'You need climbing, swimming, or special abilities to reach some artifacts.',
  'Guiding Light mechanic: Follow the light to sealed artifacts; solving the puzzle unlocks them.',
  'Total of 141 Sealed Artifacts across the entire game.',
  'Each artifact gives 1 skill point - plan your purchases carefully.',
  'Some rare artifacts require boss defeats or specific conditions.',
  'Map markers help track your progress, but some remain hidden until discovered.',
];

const ADVANCED_TIPS = [
  {
    title: 'Perfect Parry Windows',
    content: 'Each boss has specific parry windows. Watch their wind-up animations carefully. A perfect parry at the right moment launches a counter that deals massive damage.',
  },
  {
    title: 'Element Stacking',
    content: 'Combining multiple elemental attacks can create combo effects. Fire then Frost can freeze enemies; Shock then Fire ignites them.',
  },
  {
    title: 'Observation Mastery',
    content: 'Observe the same enemy type multiple times to unlock all their skills. Rare enemies teach the most powerful techniques.',
  },
  {
    title: 'Mount Combat Combos',
    content: 'Different mounts enable different mounted combat styles. Use them strategically in large encounters.',
  },
  {
    title: 'Cooking Buff Stacking',
    content: 'Certain meal combinations provide stacking buffs. Stack ATK, DEF, and elemental resist meals for ultimate boss preparation.',
  },
  {
    title: 'Dispatch Mission Timing',
    content: 'Missions that take longer return with rarer rewards. Balance quick missions for cash with slow missions for legendary items.',
  },
  {
    title: 'Character Switching',
    content: 'In multi-character battles, switch between characters strategically to adapt to attacks. Each character handles different enemy types better.',
  },
  {
    title: 'Resource Management',
    content: 'Plan your farm and ranch output weeks in advance. Future bosses require specific meal types for optimal strategy.',
  },
];

function CollapsibleChapter({ chapter }: { chapter: ChapterInfo }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-pywel-bg border border-pywel-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-pywel-card transition-colors"
      >
        <div className="text-left">
          <h3 className="font-cinzel font-semibold text-gold-300">
            Chapter {chapter.number}: {chapter.title}
          </h3>
          <p className="text-sm text-gray-400">{chapter.subtitle}</p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gold-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-pywel-border p-4 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gold-300 mb-2">Summary</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              {chapter.summary}
            </p>
          </div>

          {chapter.bosses.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gold-300 mb-2">
                Key Bosses
              </h4>
              <ul className="space-y-1">
                {chapter.bosses.map((boss) => (
                  <li key={boss} className="text-sm text-gray-300 flex items-center gap-2">
                    <Sword className="w-3 h-3 text-orange-400" />
                    {boss}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-sm font-semibold text-gold-300 mb-2">Rewards</h4>
            <ul className="space-y-1">
              {chapter.rewards.map((reward) => (
                <li key={reward} className="text-sm text-gray-300 flex items-center gap-2">
                  <Star className="w-3 h-3 text-yellow-400" />
                  {reward}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gold-300 mb-2">Tips</h4>
            <ul className="space-y-1">
              {chapter.tips.map((tip, idx) => (
                <li key={idx} className="text-sm text-gray-300 flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-gold-400" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState('beginning');

  const tabs = [
    { id: 'beginning', label: 'Beginner\'s Guide', icon: BookOpen },
    { id: 'story', label: 'Story Walkthrough', icon: Scroll },
    { id: 'combat', label: 'Combat & Elements', icon: Sword },
    { id: 'builds', label: 'Character Builds', icon: Users },
    { id: 'artifacts', label: 'Abyss Artifacts', icon: Sparkles },
    { id: 'camp', label: 'Camp Management', icon: Tent },
    { id: 'mounts', label: 'Mounts', icon: Footprints },
    { id: 'advanced', label: 'Advanced Tips', icon: Zap },
  ];

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-gold-400">
          Crimson Desert Guide
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Your complete companion for mastering Pywel. From beginner tips to advanced strategies, find everything you need here.
        </p>
      </div>

      {/* ── Tab Navigation ── */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === id
                ? 'bg-gold-400 text-pywel-bg'
                : 'bg-pywel-card border border-pywel-border text-gray-300 hover:border-gold-400'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-semibold">{label}</span>
          </button>
        ))}
      </div>

      {/* ── BEGINNER'S GUIDE ── */}
      {activeTab === 'beginning' && (
        <div className="space-y-6">
          {/* Getting Started */}
          <div className="bg-pywel-card rounded-lg border border-pywel-border p-6 space-y-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-gold-400" />
              <h2 className="text-2xl font-cinzel font-bold text-gold-400">
                Getting Started
              </h2>
            </div>
            <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
              <p>
                Welcome to Crimson Desert, an open-world action RPG set on the war-torn continent of Pywel. You play as Kliff, a mercenary leader of the Greymane Company, as you explore massive landscapes, engage in intense skill-based combat, and manage a living mercenary camp.
              </p>
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-2">Core Gameplay Loop</h3>
                <ul className="space-y-1 text-xs">
                  <li>• Explore Pywel, discover secrets, and find Abyss Artifacts</li>
                  <li>• Engage in real-time combat using parries, counters, and skill chains</li>
                  <li>• Return to camp to craft gear, cook meals, farm, and upgrade facilities</li>
                  <li>• Progress the main story while completing optional quests</li>
                  <li>• Master three characters with distinct playstyles</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Controls Overview */}
          <div className="bg-pywel-card rounded-lg border border-pywel-border p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-gold-400" />
              <h2 className="text-2xl font-cinzel font-bold text-gold-400">
                Controls Overview
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h3 className="font-semibold text-gold-300">Movement & Interaction</h3>
                <ul className="space-y-1 text-gray-300">
                  <li><span className="text-gold-300">WASD</span> - Move character</li>
                  <li><span className="text-gold-300">Space</span> - Jump/Climb</li>
                  <li><span className="text-gold-300">E</span> - Interact with objects</li>
                  <li><span className="text-gold-300">Tab</span> - Open inventory</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gold-300">Combat</h3>
                <ul className="space-y-1 text-gray-300">
                  <li><span className="text-gold-300">LMB</span> - Attack</li>
                  <li><span className="text-gold-300">RMB</span> - Parry/Guard</li>
                  <li><span className="text-gold-300">Q/E</span> - Use skills</li>
                  <li><span className="text-gold-300">F</span> - Special ability</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="bg-pywel-card rounded-lg border border-pywel-border p-6 space-y-4">
            <h2 className="text-2xl font-cinzel font-bold text-gold-400">
              Key Concepts
            </h2>
            <div className="space-y-3 text-sm">
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-1">Parry & Counter System</h3>
                <p className="text-gray-300 text-xs leading-relaxed">
                  Parrying is not blocking—it's a precise counter mechanic. Time your parry to match an enemy's attack for a powerful riposte. Mastering this is essential for boss fights.
                </p>
              </div>
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-1">Elemental Weaknesses</h3>
                <p className="text-gray-300 text-xs leading-relaxed">
                  Every enemy and boss has elemental affinities. Learning their element and weakness is crucial—use the right element and deals 50% more damage.
                </p>
              </div>
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-1">Observation System</h3>
                <p className="text-gray-300 text-xs leading-relaxed">
                  Watch enemies and NPCs perform attacks. Observe them enough times to unlock their techniques as learnable skills for your character.
                </p>
              </div>
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-1">Abyss Artifacts</h3>
                <p className="text-gray-300 text-xs leading-relaxed">
                  These are skill points scattered across the world. Collect them to unlock new abilities in skill trees. There are 141 total—you won't get them all in one playthrough.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── STORY WALKTHROUGH ── */}
      {activeTab === 'story' && (
        <div className="space-y-6">
          <div className="bg-pywel-card rounded-lg border border-pywel-border p-6">
            <p className="text-gray-400 text-sm">
              The story unfolds across 14 chapters. Below is a detailed walkthrough for each. Click on a chapter to see bosses, rewards, and tips.
            </p>
          </div>

          <div className="space-y-3">
            {CHAPTERS.map((chapter) => (
              <CollapsibleChapter key={chapter.number} chapter={chapter} />
            ))}
          </div>
        </div>
      )}

      {/* ── COMBAT & ELEMENTS ── */}
      {activeTab === 'combat' && (
        <div className="space-y-6">
          {/* Combat Fundamentals */}
          <div className="bg-pywel-card rounded-lg border border-pywel-border p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Sword className="w-6 h-6 text-gold-400" />
              <h2 className="text-2xl font-cinzel font-bold text-gold-400">
                Combat Fundamentals
              </h2>
            </div>
            <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
              <p>
                Crimson Desert features real-time, skill-based combat. There's no auto-attack; every move is player-controlled. Success comes from learning enemy patterns, timing parries perfectly, and chaining combos effectively.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-pywel-bg border border-pywel-border rounded p-3">
                  <h3 className="font-semibold text-gold-300 mb-1">Attack Chains</h3>
                  <p className="text-xs text-gray-300">Consecutive attacks build momentum, dealing increasing damage. Some combos unlock special finishers.</p>
                </div>
                <div className="bg-pywel-bg border border-pywel-border rounded p-3">
                  <h3 className="font-semibold text-gold-300 mb-1">Parry Windows</h3>
                  <p className="text-xs text-gray-300">Each enemy attack has a small parry window. Perfect timing triggers a counter that stuns them briefly.</p>
                </div>
                <div className="bg-pywel-bg border border-pywel-border rounded p-3">
                  <h3 className="font-semibold text-gold-300 mb-1">Stamina Management</h3>
                  <p className="text-xs text-gray-300">Dodging, attacking, and skills consume stamina. Let it recover or you'll be vulnerable.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Elements */}
          <div className="bg-pywel-card rounded-lg border border-pywel-border p-6 space-y-4">
            <h2 className="text-2xl font-cinzel font-bold text-gold-400">
              The Five Elements
            </h2>
            <div className="space-y-3">
              {COMBAT_ELEMENTS.map((element) => (
                <div
                  key={element.name}
                  className="bg-pywel-bg border border-pywel-border rounded-lg p-4"
                >
                  <h3 className={`font-cinzel font-semibold mb-1 ${element.color}`}>
                    {element.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">{element.description}</p>
                  <div className="flex gap-6 text-xs">
                    <div>
                      <span className="text-gold-300">Advantages:</span>
                      <p className="text-gray-400">{element.advantages.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-gold-300">Weakness:</span>
                      <p className="text-gray-400">{element.weakness}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weapon Types */}
          <div className="bg-pywel-card rounded-lg border border-pywel-border p-6 space-y-4">
            <h2 className="text-2xl font-cinzel font-bold text-gold-400">
              Weapon Types & Playstyles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-2">Swords</h3>
                <p className="text-gray-300 text-xs mb-2">Balanced melee weapons with good range and attack speed. The most versatile choice.</p>
                <p className="text-gold-300 text-xs">Best for: Learning, balanced playstyle</p>
              </div>
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-2">Bows</h3>
                <p className="text-gray-300 text-xs mb-2">Ranged weapons for keeping distance. Slower but deal high damage and can apply status effects.</p>
                <p className="text-gold-300 text-xs">Best for: Ranged specialists, kiting</p>
              </div>
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-2">Staffs</h3>
                <p className="text-gray-300 text-xs mb-2">Magical weapons that enable elemental attacks and area effects. Moderate damage but excellent utility.</p>
                <p className="text-gold-300 text-xs">Best for: Elemental builds, crowd control</p>
              </div>
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-2">Heavy Weapons</h3>
                <p className="text-gray-300 text-xs mb-2">Axes, hammers, and greatswords. Slow but devastating. Ideal for crowd control and boss fights.</p>
                <p className="text-gold-300 text-xs">Best for: Tanking, crowd clear</p>
              </div>
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-2">Rapiers</h3>
                <p className="text-gray-300 text-xs mb-2">Precision weapons for agile characters. Low damage but extremely fast and enable high skill-cap combos.</p>
                <p className="text-gold-300 text-xs">Best for: Advanced players, Damiane</p>
              </div>
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-2">Guns</h3>
                <p className="text-gray-300 text-xs mb-2">Modern ranged weapons with high fire rate. Available only for Damiane. Enable bullet-spam combos.</p>
                <p className="text-gold-300 text-xs">Best for: Damiane burst damage</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CHARACTER BUILDS ── */}
      {activeTab === 'builds' && (
        <div className="space-y-6">
          <div className="bg-pywel-card rounded-lg border border-pywel-border p-6">
            <p className="text-gray-400 text-sm">
              Recommended builds for different playstyles and difficulty levels. Each build has a focused strategy and weapon loadout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RECOMMENDED_BUILDS.map((build) => {
              const difficultyColor =
                build.difficulty === 'beginner'
                  ? 'text-green-400'
                  : build.difficulty === 'intermediate'
                    ? 'text-yellow-400'
                    : 'text-red-400';
              return (
                <div
                  key={build.id}
                  className="bg-pywel-card rounded-lg border border-pywel-border p-4 space-y-3"
                >
                  <div>
                    <h3 className="text-lg font-cinzel font-semibold text-gold-300">
                      {build.name}
                    </h3>
                    <p className="text-xs text-gray-400 capitalize">
                      {build.character} • <span className={difficultyColor}>{build.difficulty}</span>
                    </p>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed">
                    {build.description}
                  </p>

                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="text-gold-300 font-semibold mb-1">Playstyle</p>
                      <p className="text-gray-400">{build.playstyle}</p>
                    </div>

                    <div>
                      <p className="text-gold-300 font-semibold mb-1">Weapons</p>
                      <div className="flex flex-wrap gap-1">
                        {build.weapons.map((w) => (
                          <span key={w} className="bg-pywel-bg rounded px-2 py-1 text-gray-300">
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-gold-300 font-semibold mb-1">Key Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {build.keySkills.map((s) => (
                          <span key={s} className="bg-pywel-bg rounded px-2 py-1 text-gray-300">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-gold-300 font-semibold mb-1">Abyss Cores</p>
                      <div className="flex flex-wrap gap-1">
                        {build.abyssCores.map((c) => (
                          <span key={c} className="bg-pywel-bg rounded px-2 py-1 text-gray-300">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── ABYSS ARTIFACTS ── */}
      {activeTab === 'artifacts' && (
        <div className="space-y-6">
          <div className="bg-pywel-card rounded-lg border border-pywel-border p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-gold-400" />
              <h2 className="text-2xl font-cinzel font-bold text-gold-400">
                Abyss Artifacts Guide
              </h2>
            </div>
            <div className="space-y-4">
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-2">What Are Abyss Artifacts?</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Abyss Artifacts are mystical seals scattered across Pywel. They serve as skill points—each artifact collected grants one point to unlock new abilities in your character's skill tree. With 141 total artifacts in the game and a skill tree requiring roughly 100-120 artifacts to fully explore, you'll need multiple playthroughs or careful selection to unlock everything.
                </p>
              </div>

              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-2">Finding Artifacts</h3>
                <ul className="space-y-2">
                  {ABYSS_BASICS.map((tip, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                      <Star className="w-3 h-3 text-gold-400 mt-0.5 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-2">The Guiding Light Mechanic</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Many sealed artifacts are locked behind a puzzle called "Guiding Light." When you approach, spectral light appears, leading you through a sequence. Follow the light carefully—it traces a path through the area, and you must follow it precisely. Touch the light at each waypoint to progress. Successfully completing the sequence unlocks the artifact and grants any unique rewards it holds.
                </p>
              </div>

              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-2">Artifact Hunting Strategy</h3>
                <ul className="space-y-2 text-sm">
                  <li className="text-gray-300 flex items-start gap-2">
                    <ArrowRight className="w-3 h-3 text-gold-400 mt-0.5 shrink-0" />
                    Explore every region thoroughly, especially caves and cliff faces
                  </li>
                  <li className="text-gray-300 flex items-start gap-2">
                    <ArrowRight className="w-3 h-3 text-gold-400 mt-0.5 shrink-0" />
                    Use the map system to mark locations you can't reach yet
                  </li>
                  <li className="text-gray-300 flex items-start gap-2">
                    <ArrowRight className="w-3 h-3 text-gold-400 mt-0.5 shrink-0" />
                    Return to regions after learning new abilities that unlock areas
                  </li>
                  <li className="text-gray-300 flex items-start gap-2">
                    <ArrowRight className="w-3 h-3 text-gold-400 mt-0.5 shrink-0" />
                    Some artifacts are hidden behind end-game bosses
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CAMP MANAGEMENT ── */}
      {activeTab === 'camp' && (
        <div className="space-y-6">
          <div className="bg-pywel-card rounded-lg border border-pywel-border p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Tent className="w-6 h-6 text-gold-400" />
              <h2 className="text-2xl font-cinzel font-bold text-gold-400">
                Camp Management Guide
              </h2>
            </div>

            <div className="bg-pywel-bg border border-pywel-border rounded p-4">
              <h3 className="font-semibold text-gold-300 mb-2">Greymane Camp Overview</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your camp is your home base. Upgrades here unlock new crafting capabilities, farming, cooking, and more. The camp progresses alongside the story, with new facilities unlocking as you advance.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {CAMP_FACILITIES.map((facility) => (
              <div
                key={facility.name}
                className="bg-pywel-card rounded-lg border border-pywel-border p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-cinzel font-semibold text-gold-300">
                      {facility.name}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {facility.upgrades} tier upgrade
                      {facility.upgrades !== 1 ? 's' : ''} • Priority:{' '}
                      <span
                        className={
                          facility.priority === 'Very High'
                            ? 'text-red-400'
                            : facility.priority === 'High'
                              ? 'text-orange-400'
                              : facility.priority === 'Medium'
                                ? 'text-yellow-400'
                                : 'text-green-400'
                        }
                      >
                        {facility.priority}
                      </span>
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-300">{facility.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-pywel-card rounded-lg border border-pywel-border p-6 space-y-4">
            <h2 className="text-xl font-cinzel font-bold text-gold-400">
              Upgrade Priority Strategy
            </h2>
            <div className="space-y-3 text-sm">
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-1">Early Game (Chapters 1-3)</h3>
                <p className="text-gray-300">Focus on Blacksmith Forge and Kitchen first. These unlock weapon crafting and meal buffs for upcoming bosses.</p>
              </div>
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-1">Mid Game (Chapters 4-6)</h3>
                <p className="text-gray-300">Expand to Farm Plots and Livestock Ranch. Establish resource production to sustain crafting. Upgrade Kitchen to max for powerful meals.</p>
              </div>
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-1">Late Game (Chapters 7+)</h3>
                <p className="text-gray-300">Optimize remaining facilities. Dispatch Board becomes valuable for passive income. Dyehouse and Barber are purely cosmetic.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MOUNTS ── */}
      {activeTab === 'mounts' && (
        <div className="space-y-6">
          <div className="bg-pywel-card rounded-lg border border-pywel-border p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Footprints className="w-6 h-6 text-gold-400" />
              <h2 className="text-2xl font-cinzel font-bold text-gold-400">
                Mount System
              </h2>
            </div>

            <div className="bg-pywel-bg border border-pywel-border rounded p-4">
              <h3 className="font-semibold text-gold-300 mb-2">Overview</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Pywel features 29 mounts across multiple categories. Each mount has unique speed, combat power, and stamina stats. Some have special abilities. Mounts can be acquired through taming wild creatures, boss drops, quests, or crafting at the Blacksmith Forge.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOUNT_INFO.map((info) => (
              <div
                key={info.category}
                className="bg-pywel-card rounded-lg border border-pywel-border p-4"
              >
                <h3 className="text-lg font-cinzel font-semibold text-gold-300 mb-1">
                  {info.category}
                </h3>
                <p className="text-xs text-gray-400 mb-3">
                  {info.count} mount{info.count !== 1 ? 's' : ''}
                </p>
                <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                  {info.description}
                </p>
                <div className="flex justify-between text-xs">
                  <div>
                    <p className="text-gold-300 font-semibold">Strength</p>
                    <p className="text-gray-400">{info.strength}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gold-300 font-semibold">Weakness</p>
                    <p className="text-gray-400">{info.weakness}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-pywel-card rounded-lg border border-pywel-border p-6 space-y-4">
            <h2 className="text-xl font-cinzel font-bold text-gold-400">
              Taming & Combat Tips
            </h2>
            <div className="space-y-3 text-sm">
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-1">Taming Wild Mounts</h3>
                <p className="text-gray-300">Approach wild mounts slowly and calmly. Use specific items (feed, berries) to tame them. Some rare mounts require special items or high friendship levels.</p>
              </div>
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-1">Mounted Combat</h3>
                <p className="text-gray-300">Different mounts enable different combat styles. Use heavy mounts for charging, raptor mounts for kiting, and wyverns for aerial maneuvers in large encounters.</p>
              </div>
              <div className="bg-pywel-bg border border-pywel-border rounded p-4">
                <h3 className="font-semibold text-gold-300 mb-1">Mount Customization</h3>
                <p className="text-gray-300">Dye your mounts at the Dyehouse Shop. Equip saddles and armor for stat bonuses. Some saddles enable special mounted abilities.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── ADVANCED TIPS ── */}
      {activeTab === 'advanced' && (
        <div className="space-y-6">
          <div className="bg-pywel-card rounded-lg border border-pywel-border p-6">
            <p className="text-gray-400 text-sm">
              Advanced strategies for experienced players seeking to master Crimson Desert's combat and systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ADVANCED_TIPS.map((tip) => (
              <div
                key={tip.title}
                className="bg-pywel-card rounded-lg border border-pywel-border p-4"
              >
                <h3 className="text-lg font-cinzel font-semibold text-gold-300 mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {tip.content}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-pywel-card rounded-lg border border-pywel-border p-6 space-y-4">
            <h2 className="text-xl font-cinzel font-bold text-gold-400">
              Speedrun Tips
            </h2>
            <div className="space-y-2 text-sm text-gray-300">
              <p className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                Skip non-essential side quests in early chapters to reach stronger equipment faster.
              </p>
              <p className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                Prioritize Abyss Artifacts that unlock powerful skills for upcoming bosses.
              </p>
              <p className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                Upgrade camp facilities strategically; not all upgrades are necessary immediately.
              </p>
              <p className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                Learn enemy patterns early to defeat bosses without excessive healing.
              </p>
              <p className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                Switch characters mid-fight to exploit matchups against specific boss types.
              </p>
            </div>
          </div>

          <div className="bg-pywel-card rounded-lg border border-pywel-border p-6 space-y-4">
            <h2 className="text-xl font-cinzel font-bold text-gold-400">
              Legendary Difficulty Tips
            </h2>
            <div className="space-y-2 text-sm text-gray-300">
              <p className="flex items-start gap-2">
                <Flame className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                Enemies deal triple damage and have 2x HP. Every hit counts.
              </p>
              <p className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                You receive half healing from items. Prepare meals with maximum effectiveness.
              </p>
              <p className="flex items-start gap-2">
                <ZapIcon className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                Boss attacks have additional attack patterns not seen in lower difficulties.
              </p>
              <p className="flex items-start gap-2">
                <Mountain className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                Master parrying perfectly; it's your primary survival tool.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
