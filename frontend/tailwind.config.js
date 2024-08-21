/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #253c3c, #1d4949)',
        // 'custom-gradient': 'linear-gradient(180deg, #050C9C, #0F67B1)',
      },

      width:{
        'post-sm':"550px",
        'post-md':"450px",
        'post-lg':"500px",
        'post-xl':"500px",
        '70p':"70%",
        '30p':"30%"
      },
      height:{
        "post-h":'400px',
        'post-sm':"550px",
        'post-md':"450px",
        'post-lg':"500px",
        'post-xl':"500px",
        '15p':"15%",
        '80p':"80%",
      },
      backgroundColor:{
        'aman':"#E9E7E7",
        'lightMode':"#060963",
        'darkMode':'#0f0c27'
      },
      gridTemplateColumns:{
        'posts': "repeat(auto-fit, minmax(240px,auto))",
      },
      boxShadow: {
        'modal': '0 2px 8px rgba(0, 0, 0, 0.26)',
        'custom': '0 0 16px 1px rgba(0, 0, 0, 0.5)',
        'header': '-3px -3px 7px #ffffff73, 2px 2px 5px #5e687949;'
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

