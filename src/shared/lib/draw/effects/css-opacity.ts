import { EFFECT } from './effect'
import type { BaseEffectOptions, EffectApi } from './types'

export interface CssOpacityEffectOptions extends BaseEffectOptions {
  css: boolean
  amount: number
}

export const cssOpacity: EffectApi<CssOpacityEffectOptions> = {
  initial: {
    name: 'Opacity',
    type: EFFECT.OPACITY,
    css: true,
    amount: 4,
  },

  add({ amount }: CssOpacityEffectOptions) {
    return `opacity(${100 - amount}%) `
  },

  toArray: null,
  toObject: null,
}
