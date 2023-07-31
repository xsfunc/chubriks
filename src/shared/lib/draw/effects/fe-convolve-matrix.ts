import { FE } from './constants'
import { formatInputId } from './create-effect'
import type { FeConvolveMatrixOptions, FeConvolveMatrixSerialized, FeProcessor } from './types'

export const feConvolveMatrix: FeProcessor<FeConvolveMatrixOptions, FeConvolveMatrixSerialized> = {
  initial: {
    name: 'Convolve matrix',
    type: FE.CONVOLVE_MATRIX,
    in1: 0,
    result: null,
    matrix: [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1,
    ],
  },

  add({ id, in1, matrix }) {
    // @ts-expect-error incorrect types
    return add => add
      .convolveMatrix(matrix)
      .in(formatInputId(in1))
      .result(id)
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
