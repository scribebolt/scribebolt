/* NOTE: identical logic to the previous actions.ts file
   - renamed to users-actions.ts so the module can be located */

"use server"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

/* ---------- Types ---------- */
export interface AdminUser {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  company: string | null
  plan: string
  status: string
  created_at: string
  last_sign_in_at: string | null
  email_confirmed_at: string | null
  onboarding_completed: boolean
  role: string
}

/* ---------- Helpers ---------- */
const emptyStats = () => ({
  totalUsers: 0,
  activeUsers: 0,
  trialUsers: 0,
  suspendedUsers: 0,
})

/* ---------- Public API ---------- */
export async function fetchUsers(): Promise<AdminUser[]> {
  const { data: profiles, error } = await supabase
    .schema("public")
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error || !profiles) {
    console.error("Error fetching profiles:", error)
    return []
  }

  // -------------------------------------------------------------------
  //  Grab onboarding rows - tolerate a missing table (42P01)
  // -------------------------------------------------------------------
  let onboardingRows: { user_id: string; role: string | null; completed_at: string | null }[] | undefined = []

  try {
    const { data, error } = await supabase
      .schema("public")
      .from("onboarding_data")
      .select("user_id, role, completed_at")

    if (error) throw error
    onboardingRows = data ?? []
  } catch (err: any) {
    /* 42P01 = undefined_table → treat as “no onboarding data yet” and proceed */
    if (err?.code === "42P01") {
      console.warn("onboarding_data table not found – continuing without it")
    } else {
      console.error("Error fetching onboarding_data:", err?.message ?? err)
    }
  }

  const onboardingByUser = new Map<string, { role: string; completed_at: string | null }>()
  onboardingRows?.forEach((o) =>
    onboardingByUser.set(o.user_id, { role: o.role ?? "unknown", completed_at: o.completed_at }),
  )

  const { data: authList, error: authErr } = await supabase.auth.admin.listUsers()
  if (authErr) console.error("Error fetching auth users:", authErr)

  return profiles.map((p) => {
    const authUser = authList?.users.find((au) => au.id === p.id)
    const onboarding = onboardingByUser.get(p.id)

    return {
      id: p.id,
      email: p.email ?? authUser?.email ?? "",
      first_name: p.first_name,
      last_name: p.last_name,
      company: p.company,
      plan: p.plan ?? "free",
      status: p.status ?? "active",
      created_at: p.created_at,
      last_sign_in_at: authUser?.last_sign_in_at ?? null,
      email_confirmed_at: authUser?.email_confirmed_at ?? null,
      onboarding_completed: !!onboarding?.completed_at,
      role: onboarding?.role ?? "unknown",
    }
  })
}

export async function getUserStats() {
  try {
    const { data, error } = await supabase.schema("public").from("profiles").select("status, plan")

    if (error || !data) throw error

    return {
      totalUsers: data.length,
      activeUsers: data.filter((u) => u.status === "active").length,
      trialUsers: data.filter((u) => u.plan === "trial").length,
      suspendedUsers: data.filter((u) => u.status === "suspended").length,
    }
  } catch (err: any) {
    if (err?.code === "42P01") console.warn("profiles table missing – returning empty stats")
    else console.error("getUserStats failed:", err)
    return emptyStats()
  }
}

export async function updateUserStatus(userId: string, status: string) {
  const { error } = await supabase.schema("public").from("profiles").update({ status }).eq("id", userId)

  return error ? { success: false, error: error.message } : { success: true }
}

export async function deleteUser(userId: string) {
  const { error } = await supabase.auth.admin.deleteUser(userId)
  return error ? { success: false, error: error.message } : { success: true }
}
