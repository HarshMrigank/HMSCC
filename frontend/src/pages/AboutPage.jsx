import React, { useContext } from 'react'
import { ThemeContext } from '../themes/ThemeProvider'

function AboutPage() {
  const { theme } = useContext(ThemeContext)

  const traits = [
    { emoji: '♞', label: 'Competitive', description: 'Chess & gaming mindset — strategic problem-solving' },
    { emoji: '🎵', label: 'Creative', description: 'Music, cooking, problem-solving — artistic approach' },
    { emoji: '⚡', label: 'Bold & Rebellious', description: 'Confidence in doing things differently' },
    { emoji: '⚙️', label: 'Precision-Focused', description: 'Engineering mindset — correctness matters' },
    { emoji: '✨', label: 'Minimal but Powerful', description: 'Every line serves a purpose' },
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
          <div
            style={{
              width: '100px',
              height: '100px',
              background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
              borderRadius: theme.radius.lg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              marginBottom: theme.spacing.xl,
              boxShadow: theme.shadows.lg,
            }}
          >
            ◆
          </div>
          <h1
            style={{
              fontSize: theme.typography.fontSize['4xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.primary,
              marginBottom: theme.spacing.md,
              letterSpacing: '-1px',
            }}
          >
            About HMSCC
          </h1>
          <p
            style={{
              fontSize: theme.typography.fontSize.lg,
              color: theme.colors.textSecondary,
              lineHeight: theme.typography.lineHeight.relaxed,
            }}
          >
            HMSCC is a from-scratch compiler built as a final-year engineering project, demonstrating deep understanding of compiler design and systems architecture.
          </p>
        </div>

        {/* What is HMSCC */}
        <section style={{ marginBottom: theme.spacing['2xl'] }}>
          <h2
            style={{
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
              marginBottom: theme.spacing.lg,
              borderBottom: `2px solid ${theme.colors.primary}`,
              paddingBottom: theme.spacing.md,
            }}
          >
            What is HMSCC?
          </h2>
          <div
            style={{
              display: 'grid',
              gap: theme.spacing.lg,
            }}
          >
            <div
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
                }}
              >
                🎯 The Goal
              </h3>
              <p
                style={{
                  color: theme.colors.text,
                  lineHeight: theme.typography.lineHeight.relaxed,
                  fontSize: theme.typography.fontSize.base,
                }}
              >
                HMSCC is a proof of concept: a complete, from-scratch compiler system that demonstrates mastery of compiler internals, systems-level programming, and modern deployment practices. It's not meant to compete with GCC or Clang — it's meant to show I understand <strong>how they work</strong>.
              </p>
            </div>

            <div
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
                }}
              >
                📚 The Architecture
              </h3>
              <div
                style={{
                  color: theme.colors.text,
                  fontSize: theme.typography.fontSize.base,
                  lineHeight: theme.typography.lineHeight.relaxed,
                }}
              >
                <p style={{ marginBottom: theme.spacing.md }}>
                  <strong>Compiler (C++)</strong>: Custom lexer, parser, AST builder, semantic analyzer, and code generator. Targets C output.
                </p>
                <p style={{ marginBottom: theme.spacing.md }}>
                  <strong>Backend (Node.js)</strong>: REST API for secure compilation, execution, and result delivery.
                </p>
                <p>
                  <strong>Frontend (React)</strong>: Modern web UI with VS Code–like editor, theme system, and documentation.
                </p>
              </div>
            </div>

            <div
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
                }}
              >
                🎨 Custom Language Design
              </h3>
              <p
                style={{
                  color: theme.colors.text,
                  lineHeight: theme.typography.lineHeight.relaxed,
                  fontSize: theme.typography.fontSize.base,
                }}
              >
                HMSCC uses a custom C-like language with playful keywords (e.g., <code style={{ background: theme.colors.background, padding: '2px 6px', borderRadius: theme.radius.sm, fontFamily: theme.typography.fontFamily.mono }}>power</code> for <code style={{ background: theme.colors.background, padding: '2px 6px', borderRadius: theme.radius.sm, fontFamily: theme.typography.fontFamily.mono }}>int</code>, <code style={{ background: theme.colors.background, padding: '2px 6px', borderRadius: theme.radius.sm, fontFamily: theme.typography.fontFamily.mono }}>think</code> for <code style={{ background: theme.colors.background, padding: '2px 6px', borderRadius: theme.radius.sm, fontFamily: theme.typography.fontFamily.mono }}>if</code>) that reflect personality and creativity while maintaining strict, correct compiler behavior.
              </p>
            </div>
          </div>
        </section>

        {/* Personality */}
        <section style={{ marginBottom: theme.spacing['2xl'] }}>
          <h2
            style={{
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
              marginBottom: theme.spacing.lg,
              borderBottom: `2px solid ${theme.colors.accent}`,
              paddingBottom: theme.spacing.md,
            }}
          >
            This Tool Reflects My Personality
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: theme.spacing.lg,
            }}
          >
            {traits.map((trait) => (
              <div
                key={trait.label}
                style={{
                  background: theme.colors.surface,
                  padding: theme.spacing.lg,
                  borderRadius: theme.radius.lg,
                  boxShadow: theme.shadows.md,
                  borderLeft: `4px solid ${theme.colors.primary}`,
                  transition: `all ${theme.transitions.normal}`,
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = theme.shadows.lg
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = theme.shadows.md
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: theme.spacing.md }}>
                  {trait.emoji}
                </div>
                <h3
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.primary,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  {trait.label}
                </h3>
                <p
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.textSecondary,
                    lineHeight: theme.typography.lineHeight.relaxed,
                  }}
                >
                  {trait.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section style={{ marginBottom: theme.spacing['2xl'] }}>
          <h2
            style={{
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
              marginBottom: theme.spacing.lg,
              borderBottom: `2px solid ${theme.colors.secondary}`,
              paddingBottom: theme.spacing.md,
            }}
          >
            Technology Stack
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: theme.spacing.lg,
            }}
          >
            {[
              { name: 'Compiler', items: ['C++', 'CMake', 'Native Binary'] },
              { name: 'Backend', items: ['Node.js', 'Express', 'REST API'] },
              { name: 'Frontend', items: ['React 19', 'CodeMirror 6', 'Custom Theme System'] },
              { name: 'Deployment', items: ['Docker', 'Production Server', 'HTTPS'] },
            ].map((stack) => (
              <div
                key={stack.name}
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
                  }}
                >
                  {stack.name}
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                  }}
                >
                  {stack.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        color: theme.colors.text,
                        fontSize: theme.typography.fontSize.sm,
                        marginBottom: theme.spacing.sm,
                        paddingLeft: theme.spacing.md,
                        borderLeft: `2px solid ${theme.colors.accent}`,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Vision */}
        <section>
          <div
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary}33 0%, ${theme.colors.accent}33 100%)`,
              padding: theme.spacing.xl,
              borderRadius: theme.radius.lg,
              borderLeft: `4px solid ${theme.colors.primary}`,
            }}
          >
            <h2
              style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.primary,
                marginBottom: theme.spacing.lg,
              }}
            >
              The Vision
            </h2>
            <p
              style={{
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.text,
                lineHeight: theme.typography.lineHeight.relaxed,
                marginBottom: theme.spacing.md,
              }}
            >
              HMSCC demonstrates that great engineering doesn't require compromise between precision and personality. You can build something that is:
            </p>
            <ul
              style={{
                color: theme.colors.text,
                fontSize: theme.typography.fontSize.base,
                lineHeight: theme.typography.lineHeight.relaxed,
                paddingLeft: theme.spacing.xl,
              }}
            >
              <li>✓ Technically rigorous and correct</li>
              <li>✓ Artistically expressed and unique</li>
              <li>✓ Professionally polished and deployable</li>
              <li>✓ Personally meaningful and memorable</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
