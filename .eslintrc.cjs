/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: ["@buildit"], // uses the config in `packages/eslint-config/eslint`
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    tsconfigRootDir: __dirname,
  },
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};

module.exports = config;
