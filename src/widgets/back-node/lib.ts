import type { CustomNode } from '@/shared/lib/flow/types'
import { configApi } from '@/shared/config'

export const backNodeDefault: CustomNode = {
  id: 'back-node',
  type: 'backNode',
  position: { x: 697, y: 731 },
  data: {
    ...configApi.defaultConfigParam.back,
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
