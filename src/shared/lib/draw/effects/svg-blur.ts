import { EFFECT } from './effect'
import type { EffectApi } from './types'

export interface SvgBlurEffectOptions {
  type: typeof EFFECT.BLUR
  name: string
  x: number
  y: number
}

export const svgBlur: EffectApi<SvgBlurEffectOptions> = {
  add({ x, y }: SvgBlurEffectOptions) {
    // @ts-expect-error incorrect types
    return add => add.gaussianBlur(x, y)
  },

  initial: {
    name: 'Blur',
    type: EFFECT.BLUR,
    x: 5,
    y: 0,
  },

  toArray: null,
  toObject: null,
}
