import { filters } from './constants'
import type { CssGrayscaleEffectOptions, FilterProcessor } from './types'

export const cssGrayscale: FilterProcessor<CssGrayscaleEffectOptions> = {
  initial: {
    name: 'Grayscale',
    type: filters.GRAYSCALE,
    css: true,
    amount: 4,
  },
  add({ amount }: CssGrayscaleEffectOptions) {
    return `grayscale(${amount}%) `
  },
}
