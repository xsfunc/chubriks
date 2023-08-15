import { createEvent, sample } from 'effector'
import { flowApi } from '@/shared/lib'

export const deleteNodeCalled = createEvent<string>()

sample({
  clock: deleteNodeCalled,
  target: flowApi.manager.deleteNode,
})

// sample({
//   clock: deleteNodeCalled,
//   source: flowApi.manager.nodes,
//   filter(nodes, nodeId) {
//     const node = flowApi.getNodeById(nodes, nodeId)
//     if (!node)
//       return false
//     if (node.type !== 'patternNode')
//       return false
//     if (node.data.id === undefined)
//       return false
//     return true
//   },
//   fn(nodes, nodeId) {
//     const node = flowApi.getNodeById(nodes, nodeId) as Node
//     return node.data.id
//   },
//   target: patternsModel.deletePattern,
// })
