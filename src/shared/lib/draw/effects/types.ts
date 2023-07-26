import type { CssDropShadowEffectOptions } from './css-drop-shadow'
import type { CssGrayscaleEffectOptions } from './css-grayscale'
import type { EFFECT } from './effect'
import type { SvgBlurEffectOptions } from './svg-blur'

export type EffectType = typeof EFFECT[keyof typeof EFFECT]
export type EffectOptions = SvgBlurEffectOptions
| CssDropShadowEffectOptions
| CssGrayscaleEffectOptions

export interface EffectApi<T extends EffectOptions> {
  initial: T
  add: (options: T) => any
  toArray: any
  toObject: any
}
export interface BaseEffectOptions {
  type: EffectType
  name: string
}
