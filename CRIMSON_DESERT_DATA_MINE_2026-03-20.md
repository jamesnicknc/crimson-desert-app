# Crimson Desert Data Mine — 2026-03-20 (Launch Day +1)

## Summary

Comprehensive data mining session executed day after game launch (March 19, 2026). Data extracted from:
- **Game install**: `C:\Program Files (x86)\Steam\steamapps\common\Crimson Desert\` (125 GB, PAR/PAZ format — encrypted, not extractable yet)
- **Community wikis**: Fextralife, Game8, PowerPyx, Beebom, AllThings.how (scraped day-of)
- **Save data**: `C:\Users\james\AppData\Local\Pearl Abyss\CD\` (SAVE format — encrypted)

## File Format Notes (for future extraction attempts)

The PAZ archives use Pearl Abyss's **PAR format** (`PAR ` magic bytes). The `.pamt` file is the index/mount table. The `.pathc` meta file contains DDS texture data (not a path index). No working extractor for Crimson Desert PAZ exists yet (as of launch+1).

Community actively working on it at: **ResHax.com** (QuickBMS Discussion thread by `gotjisan`)

The BDO tools ([AMGarkin/UnPAZ](https://github.com/AMGarkin/UnPAZ), [kukdh1/PAZ-Unpacker](https://github.com/kukdh1/PAZ-Unpacker)) share engine lineage but are unverified for Crimson Desert.

**Item IDs** (from Nexus Mods save editor reverse engineering) follow the pattern:
```
wpn_sword_legend_macduff
armor_chest_heavy_bear
item_currency_pywel_01
potion_heal_max_tier5
```

## What Was Updated in game-data.ts

### BOSSES (lines ~422–520)
- **Removed**: Crimson Scorpion King, Desert Hydra, The Unifier's Shade, Delesyian Automaton (fictional placeholders)
- **Fixed regions**:
  - Reed Devil: `pailune` → `hernand` (Mountain of Frozen Souls, Hernand per game8)
  - Myurdin (first fight): `pailune` → `hernand` (Hills of No Return, Hernand per game8)
  - Marni's Excavatron: `delesyia` → `hernand` (Karin Quarry, Hernand)
  - Tenebrum: `delesyia` → `hernand` (Scholastone Institute, Hernand)
  - Staglord → Saigord the Staglord: `pailune` → `hernand` (Icemoor Castle Ruins)
  - Antumbra's Sword: `abyss` → `hernand` (Sanctum of Absolution)
  - Fortain: `'unknown'` (type error!) → `demeniss`
  - Draven the Crowcaller: `pailune` → `abyss` (Crow's Nest, The Abyss per game8)
  - Ludvig/Awakened Ludvig: `hernand` → `pailune` (Lonely Jackals quest, Ch.7 Pailune arc)
  - Gregor: `hernand` → `demeniss` (Fort Ironclad, Demeniss)
- **Added bosses**: One-Armed Ludvig, Crimson Nightmare, Gwen Kraber, Sir Catfish, Titan
- **Enriched**: All bosses now have `location`, `mechanics`, and accurate `reward` from verified sources
- **Total**: 30 confirmed bosses (76 in-game; ~46 still TBD)

### ENEMIES (lines ~520–560)
- Expanded from 7 entries to 13 factions with confirmed descriptions from Fextralife
- Added: Crow Brothers, Antumbra's Order, Gregor's Soldiers, Scarlet Blades, Jackals
- All entries include `notes` from Fextralife wiki descriptions

### QUESTS (lines ~560–860)
- **Replaced** all placeholder/fictional quest names with confirmed game8 quest titles
- Coverage: Prologue through Chapter 8, all arcs (Trials of Kindness, The End of Greed, Face Behind the Mask, Forbidden Knowledge, Guest Unbidden, Black and White, The Unyielding Shields, Morning Mist, Dawn, Decisive Battle, Twisted Fate, Ashen Steps)
- All 8 House Celeste bounties named
- All House Roberts quests named (including Crimson Nightmare trigger)
- Sanctum chain quests (Temperance, Penitence, Benediction → Antumbra's Sword)
- **Total**: ~120 quests documented (430 total in-game; full list TBD)

### SKILLS — Damiane & Oongka (lines ~150–310)
- **Replaced** all "(Name unverified -- updating post-launch.)" placeholder names
- Source: Fextralife character pages (Damiane starting stats confirmed; Oongka starting stats confirmed)
- Damiane confirmed skills: Stamina, Spirit, Health, Armed Combat, Sword Flurry, Blinding Flash, Lunge, Shield Toss, Shooting, Charged Shot, Focused Shot, Unarmed Combat, Grappling, Scissor Kick, Evasive Roll, Double Jump, Vault, Flight, Focus, Nature's Grasp, Keen Senses, Smiting Strike, Smiting Bolt
- Oongka confirmed skills: Stamina, Spirit, Health, Armed Combat, Leaping Smash, Slash, Blinding Flash, Quaking Fury, Rampage, Rage, Raging Lightning, Marksmanship, Charged Shot, Evasive Shot, Scatter Shot, Focused Shot, Unarmed Combat, Grappling, Body Slam, Clothesline, Dropkick, Pump Kick, Restrain, Evasive Roll, Double Jump, Vault, Parry, Focus, Nature's Grasp, Keen Senses

### RECIPES (lines ~900–970)
- Replaced fictional recipes with **confirmed in-game recipes** from Fextralife Crafting Manuals
- 78 total food recipes documented; key entries added:
  - Grilled Meat: +80 HP (best bulk heal — 10x = 800 HP for minimum resources)
  - Clear Soup: +180 HP, Ice Lv2 resistance
  - Fishball Soup (Filling): +560 HP, Ice Lv4 resistance
  - Braised Ribs (Hearty): +560 HP, +54 Spirit, Fire Lv4 resistance
  - Marinated Meat (Hearty): +580 HP, +56 Spirit, Fire Lv4 resistance
  - Palmer Pills: self-revival at 30% HP (alchemy)
  - Arrow / Bullet / Small Cannon Ball crafting
  - Dyes: Bright Red, Dark Red (confirmed ingredients)

## Key Facts Compiled (for app content)

### Game Overview
- Developer: Pearl Abyss | Release: March 19, 2026 | Price: $69.99
- World: Pywel continent — 74+ km², 6 regions (Hernand, Pailune, Demeniss, Delesyia, Crimson Desert, The Abyss)
- Characters: Kliff (protagonist), Damiane (unlockable), Oongka (unlockable)
- 430 total quests, 76 total bosses, 2,921 Knowledge System entries, 29 rideable mounts
- No microtransactions at launch; single-player offline capable

### Combat System
- 2 HP bars most bosses; Staglord has 3
- Healing: Grilled Meat = +80 HP; cook in bulk (10x = 800 HP)
- Parry (L1/LB) = green glow = interrupt opening → R1 combo
- Super armor (blue glow) = stop attacking immediately
- Palmer Pills = self-revival at 30% HP
- Nature's Echo skill = duplicates heavy attacks (key for shield bosses)
- Tauria Curved Sword (from Crowcaller) = best heavy attack weapon
- Sword of the Lord (from Kailok) = best quick attack weapon

### Weapons Confirmed (from Fextralife)
**Bows (4)**: Bekker, Grey Wolf, Sydmon, White Wood
**Daggers (4)**: Bekker, Pailunese Riteblade, Sydmon, Varnian
**Firearms (6)**: Bekker Musket, Jemel Pistol, Metilbahm Shotgun, Mortimer Shotgun, Rosemond Pistol, Spencer Pistol
**Hand Cannons (1)**: Orc Blaster
**One-Handed (20)**: Balton Hammer/Mace, Bekker Hammer, Crude Club, Glenmore Sword, Grace Rapier, Lambert Axe, Melted Ambition, Mining Knuckledrill, Silver Wolf Axe, Sword of the Lord, Sword of the Wolf, Sydmon Sword, Tauria Curved Sword, Thalwynd Hammer, The Grove's Thorn, Timberham Axe, Wells Mace, White Wind Rapier, Wolf's Fang
**Two-Handed (24)**: Absolute Justice Greatsword, Balton Longsword, Bamboo Spear, Bekker Greathammer, Bonepit Halberd/Warhammer, Ceremonial Warhammer, Dekarr Greataxe, Fan-Blade Greataxe, Flame Spear, Hellhounds' Chopping Axe, Horseshoe-Blade Greataxe, Ignir, Marauder's Halberd, Pailunese Logging Axe, Reventine Priest's Spear, Rhett's Longsword, Slave Gladiator Branding Spear, Sydmon Spear, Thalwynd Longsword/Warhammer, Tommaso Guard's Dagger-Tipped Spear, Warspike Spear, Zargan Warhammer

### Armor Sets Confirmed (from Fextralife)
**Body (17)**: Ashclaw Leather, Bandit Cloth, Blackwing Leather, Bolton Plate, Camouflage Outfit, Canta Plate, Demeniss Elite Uniform Leather, Hernand Ceremonial Guard, Hernandian Attire, Jackals' Leather, Scarlet Blades Cloth, Scholastone Uniform, Solas Plate, St Halssius Priest, Unyielding Warrior's Plate, Weasel Leather, Ynitium Leather
**Cloaks (18)**: Bolton Plate, Canta Plate, Delesyian Cloth, Demenissian Uniform Leather, Disguise, Grey Wolf Cloth, Hernand Ceremonial Guard, Hernandian Banquet, Hernandian Noble's, Hungering Fang Leather, Jack Cloth, Scarecrow, Scholastone, St Halssius Priest's, Unyielding Warrior's Plate, Weasel Leather, White Bloodwind Cloth, Ynitium Leather
**Footwear (14)**: Canta/Carta Plate Boots, Demenissian Elite Uniform Leather, Fiore Leather, Hernand Ceremonial Guard, Hernandian Banquet Leather, Hungering Fang Leather, Odeck's Protector Plate, Rabbit Cloth, Scholastone, Solas Plate, St Halssius Priest's Leather, Unyielding Warrior's Plate, Ynitium Leather
**Gloves (5)**: Canta Plate, Demenissian Uniform Leather, Hernand Ceremonial Guard, Sunset Reed Cloth, Ynitium Leather
**Headgear (16)**: Blackwing Mask, Bolton/Canta Plate Helm, Boren Leather, Drish Cloth Cap, Hernandian Crown, Jackals' Leather Helm, Labrak Cloth, Raccoon Cloth Hat, Radein/Rueconec Cloth Cap, Rivellon Cloth, St Halsius's Priest's Hat, Unyielding Warrior's Plate Helm, Visione, Ziggurat Cloth Helm

### Gatherables (confirmed from Fextralife)
**Meats**: Tough, Lean, Fine, Tender, Marbled, Lean Bird, Bird, Fish Fillet
**Grains**: Beans, Lentils, Peas, Barley, Oats, Wheat, Buckwheat, Corn
**Fruits**: Raspberry, Elderberry, Blackberry, Blueberry, Pomegranate, Fig, Peach, Tomato, Apple, Strawberry, Grape, Orange, Pear, Pineapple, Desert Melon, Coffee Cherry, Cacao
**Vegetables**: Flax, Onion, Cucumber, Turnip, Beet, Garlic, Potato, Sweet Potato, Pumpkin, Cabbage, Parsley, Carrot, Wild Garlic, Asparagus, Fennel
**Mushrooms**: Coral (Demeniss/Delesyia), Oakwood (Hernand/S.Pailune), Pine (all except desert)
**Herbs**: Marigold, Shrubby Sophora, Satintail Root, False Starwort, Lavender (White/Blue variants), Short Horn, Snapdragon, Ginseng, Wild Ginseng, Bear's Gallbladder, False Hellebore (poisonous)
**Minerals**: Stone, Fine Stone, Iron Ore, Copper Ore, Bloodstone, Azurite, Epidote, Diamond, Stalactite
**Insects (alchemy)**: Centipede, multiple butterfly species, Rhinoceros Beetle, Grasshopper, Snail, Longhorn Beetle, Water Strider, Stag Beetle

### Factions
- **Greymanes**: Mercenary company; Kliff's faction; protagonist group
- **Black Bears**: Antagonist; led by Myurdin; conquered Pailune
- **Crow Brothers**: Led by Draven the Crowcaller; operate from The Abyss
- **Antumbra's Order**: Led by Antumbra's Sword; void spirits; six sanctums in Hernand
- **House Celeste**: Bounty hunters/law enforcement; 8 outlaw bounties in Hernand
- **House Roberts**: Count Leon Roberts; Bluemont Manor
- **House Serkis**: Marquis Alan Serkis; Oakenshield Manor
- **Goldleaf Merchant Guild**: Shakatu (trademaster), Ugmon (director); black-market merchants
- **Scholastone Institute**: Academic; Dean Grundir; location of Tenebrum boss
- **Pailune Militia**: Regional military
- **Beighen Tribe**: Pailune area faction
- **Witches**: Independent faction; craft Haste Core
- **Pororin Forest Guardians**: Nature faction
- **Abyss Maintainers**: Alustin (ancient alchemist), White Crow (transcendent entity)

### Chapters (confirmed from game8)
1. The First Encounter
2. Golden Greed
3. Howling Hill
4. The Price of Knowledge
5. Guest Unbidden
6. Cracks in the Shield
7. Homecoming
8. Blood Coronation

### Confirmed Accessories
- **Earrings**: Engraved Copper/Silver/Gold Earring (Def 1), Oath of Darkness (Def 2 — Bluemont Manor strongbox puzzle)
- **Necklaces**: Tarnished Necklace (Atk 1 — bandit drop)
- **Rings**: Tarnished Ring (Atk 1), Hernandian Signet (Atk 2 — 65 Contribution Points)

### Horse Tack (confirmed)
Shabby/Delmar Saddle (HP), Crude/Hernandian Stirrups (HP regen), Shabby Iron/Silver Iron Horseshoes (Atk + Stamina regen), Hernandian Champron (Atk 7), Hernandian Barding (Def 20)

## Data Gaps (TBD Post-Launch)
- Full enemy/creature list from Knowledge Codex (2,921 entries)
- Boss rewards for ~46 undocumented bosses
- Full 430-quest list (only ~120 confirmed)
- Individual weapon/armor stats (Fextralife stats pages empty at launch)
- Abyss Artifact locations
- Mount acquisition methods (many are community-estimated placeholders)
- Chapters 9+ (if they exist beyond Ch.8; game8 lists 12 main chapters but 9-12 unconfirmed)
