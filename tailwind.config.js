/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        // CSS-variable-driven theme tokens
        background: 'var(--bg)',
        surface:    'var(--surface)',
        border:     'var(--border-c)',
        primary:    'var(--primary)',
        secondary:  'var(--secondary)',
        // Copper/gold accent system — banner palette
        accent:          '#E2C799',
        accentLight:     '#DBC1A0',
        success:         '#A8B5A0',
        'accent-deep':   '#C4A574',
        'accent-muted':  '#B8956A',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
