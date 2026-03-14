declare module '@supabase/ssr' {
  import { SupabaseClient } from '@supabase/supabase-js';

  export type CookieOptions = {
    domain?: string;
    expires?: Date;
    httpOnly?: boolean;
    maxAge?: number;
    path?: string;
    sameSite?: 'lax' | 'strict' | 'none';
    secure?: boolean;
  };

  export type CookieMethods = {
    get: (name: string) => string | undefined;
    set: (name: string, value: string, options: CookieOptions) => void;
    remove: (name: string, options: CookieOptions) => void;
  };

  export type CookieOptionsWithName = CookieOptions & { name: string; value: string };

  export function createBrowserClient(
    supabaseUrl: string,
    supabaseKey: string,
    options?: any
  ): SupabaseClient;

  export function createServerClient(
    supabaseUrl: string,
    supabaseKey: string,
    options: { cookies: CookieMethods }
  ): SupabaseClient;
}
