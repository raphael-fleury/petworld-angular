/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'pw-1': '#FFFFFF',
        'pw-2': '#FFEACD',
        'pw-3': '#FFC14D',
        'pw-4': '#FFA400',
        'pw-5': '#EB751E',
        'pw-6': '#C55C1B',
        'pw-7': '#6B2206',
        'pw-8': '#000000',
      },
    }
  },
  plugins: [],
}

