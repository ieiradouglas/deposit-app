/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    fontFamily: {
      'sans': ['JetBrains Mono'],
    },
    screens: {
      'mobile': { 'max': '500px' },
    },
    extend: {},
  },
  plugins: [],
}

