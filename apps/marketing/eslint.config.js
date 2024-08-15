import { configs, defineConfig } from '@buildit/eslint'

export default defineConfig(
  ...configs.base,
  ...configs.react,
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
