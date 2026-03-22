# Crimson Companion App -- Run 15 Research Additions

_Run 15 -- 2026-03-20 (Day 2 Post-Launch / Wiki & Guide Expansion Pass)_

**Note to developer:** The main `data-to-add.md` file may have reverted to an earlier version due to a OneDrive sync conflict. This file contains all Run 15 findings in a standalone format ready to be merged back into the main research doc.

**Sources used this run:**
- PowerPyx quest walkthroughs (Tier 1) -- multiple specific quest pages
- game8.co wiki (Tier 1) -- boss pages, weapons list, chapter list
- Fextralife wiki (Tier 1) -- boss pages, Walter Lanford page
- GameRant chapter list (Tier 2)
- deltiasgaming.com (Tier 2) -- Marni's Excavatron guide
- PSU.com patch notes (Tier 1) -- Update 1.00.02 full notes
- dualshockers.com (Tier 2) -- Sanctum guide

---

## CORRECTIONS TO APPLY NOW (Confirmed, Tier 1 Sources)

### 1. Walter Lanford -- Region: 'desert' → 'hernand' [CONFIRMED]
- Fextralife wiki [2026-03-20] explicitly lists Walter Lanford's fight location as **"Fort Warspike" AND "Hernand"**
- Alfonso Estate and Fort Warspike are sub-zones within the Hernand region
- Action: Change `region: 'desert'` to `region: 'hernand'` in BOSSES array
- Source: Fextralife Walter Lanford page [2026-03-20] -- Tier 1

### 2. Walter Lanford -- Element: 'fire' → 'physical' [CONFIRMED]
- Attacks (Double Barrel Shot, Double Barrel Barrage, Scattershot, Shrapnel Shower, Poof) are purely ballistic
- No fire attribute exists on any confirmed attack
- Action: Change `element: 'fire'` to `element: 'physical'` in BOSSES array
- Source: Fextralife Walter Lanford page [2026-03-20] -- Tier 1

### 3. Myurdin -- Add Reward: 'Melted Ambition' (Sword) [CONFIRMED]
- PowerPyx "Battle at Silverwolf Mountain" walkthrough confirms reward: **"Sword -- Melted Ambition"**
- Action: Add `reward: 'Melted Ambition'` to Myurdin's BOSSES array entry
- Source: PowerPyx walkthrough [2026-03-20] -- Tier 1

### 4. Myurdin -- Add Element: 'fire' [CONFIRMED]
- Phase 2: Myurdin transforms into "Lava Myurdin" with confirmed fire/lava attacks
- Confirmed by PowerPyx, game8, sportskeeda -- all Tier 1/2
- Action: Add `element: 'fire'` to Myurdin's BOSSES array entry
- Source: Multiple Tier 1 sources [2026-03-20]

### 5. Myurdin -- Region: Source Conflict Flag [DO NOT CHANGE YET]
- PowerPyx walkthrough says "Hernand region" for Battle at Silverwolf Mountain
- BUT: Chapter 7 is named "Homecoming" and its completion trophy is "Protector of Pailune" -- strongly implying Pailune
- VERDICT: Run 14's correction to 'pailune' is likely correct. PowerPyx may have mislabeled the per-quest region. Keep 'pailune'. Needs in-game region UI verification.

---

## NEW BOSS ENTRIES -- READY TO ADD

### Kailok, the HornSplitter [READY TO ADD]
All fields confirmed by game8 (Tier 1):
```json
{
  "name": "Kailok, the HornSplitter",
  "region": "hernand",
  "type": "Humanoid",
  "difficulty": "hard",
  "reward": "Sword of the Lord",
  "element": "physical",
  "weakness": null
}
```
- **Region:** Confirmed 'hernand' -- Goldleaf Guildhouse, Unicorn Cliff, Chapter 2 (game8 Tier 1)
- **Quest:** SOURCE CONFLICT -- game8 says "The End of Greed" (Chapter 2); PowerPyx says "Cheers Echoing From the Edge." Same boss, different quest naming conventions.
- **Additional rewards:** Seal of Greed - Goldleaf Merchant Guild + Iron Ore x7 (game8 Tier 1)
- **Skill unlock:** "Evasive Roll" learned via Observation after defeating Kailok (game8 Tier 1)
- Source: game8 Kailok page [2026-03-20] -- Tier 1; PowerPyx boss guide [2026-03-19] -- Tier 1

