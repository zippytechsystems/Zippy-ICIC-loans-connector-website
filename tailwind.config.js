/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#102747',       // Deep Navy Blue
        secondary: '#1769AA',     // Royal Blue
        accent: '#F59E0B',        // Orange
        'accent-hover': '#D97706',
        lightBg: '#F4F7FB',       // Light Background
        darkSlate: '#253449',     // Text
        fintech: {
          navy: '#102747',
          dark: '#0A1B33',
          deep: '#0D213F',
          surface: '#17365F',
          blue: '#1769AA',
          royal: '#1769AA',
          sky: '#38BDF8',
          accent: '#F59E0B',      // #F59E0B
          'accent-hover': '#D97706',
          light: '#F4F7FB',
          muted: '#64748B',
          border: '#E2E8F0',
          'dark-border': '#1E293B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(16, 39, 71, 0.08)',
        'card-hover': '0 12px 30px -4px rgba(16, 39, 71, 0.15)',
        'glow': '0 0 25px rgba(23, 105, 170, 0.25)',
      }
    },
  },
  plugins: [],
}
