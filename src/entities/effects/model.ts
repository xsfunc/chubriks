import { createEvent, createStore, sample } from 'effector'
import type { Node } from 'reactflow'
import { toNodeEffects } from './lib'

// import type { EffectOptions, EffectType } from '@/shared/lib'
import type { FeInitial, FeOptions, FeType } from '@/shared/lib'
import { drawApi, flowApi } from '@/shared/lib'

const { effectMap, effects } = drawApi
const defaultEffects: Record<FeType, FeInitial> = {
  // [effectMap.DROP_SHADOW]: effects.cssDropShadow.initial,
  // [effectMap.GRAYSCALE]: effects.cssGrayscale.initial,
  // [effectMap.INVERT]: effects.cssInvert.initial,
  // [effectMap.SEPIA]: effects.cssSepia.initial,
  // [effectMap.OPACITY]: effects.cssOpacity.initial,
  [effectMap.BLEND]: effects.feBlend.initial,
  [effectMap.BLUR]: effects.feBlur.initial,
  [effectMap.TURBULENCE]: effects.feTurbulence.initial,
  [effectMap.DISPLACEMENT]: effects.feDisplacement.initial,
  // [effectMap.CONVOLVE_MATRIX]: effects.svgConvolveMatrix.initial,
} as const

const addEffectCalled = createEvent<{ nodeId: string; type: FeType }>()
const updateEffectCalled = createEvent<{ id: number; data: object }>()
const deleteEffectCalled = createEvent<number>()
const effectAdded = createEvent()
const effectDeleted = createEvent()

const $id = createStore<number>(2).on(effectAdded, id => id + 1) // auto increment
const $defaultEffects = createStore(defaultEffects)
const $effects = createStore<Record<number, FeOptions>>({})
const $effectsList = $effects.map(effects => Object.values(effects))

export const effectsModel = {
  effects: $effects,
  effectsList: $effectsList,
  nodeEffects: $effectsList.map(toNodeEffects),
  updateEffect: updateEffectCalled,
  deleteEffect: deleteEffectCalled,
  addEffect: addEffectCalled,
  effectAdded,
  effectDeleted,
}

sample({
  clock: addEffectCalled,
  source: {
    id: $id,
    nodes: flowApi.manager.nodes,
  },
  fn({ id, nodes }, { nodeId }) {
    const node = flowApi.getNodeById(nodes, nodeId) as Node
    return {
      id: nodeId,
      data: { effects: [...node.data.effects, id] },
    }
  },
  target: flowApi.manager.updateNodeData,
})
sample({
  clock: addEffectCalled,
  source: {
    id: $id,
    defaults: $defaultEffects,
    effects: $effects,
  },
  fn({ id, defaults, effects }, { nodeId, type }) {
    const newEffect: FeOptions = {
      ...defaults[type],
      result: id,
      nodeId,
      id,
    }
    return { ...effects, [id]: newEffect }
  },
  target: [$effects, effectAdded],
})

sample({
  clock: updateEffectCalled,
  source: $effects,
  fn(effects, { id, data }) {
    const effect = { ...effects[id] }
    return { ...effects, [id]: { ...effect, ...data } }
  },
  target: $effects,
})

sample({
  clock: deleteEffectCalled,
  source: $effects,
  filter: (effects, id) => id in effects,
  fn(effects, id) {
    const effectsClone = { ...effects }
    delete effectsClone[id]
    return effectsClone
  },
  target: [$effects, effectDeleted],
})
