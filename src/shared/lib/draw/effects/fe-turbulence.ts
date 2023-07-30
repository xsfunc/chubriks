import { FE } from './constants'
import type { FeProcessor, FeTurbulenceOptions, FeTurbulenceSerialized } from './types'

export const feBlur: FeProcessor<FeTurbulenceOptions, FeTurbulenceSerialized> = {
  initial: {
    type: FE.TURBULENCE,
    in1: null,
    result: null,
    baseFrequency: 0.01,
    numOctaves: 2,
    seed: 2,
    stitchTiles: true,
    turbulence: true,
  },

  add({ baseFrequency, numOctaves, seed, stitchTiles, turbulence }) {
    // @ts-expect-error incorrect types
    return add => add
      .turbulence(
        baseFrequency,
        numOctaves,
        seed,
        stitchTiles ? 'stitch' : 'noStitch',
        turbulence ? 'turbulence' : 'fractalNoise',
      )
      // .result('turbulence')
  },

  serialize: options => [
    options.id,
    options.type,
    options.in1,
    options.result,
    options.baseFrequency,
    options.numOctaves,
    options.seed,
    options.stitchTiles,
    options.turbulence,
  ],
  deserialize: (data) => {
    const [id, type, in1, result, baseFrequency, numOctaves, seed, stitchTiles, turbulence] = data
    return { id, type, in1, result, baseFrequency, numOctaves, seed, stitchTiles, turbulence }
  },
}
