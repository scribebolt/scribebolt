"use server"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function joinWaitlist(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const role = formData.get("role") as string

  // Validate required fields
  if (!name || !email || !role) {
    return {
      success: false,
      error: "All fields are required",
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: "Please enter a valid email address",
    }
  }

  try {
    // Insert into waitlist table
    const { data, error } = await supabase
      .from("waitlist")
      .insert([
        {
          name: name.trim(),
          email: email.toLowerCase().trim(),
          role: role,
        },
      ])
      .select()

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === "23505") {
        return {
          success: false,
          error: "This email is already on our waitlist!",
        }
      }

      console.error("Supabase error:", error)
      return {
        success: false,
        error: "Something went wrong. Please try again.",
      }
    }

    return {
      success: true,
      message: "You're on the list! We'll be in touch soon.",
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  }
}
