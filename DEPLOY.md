# ARC Raiders Companion - Deployment Guide

The app is hosted on Vercel and auto-deploys on push to `main`. The custom domain is
`crimsoncompanionapp.us` (kept from the previous app; point a new domain at the same Vercel
project if you want to rebrand the URL).

## 1. Supabase

1. Open the project at https://supabase.com/dashboard
2. SQL Editor > New query
3. Run `supabase/migrations/002_arc_raiders.sql` (001 is already applied on the live project)
4. Settings > API: copy the project URL and anon key

### Auth

- Auth > Providers > Discord: enabled with your Discord application credentials
- Auth > URL Configuration: Site URL `https://crimsoncompanionapp.us`, redirect `https://crimsoncompanionapp.us/callback/`

## 2. Vercel

Environment variables required:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

`SUPABASE_SERVICE_ROLE_KEY` and `SCRAPER_API_KEY` are no longer used and can be removed.

## 3. Changing the domain

1. Vercel > Project Settings > Domains > add the new domain
2. Update `SITE_URL` in `src/lib/site.ts`
3. Update the Supabase Site URL and redirect URL, and the Discord OAuth redirect

## 4. Local development

```bash
cp .env.local.example .env.local   # fill in the two Supabase values
npm install
npm run dev
```
