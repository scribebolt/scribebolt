"use server"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export interface OnboardingData {
  role: string
  company: string
  emailVolume: string
  useCase: string
  goals: string[]
  firstName: string
}

export async function saveOnboardingData(userId: string, data: OnboardingData) {
  try {
    // Save onboarding data
    const { error: onboardingError } = await supabase.from("onboarding_data").insert({
      user_id: userId,
      role: data.role,
      company: data.company,
      email_volume: data.emailVolume,
      use_case: data.useCase,
      goals: data.goals,
      first_name: data.firstName,
    })

    if (onboardingError) {
      throw onboardingError
    }

    // Update profile with additional info
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        first_name: data.firstName,
        company: data.company,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)

    if (profileError) {
      throw profileError
    }

    return { success: true }
  } catch (error) {
    console.error("Error saving onboarding data:", error)
    return { success: false, error: "Failed to save onboarding data" }
  }
}
