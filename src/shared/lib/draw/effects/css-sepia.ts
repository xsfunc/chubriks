import { EFFECT } from './effect'
import type { BaseEffectOptions, EffectApi } from './types'

export interface CssSepiaEffectOptions extends BaseEffectOptions {
  css: boolean
  amount: number
}

export const cssSepia: EffectApi<CssSepiaEffectOptions> = {
  initial: {
    name: 'Sepia',
    type: EFFECT.SEPIA,
    css: true,
    amount: 4,
  },

  add({ amount }: CssSepiaEffectOptions) {
    return `sepia(${amount}%) `
  },

  toArray: null,
  toObject: null,
}
