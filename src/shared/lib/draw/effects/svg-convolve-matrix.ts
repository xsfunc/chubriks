import { EFFECT } from './effect'
import type { EffectApi, EffectType } from './types'

export interface ConvolveMatrixEffectOptions {
  type: EffectType
  name: string
  matrix: string
}
export const svgConvolveMatrix: EffectApi<ConvolveMatrixEffectOptions> = {
  add({ matrix }) {
    // @ts-expect-error incorrect types
    return add => add.convolveMatrix(matrix.split(' '))
  },

  initial: {
    name: 'Convolve matrix',
    type: EFFECT.CONVOLVE_MATRIX,
    matrix: '9 0 0 0 1 0 0 0 -9',
  },

  toArray: null,
  toObject: null,
}
