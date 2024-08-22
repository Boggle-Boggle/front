/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        main: '#CBBAB9',
        main2: '#DCD7D6',
        font: '#387156',
      },

      boxShadow: {
        navigator: '0 -3px 6px -2px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
