import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.session) {
    return NextResponse.json({ success: false, error: error?.message || 'Login failed' }, { status: 400 });
  }
  // Cookies are set automatically by the helper
  return NextResponse.json({ success: true, user: data.user });
} 