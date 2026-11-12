/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          ivory: '#FAF8F5',
          cream: '#F4EFE6',
          beige: '#E7DFD5',
          sand: '#D6CABE',
          bronze: '#A68A68',
          deepBronze: '#7D6346',
          gold: '#C5A059',
          lightGold: '#E2CA89',
          champagne: '#EED9B3',
          espresso: '#1A1615',
          dark: '#0F0D0C',
          charcoal: '#262220',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Cinzel', 'Cormorant Garamond', 'serif'],
      },
      letterSpacing: {
        widest: '.25em',
        ultra: '.35em',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
      backgroundImage: {
        'radial-gold': 'radial-gradient(circle, rgba(197, 160, 89, 0.15) 0%, rgba(15, 13, 12, 0) 70%)',
        'luxury-gradient': 'linear-gradient(135deg, #1A1615 0%, #0F0D0C 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(226, 202, 137, 0.25), transparent)',
      },
    },
  },
  plugins: [],
};
