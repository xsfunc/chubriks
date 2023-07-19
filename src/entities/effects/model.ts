import { createEffect, createEvent, createStore, sample } from 'effector'
import { nanoid } from 'nanoid'
import type { Node } from 'reactflow'
import { toNodeEffects } from './lib'
import { flowManager } from '@/shared/lib'
import { getNodeById } from '@/shared/lib/flow/lib'

export interface Effect {
  name: string
  id: string
  nodeId?: string
  type: EffectType
  data: object
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
  id: nanoid(),
  name: 'Blur',
  type: 'svg-blur',
  data: {
    x: 3,
    y: 3,
  },
}

const defaultEffects: DefaultEffects = {
  'svg-blur': svgBlurEffectDefault,
}

const prepareEffectFx = createEffect(({ draft, nodeId }: { draft: Effect; nodeId: string }) => {
  const id = nanoid(4)
  return { ...draft, id, nodeId }
})

const addEffectCalled = createEvent<{ nodeId: string; type: EffectType }>()
const updateEffectCalled = createEvent<{ id: string; data: object }>()
const deleteEffectCalled = createEvent<string>()
const effectAdded = createEvent()
const effectDeleted = createEvent()

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
  source: $defaultEffects,
  fn: (defaultEffects, { nodeId, type }) => ({
    draft: defaultEffects[type],
    nodeId,
  }),
  target: prepareEffectFx,
})
sample({
  clock: prepareEffectFx.doneData,
  source: $effects,
  fn: (effects, effect) => ({ ...effects, [effect.id]: effect }),
  target: $effects,
})
sample({
  clock: prepareEffectFx.doneData,
  source: flowManager.nodes,
  fn(nodes, { id, nodeId }) {
    const node = getNodeById(nodes, nodeId) as Node
    return { id: nodeId, data: { effects: [...node.data.effects, id] } }
  },
  target: flowManager.updateNodeData,
})
sample({
  clock: updateEffectCalled,
  source: $effects,
  filter: (effects, { id }) => id in effects,
  fn(effects, { id, data }) {
    const effect = { ...effects[id] }
    effect.data = { ...effect.data, ...data }
    return { ...effects, [id]: effect }
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
