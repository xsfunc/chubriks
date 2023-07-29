import type { CssDropShadowEffectOptions } from './css-drop-shadow'
import type { CssGrayscaleEffectOptions } from './css-grayscale'
import type { CssInvertEffectOptions } from './css-invert'
import type { CssOpacityEffectOptions } from './css-opacity'
import type { EFFECT } from './effect'
import type { SvgBlurEffectOptions } from './svg-blur'
import type { ConvolveMatrixEffectOptions } from './svg-convolve-matrix'
import type { DisplacementEffectOptions } from './svg-displacement'
import type { TurbulenceEffectOptions } from './svg-turbulence'

export type EffectType = typeof EFFECT[keyof typeof EFFECT]
export type EffectOptions = SvgBlurEffectOptions
| TurbulenceEffectOptions
| DisplacementEffectOptions
| ConvolveMatrixEffectOptions
| CssDropShadowEffectOptions
| CssGrayscaleEffectOptions
| CssInvertEffectOptions
| CssOpacityEffectOptions

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
