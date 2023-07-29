import { createEvent, createStore, sample } from 'effector'
import type { PatternOptions, PatternType } from '@/shared/lib'
import { drawApi, flowManager } from '@/shared/lib'
import { fillingApi } from '@/shared/lib/draw/filling'

const { patterns, patternMap } = drawApi

const defaultPatterns = {
  [patternMap.WAVES]: patterns.waves.initial,
  [patternMap.CROSS]: patterns.cross.initial,
  [patternMap.HERRINGBONE]: patterns.herringbone.initial,
  [patternMap.LINE]: patterns.lines.initial,
} as const

const addPatternCalled = createEvent<{ nodeId: string; type: PatternType }>()
const changePatternCalled = createEvent<{ id: number; type: PatternType }>()
const updatePatternCalled = createEvent<{ id: number; data: object }>()
const deletePatternCalled = createEvent<number>()
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
  target: [$patterns],
})
sample({
  clock: addPatternCalled,
  source: $id,
  fn: (id, { nodeId }) => ({ id: nodeId, data: { type: fillingApi.types.PATTERN, id } }),
  target: [flowManager.updateNodeData, patternAdded],
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
