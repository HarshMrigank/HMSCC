/**
 * Error Diagnostics Utilities
 * 
 * Handles parsing compiler errors and converting them to CodeMirror diagnostics
 * with inline squiggles/underlines
 */

import { Diagnostic } from '@codemirror/lint'

/**
 * Parse error string from compiler
 * 
 * Expected format: "line:col: error message"
 * Example: "5:10: Undefined variable 'x'"
 * 
 * Returns: { line, column, message, severity }
 */
export function parseCompilerError(errorLine) {
  const match = errorLine.match(/^(\d+):(\d+):\s*(error|warning|info)?\s*(.+)$/i)
  
  if (!match) {
    // Try alternative format: "Error at line 5, col 10: message"
    const altMatch = errorLine.match(/(?:error|warning|info).*line\s+(\d+),?\s+col(?:umn)?\s+(\d+)[:\s]*(.+)/i)
    if (altMatch) {
      return {
        line: parseInt(altMatch[1], 10),
        column: parseInt(altMatch[2], 10),
        message: altMatch[3] || errorLine,
        severity: 'error',
      }
    }
    
    // Couldn't parse - return null
    return null
  }

  const [, lineStr, colStr, severityStr, message] = match
  const severity = (severityStr || 'error').toLowerCase()
  
  return {
    line: parseInt(lineStr, 10),
    column: parseInt(colStr, 10),
    message: message.trim(),
    severity, // 'error', 'warning', or 'info'
  }
}

/**
 * Convert parsed errors to CodeMirror Diagnostic objects
 * 
 * @param {string} errorText - Raw error output from compiler
 * @param {EditorState} state - CodeMirror editor state
 * @returns {Diagnostic[]} - Array of CodeMirror diagnostics
 */
export function errorsToDiagnostics(errorText, state) {
  if (!errorText || typeof errorText !== 'string') {
    return []
  }

  const lines = errorText.split('\n').filter(line => line.trim())
  const diagnostics = []

  lines.forEach(errorLine => {
    const parsed = parseCompilerError(errorLine)
    
    if (!parsed) return // Skip unparseable lines

    const { line, column, message, severity } = parsed

    try {
      // Convert 1-based line/column to 0-based positions
      const doc = state.doc
      
      // Clamp line number to valid range
      const validLine = Math.max(1, Math.min(line, doc.lines))
      const lineObj = doc.line(validLine)
      
      // Clamp column to valid range
      const validColumn = Math.max(0, Math.min(column - 1, lineObj.length))
      const from = lineObj.from + validColumn
      
      // End position: try to highlight the word/token at cursor
      let to = from + 1
      const restOfLine = doc.sliceString(from, lineObj.to)
      const wordMatch = restOfLine.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)
      if (wordMatch) {
        to = from + wordMatch[0].length
      }

      // Map severity to CodeMirror severity
      const cmSeverity = severity === 'warning' ? 'warning' : 
                         severity === 'info' ? 'info' : 
                         'error'

      diagnostics.push(
        Diagnostic.create({
          from,
          to,
          severity: cmSeverity,
          message,
        })
      )
    } catch (e) {
      console.warn('Failed to create diagnostic:', e, parsed)
    }
  })

  return diagnostics
}

/**
 * Extract diagnostics from error response
 * 
 * Compiler response format:
 * {
 *   success: false,
 *   output: "...",
 *   errors: "5:10: Undefined variable 'x'\n3:4: Type mismatch",
 *   generatedC: "..."
 * }
 */
export function extractDiagnostics(response, state) {
  if (!response || response.success) {
    return [] // No errors
  }

  return errorsToDiagnostics(response.errors, state)
}

/**
 * Format diagnostic for hover tooltip
 */
export function formatDiagnosticTooltip(diagnostic) {
  const icon = diagnostic.severity === 'error' ? '❌' :
               diagnostic.severity === 'warning' ? '⚠️' :
               'ℹ️'
  
  return `${icon} ${diagnostic.message}`
}

/**
 * Get error summary statistics
 */
export function getErrorStats(diagnostics) {
  return {
    total: diagnostics.length,
    errors: diagnostics.filter(d => d.severity === 'error').length,
    warnings: diagnostics.filter(d => d.severity === 'warning').length,
    info: diagnostics.filter(d => d.severity === 'info').length,
  }
}

/**
 * Create custom error response for testing
 */
export function createTestError(line, col, message) {
  return {
    success: false,
    output: '',
    errors: `${line}:${col}: ${message}`,
    generatedC: '',
  }
}
