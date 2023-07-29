import type { Edge, Node } from 'reactflow'
import { resultNodeDefault } from '@/widgets/result-node'
import { headNodeDefault } from '@/widgets/head-node'
import { paletteNodeDefault } from '@/widgets/palette-node'
import { faceNodeDefault } from '@/widgets/face-node'
import { flowManager } from '@/shared/lib'
import { backNodeDefault } from '@/widgets/back-node'
import { effectsNodeDefault } from '@/widgets/effects-node'
import { patternNodeDefault } from '@/widgets/pattern-node'

export const initialNodes: Node[] = [
  patternNodeDefault,
  paletteNodeDefault,
  headNodeDefault,
  effectsNodeDefault,
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
  // {
  //   source: 'palette-node',
  //   sourceHandle: '9',
  //   target: 'back-node',
  //   targetHandle: 'fill',
  //   id: '2',
  // },
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
