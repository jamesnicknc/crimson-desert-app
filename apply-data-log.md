# Crimson Companion App -- Data Apply Log

Each entry records one manual run of the apply-data task.

---

## Run: 2026-03-20 (Run 16) -- Post-Launch Day 2 / Twitch Drops Pass

**Result:** Success
**Items processed:** 14
**Items added:** 11 (Twitch Drop collectibles)
**Items skipped (needs review):** 0
**Items skipped (already in app):** 3 (Kailok, Marni's Excavatron, Walter Lanford corrections)
**Items skipped (unconfirmed):** 0
**Images generated:** 0
**Images set to coming-soon placeholder:** 0
**TypeScript build:** Clean (only pre-existing errors in InteractiveMap.tsx for missing react-leaflet types, unrelated to game-data.ts)

### Added This Run
- Blue Scout Lantern -- Collectible (edition / Twitch Drop Week 1)
- Blue Scout Earring -- Collectible (edition / Twitch Drop Week 1)
- Blue Scout Necklace -- Collectible (edition / Twitch Drop Week 1)
- Blue Scout Ring -- Collectible (edition / Twitch Drop Week 1)
- Blue Scout Shield -- Collectible (edition / Twitch Drop Week 1)
- Blue Scout Cloak -- Collectible (edition / Twitch Drop Week 1)
- Blue Scout Armor -- Collectible (edition / Twitch Drop Week 1)
- Blue Scout Hat -- Collectible (edition / Twitch Drop Week 1)
- Blue Scout Stirrups -- Collectible (edition / Twitch Drop Week 2)
- Blue Scout Champron -- Collectible (edition / Twitch Drop Week 2)
- Blue Scout Saddle -- Collectible (edition / Twitch Drop Week 2)

### Skipped / Flagged This Run
- Kailok the Hornsplitter [READY TO ADD] -- Already present in BOSSES array with full data (region hernand, reward Sword of the Lord, etc.). Queue entry marked as already in app.
- Marni's Excavatron [READY TO ADD] -- Already present in BOSSES array (region hernand, reward Mining Knuckledrill). Queue entry marked as already in app.
- Walter Lanford corrections (region desert->hernand, element fire->physical) -- Already applied in a prior run. Queue entry marked as already applied.
- Myurdin region correction -- STALE. Queue says current value is 'demeniss' but actual value is 'hernand'. A separate 'Lava Myurdin' entry already exists with region 'pailune'. Human review needed to determine if base Myurdin should also be 'pailune' or if first encounter is indeed in Hernand.
- Fortain the Cursed Knight reward (Unknown TBD -> Shackle of Might) -- Only 1 source (PowerPyx). Corrections require 2+ sources per task rules. Left as [NEEDS REVIEW].
- Fortain element (abyss -> physical) -- Same single-source issue. Left as [NEEDS REVIEW].
- All other items marked [NEEDS REVIEW] in the queue were left untouched per task rules.

### Notes
- **Queue data correction:** The original Twitch Drops queue entry listed 8 items with incorrect watch times (e.g., 180 min instead of 120 min for accessories). Verification against game8 (Tier 1) and web search (multiple sources) revealed 11 cosmetic items total. Three items were missing from the queue: Blue Scout Lantern (Week 1, 60 min), and Week 2 had 3 separate horse tack items (Stirrups/Champron/Saddle) not 1 "Horse Armor." The consumable "10x Modest Braised Meat" was excluded as it is not a cosmetic collectible.
- **Significant queue items already applied:** Between Run 14 and Run 16, a nightly run (Run 15) added many items to game-data.ts including Kailok, Marni's Excavatron, Lava Myurdin, all story bosses through Chapter 8, Draven the Crowcaller, recipe data, weapon data, and more. The queue entries for these items were not updated to reflect their addition. This run updated the queue status for the items it encountered.
- **Human attention needed on Myurdin:** The base Myurdin entry (first encounter) has region 'hernand' and element 'physical' with reward 'Axiom Bracelet'. The Lava Myurdin entry (fire transformation) has region 'pailune', element 'fire', reward 'Melted Ambition'. The queue correction about changing Myurdin region from 'demeniss' to 'pailune' is stale since the value is now 'hernand'. Determine whether the first encounter location (Hills of No Return) is in Hernand or Pailune. Chapter 5 context and map UI would resolve this.
- **TypeScript baseline note:** The project has 2 pre-existing TS errors in InteractiveMap.tsx (missing @types/react-leaflet and @types/leaflet). These errors predate this run and are unrelated to game-data.ts. All game-data changes compile cleanly.
- Backup file game-data.ts.bak could not be removed (OneDrive filesystem lock -- Operation not permitted). It remains in the workspace but is harmless.

---

## Run: 2026-03-18 (Run 14) -- Launch Eve Queue Pass, No Additions

**Result:** Success (no items to add)
**Items processed:** 1 (Kearush [PARTIALLY VERIFIED] reviewed; all others skipped per [NEEDS REVIEW] rule)
**Items added:** 0
**Items skipped (needs review):** All active queue items (every pending item is [NEEDS REVIEW])
**Items skipped (unconfirmed):** 0
**Images generated:** 0
**Images set to coming-soon placeholder:** 0
**TypeScript build:** Clean (no changes to game-data.ts)

### Added This Run
- None

### Skipped / Flagged This Run
- All active queue items are marked [NEEDS REVIEW] and were left for human review per task rules.

### Notes
- This run processed the Run 13 queue (2026-03-18, embargo lift day). All new items flagged by Run 13 carry [NEEDS REVIEW] status: the full Kliff skill list rewrite, Falling Palm description correction, Khaled Shield collectible, Walter Lanford corrections. None could be auto-applied.
- **Kearush [PARTIALLY VERIFIED]:** The only non-[NEEDS REVIEW] item. Run 13 confirmed region 'hernand' and element 'physical' are correct. Reward ('Slayer Claw Materials') and weakness ('fire') remain editorial placeholders with no verified replacements. No changes made.
- **IMPORTANT -- Falling Palm queue error corrected:** The Run 13 queue entry stated Falling Palm is "Currently absent from the SKILLS array entirely." This is WRONG. Falling Palm IS in game-data.ts as `id: 'k-c1'` (branch: 'Core', cost: 'Convergence'). However, the app's description says "unlocked after mastering all three branches" which conflicts with the verified source (allthings.how, Beebom, Sportskeeda all say "any single branch"). The queue entry has been updated to reflect this. This description correction needs human approval as it updates user-visible text.
- **Khaled Shield:** The item is verified by Pearl Abyss official FAQ (Tier 1) and would be straightforward to add (`{ name: 'Khaled Shield', location: 'Pre-Order Bonus (All Platforms)', category: 'edition' }`). However it is tagged [NEEDS REVIEW] and cannot be auto-applied. Human can approve this one directly -- no blocking issues.
- **Skill rewrite decision pending for human:** Run 13 confirmed the full Kliff skill tree from multiple Tier 2 sources. Many existing Kliff skill names in the app are incorrect (editorial names, not in-game text). The full confirmed list is in data-to-add.md. This requires a human decision on whether to rewrite the SKILLS array now (pre-launch) or wait for post-launch in-game text to verify every skill.
- The game launched March 19-20, 2026. Post-launch runs (Run 15+) should yield confirmed reward data for the 8+ pending boss entries. Recommend running this task on March 20-21 once wikis populate with launch data.
- data-to-add.md includes Run 13 content (2026-03-18) that was not previously pushed to GitHub. This run pushes both the Run 13 queue updates and this run log entry together.
- Workspace git state continues to show noise modifications due to OneDrive sync issue (per CLAUDE.md). All file comparisons confirmed against /tmp clone.

---

## Run: 2026-03-17 (Run 12) -- Verification Pass, No Additions

**Result:** Partial (verification-only, corrected queue errors)
**Items processed:** 3
**Items added:** 0
**Items skipped (needs review):** 3
**Items skipped (unconfirmed):** 0
**Images generated:** 0
**Images set to coming-soon placeholder:** 0
**TypeScript build:** Clean (no changes to game-data.ts)

### Added This Run
- None

### Skipped / Flagged This Run
- **Damiane's Dual Blades [CRITICAL CORRECTION]** -- REJECTED. The dexora.gg source (Tier 2) incorrectly attributed Dual Blades to Damiane. Verification against Beebom, Game8, GamesRadar, and a Director of Marketing interview confirms Damiane uses a Greatsword (plus Rapier, Musket, Pistol). Dual Blades belong to Kliff. Updated queue entry to reflect that the type name should change from "Claymore" to "Greatsword" instead. Marked [SOURCES CONFLICT -- NEEDS REVIEW].
- **Oongka's Fists [New Weapon]** -- REJECTED. Verification confirms fists/unarmed is a universal combat system for all characters, not an Oongka-specific equipped weapon. Oongka's actual weapons are Axes, Warhammer (already in app), and Arm Cannon (missing). Marked [NEEDS REVIEW].
- **Prixia Swords [Named Weapon/Faction Item]** -- Skipped. Tier 3 source only (YouTube transcript). Body text already says "Needs review."

### Notes
- This run found ZERO items that could be cleanly added to game-data.ts. All pending items are either [NEEDS REVIEW], blocked by missing required fields, or failed source verification.
- IMPORTANT FINDING: The dexora.gg weapons guide (used as a Tier 2 source in Run 11) contains incorrect weapon-character assignments. It attributed Dual Blades to Damiane and Fists as Oongka-specific. Both are wrong per multiple higher-quality sources. Recommend downgrading dexora.gg to Tier 3 for weapon data and requiring cross-verification for any future entries sourced from it.
- The Damiane weapon entry ("Damiane's Claymore") is close to correct but should be renamed to "Damiane's Greatsword" with type 'Greatsword'. This is a minor correction that needs human approval since it changes a user-visible weapon name.
- The app is missing several confirmed weapons: Damiane's Rapier, Damiane's Musket, Damiane's Pistol, Oongka's Axes, Oongka's Arm Cannon. These should be added post-launch with confirmed stats.
- Game launches March 19, 2026. The next productive data run should be March 20-21, 2026 when wiki reward/stat data becomes available to unblock the 8+ pending boss entries.
- The workspace git state shows game-data.ts as modified (OneDrive merge state issue per CLAUDE.md), but a diff against the remote confirms the file matches GitHub. The Run 11 abort was due to this false positive. Future runs should use the /tmp clone comparison method to verify actual uncommitted changes.

---

## Run: 2026-03-16 (Run 11) -- Aborted: Uncommitted Changes in game-data.ts

**Result:** Aborted
**Items processed:** 0
**Items added:** 0
**Items skipped (needs review):** 0
**Items skipped (unconfirmed):** 0
**Images generated:** 0
**Images set to coming-soon placeholder:** 0
**TypeScript build:** Not run (aborted at pre-flight Step 0a)

### Added This Run
- None

### Skipped / Flagged This Run
- None

### Notes
Aborted at pre-flight Step 0a. `src/lib/game-data.ts` has uncommitted local changes (472-line diff vs HEAD). Per task rules, the run cannot proceed while game-data.ts has uncommitted changes.

Inspection of the diff reveals the uncommitted changes are substantial and appear to be from a prior session:
- Added `Trophy` type import and `TROPHIES` exported array (35 trophy entries sourced from gamingbible.com)
- Added `RegionPOI` type import and `pois` arrays to all six REGIONS entries
- Cleared invented collectibles (artifact, gear, recipe, lore arrays emptied with a post-launch placeholder comment)
- Cleared invented recipes (cooking, alchemy, blacksmith recipes removed; only confirmed dye recipes remain)
- Cleaned up QUESTS array (removed unverified side quests; kept only confirmed main/faction/character/liberation quests)
- Added skill entries for Damiane and Oongka branches
- Removed invented names from multiple entries and replaced with post-launch placeholder descriptions

These changes are valid and appear intentional. The issue is they were never committed.

**Action required before next run:** Commit (or stash) the current uncommitted changes to `src/lib/game-data.ts` and `src/types/game-data.ts`. A quick `git diff HEAD -- src/types/game-data.ts` should also be checked to see if the Trophy and RegionPOI types need to be committed together.

Once committed, re-run this task. The queue has no new actionable items pre-launch (game releases March 19-20, 2026), so the next productive data run is on or after March 21, 2026.

---

## Run: 2026-03-15 (Run 6) -- Balgran Shield Deduplication

**Result:** Success
**Items processed:** 1
**Items added:** 0
**Items corrected:** 1
**Items skipped (needs review):** 0
**TypeScript build:** Clean

### Fixed This Run
- Balgran Shield dual listing -- Renamed edition collectible from `'Balgran Shield'` to `'Balgran Shield (Deluxe Edition)'` to eliminate the name collision with Oongka's gameplay weapon entry. No other fields changed on either record.

### Notes
- All 8 pending boss entries remain blocked by the `reward` field. Game releases March 19, 2026 -- recommend a follow-up data run on or after March 20 once wiki reward data is populated.
- No other actionable queue items exist pre-launch. Remaining [NEEDS REVIEW] items require either post-launch data, a new NPC data structure, or an architectural decision (sub-location model, CollectibleCategory expansion, etc.).

---

## Run: 2026-03-15 (second run)

**Result:** Partial
**Items processed:** 28
**Items added:** 6
**Items skipped (needs review):** 20
**Items skipped (unconfirmed):** 0
**Images generated:** 0
**Images set to coming-soon placeholder:** 0
**TypeScript build:** Clean

### Added This Run
- The Abyss -- Region (REGIONS array)
- Grotevant Plate Set -- Collectible / Edition (COLLECTIBLES['edition'])
- Barber Shop -- Camp Facility (CAMP_FACILITIES)
- Dyehouse Shop -- Camp Facility (CAMP_FACILITIES)
- Trading Center -- Camp Facility (CAMP_FACILITIES)
- Personal Resting House -- Camp Facility (CAMP_FACILITIES)

### Skipped / Flagged This Run
- Split Horn -- Needs Review: missing required fields (difficulty, reward, element)
- Cassius Morten -- Needs Review: region 'calphade' not in Region type; missing required fields
- Fortain, the Cursed Knight -- Needs Review: region unknown; missing required fields
- Draven -- Needs Review: region and type unknown; missing all required stat fields
- Muskan -- Needs Review: missing required fields (difficulty, reward, element)
- Gwen Kraber -- Needs Review: region unknown; missing required fields
- Titan -- Needs Review: region unknown; missing required fields
- Desert Ancient -- Needs Review: missing required fields (difficulty, reward)
- Wolf Mounts -- Needs Review: 'wolf' not in MountCategory type; no stats available
- Traces of the Abyss -- Needs Review: bulk rename of existing entries; human decision required
- Treasure Maps -- Needs Review: category not in CollectibleCategory type; no specific entries
- Yann -- Needs Review: no NPC data structure; no detail available
- Naira -- Needs Review: no NPC data structure (image naira.png exists)
- Ronie -- Needs Review: no NPC data structure
- Calphade Region -- Needs Review: existence verified but RegionInfo fields incomplete
- Hernand Sub-Locations -- Needs Review: no sub-location data structure
- Unicorn Cliffs -- Needs Review: no sub-location data structure
- Marni's Masterium -- Needs Review: no sub-location data structure
- Raventine Monastery -- Needs Review: no sub-location data structure
- Library of Providence -- Needs Review: referenced as Abyss feature; no sub-location structure
- Reed Devil region mismatch -- Left unchanged; sources conflict (Pailune vs Hernand)
- Balgran Shield dual listing -- Needs Review: same name in both edition collectibles and weapons
- Matthias region uncertainty -- Left unchanged; flagged for launch verification
- Knowledge Codex -- Needs Review: feature suggestion requiring app architecture decision

### Notes
- All 8 boss queue entries are missing at least one required field from the Boss interface (difficulty, reward, or element). Sources (Fextralife, Game8, Beebom, Sportskeeda) confirm boss names and approximate regions but do not provide stat-level data pre-launch. A follow-up run post-launch with wiki data populated should be able to add all of these.
- The 4 new CAMP_FACILITIES entries (Barber Shop, Dyehouse Shop, Trading Center, Personal Resting House) were added with empty `upgrades: []` arrays. Upgrade tier data is not yet available. A follow-up run should populate these once the game ships and facility upgrade paths are documented.
- 'calphade' does not exist in the Region union type. If Calphade becomes a confirmed major region (rather than a sub-zone), both `src/types/game-data.ts` (Region type) and `src/lib/game-data.ts` (REGIONS array) will need updating before any Calphade-region bosses can be added.
- The backup file `game-data.ts.bak` could not be deleted due to a filesystem permission restriction. Safe to delete manually.
- No images were needed for any added entries (The Abyss uses color/text display; camp facilities and collectibles do not require images in the current UI).

---

## Run: 2026-03-15 (Run 5) -- Deep Research Pass + Commit

**Result:** Partial (research complete; no new game-data.ts entries -- writes blocked by missing reward data)
**Items processed:** 8 bosses reviewed in depth
**Items added:** 0 (no new game-data.ts writes)
**Items skipped (needs review):** 8 bosses (all blocked by missing `reward` field)
**Items skipped (unconfirmed):** 0
**Images generated:** 0
**Images set to coming-soon placeholder:** 0
**TypeScript build:** Clean (verified pre- and post-research)

### Added This Run
- None. All pending bosses require a named `reward` field which is not available in any pre-launch source.

### Skipped / Flagged This Run

All 8 pending bosses remain [NEEDS REVIEW]. After exhaustive source checks across Fextralife Wiki (individual boss pages), Game8.co, Beebom, Sportskeeda, crimsondeserthub.com, and web search, the blocking issue for every boss is the same: the `reward` field in the Boss interface is a required string, and no pre-launch source provides named reward items for any of the 8 pending bosses. Fextralife boss pages that exist have "TBA" or "Boss Drops and Rewards go here" placeholders. Three boss pages (Gwen Kraber, Desert Ancient, Draven) return 404 -- not yet created on the wiki.

Additional confirmed data documented in data-to-add.md during this run:
- Split Horn: difficulty classified as 'hard' (Fextralife: "fairly easy match" despite high evasion; only 1 HP bar; early Hernand boss)
- Muskan: Tommasoan Territory / The Bonepit (sub-area of Crimson Desert region). Relies entirely on fists (no weapons). Classified as 'extreme' based on fight description and position in game progression.
- Kearush the Slayer: confirmed Hernand Castle (already correct in app as `region: 'hernand'`)

### Notes
- Game releases March 19, 2026 (4 days from now). Reward names will be on the wiki within days of launch. Recommend a follow-up run on or after March 20.
- The single blocking field for ALL 8 bosses is `reward`. All other fields (region, type, element) are now documented or confirmed for most bosses. A single post-launch run should be able to add all 8.
- Committing accumulated data task changes (game-data.ts Matthias fix, data-to-add.md enrichments, run logs) as requested.
- `src/app/layout.tsx`, `STYLE_GUIDE.md`, and `crimson-desert-research.md` are NOT included in this commit -- they are outside the scope of the data task.

---

## Run: 2026-03-15 (Run 4) -- Research Pass

**Result:** Aborted (pre-flight: game-data.ts has uncommitted changes from Run 3)
**Items processed:** 0 (research-only pass -- no writes to game-data.ts)
**Items added:** 0
**Items skipped (needs review):** 0
**Items skipped (unconfirmed):** 0
**Images generated:** 0
**Images set to coming-soon placeholder:** 0
**TypeScript build:** Not run (aborted before write phase)

### Added This Run
- None (writes blocked by pre-flight)

### Skipped / Flagged This Run
- All 8 boss entries remain blocked: `reward` field not available in any pre-launch source. Game launches March 19, 2026 (4 days from now). Reward names will be confirmable post-launch.

### Research Findings (data-to-add.md updated with these)

**Confirmed new partial data for bosses:**
- Split Horn: `region: 'hernand'` CONFIRMED (2 sources), `type: 'Humanoid'` -- still needs reward
- Gwen Kraber: `region: 'hernand'` CONFIRMED (2 sources, Roothold = Hernand per Fextralife), `type: 'Human'`, `element: 'physical'` -- spear drop confirmed to exist but unnamed
- Muskan: `region: 'desert'` confirmed (Beebom: desert biome + Fextralife: Tommasoan territory arena), `type: 'Human'`, `element: 'physical'` (fists only) -- still needs reward
- Desert Ancient: `region: 'desert'`, `element: 'fire'`, `type: 'Elemental'` all confirmed (2+ sources) -- still needs reward
- Titan: `element: 'shock'` CONFIRMED (lightning attacks, 2+ sources) -- still needs region and reward
- Cassius Morten: `type: 'Human'`, `element: 'physical'` confirmed -- double-blocked by calphade region type + missing reward
- Draven: `element: 'abyss'` inferred (single source, darkness-based) -- region and reward unknown
- Fortain the Cursed Knight: no new fields confirmed (also spelled "Fontain" in some sources)

**Corrections resolved:**
- Reed Devil `region: 'pailune'` CONFIRMED CORRECT. Apparent conflict resolved: "slum-dweller of Hernand" is backstory, not boss location. Frozen Soul Mountain (fight location) is Pailune territory, corroborated by Frost Salamander mount entry already in game-data.ts. No change to game-data.ts needed.

**Architecture notes added to queue:**
- No difficulty settings in Crimson Desert (single difficulty curve). App's `difficulty` field is entirely editorial -- this is expected and fine.
- "Aliston" (queue) vs "Alustin the Alchemist" (Fextralife) -- possible name discrepancy for Library of Providence NPC. Verify at launch.
- Calphade appears NOT to be a 7th major region. Not listed on Fextralife Locations or any map source. Likely a sub-territory/story area. Decision required post-launch on whether to map Cassius Morten to a parent region.

### Notes
- Game releases March 19, 2026 (4 days). Reward drop names for all pending bosses will be available post-launch. Recommend re-running this task on or after March 20, 2026.
- The single blocking field for ALL 8 pending bosses is `reward`. All other fields (region, type, element) are now partially or fully confirmed for most bosses. One focused post-launch run should be able to add all of them.
- To clear the pre-flight blocker for the next run: commit the current game-data.ts changes (Matthias region fix from Run 3).

---

## Run: 2026-03-15 (Run 3)

**Result:** Success
**Items processed:** 1
**Items added:** 1 (correction)
**Items skipped (needs review):** 0
**Items skipped (unconfirmed):** 0
**Images generated:** 0
**Images set to coming-soon placeholder:** 0
**TypeScript build:** Clean

### Added This Run
- Matthias -- Boss / Correction (region changed from 'demeniss' to 'hernand')

### Skipped / Flagged This Run
- All other items were already marked [NEEDS REVIEW], [ADDED], or otherwise not actionable. No new items were processed.

### Notes
- The Matthias region correction was verified against two independent Tier 1/2 sources: Fextralife Wiki ("dares to duel you in the town square of Hernand") and Game8 ("Kliff encounters in Hernand while searching for his comrades"). Both agree on 'hernand'. Previous runs had flagged this as confirmed but not yet applied.
- No other actionable items exist in the queue at this time. All remaining items require post-launch data, an NPC data structure that does not yet exist, or human architectural decisions before they can be added.
- Backup file game-data.ts.bak could not be removed (filesystem permission restriction, same as Run 2). Safe to delete manually.

---

## Run: 2026-03-15 16:39 UTC

**Result:** Aborted
**Items processed:** 0
**Items added:** 0
**Items skipped (needs review):** 0
**Items skipped (unconfirmed):** 0
**Images generated:** 0
**Images set to coming-soon placeholder:** 0
**TypeScript build:** Not run (aborted before build check)

### Added This Run
- None

### Skipped / Flagged This Run
- None

### Notes
Aborted at pre-flight Step 0a. Both `src/lib/game-data.ts` and `src/types/game-data.ts` have staged but uncommitted changes (shown as `M ` in `git status --short`). Per task rules, the run cannot proceed while game-data.ts has uncommitted changes.

**Action required:** Commit or stash the staged changes to `game-data.ts` and `src/types/game-data.ts` before re-running this task.

---

## Run: 2026-03-16 13:34 UTC (Run 8) -- Queue Exhausted

**Result:** Success (no items to add)
**Items processed:** 0
**Items added:** 0
**Items skipped (needs review):** 0
**Items skipped (unconfirmed):** 0
**Images generated:** 0
**Images set to coming-soon placeholder:** 0
**TypeScript build:** Clean (pre-flight only; no writes made)

### Added This Run
- None

### Skipped / Flagged This Run
- None

### Notes
All items in `data-to-add.md` are either already marked `[ADDED]`, `[RESOLVED]`, or `[NEEDS REVIEW]`. There were zero actionable items to process this run. The queue is fully caught up pending post-launch data.

A `game-data.ts.bak` file from a prior run exists in `src/lib/` and could not be removed (permission denied). A human should delete it manually: `src/lib/game-data.ts.bak`.

No changes were made to `game-data.ts` or any other source files this run.

---

## Run: 2026-03-16 (Run 9) -- NEEDS REVIEW Audit

**Result:** Success (research-only run; no writes to game-data.ts)
**Items processed:** 28 (all NEEDS REVIEW items in queue)
**Items added:** 0
**Items skipped (needs review):** 28 -- all remain blocked; see findings below
**Items skipped (unconfirmed):** 0
**Images generated:** 0
**Images set to coming-soon placeholder:** 0
**TypeScript build:** Not run (no source file changes)

### Added This Run
- None

### Skipped / Flagged This Run
- All 28 NEEDS REVIEW items remain blocked -- see Notes for item-by-item breakdown

### Notes

This was a dedicated research audit of all items marked `[NEEDS REVIEW]`. No items became actionable. The core reason is uniform across most items: the game launches **March 19-20, 2026** (3-4 days from this run). Pre-launch sources have been fully exhausted -- no new data exists beyond what was gathered in Runs 1-5.

**Item-by-item findings:**

**Bosses (8 items) -- all blocked by missing `reward` field:**
All 8 pending bosses (Split Horn, Cassius Morten, Fortain, Draven, Muskan, Gwen Kraber, Titan, Desert Ancient) were searched across Fextralife Wiki, Game8, Beebom, Sportskeeda, GamingBolt, PlayStation Blog, and a third-party boss guide. Zero sources name any specific item drop for any of these bosses. The Boss interface requires `reward` as a non-optional field. This blocker is pre-launch by nature -- reward data simply does not exist yet.

Additional individual findings:
- Cassius Morten: Calphade still absent from all wiki region lists after a direct Fextralife Locations fetch. Likely a sub-territory, not a 7th major region. Region blocker confirmed.
- Fortain: One search result speculatively placed him in Demeniss -- this was flagged as editorial inference, not sourced data.
- Gwen Kraber: Confirmed the Beebom weapons page "Derictus Spear" is a Collector's Edition item, NOT his drop weapon. Still unnamed.
- Muskan: Confirmed the Black Desert Online "Muskan" (shoe drop) is a different game entirely -- not usable.

**Wolf Mounts -- blocked by missing stats and type:**
Wolf mount existence confirmed by Deltia's Gaming and FandomWire (visible in release date reveal trailer, properly saddled). However: no speed/combat/stamina stats, no acquisition method, and the 'wolf' category is not in the MountCategory union type. All three blockers remain.

**Quests (2 items) -- blocked by missing official names/rewards:**
Sky Boulder Investigation and The Gold Leaves Duel are both working names from a YouTube transcript. Neither has a confirmed in-game quest name. No quest data can be added without the official name.

**Collectibles (3 items):**
- Radiant Fragments: Still possibly an alternate name for Abyss Artifacts. Cannot resolve pre-launch.
- Traces of the Abyss: Fextralife confirms this is the waypoint term; Beebom does not use the name. Moderate confidence but not enough to bulk-rename ~15 existing records. Human decision needed.
- Treasure Maps: No in-game treasure map items found in any source. The "treasure hunting" mechanic (shovel + digging) was confirmed, but no collectible item type called "treasure map" was surfaced.

**Characters/NPCs (7 items) -- blocked by missing data structure:**
All NPC entries (Yann, Naira, Ronie, Marius, Russo, Aliston/Alustin, White Crow, Bon Midler, Shakatu) remain blocked because game-data.ts has no NPC interface or exported array. This is an architecture decision for the human, not a data problem.

**Map Locations (6 items) -- blocked by missing data structure:**
All sub-location entries (Calphade, Hernand sub-locations, Unicorn Cliffs, Marni's Masterium, Raventine Monastery, Library of Providence) are blocked because game-data.ts has no sub-location or POI data structure.

**Architecture notes (2 items):**
- Aliston name discrepancy: "Alustin the Alchemist" on Fextralife vs. "Aliston" from YouTube transcript. Do not create NPC entry until confirmed at launch.
- Knowledge Codex: No change. Architecture decision for human.

**Recommendation:** Re-run this task on or after March 21, 2026 (24-48 hours post-launch). Wiki sources should begin publishing confirmed reward data, regional boss placements, and named item drops within that window. The 8 pending bosses are the highest-priority items to resolve.

---

---

---

## Run: 2026-03-21 (Run 17) -- Post-Launch Day 3 / Queue Audit Pass

**Result:** No Changes (all processable items already in app or blocked)
**Items processed:** 12 (queue items assessed for actionability)
**Items added:** 0
**Items skipped (already in app):** 1 (Grilled Meat recipe -- marked in queue)
**Items skipped (needs review):** 0 new flags (existing NEEDS REVIEW items unchanged)
**Items skipped (unconfirmed):** 0
**Images generated:** 0
**Images set to coming-soon placeholder:** 0
**TypeScript build:** Not run (no changes to game-data.ts)

### Added This Run
(none)

### Skipped / Flagged This Run
- Grilled Meat recipe -- Already in RECIPES array (line 961) as `Grilled Meat` with `Tough Meat x1`. Queue entry used pre-launch "Raw Meat" name. Marked [ALREADY IN APP] in queue.
- Sword of the Lord weapon -- POST-LAUNCH CONFIRMED but missing numeric atk/spd/rng stats (required by Weapon interface). Cannot add without stats.
- Tauria Curved Sword weapon -- Same blocker as Sword of the Lord.
- Full Main Quest List rewrite -- 23 confirmed quest names available, but applying them requires deleting/rewriting existing entries (violates "do not delete" constraint). Flagged for human decision.
- Trophy rarity corrections -- TROPHIES array has all 35 entries but rarity assignments are significantly wrong (app: 1P/5G/16S/13B vs confirmed: 1P/4G/10S/20B). Only PowerPyx provides explicit rarity classifications (single Tier 1 source). No second source with rarity data found despite checking Beebom, game8, Insider Gaming, keengamer, PSNProfiles. Blocked by 2-source requirement for corrections. Detailed discrepancy list added to queue.
- Trophy descriptions -- App uses generic editorial descriptions; Beebom + PowerPyx + game8 confirm actual in-game descriptions are different. 3 sources available but this is a batch correction of 34 entries. Flagged for human review.
- All remaining boss entries (Tenebrum, Ludvig, One-Armed Ludvig, Gregor, Split Horn, Muskan, Gwen Kraber, Titan, Desert Ancient, Fortain) -- Still [NEEDS REVIEW] due to missing required fields (region, reward, difficulty).
- All NPC entries -- No NPCCharacter data structure exported in game-data.ts. Blocked.
- Wolf/Vehicle mounts -- Missing stats and MountCategory type updates. Blocked.

### Notes
- This run found no new items to add. The queue has been thoroughly processed by Runs 14-16. The remaining backlog consists entirely of items blocked by missing required fields or items requiring human decisions (quest rewrite, trophy corrections, NPC data structure creation).
- The most impactful action a human could take now: (1) Apply trophy rarity corrections (PowerPyx data is almost certainly correct but only 1 source), (2) Rewrite QUESTS array with confirmed quest names, (3) Add missing weapon stats from game8 weapons pages (Sword of the Lord, Tauria Curved Sword), (4) Decide on NPC data structure.
- Pre-flight notes: TypeScript has pre-existing errors in InteractiveMap.tsx (missing react-leaflet types) unrelated to game data. Workspace git shows game-data.ts as modified, but this is a known phantom due to OneDrive sync issues per CLAUDE.md.
- Backup file game-data.ts.bak was created but no changes were made to game-data.ts. Backup can be removed.

---
