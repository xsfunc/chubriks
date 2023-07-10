import type { Node } from 'reactflow'
import type { CompositionProps } from '@/shared/lib'
import type { SourceHandle, TargetHandle } from '@/shared/lib/flow/types'

export interface ResultNode extends Node {
  data: ResultNodeData
}

export interface ResultNodeData extends CompositionProps {
  targetHandles: {
    [K: string]: TargetHandle
  }
  sourceHandles?: {
    [K: string]: SourceHandle
  }
}
