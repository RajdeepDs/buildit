import aspectRatio from '@tailwindcss/aspect-ratio'
import containerQueries from '@tailwindcss/container-queries'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'
import { fontFamily } from 'tailwindcss/defaultTheme'
import { createPlugin } from 'windy-radix-palette'
import windyTypography from 'windy-radix-typography'

import { type Config } from 'tailwindcss'

const colors = createPlugin()

export const BuildItTailwindPreset: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  presets: [windyTypography],
  theme: {
    extend: {
      colors: {
        strong: '#0E121B',
        surface: '#222530',
        sub: '#CACFD8',
        soft: '#E1E4EA',
        weak: '#F5F7FA',
        white: '#FFFFFF',
        black: '#0E121B',
        information: {
          lighter: '#EBF1FF',
          light: '#C0D5FF',
          DEFAULT: '#335CFF',
          dark: '#122368',
        },
        warning: {
          lighter: '#FFF1EB',
          light: '#FFD5C0',
          DEFAULT: '#FF8447',
          dark: '#682F12',
        },
        success: {
          lighter: '#E0FAEC',
          light: '#C2F5DA',
          DEFAULT: '#1FC16B',
          dark: '#0B4627',
        },
        error: {
          lighter: '#FFEBEC',
          light: '#FFC0C5',
          DEFAULT: '#FB3748',
          dark: '#681219',
        },
      },
      textColor: {
        strong: '#0E121B',
        sub: '#525866',
        soft: '#99A0AE',
        disabled: '#CACFD8',
        white: '#FFFFFF',
      },
      borderColor: {
        strong: '#0E121B',
        sub: '#CACFD8',
        soft: '#E1E4EA',
        white: '#FFFFFF',
      },

      borderRadius: {
        radius: '0.5rem',
      },
      fontFamily: {
        cal: ['var(--font-cal)', ...fontFamily.serif],
        sans: ['var(--font-inter)', ...fontFamily.sans],
        mono: ['Roboto Mono', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  plugins: [
    animate,
    typography,
    forms,
    aspectRatio,
    {
      config: colors.plugin.config ?? {},
      handler: colors.plugin.handler,
    },
    {
      config: containerQueries.config ?? {},
      handler: containerQueries.handler,
    },
  ],
}
