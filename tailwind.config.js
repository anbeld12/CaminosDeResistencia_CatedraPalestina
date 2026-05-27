/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--olive)',
          deep: 'var(--olive-deep)',
        },
        accent: {
          DEFAULT: 'var(--terracotta)',
        },
        dark: 'var(--carbon)',
        light: {
          DEFAULT: 'var(--smoke)',
          warm: 'var(--paper)',
        },
        fg: {
          DEFAULT: 'var(--fg)',
          mute: 'var(--fg-mute)',
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
    },
  },
  plugins: [],
};
