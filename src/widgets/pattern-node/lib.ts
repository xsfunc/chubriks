import type { CustomNode } from '@/shared/lib/flow/types'

export const patternNodeDefault: CustomNode = {
  id: 'pattern-node',
  type: 'patternNode',
  position: { x: 444, y: 600 },
  data: {
    type: 'color',
    color: 'black',
    color1: {
      type: 'color',
      color: 'black',
    },
    color2: {
      type: 'color',
      color: 'white',
    },
    color3: {
      type: 'color',
      color: 'gray',
    },
    targetHandles: {
      color1: {
        accept: ['color'],
      },
      color2: {
        accept: ['color'],
      },
      color3: {
        accept: ['color'],
      },
    },
    sourceHandles: {
      main: {
        type: 'pattern',
      },
    },
  },
}
