import React, { useContext, useState } from 'react'
import { ThemeContext } from '../themes/ThemeProvider'
import { getErrorStats } from '../utils/errorDiagnostics'

function TabButton({ label, active, onClick, theme }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        background: active ? theme.colors.primary : 'transparent',
        color: active ? '#fff' : theme.colors.textSecondary,
        border: 'none',
        borderRadius: `${theme.radius.md} ${theme.radius.md} 0 0`,
        cursor: 'pointer',
        fontWeight: active ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.normal,
        fontSize: theme.typography.fontSize.sm,
        transition: `all ${theme.transitions.fast}`,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.target.style.background = theme.colors.surfaceHover
          e.target.style.color = theme.colors.text
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.target.style.background = 'transparent'
          e.target.style.color = theme.colors.textSecondary
        }
      }}
    >
      {label}
    </button>
  )
}

function OutputPanel({ output, errors, generatedC }) {
  const { theme } = useContext(ThemeContext)
  const [activeTab, setActiveTab] = useState('output')

  const tabs = [
    { id: 'output', label: 'Output', icon: '▶' },
    { id: 'errors', label: 'Errors', icon: '⚠' },
    { id: 'generated', label: 'Generated C', icon: '{' },
  ]

  const hasErrors = errors && errors.trim() !== ''
  
  // Parse error details for better display
  const errorLines = hasErrors ? errors.split('\n').filter(line => line.trim()) : []
  const errorStats = hasErrors ? getErrorStats(
    errorLines.map((line, idx) => ({
      severity: line.toLowerCase().includes('warning') ? 'warning' : 'error',
      message: line
    }))
  ) : { total: 0, errors: 0, warnings: 0, info: 0 }

  return (
    <div
      style={{
        background: theme.colors.surface,
        borderRadius: theme.radius.lg,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: theme.shadows.md,
        height: '100%',
      }}
    >
      {/* Tab Bar */}
      <div
        style={{
          display: 'flex',
          borderBottom: `1px solid ${theme.colors.border}`,
          background: theme.colors.surfaceHover,
          padding: `0 ${theme.spacing.md}`,
        }}
      >
        {tabs.map((tab) => (
          <div key={tab.id} style={{ position: 'relative' }}>
            <TabButton
              label={`${tab.icon} ${tab.label}`}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              theme={theme}
            />
            {tab.id === 'errors' && hasErrors && (
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  background: theme.colors.error,
                  color: '#fff',
                  borderRadius: theme.radius.full,
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: theme.typography.fontSize.xs,
                  fontWeight: theme.typography.fontWeight.bold,
                }}
              >
                {errorStats.total}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          fontFamily: theme.typography.fontFamily.mono,
          fontSize: theme.typography.fontSize.sm,
          padding: theme.spacing.lg,
        }}
      >
        {activeTab === 'output' && (
          <pre
            style={{
              color: theme.colors.success,
              backgroundColor: theme.colors.background,
              padding: theme.spacing.md,
              borderRadius: theme.radius.md,
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              lineHeight: theme.typography.lineHeight.relaxed,
            }}
          >
            {output || '(No output yet)'}
          </pre>
        )}

        {activeTab === 'errors' && (
          <div
            style={{
              color: hasErrors ? theme.colors.error : theme.colors.textSecondary,
              backgroundColor: theme.colors.background,
              padding: theme.spacing.md,
              borderRadius: theme.radius.md,
              margin: 0,
              fontSize: theme.typography.fontSize.sm,
              lineHeight: theme.typography.lineHeight.relaxed,
            }}
          >
            {hasErrors ? (
              <div>
                {/* Error summary */}
                <div
                  style={{
                    marginBottom: theme.spacing.md,
                    paddingBottom: theme.spacing.md,
                    borderBottom: `1px solid ${theme.colors.border}`,
                    fontSize: theme.typography.fontSize.xs,
                    color: theme.colors.textSecondary,
                  }}
                >
                  <span style={{ color: theme.colors.error, fontWeight: 'bold' }}>
                    {errorStats.errors} error{errorStats.errors !== 1 ? 's' : ''}
                  </span>
                  {errorStats.warnings > 0 && (
                    <span style={{ marginLeft: theme.spacing.md, color: theme.colors.warning }}>
                      {errorStats.warnings} warning{errorStats.warnings !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                
                {/* Error list */}
                <div style={{ fontFamily: theme.typography.fontFamily.mono }}>
                  {errorLines.map((line, idx) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom: theme.spacing.sm,
                        paddingLeft: theme.spacing.md,
                        borderLeft: `2px solid ${
                          line.toLowerCase().includes('warning') 
                            ? theme.colors.warning 
                            : theme.colors.error
                        }`,
                        color: line.toLowerCase().includes('warning')
                          ? theme.colors.warning
                          : theme.colors.error,
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <span style={{ color: theme.colors.textSecondary }}>
                (No errors)
              </span>
            )}
          </div>
        )}

        {activeTab === 'generated' && (
          <pre
            style={{
              color: theme.colors.syntax.string,
              backgroundColor: theme.colors.background,
              padding: theme.spacing.md,
              borderRadius: theme.radius.md,
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              lineHeight: theme.typography.lineHeight.relaxed,
            }}
          >
            {generatedC || '(Not generated yet)'}
          </pre>
        )}
      </div>
    </div>
  )
}

export default OutputPanel
