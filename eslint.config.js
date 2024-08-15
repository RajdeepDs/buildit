import { configs, defineConfig } from '@buildit/eslint'

export default defineConfig(
  {
    ignores: ['apps', 'packages'],
  },

  ...configs.base,

  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
)
