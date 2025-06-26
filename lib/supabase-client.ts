import { createBrowserSupabaseClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Client-side Supabase client
export const createClientSupabase = () => createBrowserSupabaseClient();

// Server-side Supabase client (for server components, API routes, middleware)
export const createServerSupabase = () =>
  createServerComponentClient({
    cookies,
  }); 