/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: "var(--background)"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

