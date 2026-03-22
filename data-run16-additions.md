# Crimson Companion App -- Run 16 Research Additions

_Run 16 -- 2026-03-21 (Day 3 Post-Launch / Community Deep-Dive Pass)_

**Sources used this run:**
- PowerPyx quest walkthroughs (Tier 1) -- specific pages for Gregor, Lucian Bastier, A Fleeting Dream, Where the Wind Guides You
- game8.co wiki (Tier 1) -- boss list page, challenge list page, full boss entries
- Fextralife wiki (Tier 1) -- boss entries
- Pearl Abyss official site (Tier 1) -- known issues list
- Kotaku, NotebookCheck, OpenCritic, Sportskeeda (Tier 2) -- review scores, news
- GameSpot, GameRant, TheGamer (Tier 2) -- boss guides, Kearush, Lucian Bastier

---

## CORRECTIONS TO APPLY NOW (Confirmed, Tier 1 Sources)

### 1. Gregor the Halberd of Carnage -- Reward: 'Unknown (TBD)' -> 'Golden Vanguard, Abyss Artifact x1' [CONFIRMED]
- PowerPyx "Where the Wind Guides You" walkthrough (Tier 1) explicitly states: reward is "Golden Vanguard" (Lance, 2-handed spear) + Abyss Artifact x1.
- This was the #1 open gap for Gregor from Run 15.
- Action: Change `reward: 'Unknown (TBD)'` to `reward: 'Golden Vanguard, Abyss Artifact x1'` in BOSSES array entry for "Gregor the Halberd of Carnage".
- Source: PowerPyx walkthrough [2026-03-21] -- Tier 1; corroborated by PowerPyx boss guide (Golden Vanguard described as recommended weapon for subsequent boss Lucian Bastier)

### 2. Gregor the Halberd of Carnage -- Region: 'demeniss' -> 'hernand' [CONFLICT -- LIKELY NEEDS CORRECTION]
- App currently has `region: 'demeniss'` and `location: 'Fort Ironclad, Demeniss'`.
- PowerPyx "Where the Wind Guides You" walkthrough [2026-03-21] (Tier 1) says the quest starts in the **Hernand region** and involves finding "the fortress on the hill."
- game8 confirms quest #107 is in Chapter 8 "Blood Coronation," sub-chapter "Ashen Steps" -- Ashen Steps is Hernand-adjacent.
- The fortress is currently unnamed "on a hill" in PowerPyx; "Fort Ironclad" may be an incorrect placeholder name from earlier pre-launch research.
- VERDICT: High confidence that region should be 'hernand', not 'demeniss'. The "Fort Ironclad" location name is likely incorrect -- the actual location is unnamed in post-launch sources.
- Action: Change `region: 'demeniss'` to `region: 'hernand'`, update `location` to remove "Fort Ironclad, Demeniss" placeholder.
- Source: PowerPyx walkthrough [2026-03-21] -- Tier 1; game8 boss list [2026-03-21] -- Tier 1

### 3. One-Armed Ludvig -- Region: 'demeniss' -> 'pailune' [CONFIRMED]
- game8 boss list (Tier 1) explicitly lists: "One-Armed Ludvig - Region: Pailune, Area: Kingshield Mountain, Quest: Twisted Fate."
- Run 15 left this as 'Unknown' (app had 'demeniss' as a guess). game8 confirms Pailune.
- Quest name conflict: App/PowerPyx says "Time to Face Justice"; game8 says "Twisted Fate." Both Tier 1. May be different naming levels (arc vs. specific mission name).
- Action: Change `region: 'demeniss'` to `region: 'pailune'`. Update `location` from "Mountains of Demeniss" to "Kingshield Mountain, Pailune."
- Source: game8 boss list [2026-03-21] -- Tier 1

### 4. Draven the Crowcaller -- Name Update: 'Draven the Crowcaller' -> 'Crowcaller' [CONFIRMED]
- Post-launch, the confirmed in-game boss name is "Crowcaller." No "Draven" in any game8 or PowerPyx boss list entry.
- game8 lists: "Crowcaller - Region: Abyss, Area: Crow's Nest, Quest: Black and White, Rewards: Blackwing Leather Armor, Blackwing Mask, Tauria Curved Sword."
- The "Draven" name was a pre-release speculation. High confidence this is the same boss.
- Quest name conflict: game8 says "Black and White"; PowerPyx says "Bloodwind" (first fight) / "Toward the Nest" (second fight). These may name different sub-quests in the same chapter. game8 appears to name the chapter arc.
- Action: Rename boss from "Draven the Crowcaller" to "Crowcaller" in BOSSES array.
- Source: game8 boss list [2026-03-21] -- Tier 1; PowerPyx boss guide [2026-03-21] -- Tier 1

