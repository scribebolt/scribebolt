import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function POST(req: NextRequest) {
  const { email, persona, tone, user_id } = await req.json();
  if (!email || !persona || !tone || !user_id) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });

  // Call free AI model (Hugging Face Inference API example)
  const aiRes = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputs: `Rewrite this email for the following persona and tone.\nPersona: ${persona}\nTone: ${tone}\nEmail:\n${email}` })
  });
  if (!aiRes.ok) return NextResponse.json({ success: false, error: "AI model error" }, { status: 500 });
  const aiData = await aiRes.json();
  const rewritten = typeof aiData === "string" ? aiData : aiData[0]?.generated_text || "No rewrite";

  // Log usage
  await supabase.from("usage_logs").insert({ user_id, action: "rewrite" });

  return NextResponse.json({ success: true, rewritten });
} 