import { createEvent, sample } from 'effector'
import { updateFilter } from '../lib'
import type { UpdateFilterProps } from './types'
import { flowManager } from '@/shared/lib'

const updateFilterCalled = createEvent<UpdateFilterProps>()

sample({
  clock: updateFilterCalled,
  fn: updateFilter,
  target: flowManager.updateNodeData,
})

export const model = {
  updateFilter: updateFilterCalled,
}