### Marni's Excavatron [READY TO ADD]
All fields confirmed:
```json
{
  "name": "Marni's Excavatron",
  "region": "hernand",
  "type": "Mechanical",
  "difficulty": "hard",
  "reward": "Mining Knuckledrill",
  "element": "physical",
  "weakness": null
}
```
- **Region CORRECTED:** 'hernand' (Karin Quarry, north of Hernand City) -- NOT Delesyia as previously assumed. The machine was built by Marni (Delesyia inventor) but the fight is in Hernand.
- **Quest:** "Estate in Dismay" (faction questline) -- game8 Tier 1. Also described as "House Roberts' Stolen Quarry" in another source.
- **Additional rewards:** Gold Vein Map x1 + Azurite x3 + Bloodstones x3 + Engraved Gold Earring x1 (game8 Tier 1)
- **Mechanic:** Use Force Palm to stagger and create openings
- **Note:** The 'Delesyian Automaton' placeholder in the app's BOSSES array should be reconciled -- Marni's Excavatron is the confirmed in-game name. Delesyian Automaton may need to be removed or renamed.
- Source: game8 Marni's Excavatron page [2026-03-20] -- Tier 1; deltiasgaming.com [2026-03-20] -- Tier 2

---

## BOSS ENTRIES -- NEWLY CONFIRMED FIELDS (Not Yet Fully Ready to Add)