### 5. Ludvig -- Reward Conflict: 'Ignir (two-handed sword)' vs 'Hungering Fang Leather Cloak, Hungering Fang Leather Boots' [MAJOR CONFLICT]
- App currently has `reward: 'Ignir (two-handed sword)'` for Ludvig.
- game8 boss list (Tier 1) explicitly states: rewards are "Hungering Fang Leather Cloak x1, Hungering Fang Leather Boots x1."
- PowerPyx lists Ignir as a two-handed sword that exists in the game, but does NOT confirm it as a Ludvig drop in the boss guide.
- The Ignir reward in the app appears to be from a pre-launch source (possibly an editorial guess or misattributed early source).
- VERDICT: game8 (Tier 1, post-launch) is more reliable. Recommend updating to the Hungering Fang armor rewards.
- Action: Review source for "Ignir" reward attribution. If no Tier 1 confirmation exists, change `reward` to `'Hungering Fang Leather Cloak, Hungering Fang Leather Boots'`. Flag Ignir as a separate weapon in the world, not a Ludvig drop.
- Source: game8 boss list [2026-03-21] -- Tier 1

### 6. Ludvig + Awakened Ludvig -- Consider Merging Entries [EDITORIAL DECISION]
- App currently has two separate entries: "Ludvig" (2 HP bars, reward: Ignir) and "Awakened Ludvig" (reward: 'Unknown TBD').
- game8 lists only a single "Ludvig" entry covering both phases with reward: Hungering Fang Leather Cloak + Boots. The awakened form is the phase 2 of the same boss fight.
- The current two-entry split may cause confusion in the app if rewards are displayed per boss.
- Recommendation: Consolidate into one "Ludvig" entry with the confirmed reward. Note phase 2 in mechanics field.
- Source: game8 boss list [2026-03-21] -- Tier 1

### 7. Reed Devil -- Region Conflict Note: App has 'hernand', Previous Research Doc Notes Say 'pailune' [FLAG]
- game-data.ts currently has `region: 'hernand'` and `location: 'Mountain of Frozen Souls (Frozen Soul Mountain), Hernand'`.
- game8 boss list (Tier 1) confirms: "Reed Devil - Region: Hernand, Area: Frozen Soul Mountain."
- However, data-to-add.md's "Resolved" section claims the app had `region: 'pailune'` as correct, using a Frost Salamander cross-reference.
- VERDICT: game8 Tier 1 explicitly says Hernand. The current app value of 'hernand' is CORRECT and consistent with the most authoritative post-launch source. The "pailune" claim in the research doc resolution note appears to have been overridden by post-launch data. No change needed to the app -- but the research doc's "resolved" entry is now incorrect and should be updated to reflect game8 confirmation of Hernand.
- Action: No app change needed. Update research doc resolution note to acknowledge game8 confirmation of Hernand.
- Source: game8 boss list [2026-03-21] -- Tier 1

---

## NEW BOSS ENTRIES -- READY TO ADD

