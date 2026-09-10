# ARC Raiders Companion

An unofficial companion web app for **ARC Raiders** (Embark Studios). Live at [crimsoncompanionapp.us](https://crimsoncompanionapp.us).

Raid maps, ARC bestiary, weapons, gear, items and recipes, quest chains, the skill tree, workshop upgrades, expeditions, trader stock and a loadout planner. Sign in to track progress across devices and share loadouts and map pins with your squad.

## Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Auth**: Supabase Auth (Discord OAuth + email)
- **Database**: Supabase (PostgreSQL + Row Level Security)
- **Maps**: Leaflet + react-leaflet over in-game map imagery
- **Hosting**: Vercel (auto-deploys on push to `main`)

## Features

| Area | What it does |
| --- | --- |
| Dashboard | Database counts, your progress summary, recent patches |
| Raid Maps | Every map with POIs, extractions, keys, ARC spawns, events and tips. Pannable in-game map with personal and squad pins |
| ARC Bestiary | All machines with attacks, weak points, kill strategy, drops and spawn maps. Mark the ones you have destroyed |
| Weapons | Stats, upgrade tiers, recipes, mod slots, community tier, side-by-side compare, attachments and ammo |
| Gear & Gadgets | Shields, augments, throwables, deployables and healing |
| Items & Materials | 380+ items with sell value, recycle outputs, traders and uses, plus every workbench recipe |
| Quests | 100 trader quests in unlock order with objectives, rewards and chain links. Status syncs to your account |
| Skill Tree | All 45 nodes with prerequisites and community ratings. Plan your 76 points |
| Workshop | Every station level with material costs, plus a "farm next" shopping list |
| Expeditions | Prestige mechanics, project phases, Trials, Feats and achievements |
| Traders | Stock per trader with prices and level gates |
| New Raider Guide | Core loop, extraction rules, ARC behaviour, etiquette, tips, early loadouts, patch timeline |
| Loadout Planner | Build, price and save loadouts; share publicly or with your squad |
| Squad | Invite codes and a progress leaderboard |
| Notes | Personal auto-saving notes |

## Data

Game data lives in `src/data/*.ts` and is generated from research JSON plus the community data repo
[RaidTheory/arcraiders-data](https://github.com/RaidTheory/arcraiders-data) (MIT, powers arctracker.io).
Entries flagged `verified: false` came from search summaries rather than a primary source and show an
"unverified" tag in the UI. All game content and imagery is copyright Embark Studios AB.

To update data, edit the files in `src/data/` directly. Keep ids stable: user progress is keyed on them.

## Setup

### Prerequisites

- Node.js 18+
- A Supabase project (free tier works)
- A Vercel account (free tier works)
- A Discord developer application for OAuth (optional)

### 1. Install

```bash
git clone git@github.com:jamesnicknc/crimson-desert-app.git
cd crimson-desert-app
npm install
```

### 2. Database

Run the migrations in the Supabase SQL editor in order:

```
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_arc_raiders.sql
```

Migration 002 adds `map_slug` to map pins, drops the unused scraped-content table, and rewrites the
squad progress function for the new `ar-*` progress categories.

### 3. Environment

```bash
cp .env.local.example .env.local
```

Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Supabase Settings > API.

### 4. Run

```bash
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build
```

## Project structure

```
src/
  app/
    (auth)/            login + OAuth callback
    (app)/             all companion pages (dashboard, maps, arc, weapons, gear, items,
                       quests, skills, workshop, expeditions, traders, guide, planner,
                       builds, group, notes)
  components/
    layout/            Sidebar, DashboardLayout
    map/               RaidMapViewer (Leaflet)
    items/             ItemCard, ItemDetail
    ui/                PageHeader, Chips, SearchInput, Modal, ProgressBar, Tag, Checkbox
  data/                generated game data (weapons, enemies, maps, quests, items, progression)
  hooks/               use-user, use-progress, use-map-pins
  lib/                 game-data barrel + labels, loadout helpers, progress keys, supabase clients
  types/               TypeScript definitions
public/maps/           in-game map imagery (JPEG)
supabase/migrations/   SQL schema
```

## Progress storage

Progress rows live in `user_progress` with category keys prefixed `ar-` (`ar-quest`, `ar-skill`,
`ar-workshop`, `ar-arc`, `ar-expedition`, `ar-weapon`, `ar-achievement`). Quest rows store
`{ status }`, skill rows store `{ points }`, everything else stores `{ completed: true }`.

---

Unofficial fan project. Not affiliated with Embark Studios or Nexon.
