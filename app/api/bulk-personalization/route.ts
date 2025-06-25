import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function POST(req: NextRequest) {
  const { emails, persona, tone, user_id } = await req.json();
  if (!emails || !Array.isArray(emails) || !persona || !tone || !user_id) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });

  const rewrittenEmails = [];
  for (const email of emails) {
    const aiRes = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: `Rewrite this email for the following persona and tone.\nPersona: ${persona}\nTone: ${tone}\nEmail:\n${email}` })
    });
    if (!aiRes.ok) {
      rewrittenEmails.push({ original: email, rewritten: "AI model error" });
      continue;
    }
    const aiData = await aiRes.json();
    const rewritten = typeof aiData === "string" ? aiData : aiData[0]?.generated_text || "No rewrite";
    rewrittenEmails.push({ original: email, rewritten });
  }

  // Log usage
  await supabase.from("usage_logs").insert({ user_id, action: "bulk_personalization", count: emails.length });

  return NextResponse.json({ success: true, results: rewrittenEmails });
} 