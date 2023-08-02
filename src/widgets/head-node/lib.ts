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
      nose: { accept: ['nose'] },
      mouth: { accept: ['mouth'] },
      stroke: { accept: ['color', 'pattern'] },
      fill: { accept: ['color', 'pattern'] },
      strokeEffects: { accept: ['effects'] },
      effects: { accept: ['effects'] },
    },
  },
}
