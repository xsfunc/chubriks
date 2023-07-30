import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import { fillingApi } from '../filling'
import type { PatternProcessor, SquaresPatternOptions, SquaresPatternSerialized } from './types'
import { PATTERN, deserializer, serializer } from './constants'

export const squares: PatternProcessor<SquaresPatternOptions, SquaresPatternSerialized> = {
  initial: {
    patternType: PATTERN.SQUARES,
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
    color4: {
      type: fillingApi.types.PALETTE,
      id: 5,
    },
  },

  svg: (options, fillingFactory) => {
    const size = [65, 65]
    const { scale, rotate } = options
    const backgroundColor = fillingFactory.fillingByOptions(options.color1)
    const color1 = fillingFactory.fillingByOptions(options.color2)
    const color2 = fillingFactory.fillingByOptions(options.color3)
    const color3 = fillingFactory.fillingByOptions(options.color4)
    const pattern = SVG()
      .pattern(...size)
      .transform({ scale, rotate })
      .attr({
        patternUnits: 'userSpaceOnUse',
        id: nanoid(4),
      })
    pattern.rect(...size).fill(backgroundColor)
    pattern.path('M.5.5v12h12V.5H.5zm13 13v12h12v-12h-12zm-13 13v12h12v-12H.5zm26 13v12h12v-12h-12zm13 13v12h12v-12h-12z')
      .fill(color1)
    pattern.path('M26.5.5v12h12V.5h-12zm0 13v12h12v-12h-12zm13 13v12h12v-12h-12zm-39 13v12h12v-12H.5zm0 13v12h12v-12H.5z')
      .fill(color2)
    pattern.path('M13.5.5v12h12V.5h-12zm39 13v12h12v-12h-12zm-39 13v12h12v-12h-12zm39 0v12h12v-12h-12zm-26 26v12h12v-12h-12z')
      .fill(color3)
    pattern.path('M52.5.5v12h12V.5h-12zm-13 13v12h12v-12h-12zm0 26v12h12v-12h-12zm13 0v12h12v-12h-12zm-39 13v12h12v-12h-12z')
      .fill(color1)
    return pattern
  },

  serialize: serializer.fourColor,
  deserialize: deserializer.fourColor,
}
