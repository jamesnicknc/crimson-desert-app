# Crimson Desert Companion — Style & Theme Guide

> Version 1.0 | March 2026
> An unofficial fan companion for Crimson Desert (Pearl Abyss). Built for the continent of Pywel.

---

## Table of Contents

1. [App Overview](#app-overview)
2. [Design Philosophy](#design-philosophy)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Layout & Structure](#layout--structure)
6. [Component Patterns](#component-patterns)
7. [Iconography](#iconography)
8. [Animation & Motion](#animation--motion)
9. [Spacing & Sizing](#spacing--sizing)
10. [Page Inventory](#page-inventory)
11. [Tech Stack Reference](#tech-stack-reference)

---

## App Overview

**Crimson Desert Companion** is a full-stack fan dashboard for the action RPG *Crimson Desert* by Pearl Abyss. It lets players track progress across all major game systems: skill trees, quests, bosses, collectibles, weapons, crafting, mounts, builds, notes, and the Greymane Camp. It is deployed at `crimsoncompanionapp.us` via Vercel, backed by Supabase (PostgreSQL + Auth).

The visual identity is built around the game's dark fantasy setting — the cursed lands of Pywel — using a near-black interface palette accented by warm gold and deep crimson.

---

## Design Philosophy

The UI is intentionally **dark, atmospheric, and restrained**. The goal is to feel like a journal or codex that exists *within* the world of Pywel, not a generic web app.

Key principles:

**Dark first.** The background is near-black (`#0A0A0F`). Every surface is dark. There is no light mode.

**Gold as the primary signal.** Interactive elements, active states, headings, and CTAs all use the gold palette. Gold = action, importance, and identity.

**Crimson for the brand.** The crimson palette represents the game's namesake — the Crimson Desert. It appears in the brand name, region theming, and deep accent use rather than as a functional UI color.

**Minimal chrome.** Borders are subtle (`pywel-border`). No drop shadows. Hover states are achieved through background lightening, not outlines or glow effects (except the `pulse-gold` animation).

**Typography carries mood.** Cinzel (engraved serif) is used for all labels, headings, and nav items to convey a sense of age and weight. Crimson Text (italic serif) carries flavor and lore text. Inter handles all functional body copy.

---

## Color System

All colors are defined in `tailwind.config.ts` and referenced as Tailwind utilities throughout the codebase.

### Pywel Surface Palette

These are the core surface and structural colors. Named after the game's continent.

| Token | Hex | Usage |
|---|---|---|
| `pywel-bg` | `#0A0A0F` | Page background, scrollbar track |
| `pywel-secondary` | `#111116` | Sidebar background |
| `pywel-card` | `#19191E` | Card backgrounds, stat tiles, countdown blocks |
| `pywel-card-hover` | `#22222A` | Card hover state background |
| `pywel-border` | `#2A2630` | All borders — cards, sidebar dividers, header rule |

**Usage pattern:** `bg-pywel-bg` on the root body, `bg-pywel-secondary` on the sidebar, `bg-pywel-card` on all card elements, `border-pywel-border` on all borders.

### Gold Accent Palette

The primary interactive and identity color. All text labels, active states, CTAs, and headings use this scale.

| Token | Hex | Usage |
|---|---|---|
| `gold-50` | `#fdf8e8` | (reserved) |
| `gold-100` | `#f8edcc` | (reserved) |
| `gold-200` | `#d4c4a0` | (reserved) |
| `gold-300` | `#C8AD7F` | Primary heading text, active nav labels, stat values, key copy |
| `gold-400` | `#AE8954` | Secondary gold, icon color, active nav left-border, hover borders |
| `gold-500` | `#8B7530` | Mid-tone, muted gold elements |
| `gold-600` | `#6B5A22` | Sign-in button background, "Sign In" CTA |
| `gold-700` | `#4A3E18` | Scrollbar thumb, deep accent |
| `gold-800` | `#2E2710` | Dark gold surface |
| `gold-900` | `#1A1508` | Near-black gold |

**Most used:** `text-gold-300` (primary heading + values), `text-gold-400` (icons, secondary text), `border-gold-400`, `bg-gold-600` (primary button).

### Crimson Palette

Represents the game's Crimson Desert region. Used primarily for brand identity, region color-coding, and boss difficulty — not as a functional UI color.

| Token | Hex | Usage |
|---|---|---|
| `crimson-500` | `#C0392B` | Desert region marker, boss difficulty indicators |
| `crimson-600` | `#761014` | Deep crimson accent |
| `crimson-700` | `#5C0E0E` | Darker crimson |
| `crimson-800` | `#3D0808` | Near-black crimson |
| `crimson-900` | `#1A0303` | Darkest crimson (hero gradient base) |

### Standard Tailwind Colors in Use

In addition to the custom palette, these Tailwind defaults appear throughout:

- `text-gray-100` — body text on dark backgrounds
- `text-gray-300` — secondary body text
- `text-gray-400` — muted captions, timestamps, helper text
- `text-gray-500` / `text-gray-600` — disabled or very subtle text (footer, disclaimers)
- Quick-access card gradient colors: `from-blue-600`, `from-amber-600`, `from-red-600`, `from-yellow-600`, `from-purple-600`, `from-gray-600` (these pull from Tailwind defaults, always paired with their `-800` counterpart)

### Scrollbar Styling

Custom scrollbar colors are set globally in `globals.css`:

- Thumb: `bg-gold-700` (`#4A3E18`), hover `bg-gold-600`
- Track: `bg-pywel-bg` (`#0A0A0F`)
- Firefox shorthand: `scrollbar-color: #4A3E18 #0A0A0F`

---

## Typography

Three Google Fonts are loaded in the root layout (`src/app/layout.tsx`) via `next/font/google` and exposed as CSS variables.

### Font Stack

| Font | Variable | Tailwind Class | Role |
|---|---|---|---|
| **Cinzel** | `--font-cinzel` | `font-cinzel` | Display, headings, navigation labels, uppercase caps |
| **Crimson Text** | `--font-crimson` | `font-crimson` | Italic flavor text, subheadings, lore copy |
| **Inter** | `--font-inter` | `font-body` / `font-sans` | All body copy, UI labels, descriptions |

### When to Use Each

**Cinzel** (`font-cinzel`) is the brand font. Use it for:
- All `h1`–`h6` elements (applied globally in `globals.css`)
- Navigation section labels and nav item text
- Section headings within pages (`text-2xl font-bold text-gold-300`)
- Stat labels, countdown units (`DAYS`, `HOURS`)
- Buttons and CTAs (sign in, sign out, Buy Me a Coffee)
- Any text that should feel like an engraving or game UI label

**Crimson Text** (`font-crimson`) is the flavor font. Use it for:
- Italic subtitles beneath main headings (e.g., `"Track your journey through the cursed lands"`)
- Lore-adjacent copy
- The companion dashboard subtitle in the hero banner
- Load it in italic style: `font-crimson italic`

**Inter** (`font-body` / `font-sans`) is the default. Use it for:
- Page descriptions and body paragraphs
- Card description text
- Form inputs and labels
- Any text where readability under body size matters

### Type Scale Reference

| Context | Classes |
|---|---|
| Page hero title (landing) | `font-cinzel text-6xl md:text-7xl font-bold` |
| Hero banner title (app layout) | `font-cinzel text-3xl md:text-4xl font-bold text-gold-300` |
| Section heading | `font-cinzel text-2xl font-bold text-gold-300` |
| Card heading | `font-cinzel text-lg font-bold text-gold-300` |
| Sidebar logo | `font-cinzel text-2xl font-bold text-gold-300` |
| Nav section label | `text-sm font-cinzel font-semibold text-gold-300 uppercase tracking-wider` |
| Nav item label | `text-sm font-medium` (Inter via default) |
| Stat value | `text-2xl font-bold text-gold-300` (or `text-3xl md:text-4xl` for countdown) |
| Body / description | `text-gray-300` or `text-gray-400` (Inter) |
| Flavor subtitle | `font-crimson text-xl md:text-2xl text-gold-300/80 italic` |
| Caption / muted | `text-xs text-gray-400` or `text-xs text-gray-600` |

---

## Layout & Structure

### Page Shell

The app uses two distinct layouts:

**1. Landing Page (`src/app/page.tsx`)** — A full-screen centered layout with no sidebar. Features an animated background gradient and a live countdown clock. Users enter the app from here.

**2. DashboardLayout (`src/components/layout/DashboardLayout.tsx`)** — Wraps all authenticated app pages. Composed of:
- A fixed-width sidebar (240px / `w-60`) on the left
- A main content area offset by `md:ml-60`
- A fixed hero banner at the top of the main area
- A footer with the unofficial fan disclaimer

### Sidebar (`src/components/layout/Sidebar.tsx`)

- Background: `bg-pywel-secondary` (`#111116`)
- Border: `border-r border-pywel-border`
- Width: `w-60` (240px), fixed and always-on at `md:` and above
- Mobile: slides in from the left via `translate-x` toggle, with a `bg-black/50` backdrop overlay
- Logo section at top, nav sections in middle, support + user footer at bottom

**Active state:** `bg-pywel-card border-l-4 border-gold-400 text-gold-300` — note the left border accent is the key visual differentiator for active nav items.

**Inactive state:** `text-gray-300 hover:bg-pywel-card hover:text-gold-300`

**"Coming Soon" badge:** `text-[10px] font-semibold text-gold-400/70 bg-gold-400/10 px-1.5 py-0.5 rounded`

### Hero Banner

Located at the top of the main content area in DashboardLayout. Uses a custom inline gradient from deep crimson-black on the left fading to near-black on the right:

```
background: linear-gradient(to right, #1A0305 0%, ... #070101 100%)
```

Contains the app title (`font-cinzel text-3xl md:text-4xl font-bold text-gold-300`), the italic subtitle in Crimson Text, a GlobalSearch component, and a Home button.

### Content Area

- Padding: `px-6 md:px-8 py-8`
- Max-width: unconstrained, fills available space
- Sections within pages use `space-y-8` between them

### Grid Patterns

| Pattern | Classes |
|---|---|
| Stat tiles (6-up) | `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4` |
| Quick-access cards (3-up) | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` |
| Key features (2-up) | `grid md:grid-cols-2 gap-6` |
| Countdown units (4-up) | `grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8` |

---

## Component Patterns

### Cards

The standard card is the most common UI element. There are two main variants.

**Stat Tile (compact):**
```
bg-pywel-card border border-pywel-border rounded-lg p-4
hover:bg-pywel-card-hover hover:border-gold-500/50 transition-colors duration-200
```

**Content Card (full):**
```
bg-pywel-card border border-pywel-border rounded-lg p-6
hover:border-gold-400 hover:bg-pywel-card-hover transition-all duration-200 cursor-pointer group
```

**Section Container (no hover):**
```
bg-gradient-to-r from-pywel-secondary/30 to-black/30 border border-pywel-border rounded-lg p-8
```

All cards use `rounded-lg`. No `rounded-xl` or `rounded-2xl` — keep corners tight to match the utilitarian aesthetic.

### Buttons

**Primary CTA (gold, pill-shaped — landing page):**
```
px-8 py-3 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400
text-black font-cinzel font-bold rounded-full transition-all duration-200
```

**Secondary CTA (outlined, pill-shaped — landing page):**
```
px-8 py-3 bg-pywel-card hover:bg-pywel-card-hover border border-gold-400/30
text-gold-300 font-cinzel font-bold rounded-full transition-colors duration-200
```

**Sign In Button (sidebar, solid gold):**
```
w-full px-3 py-2 text-sm bg-gold-600 hover:bg-gold-500
text-black font-semibold rounded-lg transition-colors duration-200 font-cinzel
```

**Sign Out / Utility Button (sidebar, ghost):**
```
w-full px-3 py-2 text-sm bg-pywel-card hover:bg-pywel-card-hover
border border-pywel-border text-gray-300 rounded-lg transition-colors duration-200 font-cinzel
```

**Buy Me a Coffee (amber gradient):**
```
bg-gradient-to-r from-amber-700/20 to-amber-900/20 hover:from-amber-700/30 hover:to-amber-900/30
border border-amber-600/30 hover:border-amber-500/50 text-amber-300 hover:text-amber-200
font-cinzel font-semibold rounded-lg
```

### Quick-Access Card Icons

Each quick-access card has a color-coded icon badge using Tailwind gradient backgrounds:

```
inline-flex p-3 rounded-lg mb-4 bg-gradient-to-br {card.color}
```

The color pairs follow this pattern: each feature area gets a distinct hue (blue for map, amber for quests, red for bestiary, yellow for crafting, purple for skills, gray for notes), always using the `-600 to -800` range for dark-on-dark contrast.

### Avatar / User Display (Sidebar)

When signed in, the user's avatar displays as either:
- An `<img>` with `w-8 h-8 rounded-full` for OAuth avatars
- A fallback initial badge: `w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-xs font-bold text-black`

### Gold Divider Line

Used on the landing page beneath the main title:

```
h-1 w-24 bg-gradient-to-r from-gold-400 to-gold-300 mx-auto mt-6
```

---

## Iconography

All icons are from the **Lucide React** library (`lucide-react@^0.383.0`). No other icon libraries are used.

### Icon Sizing Convention

| Context | Size |
|---|---|
| Sidebar nav items | `w-5 h-5` |
| Mobile menu toggle | `w-6 h-6` |
| Hero banner Home button | `w-5 h-5` |
| Stat tile icons | `w-5 h-5` |
| Quick-access card icons | `w-6 h-6` |
| Buy Me a Coffee icon | `w-4 h-4` |
| User auth buttons | `w-4 h-4` |

### Icon Color Convention

- Sidebar nav (inactive): default gray (inherited from `text-gray-300`)
- Sidebar nav (active): `text-gold-300` (inherited from active state class)
- Stat tiles: `text-gold-400`
- Quick-access badges: `text-white` (on colored gradient background)
- Hero banner Home button: `text-gold-300`

### Sidebar Nav Icon Mapping

| Section | Feature | Icon |
|---|---|---|
| Overview | Dashboard | `Compass` |
| World | World Map | `Globe` |
| World | Characters | `Users` |
| World | Mounts | `Footprints` |
| World | Greymane Camp | `Tent` |
| Progress | Skill Trees | `TreePine` |
| Progress | Collectibles | `Sparkles` |
| Progress | Quest Log | `Scroll` |
| Guides | New Player Guide | `HelpCircle` |
| Combat | Bestiary | `Skull` |
| Combat | Weapons | `Sword` |
| Resources | Crafting | `Hammer` |
| Resources | Inventory | `Package` |
| Resources | Notes | `BookOpen` |
| Social | Group | `Users2` |
| Social | Build Planner | `Wrench` |
| Social | Shared Builds | `Share2` |

---

## Animation & Motion

Two custom keyframe animations are defined in `tailwind.config.ts`.

### `fade-in`

A subtle entrance animation applied on page/component mount.

```css
0%:  opacity: 0, transform: translateY(8px)
100%: opacity: 1, transform: translateY(0)
```

- Utility class: `animate-fade-in`
- Duration: `0.3s ease-out`
- Use on page containers, cards on first render, modals

### `pulse-gold`

A soft pulsing glow used to draw attention to key interactive elements.

```css
0%, 100%: box-shadow: 0 0 0 0 rgba(174, 137, 84, 0.4)
50%:       box-shadow: 0 0 0 8px rgba(174, 137, 84, 0)
```

- Utility class: `animate-pulse-gold`
- Duration: `2s infinite`
- Use sparingly — only on primary CTAs or elements that need to signal urgency
- Color reference: `gold-400` (`#AE8954`) at 40% opacity

### Transition Defaults

All interactive elements default to `transition-colors duration-200` or `transition-all duration-200`. Do not use longer durations — the UI should feel responsive, not sluggish.

- Links: `@apply transition-colors duration-200` (set globally)
- Buttons: `@apply transition-all duration-200` (set globally)
- Sidebar: `transition-transform duration-300` (mobile slide-in only)

---

## Spacing & Sizing

### Page-Level

| Context | Value |
|---|---|
| Main content padding (horizontal) | `px-6 md:px-8` |
| Main content padding (top) | `py-8` |
| Hero banner padding | `py-8 md:py-12` |
| Between page sections | `space-y-8` |

### Component-Level

| Context | Value |
|---|---|
| Card padding (compact) | `p-4` |
| Card padding (standard) | `p-6` |
| Card padding (large section) | `p-8` |
| Card gap (tight) | `gap-4` |
| Card gap (standard) | `gap-6` |
| Nav section margin | `mb-8` |
| Nav item spacing | `space-y-1` |
| Nav section label margin | `mb-3` |
| Nav item padding | `px-3 py-2` |
| Sidebar logo padding | `p-6` |

### Border Radius

- Cards: `rounded-lg`
- Buttons (pill): `rounded-full` (landing CTAs only)
- Buttons (standard): `rounded-lg`
- Badges/chips: `rounded` (very small elements) or `rounded-lg`
- Avatar: `rounded-full`

---

## Page Inventory

The app is organized into two route groups under `src/app/`.

### `(auth)` — Unauthenticated Routes

| Route | File | Description |
|---|---|---|
| `/login` | `(auth)/login/page.tsx` | Discord + Google OAuth sign-in |
| `/auth/callback` | `(auth)/callback/route.ts` | Supabase OAuth callback handler |

### `(app)` — Authenticated App Routes

All wrapped in `DashboardLayout` via `(app)/layout.tsx`.

| Route | Section | Status |
|---|---|---|
| `/dashboard` | Overview | Live |
| `/characters` | World | Live |
| `/mounts` | World | Live |
| `/camp` | World | Live — Greymane Camp facilities & upgrades |
| `/map` | World | Coming Soon |
| `/skills` | Progress | Live — skill trees for Kliff, Damiane, Oongka |
| `/collectibles` | Progress | Live — artifacts, gear, recipes, lore, fast-travel, edition |
| `/quests` | Progress | Live — main, side, faction, character arc, liberation quests |
| `/guide` | Guides | Live — new player guide |
| `/bestiary` | Combat | Live — boss tracker with difficulty & element data |
| `/weapons` | Combat | Live — weapons comparison grid |
| `/crafting` | Resources | Live — cooking, alchemy, blacksmithing, dyes, camp upgrades |
| `/inventory` | Resources | Coming Soon |
| `/notes` | Resources | Live — personal notes with auto-save |
| `/group` | Social | Coming Soon |
| `/planner` | Social | Live — build planner tool |
| `/builds` | Social | Live — shared public builds |

### Public Landing Page

| Route | Description |
|---|---|
| `/` | Pre-launch landing with countdown clock (game launched March 19, 2026) |

---

## Tech Stack Reference

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.4 |
| Styling | Tailwind CSS 3.4 |
| UI Icons | Lucide React 0.383 |
| Fonts | Google Fonts via `next/font` (Cinzel, Crimson Text, Inter) |
| Auth | Supabase Auth (Discord + Google OAuth) |
| Database | Supabase (PostgreSQL + Row Level Security) |
| Analytics | Vercel Analytics |
| Hosting | Vercel |
| Scraper | Python 3.11 + Playwright + BeautifulSoup |
| State | React hooks + optimistic Supabase sync |

### Project Structure

```
crimson-desert-app/
  src/
    app/
      (app)/          # All dashboard pages + layout
      (auth)/         # Login + OAuth callback
      api/scraper/    # Scraper API endpoint
      layout.tsx      # Root layout (fonts, metadata)
      page.tsx        # Landing page
    components/
      layout/         # DashboardLayout, Sidebar
      icons/          # WeaponIcons
      GlobalSearch.tsx
      SignInPrompt.tsx
    hooks/
      use-progress.ts # Progress sync
      use-user.ts     # Auth state
    lib/
      game-data.ts    # All game data constants
      supabase/       # Client + server configs
    types/
      game-data.ts    # TypeScript type definitions
    styles/
      globals.css     # Tailwind directives + global overrides
  supabase/
    migrations/       # SQL schema
  scraper/            # Python scraper (wiki, news, guides, map)
  tailwind.config.ts  # Custom color + font theme
  next.config.js
  vercel.json
```

### Key Game Data Types

Defined in `src/types/game-data.ts`:

- `Character` — `'kliff' | 'damiane' | 'oongka'`
- `Region` — `'hernand' | 'pailune' | 'demeniss' | 'delesyia' | 'desert' | 'abyss'`
- `Difficulty` — `'normal' | 'hard' | 'extreme' | 'legendary'`
- `Element` — `'physical' | 'fire' | 'frost' | 'shock' | 'abyss'`
- `QuestType` — `'main' | 'side' | 'faction' | 'character' | 'liberation'`
- `CollectibleCategory` — `'artifact' | 'gear' | 'recipe' | 'lore' | 'fast-travel' | 'edition'`
- `CraftingType` — `'cooking' | 'alchemy' | 'blacksmith' | 'dye' | 'camp-upgrade'`
- `MountCategory` — `'horse' | 'bear' | 'raptor' | 'lizard' | 'wyvern' | 'mechanical' | 'dinosaur' | 'exotic'`

---

*This is an unofficial fan companion and is not affiliated with Pearl Abyss.*
