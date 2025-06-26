import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/lib/theme-context"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClientComponentClient();
  return (
    <html lang="en">
      <body>
        <SessionContextProvider supabaseClient={supabase}>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionContextProvider>
      </body>
    </html>
  )
}
