/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        // 메인 테마
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        secondary: 'var(--color-secondary)',
        'secondary-light': 'var(--color-secondary-light)',

        // 시스템 컬러
        information: '#2c80ff',
        warning: '#ffd900',
        success: '#8bcfa7',
        danger: '#fc6533',

        // 블랙
        black: '#303030',
        'neutral-80': '#555555',
        'neutral-60': '#888888',
        'neutral-40': '#cacaca',
        'neutral-20': '#eeeeee',
        white: '#ffffff',
      },
      fontSize: {
        h1: ['1.75rem', { fontWeight: '700' }],
        title: ['1.375rem', { fontWeight: '700' }],
        body: ['1rem', { fontWeight: '500' }],
        caption: ['0.875rem', { fontWeight: '500' }],
      },
      spacing: {
        mobile: '16px',
        tablet: '40px',
      },
      // 타블렛 반응형
      // screens: {
      //   mobile: { max: '600px' },
      //   tablet: { min: '601px', max: '1200px' },
      // },
      /////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////
      //                           레거시 코드                          //
      /////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////
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
        pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  // plugins: [require('@tailwindcss/line-clamp')],
};
