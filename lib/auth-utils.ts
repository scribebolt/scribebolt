import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function getAuthenticatedUser(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { user: null, error: "No token provided" };
  }

  const token = authHeader.substring(7);
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return { user: null, error: "Invalid token" };
    }

    return { user, error: null };
  } catch (error) {
    return { user: null, error: "Authentication failed" };
  }
}

export async function getAuthenticatedUserFromCookie(req: NextRequest) {
  const accessToken = req.cookies.get('sb-access-token')?.value;
  const refreshToken = req.cookies.get('sb-refresh-token')?.value;
  
  if (!accessToken && !refreshToken) {
    return { user: null, error: "No session found" };
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(accessToken || '');
    
    if (error || !user) {
      return { user: null, error: "Invalid session" };
    }

    return { user, error: null };
  } catch (error) {
    return { user: null, error: "Authentication failed" };
  }
} 