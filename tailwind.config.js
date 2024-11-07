/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        '0%': {opacity: 0},
        '100%': {opacity: 1},
      }
    },
    animation: {
      fadeIn: 'fadeIn .2s ease-in-out'
    }
  },
  plugins: [],
}

