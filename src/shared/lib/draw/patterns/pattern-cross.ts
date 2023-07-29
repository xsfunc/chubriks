import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import { defaultColorsIds, fillingTypes } from '../filling/constants'
import { fillingApi } from '../filling'
import type { CrossPatternOptions, CrossPatternSerialized, PatternProcessor } from './types'
import { PATTERN } from './constants'

export const cross: PatternProcessor<CrossPatternOptions, CrossPatternSerialized> = {
  initial: {
    patternType: PATTERN.CROSS,
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

  serialize: options => [
    options.patternType,
    options.id,
    options.rotate,
    options.scale,
    options.strokeWidth,
    fillingApi.serialize(options.color1),
    fillingApi.serialize(options.color2),
  ],

  deserialize: data => ({
    patternType: data[0],
    id: data[1],
    rotate: data[2],
    scale: data[3],
    strokeWidth: data[4],
    color1: fillingApi.deserialize(data[5]),
    color2: fillingApi.deserialize(data[6]),
  }),
}
