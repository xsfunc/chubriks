import { encode } from 'msgpack-lite'
import { fillingApi } from '../lib/draw/filling'
import type { CompositionProps } from '../lib'

const encodedEmptyArray = encode([])
export const defaultConfigParam: Omit<CompositionProps, 'colors'> = {
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
    hideNeck: false,
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
  effects: [],
  patterns: [],
  gradients: [],
}

export const configParamLength = 4096
export const configParamUint8Encoded = new Uint8Array(encode(defaultConfigParam))
export const uint8EncodedArray = new Uint8Array(encodedEmptyArray)
