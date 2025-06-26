import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { email, password, fullName } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error || !data.user) {
    return NextResponse.json({ success: false, error: error?.message || 'Signup failed' }, { status: 400 });
  }
  // Insert into profiles table
  await supabase.from('profiles').insert({
    id: data.user.id,
    email,
    first_name: fullName,
    created_at: new Date().toISOString(),
  });
  // Cookies are set automatically if session is present
  if (data.session) {
    return NextResponse.json({ success: true, user: data.user });
  }
  // If no session, likely email confirmation required
  return NextResponse.json({ success: true, user: data.user, confirmationRequired: true });
} 