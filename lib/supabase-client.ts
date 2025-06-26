// Deprecated. Do not import from this file.
// Use lib/supabase-browser.ts for client components and lib/supabase-server.ts for server components, API routes, and middleware.

import { createBrowserSupabaseClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Client-side Supabase client
export const createClientSupabase = () => createBrowserSupabaseClient();

// Server-side Supabase client (for server components, API routes, middleware)
export const createServerSupabase = () =>
  createServerComponentClient({
    cookies,
  }); 