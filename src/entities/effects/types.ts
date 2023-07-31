import type { Node } from 'reactflow'
import type { NodeDataHandles } from '@/shared/lib/flow/types'

export interface EffectsNode extends Node {
  type: 'effectsNode'
  data: EffectsNodeData
}

export interface EffectsNodeData extends NodeDataHandles {
  effects: number[]
}

export interface UpdateEffectProps {
  data: object
  effects: number[]
  effectId: string
  nodeId: string
}
