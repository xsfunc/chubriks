import { FE } from './constants'
import type { FeFloodOptions, FeFloodSerialized, FeProcessor } from './types'

export const feFlood: FeProcessor<FeFloodOptions, FeFloodSerialized> = {
  initial: {
    name: 'Flood',
    type: FE.FLOOD,
    in1: null,
    result: null,
    color: 'black',
    opacity: 1,
  },

  add({ color, opacity }) {
    // @ts-expect-error incorrect types
    return add => add.flood(color, opacity)
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
