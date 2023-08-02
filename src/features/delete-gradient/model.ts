import { createEvent, sample } from 'effector'
import { gradientModel } from '@/entities/gradient/model'

const deleteGradientCalled = createEvent<number>()

sample({
  clock: deleteGradientCalled,
  target: gradientModel.deleteGradient,
})

export const deleteEffect = deleteGradientCalled
