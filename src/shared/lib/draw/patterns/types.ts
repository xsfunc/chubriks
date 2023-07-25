import type { Pattern } from '@svgdotjs/svg.js'
import type { ColorProps } from '../types'
import type { PATTERN } from './pattern'

// Type for the pattern values
export type PatternType = typeof PATTERN[keyof typeof PATTERN]
export type PatternFunction<T> = (options: T) => Pattern
export interface PatternFnMap {
  [PATTERN.WAVES]: PatternFunction<WavesPatternOptions>
  [PATTERN.CROSS]: PatternFunction<CrossPatternOptions>
  [PATTERN.HERRINGBONE]: PatternFunction<HerringbonePatternOptions>
}

export type PatternOptions = WavesPatternOptions
| CrossPatternOptions
| HerringbonePatternOptions

export interface WavesPatternOptions {
  patternType: typeof PATTERN.WAVES
  rotate: number
  scale: number
  strokeWidth: number
  color1: number
  color2: number
}

export interface CrossPatternOptions {
  patternType: typeof PATTERN.CROSS
  rotate?: number
  scale?: number
  strokeWidth?: number
  color1: ColorProps
  color2: ColorProps
}

export interface HerringbonePatternOptions {
  patternType: typeof PATTERN.HERRINGBONE
  rotate?: number
  scale?: number
  strokeWidth?: number
  color1: ColorProps
  color2: ColorProps
}
