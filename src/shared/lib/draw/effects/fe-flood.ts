import { FE } from './constants'
import { formatInputId } from './create-effect'
import type { FeFloodOptions, FeFloodSerialized, FeProcessor } from './types'

export const feFlood: FeProcessor<FeFloodOptions, FeFloodSerialized> = {
  initial: {
    name: 'Flood',
    type: FE.FLOOD,
    in1: 0,
    result: null,
    color: 'black',
    opacity: 1,
  },

  add({ in1, id, color, opacity }) {
    // @ts-expect-error incorrect types
    return add => add
      .flood(color, opacity)
      .in(formatInputId(in1))
      .result(id)
  },

  serialize: options => [
    options.id,
    options.type,
    options.in1,
    options.result,
    options.color,
    options.opacity,
  ],
  deserialize: (data) => {
    const [id, type, in1, result, color, opacity] = data
    return { id, type, in1, result, color, opacity }
  },
}
