import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function GET(req: NextRequest) {
  const team_id = req.nextUrl.searchParams.get("team_id");
  if (!team_id) return NextResponse.json({ success: false, error: "Missing team_id" }, { status: 400 });
  const { data, error } = await supabase.from("team_members").select("*").eq("team_id", team_id);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  return NextResponse.json({ success: true, members: data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { team_id, user_id, email, role } = body;
  if (!team_id || !email || !role) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
  const { data, error } = await supabase.from("team_members").insert([{ team_id, user_id, email, role }]).select().single();
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  return NextResponse.json({ success: true, member: data });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, team_id, role } = body;
  if (!id || !team_id || !role) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
  const { data, error } = await supabase.from("team_members").update({ role }).eq("id", id).eq("team_id", team_id).select().single();
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  return NextResponse.json({ success: true, member: data });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id, team_id } = body;
  if (!id || !team_id) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
  const { error } = await supabase.from("team_members").delete().eq("id", id).eq("team_id", team_id);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
} 