import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function GET(req: NextRequest) {
  const workspace_id = req.nextUrl.searchParams.get("workspace_id");
  if (!workspace_id) return NextResponse.json({ success: false, error: "Missing workspace_id" }, { status: 400 });
  const { data, error } = await supabase.from("team_members").select("*").eq("workspace_id", workspace_id);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  return NextResponse.json({ success: true, members: data });
}

export async function POST(req: NextRequest) {
  const { workspace_id, user_id, invited_email, role } = await req.json();
  if (!workspace_id || !user_id || !invited_email || !role) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
  const { data, error } = await supabase.from("team_members").insert({ workspace_id, user_id, invited_email, role }).select();
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  await supabase.from("usage_logs").insert({ user_id, action: "invite_team_member", metadata: { invited_email, role } });
  return NextResponse.json({ success: true, member: data?.[0] });
}

export async function PUT(req: NextRequest) {
  const { id, user_id, role } = await req.json();
  if (!id || !user_id || !role) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
  const { data, error } = await supabase.from("team_members").update({ role }).eq("id", id).eq("user_id", user_id).select();
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  return NextResponse.json({ success: true, member: data?.[0] });
}

export async function DELETE(req: NextRequest) {
  const { id, user_id } = await req.json();
  if (!id || !user_id) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
  const { error } = await supabase.from("team_members").delete().eq("id", id).eq("user_id", user_id);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
} 