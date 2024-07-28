/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width:{
        '70p':"70%",
        '30p':"30%"
      },
      height:{
        '15p':"15%",
        '80p':"80%",
      },
      backgroundColor:{
        'aman':"#E9E7E7"
      }
    },
  },
  plugins: [],
}

