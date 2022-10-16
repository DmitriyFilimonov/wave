module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb'
  ],
  overrides: [
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ["tsconfig.json"]
  },
  plugins: [
    'react', '@typescript-eslint', 'prettier'
  ],
  rules: {
  }
}
