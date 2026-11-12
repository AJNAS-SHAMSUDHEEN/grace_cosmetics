/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lumiere: {
          bg: '#FAF9F7',
          card: '#FFFFFF',
          lavender: '#E5DDF5',
          softLilac: '#EFEBF7',
          lilac: '#D8CEF0',
          lilacDark: '#BFAFE3',
          purple: '#5B4296',
          deepPurple: '#4A3578',
          royalPurple: '#3B2568',
          darkNavy: '#131124',
          grayText: '#666666',
          mutedText: '#8E8E93',
          border: '#E8E5DF',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        script: ['Alex Brush', 'Caveat', 'cursive'],
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        '5xl': '2.75rem',
      },
    },
  },
  plugins: [],
};
