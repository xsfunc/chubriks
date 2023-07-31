import { FE, feCompositeOperator } from './constants'
import { formatInputId } from './create-effect'
import type { FeCompositeOptions, FeCompositeSerialized, FeProcessor } from './types'

export const feComposite: FeProcessor<FeCompositeOptions, FeCompositeSerialized> = {
  initial: {
    name: 'Composite',
    type: FE.COMPOSITE,
    in1: 0,
    in2: 0,
    result: null,
    operator: 'over',
  },

  add({ id, in1, in2, operator }) {
    // @ts-expect-error incorrect types
    return add => add.composite(
      formatInputId(in1),
      formatInputId(in2),
      operator,
    )
      .result(id)
  },

  serialize: (options) => {
    const operatorIndex = feCompositeOperator.findIndex(operator => operator === options.operator)
    return [
      options.id,
      options.type,
      options.in1,
      options.result,
      options.in2,
      operatorIndex,
    ]
  },
  deserialize: (data) => {
    const [id, type, in1, result, in2, operatorIndex] = data
    const operator = feCompositeOperator[operatorIndex]
    return { id, type, in1, result, in2, operator }
  },
}
