'use client';

import { createBrowserClient } from '@supabase/ssr';

// During static prerender (no window) the env vars may be absent, for example
// on a preview deployment without secrets. Fall back to inert placeholders so
// the build succeeds; in the browser the real values are always required.
const PLACEHOLDER_URL = 'https://placeholder.supabase.co';
const PLACEHOLDER_KEY = 'placeholder-anon-key';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isServer = typeof window === 'undefined';
  return createBrowserClient(
    url || (isServer ? PLACEHOLDER_URL : ''),
    key || (isServer ? PLACEHOLDER_KEY : '')
  );
}
