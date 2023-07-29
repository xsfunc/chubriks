import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import { fillingApi } from '../filling'
import { defaultColorsIds, fillingTypes } from '../filling/constants'
import type { LinePatternOptions, LinePatternSerialized, PatternProcessor } from './types'
import { PATTERN } from './constants'

export const lines: PatternProcessor<LinePatternOptions, LinePatternSerialized> = {
  initial: {
    patternType: PATTERN.WAVES,
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

  serialize: options => [
    options.patternType,
    options.id,
    options.rotate,
    options.scale,
    options.strokeWidth,
    fillingApi.serialize(options.color1),
    fillingApi.serialize(options.color2),
    fillingApi.serialize(options.color3),
  ],

  deserialize: data => ({
    patternType: data[0],
    id: data[1],
    rotate: data[2],
    scale: data[3],
    strokeWidth: data[4],
    color1: fillingApi.deserialize(data[5]),
    color2: fillingApi.deserialize(data[6]),
    color3: fillingApi.deserialize(data[7]),
  }),
}
