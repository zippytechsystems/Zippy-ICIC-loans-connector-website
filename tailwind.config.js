/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fintech: {
          navy: '#0A192F',
          dark: '#06101E',
          deep: '#0F2347',
          surface: '#122B56',
          blue: '#1E40AF',
          royal: '#2563EB',
          sky: '#38BDF8',
          accent: '#F97316', // Subtle warm orange accent
          'accent-hover': '#EA580C',
          light: '#F8FAFC',
          muted: '#64748B',
          border: '#E2E8F0',
          'dark-border': '#1E293B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(10, 25, 47, 0.08)',
        'card-hover': '0 12px 30px -4px rgba(10, 25, 47, 0.15)',
        'glow': '0 0 25px rgba(37, 99, 235, 0.25)',
      }
    },
  },
  plugins: [],
}
