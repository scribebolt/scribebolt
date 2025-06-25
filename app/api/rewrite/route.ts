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
  const { baseEmail, persona, tone, linkedin, promptExamples, user_id } = await req.json();
  if (!user_id) return NextResponse.json({ success: false, error: "Missing user_id" }, { status: 400 });
  try {
    const variations = [];
    for (let i = 1; i <= 3; i++) {
      const email = await rewriteEmailWithAI({
        baseEmail,
        persona,
        tone,
        linkedin,
        promptExamples: promptExamples + ` (variation ${i})`,
      });
      variations.push(email);
    }
    await supabase.from("usage_logs").insert({ user_id, action: "rewrite", metadata: { persona, tone, linkedin } });
    return NextResponse.json({ success: true, variations });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Rewrite failed" }, { status: 500 });
  }
} 