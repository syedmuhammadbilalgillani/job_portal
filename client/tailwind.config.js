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
        'md-to-xs': { 'min': '3.125rem', 'max': '61.9375rem' },
        'sm-to-xs': { 'min': '3.125rem', 'max': '47.9375rem' },
        'xs': { 'min': '3.125rem', 'max': '36rem' },
        'sm': { 'min': '36rem', 'max': '47.9375rem' },
        'md': { 'min': '48rem', 'max': '61.9375rem' },
        'lg': { 'min': '62rem', 'max': '75rem' },
        '1xl': { 'min': '75rem', 'max': '95.9375rem' },
        '2xl': { 'min': '624.9375rem' },
      },

      // screens: {
      //   'md-to-xs': { 'min': '50px', 'max': '991px' },
      //   'sm-to-xs': { 'min': '50px', 'max': '767px' },
      //   'xs': { 'min': '50px', 'max': '576px' },
      //   'sm': { 'min': '576px', 'max': '767px' },
      //   'md': { 'min': '768px', 'max': '991px' },
      //   'lg': { 'min': '992px', 'max': '1200px' },
      //   '1xl': { 'min': '1200px', 'max': '1535px' },
      //   '2xl': { 'min': '9999px' },
      // },

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
    require('flowbite/plugin'),
    // function ({ addBase, theme }) {
    //   addBase({
    //     'h1': {
    //       // fontSize: theme('fontSize.2xl'),
    //     },
    //     'h2': {
    //       // fontSize: theme('fontSize.xl'),
    //     },
    //   });
    // }
  ],
})