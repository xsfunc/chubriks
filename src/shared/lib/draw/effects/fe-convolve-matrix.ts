import { FE } from './constants'
import type { FeConvolveMatrixOptions, FeConvolveMatrixSerialized, FeProcessor } from './types'

export const feConvolveMatrix: FeProcessor<FeConvolveMatrixOptions, FeConvolveMatrixSerialized> = {
  initial: {
    name: 'Convolve matrix',
    type: FE.COLOR_MATRIX,
    in1: null,
    result: null,
    matrix: [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1,
    ],
  },

  add({ matrix }) {
    // @ts-expect-error incorrect types
    return add => add.convolveMatrix(matrix)
  },

  serialize: options => [
    options.id,
    options.type,
    options.in1,
    options.result,
    options.matrix,
  ],
  deserialize: (data) => {
    const [id, type, in1, result, matrix] = data
    return { id, type, in1, result, matrix }
  },
}
