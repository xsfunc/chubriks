import { drawApi } from '@/shared/lib'
import type { CustomNode } from '@/shared/lib/flow/types'

export const gradientNodeDefault: CustomNode = {
  id: 'gradient-node',
  type: 'gradientNode',
  position: { x: 0, y: 60 },
  data: {
    1: {
      id: 1,
      type: drawApi.fillingTypes.GRADIENT,
    },
    2: {
      id: 2,
      type: drawApi.fillingTypes.GRADIENT,
    },
    3: {
      id: 3,
      type: drawApi.fillingTypes.GRADIENT,
    },
    4: {
      id: 4,
      type: drawApi.fillingTypes.GRADIENT,
    },
    5: {
      id: 5,
      type: drawApi.fillingTypes.GRADIENT,
    },

    sourceHandles: {
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
    },
  },
}
