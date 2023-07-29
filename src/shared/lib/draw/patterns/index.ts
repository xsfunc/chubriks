import type { FillingOptions } from '../filling/types'
import { PATTERN } from './constants'
import { cross } from './pattern-cross'
import { herringbone } from './pattern-herringbone'
import { lines } from './pattern-lines'
import { waves } from './pattern-waves'
import type { CreateFactoryOptions, PatternFnMap, PatternOptions, PatternsFactory } from './types'

function createFactory({ patterns, fillingFactory }: CreateFactoryOptions): PatternsFactory {
  const patternsFnMap: PatternFnMap = {
    [PATTERN.WAVES]: waves.svg,
    [PATTERN.CROSS]: cross.svg,
    [PATTERN.HERRINGBONE]: herringbone.svg,
    [PATTERN.LINE]: lines.svg,
  }

  return {
    createPattern(options: FillingOptions) {
      const patternOptions = patterns.find(({ id }) => id === options.id) as PatternOptions
      const patternFn = patternsFnMap[patternOptions.patternType]
      // @ts-expect-error fix later
      return patternFn(patternOptions, fillingFactory)
    },

    patterns,
    isPattern: fillingFactory.isPattern,
  }
}

export const patternsApi = {
  createFactory,
} as const
