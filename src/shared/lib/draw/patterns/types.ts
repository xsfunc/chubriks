import type { Pattern } from '@svgdotjs/svg.js'
import type { ColorProps } from '../types'
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
  color1: ColorProps
  color2: ColorProps
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
