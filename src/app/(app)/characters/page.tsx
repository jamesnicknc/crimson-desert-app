import Image from 'next/image';

// ═══════════════════════════════════════
// PLAYABLE CHARACTERS
// ═══════════════════════════════════════

const CHARACTERS = [
  {
    name: 'Kliff',
    role: 'Versatile Mercenary Leader',
    description: 'Leader of the Greymanes, a mercenary company from the northern highlands of Pailune. A balanced melee fighter at home with sword and shield, a war bow, and a growing arsenal of Abyss-touched abilities unlocked through his journey. His strength lies in adaptability — no situation demands a tool he cannot wield.',
    weapons: ['sword', 'shield', 'bow', 'polearm', 'greatsword', 'grapple', 'magic'],
    gradient: 'from-amber-900 to-amber-950',
    accentColor: 'border-gold-500',
    image: '/assets/kliff.webp',
    imageStyle: { objectPosition: 'center top' },
  },
  {
    name: 'Damiane',
    role: 'Glass Cannon Swashbuckler',
    description: 'A duelist who turns speed into a weapon. Damiane pairs a rapier and buckler for devastating close-range exchanges with a flintlock pistol and musket for ranged harassment, weaving between attacks with chained dodges that make her nearly impossible to pin down. Her low HP demands perfect spacing — one mistimed engagement can be fatal.',
    weapons: ['rapier', 'claymore', 'pistol', 'musket', 'shield', 'spells'],
    gradient: 'from-rose-900 to-rose-950',
    accentColor: 'border-gold-500',
    image: '/assets/damiane.webp',
    imageStyle: { objectPosition: 'center 20%', transform: 'scale(1.15)' },
  },
  {
    name: 'Oongka',
    role: 'AoE Brute Tank',
    description: 'A towering orc warrior who trades agility for devastation. Oongka wields a two-handed greataxe for spinning crowd-clearing strikes and a war hammer with charge-up slams that send enemies airborne. His heavy armor and high sustain let him absorb punishment that would drop any other fighter — built for the thick of it.',
    weapons: ['battle-axe', 'wrist-cannon', 'two-handed', 'aoe-slams'],
    gradient: 'from-slate-900 to-slate-950',
    accentColor: 'border-gray-500',
    image: '/assets/oongka.webp',
    imageStyle: { objectPosition: 'center top' },
  },
];

// ═══════════════════════════════════════
// KEY NPCs
// ═══════════════════════════════════════

