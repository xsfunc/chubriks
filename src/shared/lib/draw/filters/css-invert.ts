import { filters } from './constants'
import type { CssInvertEffectOptions, FilterProcessor } from './types'

export const cssInvert: FilterProcessor<CssInvertEffectOptions> = {
  initial: {
    name: 'Invert',
    type: filters.INVERT,
    css: true,
    amount: 4,
  },
  add({ amount }: CssInvertEffectOptions) {
    return `invert(${amount}%) `
  },
}
