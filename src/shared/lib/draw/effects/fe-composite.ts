import { FE, feCompositeOperator } from './constants'
import type { FeCompositeOptions, FeCompositeSerialized, FeProcessor } from './types'

export const feComposite: FeProcessor<FeCompositeOptions, FeCompositeSerialized> = {
  initial: {
    name: 'Composite',
    type: FE.COMPOSITE,
    in1: 'SourceGraphic',
    in2: null,
    result: null,
    operator: 'over',
  },

  add({ in1, in2, operator }) {
    // @ts-expect-error incorrect types
    return add => add.composite(in1, in2, operator)
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
