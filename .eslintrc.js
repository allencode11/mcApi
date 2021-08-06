module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        useTabs: false,
        tabWidth: 2,
        singleQuote: true,
        semi: true,
        trailingComma: 'all',
        printWidth: 120,
      },
    ],
    'function-call-argument-newline': 'off',
    'newline-per-chained-call': 'off',
  },
};
