import type { FillingOptions } from '../filling/types'
import { PATTERN } from './constants'
import { circles } from './pattern-circles'
import { cross } from './pattern-cross'
import { flower } from './pattern-flower'
import { herringbone } from './pattern-herringbone'
import { lines } from './pattern-lines'
import { newPattern } from './pattern-new'
import { plaid } from './pattern-plaid'
import { plus } from './pattern-plus'
import { squares } from './pattern-squares'
import { waves } from './pattern-waves'
import type { CreateFactoryOptions, PatternFnMap, PatternOptions, PatternsFactory } from './types'

function createFactory({ patterns, fillingFactory }: CreateFactoryOptions): PatternsFactory {
  const patternsFnMap: PatternFnMap = {
    [PATTERN.WAVES]: waves.svg,
    [PATTERN.CROSS]: cross.svg,
    [PATTERN.HERRINGBONE]: herringbone.svg,
    [PATTERN.LINE]: lines.svg,
    [PATTERN.FLOWER]: flower.svg,
    [PATTERN.NEW]: newPattern.svg,
    [PATTERN.PLUS]: plus.svg,
    [PATTERN.CIRCLES]: circles.svg,
    [PATTERN.PLAID]: plaid.svg,
    [PATTERN.SQUARES]: squares.svg,
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
