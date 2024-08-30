const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0' }],
        'sm': ['14px', { lineHeight: '20px', letterSpacing: '0' }],
        'base': ['16px', { lineHeight: '24px', letterSpacing: '0' }],
        'lg': ['18px', { lineHeight: '28px', letterSpacing: '0' }],
        'xl': ['20px', { lineHeight: '28px', letterSpacing: '0' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '0' }],
        '3xl': ['30px', { lineHeight: '36px', letterSpacing: '0' }],
        '4xl': ['36px', { lineHeight: '40px', letterSpacing: '0' }],
        '5xl': ['48px', { lineHeight: '48px', letterSpacing: '-0.02em' }],
        '6xl': ['60px', { lineHeight: '60px', letterSpacing: '-0.02em' }],
        '7xl': ['72px', { lineHeight: '72px', letterSpacing: '-0.02em' }],
        '8xl': ['96px', { lineHeight: '96px', letterSpacing: '-0.02em' }],
        '9xl': ['128px', { lineHeight: '128px', letterSpacing: '-0.02em' }],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [],
}