import type { CustomNode } from '@/shared/lib/flow/types'

export const patternNodeDefault: CustomNode = {
  id: 'pattern-node',
  type: 'patternNode',
  position: { x: 444, y: 600 },
  data: {
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
