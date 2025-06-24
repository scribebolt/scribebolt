"use client"

import * as React from "react"

type ThemeContextType = {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

const STORAGE_KEY = "scribebolt-theme"

function getInitialTheme() {
  if (typeof window === "undefined") return false
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? stored === "dark" : false
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = React.useState<boolean>(getInitialTheme)

  // Apply/remove the `dark` class on the <html> element
  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.toggle("dark", isDark)
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light")
  }, [isDark])

  const toggleTheme = React.useCallback(() => {
    setIsDark((prev) => !prev)
  }, [])

  const value = React.useMemo(() => ({ isDark, toggleTheme }), [isDark, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>")
  return ctx
}
