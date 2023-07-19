import { type Node, getConnectedEdges, getIncomers } from 'reactflow'
import type { CompositionFromNodeProps } from '../draw/types'

export function getNodeById(nodes: Node[], nodeId: string) {
  return nodes.find(node => node.id === nodeId)
}

export function compositionDataFromRoot({
  rootNode,
  nodes,
  edges,
}: CompositionFromNodeProps) {
  const cloned = (data: object | object[]) => Array.isArray(data) ? [...data] : { ...data }
  const incomers = getIncomers(rootNode, nodes, edges)
  let data = { ...rootNode.data }

  // recursive traversal of child nodes
  for (const node of incomers) {
    const childData = compositionDataFromRoot({ rootNode: node, nodes, edges })
    // get edges to find connection handle id
    const connectedEdges = getConnectedEdges([rootNode], edges)
    const connectedToCurrentNodeEdges = connectedEdges.filter(edge => edge.source === node.id)

    for (const edge of connectedToCurrentNodeEdges) {
      const { sourceHandle, targetHandle } = edge
      let childDataClone
      if (sourceHandle === 'main')
        childDataClone = { ...childData }
        // remove useless params
        // delete childDataClone.sourceHandles
        // delete childDataClone.targetHandles
        // delete childDataClone.prop

      else childDataClone = cloned(childData[sourceHandle as string])
      data = { ...data, [targetHandle as string]: childDataClone }
    }
  }

  delete data.sourceHandles
  delete data.targetHandles
  return data
}
