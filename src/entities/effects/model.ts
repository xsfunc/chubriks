import type { StoreValue } from 'effector'
import { createEvent, createStore, sample } from 'effector'
import type { Node } from 'reactflow'
import { delay } from 'patronum'
import { toNodeEffects } from './lib'
import type { FeInitial, FeOptions, FeType } from '@/shared/lib'
import { drawApi, flowApi } from '@/shared/lib'

const { effectMap, effects } = drawApi
const defaultEffects: Record<FeType, FeInitial> = {
  [effectMap.BLEND]: effects.feBlend.initial,
  [effectMap.BLUR]: effects.feBlur.initial,
  [effectMap.TURBULENCE]: effects.feTurbulence.initial,
  [effectMap.DISPLACEMENT]: effects.feDisplacement.initial,
  [effectMap.COLOR_MATRIX]: effects.feColorMatrix.initial,
  [effectMap.COMPONENT_TRANSFER]: effects.feComponentTransfer.initial,
  [effectMap.COMPOSITE]: effects.feComposite.initial,
  [effectMap.CONVOLVE_MATRIX]: effects.feConvolveMatrix.initial,
  [effectMap.MERGE]: effects.feMerge.initial,
  [effectMap.FLOOD]: effects.feFlood.initial,
  [effectMap.MORPHOLOGY]: effects.feMorphology.initial,
  [effectMap.OFFSET]: effects.feOffset.initial,
} as const

const addEffectCalled = createEvent<{ nodeId: string; type: FeType }>()
const updateEffectCalled = createEvent<{ id: number; data: Partial<FeOptions> }>()
const deleteEffectCalled = createEvent<number>()
const effectAdded = createEvent()
const effectDeleted = createEvent()

/**
 * Auto increment id
 * Also used as result, in, in2 parameters,
 * 0 and 1 are taken for SourceGraphic SourceAlpha, so starts with 2
 */
const $id = createStore<number>(2).on(effectAdded, id => id + 1)
const $defaultEffects = createStore(defaultEffects)
const $effects = createStore<Record<number, FeOptionsWithExtras>>({})
const $effectsIds = $effects.map(effects => Object.keys(effects))
const $effectsList = $effects.map(effects => Object.values(effects))

type FeOptionsWithExtras = FeOptions & { nodeId: string }
type EffectsValue = StoreValue<typeof $effects>

export const effectsModel = {
  effects: $effects,
  effectsList: $effectsList,
  effectsIds: $effectsIds,
  nodeEffects: $effectsList.map(toNodeEffects),
  updateEffect: updateEffectCalled,
  deleteEffect: deleteEffectCalled,
  addEffect: addEffectCalled,
  inputEffectsIds: $effectsIds.map(ids => [...drawApi.fe.sourceIds, ...ids]),
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
  clock: delay({ source: addEffectCalled, timeout: 200 }),
  source: {
    id: $id,
    defaults: $defaultEffects,
    effects: $effects,
  },
  fn({ id, defaults, effects }, { nodeId, type }) {
    const newEffect = {
      ...defaults[type],
      result: id,
      nodeId,
      id,
    }
    return { ...effects, [id]: newEffect } as EffectsValue
  },
  target: [$effects, effectAdded],
})

sample({
  clock: updateEffectCalled,
  source: $effects,
  fn(effects, { id, data }) {
    const effect = { ...effects[id] }
    return { ...effects, [id]: { ...effect, ...data } } as EffectsValue
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
