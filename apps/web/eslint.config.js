import { configs, defineConfig } from '@buildit/eslint'

export default defineConfig(
  ...configs.base,
  ...configs.next,
  ...configs.playwright,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
)
