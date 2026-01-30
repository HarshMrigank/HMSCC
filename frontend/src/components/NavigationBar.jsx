import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeContext } from '../themes/ThemeProvider'

function NavigationBar() {
  const { theme, isDark, toggleTheme } = useContext(ThemeContext)
  const location = useLocation()

  const navLinks = [
    { label: 'Editor', path: '/' },
    { label: 'Documentation', path: '/documentation' },
    { label: 'About', path: '/about' },
    { label: 'Help', path: '/help' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav
      style={{
        background: theme.colors.surface,
        borderBottom: `1px solid ${theme.colors.border}`,
        padding: `${theme.spacing.md} ${theme.spacing.lg}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: theme.shadows.sm,
      }}
    >
      {/* Logo & Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.lg,
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.md,
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
              borderRadius: theme.radius.md,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: theme.typography.fontWeight.bold,
              fontSize: theme.typography.fontSize.lg,
              boxShadow: theme.shadows.md,
            }}
          >
            ◆
          </div>
          <span
            style={{
              fontFamily: theme.typography.fontFamily.display,
              fontWeight: theme.typography.fontWeight.bold,
              fontSize: theme.typography.fontSize.lg,
              color: theme.colors.text,
              letterSpacing: '-0.5px',
            }}
          >
            HMSCC
          </span>
        </Link>

        {/* Navigation Links */}
        <div
          style={{
            display: 'flex',
            gap: theme.spacing.lg,
            marginLeft: theme.spacing.xl,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                textDecoration: 'none',
                color: isActive(link.path)
                  ? theme.colors.primary
                  : theme.colors.textSecondary,
                fontWeight: isActive(link.path)
                  ? theme.typography.fontWeight.semibold
                  : theme.typography.fontWeight.normal,
                fontSize: theme.typography.fontSize.base,
                padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                borderBottom: isActive(link.path)
                  ? `2px solid ${theme.colors.primary}`
                  : 'none',
                transition: `all ${theme.transitions.fast}`,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.path)) {
                  e.target.style.color = theme.colors.text
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.path)) {
                  e.target.style.color = theme.colors.textSecondary
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        style={{
          background: 'none',
          border: `1px solid ${theme.colors.border}`,
          color: theme.colors.text,
          width: '36px',
          height: '36px',
          borderRadius: theme.radius.md,
          cursor: 'pointer',
          fontSize: theme.typography.fontSize.lg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: `all ${theme.transitions.fast}`,
          fontWeight: 'bold',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = theme.colors.surfaceHover
          e.target.style.color = theme.colors.primary
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'none'
          e.target.style.color = theme.colors.text
        }}
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        {isDark ? '☀️' : '🌙'}
      </button>
    </nav>
  )
}

export default NavigationBar
