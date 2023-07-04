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

// export function updateNodeEffects({ nodes, nodeId, filterId, payload }: UpdateEffectProps) {
//   const node = nodeById(nodes, nodeId)
//   if (!node)
//     return undefined

//   const { prop } = node
//   const updatedEffects = effects.map(effect =>
//     effect.id === filterId
//       ? { ...filter, data: { ...filter.data, ...update } }
//       : filter)
//   return {
//     id: nodeId,
//     data: { [prop]: updatedEffects },
//   }
// }
