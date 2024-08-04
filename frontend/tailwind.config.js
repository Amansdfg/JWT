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
      },
      gridTemplateColumns:{
        'posts': "repeat(auto-fit, minmax(240px,auto))",
      },
      boxShadow: {
        'modal': '0 2px 8px rgba(0, 0, 0, 0.26)',
      },
      keyframes: {
        'slide-down-fade-in': {
          '0%': { transform: 'translateY(-10vh)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-down-fade-in': 'slide-down-fade-in 300ms ease-out forwards',
      },
    },
  },
  plugins: [],
}

