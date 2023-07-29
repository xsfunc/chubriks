import { defaultColors, defaultColorsIds, fillingTypes } from './constants'
import type { FillingFactory, FillingOptions, FillingSerialized, FillingType } from './types'
import { createPoline, polinePalette } from './poline'

const serialize = ({ type, id }: FillingOptions): [FillingType, number] => [type, id]
const deserialize = ([type, id]: FillingSerialized) => ({ type, id })
const isPattern = ({ type }: FillingOptions): boolean => type === fillingTypes.PATTERN
const isColor = ({ type }: FillingOptions): boolean => type === (fillingTypes.PALETTE || fillingTypes.DEFAULT)
const isGradient = ({ type }: FillingOptions): boolean => type === fillingTypes.GRADIENT

function createFactory({ palette }: { palette: string[] }): FillingFactory {
  return {
    types: fillingTypes,
    defaultColorsIds,
    palette,
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
