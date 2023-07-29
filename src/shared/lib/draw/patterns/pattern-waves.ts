import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import { paintApi } from '../palette'
import type { PatternProcessor, WavesPatternOptions, WavesPatternSerialized } from './types'
import { PATTERN } from './pattern'

export const waves: PatternProcessor<WavesPatternOptions, WavesPatternSerialized> = {
  initial: {
    patternType: PATTERN.WAVES,
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
    const size = [120, 20]
    const {
      scale = 1,
      rotate = 0,
      strokeWidth = 1,
      color1,
      color2,
    } = options

    const pattern = SVG()
      .pattern(...size)
      .transform({ scale, rotate })
      .attr({
        patternUnits: 'userSpaceOnUse',
        id: nanoid(4),
      })

    pattern.rect(...size).fill(color1)
    pattern.path('M-50.129 12.685C-33.346 12.358-16.786 4.918 0 5c16.787.082 43.213 10 60 10s43.213-9.918 60-10c16.786-.082 33.346 7.358 50.129 7.685')
      .stroke(color2)
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
