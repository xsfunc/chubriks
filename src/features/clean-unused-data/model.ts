import { createEvent, sample } from 'effector'
import { delay } from 'patronum'
import { flowApi } from '@/shared/lib'
import { effectsModel } from '@/entities/effects'
import { patternsModel } from '@/entities/patterns'

const cleanUnusedCalled = createEvent<string>()

sample({
  clock: cleanUnusedCalled,
  source: {
    nodes: flowApi.manager.nodes,
    effects: effectsModel.effectsList,
  },
  fn({ nodes, effects }) {
    const effectNodesIds = nodes
      .filter(node => node.type === 'effectsNode')
      .map(node => node.id)
    const effectsIdsToDelete = effects
      .filter(effect => !effectNodesIds.includes(effect.nodeId))
      .map(effect => effect.id)
    return effectsIdsToDelete
  },
  target: effectsModel.deleteEffects,
})

sample({
  clock: delay({ source: cleanUnusedCalled, timeout: 200 }), // FIX: refactor without delay and data racing
  source: {
    nodes: flowApi.manager.nodes,
    patterns: patternsModel.patternsList,
  },
  fn({ nodes, patterns }) {
    const usedPatternsIds = nodes
      .filter(node => node.type === 'patternNode')
      .map(node => node.data.id)
      .filter(id => id !== undefined)
    const allIds = patterns.map(pattern => pattern.id)
    const unusedPatternsIds = allIds
      .filter(id => !usedPatternsIds.includes(id))
    return unusedPatternsIds
  },
  target: patternsModel.deletePatterns,
})

export { cleanUnusedCalled as cleanUnused }
