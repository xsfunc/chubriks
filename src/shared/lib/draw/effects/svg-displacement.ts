import { EFFECT } from './effect'
import type { EffectApi, EffectType } from './types'

export interface DisplacementEffectOptions {
  type: EffectType
  name: string
  in1?: any
  in2?: any
  scale: number
  xChannelSelector: 0 | 1 | 2 | 3
  yChannelSelector: 0 | 1 | 2 | 3
}
export const svgDisplacementMap: EffectApi<DisplacementEffectOptions> = {
  add({ in1 = 'SourceGraphic ', in2 = 'SourceGraphic ', scale, xChannelSelector, yChannelSelector }) {
    const channels = ['R', 'G', 'B', 'A']
    // @ts-expect-error incorrect types
    return add => add.displacementMap(
      in1,
      in2,
      scale,
      channels[xChannelSelector],
      channels[yChannelSelector],
    )
  },

  initial: {
    name: 'Displacement map',
    type: EFFECT.DISPLACEMENT,
    scale: 1,
    xChannelSelector: 0,
    yChannelSelector: 0,
  },

  toArray: null,
  toObject: null,
}
