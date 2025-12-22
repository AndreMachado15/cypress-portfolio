import js from '@eslint/js'
import cypress from 'eslint-plugin-cypress'
import prettier from 'eslint-config-prettier'

export default [
  // =====================================================
  // 1. Global ignores (substitui .eslintignore)
  // =====================================================
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'cypress/videos/**',
      'cypress/screenshots/**',
      '.eslintrc.js',
    ],
  },

  // =====================================================
  // 2. Base JavaScript rules
  // =====================================================
  js.configs.recommended,

  // =====================================================
  // 3. Cypress config files (Node.js context)
  // =====================================================
  {
    files: ['cypress.config.{js,ts}'],
    languageOptions: {
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^(on|config)$',
        },
      ],
    },
  },

  // =====================================================
  // 4. Cypress test files
  // =====================================================
  {
    files: ['cypress/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      cypress,
    },
    languageOptions: {
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
        after: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {
      // Cypress best practices
      'cypress/no-unnecessary-waiting': 'warn',
      'cypress/no-force': 'warn',
      'cypress/no-assigning-return-values': 'error',

      // Common test adjustments
      'no-unused-expressions': 'off',
      'no-console': 'off',
    },
  },

  // =====================================================
  // 5. Prettier (sempre por último)
  // =====================================================
  prettier,
]
