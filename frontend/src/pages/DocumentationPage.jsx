import React, { useContext, useState } from 'react'
import { ThemeContext } from '../themes/ThemeProvider'
import { languageSpec } from '../config/languageSpec'

function DocumentationPage() {
  const { theme } = useContext(ThemeContext)
  const [expandedSection, setExpandedSection] = useState('philosophy')

  const sections = [
    { id: 'philosophy', title: '📖 Language Philosophy' },
    { id: 'keywords', title: '🔑 Keyword Transformations' },
    { id: 'syntax', title: '📝 Syntax Rules' },
    { id: 'examples', title: '💡 Example Programs' },
    { id: 'builtins', title: '⚙️ Built-in Functions' },
  ]

  return (
    <div
      style={{
        flex: 1,
        overflow: 'auto',
        padding: `${theme.spacing.xl} ${theme.spacing.xl}`,
        background: theme.colors.background,
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: theme.spacing['2xl'] }}>
          <h1
            style={{
              fontSize: theme.typography.fontSize['4xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.primary,
              marginBottom: theme.spacing.lg,
              letterSpacing: '-1px',
            }}
          >
            HMSCC Language Guide
          </h1>
          <p
            style={{
              fontSize: theme.typography.fontSize.lg,
              color: theme.colors.textSecondary,
              lineHeight: theme.typography.lineHeight.relaxed,
            }}
          >
            Welcome to HMSCC — a playful, personality-driven C-like compiler. This guide explains the custom language syntax and how to write programs.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: theme.spacing.md,
            marginBottom: theme.spacing.xl,
            flexWrap: 'wrap',
            borderBottom: `2px solid ${theme.colors.border}`,
            paddingBottom: theme.spacing.md,
          }}
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setExpandedSection(section.id)}
              style={{
                padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                background: expandedSection === section.id ? theme.colors.primary : 'transparent',
                color: expandedSection === section.id ? '#fff' : theme.colors.textSecondary,
                border: 'none',
                borderRadius: theme.radius.md,
                cursor: 'pointer',
                fontWeight: expandedSection === section.id ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.normal,
                fontSize: theme.typography.fontSize.base,
                transition: `all ${theme.transitions.fast}`,
              }}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Philosophy */}
        {expandedSection === 'philosophy' && (
          <div style={{ marginBottom: theme.spacing['2xl'] }}>
            <h2
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text,
                marginBottom: theme.spacing.lg,
              }}
            >
              📖 Language Philosophy
            </h2>
            <div
              style={{
                background: theme.colors.surface,
                padding: theme.spacing.lg,
                borderRadius: theme.radius.lg,
                borderLeft: `4px solid ${theme.colors.primary}`,
                boxShadow: theme.shadows.md,
              }}
            >
              <p
                style={{
                  fontSize: theme.typography.fontSize.base,
                  lineHeight: theme.typography.lineHeight.relaxed,
                  color: theme.colors.text,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {languageSpec.philosophy}
              </p>
              <div
                style={{
                  marginTop: theme.spacing.lg,
                  paddingTop: theme.spacing.lg,
                  borderTop: `1px solid ${theme.colors.border}`,
                }}
              >
                <h3
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.accent,
                    marginBottom: theme.spacing.md,
                  }}
                >
                  Why Custom Keywords?
                </h3>
                <ul
                  style={{
                    color: theme.colors.textSecondary,
                    paddingLeft: theme.spacing.xl,
                    lineHeight: theme.typography.lineHeight.relaxed,
                  }}
                >
                  <li>Reflect personal style and engineering philosophy</li>
                  <li>Make code more expressive and memorable</li>
                  <li>Demonstrate compiler independence from syntax</li>
                  <li>Create a unique learning experience</li>
                  <li>Build a tool that feels truly personal</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Keywords */}
        {expandedSection === 'keywords' && (
          <div style={{ marginBottom: theme.spacing['2xl'] }}>
            <h2
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text,
                marginBottom: theme.spacing.lg,
              }}
            >
              🔑 Keyword Transformations
            </h2>
            <div
              style={{
                overflowX: 'auto',
                boxShadow: theme.shadows.md,
                borderRadius: theme.radius.lg,
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  background: theme.colors.surface,
                }}
              >
                <thead>
                  <tr style={{ background: theme.colors.primary }}>
                    <th
                      style={{
                        padding: theme.spacing.lg,
                        color: '#fff',
                        textAlign: 'left',
                        fontWeight: theme.typography.fontWeight.bold,
                        fontSize: theme.typography.fontSize.base,
                      }}
                    >
                      Standard C
                    </th>
                    <th
                      style={{
                        padding: theme.spacing.lg,
                        color: '#fff',
                        textAlign: 'left',
                        fontWeight: theme.typography.fontWeight.bold,
                        fontSize: theme.typography.fontSize.base,
                      }}
                    >
                      HMSCC Keyword
                    </th>
                    <th
                      style={{
                        padding: theme.spacing.lg,
                        color: '#fff',
                        textAlign: 'left',
                        fontWeight: theme.typography.fontWeight.bold,
                        fontSize: theme.typography.fontSize.base,
                      }}
                    >
                      Meaning & Use
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(languageSpec.keywords).map(([stdC, data], idx) => (
                    <tr
                      key={stdC}
                      style={{
                        background: idx % 2 === 0 ? theme.colors.background : theme.colors.surface,
                        borderBottom: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      <td
                        style={{
                          padding: theme.spacing.lg,
                          fontFamily: theme.typography.fontFamily.mono,
                          fontWeight: theme.typography.fontWeight.semibold,
                          color: theme.colors.secondary,
                          fontSize: theme.typography.fontSize.sm,
                        }}
                      >
                        {stdC}
                      </td>
                      <td
                        style={{
                          padding: theme.spacing.lg,
                          fontFamily: theme.typography.fontFamily.mono,
                          fontWeight: theme.typography.fontWeight.semibold,
                          color: theme.colors.primary,
                          fontSize: theme.typography.fontSize.sm,
                        }}
                      >
                        {data.replacement}
                      </td>
                      <td
                        style={{
                          padding: theme.spacing.lg,
                          color: theme.colors.text,
                          fontSize: theme.typography.fontSize.sm,
                        }}
                      >
                        <div>{data.meaning}</div>
                        <code
                          style={{
                            display: 'inline-block',
                            marginTop: theme.spacing.sm,
                            background: theme.colors.background,
                            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                            borderRadius: theme.radius.sm,
                            fontFamily: theme.typography.fontFamily.mono,
                            color: theme.colors.accent,
                            fontSize: theme.typography.fontSize.xs,
                          }}
                        >
                          {data.example}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Syntax Rules */}
        {expandedSection === 'syntax' && (
          <div style={{ marginBottom: theme.spacing['2xl'] }}>
            <h2
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text,
                marginBottom: theme.spacing.lg,
              }}
            >
              📝 Syntax Rules
            </h2>

            <div style={{ display: 'grid', gap: theme.spacing.lg }}>
              {Object.entries(languageSpec.syntax).map(([rule, description]) => (
                <div
                  key={rule}
                  style={{
                    background: theme.colors.surface,
                    padding: theme.spacing.lg,
                    borderRadius: theme.radius.lg,
                    boxShadow: theme.shadows.md,
                  }}
                >
                  <h3
                    style={{
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.primary,
                      marginBottom: theme.spacing.md,
                      textTransform: 'capitalize',
                    }}
                  >
                    {rule.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <p
                    style={{
                      color: theme.colors.text,
                      fontSize: theme.typography.fontSize.base,
                      lineHeight: theme.typography.lineHeight.relaxed,
                    }}
                  >
                    {description}
                  </p>
                </div>
              ))}
            </div>

            {/* Data Types */}
            <div
              style={{
                marginTop: theme.spacing.xl,
                background: theme.colors.surface,
                padding: theme.spacing.lg,
                borderRadius: theme.radius.lg,
                boxShadow: theme.shadows.md,
              }}
            >
              <h3
                style={{
                  fontSize: theme.typography.fontSize.lg,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.primary,
                  marginBottom: theme.spacing.lg,
                }}
              >
                Available Data Types
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: theme.spacing.lg,
                }}
              >
                {languageSpec.types.map((type) => (
                  <div
                    key={type.hmscc}
                    style={{
                      background: theme.colors.background,
                      padding: theme.spacing.lg,
                      borderRadius: theme.radius.md,
                      borderLeft: `3px solid ${theme.colors.accent}`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: theme.typography.fontFamily.mono,
                        fontWeight: theme.typography.fontWeight.bold,
                        color: theme.colors.primary,
                        marginBottom: theme.spacing.sm,
                        fontSize: theme.typography.fontSize.base,
                      }}
                    >
                      {type.hmscc}
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.xs,
                        color: theme.colors.textSecondary,
                        marginBottom: theme.spacing.sm,
                      }}
                    >
                      → {type.c}
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text,
                      }}
                    >
                      {type.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Examples */}
        {expandedSection === 'examples' && (
          <div style={{ marginBottom: theme.spacing['2xl'] }}>
            <h2
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text,
                marginBottom: theme.spacing.lg,
              }}
            >
              💡 Example Programs
            </h2>

            <div style={{ display: 'grid', gap: theme.spacing.xl }}>
              {languageSpec.examples.map((example) => (
                <div
                  key={example.title}
                  style={{
                    background: theme.colors.surface,
                    padding: theme.spacing.lg,
                    borderRadius: theme.radius.lg,
                    boxShadow: theme.shadows.md,
                  }}
                >
                  <h3
                    style={{
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.primary,
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    {example.title}
                  </h3>
                  <p
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.textSecondary,
                      marginBottom: theme.spacing.lg,
                    }}
                  >
                    {example.description}
                  </p>
                  <pre
                    style={{
                      background: theme.colors.background,
                      padding: theme.spacing.lg,
                      borderRadius: theme.radius.md,
                      overflow: 'auto',
                      fontFamily: theme.typography.fontFamily.mono,
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text,
                      lineHeight: theme.typography.lineHeight.relaxed,
                    }}
                  >
                    {example.code}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Built-ins */}
        {expandedSection === 'builtins' && (
          <div style={{ marginBottom: theme.spacing['2xl'] }}>
            <h2
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text,
                marginBottom: theme.spacing.lg,
              }}
            >
              ⚙️ Built-in Functions
            </h2>

            <div style={{ display: 'grid', gap: theme.spacing.lg }}>
              {languageSpec.builtins.map((builtin) => (
                <div
                  key={builtin.hmscc}
                  style={{
                    background: theme.colors.surface,
                    padding: theme.spacing.lg,
                    borderRadius: theme.radius.lg,
                    boxShadow: theme.shadows.md,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: theme.spacing.lg,
                      alignItems: 'start',
                      marginBottom: theme.spacing.lg,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: theme.typography.fontFamily.mono,
                        fontWeight: theme.typography.fontWeight.bold,
                        fontSize: theme.typography.fontSize.base,
                        color: theme.colors.primary,
                        minWidth: '80px',
                      }}
                    >
                      {builtin.hmscc}()
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.textSecondary,
                          fontFamily: theme.typography.fontFamily.mono,
                          marginBottom: theme.spacing.sm,
                        }}
                      >
                        {builtin.signature}
                      </div>
                      <div
                        style={{
                          fontSize: theme.typography.fontSize.base,
                          color: theme.colors.text,
                        }}
                      >
                        {builtin.description}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      paddingTop: theme.spacing.lg,
                      borderTop: `1px solid ${theme.colors.border}`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: theme.colors.accent,
                        marginBottom: theme.spacing.md,
                      }}
                    >
                      Examples:
                    </div>
                    {builtin.examples.map((ex, idx) => (
                      <code
                        key={idx}
                        style={{
                          display: 'block',
                          background: theme.colors.background,
                          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                          borderRadius: theme.radius.sm,
                          fontFamily: theme.typography.fontFamily.mono,
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.syntax.string,
                          marginBottom: theme.spacing.sm,
                        }}
                      >
                        {ex}
                      </code>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentationPage
