import type { Pattern } from '@svgdotjs/svg.js'
import type { PatternFnMap, PatternOptions } from '../types'
import { cross } from './pattern-cross'
import { herringbone } from './pattern-herringbone'
import { waves } from './pattern-waves'
import { PATTERN } from './pattern'

export function paintPatternByType(options: PatternOptions): Pattern {
  const patternsFnMap: PatternFnMap = {
    [PATTERN.WAVES]: waves.svg,
    [PATTERN.CROSS]: cross.svg,
    [PATTERN.HERRINGBONE]: herringbone.svg,
  }

  const patternFn = patternsFnMap[options.patternType]
  // @ts-expect-error Can't infer types
  return patternFn(options)
}
