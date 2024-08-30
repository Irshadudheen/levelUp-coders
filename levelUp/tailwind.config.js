/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        outerBlue: '#0A1929',
        innerBlue: '#001E3C',
        "dark-layer-1": "rgb(40,40,40)",
        "dark-layer-2": "rgb(26,26,26)",
        "dark-label-2": "rgba(239, 241, 246, 0.75)",
        "dark-divider-border-2": "rgb(61, 61, 61)",
        "dark-fill-2": "hsla(0,0%,100%,.14)",
        "dark-fill-3": "hsla(0,0%,100%,.1)",
        "dark-gray-6": "rgb(138, 138, 138)",
        "dark-gray-7": "rgb(179, 179, 179)",
        "gray-8": "rgb(38, 38, 38)",
        "dark-gray-8": "rgb(219, 219, 219)",
        "brand-orange": "rgb(255 161 22)",
        "brand-orange-s": "rgb(193, 122, 15)",
        "dark-yellow": "rgb(255 192 30)",
        "dark-pink": "rgb(255 55 95)",
        olive: "rgb(0, 184, 163)",
        "dark-green-s": "rgb(44 187 93)",
        "dark-blue-s": "rgb(10 132 255)",
      },
      keyframes: {
        fall: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '25%': { opacity: '1' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
      },
      animation: {
        fall: 'fall 0.5s ease-out forwards',
        slideInLeft: 'slideInLeft 0.5s ease-out forwards',
        slideInRight: 'slideInRight 0.5s ease-out forwards',
        'brick-wave': 'wave 1s infinite',
        ripple: 'ripple 3s infinite',
      },
    },
  },
  plugins: [],
}
