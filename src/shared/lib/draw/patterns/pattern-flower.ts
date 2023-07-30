import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import { fillingApi } from '../filling'
import type { FlowerPatternOptions, FlowerPatternSerialized, PatternProcessor } from './types'
import { PATTERN, deserializer, serializer } from './constants'

export const flower: PatternProcessor<FlowerPatternOptions, FlowerPatternSerialized> = {
  initial: {
    patternType: PATTERN.FLOWER,
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
    const size = [20, 20]
    const { scale, rotate, strokeWidth } = options
    const backgroundColor = fillingFactory.fillingByOptions(options.color1)
    const flower1 = fillingFactory.fillingByOptions(options.color2)
    const flower2 = fillingFactory.fillingByOptions(options.color3)
    const pattern = SVG()
      .pattern(...size)
      .transform({ scale, rotate })
      .attr({
        patternUnits: 'userSpaceOnUse',
        id: nanoid(4),
      })
    pattern.rect(...size).fill(backgroundColor)
    pattern.path('M0-10C-.011-4.49-4.485.03-10 .03-4.485.03-.011 4.49 0 10 .011 4.498 4.493.001 10-.01 4.493-.02.012-4.498 0-10zm0 20c-.011 5.51-4.485 10.03-10 10.03 5.515 0 9.989 4.46 10 9.97.011-5.502 4.493-9.999 10-10.01C4.493 19.98.012 15.502 0 10zm20-20C19.989-4.49 15.515.03 10 .03c5.515 0 9.989 4.46 10 9.97.011-5.502 4.493-9.999 10-10.01-5.507-.01-9.988-4.488-10-9.99zm0 20c-.011 5.51-4.485 10.03-10 10.03 5.515 0 9.989 4.46 10 9.97.011-5.502 4.493-9.999 10-10.01-5.507-.01-9.988-4.488-10-9.99z')
      .stroke({ width: strokeWidth })
      .fill(flower1)
    pattern.path('M10 0C9.989 5.51 5.515 10.03 0 10.03c5.515 0 9.989 4.46 10 9.97.011-5.502 4.493-9.998 10-10.01-5.507-.01-9.988-4.488-10-9.99z')
      .stroke({ width: strokeWidth })
      .fill(flower2)

    return pattern
  },

  serialize: serializer.threeColor,
  deserialize: deserializer.threeColor,
}