interface NPC {
  name: string;
  role: string;
  faction: 'greymanes' | 'black-bears' | 'gold-leaves' | 'abyss' | 'independent';
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
    description: 'The political mind behind the Greymanes\' survival. While Kliff leads from the front, Yann operates in the shadows of court intrigue — brokering alliances, reading the motives of noble houses, and keeping the faction one step ahead of its enemies. His silver tongue has won battles that no sword could.',
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
    description: 'The Greymanes\' most dangerous fighter in the field. Naira is equally lethal with a blade, a bow, or her bare hands, and she takes on the missions no one else can be trusted to complete. Her loyalty to the faction is absolute, matched only by her habit of charging straight into trouble without looking back.',
    traits: ['Warrior', 'Versatile', 'Fearless', 'Frontliner'],
    gradient: 'from-sky-900 to-sky-950',
    accentColor: 'border-sky-500',
    image: '/assets/naira.png',
    imageStyle: { objectPosition: 'center 15%' },
  },
  {
    name: 'Marius',
    role: 'Greymane Scout',
    faction: 'greymanes',
    description: 'One of the first Greymane survivors Kliff locates after the Black Bear ambush, found wounded in Hernand with a leg injury. Despite his condition, Marius holds critical intelligence — he knows where Naira, Yann, and other scattered comrades were last seen, making him the first thread in Kliff\'s effort to reassemble the company.',
    traits: ['Scout', 'Survivor', 'Intel Source', 'Early Ally'],
    gradient: 'from-teal-900 to-teal-950',
    accentColor: 'border-teal-500',
    image: '/assets/marius.png',
    imageStyle: { objectPosition: 'center top' },
  },
  {
    name: 'Russo',
    role: 'Greymane Field Operative',
    faction: 'greymanes',
    description: 'A Greymane who refused to go to ground after the ambush. Russo carried the wounded Marius to safety in Hernand before turning his full attention to hunting Abyss Artifacts — the strange objects that fell from the sky alongside the attack and that the Greymanes now believe are tied to something much larger than a simple ambush.',
    traits: ['Field Operative', 'Artifact Hunter', 'Resilient', 'Resourceful'],
    gradient: 'from-cyan-900 to-cyan-950',
    accentColor: 'border-cyan-500',
    image: '/assets/russo.png',
    imageStyle: { objectPosition: 'center top' },
  },
  {
    name: 'Bon Midler',
    role: 'Hernand Peacekeeper',
    faction: 'independent',
    description: 'The man responsible for keeping order in Hernand, and one of the first local officials Kliff works with after arriving in the region. Bon Midler sets Kliff on the trail of the Red Smoke brigands who followed a sky boulder into town, giving him his first real foothold in understanding the strange events unfolding across Pywel.',
    traits: ['Quest Giver', 'Law Enforcement', 'Hernand Official', 'Early Contact'],
    gradient: 'from-yellow-900 to-yellow-950',
    accentColor: 'border-yellow-600',
    image: '/assets/bon-midler.png',
    imageStyle: { objectPosition: 'center top' },
  },
  {
    name: 'Shakatu',
    role: 'Merchant & Gold Leaves Branch Master',
    faction: 'gold-leaves',
    description: 'A merchant of considerable reputation crossing over from the world of Black Desert. After Kliff defeats Split Horn in a goblin duel, Shakatu steps in as the new Branch Master of the Gold Leaves guild and pivots its network toward a new purpose — helping the Greymanes track down their scattered comrades across Pywel.',
    traits: ['Merchant', 'Branch Master', 'Black Desert Crossover', 'Ally'],
    gradient: 'from-orange-900 to-orange-950',
    accentColor: 'border-orange-500',
    image: '/assets/shakatu.png',
    imageStyle: { objectPosition: 'center top' },
  },
  {
    name: 'Ronie',
    role: 'Greymane Camp Food Vendor',
    faction: 'greymanes',
    description: 'Runs the Food Shop at the Greymane base camp, keeping the company fed between missions. A steadying presence at camp who knows everyone\'s orders and rarely needs to be asked twice. Details about her background remain to be confirmed at launch.',
    traits: ['Camp Vendor', 'Food Shop', 'Base Camp', 'Support NPC'],
    gradient: 'from-lime-900 to-lime-950',
    accentColor: 'border-lime-600',
    image: '/assets/ronie.png',
    imageStyle: { objectPosition: 'center top' },
  },
  {
    name: 'Aliston',
    role: 'Overseer of the Library of Providence',
    faction: 'abyss',
    description: 'A keeper of ancient knowledge within the Library of Providence, deep inside The Abyss. Aliston describes the Abyss as "the center of all worlds" and tasks Kliff with closing the Rifts that threaten to unravel Providence itself — a mission that connects directly to the last known wishes of the Greymane founder, Gian. Note: some sources give this name as "Alustin." Confirmed at launch.',
    traits: ['Librarian', 'Abyss Scholar', 'Quest Giver', 'Providence'],
    gradient: 'from-violet-900 to-violet-950',
    accentColor: 'border-violet-500',
    image: '/assets/aliston.png',
    imageStyle: { objectPosition: 'center top' },
  },
  {
    name: 'White Crow',
    role: 'Guardian of the Abyss',
    faction: 'abyss',
    description: 'A powerful and enigmatic figure who stands watch over The Abyss and acts as a living bridge between Providence and the mortal world. White Crow is the one who introduces Kliff to the dimension\'s aerial traversal, teaching him to fly with the words: "Have you ever imagined flying?" The nature and origin of this guardian remain deliberately unexplained.',
    traits: ['Guardian', 'Abyss Entity', 'Flying Ability Unlock', 'Mysterious'],
    gradient: 'from-slate-800 to-slate-950',
    accentColor: 'border-slate-400',
    image: '/assets/coming-soon.png',
    imageStyle: { objectPosition: 'center top' },
  },
  {
    name: 'Myurdin',
    role: 'Leader of the Black Bears',
    faction: 'black-bears',
    description: 'The architect of the ambush that scattered the Greymanes and the primary antagonist driving the events of Crimson Desert. Myurdin commands a disciplined, multi-region military force with one goal — total control of Pywel. Ruthless and patient, he is not simply a warlord but a conqueror with a vision, making him far more dangerous than any of his lieutenants.',
    traits: ['Main Antagonist', 'Warlord', 'Strategist', 'Conqueror'],
    gradient: 'from-red-950 to-stone-950',
    accentColor: 'border-red-700',
    image: '/assets/myurdin.png',
    imageStyle: { objectPosition: 'center 15%' },
  },
  {
    name: 'Hexe Marie',
    role: 'Sorceress & Monster Summoner',
    faction: 'independent',
    description: 'A figure whose origins are as dark as her methods. Hexe Marie commands forbidden Abyss magic to summon and direct monstrous creatures, and stands as one of the most powerful and unpredictable forces in Pywel. Her motives are her own and she answers to no faction — which makes her infinitely harder to anticipate than any straightforward enemy.',
    traits: ['Major Antagonist', 'Summoner', 'Abyss Magic', 'Boss Fight'],
    gradient: 'from-purple-950 to-violet-950',
    accentColor: 'border-purple-600',
    image: '/assets/hexe-marie.png',
    imageStyle: { objectPosition: 'center 20%' },
  },
];

