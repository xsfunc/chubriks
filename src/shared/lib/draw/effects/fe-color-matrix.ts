import { FE, feColorMatrixVariant } from './constants'
import { formatInputId } from './create-effect'
import type { FeColorMatrixOptions, FeColorMatrixSerialized, FeProcessor } from './types'

export const feColorMatrix: FeProcessor<FeColorMatrixOptions, FeColorMatrixSerialized> = {
  initial: {
    name: 'Color Matrix',
    type: FE.COLOR_MATRIX,
    in1: 0,
    result: null,
    variant: 'luminanceToAlpha',
    value: '',
  },

  add({ id, in1, variant, value }) {
    // @ts-expect-error incorrect types
    return add => add
      .colorMatrix(variant, value)
      .in(formatInputId(in1))
      .result(id)
  },

  serialize: (options) => {
    const variantIndex = feColorMatrixVariant.findIndex(variant => variant === options.variant)
    return [
      options.id,
      options.type,
      options.in1,
      options.result,
      variantIndex,
      options.value,
    ]
  },
  deserialize: (data) => {
    const [id, type, in1, result, variantIndex, value] = data
    const variant = feColorMatrixVariant[variantIndex]
    return { id, type, in1, result, variant, value }
  },
}
