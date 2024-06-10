/** @typedef  {import("prettier").Config} PrettierConfig */

/** @type { PrettierConfig | SortImportsConfig } */
const config = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  tailwindFunctions: ["clsx", "cva"],

  // Last version that doesn't squash type and value imports
  importOrderTypeScriptVersion: "4.4.0",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@buildit/(.*)$",
    "^buildit/(.*)$",
    "",
    "^@/(.*)$",
    "^[./]",
  ],
  proseWrap: "always", // printWidth line breaks in md/mdx
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};

module.exports = config;
