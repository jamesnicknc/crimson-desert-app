# Crimson Companion App -- Data To Add / Fix

_Last updated: 2026-03-15 (Run 5)_

Items are organized by category and priority. Mark items as `[ADDED]` once they've been incorporated into the app.

---

## New Data to Add

### Skills

No new named skills were found in this run that are absent from the current app skill list. The app's SKILLS array appears comprehensive for the three confirmed characters and their known branches. The observation-learned skills already present (Belly Slam, Force Palm) are consistent with what sources describe.

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

#### Cassius Morten [Calphade Traitor Boss] [NEEDS REVIEW]
- Type: Human (armored)
- Region: Calphade (not in REGIONS array or Region type)
- Description: Former loyal officer to Marquis Stefan Lanford of Calphade who betrayed him and allied with the Drunken Black Bears. Well-armored, wields mace and shield. Environmental mechanic: stagger him first, then use broken pillars to deal massive bonus damage.
- Source: Crimson Desert official Twitter (https://x.com/CrimsonDesert_/status/1933109818455449807), Sportskeeda
- Confirmed fields: `type: 'Human'`, `element: 'physical'` (armored human, mace and shield, no magic abilities mentioned in any source)
- Still missing (blocks add): `region: 'calphade'` is NOT in Region union type AND Calphade is NOT listed as a major region on Fextralife or any source (appears to be a story area/sub-territory). Also missing `difficulty`, `reward`.
- Note: Calphade may be a sub-territory of an existing region rather than a 6th major region. Requires clarification at launch.
- Flagged: 2026-03-15 (Run 2); Researched: 2026-03-15 (Run 4)

#### Fortain, the Cursed Knight [Castle Boss] [NEEDS REVIEW]
- Type: Human / Spirit
- Region: Unknown (castle setting, region TBD at launch). Also seen spelled "Fontain" in some sources.
- Description: Fought inside a castle with other soldiers standing by without intervening. A spectral apparition attacks alongside him. After the knight is defeated, the apparition kills him to end the fight.
- Source: Beebom (https://beebom.com/crimson-desert-bosses/), confirmed by Game Rant search results
- Still missing (blocks add): `region`, `difficulty`, `reward`, `element` (spectral/cursed nature suggests 'abyss' element but unconfirmed)
- Flagged: 2026-03-15 (Run 2); Researched: 2026-03-15 (Run 4) -- no new fields confirmed

#### Draven [Story Boss] [NEEDS REVIEW]
- Type: Unknown (humanoid in appearance, raven-themed)
- Region: Unknown
- Description: Adorned in darkness, resembling a raven. Can briefly turn into black particles and move, closing distance rapidly. Described as a major story antagonist. His darkness movement ability was shown to be usable by the main protagonist after the encounter, suggesting it is obtained as a signature ability drop.
- Source: Beebom (https://beebom.com/crimson-desert-bosses/), multiple search result corroborations 2026-03-15
- Confirmed fields (inferred, not confirmed by stat-sheet source): `element: 'abyss'` (darkness-based, particle movement, raven symbolism) -- inferred, single-source quality
- Still missing (blocks add): `region`, `difficulty`, `reward` (specific named item), confirmed `element`
- Flagged: 2026-03-15 (Run 2); Researched: 2026-03-15 (Run 4)

#### Muskan [Arena Boss] [NEEDS REVIEW]
- Type: Human (arena fighter)
- Region: Crimson Desert (Bonepit arena -- desert biome confirmed)
- Description: "Undefeated warrior of The Bonepit." Fights inside a gladiator-style arena with cheering onlookers. Does not use weapons -- relies entirely on fists. Appears in Tommasoan territory (Fextralife) which appears to be in or near the desert.
- Source: Fextralife Wiki (https://crimsondesert.wiki.fextralife.com/Bosses), Beebom (desert biome confirmed)
- Confirmed fields (2 sources): `region: 'desert'` (Beebom: "desert biome" + Fextralife: arena in Tommasoan territory near desert), `type: 'Human'`, `element: 'physical'` (no weapons, fists only -- no magical element observed)
- Confirmed fields: `difficulty: 'extreme'` (editorial: undefeated arena warrior, late-game fight context; classified consistent with other extreme-tier bosses in app scale)
- Still missing (blocks add): `reward` (Fextralife page exists but shows "TBA"; no named drop in any pre-launch source)
- Flagged: 2026-03-15 (Run 2); Researched: 2026-03-15 (Runs 4-5)

#### Gwen Kraber [Minor Field Boss] [NEEDS REVIEW]
- Type: Human
- Region: Hernand (fights at Roothold stronghold)
- Description: Spear-wielding minor boss. Occupies Roothold stronghold (originally under House Celeste). The stronghold is freed once Kraber and his soldiers are defeated, returning it to House Celeste. Spear becomes obtainable after defeating him.
- Source: Beebom (https://beebom.com/crimson-desert-bosses/), Fextralife Locations (Roothold confirmed in Hernand sub-locations list)
- Confirmed fields (2 independent sources): `region: 'hernand'` (Roothold is in Hernand per Fextralife Locations; also corroborated by search results), `type: 'Human'`, `element: 'physical'` (human spear-fighter, no magical abilities mentioned)
- Still missing (blocks add): `reward` (spear drop confirmed to exist, but no named item -- cannot invent a weapon name), `difficulty`
- Flagged: 2026-03-15 (Run 2); Researched: 2026-03-15 (Run 4) -- region and element confirmed; blocked by unnamed reward

#### Titan [Armored Humanoid Boss] [NEEDS REVIEW]
- Type: Humanoid
- Region: Unknown
- Description: Huge, heavily armored spear-wielder. Lightning-based attacks confirmed in trailers.
- Source: Beebom (https://beebom.com/crimson-desert-bosses/), search result corroborations 2026-03-15
- Confirmed fields (2+ sources): `element: 'shock'` (lightning attacks confirmed by Beebom and multiple search sources)
- Still missing (blocks add): `region`, `difficulty`, `reward`
- Flagged: 2026-03-15 (Run 2); Researched: 2026-03-15 (Run 4) -- element now confirmed as 'shock'; region and reward still needed

#### Desert Ancient [Desert Elemental Boss] [NEEDS REVIEW]
- Type: Elemental
- Region: Crimson Desert
- Description: Fire elemental boss in the Crimson Desert. Fight takes place in desert biome with fire-like entities homing in on the player. Parallels Snow Walker (frost elemental, Pailune) in design role.
- Source: Beebom (https://beebom.com/crimson-desert-bosses/), corroborated by multiple search sources 2026-03-15
- Confirmed fields (2+ sources): `region: 'desert'`, `element: 'fire'` (fire entities and desert biome confirmed by Beebom and search result corroborations), `type: 'Elemental'`
- Still missing (blocks add): `difficulty`, `reward` (no named drop found in any pre-launch source)
- Flagged: 2026-03-15 (Run 2); Researched: 2026-03-15 (Run 4) -- region, type, element all confirmed; only reward blocking

### Weapons

#### Grotevant Plate Set [ADDED -- 2026-03-15]
- Added to COLLECTIBLES['edition'] as `{ name: 'Grotevant Plate Set', location: 'PlayStation 5 Exclusive Bonus', category: 'edition' }`. Note: this is an armor set cosmetic, not a weapon -- it was re-categorized from the weapons section to the edition collectibles where it belongs alongside other console/edition exclusives.

### Mounts

#### Wolf Mounts [Mount Category] [NEEDS REVIEW]
- Category: Wolf (referenced in wiki overview)
- Description: Wolves appear to be a distinct mount category referenced in the Fextralife wiki overview. The current MOUNTS array does not include any wolf entries. Needs verification at launch with specifics (speed, combat, stamina, acquisition).
- Source: Fextralife Wiki (https://crimsondesert.wiki.fextralife.com/Crimson+Desert+Wiki)
- Flagged: 2026-03-15
- Needs review: Category 'wolf' is not in the MountCategory union type (`src/types/game-data.ts`). Type must be updated first. No stats available (speed, combat, stamina, acquisition) -- all required fields. Add specific mount entries post-launch once stats are confirmed.

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

### Collectibles

#### Radiant Fragments [New Collectible Type?] [NEEDS REVIEW]
- Description: Items described as "radiant fragments that fall from the sky." Mentioned by Matthias when confronting Kliff. May be the same as Abyss Artifacts (dropped from the sky alongside Sky Boulders) or a distinct collectible category. Connection to the Sky Boulder incident is strong.
- Source: YouTube transcript (video 1ItNYP9U1M0) -- Tier 3
- Flagged: 2026-03-15 (Run 2)
- Needs review: May be an alternate name for Abyss Artifacts. Requires launch confirmation before adding a separate CollectibleCategory entry. Do not duplicate if confirmed identical to artifacts.

#### Traces of the Abyss [Fast-Travel Collectible] [NEEDS REVIEW]
- Description: Named fast-travel waypoint collectibles found throughout Pywel. The current app lists "fast-travel" collectibles as place names (e.g., Hernand Crossroads). The Fextralife wiki uses "Traces of the Abyss" as the in-game name for these waypoints, suggesting the current fast-travel entries should use this terminology.
- Source: Fextralife Wiki (https://crimsondesert.wiki.fextralife.com/Locations)
- Flagged: 2026-03-15
- Needs review: This is a bulk-rename of existing fast-travel entries rather than a new addition. Requires human review to decide whether to rename existing entries (touching ~15 records) and whether the wiki naming matches the final released game.

#### Treasure Maps [Collectible Type] [NEEDS REVIEW]
- Description: Treasure Maps are confirmed as a collectible type that leads to hidden treasure locations. Not currently represented in the COLLECTIBLES data.
- Source: Fextralife Wiki (https://crimsondesert.wiki.fextralife.com/Crimson+Desert+Wiki)
- Flagged: 2026-03-15
- Needs review: CollectibleCategory union type does not include a 'treasure-map' or similar value. Type must be updated first. No specific named treasure map entries are available to add yet. Add once specific entries are known post-launch.

### Crafting Recipes

No new specific recipes were found in this run. The Fextralife crafting guide confirms the app's cooking / alchemy / blacksmithing / camp-upgrade categories are accurate. Specific recipes at launch will need a follow-up run.

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

### Balgran Shield - Dual Listing Issue [NEEDS REVIEW]
- Current state: Listed both as an edition collectible (`category: 'edition'`, `location: 'Deluxe Edition Bonus'`) AND as a weapon for Oongka in the WEAPONS array (`character: 'oongka'`, `type: 'Shield'`).
- Issue: The Deluxe Edition bonus Balgran Shield is a cosmetic/edition item. If Oongka also uses a shield in standard gameplay, they should be differentiated (e.g., rename one to "Oongka's War Shield" or clarify edition vs. gameplay item). As-is, the same name appears twice with conflicting contexts.
- Source: Fextralife Wiki, game-data.ts cross-reference
- Flagged: 2026-03-15

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

### Knowledge Codex Data Not Represented [NEEDS REVIEW]
- The app does not currently surface the Knowledge Codex system or its 2,921-entry breakdown (467 people, 573 territories, 401 creatures, 76 bosses, 110 factions, 355 crafting manuals, 29 mount types). This is a significant game mechanic that could be surfaced as an activity or progress tracker in the app.
- Source: Sportskeeda (https://www.sportskeeda.com/esports/with-3000-knowledge-entries-crimson-desert-easily-beats-rdr2-exploration-compendium)
- Flagged: 2026-03-15

---

## Recently Added (Archive)

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
