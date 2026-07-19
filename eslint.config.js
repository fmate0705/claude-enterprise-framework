import js from '@eslint/js';
import tseslint from 'typescript-eslint';

/**
 * Flat ESLint config for the CEF monorepo (ESM).
 *
 * Non-type-checked TypeScript linting keeps the base of the testing pyramid fast
 * (AS-020 BLD-01…BLD-03). Type correctness is enforced separately by `tsc` in the
 * `typecheck` script, so `no-undef` is delegated to the type checker.
 */
export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/*.tsbuildinfo', '.claude/**', 'examples/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
    },
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
);
