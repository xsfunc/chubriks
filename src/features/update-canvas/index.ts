import { sample } from 'effector'
import { drawManager, flowManager } from '@/shared/lib'

sample({
  clock: [
    flowManager.nodeDataUpdated,
    flowManager.rootNode,
    flowManager.edges,
  ],
  source: {
    nodes: flowManager.nodes,
    edges: flowManager.edges,
    rootNode: flowManager.rootNode,
  },
  target: drawManager.syncComposition,
})

// debug(drawManager.syncComposition, flowManager.nodeDataUpdated)
