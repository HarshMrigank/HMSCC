import React, { useContext, useEffect, useRef } from 'react'
import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { syntaxHighlighting, defaultHighlightStyle, indentOnInput } from '@codemirror/language'
import { bracketMatching, indentUnit } from '@codemirror/language'
import { keymap } from '@codemirror/view'
import { defaultKeymap, indentMore, indentLess } from '@codemirror/commands'
import { linter } from '@codemirror/lint'
import { ThemeContext } from '../themes/ThemeProvider'
import { createHmsccTheme } from '../editor/hmsccTheme'
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/view'
import { highlightSelectionMatches } from '@codemirror/search'
import { errorsToDiagnostics } from '../utils/errorDiagnostics'

function AdvancedEditor({ code, setCode, cursorPos, setCursorPos, errors }) {
  const { theme } = useContext(ThemeContext)
  const editorContainer = useRef(null)
  const editorView = useRef(null)
  const errorsRef = useRef(errors)

  // Update errors ref when errors change
  useEffect(() => {
    errorsRef.current = errors
    // Trigger linter update
    if (editorView.current) {
      editorView.current.dispatch({})
    }
  }, [errors])

  useEffect(() => {
    if (!editorContainer.current) return

    const state = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSelectionMatches(),
        indentUnit.of('  '),
        indentOnInput(),
        bracketMatching(),
        syntaxHighlighting(defaultHighlightStyle),
        createHmsccTheme(theme),
        // Add error diagnostics linter
        linter((view) => {
          const errorText = errorsRef.current
          if (!errorText) return []
          return errorsToDiagnostics(errorText, view.state)
        }),
        keymap.of([
          ...defaultKeymap,
          {
            key: 'Ctrl-Enter',
            run: () => {
              // Trigger compile (handled by parent)
              return true
            },
          },
          {
            key: 'Ctrl-/',
            run: (view) => {
              // Toggle comment
              return true
            },
          },
          {
            key: 'Tab',
            run: indentMore,
          },
          {
            key: 'Shift-Tab',
            run: indentLess,
          },
        ]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            setCode(update.state.doc.toString())
          }
          const pos = update.state.selection.main.head
          const line = update.state.doc.lineAt(pos)
          const column = pos - line.from + 1
          setCursorPos({ line: line.number, column })
        }),
      ],
    })

    const view = new EditorView({
      state,
      parent: editorContainer.current,
    })

    editorView.current = view

    return () => {
      view.destroy()
    }
  }, [theme])

  // Update code when prop changes
  useEffect(() => {
    if (editorView.current && editorView.current.state.doc.toString() !== code) {
      editorView.current.dispatch({
        changes: {
          from: 0,
          to: editorView.current.state.doc.length,
          insert: code,
        },
      })
    }
  }, [code])

  return (
    <div
      ref={editorContainer}
      style={{
        flex: 1,
        overflow: 'auto',
        fontFamily: theme.typography.fontFamily.mono,
        fontSize: theme.typography.fontSize.base,
        lineHeight: theme.typography.lineHeight.normal,
      }}
    />
  )
}

export default AdvancedEditor
