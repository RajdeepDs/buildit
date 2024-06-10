import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const subtleColor = "#E5E7EB";
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
        emphasis: "var(--buildit-bg-emphasis)",
        default: "var(--buildit-bg, white)",
        subtle: "var(--buildit-bg-subtle)",
        muted: "var(--buildit-bg-muted)",
        inverted: "var(--buildit-bg-inverted)",
        info: "var(--buildit-bg-info)",
        success: "var(--buildit-bg-success)",
        attention: "var(--buildit-bg-attention)",
        error: "var(--buildit-bg-error)",
        darkerror: "var(--buildit-bg-dark-error)",
        black: "#111111",
        brand: {
          default: "var(--buildit-brand,#111827)",
          emphasis: "var(--buildit-brand-emphasis,#101010)",
          subtle: "var(--buildit-brand-subtle,#9CA3AF)",
          accent: "var(--buildit-brand-accent,white)",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        darkgray: {
          50: "#101010",
          100: "#1c1c1c",
          200: "#2b2b2b",
          300: "#444444",
          400: "#575757",
          500: "#767676",
          600: "#a5a5a5",
          700: "#d6d6d6",
          800: "#e8e8e8",
          900: "#f3f4f6",
        },
      },
      borderColor: {
        emphasis: "var(--buildit-border-emphasis, #9CA3AF)",
        default: "var(--buildit-border, #D1D5DB)",
        subtle: `var(--buildit-border-subtle, ${subtleColor})`,
        muted: "var(--buildit-border-muted, #F3F4F6)",
        booker: `var(--buildit-border-booker, ${subtleColor})`,
        error: "var(--buildit-border-error, #AA2E26)",
        focus: "var(--buildit-border-focus, #1A1A1A)",
        "buildit-bg": "var(--buildit-bg, white)",
        "buildit-bg-muted": "var(--buildit-bg-muted)",
      },
      textColor: {
        emphasis: "var(--buildit-text-emphasis, #111827)",
        default: "var(--buildit-text, #374151)",
        subtle: "var(--buildit-text-subtle, #6B7280)",
        muted: "var(--buildit-text-muted, #9CA3AF)",
        inverted: "var(--buildit-text-inverted, white)",
        info: "var(--buildit-text-info, #253985)",
        success: "var(--buildit-text-success, #285231)",
        attention: "var(--buildit-text-attention, #73321B)",
        error: "var(--buildit-text-error, #752522)",
        brand: "var(--buildit-brand-text,'white')",
      },
      fill: {
        emphasis: "var(--buildit-text-emphasis, #111827)",
        default: "var(--buildit-text, #374151)",
        subtle: "var(--buildit-text-subtle, #6B7280)",
        muted: "var(--buildit-text-muted, #9CA3AF)",
        inverted: "var(--buildit-text-inverted, white)",
        info: "var(--buildit-text-info, #253985)",
        success: "var(--buildit-text-success, #285231)",
        attention: "var(--buildit-text-attention, #73321B)",
        error: "var(--buildit-text-error, #752522)",
        brand: "var(--buildit-brand-text)",
      },
      fontFamily: {
        cal: ["var(--font-cal)", ...fontFamily.serif],
        sans: ["var(--font-inter)", ...fontFamily.sans],
        mono: ["Roboto Mono", "monospace"],
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
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
