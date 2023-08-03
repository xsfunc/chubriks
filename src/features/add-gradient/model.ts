import { createEvent, createStore, sample } from 'effector'
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
    return {} // todo
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
