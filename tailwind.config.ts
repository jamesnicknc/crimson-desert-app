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
          600: '#8B1A1A',
          700: '#5C0E0E',
          800: '#3D0808',
          900: '#1A0303',
        },
        gold: {
          50: '#fdf8e8',
          100: '#f8edcc',
          200: '#E8D48B',
          300: '#C9A84C',
          400: '#A8882E',
          500: '#8B7530',
          600: '#6B5A22',
          700: '#4A3E18',
          800: '#2E2710',
          900: '#1A1508',
        },
        pywel: {
          bg: '#0D0B0E',
          card: '#1A161E',
          'card-hover': '#221D28',
          secondary: '#151218',
          border: '#2A2430',
        },
        region: {
          hernand: '#5BAA5B',
          pailune: '#5B8FA8',
          demeniss: '#8B7530',
          delesyia: '#7B5EA7',
          desert: '#C0392B',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        crimson: ['Crimson Text', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 168, 76, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(201, 168, 76, 0)' },
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
