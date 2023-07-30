import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import { fillingApi } from '../filling'
import type { CirclesPatternOptions, CirclesPatternSerialized, PatternProcessor } from './types'
import { PATTERN, deserializer, serializer } from './constants'

export const circles: PatternProcessor<CirclesPatternOptions, CirclesPatternSerialized> = {
  initial: {
    patternType: PATTERN.CIRCLES,
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
    const size = [40, 40]
    const { scale, rotate } = options
    const backgroundColor = fillingFactory.fillingByOptions(options.color1)
    const circle1 = fillingFactory.fillingByOptions(options.color2)
    const circle2 = fillingFactory.fillingByOptions(options.color3)
    const pattern = SVG()
      .pattern(...size)
      .transform({ scale, rotate })
      .attr({
        patternUnits: 'userSpaceOnUse',
        id: nanoid(4),
      })
    pattern.rect(...size).fill(backgroundColor)
    pattern.path('M40 45a5 5 0 110-10 5 5 0 010 10zM0 45a5 5 0 110-10 5 5 0 010 10zM0 5A5 5 0 110-5 5 5 0 010 5zm40 0a5 5 0 110-10 5 5 0 010 10z')
      .fill(circle1)
    pattern.path('M20 25a5 5 0 110-10 5 5 0 010 10z')
      .fill(circle2)

    return pattern
  },

  serialize: serializer.threeColor,
  deserialize: deserializer.threeColor,
}
