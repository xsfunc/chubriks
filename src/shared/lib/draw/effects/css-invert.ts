import { EFFECT } from './effect'
import type { BaseEffectOptions, EffectApi } from './types'

export interface CssInvertEffectOptions extends BaseEffectOptions {
  css: boolean
  amount: number
}

export const cssInvert: EffectApi<CssInvertEffectOptions> = {
  initial: {
    name: 'Invert',
    type: EFFECT.INVERT,
    css: true,
    amount: 4,
  },

  add({ amount }: CssInvertEffectOptions) {
    return `invert(${amount}%) `
  },

  toArray: null,
  toObject: null,
}
