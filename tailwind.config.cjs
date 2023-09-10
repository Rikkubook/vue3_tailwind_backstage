/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    themeVariants: ['indigo'],
    extend: {
      colors:{
        gray: colors.zinc, //把gray改為預設zinc
        'great-blue': {  
          DEFAULT: '#2A669F',
          50: '#E4F7F8',
          100: '#CCEEF2',
          200: '#9CD7E5',
          300: '#6CB9D8',
          400: '#3B94CB',
          500: '#2A669F',
          600: '#234B83',
          700: '#1B3366',
          800: '#14204A',
          900: '#0C102E'
        },
      },
      fontFamily:{
        sans:['Noto Sans TC', ...fontFamily.sans] //添無趁線加字體
      },
      boxShadow: {
        'lg-top': '0 -10px 15px -3px rgb(0 0 0 / 0.1), 0 -4px 6px -4px rgb(0 0 0 / 0.1);'
      },
      typography: theme=> ({
        dark: {
          css: {
            color: theme('colors.gray.300'),
            'h1,h2,h3,h4': {color: theme('colors.gray.200')},
            a:{color: theme('colors.stone.400')},
            strong:{
              color: theme('colors.gray.200')
            },
            blockquote:{
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.stone.300')
            }
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-multi-theme'),
  ],
}
