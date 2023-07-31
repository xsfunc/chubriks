import { FE } from './constants'
import type { FeBlurOptions, FeBlurSerialized, FeProcessor } from './types'

export const feBlur: FeProcessor<FeBlurOptions, FeBlurSerialized> = {
  initial: {
    name: 'Offset',
    type: FE.OFFSET,
    in1: null,
    result: null,
    x: 5,
    y: 5,
  },

  add({ x, y }) {
    // @ts-expect-error incorrect types
    return add => add.offset(x, y)
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
