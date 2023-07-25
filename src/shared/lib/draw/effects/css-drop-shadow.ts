import { EFFECT } from './effect'
import type { EffectType } from './types'

export interface CssDropShadowEffectOptions {
  type: EffectType
  name: string
  css: boolean
  xOffset: number
  yOffset: number
  blurRadius: number
}

export const cssDropShadow: { initial: CssDropShadowEffectOptions; add: any; toArray: any; toObject: any } = {
  initial: {
    name: 'Drop shadow',
    type: EFFECT.DROP_SHADOW,
    css: true,
    xOffset: 1,
    yOffset: 1,
    blurRadius: 10,
  },

  add({ xOffset, yOffset, blurRadius }: CssDropShadowEffectOptions) {
    return `drop-shadow(${xOffset}px ${yOffset}px ${blurRadius}px #000000) `
  },

  toArray: null,
  toObject: null,
}
