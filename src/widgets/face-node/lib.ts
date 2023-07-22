import type { CustomNode } from '@/shared/lib/flow/types'

export const faceNodeDefault: CustomNode = {
  id: 'face-node',
  type: 'faceNode',
  position: { x: 150, y: 60 },
  data: {
    sourceHandles: {
      eyes: { type: 'eyes' },
      nose: { type: 'nose' },
      mouth: { type: 'mouth' },
    },
    eyes: true,
    nose: true,
    mouth: true,
  },
}
