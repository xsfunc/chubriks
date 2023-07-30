import { EFFECT } from './effect'
import type { EffectApi, EffectType } from './types'

export interface TurbulenceEffectOptions {
  type: EffectType
  name: string
  baseFrequency: number
  numOctaves: number
  seed: number
  stitchTiles: boolean
  turbulence: boolean
}
export const svgTurbulence: EffectApi<TurbulenceEffectOptions> = {
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
      .result('turbulence')
  },

  initial: {
    name: 'Turbulence',
    type: EFFECT.TURBULENCE,
    baseFrequency: 0.015,
    numOctaves: 2,
    seed: 2,
    stitchTiles: true,
    turbulence: true,
  },

  toArray: null,
  toObject: null,
}
