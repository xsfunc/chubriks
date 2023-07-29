import type { Pattern } from '@svgdotjs/svg.js'
import type { PaintOptions, PaintSerialized } from '../palette/types'
import type { PATTERN } from './pattern'

export interface PatternProcessor<T extends PatternOptions, S extends PatternSerialized> {
  initial: T
  svg: (options: T) => Pattern
  serialize: (options: T) => S
  deserialize: (data: S) => T
}

// Type for the pattern values
export type PatternType = typeof PATTERN[keyof typeof PATTERN]
export type PatternFunction<T> = (options: T) => Pattern
export interface PatternFnMap {
  [PATTERN.WAVES]: PatternFunction<WavesPatternOptions>
  [PATTERN.CROSS]: PatternFunction<CrossPatternOptions>
  [PATTERN.HERRINGBONE]: PatternFunction<HerringbonePatternOptions>
}

export type PatternSerialized = WavesPatternSerialized
| CrossPatternSerialized
| HerringbonePatternSerialized
export type PatternOptions = WavesPatternOptions
| CrossPatternOptions
| HerringbonePatternOptions

export type WavesPatternSerialized = [PatternType, number, number, number, PaintSerialized, PaintSerialized]
export interface WavesPatternOptions {
  patternType: PatternType
  rotate: number
  scale: number
  strokeWidth: number
  color1: PaintOptions
  color2: PaintOptions
}

export type CrossPatternSerialized = [PatternType, number, number, number, PaintSerialized, PaintSerialized]
export interface CrossPatternOptions {
  patternType: PatternType
  rotate: number
  scale: number
  strokeWidth: number
  color1: PaintOptions
  color2: PaintOptions
}

export type HerringbonePatternSerialized = [PatternType, number, number, number, PaintSerialized, PaintSerialized]
export interface HerringbonePatternOptions {
  patternType: PatternType
  rotate: number
  scale: number
  strokeWidth: number
  color1: PaintOptions
  color2: PaintOptions
}
