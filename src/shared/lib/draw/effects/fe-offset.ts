import { FE } from './constants'
import { formatInputId } from './create-effect'
import type { FeBlurOptions, FeBlurSerialized, FeProcessor } from './types'

export const feOffset: FeProcessor<FeBlurOptions, FeBlurSerialized> = {
  initial: {
    name: 'Offset',
    type: FE.OFFSET,
    in1: 0,
    result: null,
    x: 5,
    y: 5,
  },

  add({ in1, id, x, y }) {
    // @ts-expect-error incorrect types
    return add => add
      .offset(x, y)
      .in(formatInputId(in1))
      .result(id)
  },

  serialize: options => [
    options.id,
    options.type,
    options.in1,
    options.result,
    options.x,
    options.y,
  ],
  deserialize: (data) => {
    const [id, type, in1, result, x, y] = data
    return { id, type, in1, result, x, y }
  },
}
