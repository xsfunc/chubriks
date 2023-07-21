import type { Node } from 'reactflow'
import type { HeadProps } from '@/shared/lib'
import type { NodeDataHandles } from '@/shared/lib/flow/types'

export interface HeadNode extends Node {
  type: 'headNode'
  data: HeadNodeData
}

interface HeadNodeData extends NodeDataHandles, HeadProps {
}
