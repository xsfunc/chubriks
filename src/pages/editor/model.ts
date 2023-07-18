import type { Node } from 'reactflow'
import { patternNodeDefault } from '@/entities/node-pattern'
import { resultNodeDefault } from '@/entities/node-result'
import { blurEffectDefault } from '@/entities/node-effects'
import { headNodeDefault } from '@/entities/node-head'
import { paletteNodeDefault } from '@/widgets/palette-node'
import { faceNodeDefault } from '@/widgets/face-node'
import { flowManager } from '@/shared/lib'
import { backNodeDefault } from '@/widgets/back-node'

export const initialNodes: Node[] = [
  patternNodeDefault,
  paletteNodeDefault,
  headNodeDefault,
  blurEffectDefault,
  faceNodeDefault,
  resultNodeDefault,
  backNodeDefault,
]

flowManager.initNodes(initialNodes)
