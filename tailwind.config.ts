import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Primary accent: the burnt orange of Raider gear and Speranza signage
        rust: {
          50: '#fff6ec',
          100: '#ffe8cf',
          200: '#fdd0a0',
          300: '#f5a65b',
          400: '#e8853a',
          500: '#d9671f',
          600: '#b5501a',
          700: '#8a3b12',
          800: '#5c270c',
          900: '#331506',
        },
        // Secondary accent: ARC sensor teal / signal light
        signal: {
          50: '#ecfffb',
          100: '#c9fdf3',
          200: '#9af3e6',
          300: '#7fe3d6',
          400: '#3ec9b8',
          500: '#1fa99a',
          600: '#15837a',
          700: '#12655f',
          800: '#0f4a46',
          900: '#082e2c',
        },
        // Warm neutral used for secondary text and highlights
        sand: {
          100: '#f1e9d8',
          200: '#d8c9a8',
          300: '#bfae8a',
          400: '#9c8c6c',
        },
        // Surface palette (dark, blue-grey, "underground bunker")
        arc: {
          bg: '#0b0e12',
          secondary: '#11161c',
          card: '#171d25',
          'card-hover': '#1e2630',
          border: '#2a333f',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Chakra Petch', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
        sans: ['var(--font-body)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-rust': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(232, 133, 58, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(232, 133, 58, 0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'pulse-rust': 'pulse-rust 2s infinite',
        scan: 'scan 6s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
