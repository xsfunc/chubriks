import type { CustomNode } from '@/shared/lib/flow/types'

export const backNodeDefault: CustomNode = {
  id: 'back-node',
  type: 'backNode',
  position: { x: 697, y: 731 },
  data: {
    targetHandles: {
      fill: {
        accept: ['color', 'pattern'],
      },
      effects: {
        accept: ['effects'],
      },
    },
  },
}
