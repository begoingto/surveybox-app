/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./public/**/*.html",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        'cyan': {
          50: '#f4f8fd',
          100: '#e8f1fb',
          200: '#c6ddf4',
          300: '#a3c8ed',
          400: '#5e9fe0',
          500: '#1976d2',
          600: '#005dc5',
          700: '#0154B6',
          800: '#0f477e',
          900: '#0c3a67'
        }
      },
      fontWeight: {
        hairline: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        'extra-bold': '800',
        black: '900'
      },
      fontFamily: {
        'sans': ['Kantumruy Pro', ...defaultTheme.fontFamily.sans],
        'kantumruy': ['kantumruy', 'sans-serif'],
      },
      fontSize:{
        'xls': ['1.31rem', {
          lineHeight: '2rem',
        }],
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar')
  ],
}