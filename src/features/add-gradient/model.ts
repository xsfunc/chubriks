import { createEvent, createStore, sample } from 'effector'
import { gradientModel } from '@/entities/gradient/model'
import { paletteModel } from '@/entities/palette'
import { type GradientOptions, drawApi } from '@/shared/lib'

const addGradientCalled = createEvent()
const $id = createStore<number>(0).on(gradientModel.gradientAdded, id => id + 1) // auto increment

sample({
  clock: addGradientCalled,
  source: {
    id: $id,
    palette: paletteModel.palette,
  },
  fn: ({ id, palette }): GradientOptions => ({
    id,
    type: drawApi.gradients.typesMap.LINEAR,
    degree: 40,
    colors: getRandomSubarray(palette.map((_, i) => i), 4),
    stops: getRandomArray(4),
  }),
  target: gradientModel.addGradient,
})

export const addGradient = addGradientCalled

function getRandomArray(size: number) {
  const array = [0, 100]
  while (array.length < size)
    array.push(Math.floor(Math.random() * 100))
  return array.sort((a, b) => a - b)
}

function getRandomSubarray(arr: number[], size: number) {
  const shuffled = arr.slice(0)
  let i = arr.length
  const min = i - size
  let temp
  let index
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }
  return shuffled.slice(min)
}
