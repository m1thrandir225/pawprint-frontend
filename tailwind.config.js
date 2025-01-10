/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';
import typography from '@tailwindcss/typography'
export default {
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: ["fantasy"]
  }
}
