import { createEvent, sample } from 'effector'
import { updateEffect } from './lib'
import type { UpdateEffectProps } from './types'
import { flowManager } from '@/shared/lib'

const updateEffectCalled = createEvent<UpdateEffectProps>()

sample({
  clock: updateEffectCalled,
  fn: updateEffect,
  target: flowManager.updateNodeData,
})

export const model = {
  updateEffect: updateEffectCalled,
}
