const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
      },
      transformOrigin: {
        0: '0%',
      },
      boxShadow: {
        't-sm': '0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
        't-md':
          '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        't-lg':
          '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        't-xl':
          '0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        't-2xl': '0 -25px 50px -12px rgba(0, 0, 0, 0.25)',
        't-3xl': '0 -35px 60px -15px rgba(0, 0, 0, 0.3)',
        'inner-md':
          'inset 0 1px 3px 0 rgb(0 0 0 / 0.1), inset 0 1px 2px -1px rgb(0 0 0 / 0.1);',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      keyframes: {
        slideX: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        growing: {
          '0%': { transform: 'scale(1)' },
          '60%': { transform: 'scale(1.025)' },
          '100%': { transform: 'scale(1)' },
        },
        wave: {
          '0%': { transform: 'translate(-50%, 0) rotateZ(0deg)' },
          '50%': { transform: 'translate(-50%, -2%) rotateZ(180deg)' },
          '100%': { transform: 'translate(-50%, 0) rotateZ(360deg)' },
        },
        grow: {
          '0%': { transform: 'scale(0)' },
          '60%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        slideX: 'slideX 2.5s infinite',
        fadeIn: 'fadeIn 2.5s forwards',
        fadeOut: 'fadeOut 2.5s forwards',
        growing: 'growing 4s infinite',
        grow: 'grow .5s forwards',
        wave: 'wave 10s infinite',
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-safe-area'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
  darkMode: 'class',
};
