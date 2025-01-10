/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'
import typography from '@tailwindcss/typography'
import vueForms from '@vueform/vueform/tailwind'
export default {
  content: [
    './src/**/*.{vue,js,ts}',
    './vueform.config.js', // or where `vueform.config.js` is located. Change `.js` to `.ts` if required.
    './node_modules/.pnpm/@vueform+vueform@*/node_modules/@vueform/vueform/themes/tailwind/**/*.vue',
    './node_modules/.pnpm/@vueform+vueform@*/node_modules/@vueform/vueform/themes/tailwind/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui, vueForms],
  daisyui: {
    themes: ['fantasy'],
  },
}
