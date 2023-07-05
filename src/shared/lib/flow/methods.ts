import type { Node } from 'reactflow'

interface UpdateEffectProps {
  nodes: Node[]
  nodeId: string
  filterId: string
  payload: object
}

export function nodeById(nodes: Node[], nodeId: string) {
  return nodes.find(node => node.id === nodeId)
}