### Fortain, the Cursed Knight [NEEDS REGION -- otherwise ready]
```json
{
  "name": "Fortain, the Cursed Knight",
  "region": "TBD",
  "type": "Human",
  "difficulty": "hard",
  "reward": "Shackle of Might",
  "element": "physical",
  "weakness": null
}
```
- **Location:** Thornbriar Fortress -- Fextralife wiki [2026-03-20] -- Tier 1
- **Reward CONFIRMED:** "Shackle of Might" (Sword) + 1 Abyss Artifact -- PowerPyx "The Cursed Knight" walkthrough [2026-03-20] -- Tier 1
- **Quest:** "The Cursed Knight" (Main Quest #115), Chapter 8: Blood Coronation, Sub-chapter: To Demeniss
- **HP bars:** 1
- **Mechanic:** Summons a ghost knight that constantly interrupts player attacks (either ground slam or arrow fire). Shield-using human boss.
- **Region SOURCE CONFLICT:** PowerPyx walkthrough says "Hernand region." Chapter 8 "Blood Coronation" has sub-chapter "To Demeniss" suggesting fight may be in Demeniss or on the Hernand/Demeniss border. UNRESOLVED -- needs in-game region UI check at Thornbriar Fortress.
- Source: Fextralife wiki [2026-03-20] -- Tier 1; PowerPyx [2026-03-20] -- Tier 1

### Myurdin [UPDATE EXISTING ENTRY]
- Existing entry in app. Fields to add/update:
  - `reward: 'Melted Ambition'` (new -- confirmed, see above)
  - `element: 'fire'` (new -- confirmed, see above)
  - `region: 'pailune'` (already in app from Run 14 -- keep, see conflict note above)
- HP bars: 2 (phase 1: melee bear; phase 2: "Lava Myurdin" fire transformation)
- Source: PowerPyx [2026-03-20] -- Tier 1

---

## BOSS REWARDS -- UNCONFIRMED INFERENCES (Do Not Add Without Source)

The following are editorial inferences based on weapon naming patterns in the game8 weapons list [2026-03-20] Tier 1. They are NOT confirmed by any source explicitly stating "Boss X drops Weapon Y":

| Boss | Possible Reward (Inferred) | Basis |
|---|---|---|
| Muskan (Bonepit arena) | Bonepit Greathammer (ATK 20) | Weapon named after Muskan's arena |
| Cassius Morten (Calphade traitor) | Shield of Betrayal (DEF 6) | "Betrayal" theme matches Cassius Morten's story |
| Walter Lanford (Alfonso Estate/Fort Warspike) | Alfonso Spear (ATK 13) or Warspike Spear (ATK 14) | Weapons named after fight location sub-zones |

Do NOT add these rewards to BOSSES array entries without a Tier 1 source confirming the drop. These are plausible but could be wrong.

Note: Warspike Spear is a WORLD PICKUP during "Turnali's Request" (free, leaning against a shrine per sportskeeda) -- NOT a boss drop from Walter Lanford.

---

## BOSSES STILL FULLY BLOCKED (No New Data)

These bosses have no new field confirmations in Run 15. Still require post-launch wiki development:

| Boss | Still Missing |
|---|---|
| Split Horn / Branchmaster Split Horn | reward, element |
| Muskan | reward, quest name, chapter |
| Gwen Kraber | reward (spear drop name still unknown) |
| Desert Ancient | difficulty, reward |
| Titan | region, difficulty, reward |
| Cassius Morten | reward (region = Calphade/Hernand-adjacent, blocked by type issue) |
| Walter Lanford | reward |

---

## NEW STORY STRUCTURE DATA

Full chapter structure confirmed -- 12 chapters + Prologue + Epilogue.

| # | Chapter Name | Key Bosses / Notes |
|---|---|---|
| Prologue | Dead of Night | Camp ambush by Black Bears |
| 1 | The First Encounter | Hernand arrival; Matthias boss |
| 2 | Golden Greed | Kailok (Goldleaf Guildhouse); Marni's Excavatron (Karin Quarry) |
| 3 | Howling Hill | Greymane Camp setup; new Abyss Gear tutorial quest (Patch 1.00.02) |
| 4 | The Price of Knowledge | Tenebrum boss (Gate to the Otherworld); Force Palm mechanic required |
| 5 | Guest Unbidden | Witch Elowen unlocked here → all Sanctum challenges unlocked |
| 6 | Cracks in the Shield | Cassius Morten boss in Calphade sub-territory |
| 7 | Homecoming | Pailune chapter. Myurdin (Battle at Silverwolf Mountain); One-Armed Ludvig (Time to Face Justice). Trophy: "Protector of Pailune" |
| 8 | Blood Coronation | Sub-chapter "To Demeniss." Fortain fight (Thornbriar Fortress). |
| 9 | The Sage of the Desert | Quests: The Calling, Shattered Ties, Enlightenment |
| 10 | Counterattack | Quests: Secret Weapon, The Gate of War, Invaders from the East |
| 11 | Truth and Reality | Quests: Brave New World, The City of Steel, Cloud Castle Orbian |
| 12 | The Abyss | Final chapter. The Final Battle, The Void, Blinding Darkness |
| Epilogue | Journey's End | Peace in Hernand, New Horizons |

Additional story stats:
- 168 individual main story mission steps total
- ~430 total quests including side content
- Main story only: 60-100 hours. Full completion: 100-180+ hours

Source: game8 chapter list [2026-03-20] -- Tier 1; GameRant chapter list [2026-03-20] -- Tier 2

**Quest naming conflict note:** allthings.how (Run 14, Tier 2) gave one set of quest names; game8 (Run 15, Tier 1) gives different chapter and quest names. These may use different sub-quest naming levels. Prefer game8 (Tier 1) for chapter names and major quest names. Do not delete allthings.how quest names yet -- may refer to arc sub-sections.

---

## WEAPONS -- FULL GAME8 LIST (Run 15)

Complete named weapon list from game8 [2026-03-20] Tier 1. Cross-check against app's WEAPONS array.

**One-Handed Weapons:**
| Name | Type | ATK | Notes |
|---|---|---|---|
| Balton Hammer | Hammer | 11 | |
| Balton Mace | Mace | 13 | |
| Bekker Axe | Axe | 14 | |
| Bekker Dagger | Dagger | 10 (+5 CRIT) | |
| Bekker Hammer | Hammer | 13 | |
| Crude Club | Club | 11 | |
| Fallen Kingdom's Sword | Sword | 16 | |
| Gilliam Axe | Axe | 14 | |
| Glenmore Sword | Sword | 10 | |
| Grace Rapier | Rapier | 11 | May be Damiane weapon type |
| Mining Knuckledrill | Knuckle/Fist | 16 | Marni's Excavatron boss drop |
| Sword of the Lord | Sword | 13 | Kailok boss drop; wave projectile ability |
| Sword of the Wolf | Sword | 12 | |
| Tauria Curved Sword | Sword | 16 | Crowcaller boss drop (2nd fight) |
| Timberham Axe | Axe | 10 | |
| Wells Sword | Sword | 12 | |

**Two-Handed Weapons:**
| Name | Type | ATK | Notes |
|---|---|---|---|
| Absolute Justice Greatsword | Greatsword | 20 | |
| Alfonso Spear | Spear | 13 | Named after Alfonso Estate (Walter Lanford zone) |
| Ancient Woodpole | Spear | 13 | |
| Arlem Warhammer | Warhammer | 14 | |
| Balton Longsword | Greatsword | 14 | |
| Bamboo Spear | Spear | 13 | |
| Bekker Greataxe | Greataxe | 14 | |
| Bekker Greathammer | Greathammer | 17 | |
| Bekker Halberd | Halberd | 13 | |
| Bekker Warhammer | Warhammer | 13 | |
| Bonepit Greathammer | Greathammer | 20 | Named after Bonepit arena (Muskan) |
| Fan-Blade Greataxe | Greataxe | 13 | |
| Freesword Halberd | Halberd | 14 | |
| Hellhounds' Chopping Axe | Greataxe | 19 | |
| Medium Staglord Banner Pike | Spear/Pike | 24 | Highest ATK spear |
| North Wind Trident | Spear | 14 | |
| Pailunese Riteblade | Greatsword | 12 (+5 CRIT) | |
| Rhett's Longsword | Greatsword | 15 | |
| Shaman's Staff | Staff | 13 | |
| Tournament Spear | Spear | 14 | |
| Warspike Spear | Spear | 14 | World pickup in "Turnali's Request" (NOT boss drop) |

**Ranged Weapons:**
| Name | Type | ATK | Notes |
|---|---|---|---|
| Bekker Bow | Bow | 10 | |
| Grey Wolf Bow | Bow | 10 | |
| Rhinard Cannon | Hand Cannon | 13 | |

**Shields:**
| Name | DEF | Notes |
|---|---|---|
| Bekker Shield | 2 | |
| Grey Wolf Wooden Shield | 3 | |
| Shield of Betrayal | 6 | "Betrayal" theme -- possible Cassius Morten drop (unconfirmed) |
| Staglord's Shield | 6 | |
| Sydmon Round Shield | 5 | |

Character assignments and acquisition methods are NOT in game8's list yet (marked as work in progress).

Source: game8 List of Weapons [2026-03-20] -- Tier 1

---

## NEW GAME MECHANICS (Run 15)

### Sanctums System [CONFIRMED]
- Unlocked in **Chapter 5 ("Guest Unbidden")** by meeting **Elowen the Witch** NPC
- Elowen becomes a merchant and gives the **Witches Faction Quest** to cleanse all Sanctums
- Each Sanctum requires solving a unique puzzle (e.g., repair missing pillar top, find item in adjacent building)
- Trophy: "Lightbringer" (all Sanctum challenges complete)
- Source: dualshockers.com, game8 All Sanctum Challenge Locations [2026-03-20] -- Tier 1/2

### Ancient Obelisks [CONFIRMED]
- Collectibles scattered throughout Pywel
- Effect: Each grants 1 full Skill Point (SP)
- Often hidden behind environmental puzzles -- example: Weeping Waterfall (north of Hernand gates, walk through waterfall to find grotto with Obelisk)
- Not in COLLECTIBLES data; would need new CollectibleCategory 'obelisk' or similar
- Source: community guides [2026-03-20] -- Tier 2

### Challenge Category Counts [CONFIRMED]
From community resource guides:
- Abyss restoration challenges: 40
- Secret places ("Wandering Footsteps"): 60
- Ancient ruins puzzles ("The Thread in the Forest"): 37
- Spire challenges ("Land Meets Sky"): 8
- Sanctum challenges: unknown count

### Telekinesis Skill [CONFIRMED]
- Skill allowing the player to pull objects/rocks remotely
- Reveals secret dungeon entrances hidden behind destructible rubble
- Controller vibrates near destructible rubble as a hint
- Source: community guides [2026-03-20] -- Tier 2

### Fire Alchemy -- Brazier Puzzles [CONFIRMED]
- Fire Alchemy mechanic used to light braziers in a specific order
- Correct order depicted on faded murals near each puzzle
- Used at Ancient Ruins challenge sites
- Source: community guides [2026-03-20] -- Tier 2

### Grapple-on-Capture (Bandit Leader Stash Reveals) [CONFIRMED]
- Subdue (grapple) a bandit camp leader instead of killing them
- May trigger dialogue prompt where they reveal a hidden stash location
- Marked on player's map after dialogue
- Source: community tips [2026-03-20] -- Tier 2

### Two-Person Pressure Plate Doors [CONFIRMED]
- Some underground doors require two people to open
- Mechanic: Player + mercenary companion; mercenary stands on pressure plate while player runs through gate
- Confirms mercenary companions interact with world puzzles, not just combat
- Source: community guides [2026-03-20] -- Tier 2

### Weapon Refinement System [CONFIRMED]
- Weapons strengthened at Blacksmith NPCs
- Standard weapons: refined using gathered materials or duplicate weapons
- Unique boss-drop weapons: require specific unique materials (boss-type materials)
- Source: game8 weapons guide [2026-03-20] -- Tier 1

---

## PATCH 1.00.02 -- SKILL & BOSS CHANGES (2026-03-20)

Relevant to app data:

**New Skill Moves Added:**
- Kliff: Flurry of Blows (existing skill) now has a new **finishing blow** added
- Damiane: Greatsword stab + greatsword uppercut now have **follow-up skills** added
- Oongka: Dual-wield stab now has a **follow-up attack** added

**Skills Menu Reorganized:**
- Skills menu now categorized by weapon type
- App should reflect this organization when the SKILLS array rewrite occurs

**Boss Changes:**
- Tenebrum (Chapter 4): Dying during fight no longer forces replay of preceding puzzle section
- Reed Devil: Combat balance adjusted (unspecified)
- All bosses: No longer attack players during revival animations

**Other Changes:**
- Bears: Instant-kill removed; overall damage reduced
- QTE difficulty for capture: Scales gradually with each successive capture
- New tutorial quest added at start of Chapter 3 (Abyss Gears)
- "Watch and Learn" skill-learning feature improved
- Cutscene fast-forward speed improved

Source: game8 Patch Notes [2026-03-20] -- Tier 1; PSU.com Patch Notes [2026-03-20] -- Tier 1

---

## NEW LOCATIONS (Run 15)

| Location | Region | Notes |
|---|---|---|
| Thornbriar Fortress | Hernand OR Demeniss (conflict) | Fortain the Cursed Knight fight location |
| Karin Quarry | Hernand | Marni's Excavatron fight; north of Hernand City |
| Calphade Gate | Hernand/Calphade border | Fast-travel point; road from Hernand City to Calphade |
| Weeping Waterfall | Hernand | North of main Hernand gates; hidden grotto with Ancient Obelisk |
| Kweiden | Pailune (likely) | Snowy sub-area; secrets buried under snow |
| Steel Mountains | Unknown | Near Spire of Insight; ancient ruins puzzle area |
| Spire of Insight | Unknown | One of 8 named spires; located near Steel Mountains |
| Howling Hill | Hernand (likely starting zone) | Greymane Camp Chapter 3 location; "Master Camper" trophy |

All need to be added to appropriate REGIONS array `pois` fields once the sub-location/POI data structure exists.

Source: Various [2026-03-20] -- Tier 1/2

---

## NEW NPCs (Run 15)

### Elowen the Witch
- First appearance: Chapter 5 ("Guest Unbidden")
- Role: Merchant NPC; gives Witches Faction Quest
- Quest function: Triggers cleansing of all Sanctums throughout Pywel once met
- No NPC data structure in game-data.ts yet
- Source: dualshockers.com [2026-03-20] -- Tier 2; game8 Sanctum guide [2026-03-20] -- Tier 1

### "Macduff" -- Possible System Reference
- Mentioned in context of Ancient Obelisks ("grant Macduff 1 full Skill Point")
- Unclear whether Macduff is an NPC name, a player-account system name, or alternate name for Kliff
- Do not add as NPC until role is confirmed in-game
- Source: community guides [2026-03-20] -- Tier 2

---

## DATA GAPS & QUALITY CHECKLIST

### Quality Checklist (Run 15)

- [x] All sources cited (Tier 1/2/3 labeled throughout)
- [x] Source conflicts documented (Myurdin region, Fortain region, Kailok quest name)
- [x] Data completeness stated per section
- [x] Structured data uses consistent formatting (JSON for boss entries, tables for weapons)
- [x] Report structure maps to app features (bosses, quests, weapons, mechanics, locations, NPCs)
- [x] Data gaps explicitly called out (Muskan, Split Horn, Gwen Kraber, Desert Ancient, Titan rewards)
- [x] Uncertain/inferred data flagged (Bonepit Greathammer, Shield of Betrayal, Alfonso Spear reward inferences)
- [x] JSON/structured data is valid and parseable

### Remaining High-Priority Gaps

1. **SKILLS array rewrite** -- Kliff skill names are wrong/invented in the app. Full confirmed skill list was documented in Run 13. Human decision needed on rewrite timing. HIGHEST PRIORITY gap.
2. **QUESTS array rewrite** -- Quest names in app are editorial/invented. Chapter structure now confirmed. Human decision needed on rewrite timing. HIGH PRIORITY.
3. **Boss rewards still unknown:** Split Horn, Muskan, Gwen Kraber, Desert Ancient, Titan, Cassius Morten, Walter Lanford.
4. **Delesyian Automaton vs. Marni's Excavatron** -- Reconcile whether both exist or the placeholder should be removed.
5. **Calphade region decision** -- Is Cassius Morten's region 'hernand' (parent), a new 'calphade' type, or left TBD?
6. **Damiane missing weapons** -- Rapier, Musket, Pistol not in WEAPONS array (only Greatsword present under wrong type name 'Claymore').
7. **Oongka missing weapons** -- Axes and Arm Cannon not in WEAPONS array.
8. **NPC data structure** -- No interface defined for NPCs. Multiple named NPCs (Elowen, Marius, Russo, etc.) ready to add once structure exists.
9. **Sub-location / POI data structure** -- Many confirmed locations (Karin Quarry, Thornbriar Fortress, Howling Hill, etc.) have no home in the current data model.
10. **Ancient Obelisks, Sanctums, Spires, Ancient Ruins** -- Challenge systems and collectibles not in app data.
