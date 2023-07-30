import type { FE, feBlendMode } from './constants'

// export type EffectType = typeof EFFECT[keyof typeof EFFECT]
// export type EffectOptions = SvgBlurEffectOptions
// | TurbulenceEffectOptions
// | DisplacementEffectOptions
// | ConvolveMatrixEffectOptions
// | CssDropShadowEffectOptions
// | CssGrayscaleEffectOptions
// | CssInvertEffectOptions
// | CssOpacityEffectOptions

export type FeType = typeof FE[keyof typeof FE]
export interface FeProcessor<T extends FeOptions, S extends FeSerialized> {
  initial: Omit<T, 'id'>
  add: (options: T) => any
  serialize: (options: T) => S
  deserialize: (data: S) => T
}
export type FeOptions = FeBlendOptions
| FeBlurOptions
| FeTurbulenceOptions
| FeDisplacementOptions
export type FeSerialized = FeBlendSerialized
| FeBlurSerialized
| FeTurbulenceSerialized
| FeDisplacementSerialized

type FeId = number
type FeIn = null | string
type FeIn2 = null | string
type FeResult = null | string

export interface BaseFe {
  id: number
  type: FeType
  in1: FeIn
  result: FeResult
}

export type FeBlendSerialized = [FeId, FeType, FeIn, FeResult, FeIn2, number]
export interface FeBlendOptions extends BaseFe {
  in2: FeIn2
  mode: typeof feBlendMode[number]
}

export type FeBlurSerialized = [FeId, FeType, FeIn, FeResult, number, number]
export interface FeBlurOptions extends BaseFe {
  x: number
  y: number
}

export type FeTurbulenceSerialized = [FeId, FeType, FeIn, FeResult, number, number, number, boolean, boolean]
export interface FeTurbulenceOptions extends BaseFe {
  baseFrequency: number
  numOctaves: number
  seed: number
  stitchTiles: boolean
  turbulence: boolean
}

type ChannelSelector = 0 | 1 | 2 | 3
export type FeDisplacementSerialized = [FeId, FeType, FeIn, FeResult, FeIn2, number, ChannelSelector, ChannelSelector]
export interface FeDisplacementOptions extends BaseFe {
  in2: FeIn2
  scale: number
  xChannelSelector: ChannelSelector
  yChannelSelector: ChannelSelector
}
