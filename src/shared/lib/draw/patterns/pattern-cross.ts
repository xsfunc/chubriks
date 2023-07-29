import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import { paintApi } from '../palette'
import type { CrossPatternOptions, CrossPatternSerialized, PatternProcessor } from './types'
import { PATTERN } from './pattern'

export const cross: PatternProcessor<CrossPatternOptions, CrossPatternSerialized> = {
  initial: {
    patternType: PATTERN.CROSS,
    scale: 1,
    rotate: 0,
    strokeWidth: 1,
    color1: {
      type: paintApi.types.DEFAULT,
      id: paintApi.defaultColorsIds.BLACK,
    },
    color2: {
      type: paintApi.types.DEFAULT,
      id: paintApi.defaultColorsIds.WHITE,
    },
  },

  svg: (options) => {
    const size = [20, 20]
    const {
      scale = 1,
      rotate = 0,
      strokeWidth = 1,
    } = options

    const pattern = SVG()
      .pattern(...size)
      .transform({ scale, rotate })
      .attr({
        patternUnits: 'userSpaceOnUse',
        id: nanoid(4),
      })

    pattern.rect(...size).fill(backColor)
    pattern.path('M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z')
      .stroke(strokeColor)
      .stroke({ width: strokeWidth })
      .fill('none')
    return pattern
  },

  serialize: options => [
    options.patternType,
    options.rotate,
    options.scale,
    options.strokeWidth,
    paintApi.serialize(options.color1),
    paintApi.serialize(options.color2),
  ],

  deserialize: data => ({
    patternType: data[0],
    rotate: data[1],
    scale: data[2],
    strokeWidth: data[3],
    color1: paintApi.deserialize(data[4]),
    color2: paintApi.deserialize(data[5]),
  }),
}
