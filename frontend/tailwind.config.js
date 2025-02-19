/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ['Kumbh Sans', "Poppins", "sans-serif"],
    },
    extend: {
      colors:{
        primary: "#05B6D3",
        secondary: "#EF863E",
      }
    },
    animation: {
      slideDown: 'slideDown 0.5s ease-in-out',
    },
    keyframes: {
      slideDown: {
        '0%': { transform: 'translateY(-100%)' },
        '100%': { transform: 'translateY(0)' },
      },
    }
  },
  plugins: [],
}

