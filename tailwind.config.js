/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: '#101420',
        'red-color': '#F33A6A',
      },
      fontFamily: {
        crimson: ['Crimson Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
