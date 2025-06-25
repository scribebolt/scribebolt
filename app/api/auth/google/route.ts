import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const redirectTo = req.nextUrl.searchParams.get("redirectTo") || process.env.NEXT_PUBLIC_BASE_URL + "/dashboard";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const clientId = process.env.NEXT_PUBLIC_SUPABASE_GOOGLE_CLIENT_ID;
  // Supabase's Google OAuth endpoint
  const oauthUrl = `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`;
  return NextResponse.redirect(oauthUrl);
} 