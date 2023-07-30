import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import { fillingApi } from '../filling'
import type { PatternProcessor, PlusPatternOptions, PlusPatternSerialized } from './types'
import { PATTERN, deserializer, serializer } from './constants'

export const plus: PatternProcessor<PlusPatternOptions, PlusPatternSerialized> = {
  initial: {
    patternType: PATTERN.PLUS,
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
    const size = [32, 32]
    const { scale, rotate, strokeWidth } = options
    const backgroundColor = fillingFactory.fillingByOptions(options.color1)
    const plus1 = fillingFactory.fillingByOptions(options.color2)
    const plus2 = fillingFactory.fillingByOptions(options.color3)
    const pattern = SVG()
      .pattern(...size)
      .transform({ scale, rotate })
      .attr({
        patternUnits: 'userSpaceOnUse',
        id: nanoid(4),
      })
    pattern.rect(...size).fill(backgroundColor)
    pattern.path('M40 16h-6m-4 0h-6m8 8v-6m0-4V8M8 16H2m-4 0h-6m8 8v-6m0-4V8')
      .stroke(plus1)
      .stroke({ width: strokeWidth })
      .fill('none')
    pattern.path('M16-8v6m0 4v6m8-8h-6m-4 0H8m8 24v6m0 4v6m8-8h-6m-4 0H8')
      .stroke(plus2)
      .stroke({ width: strokeWidth })
      .fill('none')

    return pattern
  },

  serialize: serializer.threeColor,
  deserialize: deserializer.threeColor,
}
