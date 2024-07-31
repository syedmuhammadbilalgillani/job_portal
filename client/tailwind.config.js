/** @type {import('tailwindcss').Config} */

import { list } from 'postcss';

const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      screens: {
        'md-to-xs': { 'min': '50px', 'max': '991px' },
        'sm-to-xs': { 'min': '50px', 'max': '767px' },
        'xs': { 'min': '50px', 'max': '576px' },
        'sm': { 'min': '576px', 'max': '767px' },
        'md': { 'min': '768px', 'max': '991px' },
        'lg': { 'min': '992px', 'max': '1200px' },
        '1xl': { 'min': '1200px', 'max': '1535px' },
        '2xl': { 'min': '9999px' },
      },

    },
  },
  corePlugins: {
    // List style type utility ko disable karne ke liye
    // listStyleType: false,

    // Agar aapko kisi aur utility ko disable karna hai, toh use bhi false set karein
    // Example:
    // float: false,
    // margin: false,
  },
  plugins: [
    require('flowbite/plugin')
  ]
})