/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          DEFAULT: '#0F172A',
          950: '#0B1220',
        },
        pickle: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        court: {
          DEFAULT: '#0284C7',
          light: '#38BDF8',
        },
        surface: '#F8FAFC',
      },
      fontFamily: {
        display: ['"Rajdhani"', '"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.06), 0 8px 24px -12px rgba(15, 23, 42, 0.15)',
        cardHover: '0 4px 8px rgba(15, 23, 42, 0.08), 0 16px 32px -12px rgba(2, 132, 199, 0.25)',
      },
      borderRadius: {
        card: '1rem',
      },
    },
  },
  plugins: [],
}