// ═══════════════════════════════════════
// FACTIONS
// ═══════════════════════════════════════

interface Faction {
  name: string;
  type: string;
  alignment: 'ally' | 'enemy' | 'neutral';
  description: string;
  traits: string[];
  gradient: string;
  accentColor: string;
  image: string;
  imageStyle?: React.CSSProperties;
}

const FACTIONS: Faction[] = [
  {
    name: 'The Greymanes',
    type: 'Mercenary Company',
    alignment: 'ally',
    description: 'Kliff\'s company and the player\'s faction. The Greymanes are a battle-tested mercenary outfit from the highlands of Pailune, built on loyalty and hard-won reputation under the founding leadership of Gian. The opening Black Bear ambush scatters them across Pywel, and reassembling the company is the spine of the entire game.',
    traits: ['Player Faction', 'Mercenary Company', 'Pailune', 'Loyalty'],
    gradient: 'from-amber-900 to-amber-950',
    accentColor: 'border-amber-500',
    image: '/assets/coming-soon.png',
    imageStyle: { objectPosition: 'center top' },
  },
  {
    name: 'The Black Bears',
    type: 'Military Faction',
    alignment: 'enemy',
    description: 'The primary antagonist force in Crimson Desert. Led by Myurdin, the Black Bears are a well-organized military faction that has seized territory across multiple regions of Pywel. The devastating surprise attack they launched against the Greymanes sets the entire story in motion, and dismantling their grip on the continent is the game\'s central objective.',
    traits: ['Main Enemy', 'Military Force', 'Multi-Region', 'Organized Army'],
    gradient: 'from-stone-900 to-stone-950',
    accentColor: 'border-stone-500',
    image: '/assets/black-bears.png',
    imageStyle: { objectPosition: 'center 30%' },
  },
  {
    name: 'Gold Leaves',
    type: 'Goblin Guild',
    alignment: 'neutral',
    description: 'A goblin merchant and information network based in Hernand, originally ruled by Branch Master Split Horn with an iron fist. After Kliff defeats Split Horn in a formal goblin duel, the merchant Shakatu takes leadership and realigns the guild\'s considerable network toward helping the Greymanes locate their scattered comrades.',
    traits: ['Goblin Guild', 'Merchant Network', 'Hernand', 'Reclaimable Ally'],
    gradient: 'from-yellow-900 to-yellow-950',
    accentColor: 'border-yellow-500',
    image: '/assets/coming-soon.png',
    imageStyle: { objectPosition: 'center top' },
  },
  {
    name: 'House Celeste',
    type: 'Noble House',
    alignment: 'neutral',
    description: 'One of the noble houses of Hernand, whose holdings include the Roothold stronghold. House Celeste\'s territory has been seized by the minor warlord Gwen Kraber and his soldiers. Kliff\'s liberation of Roothold returns control to the house, establishing a potential alliance among Hernand\'s landed nobility.',
    traits: ['Noble House', 'Hernand', 'Roothold', 'Political Ally'],
    gradient: 'from-indigo-900 to-indigo-950',
    accentColor: 'border-indigo-400',
    image: '/assets/coming-soon.png',
    imageStyle: { objectPosition: 'center top' },
  },
  {
    name: 'House Lanford',
    type: 'Noble House',
    alignment: 'neutral',
    description: 'The ruling house of Calphade, led by Marquis Stefan Lanford. Once a seat of order in a war-torn territory, House Lanford was destabilized when its own officer Cassius Morten defected to the Black Bears, turning his loyalty and his knowledge of Calphade\'s defenses against his former lord. The Marquis\'s standing in the aftermath is unclear until launch.',
    traits: ['Noble House', 'Calphade', 'Marquis Stefan Lanford', 'Betrayed'],
    gradient: 'from-zinc-900 to-zinc-950',
    accentColor: 'border-zinc-400',
    image: '/assets/coming-soon.png',
    imageStyle: { objectPosition: 'center top' },
  },
];

