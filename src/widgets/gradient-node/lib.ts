import type { CustomNode } from '@/shared/lib/flow/types'

export const gradientNodeDefault: CustomNode = {
  id: 'gradient-node',
  type: 'gradientNode',
  position: { x: 0, y: 60 },
  data: {
    sourceHandles: {
      0: {
        type: 'gradient',
      },
      1: {
        type: 'gradient',
      },
      2: {
        type: 'gradient',
      },
      3: {
        type: 'gradient',
      },
      4: {
        type: 'gradient',
      },
      5: {
        type: 'gradient',
      },
      6: {
        type: 'gradient',
      },
      7: {
        type: 'gradient',
      },
      8: {
        type: 'gradient',
      },
      9: {
        type: 'gradient',
      },
    },
  },
}
