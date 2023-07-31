import { FE } from './constants'
import { formatInputId } from './create-effect'
import type { FeMergeOptions, FeMergeSerialized, FeProcessor } from './types'

export const feMerge: FeProcessor<FeMergeOptions, FeMergeSerialized> = {
  initial: {
    name: 'Merge',
    type: FE.MERGE,
    in1: 0,
    result: null,
    array: [],
  },

  add({ in1, id, array }) {
    // @ts-expect-error incorrect types
    return add => add
      .merge(array)
      .in(formatInputId(in1))
      .result(id)
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
