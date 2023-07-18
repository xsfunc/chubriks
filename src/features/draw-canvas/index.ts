import { createEvent, sample } from 'effector'
import { drawManager, flowManager, fxhash } from '@/shared/lib'
import { effectsModel } from '@/entities/effects'

export const drawCanvas = createEvent()

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
  clock: flowManager.nodesCompose,
  source: fxhash.configParam,
  fn: (config, compose) => ({ ...config, ...compose }),
  target: fxhash.updateConfigParam,
})
sample({
  clock: [drawCanvas, fxhash.configParam],
  source: fxhash.configParam,
  target: drawManager.draw,
})
