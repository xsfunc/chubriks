import { createEvent, createStore, sample } from 'effector'
import { getRandomArray, getRandomSubarray, randomInt } from './lib'
import { gradientModel } from '@/entities/gradient/model'
import { paletteModel } from '@/entities/palette'
import { type GradientOptions, flowApi } from '@/shared/lib'
import { fillingApi } from '@/shared/lib/draw/filling'

const addGradientCalled = createEvent<{ nodeId: string }>()
const $id = createStore<number>(0).on(gradientModel.gradientAdded, id => id + 1) // auto increment

sample({
  clock: addGradientCalled,
  source: {
    id: $id,
    palette: paletteModel.palette,
  },
  fn({ id, palette }): GradientOptions {
    const paletteIds = palette.map((_, i) => i)
    const colorsCount = randomInt(2, 4)
    return {
      id,
      type: randomInt(0, 1) as (0 | 1),
      degree: randomInt(0, 360),
      colors: getRandomSubarray(paletteIds, colorsCount),
      stops: getRandomArray(colorsCount),
    }
  },
  target: gradientModel.addGradient,
})
sample({
  clock: addGradientCalled,
  source: $id,
  fn(id, { nodeId }) {
    return {
      id: nodeId,
      data: {
        [id]: { id, type: fillingApi.types.GRADIENT },
      },
    }
  },
  target: flowApi.manager.updateNodeData,
})

export const addGradient = addGradientCalled
