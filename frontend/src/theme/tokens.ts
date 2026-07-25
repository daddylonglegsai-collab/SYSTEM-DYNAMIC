/**
 * Design System Tokens
 * Centralized source of truth for colors, spacing, typography, and shadows
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const colors = {
  // Neutral
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Slate
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // Primary - Blue (Industrial)
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    // Custom industrial shades
    light: '#35b7f2',
    main: '#1ba6e8',
    dark: '#0f6ba6',
  },

  // Secondary - Emerald (Success)
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#145231',
    main: '#4ade80',
  },

  // Tertiary - Amber (Warning)
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    main: '#fbbf24',
  },

  // Quaternary - Rose (Error/Critical)
  error: {
    50: '#fff5f7',
    100: '#ffe4e9',
    200: '#ffc9d3',
    300: '#ff9db9',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
    main: '#fb7185',
  },

  // Surface Colors (Dark Theme)
  surface: {
    bg: '#091016',
    card: '#111820',
    hover: '#0f1d27',
    border: '#1f3a4a',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },

  // Text
  text: {
    primary: '#e8eef4',
    secondary: '#94a3b8',
    tertiary: '#64748b',
    inverse: '#0f172a',
  },
} as const;

// ============================================================================
// SPACING SCALE (Tailwind-compatible)
// ============================================================================

export const spacing = {
  0: '0',
  1: '0.25rem',     // 4px
  2: '0.5rem',      // 8px
  3: '0.75rem',     // 12px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  12: '3rem',       // 48px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  fontFamily: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    rtl: ['Vazirmatn', 'Tahoma', 'sans-serif'],
    mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
  },

  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],           // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],       // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],          // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],       // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],        // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],         // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],    // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],      // 36px
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

// ============================================================================
// BORDERS & RADIUS
// ============================================================================

export const borderRadius = {
  sm: '0.5rem',       // 8px
  md: '0.75rem',      // 12px
  lg: '1rem',         // 16px
  xl: '1.25rem',      // 20px
  '2xl': '1.5rem',    // 24px
  full: '9999px',
} as const;

export const borderWidth = {
  0: '0',
  1: '1px',
  2: '2px',
} as const;

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  panel: '0 16px 40px rgba(0, 0, 0, 0.17)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
} as const;

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  overlay: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const;

// ============================================================================
// TRANSITIONS
// ============================================================================

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// ============================================================================
// SEMANTIC ALIASES (Component-specific)
// ============================================================================

export const semantic = {
  // Status colors
  healthy: colors.success.main,
  watch: colors.warning.main,
  critical: colors.error.main,

  // Component-specific
  panel: {
    bg: colors.surface.card,
    border: colors.surface.border,
    shadow: shadows.panel,
  },

  button: {
    primary: {
      bg: colors.primary.main,
      bgHover: colors.primary.dark,
      text: '#ffffff',
    },
    secondary: {
      bg: colors.surface.hover,
      bgHover: colors.surface.border,
      text: colors.text.primary,
    },
  },

  input: {
    bg: colors.surface.bg,
    border: colors.surface.border,
    borderFocus: colors.primary.light,
    text: colors.text.primary,
  },
} as const;

// ============================================================================
// EXPORT COMBINED THEME
// ============================================================================

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  borderWidth,
  shadows,
  zIndex,
  transitions,
  semantic,
} as const;

export type Theme = typeof theme;
