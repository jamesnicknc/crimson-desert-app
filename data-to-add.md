# Crimson Companion App -- Data To Add / Fix

_Last updated: 2026-03-24 (Run 21 -- Day 6 Post-Launch / Apply-Data Task Run)_

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

#### Falling Palm [Central Skill] [APPLIED 2026-03-19] -- Flagged: 2026-03-16 (Run 10), Confirmed: 2026-03-18 (Run 13), Applied: 2026-03-19 (Nightly Run)
- Description: "Unleash a powerful blow to the ground by harnessing the force of the fall and channeling all your Stamina into the strike." Consumes all remaining Stamina on use.
- This skill sits at the convergence point of all three skill branches. allthings.how (Tier 2) confirms: "Unlocks upon completing any single branch."
- SOURCE CONFLICT on unlock condition: One search summary (low-confidence, summarized source) stated it is "unlocked by default." The Tier 2 allthings.how dedicated article explicitly states completing a branch unlocks it. Trust allthings.how -- the "by default" claim is likely an error in a summary.
- **NOTE (Run 14):** Falling Palm is NOT absent -- it IS already in game-data.ts as `{ id: 'k-c1', name: 'Falling Palm', cost: 'Convergence', branch: 'Core', character: 'kliff' }`. However, the description in the app says "unlocked after mastering all three branches" which contradicts the verified source ("completing any single branch"). This description correction should be applied -- but since the item is [NEEDS REVIEW], leaving for human decision on timing.
- Source: allthings.how skill tree breakdown [2026-03-18] -- Tier 2; Beebom skills article [2026-03-16] -- Tier 2; Sportskeeda Kliff skill tree article [2026-03-18] -- Tier 2
- Needs review: Correct the existing description from "mastering all three branches" to "completing any single branch" to match 3x Tier 2 sources.

### Bosses & Enemies

#### Crowcaller / "Draven" Identity Resolution [MAJOR UPDATE -- POST-LAUNCH] -- Flagged: 2026-03-19 (Run 14)
- **Crowcaller** is confirmed as a main-story boss in Crimson Desert. Description matches the pre-launch "Draven" exactly: adorned in darkness, raven-like appearance, can briefly turn into black particles to close distance rapidly, fought twice in the story.
- **Location:** Spire of Soaring, Demeniss region -- confirmed by powerpyx.com and search result sources.
- **Quest associations:** First encounter in "Bloodwind" quest (1 HP bar), second encounter in "Toward the Nest" quest (3 HP bars, more aggressive in each phase). Setting: dark sky battlefield with crows, cages hanging from leafless trees.
- **CONFIRMED REWARD:** "Tauria Curved Sword" (great for heavy attacks and crowd control) -- confirmed by PowerPyx boss guide [2026-03-19] -- Tier 1.
- **"Draven" status:** Pre-launch sources (Beebom) described a boss they called "Draven" with identical traits (raven-themed, darkness particles, story antagonist, darkness ability obtainable post-fight). This is very likely the same boss with the final name "Crowcaller." The name "Draven" should be treated as a pre-release placeholder or source error. High confidence Crowcaller = "Draven." Flag for in-game verification.
- Source: PowerPyx boss guide [2026-03-19] -- Tier 1; web search corroboration -- Tier 1
- Action: Add Crowcaller to BOSSES array with confirmed data. Remove "Draven" from queue if in-game confirms they are the same boss.
  ```json
  {
    "name": "Crowcaller",
    "region": "demeniss",
    "type": "Human",
    "difficulty": "extreme",
    "reward": "Tauria Curved Sword",
    "element": "abyss",
    "weakness": null
  }
  ```
  Note: element 'abyss' inferred from darkness/raven/particle abilities -- single source quality, not confirmed by stat sheet. Mark as editorial pending in-game element display confirmation.

#### Kailok, the HornSplitter -- ALL FIELDS CONFIRMED [ALREADY IN APP -- verified 2026-03-20 Run 16] -- Updated: 2026-03-20 (Run 15)
- All fields now confirmed:
  - **REGION CONFIRMED: 'hernand'** -- Goldleaf Guildhouse, Unicorn Cliff, Chapter 2. game8 confirms: "Goldleaf Guildhouse during Chapter 2." Unicorn Cliff is within Hernand territory (Split Horn is also at Unicorn Cliffs, Hernand). Two Tier 1 sources confirm Hernand.
  - **Reward: "Sword of the Lord"** + Seal of Greed - Goldleaf Merchant Guild + Iron Ore x7 (game8 Tier 1). The primary named reward is Sword of the Lord.
  - **Skill unlock: "Evasive Roll"** -- game8 confirms this skill is learned by Observing after defeating Kailok.
  - Quest: SOURCE CONFLICT -- PowerPyx [2026-03-19] says "Cheers Echoing From the Edge"; game8 [2026-03-20] says "The End of Greed" (Chapter 2 final quest). These may be two different quests in the same chapter arc, or different naming conventions. Use "The End of Greed" (game8 Tier 1) as primary name; flag the conflict.
  - HP bars: 1. Uses sword wave attacks and shield counters. Enters super armor mode.
  - Type: Humanoid / Goblin
  - difficulty: 'hard' (editorial -- one HP bar, early-mid game)
  - element: 'physical' (sword-based, no magical element)
- Source: game8 Kailok page [2026-03-20] -- Tier 1; PowerPyx boss guide [2026-03-19] -- Tier 1
- Action: READY TO ADD. Region 'hernand' is now confirmed.
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

#### Tenebrum [Puzzle Boss / Abyss Entity] [NEEDS REVIEW] -- Flagged: 2026-03-19 (Run 14)
- **New post-launch confirmed boss.** Not in BOSSES array.
- Quest: "Gate to the Otherworld"
- Fight mechanic: Puzzle boss. Player must use Force Palm attacks while airborne. Uses Blinding Flash ability. Fight takes place in a plaza where the floor is missing. Player must double-jump (with wings ability) and time Force Palm strikes during Tenebrum's charging moments. Spirit (green branch resource) management required; hide behind pillars to recharge.
- Type: Unknown (appears to be an entity rather than a human -- "Otherworld" quest name suggests supernatural origin). Likely 'Spirit' or 'Magical' type.
- Region: Unknown. Likely late-game area or Abyss. "Gate to the Otherworld" quest name suggests a dimensional threshold / Abyss-adjacent area.
- element: Unknown. Inferred 'abyss' from quest context, but unconfirmed.
- Still missing: region, difficulty, reward, type, element. All required fields block app add.
- Source: PowerPyx boss guide [2026-03-19] -- Tier 1
- Note: Requires Force Palm (Green branch) to defeat -- this is a mechanic dependency not surfaced in the app's current boss data structure.

#### Ludvig [Lightning Boss] [NEEDS REVIEW] -- Flagged: 2026-03-19 (Run 14)
- **New post-launch confirmed boss.** Not in BOSSES array.
- Quest: "Lonely Jackals"
- HP bars: 2 (includes transformation into "Awakened Ludvig" phase 2)
- element: 'shock' / lightning (confirmed -- teleports frequently and uses lightning damage in both phases)
- Type: Human (appears humanoid in the PowerPyx guide)
- Phase 2 ("Awakened Ludvig"): Constant teleporting makes landing hits difficult. Focus on dodging; attack after he completes combos or stops teleporting.
- Region: Unknown. "Lonely Jackals" quest context not mapped to a region in available sources.
- Still missing: region, difficulty, reward, confirmed type. Region and reward block app add.
- Source: PowerPyx boss guide [2026-03-19] -- Tier 1

#### One-Armed Ludvig [Oongka's Introduction Boss] [ADDED -- 2026-03-24 (Run 21): reward corrected to 'None'] -- Flagged: 2026-03-19 (Run 14), Updated: 2026-03-24 (Run 19), Applied: 2026-03-24 (Run 21)
- **ALREADY IN APP** as `{ name: 'One-Armed Ludvig', region: 'pailune', ... }` at line ~540 in game-data.ts.
- **REGION:** game8 (Tier 1) confirms **Kingshield Mountain, Pailune** during "Twisted Fate" quest / Chapter 7 "Homecoming." However, Fextralife (Tier 1) says "mountains of Demeniss." **SOURCES CONFLICT on region.** App currently has 'pailune' which aligns with game8 and the Chapter 7 "Homecoming"/"Protector of Pailune" trophy context. Pailune is more likely correct.
- **REWARD: None** -- game8 (Tier 1) explicitly states "One-Armed Ludvig does not drop any rewards." This is unusual for a boss. Confirm in-game.
- Quest: "Twisted Fate" / "Time to Face Justice" -- Chapter 7: Homecoming
- HP bars: 1
- element: 'shock' / lightning (confirmed -- same base character as Ludvig, retains lightning attacks)
- Type: Human
- Notable: This is the first boss fought as Oongka (rather than Kliff). Oongka can dual-wield in this fight but lacks a shield; retains parry ability. PowerPyx recommends using "Sword of the Lord" for its wave attack against this boss.
- Difficulty: 'hard' (editorial -- 1 HP bar, first Oongka boss)
- Source: PowerPyx boss guide [2026-03-19] -- Tier 1; game8 One-Armed Ludvig page [2026-03-24] -- Tier 1; Fextralife Bosses page [2026-03-24] -- Tier 1 (note: region conflict with game8)
- **Action (for human):** Verify app entry is correct. Region 'pailune' is likely correct (game8 + Chapter 7 context). Reward may need to be set to 'None' or left as-is. Region conflict between game8 (Pailune) and Fextralife (Demeniss mountains) needs in-game check.

#### Gregor, the Halberd of Carnage [Spear Boss] [ADDED -- 2026-03-24 (Run 21)] -- Flagged: 2026-03-19 (Run 14), Updated: 2026-03-24 (Run 19), Applied: 2026-03-24 (Run 21)
- **ALREADY IN APP** as `{ name: 'Gregor the Halberd of Carnage', region: 'demeniss', reward: 'Unknown (TBD)' }`. This is a CORRECTION, not a new entry.
- **REGION NOW CONFIRMED: 'hernand'** -- PowerPyx "Where the Wind Guides You" walkthrough (Tier 1) explicitly says "Hernand region." GameRant Gregor boss guide (Tier 2) confirms Chapter 8, Fort Ironclad. 2 independent sources confirm Hernand. App has 'demeniss' which is WRONG.
- **REWARD NOW CONFIRMED: 'Golden Vanguard' (Lance) + 1 Abyss Artifact** -- PowerPyx walkthrough (Tier 1) confirms. GameRant (Tier 2) corroborates.
- Quest: "Where the Wind Guides You" -- Chapter 8: Blood Coronation
- HP bars: 1
- Type: Human
- Weapon: Spear / halberd
- element: 'physical' (human spear-fighter, no elemental abilities observed in guide description)
- Environmental mechanic: Arrows are fired from walls during the fight.
- Combat: Enters super armor mode with multiple consecutive stab attacks. Dodge-focused fight.
- Difficulty: 'hard' (editorial -- 1 HP bar, human boss, mid-story)
- Source: PowerPyx walkthrough [2026-03-24] -- Tier 1; GameRant boss guide [2026-03-24] -- Tier 2; TheGamer boss guide [2026-03-24] -- Tier 2
- **Action (for human):** Change `region: 'demeniss'` to `region: 'hernand'`, change `reward: 'Unknown (TBD)'` to `reward: 'Golden Vanguard, 1 Abyss Artifact'`, update `location` to 'Fort Ironclad, Hernand (quest: Where the Wind Guides You)'. Also update the quest entry at the same time. 2+ sources confirm both corrections.

#### Myurdin -- Region Conflict + Reward + Element Confirmed [NEEDS REVIEW] -- Updated: 2026-03-20 (Run 15)
- **REGION SOURCE CONFLICT -- RE-EVALUATE:** Run 14 changed the app from 'demeniss' to 'pailune'. A new conflict emerged in Run 15:
  - PowerPyx "Battle at Silverwolf Mountain" walkthrough [2026-03-20] explicitly says **"Hernand region"** for this quest.
  - Fextralife wiki says Myurdin is "Leader of Black Bear Forces causing turmoil in Pailune" -- describes his faction backstory, not necessarily the fight location.
  - Chapter 7 is named "Homecoming" with trophy "Protector of Pailune" for completion. GameRant chapter list confirms Chapter 7 includes "Battle at Silverwolf Mountain" -- placing this quest in the Pailune chapter.
  - VERDICT (Run 15): Chapter 7's name and trophy strongly favor 'pailune'. PowerPyx may have mislabeled the region in its per-quest walkthrough. Current app value of 'pailune' is likely correct. Needs in-game region UI verification.
