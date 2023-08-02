import type { CustomNode } from '@/shared/lib/flow/types'

export const faceNodeDefault: CustomNode = {
  id: 'face-node',
  type: 'faceNode',
  position: { x: 300, y: 160 },
  data: {
    sourceHandles: {
      eyes: { type: 'eyes' },
      mouth: { type: 'mouth' },
    },
    eyes: true,
    mouth: true,
  },
}
