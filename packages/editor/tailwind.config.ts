import type { Config } from 'tailwindcss'

import { BuildItTailwindPreset } from '@buildit/tailwind'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  presets: [BuildItTailwindPreset],
}

export default config
