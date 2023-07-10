import { createEvent, createStore, sample } from 'effector'
import type { ColorProps } from '@/shared/lib'

interface ColorFromPicker {
  hex: string
  source: 'hsl'
  hsl: {
    'h': number
    's': number
    'l': number
    'a': number
  }
}
const $id = createStore<string | null>(null)
const $color = createStore<string>('#cccccc')
const $palette = createStore<ColorProps[]>([])
const updateColorCalled = createEvent<ColorFromPicker>()
const updateCompleted = createEvent<ColorFromPicker>()
const setNodeIdCalled = createEvent<string>()

sample({
  clock: updateColorCalled,
  fn: color => color.hex,
  target: $color,
})
// sample({
//   clock: updateCompleted,
//   fn: (color: ColorFromPicker) => modulateColor(color.hsl, 5),
//   target: $palette,
// })
// sample({
//   clock: $palette,
//   source: $id,
//   fn: (id: string, palette: ColorProps[]) => ({ id, data: { palette } }),
//   target: flowManager.updateNodeData,
// })
sample({
  clock: setNodeIdCalled,
  target: $id,
})

export const model = {
  color: $color,
  palette: $palette,
  setNodeId: setNodeIdCalled,
  updateColor: updateColorCalled,
  completeUpdate: updateCompleted,
}
