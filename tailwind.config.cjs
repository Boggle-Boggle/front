/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        mainLightGray: '#EEEDEB',
        mainDartGray: '#DCD7D6',
        accent: '#E6B9A6',
        sub: '#939185',
        text: '#2F3645',
        green: '#4BAA64',
        red: '#E2574C',
      },
      boxShadow: {
        navigator: '0 -3px 6px -2px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
