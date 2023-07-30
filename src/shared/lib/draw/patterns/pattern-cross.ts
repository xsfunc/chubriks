import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import { fillingTypes } from '../filling/constants'
import type { CrossPatternOptions, CrossPatternSerialized, PatternProcessor } from './types'
import { PATTERN, deserializer, serializer } from './constants'

export const cross: PatternProcessor<CrossPatternOptions, CrossPatternSerialized> = {
  initial: {
    patternType: PATTERN.CROSS,
    scale: 1,
    rotate: 0,
    strokeWidth: 1,
    color1: {
      type: fillingTypes.PALETTE,
      id: 0,
    },
    color2: {
      type: fillingTypes.PALETTE,
      id: 3,
    },
  },

  svg: (options, paintApi) => {
    const size = [20, 20]
    const { scale, rotate, strokeWidth } = options
    const backPaint = paintApi.fillingByOptions(options.color1)
    const paint2 = paintApi.fillingByOptions(options.color2)

    const pattern = SVG()
      .pattern(...size)
      .transform({ scale, rotate })
      .attr({
        patternUnits: 'userSpaceOnUse',
        id: nanoid(4),
      })

    pattern.rect(...size).fill(backPaint)
    pattern.path('M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z')
      .stroke(paint2)
      .stroke({ width: strokeWidth })
      .fill('none')
    return pattern
  },

  serialize: serializer.base,
  deserialize: deserializer.base,
}
