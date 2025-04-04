/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'whisper': ['Whisper', 'cursive'],
        'lato': ['Lato', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif']
      },
      colors: {
        'primary': '#955922',
        'secondary': '#0C2A42',
      },
      animation: {
        'scroll-left': 'scroll-left 30s linear infinite',
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}