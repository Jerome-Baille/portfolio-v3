/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'whisper': ['Whisper', 'cursive'],
        'lato': ['Lato', 'sans-serif']
      },
      colors: {
        'primary': '#D3AC92',
        'secondary': '#0C2A42',
      }
    },
  },
  plugins: [],
}