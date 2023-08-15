import { createEvent, createStore, sample } from 'effector'
import { delay } from 'patronum'
import type { PatternOptions, PatternType } from '@/shared/lib'
import { drawApi, flowManager } from '@/shared/lib'
import { fillingApi } from '@/shared/lib/draw/filling'

const { patterns, patternMap } = drawApi

const defaultPatterns = {
  [patternMap.WAVES]: patterns.waves.initial,
  [patternMap.CROSS]: patterns.cross.initial,
  [patternMap.HERRINGBONE]: patterns.herringbone.initial,
  [patternMap.LINE]: patterns.lines.initial,
  [patternMap.FLOWER]: patterns.flower.initial,
  [patternMap.NEW]: patterns.newPattern.initial,
  [patternMap.PLUS]: patterns.plus.initial,
  [patternMap.CIRCLES]: patterns.circles.initial,
  [patternMap.PLAID]: patterns.plaid.initial,
  [patternMap.SQUARES]: patterns.squares.initial,
} as const

const addPatternCalled = createEvent<{ nodeId: string; type: PatternType }>()
const changePatternCalled = createEvent<{ id: number; type: PatternType }>()
const updatePatternCalled = createEvent<{ id: number; data: object }>()
const deletePatternCalled = createEvent<number>()
const deletePatternsCalled = createEvent<number[]>()
const patternAdded = createEvent()
const patternDeleted = createEvent()

const $id = createStore<number>(0).on(patternAdded, id => id + 1) // auto increment
const $default = createStore(defaultPatterns)
const $patterns = createStore<Record<number, PatternOptions>>({})
const $patternsList = $patterns.map(patterns => Object.values(patterns))

export const patternsModel = {
  patterns: $patterns,
  patternsList: $patternsList,
  changePattern: changePatternCalled,
  updatePattern: updatePatternCalled,
  deletePattern: deletePatternCalled,
  deletePatterns: deletePatternsCalled,
  addPattern: addPatternCalled,
  patternAdded,
  patternDeleted,
}

sample({
  clock: addPatternCalled,
  source: {
    defaults: $default,
    patterns: $patterns,
    id: $id,
  },
  fn: ({ defaults, patterns, id }) => ({ ...patterns, [id]: { ...defaults[patternMap.WAVES], id } }),
  target: $patterns,
})
sample({
  clock: delay({ source: addPatternCalled, timeout: 200 }),
  source: $id,
  fn: (id, { nodeId }) => ({ id: nodeId, data: { type: fillingApi.types.PATTERN, id } }),
  target: [
    flowManager.updateNodeData,
    patternAdded,
  ],
})
sample({
  clock: changePatternCalled,
  source: $default,
  fn: (defaults, { id, type }) => ({ id, data: defaults[type] }),
  target: patternsModel.updatePattern,
})
sample({
  clock: updatePatternCalled,
  source: $patterns,
  filter: (patterns, { id }) => id in patterns,
  fn(patterns, { id, data }) {
    const pattern = { ...patterns[id] }
    const updated = { ...pattern, ...data }
    return { ...patterns, [id]: updated }
  },
  target: $patterns,
})
sample({
  clock: deletePatternCalled,
  source: $patterns,
  filter: (patterns, id) => id in patterns,
  fn(patterns, id) {
    const patternsClone = { ...patterns }
    delete patternsClone[id]
    return patternsClone
  },
  target: [$patterns, patternDeleted],
})
sample({
  clock: deletePatternsCalled,
  source: $patterns,
  fn(patterns, ids) {
    const patternsClone = { ...patterns }
    for (const id of ids)
      delete patternsClone[id]
    return patternsClone
  },
  target: [$patterns, patternDeleted],
})
