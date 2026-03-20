export type MarkerCategory = 'town' | 'dungeon' | 'boss' | 'poi' | 'fast-travel';

export interface MapMarker {
  id: string;
  name: string;
  category: MarkerCategory;
  region: string;
  coords: [number, number]; // [lat, lng] in Leaflet CRS.Simple (lat increases upward, 0=south, 1000=north)
  description?: string;
  difficulty?: string;
}

export interface MapRegionLabel {
  id: string;
  name: string;
  color: string;
  coords: [number, number];
}

export const CATEGORY_CONFIG: Record<MarkerCategory, {
  label: string;
  color: string;
  letter: string;
}> = {
  town:          { label: 'Towns',              color: '#f5c842', letter: 'T' },
  dungeon:       { label: 'Dungeons',           color: '#9b5fe0', letter: 'D' },
  boss:          { label: 'Boss Locations',     color: '#e05f5f', letter: 'B' },
  poi:           { label: 'Points of Interest', color: '#5fc8e0', letter: 'P' },
  'fast-travel': { label: 'Fast Travel',        color: '#5fe0a0', letter: 'F' },
};

// Region labels overlaid on the map
// Coordinates: lat increases upward (0=south, 1000=north), lng increases right (0=west, 1000=east)
export const REGION_LABELS: MapRegionLabel[] = [
  { id: 'hernand',  name: 'Hernand',        color: '#7ec87a', coords: [620, 195] },
  { id: 'pailune',  name: 'Pailune',        color: '#a8d8ff', coords: [870, 410] },
  { id: 'demeniss', name: 'Demeniss',       color: '#d4a847', coords: [510, 510] },
  { id: 'delesyia', name: 'Delesyia',       color: '#c87ae0', coords: [445, 770] },
  { id: 'desert',   name: 'Crimson Desert', color: '#e07a5f', coords: [225, 355] },
];

