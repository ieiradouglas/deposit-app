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
      'desktop': { 'min': '501px' }
    },
    extend: {
      colors: {
        'roxo': "rgb(99,102,241)",
        'verde': "#70e000",
      }
    },
  },
  plugins: [],
}

