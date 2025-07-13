import js from '@eslint/js';

export default [
  {
    ...js.configs.recommended,
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: require('globals'),
    },
    plugins: {
      'react-hooks': require('eslint-plugin-react-hooks'),
      'react-refresh': require('eslint-plugin-react-refresh'),
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
];