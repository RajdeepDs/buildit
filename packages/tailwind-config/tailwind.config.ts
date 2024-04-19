import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        deep: "#05060C",
        faded: "#0C0D14",
        banner: "#171D35",
        soft: "#EEEFF1",
        white: "#FFFFFF",
        deepFaded: "#11131F",
        grey: {
          DEFAULT: "#9198AD",
          muted: "#707892",
          deep: "#707892",
        },
        indigo: {
          DEFAULT: "#435DB1",
          soft: "#C9D3EE",
          light: "#9EB1FF",
          medium: "#8BA5FF",
          accent: "#577EFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-helvetica-now-text)", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
