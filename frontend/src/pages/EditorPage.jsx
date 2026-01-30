import React, { useState, useContext } from 'react'
import { ThemeContext } from '../themes/ThemeProvider'
import AdvancedEditor from '../components/AdvancedEditor'
import OutputPanel from '../components/OutputPanel'
import StatusBar from '../components/StatusBar'
import { compileCode } from '../services/api'

function EditorPage() {
  const { theme } = useContext(ThemeContext)
  const [code, setCode] = useState(
`power arena() {
  speak("Hello, HMSCC!");
  sendback 0;
}`
  )

  const [output, setOutput] = useState('')
  const [errors, setErrors] = useState('')
  const [generatedC, setGeneratedC] = useState('')
  const [loading, setLoading] = useState(false)
  const [cursorPos, setCursorPos] = useState({ line: 1, column: 1 })
  const [dividerPos, setDividerPos] = useState(50) // 50% split

  async function handleCompile() {
    setLoading(true)
    setOutput('')
    setErrors('')
    setGeneratedC('')

    try {
      const result = await compileCode(code)
      console.log('Compilation result:', result)

      // Extract results from new response format
      setOutput(result.output || '')
      setErrors(result.errors || '')
      setGeneratedC(result.generatedC || '')

      // Log status
      if (result.success) {
        console.log('✅ Compilation successful')
      } else {
        console.log('❌ Compilation failed:', result.errors)
      }
    } catch (err) {
      console.error('Compile error:', err)
      setErrors(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: theme.colors.background,
        overflow: 'hidden',
      }}
    >
      {/* Main Editor & Output Split */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
          gap: theme.spacing.md,
          padding: theme.spacing.md,
        }}
      >
        {/* Editor Panel */}
        <div
          style={{
            flex: `0 0 ${dividerPos}%`,
            display: 'flex',
            flexDirection: 'column',
            background: theme.colors.surface,
            borderRadius: theme.radius.lg,
            overflow: 'hidden',
            boxShadow: theme.shadows.md,
          }}
        >
          <div
            style={{
              padding: theme.spacing.md,
              borderBottom: `1px solid ${theme.colors.border}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: theme.colors.surfaceHover,
            }}
          >
            <span
              style={{
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text,
                fontSize: theme.typography.fontSize.sm,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              HMSCC Source
            </span>
            <button
              onClick={handleCompile}
              disabled={loading}
              style={{
                padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                background: loading ? theme.colors.secondary : theme.colors.primary,
                color: '#fff',
                border: 'none',
                borderRadius: theme.radius.md,
                fontFamily: theme.typography.fontFamily.mono,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: `all ${theme.transitions.fast}`,
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.background = theme.colors.primaryDark
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = theme.shadows.md
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.background = theme.colors.primary
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }
              }}
            >
              {loading ? 'Compiling...' : '▶ Compile'}
            </button>
          </div>

          <AdvancedEditor
            code={code}
            setCode={setCode}
            cursorPos={cursorPos}
            setCursorPos={setCursorPos}
            errors={errors}
          />
        </div>

        {/* Divider */}
        <div
          onMouseDown={(e) => {
            e.preventDefault()
            const startX = e.clientX
            const startPos = dividerPos

            const handleMouseMove = (moveEvent) => {
              const deltaX = moveEvent.clientX - startX
              const container = moveEvent.target.parentElement
              const containerWidth = container.offsetWidth
              const newPos = startPos + (deltaX / containerWidth) * 100
              setDividerPos(Math.max(30, Math.min(70, newPos)))
            }

            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove)
              document.removeEventListener('mouseup', handleMouseUp)
            }

            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
          }}
          style={{
            width: '6px',
            background: theme.colors.border,
            cursor: 'col-resize',
            transition: `background ${theme.transitions.fast}`,
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.target.style.background = theme.colors.primary
          }}
          onMouseLeave={(e) => {
            e.target.style.background = theme.colors.border
          }}
        />

        {/* Output Panel */}
        <div
          style={{
            flex: `0 0 ${100 - dividerPos}%`,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <OutputPanel
            output={output}
            errors={errors}
            generatedC={generatedC}
            theme={theme}
          />
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar line={cursorPos.line} column={cursorPos.column} mode="HMSCC" />
    </div>
  )
}

export default EditorPage
