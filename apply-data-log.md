# Crimson Companion App -- Data Apply Log

Each entry records one manual run of the apply-data task.

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
