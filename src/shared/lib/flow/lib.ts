import type { Node } from 'reactflow'

export function getNodeById(nodes: Node[], nodeId: string) {
  return nodes.find(node => node.id === nodeId)
}