export default function CharactersPage() {
  const getWeaponTags = (_character: string, weaponNames: string[]): string[] => {
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
    const config: Record<NPC['faction'], { label: string; className: string }> = {
      'greymanes':  { label: 'Greymanes',   className: 'bg-amber-600/20 border-amber-600/50 text-amber-300' },
      'black-bears':{ label: 'Black Bears', className: 'bg-red-600/20 border-red-600/50 text-red-300' },
      'gold-leaves':{ label: 'Gold Leaves', className: 'bg-yellow-600/20 border-yellow-600/50 text-yellow-300' },
      'abyss':      { label: 'The Abyss',   className: 'bg-violet-600/20 border-violet-600/50 text-violet-300' },
      'independent':{ label: 'Independent', className: 'bg-gray-600/20 border-gray-600/50 text-gray-300' },
    };
    const { label, className } = config[faction];
    return (
      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${className}`}>
        {label}
      </span>
    );
  };

  const getAlignmentBadge = (alignment: Faction['alignment']) => {
    const config: Record<Faction['alignment'], { label: string; className: string }> = {
      'ally':    { label: 'Allied',  className: 'bg-emerald-600/20 border-emerald-600/50 text-emerald-300' },
      'enemy':   { label: 'Enemy',   className: 'bg-red-600/20 border-red-600/50 text-red-300' },
      'neutral': { label: 'Neutral', className: 'bg-gray-600/20 border-gray-600/50 text-gray-300' },
    };
    const { label, className } = config[alignment];
    return (
      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${className}`}>
        {label}
      </span>
    );
  };

  return (
    <div className="space-y-12">

      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Characters & Factions</h1>
        <p className="text-gray-400">The heroes, villains, allies, and powers shaping the fate of Pywel.</p>
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

      {/* ═══ KEY NPCs ═══ */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-cinzel font-bold text-gold-400">Key NPCs</h2>
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
                  <p className="text-xs text-gray-300 italic drop-shadow mt-0.5">{npc.role}</p>
                </div>
              </div>

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

      {/* ═══ FACTIONS ═══ */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-cinzel font-bold text-gold-400">Factions</h2>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-600 text-gray-200 uppercase tracking-wider">
            Powers of Pywel
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FACTIONS.map(faction => (
            <div
              key={faction.name}
              className={`bg-gradient-to-br ${faction.gradient} rounded-lg overflow-hidden border-2 ${faction.accentColor} shadow-lg transition hover:shadow-xl hover:shadow-gold-500/10`}
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={faction.image}
                  alt={faction.name}
                  fill
                  className="object-cover"
                  style={faction.imageStyle}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4 z-10">
                  <h3 className="text-xl font-cinzel font-bold text-gold-300 drop-shadow-lg">{faction.name}</h3>
                  <p className="text-xs text-gray-300 italic drop-shadow mt-0.5">{faction.type}</p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  {getAlignmentBadge(faction.alignment)}
                </div>

                <p className="text-gray-200 text-sm leading-relaxed">
                  {faction.description}
                </p>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Key Traits</p>
                  <div className="flex flex-wrap gap-2">
                    {faction.traits.map(trait => (
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
