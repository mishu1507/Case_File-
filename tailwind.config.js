/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'special-elite': ['"Special Elite"', 'cursive'],
        'courier': ['"Courier Prime"', 'monospace'],
        'marker': ['"Permanent Marker"', 'cursive'],
      },
      colors: {
        cork: {
          DEFAULT: '#8B6914',
          light: '#a07d20',
          dark: '#6b5010',
        },
        manila: {
          DEFAULT: '#d4a843',
          dark: '#b8922d',
          paper: '#f5f0e0',
        },
        board: {
          bg: '#0f0d0b',
          dark: '#080705',
        },
        stamp: {
          red: '#8b0000',
          black: '#1a1208',
        },
        string: '#cc2200',
        pin: {
          red: '#cc2200',
          yellow: '#e8c442',
          blue: '#2244cc',
        },
      },
      perspective: {
        '1200': '1200px',
      },
    },
  },
  plugins: [],
}
