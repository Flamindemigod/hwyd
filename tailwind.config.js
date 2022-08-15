/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#ded7f6",
          200: "#bcafed",
          300: "#9b86e5",
          400: "#795edc",
          500: "#5836d3",
          600: "#462ba9",
          700: "#35207f",
          800: "#231654",
          900: "#120b2a"
        },
      }
    },
  },
  plugins: [],
}