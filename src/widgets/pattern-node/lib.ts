import type { CustomNode } from '@/shared/lib/flow/types'

export const patternNodeDefault: CustomNode = {
  id: 'pattern-node',
  type: 'patternNode',
  position: { x: 444, y: 600 },
  data: {
    sourceHandles: {
      main: {
        type: 'pattern',
      },
    },
  },
}
