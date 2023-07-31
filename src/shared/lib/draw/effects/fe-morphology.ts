import { FE, feMorphologyOperator } from './constants'
import { formatInputId } from './create-effect'
import type { FeMorphologyOptions, FeMorphologySerialized, FeProcessor } from './types'

export const feMorphology: FeProcessor<FeMorphologyOptions, FeMorphologySerialized> = {
  initial: {
    name: 'Morphology',
    type: FE.MORPHOLOGY,
    in1: 0,
    result: null,
    operator: 'erode',
    radius: [3, 3],
  },

  add({ id, in1, operator, radius }) {
    // @ts-expect-error incorrect types
    return add => add
      .morphology(operator, radius.join(' '))
      .in(formatInputId(in1))
      .result(id)
  },

  serialize: (options) => {
    const operatorIndex = feMorphologyOperator.findIndex(operator => operator === options.operator)
    return [
      options.id,
      options.type,
      options.in1,
      options.result,
      operatorIndex,
      options.radius,
    ]
  },
  deserialize: (data) => {
    const [id, type, in1, result, opIndex, radius] = data
    const operator = feMorphologyOperator[opIndex]
    return { id, type, in1, result, operator, radius }
  },
}
