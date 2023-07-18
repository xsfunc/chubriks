import type { Node } from 'reactflow'
import { flowManager } from '@/shared/lib'
import { patternNodeDefault } from '@/entities/node-pattern'
import { resultNodeDefault } from '@/entities/node-result'
import { blurEffectDefault } from '@/entities/node-effects'
import { headNodeDefault } from '@/entities/node-head'
import { paletteNodeDefault } from '@/widgets/palette-node'

import '@/features/render-canvas'

// TODO
const faceNode: Node = {
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

export const initialNodes: Node[] = [
  patternNodeDefault,
  paletteNodeDefault,
  headNodeDefault,
  blurEffectDefault,
  faceNode,
  resultNodeDefault,
]

flowManager.initNodes(initialNodes)
