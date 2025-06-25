import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function POST(req: NextRequest) {
  const { email, password, fullName } = await req.json();
  // 1. Sign up user
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error || !data.user) return NextResponse.json({ success: false, error: error?.message || "Signup failed" }, { status: 400 });

  // 2. Insert into profiles table
  await supabase.from("profiles").insert({
    id: data.user.id,
    email,
    first_name: fullName,
    created_at: new Date().toISOString(),
  });

  return NextResponse.json({ success: true, user: data.user });
} 