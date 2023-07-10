import type { Node } from 'reactflow'
import type { SourceHandles } from '@/shared/lib/flow/types'

export interface PatternNode extends Node {
  type: 'patternNode'
  data: PatternNodeData
}

export type PatternNodeData = PatternWaves1Data & PatternNodeDataBase

export interface PatternNodeDataBase {
  type: 'pattern'
  prop: 'pattern'
  sourceHandles: SourceHandles
}

interface PatternWaves1Data {
  patternType: 'waves1'
  scale: number
  rotate: number
  strokeWidth: number
  backgroundColor: string
}