export const MAP_MARKERS: MapMarker[] = [
  // ─── TOWNS ────────────────────────────────────────────────────────────────
  {
    id: 'city-hernand',
    name: 'City of Hernand',
    category: 'town', region: 'hernand',
    coords: [618, 205],
    description: 'The grand capital of the Hernand region — a sprawling medieval city and heart of the kingdom.',
  },
  {
    id: 'calphade',
    name: 'Calphade',
    category: 'town', region: 'hernand',
    coords: [572, 135],
    description: 'A fortified city in southern Hernand with Calphade Castle and the Church of Calphade in nearby Thalwynd Village.',
  },
  {
    id: 'pailune-town',
    name: 'Pailune Town',
    category: 'town', region: 'pailune',
    coords: [840, 372],
    description: 'The primary settlement in the frozen northern reaches of Pailune.',
  },
  {
    id: 'demeniss-town',
    name: 'Demeniss Town',
    category: 'town', region: 'demeniss',
    coords: [488, 522],
    description: 'The capital settlement of Demeniss and seat of political power contested between House Thorel and House Byron.',
  },
  {
    id: 'tariv',
    name: 'Tariv',
    category: 'town', region: 'demeniss',
    coords: [532, 452],
    description: 'A secretive village of sorcerers and alchemists tucked in the Demeniss region.',
  },
  {
    id: 'dewhaven',
    name: 'Dewhaven',
    category: 'town', region: 'delesyia',
    coords: [412, 792],
    description: 'A coastal research hub in Delesyia with a fortified Keep and prestigious research institute.',
  },
  {
    id: 'tommaso',
    name: 'Tommaso',
    category: 'town', region: 'desert',
    coords: [215, 382],
    description: 'The largest town in the Tashkalp subregion of the Crimson Desert, surrounded by three Abyss Nexus portals.',
  },
  {
    id: 'varnia',
    name: 'Varnia',
    category: 'town', region: 'desert',
    coords: [188, 272],
    description: 'A frontier trading post on the western edge of the lawless Crimson Desert.',
  },
  {
    id: 'urdavah',
    name: 'Urdavah',
    category: 'town', region: 'desert',
    coords: [248, 432],
    description: 'A desert settlement hosting its own independent research institute.',
  },

  // ─── DUNGEONS ─────────────────────────────────────────────────────────────
  {
    id: 'whispering-caves',
    name: 'Whispering Caves',
    category: 'dungeon', region: 'hernand',
    coords: [692, 148],
    description: 'A hidden dungeon in the eastern Hernand Forest, behind the largest bandit camp. Contains Mercenary Armor and Ancient Pywelian Coins.',
  },
  {
    id: 'sunken-citadel',
    name: 'Sunken Citadel',
    category: 'dungeon', region: 'desert',
    coords: [292, 288],
    description: 'Entered via a massive desert sinkhole at the southern border. Home to venomous scorpions and the Desert Viper dual-wield axes.',
  },
  {
    id: 'royal-catacombs',
    name: 'Royal Catacombs',
    category: 'dungeon', region: 'demeniss',
    coords: [438, 542],
    description: 'Ancient burial crypts beneath Demeniss, heavily guarded by the restless dead.',
  },
  {
    id: 'frosthold-pass',
    name: 'Frosthold Pass',
    category: 'dungeon', region: 'demeniss',
    coords: [518, 508],
    description: 'A former criminal labor camp repurposed as a treacherous dungeon in northern Demeniss.',
  },
  {
    id: 'final-depth',
    name: 'Final Depth',
    category: 'dungeon', region: 'abyss',
    coords: [308, 958],
    description: 'The deepest point in the Abyss dimension. Only the most powerful adventurers survive.',
  },
  {
    id: 'bonepit-arena',
    name: 'Bonepit Arena',
    category: 'dungeon', region: 'desert',
    coords: [272, 328],
    description: 'A brutal gladiatorial arena carved into Crimson Desert rock where warriors prove their worth.',
  },
  {
    id: 'kweiden-ruins',
    name: 'Kweiden Ancient Ruins',
    category: 'dungeon', region: 'hernand',
    coords: [652, 318],
    description: 'Crumbling ruins in Hernand containing a hidden Cultist Sanctuary behind a breakable illusion wall.',
  },

  // ─── BOSSES ───────────────────────────────────────────────────────────────
  {
    id: 'matthias',
    name: 'Matthias',
    category: 'boss', region: 'hernand',
    coords: [615, 208],
    description: 'An early-game boss encountered in Hernand Square. Tests players on the fundamentals of Crimson Desert combat.',
    difficulty: 'Hard',
  },
  {
    id: 'kailok',
    name: 'Kailok the Hornsplitter',
    category: 'boss', region: 'hernand',
    coords: [632, 248],
    description: 'Ferocious guardian of the Goldleaf Guildhouse, known for devastating charge attacks.',
    difficulty: 'Hard',
  },
  {
    id: 'tenebrum',
    name: 'Tenebrum',
    category: 'boss', region: 'hernand',
    coords: [586, 176],
    description: 'A shadowy entity that has consumed the Scholastone Institute. Master of dark magic.',
    difficulty: 'Extreme',
  },
  {
    id: 'kearush',
    name: 'Kearush the Slayer',
    category: 'boss', region: 'hernand',
    coords: [665, 278],
    description: 'The terrifying gatekeeper of Hernand Castle — a knight of immense strength and brutality.',
    difficulty: 'Legendary',
  },
  {
    id: 'cassius-morten',
    name: 'Cassius Morten',
    category: 'boss', region: 'hernand',
    coords: [555, 132],
    description: 'A powerful warlord entrenched in the city of Calphade, commanding an iron-fisted army.',
    difficulty: 'Hard',
  },
  {
    id: 'queen-stoneback-crab',
    name: 'Queen Stoneback Crab',
    category: 'boss', region: 'hernand',
    coords: [702, 258],
    description: 'A colossal crustacean lurking in the coastal waters near Hernand.',
    difficulty: 'Hard',
  },
  {
    id: 'reed-devil',
    name: 'Reed Devil',
    category: 'boss', region: 'pailune',
    coords: [852, 418],
    description: 'A monstrous beast haunting the Mountain of Frozen Souls in the harsh Pailune tundra.',
    difficulty: 'Extreme',
  },
  {
    id: 'snow-walker',
    name: 'Snow Walker',
    category: 'boss', region: 'pailune',
    coords: [905, 385],
    description: 'A massive creature that prowls the frozen wastes of northern Pailune.',
    difficulty: 'Hard',
  },
  {
    id: 'skull-knight',
    name: 'Skull Knight',
    category: 'boss', region: 'demeniss',
    coords: [446, 558],
    description: 'An undead knight of immense power guarding the Eye of Ice region in Demeniss.',
    difficulty: 'Extreme',
  },
  {
    id: 'hexe-marie',
    name: 'Hexe Marie',
    category: 'boss', region: 'demeniss',
    coords: [372, 478],
    description: 'A supremely powerful witch residing in the Hexe Sanctuary on the border of the Abyss.',
    difficulty: 'Legendary',
  },
  {
    id: 'golden-star',
    name: 'Golden Star',
    category: 'boss', region: 'delesyia',
    coords: [382, 828],
    description: 'A breathtaking mechanical dragon constructed by the genius scientists of Delesyia.',
    difficulty: 'Legendary',
  },
  {
    id: 'walter-lanford',
    name: 'Walter Lanford',
    category: 'boss', region: 'desert',
    coords: [218, 398],
    description: 'A ruthless desert warlord who commands the criminal underworld of the Crimson Desert.',
    difficulty: 'Hard',
  },
  {
    id: 'crimson-scorpion-king',
    name: 'Crimson Scorpion King',
    category: 'boss', region: 'desert',
    coords: [185, 425],
    description: 'The monstrous emperor of the desert scorpions, ruler over the Crimson Desert sands.',
    difficulty: 'Extreme',
  },
  {
    id: 'crowcaller',
    name: 'Crowcaller',
    category: 'boss', region: 'abyss',
    coords: [328, 958],
    description: "Twisted master of Crow's Nest deep in the Abyss. Commands an endless tide of ravens.",
    difficulty: 'Legendary',
  },

  // ─── POINTS OF INTEREST ───────────────────────────────────────────────────
  {
    id: 'hernand-castle',
    name: 'Hernand Castle',
    category: 'poi', region: 'hernand',
    coords: [682, 292],
    description: 'The majestic fortress at the heart of Hernand. Central hub for main story quests and political intrigue.',
  },
  {
    id: 'demeniss-castle',
    name: 'Demeniss Castle',
    category: 'poi', region: 'demeniss',
    coords: [505, 488],
    description: 'Grand royal castle of Demeniss, contested by powerful noble factions.',
  },
  {
    id: 'scholastone',
    name: 'Scholastone Institute',
    category: 'poi', region: 'hernand',
    coords: [595, 175],
    description: 'A prestigious academic institution and center of magical research in Hernand.',
  },
  {
    id: 'marni-masterium',
    name: "Marni's Masterium",
    category: 'poi', region: 'delesyia',
    coords: [428, 728],
    description: "The incredible workshop of the inventor Marni — packed with mechanical automata and technological wonders.",
  },
  {
    id: 'tesla-ruins',
    name: 'Tesla Ruins',
    category: 'poi', region: 'delesyia',
    coords: [402, 748],
    description: 'Ancient ruins hinting at a long-lost mechanical civilization that once dominated Delesyia.',
  },
  {
    id: 'dragon-ridge',
    name: 'Dragon Ridge',
    category: 'poi', region: 'pailune',
    coords: [862, 448],
    description: 'A dramatic mountain ridge in Pailune where dragons are known to nest and hunt.',
  },
  {
    id: 'brimstone-lake',
    name: 'Brimstone Lake',
    category: 'poi', region: 'demeniss',
    coords: [485, 475],
    description: 'A volatile volcanic lake in Demeniss, site of the Brimstone Springs geothermal area.',
  },
  {
    id: 'pailune-archives',
    name: 'Pailune Archives',
    category: 'poi', region: 'pailune',
    coords: [855, 365],
    description: 'Ancient archives preserving centuries of Pailune history and arcane lore.',
  },
  {
    id: 'karin-quarry',
    name: 'Karin Quarry',
    category: 'poi', region: 'hernand',
    coords: [628, 315],
    description: 'A sprawling mining operation in Hernand rich in rare minerals and precious ores.',
  },
  {
    id: 'goldleaf-guildhouse',
    name: 'Goldleaf Guildhouse',
    category: 'poi', region: 'hernand',
    coords: [640, 242],
    description: 'Grand headquarters of the powerful and influential Goldleaf Merchant Guild.',
  },
  {
    id: 'buried-temple',
    name: 'Buried Temple',
    category: 'poi', region: 'desert',
    coords: [265, 355],
    description: 'An ancient temple half-swallowed by desert sands, rumored to hold forgotten divine relics.',
  },
  {
    id: 'greymane-camp',
    name: 'Greymane Camp',
    category: 'poi', region: 'hernand',
    coords: [645, 252],
    description: 'The encampment of the fearsome Greymane wolf clan on the cursed Howling Hill.',
  },
  {
    id: 'sky-tower',
    name: 'Sky Tower',
    category: 'poi', region: 'delesyia',
    coords: [442, 678],
    description: 'A monumental spire in Delesyia reaching into the clouds — a marvel of mechanical engineering.',
  },
  {
    id: 'spire-clockwork',
    name: 'Spire of Clockwork',
    category: 'poi', region: 'delesyia',
    coords: [468, 878],
    description: 'The towering Spire of Clockwork at the far eastern edge of the Pywel continent.',
  },
  {
    id: 'icemoor-ruins',
    name: 'Icemoor Castle Ruins',
    category: 'poi', region: 'pailune',
    coords: [805, 355],
    description: 'The crumbled remnants of Icemoor Castle — site of legendary battles in Pailune history.',
  },
  {
    id: 'weeping-rocks',
    name: 'Weeping Rocks',
    category: 'poi', region: 'demeniss',
    coords: [565, 435],
    description: 'Ancient ruins in northwestern Demeniss surrounding the mysterious Wailing Rock formation.',
  },
  {
    id: 'fort-perwin',
    name: 'Fort Perwin',
    category: 'poi', region: 'hernand',
    coords: [608, 138],
    description: 'A military fortress on the western edge of Hernand, guarding the coastal approaches.',
  },
  {
    id: 'spire-of-sun',
    name: 'Spire of the Sun',
    category: 'poi', region: 'desert',
    coords: [305, 465],
    description: 'A towering sun-worship monument rising from the Crimson Desert sands.',
  },

  // ─── FAST TRAVEL (ABYSS NEXUS) ────────────────────────────────────────────
  {
    id: 'nexus-hernand-central',
    name: 'Nexus: Hernand Central',
    category: 'fast-travel', region: 'hernand',
    coords: [609, 212],
    description: 'Abyss Nexus portal — fast travel to Central Hernand.',
  },
  {
    id: 'nexus-hernand-castle',
    name: 'Nexus: Hernand Castle',
    category: 'fast-travel', region: 'hernand',
    coords: [685, 288],
    description: 'Abyss Nexus portal — fast travel to Hernand Castle.',
  },
  {
    id: 'nexus-scholastone',
    name: 'Nexus: Scholastone',
    category: 'fast-travel', region: 'hernand',
    coords: [598, 179],
    description: 'Abyss Nexus portal — fast travel to Scholastone Institute.',
  },
  {
    id: 'nexus-witchwoods',
    name: 'Nexus: Witchwoods',
    category: 'fast-travel', region: 'hernand',
    coords: [665, 145],
    description: 'Abyss Nexus portal — fast travel to the Witchwoods.',
  },
  {
    id: 'nexus-howling-hill',
    name: 'Nexus: Howling Hill',
    category: 'fast-travel', region: 'hernand',
    coords: [692, 252],
    description: 'Abyss Nexus portal — fast travel to Howling Hill (Greymane Camp).',
  },
  {
    id: 'nexus-lower-nas',
    name: 'Nexus: Lower Nas River',
    category: 'fast-travel', region: 'hernand',
    coords: [572, 198],
    description: 'Abyss Nexus portal — fast travel to the Lower Nas River area.',
  },
  {
    id: 'nexus-ironwood',
    name: 'Nexus: Ironwood',
    category: 'fast-travel', region: 'hernand',
    coords: [698, 162],
    description: 'Abyss Nexus portal — fast travel to Ironwood.',
  },
  {
    id: 'nexus-sages-peak',
    name: "Nexus: Sage's Peak",
    category: 'fast-travel', region: 'pailune',
    coords: [888, 360],
    description: "Abyss Nexus portal — fast travel to Sage's Peak, Pailune.",
  },
  {
    id: 'nexus-pailune-central',
    name: 'Nexus: Central Pailune',
    category: 'fast-travel', region: 'pailune',
    coords: [845, 402],
    description: 'Abyss Nexus portal — fast travel to Central Pailune.',
  },
  {
    id: 'nexus-pailune-north',
    name: 'Nexus: Pailune North',
    category: 'fast-travel', region: 'pailune',
    coords: [932, 385],
    description: 'Abyss Nexus portal — fast travel to Northern Pailune.',
  },
  {
    id: 'nexus-silver-wolf',
    name: 'Nexus: Silver Wolf Mtn',
    category: 'fast-travel', region: 'pailune',
    coords: [895, 432],
    description: 'Abyss Nexus portal — fast travel to Silver Wolf Mountain.',
  },
  {
    id: 'nexus-demeniss-town',
    name: 'Nexus: Demeniss Town',
    category: 'fast-travel', region: 'demeniss',
    coords: [482, 518],
    description: 'Abyss Nexus portal — fast travel to Demeniss Town.',
  },
  {
    id: 'nexus-demeniss-central',
    name: 'Nexus: Central Demeniss',
    category: 'fast-travel', region: 'demeniss',
    coords: [490, 505],
    description: 'Abyss Nexus portal — fast travel to Central Demeniss.',
  },
  {
    id: 'nexus-anvil-hill',
    name: 'Nexus: Anvil Hill',
    category: 'fast-travel', region: 'demeniss',
    coords: [552, 545],
    description: 'Abyss Nexus portal — fast travel to Anvil Hill, Demeniss.',
  },
  {
    id: 'nexus-delesyia-town',
    name: 'Nexus: Delesyia Town',
    category: 'fast-travel', region: 'delesyia',
    coords: [408, 788],
    description: 'Abyss Nexus portal — fast travel to Delesyia Town.',
  },
  {
    id: 'nexus-delesyia-north',
    name: 'Nexus: Delesyia North',
    category: 'fast-travel', region: 'delesyia',
    coords: [502, 758],
    description: 'Abyss Nexus portal — fast travel to Northern Delesyia.',
  },
  {
    id: 'nexus-gorthak',
    name: 'Nexus: Gorthak',
    category: 'fast-travel', region: 'delesyia',
    coords: [435, 848],
    description: 'Abyss Nexus portal — fast travel to Gorthak, Delesyia.',
  },
  {
    id: 'nexus-tashkalp-town',
    name: 'Nexus: Tashkalp Town',
    category: 'fast-travel', region: 'desert',
    coords: [220, 372],
    description: 'Abyss Nexus portal — fast travel to Tashkalp inner town.',
  },
  {
    id: 'nexus-tashkalp-east',
    name: 'Nexus: Tashkalp East',
    category: 'fast-travel', region: 'desert',
    coords: [230, 415],
    description: 'Abyss Nexus portal — fast travel to Eastern Tashkalp.',
  },
  {
    id: 'nexus-forebearer',
    name: "Nexus: Forebearer's Barrens",
    category: 'fast-travel', region: 'desert',
    coords: [255, 348],
    description: "Abyss Nexus portal — fast travel to the Forebearer's Barrens.",
  },
  {
    id: 'nexus-varnia',
    name: 'Nexus: Varnia',
    category: 'fast-travel', region: 'desert',
    coords: [180, 275],
    description: 'Abyss Nexus portal — fast travel to Varnia.',
  },
  {
    id: 'nexus-outlaw-canyon',
    name: 'Nexus: Outlaw Canyon',
    category: 'fast-travel', region: 'desert',
    coords: [292, 338],
    description: 'Abyss Nexus portal — fast travel to Outlaw Canyon.',
  },
  {
    id: 'nexus-traders-expanse',
    name: "Nexus: Trader's Expanse",
    category: 'fast-travel', region: 'desert',
    coords: [318, 405],
    description: "Abyss Nexus portal — fast travel to the Trader's Expanse.",
  },
];
