import { FE } from './constants'
import type { FeMergeOptions, FeMergeSerialized, FeProcessor } from './types'

export const feMerge: FeProcessor<FeMergeOptions, FeMergeSerialized> = {
  initial: {
    name: 'Merge',
    type: FE.MERGE,
    in1: null,
    result: null,
    array: [],
  },

  add({ array }) {
    // @ts-expect-error incorrect types
    return add => add.merge(array)
  },

  serialize: options => [
    options.id,
    options.type,
    options.in1,
    options.result,
    options.array,
  ],
  deserialize: (data) => {
    const [id, type, in1, result, array] = data
    return { id, type, in1, result, array }
  },
}
