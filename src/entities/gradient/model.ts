import type { StoreValue } from 'effector'
import { createEvent, createStore, sample } from 'effector'
import { paletteModel } from '../palette'
import { addCanvas, generateGradientOptions, objMap } from './lib'
import type { GradientOptions } from '@/shared/lib'

const initialGradientsMap = {
  1: generateGradientOptions(1),
  2: generateGradientOptions(2),
  3: generateGradientOptions(3),
  4: generateGradientOptions(4),
  5: generateGradientOptions(5),
}

const initCalled = createEvent<Record<number, GradientOptions>>()
const addGradientCalled = createEvent<GradientOptions>()
const updateGradientCalled = createEvent<UpdateGradientPayload>()
const deleteGradientCalled = createEvent<number>()
const $gradientsMap = createStore<Record<number, GradientOptions>>({})
const $gradientsCanvas = createStore<Record<number, object>>({})
const $gradients = $gradientsMap.map(map => Object.values(map))

type UpdateGradientPayload = { id: number } & Partial<GradientOptions>
type GradientsMap = StoreValue<typeof $gradientsMap>

export const gradientModel = {
  gradientsMap: $gradientsMap,
  gradientsCanvas: $gradientsCanvas,
  gradientsList: $gradients,
  addGradient: addGradientCalled,
  updateGradient: updateGradientCalled,
  deleteGradient: deleteGradientCalled,
  gradientAdded: createEvent(),
  init: initCalled,
}

sample({
  clock: addGradientCalled,
  source: $gradients,
  fn: (gradients, gradient) => ({ ...gradients, [gradient.id]: gradient }),
  target: [$gradientsMap, gradientModel.gradientAdded],
})
sample({
  clock: updateGradientCalled,
  source: $gradientsMap,
  fn(map, payload) {
    const old = map[payload.id]
    return {
      ...map,
      [payload.id]: { ...old, ...payload },
    } as GradientsMap
  },
  target: [$gradientsMap],
})
sample({
  clock: deleteGradientCalled,
  source: $gradientsMap,
  fn(map, id) {
    const { [id]: _, ...withoutDeleted } = map
    return withoutDeleted
  },
  target: [$gradientsMap],
})
sample({
  source: {
    gradients: $gradientsMap,
    palette: paletteModel.palette,
  },
  fn({ gradients, palette }) {
    return objMap(gradients, gradient => addCanvas(gradient, palette))
  },
  target: $gradientsCanvas,
})
sample({
  clock: initCalled,
  target: $gradientsMap,
})

gradientModel.init(initialGradientsMap)
