import { createEvent, createStore, sample } from 'effector'
import { flowManager } from '@/shared/lib'

const patternTypes = ['waves'] as const
type PatternType = typeof patternTypes[number]

interface Patterns {
  [k: string]: object
}
type DefaultPatterns = {
  [k in PatternType]: object
}

const defaultEffects: DefaultPatterns = {
  waves: { patternType: 'waves', type: 'pattern' },
}

const addPatternCalled = createEvent<{ nodeId: string; type: PatternType }>()
const updatePatternCalled = createEvent<{ id: string; data: object }>()
const deletePatternCalled = createEvent<string>()
const patternAdded = createEvent()
const patternDeleted = createEvent()

const $id = createStore(0)
const $defaultPatterns = createStore<DefaultPatterns>(defaultEffects)
const $patterns = createStore<Patterns>({})
const $patternsList = $patterns.map(patterns => Object.values(patterns))

export const patternsModel = {
  patterns: $patterns,
  patternsList: $patternsList,
  updatePattern: updatePatternCalled,
  deletePattern: deletePatternCalled,
  addPattern: addPatternCalled,
  patternAdded,
  patternDeleted,
}

sample({
  clock: addPatternCalled,
  source: {
    patterns: $patterns,
    id: $id,
  },
  fn: ({ patterns, id }) => ({
    ...patterns,
    [id]: {
      id,
      patternType: 'waves',
      scale: 1,
      rotate: 0,
      strokeWidth: 1,
    },
  }),
  target: [$patterns, patternAdded],
})
sample({
  clock: addPatternCalled,
  source: $id,
  fn: (id, { nodeId }) => ({ id: nodeId, data: { type: 'pattern', patternId: id } }),
  target: flowManager.updateNodeData,
})
sample({
  clock: patternAdded,
  source: $id,
  fn: id => id + 1,
  target: $id,
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
