// Theme Configuration System
// Reflects: Competitive, Creative, Bold, Confident, Rebellious, Precision-Focused, Minimal but Powerful

export const lightTheme = {
  name: 'light',
  colors: {
    // Primary colors - Bold, confident accent
    primary: '#FF6B35', // Hot orange - competitive energy
    primaryDark: '#D94520',
    primaryLight: '#FF8A5B',
    
    // Secondary - Cool contrast
    secondary: '#004E89', // Deep blue - precision & engineering
    secondaryLight: '#1E7BC1',
    
    // Accent - Creative spark
    accent: '#A23B72', // Purple - creative & rebellious
    accentLight: '#C94DA0',
    
    // Neutrals
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceHover: '#F5F5F5',
    text: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',
    
    // Semantic
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // UI Elements
    border: '#E5E5E5',
    borderLight: '#F0F0F0',
    borderDark: '#CCCCCC',
    
    // Editor
    editorBackground: '#FFFFFF',
    editorLineNumber: '#999999',
    editorLineHighlight: '#F0F0F0',
    editorCursor: '#1A1A1A',
    editorSelection: '#C7D9E8',
    
    // Syntax highlighting
    syntax: {
      keyword: '#D73A49',
      string: '#032F62',
      number: '#005CC5',
      comment: '#6A737D',
      function: '#6F42C1',
      variable: '#24292E',
    },
  },
  
  typography: {
    fontFamily: {
      ui: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"Fira Code", "Courier New", monospace',
      display: '"Inter", -apple-system, sans-serif',
    },
    fontSize: {
      xs: '12px',
      sm: '13px',
      base: '14px',
      lg: '16px',
      xl: '18px',
      '2xl': '20px',
      '3xl': '24px',
      '4xl': '32px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
  },
  
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
  
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    full: '9999px',
  },
  
  transitions: {
    fast: '150ms ease-in-out',
    normal: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  },
};

export const darkTheme = {
  name: 'dark',
  colors: {
    // Primary colors - Bold, confident accent
    primary: '#FF6B35', // Hot orange - competitive energy (same as light)
    primaryDark: '#D94520',
    primaryLight: '#FF8A5B',
    
    // Secondary - Cool contrast
    secondary: '#64B5F6', // Light blue - precision on dark background
    secondaryLight: '#90CAF9',
    
    // Accent - Creative spark
    accent: '#E91E63', // Hot pink - creative & rebellious
    accentLight: '#F06292',
    
    // Neutrals
    background: '#0F0F0F',
    surface: '#1E1E1E',
    surfaceHover: '#2A2A2A',
    text: '#E8E8E8',
    textSecondary: '#B0B0B0',
    textTertiary: '#808080',
    
    // Semantic
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // UI Elements
    border: '#404040',
    borderLight: '#505050',
    borderDark: '#303030',
    
    // Editor
    editorBackground: '#1E1E1E',
    editorLineNumber: '#6A6A6A',
    editorLineHighlight: '#2A2A2A',
    editorCursor: '#E8E8E8',
    editorSelection: '#264F78',
    
    // Syntax highlighting
    syntax: {
      keyword: '#FF7B72',
      string: '#A5D6FF',
      number: '#79C0FF',
      comment: '#8B949E',
      function: '#D2A8FF',
      variable: '#C9D1D9',
    },
  },
  
  typography: {
    fontFamily: {
      ui: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"Fira Code", "Courier New", monospace',
      display: '"Inter", -apple-system, sans-serif',
    },
    fontSize: {
      xs: '12px',
      sm: '13px',
      base: '14px',
      lg: '16px',
      xl: '18px',
      '2xl': '20px',
      '3xl': '24px',
      '4xl': '32px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
  },
  
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.3)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.4)',
    md: '0 4px 6px rgba(0, 0, 0, 0.5)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.6)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.7)',
  },
  
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    full: '9999px',
  },
  
  transitions: {
    fast: '150ms ease-in-out',
    normal: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  },
};
