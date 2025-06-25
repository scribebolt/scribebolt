import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAuthenticatedUserFromCookie } from "@/lib/auth-utils";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function GET(req: NextRequest) {
  const { user, error: authError } = await getAuthenticatedUserFromCookie(req);
  if (authError || !user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
    
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  return NextResponse.json({ success: true, templates: data });
}

export async function POST(req: NextRequest) {
  const { user, error: authError } = await getAuthenticatedUserFromCookie(req);
  if (authError || !user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, content } = body;
  if (!name || !content) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
  
  const { data, error } = await supabase
    .from("templates")
    .insert([{ user_id: user.id, name, content }])
    .select()
    .single();
    
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  return NextResponse.json({ success: true, template: data });
}

export async function PUT(req: NextRequest) {
  const { user, error: authError } = await getAuthenticatedUserFromCookie(req);
  if (authError || !user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, name, content } = body;
  if (!id || !name || !content) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
  
  const { data, error } = await supabase
    .from("templates")
    .update({ name, content })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();
    
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  return NextResponse.json({ success: true, template: data });
}

export async function DELETE(req: NextRequest) {
  const { user, error: authError } = await getAuthenticatedUserFromCookie(req);
  if (authError || !user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id } = body;
  if (!id) return NextResponse.json({ success: false, error: "Missing template ID" }, { status: 400 });
  
  const { error } = await supabase
    .from("templates")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);
    
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
} 