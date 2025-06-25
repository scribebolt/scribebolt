import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

async function analyzeEmailWithAI(email: string) {
  const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputs: `Analyze this email for tone, spam, personalization, length, and give a score (0-100) with suggestions.\n\nEmail:\n${email}` }),
  });
  if (!response.ok) throw new Error("AI model error");
  const result = await response.json();
  return typeof result === "string" ? result : result[0]?.generated_text || "No feedback";
}

export async function POST(req: NextRequest) {
  const { email, user_id } = await req.json();
  if (!email || !user_id) return NextResponse.json({ success: false, error: "Missing input" }, { status: 400 });
  try {
    const feedback = await analyzeEmailWithAI(email);
    await supabase.from("usage_logs").insert({ user_id, action: "analyze", metadata: { email, feedback } });
    return NextResponse.json({ success: true, feedback });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to analyze email" }, { status: 500 });
  }
} 