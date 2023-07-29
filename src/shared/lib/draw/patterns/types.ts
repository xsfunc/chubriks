import type { Pattern } from '@svgdotjs/svg.js'
import type { FillingFactory, FillingOptions, FillingSerialized } from '../filling/types'
import type { PATTERN } from './constants'

export interface PatternsFactory {
  createPattern(options: FillingOptions): Pattern
  isPattern(options: FillingOptions): boolean
  patterns: PatternOptions[]
}
export interface PatternApi {
  types: Record<string, PatternType>
  createFactory(options: CreateFactoryOptions): PatternsFactory
  isPattern(options: FillingOptions): boolean
}
export interface CreateFactoryOptions {
  patterns: PatternOptions[]
  fillingFactory: FillingFactory
}

export interface PatternProcessor<T extends PatternOptions, S extends PatternSerialized> {
  initial: Omit<T, 'id'>
  svg: CreatePattern<T>
  serialize: (options: T) => S
  deserialize: (data: S) => T
}

// Type for the pattern values
export type PatternType = typeof PATTERN[keyof typeof PATTERN]
export type PatternSvg<T extends PatternOptions> = (options: T, paintApi: FillingFactory) => Pattern
export type CreatePattern<T> = (options: T, fillingFactory: FillingFactory) => Pattern

export interface PatternFnMap {
  [PATTERN.WAVES]: PatternSvg<WavesPatternOptions>
  [PATTERN.CROSS]: PatternSvg<CrossPatternOptions>
  [PATTERN.HERRINGBONE]: PatternSvg<HerringbonePatternOptions>
  [PATTERN.LINE]: PatternSvg<LinePatternOptions>
}

export type PatternSerialized = WavesPatternSerialized
| CrossPatternSerialized
| HerringbonePatternSerialized
| LinePatternSerialized

export type PatternOptions = WavesPatternOptions
| CrossPatternOptions
| HerringbonePatternOptions
| LinePatternOptions

interface BasePatternOptions {
  id: number
  patternType: PatternType
  rotate: number
  scale: number
  strokeWidth: number
  color1?: FillingOptions
  color2?: FillingOptions
  color3?: FillingOptions
  color4?: FillingOptions
  color5?: FillingOptions
}

export type WavesPatternSerialized = [PatternType, number, number, number, number, FillingSerialized, FillingSerialized]
export interface WavesPatternOptions extends BasePatternOptions {
  color1: FillingOptions
  color2: FillingOptions
}

export type CrossPatternSerialized = [PatternType, number, number, number, number, FillingSerialized, FillingSerialized]
export interface CrossPatternOptions extends BasePatternOptions {
  color1: FillingOptions
  color2: FillingOptions
}

export type HerringbonePatternSerialized = [PatternType, number, number, number, number, FillingSerialized, FillingSerialized]
export interface HerringbonePatternOptions extends BasePatternOptions {
  color1: FillingOptions
  color2: FillingOptions
}

export type LinePatternSerialized = [PatternType, number, number, number, number, FillingSerialized, FillingSerialized, FillingSerialized]
export interface LinePatternOptions extends BasePatternOptions {
  color1: FillingOptions
  color2: FillingOptions
  color3: FillingOptions
}
