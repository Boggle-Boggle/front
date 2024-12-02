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
      },
      boxShadow: {
        navigator: '0 -3px 6px -2px rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        header: '64px',
        footer: '84px',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
