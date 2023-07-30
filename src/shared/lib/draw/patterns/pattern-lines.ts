import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import { defaultColorsIds, fillingTypes } from '../filling/constants'
import type { LinePatternOptions, LinePatternSerialized, PatternProcessor } from './types'
import { PATTERN, deserializer, serializer } from './constants'

export const lines: PatternProcessor<LinePatternOptions, LinePatternSerialized> = {
  initial: {
    patternType: PATTERN.LINE,
    scale: 1,
    rotate: 0,
    strokeWidth: 1,
    color1: {
      type: fillingTypes.DEFAULT,
      id: defaultColorsIds.BLACK,
    },
    color2: {
      type: fillingTypes.DEFAULT,
      id: defaultColorsIds.WHITE,
    },
    color3: {
      type: fillingTypes.DEFAULT,
      id: defaultColorsIds.GRAY,
    },
  },

  svg: (options, paintApi) => {
    const size = [20, 50]
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
