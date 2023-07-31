import type { filters } from './constants'

export interface FilterProcessor<T extends FilterOptions, S > {
  initial: Omit<T, 'id'>
  add: (options: T) => any
  serialize: (options: T) => S
  deserialize: (data: S) => T
}

export type FilterType = typeof filters[keyof typeof filters]
export type FilterOptions =
| CssDropShadowEffectOptions
| CssGrayscaleEffectOptions
| CssInvertEffectOptions
| CssOpacityEffectOptions

export interface CssDropShadowEffectOptions {
  type: FilterType
  name: string
  css: boolean
  xOffset: number
  yOffset: number
  blurRadius: number
}
export interface CssGrayscaleEffectOptions {
  css: boolean
  amount: number
}
export interface CssInvertEffectOptions {
  css: boolean
  amount: number
}
export interface CssOpacityEffectOptions {
  css: boolean
  amount: number
}
export interface CssSepiaEffectOptions {
  css: boolean
  amount: number
}
