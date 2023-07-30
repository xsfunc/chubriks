import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import { fillingTypes } from '../filling/constants'
import type { LinePatternOptions, LinePatternSerialized, PatternProcessor } from './types'
import { PATTERN, deserializer, serializer } from './constants'

export const lines: PatternProcessor<LinePatternOptions, LinePatternSerialized> = {
  initial: {
    patternType: PATTERN.LINE,
    scale: 1,
    rotate: 0,
    strokeWidth: 1,
    color1: {
      type: fillingTypes.PALETTE,
      id: 0,
    },
    color2: {
      type: fillingTypes.PALETTE,
      id: 2,
    },
    color3: {
      type: fillingTypes.PALETTE,
      id: 3,
    },
  },

  svg: (options, paintApi) => {
    const size = [20, 40]
    const { scale, rotate, strokeWidth } = options
    const backPaint = paintApi.fillingByOptions(options.color1)
    const paint2 = paintApi.fillingByOptions(options.color2)
    const paint3 = paintApi.fillingByOptions(options.color3)

    const pattern = SVG()
      .pattern(...size)
      .transform({ scale, rotate })
      .attr({
        patternUnits: 'userSpaceOnUse',
        id: nanoid(4),
      })

    pattern.rect(...size).fill(backPaint)
    pattern.path('M0 10h20z')
      .stroke(paint2)
      .stroke({ width: strokeWidth })
      .fill('none')
    pattern.path('M0 30h20z')
      .stroke(paint3)
      .stroke({ width: strokeWidth })
      .fill('none')

    return pattern
  },

  serialize: serializer.threeColor,
  deserialize: deserializer.threeColor,
}
