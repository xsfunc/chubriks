import { FE } from './constants'
import type { FeDisplacementOptions, FeDisplacementSerialized, FeProcessor } from './types'

export const feDisplacement: FeProcessor<FeDisplacementOptions, FeDisplacementSerialized> = {
  initial: {
    name: 'Displacement',
    type: FE.DISPLACEMENT,
    in1: 'SourceGraphic',
    in2: null,
    result: null,
    scale: 20,
    xChannelSelector: 0,
    yChannelSelector: 0,
  },

  add({ in1, in2, scale, xChannelSelector, yChannelSelector }) {
    const channels = ['R', 'G', 'B', 'A']
    // @ts-expect-error incorrect types
    return add => add.displacementMap(
      in1,
      // add.$source,
      // in2,
      2,
      scale,
      channels[xChannelSelector],
      channels[yChannelSelector],
    )
  },

  serialize: options => [
    options.id,
    options.type,
    options.in1,
    options.result,
    options.in2,
    options.scale,
    options.xChannelSelector,
    options.yChannelSelector,
  ],
  deserialize: (data) => {
    const [id, type, in1, result, in2, scale, x, y] = data
    return { id, type, in1, result, in2, scale, xChannelSelector: x, yChannelSelector: y }
  },
}
