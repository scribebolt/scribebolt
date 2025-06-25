import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

async function rewriteEmailWithAI({ baseEmail, persona, tone, linkedin, promptExamples }: any) {
  const prompt = `Rewrite this email for cold outreach. Persona: ${persona}. Tone: ${tone}. LinkedIn: ${linkedin}. Examples: ${promptExamples}.\n\nBase Email:\n${baseEmail}`;
  const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputs: prompt }),
  });
  if (!response.ok) throw new Error("AI model error");
  const result = await response.json();
  return typeof result === "string" ? result : result[0]?.generated_text || "No output";
}

export async function POST(req: NextRequest) {
  const { rows, user_id, persona, tone, promptExamples } = await req.json();
  if (!rows || !user_id) return NextResponse.json({ success: false, error: "Missing input" }, { status: 400 });
  try {
    const results = [];
    for (const row of rows) {
      const baseEmail = row.baseEmail || "";
      const linkedin = row.linkedinUrl || "";
      const email = await rewriteEmailWithAI({ baseEmail, persona, tone, linkedin, promptExamples });
      results.push({ ...row, personalizedEmail: email });
    }
    await supabase.from("usage_logs").insert({ user_id, action: "bulk_rewrite", metadata: { count: rows.length } });
    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Bulk personalization failed" }, { status: 500 });
  }
} 