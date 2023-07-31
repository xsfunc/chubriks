import { FE } from './constants'
import type { FeBlurOptions, FeBlurSerialized, FeProcessor } from './types'

export const feBlur: FeProcessor<FeBlurOptions, FeBlurSerialized> = {
  initial: {
    name: 'Blur',
    type: FE.BLUR,
    in1: 0,
    result: null,
    x: 5,
    y: 5,
  },

  add({ id, in1, x, y }) {
    // @ts-expect-error incorrect types
    return add => add
      .gaussianBlur(x, y)
      .in(in1)
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
