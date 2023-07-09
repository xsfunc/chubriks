import type { Node } from 'reactflow'

export interface PatternNode extends Node {
  type: 'patternNode'
  data: PatternNodeData
}

export type PatternNodeData = PatternWaves1Data

interface PatternWaves1Data {
  patternType: 'waves1'
  scale: number
  rotate: number
  strokeWidth: number
  backgroundColor: string
}