- **REWARD NOW CONFIRMED: "Melted Ambition" (Sword)** -- PowerPyx Battle at Silverwolf Mountain walkthrough [2026-03-20] -- Tier 1. Add this reward field to the existing BOSSES entry.
- **ELEMENT NOW CONFIRMED: 'fire'** -- Myurdin transforms into "Lava Myurdin" in phase 2 with confirmed fire/lava attacks. Confirmed by PowerPyx, sportskeeda, game8 [2026-03-20] -- Tier 1.
- HP bars: 2 (phase 1 = melee bear; phase 2 = lava transformation with flurry of flame abilities).
- Action: Region 'pailune' currently in app. ADD `reward: 'Melted Ambition'` and `element: 'fire'` to the existing BOSSES array entry.
- Source: PowerPyx Battle at Silverwolf Mountain walkthrough [2026-03-20] -- Tier 1; GameRant chapter list [2026-03-20] -- Tier 2

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

#### Fortain, the Cursed Knight [Castle Boss] [NEEDS REVIEW] -- Updated: 2026-03-20 (Run 15)
- Type: Human / Cursed
- Location: **Thornbriar Fortress** -- Fextralife wiki [2026-03-20] -- Tier 1. Confirmed fight location name.
- Region: SOURCE CONFLICT -- PowerPyx "The Cursed Knight" walkthrough says **"Hernand region"**. However, the quest is in Chapter 8 "Blood Coronation" > Sub-chapter "To Demeniss," implying transition into Demeniss territory. Thornbriar Fortress could be a borderland location.
  - VERDICT: Leave region as unknown for now. PowerPyx may use "Hernand region" as a carry-over from the preceding quest chain, while the actual fight in Thornbriar Fortress might be a Hernand/Demeniss border location or early Demeniss. Flag for in-game region UI check.
- **REWARD NOW CONFIRMED: "Shackle of Might" (Sword)** + 1 Abyss Artifact -- PowerPyx "The Cursed Knight" walkthrough [2026-03-20] -- Tier 1.
- description: "A gigantic warrior empowered by cursed warrior spirits" with tough armor. Summons a ghost knight that either slams or fires arrows -- continuously interrupting attack windows. Fighting style: human with shield.
- HP bars: 1.
- Element: None / Physical (no elemental attacks confirmed -- shield + cursed knight summon only)
- Difficulty: 'hard' (editorial -- shield-tanking, constant summon interruptions, single HP bar)
- Quest: "The Cursed Knight" -- Main Quest #115, Chapter 8: Blood Coronation, Sub-chapter: To Demeniss
- Still missing: `region` (Hernand vs Demeniss conflict unresolved). Reward and location now confirmed.
- Source: Fextralife wiki [2026-03-20] -- Tier 1 (Thornbriar Fortress name); PowerPyx "The Cursed Knight" walkthrough [2026-03-20] -- Tier 1 (reward, mechanic)
- Action: Can add to BOSSES with region TBD, or wait for region verification. All other fields are now confirmed.
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

#### Marni's Excavatron [Hernand Mechanical Boss] [ALREADY IN APP -- verified 2026-03-20 Run 16] -- Updated: 2026-03-20 (Run 15)
- Type: Mechanical
- **Region: 'hernand'** -- CONFIRMED by game8 [2026-03-20] Tier 1 and deltiasgaming.com [2026-03-20] Tier 2. Fight is at Karin Quarry in Hernand. CORRECTION: The original research doc (Run 11) placed this in "Delesyia (Marni's Masterium sub-zone)" -- this was WRONG.
  - The machine was CREATED by Marni (inventor from Delesyia) but the boss fight is in Hernand's Karin Quarry, where the Bleed Bandits (Walter Lanford's gang) used it to oppress House Roberts' quarry.
- Description: A large quarrying machine repurposed by the Bleed Bandits as a war machine. Guarding Karin Quarry, which originally belonged to House Roberts.
- Quest: "Estate in Dismay" (faction questline / side quest, Chapter 2 era) / "House Roberts' Stolen Quarry" (description used by some sources -- may be same quest)
- **REWARD CONFIRMED: "Mining Knuckledrill (II)"** (ATK: 16, One-Handed) + Gold Vein Map -- game8 [2026-03-20] Tier 1.
- Boss mechanic: Use Force Palm to stagger the Excavatron and create attack openings.
- Difficulty: 'hard' (editorial -- optional boss, requires Force Palm timing)
- Element: 'physical' (mechanical construct, no elemental attacks confirmed)
- Source: game8 Marni's Excavatron page [2026-03-20] -- Tier 1; deltiasgaming.com [2026-03-20] -- Tier 2
- Note: The 'Delesyian Automaton' entry in the app's BOSSES array is a SEPARATE entry from this boss (or a pre-launch placeholder). The Delesyian Automaton may not exist as a real boss under that name. Compare in-game knowledge codex -- the 76 bosses should confirm whether both entries exist or only Marni's Excavatron.
- Action: READY TO ADD to BOSSES array with region 'hernand'.
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

#### Walter Lanford Region Correction [APPLIED 2026-03-19] -- Flagged: 2026-03-17 (Run 11), Applied: 2026-03-19 (Nightly Run)
- Was: region 'desert'. Corrected to: region 'hernand'.
- Fextralife wiki (post-launch) confirms location as Fort Warspike, Hernand region.
- Source: Fextralife Walter Lanford wiki [2026-03-19] -- Tier 1

#### Desert Ancient [RESOLVED -- 2026-03-24 (Run 20), ADDED as Praevus the Ancient -- 2026-03-24 (Run 21)]
- **RESOLUTION:** The "Desert Ancient" pre-launch placeholder is confirmed to be **Praevus the Ancient**, part of the Shackled God Faction Quest in Delesyia.
- In-game name: Praevus the Ancient. Region: desert (Abyss Debris, west of Tashkalp). Element: fire (fire lasers, meteors). Type: Flying boss (not a ground elemental as originally inferred).
- Full data in Run 20 boss entry (data-run20-additions.md) -- READY TO ADD to BOSSES array.
- Source: GameRant Tier 2 x2 [2026-03-24]

### Weapons

#### Sword of the Lord [Boss Drop Weapon] [POST-LAUNCH CONFIRMED] -- Flagged: 2026-03-19 (Run 14)
- Dropped by: Kailok, the HornSplitter
- Type: Sword (Kliff -- confirmed usable by Oongka as well per PowerPyx strategy note for One-Armed Ludvig fight)
- Special ability: Creates sword wave projectiles (extends melee attacks into mid-range wave strikes)
- Use case: Great for quick attacks and ranged sword waves. Recommended for Cassius Morten fight.
- Not in WEAPONS array.
- Stats unknown (no numeric data in any source yet). Add with stats TBD pending wiki stat pages.
- Source: PowerPyx boss guide [2026-03-19] -- Tier 1
- Note: The wave mechanic means this is a cross-character weapon (both Kliff and Oongka can use it). Confirm character field -- may need `character: 'all'` or duplicate entries.

