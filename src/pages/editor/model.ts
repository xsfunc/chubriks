import type { Edge, Node } from 'reactflow'
import { resultNodeDefault } from '@/widgets/result-node'
import { blurEffectDefault } from '@/entities/node-effects'
import { headNodeDefault } from '@/widgets/head-node'
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
    id: '1',
  },
  {
    source: 'palette-node',
    sourceHandle: '9',
    target: 'back-node',
    targetHandle: 'fill',
    id: '2',
  },
  {
    source: 'head-node',
    sourceHandle: 'main',
    target: 'result-node',
    targetHandle: 'head',
    id: '3',
  },
]

flowManager.initNodes(initialNodes)
flowManager.initEdges(initialEdges)
