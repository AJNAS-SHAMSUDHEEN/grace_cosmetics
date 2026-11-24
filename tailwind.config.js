/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grace: {
          burgundy: '#701A33',
          wine: '#8B2C47',
          deepWine: '#520B1E',
          roseGold: '#D48D9E',
          roseGoldLight: '#E8BEC5',
          blush: '#FCEEF1',
          blushLight: '#FDF7F8',
          champagne: '#E5C287',
          gold: '#D4A359',
          dark: '#1E0A12',
          muted: '#7A646E',
          border: '#EED9DF',
          bg: '#FDFBFA',
        },
        lumiere: {
          bg: '#FDFBFA',
          card: '#FFFFFF',
          lavender: '#FCEEF1',
          softLilac: '#F8E9EE',
          lilac: '#E8BEC5',
          lilacDark: '#D48D9E',
          purple: '#701A33',
          deepPurple: '#5A1226',
          royalPurple: '#420B1B',
          darkNavy: '#1E0A12',
          grayText: '#6B5861',
          mutedText: '#8E7A83',
          border: '#EED9DF',
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
