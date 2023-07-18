import type { Node } from 'reactflow'

export const faceNodeDefault: Node = {
  id: 'face-node',
  type: 'faceNode',
  position: { x: 150, y: 60 },
  data: {
    eyes: {
      size: 50,
      variant: 1,
    },
    nose: {
      size: 50,
      variant: 1,
    },
    mouth: {
      size: 50,
      variant: 1,
    },
  },
}
