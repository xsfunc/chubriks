import { EFFECT } from '../effects/effect'
import type { CssDropShadowEffectOptions, FilterProcessor } from './types'

export const cssDropShadow: FilterProcessor<CssDropShadowEffectOptions> = {
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
}
