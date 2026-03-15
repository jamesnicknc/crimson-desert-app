import Image from 'next/image';

// ═══════════════════════════════════════
// PLAYABLE CHARACTERS
// ═══════════════════════════════════════

const CHARACTERS = [
  {
    name: 'Kliff',
    role: 'Versatile Mercenary Leader',
    description: 'Leader of the Greymanes, a mercenary faction from Pywel\'s northernmost region of Pailune. A balanced melee fighter wielding sword and shield, with a bow for ranged options. His versatility and wide weapon selection make him the ideal generalist for learning the combat system.',
    weapons: ['sword', 'shield', 'bow', 'polearm', 'greatsword', 'grapple', 'magic'],
    gradient: 'from-amber-900 to-amber-950',
    accentColor: 'border-gold-500',
    image: '/assets/kliff.webp',
    imageStyle: { objectPosition: 'center top' },
  },
  {
    name: 'Damiane',
    role: 'Glass Cannon Swashbuckler',
    description: 'A swift, agile glass cannon who combines a rapier and buckler for devastating close-quarters dueling with a flintlock pistol and musket for ranged engagements. Her mobility and dodge-chaining make her nearly untouchable, but her low HP demands precise positioning.',
    weapons: ['rapier', 'claymore', 'pistol', 'musket', 'shield', 'spells'],
    gradient: 'from-rose-900 to-rose-950',
    accentColor: 'border-gold-500',
    image: '/assets/damiane.webp',
    imageStyle: { objectPosition: 'center 20%', transform: 'scale(1.15)' },
  },
  {
    name: 'Oongka',
    role: 'AoE Brute Tank',
    description: 'A massive orc warrior clad in heavy armor, focused on high damage and sustain at the cost of agility. Wields a two-handed greataxe for devastating 360-degree spinning attacks and a war hammer with charge-up swings that send enemies flying. Built for clearing crowds.',
    weapons: ['battle-axe', 'wrist-cannon', 'two-handed', 'aoe-slams'],
    gradient: 'from-slate-900 to-slate-950',
    accentColor: 'border-gray-500',
    image: '/assets/oongka.webp',
    imageStyle: { objectPosition: 'center top' },
  },
];

// ═══════════════════════════════════════
// KEY STORY NPCs & FACTIONS
// ═══════════════════════════════════════

interface NPC {
  name: string;
  role: string;
  faction: 'greymanes' | 'black-bears' | 'independent';
  description: string;
  traits: string[];
  gradient: string;
  accentColor: string;
  image: string;
  imageStyle?: React.CSSProperties;
}

const NPCS: NPC[] = [
  {
    name: 'Yann',
    role: 'Greymane Strategist & Diplomat',
    faction: 'greymanes',
    description: 'The cunning mind behind the Greymanes\' political maneuvers. While Kliff leads on the battlefield, Yann navigates the treacherous world of court intrigue and backroom deals. His sharp intellect and silver tongue have kept the faction alive through impossible odds, brokering alliances and outmaneuvering rivals at every turn.',
    traits: ['Strategist', 'Diplomat', 'Intelligence', 'Politics'],
    gradient: 'from-emerald-900 to-emerald-950',
    accentColor: 'border-emerald-500',
    image: '/assets/yann.png',
    imageStyle: { objectPosition: 'center 20%' },
  },
  {
    name: 'Naira',
    role: 'Greymane Elite Warrior',
    faction: 'greymanes',
    description: 'A battle-hardened warrior who takes on the most dangerous missions the Greymanes face. Naira is a versatile combatant equally deadly with blade, bow, and bare fists. Her fierce loyalty to the faction is matched only by her recklessness in combat — she leads from the front and never backs down, no matter the odds.',
    traits: ['Warrior', 'Versatile', 'Fearless', 'Frontliner'],
    gradient: 'from-sky-900 to-sky-950',
    accentColor: 'border-sky-500',
    image: '/assets/naira.png',
    imageStyle: { objectPosition: 'center 15%' },
  },
  {
    name: 'Myurdin',
    role: 'Leader of the Black Bears',
    faction: 'black-bears',
    description: 'The ruthless mastermind who orchestrated the devastating ambush that shattered the Greymanes. As leader of the Black Bears, Myurdin commands an army of fanatical loyalists and controls territory across multiple regions. His ultimate goal is the complete unification of Pywel under his iron rule — and he will crush anyone who stands in his way.',
    traits: ['Main Antagonist', 'Warlord', 'Strategist', 'Conqueror'],
    gradient: 'from-red-950 to-stone-950',
    accentColor: 'border-red-700',
    image: '/assets/myurdin.png',
    imageStyle: { objectPosition: 'center 15%' },
  },
  {
    name: 'Hexe Marie',
    role: 'Monster Summoner & Sorceress',
    faction: 'independent',
    description: 'A terrifying figure shrouded in mystery, Hexe Marie wields forbidden Abyss magic to summon and control monstrous creatures. She is a major story antagonist whose motives remain unclear — some say she seeks to tear open the Abyss itself. Her power to command beasts makes her one of the most dangerous beings in Pywel.',
    traits: ['Major Antagonist', 'Summoner', 'Abyss Magic', 'Boss Fight'],
    gradient: 'from-purple-950 to-violet-950',
    accentColor: 'border-purple-600',
    image: '/assets/hexe-marie.png',
    imageStyle: { objectPosition: 'center 20%' },
  },
  {
    name: 'The Black Bears',
    role: 'Enemy Faction',
    faction: 'black-bears',
    description: 'The sworn enemies of the Greymanes and the central antagonistic force in Crimson Desert. Led by the ruthless Myurdin, the Black Bears are a well-organized military faction that seeks total domination of Pywel. They launched the devastating surprise attack that scattered the Greymanes, setting the events of the entire story into motion.',
    traits: ['Enemy Faction', 'Military Force', 'Main Threat', 'Multi-Region'],
    gradient: 'from-stone-900 to-stone-950',
    accentColor: 'border-stone-500',
    image: '/assets/black-bears.png',
    imageStyle: { objectPosition: 'center 30%' },
  },
];

