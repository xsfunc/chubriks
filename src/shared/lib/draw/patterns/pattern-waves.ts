import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import { fillingApi } from '../filling'
import type { PatternProcessor, WavesPatternOptions, WavesPatternSerialized } from './types'
import { PATTERN } from './constants'

export const waves: PatternProcessor<WavesPatternOptions, WavesPatternSerialized> = {
  initial: {
    patternType: PATTERN.WAVES,
    scale: 1,
    rotate: 0,
    strokeWidth: 1,
    color1: {
      type: fillingApi.types.DEFAULT,
      id: fillingApi.defaultColorsIds.BLACK,
    },
    color2: {
      type: fillingApi.types.DEFAULT,
      id: fillingApi.defaultColorsIds.WHITE,
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
