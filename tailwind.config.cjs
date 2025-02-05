/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        main: '#EEEDEB',
        accent: '#E6B9A6',
        sub: '#939185',
        text: '#2F3645',
        gray: '#DCD7D6',
        red: '#D62321',
      },
      boxShadow: {
        navigator: '0 -3px 6px -2px rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        headerIOS: '6rem',
        headerAnd: '4rem',
        footerIOS: '6rem',
        footerAnd: '5.5rem',
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
      },
      fontFamily: {
        book: ['HakgyoansimNadeuriTTF-B', 'sans-serif'],
      },
    },
  },
  // plugins: [require('@tailwindcss/line-clamp')],
};