### Lucian Bastier [READY TO ADD -- Hernand, Ch.8]
All required fields confirmed:
```json
{
  "name": "Lucian Bastier",
  "region": "hernand",
  "type": "Human",
  "difficulty": "extreme",
  "reward": "Four armor pieces, Spire of Clockwork Key",
  "element": "fire",
  "weakness": null,
  "location": "East of Demeniss, Hernand (Chapter 8 -- Blood Coronation)",
  "mechanics": "2 HP bars. Forced Damiane fight. Phase 1: Human form with shield + mace dealing explosive fire damage; blocks all frontal attacks -- dodge sideways, attack from behind after combos. Phase 2: Transforms into monster form; teleports constantly; summons shadow demons (cannot be damaged). Recommended: Golden Vanguard lance (from Gregor). Upgrade Damiane armor 1-2 levels. Bring 100+ Grilled Meat."
}
```
- Quest: "A Fleeting Dream" (#118), Chapter 8 Blood Coronation, Sub-Chapter: Traitor
- Phase 2 is "Awakened Lucian Bastier" transformation -- app could list as single entry or two entries (see Ludvig precedent)
- Reward detail: "Four armor pieces" is the confirmed description; specific piece names not yet listed in sources. Spire of Clockwork Key is a key item reward.
- Note: Only playable as Damiane (forced character swap)
- Source: PowerPyx "A Fleeting Dream" walkthrough [2026-03-21] -- Tier 1; game8 boss list [2026-03-21] -- Tier 1

---

## BOSS ENTRIES -- NEWLY CONFIRMED FIELDS

### Kearush the Slayer [ALREADY IN APP -- verified 2026-03-21]
- Checked game-data.ts lines 498-502: Entry IS present with correct data (region: hernand, difficulty: legendary, reward: The Grove's Thorn + Gale I + Howling of Chaos, weakness: fire). No changes needed.
- Quest name cross-check: PowerPyx calls it "Demenissian Delegation"; game8 calls it "Uninvited Guest." Both Tier 1. May be arc vs. specific mission naming. App does not store quest name in BOSSES, so no impact.

### Myurdin (first encounter) [ALREADY IN APP -- verify region]
- game8 boss list [2026-03-21] confirms: "Myurdin - Region: Hernand, Area: Hills of No Return, Quest: Ambush, Reward: Axiom Bracelet."
- App currently has `region: 'hernand'` and `reward: 'Axiom Bracelet'` -- BOTH CORRECT. No change needed.
- Weakness: App has `weakness: 'frost'` -- unconfirmed. Flag as editorial.

### Lava Myurdin [ALREADY IN APP -- region and quest name minor conflict]
- game8 lists the fire-phase boss as: "Lava Myurdin - Region: Pailune, Area: Ashclaw Keep, Quest: Decisive Battle."
- App currently has: `region: 'pailune'` ✓, `location: 'Ashclaw Keep, Pailune'` ✓, `reward: 'Melted Ambition, Pailunese Contribution EXP x3000'` ✓.
- Quest: App mechanics note says "Battle at Silverwolf Mountain" (PowerPyx, Tier 1); game8 says "Decisive Battle" (Tier 1). Minor conflict; no impact on data.

### Tenebrum [REGION NOW CONFIRMED]
- game8 boss list (Tier 1) confirms: "Tenebrum - Region: Hernand, Area: Scholastone Institute, Quest: Forbidden Knowledge."
- App currently has `region: 'hernand'`, `location: 'Scholastone Institute, Hernand'` -- BOTH CORRECT. No change needed.
- Quest name conflict: App/PowerPyx says "Gate to the Otherworld"; game8 says "Forbidden Knowledge." Both Tier 1. Minor conflict.
- Reward: App has `reward: 'Key to the Spire of the Stars'` -- game8 confirms this. ✓

### Matthias [QUEST NAME MINOR CONFLICT]
- App currently has `reward: 'Pump Kick x1'` ✓, `region: 'hernand'` ✓.
- Quest name conflict: PowerPyx says "For Honor"; game8 says "Hernand in Chaos." Both Tier 1. Minor conflict; no impact on BOSSES data.
- game8 says HP bars: 2 -- matches app mechanic note.

### Cassius Morten [ALL FIELDS NOW CONFIRMED]
- game8 boss list (Tier 1) confirms: Region: Hernand, Area: City of Calphade, Quest: The Unyielding Shields, Reward: Shield of Betrayal.
- App has `region: 'hernand'` ✓, `reward: 'Shield of Betrayal'` ✓. All correct.
- Calphade as a sub-territory of Hernand is now implicitly confirmed by game8 listing it as "Region: Hernand, Area: City of Calphade."

### Blackstar [LATE-GAME SPOILER -- Do Not Add Without Warning]
- Confirmed existence via Pearl Abyss official known issues list [2026-03-21] (Tier 1): "During the 'Deferred Advance' quest, retrying or abandoning the Ultimate Weapon fight when Blackstar's Health is depleted causes Blackstar's Health to not fully recover."
- This is a MAJOR late-game spoiler boss. Not yet documented by community guides.
- Quest: "Deferred Advance"
- Fight type: Described as "Ultimate Weapon" fight
- Chapter: Unknown (late-game, presumably Ch.10-12 based on quest numbering context)
- Region, reward, difficulty, type: All unknown.
- ⚠️ SPOILER WARNING: Do not surface this boss prominently in the app before the community has had time to reach it. Consider a spoiler gate.
- Action: Flag for future research once community guides cover late-game chapters. Do not add to BOSSES array yet without more data.
- Source: Pearl Abyss Known Issues list [2026-03-21] -- Tier 1

---

## CHALLENGES SYSTEM -- NEW STRUCTURAL DATA [NOT YET IN APP]

game8's full challenge guide [2026-03-21] (Tier 1) confirms:

### Sealed Abyss Artifacts (Collectibles)
- 141 total Sealed Abyss Artifacts in the game
- Each one found unlocks exactly 1 Challenge
- Challenge progress only counts AFTER finding the associated Sealed Abyss Artifact (not retroactive, except some cumulative requirements)
- These are a new collectible category not yet in the app's COLLECTIBLES data
- Required for Platinum trophy / 1000 Gamerscore

### Challenge Categories and Counts
| Category | Count |
|---|---|
| Exploration | 214 |
| Mastery | 60 |
| Combat | 30 |
| Life | 50 |
| Minigame | 25 |
| **Total** | **~350+** |

### Hunting Challenges Sub-Category
- 11 Hunting Challenges total
- Category name: "White Crow's Gaze"

### Spear Mastery Sub-Category
- 5 Spear Mastery Challenges
- Sample challenge tasks: "Land 15 counterattacks with a spear within 30 seconds", "Hit enemies 50 times with a spear within 30 seconds"

### Data Model Note
- No interface exists for Challenges or Sealed Abyss Artifacts in game-data.ts
- Would need new data types: `Challenge`, `SealedAbyssArtifact`
- Or integrate into existing COLLECTIBLES as a new category
- Human decision required on data model before adding

Source: game8 List of All Challenges [2026-03-21] -- Tier 1; game8 All Hunting Challenges [2026-03-21] -- Tier 1; PowerPyx All Challenges Guide [2026-03-21] -- Tier 1

---

## PEARL ABYSS OFFICIAL UPDATES (March 21, 2026) [META / NEWS]

### Controls Patch Incoming -- Not Yet Released
- Pearl Abyss publicly apologized to keyboard and mouse players for "not providing a satisfactory gameplay experience."
- Official statement: "We are currently preparing a patch" to fix control issues.
- No patch version number or ETA announced as of 2026-03-21.
- Implication for app: If Pearl Abyss documents new keybind layouts in the patch, the app's control references may need updating.
- Source: Sportskeeda / Kotaku [2026-03-21] -- Tier 2; official Pearl Abyss statement -- Tier 1

### Commercial Performance
- 2 million units sold in the first 24 hours (announced March 20, 2026).
- Mixed PC reception on Steam; console reception stronger.
- Source: Pearl Abyss announcement [2026-03-20] -- Tier 1

### Critical Reception
- Metacritic (PC): 78 (based on 85 critic reviews; 74% positive, 25% mixed, 1% negative)
- OpenCritic: 80 (81% top critic average)
- Common praise: scale, visuals, combat variety, world-building
- Common criticism: controls (especially KB+M), story coherence, system overload for new players
- Source: Metacritic [2026-03-21], OpenCritic [2026-03-21] -- Tier 2

### AI Art Controversy
- Players identified suspected AI-generated artwork in environmental decorations (paintings, portraits).
- Evidence cited: anatomical inconsistencies (incorrect finger counts), style artifacts consistent with AI generation.
- Pearl Abyss has not publicly commented on this specifically as of 2026-03-21.
- No in-game mechanics impact. Not relevant to app data.
- Source: GameSpot, Kotaku, TheGamer [2026-03-21] -- Tier 2

---

## DATA GAPS -- UPDATED STATUS (Run 16)

| Gap | Status | Priority |
|---|---|---|
| Kliff SKILLS array rewrite | Unchanged -- human decision needed | HIGHEST |
| QUESTS array rewrite | Unchanged -- human decision needed | HIGH |
| Lucian Bastier boss -- specific armor piece names | New gap (reward is "4 armor pieces," names TBD) | Medium |
| Blackstar boss -- all fields | New gap -- SPOILER, not yet documented | Low (wait for community guides) |
| Gregor boss -- exact location name | PowerPyx describes it as unnamed fortress | Low |
| Split Horn reward, element | No new data | Medium |
| Muskan reward, quest, chapter | No new data | Medium |
| Gwen Kraber reward | No new data | Medium |
| Desert Ancient difficulty, reward | No new data | Medium |
| Titan region, difficulty, reward | No new data | Medium |
| Walter Lanford reward | No new data | Medium |
| Sealed Abyss Artifacts data model | Confirmed count: 141 -- awaiting data model decision | High |
| Challenge data model + data | Confirmed: 350+ challenges in 5 categories -- awaiting data model | High |
| NPC data structure | No change | Low |
| Weapon stats (individual ATK values) | game8 weapons list has ATK values -- may be partially populated now | Medium |
| Chapters 9-12 quest content | New data: chapter names confirmed; quest names sparse | Medium |

---

## QUALITY CHECKLIST (Run 16)

- [x] All sources cited (Tier 1/2 labeled throughout)
- [x] Source conflicts documented (Ludvig reward, Gregor region, quest name differences across Tier 1 sources)
- [x] Data completeness stated per section
- [x] Structured data uses consistent formatting (JSON for boss entries, tables for challenges)
- [x] Report structure maps to app features (bosses, quests, mechanics, challenges, NPCs)
- [x] Data gaps explicitly called out (Blackstar, armor piece names, challenge data model)
- [x] Uncertain/inferred data flagged (Myurdin weakness frost, Blackstar all fields)
- [x] JSON/structured data is valid and parseable
- [x] App-vs-new-data diff performed for all entries (verified Kearush in app; Lucian Bastier missing; Gregor reward/region issues flagged)
