/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html', './.storybook/**/*.{js,ts,jsx,tsx}'],
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
        warning: '#E3B92E',
        danger: '#fc6533',

        // 블랙
        'neutral-100': '#303030',
        'neutral-80': '#555555',
        'neutral-60': '#888888',
        'neutral-40': '#cacaca',
        'neutral-20': '#eeeeee',
        'neutral-0': '#ffffff',

        // 기존 컬러(삭제예정)
        main: '#EEEDEB',
        accent: '#E6B9A6',
        sub: '#939185',
        text: '#2F3645',
        gray: '#DCD7D6',
        red: '#D62321',
      },

      fontFamily: {
        book: ['Gyeonggi_Title_Medium', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
        serif: ['MaruBuri', 'sans-serif'],
      },
      fontSize: {
        h1: ['1.75rem', { fontWeight: '700', lineHeight: '140%' }],
        h2: ['1.75rem', { fontWeight: '300', lineHeight: '140%' }],
        h3: ['1.375rem', { fontWeight: '300', lineHeight: '140%' }],
        title1: ['1.375rem', { fontWeight: '700', lineHeight: '140%' }],
        title2: ['1.25rem', { fontWeight: '700', lineHeight: '140%' }],
        title3: ['1rem', { fontWeight: '700', lineHeight: '140%' }],
        body1: ['1rem', { fontWeight: '500', lineHeight: '140%' }],
        body2: ['0.875rem', { fontWeight: '700', lineHeight: '140%' }],
        caption1: ['0.875rem', { fontWeight: '500', lineHeight: '140%' }],
        caption2: ['0.875rem', { fontWeight: '300', lineHeight: '140%' }],
      },

      spacing: {
        mobile: '1rem',
        tablet: '2.5rem',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',

        'icon-sm': '1rem',
        'icon-md': '1.5rem',
        'icon-lg': '2rem',

        // 기존 spacing(삭제예정)
        headerIOS: '6rem',
        headerAnd: '4rem',
        footerIOS: '6rem',
        footerAnd: '5.5rem',
      },
      maxWidth: {
        mobile: '37.5rem',
      },
      zIndex: {
        // modal: '',
        toast: '700',
        header: '500',
        navigator: '500',
        fixedBtn: '500',
        highlight: '100',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        fadeOut: 'fadeOut 0.3s ease-out forwards',
      },

      // 타블렛 반응형(추가 예정)
      // screens: {
      //   mobile: { max: '600px' },
      //   tablet: { min: '601px', max: '1200px' },
      // }
    },
  },
};
