import type { Edge, Node } from 'reactflow'
import { resultNodeDefault } from '@/widgets/result-node'
import { blurEffectDefault } from '@/entities/node-effects'
import { headNodeDefault } from '@/entities/node-head'
import { paletteNodeDefault } from '@/widgets/palette-node'
import { faceNodeDefault } from '@/widgets/face-node'
import { flowManager } from '@/shared/lib'
import { backNodeDefault } from '@/widgets/back-node'
import { patternNodeDefault } from '@/entities/patterns'

export const initialNodes: Node[] = [
  patternNodeDefault,
  paletteNodeDefault,
  headNodeDefault,
  blurEffectDefault,
  faceNodeDefault,
  resultNodeDefault,
  backNodeDefault,
]

export const initialEdges: Edge[] = [
  {
    source: 'back-node',
    sourceHandle: 'main',
    target: 'result-node',
    targetHandle: 'back',
    id: 'reactflow__edge-back-nodemain-result-nodeback',
  },
  {
    source: 'palette-node',
    sourceHandle: '9',
    target: 'back-node',
    targetHandle: 'fill',
    id: 'reactflow__edge-palette-node9-back-nodefill',
  },
  {
    source: 'head-node',
    sourceHandle: 'main',
    target: 'result-node',
    targetHandle: 'head',
    id: 'reactflow__edge-head-nodemain-result-nodehead',
  },
]

flowManager.initNodes(initialNodes)
flowManager.initEdges(initialEdges)
