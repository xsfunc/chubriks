import type { Node } from 'reactflow'
import type { NodeDataHandles } from '@/shared/lib/flow/types'
import type { PatternProps, PatternType } from '@/shared/lib'

export interface PatternNode extends Node {
  type: 'patternNode'
  data: PatternNodeData
}

export type PatternNodeData = NodeDataHandles & PatternProps

export type PatternComponentMap = {
  [Key in PatternType]: any
}
