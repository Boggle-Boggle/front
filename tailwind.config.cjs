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
        warning: '#FFE23C',
        danger: '#fc6533',

        // 블랙
        'neutral-100': '#303030',
        'neutral-80': '#555555',
        'neutral-60': '#888888',
        'neutral-40': '#cacaca',
        'neutral-20': '#eeeeee',
        'neutral-0': '#ffffff',
      },

      fontFamily: {
        book: ['Gyeonggi_Title_Medium', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
        serif: ['MaruBuri', 'sans-serif'],
      },

      fontSize: {
        h1: ['1.75rem', { fontWeight: '700', lineHeight: '130%' }],
        h2: ['1.75rem', { fontWeight: '300', lineHeight: '130%' }],
        h3: ['1.375rem', { fontWeight: '300', lineHeight: '135%' }],
        title1: ['1.375rem', { fontWeight: '700', lineHeight: '140%' }],
        title2: ['1.25rem', { fontWeight: '700', lineHeight: '140%' }],
        title3: ['1.125rem', { fontWeight: '500', lineHeight: '140%' }],
        title4: ['1rem', { fontWeight: '700', lineHeight: '140%' }],
        body1: ['1rem', { fontWeight: '500', lineHeight: '140%' }],
        body2: ['0.875rem', { fontWeight: '700', lineHeight: '140%' }],
        caption1: ['0.875rem', { fontWeight: '500', lineHeight: '140%' }],
        caption2: ['0.875rem', { fontWeight: '300', lineHeight: '140%' }],
        caption2: ['0.75rem', { fontWeight: '300', lineHeight: '120%' }],
      },

      spacing: {
        mobile: '1rem',
        tablet: '2.5rem',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',

        header: '3rem',

        'icon-sm': '1rem',
        'icon-md': '1.5rem',
        'icon-lg': '2rem',
        'icon-navigation': '1.75rem',
      },

      maxWidth: {
        mobile: '37.5rem',
      },

      zIndex: {
        toast: '700',
        layer: '600',
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
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        fadeInSlow: 'fadeIn 0.3s ease-out forwards',
        fadeOutSlow: 'fadeOut 0.3s ease-out forwards',
        fadeIn: 'fadeIn 0.1s ease-out forwards',
        fadeOut: 'fadeOut 0.1s ease-out forwards',
        slideUp: 'slideUp 0.1s ease-out forwards',
        slideDown: 'slideDown 0.1s ease-out forwards',
        slideLeft: 'slideLeft 0.1s ease-out forwards',
        slideRight: 'slideRight 0.1s ease-out forwards',
      },

      // 타블렛 반응형(추가 예정)
      // screens: {
      //   mobile: { max: '600px' },
      //   tablet: { min: '601px', max: '1200px' },
      // }
    },
  },
};
