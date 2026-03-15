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
