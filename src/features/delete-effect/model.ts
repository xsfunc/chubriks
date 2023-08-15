import { createEvent, sample } from 'effector'
import type { Node } from 'reactflow'
import { flowApi } from '@/shared/lib'
import { effectsModel } from '@/entities/effects'

const deleteEffectCalled = createEvent<{ effectId: number; nodeId: string }>()

sample({
  clock: deleteEffectCalled,
  source: flowApi.manager.nodes,
  fn(nodes, { effectId, nodeId }) {
    const node = flowApi.getNodeById(nodes, nodeId) as Node
    const nodeEffects = node.data.effects.filter((id: number) => id !== effectId)
    return { id: nodeId, data: { effects: nodeEffects } }
  },
  target: flowApi.manager.updateNodeData,
})
sample({
  clock: deleteEffectCalled,
  fn: ({ effectId }) => [effectId],
  target: effectsModel.deleteEffects,
})

export const deleteEffect = deleteEffectCalled
