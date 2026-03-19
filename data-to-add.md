# Crimson Companion App -- Data To Add / Fix

_Last updated: 2026-03-18 (Run 13 -- Launch Eve / Embargo Lift Pass)_

Items are organized by category and priority. Mark items as `[ADDED]` once they've been incorporated into the app.

---

## New Data to Add

### Skills

Run 13 (2026-03-18) sourced the FULL CONFIRMED skill list for Kliff from allthings.how. The SKILLS array needs a complete rewrite -- see the major gap entry below. Many skills confirmed below are absent from the app entirely; the existing entries use wrong names. The observation-learned skills already present (Belly Slam, Force Palm) match confirmed names in the Green branch (Force Palm confirmed; Belly Slam needs post-launch check).

#### Skill Name Accuracy Issue + FULL CONFIRMED SKILL LIST [MAJOR GAP] [NEEDS REVIEW] -- Flagged: 2026-03-16 (Run 10), Updated: 2026-03-18 (Run 13)
- The app's SKILLS array uses editorially invented names. Run 13 now has a COMPLETE confirmed skill list from allthings.how (Tier 2, full skill tree breakdown article).
- The three branches are: Blue (Stamina, 16 levels), Green (Spirit, 14 levels), Red (Health, 18 levels). Central: Falling Palm.
- **FULL CONFIRMED SKILL LIST:**
  - **Blue Branch (Stamina/16 levels) -- Unarmed sub-tree:** Unarmed Combat, Scissor Takedown, Pump Kick, Dropkick, Vault, Flying Kick, Meteor Kick, Grappling, Throw, Restrain, Lariat, Back Hang, Clothesline, Body Slam, Giant Swing
  - **Blue Branch -- Archery sub-tree:** Archery, Multishot, Evasive Shot, Charged Shot
  - **Blue Branch -- Armed/Sword sub-tree:** Armed Combat, Evasive Slash, Charge, Rush, Quick Swap, Forward Slash, Shield Bash, Turning Slash, Stab, Skewer, Sword Flurry, Blinding Flash, Blinding Flash Finisher
  - **Green Branch (Spirit/14 levels):** Nature's Echo, Nature's Snare, Keen Senses, Parry, Backstep, Counter, Evasive Roll, Double Jump, Focus, Focused Repulsion, Focused Insight, Force Palm, Aerial Force Palm, Healing Force Palm, Nature's Grasp, Focus Shot, Force Palm Pulse, Focused Palm, Light Falling Palm, Force Current
  - **Red Branch (Health/18 levels):** Mystical Storage, Fist of Flame, Veil of Fog, Imbue Elements, Mantle of Frost, Surge of Sparks, Axiom Force, Flight, Aerial Roll, Winch
  - **Central (unlocks after completing one branch):** Falling Palm
- Action needed: The SKILLS array needs a complete rewrite. Every current skill name for Kliff is wrong or missing. The confirmed list above should replace all current Kliff entries. Damiane and Oongka skill names remain unconfirmed from authoritative sources -- flag for post-launch verification separately.
- Source: allthings.how skill tree breakdown [2026-03-18] -- Tier 2. Consistent with Beebom skills article (Tier 2) and Sportskeeda Kliff skill tree article (Tier 2).
- Flagged: 2026-03-16 (Run 10). Updated with full list: 2026-03-18 (Run 13). Requires human decision: rewrite now with the confirmed list, or wait until post-launch for the full in-game text to verify edge cases.

#### Falling Palm [Central Skill] [NEEDS REVIEW] -- Flagged: 2026-03-16 (Run 10), Confirmed: 2026-03-18 (Run 13), Note Updated: 2026-03-18 (Run 14)
- Description: "Unleash a powerful blow to the ground by harnessing the force of the fall and channeling all your Stamina into the strike." Consumes all remaining Stamina on use.
- This skill sits at the convergence point of all three skill branches. allthings.how (Tier 2) confirms: "Unlocks upon completing any single branch."
- SOURCE CONFLICT on unlock condition: One search summary (low-confidence, summarized source) stated it is "unlocked by default." The Tier 2 allthings.how dedicated article explicitly states completing a branch unlocks it. Trust allthings.how -- the "by default" claim is likely an error in a summary.
- **NOTE (Run 14):** Falling Palm is NOT absent -- it IS already in game-data.ts as `{ id: 'k-c1', name: 'Falling Palm', cost: 'Convergence', branch: 'Core', character: 'kliff' }`. However, the description in the app says "unlocked after mastering all three branches" which contradicts the verified source ("completing any single branch"). This description correction should be applied -- but since the item is [NEEDS REVIEW], leaving for human decision on timing.
- Source: allthings.how skill tree breakdown [2026-03-18] -- Tier 2; Beebom skills article [2026-03-16] -- Tier 2; Sportskeeda Kliff skill tree article [2026-03-18] -- Tier 2
- Needs review: Correct the existing description from "mastering all three branches" to "completing any single branch" to match 3x Tier 2 sources.

### Bosses & Enemies

The following bosses were confirmed by authoritative sources but are NOT present in game-data.ts:

