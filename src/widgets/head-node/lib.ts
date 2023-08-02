import type { HeadNode } from './types'
import { configApi } from '@/shared/config'

export const headNodeDefault: HeadNode = {
  id: 'head-node',
  type: 'headNode',
  position: { x: 697, y: 310 },
  data: {
    ...configApi.defaultConfigParam.head,
    sourceHandles: {
      main: {
        type: 'head',
      },
    },
    targetHandles: {
      eyes: { accept: ['eyes'] },
      mouth: { accept: ['mouth'] },
      stroke: { accept: ['color', 'pattern', 'gradient'] },
      fill: { accept: ['color', 'pattern', 'gradient'] },
      strokeEffects: { accept: ['effects'] },
      effects: { accept: ['effects'] },
    },
  },
}
