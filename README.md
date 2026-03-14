# Crimson Desert Companion Dashboard

A full-stack companion app for **Crimson Desert** (Pearl Abyss, March 19, 2026). Track your progress, plan builds, share with friends, and stay updated with auto-scraped community data.

## Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Auth**: Supabase Auth (Discord + Google OAuth)
- **Database**: Supabase (PostgreSQL + Row Level Security)
- **Maps**: Leaflet.js + react-leaflet
- **Scraper**: Python + Playwright + BeautifulSoup
- **Hosting**: Vercel
- **State**: Zustand + React hooks with optimistic Supabase sync

## Features

- Interactive world map with custom pins (Leaflet.js)
- Skill tree tracker for all 3 characters (Kliff, Damiane, Oongka)
- Collectibles tracker with progress bars (Abyss Artifacts, Gears, Recipes, Lore, Fast Travel)
- Boss bestiary with defeat tracking
- Quest log with status cycling
- Weapons comparison grid
- Crafting recipe guide
- Build planner / theorycrafting tool
- Friend groups with shared progress dashboard
- Personal notes with auto-save
- Auto-scraped wiki data, news, community guides, and map locations
- Discord + Google OAuth login
- Dark fantasy theme matching Crimson Desert's aesthetic

---

## Setup Guide

### Prerequisites

- Node.js 18+
- Python 3.11+
- A [Supabase](https://supabase.com) account (free tier works)
- A [Vercel](https://vercel.com) account (free tier works)
- Discord Developer Application (for OAuth)
- Google Cloud Console project (for OAuth)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd crimson-desert-app
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migration file:
   ```
   supabase/migrations/001_initial_schema.sql
   ```
3. Copy your project URL and anon key from **Settings > API**

### 3. Configure OAuth Providers

#### Discord
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to **OAuth2** tab
4. Add redirect URL: `https://your-project.supabase.co/auth/v1/callback`
5. Copy the Client ID and Client Secret
6. In Supabase: **Auth > Providers > Discord**, enable and paste credentials

#### Google
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 Client ID (Web application)
3. Add authorized redirect: `https://your-project.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret
5. In Supabase: **Auth > Providers > Google**, enable and paste credentials

### 4. Environment Variables

Copy the example env file:
```bash
cp .env.local.example .env.local
```

Fill in your values:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
SCRAPER_API_KEY=your-random-secret-here
```

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Deploy to Vercel

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com/new)
3. Add the same environment variables in Vercel project settings
4. Deploy!

Your app will be live at `your-project.vercel.app`

### 7. Set Up the Scraper

The Python scraper runs separately from the Next.js app:

```bash
cd scraper
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
playwright install chromium
```

Run once:
```bash
python main.py
```

Run on a schedule (every 6 hours):
```bash
python main.py --schedule
```

Run a specific source:
```bash
python main.py --source wiki
python main.py --source news
python main.py --source guide
python main.py --source map
```

For always-on scraping, deploy the scraper to:
- **Railway** or **Fly.io** (recommended for long-running processes)
- **GitHub Actions** with a cron schedule
- A VPS with systemd or cron

### 8. Share with Friends

1. Sign in to the dashboard
2. Go to the **Group** page
3. Click "Create Group" to get an invite code
4. Share the 8-character code with friends
5. Friends enter the code on their Group page to join
6. Everyone can see each other's progress on the group dashboard

---

## Project Structure

```
crimson-desert-app/
  src/
    app/                    # Next.js App Router pages
      (auth)/               # Login + OAuth callback
      api/scraper/          # Scraper API endpoint
      bestiary/             # Boss tracker
      characters/           # Character profiles
      collectibles/         # Collectibles tracker
      crafting/             # Crafting recipes
      dashboard/            # Main overview
      group/                # Friend groups
      map/                  # Interactive Leaflet map
      notes/                # Personal notes
      planner/              # Build planner
      quests/               # Quest log
      skills/               # Skill trees
      weapons/              # Weapons grid
    components/
      layout/               # Sidebar, DashboardLayout
      MapComponent.tsx      # Leaflet map (dynamic import)
    hooks/
      use-progress.ts       # Progress sync hook
    lib/
      game-data.ts          # All game data constants
      supabase/             # Supabase client configs
    types/
      game-data.ts          # TypeScript type definitions
    styles/
      globals.css           # Tailwind + custom styles
  supabase/
    migrations/             # SQL schema
  scraper/
    main.py                 # Entry point
    config.py               # URLs and settings
    storage.py              # Supabase storage layer
    scrapers/               # Individual scraper modules
      base.py               # Base Playwright scraper
      wiki_scraper.py       # Fextralife, Game8
      news_scraper.py       # Pearl Abyss, PCGamer
      guide_scraper.py      # Reddit, Steam guides
      map_scraper.py        # MapGenie locations
  vercel.json               # Vercel deployment config
  tailwind.config.ts        # Custom Crimson Desert theme
```

## Updating Game Data

As the game launches and the community discovers new content, you can:

1. **Auto-update via scraper**: The scraper pulls from wikis and guides automatically
2. **Manual update**: Edit `src/lib/game-data.ts` to add new skills, bosses, collectibles, etc.
3. **Community pins**: Users can add custom map pins that get shared with their group

---

Built for the continent of Pywel. Good luck, Greymane.
