import { filters } from './constants'
import type { CssOpacityEffectOptions, FilterProcessor } from './types'

export const cssOpacity: FilterProcessor<CssOpacityEffectOptions> = {
  initial: {
    name: 'Opacity',
    type: filters.OPACITY,
    css: true,
    amount: 4,
  },
  add({ amount }: CssOpacityEffectOptions) {
    return `opacity(${100 - amount}%) `
  },

}
