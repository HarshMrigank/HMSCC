import React, { useContext } from 'react'
import { ThemeContext } from '../themes/ThemeProvider'

function StatusBar({ line, column, mode }) {
  const { theme } = useContext(ThemeContext)

  return (
    <div
      style={{
        background: theme.colors.surfaceHover,
        borderTop: `1px solid ${theme.colors.border}`,
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.textSecondary,
        fontFamily: theme.typography.fontFamily.mono,
        height: '28px',
        boxShadow: theme.shadows.xs,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: theme.spacing.xl,
        }}
      >
        <div>Ln {line}, Col {column}</div>
        <div style={{ color: theme.colors.accent, fontWeight: 'bold' }}>
          {mode}
        </div>
      </div>
      <div style={{ color: theme.colors.textTertiary }}>
        Ready
      </div>
    </div>
  )
}

export default StatusBar
