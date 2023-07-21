import type { Node } from 'reactflow'

export interface NodeDataUpdate {
  id: string
  data: object
}
export interface NodeDataHandles {
  sourceHandles?: SourceHandles
  targetHandles?: TargetHandles
}
export interface SourceHandles {
  [K: string]: SourceHandle
}
export interface TargetHandles {
  [K: string]: TargetHandle
}
export interface SourceHandle {
  type: string
}
export interface TargetHandle {
  accept: string[]
}

export type NodeId = string
export type EdgeId = string

export interface CustomNode extends Node {
  data: NodeDataHandles
}
