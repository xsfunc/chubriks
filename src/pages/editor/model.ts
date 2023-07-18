import type { Node } from 'reactflow'
import { flowManager } from '@/shared/lib'
import { patternNodeDefault } from '@/entities/node-pattern'
import { resultNodeDefault } from '@/entities/node-result'
import { blurEffectDefault } from '@/entities/node-effects'
import { headNodeDefault } from '@/entities/node-head'
import { paletteNodeDefault } from '@/widgets/palette-node'

import '@/features/render-canvas'

// TODO
const eyesNode: Node = {
  id: 'eyes-node',
  type: 'eyesNode',
  position: { x: 150, y: 60 },
  data: {
    fill: '#000000',
    size: 50,
    variant: 1,
  },
}
const noseNode: Node = {
  id: 'nose-node',
  type: 'noseNode',
  position: { x: 150, y: 220 },
  data: {
    fill: '#000000',
    size: 50,
    variant: 1,
  },
}
const mouthNode: Node = {
  id: 'mouth-node',
  type: 'mouthNode',
  position: { x: 150, y: 390 },
  data: {
    fill: '#000000',
    size: 50,
    variant: 1,
  },
}

export const initialNodes: Node[] = [
  patternNodeDefault,
  paletteNodeDefault,
  headNodeDefault,
  blurEffectDefault,
  eyesNode,
  noseNode,
  mouthNode,
  resultNodeDefault,
]

flowManager.initNodes(initialNodes)
