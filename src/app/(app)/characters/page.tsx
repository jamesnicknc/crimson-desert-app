import Image from 'next/image';

const CHARACTERS = [
  {
    name: 'Kliff',
    role: 'Versatile Mercenary Leader',
    description: 'Leader of the Greymanes, a mercenary faction from Pywel\'s northernmost region of Pailune. A balanced melee fighter wielding sword and shield, with a bow for ranged options. His versatility and wide weapon selection make him the ideal generalist for learning the combat system.',
    weapons: ['sword', 'shield', 'bow', 'polearm', 'greatsword', 'grapple', 'magic'],
    gradient: 'from-amber-900 to-amber-950',
    accentColor: 'border-gold-500',
    image: '/assets/kliff.webp',
  },
  {
    name: 'Damiane',
    role: 'Glass Cannon Swashbuckler',
    description: 'A swift, agile glass cannon who combines a rapier and buckler for devastating close-quarters dueling with a flintlock pistol and musket for ranged engagements. Her mobility and dodge-chaining make her nearly untouchable, but her low HP demands precise positioning.',
    weapons: ['rapier', 'claymore', 'pistol', 'musket', 'shield', 'spells'],
    gradient: 'from-rose-900 to-rose-950',
    accentColor: 'border-gold-500',
    image: '/assets/damiane.webp',
  },
  {
    name: 'Oongka',
    role: 'AoE Brute Tank',
    description: 'A massive orc warrior clad in heavy armor, focused on high damage and sustain at the cost of agility. Wields a two-handed greataxe for devastating 360-degree spinning attacks and a war hammer with charge-up swings that send enemies flying. Built for clearing crowds.',
    weapons: ['battle-axe', 'wrist-cannon', 'two-handed', 'aoe-slams'],
    gradient: 'from-slate-900 to-slate-950',
    accentColor: 'border-gray-500',
    image: '/assets/oongka.webp',
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Character Profiles</h1>
        <p className="text-gray-400">Meet the heroes of Pywel. Each brings unique skills and perspectives to your adventure.</p>
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
                className="object-cover object-top"
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
    </div>
  );
}
