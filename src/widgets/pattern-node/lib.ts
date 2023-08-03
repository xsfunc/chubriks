import { drawApi } from '@/shared/lib'
import type { CustomNode } from '@/shared/lib/flow/types'

export const patternNodeDefault: CustomNode = {
  id: 'pattern-node',
  type: 'patternNode',
  position: { x: 444, y: 600 },
  data: {
    type: drawApi.fillingTypes.DEFAULT,
    id: drawApi.defaultColors.LIGHT_GRAY,
    sourceHandles: {
      main: {
        type: 'pattern',
      },
    },
  },
}
