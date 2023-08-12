import { FE } from './constants'
import type { FeMergeOptions, FeMergeSerialized, FeProcessor } from './types'

export const feMerge: FeProcessor<FeMergeOptions, FeMergeSerialized> = {
  initial: {
    name: 'Merge',
    type: FE.MERGE,
    result: null,
    array: [0, 0],
  },

  add({ id, array }) {
    // @ts-expect-error incorrect types
    return add => add
      .merge(array)
      .result(id)
  },

  serialize: options => [
    options.id,
    options.type,
    options.result,
    options.array,
  ],
  deserialize: (data) => {
    const [id, type, result, array] = data
    return { id, type, result, array }
  },
}
