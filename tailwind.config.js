/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rpm: {
          yellow: '#FFC400',
          'yellow-hover': '#FFD13A',
          'yellow-dark': '#D99F00',
          black: '#15181C',
          surface: '#1A1E23',
          'surface-elevated': '#22272E',
          border: '#2B3036',
          'border-light': '#3A414A',
          text: '#F7F7F7',
          muted: '#AAAAAA'
        }
      },
      fontFamily: {
        barlow: ['"Barlow Condensed"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif']
      }
    },
  },
  plugins: [],
};