export default function CharactersPage() {
  const getWeaponTags = (character: string, weaponNames: string[]): string[] => {
    const weaponMap: Record<string, string> = {
      'sword': 'Iron Longsword',
      'shield': 'Greymane Shield',
      'bow': 'Hunter\'s Bow',
      'polearm': 'War Polearm',
      'greatsword': 'Steel Greatsword',
      'grapple': 'Grapples',
      'magic': 'Abyss Magic',
      'rapier': 'Elegant Rapier',
      'claymore': 'Damiane\'s Claymore',
      'pistol': 'Dueling Pistol',
      'musket': 'Sharpshooter Musket',
      'spells': 'Abyss Spells',
      'battle-axe': 'Oongka\'s Greataxe',
      'wrist-cannon': 'Wrist Cannon',
      'two-handed': 'Two-Handed',
      'aoe-slams': 'AoE Slams',
    };
    return weaponNames.map(w => weaponMap[w] || w);
  };

  const getFactionBadge = (faction: NPC['faction']) => {
    const config = {
      'greymanes': { label: 'Greymanes', className: 'bg-amber-600/20 border-amber-600/50 text-amber-300' },
      'black-bears': { label: 'Black Bears', className: 'bg-red-600/20 border-red-600/50 text-red-300' },
      'independent': { label: 'Independent', className: 'bg-purple-600/20 border-purple-600/50 text-purple-300' },
    };
    const { label, className } = config[faction];
    return (
      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${className}`}>
        {label}
      </span>
    );
  };

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Character Profiles</h1>
        <p className="text-gray-400">Meet the heroes, villains, and key figures shaping the fate of Pywel.</p>
      </div>

      {/* ═══ PLAYABLE CHARACTERS ═══ */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-cinzel font-bold text-gold-400">Playable Characters</h2>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold-600 text-black uppercase tracking-wider">
            Playable
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHARACTERS.map(char => (
            <div
              key={char.name}
              className={`bg-gradient-to-br ${char.gradient} rounded-lg overflow-hidden border-2 ${char.accentColor} shadow-lg transition hover:shadow-xl hover:shadow-gold-500/20`}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={char.image}
                  alt={char.name}
                  fill
                  className="object-cover"
                  style={char.imageStyle}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h2 className="text-2xl font-cinzel font-bold text-gold-300 drop-shadow-lg">{char.name}</h2>
                  <p className="text-sm text-gold-300 italic drop-shadow">{char.role}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-gray-200 text-sm leading-relaxed">
                  {char.description}
                </p>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Weapons & Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {getWeaponTags(char.name.toLowerCase(), char.weapons).map(weapon => (
                      <span
                        key={weapon}
                        className="inline-block bg-pywel-card border border-gold-600/50 text-gold-300 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {weapon}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ KEY STORY NPCs & FACTIONS ═══ */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-cinzel font-bold text-gold-400">Key NPCs & Factions</h2>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-600 text-gray-200 uppercase tracking-wider">
            Story
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {NPCS.map(npc => (
            <div
              key={npc.name}
              className={`bg-gradient-to-br ${npc.gradient} rounded-lg overflow-hidden border-2 ${npc.accentColor} shadow-lg transition hover:shadow-xl hover:shadow-gold-500/10`}
            >
              {/* NPC Portrait Header */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={npc.image}
                  alt={npc.name}
                  fill
                  className="object-cover"
                  style={npc.imageStyle}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4 z-10">
                  <h3 className="text-xl font-cinzel font-bold text-gold-300 drop-shadow-lg">{npc.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-gray-300 italic drop-shadow">{npc.role}</p>
                  </div>
                </div>
              </div>

              {/* NPC Content */}
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  {getFactionBadge(npc.faction)}
                </div>

                <p className="text-gray-200 text-sm leading-relaxed">
                  {npc.description}
                </p>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Key Traits</p>
                  <div className="flex flex-wrap gap-2">
                    {npc.traits.map(trait => (
                      <span
                        key={trait}
                        className="inline-block bg-pywel-card border border-pywel-border text-gray-300 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
