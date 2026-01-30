/**
 * CodeMirror Lint Extension for HMSCC
 * 
 * Integrates error diagnostics into the editor with inline squiggles/underlines
 */

import { linter } from '@codemirror/lint'
import { errorsToDiagnostics } from '../utils/errorDiagnostics'

/**
 * Create a lint source for the current errors
 * 
 * Returns a function that CodeMirror will call to get current diagnostics
 */
export function createHmsccLinter(errorsRef) {
  return linter((view) => {
    const errorText = errorsRef.current
    
    if (!errorText) {
      return []
    }

    return errorsToDiagnostics(errorText, view.state)
  })
}

/**
 * Update the error display in the editor
 * 
 * This triggers the linter to re-run and update error squiggles
 */
export function updateEditorDiagnostics(view, errorText) {
  // The linter will automatically re-run due to the view's update
  // We just need to ensure the ref is updated
  view.dispatch({})
}

/**
 * Create a hover plugin that shows error tooltips
 */
export function createErrorHoverPlugin(errorsRef) {
  return {
    pos: null,
    hover(view, pos, side) {
      // This would integrate with CodeMirror's hover system
      // For now, we rely on the built-in lint hover
      return null
    },
  }
}

/**
 * Theme for error squiggles - wavy red underline
 */
export const errorTheme = {
  '.cm-diagnostic': {
    padding: '0 4px',
    marginLeft: '-4px',
    display: 'inline-block',
  },
  '.cm-diagnostic.cm-diagnostic-error': {
    borderLeft: '3px solid #d02020',
  },
  '.cm-diagnostic.cm-diagnostic-warning': {
    borderLeft: '3px solid #f39c12',
  },
  '.cm-diagnostic.cm-diagnostic-info': {
    borderLeft: '3px solid #0066cc',
  },
  '.cm-lint-marker-error': {
    content: '""',
    backgroundImage:
      'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22><path d=%22M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2m0 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8m-1 11h2v2h-2v-2m0-8h2v6h-2V7z%22 fill=%22%23d02020%22/></svg>")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  '.cm-lint-marker-warning': {
    content: '""',
    backgroundImage:
      'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22><path d=%22M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z%22 fill=%22%23f39c12%22/></svg>")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  '.cm-lint-marker-info': {
    content: '""',
    backgroundImage:
      'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22><path d=%22M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z%22 fill=%220066cc%22/></svg>")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
}

/**
 * Generate inline styles for error squiggles in a theme
 * 
 * This creates the visual wavy underline effect
 */
export function createErrorSquiggleStyle(theme) {
  return {
    '.cm-lint-marker': {
      width: '13px',
      height: '13px',
      cursor: 'pointer',
      flexShrink: 0,
    },
    '.cm-lint-marker.cm-lint-marker-error': {
      backgroundColor: theme.colors.error || '#d02020',
      opacity: '0.8',
    },
    '.cm-lint-marker.cm-lint-marker-warning': {
      backgroundColor: theme.colors.warning || '#f39c12',
      opacity: '0.8',
    },
    '.cm-lint-marker.cm-lint-marker-info': {
      backgroundColor: theme.colors.info || '#0066cc',
      opacity: '0.8',
    },
  }
}
