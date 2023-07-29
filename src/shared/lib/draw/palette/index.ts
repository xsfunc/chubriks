import type { PaintOptions, PaintSerialized, PaintType } from './types'

const paintTypes = {
  DEFAULT: 0,
  PALETTE: 1,
  GRADIENT: 2,
} as const

const defaultColorsIds = {
  BLACK: 0,
  WHITE: 1,
  GRAY: 2,
} as const

export const paintApi = {
  types: paintTypes,
  defaultColorsIds,
  // defaultPalette,

  serialize: ({ type, id }: PaintOptions): [PaintType, number] => [type, id],
  deserialize: ([type, id]: PaintSerialized) => ({ type, id }),
}