#### Tauria Curved Sword [Boss Drop Weapon] [POST-LAUNCH CONFIRMED] -- Flagged: 2026-03-19 (Run 14)
- Dropped by: Crowcaller (second encounter, Toward the Nest quest)
- Type: Sword (Kliff -- all usage examples in sources reference Kliff)
- Special ability / use case: Superior for heavy attacks and crowd control. Recommended by PowerPyx for Cassius Morten fight (combined with Nature's Echo skill to duplicate heavy attacks).
- Not in WEAPONS array.
- Stats unknown. Add with stats TBD.
- Source: PowerPyx boss guide [2026-03-19] -- Tier 1

#### Grilled Meat [Consumable / Primary Healing Item] [ALREADY IN APP -- verified 2026-03-21 Run 17] -- Flagged: 2026-03-19 (Run 14)
- The primary combat healing consumable in Crimson Desert.
- Effect: Restores 80 HP per use.
- Crafting: 1 unit of raw meat at any bonfire. Extremely cheap to craft.
- Use: PowerPyx recommends bringing 100-200 per boss fight. It is the standard healing item referenced in all guides and strategies.
- **Run 17 note (2026-03-21):** Already present in RECIPES array as `{ name: 'Grilled Meat', type: 'cooking', ingredients: ['Tough Meat x1'], effect: '+80 HP. Best bulk healing item...' }`. The ingredient is listed as "Tough Meat" (in-game name) rather than "Raw Meat" (pre-launch source). No action needed.
- Source: PowerPyx boss guide + tips [2026-03-19] -- Tier 1

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

#### Full Main Quest List [POST-LAUNCH CONFIRMED] -- Flagged: 2026-03-19 (Run 14)
- The complete main quest chain is now confirmed from allthings.how (Tier 2) post-launch guide. The current QUESTS array uses editorial/invented quest names. The confirmed names are substantially different. This is a high-severity data quality issue (similar to the skill names issue).
- **Full confirmed main quest names in order:**
  1. Prologue: Dead of Night
  2. Unfamiliar Lands
  3. The First Encounter
  4. Alchemist's Traces
  5. Golden Greed
  6. Hernand in Chaos
  7. For Honor (contains Matthias boss fight)
  8. Awestruck
  9. Shadow Cast Over the River
  10. Where Misery Gathers
  11. Trial After Trial
  12. The Man Trapped in the Mire
  13. Missing Companion
  14. Secrets Hidden in the Dark
  15. Unexpected Gift
  16. Tales of the Hernanian Merchants
  17. Master of the Forgotten Lands
  18. Truth and Lies
  19. The Wheel of Greed
  20. Healer on the Hook
  21. Abyss without Balance
  22. Mystical Key
  23. Woman in White
- **Confirmed side quest chains:** "Rhett's Request", "Annabella's Request"
- **Confirmed bounty chain:** Outlaws in Hernand -> Bounty Notice — Jeffrey -> Bounty Notice — Bianca -> Bounty Notice — Simon de Montfort
- **Boss-to-quest mapping (confirmed from PowerPyx walkthrough):**
  - Matthias → For Honor
  - Kailok, the HornSplitter → Cheers Echoing From the Edge
  - Reed Devil → Dance with the Devil
  - Tenebrum → Gate to the Otherworld
  - Kearush the Slayer → Demenissian Delegation
  - Crowcaller (x2) → Bloodwind, then Toward the Nest
  - Cassius Morten → Traitor
  - Ludvig → Lonely Jackals
  - Myurdin → Battle at Silverwolf Mountain
  - One-Armed Ludvig → Time to Face Justice
  - Gregor, the Halberd of Carnage → Where the Wind Guides You
  - Fortain, the Cursed Knight → The Cursed Knight
- **Important note:** The game has NO traditional XP system. Quest progression rewards Abyss Artifacts (skill tree currency), unique weapons/armor, and "Observing" mechanics that permanently unlock certain abilities. Some abilities are missable if specific quest moments are skipped.
- **Chapter structure:** Game has at least 7 chapters (Trophy "Protector of Pailune" = Finish Chapter 7 of main story). "Novice Adventurer" = Complete Chapter 1. Total chapter count not confirmed from current sources.
- Action needed: Rewrite QUESTS array with confirmed quest names. Current names ("The Greymane's Burden", "Shadows over Demeniss", etc.) are editorial and do not match in-game text.
- Severity: High. The app presents wrong quest names to users.
- Source: allthings.how quest guide [2026-03-19] -- Tier 2; PowerPyx walkthrough [2026-03-19] -- Tier 1

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

#### Twitch Drop Collectibles [ADDED -- 2026-03-20 (Run 16)] -- Flagged: 2026-03-19 (Run 14)
- [ADDED -- 2026-03-20] 11 Twitch Drop cosmetic items added to COLLECTIBLES['edition']. Watch times and item names verified against game8 Twitch Drops page (Tier 1) and web search corroboration (GamesRadar, Keengamer, PCGamer, ScreenRant all confirmed).
- NOTE: The original queue entry listed 8 items with incorrect watch times. Verification found 11 cosmetic items total with corrected watch times. The "10x Modest Braised Meat" consumable from Week 1 was not added (not a cosmetic collectible). The queue's "Blue Scout Horse Armor" was actually 3 separate horse tack items (Stirrups, Champron, Saddle). "Blue Scout Lantern" was also missing from the original queue entry.
- Source: game8 Twitch Drops page [2026-03-20] -- Tier 1; web search corroboration (multiple Tier 1/2 sources) [2026-03-20]

#### Khaled Shield [Pre-Order Bonus Collectible] [ADDED -- 2026-03-19 (Run 14 verification)]
- VERIFIED ALREADY IN APP: game-data.ts COLLECTIBLES['edition'] includes `{ name: 'Khaled Shield', location: 'Pre-Order Exclusive', category: 'edition' }`.
- Location text in app ("Pre-Order Exclusive") is slightly different from the research doc recommendation ("Pre-Order Bonus (All Platforms)") but functionally equivalent. No change needed unless location text precision matters.
- Source: Pearl Abyss official release FAQ -- Tier 1. Verified in game-data.ts by Run 14.

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

### Myurdin -- Region Wrong: 'demeniss' Should Be 'pailune' [STALE -- SEE NOTE] -- Flagged: 2026-03-19 (Run 14), Reviewed: 2026-03-20 (Run 16)
- Current app value: `{ name: 'Myurdin', region: 'demeniss', ... }`
- Post-launch confirmation: Myurdin is "Leader of Black Bear Forces causing turmoil in Pailune" (Fextralife wiki, Tier 1). Boss fight quest is "Battle at Silverwolf Mountain" -- Silverwolf Mountain is in Pailune.
- Action: Change `region: 'demeniss'` to `region: 'pailune'` in BOSSES array.
- Source: Fextralife wiki Bosses page [2026-03-19] -- Tier 1; PowerPyx quest structure -- Tier 1
- Confidence: High. Two independent Tier 1 sources confirm Pailune.
- **Run 16 note (2026-03-20):** This correction is STALE. The base Myurdin entry in game-data.ts now has `region: 'hernand'` (not 'demeniss'). A separate `Lava Myurdin` entry already exists with `region: 'pailune'`, `element: 'fire'`, and `reward: 'Melted Ambition'`. The two-entry split may be intentional (first encounter vs fire transformation). Human review needed to decide: should the base Myurdin also be 'pailune', or does the first encounter actually occur in Hernand? The Hills of No Return location listed for base Myurdin may be in Hernand or Pailune depending on chapter context.

### Fortain the Cursed Knight -- Region Wrong: 'demeniss' Should Be 'hernand' [ADDED -- 2026-03-22 (Run 18)] -- Flagged: 2026-03-20 (Run 15), Resolved: 2026-03-22 (Run 17), Applied: 2026-03-22 (Run 18)
- Applied: Changed `region: 'demeniss'` to `region: 'hernand'` and `location` to 'Thornbriar Fortress, Hernand (quest: The Cursed Knight)' in game-data.ts.
- Verified by 4 independent sources: Fextralife (Tier 1), PowerPyx (Tier 1), game8 (Tier 1), Deltia's Gaming (Tier 2).

### Titan -- Region Wrong: 'desert' Should Be 'pailune' [SINGLE SOURCE -- NEEDS REVIEW] -- Flagged: 2026-03-22 (Run 17), Reviewed: 2026-03-22 (Run 18), Re-checked: 2026-03-24 (Run 19)
- Current app value: `{ name: 'Titan', region: 'desert', location: 'Unknown', reward: 'Unknown (TBD)' }`
- Run 17 confirmation: GameRant Titan boss guide explicitly states the fight is unlocked by completing Pailune Faction Quests (Stjar Clan, Skallcove).
- Titan is a Pailune faction quest boss. The desert region assignment was a pre-launch speculation error.
- **Run 19 re-check (2026-03-24):** game8 Pailune Region Guide does NOT list Titan. Fextralife Bosses page does NOT have a Titan entry. Still only GameRant (Tier 2) as single source. Remains [SINGLE SOURCE -- NEEDS REVIEW].
- Reward confirmed: 'Reckoning Two-Handed Spear, Lightning Bolt Plate Armor' (GameRant Tier 2).
- Action: Change `region: 'desert'` to `region: 'pailune'`, update `location` to 'Pailune (Skallcove, Stjar Clan Faction Quest)', update `reward` to 'Reckoning Two-Handed Spear, Lightning Bolt Plate Armor'. Update `mechanics` to note 2 phases (Titan + Gigantified Titan).
- Source: GameRant Titan boss guide [2026-03-22] -- Tier 2
- **Run 18 note (2026-03-22):** Verification attempted. Only GameRant confirms Pailune region and rewards. game8 and Fextralife do not yet have a Titan boss page. Correction requires 2+ independent sources per apply-data rules. Skipped pending second source confirmation.

### Walter Lanford -- Reward: 'Unknown (TBD)' Should Be 'Golden Piggy Bank' [SINGLE SOURCE -- NEEDS REVIEW] -- Flagged: 2026-03-19 (Run 14), Resolved: 2026-03-22 (Run 17), Reviewed: 2026-03-22 (Run 18)
- Current app value: `{ name: 'Walter Lanford', region: 'hernand', element: 'physical', reward: 'Unknown (TBD)' }`
- GameRant confirms Golden Piggy Bank is rewarded by defeating Walter Lanford during "The Nemesis' Demise" quest.
- The Golden Piggy Bank enables passive offline gold generation.
- Shotgun moveset is craftable (not a direct drop) -- confirm in-game before adding as a separate reward entry.
- Action: Change `reward: 'Unknown (TBD)'` to `reward: 'Golden Piggy Bank'`. Optionally add quest name to `mechanics` field.
- Source: GameRant "Walter Lanford Golden Piggy Bank" [2026-03-22] -- Tier 2
- **Run 18 note (2026-03-22):** Verification attempted. Only GameRant confirms Golden Piggy Bank reward. Fextralife Walter Lanford page reward section is still empty ("Boss Drops and Rewards go here"). PowerPyx boss guide does not include Walter Lanford. Correction requires 2+ independent sources per apply-data rules. Skipped pending second source confirmation.
- **Run 19 re-check (2026-03-24):** Fextralife Bosses page still has no reward listed for Walter Lanford (description only mentions "shooting skills with his double-barreled gun"). game8 boss list does not have a visible Walter Lanford entry. Still only GameRant (Tier 2) as single source. Remains [SINGLE SOURCE -- NEEDS REVIEW].

### Walter Lanford -- Element Wrong: 'fire' Should Be 'physical' [ALREADY APPLIED -- verified 2026-03-20 Run 16] -- Flagged: 2026-03-19 (Run 14)
- Current app value (as of Run 16): `{ name: 'Walter Lanford', region: 'hernand', element: 'physical', reward: 'Unknown (TBD)' }`
- Both the region correction (desert -> hernand) and element correction (fire -> physical) were already applied in a prior run. Reward field remains 'Unknown (TBD)' pending confirmation.
- Source: Fextralife Walter Lanford wiki (Tier 1); PowerPyx walkthrough [2026-03-19] -- Tier 1

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

### Walter Lanford Region + Element -- Confirmed Wrong [NEEDS REVIEW] -- Flagged: 2026-03-17 (Run 11), Updated: 2026-03-20 (Run 15)
- Current value in game-data.ts: `{ region: 'desert', element: 'fire', reward: 'Hand Cannon Blueprint' }`
- **Region:** App has 'desert' -- CONFIRMED WRONG. **Run 15 update:** Fextralife wiki now explicitly lists Walter Lanford's location as **"Fort Warspike" AND "Hernand"** -- confirming that Alfonso Estate / Fort Warspike is in the HERNAND region. Change region from 'desert' to 'hernand'.
  - Note: Alfonso Spear (ATK: 13) and Warspike Spear (ATK: 14) both appear in game8's weapons list and are named after Alfonso Estate and Fort Warspike respectively. One of them may be Walter Lanford's reward -- but this is editorial inference, not confirmed.
  - Action: Change `region: 'desert'` to `region: 'hernand'` immediately (Fextralife Tier 1 confirmed).
- **Element:** App has 'fire' -- CONFIRMED WRONG. All attacks (Double Barrel Shot, Double Barrel Barrage, Scattershot, Shrapnel Shower, Poof) are purely ballistic/physical. No fire attribute exists. Change to 'physical'.
  - Action: Change `element: 'fire'` to `element: 'physical'` immediately.
- **Reward:** 'Hand Cannon Blueprint' -- still unconfirmed post-launch. Fextralife reward field still shows "???" as of Run 15. 'Alfonso Spear' or 'Warspike Spear' are speculative candidates given location naming. Do not use any reward until confirmed.
- Source: Fextralife Walter Lanford wiki [2026-03-20] -- Tier 1 (confirms Hernand + Fort Warspike); game8 weapons list [2026-03-20] -- Tier 1 (Alfonso Spear, Warspike Spear named weapons)

### Skill Names in SKILLS Array -- Mass Accuracy Issue [NEEDS REVIEW] -- Flagged: 2026-03-16 (Run 10)
- The SKILLS array uses invented/editorial names for Kliff's abilities. The Beebom skills article (Tier 2, from direct preview gameplay) confirms the actual in-game names are substantially different.
- This affects the following branches: Sword Mastery (Blue), Unarmed Combat (Blue), Ranged and Bow (Blue), and all Green and Red branch skills for Kliff.
- Recommended action: Audit the SKILLS array against the full confirmed in-game skill list post-launch and rename entries to match official in-game text. New entries will also need to be created for skills not currently in the array.
- Severity: High. The app presents incorrect skill names to users.
- Source: Beebom skills article (https://beebom.com/crimson-desert-skills/) [2026-03-16] -- Tier 2
- Note: Damiane and Oongka skill names have not been confirmed from an authoritative source yet, so their current names may or may not be accurate. Flag for post-launch verification as well.

### Complete Trophy List [POST-LAUNCH CONFIRMED] -- Flagged: 2026-03-19 (Run 14)
- Full trophy list now verified from PowerPyx trophy guide (Tier 1). Total: 35 trophies (34 on Steam/Xbox + 1 Platinum on PS5). Estimated platinum time: 300+ hours.
- **Platinum (1):** Pywel Legend
- **Gold (4):** Expert Storyteller (finish all main quests), Conqueror of the Abysses (all Abyss challenges), Expert Explorer (all exploration challenges, 9 subcategories), Unvanquished Strategist (all mastery challenges, 10 weapon/equipment types)
- **Silver (10):** Proud Returnee (relocate Greymane Camp from Howling Hill to Pailune), Pilgrim of Wonders (all secret place challenges), Puzzle Solver (all puzzle challenges), Lightbringer (all sanctum challenges), Grand Collector of Arms (all special weapon challenges), Tamer of Legends (all horse challenges), True Gamer (all minigame challenges), Protector of Pailune (finish Chapter 7), Ultimate Hunter (all hunting challenges), Natural Collector (all life-based challenges)
- **Bronze (20):** Novice Adventurer (Chapter 1 complete), Master Camper (activate camp at Howling Hill), Maze Pathfinder, Conqueror of Spires, Navigator of the Stars, Master of Swords, Master of Shields, Master of Bows, Master of Spears, Master of Two-Handed Weapons, Master of Artillery (cannon challenges -- confirms Artillery as distinct weapon category), Master of Rapiers, Master of Firearms, Relentless Warrior, Battlefield Conqueror, Brilliant Tactician, The Golden Merchant, Beast Slayer, Shadowlord, Lord of Honor
- Key data from trophies:
  - "Howling Hill" confirmed as the starting camp location before it relocates to Pailune (new lore detail not previously in research doc).
  - Game has at least 7 story chapters (Chapter 7 = "Protector of Pailune" trophy milestone).
  - Sanctums are a confirmed game feature (Lightbringer trophy) -- not currently represented in app data.
  - "Master of Artillery" is separate from "Master of Firearms" -- Artillery = cannon/siege weapons, Firearms = guns. Two distinct weapon mastery categories.
  - "Navigator of the Stars" and "Conqueror of Spires" imply Constellation and Spire challenge types -- not currently represented in app.
- Source: PowerPyx trophy guide [2026-03-19] -- Tier 1
- Action: Consider adding a Trophies/Achievements section to the app (currently flagged as a 35-trophy feature gap from Run 10). Full data is now available to populate it.
- **Run 17 note (2026-03-21): TROPHIES array already exists in game-data.ts (line 1228) with all 35 entries. However, RARITY ASSIGNMENTS ARE WRONG.** The app has 1P/5G/16S/13B but the confirmed distribution is 1P/4G/10S/20B. Multiple trophies have incorrect rarity tiers. Additionally, trophy descriptions in the app are editorial/generic and do not match the confirmed in-game text from Beebom and PowerPyx. Specific discrepancies:
  - Trophies incorrectly listed as Gold in app (should be Silver): Grand Collector of Arms, Tamer of Legends, Natural Collector
  - Trophy incorrectly listed as Gold (should be Bronze): Conqueror of Spires
  - Trophies incorrectly listed as Silver (should be Gold): Expert Storyteller, Expert Explorer, Unvanquished Strategist
  - Trophies incorrectly listed as Silver (should be Bronze): Master of Swords, Master of Shields, Master of Bows, Master of Spears, Master of Two-Handed Weapons, Master of Artillery, Master of Rapiers, Master of Firearms, Master Camper, Battlefield Conqueror, The Golden Merchant, Shadowlord, Lord of Honor
  - Trophies incorrectly listed as Bronze (should be Silver): Proud Returnee, Pilgrim of Wonders, Puzzle Solver, Lightbringer, True Gamer, Protector of Pailune
  - Name mismatch: App has "Natural Collector" -- Beebom has "Natural Hunter." PowerPyx and game8 have "Natural Collector." Likely "Natural Collector" is correct (2 vs 1 source).
  - BLOCKED from auto-correction: Rarity assignments only confirmed by PowerPyx (single Tier 1 source). No second source found with explicit rarity classifications. Requires human review or a second rarity source before applying corrections.

### Knowledge Codex Data Not Represented [NEEDS REVIEW]
- The app does not currently surface the Knowledge Codex system or its 2,921-entry breakdown (467 people, 573 territories, 401 creatures, 76 bosses, 110 factions, 355 crafting manuals, 29 mount types). This is a significant game mechanic that could be surfaced as an activity or progress tracker in the app.
- Source: Sportskeeda (https://www.sportskeeda.com/esports/with-3000-knowledge-entries-crimson-desert-easily-beats-rdr2-exploration-compendium)
- Flagged: 2026-03-15

---

## Recently Added (Archive)

### Flagged 2026-03-24 (Run 20) -- Day 6 Post-Launch / Shackled God Quest & Optional Boss Pass

**Context:** Second run of March 24, 2026 (Day 6). Full details in `data-run20-additions.md`. Sources: game8 (Tier 1), GameRant x4 (Tier 2), GameSpot (Tier 2), Pearl Abyss official patch revision (Tier 1). Main focus: Shackled God faction questline, five new optional bosses, Desert Ancient gap closure, Bonepit Greathammer resolution.

- **Patch 1.00.03 Revision clarified** -- 120Hz display setting separated; T'rukan officially named in Pearl Abyss patch notes (Tier 1). No Patch 1.00.05 released yet.
- **Patch 1.00.04 platform conflict** -- Run 19 said PS5 character-switching fix; this run found Mac Steam crash fix. Both may be same version number on different platforms. Discrepancy flagged.
- **Bonepit Greathammer confirmed as world loot** [Weapons/Muskan gap] -- game8 Tier 1 confirms it is RNG-based open-world loot, NOT a Muskan drop. Stats: ATK 20, 2H, Crit Lv1, 5 slots, non-unique. Muskan reward remains unknown.
- **Walter Lanford reward** -- Golden Piggy Bank still single Tier 2 source (GameRant). Recommend human apply at discretion.
- **Priscus the Ancient [ADDED -- 2026-03-24 (Run 21)]** -- Pailune, Spire of Ringing Truth, Five-Finger Mountain. Part of Shackled God Faction Quest. Flying, laser/shadow/spear attacks. Rewards: Blessing of the Immortal, Ancient's Necklace, Ancient Retribution Abyss Gear, Abyss Artifact x1. Source: game8 Tier 1 + GameRant Tier 2.
- **Praevus the Ancient [ADDED -- 2026-03-24 (Run 21); DESERT ANCIENT RESOLVED]** -- Crimson Desert, Abyss Debris west of Tashkalp. Fire element, flying, fire lasers and meteors. Part of Shackled God quest. Rewards: Memory of Ancient Nature, Ancient Earring, Ancient Wrath Abyss Gear, Abyss Artifact x1. CONFIRMED as the pre-launch "Desert Ancient" placeholder. Source: GameRant Tier 2 x2.
- **Aeserion, the Shackled God [NEW BOSS -- NEEDS REVIEW]** -- Delesyia, Serpent Shrine (Dewhaven Territory). Lightning element. Final boss of Shackled God questline; requires defeating all 3 Ancients first. Mechanics: destroy 3 Bismuth Emitters. Reward: Aeserion's Sword. Aeserion Scales (upgrade material) available at Serpent Shrine post-fight. 3x Tier 2 sources, no Tier 1.
- **Abyss Kutum [NEW BOSS -- NEEDS REVIEW]** -- The Abyss, Twisted Thicketway. Eye-based creature, lightning slam. Stagger eye with Focused Shot then melee. Reward: Power Core - Spire of Defiance, Abyss Artifact x1. game8 Tier 1 for mechanics; reward single source.
- **Primus the Ancient [NEW BOSS -- SINGLE SOURCE]** -- Dewhaven Territory (likely Delesyia south), Arrowhead Rock. Flying, shoots missiles. Reward: Ancient Ring, Ancient Reckoning Abyss Gear, Sage's Eye, Abyss Artifact x1. GameRant Tier 2 only -- needs second source.
- **Tristan the Flame Knight [REGION NOW CONTESTED]** -- Run 19's pailune assumption now challenged by source saying quest from "central Demeniss." Reward clarified: Drale Shield is world item found by climbing castle wall (with Dragon Counterattack ability); Spada/Spade Sword is in box near target dummies (also world item, not direct drop). Still single Tier 2 sources. Do not add yet.
- **New Shackled God Ancient accessories/Abyss Gears** [Weapons/Items] -- Six new accessories and Abyss Gears catalogued (Ancient's Necklace, Ancient Earring, Ancient Ring, Ancient Retribution, Ancient Wrath, Ancient Reckoning). See data-run20-additions.md for stats.
- **Kuku Pot system** [New Mechanic] -- Needed to collect Aeserion Scales via Axiom Force. Recipes from Grimnir at Kilnden Workshop, Hernand. End-game crafting material.
- **10+ New Locations** [Map] -- Spire of Ringing Truth, Five-Finger Mountain, Wayward Woods (Pailune); Tashkalp, Abyss Debris (Desert); Dewhaven Territory, Serpent Shrine, Arrowhead Rock (Delesyia); Twisted Thicketway (Abyss); Kilnden Workshop (Hernand); Flame Knight's Castle (Demeniss). All missing from POI arrays.
- **New NPC: Grimnir** -- Kilnden Workshop, Hernand. Kuku Pot recipe merchant.
- **New NPC: Deleysia** -- Serpent Shrine, Dewhaven. Shackled God quest giver.

---

### Flagged 2026-03-24 (Run 19) -- Day 6 Post-Launch / Patch 1.00.03 + New Bosses Pass

**Context:** Today is March 24, 2026, Day 6 post-launch. Sources used this run: Pearl Abyss official patch notes (Tier 1), game8 wiki (Tier 1), PowerPyx walkthroughs (Tier 1), GameRant (Tier 2), thegamer.com (Tier 2), Deltia's Gaming (Tier 2), patchcrazy.co.uk (Tier 2). Main focus: Patch 1.00.03 documentation, three new untracked story bosses (T'rukan, Lucian Bastier, Goyen), skill list confirmation for Damiane and Oongka, and resolving persistent boss data gaps.

---

#### PATCHES -- TWO NEW PATCHES SINCE RUN 17

**Patch 1.00.03 (March 23, 2026) -- Major Content Patch** [Tier 1 -- Pearl Abyss Official]
- **Boss difficulty nerfs:** Reduced health and attack values for early-game enemies AND main story bosses. T'rukan the Ascended specifically adjusted. Parry stun gauge builds faster.
- **Force Palm moved earlier:** Force Palm is now learnable much earlier in the skill tree. Previous progression required completing more of the green branch first.
- **Skill observation:** Observation of a skill is now only required ONCE per skill, then it can be used freely. Previously, some skills required repeat observation moments.
- **More Abyss Nexuses added:** Additional fast travel nodes added across Pywel continent.
- **Private Storage unlocked:** New item storage added at the initial temporary lodgings in Hernand AND at the Howling Hill Camp.
- **Food healing increased:** Health restored from food and ingredients increased globally.
- **Arm Wrestling QTE difficulty:** Lowered.
- **Controls improvements:** Gamepad and keyboard/mouse controls adjusted; interaction response faster; jump more responsive; Menu shortcuts added [I/K/J/M] for KB+M.
- **Nature's Grasp stamina cost reduced.**
- **Bismuth ore mechanics changed:** Petrification now auto-applies; standard pickaxe mining now works.
- **Quest fixes:** Chapter 2 "Reunion" cat guide bug fixed; Chapter 4 "Mysterious Pot" symbol positioning fixed; "Turnali's Request" completion issue fixed.
- **App impact:** Boss difficulty ratings in app may need editorial revision downward (particularly early/normal tier bosses). Force Palm progression note in skills data will be outdated -- it is now accessible earlier. Skill observation note on Falling Palm and other skills should be updated.
- Source: Pearl Abyss official patch notes 1.00.03 [2026-03-23] -- Tier 1 (https://crimsondesert.pearlabyss.com/en-us/News/Notice/Detail?_boardNo=73)

**Patch 1.00.04 (PS5 Hotfix, released ~March 24, 2026)** [Tier 1 -- Pearl Abyss Official]
- Single targeted fix: "An issue where, when switching from another character to Kliff, certain interactions and actions cannot be performed properly." PS5 only.
- App impact: None.
- Source: Pearl Abyss official patch notes 1.00.04 [2026-03-24] -- Tier 1 (https://crimsondesert.pearlabyss.com/en-us/News/Notice/Detail?_boardNo=74)

---

#### BOSSES -- NEWLY CONFIRMED FIELDS (CORRECTIONS TO APPLY)

**1. Gregor the Halberd of Carnage -- Reward: 'Unknown (TBD)' → 'Golden Vanguard' [ADDED -- 2026-03-24 (Run 21)]**
- App has `reward: 'Unknown (TBD)'`.
- Confirmed reward: "Golden Vanguard" (a Lance / 2-handed spear). Fast attacks, longer reach than rapier, can break enemy guard with a few attacks.
- PowerPyx "Where the Wind Guides You" walkthrough [2026-03-24] -- Tier 1 + GameRant Gregor boss guide [2026-03-24] -- Tier 2. Two independent sources.
- Also confirmed: + 1x Abyss Artifact.
- Action: Change `reward: 'Unknown (TBD)'` to `reward: 'Golden Vanguard, Abyss Artifact x1'`.
- Source: [PowerPyx Gregor walkthrough](https://www.powerpyx.com/crimson-desert-where-the-wind-guides-you-walkthrough/) -- Tier 1; [GameRant Gregor guide](https://gamerant.com/crimson-desert-gregor-halberd-carnage-boss-fight-guide/) -- Tier 2
  ```json
  { "name": "Gregor the Halberd of Carnage", "reward": "Golden Vanguard, Abyss Artifact x1" }
  ```

**2. One-Armed Ludvig -- Reward: 'Unknown (TBD)' → None [ADDED -- 2026-03-24 (Run 21)]**
- App has `region: 'demeniss'` and `location: 'Mountains of Demeniss (quest: Time to Face Justice)'`.
- Confirmed region: Pailune. game8 (Tier 1) confirms Ludvig and One-Armed Ludvig are both Pailune bosses (Chapter 7, "Homecoming" arc). Location: Kingshield Mountain, Pailune.
- One-Armed Ludvig does NOT drop a weapon or item reward -- story completion only. game8 confirms no reward listed. GameRant confirms none.
- Note: The Run 17 gap table listed a source conflict (game8 says Pailune, Fextralife says Demeniss mountains). game8 is Tier 1 and aligns with the Chapter 7 / Pailune context. Pailune is correct.
- Action: Change `region: 'demeniss'` to `region: 'pailune'`, update `location` to 'Kingshield Mountain, Pailune (quest: Time to Face Justice)', change `reward: 'Unknown (TBD)'` to `reward: 'None'`.
- Source: [game8 One-Armed Ludvig](https://game8.co/games/Crimson-Desert/archives/588168) -- Tier 1; [GameRant Ludvig guide](https://gamerant.com/crimson-desert-how-to-track-beat-ludvig-time-to-face-justice-guide/) -- Tier 2

**3. Ludvig -- Reward: 'Ignir (two-handed sword)' → SOURCE CONFLICT [NEEDS HUMAN REVIEW]**
- App has `reward: 'Ignir (two-handed sword)'`.
- game8 (Tier 1) confirms Ludvig's reward is: **Hungering Fang Leather Cloak + Hungering Fang Leather Boots** (two armor items).
- SOURCE CONFLICT: The app's "Ignir (two-handed sword)" is not confirmed by any source found in this run. game8's armor reward (Tier 1) is inconsistent with the app's weapon reward.
- Possible explanation: "Ignir" may be a weapon sold by a merchant, found in the world, or dropped by a different enemy. It is NOT confirmed as a Ludvig drop.
- Action: Change `reward: 'Ignir (two-handed sword)'` to `reward: 'Hungering Fang Leather Cloak, Hungering Fang Leather Boots'` using game8 Tier 1 data. Flag "Ignir" for separate investigation as a named weapon.
- Source: [game8 Ludvig page](https://game8.co/games/Crimson-Desert/archives/587740) -- Tier 1
  ```json
  { "name": "Ludvig", "reward": "Hungering Fang Leather Cloak, Hungering Fang Leather Boots" }
  ```

**4. Titan -- Region + Reward [SINGLE SOURCE -- NEEDS REVIEW: GameRant Tier 2 is only publication; no independent second source found during Run 21 verification]**
- Run 17 flagged Titan as SINGLE SOURCE (GameRant only) for region 'pailune' and reward 'Reckoning Two-Handed Spear, Lightning Bolt Plate Armor'.
- This run found a second corroborating source: GameRant Titan boss guide uses the boss title "Titan, the God of Thunder," confirms location as Windsong Peaks / Scorched Mountain in Pailune, and confirms the reward explicitly ("By killing Titan, you will receive the Reckoning Two-Handed Spear and the Lightning Bolt Plate Armor"). Also confirmed: Titan is unlocked via the "Ancient Barrier" Faction Quest (Pailune -- Stjar Clan).
- Note: This is still GameRant-family (Tier 2) sources. game8 still has no Titan boss page. Fextralife still has no dedicated Titan entry. Recommend applying correction but flagging for eventual Tier 1 confirmation.
- Full name: **"Titan, the God of Thunder"** -- update `name` field from 'Titan' to 'Titan, the God of Thunder'.
- Action: Change `region: 'desert'` to `region: 'pailune'`, update `location` to 'Windsong Peaks, Pailune (Faction Quest: Ancient Barrier -- Stjar Clan)', update `reward` to 'Reckoning Two-Handed Spear, Lightning Bolt Plate Armor', update `name` to 'Titan, the God of Thunder'. Update `mechanics` to note 2 phases (Titan + Gigantified Titan).
- Source: [GameRant Titan guide](https://gamerant.com/crimson-desert-titan-boss-guide-gigantic-titan-how-to-beat/) -- Tier 2 (second corroboration)
  ```json
  {
    "name": "Titan, the God of Thunder",
    "region": "pailune",
    "location": "Windsong Peaks, Pailune (Faction Quest: Ancient Barrier)",
    "reward": "Reckoning Two-Handed Spear, Lightning Bolt Plate Armor",
    "mechanics": "2 phases: Titan + Gigantified Titan (phase 2). Faction quest boss -- unlock via Stjar Clan quests. Lightning/spear attacks. Phase 2 area is engulfed in lightning strikes -- spam dodge, avoid glowing blue areas."
  }
  ```

---

#### BOSSES -- THREE NEW STORY BOSSES (NOT IN GAME-DATA.TS)

**T'rukan the Ascended [Chapter 9 Story Boss] -- [ADDED -- 2026-03-24 (Run 21)]**
- Confirmed by GameRant (Tier 2) + thegamer.com (Tier 2). Two independent sources.
- Quest: "True Strength" (Main Quest #129, Chapter 9 -- The Sage of the Desert)
- Region: `demeniss` -- Location: Serpent Marsh, South Demeniss
- Type: Human (fists/martial arts, wears a Leopard Mask)
- Element: 'physical' (fists only, no elemental abilities)
- HP bars: 1 (one HP bar but hits extremely fast and hard)
- Difficulty: `extreme` (editorial -- kills very quickly, fast attack speed, requires at minimum Health Skill Lv6 + Lv6 refined gear)
- Reward: Wooden Mask of Lost Justice (head armor) + Wanderer of Faith Leather Gloves (hand armor) + T'rukan's Fighting Spirit (unknown item type -- possibly Abyss Gear) + 1x Abyss Artifact
- Weakness: null (no elemental weakness confirmed from any source)
- Mechanic notes: Very fast, hits 1-2x per second. Burst down with heaviest gear. No blocking effective -- pure dodge timing. Patch 1.00.03 adjusted his difficulty (slight nerf).
- Source: [GameRant T'rukan guide](https://gamerant.com/crimson-desert-trukan-ascended-boss-fight-guide/) -- Tier 2; [thegamer.com T'rukan guide](https://www.thegamer.com/crimson-desert-trukan-boss-preparation-mechanics-guide/) -- Tier 2
  ```json
  {
    "name": "T'rukan the Ascended",
    "region": "demeniss",
    "type": "Human",
    "difficulty": "extreme",
    "reward": "Wooden Mask of Lost Justice, Wanderer of Faith Leather Gloves, T'rukan's Fighting Spirit, Abyss Artifact x1",
    "element": "physical",
    "weakness": null,
    "location": "Serpent Marsh, South Demeniss (quest: True Strength, Ch.9)",
    "mechanics": "1 HP bar. Extremely fast fist attacks. Pure dodge-based fight -- no blocking or parrying confirmed effective. Chapter 9 boss. Minimum prep: Health Skill Lv6 (750+ HP), gear refined to Lv6+. Patch 1.00.03 difficulty nerf applied."
  }
  ```

**Lucian Bastier [Chapter 8 Story Boss / Damiane Segment] -- [ADDED -- 2026-03-24 (Run 21)]**
- Confirmed by GameRant (Tier 2) + Deltia's Gaming (Tier 2) + PowerPyx A Fleeting Dream walkthrough (Tier 1, URL confirmed). Three sources.
- Quest: "A Fleeting Dream" (Chapter 8 -- Blood Coronation, sub-chapter: Traitor)
- Region: `hernand` -- Location: Chapter 8, Blood Coronation arc
- Type: Human
- Element: 'fire' (phase 1: mace and shield with explosive fire damage on floor. Phase 2: constant teleportation)
- HP bars: 2 (human form → awakened/empowered form)
- Difficulty: `extreme` (editorial -- forced Damiane character, constant blocking in phase 1, constant teleporting in phase 2, described as "notably challenging")
- Reward: Official Knight's Plate Armor (chest) + Official Knight's Leather Boots + Official Knight's Leather Gloves + Official Knight's Plate Gloves + Spire of Clockwork (Key Item)
- Weakness: null (no elemental weakness confirmed)
- Special note: This is a FORCED DAMIANE segment. Kliff is not playable. Lucian Bastier was a loyal officer who betrayed Marquis Stefan Lanford of Calphade.
- Source: [GameRant Lucian Bastier guide](https://gamerant.com/crimson-desert-lucian-bastier-boss-fight-guide/) -- Tier 2; [Deltia's Gaming Lucian guide](https://deltiasgaming.com/crimson-desert-boss-guide-how-to-beat-lucian-bastier/) -- Tier 2; [PowerPyx A Fleeting Dream walkthrough](https://www.powerpyx.com/crimson-desert-a-fleeting-dream-walkthrough/) -- Tier 1
  ```json
  {
    "name": "Lucian Bastier",
    "region": "hernand",
    "type": "Human",
    "difficulty": "extreme",
    "reward": "Official Knight's Plate Armor, Official Knight's Leather Boots, Official Knight's Leather Gloves, Official Knight's Plate Gloves, Spire of Clockwork",
    "element": "fire",
    "weakness": null,
    "location": "Chapter 8 Blood Coronation arc, Hernand (quest: A Fleeting Dream)",
    "mechanics": "2 HP bars. FORCED DAMIANE play (Kliff unavailable). P1: Shield + mace with explosive fire floor damage -- fight from distance; attack after blocked attacks. P2: Constant teleportation -- dodge and strike after teleport animation ends. Betrayed Marquis Stefan Lanford of Calphade to ally with the Drunken Black Bears."
  }
  ```

**Goyen [Chapter 9 Story Boss] -- [ADDED -- 2026-03-24 (Run 21)]**
- Confirmed by PowerPyx Unwavering Steps walkthrough (Tier 1, URL confirmed) + patchcrazy.co.uk (Tier 2).
- Quest: "Unwavering Steps" (Main Quest #124, Chapter 9 -- The Sage of the Desert)
- Region: `desert` -- Location: Crimson Desert region, Chapter 9 "Sage of the Desert" arc
- Type: Human (sword + shield)
- Element: 'physical' (human swordsman, no elemental abilities)
- HP bars: 1
- Difficulty: `extreme` (editorial -- can kill in 1-2 hits with strongest attacks, shockwave jump slam, described as "extreme difficulty spike")
- Reward: Witch's Ring (Accessory) + Greymane's Earring (Accessory)
- Secondary weapon note: "Fated Shadow" (a weapon) is found in the arena AFTER the Goyen fight -- go up the stairs at the back of the arena. This is NOT a direct boss drop; it is a world item accessible after the fight.
- Weakness: null (no elemental weakness confirmed)
- Source: [PowerPyx Unwavering Steps walkthrough](https://www.powerpyx.com/crimson-desert-unwavering-steps-walkthrough/) -- Tier 1; [patchcrazy.co.uk unique weapons guide](https://patchcrazy.co.uk/all-unique-weapons-gear-locations-in-crimson-desert/) -- Tier 2 (Fated Shadow)
  ```json
  {
    "name": "Goyen",
    "region": "desert",
    "type": "Human",
    "difficulty": "extreme",
    "reward": "Witch's Ring, Greymane's Earring",
    "element": "physical",
    "weakness": null,
    "location": "Crimson Desert region (quest: Unwavering Steps, Ch.9)",
    "mechanics": "1 HP bar. Sword + shield, similar moveset to Kliff. Hits extremely hard -- can kill in 1-2 hits with strongest attacks. Jump + shockwave slam is most dangerous move. Tip: Fated Shadow weapon found on stairs at back of arena after the fight (world item, not a drop)."
  }
  ```

---

#### BOSSES -- NEW SINGLE-SOURCE ENTRIES (NEEDS REVIEW BEFORE ADDING)

**Fort Hellwood Boss [Chapter 4 / Village of Saint Senia Quest] [SINGLE SOURCE -- NEEDS REVIEW]**
- Quest: "The Village of Saint Senia" (Chapter 4 -- The Price of Knowledge arc)
- Location: Fort Hellwood (arena fight inside the fort)
- Region: Unknown. Chapter 4 context is Hernand / Delesyia border area. Likely 'hernand'.
- Reward: "Hound Greatsword" (confirmed by patchcrazy.co.uk Tier 2)
- Boss name: Unknown -- sources only describe a boss fight at Fort Hellwood without naming the boss character.
- Source: [patchcrazy.co.uk unique weapons guide](https://patchcrazy.co.uk/all-unique-weapons-gear-locations-in-crimson-desert/) -- Tier 2 (single source)
- Action: Do NOT add to BOSSES array yet. Needs boss name + second source. Add "Hound Greatsword" weapon entry with acquisition note.

**Tristan, The Flame Knight [Chapter 7 Boss] [SINGLE SOURCE -- NEEDS REVIEW]**
- Location: Flame Knight's Castle (Chapter 7)
- Region: Unknown. Chapter 7 is "Homecoming" -- Pailune arc. Likely 'pailune'.
- Reward: "Spada Sword" (confirmed by patchcrazy.co.uk Tier 2)
- Source: [patchcrazy.co.uk unique weapons guide](https://patchcrazy.co.uk/all-unique-weapons-gear-locations-in-crimson-desert/) -- Tier 2 (single source)
- Action: Do NOT add to BOSSES array yet. Single source, no region confirmation, no mechanic details. Add when second source confirms.

---

#### SKILLS -- DAMIANE AND OONGKA FULL LISTS NOW CONFIRMED [HIGH PRIORITY]

Game8 (Tier 1) now has a complete List of All Skills page with full breakdowns for Damiane and Oongka. Run 11/12 flagged both characters' skill names as unconfirmed. This is now resolved.

**Damiane -- Full Confirmed Skill List (game8 Tier 1):**

Stamina branch: Armed Combat, Quick Swap, Evasive Smite, Charge, Smiting Strike (+ Proficiency/Expertise/Rend Armor variants), Sword Flurry (+ Proficiency), Piercing Light (+ Uppercut/Skewer/Rend Armor variants), Smiting Bolt (+ Proficiency/Sure Hit), Blinding Flash, Spinning Scissors Throw, Grappling, Throw, Restrain, Lariat, Screwdriver, Back Hang, Aerial Grapple, Shield Toss (+ Proficiency/Expertise), Marksmanship, Charged Shot, Evasive Shot, Tornado Kick, Vault, Quick Reload, Scissor Kick, Unarmed Combat, Leg Sweep, Scissor Takedown, Flying Kick, Meteor Kick

Spirit/Utility branch: Keen Senses, Parry, Dodge, Counter, Evasive Roll, Double Jump, Focus, Nature's Grasp, Focused Shot (+ Evasive/Charged variants), Flurry of Kicks, Blade Sentinel, Shield Sentinel

Health/Elemental branch: Imbue Element, Elemental Smiting Strike, Elemental Charged Shot, Elemental Shield Toss, Elemental Meteor Kick, Flame Rush, Frost Mantle, Storm Pillar, Lightning Strike, Flight, Swift Flight, Skystep

**Oongka -- Full Confirmed Skill List (game8 Tier 1):**

Stamina branch: Armed Combat, Leaping Smash, Charge, Dual Wielding Mastery, Quick Swap, Slash (+ Hack and Slash/Slash and Sling/Rend Armor variants), Rampage (+ Proficiency/Sure Hit), Blinding Flash, Raging Lightning (+ Proficiency), Quaking Fury (+ Proficiency/Expertise/Rend Armor), Grappling, Throw, Restrain, Lariat, Giant Swing, Back Hang, Lariat Follow-up, Unarmed Combat, Low Dropkick, Scissor Takedown, Meteor Kick, Vault, Dropkick, Pump Kick, Body Slam, Clothesline, Marksmanship, Evasive Shot (+ Proficiency/Expertise), Charged Shot, Focused Shot (+ Evasive/Charged variants), Scatter Shot, Explosive Strike

Spirit/Utility branch: Keen Senses, Parry, Dodge, Counter, Evasive Roll, Double Jump, Quick Grab, Nature's Grasp, Focus, Explosive Leap, Rage, Aerial Evasive Shot

Health/Elemental branch: Imbue Element, Elemental Quaking Fury, Elemental Charged Shot, Elemental Scatter Shot, Elemental Meteor Kick, Flame Quake, Frost Mantle, Storm Howl, Lightning Pulse, Vertical Flight, Flight, Swift Flight

**Action:** The app's SKILLS array needs full rewrites for Damiane AND Oongka. Same severity level as the Kliff skills issue. Current Damiane/Oongka entries likely use invented names similar to the Kliff issue.
- Source: [game8 List of All Skills](https://game8.co/games/Crimson-Desert/archives/585471) -- Tier 1

---

#### WEAPONS -- NEW CONFIRMED ENTRIES

**Golden Vanguard [Boss Drop -- Gregor]**
- Type: Lance (2-handed spear)
- Dropped by: Gregor the Halberd of Carnage (Ch.8, quest: Where the Wind Guides You)
- Properties: Fast attacks, longer reach than rapier, can break enemy guard efficiently.
- Not in WEAPONS array. Stats unknown. Add with stats TBD pending wiki stat pages.
- Source: GameRant Gregor guide [2026-03-24] -- Tier 2; PowerPyx walkthrough [2026-03-24] -- Tier 1

**Reckoning Two-Handed Spear [Boss Drop -- Titan]**
- Type: Spear (2-handed)
- Dropped by: Titan, the God of Thunder (Pailune, Faction Quest: Ancient Barrier)
- Not in WEAPONS array. Stats unknown.
- Source: GameRant Titan guide [2026-03-22/24] -- Tier 2

**Lightning Bolt Plate Armor [Boss Drop -- Titan, armor]**
- Type: Armor (chest plate)
- Special property: Natural Lightning Resistance Lv 7 -- best-in-class armor for lightning-type enemies.
- Dropped by: Titan, the God of Thunder
- Not in the app's current data structure (no armor array exists -- note for future data model planning).
- Source: GameRant Titan guide [2026-03-22/24] -- Tier 2

**Fated Shadow [World Item -- Goyen Arena]**
- Type: Weapon (type unknown -- likely sword or greatsword given "Shadow" naming convention)
- Acquisition: World item found at back of Goyen's arena in Chapter 9 (go up the stairs after defeating Goyen). NOT a direct boss drop.
- Not in WEAPONS array. Stats unknown.
- Source: [patchcrazy.co.uk unique weapons guide](https://patchcrazy.co.uk/all-unique-weapons-gear-locations-in-crimson-desert/) -- Tier 2

**Hungering Fang Leather Cloak + Boots [Boss Drop -- Ludvig]**
- Both armor items dropped by Ludvig (Pailune, quest: Dawn/Lonely Jackals, Ch.7)
- Conflict: App has 'Ignir (two-handed sword)' as Ludvig's reward -- this is WRONG per game8 Tier 1. These armor items replace "Ignir" as the confirmed reward.
- "Ignir" is a named two-handed sword that may be obtainable elsewhere in Pailune -- requires separate investigation.
- Source: game8 Ludvig page [2026-03-24] -- Tier 1

---

#### DATA GAPS -- UPDATED STATUS (Run 19)

| Gap | Status | Priority |
|---|---|---|
| Kliff SKILLS array rewrite | Unchanged -- human decision needed | HIGHEST |
| Damiane SKILLS array rewrite | NEW THIS RUN: full confirmed list available (game8 Tier 1) | HIGH |
| Oongka SKILLS array rewrite | NEW THIS RUN: full confirmed list available (game8 Tier 1) | HIGH |
| QUESTS array rewrite | Unchanged -- human decision needed; Ch.9-12 arc names confirmed in Run 17 | HIGH |
| Titan region/reward | SINGLE SOURCE (GameRant Tier 2 only). Skipped Run 21. Needs independent second source. | HIGH |
| Gregor reward | APPLIED Run 21: Golden Vanguard + Abyss Artifact x1; region corrected to hernand | DONE |
| One-Armed Ludvig reward | APPLIED Run 21: reward set to 'None' (game8 Tier 1 confirms no drop) | DONE |
| Ludvig reward | SOURCE CONFLICT this run: app has 'Ignir (two-handed sword)', game8 Tier 1 says armor items. Human review needed. | HIGH |
| T'rukan -- new boss | APPLIED Run 21: added to BOSSES array | DONE |
| Lucian Bastier -- new boss | APPLIED Run 21: added to BOSSES array | DONE |
| Goyen -- new boss | APPLIED Run 21: added to BOSSES array | DONE |
| Tristan the Flame Knight | Single source (patchcrazy.co.uk Tier 2). Needs second source. | MEDIUM |
| Fort Hellwood boss (unnamed) | Single source, boss name unknown. | LOW |
| Gwen Kraber reward (spear name) | No name found in any source | MEDIUM |
| Split Horn reward, element | No new data post-launch | MEDIUM |
| Muskan reward | No confirmed drop; Bonepit Greathammer is world loot, not confirmed Muskan drop | MEDIUM |
| Desert Ancient difficulty, reward | No new data post-launch | MEDIUM |
| Blackstar -- all fields | Chapter 12 confirmed; region inferred 'abyss'; all other fields TBD | Low (SPOILER) |
| Walter Lanford reward | Single source (GameRant) for Golden Piggy Bank. Fextralife still no reward listed. | MEDIUM |
| Sealed Abyss Artifacts -- data model | 141 total confirmed; data model decision pending | HIGH |
| Abyss Gear system | Fully documented in Run 17; data model decision pending | HIGH |
| Challenges data model | 350+ challenges confirmed; data model pending | HIGH |

---

#### QUALITY CHECKLIST (Run 19)

- [x] All sources cited with Tier ratings and URLs where available
- [x] Conflicting information noted (Ludvig reward conflict, One-Armed Ludvig region conflict resolution, Titan still Tier 2 only)
- [x] Data completeness stated (3 new bosses ready to add, 4 corrections ready to apply)
- [x] Consistent formatting (snake_case JSON, Title Case table headers)
- [x] Report structure maps to app features (BOSSES, SKILLS, WEAPONS arrays)
- [x] Data gaps explicitly updated in gap table
- [x] Uncertain data flagged (Tristan/Fort Hellwood single source, Titan still no Tier 1 source)
- [x] JSON entries are valid and parseable

---

### Flagged 2026-03-22 (Run 17) -- Day 4 Post-Launch / Patch & Boss Data Pass

**Context:** Game launched March 19, 2026. This is Day 4. Sources used: GameRant boss guides (Tier 2), game8 wiki (Tier 1), PowerPyx walkthroughs (Tier 1), Fextralife wiki (Tier 1), Pearl Abyss official patch notes (Tier 1), Kotaku/Sportskeeda (Tier 2), space4games/gamingpromax chapter lists (Tier 2/3). Main focus this run: resolve persistent boss data gaps, document the full chapter name list, and track the controls patch status.

---

#### CORRECTIONS TO APPLY NOW (Confirmed, Tier 1 or Multi-Source)

**1. Titan -- Region: 'desert' → 'pailune' [SINGLE SOURCE -- NEEDS REVIEW (Run 18)]**
- App currently has `region: 'desert'`, `location: 'Unknown'`.
- GameRant Titan boss guide (Tier 2) explicitly states: "You won't be able to fight Titan until you've completed enough Faction Quests in Pailune to unlock 'The Jackal's Scheme' from the Stjar Clan in Skallcove."
- Region: 'pailune'. Location: Skallcove (Stjar Clan Faction Quest area), Pailune.
- Titan is a Pailune faction quest boss, NOT a desert/open world boss.
- Source: GameRant Titan boss guide [2026-03-22] -- Tier 2
- Action: Change `region: 'desert'` to `region: 'pailune'`, update `location` from 'Unknown' to 'Pailune (Skallcove, Stjar Clan Faction Quest)'.

**2. Titan -- Reward: 'Unknown (TBD)' → 'Reckoning Two-Handed Spear, Lightning Bolt Plate Armor' [SINGLE SOURCE -- NEEDS REVIEW (Run 18)]**
- GameRant Titan boss guide (Tier 2) confirms: "By killing Titan, you will receive the Reckoning Two-Handed Spear and the Lightning Bolt Plate Armor."
- The Lightning Bolt Plate Armor is noted as having "natural Lightning Resistance Lv 7 -- practically the best armor for lightning enemies."
- Source: GameRant Titan boss guide [2026-03-22] -- Tier 2
- Action: Change `reward: 'Unknown (TBD)'` to `reward: 'Reckoning Two-Handed Spear, Lightning Bolt Plate Armor'`.

**3. Titan -- Type: 'Monster' → 'Humanoid' (if sources confirm) [NEEDS VERIFICATION]**
- App has `type: 'Monster'`. The boss description says "wields a spear, lightning attacks, heavily armored." GameRant calls it a "god" and describes 2 phases: normal Titan + Gigantified Titan.
- Type 'Monster' vs 'Humanoid' is ambiguous -- "Titan" sounds like a giant humanoid, but not confirmed. Keep as 'Monster' until in-game type screen confirms.
- Note: The GameRant guide also confirms 2 phases (Titan + Gigantified Titan) -- the app's `mechanics` field currently only says "Wields spear. Lightning attacks." This should be updated.
- Recommended mechanics text: "2 phases. Faction quest boss (Pailune -- complete Stjar Clan quests to unlock). Phase 2: Gigantified Titan (larger, more mechanic-heavy). Lightning/spear attacks."
- Source: GameRant Titan boss guide [2026-03-22] -- Tier 2

**4. Walter Lanford -- Reward: 'Unknown (TBD)' → 'Golden Piggy Bank' [SINGLE SOURCE -- NEEDS REVIEW (Run 18)]**
- GameRant (Tier 2) confirms: "You can get the Golden Piggy Bank by defeating Walter Lanford during 'The Nemesis' Demise' quest."
- The Golden Piggy Bank is a special item with an offline passive gold generation mechanic (confirmed by GameRant title: "How to Get Money in Crimson Desert Even When You're Offline").
- Quest name confirmed: "The Nemesis' Demise" (faction quest, House Serkis Faction Questline, Hernand).
- Shotgun moveset: Walter Lanford's shotgun moveset can be obtained by "crafting his gear" (separate from the boss drop reward). This is NOT a direct drop -- it requires crafting after defeating him.
- Source: GameRant "Walter Lanford Golden Piggy Bank" [2026-03-22] -- Tier 2; Fextralife Walter Lanford wiki [2026-03-22] -- Tier 1
- Action: Change `reward: 'Unknown (TBD)'` to `reward: 'Golden Piggy Bank'`.

**5. Fortain the Cursed Knight -- Region: 'demeniss' → 'hernand' [ADDED -- 2026-03-22 (Run 18)]**
- App currently has `region: 'demeniss'` and `location: 'Thornbriar Fortress, Demeniss'`.
- Multiple independent sources confirm Thornbriar Fortress is in Hernand:
  - game8 Demeniss Region Guide (Tier 1): Thornbriar Fortress does NOT appear in the Demeniss region listing.
  - PowerPyx "The Cursed Knight" walkthrough (Tier 1): Quest starts in Hernand region.
  - Fextralife Fortain the Cursed Knight wiki (Tier 1): Lists location as Thornbriar Fortress in Hernand.
  - Deltia's Gaming (Tier 2): Confirms Hernand.
  - TheGamer (Tier 2): Description places the fortress in a Hernand context.
- The quest sub-chapter is "To Demeniss" (describing travel direction), but the boss fight itself is at Thornbriar Fortress which is in Hernand territory.
- NOTE: Run 15 had this as unresolved (Hernand vs. Demeniss conflict). Run 17 resolves it: Hernand confirmed by 3+ independent sources including the Fextralife boss page and game8 region guide.
- Source: Fextralife Fortain wiki [2026-03-22] -- Tier 1; game8 Demeniss Region Guide [2026-03-22] -- Tier 1; PowerPyx walkthrough -- Tier 1; Deltia's Gaming -- Tier 2
- Action: Change `region: 'demeniss'` to `region: 'hernand'`, update `location` from 'Thornbriar Fortress, Demeniss' to 'Thornbriar Fortress, Hernand'.

---

#### BOSS DATA -- NEWLY CONFIRMED FIELDS

**Blackstar [NOW CHAPTER-CONFIRMED]**
- Chapter: 12 "The Abyss" -- confirmed by Pearl Abyss Known Issues list which references "Deferred Advance" quest context, and search results placing "Deferred Advance" in Chapter 12.
- Quest: "Deferred Advance" (confirmed from Pearl Abyss Known Issues -- Tier 1).
- Fight type: "Ultimate Weapon" fight (Pearl Abyss exact phrasing from known issues notice).
- Region: Inferred 'abyss' (Chapter 12 is titled "The Abyss" in the full chapter list -- high confidence but not explicit confirmation on Blackstar's region field from any source).
- All other fields (difficulty, reward, type) still unknown. Remains SPOILER-gated.
- ⚠️ SPOILER WARNING: Community is likely only reaching this boss now (Day 4). Do not surface in app without a spoiler gate.
- Source: Pearl Abyss Known Issues [2026-03-21] -- Tier 1; chapter list cross-reference (multiple Tier 2 sources)
- Action: No app add yet. Collect more data once community coverage increases. Do not use inferred region without confirmation.

**Titan -- Phase Detail Confirmed**
- Gigantified Titan is the phase 2 form. 2-phase fight confirmed.
- Source: GameRant Titan boss guide [2026-03-22] -- Tier 2

---

#### NEW CHAPTER NAMES -- COMPLETE LIST CONFIRMED [HIGH PRIORITY for QUESTS array]

The full chapter name list is now confirmed from multiple sources (Destructoid, space4games, GameRant, game8, gamingpromax). App's `data-to-add.md` previously noted "Total chapter count not confirmed from current sources" -- this is now resolved.

**Complete Chapter List:**
| # | Chapter Title | Region (inferred) |
|---|---|---|
| Prologue | Dead of Night | Hernand |
| Chapter 1 | The First Encounter | Hernand |
| Chapter 2 | Golden Greed | Hernand |
| Chapter 3 | Howling Hill | Hernand → Pailune |
| Chapter 4 | The Price of Knowledge | Hernand/Delesyia? |
| Chapter 5 | Uninvited Guest | Hernand |
| Chapter 6 | Cracks in the Shield | Hernand/Calphade |
| Chapter 7 | Homecoming | Pailune |
| Chapter 8 | The Blood Coronation | Hernand → Demeniss |
| Chapter 9 | The Sage of the Desert | Crimson Desert |
| Chapter 10 | Counterattack | Demeniss? |
| Chapter 11 | Truth and Reality | Unknown (City of Steel mentioned) |
| Chapter 12 | The Abyss | The Abyss |
| Epilogue | (title unknown) | Unknown |

**Chapter 9-12 sub-quest arcs confirmed (multiple Tier 2 sources):**
- Ch. 9: The Calling, Shattered Ties, Thinning Blade, Six Statues and the Beast, Veiled Witch, Enlightenment
- Ch. 10: Secret Weapon, Great Firepower
- Ch. 11: Brave New World, Foreboding Shadow
- Ch. 12: The Final Battle, The Void

Source: Destructoid full chapter list [2026-03-22] -- Tier 2; gamingpromax chapter list [2026-03-22] -- Tier 2; game8 chapter list [2026-03-22] -- Tier 1; GameRant chapter list -- Tier 2; space4games chapter overview -- Tier 3

NOTE: The app's `QUESTS` array and any references to "at least 7 chapters" are outdated. The complete 12-chapter structure (+ prologue + epilogue) is now confirmed. The story structure note in the Quests section of this doc should be updated to reflect the full chapter count.

---

#### ABYSS GEAR SYSTEM -- COMPREHENSIVE NEW DATA [NOT YET IN APP]

This is a major game system newly documented from post-launch sources. Not currently represented in the app's data layer.

**Unlock:**
- Unlocked in Chapter 5 (Uninvited Guest) when Kliff meets Elowen the Witch.
- Elowen is found at her lair in The Witchwoods, West of the Hernand Highlands.
- Elowen also gives the Witches Faction Quest to cleanse all Sanctums.

**How it works:**
- Abyss Gears are mods (formerly called Abyss Cores internally) that slot into equipment.
- Socket creation costs silver. Maximum sockets per item vary by item type.
- Cloaks and Accessories CANNOT be socketed.
- Witches offer 4 options: Embed Abyss Gear, Extract Abyss Gear, Create Socket, Craft Abyss Gears.
- Enhancement: Some Abyss Gears can be enhanced with rare materials + duplicate Gears of the same type.
- Boss weapons often come pre-equipped with a signature Abyss Gear (e.g., Sword of the Lord comes with "Wind Slash" Abyss Core).

**Data model implications:**
- No AbyssGear interface in game-data.ts yet (the import line in game-data.ts includes `AbyssArtifact` but this is the collectible, not the gear mod system).
- A separate `AbyssGear` type would need: `id`, `name`, `effect`, `type` (passive/active), `source`, and `compatible_items` fields.
- Witches NPC data would also need representation (Elowen confirmed; others may exist -- check for other named Witch NPCs in further runs).
- Source: PC Gamer Abyss Gears guide [2026-03-22] -- Tier 1; game8 Abyss Gear guides [2026-03-22] -- Tier 1; GameRant Witches guide [2026-03-22] -- Tier 2; GamesRadar [2026-03-22] -- Tier 2

---

#### CONTROLS PATCH -- STATUS UPDATE [NO RELEASE DATE YET]

- As of March 22, 2026: No controls patch has been released. Pearl Abyss confirmed on March 21 they are "preparing a patch" but gave no date or version number.
- Community workaround: Third-party mods on PC (DSO Gaming Mods article) improve KB+M hotkeys while waiting for the official patch.
- App impact: If/when the official controls patch releases with new keybind documentation, the app's KB+M control references will need updating. No action required now.
- Source: Kotaku [2026-03-21] -- Tier 2; GamingHQ [2026-03-22] -- Tier 2; Pearl Abyss official statement [2026-03-21] -- Tier 1

---

#### DATA GAPS -- UPDATED STATUS (Run 17)

| Gap | Status | Priority |
|---|---|---|
| Kliff SKILLS array rewrite | Unchanged -- human decision needed | HIGHEST |
| QUESTS array rewrite | Unchanged -- human decision needed; Ch.9-12 arc names now available | HIGH |
| Titan region/reward | RESOLVED this run (pailune, Reckoning Spear + Lightning Bolt Armor) | n/a |
| Fortain region | RESOLVED this run (hernand confirmed) | n/a |
| Walter Lanford reward | RESOLVED this run (Golden Piggy Bank) | n/a |
| Gregor region/reward | Run 19: 2 sources confirm hernand + Golden Vanguard (PowerPyx Tier 1, GameRant Tier 2). App has 'demeniss' and 'Unknown (TBD)'. Human apply needed. | HIGH |
| One-Armed Ludvig region/location | Run 19: game8 says Pailune/Kingshield Mtn; Fextralife says Demeniss mountains. SOURCE CONFLICT. App has 'pailune' which is likely correct (Chapter 7 context). Reward: None per game8. | MEDIUM |
| Blackstar -- all fields | Chapter 12 confirmed; region inferred 'abyss'; all other fields TBD | Low (SPOILER) |
| Lucian Bastier -- armor piece names | No new data | Medium |
| Gwen Kraber reward (spear name) | No name found in any source (all say "a spear" generically) | Medium |
| Split Horn reward, element | No new data | Medium |
| Muskan reward | No new data (Bonepit Greathammer inference still unconfirmed) | Medium |
| Desert Ancient difficulty, reward | No new data | Medium |
| Sealed Abyss Artifacts -- data model | 141 total confirmed; data model decision pending | High |
| Challenges data model | 350+ challenges confirmed; data model pending | High |
| Abyss Gear system | Fully documented above; data model decision pending | High |
| Chapter names Ch.9-12 | RESOLVED this run (fully confirmed) | n/a |
| Controls patch | No release date yet; no app action needed | Low |

---

#### QUALITY CHECKLIST (Run 17)

- [x] All sources cited (Tier 1/2 labeled throughout)
- [x] Source conflicts documented (Titan type, Fortain region resolution, Blackstar region inferred not confirmed)
- [x] Data completeness stated per section
- [x] Structured data uses consistent formatting
- [x] Report structure maps to app features (bosses, quests, mechanics, systems)
- [x] Data gaps explicitly called out and updated in gap table
- [x] Uncertain/inferred data flagged (Blackstar region, Titan type, shotgun moveset crafting vs. drop)
- [x] All boss corrections have explicit app action notes

---

### Flagged 2026-03-20 (Run 15) -- Day 2 Post-Launch / Wiki & Guide Expansion Pass

**Context:** Game launched March 19, 2026. This is the Day 2 post-launch pass. Sources used: PowerPyx quest walkthroughs (Tier 1), game8 wiki (Tier 1), Fextralife wiki (Tier 1), GameRant chapter list (Tier 2), deltiasgaming.com (Tier 2). Wikis are filling in rapidly -- many previously TBA reward fields are now confirmed.

**Patch 1.00.02** released during this run. Key changes: new tutorial quest added to start of Chapter 3 (Abyss Gears), Kliff gets Flurry of Blows finishing blow, Damiane gets greatsword follow-up skills, Oongka gets dual-wield stab follow-up, Tenebrum fight improved (no puzzle replay on death), Reed Devil balance adjusted, bears nerfed (no instant-kill), Skills menu reorganized with weapon-type categories. Full list in the Game Mechanics section below.

- **Kailok region CONFIRMED: 'hernand'** [Bosses] -- Goldleaf Guildhouse, Unicorn Cliff, Chapter 2 (game8 Tier 1). Boss entry is now READY TO ADD.
- **Kailok quest name conflict** [Bosses] -- game8 says "The End of Greed" (Chapter 2 final quest); PowerPyx says "Cheers Echoing From the Edge." Same boss, different naming convention sources. Flag for in-game text confirmation.
- **Kailok bonus rewards** [Bosses] -- In addition to "Sword of the Lord," game8 confirms: Seal of Greed - Goldleaf Merchant Guild + Iron Ore x7. Also unlocks "Evasive Roll" skill via Observation.
- **Myurdin reward CONFIRMED: 'Melted Ambition' (Sword)** [Bosses] -- PowerPyx walkthrough Tier 1. Apply to existing BOSSES entry.
- **Myurdin element CONFIRMED: 'fire'** [Bosses] -- Phase 2 Lava Myurdin transformation confirmed by 3x Tier 1 sources. Apply to existing BOSSES entry.
- **Myurdin region SOURCE CONFLICT** [Bosses] -- PowerPyx walkthrough says 'hernand' for the quest; Chapter 7 "Homecoming" + "Protector of Pailune" trophy strongly imply 'pailune'. Current app value 'pailune' likely correct. Flag for in-game verification.
- **Fortain reward CONFIRMED: 'Shackle of Might' (Sword)** [Bosses] -- PowerPyx walkthrough Tier 1. Entry now near-ready; only region still unresolved (Hernand/Demeniss border).
- **Fortain location: Thornbriar Fortress** [Bosses] -- Fextralife wiki Tier 1. Named location confirmed.
- **Fortain region SOURCE CONFLICT** [Bosses] -- PowerPyx says 'hernand'; Chapter 8 "Blood Coronation" > "To Demeniss" sub-chapter implies Demeniss. Still unresolved.
- **Marni's Excavatron region CORRECTED: 'hernand' NOT 'delesyia'** [Bosses] -- game8 and deltiasgaming BOTH confirm Karin Quarry, Hernand (Tier 1/2). Original research doc assumption of Delesyia was WRONG. Machine was invented in Delesyia but fight is in Hernand. Boss is now READY TO ADD.
- **Marni's Excavatron reward CONFIRMED: 'Mining Knuckledrill'** [Bosses/Weapons] -- game8 Tier 1. Stats: ATK 16 (One-Handed).
- **Walter Lanford region CONFIRMED: 'hernand'** [Bosses/Corrections] -- Fextralife wiki explicitly lists Fort Warspike AND Hernand. Change app from 'desert' to 'hernand'. Reward still unknown.
- **Full chapter structure confirmed** [Quests/Story] -- 12 chapters + Prologue + Epilogue. Full chapter names documented in new Story Structure section below.
- **Chapter boss-region assignments resolved** [Quests/Bosses] -- Chapter 2 = Hernand (Kailok, Marni's Excavatron); Chapter 4 = Tenebrum; Chapter 6 = Cassius Morten in Calphade; Chapter 7 = Homecoming/Pailune (Myurdin, One-Armed Ludvig); Chapter 8 = Blood Coronation/To Demeniss (Fortain).
- **Calphade confirmed north of Hernand** [Locations] -- Sub-territory with its own gate (Calphade Gate) accessible from Hernand City. Chapter 6 boss content. Not a 7th main region but a named territory adjacent to Hernand.
- **New named weapons (with ATK stats)** [Weapons] -- Full game8 weapons list extracted. 16 One-Handed weapons, 21 Two-Handed weapons, 3 Ranged weapons, 5 Shields now documented. See Weapons section below.
- **Shield of Betrayal (DEF: 6)** [Weapons] -- Named weapon in game8 list. "Betrayal" theme strongly suggests Cassius Morten drop. Unconfirmed inference; do not add without source.
- **Bonepit Greathammer (ATK: 20)** [Weapons] -- Named weapon in game8 list. "Bonepit" = Muskan's arena. Likely Muskan's drop. Unconfirmed inference; do not add without source.
- **Alfonso Spear (ATK: 13) + Warspike Spear (ATK: 14)** [Weapons] -- Named weapons tied to Alfonso Estate/Fort Warspike (Walter Lanford's fight zone). One may be Walter Lanford's reward. Unconfirmed.
- **Warspike Spear is a world pickup** [Weapons] -- Confirmed by sportskeeda: obtained as a free pickup during "Turnali's Request" quest (leaning against a shrine). NOT a boss drop.
- **Patch 1.00.02 skill additions** [Skills] -- Kliff: Flurry of Blows gains a new finishing blow. Damiane: New follow-up skills on greatsword stab + uppercut. Oongka: New follow-up attack on dual-wield stab. Skills menu now organized by weapon type.
- **Sanctums mechanic fully documented** [Game Mechanics] -- Unlocked in Chapter 5 by meeting Witch NPC Elowen. Elowen's Witches Faction Quest sends player to cleanse all Sanctums. Each Sanctum has a puzzle. Cleansing = Lightbringer trophy (all Sanctum challenges).
- **Ancient Obelisks confirmed** [Collectibles/Game Mechanics] -- Instantly grant Macduff 1 full Skill Point (SP). Found throughout Pywel, often hidden (e.g., behind Weeping Waterfall north of Hernand gates). Not currently represented in app data.
- **New challenge category counts** [Game Mechanics] -- 40 Abyss restoration challenges, 60 secret places ("Wandering Footsteps"), 37 ancient ruins puzzles ("The Thread in the Forest"), 8 spire challenges ("Land Meets Sky").
- **New game mechanics documented** [Game Mechanics] -- Telekinesis (pull rocks to uncover secret dungeons, controller vibrates as hint), Fire Alchemy (Brazier Puzzles -- light braziers in mural order), Grapple-on-capture for hidden stash map reveals, two-person pressure plate doors (player + mercenary companion).
- **New locations confirmed** [Map] -- Thornbriar Fortress (Fortain fight), Kweiden (snowy area, likely Pailune), Weeping Waterfall (Hernand, hidden Obelisk grotto), Steel Mountains (near Spire of Insight), Karin Quarry (Hernand, Excavatron fight), Calphade Gate (Hernand/Calphade border), Howling Hill (Chapter 3 camp name, also trophy "Master Camper").
- **Named Spire: Spire of Insight** [Map] -- First named spire confirmed from a puzzle description context. Near Steel Mountains. 8 total spires per challenge count.
- **Elowen the Witch [New NPC]** [NPCs] -- Chapter 5 NPC. Merchant who unlocks all Sanctums and gives the Witches Faction Quest to cleanse them. No NPC data structure in app yet.
- **Macduff [Possible NPC/System Reference]** [NPCs] -- Named in connection with Ancient Obelisks ("grant Macduff 1 full Skill Point"). Unclear whether Macduff is an NPC, a player-account system, or an alternate name for Kliff. Needs in-game verification.
- **Game has 430 total quests** [Meta] -- Main + side combined. Confirmed by community sources.
- **Main story: 168 individual mission steps** [Meta] -- Across prologue, 12 chapters, and epilogue.
- **Playtime estimates** [Meta] -- Main story only: 60-100 hours. Full completion: 100-180+ hours.

### Flagged 2026-03-19 (Run 14) -- Launch Day / First Post-Launch Pass

**Context:** Game launched March 19, 2026 at 3PM PT. This is the first post-launch data pass. Sources used: PowerPyx boss guide (Tier 1 walkthrough), Fextralife wiki (post-launch updates), allthings.how (Tier 2 quest/skill guides), web search aggregation. Core wikis (Fextralife, game8) are still being populated by the community -- expect significantly richer wiki data in Run 15+.

**Reception:** Metacritic 78/100 (PC, 85 reviews). OpenCritic 81 ("Strong"). Praised: world, exploration, combat. Criticized: narrative, fetch-heavy quests, clunky controls. Pearl Abyss stock dropped on review day. PCGamer headline: "most fascinating, frustratingly obtuse game ever." Pre-order estimate ~400K copies on Steam alone.

**Launch changes:** Day 1 patch expanded inventory from 20 to 50 slots. PS5 Pro PSSR support added at launch. Offline play enabled after initial setup patch.

- **Crowcaller = "Draven" [HIGH CONFIDENCE]** [Bosses] -- The pre-launch "Draven" (raven-themed, darkness particles) is almost certainly the same boss as the final game's "Crowcaller." Location: Spire of Soaring, Demeniss. **Reward confirmed: "Tauria Curved Sword."** Full details added to Bosses section. Remove Draven from queue once in-game confirmed.
- **Kailok reward confirmed** [Bosses] -- **"Sword of the Lord"** now confirmed via PowerPyx. Still missing region (blocks add). Quest: "Cheers Echoing From the Edge."
- **5 new bosses documented** [Bosses] -- Tenebrum (puzzle boss, Force Palm required), Ludvig / Awakened Ludvig (lightning, Demeniss area inferred), One-Armed Ludvig (first Oongka boss), Gregor the Halberd of Carnage (spear + wall arrows mechanic), Myurdin region correction (app has 'demeniss', should be 'pailune'). All new boss entries added to queue above.
- **Myurdin region: 'demeniss' → 'pailune'** [Correction] -- CONFIRMED via Fextralife and quest location. Apply immediately. See correction in Outdated section.
- **Walter Lanford element: 'fire' → 'physical'** [Correction] -- CONFIRMED wrong. Attacks are purely ballistic. Change element to 'physical'. See correction in Outdated section.
- **Full confirmed main quest list** [Quests] -- 23 confirmed main quest names from allthings.how (Tier 2). Current QUESTS array uses entirely invented names. MAJOR gap. Full list + side quests + bounties + boss-quest mapping added to Quests section above.
- **Grilled Meat** [Recipes] -- Primary healing consumable confirmed: 80 HP per use, 1 raw meat to craft at any bonfire. Not in RECIPES array. Ready to add.
- **Sword of the Lord + Tauria Curved Sword** [Weapons] -- Two new confirmed boss-drop weapons with known use cases. Stats TBD from wiki. Added to Weapons section.
- **Full trophy list** [Achievements] -- All 35 trophies confirmed from PowerPyx. New lore details: "Howling Hill" = starting camp location; game has 7+ chapters; Sanctums and Spires and Constellations are distinct challenge types not currently in app. Full list added to Outdated/Corrections section above.
- **Twitch Drop collectibles (8 items)** [Collectibles] -- Blue Scout Armor set (Week 1, 7 items) + Blue Scout Horse Armor (Week 2) confirmed from Pearl Abyss official drops page. None in COLLECTIBLES array. Full list added to Collectibles section.
- **Howling Hill [New Location]** [Map] -- Starting Greymane Camp location confirmed by trophy text ("Proud Returnee: Relocate the Greymane Camp from Howling Hill to Pailune"). Not in any region's POI data. Region: likely Hernand (near starting area) or a neutral zone before Pailune. Add to REGIONS POI list once region assignment confirmed.
- **Sanctums, Spires, Constellations, Mazes [New Content Types]** [Game Mechanics] -- Trophy list confirms these as distinct challenge categories with dedicated trophies (Lightbringer, Conqueror of Spires, Navigator of the Stars, Maze Pathfinder). None are represented in app data. Post-launch wiki passes should fill in locations and completion details.
- **Skill tree post-launch note** [Skills] -- allthings.how post-launch skills article confirms the full skill tree breakdown matches the pre-launch allthings.how article used in Run 13. No new skill names discovered beyond what Run 13 documented. The SKILLS array rewrite from confirmed names remains the priority action.

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
