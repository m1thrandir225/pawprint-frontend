import animate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export const darkMode = ['class']
export const safelist = ['dark']
export const prefix = ''
export const content = [
  './pages/**/*.{ts,tsx,vue}',
  './components/**/*.{ts,tsx,vue}',
  './app/**/*.{ts,tsx,vue}',
  './src/**/*.{ts,tsx,vue}',
]
export const theme = {
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
    },
  },
  extend: {
    backgroundImage: {
      userRegisterCard: 'url("/register-user-card-bg.jpg")',
      shelterRegisterCard: 'url("/register-shelter-card-bg.jpg")',
    },
    fontFamily: {
      generalSans: 'var(--generalsans-font)',
      splieSans: 'var(--spline-font)',
      balooBahijaan: 'var(--baloo-font)',
    },
    colors: {
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      primaryContainer: {
        DEFAULT: 'hsl(var(--primary-container))',
        foreground: 'hsl(var(--primary-container-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      secondaryContainer: {
        DEFAULT: 'hsl(var(--secondary-container))',
        foreground: 'hsl(var(--secondary-container-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      accentContainer: {
        DEFAULT: 'hsl(var(--accent-container))',
        foreground: 'hsl(var(--accent-container-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
    },
    borderRadius: {
      xl: 'calc(var(--radius) + 4px)',
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
    keyframes: {
      'accordion-down': {
        from: { height: 0 },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: 0 },
      },
      'collapsible-down': {
        from: { height: 0 },
        to: { height: 'var(--radix-collapsible-content-height)' },
      },
      'collapsible-up': {
        from: { height: 'var(--radix-collapsible-content-height)' },
        to: { height: 0 },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
      'collapsible-down': 'collapsible-down 0.2s ease-in-out',
      'collapsible-up': 'collapsible-up 0.2s ease-in-out',
    },
  },
}
export const plugins = [animate, typography]
