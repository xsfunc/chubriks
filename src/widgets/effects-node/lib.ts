import type { CustomNode } from '@/shared/lib/flow/types'

export const effectsNodeDefault: CustomNode = {
  id: 'effects-node',
  type: 'effectsNode',
  position: { x: 444, y: 900 },
  data: {
    sourceHandles: {
      effects: { type: 'effects' },
    },
    effects: [],
  },
}
