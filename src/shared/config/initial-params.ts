import { encode } from 'msgpack-lite'

const encodedEmptyArray = encode([])
const defaultConfigParam = {
  palette: {
    seed: 0,
    hueShift: 0,
  },
  face: {
    eyes: {
      size: 50,
      variant: 1,
      y: 0,
      mirror: false,
    },
    nose: {
      size: 50,
      variant: 1,
      y: 0,
    },
    mouth: {
      size: 50,
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
    stroke: {
      type: 'color',
      color: 'black',
    },
    fill: {
      type: 'color',
      color: 'white',
    },
    strokeWidth: 5,
    strokeEffects: [],
    effects: [],
  },
  back: {
    fill: {
      type: 'color',
      color: 'white',
    },
    effects: [],
  },
}

export const uint8EncodedConfig = new Uint8Array(encode(defaultConfigParam))
export const uint8EncodedArray = new Uint8Array(encodedEmptyArray)
