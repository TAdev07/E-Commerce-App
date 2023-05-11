module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        endOfLine: 'auto',
      },
    ],
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'func-names': 'off',
    'no-plusplus': 'off',
    'no-process-exit': 'off',
    'class-methods-use-this': 'off',
  },
  plugins: ['prettier'],
};