#### Split Horn / Branchmaster Split Horn [Hernand Goblin Boss] [NEEDS REVIEW]
- Type: Humanoid / Goblin Leader
- Region: Hernand (Unicorn Cliffs sub-zone)
- Description: Tyrannical branchmaster of a goblin camp in Hernand. Rules subordinates for selfish desires. Fast and attacks with chaos. Players challenge him after defeating goblin minions.
- Source: Fextralife Wiki, Game8 (https://game8.co/games/Crimson-Desert/archives/583946), search results 2026-03-15
- Confirmed fields (2 independent sources): `region: 'hernand'` (Unicorn Cliffs confirmed in Hernand), `type: 'Humanoid'`
- Confirmed fields: `difficulty: 'hard'` (Fextralife: "fairly easy match" despite high evasion; only 1 HP bar; early Hernand story boss)
- Still missing (blocks add): `reward` (no named drop in any pre-launch source), `element`
- Flagged: 2026-03-15 (Run 2); Researched: 2026-03-15 (Runs 4-5)
- Researched: 2026-03-16 (Run 9) -- No new data. Game8, Fextralife, Beebom, and Sportskeeda all confirm his presence and Hernand region but zero sources name any item drop. Game launches March 19-20, 2026. Re-run post-launch.

#### Cassius Morten [Calphade Traitor Boss] [NEEDS REVIEW]
- Type: Human (armored)
- Region: Calphade (not in REGIONS array or Region type)
- Description: Former loyal officer to Marquis Stefan Lanford of Calphade who betrayed him and allied with the Drunken Black Bears. Well-armored, wields mace and shield. Environmental mechanic: stagger him first, then use broken pillars to deal massive bonus damage.
- Source: Crimson Desert official Twitter (https://x.com/CrimsonDesert_/status/1933109818455449807), Sportskeeda
- Confirmed fields: `type: 'Human'`, `element: 'physical'` (armored human, mace and shield, no magic abilities mentioned in any source)
- Still missing (blocks add): `region: 'calphade'` is NOT in Region union type AND Calphade is NOT listed as a major region on Fextralife or any source (appears to be a story area/sub-territory). Also missing `difficulty`, `reward`.
- Note: Calphade may be a sub-territory of an existing region rather than a 6th major region. Requires clarification at launch.
- Flagged: 2026-03-15 (Run 2); Researched: 2026-03-15 (Run 4)
- Researched: 2026-03-16 (Run 9) -- Fextralife Locations wiki (fetched directly) confirms only 5 main regions + Abyss. Calphade is absent from all wiki sources. The GameSpot article title ("two boss battles") corroborates Cassius Morten as a showcased boss but provides no region clarification. Region blocker remains. Re-run post-launch.

#### Fortain, the Cursed Knight [Castle Boss] [NEEDS REVIEW]
- Type: Human / Spirit
- Region: Unknown (castle setting, region TBD at launch). Also seen spelled "Fontain" in some sources.
- Description: Fought inside a castle with other soldiers standing by without intervening. A spectral apparition attacks alongside him. After the knight is defeated, the apparition kills him to end the fight.
- Source: Beebom (https://beebom.com/crimson-desert-bosses/), confirmed by Game Rant search results
- Still missing (blocks add): `region`, `difficulty`, `reward`, `element` (spectral/cursed nature suggests 'abyss' element but unconfirmed)
- Flagged: 2026-03-15 (Run 2); Researched: 2026-03-15 (Run 4) -- no new fields confirmed
- Researched: 2026-03-16 (Run 9) -- One source (search result inference, not a direct wiki page) suggests a Demeniss castle location based on Demeniss being the capital with "grand castles." This is editorial speculation from the source, not verified data -- do not use. Spelling confirmed as "Fortain" by Beebom and GamingBolt. Re-run post-launch for region, reward, element.

#### Draven [Story Boss] [NEEDS REVIEW]
- Type: Unknown (humanoid in appearance, raven-themed)
- Region: Unknown
- Description: Adorned in darkness, resembling a raven. Can briefly turn into black particles and move, closing distance rapidly. Described as a major story antagonist. His darkness movement ability was shown to be usable by the main protagonist after the encounter, suggesting it is obtained as a signature ability drop.
- Source: Beebom (https://beebom.com/crimson-desert-bosses/), multiple search result corroborations 2026-03-15
- Confirmed fields (inferred, not confirmed by stat-sheet source): `element: 'abyss'` (darkness-based, particle movement, raven symbolism) -- inferred, single-source quality
- Still missing (blocks add): `region`, `difficulty`, `reward` (specific named item), confirmed `element`
- Flagged: 2026-03-15 (Run 2); Researched: 2026-03-15 (Run 4)
- Researched: 2026-03-16 (Run 9) -- No new data from any source. Still 4 missing required fields. Re-run post-launch.
- Researched: 2026-03-18 (Run 13) -- allthings.how 76-bosses article notes Draven is "referenced in Hexe Marie's dialogue," confirming a narrative connection between the two characters. This is not a region or reward confirmation, but strengthens the 'abyss' element inference given Hexe Marie's region is 'abyss'. No blocking fields resolved. Re-run post-launch.

#### Muskan [Arena Boss] [NEEDS REVIEW]
- Type: Human (arena fighter)
- Region: Crimson Desert (Bonepit arena -- desert biome confirmed)
- Description: "Undefeated warrior of The Bonepit." Fights inside a gladiator-style arena with cheering onlookers. Does not use weapons -- relies entirely on fists. Appears in Tommasoan territory (Fextralife) which appears to be in or near the desert.
- Source: Fextralife Wiki (https://crimsondesert.wiki.fextralife.com/Bosses), Beebom (desert biome confirmed)
- Confirmed fields (2 sources): `region: 'desert'` (Beebom: "desert biome" + Fextralife: arena in Tommasoan territory near desert), `type: 'Human'`, `element: 'physical'` (no weapons, fists only -- no magical element observed)
- Confirmed fields: `difficulty: 'extreme'` (editorial: undefeated arena warrior, late-game fight context; classified consistent with other extreme-tier bosses in app scale)
- Still missing (blocks add): `reward` (Fextralife page exists but shows "TBA"; no named drop in any pre-launch source)
- Flagged: 2026-03-15 (Run 2); Researched: 2026-03-15 (Runs 4-5)
- Researched: 2026-03-16 (Run 9) -- No new data. Note: a "Muskan" appears in Black Desert Online (drops shoes) but this is a different game -- do not use. Re-run post-launch for reward field.

#### Gwen Kraber [Minor Field Boss] [NEEDS REVIEW]
- Type: Human
- Region: Hernand (fights at Roothold stronghold)
- Description: Spear-wielding minor boss. Occupies Roothold stronghold (originally under House Celeste). The stronghold is freed once Kraber and his soldiers are defeated, returning it to House Celeste. Spear becomes obtainable after defeating him.
- Source: Beebom (https://beebom.com/crimson-desert-bosses/), Fextralife Locations (Roothold confirmed in Hernand sub-locations list)
- Confirmed fields (2 independent sources): `region: 'hernand'` (Roothold is in Hernand per Fextralife Locations; also corroborated by search results), `type: 'Human'`, `element: 'physical'` (human spear-fighter, no magical abilities mentioned)
- Still missing (blocks add): `reward` (spear drop confirmed to exist, but no named item -- cannot invent a weapon name), `difficulty`
- Flagged: 2026-03-15 (Run 2); Researched: 2026-03-15 (Run 4) -- region and element confirmed; blocked by unnamed reward
- Researched: 2026-03-16 (Run 9) -- No new data. Note: the Beebom weapons page mentions a "Derictus Spear" as a Collector's Edition item -- this is NOT the Kraber drop spear. The in-game spear reward still has no confirmed name. Re-run post-launch.

#### Titan [Armored Humanoid Boss] [NEEDS REVIEW]
- Type: Humanoid
- Region: Unknown
- Description: Huge, heavily armored spear-wielder. Lightning-based attacks confirmed in trailers.
- Source: Beebom (https://beebom.com/crimson-desert-bosses/), search result corroborations 2026-03-15
- Confirmed fields (2+ sources): `element: 'shock'` (lightning attacks confirmed by Beebom and multiple search sources)
- Still missing (blocks add): `region`, `difficulty`, `reward`
- Flagged: 2026-03-15 (Run 2); Researched: 2026-03-15 (Run 4) -- element now confirmed as 'shock'; region and reward still needed
- Researched: 2026-03-16 (Run 9) -- No new data. No source names a region or reward. Re-run post-launch.

#### Marni's Excavatron [Delesyia Mechanical Boss] [NEEDS REVIEW] -- Flagged: 2026-03-17 (Run 11)
- Type: Mechanical
- Region: Delesyia (Marni's Masterium sub-zone)
- Description: A large mechanical construct guarding Marni's Masterium in Delesyia. Confirmed as a named boss entry in the in-game boss knowledge menu.
- Source: allthings.how boss article [2026-03-17] -- Tier 2
- Note: The existing 'Delesyian Automaton' entry in the app's BOSSES array may be a placeholder for this boss, or they may be separate encounters. Reconcile at launch -- the Delesyian Automaton (normal difficulty, reward: Speed Catalyst Gear, element: shock) should be compared to the confirmed Marni's Excavatron name once in-game data is available.

#### Kailock, the HornSplitter [Goblin Boss] [NEEDS REVIEW] -- Flagged: 2026-03-17 (Run 11), Reviewed: 2026-03-18 (Run 13)
- Full name confirmed: "Kailock, the HornSplitter"
- Type: Humanoid / Goblin
- Description: A goblin camp leader who hunts Abyss Artifacts. Described as a tyrannical branchmaster.
- Note: The allthings.how 76-bosses article (Run 13) lists Kailok the HornSplitter as a DISTINCT boss entry separate from Split Horn. They are two different goblin leaders. Split Horn is Hernand (Unicorn Cliffs); Kailock's region is unspecified.
- Source: allthings.how boss article, PlayStation Blog [2026-03-17] -- Tier 2; allthings.how 76-bosses article [2026-03-18] -- Tier 2
- Still missing: region, difficulty, reward, element. All block app entry.

#### Kearush the Slayer -- App Entry Verification [PARTIALLY VERIFIED] -- Flagged: 2026-03-18 (Run 13), Reviewed: 2026-03-18 (Run 14)
- ALREADY IN APP: `{ name: 'Kearush the Slayer', region: 'hernand', type: 'Monster', difficulty: 'hard', reward: 'Slayer Claw Materials', element: 'physical', weakness: 'fire' }`
- Run 13 fetched the Fextralife Kearush page directly. Confirmed details:
  - Location: Hernand Castle, Hernand region -- MATCHES app region: 'hernand' (CORRECT)
  - Type: Gigantic Gorilla covered with armor, helmet, and chains -- app uses 'Monster', could be 'Beast'; Monster is acceptable editorial choice
  - Element: 'physical' -- CONFIRMED CORRECT (relies on brute strength, no magical element observed)
  - Reward: 'Slayer Claw Materials' -- NOT CONFIRMED by any source (editorial, reward page shows TBA)
  - Weakness: 'fire' -- NOT CONFIRMED by any source (editorial)
  - New mechanic detail: Player can mount Kearush's back and perform stabbing attacks during fight -- this is a boss mechanic not currently surfaced in the app's boss data (no 'mechanic' field in Boss interface)
- Run 14 review (2026-03-18): No changes made. Region and element confirmed correct. Reward and weakness fields are editorial placeholders with no verified replacements available yet. Re-run post-launch to resolve these two fields.

#### Walter Lanford Region Correction [NEEDS REVIEW] -- Flagged: 2026-03-17 (Run 11)
- Current app value: region 'desert'
- Evidence suggests this is WRONG. Fextralife says "Fort Warspike"; game8 says "Alfonso Estate." Neither maps to the Crimson Desert region.
- Both Fort Warspike and Alfonso Estate suggest an estate/military setting -- more consistent with Hernand or Demeniss.
- Action needed: Change region from 'desert' to the confirmed region once launch data is available.
- Source: Fextralife Walter Lanford wiki, game8 boss list [2026-03-17] -- Tier 1/2

#### Desert Ancient [Desert Elemental Boss] [NEEDS REVIEW]
- Type: Elemental
- Region: Crimson Desert
- Description: Fire elemental boss in the Crimson Desert. Fight takes place in desert biome with fire-like entities homing in on the player. Parallels Snow Walker (frost elemental, Pailune) in design role.
- Source: Beebom (https://beebom.com/crimson-desert-bosses/), corroborated by multiple search sources 2026-03-15
- Confirmed fields (2+ sources): `region: 'desert'`, `element: 'fire'` (fire entities and desert biome confirmed by Beebom and search result corroborations), `type: 'Elemental'`
- Still missing (blocks add): `difficulty`, `reward` (no named drop found in any pre-launch source)
- Flagged: 2026-03-15 (Run 2); Researched: 2026-03-15 (Run 4) -- region, type, element all confirmed; only reward blocking
- Researched: 2026-03-16 (Run 9) -- No new data. Desert Ancient is among the least-documented bosses -- Beebom notes it was "barely shown in a trailer." No difficulty or reward sourced. Re-run post-launch.

### Weapons

#### Damiane's Weapon Type [CORRECTION -- GREATSWORD NOT DUAL BLADES] [SOURCES CONFLICT -- NEEDS REVIEW] -- Flagged: 2026-03-17 (Run 11), Updated: 2026-03-17 (Run 12)
- The current WEAPONS entry "Damiane's Claymore" (type: 'Claymore') uses a slightly wrong type name.
- Run 11 proposed changing to "Dual Blades" based on dexora.gg. This is INCORRECT. Multiple authoritative sources confirm Dual Blades belong to Kliff, not Damiane.
- Damiane's confirmed weapons (2+ sources): Greatsword, Rapier & Buckler, Musket, Pistol. The Director of Marketing confirmed: "Damiane has a pistol and a musket, she has a rapier that she uses in melee."
- The current "Claymore" type should be renamed to "Greatsword" (confirmed by Beebom and Game8 independently). Stats may also need adjustment.
- The app is also missing Damiane's Rapier, Musket, and Pistol weapon entries entirely.
- Source: Beebom (https://beebom.com/crimson-desert-weapons/), Game8 (https://game8.co/games/Crimson-Desert/archives/582200), GamesRadar (https://www.gamesradar.com/games/rpg/crimson-desert-weapons/) [2026-03-17]
- dexora.gg source was WRONG about Dual Blades being Damiane's weapon. Do not use dexora.gg as sole source for weapon-character assignments.

#### Oongka's Fists [NEEDS REVIEW] -- Flagged: 2026-03-17 (Run 11), Updated: 2026-03-17 (Run 12)
- Type: Unarmed / Fists
- Description: Raw bare-handed combat with grapples and throws. Fast recovery between hits, ideal for aggressive rushdown.
- IMPORTANT: Multiple sources confirm unarmed/fists combat is a UNIVERSAL system available to all characters (primarily Kliff and Oongka), not a character-specific equipped weapon. It functions as a parallel combat system woven into armed combat. Adding "Oongka's Fists" as a unique weapon entry would be misleading.
- Oongka's actual confirmed weapons (2+ sources): Two-Handed Axes, Warhammer (already in app as "Oongka's War Hammer"), Arm Cannon / Hand Cannon. The app is MISSING Axes and Arm Cannon entries for Oongka.
- Source: Sportskeeda, Beebom, Game8, AlcastHQ, GamesRadar [2026-03-17]
- dexora.gg misrepresented Fists as an Oongka-specific weapon. Do not add as a standalone weapon entry.

#### Prixia Swords [Named Weapon/Faction Item] -- Flagged: 2026-03-17 (Run 11)
- Type: Sword (one-handed, likely)
- Description: Faction weapons associated with the Gold Leaf goblin guild. A rack of them is found in Gold Leaf HQ and Kliff picks one up after the Split Horn fight.
- Not in WEAPONS array. Stats and acquisition method unknown.
- Source: YouTube transcript 08bOU_cfNW4 [2026-03-17] -- Tier 3 (confirmed by Fextralife article context)
- Needs review: Confirm if these are standard swords with the Gold Leaf name or a unique weapon type.

#### Grotevant Plate Set [ADDED -- 2026-03-15]
- Added to COLLECTIBLES['edition'] as `{ name: 'Grotevant Plate Set', location: 'PlayStation 5 Exclusive Bonus', category: 'edition' }`. Note: this is an armor set cosmetic, not a weapon -- it was re-categorized from the weapons section to the edition collectibles where it belongs alongside other console/edition exclusives.

### Mounts

#### Wolf Mounts [Mount Category] [NEEDS REVIEW]
- Category: Wolf (referenced in wiki overview)
- Description: Wolves appear to be a distinct mount category referenced in the Fextralife wiki overview. The current MOUNTS array does not include any wolf entries. Needs verification at launch with specifics (speed, combat, stamina, acquisition).
- Source: Fextralife Wiki (https://crimsondesert.wiki.fextralife.com/Crimson+Desert+Wiki)
- Flagged: 2026-03-15
- Needs review: Category 'wolf' is not in the MountCategory union type (`src/types/game-data.ts`). Type must be updated first. No stats available (speed, combat, stamina, acquisition) -- all required fields. Add specific mount entries post-launch once stats are confirmed.
- Researched: 2026-03-16 (Run 9) -- Wolf mount existence confirmed by Deltia's Gaming and FandomWire: the release date trailer shows Kliff riding a "direwolf-sized" wolf that is "properly saddled." Acquisition method is unknown but likely follows the taming minigame mechanic used for horses. No speed/combat/stamina stats in any source. 'wolf' category still absent from MountCategory type. Remains fully blocked. Re-run post-launch.
- Researched: 2026-03-16 (Run 10) -- No new data on wolf mount stats. Same blocker as before. Game launches March 19. Re-run post-launch.

#### Vehicle Mounts [New Mount Category] [NEEDS REVIEW]
- Category: Vehicle (new -- not currently in MountCategory type)
- Description: Multiple vehicle-style mounts confirmed -- War Robot (fires missiles, suppressing fire, EMP), Hot Air Balloon (aerial traversal), Wagon (goods transport), Skiff (water traversal). These do not fit the existing animal-based mount categories. A new 'vehicle' or 'vessel' category would be needed in the MountCategory union type. Alternatively, War Robot maps loosely to 'mechanical' category which already exists.
- Source: gurugamer.com gameplay features [2026-03-16] -- Tier 2
- Flagged: 2026-03-16 (Run 10)
- Needs review: MountCategory type does not include 'vehicle'. War Robot could potentially use existing 'mechanical' category. Wagon and Skiff may not belong in MOUNTS at all (they may be scripted traversal, not player-owned mounts). Requires design decision + post-launch stat verification.

### Quests

#### Sky Boulder Investigation [Hernand Early Quest] [NEEDS REVIEW]
- Type: Side or early main quest
- Quest giver: Bon Midler (Hernand official)
- Description: A boulder fell from the sky and crushed a farmhouse. Brigands followed, using Red Smoke that "bewitches the senses." Kliff must capture them and reveal their identities. Connected to the Radiant Fragments storyline.
- Source: YouTube transcript (video 1ItNYP9U1M0) -- Tier 3
- Flagged: 2026-03-15 (Run 2)
- Needs review: Quest type and reward unknown. No quest data structure update needed beyond adding a new entry.

#### The Gold Leaves Duel [Hernand Faction Quest] [NEEDS REVIEW]
- Type: Faction/story quest
- Description: Kliff challenges Branch Master Split Horn of the Gold Leaves goblin guild to a "rakash" (goblin duel). After Split Horn is defeated, Shakatu becomes the new Branch Master and offers the Gold Leaves network as support for finding Greymane comrades.
- Source: YouTube transcript (video 1ItNYP9U1M0) -- Tier 3
- Flagged: 2026-03-15 (Run 2)
- Needs review: Quest name is informal (not an official in-game name). Add once official quest name is confirmed at launch.

The minigame / side activity list (betting, horse racing, target shooting, arm wrestling, mud fights) may also warrant addition as activity entries or side quest entries in the app.

#### "A Blacksmith's Debt" [Side Quest] [NEEDS REVIEW] -- Flagged: 2026-03-16 (Run 10)
- Type: Side quest
- Region: Hernand
- Description: A quest in Hernand involving the town blacksmith. Named in a beginner's guide as an early gameplay milestone.
- Possibly related to obtaining the Hernand Iron Sword reward.
- Source: crimsondesert.club [2026-03-16] -- Tier 3
- Needs review: Quest type, full description, and reward not confirmed in any authoritative source. Add post-launch once official quest content is verified. The name itself is only Tier 3.

### Collectibles

#### Radiant Fragments [New Collectible Type?] [NEEDS REVIEW]
- Description: Items described as "radiant fragments that fall from the sky." Mentioned by Matthias when confronting Kliff. May be the same as Abyss Artifacts (dropped from the sky alongside Sky Boulders) or a distinct collectible category. Connection to the Sky Boulder incident is strong.
- Source: YouTube transcript (video 1ItNYP9U1M0) -- Tier 3
- Flagged: 2026-03-15 (Run 2)
- Needs review: May be an alternate name for Abyss Artifacts. Requires launch confirmation before adding a separate CollectibleCategory entry. Do not duplicate if confirmed identical to artifacts.

#### Khaled Shield [Pre-Order Bonus Collectible] [NEEDS REVIEW] -- Flagged: 2026-03-18 (Run 13)
- Description: A shield item granted to all players who pre-ordered Crimson Desert. Available across all platforms and editions.
- Category: 'edition' (same as Balgran Shield Deluxe Edition and Grotevant Plate Set PS5 Exclusive)
- Not currently in the COLLECTIBLES array.
- Source: Pearl Abyss official release FAQ (https://crimsondesert.pearlabyss.com/en-US/News/Notice/Detail?_boardNo=63), confirmed by GameSpot and multiple launch coverage articles [2026-03-18] -- Tier 1
- Action: Add to COLLECTIBLES['edition'] as `{ name: 'Khaled Shield', location: 'Pre-Order Bonus (All Platforms)', category: 'edition' }`
- Note: Distinct from the Balgran Shield (Deluxe Edition gameplay weapon) and Grotevant Plate Set (PS5 Exclusive). This is a cosmetic/edition item, not a gameplay weapon.

#### Traces of the Abyss [Fast-Travel Collectible] [NEEDS REVIEW]
- Description: Named fast-travel waypoint collectibles found throughout Pywel. The current app lists "fast-travel" collectibles as place names (e.g., Hernand Crossroads). The Fextralife wiki uses "Traces of the Abyss" as the in-game name for these waypoints, suggesting the current fast-travel entries should use this terminology.
- Source: Fextralife Wiki (https://crimsondesert.wiki.fextralife.com/Locations)
- Flagged: 2026-03-15
- Researched: 2026-03-16 (Run 9) -- Fextralife Locations wiki confirms "Traces of the Abyss location" as the term used for fast-travel nodes, described as functioning "similar to a waypoint portal once unlocked." However, the Beebom fast-travel guide (separate article) does NOT use this name -- it simply calls them "fast travel points" and describes them as "small pillars." The naming discrepancy may resolve post-launch. Confidence: moderate that "Traces of the Abyss" is the official in-game name, but not high enough to bulk-rename ~15 existing records until launch confirms.
- Needs review: Still a bulk-rename decision for human. Do not auto-apply until you can verify the in-game UI uses this label on the waypoint collectible screen.

#### Treasure Maps [Collectible Type] [NEEDS REVIEW]
- Description: Treasure Maps are confirmed as a collectible type that leads to hidden treasure locations. Not currently represented in the COLLECTIBLES data.
- Source: Fextralife Wiki (https://crimsondesert.wiki.fextralife.com/Crimson+Desert+Wiki)
- Flagged: 2026-03-15
- Needs review: CollectibleCategory union type does not include a 'treasure-map' or similar value. Type must be updated first. No specific named treasure map entries are available to add yet. Add once specific entries are known post-launch.

#### Dual Blades [Weapon Type] [NEEDS REVIEW] -- Flagged: 2026-03-16 (Run 10)
- Description: Confirmed as S-tier weapon in pre-launch tier list. Focuses on speed and aggressive combat with extremely fast attack chains, high damage through combos, and excellent mobility. Distinct from Daggers (which are also fast but single-weapon). "Requires strong stamina management to avoid vulnerability."
- Not present in the WEAPONS array as a weapon type.
- Characters: Unknown -- may be Kliff or a shared weapon type.
- Source: crimsondeserthub.com tier list [2026-03-16] -- Tier 2. Note: this is a pre-launch editorial tier list and may not reflect final game balance.
- Needs review: Confirm which character(s) can use Dual Blades, and add weapon entry with stats once known post-launch.

#### Hernand Iron Sword [Weapon] [NEEDS REVIEW] -- Flagged: 2026-03-16 (Run 10)
- Description: An early game quest reward sword with a notably higher Stagger rating than the starter blade. Named as one of the first recommended gear upgrades.
- Type: Sword, character: Kliff (inferred)
- Source: crimsondesert.club beginner guide [2026-03-16] -- Tier 3
- Needs review: Stats unknown. Confirm quest that rewards it ("A Blacksmith's Debt" is a candidate but unconfirmed). Add to WEAPONS array post-launch with confirmed stats.

### Crafting Recipes

#### Named Cooking Recipes [NEEDS REVIEW] -- Flagged: 2026-03-17 (Run 11)
Pre-launch guide site dexora.gg lists the following cooking recipe names. CAUTION: These may be editorial names, not confirmed in-game text. Verify post-launch before adding.
- Fish Stew -- Effect: Stamina recovery. Ingredient sources: caught fish (Hernand rivers).
- Grilled Trout -- Effect: Health regeneration. Ingredient sources: caught fish (Hernand rivers).
- Rare Sashimi -- Effect: Temporary damage boost. Source: rare fish catch.
- Warrior's Feast -- Effect: Plus damage buff. Crafted at Greymane Camp kitchen.
- Guardian's Broth -- Effect: Plus defense buff. Crafted at Greymane Camp kitchen.
- Explorer's Trail Mix -- Effect: Plus stamina buff. Crafted at Greymane Camp kitchen.
- Alchemist's Tea -- Effect: Plus artifact power buff. Crafted at Greymane Camp kitchen.
Source: dexora.gg life skills guide [2026-03-17] -- Tier 2 (pre-launch guide, unverified names)

#### Named Alchemy Recipes [NEEDS REVIEW] -- Flagged: 2026-03-17 (Run 11)
dexora.gg lists these alchemy recipe names. Same caveat as cooking.
- Health Potion -- Effect: Instant health restore. Crafted at camp alchemy lab.
- Stamina Elixir -- Effect: Stamina restore. Crafted at camp alchemy lab.
- Fire Oil -- Effect: Weapon fire coating for a duration. Crafted at camp alchemy lab.
- Antidote -- Effect: Cure status/poison. Crafted at camp alchemy lab.
- Resistance Tonic -- Effect: Temporary elemental resistance. Crafted at camp alchemy lab.
Source: dexora.gg life skills guide [2026-03-17] -- Tier 2 (pre-launch guide, unverified names)

#### Meat on Toast [Consumable Item] -- Flagged: 2026-03-17 (Run 11)
- Named consumable food that restores health. Used extensively in gameplay footage.
- Likely a basic cooking recipe: meat + bread-type ingredient.
- Source: YouTube transcript 08bOU_cfNW4 [2026-03-17] -- Tier 3 (direct transcript observation) The Fextralife crafting guide confirms the app's cooking / alchemy / blacksmithing / camp-upgrade categories are accurate. Specific recipes at launch will need a follow-up run.

#### Elemental Oils [Recipe / Consumable] [NEEDS REVIEW] -- Flagged: 2026-03-16 (Run 10)
- Description: Three types confirmed: fire oil, frost oil, lightning oil. Applied to weapons to add elemental damage for a duration. Used to exploit enemy elemental weaknesses. Described as essentials to carry in combat.
- Crafting type: alchemy (likely)
- Not in the RECIPES array or any other app data.
- Source: crimsondesert.club beginner guide [2026-03-16] -- Tier 3
- Needs review: Ingredient list and exact effects unknown pre-launch. Add to RECIPES post-launch with confirmed data.

### Characters

#### Yann [Greymane Companion NPC] [NEEDS REVIEW]
- Description: Named Greymane companion NPC. No further details available pre-launch.
- Source: Fextralife Wiki (https://crimsondesert.wiki.fextralife.com/Crimson+Desert+Wiki)
- Flagged: 2026-03-15
- Needs review: No NPC or companion data structure exists in game-data.ts. Would require a new exported array and interface. Also has insufficient detail to build any meaningful entry.

#### Naira [Greymane Companion NPC] [NEEDS REVIEW]
- Description: Named Greymane companion NPC. No further details available pre-launch.
- Source: Fextralife Wiki (https://crimsondesert.wiki.fextralife.com/Crimson+Desert+Wiki)
- Flagged: 2026-03-15
- Needs review: No NPC data structure in game-data.ts. An image (`naira.png`) already exists in `/public/assets/`. Add once NPC interface is defined and details are available post-launch.

#### Ronie [Camp NPC] [NEEDS REVIEW]
- Description: Operates the Base Camp Food Shop at Greymane Camp. Named NPC with a specific camp function.
- Source: Fextralife Wiki (https://crimsondesert.wiki.fextralife.com/Greymane+Camp)
- Flagged: 2026-03-15
- Needs review: No NPC data structure in game-data.ts. Consider adding an NPC array (or extending CampFacility to reference an operator NPC).

### NPCs / Characters (Run 2)

#### Marius [Greymane Companion NPC] [NEEDS REVIEW]
- Description: Greymane member found injured in Hernand with a leg wound early in the game. Knows the whereabouts of other scattered Greymanes including Naira and Yann. Dialogue: "I'm just glad I'm still breathing."
- Source: YouTube transcript (video 1ItNYP9U1M0) -- Tier 3 (confirmed story context, single source)
- Flagged: 2026-03-15 (Run 2)
- Needs review: No NPC data structure in game-data.ts. An image may or may not exist in /public/assets/. Add once NPC interface is defined.

#### Russo [Greymane Companion NPC] [NEEDS REVIEW]
- Description: Greymane member. Carried Marius to Hernand after the Black Bear ambush and is now actively searching for Abyss Artifacts on behalf of the Greymanes.
- Source: YouTube transcript (video 1ItNYP9U1M0) -- Tier 3
- Flagged: 2026-03-15 (Run 2)
- Needs review: No NPC data structure in game-data.ts.

#### Aliston [Abyss NPC] [NEEDS REVIEW]
- Description: Overseer of the Library of Providence within The Abyss. Describes the Abyss as "the center of all worlds." Gives Kliff his mission to correct Rifts that threaten Providence. Connected to the main story arc involving Gian's will.
- Source: YouTube transcript (video 1ItNYP9U1M0) -- Tier 3
- Flagged: 2026-03-15 (Run 2)
- Needs review: No NPC data structure in game-data.ts.

#### White Crow [Abyss NPC / Guardian] [NEEDS REVIEW]
- Description: "Guardian of the Abyss." Appears alongside Aliston. Acts as a bridge between Providence and the world. Teaches Kliff the flying/gliding ability in the Abyss ("Have you ever imagined flying?"). Likely tied to the ability unlock for aerial traversal.
- Source: YouTube transcript (video 1ItNYP9U1M0) -- Tier 3
- Flagged: 2026-03-15 (Run 2)
- Needs review: No NPC data structure in game-data.ts.

#### Bon Midler [Hernand Official NPC] [NEEDS REVIEW]
- Description: Man responsible for "keeping peace in Hernand." Acts as an early quest-giver in Hernand, sending Kliff to investigate the Sky Boulder incident and apprehend Red Smoke bandits.
- Source: YouTube transcript (video 1ItNYP9U1M0) -- Tier 3
- Flagged: 2026-03-15 (Run 2)
- Needs review: No NPC data structure in game-data.ts.

#### Shakatu [Black Desert Crossover NPC] [NEEDS REVIEW]
- Description: Merchant character crossing over from Black Desert. Becomes the new Branch Master of the Gold Leaves goblin guild after Kliff defeats Split Horn. Story function: provides merchant network support for finding Greymane comrades.
- Source: YouTube transcript (video 1ItNYP9U1M0) -- Tier 3; corroborated by Black Desert crossover announcement (Tier 2)
- Flagged: 2026-03-15 (Run 2)
- Needs review: No NPC data structure in game-data.ts.

### Map Locations / Regions

#### Calphade [New Region?] [NEEDS REVIEW]
- Description: War-torn battlefield region where Kliff searches for a Greymane comrade and fights Cassius Morten. The official Twitter refers to it as a "region." However, it does NOT appear on the Fextralife Locations wiki as one of the 6 main regions (Hernand, Pailune, Demeniss, Delesyia, Crimson Desert, The Abyss). No map wiki source lists Calphade as a major region. Calphade appears to be a named sub-territory or story area -- possibly within Demeniss territory, given the Calphadean political ties to Marquis Stefan Lanford's estate.
- Source: Crimson Desert official Twitter (https://x.com/CrimsonDesert_/status/1933109818455449807), Fextralife Locations (Calphade NOT in region list -- confirmed absence 2026-03-15)
- Flagged: 2026-03-15; Researched: 2026-03-15 (Run 4)
- Decision needed post-launch: Is Calphade a 7th region (add to Region type + REGIONS array) or a named sub-area under an existing region? If sub-area, Cassius Morten's boss entry would use the parent region instead.
- Researched: 2026-03-16 (Run 9) -- Fextralife Locations page (fetched directly) continues to list only 5 regions + Abyss. Calphade absent from all third-party map sources. The continent codex lists 573 territories -- Calphade is likely one of those sub-territories, not a 7th major region. Still requires launch confirmation. No change to status.

#### Hernand Sub-Locations [Points of Interest] [NEEDS REVIEW]
- The following named locations in Hernand are confirmed but not reflected in the app's fast-travel or map data:
  - Roothold
  - Nas River / Nas River Fishing Dock
  - Antumbra Ritual Grounds
  - Bluemont Manor
  - The Eldertree
  - Hernand Highway
  - Hernand Castle
- Source: Fextralife Wiki (https://crimsondesert.wiki.fextralife.com/Locations)
- Flagged: 2026-03-15
- Needs review: No sub-location or point-of-interest data structure in game-data.ts. These could be added as fast-travel collectibles if they serve as waypoints, or they need a new POI structure. Human decision required on data model.

#### Unicorn Cliffs [Hernand Sub-Zone] [NEEDS REVIEW]
- Description: Sub-zone in or near Hernand. Home to goblin faction. Site of Split Horn boss fight.
- Source: Sportskeeda (https://www.sportskeeda.com/esports/all-bosses-crimson-desert)
- Flagged: 2026-03-15
- Needs review: No sub-location data structure in game-data.ts.

#### Marni's Masterium [Delesyia Sub-Zone] [NEEDS REVIEW]
- Description: Specific named location within Delesyia. Protected by the Golden Star boss (mechanical dragon). Not currently named in the app's region data.
- Source: Game8 (https://game8.co/games/Crimson-Desert/archives/583946)
- Flagged: 2026-03-15
- Needs review: No sub-location data structure in game-data.ts.

#### Raventine Monastery [Region Unknown] [NEEDS REVIEW]
- Description: Location tied to Hexe Marie's backstory. She lost her child here. Region TBD.
- Source: Fextralife Wiki (https://crimsondesert.wiki.fextralife.com/Bosses)
- Flagged: 2026-03-15
- Needs review: Region unknown; no sub-location data structure in game-data.ts.

#### Library of Providence [The Abyss Sub-Zone] [NEEDS REVIEW]
- Description: Named location within The Abyss dimension.
- Source: Fextralife Wiki (https://crimsondesert.wiki.fextralife.com/Locations)
- Flagged: 2026-03-15
- Needs review: Referenced as a feature in the Abyss RegionInfo entry added this run. No sub-location data structure in game-data.ts for a more detailed entry.

#### Akman Plains [Named Location] [NEEDS REVIEW] -- Flagged: 2026-03-16 (Run 10)
- Description: Named location referenced as a spot for taming wild horses with higher sprint and stamina stats. Described as "wild grasslands."
- Likely region: Hernand or Pailune (based on grassland/highland terrain descriptions).
- Not in any region's POI list in REGIONS array.
- Source: crimsondesert.club beginner guide [2026-03-16] -- Tier 3
- Needs review: Region assignment unknown. Add to the appropriate REGIONS entry's `pois` array post-launch, with type 'other' or a new POI type.

#### The Abyss [Missing from REGIONS Array] [ADDED -- 2026-03-15]
- Added as sixth entry in REGIONS array with id: 'abyss'. Description sourced from Fextralife Locations wiki. Features include Library of Providence and Skyloop Bridge (both confirmed by Fextralife).

### Greymane Camp

#### Barber Shop [Camp Facility] [ADDED -- 2026-03-15]
- Added to CAMP_FACILITIES. Description sourced from Fextralife Greymane Camp wiki. Upgrade tiers left empty pending post-launch data.

#### Dyehouse Shop [Camp Facility] [ADDED -- 2026-03-15]
- Added to CAMP_FACILITIES. Description sourced from Fextralife Greymane Camp wiki. Upgrade tiers left empty pending post-launch data.

#### Trading Center [Camp Facility] [ADDED -- 2026-03-15]
- Added to CAMP_FACILITIES. Description sourced from Fextralife Greymane Camp wiki. Upgrade tiers left empty pending post-launch data.

#### Personal Resting House [Camp Facility] [ADDED -- 2026-03-15]
- Added to CAMP_FACILITIES. Description sourced from Fextralife Greymane Camp wiki. Upgrade tiers left empty pending post-launch data.

### Inventory Items

No new specific inventory items were found in this run beyond what the app already contains.

### Character Builds

No new specific builds were found that warrant adding to the app's data layer, as builds are currently handled in the app's guide-style content rather than structured data.

---

## Outdated / Incorrect Entries to Fix

### Reed Devil - Region Mismatch [RESOLVED -- CONFIRMED CORRECT]
- Current value in game-data.ts: `region: 'pailune'` -- THIS IS CORRECT, NO CHANGE NEEDED
- Resolution: The apparent conflict is now explained. Game8 describes Reed Devil as "a former slum-dweller of Hernand" (backstory/origin), but Fextralife confirms the boss fight is in Frozen Soul Mountain ("haunts the vast reed fields of the Frozen Soul Mountain"). Frozen Soul Mountain is independently confirmed as Pailune territory by the existing MOUNTS data: `Frost Salamander` has `region: 'pailune', acquisition: 'Found in Frozen Soul Mountain caves'`. Two consistent sources confirm Frozen Soul Mountain = Pailune. The boss's origin story is Hernand; the fight location is Pailune.
- Source: Fextralife Wiki, game-data.ts (Frost Salamander Pailune/Frozen Soul Mountain cross-reference)
- Researched and resolved: 2026-03-15 (Run 4)

### Balgran Shield - Dual Listing Issue [RESOLVED -- 2026-03-15]
- Resolution: Edition collectible renamed from `'Balgran Shield'` to `'Balgran Shield (Deluxe Edition)'` to distinguish it from Oongka's gameplay weapon entry of the same name. The gameplay weapon (`character: 'oongka'`, `type: 'Shield'`, `atk: 15, spd: 40, rng: 10`) is unchanged. The edition collectible (`category: 'edition'`, `location: 'Deluxe Edition Bonus'`) now has a distinct name consistent with how other edition items are named.
- Source: Fextralife Wiki, game-data.ts cross-reference
- Flagged: 2026-03-15; Resolved: 2026-03-15

### REGIONS Array Missing 'The Abyss' [ADDED -- 2026-03-15]
- Fixed: Added The Abyss as a sixth entry in the REGIONS array with id: 'abyss'.

### Matthias - Region Assignment [ADDED -- 2026-03-15]
- Changed `region: 'demeniss'` to `region: 'hernand'` in BOSSES array.
- Confirmed by: Fextralife Wiki ("town square of Hernand") and Game8 ("Kliff encounters in Hernand while searching for his comrades"). Two independent sources.
- Flagged: 2026-03-15 (Run 1); Confirmed 2026-03-15 (Run 2); Applied 2026-03-15 (Run 3)

### Difficulty Field -- No In-Game Difficulty Settings [ARCHITECTURE NOTE]
- Finding: Crimson Desert has NO adjustable difficulty settings. The Director of Marketing confirmed: "At this point, there are no difficulty settings. There is a single difficulty curve for the game." Enemies have set, non-scaling power levels.
- Implication: The app's `difficulty` field in the Boss interface (`'normal' | 'hard' | 'extreme' | 'legendary'`) is entirely an editorial construct -- it is NOT sourced from any in-game stat. This is fine and should be preserved as the app's own ranking system. All new boss entries will use the app's own scale.
- Source: Multiple sources including Adventure Gamers, Beebom, allthings.how (2026-03-15)
- Note: No change needed in game-data.ts or types. Documenting for future data imports so contributors understand this is an app-defined field.

### Aliston NPC Name -- Possible Spelling Discrepancy [NEEDS REVIEW]
- Queue entry uses: "Aliston"
- Fextralife Wiki uses: "Alustin the Alchemist" (for the Library of Providence overseer in The Abyss)
- These may be the same character under a slightly different romanization, or different characters entirely. Verify at launch before creating any NPC data entry.
- Source: Fextralife Locations wiki (fetched 2026-03-15)
- Flagged: 2026-03-15 (Run 4)

### Damiane Claymore -- Type Name Should Be "Greatsword" [NEEDS REVIEW] -- Flagged: 2026-03-17 (Run 11), Updated: 2026-03-17 (Run 12)
- Current value in game-data.ts: `{ name: "Damiane's Claymore", type: 'Claymore', atk: 65, spd: 40, rng: 35, character: 'damiane' }`
- Run 11 proposed changing to "Dual Blades" -- this was WRONG. Dual Blades are Kliff's weapon, not Damiane's.
- Confirmed correct type name: "Greatsword" (2 independent sources: Beebom, Game8). The weapon itself is correct (large two-handed sword), just the type label should change from 'Claymore' to 'Greatsword'.
- Damiane is also missing Rapier, Musket, and Pistol weapon entries (confirmed by Director of Marketing and multiple sources).
- Severity: Low for the rename (Claymore and Greatsword are functionally similar). Medium for missing weapons.
- Source: Beebom, Game8, GamesRadar, Director of Marketing interview [2026-03-17]

### Walter Lanford Region + Element -- Confirmed Wrong [NEEDS REVIEW] -- Flagged: 2026-03-17 (Run 11), Updated: 2026-03-18 (Run 13)
- Current value in game-data.ts: `{ region: 'desert', element: 'fire', reward: 'Hand Cannon Blueprint' }`
- **Region:** App has 'desert' -- CONFIRMED WRONG. Run 13 fetched the Fextralife Walter Lanford page directly. Location is "Fort Warspike." Source conflict: Fextralife dedicated page = "Fort Warspike"; game8/Beebom general boss list = "Alfonso Estate." BOTH locations are sub-zones, neither is the Crimson Desert region. Region 'desert' is wrong regardless of which sub-zone is correct.
  - Fort Warspike (military fort name) and Alfonso Estate (manor name) could potentially be the same compound referred to by different sources. Requires launch confirmation of which is the canonical in-game location name and which main region it maps to.
  - Likely parent region: Hernand or Demeniss based on the estate/fort setting and the "Marquis Stefan Lanford" connection to Calphade (which may be Demeniss territory).
- **Element:** App has 'fire' -- LIKELY WRONG. The Fextralife Walter Lanford page lists his attacks as: Double Barrel Shot, Double Barrel Barrage, Scattershot, Shrapnel Shower, and a smoke-pouch repositioning ability. None of these attacks have a fire attribute -- they are all ballistic/physical. "Crimson shrapnel" in one search summary could be a loose descriptor, not a game element. Element should likely be 'physical'. Flag for post-launch confirmation.
- **Reward:** 'Hand Cannon Blueprint' -- NOT CONFIRMED. Fextralife lists his reward as "???" (unconfirmed). This is editorial.
- Source: Fextralife Walter Lanford wiki [2026-03-18, fetched directly] -- Tier 1; game8/Beebom boss lists -- Tier 2

### Skill Names in SKILLS Array -- Mass Accuracy Issue [NEEDS REVIEW] -- Flagged: 2026-03-16 (Run 10)
- The SKILLS array uses invented/editorial names for Kliff's abilities. The Beebom skills article (Tier 2, from direct preview gameplay) confirms the actual in-game names are substantially different.
- This affects the following branches: Sword Mastery (Blue), Unarmed Combat (Blue), Ranged and Bow (Blue), and all Green and Red branch skills for Kliff.
- Recommended action: Audit the SKILLS array against the full confirmed in-game skill list post-launch and rename entries to match official in-game text. New entries will also need to be created for skills not currently in the array.
- Severity: High. The app presents incorrect skill names to users.
- Source: Beebom skills article (https://beebom.com/crimson-desert-skills/) [2026-03-16] -- Tier 2
- Note: Damiane and Oongka skill names have not been confirmed from an authoritative source yet, so their current names may or may not be accurate. Flag for post-launch verification as well.

### Knowledge Codex Data Not Represented [NEEDS REVIEW]
- The app does not currently surface the Knowledge Codex system or its 2,921-entry breakdown (467 people, 573 territories, 401 creatures, 76 bosses, 110 factions, 355 crafting manuals, 29 mount types). This is a significant game mechanic that could be surfaced as an activity or progress tracker in the app.
- Source: Sportskeeda (https://www.sportskeeda.com/esports/with-3000-knowledge-entries-crimson-desert-easily-beats-rdr2-exploration-compendium)
- Flagged: 2026-03-15

---

## Recently Added (Archive)

### Flagged 2026-03-18 (Run 13) -- Launch Eve / Embargo Lift Pass

**Context:** Game launches tomorrow (March 19, 2026). Review embargo lifted March 18 at 11PM CET / 3PM PT. Reviews are now publishing but are too recent for specific game data to be extracted. Post-launch runs (Run 14+) should yield full verified data from wikis and guides.

- **FULL SKILL TREE LIST CONFIRMED** [Skills] -- allthings.how (Tier 2) published a complete breakdown of all three Kliff skill branches. Blue (Stamina/16 levels): 32 named skills across Unarmed, Archery, and Armed sub-trees. Green (Spirit/14 levels): 20 named skills. Red (Health/18 levels): 10 named skills. Central: Falling Palm. The SKILLS array needs a complete rewrite. Full list added to Skills section above.
- **Falling Palm unlock condition confirmed** [Skills] -- allthings.how confirms it unlocks after completing any single branch (NOT by default). Previous conflicting summary was incorrect. Source conflict documented in Skills section.
- **Kearush the Slayer in app -- partial verification** [Bosses] -- The app's Kearush entry has correct region (hernand) and element (physical). Reward 'Slayer Claw Materials' and weakness 'fire' are editorial/unconfirmed. New confirmed mechanic: rideable during fight. Full details in Bosses section.
- **Walter Lanford element likely WRONG** [Bosses / Corrections] -- App has element 'fire' but Fextralife confirms his attacks are purely ballistic (Double Barrel Shot, Scattershot, Shrapnel Shower) with no fire attribute. Element should be 'physical'. Also, region 'desert' is wrong (Fort Warspike sub-zone, not Crimson Desert region). Reward 'Hand Cannon Blueprint' is editorial. All three fields need post-launch correction.
- **Khaled Shield** [Collectibles] -- Pre-order bonus shield confirmed by Pearl Abyss official FAQ. Not in COLLECTIBLES array. Ready to add as edition category item.
- **Review embargo lifted** [Meta] -- Embargo lifted March 18 at 11PM CET. Metacritic tracking 80-85 range. PS5 reviews initially delayed (Pearl Abyss blocked early console access). No game-specific data extracted from reviews yet -- too early. Run 14 post-launch should yield much richer data from wiki contributors.
- **No cross-save confirmed** [Meta / FAQ] -- Pearl Abyss official FAQ confirms no cross-save support. Not relevant to game data but confirms platform saves are isolated.
- **Game is playable offline after initial setup** [Meta / FAQ] -- Day 1 patch required, then fully offline capable. Not relevant to game data.
- **Denuvo DRM on PC** [Meta] -- PC version ships with Denuvo. Not relevant to game data, but notable for app FAQ content if added.

### Flagged 2026-03-17 (Run 11) -- New Items

- **Damiane Claymore -- Rename to Greatsword** [Weapons] -- Run 11 incorrectly proposed changing to Dual Blades (dexora.gg was wrong). Run 12 verified: Damiane uses Greatsword (Beebom, Game8). Type name 'Claymore' should become 'Greatsword'. Dual Blades belong to Kliff. Also missing Rapier, Musket, Pistol entries for Damiane.
- **Oongka Fists -- Universal System, Not Weapon Entry** [Weapons] -- Run 11 proposed adding as Oongka-specific weapon. Run 12 verified: Fists/unarmed is a universal combat system for all characters, not a character-specific weapon. Oongka is actually missing Axes and Arm Cannon weapon entries.
- **Prixia Swords** [Weapons] -- Named faction weapons found in Gold Leaf HQ weapon rack. Not in WEAPONS array. Likely a specific named weapon type.
- **Marni's Excavatron** [Bosses] -- Confirmed boss name for the large mechanical construct in Delesyia (Marni's Masterium). The 'Delesyian Automaton' entry in the app may be this boss under a placeholder name. Requires reconciliation.
- **Walter Lanford Region Correction** [Bosses] -- App lists region 'desert' but Fextralife says "Fort Warspike" (sub-zone, not mapped to main regions). Game8 says "Alfonso Estate." Current 'desert' assignment is likely wrong. Needs launch verification.
- **Kailock the HornSplitter Full Name** [Bosses] -- Boss is confirmed to be fully named "Kailock, the HornSplitter." App does not have this boss in BOSSES array (only documented in research doc).
- **Meat on Toast** [Inventory/Recipes] -- Named consumable food item. Health recovery. Source: YouTube transcript 08bOU_cfNW4.
- **Lavender** [Inventory/Crafting Material] -- Named gathering material, likely used in alchemy. Source: YouTube transcript 08bOU_cfNW4.
- **Battery Stat** [Game Mechanics] -- A "Battery" stat with a thunderbolt icon appears in the pause menu. Not surfaced anywhere in the app. Likely used for operating ancient tech machinery in Delesyia.
- **Goodwill Stat** [Game Mechanics] -- Individual NPC relationship stat shown above NPC names. Separate from the Trust/reputation system already documented. Source: YouTube transcript 08bOU_cfNW4.
- **Temperature Gauge** [Game Mechanics] -- Dynamic temperature display above mini-map. Observed 21.4 degrees C outdoors, 50 degrees C inside burning building. Gameplay implications (stamina, survival) unconfirmed.
- **Alustin / Alliston name correction** [NPCs] -- The research doc NPC "Aliston" should be "Alustin the Alchemist" (Fextralife) or "Alliston the Alchemist" (video transcript). No NPC data structure in app yet, but name should be standardized when added.
- **Barden Middler name correction** [NPCs] -- Previously logged as "Bon Midler," now confirmed as "Barden Middler" (Fextralife article) or "Barden Miller" (video transcript). Name should be corrected in the research doc and used when an NPC structure is added.
- **Named Cooking Recipes** [Recipes] -- dexora.gg confirms named recipes: Fish Stew (stamina), Grilled Trout (health), Rare Sashimi (damage boost), Warrior's Feast (damage), Guardian's Broth (defense), Explorer's Trail Mix (stamina), Alchemist's Tea (artifact power). CAUTION: These names are from a pre-launch guide and may be editorial. Verify post-launch before adding to RECIPES array.
- **Named Alchemy Recipes** [Recipes] -- dexora.gg confirms: Health Potion, Stamina Elixir, Fire Oil (weapon coating), Antidote, Resistance Tonic. Same caveat as cooking recipes. Verify post-launch.

### Flagged 2026-03-16 (Run 10) -- Pending Human Review / Post-Launch
- **Skill Name Accuracy** [Skills] -- MAJOR: App skill names for Kliff's tree do not match confirmed in-game names. Run 13 (2026-03-18) now has the FULL confirmed list from allthings.how. Full list documented in Skills section. Needs human decision on rewrite timing.
- **Falling Palm** [Skill] -- Central connecting skill. Confirmed: unlocks after completing one branch (allthings.how Tier 2). Not in app. Needs branch assignment decision (suggest 'central' or 'mastery' branch).
- **Dual Blades** [Weapon] -- S-tier weapon type confirmed, not in WEAPONS array.
- **Hernand Iron Sword** [Weapon] -- Named early quest reward sword, not in WEAPONS array.
- **Wanderer's Leather Set** [Armor] -- Named armor set with +10% stamina recovery, not in any app data.
- **Elemental Oils** [Recipe/Consumable] -- Fire, frost, lightning oils, not in RECIPES array.
- **"A Blacksmith's Debt"** [Quest] -- Named Hernand side quest, Tier 3 only, needs post-launch confirmation.
- **Akman Plains** [Map Location] -- Named horse taming location, not in POI data.
- **Wolf / Direwolf Mount** [Mounts] -- Confirmed with saddle, 'wolf' category not in MountCategory type.
- **Vehicle Mounts** [Mounts] -- War Robot, Hot Air Balloon, Wagon, Skiff -- no matching category in MountCategory type.
- **Artillery Weapon Category** [Weapons] -- "Master of Artillery" trophy implies distinct category from Firearms.
- **35 Trophies** [Achievements] -- Full trophy list confirmed, not in app data.

### Applied 2026-03-15 (Run 3)

- **Matthias** [Boss / Correction] -- Corrected region from 'demeniss' to 'hernand'. Confirmed by Fextralife Wiki and Game8 (2 independent sources).

### Added 2026-03-15 (Run 1)

- **The Abyss** [Region] -- Added as sixth entry in REGIONS array. Source: Fextralife Locations wiki.
- **Grotevant Plate Set** [Collectible / Edition] -- Added to COLLECTIBLES['edition'] as PlayStation 5 Exclusive Bonus. Source: Fextralife main wiki.
- **Barber Shop** [Camp Facility] -- Added to CAMP_FACILITIES. Upgrade tiers pending. Source: Fextralife Greymane Camp wiki.
- **Dyehouse Shop** [Camp Facility] -- Added to CAMP_FACILITIES. Upgrade tiers pending. Source: Fextralife Greymane Camp wiki.
- **Trading Center** [Camp Facility] -- Added to CAMP_FACILITIES. Upgrade tiers pending. Source: Fextralife Greymane Camp wiki.
- **Personal Resting House** [Camp Facility] -- Added to CAMP_FACILITIES. Upgrade tiers pending. Source: Fextralife Greymane Camp wiki.

### Flagged 2026-03-15 (Run 2) -- Pending Human Review / Post-Launch
- **Marius** [NPC] -- Greymane comrade, injured, found in Hernand. Story-significant NPC. Needs NPC data structure.
- **Russo** [NPC] -- Greymane member searching for artifacts. Needs NPC data structure.
- **Aliston** [NPC] -- Library of Providence overseer. Needs NPC data structure.
- **White Crow** [NPC] -- Abyss guardian, ties to flying ability unlock. Needs NPC data structure.
- **Bon Midler** [NPC] -- Hernand peacekeeper / quest giver. Needs NPC data structure.
- **Shakatu** [NPC] -- Black Desert crossover merchant, Gold Leaves Branch Master. Needs NPC data structure.
- **Radiant Fragments** [Collectible?] -- May be alternate name for Abyss Artifacts. Verify at launch.
- **Sky Boulder Investigation** [Quest] -- Early Hernand quest. Name/reward TBD at launch.
- **The Gold Leaves Duel** [Quest] -- Faction quest defeating Split Horn. Official quest name TBD.
- **Rakash correction** -- Previously logged as character "Rakkash"; confirmed via transcript to be a goblin word for "duel." No character named Rakkash exists.

### Flagged 2026-03-16 (Run 10) -- New Items

- **Wolf / Direwolf Mount** [Mounts] -- New mount category 'wolf' confirmed. Shown with proper saddle in release date trailer. Acquisition unknown. Requires 'wolf' added to MountCategory union type before entries can be created. See Mounts section below.
- **Vehicle Mounts** [Mounts] -- War Robot, Hot Air Balloon, Wagon, Skiff confirmed as rideable. No matching MountCategory type. Likely need a new 'vehicle' or 'vessel' category. See Mounts section below.
- **Akman Plains** [Map Location] -- Named horse taming location. Not in any region's POI list. Add as POI to appropriate region (likely Hernand or Pailune based on grassland description).
- **Skill Name Accuracy Issue** [Skills] -- The app's SKILLS array uses invented names (Quick Slash Combo, Blade Storm Finisher, etc.). The actual in-game skill names confirmed by Beebom's skill tree article are substantially different (Forward Slash, Turning Slash, Blinding Flash, Pump Kick, Dropkick, Vault, Flying Kick, Meteor Kick, Nature's Echo, Fist of Flame, Veil of Fog, Mantle of Frost, Surge of Sparks, Winch, Focus, Charged Shot, Evasive Shot, etc.). This is a major data quality gap. Requires comprehensive skills rewrite post-launch once the full in-game text is confirmed. Flag for human review.
- **Falling Palm** [Skill] -- Central skill unlocked after completing one of the three color branches. "Unleash a powerful blow to the ground by harnessing the force of the fall and channeling all your Stamina into the strike." Not in the app's SKILLS array. Source: Beebom [2026-03-16] -- Tier 2.
- **"A Blacksmith's Debt"** [Quest] -- Named side quest in Hernand involving the town blacksmith. Not in QUESTS array. Source: crimsondesert.club [2026-03-16] -- Tier 3. Add once quest type and reward are confirmed post-launch.
- **Elemental Oils** [Inventory] -- Consumable items (fire oil, frost oil, lightning oil) that apply elemental effects to weapons. Not in RECIPES or any item data. Source: crimsondesert.club [2026-03-16] -- Tier 3.
- **Wanderer's Leather Set** [Weapon/Armor] -- Armor set providing +10% stamina recovery boost. Crafted using wolf pelts and thick leather. Not in any app data. Source: crimsondesert.club [2026-03-16] -- Tier 3.
- **Hernand Iron Sword** [Weapon] -- Early quest reward sword with higher Stagger rating than the starter blade. Not in WEAPONS array. Source: crimsondesert.club [2026-03-16] -- Tier 3.
- **35 Trophies** [Achievements] -- Full trophy list confirmed. Not in app data. Consider adding a trophy/achievement tracker feature. Confirms: multiple Abyss areas (Conqueror of the Abysses, plural), Artillery as a distinct weapon category (Master of Artillery), mount taming as a progression path (Tamer of Legends). Source: gamingbible.com [2026-03-16] -- Tier 2.
- **Artillery Weapon Category** [Weapons] -- "Master of Artillery" trophy implies Artillery is a distinct combat category from Firearms (Master of Firearms is a separate trophy). This may refer to Hand Cannons, siege weapons, or mounted weapons. No existing app weapon has 'Artillery' as a type. Requires post-launch confirmation.
- **Dual Blades** [Weapons] -- Confirmed as S-tier weapon in pre-launch tier list (crimsondeserthub.com). Not present in app's WEAPONS array as a weapon type. Distinct from Daggers (which focus on speed) -- Dual Blades specifically chain attacks for max combo potential. Source: crimsondeserthub.com [2026-03-16] -- Tier 2.
