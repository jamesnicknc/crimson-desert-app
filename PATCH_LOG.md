# Crimson Desert Companion App — Patch Log

**Date:** March 15, 2026

---

## Summary

This was a major development day for the Crimson Desert Companion App. The site went from an early prototype to a substantially complete companion tool, covering authentication, visual design, game data, navigation, and content structure. Below is a plain-language breakdown of everything that changed.

---

## Authentication & Login

- **Added email/password sign-in.** Users can now create an account or log in using an email address and password, in addition to Discord. Includes a toggle between "Sign In" and "Sign Up" modes, error handling, and an email confirmation step for new accounts.
- **Removed Google login.** Google OAuth was briefly added and then removed, settling on Discord and email/password as the two supported sign-in methods.

---

## Visual Design & Theme

- **Switched to a gold/bronze color palette.** The site moved away from a crimson-red look to muted golds and near-black backgrounds that better match the official Crimson Desert aesthetic. Buttons now have a parchment-style appearance.
- **Added a crimson gradient banner** behind the header area (crimson on the left fading to black on the right).
- **Fixed portrait display issues.** Damiane's character card was showing blank space above her portrait — this was corrected with custom image positioning so her face is properly visible, consistent with other character cards.

---

## Performance & Images

- **Converted all images from PNG to WebP.** Character portraits and the map image were converted to a more efficient format, cutting total image file size from ~4.4 MB down to ~232 KB — a 95% reduction in load size.
- **Removed duplicate image files** that had been stored in a nested folder by mistake.
- **Removed 8 unused software packages** to keep the project lean and faster to build.

---

## New Pages & Navigation

- **Mounts tracker added.** A brand-new Mounts page was built, listing 29 mounts across 8 categories. It appears in the sidebar navigation and is reflected in the dashboard stats.
- **Bosses tracker added.** A dedicated Bosses page was created with search and filtering, tracking all known bosses with their region, element, difficulty, and rewards.
- **Bestiary repurposed as an Enemy Encyclopedia.** The old Bestiary page (which was used for bosses) is now a general enemy encyclopedia with filters for Element, Type, and Region. It's designed to expand as the game launches and more creature data becomes available.
- Both **Bosses** and **Bestiary** now appear separately in the sidebar under a Combat section.

---

## Game Data Added

### Bosses
- Replaced 11 placeholder boss entries with officially confirmed names: White Horn, Staglord, Reed Devil, Queen Stoneback Crab, Golden Star, Hexe Marie, Matthias, Myurdin, Kearush the Slayer, Walter Lanford, and Snow Walker.
- Fixed Matthias's listed region from incorrect "Demeniss" to the confirmed location of Hernand (verified via multiple wiki sources).

### Weapons
- Added 6 new weapon types that were previously missing: Daggers, Warhammer, Staff, Rifle, Hand Cannon, and Balgran Shield.
- These weapons include their associated Signature Abilities, obtained through boss drops.

### Mounts
- Added a full mounts tracker with 29 mounts spanning 8 categories.

### Characters / NPCs
- Added 5 key story characters with portraits: Yann, Naira, Myurdin, Hexe Marie, and the Black Bears faction.
- Character portraits are displayed consistently across all cards.

### Regions
- Added **The Abyss** as a sixth official region. It was already referenced throughout the app (for bosses, mounts, and collectibles) but had no formal entry — that gap is now filled.

### Collectibles
- Added the **Grotevant Plate Set** as a PS5 exclusive edition cosmetic collectible.
- Fixed a naming conflict: the Deluxe Edition collectible "Balgran Shield" was renamed to "Balgran Shield (Deluxe Edition)" to distinguish it from Oongka's in-game weapon of the same name.

### Camp Facilities
- Added 4 new camp facilities verified from wiki sources: Barber Shop, Dyehouse Shop, Trading Center, and Personal Resting House.

---

## Search & Filtering Improvements

- **Added search bars** to the Bestiary, Weapons, Crafting, and Quests pages.
- **Added a search bar to the Collectibles page** to filter by name or location.
- **Weapon stats** are now hidden behind a collapsible dropdown to reduce clutter.
- Fixed an issue where clicking a checkbox on the Collectibles page wasn't registering properly.

---

## Bug Fixes

- Fixed the group page where a database call was using the wrong parameter name and wrong column name, causing it to fail silently.
- Fixed the notes page where saves weren't going through correctly.
- Replaced browser pop-up alerts with inline status messages throughout the app.
- Fixed a mobile layout issue where the hamburger menu was overlapping page content.
- Fixed a footer overlap issue on the landing page.

---

## Site & SEO

- Added Open Graph meta tags so the site shows a proper preview card when shared on social media or messaging apps.
- Added per-page title templates so each section of the app has a descriptive browser tab title.
- Updated the sitemap and search engine crawler rules to reflect all the new pages.
- Switched fonts from a render-blocking loading method to a faster Next.js native font system.

---

*Patch log covers all commits from March 15, 2026 (00:38 AM – 7:45 PM ET).*
