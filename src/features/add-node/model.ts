import { createEvent, sample } from 'effector'
import { nanoid } from 'nanoid'
import type { AddNodeParams } from './types'
import { flowManager } from '@/shared/lib'

const addNodeCalled = createEvent<AddNodeParams>()

sample({
  clock: addNodeCalled,
  source: flowManager.instance,
  filter: instance => instance != null,
  fn(instance, { data, x, y }) {
    const position = instance?.project({ x, y })
    return { ...data, id: nanoid(4), position }
  },
  target: flowManager.addNode,
})

export const model = {
  addNode: addNodeCalled,
}
