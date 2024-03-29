import { FE, feBlendMode } from './constants'
import { formatInputId } from './create-effect'
import type { FeBlendOptions, FeBlendSerialized, FeProcessor } from './types'

export const feBlend: FeProcessor<FeBlendOptions, FeBlendSerialized> = {
  initial: {
    name: 'Blend',
    type: FE.BLEND,
    mode: 'normal',
    in1: 0,
    in2: 1,
    result: null,
  },

  add({ id, in1, in2, mode }) {
    // @ts-expect-error incorrect types
    return add => add
      .blend(
        formatInputId(in1),
        formatInputId(in2),
        mode,
      )
      .result(id)
  },

  serialize: (options) => {
    const modeIndex = feBlendMode.findIndex(mode => mode === options.mode)
    return [
      options.id,
      options.type,
      options.in1,
      options.result,
      options.in2,
      modeIndex,
    ]
  },
  deserialize: (data) => {
    const modeIndex = data[5]
    const modeByIndex = feBlendMode[modeIndex]
    return {
      id: data[0],
      type: data[1],
      in1: data[2],
      result: data[3],
      mode: modeByIndex,
      in2: data[4],
    }
  },
}
