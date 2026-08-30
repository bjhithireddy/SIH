/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f5fa',
          100: '#e1ecf5',
          200: '#c3daec',
          300: '#94bfde',
          400: '#5e9dcc',
          500: '#387eb8',
          600: '#27649b',
          700: '#20507e',
          800: '#1e3e62',
          900: '#0b192c',
          950: '#060e1a',
        },
        govblue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#172554',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 2px 4px 0 rgba(11, 25, 44, 0.04), 0 1px 2px 0 rgba(11, 25, 44, 0.02)',
        'elevated': '0 10px 15px -3px rgba(11, 25, 44, 0.08), 0 4px 6px -4px rgba(11, 25, 44, 0.04)',
      }
    },
  },
  plugins: [],
}
