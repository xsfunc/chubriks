import { sample } from 'effector'
import { debug } from 'patronum'
import { drawManager, flowManager, fxhash } from '@/shared/lib'
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
  target: [],
})

sample({
  clock: fxhash.params,
  target: drawManager.draw,
})

debug({ draw: drawManager.draw })
