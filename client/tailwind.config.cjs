/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ourwhite': '#f2f1ee',
        'yellow': '#b59f3b'
      }
    },
  },
  plugins: [],
}
