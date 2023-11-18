module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    // Estilo y formato
    indent: ['error', 2],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'linebreak-style': ['error', 'unix'],

    // Buenas prácticas y consistencia
    'no-unused-vars': 'warn',

    // React
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  }
};
