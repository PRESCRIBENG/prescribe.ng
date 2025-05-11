/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        draw: {
          '0%': { 'stroke-dasharray': '0, 1000' },
          '100%': { 'stroke-dasharray': '1000, 0' },
        },
      },
      animation: {
        draw: 'draw 3s linear infinite',
      },
      fontFamily: {
        // sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      

        montserrat: ['var(--font-montserrat)'],
        poppins: ['var(--font-poppins)'],
      },
      backgroundImage: {
        'white-to-gray': 'linear-gradient(to bottom, #FFFFFF, #F3F4F6)', // Custom gradient
      },
      colors: {
        foundationBlueNormal: '#0077B6',
        foundationBlueDarker: '#002A40',
        foundationBlueLight: '#0099E6',
        primaryLight: '#FFFFFF',
        primaryDark: '#121212',
        grayLight: '#EEEEEE',
        multicolor1: '#0000FF',
        foundationGreyDarker: '#181818',
        foundationGrayLight: '#ECECEC',
        grayDark: '#667085',
        primaryBg: "#FAFBFC",
        primaryDarkBg: "#222222",
        pendingStatus: "#E0921E",
        completedStatus: "#2FA81F",
        bodyText: "#4C4D4F",
      },
    },

  },
  plugins: [],
}
