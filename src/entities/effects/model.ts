import { createEvent, createStore, sample } from 'effector'
import type { Node } from 'reactflow'
import { toNodeEffects } from './lib'
import { flowManager } from '@/shared/lib'
import { getNodeById } from '@/shared/lib/flow/lib'

export interface Effect {
  name: string
  nodeId?: string
  type: EffectType
}

const effectTypes = ['svg-blur'] as const
type EffectType = typeof effectTypes[number]

interface Effects {
  [k: string]: Effect
}
type DefaultEffects = {
  [k in EffectType]: Effect
}

export const svgBlurEffectDefault: Effect = {
  name: 'Blur',
  type: 'svg-blur',
  x: 3,
  y: 3,
}

const defaultEffects: DefaultEffects = {
  'svg-blur': svgBlurEffectDefault,
}

const addEffectCalled = createEvent<{ nodeId: string; type: EffectType }>()
const updateEffectCalled = createEvent<{ id: number; data: object }>()
const deleteEffectCalled = createEvent<number>()
const effectAdded = createEvent()
const effectDeleted = createEvent()

const $id = createStore(0).on(effectAdded, id => id + 1)
const $defaultEffects = createStore<DefaultEffects>(defaultEffects)
const $effects = createStore<Effects>({})
const $effectsList = $effects.map(effects => Object.values(effects))
const $nodeEffects = $effectsList.map(toNodeEffects)

export const effectsModel = {
  effects: $effects,
  effectsList: $effectsList,
  nodeEffects: $nodeEffects,
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
    nodes: flowManager.nodes,
  },
  fn({ id, nodes }, { nodeId }) {
    const node = getNodeById(nodes, nodeId) as Node
    return {
      id: nodeId,
      data: { effects: [...node.data.effects, id] },
    }
  },
  target: flowManager.updateNodeData,
})
sample({
  clock: addEffectCalled,
  source: {
    id: $id,
    defaults: $defaultEffects,
    effects: $effects,
  },
  fn({ id, defaults, effects }, { nodeId, type }) {
    const newEffect = { nodeId, ...defaults[type], id }
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
