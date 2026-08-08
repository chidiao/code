import { defineConfig } from 'unocss'
import { presetWind4 } from '@unocss/preset-wind4'
import { presetIcons } from '@unocss/preset-icons'

export default defineConfig({
  presets: [presetWind4(), presetIcons()],
  content: {
    pipeline: {
      include: [
        /\.(vue|ts|tsx|js|jsx|mdx?|html|css)($|\?)/,
      ],
    },
  },
  theme: {
    colors: {
      brand: {
        DEFAULT: '#38bdf8',
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      },
    },
  },
  shortcuts: {
    'btn-solid': 'inline-flex items-center justify-center gap-1 rounded-lg bg-brand-500 text-white hover:bg-brand-400 active:bg-brand-600 transition-colors disabled:opacity-50 disabled:pointer-events-none',
    'btn-outline': 'inline-flex items-center justify-center gap-1 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-600 hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:pointer-events-none',
    'btn-ghost': 'inline-flex items-center justify-center gap-1 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50 disabled:pointer-events-none',
    'card': 'rounded-xl border border-slate-800 bg-slate-900',
  },
})