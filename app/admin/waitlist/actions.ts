"use server"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function getWaitlistSubscribers() {
  try {
    const { data, error } = await supabase.from("waitlist").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching waitlist:", error)
      return { success: false, error: error.message, data: [] }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error("Error fetching waitlist:", error)
    return { success: false, error: "Failed to fetch waitlist data", data: [] }
  }
}

export async function exportWaitlistData() {
  try {
    const { data, error } = await supabase
      .from("waitlist")
      .select("name, email, role, created_at")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error exporting waitlist:", error)
      return { success: false, error: error.message, data: [] }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error("Error exporting waitlist:", error)
    return { success: false, error: "Failed to export waitlist data", data: [] }
  }
}

export async function deleteWaitlistEntry(id: string) {
  try {
    const { error } = await supabase.from("waitlist").delete().eq("id", id)

    if (error) {
      console.error("Error deleting waitlist entry:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Error deleting waitlist entry:", error)
    return { success: false, error: "Failed to delete waitlist entry" }
  }
}
