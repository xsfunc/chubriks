import { encode } from 'msgpack-lite'
import { fillingApi } from '../lib/draw/filling'
import type { CompositionProps } from '../lib'

const encodedEmptyArray = encode([])
export const defaultConfigParam: Omit<CompositionProps, 'colors' | 'effects' | 'patterns' | 'gradients'> = {
  palette: {
    seed: 0,
    hueShift: 0,
  },
  face: {
    eyes: {
      size: 5,
      variant: 1,
      y: 0,
      mirror: false,
    },
    mouth: {
      size: 5,
      variant: 1,
      y: 0,
    },
  },
  head: {
    width: 500,
    height: 650,
    radius: 50,
    eyes: false,
    nose: false,
    mouth: false,
    strokeWidth: 5,
    stroke: {
      type: fillingApi.types.DEFAULT,
      id: fillingApi.defaultColorsIds.DARK_GRAY,
    },
    fill: {
      type: fillingApi.types.DEFAULT,
      id: fillingApi.defaultColorsIds.GRAY,
    },
    strokeEffects: [],
    effects: [],
  },
  back: {
    fill: {
      type: fillingApi.types.DEFAULT,
      id: fillingApi.defaultColorsIds.LIGHT_GRAY,
    },
    effects: [],
  },
}

export const uint8EncodedConfig = new Uint8Array(encode(defaultConfigParam))
export const uint8EncodedArray = new Uint8Array(encodedEmptyArray)
