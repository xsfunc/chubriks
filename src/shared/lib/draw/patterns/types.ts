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

export type PatternType = typeof PATTERN[keyof typeof PATTERN]
export type PatternSvg<T extends PatternOptions> = (options: T, paintApi: FillingFactory) => Pattern
export type CreatePattern<T> = (options: T, fillingFactory: FillingFactory) => Pattern

export interface PatternFnMap {
  [PATTERN.WAVES]: PatternSvg<WavesPatternOptions>
  [PATTERN.CROSS]: PatternSvg<CrossPatternOptions>
  [PATTERN.HERRINGBONE]: PatternSvg<HerringbonePatternOptions>
  [PATTERN.LINE]: PatternSvg<LinePatternOptions>
  [PATTERN.FLOWER]: PatternSvg<FlowerPatternOptions>
  [PATTERN.PLUS]: PatternSvg<PlusPatternOptions>
  [PATTERN.CIRCLES]: PatternSvg<CirclesPatternOptions>
  [PATTERN.NEW]: PatternSvg<NewPatternOptions>
  [PATTERN.PLAID]: PatternSvg<PlaidPatternOptions>
  [PATTERN.SQUARES]: PatternSvg<SquaresPatternOptions>
}

export type PatternSerialized = BasePatternSerialized | ThreeColorPatternSerialized | FourColorPatternSerialized
export type PatternOptions = BasePatternOptions | ThreeColorPatternOptions | FourColorPatternOptions

export type BasePatternSerialized = [PatternType, number, number, number, number, FillingSerialized, FillingSerialized]
export interface BasePatternOptions {
  id: number
  patternType: PatternType
  rotate: number
  scale: number
  strokeWidth: number
  color1: FillingOptions
  color2: FillingOptions
}

export type ThreeColorPatternSerialized = [PatternType, number, number, number, number, FillingSerialized, FillingSerialized, FillingSerialized]
export type ThreeColorPatternOptions = BasePatternOptions & { color3: FillingOptions }

export type FourColorPatternOptions = BasePatternOptions & { color3: FillingOptions; color4: FillingOptions }
export type FourColorPatternSerialized = [PatternType, number, number, number, number, FillingSerialized, FillingSerialized, FillingSerialized, FillingSerialized]

export type WavesPatternSerialized = BasePatternSerialized
export type WavesPatternOptions = BasePatternOptions

export type CrossPatternSerialized = BasePatternSerialized
export type CrossPatternOptions = BasePatternOptions

export type HerringbonePatternSerialized = BasePatternSerialized
export type HerringbonePatternOptions = BasePatternOptions

export type HexagonPatternSerialized = BasePatternSerialized
export type HexagonPatternOptions = BasePatternOptions

export type NewPatternSerialized = BasePatternSerialized
export type NewPatternOptions = BasePatternOptions

export type LinePatternSerialized = ThreeColorPatternSerialized
export type LinePatternOptions = ThreeColorPatternOptions

export type FlowerPatternSerialized = ThreeColorPatternSerialized
export type FlowerPatternOptions = ThreeColorPatternOptions

export type PlusPatternSerialized = ThreeColorPatternSerialized
export type PlusPatternOptions = ThreeColorPatternOptions

export type CirclesPatternSerialized = ThreeColorPatternSerialized
export type CirclesPatternOptions = ThreeColorPatternOptions

export type PlaidPatternSerialized = ThreeColorPatternSerialized
export type PlaidPatternOptions = ThreeColorPatternOptions

export type SquaresPatternSerialized = FourColorPatternSerialized
export type SquaresPatternOptions = FourColorPatternOptions
