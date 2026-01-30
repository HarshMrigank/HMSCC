import React, { useContext } from 'react'
import { ThemeContext } from '../themes/ThemeProvider'

function HelpPage() {
  const { theme } = useContext(ThemeContext)

  const sections = [
    {
      title: 'Getting Started',
      items: [
        {
          question: 'How do I write my first HMSCC program?',
          answer: 'Start with the hello world example in the Documentation page. The basic structure is:\n\npower arena() {\n  speak("Hello!");\n  sendback 0;\n}\n\nEvery program must have an arena() function — it\'s the entry point, like main() in C.',
        },
        {
          question: 'What\'s the difference between this and real C?',
          answer: 'HMSCC is a simplified C-like language. The main differences:\n\n• Keywords are custom (power, think, speak, etc.)\n• Only supports int, float, char, and string types\n• Limited control flow (if/else, while, for)\n• Simpler syntax for readability\n• Strict type checking and semantic analysis',
        },
        {
          question: 'How do I compile and run code?',
          answer: 'Type or paste your HMSCC code in the editor and click the "Compile" button (or press Ctrl+Enter). The output panel shows:\n\n• Output: What your program printed\n• Errors: Any syntax or runtime errors\n• Generated C: The equivalent C code the compiler produced',
        },
      ],
    },
    {
      title: 'Keyboard Shortcuts',
      items: [
        {
          question: 'What keyboard shortcuts are available?',
          answer: 'Ctrl+Enter: Compile and run code\nCtrl+S: Save (local browser storage)\nCtrl+/: Toggle line comment\nTab / Shift+Tab: Indent / Dedent\nCtrl+F: Search in editor\nCtrl+H: Find and replace',
        },
        {
          question: 'How do I use the editor efficiently?',
          answer: '• Use line numbers for quick navigation\n• Hover over errors for detailed messages\n• Use syntax highlighting to spot mistakes\n• Resize panels by dragging the divider\n• Use the theme toggle for comfortable viewing\n• Check the status bar for cursor position',
        },
      ],
    },
    {
      title: 'Language Features',
      items: [
        {
          question: 'What variables can I declare?',
          answer: 'power x = 10;      // Integer\nflow y = 3.14;     // Float\nnote c = "A";      // Character\ntext msg = "Hi";   // String\nsolid MAX = 100;   // Constant\nlocked power counter = 0; // Static',
        },
        {
          question: 'How do I use if/else?',
          answer: 'think(x > 5) {\n  speak("x is greater than 5");\n} otherwise think(x < 5) {\n  speak("x is less than 5");\n} otherwise {\n  speak("x equals 5");\n}',
        },
        {
          question: 'How do I use loops?',
          answer: '// For loop (counted)\ngrind(power i = 0; i < 10; i++) {\n  speak(i);\n}\n\n// While loop (conditional)\nrepeat(x > 0) {\n  speak(x);\n  x = x - 1;\n}',
        },
        {
          question: 'How do I write functions?',
          answer: 'power add(power a, power b) {\n  sendback a + b;  // Return value\n}\n\nsilent greet(text name) {\n  speak("Hello, ", name);\n  // No return needed\n}',
        },
      ],
    },
    {
      title: 'Common Errors',
      items: [
        {
          question: 'What does "undefined variable" mean?',
          answer: 'You\'re using a variable that hasn\'t been declared yet. Make sure to declare it with its type first:\n\npower x = 10;  // Declare\nspeak(x);      // Use',
        },
        {
          question: 'What does "type mismatch" mean?',
          answer: 'You\'re trying to assign a value of the wrong type to a variable. Example:\n\npower x = 10;   // x is power (integer)\nx = "hello";    // ERROR: "hello" is text, not power\n\nMake sure types match!',
        },
        {
          question: 'What does "duplicate definition" mean?',
          answer: 'You\'ve declared the same variable twice:\n\npower x = 10;\npower x = 20;  // ERROR: x already exists\n\nChange the second declaration to an assignment:\n\nx = 20;  // OK',
        },
        {
          question: 'The program runs but has wrong output. How do I debug?',
          answer: 'Use speak() statements to print values:\n\npower x = 10;\nspeak("x = ", x);  // Inspect variable\n\nCheck the order of operations. Look at the generated C code in the "Generated C" tab to see what the compiler produced.',
        },
      ],
    },
    {
      title: 'Tips & Tricks',
      items: [
        {
          question: 'How can I make my code faster to write?',
          answer: '• Use the template code (Hello World) as a starter\n• Copy-paste examples from Documentation\n• Use bracket matching and auto-indent\n• Learn the custom keywords by heart: power, think, speak, repeat, grind\n• The theme system helps prevent eye strain during long coding sessions',
        },
        {
          question: 'Can I use the light/dark theme?',
          answer: 'Yes! Click the 🌙/☀️ button in the top-right to toggle between light and dark modes. Your preference is saved automatically.',
        },
        {
          question: 'How accurate is the generated C code?',
          answer: 'The generated C code is designed to be readable and correct, not optimized. You can use it as a learning tool to understand what HMSCC code means in real C.',
        },
      ],
    },
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
            Help & FAQ
          </h1>
          <p
            style={{
              fontSize: theme.typography.fontSize.lg,
              color: theme.colors.textSecondary,
              lineHeight: theme.typography.lineHeight.relaxed,
            }}
          >
            Everything you need to know about using HMSCC. Can't find the answer? Check the Documentation page for a complete language reference.
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: 'grid', gap: theme.spacing['2xl'] }}>
          {sections.map((section) => (
            <section key={section.title}>
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
                {section.title}
              </h2>

              <div style={{ display: 'grid', gap: theme.spacing.lg }}>
                {section.items.map((item, idx) => (
                  <details
                    key={idx}
                    style={{
                      background: theme.colors.surface,
                      padding: theme.spacing.lg,
                      borderRadius: theme.radius.lg,
                      boxShadow: theme.shadows.md,
                      cursor: 'pointer',
                    }}
                  >
                    <summary
                      style={{
                        fontSize: theme.typography.fontSize.base,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: theme.colors.primary,
                        userSelect: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span>{item.question}</span>
                      <span style={{ fontSize: theme.typography.fontSize.lg }}>▼</span>
                    </summary>

                    <div
                      style={{
                        marginTop: theme.spacing.lg,
                        paddingTop: theme.spacing.lg,
                        borderTop: `1px solid ${theme.colors.border}`,
                        color: theme.colors.text,
                        fontSize: theme.typography.fontSize.base,
                        lineHeight: theme.typography.lineHeight.relaxed,
                        whiteSpace: 'pre-wrap',
                        fontFamily: item.answer.includes('power') || item.answer.includes('(') ? theme.typography.fontFamily.mono : 'inherit',
                      }}
                    >
                      {item.answer.includes('(') ? (
                        <div>
                          {item.answer.split('\n\n').map((paragraph, pidx) => (
                            <div
                              key={pidx}
                              style={{
                                marginBottom: theme.spacing.md,
                                fontFamily: paragraph.includes('(') ? theme.typography.fontFamily.mono : 'inherit',
                                background: paragraph.includes('(') ? theme.colors.background : 'transparent',
                                padding: paragraph.includes('(') ? theme.spacing.md : '0',
                                borderRadius: paragraph.includes('(') ? theme.radius.md : '0',
                                overflow: 'auto',
                              }}
                            >
                              {paragraph}
                            </div>
                          ))}
                        </div>
                      ) : (
                        item.answer
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: theme.spacing['2xl'],
            padding: theme.spacing.xl,
            background: `linear-gradient(135deg, ${theme.colors.primary}33 0%, ${theme.colors.accent}33 100%)`,
            borderRadius: theme.radius.lg,
            borderLeft: `4px solid ${theme.colors.primary}`,
            textAlign: 'center',
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
            Ready to start coding?
          </h3>
          <p
            style={{
              fontSize: theme.typography.fontSize.base,
              color: theme.colors.text,
              marginBottom: theme.spacing.lg,
              lineHeight: theme.typography.lineHeight.relaxed,
            }}
          >
            Head to the <strong>Editor</strong> and write your first HMSCC program. Start with the Hello World example, then explore the language with examples from the <strong>Documentation</strong>.
          </p>
          <p
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.textSecondary,
            }}
          >
            Questions? Check the Documentation for a complete language reference.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HelpPage
