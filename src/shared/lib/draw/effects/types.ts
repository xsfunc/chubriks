import type { effectsList } from './create-effect'
import type { SvgBlurEffectOptions } from './svg-blur'

export type EffectType = typeof effectsList[number]

export type EffectsFnMap = {
  [Key in EffectType]: (options: EffectOptions) => void
}

export type EffectOptions = SvgBlurEffectOptions
