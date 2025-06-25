import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function GET(req: NextRequest) {
  const user_id = req.nextUrl.searchParams.get("user_id");
  if (!user_id) return NextResponse.json({ success: false, error: "Missing user_id" }, { status: 400 });
  const { data, error } = await supabase.from("templates").select("*").eq("user_id", user_id).order("created_at", { ascending: false });
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  return NextResponse.json({ success: true, templates: data });
}

export async function POST(req: NextRequest) {
  const { user_id, name, content } = await req.json();
  if (!user_id || !name || !content) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
  const { data, error } = await supabase.from("templates").insert({ user_id, name, content }).select();
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  return NextResponse.json({ success: true, template: data?.[0] });
}

export async function PUT(req: NextRequest) {
  const { id, user_id, name, content } = await req.json();
  if (!id || !user_id || !name || !content) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
  const { data, error } = await supabase.from("templates").update({ name, content }).eq("id", id).eq("user_id", user_id).select();
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  return NextResponse.json({ success: true, template: data?.[0] });
}

export async function DELETE(req: NextRequest) {
  const { id, user_id } = await req.json();
  if (!id || !user_id) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
  const { error } = await supabase.from("templates").delete().eq("id", id).eq("user_id", user_id);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
} 