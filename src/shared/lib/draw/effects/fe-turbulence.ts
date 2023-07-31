import { FE } from './constants'
import type { FeProcessor, FeTurbulenceOptions, FeTurbulenceSerialized } from './types'

export const feTurbulence: FeProcessor<FeTurbulenceOptions, FeTurbulenceSerialized> = {
  initial: {
    name: 'Turbulence',
    type: FE.TURBULENCE,
    in1: null,
    result: null,
    baseFrequency: 0.01,
    numOctaves: 2,
    seed: 2,
    stitchTiles: 'stitch',
    turbulence: 'turbulence',
  },

  add({ id, baseFrequency, numOctaves, seed, stitchTiles, turbulence }) {
    // @ts-expect-error incorrect types
    return add => add
      .turbulence(
        baseFrequency,
        numOctaves,
        seed,
        stitchTiles,
        turbulence,
      )
      .result(id)
  },

  serialize: options => [
    options.id,
    options.type,
    options.in1,
    options.result,
    options.baseFrequency,
    options.numOctaves,
    options.seed,
    options.stitchTiles === 'stitch',
    options.turbulence === 'turbulence',
  ],
  deserialize: (data) => {
    const [id, type, in1, result, baseFrequency, numOctaves, seed, toStitch, isTurbulence] = data
    const turbulence = isTurbulence ? 'turbulence' : 'fractalNoise'
    const stitchTiles = toStitch ? 'stitch' : 'noStitch'
    return { id, type, in1, result, baseFrequency, numOctaves, seed, stitchTiles, turbulence }
  },
}
