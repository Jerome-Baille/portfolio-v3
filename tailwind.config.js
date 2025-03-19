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
        'primary': '#8B5A2B', // Changed to a rich velvet brown color
        'secondary': '#0C2A42',
      }
    },
  },
  plugins: [],
}