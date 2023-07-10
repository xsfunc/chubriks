import type { Node } from 'reactflow'
import type { NodeDataHandles } from '@/shared/lib/flow/types'

export interface PaletteNode extends Node {
  data: PaletteNodeData
}

export interface PaletteNodeData extends NodeDataHandles {
  colorIds: string[]
}
