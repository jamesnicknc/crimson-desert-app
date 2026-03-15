# Crimson Companion App -- Data To Add / Fix

_Last updated: 2026-03-15_

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
- Description: Leader of a goblin guild at Unicorn Cliffs. Summoned by a character named Rakkash.
- Source: Fextralife Wiki, Game8 (https://crimsondesert.wiki.fextralife.com/Bosses)
- Flagged: 2026-03-15
- Needs review: Boss name/region verified from sources, but required fields `difficulty`, `reward`, and `element` are not available in any pre-launch source. Cannot add without these fields.

#### Cassius Morten [Calphade Traitor Boss] [NEEDS REVIEW]
- Type: Human (armored)
- Region: Calphade (newly revealed region, not in REGIONS array)
- Description: Calphadean traitor. Well-armored, wields mace and shield. Environmental mechanic: use nearby pillars to deal bonus damage. Encountered while searching for a Greymane comrade.
- Source: Crimson Desert official Twitter, Sportskeeda (https://www.sportskeeda.com/esports/all-bosses-crimson-desert)
- Flagged: 2026-03-15
- Needs review: Region 'calphade' not in Region type; missing required fields `difficulty`, `reward`, `element`. Calphade region also requires a complete RegionInfo entry before this boss can be added.

#### Fortain, the Cursed Knight [Castle Boss] [NEEDS REVIEW]
- Type: Human / Spirit
- Region: Unknown (castle setting, region TBD at launch)
- Description: Fought in a castle. Has a spectral apparition companion that attacks alongside him. After the knight is defeated, the apparition kills him to end the fight.
- Source: Beebom (https://beebom.com/crimson-desert-bosses/)
- Flagged: 2026-03-15
- Needs review: Region unknown; missing required fields `region`, `difficulty`, `reward`, `element`.

#### Draven [Story Boss] [NEEDS REVIEW]
- Type: Unknown (possibly humanoid or magical)
- Region: Unknown
- Description: "Adorned in darkness, resembling a raven." Described as a major story antagonist.
- Source: Beebom (https://beebom.com/crimson-desert-bosses/)
- Flagged: 2026-03-15
- Needs review: Region, type, and all required stat fields unknown. Single community-facing source only.

#### Muskan [Arena Boss] [NEEDS REVIEW]
- Type: Human (arena fighter)
- Region: Crimson Desert (Bonepit arena)
- Description: "Undefeated warrior of The Bonepit." Extended combat encounter in an arena context. May align with the desert region.
- Source: Fextralife Wiki (https://crimsondesert.wiki.fextralife.com/Bosses)
- Flagged: 2026-03-15
- Needs review: Boss confirmed by Fextralife Wiki. Region is plausibly 'desert' but not explicitly stated. Missing required fields `difficulty`, `reward`, `element`. Add once these are confirmed at launch.

#### Gwen Kraber [Minor Field Boss] [NEEDS REVIEW]
- Type: Human
- Region: Unknown (remote camp setting)
- Description: Spear-wielding opponent in a remote camp. Classified as a minor boss.
- Source: Beebom (https://beebom.com/crimson-desert-bosses/)
- Flagged: 2026-03-15
- Needs review: Region unknown; missing required fields `region`, `difficulty`, `reward`, `element`.

#### Titan [Armored Humanoid Boss] [NEEDS REVIEW]
- Type: Humanoid
- Region: Unknown
- Description: Heavily armored spear-wielder with lightning-based attacks. Seen in trailers.
- Source: Beebom (https://beebom.com/crimson-desert-bosses/)
- Flagged: 2026-03-15
- Needs review: Region unknown; missing required fields `region`, `difficulty`, `reward`. Element may be 'shock' (lightning-based attacks in description), but needs confirmation.

#### Desert Ancient [Desert Elemental Boss] [NEEDS REVIEW]
- Type: Elemental (fire)
- Region: Crimson Desert
- Description: Fire elemental boss in the desert. Fills a similar niche to Snow Walker (ice elemental, Pailune) but for the desert region.
- Source: Beebom (https://beebom.com/crimson-desert-bosses/)
- Flagged: 2026-03-15
- Needs review: Region ('desert') and element ('fire') are likely correct, but missing required fields `difficulty` and `reward`. Single source only. Add once confirmed at launch.

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

No new named quests were found in this run beyond what the app currently contains. The minigame / side activity list (betting, horse racing, target shooting, arm wrestling, mud fights) may warrant addition as activity entries or side quest entries in the app.

### Collectibles

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

### Map Locations / Regions

#### Calphade [New Region] [NEEDS REVIEW]
- Description: War-torn battlefield region not currently in the REGIONS array. Confirmed by official Pearl Abyss Twitter and PAX West 2025 demo. Boss Cassius Morten is fought here. May be a sub-region of an existing area or a new sixth major region.
- Source: Crimson Desert official Twitter (https://x.com/CrimsonDesert_/status/1933109818455449807)
- Flagged: 2026-03-15
- Needs review: Existence confirmed by official source. However, a complete RegionInfo entry requires `subtitle`, `description`, `color`, and `features` -- none of which are available from current sources. Also 'calphade' must be added to the Region union type before use. Add once full region data is available post-launch.

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

### Reed Devil - Region Mismatch [NEEDS REVIEW]
- Current value in game-data.ts: `region: 'pailune'`
- Issue: Game8 wiki states Reed Devil "terrorizes Hernand" and calls him "a slum-dweller." Fextralife notes he inhabits reed fields of Frozen Soul Mountain (which is in Pailune). Sources conflict. The Fextralife description places him physically in Pailune (Frozen Soul Mountain), while Game8 characterizes him as originating from Hernand. Recommend keeping 'pailune' until launch confirmation, but flag for review.
- Source: Fextralife Wiki, Game8 (https://game8.co/games/Crimson-Desert/archives/583946)
- Flagged: 2026-03-15

### Balgran Shield - Dual Listing Issue [NEEDS REVIEW]
- Current state: Listed both as an edition collectible (`category: 'edition'`, `location: 'Deluxe Edition Bonus'`) AND as a weapon for Oongka in the WEAPONS array (`character: 'oongka'`, `type: 'Shield'`).
- Issue: The Deluxe Edition bonus Balgran Shield is a cosmetic/edition item. If Oongka also uses a shield in standard gameplay, they should be differentiated (e.g., rename one to "Oongka's War Shield" or clarify edition vs. gameplay item). As-is, the same name appears twice with conflicting contexts.
- Source: Fextralife Wiki, game-data.ts cross-reference
- Flagged: 2026-03-15

### REGIONS Array Missing 'The Abyss' [ADDED -- 2026-03-15]
- Fixed: Added The Abyss as a sixth entry in the REGIONS array with id: 'abyss'.

### Matthias - Region Assignment Uncertainty [NEEDS REVIEW]
- Current value in game-data.ts: `region: 'demeniss'`
- Issue: Fextralife places him as fighting "in Hernand town square." Game8 describes him as captain of the Wandering Freeswords without a specific region. May need correction to 'hernand'. Flag for verification at launch.
- Source: Fextralife Wiki (https://crimsondesert.wiki.fextralife.com/Bosses)
- Flagged: 2026-03-15

### Knowledge Codex Data Not Represented [NEEDS REVIEW]
- The app does not currently surface the Knowledge Codex system or its 2,921-entry breakdown (467 people, 573 territories, 401 creatures, 76 bosses, 110 factions, 355 crafting manuals, 29 mount types). This is a significant game mechanic that could be surfaced as an activity or progress tracker in the app.
- Source: Sportskeeda (https://www.sportskeeda.com/esports/with-3000-knowledge-entries-crimson-desert-easily-beats-rdr2-exploration-compendium)
- Flagged: 2026-03-15

---

## Recently Added (Archive)

### Added 2026-03-15

- **The Abyss** [Region] -- Added as sixth entry in REGIONS array. Source: Fextralife Locations wiki.
- **Grotevant Plate Set** [Collectible / Edition] -- Added to COLLECTIBLES['edition'] as PlayStation 5 Exclusive Bonus. Source: Fextralife main wiki.
- **Barber Shop** [Camp Facility] -- Added to CAMP_FACILITIES. Upgrade tiers pending. Source: Fextralife Greymane Camp wiki.
- **Dyehouse Shop** [Camp Facility] -- Added to CAMP_FACILITIES. Upgrade tiers pending. Source: Fextralife Greymane Camp wiki.
- **Trading Center** [Camp Facility] -- Added to CAMP_FACILITIES. Upgrade tiers pending. Source: Fextralife Greymane Camp wiki.
- **Personal Resting House** [Camp Facility] -- Added to CAMP_FACILITIES. Upgrade tiers pending. Source: Fextralife Greymane Camp wiki.
