import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import { fillingApi } from '../filling'
import type { PatternProcessor, PlaidPatternOptions, PlaidPatternSerialized } from './types'
import { PATTERN, deserializer, serializer } from './constants'

export const plaid: PatternProcessor<PlaidPatternOptions, PlaidPatternSerialized> = {
  initial: {
    patternType: PATTERN.PLAID,
    scale: 3,
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
    const size = [40, 40]
    const { scale, rotate } = options
    const backgroundColor = fillingFactory.fillingByOptions(options.color1)
    const color1 = fillingFactory.fillingByOptions(options.color2)
    const color2 = fillingFactory.fillingByOptions(options.color3)
    const pattern = SVG()
      .pattern(...size)
      .transform({ scale, rotate })
      .attr({
        patternUnits: 'userSpaceOnUse',
        id: nanoid(4),
      })
    pattern.rect(...size).fill(backgroundColor)
    pattern.path('M20 8.52h20v2.96H20zM20 20h20v20H20z" stroke-width="1" stroke="none" fill="hsla(258.5,59.4%,59.4%,1)')
      .fill(color1)
    pattern.path('M21.63 0L20 1.63v1.54L23.15 0zm3.08 0L20 4.71v1.54L26.25 0zm3.08 0L20 7.79v1.53L29.32 0zm3.07 0L20 10.86v1.54L32.4 0zm3.08 0L20 13.94v1.54L35.48 0zm3.08 0L20 17.02v1.54L38.55 0zM40 .1l-20 20L.1 40h1.53L40 1.63zm0 3.07L3.17 40h1.54L40 4.71zm0 3.08L6.25 40h1.54L40 7.79zm0 3.07L9.32 40h1.54L40 10.86zm0 3.08L12.4 40h1.54L40 13.94zm0 3.08L15.48 40h1.54L40 17.02zm0 3.08L18.55 40h1.55L40 20.1V20zM1.63 20L0 21.63v1.54L3.15 20zm3.08 0L0 24.71v1.54L6.25 20zm3.08 0L0 27.79v1.53L9.32 20zm3.07 0L0 30.86v1.54L12.4 20zm3.08 0L0 33.94v1.54L15.48 20zm3.08 0L0 37.02v1.54L18.55 20zM40 21.63L21.63 40h1.54L40 23.17zm0 3.08L24.71 40h1.54L40 26.25zm0 3.08L27.79 40h1.53L40 29.33zm0 3.08L30.86 40h1.54l7.6-7.6zm0 3.07L33.94 40h1.54L40 35.48zm0 3.08L37.02 40h1.54L40 38.56zM9.32 0l-.8.8v1.54L10.86 0zm2.16.92L8.52 3.88v1.54l2.96-2.96zm0 3.08L8.52 6.96V8.5l2.96-2.96zm0 3.08l-1.44 1.44-2.96 2.96h1.44v.1l.1-.1 2.86-2.87.1-.09h-.1zM.8 8.52l-.8.8v1.54l2.34-2.34zm3.08 0L.92 11.48h1.54l2.96-2.96zm3.08 0L4 11.48h1.54L8.5 8.52zm6.16 0l-1.64 1.63-1.33 1.33-1.63 1.63v1.54l2.96-2.96v-.21h.21l2.96-2.96zm3.07 0l-2.96 2.96h1.54l2.96-2.96zm3.08 0l-2.96 2.96h1.53L20 9.32v-.8zm.73 2.34l-.62.62H20zm-8.52 2.37l-2.96 2.96v1.54l2.96-2.96zm0 3.07l-2.96 2.97V40h2.96V20H9.32l2.16-2.16z')
      .fill(color2)

    return pattern
  },

  serialize: serializer.threeColor,
  deserialize: deserializer.threeColor,
}
