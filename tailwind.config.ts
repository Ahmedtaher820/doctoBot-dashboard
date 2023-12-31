import type { Config } from 'tailwindcss'
const tailwindcss = require('tailwindcss');

// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
const primary = {
  DEFAULT: '#595CFF',
  600:'#595cffd4',
  400:'#595cff94',
  200:'#595cff47',
  100:'#595cff33'
}
const bodyColorLight = {
  DEFAULT : '#F5F5F5'
}
const bodyColorDark = {
  DEFAULT : '#0f172a'
} 
const textColor = {
  DEFAULT: '#707070',
}
export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend:{
      colors:{
        primary,
        textColor,
        bodyColorLight,
        bodyColorDark
      }
    }
  },
  // plugins: [
  //   tailwindcss,
    
  // ],
  //   content: ['./public/**/*.html', './src/**/*.vue', './src/main.js'],
  // purge:['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
}
