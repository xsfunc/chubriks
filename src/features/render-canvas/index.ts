import { sample } from 'effector'
import { drawManager, flowManager } from '@/shared/lib'
import { effectsModel } from '@/entities/effects'

sample({
  clock: [
    flowManager.nodeDataUpdated,
    flowManager.rootNode,
    flowManager.edges,
    effectsModel.effects,
  ],
  source: {
    effects: effectsModel.effects,
    nodes: flowManager.nodes,
    edges: flowManager.edges,
    rootNode: flowManager.rootNode,
  },
  target: drawManager.syncComposition,
})
