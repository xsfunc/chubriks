import type { Node } from 'reactflow'
import type { HeadProps } from '@/shared/lib'

export interface HeadNode extends Node {
  type: 'headNode'
  data: HeadNodeData
}

interface HeadNodeData extends HeadProps {
  prop: 'face'
}
