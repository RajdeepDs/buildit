import sharedConfig from "@buildit/tailwind-config/tailwind.config";
import type { Config } from "tailwindcss";

const config: Config = {
  ...sharedConfig,
  content: [
    ...sharedConfig.content,
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*{.js,.ts,.jsx,.tsx}",
  ],
  theme: {
    ...sharedConfig.theme,
  },
};
export default config;
