import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import { fillingApi } from '../filling'
import type { PatternProcessor, PlaidPatternOptions, PlaidPatternSerialized } from './types'
import { PATTERN, deserializer, serializer } from './constants'

export const plaid: PatternProcessor<PlaidPatternOptions, PlaidPatternSerialized> = {
  initial: {
    patternType: PATTERN.PLAID,
    scale: 1,
    rotate: 0,
    strokeWidth: 1,
    color1: {
      type: fillingApi.types.PALETTE,
      id: 0,
    },
    color2: {
      type: fillingApi.types.PALETTE,
      id: 3,
    },
    color3: {
      type: fillingApi.types.PALETTE,
      id: 2,
    },
  },

  svg: (options, fillingFactory) => {
    const size = [120, 20]
    const { scale, rotate, strokeWidth } = options
    const backgroundColor = fillingFactory.fillingByOptions(options.color1)
    const wavesColor = fillingFactory.fillingByOptions(options.color2)
    const pattern = SVG()
      .pattern(...size)
      .transform({ scale, rotate })
      .attr({
        patternUnits: 'userSpaceOnUse',
        id: nanoid(4),
      })
    pattern.rect(...size).fill(backgroundColor)
    pattern.path('M-50.129 12.685C-33.346 12.358-16.786 4.918 0 5c16.787.082 43.213 10 60 10s43.213-9.918 60-10c16.786-.082 33.346 7.358 50.129 7.685')
      .stroke(wavesColor)
      .stroke({ width: strokeWidth })
      .fill('none')

    return pattern
  },

  serialize: serializer.threeColor,
  deserialize: deserializer.threeColor,
}
