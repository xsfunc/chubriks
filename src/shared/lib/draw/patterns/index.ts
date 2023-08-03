import { decode, encode } from 'msgpack-lite'
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
import type { CreateFactoryOptions, PatternFnMap, PatternOptions, PatternSerialized, PatternsFactory } from './types'

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
      // @ts-expect-error I'm stupid to solve this
      return patternFn(patternOptions, fillingFactory)
    },

    patterns,
    isPattern: fillingFactory.isPattern,
  }
}

export const patternsApi = {
  createFactory,

  encodePatterns(patternOptionsList: PatternOptions[]) {
    const serializeFnMap = {
      [PATTERN.WAVES]: waves.serialize,
      [PATTERN.CROSS]: cross.serialize,
      [PATTERN.HERRINGBONE]: herringbone.serialize,
      [PATTERN.LINE]: lines.serialize,
      [PATTERN.FLOWER]: flower.serialize,
      [PATTERN.NEW]: newPattern.serialize,
      [PATTERN.PLUS]: plus.serialize,
      [PATTERN.CIRCLES]: circles.serialize,
      [PATTERN.PLAID]: plaid.serialize,
      [PATTERN.SQUARES]: squares.serialize,
    } as const

    const serializedList = patternOptionsList.map((options) => {
      const serializeFn = serializeFnMap[options.patternType]
      // @ts-expect-error I'm stupid to solve this
      return serializeFn(options)
    })

    const encoded = encode(serializedList)
    const patternsBytes = new Uint8Array(encoded)
    return { patterns: patternsBytes }
  },

  decodePatterns(params: { patterns: Uint8Array }) {
    if (params.patterns === undefined)
      throw new Error('UNDEFINED PATTERNS')
      // return []

    const decodedList = decode(params.patterns) as PatternSerialized[]
    const patternsFnMap = {
      [PATTERN.WAVES]: waves.deserialize,
      [PATTERN.CROSS]: cross.deserialize,
      [PATTERN.HERRINGBONE]: herringbone.deserialize,
      [PATTERN.LINE]: lines.deserialize,
      [PATTERN.FLOWER]: flower.deserialize,
      [PATTERN.NEW]: newPattern.deserialize,
      [PATTERN.PLUS]: plus.deserialize,
      [PATTERN.CIRCLES]: circles.deserialize,
      [PATTERN.PLAID]: plaid.deserialize,
      [PATTERN.SQUARES]: squares.deserialize,
    } as const

    return decodedList.map((pattern) => {
      const [patternType] = pattern
      const deserialize = patternsFnMap[patternType]
      // @ts-expect-error I'm stupid to solve this
      return deserialize(pattern)
    })
  },
} as const
