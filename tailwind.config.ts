import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        crimson: {
          50: '#fef2f2',
          100: '#fde3e3',
          200: '#fcc',
          300: '#f9a8a8',
          400: '#f47272',
          500: '#C0392B',
          600: '#761014',
          700: '#5C0E0E',
          800: '#3D0808',
          900: '#1A0303',
        },
        gold: {
          50: '#fdf8e8',
          100: '#f8edcc',
          200: '#d4c4a0',
          300: '#C8AD7F',
          400: '#AE8954',
          500: '#8B7530',
          600: '#6B5A22',
          700: '#4A3E18',
          800: '#2E2710',
          900: '#1A1508',
        },
        pywel: {
          bg: '#0A0A0F',
          card: '#19191E',
          'card-hover': '#22222A',
          secondary: '#111116',
          border: '#2A2630',
        },
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'Cinzel', 'serif'],
        crimson: ['var(--font-crimson)', 'Crimson Text', 'serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(174, 137, 84, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(174, 137, 84, 0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'pulse-gold': 'pulse-gold 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
