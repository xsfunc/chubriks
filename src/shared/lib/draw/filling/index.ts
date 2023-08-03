import { SVG } from '@svgdotjs/svg.js'
import { defaultColors, defaultColorsIds, fillingTypes, gradientTypesMap, gradientTypesNames } from './constants'
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
        if (gradientOptions.type === gradientTypesMap.LINEAR) {
          const { x1, x2, y1, y2 } = angleToCoordinates(gradientOptions.degree)
          gradient.from(x1, y1).to(x2, y2)
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

function angleToCoordinates(angleInDegrees: number, sizeOfSquare = 1) {
  let constrainedAngle = angleInDegrees % 360
  if (constrainedAngle < 0)
    constrainedAngle += 360

  const angleBetween0and45deg = constrainedAngle % 45
  const angle45InRadians = Math.PI / 180 * angleBetween0and45deg
  const delta = 1 / Math.cos(angle45InRadians) * Math.sin(angle45InRadians)

  const angleUnder180 = constrainedAngle % 180
  const xBase = delta
  const yBase = 1

  let x1
  let y1

  if (angleUnder180 < 45) {
    x1 = xBase // x ranges from 0 to 1
    y1 = yBase // y is always 1
  }
  else if (angleUnder180 < 90) {
    x1 = yBase // x is always 1
    y1 = 1 - xBase // y ranges from 1 to 0
  }
  else if (angleUnder180 < 135) {
    x1 = yBase // x is always 1
    y1 = -xBase // y ranges from 0 to -1
  }
  else if (angleUnder180 < 180) {
    x1 = 1 - xBase // x ranges from 1 to 0
    y1 = -yBase // y is always -1
  }

  if (constrainedAngle < 180) {
    x1 = -x1
    y1 = -y1
  }

  // The other coordinates of the line are just the inverse of the coordinates we already have found.
  let x2 = -x1
  let y2 = -y1

  // This converts the -1/1 to 1/-1 coordinate system to the 0/0 to 1/1 coordinate system, and
  // multiplies the coordinates by the size of the square given by the user.
  x1 = (x1 + 1) / 2 * sizeOfSquare
  y1 = (-y1 + 1) / 2 * sizeOfSquare
  x2 = (x2 + 1) / 2 * sizeOfSquare
  y2 = (-y2 + 1) / 2 * sizeOfSquare

  return { x1, y1, x2, y2 }
}
