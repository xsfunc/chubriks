import type { EFFECT } from './effect'
import type { SvgBlurEffectOptions } from './svg-blur'

export type EffectType = typeof EFFECT[keyof typeof EFFECT]

export type EffectOptions = SvgBlurEffectOptions
