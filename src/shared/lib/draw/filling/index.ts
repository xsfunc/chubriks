import { SVG } from '@svgdotjs/svg.js'
import { defaultColors, defaultColorsIds, fillingTypes, gradientTypes } from './constants'
import type { CreateFillingFactoryOptions, FillingFactory, FillingOptions, FillingSerialized, FillingType } from './types'
import { createPoline, polinePalette } from './poline'

const serialize = ({ type, id }: FillingOptions): [FillingType, number] => [type, id]
const deserialize = ([type, id]: FillingSerialized) => ({ type, id })
const isPattern = ({ type }: FillingOptions): boolean => type === fillingTypes.PATTERN
const isColor = ({ type }: FillingOptions): boolean => type === fillingTypes.DEFAULT || type === fillingTypes.PALETTE
const isGradient = ({ type }: FillingOptions): boolean => type === fillingTypes.GRADIENT

function createFactory({ palette, gradients }: CreateFillingFactoryOptions): FillingFactory {
  return {
    types: fillingTypes,
    defaultColors,
    defaultColorsIds,
    palette,
    gradients,
    serialize,
    deserialize,
    isPattern,
    isColor,
    isGradient,

    fillingByOptions(options: FillingOptions) {
      if (options.type === fillingTypes.DEFAULT)
        return defaultColors[options.id]
      if (options.type === fillingTypes.PALETTE)
        return palette[options.id]
      if (options.type === fillingTypes.GRADIENT) {
        const gradientOptions = gradients[options.id]
        const { stops, colors } = gradientOptions
        const gradient = SVG().gradient(gradientTypes[gradientOptions.type])
        for (let i = 0; i < stops.length; i++) {
          const colorId = colors[i]
          const color = palette[colorId]
          gradient.stop(stops[i], color)
        }
        return gradient
      }

      const defaultColor = defaultColors[defaultColorsIds.DARK_GRAY]
      return defaultColor
    },
  }
}

export const fillingApi = {
  types: fillingTypes,
  defaultColors,
  defaultColorsIds,
  createFactory,
  serialize,
  deserialize,
  isColor,
  isGradient,
  isPattern,
  createPoline,
  polinePalette,
} as const
