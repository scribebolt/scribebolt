import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const redirectTo = req.nextUrl.searchParams.get('redirectTo') || process.env.NEXT_PUBLIC_BASE_URL + '/dashboard';
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } });
  if (error || !url) {
    return NextResponse.json({ success: false, error: error?.message || 'Google OAuth failed' }, { status: 400 });
  }
  return NextResponse.redirect(url);
} 