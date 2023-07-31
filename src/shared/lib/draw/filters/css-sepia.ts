import { filters } from './constants'
import type { CssSepiaEffectOptions, FilterProcessor } from './types'

export const cssSepia: FilterProcessor<CssSepiaEffectOptions> = {
  initial: {
    name: 'Sepia',
    type: filters.SEPIA,
    css: true,
    amount: 4,
  },
  add({ amount }: CssSepiaEffectOptions) {
    return `sepia(${amount}%) `
  },
}
