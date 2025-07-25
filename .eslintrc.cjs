module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'prettier',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: ['dist', '*.cjs', 'vite.config.js'],
  plugins: ['@typescript-eslint', 'react-refresh'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': ['error', { ignore: ['intensity', 'position', 'object'] }],
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/require-default-props': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: '{@*,@**/*}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '{react*}',
            group: 'external',
            position: 'after',
          },
          {
            pattern:
              '{pages,pages/*,pages/**/*,layouts,layouts/*,layouts/**/*,components,components/*,components/**/*}',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '{store,store/*,store/**/*}',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '{hooks,hooks/*,hooks/**/*,services,services/*,services/**/*,utils,utils/*,utils/**/*}',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '{types,types/*,types/**/*,}',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '{assets,assets/*,assets/**/*,**/**/css}',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '{constants,constants/*,constants/**/*}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '{./*.module,./*.module.scss,*.css,*.scss}',
            group: 'sibling',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: [],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'arrow-body-style': 'off',
    'no-alert': 'off',
    'no-nested-ternary': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'consistent-return': 'off',
  },
};
