import { EFFECT } from './effect'
import type { BaseEffectOptions, EffectApi } from './types'

export interface CssGrayscaleEffectOptions extends BaseEffectOptions {
  css: boolean
  amount: number
}

export const cssGrayscale: EffectApi<CssGrayscaleEffectOptions> = {
  initial: {
    name: 'Grayscale',
    type: EFFECT.GRAYSCALE,
    css: true,
    amount: 4,
  },

  add({ amount }: CssGrayscaleEffectOptions) {
    return `grayscale(${amount}%) `
  },

  toArray: null,
  toObject: null,
}
