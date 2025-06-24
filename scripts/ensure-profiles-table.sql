-- Run this script once. It can safely be executed multiple times.

-- 1️⃣  UUID helper (needed for gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2️⃣  PROFILES  --------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id           UUID              PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email        TEXT,
  first_name   TEXT,
  last_name    TEXT,
  company      TEXT,
  plan         TEXT DEFAULT 'free',
  status       TEXT DEFAULT 'active',
  avatar_url   TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Updated-at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_touch_profiles ON public.profiles;
CREATE TRIGGER trg_touch_profiles
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- 3️⃣  MINIMAL RLS so app continues to work (adjust later)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'profiles'
  ) THEN
    -- Allow service-role (admin) and each user to select their own row.
    CREATE POLICY "self_or_service" ON public.profiles
      FOR ALL
      USING  ( auth.role() = 'service_role' OR auth.uid() = id )
      WITH CHECK ( auth.role() = 'service_role' OR auth.uid() = id );
  END IF;
END;
$$;
