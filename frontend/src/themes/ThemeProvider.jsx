import React, { createContext, useState, useEffect } from 'react'
import { lightTheme, darkTheme } from './themeConfig'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage or system preference
    const stored = localStorage.getItem('hmscc-theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const theme = isDark ? darkTheme : lightTheme

  useEffect(() => {
    localStorage.setItem('hmscc-theme', isDark ? 'dark' : 'light')
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      <div
        style={{
          background: theme.colors.background,
          color: theme.colors.text,
          fontFamily: theme.typography.fontFamily.ui,
          transition: `background ${theme.transitions.normal}, color ${theme.transitions.normal}`,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
