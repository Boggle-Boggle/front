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
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'tailwind.config.cjs'],
  plugins: ['@typescript-eslint', 'react-refresh'],
  rules: {
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
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
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
            pattern:
              '{hooks,hooks/*,hooks/**/*,services,services/*,services/**/*,utils,utils/*,utils/**/*}',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '{types,types/*,types/**/*,}',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '{assets,assets/*,assets/**/*,}',
            group: 'internal',
            position: 'before',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'arrow-body-style': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
