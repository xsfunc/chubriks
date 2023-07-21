import { createEvent, sample } from 'effector'
import type { PatternNodeData } from '../node-pattern/types'
import { flowManager } from '@/shared/lib'

interface UpdatePayload { id: string; data: Partial<PatternNodeData> }
interface ChangePayload { id: string; patternType: string }

const updateDataCalled = createEvent<UpdatePayload>()
const changePatternCalled = createEvent<ChangePayload>()

sample({
  clock: changePatternCalled,
  fn: ({ id, patternType }) => ({ id, data: { patternType } }),
  target: flowManager.updateNodeData,
})
sample({
  clock: updateDataCalled,
  target: flowManager.updateNodeData,
})

export const model = {
  updatePattenData: updateDataCalled,
  changePattern: changePatternCalled,
}
