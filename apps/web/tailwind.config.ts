import type { Config } from 'tailwindcss'

import { withUt } from 'uploadthing/tw'

import { BuildItTailwindPreset } from '@buildit/tailwind'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', '../../packages/ui/dist/**/*.js'],
  darkMode: 'class',
  presets: [BuildItTailwindPreset],
}

export default withUt(config)
