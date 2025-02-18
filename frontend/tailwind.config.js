/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#05B6D3",
        secondary: "#EF863E",
        pornhub: { 
          200: '#ff9900',
          300: '#ffaa00',
        }
      },
      fontFamily: {
        KumbhSans: ['Kumbh Sans', 'san-serif'],
      },
    },
  },
  plugins: [],
}

