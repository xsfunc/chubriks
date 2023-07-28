import { createEvent, sample } from 'effector'
import type { Node } from 'reactflow'
import { flowApi } from '@/shared/lib'
import { patternsModel } from '@/entities/patterns'

export const deleteNodeCalled = createEvent<string>()

sample({
  clock: deleteNodeCalled,
  source: flowApi.manager.nodes,
  filter(nodes, nodeId) {
    return false // TODO: Need delete patterns after node deleted
    const node = flowApi.getNodeById(nodes, nodeId)
    if (!node)
      return false

    const pattern = node.data.patternId
    return node.type === 'patternNode' && pattern !== undefined
  },
  fn(nodes, nodeId) {
    const node = flowApi.getNodeById(nodes, nodeId) as Node
    return node.data.patternId
  },
  target: patternsModel.deletePattern,
})
sample({
  clock: deleteNodeCalled,
  target: flowApi.manager.deleteNode,
})
