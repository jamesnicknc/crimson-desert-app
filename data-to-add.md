# Crimson Companion App -- Data To Add / Fix

_Last updated: 2026-03-16 (Run 10)_

Items are organized by category and priority. Mark items as `[ADDED]` once they've been incorporated into the app.

---

## New Data to Add

### Skills

No new named skills were found in this run that are absent from the current app skill list. The app's SKILLS array appears comprehensive for the three confirmed characters and their known branches. The observation-learned skills already present (Belly Slam, Force Palm) are consistent with what sources describe.

#### Skill Name Accuracy Issue [MAJOR GAP] [NEEDS REVIEW] -- Flagged: 2026-03-16 (Run 10)
- The app's SKILLS array uses editorially invented names that do not match confirmed in-game skill names.
- The Beebom skills article (Tier 2 source, based on direct gameplay preview) provides the actual in-game names for Kliff's skill tree.
- Examples of discrepancies:
  - App uses "Quick Slash Combo" -- actual skills are "Forward Slash (3 levels)" and "Turning Slash (3 levels)"
  - App uses "Blade Storm Finisher" -- actual skill is "Blinding Flash Finisher" / "Sword Flurry"
  - App uses "Body Slam" (branch: Unarmed) -- actual game has both "Body Slam" and "Clothesline" and "Dropkick" as separate skills
  - App has no "Pump Kick", "Dropkick", "Vault", "Flying Kick", "Meteor Kick" (all confirmed Blue branch unarmed skills)
  - App has no "Nature's Echo", "Nature's Snare", "Keen Senses" (confirmed Green branch spirit skills)
  - App has no "Fist of Flame", "Veil of Fog", "Mantle of Frost", "Surge of Sparks", "Winch" (confirmed Red branch health skills)
  - App has no "Axiom Force" (confirmed flight/aerial skill)
  - App has no "Falling Palm" (the central connecting skill of all three branches)
- Action needed: A comprehensive skill tree rewrite post-launch with the full in-game text. This is a data quality problem, not just a gap. The current names are plausible but incorrect.
- Source: Beebom (https://beebom.com/crimson-desert-skills/) [2026-03-16] -- Tier 2
- Flagged: 2026-03-16 (Run 10). Requires human decision: rewrite now with known names, or wait until post-launch for the full confirmed list.

#### Falling Palm [Central Skill] [NEEDS REVIEW] -- Flagged: 2026-03-16 (Run 10)
- Description: "Unleash a powerful blow to the ground by harnessing the force of the fall and channeling all your Stamina into the strike."
- This skill sits at the convergence point of all three skill branches and is unlocked after completing any one of the three color trees. It is a distinct skill, not a branch ability.
- Currently absent from the SKILLS array entirely.
- Source: Beebom skills article [2026-03-16] -- Tier 2
- Needs review: Does this belong in a new branch (e.g. "Mastery" or "Core"), or as a standalone entry? Character assignment would be 'kliff'.

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

No new specific recipes were found in this run. The Fextralife crafting guide confirms the app's cooking / alchemy / blacksmithing / camp-upgrade categories are accurate. Specific recipes at launch will need a follow-up run.

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

### Flagged 2026-03-16 (Run 10) -- Pending Human Review / Post-Launch
- **Skill Name Accuracy** [Skills] -- MAJOR: App skill names for Kliff's tree do not match confirmed in-game names from Beebom Tier 2 source. Needs full rewrite post-launch.
- **Falling Palm** [Skill] -- Central connecting skill for all three branches. Not in app. Needs branch assignment decision.
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
