import { createEffect, createEvent, sample } from 'effector'
import { nanoid } from 'nanoid'
import type { AddNodeFxParams, AddNodeParams } from './types'
import { flowManager } from '@/shared/lib'
import { faceDataDefault } from '@/entities/face'

const addNodeCalled = createEvent<AddNodeParams>()

const addNodeFx = createEffect(({ nodeType, position }: AddNodeFxParams) => {
  const defaultData = {
    patternNode: { pattern: null, sourceHandles: { pattern: { type: 'pattern' } } },
    effectsNode: { effects: [], sourceHandles: { effects: { type: 'effects' } } },
    faceNode: faceDataDefault,
  }
  return {
    position,
    id: nanoid(4),
    type: nodeType,
    data: defaultData[nodeType],
  }
})

sample({
  clock: addNodeCalled,
  fn: ({ nodeType, event }) => ({
    position: { x: event.clientX, y: event.clientY - 100 },
    nodeType,
  }),
  target: addNodeFx,
})
sample({
  clock: addNodeFx.doneData,
  target: flowManager.addNode,
})

export const model = {
  addNode: addNodeCalled,
}
