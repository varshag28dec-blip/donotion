/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#071426',
          secondary: '#0B1F38',
          card: '#102A46',
          border: 'rgba(56, 189, 248, 0.15)',
        },
        primary: {
          blue: '#2563EB',
          light: '#38BDF8',
          hover: '#1D4ED8',
        },
        accent: {
          green: '#34D399',
          amber: '#FBBF24',
          rose: '#F43F5E',
        },
        text: {
          main: '#F8FAFC',
          secondary: '#A7B8CC',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px -3px rgba(37, 99, 235, 0.45)',
        'glow-cyan': '0 0 20px -3px rgba(56, 189, 248, 0.4)',
        'glow-green': '0 0 20px -3px rgba(52, 211, 153, 0.35)',
        'glow-amber': '0 0 20px -3px rgba(251, 191, 36, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
