import type { Pattern } from '@svgdotjs/svg.js'
import type { patternList } from './paint-pattern'

export type PatternType = typeof patternList[number]
export type PatternFnMap = {
  [Key in PatternType]: (options: PatternOptions) => Pattern
}

export type PatternOptions = WavesPatternOptions
| CrossPatternOptions
| HerringbonePatternOptions

export interface WavesPatternOptions {
  patternType: PatternType
  rotate?: number
  scale?: number
  strokeWidth?: number
  background?: string | { colorId: number; type: 'color' }
  color1?: string | { colorId: number; type: 'color' }
}

export interface CrossPatternOptions {
  patternType: PatternType
  rotate?: number
  scale?: number
  strokeWidth?: number
  background?: string
  color1?: string
}

export interface HerringbonePatternOptions {
  patternType: PatternType
  rotate?: number
  scale?: number
  strokeWidth?: number
  background?: string
  color1?: string
}
