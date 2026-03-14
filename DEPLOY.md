# Crimson Desert Companion - Deployment Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Name it `crimson-desert-app` (public or private)
3. Do NOT initialize with README (we already have one)
4. In your terminal, from the project folder:

```bash
cd crimson-desert-app
git init
git add -A
git commit -m "Initial commit: Crimson Desert Companion App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/crimson-desert-app.git
git push -u origin main
```

## Step 2: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Name: `crimson-desert-companion`
4. Choose a database password (save it!)
5. Region: pick the closest to you
6. Wait for provisioning (~2 minutes)

### Run the Database Migration

1. Go to SQL Editor in your Supabase dashboard
2. Click "New Query"
3. Copy the contents of `supabase/migrations/001_initial_schema.sql`
4. Run the query

### Get Your API Keys

Go to Settings > API and copy:
- Project URL (NEXT_PUBLIC_SUPABASE_URL)
- anon/public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
- service_role key (SUPABASE_SERVICE_ROLE_KEY)

## Step 3: Configure Discord OAuth

1. Go to https://discord.com/developers/applications
2. Click "New Application", name it "Crimson Desert Companion"
3. Go to the OAuth2 tab
4. Add redirect URL: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
5. Copy the Client ID and Client Secret
6. In Supabase: Auth > Providers > Discord
7. Enable Discord, paste Client ID and Client Secret
8. Save

## Step 4: Configure Google OAuth

1. Go to https://console.cloud.google.com/apis/credentials
2. Create a new project or select existing
3. Click "Create Credentials" > "OAuth 2.0 Client ID"
4. Application type: Web application
5. Add authorized redirect: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
6. Copy Client ID and Client Secret
7. In Supabase: Auth > Providers > Google
8. Enable Google, paste Client ID and Client Secret
9. Save

## Step 5: Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Framework: Next.js (auto-detected)
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
   - `SUPABASE_SERVICE_ROLE_KEY` = your service role key
   - `SCRAPER_API_KEY` = generate a random string (e.g., `openssl rand -hex 32`)
5. Click Deploy

## Step 6: Connect Custom Domain (crimsoncompanionapp.us)

1. In Vercel: Project Settings > Domains
2. Add `crimsoncompanionapp.us`
3. Vercel will show you DNS records to configure
4. Go to your domain registrar and add:
   - A record: `76.76.21.21` (for root domain)
   - CNAME: `cname.vercel-dns.com` (for www subdomain)
5. Wait for DNS propagation (can take up to 48 hours, usually 5-30 minutes)
6. Vercel will auto-provision SSL

### Update Supabase Redirect URLs

After connecting the domain, update your OAuth redirect URLs:
1. In Supabase: Auth > URL Configuration
2. Set Site URL to: `https://crimsoncompanionapp.us`
3. Add redirect URL: `https://crimsoncompanionapp.us/callback/`

Also update in Discord and Google developer consoles if needed.

## Step 7: Set Up the Scraper (Optional)

See the main README.md for scraper setup instructions.
The Vercel cron job at `/api/scraper` runs every 6 hours automatically.
