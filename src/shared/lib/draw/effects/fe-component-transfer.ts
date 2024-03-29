import { FE } from './constants'
import { formatInputId } from './create-effect'
import type { FeComponentTransferOptions, FeComponentTransferSerialized, FeProcessor } from './types'

export const feComponentTransfer: FeProcessor<FeComponentTransferOptions, FeComponentTransferSerialized> = {
  initial: {
    name: 'Comp. transfer',
    type: FE.COMPONENT_TRANSFER,
    in1: 0,
    result: null,
    a: {
      type: 'table',
      tableValues: [0, 1],
    },
    b: {
      type: 'table',
      tableValues: [1, 0, 1],
    },
    g: {
      type: 'table',
      tableValues: [0, 1, 0],
    },
    r: {
      type: 'table',
      tableValues: [1, 0, 1],
    },
  },

  add({ id, in1, a, b, g, r }) {
    // @ts-expect-error incorrect types
    return add => add
      .componentTransfer({ a, b, g, r })
      .in(formatInputId(in1))
      .result(id)
  },

  serialize: (options) => {
    return [
      options.id,
      options.type,
      options.in1,
      options.result,
      options.a,
      options.b,
      options.g,
      options.r,
    ]
  },
  deserialize: (data) => {
    const [id, type, in1, result, a, b, g, r] = data
    return { id, type, in1, result, a, b, g, r }
  },
}
