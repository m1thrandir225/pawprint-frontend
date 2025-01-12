/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'
export default {
  content: ['./src/**/*.{vue,js,ts}', './formkit.theme.ts'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        onBackground: 'var(--on-background)',
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
  plugins: [typography],
}
