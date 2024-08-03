/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        outerBlue:'#0A1929',
        innerBlue:'#001E3C'
      }
    },
  },
  plugins: [],
}

