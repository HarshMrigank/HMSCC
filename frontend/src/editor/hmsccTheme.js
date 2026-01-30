import { EditorView } from '@codemirror/view'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

export function createHmsccTheme(theme) {
  const highlightStyle = HighlightStyle.define([
    { tag: t.keyword, color: theme.colors.syntax.keyword, fontWeight: 'bold' },
    { tag: t.string, color: theme.colors.syntax.string },
    { tag: t.number, color: theme.colors.syntax.number, fontWeight: 'bold' },
    { tag: t.comment, color: theme.colors.syntax.comment, fontStyle: 'italic' },
    { tag: t.atom, color: theme.colors.syntax.number },
    { tag: t.bool, color: theme.colors.syntax.keyword, fontWeight: 'bold' },
    { tag: t.variableName, color: theme.colors.syntax.variable },
    { tag: t.functionName, color: theme.colors.syntax.function, fontWeight: 'bold' },
    { tag: t.operator, color: theme.colors.text },
    { tag: t.punctuation, color: theme.colors.textSecondary },
  ])

  const editorTheme = EditorView.theme({
    '.cm-content': {
      color: theme.colors.text,
      backgroundColor: theme.colors.editorBackground,
      fontFamily: 'inherit',
      fontSize: 'inherit',
    },
    '.cm-gutters': {
      backgroundColor: theme.colors.surfaceHover,
      color: theme.colors.editorLineNumber,
      borderRight: `1px solid ${theme.colors.border}`,
    },
    '.cm-activeLineGutter': {
      backgroundColor: theme.colors.editorLineHighlight,
    },
    '.cm-cursor': {
      borderLeftColor: theme.colors.editorCursor,
      animation: 'cm-blink 1.06s infinite',
    },
    '.cm-selection, .cm-selectionBackground, .selected': {
      backgroundColor: theme.colors.editorSelection,
    },
    '.cm-searchMatch': {
      backgroundColor: theme.colors.warning,
      opacity: 0.3,
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: theme.colors.warning,
      opacity: 0.5,
    },
    '.cm-matchingBracket, .cm-nonmatchingBracket': {
      backgroundColor: theme.colors.editorSelection,
      outline: `1px solid ${theme.colors.primary}`,
    },
    '.cm-diagnosticMarker': {
      display: 'inline-block',
      borderBottom: `2px wavy ${theme.colors.error}`,
    },
  })

  return [syntaxHighlighting(highlightStyle), editorTheme]
}
