import type { PatternFnMap, PatternOptions } from '../types'
import { crossPattern } from './pattern-cross'
import { herringBonePattern } from './pattern-heringbone'
import { wavePattern } from './pattern-waves'

export const patternList = ['waves', 'cross', 'herringbone'] as const

const patternsFnMap: PatternFnMap = {
  waves: wavePattern,
  cross: crossPattern,
  herringbone: herringBonePattern,
}

export function paintPatternByType(options: PatternOptions) {
  const patternFn = patternsFnMap[options.patternType]
  return patternFn(options)
}

export function mapColorsToString(options: PatternOptions, colors: string[]) {
  const patternOptions = { ...options }
  for (const [key, value] of Object.entries(patternOptions)) {
    if (value.type === 'color') {
      console.log(value.type)
      patternOptions[key] = colors[value.colorId]
    }
  }
  console.log(patternOptions)
  return patternOptions
}
