import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:jest/recommended',
    'prettier'
  ),
  {
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.browser,
        ...globals.node,
        document: 'readonly',
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      semi: ['error', 'always'],
    },
  },
  {
    ignores: [
      '**/node_modules/**',
      'dist/**',
      '**/*.html',
      '**/*.json',
      '**/*.css',
      '**/*.md',
      '**/*.yml',
      '**/*.scss',
    ],
  },
];
