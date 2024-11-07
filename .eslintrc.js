/** @type {import('eslint').Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'no-unused-vars': 'warn', // Treat unused variables as warnings
    '@typescript-eslint/no-unused-vars': ['warn'], // Specifically for TypeScript
    // Add any other shared rules here
  },
  overrides: [
    {
      files: ['backend/**/*.{ts,js}'],
      // Backend-specific rules
    },
    {
      files: ['frontend/**/*.{ts,js,jsx}'],
      // Frontend-specific rules (if needed)
    },
  ],
};

module.exports = config;
