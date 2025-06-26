import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies });
  const { error } = await supabase.auth.signOut();
  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
  // Cookies are cleared automatically by the helper
  return NextResponse.json({ success: true });
} 