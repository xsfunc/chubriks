import { SVG } from '@svgdotjs/svg.js'
import { defaultColors, defaultColorsIds, fillingTypes, gradientTypesNames } from './constants'
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
      const defaultColor = defaultColors[defaultColorsIds.DARK_GRAY]

      if (options.type === fillingTypes.DEFAULT)
        return defaultColors[options.id]
      if (options.type === fillingTypes.PALETTE)
        return palette[options.id]
      if (options.type === fillingTypes.GRADIENT) {
        const gradientOptions = gradients.find(({ id }) => id === options.id)
        if (!gradientOptions)
          return defaultColor
        const { stops, colors } = gradientOptions
        const gradient = SVG().gradient(gradientTypesNames[gradientOptions.type])
        for (let i = 0; i < stops.length; i++) {
          const colorId = colors[i]
          const color = palette[colorId]
          gradient.stop(stops[i] / 100, color)
        }
        return gradient
      }

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
