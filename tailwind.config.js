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
    extend: {
      colors: {
        background: 'var(--background)',
        onBackground: 'var(--onBackground)',
        main: 'var(--main)',
        onMain: 'var(--on-main)',
        secondary: 'var(--secondary)',
        onSecondary: 'var(--on-secondary)',
        tertiary: 'var(--tertiary)',
        onTertiary: 'var(--on-tertiary)',
        mainContainer: 'var(--main-container)',
        onMainContainer: 'var(--on-main-container)',
        secondaryContainer: 'var(--secondary-container)',
        onSecondaryContainer: 'var(--on-secondary-container)',
        teritaryContainer: 'var(--teritary-container)',
        onTertiaryContainer: 'var(--on-tertiary-container)',
        outline: 'var(--outline)',
        error: 'var(--error)',
      },
      fontFamily: {
        generalSans: 'var(--generalsans-font)',
        splieSans: 'var(--spline-font)',
      },
    },
  },
  plugins: [typography, daisyui, vueForms],
  daisyui: {
    themes: ['fantasy'],
  },
}
