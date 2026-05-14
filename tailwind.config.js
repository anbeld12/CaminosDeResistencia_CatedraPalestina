/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E4731',
          deep: '#1d2f1f',
          soft: '#6f9456',
        },
        accent: {
          DEFAULT: '#8B1D22',
        },
        dark: '#121212',
        light: {
          DEFAULT: '#F5F5F5',
          warm: '#FAFAF7',
        },
        fg: {
          DEFAULT: '#121212',
          mute: '#4a4a48',
          'dark-default': '#f1ede4',
          'dark-mute': '#a8a39a',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        wrap: '1280px',
      },
      backgroundColor: {
        'bg-base': '#F5F5F5',
        'bg-warm': '#FAFAF7',
        'bg-dark': '#0b0c0a',
        'bg-dark-warm': '#121310',
      },
    },
  },
  plugins: [],
};
